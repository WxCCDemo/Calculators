const LOGO = "webex-logo-transparent.png";
const STORAGE_KEY = "webexAiResourceEstimate";

const industryProfiles = {
  financial: {
    label: "Financial services",
    voiceContainmentPercent: 58, digitalDeflectionPercent: 48, outboundHandledPercent: 38,
    aiAgentVoiceMinutes: 192, assistantVoiceCoveragePercent: 90, assistantDigitalCoveragePercent: 90, humanAhtMinutes: 420,
    recommendation: "Start with balance checks, card support, branch/service hours, status requests, and secure handoff intents.",
    verticalGuidance: "Use this vertical alignment for authenticated requests, status checks, servicing hours, card support, and guided escalation.",
    summary: "Start with high-volume authenticated service requests, then reserve autonomous AI Agent capacity for ambiguous troubleshooting and policy questions.",
    references: [
      { metric: "10%", label: "abandoned-call reduction signal", detail: "Useful when current queues have high wait time or avoidable repeat calls." },
      { metric: "180 sec", label: "faster employee resolution signal", detail: "Relevant for internal support and assisted-agent journeys." },
      { metric: "43%", label: "call-deflection signal", detail: "Use as a directional benchmark for routine financial-service requests." }
    ],
    useCases: ["Account and card servicing", "Loan or application status", "Branch, ATM, and service-hour questions", "Secure escalation to specialist teams"],
    nextActions: ["Map top 20 contact drivers by channel", "Separate authenticated and unauthenticated journeys", "Build scripted flows for deterministic requests", "Tune autonomous prompts with policy guardrails"]
  },
  insurance: {
    label: "Insurance",
    voiceContainmentPercent: 62, digitalDeflectionPercent: 45, outboundHandledPercent: 55,
    aiAgentVoiceMinutes: 228, assistantVoiceCoveragePercent: 85, assistantDigitalCoveragePercent: 85, humanAhtMinutes: 480,
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
    aiAgentVoiceMinutes: 156, assistantVoiceCoveragePercent: 80, assistantDigitalCoveragePercent: 90, humanAhtMinutes: 330,
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
    aiAgentVoiceMinutes: 210, assistantVoiceCoveragePercent: 90, assistantDigitalCoveragePercent: 80, humanAhtMinutes: 450,
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
    aiAgentVoiceMinutes: 180, assistantVoiceCoveragePercent: 85, assistantDigitalCoveragePercent: 85, humanAhtMinutes: 390,
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
    aiAgentVoiceMinutes: 168, assistantVoiceCoveragePercent: 88, assistantDigitalCoveragePercent: 85, humanAhtMinutes: 390,
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
    aiAgentVoiceMinutes: 204, assistantVoiceCoveragePercent: 90, assistantDigitalCoveragePercent: 80, humanAhtMinutes: 480,
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
    aiAgentVoiceMinutes: 180, assistantVoiceCoveragePercent: 85, assistantDigitalCoveragePercent: 85, humanAhtMinutes: 420,
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
  industryType: "financial",
  agentMode: "both",
  workforceModel: "blended",
  humanAgentProduct: "bundle",
  humanAgentCount: 200,
  channelVoice: true,
  channelDigital: true,
  channelOutbound: false,
  monthlyVoiceCalls: 50000,
  monthlyDigitalClients: 12000,
  monthlyOutboundContacts: 10000,
  voiceContainmentPercent: 58,
  digitalDeflectionPercent: 48,
  outboundHandledPercent: 45,
  aiAgentVoiceMinutes: 192,
  outboundAiMinutes: 144,
  agentVoiceAutonomousPercent: 30,
  agentDigitalAutonomousPercent: 35,
  agentOutboundAutonomousPercent: 40,
  agentOutboundMessages: 10,
  directAgentVoiceCalls: 0,
  directAgentDigitalClients: 0,
  assistantVoiceCoveragePercent: 90,
  humanAhtMinutes: 420,
  assistantDigitalCoveragePercent: 90,
  assistantInboundMessages: 10
};

const priorityGuidance = {
  financial: {
    automate: "Balance enquiry, card status, branch hours, transaction status, PIN reset, FAQ answers.",
    assist: "Fraud concerns, complex disputes, loan restructuring, bereavement, vulnerable customer support.",
    evaluate: "Address changes, simple complaints, routine limit changes, product education prompts.",
    human: "Account closure, regulatory complaints, hardship cases, VIP escalation, legal requests."
  },
  insurance: {
    automate: "Claim status, policy document lookup, premium due dates, payment support, renewal reminders.",
    assist: "Coverage explanation, claim triage, liability questions, multi-party claim handling.",
    evaluate: "Minor policy edits, simple renewal prompts, low-risk document collection.",
    human: "Major complaints, legal matters, denied claims, vulnerable customer scenarios."
  },
  retail: {
    automate: "Order tracking, returns eligibility, store hours, loyalty balance, delivery updates.",
    assist: "Delivery exceptions, refund disputes, high-value customers, complex product support.",
    evaluate: "Simple upsell prompts, stock queries for low-volume SKUs, routine profile changes.",
    human: "Chargebacks, major complaints, fraud, VIP/high-value escalation."
  },
  healthcare: {
    automate: "Appointments, clinic hours, billing questions, preparation instructions, location routing.",
    assist: "Care navigation, complex billing, sensitive patient context, multi-department handoff.",
    evaluate: "General wellness FAQs, simple administrative reminders, basic document requests.",
    human: "Clinical advice, emergency symptoms, legal/consent matters, vulnerable-patient escalation."
  },
  travel: {
    automate: "Booking status, baggage updates, loyalty lookup, cancellation rules, itinerary reminders.",
    assist: "Disruption handling, rebooking exceptions, refund disputes, complex itinerary changes.",
    evaluate: "Ancillary offers, routine preference updates, low-volume destination questions.",
    human: "Major disruption, legal claims, VIP travel, stranded traveler escalation."
  },
  shipping: {
    automate: "Shipment status, ETA lookup, delivery confirmation, collection booking, standard re-delivery.",
    assist: "Complex claims, damaged goods, customs exceptions, high-value shipment escalations.",
    evaluate: "Delivery preference updates, low-volume route queries, basic address corrections.",
    human: "Legal disputes, missing high-value parcels, regulatory escalations, corporate account issues."
  },
  public: {
    automate: "Application status, appointment booking, document checklist, location and service hours.",
    assist: "Eligibility navigation, complex case follow-up, vulnerable citizen support.",
    evaluate: "Low-volume service FAQs, simple reminders, generic program education.",
    human: "Legal matters, complaints, crisis support, sensitive eligibility decisions."
  },
  other: {
    automate: "High-volume status lookup, FAQs, appointment or request management, simple routing.",
    assist: "Complex troubleshooting, multi-step service recovery, sensitive context handoff.",
    evaluate: "Low-volume simple requests, basic reminders, general education prompts.",
    human: "Legal matters, major complaints, VIP situations, regulated decisions."
  }
};

const discoveryQuestions = {
  voice: [
    "What are the top call reasons by volume and repeat rate?",
    "Which callers must always reach a human?",
    "How is the caller authenticated before service is provided?"
  ],
  digital: [
    "Which digital channels are in scope?",
    "Should context be preserved when a customer returns mid-session?",
    "What transcript and routing context must pass to the agent?"
  ],
  scripted: [
    "Which journeys require strict control and predictable responses?",
    "Which systems or APIs are available for deterministic lookup?",
    "What success metrics define a completed scripted flow?"
  ],
  autonomous: [
    "Which intents need flexible language understanding?",
    "What knowledge sources can the autonomous agent safely use?",
    "Which edge cases require immediate escalation?"
  ],
  outbound: [
    "Is outbound consent documented and retrievable?",
    "What is the campaign intent and target list size?",
    "What context must transfer to a live agent if the customer responds?"
  ]
};

const inputs = Object.fromEntries(
  Object.keys(defaults).map((id) => [id, document.getElementById(id)])
);

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
  agentTotalUnits: document.getElementById("agentTotalUnits"),
  assistantUnits: document.getElementById("assistantUnits"),
  qmUnits: document.getElementById("qmUnits"),
  humanAgentProductNote: document.getElementById("humanAgentProductNote"),
  assistantVoiceCoverageLabel: document.getElementById("assistantVoiceCoverageLabel"),
  assistantVoiceCoverageHelp: document.getElementById("assistantVoiceCoverageHelp"),
  assistantDigitalCoverageLabel: document.getElementById("assistantDigitalCoverageLabel"),
  assistantDigitalCoverageHelp: document.getElementById("assistantDigitalCoverageHelp"),
  qmSubSectionDesc: document.getElementById("qmSubSectionDesc"),
  qmSizingNote: document.getElementById("qmSizingNote"),
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
  voiceScriptedMix: document.getElementById("voiceScriptedMix"),
  digitalScriptedMix: document.getElementById("digitalScriptedMix"),
  outboundScriptedMix: document.getElementById("outboundScriptedMix"),
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
  qmSubSection: document.getElementById("qmSubSection"),
  resultWhyTitle: document.getElementById("resultWhyTitle"),
  resultWhyText: document.getElementById("resultWhyText"),
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
  ["monthlyVoiceCalls", "monthlyVoiceCallsSlider"],
  ["monthlyDigitalClients", "monthlyDigitalClientsSlider"],
  ["monthlyOutboundContacts", "monthlyOutboundContactsSlider"],
  ["voiceContainmentPercent", "voiceContainmentPercentNumber"],
  ["digitalDeflectionPercent", "digitalDeflectionPercentNumber"],
  ["outboundHandledPercent", "outboundHandledPercentNumber"],
  ["aiAgentVoiceMinutes", "aiAgentVoiceMinutesSlider"],
  ["outboundAiMinutes", "outboundAiMinutesSlider"],
  ["agentVoiceAutonomousPercent", "agentVoiceAutonomousPercentNumber"],
  ["agentDigitalAutonomousPercent", "agentDigitalAutonomousPercentNumber"],
  ["agentOutboundAutonomousPercent", "agentOutboundAutonomousPercentNumber"],
  ["agentOutboundMessages", "agentOutboundMessagesSlider"],
  ["humanAgentCount", "humanAgentCountSlider"],
  ["directAgentVoiceCalls", "directAgentVoiceCallsSlider"],
  ["directAgentDigitalClients", "directAgentDigitalClientsSlider"],
  ["assistantVoiceCoveragePercent", "assistantVoiceCoveragePercentNumber"],
  ["humanAhtMinutes", "humanAhtMinutesSlider"],
  ["assistantDigitalCoveragePercent", "assistantDigitalCoveragePercentNumber"],
  ["assistantInboundMessages", "assistantInboundMessagesSlider"],
];

