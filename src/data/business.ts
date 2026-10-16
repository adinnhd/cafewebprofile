export const business = {
  name: "Tiga Segi Coffee",
  address:
    "Jl. Pramuka No.31, Sutawinangun, Kec. Kedawung, Kabupaten Cirebon, Jawa Barat 45153",
  shortAddress: "Jl. Pramuka No.31, Cirebon",
  instagram: "https://www.instagram.com/tigasegi.coffee/",
  instagramHandle: "@tigasegi.coffee",
  maps: "https://maps.app.goo.gl/8aRsJAiMYFBuJ41J8",
  phone: "+62 818-0469-0096",
  phoneHref: "tel:+6281804690096",
  openingHours: [
    { days: "Senin", opens: "09.00", closes: "23.00" },
    { days: "Selasa–Minggu", opens: "14.00", closes: "23.00" },
  ],
} as const;

// Enable only after approval and after setting the final, verified domain.
export const siteConfig = {
  isOfficial: false,
  allowIndexing: false,
  canonicalOrigin: null as string | null,
  conceptCredit: "Sebuah Konsep Website oleh · Studio Beranjak",
};
