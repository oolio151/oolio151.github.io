const socialLinks = document.querySelectorAll('.socials a');
const exploreButton = document.querySelector('.enter-button');
let isAnimatingSocialClick = false;
let isAnimatingExploreClick = false;

if (exploreButton) {
	exploreButton.addEventListener('click', (event) => {
		if (isAnimatingExploreClick) {
			event.preventDefault();
			return;
		}

		const href = exploreButton.getAttribute('href');
		const titleElement = document.querySelector('.title');
		if (!href || !titleElement) return;

		event.preventDefault();
		isAnimatingExploreClick = true;
		const rect = titleElement.getBoundingClientRect();
		sessionStorage.setItem(
			'nameFlyTransition',
			JSON.stringify({
				left: rect.left,
				top: rect.top,
				width: rect.width,
				height: rect.height,
				rotateDeg: -23
			})
		);

		document.body.classList.add('explore-transitioning');
		titleElement.classList.add('title-exit');

		let didNavigate = false;
		const navigateAfterExit = () => {
			if (didNavigate) return;
			didNavigate = true;
			window.location.href = href;
		};

		titleElement.addEventListener('animationend', navigateAfterExit, { once: true });
		window.setTimeout(navigateAfterExit, 700);
	});
}

function createAnimatedClone(iconElement) {
	if (iconElement.tagName.toLowerCase() === 'img') {
		const imgClone = document.createElement('img');
		imgClone.src = iconElement.currentSrc || iconElement.src;
		imgClone.alt = iconElement.alt || '';
		const computed = window.getComputedStyle(iconElement);
		imgClone.style.filter = computed.filter;
		return imgClone;
	}

	const divClone = document.createElement('div');
	const computed = window.getComputedStyle(iconElement);
	divClone.style.background = computed.background;
	divClone.style.webkitMask = computed.webkitMask;
	divClone.style.mask = computed.mask;
	return divClone;
}

socialLinks.forEach((link) => {
	link.addEventListener('click', (event) => {
		if (isAnimatingSocialClick) {
			event.preventDefault();
			return;
		}

		const href = link.getAttribute('href');
		if (!href) return;

		event.preventDefault();
		isAnimatingSocialClick = true;
		document.body.classList.add('social-transitioning');

		const iconElement = link.querySelector('img, .social-icon');
		if (!iconElement) {
			window.location.href = href;
			return;
		}

		const rect = iconElement.getBoundingClientRect();
		const clone = createAnimatedClone(iconElement);
		clone.classList.add('social-click-clone');
		clone.style.left = `${rect.left}px`;
		clone.style.top = `${rect.top}px`;
		clone.style.width = `${rect.width}px`;
		clone.style.height = `${rect.height}px`;

		const iconCenterX = rect.left + rect.width / 2;
		const iconCenterY = rect.top + rect.height / 2;
		const viewportCenterX = window.innerWidth / 2;
		const viewportCenterY = window.innerHeight / 2;
		const translateX = viewportCenterX - iconCenterX;
		const translateY = viewportCenterY - iconCenterY;
		const maxViewportDimension = Math.max(window.innerWidth, window.innerHeight);
		const iconDimension = Math.max(rect.width, rect.height) || 1;
		const scale = (maxViewportDimension / iconDimension) * 2;

		clone.style.setProperty('--tx', `${translateX}px`);
		clone.style.setProperty('--ty', `${translateY}px`);
		clone.style.setProperty('--scale', `${scale}`);

		iconElement.style.opacity = '0';
		document.body.appendChild(clone);

		requestAnimationFrame(() => {
			clone.classList.add('animate');
		});

		let didNavigate = false;
		const completeNavigation = () => {
			if (didNavigate) return;
			didNavigate = true;
			window.location.href = href;
		};

		clone.addEventListener('transitionend', completeNavigation, { once: true });
		window.setTimeout(completeNavigation, 100);
	});
});
