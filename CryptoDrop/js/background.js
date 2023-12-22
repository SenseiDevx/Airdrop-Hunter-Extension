chrome.runtime.onInstalled.addListener(() => {
    chrome.declarativeNetRequest.setExtensionActionOptions({displayActionCountAsBadgeText: true});
});

async function updateStaticRules(enableRulesetIds, disableCandidateIds) {
    let options = {enableRulesetIds: enableRulesetIds, disableRulesetIds: disableCandidateIds};
    const enabledStaticCount = await chrome.declarativeNetRequest.getEnabledRulesets();
    const proposedCount = enableRulesetIds.length;
    if (
        enabledStaticCount + proposedCount >
        chrome.declarativeNetRequest.MAX_NUMBER_OF_ENABLED_STATIC_RULESETS
    ) {
        options.disableRulesetIds = disableCandidateIds;
    }
    await chrome.declarativeNetRequest.updateEnabledRulesets(options);
}

export async function getRulesEnabledState() {
    const enabledRuleSets = await chrome.declarativeNetRequest.getEnabledRulesets();
    return enabledRuleSets.length > 0;
}