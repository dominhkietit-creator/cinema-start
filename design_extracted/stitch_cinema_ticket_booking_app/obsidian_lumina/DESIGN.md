---
name: Obsidian Lumina
colors:
  surface: '#121317'
  surface-dim: '#121317'
  surface-bright: '#38393e'
  surface-container-lowest: '#0d0e12'
  surface-container-low: '#1a1b20'
  surface-container: '#1f1f24'
  surface-container-high: '#292a2e'
  surface-container-highest: '#343439'
  on-surface: '#e3e2e8'
  on-surface-variant: '#d5c4ab'
  inverse-surface: '#e3e2e8'
  inverse-on-surface: '#2f3035'
  outline: '#9e8f78'
  outline-variant: '#514532'
  surface-tint: '#ffba20'
  primary: '#ffdca1'
  on-primary: '#412d00'
  primary-container: '#ffb800'
  on-primary-container: '#6b4c00'
  inverse-primary: '#7c5800'
  secondary: '#ffb5a0'
  on-secondary: '#601400'
  secondary-container: '#ff5625'
  on-secondary-container: '#541000'
  tertiary: '#93eeff'
  on-tertiary: '#00363d'
  tertiary-container: '#00d8f1'
  on-tertiary-container: '#005a65'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdea8'
  primary-fixed-dim: '#ffba20'
  on-primary-fixed: '#271900'
  on-primary-fixed-variant: '#5e4200'
  secondary-fixed: '#ffdbd1'
  secondary-fixed-dim: '#ffb5a0'
  on-secondary-fixed: '#3b0900'
  on-secondary-fixed-variant: '#872000'
  tertiary-fixed: '#9cf0ff'
  tertiary-fixed-dim: '#00daf3'
  on-tertiary-fixed: '#001f24'
  on-tertiary-fixed-variant: '#004f58'
  background: '#121317'
  on-background: '#e3e2e8'
  surface-variant: '#343439'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.04em
  label-md:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.06em
  label-sm:
    fontFamily: Space Grotesk
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 0.75rem
  margin: 1.5rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system crafts an immersive, late-night cinematic environment tailored for native iOS and Android experiences. It channels the visceral anticipation of walking down an illuminated theater aisle: rich deep-space blacks, radiant neon light spills, and tactile, high-ticket physical metaphors. 

The aesthetic is a hybrid of **Atmospheric Glassmorphism** and **Tactile Modernismo**:
- **Immersion:** Deep, multi-layered obsidian and navy backdrops preserve visual focus on vibrant promotional key art and theater seat selectors.
- **Luminance:** Controlled neon accents (Golden Amber, Cinema Crimson, Neon Cyan) function like auditorium aisle LED guides, drawing immediate interaction focus without causing eye fatigue.
- **Physicality:** Ticket components borrow physical movie ticket architecture—complete with perforated notches, barcode textures, and translucent laminate surfaces—digitized into interactive glass.
- **Emotion:** Premium, anticipatory, effortless, and exclusive.

## Colors

The palette relies on absolute darkness juxtaposed against hyper-saturated light sources to replicate modern theater ambience.

### Roles & Semantic Distribution
- **Background Root (`#0B0C10`):** Void-black base for full app canvas, system status bars, and navigation rail foundations.
- **Surface Layer 1 (`#13151D`):** Elevated cards, bottom navigation containers, and modal sheets.
- **Surface Layer 2 (`#1E2230`):** Interactive inputs, nested cards, chip rests, and inactive cinema seat nodes.
- **Primary Accent (`#FFB800`):** Golden Amber. Denotes premium tiers (IMAX, VIP), star ratings, selected active seats, and primary purchase CTAs.
- **Secondary Accent (`#FF4D15`):** Cinema Crimson/Orange. Directs urgency, live bookings, sold-out indicators, and promo flashes.
- **Tertiary Accent (`#00E5FF`):** Neon Cyan. Exclusively dedicated to technology highlights (Dolby Atmos, 4DX, ScreenX tags, screen curve representations, and live scan lines).
- **Text Primary (`#FFFFFF`):** High-contrast readability across all dark surfaces.
- **Text Secondary (`#94A3B8`):** Metadata, runtimes, cast names, and secondary subtitles.
- **Border / Divider Overlay (`rgba(255, 255, 255, 0.08)`): Ghost hairline borders structuring translucent surfaces.

## Typography

The typographic hierarchy combines contemporary warmth with technological precision:
- **Display & Headlines (Plus Jakarta Sans):** Brings soft geometric forms, dynamic personality, and strong brand presence to movie titles, cinema hall names, and banner headings.
- **Body & Copy (Inter):** Highly legible, neutral, and structurally sound across constrained mobile widths for synopses, actor bios, policies, and pricing breakdowns.
- **Labels, Badges & Metadata (Space Grotesk):** Gives a high-tech, cinematic ticket counter feel to booking references, screening times (e.g., `21:45`), seat identifiers (`ROW G - SEAT 14`), and format tags (`IMAX 3D`).

## Layout & Spacing

The layout is built for native mobile ergonomics with single-handed thumb zone access in mind.

