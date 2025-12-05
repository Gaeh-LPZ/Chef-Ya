// solamnete es para lo de botones activos
const navLinks = document.querySelectorAll(".nav-link");
const sections = [...document.querySelectorAll("section")];

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#")) return;

    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;

    window.scrollTo({
      top: target.offsetTop - 80,
      behavior: "smooth",
    });
  });
});

function updateActiveLink() {
  const scrollPos = window.scrollY + 120;
  let currentId = null;

  sections.forEach((section) => {
    if (section.offsetTop <= scrollPos) {
      currentId = section.id;
    }
  });

  if (!currentId) return;

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    const isActive = href === `#${currentId}`;
    link.classList.toggle("active", isActive);
  });
}

//esto lo acabo de agregar para que no empiece con todo el volumen
window.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector(".hero-video");
  if (video) {
    video.volume = 0.20;
  }
});


document.addEventListener("scroll", updateActiveLink);
updateActiveLink();
