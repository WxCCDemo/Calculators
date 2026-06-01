const STORAGE_KEY = "webexAiResourceEstimate";

const defaults = {
  totalAgents: 200,
  agentLoadedCost: 36000,
  turnoverRate: 35,
  hireTrainCost: 9200,
  rampMonths: 2,
  rampProductivity: 50,
  monthlyCallVolume: 320000,
  talkTimeMinutes: 6,
  acwMinutes: 0,
  scriptedIntentPercent: 70,
  autonomousIntentPercent: 30,
  agentMonthlyHours: 160,
  proactiveDigitalDeflection: 0,
  selfServiceContainment: 30,
  ahtReduction: 5,
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

const inputs = Object.fromEntries(
  Object.keys(defaults).map((id) => [id, document.getElementById(id)])
);

const outputs = {
  resourceAgentUnits: document.getElementById("resourceAgentUnits"),
  resourceAssistantUnits: document.getElementById("resourceAssistantUnits"),
  resourceQmUnits: document.getElementById("resourceQmUnits"),
  resourceAgentVoiceMinutes: document.getElementById("resourceAgentVoiceMinutes"),
  resourceAgentDigitalSessions: document.getElementById("resourceAgentDigitalSessions"),
  resourceAgentOutboundMinutes: document.getElementById("resourceAgentOutboundMinutes"),
  resourceAssistantVoiceMinutes: document.getElementById("resourceAssistantVoiceMinutes"),
  resourceAssistantDigitalSessions: document.getElementById("resourceAssistantDigitalSessions"),
  resourceQmVoiceMinutes: document.getElementById("resourceQmVoiceMinutes"),
  resourceQmDigitalSessions: document.getElementById("resourceQmDigitalSessions"),
  handoffStatus: document.getElementById("handoffStatus"),
  roiPercent: document.getElementById("roiPercent"),
  paybackMonths: document.getElementById("paybackMonths"),
  netMonthlyImpact: document.getElementById("netMonthlyImpact"),
  annualNetBenefit: document.getElementById("annualNetBenefit"),
  monthlyDeflectionSavings: document.getElementById("monthlyDeflectionSavings"),
  monthlyAhtSavings: document.getElementById("monthlyAhtSavings"),
  monthlyWorkforceSavings: document.getElementById("monthlyWorkforceSavings"),
  grossMonthlyBenefit: document.getElementById("grossMonthlyBenefit"),
  agentLicenseCost: document.getElementById("agentLicenseCost"),
  assistantLicenseCost: document.getElementById("assistantLicenseCost"),
  qmLicenseCost: document.getElementById("qmLicenseCost"),
  monthlyLicenseCost: document.getElementById("monthlyLicenseCost"),
  contactsAvoided: document.getElementById("contactsAvoided"),
  hoursReleased: document.getElementById("hoursReleased"),
  fteReleased: document.getElementById("fteReleased"),
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
  ["ahtReduction", "ahtReductionSlider"],
  ["turnoverReduction", "turnoverReductionSlider"],
  ["assistantCoverage", "assistantCoverageSlider"],
  ["realizationFactor", "realizationFactorSlider"],
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
  updateCalculator();
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
    agentVoiceMinutes: Number(metering.agentVoiceMinutes || 0),
    agentDigitalSessions: Number(metering.agentDigitalSessions || 0),
    agentOutboundMinutes: Number(metering.agentOutboundMinutes || 0),
    assistantVoiceMinutes: Number(metering.assistantVoiceMinutes || 0),
    assistantDigitalSessions: Number(metering.assistantDigitalSessions || 0),
    qmVoiceMinutes: Number(metering.qmVoiceMinutes || 0),
    qmDigitalSessions: Number(metering.qmDigitalSessions || 0)
  };
}

