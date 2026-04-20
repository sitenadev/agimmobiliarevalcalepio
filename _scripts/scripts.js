/*
* Template Name: Property
* Template Author: Untree.co
* Template License: https://creativecommons.org/licenses/by/3.0/
* Template Version: 1.0
* Author URI: https://untree.co/
* Twitter: https://twitter.com/Untree_co
* Facebook: https://web.facebook.com/Untree.co/
*/

document.addEventListener('DOMContentLoaded', function () {

    var mapDiv = document.getElementById('map');
    if (mapDiv && typeof L !== 'undefined') {
        mapDiv.style.width = '100%';
        mapDiv.style.height = '450px';

        var lat = 45.64758;
        var lng = 9.9097659;

        var map = L.map('map', {
            minZoom: 15,
            maxZoom: 15,
            zoomControl: false,
            scrollWheelZoom: false,
            doubleClickZoom: false,
            touchZoom: false,
            boxZoom: false,
            dragging: false
        }).setView([lat, lng], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        var siteTitle = mapDiv.getAttribute('data-title') || 'Posizione';
        var googleMapsLink = mapDiv.getAttribute('data-google-link') || '';

        var popupContent = siteTitle + "<br>";

        if (googleMapsLink) {
            popupContent += "<a href='" + googleMapsLink + "' target='_blank' rel='noopener noreferrer'>Apri in Google Maps</a>";
        }

        L.marker([lat, lng]).addTo(map).bindPopup(popupContent);
    }

    var navbarCustom = document.getElementById('navbar-custom');
    if (navbarCustom) {
        var navbarCustomLinks = document.querySelectorAll('#navbar-custom .nav-link');

        function activateNavbarCustomLink() {
            var fromTop = window.scrollY + navbarCustom.offsetHeight;
            navbarCustomLinks.forEach(function (link) {
                var section = document.querySelector(link.hash);
                if (!section) return;
                if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }

        navbarCustomLinks.forEach(function (link) {
            link.addEventListener('click', function (event) {
                event.preventDefault();
                var section = document.querySelector(link.hash);
                if (!section) return;
                window.scrollTo({
                    top: section.offsetTop - navbarCustom.offsetHeight,
                    behavior: 'smooth'
                });
                navbarCustomLinks.forEach(function (l) { l.classList.remove('active'); });
                link.classList.add('active');
            });
        });

        function handleNavbarCustomScroll() {
            activateNavbarCustomLink();
            if (window.scrollY > 200) {
                navbarCustom.classList.add('fixed-top');
                document.body.style.paddingTop = navbarCustom.offsetHeight + 'px';
            } else {
                navbarCustom.classList.remove('fixed-top');
                document.body.style.paddingTop = '0';
            }
        }

        window.addEventListener('scroll', handleNavbarCustomScroll);
        handleNavbarCustomScroll();
    }

});

(function () {
    'use strict';

    var navbarTheme = document.getElementById('navbar-theme') || document.querySelector('.site-mobile-menu');
    if (!navbarTheme) return;

    var siteMenuClone = function () {
        var jsCloneNavs = document.querySelectorAll('.js-clone-nav');
        var siteMobileMenuBody = document.querySelector('.site-mobile-menu-body');

        if (!siteMobileMenuBody) return;

        jsCloneNavs.forEach(nav => {
            var navCloned = nav.cloneNode(true);
            navCloned.setAttribute('class', 'site-nav-wrap');
            siteMobileMenuBody.appendChild(navCloned);
        });

        setTimeout(function () {
            var hasChildrens = document.querySelector('.site-mobile-menu').querySelectorAll('.has-children');

            var counter = 0;
            hasChildrens.forEach(hasChild => {
                var refEl = hasChild.querySelector('a');

                var newElSpan = document.createElement('span');
                newElSpan.setAttribute('class', 'arrow-collapse collapsed');

                hasChild.insertBefore(newElSpan, refEl);

                var arrowCollapse = hasChild.querySelector('.arrow-collapse');
                arrowCollapse.setAttribute('data-bs-toggle', 'collapse');
                arrowCollapse.setAttribute('data-bs-target', '#collapseItem' + counter);

                var dropdown = hasChild.querySelector('.dropdown');
                dropdown.setAttribute('class', 'collapse');
                dropdown.setAttribute('id', 'collapseItem' + counter);

                counter++;
            });
        }, 1000);

        var menuToggle = document.querySelectorAll('.js-menu-toggle');
        var mTog;
        menuToggle.forEach(mtoggle => {
            mTog = mtoggle;
            mtoggle.addEventListener('click', (e) => {
                if (document.body.classList.contains('offcanvas-menu')) {
                    document.body.classList.remove('offcanvas-menu');
                    mtoggle.classList.remove('active');
                    mTog.classList.remove('active');
                } else {
                    document.body.classList.add('offcanvas-menu');
                    mtoggle.classList.add('active');
                    mTog.classList.add('active');
                }
            });
        });

        var specifiedElement = document.querySelector('.site-mobile-menu');
        var mt, mtoggleTemp;
        document.addEventListener('click', function (event) {
            var isClickInside = specifiedElement.contains(event.target);
            menuToggle.forEach(mtoggle => {
                mtoggleTemp = mtoggle;
                mt = mtoggle.contains(event.target);
            });

            if (!isClickInside && !mt) {
                if (document.body.classList.contains('offcanvas-menu')) {
                    document.body.classList.remove('offcanvas-menu');
                    mtoggleTemp.classList.remove('active');
                }
            }
        });
    };

    siteMenuClone();
})();

(function () {
    'use strict';

    const animationDuration = 2000;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(animationDuration / frameDuration);
    const easeOutQuad = t => t * (2 - t);

    const numberWithCommas = n => {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const animateCountUp = el => {
        let frame = 0;
        const countTo = parseInt(el.textContent, 10);
        if (isNaN(countTo)) return;

        const counter = setInterval(() => {
            frame++;
            const progress = easeOutQuad(frame / totalFrames);
            const currentCount = Math.round(countTo * progress);

            if (parseInt(el.textContent, 10) !== currentCount) {
                el.textContent = numberWithCommas(currentCount);
            }

            if (frame === totalFrames) {
                clearInterval(counter);
            }
        }, frameDuration);
    };

    const runAnimations = () => {
        const countupEls = document.querySelectorAll('.countup');
        countupEls.forEach(animateCountUp);
    };

    var elements;
    var windowHeight;

    function init() {
        elements = document.querySelectorAll('.section-counter');
        windowHeight = window.innerHeight;
    }

    function checkPosition() {
        elements.forEach(function (element) {
            var positionFromTop = element.getBoundingClientRect().top;

            if (positionFromTop - windowHeight <= 0) {
                if (!element.classList.contains('viewed')) {
                    element.classList.add('viewed');
                    runAnimations();
                }
            }
        });
    }

    window.addEventListener('scroll', checkPosition);
    window.addEventListener('resize', init);

    init();
    checkPosition();
})();

(function () {
    'use strict';

    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'slide',
            once: true
        });
    }

    var preloader = function () {
        var loader = document.querySelector('.loader');
        var overlay = document.getElementById('overlayer');

        function fadeOut(el) {
            if (!el) return;

            el.style.opacity = 1;

            (function fade() {
                el.style.opacity = parseFloat(el.style.opacity) - 0.1;

                if (el.style.opacity <= 0) {
                    el.style.display = 'none';
                } else {
                    requestAnimationFrame(fade);
                }
            })();
        }

        setTimeout(function () {
            fadeOut(loader);
            fadeOut(overlay);
        }, 200);
    };

    preloader();

    var tinySlider = function () {
        if (typeof tns === 'undefined') return;

        if (document.querySelector('.hero-slide')) {
            tns({
                container: '.hero-slide',
                mode: 'carousel',
                speed: 700,
                autoplay: true,
                controls: false,
                nav: false,
                autoplayButtonOutput: false,
                controlsContainer: '#hero-nav'
            });
        }

        if (document.querySelector('.img-property-slide')) {
            tns({
                container: '.img-property-slide',
                mode: 'carousel',
                speed: 700,
                items: 1,
                gutter: 30,
                autoplay: true,
                controls: false,
                nav: true,
                autoplayButtonOutput: false
            });
        }

        if (document.querySelector('.property-slider')) {
            tns({
                container: '.property-slider',
                mode: 'carousel',
                speed: 700,
                gutter: 30,
                items: 3,
                autoplay: true,
                autoplayButtonOutput: false,
                controlsContainer: '#property-nav',
                responsive: {
                    0: { items: 1 },
                    700: { items: 2 },
                    900: { items: 3 }
                }
            });
        }

        if (document.querySelector('.testimonial-slider')) {
            tns({
                container: '.testimonial-slider',
                mode: 'carousel',
                speed: 700,
                items: 3,
                gutter: 50,
                autoplay: true,
                autoplayButtonOutput: false,
                controlsContainer: '#testimonial-nav',
                responsive: {
                    0: { items: 1 },
                    700: { items: 2 },
                    900: { items: 3 }
                }
            });
        }
    };

    tinySlider();

    var loadIubenda = function () {
        if (document.querySelector('script[src*="iubenda"]')) return;

        var script = document.createElement('script');
        var firstScript = document.getElementsByTagName('script')[0];

        script.src = 'https://cdn.iubenda.com/iubenda.js';

        if (firstScript && firstScript.parentNode) {
            firstScript.parentNode.insertBefore(script, firstScript);
        }
    };

    loadIubenda();
})();
