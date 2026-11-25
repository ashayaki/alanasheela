import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: 'https://www.alanasheela.shop',
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: 'https://alanasheela.shop',
      lastModified,
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];
}
