# Image Organization Guide

## Current Image Structure

### Directory Layout

```
public/images/
├── fabrics/
│   └── linen-texture.jpg              (texture close-up)
├── hero/
│   └── hero-living-room.jpg           (hero banner)
├── products/
│   └── woven-shade.jpg                (product main)
├── rooms/
│   └── bedroom-blackout.jpg           (room showcase)
└── Material/
    ├── BelgianLinen/
    │   └── Aurelle/
    │       ├── Aurelle1.jpg           (primary product image)
    │       ├── Aurelle2.webp          (alternate angle)
    │       └── Aurelle3.jpg           (detail view)
    ├── BrushedCotton/
    │   └── Nocturne/
    │       ├── Nocturne1.webp         (primary product image)
    │       ├── Nocturne2.webp         (alternate angle)
    │       └── Nocturne3.webp         (detail view)
    ├── SilkVelvet/
    │   ├── VelvetDrape1.jpg           (primary product image)
    │   ├── VelvetDrape2.jpg           (alternate angle)
    │   └── VelvetDrape3.jpg           (detail view)
    └── WoolBlend/
        (Empty - no products yet)
```

## Image Usage Mapping

### Product Collection Mapping

| Product Slug | Name | Material | Collection | Primary Image | Source |
|--------------|------|----------|-----------|---------------|--------|
| aurelle-belgian-linen-curtain | Aurelle Belgian Linen Curtain | Belgian Linen | col-natural | Material/BelgianLinen/Aurelle/Aurelle1.jpg | ✅ NEW |
| nocturne-blackout-drape | Nocturne Blackout Drape | Brushed Cotton | col-designer | Material/BrushedCotton/Nocturne/Nocturne1.webp | ✅ NEW |
| veil-sheer-voile-panel | Veil Sheer Voile Panel | Belgian Linen | col-minimal | (needs image) | ❌ MISSING |
| hearth-thermal-interlined-curtain | Hearth Thermal Interlined Curtain | Wool Blend | col-classic | (needs image) | ❌ MISSING |
| atelier-pinch-pleat-drapery | Atelier Pinch Pleat Drapery | Belgian Linen | col-designer | (needs image) | ❌ MISSING |
| solstice-solar-roller-shade | Solstice Solar Roller Shade | Belgian Linen | col-minimal | public/images/products/woven-shade.jpg | ✅ EXISTING |
| meridian-motorized-roller-shade | Meridian Motorized Roller Shade | Silk Velvet | col-contemporary | public/images/rooms/bedroom-blackout.jpg | ✅ EXISTING |
| canton-flat-fold-roman-shade | Canton Flat-Fold Roman Shade | Belgian Linen | col-classic | public/images/products/woven-shade.jpg | ✅ EXISTING |
| grove-woven-grass-shade | Grove Woven Grass Shade | Belgian Linen | col-natural | public/images/products/woven-shade.jpg | ✅ EXISTING |
| linden-hardwood-blind | Linden Hardwood Blind | Belgian Linen | col-classic | public/images/products/woven-shade.jpg | ✅ EXISTING |
| dune-sheer-linen-blend | Dune Sheer Linen Blend | Belgian Linen | col-seasonal | (needs image) | ❌ MISSING |
| obsidian-blackout-roller | Obsidian Blackout Roller | Wool Blend | col-contemporary | public/images/rooms/bedroom-blackout.jpg | ✅ EXISTING |
| marsh-velvet-drape | Marsh Silk Velvet Drape | Silk Velvet | col-designer | Material/SilkVelvet/VelvetDrape1.jpg | ✅ NEW |
| harbor-outdoor-shade | Harbor Outdoor Shade | Belgian Linen | col-seasonal | public/images/products/woven-shade.jpg | ✅ EXISTING |

## Material-to-Product Assignment

### Belgian Linen Products
- Aurelle Belgian Linen Curtain ✅ (Material/BelgianLinen/Aurelle/)
- Veil Sheer Voile Panel
- Atelier Pinch Pleat Drapery
- Solstice Solar Roller Shade
- Canton Flat-Fold Roman Shade
- Grove Woven Grass Shade
- Linden Hardwood Blind
- Dune Sheer Linen Blend
- Harbor Outdoor Shade

### Brushed Cotton Products
- Nocturne Blackout Drape ✅ (Material/BrushedCotton/Nocturne/)

### Wool Blend Products
- Hearth Thermal Interlined Curtain
- Obsidian Blackout Roller

