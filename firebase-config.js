// Firebase Configuration & Setup
// Add this to your HTML head or create separate firebase-config.js

// Firebase SDK CDN (add to index.html before </head>)
/*
<!-- Firebase CDN -->
<script src="https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.5.0/firebase-storage.js"></script>
*/

// YOUR FIREBASE CONFIG (Get from Firebase Console)
const firebaseConfig = {
    apiKey: "AIzaSyA74NcnNY_AlJZqjded0_wPssNCsWRaBGw",
    authDomain: "ancrio.firebaseapp.com",
    projectId: "ancrio",
    storageBucket: "ancrio.firebasestorage.app",
    messagingSenderId: "705897952011",
    appId: "1:705897952011:web:16a5f633253ef1e926280e",
    measurementId: "G-WD08QMSD4J"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const realtimeDb = firebase.database();
const storage = firebase.storage();

// ============================================
// FIREBASE AUTHENTICATION FUNCTIONS
// ============================================

// Sign Up Function
async function firebaseSignUp(email, password, name) {
    try {
        // Create user account
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        // Update profile with name
        await user.updateProfile({
            displayName: name
        });
        
        // Save user to Firestore
        await db.collection('users').doc(user.uid).set({
            uid: user.uid,
            name: name,
            email: email,
            createdAt: new Date().toISOString(),
            role: 'customer'
        });
        
        return { success: true, user: user };
    } catch (error) {
        console.error('Signup Error:', error.message);
        return { success: false, error: error.message };
    }
}

// Login Function
async function firebaseLogin(email, password) {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        // Load user data from Firestore
        const userDoc = await db.collection('users').doc(user.uid).get();
        const userData = userDoc.data();
        
        return { success: true, user: user, userData: userData };
    } catch (error) {
        console.error('Login Error:', error.message);
        return { success: false, error: error.message };
    }
}

// Logout Function
async function firebaseLogout() {
    try {
        await auth.signOut();
        return { success: true };
    } catch (error) {
        console.error('Logout Error:', error.message);
        return { success: false, error: error.message };
    }
}

// Check Auth State
function checkAuthState(callback) {
    auth.onAuthStateChanged((user) => {
        if (user) {
            // User is logged in
            callback({ isLoggedIn: true, user: user });
        } else {
            // User is logged out
            callback({ isLoggedIn: false, user: null });
        }
    });
}

// ============================================
// FIREBASE DATABASE OPERATIONS - ORDERS
// ============================================

// Save Order to Firebase
async function saveOrderToFirebase(orderData) {
    try {
        const user = auth.currentUser;
        if (!user) {
            return { success: false, error: 'User not logged in' };
        }
        
        const orderId = db.collection('orders').doc().id;
        const order = {
            ...orderData,
            userId: user.uid,
            orderId: orderId,
            createdAt: new Date().toISOString(),
            status: 'Processing'
        };
        
        // Save to Firestore
        await db.collection('orders').doc(orderId).set(order);
        
        // Also save to user's subcollection for easier querying
        await db.collection('users').doc(user.uid).collection('orders').doc(orderId).set(order);
        
        return { success: true, orderId: orderId };
    } catch (error) {
        console.error('Save Order Error:', error.message);
        return { success: false, error: error.message };
    }
}

// Get User's Orders
async function getUserOrders() {
    try {
        const user = auth.currentUser;
        if (!user) {
            return { success: false, error: 'User not logged in' };
        }
        
        const snapshot = await db.collection('users').doc(user.uid).collection('orders').orderBy('createdAt', 'desc').get();
        const orders = [];
        
        snapshot.forEach(doc => {
            orders.push(doc.data());
        });
        
        return { success: true, orders: orders };
    } catch (error) {
        console.error('Get Orders Error:', error.message);
        return { success: false, error: error.message };
    }
}

// Get All Orders (Admin)
async function getAllOrders() {
    try {
        const snapshot = await db.collection('orders').orderBy('createdAt', 'desc').get();
        const orders = [];
        
        snapshot.forEach(doc => {
            orders.push(doc.data());
        });
        
        return { success: true, orders: orders };
    } catch (error) {
        console.error('Get All Orders Error:', error.message);
        return { success: false, error: error.message };
    }
}

// Update Order Status
async function updateOrderStatus(orderId, status) {
    try {
        await db.collection('orders').doc(orderId).update({
            status: status,
            updatedAt: new Date().toISOString()
        });
        
        return { success: true };
    } catch (error) {
        console.error('Update Order Error:', error.message);
        return { success: false, error: error.message };
    }
}

// ============================================
// FIREBASE DATABASE OPERATIONS - PRODUCTS
// ============================================

