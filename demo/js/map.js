/**
 * Map Screen Functionality - NYC Edition
 */

const Map = {
    init: function() {
        console.log('Map module initialized with NYC data');
        this.renderHeatSpots();
        this.renderVenues();
        this.initVenuePins();
    },

    renderHeatSpots: function() {
        if (!window.NYCData) {
            console.warn('NYC data not loaded yet');
            return;
        }

        const mapContainer = document.getElementById('mapContainer');

        // Clear existing heat spots
        const existingSpots = mapContainer.querySelectorAll('.heat-spot');
        existingSpots.forEach(spot => spot.remove());

        // Render heat spots from NYC data
        NYCData.heatSpots.forEach(spot => {
            const heatSpot = document.createElement('div');
            heatSpot.className = `heat-spot ${spot.intensity}`;
            heatSpot.style.width = spot.size;
            heatSpot.style.height = spot.size;
            heatSpot.style.top = spot.position.top;
            heatSpot.style.left = spot.position.left;
            mapContainer.appendChild(heatSpot);
        });
    },

    renderVenues: function() {
        if (!window.NYCData) {
            console.warn('NYC data not loaded yet');
            return;
        }

        const mapContainer = document.getElementById('mapContainer');

        // Clear existing venue pins
        const existingPins = mapContainer.querySelectorAll('.venue-pin');
        existingPins.forEach(pin => pin.remove());

        // Render venues from NYC data
        NYCData.venues.forEach(venue => {
            const venuePin = document.createElement('div');
            venuePin.className = 'venue-pin';
            venuePin.style.top = venue.position.top;
            venuePin.style.left = venue.position.left;
            venuePin.dataset.venueId = venue.id;

            venuePin.innerHTML = `
                <div class="pin-bubble">
                    <div class="pin-icon ${venue.intensity}">${venue.emoji}</div>
                    <div>
                        <div style="font-weight: 600;">${venue.name}</div>
                        <div style="font-size: 10px; color: #666;">${venue.people} people</div>
                    </div>
                </div>
            `;

            mapContainer.appendChild(venuePin);
        });
    },

    initVenuePins: function() {
        // Animate venue pins on hover
        document.querySelectorAll('.venue-pin').forEach(pin => {
            pin.addEventListener('click', function() {
                const bubble = this.querySelector('.pin-bubble');
                const name = bubble.querySelector('div div:first-child').textContent;
                UI.showNotification(`Opening ${name} details...`);
            });
        });
    },

    enableLocation: function() {
        AppState.locationEnabled = true;
        this.hideLocationOverlay();
        UI.showNotification("Location enabled! You're now visible on the map.");

        // Animate heat spots
        this.animateHeatMap();
    },

    hideLocationOverlay: function() {
        document.getElementById('locationOverlay').classList.remove('show');
    },

    animateHeatMap: function() {
        const heatSpots = document.querySelectorAll('.heat-spot');
        heatSpots.forEach((spot, index) => {
            setTimeout(() => {
                spot.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    spot.style.transform = 'scale(1)';
                }, 300);
            }, index * 100);
        });
    },

    checkIn: function() {
        // Get a random NYC venue for check-in
        const randomVenue = window.NYCData
            ? NYCData.venues[Math.floor(Math.random() * NYCData.venues.length)]
            : { name: "a venue", emoji: "📍" };

        UI.showNotification(`Checked in at ${randomVenue.name} ${randomVenue.emoji} +50 points earned 🎉`);

        // Animate FAB
        const fab = document.querySelector('.fab');
        fab.style.transform = 'scale(0.8)';
        setTimeout(() => {
            fab.style.transform = 'scale(1)';
        }, 200);
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
