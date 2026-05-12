# 🔥 Firebase Setup & Launch Guide - ANCRIO

## Step 1: Firebase Project Create करो

### 1.1 Firebase Console पर जाओ
```
https://console.firebase.google.com/
```

### 1.2 "Create a new project" क्लिक करो
```
Project Name: ANCRIO
Location: India (Mumbai)
Click Create
```

### 1.3 Project Settings में जाओ
```
⚙️ Settings → Project Settings
```

### 1.4 Web App Add करो
```
"+" Add app क्लिक करो
Platform: Web
App Name: ANCRIO Web
Register app
```

### 1.5 Firebase Config Copy करो
```
आपको मिलेगा:
const firebaseConfig = {
    apiKey: "AIzaSyD...",
    authDomain: "ancrio-xxx.firebaseapp.com",
    databaseURL: "https://ancrio-xxx-rtdb.firebaseio.com",
    projectId: "ancrio-xxx",
    storageBucket: "ancrio-xxx.appspot.com",
    messagingSenderId: "1234...",
    appId: "1:1234:web:xyz"
};

इसे firebase-config.js में डालो
```

---

## Step 2: Firebase Services Enable करो

### 2.1 Authentication Enable करो
```
बाईं तरफ "Build" → Authentication
"Get Started" क्लिक करो
Email/Password enable करो
```

### 2.2 Firestore Database Enable करो
```
बाईं तरफ "Build" → Firestore Database
"Create Database" क्लिक करो
Location: asia-southeast1 (Asia)
Start in Production mode
```

### 2.3 Realtime Database Enable करो
```
बाईं तरफ "Build" → Realtime Database
"Create Database" क्लिक करो
Location: asia-southeast1
Start in test mode (बाद में secure करेंगे)
```

### 2.4 Storage Enable करो
```
बाईं तरफ "Build" → Storage
"Get Started" क्लिक करो
Location: asia-southeast1
```

---

## Step 3: Security Rules Set करो

### 3.1 Firestore Security Rules
```
बाईं तरफ Firestore → Rules tab

यह code डालो:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users: खुद का data read/write कर सकते हो
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
      allow read: if request.auth.uid != null && request.auth.token.admin == true;
    }
    
    // Orders: खुद के orders देख सकते हो
    match /users/{uid}/orders/{orderId} {
      allow read, write: if request.auth.uid == uid;
    }
    
    match /orders/{orderId} {
      allow read: if request.auth.token.admin == true;
      allow write: if request.auth.token.admin == true;
    }
    
    // Products: सब देख सकते हो, admin ही लिख सकता है
    match /products/{productId} {
      allow read: if request.auth != null;
      allow write: if request.auth.token.admin == true;
    }
    
    // Reviews: सब देख सकते हो, authenticated user लिख सकते हो
    match /reviews/{productId}/reviews/{reviewId} {
      allow read: if request.auth != null;
      allow create: if request.auth.uid == resource.data.userId;
      allow update, delete: if request.auth.uid == resource.data.userId;
    }
  }
}

"Publish" क्लिक करो
```

### 3.2 Realtime Database Rules
```
बाईं तरफ Realtime Database → Rules tab

यह code डालो:

{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid || root.child('admins').child(auth.uid).exists()",
        ".write": "$uid === auth.uid"
      }
    }
  }
}

"Publish" क्लिक करो
```

### 3.3 Storage Rules
```
बाईं तरफ Storage → Rules tab

यह code डालो:

rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.resource.size < 10 * 1024 * 1024;
    }
  }
}

"Publish" क्लिक करो
```

---

## Step 4: index.html में Firebase Add करो

### 4.1 Head में Firebase CDN add करो
```html
<!-- Firebase CDN -->
<script src="https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.5.0/firebase-storage.js"></script>
```

जहां हो वहां से पहले:
```html
</head>
```

### 4.2 Firebase Config File Load करो
```html
<!-- अगली script tag -->
<script src="firebase-config.js"></script>
```

```html
<!-- फिर existing scripts -->
<script src="script.js"></script>
```

---

## Step 5: script.js में Update करो

### 5.1 Login Function Update करो
```javascript
// पहले (localStorage):
function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Firebase से login करो
    const result = await firebaseLogin(email, password);
    if (result.success) {
        currentUser = result.userData;
        saveToStorage();
        navigateTo('home');
    } else {
        showNotification('Login failed: ' + result.error);
    }
}
```

