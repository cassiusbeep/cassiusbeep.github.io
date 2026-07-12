const toc = document.getElementById("toc");
const tocFloat = document.getElementById("toc-float");

function isMenuOffScreen(el) {
  const rectangle = el.getBoundingClientRect();
  return (
    rectangle.top >= (window.innerHeight || document.documentElement.clientHeight) || rectangle.bottom <= 0
  );
}

if (toc && tocFloat) {
  window.addEventListener('scroll', () => {
    if (isMenuOffScreen(toc)) {
      tocFloat.classList.add("open");
    } else {
      tocFloat.classList.remove("open");
    }
  })
}