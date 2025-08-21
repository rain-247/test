// =====================
// Hero 輪播（淡入淡出）
// =====================
const slides = document.querySelectorAll('.slide');
let currentIndex = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.opacity = i === index ? '1' : '0';
  });
}
if (slides.length) {
  showSlide(currentIndex);
  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }, 3000);
}

// =====================================
// 第二區：地景地圖（pins + 詳情彈窗）
// =====================================
const pois = [
  { id:0, name:'鍾肇政文學園區', left:72, top:54, thumb:'./img/map_zong.jpg', img:'./img/map_zong.jpg', desc:'以文學為主題的公共空間，串連地方記憶與閱讀活動。' },
  { id:1, name:'菱潭街興創基地', left:55, top:38, thumb:'./img/map_ling.jpg', img:'./img/map_ling.jpg', desc:'老屋再生據點，聚合店家、展演與工作坊，街區活化核心。' },
  { id:2, name:'龍潭大池',       left:25, top:70, thumb:'./img/map_water.jpg', img:'./img/map_water.jpg', desc:'龍潭的水域地標，環湖步道適合散步與騎行。' },
  { id:3, name:'龍元宮',         left:75, top:24, thumb:'./img/map_long.jpg', img:'./img/map_long.jpg', desc:'地方信仰中心，節慶時人潮聚集，周邊小吃林立。' },
  { id:4, name:'南天宮',         left:34, top:86, thumb:'./img/map_south.jpg', img:'./img/map_south.jpg', desc:'臨水而建的廟宇，視覺地標，適合從跨堤觀景。' }
];

(function initPins() {
  const pinsHost   = document.getElementById('pins');
  const detail     = document.getElementById('poiDetail');
  const detailImg  = document.getElementById('detailImg');
  const detailTitle= document.getElementById('detailTitle');
  const detailDesc = document.getElementById('detailDesc');
  const closeBtn   = document.getElementById('detailClose');

  if (!pinsHost || !detail) return;

  pois.forEach(p => {
    const btn = document.createElement('button');
    btn.className = 'pin';
    btn.style.left = p.left + '%';
    btn.style.top  = p.top + '%';
    btn.innerHTML = `
      <img src="${p.thumb}" alt="${p.name}">
      <span class="pin-label">${p.name}</span>
    `;
    btn.addEventListener('click', () => openDetail(p));
    pinsHost.appendChild(btn);
  });

  function openDetail(poi){
    detailImg.src = poi.img;
    detailImg.alt = poi.name;
    detailTitle.textContent = poi.name;
    detailDesc.textContent = poi.desc;
    detail.classList.add('is-open');
    detail.setAttribute('aria-hidden','false');
  }

  function closeDetail(){
    detail.classList.remove('is-open');
    detail.setAttribute('aria-hidden','true');
  }

  closeBtn && closeBtn.addEventListener('click', closeDetail);
  detail.addEventListener('click', e => { if (e.target === detail) closeDetail(); });
})();

(function () {
  const canvas = document.querySelector('#section2 .map-canvas');
  const panel  = document.querySelector('#section2 .poi-detail');
  if (!canvas || !panel) return;

  const PADDING = 12; // 內縮，避免貼邊
  let ticking = false;

  function clamp(v, min, max){ return Math.max(min, Math.min(max, v)); }

  // 根據地圖在視窗的位置，定位彈窗中心點
  function anchorToMapCenter() {
    const rect = canvas.getBoundingClientRect();
    const panelW = panel.offsetWidth || 0;
    const panelH = panel.offsetHeight || 0;

    // 地圖中心（視窗座標）
    let cx = rect.left + rect.width  / 2;
    let cy = rect.top  + rect.height / 2;

    // 讓彈窗不會超出地圖：把中心點限制在可容納範圍
    const minX = rect.left + PADDING + panelW / 2;
    const maxX = rect.right - PADDING - panelW / 2;
    const minY = rect.top  + PADDING + panelH / 2;
    const maxY = rect.bottom - PADDING - panelH / 2;

    // 如果地圖比彈窗小，直接用地圖中心（避免 NaN）
    if (rect.width  <= panelW + PADDING*2) { cx = rect.left + rect.width/2; }
    else { cx = clamp(cx, minX, maxX); }
    if (rect.height <= panelH + PADDING*2) { cy = rect.top + rect.height/2; }
    else { cy = clamp(cy, minY, maxY); }

    panel.style.left = Math.round(cx) + 'px';
    panel.style.top  = Math.round(cy) + 'px';
  }

  function requestAnchor() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      if (panel.classList.contains('is-open')) anchorToMapCenter();
      ticking = false;
    });
  }

  // 對外：呼叫它來開啟彈窗（保留你原本填內容的流程）
  window.openPoiDetailAnchored = function () {
    // 先顯示，才能拿到正確尺寸
    panel.classList.add('is-open');
    anchorToMapCenter();
  };

  // 你原本的關閉可沿用；若沒有就補這個
  window.closePoiDetailAnchored = function () {
    panel.classList.remove('is-open');
  };

  // 滾動 / 縮放 / 視窗方向改變時，重新對齊
  window.addEventListener('scroll', requestAnchor, { passive: true });
  window.addEventListener('resize', requestAnchor);
  window.addEventListener('orientationchange', requestAnchor);

  // 圖片載入完大小變了也要重算（例如 detail-img）
  panel.addEventListener('load', requestAnchor, true);
})();

