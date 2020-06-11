const verifyPortalAvailability = () => {
  if (!('HTMLPortalElement' in window)) {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'no-portal-error';
    errorMessage.innerHTML =
      '<h2>Portals are not available on your browser yet!</h2>' +
      '<p>This website uses HTML portals, which are only available on Chrome (and other Chromium-based browsers such as Opera) under an experimental tag.</p>' +
      '<p>To enable it, navigate to <b><code>chrome://flags</code></b>, search for <b>Enable Portals</b> and set it to <b>Enabled</b>. You will have to restart your browser for this change to take effect.</p>';

    const content = document.querySelector('main > .content');
    content.innerHTML = '';
    content.appendChild(errorMessage);
  }
};

const createPortal = (src, className) => {
  const portal = document.createElement('portal');
  portal.src = src;
  portal.className = className;
  portal.addEventListener('animationend', () => {
    portal.activate();
  });
  document.querySelector('body').appendChild(portal);
};
