/* =========================================================
   MANASA A S
   PORTFOLIO JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const siteNav =
        document.querySelector(".site-nav");

    const themeToggle =
        document.querySelector(".theme-toggle");

    const themeIcon =
        document.querySelector(".theme-icon");


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    if (menuToggle && siteNav) {

        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    siteNav.classList.toggle("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

                menuToggle.setAttribute(
                    "aria-label",
                    isOpen
                        ? "Close navigation menu"
                        : "Open navigation menu"
                );

            }
        );


        /* Close after navigation */

        siteNav
            .querySelectorAll("a")
            .forEach((link) => {

                link.addEventListener(
                    "click",
                    () => {

                        siteNav.classList.remove(
                            "open"
                        );

                        menuToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                        menuToggle.setAttribute(
                            "aria-label",
                            "Open navigation menu"
                        );
                    }
                );

            });


        /* Close with Escape */

        document.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Escape" &&
                    siteNav.classList.contains("open")
                ) {

                    siteNav.classList.remove(
                        "open"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuToggle.setAttribute(
                        "aria-label",
                        "Open navigation menu"
                    );

                    menuToggle.focus();
                }

            }
        );


        /* Close outside */

        document.addEventListener(
            "click",
            (event) => {

                if (
                    !siteNav.contains(event.target) &&
                    !menuToggle.contains(event.target)
                ) {

                    siteNav.classList.remove(
                        "open"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }
        );

    }


    /* =====================================================
       DARK / LIGHT THEME
    ===================================================== */

    const savedTheme =
        localStorage.getItem(
            "manasa-portfolio-theme"
        );

    const prefersDark =
        window.matchMedia &&
        window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;

    const startingTheme =
        savedTheme ||
        (prefersDark ? "dark" : "light");


    applyTheme(startingTheme);


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                const current =
                    document.documentElement
                        .getAttribute(
                            "data-theme"
                        );

                const next =
                    current === "dark"
                        ? "light"
                        : "dark";

                applyTheme(next);

                localStorage.setItem(
                    "manasa-portfolio-theme",
                    next
                );

            }
        );

    }


    function applyTheme(theme) {

        document.documentElement
            .setAttribute(
                "data-theme",
                theme
            );

        if (!themeToggle) return;

        const dark =
            theme === "dark";

        themeToggle.setAttribute(
            "aria-label",
            dark
                ? "Switch to light mode"
                : "Switch to dark mode"
        );

        themeToggle.setAttribute(
            "title",
            dark
                ? "Switch to light mode"
                : "Switch to dark mode"
        );

        if (themeIcon) {

            themeIcon.textContent =
                dark
                    ? "☀"
                    : "☾";
        }

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() || "index.html";


    document
        .querySelectorAll(".nav-link")
        .forEach((link) => {

            const href =
                link.getAttribute("href");

            if (href === currentPage) {

                document
                    .querySelectorAll(
                        ".nav-link"
                    )
                    .forEach((item) => {

                        item.classList.remove(
                            "active"
                        );

                        item.removeAttribute(
                            "aria-current"
                        );

                    });

                link.classList.add("active");

                link.setAttribute(
                    "aria-current",
                    "page"
                );
            }

        });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        "IntersectionObserver" in window &&
        revealElements.length
    ) {

        const observer =
            new IntersectionObserver(
                (entries, observerInstance) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target
                                    .classList
                                    .add(
                                        "visible"
                                    );

                                observerInstance
                                    .unobserve(
                                        entry.target
                                    );
                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            (element) => {

                observer.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const yearElements =
        document.querySelectorAll(
            ".current-year"
        );

    yearElements.forEach(
        (element) => {

            element.textContent =
                new Date()
                    .getFullYear();

        }
    );


    /* =====================================================
       RESIZE SAFETY
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth >= 900 &&
                siteNav
            ) {

                siteNav.classList.remove(
                    "open"
                );

                if (menuToggle) {

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuToggle.setAttribute(
                        "aria-label",
                        "Open navigation menu"
                    );

                }

            }

        }
    );

});