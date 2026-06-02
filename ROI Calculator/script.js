const STORAGE_KEY = "webexAiResourceEstimate";

const defaults = {
  marketBenchmark: "sg",
  totalAgents: 200,
  agentLoadedCost: 42000,
  turnoverRate: 35,
  hireTrainCost: 9200,
  rampMonths: 2,
  rampProductivity: 50,
  monthlyCallVolume: 320000,
  talkTimeMinutes: 360,
  acwMinutes: 60,
  scriptedIntentPercent: 70,
  autonomousIntentPercent: 30,
  agentMonthlyHours: 160,
  proactiveDigitalDeflection: 0,
  selfServiceContainment: 30,
  ahtReduction: 5,
  acwReduction: 10,
  fcrImprovement: 5,
  turnoverReduction: 0,
  assistantCoverage: 100,
  realizationFactor: 75,
  pricingTier: "retail",
  agentUnitRate: 100,
  assistantUnitRate: 30,
  qmUnitRate: 30,
  professionalServices: 300000,
  unitSource: "saved",
  manualAgentUnits: 165,
  manualAssistantUnits: 94,
  manualQmUnits: 46
};

const marketBenchmarks = {
  au: { label: "Australia", annualLoadedUsd: 53000 },
  nz: { label: "New Zealand", annualLoadedUsd: 50000 },
  sg: { label: "Singapore", annualLoadedUsd: 42000 },
  hk: { label: "Hong Kong", annualLoadedUsd: 36000 },
  in: { label: "India", annualLoadedUsd: 6500 },
  my: { label: "Malaysia", annualLoadedUsd: 9000 },
  th: { label: "Thailand", annualLoadedUsd: 14000 },
  id: { label: "Indonesia", annualLoadedUsd: 4500 },
  vn: { label: "Vietnam", annualLoadedUsd: 8500 },
  kr: { label: "South Korea", annualLoadedUsd: 18000 }
};

const inputs = Object.fromEntries(
  Object.keys(defaults).map((id) => [id, document.getElementById(id)])
);

