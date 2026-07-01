// Utility to set CSS custom property for viewport height fallback
// This provides a fallback for browsers that don't support dvh (dynamic viewport height)

function setVh() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Set initial value
setVh();

// Update on resize and orientation change to handle dynamic address bar
window.addEventListener('resize', setVh);
window.addEventListener('orientationchange', setVh);
