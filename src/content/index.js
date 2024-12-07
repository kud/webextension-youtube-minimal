document.documentElement.classList.add("YouTubeMinimal")

const hideExploreSection = (hide) => {
  const exploreSection = document.querySelector("ytd-guide-section-renderer")
  if (exploreSection) {
    exploreSection.style.display = hide ? "none" : ""
    console.debug(`Explore section visibility: ${hide ? "hidden" : "visible"}`)
  }
}

browser.storage.local.get("isExploreEnabled").then((result) => {
  const isExploreEnabled =
    result.isExploreEnabled !== undefined ? result.isExploreEnabled : true
  hideExploreSection(!isExploreEnabled)
})

browser.runtime.onMessage.addListener((message) => {
  if (message.action === "toggleExplore") {
    hideExploreSection(!message.enabled)
  }
})
