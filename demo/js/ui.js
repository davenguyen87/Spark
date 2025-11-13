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
        islandContent.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <div style="font-size: 24px;">✅</div>
                <div style="font-weight: 600;">${message}</div>
            </div>
        `;

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
