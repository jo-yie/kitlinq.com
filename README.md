# kitlinq — portfolio site

A fast, free React (Vite) portfolio for **kit ling yeoh-leong**, hosted on GitHub Pages
with a Cloudflare custom domain. Every push rebuilds and redeploys automatically.

The whole site is designed around one idea: **it should be trivial to update.**
All content — every photo, caption, link and bit of text — lives in a single file:

```
src/content.js
```

Kit can edit that one file (even from the GitHub website, on a phone) and the site
updates itself a minute later. She never has to touch the code.

---

## Part 1 — Get it online (one-time, ~20 min)

You'll do this once. After that, updates are automatic.

### 1. Put the code on GitHub
1. Create a new **public** repo on GitHub (e.g. `kitlinq-portfolio`).
2. Push this folder to it:
   ```bash
   git init
   git add .
   git commit -m "initial site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/kitlinq-portfolio.git
   git push -u origin main
   ```

### 2. Turn on GitHub Pages
1. Repo → **Settings** → **Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. That's it — the included workflow (`.github/workflows/deploy.yml`) builds the site.
   Watch it run under the repo's **Actions** tab. The first deploy gives a provisional
   URL: on a normal account that's `https://<your-username>.github.io/kitlinq-portfolio/`.
   If this account already has a **user-site custom domain** (e.g. `joyie.cc`), GitHub
   instead serves it at `https://<that-domain>/kitlinq-portfolio/` — expected.
   > Note: on this provisional URL the styling/asset paths won't load, because the build
   > is configured for a root custom domain (`base: "/"`). This is normal — once
   > `kitlinq.com` is attached (Part 3), everything serves correctly.

### 3. Point your Cloudflare domain at it
1. In the repo: **Settings → Pages → Custom domain** → type `kitlinq.com` → **Save**.
   GitHub stores the domain and starts issuing an HTTPS certificate. (With this
   Actions-based setup you do **not** need a `CNAME` file in the repo — the domain
   saved here is applied on every deploy.)
2. In **Cloudflare → your domain → DNS → Records**, add:

   **For the root domain** `kitlinq.com` — four A records:
   | Type | Name | Content         |
   |------|------|-----------------|
   | A    | @    | 185.199.108.153 |
   | A    | @    | 185.199.109.153 |
   | A    | @    | 185.199.110.153 |
   | A    | @    | 185.199.111.153 |

   **For `www`** — one CNAME:
   | Type  | Name | Content                        |
   |-------|------|--------------------------------|
   | CNAME | www  | `<your-username>.github.io`    |

3. **Set each new record's proxy status to "DNS only" (grey cloud), not proxied
   (orange cloud).** This lets GitHub serve its own HTTPS and avoids redirect loops.
   *(If you later want Cloudflare's CDN/proxy on, you can — but then set Cloudflare
   SSL/TLS mode to **Full**, or you'll get a redirect loop.)*
4. Back in **GitHub → Settings → Pages**, wait for the certificate, then tick
   **Enforce HTTPS**. DNS can take anywhere from a few minutes to a couple of hours.

Done. `https://kitlinq.com` is live. ✦

> The current IP addresses above are GitHub's published Pages IPs. If a record ever
> fails to verify, confirm them at GitHub's docs: "Managing a custom domain for your
> GitHub Pages site".

---

## Part 2 — How Kit updates the site (no coding)

Everything is in **`src/content.js`**. To edit from the browser:

1. Go to the repo → open `src` → click **`content.js`** → click the **pencil ✏️** (Edit).
2. Make the change (see recipes below).
3. Scroll down → **Commit changes**. Wait ~1 minute → refresh the live site.

### Add a photo
Find the roll (section) you want, and add one line inside its `photos: [ ... ]`:
```js
{ src: "PASTE_IMAGE_LINK_HERE", caption: "singapore", film: true },
```
- `src` — the image link. Easiest source: open the photo on the WordPress site,
  right-click → **Copy image address**, and paste it. (Or use your own images, below.)
- `caption` — the little label. `film: true` is optional and just adds a "35mm" tag.

### Remove a photo
Delete its line. **Reorder** photos by moving lines up or down.

### Use your own images instead of WordPress ones (recommended long-term)
1. Put image files in the **`public/images/`** folder (drag-and-drop upload works on GitHub).
2. Reference them with a leading slash:
   ```js
   { src: "/images/skepta-01.jpg", caption: "@skepta" },
   ```
   Keep files reasonably sized (long edge ~2000px) so the site stays fast.

### Fill in the crochet section
The **crochet** roll ships with placeholder tiles (marked "add photo") because the
`@klinqi` work lives on Instagram, and Instagram links can't be hotlinked. To add real
photos: download them from `@klinqi`, drop the files into **`public/images/`**, then in
`content.js` set each crochet tile's `src` to `"/images/your-file.jpg"`. Add or remove
tiles freely — any tile left with `src: ""` just shows a placeholder.

### Add a whole new section (a new "roll")
Copy one entire `{ id: ..., label: ..., note: ..., photos: [...] }` block in `rolls`,
paste it, and change the `id` (must be unique, no spaces), `label`, and photos.

### Change bio, clients, links, email
All in `content.js` too — `profile`, `about`, and `motion`. Just edit the text in quotes.

### Add / change a video (motion section)
In `motion.items`, add a line:
```js
{ title: "shoot name", client: "@brand", platform: "tiktok", href: "LINK" },
```

---

## Part 3 — Running or editing locally (optional, for you)

```bash
npm install      # first time only
npm run dev      # live preview at http://localhost:5173
npm run build    # production build into dist/ (the Action does this for you)
```

## Notes
- **Images currently load from Kit's WordPress CDN.** They'll keep working as long as
  that WordPress site exists. To be fully independent of it, move to `public/images/`
  as described above whenever convenient.
- **No backend, no database, no cost.** GitHub Pages hosting is free; the only cost is
  the domain you already bought.
- Fonts (Bricolage Grotesque, Hanken Grotesk, DM Mono) load from Google Fonts.
