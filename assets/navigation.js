const toggle = document.querySelector('.lab-menu-toggle');
const menu = document.querySelector('#primary-menu');
function closeMenu() { menu.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); }
toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); menu.classList.toggle('is-open', open); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { closeMenu(); toggle.focus(); } });
menu.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
window.matchMedia('(min-width: 951px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

// Reveal only a human-readable, obfuscated address; never construct a mailto URL.
document.addEventListener('click', event => {
  const button = event.target.closest('button[data-contact]');
  if (!button) return;
  const displayAddress = button.dataset.contact.split('.').map(Number).reverse().map(code => String.fromCharCode(code)).join('');
  const text = document.createElement('span');
  text.className = 'email-address';
  text.tabIndex = -1;
  text.textContent = displayAddress;
  const result = button.parentElement.querySelector('.email-result');
  result.replaceChildren(text);
  button.hidden = true;
  button.removeAttribute('data-contact');
  text.focus();
});
