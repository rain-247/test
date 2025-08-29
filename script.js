

(function(){
  
  if (typeof window.buildSlides !== 'function'){
    window.buildSlides = function(urls, altBase){
      const track = document.getElementById('shopSlideTrack');
      const dots  = document.getElementById('shopSlideDots');
      if (!track || !dots) return;
      const list = Array.isArray(urls) ? urls : [];
      track.innerHTML = list.map(u => `<div class="shop-slide"><img src="${u}" alt="${altBase||''} 照片"></div>`).join('');
      dots.innerHTML  = list.map((_,i)=>`<div class="shop-slide-dot${i===0?' is-active':''}" data-idx="${i}"></div>`).join('');
    };
  }

  
  const section8 = document.getElementById('section8');
  const grid     = document.getElementById('shopGrid') || document.querySelector('.shop-grid');
  const modal    = document.getElementById('shopModal');
  const mClose   = document.getElementById('shopModalClose');

  if (!section8 || !modal) return;

  
  
function openModalNear(target){
  
  const section8 = document.getElementById('section8');
  const grid = document.getElementById('shopGrid') || document.querySelector('.shop-grid');
  const modal = document.getElementById('shopModal');
  if (!modal || !section8 || !grid) return;

  
  if (!section8.contains(modal)) section8.appendChild(modal);
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');

  
  Object.assign(modal.style, {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    maxWidth: 'min(88vw, 860px)',
    maxHeight: '92vh',
    overflow: 'auto'
  });

  const secRect  = section8.getBoundingClientRect();
  const gridRect = grid.getBoundingClientRect();

  
  let cx = (gridRect.left + gridRect.width / 2) - secRect.left;
  let cy = (gridRect.top  + gridRect.height/ 2) - secRect.top;

  
  const PADDING = 12;
  const modalW = modal.offsetWidth  || 0;
  const modalH = modal.offsetHeight || 0;
  const minX = PADDING + modalW / 2;
  const maxX = Math.max(minX, section8.clientWidth  - PADDING - modalW / 2);
  const minY = PADDING + modalH / 2;
  const maxY = Math.max(minY, section8.clientHeight - PADDING - modalH / 2);
  cx = Math.min(Math.max(cx, minX), maxX);
  cy = Math.min(Math.max(cy, minY), maxY);

  modal.style.left = Math.round(cx) + 'px';
  modal.style.top  = Math.round(cy) + 'px';
}
})();


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




