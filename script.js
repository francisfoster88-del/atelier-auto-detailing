(() => {
  // ===== Mobile menu (drawer) =====
  const menuBtn = document.getElementById("menuBtn");
  const drawer = document.getElementById("drawer");
  const drawerClose = document.getElementById("drawerClose");
  const drawerBackdrop = document.getElementById("drawerBackdrop");
  const navLinks = drawer ? drawer.querySelectorAll("a") : [];

  const openDrawer = () => {
    if (!drawer) return;
    drawer.classList.add("isOpen");
    drawer.setAttribute("aria-hidden", "false");
    if (menuBtn) menuBtn.setAttribute("aria-expanded", "true");
  };

  const closeDrawer = () => {
    if (!drawer) return;
    drawer.classList.remove("isOpen");
    drawer.setAttribute("aria-hidden", "true");
    if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
  };

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      const isOpen = drawer?.classList.contains("isOpen");
      isOpen ? closeDrawer() : openDrawer();
    });
  }

  if (drawerClose) drawerClose.addEventListener("click", closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener("click", closeDrawer);
  navLinks.forEach((a) => a.addEventListener("click", closeDrawer));

  // ===== Footer year =====
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  // ===== Mini quote form -> WhatsApp message =====
  const miniForm = document.getElementById("miniForm");
  if (miniForm) {
    miniForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const data = new FormData(miniForm);

      const name = String(data.get("name") || "").trim();
      const postcode = String(data.get("postcode") || "").trim();
      const car = String(data.get("car") || "").trim();
      const pkg = String(data.get("package") || "").trim();

      // WhatsApp number (UK format: no 0, add 44)
      const number = "447508011007";

      const msg =
        `Hi, I'm ${name}. Can I get a quote please?\n\n` +
        `Postcode: ${postcode}\n` +
        `Car: ${car}\n` +
        `Package: ${pkg}\n\n` +
        `I can send photos next.`;

      const url = `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
      window.open(url, "_blank");
    });
  }
})();