### Grid & Ergonomics
- **Fluid Mobile Canvas:** Fluid vertical stack using `1.25rem` (`20px`) margins on mobile phones and expanding to `1.5rem` (`24px`) on tablets.
- **Thumb Zone Anchoring:** Crucial interactive elements—checkout triggers, sticky seat pricing summaries, and dynamic date pickers—are pinned to the bottom 40% of the screen.
- **Poster Carousels:** Horizontal peek grids using `gutter-mobile` (`12px`) allowing adjacent posters to peek by `15%`, reinforcing lateral swipe discoverability.
- **SafeArea Integration:** Top margins dynamically pad below the dynamic island or camera cutout; bottom navigation layers pad above home indicators with native translucency.

## Elevation & Depth

Visual hierarchy uses frosted glassmorphic layering, subtle neon aura diffusion, and fine-line borders rather than heavy standard drop shadows.

### Elevation Hierarchy
1. **Canvas (Level 0):** Pure `#0B0C10`. Base background.
2. **Backdrop Blur & Glass Sheets (Level 1):** Background `#13151D` at `80%` opacity with a `24px` backdrop blur (`backdrop-filter: blur(24px)`). Used for sticky headers, search headers, and bottom tab bars. Framed with an outer top edge stroke of `rgba(255, 255, 255, 0.12)`.
3. **Elevated Cards & Tickets (Level 2):** Background `#1E2230` with subtle border `1px solid rgba(255, 255, 255, 0.08)`.
4. **Neon Aura / Luminescent Focus (Level 3):** Reserved for active interaction (Selected seats, Pay button, VIP badges). Layer uses a colored ambient drop shadow:
   - Primary Golden Amber: `0 8px 24px rgba(255, 184, 0, 0.35)`
   - Cinema Crimson: `0 8px 24px rgba(255, 77, 21, 0.35)`
   - Neon Cyan screen glow: `0 0 32px rgba(0, 229, 255, 0.4)` representing curved cinema projection screens.

## Shapes

The shape system employs generous, modern radii that blend sleek mobile hardware corners with classic rounded theater tokens.
- **Global Corners:** Base elements use `rounded` (`0.5rem` / `8px`), large cards and bottom sheets use `rounded-lg` (`1rem` / `16px`), while featured ticket containers and promotional hero surfaces employ `rounded-xl` (`1.5rem` / `24px`).
- **Pill Badges:** Metadata tags, timeslots, and micro-actions utilize complete pill enclosures (`9999px`).
- **Ticket Notches:** Cinema ticket components feature dual inward semi-circle cutouts (radius `12px`) positioned at the dividing line between the movie details and barcode stubs, masked using SVG clipping paths.

## Components

### Buttons
- **Primary CTA ("Book Tickets", "Pay"):** Solid Golden Amber (`#FFB800`) fill, obsidian text (`#0B0C10`), `Space Grotesk` uppercase tracking, `rounded-lg` (`16px`), with an active tactile press state (scales to `0.98` with an inner amber rim glow).
- **Secondary / Action ("Watch Trailer"):** Frosted obsidian surface (`rgba(30, 34, 48, 0.7)`), `1px` white border (`rgba(255, 255, 255, 0.15)`), white text, featuring an illuminated play icon.
- **Destructive / Urgent ("Cancel Seat", "Expiring"):** Cinema Crimson stroke with an ambient red hover glow.

### Interactive Cinema Seat Matrix
- **Available Seat:** Subtle `#1E2230` rounded square with a top curve; soft border (`rgba(255, 255, 255, 0.1)`).
- **Selected Seat:** Radiant `#FFB800` fill with a `0 0 12px rgba(255, 184, 0, 0.5)` aura glow.
- **Reserved / Occupied Seat:** Deep muted gray-black (`#111317`) with `40%` opacity; non-interactive.
- **VIP / Couch Category:** Double-width rounded shape with a faint amber hairline boundary.

### Movie Ticket Component
- **Structure:** Dual-card stack joined by a perforated dashed seam (`rgba(255, 255, 255, 0.2)`).
- **Visual Features:** Left and right punch notches, frosted glass surface (`#13151D` at `85%` opacity), luminous QR / Barcode display container, and glowing status badge (e.g., "CONFIRMED" in Neon Cyan).

### Chips & Showtime Selectors
- **Time Slots:** Default state has `#1E2230` fill, white text, and Space Grotesk font. Active state swaps to `#FFB800` text with an amber rim border and glowing background aura.
- **Screen Format Chips (IMAX, 3D, Dolby):** Compact pills framed with a `1px` Neon Cyan border (`#00E5FF`) and low-opacity cyan backing tint.

### Inputs & Search Bars
- **Search & Filter:** Dark recessed background (`#13151D`), borderless or hairline-stroke, magnifying glass icon with secondary label placeholder (`#94A3B8`). On focus, transitions to a razor-thin Neon Cyan border glow.

### Bottom Navigation & App Bar
- **Floating Glass Dock:** Island-style docked navigation elevated over scrolling movie lists; features a `24px` backdrop blur, subtle inner top shadow, and indicator glow dots beneath active navigation icons.