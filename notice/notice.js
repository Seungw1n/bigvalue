/**
 * Notice Page - API Integration
 * Fetches and displays notices from BigValue API
 */

(function() {
    'use strict';

    // ==========================================
    // Configuration
    // ==========================================
    const API_CONFIG = {
        endpoint: 'https://rest.dev.bigvalue.ai/home/press-release/notice',
        imageBaseUrl: 'https://rest.dev.bigvalue.ai/home/press-release/notice/thumbnail',
        defaultPage: 1,
        defaultSize: 10
    };

    // ==========================================
    // DOM Elements
    // ==========================================
    const elements = {
        loading: document.getElementById('notice-loading'),
        error: document.getElementById('notice-error'),
        list: document.getElementById('notice-list')
    };

    // ==========================================
    // Utility Functions
    // ==========================================

    /**
     * Format date string to YYYY-MM-DD
     */
    function formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    /**
     * Create notice card element (text-only, no thumbnail)
     */
    function createNoticeCard(notice) {
        const card = document.createElement('article');
        card.className = 'newsroom-card newsroom-card--text-only';
        card.style.cursor = 'pointer';

        const formattedDate = formatDate(notice.createAt);

        card.innerHTML = `
            <div class="newsroom-card__content">
                <time class="newsroom-card__date" datetime="${notice.createAt}">${formattedDate}</time>
                <h3 class="newsroom-card__title">${notice.title}</h3>
                <p class="newsroom-card__summary">${notice.summary || ''}</p>
            </div>
        `;

        // Add click handler to navigate to detail page
        card.addEventListener('click', () => {
            window.location.href = `detail.html?id=${notice.id}`;
        });

        return card;
    }

    // ==========================================
    // UI State Management
    // ==========================================

    function showLoading() {
        elements.loading.style.display = 'block';
        elements.error.style.display = 'none';
        elements.list.style.display = 'none';
    }

    function showError() {
        elements.loading.style.display = 'none';
        elements.error.style.display = 'block';
        elements.list.style.display = 'none';
    }

    function showContent() {
        elements.loading.style.display = 'none';
        elements.error.style.display = 'none';
        elements.list.style.display = 'grid';
    }

    // ==========================================
    // API Functions
    // ==========================================

    /**
     * Fetch notices from API
     */
    async function fetchNotices(page = API_CONFIG.defaultPage, size = API_CONFIG.defaultSize) {
        const url = new URL(API_CONFIG.endpoint);
        url.searchParams.append('page', page);
        url.searchParams.append('size', size);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    }

    /**
     * Render notices to the DOM
     */
    function renderNotices(notices) {
        elements.list.innerHTML = '';

        if (!notices || notices.length === 0) {
            elements.list.innerHTML = '<p class="newsroom-empty">공지사항이 없습니다.</p>';
            return;
        }

        notices.forEach(notice => {
            const card = createNoticeCard(notice);
            elements.list.appendChild(card);
        });
    }

    // ==========================================
    // Main Initialization
    // ==========================================

    /**
     * Load and display notices
     */
    async function loadNotices() {
        try {
            showLoading();

            const response = await fetchNotices();

            // Debug: Log full response to check structure
            console.log('📦 Full API Response:', response);
            console.log('📦 Response Message:', response?.message);
            console.log('📦 Response Page:', response?.page);

            // Extract notices from API response
            // API structure: { message: "process success.", page: { content: [...] } }
            let notices = [];
            if (response?.page?.content) {
                notices = response.page.content;
            } else if (response?.data?.page?.content) {
                notices = response.data.page.content;
            } else if (response?.data?.content) {
                notices = response.data.content;
            } else if (response?.content) {
                notices = response.content;
            } else if (Array.isArray(response?.data)) {
                notices = response.data;
            } else if (Array.isArray(response)) {
                notices = response;
            }

            console.log('📄 Extracted notices:', notices);
            console.log('📄 Notices count:', notices.length);

            renderNotices(notices);
            showContent();

            console.log('✅ Notices loaded successfully:', notices.length);
        } catch (error) {
            console.error('❌ Error loading notices:', error);
            showError();
        }
    }

    // ==========================================
    // Initialize on DOM Ready
    // ==========================================

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadNotices);
    } else {
        loadNotices();
    }

    // Export for potential external use
    window.NoticeAPI = {
        reload: loadNotices,
        fetchNotices: fetchNotices
    };

})();
