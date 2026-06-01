const industryProfiles = {
  financial: {
    label: "Financial services",
    voiceContainmentPercent: 58, digitalDeflectionPercent: 48, outboundHandledPercent: 38,
    aiAgentVoiceMinutes: 3.2, assistantVoiceCoveragePercent: 90, assistantDigitalCoveragePercent: 90, humanAhtMinutes: 7,
    recommendation: "Start with balance checks, card support, branch/service hours, status requests, and secure handoff intents.",
    verticalGuidance: "Use this vertical alignment for authenticated requests, status checks, servicing hours, card support, and guided escalation.",
    summary: "Start with high-volume authenticated service requests, then reserve autonomous AI Agent capacity for ambiguous troubleshooting and policy questions.",
    references: [
      { metric: "10%", label: "abandoned-call reduction signal", detail: "Useful when current queues have high wait time or avoidable repeat calls." },
      { metric: "3 min", label: "faster employee resolution signal", detail: "Relevant for internal support and assisted-agent journeys." },
      { metric: "43%", label: "call-deflection signal", detail: "Use as a directional benchmark for routine financial-service requests." }
    ],
    useCases: ["Account and card servicing", "Loan or application status", "Branch, ATM, and service-hour questions", "Secure escalation to specialist teams"],
    nextActions: ["Map top 20 contact drivers by channel", "Separate authenticated and unauthenticated journeys", "Build scripted flows for deterministic requests", "Tune autonomous prompts with policy guardrails"]
  },
  insurance: {
    label: "Insurance",
    voiceContainmentPercent: 62, digitalDeflectionPercent: 45, outboundHandledPercent: 55,
    aiAgentVoiceMinutes: 3.8, assistantVoiceCoveragePercent: 85, assistantDigitalCoveragePercent: 85, humanAhtMinutes: 8,
    recommendation: "Prioritize claim status, policy questions, payment support, document collection, and renewal journeys.",
    verticalGuidance: "Use this vertical alignment for claims, billing, policy servicing, renewals, and document collection.",
    summary: "Use scripted AI Agent flows for status and payment journeys, with autonomous support for policy explanation and claim triage.",
    references: [
      { metric: "66%", label: "call containment signal", detail: "Relevant for pre-call screening, status requests, and triage workflows." },
      { metric: "55k+", label: "weekly AI-handled contact signal", detail: "Useful when contact volume is high and intents are repeatable." },
      { metric: "90%", label: "onboarding-time reduction signal", detail: "Directionally useful for claims and document-heavy journeys." }
    ],
    useCases: ["Claim intake and status", "Policy coverage questions", "Premium payment support", "Renewal and document follow-up"],
    nextActions: ["Classify claim journeys by complexity", "Create escalation rules for regulated advice", "Use AI Assistant summaries for claim notes", "Review digital message depth by product line"]
  },
  retail: {
    label: "Retail",
    voiceContainmentPercent: 55, digitalDeflectionPercent: 60, outboundHandledPercent: 50,
    aiAgentVoiceMinutes: 2.6, assistantVoiceCoveragePercent: 80, assistantDigitalCoveragePercent: 90, humanAhtMinutes: 5.5,
    recommendation: "Focus on order status, return eligibility, delivery exceptions, loyalty questions, and store information.",
    verticalGuidance: "Use this vertical alignment for order status, returns, delivery exceptions, loyalty, and store service requests.",
    summary: "Retail plans usually benefit from strong digital deflection and short voice automation for repeatable service requests.",
    references: [
      { metric: "High", label: "digital deflection fit", detail: "Order status, returns, store questions, and loyalty requests are strong automation candidates." },
      { metric: "Short", label: "voice automation duration fit", detail: "Retail service journeys usually work best when intents are narrow and API-backed." },
      { metric: "Seasonal", label: "capacity planning factor", detail: "Model peak campaign and holiday load separately from normalised monthly demand." }
    ],
    useCases: ["Order and delivery status", "Returns and exchanges", "Store hours and availability", "Loyalty and promotion questions"],
    nextActions: ["Connect order-status APIs early", "Keep return rules scripted", "Route high-value exceptions to agents", "Measure seasonal spikes separately"]
  },
  healthcare: {
    label: "Healthcare",
    voiceContainmentPercent: 45, digitalDeflectionPercent: 38, outboundHandledPercent: 35,
    aiAgentVoiceMinutes: 3.5, assistantVoiceCoveragePercent: 90, assistantDigitalCoveragePercent: 80, humanAhtMinutes: 7.5,
    recommendation: "Start with appointment, location, preparation, billing, and non-clinical administrative journeys.",
    verticalGuidance: "Use this vertical alignment for appointments, billing, clinic information, preparation instructions, and non-clinical routing.",
    summary: "Use conservative containment and strong assistant coverage so clinical or sensitive cases move quickly to trained staff.",
    references: [
      { metric: "44%", label: "abandonment-reduction signal", detail: "Useful for appointment, queue, and location-routing use cases." },
      { metric: "71%", label: "wait-time reduction signal", detail: "Relevant when front-door service queues are creating patient friction." },
      { metric: "24/7", label: "availability signal", detail: "Helpful for non-clinical support outside staffed hours." }
    ],
    useCases: ["Appointment scheduling", "Clinic location and hours", "Billing and payment questions", "Pre-visit instructions"],
    nextActions: ["Keep clinical advice out of automation scope", "Use scripted handoff for sensitive intents", "Validate privacy and consent language", "Pilot with non-clinical departments first"]
  },
  travel: {
    label: "Travel and hospitality",
    voiceContainmentPercent: 52, digitalDeflectionPercent: 55, outboundHandledPercent: 45,
    aiAgentVoiceMinutes: 3, assistantVoiceCoveragePercent: 85, assistantDigitalCoveragePercent: 85, humanAhtMinutes: 6.5,
    recommendation: "Begin with booking status, itinerary changes, baggage, cancellation rules, loyalty, and disruption updates.",
    verticalGuidance: "Use this vertical alignment for booking support, itinerary changes, baggage updates, cancellations, and disruption triage.",
    summary: "Travel use cases need flexible digital journeys and clear escalation paths during disruption periods.",
    references: [
      { metric: "High", label: "multi-channel engagement fit", detail: "Travel customers often move across voice, messaging, and digital service journeys." },
      { metric: "High", label: "personalization fit", detail: "Booking context, loyalty status, and itinerary state can improve containment quality." },
      { metric: "Peak", label: "disruption-load factor", detail: "Weather, cancellation, and delay windows should be modelled as separate scenarios." }
    ],
    useCases: ["Booking and itinerary status", "Cancellation or change rules", "Baggage and disruption updates", "Loyalty account servicing"],
    nextActions: ["Model disruption peaks separately", "Connect booking lookup APIs", "Script eligibility and refund rules", "Use autonomous flows for itinerary troubleshooting"]
  },
  shipping: {
    label: "Shipping and logistics",
    voiceContainmentPercent: 50, digitalDeflectionPercent: 55, outboundHandledPercent: 60,
    aiAgentVoiceMinutes: 2.8, assistantVoiceCoveragePercent: 88, assistantDigitalCoveragePercent: 85, humanAhtMinutes: 6.5,
    recommendation: "Start with shipment tracking, delivery ETA, exception handling, collection scheduling, and proof-of-delivery queries.",
    verticalGuidance: "Use this vertical alignment for parcel tracking, re-delivery, collection, claims, and customs document queries.",
    summary: "Logistics operations benefit from high outbound proactive notifications and strong digital containment for status and exception requests.",
    references: [
      { metric: "65%", label: "self-service tracking adoption signal", detail: "Shipment status and ETA are the highest-volume, lowest-complexity intents — strong automation candidates." },
      { metric: "40%", label: "exception-handling containment signal", detail: "AI Agent can resolve re-delivery scheduling, safe-place instructions, and depot collection requests." },
      { metric: "3x", label: "outbound notification engagement signal", detail: "Proactive delivery updates reduce inbound contact volume significantly when timed correctly." }
    ],
    useCases: ["Shipment tracking and ETA", "Delivery exception and re-delivery", "Collection scheduling", "Claims and damage reporting", "Customs and documentation queries"],
    nextActions: ["Integrate shipment tracking APIs for real-time status lookups", "Build proactive outbound delivery notification flows", "Scope re-delivery and safe-place intent journeys", "Validate customs query boundaries with compliance team"]
  },
  public: {
    label: "Public sector",
    voiceContainmentPercent: 42, digitalDeflectionPercent: 40, outboundHandledPercent: 40,
    aiAgentVoiceMinutes: 3.4, assistantVoiceCoveragePercent: 90, assistantDigitalCoveragePercent: 80, humanAhtMinutes: 8,
    recommendation: "Target eligibility, appointment, application status, document checklist, and service-location questions.",
    verticalGuidance: "Use this vertical alignment for application status, eligibility navigation, appointments, document checklists, and service locations.",
    summary: "Public-sector plans should use transparent scripted journeys with autonomous support only for bounded service navigation.",
    references: [
      { metric: "90+", label: "facility-support scale signal", detail: "Useful when one program must support many distributed service locations." },
      { metric: "Global", label: "recognition signal", detail: "Citizen-service automation works best when discovery, routing, and handoff are clear." },
      { metric: "Higher", label: "workforce engagement signal", detail: "AI can reduce friction for agents handling repetitive public-service questions." }
    ],
    useCases: ["Application status", "Eligibility guidance", "Appointment booking", "Document checklist support"],
    nextActions: ["Confirm accessibility language", "Keep eligibility rules auditable", "Prioritise high-volume service queues", "Design handoff for vulnerable-customer scenarios"]
  },
  other: {
    label: "Custom industry",
    voiceContainmentPercent: 50, digitalDeflectionPercent: 45, outboundHandledPercent: 45,
    aiAgentVoiceMinutes: 3, assistantVoiceCoveragePercent: 85, assistantDigitalCoveragePercent: 85, humanAhtMinutes: 7,
    recommendation: "Use your top repeatable requests as scripted flows and reserve autonomous AI for broader troubleshooting.",
    verticalGuidance: "Use this custom alignment as a discovery baseline, then replace assumptions with your measured contact-driver data.",
    summary: "Use the calculator as a discovery model: start with repeatable contact drivers, then refine assumptions with operational data.",
    references: [
      { metric: "Range", label: "benchmark range", detail: "Use a low, expected, and high scenario until measured contact-driver data is available." },
      { metric: "Pilot", label: "validation step", detail: "Use first-wave pilot results to replace assumptions before scaling." },
      { metric: "Review", label: "governance step", detail: "Confirm which journeys should remain scripted, autonomous, or human-assisted." }
    ],
    useCases: ["FAQ and service navigation", "Status lookup", "Appointment or request management", "Guided escalation"],
    nextActions: ["Rank contact drivers by volume", "Estimate automation confidence by intent", "Validate channel split", "Tune assumptions after pilot data"]
  }
};