const stores = [
{
  id: "xianrou",
  name: "Q發柴燒雞蛋糕",
  subtitle: "森林系 × 手作 × 舒壓療癒",
  coords: { x: 26, y: 64 },
  img: 'img/store (2).png', 
  photos: [                           
  'img/4-1.jpg',
  'img/4-2.jpg'
  ],
  ownerName: "小鮮肉姐姐",
  hours: "12：00～19：00 (星期三到星期日)",
  desc: "以「森林小店」為靈感的手作雜貨空間。店內有老闆手作的水泥盆與鋁線作品，皆為獨一無二；也曾開設多場手作課程、與社福單位合作。希望來訪的人都能放鬆療癒，像走進一片綠意。"
},
{
  id: "qfa",
  name: "GS飾品館",
  subtitle: "真材實料 × 紮實奶香雞蛋糕 × 公益行動",
  coords: { x: 41, y: 52 },
  img: 'img/store (5).png', 
  photos: [                           
  'img/4-1.jpg',
  'img/4-2.jpg'
  ],
  ownerName: "淑婷姐",
  hours: ":12：00～19：00（星期三到星期日）",
  desc: "不加水、不用發泡粉，全程鮮奶，口感紮實帶奶香。長年投入公益：每日營業額提撥 10%，年底製作 1500 套四菜一湯年菜親送學童；亦與學校、長照、禮儀單位合作，並提供學生優惠與滿分兌換活動。"
},
{
  id: "suixin",
  name: "小仙肉の家",
  subtitle: "繽紛手 × 隨心所欲 × 療癒小物",
  coords: { x: 58, y: 47 },
  img: 'img/store (3).png', 
  photos: [                           
  'img/4-1.jpg',
  'img/4-2.jpg'
  ],
  ownerName: "",
  hours: "12：00～18：00（星期三到星期日）",
  desc: "2025 年 3 月自合興車站搬遷至菱潭街。作品多取材自剩布與碎布，每件皆獨一無二，包含布娃娃、吊飾與『大肚魚包』等。信奉「60 分也很好」的創作哲學：做自己喜歡的事，讓小物靜靜陪你。"
},
{
  id: "gs",
  name: "武威學堂",
  subtitle: "個性飾品 × 嘻哈龐克 × 耳環蝴蝶",
  coords: { x: 35, y: 38 },
  img: 'img/store (11).png', 
  photos: [                           
  'img/4-1.jpg',
  'img/4-2.jpg'
  ],
  ownerName: "小哥",
  hours: `星期三到星期五 11：00～17：00 
  星期六&星期日 12：00～18：30`,
  desc: "深耕飾品 30+ 年，櫥窗與燈光陳列一眼就懂。主打耳環、項鍊與戒指，蝴蝶與狐狸造型最受歡迎。節慶會彈性延長營業以配合人流。角色視覺偏嘻哈龐克（墨鏡、項鍊、戒指）以展現個性。"
},
{
  id: "catfive",
  name: "石麻谷",
  subtitle: "平安編織 × 禪意小舖 × 手工飾品",
  coords: { x: 68, y: 61 },
  img: 'img/store (4).png', 
  photos: [                           
  'img/mo(01).jpg',
  'img/mo(02).jpg',
  'img/mo(03).jpg'
  ],
  ownerName: "Mo姐",
  hours: "13：00～19：30（星期三到星期日）",
  desc: "菱潭街第一批店家，經營已 8 年。以五色線編織與刻字石頭為主，傳遞「平安」祝福；店裡安靜放鬆、帶點禪意。從會場銷售轉跑道後，累積穩定客群，也常邀客人進店聊聊、吹冷氣，讓人帶著平安離開。"
},
{
  id: "love",
  name: "隨♡所欲 ",
  subtitle: "個性飾品 × 嘻哈龐克 × 耳環蝴蝶",
  coords: { x: 35, y: 38 },
  img: 'img/store (1).png', 
  photos: [                           
  'img/4-1.jpg',
  'img/4-2.jpg'
  ],
  ownerName: "小哥",
  hours: "9:30～16：00 (星期四到星期日以及周一)",
  desc: "深耕飾品 30+ 年，櫥窗與燈光陳列一眼就懂。主打耳環、項鍊與戒指，蝴蝶與狐狸造型最受歡迎。節慶會彈性延長營業以配合人流。角色視覺偏嘻哈龐克（墨鏡、項鍊、戒指）以展現個性。"
},
{
  id: "flover",
  name: "涵花綻放&涵花小集",
  subtitle: "個性飾品 × 嘻哈龐克 × 耳環蝴蝶",
  coords: { x: 35, y: 38 },
  img: 'img/store (9).png', 
  photos: [                           
  'img/4-1.jpg',
  'img/4-2.jpg'
  ],
  ownerName: "小哥",
  hours: "每日營業 8:00–21:00",
  desc: "深耕飾品 30+ 年，櫥窗與燈光陳列一眼就懂。主打耳環、項鍊與戒指，蝴蝶與狐狸造型最受歡迎。節慶會彈性延長營業以配合人流。角色視覺偏嘻哈龐克（墨鏡、項鍊、戒指）以展現個性。"
},{
id: "candy",
name: "糖糖鮮菓小站",
subtitle: "個性飾品 × 嘻哈龐克 × 耳環蝴蝶",
coords: { x: 35, y: 38 },
img: 'img/store (10).png', 
photos: [                           
'img/4-1.jpg',
'img/4-2.jpg'
],
ownerName: "",
hours: "11：30～18：30 (星期三到星期日)",
desc: "深耕飾品 30+ 年，櫥窗與燈光陳列一眼就懂。主打耳環、項鍊與戒指，蝴蝶與狐狸造型最受歡迎。節慶會彈性延長營業以配合人流。角色視覺偏嘻哈龐克（墨鏡、項鍊、戒指）以展現個性。"
},{
id: "lingtan",
name: "龍潭文風造庄聯盟",
subtitle: "個性飾品 × 嘻哈龐克 × 耳環蝴蝶",
coords: { x: 35, y: 38 },
img: 'img/store (6).png', 
photos: [                           
'img/4-1.jpg',
'img/4-2.jpg'
],
ownerName: "小哥",
hours: "12:00–20:00（週三公休）",
desc: "深耕飾品 30+ 年，櫥窗與燈光陳列一眼就懂。主打耳環、項鍊與戒指，蝴蝶與狐狸造型最受歡迎。節慶會彈性延長營業以配合人流。角色視覺偏嘻哈龐克（墨鏡、項鍊、戒指）以展現個性。"
},{
id: "masaji",
name: "療癒鬆筋精品鋪",
subtitle: "個性飾品 × 嘻哈龐克 × 耳環蝴蝶",
coords: { x: 35, y: 38 },
img: 'img/store (13).png', 
photos: [                           
'img/4-1.jpg',
'img/4-2.jpg'
],
ownerName: "小哥",
hours: "11：00～18：00 (星期三到星期日)",
desc: "深耕飾品 30+ 年，櫥窗與燈光陳列一眼就懂。主打耳環、項鍊與戒指，蝴蝶與狐狸造型最受歡迎。節慶會彈性延長營業以配合人流。角色視覺偏嘻哈龐克（墨鏡、項鍊、戒指）以展現個性。"
},{
id: "shot",
name: "稜光映像",
subtitle: "個性飾品 × 嘻哈龐克 × 耳環蝴蝶",
coords: { x: 35, y: 38 },
img: 'img/store (7).png', 
photos: [                           
'img/4-1.jpg',
'img/4-2.jpg'
],
ownerName: "小哥",
hours: "預約制",
desc: "深耕飾品 30+ 年，櫥窗與燈光陳列一眼就懂。主打耳環、項鍊與戒指，蝴蝶與狐狸造型最受歡迎。節慶會彈性延長營業以配合人流。角色視覺偏嘻哈龐克（墨鏡、項鍊、戒指）以展現個性。"
},{
id: "stone",
name: "乘石匠物所",
subtitle: "個性飾品 × 嘻哈龐克 × 耳環蝴蝶",
coords: { x: 35, y: 38 },
img: 'img/store (12).png', 
photos: [                           
'img/4-1.jpg',
'img/4-2.jpg'
],
ownerName: "小哥",
hours: "17：00～20：00 (星期三到星期日)",
desc: "深耕飾品 30+ 年，櫥窗與燈光陳列一眼就懂。主打耳環、項鍊與戒指，蝴蝶與狐狸造型最受歡迎。節慶會彈性延長營業以配合人流。角色視覺偏嘻哈龐克（墨鏡、項鍊、戒指）以展現個性。"
},{
id: "noodle",
name: "麵館",
subtitle: "個性飾品 × 嘻哈龐克 × 耳環蝴蝶",
coords: { x: 35, y: 38 },
img: 'img/store (15).png', 
photos: [                           
'img/4-1.jpg',
'img/4-2.jpg'
],
ownerName: "小哥",
hours: "12:00–20:00（週三公休）",
desc: "深耕飾品 30+ 年，櫥窗與燈光陳列一眼就懂。主打耳環、項鍊與戒指，蝴蝶與狐狸造型最受歡迎。節慶會彈性延長營業以配合人流。角色視覺偏嘻哈龐克（墨鏡、項鍊、戒指）以展現個性。"
},{
id: "cafe",
name: "AIR KAFE",
subtitle: "個性飾品 × 嘻哈龐克 × 耳環蝴蝶",
coords: { x: 35, y: 38 },
img: 'img/store (8).png', 
photos: [                           
'img/4-1.jpg',
'img/4-2.jpg'
],
ownerName: "小哥",
hours: "10：00～18：00(星期四至星期日)",
desc: "深耕飾品 30+ 年，櫥窗與燈光陳列一眼就懂。主打耳環、項鍊與戒指，蝴蝶與狐狸造型最受歡迎。節慶會彈性延長營業以配合人流。角色視覺偏嘻哈龐克（墨鏡、項鍊、戒指）以展現個性。"
},{
id: "god",
name: "龍潭神捕",
subtitle: "甚麼都能補!",
coords: { x: 35, y: 38 },
img: 'img/store (14).png', 
photos: [                           
'img/4-1.jpg',
'img/4-2.jpg'
],
ownerName: "小哥",
hours: "08:00–18:00（全年無休，只休星期八）",
desc: "深耕飾品 30+ 年，櫥窗與燈光陳列一眼就懂。主打耳環、項鍊與戒指，蝴蝶與狐狸造型最受歡迎。節慶會彈性延長營業以配合人流。角色視覺偏嘻哈龐克（墨鏡、項鍊、戒指）以展現個性。"
},
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


let __shopSlideTimer = null;
function __setupShopSlideshow(infoBoxEl, photos, fallbackImg){
  const body = infoBoxEl.querySelector('.info-body') || infoBoxEl;
  let slideshow = infoBoxEl.querySelector('.slideshow');
  if (!slideshow) {
    slideshow = document.createElement('div');
    slideshow.className = 'slideshow';
    slideshow.style.marginBottom = '10px';
    body.prepend(slideshow);
  }
slideshow.innerHTML = '';
const img = document.createElement('img');

img.style.width = '100%';
img.style.aspectRatio = '16 / 9';
img.style.objectFit = 'cover';
img.style.borderRadius = '8px';
img.style.display = 'block';
slideshow.appendChild(img);

let idx = 0;
const list = Array.isArray(photos) && photos.length ? photos.slice() : (fallbackImg ? [fallbackImg] : []);
if (!list.length) return;

img.src = list[0];

if (__shopSlideTimer) {
  clearInterval(__shopSlideTimer);
  __shopSlideTimer = null;
}
if (list.length > 1) {
  __shopSlideTimer = setInterval(() => {
    idx = (idx + 1) % list.length;
    img.src = list[idx];
  }, 3000);
}
}

function positionInfoBox() {
    if (!infoBox) return;
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
    infoBox.style.position = 'fixed';
    infoBox.style.top  = `${top}px`;
    infoBox.style.left = `${left}px`;
    infoBox.style.right= 'auto';
    
}




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

      
      try {
        __setupShopSlideshow(infoBox, store.photos, store.img);
      } catch (e) {
      console.warn('slideshow error', e);
    }
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


});

