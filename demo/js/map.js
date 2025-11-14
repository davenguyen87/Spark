/**
 * Map Screen Functionality - Leaflet.js + OpenStreetMap Edition
 * Free map service - No API keys required!
 */

const Map = {
    map: null,
    heatLayer: null,
    markers: [],
    retryCount: 0,
    maxRetries: 30, // 3 seconds max (30 * 100ms)

    init: function() {
        console.log('Map module initialized with Leaflet + OpenStreetMap');

        // Wait for DOM and Leaflet to be ready with timeout
        if (typeof L === 'undefined') {
            this.retryCount++;
            if (this.retryCount >= this.maxRetries) {
                this.showLoadError('Leaflet library failed to load. Please check your internet connection and refresh the page.');
                return;
            }
            console.warn(`Leaflet not loaded yet, retrying... (${this.retryCount}/${this.maxRetries})`);
            setTimeout(() => this.init(), 100);
            return;
        }

        if (!window.NYCData) {
            console.warn('NYC data not loaded yet, retrying...');
            setTimeout(() => this.init(), 100);
            return;
        }

        this.initMap();
    },

    showLoadError: function(message) {
        const mapEl = document.getElementById('map');
        if (mapEl) {
            mapEl.innerHTML = `
                <div style="
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                    padding: 40px;
                    text-align: center;
                    background: #f8f9fa;
                ">
                    <div style="font-size: 64px; margin-bottom: 20px;">📡</div>
                    <div style="font-size: 18px; font-weight: 600; color: #333; margin-bottom: 10px;">Map Unavailable</div>
                    <div style="font-size: 14px; color: #666; max-width: 300px;">${message}</div>
                </div>
            `;
        }
        console.error('Map initialization failed:', message);
    },

    initMap: function() {
        const mapEl = document.getElementById('map');

        if (!mapEl) {
            console.error('Map element not found');
            return;
        }

        // Initialize Leaflet map centered on NYC
        this.map = L.map('map', {
            zoomControl: true,
            attributionControl: false  // Clean look for demo
        }).setView([NYCData.center.lat, NYCData.center.lng], NYCData.center.zoom);

        // Add OpenStreetMap tiles (Free, No API Key!)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(this.map);

        // Render heat map layer
        this.renderHeatMap();

        // Render venue markers
        this.renderVenueMarkers();

        // Fix map size after initialization (increased timeout for slower devices)
        setTimeout(() => {
            if (this.map) {
                this.map.invalidateSize();
            }
        }, 250);

        // Additional resize check for very slow devices
        setTimeout(() => {
            if (this.map) {
                this.map.invalidateSize();
            }
        }, 500);
    },

    renderHeatMap: function() {
        if (!this.map || !window.L.heat) {
            console.warn('Heat map plugin not loaded');
            return;
        }

        // Create heat layer with NYC data
        this.heatLayer = L.heatLayer(NYCData.heatMapData, {
            radius: 25,
            blur: 35,
            maxZoom: 17,
            max: 1.0,
            gradient: {
                0.0: 'blue',
                0.3: 'cyan',
                0.5: 'lime',
                0.7: 'yellow',
                1.0: 'red'
            }
        }).addTo(this.map);
    },

    renderVenueMarkers: function() {
        if (!this.map) {
            console.warn('Map not initialized');
            return;
        }

        // Clear existing markers
        this.markers.forEach(marker => marker.remove());
        this.markers = [];

        // Add custom markers for each venue
        NYCData.venues.forEach(venue => {
            // Create custom icon based on intensity
            const iconColor = venue.intensity === 'hot' ? '#FF6B6B' :
                            venue.intensity === 'warm' ? '#FFD93D' : '#6BCF7F';

            // Create custom HTML icon with emoji
            const customIcon = L.divIcon({
                className: 'custom-marker',
                html: `
                    <div style="
                        background: ${iconColor};
                        border-radius: 50%;
                        width: 40px;
                        height: 40px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 20px;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
                        border: 3px solid white;
                        cursor: pointer;
                    ">${venue.emoji}</div>
                `,
                iconSize: [40, 40],
                iconAnchor: [20, 20]
            });

            // Create marker
            const marker = L.marker([venue.lat, venue.lng], {
                icon: customIcon,
                title: venue.name
            }).addTo(this.map);

            // Add popup with venue details
            const popupContent = `
                <div style="text-align: center; min-width: 150px;">
                    <div style="font-size: 24px; margin-bottom: 8px;">${venue.emoji}</div>
                    <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">${venue.name}</div>
                    <div style="color: #666; font-size: 12px;">${venue.people} people</div>
                    <div style="color: #999; font-size: 11px; margin-top: 4px;">${venue.neighborhood}</div>
                </div>
            `;

            marker.bindPopup(popupContent);

            // Click handler
            marker.on('click', () => {
                UI.showNotification(`Viewing ${venue.name} ${venue.emoji}`);
            });

            this.markers.push(marker);
        });
    },

    enableLocation: function() {
        AppState.locationEnabled = true;
        this.hideLocationOverlay();
        UI.showNotification("Location enabled! You're now visible on the map in NYC 🗽");

        // Animate to a random venue
        if (this.map && NYCData.venues.length > 0) {
            const randomVenue = NYCData.venues[Math.floor(Math.random() * NYCData.venues.length)];
            this.map.flyTo([randomVenue.lat, randomVenue.lng], 15, {
                duration: 2
            });
        }
    },

    hideLocationOverlay: function() {
        document.getElementById('locationOverlay').classList.remove('show');
    },

    checkIn: function() {
        // Get a random NYC venue for check-in
        const randomVenue = window.NYCData
            ? NYCData.venues[Math.floor(Math.random() * NYCData.venues.length)]
            : { name: "a venue", emoji: "📍" };

        UI.showNotification(`Checked in at ${randomVenue.name} ${randomVenue.emoji} +50 points earned 🎉`);

        // Fly to the venue on the map
        if (this.map && randomVenue.lat && randomVenue.lng) {
            this.map.flyTo([randomVenue.lat, randomVenue.lng], 16, {
                duration: 1.5
            });
        }
    }
};

// Global functions
function enableLocation() {
    Map.enableLocation();
}

function hideLocationOverlay() {
    Map.hideLocationOverlay();
}

function checkIn() {
    Map.checkIn();
}

window.Map = Map;
