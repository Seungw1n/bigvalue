/**
 * Customer Studies Detail Page - API Integration
 * Fetches and displays a single customer studies article from BigValue API
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
        if (thumbnail && thumbnail.url) {
            return thumbnail.url;
        }
        if (thumbnail && thumbnail.id) {
            return `${API_CONFIG.imageBaseUrl}/${thumbnail.id}`;
        }
        return null;
    }

    // ==========================================
    // UI State Management
    // ==========================================

    function showLoading() {
        if (elements.loading) elements.loading.style.display = 'block';
        if (elements.error) elements.error.style.display = 'none';
        if (elements.article) elements.article.style.display = 'none';
    }

    function showError() {
        if (elements.loading) elements.loading.style.display = 'none';
        if (elements.error) elements.error.style.display = 'block';
        if (elements.article) elements.article.style.display = 'none';
    }

    function showContent() {
        if (elements.loading) elements.loading.style.display = 'none';
        if (elements.error) elements.error.style.display = 'none';
        if (elements.article) elements.article.style.display = 'block';
    }

    // ==========================================
    // API Functions
    // ==========================================

    /**
     * Fetch article by ID from API
     */
    async function fetchArticleById(id) {
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
     * Render article to the DOM
     */
    function renderArticle(article) {
        // Set breadcrumb title
        if (elements.breadcrumbTitle) {
            const shortTitle = article.title.length > 30
                ? article.title.substring(0, 30) + '...'
                : article.title;
            elements.breadcrumbTitle.textContent = shortTitle;
        }

        // Set title
        if (elements.title) {
            elements.title.textContent = article.title;
        }

        // Set date
        if (elements.date) {
            const formattedDate = formatDate(article.createAt);
            elements.date.textContent = formattedDate;
            elements.date.setAttribute('datetime', article.createAt);
        }

        // Set author (if available)
        if (elements.authorName && article.author) {
            elements.authorName.textContent = article.author;
        } else if (elements.authorName) {
            elements.authorName.textContent = 'BigValue';
        }

        // Set thumbnail
        if (elements.thumbnail) {
            const thumbnailUrl = getThumbnailUrl(article.thumbnail);
            if (thumbnailUrl) {
                elements.thumbnail.innerHTML = `
                    <img src="${thumbnailUrl}" alt="${article.title}" class="article-detail__thumbnail-img">
                `;
            } else {
                elements.thumbnail.style.display = 'none';
            }
        }

        // Set summary
        if (elements.summary && article.summary) {
            elements.summary.textContent = article.summary;
        } else if (elements.summary) {
            elements.summary.style.display = 'none';
        }

        // Set body content
        if (elements.body) {
            if (article.content) {
                // If content is HTML, render it
                elements.body.innerHTML = article.content;
            } else if (article.body) {
                elements.body.innerHTML = article.body;
            } else {
                elements.body.innerHTML = '<p>내용이 없습니다.</p>';
            }
        }
    }

    // ==========================================
    // Main Initialization
    // ==========================================

    /**
     * Load and display article
     */
    async function loadArticle() {
        try {
            const articleId = getArticleIdFromUrl();

            if (!articleId) {
                console.error('❌ No article ID provided in URL');
                showError();
                return;
            }

            console.log('📄 Loading article with ID:', articleId);
            showLoading();

            const response = await fetchArticleById(articleId);

            console.log('📦 Full API Response:', response);

            // Extract article from API response
            let article = null;
            if (response?.data) {
                article = response.data;
            } else if (response) {
                article = response;
            }

            if (!article) {
                throw new Error('No article data in response');
            }

            console.log('✅ Article loaded:', article);

            renderArticle(article);
            showContent();

        } catch (error) {
            console.error('❌ Error loading article:', error);
            showError();
        }
    }

    // ==========================================
    // Initialize on DOM Ready
    // ==========================================

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadArticle);
    } else {
        loadArticle();
    }

})();
