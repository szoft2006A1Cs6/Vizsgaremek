document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Alapadatok és Árkezelés ---
    const BASE_PRICES = {
        '24': 2190,
        '32': 2790,
        '45': 3890
    };

    const totalAmountDisplay = document.querySelector('.total-amount');
    const sizeRadios = document.querySelectorAll('input[name="size"]');
    const toppingCheckboxes = document.querySelectorAll('.topping-section:first-of-type input[type="checkbox"]');
    
    function updateTotalPrice() {
        // Alapár a kiválasztott méret alapján
        const selectedSize = document.querySelector('input[name="size"]:checked').value;
        let currentTotal = BASE_PRICES[selectedSize];

        // Extra feltétek hozzáadása
        toppingCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                // Kinyerjük az árat a szomszédos span-ból (pl. "+450 Ft" -> 450)
                const priceText = checkbox.closest('.topping-item').querySelector('.topping-price').textContent;
                const price = parseInt(priceText.replace(/[^0-9]/g, ''));
                currentTotal += price;
            }
        });

        // Formázott megjelenítés (pl. 2 790 Ft)
        totalAmountDisplay.textContent = `${currentTotal.toLocaleString('hu-HU')} Ft`;
    }

    // Eseményfigyelők az árhoz
    sizeRadios.forEach(radio => radio.addEventListener('change', updateTotalPrice));
    toppingCheckboxes.forEach(check => check.addEventListener('change', updateTotalPrice));

    // --- 2. Vissza gomb ---
    document.querySelector('.back-btn').addEventListener('click', () => {
        window.location.href = "pizza.html";
    }, 300);

    // --- 3. Megjegyzés gomb ---
    const noteBtn = document.querySelector('.note-btn');
    noteBtn.addEventListener('click', () => {
        const note = prompt("Van bármilyen különleges kérése? (Pl. gluténmentes tészta, vékonyabb tészta stb.)");
        if (note) {
            noteBtn.innerHTML = `<span class="material-icons">check_circle</span> Módosítva`;
            noteBtn.style.color = "#2e7d32";
        }
    });

    // --- 4. Kosárba tétel ---
    const addCartBtn = document.querySelector('.add-cart-btn');
    addCartBtn.addEventListener('click', () => {
        const selectedSize = document.querySelector('input[name="size"]:checked').value;
        
        // Gomb animáció
        addCartBtn.disabled = true;
        addCartBtn.innerHTML = `<span class="material-icons">sync</span> FOLYAMATBAN...`;

        // Szimulált mentés
        setTimeout(() => {
            alert(`Sikeresen hozzáadva: Pizza Margherita (${selectedSize} cm) - ${totalAmountDisplay.textContent}`);
            
            // Itt navigálhatunk vissza az étlapra vagy a kosárhoz
            // window.location.href = 'menu.html';
            
            addCartBtn.disabled = false;
            addCartBtn.innerHTML = `<span class="material-icons">shopping_cart</span> HOZZÁADÁS`;
        }, 800);
    });

    // --- 5. Kezdő ár kiszámítása ---
    updateTotalPrice();
});