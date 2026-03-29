export interface InjurySettlementRow {
  label: string;
  description: string;
  low: number;
  high: number;
}

export interface InjuryType {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  symptoms: string[];
  longTermEffects: string[];
  commonTreatments: string[];
  treatmentCostLow: number;
  treatmentCostHigh: number;
  truckAccidentContext: string;
  multiplierLow: number;
  multiplierHigh: number;
  settlementRows: InjurySettlementRow[];
  liabilityFactors: string[];
  isWrongfulDeath?: boolean;
  wrongfulDeathComponents?: string[];
  wrongfulDeathBeneficiaryNote?: string;
}

export const INJURY_TYPES: InjuryType[] = [
  {
    slug: 'traumatic-brain-injury',
    name: 'Traumatic Brain Injury (TBI)',
    shortName: 'TBI',
    description:
      'Traumatic brain injury is the most catastrophic non-fatal outcome of commercial truck accidents. TBI occurs when the brain is damaged by a violent blow, jolt, or penetrating object — in truck crashes, this is typically caused by the extreme deceleration forces, airbag deployment, or direct head impact with vehicle structures. Even "mild" TBI (concussion) can produce lasting cognitive impairment affecting memory, processing speed, emotional regulation, and the ability to maintain employment.',
    symptoms: [
      'Loss of consciousness (seconds to hours depending on severity)',
      'Post-traumatic amnesia — inability to form new memories after injury',
      'Persistent headaches, pressure, and light/noise sensitivity',
      'Cognitive deficits: memory loss, slowed processing, difficulty concentrating',
      'Emotional dysregulation: irritability, depression, anxiety, personality changes',
      'Vestibular dysfunction: balance problems, vertigo, coordination loss',
      'Sleep disorders: insomnia or hypersomnia',
      'Seizure disorders in moderate-to-severe cases',
    ],
    longTermEffects: [
      'Chronic Traumatic Encephalopathy (CTE) risk with repeated or severe injury',
      'Permanent cognitive impairment requiring vocational rehabilitation or care',
      'Inability to return to prior employment — major lost earning capacity damages',
      'Elevated lifetime risk of Alzheimer\'s and Parkinson\'s disease',
      'Chronic pain and post-concussive syndrome lasting years to decades',
    ],
    commonTreatments: [
      'Emergency neurosurgical intervention (intracranial pressure monitoring, decompression)',
      'Acute inpatient rehabilitation (2–12 weeks for moderate/severe TBI)',
      'Neuropsychological testing and cognitive rehabilitation',
      'Physical, occupational, and speech-language therapy',
      'Psychiatry and neuropsychiatry for behavioral and emotional symptoms',
      'Lifetime neurologist monitoring and imaging',
    ],
    treatmentCostLow: 85_000,
    treatmentCostHigh: 3_500_000,
    truckAccidentContext:
      'Commercial truck crashes generate deceleration forces 10–20× greater than typical passenger vehicle accidents. The mass of a fully loaded 80,000-lb semi-truck means that even a "low-speed" impact (15–25 mph) delivers forces that routinely exceed the head injury threshold. Underride crashes — where a passenger vehicle slides under the truck trailer — cause near-universal TBI because the roof of the passenger vehicle is destroyed, bringing the occupant\'s head into direct contact with the trailer undercarriage. Rollover crashes similarly expose occupants to multiple head impacts against interior vehicle structures.',
    multiplierLow: 7,
    multiplierHigh: 10,
    settlementRows: [
      { label: 'Mild TBI (Concussion)', description: 'Brief LOC or none, post-concussive symptoms resolving within 6–12 months', low: 185_000, high: 490_000 },
      { label: 'Moderate TBI', description: 'Significant cognitive deficits, 1–6 months inpatient rehab, partial long-term recovery', low: 650_000, high: 2_100_000 },
      { label: 'Severe TBI', description: 'Permanent disability, lifetime care needs, loss of independent living capacity', low: 2_400_000, high: 8_500_000 },
    ],
    liabilityFactors: [
      'Event Data Recorder (black box) data showing speed and impact forces at collision',
      'Underride guard compliance — failure to meet FMCSA rear guard standards is a separate FMCSA violation',
      'Driver hours-of-service records (ELD data) — fatigue dramatically increases crash severity',
      'Carrier safety rating (FMCSA BASIC scores) for prior crash history and driver fitness violations',
      'Neurological expert testimony establishing causation between crash forces and brain injury',
      'Life care plan expert establishing lifetime medical costs',
      'Vocational rehabilitation expert for lost earning capacity analysis',
    ],
  },

  {
    slug: 'spinal-cord-injury',
    name: 'Spinal Cord Injury',
    shortName: 'Spinal Cord',
    description:
      'Spinal cord injuries (SCI) from truck accidents are among the most life-altering injuries in personal injury law. The spinal cord transmits all motor and sensory signals between the brain and body — damage results in paralysis and/or loss of sensation below the injury level. Injuries are classified as complete (total loss of function below the lesion) or incomplete (partial preservation of motor or sensory function). In truck accidents, SCI most commonly results from fracture-dislocation of cervical (neck) or thoracic (mid-back) vertebrae caused by extreme flexion-extension forces.',
    symptoms: [
      'Immediate: extreme back or neck pain, numbness/tingling in extremities',
      'Motor paralysis: monoplegia (one limb), paraplegia (lower body), or tetraplegia/quadriplegia (all four limbs)',
      'Sensory loss: loss of pain, temperature, and touch sensation below injury level',
      'Autonomic dysreflexia: dangerous blood pressure spikes in cervical injuries',
      'Neurogenic bladder and bowel — requiring lifelong catheterization or bowel program',
      'Neuropathic pain: chronic burning, stabbing, or electric pain below injury level',
      'Spasticity: involuntary muscle contractions interfering with function',
    ],
    longTermEffects: [
      'Complete SCI: permanent dependence on wheelchair and attendant care for activities of daily living',
      'Recurring secondary complications: pressure ulcers, UTIs, pneumonia, and respiratory failure',
      'Lifetime attendant care costs: $500,000–$2,000,000+ depending on level of injury',
      'Severe reduction in life expectancy for complete cervical injuries',
      'Psychological impact: depression rates of 30–40% in SCI survivors',
    ],
    commonTreatments: [
      'Emergency spinal stabilization, surgical decompression and fusion',
      'ICU and acute hospital stay: 2–6 weeks',
      'Inpatient rehabilitation: 2–6 months at SCI specialty center',
      'Methylprednisolone protocol (within 8 hours for incomplete injuries)',
      'Functional electrical stimulation (FES) therapy for incomplete injuries',
      'Lifetime attendant care, adaptive equipment, and home modification',
    ],
    treatmentCostLow: 500_000,
    treatmentCostHigh: 5_200_000,
    truckAccidentContext:
      'The extreme mechanical forces in commercial truck collisions — particularly head-on, T-bone, and rollover crashes — routinely exceed the structural limits of the cervical and thoracic spine. In rear-end impacts from a truck striking a passenger vehicle, the violent hyperextension-hyperflexion cycle can fracture and dislocate vertebrae in milliseconds. Underride crashes, where the passenger cabin is crushed by the truck\'s trailer, cause near-universal cervical SCI in survivors due to the direct roof compression forces applied to the occupant\'s head and neck.',
    multiplierLow: 8,
    multiplierHigh: 10,
    settlementRows: [
      { label: 'Incomplete SCI — Ambulatory Recovery', description: 'Partial sensory/motor preservation, able to walk with assistance after rehab', low: 750_000, high: 2_500_000 },
      { label: 'Complete Paraplegia', description: 'Total loss of lower extremity function, full upper body preserved', low: 2_200_000, high: 6_000_000 },
      { label: 'Complete Tetraplegia (C4–C7)', description: 'Total loss of lower body and partial upper body — highest care needs', low: 4_500_000, high: 12_000_000 },
    ],
    liabilityFactors: [
      'Crash reconstruction expert establishing forces at impact',
      'Truck underride guard compliance — FMCSA §393.86 rear underride guard standards',
      'Emergency medical response timing — delay in spinal immobilization can worsen outcomes',
      'Carrier history of prior spinal injury crashes (FMCSA MCMIS database)',
      'Life care planner testimony on lifetime attendant care, equipment, and home modification costs',
      'Vocational expert — most SCI victims face near-total loss of earning capacity',
      'Driver ELD records for hours-of-service fatigue analysis',
    ],
  },

  {
    slug: 'wrongful-death',
    name: 'Wrongful Death',
    shortName: 'Wrongful Death',
    description:
      'Wrongful death claims arise when a truck accident fatality is caused by another party\'s negligence. In commercial truck accident wrongful death cases, the claim is typically brought by surviving family members against the truck driver, carrier, shipper, and/or equipment manufacturer. Wrongful death and survival actions are legally distinct: a survival action recovers damages the deceased suffered between injury and death (pain and suffering, lost earnings); the wrongful death action compensates surviving family for their own losses (financial support, companionship, guidance). Both actions are typically filed together.',
    symptoms: [],
    longTermEffects: [],
    commonTreatments: [],
    treatmentCostLow: 0,
    treatmentCostHigh: 0,
    truckAccidentContext:
      'Large truck crashes killed 5,837 people in the US in 2022 (NHTSA FARS) — an average of 16 deaths per day. Occupants of passenger vehicles account for approximately 72% of all large truck crash fatalities. The disparity in mass between a fully loaded 80,000-lb semi-truck and a 3,500-lb passenger car means that even moderate-speed impacts are often fatal for car occupants. Wrongful death claims in truck accident cases frequently involve gross negligence evidence — hours-of-service violations, falsified logs, or a carrier\'s prior safety violations — which can support punitive damage claims in addition to compensatory damages.',
    multiplierLow: 8,
    multiplierHigh: 12,
    settlementRows: [
      { label: 'Single Decedent, No Dependents', description: 'Funeral costs, estate loss, limited survivor economic claims', low: 450_000, high: 1_800_000 },
      { label: 'Married, Spouse as Primary Survivor', description: 'Loss of financial support, consortium, companionship, household services', low: 1_500_000, high: 5_000_000 },
      { label: 'Surviving Spouse + Minor Children', description: 'Lost lifetime earnings, loss of parental guidance, companionship — highest value', low: 3_000_000, high: 10_000_000 },
    ],
    liabilityFactors: [
      'Survival action damages: pain, suffering, and lost wages between injury and death',
      'Wrongful death damages: funeral/burial costs, lost financial support, loss of consortium, loss of parental guidance',
      'Loss of lifetime earnings — vocational expert analysis critical for high-earning decedents',
      'Punitive damages available in most states when carrier acted with gross negligence',
      'Carrier\'s prior FMCSA safety violations and BASIC scores as evidence of systemic negligence',
      'Driver\'s ELD/HOS records for hours-of-service violations (fatigue is a leading cause of fatal crashes)',
      'FMCSA crash data and prior enforcement actions against the carrier',
    ],
    isWrongfulDeath: true,
    wrongfulDeathComponents: [
      'Funeral and burial expenses — immediately recoverable',
      'Pre-death pain and suffering (survival action) — brief in high-speed crashes, potentially hours/days in slower-onset crashes',
      'Lost lifetime earnings — calculated from decedent\'s age, career trajectory, expected retirement, and work-life expectancy tables',
      'Lost household services — economic value of childcare, home maintenance, and household management the decedent would have provided',
      'Loss of consortium — surviving spouse\'s loss of companionship, care, and intimacy',
      'Loss of parental guidance — minor children\'s loss of guidance, education, and nurturing over their minority',
      'Punitive/exemplary damages — available in most states when carrier\'s conduct was grossly negligent or reckless',
    ],
    wrongfulDeathBeneficiaryNote:
      'Wrongful death lawsuit standing (who can file) varies by state. Most states allow: surviving spouse, children, and parents of unmarried decedents. Some states also allow: siblings, grandparents, or financial dependents. Contributory negligence states (Alabama, Maryland, North Carolina, Virginia) apply contributory negligence to wrongful death — if the decedent was even 1% at fault, recovery may be barred. Consult a licensed attorney in the state where the crash occurred to determine beneficiary eligibility.',
  },

  {
    slug: 'broken-bones',
    name: 'Broken Bones & Fractures',
    shortName: 'Fractures',
    description:
      'Bone fractures are among the most common serious injuries in commercial truck accidents. The structural forces involved — particularly in frontal, side-impact, and rollover crashes — routinely fracture ribs, long bones (femur, tibia, fibula), pelvis, clavicle, and facial bones. Fractures range from simple (clean break, conservative treatment) to comminuted (shattered into multiple pieces requiring complex surgical reconstruction) and open/compound fractures (bone breaches skin, dramatically increasing infection risk and recovery time).',
    symptoms: [
      'Immediate severe pain at fracture site — often rated 9–10/10 at presentation',
      'Visible deformity, swelling, and ecchymosis (bruising)',
      'Loss of function in affected limb or joint',
      'Open (compound) fractures: bone protruding through skin — highest infection risk',
      'Rib fractures: sharp pain with breathing, risk of pneumothorax and pulmonary contusion',
      'Pelvic fractures: hemodynamic instability due to major blood vessel proximity',
      'Post-traumatic arthritis developing at fracture sites over months to years',
    ],
    longTermEffects: [
      'Post-traumatic arthritis at fracture sites — often developing 2–5 years after injury',
      'Malunion (healed incorrectly) or nonunion (failure to heal) requiring reoperation',
      'Permanent hardware (rods, plates, screws) — may require future removal surgeries',
      'Chronic pain and reduced range of motion at surgically repaired joints',
      'Fat embolism risk in femur/pelvis fractures — rare but life-threatening',
    ],
    commonTreatments: [
      'Closed reduction (manipulation without surgery) for simple fractures',
      'Open reduction internal fixation (ORIF) — surgical repair with hardware',
      'External fixation for unstable or severely comminuted fractures',
      'Cast or splint immobilization: 6–12 weeks per fracture',
      'Physical therapy: 3–12 months for major fractures',
      'Follow-up surgery for hardware removal or post-traumatic arthritis management',
    ],
    treatmentCostLow: 15_000,
    treatmentCostHigh: 350_000,
    truckAccidentContext:
      'The mass differential between commercial trucks and passenger vehicles means that truck accident fractures are typically far more severe than those from passenger-vehicle-only collisions. Dashboard intrusion in frontal impacts causes femur and tibia fractures. Steering wheel compression causes sternum and rib fractures. Side-impact (T-bone) crashes from trucks cause pelvic and thoracic fractures as the door structure intrudes into the passenger compartment. Rollover crashes expose occupants to multiple fracture patterns as the vehicle structure collapses.',
    multiplierLow: 2,
    multiplierHigh: 4,
    settlementRows: [
      { label: 'Simple Fracture, Full Recovery', description: 'Single bone, conservative or minor surgical treatment, complete healing', low: 45_000, high: 155_000 },
      { label: 'Multiple Fractures / ORIF Required', description: 'Surgical repair with hardware, 3–6 months recovery, no permanent effects', low: 130_000, high: 480_000 },
      { label: 'Comminuted / Pelvis / Lasting Effects', description: 'Complex surgery, permanent hardware, reduced function, or chronic pain', low: 280_000, high: 950_000 },
    ],
    liabilityFactors: [
      'Impact direction and speed — determines fracture pattern and establishes fault/speed at impact',
      'Vehicle intrusion documentation — door/dash intrusion photos and measurements',
      'Emergency medical records establishing immediate fracture diagnosis',
      'Orthopedic expert testimony on surgical necessity and expected permanency',
      'Physical therapy and occupational therapy records for functional loss documentation',
      'Employment records for lost wages during recovery',
    ],
  },

  {
    slug: 'internal-organ-damage',
    name: 'Internal Organ Damage',
    shortName: 'Internal Injuries',
    description:
      'Internal organ damage in truck accidents is particularly dangerous because symptoms are often delayed — victims may walk away from a crash site feeling relatively intact, only to deteriorate rapidly as internal bleeding progresses. The liver, spleen, and kidneys are most commonly injured in blunt abdominal trauma from truck accidents due to their size and fixed position. Lung contusions and pneumothorax are frequent thoracic injuries. Internal injuries are "silent" — they do not announce themselves with obvious external wounds — making prompt post-crash medical evaluation critical.',
    symptoms: [
      'Abdominal pain and tenderness — may be absent initially due to adrenaline',
      'Rigidity and guarding of abdominal muscles',
      'Signs of internal hemorrhage: falling blood pressure, rapid heart rate, pale skin',
      'Referred shoulder pain (Kehr\'s sign) — sign of splenic laceration',
      'Hematuria (blood in urine) — sign of kidney or bladder injury',
      'Respiratory distress, decreased breath sounds — pneumothorax or hemothorax',
      'Delayed-onset abdominal pain 24–72 hours after crash (hollow organ injuries)',
    ],
    longTermEffects: [
      'Splenectomy (spleen removal) — lifetime increased infection risk, requires annual vaccines',
      'Post-traumatic liver damage — chronic liver function impairment',
      'Kidney injury leading to chronic kidney disease or dialysis requirement',
      'Adhesions from abdominal surgery — can cause bowel obstruction years later',
      'Pulmonary fibrosis from lung contusion — permanent reduced lung capacity',
    ],
    commonTreatments: [
      'Exploratory laparotomy (emergency surgery) for hemodynamically unstable patients',
      'Non-operative management of solid organ injuries with ICU monitoring',
      'Angioembolization — catheter-based technique to stop internal bleeding',
      'Chest tube placement for pneumothorax/hemothorax',
      'ICU stay: 3–21 days depending on severity',
      'Multiple follow-up surgeries for adhesion complications',
    ],
    treatmentCostLow: 80_000,
    treatmentCostHigh: 1_200_000,
    truckAccidentContext:
      'Blunt abdominal trauma in truck accidents occurs through two primary mechanisms: (1) compression — the seatbelt or steering wheel compresses the abdomen against the rigid spinal column, crushing soft organs; and (2) deceleration — at high impact speeds, organs continue moving at pre-crash velocity while the body decelerates, tearing the mesentery and vascular attachments. The liver and spleen are particularly vulnerable because they are large, highly vascular, and relatively fixed in position. HAZMAT truck spills that cause fire or chemical exposure add toxic inhalation injury to the pattern of internal injuries.',
    multiplierLow: 5,
    multiplierHigh: 8,
    settlementRows: [
      { label: 'Single Organ, Full Recovery', description: 'Liver or spleen laceration, non-operative management, complete healing', low: 185_000, high: 550_000 },
      { label: 'Surgical Intervention, No Organ Loss', description: 'Emergency surgery, significant hemorrhage, full or near-full recovery', low: 450_000, high: 1_400_000 },
      { label: 'Organ Loss or Chronic Impairment', description: 'Splenectomy, kidney failure, chronic liver/lung dysfunction', low: 950_000, high: 3_500_000 },
    ],
    liabilityFactors: [
      'Emergency CT imaging documenting organ injury grade (AAST grading scale)',
      'Delayed diagnosis documentation — if crash victim was cleared at scene and later deteriorated',
      'Seat belt analysis — seatbelt sign bruising pattern indicating mechanism',
      'HAZMAT exposure documentation for chemical-related organ injuries',
      'Post-treatment imaging establishing permanent vs. resolving damage',
      'Expert testimony on splenectomy and long-term infection risk for life care planning',
    ],
  },

  {
    slug: 'burns',
    name: 'Burn Injuries',
    shortName: 'Burns',
    description:
      'Burn injuries from truck accidents occur through multiple mechanisms: post-crash fire from fuel ignition, steam/coolant scalding when the engine compartment is breached, chemical burns from HAZMAT spills, and friction burns (road rash) from occupant ejection. Truck accidents present elevated fire risk because commercial vehicles carry 100–300 gallons of diesel fuel — far more than a passenger vehicle — and fuel system rupture is common in high-force impacts. Burns are rated by depth: first-degree (superficial), second-degree (partial thickness), third-degree (full thickness, requiring skin grafting), and fourth-degree (full thickness through fat to muscle/bone).',
    symptoms: [
      '1st degree: redness, pain, no blistering (sunburn equivalent)',
      '2nd degree: blistering, raw weeping wounds, intense pain',
      '3rd degree: leathery or waxy appearance, may be painless (nerve destruction)',
      '4th degree: charred tissue extending to muscle or bone — life-threatening',
      'Inhalation injury: stridor, hoarseness, soot in airway — requires emergency intubation',
      'Systemic inflammatory response: fever, capillary leak, fluid shifts',
      'Chemical burns: ongoing tissue damage until complete decontamination',
    ],
    longTermEffects: [
      'Hypertrophic scarring and keloids — permanent disfigurement requiring years of treatment',
      'Scar contractures — restrict joint movement and require surgical release procedures',
      'Burn survivors undergo an average of 4–8 surgical procedures over 5 years post-injury',
      'Neuropathic pain and pruritus (severe itching) — chronic and difficult to treat',
      'Psychological impact: PTSD, depression, and body image disorders are near-universal in major burn survivors',
    ],
    commonTreatments: [
      'Burn center admission — Level I/II burn centers required for >10% TBSA burns',
      'Fluid resuscitation — Parkland Formula (4 mL/kg/% TBSA in first 24 hours)',
      'Escharotomy — surgical incisions to relieve circumferential burn pressure',
      'Skin grafting — split-thickness or full-thickness skin grafts from donor sites',
      'Pressure garments worn 23 hours/day for 1–2 years to minimize scarring',
      'Reconstructive surgery — multiple procedures over years for scar contractures',
    ],
    treatmentCostLow: 120_000,
    treatmentCostHigh: 4_500_000,
    truckAccidentContext:
      'Commercial trucks carry 100–300 gallons of diesel fuel — 25–75× the fuel capacity of a passenger vehicle. When a truck\'s fuel tanks rupture in a high-force collision, the resulting fire can engulf both vehicles within seconds. FMCSA regulations require truck fuel system integrity standards, but high-impact crashes routinely overcome these protections. HAZMAT trucks — carrying flammable liquids, gases, or corrosive chemicals — present even higher burn injury risk. A HAZMAT spill that ignites or contacts occupants can cause severe chemical burns on top of thermal burns, dramatically increasing treatment complexity and settlement value.',
    multiplierLow: 5,
    multiplierHigh: 9,
    settlementRows: [
      { label: '2nd Degree Burns, <20% TBSA', description: 'Blistering burns, wound care, no skin grafting required', low: 145_000, high: 530_000 },
      { label: '3rd Degree Burns / Skin Grafting', description: 'Full-thickness burns requiring surgical grafting, significant scarring', low: 520_000, high: 2_200_000 },
      { label: 'Severe/Extensive Burns, Disfigurement', description: 'Major TBSA, multiple surgeries, permanent disfigurement, PTSD', low: 1_600_000, high: 7_000_000 },
    ],
    liabilityFactors: [
      'Post-crash fire investigation — fuel system integrity, ignition source, time-to-ignition',
      'HAZMAT manifest and carrier compliance with 49 CFR HAZMAT regulations',
      'FMCSA fuel tank integrity standards (49 CFR §393.67) compliance analysis',
      'Burn center medical records documenting TBSA (total body surface area) and depth',
      'Plastic surgery expert testimony on lifetime reconstructive surgery needs',
      'Life care plan with 10-year burn treatment projection (pressure garments, surgeries, therapy)',
      'Disfigurement damages — separate and substantial in burn cases beyond medical costs',
    ],
  },

  {
    slug: 'whiplash-neck-injury',
    name: 'Whiplash & Cervical Neck Injury',
    shortName: 'Whiplash',
    description:
      'Whiplash is a cervical soft-tissue injury caused by rapid hyperextension-hyperflexion of the neck — the characteristic "cracking of a whip" motion that occurs when a vehicle is struck from behind. Despite being labeled "minor" by defense insurers, whiplash injuries exist on a spectrum from self-resolving (weeks to months) to permanently disabling. Severe whiplash causes facet joint injuries, disc injuries, and ligament tears that can produce chronic pain, radiculopathy (nerve pain radiating into arms), and headaches lasting years. Truck rear-end collisions — involving 40-ton vehicles striking passenger cars — generate whiplash forces far exceeding those in typical passenger-vehicle collisions.',
    symptoms: [
      'Neck pain and stiffness — often delayed 12–24 hours after crash',
      'Limited range of motion — inability to rotate or flex neck without pain',
      'Cervicogenic headache — headache originating from neck structures',
      'Radiculopathy — pain, numbness, and tingling radiating into shoulder, arm, and hand (C5-C8 distribution)',
      'Temporomandibular joint (TMJ) dysfunction — jaw pain and clicking',
      'Tinnitus (ringing in ears) and dizziness',
      'Cognitive symptoms ("whiplash-associated disorder"): difficulty concentrating, memory problems',
    ],
    longTermEffects: [
      'Chronic whiplash-associated disorder (WAD) — 20–30% of whiplash victims develop symptoms lasting >2 years',
      'Acceleration of cervical degenerative disc disease — permanent structural change',
      'Facet joint pain syndrome — chronic pain requiring injections or radiofrequency ablation',
      'Cervical spondylosis — abnormal bone spurs developing at injury sites',
    ],
    commonTreatments: [
      'Ice, NSAIDs, and activity modification in acute phase (0–72 hours)',
      'Physical therapy: 6–24 weeks for moderate injuries',
      'Chiropractic manipulation (evidence-supported for Grade I–II whiplash)',
      'Diagnostic imaging: MRI of cervical spine to rule out disc herniation and ligament injury',
      'Trigger point injections, facet joint injections for pain management',
      'Radiofrequency ablation for chronic facet-mediated pain',
    ],
    treatmentCostLow: 8_000,
    treatmentCostHigh: 120_000,
    truckAccidentContext:
      'A fully loaded semi-truck weighs up to 40× more than a passenger vehicle. When a truck rear-ends a passenger car, the delta-V (change in velocity) imposed on the passenger vehicle occupant is far greater than in typical rear-end collisions. Even a truck traveling at 15–25 mph at impact can produce neck acceleration forces that cause Grade II–III whiplash in passenger vehicle occupants. Defense insurers routinely dispute whiplash injuries, arguing the "low-speed" nature of the impact — but force analysis specific to truck impacts consistently demonstrates that these crashes exceed soft-tissue injury thresholds even at speeds that appear minor.',
    multiplierLow: 1.5,
    multiplierHigh: 3,
    settlementRows: [
      { label: 'Mild Whiplash, Full Recovery', description: 'Grade I–II, symptoms resolve within 6 months with conservative care', low: 18_000, high: 78_000 },
      { label: 'Moderate, Chronic Pain', description: 'Grade II–III, symptoms persist 6–24 months, ongoing PT and injections', low: 58_000, high: 225_000 },
      { label: 'Severe, Structural Injury / Radiculopathy', description: 'Disc herniation, nerve involvement, surgery possible, permanent partial impairment', low: 145_000, high: 520_000 },
    ],
    liabilityFactors: [
      'Accident reconstruction to establish delta-V (velocity change) specific to truck mass',
      'ELD records establishing truck speed at time of impact',
      'MRI imaging — distinguishing soft-tissue from disc/structural injury is critical for value',
      'Neurological examination documenting radiculopathy distribution',
      'Cervical biomechanics expert to rebut defense "low-speed" arguments',
      'Physical therapy records documenting treatment duration and functional progress',
      'Employer records for lost wages during recovery',
    ],
  },

  {
    slug: 'back-injury-herniated-disc',
    name: 'Back Injury & Herniated Disc',
    shortName: 'Back Injury',
    description:
      'Lumbar (lower back) injuries are the most common category of serious non-fatal injury in commercial truck accidents. The thoracolumbar spine is subject to extreme compressive and rotational forces in frontal, rear-end, and rollover crashes. Herniated discs — where the nucleus pulposus of an intervertebral disc breaches the annulus fibrosus and compresses adjacent nerve roots — cause the combination of local back pain and radiculopathy (sciatica) that is the hallmark of disc injury. Truck accident disc injuries frequently require surgical intervention and can produce permanent work disability.',
    symptoms: [
      'Low back pain, often severe and sharp — rated 8–10/10 at injury onset',
      'Radiculopathy (sciatica) — pain, burning, and numbness radiating from the back into buttock, leg, and foot (L4-S1 distribution)',
      'Motor weakness in lower extremity — foot drop (L4-L5) or difficulty toe walking (S1)',
      'Neurogenic claudication — leg pain and weakness worsening with walking',
      'Bowel/bladder dysfunction — sign of cauda equina syndrome (surgical emergency)',
      'Lumbar facet pain — local back pain worsening with extension',
      'Muscle spasm and antalgic posture (leaning to one side)',
    ],
    longTermEffects: [
      'Adjacent segment disease — disc degeneration at spinal levels above and below fusion',
      'Failed back surgery syndrome (FBSS) — persistent or worsening pain after surgery',
      'Permanent work restrictions — lifting, bending, and prolonged sitting limitations',
      'Narcotic dependency risk with long-term pain management',
      'Chronic pain syndrome with associated depression and anxiety',
    ],
    commonTreatments: [
      'Conservative treatment: physical therapy, NSAIDs, muscle relaxants (6–12 weeks first-line)',
      'Epidural steroid injections for radiculopathy',
      'Microdiscectomy — minimally invasive disc removal for herniation with radiculopathy',
      'Spinal fusion (TLIF/PLIF) — for instability, spondylolisthesis, or multi-level disease',
      'Spinal cord stimulation — for failed back surgery syndrome',
      'Post-surgical rehabilitation: 3–6 months of structured PT',
    ],
    treatmentCostLow: 25_000,
    treatmentCostHigh: 450_000,
    truckAccidentContext:
      'Commercial truck crashes impose compressive spinal forces that can be 10–25× the forces generated in typical passenger vehicle accidents. Frontal impacts force the lumbar spine into severe flexion while the pelvis is held by the seatbelt, creating a lever-arm fracture and disc injury pattern. Rear-end impacts from a heavily loaded truck cause extreme hyperextension followed by hyperflexion, tearing the annulus fibrosus of lumbar discs. Rollover crashes add rotational forces that compound disc injury patterns. Many back injury victims arrive at the emergency department ambulatory and are cleared without spinal imaging — only to develop progressive radiculopathy over the following 24–72 hours as disc herniation worsens.',
    multiplierLow: 3,
    multiplierHigh: 6,
    settlementRows: [
      { label: 'Herniated Disc, Conservative Treatment', description: 'Physical therapy and injections resolve symptoms, no surgery', low: 68_000, high: 255_000 },
      { label: 'Microdiscectomy / Surgical Treatment', description: 'Radiculopathy requiring disc removal surgery, good outcome', low: 195_000, high: 680_000 },
      { label: 'Spinal Fusion / Permanent Disability', description: 'Multi-level fusion, failed back syndrome, or permanent work restrictions', low: 400_000, high: 1_400_000 },
    ],
    liabilityFactors: [
      'Pre-accident MRI comparison — if prior imaging exists, defense will claim pre-existing condition',
      'Crash reconstruction biomechanics establishing spinal load exceeding disc injury threshold',
      'Neurologist or neurosurgeon documenting clinical correlation between crash and disc injury',
      'Functional capacity evaluation establishing permanent work restrictions',
      'Life care plan for ongoing injection, medication, and surgical needs',
      'Vocational expert for earning capacity loss from physical job restrictions',
      'ELD records establishing truck speed and impact characteristics',
    ],
  },

  {
    slug: 'amputation',
    name: 'Amputation & Limb Loss',
    shortName: 'Amputation',
    description:
      'Traumatic amputation — loss of a limb or digit at the crash scene or through surgical amputation following crush injury — is one of the most severe non-fatal outcomes of commercial truck accidents. The mass and force of commercial trucks can pin, crush, or sever limbs, particularly in pedestrian and cyclist strikes, rollover crashes that trap occupants, and underride crashes that destroy vehicle structure around the occupant. Amputation cases involve extraordinary lifetime costs for prosthetics, rehabilitation, and accommodations — and generate among the highest settlement values in personal injury law outside of TBI and spinal cord injury cases.',
    symptoms: [
      'Traumatic amputation: immediate hemorrhage, pain, and shock',
      'Crush injury prior to amputation: compartment syndrome, nerve and vascular damage',
      'Phantom limb pain — experienced by 70–80% of amputees, often severe and chronic',
      'Residual limb (stump) complications: skin breakdown, neuroma formation, heterotopic ossification',
      'Overuse injuries in remaining limbs from compensatory biomechanics',
      'Bilateral lower limb amputation: full loss of ambulation capacity without prosthetics',
    ],
    longTermEffects: [
      'Lifetime prosthetic costs: $100,000–$600,000 per decade depending on limb level and technology',
      'Modern microprocessor prosthetics: $50,000–$100,000 each, requiring replacement every 3–5 years',
      'Home modification: $50,000–$200,000 for wheelchair accessibility, bathroom adaptation',
      'Accelerated joint degeneration in intact limbs from altered biomechanics',
      'Chronic phantom limb pain — often the most debilitating long-term complication',
    ],
    commonTreatments: [
      'Emergency hemorrhage control and transfusion',
      'Surgical debridement and definitive amputation if traumatic amputation is non-viable',
      'Replantation surgery (digits and distal limb) — requires microsurgery center, not always successful',
      'Residual limb shaping and maturation: 3–6 months before prosthetic fitting',
      'Prosthetic fitting and gait training: 3–12 months',
      'Lifetime prosthetic upgrades as technology advances and limb shape changes',
    ],
    treatmentCostLow: 400_000,
    treatmentCostHigh: 6_000_000,
    truckAccidentContext:
      'The extraordinary mass of commercial trucks makes amputation injuries possible at speeds that would not cause limb loss in passenger-vehicle-only accidents. Underride crashes — where a passenger vehicle slides under the truck trailer — concentrate crushing forces on specific areas of the vehicle, including door frames and A/B/C pillars, which can pin and sever occupant limbs. Truck tire blowout debris strikes at highway speeds have caused traumatic hand and arm amputations to drivers attempting to avoid the debris. Pedestrian and cyclist strikes by commercial trucks have high rates of lower extremity crush and amputation injuries.',
    multiplierLow: 8,
    multiplierHigh: 10,
    settlementRows: [
      { label: 'Single Digit or Partial Hand', description: 'Finger/thumb amputation, significant functional loss of dominant hand', low: 220_000, high: 680_000 },
      { label: 'Single Upper or Lower Limb', description: 'Arm or leg amputation, lifetime prosthetics, home modification', low: 1_500_000, high: 4_500_000 },
      { label: 'Multiple Limbs / Bilateral Lower', description: 'Two or more limbs — highest care and prosthetic lifetime costs', low: 4_000_000, high: 12_000_000 },
    ],
    liabilityFactors: [
      'Underride guard compliance — NHTSA and FMCSA standards for rear and side underride protection',
      'Emergency medical response — time to hemorrhage control and limb salvage viability',
      'Life care planner with certified prosthetist input — lifetime prosthetic replacement schedule',
      'Home modification architect for accessibility assessment',
      'Vocational expert — most single and bilateral amputees require career change and retraining',
      'Phantom limb pain treatment expert — spinal cord stimulator and targeted muscle reinnervation costs',
      'Truck undercarriage and structure inspection for defect claims (manufacturer liability)',
    ],
  },

  {
    slug: 'ptsd-emotional-distress',
    name: 'PTSD & Emotional Distress',
    shortName: 'PTSD',
    description:
      'Post-traumatic stress disorder (PTSD) and severe emotional distress are recognized and compensable injuries in truck accident cases. PTSD develops when the nervous system\'s threat-response system becomes chronically activated following a traumatic event. Commercial truck crashes — sudden, violent, and often life-threatening — are among the most reliable PTSD triggers. PTSD claims require documentation from licensed mental health professionals and are most compelling when supported by neuroimaging showing amygdala hyperactivation and when accompanied by objectively verifiable functional impairment such as inability to drive, work, or maintain relationships.',
    symptoms: [
      'Intrusive symptoms: flashbacks, nightmares, and involuntary re-experiencing of the crash',
      'Avoidance: inability to drive, refusing to travel on highways, avoiding vehicles or locations associated with the crash',
      'Negative cognitions and mood: survivor guilt, persistent negative beliefs, emotional numbing, anhedonia',
      'Hyperarousal: exaggerated startle response, sleep disruption, hypervigilance, difficulty concentrating',
      'Driving phobia — near-universal in severe truck accident PTSD; significant functional impairment',
      'Somatic symptoms: headaches, gastrointestinal disturbances, and fatigue',
    ],
    longTermEffects: [
      'Chronic PTSD: 30–40% of truck accident PTSD victims experience symptoms lasting >2 years',
      'Secondary depression and anxiety disorders complicating PTSD treatment',
      'Occupational impairment — inability to maintain employment due to concentration deficits, absenteeism, and interpersonal conflict',
      'Substance abuse as a PTSD coping mechanism — complicates treatment and damages credibility',
      'Relationship deterioration — divorce and family disruption are common consequences of severe PTSD',
    ],
    commonTreatments: [
      'Prolonged Exposure (PE) therapy — gold-standard PTSD treatment, 8–15 sessions',
      'EMDR (Eye Movement Desensitization and Reprocessing)',
      'Cognitive Processing Therapy (CPT)',
      'SSRI/SNRI pharmacotherapy: sertraline, paroxetine (FDA-approved for PTSD)',
      'Prazosin for nightmares',
      'Inpatient or intensive outpatient PTSD program for severe cases',
    ],
    treatmentCostLow: 12_000,
    treatmentCostHigh: 180_000,
    truckAccidentContext:
      'Commercial truck accident scenes are particularly traumatic: the scale of destruction, the sound and force of an 80,000-lb vehicle impact, the potential for fire, the entrapment period (often 15–45 minutes), and witnessing fatalities or severe injuries to others in the same vehicle. These factors consistently produce higher PTSD rates than passenger-vehicle accidents. Victims who were conscious throughout the crash and entrapment — unable to escape, uncertain of survival — are at particularly high risk for severe PTSD. The driving phobia component of truck accident PTSD is especially impairing for victims whose livelihood or daily functioning requires vehicle operation.',
    multiplierLow: 1.5,
    multiplierHigh: 4,
    settlementRows: [
      { label: 'Mild PTSD, Responds to Short-Term Therapy', description: 'PE/CPT therapy resolves symptoms within 6 months, returns to full function', low: 22_000, high: 105_000 },
      { label: 'Moderate PTSD, Ongoing Treatment', description: 'Persistent symptoms >1 year, impaired work and relationships, medication required', low: 90_000, high: 380_000 },
      { label: 'Severe / Chronic PTSD, Work Disability', description: 'Unable to work, severe functional impairment, lifetime treatment needs', low: 290_000, high: 850_000 },
    ],
    liabilityFactors: [
      'DSM-5 Criterion A documentation — licensed psychologist or psychiatrist establishing PTSD diagnosis',
      'Neuropsychological testing — objective cognitive and functional impairment metrics',
      'Pre-crash mental health records — defense will seek to establish prior mental health history',
      'Functional capacity evaluation for occupational impairment',
      'Driving phobia documentation — neuropsychology expert assessment',
      'Employment records showing reduced hours, termination, or career change post-crash',
      'Expert testimony on causation — connecting crash trauma to PTSD diagnosis per DSM-5 criteria',
    ],
  },
];

export function getInjuryTypeBySlug(slug: string): InjuryType | undefined {
  return INJURY_TYPES.find(i => i.slug === slug);
}