const defaults = {
  industryType: "financial", agentMode: "both", workforceModel: "blended",
  channelVoice: true, channelDigital: true, channelOutbound: false,
  monthlyVoiceCalls: 50000, monthlyDigitalClients: 12000, monthlyOutboundContacts: 10000,
  voiceContainmentPercent: 58, digitalDeflectionPercent: 48, outboundHandledPercent: 45,
  aiAgentVoiceMinutes: 3.2, outboundAiMinutes: 2.4,
  agentVoiceAutonomousPercent: 30, agentDigitalAutonomousPercent: 35, agentOutboundAutonomousPercent: 40,
  agentOutboundMessages: 10,
  directAgentVoiceCalls: 0, directAgentDigitalClients: 0,
  assistantVoiceCoveragePercent: 90, humanAhtMinutes: 7,
  assistantDigitalCoveragePercent: 90, assistantInboundMessages: 10,
  qmVoiceCoveragePercent: 80, qmDigitalCoveragePercent: 70
};

const priorityGuidance = {
  financial: { automate: "Balance enquiry, card status, branch hours, transaction status, PIN reset, FAQ answers.", assist: "Fraud concerns, complex disputes, loan restructuring, bereavement, vulnerable customer support.", evaluate: "Address changes, simple complaints, routine limit changes, product education prompts.", human: "Account closure, regulatory complaints, hardship cases, VIP escalation, legal requests." },
  insurance: { automate: "Claim status, policy document lookup, premium due dates, payment support, renewal reminders.", assist: "Coverage explanation, claim triage, liability questions, multi-party claim handling.", evaluate: "Minor policy edits, simple renewal prompts, low-risk document collection.", human: "Major complaints, legal matters, denied claims, vulnerable customer scenarios." },
  retail:    { automate: "Order tracking, returns eligibility, store hours, loyalty balance, delivery updates.", assist: "Delivery exceptions, refund disputes, high-value customers, complex product support.", evaluate: "Simple upsell prompts, stock queries for low-volume SKUs, routine profile changes.", human: "Chargebacks, major complaints, fraud, VIP/high-value escalation." },
  healthcare: { automate: "Appointments, clinic hours, billing questions, preparation instructions, location routing.", assist: "Care navigation, complex billing, sensitive patient context, multi-department handoff.", evaluate: "General wellness FAQs, simple administrative reminders, basic document requests.", human: "Clinical advice, emergency symptoms, legal/consent matters, vulnerable-patient escalation." },
  travel:    { automate: "Booking status, baggage updates, loyalty lookup, cancellation rules, itinerary reminders.", assist: "Disruption handling, rebooking exceptions, refund disputes, complex itinerary changes.", evaluate: "Ancillary offers, routine preference updates, low-volume destination questions.", human: "Major disruption, legal claims, VIP travel, stranded traveler escalation." },
  shipping:  { automate: "Shipment status, ETA lookup, delivery confirmation, collection booking, standard re-delivery.", assist: "Complex claims, damaged goods, customs exceptions, high-value shipment escalations.", evaluate: "Delivery preference updates, low-volume route queries, basic address corrections.", human: "Legal disputes, missing high-value parcels, regulatory escalations, corporate account issues." },
  public:    { automate: "Application status, appointment booking, document checklist, location and service hours.", assist: "Eligibility navigation, complex case follow-up, vulnerable citizen support.", evaluate: "Low-volume service FAQs, simple reminders, generic program education.", human: "Legal matters, complaints, crisis support, sensitive eligibility decisions." },
  other:     { automate: "High-volume status lookup, FAQs, appointment or request management, simple routing.", assist: "Complex troubleshooting, multi-step service recovery, sensitive context handoff.", evaluate: "Low-volume simple requests, basic reminders, general education prompts.", human: "Legal matters, major complaints, VIP situations, regulated decisions." }
};

