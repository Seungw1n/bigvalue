/**
 * Data Products Page - Filtering and Search Functionality
 * Loads data products from JSON and provides interactive filtering
 */

// State
let allProducts = [];
let currentCategory = 'all';
let currentSearchTerm = '';

// DOM Elements
const productsContainer = document.getElementById('products-container');
const productCountEl = document.getElementById('product-count');
const noResultsEl = document.getElementById('no-results');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const filterTabs = document.querySelectorAll('.data-products-filter__tab');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupEventListeners();
});

// Load products from JSON
async function loadProducts() {
    try {
        const response = await fetch('data-products-data.json');
        const data = await response.json();

        // Flatten products with category info
        allProducts = [];
        data.categories.forEach(category => {
            category.products.forEach(product => {
                allProducts.push({
                    ...product,
                    categoryId: category.id,
                    categoryName: category.name,
                    categoryIcon: category.icon
                });
            });
        });

        renderProducts();
    } catch (error) {
        console.error('Error loading products:', error);
        productsContainer.innerHTML = '<div class="data-products-grid__error">데이터를 불러오는 중 오류가 발생했습니다.</div>';
    }
}

// Setup event listeners
function setupEventListeners() {
    // Category filter tabs
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.dataset.category;
            setActiveTab(tab);
            filterByCategory(category);
        });
    });

    // Search input
    searchInput.addEventListener('input', (e) => {
        currentSearchTerm = e.target.value.toLowerCase().trim();
        renderProducts();
    });

    // Search button
    searchBtn.addEventListener('click', () => {
        currentSearchTerm = searchInput.value.toLowerCase().trim();
        renderProducts();
    });

    // Enter key in search
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            currentSearchTerm = searchInput.value.toLowerCase().trim();
            renderProducts();
        }
    });
}

// Set active tab
function setActiveTab(activeTab) {
    filterTabs.forEach(tab => {
        tab.classList.remove('data-products-filter__tab--active');
    });
    activeTab.classList.add('data-products-filter__tab--active');
}

// Filter by category
function filterByCategory(category) {
    currentCategory = category;
    renderProducts();
}

// Get filtered products
function getFilteredProducts() {
    return allProducts.filter(product => {
        // Category filter
        const categoryMatch = currentCategory === 'all' || product.categoryId === currentCategory;

        // Search filter
        const searchMatch = !currentSearchTerm ||
            product.name.toLowerCase().includes(currentSearchTerm) ||
            product.description.toLowerCase().includes(currentSearchTerm) ||
            product.tags.some(tag => tag.toLowerCase().includes(currentSearchTerm)) ||
            product.features.some(feature => feature.toLowerCase().includes(currentSearchTerm));

        return categoryMatch && searchMatch;
    });
}

// Render products
function renderProducts() {
    const filteredProducts = getFilteredProducts();

    // Update count
    productCountEl.textContent = filteredProducts.length;

    // Show/hide no results
    if (filteredProducts.length === 0) {
        productsContainer.style.display = 'none';
        noResultsEl.style.display = 'flex';
        return;
    } else {
        productsContainer.style.display = 'grid';
        noResultsEl.style.display = 'none';
    }

    // Render product cards
    productsContainer.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
}

// Create product card HTML
function createProductCard(product) {
    return `
        <div class="product-card" data-category="${product.categoryId}">
            <div class="product-card__header">
                <span class="product-card__icon">${product.categoryIcon}</span>
                <span class="product-card__category">${product.categoryName}</span>
            </div>
            <h3 class="product-card__title">${product.name}</h3>
            <p class="product-card__description">${product.description}</p>
            <div class="product-card__tags">
                ${product.tags.map(tag => `<span class="product-card__tag">${tag}</span>`).join('')}
            </div>
            <div class="product-card__features">
                <p class="product-card__features-title">주요 데이터:</p>
                <ul class="product-card__features-list">
                    ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            <button class="product-card__button btn btn--outline btn--small">
                상세 정보 문의
            </button>
        </div>
    `;
}
