// ===== Initialize AOS with Enhanced Settings =====
AOS.init({
    duration: 800,
    easing: 'ease-in-out-cubic',
    once: false, // Allows animations to repeat on scroll up/down
    mirror: true // Whether elements should animate out while scrolling past them
});

// ===== Theme Toggle with Smooth Transition =====
document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const theme = btn.dataset.theme;
        let bgColor, textColor, greyColor, lightColorVar, darkColorVar;

        if (theme === 'light') {
            bgColor = '#f8f9fa'; // Light background
            textColor = '#212529'; // Dark text
            greyColor = '#e9ecef'; // Lighter grey for cards/sections
            lightColorVar = '#121212'; // Dark color for light theme variable
            darkColorVar = '#f8f9fa'; // Light color for dark theme variable
        } else {
            bgColor = '#121212'; // Dark background
            textColor = '#e2e2e2'; // Light text
            greyColor = '#2a2a2a'; // Darker grey for cards/sections
            lightColorVar = '#f8f9fa'; // Light color for light theme variable
            darkColorVar = '#121212'; // Dark color for dark theme variable
        }

        // Animate body background and text color directly
        gsap.to("body", {
            backgroundColor: bgColor,
            color: textColor,
            duration: 0.7,
            ease: "power2.inOut"
        });

        // Animate CSS variables for other elements to ensure consistency
        gsap.to(document.documentElement, {
            '--dark-color': darkColorVar,
            '--light-color': lightColorVar,
            '--grey-color': greyColor,
            '--text-color': textColor,
            duration: 0.7,
            ease: "power2.inOut",
            onUpdate: () => {
                // This onUpdate is generally not strictly necessary for simple CSS variable changes
                // but can be useful for debugging or complex scenarios.
            }
        });
    });
});

// ===== Text Size Toggle with Animation =====
document.querySelectorAll('.text-size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const size = btn.dataset.size;
        let fontSize;
        switch(size) {
            case 'small': fontSize = '14px'; break;
            case 'medium': fontSize = '16px'; break;
            case 'large': fontSize = '18px'; break;
        }

        gsap.to("body", {
            fontSize: fontSize,
            duration: 0.5,
            ease: "power2.out"
        });
    });
});

// ===== Enhanced Back to Top Button =====
const backToTopBtn = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        gsap.to(backToTopBtn, {
            display: 'block', // Ensure it's block before animating opacity
            opacity: 1,
            duration: 0.3
        });
    } else {
        gsap.to(backToTopBtn, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                backToTopBtn.style.display = 'none'; // Hide after animation
            }
        });
    }
});

backToTopBtn.addEventListener('click', () => {
    gsap.to(window, {
        scrollTo: 0, // Requires GSAP ScrollToPlugin
        duration: 1,
        ease: "power2.inOut"
    });
});

