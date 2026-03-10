document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Kategória választás kezelése ---
    const categoryCards = document.querySelectorAll('.category-card');

    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const categoryName = card.querySelector('span:last-child').textContent;
            
            // Aktív állapot vizuális visszajelzése
            card.style.transform = 'scale(0.95)';
            card.style.backgroundColor = '#f0f0f0';

            console.log(`Kiválasztott kategória: ${categoryName}`);

            // Rövid késleltetés, hogy a felhasználó érezze a kattintást
            setTimeout(() => {
                card.style.transform = '';
                card.style.backgroundColor = '';
                
                // Navigáció az adott kategória termékeihez
                // Példa: window.location.href = `products.html?category=${categoryName.toLowerCase()}`;
            }, 150);
        });
    });

    // --- 2. Vissza gomb logikája ---
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            // Visszatérés a főoldalra
            window.location.href = "home.html"; 
            // Vagy fixen: window.location.href = 'index.html';
        }, 300);
    }

    // --- 3. Lebegő segítség gomb (Floating Help) ---
    const helpBtn = document.querySelector('.floating-help-btn');
    if (helpBtn) {
        helpBtn.addEventListener('click', () => {
            // Animáljuk a gombot híváskor
            helpBtn.classList.toggle('active');
            
            const confirmHelp = confirm("Szeretne segítséget kérni egy pincértől az étlap értelmezéséhez?");
            
            if (confirmHelp) {
                alert("A pincér úton van az Ön asztalához!");
                helpBtn.style.color = '#d32f2f'; // Piros jelzés, hogy a hívás folyamatban
            }
        });
    }

    // --- 4. Finom belépő animáció a kártyáknak ---
    categoryCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.3s ease';

        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 50 * index); // Egymás után "úsznak" be a kártyák
    });
});