function value(id) {
  const el = inputs[id];
  if (!el) return defaults[id] || 0;
  const parsed = Number.parseFloat(el.value);
  return Number.isFinite(parsed) ? parsed : (defaults[id] || 0);
}

function setSyncedValue(id, nextValue) {
  const source = document.getElementById(id);
  if (!source) return;
  source.value = nextValue;
  const pair = syncPairs.find(([first, second]) => first === id || second === id);
  if (pair) {
    const otherId = pair[0] === id ? pair[1] : pair[0];
    const other = document.getElementById(otherId);
    if (other) other.value = nextValue;
  }
}

function syncControlPair(event) {
  const targetId = event.target.dataset.syncTarget;
  if (!targetId) return;
  const target = document.getElementById(targetId);
  if (!target) return;
  target.value = event.target.value;
}

function positive(id) { return Math.max(0, value(id)); }
function percent(id)  { return Math.min(Math.max(value(id), 0), 100) / 100; }
function secondsToMinutes(seconds) { return seconds / 60; }

function channelEnabled(channel) {
  if (inputs.agentMode.value === "none") return false;
  const input = inputs[`channel${channel[0].toUpperCase()}${channel.slice(1)}`];
  return input ? input.checked : false;
}

function activeChannelLabels() {
  const labels = [];
  if (channelEnabled("voice"))    labels.push("voice");
  if (channelEnabled("digital"))  labels.push("digital");
  if (channelEnabled("outbound")) labels.push("outbound");
  return labels;
}

