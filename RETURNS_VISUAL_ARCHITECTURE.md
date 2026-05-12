# 🎨 Flipkart-Style Returns System - Visual Architecture & Flows

## 📐 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    ANCRIO E-COMMERCE PLATFORM                   │
└─────────────────────────────────────────────────────────────────┘
                                  │
                ┌─────────────────┼─────────────────┐
                │                 │                 │
                ▼                 ▼                 ▼
        ┌───────────────┐  ┌──────────────┐  ┌──────────────┐
        │   CUSTOMER    │  │ RETURN/      │  │    ADMIN     │
        │   DASHBOARD   │  │  REFUND      │  │  DASHBOARD   │
        │               │  │   SYSTEM     │  │              │
        └───────────────┘  └──────────────┘  └──────────────┘
                │               │                   │
                │               │                   │
        ┌───────────────────────┴───────────────────────────┐
        │                                                     │
        ▼                                                     ▼
    ┌────────────────────┐                        ┌──────────────────┐
    │   BROWSER LOCAL    │                        │   ORDER DATA     │
    │   STORAGE (JSON)   │◄──────────────────────►│   & RETURNS DB   │
    └────────────────────┘                        └──────────────────┘
```

---

## 🔄 Return Request Workflow

```
CUSTOMER INITIATES RETURN
    │
    ▼
┌─────────────────────────────────────┐
│  STEP 1: SELECT REASON & TYPE       │
├─────────────────────────────────────┤
│  Return Reason (8 options)          │
│  └─ Defective                       │
│  └─ Wrong Size                      │
│  └─ Wrong Item                      │
│  └─ Not as Described                │
│  └─ Quality Issue                   │
│  └─ Color Mismatch                  │
│  └─ Changed Mind                    │
│  └─ Other                           │
│                                     │
│  Return Type (2 options)            │
│  └─ 💰 Refund                       │
│  └─ 🔄 Replace                      │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│  STEP 2: PHOTO VERIFICATION         │
├─────────────────────────────────────┤
│  📸 Upload Photos                   │
│  ├─ Take with Camera                │
│  ├─ Upload from Device              │
│  └─ Preview in Grid                 │
│                                     │
│  What to Photograph:                │
│  ✓ Product Packaging                │
│  ✓ Product Close-up                 │
│  ✓ Issue/Defect Area                │
│  ✓ Unboxing Photo                   │
│                                     │
│  Photo Counter:                     │
│  1 Photo    → 48-hour approval      │
│  2+ Photos  → 24-hour approval ⭐   │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│  STEP 3: CONFIRM DETAILS            │
├─────────────────────────────────────┤
│  Add Optional Message               │
│  Review Return Policy               │
│  Submit Request                     │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│  SUBMISSION CONFIRMATION            │
├─────────────────────────────────────┤
│  ✅ Request Submitted               │
│  💰 Refund Amount: ₹XXX             │
│  ⏰ Approval Timeline: 24-48 hours   │
│  📸 Photos: 1-X submitted           │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│  DATA STORED IN LOCALSTORAGE        │
├─────────────────────────────────────┤
│  Return ID: RET-timestamp           │
│  Photos: [base64, base64, ...]      │
│  Status: Pending                    │
│  Refund Amount: Calculated          │
│  AI Risk Score: 0-100%              │
│  Timeline: 24-48 hours              │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│  ADMIN REVIEWS REQUEST              │
├─────────────────────────────────────┤
│  [Admin Dashboard Shows]            │
│  • Customer Details                 │
│  • Product & Reason                 │
│  • Photo Gallery                    │
│  • AI Risk Score                    │
│  • Refund Details                   │
└─────────────────────────────────────┘
    │
    ├─────────────────┬────────────────┬────────────────┐
    │                 │                │                │
    ▼                 ▼                ▼                ▼
  ✅ APPROVE      ❌ REJECT      📦 PICKUP       ⏳ PENDING
    │                 │                │                │
    ▼                 ▼                ▼                ▼
