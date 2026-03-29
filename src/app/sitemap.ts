import type { MetadataRoute } from 'next';
import { ACCIDENT_TYPES } from '@/lib/accident-types';
import { INJURY_TYPES } from '@/lib/injury-types';
import { ACTIVE_STATE_SLUGS } from '@/lib/state-laws';

const GUIDE_SLUGS = [
  'what-to-do-after-truck-accident',
  'how-truck-accident-settlements-work',
  'fmcsa-regulations-and-your-rights',
  'comparative-fault-laws-by-state',
  'trucking-company-liability',
];

const BASE_URL = 'https://trucksettlementpro.com';
const LAST_MODIFIED = new Date('2026-03-28');

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                              lastModified: LAST_MODIFIED, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE_URL}/calculator`,              lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/settlements`,             lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/statistics`,              lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/guides`,                  lastModified: LAST_MODIFIED, changeFrequency: 'weekly',  priority: 0.75 },
    { url: `${BASE_URL}/companies`,               lastModified: LAST_MODIFIED, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE_URL}/about`,                   lastModified: LAST_MODIFIED, changeFrequency: 'yearly',  priority: 0.6 },
    { url: `${BASE_URL}/privacy`,                 lastModified: LAST_MODIFIED, changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${BASE_URL}/terms`,                   lastModified: LAST_MODIFIED, changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${BASE_URL}/contact`,                 lastModified: LAST_MODIFIED, changeFrequency: 'yearly',  priority: 0.3 },
  ];

  const guidePages: MetadataRoute.Sitemap = GUIDE_SLUGS.map(slug => ({
    url: `${BASE_URL}/guides/${slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const stateLandings: MetadataRoute.Sitemap = ACTIVE_STATE_SLUGS.map(state => ({
    url: `${BASE_URL}/settlements/${state}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const accidentTypePages: MetadataRoute.Sitemap = ACTIVE_STATE_SLUGS.flatMap(state =>
    ACCIDENT_TYPES.map(t => ({
      url: `${BASE_URL}/settlements/${state}/${t.slug}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  );

  const injuryTypePages: MetadataRoute.Sitemap = ACTIVE_STATE_SLUGS.flatMap(state =>
    INJURY_TYPES.map(i => ({
      url: `${BASE_URL}/settlements/${state}/injury/${i.slug}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  );

  return [...staticPages, ...guidePages, ...stateLandings, ...accidentTypePages, ...injuryTypePages];
}
