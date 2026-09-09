# AfterBills design language

## Product character

AfterBills is a calm financial planning tool for the moment after obligations are
accounted for. The interface should make the remaining amount feel legible,
grounded, and actionable. It is confident without being loud, precise without
feeling clinical, and optimistic without hiding a shortfall.

The visual system is original to AfterBills. It uses a warm sage canvas, bright
lime actions, deep ink for high-signal surfaces, and generous rounded containers.
These choices are implementation tokens, not a reference to another product.

## Color tokens

The existing Tailwind tokens in `apps/web/src/app/globals.css` are the source of
truth. Keep new components on these tokens rather than adding one-off colors.

### Brand and action

| Token | Value | Role |
| --- | --- | --- |
| `{colors.primary}` | `#9fe870` | Primary action and positive emphasis |
| `{colors.primary-active}` | `#cdffad` | Hover and active action state |
| `{colors.primary-neutral}` | `#c5edab` | Quiet selected state |
| `{colors.primary-pale}` | `#e2f6d5` | Soft action background |
| `{colors.on-primary}` | `#0e0f0c` | Text/icon color on primary |

### Surfaces and type

| Token | Value | Role |
| --- | --- | --- |
| `{colors.canvas}` | `#ffffff` | Card and input surface |
| `{colors.canvas-soft}` | `#e8ebe6` | Page canvas and quiet panels |
| `{colors.ink}` | `#0e0f0c` | Primary text and focus surface |
| `{colors.ink-deep}` | `#163300` | High-contrast text on lime-tinted surfaces |
| `{colors.body}` | `#454745` | Supporting copy |
| `{colors.mute}` | `#868685` | Captions, hints, and placeholders |

### Semantic feedback

Use semantic colors only for state, never as a substitute for the primary
action. Positive is for funded or completed states, warning is for an upcoming
constraint, and negative is for shortfalls or destructive actions.

| Token | Value | Role |
| --- | --- | --- |
| `{colors.positive}` | `#2ead4b` | Healthy or completed state |
| `{colors.positive-deep}` | `#054d28` | Positive text on light surfaces |
| `{colors.warning}` | `#ffd11a` | Attention state |
| `{colors.warning-deep}` | `#b86700` | Warning text and emphasis |
| `{colors.warning-content}` | `#4a3b1c` | Text on warning surfaces |
| `{colors.negative}` | `#d03238` | Shortfall and destructive action |
| `{colors.negative-deep}` | `#a72027` | Destructive active state |
| `{colors.negative-darkest}` | `#a7000d` | Highest-emphasis error text |
| `{colors.negative-bg}` | `#320707` | Dark negative callout |

Secondary accents are reserved for data visualization: `{colors.accent-orange}`
for bills and commitments, and `{colors.accent-cyan}` for savings or future
capacity. They should not compete with the lime primary action.

## Typography

AfterBills uses two freely available families with clear roles:

1. **Manrope** (`--font-display`) carries brand moments, totals, and page
   headings. Use 700–800 for a sturdy, friendly financial voice.
2. **Inter** (`--font-body`) carries labels, explanatory copy, form controls,
   and navigation. Use 400 for body copy and 600 for emphasis.

Recommended hierarchy:

| Role | Size | Weight | Use |
| --- | --- | --- | --- |
| Display total | 40–48px | 800 | Safe-to-spend and runway totals |
| Page heading | 24–32px | 800 | Main route heading |
| Card heading | 14–16px | 700 | Section and card labels |
| Body | 14–16px | 400 | Explanations and form content |
| Caption | 11–12px | 400–600 | Metadata and helper text |
| Action | 13–16px | 700–800 | Buttons and primary links |

Use tabular numerals for money, percentages, days, and runway values. Never use
all caps for a long sentence; uppercase is limited to short eyebrow labels.

## Shape and spacing

The base spacing unit is 4px. Use the existing scale: 4, 8, 12, 16, 24, 32,
and 48px. A 24px radius (`{rounded.xl}`) is the default for cards and primary
actions. Use 12–16px for inputs and compact controls, and full rounding for
status pills and icon containers.

Surface contrast is the primary elevation cue: cards are white on the sage
canvas. Add a very light border or soft shadow only when adjacent surfaces need
separation. Avoid heavy gradients and decorative shadows.

## Layout principles

- The home route leads with one number: **Safe to Spend today**.
- Bills, savings, and spend are presented as a payday allocation; label the
  first bucket “Bills reserve” rather than implying AfterBills holds funds.
- A desktop sidebar becomes a compact mobile header and bottom navigation.
- Keep content inside a readable max-width and use one-column stacking below
  768px.
- Every primary action must have an obvious focus state and a touch target of at
  least 44px.
- Empty states should explain the next useful action, not merely say “none”.
- Shortfalls should state the amount and next date in plain language.

## Component vocabulary

### Primary action

Use `{colors.primary}` with `{colors.on-primary}` text, 12–16px vertical
padding, a 24px radius, and a concise verb. Hover uses
`{colors.primary-active}`. Keep one dominant primary action per visible region.

### Secondary action

Use a white or sage surface with ink text and a thin neutral border. Secondary
actions should support the primary task without looking disabled.

### Financial card

Use a white surface, 20–24px internal padding, a 24px radius, and a short
eyebrow label above the number. Data cards may use a dark ink surface when the
number needs visual priority; use lime only for the key value or action.

### Status badge

Use a pill shape with a semantic background/text pair. Pair the badge with a
text explanation when the state could affect a spending decision.

### Auth surfaces

Clerk components inherit the AfterBills palette through the provider appearance
configuration. Keep authentication copy product-led and use the AfterBills icon
asset wherever a custom logo slot is available. Never display third-party
development or vendor branding as part of the product chrome.

## Accessibility and motion

Text and controls must retain readable contrast against every token pair. Do not
use color alone to communicate a danger day or a completed action. Motion is
short and purposeful: use 150–300ms transitions for state changes and avoid
looping animation outside loading indicators. Respect reduced-motion preferences
for any future chart or onboarding animation.

## Do and don’t

### Do

- Make the remaining amount after bills immediately scannable.
- Use lime for a deliberate action, not for every positive data point.
- Pair financial numbers with a time frame such as “today”, “this week”, or
  “due 18 Aug”.
- Reuse the shared tokens and typography roles.
- Keep the product promise visible: AfterBills helps plan money; it does not
  hold, move, or transfer it.

### Don’t

- Add another brand accent or invent a competing visual language.
- Use vague labels such as “vault” when “reserve” or “allocation” is clearer.
- Turn every card into a dark promotional panel.
- Hide a shortfall behind a green success color.
- Add vendor names, placeholder codenames, or development warnings to customer
  facing surfaces.
