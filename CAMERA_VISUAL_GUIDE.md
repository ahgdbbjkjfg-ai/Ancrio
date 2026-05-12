# Live Camera Verification - Visual Guide

## Feature Overview

### 📱 User Interface Flow

```
┌─────────────────────────────────────────────────────┐
│           MY ORDERS - ORDER DETAILS                  │
│                                                       │
│ Order #ORD-001234567                                │
│ Status: Delivered ✓                                  │
│                                                       │
│ ┌─────────────────────────────────────────────────┐ │
│ │ Samsung 65" 4K Smart TV              ₹45,999   │ │
│ │ ✓ Delivered on 15 Dec 2024                     │ │
│ │                                                 │ │
│ │ [Track Order] [View Reviews] [❌ Return]       │ │
│ └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
                        ↓
            User clicks [❌ Return]
                        ↓
┌─────────────────────────────────────────────────────┐
│    REQUEST RETURN / REPLACEMENT - MODAL              │
│                                                       │
│ Select Reason:                                      │
│ [▼ Defective] ← Most common for camera feature     │
│                                                       │
│ Return Type:                                        │
│ ◉ Refund (get money back)                          │
│ ○ Replacement (get new item)                       │
│                                                       │
│ Additional Message:                                 │
│ [Screen has flickering on right side...]           │
│                                                       │
│ ┌─────────────────────────────────────────────────┐ │
│ │ VERIFICATION METHODS (Choose ONE):               │ │
│ │                                                  │ │
│ │ [📷 Take Live Photo]  [🎥 Record Video]  [📁 Upload] │
│ │                                                  │ │
│ │ ⭐⭐⭐ Recommended: Use camera (faster review) │ │
│ └─────────────────────────────────────────────────┘ │
│                                                       │
│ [Submit Return Request]  [Cancel]                   │
└─────────────────────────────────────────────────────┘
```

---

## Option A: Photo Capture Flow

```
User clicks [📷 Take Live Photo]
                    ↓
    ┌───────────────────────────────┐
    │  BROWSER PERMISSION PROMPT     │
    │                               │
    │  "ANCRIO wants to access      │
    │   your camera"                │
    │                               │
    │  [Allow]  [Block]             │
    └───────────────────────────────┘
                    ↓
            User clicks [Allow]
                    ↓
┌─────────────────────────────────────┐
│       CAMERA CAPTURE MODAL           │
│                                      │
│    ╔═════════════════════════════╗  │
│    ║                             ║  │
│    ║     📷 LIVE CAMERA FEED    ║  │
│    ║     (Real video stream)     ║  │
│    ║                             ║  │
│    ║  < Press to see defect >    ║  │
│    ║                             ║  │
│    ╚═════════════════════════════╝  │
│                                      │
│          [📸 CAPTURE PHOTO]          │
│                                      │
│  ℹ️ Frame the defect clearly         │
│                                      │
│  [❌ Cancel & Close Camera]          │
└─────────────────────────────────────┘
                    ↓
    User positions phone, sees defect
                    ↓
        User clicks [📸 CAPTURE]
                    ↓
                    
    ✨ "Click!" - Photo captured
    
                    ↓
    Photo automatically added to preview
    Camera modal closes
                    ↓
┌─────────────────────────────────────┐
│    RETURN FORM (Updated)             │
│                                      │
│ [... Return reason, message ...]    │
│                                      │
│ Photos Captured:                    │
│ ┌──────┐ ┌──────┐ ┌─────────┐      │
│ │ 📸   │ │ 📸   │ │ + more  │      │
│ │      │ │      │ │         │      │
│ │Photo │ │Photo │ │ (take   │      │
│ │  1   │ │  2   │ │ more)   │      │
│ └──────┘ └──────┘ └─────────┘      │
│                                      │
│ ✓ 2 photos captured (minimum 1)     │
│                                      │
│ [Submit Return Request]  [Cancel]   │
└─────────────────────────────────────┘
                    ↓
    Can take more photos or submit
                    ↓
        User clicks [Submit]
                    ↓
    ✅ "Return request submitted with
        photo verification!
        Our team will review within 24h"
```

---

## Option B: Video Recording Flow

