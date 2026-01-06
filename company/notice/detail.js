/**
 * Notice Detail Page - API Integration
 * Fetches and displays a single notice from BigValue API
 */

(function() {
    'use strict';

    // ==========================================
    // Configuration
    // ==========================================
    const API_CONFIG = {
        endpoint: 'https://rest.dev.bigvalue.ai/home/press-release/notice',
        imageBaseUrl: 'https://rest.dev.bigvalue.ai/home/press-release/notice/thumbnail'
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
     * Get notice ID from URL parameters
     */
    function getNoticeIdFromUrl() {
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
     * Fetch notice detail from API
     */
    async function fetchNoticeDetail(id) {
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
     * Render notice detail to the DOM
     */
    function renderNoticeDetail(noticeData) {
        // Extract notice from response
        // API structure: { message: "process success.", data: {...} }
        const notice = noticeData?.data || noticeData;

        if (!notice) {
            throw new Error('No notice data found');
        }

        // Set breadcrumb title
        const truncatedTitle = notice.title.length > 30
            ? notice.title.substring(0, 30) + '...'
            : notice.title;
        elements.breadcrumbTitle.textContent = truncatedTitle;

        // Set title
        elements.title.textContent = notice.title;

        // Set date
        const formattedDate = formatDate(notice.createAt);
        elements.date.textContent = formattedDate;
        elements.date.setAttribute('datetime', notice.createAt);

        // Set author
        if (notice.creator) {
            elements.authorName.textContent = notice.creator.nickname || notice.creator.username;
        }

        // Set thumbnail
        const thumbnailUrl = getThumbnailUrl(notice.thumbnail);
        if (thumbnailUrl) {
            const img = document.createElement('img');
            img.src = thumbnailUrl;
            img.alt = notice.title;
            img.className = 'article-detail__thumbnail-img';
            elements.thumbnail.appendChild(img);
        } else {
            elements.thumbnail.style.display = 'none';
        }

        // Set summary
        if (notice.summary) {
            elements.summary.textContent = notice.summary;
        } else {
            elements.summary.style.display = 'none';
        }

        // Set body content (if available)
        // Note: The API response shown doesn't include body content
        // This is prepared for future API updates
        if (notice.content || notice.body) {
            elements.body.innerHTML = notice.content || notice.body;
        } else {
            elements.body.style.display = 'none';
        }

        // Update page title
        document.title = `${notice.title} - Notice - BigValue`;
    }

    // ==========================================
    // Main Initialization
    // ==========================================

    /**
     * Load and display notice detail
     */
    async function loadNoticeDetail() {
        try {
            // Get notice ID from URL
            const noticeId = getNoticeIdFromUrl();

            if (!noticeId) {
                console.error('❌ No notice ID provided in URL');
                showError();
                return;
            }

            showLoading();

            const response = await fetchNoticeDetail(noticeId);

            // Debug: Log full response to check structure
            console.log('📦 Full API Response:', response);
            console.log('📦 Response Message:', response?.message);
            console.log('📦 Response Data:', response?.data);

            renderNoticeDetail(response);
            showContent();

            console.log('✅ Notice detail loaded successfully');
        } catch (error) {
            console.error('❌ Error loading notice detail:', error);
            showError();
        }
    }

    // ==========================================
    // Initialize on DOM Ready
    // ==========================================

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadNoticeDetail);
    } else {
        loadNoticeDetail();
    }

    // Export for potential external use
    window.NoticeDetailAPI = {
        reload: loadNoticeDetail,
        fetchNoticeDetail: fetchNoticeDetail
    };

})();
