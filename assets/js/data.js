/**
 * State registry for Nodal (auto + truck). Scales to thousands of pages by adding keys.
 *
 * How to add a new state (5k+ page roadmap):
 * 1. Append a new key (lowercase snake, e.g. "new_state") to the stateData object.
 * 2. Include both "auto" and "truck" objects; truck must have name, statute, law_type,
 *    major_highway, state_sol, crash_stats, weather_factor, settlement_complexity, carrier_tactic.
 * 3. Do NOT repeat fmcsa_code or min_insurance on truck rows—use FEDERAL_TRUCK_DEFAULTS via app.js.
 * 4. Run: node scripts/build-truck-pages.mjs
 */

const stateData = {
    "alabama": {
        "auto": {
            "name": "Alabama",
            "statute": "Ala. Code § 6-5-410",
            "law_type": "Contributory Negligence"
        },
        "truck": {
            "name": "Alabama",
            "statute": "Ala. Code § 6-5-410",
            "law_type": "Contributory Negligence",
            "major_highway": "I-20 / I-65",
            "state_sol": "2 years",
            "crash_stats": "Roughly 11,200 truck-involved crashes are logged statewide each year.",
            "weather_factor": "Heavy rain and storm cells: a recurring constraint on stopping distance and sight lines.",
            "settlement_complexity": "Critical",
            "carrier_tactic": "Aggressive liability denial emphasizing contributory fault standards"
        }
    },
    "alaska": {
        "auto": {
            "name": "Alaska",
            "statute": "Alaska Stat. § 09.17.060",
            "law_type": "Pure Comparative Negligence"
        },
        "truck": {
            "name": "Alaska",
            "statute": "Alaska Stat. § 09.17.060",
            "law_type": "Pure Comparative Negligence",
            "major_highway": "AK-1 / AK-3",
            "state_sol": "2 years",
            "crash_stats": "Each year, agencies record on the order of 1,200 heavy-truck collisions.",
            "weather_factor": "Exposure profile—black ice and low-visibility snow—drives elevated loss frequency.",
            "settlement_complexity": "Moderate",
            "carrier_tactic": "Algorithm-driven settlement suppression before discovery matures"
        }
    },
    "arizona": {
        "auto": {
            "name": "Arizona",
            "statute": "Ariz. Rev. Stat. § 12-2505",
            "law_type": "Pure Comparative Negligence"
        },
        "truck": {
            "name": "Arizona",
            "statute": "Ariz. Rev. Stat. § 12-2505",
            "law_type": "Pure Comparative Negligence",
            "major_highway": "I-10 / I-40",
            "state_sol": "2 years",
            "crash_stats": "About 13,400 CMV crashes appear in annual crash extracts.",
            "weather_factor": "Carriers routinely cite extreme heat and tire blowout risk when contesting speed and spacing.",
            "settlement_complexity": "Moderate",
            "carrier_tactic": "Comparative-fault spreadsheets targeting speed-and-spacing narratives"
        }
    },
    "arkansas": {
        "auto": {
            "name": "Arkansas",
            "statute": "Ark. Code § 16-64-122",
            "law_type": "Modified Comparative Fault"
        },
        "truck": {
            "name": "Arkansas",
            "statute": "Ark. Code § 16-64-122",
            "law_type": "Modified Comparative Fault",
            "major_highway": "I-30 / I-40",
            "state_sol": "3 years",
            "crash_stats": "Yearly data shows ~8,900 police-reported truck-related incidents.",
            "weather_factor": "What insurers emphasize: heavy rain and flash flooding.",
            "settlement_complexity": "High",
            "carrier_tactic": "Modified-comparative discounting on multi-vehicle corridor losses"
        }
    },
    "california": {
        "auto": {
            "name": "California",
            "statute": "CA Civ. Code § 1714",
            "law_type": "Pure Comparative Negligence"
        },
        "truck": {
            "name": "California",
            "statute": "CA Civ. Code § 1714",
            "law_type": "Pure Comparative Negligence",
            "major_highway": "I-5 / I-10",
            "state_sol": "2 years",
            "crash_stats": "The state tallies approximately 36,000 truck-involved crashes per annum.",
            "weather_factor": "Weather drag shows up as coastal fog and mountain grade braking.",
            "settlement_complexity": "Moderate",
            "carrier_tactic": "Reserve compression anchored to fleet-average severity curves"
        }
    },
    "colorado": {
        "auto": {
            "name": "Colorado",
            "statute": "Colo. Rev. Stat. § 13-21-111",
            "law_type": "Modified Comparative Fault"
        },
        "truck": {
            "name": "Colorado",
            "statute": "Colo. Rev. Stat. § 13-21-111",
            "law_type": "Modified Comparative Fault",
            "major_highway": "I-25 / I-70",
            "state_sol": "3 years",
            "crash_stats": "Expect near 9,500 truck collisions annually in reporting systems.",
            "weather_factor": "Underwriters anchor narratives to snowpack and steep descent corridors.",
            "settlement_complexity": "High",
            "carrier_tactic": "Mountain-grade and braking narratives that underweight maintenance faults"
        }
    },
    "connecticut": {
        "auto": {
            "name": "Connecticut",
            "statute": "Conn. Gen. Stat. § 52-572h",
            "law_type": "Modified Comparative Fault"
        },
        "truck": {
            "name": "Connecticut",
            "statute": "Conn. Gen. Stat. § 52-572h",
            "law_type": "Modified Comparative Fault",
            "major_highway": "I-84 / I-95",
            "state_sol": "2 years",
            "crash_stats": "Crash volumes hover around 5,200 truck-involved events yearly.",
            "weather_factor": "Loss teams model freeze-thaw pavement hazards as a first-order hazard.",
            "settlement_complexity": "High",
            "carrier_tactic": "Urban-density fault allocation inflating plaintiff comparative percentages"
        }
    },
    "delaware": {
        "auto": {
            "name": "Delaware",
            "statute": "Del. Code tit. 10, § 8132",
            "law_type": "Modified Comparative Fault"
        },
        "truck": {
            "name": "Delaware",
            "statute": "Del. Code tit. 10, § 8132",
            "law_type": "Modified Comparative Fault",
            "major_highway": "I-95 / DE-1",
            "state_sol": "2 years",
            "crash_stats": "Sustained exposure: ~2,700 truck crashes tracked each calendar year.",
            "weather_factor": "Corridor risk concentrates around coastal rain and wind gusts.",
            "settlement_complexity": "High",
            "carrier_tactic": "Quick-close packages with broad general releases before experts engage"
        }
    },
    "florida": {
        "auto": {
            "name": "Florida",
            "statute": "Fla. Stat. § 768.81",
            "law_type": "Modified Comparative Fault"
        },
        "truck": {
            "name": "Florida",
            "statute": "Fla. Stat. § 768.81",
            "law_type": "Modified Comparative Fault",
            "major_highway": "I-4 / I-95",
            "state_sol": "2 years",
            "crash_stats": "32,000 truck-involved crashes surface in the most recent annual cohorts.",
            "weather_factor": "You should expect arguments about hydroplaning and hurricane season.",
            "settlement_complexity": "High",
            "carrier_tactic": "Catastrophe-season hurry-up tenders with confidentiality riders"
        }
    },
    "georgia": {
        "auto": {
            "name": "Georgia",
            "statute": "O.C.G.A. § 51-12-33",
            "law_type": "Modified Comparative Fault"
        },
        "truck": {
            "name": "Georgia",
            "statute": "O.C.G.A. § 51-12-33",
            "law_type": "Modified Comparative Fault",
            "major_highway": "I-75 / I-85",
            "state_sol": "2 years",
            "crash_stats": "Annually, figures land near 24,000 heavy-commercial vehicle crashes.",
            "weather_factor": "Defense bundles often lead with freight congestion and storm runoff.",
            "settlement_complexity": "High",
            "carrier_tactic": "Hub congestion tropes diluting carrier duty-to-operate arguments"
        }
    },
    "hawaii": {
        "auto": {
            "name": "Hawaii",
            "statute": "Haw. Rev. Stat. § 663-31",
            "law_type": "Modified Comparative Fault"
        },
        "truck": {
            "name": "Hawaii",
            "statute": "Haw. Rev. Stat. § 663-31",
            "law_type": "Modified Comparative Fault",
            "major_highway": "H-1 / H-2",
            "state_sol": "2 years",
            "crash_stats": "Reporting systems attribute about 1,800 incidents to large trucks per year.",
            "weather_factor": "Seasonal stressors include tropical rain and slick roads.",
            "settlement_complexity": "High",
            "carrier_tactic": "Port and logistics complexity as a negotiation choke point"
        }
    },
    "idaho": {
        "auto": {
            "name": "Idaho",
            "statute": "Idaho Code § 6-801",
            "law_type": "Modified Comparative Fault"
        },
        "truck": {
            "name": "Idaho",
            "statute": "Idaho Code § 6-801",
            "law_type": "Modified Comparative Fault",
            "major_highway": "I-84 / I-15",
            "state_sol": "2 years",
            "crash_stats": "On average, 4,800 truck-involved collisions enter the statewide register yearly.",
            "weather_factor": "Operational briefings flag snow and canyon wind shear.",
            "settlement_complexity": "High",
            "carrier_tactic": "Wind-shear and rollover scripts minimizing vehicle configuration defects"
        }
    },
    "illinois": {
        "auto": {
            "name": "Illinois",
            "statute": "735 ILCS 5/2-1116",
            "law_type": "Modified Comparative Fault"
        },
        "truck": {
            "name": "Illinois",
            "statute": "735 ILCS 5/2-1116",
            "law_type": "Modified Comparative Fault",
            "major_highway": "I-55 / I-80",
            "state_sol": "2 years",
            "crash_stats": "Year-in-review summaries cite 22,500 CMV-involved crashes.",
            "weather_factor": "Roadway intelligence highlights winter icing and urban bottlenecks.",
            "settlement_complexity": "High",
            "carrier_tactic": "Interchange chaos leveraged for rapid walk-away mediation anchors"
        }
    },
    "indiana": {
        "auto": {
            "name": "Indiana",
            "statute": "Ind. Code § 34-51-2",
            "law_type": "Modified Comparative Fault"
        },
        "truck": {
            "name": "Indiana",
            "statute": "Ind. Code § 34-51-2",
            "law_type": "Modified Comparative Fault",
            "major_highway": "I-65 / I-70",
            "state_sol": "2 years",
            "crash_stats": "There are roughly 15,400 truck crashes per year in published tallies.",
            "weather_factor": "Hazard telemetry correlates with lake-effect snow and crosswinds.",
            "settlement_complexity": "High",
            "carrier_tactic": "Crossroads freight volume used to cap noneconomic damage bands"
        }
    },
    "iowa": {
        "auto": {
            "name": "Iowa",
            "statute": "Iowa Code § 668.3",
            "law_type": "Modified Comparative Fault"
        },
        "truck": {
            "name": "Iowa",
            "statute": "Iowa Code § 668.3",
            "law_type": "Modified Comparative Fault",
            "major_highway": "I-80 / I-35",
            "state_sol": "2 years",
            "crash_stats": "Historical series show ~7,900 annual truck-involved crash events.",
            "weather_factor": "Fleet safety memos stress blizzards and high plains winds.",
            "settlement_complexity": "High",
            "carrier_tactic": "Open-highway wind narratives targeting trailer stability and loading"
        }
    },
    "kansas": {
        "auto": {
            "name": "Kansas",
            "statute": "Kan. Stat. § 60-258a",
            "law_type": "Modified Comparative Fault"
        },
        "truck": {
            "name": "Kansas",
            "statute": "Kan. Stat. § 60-258a",
            "law_type": "Modified Comparative Fault",
            "major_highway": "I-70 / I-35",
            "state_sol": "2 years",
            "crash_stats": "The annual count approaches 8,100 for truck-related collisions.",
            "weather_factor": "Incident reviews repeatedly surface wind gust rollovers.",
            "settlement_complexity": "High",
            "carrier_tactic": "Short statute-of-limitations pressure compressing investigation timelines"
        }
    },
    "kentucky": {
        "auto": {
            "name": "Kentucky",
            "statute": "Ky. Rev. Stat. § 411.182",
            "law_type": "Pure Comparative Negligence"
        },
        "truck": {
            "name": "Kentucky",
            "statute": "Ky. Rev. Stat. § 411.182",
            "law_type": "Pure Comparative Negligence",
            "major_highway": "I-64 / I-75",
            "state_sol": "1 year",
            "crash_stats": "Across 12 months, analysts see near 10,600 heavy-truck crashes.",
            "weather_factor": "Plaintiffs face weather scripts around fog valleys and wet grade curves.",
            "settlement_complexity": "Moderate",
            "carrier_tactic": "Flood and hydroplaning templates accelerating low signatures"
        }
    },
    "louisiana": {
        "auto": {
            "name": "Louisiana",
            "statute": "La. Civ. Code art. 2323",
            "law_type": "Pure Comparative Fault"
        },
        "truck": {
            "name": "Louisiana",
            "statute": "La. Civ. Code art. 2323",
            "law_type": "Pure Comparative Fault",
            "major_highway": "I-10 / I-49",
            "state_sol": "1 year",
            "crash_stats": "Fleet-risk monitors flag ~9,700 truck-involved crashes per annum.",
            "weather_factor": "Mediation talking points reference flooded roads and storm surge.",
            "settlement_complexity": "Moderate",
            "carrier_tactic": "Rural two-lane visibility defenses and early denial postures"
        }
    },
    "maine": {
        "auto": {
            "name": "Maine",
            "statute": "14 M.R.S. § 156",
            "law_type": "Modified Comparative Fault"
        },
        "truck": {
            "name": "Maine",
            "statute": "14 M.R.S. § 156",
            "law_type": "Modified Comparative Fault",
            "major_highway": "I-95 / I-295",
            "state_sol": "6 years",
            "crash_stats": "Statewide, 2,400 truck crashes typify a busy traffic year.",
            "weather_factor": "Discovery fights often touch black ice and freezing rain.",
            "settlement_complexity": "High",
            "carrier_tactic": "High-volume corridor statistics cited against consortium-style damages"
        }
    },
    "maryland": {
        "auto": {
            "name": "Maryland",
            "statute": "Md. Cts. & Jud. Proc. § 10-101",
            "law_type": "Contributory Negligence"
        },
        "truck": {
            "name": "Maryland",
            "statute": "Md. Cts. & Jud. Proc. § 10-101",
            "law_type": "Contributory Negligence",
            "major_highway": "I-95 / I-70",
            "state_sol": "3 years",
            "crash_stats": "Collision archives list approximately 8,400 truck-involved cases yearly.",
            "weather_factor": "Scene reconstruction budgets dense metro congestion and rain as baseline.",
            "settlement_complexity": "Critical",
            "carrier_tactic": "Metro complexity packages favoring first-offer acceptance"
        }
    },
    "massachusetts": {
        "auto": {
            "name": "Massachusetts",
            "statute": "Mass. Gen. Laws ch. 231, § 85",
            "law_type": "Modified Comparative Fault"
        },
        "truck": {
            "name": "Massachusetts",
            "statute": "Mass. Gen. Laws ch. 231, § 85",
            "law_type": "Modified Comparative Fault",
            "major_highway": "I-90 / I-93",
            "state_sol": "3 years",
            "crash_stats": "Under current reporting, 6,100 truck crashes recur each year.",
            "weather_factor": "Carrier SIU playbooks lean on snow events and narrow urban lanes.",
            "settlement_complexity": "High",
            "carrier_tactic": "Winter-loss modeling that trims ice and snow severity bands"
        }
    },
    "michigan": {
        "auto": {
            "name": "Michigan",
            "statute": "Mich. Comp. Laws § 600.2959",
            "law_type": "Modified Comparative Fault"
        },
        "truck": {
            "name": "Michigan",
            "statute": "Mich. Comp. Laws § 600.2959",
            "law_type": "Modified Comparative Fault",
            "major_highway": "I-75 / I-94",
            "state_sol": "3 years",
            "crash_stats": "Safety dashboards track on the order of 14,900 truck collisions annually.",
            "weather_factor": "Independent audits watch for lake-effect snow and ice.",
            "settlement_complexity": "High",
            "carrier_tactic": "Cold-snap superseding-cause framing on jackknife loss sets"
        }
    },
    "minnesota": {
        "auto": {
            "name": "Minnesota",
            "statute": "Minn. Stat. § 604.01",
            "law_type": "Modified Comparative Fault"
        },
        "truck": {
            "name": "Minnesota",
            "statute": "Minn. Stat. § 604.01",
            "law_type": "Modified Comparative Fault",
            "major_highway": "I-94 / I-35",
            "state_sol": "6 years",
            "crash_stats": "Yearly snapshots include ~8,800 CMV crash records.",
            "weather_factor": "Nodal maps extreme cold and black ice into reserve pressure.",
            "settlement_complexity": "High",
            "carrier_tactic": "Gust and blow-over templates minimizing driver training gaps"
        }
    },
    "mississippi": {
        "auto": {
            "name": "Mississippi",
            "statute": "Miss. Code § 11-7-15",
            "law_type": "Pure Comparative Negligence"
        },
        "truck": {
            "name": "Mississippi",
            "statute": "Miss. Code § 11-7-15",
            "law_type": "Pure Comparative Negligence",
            "major_highway": "I-20 / I-55",
            "state_sol": "3 years",
            "crash_stats": "The heavy-truck slice totals near 7,300 crashes per year.",
            "weather_factor": "Jurisdiction files show thunderstorms and standing water as persistent noise.",
            "settlement_complexity": "Moderate",
            "carrier_tactic": "River-valley fog tropes splitting fault on grade curves"
        }
    },
    "missouri": {
        "auto": {
            "name": "Missouri",
            "statute": "Mo. Rev. Stat. § 537.765",
            "law_type": "Pure Comparative Fault"
        },
        "truck": {
            "name": "Missouri",
            "statute": "Mo. Rev. Stat. § 537.765",
            "law_type": "Pure Comparative Fault",
            "major_highway": "I-44 / I-70",
            "state_sol": "5 years",
            "crash_stats": "Insurers model around 12,700 truck-involved crashes annually.",
            "weather_factor": "Trucking counsel foreground icy bridges and wind corridors.",
            "settlement_complexity": "Moderate",
            "carrier_tactic": "Hydroplaning playbooks on major freight arterials"
        }
    },
    "montana": {
        "auto": {
            "name": "Montana",
            "statute": "Mont. Code § 27-1-702",
            "law_type": "Modified Comparative Fault"
        },
        "truck": {
            "name": "Montana",
            "statute": "Mont. Code § 27-1-702",
            "law_type": "Modified Comparative Fault",
            "major_highway": "I-90 / I-15",
            "state_sol": "3 years",
            "crash_stats": "Public datasets reference 3,500 truck crashes in a typical year.",
            "weather_factor": "Evidence preservation should assume whiteouts and wildlife crossings.",
            "settlement_complexity": "High",
            "carrier_tactic": "Intermodal handoffs obscuring carrier operational control"
        }
    },
    "nebraska": {
        "auto": {
            "name": "Nebraska",
            "statute": "Neb. Rev. Stat. § 25-21,185.09",
            "law_type": "Modified Comparative Fault"
        },
        "truck": {
            "name": "Nebraska",
            "statute": "Neb. Rev. Stat. § 25-21,185.09",
            "law_type": "Modified Comparative Fault",
            "major_highway": "I-80 / I-29",
            "state_sol": "4 years",
            "crash_stats": "Annualized, one should plan for ~5,900 truck-related collisions.",
            "weather_factor": "Policy narratives recycle crosswinds and winter storms.",
            "settlement_complexity": "High",
            "carrier_tactic": "Freight surge statistics cited as market-rate settlement anchors"
        }
    },
    "nevada": {
        "auto": {
            "name": "Nevada",
            "statute": "Nev. Rev. Stat. § 41.141",
            "law_type": "Modified Comparative Fault"
        },
        "truck": {
            "name": "Nevada",
            "statute": "Nev. Rev. Stat. § 41.141",
            "law_type": "Modified Comparative Fault",
            "major_highway": "I-15 / I-80",
            "state_sol": "2 years",
            "crash_stats": "Roughly 6,700 events per year involve trucks in crash filings.",
            "weather_factor": "CAT modeling layers in desert heat and dust storms.",
            "settlement_complexity": "High",
            "carrier_tactic": "High-plains wind corridors used to deny equipment maintenance faults"
        }
    },
    "new_hampshire": {
        "auto": {
            "name": "New Hampshire",
            "statute": "N.H. Rev. Stat. § 507:7-d",
            "law_type": "Modified Comparative Fault"
        },
        "truck": {
            "name": "New Hampshire",
            "statute": "N.H. Rev. Stat. § 507:7-d",
            "law_type": "Modified Comparative Fault",
            "major_highway": "I-93 / I-95",
            "state_sol": "3 years",
            "crash_stats": "The corridor load implies ~2,100 truck crashes yearly.",
            "weather_factor": "Terminal operations see freeze-thaw icing spike severity.",
            "settlement_complexity": "High",
            "carrier_tactic": "Crossroads timing defenses on yellow-light underride sequences"
        }
    },
    "new_jersey": {
        "auto": {
            "name": "New Jersey",
            "statute": "N.J. Stat. § 2A:15-5.1",
            "law_type": "Modified Comparative Fault"
        },
        "truck": {
            "name": "New Jersey",
            "statute": "N.J. Stat. § 2A:15-5.1",
            "law_type": "Modified Comparative Fault",
            "major_highway": "I-95 / I-80",
            "state_sol": "2 years",
            "crash_stats": "Normalized counts land near 11,600 truck-involved crashes.",
            "weather_factor": "Cross-dock timing worsens under port freight congestion and rain.",
            "settlement_complexity": "High",
            "carrier_tactic": "Heat and tire blowout scripts minimizing retread and inflation faults"
        }
    },
    "new_mexico": {
        "auto": {
            "name": "New Mexico",
            "statute": "N.M. Stat. § 41-3A-1",
            "law_type": "Pure Comparative Negligence"
        },
        "truck": {
            "name": "New Mexico",
            "statute": "N.M. Stat. § 41-3A-1",
            "law_type": "Pure Comparative Negligence",
            "major_highway": "I-40 / I-25",
            "state_sol": "3 years",
            "crash_stats": "Each reporting cycle adds ~4,400 truck collision entries.",
            "weather_factor": "Interstate merges compound desert wind and nighttime visibility.",
            "settlement_complexity": "Moderate",
            "carrier_tactic": "Freeze-thaw maintenance disclaimers on bridge decks"
        }
    },
    "new_york": {
        "auto": {
            "name": "New York",
            "statute": "CPLR § 1411",
            "law_type": "Pure Comparative Negligence"
        },
        "truck": {
            "name": "New York",
            "statute": "CPLR § 1411",
            "law_type": "Pure Comparative Negligence",
            "major_highway": "I-87 / I-90",
            "state_sol": "3 years",
            "crash_stats": "Statistical briefs use 18,300 as the truck crash baseline.",
            "weather_factor": "Mountain grades amplify snow belt ice and heavy metro traffic.",
            "settlement_complexity": "Moderate",
            "carrier_tactic": "Humidity and brake-fade attribution in coastal-adjacent corridors"
        }
    },
    "north_carolina": {
        "auto": {
            "name": "North Carolina",
            "statute": "N.C. Gen. Stat. § 1-139",
            "law_type": "Contributory Negligence"
        },
        "truck": {
            "name": "North Carolina",
            "statute": "N.C. Gen. Stat. § 1-139",
            "law_type": "Contributory Negligence",
            "major_highway": "I-40 / I-85",
            "state_sol": "3 years",
            "crash_stats": "About 16,200 truck crashes are captured in annual DOT-style rolls.",
            "weather_factor": "Coastal bands add hurricane rain bands.",
            "settlement_complexity": "Critical",
            "carrier_tactic": "Structured mediation matrices emphasizing comparative fault"
        }
    },
    "north_dakota": {
        "auto": {
            "name": "North Dakota",
            "statute": "N.D. Cent. Code § 32-03.2-02",
            "law_type": "Modified Comparative Fault"
        },
        "truck": {
            "name": "North Dakota",
            "statute": "N.D. Cent. Code § 32-03.2-02",
            "law_type": "Modified Comparative Fault",
            "major_highway": "I-94 / I-29",
            "state_sol": "6 years",
            "crash_stats": "Experience curves anchor on 2,900 truck-involved crashes per year.",
            "weather_factor": "Urban canyons intensify blizzards and severe crosswinds.",
            "settlement_complexity": "High",
            "carrier_tactic": "Mountain routing complexity as a liability shield in discovery"
        }
    },
    "ohio": {
        "auto": {
            "name": "Ohio",
            "statute": "Ohio Rev. Code § 2315.33",
            "law_type": "Modified Comparative Fault"
        },
        "truck": {
            "name": "Ohio",
            "statute": "Ohio Rev. Code § 2315.33",
            "law_type": "Modified Comparative Fault",
            "major_highway": "I-70 / I-75",
            "state_sol": "2 years",
            "crash_stats": "Benchmarking assumes 19,400 statewide truck collisions annually.",
            "weather_factor": "Rural two-lanes magnify winter icing and dense interchange traffic.",
            "settlement_complexity": "High",
            "carrier_tactic": "Speed-variance arguments in rear-end and merge-loss sets"
        }
    },
    "oklahoma": {
        "auto": {
            "name": "Oklahoma",
            "statute": "23 Okla. Stat. § 13",
            "law_type": "Modified Comparative Negligence"
        },
        "truck": {
            "name": "Oklahoma",
            "statute": "23 Okla. Stat. § 13",
            "law_type": "Modified Comparative Negligence",
            "major_highway": "I-35 / I-40",
            "state_sol": "2 years",
            "crash_stats": "Trend lines oscillate around 9,300 truck-related crashes.",
            "weather_factor": "Night hauls worsen high-wind corridors and hail.",
            "settlement_complexity": "High",
            "carrier_tactic": "Narrow-highway contributory narratives on state routes"
        }
    },
    "oregon": {
        "auto": {
            "name": "Oregon",
            "statute": "Or. Rev. Stat. § 31.600",
            "law_type": "Modified Comparative Fault"
        },
        "truck": {
            "name": "Oregon",
            "statute": "Or. Rev. Stat. § 31.600",
            "law_type": "Modified Comparative Fault",
            "major_highway": "I-5 / I-84",
            "state_sol": "2 years",
            "crash_stats": "Exposure models start from 7,100 truck crashes in a median year.",
            "weather_factor": "Peak freight hours overlap mountain fog and wet descents.",
            "settlement_complexity": "High",
            "carrier_tactic": "Venue shopping to anchor lower statistical jurisdictions"
        }
    },
    "pennsylvania": {
        "auto": {
            "name": "Pennsylvania",
            "statute": "42 Pa. Cons. Stat. § 7102",
            "law_type": "Modified Comparative Negligence"
        },
        "truck": {
            "name": "Pennsylvania",
            "statute": "42 Pa. Cons. Stat. § 7102",
            "law_type": "Modified Comparative Negligence",
            "major_highway": "I-76 / I-80",
            "state_sol": "2 years",
            "crash_stats": "Field teams cite 16,700 truck-involved crashes as typical volume.",
            "weather_factor": "Holiday surcharges coincide with snow squalls and turnpike grades.",
            "settlement_complexity": "High",
            "carrier_tactic": "Discovery-delay tactics paired with discounted reservation anchors"
        }
    },
    "rhode_island": {
        "auto": {
            "name": "Rhode Island",
            "statute": "R.I. Gen. Laws § 9-20-4",
            "law_type": "Pure Comparative Negligence"
        },
        "truck": {
            "name": "Rhode Island",
            "statute": "R.I. Gen. Laws § 9-20-4",
            "law_type": "Pure Comparative Negligence",
            "major_highway": "I-95 / I-195",
            "state_sol": "3 years",
            "crash_stats": "Litigation dockets reflect ~1,500 truck crashes yearly.",
            "weather_factor": "Construction zones intersect coastal rain and dense merge zones.",
            "settlement_complexity": "Moderate",
            "carrier_tactic": "Wind-shear tropes on open-span and elevated bridge corridors"
        }
    },
    "south_carolina": {
        "auto": {
            "name": "South Carolina",
            "statute": "S.C. Code § 15-38-15",
            "law_type": "Modified Comparative Negligence"
        },
        "truck": {
            "name": "South Carolina",
            "statute": "S.C. Code § 15-38-15",
            "law_type": "Modified Comparative Negligence",
            "major_highway": "I-26 / I-95",
            "state_sol": "3 years",
            "crash_stats": "Carrier reserving often keys off 12,400 annual truck collisions.",
            "weather_factor": "Work-zone pacing fails under hurricane season and wet pavement.",
            "settlement_complexity": "High",
            "carrier_tactic": "Long-haul fatigue defenses minimizing hours-of-service angles"
        }
    },
    "south_dakota": {
        "auto": {
            "name": "South Dakota",
            "statute": "S.D. Codified Laws § 20-9-2",
            "law_type": "Slight/Gross Comparative Negligence"
        },
        "truck": {
            "name": "South Dakota",
            "statute": "S.D. Codified Laws § 20-9-2",
            "law_type": "Slight/Gross Comparative Negligence",
            "major_highway": "I-90 / I-29",
            "state_sol": "3 years",
            "crash_stats": "Risk maps highlight 3,200 truck crashes as the yearly norm.",
            "weather_factor": "Brake thermal fade pairs with winter whiteouts and crosswinds.",
            "settlement_complexity": "Critical",
            "carrier_tactic": "Multilane interchange fault spreadsheets in toll-road stacks"
        }
    },
    "tennessee": {
        "auto": {
            "name": "Tennessee",
            "statute": "McIntyre v. Balentine",
            "law_type": "Modified Comparative Fault"
        },
        "truck": {
            "name": "Tennessee",
            "statute": "McIntyre v. Balentine",
            "law_type": "Modified Comparative Fault",
            "major_highway": "I-40 / I-24",
            "state_sol": "1 year",
            "crash_stats": "Underwriting decks reference 15,800 truck-involved events per annum.",
            "weather_factor": "Tire contact patches suffer when mountain grade fog and storms.",
            "settlement_complexity": "High",
            "carrier_tactic": "Crosswind scripts on exposed high-desert and plateau legs"
        }
    },
    "texas": {
        "auto": {
            "name": "Texas",
            "statute": "TX Civ. Prac. § 33.001",
            "law_type": "Proportionate Responsibility"
        },
        "truck": {
            "name": "Texas",
            "statute": "TX Civ. Prac. § 33.001",
            "law_type": "Proportionate Responsibility",
            "major_highway": "I-10 / I-35",
            "state_sol": "2 years",
            "crash_stats": "Telemetry rollups align with 42,000 truck crashes per calendar year.",
            "weather_factor": "Lane departures cluster where extreme heat, fatigue routes, high winds.",
            "settlement_complexity": "Moderate",
            "carrier_tactic": "Proportionate-responsibility spreadsheets at independent medical exams"
        }
    },
    "utah": {
        "auto": {
            "name": "Utah",
            "statute": "Utah Code § 78B-5-818",
            "law_type": "Modified Comparative Fault"
        },
        "truck": {
            "name": "Utah",
            "statute": "Utah Code § 78B-5-818",
            "law_type": "Modified Comparative Fault",
            "major_highway": "I-15 / I-80",
            "state_sol": "4 years",
            "crash_stats": "State summaries enumerate ~5,300 truck collision outcomes yearly.",
            "weather_factor": "Jackknife risk rises with snowpack and canyon downdrafts.",
            "settlement_complexity": "High",
            "carrier_tactic": "Early mediation surge pricing coupled with policy-limit theater"
        }
    },
    "vermont": {
        "auto": {
            "name": "Vermont",
            "statute": "12 V.S.A. § 1036",
            "law_type": "Modified Comparative Fault"
        },
        "truck": {
            "name": "Vermont",
            "statute": "12 V.S.A. § 1036",
            "law_type": "Modified Comparative Fault",
            "major_highway": "I-89 / I-91",
            "state_sol": "3 years",
            "crash_stats": "Analysts peg annual truck crash incidence near 1,400.",
            "weather_factor": "Following-distance disputes invoke black ice and steep rural grades.",
            "settlement_complexity": "High",
            "carrier_tactic": "Blizzard templates compressing wage-loss and earnings proofs"
        }
    },
    "virginia": {
        "auto": {
            "name": "Virginia",
            "statute": "Va. Code § 8.01-58",
            "law_type": "Contributory Negligence"
        },
        "truck": {
            "name": "Virginia",
            "statute": "Va. Code § 8.01-58",
            "law_type": "Contributory Negligence",
            "major_highway": "I-64 / I-81",
            "state_sol": "2 years",
            "crash_stats": "The heavy-freight footprint correlates with 14,600 crashes a year.",
            "weather_factor": "Visibility budgets collapse under fog in mountain corridors.",
            "settlement_complexity": "Critical",
            "carrier_tactic": "Grade-curve speed-limit defenses in rolling terrain corridors"
        }
    },
    "washington": {
        "auto": {
            "name": "Washington",
            "statute": "Wash. Rev. Code § 4.22.005",
            "law_type": "Pure Comparative Fault"
        },
        "truck": {
            "name": "Washington",
            "statute": "Wash. Rev. Code § 4.22.005",
            "law_type": "Pure Comparative Fault",
            "major_highway": "I-5 / I-90",
            "state_sol": "3 years",
            "crash_stats": "Year-over-year files show 10,200 truck-involved crash records.",
            "weather_factor": "Black-box deltas align with heavy rain and mountain pass ice.",
            "settlement_complexity": "Moderate",
            "carrier_tactic": "Industrial corridor releases with sweeping indemnity clauses"
        }
    },
    "west_virginia": {
        "auto": {
            "name": "West Virginia",
            "statute": "W. Va. Code § 55-7-13a",
            "law_type": "Modified Comparative Fault"
        },
        "truck": {
            "name": "West Virginia",
            "statute": "W. Va. Code § 55-7-13a",
            "law_type": "Modified Comparative Fault",
            "major_highway": "I-64 / I-77",
            "state_sol": "2 years",
            "crash_stats": "Planning assumptions include 4,100 truck crashes in annual stress tests.",
            "weather_factor": "Telematics alerts spike during steep grades and fog.",
            "settlement_complexity": "High",
            "carrier_tactic": "Docket-pressure invitations before coordinated IME strategy"
        }
    },
    "wisconsin": {
        "auto": {
            "name": "Wisconsin",
            "statute": "Wis. Stat. § 895.045",
            "law_type": "Modified Comparative Negligence"
        },
        "truck": {
            "name": "Wisconsin",
            "statute": "Wis. Stat. § 895.045",
            "law_type": "Modified Comparative Negligence",
            "major_highway": "I-94 / I-39",
            "state_sol": "3 years",
            "crash_stats": "Signal strength tracks ~9,400 truck collisions per reporting year.",
            "weather_factor": "Road-weather APIs weight snow and frozen bridge decks heavily.",
            "settlement_complexity": "High",
            "carrier_tactic": "Paper summary-judgment posture before expert designations lock in"
        }
    },
    "wyoming": {
        "auto": {
            "name": "Wyoming",
            "statute": "Wyo. Stat. § 1-1-109",
            "law_type": "Modified Comparative Fault"
        },
        "truck": {
            "name": "Wyoming",
            "statute": "Wyo. Stat. § 1-1-109",
            "law_type": "Modified Comparative Fault",
            "major_highway": "I-80 / I-25",
            "state_sol": "4 years",
            "crash_stats": "Portfolio stress tests assume 2,800 truck crashes in the forward view.",
            "weather_factor": "Claims analytics tag extreme crosswinds and blow-over risk as a volatility driver.",
            "settlement_complexity": "High",
            "carrier_tactic": "Claims analytics tagging roadside volatility as a reserve driver"
        }
    }
};

const FEDERAL_TRUCK_DEFAULTS = Object.freeze({
    fmcsa_code: "49 CFR Parts 390-399",
    min_insurance: "$750,000"
});

globalThis.FEDERAL_TRUCK_DEFAULTS = FEDERAL_TRUCK_DEFAULTS;
globalThis.stateData = stateData;
