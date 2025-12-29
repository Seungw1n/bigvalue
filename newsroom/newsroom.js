/**
 * Newsroom Page - API Integration
 * Fetches and displays press releases from BigValue API
 */

(function() {
    'use strict';

    // ==========================================
    // Configuration
    // ==========================================
    const API_CONFIG = {
        endpoint: 'https://rest.dev.bigvalue.ai/home/press-release/news-room',
        imageBaseUrl: 'https://rest.dev.bigvalue.ai/home/press-release/news-room/thumbnail',
        defaultPage: 1,
        defaultSize: 10
    };

    // ==========================================
    // DOM Elements
    // ==========================================
    const elements = {
        loading: document.getElementById('newsroom-loading'),
        error: document.getElementById('newsroom-error'),
        list: document.getElementById('newsroom-list')
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
     * Get thumbnail image URL
     */
    function getThumbnailUrl(thumbnail) {
        if (!thumbnail || !thumbnail.id) {
            // Return placeholder image if no thumbnail
            return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="18" fill="%23999"%3ENo Image%3C/text%3E%3C/svg%3E';
        }
        return `${API_CONFIG.imageBaseUrl}/${thumbnail.id}`;
    }

    /**
     * Create article card element
     */
    function createArticleCard(article) {
        const card = document.createElement('article');
        card.className = 'newsroom-card';
        card.style.cursor = 'pointer';

        const thumbnailUrl = getThumbnailUrl(article.thumbnail);
        const formattedDate = formatDate(article.createAt);

        card.innerHTML = `
            <div class="newsroom-card__image">
                <img src="${thumbnailUrl}" alt="${article.title}" loading="lazy">
            </div>
            <div class="newsroom-card__content">
                <time class="newsroom-card__date" datetime="${article.createAt}">${formattedDate}</time>
                <h3 class="newsroom-card__title">${article.title}</h3>
                <p class="newsroom-card__summary">${article.summary || ''}</p>
            </div>
        `;

        // Add click handler to navigate to detail page
        card.addEventListener('click', () => {
            window.location.href = `/newsroom/detail.html?id=${article.id}`;
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
     * Fetch articles from API
     */
    async function fetchArticles(page = API_CONFIG.defaultPage, size = API_CONFIG.defaultSize) {
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
     * Render articles to the DOM
     */
    function renderArticles(articles) {
        // Clear existing content
        elements.list.innerHTML = '';

        if (!articles || articles.length === 0) {
            elements.list.innerHTML = '<p class="newsroom-empty">게시글이 없습니다.</p>';
            return;
        }

        // Create and append article cards
        articles.forEach(article => {
            const card = createArticleCard(article);
            elements.list.appendChild(card);
        });
    }

    // ==========================================
    // Main Initialization
    // ==========================================

    /**
     * Load and display articles
     */
    async function loadArticles() {
        try {
            showLoading();

            const response = await fetchArticles();

            // Debug: Log full response to check structure
            console.log('📦 Full API Response:', response);
            console.log('📦 Response Message:', response?.message);
            console.log('📦 Response Page:', response?.page);

            // Extract articles from API response
            // API structure: { message: "process success.", page: { content: [...] } }
            let articles = [];
            if (response?.page?.content) {
                articles = response.page.content;
            } else if (response?.data?.page?.content) {
                articles = response.data.page.content;
            } else if (response?.data?.content) {
                articles = response.data.content;
            } else if (response?.content) {
                articles = response.content;
            } else if (Array.isArray(response?.data)) {
                articles = response.data;
            } else if (Array.isArray(response)) {
                articles = response;
            }

            console.log('📄 Extracted articles:', articles);
            console.log('📄 Articles count:', articles.length);

            renderArticles(articles);
            showContent();

            console.log('✅ Newsroom articles loaded successfully:', articles.length);
        } catch (error) {
            console.error('❌ Error loading newsroom articles:', error);
            showError();
        }
    }

    // ==========================================
    // Initialize on DOM Ready
    // ==========================================

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadArticles);
    } else {
        loadArticles();
    }

    // Export for potential external use
    window.NewsroomAPI = {
        reload: loadArticles,
        fetchArticles: fetchArticles
    };

})();
