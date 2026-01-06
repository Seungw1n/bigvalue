/**
 * Helper script to update all HTML pages with GNB and Footer placeholders
 * This script provides instructions for manual updates
 */

const pages = [
    'index.html',
    'about-us/index.html',
    'newsroom/index.html',
    'newsroom/detail.html',
    'notice/index.html',
    'notice/detail.html',
    'privacy-policy/index.html',
    'terms-of-service/index.html',
    'ai-use-case/index.html',
    'ai-use-case/detail.html',
    'data-products/index.html',
    'customer-studies/index.html',
    'platform/index.html',
    'api/index.html',
    'ai-solutions/index.html',
    'pricing/index.html',
    'solutions/finance/index.html',
    'solutions/logistics/index.html',
    'solutions/healthcare/index.html',
    'solutions/government/index.html',
    'data/index.html',
    'insight-feed/index.html'
];

console.log('='.repeat(60));
console.log('GNB and Footer Component Update Instructions');
console.log('='.repeat(60));
console.log('\nPages to update:', pages.length);
console.log('\nFor each page, replace:');
console.log('\n1. Replace <header> tag with:');
console.log('   <div id="gnb-placeholder"></div>');
console.log('\n2. Replace <footer> tag with:');
console.log('   <div id="footer-placeholder"></div>');
console.log('\n3. Make sure script.js is loaded:');
console.log('   <script src="../script.js"></script>  (adjust path as needed)');
console.log('\n' + '='.repeat(60));