AWAITING           DENIED         AUTO-            CUSTOMER
SHIPMENT        NO REFUND        APPROVED        NOTIFIED
    │                 │                │                │
    └─────────────────┴────────────────┴────────────────┘
                      │
                      ▼
            CUSTOMER NOTIFIED
                      │
                      ▼
            REFUND PROCESSED (7-10 days)
            OR REPLACEMENT SENT (5-7 days)
```

---

## 📋 Return Request Data Structure

```
ReturnRequest Object:
│
├─ id: "RET-1706381400000"
├─ orderId: 12345
│
├─ CUSTOMER INFO
│  ├─ customerName: "John Doe"
│  ├─ customerEmail: "john@example.com"
│  └─ shippingAddress: "..."
│
├─ PRODUCT INFO
│  ├─ productName: "Premium Black T-Shirt"
│  ├─ itemPrice: 799
│  └─ quantity: 1
│
├─ RETURN DETAILS
│  ├─ reason: "Defective"
│  ├─ type: "Refund"
│  └─ message: "The stitching is broken..."
│
├─ PHOTOS
│  ├─ photos: [base64_img1, base64_img2]
│  ├─ photoCount: 2
│  └─ verificationMethod: "multi-photo-verification"
│
├─ VERIFICATION
│  ├─ verificationStatus: "verified"
│  ├─ aiRiskScore: 25
│  └─ aiFlags: ["LEGIT_COMPLAINT", "CLEAR_IMAGES"]
│
├─ REFUND
│  ├─ amount: 799
│  ├─ currency: "INR"
│  ├─ method: "Original Payment Method"
│  └─ status: "Awaiting Approval"
│
├─ TIMELINE
│  ├─ submittedDate: "2026-01-27T15:30:00Z"
│  ├─ estimatedApprovalDate: "2026-01-28T15:30:00Z"
│  ├─ approvalDate: "2026-01-28T10:00:00Z"
│  ├─ pickupDate: null
│  └─ refundedDate: null
│
├─ STATUS
│  ├─ status: "Pending"
│  └─ trackingHistory: [
│       {status: "Submitted", date: "...", note: "..."},
│       {status: "Approved", date: "...", note: "..."}
│     ]
└─
```

---

## 🎯 Admin Dashboard Layout

```
┌────────────────────────────────────────────────────────────────┐
│                    ADMIN DASHBOARD                             │
│                                                                │
│  Return/Replace Tab [ACTIVE]                                  │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │                 RETURN REQUEST CARD                      │ │
│  ├──────────────────────────────────────────────────────────┤ │
│  │                                                          │ │
│  │  Return #RET-1706381400000        AI Risk: 25% [GREEN]  │ │
│  │  Order #000123                    Status: [PENDING]     │ │
│  │                                                          │ │
│  ├──────────────────────────────────────────────────────────┤ │
│  │  Verification: ✅ VERIFIED (2 Photos)                   │ │
│  │  Submitted: 27-01-2026                                  │ │
│  ├──────────────────────────────────────────────────────────┤ │
│  │                                                          │ │
│  │  REFUND DETAILS              CUSTOMER INFO              │ │
│  │  ├─ Amount: ₹799             ├─ Name: John Doe         │ │
│  │  ├─ Method: Original          ├─ Email: john@...      │ │
│  │  ├─ Est. Approval: 28-01-26   ├─ Ordered: 20-01-26    │ │
│  │  └─ Status: Awaiting          └─ ...                   │ │
│  │                                                          │ │
│  │  RETURN DETAILS              PHOTO GALLERY             │ │
│  │  ├─ Product: T-Shirt         ┌─────┬─────┐            │ │
│  │  ├─ Reason: Defective        │ [1] │ [2] │            │ │
│  │  └─ Type: Refund             └─────┴─────┘            │ │
│  │                                                          │ │
│  │  CUSTOMER MESSAGE                                      │ │
│  │  "The stitching is broken after first wash..."         │ │
│  │                                                          │ │
│  │  AI ANALYSIS FLAGS                                     │ │
│  │  LEGIT_COMPLAINT • CLEAR_IMAGES • FAST_APPROVAL        │ │
│  │                                                          │ │
│  ├──────────────────────────────────────────────────────────┤ │
│  │                                                          │ │
│  │  [✅ APPROVE]  [❌ REJECT]  [🚚 SCHEDULE PICKUP]       │ │
│  │                                                          │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│  ... more return requests ...                                │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## 🎨 Photo Verification Flow

