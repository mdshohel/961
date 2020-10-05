export function isInViewport(el) {
	const rect = el.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)

	);
}

export function getSiblings(elem) {
	var siblings = [];
	var sibling = elem.parentNode.firstChild;
	while (sibling) {
		if (sibling.nodeType === 1 && sibling !== elem) {
			siblings.push(sibling);
		}
		sibling = sibling.nextSibling;
	}
	return siblings;
};

export function getSiblingByClass(elem, target) {
	var sibling;
	var parent = elem.parentNode;
	var children = parent.children;

	for (var i = 0; i < children.length; i++) {
		if (children[i].className === target) {
			sibling = children[i];
			break;
		}
	}
	return sibling;
}

export function getClosest(elem, selector) {

	// Element.matches() polyfill
	if (!Element.prototype.matches) {
		Element.prototype.matches =
			Element.prototype.matchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector ||
			Element.prototype.oMatchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			function (s) {
				var matches = (this.document || this.ownerDocument).querySelectorAll(s),
					i = matches.length;
				while (--i >= 0 && matches.item(i) !== this) { }
				return i > -1;
			};
	}

	for (; elem && elem !== document; elem = elem.parentNode) {
		if (elem.matches(selector)) return elem;
	}
	return null;
};


export function slideUp(element, duration = 500) {

	return new Promise(function (resolve, reject) {

		element.style.height = element.offsetHeight + 'px';
		element.style.transitionProperty = `height, margin, padding`;
		element.style.transitionDuration = duration + 'ms';
		element.offsetHeight;
		element.style.overflow = 'hidden';
		element.style.height = 0;
		element.style.paddingTop = 0;
		element.style.paddingBottom = 0;
		element.style.marginTop = 0;
		element.style.marginBottom = 0;
		window.setTimeout(function () {
			element.style.display = 'none';
			element.style.removeProperty('height');
			element.style.removeProperty('padding-top');
			element.style.removeProperty('padding-bottom');
			element.style.removeProperty('margin-top');
			element.style.removeProperty('margin-bottom');
			element.style.removeProperty('overflow');
			element.style.removeProperty('transition-duration');
			element.style.removeProperty('transition-property');
			resolve(false);
		}, duration)
	})
}


export function slideDown(element, duration = 500) {

	return new Promise(function (resolve, reject) {

		element.style.removeProperty('display');
		let display = window.getComputedStyle(element).display;

		if (display === 'none')
			display = 'block';

		element.style.display = display;
		let height = element.offsetHeight;
		element.style.overflow = 'hidden';
		element.style.height = 0;
		element.style.paddingTop = 0;
		element.style.paddingBottom = 0;
		element.style.marginTop = 0;
		element.style.marginBottom = 0;
		element.offsetHeight;
		element.style.transitionProperty = `height, margin, padding`;
		element.style.transitionDuration = duration + 'ms';
		element.style.height = height + 'px';
		element.style.removeProperty('padding-top');
		element.style.removeProperty('padding-bottom');
		element.style.removeProperty('margin-top');
		element.style.removeProperty('margin-bottom');
		window.setTimeout(function () {
			element.style.removeProperty('height');
			element.style.removeProperty('overflow');
			element.style.removeProperty('transition-duration');
			element.style.removeProperty('transition-property');
		}, duration)
	})
}


export function slideToggle(element, duration = 500) {

	if (window.getComputedStyle(element).display === 'none') {

		return slideDown(element, duration);

	} else {

		return slideUp(element, duration);
	}
}