const outputs = {
  resourceAgentUnits: document.getElementById("resourceAgentUnits"),
  resourceAssistantUnits: document.getElementById("resourceAssistantUnits"),
  resourceQmUnits: document.getElementById("resourceQmUnits"),
  resourceAgentVoiceSeconds: document.getElementById("resourceAgentVoiceSeconds"),
  resourceAgentDigitalSessions: document.getElementById("resourceAgentDigitalSessions"),
  resourceAgentOutboundSeconds: document.getElementById("resourceAgentOutboundSeconds"),
  resourceAssistantVoiceSeconds: document.getElementById("resourceAssistantVoiceSeconds"),
  resourceAssistantDigitalSessions: document.getElementById("resourceAssistantDigitalSessions"),
  resourceQmVoiceSeconds: document.getElementById("resourceQmVoiceSeconds"),
  resourceQmDigitalSessions: document.getElementById("resourceQmDigitalSessions"),
  carryVoiceCompletion: document.getElementById("carryVoiceCompletion"),
  carryDigitalCompletion: document.getElementById("carryDigitalCompletion"),
  carryScriptedUnits: document.getElementById("carryScriptedUnits"),
  carryAutonomousUnits: document.getElementById("carryAutonomousUnits"),
  derivedAhtReduction: document.getElementById("derivedAhtReduction"),
  derivedAcwReduction: document.getElementById("derivedAcwReduction"),
  derivedFcrImprovement: document.getElementById("derivedFcrImprovement"),
  derivedAbandonReduction: document.getElementById("derivedAbandonReduction"),
  derivedRealizationFactor: document.getElementById("derivedRealizationFactor"),
  benefitLogicText: document.getElementById("benefitLogicText"),
  handoffStatus: document.getElementById("handoffStatus"),
  roiPercent: document.getElementById("roiPercent"),
  paybackMonths: document.getElementById("paybackMonths"),
  netMonthlyImpact: document.getElementById("netMonthlyImpact"),
  annualNetBenefit: document.getElementById("annualNetBenefit"),
  monthlyDeflectionSavings: document.getElementById("monthlyDeflectionSavings"),
  monthlyAhtSavings: document.getElementById("monthlyAhtSavings"),
  monthlyFcrSavings: document.getElementById("monthlyFcrSavings"),
  monthlyAbandonSavings: document.getElementById("monthlyAbandonSavings"),
  monthlyWorkforceSavings: document.getElementById("monthlyWorkforceSavings"),
  grossMonthlyBenefit: document.getElementById("grossMonthlyBenefit"),
  agentLicenseCost: document.getElementById("agentLicenseCost"),
  assistantLicenseCost: document.getElementById("assistantLicenseCost"),
  qmLicenseCost: document.getElementById("qmLicenseCost"),
  monthlyLicenseCost: document.getElementById("monthlyLicenseCost"),
  contactsAvoided: document.getElementById("contactsAvoided"),
  hoursReleased: document.getElementById("hoursReleased"),
  fteReleased: document.getElementById("fteReleased"),
  humanAgentsRequired: document.getElementById("humanAgentsRequired"),
  humanAgentsRepurposed: document.getElementById("humanAgentsRepurposed"),
  annualGrossBenefit: document.getElementById("annualGrossBenefit"),
  agentUnitsUsed: document.getElementById("agentUnitsUsed"),
  assistantUnitsUsed: document.getElementById("assistantUnitsUsed"),
  qmUnitsUsed: document.getElementById("qmUnitsUsed"),
  unitBasisNote: document.getElementById("unitBasisNote"),
  summaryTitle: document.getElementById("summaryTitle"),
  summaryText: document.getElementById("summaryText"),
  valueLeverList: document.getElementById("valueLeverList"),
  nextActionList: document.getElementById("nextActionList"),
  reportMeta: document.getElementById("reportMeta")
};

const numberFormat = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const moneyFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  currencyDisplay: "code",
  maximumFractionDigits: 0
});

const syncPairs = [
  ["totalAgents", "totalAgentsSlider"],
  ["agentLoadedCost", "agentLoadedCostSlider"],
  ["turnoverRate", "turnoverRateSlider"],
  ["hireTrainCost", "hireTrainCostSlider"],
  ["rampMonths", "rampMonthsSlider"],
  ["rampProductivity", "rampProductivitySlider"],
  ["monthlyCallVolume", "monthlyCallVolumeSlider"],
  ["talkTimeMinutes", "talkTimeMinutesSlider"],
  ["acwMinutes", "acwMinutesSlider"],
  ["scriptedIntentPercent", "scriptedIntentPercentSlider"],
  ["autonomousIntentPercent", "autonomousIntentPercentSlider"],
  ["agentMonthlyHours", "agentMonthlyHoursSlider"],
  ["proactiveDigitalDeflection", "proactiveDigitalDeflectionSlider"],
  ["selfServiceContainment", "selfServiceContainmentSlider"],
  ["turnoverReduction", "turnoverReductionSlider"],
  ["assistantCoverage", "assistantCoverageSlider"],
  ["agentUnitRate", "agentUnitRateSlider"],
  ["assistantUnitRate", "assistantUnitRateSlider"],
  ["qmUnitRate", "qmUnitRateSlider"],
  ["professionalServices", "professionalServicesSlider"]
];

let savedEstimate = readSavedEstimate();

function readSavedEstimate() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
  } catch {
    return null;
  }
}

function positive(id) {
  return Math.max(0, Number(inputs[id]?.value ?? defaults[id] ?? 0));
}

function percent(id) {
  return positive(id) / 100;
}

function money(value) {
  return moneyFormat.format(Math.round(value || 0));
}

