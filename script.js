// ===================================================
// TRILLIONAIRE IDLE 3D ENGINE
// ===================================================

document.addEventListener('DOMContentLoaded', () => {

  // 1. STATE & DATA BARANG MEWAH
  let money = 0;
  let pps = 0; // Profit Per Second (Pasif)
  let tapPower = 1;

  const items = [
    { id: 'item1', name: '🚲 Sepeda Kumbang', cost: 15, pps: 1, type: 'passive', count: 0 },
    { id: 'item2', name: '📱 HP Bekas (Crypto Scalp)', cost: 100, pps: 5, type: 'passive', count: 0 },
    { id: 'item3', name: '🛵 Motor Vespa Matic', cost: 1100, pps: 32, type: 'passive', count: 0 },
    { id: 'item4', name: '🏎️ Mobil Sport 3D', cost: 12000, pps: 260, type: 'asset_car', count: 0 },
    { id: 'item5', name: '🏡 Rumah Cluster 3D', cost: 130000, pps: 1400, type: 'asset_house', count: 0 },
    { id: 'item6', name: '🏰 Mansion Sultan 3D', cost: 1400000, pps: 7800, type: 'asset_mansion', count: 0 },
    { id: 'item7', name: '🛥️ Superyacht Luxury 3D', cost: 20000000, pps: 45000, type: 'asset_yacht', count: 0 },
    { id: 'item8', name: '🛩️ Jet Pribadi Gold 3D', cost: 350000000, pps: 260000, type: 'asset_jet', count: 0 }
  ];

  // DOM Elements
  const moneyText = document.getElementById('moneyText');
  const ppsText = document.getElementById('ppsText');
  const assetName = document.getElementById('assetName');
  const tapBtn = document.getElementById('tapBtn');
  const shopList = document.getElementById('shopList');

  // 2. THREE.JS SHOWCASE 3D
  let scene, camera, renderer, currentMesh;

  function init3D() {
    const container = document.querySelector('.canvas-container');
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 1.5, 4);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('threeCanvas'), alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);

    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xf59e0b, 1.5);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // Default Mesh: Kardus Bekas
    update3DShowcase('📦 Kardus Bekas');
    animate3D();
  }

  // Ganti Objek 3D Berdasarkan Aset Termahal Yang Dimiliki
  function update3DShowcase(name) {
    if (currentMesh) scene.remove(currentMesh);

    let geo, mat;

    if (name.includes('Sepeda') || name.includes('Kardus')) {
      geo = new THREE.BoxGeometry(1, 1, 1);
      mat = new THREE.MeshStandardMaterial({ color: 0x8b5cf6, roughness: 0.5 });
    } else if (name.includes('Mobil')) {
      geo = new THREE.BoxGeometry(1.8, 0.6, 1);
      mat = new THREE.MeshStandardMaterial({ color: 0xef4444, metalness: 0.8, roughness: 0.2 });
    } else if (name.includes('Rumah') || name.includes('Mansion')) {
      geo = new THREE.ConeGeometry(1.2, 1.5, 4);
      mat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.3 });
    } else {
      // Yacht & Jet
      geo = new THREE.TorusKnotGeometry(0.7, 0.25, 100, 16);
      mat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9, roughness: 0.1 });
    }

    currentMesh = new THREE.Mesh(geo, mat);
    scene.add(currentMesh);
    assetName.innerText = name;
  }

  function animate3D() {
    requestAnimationFrame(animate3D);
    if (currentMesh) {
      currentMesh.rotation.y += 0.01;
    }
    renderer.render(scene, camera);
  }

  // 3. UI & GAMEPLAY LOGIC
  function formatMoney(num) {
    if (num >= 1e9) return '$' + (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return '$' + (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return '$' + (num / 1e3).toFixed(1) + 'K';
    return '$' + num.toLocaleString();
  }

  function renderShop() {
    shopList.innerHTML = '';
    items.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'shop-item';
      div.innerHTML = `
        <div class="item-info">
          <span class="item-name">${item.name} (${item.count})</span>
          <span class="item-effect">+${formatMoney(item.pps)}/s</span>
        </div>
        <button class="btn-buy" id="buy-${item.id}" ${money < item.cost ? 'disabled' : ''}>
          ${formatMoney(item.cost)}
        </button>
      `;
      shopList.appendChild(div);

      document.getElementById(`buy-${item.id}`).addEventListener('click', () => buyItem(index));
    });
  }

  function buyItem(index) {
    const item = items[index];
    if (money >= item.cost) {
      money -= item.cost;
      item.count++;
      pps += item.pps;
      item.cost = Math.floor(item.cost * 1.18); // Harga naik 18% tiap beli

      // Update 3D Showcase jika beli aset baru
      update3DShowcase(item.name);

      updateUI();
      renderShop();
    }
  }

  function updateUI() {
    moneyText.innerText = formatMoney(money);
    ppsText.innerText = `+${formatMoney(pps)}/s`;

    // Refresh status tombol beli
    items.forEach((item) => {
      const btn = document.getElementById(`buy-${item.id}`);
      if (btn) btn.disabled = money < item.cost;
    });
  }

  // Tap Event
  tapBtn.addEventListener('click', () => {
    money += tapPower;
    updateUI();
  });

  // Game Loop (Pasif Income per detik)
  setInterval(() => {
    if (pps > 0) {
      money += pps / 10;
      updateUI();
    }
  }, 100);

  // Init Engine
  init3D();
  renderShop();
  updateUI();
});
        
