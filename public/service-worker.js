const CACHE_NAME = 'fakestore-pwa-v1';
const RUNTIME_CACHE = 'fakestore-runtime-v1';

const APP_SHELL_FILES = [
  '/',
  '/index.html',
  '/manifest.json',
  './components/ErrorBox.jsx',
  './components/Header.jsx',
  './components/Spinner.jsx',
  './pages/Home.jsx',
  './pages/Product.jsx',
  './pages/Cart.jsx',
  './pages/Login.jsx',
  './pages/Register.jsx',
  './pages/Profile.jsx',
  '/logo192.png',
  '/logo512.png',
  '/favicon.ico'
];

self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Pre-caching app shell');
        const filesToCache = APP_SHELL_FILES.filter(file => file !== '/');
        return cache.addAll(filesToCache).catch((error) => {
          console.warn('[SW] Some app shell files failed to cache:', error);
        });
      })
      .then(() => {
        console.log('[SW] App shell cached successfully');
      })
      .catch((error) => {
        console.error('[SW] Install failed:', error);
      })
  );
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => {
      console.log('[SW] Service worker activated');
    })
  );
});

function isPublicAPI(url) {
  return url.origin === 'https://dummyjson.com';
}

function isPrivateEndpoint(url) {
  return url.origin.includes('firebase') || 
         url.pathname.includes('/auth/') ||
         url.pathname.includes('/private/');
}

async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const responseClone = response.clone();
      const cache = await caches.open(cacheName);
      cache.put(request, responseClone);
    }
    return response;
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', request.url);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    if (isPublicAPI(new URL(request.url))) {
      return new Response(
        JSON.stringify({ 
          error: 'Offline - no cached data available',
          message: 'You are offline and no cached data is available for this request.'
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          status: 503,
          statusText: 'Service Unavailable'
        }
      );
    }
    throw error;
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => {
    return cachedResponse || new Response(
      JSON.stringify({ error: 'Offline - no cached data available' }),
      { headers: { 'Content-Type': 'application/json' }, status: 503 }
    );
  });
  
  return cachedResponse || fetchPromise;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  if (request.method !== 'GET') {
    return;
  }
  
  if (url.pathname.includes('/service-worker.js')) {
    return;
  }
  
  if (isPrivateEndpoint(url)) {
    return;
  }
  
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          return response;
        })
        .catch(() => {
          console.log('[SW] Navigation failed, serving cached index.html');
          return caches.match('/index.html').then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            return new Response('Offline - please check your connection', {
              headers: { 'Content-Type': 'text/html' }
            });
          });
        })
    );
    return;
  }
  
  if (isPublicAPI(url)) {
    event.respondWith(
      networkFirst(request, RUNTIME_CACHE)
    );
    return;
  }
  
  if (url.origin === self.location.origin) {
    if (url.pathname.match(/\.(js|css)$/)) {
      event.respondWith(
        fetch(request)
          .then((response) => {
            if (response.ok) {
              const clone = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
            }
            return response;
          })
          .catch(() => caches.match(request))
      );
      return;
    }
    
    event.respondWith(
      caches.match(request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(request).then((response) => {
            if (response.ok) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return response;
          });
        })
    );
    return;
  }
});

