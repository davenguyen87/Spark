/**
 * Map Screen Functionality
 */

const Map = {
    init: function() {
        console.log('Map module initialized');
        this.initVenuePins();
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
        UI.showNotification("Checked in at The Hub! +50 points earned 🎉");

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
