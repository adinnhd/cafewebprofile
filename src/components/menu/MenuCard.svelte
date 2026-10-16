<script lang="ts">
  import { ArrowUpRight } from '@lucide/svelte';
  import type { DisplayMenuItem } from '../../lib/menu-images';
  import { formatPrice } from '../../lib/format';
  let { item, preview = false }: { item: DisplayMenuItem; preview?: boolean } = $props();
</script>

<article class="menu-card">
  <div class="menu-card-image">
    <img src={item.image} srcset={item.imageSrcSet} sizes="(max-width: 479px) 90vw, (max-width: 767px) 45vw, (max-width: 1199px) 30vw, 24vw" alt={item.imageAlt} width="720" height="576" loading="lazy" decoding="async" />
    <span class="image-disclaimer">Foto ilustrasi</span>
    {#if preview}<a class="card-image-link" href={`/menu?item=${item.id}`} aria-label={`Lihat ${item.name} di menu`}><ArrowUpRight size={21} strokeWidth={1.5} aria-hidden="true" /></a>{/if}
  </div>
  <div class="menu-card-body">
    <p class="card-category">{item.categoryLabel}</p>
    <div class="card-title-row"><h3>{#if preview}<a href={`/menu?item=${item.id}`}>{item.name}</a>{:else}{item.name}{/if}</h3></div>
    <p class="card-description">{item.description}</p>
    <div class="card-price-row"><span class:price-unknown={item.price === null}>{formatPrice(item.price)}</span><span class="price-note">{item.price === null ? 'Belum tersedia' : 'Harga referensi*'}</span></div>
  </div>
</article>
