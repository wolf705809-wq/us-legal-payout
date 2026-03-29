import { STATES, type StateData, type FaultRule } from '@/data/states';

export type { FaultRule };

export interface ExtendedStateData extends StateData {
  slug: string;
  code: string;
  statuteCitation: string;
  statuteShort: string;
  majorHighways: string[];
  truckFatalityRank?: number;
  truckFatalitiesNote?: string;
  // Fields for state landing pages
  annualFatalities2022?: number;
  keyFacts?: string[];
  stateIntro?: string;
  specialNote?: string; // e.g. for FL's 2023 law change
}

const EXTENDED: Record<string, Omit<ExtendedStateData, keyof StateData>> = {
  AL: {
    slug: 'alabama', code: 'AL',
    statuteCitation: 'Alabama Code § 6-5-522 (contributory negligence doctrine)',
    statuteShort: 'Ala. Code § 6-5-522',
    majorHighways: ['I-20', 'I-59', 'I-65', 'I-85', 'US-280'],
    annualFatalities2022: 118,
    truckFatalitiesNote:
      'Alabama recorded approximately 118 large truck fatalities in 2022. The I-65 corridor from Mobile through Montgomery to Birmingham is the primary north-south freight route (NHTSA FARS 2022).',
    stateIntro:
      'Alabama is one of only four states in the nation that still applies the harsh contributory negligence doctrine — meaning any fault on your part, even 1%, bars all recovery. Alabama courts have consistently declined to adopt comparative fault, making attorney representation critically important in any Alabama truck accident case. The Port of Mobile and the I-65 corridor through Birmingham generate significant commercial truck volumes.',
    keyFacts: [
      'Alabama follows contributory negligence — any fault attributed to the plaintiff, even 1%, completely bars all recovery under Alabama Code § 6-5-522',
      'Alabama recorded approximately 118 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'The Port of Mobile is the 10th largest US port by tonnage, generating substantial drayage truck traffic through the Gulf Coast corridor',
      'Alabama has a 2-year statute of limitations for personal injury claims (Ala. Code § 6-2-38)',
    ],
    specialNote:
      'CRITICAL: Alabama follows contributory negligence — if you are found even 1% at fault for the accident, you may recover nothing. This is one of the harshest liability rules in the US. Consult an attorney immediately to evaluate whether any comparative fault defense can be countered before engaging with the insurer.',
  },

  AK: {
    slug: 'alaska', code: 'AK',
    statuteCitation: 'Alaska Statutes § 09.17.060 (pure comparative fault)',
    statuteShort: 'Alaska Stat. § 09.17.060',
    majorHighways: ['Alaska Highway (AK-2)', 'Glenn Highway (AK-1)', 'Parks Highway (AK-3)', 'Seward Highway (AK-9)', 'Richardson Highway (AK-4)'],
    annualFatalities2022: 14,
    stateIntro:
      'Alaska follows pure comparative fault, allowing truck accident victims to recover damages regardless of their percentage of fault. Alaska presents unique trucking conditions: extreme seasonal weather, limited highway infrastructure, and significant freight demands for remote communities. The Alaska Highway system carries both commercial and supply chain freight under conditions unlike any other state.',
    keyFacts: [
      'Alaska follows pure comparative fault — Alaska Stat. § 09.17.060 allows recovery regardless of plaintiff fault percentage',
      'Alaska recorded approximately 14 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'Alaska\'s commercial trucking is heavily influenced by seasonal road conditions, ice roads, and the HAZMAT requirements for remote community supply runs',
      'Alaska has a 2-year statute of limitations for personal injury claims (Alaska Stat. § 09.10.070)',
    ],
  },

  AZ: {
    slug: 'arizona', code: 'AZ',
    statuteCitation: 'Arizona Revised Statutes § 12-2505 (pure comparative fault)',
    statuteShort: 'A.R.S. § 12-2505',
    majorHighways: ['I-10', 'I-17', 'I-40', 'US-60', 'SR-303'],
    annualFatalities2022: 134,
    truckFatalitiesNote:
      'Arizona recorded approximately 134 large truck fatalities in 2022. The I-10 corridor through Phoenix is one of the highest-volume trans-continental truck freight routes in the US (NHTSA FARS 2022).',
    stateIntro:
      'Arizona follows pure comparative fault — A.R.S. § 12-2505 allows truck accident victims to recover compensation regardless of their percentage of fault. The I-10 corridor connecting California ports to Texas and the Gulf Coast carries enormous freight volumes through Phoenix and Tucson. Arizona also sees significant cross-border freight from Mexico via I-19 and I-10 through Tucson.',
    keyFacts: [
      'Arizona follows pure comparative fault — A.R.S. § 12-2505 allows recovery regardless of plaintiff fault percentage',
      'Arizona recorded approximately 134 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'I-10 through Phoenix is a primary southern trans-continental freight corridor connecting the LA/Long Beach ports to Texas and the Gulf Coast',
      'Arizona has a 2-year statute of limitations for personal injury claims (A.R.S. § 12-542)',
      'Cross-border freight from Mexico via Nogales and the I-19 corridor generates significant commercial truck volumes through Tucson',
    ],
  },

  AR: {
    slug: 'arkansas', code: 'AR',
    statuteCitation: 'Arkansas Code Annotated § 16-64-122 (modified comparative fault, 50% bar)',
    statuteShort: 'Ark. Code Ann. § 16-64-122',
    majorHighways: ['I-40', 'I-30', 'I-55', 'US-67', 'US-71'],
    annualFatalities2022: 108,
    truckFatalitiesNote:
      'Arkansas recorded approximately 108 large truck fatalities in 2022. The I-40 corridor through Little Rock and the I-55 Mississippi River corridor are among the highest-volume truck freight routes in the Mid-South (NHTSA FARS 2022).',
    stateIntro:
      'Arkansas applies a modified comparative fault system with a 50% bar — plaintiffs at exactly 50% fault cannot recover. The state sits at a critical freight crossroads: I-40 connects Memphis to Oklahoma City, while I-55 runs north-south along the Mississippi River corridor. Walmart\'s global headquarters in Bentonville makes Northwest Arkansas a significant freight origin and destination for retail logistics.',
    keyFacts: [
      'Arkansas applies modified comparative fault with a 50% bar — plaintiffs at exactly 50% fault recover nothing (Ark. Code Ann. § 16-64-122)',
      'Arkansas recorded approximately 108 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'Walmart\'s global headquarters in Bentonville drives massive retail freight traffic through I-49 and Northwest Arkansas',
      'Arkansas has a 3-year statute of limitations for personal injury claims (Ark. Code Ann. § 16-56-105)',
    ],
  },

  CA: {
    slug: 'california', code: 'CA',
    statuteCitation: 'California Civil Code § 1714; Li v. Yellow Cab Co. (1975) 13 Cal.3d 804',
    statuteShort: 'Cal. Civ. Code § 1714',
    majorHighways: ['I-5', 'I-10', 'SR-99', 'I-80', 'US-101'],
    truckFatalityRank: 2,
    annualFatalities2022: 388,
    truckFatalitiesNote:
      'California ranks second nationally in large truck crash fatalities. The I-5 corridor from the Oregon border through Los Angeles to San Diego is one of the highest-volume truck freight routes in the United States (NHTSA FARS 2022).',
    stateIntro:
      'California follows pure comparative fault — the most plaintiff-friendly negligence standard in the nation. Under Li v. Yellow Cab Co. (1975), you can recover damages even if you were 99% responsible for the accident. Your award is simply reduced by your percentage of fault. With the Port of Los Angeles and Port of Long Beach handling 40% of all US container imports and the 796-mile I-5 corridor carrying continuous heavy freight, truck accident claims are a significant part of California\'s civil litigation landscape.',
    keyFacts: [
      'California\'s pure comparative fault rule (Cal. Civ. Code § 1714) means no fault percentage bars your recovery — even 99% fault still leaves you with 1% of your damages',
      'The Port of LA and Port of Long Beach together handle ~40% of all US container imports, generating massive local drayage truck traffic through the LA basin',
      'California has no statutory caps on compensatory damages in personal injury cases',
      'California Government Code § 12517 requires commercial vehicles to carry at least $750,000 in liability coverage, consistent with FMCSA minimums',
      'California\'s Bigelow Act (Ins. Code § 11580.2) provides additional UM/UIM protections for crash victims',
    ],
  },

  CO: {
    slug: 'colorado', code: 'CO',
    statuteCitation: 'Colorado Revised Statutes § 13-21-111 (modified comparative fault, 50% bar)',
    statuteShort: 'C.R.S. § 13-21-111',
    majorHighways: ['I-70', 'I-25', 'I-76', 'US-6', 'US-285'],
    annualFatalities2022: 102,
    truckFatalitiesNote:
      'Colorado recorded approximately 102 large truck fatalities in 2022. The I-70 mountain corridor through the Eisenhower Tunnel is among the most treacherous freight routes in the western US due to steep grades and winter weather (NHTSA FARS 2022).',
    stateIntro:
      'Colorado applies modified comparative fault with a 50% bar — plaintiffs at exactly 50% fault cannot recover. The state presents unique trucking risks: I-70\'s Eisenhower-Johnson Tunnel at 11,158 feet elevation and the steep Vail Pass grades generate disproportionate runaway truck and brake failure incidents. Colorado\'s year-round ski resort and agricultural freight demands ensure heavy commercial traffic even in severe winter conditions.',
    keyFacts: [
      'Colorado\'s modified comparative fault (50% bar) means plaintiffs assigned exactly 50% fault cannot recover — C.R.S. § 13-21-111',
      'Colorado recorded approximately 102 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'I-70\'s mountain corridor (Eisenhower/Johnson Tunnel, Vail Pass, Glenwood Canyon) is among the most dangerous freight routes in the US due to steep grades and winter weather',
      'Brake failure and runaway truck accidents are disproportionately common on Colorado mountain grades — leading to CDOT runaway truck ramps along I-70',
      'Colorado has a 3-year statute of limitations for personal injury claims (C.R.S. § 13-80-101)',
    ],
  },

  CT: {
    slug: 'connecticut', code: 'CT',
    statuteCitation: 'Connecticut General Statutes § 52-572h (modified comparative fault, 51% bar)',
    statuteShort: 'Conn. Gen. Stat. § 52-572h',
    majorHighways: ['I-95', 'I-91', 'I-84', 'US-1', 'Route 15'],
    annualFatalities2022: 31,
    stateIntro:
      'Connecticut applies modified comparative fault with a 51% bar — plaintiffs at 51% or more fault cannot recover. Connecticut\'s highway system is a critical link in the Northeast Corridor freight network, with I-95 carrying continuous commercial traffic between New York City and Boston. Connecticut\'s dense population and high truck volumes through the narrow I-95/Merritt Parkway corridor create elevated accident risk.',
    keyFacts: [
      'Connecticut applies modified comparative fault with a 51% bar — Conn. Gen. Stat. § 52-572h bars recovery only when plaintiff\'s fault exceeds 50%',
      'Connecticut recorded approximately 31 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'I-95 through Bridgeport, New Haven, and New London carries some of the highest truck volumes per mile in New England',
      'Connecticut has a 2-year statute of limitations for personal injury claims (Conn. Gen. Stat. § 52-584)',
    ],
  },

  DE: {
    slug: 'delaware', code: 'DE',
    statuteCitation: 'Delaware Code Annotated, Title 10, § 8132 (modified comparative fault, 51% bar)',
    statuteShort: 'Del. Code Ann. tit. 10, § 8132',
    majorHighways: ['I-95', 'I-295', 'US-13', 'US-1', 'SR-1'],
    annualFatalities2022: 18,
    stateIntro:
      'Delaware applies modified comparative fault with a 51% bar. As the most heavily transited state per square mile in the Mid-Atlantic, Delaware\'s I-95 corridor is a critical freight chokepoint connecting the Baltimore/Washington metro to Philadelphia and New York. The Delaware Memorial Bridge and I-295 junction see concentrated heavy truck traffic from the Port of Wilmington.',
    keyFacts: [
      'Delaware applies modified comparative fault with a 51% bar — Del. Code Ann. tit. 10, § 8132',
      'Delaware recorded approximately 18 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'The Port of Wilmington handles significant refrigerated cargo and food imports, generating substantial drayage truck volume through I-95 and US-13',
      'Delaware has a 2-year statute of limitations for personal injury claims (Del. Code Ann. tit. 10, § 8119)',
    ],
  },

  FL: {
    slug: 'florida', code: 'FL',
    statuteCitation: 'Florida Statutes § 768.81 (as amended by HB 837, effective March 24, 2023)',
    statuteShort: 'Fla. Stat. § 768.81',
    majorHighways: ['I-95', 'I-75', 'I-4', 'US-1', 'SR-60'],
    truckFatalityRank: 3,
    annualFatalities2022: 430,
    truckFatalitiesNote:
      'Florida ranks third nationally in large truck fatalities. The I-4 corridor through Orlando is consistently ranked among the most dangerous interstates in the US per vehicle-mile traveled.',
    stateIntro:
      'Florida\'s tort landscape changed fundamentally in 2023. Under HB 837 (effective March 24, 2023), Florida switched from pure comparative fault to a 51% modified comparative bar — and simultaneously reduced the personal injury statute of limitations from 4 years to 2 years. If your accident occurred before March 24, 2023, the previous pure comparative rule may still apply to your claim. This transition has made it more important than ever to consult an attorney promptly after a Florida truck accident.',
    specialNote:
      'IMPORTANT — 2023 LAW CHANGE: Florida\'s HB 837 (effective March 24, 2023) changed the fault rule from pure comparative to a 51% bar AND reduced the statute of limitations from 4 years to 2 years. If your accident occurred before March 24, 2023, consult an attorney immediately to determine which law applies.',
    keyFacts: [
      'Florida changed from pure comparative to modified comparative (51% bar) on March 24, 2023 — one of the most significant plaintiff-unfavorable tort reform changes in recent US history',
      'The statute of limitations was simultaneously reduced from 4 years to 2 years by the same 2023 legislation — claims timely under old law may now be time-barred',
      'I-4 between Tampa and Orlando is consistently ranked among the deadliest US interstates per mile',
      'Florida\'s large seasonal population (3M+ winter snowbirds) significantly increases light vehicle traffic mixing with year-round commercial freight from October–April',
      'PortMiami and Port Everglades generate substantial local drayage truck traffic through Broward and Miami-Dade counties',
    ],
  },

  GA: {
    slug: 'georgia', code: 'GA',
    statuteCitation: 'Official Code of Georgia Annotated (O.C.G.A.) § 51-11-7 (modified comparative fault, 50% bar)',
    statuteShort: 'O.C.G.A. § 51-11-7',
    majorHighways: ['I-75', 'I-85', 'I-20', 'I-16', 'I-285'],
    truckFatalityRank: 5,
    annualFatalities2022: 211,
    truckFatalitiesNote:
      'Atlanta\'s I-285 interchange and the I-75/I-85 "Connector" through downtown are among the most heavily trafficked freight corridors east of the Mississippi.',
    stateIntro:
      'Georgia applies modified comparative fault with a 50% bar — plaintiffs at exactly 50% fault cannot recover, a stricter rule than the more common 51% bar. Atlanta\'s position as the largest inland freight hub in the Southeast makes Georgia truck accident claims particularly complex, often involving multiple carriers and logistics companies. Hartsfield-Jackson International Airport drives additional air cargo truck volume across I-285 and I-75.',
    keyFacts: [
      'Hartsfield-Jackson Atlanta International Airport drives significant air cargo truck volume across I-285 and I-75',
      'Georgia\'s 50% bar means plaintiffs assigned exactly 50% fault recover nothing — a critical distinction from 51% bar states',
      'Atlanta\'s I-285/I-75/I-85 interchange (Spaghetti Junction) is one of the most complex — and crash-prone — highway intersections in the southeast',
      'Georgia recorded approximately 211 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'Georgia has a 2-year statute of limitations for personal injury claims (O.C.G.A. § 9-3-33)',
    ],
  },

  HI: {
    slug: 'hawaii', code: 'HI',
    statuteCitation: 'Hawaii Revised Statutes § 663-31 (pure comparative fault)',
    statuteShort: 'Haw. Rev. Stat. § 663-31',
    majorHighways: ['H-1 (Oahu)', 'H-2 (Oahu)', 'H-3 (Oahu)', 'Kamehameha Highway', 'Nimitz Highway'],
    annualFatalities2022: 9,
    stateIntro:
      'Hawaii follows pure comparative fault, allowing truck accident victims to recover compensation regardless of their percentage of fault. Hawaii\'s island geography creates unique trucking conditions — all commercial freight must arrive by ship and be distributed by truck across limited highway networks. The Port of Honolulu and interisland barge freight generate significant commercial vehicle activity on Oahu\'s congested H-1 corridor.',
    keyFacts: [
      'Hawaii follows pure comparative fault — Haw. Rev. Stat. § 663-31 allows recovery regardless of plaintiff fault percentage',
      'Hawaii recorded approximately 9 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'All commercial freight to Hawaii arrives by ship and is distributed exclusively by truck — creating high truck density on limited urban highway networks',
      'Hawaii has a 2-year statute of limitations for personal injury claims (Haw. Rev. Stat. § 657-7)',
    ],
  },

  ID: {
    slug: 'idaho', code: 'ID',
    statuteCitation: 'Idaho Code § 6-801 (modified comparative fault, 50% bar)',
    statuteShort: 'Idaho Code § 6-801',
    majorHighways: ['I-84', 'I-86', 'I-15', 'US-95', 'US-93'],
    annualFatalities2022: 47,
    stateIntro:
      'Idaho applies modified comparative fault with a 50% bar — plaintiffs at exactly 50% fault cannot recover. I-84 through the Snake River Plain is Idaho\'s primary freight corridor, connecting the Pacific Northwest to Utah and the Mountain West. Idaho\'s agricultural freight — including the Treasure Valley potato shipments and Magic Valley dairy logistics — generates substantial heavy truck activity, particularly on rural two-lane highways where truck accident severity is highest.',
    keyFacts: [
      'Idaho applies modified comparative fault with a 50% bar — Idaho Code § 6-801 bars recovery when plaintiff\'s fault reaches exactly 50%',
      'Idaho recorded approximately 47 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'Idaho\'s agricultural economy (potatoes, dairy, lumber) generates heavy seasonal freight on I-84 and rural US routes',
      'Idaho has a 2-year statute of limitations for personal injury claims (Idaho Code § 5-219)',
    ],
  },

  IL: {
    slug: 'illinois', code: 'IL',
    statuteCitation: 'Illinois Compiled Statutes 735 ILCS 5/2-1116 (modified comparative fault, 51% bar)',
    statuteShort: '735 ILCS 5/2-1116',
    majorHighways: ['I-90', 'I-94', 'I-80', 'I-55', 'I-57'],
    annualFatalities2022: 158,
    truckFatalitiesNote:
      'The Chicago metro area is the largest inland freight hub in the United States. Illinois I-80 and the I-90/94 corridor carry among the highest truck volumes of any non-coastal corridor nationally.',
    stateIntro:
      'Illinois applies modified comparative fault with a 51% bar — the Chicago metro area is the largest inland freight hub in the United States, with approximately 500 freight trains and thousands of truck trips passing through daily. The convergence of I-80, I-90, I-94, and I-55 in the Chicago area creates some of the nation\'s most complex multi-party truck accident scenarios, often involving national carriers, brokers, and shippers.',
    keyFacts: [
      'Chicago is the largest inland freight hub in the United States — approximately 500 freight trains and thousands of truck trips pass through daily',
      'Illinois has no caps on compensatory damages in personal injury cases',
      'Illinois\' 51% bar means a plaintiff at exactly 50% fault still recovers 50% of their damages',
      'Illinois recorded approximately 158 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'Illinois has a 2-year statute of limitations for personal injury claims (735 ILCS 5/13-202)',
    ],
  },

  IN: {
    slug: 'indiana', code: 'IN',
    statuteCitation: 'Indiana Code § 34-51-2-6 (modified comparative fault, 51% bar)',
    statuteShort: 'I.C. § 34-51-2-6',
    majorHighways: ['I-65', 'I-70', 'I-80/90 (Indiana Toll Road)', 'I-69', 'US-31'],
    annualFatalities2022: 130,
    stateIntro:
      'Indiana applies modified comparative fault with a 51% bar. The state occupies a critical position in Midwest freight logistics: the I-65/I-70 interchange near Indianapolis is one of the highest-volume truck junctions in the country, and the Indiana Toll Road (I-80/90) carries significant east-west freight between Chicago and the Northeast. Indiana is also home to numerous distribution centers for major retailers and auto manufacturers.',
    keyFacts: [
      'Indiana\'s I-65/I-70 interchange near Indianapolis is one of the highest-volume truck junctions in the Midwest',
      'The Indiana Toll Road (I-80/90) carries significant east-west freight between Chicago and the Northeast',
      'Indiana recorded approximately 130 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'Indiana has a 2-year statute of limitations for personal injury claims (I.C. § 34-11-2-4)',
    ],
  },

  IA: {
    slug: 'iowa', code: 'IA',
    statuteCitation: 'Iowa Code § 668.3 (modified comparative fault, 51% bar)',
    statuteShort: 'Iowa Code § 668.3',
    majorHighways: ['I-80', 'I-35', 'I-380', 'US-30', 'US-20'],
    annualFatalities2022: 65,
    stateIntro:
      'Iowa applies modified comparative fault with a 51% bar. Iowa sits on I-80 — the longest US interstate highway — which serves as the primary coast-to-coast freight corridor through the Midwest. Iowa\'s agricultural economy generates some of the highest agricultural truck traffic in the nation, with grain haulers, livestock transports, and ethanol tankers operating extensively on rural state routes where enforcement of hours-of-service regulations is challenging.',
    keyFacts: [
      'Iowa applies modified comparative fault with a 51% bar — Iowa Code § 668.3',
      'Iowa recorded approximately 65 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'I-80 through Iowa is the primary east-west interstate freight corridor — the nation\'s longest highway running coast to coast',
      'Iowa\'s agricultural economy generates high volumes of grain, livestock, and ethanol tanker truck traffic on rural state routes',
      'Iowa has a 2-year statute of limitations for personal injury claims (Iowa Code § 614.1)',
    ],
  },

  KS: {
    slug: 'kansas', code: 'KS',
    statuteCitation: 'Kansas Statutes Annotated § 60-258a (modified comparative fault, 50% bar)',
    statuteShort: 'Kan. Stat. Ann. § 60-258a',
    majorHighways: ['I-70', 'I-35', 'I-135', 'US-54', 'K-96'],
    annualFatalities2022: 80,
    stateIntro:
      'Kansas applies modified comparative fault with a 50% bar — plaintiffs at exactly 50% fault cannot recover. Kansas lies at the geographic center of the contiguous United States, making it a critical pass-through for coast-to-coast freight on I-70 and north-south traffic on I-35. Kansas\'s agricultural outputs — cattle, wheat, and ethanol — generate consistent heavy truck traffic on rural routes where fatigued driving and hours-of-service violations are common factors in accidents.',
    keyFacts: [
      'Kansas applies modified comparative fault with a 50% bar — Kan. Stat. Ann. § 60-258a bars plaintiffs at exactly 50% fault',
      'Kansas recorded approximately 80 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'I-70 through Kansas is a primary cross-country freight corridor — Kansas City is one of the nation\'s largest rail-to-truck transfer hubs',
      'Kansas has a 2-year statute of limitations for personal injury claims (Kan. Stat. Ann. § 60-513)',
    ],
  },

  KY: {
    slug: 'kentucky', code: 'KY',
    statuteCitation: 'Kentucky Revised Statutes Annotated § 411.182 (pure comparative fault)',
    statuteShort: 'Ky. Rev. Stat. Ann. § 411.182',
    majorHighways: ['I-64', 'I-65', 'I-71', 'I-75', 'US-60'],
    annualFatalities2022: 120,
    stateIntro:
      'Kentucky follows pure comparative fault, allowing truck accident victims to recover compensation regardless of their percentage of fault. Kentucky sits at a critical Midwest freight crossroads — I-65 is the primary north-south corridor between Chicago and Nashville, while I-64 provides east-west access through Louisville and Lexington. The Louisville/Jefferson County metro area is home to UPS\'s Worldport facility, the largest automated package handling system in the world, generating enormous local truck volumes.',
    keyFacts: [
      'Kentucky follows pure comparative fault — Ky. Rev. Stat. Ann. § 411.182 allows recovery regardless of plaintiff fault percentage',
      'Kentucky recorded approximately 120 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'UPS\'s Worldport in Louisville is the largest automated package handling facility in the world — generating enormous truck volumes on I-65 and I-264',
      'Kentucky has a 1-year statute of limitations for personal injury claims (Ky. Rev. Stat. Ann. § 413.140)',
    ],
    specialNote:
      'TIME-SENSITIVE: Kentucky has a 1-year statute of limitations for personal injury claims (Ky. Rev. Stat. Ann. § 413.140) — one of the shortest deadlines in the nation. If your accident was more than 10 months ago, consult an attorney immediately to protect your right to file.',
  },

  LA: {
    slug: 'louisiana', code: 'LA',
    statuteCitation: 'Louisiana Civil Code Article 2323 (pure comparative fault)',
    statuteShort: 'La. Civ. Code art. 2323',
    majorHighways: ['I-10', 'I-20', 'I-49', 'I-12', 'US-90'],
    annualFatalities2022: 131,
    truckFatalitiesNote:
      'Louisiana recorded approximately 131 large truck fatalities in 2022. The I-10 corridor through Baton Rouge and the New Orleans port area generates some of the highest commercial truck volumes in the Gulf South (NHTSA FARS 2022).',
    stateIntro:
      'Louisiana follows pure comparative fault under Louisiana Civil Code Article 2323 — truck accident victims can recover damages regardless of their fault percentage. Louisiana also operates under the Civil Law tradition rather than Common Law, making its tort system distinct from all other US states. The Port of South Louisiana is the largest port in the Western Hemisphere by tonnage, and the petrochemical corridor along the Mississippi River ("Cancer Alley") generates enormous HAZMAT tanker truck volumes.',
    keyFacts: [
      'Louisiana follows pure comparative fault — La. Civ. Code art. 2323 allows recovery regardless of plaintiff fault percentage',
      'Louisiana recorded approximately 131 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'The Port of South Louisiana is the largest port in the Western Hemisphere by tonnage — driving massive truck freight volumes through the I-10 and US-90 corridors',
      'Louisiana\'s petrochemical "Cancer Alley" corridor along the Mississippi River generates significant HAZMAT tanker truck traffic between Baton Rouge and New Orleans',
      'Louisiana has a 1-year statute of limitations (prescription period) for personal injury claims (La. Civ. Code art. 3492)',
    ],
    specialNote:
      'TIME-SENSITIVE: Louisiana has a 1-year prescription period (statute of limitations) for personal injury claims under La. Civ. Code art. 3492 — one of the shortest deadlines in the nation. If your accident was more than 10 months ago, consult an attorney immediately.',
  },

  ME: {
    slug: 'maine', code: 'ME',
    statuteCitation: 'Maine Revised Statutes, Title 14, § 156 (modified comparative fault, 50% bar)',
    statuteShort: 'Me. Rev. Stat. tit. 14, § 156',
    majorHighways: ['I-95 (Maine Turnpike)', 'I-295', 'US-1', 'US-2', 'SR-9'],
    annualFatalities2022: 25,
    stateIntro:
      'Maine applies modified comparative fault with a 50% bar — plaintiffs at exactly 50% fault cannot recover. Maine\'s highway system centers on I-95 (the Maine Turnpike) running from Kittery to Augusta. Maine\'s timber, paper, and agricultural freight generates heavy truck traffic on rural routes, where trucks traveling at highway speeds on two-lane roads with poor sight lines present elevated accident risk.',
    keyFacts: [
      'Maine applies modified comparative fault with a 50% bar — Me. Rev. Stat. tit. 14, § 156',
      'Maine recorded approximately 25 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'Maine\'s timber and paper industry generates heavy logging truck traffic on rural state routes — many accidents involve heavily loaded log trucks on winding two-lane roads',
      'Maine has a 6-year statute of limitations for personal injury claims (Me. Rev. Stat. tit. 14, § 752) — one of the longest in the nation',
    ],
  },

  MD: {
    slug: 'maryland', code: 'MD',
    statuteCitation: 'Maryland Code Annotated, Courts & Judicial Proceedings § 3-1401 (contributory negligence)',
    statuteShort: 'Md. Code Ann., Cts. & Jud. Proc. § 3-1401',
    majorHighways: ['I-95', 'I-270', 'I-695 (Baltimore Beltway)', 'I-70', 'US-50'],
    annualFatalities2022: 100,
    truckFatalitiesNote:
      'Maryland recorded approximately 100 large truck fatalities in 2022. The I-95 Baltimore-Washington corridor is one of the most congested freight chokepoints on the entire East Coast (NHTSA FARS 2022).',
    stateIntro:
      'Maryland is one of only four states still applying contributory negligence — any fault on your part bars all recovery, regardless of how small your percentage of fault may be. The I-95 corridor through Baltimore is a critical freight chokepoint between the Port of Baltimore and the Northeast, while the Port of Baltimore itself is the top US port for auto imports and handles significant container freight. This combination of a plaintiff-unfriendly liability rule and high freight volumes makes attorney representation especially important in Maryland.',
    keyFacts: [
      'Maryland follows contributory negligence — any fault on your part, even 1%, completely bars all recovery under Maryland case law',
      'Maryland recorded approximately 100 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'The Port of Baltimore is the top US port for auto/light truck imports and a major container terminal — generating substantial drayage traffic through I-95 and I-695',
      'The I-95 Baltimore-Washington corridor is consistently ranked among the most congested freight routes on the East Coast',
      'Maryland has a 3-year statute of limitations for personal injury claims (Md. Code Ann., Cts. & Jud. Proc. § 5-101)',
    ],
    specialNote:
      'CRITICAL: Maryland follows contributory negligence — if you are found even 1% at fault for the accident, you may recover nothing under Maryland law. This is one of the harshest liability rules in the US. Consult an attorney immediately before making any statements to the carrier\'s insurer.',
  },

  MA: {
    slug: 'massachusetts', code: 'MA',
    statuteCitation: 'Massachusetts General Laws Chapter 231, § 85 (modified comparative fault, 51% bar)',
    statuteShort: 'Mass. Gen. Laws ch. 231, § 85',
    majorHighways: ['I-90 (Mass Pike)', 'I-93', 'I-95', 'I-495', 'Route 128'],
    annualFatalities2022: 41,
    stateIntro:
      'Massachusetts applies modified comparative fault with a 51% bar. The Mass Pike (I-90) is the primary freight corridor from Boston westward, while I-93 and I-95 handle the heavy freight volumes generated by the Port of Boston and New England\'s distribution network. Massachusetts\'s dense urban environment and complex interchange systems make truck accident litigation particularly fact-intensive, often requiring accident reconstruction experts.',
    keyFacts: [
      'Massachusetts applies modified comparative fault with a 51% bar — Mass. Gen. Laws ch. 231, § 85',
      'Massachusetts recorded approximately 41 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'The Port of Boston handles significant container and bulk freight, driving truck volumes through the I-93 and Route 1A corridors',
      'Massachusetts has a 3-year statute of limitations for personal injury claims (Mass. Gen. Laws ch. 260, § 2A)',
    ],
  },

  MI: {
    slug: 'michigan', code: 'MI',
    statuteCitation: 'Michigan Compiled Laws § 600.2959 (modified comparative fault, 51% bar)',
    statuteShort: 'Mich. Comp. Laws § 600.2959',
    majorHighways: ['I-94', 'I-75', 'I-96', 'I-69', 'US-23'],
    annualFatalities2022: 129,
    truckFatalitiesNote:
      'Michigan recorded approximately 129 large truck fatalities in 2022. The Detroit metro area\'s auto industry drives enormous just-in-time parts delivery truck volumes through I-75 and I-94 (NHTSA FARS 2022).',
    stateIntro:
      'Michigan applies modified comparative fault with a 51% bar. Michigan\'s economy is defined by automotive manufacturing — the just-in-time parts delivery system operated by Ford, GM, and Stellantis creates enormous truck volumes through Detroit\'s I-75 and I-94 corridors. The Ambassador Bridge in Detroit is the busiest US-Canada commercial crossing in North America, handling 25% of all US-Canada surface trade.',
    keyFacts: [
      'Michigan applies modified comparative fault with a 51% bar — Mich. Comp. Laws § 600.2959',
      'Michigan recorded approximately 129 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'The Ambassador Bridge (Detroit-Windsor) handles approximately 25% of all US-Canada surface trade — generating massive truck volumes through Detroit\'s I-75 and I-94 corridors',
      'Michigan\'s auto industry just-in-time parts delivery system drives continuous round-the-clock truck traffic through the Metro Detroit highway network',
      'Michigan has a 3-year statute of limitations for personal injury claims (Mich. Comp. Laws § 600.5805)',
    ],
  },

  MN: {
    slug: 'minnesota', code: 'MN',
    statuteCitation: 'Minnesota Statutes § 604.01 (modified comparative fault, 51% bar)',
    statuteShort: 'Minn. Stat. § 604.01',
    majorHighways: ['I-94', 'I-35', 'I-90', 'I-494', 'US-61'],
    annualFatalities2022: 74,
    stateIntro:
      'Minnesota applies modified comparative fault with a 51% bar. The Twin Cities metro area is the largest freight hub in the Upper Midwest, with the convergence of I-94, I-35, and I-494 creating some of the region\'s highest truck density. Minnesota\'s agricultural freight — corn, soybeans, and dairy — and the Port of Duluth (the largest inland port in the US) generate substantial commercial truck volumes, including significant grain and ore haulers on rural routes.',
    keyFacts: [
      'Minnesota applies modified comparative fault with a 51% bar — Minn. Stat. § 604.01',
      'Minnesota recorded approximately 74 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'The Port of Duluth is the largest inland port in the US, shipping iron ore and grain — with connecting truck freight on US-61 and I-35',
      'Minnesota has a 2-year statute of limitations for personal injury claims (Minn. Stat. § 541.07)',
    ],
  },

  MS: {
    slug: 'mississippi', code: 'MS',
    statuteCitation: 'Mississippi Code Annotated § 11-7-15 (pure comparative fault)',
    statuteShort: 'Miss. Code Ann. § 11-7-15',
    majorHighways: ['I-20', 'I-55', 'I-59', 'US-61', 'US-49'],
    annualFatalities2022: 121,
    truckFatalitiesNote:
      'Mississippi recorded approximately 121 large truck fatalities in 2022. The I-55 corridor paralleling the Mississippi River and the I-20 east-west corridor carry significant regional freight volumes (NHTSA FARS 2022).',
    stateIntro:
      'Mississippi follows pure comparative fault — truck accident victims can recover damages regardless of their fault percentage. Mississippi\'s highway network lies at the intersection of mid-South freight flows, with the Mississippi River corridor (I-55 and US-61) carrying regional agricultural and manufacturing freight. The state\'s recovering industrial base in the Gulf Coast and automotive manufacturing corridor (Nissan in Canton, Toyota in Blue Springs) generate significant just-in-time parts delivery truck traffic.',
    keyFacts: [
      'Mississippi follows pure comparative fault — Miss. Code Ann. § 11-7-15 allows recovery regardless of plaintiff fault percentage',
      'Mississippi recorded approximately 121 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'The Port of Gulfport and Mississippi River port system generate significant freight truck volumes along the Gulf Coast corridor',
      'Mississippi has a 3-year statute of limitations for personal injury claims (Miss. Code Ann. § 15-1-49)',
    ],
  },

  MO: {
    slug: 'missouri', code: 'MO',
    statuteCitation: 'Missouri Revised Statutes § 537.765 (pure comparative fault)',
    statuteShort: 'Mo. Rev. Stat. § 537.765',
    majorHighways: ['I-70', 'I-44', 'I-55', 'I-64', 'I-270'],
    annualFatalities2022: 144,
    truckFatalitiesNote:
      'Missouri recorded approximately 144 large truck fatalities in 2022. St. Louis\'s position at the confluence of I-70, I-55, I-64, and I-44 makes it one of the major freight crossroads in the central US (NHTSA FARS 2022).',
    stateIntro:
      'Missouri follows pure comparative fault — truck accident victims can recover damages regardless of their fault percentage. St. Louis sits at one of the most important freight crossroads in the nation: the convergence of I-70 (cross-country east-west), I-55 (Chicago-to-Gulf), I-44 (to Oklahoma), and I-64 gives Missouri outsized freight importance. Kansas City is also a major rail-to-truck transfer hub, second only to Chicago in the Midwest.',
    keyFacts: [
      'Missouri follows pure comparative fault — Mo. Rev. Stat. § 537.765 allows recovery regardless of plaintiff fault percentage',
      'Missouri recorded approximately 144 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'St. Louis is one of the central US\'s most important freight crossroads, with I-70, I-55, I-44, and I-64 converging in the metro area',
      'Kansas City is the second-largest rail hub in the US after Chicago — generating substantial truck-to-rail freight transfer volumes',
      'Missouri has a 5-year statute of limitations for personal injury claims (Mo. Rev. Stat. § 516.120)',
    ],
  },

  MT: {
    slug: 'montana', code: 'MT',
    statuteCitation: 'Montana Code Annotated § 27-1-702 (pure comparative fault)',
    statuteShort: 'Mont. Code Ann. § 27-1-702',
    majorHighways: ['I-90', 'I-15', 'US-2', 'US-93', 'US-89'],
    annualFatalities2022: 51,
    stateIntro:
      'Montana follows pure comparative fault — truck accident victims can recover damages regardless of their fault percentage. Montana\'s vast distances and limited highway network create unique trucking conditions: long stretches of rural two-lane highways, extreme weather conditions, and significant agricultural freight from the grain-producing Hi-Line corridor. Montana also has no urban area speed limits — its open highway speed limits are among the highest in the nation, increasing accident severity.',
    keyFacts: [
      'Montana follows pure comparative fault — Mont. Code Ann. § 27-1-702 allows recovery regardless of plaintiff fault percentage',
      'Montana recorded approximately 51 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'Montana\'s agricultural Hi-Line corridor generates heavy grain truck traffic — often involving wide-load agricultural equipment on two-lane US-2',
      'Montana has a 3-year statute of limitations for personal injury claims (Mont. Code Ann. § 27-2-204)',
    ],
  },

  NE: {
    slug: 'nebraska', code: 'NE',
    statuteCitation: 'Nebraska Revised Statutes § 25-21,185.09 (modified comparative fault, 50% bar)',
    statuteShort: 'Neb. Rev. Stat. § 25-21,185.09',
    majorHighways: ['I-80', 'I-76', 'US-30', 'US-20', 'US-81'],
    annualFatalities2022: 55,
    stateIntro:
      'Nebraska applies modified comparative fault with a 50% bar — plaintiffs at exactly 50% fault cannot recover. I-80 runs the entire width of Nebraska on the historic Platte River valley route, serving as the primary cross-country freight corridor through the Great Plains. Nebraska\'s agricultural outputs — corn, soybeans, cattle, and ethanol — generate consistent heavy truck traffic, and the state is home to significant Union Pacific Railroad freight operations with connecting truck logistics.',
    keyFacts: [
      'Nebraska applies modified comparative fault with a 50% bar — Neb. Rev. Stat. § 25-21,185.09',
      'Nebraska recorded approximately 55 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'I-80 through Nebraska follows the historic Platte River valley route — one of the primary cross-country freight corridors in the Great Plains',
      'Nebraska has a 4-year statute of limitations for personal injury claims (Neb. Rev. Stat. § 25-207)',
    ],
  },

  NV: {
    slug: 'nevada', code: 'NV',
    statuteCitation: 'Nevada Revised Statutes § 41.141 (modified comparative fault, 51% bar)',
    statuteShort: 'N.R.S. § 41.141',
    majorHighways: ['I-15', 'I-80', 'US-95', 'US-93', 'SR-215'],
    annualFatalities2022: 62,
    stateIntro:
      'Nevada applies modified comparative fault with a 51% bar — plaintiffs at 51% or more fault cannot recover. I-15 through Las Vegas is one of the nation\'s most heavily traveled freight corridors connecting Southern California to the Mountain West and beyond. Nevada\'s gaming and hospitality industry drives significant hotel supply and food service truck volumes through Las Vegas\'s urban corridor, while I-80 carries cross-country freight through Reno and the Sierra Nevada.',
    keyFacts: [
      'Nevada\'s 51% bar means a plaintiff at 50% fault still recovers 50% of their damages',
      'Nevada recorded approximately 62 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'I-15 through Las Vegas carries significant freight traffic between Southern California and the Intermountain West',
      'The Nevada-California border on I-15 near Jean is one of the busiest commercial vehicle inspection corridors in the West',
      'Nevada has a 2-year statute of limitations for personal injury claims (N.R.S. § 11.190)',
    ],
  },

  NH: {
    slug: 'new-hampshire', code: 'NH',
    statuteCitation: 'New Hampshire Revised Statutes Annotated § 507:7-d (modified comparative fault, 51% bar)',
    statuteShort: 'N.H. Rev. Stat. Ann. § 507:7-d',
    majorHighways: ['I-93', 'I-89', 'I-95', 'US-3', 'NH-101'],
    annualFatalities2022: 21,
    stateIntro:
      'New Hampshire applies modified comparative fault with a 51% bar. I-93 from Manchester to Concord is the primary freight corridor through the state, with I-95 in the short coastal corridor handling heavy truck volumes between Boston and Portland. New Hampshire\'s manufacturing base and distribution centers in the Manchester-Nashua corridor generate consistent commercial truck traffic.',
    keyFacts: [
      'New Hampshire applies modified comparative fault with a 51% bar — N.H. Rev. Stat. Ann. § 507:7-d',
      'New Hampshire recorded approximately 21 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'The Manchester-Nashua corridor is a significant distribution hub for New England, generating consistent commercial truck traffic on I-93',
      'New Hampshire has a 3-year statute of limitations for personal injury claims (N.H. Rev. Stat. Ann. § 508:4)',
    ],
  },

  NJ: {
    slug: 'new-jersey', code: 'NJ',
    statuteCitation: 'New Jersey Statutes Annotated § 2A:15-5.1 (modified comparative fault, 51% bar)',
    statuteShort: 'N.J. Stat. Ann. § 2A:15-5.1',
    majorHighways: ['I-95 (New Jersey Turnpike)', 'I-78', 'I-80', 'I-287', 'Garden State Parkway'],
    annualFatalities2022: 82,
    truckFatalitiesNote:
      'New Jersey recorded approximately 82 large truck fatalities in 2022. The New Jersey Turnpike is one of the highest-volume, most commercially significant toll roads in the United States (NHTSA FARS 2022).',
    stateIntro:
      'New Jersey applies modified comparative fault with a 51% bar. The New Jersey Turnpike (I-95) is one of the most heavily trafficked freight corridors in the nation — Port Newark-Elizabeth Marine Terminal is the largest container port on the East Coast, generating massive drayage truck volumes through the Turnpike\'s industrial truck section. New Jersey\'s dense highway network and complex interchange systems make truck accident reconstruction particularly important.',
    keyFacts: [
      'New Jersey applies modified comparative fault with a 51% bar — N.J. Stat. Ann. § 2A:15-5.1',
      'New Jersey recorded approximately 82 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'Port Newark-Elizabeth Marine Terminal is the largest container port on the East Coast, generating enormous drayage truck volumes through the NJ Turnpike\'s industrial section',
      'The NJ Turnpike and Garden State Parkway together form one of the busiest toll road systems in the world',
      'New Jersey has a 2-year statute of limitations for personal injury claims (N.J. Stat. Ann. § 2A:14-2)',
    ],
  },

  NM: {
    slug: 'new-mexico', code: 'NM',
    statuteCitation: 'New Mexico Statutes Annotated § 41-3A-1 (pure comparative fault)',
    statuteShort: 'N.M. Stat. Ann. § 41-3A-1',
    majorHighways: ['I-40', 'I-25', 'I-10', 'US-54', 'US-285'],
    annualFatalities2022: 90,
    stateIntro:
      'New Mexico follows pure comparative fault — truck accident victims can recover damages regardless of their fault percentage. New Mexico sits at the intersection of two major transcontinental routes: I-40 (the old Route 66 corridor) and I-25 connecting Colorado to El Paso and the Mexican border. Cross-border freight through El Paso and the Columbus, NM ports of entry generates significant HAZMAT and manufactured goods truck traffic on I-10 and I-25.',
    keyFacts: [
      'New Mexico follows pure comparative fault — N.M. Stat. Ann. § 41-3A-1 allows recovery regardless of plaintiff fault percentage',
      'New Mexico recorded approximately 90 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'I-40 (historic Route 66 corridor) and I-25 carry significant transcontinental freight and cross-border Mexico trade through New Mexico',
      'New Mexico has a 3-year statute of limitations for personal injury claims (N.M. Stat. Ann. § 37-1-8)',
    ],
  },

  NY: {
    slug: 'new-york', code: 'NY',
    statuteCitation: 'New York Civil Practice Law and Rules (CPLR) § 1411 (pure comparative fault)',
    statuteShort: 'CPLR § 1411',
    majorHighways: ['I-87 (NYS Thruway)', 'I-90', 'I-95', 'I-78', 'Route 17'],
    annualFatalities2022: 168,
    stateIntro:
      'New York follows pure comparative fault under CPLR § 1411 — truck accident victims can recover damages regardless of their fault percentage. New York City\'s five boroughs generate the highest local truck delivery density in the nation, with last-mile freight for millions of residents concentrated on dense urban street networks. The NYS Thruway (I-87/I-90) connects New York City to upstate freight markets and the Canadian border.',
    keyFacts: [
      'New York follows pure comparative fault — CPLR § 1411 allows recovery regardless of plaintiff\'s fault percentage',
      'New York City\'s five boroughs generate some of the highest local truck delivery densities in the nation',
      'New York has a 3-year personal injury statute of limitations — longer than most states',
      'New York recorded approximately 168 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'The Port of New York and New Jersey is the third-largest container port in the US, generating significant freight truck volumes through the NJ Turnpike and NYC metro bridges',
    ],
  },

  NC: {
    slug: 'north-carolina', code: 'NC',
    statuteCitation: 'North Carolina General Statutes § 99B-4 (contributory negligence)',
    statuteShort: 'N.C.G.S. § 99B-4',
    majorHighways: ['I-85', 'I-95', 'I-40', 'I-77', 'US-74'],
    annualFatalities2022: 178,
    stateIntro:
      'North Carolina is one of only four states still applying the harsh contributory negligence doctrine — any fault on your part, even 1%, bars all recovery. North Carolina\'s manufacturing and logistics corridor stretching from Charlotte through Greensboro to Raleigh generates significant freight along I-85 and I-40, with numerous distribution centers and automotive manufacturing plants creating consistent heavy truck demand.',
    keyFacts: [
      'North Carolina is one of only four states that still uses contributory negligence — any fault bars all recovery',
      'The Charlotte-Greensboro-Raleigh manufacturing corridor generates significant freight along I-85 and I-40',
      'North Carolina recorded approximately 178 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'North Carolina has a 3-year statute of limitations for personal injury claims (N.C.G.S. § 1-52)',
    ],
    specialNote:
      'CRITICAL: North Carolina follows contributory negligence — if you are found even 1% at fault for the accident, you may recover nothing under North Carolina law. This is one of the harshest liability rules in the US. Consult an attorney before making any statements to the carrier\'s insurer or signing any documents.',
  },

  ND: {
    slug: 'north-dakota', code: 'ND',
    statuteCitation: 'North Dakota Century Code § 32-03.2-02 (modified comparative fault, 50% bar)',
    statuteShort: 'N.D. Cent. Code § 32-03.2-02',
    majorHighways: ['I-94', 'I-29', 'US-2', 'US-83', 'US-85'],
    annualFatalities2022: 29,
    stateIntro:
      'North Dakota applies modified comparative fault with a 50% bar. The Bakken oil formation in western North Dakota transformed the state\'s trucking landscape — water, sand, crude oil, and equipment transport associated with oil extraction drove a major surge in heavy truck activity on rural state routes. I-94 running west from Fargo to Bismarck is the primary freight corridor, with agricultural grain trucks serving as the other primary freight category.',
    keyFacts: [
      'North Dakota applies modified comparative fault with a 50% bar — N.D. Cent. Code § 32-03.2-02',
      'North Dakota recorded approximately 29 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'The Bakken oil formation in western North Dakota drives substantial oilfield trucking — water haul, fracking sand, crude oil tankers, and oversized equipment loads',
      'North Dakota has a 6-year statute of limitations for personal injury claims (N.D. Cent. Code § 28-01-16)',
    ],
  },

  OH: {
    slug: 'ohio', code: 'OH',
    statuteCitation: 'Ohio Revised Code § 2315.33 (modified comparative fault, 51% bar)',
    statuteShort: 'O.R.C. § 2315.33',
    majorHighways: ['I-75', 'I-71', 'I-77', 'I-80 (Ohio Turnpike)', 'I-90'],
    annualFatalities2022: 181,
    truckFatalitiesNote:
      'Ohio is a major freight crossroads. I-75 through Dayton and Toledo and the Ohio Turnpike (I-80) serve as the primary north-south and east-west corridors for Midwest freight distribution.',
    stateIntro:
      'Ohio applies modified comparative fault with a 51% bar. Ohio is the most geographically central state for Midwest freight distribution — within 500 miles of 60% of the US population — making it a critical crossroads for national supply chains. The Ohio Turnpike (I-80) carries enormous east-west freight volumes, while I-75 through Dayton and Toledo is the primary north-south corridor connecting Michigan\'s auto industry to the South.',
    keyFacts: [
      'Ohio is the most geographically central state for Midwest freight distribution — within 500 miles of 60% of the US population',
      'Ohio\'s 51% bar was established by Ohio Revised Code § 2315.33 in 2005 tort reform',
      'Columbus, Ohio\'s distribution center cluster (I-70/I-71 interchange) is among the most active freight hubs in the Midwest',
      'Ohio recorded approximately 181 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'Ohio has a 2-year statute of limitations for personal injury claims (O.R.C. § 2305.10)',
    ],
  },

  OK: {
    slug: 'oklahoma', code: 'OK',
    statuteCitation: 'Oklahoma Statutes, Title 23, § 13 (modified comparative fault, 51% bar)',
    statuteShort: 'Okla. Stat. tit. 23, § 13',
    majorHighways: ['I-40', 'I-35', 'I-44', 'US-69', 'US-75'],
    annualFatalities2022: 125,
    truckFatalitiesNote:
      'Oklahoma recorded approximately 125 large truck fatalities in 2022. The I-40 corridor through Oklahoma City and the I-35 north-south corridor are among the highest-volume truck routes in the South-Central region (NHTSA FARS 2022).',
    stateIntro:
      'Oklahoma applies modified comparative fault with a 51% bar. Oklahoma\'s position at the crossroads of I-40 (the principal southern transcontinental route) and I-35 (the primary NAFTA corridor north of Texas) makes it a high-volume freight state. Oklahoma\'s oil and gas industry also drives significant HAZMAT tanker and oilfield equipment truck traffic on rural state routes.',
    keyFacts: [
      'Oklahoma applies modified comparative fault with a 51% bar — Okla. Stat. tit. 23, § 13',
      'Oklahoma recorded approximately 125 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'I-40 and I-35 converge in Oklahoma City — creating one of the most important freight intersections in the South-Central US',
      'Oklahoma\'s oil and gas industry drives significant HAZMAT tanker and oilfield equipment truck traffic on rural state routes',
      'Oklahoma has a 2-year statute of limitations for personal injury claims (Okla. Stat. tit. 12, § 95)',
    ],
  },

  OR: {
    slug: 'oregon', code: 'OR',
    statuteCitation: 'Oregon Revised Statutes § 31.600 (modified comparative fault, 51% bar)',
    statuteShort: 'Or. Rev. Stat. § 31.600',
    majorHighways: ['I-5', 'I-84', 'I-205', 'US-97', 'US-101'],
    annualFatalities2022: 75,
    stateIntro:
      'Oregon applies modified comparative fault with a 51% bar. I-5 is Oregon\'s primary freight corridor, connecting Seattle to California through Portland — the largest city in the Pacific Northwest. I-84 through the Columbia River Gorge carries significant agricultural and manufacturing freight between Portland and the Mountain West. The Port of Portland and the Portland metro\'s position as a regional distribution hub drive substantial truck volumes.',
    keyFacts: [
      'Oregon applies modified comparative fault with a 51% bar — Or. Rev. Stat. § 31.600',
      'Oregon recorded approximately 75 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'I-84 through the Columbia River Gorge connects Portland to the Mountain West — a critical freight corridor for agricultural and manufactured goods from the inland Northwest',
      'Oregon has a 2-year statute of limitations for personal injury claims (Or. Rev. Stat. § 12.110)',
    ],
  },

  PA: {
    slug: 'pennsylvania', code: 'PA',
    statuteCitation: '42 Pennsylvania Consolidated Statutes § 7102 (modified comparative fault, 51% bar)',
    statuteShort: '42 Pa. C.S. § 7102',
    majorHighways: ['I-76 (Pennsylvania Turnpike)', 'I-78', 'I-80', 'I-81', 'US-30'],
    annualFatalities2022: 162,
    stateIntro:
      'Pennsylvania applies modified comparative fault with a 51% bar. The Pennsylvania Turnpike (I-76) is one of the oldest and highest-volume toll truck corridors in the Northeast, connecting Ohio to New Jersey through Philadelphia. I-81 through the Lehigh Valley and Shenandoah Valley corridor carries significant northeast-to-southeast freight. Pennsylvania\'s two major metro areas — Philadelphia and Pittsburgh — have distinct court procedures that affect truck accident litigation strategy.',
    keyFacts: [
      'Pennsylvania\'s Turnpike (I-76) is one of the oldest and highest-volume toll truck corridors in the Northeast',
      'Pennsylvania\'s 51% bar rule was established by the Fair Share Act of 2011',
      'Allegheny County (Pittsburgh) and Philadelphia County courts have distinct procedural rules affecting truck accident litigation',
      'Pennsylvania recorded approximately 162 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'Pennsylvania has a 2-year statute of limitations for personal injury claims (42 Pa. C.S. § 5524)',
    ],
  },

  RI: {
    slug: 'rhode-island', code: 'RI',
    statuteCitation: 'Rhode Island General Laws § 9-20-4 (pure comparative fault)',
    statuteShort: 'R.I. Gen. Laws § 9-20-4',
    majorHighways: ['I-95', 'I-195', 'I-295', 'US-1', 'RI-4'],
    annualFatalities2022: 11,
    stateIntro:
      'Rhode Island follows pure comparative fault — truck accident victims can recover damages regardless of their fault percentage. As the smallest state in the nation, Rhode Island\'s highway network is largely defined by I-95 running through Providence. Despite its small size, Rhode Island\'s position between Boston and New York makes it a significant freight transit state, with heavy truck volumes through Providence on I-95 and I-195.',
    keyFacts: [
      'Rhode Island follows pure comparative fault — R.I. Gen. Laws § 9-20-4 allows recovery regardless of plaintiff fault percentage',
      'Rhode Island recorded approximately 11 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'Rhode Island\'s I-95 through Providence is a critical link in the Boston-to-New York freight corridor',
      'Rhode Island has a 3-year statute of limitations for personal injury claims (R.I. Gen. Laws § 9-1-14)',
    ],
  },

  SC: {
    slug: 'south-carolina', code: 'SC',
    statuteCitation: 'South Carolina Code Annotated § 15-38-15 (modified comparative fault, 51% bar)',
    statuteShort: 'S.C. Code Ann. § 15-38-15',
    majorHighways: ['I-95', 'I-26', 'I-85', 'I-77', 'US-17'],
    annualFatalities2022: 141,
    truckFatalitiesNote:
      'South Carolina recorded approximately 141 large truck fatalities in 2022. The I-26 corridor between Columbia and Charleston carries significant port freight from one of the fastest-growing container ports on the East Coast (NHTSA FARS 2022).',
    stateIntro:
      'South Carolina applies modified comparative fault with a 51% bar. The Port of Charleston is the fastest-growing major container port on the East Coast and the fourth largest by volume — generating enormous drayage truck volumes through the I-26 corridor between Charleston and Columbia. BMW\'s only US manufacturing plant in Spartanburg drives significant just-in-time parts delivery and finished vehicle transport on I-85.',
    keyFacts: [
      'South Carolina applies modified comparative fault with a 51% bar — S.C. Code Ann. § 15-38-15',
      'South Carolina recorded approximately 141 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'The Port of Charleston is the fourth-largest US container port by volume and the fastest-growing East Coast port, generating substantial drayage truck traffic through I-26',
      'BMW\'s Spartanburg plant (the largest BMW facility in the world by volume) drives significant parts delivery and vehicle transport truck volumes on I-85',
      'South Carolina has a 3-year statute of limitations for personal injury claims (S.C. Code Ann. § 15-3-530)',
    ],
  },

  SD: {
    slug: 'south-dakota', code: 'SD',
    statuteCitation: 'South Dakota Codified Laws § 20-9-2 (pure comparative fault)',
    statuteShort: 'S.D. Codified Laws § 20-9-2',
    majorHighways: ['I-90', 'I-29', 'US-83', 'US-14', 'SD-44'],
    annualFatalities2022: 35,
    stateIntro:
      'South Dakota follows pure comparative fault — truck accident victims can recover damages regardless of their fault percentage. I-90 runs the full width of South Dakota from the Wyoming border to Sioux Falls, serving as the primary freight corridor through the northern Great Plains. South Dakota\'s agricultural economy — dominated by corn, soybeans, and cattle — generates heavy seasonal truck traffic, particularly during fall harvest when grain trucks and semi-trucks share rural two-lane roads.',
    keyFacts: [
      'South Dakota follows pure comparative fault — S.D. Codified Laws § 20-9-2 allows recovery regardless of plaintiff fault percentage',
      'South Dakota recorded approximately 35 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'I-90 spans the full width of South Dakota — a primary freight corridor connecting the Pacific Northwest to the Midwest',
      'South Dakota has a 3-year statute of limitations for personal injury claims (S.D. Codified Laws § 15-2-14)',
    ],
  },

  TN: {
    slug: 'tennessee', code: 'TN',
    statuteCitation: 'Tennessee Code Annotated § 29-11-103 (modified comparative fault, 50% bar)',
    statuteShort: 'Tenn. Code Ann. § 29-11-103',
    majorHighways: ['I-40', 'I-65', 'I-24', 'I-75', 'I-81'],
    annualFatalities2022: 175,
    truckFatalitiesNote:
      'Tennessee recorded approximately 175 large truck fatalities in 2022. Memphis is the third-largest inland port in the United States and a critical FedEx hub, generating enormous freight truck volumes through I-40, I-55, and I-240 (NHTSA FARS 2022).',
    stateIntro:
      'Tennessee applies modified comparative fault with a 50% bar — plaintiffs at exactly 50% fault cannot recover. Memphis is the FedEx global hub and the third-largest inland port in the US — the resulting freight truck volumes on I-40 and I-55 are among the highest for any inland city. Nashville\'s explosive growth has also driven major distribution center development along I-65 and I-24, making Tennessee one of the most freight-intensive states in the South.',
    keyFacts: [
      'Tennessee applies modified comparative fault with a 50% bar — Tenn. Code Ann. § 29-11-103',
      'Tennessee recorded approximately 175 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'Memphis is the FedEx global superHub and the third-largest inland port in the US — generating enormous truck freight volumes on I-40 and I-55',
      'Nashville\'s growth has created one of the fastest-growing distribution center markets in the Southeast, concentrated along I-65 and I-24',
      'Tennessee has a 1-year statute of limitations for personal injury claims (Tenn. Code Ann. § 28-3-104)',
    ],
    specialNote:
      'TIME-SENSITIVE: Tennessee has a 1-year statute of limitations for personal injury claims (Tenn. Code Ann. § 28-3-104) — one of the shortest deadlines in the nation. If your accident was more than 10 months ago, consult an attorney immediately to protect your right to file.',
  },

  TX: {
    slug: 'texas', code: 'TX',
    statuteCitation: 'Texas Civil Practice & Remedies Code §§ 33.001–33.017',
    statuteShort: 'Tex. Civ. Prac. & Rem. Code § 33.001',
    majorHighways: ['I-35', 'I-10', 'I-20', 'I-45', 'I-30'],
    truckFatalityRank: 1,
    annualFatalities2022: 719,
    truckFatalitiesNote:
      'Texas recorded more large truck fatalities than any other state in 2022, accounting for over 14% of all US large-truck crash deaths (NHTSA FARS 2022).',
    stateIntro:
      'Texas leads the nation in commercial truck traffic and large truck crash fatalities. The I-35 NAFTA corridor — connecting Laredo, San Antonio, Austin, Dallas-Fort Worth, and the Oklahoma border — carries more cross-border freight than any other US highway corridor. With 719 fatal large truck crashes in 2022 and Texas Civil Practice & Remedies Code Chapter 33 governing comparative fault, understanding your rights before negotiating with a carrier\'s insurer is critical.',
    keyFacts: [
      'Texas I-35 handles roughly 40% of all US–Mexico surface freight — the highest-volume bilateral trade corridor in North America',
      'Dallas–Fort Worth is one of the top three inland freight distribution hubs in the United States',
      'Texas has no caps on non-economic damages in truck accident cases (unlike medical malpractice cases)',
      'Under Texas law (Tex. Civ. Prac. & Rem. Code § 33.003), the jury allocates fault among all responsible parties',
      'Texas permits punitive damages (exemplary damages) when a carrier acts with gross negligence — up to 2× economic damages or $750,000',
    ],
  },

  UT: {
    slug: 'utah', code: 'UT',
    statuteCitation: 'Utah Code Annotated § 78B-5-818 (modified comparative fault, 50% bar)',
    statuteShort: 'Utah Code Ann. § 78B-5-818',
    majorHighways: ['I-15', 'I-80', 'I-70', 'US-6', 'US-89'],
    annualFatalities2022: 75,
    stateIntro:
      'Utah applies modified comparative fault with a 50% bar — plaintiffs at exactly 50% fault cannot recover. I-15 through Salt Lake City is the primary freight corridor for the Intermountain West, connecting Arizona and Nevada to Idaho and Montana. Utah\'s mining industry (copper, coal, potash) generates significant heavy haul truck traffic on US-6 and rural state routes, while the distribution center cluster in the Salt Lake Valley serves as a regional logistics hub.',
    keyFacts: [
      'Utah applies modified comparative fault with a 50% bar — Utah Code Ann. § 78B-5-818',
      'Utah recorded approximately 75 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'I-15 through Salt Lake City is the primary freight corridor for the Intermountain West, connecting the Southwest to the Pacific Northwest',
      'Utah\'s mining operations (Bingham Canyon copper mine, coal mines) generate significant heavy haul truck traffic on mountain routes',
      'Utah has a 4-year statute of limitations for personal injury claims (Utah Code Ann. § 78B-2-307)',
    ],
  },

  VT: {
    slug: 'vermont', code: 'VT',
    statuteCitation: 'Vermont Statutes Annotated, Title 12, § 1036 (pure comparative fault)',
    statuteShort: 'Vt. Stat. Ann. tit. 12, § 1036',
    majorHighways: ['I-89', 'I-91', 'US-2', 'US-4', 'VT-100'],
    annualFatalities2022: 14,
    stateIntro:
      'Vermont follows pure comparative fault — truck accident victims can recover damages regardless of their fault percentage. Vermont\'s highway network centers on I-89 (Burlington to the Canadian border and south to White River Junction) and I-91 (the Connecticut River valley north-south corridor). Vermont\'s agricultural freight — dairy, maple products, and timber — generates truck traffic on rural state routes, where road conditions and winter weather significantly affect accident patterns.',
    keyFacts: [
      'Vermont follows pure comparative fault — Vt. Stat. Ann. tit. 12, § 1036 allows recovery regardless of plaintiff fault percentage',
      'Vermont recorded approximately 14 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'Vermont\'s dairy industry is the state\'s largest agricultural sector, generating consistent milk tanker and refrigerated truck traffic on rural state routes',
      'Vermont has a 3-year statute of limitations for personal injury claims (Vt. Stat. Ann. tit. 12, § 512)',
    ],
  },

  VA: {
    slug: 'virginia', code: 'VA',
    statuteCitation: 'Code of Virginia § 8.01-58 (contributory negligence)',
    statuteShort: 'Va. Code § 8.01-58',
    majorHighways: ['I-95', 'I-81', 'I-64', 'I-66', 'US-29'],
    annualFatalities2022: 145,
    stateIntro:
      'Virginia is one of only four states applying contributory negligence — any fault on your part, even 1%, bars all recovery. I-81 through the Shenandoah Valley carries some of the highest truck-per-vehicle-mile ratios of any East Coast interstate, serving as the primary north-south freight bypass for the congested I-95 corridor. The Port of Virginia in Hampton Roads is the deepest container port on the East Coast and one of the fastest-growing, generating significant drayage volumes through I-64 and I-264.',
    keyFacts: [
      'Virginia is one of only four states with contributory negligence — any fault on your part bars all recovery',
      'I-81 through the Shenandoah Valley is one of the highest truck-volume corridors in the East, with ongoing congestion and crash issues',
      'The last clear chance doctrine may allow recovery in some contributory negligence cases in Virginia',
      'Virginia recorded approximately 145 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'Virginia has a 2-year statute of limitations for personal injury claims (Va. Code § 8.01-243)',
    ],
    specialNote:
      'CRITICAL: Virginia follows contributory negligence — if you are found even 1% at fault for the accident, you may recover nothing under Virginia law. The "last clear chance" doctrine provides a narrow exception in some cases. Consult an attorney immediately before speaking with the carrier\'s insurance adjuster.',
  },

  WA: {
    slug: 'washington', code: 'WA',
    statuteCitation: 'Revised Code of Washington § 4.22.005 (pure comparative fault)',
    statuteShort: 'RCW § 4.22.005',
    majorHighways: ['I-5', 'I-90', 'US-2', 'SR-99', 'I-82'],
    annualFatalities2022: 92,
    truckFatalitiesNote:
      'Washington recorded approximately 92 large truck fatalities in 2022. The I-5 corridor from the Oregon border through Seattle to the Canadian border is the primary Pacific Northwest freight route (NHTSA FARS 2022).',
    stateIntro:
      'Washington follows pure comparative fault — truck accident victims can recover damages regardless of their fault percentage. The Port of Seattle and Port of Tacoma together form the third-largest container port complex in North America, generating enormous drayage truck volumes through I-5 and SR-99. I-90 over Snoqualmie Pass is the primary east-west freight corridor through the Cascades, subject to frequent winter closures that concentrate freight into peak periods.',
    keyFacts: [
      'Washington follows pure comparative fault — RCW § 4.22.005 allows recovery regardless of fault percentage',
      'The Port of Seattle and Port of Tacoma generate substantial freight truck volumes through I-5 and SR-99',
      'Washington recorded approximately 92 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'I-90 over Snoqualmie Pass is the primary east-west freight corridor through the Cascades — subject to seasonal closures that create freight bottlenecks',
      'Washington has a 3-year statute of limitations for personal injury claims (RCW § 4.16.080)',
    ],
  },

  WV: {
    slug: 'west-virginia', code: 'WV',
    statuteCitation: 'West Virginia Code § 55-7-13a (modified comparative fault, 51% bar, effective 2015)',
    statuteShort: 'W. Va. Code § 55-7-13a',
    majorHighways: ['I-64', 'I-77', 'I-79', 'US-119', 'US-35'],
    annualFatalities2022: 54,
    stateIntro:
      'West Virginia switched from contributory negligence to modified comparative fault with a 51% bar in 2015 — a significant plaintiff-friendly reform. West Virginia\'s highway network crosses challenging mountain terrain, with I-64, I-77, and I-79 navigating steep grades and frequent adverse weather. Coal and natural gas freight — including overweight mining equipment and energy tankers — are common on West Virginia\'s rural highway network.',
    keyFacts: [
      'West Virginia adopted modified comparative fault (51% bar) in 2015 — replacing its prior contributory negligence doctrine (W. Va. Code § 55-7-13a)',
      'West Virginia recorded approximately 54 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'West Virginia\'s mountainous terrain creates challenging conditions for heavy trucks — steep grades on I-64, I-77, and I-79 contribute to brake failure accidents',
      'West Virginia has a 2-year statute of limitations for personal injury claims (W. Va. Code § 55-2-12)',
    ],
  },

  WI: {
    slug: 'wisconsin', code: 'WI',
    statuteCitation: 'Wisconsin Statutes § 895.045 (modified comparative fault, 51% bar)',
    statuteShort: 'Wis. Stat. § 895.045',
    majorHighways: ['I-94', 'I-90', 'I-43', 'I-39', 'US-151'],
    annualFatalities2022: 74,
    stateIntro:
      'Wisconsin applies modified comparative fault with a 51% bar. I-94 through Milwaukee and Madison is the primary freight corridor, connecting Chicago to the Twin Cities. Wisconsin\'s dairy industry — the largest in the US — generates consistent milk tanker and refrigerated freight truck activity on rural state routes. The state\'s manufacturing base in Milwaukee and Green Bay also drives industrial freight volumes.',
    keyFacts: [
      'Wisconsin applies modified comparative fault with a 51% bar — Wis. Stat. § 895.045',
      'Wisconsin recorded approximately 74 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'Wisconsin is the nation\'s largest dairy state — generating consistent milk tanker and refrigerated freight truck activity on rural county roads',
      'Wisconsin has a 3-year statute of limitations for personal injury claims (Wis. Stat. § 893.54)',
    ],
  },

  WY: {
    slug: 'wyoming', code: 'WY',
    statuteCitation: 'Wyoming Statutes Annotated § 1-1-109 (modified comparative fault, 51% bar)',
    statuteShort: 'Wyo. Stat. Ann. § 1-1-109',
    majorHighways: ['I-80', 'I-25', 'I-90', 'US-26', 'US-191'],
    annualFatalities2022: 34,
    stateIntro:
      'Wyoming applies modified comparative fault with a 51% bar. I-80 through southern Wyoming — one of the highest-elevation interstates in the US — is a critical cross-country freight corridor frequently subject to extreme wind, snow, and ice closures. Wyoming\'s energy sector (coal, natural gas, oil, trona) drives significant heavy haul truck volumes on rural state routes, including oversize and overweight loads that require special permits and create road hazard conditions.',
    keyFacts: [
      'Wyoming applies modified comparative fault with a 51% bar — Wyo. Stat. Ann. § 1-1-109',
      'Wyoming recorded approximately 34 large truck fatalities in 2022 (NHTSA FARS 2022)',
      'I-80 through southern Wyoming reaches elevations over 8,000 feet — frequent closures due to extreme wind and snow concentrate freight into short windows, increasing accident risk',
      'Wyoming\'s energy sector (coal, Powder River Basin; natural gas, Green River Basin) drives substantial heavy haul truck activity on rural state routes',
      'Wyoming has a 4-year statute of limitations for personal injury claims (Wyo. Stat. Ann. § 1-3-105)',
    ],
  },
};

