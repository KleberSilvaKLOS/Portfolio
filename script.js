document.addEventListener("DOMContentLoaded", () => {
    
    /* ============================================================
       1. SCROLL REVEAL (Aparecer ao rolar)
       Usa IntersectionObserver para performance máxima.
    ============================================================ */
    const observerOptions = {
        threshold: 0.1 // Ativa quando 10% do elemento estiver visível
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Seleciona os elementos que devem ser animados
    const elementsToReveal = document.querySelectorAll('.service-card, .project-card, .section-header');
    
    elementsToReveal.forEach(el => {
        el.classList.add('reveal'); // Adiciona a classe base (invisível)
        observer.observe(el);       // Começa a observar
    });


    /* ============================================================
       2. TILT EFFECT (Efeito 3D nos Cards ao passar o mouse)
       Cálculo matemático para rotacionar o card baseado no mouse.
    ============================================================ */
    const cards = document.querySelectorAll('.service-card, .project-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // Posição X do mouse dentro do card
            const y = e.clientY - rect.top;  // Posição Y do mouse dentro do card

            // Calcula o centro do card
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calcula a rotação (dividindo por 20 para suavizar o ângulo)
            const rotateX = ((y - centerY) / 20) * -1; // Inverte para ficar natural
            const rotateY = (x - centerX) / 20;

            // Aplica a transformação
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            
            // Adiciona brilho dinâmico (opcional, mas fica top)
            card.style.borderColor = "rgba(255, 255, 255, 0.2)";
        });

        // Quando o mouse sai, o card volta ao normal suavemente
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            card.style.borderColor = "#292C34"; // Volta à cor original da borda
        });
    });
});