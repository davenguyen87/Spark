# Spark iPhone 17 Demo

An interactive, **100% browser-based** mockup of the Spark social discovery app designed for iPhone 17. No installation, no build process, no server required—just open and run!

## 🚀 Quick Start

**Double-click `index.html` to run the demo instantly in your browser.**

## Overview

This demo showcases the complete UI/UX design of Spark with **real NYC locations**, including:
- **Professional Map** - Leaflet.js + OpenStreetMap (looks like Google Maps, but free!)
- **19 Real NYC Venues** - From Times Square to Williamsburg, Chelsea Market to Central Park
- **Heat Map Layer** - Visualize activity hotspots across NYC with gradient colors
- **Interactive Markers** - Click any venue to see details, people count, and neighborhood
- **Event Discovery** - Swipe through 10 diverse NYC events with Gen Z UI (🔥 Confirm, 👀 Interested, ❌ Pass)
- **Event-Based Connections** - Meet people through shared event interest
- **User Profiles** - Event attendance tracking and gamification
- **iPhone 17 Dynamic Island** - Event notifications and confirmations

**Technology:** Pure HTML5, CSS3, vanilla JavaScript + **Leaflet.js** map library. **No API keys required** - OpenStreetMap is completely free!

## File Structure

```
demo/
├── index.html              # Main HTML file
├── css/                    # Stylesheets organized by concern
│   ├── base.css           # Global styles, reset, body, gradients
│   ├── iphone.css         # iPhone 17 frame, Dynamic Island, status bar
│   ├── components.css     # Reusable components (buttons, cards, badges)
│   ├── screens.css        # Screen-specific layouts (Leaflet map container)
│   └── animations.css     # Keyframe animations and transitions
├── js/                     # JavaScript modules by feature
│   ├── nyc-data.js        # 🗽 19 Real NYC venues with lat/lng coordinates
│   ├── app.js             # Main app initialization and state
│   ├── navigation.js      # Screen switching logic
│   ├── map.js             # 🗺️ Leaflet + OpenStreetMap integration
│   ├── discovery.js       # Card swiping and matching
│   ├── sparks.js          # Sparks screen functionality
│   ├── profile.js         # Profile screen functionality
│   └── ui.js              # UI utilities (notifications, Dynamic Island)
├── README.md              # This file
├── QUICKSTART.md          # Ultra-quick start guide
```

## NYC Data

The demo features **real New York City locations** without requiring any API keys:

### Map Technology
- **Leaflet.js** - Popular open-source mapping library
- **OpenStreetMap tiles** - Free map tiles that look like Google Maps
- **Leaflet.heat plugin** - Heat map visualization layer
- Zoom, pan, and click interactions built-in
- No API keys, no rate limits, completely free
- Professional quality map rendering

### Real Venues (19 locations)
All venues in `js/nyc-data.js` are real NYC hotspots:

**Manhattan:**
- Times Square, Central Park, The Met Museum
- Chelsea Market, The Highline, Lincoln Center
- Bryant Park, Union Square, Tompkins Square
- Stone Street, Spring Lounge, Hell's Kitchen

**Brooklyn:**
- Williamsburg (Bedford Ave, Smorgasburg)
- DUMBO (Brooklyn Bridge Park)

**Queens:**
- Long Island City (Gantry Plaza)
- Astoria Beer Garden

**Other:**
- Pier 17 (Financial District)
- Alphabet City Bars (East Village)

### Heat Map Visualization
Real-time heat map layer shows activity intensity:
- **Blue → Cyan → Green → Yellow → Red** gradient
- Lower Manhattan (Financial District)
- Midtown (Times Square area - hottest)
- Chelsea/Meatpacking District
- East Village
- Central Park area
- Williamsburg, Brooklyn
- Upper East Side
- DUMBO/Brooklyn Heights

All venues use actual GPS coordinates for accurate positioning on the map.

## Architecture

### CSS Organization

**base.css**
- Global resets and box-sizing
- Body styles and gradient background
- Animated background pattern

**iphone.css**
- iPhone 17 container frame
- Dynamic Island component
- Status bar
- Screen and navigation structure

**components.css**
- Buttons (event action buttons: ❌ pass, 🔥 confirm, 👀 interested)
- Badges (trust badges, notification badges)
- Cards (event cards with venue/time/attendance info, connection items)
- Event-specific styles (event-title, event-venue, event-meta, event-attendance)
- Toggles (settings switches)
- Loading spinner
- Premium banner

**screens.css**
- Map screen with heat spots and venue pins
- Discovery screen with event card stack
- Events screen (formerly Sparks) with event stats and connections
- Profile screen with event-focused stats and settings
- Match/confirmation overlay

**animations.css**
- All keyframe animations (@keyframes)
- Includes: pulse, sparkle, spin, slideDown, zoomIn, fadeIn, bounce

### JavaScript Modules

**app.js**
- Global app state management
- Initialization of all modules
- Real-time updates simulation

**navigation.js**
- Screen switching functionality
- Navigation state management
- Status bar color updates

**map.js**
- Location enablement
- Heat map animations
- Venue pin interactions
- Check-in functionality