function makeDefault(code: string, name: string): Omit<ExtendedStateData, keyof StateData> {
  return {
    slug: name.toLowerCase().replace(/\s+/g, '-'),
    code,
    statuteCitation: `${name} personal injury comparative fault statutes`,
    statuteShort: `${name} comparative fault law`,
    majorHighways: [],
  };
}

function getExtended(code: string): Omit<ExtendedStateData, keyof StateData> {
  return EXTENDED[code] ?? makeDefault(code, STATES[code]?.name ?? code);
}

export function getStateBySlug(slug: string): ExtendedStateData | null {
  const explicitEntry = Object.entries(EXTENDED).find(([, ext]) => ext.slug === slug);
  if (explicitEntry) {
    const [code] = explicitEntry;
    const base = STATES[code];
    if (!base) return null;
    return { ...base, ...getExtended(code) };
  }
  const autoEntry = Object.entries(STATES).find(
    ([, s]) => s.name.toLowerCase().replace(/\s+/g, '-') === slug,
  );
  if (autoEntry) {
    const [code, base] = autoEntry;
    return { ...base, ...makeDefault(code, base.name) };
  }
  return null;
}

export function getStateCode(slug: string): string | null {
  const explicit = Object.entries(EXTENDED).find(([, e]) => e.slug === slug);
  if (explicit) return explicit[0];
  const auto = Object.entries(STATES).find(
    ([, s]) => s.name.toLowerCase().replace(/\s+/g, '-') === slug,
  );
  return auto?.[0] ?? null;
}

