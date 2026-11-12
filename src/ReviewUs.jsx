import React, { useEffect } from 'react';

// Review landing page — heartlandroofs.com/review-us
// This is where the leave-behind card / yard-sign QR code points.
// Standalone page: no site nav or footer, built for a phone held at the front door.

// ---- Edit these for Heartland --------------------------------------------
// Any link left empty ('') is hidden from the page, so it's safe to go live
// with only one or two sites filled in.
export const REVIEW_CONFIG = {
  phone: '402-709-7392',
  links: {
    // Google Business Profile > Home > "Ask for reviews" gives a short link like
    // https://g.page/r/XXXXXXXX/review — paste that here.
    google: 'https://g.page/r/CYdKrkRCBHI5EBM/review',
    // The Facebook page's reviews tab, e.g. https://www.facebook.com/heartlandroofs/reviews
    facebook: 'https://www.facebook.com/profile.php?id=61595153002596&sk=reviews',
    // The Yelp business page, e.g. https://www.yelp.com/writeareview/biz/XXXXXXXX
    // (or https://www.yelp.com/biz/your-slug)
    yelp: 'https://www.yelp.com/biz/heartland-roofing-and-exterior-services-omaha',
  },
};
// ---------------------------------------------------------------------------

const SITES = [
  {
    id: 'google',
    name: 'Google',
    sub: 'Opens the review box on Google. Tap the stars, write a few lines, then tap Post.',
    logo: (
      <svg className="logo" viewBox="0 0 40 40" aria-hidden="true">
        <circle cx="20" cy="20" r="20" fill="#fff" stroke="#e3e3e3" />
        <path d="M30.5 20.3c0-.8-.1-1.5-.2-2.2H20v4.2h5.9c-.3 1.4-1 2.5-2.2 3.3v2.7h3.5c2.1-1.9 3.3-4.7 3.3-8z" fill="#4285F4" />
        <path d="M20 31c2.9 0 5.4-1 7.2-2.7l-3.5-2.7c-1 .7-2.2 1.1-3.7 1.1-2.8 0-5.2-1.9-6.1-4.5H10.3v2.8C12.1 28.6 15.8 31 20 31z" fill="#34A853" />
        <path d="M13.9 22.2c-.2-.7-.4-1.4-.4-2.2s.1-1.5.4-2.2V15h-3.6c-.8 1.5-1.2 3.2-1.2 5s.4 3.5 1.2 5l3.6-2.8z" fill="#FBBC05" />
        <path d="M20 13.3c1.6 0 3 .6 4.2 1.6l3.1-3.1C25.4 10 22.9 9 20 9c-4.2 0-7.9 2.4-9.7 6l3.6 2.8c.9-2.6 3.3-4.5 6.1-4.5z" fill="#EA4335" />
      </svg>
    ),
  },
  {
    id: 'facebook',
    name: 'Facebook',
    sub: 'On our page, answer "Do you recommend Heartland?" and add a few lines.',
    logo: (
      <svg className="logo" viewBox="0 0 40 40" aria-hidden="true">
        <circle cx="20" cy="20" r="20" fill="#1877F2" />
        <path d="M22.2 31V21.6h3.1l.5-3.7h-3.6v-2.3c0-1.1.3-1.8 1.8-1.8h1.9v-3.3c-.3 0-1.5-.1-2.8-.1-2.8 0-4.7 1.7-4.7 4.8v2.7h-3.1v3.7h3.1V31h3.8z" fill="#fff" />
      </svg>
    ),
  },
  {
    id: 'yelp',
    name: 'Yelp',
    sub: 'On our Yelp page, tap Write a review. Yelp asks you to sign in first.',
    logo: (
      <svg className="logo" viewBox="0 0 40 40" aria-hidden="true">
        <circle cx="20" cy="20" r="20" fill="#D32323" />
        <g fill="#fff">
          <path d="M18.6 9.5c-.9-.2-3.6.6-4.3 1.2-.3.3-.4.7-.3 1l3.4 6c.6.9 1.9.5 1.9-.6l.1-6.6c0-.5-.3-.9-.8-1z" />
          <path d="M17.2 22.3l-4.8 1.3c-.5.1-.8.6-.7 1.1.1 1 1.2 3.2 1.8 3.7.4.3.8.3 1.2.1l3.6-3.9c.7-.8 0-2.2-1.1-2.3z" />
          <path d="M17.6 19.7l-5.2-2.5c-.4-.2-.9 0-1.1.4-.4.9-.6 3.2-.4 4 .1.4.5.7.9.7l5.5-.5c1.1-.1 1.3-1.6.3-2.1z" />
          <path d="M20.3 23.6l-.1 5.3c0 .5.4.9.9.9 1 0 3.2-.8 3.8-1.4.3-.3.4-.7.2-1.1l-2.9-4.4c-.6-.9-1.9-.5-1.9.7z" />
          <path d="M28.3 20.3c-.6-.8-2.5-2.3-3.4-2.6-.4-.1-.8 0-1 .3l-3 4.3c-.6.9.3 2 1.3 1.7l5.6-2.2c.5-.3.7-.9.5-1.5z" />
        </g>
      </svg>
    ),
  },
];

