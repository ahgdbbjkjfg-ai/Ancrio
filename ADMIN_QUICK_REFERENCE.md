# ANCRIO Admin Panel - Quick Reference Card

## 🔐 Access
**Shortcut**: `Ctrl + Shift + A`
**Password**: `admin123`

---

## 📊 Admin Dashboard Features

### Top Section: Statistics
```
[Total] [Processing] [Shipped] [Delivered] [Revenue]
   5        1            2          2        ₹50K
```

### Each Order Card Contains

**Customer Info** (Left Side)
```
Order #000001
👤 Customer: John Doe
📧 Email: john@example.com
📅 Date: 25 Jan 2024
🏷️ Tracking: TRK12345678
```

**Order Total** (Right Side)
```
₹12,500
[Status Badge]
```

**Delivery Section**
```
📍 Address: 123 Main St, Mumbai 400001
🚚 Delivery: Anytime
💳 Payment: Credit Card
💰 Refund: No Refund (or Initiated/Processing/Completed)
```

**Items Section**
```
📦 Items
  1. Premium Shirt × 2     ₹8,000
  2. Designer Pants × 1    ₹4,000
  
  Subtotal:  ₹12,000
  Tax (5%):  ₹600
```

**Optional Sections**
```
🔄 Return Request (If requested)
  Reason: Defective
  Status: Pending
  [✓ Approve] [✕ Reject]

⭐ Customer Review (If left)
  Rating: ⭐⭐⭐⭐⭐
  "Amazing product, highly recommend!"
```

**Action Buttons**
```
[-- Status --] [💰 Refund] [🏷️ Label] [🗑 Delete]
```

---

## 🎯 Common Tasks

### 1. Update Order Status
1. Click status dropdown
2. Select: Processing → Shipped → Delivered
3. Badge color changes automatically
4. Saves instantly

**Status Colors**
- 🟠 Processing = Orange (#f59e0b)
- 🔵 Shipped = Blue (#3b82f6)
- 🟢 Delivered = Green (#4ade80)

### 2. Process Refund
1. Click "💰 Refund" button
2. Refund status changes to "Initiated"
3. Can later mark as "Processing" or "Completed"
4. Color shows status (red = none, orange = processing, green = done)

### 3. Handle Return Request
1. Look for "🔄 Return Request" section
2. Shows customer's reason
3. If status is "Pending", show buttons:
   - "✓ Approve" = approve return
   - "✕ Reject" = reject return
4. Click to process

### 4. Generate Shipping Label
1. Click "🏷️ Label" button
2. HTML file downloads
3. Open in browser
4. Print on A4 paper
5. Attach to package

### 5. Delete Order
1. Click "🗑 Delete" button
2. Confirm in popup
3. Order removed from system
4. Page updates automatically

---

## 📋 Order Fields Explained

| Field | Example | What It Means |
|-------|---------|---------------|
| Order ID | #000001 | Unique order identifier |
| Tracking | TRK12345678 | Package tracking number |
| Customer | John Doe | Who placed the order |
| Email | john@email.com | Customer contact |
| Date | 25 Jan 2024 | When order was placed |
| Address | 123 St, City | Shipping destination |
| Payment | Credit Card | Payment method used |
| Subtotal | ₹12,000 | Product cost before tax |
| Tax | ₹600 | 5% of subtotal |
| Total | ₹12,600 | Final amount paid |
| Status | Shipped | Current order state |
| Refund | Initiated | Refund processing status |

---

## 💡 Pro Tips

✅ **Check Stats First**
- See total orders, revenue, and processing status
- Quick overview of business health

✅ **Use Status Colors**
- Orange = Action needed (still processing)
- Blue = In transit (no action)
- Green = Complete (archived)

✅ **Batch Operations**
- Update multiple orders by changing their statuses
- Fastest way to process orders

✅ **Return Management**
- Always review reason before approving/rejecting
- Contact customer if unclear about return

✅ **Refund Priority**
- Mark as "Initiated" when starting refund
- Update to "Processing" when sending money
- Mark "Completed" when customer receives

✅ **Data Persists**
- All changes auto-save to localStorage
- No manual save needed
- Safe to refresh or close browser

---

## ⚠️ Important

- **Admin Password**: `admin123`
- **Shortcut**: `Ctrl + Shift + A`
- **Free Shipping**: All orders have free shipping
- **Tax Rate**: Fixed at 5%
- **Tracking**: All orders get unique TRK number
- **Return Window**: 30 days from order date

---

## 🔧 Troubleshooting

**Orders not showing?**
- Place an order first (exit admin, shop, add to cart, checkout)
- Refresh page (F5)
- Check console (F12) for errors

**Buttons not working?**
- Make sure JavaScript is enabled
- Try hard refresh (Ctrl+Shift+R)
- Clear browser cache
- Try different browser

**Changes not saving?**
- Check if browser allows localStorage
- Check console for errors
- Make sure you have space on disk
- Try incognito mode to test

**Status stuck?**
- Refresh page
- Try selecting a different status first
- Check browser console (F12)

---

## 📱 Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Open Admin | Ctrl+Shift+A |
| Refresh | F5 or Ctrl+R |
| Hard Refresh | Ctrl+Shift+R |
| Developer Tools | F12 |
| Find | Ctrl+F |

---

**Your ANCRIO admin panel is ready to use! 🚀**
