# Tiga Segi Coffee — independent website concept

Demo profil kafe dan digital menu oleh Studio Beranjak. **Bukan website resmi dan belum menyiratkan kerja sama dengan Tiga Segi Coffee.** Website tidak menyediakan pemesanan, pembayaran, akun, atau backend.

## Menjalankan

Gunakan Node.js **22.22 atau lebih baru** (proyek dikembangkan dengan Node 24) dan npm.

```sh
npm ci
npm run dev
```

Buka alamat lokal yang dicetak Astro, biasanya `http://localhost:4321`. Halaman tersedia di `/`, `/menu`, dan halaman fallback `404.html`.

```sh
npm run check
npm run build
npm run preview
```

Build menghasilkan website statis di `dist/`. Tidak memerlukan environment variable, database, API key, ataupun layanan berbayar. Aset foto dan font dilayani dari build lokal, bukan hotlink.

## Stack dan arsitektur

Astro 7, TypeScript strict, Tailwind CSS 4 melalui `@tailwindcss/vite`, Svelte 5, Lucide, dan Sharp/Astro Assets. Versi resolusi yang tepat dicatat dalam `package-lock.json`.

Sebagian besar halaman adalah HTML statis. Hanya navigasi mobile dan penjelajah menu yang dihidrasi sebagai Svelte islands. Kartu menu yang sama dirender statis pada homepage dan digunakan oleh penjelajah interaktif. Tanpa JavaScript, `/menu` tetap menyediakan daftar teks semua item.

```text
src/
  assets/photos/          Foto editorial lokal
  components/
    home/                 Hero, story, highlights, gallery, location
    layout/               Header, navigasi mobile, footer
    menu/                 MenuExplorer.svelte, MenuCard.svelte
    ui/                   Wordmark konsep dan ikon
  data/
    business.ts           Kontak, sumber tautan, pengaturan status demo
    menu.ts               Satu sumber typed untuk 51 item dan kategori
  layouts/BaseLayout.astro
  lib/                    Format Rupiah, normalisasi pencarian, optimasi foto
  pages/                  Homepage, menu, 404
  styles/global.css       Token visual dan styling responsif
tests/                    Pengujian browser dan fixture static server
```

## Mengganti konten

- **Identitas, kontak, dan jam operasional:** ubah `src/data/business.ts`. Jadwal dalam `openingHours` dipakai bersama oleh homepage dan halaman menu: Senin 09.00–23.00 WIB, Selasa–Minggu 14.00–23.00 WIB, mengikuti gambar jadwal terbaru dari pengguna.
- **Logo header/footer:** `public/logo-tigasegi.png`, ditampilkan melalui `src/components/ui/Brand.astro`. Styling `.brand-logo` menyesuaikan padding transparan file ini; sesuaikan crop CSS jika mengganti file dengan dimensi/padding berbeda.
- **Menu:** ubah `src/data/menu.ts`. Harga dalam integer Rupiah; gunakan `null` bila tidak diketahui. `available: null` berarti belum diketahui, bukan tersedia. Seluruh seed saat ini `verificationStatus: 'unverified'`. Setelah verifikasi resmi, perluas tipe status dan perbarui disclaimer beserta presentasi harga secara konsisten.
- **Foto:** ganti file di `src/assets/photos/`, sesuaikan import dan `imageAlt`, lalu perbarui catatan lisensi. Foto ilustrasi kategori sengaja dapat dipakai beberapa item; **tidak menunjukkan komposisi produk**.
- **Pilihan homepage:** gunakan `featured: true` dalam data yang sama. Saat ini empat item, tanpa klaim best seller.
- **Palet dan font:** token utama berada dalam `@theme` serta `:root` di `src/styles/global.css`.
- **Copy editorial:** berada di komponen `src/components/home/` dan `src/pages/menu.astro`.
- **Domain dan SEO:** demo default `noindex, nofollow`, tanpa canonical dan structured data bisnis. Setelah persetujuan pemilik, tetapkan `siteConfig.isOfficial`, `allowIndexing`, dan `canonicalOrigin`, lalu ubah `public/robots.txt`. Domain juga memungkinkan URL absolut untuk gambar Open Graph. Sebelum domain ditetapkan, pratinjau sosial pada platform eksternal tidak dijamin karena URL gambar bersifat relatif.

Pencarian langsung mencocokkan nama dan label kategori, tidak peka huruf besar/kecil, mengabaikan diakritik dan spasi berlebih. Filter dan pencarian bekerja bersamaan. Dua belas hasil ditampilkan terlebih dahulu; tombol berikutnya menambahkan dua belas hasil. Link highlight membuka item yang sesuai melalui `/menu?item=…`.

## Verifikasi browser

```sh
npx playwright install chromium
npm run build
npm run test:e2e
```

Untuk menggunakan executable Chromium yang sudah tersedia, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` ke lokasi executable saat menjalankan tes. Ini opsional dan tidak diperlukan untuk development/build.

Suite menguji HTML produksi pada lebar 360, 390, 768, 1024, dan 1440px; gambar, overflow, error runtime, metadata demo, pencarian/filter/reset, deep link, navigasi mobile dan keyboard, fallback tanpa JavaScript, serta audit otomatis axe WCAG 2.2 AA. Audit otomatis tidak menggantikan pengujian manual dengan teknologi bantu.

Lihat [VALIDATION.md](./VALIDATION.md) untuk hasil eksekusi yang benar-benar dijalankan, termasuk keterbatasannya.

## Static hosting

Upload `dist/` ke static host; build command `npm run build`, output directory `dist`. Tidak perlu adapter SSR. Cloudflare Workers static assets dapat menggunakan konfigurasi minimal `wrangler.jsonc` yang disertakan. Deployment tidak dijalankan dalam pekerjaan lokal ini.

`public/_headers` mengatur cache untuk aset berhash dan header dasar pada hosting yang mendukungnya. Terapkan header setara secara manual jika platform hosting lain tidak membaca file tersebut.

Sebelum publikasi resmi, selesaikan [CONTENT_AUDIT.md](./CONTENT_AUDIT.md). Asal aset dijelaskan di [ASSET_CREDITS.md](./ASSET_CREDITS.md).
