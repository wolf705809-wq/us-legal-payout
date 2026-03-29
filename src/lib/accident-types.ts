export interface AccidentType {
  slug: string;
  name: string;
  description: string;
  causes: string[];
  commonInjuries: string[];
  liabilityFactors: string[];
  fmcsaNote: string;
}

export const ACCIDENT_TYPES: AccidentType[] = [
  {
    slug: 'jackknife',
    name: 'Jackknife',
    description:
      'A jackknife accident occurs when a tractor-trailer folds at the hitch point, causing the trailer to swing perpendicular to the cab — forming an angle resembling a folding jackknife blade. These accidents typically unfold in seconds and are nearly impossible to correct once initiated, often sweeping across multiple lanes.',
    causes: [
      'Sudden or hard braking on wet, icy, or slick pavement',
      'Excessive speed on curves or downgrades',
      'Improper load distribution or overloaded trailer',
      'Brake system failure or malfunction (FMCSA maintenance violation)',
      'Driver overcorrection or abrupt steering input',
      'Rear axle lockup before front axle during emergency braking',
    ],
    commonInjuries: [
      'Traumatic brain injury (TBI)',
      'Spinal cord injury and paralysis',
      'Crush injuries from multi-vehicle involvement',
      'Burns from fuel leaks and fire',
      'Broken bones and internal organ damage',
      'Wrongful death',
    ],
    liabilityFactors: [
      'ECM / black box data (speed, brake application, throttle)',
      'Brake inspection and maintenance records',
      'Driver hours-of-service (HOS) logs for fatigue',
      'Load weight manifests and cargo inspection records',
      "Carrier's FMCSA BASIC safety scores — Vehicle Maintenance and Driver Fitness",
    ],
    fmcsaNote:
      'FMCSA regulations 49 CFR Part 393 govern brake performance standards. A jackknife caused by brake failure may indicate a violation of § 393.40 or § 393.48, opening the carrier to enhanced liability.',
  },
  {
    slug: 'rear-end-collision',
    name: 'Rear-End Collision',
    description:
      'Rear-end collisions involving commercial trucks are among the most common and deadliest crashes on US highways. The stopping distance of a loaded 80,000-lb semi traveling at 65 mph is roughly 525 feet — nearly two full football fields — meaning following-distance violations are frequently the root cause.',
    causes: [
      'Insufficient following distance (FMCSA violation)',
      'Distracted driving — phone use, dispatch communication',
      'Driver fatigue and hours-of-service (HOS) violations',
      'Brake failure or degraded brake performance',
      'Hydroplaning or loss of traction in wet conditions',
      'Sudden traffic slowdown in construction zones or merge points',
    ],
    commonInjuries: [
      'Whiplash and cervical spine injuries',
      'Traumatic brain injury (TBI) from head whip',
      'Thoracic and lumbar spinal compression fractures',
      'Seat belt-related chest and abdominal injuries',
      'Rear intrusion crush injuries',
      'Wrongful death',
    ],
    liabilityFactors: [
      "Driver's electronic logging device (ELD) for HOS violations",
      'Event data recorder (EDR) showing speed and brake timing',
      'Cell phone and dispatch communication records',
      'Dashcam footage from the truck or trailing vehicles',
      "Pre-trip inspection records for brake condition",
    ],
    fmcsaNote:
      'FMCSA 49 CFR § 392.22 requires drivers to maintain safe following distances. HOS violations under 49 CFR Part 395 are frequently cited as a contributing factor in rear-end fatigue crashes.',
  },
  {
    slug: 'rollover',
    name: 'Rollover',
    description:
      'Rollover accidents occur when a truck tips onto its side or roof, often blocking multiple lanes and posing catastrophic risks to surrounding vehicles. Tankers, flatbeds, and high-profile trailers are particularly susceptible due to their high center of gravity. Rollovers account for a disproportionate share of large truck fatalities.',
    causes: [
      'Excessive speed while navigating curves or freeway ramps',
      'High center of gravity combined with sudden steering input',
      'Liquid cargo surge (partial-load tankers)',
      'Load shift due to improper securing of cargo',
      'Tire failure leading to loss of directional control',
      'Evasive maneuvers on soft or uneven shoulders',
    ],
    commonInjuries: [
      'Crush injuries from cab intrusion',
      'Ejection injuries in cabover configurations',
      'Spinal cord injury and paralysis',
      'Traumatic brain injury',
      'Severe lacerations from broken glass and metal',
      'Wrongful death',
    ],
    liabilityFactors: [
      'Vehicle speed and steering data from the ECM',
      'Cargo load plans, weight tickets, and securement inspections',
      'FMCSA cargo securement compliance (49 CFR Part 393 Subpart I)',
      'Tanker last-loaded volume records',
      'Previous rollover-related citations or inspections on the carrier',
    ],
    fmcsaNote:
      'FMCSA 49 CFR § 393.100–393.136 establishes cargo securement standards. Improper loading is one of the most actionable violations in rollover litigation.',
  },
  {
    slug: 'head-on-collision',
    name: 'Head-On Collision',
    description:
      'Head-on collisions between passenger vehicles and commercial trucks are among the deadliest crash types in the United States, with fatality rates far exceeding other crash configurations. The combined closing speed of two vehicles traveling toward each other amplifies the kinetic energy involved exponentially.',
    causes: [
      'Wrong-way driving on divided highways',
      'Driver fatigue causing lane drift (HOS violations)',
      'Medical emergency, seizure, or incapacitation',
      'Distracted driving with prolonged off-road gaze',
      'Impaired driving (DUI/DWI)',
      'Overcorrection after drifting off the road surface',
    ],
    commonInjuries: [
      'Catastrophic traumatic brain injury',
      'Complete spinal cord injury / paralysis',
      'Multiple organ failure from severe blunt force',
      'Traumatic amputation',
      'Facial fractures and permanent disfigurement',
      'Wrongful death (the most common outcome)',
    ],
    liabilityFactors: [
      'ELD records and HOS logs for fatigue',
      'Drug and alcohol testing results (post-crash required by FMCSA)',
      "Driver's medical certification and DOT physical records",
      'ECM data showing erratic steering corrections before impact',
      'Witness and dashcam footage of lane position',
    ],
    fmcsaNote:
      'Post-crash drug and alcohol testing is mandated by FMCSA 49 CFR Part 382. Results must be preserved and are discoverable in litigation. Failure to test is itself a violation.',
  },
  {
    slug: 't-bone',
    name: 'T-Bone / Side-Impact',
    description:
      'T-bone accidents occur when the front of a truck strikes the side of another vehicle — or vice versa — at an intersection or merge point. Because vehicle side panels offer far less structural protection than front or rear structures, side-impact crashes with large trucks often result in occupant compartment intrusion and severe injuries.',
    causes: [
      'Truck running a red light or stop sign',
      'Failure to yield on left turns across traffic',
      'Misjudging gap in traffic at uncontrolled intersections',
      'Brake failure preventing a stop before an intersection',
      'Driver distraction during approach to controlled intersection',
    ],
    commonInjuries: [
      'Thoracic crush injuries from door intrusion',
      'Pelvic and hip fractures',
      'Shoulder, arm, and rib fractures',
      'Traumatic brain injury from lateral head movement',
      'Spinal injuries from lateral loading',
      'Wrongful death',
    ],
    liabilityFactors: [
      'Traffic signal and red-light camera footage',
      'Intersection surveillance video',
      'ECM speed and brake data approaching the intersection',
      'Witness accounts of traffic signal status',
      'Brake maintenance records for stopping ability',
    ],
    fmcsaNote:
      'FMCSA 49 CFR § 392.10 governs railroad grade crossing rules, but intersection compliance falls under state traffic law. Carrier liability is established through respondeat superior and negligent entrustment.',
  },
  {
    slug: 'underride',
    name: 'Underride Accident',
    description:
      'An underride accident occurs when a smaller vehicle slides beneath the rear or side of a trailer during a collision. Rear underride is the most common type — the passenger vehicle\'s roof shears off as it passes under the trailer bed. Even at relatively low speeds, underride accidents are frequently fatal due to the catastrophic intrusion into the passenger compartment.',
    causes: [
      'Inadequate or non-compliant rear underride guards (ICC bars)',
      'Trailer parked or stopped without lighting on a dark road',
      'Abrupt braking by the truck without warning',
      'Side underride: no side guards installed (not federally required)',
      'Guard damage from prior impacts not repaired',
    ],
    commonInjuries: [
      'Decapitation or severe head/neck injuries (most common)',
      'Traumatic brain injury',
      'Facial crush injuries',
      'Spinal cord injury',
      'Wrongful death (extremely high rate in underride crashes)',
    ],
    liabilityFactors: [
      'Rear underride guard inspection records (FMCSA § 393.86)',
      'Evidence of guard damage, improper installation, or non-compliance',
      'Trailer lighting and reflector condition (§ 393.11)',
      "National Highway Traffic Safety Administration (NHTSA) guard strength data",
      'Prior safety inspections showing guard violations',
    ],
    fmcsaNote:
      'FMCSA 49 CFR § 393.86 mandates rear underride guards on trailers. However, side underride guards are not federally required — a significant gap in safety regulation that has been the subject of ongoing NHTSA rulemaking. Guards failing FMCSA standards greatly strengthen a plaintiff\'s case.',
  },
  {
    slug: 'wide-turn',
    name: 'Wide Turn',
    description:
      'Wide turn accidents, also called "squeeze play" accidents, occur when a truck driver swings left to initiate a right turn, creating a gap that nearby vehicles enter — then getting trapped as the truck arcs right. Cyclists, motorcyclists, and drivers in the right lane are most vulnerable. Wide turn accidents are highly preventable and typically indicate driver training deficiencies.',
    causes: [
      'Driver swinging wide to the left before turning right',
      'Inadequate driver training on turn procedures',
      'Failure to check mirrors before initiating the turn',
      'Turn signals not used or used too late',
      'Attempting turns at intersections with insufficient turn radius',
    ],
    commonInjuries: [
      'Crush injuries from cab or trailer wheel path',
      'Leg and pelvis fractures (most common for cyclists)',
      'Spinal injuries from rollover of squeezed vehicle',
      'Internal organ damage',
      'Traumatic brain injury',
    ],
    liabilityFactors: [
      'Driver training records and certification',
      'Dashcam footage of the turn execution',
      "Vehicle tracking data showing the truck's path",
      'Mirror inspection records',
      'Prior wide-turn violations or CSA points on the carrier',
    ],
    fmcsaNote:
      'FMCSA driver training requirements (49 CFR Part 380) include right-turn procedures for tractor-trailers. Failure to follow safe turn practices can be used to establish carrier negligence in hiring or training.',
  },
  {
    slug: 'blind-spot',
    name: 'Blind Spot Accident',
    description:
      'Commercial trucks have four large blind spots — directly behind, directly in front, the entire right side, and the left rear quarter. Blind spot accidents typically involve a truck changing lanes or merging without detecting a vehicle already occupying that space. These crashes are especially common during lane changes on multi-lane highways.',
    causes: [
      'Lane change without adequate mirror checks',
      'Failure to check the right-side blind zone (the most dangerous)',
      'Overreliance on mirrors without physical head checks',
      'Inadequate mirror adjustment or mirror damage',
      "Passenger vehicle lingering in the truck's blind zone",
    ],
    commonInjuries: [
      'Side-impact crush injuries',
      'Rollover injuries if forced off the road',
      'Whiplash and cervical spine injuries',
      'Broken bones from side-force impact',
      'Traumatic brain injury',
    ],
    liabilityFactors: [
      'ECM lane-change tracking and steering data',
      'Mirror adjustment inspection records',
      'Lane departure warning system data (if equipped)',
      'Witness accounts and dashcam footage',
      'Driver training records for blind zone procedures',
    ],
    fmcsaNote:
      'FMCSA requires adequate mirror systems under 49 CFR § 393.80. Carriers operating trucks without compliant mirror systems face direct regulatory liability in blind-spot crash litigation.',
  },
  {
    slug: 'tire-blowout',
    name: 'Tire Blowout',
    description:
      'A tire blowout on a commercial truck — especially a steer or drive axle tire — can cause sudden loss of directional control, trailer sway, or truck rollover. Beyond the loss-of-control risk, tire debris (retread "alligators") poses severe hazards to surrounding vehicles, capable of penetrating windshields and causing fatal secondary crashes.',
    causes: [
      'Underinflated tires exceeding DOT pressure limits',
      'Overloaded axles exceeding weight ratings',
      'Worn treads below legal minimum depth (FMCSA § 393.75)',
      'Tire defects or manufacturing flaws (product liability claim)',
      'Road hazard damage left unrepaired',
      'Excessive heat buildup from insufficient inflation on long hauls',
    ],
    commonInjuries: [
      'Penetrating injuries from tire debris',
      'Crash injuries from resulting loss-of-control collision',
      'Traumatic brain injury and spinal injuries',
      'Burns from fire following a crash',
      'Wrongful death',
    ],
    liabilityFactors: [
      'Pre-trip and post-trip tire inspection logs',
      'Tire purchase and maintenance records',
      'DVIR (Driver Vehicle Inspection Report) records',
      'Tire manufacturer records (potential product liability)',
      'Scale tickets showing axle weight compliance',
    ],
    fmcsaNote:
      'FMCSA 49 CFR § 393.75 sets minimum tread depth (4/32" on steer tires, 2/32" on others) and prohibits use of tires with fabric exposure. Evidence of pre-existing tire degradation in inspection records is often the most powerful evidence in blowout cases.',
  },
  {
    slug: 'hazmat-spill',
    name: 'Hazmat Spill',
    description:
      'Hazardous materials incidents involving commercial trucks range from fuel spills to catastrophic releases of toxic chemicals, flammable gases, or corrosive substances. Beyond the immediate crash injuries, victims may suffer long-term exposure-related harm. Hazmat cases typically involve multiple defendants and significantly higher insurance coverage mandates.',
    causes: [
      'Tank rupture from crash impact',
      'Valve or seal failure during transport',
      'Improper hazmat placard and identification (FMCSA violation)',
      'Inadequate cargo securement for pressurized or liquid cargo',
      'Rollover of a partially loaded tanker',
    ],
    commonInjuries: [
      'Chemical burns (external and respiratory)',
      'Toxic exposure and inhalation injuries',
      'Crash-related traumatic injuries',
      'Long-term chemical toxicity and organ damage',
      'Wrongful death',
    ],
    liabilityFactors: [
      'Hazardous materials shipping papers and manifests',
      'Carrier hazmat certification and training records',
      'Tank inspection and certification records',
      'EPA and FMCSA incident reports',
      'Shipper and manufacturer records (potential strict liability)',
    ],
    fmcsaNote:
      'Hazmat carriers are required to carry a minimum of $1,000,000–$5,000,000 in insurance under 49 CFR Part 387, depending on the material transported — significantly above the standard $750,000 minimum. Multiple parties (carrier, shipper, loader, manufacturer) may share liability.',
  },
  {
    slug: 'brake-failure',
    name: 'Brake Failure / Runaway',
    description:
      'Brake failure on a commercial truck can result in runaway truck incidents — most commonly on steep mountain grades where brake fade from overheating renders the vehicle uncontrollable. Runaway trucks frequently reach speeds above 80 mph before impact, resulting in some of the most catastrophic crashes in NHTSA databases.',
    causes: [
      'Brake fade from riding brakes down a long grade',
      'Brake drum overheating due to improper adjustment',
      'Brake system air pressure loss (air brake failure)',
      'Deferred maintenance on brake components (FMCSA violation)',
      'Brake fade in a heavily loaded vehicle over driver weight limits',
      'Brake chamber pushrod out-of-adjustment',
    ],
    commonInjuries: [
      'Catastrophic multi-vehicle crash injuries',
      'Traumatic brain injury and spinal cord injury',
      'Multiple fractures and internal injuries',
      'Burns and crush injuries',
      'Wrongful death',
    ],
    liabilityFactors: [
      'Brake inspection and adjustment records',
      'DVIR records showing known brake deficiencies',
      'Roadside inspection results (CVSA out-of-service criteria)',
      "Carrier's CSA BASIC score for Vehicle Maintenance",
      'ECM data showing speed on the grade and brake application history',
    ],
    fmcsaNote:
      'FMCSA 49 CFR § 393.40–393.55 governs brake performance standards for commercial vehicles. Out-of-adjustment brakes are the single most common CVSA roadside violation. Evidence that the carrier had prior brake violation notices and failed to correct them is highly damaging.',
  },
  {
    slug: 'multi-vehicle-pileup',
    name: 'Multi-Vehicle Pileup',
    description:
      'Multi-vehicle pileups involving commercial trucks often unfold as chain-reaction crashes triggered by a primary event — a tire blowout, jackknife, or sudden stop. The scale and complexity of these accidents results in multiple defendants, disputed fault allocations, and extended litigation. Insurance stacking across multiple commercial policies can make settlement values substantially higher.',
    causes: [
      'Initial triggering event (jackknife, blowout, or sudden stop)',
      'Poor visibility in fog, rain, smoke, or blowing dust',
      'Inadequate following distance by multiple drivers',
      'Speeding in reduced-visibility conditions',
      'Secondary crashes by first responders and rubberneckers',
    ],
    commonInjuries: [
      'Crush injuries from multi-impact collisions',
      'Traumatic brain injury',
      'Spinal cord injury and paralysis',
      'Burns from post-crash fires',
      'Psychological trauma (PTSD) from multi-fatality events',
      'Wrongful death',
    ],
    liabilityFactors: [
      'Reconstruction of the initiating event from ECM and physical evidence',
      'Fault apportionment among multiple defendants',
      'Each truck operator\'s inspection and HOS compliance',
      'Weather records and roadway condition reports',
      'Video from traffic cameras, overhead drones, and dashcams',
    ],
    fmcsaNote:
      'Multi-vehicle crashes with commercial trucks often trigger FMCSA crash review investigations. Carriers with patterns of violations may face punitive damages beyond compensatory awards. Each truck involved adds a separate insurance policy layer.',
  },
];

export function getAccidentTypeBySlug(slug: string): AccidentType | null {
  return ACCIDENT_TYPES.find(t => t.slug === slug) ?? null;
}

export function getAccidentTypeName(slug: string): string {
  return getAccidentTypeBySlug(slug)?.name ?? slug;
}
