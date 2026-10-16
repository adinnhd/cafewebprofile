import type { ImageMetadata } from 'astro';
import icedCoffee from '../assets/photos/iced-coffee.jpg';
import latte from '../assets/photos/latte.jpg';
import tea from '../assets/photos/tea.jpg';
import fries from '../assets/photos/fries.jpg';
import dimsum from '../assets/photos/dimsum.jpg';
import coffeeRitual from '../assets/photos/coffee-ritual.jpg';
import blackCoffee from '../assets/photos/black-coffee.jpg';
import milkshake from '../assets/photos/milkshake.jpg';
import matcha from '../assets/photos/matcha.jpg';
import chickenRice from '../assets/photos/chicken-rice.jpg';
import pasta from '../assets/photos/pasta.jpg';
import noodles from '../assets/photos/noodles.jpg';
import toast from '../assets/photos/toast.jpg';
import water from '../assets/photos/water.jpg';

export const categories = [
  { id: 'all', label: 'Semua' },
  { id: 'signature', label: 'Signature Coffee' },
  { id: 'coffee', label: 'Coffee' },
  { id: 'manual-brew', label: 'Manual Brew' },
  { id: 'non-coffee', label: 'Non-Coffee' },
  { id: 'refreshment', label: 'Refreshment' },
  { id: 'food', label: 'Food & Snacks' },
] as const;

export type CategoryId = (typeof categories)[number]['id'];
export type MenuCategory = Exclude<CategoryId, 'all'>;
export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  description: string;
  price: number | null;
  image: ImageMetadata;
  imageAlt: string;
  available: boolean | null;
  featured: boolean;
  verificationStatus: 'unverified';
  source: 'user-menu-photo' | 'brief-public-reference';
}

const photoByCategory: Record<MenuCategory, ImageMetadata> = {
  signature: icedCoffee, coffee: latte, 'manual-brew': coffeeRitual,
  'non-coffee': milkshake, refreshment: tea, food: fries,
};
const altByCategory: Record<MenuCategory, string> = {
  signature: 'Foto ilustrasi kopi susu dingin dalam gelas, bukan produk asli kafe',
  coffee: 'Foto ilustrasi secangkir kopi, bukan produk asli kafe',
  'manual-brew': 'Foto ilustrasi penyajian kopi manual, bukan produk asli kafe',
  'non-coffee': 'Foto ilustrasi kategori minuman susu berupa milkshake cokelat, bukan foto produk yang disebutkan',
  refreshment: 'Foto ilustrasi teh sebagai referensi minuman, bukan produk asli kafe',
  food: 'Foto ilustrasi kategori camilan berupa kentang goreng, bukan foto produk yang disebutkan',
};

function item(id: string, name: string, category: MenuCategory, price: number | null, description: string, featured = false, image?: ImageMetadata, imageAlt?: string): MenuItem {
  return {
    id, name, category, price, description, featured,
    image: image ?? photoByCategory[category],
    imageAlt: imageAlt ?? altByCategory[category],
    available: null,
    verificationStatus: 'unverified',
    source: price === null ? 'brief-public-reference' : 'user-menu-photo',
  };
}