function months(value) {
  if (value <= 0) return "No payback";
  if (value < 1) return `${value.toFixed(1)} mo`;
  return `${numberFormat.format(value)} mo`;
}

function setList(list, items) {
  if (!list) return;
  list.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}

function setSyncedValue(id, value) {
  const input = document.getElementById(id);
  if (!input) return;
  input.value = value;
  const targetId = input.dataset.syncTarget;
  if (targetId) {
    const target = document.getElementById(targetId);
    if (target) target.value = value;
  }
}

function syncControlPair(event) {
  const target = document.getElementById(event.currentTarget.dataset.syncTarget);
  if (target) target.value = event.currentTarget.value;
  if (event.currentTarget.id === "agentLoadedCost" || event.currentTarget.id === "agentLoadedCostSlider") {
    if (inputs.marketBenchmark) inputs.marketBenchmark.value = "manual";
  }
  updateCalculator();
}

function applyMarketBenchmark() {
  const benchmark = marketBenchmarks[inputs.marketBenchmark?.value];
  if (!benchmark) return;
  setSyncedValue("agentLoadedCost", benchmark.annualLoadedUsd);
}

function getSavedUnits() {
  return {
    agent: Number(savedEstimate?.units?.agentTotalUnits || 0),
    assistant: Number(savedEstimate?.units?.assistantUnits || 0),
    qm: Number(savedEstimate?.units?.qmUnits || 0)
  };
}

function getSavedMetering() {
  const metering = savedEstimate?.metering || {};
  return {
    agentVoiceMinutes: Number(metering.agentVoiceMinutes ?? (Number(metering.agentVoiceSeconds || 0) / 60)),
    agentDigitalSessions: Number(metering.agentDigitalSessions || 0),
    agentOutboundMinutes: Number(metering.agentOutboundMinutes ?? (Number(metering.agentOutboundSeconds || 0) / 60)),
    assistantVoiceMinutes: Number(metering.assistantVoiceMinutes ?? (Number(metering.assistantVoiceSeconds || 0) / 60)),
    assistantDigitalSessions: Number(metering.assistantDigitalSessions || 0),
    qmVoiceMinutes: Number(metering.qmVoiceMinutes ?? (Number(metering.qmVoiceSeconds || 0) / 60)),
    qmDigitalSessions: Number(metering.qmDigitalSessions || 0)
  };
}

function getSavedAssumptions() {
  const assumptions = savedEstimate?.assumptions || {};
  const units = savedEstimate?.units || {};
  const channels = savedEstimate?.profile?.channels || [];
  const hasVoice = channels.includes("voice");
  const hasDigital = channels.includes("digital");
  return {
    voiceCompletion: hasVoice ? Number(assumptions.voiceContainmentPercent || 0) : null,
    digitalCompletion: hasDigital ? Number(assumptions.digitalDeflectionPercent || 0) : null,
    humanHandledContacts: Number(assumptions.humanHandledContacts || 0),
    scriptedUnits: Number(units.agentScriptedTotalUnits || 0),
    autonomousUnits: Number(units.agentAutonomousTotalUnits || 0)
  };
}

