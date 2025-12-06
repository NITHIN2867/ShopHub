# 📐 IMAGE RESIZING & ORGANIZATION GUIDE

Your images are ready to be organized and resized. Follow these steps:

---

## 🎯 REQUIRED SIZES BY CATEGORY

| Category | Files | Required Size | Aspect Ratio |
|----------|-------|---------------|--------------|
| **Carousel** | 5 | 1200×500px | 2.4:1 (wide) |
| **Electronics** | 14 | 400×400px | 1:1 (square) |
| **Fashion** | 8 | 400×500px | 4:5 (portrait) |
| **Home Appliances** | 8 | 400×400px | 1:1 (square) |
| **Home Decor** | 8 | 400×400px | 1:1 (square) |
| **Furniture** | 8 | 400×500px | 4:5 (portrait) |

---

## 📋 IMAGE ORGANIZATION MAP

### CAROUSEL (5 images)
```
Move these to: frontend/public/images/carousel/
- slide1-banner.jpg → Resize to 1200×500px
- slide2-banner.jpg → Resize to 1200×500px
- slide3-banner.jpg → Resize to 1200×500px
- slide4-banner.jpg → Resize to 1200×500px
- slide5-banner.jpg → Resize to 1200×500px
```

### ELECTRONICS (14 images)
```
Move these to: frontend/public/images/electronics/
- wireless-headphones.jpg → Resize to 400×400px
- smart-watch.jpg → Resize to 400×400px
- power-bank.jpg → Resize to 400×400px
- smartphone.jpg → Resize to 400×400px
- keyboard-mouse.jpg → Resize to 400×400px
- bluetooth-speaker.jpg → Resize to 400×400px
- webcam.jpg → Resize to 400×400px
- usb-hub.jpg → Resize to 400×400px
- mechanical-keyboard.jpg → Resize to 400×400px
- laptop.jpg → Resize to 400×400px
- tablet.jpg → Resize to 400×400px
- monitor.jpg → Resize to 400×400px
- external-ssd.jpg → Resize to 400×400px
- gaming-mouse.jpg → Resize to 400×400px
```

### FASHION (8 images)
```
Move these to: frontend/public/images/fashion/
- casual-tshirt.jpg → Resize to 400×500px
- denim-jeans.jpg → Resize to 400×500px
- formal-shirt.jpg → Resize to 400×500px
- sunglasses.jpg → Resize to 400×500px
- leather-belt.jpg → Resize to 400×500px
- canvas-shoes.jpg → Resize to 400×500px
- running-shoes.jpg → Resize to 400×500px
- backpack.jpg → Resize to 400×500px
```

### HOME APPLIANCES (8 images)
```
Move these to: frontend/public/images/home-appliances/
- coffee-maker.jpg → Resize to 400×400px
- blender.jpg → Resize to 400×400px
- toaster.jpg → Resize to 400×400px
- microwave.jpg → Resize to 400×400px
- air-fryer.jpg → Resize to 400×400px
- juicer.jpg → Resize to 400×400px
- mixer-grinder.jpg → Resize to 400×400px
- vacuum-cleaner.jpg → Resize to 400×400px
```

### HOME DECOR (8 images)
```
Move these to: frontend/public/images/home-decor/
- wall-art.jpg → Resize to 400×400px
- decorative-pillow.jpg → Resize to 400×400px
- throw-blanket.jpg → Resize to 400×400px
- table-lamp.jpg → Resize to 400×400px
- wall-mirror.jpg → Resize to 400×400px
- rug.jpg → Resize to 400×400px
- wall-clock.jpg → Resize to 400×400px
- plant-pot.jpg → Resize to 400×400px
```

### FURNITURE (8 images)
```
Move these to: frontend/public/images/home-furniture/
- sofa.jpg → Resize to 400×500px
- coffee-table.jpg → Resize to 400×500px
- dining-table.jpg → Resize to 400×500px
- bookshelf.jpg → Resize to 400×500px
- office-chair.jpg → Resize to 400×500px
- bed-frame.jpg → Resize to 400×500px
- wardrobe.jpg → Resize to 400×500px
- desk.jpg → Resize to 400×500px
```

---

## 🛠️ STEP-BY-STEP RESIZING INSTRUCTIONS

### OPTION 1: Using Online Tools (Easiest)

1. **Go to**: https://www.birme.net/ (Free batch resize)
2. **Upload** all images for one category
3. **Set size** to required dimensions
4. **Download** resized images
5. **Move** to correct folder in `frontend/public/images/`

