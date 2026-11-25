import { createPolaroidCard, type PolaroidPlacement } from './render';
import type { ResolvedPhoto } from './types';

const MAX_STACK_SIZE = 5;
const PAW_HINT_DELAY_MS = 2800;
const PAW_TAP_IMPACT_MS = 780;
const PAW_TAP_DURATION_MS = 1900;

/**
 * Shuffle-bag selector: draws randomly from unshown photos until all have been
 * shown, then transparently refills from the full pool (avoiding immediate repeat
 * when more than one photo is available).
 */
export class PhotoRotator {
  private readonly pool: ResolvedPhoto[];
  private remaining: number[] = [];
  private lastIndex: number | null = null;

  constructor(pool: ResolvedPhoto[]) {
    this.pool = pool;
  }

  /**
   * Deterministically selects the first configured photo for initial page load
   * and marks the remaining photos as unshown for subsequent random clicks.
   */
  initial(): ResolvedPhoto {
    if (this.pool.length === 0) {
      throw new Error('Photo pool must contain at least one photo.');
    }

    this.lastIndex = 0;
    this.remaining = this.pool.map((_, i) => i).slice(1);
    return this.pool[0];
  }

  next(): ResolvedPhoto {
    if (this.pool.length === 0) {
      throw new Error('Photo pool must contain at least one photo.');
    }

    if (this.remaining.length === 0) {
      this.remaining = this.pool.map((_, i) => i);
    }

    let candidates = this.remaining;
    // On a cycle reset with multiple photos, skip the currently visible photo once
    // while keeping it in `remaining` so it still appears later in the new cycle.
    if (
      this.remaining.length === this.pool.length &&
      this.pool.length > 1 &&
      this.lastIndex !== null
    ) {
      candidates = this.remaining.filter((idx) => idx !== this.lastIndex);
    }

    const pickedIndex =
      candidates[Math.floor(Math.random() * candidates.length)];
    this.remaining = this.remaining.filter((idx) => idx !== pickedIndex);
    this.lastIndex = pickedIndex;

    return this.pool[pickedIndex];
  }
}

export function nextPolaroidPlacement(previousAngle?: number): PolaroidPlacement {
  let rotateDeg = (Math.random() - 0.5) * 11; // [-5.5, +5.5]

  if (previousAngle !== undefined) {
    // Ensure each dropped Polaroid visibly differs in tilt from the one beneath it
    let attempts = 0;
    while (Math.abs(rotateDeg - previousAngle) < 2.5 && attempts < 8) {
      rotateDeg = (Math.random() - 0.5) * 11;
      attempts += 1;
    }
    if (Math.abs(rotateDeg - previousAngle) < 2.5) {
      rotateDeg = previousAngle > 0 ? -3.4 : 3.4;
    }
  }

  return {
    rotateDeg,
    offsetX: (Math.random() - 0.5) * 8,
    offsetY: (Math.random() - 0.5) * 6,
    dropSpinDeg: (Math.random() >= 0.5 ? 1 : -1) * (6 + Math.random() * 6),
    dropX: (Math.random() - 0.5) * 26,
  };
}

/**
 * Attaches lightweight, GPU-friendly animations and tactile interactions:
 * - Polaroid stack click-to-drop rotation with bounded stack size
 * - Smooth 3D perspective tilt + specular sheen on the Polaroid stack
 * - Cursor radial spotlight across link rows
 * - Quick handle copy feedback
 */
