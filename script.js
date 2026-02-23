// ========= Settings =========
const PHONE = "07508011007";
const WA_NUMBER = "447508011007"; // UK number without leading 0
const IG_URL = "https://instagram.com/atelierautodetailing";

function makeWhatsAppLink(message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WA_NUMBER}?text=${encoded}`;
}

function setWhatsAppLinks() {
  const baseMsg = `Hi Atelier Auto Detailing — I'd like a quote.\n\nCar:\nPostcode:\nPackage:\nPreferred day/time:\n\nPhotos/video:`;
  const link = makeWhatsAppLink(baseMsg);

  const ids = ["heroWhatsApp","cardWhatsApp","menuWhatsApp","panelWhatsApp","footerWhatsApp","stickyWhatsApp"];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.href = link;
  });

  const banner = document.getElementById("bannerWhatsApp");
  if (banner) banner.href = makeWhatsAppLink(`Hi Atelier Auto Detailing — can I send a quick video for an accurate quote?\n\nCar:\nPostcode:\nWhat you want done:`);
}

function wireQuoteButtons() {
  document.querySelectorAll(".quoteBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      const pkg = btn.getAttribute("data-package") || "";
      const msg = `Hi Atelier Auto Detailing — I'd like a quote.\n\nCar:\nPostcode:\nPackage: ${pkg}\nPreferred day/time:\n\nPhotos/video:`;
      window.open(makeWhatsAppLink(msg), "_blank", "noopener");
    });
  });
}

// ========= Mobile menu =========
function wireMenu() {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("menu");
  const close = document.getElementById("menuClose");
  const links = document.querySelectorAll(".menuLink");

  if (!toggle || !menu || !close) return;

  const open = () => {
    menu.classList.add("is-open");
    menu.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");
  };
  const shut = () => {
    menu.classList.remove("is-open");
    menu.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", open);
  close.addEventListener("click", shut);
  menu.addEventListener("click", (e) => { if (e.target === menu) shut(); });
  links.forEach(a => a.addEventListener("click", shut));
}

// ========= Scroll progress =========
function wireScrollProgress() {
  const bar = document.getElementById("scrollBar");
  if (!bar) return;

  const update = () => {
    const h = document.documentElement;
    const scrolled = h.scrollTop;
    const max = h.scrollHeight - h.clientHeight;
    const pct = max ? (scrolled / max) * 100 : 0;
    bar.style.width = `${pct}%`;
  };

  window.addEventListener("scroll", update, { passive: true });
  update();
}

// ========= Gallery =========
const galleryFiles = [
  // alpha
  "alpha_01.jpg","alpha_02.jpg","alpha_03.jpg","alpha_04.jpg","alpha_05.jpg",
  "alpha_06.jpg","alpha_07.jpg","alpha_08.jpg","alpha_09.jpg","alpha_10.jpg","alpha_11.jpg",
  // ash
  "ash_01.jpg","ash_02.jpg","ash_03.jpg","ash_04.jpg","ash_05.jpg",
  // dnd
  "dnd_01.jpg","dnd_02.jpg","dnd_03.jpg","dnd_04.jpg","dnd_05.jpg","dnd_06.jpg",
  "dnd_07.jpg","dnd_08.jpg","dnd_09.jpg","dnd_10.jpg","dnd_11.jpg","dnd_12.jpg",
  "dnd_13.jpg","dnd_14.jpg","dnd_15.jpg","dnd_16.jpg","dnd_17.jpg","dnd_18.jpg",
  "dnd_19.jpg","dnd_20.jpg","dnd_21.jpg","dnd_22.jpg","dnd_23.jpg"
];

function buildGallery() {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;

  const base = "assets/images/gallery/";
  grid.innerHTML = "";

  galleryFiles.forEach(fn => {
    const wrap = document.createElement("figure");
    wrap.className = "shot";
    wrap.dataset.key = fn.split("_")[0];

    const img = document.createElement("img");
    img.src = base + fn;
    img.alt = "Detailing result";
    img.loading = "lazy";

    wrap.appendChild(img);
    grid.appendChild(wrap);
  });
}

// ========= Lightbox =========
function wireLightbox() {
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightboxImg");
  const lbClose = document.getElementById("lightboxClose");
  const grid = document.getElementById("galleryGrid");
  if (!lb || !lbImg || !lbClose || !grid) return;

  const open = (src) => {
    lbImg.src = src;
    lb.classList.add("is-open");
    lb.setAttribute("aria-hidden", "false");
  };
  const shut = () => {
    lb.classList.remove("is-open");
    lb.setAttribute("aria-hidden", "true");
    lbImg.src = "";
  };

  grid.addEventListener("click", (e) => {
    const img = e.target.closest("img");
    if (!img) return;
    open(img.src);
  });

  lbClose.addEventListener("click", shut);
  lb.addEventListener("click", (e) => { if (e.target === lb) shut(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") shut(); });
}

// ========= Footer year =========
function setYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

// ========= Init =========
setWhatsAppLinks();
wireQuoteButtons();
wireMenu();
wireScrollProgress();
buildGallery();
wireLightbox();
setYear();