export function getAllStateSlugs(): string[] {
  const explicitSlugs = Object.values(EXTENDED).map(e => e.slug);
  const autoSlugs = Object.entries(STATES)
    .filter(([code]) => !EXTENDED[code])
    .map(([, s]) => s.name.toLowerCase().replace(/\s+/g, '-'));
  return [...explicitSlugs, ...autoSlugs];
}

// All 50 states — drives generateStaticParams and sitemap (650 pages: 50 state landings + 600 accident type pages)
export const ACTIVE_STATE_SLUGS = [
  'alabama',
  'alaska',
  'arizona',
  'arkansas',
  'california',
  'colorado',
  'connecticut',
  'delaware',
  'florida',
  'georgia',
  'hawaii',
  'idaho',
  'illinois',
  'indiana',
  'iowa',
  'kansas',
  'kentucky',
  'louisiana',
  'maine',
  'maryland',
  'massachusetts',
  'michigan',
  'minnesota',
  'mississippi',
  'missouri',
  'montana',
  'nebraska',
  'nevada',
  'new-hampshire',
  'new-jersey',
  'new-mexico',
  'new-york',
  'north-carolina',
  'north-dakota',
  'ohio',
  'oklahoma',
  'oregon',
  'pennsylvania',
  'rhode-island',
  'south-carolina',
  'south-dakota',
  'tennessee',
  'texas',
  'utah',
  'vermont',
  'virginia',
  'washington',
  'west-virginia',
  'wisconsin',
  'wyoming',
];