function updateChannelVisibility() {
  const agentDisabled = inputs.agentMode.value === "none";
  ["Voice", "Digital", "Outbound"].forEach((channel) => {
    const input = inputs[`channel${channel}`];
    if (input) input.disabled = agentDisabled;
  });
  ["voice", "digital", "outbound"].forEach((channel) => {
    const on = channelEnabled(channel);
    document.querySelectorAll(`[data-channel="${channel}"]`).forEach((el) => {
      el.hidden = !on;
    });
    // Show "direct entry" fields when the channel is NOT selected for AI Agent
    document.querySelectorAll(`[data-channel-off="${channel}"]`).forEach((el) => {
      el.hidden = on;
    });
  });
}

function updateWorkforceVisibility() {
  const model = inputs.workforceModel.value;
  document.querySelectorAll('[data-assistant-channel="voice"]').forEach((el) => {
    el.hidden = model === "digital";
  });
  document.querySelectorAll('[data-assistant-channel="digital"]').forEach((el) => {
    el.hidden = model === "voice";
  });
}

function messageSessions(interactions, messagesPerInteraction) {
  return interactions * Math.ceil(Math.max(1, messagesPerInteraction) / 10);
}

function units(amount, allowance) { return Math.ceil(amount / allowance); }

function setBar(element, amount, max) {
  element.style.width = `${max > 0 ? Math.min((amount / max) * 100, 100) : 0}%`;
}

function formatPercent(val) { return `${Math.round(val * 100)}%`; }

function updateMixReadout(prefix, autonomousRate) {
  const scripted = Math.round((1 - autonomousRate) * 100);
  const scriptedEl = outputs[`${prefix}ScriptedMix`];
  if (scriptedEl) scriptedEl.value = scripted;
}

function updateProductVisibility() {
  if (outputs.qmSubSection) outputs.qmSubSection.hidden = false;
  const product = inputs.humanAgentProduct ? inputs.humanAgentProduct.value : "bundle";
  const copy = {
    bundle: {
      note: "Bundled mode uses the same human-agent interaction base for AI Assistant and AI QM.",
      voiceLabel: "Human voice calls covered by bundle",
      voiceHelp: "% of human-escalated voice calls covered by the bundle. Use 100% to match the Excel bundle row.",
      digitalLabel: "Human digital interactions covered by bundle",
      digitalHelp: "% of human-escalated digital chats or messages covered by the bundle.",
      qmDesc: "Bundled mode uses the same human-agent interaction base for AI Assistant and AI QM. Voice formula: human-agent calls x coverage % x human AHT seconds, converted to minutes, then divide by 1,500 minutes per Unit.",
      qmNote: "<strong>Bundled sizing:</strong> AI Assistant and AI QM show the same unit quantity. AI QM covers auto-scoring, sentiment analysis, compliance checking, and performance coaching for those agent interactions."
    },
    assistant: {
      note: "AI Assistant only calculates AI Assistant quantity; AI QM quantity is zero.",
      voiceLabel: "Human voice calls using AI Assistant",
      voiceHelp: "% of human-escalated voice calls where agents use AI Assistant.",
      digitalLabel: "Human digital interactions using AI Assistant",
      digitalHelp: "% of human-escalated digital chats or messages where agents use AI Assistant.",
      qmDesc: "AI QM is not included in AI Assistant only mode.",
      qmNote: "<strong>AI QM not included:</strong> Select AI QM only or Bundle if Quality Management quantity is required."
    },
    qm: {
      note: "AI QM only calculates AI QM quantity; AI Assistant quantity is zero.",
      voiceLabel: "Human voice calls covered by AI QM",
      voiceHelp: "% of human-escalated voice calls to be scored or evaluated by AI QM.",
      digitalLabel: "Human digital interactions covered by AI QM",
      digitalHelp: "% of human-escalated digital chats or messages to be scored or evaluated by AI QM.",
      qmDesc: "AI QM only mode sizes Quality Management from the selected human-agent interaction coverage. AI Assistant is not included.",
      qmNote: "<strong>AI QM sizing:</strong> Uses the selected coverage, human-agent AHT seconds converted to minutes, and digital session assumptions to calculate AI QM quantity."
    }
  }[product];
  if (outputs.humanAgentProductNote) outputs.humanAgentProductNote.textContent = copy.note;
  if (outputs.assistantVoiceCoverageLabel) outputs.assistantVoiceCoverageLabel.textContent = copy.voiceLabel;
  if (outputs.assistantVoiceCoverageHelp) outputs.assistantVoiceCoverageHelp.textContent = copy.voiceHelp;
  if (outputs.assistantDigitalCoverageLabel) outputs.assistantDigitalCoverageLabel.textContent = copy.digitalLabel;
  if (outputs.assistantDigitalCoverageHelp) outputs.assistantDigitalCoverageHelp.textContent = copy.digitalHelp;
  if (outputs.qmSubSectionDesc) outputs.qmSubSectionDesc.textContent = copy.qmDesc;
  if (outputs.qmSizingNote) outputs.qmSizingNote.innerHTML = copy.qmNote;
}