```
PHOTO CAPTURE METHODS
        │
        ├─────────────────────┬─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
    ┌─────────┐           ┌──────────┐         ┌──────────┐
    │ CAMERA  │           │ CAMERA   │         │   FILE   │
    │ BUTTON  │           │  MODAL   │         │  UPLOAD  │
    └────┬────┘           │ (fullscreen)       └────┬─────┘
         │                └──────────┘              │
         │                    │                    │
         │                    ├──────────┬─────────┘
         │                    │          │
         └────────────────────┼──────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  FILE READER     │
                    │  (DataTransfer)  │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   BASE64         │
                    │  ENCODING        │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │  PHOTO PREVIEW   │
                    │   GRID (120x120) │
                    │  Thumbnails +    │
                    │  Remove Buttons  │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │  PHOTO COUNTER   │
                    │  "2 photos       │
                    │   uploaded"      │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │  SUBMIT FORM     │
                    │  (Photos stored  │
                    │   as array)      │
                    └──────────────────┘
```

---

## 🏃 User Journey Map

### Customer Journey
```
┌─────────────────────────────────────────────────────────────┐
│ CUSTOMER JOURNEY: Return Product                            │
└─────────────────────────────────────────────────────────────┘

1. VIEW ORDER HISTORY
   └─ Delivered order visible
   └─ "Return/Replace" button available
   └─ Return window: "5 days left"

2. CLICK RETURN BUTTON
   └─ Return modal opens
   └─ Step 1 of 3 displayed
   └─ Progress bar shows: (1) ━━━ (2) ━━━ (3)

3. SELECT REASON
   └─ Dropdown with 8 options
   └─ Emoji indicators
   └─ Example: "❌ Defective/Broken Item"

4. SELECT RETURN TYPE
   └─ Radio buttons
   └─ Option 1: 💰 Refund (selected by default)
   └─ Option 2: 🔄 Replace

5. TAKE PHOTOS
   └─ Click "📷 Take Photo"
   └─ Camera modal opens fullscreen
   └─ Photo preview grid shows captured photos
   └─ Can take multiple photos
   └─ See photo counter: "✓ 2 photos"

6. ADD MESSAGE (OPTIONAL)
   └─ Text field for detailed explanation
   └─ Example: "Broken after first wash"

7. REVIEW & SUBMIT
   └─ See refund amount calculated
   └─ See approval timeline (24h for 2+ photos)
   └─ Click "Submit Return Request"

8. SUCCESS CONFIRMATION
   └─ ✅ Message: "Return request submitted!"
   └─ Shows: Refund amount & approval timeline
   └─ Redirects to order history

9. TRACK RETURN STATUS
   └─ Return appears in order card
   └─ Shows: Status, refund amount, timeline
   └─ Updates when admin approves
   └─ Notification sent for approval/rejection
   └─ Refund processed in 7-10 days

10. RECEIVE REFUND OR REPLACEMENT
    └─ Refund appears in payment method
    └─ Or replacement item ships
    └─ Order marked as completed
```

