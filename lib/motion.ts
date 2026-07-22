/**
 * Shared motion tokens.
 *
 * Every entrance/hover animation in the app pulls from this single source so
 * timing stays consistent and easing curves don't drift between components.
 */

/** Primary easing curve — used for nearly all entrance and hover motion. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Standard fade-up used for scroll-triggered reveals (cards, headings, panels). */
export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

/** Shared viewport config for `whileInView` — fires once, slightly before entering view. */
export const viewportOnce = { once: true, margin: "-60px" } as const;

/** Stagger helper: returns a transition with an index-based delay, capped so long grids don't lag. */
export function staggerDelay(index: number, step = 0.08, max = 4) {
  return (index % max) * step;
}
