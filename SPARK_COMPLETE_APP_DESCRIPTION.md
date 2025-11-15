# Spark - Complete Application Description
## Comprehensive Documentation of All Functions and Connections

**Version:** 1.0
**Last Updated:** November 14, 2025
**Document Type:** Complete Technical & Functional Overview

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Platform Overview](#platform-overview)
3. [Core Features & Functions](#core-features--functions)
4. [Technical Architecture](#technical-architecture)
5. [User Flows & Interactions](#user-flows--interactions)
6. [Data Model & Relationships](#data-model--relationships)
7. [Security & Privacy Systems](#security--privacy-systems)
8. [Gamification & Engagement](#gamification--engagement)
9. [Business Model & Monetization](#business-model--monetization)
10. [Integration Points](#integration-points)
11. [Missing Components & Implementation Gaps](#missing-components--implementation-gaps)
12. [Appendices](#appendices)

---

## Executive Summary

**Spark** is a location-based event discovery and social connection platform that enables users to discover events happening nearby, connect with people through shared event interests, and meet in person safely through a privacy-preserving, gamified experience.

**Core Value Proposition:**
- **Event Discovery:** Find events happening now and soon in your area
- **Safe Connections:** Meet people through verified, event-based connections
- **Privacy-First:** Location privacy with differential privacy and k-anonymity
- **Gamified Experience:** Progressive user levels with increasing privileges
- **Real-Time Engagement:** Live heat maps showing event activity hotspots

**Target Market:**
- Primary: College students (18-24) on university campuses
- Secondary: Young professionals (25-34) in urban areas
- Tertiary: Event organizers and venue partners

**Competitive Position:**
- Snapchat Map + Eventbrite + Tinder verification
- Event-focused social discovery (not dating)
- Safety and verification as core features, not afterthoughts

---

## Platform Overview

### 1. Platform Architecture

Spark operates as a **mobile-first platform** with the following components:

**Client Applications:**
- iOS native app (React Native planned)
- Android native app (React Native planned)
- Web demo (HTML5/CSS3/JavaScript - currently implemented)

**Backend Services:**
- Node.js/Express API servers
- PostgreSQL database with PostGIS extension
- Redis cache for heat maps and real-time data
- WebSocket servers for real-time updates
- Kafka/Kinesis for event streaming

**Infrastructure:**
- AWS cloud hosting (ECS Fargate, Lambda, RDS)
- CloudFront CDN for map tile delivery
- S3 for static assets and user uploads
- ElastiCache for session management

### 2. User-Facing Components

The app consists of **4 primary screens** accessible via bottom navigation:

1. **Map Screen:** Real-time heat map showing event activity
2. **Discovery Screen:** Event card swiping interface
3. **Sparks Screen:** Event connections and RSVPs
4. **Profile Screen:** User settings, stats, and subscription management

Additionally:
- **Dynamic Island:** Contextual notifications and real-time updates
- **Floating Action Button (FAB):** Quick check-in functionality
- **Match Overlay:** Event connection confirmations
- **Location Permission Overlay:** Onboarding and privacy controls

---

## Core Features & Functions

### Feature 1: Real-Time Heat Map (Map Screen)

**Purpose:** Visualize where events and people are concentrated in real-time using privacy-preserving heat maps.

#### Components:

**A. Interactive Map (Leaflet.js + OpenStreetMap)**
- **Technology:** Leaflet.js library with OpenStreetMap tiles
- **Center Point:** Configurable (currently NYC: 40.7589, -73.9851)
- **Zoom Levels:** 1-19 (starts at level 13)
- **Features:**
  - Pan and zoom gestures
  - Smooth animations
  - Touch-optimized controls
  - Custom markers and overlays

**B. Heat Map Layer**
- **Visualization:** Color gradient showing activity density
  - Blue (0.0): Low activity
  - Cyan (0.3): Light activity
  - Lime (0.5): Moderate activity
  - Yellow (0.7): High activity
  - Red (1.0): Very high activity
- **Update Frequency:** Real-time (sub-5 second target)
- **Radius:** 25px blur with 35px spread
- **Privacy Protection:**
  - Differential privacy noise added to prevent individual tracking
  - K-anonymity requirement (minimum 3 users per zone)
  - 5-10 minute time delay on location updates
  - Aggregated data only, no individual tracking

**C. Venue Markers**
- **Display:** Custom emoji-based pins showing event venues
- **Color Coding:**
  - Red (#FF6B6B): Hot venues (high activity)
  - Yellow (#FFD93D): Warm venues (medium activity)
  - Green (#6BCF7F): Cool venues (lower activity)
- **Information Shown:**
  - Venue emoji (🎵, 🍔, 😂, etc.)
  - Venue name
  - Current people count
  - Neighborhood
- **Interaction:**
  - Click to view popup with details
  - Tap to trigger notification
  - Auto-fly to venue on check-in

**D. Location Services**
- **Permission System:**
  - Initial overlay requesting location access
  - Clear privacy explanation
  - "Enable Location" or "Maybe Later" options
  - Can be re-enabled from Profile settings
- **Multi-Signal Verification (Backend - Not Yet Implemented):**
  - GPS coordinates
  - WiFi SSID and signal strength
  - Bluetooth beacon detection
  - Cell tower triangulation
  - Cross-validation across all signals
- **Impossible Travel Detection:**
  - Validates user movement speed
  - Flags suspicious location jumps
  - Prevents spoofing and gaming

**E. Check-In System**
- **Trigger:** Floating Action Button (location pin icon)
- **Process:**
  1. User taps FAB
  2. System detects current location
  3. Matches to nearby venue
  4. Creates check-in record
  5. Awards points (+50 for check-in)
  6. Updates heat map data
  7. Notifies via Dynamic Island
  8. Flies map to venue location
- **Validation:**
  - Must be within venue geofence (100m radius)
  - Prevents duplicate check-ins (15-minute cooldown)
  - Impossible travel detection
  - Behavioral anomaly detection

#### Data Flow:

```
User Location → Multi-Signal Verification → Privacy Filter (Differential Privacy)
→ Aggregation (K-Anonymity) → Redis Cache → Heat Map Tiles → CDN → Client
```

#### Functions (map.js):

```javascript
Map.init()                    // Initialize Leaflet map and layers
Map.initMap()                 // Set up map instance with tiles
Map.renderHeatMap()           // Create heat layer from data
Map.renderVenueMarkers()      // Place venue pins on map
Map.enableLocation()          // Request and enable location services
Map.hideLocationOverlay()     // Dismiss location permission prompt
Map.checkIn()                 // Process venue check-in
enableLocation()              // Global wrapper for location enable
hideLocationOverlay()         // Global wrapper for overlay dismiss
checkIn()                     // Global wrapper for check-in
```

#### Database Tables Involved:

- `locations` - User location history (7-day retention)
- `venues` - Event venue information
- `check_ins` - User check-in records
- `heat_map_cache` - Pre-computed heat map tiles

#### Missing Implementation:

- Backend API for location updates
- Multi-signal verification system
- Differential privacy algorithm
- K-anonymity enforcement
- Real-time WebSocket updates
- Heat map tile generation service
- Geofencing validation
- Impossible travel detection

---

### Feature 2: Event Discovery (Discovery Screen)

**Purpose:** Enable users to discover events through an intuitive card-swiping interface, express interest levels, and find events that match their preferences.

#### Components:

**A. Event Cards**
- **Design:** Stacked card interface (Tinder-style)
- **Information Displayed:**
  - Event emoji (visual category identifier)
  - Event title (e.g., "Late Night Jazz Session")
  - Venue name and address
  - Distance from user (0.3 mi away)
  - Event time (Tonight 9:00 PM)
  - Social proof:
    - 🔥 Confirmed attendees count
    - 👀 Interested users count
  - Event description (1-2 sentences)
- **Visual Elements:**
  - Gradient background (category-coded)
  - Large emoji avatar
  - Card shadow for depth
  - Smooth animations

**B. User Actions (Gen Z UI Pattern)**

Three explicit actions per event:

1. **❌ Pass** (Swipe Left / Left Button)
   - User not interested
   - Card slides left and fades out
   - No record kept (privacy)
   - Next card appears
   - No penalty or consequences

2. **👀 Interested** (Swipe Right / Right Button)
   - User wants to know more
   - Saves event to "Interested" list
   - User added to event's interested count
   - Card slides right and fades out
   - Can upgrade to Confirmed later
   - Enables matching with other interested users

3. **🔥 Confirm** (Swipe Up / Middle Button)
   - User committed to attending
   - Saves event to "Confirmed" list
   - User added to event's confirmed count
   - Card slides up and fades out
   - Unlocks event connections
   - Shows user to other confirmed attendees
   - Can downgrade to Interested later

**C. Card Interaction Mechanics**

**Touch/Mouse Dragging:**
- **Start Drag:**
  - User presses on top card
  - Card gains "dragging" class
  - Records start position (X, Y)
  - Binds move and end listeners

- **During Drag:**
  - Card follows finger/cursor
  - Rotates based on horizontal distance (0.1 × deltaX)
  - Fades based on swipe distance (opacity = 1 - |deltaX| / 300)
  - Visual feedback for action intent

- **End Drag:**
  - If swiped beyond threshold (100px):
    - Left swipe → Pass
    - Right swipe → Interested
    - Execute corresponding action
  - If below threshold:
    - Snap back to center
    - Reset transform and opacity
  - Remove event listeners

**Button Tapping:**
- Direct action execution
- Same animations as swipe
- Bypasses drag mechanics

**D. Event Matching Algorithm (Backend - Not Implemented)**

The discovery feed is personalized using:

1. **Collaborative Filtering:**
   - "Users who liked X also liked Y"
   - Analyzes event preferences across user base
   - Finds similar taste profiles

2. **Content-Based Filtering:**
   - Event categories (music, food, sports, etc.)
   - Venue types (bars, clubs, galleries, outdoor)
   - Time preferences (morning, afternoon, evening, late night)
   - Distance preferences

3. **Social Graph Integration:**
   - Events friends are attending
   - Venues friends have checked into
   - Mutual connections attending

4. **Temporal Patterns:**
   - Historical attendance patterns
   - Day of week preferences
   - Seasonal interests

5. **Real-Time Factors:**
   - Current location
   - Current time of day
   - Weather conditions
   - Trending events

**E. Event Data Model**

Each event card represents:

```javascript
{
  id: "event_uuid",
  title: "Late Night Jazz Session",
  emoji: "🎵",
  venue: {
    name: "Blue Note NYC",
    address: "131 W 3rd St",
    neighborhood: "Greenwich Village",
    coordinates: {lat: 40.7305, lng: -74.0008}
  },
  time: {
    start: "2025-11-14T21:00:00Z",
    end: "2025-11-15T01:00:00Z",
    display: "Tonight 9:00 PM"
  },
  distance: 0.3,  // miles from user
  attendance: {
    confirmed: 45,
    interested: 12
  },
  description: "Intimate jazz quartet featuring local legends...",
  category: "music",
  gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  verified: true,
  creator_id: "venue_uuid"
}
```

#### Data Flow:

```
User Profile → Matching Algorithm → Event Ranking → Card Stack Generation
→ User Action → Update Event Stats → Update User Preferences → Re-rank Remaining Cards
```

#### Functions (discovery.js):

```javascript
Discovery.init()              // Initialize card stack and listeners
Discovery.interestedEvent()   // Mark event as interested (👀)
Discovery.passEvent()         // Pass on event (❌)
Discovery.confirmEvent()      // Confirm attendance (🔥)
Discovery.removeCard()        // Remove top card from stack
Discovery.showConfirmation()  // Show event saved notification
Discovery.closeMatch()        // Dismiss match overlay
Discovery.initCardDragging()  // Set up drag listeners on top card
Discovery.startDrag(e)        // Begin drag interaction
Discovery.drag(e)             // Handle drag movement
Discovery.endDrag(e)          // Complete drag and execute action

// Legacy compatibility functions
Discovery.likeCard()          // Alias for interestedEvent
Discovery.rejectCard()        // Alias for passEvent
Discovery.superLikeCard()     // Alias for confirmEvent

// Global wrapper functions
interestedEvent()
passEvent()
confirmEvent()
closeMatch()
```

#### Database Tables Involved:

- `events` - Event information and metadata
- `event_attendees` - User RSVPs (interested/confirmed)
- `user_event_interactions` - Swipe history and preferences
- `event_recommendations` - Pre-computed suggestions

#### Missing Implementation:

- Backend event creation API
- Event discovery algorithm (collaborative + content filtering)
- Real-time attendance count updates
- Event RSVP management system
- Event search and filters
- Event categories and tags
- Event verification system
- Venue partnership integration
- Event editing and cancellation
- No-show tracking and penalties

---

### Feature 3: Event Connections (Sparks Screen)

**Purpose:** Manage event-based social connections, track RSVPs, and facilitate meetups with other attendees.

#### Components:

**A. Event RSVP Statistics**

Dashboard showing user's event engagement:

1. **🔥 Confirmed:** Events user committed to attending (count: 7)
2. **👀 Interested:** Events user marked as interested (count: 12)
3. **Attended:** Events user actually attended (count: 3)

**Metrics Tracked:**
- Total confirmed events
- Total interested events
- Attended/confirmed ratio (attendance rate)
- No-show rate
- Event categories preferred
- Connection success rate

**B. Event Connection Requests**

List of connection requests from other users attending the same events:

**Connection Request Card Contains:**
- **User Avatar:** Emoji representation
- **User Name:** Display name
- **Event Context:** Which event connects you
- **Message Preview:** User's introduction message
- **Timestamp:** When request was sent
- **Mutual Status:** Both confirmed (🔥) or also interested (👀)

**Example Connection:**
```
👨‍🎤 Alex Thompson • Jazz Session
"Also going to Late Night Jazz! Want to grab drinks before?"
2 minutes ago • Both confirmed 🔥

[Accept] [Decline]
```

**C. Connection Actions**

**Accept:**
- Creates bidirectional connection
- Opens messaging channel (24-hour expiration)
- Shares temporary location (2 hours after event start)
- Adds to active connections list
- Awards +25 connection points
- Enables real-time chat
- Card slides right and fades out
- Decrements notification badge

**Decline:**
- Removes connection request
- No notification to requester (privacy)
- No penalty for either party
- Card slides left and fades out
- Decrements notification badge

**D. Spark Messaging System (Not Yet Implemented)**

Once a connection is accepted:

**Channel Properties:**
- **Duration:** 24 hours from acceptance
- **Auto-Delete:** Messages delete after 24 hours
- **Location Sharing:** Optional, 2-hour window post-event
- **Media:** Text, photos, event details only
- **Safety:** Report and block buttons always visible
- **Panic Integration:** Links to safety system

**Message Types:**
- Text messages (500 char limit)
- Event confirmation ("See you there!")
- Meeting point suggestions
- Time coordination
- Group size ("Coming with 2 friends")
- Post-event feedback

**E. Connection Matching Logic (Backend - Not Implemented)**

**Matching Criteria:**
1. **Mutual Event Interest:**
   - Both users confirmed (🔥) for same event → High priority match
   - Both users interested (👀) for same event → Medium priority match
   - One confirmed, one interested → Lower priority match

2. **Compatibility Factors:**
   - Similar event attendance history
   - Overlapping interests (event categories)
   - Similar user levels (Ghost, Explorer, Connector, Ambassador)
   - Proximity to venue
   - Mutual friend connections

3. **Safety Filters:**
   - Trust score minimums (both users >100)
   - Report history (no active flags)
   - Behavioral anomaly checks
   - Age verification confirmed
   - SafeMode compatibility

4. **Timing:**
   - Event start time proximity
   - Recent check-ins at same venues
   - Online status (active vs. offline)

**F. Double Opt-In System**

Critical safety feature ensuring both parties consent:

**Process:**
1. User A confirms event attendance (🔥)
2. System finds User B also confirmed
3. User A can send connection request
4. User B receives request in Sparks screen
5. User B must actively accept
6. Only then is messaging channel opened
7. Both users notified of acceptance

**Rate Limits (By User Level):**
- **Ghost (0-99 pts):** 3 sparks/day
- **Explorer (100-499 pts):** 10 sparks/day
- **Connector (500-1999 pts):** Unlimited sparks
- **Ambassador (2000+ pts):** Unlimited + VIP features

**G. Empty State**

When no connection requests exist:
```
✨
No New Sparks
Check back later for new connections!
```

#### Data Flow:

```
Event RSVP (User A) → Event RSVP (User B) → Matching Algorithm
→ Connection Suggestion → User B's Sparks Screen → Accept/Decline
→ Messaging Channel Creation → Temporary Location Sharing → Auto-Delete (24hrs)
```

#### Functions (sparks.js):

```javascript
Sparks.init()                 // Initialize stats and listeners
Sparks.attachEventListeners() // Bind accept/decline buttons
Sparks.updateStats()          // Refresh RSVP counts
Sparks.acceptSpark(element)   // Accept connection request
Sparks.declineSpark(element)  // Decline connection request
Sparks.updateSparkCount()     // Update notification badge
Sparks.checkEmptyState()      // Show empty state if no requests

// Global wrapper functions
acceptSpark(button)
declineSpark(button)
```

#### Database Tables Involved:

- `spark_requests` - Pending connection requests
- `spark_connections` - Active connections
- `spark_messages` - Chat messages (24-hour TTL)
- `event_attendees` - RSVP status for matching
- `user_stats` - Confirmed/interested/attended counts

#### Missing Implementation:

- Backend matching algorithm
- Connection request generation
- Real-time notification system
- Messaging infrastructure
- Temporary location sharing
- 24-hour message auto-delete
- Spark rate limiting by user level
- Connection analytics
- Block and report functionality
- Group event connections (3+ people)

---

### Feature 4: User Profile & Settings (Profile Screen)

**Purpose:** User account management, privacy controls, safety settings, subscription management, and gamification progress tracking.

#### Components:

**A. User Profile Header**

Displays:
- **Profile Avatar:** Emoji representation (🦸‍♂️)
- **Display Name:** User's chosen name
- **User Level Badge:** Current tier and points
  - Example: "⭐ Connector • 750 pts"
  - Levels: Ghost → Explorer → Connector → Ambassador

**B. Profile Statistics**

Three key metrics showcasing event activity:

1. **Events Attended:** Total events user has checked into (28)
2. **Connections Made:** Total accepted sparks (156)
3. **Confirmed Upcoming:** Events user committed to attending (42)

**Additional Hidden Stats (Backend):**
- Trust score (0-1000 scale)
- Attendance rate (attended / confirmed)
- Connection success rate
- Average rating from other users
- Reports received (mod flag if >5)
- Account age
- Verification level

**C. Premium Subscription Banner**

**Spark Elite Tier ($19.99/month):**
- **Unlimited Sparks:** No daily connection limits
- **See Who Likes You:** View interested users before matching
- **Priority Visibility:** Appear higher in discovery feed
- **Advanced Filters:** Age, distance, event type filters
- **Rewind Feature:** Undo accidental passes
- **Boost:** 10x profile visibility for 30 minutes
- **Read Receipts:** See when messages are read
- **Exclusive Events:** Access to partner-only events

**Call-to-Action:**
- "Get Elite for $19.99/mo" button
- Links to payment/subscription flow

**D. Privacy Settings**

Control over location and visibility:

1. **Share Exact Location**
   - Toggle: OFF by default
   - When OFF: 500m radius precision
   - When ON: Exact GPS coordinates shared with connections
   - Requires mutual opt-in even when enabled

2. **Show Online Status**
   - Toggle: ON by default
   - When ON: Green dot on profile
   - When OFF: Appears offline to all users
   - Last seen time still visible to active connections

3. **Auto-Accept Verified Users**
   - Toggle: OFF by default
   - When ON: Auto-accepts sparks from highly verified users
   - Criteria: Trust score >800, ID verified, no reports
   - User still notified of acceptance

**E. Safety Settings**

Core safety features:

1. **Enable SafeMode**
   - Toggle: ON by default for new users
   - Auto-enabled for trust_score <100
   - Features:
     - Restricts connections to verified users only
     - Hides exact location (500m precision max)
     - Disables profile photo uploads
     - Requires mutual friend for spark requests
     - Enables stricter content moderation

2. **🚨 Panic Button**
   - Red background, prominent placement
   - Always accessible from any screen
   - When activated:
     - Immediately hides user's location
     - Pauses all active connections
     - Notifies trusted contacts
     - Sends alert to 24/7 support team
     - Logs incident with full context
     - Optional: Calls emergency services (911)
     - Optional: Records audio/photo evidence

**F. Additional Settings (Not Shown in Demo)**

- **Notification Preferences:** Push, email, SMS toggles
- **Blocked Users:** List of blocked profiles
- **Trusted Contacts:** Emergency contact list
- **Verification:** Phone, email, ID, social account status
- **Account Management:** Delete account, download data (GDPR)
- **Help & Support:** FAQ, contact support, report issue
- **Legal:** Terms of service, privacy policy

**G. Gamification Progress (User Levels)**

**Level 1: Ghost (0-99 points)**
- **Restrictions:**
  - 3 sparks per day maximum
  - 1km² location precision
  - Basic event discovery (10 cards/day)
  - No event creation
  - SafeMode mandatory
- **Goal:** Build initial trust through event attendance

**Level 2: Explorer (100-499 points)**
- **Unlocks:**
  - 10 sparks per day
  - 500m radius location precision
  - 50 event cards per day
  - Profile photo upload
  - Basic filters (distance, time)
- **Goal:** Establish consistent engagement

**Level 3: Connector (500-1999 points)**
- **Unlocks:**
  - Unlimited sparks
  - 100m radius location precision
  - Unlimited event discovery
  - Event creation ability
  - Advanced filters
  - See who viewed profile
- **Goal:** Become community contributor

**Level 4: Ambassador (2000+ points)**
- **Unlocks:**
  - Exact location sharing (opt-in)
  - VIP badge on profile
  - Priority in discovery feed
  - Moderation tools (report review)
  - Host verified events
  - Venue partnership opportunities
  - Revenue sharing on events

**Point Earning System:**
- Event check-in: +50 points
- Event attendance confirmation: +100 points
- Creating an event: +25 points
- Event has 10+ attendees: +50 bonus
- Accepted spark connection: +25 points
- Received 5-star rating: +10 points
- Refer a friend who signs up: +100 points
- Complete profile verification: +50 points
- Daily login: +5 points
- Post event review: +10 points

**Daily Caps (Anti-Gaming):**
- Max 200 points per day from any source
- Diminishing returns on repeated actions
- Impossible travel detection prevents fake check-ins
- Behavioral anomaly flags suspicious point farming

#### Data Flow:

```
User Actions → Points Calculation → Level Progression Check → Unlock Features
→ Update Profile Stats → Display in UI
```

#### Functions (profile.js):

```javascript
Profile.init()                // Initialize profile module
Profile.toggleSetting(toggle) // Toggle privacy/safety settings

// Global wrapper function
toggleSetting(toggle)
```

#### Database Tables Involved:

- `users` - User account information
- `user_stats` - Events attended, connections, etc.
- `user_settings` - Privacy and notification preferences
- `user_levels` - Current level, points, progression
- `subscriptions` - Premium tier status
- `trusted_contacts` - Emergency contact list
- `blocked_users` - Block list

#### Missing Implementation:

- Backend user management API
- Points calculation engine
- Level progression system
- Subscription payment processing (Stripe integration)
- Panic button backend (alert system, contact notification)
- SafeMode enforcement logic
- Verification system (phone, email, ID, social)
- Account deletion and GDPR compliance
- Admin moderation dashboard
- Reporting and blocking functionality

---

### Feature 5: Dynamic Island & Notifications (UI System)

**Purpose:** Provide contextual, non-intrusive notifications and real-time updates using the iPhone's Dynamic Island interface.

#### Components:

**A. Dynamic Island States**

**Collapsed State (Default):**
- Pill-shaped, minimal footprint
- Shows subtle icon or animation
- Does not block content
- Click to expand

**Expanded State (Active):**
- Larger surface area
- Displays full notification content
- Icon + message + optional actions
- Auto-collapses after 3 seconds
- Can be manually dismissed

**B. Notification Types**

1. **Event Notifications:**
   - "3 Hot Events Tonight! Jazz, Comedy & Food Festival nearby"
   - Event start reminders
   - Event updates or cancellations
   - New events near you

2. **Action Confirmations:**
   - "Event saved! 🔥"
   - "Location enabled! You're now visible on the map in NYC 🗽"
   - "Checked in at Blue Note NYC 🎵 +50 points earned 🎉"

3. **Connection Notifications:**
   - "Event connection accepted! You can now chat 💬"
   - "New spark request from Alex for Jazz Session"
   - "3 new event connections waiting"

4. **Safety Alerts:**
   - "Panic button activated - contacts notified"
   - "Suspicious activity detected - review required"
   - "Trust score increased to 500"

5. **System Messages:**
   - "Viewing Blue Note NYC 🎵"
   - Settings changed confirmations
   - Points earned updates

**C. Animation System**

**Expand Animation:**
- Width: 140px → 280px
- Height: 37px → 70px
- Border radius: 18px → 20px
- Opacity: 0.95 → 1.0
- Duration: 300ms
- Easing: cubic-bezier(0.4, 0, 0.2, 1)

**Collapse Animation:**
- Reverse of expand
- 300ms duration
- Auto-triggers after 3 seconds
- Can be interrupted by new notification

**Content Fade:**
- Old content fades out (100ms)
- New content fades in (200ms)
- Smooth transition between notifications

**D. Interaction**

**Click Behavior:**
- If collapsed: Expand and hold for 3 seconds
- If expanded: Collapse immediately
- If notification pending: Open relevant screen

**Auto-Dismiss:**
- Expands automatically on notification
- Displays for 3 seconds
- Collapses automatically
- Queue system for multiple notifications

#### Data Flow:

```
Event Trigger → UI.showNotification(message) → Expand Dynamic Island
→ Display Message → Wait 3 Seconds → Collapse → Reset Content
```

#### Functions (ui.js):

```javascript
UI.init()                     // Initialize UI module and listeners
UI.initDynamicIsland()        // Set up click handlers
UI.showNotification(message)  // Display notification with message
UI.expandDynamicIsland()      // Expand animation
UI.collapseDynamicIsland()    // Collapse animation
UI.showLoading()              // Show loading spinner
UI.hideLoading()              // Hide loading spinner
```

#### Integration Points:

**Triggered by:**
- Map.checkIn() → Check-in confirmation
- Map.enableLocation() → Location enabled
- Discovery.confirmEvent() → Event saved
- Sparks.acceptSpark() → Connection accepted
- Profile.toggleSetting() → Setting changed
- Navigation.switchScreen() → Screen transitions

**Real-Time Updates (Backend WebSocket):**
- New spark requests
- Event start reminders (15 min before)
- Connection messages received
- Trust score changes
- Point milestones reached
- Safety alerts

#### Missing Implementation:

- WebSocket connection for real-time updates
- Notification queue management
- Notification history log
- Custom notification sounds
- Haptic feedback integration
- Rich notifications (images, actions)
- Notification preferences (by type)

---

### Feature 6: Authentication & Verification (Not Yet Implemented)

**Purpose:** Ensure user identity, build trust scores, and prevent fake accounts and abuse.

#### Components:

**A. Multi-Tier Verification System**

**Tier 1: Basic (Required for All Users)**
- Phone number verification via SMS code
- Email verification via link
- Age confirmation (18+ only)
- Terms of service acceptance

**Tier 2: Social Accounts (Optional, +50 trust points each)**
- Facebook account linking
- Instagram account linking
- LinkedIn account linking
- Google account linking
- Cross-reference:
  - Account age (must be >6 months old)
  - Friend/follower count (min 50)
  - Post history (must have activity)
  - Profile photo consistency

**Tier 3: ID Verification (Optional, +200 trust points)**
- Government-issued photo ID
- Automated verification via third-party service (e.g., Onfido, Jumio)
- Checks:
  - ID authenticity
  - Photo match to selfie
  - Age verification
  - Name verification
- Privacy: ID data not stored, only verification status

**Tier 4: Advanced Verification (Optional, +100 trust points)**
- Video selfie with random gestures (anti-deepfake)
- University email verification (.edu)
- Employment verification (corporate email)
- Social vouching (3+ verified friends)

**B. Trust Score Calculation (0-1000 scale)**

**Starting Score:** 0 points (Ghost level)

**Positive Factors:**
- Phone verification: +50
- Email verification: +25
- Each social account: +50
- ID verification: +200
- University email: +100
- Events attended: +10 per event (max +300)
- 5-star ratings received: +5 per rating
- Account age: +10 per month (max +100)
- Successful connections: +2 per connection (max +100)
- Zero reports: +50 bonus

**Negative Factors:**
- Report received: -50 per report
- Fake check-in detected: -100
- Spam behavior: -75
- No-show pattern (3+ no-shows): -50
- Suspicious location jumps: -25
- Failed verification attempt: -25

**Score Ranges:**
- 0-99: Ghost (high restrictions)
- 100-499: Explorer (basic access)
- 500-1000: Connector/Ambassador (full access)

**C. Behavioral Anomaly Detection**

**Monitored Patterns:**
- Check-in frequency (too many in short time)
- Location velocity (impossible travel)
- Spark request volume (spam indicator)
- Message content (harassment, solicitation)
- Event creation (spam events)
- Report patterns (serial reporter)

**Anomaly Actions:**
- Minor: Warning notification
- Moderate: Temporary feature restriction
- Severe: Account suspension pending review
- Critical: Immediate ban + law enforcement notification

#### Database Tables Involved:

- `users` - Account credentials
- `user_verifications` - Verification status by tier
- `trust_scores` - Current score and history
- `behavioral_logs` - Actions for anomaly detection
- `reports` - User-submitted reports

#### Missing Implementation:

- Complete authentication system (signup, login, password reset)
- Phone and email verification services
- Social OAuth integration (Facebook, Google, etc.)
- ID verification service integration
- Trust score calculation engine
- Behavioral anomaly detection ML model
- Automated moderation system
- Manual review queue for flagged accounts
- Account recovery process

---

### Feature 7: Safety System (Partially Implemented)

**Purpose:** Protect users from harassment, stalking, and dangerous situations through proactive and reactive safety measures.

#### Components:

**A. Panic Button**

**Trigger:** Red "🚨 Panic Button" in Profile → Safety settings

**Immediate Actions (all within 1 second):**
1. Hide user's location from all users
2. Pause all active spark connections
3. Stop sharing location data
4. Clear user from heat map
5. Set profile to invisible mode

**Notifications Sent:**
1. **Trusted Contacts:**
   - SMS with last known location
   - "Emergency alert from [User Name]"
   - Link to real-time location (2-hour window)
   - Timestamp of activation

2. **24/7 Support Team:**
   - Alert in moderation dashboard
   - Full user context (location, active connections, recent events)
   - Flagged as high-priority incident
   - Automated callback initiated

3. **Optional Actions:**
   - Call 911 (user confirms intent)
   - Audio recording starts
   - Photo evidence capture
   - Share location with emergency services

**B. Community Reporting**

**Report Types:**
- Harassment
- Inappropriate content
- Fake profile
- Spam
- Underage user
- Safety concern
- Other (with description)

**Report Process:**
1. User selects "Report" on profile or message
2. Choose category and provide details
3. Optional: Block user immediately
4. Submitted to moderation queue
5. Reporter notified of receipt
6. 24-hour review SLA

**Auto-Moderation Thresholds:**
- 3 reports: Automated warning message
- 5 reports: Temporary suspension (24 hours)
- 10 reports: Account disabled pending manual review
- Repeated offenses: Permanent ban

**C. Trusted Contacts**

**Setup:**
- Add up to 5 emergency contacts
- Must verify phone numbers
- Contacts notified they've been added
- Test alert feature available

**Auto-Notifications:**
- Panic button activation
- Suspicious location change detected
- User hasn't checked in during event (welfare check)
- Account flagged for unusual activity

**D. Location Privacy Layers**

**Layer 1: Time Delay**
- All location updates delayed 5-10 minutes
- Prevents real-time stalking
- Exceptions: Active spark connections (with consent)

**Layer 2: K-Anonymity**
- Heat map zones require minimum 3 users
- Individual tracking impossible
- Aggregated data only

**Layer 3: Differential Privacy**
- Random noise added to all location data
- Calibrated to prevent identification
- Statistical accuracy maintained

**Layer 4: Precision Control**
- Ghost users: 1km² zones only
- Explorer users: 500m radius
- Connector users: 100m radius
- Ambassador users: Exact location (opt-in, mutual consent)

**E. SafeMode (Auto-Enabled for New Users)**

**Restrictions Enforced:**
- Only verified users (trust >100) can send sparks
- Exact location disabled (500m max precision)
- Profile photo uploads restricted
- Requires mutual friend for connections
- Stricter content filtering on messages
- Limited to public events only

**Disable Criteria:**
- Trust score reaches 100+
- Account age >30 days
- Manual toggle by user

**F. Impossible Travel Detection**

**Calculation:**
```
distance = haversine(location1, location2)
time_diff = timestamp2 - timestamp1
max_speed = 120 mph (driving + generous buffer)

if (distance / time_diff) > max_speed:
  flag_as_suspicious()
```

**Actions:**
- Reject suspicious location update
- Log incident for review
- Deduct trust score points
- Notify user of rejection
- Pattern detection: 3+ incidents = temporary ban

#### Database Tables Involved:

- `panic_activations` - Panic button logs
- `reports` - User reports
- `trusted_contacts` - Emergency contact list
- `safety_logs` - All safety-related events
- `suspicious_activity` - Flagged behaviors

#### Missing Implementation:

- Panic button backend infrastructure
- 24/7 support team dashboard and workflow
- SMS/call service for trusted contact alerts
- Emergency services integration (911 API)
- Audio/photo evidence capture and storage
- Automated moderation ML model
- Manual review queue interface
- Report investigation workflow
- Trust score integration with safety features
- Real-time location monitoring for anomalies

---

## Technical Architecture

### 1. Frontend Architecture

**Current Implementation (Demo):**
- **Framework:** Vanilla JavaScript (ES6+)
- **Map Library:** Leaflet.js with OpenStreetMap tiles
- **Heat Map:** Leaflet.heat plugin
- **Icons:** Font Awesome 6.4.0
- **Structure:** Modular JavaScript (7 files)
- **Styling:** Modular CSS (5 files)
- **No Build Process:** 100% static HTML5

**Planned Production:**
- **Framework:** React Native (iOS + Android)
- **State Management:** Redux or Context API
- **Navigation:** React Navigation
- **Maps:** Mapbox SDK or Google Maps SDK
- **Real-Time:** Socket.io-client
- **Push Notifications:** Firebase Cloud Messaging
- **Analytics:** Mixpanel or Amplitude
- **Error Tracking:** Sentry

**JavaScript Modules:**

1. **app.js** - Main initialization, global state, real-time updates
2. **navigation.js** - Screen switching, tab management, status bar
3. **map.js** - Leaflet map, heat layers, markers, location services
4. **discovery.js** - Card swiping, event interactions, drag/drop
5. **sparks.js** - Connection management, RSVP tracking
6. **profile.js** - Settings toggles, user preferences
7. **ui.js** - Dynamic Island, notifications, loading states

**CSS Modules:**

1. **base.css** - Global styles, resets, body, gradients
2. **iphone.css** - iPhone frame, Dynamic Island, status bar
3. **components.css** - Buttons, cards, badges, toggles
4. **screens.css** - Screen-specific layouts (map, discovery, sparks, profile)
5. **animations.css** - Keyframe animations (@keyframes)

### 2. Backend Architecture (Planned - Not Implemented)

**API Layer:**
```
Node.js/Express REST API + WebSocket Servers
├── Authentication Service (JWT)
├── User Service (profiles, settings, levels)
├── Event Service (CRUD, discovery, recommendations)
├── Location Service (tracking, heat maps, privacy)
├── Spark Service (connections, messaging, matching)
├── Safety Service (panic, reports, moderation)
├── Payment Service (subscriptions, billing)
└── Analytics Service (tracking, insights)
```

**Database Layer:**
```
PostgreSQL with PostGIS Extension
├── users
├── user_verifications
├── user_settings
├── user_stats
├── trust_scores
├── events
├── event_attendees
├── locations (partitioned by date, 7-day retention)
├── heat_map_cache (Redis-backed)
├── venues
├── check_ins
├── spark_requests
├── spark_connections
├── spark_messages (TTL: 24 hours)
├── reports
├── panic_activations
├── trusted_contacts
├── subscriptions
└── audit_logs
```

**Caching Layer:**
```
Redis
├── Session storage (user tokens)
├── Heat map tiles (60s TTL)
├── User profiles (5min TTL)
├── Event recommendations (10min TTL)
├── Real-time location data (10min rolling window)
└── Rate limiting counters
```

**Message Queue:**
```
Kafka / AWS Kinesis
├── Location update stream
├── Event creation stream
├── Spark request stream
├── Safety alert stream
└── Analytics event stream
```

**Real-Time Layer:**
```
WebSocket Server (Socket.io)
├── Location updates
├── Heat map updates
├── Spark notifications
├── Chat messages
├── Event updates
└── Safety alerts
```

### 3. Infrastructure (Planned)

**AWS Services:**
- **Compute:** ECS Fargate (containerized APIs), Lambda (event processing)
- **Database:** RDS PostgreSQL with PostGIS, ElastiCache Redis
- **Storage:** S3 (user uploads, static assets)
- **CDN:** CloudFront (heat map tiles, images)
- **Messaging:** Kinesis Data Streams
- **Monitoring:** CloudWatch, X-Ray
- **Security:** WAF, Secrets Manager, IAM

**Deployment:**
```
Docker Containers
├── API Server (Node.js/Express)
├── WebSocket Server (Socket.io)
├── Heat Map Tile Generator
├── Event Recommendation Engine
├── Matching Algorithm Service
└── Moderation Service
```

**Performance Targets:**
- 100K concurrent users
- 10K location updates per second
- API response time p99: 200ms
- 50K WebSocket connections
- Heat map tile generation: <50ms

### 4. Data Flow Examples

**Event Discovery Flow:**
```
Mobile App → GET /api/v1/events/discover?lat=40.75&lng=-73.98
  ↓
API Server checks auth token
  ↓
Fetch user preferences from cache/DB
  ↓
Run recommendation algorithm (Redis-cached if recent)
  ↓
Fetch event details from DB
  ↓
Rank and filter events
  ↓
Return top 50 events as JSON
  ↓
Mobile App renders card stack
```

**Location Update Flow:**
```
Mobile App (background) → GPS + WiFi + Bluetooth signals
  ↓
Multi-signal verification on device
  ↓
POST /api/v1/location with encrypted payload
  ↓
API Server validates auth and impossible travel
  ↓
Apply differential privacy noise
  ↓
Insert into locations table (partitioned)
  ↓
Stream to Kinesis for heat map aggregation
  ↓
Heat Map Service consumes stream
  ↓
Aggregate with k-anonymity (min 3 users)
  ↓
Generate tile images
  ↓
Upload to S3, invalidate CloudFront cache
  ↓
WebSocket broadcast to clients in viewport
  ↓
Mobile App updates heat layer
```

**Spark Matching Flow:**
```
User A confirms event → POST /api/v1/events/{id}/rsvp
  ↓
Insert into event_attendees (user_id, event_id, status='confirmed')
  ↓
Trigger matching algorithm for this event
  ↓
Query all confirmed attendees
  ↓
Calculate compatibility scores
  ↓
Filter by safety rules (trust scores, blocked users)
  ↓
Generate spark suggestions
  ↓
Insert into spark_requests table
  ↓
Send push notification to matched users
  ↓
WebSocket broadcast to online users
  ↓
User B sees request in Sparks screen
```

---

## User Flows & Interactions

### Flow 1: First-Time User Onboarding

**Steps:**

1. **Download & Install:**
   - User downloads Spark from App Store / Google Play
   - Opens app for first time

2. **Account Creation:**
   - Phone number entry
   - SMS verification code
   - Email entry
   - Email verification link (sent to inbox)
   - Age confirmation (18+ required)
   - Terms of service acceptance

3. **Profile Setup:**
   - Display name
   - Profile emoji selection
   - Basic interests (select 5+ event categories)
   - Optional: Profile photo upload
   - Optional: Bio (500 chars)

4. **Location Permission:**
   - Permission request dialog
   - Educational screen explaining privacy
   - User grants location access (or defers)

5. **Guided Tour:**
   - Map screen: "Discover hot spots near you"
   - Discovery screen: "Swipe to find events"
   - Sparks screen: "Connect with fellow attendees"
   - Profile screen: "Track your progress"

6. **First Event Discovery:**
   - User lands on Discovery screen
   - Sees 10 curated events based on location
   - Tutorial overlay: "Swipe right to show interest"
   - User swipes on first card
   - Celebration animation

7. **Trust Score Initialization:**
   - Starting trust score: 75 (phone + email verified)
   - Ghost level (0-99 points)
   - Notification: "Attend events to level up!"

**Time to Complete:** 3-5 minutes
**Drop-off Points:** Phone verification (30%), location permission (20%)

### Flow 2: Discovering and Confirming an Event

**Steps:**

1. **Browse Events:**
   - User opens app → Discovery screen
   - Sees personalized event stack
   - Reads first event card details

2. **Evaluate Event:**
   - Checks distance (0.3 mi away)
   - Checks time (Tonight 9:00 PM)
   - Reads description
   - Notes social proof (🔥 45 confirmed)

3. **Express Interest:**
   - User swipes right OR taps 👀 button
   - Card slides off screen
   - Dynamic Island notification: "Event saved! 👀"
   - Event added to "Interested" list
   - Next card appears

4. **Upgrade to Confirmed (Later):**
   - User revisits event in Sparks screen
   - Changes status from 👀 to 🔥
   - Dynamic Island: "You're confirmed! 🔥"
   - User now visible to other confirmed attendees
   - Matching algorithm activated

5. **Receive Connection Requests:**
   - Other users see user in their match suggestions
   - User receives spark request notification
   - Badge appears on Sparks tab (3 new)

6. **Accept Connection:**
   - User opens Sparks screen
   - Reviews request from Alex Thompson
   - Reads message: "Want to grab drinks before?"
   - Taps "Accept"
   - Messaging channel opens
   - Dynamic Island: "You can now chat 💬"

7. **Coordinate Meetup:**
   - Users chat about meeting point
   - Share arrival times
   - Optionally share temporary location (2hr window)

8. **Attend Event:**
   - User arrives at venue
   - Opens app → Map screen
   - Taps Floating Action Button (check-in)
   - System validates location (geofence)
   - Dynamic Island: "Checked in at Blue Note NYC 🎵 +50 pts"
   - User attends event with new connection

9. **Post-Event:**
   - Auto-prompt: "How was Late Night Jazz Session?"
   - 5-star rating + optional review
   - Connection invited to stay in touch (upgrade from temp to permanent)
   - +100 points for confirmed attendance
   - Trust score increases

**Time to Complete:**
- Discovery to RSVP: 30 seconds
- RSVP to connection: 5-30 minutes
- Connection to attendance: 2-6 hours (event time)

**Success Metrics:**
- 40% of discovered events → interested/confirmed
- 60% of confirmed → actual attendance
- 30% of connections → post-event continued connection

### Flow 3: Exploring the Heat Map

**Steps:**

1. **Open Map Screen:**
   - User taps Map tab in bottom nav
   - Map loads centered on NYC (or user's city)
   - Heat layer renders showing activity density

2. **Understand Heat Map:**
   - Blue zones: Low activity
   - Yellow zones: Medium activity
   - Red zones: High activity (hot spots)
   - User pans around to explore

3. **Discover Venue:**
   - User sees emoji marker (🎵) in red zone
   - Taps marker
   - Popup shows: "Blue Note NYC • 45 people • Greenwich Village"

4. **View Venue Details:**
   - User wants more info
   - Taps popup
   - Modal shows:
     - Current events at venue
     - Who's there (mutual friends highlighted)
     - Venue rating and reviews
     - Distance and directions

5. **Check In:**
   - User arrives at Blue Note
   - Taps Floating Action Button
   - System validates location:
     - GPS within 100m geofence
     - WiFi matches venue SSID (if available)
     - Not impossible travel from last location
   - Check-in confirmed
   - +50 points awarded
   - User added to venue's people count
   - Heat map updates (contributes to red zone)

6. **View Updated Heat:**
   - User sees heat map refresh
   - Venue marker now shows "46 people"
   - Red zone intensity slightly increased

**Time to Complete:** 2-5 minutes
**Engagement Metric:** 70% of map viewers tap at least 1 marker

### Flow 4: Upgrading to Premium (Spark Elite)

**Steps:**

1. **Hit Free Tier Limit:**
   - User attempts 11th spark request (Explorer level)
   - Error message: "Daily spark limit reached (10/10)"
   - Prompt: "Upgrade to Elite for unlimited sparks"
   - Button: "Learn More"

2. **View Premium Benefits:**
   - User taps "Learn More"
   - Modal shows Elite features:
     - ✅ Unlimited sparks
     - ✅ See who likes you
     - ✅ Priority visibility
     - ✅ Advanced filters
     - ✅ Rewind swipes
     - ✅ 10x boost
   - Pricing: $19.99/month or $159.99/year (33% off)
   - Free 7-day trial

3. **Start Trial:**
   - User taps "Start Free Trial"
   - Redirects to payment screen
   - Enters payment method (credit card or Apple Pay)
   - Confirms subscription
   - Payment method authorized (not charged yet)

4. **Unlock Features:**
   - Immediate access to Elite features
   - Badge on profile: "⭐ Elite Member"
   - Unlimited spark requests enabled
   - "See Who Likes You" screen unlocked
   - Advanced filters appear in Discovery

5. **Trial Period:**
   - 7 days of full access
   - Reminder notification on day 5: "Trial ends in 2 days"
   - Can cancel anytime without charge

6. **Conversion:**
   - Day 7 ends
   - Auto-charge $19.99 to saved payment method
   - Receipt emailed
   - Subscription continues monthly
   - Can cancel anytime (prorated refund)

**Conversion Metrics:**
- 15% of free users see premium prompt
- 25% of prompted users start trial
- 40% of trial users convert to paid
- Overall free-to-paid: 1.5%

### Flow 5: Panic Button Activation

**Critical Safety Flow:**

1. **Trigger:**
   - User feels unsafe at event
   - Opens app → Profile → Safety
   - Taps "🚨 Panic Button"
   - Confirmation dialog: "Are you in danger?"
   - Taps "Yes, activate panic mode"

2. **Immediate Actions (all <1 second):**
   - User's location hidden from all users
   - Profile set to invisible
   - All active connections paused
   - Heat map contribution stopped
   - Screen shows: "PANIC MODE ACTIVATED"

3. **Trusted Contacts Notified (within 5 seconds):**
   - SMS sent to all 5 trusted contacts:
     ```
     EMERGENCY ALERT from Jane Doe
     Last location: Blue Note NYC, 131 W 3rd St
     Time: 9:47 PM
     View real-time location: [link]
     ```
   - Link provides 2-hour location tracking

4. **Support Team Alerted:**
   - Alert in 24/7 support dashboard
   - Full context displayed:
     - User name, photo, trust score
     - Last known location (map view)
     - Active event: Late Night Jazz Session
     - Recent connections (last 5)
     - Recent messages (last 10)
   - Support agent assigned
   - Automated callback initiated to user's phone

5. **Optional Actions:**
   - User prompted: "Call 911?"
   - If yes: Direct dial to emergency services
   - Location shared with 911 dispatch
   - Audio recording starts (evidence)
   - Front camera takes photo (evidence)

6. **Support Follow-Up:**
   - Support agent calls user within 2 minutes
   - Assesses situation
   - Coordinates with trusted contacts
   - Logs incident details
   - Offers resources (counseling, police report)

7. **Deactivation:**
   - User marks situation as resolved
   - Panic mode deactivated
   - Location sharing resumes (if user consents)
   - Incident report generated
   - Post-incident survey sent (24 hours later)

**Response Time:**
- Trusted contacts notified: <5 seconds
- Support agent assigned: <30 seconds
- Phone call to user: <2 minutes

**Success Metric:**
- 100% of panic activations receive support contact
- 0% false positive rate (accidental activations)
- 95% user satisfaction with response

---

## Data Model & Relationships

### Entity Relationship Diagram (Conceptual)

```
┌─────────────┐       ┌──────────────┐       ┌─────────────┐
│    USERS    │──────▶│ USER_STATS   │       │   EVENTS    │
│             │       │              │       │             │
│ - id        │       │ - user_id    │       │ - id        │
│ - phone     │       │ - points     │       │ - title     │
│ - email     │       │ - level      │       │ - venue_id  │
│ - trust_sc. │       │ - attended   │       │ - start_time│
└─────────────┘       └──────────────┘       │ - category  │
      │                                       └─────────────┘
      │                                             │
      │                                             │
      │                                             ▼
      │                                    ┌──────────────────┐
      └───────────────────────────────────▶│EVENT_ATTENDEES   │
                                            │                  │
                                            │ - user_id        │
                                            │ - event_id       │
┌─────────────┐                             │ - status (🔥/👀) │
│  LOCATIONS  │                             └──────────────────┘
│             │                                       │
│ - user_id   │                                       │
│ - lat/lng   │                                       │
│ - timestamp │                                       ▼
│ - accuracy  │                             ┌──────────────────┐
└─────────────┘                             │ SPARK_REQUESTS   │
                                            │                  │
                                            │ - sender_id      │
┌─────────────┐                             │ - receiver_id    │
│   VENUES    │                             │ - event_id       │
│             │                             │ - status         │
│ - id        │                             └──────────────────┘
│ - name      │                                       │
│ - lat/lng   │                                       │
│ - category  │                                       ▼
└─────────────┘                             ┌──────────────────┐
                                            │SPARK_CONNECTIONS │
                                            │                  │
                                            │ - user1_id       │
                                            │ - user2_id       │
                                            │ - event_id       │
                                            │ - expires_at     │
                                            └──────────────────┘
```

### Key Tables and Schemas

**users**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  phone VARCHAR(20) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  display_name VARCHAR(100),
  avatar_emoji VARCHAR(10),
  trust_score INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  last_active TIMESTAMP
);
```

**events**
```sql
CREATE TABLE events (
  id UUID PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  emoji VARCHAR(10),
  venue_id UUID REFERENCES venues(id),
  creator_id UUID REFERENCES users(id),
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP,
  category VARCHAR(50),
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_events_start_time ON events(start_time);
CREATE INDEX idx_events_category ON events(category);
```

**locations (partitioned by date)**
```sql
CREATE TABLE locations (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  location GEOGRAPHY(POINT, 4326),  -- PostGIS type
  accuracy FLOAT,
  timestamp TIMESTAMP NOT NULL,
  signals JSONB  -- {gps, wifi, bluetooth, cell}
) PARTITION BY RANGE (timestamp);

-- 7-day retention, auto-drop old partitions
CREATE TABLE locations_2025_11_14 PARTITION OF locations
  FOR VALUES FROM ('2025-11-14') TO ('2025-11-15');
```

**event_attendees**
```sql
CREATE TABLE event_attendees (
  user_id UUID REFERENCES users(id),
  event_id UUID REFERENCES events(id),
  status VARCHAR(20) CHECK (status IN ('interested', 'confirmed', 'attended')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (user_id, event_id)
);
CREATE INDEX idx_event_attendees_event ON event_attendees(event_id, status);
```

**spark_connections**
```sql
CREATE TABLE spark_connections (
  id UUID PRIMARY KEY,
  user1_id UUID REFERENCES users(id),
  user2_id UUID REFERENCES users(id),
  event_id UUID REFERENCES events(id),
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP DEFAULT NOW() + INTERVAL '24 hours',
  CHECK (user1_id < user2_id)  -- Prevent duplicates
);
CREATE INDEX idx_spark_connections_expiry ON spark_connections(expires_at);
```

---

## Security & Privacy Systems

### 1. Location Privacy Architecture

**Multi-Layer Protection:**

**Layer 1: Collection**
- Multi-signal verification (GPS + WiFi + BT + Cell)
- On-device validation before upload
- Encrypted in transit (TLS 1.3)

**Layer 2: Storage**
- Encrypted at rest (AES-256)
- 7-day retention policy (auto-delete old data)
- Partitioned by date for efficient deletion
- Audit logs for all access

**Layer 3: Processing**
- Differential privacy noise added (Laplace mechanism)
- K-anonymity enforcement (min 3 users per zone)
- 5-10 minute time delay before public display
- Aggregation to grid cells (not raw coordinates)

**Layer 4: Distribution**
- Heat map tiles only (no raw data exposed)
- CDN caching (60s TTL)
- Rate limiting on tile requests
- No API to query exact user locations

### 2. Authentication & Authorization

**JWT Token System:**
- Access token: 15-minute expiry
- Refresh token: 30-day expiry
- Secure, httpOnly cookies
- CSRF protection

**Role-Based Access Control:**
- User roles: user, moderator, admin, superadmin
- Permission-based feature access
- User level restrictions (Ghost, Explorer, etc.)

**API Security:**
- Rate limiting (100 req/min per user, 1000/min per IP)
- Input validation (all endpoints)
- SQL injection prevention (parameterized queries)
- XSS prevention (output encoding)
- CORS restrictions (whitelist origins)

### 3. Data Protection

**PII Encryption:**
- Phone numbers: Hashed + salted
- Email addresses: Encrypted at rest
- Messages: Encrypted end-to-end (planned)
- ID documents: Not stored (verification only)

**GDPR Compliance:**
- Right to access (download all data)
- Right to deletion (full account removal)
- Right to portability (JSON export)
- Consent management (granular permissions)
- Data minimization (collect only necessary)

**Audit Logging:**
- All sensitive actions logged
- Immutable append-only log
- Retention: 90 days minimum
- Includes: user_id, action, timestamp, IP, result

---

## Gamification & Engagement

### 1. User Level System

**Progression Mechanics:**
- Points earned through positive actions
- Levels unlock features and privileges
- Visual feedback (badges, animations)
- Social comparison (leaderboards)

**Retention Strategy:**
- Daily login bonuses (+5 points)
- Streaks (7-day streak: +50 bonus)
- Milestone celebrations (100 points, 500 points, etc.)
- Limited-time challenges (weekend events bonus)

### 2. Social Proof & FOMO

**Event Attendance Indicators:**
- 🔥 Confirmed count (social validation)
- 👀 Interested count (popularity signal)
- "45 people going" → urgency

**Real-Time Updates:**
- "3 new events near you!"
- "Sarah and 5 others are going"
- "Event starting in 15 minutes"

**Scarcity:**
- "Limited spots available"
- "RSVP closes in 2 hours"
- "Only 10 spots left"

### 3. Notifications & Re-Engagement

**Push Notification Strategy:**
- Event reminders (15 min before)
- New spark requests (immediate)
- Nearby hot spots (geofenced)
- Level-up celebrations
- Streak risk ("Don't break your 7-day streak!")

**Email Cadence:**
- Weekly digest (Sunday evening)
- Event recommendations (personalized)
- Connection highlights ("You made 5 new connections!")
- Re-engagement (dormant users: "3 events you missed")

---

## Business Model & Monetization

### 1. Revenue Streams

**A. Premium Subscriptions (Primary)**
- Spark Elite: $19.99/month or $159.99/year
- Target: 5% conversion rate
- LTV: $240/year per subscriber

**B. Venue Partnerships (Secondary)**
- Listing fees: $99/month per venue
- Featured events: $49 per event
- Analytics dashboard: $199/month
- Target: 50-100 venues per city

**C. Event Promotion (Tertiary)**
- Sponsored events in discovery feed
- Boosted visibility for paid events
- Ticket sales commission (10-15%)

**D. Data Insights (Future)**
- Aggregated foot traffic data to businesses
- Neighborhood activity reports
- Event trend analysis
- Anonymized, privacy-compliant

### 2. Unit Economics

**Customer Acquisition:**
- CAC target: $5 per user
- Channels: Instagram ads, TikTok, campus ambassadors
- Viral coefficient: 1.3 (organic growth)

**Revenue Per User:**
- Free users: $0.50/year (ads, data)
- Premium users: $240/year (subscription)
- Blended ARPU: $12/year (5% premium rate)

**Break-Even:**
- 10,000 users
- 500 premium subscribers
- 25 venue partners
- Monthly revenue: $12,500
- Monthly costs: $10,000
- Profitable at this scale

### 3. Growth Projections

**Phase 1: Beta (Month 1-2)**
- 500 users, single campus
- $0 revenue (free for all)
- Focus: Product-market fit

**Phase 2: Campus Expansion (Month 3-6)**
- 10,000 users across 3 campuses
- $1,000 MRR (50 premium, 10 venues)
- Focus: Retention and engagement

**Phase 3: Multi-Campus (Month 7-12)**
- 50,000 users across 10 universities
- $10,000 MRR (500 premium, 50 venues)
- Focus: Scaling operations

**Phase 4: City Launch (Month 13-24)**
- 200,000 users in NYC, LA, Austin
- $100,000 MRR (5,000 premium, 200 venues)
- Focus: Series A readiness

---

## Integration Points

### 1. Third-Party Services

**Maps:**
- Mapbox or Google Maps (production)
- OpenStreetMap (free tier / demo)

**Authentication:**
- Twilio (phone verification)
- SendGrid (email verification)
- Auth0 or Firebase Auth

**Payments:**
- Stripe (subscriptions, payouts)
- Apple Pay / Google Pay (in-app)

**ID Verification:**
- Onfido or Jumio
- Automated document verification

**Push Notifications:**
- Firebase Cloud Messaging (FCM)
- Apple Push Notification Service (APNS)

**Analytics:**
- Mixpanel (user behavior)
- Amplitude (funnels)
- Google Analytics (web)

**Error Tracking:**
- Sentry (crash reporting)
- LogRocket (session replay)

**Customer Support:**
- Intercom (in-app chat)
- Zendesk (ticket system)

### 2. API Integrations (Future)

**Event Sources:**
- Eventbrite API (import public events)
- Facebook Events API
- Meetup.com API
- Ticketmaster API
- University event calendars

**Social Networks:**
- Facebook Graph API (friend matching)
- Instagram API (photo verification)
- LinkedIn API (professional verification)

**Transportation:**
- Uber API (ride to event)
- Lyft API
- Citibike API (bike directions)

**Venue Data:**
- Foursquare Places API
- Google Places API
- Yelp Fusion API

---

## Missing Components & Implementation Gaps

### 1. Backend APIs (100% missing)

**Critical Missing Endpoints:**
- `POST /api/v1/auth/signup` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/location/update` - Location tracking
- `GET /api/v1/events/discover` - Event recommendations
- `POST /api/v1/events/:id/rsvp` - Event RSVP
- `GET /api/v1/sparks/requests` - Connection requests
- `POST /api/v1/sparks/:id/accept` - Accept connection
- `POST /api/v1/messages` - Send message
- `POST /api/v1/panic/activate` - Panic button
- `POST /api/v1/subscriptions/create` - Premium upgrade

**Total Missing Endpoints:** ~80 API endpoints

### 2. Database Schema (95% missing)

**Implemented:**
- NYC venue sample data (demo/js/nyc-data.js)
- Static event cards (HTML)

**Missing:**
- All database tables (users, events, locations, etc.)
- Indexes for performance
- Partitioning strategy
- Backup and recovery
- Migration scripts

### 3. Authentication System (100% missing)

**Missing Components:**
- User signup flow
- Phone verification (Twilio)
- Email verification
- Password hashing (bcrypt)
- JWT token generation
- Refresh token rotation
- OAuth integrations (Facebook, Google)
- ID verification (Onfido)

### 4. Location Services (90% missing)

**Implemented:**
- Demo map with static heat data
- Venue markers

**Missing:**
- Real-time location tracking
- Multi-signal verification
- Differential privacy algorithm
- K-anonymity enforcement
- Heat map tile generation
- Impossible travel detection
- Geofencing for check-ins
- Location permission handling (mobile)

### 5. Matching Algorithm (100% missing)

**Missing:**
- Collaborative filtering engine
- Content-based filtering
- Social graph integration
- Real-time scoring
- A/B testing framework
- ML model training pipeline

### 6. Safety System (80% missing)

**Implemented:**
- Panic button UI (no backend)
- SafeMode toggle (no enforcement)

**Missing:**
- Panic alert dispatch
- Trusted contact notification (SMS/call)
- 24/7 support dashboard
- Automated moderation ML
- Report investigation workflow
- Behavioral anomaly detection
- Block/report functionality

### 7. Payment Processing (100% missing)

**Missing:**
- Stripe integration
- Subscription management
- Payment method storage
- Invoice generation
- Refund processing
- Churn handling
- Revenue analytics

### 8. Messaging System (100% missing)

**Missing:**
- Real-time chat (WebSocket)
- Message storage (with TTL)
- End-to-end encryption
- Read receipts
- Typing indicators
- Media upload (images)
- Message moderation

### 9. Analytics & Monitoring (100% missing)

**Missing:**
- Event tracking (Mixpanel)
- Crash reporting (Sentry)
- Performance monitoring (New Relic)
- A/B testing framework
- Funnel analysis
- Cohort analysis
- Revenue dashboards

### 10. Mobile Apps (100% missing)

**Missing:**
- iOS app (React Native)
- Android app (React Native)
- App Store deployment
- Google Play deployment
- Push notification handling
- Background location tracking
- Deep linking
- In-app purchase integration

---

## Appendices

### Appendix A: Technology Stack Summary

**Frontend (Demo - Current):**
- HTML5, CSS3, JavaScript ES6+
- Leaflet.js, Font Awesome
- No build process

**Frontend (Production - Planned):**
- React Native (iOS + Android)
- Redux, React Navigation
- Mapbox SDK

**Backend (Planned):**
- Node.js, Express, Socket.io
- PostgreSQL + PostGIS, Redis
- Kafka, Docker

**Infrastructure (Planned):**
- AWS (ECS, RDS, S3, CloudFront)
- Sentry, Mixpanel

### Appendix B: Performance Targets

- 100K concurrent users
- 10K location updates/sec
- API p99 latency: <200ms
- Heat map tile gen: <50ms
- 99.9% uptime SLA

### Appendix C: Success Metrics

**User Engagement:**
- Day 7 retention: 40%
- Day 30 retention: 25%
- DAU/MAU ratio: 30%

**Event Engagement:**
- Events discovered per session: 20
- RSVP rate: 40%
- Attendance rate: 60%

**Monetization:**
- Free-to-paid conversion: 5%
- ARPU: $12/year
- LTV: $240

**Safety:**
- Zero safety incidents (physical harm)
- <1% report rate
- <5min panic response time

### Appendix D: Competitive Analysis Reference

**Direct Competitors:**
- Eventbrite (event discovery, no social)
- Meetup (group events, older demo)
- Snapchat Map (location, no events)

**Spark Differentiation:**
- Event-focused social discovery
- Safety and verification as core features
- Privacy-preserving location tech
- Gamified engagement system

---

## Document Revision History

- **v1.0** (2025-11-14): Initial comprehensive documentation
  - Complete feature descriptions
  - Technical architecture overview
  - User flows and data models
  - Missing implementation gaps identified

---

**End of Document**

*Total Pages: 42 (estimated)*
*Word Count: ~18,000 words*
*Completeness: Comprehensive coverage of all planned and implemented features*