function renderResourceHandoff() {
  const units = getSavedUnits();
  const metering = getSavedMetering();
  outputs.resourceAgentUnits.textContent = numberFormat.format(units.agent);
  outputs.resourceAssistantUnits.textContent = numberFormat.format(units.assistant);
  outputs.resourceQmUnits.textContent = numberFormat.format(units.qm);
  const carry = getSavedAssumptions();
  outputs.resourceAgentVoiceSeconds.textContent = numberFormat.format(metering.agentVoiceMinutes);
  outputs.resourceAgentDigitalSessions.textContent = numberFormat.format(metering.agentDigitalSessions);
  outputs.resourceAgentOutboundSeconds.textContent = numberFormat.format(metering.agentOutboundMinutes);
  outputs.resourceAssistantVoiceSeconds.textContent = numberFormat.format(metering.assistantVoiceMinutes);
  outputs.resourceAssistantDigitalSessions.textContent = numberFormat.format(metering.assistantDigitalSessions);
  outputs.resourceQmVoiceSeconds.textContent = numberFormat.format(metering.qmVoiceMinutes);
  outputs.resourceQmDigitalSessions.textContent = numberFormat.format(metering.qmDigitalSessions);
  outputs.carryVoiceCompletion.textContent = carry.voiceCompletion === null ? "Not in scope" : `${numberFormat.format(carry.voiceCompletion)}%`;
  outputs.carryDigitalCompletion.textContent = carry.digitalCompletion === null ? "Not in scope" : `${numberFormat.format(carry.digitalCompletion)}%`;
  outputs.carryScriptedUnits.textContent = numberFormat.format(carry.scriptedUnits);
  outputs.carryAutonomousUnits.textContent = numberFormat.format(carry.autonomousUnits);

  if (savedEstimate) {
    const date = savedEstimate.generatedAt ? new Date(savedEstimate.generatedAt).toLocaleString() : "recently";
    const product = savedEstimate.profile?.humanAgentProduct || "bundle";
    outputs.handoffStatus.textContent = `Loaded saved Step 1 estimate from ${date}. Human-agent product mode: ${product}. Product units are separate and are not combined.`;
  } else {
    outputs.handoffStatus.textContent = "No saved AI Resource estimate found. Enter unit values below or open Step 1 first.";
  }
}

function selectedUnits() {
  if (inputs.unitSource.value === "saved" && savedEstimate) return getSavedUnits();
  return {
    agent: positive("manualAgentUnits"),
    assistant: positive("manualAssistantUnits"),
    qm: positive("manualQmUnits")
  };
}

function derivedBenefitAssumptions(units, carry) {
  const hasAssistant = units.assistant > 0;
  const hasQm = units.qm > 0;
  const hasAgent = units.agent > 0;
  const completionValues = [carry.voiceCompletion, carry.digitalCompletion].filter((value) => value !== null);
  const completion = completionValues.length ? Math.max(...completionValues) / 100 : 0;
  const assistantLift = hasAssistant ? 1 : 0;
  const qmLift = hasQm ? 1 : 0;
  return {
    ahtReduction: Math.min(0.15, (assistantLift * 0.08) + (qmLift * 0.02)),
    acwReduction: Math.min(0.25, (assistantLift * 0.15) + (qmLift * 0.05)),
    fcrImprovement: Math.min(0.08, (assistantLift * 0.02) + (qmLift * 0.03) + (completion * 0.02)),
    abandonReduction: Math.min(0.20, (completion * 0.12) + (assistantLift * 0.02)),
    realization: hasAgent || hasAssistant || hasQm ? Math.min(0.85, 0.60 + (completion * 0.25)) : 0
  };
}

function applySavedEstimate() {
  if (!savedEstimate) return;
  const assumptions = savedEstimate.assumptions || {};
  const units = getSavedUnits();
  if (assumptions.humanAgentCount) setSyncedValue("totalAgents", assumptions.humanAgentCount);
  if (assumptions.monthlyVoiceCalls) setSyncedValue("monthlyCallVolume", assumptions.monthlyVoiceCalls);
  if (assumptions.humanAhtSeconds) {
    setSyncedValue("talkTimeMinutes", assumptions.humanAhtSeconds);
  } else if (assumptions.humanAhtMinutes) {
    setSyncedValue("talkTimeMinutes", assumptions.humanAhtMinutes * 60);
  }
  if (assumptions.voiceContainmentPercent !== undefined) setSyncedValue("selfServiceContainment", assumptions.voiceContainmentPercent);
  if (assumptions.assistantVoiceCoveragePercent !== undefined) setSyncedValue("assistantCoverage", assumptions.assistantVoiceCoveragePercent);
  inputs.manualAgentUnits.value = units.agent;
  inputs.manualAssistantUnits.value = units.assistant;
  inputs.manualQmUnits.value = units.qm;
}