// Historical reference, not a current price list. Null = no reliable price supplied.
// Availability is unknown, never inferred from presence in the seed dataset.
export const menu: MenuItem[] = [
  item('kopsus-tigasegi', 'Kopsus TigaSegi', 'signature', 22000, 'Kopi susu untuk menemani cerita yang belum selesai.', true),
  item('americano', 'Americano', 'coffee', 18000, 'Pilihan kopi hitam untuk jeda sederhana.', true, blackCoffee, 'Foto ilustrasi kopi hitam di atas meja kayu, bukan produk asli kafe'),
  item('v60', 'V60', 'manual-brew', 22000, 'Nikmati waktu lebih pelan lewat seduhan manual.', true),
  item('french-fries', 'French Fries', 'food', 15000, 'Camilan kentang untuk teman ngobrol di meja.', true),
  item('kopsus-tigasatu', 'Kopsus TigaSatu', 'signature', 20000, 'Satu lagi pilihan kopi susu dari referensi menu.'),
  item('kopsus-regal', 'Kopsus Regal', 'signature', 25000, 'Varian kopi susu dalam daftar menu historis.'),
  item('cappuccino', 'Cappuccino', 'coffee', 20000, 'Secangkir klasik untuk sore yang santai.'),
  item('single-espresso', 'Single Espresso', 'coffee', 10000, 'Pilihan espresso dalam satu sajian.'),
  item('double-espresso', 'Double Espresso', 'coffee', 12000, 'Pilihan espresso dalam sajian ganda.'),
  item('coffee-latte', 'Coffee Latte', 'coffee', 20000, 'Pilihan klasik dari daftar kopi Tiga Segi.'),
  item('japanese', 'Japanese', 'manual-brew', 24000, 'Pilihan seduhan manual dari menu historis.'),
  item('vietnam-drip', 'Vietnam Drip', 'manual-brew', 20000, 'Seduhan drip untuk dinikmati tanpa tergesa.'),
  item('tubruk', 'Tubruk', 'manual-brew', 18000, 'Cara sederhana menikmati waktu bersama kopi.'),
  item('cookies-cream', 'Cookies & Cream', 'non-coffee', 23000, 'Pilihan non-kopi dalam daftar menu historis.'),
  item('chocolate-hazelnut', 'Chocolate Hazelnut', 'non-coffee', 23000, 'Varian cokelat dalam referensi menu.'),
  item('chocolate-caramel', 'Chocolate Caramel', 'non-coffee', 23000, 'Pilihan lain untuk penikmat minuman cokelat.'),
  item('chocolate-latte', 'Chocolate Latte', 'non-coffee', 20000, 'Tertulis “Chocolate” pada foto menu historis.'),
  item('lychee-yakult', 'Lychee Yakult', 'non-coffee', 22000, 'Pilihan minuman non-kopi dari referensi menu.'),
  item('red-velvet-latte', 'Red Velvet Latte', 'non-coffee', 20000, 'Tertulis “Red Velvet” pada foto menu historis.'),
  item('susu-regal', 'Susu Regal', 'non-coffee', 22000, 'Pilihan susu dalam daftar menu historis.'),
  item('green-tea-latte', 'Green Tea Latte', 'non-coffee', null, 'Nama dari referensi brief; varian perlu dikonfirmasi.', false, matcha, 'Foto ilustrasi latte teh hijau dalam cangkir, bukan produk asli kafe'),
  item('matcha', 'Matcha', 'non-coffee', 20000, 'Pilihan matcha dari foto menu historis.', false, matcha, 'Foto ilustrasi latte teh hijau dalam cangkir, bukan produk asli kafe'),
  item('milo', 'Milo', 'non-coffee', 20000, 'Pilihan minuman dalam daftar menu historis.'),
  item('lychee-tea', 'Lychee Tea', 'refreshment', 20000, 'Salah satu varian teh pada referensi menu.'),
  item('lemon-tea', 'Lemon Tea', 'refreshment', 20000, 'Pilihan varian teh dari foto menu historis.'),
  item('mango-tea', 'Mango Tea', 'refreshment', 20000, 'Pilihan varian teh dari foto menu historis.'),
  item('strawberry-tea', 'Strawberry Tea', 'refreshment', 20000, 'Pilihan varian teh dari foto menu historis.'),
  item('iced-tea', 'Iced Tea', 'refreshment', 7000, 'Pilihan es teh dalam menu historis.'),
  item('mineral-water', 'Mineral Water', 'refreshment', 5000, 'Air mineral dari daftar menu historis.', false, water, 'Foto ilustrasi air minum dalam gelas, bukan produk asli kafe'),
  item('mojito-flavor', 'Mojito Flavor', 'refreshment', 20000, 'Referensi varian: lime, lychee, strawberry, mango.'),
  item('ocean-blue', 'Ocean Blue', 'refreshment', 20000, 'Pilihan mocktail dari referensi menu.'),
  item('mango-berry', 'Mango Berry', 'refreshment', 20000, 'Pilihan mocktail dari referensi menu.'),
  item('nasi-ayam-kalasan', 'Nasi Ayam Kalasan', 'food', 20000, 'Pilihan makan dari daftar main course historis.', false, chickenRice, 'Foto ilustrasi kategori nasi ayam, bukan Nasi Ayam Kalasan asli kafe'),
  item('nasi-ayam-rica', 'Nasi Ayam Rica Rica', 'food', 22000, 'Pilihan makan dari daftar main course historis.', false, chickenRice, 'Foto ilustrasi kategori nasi ayam, bukan Nasi Ayam Rica Rica asli kafe'),
  item('nasi-ayam-teriyaki', 'Nasi Ayam Teriyaki', 'food', 25000, 'Pilihan makan dari daftar main course historis.', false, chickenRice, 'Foto ilustrasi kategori nasi ayam, bukan Nasi Ayam Teriyaki asli kafe'),
  item('nasi-ayam-black-pepper', 'Nasi Ayam Black Pepper', 'food', 25000, 'Pilihan makan dari daftar main course historis.', false, chickenRice, 'Foto ilustrasi kategori nasi ayam, bukan Nasi Ayam Black Pepper asli kafe'),
  item('nasi-ayam-bbq', 'Nasi Ayam BBQ', 'food', 25000, 'Pilihan makan dari daftar main course historis.', false, chickenRice, 'Foto ilustrasi kategori nasi ayam, bukan Nasi Ayam BBQ asli kafe'),
  item('spaghetti-bolognese', 'Spaghetti Bolognese', 'food', 25000, 'Pilihan pasta dalam referensi menu historis.', false, pasta, 'Foto ilustrasi sepiring spaghetti, bukan produk asli kafe'),
  item('mie-nyemek', 'Mie Goreng Nyemek', 'food', 17000, 'Tertulis “Mie Nyemek TigaSegi” pada foto menu.', false, noodles, 'Foto ilustrasi kategori mi berupa mi dalam mangkuk, bukan Mie Nyemek asli kafe'),
  item('baso-aci', 'Baso Aci', 'food', 20000, 'Camilan dari referensi menu historis.'),
  item('mixed-platter', 'Mixed Platter', 'food', 25000, 'Pilihan camilan untuk dinikmati bersama.'),
  item('kebab-mini', 'Kebab Mini (3 pcs)', 'food', 15000, 'Porsi historis tiga buah; konfirmasi saat berkunjung.'),
  item('dimsum', 'Dimsum (4 pcs)', 'food', 20000, 'Camilan untuk menemani waktu bersama.', false, dimsum, 'Foto ilustrasi dimsum, bukan produk asli kafe'),
  item('roti-bakar-coklat', 'Roti Bakar Coklat', 'food', 15000, 'Pilihan roti bakar dari foto menu historis.', false, toast, 'Foto ilustrasi kategori roti bakar, bukan Roti Bakar Coklat asli kafe'),
  item('roti-bakar-keju', 'Roti Bakar Keju', 'food', 18000, 'Pilihan roti bakar dari foto menu historis.', false, toast, 'Foto ilustrasi kategori roti bakar, bukan Roti Bakar Keju asli kafe'),
  item('kopsus-pandan', 'Kopsus Pandan', 'signature', null, 'Varian dari referensi brief; cek ketersediaan di kafe.'),
  item('long-black', 'Long Black', 'coffee', null, 'Pilihan kopi hitam dari referensi brief.'),
  item('white-hazelnut', 'White Hazelnut', 'coffee', null, 'Pilihan dari referensi brief; detail perlu dikonfirmasi.'),
  item('taro-latte', 'Taro Latte', 'non-coffee', null, 'Pilihan non-kopi dari referensi brief.'),
  item('macaroni-cheese', 'Macaroni Cheese', 'food', null, 'Pilihan makanan dari referensi brief.', false, pasta, 'Foto ilustrasi kategori pasta, bukan Macaroni Cheese asli kafe'),
  item('rujak-cireng', 'Rujak Cireng', 'food', null, 'Pilihan camilan dari referensi brief.'),
];

export const menuDisclaimer = 'Menu dan harga mengacu pada referensi historis dan belum diverifikasi. Ketersediaan, komposisi, serta harga terbaru perlu dikonfirmasi langsung ke kafe.';

export function categoryLabel(category: CategoryId): string {
  return categories.find((entry) => entry.id === category)?.label ?? category;
}

export function groupByCategory(items: readonly MenuItem[]) {
  return categories.filter((category) => category.id !== 'all').map((category) => ({
    ...category, items: items.filter((entry) => entry.category === category.id),
  }));
}
