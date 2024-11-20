function hideTweetMetrics() {
	const tweetElements = document.querySelectorAll("article");

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

	const replyMetricWhenMediaOpen = document.querySelectorAll(
		'span[data-testid="app-text-transition-container"] > span > span',
	);

	if (replyMetricWhenMediaOpen) {
		replyMetricWhenMediaOpen.forEach((reply) => {
			reply.style.display = "none";
		});
	}
}

function hideSkeetMetrics() {
	const likeElements = document.querySelectorAll(
		'div[data-testid="likeCount"]',
	);
	const repostElements = document.querySelectorAll(
		'div[data-testid="repostCount"]',
	);
	const commentElements = document.querySelectorAll(
		'button[data-testid="replyBtn"] > div',
	);

	likeElements.forEach((skeet) => {
		skeet.style.display = "none";
	});
	repostElements.forEach((skeet) => {
		skeet.style.display = "none";
	});
	commentElements.forEach((skeet) => {
		skeet.style.display = "none";
	});
}

function hideMetricsOnTwitterBluesky() {
	if (window.location.href.startsWith("https://bsky.app/")) {
		hideSkeetMetrics();
	}

	if (window.location.href.startsWith("https://x.com/")) {
		hideTweetMetrics();
	}
}

hideMetricsOnTwitterBluesky()

// Listen for new tweets/skeets and hide their metrics
const observer = new MutationObserver(hideMetricsOnTwitterBluesky);
observer.observe(document.body, {
	childList: true,
	subtree: true,
	characterData: true,
});