function setList(list, items) {
  list.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}

function setReferenceOutcomes(profile) {
  outputs.referenceTitle.textContent = `${profile.label} reference signals`;
  outputs.referenceOutcomeList.innerHTML = "";
  profile.references.forEach((item) => {
    const article = document.createElement("article");
    const metric  = document.createElement("strong");
    const label   = document.createElement("span");
    const detail  = document.createElement("p");
    metric.textContent = item.metric;
    label.textContent  = item.label;
    detail.textContent = item.detail;
    article.append(metric, label, detail);
    outputs.referenceOutcomeList.appendChild(article);
  });
}

function applyIndustryProfile() {
  const profile = industryProfiles[inputs.industryType.value] || industryProfiles.other;
  ["voiceContainmentPercent","digitalDeflectionPercent","outboundHandledPercent",
   "aiAgentVoiceMinutes","assistantVoiceCoveragePercent","assistantDigitalCoveragePercent","humanAhtMinutes"
  ].forEach((id) => setSyncedValue(id, profile[id]));
  updateCalculator();
}

function getAgentRates() {
  const mode = inputs.agentMode.value;
  if (mode === "none") return { voiceAutonomousRate: 0, digitalAutonomousRate: 0, outboundAutonomousRate: 0 };
  if (mode === "scripted")   return { voiceAutonomousRate: 0, digitalAutonomousRate: 0, outboundAutonomousRate: 0 };
  if (mode === "autonomous") return { voiceAutonomousRate: 1, digitalAutonomousRate: 1, outboundAutonomousRate: 1 };
  return {
    voiceAutonomousRate:    percent("agentVoiceAutonomousPercent"),
    digitalAutonomousRate:  percent("agentDigitalAutonomousPercent"),
    outboundAutonomousRate: percent("agentOutboundAutonomousPercent")
  };
}

function updateAgentModeUi() {
  const mode = inputs.agentMode.value;
  outputs.divisionControls.hidden = mode !== "both";
  outputs.agentBifurcationCard.hidden = false;
  if (mode === "scripted") {
    outputs.agentModeRecommendation.textContent = "Scripted mode sets scripted AI Agent work to 100%. Use it for deterministic journeys such as status lookup, payments, forms, and eligibility checks.";
  } else if (mode === "autonomous") {
    outputs.agentModeRecommendation.textContent = "Autonomous mode sets autonomous AI Agent work to 100%. Use it for natural-language troubleshooting, complex questions, and broader service navigation.";
  } else if (mode === "none") {
    outputs.agentModeRecommendation.textContent = "AI Agent is not in scope. Enter human-handled voice and digital volumes below to size AI Assistant and AI QM only.";
  } else {
    outputs.agentModeRecommendation.textContent = "Use the division controls to set autonomous share by channel. Scripted share is calculated as the remaining percentage.";
  }
}

function getWorkforceGuidance() {
  const model = inputs.workforceModel.value;
  if (model === "voice") return {
    recommendation: "Voice-only agents need AI Assistant coverage for call summaries, real-time knowledge lookup, and guided responses during live calls.",
    summary: "The workforce is voice-only agents, so AI Assistant and AI QM coverage apply to voice calls only.",
    action: "Confirm voice AI Assistant and AI QM rollout across all inbound queues"
  };
  if (model === "digital") return {
    recommendation: "Digital-only agents benefit from AI Assistant for suggested responses, case summaries, and real-time knowledge support across chat and messaging.",
    summary: "The workforce is digital-only agents, so AI Assistant and AI QM coverage apply to digital interactions only.",
    action: "Confirm digital AI Assistant and AI QM rollout for chat, messaging, and case handling"
  };
  return {
    recommendation: "Blended agents handle both voice and digital — maintain consistent AI Assistant and AI QM coverage across all queue types.",
    summary: "The workforce is blended (voice and digital), so maintain consistent AI Assistant and AI QM coverage across both channels.",
    action: "Validate shared AI Assistant and AI QM workflows across voice and digital queues"
  };
}

