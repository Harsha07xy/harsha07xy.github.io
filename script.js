// Mobile menu
(function () {
  var btn = document.querySelector('.menu-btn');
  var links = document.querySelector('.links');
  if (btn && links) {
    btn.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        links.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Keep the footer year current
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