### OPTION 2: Using Windows (Built-in)

**For Windows 11/10:**
1. Right-click image → "Open with" → "Paint"
2. Image → Resize → Set width & height
3. File → Save As
4. Move to correct folder

### OPTION 3: Using Python Script

Create a Python file `resize_images.py` and run it:

```python
from PIL import Image
import os

# Define resize operations
operations = [
    {
        'folder': 'carousel',
        'size': (1200, 500),
        'images': ['slide1-banner.jpg', 'slide2-banner.jpg', 'slide3-banner.jpg', 'slide4-banner.jpg', 'slide5-banner.jpg']
    },
    {
        'folder': 'electronics',
        'size': (400, 400),
        'images': ['wireless-headphones.jpg', 'smart-watch.jpg', 'power-bank.jpg', 'smartphone.jpg', 'keyboard-mouse.jpg', 'bluetooth-speaker.jpg', 'webcam.jpg', 'usb-hub.jpg', 'mechanical-keyboard.jpg', 'laptop.jpg', 'tablet.jpg', 'monitor.jpg', 'external-ssd.jpg', 'gaming-mouse.jpg']
    },
    {
        'folder': 'fashion',
        'size': (400, 500),
        'images': ['casual-tshirt.jpg', 'denim-jeans.jpg', 'formal-shirt.jpg', 'sunglasses.jpg', 'leather-belt.jpg', 'canvas-shoes.jpg', 'running-shoes.jpg', 'backpack.jpg']
    },
    {
        'folder': 'home-appliances',
        'size': (400, 400),
        'images': ['coffee-maker.jpg', 'blender.jpg', 'toaster.jpg', 'microwave.jpg', 'air-fryer.jpg', 'juicer.jpg', 'mixer-grinder.jpg', 'vacuum-cleaner.jpg']
    },
    {
        'folder': 'home-decor',
        'size': (400, 400),
        'images': ['wall-art.jpg', 'decorative-pillow.jpg', 'throw-blanket.jpg', 'table-lamp.jpg', 'wall-mirror.jpg', 'rug.jpg', 'wall-clock.jpg', 'plant-pot.jpg']
    },
    {
        'folder': 'home-furniture',
        'size': (400, 500),
        'images': ['sofa.jpg', 'coffee-table.jpg', 'dining-table.jpg', 'bookshelf.jpg', 'office-chair.jpg', 'bed-frame.jpg', 'wardrobe.jpg', 'desk.jpg']
    }
]

base_path = 'd:\\E-commerce web\\frontend\\public\\images'

for op in operations:
    folder = op['folder']
    size = op['size']
    images = op['images']
    
    folder_path = os.path.join(base_path, folder)
    
    for img_name in images:
        img_path = os.path.join(base_path, img_name)
        output_path = os.path.join(folder_path, img_name)
        
        if os.path.exists(img_path):
            try:
                img = Image.open(img_path)
                # Resize with maintaining aspect ratio
                img.thumbnail(size, Image.Resampling.LANCZOS)
                
                # Create new image with exact size (center content)
                new_img = Image.new('RGB', size, (255, 255, 255))
                offset = ((size[0] - img.width) // 2, (size[1] - img.height) // 2)
                new_img.paste(img, offset)
                
                # Save
                new_img.save(output_path, 'JPEG', quality=85)
                print(f'✓ Resized: {img_name} → {size}')
            except Exception as e:
                print(f'✗ Error: {img_name} - {str(e)}')
        else:
            print(f'✗ Not found: {img_name}')

print("\nDone! All images resized and organized.")
```

---

## 📌 QUICK CHECKLIST

- [ ] All 51 images in `frontend/public/images/`
- [ ] Carousel images: 5 × 1200×500px
- [ ] Electronics images: 14 × 400×400px
- [ ] Fashion images: 8 × 400×500px
- [ ] Home Appliances: 8 × 400×400px
- [ ] Home Decor: 8 × 400×400px
- [ ] Furniture images: 8 × 400×500px
- [ ] Images moved to correct folders
- [ ] Images compressed to < 200KB each

---

## 🔍 VERIFICATION

After resizing, verify folder structure:
```
frontend/public/images/
├── carousel/          (5 files, 1200×500px)
├── electronics/       (14 files, 400×400px)
├── fashion/           (8 files, 400×500px)
├── home-appliances/   (8 files, 400×400px)
├── home-decor/        (8 files, 400×400px)
└── home-furniture/    (8 files, 400×500px)
```

---

**Total: 51 Images | All Resized & Organized**
