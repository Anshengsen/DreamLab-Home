document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.querySelector('.theme-toggle');
    const langSelector = document.querySelector('.lang-selector');
    const langDropdown = document.querySelector('.lang-dropdown');
    const currentLang = document.querySelector('.current-lang');
    const html = document.documentElement;
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    langSelector.addEventListener('click', function(e) {
        e.stopPropagation();
        langDropdown.classList.toggle('show');
    });
    
    document.addEventListener('click', function() {
        langDropdown.classList.remove('show');
    });
    
    langDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    const langOptions = langDropdown.querySelectorAll('.lang-option');
    langOptions.forEach(option => {
        option.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            const flag = this.querySelector('.flag').className;
            const text = this.querySelector('span:last-child').textContent;
            
            currentLang.querySelector('.flag').className = flag;
            currentLang.querySelector('span:last-child').textContent = text;
            
            localStorage.setItem('language', lang);
            langDropdown.classList.remove('show');
            updateLanguage(lang);
        });
    });
    
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    
    const savedLang = localStorage.getItem('language') || 'zh';
    const langOption = langDropdown.querySelector(`[data-lang="${savedLang}"]`);
    if (langOption) {
        const flag = langOption.querySelector('.flag').className;
        const text = langOption.querySelector('span:last-child').textContent;
        
        currentLang.querySelector('.flag').className = flag;
        currentLang.querySelector('span:last-child').textContent = text;
        
        updateLanguage(savedLang);
    }
});

function updateLanguage(lang) {
    const elements = document.querySelectorAll('[data-lang-key]');
    elements.forEach(element => {
        const key = element.getAttribute('data-lang-key');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    document.documentElement.setAttribute('lang', lang);
}