const discoveryQuestions = {
  voice:     ["What are the top call reasons by volume and repeat rate?", "Which callers must always reach a human?", "How is the caller authenticated before service is provided?"],
  digital:   ["Which digital channels are in scope?", "Should context be preserved when a customer returns mid-session?", "What transcript and routing context must pass to the agent?"],
  scripted:  ["Which journeys require strict control and predictable responses?", "Which systems or APIs are available for deterministic lookup?", "What success metrics define a completed scripted flow?"],
  autonomous:["Which intents need flexible language understanding?", "What knowledge sources can the autonomous agent safely use?", "Which edge cases require immediate escalation?"],
  outbound:  ["Is outbound consent documented and retrievable?", "What is the campaign intent and target list size?", "What context must transfer to a live agent if the customer responds?"]
};

const inputs = Object.fromEntries(Object.keys(defaults).map((id) => [id, document.getElementById(id)]));

const outputs = {
  industryRecommendation: document.getElementById("industryRecommendation"),
  agentModeRecommendation: document.getElementById("agentModeRecommendation"),
  divisionControls: document.getElementById("divisionControls"),
  verticalTitle: document.getElementById("verticalTitle"),
  verticalVoiceContainment: document.getElementById("verticalVoiceContainment"),
  verticalDigitalDeflection: document.getElementById("verticalDigitalDeflection"),
  verticalOutboundHandled: document.getElementById("verticalOutboundHandled"),
  verticalGuidance: document.getElementById("verticalGuidance"),
  referenceTitle: document.getElementById("referenceTitle"),
  referenceOutcomeList: document.getElementById("referenceOutcomeList"),
  workforceModelRecommendation: document.getElementById("workforceModelRecommendation"),
  totalUnits: document.getElementById("totalUnits"),
  agentTotalUnits: document.getElementById("agentTotalUnits"),
  assistantUnits: document.getElementById("assistantUnits"),
  qmUnits: document.getElementById("qmUnits"),
  aiHandledContacts: document.getElementById("aiHandledContacts"),
  agentVoiceScriptedUnits: document.getElementById("agentVoiceScriptedUnits"),
  agentVoiceAutonomousUnits: document.getElementById("agentVoiceAutonomousUnits"),
  agentDigitalScriptedUnits: document.getElementById("agentDigitalScriptedUnits"),
  agentDigitalAutonomousUnits: document.getElementById("agentDigitalAutonomousUnits"),
  agentOutboundScriptedUnits: document.getElementById("agentOutboundScriptedUnits"),
  agentOutboundAutonomousUnits: document.getElementById("agentOutboundAutonomousUnits"),
  agentScriptedTotalUnits: document.getElementById("agentScriptedTotalUnits"),
  agentAutonomousTotalUnits: document.getElementById("agentAutonomousTotalUnits"),
  agentScriptedShare: document.getElementById("agentScriptedShare"),
  agentAutonomousShare: document.getElementById("agentAutonomousShare"),
  agentBifurcationCard: document.getElementById("agentBifurcationCard"),
  agentBifurcationNote: document.getElementById("agentBifurcationNote"),
  voiceContainedCalls: document.getElementById("voiceContainedCalls"),
  digitalDeflectedClients: document.getElementById("digitalDeflectedClients"),
  outboundHandledContacts: document.getElementById("outboundHandledContacts"),
  assistantVoiceCalls: document.getElementById("assistantVoiceCalls"),
  assistantDigitalClients: document.getElementById("assistantDigitalClients"),
  agentVoiceMinutes: document.getElementById("agentVoiceMinutes"),
  agentDigitalSessions: document.getElementById("agentDigitalSessions"),
  agentOutboundMinutes: document.getElementById("agentOutboundMinutes"),
  assistantVoiceMinutes: document.getElementById("assistantVoiceMinutes"),
  assistantDigitalSessions: document.getElementById("assistantDigitalSessions"),
  qmVoiceEvaluations: document.getElementById("qmVoiceEvaluations"),
  qmDigitalEvaluations: document.getElementById("qmDigitalEvaluations"),
  voiceContainedBar: document.getElementById("voiceContainedBar"),
  digitalDeflectedBar: document.getElementById("digitalDeflectedBar"),
  outboundHandledBar: document.getElementById("outboundHandledBar"),
  assistantVoiceBar: document.getElementById("assistantVoiceBar"),
  assistantDigitalBar: document.getElementById("assistantDigitalBar"),
  summaryTitle: document.getElementById("summaryTitle"),
  summaryText: document.getElementById("summaryText"),
  useCaseList: document.getElementById("useCaseList"),
  nextActionList: document.getElementById("nextActionList"),
  automateFirstText: document.getElementById("automateFirstText"),
  assistEscalateText: document.getElementById("assistEscalateText"),
  evaluateText: document.getElementById("evaluateText"),
  humanOnlyText: document.getElementById("humanOnlyText"),
  discoveryTitle: document.getElementById("discoveryTitle"),
  voiceDiscoveryList: document.getElementById("voiceDiscoveryList"),
  digitalDiscoveryList: document.getElementById("digitalDiscoveryList"),
  modeDiscoveryList: document.getElementById("modeDiscoveryList"),
  outboundDiscoveryList: document.getElementById("outboundDiscoveryList")
};

