// 1. Variabel Data Game
let cash = 0.0;
let followers = 0;
let tapPower = 1.0; // Jumlah duit per sekali tap

// 2. Ambil Elemen dari HTML
const cashEl = document.getElementById('cash');
const followersEl = document.getElementById('followers');
const tapArea = document.getElementById('tapArea');

// 3. Fungsi Update Tampilan Angka di Layar
function updateUI() {
  cashEl.innerText = `$${cash.toFixed(2)}`;
  followersEl.innerText = followers.toLocaleString();
}

// 4. Fitur Tap Layar (Klik Panggung -> Duit & Follower Nambah)
tapArea.addEventListener('click', () => {
  cash += tapPower;
  followers += 1;
  updateUI();
});

// Jalankan saat pertama kali game dimuat
updateUI();
