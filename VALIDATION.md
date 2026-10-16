# Hasil verifikasi

Validasi awal dieksekusi 16 Oktober 2026, sekitar 10.46–10.47 WIB, pada build statis lokal. Check, build, dan suite browser dijalankan ulang setelah perbaikan navigasi sekitar 13.38 WIB. Angka Lighthouse tetap berasal dari sesi awal, bukan pengukuran ulang setelah perubahan. Angka di bawah merupakan pengukuran lingkungan pengembangan ini, bukan jaminan hasil hosting atau perangkat nyata.

## Check dan build

- `npm run check`: **lulus**. Astro: 25 file, 0 error, 0 warning, 0 hint. Svelte: 0 error, 0 warning.
- `npm run build`: **lulus**, menghasilkan homepage, `/menu`, dan fallback 404 dalam `dist/`.
- `npm audit --audit-level=low`: **0 vulnerabilities** pada dependency tree saat pengujian.
- `npm run dev` benar-benar dijalankan dan homepage/menu dibuka di browser lokal. Server pemeriksaan dihentikan setelah QA; jalankan kembali `npm run dev` untuk presentasi.

## Browser dan aksesibilitas

Playwright 1.64.1 dengan Chromium headless: **18 tes lulus**, eksekusi terbaru 8,5 detik. Pengujian memakai HTML produksi melalui `tests/serve.mjs`.

- `/` dan `/menu` pada 360, 390, 768, 1024, dan 1440px: respons 200, tidak ada horizontal overflow, semua gambar yang terlihat berhasil dimuat, satu H1, metadata noindex tersedia, tidak ada canonical sementara, serta tidak ada console error/page error yang terdeteksi.
- Pencarian case-insensitive dan spasi berlebih, kombinasi kategori/pencarian, clear, empty state, reset, harga tidak diketahui, serta penambahan hasil sampai seluruh **51 item**.
- Deep link dari highlight homepage memilih item yang sesuai di `/menu`.
- Dialog mobile: buka/tutup, fokus awal, Escape, pemulihan fokus, tautan Tentang dan Menu.
- Penanda navigasi desktop/mobile mengikuti section aktif. Pengujian mencakup klik Tentang/Lokasi, scroll manual, tombol kembali/maju browser, URL hash langsung, reload, serta tautan section dari halaman menu. Hanya satu tautan aktif per navigasi, menggunakan `aria-current="page"` untuk halaman dan `aria-current="location"` untuk section.
- Axe 4.14: **0 pelanggaran otomatis** untuk WCAG 2 A/AA, 2.1 A/AA, dan 2.2 AA pada kedua halaman, termasuk saat dialog terbuka.
- Tanpa JavaScript: seluruh 51 item tersedia dalam daftar teks; CTA lokasi tetap memiliki tautan yang benar.

Pemeriksaan visual dilakukan pada screenshot produksi desktop dan mobile. `prefers-reduced-motion`, safe-area padding, ukuran gambar, focus-visible, skip link, dan penggunaan HTML semantik tersedia dalam implementasi. Belum diuji langsung dengan screen reader, Safari/iOS, atau perangkat Android fisik; audit otomatis tidak membuktikan kepatuhan aksesibilitas menyeluruh.

## Lighthouse mobile

Lighthouse **13.5.0**, preset mobile default dengan simulated throttling, browser headless, URL HTTP loopback pada server statis lokal. Satu pengukuran akhir per halaman:

| Metrik | Homepage `/` | `/menu` |
| --- | --- | --- |
| Performance | **95** | **90** |
| Accessibility | **100** | **100** |
| Best Practices | **100** | **100** |
| SEO | 66 | 66 |
| First Contentful Paint | 1,5 detik | 2,0 detik |
| Largest Contentful Paint | 2,9 detik | 3,3 detik |
| Total Blocking Time | 0 ms | 0 ms |
| Cumulative Layout Shift | **0** | **0** |

SEO turun karena demo **sengaja diblokir dari pengindeksan** dengan `noindex, nofollow` dan robots.txt, sesuai brief. Tidak menghapus proteksi tersebut untuk menaikkan skor.

Lighthouse masih mengidentifikasi peluang pengurangan JavaScript yang tidak digunakan, penyesuaian ukuran gambar, dan render-blocking stylesheet/font. Cache header dan kompresi CDN tidak diterapkan oleh fixture HTTP lokal. `public/_headers` menyediakan caching immutable untuk aset berhash serta header dasar pada host yang mendukungnya, termasuk [Cloudflare Workers static assets](https://developers.cloudflare.com/workers/static-assets/headers/). Efeknya belum diukur pada hosting final. Tidak ada deployment eksternal yang dilakukan.

Laporan HTML/JSON lengkap tersimpan lokal dalam `reports/lighthouse-home.report.*` dan `reports/lighthouse-menu.report.*` (folder hasil diabaikan Git). Pengukuran akhir dimulai pukul 10.46.56 dan 10.47.07 WIB. Pengukuran sebelumnya bervariasi; angka tabel menggunakan hasil akhir, bukan memilih hasil tertinggi.

## Artefak visual

- [Homepage desktop 1440px](./docs/previews/home-1440.png)
- [Homepage mobile 390px](./docs/previews/home-390.png)
- [Menu desktop 1440px](./docs/previews/menu-1440.png)
- [Menu mobile 390px](./docs/previews/menu-390.png)

Foto dan informasi bisnis masih mengikuti batasan di [CONTENT_AUDIT.md](./CONTENT_AUDIT.md). Tidak menguji perubahan harga/ketersediaan nyata ataupun kepemilikan kontak bisnis; hal itu memerlukan konfirmasi pemilik.
