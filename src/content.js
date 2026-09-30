// ────────────────────────────────────────────────────────────────────────────
//  kitlinq — site content
//  This is the ONLY file you need to edit to update the site.
//  Add / remove / reorder photos, change text, swap links. Save, commit, done.
//
//  A photo is just an object: { src: "...", caption: "...", film: true }
//    • src     — the image link. Two options:
//                 1) paste a link to an image already online (e.g. from your
//                    WordPress: open the image, "Copy link")
//                 2) put the file in  public/images/  and write  "/images/name.jpg"
//    • caption — the little label under the photo (a name, a place, anything)
//    • film    — optional. add  film: true  to tag a shot as 35mm.
//  Reorder photos by dragging lines up/down. Delete a line to remove a photo.
// ────────────────────────────────────────────────────────────────────────────

export const profile = {
  name: "kit ling yeoh-leong ou!",
  handle: "kitlinq",
  tagline: "artist, photographer & videographer — london",
  intro:
    "kit ling yeoh-leong is a southeast asian artist & photo/videographer presently based in london. i also write, shoot, and edit content for brands — always keen to connect with + work with other creatives.",
  email: "kitlingleong@gmail.com",
  socials: {
    instagram: "https://www.instagram.com/kitlinq/",
    tiktok: "https://www.tiktok.com/@kitlinq",
    crochet: "https://www.instagram.com/klinqi/",
  },
  // the big image at the top of the page
  hero: {
    src: "https://i0.wp.com/kitlinq.wordpress.com/wp-content/uploads/2025/07/25360027-3.jpg",
    caption: "@liltjay",
    film: true,
  },
};

// A press / feature highlight shown as a band on the page. Set to null to hide.
export const feature = {
  outlet: "kaltblut magazine",
  title: "contact — a queer exploration of intimacy & ambiguity",
  kind: "exclusive feature",
  href: "https://www.kaltblut-magazine.com/contact-a-queer-exploration-of-intimacy-ambiguity/",
  image:
    "https://i0.wp.com/kitlinq.wordpress.com/wp-content/uploads/2026/04/screenshot-2026-04-06-at-13.49.06.png",
};

// Photo galleries. Each "roll" becomes a titled section on the page.
// Add a whole new roll by copying one block and changing id/label/note/photos.
export const rolls = [
  {
    id: "artists",
    label: "artists & events",
    note: "live · 35mm + digital",
    photos: [
      { src: "https://i0.wp.com/kitlinq.wordpress.com/wp-content/uploads/2025/07/25360027-3.jpg", caption: "@liltjay", film: true },
      { src: "https://i0.wp.com/kitlinq.wordpress.com/wp-content/uploads/2025/07/dsc0037.jpg", caption: "@skepta" },
      { src: "https://i0.wp.com/kitlinq.wordpress.com/wp-content/uploads/2025/07/dsc1124.jpg", caption: "@heisrema" },
      { src: "https://i0.wp.com/kitlinq.wordpress.com/wp-content/uploads/2025/07/dsc2588.jpg", caption: "@offsetyrn" },
      { src: "https://i0.wp.com/kitlinq.wordpress.com/wp-content/uploads/2025/07/img_0003-2.jpg", caption: "@chanfyx", film: true },
      { src: "https://i0.wp.com/kitlinq.wordpress.com/wp-content/uploads/2025/07/dsc1260-1.jpg", caption: "backstage" },
      { src: "https://i0.wp.com/kitlinq.wordpress.com/wp-content/uploads/2025/07/dsc1230.jpg", caption: "@heisrema" },
      { src: "https://i0.wp.com/kitlinq.wordpress.com/wp-content/uploads/2025/07/25360017-1.jpg", caption: "@youngsteflon", film: true },
    ],
  },
  {
    id: "film",
    label: "35mm landscapes",
    note: "analog · everywhere",
    photos: [
      { src: "https://i0.wp.com/kitlinq.wordpress.com/wp-content/uploads/2025/07/001270700037.jpg", caption: "los angeles", film: true },
      { src: "https://i0.wp.com/kitlinq.wordpress.com/wp-content/uploads/2025/07/47380011.jpg", caption: "singapore", film: true },
      { src: "https://i0.wp.com/kitlinq.wordpress.com/wp-content/uploads/2025/07/47380024.jpg", caption: "lido di camaiore", film: true },
      { src: "https://i0.wp.com/kitlinq.wordpress.com/wp-content/uploads/2025/07/001270700008.jpg", caption: "singapore", film: true },
      { src: "https://i0.wp.com/kitlinq.wordpress.com/wp-content/uploads/2025/07/47380009.jpg", caption: "singapore", film: true },
      { src: "https://i0.wp.com/kitlinq.wordpress.com/wp-content/uploads/2025/07/33580011.jpg", caption: "perth", film: true },
      { src: "https://i0.wp.com/kitlinq.wordpress.com/wp-content/uploads/2025/07/img_0001.jpg", caption: "singapore", film: true },
      { src: "https://i0.wp.com/kitlinq.wordpress.com/wp-content/uploads/2025/07/47380010.jpg", caption: "singapore", film: true },
      { src: "https://i0.wp.com/kitlinq.wordpress.com/wp-content/uploads/2025/07/img_0012.jpg", caption: "singapore", film: true },
      { src: "https://i0.wp.com/kitlinq.wordpress.com/wp-content/uploads/2025/07/img065.jpg", caption: "singapore", film: true },
      { src: "https://i0.wp.com/kitlinq.wordpress.com/wp-content/uploads/2025/07/001270700036.jpg", caption: "los angeles", film: true },
      { src: "https://i0.wp.com/kitlinq.wordpress.com/wp-content/uploads/2025/07/img_0005.jpg", caption: "singapore", film: true },
      { src: "https://i0.wp.com/kitlinq.wordpress.com/wp-content/uploads/2025/07/img_0031.jpg", caption: "singapore", film: true },
      { src: "https://i0.wp.com/kitlinq.wordpress.com/wp-content/uploads/2025/07/f1060019.jpg", caption: "singapore", film: true },
      { src: "https://i0.wp.com/kitlinq.wordpress.com/wp-content/uploads/2025/07/000048040021.jpg", caption: "singapore", film: true },
      { src: "https://i0.wp.com/kitlinq.wordpress.com/wp-content/uploads/2025/07/47380015.jpg", caption: "singapore", film: true },
      { src: "https://i0.wp.com/kitlinq.wordpress.com/wp-content/uploads/2025/07/25360020.jpg", caption: "taipei", film: true },
    ],
  },
  {
    id: "studio",
    label: "studio",
    note: "client · nicoleshai @ sculptstudios",
    photos: [
      { src: "https://i0.wp.com/kitlinq.wordpress.com/wp-content/uploads/2025/08/dsc8513.jpg", caption: "@nicoleshai" },
      { src: "https://i0.wp.com/kitlinq.wordpress.com/wp-content/uploads/2025/08/dsc8539.jpg", caption: "sculptstudios" },
      { src: "https://i0.wp.com/kitlinq.wordpress.com/wp-content/uploads/2025/08/dsc8680.jpg", caption: "sculptstudios" },
      { src: "https://i0.wp.com/kitlinq.wordpress.com/wp-content/uploads/2025/08/dsc8689.jpg", caption: "sculptstudios" },
      { src: "https://i0.wp.com/kitlinq.wordpress.com/wp-content/uploads/2025/08/dsc8859.jpg", caption: "sculptstudios" },
      { src: "https://i0.wp.com/kitlinq.wordpress.com/wp-content/uploads/2025/08/dsc8932.jpg", caption: "@nicoleshai" },
    ],
  },
  // {
  //   id: "crochet",
  //   label: "crochet",
  //   note: "wearable sculpture · @klinqi",
  //   // ── These are PLACEHOLDERS. To add a real crochet photo:
  //   //    Instagram links can't be used directly as `src` (they expire), so
  //   //    download the image from @klinqi, drop the file into  public/images/ ,
  //   //    then set  src: "/images/klinqi-01.jpg"  (any filename works).
  //   //    A tile with an empty  src: ""  shows the "add photo" placeholder.
  //   photos: [
  //     { src: "", caption: "wearable sculpture" },
  //     { src: "", caption: "crochet top" },
  //     { src: "", caption: "@klinqi" },
  //     { src: "", caption: "commission" },
  //     { src: "", caption: "detail" },
  //     { src: "", caption: "@klinqi" },
  //   ],
  // },
];

