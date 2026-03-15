const translations = {
    en: {
        // Navbar
        "nav-home": "Home",
        "nav-blog": "Blog",
        
        // Hero Section
        "hero-badge": "Networking and Tech",
        "hero-title": "Learn Network Engineering <br> Easily",
        "hero-subtitle": "A Technical Blog about the world of Protocol, Architecture and Connectivity for Tech Enthusiasts and Professionals.",
        "hero-cta": "Read Blog",
        
        // Sections
        "section-recent": "Recent Articles",
        "section-all": "All Articles",
        "view-all": "View All",
        "back-home": "Return to Home",
        "back-articles": "Back to Articles",
        
        // Card Actions
        "read-more": "Read More",
        
        // Footer
        "footer-rights": "All Rights Reserved.",
        
        // Blog Page
        "blog-description": "A deep dive into Networking, OSI Layers, Protocols, and more."
    },
    bn: {
        // Navbar
        "nav-home": "হোম",
        "nav-blog": "ব্লগ",
        
        // Hero Section
        "hero-badge": "Networking and Tech",
        "hero-title": "সহজে শিখুন <br> <span class=\"gradient-text\">Network Engineering</span>",
        "hero-subtitle": "প্রোটোকল, আর্কিটেকচার এবং কানেক্টিভিটির জগত সম্পর্কে টেক উৎসাহী এবং পেশাদারদের জন্য একটি টেকনিক্যাল ব্লগ।",
        "hero-cta": "ব্লগ পড়ুন",
        
        // Sections
        "section-recent": "সাম্প্রতিক আর্টিকেল",
        "section-all": "সব আর্টিকেল",
        "view-all": "সব দেখুন",
        "back-home": "হোমে ফিরে যান",
        "back-articles": "আর্টিকেলে ফিরে যান",
        
        // Card Actions
        "read-more": "সম্পূর্ণ পড়ুন",
        
        // Footer
        "footer-rights": "সর্বস্বত্ব সংরক্ষিত।",
        
        // Blog Page
        "blog-description": "নেটওয়ার্কিং, OSI লেয়ার, প্রোটোকল এবং আরও অনেক কিছুর বিস্তারিত আলোচনা।"
    }
};

class LanguageSystem {
    constructor() {
        this.lang = localStorage.getItem('site-lang') || 'en';
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.updateUI();
            this.setupSwitcher();
        });
    }

    setLanguage(lang) {
        this.lang = lang;
        localStorage.setItem('site-lang', lang);
        document.documentElement.setAttribute('lang', lang);
        this.updateUI();
    }

    updateUI() {
        const elements = document.querySelectorAll('[data-t]');
        elements.forEach(el => {
            const key = el.getAttribute('data-t');
            if (translations[this.lang][key]) {
                // If the translation contains HTML (like <br>), use innerHTML, otherwise textContent
                if (translations[this.lang][key].includes('<')) {
                    el.innerHTML = translations[this.lang][key];
                } else {
                    el.textContent = translations[this.lang][key];
                }
            }
        });

        // Update active class on switcher buttons
        const btnEn = document.getElementById('lang-en');
        const btnBn = document.getElementById('lang-bn');
        if (btnEn && btnBn) {
            if (this.lang === 'en') {
                btnEn.classList.add('active');
                btnBn.classList.remove('active');
            } else {
                btnBn.classList.add('active');
                btnEn.classList.remove('active');
            }
        }
    }

    setupSwitcher() {
        const btnEn = document.getElementById('lang-en');
        const btnBn = document.getElementById('lang-bn');

        if (btnEn) btnEn.addEventListener('click', () => this.setLanguage('en'));
        if (btnBn) btnBn.addEventListener('click', () => this.setLanguage('bn'));
    }
}

const langSystem = new LanguageSystem();
export default langSystem;
