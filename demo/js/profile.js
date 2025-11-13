/**
 * Profile Screen Functionality
 */

const Profile = {
    init: function() {
        console.log('Profile module initialized');
    },

    toggleSetting: function(toggle) {
        toggle.classList.toggle('active');

        // Get setting label
        const label = toggle.parentElement.querySelector('.settings-label').textContent;
        const isActive = toggle.classList.contains('active');

        UI.showNotification(`${label}: ${isActive ? 'Enabled' : 'Disabled'}`);
    }
};

// Global function
function toggleSetting(toggle) {
    Profile.toggleSetting(toggle);
}

window.Profile = Profile;
