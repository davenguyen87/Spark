/**
 * Main Application State and Configuration
 */

// Global app state
const AppState = {
    currentScreen: 'mapScreen',
    locationEnabled: false,
    dynamicIslandExpanded: false
};

// Initialize app on load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Spark Demo App Initialized');

    // Initialize all modules
    Navigation.init();
    Map.init();
    Discovery.init();
    Sparks.init();
    Profile.init();
    UI.init();

    // Start real-time updates simulation
    startRealtimeUpdates();

    // Initial Dynamic Island animation
    setTimeout(() => {
        UI.expandDynamicIsland();
        setTimeout(() => {
            UI.collapseDynamicIsland();
        }, 3000);
    }, 1000);
});

// Simulate real-time updates
function startRealtimeUpdates() {
    setInterval(() => {
        // Update time
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const timeString = `${hours}:${minutes}`;
        document.querySelector('.status-time').textContent = timeString;
    }, 5000);
}

// Export app state
window.AppState = AppState;