```
User clicks [🎥 Record Video]
                    ↓
    ┌───────────────────────────────┐
    │  BROWSER PERMISSION PROMPT     │
    │                               │
    │  "ANCRIO wants to access      │
    │   your camera and microphone" │
    │                               │
    │  [Allow]  [Block]             │
    └───────────────────────────────┘
                    ↓
            User clicks [Allow]
                    ↓
┌─────────────────────────────────────┐
│       VIDEO RECORDING MODAL          │
│                                      │
│    ╔═════════════════════════════╗  │
│    ║                             ║  │
│    ║  🎥 LIVE VIDEO STREAM      ║  │
│    ║  (Ready to record)          ║  │
│    ║                             ║  │
│    ║ < Explain what's wrong >    ║  │
│    ║                             ║  │
│    ╚═════════════════════════════╝  │
│                                      │
│  [⏹️ START RECORDING] (max 2 min)   │
│  REC: 00:00                          │
│                                      │
│  ℹ️ "Explain the defect clearly"    │
│                                      │
│  [❌ Cancel & Close Camera]          │
└─────────────────────────────────────┘
                    ↓
        User clicks [⏹️ START RECORD]
                    ↓
    🔴 Red recording indicator shows
    
                    ↓
    ┌─────────────────────────────┐
    │ 🔴 REC: 00:30              │
    │                             │
    │ ╔═══════════════════════╗  │
    │ ║                       ║  │
    │ ║   (video stream)      ║  │
    │ ║                       ║  │
    │ ║ "Screen is flickering │  │
    │ ║  on the right side"   ║  │
    │ ║ (User speaking)       ║  │
    │ ╚═══════════════════════╝  │
    │                             │
    │ [⏹️ STOP RECORDING]         │
    └─────────────────────────────┘
                    ↓
    User finishes explaining (45 sec)
                    ↓
        User clicks [⏹️ STOP]
                    ↓
        Video automatically saved
                    ↓
┌─────────────────────────────────────┐
│    RETURN FORM (Updated)             │
│                                      │
│ [... Return reason, message ...]    │
│                                      │
│ Video Evidence:                     │
│ ┌─────────────────────────────────┐│
│ │ 🎥 Video Recorded                ││
│ │ ╔──────────────────────────────╗││
│ │ ║  (video player)              ║││
│ │ ║   ▶️ Playing: 45 seconds    ║││
│ │ ║  [0:00 ─────●───── 0:45]   ║││
│ │ ║   Sound: 🔊 On              ║││
│ │ ╚──────────────────────────────╝││
│ │ [🗑️ Remove & Re-record]         ││
│ └─────────────────────────────────┘│
│                                      │
│ [Submit Return Request]  [Cancel]   │
└─────────────────────────────────────┘
                    ↓
        User clicks [Submit]
                    ↓
    ✅ "Return request submitted with
        live video evidence!
        Our team will review within 24h"
```

---

## Option C: File Upload Flow (Fallback)

```
User clicks [📁 Upload Files]
                    ↓
    File picker opens (traditional)
                    ↓
┌─────────────────────────────────────┐
│      CHOOSE FILES TO UPLOAD          │
│                                      │
│  📁 Photos and Videos               │
│  [Recent] [Documents] [Downloads]   │
│                                      │
│  Select files:                      │
│  ☑️ defect-photo-1.jpg              │
│  ☑️ defect-photo-2.png              │
│  ☐ other-file.doc                   │
│                                      │
│              [Open]                  │
└─────────────────────────────────────┘
                    ↓
        Files selected and added
                    ↓
┌─────────────────────────────────────┐
│    RETURN FORM (Updated)             │
│                                      │
│ [... Return reason, message ...]    │
│                                      │
│ Photos Captured:                    │
│ ┌──────┐ ┌──────┐                   │
│ │ 📸   │ │ 📸   │                   │
│ │      │ │      │                   │
│ │Photo │ │Photo │                   │
│ │  1   │ │  2   │                   │
│ └──────┘ └──────┘                   │
│                                      │
│ ✓ 2 photos uploaded                 │
│                                      │
│ [Submit Return Request]  [Cancel]   │
└─────────────────────────────────────┘
                    ↓
        User clicks [Submit]
                    ↓
    ✅ "Return request submitted!
        Our team will review within 24h"
```

---

## Admin Dashboard View

```
┌──────────────────────────────────────────────────────┐
│         ADMIN DASHBOARD - RETURN REQUESTS            │
│                                                       │
│ Filter: [All] [Pending] [Approved] [Rejected]       │
│ Sort: [Newest] [Oldest] [Verification Method]       │
│                                                       │
├──────────────────────────────────────────────────────┤
│                                                       │
│ Return Request: RET-1705315800000      [⭐ New]      │
│ ─────────────────────────────────────────────────    │
│ Customer: John Doe (john.doe@gmail.com)             │
│ Order: ORD-001234567 | Item: Samsung 65" TV         │
│ Type: Replacement | Reason: Defective               │
│                                                       │
│ 🎥 Verification Method: Live Camera (Photo + Video)│
│                                                       │
│ Photos (3 captured):                                 │
│ ┌────┐ ┌────┐ ┌────┐                               │
│ │ 📸 │ │ 📸 │ │ 📸 │  [👁️ View Full Gallery]      │
│ └────┘ └────┘ └────┘                               │
│                                                       │
│ Video Evidence (45 sec):                             │
│ ┌────────────────────────────────────┐             │
│ │ ▶️ Play | ↓ Download | 🔊 Volume  │             │
│ └────────────────────────────────────┘             │
│                                                       │
│ Status Timeline:                                     │
│ ✓ Submitted - 15 Jan 2025, 10:30 AM                │
│   "Replacement request with live photo verification" │
│ ⏳ Pending Admin Review                              │
│ ○ Approved/Rejected (pending)                       │
│ ○ Return Label Generated (pending)                  │
│ ○ Item Received (pending)                           │
│                                                       │
│ AI Risk Score: 🟢 Low Risk (89%)                     │
│ (AI assists but admin makes final decision)         │
│                                                       │
│ Customer Message:                                   │
│ "Screen has flickering on the right side. Started  │
│  after 2 days of use. Video shows issue clearly."  │
│                                                       │
│ Admin Notes:                                        │
│ [Add note here...]                                  │
│                                                       │
│ [✅ Approve] [❓ Request More Info] [❌ Reject]    │
│                                                       │
├──────────────────────────────────────────────────────┤
│ (More return requests below...)                     │
└──────────────────────────────────────────────────────┘
```

