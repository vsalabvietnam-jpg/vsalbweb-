// Window.fetch setter compatibility safeguard for iframe / preview runners
(function() {
  try {
    const _nativeFetch = window.fetch ? window.fetch.bind(window) : null;
    let _currentFetch = _nativeFetch;

    const getFetch = () => _currentFetch;
    const setFetch = (fn: any) => { _currentFetch = fn; };

    if (typeof Window !== 'undefined' && Window.prototype) {
      try {
        Object.defineProperty(Window.prototype, 'fetch', {
          get: getFetch,
          set: setFetch,
          configurable: true,
          enumerable: true,
        });
      } catch {}
    }

    try {
      Object.defineProperty(window, 'fetch', {
        get: getFetch,
        set: setFetch,
        configurable: true,
        enumerable: true,
      });
    } catch {}

    window.addEventListener('error', (event) => {
      if (event && event.message && event.message.includes('fetch') && event.message.includes('only a getter')) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return true;
      }
    }, true);
  } catch {}
})();

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
