const WA_NUMBER = "447508011007"; // UK number without leading 0

function makeWhatsAppLink(message) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

function setWhatsAppLinks() {
  const baseMsg =
    `Hi Atelier Auto Detailing — I'd like a quote.\n\n` +
    `Car:\nPostcode:\nPackage:\nPreferred day/time:\n\nPhotos/video:`;

  const link = makeWhatsAppLink(baseMsg);

  ["heroWhatsApp","cardWhatsApp","menuWhatsApp","panelWhatsApp","footerWhatsApp","stickyWhatsApp"]
    .forEach(id => {
      const el = document.getElementById(id);
      if (el) el.href = link;
    });

  document.querySelectorAll(".quoteBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      const pkg = btn.getAttribute("data-package") || "";
      const msg =
        `Hi Atelier Auto Detailing — I'd like a quote.\n\n` +
        `Car:\nPostcode:\nPackage: ${pkg}\nPreferred day/time:\n\nPhotos/video:`;
      window.open(makeWhatsAppLink(msg), "_blank", "noopener");
    });
  });
}

function wireMenu() {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("menu");
  const close = document.getElementById("menuClose");
  const links = document.querySelectorAll(".menuLink");
  if (!toggle || !menu || !close) return;

  const open = () => {
    menu.classList.add("is-open");
    menu.setAttribute("aria-hidden","false");
    toggle.setAttribute("aria-expanded","true");
  };
  const shut = () => {
    menu.classList.remove("is-open");
    menu.setAttribute("aria-hidden","true");
    toggle.setAttribute("aria-expanded","false");
  };

  toggle.addEventListener("click", open);
  close.addEventListener("click", shut);
  menu.addEventListener("click", (e) => { if (e.target === menu) shut(); });
  links.forEach(a => a.addEventListener("click", shut));
}

function wireScrollProgress() {
  const bar = document.getElementById("scrollBar");
  if (!bar) return;

  const update = () => {
    const h = document.documentElement;
    const scrolled = h.scrollTop;
    const max = h.scrollHeight - h.clientHeight;
    bar.style.width = `${max ? (scrolled / max) * 100 : 0}%`;
  };

  window.addEventListener("scroll", update, { passive:true });
  update();
}

const galleryFiles = [
  "alpha_01.jpg","alpha_02.jpg","alpha_03.jpg","alpha_04.jpg","alpha_05.jpg",
  "alpha_06.jpg","alpha_07.jpg","alpha_08.jpg","alpha_09.jpg","alpha_10.jpg","alpha_11.jpg",
  "ash_01.jpg","ash_02.jpg","ash_03.jpg","ash_04.jpg","ash_05.jpg",
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

    const img = document.createElement("img");
    img.src = base + fn;
    img.alt = "Detailing result";
    img.loading = "lazy";

    wrap.appendChild(img);
    grid.appendChild(wrap);
  });
}

function wireLightbox() {
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightboxImg");
  const lbClose = document.getElementById("lightboxClose");
  const grid = document.getElementById("galleryGrid");
  if (!lb || !lbImg || !lbClose || !grid) return;

  const open = (src) => {
    lbImg.src = src;
    lb.classList.add("is-open");
    lb.setAttribute("aria-hidden","false");
  };
  const shut = () => {
    lb.classList.remove("is-open");
    lb.setAttribute("aria-hidden","true");
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

function setYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

// Quick actions open/close + hide on scroll down
function wireQuickActions() {
  const qa = document.getElementById("quickActions");
  const toggle = document.getElementById("qaToggle");
  const panel = document.getElementById("qaPanel");
  if (!qa || !toggle || !panel) return;

  let open = false;

  const setOpen = (v) => {
    open = v;
    panel.classList.toggle("is-open", open);
    panel.setAttribute("aria-hidden", open ? "false" : "true");
    toggle.querySelector(".qaChevron").textContent = open ? "▾" : "▴";
  };

  toggle.addEventListener("click", () => setOpen(!open));

  let lastY = window.scrollY;
  let ticking = false;

  const onScroll = () => {
    const y = window.scrollY;
    const goingDown = y > lastY + 8;
    const goingUp = y < lastY - 8;

    if (goingDown) {
      qa.classList.add("is-hidden");
      setOpen(false);
    } else if (goingUp) {
      qa.classList.remove("is-hidden");
    }

    lastY = y;
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive:true });
}

setWhatsAppLinks();
wireMenu();
wireScrollProgress();
buildGallery();
wireLightbox();
setYear();
wireQuickActions();
