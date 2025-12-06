#!/usr/bin/env python3
"""
Image Resizing & Organization Script
Resizes and moves all images to correct folders with proper dimensions
"""

from PIL import Image
import os
import shutil

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

base_path = r'd:\E-commerce web\frontend\public\images'

print("=" * 60)
print("🖼️  IMAGE RESIZING & ORGANIZATION SCRIPT")
print("=" * 60)

total_processed = 0
total_errors = 0

for op in operations:
    folder = op['folder']
    size = op['size']
    images = op['images']
    
    folder_path = os.path.join(base_path, folder)
    
    print(f"\n📁 Processing {folder.upper()}...")
    print(f"   Target size: {size[0]}×{size[1]}px")
    
    for img_name in images:
        img_path = os.path.join(base_path, img_name)
        output_path = os.path.join(folder_path, img_name)
        
        if os.path.exists(img_path):
            try:
                img = Image.open(img_path)
                original_size = img.size
                
                # Resize with maintaining aspect ratio
                img.thumbnail(size, Image.Resampling.LANCZOS)
                
                # Create new image with exact size (center content)
                new_img = Image.new('RGB', size, (255, 255, 255))
                offset = ((size[0] - img.width) // 2, (size[1] - img.height) // 2)
                new_img.paste(img, offset)
                
                # Save with compression
                new_img.save(output_path, 'JPEG', quality=85, optimize=True)
                file_size = os.path.getsize(output_path) / 1024  # KB
                
                print(f"   ✓ {img_name:35} {original_size} → {size} ({file_size:.1f}KB)")
                total_processed += 1
                
            except Exception as e:
                print(f"   ✗ {img_name:35} ERROR: {str(e)}")
                total_errors += 1
        else:
            print(f"   ✗ {img_name:35} NOT FOUND in base directory")
            total_errors += 1

print("\n" + "=" * 60)
print(f"✅ COMPLETED!")
print(f"   Processed: {total_processed} images")
print(f"   Errors: {total_errors}")
print(f"   Location: {base_path}")
print("=" * 60)