export function attachMotion(
  root: HTMLElement,
  rotator: PhotoRotator,
  initialAngle: number,
): void {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

  const stack = root.querySelector<HTMLElement>('.polaroid-stack');
  const pawGuide = root.querySelector<HTMLElement>('.paw-guide');
  const tapHint = root.querySelector<HTMLElement>('.tap-hint');
  const tapHintText = root.querySelector<HTMLElement>('.tap-hint__text');

  if (tapHintText && hasFinePointer) {
    tapHintText.textContent = 'Click photo for more';
  }

  if (stack) {
    let lastAngle = initialAngle;
    let hasInteracted = false;
    let hintDelayTimer: number | undefined;
    let impactTimer: number | undefined;
    let cleanupTimer: number | undefined;

    const dismissHint = () => {
      hasInteracted = true;
      window.clearTimeout(hintDelayTimer);
      window.clearTimeout(impactTimer);
      window.clearTimeout(cleanupTimer);
      pawGuide?.classList.remove('is-tapping');
      tapHint?.classList.remove('is-visible');
      stack
        .querySelector<HTMLElement>('.polaroid-card.is-booped')
        ?.classList.remove('is-booped');
    };

    // After a few seconds of idle viewing, send a lynx paw in to tap the photo
    // and reveal a gentle text hint guiding visitors that the Polaroid is clickable.
    hintDelayTimer = window.setTimeout(() => {
      if (hasInteracted) return;

      if (prefersReducedMotion || !pawGuide) {
        tapHint?.classList.add('is-visible');
        return;
      }

      pawGuide.classList.add('is-tapping');

      impactTimer = window.setTimeout(() => {
        if (hasInteracted) return;
        const topCard = stack.querySelector<HTMLElement>('.polaroid-card.is-top');
        if (topCard) {
          topCard.classList.add('is-booped');
          window.setTimeout(() => topCard.classList.remove('is-booped'), 360);
        }
        tapHint?.classList.add('is-visible');
      }, PAW_TAP_IMPACT_MS);

      cleanupTimer = window.setTimeout(() => {
        pawGuide.classList.remove('is-tapping');
      }, PAW_TAP_DURATION_MS);
    }, PAW_HINT_DELAY_MS);

    const dropNextPolaroid = () => {
      dismissHint();

      const nextPhoto = rotator.next();
      const placement = nextPolaroidPlacement(lastAngle);
      lastAngle = placement.rotateDeg;

      const previousTop = stack.querySelector<HTMLElement>('.polaroid-card.is-top');
      if (previousTop) {
        previousTop.classList.remove('is-top', 'is-dropping');
        previousTop.classList.add('is-buried');
        previousTop.setAttribute('aria-hidden', 'true');
        previousTop
          .querySelectorAll<HTMLElement>('button, a')
          .forEach((el) => el.setAttribute('tabindex', '-1'));
      }

      const nextCard = createPolaroidCard(nextPhoto, placement, false);
      stack.appendChild(nextCard);

      // Cleanly cap DOM stack size so repeated clicks stay fast
      while (stack.children.length > MAX_STACK_SIZE) {
        stack.firstElementChild?.remove();
      }
    };

    stack.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      // Allow Polaroid footer links ("Photo credit" / "View post") to open normally
      if (target.closest('a')) return;
      dropNextPolaroid();
    });

    if (!prefersReducedMotion && hasFinePointer) {
      let targetX = 0;
      let targetY = 0;
      let currentX = 0;
      let currentY = 0;
      let rafId: number | null = null;

      const animateTilt = () => {
        currentX += (targetX - currentX) * 0.14;
        currentY += (targetY - currentY) * 0.14;

        stack.style.setProperty('--tilt-x', `${currentX.toFixed(2)}deg`);
        stack.style.setProperty('--tilt-y', `${currentY.toFixed(2)}deg`);

        const settled =
          Math.abs(targetX - currentX) < 0.03 &&
          Math.abs(targetY - currentY) < 0.03;

        if (settled && targetX === 0 && targetY === 0) {
          stack.style.setProperty('--tilt-x', '0deg');
          stack.style.setProperty('--tilt-y', '0deg');
          rafId = null;
          return;
        }

        rafId = window.requestAnimationFrame(animateTilt);
      };

      const startLoop = () => {
        if (rafId === null) {
          rafId = window.requestAnimationFrame(animateTilt);
        }
      };

      stack.addEventListener('pointermove', (event: PointerEvent) => {
        const rect = stack.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;

        targetY = (px - 0.5) * 9;
        targetX = (0.5 - py) * 9;

        stack.style.setProperty('--sheen-x', `${(px * 100).toFixed(1)}%`);
        stack.style.setProperty('--sheen-y', `${(py * 100).toFixed(1)}%`);
        startLoop();
      });

      stack.addEventListener('pointerleave', () => {
        targetX = 0;
        targetY = 0;
        stack.style.setProperty('--sheen-x', '50%');
        stack.style.setProperty('--sheen-y', '50%');
        startLoop();
      });
    }
  }

  // Subtle spotlight tracking on each social link card
  if (!prefersReducedMotion && hasFinePointer) {
    const linkItems = root.querySelectorAll<HTMLElement>('.link-item');
    linkItems.forEach((item) => {
      item.addEventListener('pointermove', (event: PointerEvent) => {
        const rect = item.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        item.style.setProperty('--mx', `${x.toFixed(1)}px`);
        item.style.setProperty('--my', `${y.toFixed(1)}px`);
      });
    });
  }

  // Copy handle buttons
  const copyButtons = root.querySelectorAll<HTMLButtonElement>('.copy-btn');
  copyButtons.forEach((button) => {
    let copiedTimer: number | undefined;

    button.addEventListener('click', async () => {
      const value = button.dataset.copyValue;
      if (!value) return;

      try {
        await navigator.clipboard.writeText(value);
      } catch {
        const input = document.createElement('input');
        input.value = value;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        input.remove();
      }

      button.classList.add('is-copied');
      window.clearTimeout(copiedTimer);
      copiedTimer = window.setTimeout(() => {
        button.classList.remove('is-copied');
      }, 1500);
    });
  });
}