// =====================================
// 第七區：店鋪地圖（markers + info 卡片）
// =====================================
const stores = [
  {
    id: "xianrou",
    name: "小仙肉の家",
    subtitle: "森林系 × 手作 × 舒壓療癒",
    coords: { x: 26, y: 64 },
    mascotSrc: "./img/shot.png",
    logoSrc: "./img/boss.png",
    ownerPhoto: "./images/owners/xianrou.jpg",
    ownerName: "小鮮肉姐姐",
    desc: "以「森林小店」為靈感的手作雜貨空間。店內有老闆手作的水泥盆與鋁線作品，皆為獨一無二；也曾開設多場手作課程、與社福單位合作。希望來訪的人都能放鬆療癒，像走進一片綠意。"
  },
  {
    id: "qfa",
    name: "Q發柴燒",
    subtitle: "真材實料 × 紮實奶香雞蛋糕 × 公益行動",
    coords: { x: 41, y: 52 },
    mascotSrc: "./images/mascots/qfa.png",
    logoSrc: "./images/logos/qfa-logo.png",
    ownerPhoto: "./images/owners/qfa.jpg",
    ownerName: "淑婷姐",
    desc: "不加水、不用發泡粉，全程鮮奶，口感紮實帶奶香。長年投入公益：每日營業額提撥 10%，年底製作 1500 套四菜一湯年菜親送學童；亦與學校、長照、禮儀單位合作，並提供學生優惠與滿分兌換活動。"
  },
  {
    id: "suixin",
    name: "隨心所遇",
    subtitle: "繽紛手作 × 隨心所欲 × 療癒小物",
    coords: { x: 58, y: 47 },
    mascotSrc: "./images/mascots/suixin.png",
    logoSrc: "./images/logos/suixin-logo.png",
    ownerPhoto: "./images/owners/suixin.jpg",
    ownerName: "",
    desc: "2025 年 3 月自合興車站搬遷至菱潭街。作品多取材自剩布與碎布，每件皆獨一無二，包含布娃娃、吊飾與『大肚魚包』等。信奉「60 分也很好」的創作哲學：做自己喜歡的事，讓小物靜靜陪你。"
  },
  {
    id: "gs",
    name: "GS流行時尚館",
    subtitle: "個性飾品 × 嘻哈龐克 × 耳環蝴蝶",
    coords: { x: 35, y: 38 },
    mascotSrc: "./store01.png",
    logoSrc: "./store01.png",
    ownerPhoto: "./images/owners/gs.jpg",
    ownerName: "小哥",
    desc: "深耕飾品 30+ 年，櫥窗與燈光陳列一眼就懂。主打耳環、項鍊與戒指，蝴蝶與狐狸造型最受歡迎。節慶會彈性延長營業以配合人流。角色視覺偏嘻哈龐克（墨鏡、項鍊、戒指）以展現個性。"
  },
  {
    id: "catfive",
    name: "石麻谷",
    subtitle: "平安編織 × 禪意小舖 × 手工飾品",
    coords: { x: 68, y: 61 },
    mascotSrc: "./images/mascots/catfive.png",
    logoSrc: "./images/logos/catfive-logo.png",
    ownerPhoto: "./images/owners/catfive.jpg",
    ownerName: "Mo姐",
    desc: "菱潭街第一批店家，經營已 8 年。以五色線編織與刻字石頭為主，傳遞「平安」祝福；店裡安靜放鬆、帶點禪意。從會場銷售轉跑道後，累積穩定客群，也常邀客人進店聊聊、吹冷氣，讓人帶著平安離開。"
  }
];