function updateCalculator() {
  const units = selectedUnits();
  renderResourceHandoff();

  const totalAgents = positive("totalAgents");
  const monthlyCallVolume = positive("monthlyCallVolume");
  const monthlyAgentCost = (totalAgents * positive("agentLoadedCost")) / 12;
  const savedAssumptions = getSavedAssumptions();
  const derived = derivedBenefitAssumptions(units, savedAssumptions);
  const realization = derived.realization;
  const humanAhtMinutes = positive("talkTimeMinutes") / 60;
  const acwMinutes = positive("acwMinutes") / 60;
  const handleMinutes = humanAhtMinutes + acwMinutes;
  const baselineHandleMinutes = (defaults.talkTimeMinutes + defaults.acwMinutes) / 60;
  const poolCostPerContact = monthlyCallVolume ? monthlyAgentCost / monthlyCallVolume : 0;
  const workloadAdjustedCostPerContact = poolCostPerContact * (handleMinutes / Math.max(1, baselineHandleMinutes));
  const hourlyAgentCost = monthlyAgentCost / Math.max(1, totalAgents * positive("agentMonthlyHours"));
  const completionRate = savedEstimate && inputs.unitSource.value === "saved" && savedAssumptions.voiceCompletion !== null
    ? savedAssumptions.voiceCompletion / 100
    : percent("selfServiceContainment");
  const proactiveAvoided = monthlyCallVolume * percent("proactiveDigitalDeflection");
  const remainingAfterProactive = Math.max(0, monthlyCallVolume - proactiveAvoided);
  const containedCalls = remainingAfterProactive * completionRate;
  const contactsAvoided = (proactiveAvoided + containedCalls) * realization;
  const deflectionSavings = contactsAvoided * workloadAdjustedCostPerContact;

  const humanHandledContacts = savedEstimate && inputs.unitSource.value === "saved" && savedAssumptions.humanHandledContacts
    ? savedAssumptions.humanHandledContacts
    : Math.max(0, remainingAfterProactive - containedCalls);
  const assistedContacts = humanHandledContacts * percent("assistantCoverage");
  const ahtMinutesSaved = assistedContacts * humanAhtMinutes * derived.ahtReduction * realization;
  const acwMinutesSaved = assistedContacts * acwMinutes * derived.acwReduction * realization;
  const assistedMinutesSaved = ahtMinutesSaved + acwMinutesSaved;
  const fcrContactsAvoided = monthlyCallVolume * derived.fcrImprovement * realization;
  const fcrSavings = fcrContactsAvoided * workloadAdjustedCostPerContact;
  const baselineAbandonRate = 0.05;
  const baselineAbandonedContacts = monthlyCallVolume * baselineAbandonRate;
  const abandonedCallsRecovered = baselineAbandonedContacts * derived.abandonReduction * realization;
  const abandonedSavings = abandonedCallsRecovered * workloadAdjustedCostPerContact * 0.5;
  const ahtSavings = (assistedMinutesSaved / 60) * hourlyAgentCost;

  const workforceSavings = 0;

  const grossMonthlyBenefit = deflectionSavings + ahtSavings + fcrSavings + abandonedSavings + workforceSavings;
  const agentLicenseCost = units.agent * positive("agentUnitRate");
  const assistantLicenseCost = units.assistant * positive("assistantUnitRate");
  const qmLicenseCost = units.qm * positive("qmUnitRate");
  const monthlyLicenseCost = agentLicenseCost + assistantLicenseCost + qmLicenseCost;
  const netMonthlyImpact = grossMonthlyBenefit - monthlyLicenseCost;
  const annualGrossBenefit = grossMonthlyBenefit * 12;
  const annualRunRateNetBenefit = netMonthlyImpact * 12;
  const annualInvestment = (monthlyLicenseCost * 12) + positive("professionalServices");
  const firstYearNetBenefit = annualRunRateNetBenefit - positive("professionalServices");
  const roi = annualInvestment ? (firstYearNetBenefit / annualInvestment) * 100 : 0;
  const paybackMonths = netMonthlyImpact > 0 ? positive("professionalServices") / netMonthlyImpact : 0;
  const hoursReleased = ((contactsAvoided * handleMinutes) + assistedMinutesSaved) / 60;
  const fteReleased = hoursReleased / Math.max(1, positive("agentMonthlyHours"));
  const humanAgentsRepurposed = Math.min(totalAgents, fteReleased);
  const humanAgentsRequired = Math.max(0, totalAgents - humanAgentsRepurposed);

  outputs.roiPercent.textContent = `${numberFormat.format(roi)}%`;
  outputs.paybackMonths.textContent = months(paybackMonths);
  outputs.netMonthlyImpact.textContent = money(netMonthlyImpact);
  outputs.annualNetBenefit.textContent = money(firstYearNetBenefit);
  outputs.monthlyDeflectionSavings.textContent = money(deflectionSavings);
  outputs.monthlyAhtSavings.textContent = money(ahtSavings);
  outputs.monthlyFcrSavings.textContent = money(fcrSavings);
  outputs.monthlyAbandonSavings.textContent = money(abandonedSavings);
  if (outputs.monthlyWorkforceSavings) outputs.monthlyWorkforceSavings.textContent = money(workforceSavings);
  outputs.grossMonthlyBenefit.textContent = money(grossMonthlyBenefit);
  outputs.agentLicenseCost.textContent = money(agentLicenseCost);
  outputs.assistantLicenseCost.textContent = money(assistantLicenseCost);
  outputs.qmLicenseCost.textContent = money(qmLicenseCost);
  outputs.monthlyLicenseCost.textContent = money(monthlyLicenseCost);
  outputs.contactsAvoided.textContent = numberFormat.format(contactsAvoided);
  outputs.hoursReleased.textContent = numberFormat.format(hoursReleased);
  if (outputs.fteReleased) outputs.fteReleased.textContent = numberFormat.format(fteReleased);
  outputs.humanAgentsRequired.textContent = numberFormat.format(humanAgentsRequired);
  outputs.humanAgentsRepurposed.textContent = numberFormat.format(humanAgentsRepurposed);
  if (outputs.annualGrossBenefit) outputs.annualGrossBenefit.textContent = money(annualGrossBenefit);
  outputs.agentUnitsUsed.textContent = numberFormat.format(units.agent);
  outputs.assistantUnitsUsed.textContent = numberFormat.format(units.assistant);
  outputs.qmUnitsUsed.textContent = numberFormat.format(units.qm);
  outputs.unitBasisNote.textContent = inputs.unitSource.value === "saved" && savedEstimate ? "Saved Step 1 values" : "Manual entry";
  outputs.derivedAhtReduction.textContent = `${numberFormat.format(derived.ahtReduction * 100)}%`;
  outputs.derivedAcwReduction.textContent = `${numberFormat.format(derived.acwReduction * 100)}%`;
  outputs.derivedFcrImprovement.textContent = `${numberFormat.format(derived.fcrImprovement * 100)}%`;
  outputs.derivedAbandonReduction.textContent = `${numberFormat.format(derived.abandonReduction * 100)}%`;
  outputs.derivedRealizationFactor.textContent = `${numberFormat.format(derived.realization * 100)}%`;
  outputs.benefitLogicText.textContent =
    `Logic: contact-based benefits use a workload-adjusted contact value: loaded agent cost per contact x ((AHT + ACW) / ${numberFormat.format(baselineHandleMinutes)} default handle minutes). AI Assistant savings use human-handled contacts x ((AHT minutes x AHT reduction) + (ACW minutes x ACW reduction)); AI QM adds FCR improvement through scoring, sentiment, coaching, and quality feedback; AI Agent completion reduces contacts reaching agents. Abandoned-call recovery uses a ${numberFormat.format(baselineAbandonRate * 100)}% baseline abandonment assumption. First-year ROI subtracts one-time professional services. Repurposed agents are capacity released by avoided contacts and shorter assisted interactions, not an assumed headcount reduction.`;

  outputs.summaryTitle.textContent = "ROI model summary";
  outputs.summaryText.textContent =
    `This model uses ${numberFormat.format(units.agent)} Webex AI Agent Unit(s), ${numberFormat.format(units.assistant)} Webex AI Assistant Unit(s), and ${numberFormat.format(units.qm)} Webex AI QM Unit(s). The Resource Calculator carries over ${numberFormat.format(savedAssumptions.scriptedUnits)} scripted and ${numberFormat.format(savedAssumptions.autonomousUnits)} autonomous AI Agent Unit(s), with ${numberFormat.format(completionRate * 100)}% voice completion by AI Agent and about ${numberFormat.format(humanHandledContacts)} contacts still reaching human agents. Benefits are modeled from higher FCR, reduced human AHT, lower ACW effort, lower abandoned-call risk, and fewer contacts reaching agents. The model shows ${numberFormat.format(humanAgentsRequired)} human agents still required and ${numberFormat.format(humanAgentsRepurposed)} agents of equivalent capacity available to repurpose, not an assumed headcount reduction. The current assumptions produce ${money(grossMonthlyBenefit)} in gross monthly benefit, ${money(monthlyLicenseCost)} in monthly license cost, ${money(netMonthlyImpact)} net monthly impact, and ${money(firstYearNetBenefit)} first-year net benefit after one-time professional services. Payback shows “No payback” when net monthly impact is negative.`;
  setList(outputs.valueLeverList, [
    `Contact-based benefits use a workload-adjusted value of about ${money(workloadAdjustedCostPerContact)} per contact.`,
    `FCR improvement reduces repeat demand by about ${numberFormat.format(fcrContactsAvoided)} contacts per month.`,
    `AHT and ACW improvements release about ${numberFormat.format(assistedMinutesSaved / 60)} agent hours per month across ${numberFormat.format(assistedContacts)} assisted human-handled contacts.`,
    `Abandoned-call reduction recovers about ${numberFormat.format(abandonedCallsRecovered)} contacts per month in this model.`,
    "AI Agent completion reduces contacts reaching human agents while preserving separate scripted and autonomous quantities."
  ]);
  setList(outputs.nextActionList, [
    "Validate the Step 1 unit quantities against the current scope.",
    "Replace loaded agent cost, monthly volume, and AHT with customer data.",
    "Keep AI Agent, AI Assistant, and AI QM pricing separate in commercial review."
  ]);
}

function printReport() {
  const dateStr = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  if (outputs.reportMeta) outputs.reportMeta.textContent = `Generated ${dateStr}`;
  window.print();
}

document.querySelectorAll("[data-sync-target]").forEach((input) => {
  input.addEventListener("input", syncControlPair);
});

Object.values(inputs).forEach((input) => {
  if (input) input.addEventListener("input", updateCalculator);
});

inputs.marketBenchmark?.addEventListener("change", () => {
  applyMarketBenchmark();
  updateCalculator();
});

document.getElementById("printReportButton")?.addEventListener("click", printReport);
document.getElementById("downloadReportButton")?.addEventListener("click", printReport);

document.getElementById("roiForm")?.addEventListener("reset", () => {
  setTimeout(() => {
    syncPairs.forEach(([first]) => setSyncedValue(first, defaults[first]));
    updateCalculator();
  }, 0);
});

syncPairs.forEach(([first]) => setSyncedValue(first, document.getElementById(first)?.value ?? defaults[first]));
applySavedEstimate();
updateCalculator();
