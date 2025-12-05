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


document.addEventListener("scroll", updateActiveLink);
updateActiveLink();
