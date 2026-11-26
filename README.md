# Ampoma Psychotherapy

Standalone React frontend and Node.js/Express backend, arranged for npm and
Visual Studio Code.

## Requirements

- Node.js 20.19 or newer
- npm (included with Node.js)
- Visual Studio Code

## Install and run

From this folder, run:

```sh
npm install
npm run dev
```

If you skip `npm install`, the first `npm run dev` checks for the frontend and
backend packages and installs them when they are missing. Run commands from this
project folder, not from `frontend` or `backend`.

Or in VS Code, choose **Terminal → Run Task → Start Ampoma frontend and backend**.

Open [http://localhost:5173](http://localhost:5173). The React/Vite frontend
runs on port `5173`; the Express backend runs on port `5000`. Vite forwards
`/api` requests to Express during development.

Press **Ctrl+C** to stop both servers.

## Run each part separately

```sh
npm run dev:frontend
npm run dev:backend
```

The website requests its practice details from `GET /api/site-content`.
The shared content is also bundled into the frontend so the site remains fully
usable when served as a static site.

## GitHub Pages deployment

Every push to `main` builds `frontend/` and deploys `frontend/dist` to GitHub
Pages. The custom domain is stored in `frontend/public/CNAME`. To build locally,
run `npm ci` followed by `npm run build`; the generated site is in
`frontend/dist`.

## Frontend source files

The frontend uses JavaScript and JSX. Its component and entry files are
`frontend/src/App.jsx` and `frontend/src/main.jsx`. No TypeScript setup is
required.

## Booking and contact

The **Book** link currently takes visitors to the contact form because no
booking URL was provided. The form opens a prefilled message in the visitor's
email app; it does not send or store messages from the website.
