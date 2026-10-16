export type NavigationTarget = 'home' | 'menu' | 'tentang' | 'lokasi';

// Shared by the static desktop navigation and the mobile Svelte island.
export function observeNavigation(onChange: (target: NavigationTarget | null) => void): () => void {
  let active: NavigationTarget | null | undefined;
  let pending: NavigationTarget | null = null;
  let frame = 0;
  let settleTimer = 0;

  const isHome = () => window.location.pathname === '/';
  const hashTarget = (hash: string): NavigationTarget | null => {
    if (hash === '#tentang' || hash === '#lokasi') return hash.slice(1) as NavigationTarget;
    return hash === '' || hash === '#top' ? 'home' : null;
  };
  const emit = (target: NavigationTarget | null) => {
    if (active !== target) { active = target; onChange(target); }
  };
  const readPosition = (): NavigationTarget | null => {
    if (!isHome()) return window.location.pathname.replace(/\/$/, '') === '/menu' ? 'menu' : null;
    const anchorOffset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    const headerHeight = document.querySelector('#site-header')?.getBoundingClientRect().height ?? 0;
    const activationLine = Math.max(headerHeight, anchorOffset) + 16;
    // The final section may not reach the header on a tall viewport.
    const atBottom = window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
    for (const id of ['lokasi', 'tentang'] as const) {
      const section = document.getElementById(id);
      if (section && ((id === 'lokasi' && atBottom) || section.getBoundingClientRect().top <= activationLine)) return id;
    }
    return 'home';
  };
  const queueUpdate = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => { frame = 0; emit(pending ?? readPosition()); });
  };
  const settle = () => {
    window.clearTimeout(settleTimer);
    settleTimer = window.setTimeout(() => { pending = null; queueUpdate(); }, 180);
  };
  const select = (target: NavigationTarget) => {
    // Keep the clicked marker stable while smooth scrolling crosses other sections.
    pending = target;
    emit(target);
    settle();
  };
  const onScroll = () => { queueUpdate(); if (pending) settle(); };
  const onHashChange = () => {
    const target = isHome() ? hashTarget(window.location.hash) : null;
    if (target) select(target); else queueUpdate();
  };
  const onClick = (event: MouseEvent) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null;
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    const url = new URL(link.href);
    if (!isHome() || url.origin !== window.location.origin || url.pathname !== '/') return;
    const target = hashTarget(url.hash);
    if (target) select(target);
  };

  emit(readPosition());
  onHashChange();
  document.addEventListener('click', onClick);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('hashchange', onHashChange);
  window.addEventListener('pageshow', queueUpdate);
  window.addEventListener('resize', queueUpdate);
  window.addEventListener('load', queueUpdate);

  return () => {
    document.removeEventListener('click', onClick);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('hashchange', onHashChange);
    window.removeEventListener('pageshow', queueUpdate);
    window.removeEventListener('resize', queueUpdate);
    window.removeEventListener('load', queueUpdate);
    window.clearTimeout(settleTimer);
    cancelAnimationFrame(frame);
  };
}
