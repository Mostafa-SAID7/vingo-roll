# Complete Image Mapping Guide

## All Available Product Images

### Organized by Location and Product

#### Material/ Folder Structure

```
Material/
├── BelgianLinen/
│   └── Aurelle/ (3 images)
│       ├── Aurelle1.jpg
│       ├── Aurelle2.webp
│       └── Aurelle3.jpg
├── BrushedCotton/
│   └── Nocturne/ (3 images)
│       ├── Nocturne1.webp
│       ├── Nocturne2.webp
│       └── Nocturne3.webp
├── SilkVelvet/ (3 images - no subfolder)
│   ├── VelvetDrape1.jpg
│   ├── VelvetDrape2.jpg
│   └── VelvetDrape3.jpg
└── WoolBlend/ (empty - ready for images)
```

#### Public/images/products/ Folder Structure

```
products/
├── woven-shade.jpg (single file - shared product image)
├── Draper/ (3 images - VEIL SHEER VOILE PANEL)
│   ├── Draper1.jpg
│   ├── Draper2.webp
│   └── Draper3.jpg
├── LinenBlend/ (3 images - DUNE SHEER LINEN BLEND)
│   ├── Dune Sheer Linen Blend.jpg
│   ├── Dune Sheer Linen Blend2.webp
│   └── Dune Sheer Linen Blend3.webp
├── VoilePanel/ (3 images - HEARTH THERMAL?)
│   ├── VoilePanel.jpg
│   ├── VoilePanel2.webp
│   └── VoilePanel3.avif
└── Thermal/ (3 images - HEARTH THERMAL OR OBSIDIAN?)
    ├── Thermal1.png
    ├── Thermal2.webp
    └── Thermal3.jpg
```

## Image-to-Product Matching Guide

### Ready to Use (✅ Matched)

| Image Folder                    | Product                       | Product Slug                  | Material       | Primary Image    | Status    |
| ------------------------------- | ----------------------------- | ----------------------------- | -------------- | ---------------- | --------- |
| Material/BelgianLinen/Aurelle   | Aurelle Belgian Linen Curtain | aurelle-belgian-linen-curtain | Belgian Linen  | Aurelle1.jpg     | ✅ IN USE |
| Material/BrushedCotton/Nocturne | Nocturne Blackout Drape       | nocturne-blackout-drape       | Brushed Cotton | Nocturne1.webp   | ✅ IN USE |
| Material/SilkVelvet             | Marsh Silk Velvet Drape       | marsh-velvet-drape            | Silk Velvet    | VelvetDrape1.jpg | ✅ IN USE |

### Unmatched Images (❌ Need Assignment)

| Image Folder        | Files    | Best Match Product                | Reason                                 |
| ------------------- | -------- | --------------------------------- | -------------------------------------- |
| products/Draper     | 3 images | Atelier Pinch Pleat Drapery       | "Draper" suggests high-end drapery     |
| products/LinenBlend | 3 images | Dune Sheer Linen Blend            | File name matches product exactly      |
| products/VoilePanel | 3 images | Veil Sheer Voile Panel            | "Voile" + "Panel" matches product name |
| products/Thermal    | 3 images | Hearth Thermal Interlined Curtain | "Thermal" matches product name         |

## Recommended Mapping

### Product Image Updates Needed

```typescript
// FROM current generic:
image: IMG.hero,  // Generic hero image
image: IMG.bedroom,  // Generic bedroom image
image: IMG.woven,  // Generic woven image

// TO specific product images:
```

#### Product by Product Mapping