### 5.2 Signup Function Update करो
```javascript
// Firebase से signup करो
async function signup() {
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    const result = await firebaseSignUp(email, password, name);
    if (result.success) {
        showNotification('Account created! Please login');
        navigateTo('home');
    } else {
        showNotification('Signup failed: ' + result.error);
    }
}
```

### 5.3 placeOrder Function Update करो
```javascript
async function placeOrder() {
    // ... existing code ...
    
    const result = await saveOrderToFirebase(order);
    if (result.success) {
        orders.push(order);
        saveToStorage();
        showNotification('Order placed successfully!');
        closeCheckoutModal();
        navigateTo('home');
    }
}
```

---

## Step 6: Vercel पर Deploy करो

### 6.1 GitHub पर Code Push करो
```bash
cd c:\Users\avi raj\w2
git init
git add .
git commit -m "ANCRIO - Firebase integrated"
git branch -M main
git remote add origin https://github.com/yourname/ancrio.git
git push -u origin main
```

### 6.2 Vercel पर Account बनाओ
```
https://vercel.com/
"Sign up with GitHub" क्लिक करो
GitHub को authorize करो
```

### 6.3 Project Deploy करो
```
"Add New" → "Project"
अपना repo select करो (ancrio)
"Import" क्लिक करो

Environment Variables add करो:
(अगर कोई secret keys हों तो)

"Deploy" क्लिक करो
```

### 6.4 Live हो गया!
```
Deploy complete!
Your site: https://ancrio-xxx.vercel.app
```

---

## Step 7: Domain Connect करो (Optional)

### अगर अपना domain है तो:
```
Vercel Dashboard → Settings → Domains
अपना domain add करो (e.g., ancrio.in)
DNS records update करो
2-5 मिनट में live हो जाएगा
```

---

## Step 8: Testing करो

### 8.1 Local Testing
```
1. firebase-config.js में अपने Firebase credentials डालो
2. Browser console खोलो (F12)
3. Signup/Login test करो
4. Order place करो
5. Firebase Console में data check करो
```

### 8.2 Production Testing
```
1. Deployed site खोलो
2. Signup/Login test करो
3. Order place करो
4. Firebase Console में check करो
```

---

## Database में Data Check करो

### Firebase Console में:

**Users देखने के लिए:**
```
Firestore → Collections → users
```

**Orders देखने के लिए:**
```
Firestore → Collections → orders
```

**Products देखने के लिए:**
```
Firestore → Collections → products
```

---

## Admin Setup करो

### Firebase Console में Custom Claims set करो
```
Authentication → Users
User select करो
"Custom claims" में यह add करो:

{
  "admin": true
}

Save करो
```

अब वह user admin operations कर सकता है!

---

## Error Troubleshooting

### "Firebase is not defined"
```
✓ firebase-config.js load हो रहा है?
✓ CDN links सही हैं?
✓ Console में error है?
```

### "Permission denied" Error
```
✓ Security Rules सही हैं?
✓ User authenticated है?
✓ Firestore में collection है?
```

### Data Save नहीं हो रहा
```
✓ Firebase authenticated है?
✓ Firestore enabled है?
✓ Rules allow कर रहे हैं?
```

---

## Final Checklist

- [ ] Firebase Project बना दिया
- [ ] Web App add कर दिया
- [ ] Config copy कर दिया
- [ ] Authentication enable कर दिया
- [ ] Firestore Database create कर दिया
- [ ] Realtime Database create कर दिया
- [ ] Storage enable कर दिया
- [ ] Security Rules set कर दिए
- [ ] firebase-config.js में config डाला
- [ ] CDN links index.html में add किए
- [ ] script.js update किया
- [ ] GitHub पर push किया
- [ ] Vercel पर deploy किया
- [ ] Testing complete कर दी

---

## Success! 🎉

ANCRIO अब **live** है Firebase के साथ!

**आपका website:**
```
https://your-domain.vercel.app
```

**Features:**
✅ Cloud Database
✅ Real-time Sync
✅ Secure Authentication
✅ Image Storage
✅ Scalable Backend
✅ Auto Backups

---

## Next Steps

1. Domain register करो (ancrio.in)
2. Vercel से domain connect करो
3. SSL Certificate auto (Vercel देता है)
4. Social Media पर share करो
5. Users को tell करो!

---

**ANCRIO Ready to Launch!** 🚀
