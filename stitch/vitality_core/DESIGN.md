# Design System Specification: The Living Editorial

## 1. Overview & Creative North Star

This design system is built upon the North Star of **"The Clinical Concierge."** It is a visual philosophy that marries the precision of health science with the warmth of a high-end lifestyle brand. We move beyond the "app-in-a-box" aesthetic by utilizing an editorial layout style—characterized by generous breathing room, intentional asymmetry, and a sophisticated layering of warm, organic tones.

The goal is to make health tracking feel less like a chore and more like a curated wellness experience. We achieve this by rejecting rigid containers and harsh dividers in favor of **Tonal Architecture**: a method where hierarchy is defined by light and color rather than lines.

---

## 2. Color & Tonal Architecture

Our palette is anchored in a warm, sophisticated neutral base, punctuated by high-energy "Action Orange" and "Vitality Teal."

### The Color Palette (Material Design Mapping)
- **Primary (Action):** `#a13a00` (Main UI Action) / `#fd7b40` (Primary Container)
- **Secondary (Vitality):** `#006857` (Teal accents/success states)
- **Tertiary (Nudge):** `#705900` (Yellow/Gold informative accents)
- **Surface (Foundation):** `#f8f6f1` (Soft off-white background)

### The "No-Line" Rule
To maintain a premium, editorial feel, **1px solid borders are strictly prohibited for sectioning.** Boundaries must be defined solely through background color shifts. Use `surface-container-low` to define a section against a `surface` background. If elements feel "lost," increase the spacing rather than adding a stroke.

### Surface Hierarchy & Nesting
Treat the UI as a physical desk of fine stationery. 
- Use `surface-container-lowest` (pure white) for high-priority floating cards.
- Use `surface-container-highest` (`#deddd7`) for background utilities or search bars.
- **Nesting Principle:** An inner container must always be a lighter tier than its parent to "lift" toward the user.

### The "Glass & Gradient" Rule
For floating mobile menus or sticky headers, use **Glassmorphism**. Apply `surface` with 80% opacity and a `20px` backdrop-blur. 
- **Signature Texture:** For primary CTAs, use a linear gradient from `primary` to `primary_container` at a 135-degree angle. This adds a subtle "glow" that feels proactive and energized.

---

## 3. Typography: The Editorial Voice

We use a high-contrast typographic scale to create a clear narrative flow.

- **Headlines (Plus Jakarta Sans):** A friendly, rounded sans-serif. Use `display-lg` and `headline-lg` for hero moments. The rounded terminals mirror the "Calorie Snap" logo, making the interface feel approachable and human.
- **Body & Labels (Manrope):** A precise, highly legible sans-serif. This provides the "Clinical" balance to the "Concierge" headlines. 

**Typographic Intent:**
- Use `display-md` for data-heavy numbers (e.g., Calorie counts) to make them feel like a design feature rather than just data.
- Maintain a loose line-height (1.5x to 1.6x) for body text to ensure the "Editorial" feel.

---

## 4. Elevation & Depth

We reject the "drop shadow" defaults of the early 2010s. Depth in this system is achieved through light and layering.

### Tonal Layering
Place a `surface-container-lowest` card on a `surface-container-low` background. This creates a soft, natural lift that is felt rather than seen.

### Ambient Shadows
When a card must "float" (e.g., a proactive nudge), use an **Ambient Shadow**:
- **Color:** A 10% opacity version of `on-surface` (`#2e2f2c`).
- **Blur:** Large and diffused (e.g., `box-shadow: 0 20px 40px rgba(46, 47, 44, 0.06)`).
- This mimics natural light hitting a matte surface.

### The "Ghost Border" Fallback
If contrast ratios require a boundary for accessibility, use a **Ghost Border**: `outline-variant` (`#aeada9`) at **15% opacity**. Never use 100% opaque borders.

---

## 5. Components

### Buttons
- **Primary:** High-radius (`xl`: 1.5rem), using the Signature Gradient. No border. Text in `on-primary`.
- **Secondary:** `secondary_container` background with `on-secondary_container` text.
- **Tertiary:** No background. Bold `primary` text. Use for low-emphasis actions like "Cancel."

### Proactive "Nudge" Cards
Use `tertiary_container` (Pastel Yellow) or `secondary_fixed` (Pastel Teal) backgrounds. These cards should use `xl` (1.5rem) corner radius. They represent the "proactive" voice of the system—curated advice appearing just when needed.

### Input Fields
- **Background:** `surface_container_low`.
- **Shape:** `md` (0.75rem) roundedness.
- **Interaction:** On focus, transition the background to `surface_container_lowest` and add a 2px `ghost border` in `primary`.

### Cards & Lists
**Strictly no divider lines.** Separate list items using 16px of vertical whitespace or a subtle toggle between `surface` and `surface_container_low`. For data tables, use "Zebra Striping" with tonal shifts rather than grid lines.

### NutriLens Specific: The "Lens" Iconography
Icons should be line-based (2pt stroke) with "subtle fills"—meaning a small portion of the icon (like a leaf or a drop) is filled with a low-opacity version of `primary` or `secondary` to guide the eye.

---

## 6. Do's and Don'ts

### Do:
- **Do** use asymmetrical layouts. A data card on the left balanced by large whitespace and a "Nudge" card on the right feels premium.
- **Do** use "Plus Jakarta Sans" for all numbers. It makes health metrics feel like a brand asset.
- **Do** allow elements to overlap slightly (e.g., a photo breaking the boundary of a container) to increase the editorial "Living" feel.

### Don't:
- **Don't** use pure black `#000000` for text. Always use `on-surface` (`#2e2f2c`) to maintain the soft, organic warmth.
- **Don't** use standard Material Design elevation levels (Level 1, 2, 3). Use our Tonal Layering system instead.
- **Don't** cram information. If a screen feels full, it's time to create a new layer or use a "See More" progressive disclosure pattern.