markerLayer.appendChild(btn);
});

infoClose && infoClose.addEventListener("click", () => {
  infoBox.classList.add("hidden");

  if (__shopSlideTimer) { clearInterval(__shopSlideTimer); __shopSlideTimer = null; }
  
});

const mapContainer = document.querySelector('.map-container');
mapContainer && mapContainer.addEventListener('click', (e) => {
  if (e.target.closest('.marker-layer button')) return;
  infoBox.classList.add('hidden');

  if (__shopSlideTimer) { clearInterval(__shopSlideTimer); __shopSlideTimer = null; }
  
});
}

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
  const extraGap = 12; 
  const top = target.getBoundingClientRect().top + window.pageYOffset - headerH - extraGap;

  animateScrollTo(top, 720);  
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


(function () {
  const sections = ['section3', 'section4', 'section5', 'section6', 'section7'];

  
    const IMAGE_SOURCES = {
    
    section3: ['./img/3_1.jpg'], 
    section4: ['./img/4-1.jpg','./img/4-2.jpg','./img/4-3.jpg','./img/4-4.jpg'],
    section5: ['./img/5-1.jpg','./img/5-2.jpg','./img/5-3.jpg'],
    section6: ['./img/6-1.jpg','./img/6-2.jpg','./img/6-3.jpg'],
    section7: ['./img/7-1.jpg','./img/7-2.jpg','./img/7-3.jpg'],
  };

  
  
  
  const CAPTION_SOURCES = {
    section3: ['早市的人潮節奏'],
    section4: ['斑駁門面與落日','封板後的靜默','褪色招牌','空屋的回聲'],
    section5: ['手作進駐的晨光','展演之後的笑聲','重生的騎樓步道'],
    section6: ['日常散步的轉角','午後店貓打盹','慢讀咖啡的窗邊'],
    section7: ['社區共學的藍圖','光節走廊的想像','下一站的生活劇場'],
  };

  
  (function injectHoverCss(){
    if (document.getElementById('hover-center-css')) return;
    const css = `
    #section3 .image-block, #section4 .image-block, #section5 .image-block,
    #section6 .image-block, #section7 .image-block { position: relative; }
    #section3 .image-block::before, #section4 .image-block::before,
    #section5 .image-block::before, #section6 .image-block::before,
    #section7 .image-block::before {
      content:""; position:absolute; inset:0; background:rgba(0,0,0,.22);
      opacity:0; transition:opacity .2s ease; border-radius:14px;
    }
    #section3 .image-block:hover::before, #section4 .image-block:hover::before,
    #section5 .image-block:hover::before, #section6 .image-block:hover::before,
    #section7 .image-block:hover::before { opacity:1; }
    .image-block .hover-center{
      position:absolute; left:50%; top:50%; transform:translate(-50%,-50%) scale(.98);
      padding:.48em 1.05em; border-radius:999px; background:rgba(0,0,0,.58);
      -webkit-backdrop-filter:blur(3px); backdrop-filter:blur(3px);
      color:#fff; font-weight:800; letter-spacing:.04em;
      font-size:clamp(14px,1.7vw,22px); line-height:1.15; text-align:center;
      max-width:min(82%,720px); white-space:normal; word-break:keep-all;
      opacity:0; transition:opacity .2s ease, transform .2s ease; z-index:6;
    }
    #section3 .image-block:hover .hover-center, #section4 .image-block:hover .hover-center,
    #section5 .image-block:hover .hover-center, #section6 .image-block:hover .hover-center,
    #section7 .image-block:hover .hover-center { opacity:1; transform:translate(-50%,-50%) scale(1.02); }
    `;
    const style = document.createElement('style');
    style.id = 'hover-center-css';
    style.textContent = css;
    document.head.appendChild(style);
  })();

  sections.forEach(id => {
    const root = document.getElementById(id);
    if (!root) return;

    const imgBlock = root.querySelector('.image-block');
    if (!imgBlock) return;

    
    const imgs = Array.from(imgBlock.querySelectorAll('img'));
    let sources = (IMAGE_SOURCES[id] && IMAGE_SOURCES[id].length)
      ? IMAGE_SOURCES[id].slice()
      : imgs.map(img => img.currentSrc || img.src).filter(Boolean);
    if (!sources.length) return;

    
    const capAttr = (imgBlock.getAttribute('data-captions') || '').trim();
    let captions = capAttr
      ? capAttr.split('|').map(s => s.trim()).filter(Boolean)
      : (Array.isArray(CAPTION_SOURCES[id]) ? CAPTION_SOURCES[id].slice() : []);

    function basename(p){ try{ return p.split('/').pop().replace(/\.[^/.]+$/, ''); }catch{ return '圖片'; } }
    if (captions.length < sources.length) {
      for (let i = captions.length; i < sources.length; i++) captions[i] = basename(sources[i]);
    }

    
    const displayImg = imgs[0] || (function(){
      const el = document.createElement('img');
      el.alt = '';
      imgBlock.appendChild(el);
      return el;
    })();
    imgs.slice(1).forEach(el => { el.style.display = 'none'; });

    
    let bubble = imgBlock.querySelector('.hover-center');
    if (!bubble) {
      bubble = document.createElement('span');
      bubble.className = 'hover-center';
      imgBlock.appendChild(bubble);
    }

    
    let nav = imgBlock.querySelector('.img-nav');
    if (!nav) {
      nav = document.createElement('div');
      nav.className = 'img-nav';
      imgBlock.appendChild(nav);
    }
    nav.innerHTML = `
      <button class="prev" aria-label="上一張"><i class="arrow"></i></button>
      <button class="next" aria-label="下一張"><i class="arrow"></i></button>
    `;

    if(id==='section3') nav.style.display='none'

    
    let dots = imgBlock.querySelector('.img-dots');
    if (!dots) {
      dots = document.createElement('div');
      dots.className = 'img-dots';
      imgBlock.appendChild(dots);
    }
    dots.innerHTML = sources.map((_, i) =>
      `<button type="button" aria-label="第 ${i+1} 張"${i===0?' aria-current="true"':''}></button>`
    ).join('');

    
    let index = 0;
    function updateDots() {
      const bs = dots.querySelectorAll('button');
      bs.forEach((b,k)=> b.setAttribute('aria-current', k===index ? 'true' : 'false'));
    }
    function updateCaption() {
      bubble.textContent = captions[index] || basename(sources[index]) || '';
    }
    function show(i){
      index = (i + sources.length) % sources.length;
      displayImg.src = sources[index];
      updateDots();
      updateCaption();
    }

    
    show(0);
    nav.querySelector('.prev').addEventListener('click', (e) => { e.stopPropagation(); show(index - 1); });
    nav.querySelector('.next').addEventListener('click', (e) => { e.stopPropagation(); show(index + 1); });
    dots.querySelectorAll('button').forEach((b,i)=> b.addEventListener('click', ()=> show(i)));

    
    const AUTOPLAY_MS = 5000;
    let timer = null;
    function start(){ if(!timer) timer = setInterval(()=>show(index+1), AUTOPLAY_MS); }
    function stop(){ if(timer){ clearInterval(timer); timer=null; } }
    imgBlock.addEventListener('mouseenter', stop);
    imgBlock.addEventListener('mouseleave', start);
    start();
  });
})();


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
    
}