**discovery.js**
- Event card swiping logic (mouse and touch)
- Pass/Interested/Confirm actions (❌/👀/🔥)
- Event confirmation notifications
- Card stack management
- Legacy compatibility for people-matching functions

**sparks.js**
- Event connection acceptance/decline
- Notification badge updates
- Event connection list management

**profile.js**
- Settings toggle functionality
- Profile interactions

**ui.js**
- Dynamic Island animations
- Notification system
- Loading states
- Global UI utilities

## Running the Demo

### ⚡ Easiest Way - Just Open It!

**Simply double-click `index.html` or drag it into your browser.**

That's it! The demo is 100% static HTML5/CSS/JavaScript with no server required.

```bash
# On macOS/Linux
open demo/index.html

# On Windows
start demo/index.html

# Or just double-click the file in your file explorer
```

### Alternative: Local Server (Optional)

If you prefer to run a local server (not necessary, but available):

**Python:**
```bash
cd demo
python3 -m http.server 8080
# Open http://localhost:8080
```

**Node.js:**
```bash
cd demo
npx http-server -p 8080
# Open http://localhost:8080
```

**Note:** All features work with direct file opening. A local server is completely optional.

## Features

### 4 Main Screens

1. **Map Screen**
   - Interactive heat map with color-coded intensity
   - Venue pins with live user counts
   - Location permission overlay
   - Real-time updates

2. **Discovery Screen** (Event Discovery)
   - 10 diverse NYC events (jazz, food festivals, comedy, art, sports, nightlife, wellness, etc.)
   - Card swiping with Gen Z UI
   - Event details: venue address, distance, time, 🔥 confirmed count, 👀 interested count
   - Button actions: ❌ Pass, 🔥 Confirm ("for sure I'll be there"), 👀 Interested
   - Drag to interact or use buttons

3. **Events Screen** (formerly Sparks)
   - Event-based connection requests from people going to same events
   - Stats dashboard: 🔥 Confirmed events, 👀 Interested events, Attended count
   - Accept/decline connection requests
   - Shows shared event context (e.g., "Both confirmed 🔥" or "Also interested 👀")

4. **Profile Screen**
   - User avatar and stats
   - Event-focused metrics: Events Attended, Connections Made, Confirmed Upcoming
   - Premium subscription banner
   - Privacy settings with toggles
   - Safety features (panic button)

### Interactive Elements

- **Dynamic Island**: Expandable notification system
- **Bottom Navigation**: Tab-based screen switching
- **Floating Action Button**: Quick check-in
- **Swipeable Cards**: Touch and mouse drag support
- **Animated Heat Spots**: Pulsing location indicators
- **Venue Pins**: Clickable location markers

## Development Guidelines

### Adding New CSS Styles

1. **Component styles**: Add to `css/components.css`
2. **Screen-specific styles**: Add to `css/screens.css`
3. **Animations**: Add keyframes to `css/animations.css`
4. **iPhone/device styles**: Add to `css/iphone.css`

### Adding New JavaScript Features

1. Create a new module file in `js/` (e.g., `messaging.js`)
2. Follow the module pattern:
   ```javascript
   const ModuleName = {
       init: function() {
           console.log('Module initialized');
       },

       // Add methods here
   };

   window.ModuleName = ModuleName;
   ```
3. Initialize in `app.js`:
   ```javascript
   ModuleName.init();
   ```
4. Import in `index.html`:
   ```html
   <script src="js/module-name.js"></script>
   ```

### Troubleshooting

**Cards not swiping?**
- Check that `discovery.js` is loaded
- Verify event listeners are attached
- Check browser console for errors

**Styles not loading?**
- Verify CSS file paths in `index.html`
- Check browser network tab for 404 errors
- Clear browser cache

**JavaScript errors?**
- Check that all JS files are loaded in correct order
- Verify `app.js` is loaded first
- Check that dependencies are initialized

## Browser Compatibility

- **Chrome/Edge**: Full support
- **Firefox**: Full support
- **Safari**: Full support
- **Mobile browsers**: Touch gestures supported

## Performance Notes

- All animations use CSS transforms for GPU acceleration
- JavaScript modules are lazy-loaded per screen
- Heat map uses CSS gradients for performance
- No external dependencies except Font Awesome

## Future Enhancements

Potential improvements for the demo:

1. **Real Data Integration**
   - Connect to mock API endpoints
   - Simulate real-time location updates
   - Dynamic user data

2. **Additional Screens**
   - Chat/messaging interface
   - Venue details page
   - Events calendar
   - Notifications panel

3. **Enhanced Interactions**
   - Haptic feedback simulation
   - Sound effects
   - More gesture controls
   - Pinch-to-zoom on map

4. **Accessibility**
   - Keyboard navigation
   - Screen reader support
   - High contrast mode
   - Reduced motion option

## Credits

- **Design**: iPhone 17 mockup with Dynamic Island
- **Icons**: Font Awesome 6.4.0
- **Fonts**: SF Pro Display (Apple system font)

## License

This is a demonstration mockup for the Spark project. Not for production use.

---

For questions or improvements, please refer to the main project documentation.
