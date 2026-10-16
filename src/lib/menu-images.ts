import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import { menu, categoryLabel } from '../data/menu';
import type { MenuItem } from '../data/menu';

export interface DisplayMenuItem extends Omit<MenuItem, 'image'> {
  image: string;
  imageSrcSet: string;
  categoryLabel: string;
}

const cache = new Map<string, Promise<{ src: string; srcset: string }>>();
function optimize(image: ImageMetadata) {
  if (!cache.has(image.src)) {
    cache.set(image.src, Promise.all([320, 480, 720].map(async (width) => {
      const result = await getImage({ src: image, width, height: Math.round(width * 0.8), fit: 'cover', format: 'webp', quality: 78, layout: 'none' });
      return { src: result.src, width };
    })).then((variants) => ({ src: variants[1].src, srcset: variants.map((variant) => `${variant.src} ${variant.width}w`).join(', ') })));
  }
  return cache.get(image.src)!;
}

export async function getDisplayMenu(): Promise<DisplayMenuItem[]> {
  return Promise.all(menu.map(async (item) => {
    const optimized = await optimize(item.image);
    return { ...item, image: optimized.src, imageSrcSet: optimized.srcset, categoryLabel: categoryLabel(item.category) };
  }));
}