---

## Success Scenarios

### Scenario 1: Quick Photo Verification
```
⏱️ Timeline:
10:30 AM - Customer submits return with 2 photos
10:32 AM - Admin notification received
10:35 AM - Admin reviews photos, sees clear defect
10:40 AM - Admin approves replacement
10:42 AM - Return label sent to customer
10:50 AM - Customer receives label and ships item

Result: Verified & Processed in 20 minutes!
```

### Scenario 2: Detailed Video Evidence
```
⏱️ Timeline:
2:00 PM - Customer records 1-minute video showing defect
2:02 PM - Video saved, return submitted
2:05 PM - Admin gets notification
2:15 PM - Admin watches video, fully understands issue
2:20 PM - Admin approves with confidence
2:25 PM - Return label sent
2:30 PM - Customer ships item

Result: Confidence + Speed = Happy Customer!
```

### Scenario 3: Fallback File Upload
```
User's camera not working?
→ File upload still available
→ Same preview grid system
→ Same return process
→ Works on all devices

No friction, always accessible.
```

---

## Error Handling Scenarios

### Camera Permission Denied
```
❌ Message: "Camera access denied"
   "Please allow camera in browser settings"
   Settings → Privacy → Camera → Allow [website]

Action: User can still use file upload
```

### No Camera Device
```
❌ Message: "No camera found on device"
   "Try uploading photos from another device"

Action: File upload is alternative
```

### Unsupported Browser
```
Camera buttons hidden automatically
Only file upload option shown
No error message - graceful degradation
```

---

## Mobile UX

```
📱 iPhone/Android Screen:

┌──────────────────────────────┐
│    🔙  REQUEST RETURN        │
│                              │
│ Reason:                      │
│ [Defective ▼]               │
│                              │
│ Type:                        │
│ ◉ Refund  ○ Replace         │
│                              │
│ Message:                     │
│ [Flickering screen...]      │
│                              │
│ Verification:               │
│ [📷 Photo] [🎥 Video]       │
│ [📁 Files]                  │
│                              │
│ Photos: (0 captured)         │
│                              │
│ [SUBMIT]                     │
└──────────────────────────────┘
       ↓
   (Tap photo button)
       ↓
┌──────────────────────────────┐
│  📷 CAMERA (Full Screen)     │
│  ┌──────────────────────────┐│
│  │                          ││
│  │  (Video stream)          ││
│  │  Live camera feed        ││
│  │                          ││
│  │  (device camera view)    ││
│  │                          ││
│  └──────────────────────────┘│
│                              │
│  ──────────────────────────  │
│                              │
│     [📸] (tap to capture)    │
│                              │
│     ℹ️ Focus on defect       │
│                              │
│  [X] Close                   │
└──────────────────────────────┘
```

---

## Accessibility Features

✅ **Voice-Friendly**
- Video recording captures audio explanation
- Clear button labels
- Status messages announced

✅ **Touch-Friendly**
- Large tap targets (buttons 44px+)
- Clear visual feedback
- No complex gestures

✅ **Screen Reader Compatible**
- All buttons have aria-labels
- Status updates announced
- Form validation messages

---

## Performance Indicators

```
📊 Photo Capture:
   Speed: < 1 second
   Size: 40-100KB per photo
   Quality: JPEG 90% (excellent)

📊 Video Recording:
   Frame Rate: 24-30 FPS
   Resolution: Up to 1280x720
   Audio: Captured for explanation
   Max Duration: 2 minutes

📊 Submission:
   Speed: < 2 seconds
   Data Size: 200-500KB (photos)
            + 30-50MB (video)
   Validation: Real-time feedback
```

---

## What Customers Love

✨ **Speed:** Get approval in hours, not days
✨ **Clarity:** Photos/videos prove the issue
✨ **Fairness:** Admin sees exact condition
✨ **Trust:** Same system as Amazon
✨ **Convenience:** Use phone camera (no setup)

---

## Next Steps for User

```
1. ✅ Return request submitted
2. ⏳ Waiting for admin review (24 hours)
3. 📧 Notification when approved/rejected
4. 🏷️ Receive return label via email
5. 📦 Ship item back (prepaid label)
6. ✓ Return received
7. 💰 Refund processed (5-7 business days)
```

---

**Implementation Complete!** 🎉
Your return/replace process now offers Amazon-level verification.
