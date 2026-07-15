# Heartland Roofing & Home Services — Website

This is a real, deployable React project (built with Vite).

## Quick reference

- `npm install` then `npm run dev` to preview locally
- `npm run build` produces a `dist/` folder of static files
- Deploy by connecting this project to Vercel — it auto-detects Vite and
  builds it for you, no manual build step needed

## Before going live

- Confirm the real Urbandale office phone number is in place (this was the
  one open item blocking launch)
- Update the domain in `public/sitemap.xml` and `public/robots.txt` if the
  final live domain differs from heartlandroofers.com
- Once live, submit `https://heartlandroofers.com/sitemap.xml` in Google
  Search Console

## Note on "Edit Site"

The Edit Site panel is currently disabled on the public build (see
`ADMIN_ENABLED` near the top of `src/App.jsx`). The underlying code is
still there — flip that flag to `true` once a real live-editing backend
is wired up.