### Admin Journey
```
┌─────────────────────────────────────────────────────────────┐
│ ADMIN JOURNEY: Process Return                               │
└─────────────────────────────────────────────────────────────┘

1. NAVIGATE TO ADMIN PANEL
   └─ Click "Return/Replace" tab
   └─ See all pending return requests

2. REVIEW RETURN CARD
   └─ See customer info
   └─ See product details
   └─ See reason & type
   └─ See AI risk score (color-coded)
   └─ See verification status

3. VIEW PHOTOS
   └─ See thumbnail grid
   └─ Click thumbnail to expand
   └─ View full-size photos
   └─ Close photo modal

4. READ DETAILS
   └─ Customer message
   └─ AI analysis flags
   └─ Refund amount
   └─ Return window status

5. DECIDE ACTION
   Option A: ✅ APPROVE
   └─ Click "✅ APPROVE" button
   └─ Status changes to "Approved"
   └─ Awaiting customer shipment

   Option B: ❌ REJECT
   └─ Click "❌ REJECT" button
   └─ Status changes to "Rejected"
   └─ No refund processed

   Option C: 🚚 SCHEDULE PICKUP
   └─ Click "🚚 SCHEDULE PICKUP" button
   └─ Auto-approves the request
   └─ Status changes to "Picked"
   └─ Awaiting customer return

6. MONITOR STATUS
   └─ Request card updates in real-time
   └─ Shows: Approved/Rejected/Picked
   └─ Tracks pickup date
   └─ Tracks refund date

7. REFUND PROCESSING
   └─ Admin confirms receipt
   └─ Process refund (7-10 days)
   └─ Update order status
   └─ Customer receives funds
```

---

## 📱 Mobile UI Responsiveness

```
DESKTOP (1920px)              TABLET (768px)           MOBILE (375px)
┌──────────────────────┐      ┌────────────────┐      ┌──────────────┐
│ Return Modal         │      │ Return Modal   │      │Return Modal  │
│ ┌────────────────┐   │      │ ┌────────────┐ │      │┌────────────┐│
│ │ [X]            │   │      │ │ [X]        │ │      ││[X]         ││
│ │ 🔄 Return/Repl │   │      │ │ 🔄 Return  │ │      ││🔄 Return   ││
│ │                │   │      │ │            │ │      ││             ││
│ │ Step Indicators:   │      │ Step Indic:   │      │Step Indic:   ││
│ │ (1)━━━(2)━━━(3)   │      │ (1)━(2)━(3) │      │(1)━(2)━(3) ││
│ │                │   │      │ │            │ │      ││             ││
│ │ [Reason Select]    │      │ [Reason Sel]│ │      ││[Reason Sel]││
│ │ [Type Select]      │      │ [Type Sel] │ │      ││[Type Sel] ││
│ │                │   │      │ │            │ │      ││             ││
│ │ [📷] [📂]        │   │      │ [📷] [📂] │ │      ││[📷][📂]   ││
│ │ Photo Grid (4x)    │      │ Grid (2x) │ │      ││Grid(2x)   ││
│ │ Photo Counter      │      │ Counter   │ │      ││Counter    ││
│ │                │   │      │ │            │ │      ││             ││
│ │ [Message Text]     │      │ [Message] │ │      ││[Message]  ││
│ │                │   │      │ │            │ │      ││             ││
│ │ [Cancel] [Submit]  │      │[Cancel][Sub]│ │      ││[Cancel]   ││
│ │                    │      │            │ │      ││[Submit]   ││
│ └────────────────┘   │      │ └────────────┘ │      │└────────────┘│
└──────────────────────┘      └────────────────┘      └──────────────┘

RESPONSIVE BREAKPOINTS:
• Desktop: 1920px and above
• Tablet: 768px to 1919px
• Mobile: Below 768px

MOBILE OPTIMIZATIONS:
✓ Full-screen modal with scroll
✓ Stacked layout (no grid)
✓ Large buttons (min 44x44px)
✓ Single column photo grid
✓ Fullscreen camera modal
✓ Touch-friendly inputs
✓ Large font sizes
```

---

## 🎯 Status & Risk Scoring System

