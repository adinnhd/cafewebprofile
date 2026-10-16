const rupiah = new Intl.NumberFormat('id-ID', {
  style: 'currency', currency: 'IDR', maximumFractionDigits: 0,
});

export function formatPrice(price: number | null): string {
  return price === null ? 'Konfirmasi harga' : rupiah.format(price);
}

export function normalizeSearch(value: string): string {
  return value.normalize('NFKD').replace(/\p{Diacritic}/gu, '').toLocaleLowerCase('id-ID').trim().replace(/\s+/g, ' ');
}