const numberFormat = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

const syncPairs = [
  ["monthlyVoiceCalls","monthlyVoiceCallsSlider"],["monthlyDigitalClients","monthlyDigitalClientsSlider"],
  ["monthlyOutboundContacts","monthlyOutboundContactsSlider"],["voiceContainmentPercent","voiceContainmentPercentNumber"],
  ["digitalDeflectionPercent","digitalDeflectionPercentNumber"],["outboundHandledPercent","outboundHandledPercentNumber"],
  ["aiAgentVoiceMinutes","aiAgentVoiceMinutesSlider"],["outboundAiMinutes","outboundAiMinutesSlider"],
  ["agentVoiceAutonomousPercent","agentVoiceAutonomousPercentNumber"],["agentDigitalAutonomousPercent","agentDigitalAutonomousPercentNumber"],
  ["agentOutboundAutonomousPercent","agentOutboundAutonomousPercentNumber"],["agentOutboundMessages","agentOutboundMessagesSlider"],
  ["directAgentVoiceCalls","directAgentVoiceCallsSlider"],["directAgentDigitalClients","directAgentDigitalClientsSlider"],
  ["assistantVoiceCoveragePercent","assistantVoiceCoveragePercentNumber"],["humanAhtMinutes","humanAhtMinutesSlider"],
  ["assistantDigitalCoveragePercent","assistantDigitalCoveragePercentNumber"],["assistantInboundMessages","assistantInboundMessagesSlider"],
  ["qmVoiceCoveragePercent","qmVoiceCoveragePercentNumber"],["qmDigitalCoveragePercent","qmDigitalCoveragePercentNumber"]
];

