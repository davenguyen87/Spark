/**
 * Navigation and Screen Management
 */

const Navigation = {
    init: function() {
        console.log('Navigation module initialized');
    },

    switchScreen: function(screenId, navItem) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // Show selected screen
        document.getElementById(screenId).classList.add('active');
        AppState.currentScreen = screenId;

        // Update nav
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        if (navItem) {
            navItem.classList.add('active');
        }

        // Update status bar color
        const statusBar = document.getElementById('statusBar');
        if (screenId === 'mapScreen') {
            statusBar.classList.add('light');
        } else {
            statusBar.classList.remove('light');
        }

        // Show location overlay on first map view
        if (screenId === 'mapScreen' && !AppState.locationEnabled) {
            setTimeout(() => {
                document.getElementById('locationOverlay').classList.add('show');
            }, 500);
        }
    }
};

// Global function for nav items
function switchScreen(screenId, navItem) {
    Navigation.switchScreen(screenId, navItem);
}

window.Navigation = Navigation;
