# 📁 FOLDER SETUP & IMAGE PLACEMENT GUIDE

## Step 1: Create the Folder Structure

Open terminal and run:

```bash
cd frontend/public/images

mkdir carousel
mkdir electronics
mkdir fashion
mkdir home-appliances
mkdir home-decor
mkdir home-furniture
```

Or manually create these 6 folders in: `frontend/public/images/`

---

## Step 2: Download Images

### CAROUSEL FOLDER
Download 5 images and name them:
- slide1-banner.jpg
- slide2-banner.jpg
- slide3-banner.jpg
- slide4-banner.jpg
- slide5-banner.jpg

Place them in: `frontend/public/images/carousel/`

---

### ELECTRONICS FOLDER
Download 14 images with these exact names:
- wireless-headphones.jpg
- smart-watch.jpg
- power-bank.jpg
- smartphone.jpg
- keyboard-mouse.jpg
- bluetooth-speaker.jpg
- webcam.jpg
- usb-hub.jpg
- mechanical-keyboard.jpg
- laptop.jpg
- tablet.jpg
- monitor.jpg
- external-ssd.jpg
- gaming-mouse.jpg

Place them in: `frontend/public/images/electronics/`

---

### FASHION FOLDER
Download 8 images with these exact names:
- casual-tshirt.jpg
- denim-jeans.jpg
- formal-shirt.jpg
- sunglasses.jpg
- leather-belt.jpg
- canvas-shoes.jpg
- running-shoes.jpg
- backpack.jpg

Place them in: `frontend/public/images/fashion/`

---

### HOME APPLIANCES FOLDER
Download 8 images with these exact names:
- coffee-maker.jpg
- blender.jpg
- toaster.jpg
- microwave.jpg
- air-fryer.jpg
- juicer.jpg
- mixer-grinder.jpg
- vacuum-cleaner.jpg

Place them in: `frontend/public/images/home-appliances/`

---

### HOME DECOR FOLDER
Download 8 images with these exact names:
- wall-art.jpg
- decorative-pillow.jpg
- throw-blanket.jpg
- table-lamp.jpg
- wall-mirror.jpg
- rug.jpg
- wall-clock.jpg
- plant-pot.jpg

Place them in: `frontend/public/images/home-decor/`

---

### FURNITURE FOLDER
Download 8 images with these exact names:
- sofa.jpg
- coffee-table.jpg
- dining-table.jpg
- bookshelf.jpg
- office-chair.jpg
- bed-frame.jpg
- wardrobe.jpg
- desk.jpg

Place them in: `frontend/public/images/home-furniture/`

---

## Step 3: Final Folder Structure

After downloading all images, your structure should look like:

```
frontend/public/images/
├── carousel/
│   ├── slide1-banner.jpg
│   ├── slide2-banner.jpg
│   ├── slide3-banner.jpg
│   ├── slide4-banner.jpg
│   └── slide5-banner.jpg
├── electronics/
│   ├── wireless-headphones.jpg
│   ├── smart-watch.jpg
│   ├── power-bank.jpg
│   ├── smartphone.jpg
│   ├── keyboard-mouse.jpg
│   ├── bluetooth-speaker.jpg
│   ├── webcam.jpg
│   ├── usb-hub.jpg
│   ├── mechanical-keyboard.jpg
│   ├── laptop.jpg
│   ├── tablet.jpg
│   ├── monitor.jpg
│   ├── external-ssd.jpg
│   └── gaming-mouse.jpg
├── fashion/
│   ├── casual-tshirt.jpg
│   ├── denim-jeans.jpg
│   ├── formal-shirt.jpg
│   ├── sunglasses.jpg
│   ├── leather-belt.jpg
│   ├── canvas-shoes.jpg
│   ├── running-shoes.jpg
│   └── backpack.jpg
├── home-appliances/
│   ├── coffee-maker.jpg
│   ├── blender.jpg
│   ├── toaster.jpg
│   ├── microwave.jpg
│   ├── air-fryer.jpg
│   ├── juicer.jpg
│   ├── mixer-grinder.jpg
│   └── vacuum-cleaner.jpg
├── home-decor/
│   ├── wall-art.jpg
│   ├── decorative-pillow.jpg
│   ├── throw-blanket.jpg
│   ├── table-lamp.jpg
│   ├── wall-mirror.jpg
│   ├── rug.jpg
│   ├── wall-clock.jpg
│   └── plant-pot.jpg
└── home-furniture/
    ├── sofa.jpg
    ├── coffee-table.jpg
    ├── dining-table.jpg
    ├── bookshelf.jpg
    ├── office-chair.jpg
    ├── bed-frame.jpg
    ├── wardrobe.jpg
    └── desk.jpg
```

---

## Step 4: Add Products with Images to Database

After uploading images, you need to add products manually:

### Using Admin Dashboard:
1. Go to `/admin` (if you're admin user)
2. Add new product
3. Set image URL as: `/images/[category]/[filename].jpg`

### Example:
```
Product: Premium Wireless Headphones
Category: Electronics
Image URL: /images/electronics/wireless-headphones.jpg
Price: 4500
Original Price: 7500
Stock: 25
```

---

## ✅ VERIFICATION CHECKLIST

- [ ] Created 6 folders in `frontend/public/images/`
- [ ] Downloaded all 51 images
- [ ] Renamed each image to exact filename
- [ ] Placed images in correct folders
- [ ] Can view images in browser (test URL: /images/carousel/slide1-banner.jpg)
- [ ] Added products with correct image URLs
- [ ] Products display with images on cards

---

## 🧪 TEST IMAGES

Open browser and visit:
```
http://localhost:3000/images/electronics/wireless-headphones.jpg
http://localhost:3000/images/fashion/casual-tshirt.jpg
http://localhost:3000/images/home-furniture/sofa.jpg
```

If images load, everything is set up correctly! ✅

---

**Total Images: 51**
**Total Folders: 6**
**Total Time: ~1 hour**