const Icon = ({ d, children }) => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    {d ? <path d={d} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /> : children}
  </svg>
);

const IDEAS = [
  { icon: <Icon d="M2 11L10 3l8 8M5 8.5V17h10V8.5" />, title: 'What we did.', text: 'A full roof replacement, storm repair, siding, gutters?' },
  { icon: <Icon d="M3 4h14v9H8l-4 3v-3H3z" />, title: 'How we kept in touch.', text: 'From the first inspection to the final walkthrough, did you know what was happening?' },
  { icon: <Icon d="M5 2h7l3 3v13H5z M8 9h5 M8 12h5 M8 15h3" />, title: 'Insurance help.', text: 'If there was a claim, how did we help you through it?' },
  { icon: <Icon d="M4 17h12M6 17V9l4-3 4 3v8M10 3v3" />, title: 'The crew and cleanup.', text: 'How did they treat your home and yard?' },
  {
    icon: (
      <Icon>
        <circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M10 6v4.5l3 2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </Icon>
    ),
    title: 'Timing.', text: 'Did we show up and finish when we said we would?',
  },
  {
    icon: (
      <Icon>
        <circle cx="10" cy="7" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3.5 17c.8-3.2 3.3-5 6.5-5s5.7 1.8 6.5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </Icon>
    ),
    title: 'Anyone who stood out.', text: 'Feel free to mention them by name.',
  },
  {
    icon: (
      <Icon>
        <rect x="2.5" y="5" width="15" height="11" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="10" cy="10.5" r="2.8" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M7 5l1.2-2h3.6L13 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </Icon>
    ),
    title: 'A photo.', text: 'A picture of the finished work helps more than anything.',
  },
];

