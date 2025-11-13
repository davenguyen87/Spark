/**
 * Discovery Screen - Card Swiping and Matching
 */

const Discovery = {
    isDragging: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    dragCard: null,

    init: function() {
        console.log('Discovery module initialized');
        this.initCardDragging();
    },

    interestedEvent: function() {
        const card = document.querySelector('.event-card:first-child');
        if (card) {
            card.style.transform = 'translateX(500px) rotate(20deg)';
            card.style.opacity = '0';

            setTimeout(() => {
                this.removeCard();
            }, 300);
        }
    },

    passEvent: function() {
        const card = document.querySelector('.event-card:first-child');
        if (card) {
            card.style.transform = 'translateX(-500px) rotate(-20deg)';
            card.style.opacity = '0';

            setTimeout(() => {
                this.removeCard();
            }, 300);
        }
    },

    confirmEvent: function() {
        const card = document.querySelector('.event-card:first-child');
        if (card) {
            card.style.transform = 'translateY(-500px) rotate(10deg) scale(0.8)';
            card.style.opacity = '0';

            setTimeout(() => {
                this.showConfirmation();
                this.removeCard();
            }, 300);
        }
    },

    // Legacy functions for backward compatibility
    likeCard: function() {
        this.interestedEvent();
    },

    rejectCard: function() {
        this.passEvent();
    },

    superLikeCard: function() {
        this.confirmEvent();
    },

    removeCard: function() {
        const card = document.querySelector('.event-card:first-child');
        if (card) {
            card.remove();

            // Move other cards up
            const cards = document.querySelectorAll('.event-card');
            cards.forEach((card, index) => {
                if (index === 0) {
                    card.style.transform = 'scale(1)';
                    card.style.opacity = '1';
                } else if (index === 1) {
                    card.style.transform = 'scale(0.95) translateY(20px)';
                    card.style.opacity = '0.9';
                }
            });

            // Re-initialize dragging for new top card
            setTimeout(() => this.initCardDragging(), 100);
        }
    },

    showConfirmation: function() {
        UI.showNotification('Event saved! 🔥');
    },

    closeMatch: function() {
        document.getElementById('matchOverlay').classList.remove('show');
        UI.expandDynamicIsland();
    },

    initCardDragging: function() {
        const cards = document.querySelectorAll('.event-card');
        const firstCard = cards[0];

        if (firstCard) {
            firstCard.addEventListener('mousedown', (e) => this.startDrag(e));
            firstCard.addEventListener('touchstart', (e) => this.startDrag(e));
        }
    },

    startDrag: function(e) {
        this.isDragging = true;
        this.dragCard = e.currentTarget;
        this.dragCard.classList.add('dragging');

        this.startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        this.startY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;

        // Bind handlers so they can be properly removed later
        this.boundDrag = this.drag.bind(this);
        this.boundEndDrag = this.endDrag.bind(this);

        document.addEventListener('mousemove', this.boundDrag);
        document.addEventListener('touchmove', this.boundDrag);
        document.addEventListener('mouseup', this.boundEndDrag);
        document.addEventListener('touchend', this.boundEndDrag);
    },

    drag: function(e) {
        if (!this.isDragging) return;

        e.preventDefault();
        this.currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        this.currentY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;

        const deltaX = this.currentX - this.startX;
        const deltaY = this.currentY - this.startY;
        const rotation = deltaX * 0.1;

        this.dragCard.style.transform = `translateX(${deltaX}px) translateY(${deltaY}px) rotate(${rotation}deg)`;
        this.dragCard.style.opacity = 1 - Math.abs(deltaX) / 300;
    },

    endDrag: function(e) {
        if (!this.isDragging) return;

        this.isDragging = false;
        this.dragCard.classList.remove('dragging');

        const deltaX = this.currentX - this.startX;

        if (Math.abs(deltaX) > 100) {
            // Swiped
            if (deltaX > 0) {
                this.interestedEvent();
            } else {
                this.passEvent();
            }
        } else {
            // Snap back
            this.dragCard.style.transform = '';
            this.dragCard.style.opacity = '';
        }

        // Remove bound event listeners
        document.removeEventListener('mousemove', this.boundDrag);
        document.removeEventListener('touchmove', this.boundDrag);
        document.removeEventListener('mouseup', this.boundEndDrag);
        document.removeEventListener('touchend', this.boundEndDrag);
    }
};

// Global functions
function likeCard() {
    Discovery.likeCard();
}

function rejectCard() {
    Discovery.rejectCard();
}

function superLikeCard() {
    Discovery.superLikeCard();
}

function interestedEvent() {
    Discovery.interestedEvent();
}

function passEvent() {
    Discovery.passEvent();
}

function confirmEvent() {
    Discovery.confirmEvent();
}

function closeMatch() {
    Discovery.closeMatch();
}

window.Discovery = Discovery;