```
VERIFICATION STATUS
├─ ✅ VERIFIED
│  ├─ Clear photo evidence
│  ├─ Multiple photos (2+)
│  ├─ AI risk score ≤ 35%
│  └─ Fast-track approval
│
├─ ⏳ PENDING
│  ├─ Awaiting admin review
│  ├─ Single photo (1)
│  ├─ Or high-risk flag
│  └─ Normal approval time
│
└─ ❌ REJECTED
   ├─ Photo evidence insufficient
   ├─ AI flags fraudulent
   ├─ Admin rejected
   └─ No refund

AI RISK SCORING (0-100%)
│
├─ 🟢 LOW RISK (0-35%)
│  ├─ Green badge
│  ├─ Clear photos
│  ├─ Legitimate reason
│  ├─ Fast approval
│  └─ Auto-approved eligible
│
├─ 🟡 MEDIUM RISK (36-65%)
│  ├─ Orange badge
│  ├─ Mixed signals
│  ├─ Needs review
│  ├─ Normal approval
│  └─ Manual admin check
│
└─ 🔴 HIGH RISK (66-100%)
   ├─ Red badge
   ├─ Fraud signals detected
   ├─ Limited/unclear photos
   ├─ Suspicious reason
   └─ Needs investigation

AI FLAGS EXAMPLES
├─ LEGIT_COMPLAINT      → Clear defect shown
├─ CLEAR_IMAGES        → High-quality photos
├─ MULTIPLE_EVIDENCE   → 3+ photos
├─ STANDARD_COMPLAINT  → Common issue
├─ VAGUE_COMPLAINT     → Unclear issue
├─ POOR_IMAGES        → Blurry/dark photos
├─ FRAUD_SIGNAL       → Suspicious pattern
└─ NEEDS_REVIEW       → Manual check needed
```

---

## 🔄 Timeline & Approval Process

```
                    CUSTOMER SUBMITS
                          │
                          ▼
                ┌──────────────────────┐
                │  SUBMISSION TIME     │
                │  T=0 (Now)           │
                └──────────┬───────────┘
                           │
                ┌──────────┴──────────┐
                │                     │
        ┌───────▼────────┐  ┌────────▼──────────┐
        │  1 PHOTO       │  │  2+ PHOTOS        │
        │  SUBMITTED     │  │  SUBMITTED        │
        └───────┬────────┘  └────────┬──────────┘
                │                    │
                ▼                    ▼
        ┌──────────────────┐  ┌──────────────────┐
        │  48-HOUR         │  │  24-HOUR         │
        │  APPROVAL        │  │  APPROVAL ⭐     │
        │  WINDOW          │  │  WINDOW          │
        └────────┬─────────┘  └────────┬─────────┘
                 │                     │
        ┌────────▼─────────┐   ┌──────▼────────────┐
        │  T+48 hours      │   │  T+24 hours       │
        │  (2 days)        │   │  (1 day)          │
        └────────┬─────────┘   └──────┬────────────┘
                 │                    │
                 ├────────────┬───────┘
                 │            │
                 ▼            ▼
        ┌──────────────────────────────┐
        │  ADMIN DECISION              │
        ├──────────────────────────────┤
        │  ✅ APPROVE (Likely)         │
        │  ❌ REJECT                   │
        │  🚚 SCHEDULE PICKUP          │
        └──────────┬───────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
        ▼                     ▼
  ┌──────────────┐    ┌──────────────────┐
  │ APPROVED     │    │  REJECTED        │
  │              │    │                  │
  │ 🚚 Awaiting  │    │ ❌ No Refund     │
  │    Shipment  │    │                  │
  │              │    │ 📧 Customer      │
  │ 7-10 days    │    │    Notified      │
  │ refund       │    └──────────────────┘
  └──────────────┘

TIMELINE EXAMPLE
2026-01-27  Customer submits (2 photos)
2026-01-28  Approval window closes (24h)
2026-01-29  Admin approves
2026-02-05  Customer ships item back
2026-02-07  Refund received (7-10 days from approval)
```

---

## 💾 Data Flow & Storage

```
CUSTOMER BROWSER          LOCAL STORAGE            ADMIN VIEW
     │                         │                       │
     │  Fill Return Form        │                       │
     ├────────────────────────►│                       │
     │                         │                       │
     │  Upload Photos (x2)      │                       │
     ├────────────────────────►│                       │
     │                         │                       │
     │  Submit Request          │                       │
     ├────────────────────────►│◄──────────────────────┤
     │                         │  Read Return Data    │
     │                         │  & Photos            │
     │  View in History        │                       │
     │◄────────────────────────┤                       │
     │                         │  Take Action         │
     │                         │◄──────────────────────┤
     │                         │                       │
     │  Updated Status         │  Update Status      │
     │◄────────────────────────├──────────────────────►│
     │                         │                       │

LOCALSTORAGE STRUCTURE
{
  "luxeOrders": [
    {
      "id": 12345,
      "items": [...],
      "returnRequests": [
        {
          "id": "RET-1706381400000",
          "productName": "...",
          "photos": ["data:image/jpeg;base64,..."],
          "refundDetails": {...},
          "status": "Pending",
          "aiRiskScore": 25,
          ...
        }
      ]
    }
  ]
}
```