function value(id) { const el = inputs[id]; if (!el) return defaults[id]||0; const p = Number.parseFloat(el.value); return Number.isFinite(p) ? p : (defaults[id]||0); }
function setSyncedValue(id, v) {
  const s = document.getElementById(id); if (!s) return; s.value = v;
  const pair = syncPairs.find(([a,b]) => a===id||b===id);
  if (pair) { const o = document.getElementById(pair[0]===id?pair[1]:pair[0]); if (o) o.value = v; }
}
function syncControlPair(e) { const t = document.getElementById(e.target.dataset.syncTarget); if (t) t.value = e.target.value; }
function positive(id) { return Math.max(0, value(id)); }
function percent(id)  { return Math.min(Math.max(value(id),0),100)/100; }
function channelEnabled(ch) { const i = inputs[`channel${ch[0].toUpperCase()}${ch.slice(1)}`]; return i ? i.checked : false; }
function activeChannelLabels() { const l=[]; if(channelEnabled("voice"))l.push("voice"); if(channelEnabled("digital"))l.push("digital"); if(channelEnabled("outbound"))l.push("outbound"); return l; }

function updateChannelVisibility() {
  ["voice","digital","outbound"].forEach((ch) => {
    const on = channelEnabled(ch);
    document.querySelectorAll(`[data-channel="${ch}"]`).forEach((el) => { el.hidden = !on; });
    document.querySelectorAll(`[data-channel-off="${ch}"]`).forEach((el) => { el.hidden = on; });
  });
}

function updateWorkforceVisibility() {
  const m = inputs.workforceModel.value;
  document.querySelectorAll('[data-assistant-channel="voice"]').forEach((el) => { el.hidden = m==="digital"; });
  document.querySelectorAll('[data-assistant-channel="digital"]').forEach((el) => { el.hidden = m==="voice"; });
}

