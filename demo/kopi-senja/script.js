const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navMenu = document.querySelector("[data-nav-menu]");
const bookingForm = document.querySelector("[data-booking-form]");
const formStatus = document.querySelector("[data-form-status]");

const setNavState = (isOpen) => {
  if (!navToggle || !navMenu) return;

  navToggle.setAttribute("aria-expanded", String(isOpen));
  navMenu.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("nav-open", isOpen);
};

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    setNavState(!isOpen);
  });

  navMenu.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      setNavState(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setNavState(false);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      setNavState(false);
    }
  });
}

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 8);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if (bookingForm && formStatus) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!bookingForm.checkValidity()) {
      bookingForm.reportValidity();
      return;
    }

    const formData = new FormData(bookingForm);
    const name = String(formData.get("name") || "").trim();
    const date = String(formData.get("date") || "").trim();
    const people = String(formData.get("people") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const text = [
      "Halo Kopi Senja, saya ingin reservasi meja.",
      `Nama: ${name}`,
      `Tanggal: ${date}`,
      `Jumlah: ${people}`,
      message ? `Catatan: ${message}` : ""
    ].filter(Boolean).join("\n");

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    formStatus.innerHTML = `Draft pesan siap dibuat. <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer">Buka WhatsApp</a>`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  });
}