---

## 🎬 Key Animations & Interactions

```
PROGRESS BAR ANIMATION
Step 1 ✓ (GOLD)
   │
   ▼
Step 2 ◆ (UPDATING)
   │
   ▼
Step 3 ◆ (PENDING)

PHOTO PREVIEW INTERACTION
  Hover: [Zoom effect 1.05x]
  Click: [Photo expands fullscreen]
  Remove: [Delete button X fades in on hover]

BUTTON INTERACTIONS
Normal:    [Blue background]
Hover:     [Glowing shadow effect]
Active:    [Darker background]
Disabled:  [Greyed out, cursor: not-allowed]

STATUS BADGE COLORS
Green:     [Approved/Verified states]
Orange:    [Pending/Awaiting states]
Red:       [Rejected/Error states]
Purple:    [Secondary/Info states]

LOADING STATES
Photo Upload:   [Spinner animation]
Form Submit:    [Button disables, shows loading]
AI Analysis:    [Processing message]
Admin Action:   [Button loading state]
```

---

## 📊 Approval Decision Tree

```
RETURN REQUEST SUBMITTED
        │
        ▼
├─ VERIFY PHOTOS
│  ├─ Photos provided? YES → Continue
│  └─ No photos? → ❌ REJECT
│
├─ RUN AI ANALYSIS
│  ├─ Calculate Risk Score (0-100)
│  ├─ Generate Flags
│  └─ Determine Status (Verified/Pending/Rejected)
│
├─ CHECK PHOTO QUALITY
│  ├─ 2+ Photos? → ✅ High Confidence
│  ├─ 1 Photo? → ⚠️ Needs Review
│  └─ Blurry? → ❌ May Reject
│
├─ ANALYZE REASON
│  ├─ Common issue? → ✅ Likely Valid
│  ├─ Unusual? → ⚠️ Review
│  └─ Suspicious? → ❌ Likely Fraud
│
├─ CHECK CUSTOMER HISTORY
│  ├─ First return? → ✅ Good
│  ├─ Multiple returns? → ⚠️ Monitor
│  └─ Serial returner? → ❌ Red flag
│
├─ ADMIN DECISION
│  ├─ Risk ≤ 35%? → ✅ APPROVE
│  ├─ Risk 36-65%? → ⚠️ REVIEW FIRST
│  └─ Risk > 65%? → ❌ LIKELY REJECT
│
└─ FINAL OUTCOME
   ├─ ✅ APPROVED → Await shipment
   ├─ ⏳ PENDING → More review needed
   └─ ❌ REJECTED → No refund
```

---

## 🎉 Complete Visual Summary

```
FLIPKART-STYLE RETURNS SYSTEM

INPUT (Customer)          PROCESSING (System)      OUTPUT (Admin)
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│ Reason       │         │ Data          │         │ Rich Card    │
│ Type         │────────►│ Validation    │────────►│ with Photos  │
│ Photos       │         │ AI Analysis   │         │ & AI Score   │
│ Message      │         │ Risk Scoring  │         │ & Actions    │
└──────────────┘         └──────────────┘         └──────────────┘
      │                        │                        │
      │                        │                        │
      └────────────────────────┴────────────────────────┘
                      │
                      ▼
           CUSTOMER TRACKING
         ┌─────────────────────┐
         │ Return Status Box   │
         │ ├─ Status Badge     │
         │ ├─ Refund Amount    │
         │ ├─ Timeline         │
         │ ├─ Photos Count     │
         │ └─ Decision Date    │
         └─────────────────────┘
```

---

**Last Updated:** January 27, 2026  
**Version:** 1.0 - Flipkart-Style Returns System  
**Status:** ✅ Complete & Fully Documented