function messageSessions(c, m) { return c * Math.ceil(Math.max(1,m)/10); }
function units(a, d) { return Math.ceil(a/d); }
function setBar(el, a, max) { el.style.width = `${max>0?Math.min((a/max)*100,100):0}%`; }
function formatPercent(v) { return `${Math.round(v*100)}%`; }
function setList(list, items) { list.innerHTML=""; items.forEach((t) => { const li=document.createElement("li"); li.textContent=t; list.appendChild(li); }); }

function setReferenceOutcomes(profile) {
  outputs.referenceTitle.textContent = `${profile.label} reference signals`;
  outputs.referenceOutcomeList.innerHTML = "";
  profile.references.forEach((item) => {
    const a=document.createElement("article"),m=document.createElement("strong"),l=document.createElement("span"),d=document.createElement("p");
    m.textContent=item.metric; l.textContent=item.label; d.textContent=item.detail; a.append(m,l,d);
    outputs.referenceOutcomeList.appendChild(a);
  });
}

function applyIndustryProfile() {
  const p = industryProfiles[inputs.industryType.value]||industryProfiles.other;
  ["voiceContainmentPercent","digitalDeflectionPercent","outboundHandledPercent","aiAgentVoiceMinutes","assistantVoiceCoveragePercent","assistantDigitalCoveragePercent","humanAhtMinutes"].forEach((id) => setSyncedValue(id, p[id]));
  updateCalculator();
}

function getAgentRates() {
  const m = inputs.agentMode.value;
  if (m==="scripted")   return {voiceAutonomousRate:0,digitalAutonomousRate:0,outboundAutonomousRate:0};
  if (m==="autonomous") return {voiceAutonomousRate:1,digitalAutonomousRate:1,outboundAutonomousRate:1};
  return {voiceAutonomousRate:percent("agentVoiceAutonomousPercent"),digitalAutonomousRate:percent("agentDigitalAutonomousPercent"),outboundAutonomousRate:percent("agentOutboundAutonomousPercent")};
}

function updateAgentModeUi() {
  const m = inputs.agentMode.value;
  outputs.divisionControls.hidden = m!=="both";
  outputs.agentBifurcationCard.hidden = false;
  outputs.agentModeRecommendation.textContent = m==="scripted"
    ? "Scripted mode is best for deterministic journeys such as status lookup, payments, forms, and eligibility checks."
    : m==="autonomous"
    ? "Autonomous mode is best for natural-language troubleshooting, complex questions, and broader service navigation."
    : "Use the division controls to decide how much work should be autonomous versus scripted.";
}

function getWorkforceGuidance() {
  const m = inputs.workforceModel.value;
  if (m==="voice")   return {recommendation:"Voice-only agents need AI Assistant coverage for call summaries, real-time knowledge lookup, and guided responses during live calls.",summary:"The workforce is voice-only agents — AI Assistant and AI QM apply to voice only.",action:"Confirm voice AI Assistant and AI QM rollout across all inbound queues"};
  if (m==="digital") return {recommendation:"Digital-only agents benefit from AI Assistant for suggested responses, case summaries, and knowledge support across chat and messaging.",summary:"The workforce is digital-only agents — AI Assistant and AI QM apply to digital interactions only.",action:"Confirm digital AI Assistant and AI QM rollout for chat, messaging, and case handling"};
  return {recommendation:"Blended agents handle both voice and digital — maintain consistent AI Assistant and AI QM coverage across all queue types.",summary:"The workforce is blended (voice and digital) — maintain consistent AI Assistant and AI QM coverage across both channels.",action:"Validate shared AI Assistant and AI QM workflows across voice and digital queues"};
}

function updateVerticalAlignment(profile) {
  outputs.verticalTitle.textContent = `${profile.label} operating guide`;
  outputs.verticalVoiceContainment.textContent = formatPercent(percent("voiceContainmentPercent"));
  outputs.verticalDigitalDeflection.textContent = formatPercent(percent("digitalDeflectionPercent"));
  outputs.verticalOutboundHandled.textContent = formatPercent(percent("outboundHandledPercent"));
  outputs.verticalGuidance.textContent = profile.verticalGuidance;
  setReferenceOutcomes(profile);
}

function updateSummary(p, total, agent, asst, qm, handled, scripted, autonomous) {
  const wg = getWorkforceGuidance();
  const ch = activeChannelLabels().join(", ")||"no active AI Agent channels";
  outputs.summaryTitle.textContent = `${p.label} use case plan`;
  outputs.summaryText.textContent = `${p.summary} ${wg.summary} Scope: ${ch}. Assumptions require ${numberFormat.format(total)} total units — ${numberFormat.format(agent)} AI Agent (${numberFormat.format(scripted)} scripted, ${numberFormat.format(autonomous)} autonomous), ${numberFormat.format(asst)} AI Assistant, and ${numberFormat.format(qm)} AI QM — covering ${numberFormat.format(handled)} AI-handled contacts.`;
  setList(outputs.useCaseList,    p.useCases);
  setList(outputs.nextActionList, [...p.nextActions, wg.action]);
}

