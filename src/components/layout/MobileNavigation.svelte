<script lang="ts">
  import { Menu, X, ArrowUpRight, Camera, MapPin } from '@lucide/svelte';
  import { onMount, tick, untrack } from 'svelte';
  import { observeNavigation, type NavigationTarget } from '../../lib/navigation';
  let { currentPath, maps, instagram }: { currentPath: string; maps: string; instagram: string } = $props();
  let dialog: HTMLDialogElement;
  let trigger: HTMLButtonElement;
  let open = $state(false);
  let activeTarget = $state<NavigationTarget | null>(untrack(() => currentPath === '/' ? 'home' : currentPath === '/menu' ? 'menu' : null));

  onMount(() => observeNavigation((target) => { activeTarget = target; }));

  async function show() {
    open = true;
    await tick();
    dialog.showModal();
  }
  function close() { dialog.close(); }
  function afterClose() { open = false; trigger.focus({ preventScroll: true }); }
</script>

<button class="mobile-menu-trigger icon-button" aria-label="Buka navigasi" aria-expanded={open} aria-controls="mobile-navigation" onclick={show} bind:this={trigger}>
  <Menu size={23} strokeWidth={1.5} aria-hidden="true" />
</button>
<dialog id="mobile-navigation" class="mobile-dialog" aria-label="Menu navigasi Tiga Segi" bind:this={dialog} onclose={afterClose}>
  <div class="mobile-dialog-top">
    <span class="eyebrow">TIGA SEGI COFFEE</span>
    <button class="icon-button" aria-label="Tutup navigasi" onclick={close}><X size={25} strokeWidth={1.5} aria-hidden="true" /></button>
  </div>
  <nav aria-label="Navigasi seluler">
    <a href="/" aria-current={activeTarget === 'home' ? 'page' : undefined} onclick={close}><span>01</span>Beranda<ArrowUpRight size={24} aria-hidden="true" /></a>
    <a href="/menu" aria-current={activeTarget === 'menu' ? 'page' : undefined} onclick={close}><span>02</span>Menu<ArrowUpRight size={24} aria-hidden="true" /></a>
    <a href="/#tentang" aria-current={activeTarget === 'tentang' ? 'location' : undefined} onclick={close}><span>03</span>Tentang<ArrowUpRight size={24} aria-hidden="true" /></a>
    <a href="/#lokasi" aria-current={activeTarget === 'lokasi' ? 'location' : undefined} onclick={close}><span>04</span>Lokasi<ArrowUpRight size={24} aria-hidden="true" /></a>
  </nav>
  <div class="mobile-dialog-bottom">
    <p>Secangkir kopi.<br />Sedikit waktu untuk diri sendiri.</p>
    <a href={maps} target="_blank" rel="noopener noreferrer"><MapPin size={18} aria-hidden="true" /> Temukan kami <ArrowUpRight size={16} aria-hidden="true" /></a>
    <a href={instagram} target="_blank" rel="noopener noreferrer"><Camera size={18} aria-hidden="true" /> @tigasegi.coffee <ArrowUpRight size={16} aria-hidden="true" /></a>
    <small>Konsep independen · Studio Beranjak</small>
  </div>
</dialog>
