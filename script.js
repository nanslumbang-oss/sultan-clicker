document.addEventListener('DOMContentLoaded', () => {

  // 1. STATE GAME
  let cash = 0.0;
  let incomePerSec = 0.14;
  let followers = 0;
  let gems = 7;
  let tapPower = 1.0;

  // DOM Elements
  const cashText = document.getElementById('cashText');
  const incomeText = document.getElementById('incomeText');
  const followersText = document.getElementById('followersText');
  const gemsText = document.getElementById('gemsText');
  const speechBubble = document.getElementById('speechBubble');
  const stageTapArea = document.getElementById('stageTapArea');
  
  // Visual Elements
  const houseVisual = document.getElementById('houseVisual');
  const carVisual = document.getElementById('carVisual');
  const charVisual = document.getElementById('charVisual');
  const camVisual = document.getElementById('camVisual');

  // Shop Elements
  const shopDrawer = document.getElementById('shopDrawer');
  const drawerTitle = document.getElementById('drawerTitle');
  const drawerList = document.getElementById('drawerList');
  const closeDrawer = document.getElementById('closeDrawer');
  const navTabs = document.querySelectorAll('.nav-tab');

  // 2. DATA UPGRADES
  const upgrades = {
    property: [
      { name: '🚗 Mobil Sedan Bekas', cost: 150, pps: 0.5, type: 'car', icon: '🚗 Mobil Sedan' },
      { name: '🏠 Rumah Minimalis', cost: 500, pps: 2.0, type: 'house', icon: '🏡 Rumah Minimalis' },
      { name: '🏎️ Supercar Sport', cost: 2500, pps: 10.0, type: 'car', icon: '🏎️ Supercar Red' },
      { name: '🏰 Mansion Sultan', cost: 12000, pps: 50.0, type: 'house', icon: '🏰 Mansion Villa' }
    ],
    equipment: [
      { name: '💡 Ring Light Simple', cost: 50, pps: 0.2, type: 'cam', icon: '💡 Ringlight + HP' },
      { name: '📸 Kamera Mirrorless', cost: 300, pps: 1.5, type: 'cam', icon: '📸 Mirrorless 4K' },
      { name: '🎙️ Studio Setup Stream', cost: 2000, pps: 8.0, type: 'cam', icon: '🎙️ Pro Studio' }
    ],
    outfit: [
      { name: '👕 Kaos Polos Rapi', cost: 30, pps: 0.1, type: 'char', icon: '👨‍💼 Kaos Rapi' },
      { name: '🧥 Hoodie Streetwear', cost: 200, pps: 0.8, type: 'char', icon: '🕺 Hoodie Hype' },
      { name: '🕴️ Jas Tuxedo Sultan', cost: 1500, pps: 5.0, type: 'char', icon: '🕴️ Sultan Rich' }
    ],
    skill: [
      { name: '🧠 Trik Clickbait Viral', cost: 80, tap: 1.5, pps: 0.3 },
      { name: '🎬 Skill Editing Pro', cost: 400, tap: 3.0, pps: 1.2 },
      { name: '🔥 Algoritma Master', cost: 3000, tap: 10.0, pps: 15.0 }
    ]
  };

  const speechQuotes = ["LOSER!", "NOOBS!", "VIRALIN!", "GAS SUBSCRIBED!", "SULTAN!", "MANTAP BRO!"];

  // 3. TAP SCREEN LOGIC
  stageTapArea.addEventListener('click', (e) => {
    if (e.target.closest('.bottom-nav') || e.target.closest('.shop-drawer')) return;

    cash += tapPower;
    followers += Math.floor(Math.random() * 2) + 1;

    // Pop Floating text animation
    createFloatingText(e.clientX, e.clientY, `+$${tapPower.toFixed(1)}`);
    updateUI();
  });

  function createFloatingText(x, y, text) {
    const el = document.createElement('div');
    el.innerText = text;
    el.style.position = 'absolute';
    el.style.left = `${x - 20}px`;
    el.style.top = `${y - 20}px`;
    el.style.color = '#22c55e';
    el.style.fontWeight = '900';
    el.style.fontSize = '1.1rem';
    el.style.pointerEvents = 'none';
    el.style.zIndex = '100';
    el.style.transition = 'all 0.6s ease-out';
    document.body.appendChild(el);

    setTimeout(() => {
      el.style.transform = 'translateY(-40px)';
      el.style.opacity = '0';
    }, 20);

    setTimeout(() => el.remove(), 600);
  }

  // 4. DRAWER SHOP TAB SYSTEM
  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      navTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const tabType = tab.getAttribute('data-tab');
      openShop(tabType);
    });
  });

  function openShop(type) {
    drawerTitle.innerText = `UPGRADE ${type.toUpperCase()}`;
    drawerList.innerHTML = '';

    const list = upgrades[type] || [];
    list.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'shop-item';
      div.innerHTML = `
        <div class="item-left">
          <span class="item-title">${item.name}</span>
          <span class="item-desc">+${item.pps ? '$' + item.pps + '/s' : ''} ${item.tap ? '+$' + item.tap + '/tap' : ''}</span>
        </div>
        <button class="btn-buy-item" id="buyBtn-${type}-${index}" ${cash < item.cost ? 'disabled' : ''}>
          $${item.cost}
        </button>
      `;
      drawerList.appendChild(div);

      document.getElementById(`buyBtn-${type}-${index}`).addEventListener('click', () => {
        buyUpgrade(type, index);
      });
    });

    shopDrawer.classList.add('open');
  }

  closeDrawer.addEventListener('click', () => {
    shopDrawer.classList.remove('open');
  });

  function buyUpgrade(type, index) {
    const item = upgrades[type][index];
    if (cash >= item.cost) {
      cash -= item.cost;
      if (item.pps) incomePerSec += item.pps;
      if (item.tap) tapPower += item.tap;

      // Update Visuals on Stage
      if (item.type === 'house') houseVisual.innerText = item.icon;
      if (item.type === 'car') carVisual.innerText = item.icon;
      if (item.type === 'char') charVisual.innerText = item.icon;
      if (item.type === 'cam') camVisual.innerText = item.icon;

      item.cost = Math.floor(item.cost * 1.5); // Harga naik

      // Change Speech Bubble Text
      speechBubble.innerText = speechQuotes[Math.floor(Math.random() * speechQuotes.length)];

      updateUI();
      openShop(type); // Refresh list UI
    }
  }

  // 5. GAME LOOP (PASSIVE INCOME)
  setInterval(() => {
    if (incomePerSec > 0) {
      cash += incomePerSec / 10;
      updateUI();
    }
  }, 100);

  function updateUI() {
    cashText.innerText = `$${cash.toFixed(2)}`;
    incomeText.innerText = `+$${incomePerSec.toFixed(2)}/s`;
    followersText.innerText = followers.toLocaleString();
    gemsText.innerText = gems;
  }

  updateUI();
});
                         