function updateVerticalAlignment(profile) {
  outputs.verticalTitle.textContent            = `${profile.label} operating guide`;
  outputs.verticalVoiceContainment.textContent  = formatPercent(percent("voiceContainmentPercent"));
  outputs.verticalDigitalDeflection.textContent = formatPercent(percent("digitalDeflectionPercent"));
  outputs.verticalOutboundHandled.textContent   = formatPercent(percent("outboundHandledPercent"));
  outputs.verticalGuidance.textContent          = profile.verticalGuidance;
  setReferenceOutcomes(profile);
}

function updateSummary(profile, agentTotalUnits, assistantUnits, qmUnits, aiHandledContacts, humanHandledContacts, scriptedUnits, autonomousUnits, humanAgentCount) {
  const wg = getWorkforceGuidance();
  const channelText = activeChannelLabels().join(", ") || "no active AI Agent channels";
  const agentText = humanAgentCount ? ` across ${numberFormat.format(humanAgentCount)} human agents` : "";
  outputs.summaryTitle.textContent = `${profile.label} use case plan`;
  outputs.summaryText.textContent  =
    `${profile.summary} ${wg.summary} Scope: ${channelText}. Product-specific quantities are ${numberFormat.format(agentTotalUnits)} Webex AI Agent (${numberFormat.format(scriptedUnits)} scripted, ${numberFormat.format(autonomousUnits)} autonomous), ${numberFormat.format(assistantUnits)} Webex AI Assistant, and ${numberFormat.format(qmUnits)} Webex AI QM. These are separate products and are not combined into a total. The estimate covers ${numberFormat.format(aiHandledContacts)} AI-handled contacts and ${numberFormat.format(humanHandledContacts)} human-handled contacts${agentText}.`;
  setList(outputs.useCaseList,    profile.useCases);
  setList(outputs.nextActionList, [...profile.nextActions, wg.action]);
}

function updateResultExplanation(metrics) {
  const active = activeChannelLabels();
  const lines = [];
  if (inputs.agentMode.value === "none") {
    lines.push("AI Agent is not required, so AI Agent quantity is zero. AI Assistant and AI QM are sized from the manual human-handled voice and digital volumes.");
  }
  if (active.includes("voice")) {
    lines.push(`Voice: all in-scope calls route to AI Agent first; ${numberFormat.format(metrics.voiceContainedCalls)} calls complete in AI Agent and ${numberFormat.format(metrics.voiceRemainingCalls)} calls escalate to human agents.`);
  }
  if (active.includes("digital")) {
    lines.push(`Digital: ${numberFormat.format(metrics.digitalDeflectedClients)} interactions complete in AI Agent and ${numberFormat.format(metrics.digitalRemainingClients)} interactions continue to human agents.`);
  }
  if (active.includes("outbound")) {
    lines.push(`Voice Outbound: ${numberFormat.format(metrics.outboundHandledContacts)} contacts complete in AI Agent and ${numberFormat.format(metrics.outboundRemainingContacts)} contacts continue to human agents.`);
  }
  const humanProduct = inputs.humanAgentProduct ? inputs.humanAgentProduct.value : "bundle";
  const productText = humanProduct === "assistant" ? "AI Assistant"
    : humanProduct === "qm" ? "AI QM"
    : "AI Assistant and AI QM bundle";
  lines.push(`${productText} covers ${numberFormat.format(metrics.coveredVoiceCalls)} human voice interactions and ${numberFormat.format(metrics.coveredDigInteractions)} human digital interactions based on the selected coverage percentages.`);
  if (outputs.resultWhyTitle) {
    outputs.resultWhyTitle.textContent = active.length === 1
      ? `${active[0] === "outbound" ? "Voice Outbound" : active[0][0].toUpperCase() + active[0].slice(1)} result explanation`
      : "Channel result explanation";
  }
  if (outputs.resultWhyText) outputs.resultWhyText.textContent = lines.join(" ");
}

function updateUseCasePrioritisation(profile) {
  const guidance = priorityGuidance[inputs.industryType.value] || priorityGuidance.other;
  outputs.automateFirstText.textContent  = guidance.automate;
  outputs.assistEscalateText.textContent = guidance.assist;
  outputs.evaluateText.textContent       = guidance.evaluate;
  outputs.humanOnlyText.textContent      = guidance.human;
  const mode = inputs.agentMode.value;
  const modeQ = mode === "scripted" ? discoveryQuestions.scripted
              : mode === "autonomous" ? discoveryQuestions.autonomous
              : ["Which journeys need strict scripted control?",
                 "Which journeys benefit from autonomous knowledge retrieval?",
                 "What split should be used for the first deployment wave?"];
  outputs.discoveryTitle.textContent = `${profile.label} discovery questions`;
  setList(outputs.voiceDiscoveryList,    discoveryQuestions.voice);
  setList(outputs.digitalDiscoveryList,  discoveryQuestions.digital);
  setList(outputs.modeDiscoveryList,     modeQ);
  setList(outputs.outboundDiscoveryList, discoveryQuestions.outbound);
}

