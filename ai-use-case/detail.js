/**
 * AI Use Case Detail Page - API Integration
 * Fetches and displays a single AI use case article from BigValue API
 */

(function() {
    'use strict';

    // ==========================================
    // Configuration
    // ==========================================
    const API_CONFIG = {
        endpoint: 'https://rest.dev.bigvalue.ai/home/press-release/ai-use-case',
        imageBaseUrl: 'https://rest.dev.bigvalue.ai/home/press-release/ai-use-case/thumbnail'
    };

    // ==========================================
    // DOM Elements
    // ==========================================
    const elements = {
        loading: document.getElementById('detail-loading'),
        error: document.getElementById('detail-error'),
        article: document.getElementById('article-detail'),
        breadcrumbTitle: document.getElementById('article-breadcrumb-title'),
        title: document.getElementById('article-title'),
        date: document.getElementById('article-date'),
        authorName: document.getElementById('article-author-name'),
        thumbnail: document.getElementById('article-thumbnail'),
        summary: document.getElementById('article-summary'),
        body: document.getElementById('article-body')
    };

    // ==========================================
    // Utility Functions
    // ==========================================

    /**
     * Get article ID from URL parameters
     */
    function getArticleIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    /**
     * Format date string to YYYY-MM-DD HH:MM
     */
    function formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }

    /**
     * Get thumbnail image URL
     */
    function getThumbnailUrl(thumbnail) {
        if (!thumbnail || !thumbnail.id) {
            return null;
        }
        return `${API_CONFIG.imageBaseUrl}/${thumbnail.id}`;
    }

    // ==========================================
    // UI State Management
    // ==========================================

    function showLoading() {
        elements.loading.style.display = 'block';
        elements.error.style.display = 'none';
        elements.article.style.display = 'none';
    }

    function showError() {
        elements.loading.style.display = 'none';
        elements.error.style.display = 'block';
        elements.article.style.display = 'none';
    }

    function showContent() {
        elements.loading.style.display = 'none';
        elements.error.style.display = 'none';
        elements.article.style.display = 'block';
    }

    // ==========================================
    // API Functions
    // ==========================================

    /**
     * Fetch article detail from API
     */
    async function fetchArticleDetail(id) {
        const url = `${API_CONFIG.endpoint}/${id}`;

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
     * Render article detail to the DOM
     */
    function renderArticleDetail(articleData) {
        // Extract article from response
        // API structure: { message: "process success.", data: {...} }
        const article = articleData?.data || articleData;

        if (!article) {
            throw new Error('No article data found');
        }

        // Set breadcrumb title
        const truncatedTitle = article.title.length > 30
            ? article.title.substring(0, 30) + '...'
            : article.title;
        elements.breadcrumbTitle.textContent = truncatedTitle;

        // Set title
        elements.title.textContent = article.title;

        // Set date
        const formattedDate = formatDate(article.createAt);
        elements.date.textContent = formattedDate;
        elements.date.setAttribute('datetime', article.createAt);

        // Set author
        if (article.creator) {
            elements.authorName.textContent = article.creator.nickname || article.creator.username;
        }

        // Set thumbnail
        const thumbnailUrl = getThumbnailUrl(article.thumbnail);
        if (thumbnailUrl) {
            const img = document.createElement('img');
            img.src = thumbnailUrl;
            img.alt = article.title;
            img.className = 'article-detail__thumbnail-img';
            elements.thumbnail.appendChild(img);
        } else {
            elements.thumbnail.style.display = 'none';
        }

        // Set summary
        if (article.summary) {
            elements.summary.textContent = article.summary;
        } else {
            elements.summary.style.display = 'none';
        }

        // Set body content (if available)
        // Note: The API response shown doesn't include body content
        // This is prepared for future API updates
        if (article.content || article.body) {
            elements.body.innerHTML = article.content || article.body;
        } else {
            elements.body.style.display = 'none';
        }

        // Update page title
        document.title = `${article.title} - AI Use Case - BigValue`;
    }

    // ==========================================
    // Main Initialization
    // ==========================================

    /**
     * Load and display article detail
     */
    async function loadArticleDetail() {
        try {
            // Get article ID from URL
            const articleId = getArticleIdFromUrl();

            if (!articleId) {
                console.error('❌ No article ID provided in URL');
                showError();
                return;
            }

            showLoading();

            const response = await fetchArticleDetail(articleId);

            // Debug: Log full response to check structure
            console.log('📦 Full API Response:', response);
            console.log('📦 Response Message:', response?.message);
            console.log('📦 Response Data:', response?.data);

            renderArticleDetail(response);
            showContent();

            console.log('✅ Article detail loaded successfully');
        } catch (error) {
            console.error('❌ Error loading article detail:', error);
            showError();
        }
    }

    // ==========================================
    // Initialize on DOM Ready
    // ==========================================

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadArticleDetail);
    } else {
        loadArticleDetail();
    }

    // Export for potential external use
    window.AIUseCaseDetailAPI = {
        reload: loadArticleDetail,
        fetchArticleDetail: fetchArticleDetail
    };

})();
