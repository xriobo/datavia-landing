// Revela elementos [data-reveal] al entrar en viewport.
// Sin dependencias: IntersectionObserver es plataforma, no librería.
const items = document.querySelectorAll<HTMLElement>('[data-reveal]');

if (items.length > 0) {
	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible');
					observer.unobserve(entry.target);
				}
			}
		},
		{ threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
	);

	for (const item of items) observer.observe(item);
}
