document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Nyelvválasztó kezelése ---
    const langButtons = document.querySelectorAll('.lang-btn');

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Aktív osztály levétele a többiről, hozzáadása a kattatotthoz
            langButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const selectedLang = btn.querySelector('span').textContent;
            console.log(`Nyelv módosítva: ${selectedLang}`);
            
            // Itt lehetne meghívni egy fordító függvényt (i18n)
        });
    });

    // --- 2. Rendelés indítása gomb ---
    const startOrderBtn = document.querySelector('.start-order-btn');
    
    startOrderBtn.addEventListener('click', () => {
        // Áttűnés effekt vagy átirányítás az étlapra
        document.body.style.opacity = '0';
        setTimeout(() => {
            console.log("Navigáció az étlapra...");
                window.location.href = 'categories.html'; // Példa navigációra
        }, 300);
    });

    // --- 3. Pincér hívása funkció ---
    const helpBtn = document.querySelector('.help-btn');
    
    helpBtn.addEventListener('click', () => {
        // Vizuális visszajelzés a felhasználónak
        const helpTitle = helpBtn.querySelector('.title');
        const originalText = helpTitle.textContent;
        
        helpBtn.style.backgroundColor = '#d32f2f'; // Pirosra vált a gomb
        helpTitle.textContent = 'Pincér hívva!';
        
        // Letiltjuk a gombot rövid időre, hogy ne lehessen spamelni
        helpBtn.disabled = true;

        alert("A pincért értesítettük a 12-es asztalhoz. Hamarosan érkezik!");

        // Visszaállítás 5 másodperc után
        setTimeout(() => {
            helpBtn.style.backgroundColor = '';
            helpTitle.textContent = originalText;
            helpBtn.disabled = false;
        }, 5000);
    });

    // --- 4. Promóció kattintás ---
    const promoBanner = document.querySelector('.promo-banner');
    
    promoBanner.addEventListener('click', () => {
        const promoName = promoBanner.querySelector('h3').textContent;
        console.log(`Promóció kiválasztva: ${promoName}`);
        // Itt megnyílhat egy részletesebb nézet az akciós termékről
    });

});