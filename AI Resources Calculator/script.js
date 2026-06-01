const industryProfiles = {
  financial: {
    label: "Financial services",
    voiceContainmentPercent: 58,
    digitalDeflectionPercent: 48,
    outboundHandledPercent: 38,
    aiAgentVoiceMinutes: 3.2,
    assistantVoiceCoveragePercent: 90,
    assistantDigitalCoveragePercent: 90,
    humanAhtMinutes: 7,
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
    voiceContainmentPercent: 62,
    digitalDeflectionPercent: 45,
    outboundHandledPercent: 55,
    aiAgentVoiceMinutes: 3.8,
    assistantVoiceCoveragePercent: 85,
    assistantDigitalCoveragePercent: 85,
    humanAhtMinutes: 8,
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
    voiceContainmentPercent: 55,
    digitalDeflectionPercent: 60,
    outboundHandledPercent: 50,
    aiAgentVoiceMinutes: 2.6,
    assistantVoiceCoveragePercent: 80,
    assistantDigitalCoveragePercent: 90,
    humanAhtMinutes: 5.5,
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
    voiceContainmentPercent: 45,
    digitalDeflectionPercent: 38,
    outboundHandledPercent: 35,
    aiAgentVoiceMinutes: 3.5,
    assistantVoiceCoveragePercent: 90,
    assistantDigitalCoveragePercent: 80,
    humanAhtMinutes: 7.5,
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
    voiceContainmentPercent: 52,
    digitalDeflectionPercent: 55,
    outboundHandledPercent: 45,
    aiAgentVoiceMinutes: 3,
    assistantVoiceCoveragePercent: 85,
    assistantDigitalCoveragePercent: 85,
    humanAhtMinutes: 6.5,
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
  public: {
    label: "Public sector",
    voiceContainmentPercent: 42,
    digitalDeflectionPercent: 40,
    outboundHandledPercent: 40,
    aiAgentVoiceMinutes: 3.4,
    assistantVoiceCoveragePercent: 90,
    assistantDigitalCoveragePercent: 80,
    humanAhtMinutes: 8,
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
    voiceContainmentPercent: 50,
    digitalDeflectionPercent: 45,
    outboundHandledPercent: 45,
    aiAgentVoiceMinutes: 3,
    assistantVoiceCoveragePercent: 85,
    assistantDigitalCoveragePercent: 85,
    humanAhtMinutes: 7,
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
  channelVoice: true,
  channelDigital: true,
  channelOutbound: false,
  monthlyVoiceCalls: 50000,
  monthlyDigitalClients: 12000,
  monthlyOutboundContacts: 10000,
  voiceContainmentPercent: 58,
  digitalDeflectionPercent: 48,
  outboundHandledPercent: 45,
  aiAgentVoiceMinutes: 3.2,
  outboundAiMinutes: 2.4,
  agentVoiceAutonomousPercent: 30,
  agentDigitalAutonomousPercent: 35,
  agentOutboundAutonomousPercent: 40,
  agentOutboundMessages: 10,
  assistantVoiceCoveragePercent: 90,
  humanAhtMinutes: 7,
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
  totalUnits: document.getElementById("totalUnits"),
  agentTotalUnits: document.getElementById("agentTotalUnits"),
  assistantUnits: document.getElementById("assistantUnits"),
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
  ["assistantVoiceCoveragePercent", "assistantVoiceCoveragePercentNumber"],
  ["humanAhtMinutes", "humanAhtMinutesSlider"],
  ["assistantDigitalCoveragePercent", "assistantDigitalCoveragePercentNumber"],
  ["assistantInboundMessages", "assistantInboundMessagesSlider"]
];

function value(id) {
  const parsed = Number.parseFloat(inputs[id].value);
  return Number.isFinite(parsed) ? parsed : defaults[id];
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

function percent(id) {
  return Math.min(Math.max(value(id), 0), 100) / 100;
}

function channelEnabled(channel) {
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

/* Hide/show channel-dependent fields */
function updateChannelVisibility() {
  ["voice", "digital", "outbound"].forEach((channel) => {
    document.querySelectorAll(`[data-channel="${channel}"]`).forEach((el) => {
      el.hidden = !channelEnabled(channel);
    });
  });
}

/* Hide/show assistant columns based on human agent type */
function updateWorkforceVisibility() {
  const model = inputs.workforceModel.value;
  document.querySelectorAll('[data-assistant-channel="voice"]').forEach((el) => {
    el.hidden = model === "digital";
  });
  document.querySelectorAll('[data-assistant-channel="digital"]').forEach((el) => {
    el.hidden = model === "voice";
  });
}

function messageSessions(clients, messagesPerClient) {
  return clients * Math.ceil(Math.max(1, messagesPerClient) / 10);
}

function units(amount, allowance) {
  return Math.ceil(amount / allowance);
}

function setBar(element, amount, max) {
  const width = max > 0 ? Math.min((amount / max) * 100, 100) : 0;
  element.style.width = `${width}%`;
}

function formatPercent(val) { return `${Math.round(val * 100)}%`; }

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
  [
    "voiceContainmentPercent",
    "digitalDeflectionPercent",
    "outboundHandledPercent",
    "aiAgentVoiceMinutes",
    "assistantVoiceCoveragePercent",
    "assistantDigitalCoveragePercent",
    "humanAhtMinutes"
  ].forEach((id) => setSyncedValue(id, profile[id]));
  updateCalculator();
}

function getAgentRates() {
  const mode = inputs.agentMode.value;
  if (mode === "scripted") {
    return { voiceAutonomousRate: 0, digitalAutonomousRate: 0, outboundAutonomousRate: 0 };
  }
  if (mode === "autonomous") {
    return { voiceAutonomousRate: 1, digitalAutonomousRate: 1, outboundAutonomousRate: 1 };
  }
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
    outputs.agentModeRecommendation.textContent =
      "Scripted mode is best for deterministic journeys such as status lookup, payments, forms, and eligibility checks.";
  } else if (mode === "autonomous") {
    outputs.agentModeRecommendation.textContent =
      "Autonomous mode is best for natural-language troubleshooting, complex questions, and broader service navigation.";
  } else {
    outputs.agentModeRecommendation.textContent =
      "Use the division controls to decide how much work should be autonomous versus scripted.";
  }
}

function getWorkforceGuidance() {
  const model = inputs.workforceModel.value;
  if (model === "voice") {
    return {
      recommendation: "Voice-only agents need AI Assistant coverage for call summaries, real-time knowledge lookup, and guided responses during live calls.",
      summary: "The workforce is voice-only agents, so AI Assistant coverage applies to inbound and transferred voice calls only.",
      action: "Confirm voice AI Assistant rollout across all inbound queues"
    };
  }
  if (model === "digital") {
    return {
      recommendation: "Digital-only agents benefit from AI Assistant for suggested responses, case summaries, and real-time knowledge support across chat and messaging.",
      summary: "The workforce is digital-only agents, so AI Assistant coverage applies to digital interactions only.",
      action: "Confirm digital AI Assistant rollout for chat, messaging, and case handling"
    };
  }
  return {
    recommendation: "Blended agents handle both voice and digital — maintain consistent AI Assistant coverage and shared knowledge across all queue types.",
    summary: "The workforce is blended (voice and digital), so maintain consistent AI Assistant coverage and knowledge workflows across both channels.",
    action: "Validate one shared knowledge and summary workflow across voice and digital queues"
  };
}

function updateVerticalAlignment(profile) {
  const voiceContainment  = percent("voiceContainmentPercent");
  const digitalDeflection = percent("digitalDeflectionPercent");
  const outboundHandled   = percent("outboundHandledPercent");
  outputs.verticalTitle.textContent            = `${profile.label} operating guide`;
  outputs.verticalVoiceContainment.textContent  = formatPercent(voiceContainment);
  outputs.verticalDigitalDeflection.textContent = formatPercent(digitalDeflection);
  outputs.verticalOutboundHandled.textContent   = formatPercent(outboundHandled);
  outputs.verticalGuidance.textContent          = profile.verticalGuidance;
  setReferenceOutcomes(profile);
}

function updateSummary(profile, totalUnits, agentTotalUnits, assistantUnits, aiHandledContacts, scriptedUnits, autonomousUnits) {
  const workforceGuidance = getWorkforceGuidance();
  const channels    = activeChannelLabels();
  const channelText = channels.length ? channels.join(", ") : "no active channels";
  outputs.summaryTitle.textContent = `${profile.label} use case plan`;
  outputs.summaryText.textContent  =
    `${profile.summary} ${workforceGuidance.summary} Active scope: ${channelText}. Current assumptions require ${numberFormat.format(totalUnits)} total units: ${numberFormat.format(agentTotalUnits)} AI Agent units (${numberFormat.format(scriptedUnits)} scripted, ${numberFormat.format(autonomousUnits)} autonomous) and ${numberFormat.format(assistantUnits)} AI Assistant units for ${numberFormat.format(aiHandledContacts)} AI-handled contacts.`;
  setList(outputs.useCaseList,    profile.useCases);
  setList(outputs.nextActionList, [...profile.nextActions, workforceGuidance.action]);
}

function updateUseCasePrioritisation(profile) {
  const guidance = priorityGuidance[inputs.industryType.value] || priorityGuidance.other;
  outputs.automateFirstText.textContent  = guidance.automate;
  outputs.assistEscalateText.textContent = guidance.assist;
  outputs.evaluateText.textContent       = guidance.evaluate;
  outputs.humanOnlyText.textContent      = guidance.human;

  const mode = inputs.agentMode.value;
  const modeQuestions =
    mode === "scripted"
      ? discoveryQuestions.scripted
      : mode === "autonomous"
        ? discoveryQuestions.autonomous
        : [
            "Which journeys need strict scripted control?",
            "Which journeys benefit from autonomous knowledge retrieval?",
            "What split should be used for the first deployment wave?"
          ];

  outputs.discoveryTitle.textContent = `${profile.label} discovery questions`;
  setList(outputs.voiceDiscoveryList,    discoveryQuestions.voice);
  setList(outputs.digitalDiscoveryList,  discoveryQuestions.digital);
  setList(outputs.modeDiscoveryList,     modeQuestions);
  setList(outputs.outboundDiscoveryList, discoveryQuestions.outbound);
}

function updateCalculator() {
  const profile = industryProfiles[inputs.industryType.value] || industryProfiles.other;

  updateChannelVisibility();
  updateWorkforceVisibility();

  const hasVoice    = channelEnabled("voice");
  const hasDigital  = channelEnabled("digital");
  const hasOutbound = channelEnabled("outbound");

  /* Determine which assistant channels are active based on human agent type */
  const agentType = inputs.workforceModel.value;
  const assistantCoversVoice   = agentType !== "digital";
  const assistantCoversDigital = agentType !== "voice";

  const monthlyVoiceCalls       = hasVoice    ? positive("monthlyVoiceCalls")       : 0;
  const monthlyDigitalClients   = hasDigital  ? positive("monthlyDigitalClients")   : 0;
  const monthlyOutboundContacts = hasOutbound ? positive("monthlyOutboundContacts") : 0;

  const voiceContainmentRate  = percent("voiceContainmentPercent");
  const digitalDeflectionRate = percent("digitalDeflectionPercent");
  const outboundHandledRate   = percent("outboundHandledPercent");

  const { voiceAutonomousRate, digitalAutonomousRate, outboundAutonomousRate } = getAgentRates();

  const assistantVoiceCoverageRate   = percent("assistantVoiceCoveragePercent");
  const assistantDigitalCoverageRate = percent("assistantDigitalCoveragePercent");
  const aiAgentVoiceMinutesPerCall   = positive("aiAgentVoiceMinutes");
  const outboundAiMinutesPerContact  = positive("outboundAiMinutes");
  const humanAhtMinutes              = positive("humanAhtMinutes");

  /* AI Agent volumes */
  const voiceContainedCalls     = monthlyVoiceCalls * voiceContainmentRate;
  const voiceRemainingCalls     = monthlyVoiceCalls - voiceContainedCalls;
  const digitalDeflectedClients = monthlyDigitalClients * digitalDeflectionRate;
  const digitalRemainingClients = monthlyDigitalClients - digitalDeflectedClients;

  const agentVoiceMinutes           = voiceContainedCalls * aiAgentVoiceMinutesPerCall;
  const agentVoiceAutonomousMinutes = agentVoiceMinutes * voiceAutonomousRate;
  const agentVoiceScriptedMinutes   = agentVoiceMinutes - agentVoiceAutonomousMinutes;

  const agentDigitalSessions           = messageSessions(digitalDeflectedClients, positive("agentOutboundMessages"));
  const agentDigitalAutonomousSessions = agentDigitalSessions * digitalAutonomousRate;
  const agentDigitalScriptedSessions   = agentDigitalSessions - agentDigitalAutonomousSessions;

  const outboundHandledContacts        = monthlyOutboundContacts * outboundHandledRate;
  const agentOutboundMinutes           = outboundHandledContacts * outboundAiMinutesPerContact;
  const agentOutboundAutonomousMinutes = agentOutboundMinutes * outboundAutonomousRate;
  const agentOutboundScriptedMinutes   = agentOutboundMinutes - agentOutboundAutonomousMinutes;

  /* AI Assistant volumes — gated by human agent type */
  const assistantVoiceCalls      = (hasVoice   && assistantCoversVoice)   ? voiceRemainingCalls   * assistantVoiceCoverageRate   : 0;
  const assistantVoiceMinutes    = assistantVoiceCalls * humanAhtMinutes;
  const assistantDigitalClients  = (hasDigital && assistantCoversDigital) ? digitalRemainingClients * assistantDigitalCoverageRate : 0;
  const assistantDigitalSessions = messageSessions(assistantDigitalClients, positive("assistantInboundMessages"));

  /* Unit counts */
  const agentVoiceScriptedUnits     = units(agentVoiceScriptedMinutes,     1600);
  const agentVoiceAutonomousUnits   = units(agentVoiceAutonomousMinutes,    250);
  const agentDigitalScriptedUnits   = units(agentDigitalScriptedSessions,   4800);
  const agentDigitalAutonomousUnits = units(agentDigitalAutonomousSessions,  200);
  const agentOutboundScriptedUnits  = units(agentOutboundScriptedMinutes,   1600);
  const agentOutboundAutonomousUnits = units(agentOutboundAutonomousMinutes,  250);

  const agentTotalUnits =
    agentVoiceScriptedUnits + agentVoiceAutonomousUnits +
    agentDigitalScriptedUnits + agentDigitalAutonomousUnits +
    agentOutboundScriptedUnits + agentOutboundAutonomousUnits;

  const agentScriptedTotalUnits   = agentVoiceScriptedUnits   + agentDigitalScriptedUnits   + agentOutboundScriptedUnits;
  const agentAutonomousTotalUnits = agentVoiceAutonomousUnits + agentDigitalAutonomousUnits + agentOutboundAutonomousUnits;

  const assistantUnits  = Math.ceil((assistantVoiceMinutes / 1500) + (assistantDigitalSessions / 1000));
  const totalUnits      = agentTotalUnits + assistantUnits;
  const aiHandledContacts = voiceContainedCalls + digitalDeflectedClients + outboundHandledContacts;

  /* Update text recommendations */
  outputs.industryRecommendation.textContent       = profile.recommendation;
  outputs.workforceModelRecommendation.textContent = getWorkforceGuidance().recommendation;
  updateAgentModeUi();
  updateVerticalAlignment(profile);

  /* Update result numbers */
  outputs.totalUnits.textContent            = numberFormat.format(totalUnits);
  outputs.agentTotalUnits.textContent       = numberFormat.format(agentTotalUnits);
  outputs.assistantUnits.textContent        = numberFormat.format(assistantUnits);
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
    outputs.agentBifurcationNote.textContent =
      "Bifurcation is based on the selected division of labour between scripted and autonomous AI Agent work.";
  } else if (inputs.agentMode.value === "scripted") {
    outputs.agentBifurcationNote.textContent =
      "Scripted-only mode is selected, so all AI Agent units are allocated to scripted automation.";
  } else {
    outputs.agentBifurcationNote.textContent =
      "Autonomous-only mode is selected, so all AI Agent units are allocated to autonomous automation.";
  }

  outputs.voiceContainedCalls.textContent     = numberFormat.format(voiceContainedCalls);
  outputs.digitalDeflectedClients.textContent = numberFormat.format(digitalDeflectedClients);
  outputs.outboundHandledContacts.textContent = numberFormat.format(outboundHandledContacts);
  outputs.assistantVoiceCalls.textContent     = numberFormat.format(assistantVoiceCalls);
  outputs.assistantDigitalClients.textContent = numberFormat.format(assistantDigitalClients);
  outputs.agentVoiceMinutes.textContent       = numberFormat.format(agentVoiceMinutes);
  outputs.agentDigitalSessions.textContent    = numberFormat.format(agentDigitalSessions);
  outputs.agentOutboundMinutes.textContent    = numberFormat.format(agentOutboundMinutes);
  outputs.assistantVoiceMinutes.textContent   = numberFormat.format(assistantVoiceMinutes);
  outputs.assistantDigitalSessions.textContent = numberFormat.format(assistantDigitalSessions);

  const maxVolume = Math.max(
    voiceContainedCalls, digitalDeflectedClients, outboundHandledContacts,
    assistantVoiceCalls, assistantDigitalClients, 1
  );
  setBar(outputs.voiceContainedBar,   voiceContainedCalls,     maxVolume);
  setBar(outputs.digitalDeflectedBar, digitalDeflectedClients, maxVolume);
  setBar(outputs.outboundHandledBar,  outboundHandledContacts, maxVolume);
  setBar(outputs.assistantVoiceBar,   assistantVoiceCalls,     maxVolume);
  setBar(outputs.assistantDigitalBar, assistantDigitalClients, maxVolume);

  updateSummary(profile, totalUnits, agentTotalUnits, assistantUnits, aiHandledContacts, agentScriptedTotalUnits, agentAutonomousTotalUnits);
  updateUseCasePrioritisation(profile);
}

/* Wire up sync pairs */
document.querySelectorAll("[data-sync-target]").forEach((input) => {
  input.addEventListener("input", syncControlPair);
});

Object.values(inputs).forEach((input) => {
  if (input) input.addEventListener("input", updateCalculator);
});

syncPairs.forEach(([first, second]) => {
  const secondary = document.getElementById(second);
  if (secondary && !inputs[second]) {
    secondary.addEventListener("input", updateCalculator);
  }
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
