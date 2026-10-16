<script lang="ts">
  import { Search, X, ArrowDown, RotateCcw, Coffee, Info } from '@lucide/svelte';
  import { onMount } from 'svelte';
  import MenuCard from './MenuCard.svelte';
  import type { DisplayMenuItem } from '../../lib/menu-images';
  import type { CategoryId } from '../../data/menu';
  import { normalizeSearch } from '../../lib/format';

  let { items, categories }: {
    items: DisplayMenuItem[];
    categories: readonly { id: CategoryId; label: string }[];
  } = $props();
  let query = $state('');
  let activeCategory = $state<CategoryId>('all');
  let limit = $state(12);
  let searchInput: HTMLInputElement;
  let filtered = $derived.by(() => {
    const words = normalizeSearch(query).split(' ').filter(Boolean);
    return items.filter((item) => {
      const aliases = { signature: 'kopi susu', coffee: 'kopi', 'manual-brew': 'kopi seduh', 'non-coffee': 'minuman susu', refreshment: 'teh segar', food: 'makanan camilan' };
      const text = normalizeSearch(`${item.name} ${item.categoryLabel} ${aliases[item.category]}`);
      return (activeCategory === 'all' || item.category === activeCategory) && words.every((word) => text.includes(word));
    });
  });
  let visible = $derived(filtered.slice(0, limit));
  let currentLabel = $derived(categories.find((category) => category.id === activeCategory)?.label ?? 'Semua');
  let hasFilters = $derived(query.length > 0 || activeCategory !== 'all');

  function reset() { query = ''; activeCategory = 'all'; limit = 12; }
  function chooseCategory(category: CategoryId, event: MouseEvent) {
    activeCategory = category;
    limit = 12;
    (event.currentTarget as HTMLElement).scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }
  onMount(() => {
    const selectedId = new URLSearchParams(window.location.search).get('item');
    const item = items.find((item) => item.id === selectedId);
    if (item) query = item.name;
  });
</script>

<section class="menu-explorer container" aria-label="Jelajahi dan cari menu">
  <div class="menu-toolbar">
    <div><p class="eyebrow">TEMUKAN SELERA KAMU</p><h2>Apa pilihanmu hari ini?</h2></div>
    <div class="search-field"><Search size={20} strokeWidth={1.6} aria-hidden="true" /><label class="sr-only" for="menu-search">Cari nama atau kategori menu</label><input id="menu-search" type="search" placeholder="Cari kopi, camilan, dan lainnya..." bind:value={query} bind:this={searchInput} oninput={() => limit = 12} autocomplete="off" />{#if query}<button class="icon-button" aria-label="Hapus pencarian" onclick={() => { query = ''; limit = 12; searchInput.focus(); }}><X size={18} aria-hidden="true" /></button>{/if}</div>
  </div>
  <div class="category-scroll" role="group" aria-label="Filter kategori menu">
    {#each categories as category}
      <button class="category-chip" class:active={activeCategory === category.id} aria-pressed={activeCategory === category.id} onclick={(event) => chooseCategory(category.id, event)}>{category.label}<span>{category.id === 'all' ? items.length : items.filter((item) => item.category === category.id).length}</span></button>
    {/each}
  </div>
  <div class="results-header"><p aria-live="polite" aria-atomic="true"><strong>{filtered.length} pilihan</strong>{query.trim() ? ` untuk “${query.trim()}”` : activeCategory !== 'all' ? ` di ${currentLabel}` : ' untuk menemani waktumu'}</p>{#if hasFilters}<button class="reset-link" onclick={reset}><RotateCcw size={14} aria-hidden="true" />Reset filter</button>{:else}<span class="results-caption">GOOD THINGS, ONE CUP AT A TIME.</span>{/if}</div>
  {#if filtered.length > 0}
    <div class="menu-grid">{#each visible as item (item.id)}<MenuCard {item} />{/each}</div>
    {#if visible.length < filtered.length}<div class="load-more"><p>Menampilkan {visible.length} dari {filtered.length} pilihan</p><button class="button button-outline" onclick={() => { limit += 12; }}>Tampilkan lebih banyak<ArrowDown size={17} aria-hidden="true" /></button></div>{/if}
  {:else}
    <div class="menu-empty"><div class="empty-icon"><Coffee size={38} strokeWidth={1.2} aria-hidden="true" /></div><p class="eyebrow">BELUM KETEMU, YA?</p><h3>Selera boleh spesial.<br /><em>Coba kata kunci lain.</em></h3><p>Tidak ada menu yang cocok{activeCategory !== 'all' ? ` di kategori ${currentLabel}` : ''}.<br />Coba cari “kopi”, “latte”, atau jelajahi semua pilihan.</p><button class="button button-olive" onclick={reset}>Lihat Semua Menu<RotateCcw size={17} aria-hidden="true" /></button></div>
  {/if}
  <div class="menu-notice"><Info size={21} strokeWidth={1.5} aria-hidden="true" /><div><h3>Sedikit catatan sebelum memilih</h3><p>Ini adalah menu demo berdasarkan referensi historis. Harga bertanda * belum diverifikasi, dan ketersediaan semua item perlu dikonfirmasi ke kafe. Foto bersifat ilustratif, bukan foto produk asli. Informasi komposisi dan alergen dapat ditanyakan langsung kepada staf.</p></div></div>
  <noscript><p class="no-js-message">Pencarian dan filter memerlukan JavaScript. Semua pilihan menu tersedia pada daftar lengkap di bawah.</p></noscript>
</section>
