// 1. STATE GAME
let cash = 0.0;
let gold = 0;
let tapPower = 1.0;
let passiveIncome = 0.0; // Pasif income ($/detik)

// 2. DOM ELEMEN
const cashEl = document.getElementById('cash');
const goldEl = document.getElementById('gold');
const passiveIncomeText = document.getElementById('passiveIncomeText');
const tapArea = document.getElementById('tapArea');

// Visual Element
const bgTag = document.getElementById('bgTag');
const charTag = document.getElementById('charTag');

// Shop Modal Elemen
const shopModal = document.getElementById('shopModal');
const openShopBtn = document.getElementById('openShopBtn');
const closeShopBtn = document.getElementById('closeShopBtn');

// Tombol Transaksi
const buyGoldBtn = document.getElementById('buyGoldBtn');
const buyClothesBtn = document.getElementById('buyClothesBtn');
const buyBgBtn = document.getElementById('buyBgBtn');
const buyBikeBtn = document.getElementById('buyBikeBtn');
const buyStreamBtn = document.getElementById('buyStreamBtn');

// 3. UPDATE TAMPILAN
function updateUI() {
  cashEl.innerText = `$${cash.toFixed(2)}`;
  goldEl.innerText = gold;
  passiveIncomeText.innerText = `+$${passiveIncome.toFixed(2)}/s`;
}

// 4. TAP LAYAR (TAP-TAP NAIKIN CASH)
tapArea.addEventListener('click', (e) => {
  if (e.target.closest('.shop-modal') || e.target.closest('.bottom-nav')) return;

  cash += tapPower;
  updateUI();
});

// 5. BUKA & TUTUP KERANJANG
openShopBtn.addEventListener('click', () => shopModal.classList.add('open'));
closeShopBtn.addEventListener('click', () => shopModal.classList.remove('open'));

// 6. LOGIKA TUKAR CASH KE GOLD ($100 -> 1 Gold)
buyGoldBtn.addEventListener('click', () => {
  if (cash >= 100) {
    cash -= 100;
    gold += 1;
    updateUI();
  } else {
    alert("Cash gak cukup! Butuh $100.00 buat dapet 1 Gold.");
  }
});

// 7. UPGRADE BAJU (Pake Cash $50)
buyClothesBtn.addEventListener('click', () => {
  if (cash >= 50) {
    cash -= 50;
    tapPower = 2.5; 
    charTag.innerText = "👕 Baju: Branded";
    charTag.style.background = "#f59e0b";
    updateUI();
    alert("Sukses beli Baju Branded! Tap-tap sekarang dapet $2.50!");
  } else {
    alert("Cash gak cukup! Butuh $50.00.");
  }
});

// 8. BUY PASIF INCOME (Sepeda & Stream Setup)
buyBikeBtn.addEventListener('click', () => {
  if (cash >= 20) {
    cash -= 20;
    passiveIncome += 0.50; // Nambah $0.50 per detik
    updateUI();
  } else {
    alert("Cash gak cukup! Butuh $20.00.");
  }
});

buyStreamBtn.addEventListener('click', () => {
  if (cash >= 120) {
    cash -= 120;
    passiveIncome += 2.50; // Nambah $2.50 per detik
    updateUI();
  } else {
    alert("Cash gak cukup! Butuh $120.00.");
  }
});

// 9. PINDAH BACKGROUND (Pake 100 Gold)
buyBgBtn.addEventListener('click', () => {
  if (gold >= 100) {
    gold -= 100;
    tapPower = 10.0;
    bgTag.innerText = "🌆 Background: Kota Besar";
    tapArea.style.background = "linear-gradient(to bottom, #0f172a, #3b82f6)";
    updateUI();
    alert("SULTAN MANIAK! Sukses Pindah ke Kota Besar! Sekarang sekali tap dapet $10.00!");
  } else {
    alert("Gold gak cukup, bray! Butuh 100 Gold.");
  }
});

// 10. GAME LOOP - PASIF INCOME RUNNER (Jalan tiap 100 milidetik biar smooth)
setInterval(() => {
  if (passiveIncome > 0) {
    cash += passiveIncome / 10;
    updateUI();
  }
}, 100);

// Init saat pertama buka
updateUI();