function updateCalculator() {
  const profile  = industryProfiles[inputs.industryType.value] || industryProfiles.other;
  const agentType = inputs.workforceModel.value;
  const humanAgentCount = positive("humanAgentCount");

  updateChannelVisibility();
  updateWorkforceVisibility();

  const hasVoice    = channelEnabled("voice");
  const hasDigital  = channelEnabled("digital");
  const hasOutbound = channelEnabled("outbound");

  const assistantCoversVoice   = agentType !== "digital";
  const assistantCoversDigital = agentType !== "voice";

  // ── AI Agent volumes ────────────────────────────────────────
  const monthlyVoiceCalls       = hasVoice    ? positive("monthlyVoiceCalls")       : 0;
  const monthlyDigitalClients   = hasDigital  ? positive("monthlyDigitalClients")   : 0;
  const monthlyOutboundContacts = hasOutbound ? positive("monthlyOutboundContacts") : 0;

  const voiceContainmentRate  = percent("voiceContainmentPercent");
  const digitalDeflectionRate = percent("digitalDeflectionPercent");
  const outboundHandledRate   = percent("outboundHandledPercent");
  const { voiceAutonomousRate, digitalAutonomousRate, outboundAutonomousRate } = getAgentRates();
  updateMixReadout("voice", voiceAutonomousRate);
  updateMixReadout("digital", digitalAutonomousRate);
  updateMixReadout("outbound", outboundAutonomousRate);

  const voiceContainedCalls     = monthlyVoiceCalls * voiceContainmentRate;
  const voiceRemainingCalls     = monthlyVoiceCalls - voiceContainedCalls;
  const digitalDeflectedClients = monthlyDigitalClients * digitalDeflectionRate;
  const digitalRemainingClients = monthlyDigitalClients - digitalDeflectedClients;

  // Match the source license model: every in-scope voice call enters the AI Agent
  // conversation, even when some calls later escalate to a human agent.
  const agentVoiceSeconds = monthlyVoiceCalls * positive("aiAgentVoiceMinutes");
  const agentVoiceMin    = secondsToMinutes(agentVoiceSeconds);
  const agentVoiceAutoMin = agentVoiceMin * voiceAutonomousRate;
  const agentVoiceScriptMin = agentVoiceMin - agentVoiceAutoMin;

  const agentDigSess     = messageSessions(digitalDeflectedClients, positive("agentOutboundMessages"));
  const agentDigAutoSess = agentDigSess * digitalAutonomousRate;
  const agentDigScriptSess = agentDigSess - agentDigAutoSess;

  const outboundHandledContacts = monthlyOutboundContacts * outboundHandledRate;
  const outboundRemainingContacts = monthlyOutboundContacts - outboundHandledContacts;
  const agentObSeconds = outboundHandledContacts * positive("outboundAiMinutes");
  const agentObMin     = secondsToMinutes(agentObSeconds);
  const agentObAutoMin = agentObMin * outboundAutonomousRate;
  const agentObScriptMin = agentObMin - agentObAutoMin;

  const agentVoiceScriptedUnits     = units(agentVoiceScriptMin,   1600);
  const agentVoiceAutonomousUnits   = units(agentVoiceAutoMin,      250);
  const agentDigitalScriptedUnits   = units(agentDigScriptSess,    4800);
  const agentDigitalAutonomousUnits = units(agentDigAutoSess,       200);
  const agentOutboundScriptedUnits  = units(agentObScriptMin,      1600);
  const agentOutboundAutonomousUnits = units(agentObAutoMin,         250);

  const agentScriptedTotalUnits   = agentVoiceScriptedUnits   + agentDigitalScriptedUnits   + agentOutboundScriptedUnits;
  const agentAutonomousTotalUnits = agentVoiceAutonomousUnits + agentDigitalAutonomousUnits + agentOutboundAutonomousUnits;
  const agentTotalUnits           = agentScriptedTotalUnits   + agentAutonomousTotalUnits;

  const aiHandledContacts = voiceContainedCalls + digitalDeflectedClients + outboundHandledContacts;

  // ── Agent volumes for AI Assistant & AI QM ─────────────────
  // When channel is off the user enters direct agent volumes for standalone AI Assist / QM mode
  const agentVolumeVoice   = (hasVoice ? voiceRemainingCalls : (assistantCoversVoice ? positive("directAgentVoiceCalls") : 0)) + outboundRemainingContacts;
  const agentVolumeDigital = hasDigital ? digitalRemainingClients : (assistantCoversDigital ? positive("directAgentDigitalClients") : 0);

  // ── AI Assistant & AI QM ────────────────────────────────────────────
  const assistantVoiceCoverageRate   = percent("assistantVoiceCoveragePercent");
  const assistantDigitalCoverageRate = percent("assistantDigitalCoveragePercent");
  const humanAhtSeconds              = positive("humanAhtMinutes");
  const humanAhtMinutes              = secondsToMinutes(humanAhtSeconds);

  const coveredVoiceCalls   = assistantCoversVoice   ? agentVolumeVoice   * assistantVoiceCoverageRate   : 0;
  const coveredVoiceSeconds = coveredVoiceCalls * humanAhtSeconds;
  const coveredVoiceMinutes = secondsToMinutes(coveredVoiceSeconds);
  const coveredDigInteractions = assistantCoversDigital ? agentVolumeDigital  * assistantDigitalCoverageRate : 0;
  const coveredDigSessions  = messageSessions(coveredDigInteractions, positive("assistantInboundMessages"));

  // Product quantities are separate; do not combine them into a total.
  const humanProduct = inputs.humanAgentProduct ? inputs.humanAgentProduct.value : "bundle";
  const coveredUnits = Math.ceil((coveredVoiceMinutes / 1500) + (coveredDigSessions / 1000));
  const assistantUnits = humanProduct === "qm" ? 0 : coveredUnits;
  const qmUnits = humanProduct === "assistant" ? 0 : coveredUnits;
  const assistantVoiceCalls = humanProduct === "qm" ? 0 : coveredVoiceCalls;
  const assistantVoiceSeconds = humanProduct === "qm" ? 0 : coveredVoiceSeconds;
  const assistantDigClients = humanProduct === "qm" ? 0 : coveredDigInteractions;
  const assistantDigSessions = humanProduct === "qm" ? 0 : coveredDigSessions;
  const qmVoiceSeconds = humanProduct === "assistant" ? 0 : coveredVoiceSeconds;
  const qmDigSessions = humanProduct === "assistant" ? 0 : coveredDigSessions;

  // ── Render ──────────────────────────────────────────────────
  outputs.industryRecommendation.textContent       = profile.recommendation;
  outputs.workforceModelRecommendation.textContent = getWorkforceGuidance().recommendation;
  updateAgentModeUi();
  updateProductVisibility();

  updateVerticalAlignment(profile);

  outputs.agentTotalUnits.textContent       = numberFormat.format(agentTotalUnits);
  outputs.assistantUnits.textContent        = numberFormat.format(assistantUnits);
  outputs.qmUnits.textContent               = numberFormat.format(qmUnits);
  outputs.aiHandledContacts.textContent     = numberFormat.format(aiHandledContacts);
  outputs.agentVoiceScriptedUnits.textContent      = numberFormat.format(agentVoiceScriptedUnits);
  outputs.agentVoiceAutonomousUnits.textContent    = numberFormat.format(agentVoiceAutonomousUnits);
  outputs.agentDigitalScriptedUnits.textContent    = numberFormat.format(agentDigitalScriptedUnits);
  outputs.agentDigitalAutonomousUnits.textContent  = numberFormat.format(agentDigitalAutonomousUnits);
  outputs.agentOutboundScriptedUnits.textContent   = numberFormat.format(agentOutboundScriptedUnits);
  outputs.agentOutboundAutonomousUnits.textContent = numberFormat.format(agentOutboundAutonomousUnits);
  outputs.agentScriptedTotalUnits.textContent      = numberFormat.format(agentScriptedTotalUnits);
  outputs.agentAutonomousTotalUnits.textContent    = numberFormat.format(agentAutonomousTotalUnits);
  outputs.agentScriptedShare.textContent   = agentTotalUnits ? formatPercent(agentScriptedTotalUnits   / agentTotalUnits) : "0%";
  outputs.agentAutonomousShare.textContent = agentTotalUnits ? formatPercent(agentAutonomousTotalUnits / agentTotalUnits) : "0%";

  if (inputs.agentMode.value === "both") {
    outputs.agentBifurcationNote.textContent = "This split drives the unit calculation: scripted voice uses 1 Unit = 1,600 Minutes, while autonomous voice uses 1 Unit = 250 LLM-powered Minutes. Digital also has separate scripted and autonomous session entitlements.";
  } else if (inputs.agentMode.value === "scripted") {
    outputs.agentBifurcationNote.textContent = "Scripted-only mode uses scripted entitlements only: voice is calculated at 1 Unit = 1,600 Minutes and digital at 1 Unit = 4,800 Sessions.";
  } else if (inputs.agentMode.value === "none") {
    outputs.agentBifurcationNote.textContent = "AI Agent is not in scope, so scripted and autonomous AI Agent quantities are both zero.";
  } else {
    outputs.agentBifurcationNote.textContent = "Autonomous-only mode uses autonomous entitlements only: voice is calculated at 1 Unit = 250 LLM-powered Minutes and digital at 1 Unit = 200 LLM-powered Sessions.";
  }

  outputs.voiceContainedCalls.textContent     = numberFormat.format(voiceContainedCalls);
  outputs.digitalDeflectedClients.textContent = numberFormat.format(digitalDeflectedClients);
  outputs.outboundHandledContacts.textContent = numberFormat.format(outboundHandledContacts);
  outputs.assistantVoiceCalls.textContent     = numberFormat.format(assistantVoiceCalls);
  outputs.assistantDigitalClients.textContent = numberFormat.format(assistantDigClients);
  outputs.agentVoiceMinutes.textContent       = numberFormat.format(agentVoiceMin);
  outputs.agentDigitalSessions.textContent    = numberFormat.format(agentDigSess);
  outputs.agentOutboundMinutes.textContent    = numberFormat.format(agentObMin);
  outputs.assistantVoiceMinutes.textContent   = numberFormat.format(assistantVoiceSeconds / 60);
  outputs.assistantDigitalSessions.textContent = numberFormat.format(assistantDigSessions);
  outputs.qmVoiceEvaluations.textContent      = numberFormat.format(qmVoiceSeconds / 60);
  outputs.qmDigitalEvaluations.textContent    = numberFormat.format(qmDigSessions);

  const maxVol = Math.max(voiceContainedCalls, digitalDeflectedClients, outboundHandledContacts, assistantVoiceCalls, assistantDigClients, 1);
  setBar(outputs.voiceContainedBar,   voiceContainedCalls,     maxVol);
  setBar(outputs.digitalDeflectedBar, digitalDeflectedClients, maxVol);
  setBar(outputs.outboundHandledBar,  outboundHandledContacts, maxVol);
  setBar(outputs.assistantVoiceBar,   assistantVoiceCalls,     maxVol);
  setBar(outputs.assistantDigitalBar, assistantDigClients,     maxVol);

  const humanHandledContacts = agentVolumeVoice + agentVolumeDigital;
  updateSummary(profile, agentTotalUnits, assistantUnits, qmUnits, aiHandledContacts, humanHandledContacts, agentScriptedTotalUnits, agentAutonomousTotalUnits, humanAgentCount);
  updateUseCasePrioritisation(profile);
  updateResultExplanation({
    voiceContainedCalls,
    voiceRemainingCalls,
    digitalDeflectedClients,
    digitalRemainingClients,
    outboundHandledContacts,
    outboundRemainingContacts,
    coveredVoiceCalls,
    coveredDigInteractions,
    assistantVoiceCalls,
    assistantDigClients
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    generatedAt: new Date().toISOString(),
    profile: {
      industryType: inputs.industryType.value,
      industryLabel: profile.label,
      agentMode: inputs.agentMode.value,
      workforceModel: inputs.workforceModel.value,
      humanAgentProduct: inputs.humanAgentProduct ? inputs.humanAgentProduct.value : "bundle",
      humanAgentCount,
      channels: activeChannelLabels()
    },
    units: {
      agentTotalUnits,
      assistantUnits,
      qmUnits,
      agentScriptedTotalUnits,
      agentAutonomousTotalUnits,
      agentVoiceScriptedUnits,
      agentVoiceAutonomousUnits,
      agentDigitalScriptedUnits,
      agentDigitalAutonomousUnits,
      agentOutboundScriptedUnits,
      agentOutboundAutonomousUnits
    },
    metering: {
      agentVoiceMinutes: agentVoiceMin,
      agentVoiceSeconds,
      agentDigitalSessions: agentDigSess,
      agentOutboundMinutes: agentObMin,
      agentOutboundSeconds: agentObSeconds,
      assistantVoiceMinutes: assistantVoiceSeconds / 60,
      assistantVoiceSeconds,
      assistantDigitalSessions: assistantDigSessions,
      qmVoiceMinutes: qmVoiceSeconds / 60,
      qmVoiceSeconds,
      qmDigitalSessions: qmDigSessions
    },
    assumptions: {
      monthlyVoiceCalls,
      monthlyDigitalClients,
      monthlyOutboundContacts,
      directAgentVoiceCalls: positive("directAgentVoiceCalls"),
      directAgentDigitalClients: positive("directAgentDigitalClients"),
      humanAgentCount,
      voiceContainmentPercent: value("voiceContainmentPercent"),
      digitalDeflectionPercent: value("digitalDeflectionPercent"),
      outboundHandledPercent: value("outboundHandledPercent"),
      assistantVoiceCoveragePercent: value("assistantVoiceCoveragePercent"),
      assistantDigitalCoveragePercent: value("assistantDigitalCoveragePercent"),
      qmMirrorsAssistantCoverage: (inputs.humanAgentProduct ? inputs.humanAgentProduct.value : "bundle") === "bundle",
      aiAgentVoiceSeconds: positive("aiAgentVoiceMinutes"),
      aiAgentVoiceMinutes: secondsToMinutes(positive("aiAgentVoiceMinutes")),
      outboundAiSeconds: positive("outboundAiMinutes"),
      outboundAiMinutes: secondsToMinutes(positive("outboundAiMinutes")),
      humanAhtSeconds,
      humanAhtMinutes,
      aiHandledContacts,
      humanHandledContacts
    }
  }));
}

// ── Event wiring ────────────────────────────────────────────────
document.querySelectorAll("[data-sync-target]").forEach((input) => {
  input.addEventListener("input", syncControlPair);
});

Object.values(inputs).forEach((input) => {
  if (input) input.addEventListener("input", updateCalculator);
});

syncPairs.forEach(([first, second]) => {
  const secondary = document.getElementById(second);
  if (secondary && !inputs[second]) secondary.addEventListener("input", updateCalculator);
  setSyncedValue(first, document.getElementById(first)?.value ?? defaults[first]);
});

inputs.industryType.addEventListener("change", applyIndustryProfile);
inputs.agentMode.addEventListener("change", updateCalculator);
inputs.workforceModel.addEventListener("change", updateCalculator);

document.getElementById("calculatorForm").addEventListener("reset", () => {
  window.setTimeout(() => {
    syncPairs.forEach(([first]) => {
      setSyncedValue(first, document.getElementById(first)?.value ?? defaults[first]);
    });
    updateCalculator();
  }, 0);
});

updateCalculator();
