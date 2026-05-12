# 🔧 QUICK TROUBLESHOOTING GUIDE

## Problem: Orders Still Not Showing?

### Step 1: Check Browser Console (F12)
```javascript
// Paste these commands one by one in Console:

// Check 1: Is localStorage working?
console.log('localStorage available:', typeof localStorage !== 'undefined');

// Check 2: How many orders saved?
console.log('Saved orders:', JSON.parse(localStorage.getItem('luxeOrders') || '[]').length);

// Check 3: Show me all orders
const orders = JSON.parse(localStorage.getItem('luxeOrders') || '[]');
console.table(orders);

// Check 4: What's the admin user?
console.log('Admin user:', JSON.parse(localStorage.getItem('luxeUser')));

// Check 5: Are there any JavaScript errors?
// (Look for red messages in console tab)
```

---

## Problem: "Order placed" but nothing saved

**Test these:**

```javascript
// In Console, place an order then run:
console.log('Last saved order:', JSON.parse(localStorage.getItem('luxeOrders')).pop());
```

If this shows nothing, then **order is not saving to localStorage**.

**Solution:**
- Check network tab (F12 → Network) - any errors?
- Try clearing browser cache
- Try a different browser

---

## Problem: Admin panel shows 0 orders, but localStorage has orders

**This means data isn't loading from storage into memory**

**Test:**
```javascript
// When admin panel is open, run:
console.log('Orders in memory:', orders.length);
console.log('Orders in localStorage:', JSON.parse(localStorage.getItem('luxeOrders')).length);
```

If these are different, there's a loading issue.

**Solution:**
- Press F5 to refresh page
- Try logging out and back in
- Clear localStorage and start fresh

---

## Problem: Different browser/device shows no orders

**This is EXPECTED** because localStorage is per-browser.

**Solution:**
- Use SAME browser where you placed order
- OR sync to Firebase (for multi-device access)
- OR use same computer

**For Production:** You'll need Firebase/Backend for cross-device sync

---

## Problem: Can't access admin panel

**If password doesn't work:**
- Password is: `admin123` (case-sensitive)
- Use: Ctrl+Shift+A (not case-sensitive)
- If prompt doesn't appear, try refreshing page

**If you can't type password:**
- Make sure browser allows prompts
- Check developer tools aren't blocking it
- Try a different browser

---

## Problem: Order disappears after refresh

**Why?** This is normal for fresh orders with no userId.

**Test:**
```javascript
// Check before refresh
console.log('Orders before refresh:', JSON.parse(localStorage.getItem('luxeOrders')).length);

// Refresh page
location.reload();

// Check after refresh
console.log('Orders after refresh:', JSON.parse(localStorage.getItem('luxeOrders')).length);
```

If count is same - it's working! ✅

If count is 0 - something cleared the data.

---

## Problem: "luxeOrders is not defined" error

**This means:**
- Order object doesn't exist in memory
- Or it wasn't loaded from storage

**Solution:**
1. Open browser console
2. Run: `localStorage.getItem('luxeOrders')`
3. If empty → place a new order first
4. If has data → refresh page to load it

---

## Problem: Admin panel button doesn't work

**Check:**
1. Are you logged in as admin?
2. Can you see "Admin" in top right?
3. Is there an admin menu visible?

**If no "Admin" button:**
```javascript
// Manually access admin in console:
navigateTo('admin');
```

**If that doesn't work:**
- Check for JavaScript errors (red lines in console)
- Try refreshing page
- Clear browser cache

---

## Problem: Can add to cart but checkout form doesn't work

**Check:**
1. Are all fields highlighted in red?
2. Are there error messages below fields?

**Solution:**
- Fill ALL fields: Name, Email, Address, City, ZIP
- Make sure ZIP is a 5-digit number
- Email should have @ symbol

```javascript
// In console, check form fields:
console.log('Name:', document.getElementById('checkoutName').value);
console.log('Email:', document.getElementById('checkoutEmail').value);
console.log('Address:', document.getElementById('checkoutAddress').value);
console.log('City:', document.getElementById('checkoutCity').value);
console.log('ZIP:', document.getElementById('checkoutZip').value);
```

---

## Problem: Shipping label or invoice download doesn't work

**Check:**
1. Does a file download appear?
2. What's the file size?

**Solution:**
```javascript
// In console, verify order exists:
console.log('Order details:', orders.find(o => o.id === [ORDER_ID]));
```

If order not found, that's the issue.

---

## Emergency Reset (Last Resort)

**Clear EVERYTHING and start fresh:**

```javascript
// Run in Console:
localStorage.clear();
console.log('✅ All data cleared');
location.reload();
```

Then:
1. Refresh browser (F5)
2. Add products to cart
3. Place order
4. Open admin (Ctrl+Shift+A)
5. Check if order shows

---

## Debug Mode Enabled ✅

**All recent changes include console logs:**
- ✅ When order placed
- ✅ When admin panel opens  
- ✅ When data loads from storage
- ✅ Total orders count displayed

**Look for these in Console (F12):**
- `✅ Order placed successfully:`
- `📦 Total orders after placement:`
- `💾 Saving to localStorage...`
- `📊 Total orders loaded:`

---

## Still Not Working?

**Share these from your console:**

```javascript
// Copy and run these, send results:
console.log('=== DIAGNOSTIC INFO ===');
console.log('Orders in localStorage:', JSON.parse(localStorage.getItem('luxeOrders') || '[]').length);
console.log('Admin user:', localStorage.getItem('luxeUser'));
console.log('All localStorage keys:', Object.keys(localStorage));
console.log('Browser:', navigator.userAgent);
```

**Then tell me:**
1. What do these show?
2. Does order appear in admin?
3. What errors in console? (red text)
4. What browser are you using?

---

## Summary

| Issue | Check | Fix |
|-------|-------|-----|
| **No orders showing** | F12 Console: orders count | Place a new order |
| **Can't access admin** | Ctrl+Shift+A works? | Refresh page, try again |
| **Order disappears** | Check localStorage still has it | Should persist, check cache |
| **Different browser** | Each browser has own storage | Use same browser |
| **Can't checkout** | All fields filled? | Fill ALL required fields |
| **Still broken** | Run diagnostic commands | Send me the output |

---

Good luck! 🎯 Let me know what happens when you test!
