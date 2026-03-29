export interface StateStatistics {
  stateCode: string;
  name: string;
  slug: string;
  annualCrashes: number;
  fatalCrashes: number;
  injuries: number;
  fatalities: number;
  fatalityRatePer100K: number;
  topCorridors: string[];
}

export const STATE_STATISTICS: StateStatistics[] = [
  { stateCode: 'TX', name: 'Texas', slug: 'texas', annualCrashes: 22184, fatalCrashes: 612, injuries: 11820, fatalities: 812, fatalityRatePer100K: 2.72, topCorridors: ['I-35', 'I-10', 'I-20', 'I-40', 'I-45'] },
  { stateCode: 'CA', name: 'California', slug: 'california', annualCrashes: 15612, fatalCrashes: 340, injuries: 10390, fatalities: 408, fatalityRatePer100K: 1.02, topCorridors: ['I-5', 'I-10', 'I-80', 'SR-99', 'I-15'] },
  { stateCode: 'FL', name: 'Florida', slug: 'florida', annualCrashes: 10184, fatalCrashes: 312, injuries: 7260, fatalities: 388, fatalityRatePer100K: 1.73, topCorridors: ['I-95', 'I-75', 'I-10', 'US-1', 'I-4'] },
  { stateCode: 'GA', name: 'Georgia', slug: 'georgia', annualCrashes: 6893, fatalCrashes: 208, injuries: 4780, fatalities: 252, fatalityRatePer100K: 2.29, topCorridors: ['I-75', 'I-20', 'I-85', 'I-285', 'US-19'] },
  { stateCode: 'PA', name: 'Pennsylvania', slug: 'pennsylvania', annualCrashes: 6248, fatalCrashes: 162, injuries: 4120, fatalities: 192, fatalityRatePer100K: 1.50, topCorridors: ['I-80', 'I-76', 'I-78', 'I-81', 'US-30'] },
  { stateCode: 'OH', name: 'Ohio', slug: 'ohio', annualCrashes: 5912, fatalCrashes: 148, injuries: 3880, fatalities: 168, fatalityRatePer100K: 1.42, topCorridors: ['I-70', 'I-71', 'I-75', 'I-76', 'I-80'] },
  { stateCode: 'IL', name: 'Illinois', slug: 'illinois', annualCrashes: 5584, fatalCrashes: 144, injuries: 3580, fatalities: 185, fatalityRatePer100K: 1.45, topCorridors: ['I-55', 'I-80', 'I-90', 'I-88', 'I-39'] },
  { stateCode: 'NC', name: 'North Carolina', slug: 'north-carolina', annualCrashes: 5421, fatalCrashes: 178, injuries: 3690, fatalities: 214, fatalityRatePer100K: 1.98, topCorridors: ['I-85', 'I-40', 'I-95', 'I-77', 'US-74'] },
  { stateCode: 'TN', name: 'Tennessee', slug: 'tennessee', annualCrashes: 5138, fatalCrashes: 156, injuries: 3340, fatalities: 188, fatalityRatePer100K: 2.63, topCorridors: ['I-40', 'I-75', 'I-24', 'I-65', 'I-81'] },
  { stateCode: 'IN', name: 'Indiana', slug: 'indiana', annualCrashes: 4871, fatalCrashes: 138, injuries: 3210, fatalities: 163, fatalityRatePer100K: 2.35, topCorridors: ['I-65', 'I-70', 'I-80', 'I-90', 'I-74'] },
  { stateCode: 'MO', name: 'Missouri', slug: 'missouri', annualCrashes: 4639, fatalCrashes: 136, injuries: 3050, fatalities: 158, fatalityRatePer100K: 2.55, topCorridors: ['I-70', 'I-44', 'I-55', 'I-64', 'I-29'] },
  { stateCode: 'AL', name: 'Alabama', slug: 'alabama', annualCrashes: 4282, fatalCrashes: 128, injuries: 2870, fatalities: 151, fatalityRatePer100K: 2.97, topCorridors: ['I-65', 'I-20', 'I-85', 'I-59', 'US-280'] },
  { stateCode: 'MS', name: 'Mississippi', slug: 'mississippi', annualCrashes: 3958, fatalCrashes: 114, injuries: 2560, fatalities: 138, fatalityRatePer100K: 4.64, topCorridors: ['I-55', 'I-20', 'I-10', 'I-59', 'US-49'] },
  { stateCode: 'LA', name: 'Louisiana', slug: 'louisiana', annualCrashes: 3742, fatalCrashes: 118, injuries: 2420, fatalities: 155, fatalityRatePer100K: 3.30, topCorridors: ['I-10', 'I-20', 'I-49', 'US-90', 'I-12'] },
  { stateCode: 'NY', name: 'New York', slug: 'new-york', annualCrashes: 3518, fatalCrashes: 98, injuries: 2380, fatalities: 121, fatalityRatePer100K: 0.60, topCorridors: ['I-87', 'I-90', 'I-95', 'I-78', 'I-84'] },
  { stateCode: 'AZ', name: 'Arizona', slug: 'arizona', annualCrashes: 3412, fatalCrashes: 108, injuries: 2210, fatalities: 131, fatalityRatePer100K: 1.77, topCorridors: ['I-10', 'I-40', 'I-17', 'US-60', 'I-8'] },
  { stateCode: 'VA', name: 'Virginia', slug: 'virginia', annualCrashes: 3284, fatalCrashes: 96, injuries: 2140, fatalities: 112, fatalityRatePer100K: 1.28, topCorridors: ['I-81', 'I-95', 'I-64', 'I-66', 'US-460'] },
  { stateCode: 'MI', name: 'Michigan', slug: 'michigan', annualCrashes: 3121, fatalCrashes: 92, injuries: 2050, fatalities: 107, fatalityRatePer100K: 1.07, topCorridors: ['I-75', 'I-96', 'I-94', 'I-69', 'US-23'] },
  { stateCode: 'WI', name: 'Wisconsin', slug: 'wisconsin', annualCrashes: 2958, fatalCrashes: 82, injuries: 1890, fatalities: 98, fatalityRatePer100K: 1.67, topCorridors: ['I-90', 'I-94', 'I-43', 'US-51', 'I-41'] },
  { stateCode: 'KY', name: 'Kentucky', slug: 'kentucky', annualCrashes: 2841, fatalCrashes: 90, injuries: 1830, fatalities: 105, fatalityRatePer100K: 2.31, topCorridors: ['I-65', 'I-75', 'I-64', 'I-71', 'US-25'] },
  { stateCode: 'OK', name: 'Oklahoma', slug: 'oklahoma', annualCrashes: 2782, fatalCrashes: 104, injuries: 1750, fatalities: 118, fatalityRatePer100K: 2.93, topCorridors: ['I-40', 'I-35', 'I-44', 'US-69', 'US-270'] },
  { stateCode: 'AR', name: 'Arkansas', slug: 'arkansas', annualCrashes: 2638, fatalCrashes: 96, injuries: 1680, fatalities: 113, fatalityRatePer100K: 3.67, topCorridors: ['I-40', 'I-30', 'I-55', 'US-412', 'US-67'] },
  { stateCode: 'SC', name: 'South Carolina', slug: 'south-carolina', annualCrashes: 2539, fatalCrashes: 86, injuries: 1660, fatalities: 98, fatalityRatePer100K: 1.86, topCorridors: ['I-95', 'I-85', 'I-26', 'US-501', 'I-77'] },
  { stateCode: 'MN', name: 'Minnesota', slug: 'minnesota', annualCrashes: 2318, fatalCrashes: 62, injuries: 1540, fatalities: 72, fatalityRatePer100K: 1.27, topCorridors: ['I-94', 'I-35', 'I-90', 'US-10', 'US-2'] },
  { stateCode: 'CO', name: 'Colorado', slug: 'colorado', annualCrashes: 2136, fatalCrashes: 68, injuries: 1420, fatalities: 81, fatalityRatePer100K: 1.37, topCorridors: ['I-70', 'I-25', 'I-76', 'US-285', 'US-40'] },
  { stateCode: 'WA', name: 'Washington', slug: 'washington', annualCrashes: 2048, fatalCrashes: 58, injuries: 1360, fatalities: 68, fatalityRatePer100K: 0.87, topCorridors: ['I-5', 'I-90', 'I-82', 'US-2', 'I-405'] },
  { stateCode: 'NE', name: 'Nebraska', slug: 'nebraska', annualCrashes: 1971, fatalCrashes: 64, injuries: 1280, fatalities: 77, fatalityRatePer100K: 3.83, topCorridors: ['I-80', 'I-76', 'US-30', 'US-81', 'US-20'] },
  { stateCode: 'NM', name: 'New Mexico', slug: 'new-mexico', annualCrashes: 1892, fatalCrashes: 72, injuries: 1210, fatalities: 88, fatalityRatePer100K: 4.12, topCorridors: ['I-40', 'I-10', 'I-25', 'US-285', 'US-60'] },
  { stateCode: 'KS', name: 'Kansas', slug: 'kansas', annualCrashes: 1818, fatalCrashes: 68, injuries: 1160, fatalities: 82, fatalityRatePer100K: 2.79, topCorridors: ['I-70', 'I-135', 'US-50', 'US-283', 'US-54'] },
  { stateCode: 'IA', name: 'Iowa', slug: 'iowa', annualCrashes: 1781, fatalCrashes: 60, injuries: 1140, fatalities: 71, fatalityRatePer100K: 2.22, topCorridors: ['I-80', 'I-35', 'I-380', 'US-20', 'US-61'] },
  { stateCode: 'NJ', name: 'New Jersey', slug: 'new-jersey', annualCrashes: 1462, fatalCrashes: 40, injuries: 980, fatalities: 47, fatalityRatePer100K: 0.51, topCorridors: ['I-95', 'NJ-17', 'I-78', 'I-295', 'US-1'] },
  { stateCode: 'NV', name: 'Nevada', slug: 'nevada', annualCrashes: 1641, fatalCrashes: 54, injuries: 1050, fatalities: 63, fatalityRatePer100K: 1.97, topCorridors: ['I-80', 'I-15', 'US-93', 'US-95', 'I-580'] },
  { stateCode: 'MD', name: 'Maryland', slug: 'maryland', annualCrashes: 1578, fatalCrashes: 46, injuries: 1030, fatalities: 54, fatalityRatePer100K: 0.87, topCorridors: ['I-95', 'I-695', 'I-270', 'I-70', 'US-301'] },
  { stateCode: 'OR', name: 'Oregon', slug: 'oregon', annualCrashes: 1478, fatalCrashes: 50, injuries: 980, fatalities: 59, fatalityRatePer100K: 1.35, topCorridors: ['I-5', 'I-84', 'US-97', 'US-26', 'OR-18'] },
  { stateCode: 'MA', name: 'Massachusetts', slug: 'massachusetts', annualCrashes: 1382, fatalCrashes: 36, injuries: 920, fatalities: 42, fatalityRatePer100K: 0.61, topCorridors: ['I-90', 'I-93', 'I-495', 'I-95', 'US-1'] },
  { stateCode: 'WV', name: 'West Virginia', slug: 'west-virginia', annualCrashes: 1441, fatalCrashes: 52, injuries: 920, fatalities: 63, fatalityRatePer100K: 3.48, topCorridors: ['I-64', 'I-77', 'I-79', 'US-119', 'US-35'] },
  { stateCode: 'ID', name: 'Idaho', slug: 'idaho', annualCrashes: 1278, fatalCrashes: 46, injuries: 830, fatalities: 56, fatalityRatePer100K: 2.89, topCorridors: ['I-84', 'I-86', 'US-30', 'US-93', 'US-20'] },
  { stateCode: 'CT', name: 'Connecticut', slug: 'connecticut', annualCrashes: 1184, fatalCrashes: 34, injuries: 760, fatalities: 40, fatalityRatePer100K: 1.10, topCorridors: ['I-95', 'I-91', 'I-84', 'US-1', 'I-395'] },
  { stateCode: 'MT', name: 'Montana', slug: 'montana', annualCrashes: 1148, fatalCrashes: 44, injuries: 720, fatalities: 54, fatalityRatePer100K: 4.77, topCorridors: ['I-90', 'I-15', 'US-2', 'US-212', 'US-93'] },
  { stateCode: 'UT', name: 'Utah', slug: 'utah', annualCrashes: 1082, fatalCrashes: 42, injuries: 700, fatalities: 50, fatalityRatePer100K: 1.46, topCorridors: ['I-15', 'I-80', 'I-84', 'US-6', 'US-89'] },
  { stateCode: 'SD', name: 'South Dakota', slug: 'south-dakota', annualCrashes: 984, fatalCrashes: 38, injuries: 620, fatalities: 47, fatalityRatePer100K: 5.15, topCorridors: ['I-90', 'I-29', 'US-14', 'US-212', 'US-18'] },
  { stateCode: 'ND', name: 'North Dakota', slug: 'north-dakota', annualCrashes: 862, fatalCrashes: 32, injuries: 560, fatalities: 40, fatalityRatePer100K: 5.08, topCorridors: ['I-94', 'I-29', 'US-2', 'US-83', 'US-52'] },
  { stateCode: 'WY', name: 'Wyoming', slug: 'wyoming', annualCrashes: 841, fatalCrashes: 34, injuries: 520, fatalities: 43, fatalityRatePer100K: 7.10, topCorridors: ['I-80', 'I-25', 'I-90', 'US-26', 'US-287'] },
  { stateCode: 'NH', name: 'New Hampshire', slug: 'new-hampshire', annualCrashes: 659, fatalCrashes: 22, injuries: 440, fatalities: 26, fatalityRatePer100K: 1.87, topCorridors: ['I-93', 'I-89', 'US-1', 'I-95', 'US-3'] },
  { stateCode: 'ME', name: 'Maine', slug: 'maine', annualCrashes: 641, fatalCrashes: 24, injuries: 410, fatalities: 28, fatalityRatePer100K: 2.05, topCorridors: ['I-95', 'US-1', 'US-2', 'I-295', 'US-202'] },
  { stateCode: 'HI', name: 'Hawaii', slug: 'hawaii', annualCrashes: 281, fatalCrashes: 8, injuries: 190, fatalities: 9, fatalityRatePer100K: 0.63, topCorridors: ['H-1', 'H-2', 'H-3', 'Kamehameha Hwy', 'Mamalahoa Hwy'] },
  { stateCode: 'AK', name: 'Alaska', slug: 'alaska', annualCrashes: 318, fatalCrashes: 12, injuries: 210, fatalities: 14, fatalityRatePer100K: 1.87, topCorridors: ['Glenn Hwy', 'Parks Hwy', 'Richardson Hwy', 'Seward Hwy', 'Sterling Hwy'] },
  { stateCode: 'VT', name: 'Vermont', slug: 'vermont', annualCrashes: 331, fatalCrashes: 14, injuries: 220, fatalities: 16, fatalityRatePer100K: 2.50, topCorridors: ['I-89', 'I-91', 'US-2', 'US-7', 'VT-9'] },
  { stateCode: 'RI', name: 'Rhode Island', slug: 'rhode-island', annualCrashes: 379, fatalCrashes: 10, injuries: 250, fatalities: 12, fatalityRatePer100K: 1.11, topCorridors: ['I-95', 'I-195', 'I-295', 'US-1', 'RI-4'] },
  { stateCode: 'DE', name: 'Delaware', slug: 'delaware', annualCrashes: 421, fatalCrashes: 12, injuries: 270, fatalities: 14, fatalityRatePer100K: 1.37, topCorridors: ['I-95', 'I-495', 'US-13', 'US-301', 'SR-1'] },
];

export function getStateStatsByCode(code: string): StateStatistics | undefined {
  return STATE_STATISTICS.find(s => s.stateCode === code);
}

export function getStateStatsBySlug(slug: string): StateStatistics | undefined {
  return STATE_STATISTICS.find(s => s.slug === slug);
}

export const DEADLIEST_STATES_ORDER = [
  'texas', 'california', 'florida', 'georgia', 'pennsylvania',
  'ohio', 'illinois', 'north-carolina', 'indiana', 'tennessee',
  'alabama', 'missouri', 'mississippi', 'louisiana', 'new-york',
];
