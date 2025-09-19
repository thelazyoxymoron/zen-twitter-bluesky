const SITE_CONFIGS = {
	"x.com": [
		// Like, Repost, View counts under a tweet
		'article span[data-testid="app-text-transition-container"] > span > span',

		// "Timeline: Trending now" sidebar module
		'div[aria-label="Timeline: Trending now"]',

		// "Relevant people" sidebar module
		'aside[aria-label="Relevant people"]',
	],
	"bsky.app": [
		// Like and repost counts in the feed
		'div[data-testid="likeCount"]',
		'div[data-testid="repostCount"]',

		// Reply count next to the reply button
		'button[data-testid="replyBtn"] > div',

		// Expanded counts when viewing a single post
		'div[data-testid="repostCount-expanded"] > span',
		'div[data-testid="likeCount-expanded"] > span',
		'div[data-testid="bookmarkCount-expanded"] > span',

		// Elements that may show animated like counts
		'div[aria-disabled="true"]',
	],
};

function hideElementsBySelector(selector) {
	const elements = document.querySelectorAll(selector);

	elements.forEach((element) => {
		if (element.style.display !== "none") {
			element.style.display = "none";
		}
	});
}

function hideAllMetrics() {
	const currentHostname = window.location.hostname;

	for (const siteHostname in SITE_CONFIGS) {
		if (currentHostname.includes(siteHostname)) {
			const selectorsToHide = SITE_CONFIGS[siteHostname];
			selectorsToHide.forEach(hideElementsBySelector);

			// Once the correct site is found and processed, break
			break;
		}
	}
}

hideAllMetrics();

// Listen for new tweets/skeets and hide their metrics
const observer = new MutationObserver(hideAllMetrics);
observer.observe(document.body, {
	childList: true,
	subtree: true,
	characterData: true,
});
