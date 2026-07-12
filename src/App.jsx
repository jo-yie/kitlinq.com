import React, { useState, useEffect, useCallback, useRef } from "react";
import { profile, feature, rolls, motion, about } from "./content.js";

/* ── image helper: sizes WordPress-CDN images on the fly, leaves others alone ── */
function sized(src, w) {
  if (!src) return src;
  const isWp = src.includes("wp.com") || src.includes("wordpress.com");
  if (!isWp) return src;
  const base = src.split("?")[0];
  return `${base}?w=${w}&ssl=1`;
}
const pad = (n) => String(n + 1).padStart(2, "0");

/* ── scroll-reveal wrapper ── */
function Reveal({ children, className = "", style }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setShown(true); return; }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } },
      { threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${shown ? "in" : ""} ${className}`} style={style}>
      {children}
    </div>
  );
}

export default function App() {
  const [box, setBox] = useState(null); // { rollIdx, photoIdx }
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openBox = (rollIdx, photoIdx) => setBox({ rollIdx, photoIdx });
  const closeBox = useCallback(() => setBox(null), []);
  const move = useCallback(
    (dir) => {
      setBox((b) => {
        if (!b) return b;
        const list = rolls[b.rollIdx].photos;
        let i = b.photoIdx + dir;
        if (i < 0) i = list.length - 1;
        if (i >= list.length) i = 0;
        return { ...b, photoIdx: i };
      });
    },
    []
  );

  useEffect(() => {
    if (!box) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeBox();
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [box, closeBox, move]);

  const jump = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const current = box ? rolls[box.rollIdx].photos[box.photoIdx] : null;

  return (
    <div className="kl">
      <style>{CSS}</style>
      <div className="grain" aria-hidden="true" />

      {/* ── nav ── */}
      <header className={`nav ${scrolled ? "solid" : ""}`}>
        <a className="nav-brand" href="#top" onClick={jump("top")}>
          {profile.handle}<span className="reg">®</span>
        </a>
        <nav className="nav-links">
          {rolls.map((r) => (
            <a key={r.id} href={`#${r.id}`} onClick={jump(r.id)}>{r.label.split(" ")[0]}</a>
          ))}
          <a href="#motion" onClick={jump("motion")}>motion</a>
          <a href="#info" onClick={jump("info")}>info</a>
        </nav>
        <a className="nav-mail" href={`mailto:${profile.email}`}>get in touch →</a>
      </header>

      {/* ── hero ── */}
      <section id="top" className="hero">
        <div className="hero-type">
          <div className="rebate">
            <span>▸ 35mm</span><span>london</span><span>est. film archive</span>
          </div>
          <h1 className="name">{profile.name}</h1>
          <p className="tagline">{profile.tagline}</p>
          <p className="intro">{profile.intro}</p>
          <div className="hero-cta">
            <a href="#artists" onClick={jump("artists")} className="btn">view the work</a>
            <a href={`mailto:${profile.email}`} className="btn ghost">{profile.email}</a>
          </div>
        </div>
        <Reveal className="hero-shot">
          <figure onClick={() => openBox(0, 0)}>
            <img src={sized(profile.hero.src, 1000)} alt={profile.hero.caption} loading="eager" />
            <figcaption>
              <span className="fref">f01</span>
              <span>{profile.hero.caption}</span>
              {profile.hero.film && <span className="tag">35mm</span>}
            </figcaption>
          </figure>
          <div className="sprocket" aria-hidden="true">{Array.from({ length: 26 }).map((_, i) => <i key={i} />)}</div>
        </Reveal>
      </section>

      {/* ── feature band ── */}
      {feature && (
        <a className="feature" href={feature.href} target="_blank" rel="noreferrer">
          <div className="feature-thumb">
            <img src={sized(feature.image, 400)} alt={feature.outlet} loading="lazy" />
          </div>
          <div className="feature-body">
            <span className="eyebrow">press — {feature.kind}</span>
            <h3>{feature.title}</h3>
            <span className="feature-outlet">{feature.outlet} <span className="arrow">↗</span></span>
          </div>
        </a>
      )}

      {/* ── rolls / galleries ── */}
      {rolls.map((roll, rIdx) => (
        <section id={roll.id} key={roll.id} className="roll">
          <div className="roll-head">
            <span className="roll-no">roll {pad(rIdx)}</span>
            <h2 className="roll-title">{roll.label}</h2>
            <span className="roll-note">{roll.note}</span>
            <span className="roll-count">{roll.photos.length} frames</span>
          </div>
          <div className={`grid grid-${roll.id}`}>
            {roll.photos.map((p, i) => (
              <Reveal key={p.src || `${roll.id}-${i}`} className="cell" style={{ transitionDelay: `${(i % 4) * 55}ms` }}>
                {p.src ? (
                  <figure onClick={() => openBox(rIdx, i)}>
                    <img src={sized(p.src, 900)} alt={p.caption} loading="lazy" />
                    <figcaption>
                      <span className="fref">f{pad(i)}</span>
                      <span className="cap">{p.caption}</span>
                      {p.film && <span className="tag">35mm</span>}
                    </figcaption>
                  </figure>
                ) : (
                  <div className="ph">
                    <span className="ph-mark">◇</span>
                    <span className="ph-cap">{p.caption}</span>
                    <span className="ph-hint">add photo</span>
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </section>
      ))}

      {/* ── motion ── */}
      <section id="motion" className="motion">
        <div className="roll-head">
          <span className="roll-no rec">● motion</span>
          <h2 className="roll-title">{motion.label}</h2>
          <span className="roll-note">{motion.note}</span>
          <span className="roll-count">{motion.items.length} edits</span>
        </div>
        <ul className="shotlist">
          {motion.items.map((m, i) => (
            <li key={m.href}>
              <a href={m.href} target="_blank" rel="noreferrer">
                <span className="ci">{pad(i)}</span>
                <span className="ct">{m.title}</span>
                <span className="cc">{m.client}</span>
                <span className="cp">{m.platform}</span>
                <span className="cx">watch ↗</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* ── info ── */}
      <section id="info" className="info">
        <div className="info-grid">
          <div className="info-lead">
            <span className="eyebrow light">info</span>
            <p className="bio">{profile.intro}</p>
            <div className="edu">
              {about.education.map((e) => <span key={e}>{e}</span>)}
            </div>
          </div>

          <div className="info-col">
            <span className="col-label">practice</span>
            <ul>{about.practice.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>

          <div className="info-col">
            <span className="col-label">clients · commissions · exhibitions</span>
            <ul className="clients">{about.clients.map((c) => <li key={c}>{c}</li>)}</ul>
          </div>

          <div className="info-contact">
            <span className="col-label">say hello</span>
            <a className="big-mail" href={`mailto:${profile.email}`}>{profile.email}</a>
            <div className="socials">
              <a href={profile.socials.instagram} target="_blank" rel="noreferrer">instagram ↗</a>
              <a href={profile.socials.tiktok} target="_blank" rel="noreferrer">tiktok ↗</a>
              <a href={profile.socials.crochet} target="_blank" rel="noreferrer">crochet — @klinqi ↗</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── footer ── */}
      <footer className="foot">
        <span>{profile.name}</span>
        <span className="foot-mid">▸ 35mm — london — {new Date().getFullYear()}</span>
        <span>© all rights reserved</span>
      </footer>

      {/* ── lightbox ── */}
      {box && current && (
        <div className="lb" onClick={closeBox}>
          <button className="lb-close" onClick={closeBox} aria-label="close">✕</button>
          <button className="lb-nav prev" onClick={(e) => { e.stopPropagation(); move(-1); }} aria-label="previous">‹</button>
          <figure className="lb-fig" onClick={(e) => e.stopPropagation()}>
            <img src={sized(current.src, 1800)} alt={current.caption} />
            <figcaption>
              <span className="fref">f{pad(box.photoIdx)}</span>
              <span className="cap">{current.caption}</span>
              {current.film && <span className="tag">35mm</span>}
              <span className="lb-count">{pad(box.photoIdx)} / {pad(rolls[box.rollIdx].photos.length - 1)}</span>
            </figcaption>
          </figure>
          <button className="lb-nav next" onClick={(e) => { e.stopPropagation(); move(1); }} aria-label="next">›</button>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────  styles  ───────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&family=Hanken+Grotesk:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');

.kl{
  --paper:#e6e4dd; --paper-dim:#dedbd2; --ink:#171614; --ink-2:#4c4a44;
  --muted:#8c877c; --line:rgba(23,22,20,.16); --red:#e23a2e; --dark:#141210;
  --display:'Bricolage Grotesque',sans-serif;
  --body:'Hanken Grotesk',system-ui,sans-serif;
  --mono:'DM Mono',ui-monospace,monospace;
  background:var(--paper); color:var(--ink); font-family:var(--body);
  -webkit-font-smoothing:antialiased; overflow-x:hidden; position:relative;
}
.kl *{box-sizing:border-box; margin:0; padding:0;}
.kl a{color:inherit; text-decoration:none;}
.kl img{display:block; width:100%; height:100%; object-fit:cover;}

.grain{position:fixed; inset:0; z-index:2; pointer-events:none; opacity:.05; mix-blend-mode:multiply;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");}

/* reveal */
.reveal{opacity:0; transform:translateY(16px); transition:opacity .7s ease, transform .7s cubic-bezier(.2,.7,.2,1);}
.reveal.in{opacity:1; transform:none;}
@media (prefers-reduced-motion: reduce){ .reveal{opacity:1; transform:none; transition:none;} }

/* nav */
.nav{position:fixed; top:0; left:0; right:0; z-index:20; display:flex; align-items:center;
  justify-content:space-between; gap:1rem; padding:.85rem clamp(1rem,4vw,2.6rem);
  border-bottom:1px solid transparent; transition:background .3s, border-color .3s;}
.nav.solid{background:rgba(230,228,221,.82); backdrop-filter:blur(10px); border-color:var(--line);}
.nav-brand{font-family:var(--display); font-weight:800; font-size:1.15rem; letter-spacing:-.02em;}
.nav-brand .reg{font-size:.6em; vertical-align:super; margin-left:1px; color:var(--red);}
.nav-links{display:flex; gap:1.1rem; font-family:var(--mono); font-size:.74rem; text-transform:lowercase;}
.nav-links a{position:relative; padding:.15rem 0; color:var(--ink-2);}
.nav-links a:hover{color:var(--ink);}
.nav-links a::after{content:""; position:absolute; left:0; bottom:-2px; width:0; height:1px; background:var(--red); transition:width .25s;}
.nav-links a:hover::after{width:100%;}
.nav-mail{font-family:var(--mono); font-size:.74rem; color:var(--ink);}
.nav-mail:hover{color:var(--red);}
@media (max-width:760px){ .nav-links{display:none;} }

/* hero */
.hero{display:grid; grid-template-columns:1.15fr .85fr; gap:clamp(1.5rem,4vw,3.5rem);
  align-items:end; padding:clamp(6.5rem,13vh,9rem) clamp(1rem,4vw,2.6rem) clamp(2.5rem,6vh,4rem);
  min-height:100svh;}
.rebate{display:flex; gap:1.1rem; font-family:var(--mono); font-size:.72rem; text-transform:uppercase;
  letter-spacing:.12em; color:var(--muted); margin-bottom:1.4rem;}
.rebate span:first-child{color:var(--red);}
.name{font-family:var(--display); font-weight:800; line-height:.9; letter-spacing:-.035em;
  font-size:clamp(2.7rem,8.5vw,7.4rem); text-transform:lowercase;}
.tagline{font-family:var(--display); font-weight:400; font-size:clamp(1.05rem,2.3vw,1.7rem);
  margin-top:1rem; color:var(--ink); letter-spacing:-.01em;}
.intro{max-width:44ch; margin-top:1.3rem; font-size:1rem; line-height:1.5; color:var(--ink-2);}
.hero-cta{display:flex; flex-wrap:wrap; gap:.7rem; margin-top:2rem;}
.btn{font-family:var(--mono); font-size:.8rem; padding:.7rem 1.1rem; border:1px solid var(--ink);
  border-radius:0; transition:background .2s,color .2s;}
.btn:hover{background:var(--ink); color:var(--paper);}
.btn.ghost{border-color:var(--line); color:var(--ink-2);}
.btn.ghost:hover{background:transparent; color:var(--red); border-color:var(--red);}

.hero-shot{position:relative;}
.hero-shot figure{position:relative; cursor:pointer; overflow:hidden; aspect-ratio:4/5; background:var(--paper-dim);}
.hero-shot img{transition:transform .9s cubic-bezier(.2,.7,.2,1); filter:saturate(1.02);}
.hero-shot figure:hover img{transform:scale(1.04);}
.hero-shot figcaption{position:absolute; left:0; bottom:0; right:0; display:flex; align-items:center; gap:.6rem;
  padding:.6rem .7rem; font-family:var(--mono); font-size:.72rem; color:#f4f2ec;
  background:linear-gradient(transparent,rgba(15,13,11,.72));}
.sprocket{display:flex; justify-content:space-between; margin-top:6px; padding:0 2px;}
.sprocket i{width:9px; height:12px; background:var(--paper); border:1px solid var(--line); border-radius:2px;}
@media (max-width:760px){
  .hero{grid-template-columns:1fr; min-height:auto; align-items:start;}
  .hero-shot{margin-top:2rem; max-width:420px;}
  .sprocket i:nth-child(n+16){display:none;}
}

/* shared caption chips */
.fref{font-family:var(--mono); color:var(--red); font-weight:500;}
.tag{font-family:var(--mono); font-size:.62rem; text-transform:uppercase; letter-spacing:.1em;
  border:1px solid currentColor; padding:.05rem .3rem; opacity:.8;}
.cap{font-family:var(--mono);}

/* feature band */
.feature{display:grid; grid-template-columns:auto 1fr; gap:clamp(1rem,3vw,2rem); align-items:center;
  margin:clamp(1.5rem,4vw,2.5rem) clamp(1rem,4vw,2.6rem); padding:1.1rem;
  border:1px solid var(--line); border-radius:0; transition:border-color .25s, background .25s;}
.feature:hover{border-color:var(--ink); background:var(--paper-dim);}
.feature-thumb{width:clamp(74px,10vw,116px); aspect-ratio:3/4; overflow:hidden; background:var(--paper-dim);}
.feature-body h3{font-family:var(--display); font-weight:600; font-size:clamp(1.1rem,2.6vw,1.9rem);
  line-height:1.05; letter-spacing:-.02em; margin:.3rem 0 .5rem; text-transform:lowercase;}
.eyebrow{font-family:var(--mono); font-size:.7rem; text-transform:uppercase; letter-spacing:.14em; color:var(--red);}
.feature-outlet{font-family:var(--mono); font-size:.8rem; color:var(--ink-2);}
.feature:hover .arrow{color:var(--red);}

/* roll head */
.roll, .motion{padding:clamp(2.2rem,6vw,4rem) clamp(1rem,4vw,2.6rem);}
.roll-head{display:flex; align-items:baseline; gap:1rem; flex-wrap:wrap;
  padding-bottom:1.1rem; margin-bottom:1.6rem; border-bottom:1px solid var(--line);}
.roll-no{font-family:var(--mono); font-size:.78rem; text-transform:uppercase; letter-spacing:.1em; color:var(--red);}
.roll-no.rec{color:var(--red);}
.roll-title{font-family:var(--display); font-weight:800; letter-spacing:-.03em; text-transform:lowercase;
  font-size:clamp(1.6rem,5vw,3.1rem); line-height:.95; margin-right:auto;}
.roll-note{font-family:var(--mono); font-size:.76rem; color:var(--muted);}
.roll-count{font-family:var(--mono); font-size:.76rem; color:var(--ink-2);}

/* grids (masonry via CSS columns) */
.grid{column-gap:clamp(.6rem,1.4vw,1rem);}
.grid .cell{break-inside:avoid; margin-bottom:clamp(.6rem,1.4vw,1rem);}
.grid-artists{column-count:2;}
.grid-film{column-count:3;}
.grid-studio{column-count:3;}
.grid-crochet{column-count:2;}
@media (max-width:900px){ .grid-film,.grid-studio{column-count:2;} }
@media (max-width:560px){ .grid-artists,.grid-film,.grid-studio,.grid-crochet{column-count:1;} }

/* placeholder tile (for rolls awaiting real images, e.g. crochet) */
.ph{aspect-ratio:4/5; border:1px dashed var(--line); background:var(--paper-dim);
  display:flex; flex-direction:column; align-items:center; justify-content:center; gap:.45rem;}
.ph-mark{font-size:1.5rem; color:var(--red); opacity:.65;}
.ph-cap{font-family:var(--mono); font-size:.82rem; color:var(--ink-2);}
.ph-hint{font-family:var(--mono); font-size:.64rem; text-transform:uppercase; letter-spacing:.14em; color:var(--muted);}

.cell figure{position:relative; cursor:pointer; overflow:hidden; background:var(--paper-dim); border:1px solid var(--line);}
.cell img{transition:transform .8s cubic-bezier(.2,.7,.2,1);}
.cell figure:hover img{transform:scale(1.045);}
.cell figcaption{position:absolute; inset:auto 0 0 0; display:flex; align-items:center; gap:.5rem;
  padding:.55rem .6rem; font-size:.72rem; color:#f4f2ec; opacity:0; transform:translateY(6px);
  transition:opacity .3s, transform .3s; background:linear-gradient(transparent,rgba(15,13,11,.75));}
.cell figure:hover figcaption{opacity:1; transform:none;}
.cell figcaption .tag{color:#f4f2ec;}
@media (hover:none){ .cell figcaption{opacity:1; transform:none;} }

/* motion shotlist */
.shotlist{list-style:none;}
.shotlist li{border-bottom:1px solid var(--line);}
.shotlist a{display:grid; grid-template-columns:2.4rem 1fr auto auto auto; gap:1rem; align-items:center;
  padding:1rem .2rem; transition:background .2s, padding .25s;}
.shotlist a:hover{background:var(--paper-dim); padding-left:.8rem;}
.shotlist .ci{font-family:var(--mono); font-size:.75rem; color:var(--red);}
.shotlist .ct{font-family:var(--display); font-weight:600; font-size:clamp(1rem,2.4vw,1.4rem);
  text-transform:lowercase; letter-spacing:-.01em;}
.shotlist .cc,.shotlist .cp{font-family:var(--mono); font-size:.76rem; color:var(--ink-2);}
.shotlist .cp{color:var(--muted);}
.shotlist .cx{font-family:var(--mono); font-size:.76rem; color:var(--ink); opacity:0; transition:opacity .2s;}
.shotlist a:hover .cx{opacity:1; color:var(--red);}
@media (max-width:760px){
  .shotlist a{grid-template-columns:1.8rem 1fr; row-gap:.3rem;}
  .shotlist .cc{grid-column:2;} .shotlist .cp,.shotlist .cx{display:none;}
}

/* info (darkroom) */
.info{background:var(--dark); color:var(--paper); padding:clamp(3rem,8vw,6rem) clamp(1rem,4vw,2.6rem);}
.info-grid{display:grid; grid-template-columns:1.3fr 1fr 1.2fr; gap:clamp(1.6rem,4vw,3rem);}
.info-lead{grid-column:1 / -1; max-width:60ch; margin-bottom:1rem;}
.eyebrow.light{color:var(--red);}
.bio{font-family:var(--display); font-weight:400; font-size:clamp(1.3rem,3.2vw,2.2rem);
  line-height:1.22; letter-spacing:-.02em; margin:1rem 0 1.4rem; text-transform:lowercase;}
.edu{display:flex; flex-wrap:wrap; gap:.5rem 1.4rem; font-family:var(--mono); font-size:.8rem; color:#b7b2a6;}
.col-label{font-family:var(--mono); font-size:.72rem; text-transform:uppercase; letter-spacing:.14em;
  color:var(--red); display:block; margin-bottom:1rem;}
.info-col ul, .info-contact .socials{list-style:none;}
.info-col li{font-size:.95rem; line-height:1.5; padding:.32rem 0; border-bottom:1px solid rgba(230,228,221,.1); color:#e6e4dd;}
.info-col .clients li{font-family:var(--mono); font-size:.8rem; color:#c8c3b8;}
.info-contact{grid-column:1 / -1;}
.big-mail{font-family:var(--display); font-weight:600; font-size:clamp(1.6rem,6vw,3.4rem);
  letter-spacing:-.03em; display:inline-block; margin-bottom:1.2rem; text-transform:lowercase;}
.big-mail:hover{color:var(--red);}
.socials{display:flex; flex-wrap:wrap; gap:1.4rem; font-family:var(--mono); font-size:.85rem;}
.socials a{color:#c8c3b8; border-bottom:1px solid transparent;}
.socials a:hover{color:var(--paper); border-color:var(--red);}
@media (max-width:820px){ .info-grid{grid-template-columns:1fr;} }

/* footer */
.foot{display:flex; justify-content:space-between; flex-wrap:wrap; gap:.6rem;
  padding:1.4rem clamp(1rem,4vw,2.6rem); font-family:var(--mono); font-size:.74rem; color:var(--muted);
  border-top:1px solid var(--line);}
.foot-mid{color:var(--ink-2);}

/* lightbox */
.lb{position:fixed; inset:0; z-index:60; background:rgba(15,13,11,.94); display:flex; align-items:center;
  justify-content:center; padding:clamp(1rem,4vw,3rem); animation:fade .25s ease;}
@keyframes fade{from{opacity:0} to{opacity:1}}
.lb-fig{max-width:min(92vw,1100px); max-height:88vh; display:flex; flex-direction:column;}
.lb-fig img{width:auto; max-width:100%; max-height:78vh; object-fit:contain; box-shadow:0 30px 80px rgba(0,0,0,.5);}
.lb-fig figcaption{display:flex; align-items:center; gap:.7rem; padding-top:.8rem;
  font-family:var(--mono); font-size:.78rem; color:#e6e4dd;}
.lb-fig .tag{color:#e6e4dd;}
.lb-count{margin-left:auto; color:#b7b2a6;}
.lb-close{position:fixed; top:1.1rem; right:1.3rem; background:none; border:none; color:#e6e4dd;
  font-size:1.4rem; cursor:pointer; font-family:var(--mono);}
.lb-close:hover{color:var(--red);}
.lb-nav{position:fixed; top:50%; transform:translateY(-50%); background:none; border:none;
  color:#e6e4dd; font-size:2.6rem; cursor:pointer; padding:1rem; transition:color .2s;}
.lb-nav:hover{color:var(--red);}
.lb-nav.prev{left:.4rem;} .lb-nav.next{right:.4rem;}
@media (max-width:560px){ .lb-nav{font-size:2rem; padding:.4rem;} }
`;
