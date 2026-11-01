// 1. STATE GAME
let cash = 0.0;
let gold = 0;
let tapPower = 1.0;

// 2. DOM ELEMEN
const cashEl = document.getElementById('cash');
const goldEl = document.getElementById('gold');
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

// 3. UPDATE TAMPILAN
function updateUI() {
  cashEl.innerText = `$${cash.toFixed(2)}`;
  goldEl.innerText = gold;
}

// 4. TAP LAYAR (TAP-TAP NAIKIN CASH)
tapArea.addEventListener('click', (e) => {
  // Biar gak ke-trigger pas ngeklik modal/tombol
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
    tapPower = 2.5; // Baju branded bikin hasil tap nambah lebih gede!
    charTag.innerText = "👕 Baju: Branded";
    charTag.style.background = "#f59e0b"; // Efek visual warna berubah
    updateUI();
    alert("Sukses beli Baju Branded! Tap-tap sekarang dapet $2.50!");
  } else {
    alert("Cash gak cukup! Butuh $50.00.");
  }
});

// 8. PINDAH BACKGROUND (Pake 100 Gold)
buyBgBtn.addEventListener('click', () => {
  if (gold >= 100) {
    gold -= 100;
    tapPower = 10.0; // Bonus Sultan: Sekali tap langsung dapet $10.00 di Kota!
    bgTag.innerText = "🌆 Background: Kota Besar";
    tapArea.style.background = "linear-gradient(to bottom, #0f172a, #3b82f6)"; // Ganti warna latar
    updateUI();
    alert("SULTAN MANIAK! Sukses Pindah ke Kota Besar! Sekarang sekali tap dapet $10.00!");
  } else {
    alert("Gold gak cukup, bray! Butuh 100 Gold (Tuker dulu total $10.000 Cash kamu ke Gold).");
  }
});
