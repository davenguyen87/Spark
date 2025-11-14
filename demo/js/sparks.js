/**
 * Sparks Screen Functionality
 */

const Sparks = {
    stats: {
        confirmed: 7,      // Events user has confirmed attendance
        interested: 12,    // Events user marked as interested
        attended: 3        // Events user has attended
    },

    init: function() {
        console.log('Sparks module initialized');
        this.attachEventListeners();
        this.updateStats();

        // Log initial state
        const sparkItems = document.querySelectorAll('.spark-item');
        console.log(`Found ${sparkItems.length} spark items`);
    },

    attachEventListeners: function() {
        // Attach event listeners to all accept/decline buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('spark-button')) {
                console.log('Spark button clicked:', e.target.classList.contains('accept') ? 'accept' : 'decline');
                const sparkItem = e.target.closest('.spark-item');
                if (sparkItem) {
                    if (e.target.classList.contains('accept')) {
                        this.acceptSpark(sparkItem);
                    } else if (e.target.classList.contains('decline')) {
                        this.declineSpark(sparkItem);
                    }
                } else {
                    console.error('Could not find parent spark-item');
                }
            }
        });
    },

    updateStats: function() {
        const statNumbers = document.querySelectorAll('.sparks-stats .stat-number');
        if (statNumbers.length >= 3) {
            // Preserve emoji formatting
            statNumbers[0].textContent = `🔥 ${this.stats.confirmed}`;
            statNumbers[1].textContent = `👀 ${this.stats.interested}`;
            statNumbers[2].textContent = this.stats.attended;
        }
    },

    acceptSpark: function(sparkElement) {
        UI.showNotification("Event connection accepted! You can now chat 💬");
        sparkElement.style.transform = 'translateX(500px)';
        sparkElement.style.opacity = '0';
        sparkElement.style.transition = 'all 0.3s ease';

        // Note: Accepting a spark creates a connection but doesn't change event RSVP status
        // Event stats (confirmed/interested/attended) are updated in Discovery screen

        setTimeout(() => {
            sparkElement.remove();
            this.updateSparkCount();
            this.checkEmptyState();
        }, 300);
    },

    declineSpark: function(sparkElement) {
        sparkElement.style.transform = 'translateX(-500px)';
        sparkElement.style.opacity = '0';
        sparkElement.style.transition = 'all 0.3s ease';

        // Note: Declining a spark just removes the connection request
        // Event stats remain unchanged

        setTimeout(() => {
            sparkElement.remove();
            this.updateSparkCount();
            this.checkEmptyState();
        }, 300);
    },

    updateSparkCount: function() {
        const badge = document.querySelector('.bottom-nav .nav-item:nth-child(3) .notification-badge');
        if (badge) {
            const count = parseInt(badge.textContent);
            if (count > 1) {
                badge.textContent = count - 1;
            } else {
                badge.remove();
            }
        }
    },

    checkEmptyState: function() {
        const sparksList = document.querySelector('.sparks-list');
        const sparkItems = document.querySelectorAll('.spark-item');

        if (sparkItems.length === 0) {
            const emptyState = document.createElement('div');
            emptyState.className = 'empty-state';
            emptyState.innerHTML = `
                <div style="text-align: center; padding: 60px 20px; color: #999;">
                    <div style="font-size: 64px; margin-bottom: 16px;">✨</div>
                    <h3 style="font-size: 20px; margin-bottom: 8px; color: #666;">No New Sparks</h3>
                    <p style="font-size: 14px;">Check back later for new connections!</p>
                </div>
            `;
            sparksList.appendChild(emptyState);
        }
    }
};

// Global helper functions for inline onclick handlers (if needed)
function acceptSpark(button) {
    const sparkItem = button.closest('.spark-item');
    Sparks.acceptSpark(sparkItem);
}

function declineSpark(button) {
    const sparkItem = button.closest('.spark-item');
    Sparks.declineSpark(sparkItem);
}

window.Sparks = Sparks;
window.acceptSpark = acceptSpark;
window.declineSpark = declineSpark;
