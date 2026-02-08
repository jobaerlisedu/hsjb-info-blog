// Mobile Menu Toggle
const menuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.main-nav');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');

        // Change icon
        const icon = menuBtn.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.classList.remove('bx-menu');
            icon.classList.add('bx-x');
        } else {
            icon.classList.remove('bx-x');
            icon.classList.add('bx-menu');
        }
    });
}