// ===== Enhanced Bubble Background Animation =====
document.addEventListener("DOMContentLoaded", () => {
    const bubbleContainers = document.querySelectorAll(".bubbles");
    bubbleContainers.forEach(container => {
        for (let i = 0; i < 15; i++) {
            const bubble = document.createElement("div");
            bubble.className = "bubble";

            // Random properties for bubbles
            const size = Math.random() * 30 + 10; // Size between 10px and 40px
            const posX = Math.random() * 100; // Position across the width
            const duration = Math.random() * 10 + 10; // Animation duration between 10s and 20s
            const delay = Math.random() * 5; // Animation delay up to 5s

            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${posX}%`;
            bubble.style.animationDuration = `${duration}s`;
            bubble.style.animationDelay = `${delay}s`;
            bubble.style.opacity = Math.random() * 0.5 + 0.1; // Opacity between 0.1 and 0.6

            container.appendChild(bubble);
        }
    });

    // GSAP Animations for Hero Section elements
    gsap.from(".profile-img-container", {
        duration: 1.5,
        y: 50,
        opacity: 0,
        ease: "back.out(1.7)",
        delay: 0.5
    });

    // Animate all sections on scroll using ScrollTrigger
    gsap.utils.toArray("section").forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%", // When the top of the section hits 80% of the viewport
                toggleActions: "play none none none" // Play animation once when entering
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
    });

    // Animate skill pills with stagger
    gsap.from(".skill-pill", {
        scrollTrigger: {
            trigger: "#skills",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        x: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)"
    });

    // Animate certification cards with stagger
    gsap.from(".certification-card", {
        scrollTrigger: {
            trigger: "#certifications",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        y: 50, // or x: -50 for horizontal slide
        opacity: 0,
        duration: 0.7,
        stagger: 0.15, // Stagger them slightly
        ease: "power2.out"
    });

    // Animate project cards with stagger
    gsap.from(".project-card", {
        scrollTrigger: {
            trigger: "#projects",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
    });

    // Animate section titles and dividers
    gsap.utils.toArray(".section-title").forEach(title => {
        gsap.from(title.querySelector('h2'), {
            scrollTrigger: {
                trigger: title,
                start: "top 90%",
                toggleActions: "play none none none"
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });
        gsap.from(title.querySelector('.divider'), {
            scrollTrigger: {
                trigger: title,
                start: "top 90%",
                toggleActions: "play none none none"
            },
            width: 0, // Animate width from 0
            opacity: 0,
            duration: 1,
            delay: 0.3,
            ease: "power3.out"
        });
    });

    // Animate progress circles in Education section
    gsap.utils.toArray(".progress-circle").forEach(circle => {
        const percent = parseFloat(circle.dataset.percent);
        const circleFill = circle.querySelector('.progress-circle-fill');

        gsap.to(circleFill, {
            scrollTrigger: {
                trigger: circle,
                start: "top 85%", // When the circle comes into view
                toggleActions: "play none none none"
            },
            // Animate the stroke-dashoffset based on the percentage
            // The value 283 is the circumference for a radius of 45 (2 * PI * 45)
            strokeDashoffset: 283 - (283 * percent / 100),
            duration: 1.5,
            ease: "power2.out",
            onUpdate: () => {
                // Update CSS variable for the progress-fill keyframe animation
                circle.style.setProperty('--percent', percent);
            }
        });
    });

    // Active Navigation Link Indicator
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active-nav-link');
                });

                // Add active class to the current section's link
                const currentNavLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                if (currentNavLink) {
                    currentNavLink.classList.add('active-nav-link');
                    // Optional: GSAP animation for the active state
                    gsap.fromTo(currentNavLink,
                        { scale: 1, color: 'var(--text-color)' }, // Initial state
                        { scale: 1.05, color: 'var(--primary-color)', duration: 0.3 } // Active state
                    );
                }
            }
        });
    }, {
        threshold: 0.7, // Adjust threshold as needed (e.g., 0.7 means 70% of the section must be visible)
        rootMargin: "0px 0px -20% 0px" // Adjust rootMargin to fine-tune trigger point
    });

    // Observe each section
    sections.forEach(section => {
        observer.observe(section);
    });

}); // End DOMContentLoaded

// ===== Form Submission Animation =====
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent actual form submission

    const form = this;
    gsap.to(form, {
        opacity: 0.5,
        y: 10,
        duration: 0.3,
        onComplete: () => {
            // Simulate form submission (e.g., sending data to a server)
            setTimeout(() => {
                gsap.to(form, {
                    opacity: 1,
                    y: 0,
                    duration: 0.3
                });

                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'alert alert-success mt-3'; // Bootstrap alert class
                successMsg.textContent = 'Message sent successfully!';
                form.parentNode.appendChild(successMsg);

                gsap.from(successMsg, {
                    y: 20,
                    opacity: 0,
                    duration: 0.5
                });

                // Reset form and hide message after a delay
                setTimeout(() => {
                    form.reset();
                    gsap.to(successMsg, {
                        y: -20,
                        opacity: 0,
                        duration: 0.5,
                        onComplete: () => successMsg.remove() // Remove element after animation
                    });
                }, 3000); // Message visible for 3 seconds
            }, 1000); // Simulate network delay for 1 second
        }
    });
});
