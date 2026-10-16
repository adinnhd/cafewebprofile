import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const width of [360, 390, 768, 1024, 1440]) {
  for (const route of ['/', '/menu']) {
    test(`${route} at ${width}px: layout, images, metadata, and runtime`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await page.evaluate(() => document.fonts.ready);
      if (route === '/menu') await expect(page.locator('.menu-grid .menu-card')).toHaveCount(12);
      for (const image of await page.locator('main img').all()) {
        if (!await image.isVisible()) continue;
        await image.scrollIntoViewIfNeeded();
        await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
      }
      const overflow = await page.evaluate(() => ({
        actual: document.documentElement.scrollWidth,
        viewport: window.innerWidth,
      }));
      expect(overflow.actual).toBeLessThanOrEqual(overflow.viewport);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
      expect(errors).toEqual([]);
    });
  }
}

test('desktop marker follows anchor clicks, history, and manual scrolling', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Navigasi utama' });
  const active = nav.locator('[aria-current]');
  await expect(active).toHaveText('Beranda');
  for (const label of ['Tentang', 'Lokasi']) {
    await nav.getByRole('link', { name: label, exact: true }).click();
    await expect(active).toHaveCount(1);
    await expect(active).toHaveText(label);
    await expect(active).toHaveAttribute('aria-current', 'location');
    const id = label.toLocaleLowerCase('id-ID');
    await expect.poll(() => page.locator(`#${id}`).evaluate((section) =>
      section.getBoundingClientRect().top <= 160 || window.scrollY + innerHeight >= document.documentElement.scrollHeight - 4,
    )).toBe(true);
  }
  await page.goBack();
  await expect(active).toHaveText('Tentang');
  await page.goForward();
  await expect(active).toHaveText('Lokasi');
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await expect(active).toHaveText('Beranda');
  await page.locator('#tentang').evaluate((section) => section.scrollIntoView({ block: 'start', behavior: 'instant' }));
  await expect(active).toHaveText('Tentang');
  await page.locator('#lokasi').evaluate((section) => section.scrollIntoView({ block: 'start', behavior: 'instant' }));
  await expect(active).toHaveText('Lokasi');
});

test('navigation marker handles direct hash URLs and links from the menu page', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const nav = page.getByRole('navigation', { name: 'Navigasi utama' });
  await page.goto('/#lokasi');
  await expect(nav.locator('[aria-current]')).toHaveText('Lokasi');
  await page.reload();
  await expect(nav.locator('[aria-current]')).toHaveText('Lokasi');
  await page.goto('/menu');
  await expect(nav.locator('[aria-current]')).toHaveText('Menu');
  await nav.getByRole('link', { name: 'Tentang', exact: true }).click();
  await expect(page).toHaveURL(/\/#tentang$/);
  await expect(nav.locator('[aria-current]')).toHaveText('Tentang');
});

test('search, combined categories, no results, reset, and incremental browsing', async ({ page }) => {
  await page.goto('/menu');
  const cards = page.locator('.menu-grid .menu-card');
  const search = page.getByRole('searchbox', { name: 'Cari nama atau kategori menu' });
  await expect(cards).toHaveCount(12);
  await page.getByRole('button', { name: 'Tampilkan lebih banyak' }).click();
  await expect(cards).toHaveCount(24);
  await search.fill('  AMERICANO  ');
  await expect(cards).toHaveCount(1);
  await expect(cards.first()).toContainText('Americano');
  await page.getByRole('button', { name: 'Hapus pencarian' }).click();
  await page.getByRole('button', { name: 'Signature Coffee', exact: false }).click();
  await expect(cards).toHaveCount(4);
  await search.fill('regal');
  await expect(cards).toHaveCount(1);
  await expect(cards.first()).toContainText('Kopsus Regal');
  await search.fill('zzzz tidak ada');
  await expect(page.getByText('Selera boleh spesial.')).toBeVisible();
  await expect(cards).toHaveCount(0);
  await page.getByRole('button', { name: 'Lihat Semua Menu' }).click();
  await expect(search).toHaveValue('');
  await expect(cards).toHaveCount(12);
  await page.getByRole('button', { name: 'Non-Coffee', exact: false }).click();
  await search.fill('taro');
  await expect(cards).toHaveCount(1);
  await expect(cards.first()).toContainText('Konfirmasi harga');
  await page.getByRole('button', { name: 'Reset filter' }).click();
  await expect(cards).toHaveCount(12);
  // Incremental browsing must eventually expose every seed item.
  while (await page.getByRole('button', { name: 'Tampilkan lebih banyak' }).count()) {
    await page.getByRole('button', { name: 'Tampilkan lebih banyak' }).click();
  }
  await expect(cards).toHaveCount(51);
});

test('highlight links select the corresponding menu item', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Lihat Kopsus TigaSegi di menu' }).click();
  await expect(page).toHaveURL(/\/menu\?item=kopsus-tigasegi/);
  await expect(page.getByRole('searchbox')).toHaveValue('Kopsus TigaSegi');
  await expect(page.locator('.menu-grid .menu-card')).toHaveCount(1);
});

test('mobile navigation: focus management, Escape, links, and safe viewport', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 640 });
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Buka navigasi' });
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('button', { name: 'Tutup navigasi' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await dialog.getByRole('link', { name: /Tentang/ }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page).toHaveURL(/#tentang$/);
  await trigger.click();
  await expect(dialog.locator('nav [aria-current]')).toHaveText('03Tentang');
  await expect(dialog.locator('nav [aria-current]')).toHaveAttribute('aria-current', 'location');
  await dialog.getByRole('link', { name: /^02\s+Menu/ }).click();
  await expect(page).toHaveURL(/\/menu$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Menu kami,');
});

for (const route of ['/', '/menu']) {
  test(`WCAG 2.2 AA automated audit: ${route}`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
    expect(results.violations).toEqual([]);
    await page.getByRole('button', { name: 'Buka navigasi' }).click();
    const navigationResults = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
    expect(navigationResults.violations).toEqual([]);
  });
}

test('no-JavaScript fallback includes the complete menu', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/menu');
  await expect(page.locator('.no-js-menu dt')).toHaveCount(51);
  await expect(page.getByRole('link', { name: 'Temukan Tiga Segi' })).toHaveAttribute('href', 'https://maps.app.goo.gl/8aRsJAiMYFBuJ41J8');
  await context.close();
});
