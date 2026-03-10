document.addEventListener('DOMContentLoaded', () => {
    
    // --- VÁLTOZÓK ---
    const tipModal = document.getElementById('tip-modal');
    const tipBtns = document.querySelectorAll('.tip-btn');
    const confirmTipBtn = document.getElementById('confirm-tip-btn');
    const calculatedTipDisplay = document.getElementById('calculated-tip');
    const finalAmountDisplay = document.querySelector('.amount');
    const methodCards = document.querySelectorAll('.method-card');
    
    let originalTotal = 7491; // Alap fizetendő
    let selectedMethod = ''; // 'CARD' vagy 'CASH'
    let currentTip = 749;    // Alapértelmezett 10%

    // --- 1. BORRAVALÓ KEZELÉSE ---

    // Fizetési kártyára kattintáskor felugrik a borravaló ablak
    methodCards.forEach(card => {
        card.addEventListener('click', () => {
            selectedMethod = card.classList.contains('card') ? 'CARD' : 'CASH';
            tipModal.style.display = 'flex';
        });
    });

    // Borravaló gombok logikája
    tipBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tipBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            if (btn.hasAttribute('data-custom')) {
                const customTip = prompt("Adja meg a borravaló összegét (Ft):");
                if (customTip && !isNaN(customTip)) {
                    currentTip = parseInt(customTip);
                }
            } else {
                const percent = parseInt(btn.getAttribute('data-percent'));
                currentTip = Math.round(originalTotal * (percent / 100));
            }
            
            calculatedTipDisplay.textContent = `${currentTip.toLocaleString('hu-HU')} Ft`;
        });
    });

    // Borravaló megerősítése után indul a fizetési szimuláció
    confirmTipBtn.addEventListener('click', () => {
        const totalWithTip = originalTotal + currentTip;
        finalAmountDisplay.textContent = `${totalWithTip.toLocaleString('hu-HU')} Ft`;
        tipModal.style.display = 'none';

        if (selectedMethod === 'CARD') {
            startCardPayment(totalWithTip);
        } else {
            startCashPayment();
        }
    });

    // --- 2. FIZETÉSI FOLYAMATOK ---

    function startCardPayment(amount) {
        const overlay = createStatusOverlay('Kérjük, érintse kártyáját a terminálhoz...', 'credit_card');
        document.body.appendChild(overlay);

        setTimeout(() => {
            overlay.querySelector('h2').textContent = 'Fizetés folyamatban...';
            
            setTimeout(() => {
                overlay.querySelector('.material-icons').textContent = 'check_circle';
                overlay.querySelector('.material-icons').style.color = '#16A34A';
                overlay.querySelector('h2').textContent = 'Sikeres Fizetés!';
                
                setTimeout(() => {
                    alert(`Rendelés leadva! Összesen: ${amount.toLocaleString('hu-HU')} Ft. Sorszáma: #A12`);
                    window.location.href = 'index.html';
                }, 2000);
            }, 2000);
        }, 1500);
    }

    function startCashPayment() {
        alert("Rendelését rögzítettük! Kérjük, fizesse ki a számlát a pultnál a 12-es asztalszámra hivatkozva.");
        window.location.href = 'index.html';
    }

    // Segédfüggvény az animált ablakhoz
    function createStatusOverlay(text, icon) {
        const div = document.createElement('div');
        div.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.9); display: flex; align-items: center;
            justify-content: center; z-index: 9999; color: white; text-align: center;
        `;
        div.innerHTML = `
            <div style="background: white; color: #333; padding: 3rem; border-radius: 2rem; width: 85%;">
                <span class="material-icons" style="font-size: 5rem; color: #D32F2F;">${icon}</span>
                <h2 class="font-display" style="margin-top: 1rem;">${text}</h2>
            </div>
        `;
        return div;
    }

    // Vissza gomb
    document.querySelector('.back-btn').addEventListener('click', () => window.location.href = "customize.html", 300);
});