### Silk Velvet Products
- Meridian Motorized Roller Shade (shared from Silk Velvet)
- Marsh Silk Velvet Drape ✅ (Material/SilkVelvet/VelvetDrape/)

## Recommended Image Organization

### Option 1: Material-Based Organization (Recommended)
```
public/images/
├── materials/
│   ├── belgian-linen/
│   │   ├── aurelle/
│   │   │   ├── aurelle-1.jpg
│   │   │   ├── aurelle-2.webp
│   │   │   └── aurelle-3.jpg
│   │   ├── dune/
│   │   │   ├── dune-1.jpg
│   │   │   └── dune-2.webp
│   │   └── (other belgian-linen products...)
│   ├── brushed-cotton/
│   │   ├── nocturne/
│   │   │   ├── nocturne-1.webp
│   │   │   ├── nocturne-2.webp
│   │   │   └── nocturne-3.webp
│   ├── wool-blend/
│   ├── silk-velvet/
│   │   ├── velvet-drape/
│   │   │   ├── velvet-drape-1.jpg
│   │   │   ├── velvet-drape-2.jpg
│   │   │   └── velvet-drape-3.jpg
├── collections/
│   ├── designer-edit/
│   ├── natural-textures/
│   ├── minimal/
│   ├── classic/
│   ├── contemporary/
│   └── seasonal/
├── hero/
├── products/
├── rooms/
└── textures/
```

### Option 2: Product-Based Organization
```
public/images/
├── products/
│   ├── aurelle-belgian-linen-curtain/
│   │   ├── primary.jpg
│   │   ├── detail.webp
│   │   └── in-room.jpg
│   ├── nocturne-blackout-drape/
│   │   ├── primary.webp
│   │   ├── detail.webp
│   │   └── in-room.webp
│   └── (other products...)
├── collections/
├── hero/
└── textures/
```

## Recommended Implementation

I recommend **Option 1: Material-Based Organization** because:

1. **Scalability** - As products grow, keeps images organized by material families
2. **Reusability** - Multiple products sharing same material can reuse images
3. **Performance** - Grouped images load together naturally
4. **SEO** - Clear semantic folder structure
5. **CMS-friendly** - Aligns with product attribute system

## Image File Naming Convention

### Pattern
```
{product-slug}-{variant}-{index}.{format}

Examples:
aurelle-primary-1.jpg
aurelle-detail-1.webp
aurelle-alternate-1.jpg
```

### Variants
- `primary` - Main product image (usually first)
- `detail` - Close-up of fabric/texture
- `alternate` - Alternative angle/setup
- `in-room` - Product in a styled room
- `texture` - Extreme close-up of weave

## Current Images to Use

### ✅ Ready to Use
1. **Aurelle** (Material/BelgianLinen/Aurelle/)
   - Aurelle1.jpg → aurelle-primary-1.jpg
   - Aurelle2.webp → aurelle-detail-1.webp
   - Aurelle3.jpg → aurelle-alternate-1.jpg

2. **Nocturne** (Material/BrushedCotton/Nocturne/)
   - Nocturne1.webp → nocturne-primary-1.webp
   - Nocturne2.webp → nocturne-detail-1.webp
   - Nocturne3.webp → nocturne-alternate-1.webp

3. **Silk Velvet Drape** (Material/SilkVelvet/)
   - VelvetDrape1.jpg → velvet-drape-primary-1.jpg
   - VelvetDrape2.jpg → velvet-drape-detail-1.jpg
   - VelvetDrape3.jpg → velvet-drape-alternate-1.jpg

### ✅ Existing Stock Images
- hero-living-room.jpg - Hero banner
- linen-texture.jpg - Texture reference
- woven-shade.jpg - Product generic
- bedroom-blackout.jpg - Room showcase

## Data Layer Updates Needed

Update `src/data/products.ts`:

```typescript
// Current
image: IMG.hero,  // Generic fallback

// New - Use material-specific images
image: "/images/materials/belgian-linen/aurelle/aurelle-primary-1.jpg",
```

## Next Steps

1. **Organize images** into recommended structure
2. **Update image paths** in products.ts data file
3. **Test image loading** for each product
4. **Optimize image formats** (WEBP for modern browsers)
5. **Add alt text** using product names
6. **Create image variants** (thumbnail, full-size) as needed

## Summary

**Current Status**: ✅ 3 product image sets ready
- Aurelle (3 images)
- Nocturne (3 images)
- Silk Velvet Drape (3 images)

**Action Items**:
1. Rename image files for consistency
2. Update products.ts with new image paths
3. Continue adding missing product images
4. Test image loading and display
