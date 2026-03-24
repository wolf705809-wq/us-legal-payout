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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "2 years",
            "crash_stats": "~11,200 annual truck-involved crashes",
            "weather_factor": "Heavy rain and storm cells"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "2 years",
            "crash_stats": "~1,200 annual truck-involved crashes",
            "weather_factor": "Black ice and low-visibility snow"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "2 years",
            "crash_stats": "~13,400 annual truck-involved crashes",
            "weather_factor": "Extreme heat and tire blowout risk"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "3 years",
            "crash_stats": "~8,900 annual truck-involved crashes",
            "weather_factor": "Heavy rain and flash flooding"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "2 years",
            "crash_stats": "~36,000 annual truck-involved crashes",
            "weather_factor": "Coastal fog and mountain grade braking"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "3 years",
            "crash_stats": "~9,500 annual truck-involved crashes",
            "weather_factor": "Snowpack and steep descent corridors"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "2 years",
            "crash_stats": "~5,200 annual truck-involved crashes",
            "weather_factor": "Freeze-thaw pavement hazards"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "2 years",
            "crash_stats": "~2,700 annual truck-involved crashes",
            "weather_factor": "Coastal rain and wind gusts"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "2 years",
            "crash_stats": "~32,000 annual truck-involved crashes",
            "weather_factor": "Hydroplaning and hurricane season"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "2 years",
            "crash_stats": "~24,000 annual truck-involved crashes",
            "weather_factor": "Freight congestion and storm runoff"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "2 years",
            "crash_stats": "~1,800 annual truck-involved crashes",
            "weather_factor": "Tropical rain and slick roads"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "2 years",
            "crash_stats": "~4,800 annual truck-involved crashes",
            "weather_factor": "Snow and canyon wind shear"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "2 years",
            "crash_stats": "~22,500 annual truck-involved crashes",
            "weather_factor": "Winter icing and urban bottlenecks"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "2 years",
            "crash_stats": "~15,400 annual truck-involved crashes",
            "weather_factor": "Lake-effect snow and crosswinds"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "2 years",
            "crash_stats": "~7,900 annual truck-involved crashes",
            "weather_factor": "Blizzards and high plains winds"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "2 years",
            "crash_stats": "~8,100 annual truck-involved crashes",
            "weather_factor": "Wind gust rollovers"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "1 year",
            "crash_stats": "~10,600 annual truck-involved crashes",
            "weather_factor": "Fog valleys and wet grade curves"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "1 year",
            "crash_stats": "~9,700 annual truck-involved crashes",
            "weather_factor": "Flooded roads and storm surge"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "6 years",
            "crash_stats": "~2,400 annual truck-involved crashes",
            "weather_factor": "Black ice and freezing rain"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "3 years",
            "crash_stats": "~8,400 annual truck-involved crashes",
            "weather_factor": "Dense metro congestion and rain"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "3 years",
            "crash_stats": "~6,100 annual truck-involved crashes",
            "weather_factor": "Snow events and narrow urban lanes"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "3 years",
            "crash_stats": "~14,900 annual truck-involved crashes",
            "weather_factor": "Lake-effect snow and ice"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "6 years",
            "crash_stats": "~8,800 annual truck-involved crashes",
            "weather_factor": "Extreme cold and black ice"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "3 years",
            "crash_stats": "~7,300 annual truck-involved crashes",
            "weather_factor": "Thunderstorms and standing water"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "5 years",
            "crash_stats": "~12,700 annual truck-involved crashes",
            "weather_factor": "Icy bridges and wind corridors"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "3 years",
            "crash_stats": "~3,500 annual truck-involved crashes",
            "weather_factor": "Whiteouts and wildlife crossings"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "4 years",
            "crash_stats": "~5,900 annual truck-involved crashes",
            "weather_factor": "Crosswinds and winter storms"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "2 years",
            "crash_stats": "~6,700 annual truck-involved crashes",
            "weather_factor": "Desert heat and dust storms"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "3 years",
            "crash_stats": "~2,100 annual truck-involved crashes",
            "weather_factor": "Freeze-thaw icing"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "2 years",
            "crash_stats": "~11,600 annual truck-involved crashes",
            "weather_factor": "Port freight congestion and rain"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "3 years",
            "crash_stats": "~4,400 annual truck-involved crashes",
            "weather_factor": "Desert wind and nighttime visibility"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "3 years",
            "crash_stats": "~18,300 annual truck-involved crashes",
            "weather_factor": "Snow belt ice and heavy metro traffic"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "3 years",
            "crash_stats": "~16,200 annual truck-involved crashes",
            "weather_factor": "Hurricane rain bands"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "6 years",
            "crash_stats": "~2,900 annual truck-involved crashes",
            "weather_factor": "Blizzards and severe crosswinds"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "2 years",
            "crash_stats": "~19,400 annual truck-involved crashes",
            "weather_factor": "Winter icing and dense interchange traffic"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "2 years",
            "crash_stats": "~9,300 annual truck-involved crashes",
            "weather_factor": "High-wind corridors and hail"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "2 years",
            "crash_stats": "~7,100 annual truck-involved crashes",
            "weather_factor": "Mountain fog and wet descents"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "2 years",
            "crash_stats": "~16,700 annual truck-involved crashes",
            "weather_factor": "Snow squalls and turnpike grades"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "3 years",
            "crash_stats": "~1,500 annual truck-involved crashes",
            "weather_factor": "Coastal rain and dense merge zones"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "3 years",
            "crash_stats": "~12,400 annual truck-involved crashes",
            "weather_factor": "Hurricane season and wet pavement"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "3 years",
            "crash_stats": "~3,200 annual truck-involved crashes",
            "weather_factor": "Winter whiteouts and crosswinds"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "1 year",
            "crash_stats": "~15,800 annual truck-involved crashes",
            "weather_factor": "Mountain grade fog and storms"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "2 years",
            "crash_stats": "~42,000 annual truck-involved crashes",
            "weather_factor": "Extreme heat, fatigue routes, high winds"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "4 years",
            "crash_stats": "~5,300 annual truck-involved crashes",
            "weather_factor": "Snowpack and canyon downdrafts"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "3 years",
            "crash_stats": "~1,400 annual truck-involved crashes",
            "weather_factor": "Black ice and steep rural grades"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "2 years",
            "crash_stats": "~14,600 annual truck-involved crashes",
            "weather_factor": "Fog in mountain corridors"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "3 years",
            "crash_stats": "~10,200 annual truck-involved crashes",
            "weather_factor": "Heavy rain and mountain pass ice"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "2 years",
            "crash_stats": "~4,100 annual truck-involved crashes",
            "weather_factor": "Steep grades and fog"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "3 years",
            "crash_stats": "~9,400 annual truck-involved crashes",
            "weather_factor": "Snow and frozen bridge decks"
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
            "fmcsa_code": "49 CFR Parts 390-399",
            "min_insurance": "$750,000",
            "state_sol": "4 years",
            "crash_stats": "~2,800 annual truck-involved crashes",
            "weather_factor": "Extreme crosswinds and blow-over risk"
        }
    }
};