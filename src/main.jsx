import React from 'react';
import ReactDOM from 'react-dom/client';

// /review-us is the QR-code landing page: it renders on its own, without the site nav or footer,
// and loads only its own small bundle so it opens fast on a phone at the door.
const isReviewPage = /^\/review-us\/?$/i.test(window.location.pathname);
const load = isReviewPage ? import('./ReviewUs.jsx') : import('./App.jsx');

load.then(({ default: Page }) => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Page />
    </React.StrictMode>
  );
});
