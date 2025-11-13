/**
 * Sparks Screen Functionality
 */

const Sparks = {
    init: function() {
        console.log('Sparks module initialized');
    },

    acceptSpark: function(sparkElement) {
        UI.showNotification("Spark accepted! You can now chat 💬");
        sparkElement.style.transform = 'translateX(500px)';
        sparkElement.style.opacity = '0';

        setTimeout(() => {
            sparkElement.remove();
            this.updateSparkCount();
        }, 300);
    },

    declineSpark: function(sparkElement) {
        sparkElement.style.transform = 'translateX(-500px)';
        sparkElement.style.opacity = '0';

        setTimeout(() => {
            sparkElement.remove();
            this.updateSparkCount();
        }, 300);
    },

    updateSparkCount: function() {
        const badge = document.querySelector('.nav-item .notification-badge');
        if (badge) {
            const count = parseInt(badge.textContent);
            if (count > 1) {
                badge.textContent = count - 1;
            } else {
                badge.remove();
            }
        }
    }
};

window.Sparks = Sparks;
