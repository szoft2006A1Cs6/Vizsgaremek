document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Termékkártyák kezelése ---
    const menuCards = document.querySelectorAll('.menu-card');

    menuCards.forEach(card => {
        card.addEventListener('click', () => {
            const pizzaName = card.querySelector('h2').textContent;
            
            // Aktív állapot jelzése
            card.style.borderColor = 'var(--accent-color, #8d6e63)';
            
            console.log(`Termék kiválasztva: ${pizzaName}`);

            // Itt általában egy felugró ablak jönne elő a testreszabáshoz (pl. extra feltét)
            openProductDetails(pizzaName);
        });
    });

    // --- 2. Termék részletei funkció (szimuláció) ---
    function openProductDetails(name) {
        // Egy egyszerű visszajelzés, amíg nincs kész a Modal HTML-je
        const feedback = document.createElement('div');
        feedback.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: #333;
            color: white;
            padding: 1rem 2rem;
            border-radius: 2rem;
            z-index: 1000;
            font-family: 'Lato', sans-serif;
        `;
        feedback.textContent = `${name} hozzáadva a kiválasztottakhoz!`;
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.remove();
        }, 2000);
    }

    // --- 3. Vissza gomb ---
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            // Animált kilépés szimulálása
            document.querySelector('.menu-main').style.opacity = '0';
            setTimeout(() => {
                window.location.href = "categories.html";
            }, 300);
        });
    }

    // --- 4. Segítség gomb animáció ---
    const helpBtn = document.querySelector('.floating-help-btn');
    if (helpBtn) {
        helpBtn.addEventListener('click', () => {
            // Egy kis rezgő effekt, ha megnyomják
            helpBtn.animate([
                { transform: 'scale(1)' },
                { transform: 'scale(1.2)' },
                { transform: 'scale(1)' }
            ], { duration: 300 });
            
            alert("A pincér látja, hogy a pizzák között válogat. Hamarosan ott lesz Önnel!");
        });
    }

    // --- 5. Kártyák beúszása (Lazy Load jellegű animáció) ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);

    menuCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.5s ease-out';
        observer.observe(card);
    });
});