# Audit konten — demo independen

Tanggal pengerjaan: 16 Oktober 2026 (WIB). Ini catatan sumber, bukan pernyataan bahwa seluruh informasi masih berlaku pada tanggal tersebut.

## Informasi bisnis dari brief publik

| Informasi | Sumber yang disediakan | Status |
| --- | --- | --- |
| Tiga Segi Coffee, coffee shop lokal Cirebon | [Instagram](https://www.instagram.com/tigasegi.coffee/), brief pengguna | Perlu konfirmasi pemilik sebelum resmi |
| Jl. Pramuka No.31, Sutawinangun, Kedawung, Kabupaten Cirebon, Jawa Barat 45153 | [Google Maps yang disediakan](https://maps.app.goo.gl/8aRsJAiMYFBuJ41J8) | Disalin dari brief; posisi/alamat belum diverifikasi ulang dengan pemilik |
| +62 818-0469-0096 | Brief pengguna / kontak publik hasil riset pengguna | Kepemilikan nomor dan izin publikasi perlu dikonfirmasi |
| Senin 09.00–23.00 WIB; Selasa–Minggu 14.00–23.00 WIB | Gambar jadwal terbaru yang disediakan pengguna dalam percakapan | Menggantikan informasi jam operasional dalam brief awal; dipakai bersama pada homepage dan halaman menu |
| Jam tutup 23.00 vs 00.00 dalam brief awal | Sumber awal saling berbeda | Informasi lama digantikan jadwal terbaru dari pengguna, dengan jam tutup 23.00 WIB |
| Rating sekitar 4,7/5 | Brief pengguna | **Tidak digunakan** karena berubah dan belum diverifikasi ulang |

Tidak ada klaim fasilitas Wi-Fi, daya listrik, jam buka setiap hari, sertifikasi, tanggal pendirian, pemilik, asal biji kopi, penghargaan, atau data penjualan.

## Menu historis

Sumber utama harga: dua gambar yang dilampirkan pengguna; salah satu tangkapan layar menunjukkan story tanggal 22 Februari 2024. Tanggal story tidak membuktikan kedua daftar berasal dari tanggal yang sama atau masih berlaku.

Referensi pihak ketiga dalam brief:

- https://menu02.restaurantguru.com/m2/Tiga-Segi-Coffee-Restaurant-menu.jpg
- https://menu02.restaurantguru.com/m2/menu-Tiga-Segi-Coffee.jpg

Foto menu tersebut **tidak diterbitkan ulang** sebagai aset website. Nama dan harga ditranskripsikan sebagai referensi historis, disimpan dalam `src/data/menu.ts` dan diberi `verificationStatus: 'unverified'`. Tidak ada harga fiktif yang dinyatakan resmi. `available: null` pada semua item menyatakan bahwa ketersediaan belum diketahui.

Daftar historis screenshot dan daftar seed dalam brief tidak seluruhnya sama. Item berikut hanya memiliki referensi nama dalam brief, sehingga harganya `null` dan UI menampilkan “Konfirmasi harga”: Kopsus Pandan, Long Black, White Hazelnut, Taro Latte, Green Tea Latte, Macaroni Cheese, dan Rujak Cireng.

Penyesuaian penamaan untuk keterbacaan: `Cappucino` menjadi `Cappuccino`; `Caffe Latte` menjadi `Coffee Latte`; `Chocolate` dan `Red Velvet` ditampilkan sebagai `Chocolate Latte` dan `Red Velvet Latte` mengikuti seed brief. Deskripsi kedua item terakhir menyebut nama aslinya dalam screenshot. `Mie Nyemek TigaSegi` dipetakan ke `Mie Goreng Nyemek` sesuai brief. Green Tea Latte tidak disamakan otomatis dengan Matcha. Varian teh dipisahkan dari entri “Flavor” pada gambar. Porsi dimsum 4 pcs dan kebab 3 pcs berasal dari screenshot, tetap perlu konfirmasi.

Penanda global tersedia di hero `/menu`, di bawah highlight homepage, pada setiap harga, dan catatan penutup menu. Komposisi, topping, opsi panas/dingin, ukuran sajian, pajak, alergen, serta paket gratis minum tidak diasumsikan atau dijanjikan. “Signature Coffee” adalah kategori editorial yang perlu disetujui pemilik, bukan bukti produk unggulan penjualan.

## Copywriting dan desain konsep

Seluruh headline, narasi, “Coffee & Conversation”, “Ngopi santai, cerita panjang”, teks berbahasa Inggris, serta deskripsi suasana merupakan copy editorial Studio Beranjak, bukan tagline resmi, testimoni, atau kutipan pemilik.

Bagian cerita secara eksplisit menggunakan “cara kami membayangkan Tiga Segi”. Warna olive/cream/caramel dan motif geometris dekoratif adalah identitas **konsep**. Logo header/footer menggunakan file `public/logo-tigasegi.png` yang kemudian disediakan pengguna; pemasangan ini tidak menyiratkan persetujuan resmi pemilik merek. Tidak menggunakan nama orang, sejarah, maupun klaim bahan yang tidak tersedia.

## Fotografi, font, dan ikon

Semua foto merupakan fotografi editorial lokal yang diperoleh dari Unsplash, bukan foto kafe, pengunjung, ataupun produk asli Tiga Segi. Setiap kartu diberi penanda ilustrasi; gallery mempunyai disclaimer eksplisit. Beberapa foto menunjukkan **kategori** makanan/minuman dan dipakai ulang untuk beberapa item; ini bukan representasi resep, ukuran, atau bahan. Sebelum peluncuran resmi, ganti semuanya dengan foto asli berizin.

Lihat [ASSET_CREDITS.md](./ASSET_CREDITS.md) untuk URL sumber tiap file, lisensi foto, font, dan ikon. Unsplash+ tidak digunakan. Tidak menyalin foto dari Instagram, Google Maps, atau Restaurant Guru.

## Sebelum menjadi website resmi

- Dapatkan persetujuan pemilik untuk identitas, copy, domain, dan penggunaan nama bisnis.
- Konfirmasi izin penggunaan logo yang disediakan pengguna dan dapatkan brand guideline resmi; pastikan motif dekoratif konsep tidak dianggap logo resmi.
- Verifikasi alamat, titik Google Maps, nomor telepon, Instagram, dan jam buka/tutup per hari.
- Verifikasi semua item, harga, kategori, porsi, ketersediaan, bahan/alergen, serta pajak.
- Ganti foto stock dengan foto asli, simpan izin dan kredit yang diperlukan.
- Perbarui status verifikasi data dan semua disclaimer secara konsisten.
- Tentukan domain final, lengkapi URL absolut metadata sosial, dan aktifkan canonical/indexing hanya sesudah persetujuan. Perbarui `public/robots.txt` secara terpisah.
- Jalankan kembali build, audit aksesibilitas, dan Lighthouse pada hosting final, lalu uji pada perangkat nyata dan screen reader.

Demo default memblokir pengindeksan dengan meta `noindex, nofollow` serta `robots.txt`. Tidak ada structured data LocalBusiness atau klaim copyright atas nama kafe. Tidak ada pesanan, checkout, QRIS, pembayaran, autentikasi, maupun backend.