export default function ReviewUs() {
  const { phone, links } = REVIEW_CONFIG;
  const sites = SITES.filter((s) => links[s.id] && links[s.id].trim());

  useEffect(() => {
    document.title = 'Leave a Review | Heartland Roofing & Exterior Services';
    // Keep this page out of search results; it's only for customers who scan the code.
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      document.head.appendChild(robots);
    }
    robots.setAttribute('content', 'noindex');
    document.body.style.margin = '0';
  }, []);

  const track = (platform) => {
    if (typeof window.gtag === 'function') window.gtag('event', 'review_click', { platform });
  };

  return (
    <div className="rv">
      <style>{CSS}</style>
      <header className="rv-hero">
        <img src="/review-us-logo.png" alt="Heartland Roofing & Exterior Services" />
      </header>

      <main className="rv-wrap">
        <section className="rv-intro">
          <p className="rv-kicker">Thank you, neighbor.</p>
          <h1>How did we do?</h1>
          <div className="rv-rule" aria-hidden="true" />
          <p className="rv-lede">
            Thank you for trusting Heartland with your home. We're a local, family-focused team, and most of our work
            comes from word of mouth. A few honest words about your project help other homeowners know who they can count on.
          </p>
        </section>

        <ol className="rv-steps" aria-label="How to leave a review">
          <li><span className="n">1</span><span><strong>Pick a site</strong>whichever you use most</span></li>
          <li><span className="n">2</span><span><strong>Choose a rating</strong>tap the stars</span></li>
          <li><span className="n">3</span><span><strong>Add a few lines</strong>about your project</span></li>
        </ol>

        <section className="rv-sites-block">
          <h2>Leave a review</h2>
          {sites.length > 0 ? (
            <nav className="rv-sites" aria-label="Review sites">
              {sites.map((s) => (
                <a key={s.id} className="rv-site" href={links[s.id]} target="_blank" rel="noopener" onClick={() => track(s.id)}>
                  {s.logo}
                  <span className="text"><span className="name">{s.name}</span><span className="sub">{s.sub}</span></span>
                  <svg className="go" viewBox="0 0 20 20" aria-hidden="true"><path d="M7 4l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </a>
              ))}
            </nav>
          ) : (
            <p className="rv-note">Review links are coming soon. In the meantime, we'd love to hear from you at the office.</p>
          )}
          {sites.length > 0 && <p className="rv-note">Each site opens in a new tab, so you can come back here for ideas.</p>}
        </section>

        <section className="rv-ideas">
          <h2>Not sure what to write?</h2>
          <p>Two or three sentences is plenty. Here are a few things other homeowners like to know:</p>
          <ul>
            {IDEAS.map((i) => (
              <li key={i.title}>{i.icon}<span><strong>{i.title}</strong> {i.text}</span></li>
            ))}
          </ul>
        </section>

        <aside className="rv-direct">
          <h2>Something we should make right?</h2>
          <p>Call or text the office at <a className="phone" href={`tel:${phone.replace(/[^\d+]/g, '')}`}>{phone}</a> and we'll take care of it.</p>
        </aside>

        <p className="rv-tagline">Rooted in Integrity. Built to Last.</p>
      </main>
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=League+Spartan:wght@600;700&family=Montserrat:wght@400;500;600&family=Cormorant+Garamond:ital,wght@1,500;1,600&display=swap');
.rv {
  --bg:#ffffff; --section:#f5f5f5; --surface:#ffffff; --ink:#232323; --heading:#11284b; --muted:#4f5b66;
  --line:#eae7e2; --navy:#11284b; --gold:#d8a125; --step-ink:#11284b;
  --display:"League Spartan","Montserrat","Segoe UI",system-ui,sans-serif;
  --body:"Montserrat","Segoe UI",system-ui,sans-serif;
  --accent:"Cormorant Garamond",Georgia,"Times New Roman",serif;
  min-height:100vh; background:var(--bg); color:var(--ink); font:400 1rem/1.6 var(--body); -webkit-font-smoothing:antialiased;
}
@media (prefers-color-scheme: dark) {
  .rv { --bg:#0b1c36; --section:#0e2241; --surface:#13294c; --ink:#eef1f5; --heading:#ffffff; --muted:#b4bfcc; --line:#22395f; --step-ink:#0b1c36; color-scheme:dark; }
}
.rv *, .rv *::before, .rv *::after { box-sizing:border-box; }
.rv-hero {
  background:var(--navy);
  clip-path:polygon(0 0,100% 0,100% calc(100% - 2.25rem),50% 100%,0 calc(100% - 2.25rem));
  padding:2.25rem max(16px, env(safe-area-inset-right,0px)) 4rem max(16px, env(safe-area-inset-left,0px));
  display:flex; justify-content:center;
}
.rv-hero img { width:min(18rem,78vw); height:auto; display:block; }
.rv-wrap { max-width:31rem; margin:0 auto; padding:1.5rem max(16px, env(safe-area-inset-right,0px)) 2.5rem max(16px, env(safe-area-inset-left,0px)); display:flex; flex-direction:column; gap:2rem; }
.rv-intro { display:flex; flex-direction:column; gap:.5rem; text-align:center; align-items:center; }
.rv-kicker { margin:0; font:italic 600 1.3rem/1.2 var(--accent); color:var(--muted); }
.rv h1 { margin:0; font:700 clamp(2.1rem,8.5vw,2.7rem)/1.02 var(--display); letter-spacing:-.015em; color:var(--heading); text-wrap:balance; }
.rv-rule { width:3rem; height:3px; background:var(--gold); border-radius:2px; margin:.35rem 0 .2rem; }
.rv-lede { margin:0; color:var(--muted); max-width:36ch; text-wrap:pretty; }
.rv h2 { margin:0; font:700 1.2rem/1.2 var(--display); color:var(--heading); }
.rv-steps { list-style:none; margin:0; padding:0; display:grid; grid-template-columns:repeat(3,1fr); gap:.5rem; }
.rv-steps li { display:flex; flex-direction:column; align-items:center; text-align:center; gap:.4rem; font-size:.82rem; line-height:1.35; color:var(--muted); }
.rv-steps .n { width:2rem; height:2rem; border-radius:50%; display:grid; place-items:center; background:var(--gold); color:var(--step-ink); font:700 1rem/1 var(--display); padding-top:.12rem; }
.rv-steps strong { color:var(--heading); font-weight:600; display:block; }
.rv-sites-block { display:flex; flex-direction:column; gap:.85rem; }
.rv-sites { display:flex; flex-direction:column; gap:.75rem; }
.rv-site { display:flex; align-items:center; gap:1rem; padding:1rem 1.1rem; min-height:4.6rem; background:var(--surface); color:var(--ink); text-decoration:none; border:1px solid var(--line); border-radius:10px; box-shadow:0 1px 2px rgb(11 28 54 / .06); transition:border-color .15s, transform .15s, box-shadow .15s; }
.rv-site:hover { border-color:var(--gold); box-shadow:0 4px 14px rgb(11 28 54 / .1); }
.rv-site:active { transform:scale(.985); }
.rv-site:focus-visible { outline:3px solid var(--gold); outline-offset:2px; }
.rv-site .logo { width:2.5rem; height:2.5rem; flex:none; }
.rv-site .text { display:flex; flex-direction:column; min-width:0; flex:1; }
.rv-site .name { font:700 1.15rem/1.15 var(--display); color:var(--heading); padding-top:.15rem; }
.rv-site .sub { font-size:.82rem; line-height:1.4; color:var(--muted); }
.rv-site .go { width:1.25rem; height:1.25rem; color:var(--gold); flex:none; }
.rv-note { margin:0; font-size:.82rem; color:var(--muted); text-align:center; }
.rv-ideas { display:flex; flex-direction:column; gap:.85rem; }
.rv-ideas > p { margin:0; color:var(--muted); font-size:.93rem; }
.rv-ideas ul { list-style:none; margin:0; padding:0; display:flex; flex-direction:column; border-top:1px solid var(--line); }
.rv-ideas li { display:grid; grid-template-columns:1.6rem 1fr; gap:.6rem; padding:.75rem 0; border-bottom:1px solid var(--line); font-size:.95rem; }
.rv-ideas li svg { width:1.3rem; height:1.3rem; color:var(--gold); margin-top:.15rem; }
.rv-ideas li span { min-width:0; }
.rv-ideas li strong { color:var(--heading); font-weight:600; }
.rv-direct { background:var(--section); border-radius:10px; padding:1.25rem; display:flex; flex-direction:column; gap:.3rem; }
.rv-direct h2 { font-size:1.1rem; }
.rv-direct p { margin:0; color:var(--muted); font-size:.93rem; }
.rv-direct .phone { color:var(--heading); font-weight:600; text-decoration:none; font-variant-numeric:tabular-nums; white-space:nowrap; }
.rv-tagline { margin:0; text-align:center; font:italic 500 1.15rem/1.3 var(--accent); color:var(--muted); }
@media (prefers-reduced-motion: reduce) { .rv-site { transition:none; } .rv-site:active { transform:none; } }
`;