const markerLayer   = document.getElementById("store-markers");
const infoBox       = document.getElementById("info-box");
const infoTitle     = document.getElementById("info-title");
const infoSubtitle  = document.getElementById("info-subtitle");
const infoDesc      = document.getElementById("info-desc");
const infoClose     = document.getElementById("info-close");
const infoLogo      = document.getElementById("info-logo");
const infoOwnerPhoto= document.getElementById("info-owner-photo");
const infoOwnerName = document.getElementById("info-owner-name");



function positionInfoBox() {
  if (!infoBox) return;

  // 手機寬度：清掉 inline 定位，讓 CSS 生效
  if (window.innerWidth <= 640) {
    infoBox.style.top = '';
    infoBox.style.left = '';
    infoBox.style.right = '';
    return;
  }

  const map = document.querySelector('.map-container');
  if (!map) return;

  const rect   = map.getBoundingClientRect();
  const padding= 12; 
  const boxW   = infoBox.offsetWidth || 340;

  const nav    = document.querySelector('nav.fixed');
  const navH   = (nav && nav.offsetHeight) ? nav.offsetHeight : 64;

  let top  = rect.top + padding;
  let left = rect.right - boxW - padding;

  top  = Math.max(top, navH + 8);
  left = Math.max(left, 8);
  left = Math.min(left, window.innerWidth - boxW - 8);

  infoBox.style.top  = `${top}px`;
  infoBox.style.left = `${left}px`;
  infoBox.style.right= 'auto';
}

let resizeHandler = null;

if (markerLayer && infoBox) {
  stores.forEach(store => {
    const btn = document.createElement("button");
    btn.style.left = store.coords.x + "%";
    btn.style.top  = store.coords.y + "%";
    btn.innerHTML = `
  <img src="${store.mascotSrc}" alt="${store.name}">
  <span class="marker-label">${store.name}</span>
`;

    btn.addEventListener("click", () => {
      infoTitle.textContent    = store.name || "未命名店鋪";
      infoSubtitle.textContent = store.subtitle || "";
      infoDesc.textContent     = store.desc || "";

      if (store.logoSrc) {
        infoLogo.src = store.logoSrc;
        infoLogo.alt = `${store.name} Logo`;
        infoLogo.style.display = "";
      } else {
        infoLogo.style.display = "none";
      }

      if (store.ownerPhoto) {
        infoOwnerPhoto.src = store.ownerPhoto;
        infoOwnerPhoto.alt = `${store.name} 店主照片`;
        infoOwnerPhoto.style.display = "";
      } else {
        infoOwnerPhoto.style.display = "none";
      }
      infoOwnerName.textContent = store.ownerName || "";

      infoBox.classList.remove("hidden");
      positionInfoBox();

      if (!resizeHandler) {
        resizeHandler = () => positionInfoBox();
        window.addEventListener('resize', resizeHandler);
        window.addEventListener('scroll', resizeHandler, { passive: true });
      }
    });

    markerLayer.appendChild(btn);
  });

  

  infoClose && infoClose.addEventListener("click", () => {
    infoBox.classList.add("hidden");
    if (resizeHandler) {
      window.removeEventListener('resize', resizeHandler);
      window.removeEventListener('scroll', resizeHandler);
      resizeHandler = null;
    }
  });

  const mapContainer = document.querySelector('.map-container');
  mapContainer && mapContainer.addEventListener('click', (e) => {
    if (e.target.closest('.marker-layer button')) return;
    infoBox.classList.add('hidden');
    if (resizeHandler) {
      window.removeEventListener('resize', resizeHandler);
      window.removeEventListener('scroll', resizeHandler);
      resizeHandler = null;
    }
  });
}

(function(){
  const panel = document.querySelector('#section2 .poi-detail');
  if (!panel) return;
  const closeBtn = panel.querySelector('.detail-close');

  window.openPoiDetailFixed = function(){
    panel.classList.add('is-open');
    document.body.classList.add('modal-open');
  };

  function close2(){
    panel.classList.remove('is-open');
    document.body.classList.remove('modal-open');
  }
  closeBtn?.addEventListener('click', close2);
  window.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') close2(); });
})();

