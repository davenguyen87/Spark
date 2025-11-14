/**
 * UI Utilities - Notifications, Dynamic Island, Loading, etc.
 */

const UI = {
    init: function() {
        console.log('UI module initialized');
        this.initDynamicIsland();
    },

    initDynamicIsland: function() {
        const island = document.getElementById('dynamicIsland');
        island.addEventListener('click', () => {
            if (AppState.dynamicIslandExpanded) {
                this.collapseDynamicIsland();
            } else {
                this.expandDynamicIsland();
                setTimeout(() => {
                    this.collapseDynamicIsland();
                }, 3000);
            }
        });
    },

    showNotification: function(message) {
        this.expandDynamicIsland();
        const islandContent = document.querySelector('.island-content');

        // Create elements safely to prevent XSS
        const container = document.createElement('div');
        container.style.display = 'flex';
        container.style.alignItems = 'center';
        container.style.gap = '10px';

        const icon = document.createElement('div');
        icon.style.fontSize = '24px';
        icon.textContent = '✅';

        const text = document.createElement('div');
        text.style.fontWeight = '600';
        text.textContent = message;  // Safe - uses textContent instead of innerHTML

        container.appendChild(icon);
        container.appendChild(text);

        islandContent.innerHTML = '';
        islandContent.appendChild(container);

        setTimeout(() => {
            this.collapseDynamicIsland();
        }, 3000);
    },

    expandDynamicIsland: function() {
        const island = document.getElementById('dynamicIsland');
        island.classList.add('expanded');
        AppState.dynamicIslandExpanded = true;
    },

    collapseDynamicIsland: function() {
        const island = document.getElementById('dynamicIsland');
        island.classList.remove('expanded');
        AppState.dynamicIslandExpanded = false;
    },

    showLoading: function() {
        document.getElementById('loading').classList.add('show');
    },

    hideLoading: function() {
        document.getElementById('loading').classList.remove('show');
    }
};

window.UI = UI;
