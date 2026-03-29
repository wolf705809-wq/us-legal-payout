export interface GuideSection {
  id: string;
  title: string;
  body: string; // Multi-paragraph plain text, paragraphs separated by \n\n
  keyTakeaway?: string;
}

export interface GuideFAQ {
  q: string;
  a: string;
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  readingTimeMin: number;
  lastUpdated: string;
  sections: GuideSection[];
  faqs: GuideFAQ[];
  relatedSlugs: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Guide 1: What to Do After a Truck Accident
// ─────────────────────────────────────────────────────────────────────────────

const whatToDoAfterGuide: Guide = {
  slug: 'what-to-do-after-truck-accident',
  title: 'What to Do After a Truck Accident: A Step-by-Step Guide',
  description:
    'A comprehensive 10-step guide covering everything you must do after a truck accident — from securing the scene and calling 911, to preserving critical black box data and protecting your right to a fair settlement.',
  readingTimeMin: 12,
  lastUpdated: 'March 2026',
  sections: [
    {
      id: 'secure-the-scene',
      title: 'Step 1: Secure the Scene and Protect Yourself',
      body: `The moments immediately after a truck accident are chaotic and dangerous. Your first priority is physical safety — both yours and other people at the scene. If your vehicle is drivable and it is safe to do so, move it to the shoulder or a nearby parking area to clear the roadway. Turn on your hazard lights immediately. If you cannot move your car, stay inside with your seatbelt on until emergency services arrive, especially on a busy highway where secondary collisions are a real risk.\n\nLarge commercial trucks often carry flammable cargo — fuel, chemicals, or pressurized materials. Do not approach a damaged truck if you see smoke, fluid leaks, or fire. Maintain a safe distance and warn other bystanders to do the same. Never attempt to help an injured truck driver by opening cab doors or moving them, as this can worsen spinal injuries. Leave that to trained paramedics.\n\nIf you are physically able, use road flares or emergency triangles from your trunk to warn oncoming traffic. Truck accidents frequently occur on interstate highways where vehicles travel at high speeds. A secondary collision while you are standing outside your car is a leading cause of post-accident fatalities. Your safety is the foundation for every legal step that follows — you cannot pursue a claim if you are not alive to do so.`,
      keyTakeaway:
        'Move to safety first. Do not approach a smoking or leaking truck. Your physical safety takes absolute priority over any evidence-gathering steps.',
    },
    {
      id: 'call-911',
      title: 'Step 2: Call 911 Immediately',
      body: `Call 911 even if the accident appears minor. This is one of the most legally important steps you can take. A police report creates an official, contemporaneous record of the accident that is extremely difficult for insurers to dispute later. The responding officers will document the scene, record witness statements, note road and weather conditions, and often issue citations if the truck driver violated traffic laws — all of which become powerful evidence in your civil claim.\n\nWhen speaking with the 911 dispatcher, state your location as precisely as possible. Give the mile marker or cross street, the direction you were traveling, and the number of vehicles involved. Mention immediately if anyone is unconscious, trapped, or showing serious injuries so the dispatcher can send appropriate emergency medical services.\n\nWhen police arrive, be calm and factual. Describe what happened in simple terms: "I was traveling northbound on I-95 at approximately 65 mph when the truck changed lanes without signaling and struck the driver's side of my vehicle." Do not speculate, apologize, or say anything like "I should have braked sooner." Such statements can be used against you. Ask the responding officer for the report number and the names and badge numbers of all officers on scene. You will need this information to request the full report later, typically within 5–10 business days.`,
      keyTakeaway:
        "Always call 911 and get a police report. Even minor accidents can develop into serious injury claims days later, and an official report establishes the foundational record for your case.",
    },
    {
      id: 'document-evidence',
      title: 'Step 3: Document Evidence at the Scene',
      body: `Your smartphone is one of the most valuable tools you have at a truck accident scene. Start photographing and recording as soon as it is safe to do so. Capture the entire scene from multiple angles: the position of all vehicles before they are moved, the damage to your car, damage to the truck, skid marks or gouges in the pavement, debris fields, road conditions, weather conditions, traffic signs, and any visible cargo that may have shifted or spilled.\n\nFor the truck specifically, photograph the following: the DOT number on the door (this identifies the carrier), the license plate, the company name and logo, the truck's VIN, trailer number, any cargo labels or placards, and the driver's CDL license and registration. These identifiers allow your attorney to immediately pull the carrier's safety record from the FMCSA database and identify all potential defendants — the driver, the motor carrier, the shipper, or the truck owner.\n\nAlso document your own injuries the same day. Photograph bruising, lacerations, and swelling before they worsen or heal. If your injuries are not immediately visible — which is common with soft tissue damage, herniated discs, and concussions — photograph any physical symptoms that develop in the days that follow. Courts and insurers have increasingly relied on photographic timelines to validate injury claims. A single photo taken the day after an accident showing a bruised shoulder or neck swelling can be worth thousands of dollars in a settlement negotiation.`,
      keyTakeaway:
        'Photograph the truck DOT number, all vehicle positions, your injuries, and road conditions before anything is moved. This evidence is permanent while memories fade.',
    },
    {
      id: 'seek-medical-care',
      title: 'Step 4: Seek Medical Care — Even If You Feel Fine',
      body: `Adrenaline is a powerful masking agent. In the immediate aftermath of a violent collision, your body's stress response suppresses pain, allowing you to feel functional even when you have significant injuries. Whiplash, herniated discs, traumatic brain injuries, internal bleeding, and soft tissue damage frequently present with zero symptoms for 24 to 72 hours after impact. By the time pain and impairment become undeniable, you may have missed the critical window for establishing a clean medical record linking your injuries to the accident.\n\nGo to the emergency room the same day, or at minimum an urgent care clinic. Tell the treating physician exactly what happened: a truck struck your vehicle, describe the impact direction and force, and report every symptom no matter how minor — headache, stiffness, dizziness, blurring vision, or difficulty concentrating. These descriptions become part of your official medical record and directly support your legal claim.\n\nFollow through with all recommended follow-up care. One of the most common tactics insurance adjusters use to minimize settlements is pointing to "gaps in treatment" — periods where you did not seek medical attention. They will argue those gaps prove you were not seriously injured. Consistent, documented medical care creates an unbroken chain of evidence connecting the accident to your injuries and demonstrates to a jury or insurer the real, ongoing impact on your life. Keep every bill, prescription receipt, and appointment summary.`,
      keyTakeaway:
        "See a doctor the same day as the accident, even if you feel fine. Delayed-onset injuries are common in truck crashes, and gaps in medical treatment are the insurer's favorite argument to reduce your payout.",
    },
    {
      id: 'preserve-black-box-data',
      title: 'Step 5: Preserve Black Box Data — You Have a 30-Day Window',
      body: `Commercial trucks are equipped with Electronic Logging Devices (ELDs) and Event Data Recorders (EDRs), often called "black boxes." These devices record an extraordinary amount of data: the truck's speed in the seconds before impact, brake application timing, engine throttle position, GPS location history, hours driven that day, and whether any hard braking or rapid acceleration events occurred in the preceding hours. This data is arguably the most powerful evidence in any truck accident case — it can prove the driver was speeding, fatigued, or distracted without any eyewitness testimony.\n\nHere is the critical problem: most ELD systems overwrite or automatically delete data within 30 days. Some systems purge data even sooner. Trucking companies and their insurers know this and have strong financial incentive to let that clock run. In some documented cases, carriers have been found to have "accidentally" lost black box data in the weeks after a serious accident.\n\nYour attorney must send a spoliation letter — a formal legal demand to preserve evidence — to the trucking company within days of the accident, not weeks. This letter places the carrier on legal notice that the data is relevant to anticipated litigation. Destruction of evidence after receipt of a spoliation letter can result in severe court sanctions, including jury instructions that tell jurors to assume the destroyed evidence was unfavorable to the trucking company. Do not wait. Contact an attorney today if you have not already done so.`,
      keyTakeaway:
        'ELD black box data is deleted within 30 days. Your attorney must send a legal preservation (spoliation) letter to the trucking company immediately — this is a hard deadline with no exceptions.',
    },
    {
      id: 'avoid-recorded-statements',
      title: 'Step 6: Decline Recorded Statements to the Insurer',
      body: `Within 24 to 48 hours of a truck accident, you will likely receive a phone call from an insurance adjuster — either the truck driver's liability insurer or your own insurer. They will introduce themselves as friendly, empathetic, and just trying to "process your claim quickly." They will ask whether they can record the conversation to "document your account."\n\nDo not agree to a recorded statement without consulting an attorney. This is not being uncooperative or dishonest — it is protecting your legal rights. Insurance adjusters are trained professionals whose job is to gather statements they can use to minimize or deny your claim. They will ask open-ended questions like "How are you feeling today?" — and if you say "okay" or "better," that statement will appear in your file as evidence that your injuries are not serious. They will ask you to describe the accident in detail, and any inconsistency between your first statement and later testimony can be used to attack your credibility.\n\nYou are legally required to report the accident to your own insurer in a timely manner, but you are generally not required to provide a recorded statement. A brief written notification that an accident occurred is typically sufficient. Once you have retained a truck accident attorney, all communication from insurers should be directed through your legal counsel. This is one of the clearest, most impactful ways an attorney earns their fee.`,
      keyTakeaway:
        "Never give a recorded statement to any insurance company before consulting an attorney. Adjusters are trained to use your own words against you.",
    },
    {
      id: 'hire-an-attorney',
      title: 'Step 7: Hire a Truck Accident Attorney',
      body: `Truck accident cases are fundamentally different from standard car accident claims. They involve multiple potential defendants — the driver, the motor carrier, the truck owner, the cargo shipper, the trailer manufacturer, and sometimes the freight broker. They are governed by a complex web of federal regulations enforced by the Federal Motor Carrier Safety Administration (FMCSA). Trucking companies are typically represented by specialized defense firms with dedicated accident response teams who deploy investigators to the scene within hours. By the time an unrepresented victim calls their personal injury attorney three weeks later, critical evidence has already been gathered and shaped by the defense.\n\nYou need a plaintiff's attorney who focuses specifically on commercial truck accidents — not a general personal injury firm that occasionally handles them. Ask prospective attorneys how many truck accident cases they handle annually, whether they have access to accident reconstruction experts, and whether they have deposed commercial truck drivers before.\n\nTruck accident attorneys work on contingency, meaning you pay zero upfront fees. They receive a percentage of your settlement — typically 33% before a lawsuit is filed and 40% after. While this sounds significant, studies consistently show that represented plaintiffs receive settlements 3 to 7 times larger than unrepresented ones, even after attorney fees. The math almost always favors representation. Contact several attorneys and choose one who demonstrates genuine familiarity with FMCSA regulations and has a track record with commercial truck cases specifically.`,
      keyTakeaway:
        'Hire a specialist truck accident attorney, not a general personal injury lawyer. Trucking companies deploy experts immediately — you need someone equally specialized in your corner.',
    },
    {
      id: 'file-insurance-claim',
      title: 'Step 8: File Your Insurance Claim Properly',
      body: `After a truck accident, there are typically multiple insurance policies in play, and understanding the coverage landscape determines your strategy. Federal law requires interstate commercial trucks to carry minimum liability insurance of $750,000, though most major carriers maintain policies of $1 million or more. Hazardous materials haulers are required to carry $5 million in coverage. This means the potential compensation pool is far larger than in a typical car accident.\n\nYour attorney will identify all potentially liable parties and their insurers. You may have claims against: the truck driver's personal liability policy, the motor carrier's commercial liability policy, the cargo shipper's general liability policy, and potentially your own underinsured motorist coverage if the truck's policy limits are insufficient to cover your damages.\n\nWhen you or your attorney formally notifies the insurer, be precise about dates, locations, and the nature of damages claimed. Do not provide a dollar amount in your initial notification — that comes in the formal demand letter, which should be drafted after you have completed medical treatment and have a clear picture of your total economic losses. Prematurely naming a dollar figure locks you into a number that may dramatically undervalue your actual damages, especially if injuries prove more serious than initially apparent.`,
      keyTakeaway:
        "Commercial truck policies often carry $750K to $5M in coverage — far more than car accident policies. Don't settle for less than full coverage by identifying all potentially liable parties.",
    },
    {
      id: 'gather-witnesses',
      title: 'Step 9: Gather Witness Information',
      body: `Independent witnesses — people with no relationship to either party — carry enormous weight in truck accident litigation. A truck driver and their employer will have a coordinated story. An independent eyewitness who watched the truck driver run a red light or drift out of their lane is nearly impossible to dismiss. At the scene, before police disperse the crowd, approach anyone who stopped to observe and ask for their name and phone number. Many people are willing to provide information at the scene but will not come forward on their own later.\n\nAlso look for potential witnesses who were not physically present but may have filmed the accident. Check whether nearby businesses have exterior security cameras facing the road. Traffic cameras at intersections or highway monitoring cameras may have captured the collision. Dashcams in nearby vehicles — increasingly common among both commercial and private drivers — may have recorded the incident from multiple angles. Your attorney can send preservation requests to businesses and traffic authorities to secure this footage before it is overwritten.\n\nBe aware that the truck driver's employer may have already contacted other witnesses by the time you hire an attorney. Defense investigators sometimes secure favorable statements from confused or sympathetic bystanders within hours of a crash. Your attorney should interview all identified witnesses as quickly as possible and, if warranted, take sworn depositions to lock in favorable testimony before memories fade or witnesses become unavailable.`,
      keyTakeaway:
        'Get witness contact information at the scene immediately. Also look for nearby security cameras and dashcam footage — this evidence disappears quickly and can be decisive.',
    },
    {
      id: 'track-all-expenses',
      title: 'Step 10: Track Every Expense and Impact on Your Life',
      body: `Your settlement is built on documented losses — not on what your injuries felt like, but on what they cost you in quantifiable terms. From the day of the accident forward, maintain a meticulous record of every expense and every way the accident has affected your life. This documentation directly translates into settlement dollars.\n\nEconomic damages to document include: all medical bills from every provider (ER, specialists, physical therapists, chiropractors, mental health counselors), prescription costs, medical equipment purchases such as braces or crutches, transportation costs to and from medical appointments, lost wages for every day of work missed, lost earning capacity if your injuries prevent you from returning to your prior occupation, and the cost of hired help for household tasks you can no longer perform such as lawn care or childcare.\n\nNon-economic damages are equally compensable but harder to quantify. Keep a daily injury journal describing your pain levels on a scale of 1-10, activities you were unable to perform, emotional distress, disrupted sleep, relationship strain, and loss of enjoyment of life. Entries should be dated and specific. This journal becomes powerful evidence of the human cost of your injuries and forms the basis for the non-economic "multiplier" applied to your economic damages when calculating your total settlement demand. Courts and juries respond to concrete, dated narratives far more than vague descriptions of suffering.`,
      keyTakeaway:
        'Keep every receipt and write daily journal entries about your pain and limitations. Non-economic damages are multiplied on top of your economic losses — documentation of both is essential.',
    },
  ],
  faqs: [
    {
      q: 'How long do I have to file a truck accident lawsuit?',
      a: "The statute of limitations for truck accident claims varies by state, typically ranging from 2 to 3 years from the date of the accident. However, several factors can shorten this window: if a government vehicle was involved, notice of claim deadlines may be as short as 60-90 days. Additionally, the 30-day deadline for preserving black box data makes acting quickly essential regardless of the filing deadline. Never wait until the last minute — critical evidence is destroyed long before the statute of limitations expires.",
    },
    {
      q: 'Should I accept the insurance company\'s first settlement offer?',
      a: "Almost never. The first offer from a trucking company's insurer is almost always a lowball figure designed to close your claim before you understand the full extent of your injuries and losses. Once you accept a settlement and sign a release, you cannot reopen the claim even if your injuries prove far more serious than initially apparent. Always consult an attorney before accepting any offer, and wait until you have reached maximum medical improvement — the point at which your condition has stabilized — so you can accurately calculate the full value of your claim.",
    },
    {
      q: 'What if the truck driver was an independent contractor, not an employee?',
      a: "Trucking companies frequently attempt to insulate themselves from liability by classifying drivers as independent contractors rather than employees. Courts have increasingly rejected this defense in truck accident cases, applying the 'statutory employee' doctrine under FMCSA regulations, which holds motor carriers liable for drivers operating under their authority regardless of employment classification. If a carrier exercised meaningful control over the driver's work — routes, schedules, truck specifications, or dispatch — courts often find sufficient grounds for carrier liability even when the driver held contractor status.",
    },
    {
      q: 'What is a spoliation letter and do I really need one?',
      a: "A spoliation letter is a formal written notice to the trucking company demanding that all potentially relevant evidence be preserved and not destroyed, modified, or overwritten. This includes ELD data, dashcam footage, driver logs, maintenance records, dispatch communications, and drug/alcohol test results. Once a carrier receives a spoliation letter, destruction of evidence can result in court sanctions and adverse inference jury instructions — meaning the jury can be told to assume the destroyed evidence was harmful to the defendant. Your attorney should send this letter within days of the accident.",
    },
    {
      q: 'Can I still recover compensation if I was partially at fault for the accident?',
      a: "Yes, in most states. The majority of states use some form of comparative fault, which allows you to recover damages reduced by your percentage of fault. In the 33 states using the modified 51% rule, you can recover as long as you were less than 51% at fault. In the 13 pure comparative fault states, you can recover even if you were 99% at fault, though your award is reduced accordingly. Only 4 states plus Washington D.C. still use contributory negligence, which bars all recovery if you bore any fault. An attorney can often reduce your assigned fault percentage through investigation.",
    },
  ],
  relatedSlugs: [
    'how-truck-accident-settlements-work',
    'fmcsa-regulations-and-your-rights',
    'trucking-company-liability',
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Guide 2: How Truck Accident Settlements Work
// ─────────────────────────────────────────────────────────────────────────────

const howSettlementsWorkGuide: Guide = {
  slug: 'how-truck-accident-settlements-work',
  title: 'How Truck Accident Settlements Work',
  description:
    'Understand the full truck accident settlement process — from calculating economic and non-economic damages, how the damages multiplier is applied, to the negotiation process, when cases go to trial, and what factors most impact your final payout.',
  readingTimeMin: 10,
  lastUpdated: 'March 2026',
  sections: [
    {
      id: 'what-damages-you-can-recover',
      title: 'What Damages You Can Recover',
      body: `Truck accident damages fall into two broad categories: economic damages and non-economic damages. Understanding both is essential to evaluating whether any settlement offer is fair.\n\nEconomic damages are your objectively measurable financial losses. They include: all past and future medical expenses (emergency room bills, surgery costs, rehabilitation, ongoing therapy, prescriptions, and medical equipment), lost wages for time already missed from work, and lost earning capacity if your injuries permanently reduce your ability to earn income. In catastrophic injury cases involving spinal cord damage, traumatic brain injury, or amputation, future lost earning capacity can represent hundreds of thousands to millions of dollars over a working lifetime. Also recoverable are property damage to your vehicle, out-of-pocket costs such as transportation to medical appointments, and the cost of services you can no longer perform yourself such as childcare or home maintenance.\n\nNon-economic damages compensate for losses that have no invoice — pain and suffering, emotional distress, loss of enjoyment of life, loss of consortium (the impact on your relationship with your spouse), disfigurement, and permanent disability. These damages are real and legally recognized but more difficult to calculate. They are typically computed using a multiplier applied to your total economic damages, which we explain in the next section. In cases involving egregious conduct by the trucker or carrier — drunk driving, falsified logs, knowingly using a defective vehicle — punitive damages may also be available to punish the defendant and deter future misconduct.`,
      keyTakeaway:
        "Your claim includes both economic losses (bills, wages) and non-economic losses (pain, suffering, life impact). Don't leave non-economic damages on the table — they can exceed your economic losses in serious cases.",
    },
    {
      id: 'damages-multiplier',
      title: 'How the Damages Multiplier Works',
      body: `The multiplier method is the most widely used approach for calculating non-economic damages in personal injury cases. After calculating your total economic damages, you multiply that figure by a number between 1.5 and 10 to arrive at your total non-economic damages. The multiplier is not arbitrary — it reflects the severity of your injuries, their expected permanence, and the overall impact on your quality of life.\n\nA multiplier of 1.5x to 2x is typical for minor injuries: soft tissue injuries that resolved within a few months, minor fractures that healed fully, short-term pain and inconvenience. A multiplier of 3x to 4x is common for moderate injuries: injuries requiring surgery, disc herniations requiring ongoing treatment, fractures with incomplete recovery, injuries causing lasting but manageable pain. A multiplier of 5x to 7x applies to severe injuries: permanent partial disability, chronic pain requiring long-term medication management, conditions that prevent return to prior work or activities. Multipliers of 8x to 10x are reserved for catastrophic or life-altering injuries: paralysis, severe traumatic brain injury, loss of limb, permanent total disability, and wrongful death cases involving loss of primary financial support.\n\nSo if your economic damages total $100,000 and you suffered a herniated disc requiring surgery with ongoing impairment, a 4x multiplier yields $400,000 in non-economic damages, for a total claim value of $500,000. Insurance adjusters use their own versions of this calculation — often lower — which is why understanding the multiplier helps you evaluate whether their offer is fair.`,
      keyTakeaway:
        'The damages multiplier ranges from 1.5x for minor injuries to 10x for catastrophic ones. Multiply your total economic losses by the appropriate factor to estimate your non-economic damages.',
    },
    {
      id: 'negotiation-process',
      title: 'The Settlement Negotiation Process',
      body: `Most truck accident cases settle before trial — typically between 65% and 90% of all filed claims. Understanding the negotiation sequence helps you manage expectations and avoid making costly premature decisions.\n\nThe process begins with a demand letter, usually sent by your attorney after you have reached maximum medical improvement and all economic losses are calculable. The demand letter is a comprehensive document that presents your version of the accident, summarizes your injuries and treatment, quantifies all economic damages with supporting documentation, asserts non-economic damages with a justification for the multiplier used, identifies FMCSA violations and other fault evidence, and states a specific settlement demand figure. This opening demand is deliberately higher than your bottom line, leaving room for negotiation.\n\nThe insurer's adjuster will respond with a counteroffer — typically far lower than your demand, often accompanied by arguments disputing liability, questioning the necessity of certain treatments, or challenging your injury severity. Your attorney responds with a second demand letter reducing from the original figure but still above your target. This back-and-forth continues through multiple rounds. In many cases, mediation — a structured negotiation session with a neutral third-party mediator — is used to bridge persistent gaps and reach a final number. Throughout this process, your attorney must weigh the strength of your evidence, the jurisdiction's jury tendencies, and the cost and risk of trial against the certainty of a settlement.`,
      keyTakeaway:
        "Settlement negotiation is a structured process, not a single conversation. Your opening demand should be higher than your target, and you should expect multiple rounds of back-and-forth before reaching a fair number.",
    },
    {
      id: 'trial-vs-settle',
      title: 'When Cases Go to Trial vs. Settle',
      body: `The vast majority of truck accident cases settle before trial, but some must go before a jury to achieve fair compensation. Understanding what drives cases to trial helps you make informed decisions with your attorney.\n\nCases are more likely to go to trial when: liability is genuinely disputed (e.g., both parties have conflicting accounts and limited physical evidence), the damages amount is enormous and the insurer refuses to pay a figure commensurate with the injuries, the defendant is a large corporation whose legal team calculates that fighting is cheaper than settling, or the plaintiff's attorney has a track record of strong trial results that raises the stakes of losing at trial.\n\nCases almost always settle when: liability evidence is overwhelming (black box data showing speeding, positive drug test, FMCSA violation history), the injured party's damages are well-documented and severe, the carrier's insurer faces potential punitive damages, or the plaintiff's attorney has demonstrated willingness and ability to take the case to a jury.\n\nTrial carries real risks even in strong cases. Juries are unpredictable. Trials take years to reach, during which you receive no compensation. Legal costs escalate dramatically. However, the threat of trial — credible and credibly backed by an attorney who actually tries cases — is what motivates insurers to offer fair settlements in the first place. A plaintiff's attorney who never goes to trial has no leverage in negotiation.`,
      keyTakeaway:
        'The threat of trial is your most powerful negotiating leverage. Choose an attorney who actually tries truck accident cases — their trial record is what keeps insurers honest at the negotiation table.',
    },
    {
      id: 'factors-affecting-settlement',
      title: 'What Affects Settlement Amount Most',
      body: `Multiple variables interact to determine the ultimate settlement value of a truck accident case. Understanding these factors helps you evaluate offers and maximize your recovery.\n\nThe single most important factor is injury severity and permanence. A fully recovered soft tissue injury and a permanent spinal cord injury are in entirely different compensation universes. Objective medical evidence — imaging studies like MRI and CT scans, surgical records, functional capacity evaluations, and treating physician testimony — carries far more weight than subjective pain complaints alone. Cases with strong objective medical documentation consistently settle higher.\n\nThe second most important factor is liability clarity. If the truck driver ran a red light and was cited, if the black box shows the truck was traveling 20 mph over the speed limit, if the driver tested positive for stimulants — these create overwhelming liability that motivates early, substantial settlement. Conversely, if liability is murky, the insurer has leverage to reduce the offer.\n\nOther significant factors include: the defendant's FMCSA safety record (a carrier with a pattern of violations faces heightened exposure), whether punitive damages are available (they dramatically increase settlement leverage), the plaintiff's comparative fault percentage, the jurisdiction's jury tendencies (some venues are known for large plaintiff verdicts), and the specific insurance policy limits in play. Finally, the quality and reputation of your attorney matters enormously — experienced truck accident attorneys consistently extract higher settlements than general practitioners.`,
      keyTakeaway:
        'Injury severity, objective medical evidence, and liability clarity are the three biggest drivers of settlement value. A documented FMCSA violation by the trucker can double or triple your leverage.',
    },
    {
      id: 'typical-timelines',
      title: 'Typical Settlement Timelines',
      body: `One of the most common and reasonable questions clients ask is: how long will this take? Truck accident cases take longer than standard car accident claims because of their complexity, the number of parties involved, and the volume of evidence that must be gathered and analyzed.\n\nMinor to moderate injury cases with clear liability typically resolve in 6 to 18 months. This timeline allows time for medical treatment to conclude, economic damages to be fully tabulated, evidence to be compiled, a demand letter to be sent and negotiated, and a settlement to be reached without litigation. Cases that require a lawsuit to be filed — either because negotiations stall or the insurer refuses to make a reasonable offer — typically add 12 to 24 additional months.\n\nSevere and catastrophic injury cases commonly take 2 to 4 years because the full extent of future losses (lifetime medical costs, long-term earning capacity) requires expert analysis, and both sides invest heavily in litigation preparation. Wrongful death cases may take longer still due to the emotional stakes and the complexity of proving future financial losses to a surviving family.\n\nThroughout this process, avoid the temptation to accept early lowball offers simply because you need money quickly. If you have serious injuries and legitimate financial pressure, discuss a litigation funding arrangement with your attorney — a third-party advance on your expected settlement that allows you to wait for a fair resolution without financial desperation.`,
      keyTakeaway:
        "Simple truck accident cases settle in 6-18 months; complex catastrophic injury cases can take 2-4 years. Don't accept a low early offer out of financial pressure — explore litigation funding options instead.",
    },
  ],
  faqs: [
    {
      q: 'Is a truck accident settlement taxable income?',
      a: "Generally, compensation received for physical injuries in a personal injury settlement is not taxable under federal law. This covers medical expense reimbursements, pain and suffering damages, and lost wages attributable to physical injury. However, punitive damages are taxable, and compensation for emotional distress not attributable to physical injury may be taxable. Interest earned on a judgment is taxable. Because tax treatment is fact-specific, consult a tax professional before treating any settlement proceeds as non-taxable.",
    },
    {
      q: 'What is the average truck accident settlement amount?',
      a: "Truck accident settlements vary enormously based on injury severity, liability evidence, and jurisdiction. Minor injury cases often settle between $50,000 and $150,000. Moderate injury cases commonly range from $150,000 to $750,000. Severe and catastrophic injury cases can reach $1 million to $10 million or more. Wrongful death cases typically settle between $1 million and $5 million, though cases involving high earners or multiple defendants can far exceed this. These ranges reflect that commercial truck policies carry far higher coverage limits than standard auto policies.",
    },
    {
      q: 'Can I reject a settlement offer after accepting it?',
      a: "Once you sign a release and accept a settlement, you generally cannot reject it or seek additional compensation — even if your injuries prove more serious than expected. This is why you should never accept a settlement offer before reaching maximum medical improvement. The only exceptions are narrow: fraud in the inducement, mutual mistake of material fact, or duress. These exceptions are rarely successful. Your best protection is never signing until your attorney has reviewed the offer and you have a complete picture of all your damages.",
    },
    {
      q: 'How are medical liens handled in a truck accident settlement?',
      a: "If your health insurer, Medicare, Medicaid, or another provider paid your medical bills, they often have a right to reimbursement from your settlement — called a lien. Before you receive your net settlement proceeds, these liens must be addressed. Experienced truck accident attorneys routinely negotiate liens down, sometimes substantially, which increases the amount that ultimately reaches your pocket. Failing to address liens properly can result in the lienholder suing you or your attorney after the settlement closes.",
    },
    {
      q: "Does hiring an attorney really increase my settlement, or are the fees just eating into it?",
      a: "Research and industry data consistently show that represented plaintiffs receive substantially higher gross settlements than unrepresented plaintiffs, even after accounting for attorney fees. The Insurance Research Council found that represented claimants received settlements 3.5 times larger on average. In truck accident cases specifically, the gap is even wider because unrepresented plaintiffs typically cannot access black box data, conduct FMCSA records research, or credibly threaten litigation. Attorney fees — typically 33% before suit is filed and 40% after — are almost always offset by the higher gross recovery an attorney achieves.",
    },
  ],
  relatedSlugs: [
    'what-to-do-after-truck-accident',
    'comparative-fault-laws-by-state',
    'trucking-company-liability',
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Guide 3: FMCSA Regulations and Your Rights
// ─────────────────────────────────────────────────────────────────────────────

const fmcsaGuide: Guide = {
  slug: 'fmcsa-regulations-and-your-rights',
  title: 'Understanding FMCSA Regulations and Your Rights',
  description:
    'A complete breakdown of Federal Motor Carrier Safety Administration regulations — hours of service limits, ELD mandates, maintenance requirements, drug testing, and BASIC safety scores — and how violations of these rules strengthen your truck accident claim.',
  readingTimeMin: 11,
  lastUpdated: 'March 2026',
  sections: [
    {
      id: 'what-is-fmcsa',
      title: 'What Is the FMCSA?',
      body: `The Federal Motor Carrier Safety Administration is a U.S. Department of Transportation agency established in January 2000. Its singular mission is reducing crashes, injuries, and fatalities involving large trucks and buses. The FMCSA accomplishes this through rulemaking — establishing binding safety standards for commercial motor vehicle drivers and carriers — and through enforcement, including roadside inspections, compliance reviews, and the authority to place carriers out of service.\n\nFMCSA regulations apply to commercial motor vehicles (CMVs) operating in interstate commerce — those crossing state lines or transporting goods that originated in or are destined for another state. A CMV is generally defined as a vehicle with a gross vehicle weight rating of 10,001 pounds or more, a vehicle designed to transport more than 15 passengers, or any vehicle transporting hazardous materials requiring placarding.\n\nFor truck accident victims, the FMCSA framework is enormously important. When a trucking company or driver violates FMCSA regulations, those violations constitute evidence of negligence per se — meaning the violation itself establishes that the defendant breached their legal duty of care. You do not need to prove the violation was unreasonable; the federal regulation establishes the standard. A driver who was 13 hours into a shift when the limit is 11 hours, or a truck that had not been properly inspected, or a carrier with an out-of-service safety rating — all of these create powerful legal leverage for an injured plaintiff.`,
      keyTakeaway:
        'FMCSA violations create negligence per se — the violation itself proves the defendant breached their legal duty of care, without needing to prove the conduct was unreasonable.',
    },
    {
      id: 'hours-of-service',
      title: 'Hours of Service Rules: The 11-Hour Driving Limit',
      body: `FMCSA's Hours of Service (HOS) regulations are among the most safety-critical — and most frequently violated — rules in commercial transportation. They exist because driver fatigue is a factor in approximately 13% of all commercial truck crashes, according to FMCSA's own research. The rules establish strict limits on how many consecutive hours a driver may operate.\n\nFor property-carrying drivers: the 11-Hour Rule prohibits driving more than 11 hours after 10 consecutive hours off duty. The 14-Hour Rule prohibits driving after the 14th consecutive hour after coming on duty, even if the driver has not used all 11 driving hours. This means a driver who spent 4 hours loading cargo cannot extend their 14-hour window. The 30-Minute Break Rule requires a 30-minute interruption in driving after 8 cumulative hours on duty without a break. The 60/70-Hour Rule limits total on-duty time to 60 hours in 7 days or 70 hours in 8 days, after which the driver must take at least 34 consecutive hours off.\n\nThese rules have real safety logic: research shows that after 11 hours of driving, reaction time, decision-making speed, and hazard detection are all significantly impaired. A driver who was in hour 14 of their shift when they struck your vehicle was operating in a physiological state comparable to legally intoxicated driving. Your attorney's immediate job is to pull the driver's ELD records to determine their on-duty status at the time of the crash.`,
      keyTakeaway:
        'The 11-hour driving limit and 14-hour on-duty window are hard legal limits. A driver operating beyond either is violating federal law, and that violation directly supports your negligence claim.',
    },
    {
      id: 'eld-mandate',
      title: 'The ELD Mandate and What Black Box Data Shows',
      body: `The Electronic Logging Device (ELD) mandate, fully effective since December 2019, requires most commercial truck drivers to use an FMCSA-registered ELD to record hours of service automatically. ELDs connect directly to the truck's engine control module and record driving time, engine hours, vehicle movement, and GPS location in real time — replacing the old paper log system that was notoriously easy to falsify.\n\nWhat ELD data actually captures is remarkable in scope. The device records: each instance the engine starts and stops, the date, time, and GPS location of every status change (driving, on-duty not driving, sleeper berth, off-duty), total driving hours and cumulative on-duty hours, vehicle speed at regular intervals, hard braking events, rapid acceleration, and diagnostic fault codes. When downloaded and analyzed by your attorney's accident reconstruction expert, this data can establish with precision whether the driver exceeded their 11-hour limit, whether they falsified breaks, how fast the truck was traveling in the 30 seconds before impact, and whether any mechanical alerts were active.\n\nBecause ELD data can be so damaging to defendants, carriers have strong incentive to allow it to be overwritten. The 30-day preservation window we discussed earlier is real and urgent. Your attorney must demand this data immediately. Courts have repeatedly awarded sanctions — including default judgment — against carriers who allowed ELD data to be destroyed after receiving a preservation demand.`,
      keyTakeaway:
        'ELD data records speed, braking, hours, and GPS location in real time. This data can prove exactly what the driver was doing in the seconds before impact — but it must be preserved within 30 days.',
    },
    {
      id: 'maintenance-requirements',
      title: 'Vehicle Maintenance Requirements and Inspection Rules',
      body: `FMCSA's vehicle maintenance regulations impose specific obligations on both drivers and motor carriers to ensure trucks are roadworthy before every trip and maintained over their operational lifetime. Violations of these requirements that contribute to an accident create powerful evidence of both driver negligence and carrier negligence.\n\nPre-trip and post-trip Driver Vehicle Inspection Reports (DVIRs) are required before and after every trip. Drivers must inspect and report on dozens of specific systems: brakes, tires, coupling devices, lights, steering mechanism, windshield wipers, and more. If a driver submitted a clean DVIR and the truck had a defective component that contributed to your crash, the driver filed a false federal report — a separate violation with significant legal implications.\n\nAnnual inspections are required for every commercial vehicle. These must be conducted by qualified inspectors and documented in records that carriers are required to maintain for at least 14 months. Inspections cover hundreds of specific components. If a truck's brakes were out of specification, its tires were worn beyond legal limits, or its steering was compromised — and the annual inspection records show these defects were present or should have been detected — the carrier faces direct liability for negligent maintenance.\n\nBrake failures and tire blowouts are among the leading mechanical causes of commercial truck crashes. FMCSA data shows that brake-related issues appear in approximately 29% of trucks placed out of service during roadside inspections. When mechanical failure contributed to your accident, maintenance records are critical evidence.`,
      keyTakeaway:
        "Carriers must maintain annual inspection records for 14 months. If the truck had a defective component that caused your crash, maintenance failures create direct carrier liability separate from driver negligence.",
    },
    {
      id: 'drug-alcohol-testing',
      title: 'Drug and Alcohol Testing Requirements',
      body: `FMCSA drug and alcohol testing regulations are among the most stringent in any industry. Commercial truck drivers are subject to pre-employment testing, random testing throughout their career, reasonable suspicion testing, post-accident testing, return-to-duty testing, and follow-up testing after a violation. These mandatory testing programs exist because impaired driving is disproportionately dangerous when the vehicle weighs 80,000 pounds.\n\nPost-accident drug and alcohol testing is particularly relevant to your claim. FMCSA requires post-accident testing of a driver who received a citation from a traffic law violation, or whenever: a person died in the accident, someone was injured and required immediate medical treatment, or a vehicle was towed. The driver must be tested for alcohol within 2 hours (and no later than 8 hours) and for controlled substances within 32 hours. If testing is not conducted within these windows, the carrier must document why. Failure to conduct required post-accident testing is itself an FMCSA violation.\n\nDrivers are prohibited from using alcohol within 4 hours of duty, having a blood alcohol concentration of 0.04% or higher while on duty (half the standard 0.08% limit for the general public), or using any Schedule I controlled substance. FMCSA also maintains a Drug and Alcohol Clearinghouse — a federal database employers must check before hiring a driver and annually thereafter — to prevent drivers with drug violations from moving between carriers undetected. If the driver who hit you had a prior drug violation that was not properly addressed, the carrier may face negligent hiring liability.`,
      keyTakeaway:
        "Post-accident drug and alcohol testing is legally required within specific time windows. If the carrier failed to test the driver after your crash, that failure is itself an FMCSA violation supporting your claim.",
    },
    {
      id: 'basic-safety-scores',
      title: "BASIC Safety Scores: What They Mean and How to Use Them",
      body: `The FMCSA's Safety Measurement System (SMS) evaluates motor carriers through seven Behavior Analysis and Safety Improvement Categories, known as BASICs. Each BASIC measures a different aspect of carrier safety using data from roadside inspections and crash reports. Understanding these categories helps you identify whether the company that employed your driver has a documented pattern of safety violations.\n\nThe seven BASIC categories are: (1) Unsafe Driving — speeding, reckless driving, improper lane changes; (2) Hours-of-Service Compliance — hours violations, false logs; (3) Driver Fitness — invalid CDL, medical disqualification; (4) Controlled Substances/Alcohol — positive drug or alcohol tests; (5) Vehicle Maintenance — brake violations, tire defects, lighting failures; (6) Hazardous Materials Compliance — for applicable carriers; and (7) Crash Indicator — crash involvement history weighted by severity.\n\nEach BASIC is scored from 0 to 100, with higher scores indicating worse performance. Carriers exceeding certain thresholds are flagged and may be subject to FMCSA compliance reviews. When a carrier has elevated BASIC scores — particularly in Unsafe Driving, Hours-of-Service, or Crash Indicator — it establishes a documented pattern of negligence that your attorney can use to support punitive damages claims and to argue the carrier knew their safety practices were dangerous. BASIC data is publicly searchable at the FMCSA's Safety Measurement System website.`,
      keyTakeaway:
        'A carrier with elevated BASIC scores in Unsafe Driving or Hours-of-Service has a documented federal pattern of negligence — this supports punitive damages and dramatically strengthens your case.',
    },
    {
      id: 'fmcsa-violations-strengthen-case',
      title: 'How FMCSA Violations Strengthen Your Case',
      body: `When you build a truck accident case, the presence of FMCSA violations transforms it from a simple negligence claim into a case with multiple, compounding theories of liability. Each violation adds another layer of evidence that the defendant failed to meet established legal standards — and each layer increases settlement pressure and the potential for a larger jury verdict.\n\nNegligence per se is the most direct impact. Under this doctrine, violation of a safety statute or regulation designed to protect the public automatically establishes breach of duty — one of the four elements of negligence. Instead of arguing that the carrier's conduct was unreasonable in light of general standards, your attorney simply proves the regulation existed, it was designed to protect people in your position, the defendant violated it, and that violation caused your harm. Courts across the country have held FMCSA regulations as the basis for negligence per se.\n\nBeyond per se liability, FMCSA violations support punitive damages when they reflect a pattern of conscious disregard for safety. A carrier that falsified driver logs, ignored its own DVIR reports showing brake defects, and employed a driver with a prior DUI — even separately, these violations indicate willful disregard. Together, they paint a picture for a jury of a company that knowingly put a dangerous vehicle on the road with an impaired driver to save money. Federal courts and state courts alike have upheld substantial punitive damage awards in cases with FMCSA violation evidence. The violation record is often the most impactful document your attorney can obtain.`,
      keyTakeaway:
        'Each FMCSA violation adds a layer of negligence evidence and can support punitive damages. A pattern of violations shows conscious disregard for safety — the strongest possible foundation for a maximum settlement.',
    },
  ],
  faqs: [
    {
      q: 'How do I find out if the trucking company has a bad safety record?',
      a: "The FMCSA's Safety Measurement System (SMS) is publicly accessible at ai.fmcsa.dot.gov/SMS. Using the carrier's DOT number — which you should have photographed from the truck door — you can look up the carrier's BASIC scores, inspection history, crash records, and any out-of-service orders. Your attorney will conduct a comprehensive records pull, but the public database gives you immediate insight into whether the carrier has a pattern of violations.",
    },
    {
      q: 'Are FMCSA hours of service rules different for local drivers?',
      a: "Yes, there are some exceptions for short-haul operations. Drivers who operate within a 150 air-mile radius, return to the same location daily, and do not use a sleeper berth may be exempt from ELD requirements and the 30-minute break rule, and may qualify for a 14-hour on-duty extension. However, these exceptions have strict conditions and do not eliminate all HOS requirements. Even exempt drivers must maintain time records, and evidence of fatigue — erratic driving patterns, multiple near-misses recorded on dashcam — can support negligence claims even without a direct HOS violation.",
    },
    {
      q: 'Can a truck driver be personally liable in addition to the company?',
      a: "Yes. The driver can be personally liable for their own negligent or reckless conduct — speeding, texting, impaired driving, or ignoring known mechanical defects. However, in practice, the motor carrier's liability policy is the primary target because individual drivers typically lack the assets to satisfy a substantial judgment. Naming both the driver and the carrier as defendants creates maximum pressure and ensures all available insurance coverage is on the table. In cases involving an owner-operator who owns their own truck, the driver's personal policy and the carrier's policy may both be relevant.",
    },
    {
      q: 'What is the difference between a motor carrier and a freight broker?',
      a: "A motor carrier is the company that physically operates the truck and employs or contracts the driver. A freight broker is a middleman who arranges transportation between shippers and carriers for compensation — they do not operate vehicles themselves. Historically, brokers successfully argued they bore no liability for carrier accidents. Recent litigation and some legislative developments have eroded this defense. Courts have found broker liability when brokers failed to adequately vet carriers' safety records before hiring them. If a broker selected a carrier with documented FMCSA violations and that carrier's driver caused your injuries, broker liability may be available.",
    },
    {
      q: 'Does FMCSA apply to intrastate trucking (trucks that never cross state lines)?',
      a: "Federal FMCSA regulations apply primarily to interstate commerce. However, most states have adopted regulations that mirror FMCSA standards for intrastate commercial vehicles — trucks operating entirely within state borders. Even when federal FMCSA regulations technically do not apply, violation of the equivalent state regulation serves the same legal function in establishing negligence. Additionally, many trucks that appear to operate locally are actually transporting goods that originated in or are destined for another state, which triggers federal jurisdiction regardless of the physical route.",
    },
  ],
  relatedSlugs: [
    'what-to-do-after-truck-accident',
    'trucking-company-liability',
    'how-truck-accident-settlements-work',
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Guide 4: Comparative Fault Laws by State
// ─────────────────────────────────────────────────────────────────────────────

const comparativeFaultGuide: Guide = {
  slug: 'comparative-fault-laws-by-state',
  title: 'Comparative Fault Laws: How Your State Affects Your Settlement',
  description:
    'Your state\'s fault law can dramatically change how much you recover — or whether you recover at all. Learn the four fault systems, which states use each, how fault percentages impact real settlement dollars, and how an attorney can reduce your assigned fault.',
  readingTimeMin: 10,
  lastUpdated: 'March 2026',
  sections: [
    {
      id: 'what-is-comparative-fault',
      title: 'What Is Comparative Fault?',
      body: `Comparative fault — also called comparative negligence — is the legal framework courts use to apportion responsibility for an accident among multiple parties, including the injured plaintiff. It recognizes that in many accidents, more than one person's conduct contributed to the outcome. Rather than asking simply "who caused the accident," comparative fault asks "what percentage of the total fault belongs to each party?"\n\nHistorically, American courts used the contributory negligence doctrine, under which a plaintiff who bore any percentage of fault — even 1% — was completely barred from recovering any damages. This harsh rule produced obviously unjust outcomes and was gradually replaced by various forms of comparative fault throughout the 20th century. Today, only a small minority of jurisdictions retain the old contributory negligence system.\n\nIn truck accident cases, fault allocation is a central battleground. Trucking companies and their insurers routinely argue that the victim contributed to the accident — by changing lanes without adequate clearance, traveling too fast for conditions, having a mechanical issue with their own vehicle, or any number of other theories. Even when the truck driver was obviously primarily at fault, an insurer may claim the plaintiff was 20% or 30% at fault to reduce the payout accordingly. Understanding your state's specific fault law tells you whether those arguments can bar your recovery entirely, partially reduce it, or have no effect on your eligibility to collect.`,
      keyTakeaway:
        "Fault allocation is a central negotiation battleground in every truck accident case. Your state's specific fault rule determines whether and how much a partial fault finding reduces your recovery.",
    },
    {
      id: 'pure-comparative-fault',
      title: 'Pure Comparative Fault: 13 States',
      body: `Pure comparative fault is the most plaintiff-friendly fault system. Under this rule, your damages are reduced by your percentage of fault — but you can recover something even if you were 99% responsible for the accident. The 13 states using pure comparative fault are: Alaska, Arizona, California, Florida, Kentucky, Louisiana, Mississippi, Missouri, New Mexico, New York, Rhode Island, South Dakota, and Washington.\n\nIn a pure comparative fault state, the math is straightforward. If your total damages are $500,000 and you are found 40% at fault for the accident, you recover $300,000 — your damages reduced by $200,000 (40%). If you were 80% at fault and your damages are $500,000, you still recover $100,000 (20%). This is significant in truck accident cases where the injured party may have made some error — like failing to maintain adequate following distance — while the truck driver's underlying negligence was far more culpable.\n\nPure comparative fault states tend to produce larger settlements in cases where the plaintiff bears some fault because the insurer cannot terminate recovery entirely. However, insurers in these states aggressively argue for higher plaintiff fault percentages, knowing that each percentage point reduces their payout. If an insurer argues you were 40% at fault and your attorney negotiates that down to 15%, the difference on a $500,000 claim is $125,000. Fault allocation negotiation in pure comparative fault states is therefore just as important as damages negotiation.`,
      keyTakeaway:
        'In pure comparative fault states (CA, NY, FL, and 10 others), you can recover even if you were 99% at fault — your award is simply reduced by your fault percentage.',
    },
    {
      id: 'modified-51-rule',
      title: 'Modified Comparative Fault — The 51% Bar Rule (33 States)',
      body: `The modified 51% bar rule is the most common fault system in the United States, used in 33 states: Alabama (no — see contributory), Arkansas, Colorado, Connecticut, Delaware, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Maine, Massachusetts, Michigan, Minnesota, Montana, Nebraska, Nevada, New Hampshire, New Jersey, Ohio, Oklahoma, Oregon, Pennsylvania, South Carolina, Tennessee, Texas, Utah, Vermont, West Virginia, Wisconsin, and Wyoming.\n\nUnder the 51% bar rule, a plaintiff can recover damages as long as they are no more than 50% at fault. If the plaintiff is found to be exactly 50% at fault, they can still recover — reduced by 50%. But if they are found 51% or more at fault, they are completely barred from any recovery. The logic is that a party more responsible for an accident than the defendant should not be able to collect from that defendant.\n\nIn practice, this rule creates a critical threshold that both sides fight over intensely. Insurers will argue aggressively that the plaintiff was at least 51% at fault to trigger the complete bar. Conversely, a finding of 49% plaintiff fault in a $1,000,000 case results in a $510,000 recovery — while a finding of 51% results in zero. The strategic importance of keeping your fault below 50% — through strong evidence gathering, witness testimony, expert accident reconstruction, and FMCSA violation evidence — cannot be overstated in these states.`,
      keyTakeaway:
        "In 33 states using the 51% bar rule, you are completely barred from recovery if found 51% or more at fault. Keeping your fault percentage below 50% is a critical strategic objective.",
    },
    {
      id: 'modified-50-rule',
      title: 'Modified Comparative Fault — The 50% Bar Rule (12 States)',
      body: `The modified 50% bar rule operates similarly to the 51% rule but uses a stricter threshold: a plaintiff is barred from recovery if they are found equally at fault with the defendant — that is, 50% or more. States using this version include: Arkansas, Colorado, Georgia, Idaho, Kansas, Maine, Nebraska, North Dakota, Tennessee, Utah, West Virginia, and Wyoming. (Note: some of these states are sometimes categorized differently in secondary sources — when your specific state's rule is at issue, confirm with current statutory authority.)\n\nThe practical difference between the 50% and 51% bar rules may seem minor — just one percentage point. But in cases where liability evidence is genuinely mixed and fault is likely to land near the 50% mark, that single percentage point can be the difference between a substantial recovery and nothing. A 50/50 split in a 51%-bar state allows recovery; a 50/50 split in a 50%-bar state bars recovery entirely.\n\nIn practice, juries rarely assign fault in round numbers like exactly 50%. But in settlement negotiations, the boundary matters because it influences how both sides frame their arguments. Insurers in 50%-bar states are slightly more aggressive in pushing toward equal fault because even a 50% finding eliminates the claim. Your attorney should anticipate this dynamic and present particularly strong evidence of the truck driver's superior culpability — FMCSA violations, excess speed, fatigue — to ensure your fault allocation settles well below the applicable threshold.`,
      keyTakeaway:
        "In 50%-bar states, even a 50/50 fault finding bars all recovery. Strong liability evidence pushing the truck driver's fault clearly above 50% is essential to preserving your claim.",
    },
    {
      id: 'contributory-negligence',
      title: 'Contributory Negligence: The 4 Harshest States',
      body: `Contributory negligence is the oldest and harshest fault system, preserved in only four states and Washington D.C.: Alabama, Maryland, North Carolina, Virginia, and the District of Columbia. Under this doctrine, any fault by the plaintiff — no matter how small — completely bars recovery. A plaintiff who was 1% at fault receives nothing, even if the defendant was 99% at fault.\n\nThe practical effect is extreme. Insurers in contributory negligence jurisdictions aggressively seek any evidence of plaintiff fault and will defend cases vigorously even when their insured bears overwhelming primary responsibility. Defense attorneys may argue that the plaintiff contributed to the accident by: changing lanes without sufficient clearance, driving in a truck's blind spot (though courts have increasingly limited this argument), failing to take evasive action, driving with a mechanical defect, or any other conduct that could be characterized as falling short of reasonable care.\n\nIf you were injured in a truck accident in one of these states, the stakes of fault allocation are absolute — not graduated. You are either in or out. This makes the quality of your evidence and your attorney's ability to negate contributory fault allegations absolutely critical. Experienced plaintiff's attorneys in these jurisdictions often successfully argue sudden emergency doctrine, the last clear chance doctrine (which allows recovery if the defendant had the final opportunity to avoid the accident despite the plaintiff's fault), or that the plaintiff's conduct was legally foreseeable and therefore not a superseding cause.`,
      keyTakeaway:
        'In Alabama, Maryland, North Carolina, Virginia, and D.C., any fault by the plaintiff bars all recovery. In these states, eliminating contributory fault allegations is your attorney\'s most critical task.',
    },
    {
      id: 'fault-dollar-examples',
      title: 'Real Dollar Examples: How Fault % Impacts Your Settlement',
      body: `To illustrate how dramatically fault allocation affects compensation, consider a truck accident victim with total documented damages of $800,000: $250,000 in economic damages (medical bills, lost wages, future care) and $550,000 in non-economic damages (pain, suffering, permanent impairment).\n\nScenario 1 — Pure comparative fault state, plaintiff 30% at fault: $800,000 × 70% = $560,000 recovery.\n\nScenario 2 — Modified 51% bar state, plaintiff 30% at fault: $800,000 × 70% = $560,000 recovery (same as pure comparative at 30%).\n\nScenario 3 — Modified 51% bar state, plaintiff 52% at fault: $0 recovery (barred entirely).\n\nScenario 4 — Modified 51% bar state, plaintiff 49% at fault: $800,000 × 51% = $408,000 recovery.\n\nScenario 5 — Contributory negligence state, plaintiff 5% at fault: $0 recovery (any fault bars all recovery).\n\nThe difference between Scenario 3 and Scenario 4 in a 51%-bar state is a single percentage point of fault allocation — and the difference in outcome is $408,000 versus zero. This is why experienced truck accident attorneys invest heavily in accident reconstruction experts, FMCSA violation evidence, and witness development: each piece of evidence that shifts fault attribution away from the plaintiff and toward the truck driver has enormous dollar impact.`,
      keyTakeaway:
        "A single percentage point of fault allocation can mean hundreds of thousands of dollars — or the difference between recovery and nothing. This is the most underappreciated financial reality in truck accident litigation.",
    },
    {
      id: 'attorney-reduces-fault',
      title: 'Why Hiring an Attorney Reduces Your Fault Percentage',
      body: `Fault percentages do not emerge from objective calculation — they are negotiated, argued, and ultimately decided by juries or, more commonly, agreed upon in settlement negotiations where both sides assess what a jury would likely find. An experienced truck accident attorney reduces your assigned fault percentage through multiple specific mechanisms.\n\nAccident reconstruction expert testimony. These specialists analyze physical evidence — skid marks, vehicle damage patterns, EDR data, road geometry — to create a scientific model of exactly what happened. When an expert testifies that given the truck's speed and lane position, the plaintiff had less than 1.2 seconds to respond and no evasive action was possible, it is very difficult for the defense to argue plaintiff fault above a nominal percentage.\n\nFMCSA violation evidence shifts the narrative. When the evidence shows the truck driver was in hour 13 of their shift, was traveling 14 mph over the speed limit, and had a prior speeding citation in the same BASIC category — the conversation about plaintiff fault becomes secondary. The insurer's ability to argue comparative fault is undermined by the overwhelming evidence of the defendant's own multiplied negligence.\n\nFinally, experienced attorneys know jurisdiction-specific jury tendencies. In venues where juries historically award high damages and are skeptical of corporate defendants, insurers have less leverage to argue high plaintiff fault in settlement. An attorney who has tried cases in that jurisdiction knows whether to push harder or accept a number. This knowledge is worth real money.`,
      keyTakeaway:
        'Attorneys reduce your fault percentage through expert reconstruction testimony, FMCSA violation evidence, and jurisdiction-specific negotiation strategy — each of which directly increases your net recovery.',
    },
  ],
  faqs: [
    {
      q: 'What if I was rear-ended by a truck — can they still argue I was at fault?',
      a: "Yes, though rear-end collisions create a strong presumption that the following driver — in this case the truck — was at fault for following too closely or failing to maintain adequate stopping distance. Trucking company insurers may still argue that you cut the truck off, brake-checked the driver, had malfunctioning brake lights, or suddenly and unexpectedly slowed. Even though these arguments often fail at trial, they are used in settlement negotiations to justify lower offers. Your attorney should gather any available dashcam footage, witness testimony, and EDR data showing the truck's speed and brake application timing to rebut these claims.",
    },
    {
      q: 'How is fault percentage actually determined in a settlement?',
      a: "In settlement negotiations, fault percentage is not formally determined by a court — it is effectively negotiated. Both sides assess the strength of liability evidence, applicable fault rules, and their estimates of how a jury would apportion fault if the case went to trial. Your attorney presents evidence of the truck driver's fault (speed, HOS violations, FMCSA violations); the insurer argues your contributory fault. The final settlement figure implicitly reflects an agreed-upon effective fault allocation, even if neither party states an explicit percentage. Only at trial does a jury formally assign percentage fault.",
    },
    {
      q: 'Does comparative fault apply to all defendants, or just the truck driver?',
      a: "In cases with multiple defendants — the driver, the motor carrier, the cargo shipper, the truck manufacturer — comparative fault principles apply across all of them, and fault can be allocated among multiple defendants simultaneously. Your total recovery equals your total damages minus your fault percentage, regardless of how the defendants' shares are divided among themselves. In some states, joint and several liability allows you to collect your full reduced award from any single defendant, who must then seek contribution from co-defendants.",
    },
    {
      q: 'Can insurance adjusters actually get away with inflating my fault percentage?',
      a: "Insurance adjusters routinely assign inflated fault percentages in early evaluations as a negotiating tactic. Without legal representation, many accident victims accept these assessments at face value. An attorney with access to accident reconstruction experts, black box data, and FMCSA records can systematically challenge each basis for the fault attribution. Documented FMCSA violations are particularly effective because they show the defendant's own conduct was per se unreasonable — making it much harder to sustain an argument that the plaintiff's minor contribution was equally or more blameworthy.",
    },
    {
      q: 'If my state uses contributory negligence, am I automatically barred if I changed lanes before the crash?',
      a: "Not necessarily. Even in contributory negligence states, several defenses to contributory fault exist. The last clear chance doctrine holds that if the defendant had the last opportunity to avoid the accident after the plaintiff's negligent act, the defendant cannot use contributory negligence as a complete defense. If the truck driver saw you merge, had adequate time and distance to brake or steer away, and failed to do so, your attorney may defeat the contributory negligence bar. Additionally, wanton or willful misconduct by the defendant — such as an intentionally impaired driver — may eliminate the contributory negligence defense entirely.",
    },
  ],
  relatedSlugs: [
    'how-truck-accident-settlements-work',
    'what-to-do-after-truck-accident',
    'trucking-company-liability',
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Guide 5: Trucking Company Liability
// ─────────────────────────────────────────────────────────────────────────────

const truckingLiabilityGuide: Guide = {
  slug: 'trucking-company-liability',
  title: 'Trucking Company Liability: Who Pays for Your Injuries?',
  description:
    'Multiple parties can be legally responsible for your truck accident injuries — not just the driver. Understand respondeat superior, negligent hiring, cargo loader liability, manufacturer defects, broker liability, and how identifying all defendants maximizes your settlement.',
  readingTimeMin: 11,
  lastUpdated: 'March 2026',
  sections: [
    {
      id: 'multiple-liable-parties',
      title: 'Why Multiple Parties Can Be Liable',
      body: `One of the defining characteristics of truck accident litigation is the potential for multiple defendants — a feature that dramatically distinguishes these cases from standard car accident claims. When a passenger car driver hits you, there is one defendant: the driver, backed by a single auto insurance policy. When a commercial truck driver hits you, there may be five, six, or more legally responsible parties, each with their own insurance coverage and liability exposure.\n\nThis matters for two practical reasons. First, the total available compensation pool is vastly larger when multiple defendants are named. A truck driver's personal assets may be minimal, but the motor carrier's liability policy may carry $5 million or more in coverage. Add the cargo shipper's general liability policy, the trailer manufacturer's product liability coverage, and potentially the freight broker's errors and omissions coverage, and the aggregate insurance available can be enormous.\n\nSecond, each additional defendant creates independent theories of liability. Even if the truck driver's individual negligence is disputed, the motor carrier's negligent maintenance, the shipper's improper cargo securing, or the manufacturer's defective component may provide an independent pathway to recovery. An experienced truck accident attorney's first job is to identify and preserve claims against every potentially liable party — because any defendant not named within the applicable statute of limitations is permanently off the table.`,
      keyTakeaway:
        'Truck accident cases can have 5 or more defendants, each with separate insurance policies. Identifying all liable parties is the single most important step for maximizing your total compensation.',
    },
    {
      id: 'respondeat-superior',
      title: 'Respondeat Superior: Employer Liability for Driver Acts',
      body: `Respondeat superior is the foundational doctrine of employer liability in truck accident cases. Latin for "let the master answer," it holds that an employer is vicariously liable for the negligent acts of an employee committed within the scope of their employment. For truck accident cases, this means that when a company driver causes an accident while making a delivery, the motor carrier that employs them is directly liable for all resulting damages — not because the carrier itself was negligent, but simply because the driver was acting on its behalf.\n\nThe carrier cannot escape this liability by pointing to the driver's own negligence, claiming the driver violated company policy, or arguing the specific negligent act was an unauthorized deviation from assigned duties. As long as the driver was operating the truck in furtherance of the carrier's business, respondeat superior applies.\n\nThis doctrine is critical because motor carriers typically carry substantially higher insurance limits than individual drivers and have far greater assets from which to satisfy a judgment. The carrier's liability under respondeat superior is separate from and in addition to any direct negligence claims against the carrier itself — such as negligent maintenance, negligent hiring, or failure to enforce hours-of-service compliance. Naming the motor carrier as a defendant ensures that the deep pockets are in the case from day one, and that the carrier's attorneys are motivated to settle to prevent a damaging jury verdict.`,
      keyTakeaway:
        'Motor carriers are automatically liable for their employee drivers under respondeat superior — regardless of whether the carrier itself did anything wrong. This brings the carrier\'s full insurance policy into your case.',
    },
    {
      id: 'negligent-hiring',
      title: 'Negligent Hiring and Negligent Retention',
      body: `Beyond respondeat superior, motor carriers face direct liability for negligent hiring and negligent retention when they knew or should have known that a driver posed an unreasonable risk to others. Unlike vicarious liability, negligent hiring is a direct fault claim against the carrier — it alleges the carrier's own conduct in selecting, screening, or retaining the driver was unreasonable.\n\nNegligent hiring claims arise when a carrier fails to conduct adequate background checks before employing a driver. FMCSA regulations require carriers to request a driver's prior employment history for three years, check the Drug and Alcohol Clearinghouse, verify CDL validity and medical certification, and review the driver's Motor Vehicle Record. If a carrier hired a driver with a history of DUI convictions, prior at-fault accidents, or suspended license status — and failed to discover this through basic required due diligence — the carrier faces negligent hiring liability that can support punitive damages.\n\nNegligent retention arises when a carrier retained a driver despite learning of disqualifying conduct during employment. If a driver received a violation during a roadside inspection, was involved in a prior accident, or tested positive for a controlled substance, and the carrier continued to dispatch that driver without appropriate remediation, the carrier's decision to keep the driver is independently negligent. The FMCSA Drug and Alcohol Clearinghouse was specifically designed to prevent drivers from hiding prior violations by switching carriers — violations are now permanently tracked.`,
      keyTakeaway:
        "If the carrier hired or retained a driver with a known dangerous history, the carrier faces direct negligent hiring liability separate from driver fault — and this supports punitive damages.",
    },
    {
      id: 'cargo-shipper-liability',
      title: 'Cargo Shipper and Loader Liability',
      body: `Cargo-related accidents — rollovers caused by improperly loaded cargo, accidents caused by shifting loads, and incidents involving unsecured debris falling from trucks — create liability for parties beyond the driver and carrier. Shippers who load cargo and freight handlers who pack trailers can face direct negligence claims when their loading practices contributed to the accident.\n\nFMCSA regulations impose specific requirements on cargo securement: all cargo must be blocked, braced, friction-matted, or tied to prevent movement that could affect the truck's handling or create a falling hazard. Weight distribution requirements mandate that cargo be loaded to maintain the truck's center of gravity within safe limits. Overloaded trucks — exceeding the 80,000-pound gross vehicle weight limit — have demonstrably worse braking performance and are significantly more prone to rollover.\n\nWhen an accident investigation reveals that cargo shifted, spilled, or that the truck was overloaded, the loading party — often the cargo shipper or a third-party logistics warehouse — becomes a direct defendant. These parties typically carry commercial general liability insurance separate from the motor carrier's policy. Identifying the responsible loading party requires obtaining the bill of lading, shipper records, and warehouse documentation that your attorney will demand in discovery. In some cases, the shipper may have pressured the carrier to exceed weight limits or skip inspection steps to meet delivery deadlines — a fact pattern that supports both direct shipper liability and carrier liability for compliance with shipper demands.`,
      keyTakeaway:
        "If improperly loaded or overweight cargo contributed to your accident, the cargo shipper carries independent liability under separate insurance — adding another defendant and another pool of coverage.",
    },
    {
      id: 'manufacturer-liability',
      title: 'Truck Manufacturer Product Liability',
      body: `When a defective component of the truck — rather than driver error — caused or contributed to the accident, the manufacturer of the truck or the defective part faces product liability claims. Product liability is a strict liability doctrine, meaning you do not need to prove the manufacturer was negligent — only that the product had a defect, that it caused your injury, and that you were using the product in its intended manner.\n\nThe most common product liability claims in truck accident cases involve: defective braking systems (faulty brake components that failed to stop the truck adequately), defective tires (design defects or manufacturing defects causing blowouts), defective steering components (failure of power steering systems or coupling mechanisms), defective safety systems (malfunctioning stability control or lane departure warning systems), and cargo securement equipment failures (defective straps, chains, or tie-down hardware).\n\nBrake system defects deserve special attention. Federal Motor Vehicle Safety Standards require commercial trucks to meet specific stopping distance requirements. If a properly maintained truck with adequate brake lining and correctly adjusted brakes failed to stop within those standards, there may be a design defect claim against the brake system manufacturer. Your attorney will work with a mechanical engineering expert to analyze the brake system and determine whether the failure was driver-caused (inadequate maintenance), carrier-caused (failure to replace worn components), or manufacturer-caused (design or production defect). Multiple overlapping theories maximize both liability coverage and settlement leverage.`,
      keyTakeaway:
        'Defective truck components create strict product liability claims against manufacturers — no proof of negligence required. Brake failures, tire blowouts, and steering failures are the most common triggers.',
    },
    {
      id: 'broker-liability',
      title: 'Broker Liability: Recent Legal Developments',
      body: `Freight brokers — intermediaries who arrange transportation between shippers and carriers for compensation — have historically avoided liability for truck accidents by arguing they were mere facilitators who neither owned nor operated the vehicles involved. This defense has faced increasing scrutiny in recent years, and the legal landscape is shifting meaningfully.\n\nThe Ninth Circuit's 2021 decision in Miller v. C.H. Robinson Worldwide is the most significant recent development. The court held that federal law does not automatically preempt state negligence claims against brokers and that brokers can face liability under state tort law for negligent selection of carriers. Specifically, the court found that a broker who failed to adequately vet a carrier's safety record before hiring it could be liable for accidents caused by that carrier's known or discoverable dangerous practices.\n\nPractically, this means that if a freight broker selected a carrier with elevated FMCSA BASIC scores, a history of prior accidents, or prior FMCSA violations — and a reasonable due diligence check would have revealed this — the broker may face negligent selection liability. The damages in broker liability claims are typically proportionate: brokers generally have smaller policy limits than major motor carriers, but in cases where the carrier is underinsured or insolvent, broker liability provides an additional recovery pathway. As of 2026, this area of law continues to develop, with different circuits and state courts reaching varying conclusions. Your attorney should assess broker liability on a jurisdiction-specific basis.`,
      keyTakeaway:
        "Post-2021, freight brokers can face negligent carrier selection liability if they hired a carrier with a documented dangerous safety record. This creates an additional defendant and additional coverage in cases where the carrier is underinsured.",
    },
    {
      id: 'identify-all-parties',
      title: 'How to Identify All Potentially Liable Parties',
      body: `Identifying all defendants in a truck accident case requires systematic investigation beginning immediately after the crash. Many of these parties are not obvious from the scene and can only be identified through document requests and records research that must happen before the statute of limitations closes.\n\nStart with the truck itself. The DOT number on the cab door identifies the operating carrier — the entity registered with FMCSA to operate in interstate commerce. However, the operating carrier and the truck owner are frequently different entities. Commercial trucks are often owned by leasing companies and operated by carriers under lease agreements. The trailer may belong to yet another entity. Your attorney will pull FMCSA registration records, state vehicle title records, and lease agreements to determine who owned each component.\n\nThe bill of lading identifies the cargo shipper and receiver, and in some cases the freight broker who arranged the movement. Warehouse records identify who loaded the cargo. Driver employment or contracting records identify the relationship between the driver and carrier. Maintenance records identify the shop that performed the last inspection and whether any other maintenance providers serviced the vehicle.\n\nThis investigation is time-sensitive. FMCSA requires carriers to maintain certain records for only 6 to 12 months. Lease agreements and dispatch records may not be preserved longer than required. Your attorney must send comprehensive document preservation demands to all identified parties — and to all parties who may later prove to be parties — immediately after the accident, before any evidence is routinely destroyed.`,
      keyTakeaway:
        'The DOT number, bill of lading, maintenance records, and lease agreements together identify every potentially liable party. Preservation demands must go to all of them within days of the accident.',
    },
    {
      id: 'multi-party-settlements',
      title: 'Why Multi-Party Cases Settle Higher',
      body: `Cases with multiple defendants consistently achieve higher settlements than single-defendant cases for several compounding reasons, all of which benefit the injured plaintiff.\n\nFirst, the total available insurance coverage increases with each additional defendant. A single truck driver may have a $750,000 policy. Adding the motor carrier's $5 million policy, the cargo shipper's $2 million general liability policy, and the trailer manufacturer's product liability coverage creates an aggregate pool of $7.75 million or more — fundamentally transforming the potential recovery.\n\nSecond, multi-defendant cases create finger-pointing dynamics among defendants that work to the plaintiff's advantage. When the truck driver blames the carrier for ordering him to drive fatigued, and the carrier blames the shipper for providing an overweight load, and the shipper blames the carrier for not refusing the load, the plaintiff can sit back and let defendants attack each other's positions. This cross-examination of defendants by other defendants often surfaces damaging admissions that would never emerge in a single-defendant case.\n\nThird, the mere presence of multiple defendants increases the settlement value because each defendant rationally considers what a jury verdict might look like across all parties — and jury verdicts in multi-defendant truck accident cases involving obvious corporate negligence are historically large. Each defendant has independent incentive to contribute to a pre-trial settlement to avoid a runaway verdict that might be attributed disproportionately to them. This collective risk-sharing dynamic consistently produces settlement amounts that exceed what any single defendant would pay alone.`,
      keyTakeaway:
        'Multi-defendant cases have larger insurance pools, create defendant finger-pointing that surfaces damaging admissions, and produce collective settlement pressure that routinely yields higher totals than single-defendant cases.',
    },
  ],
  faqs: [
    {
      q: "What is an owner-operator and how does their liability differ?",
      a: "An owner-operator is a truck driver who owns their own truck and contracts their services to carriers rather than being employed directly. Owner-operators typically maintain their own commercial auto policy in addition to operating under a carrier's motor vehicle operating authority. In accidents, both the owner-operator's personal policy and the carrier's liability policy may be implicated, depending on the nature of the working relationship and whose authority the driver was operating under at the time. Courts examine the degree of control the carrier exercised over the driver to determine whether the carrier's policy is triggered.",
    },
    {
      q: "Can I sue the trucking company if the driver was fully at fault?",
      a: "Yes — and this is standard practice in truck accident litigation. Under respondeat superior, the motor carrier is vicariously liable for an employee driver's negligence regardless of whether the carrier itself did anything wrong. The carrier's liability is automatic when an employee driver causes injury in the course of their employment. Naming the carrier as a defendant — in addition to the driver — brings the carrier's much larger insurance policy into the case and ensures you have access to the full compensation available.",
    },
    {
      q: "What if the trucking company has gone out of business?",
      a: "Carrier insolvency or dissolution does not necessarily eliminate your claim. The carrier's liability insurance policy remains in effect and can be accessed through the insurer directly. Attorneys can petition courts for access to dissolved companies' insurance policies. Additionally, if the trucking company was part of a larger corporate group, successor liability or alter ego theories may allow claims against the parent company. This is one reason why initiating your claim quickly after the accident is important — locating and accessing insurance coverage becomes more complex as time passes.",
    },
    {
      q: "Does cargo liability apply if I was hit by falling debris from a truck?",
      a: "Yes. When cargo falls from a truck and strikes another vehicle — whether individual items, tire retread ('alligators' on the highway), or secured load failure — the carrier and the loading party both face liability. Cargo securement is a specific FMCSA requirement, and failure to secure cargo adequately is a direct federal violation. These cases sometimes also involve claims against the cargo owner if the nature of the cargo (e.g., improperly containerized material) contributed to the securement failure.",
    },
    {
      q: "How does the leased truck situation affect who I can sue?",
      a: "Commercial trucks are frequently leased from equipment companies, and trailer fleets are similarly owned by lessors separate from the carrier. Under FMCSA's 'full control' leasing regulation, a carrier that leases a vehicle from another entity and operates it under the carrier's authority assumes full responsibility for the vehicle — including maintenance and driver compliance — for the duration of the lease. The lessor is generally not liable under this framework unless the lessor actually controlled operations or if the vehicle had a defect that constituted a product liability claim against the manufacturer.",
    },
  ],
  relatedSlugs: [
    'fmcsa-regulations-and-your-rights',
    'how-truck-accident-settlements-work',
    'comparative-fault-laws-by-state',
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Exported data
// ─────────────────────────────────────────────────────────────────────────────

export const GUIDES: Guide[] = [
  whatToDoAfterGuide,
  howSettlementsWorkGuide,
  fmcsaGuide,
  comparativeFaultGuide,
  truckingLiabilityGuide,
];

export function getGuideBySlug(slug: string): Guide | null {
  return GUIDES.find((g) => g.slug === slug) ?? null;
}
