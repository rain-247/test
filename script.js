// 輪播（保持原有結構，滿版下以不透明度切換）
const slides = document.querySelectorAll('.slide');
let currentIndex = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.opacity = i === index ? '1' : '0';
  });
}
showSlide(currentIndex);

setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}, 3000);

// 地圖地標資料（百分比定位）
const pois = [
  { id:0, name:'鍾肇政文學園區', left:72, top:54, thumb:'map4.jpg', img:'map4.jpg', desc:'以文學為主題的公共空間，串連地方記憶與閱讀活動。' },
  { id:1, name:'菱潭街興創基地', left:55, top:38, thumb:'map3.jpg', img:'map3.jpg', desc:'老屋再生據點，聚合店家、展演與工作坊，街區活化核心。' },
  { id:2, name:'龍潭大池',       left:25, top:70, thumb:'map1.jpg', img:'map1.jpg', desc:'龍潭的水域地標，環湖步道適合散步與騎行。' },
  { id:3, name:'龍元宮',         left:75, top:24, thumb:'map5.jpg', img:'map5.jpg', desc:'地方信仰中心，節慶時人潮聚集，周邊小吃林立。' },
  { id:4, name:'南天宮',         left:32, top:90, thumb:'map2.jpg', img:'map2.jpg', desc:'臨水而建的廟宇，視覺地標，適合從跨堤觀景。' }
];

(function initPins() {
  const pinsHost = document.getElementById('pins');
  const detail   = document.getElementById('poiDetail');
  const detailImg= document.getElementById('detailImg');
  const detailTitle=document.getElementById('detailTitle');
  const detailDesc = document.getElementById('detailDesc');
  const closeBtn = document.getElementById('detailClose');

  if (!pinsHost) return;

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

  if (closeBtn) closeBtn.addEventListener('click', closeDetail);
  if (detail) {
    detail.addEventListener('click', e => {
      if (e.target === detail) closeDetail();
    });
  }
})();
