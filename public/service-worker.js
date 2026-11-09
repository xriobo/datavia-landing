// Retira el service worker de la PWA de Capture, que quedó registrado en datavia.app cuando Capture se servía
// desde el dominio raíz (hoy vive en capture.datavia.app). Ese service worker seguía sirviendo la copia antigua
// de Capture en vez de la landing y fallaba al pedir appsettings.json (404).
//
// Los navegadores vuelven a pedir este fichero al navegar; con un 404 conservan el antiguo para siempre, así que
// hace falta este: se instala, borra las cachés, se da de baja y recarga las pestañas abiertas. No tiene manejador
// de fetch, de modo que nada se intercepta mientras tanto.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
	event.waitUntil(
		(async () => {
			for (const key of await caches.keys()) await caches.delete(key);
			await self.registration.unregister();
			for (const client of await self.clients.matchAll({ type: 'window' })) {
				// Una pestaña que ya no se deja navegar se arregla sola en la siguiente visita
				await client.navigate(client.url).catch(() => undefined);
			}
		})(),
	);
});
