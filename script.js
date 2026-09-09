// scripts.js - Lógica del Carrusel Corregida (Alineación y Dinámica)

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Seleccionamos los elementos del DOM
    const carruselViewport = document.getElementById('carruselViewport');
    const carruselTrack = document.getElementById('carruselTrack');
    let cards = Array.from(document.querySelectorAll('.carrusel__container-item'));
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    
    // Obtenemos el gap del CSS
    const trackStyles = window.getComputedStyle(carruselTrack);
    const gap = parseInt(trackStyles.getPropertyValue('gap')) || 30; 

    // ESTADO
    let currentPosition = 0;
    let scrollAmount = 0;

    // ============================================================
    // FUNCIÓN PRINCIPAL: Calcular, Centrar y Alinear (Responsive)
    // ============================================================
    function ajustarVisorCarrusel() {
        const viewportWidth = carruselViewport.offsetWidth;
        const esMobile = window.innerWidth <= 768;

        cards = Array.from(document.querySelectorAll('.carrusel__container-item'));

        if (esMobile) {
            // --- LÓGICA MÓVIL: 1 IMAGEN POR CLIC ---
            cards.forEach((card) => {
                card.style.width = `${viewportWidth}px`;
                card.style.height = '350px';
                card.style.marginLeft = '0';
                card.style.marginRight = '0';
            });
            scrollAmount = viewportWidth;
        } else {
            // --- LÓGICA ESCRITORIO: 3 IMÁGENES ---
            const totalGapSpace = gap * 2;
            const availableWidthForPhotos = viewportWidth - totalGapSpace;
            let cardWidth = Math.floor(availableWidthForPhotos / 3);

            const totalExtraSpace = viewportWidth - ((cardWidth * 3) + totalGapSpace);
            const lateralMargin = totalExtraSpace / 2;
            
            cards.forEach((card, index) => {
                card.style.width = `${cardWidth}px`;
                card.style.height = '450px'; 
                
                card.style.marginLeft = `${gap}px`;
                card.style.marginRight = '0';

                if (index === 0) {
                    card.style.marginLeft = `${lateralMargin}px`;
                } else if (index === cards.length - 1) {
                    card.style.marginRight = `${lateralMargin}px`;
                }
            });
            scrollAmount = cardWidth + gap;
        }

        currentPosition = 0;
        carruselTrack.style.transform = `translateX(0px)`;
        actualizarBotones();
    }

    // ============================================================
    // FUNCIONES DE MOVIMIENTO
    // ============================================================
    function moveNext() {
        currentPosition -= scrollAmount;
        const trackScrollWidth = carruselTrack.scrollWidth;
        const viewportWidth = carruselViewport.offsetWidth;
        const maxScroll = -(trackScrollWidth - viewportWidth); 

        if (currentPosition <= maxScroll) {
            currentPosition = maxScroll;
        }
        
        carruselTrack.style.transform = `translateX(${currentPosition}px)`;
        actualizarBotones();
    }

    function movePrev() {
        currentPosition += scrollAmount;
        if (currentPosition >= 0) {
            currentPosition = 0;
        }
        carruselTrack.style.transform = `translateX(${currentPosition}px)`;
        actualizarBotones();
    }

    // ============================================================
    // CONTROL DE UI (Dinámico)
    // ============================================================
    function actualizarBotones() {
        btnPrev.disabled = currentPosition >= 0;
        
        const trackScrollWidth = carruselTrack.scrollWidth;
        const viewportWidth = carruselViewport.offsetWidth;
        const maxScroll = -(trackScrollWidth - viewportWidth);

        btnNext.disabled = currentPosition <= (maxScroll + 1); 
        
        btnPrev.style.opacity = btnPrev.disabled ? 0.2 : 1;
        btnNext.style.opacity = btnNext.disabled ? 0.2 : 1;
    }

    // ============================================================
    // EVENTOS
    // ============================================================
    ajustarVisorCarrusel();
    window.addEventListener('resize', ajustarVisorCarrusel);

    btnNext.addEventListener('click', moveNext);
    btnPrev.addEventListener('click', movePrev);
});

//Maps Tiendas

const ubicacionesFranquicias = [
    {
        lat: 19.40907888688735,
        log: -99.16793591627022,
        tienda: "Insurgentes"
    },
]

