/**
 * BigValue Homepage - Main JavaScript
 * Pure Vanilla JavaScript implementation
 * Updated with Tab switching and Auto-scrolling cards
 */

(function() {
    'use strict';

    // ==========================================
    // Constants & Configuration
    // ==========================================
    const CARDS_DATA = [
        {
            id: 1,
            icon: '🏢',
            category: 'Flow',
            title: '부동산 시세 분석',
            description: '실시간 부동산 데이터를 활용하여 시세를 분석하고 트렌드를 파악하세요.'
        },
        {
            id: 2,
            icon: '📊',
            category: 'Flow',
            title: '데이터 시각화',
            description: '복잡한 데이터를 직관적인 차트와 그래프로 표현합니다.'
        },
        {
            id: 3,
            icon: '🤖',
            category: 'Flow',
            title: 'AI 예측 분석',
            description: 'AI 기반 예측 모델로 미래 트렌드를 예측합니다.'
        },
        {
            id: 4,
            icon: '🏘️',
            category: 'Flow',
            title: '지역 분석',
            description: '특정 지역의 경제 데이터와 인구 통계를 분석합니다.'
        },
        {
            id: 5,
            icon: '💹',
            category: 'Flow',
            title: '투자 인사이트',
            description: '데이터 기반 투자 인사이트를 제공합니다.'
        },
        {
            id: 6,
            icon: '📈',
            category: 'Flow',
            title: '시장 트렌드',
            description: '최신 시장 트렌드와 분석 리포트를 확인하세요.'
        },
        {
            id: 7,
            icon: '💰',
            category: 'Flow',
            title: '금융 분석',
            description: '금융 데이터를 기반으로 심층 분석을 제공합니다.'
        },
        {
            id: 8,
            icon: '🏪',
            category: 'Flow',
            title: '상권 분석',
            description: '상권 데이터를 분석하여 최적의 입지를 찾아드립니다.'
        },
        {
            id: 9,
            icon: '🌐',
            category: 'Flow',
            title: '글로벌 시장 분석',
            description: '전 세계 시장 동향을 실시간으로 분석합니다.'
        },
        {
            id: 10,
            icon: '📱',
            category: 'Flow',
            title: '모바일 분석',
            description: '모바일 환경에 최적화된 분석 도구를 제공합니다.'
        }
    ];

    // ==========================================
    // Utility Functions
    // ==========================================

    /**
     * Create an element with classes and attributes
     */
    function createElement(tag, classes = [], attributes = {}) {
        const element = document.createElement(tag);

        if (classes.length > 0) {
            element.classList.add(...classes);
        }

        Object.keys(attributes).forEach(key => {
            element.setAttribute(key, attributes[key]);
        });

        return element;
    }

    /**
     * Debounce function for performance optimization
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Throttle function for scroll events
     */
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // ==========================================
    // Header Functionality
    // ==========================================
    class Header {
        constructor() {
            this.header = document.querySelector('.header');
            this.lastScrollY = window.scrollY;
            this.init();
        }

        init() {
            this.handleScroll();
            window.addEventListener('scroll', throttle(() => this.handleScroll(), 100));
        }

        handleScroll() {
            const currentScrollY = window.scrollY;

            // Add shadow on scroll
            if (currentScrollY > 10) {
                this.header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                this.header.style.boxShadow = 'none';
            }

            this.lastScrollY = currentScrollY;
        }
    }

    // ==========================================
    // Smooth Scroll for Navigation
    // ==========================================
    class SmoothScroll {
        constructor() {
            this.init();
        }

        init() {
            const links = document.querySelectorAll('a[href^="#"]');
            links.forEach(link => {
                link.addEventListener('click', (e) => this.handleClick(e));
            });
        }

        handleClick(e) {
            const href = e.currentTarget.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    }

    // ==========================================
    // Data Cards Generator with Auto Scroll
    // ==========================================
    class DataCards {
        constructor() {
            this.row1 = document.getElementById('cards-row-1');
            this.row2 = document.getElementById('cards-row-2');
            this.init();
        }

        init() {
            if (!this.row1 || !this.row2) return;
            this.renderCards();
        }

        renderCards() {
            // Row 1: First 5 cards (duplicated for infinite scroll)
            const row1Cards = CARDS_DATA.slice(0, 5);
            [...row1Cards, ...row1Cards].forEach(cardData => {
                const card = this.createCard(cardData);
                this.row1.appendChild(card);
            });

            // Row 2: Next 5 cards (duplicated for infinite scroll)
            const row2Cards = CARDS_DATA.slice(5, 10);
            [...row2Cards, ...row2Cards].forEach(cardData => {
                const card = this.createCard(cardData);
                this.row2.appendChild(card);
            });
        }

        createCard(data) {
            // Create card wrapper
            const card = createElement('div', ['card']);

            // Create icon container
            const iconContainer = createElement('div', ['card__icon']);
            iconContainer.textContent = data.icon;

            // Create content container
            const content = createElement('div', ['card__content']);

            // Create category
            if (data.category) {
                const category = createElement('span', ['card__category']);
                category.textContent = data.category;
                content.appendChild(category);
            }

            // Create title
            const title = createElement('h3', ['card__title']);
            title.textContent = data.title;

            // Create description
            const description = createElement('p', ['card__description']);
            description.textContent = data.description;

            // Assemble card
            content.appendChild(title);
            content.appendChild(description);
            card.appendChild(iconContainer);
            card.appendChild(content);

            return card;
        }
    }

    // ==========================================
    // Flow Tabs (API Section)
    // ==========================================
    class FlowTabs {
        constructor() {
            this.tabs = document.querySelectorAll('.flow-tabs__item');
            this.flowImage = document.getElementById('flow-image');
            this.imageMap = {
                '1': 'images/call-data.png',
                '2': 'images/analysis-and-visualization.png',
                '3': 'images/get-insight.png'
            };
            this.init();
        }

        init() {
            if (this.tabs.length === 0) return;

            this.tabs.forEach(tab => {
                tab.addEventListener('click', (e) => this.handleTabClick(e));
            });
        }

        handleTabClick(e) {
            const clickedTab = e.currentTarget;

            // Remove active class from all tabs
            this.tabs.forEach(tab => {
                tab.classList.remove('flow-tabs__item--active');
            });

            // Add active class to clicked tab
            clickedTab.classList.add('flow-tabs__item--active');

            // Change image based on tab
            const tabNumber = clickedTab.getAttribute('data-tab');
            if (this.flowImage && this.imageMap[tabNumber]) {
                this.flowImage.src = this.imageMap[tabNumber];
                this.flowImage.alt = `Flow 화면 예시 - 탭 ${tabNumber}`;
            }
        }
    }

    // ==========================================
    // Service Guide Section
    // ==========================================
    // Note: Service guide image is now loaded directly in HTML
    // No JavaScript initialization needed

    // ==========================================
    // Intersection Observer for Animations
    // ==========================================
    class ScrollAnimations {
        constructor() {
            this.options = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };
            this.init();
        }

        init() {
            if (!('IntersectionObserver' in window)) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            }, this.options);

            // Observe sections
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(section);
            });

            // Add CSS for animation
            const style = document.createElement('style');
            style.textContent = `
                .animate-in {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
            `;
            document.head.appendChild(style);
        }
    }

    // ==========================================
    // Inquiry Modal
    // ==========================================
    class InquiryModal {
        constructor() {
            this.modal = document.getElementById('inquiry-modal');
            this.form = document.getElementById('inquiry-form');
            this.closeBtn = document.getElementById('modal-close');
            this.overlay = this.modal?.querySelector('.modal__overlay');
            this.inquiryButtons = document.querySelectorAll('.btn:not([href])');
            this.apiEndpoint = 'https://rest.dev.bigvalue.ai/home/inquire';
            this.init();
        }

        init() {
            if (!this.modal || !this.form) return;

            // Add event listeners
            this.inquiryButtons.forEach(button => {
                const text = button.textContent.trim();
                if (text.includes('문의')) {
                    button.addEventListener('click', () => this.open());
                }
            });

            this.closeBtn?.addEventListener('click', () => this.close());
            this.overlay?.addEventListener('click', () => this.close());
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));

            // Close on ESC key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.modal.style.display !== 'none') {
                    this.close();
                }
            });
        }

        open() {
            if (!this.modal) return;
            this.modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';

            // Focus first input
            const firstInput = this.form.querySelector('input');
            if (firstInput) {
                setTimeout(() => firstInput.focus(), 100);
            }
        }

        close() {
            if (!this.modal) return;
            this.modal.style.display = 'none';
            document.body.style.overflow = '';
            this.form.reset();
        }

        async handleSubmit(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this.form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                mobile: formData.get('mobile') || '',
                affiliation: formData.get('affiliation') || '',
                content: formData.get('content'),
                agreePrivacyPolicy: formData.get('agreePrivacyPolicy') === 'on'
            };

            // Debug: Log form data
            console.log('📤 Submitting inquiry data:', data);

            // Validate required fields
            if (!data.name || !data.email || !data.content || !data.agreePrivacyPolicy) {
                alert('필수 항목을 모두 입력해주세요.');
                return;
            }

            // Disable submit button
            const submitBtn = this.form.querySelector('.modal__submit');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = '전송 중...';
            }

            try {
                console.log('📡 Sending request to:', this.apiEndpoint);

                const response = await fetch(this.apiEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                console.log('📥 Response status:', response.status);
                console.log('📥 Response headers:', response.headers);

                // Try to get response text first
                const responseText = await response.text();
                console.log('📥 Response text:', responseText);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}, body: ${responseText}`);
                }

                // Parse JSON if response is ok
                let result;
                try {
                    result = JSON.parse(responseText);
                } catch (parseError) {
                    console.error('❌ JSON parse error:', parseError);
                    result = { message: responseText };
                }

                console.log('✅ Inquiry submitted successfully:', result);

                alert('문의가 성공적으로 접수되었습니다.\n빠른 시일 내에 답변 드리겠습니다.');
                this.close();
            } catch (error) {
                console.error('❌ Error submitting inquiry:', error);
                console.error('❌ Error details:', {
                    message: error.message,
                    stack: error.stack
                });
                alert('문의 접수 중 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.\n\n에러: ' + error.message);
            } finally {
                // Re-enable submit button
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = '문의하기';
                }
            }
        }
    }

    // ==========================================
    // Performance Optimization
    // ==========================================
    class PerformanceOptimization {
        constructor() {
            this.init();
        }

        init() {
            // Lazy load images
            this.lazyLoadImages();

            // Preload critical resources
            this.preloadCriticalResources();
        }

        lazyLoadImages() {
            if ('loading' in HTMLImageElement.prototype) {
                const images = document.querySelectorAll('img[loading="lazy"]');
                images.forEach(img => {
                    img.src = img.dataset.src;
                });
            } else {
                // Fallback for browsers that don't support lazy loading
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/lazysizes@5.3.2/lazysizes.min.js';
                document.body.appendChild(script);
            }
        }

        preloadCriticalResources() {
            // Preload fonts
            const fonts = [
                'Pretendard Variable',
                'Mona Sans VF'
            ];

            fonts.forEach(font => {
                const link = createElement('link', [], {
                    rel: 'preload',
                    as: 'font',
                    type: 'font/woff2',
                    crossorigin: 'anonymous'
                });
                document.head.appendChild(link);
            });
        }
    }

    // ==========================================
    // Auto Scroll Animation Controller
    // ==========================================
    class AutoScrollController {
        constructor() {
            this.scrollElements = document.querySelectorAll('.data-cards__row');
            this.init();
        }

        init() {
            if (this.scrollElements.length === 0) return;

            // Pause animation on hover
            this.scrollElements.forEach(element => {
                element.addEventListener('mouseenter', () => {
                    element.style.animationPlayState = 'paused';
                });

                element.addEventListener('mouseleave', () => {
                    element.style.animationPlayState = 'running';
                });
            });
        }
    }

    // ==========================================
    // Application Initialization
    // ==========================================
    class App {
        constructor() {
            this.init();
        }

        init() {
            // Wait for DOM to be fully loaded
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
            } else {
                this.initializeComponents();
            }
        }

        initializeComponents() {
            console.log('🚀 BigValue Homepage - Initializing...');

            // Initialize all components
            new Header();
            new SmoothScroll();
            new DataCards();
            new FlowTabs();
            new ScrollAnimations();
            new InquiryModal();
            new PerformanceOptimization();
            new AutoScrollController();

            console.log('✅ BigValue Homepage - Ready!');
        }
    }

    // ==========================================
    // Start Application
    // ==========================================
    new App();

})();
