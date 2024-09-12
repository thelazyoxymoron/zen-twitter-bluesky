function hideTweetMetrics() {
	const tweetElements = document.querySelectorAll("article");

	// biome-ignore lint:not necessarily a bad thing
	tweetElements.forEach((tweet) => {
		const likesElement = tweet.querySelectorAll(
			'span[data-testid="app-text-transition-container"] > span > span',
		);

		const timelineElement = tweet.querySelector(
			'div[aria-label="Timeline: Trending now"]',
		);

		const relevantPeopleElement = tweet.querySelector(
			'aside[aria-label="Relevant people"]',
		);

		if (likesElement) {
			// biome-ignore lint:not necessarily a bad thing
			likesElement.forEach((like) => {
				like.style.display = "none";
			});
		}

		if (timelineElement) {
			timeline.style.display = "none";
		}

		if (relevantPeopleElement) {
			relevantPerson.style.display = "none";
		}
	});
}

hideTweetMetrics();

// Listen for new tweets and hide their metrics
const observer = new MutationObserver(hideTweetMetrics);
observer.observe(document.body, {
	childList: true,
	subtree: true,
	characterData: true,
});