(function(){
  const box = document.querySelector('#section8 .info-box');
  if (!box) return;
  const closeBtn = box.querySelector('.info-close');

  window.openShopInfoFixed = function(){
    box.classList.add('is-open');
    document.body.classList.add('modal-open');
  };

  function close7(){
    box.classList.remove('is-open');
    document.body.classList.remove('modal-open');
  }
  closeBtn?.addEventListener('click', close7);
  window.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') close7(); });
})();

// 讓導覽錨點平滑滾動，並預留固定導覽列高度
// 讓導覽錨點平滑滾動（自訂時長，避免過慢）
(function () {
  const header = document.querySelector('nav.fixed');

  function easeInOutQuad(t){ return t < 0.5 ? 2*t*t : -1 + (4 - 2*t)*t; }

  function animateScrollTo(toY, duration = 700) {
    const startY = window.pageYOffset;
    const delta  = toY - startY;
    const start  = performance.now();

    function step(now) {
      const t = Math.min(1, (now - start) / duration);
      const y = startY + delta * easeInOutQuad(t);
      window.scrollTo(0, y);
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function scrollToHash(hash, replaceHistory = false) {
    const target = document.querySelector(hash);
    if (!target) return;

    const headerH = header ? header.offsetHeight : 0;
    const extraGap = 12; // 讓標題有點呼吸感
    const top = target.getBoundingClientRect().top + window.pageYOffset - headerH - extraGap;

    animateScrollTo(top, 720);  // 720ms：不卡、也不會 5 秒那麼慢
    if (replaceHistory) history.replaceState(null, '', hash);
    else history.pushState(null, '', hash);
  }

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;

    const url = new URL(a.href, location.href);
    const hash = url.hash;
    if (!hash) return;

    if (url.pathname === location.pathname) {
      e.preventDefault();
      scrollToHash(hash);
    }
  });

  window.addEventListener('load', () => {
    if (location.hash) setTimeout(() => scrollToHash(location.hash, true), 0);
  });
})();



// 3–6 區：圖片切換（控制鈕固定在圖片內右下角）
(function () {
  const sections = ['section4', 'section5', 'section6', 'section7'];

  // 如果你想手動指定多張圖，填在這裡；不填就會自動讀取 image-block 裡的 <img>
  const IMAGE_SOURCES = {
    section4: ['./img/4-1.jpg','./img/4-2.jpg','./img/4-3.jpg','./img/4-4.jpg'],
    section5: ['./img/5-1.jpg','./img/5-2.jpg','./img/5-3.jpg'],
    section6: ['./img/6-1.jpg','./img/6-2.jpg','./img/6-3.jpg'],
    section7: ['./img/7-1.jpg','./img/7-2.jpg','./img/7-3.jpg'],
  };
  // 對應每張圖片的說明（可選）
  // 若未提供，會嘗試從 <img data-caption="..."> 或現有 <figcaption> 取得 / 維持不變
  const CAPTION_SOURCES = {
    // section4: ['斑駁痕跡保留了時間','封存於牆面的故事'],
    section5: ['老屋新生的下一章','巷弄裡的微亮'],
    // section6: ['日常的溫度','水面上的風'],
    section7: ['5_1.jpg','5_2.jpg'],
  };


  sections.forEach(id => {
    const root = document.getElementById(id);
    if (!root) return;
    const imgBlock = root.querySelector('.image-block');
    if (!imgBlock) return;

    // 收集圖片來源
    const imgs = Array.from(imgBlock.querySelectorAll('img'));
    let sources = (IMAGE_SOURCES[id] && IMAGE_SOURCES[id].length)
      ? IMAGE_SOURCES[id].slice()
      : imgs.map(img => img.currentSrc || img.src).filter(Boolean);

    // 收集對應說明文字
    const figcaptionEl = imgBlock.querySelector('figcaption');
    let captions = (CAPTION_SOURCES[id] && CAPTION_SOURCES[id].length)
      ? CAPTION_SOURCES[id].slice()
      : imgs.map(img => img.getAttribute('data-caption') || '').filter(x => x !== '');


    if (!sources.length) return;

    // 只用第一張當顯示容器
    const displayImg = imgs[0];
    imgs.slice(1).forEach(el => { el.style.display = 'none'; });

    // 插入控制鈕（右下角）
    let nav = imgBlock.querySelector('.img-nav');
    if (!nav) {
      nav = document.createElement('div');
      nav.className = 'img-nav';
      nav.innerHTML = `
        <button class="prev" aria-label="上一張"><i class="arrow"></i></button>
        <button class="next" aria-label="下一張"><i class="arrow"></i></button>
      `;
      imgBlock.appendChild(nav);
    }

    let index = 0;
    function show(i) {
      index = (i + sources.length) % sources.length;
      // 更新圖片
      displayImg.src = sources[index]
    }

    nav.querySelector('.prev').addEventListener('click', (e) => {
      e.stopPropagation();
      show(index - 1);
    });
    nav.querySelector('.next').addEventListener('click', (e) => {
      e.stopPropagation();
      show(index + 1);
    });

    show(0);
  });
})();