// Motion / social work. These link out to the reels & tiktoks.
export const motion = {
  label: "motion & social",
  note: "shot + edited by me",
  items: [
    { title: "tyler the creator — chromakopia tour outfits, o2", client: "@kitlinq", platform: "tiktok", href: "https://www.tiktok.com/@kitlinq/video/7507671101397273863" },
    { title: "shade match", client: "@beautyclassuk", platform: "tiktok", href: "https://www.tiktok.com/@beautyclassuk/video/7520675531289791766" },
    { title: "summer glam", client: "@beautyclassuk", platform: "tiktok", href: "https://www.tiktok.com/@beautyclassuk/video/7503581672940621078" },
    { title: "self-care, softness & connection", client: "@beautyclassuk", platform: "tiktok", href: "https://www.tiktok.com/@beautyclassuk/video/7516242398935043350" },
    { title: "singapore art week — street style", client: "@kitlinq", platform: "tiktok", href: "https://www.tiktok.com/@kitlinq/video/7056443728939977986" },
    { title: "campaign reel", client: "@beautyclassuk", platform: "instagram", href: "https://www.instagram.com/reel/DNqFQVqsyad/" },
    { title: "campaign reel", client: "@beautyclassuk", platform: "instagram", href: "https://www.instagram.com/reel/DMm9tzpMt_W/" },
    { title: "campaign reel", client: "@manfitteruk", platform: "instagram", href: "https://www.instagram.com/reel/C6zDMd-o-iT/" },
    { title: "campaign reel", client: "@missfitteruk", platform: "instagram", href: "https://www.instagram.com/reel/C-LJ5aOIRc0/" },
    { title: "campaign reel", client: "@beautyclassuk", platform: "instagram", href: "https://www.instagram.com/reel/DM0XGxuNnjU/" },
  ],
};

// The "info" section.
export const about = {
  practice: [
    "photography — analog & digital",
    "videography + editing — short & long form",
    "crochet — clothes & wearable sculptures (@klinqi)",
    "illustration",
    "social media production + management",
  ],
  education: [
    "msc environmental economics — lse",
    "ba (hons) — yale-nus college",
  ],
  clients: [
    "@andasproductions — video editor (longform, youtube)",
    "@beautyclassuk — social media manager + content producer",
    "@culturezoomag — photographer",
    "@londonschoolofeconomics — content producer",
    "@manfitteruk + @missfitteruk — content producer",
    "@nationalgallerysingapore — commission + feature (kolektif.sg)",
    "@obscurafestival — group exhibition (masterclass, ian teh)",
    "@objectifscentre — group exhibition (shooting home youth awards)",
    "@stolenpublications — print feature",
    "@tico.tequila — photographer",
    "@yalenuscollege — photography tutor",
  ],
};