function updateUseCasePrioritisation(p) {
  const g = priorityGuidance[inputs.industryType.value]||priorityGuidance.other;
  outputs.automateFirstText.textContent  = g.automate;
  outputs.assistEscalateText.textContent = g.assist;
  outputs.evaluateText.textContent       = g.evaluate;
  outputs.humanOnlyText.textContent      = g.human;
  const m = inputs.agentMode.value;
  const mQ = m==="scripted" ? discoveryQuestions.scripted : m==="autonomous" ? discoveryQuestions.autonomous
    : ["Which journeys need strict scripted control?","Which journeys benefit from autonomous knowledge retrieval?","What split should be used for the first deployment wave?"];
  outputs.discoveryTitle.textContent = `${p.label} discovery questions`;
  setList(outputs.voiceDiscoveryList,    discoveryQuestions.voice);
  setList(outputs.digitalDiscoveryList,  discoveryQuestions.digital);
  setList(outputs.modeDiscoveryList,     mQ);
  setList(outputs.outboundDiscoveryList, discoveryQuestions.outbound);
}

function updateCalculator() {
  const profile  = industryProfiles[inputs.industryType.value]||industryProfiles.other;
  const agentType = inputs.workforceModel.value;
  updateChannelVisibility();
  updateWorkforceVisibility();

  const hasVoice=channelEnabled("voice"), hasDigital=channelEnabled("digital"), hasOutbound=channelEnabled("outbound");
  const coversVoice=agentType!=="digital", coversDigital=agentType!=="voice";

  // AI Agent
  const mVoice=hasVoice?positive("monthlyVoiceCalls"):0, mDig=hasDigital?positive("monthlyDigitalClients"):0, mOb=hasOutbound?positive("monthlyOutboundContacts"):0;
  const vcr=percent("voiceContainmentPercent"), ddr=percent("digitalDeflectionPercent"), ohr=percent("outboundHandledPercent");
  const {voiceAutonomousRate:var_,digitalAutonomousRate:dar,outboundAutonomousRate:oar} = getAgentRates();

  const vContained=mVoice*vcr, vRemaining=mVoice-vContained, dDeflected=mDig*ddr, dRemaining=mDig-dDeflected;
  const avMin=vContained*positive("aiAgentVoiceMinutes"), avAutoMin=avMin*var_, avScriptMin=avMin-avAutoMin;
  const adSess=messageSessions(dDeflected,positive("agentOutboundMessages")), adAutoSess=adSess*dar, adScriptSess=adSess-adAutoSess;
  const obHandled=mOb*ohr, obMin=obHandled*positive("outboundAiMinutes"), obAutoMin=obMin*oar, obScriptMin=obMin-obAutoMin;

  const avSu=units(avScriptMin,1600),avAu=units(avAutoMin,250),adSu=units(adScriptSess,4800),adAu=units(adAutoSess,200),obSu=units(obScriptMin,1600),obAu=units(obAutoMin,250);
  const agScripted=avSu+adSu+obSu, agAuto=avAu+adAu+obAu, agTotal=agScripted+agAuto;
  const aiHandled=vContained+dDeflected+obHandled;

  // Agent volumes for Assistant + QM (direct when channel off)
  const agVoice  = hasVoice   ? vRemaining  : (coversVoice   ? positive("directAgentVoiceCalls")   : 0);
  const agDigital= hasDigital ? dRemaining  : (coversDigital ? positive("directAgentDigitalClients") : 0);

  // AI Assistant
  const avcr=percent("assistantVoiceCoveragePercent"), adcr=percent("assistantDigitalCoveragePercent"), aht=positive("humanAhtMinutes");
  const asVoiceCalls=coversVoice?agVoice*avcr:0, asVoiceMin=asVoiceCalls*aht;
  const asDigCl=coversDigital?agDigital*adcr:0, asDigSess=messageSessions(asDigCl,positive("assistantInboundMessages"));
  const assistantUnits=Math.ceil((asVoiceMin/1500)+(asDigSess/1000));

  // AI QM
  const qmVoiceEvals=coversVoice?agVoice*percent("qmVoiceCoveragePercent"):0;
  const qmDigEvals=coversDigital?agDigital*percent("qmDigitalCoveragePercent"):0;
  const qmUnits=Math.ceil((qmVoiceEvals+qmDigEvals)/500);

  const totalUnits=agTotal+assistantUnits+qmUnits;

  // Render
  outputs.industryRecommendation.textContent = profile.recommendation;
  outputs.workforceModelRecommendation.textContent = getWorkforceGuidance().recommendation;
  updateAgentModeUi();
  updateVerticalAlignment(profile);

  outputs.totalUnits.textContent=numberFormat.format(totalUnits);
  outputs.agentTotalUnits.textContent=numberFormat.format(agTotal);
  outputs.assistantUnits.textContent=numberFormat.format(assistantUnits);
  outputs.qmUnits.textContent=numberFormat.format(qmUnits);
  outputs.aiHandledContacts.textContent=numberFormat.format(aiHandled);
  outputs.agentVoiceScriptedUnits.textContent=numberFormat.format(avSu);
  outputs.agentVoiceAutonomousUnits.textContent=numberFormat.format(avAu);
  outputs.agentDigitalScriptedUnits.textContent=numberFormat.format(adSu);
  outputs.agentDigitalAutonomousUnits.textContent=numberFormat.format(adAu);
  outputs.agentOutboundScriptedUnits.textContent=numberFormat.format(obSu);
  outputs.agentOutboundAutonomousUnits.textContent=numberFormat.format(obAu);
  outputs.agentScriptedTotalUnits.textContent=numberFormat.format(agScripted);
  outputs.agentAutonomousTotalUnits.textContent=numberFormat.format(agAuto);
  outputs.agentScriptedShare.textContent=agTotal?formatPercent(agScripted/agTotal):"0%";
  outputs.agentAutonomousShare.textContent=agTotal?formatPercent(agAuto/agTotal):"0%";
  outputs.agentBifurcationNote.textContent = inputs.agentMode.value==="scripted"
    ? "Scripted-only mode — all AI Agent units allocated to scripted automation."
    : inputs.agentMode.value==="autonomous"
    ? "Autonomous-only mode — all AI Agent units allocated to autonomous automation."
    : "Bifurcation is based on the selected division of labour between scripted and autonomous AI Agent work.";
  outputs.voiceContainedCalls.textContent=numberFormat.format(vContained);
  outputs.digitalDeflectedClients.textContent=numberFormat.format(dDeflected);
  outputs.outboundHandledContacts.textContent=numberFormat.format(obHandled);
  outputs.assistantVoiceCalls.textContent=numberFormat.format(asVoiceCalls);
  outputs.assistantDigitalClients.textContent=numberFormat.format(asDigCl);
  outputs.agentVoiceMinutes.textContent=numberFormat.format(avMin);
  outputs.agentDigitalSessions.textContent=numberFormat.format(adSess);
  outputs.agentOutboundMinutes.textContent=numberFormat.format(obMin);
  outputs.assistantVoiceMinutes.textContent=numberFormat.format(asVoiceMin);
  outputs.assistantDigitalSessions.textContent=numberFormat.format(asDigSess);
  outputs.qmVoiceEvaluations.textContent=numberFormat.format(qmVoiceEvals);
  outputs.qmDigitalEvaluations.textContent=numberFormat.format(qmDigEvals);

  const maxV=Math.max(vContained,dDeflected,obHandled,asVoiceCalls,asDigCl,1);
  setBar(outputs.voiceContainedBar,vContained,maxV); setBar(outputs.digitalDeflectedBar,dDeflected,maxV);
  setBar(outputs.outboundHandledBar,obHandled,maxV); setBar(outputs.assistantVoiceBar,asVoiceCalls,maxV);
  setBar(outputs.assistantDigitalBar,asDigCl,maxV);

  updateSummary(profile,totalUnits,agTotal,assistantUnits,qmUnits,aiHandled,agScripted,agAuto);
  updateUseCasePrioritisation(profile);
}

document.querySelectorAll("[data-sync-target]").forEach((i) => i.addEventListener("input", syncControlPair));
Object.values(inputs).forEach((i) => { if (i) i.addEventListener("input", updateCalculator); });
syncPairs.forEach(([f,s]) => {
  const sec=document.getElementById(s); if (sec&&!inputs[s]) sec.addEventListener("input",updateCalculator);
  setSyncedValue(f, document.getElementById(f)?.value ?? defaults[f]);
});
inputs.industryType.addEventListener("change", applyIndustryProfile);
inputs.agentMode.addEventListener("change", updateCalculator);
inputs.workforceModel.addEventListener("change", updateCalculator);
document.getElementById("calculatorForm").addEventListener("reset", () => {
  window.setTimeout(() => { syncPairs.forEach(([f]) => setSyncedValue(f, document.getElementById(f)?.value ?? defaults[f])); updateCalculator(); }, 0);
});
updateCalculator();