// 地圖下方：店鋪補充卡片條
(function(){
  const track = document.getElementById('store-strip-track');
  if (!track || !stores || !stores.length) return;
  const prev = document.querySelector('.strip-prev');
  const next = document.querySelector('.strip-next');

  function openStoreInfo(store){
    infoTitle.textContent    = store.name || "未命名店鋪";
    infoSubtitle.textContent = store.subtitle || "";
    infoDesc.textContent     = store.desc || "";
    if (store.logoSrc) { infoLogo.src = store.logoSrc; infoLogo.alt = (store.name||"") + " Logo"; infoLogo.style.display=""; }
    else { infoLogo.style.display="none"; }
    if (store.ownerPhoto) { infoOwnerPhoto.src = store.ownerPhoto; infoOwnerPhoto.alt = (store.name||"") + " 店主照片"; infoOwnerPhoto.style.display=""; }
    else { infoOwnerPhoto.style.display="none"; }
    infoOwnerName.textContent = store.ownerName || "";
    infoBox.classList.remove("hidden");
    positionInfoBox();
    if (!resizeHandler) {
      resizeHandler = () => positionInfoBox();
      window.addEventListener('resize', resizeHandler);
      window.addEventListener('scroll', resizeHandler, { passive: true });
    }
  }

  stores.forEach(s => {
    const li = document.createElement('li');
    li.className = 'strip-card';
    li.innerHTML = `
      <img class="card-image" src="${s.logoSrc || s.mascotSrc || ''}" alt="${s.name || ''}">
      <div class="card-body">
        <p class="card-title">${s.name || ''}</p>
        <p class="card-sub">${s.subtitle || ''}</p>
      </div>`;
    li.addEventListener('click', () => openStoreInfo(s));
    track.appendChild(li);
  });

  function itemsPerView(){
    if (window.innerWidth >= 1024) return 4;
    if (window.innerWidth <= 640)  return 2;
    return 3;
  }

  let index = 0;
  function update(){
    const n = itemsPerView();
    const total = track.children.length;
    const pages = Math.max(1, Math.ceil(total / n));
    index = ((index % pages) + pages) % pages;
const card = track.querySelector('.strip-card');
const cardW = card ? card.getBoundingClientRect().width : 0;
const gap = parseFloat(getComputedStyle(track).gap) || 0;
const shift = index * (n * cardW + (n - 1) * gap);
track.style.transform = `translateX(${-shift}px)`;
}

  prev && prev.addEventListener('click', () => { index = index - 1; update(); });
  next && next.addEventListener('click', () => { index = index + 1; update(); });
  window.addEventListener('resize', update);
  requestAnimationFrame(update);
})();


// 第二段地圖：依實際渲染尺寸，同步 pins 容器大小（載入/縮放都重算）
(function () {
  const canvas = document.querySelector('#section2 .map-canvas');
  const pins   = document.querySelector('#section2 .pins');
  const img    = document.querySelector('#section2 .map-image');
  if (!canvas || !pins || !img) return;

  function syncPinsSize() {
    const r = canvas.getBoundingClientRect();
    pins.style.width  = r.width  + 'px';
    pins.style.height = r.height + 'px';
  }

  syncPinsSize();
  if (!img.complete) img.addEventListener('load', syncPinsSize, { once: true });
  window.addEventListener('resize', syncPinsSize);
})();


(function () {
  const canvas = document.querySelector('#section2 .map-canvas');
  const pins   = document.querySelector('#section2 .pins');
  const img    = document.querySelector('#section2 .map-image');
  if (!canvas || !pins || !img) return;

  function syncPinsSize() {
    const r = canvas.getBoundingClientRect();
    pins.style.width  = r.width + 'px';
    pins.style.height = r.height + 'px';
  }
  syncPinsSize();
  if (!img.complete) img.addEventListener('load', syncPinsSize, { once: true });
  window.addEventListener('resize', syncPinsSize);
})();