function renderResourceHandoff() {
  const units = getSavedUnits();
  const metering = getSavedMetering();
  outputs.resourceAgentUnits.textContent = numberFormat.format(units.agent);
  outputs.resourceAssistantUnits.textContent = numberFormat.format(units.assistant);
  outputs.resourceQmUnits.textContent = numberFormat.format(units.qm);
  outputs.resourceAgentVoiceMinutes.textContent = numberFormat.format(metering.agentVoiceMinutes);
  outputs.resourceAgentDigitalSessions.textContent = numberFormat.format(metering.agentDigitalSessions);
  outputs.resourceAgentOutboundMinutes.textContent = numberFormat.format(metering.agentOutboundMinutes);
  outputs.resourceAssistantVoiceMinutes.textContent = numberFormat.format(metering.assistantVoiceMinutes);
  outputs.resourceAssistantDigitalSessions.textContent = numberFormat.format(metering.assistantDigitalSessions);
  outputs.resourceQmVoiceMinutes.textContent = numberFormat.format(metering.qmVoiceMinutes);
  outputs.resourceQmDigitalSessions.textContent = numberFormat.format(metering.qmDigitalSessions);

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

function applySavedEstimate() {
  if (!savedEstimate) return;
  const assumptions = savedEstimate.assumptions || {};
  const units = getSavedUnits();
  if (assumptions.humanAgentCount) setSyncedValue("totalAgents", assumptions.humanAgentCount);
  if (assumptions.monthlyVoiceCalls) setSyncedValue("monthlyCallVolume", assumptions.monthlyVoiceCalls);
  if (assumptions.humanAhtMinutes) setSyncedValue("talkTimeMinutes", assumptions.humanAhtMinutes);
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
  const costPerContact = monthlyCallVolume ? monthlyAgentCost / monthlyCallVolume : 0;
  const realization = percent("realizationFactor");
  const proactiveAvoided = monthlyCallVolume * percent("proactiveDigitalDeflection");
  const remainingAfterProactive = Math.max(0, monthlyCallVolume - proactiveAvoided);
  const containedCalls = remainingAfterProactive * percent("selfServiceContainment");
  const contactsAvoided = (proactiveAvoided + containedCalls) * realization;
  const deflectionSavings = contactsAvoided * costPerContact;

  const assistedContacts = Math.max(0, monthlyCallVolume - contactsAvoided) * percent("assistantCoverage");
  const handleMinutes = positive("talkTimeMinutes") + positive("acwMinutes");
  const ahtMinutesSaved = assistedContacts * handleMinutes * percent("ahtReduction") * realization;
  const ahtSavings = (ahtMinutesSaved / 60) * (monthlyAgentCost / Math.max(1, totalAgents * positive("agentMonthlyHours")));

  const workforceSavings = 0;

  const grossMonthlyBenefit = deflectionSavings + ahtSavings + workforceSavings;
  const agentLicenseCost = units.agent * positive("agentUnitRate");
  const assistantLicenseCost = units.assistant * positive("assistantUnitRate");
  const qmLicenseCost = units.qm * positive("qmUnitRate");
  const monthlyLicenseCost = agentLicenseCost + assistantLicenseCost + qmLicenseCost;
  const netMonthlyImpact = grossMonthlyBenefit - monthlyLicenseCost;
  const annualGrossBenefit = grossMonthlyBenefit * 12;
  const annualNetBenefit = netMonthlyImpact * 12;
  const annualInvestment = (monthlyLicenseCost * 12) + positive("professionalServices");
  const roi = annualInvestment ? (annualNetBenefit / annualInvestment) * 100 : 0;
  const paybackMonths = netMonthlyImpact > 0 ? positive("professionalServices") / netMonthlyImpact : 0;
  const hoursReleased = (contactsAvoided * handleMinutes + ahtMinutesSaved) / 60;
  const fteReleased = hoursReleased / Math.max(1, positive("agentMonthlyHours"));

  outputs.roiPercent.textContent = `${numberFormat.format(roi)}%`;
  outputs.paybackMonths.textContent = netMonthlyImpact > 0 ? `${numberFormat.format(paybackMonths)} mo` : "N/A";
  outputs.netMonthlyImpact.textContent = money(netMonthlyImpact);
  outputs.annualNetBenefit.textContent = money(annualNetBenefit);
  outputs.monthlyDeflectionSavings.textContent = money(deflectionSavings);
  outputs.monthlyAhtSavings.textContent = money(ahtSavings);
  outputs.monthlyWorkforceSavings.textContent = money(workforceSavings);
  outputs.grossMonthlyBenefit.textContent = money(grossMonthlyBenefit);
  outputs.agentLicenseCost.textContent = money(agentLicenseCost);
  outputs.assistantLicenseCost.textContent = money(assistantLicenseCost);
  outputs.qmLicenseCost.textContent = money(qmLicenseCost);
  outputs.monthlyLicenseCost.textContent = money(monthlyLicenseCost);
  outputs.contactsAvoided.textContent = numberFormat.format(contactsAvoided);
  outputs.hoursReleased.textContent = numberFormat.format(hoursReleased);
  outputs.fteReleased.textContent = numberFormat.format(fteReleased);
  outputs.annualGrossBenefit.textContent = money(annualGrossBenefit);
  outputs.agentUnitsUsed.textContent = numberFormat.format(units.agent);
  outputs.assistantUnitsUsed.textContent = numberFormat.format(units.assistant);
  outputs.qmUnitsUsed.textContent = numberFormat.format(units.qm);
  outputs.unitBasisNote.textContent = inputs.unitSource.value === "saved" && savedEstimate ? "Saved Step 1 values" : "Manual entry";

  outputs.summaryTitle.textContent = "ROI model summary";
  outputs.summaryText.textContent =
    `This model uses ${numberFormat.format(units.agent)} Webex AI Agent Unit(s), ${numberFormat.format(units.assistant)} Webex AI Assistant Unit(s), and ${numberFormat.format(units.qm)} Webex AI QM Unit(s). Product quantities remain separate. The current assumptions produce ${money(grossMonthlyBenefit)} in gross monthly benefit, ${money(monthlyLicenseCost)} in monthly license cost, and ${money(netMonthlyImpact)} net monthly impact.`;
  setList(outputs.valueLeverList, [
    "AI Agent completion reduces contacts reaching human agents.",
    "AI Assistant reduces handle time on remaining human interactions.",
    "Fully loaded agent cost converts avoided work into business value."
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