| Product                           | Current Image  | Recommended Image                                 | Path                                                     |
| --------------------------------- | -------------- | ------------------------------------------------- | -------------------------------------------------------- |
| Aurelle Belgian Linen Curtain     | ❌ IMG.hero    | ✅ Material/BelgianLinen/Aurelle/Aurelle1.jpg     | `/images/Material/BelgianLinen/Aurelle/Aurelle1.jpg`     |
| Nocturne Blackout Drape           | ❌ IMG.bedroom | ✅ Material/BrushedCotton/Nocturne/Nocturne1.webp | `/images/Material/BrushedCotton/Nocturne/Nocturne1.webp` |
| Veil Sheer Voile Panel            | IMG.hero       | products/VoilePanel/VoilePanel.jpg                | `/images/products/VoilePanel/VoilePanel.jpg`             |
| Hearth Thermal Interlined Curtain | IMG.linen      | products/Thermal/Thermal1.png                     | `/images/products/Thermal/Thermal1.png`                  |
| Atelier Pinch Pleat Drapery       | IMG.hero       | products/Draper/Draper1.jpg                       | `/images/products/Draper/Draper1.jpg`                    |
| Solstice Solar Roller Shade       | IMG.woven      | products/woven-shade.jpg                          | `/images/products/woven-shade.jpg`                       |
| Meridian Motorized Roller Shade   | IMG.bedroom    | Material/SilkVelvet/VelvetDrape1.jpg              | `/images/Material/SilkVelvet/VelvetDrape1.jpg`           |
| Canton Flat-Fold Roman Shade      | IMG.woven      | products/woven-shade.jpg                          | `/images/products/woven-shade.jpg`                       |
| Grove Woven Grass Shade           | IMG.woven      | products/woven-shade.jpg                          | `/images/products/woven-shade.jpg`                       |
| Linden Hardwood Blind             | IMG.woven      | products/woven-shade.jpg                          | `/images/products/woven-shade.jpg`                       |
| Dune Sheer Linen Blend            | IMG.linen      | products/LinenBlend/Dune Sheer Linen Blend.jpg    | `/images/products/LinenBlend/Dune Sheer Linen Blend.jpg` |
| Obsidian Blackout Roller          | IMG.bedroom    | products/Thermal/Thermal1.png                     | `/images/products/Thermal/Thermal1.png`                  |
| Marsh Silk Velvet Drape           | ❌ IMG.bedroom | ✅ Material/SilkVelvet/VelvetDrape1.jpg           | `/images/Material/SilkVelvet/VelvetDrape1.jpg`           |
| Harbor Outdoor Shade              | IMG.woven      | products/woven-shade.jpg                          | `/images/products/woven-shade.jpg`                       |

## Priority Updates

### High Priority (3 Updates Needed - Done: 3/3)

✅ Aurelle - DONE
✅ Nocturne - DONE
✅ Marsh Velvet Drape - DONE

### Medium Priority (4 Updates Needed)

1. **Veil Sheer Voile Panel** ← products/VoilePanel/VoilePanel.jpg
2. **Hearth Thermal Interlined Curtain** ← products/Thermal/Thermal1.png
3. **Atelier Pinch Pleat Drapery** ← products/Draper/Draper1.jpg
4. **Dune Sheer Linen Blend** ← products/LinenBlend/Dune Sheer Linen Blend.jpg

### Low Priority (Can Stay Generic)

- Solstice Solar Roller Shade
- Canton Flat-Fold Roman Shade
- Grove Woven Grass Shade
- Linden Hardwood Blind
- Obsidian Blackout Roller
- Harbor Outdoor Shade
- Meridian Motorized Roller Shade

## Implementation Plan

### Step 1: Update Medium Priority Products

Update these in `src/data/products.ts`:

```typescript
// Veil Sheer Voile Panel
image: "/images/products/VoilePanel/VoilePanel.jpg",

// Hearth Thermal Interlined Curtain
image: "/images/products/Thermal/Thermal1.png",

// Atelier Pinch Pleat Drapery
image: "/images/products/Draper/Draper1.jpg",

// Dune Sheer Linen Blend
image: "/images/products/LinenBlend/Dune Sheer Linen Blend.jpg",
```

### Step 2: Organize Images

Consider moving all images to unified Material-based structure:

```
images/
├── materials/
│   ├── belgian-linen/
│   │   ├── aurelle/
│   │   ├── dune-linen-blend/
│   │   └── (other belgian-linen products)
│   ├── brushed-cotton/
│   │   └── nocturne/
│   ├── silk-velvet/
│   │   └── velvet-drape/
│   └── wool-blend/
├── hero/
├── rooms/
└── textures/
```

### Step 3: Update Image Gallery

Each product shows multiple images:

- Primary image (first)
- Detail image (second)
- Alternate angle (third)

Example for Veil Sheer Voile Panel:

```typescript
images: [
  {
    src: "/images/products/VoilePanel/VoilePanel.jpg",
    alt: "Veil Sheer Voile Panel",
    kind: "main",
  },
  { src: "/images/products/VoilePanel/VoilePanel2.webp", alt: "Detail view", kind: "detail" },
  { src: "/images/products/VoilePanel/VoilePanel3.avif", alt: "Alternate angle", kind: "room" },
];
```

## Summary

**Total Images Available**: 18 images

- ✅ 3 products with matched images (in use)
- 4 products with unmatched images (need assignment)
- 7 products using generic fallback images (acceptable)

**Images Organized By**:

- Material family (BelgianLinen, BrushedCotton, SilkVelvet, WoolBlend)
- Product category (Draper, LinenBlend, VoilePanel, Thermal)
- Image type (main, detail, alternate)

**Next Steps**:

1. Update 4 medium-priority products with matched images
2. Test image display in product pages
3. Organize images into unified structure
4. Add additional missing product images over time
