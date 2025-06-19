//дляскролла
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
    //мобилка
    function initMobileMenu() {
        const nav = document.querySelector('nav ul');
        const burger = document.createElement('div');
        burger.className = 'mobile-menu-btn';
        burger.innerHTML = '☰';
        const logo = document.querySelector('.logo');
        logo.parentNode.insertBefore(burger, logo.nextSibling);
        function toggleMenu() {
            const isOpen = nav.style.display === 'block';
            nav.style.display = isOpen ? 'none' : 'block';
            burger.innerHTML = isOpen ? '☰' : '×';
        }
        burger.addEventListener('click', toggleMenu);
        function checkScreenSize() {
            if (window.innerWidth <= 768) {
                burger.style.display = 'flex';
                nav.style.display = 'none';
                nav.classList.add('mobile-nav');
            } else {
                burger.style.display = 'none';
                nav.style.display = 'flex';
                nav.classList.remove('mobile-nav');
            }
        }
        checkScreenSize();
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(checkScreenSize, 100);
        });
    }
    initMobileMenu();
    //новостимод
    const modalBtns = document.querySelectorAll('.news-btn');
    const modals = document.querySelectorAll('.modal');
    const closeBtns = document.querySelectorAll('.close, .close-modal-btn');
    modalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    //курсызаявка
    if (document.getElementById('enroll-form')) {
        const categoryBtns = document.querySelectorAll('.category-btn, .enroll-btn');
        const vehicleImages = document.querySelectorAll('.vehicle-img');
        const categoryInput = document.getElementById('category');
        const form = document.getElementById('driver-license-form');
        const successModal = document.getElementById('success-modal'); 
        function selectCategory(category) {
            document.querySelectorAll('.category-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-category') === category) {
                    btn.classList.add('active');
                }
            });
            vehicleImages.forEach(img => {
                img.classList.remove('active');
                if (img.getAttribute('data-category') === category) {
                    img.classList.add('active');
                }
            });
            if (categoryInput) {
                categoryInput.value = category;
            }
        }
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const category = this.getAttribute('data-category') || 
                                 this.closest('.course-card')?.getAttribute('data-category');
                if (category) {
                    selectCategory(category);
                    document.getElementById('enroll-form').scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                successModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                form.reset();
                selectCategory('A');
            });
        }
        selectCategory('A');
    }
    //открытая ссылка
    function highlightActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            link.classList.remove('active');
            if ((currentPage === 'index.html' && linkPage === '#about') || 
                (currentPage === linkPage) || 
                (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    highlightActiveNavLink();
});