// Save Product (Admin)
async function saveProductToFirebase(productData) {
    try {
        const productId = db.collection('products').doc().id;
        const product = {
            ...productData,
            productId: productId,
            createdAt: new Date().toISOString()
        };
        
        await db.collection('products').doc(productId).set(product);
        
        return { success: true, productId: productId };
    } catch (error) {
        console.error('Save Product Error:', error.message);
        return { success: false, error: error.message };
    }
}

// Get All Products
async function getProductsFromFirebase() {
    try {
        const snapshot = await db.collection('products').orderBy('createdAt', 'desc').get();
        const products = [];
        
        snapshot.forEach(doc => {
            products.push(doc.data());
        });
        
        return { success: true, products: products };
    } catch (error) {
        console.error('Get Products Error:', error.message);
        return { success: false, error: error.message };
    }
}

// Update Product
async function updateProductInFirebase(productId, updates) {
    try {
        await db.collection('products').doc(productId).update({
            ...updates,
            updatedAt: new Date().toISOString()
        });
        
        return { success: true };
    } catch (error) {
        console.error('Update Product Error:', error.message);
        return { success: false, error: error.message };
    }
}

// ============================================
// FIREBASE STORAGE - IMAGES
// ============================================

// Upload Image to Firebase Storage
async function uploadImageToFirebase(file, folder = 'products') {
    try {
        const filename = Date.now() + '_' + file.name;
        const storageRef = storage.ref(folder + '/' + filename);
        
        const snapshot = await storageRef.put(file);
        const downloadURL = await snapshot.ref.getDownloadURL();
        
        return { success: true, url: downloadURL };
    } catch (error) {
        console.error('Upload Image Error:', error.message);
        return { success: false, error: error.message };
    }
}

// ============================================
// FIREBASE REAL-TIME DATABASE (For Live Updates)
// ============================================

// Listen to Orders in Real-time
function listenToOrdersRealtime(callback) {
    const user = auth.currentUser;
    if (!user) return;
    
    const ordersRef = realtimeDb.ref('users/' + user.uid + '/orders');
    
    ordersRef.on('value', (snapshot) => {
        const orders = [];
        snapshot.forEach((childSnapshot) => {
            orders.push(childSnapshot.val());
        });
        callback(orders);
    });
}

// Update Order in Real-time Database
async function updateOrderRealtime(orderId, updates) {
    try {
        const user = auth.currentUser;
        if (!user) return { success: false };
        
        const orderRef = realtimeDb.ref('users/' + user.uid + '/orders/' + orderId);
        await orderRef.update({
            ...updates,
            updatedAt: new Date().toISOString()
        });
        
        return { success: true };
    } catch (error) {
        console.error('Update Order Realtime Error:', error.message);
        return { success: false, error: error.message };
    }
}

// ============================================
// DATABASE STRUCTURE HELPER
// ============================================

/*
FIRESTORE DATABASE STRUCTURE:

/users/{uid}/
  - uid
  - name
  - email
  - createdAt
  - role (customer/admin)
  - orders/ (subcollection)
    - {orderId}
      - orderId
      - userId
      - items
      - total
      - status
      - createdAt

/orders/{orderId}/
  - orderId
  - userId
  - customerName
  - customerEmail
  - items []
  - subtotal
  - tax
  - shipping
  - total
  - status
  - trackingNumber
  - createdAt
  - updatedAt

/products/{productId}/
  - productId
  - name
  - price
  - category
  - description
  - image
  - stock
  - createdAt

/newsletters/
  {emailId}/
    - email
    - subscribedAt

/reviews/{productId}/
  {reviewId}/
    - userId
    - rating
    - comment
    - createdAt
*/

// ============================================
// INTEGRATION WITH EXISTING CODE
// ============================================

// Replace localStorage saveToStorage with Firebase sync
async function syncToFirebase() {
    try {
        const user = auth.currentUser;
        if (!user) return;
        
        // Sync orders
        for (const order of orders) {
            await saveOrderToFirebase(order);
        }
        
        return { success: true };
    } catch (error) {
        console.error('Sync Error:', error.message);
        return { success: false, error: error.message };
    }
}

// Initialize Firebase on page load
document.addEventListener('DOMContentLoaded', () => {
    // Check authentication state
    checkAuthState((authState) => {
        if (authState.isLoggedIn) {
            console.log('User logged in:', authState.user.email);
            // Load user data
            loadUserDataFromFirebase(authState.user.uid);
        } else {
            console.log('User not logged in');
        }
    });
});

// Load user data from Firebase
async function loadUserDataFromFirebase(uid) {
    try {
        const userDoc = await db.collection('users').doc(uid).get();
        if (userDoc.exists) {
            const userData = userDoc.data();
            // Update global currentUser
            currentUser = userData;
            
            // Load user's orders
            const ordersResult = await getUserOrders();
            if (ordersResult.success) {
                orders = ordersResult.orders;
            }
        }
    } catch (error) {
        console.error('Load User Data Error:', error.message);
    }
}
