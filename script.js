const dialog = document.querySelector('#certificate-dialog');
const certificateImage = document.querySelector('#dialog-certificate');
const paper = document.querySelector('#dialog-paper');
const closeButton = document.querySelector('.dialog-close');
let trigger = null;

// Preserve the direct image link if modal dialogs are unavailable or a new tab is requested.
if (typeof dialog.showModal === 'function') {
  document.querySelectorAll('.certificate').forEach(link => {
    link.setAttribute('aria-haspopup', 'dialog');
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      trigger = link;
      document.querySelector('#certificate-title').textContent = link.dataset.title;
      certificateImage.src = link.href;
      certificateImage.alt = link.dataset.alt || link.querySelector('img')?.alt || link.dataset.title;
      paper.classList.toggle('rotated', link.dataset.rotated === 'true');
      paper.classList.toggle('portrait-document', link.dataset.portrait === 'true');
      document.querySelector('#certificate-original').href = link.href;
      dialog.showModal();
      document.body.classList.add('has-dialog');
    });
  });
}

closeButton.addEventListener('click', () => dialog.close());
let startedOutside = false;
const isOutside = event => {
  const rect = dialog.getBoundingClientRect();
  return event.clientX < rect.left || event.clientX > rect.right ||
    event.clientY < rect.top || event.clientY > rect.bottom;
};
dialog.addEventListener('pointerdown', event => { startedOutside = isOutside(event); });
dialog.addEventListener('click', event => {
  if (startedOutside && isOutside(event)) dialog.close();
  startedOutside = false;
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('has-dialog');
  trigger?.focus({ preventScroll: true });
});