stores.forEach(s => {
  const li = document.createElement('li');
  li.className = 'strip-card';
  const hoursHTML = s.hours ? `<p class="card-hours">營業時間：${s.hours}</p>` : '';
  li.innerHTML = `

  <img class="card-image" src="${s.logoSrc || s.mascotSrc || ''}" alt="${s.name || ''}">
  <div class="card-body">
  <p class="card-title">${s.name || ''}</p>
  <p class="card-sub">${s.subtitle || ''}</p>
  ${hoursHTML}
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
requestAnimationFrame(update);
})();


(function () {
  const header = document.querySelector('nav.fixed');
  const headerH = header ? header.offsetHeight : 64;

  
  const navLinks = Array.from(document.querySelectorAll('nav.fixed a[href^="#"]'));
  if (!navLinks.length) return;

  
  const secMap = new Map();
  const sections = [];
  navLinks.forEach(a => {
    const id = a.getAttribute('href').slice(1);
    const sec = document.getElementById(id);
    if (sec) {
      secMap.set(id, a);
      sections.push(sec);
    }
});
if (!sections.length) return;

let currentId = null;


const io = new IntersectionObserver((entries) => {
  entries.forEach(e => e.target.__v = e.intersectionRatio);

  
  const top = sections
  .filter(s => (s.__v || 0) > 0)
  .sort((a, b) => (b.__v || 0) - (a.__v || 0))[0];

  if (!top) return;
  if (top.id === currentId) return;

  
  if (currentId && secMap.get(currentId)) {
    secMap.get(currentId).classList.remove('is-active');
  }
currentId = top.id;
const link = secMap.get(currentId);
link && link.classList.add('is-active');


if (history.replaceState) history.replaceState(null, '', '#' + currentId);
}, {

rootMargin: `-${headerH + 8}px 0px -60% 0px`,
threshold: [0, 0.2, 0.4, 0.6, 0.8, 1]
});

sections.forEach(s => io.observe(s));


window.addEventListener('load', () => {
  const hashId = location.hash.replace('#', '');
  const initId = hashId && secMap.has(hashId) ? hashId : sections[0].id;
  const initLink = secMap.get(initId);
  initLink && initLink.classList.add('is-active');
});
})();




(function(){
  const grid = document.getElementById('shopGrid');
  if (!grid) return;

  const pageIndicator = document.getElementById('shopPageIndicator');
  const prevBtn = document.querySelector('#section8 .shop-nav.prev');
  const nextBtn = document.querySelector('#section8 .shop-nav.next');

  
  const raw = (typeof stores !== 'undefined' && Array.isArray(stores)) ? stores : (Array.isArray(window.stores) ? window.stores : []);
  const data = raw.map((s, i) => ({
    id: (s.id || String(i)),
    name: s.name || s.title || s.storeName || '未命名店鋪',
    subtitle: s.subtitle || '',
    hours: s.hours || '',
    desc: s.desc || '',
    img: s.img || '',                 
    photos: Array.isArray(s.photos) ? s.photos.filter(Boolean) : [] 
  }));

const pageSize = 4;
let page = 0;

function pageCount(){ return Math.max(1, Math.ceil(data.length / pageSize)); }

function render(){
  const start = page * pageSize;
  const slice = data.slice(start, start + pageSize);

  grid.innerHTML = slice.map(item => `
  <li class="store-card" data-id="${item.id}" tabindex="0">
    <figure class="store-figure">
      ${item.img ? `<img src="${item.img}" alt="${item.name} 圖像">` : ''}
    </figure>
    <div class="store-text">
      <div class="store-name">${item.name}</div>
      <div class="store-sub">${item.subtitle || ''}</div>
    </div>
  </li>
`).join('');

  const total = pageCount();
  pageIndicator.textContent = total > 1 ? `第 ${page+1} / ${total} 頁` : '';
  pageIndicator.setAttribute('aria-hidden', total <= 1 ? 'true' : 'false');
}

function goto(delta){
  const total = pageCount();
  page = (page + delta + total) % total; 
  render();
}

prevBtn?.addEventListener('click', () => goto(-1));
nextBtn?.addEventListener('click', () => goto(+1));


const modal = document.getElementById('shopModal');
const mClose = document.getElementById('shopModalClose');
const mTitle = document.getElementById('shopModalTitle');
const mHours = document.getElementById('shopModalHours');
const mSub   = document.getElementById('shopModalSubtitle');
const mDesc  = document.getElementById('shopModalDesc');



if (modal && modal.parentElement !== document.body) {
  document.body.appendChild(modal);
}


const slideTrack = document.getElementById('shopSlideTrack');
const slidePrev  = document.getElementById('shopSlidePrev');
const slideNext  = document.getElementById('shopSlideNext');
const slideDots  = document.getElementById('shopSlideDots');
let slideImages = []; let slideIndex = 0;

let slideTimer = null;
function stopAutoplay(){ if (slideTimer) { clearInterval(slideTimer); slideTimer = null; } }
function startAutoplay(interval=3000){
  stopAutoplay();
  if (!Array.isArray(slideImages) || slideImages.length <= 1) return;
  slideTimer = setInterval(()=>{
    slideIndex = (slideIndex + 1) % slideImages.length;
    updateSlidePosition();
  }, interval);
}

function buildSlides(urls, altBase){
  slideTrack.innerHTML = urls.map(u => `<div class="shop-slide"><img src="${u}" alt="${altBase||''} 照片"></div>`).join('');
  slideDots.innerHTML = urls.map((_,i)=>`<div class="shop-slide-dot${i===0?' is-active':''}" data-idx="${i}"></div>`).join('');
  slideIndex = 0;
  updateSlidePosition();
  startAutoplay(3000);
}
function updateSlidePosition(){
  slideTrack.style.transform = `translateX(-${slideIndex*100}%)`;
  [...slideDots.children].forEach((d,i)=>d.classList.toggle('is-active', i===slideIndex));
  const disabled = (slideImages.length<=1);
  if (slidePrev) slidePrev.disabled = disabled;
  if (slideNext) slideNext.disabled = disabled;
}
  startAutoplay(3000);


function openModalFor(item, anchorEl){
  mTitle.textContent = (item && item.name) || "—";
  mHours.textContent = (item && item.hours) || "";
  mSub.textContent   = (item && item.subtitle) || "";
  mDesc.textContent  = (item && item.desc) || "";

  
  slideImages = (item && item.photos && item.photos.length) ? item.photos : ((item && item.img) ? [item.img] : []);
  buildSlides(slideImages, item ? item.name : undefined);
  const modal = document.getElementById('shopModal');
  const section8 = document.getElementById('section8');
  const grid = document.getElementById('shopGrid');
  if (!modal || !section8 || !grid) return;

  if (!section8.contains(modal)) section8.appendChild(modal);
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');

  Object.assign(modal.style, {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    maxWidth: 'min(88vw, 860px)',
    maxHeight: '92vh',
    overflow: 'auto'
  });

  const secRect  = section8.getBoundingClientRect();
  const gridRect = grid.getBoundingClientRect();
  let cx = gridRect.left + gridRect.width  / 2 - secRect.left;
  let cy = gridRect.top  + gridRect.height / 2 - secRect.top;

  const PADDING = 12;
  const modalW = modal.offsetWidth  || 0;
  const modalH = modal.offsetHeight || 0;
  const minX = PADDING + modalW / 2;
  const maxX = Math.max(minX, section8.clientWidth  - PADDING - modalW / 2);
  const minY = PADDING + modalH / 2;
  const maxY = Math.max(minY, section8.clientHeight - PADDING - modalH / 2);
  cx = Math.min(Math.max(cx, minX), maxX);
  cy = Math.min(Math.max(cy, minY), maxY);

  modal.style.left = Math.round(cx) + 'px';
  modal.style.top  = Math.round(cy) + 'px';
}


function closeModal(){
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  modal.style.left = '';
  modal.style.top  = '';
  modal.style.transform = '';
  stopAutoplay();
}

  
  
  
  const CARD_SELECTOR = 'li, .strip-card, .shop-card, .card';

  
  modal.addEventListener('click', (e) => e.stopPropagation());

  function shouldSkipForOpener(target){
    return !!target.closest(CARD_SELECTOR);
  }

  document.addEventListener('pointerdown', (e) => {
    if (!modal.classList.contains('is-open')) return;
    const t = e.target;
    if (modal.contains(t)) return;            
    if (shouldSkipForOpener(t)) return;       
    closeModal();
  }, true); 

  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

mClose?.addEventListener('click', closeModal);
window.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeModal(); });

grid.addEventListener('click', (e) => {
  const card = e.target.closest('.store-card');
  if (!card) return;
  const id = card.getAttribute('data-id');
  const item = data.find(d => d.id === id);
  if (!item) return;
  openModalFor(item, card);
});

grid.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;
  const card = e.target.closest('.store-card');
  if (!card) return;
  const id = card.getAttribute('data-id');
  const item = data.find(d => d.id === id);
  if (!item) return;
  openModalFor(item, card);
});

render();
})();


(function () {
  
  const targets = Array.from(document.querySelectorAll([
    '#section2 .map-wrap',
    '#section3 .text-image-wrap',
    '#section4 .text-image-wrap',
    '#section5 .text-image-wrap',
    '#section6 .text-image-wrap',
    '#section7 .text-image-wrap',
    '#section8 .map-inner',
    '#section8 .store-strip'
  ].join(',')));

  if (!targets.length) return;

  
  let alt = 0;
  targets.forEach(el => {
    let dir = el.getAttribute('data-reveal');

    
    if (!dir && el.classList.contains('text-image-wrap')) {
      const text = el.querySelector('.text-block');
      const img  = el.querySelector('.image-block');
      if (text && img) {
        const tl = text.getBoundingClientRect().left;
        const il = img.getBoundingClientRect().left;
        dir = (tl < il) ? 'left' : 'right';
      }
    }

    
    if (!dir) dir = (alt++ % 2 === 0) ? 'left' : 'right';

    el.setAttribute('data-reveal', dir);
    el.classList.add('reveal-init');
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-in');
        io.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.25,
    rootMargin: '0px 0px -10% 0px'
  });

  targets.forEach(el => io.observe(el));
})();


(function () {
  const wrap = document.querySelector('#section1 .slider-container');
  if (!wrap) return;

  const textEl = wrap.querySelector('.hero-hover-overlay .overlay-text');
  if (!textEl) return;

  const getActiveSlide = () =>
    wrap.querySelector('.slide.opacity-100') ||          
    Array.from(wrap.querySelectorAll('.slide')).find(el => !el.classList.contains('opacity-0'));

  const updateCaption = () => {
    const cur = getActiveSlide();
    if (!cur) return;
    const caption = cur.getAttribute('data-caption') || cur.getAttribute('alt') || '';
    textEl.textContent = caption;
  };

  
  updateCaption();

  
  const mo = new MutationObserver(updateCaption);
  wrap.querySelectorAll('.slide').forEach(img => {
    mo.observe(img, { attributes: true, attributeFilter: ['class'] });
  });
})();


(function () {
  const wrap = document.querySelector('#section1 .slider-container');
  if (!wrap) return;

  
  const css = `
  #section1 .slider-container{position:relative;overflow:hidden;}
  #section1 .hero-hover-overlay{
    position:absolute;inset:0;background:rgba(0,0,0,.48);
    display:flex;align-items:center;justify-content:center;
    opacity:0;transition:opacity .35s ease;pointer-events:none;
  }
  #section1 .slider-container:hover .hero-hover-overlay{opacity:1;}
  #section1 .overlay-inner{padding:2rem 3rem;text-align:center;}
  #section1 .overlay-text{
    color:#fff;font-weight:800;line-height:1.15;
    font-size:clamp(22px, 3vw, 40px);letter-spacing:.02em;
    text-shadow:0 2px 12px rgba(0,0,0,.35);
    transform:translateY(6px);opacity:.92;transition:transform .35s ease,opacity .35s ease;
  }
  #section1 .slider-container:hover .overlay-text{transform:translateY(0);opacity:1;}
  @media (prefers-reduced-motion: reduce){
    #section1 .hero-hover-overlay,#section1 .overlay-text{transition:none !important;}
  }`;
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  
  const overlay = document.createElement('div');
  overlay.className = 'hero-hover-overlay';
  overlay.innerHTML = `<div class="overlay-inner"><div class="overlay-text"></div></div>`;
  wrap.appendChild(overlay);

  const textEl = overlay.querySelector('.overlay-text');
  const slides = wrap.querySelectorAll('.slide');
  if (!slides.length) return;

  
  
  function getActiveIndexByOpacity() {
    let idx = 0, max = -1;
    slides.forEach((img, i) => {
      const op = parseFloat(getComputedStyle(img).opacity || '0');
      if (op > max) { max = op; idx = i; }
    });
    return idx;
  }

  function setCaptionByIndex(i) {
    const s = slides[i];
    const cap = s.getAttribute('data-caption') || s.getAttribute('alt') || '';
    textEl.textContent = cap;
  }

  
  
  let patched = false;
  try {
    const origShow = window.showSlide || (typeof showSlide === 'function' ? showSlide : null);
    if (origShow) {
      const wrapped = function (index) {
        origShow(index);
        setCaptionByIndex(index);
      };
      
      window.showSlide = wrapped;
      try { showSlide = wrapped; } catch (e) {}
      patched = true;
    }
  } catch (e) {  }

  
  setCaptionByIndex(getActiveIndexByOpacity());

  
  if (!patched) {
    let last = -1;
    setInterval(() => {
      const now = getActiveIndexByOpacity();
      if (now !== last) {
        setCaptionByIndex(now);
        last = now;
      }
    }, 300);
  }
})();


let slideTimer = null;

function stopSlideAutoplay(){
  if (slideTimer) { clearInterval(slideTimer); slideTimer = null; }
}

function startSlideAutoplay(intervalMs = 3000){
  stopSlideAutoplay();
  
  if (!Array.isArray(slideImages) || slideImages.length <= 1) return;
  slideTimer = setInterval(() => {
    slideIndex = (slideIndex + 1) % slideImages.length;
    updateSlidePosition();
  }, intervalMs);
}


const _origBuildSlides = buildSlides;
buildSlides = function(urls, altBase){
  _origBuildSlides(urls, altBase);
  startSlideAutoplay(3000);   
};


const modalCloseBtn = document.getElementById('shopModalClose');
modalCloseBtn?.addEventListener('click', stopSlideAutoplay);


document.addEventListener('keydown', (e)=>{
  if (e.key === 'Escape') stopSlideAutoplay();
});


const modalEl = document.getElementById('shopModal');
if (modalEl) {
  const mo = new MutationObserver(() => {
    const hidden = modalEl.getAttribute('aria-hidden') === 'true';
    if (hidden) stopSlideAutoplay();
  });
  mo.observe(modalEl, { attributes: true, attributeFilter: ['aria-hidden', 'class', 'style'] });
}


const dotsEl = document.getElementById('shopSlideDots');
dotsEl?.addEventListener('click', () => {
  
  startSlideAutoplay(3000);
});






slidePrev.addEventListener('click', () => {
  if (!slideImages || !slideImages.length) return;
  stopAutoplay?.();
  slideIndex = (slideIndex - 1 + slideImages.length) % slideImages.length;
  updateSlidePosition?.();
  startAutoplay?.(3000);
});

slideNext.addEventListener('click', () => {
  if (!slideImages || !slideImages.length) return;
  stopAutoplay?.();
  slideIndex = (slideIndex + 1) % slideImages.length;
  updateSlidePosition?.();
  startAutoplay?.(3000);
});

slideDots.addEventListener('click', (e) => {
  const dot = e.target.closest('.shop-slide-dot');
  if (!dot) return;
  stopAutoplay?.();
  slideIndex = +dot.dataset.idx;
  updateSlidePosition?.();
  startAutoplay?.(3000);
});




(function () {
  const modal = document.getElementById('shopModal');
  if (!modal) return;

  
  modal.addEventListener('click', (e) => e.stopPropagation());

  function hardClose() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
  }

  
  document.addEventListener('click', (e) => {
    if (!modal.classList.contains('is-open')) return;
    if (modal.contains(e.target)) return; 
    
    if (e.target.closest('li, .strip-card, .shop-card, .card')) return;
    hardClose();
  });

  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      hardClose();
    }
  });
})();

