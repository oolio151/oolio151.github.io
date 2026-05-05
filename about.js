const transitionDataRaw = sessionStorage.getItem('nameFlyTransition');

if (transitionDataRaw) {
  sessionStorage.removeItem('nameFlyTransition');

  const nameHeader = document.querySelector('.name-header');
  if (nameHeader) {
    nameHeader.style.animation = 'none';

    const transitionData = JSON.parse(transitionDataRaw);
    const targetRect = nameHeader.getBoundingClientRect();
    const startRect = {
      left: transitionData.left,
      top: transitionData.top,
      width: transitionData.width,
      height: transitionData.height
    };

    const scaleX = startRect.width / Math.max(targetRect.width, 1);
    const scaleY = startRect.height / Math.max(targetRect.height, 1);
    const translateX = startRect.left - targetRect.left;
    const translateY = startRect.top - targetRect.top;
    const startRotate = Number.isFinite(transitionData.rotateDeg) ? transitionData.rotateDeg : -23;

    nameHeader.style.transformOrigin = 'top left';
    nameHeader.style.willChange = 'transform, opacity';
    nameHeader.style.transition = 'none';
    nameHeader.style.opacity = '0';
    nameHeader.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY}) rotate(${startRotate}deg)`;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        nameHeader.style.transition = 'transform 720ms cubic-bezier(0.22, 1, 0.36, 1), opacity 600ms ease';
        nameHeader.style.opacity = '1';
        nameHeader.style.transform = 'translate(0, 0) scale(1, 1) rotate(0deg)';
        window.setTimeout(() => {
          nameHeader.classList.add('is-glowing');
        }, 720);
      });
    });
  }
} else {
  const nameHeader = document.querySelector('.name-header');
  if (nameHeader) {
    window.setTimeout(() => {
      nameHeader.classList.add('is-glowing');
    }, 1000);
  }
}
