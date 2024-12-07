const featureIconContainer = document.querySelector(".js-MainCheckbox")
const exploreToggle = document.querySelector(".js-ExploreCheckbox")

const updateUI = (isEnabled) => {
  if (isEnabled) {
    featureIconContainer.classList.remove("PopupIcon--disabled")
    featureIconContainer.title = "Disable YouTube Minimal"
  } else {
    featureIconContainer.classList.add("PopupIcon--disabled")
    featureIconContainer.title = "Enable YouTube Minimal"
  }
}

const updateExploreUI = (isExploreEnabled) => {
  exploreToggle.checked = isExploreEnabled
}

browser.storage.local.get(["isEnabled", "isExploreEnabled"]).then((result) => {
  const isEnabled = result.isEnabled !== undefined ? result.isEnabled : true
  const isExploreEnabled =
    result.isExploreEnabled !== undefined ? result.isExploreEnabled : true
  updateUI(isEnabled)
  updateExploreUI(isExploreEnabled)
})

featureIconContainer.addEventListener("click", () => {
  browser.storage.local.get("isEnabled").then((result) => {
    const isEnabled = result.isEnabled !== undefined ? result.isEnabled : true
    const newIsEnabled = !isEnabled
    browser.runtime.sendMessage({
      action: "toggleFeature",
      enabled: newIsEnabled,
    })
    browser.storage.local.set({ isEnabled: newIsEnabled })
    updateUI(newIsEnabled)
  })
})

exploreToggle.addEventListener("change", () => {
  const isExploreEnabled = exploreToggle.checked
  browser.runtime.sendMessage({
    action: "toggleExplore",
    enabled: isExploreEnabled,
  })
  browser.storage.local.set({ isExploreEnabled })
})

browser.theme.getCurrent().then((theme) => {
  if (theme.colors) {
    document.body.style.backgroundColor = theme.colors.popup || "#fff"
    document.body.style.color = theme.colors.popup_text || "#000"
    const title = document.querySelector(".PopupTitle")
    title.style.color = theme.colors.popup_text || "#000"
  }
})
