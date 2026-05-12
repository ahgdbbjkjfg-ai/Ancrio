# ANCRIO Implementation Guide
## How to Build & Deploy the Platform

---

## TABLE OF CONTENTS
1. [Quick Start Setup](#quick-start-setup)
2. [Phase 1: Current Build Status](#phase-1-current-build-status)
3. [Return System Implementation Steps](#return-system-implementation-steps)
4. [Admin Panel Implementation](#admin-panel-implementation)
5. [Testing Checklist](#testing-checklist)
6. [Deployment Guide](#deployment-guide)
7. [Common Issues & Solutions](#common-issues--solutions)

---

## QUICK START SETUP

### Prerequisites
```bash
# Check Node.js installation
node --version  # Should be v14 or higher

# Check npm
npm --version   # Should be v6 or higher
```

### Local Development

```bash
# 1. Navigate to project directory
cd c:\Users\avi\ raj\w2

# 2. Start the local server (already exists)
node server.js

# 3. Open browser
http://localhost:8000

# Server output:
# 🚀 Server running at http://localhost:8000/
```

### Firebase Setup

```javascript
// File: firebase-config.js (already configured)
// Current config is active and connected

// To update Firebase:
1. Go to: https://console.firebase.google.com/
2. Project: ancrio
3. Get updated credentials if needed
4. Replace in firebase-config.js
```

---

## PHASE 1: CURRENT BUILD STATUS

### ✅ What's Already Built

```
✓ Product Database (20+ items)
✓ Shopping Cart (functional)
✓ Checkout Flow (COD support)
✓ Admin Dashboard (basic)
✓ User Authentication (Firebase)
✓ Wishlist Feature
✓ Product Filtering & Categories
✓ Search Box (basic)
✓ Responsive Design
✓ Mobile Navigation
✓ Reviews System (basic)
✓ Order Management
✓ Navigation System
```

### 🔧 Recently Fixed

```
✓ Add-to-Cart Button
  - Enhanced error handling
  - Null check for undefined product ID
  - Fallback to direct checkout if cart fails
  - Improved notifications (color-coded)
  - Stock validation
  - Better error messages
```

### 🚀 What's Next (Phase 2 - Feb 2026)

```
1. Return & Replace System (CORE)
2. Admin Return Review Dashboard
3. AI Fraud Detection
4. SMS Notifications (Twilio)
5. Photo Upload & Validation
6. Return Status Tracking
7. Refund Management
```

---

## RETURN SYSTEM IMPLEMENTATION STEPS

### Step 1: Database Schema (Firestore)

```javascript
// Create "returns" collection in Firestore

// Document structure:
{
  id: "RET-2026-001834",
  orderId: "ORD-2026-001654",
  customerId: "USER-123",
  productId: 1,
  sellerId: "SELLER-456",
  
  // Timeline
  createdAt: "2026-01-27T10:30:00Z",
  deliveryDate: "2026-01-25T00:00:00Z",
  daysUntilDeadline: 5,
  
  // Customer Request
  reason: "SIZE_ISSUE",
  returnType: "RETURN", // or "REPLACEMENT"
  customerMessage: "Received Large instead of Medium",
  
  // Photos
  photosUrls: [
    "gs://bucket/photo1.jpg",
    "gs://bucket/photo2.jpg",
    "gs://bucket/photo3.jpg"
  ],
  videoUrl: "gs://bucket/video.mp4",
  
  // AI Analysis
  aiRiskScore: 15,
  riskLevel: "LOW", // LOW, MEDIUM, HIGH
  aiFlags: {
    reusedImages: false,
    blurDetected: false,
    repeatPattern: false
  },
  
  // Admin Decision
  status: "APPROVED", // REQUESTED, UNDER_REVIEW, APPROVED, REJECTED, COMPLETED
  adminDecision: "APPROVED",
  adminId: "ADMIN-001",
  adminNotes: "Clear photos, legitimate claim",
  decisionDate: "2026-01-27T12:00:00Z",
  
  // Rejection (if applicable)
  rejectionReason: null,
  rejectionDate: null,
  appealDeadline: null,
  
  // Pickup
  pickupStatus: "PENDING", // PENDING, SCHEDULED, IN_TRANSIT, COMPLETED
  pickupDate: "2026-01-29T14:00:00Z",
  pickupQRCode: "QR-UNIQUE-CODE",
  pickupPartner: "Shiprocket",
  trackingId: "SHIP-123456",
  
  // Refund
  refundAmount: 799,
  refundStatus: "PENDING", // PENDING, PROCESSED, COMPLETED
  refundDate: null,
  refundTransactionId: null,
  
  // Audit
  updatedAt: "2026-01-27T12:00:00Z",
  history: [
    { action: "CREATED", timestamp: "2026-01-27T10:30:00Z", user: "system" },
    { action: "APPROVED", timestamp: "2026-01-27T12:00:00Z", user: "ADMIN-001" }
  ]
}

// Indexes to create:
// 1. customerId + createdAt (for customer's returns)
// 2. status + createdAt (for admin dashboard)
// 3. orderId (lookup returns by order)
// 4. sellerId + status (seller's return requests)
```

### Step 2: Frontend - Return Initiation UI

```html
<!-- File: index.html (add to order details section) -->

<section id="return-request" class="modal">
    <div class="modal-content">
        <h2>Request Return or Replacement</h2>
        
        <div class="form-section">
            <label>Return Reason</label>
            <div class="radio-options">
                <label>
                    <input type="radio" name="reason" value="WRONG_ITEM">
                    <span>Wrong Item Received</span>
                </label>
                <label>
                    <input type="radio" name="reason" value="DAMAGED">
                    <span>Damaged or Defective</span>
                </label>
                <label>
                    <input type="radio" name="reason" value="SIZE_ISSUE">
                    <span>Size/Fit Issue</span>
                </label>
                <label>
                    <input type="radio" name="reason" value="NOT_AS_EXPECTED">
                    <span>Not As Expected</span>
                </label>
                <label>
                    <input type="radio" name="reason" value="MISSING_PARTS">
                    <span>Missing Parts/Accessories</span>
                </label>
            </div>
        </div>
        
        <div class="form-section">
            <label>Return Type</label>
            <div class="radio-options">
                <label>
                    <input type="radio" name="type" value="RETURN" checked>
                    <span>Return (Money Back)</span>
                </label>
                <label>
                    <input type="radio" name="type" value="REPLACEMENT">
                    <span>Replacement (New Item)</span>
                </label>
            </div>
        </div>
        
        <div class="form-section">
            <label>Additional Comments (Optional)</label>
            <textarea name="message" placeholder="Describe the issue..." 
                      rows="4" maxlength="500"></textarea>
        </div>
        
        <div class="form-section">
            <label>Photo Proof (Required - 3 photos minimum)</label>
            <div class="photo-upload">
                <div class="photo-slot">
                    <label>📸 Photo 1: Packaging + Order ID</label>
                    <input type="file" accept="image/*" id="photo1" capture>
                    <small>Show original box with order ID visible</small>
                </div>
                <div class="photo-slot">
                    <label>📸 Photo 2: Product + Order ID</label>
                    <input type="file" accept="image/*" id="photo2" capture>
                    <small>Show the product with order ID nearby</small>
                </div>
                <div class="photo-slot">
                    <label>📸 Photo 3: Unboxing View</label>
                    <input type="file" accept="image/*" id="photo3" capture>
                    <small>Show all items that came in the box</small>
                </div>
            </div>
            <div id="photosStatus"></div>
        </div>
        
        <div class="form-section">
            <label>Video Proof (Optional - For Defective Items)</label>
            <input type="file" accept="video/*" id="videoProof" capture>
            <small>30-60 seconds showing the defect in action</small>
        </div>
        
        <div class="info-box">
            <h4>ℹ️ Return Window Info</h4>
            <p>This order was delivered <strong>2 days ago</strong></p>
            <p>You have <strong>5 days remaining</strong> to submit a return request</p>
            <p>After 7 days from delivery, returns cannot be accepted</p>
        </div>
        
        <div class="form-actions">
            <button onclick="submitReturnRequest()">Submit Return Request</button>
            <button onclick="closeReturnModal()">Cancel</button>
        </div>
    </div>
</section>
```

### Step 3: JavaScript - Return Logic

```javascript
// File: script.js (add these functions)

// Return request data structure
const returnRequests = [];

// Step 1: Validate return window
function checkReturnEligibility(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return { eligible: false, reason: "Order not found" };
    
    const deliveryDate = new Date(order.deliveryDate);
    const today = new Date();
    const daysSinceDelivery = Math.floor((today - deliveryDate) / (1000 * 60 * 60 * 24));
    
    if (daysSinceDelivery > 7) {
        return { eligible: false, reason: "Return window expired (7 days from delivery)" };
    }
    
    return { 
        eligible: true, 
        daysSinceDelivery,
        daysRemaining: 7 - daysSinceDelivery 
    };
}

// Step 2: Validate photos
async function validatePhotos() {
    const photo1 = document.getElementById('photo1').files[0];
    const photo2 = document.getElementById('photo2').files[0];
    const photo3 = document.getElementById('photo3').files[0];
    
    if (!photo1 || !photo2 || !photo3) {
        showNotification('❌ All 3 photos are required', 'error');
        return false;
    }
    
    // Check file sizes (max 5MB each)
    const maxSize = 5 * 1024 * 1024;
    if (photo1.size > maxSize || photo2.size > maxSize || photo3.size > maxSize) {
        showNotification('❌ Photo size must be less than 5MB', 'error');
        return false;
    }
    
    // Validate image files
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(photo1.type) || 
        !validTypes.includes(photo2.type) || 
        !validTypes.includes(photo3.type)) {
        showNotification('❌ Only JPG, PNG, WebP allowed', 'error');
        return false;
    }
    
    return true;
}

// Step 3: Upload photos to Firebase Storage
async function uploadPhotos(orderId, photos) {
    try {
        const uploadedUrls = [];
        
        for (let i = 0; i < photos.length; i++) {
            const file = photos[i];
            const fileName = `returns/${orderId}/photo-${i + 1}-${Date.now()}`;
            const storageRef = firebase.storage().ref(fileName);
            
            const snapshot = await storageRef.put(file);
            const url = await snapshot.ref.getDownloadURL();
            uploadedUrls.push(url);
        }
        
        return uploadedUrls;
    } catch (error) {
        console.error('Photo upload error:', error);
        throw new Error('Failed to upload photos');
    }
}

// Step 4: Submit return request
async function submitReturnRequest() {
    try {
        showNotification('Processing return request...', 'info');
        
        // Get form data
        const orderId = currentReturnOrderId; // Set when opening modal
        const reason = document.querySelector('input[name="reason"]:checked').value;
        const returnType = document.querySelector('input[name="type"]:checked').value;
        const message = document.querySelector('textarea[name="message"]').value;
        
        // Validate eligibility
        const eligibility = checkReturnEligibility(orderId);
        if (!eligibility.eligible) {
            showNotification(`❌ ${eligibility.reason}`, 'error');
            return;
        }
        
        // Validate photos
        const photosValid = await validatePhotos();
        if (!photosValid) return;
        
        // Upload photos
        const photos = [
            document.getElementById('photo1').files[0],
            document.getElementById('photo2').files[0],
            document.getElementById('photo3').files[0]
        ];
        
        const photoUrls = await uploadPhotos(orderId, photos);
        
        // Upload video if provided
        let videoUrl = null;
        const videoFile = document.getElementById('videoProof').files[0];
        if (videoFile) {
            const fileName = `returns/${orderId}/video-${Date.now()}`;
            const storageRef = firebase.storage().ref(fileName);
            const snapshot = await storageRef.put(videoFile);
            videoUrl = await snapshot.ref.getDownloadURL();
        }
        
        // Get order & product info
        const order = orders.find(o => o.id === orderId);
        const product = products.find(p => p.id === order.items[0].productId);
        
        // Create return request document
        const returnRequest = {
            id: `RET-${Date.now()}`,
            orderId: orderId,
            customerId: currentUser.id,
            productId: product.id,
            productName: product.name,
            
            reason: reason,
            returnType: returnType,
            message: message,
            
            photosUrls: photoUrls,
            videoUrl: videoUrl,
            
            status: "REQUESTED",
            createdAt: new Date().toISOString(),
            deliveryDate: order.deliveryDate,
            daysUntilDeadline: eligibility.daysRemaining,
            
            aiRiskScore: 0, // Will be calculated by AI
            aiFlags: {},
            
            adminId: null,
            adminDecision: null,
            adminNotes: null,
            
            pickupStatus: "PENDING",
            refundStatus: "PENDING",
            refundAmount: order.total
        };
        
        // Save to Firestore
        await db.collection('returns').doc(returnRequest.id).set(returnRequest);
        
        // Save to localStorage as backup
        returnRequests.push(returnRequest);
        localStorage.setItem('luxeReturns', JSON.stringify(returnRequests));
        
        // Notify user
        showNotification('✅ Return request submitted! You can track it in My Orders.', 'success');
        
        // Close modal & refresh orders
        closeReturnModal();
        renderOrders();
        
    } catch (error) {
        console.error('Return submission error:', error);
        showNotification(`❌ Error: ${error.message}`, 'error');
    }
}

// Step 5: Display return status in order details
function renderReturnStatus(orderId) {
    const returnRequest = returnRequests.find(r => r.orderId === orderId);
    
    if (!returnRequest) {
        return `<button onclick="openReturnModal('${orderId}')">Request Return</button>`;
    }
    
    const statusDisplay = {
        REQUESTED: '⏳ Return Requested - Awaiting Admin Review',
        UNDER_REVIEW: '👀 Admin Reviewing Your Proof',
        APPROVED: '✅ Return Approved - Schedule Pickup',
        REJECTED: '❌ Return Not Approved',
        COMPLETED: '✓ Return Completed'
    };
    
    return `
        <div class="return-status">
            <p>${statusDisplay[returnRequest.status]}</p>
            <a href="#" onclick="openReturnDetails('${returnRequest.id}')">View Details</a>
        </div>
    `;
}
```

---

## ADMIN PANEL IMPLEMENTATION

### Step 1: Admin Dashboard HTML

```html
<!-- File: index.html (add admin panel section) -->

<section id="admin" class="page">
    <div class="admin-container">
        <h1>Admin Dashboard</h1>
        
        <!-- Navigation Tabs -->
        <div class="admin-tabs">
            <button class="tab-btn active" onclick="switchAdminTab('dashboard')">
                📊 Dashboard
            </button>
            <button class="tab-btn" onclick="switchAdminTab('returns')">
                🔄 Return Requests
            </button>
            <button class="tab-btn" onclick="switchAdminTab('products')">
                📦 Products
            </button>
            <button class="tab-btn" onclick="switchAdminTab('orders')">
                📋 Orders
            </button>
            <button class="tab-btn" onclick="switchAdminTab('analytics')">
                📈 Analytics
            </button>
        </div>
        
        <!-- Returns Management Tab -->
        <div id="returns-tab" class="admin-tab active">
            <h2>Return Requests Management</h2>
            
            <!-- Filter & Sort -->
            <div class="filter-section">
                <select id="filterStatus">
                    <option value="">All Statuses</option>
                    <option value="REQUESTED">Requested</option>
                    <option value="UNDER_REVIEW">Under Review</option>
                    <option value="APPROVED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                </select>
                
                <select id="sortBy">
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="risk">High Risk First</option>
                </select>
            </div>
            
            <!-- Returns Queue -->
            <div class="returns-queue" id="returnsQueue">
                <!-- Returns loaded here -->
            </div>
        </div>
        
        <!-- Return Detail Modal -->
        <div id="returnDetailModal" class="modal">
            <div class="modal-content admin-modal">
                <button class="close-btn" onclick="closeReturnDetail()">×</button>
                
                <div class="return-detail-content">
                    <!-- Loaded dynamically -->
                </div>
            </div>
        </div>
    </div>
</section>
```

### Step 2: Admin Review Logic

```javascript
// File: script.js (add admin functions)

// Load and display returns for admin
async function loadReturnsForAdmin() {
    try {
        const snapshot = await db.collection('returns')
            .orderBy('createdAt', 'desc')
            .limit(50)
            .get();
        
        const returns = [];
        snapshot.forEach(doc => {
            returns.push({ id: doc.id, ...doc.data() });
        });
        
        return returns;
    } catch (error) {
        console.error('Error loading returns:', error);
        return [];
    }
}

// Display return in admin queue
function renderReturnCard(returnRequest) {
    const riskColor = {
        LOW: '#51cf66',
        MEDIUM: '#ffd93d',
        HIGH: '#ff6b6b'
    };
    
    const riskEmoji = {
        LOW: '🟢',
        MEDIUM: '🟡',
        HIGH: '🔴'
    };
    
    return `
        <div class="return-card" style="border-left: 4px solid ${riskColor[returnRequest.aiRiskScore <= 35 ? 'LOW' : returnRequest.aiRiskScore <= 65 ? 'MEDIUM' : 'HIGH']}">
            <div class="return-header">
                <h3>Return #${returnRequest.id}</h3>
                <span class="status-badge" style="background: ${riskColor[returnRequest.aiRiskScore <= 35 ? 'LOW' : returnRequest.aiRiskScore <= 65 ? 'MEDIUM' : 'HIGH']}">
                    ${riskEmoji[returnRequest.aiRiskScore <= 35 ? 'LOW' : returnRequest.aiRiskScore <= 65 ? 'MEDIUM' : 'HIGH']} 
                    Risk: ${returnRequest.aiRiskScore}%
                </span>
            </div>
            
            <div class="return-info">
                <p><strong>Order:</strong> ${returnRequest.orderId}</p>
                <p><strong>Customer:</strong> ${returnRequest.customerId}</p>
                <p><strong>Product:</strong> ${returnRequest.productName}</p>
                <p><strong>Reason:</strong> ${returnRequest.reason}</p>
                <p><strong>Status:</strong> ${returnRequest.status}</p>
                <p><strong>Submitted:</strong> ${new Date(returnRequest.createdAt).toLocaleDateString()}</p>
            </div>
            
            <button onclick="openReturnReview('${returnRequest.id}')">
                Review & Decide
            </button>
        </div>
    `;
}

// Open detailed review panel
async function openReturnReview(returnId) {
    const returnRequest = await db.collection('returns').doc(returnId).get();
    const data = returnRequest.data();
    
    // Get customer details
    const customer = await db.collection('users').doc(data.customerId).get();
    const customerData = customer.data();
    
    // Get order details
    const order = orders.find(o => o.id === data.orderId);
    
    const modal = document.getElementById('returnDetailModal');
    modal.querySelector('.return-detail-content').innerHTML = `
        <div class="admin-return-detail">
            <!-- Customer Info Section -->
            <section class="detail-section">
                <h3>👤 Customer Details</h3>
                <p>Name: <strong>${customerData.name}</strong></p>
                <p>Email: <strong>${customerData.email}</strong></p>
                <p>Phone: <strong>${customerData.phone}</strong></p>
                <p>Account Created: <strong>${new Date(customerData.createdAt).toLocaleDateString()}</strong></p>
                <p>Previous Returns: <strong>${returnRequests.filter(r => r.customerId === data.customerId).length}</strong></p>
            </section>
            
            <!-- Order Info Section -->
            <section class="detail-section">
                <h3>📦 Order Details</h3>
                <p>Order ID: <strong>${data.orderId}</strong></p>
                <p>Product: <strong>${data.productName}</strong></p>
                <p>Price: <strong>₹${data.refundAmount}</strong></p>
                <p>Ordered: <strong>${new Date(order.createdAt).toLocaleDateString()}</strong></p>
                <p>Delivered: <strong>${new Date(data.deliveryDate).toLocaleDateString()}</strong></p>
                <p>Days Since Delivery: <strong>${data.daysUntilDeadline ? '7 - ' + data.daysUntilDeadline : '7+'}</strong></p>
            </section>
            
            <!-- Return Reason Section -->
            <section class="detail-section">
                <h3>🏷️ Return Reason</h3>
                <p>Category: <strong>${data.reason}</strong></p>
                <p>Customer Message: <strong>"${data.message || 'None provided'}"</strong></p>
            </section>
            
            <!-- Photos Section -->
            <section class="detail-section">
                <h3>📸 Photo Proof</h3>
                <div class="photos-grid">
                    ${data.photosUrls.map((url, i) => `
                        <div class="photo-preview">
                            <p>Photo ${i + 1}</p>
                            <img src="${url}" onclick="openImageFull('${url}')" alt="Proof photo ${i + 1}">
                        </div>
                    `).join('')}
                </div>
                ${data.videoUrl ? `
                    <div class="video-preview">
                        <p>Video Proof</p>
                        <video controls width="100%">
                            <source src="${data.videoUrl}" type="video/mp4">
                        </video>
                    </div>
                ` : ''}
            </section>
            
            <!-- AI Risk Assessment Section -->
            <section class="detail-section ai-section">
                <h3>🤖 AI Risk Analysis</h3>
                <div class="risk-score">
                    <div class="score-circle" style="background: linear-gradient(135deg, #51cf66 0%, #51cf66 ${data.aiRiskScore}%, #e8e8e8 ${data.aiRiskScore}%, #e8e8e8 100%)">
                        <span>${data.aiRiskScore}%</span>
                    </div>
                    <div class="risk-label">
                        ${data.aiRiskScore <= 35 ? '🟢 LOW RISK' : data.aiRiskScore <= 65 ? '🟡 MEDIUM RISK' : '🔴 HIGH RISK'}
                    </div>
                </div>
                
                <div class="ai-checks">
                    <p>✓ Reused Images: ${data.aiFlags.reusedImages ? '⚠️ YES' : '✅ NO'}</p>
                    <p>✓ Blur Detected: ${data.aiFlags.blurDetected ? '⚠️ YES' : '✅ NO'}</p>
                    <p>✓ Repeat Pattern: ${data.aiFlags.repeatPattern ? '⚠️ YES' : '✅ NO'}</p>
                    <p>✓ Customer History: ${returnRequests.filter(r => r.customerId === data.customerId && r.status === 'APPROVED').length} approved returns</p>
                </div>
                
                <p class="ai-note">
                    <strong>Note:</strong> AI scores are recommendations only. 
                    You make the final decision.
                </p>
            </section>
            
            <!-- Decision Section -->
            <section class="detail-section decision-section">
                <h3>🎯 Admin Decision</h3>
                
                <div class="decision-buttons">
                    <button onclick="approveReturn('${returnId}')" class="btn-approve">
                        ✅ APPROVE
                    </button>
                    <button onclick="openRejectPanel('${returnId}')" class="btn-reject">
                        ❌ REJECT
                    </button>
                    <button onclick="openMoreInfoPanel('${returnId}')" class="btn-info">
                        ❓ REQUEST MORE INFO
                    </button>
                </div>
                
                <!-- Reject Panel (hidden by default) -->
                <div id="rejectPanel-${returnId}" class="hidden">
                    <label>Rejection Reason:</label>
                    <select id="rejectionReason-${returnId}">
                        <option value="">Select a reason...</option>
                        <option value="PROOF_QUALITY">Proof quality insufficient</option>
                        <option value="OUTSIDE_WINDOW">Outside 7-day window</option>
                        <option value="SUSPICIOUS_PATTERN">Suspicious pattern detected</option>
                        <option value="REUSED_IMAGES">Customer edited/reused images</option>
                        <option value="NO_DEFECT">No valid defect visible</option>
                        <option value="OTHER">Other reason</option>
                    </select>
                    
                    <label>Additional Details:</label>
                    <textarea id="rejectionDetails-${returnId}" 
                              placeholder="Provide details about rejection..."
                              rows="3"></textarea>
                    
                    <div class="panel-buttons">
                        <button onclick="submitReject('${returnId}')" class="btn-submit">
                            Confirm Rejection
                        </button>
                        <button onclick="cancelReject('${returnId}')" class="btn-cancel">
                            Cancel
                        </button>
                    </div>
                </div>
                
                <!-- Admin Notes -->
                <div class="notes-section">
                    <label>Internal Notes:</label>
                    <textarea id="adminNotes-${returnId}" 
                              placeholder="For admin team only..."
                              rows="3"></textarea>
                </div>
            </section>
        </div>
    `;
    
    modal.classList.add('active');
}

// Approve return
async function approveReturn(returnId) {
    try {
        const confirmation = confirm('Approve this return request?');
        if (!confirmation) return;
        
        const adminNotes = document.getElementById(`adminNotes-${returnId}`).value;
        
        // Update in Firestore
        await db.collection('returns').doc(returnId).update({
            status: 'APPROVED',
            adminDecision: 'APPROVED',
            adminId: currentUser.id,
            adminNotes: adminNotes,
            decisionDate: new Date().toISOString(),
            pickupStatus: 'PENDING'
        });
        
        // Update local copy
        const returnReq = returnRequests.find(r => r.id === returnId);
        if (returnReq) {
            returnReq.status = 'APPROVED';
            returnReq.adminDecision = 'APPROVED';
            returnReq.adminId = currentUser.id;
            returnReq.adminNotes = adminNotes;
            localStorage.setItem('luxeReturns', JSON.stringify(returnRequests));
        }
        
        // Notify customer (SMS + Email)
        notifyCustomerOfApproval(returnId);
        
        showNotification('✅ Return approved! Customer notified.', 'success');
        closeReturnDetail();
        loadReturnsForAdmin(); // Refresh list
        
    } catch (error) {
        console.error('Approval error:', error);
        showNotification('❌ Error approving return', 'error');
    }
}

// Reject return
async function submitReject(returnId) {
    try {
        const reason = document.getElementById(`rejectionReason-${returnId}`).value;
        const details = document.getElementById(`rejectionDetails-${returnId}`).value;
        const adminNotes = document.getElementById(`adminNotes-${returnId}`).value;
        
        if (!reason) {
            showNotification('❌ Please select a rejection reason', 'error');
            return;
        }
        
        const confirmation = confirm('Reject this return? Customer can appeal within 48 hours.');
        if (!confirmation) return;
        
        // Update in Firestore
        await db.collection('returns').doc(returnId).update({
            status: 'REJECTED',
            adminDecision: 'REJECTED',
            rejectionReason: reason,
            rejectionDetails: details,
            adminId: currentUser.id,
            adminNotes: adminNotes,
            decisionDate: new Date().toISOString(),
            appealDeadline: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString()
        });
        
        // Notify customer
        notifyCustomerOfRejection(returnId, reason);
        
        showNotification('✅ Return rejected. Customer notified and can appeal.', 'success');
        closeReturnDetail();
        loadReturnsForAdmin();
        
    } catch (error) {
        console.error('Rejection error:', error);
        showNotification('❌ Error rejecting return', 'error');
    }
}
```

---

## TESTING CHECKLIST

### Unit Tests

```javascript
// Test Add-to-Cart Fix
function testAddToCart() {
    console.log('Testing Add-to-Cart...');
    
    // Test 1: Add product from grid
    addToCart(1);
    assert(cart.length > 0, 'Product added to cart');
    
    // Test 2: Invalid product ID
    const before = cart.length;
    addToCart(999);
    assert(cart.length === before, 'Invalid product not added');
    
    // Test 3: Null product ID
    currentProductId = null;
    const before2 = cart.length;
    addToCart();
    assert(cart.length === before2, 'Null product ID not added');
    
    console.log('✅ All cart tests passed');
}

// Test Return System
function testReturnSystem() {
    console.log('Testing Return System...');
    
    // Test 1: Eligibility within 7 days
    const order = { deliveryDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) };
    const eligibility = checkReturnEligibility(order.id);
    assert(eligibility.eligible === true, 'Within 7 days should be eligible');
    
    // Test 2: Eligibility after 7 days
    const oldOrder = { deliveryDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) };
    const oldEligibility = checkReturnEligibility(oldOrder.id);
    assert(oldEligibility.eligible === false, 'After 7 days should not be eligible');
    
    console.log('✅ All return system tests passed');
}
```

### Manual Testing Checklist

```
Return System Testing:
[ ] Customer can initiate return within 7 days
[ ] Customer cannot initiate return after 7 days
[ ] Photo upload works (at least 3 photos)
[ ] Video upload works (optional)
[ ] Return request appears in admin dashboard
[ ] Admin can view all return details
[ ] Admin can approve return
[ ] Admin can reject return (with reason)
[ ] Admin can request more info
[ ] Customer receives instant notification on approval/rejection
[ ] Customer can schedule pickup after approval
[ ] Pickup QR code generates correctly
[ ] Return status updates in real-time
[ ] Refund timeline is accurate

Add-to-Cart Fix Testing:
[ ] Click "Add to Cart" on product grid works
[ ] Click "Add to Cart" on detail page works (with size selected)
[ ] Error if no size selected
[ ] Success notification shows
[ ] Cart badge updates
[ ] Cart can hold multiple items
[ ] Fallback to direct checkout if cart fails

Search Testing:
[ ] Search input shows suggestions as you type
[ ] Suggestions include products, categories, keywords
[ ] Spelling mistakes are corrected ("blaak" → "black")
[ ] Works on slow connections
[ ] Search results page displays correctly
[ ] Trending searches appear
[ ] Filter/sort works on results
```

---

## DEPLOYMENT GUIDE

### Local Testing (Development)

```bash
# 1. Start local server
node server.js

# 2. Open browser
http://localhost:8000

# 3. Test all features
# - Add items to cart
# - Checkout with COD
# - View admin panel
# - Try return process
```

### Firebase Hosting Deployment

```bash
# 1. Install Firebase CLI
npm install -g firebase-tools

# 2. Login to Firebase
firebase login

# 3. Initialize Firebase project
firebase init

# 4. Deploy
firebase deploy

# Result: Live at https://ancrio.firebaseapp.com
```

### GitHub Deployment (Version Control)

```bash
# 1. Initialize Git
git init
git add .
git commit -m "Initial commit - ANCRIO v1.0"

# 2. Create GitHub repository
# Go to: https://github.com/new
# Create repo: ancrio-platform

# 3. Push to GitHub
git remote add origin https://github.com/yourusername/ancrio-platform.git
git branch -M main
git push -u origin main

# 4. Future updates
git add .
git commit -m "Add return system"
git push
```

---

## COMMON ISSUES & SOLUTIONS

### Issue 1: Add-to-Cart Button Not Working

**Symptom:** Button click has no effect, no error message

**Solution:**
```javascript
// Check if currentProductId is set
console.log('currentProductId:', currentProductId);

// Verify product exists in database
const product = products.find(p => p.id === currentProductId);
console.log('Product found:', product);

// Check console for errors (F12 → Console tab)
```

### Issue 2: Photos Not Uploading

**Symptom:** Return request fails when uploading photos

**Solution:**
```javascript
// Check Firebase Storage permissions
// Go to: Firebase Console → Storage → Rules

// Rule should be:
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /returns/{allPaths=**} {
      allow read, write: if request.auth != null;
    }
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}

// Publish rules
```

### Issue 3: Admin Dashboard Not Loading

**Symptom:** Admin tab shows blank or error

**Solution:**
```javascript
// Check Firestore permissions
// Go to: Firebase Console → Firestore → Rules

// Rule should allow admin to read/write returns:
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /returns/{document=**} {
      allow read, write: if request.auth.uid == "ADMIN_USER_ID";
    }
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Issue 4: Notification Not Showing

**Symptom:** showNotification() called but no notification appears

**Solution:**
```javascript
// Check if function exists
console.log(typeof showNotification); // Should be 'function'

// Check DOM for notification element
const notification = document.querySelector('.notification-popup');
console.log('Notification element:', notification);

// Verify CSS is loaded (F12 → Elements tab)
```

### Issue 5: Cart Not Persisting

**Symptom:** Cart empties when page reloads

**Solution:**
```javascript
// Check localStorage access
try {
    localStorage.setItem('test', 'value');
    localStorage.removeItem('test');
    console.log('localStorage works');
} catch (e) {
    console.error('localStorage not available:', e);
}

// Check cart saving
function saveToStorage() {
    try {
        localStorage.setItem('luxeCart', JSON.stringify(cart));
        console.log('Cart saved:', cart);
    } catch (e) {
        console.error('Save failed:', e);
    }
}
```

---

## NEXT STEPS (ROADMAP)

### Immediate (This Week)
- ✅ Add-to-Cart fix (DONE)
- ✅ Comprehensive specifications (DONE)
- [ ] Create Firestore return request collection
- [ ] Test return eligibility logic

### Week 2
- [ ] Build return request UI
- [ ] Photo upload functionality
- [ ] Admin review dashboard

### Week 3
- [ ] AI fraud detection (basic)
- [ ] SMS notifications setup
- [ ] Refund logic implementation

### Week 4
- [ ] Complete testing
- [ ] Deploy to Firebase
- [ ] Public beta launch

---

**Questions?** Contact: 9279559939 | ancrio09@gmail.com

**Documentation Version:** 1.0.0  
**Last Updated:** Jan 27, 2026
