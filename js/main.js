/* main.js - VERSIÓN FINAL CORREGIDA */


/* ================= 1. MENÚ HAMBURGUESA ACTUALIZADO ================= */
/* ================= FUNCION TOGGLE MENU CORREGIDA ================= */
function toggleMenu() {
    console.log("¡Click detectado en el menú!"); // Esto nos dirá si el click llega
    const menu = document.getElementById('mobileMenu');
    
    if (menu) {
        menu.classList.toggle('active');
        
        // Bloqueo de scroll
        if (menu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    } else {
        console.error("No encontré el elemento con id 'mobileMenu'");
    }
}

// Asegurarnos de que el botón de cierre (X) funcione si lo agregas
document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.querySelector('.close-menu');
    if (closeBtn) {
        closeBtn.addEventListener('click', toggleMenu);
    }
});

// Cerrar menú al hacer clic en un enlace (Móvil)
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('mobileMenu').classList.remove('active');
    });
});

/* ================= 2. ANIMACIONES AL SCROLL ================= */
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);
reveal(); // Ejecutar al inicio

/* ================= 3. ENVÍO DE CORREO (FORMSUBMIT) ================= */
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = 'Enviando...'; 

        const formData = new FormData(contactForm);

        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                alert('¡Gracias! Tu mensaje ha sido enviado correctamente.');
                contactForm.reset(); 
            } else {
                alert('Hubo un problema al enviar el mensaje. Inténtalo de nuevo.');
            }
        })
        .catch(error => {
            alert('Error de conexión. Revisa tu internet.');
        })
        .finally(() => {
            btn.innerText = originalText; 
        });
    });
}

/* ================= 4. COOKIES Y SLIDER HISTORIA ================= */
document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DE COOKIES ---
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptBtn = document.getElementById('acceptCookies');

    if (cookieBanner && acceptBtn) {
        if (!localStorage.getItem('cookiesAccepted')) {
            setTimeout(() => {
                cookieBanner.classList.add('show');
            }, 2000);
        }

        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.classList.remove('show');
        });
    }

    // --- SLIDER DE HISTORIA (AUTOMÁTICO) ---
    const slides = document.querySelectorAll('.about-slider.slide-left-effect img');
    
    if (slides.length > 0) {
        let currentSlide = 0;
        const slideInterval = 4000; 

        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            slides[currentSlide].classList.add('exit'); 
            
            const exitingSlide = slides[currentSlide];
            currentSlide = (currentSlide + 1) % slides.length;
            
            slides[currentSlide].classList.remove('exit');
            slides[currentSlide].classList.add('active');

            setTimeout(() => {
                exitingSlide.classList.remove('exit');
            }, 1200); 
        }
        setInterval(nextSlide, slideInterval);
    }
});

/* ================= 5. LÓGICA CARRUSEL ESPECIALIDADES (RESTAURADA) ================= */
document.addEventListener('DOMContentLoaded', () => {
    const spSlides = document.querySelectorAll('.specialty-slide');
    const nextBtn = document.getElementById('nextSpecialty');
    const prevBtn = document.getElementById('prevSpecialty');
    
    if (spSlides.length > 0 && nextBtn && prevBtn) {
        let currentIndex = 0;

        function showSpSlide(index) {
            // Ocultar todas
            spSlides.forEach(slide => slide.classList.remove('active'));
            // Mostrar la actual
            spSlides[index].classList.add('active');
        }

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % spSlides.length;
            showSpSlide(currentIndex);
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + spSlides.length) % spSlides.length;
            showSpSlide(currentIndex);
        });
    }
});

/* ================= 6. BOTÓN VOLVER ARRIBA (A PRUEBA DE FALLOS) ================= */
document.addEventListener('DOMContentLoaded', () => {
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    if (scrollTopBtn) {
        // Escuchar el scroll
        window.addEventListener('scroll', () => {
            // Si bajamos más de 100px, mostrar botón
            if (window.pageYOffset > 100) { 
                scrollTopBtn.classList.add('show-btn');
            } else {
                scrollTopBtn.classList.remove('show-btn');
            }
        });

        // Acción de subir
        scrollTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    } else {
        console.log("El botón volver arriba no se encuentra en el HTML");
    }
});
/* ================= FORZAR CIERRE DE MENÚ (SOLUCIÓN MÓVIL) ================= */
document.addEventListener('DOMContentLoaded', () => {
    // Buscar la X por su clase
    const closeBtn = document.querySelector('.close-menu');
    
    if (closeBtn) {
        // Escuchar el click (PC) y el touch (Celular)
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Evita comportamientos raros
            e.stopPropagation(); // Evita que el click pase al fondo
            toggleMenu(); // Ejecuta la función de cierre
        });
        
        // Refuerzo para algunos iPhone que prefieren 'touchstart'
        closeBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            toggleMenu();
        }, { passive: false });
    }
});
/* ================= CARRUSEL DRAG & DROP (ESPECIALIDADES) ================= */
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('trackSpecialty');
    const btnNext = document.querySelector('.next-btn-specialty');
    const btnPrev = document.querySelector('.prev-btn-specialty');
    
    if (slider) {
        let isDown = false;
        let startX;
        let scrollLeft;

        // 1. FUNCIONALIDAD DE FLECHAS
        if(btnNext) {
            btnNext.addEventListener('click', () => {
                slider.scrollLeft += 300; // Mueve 300px a la derecha
            });
        }
        if(btnPrev) {
            btnPrev.addEventListener('click', () => {
                slider.scrollLeft -= 300; // Mueve 300px a la izquierda
            });
        }

        // 2. FUNCIONALIDAD "DRAG" (ARRASTRAR CON MOUSE)
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active'); // Cambia cursor a "grabbing"
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return; // Si no está clicado, no hace nada
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2; // Velocidad del arrastre (x2)
            slider.scrollLeft = scrollLeft - walk;
        });
    }
});
/* ===============================
   HISTORIA – SCROLL OBSERVER
================================ */

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".historia-section");

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                }
            });
        },
        {
            threshold: 0.35
        }
    );

    sections.forEach(section => observer.observe(section));
});
/* ========================================= */
/* LÓGICA DEL BOTÓN VOLVER ARRIBA            */
/* ========================================= */

const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
    // Si bajas más de 300px, aparece el botón
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add("show");
    } else {
        scrollTopBtn.classList.remove("show");
    }
});

scrollTopBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Evita el salto brusco
    window.scrollTo({
        top: 0,
        behavior: "smooth" // Subida suave y elegante
    });
});