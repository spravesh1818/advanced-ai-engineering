/* Advgenai site pages: Colab links + the paper / chalkboard switch. */
(function () {
  // ---- the ONE place to change if your GitHub repository has a different name ----
  var CONFIG = { github: "spravesh1818/advanced-ai-engineering", branch: "main" };

  // every "Open in Colab" button carries data-colab="week-1/class-1.ipynb"; build its real link from CONFIG
  var links = document.querySelectorAll("a[data-colab]");
  for (var i = 0; i < links.length; i++) {
    links[i].href = "https://colab.research.google.com/github/" + CONFIG.github + "/blob/" +
                    CONFIG.branch + "/" + links[i].getAttribute("data-colab");
  }

  // ---- paper / chalkboard (remembered; shares its key with the slide decks) ----
  var root = document.documentElement;
  var button = document.getElementById("theme");
  function label() {
    if (button) { button.textContent = root.getAttribute("data-theme") === "dark" ? "☀ paper" : "☾ chalkboard"; }
  }
  function toggle() {
    var dark = root.getAttribute("data-theme") === "dark";
    if (dark) { root.removeAttribute("data-theme"); } else { root.setAttribute("data-theme", "dark"); }
    try { localStorage.setItem("deck-theme", dark ? "light" : "dark"); } catch (e) {}
    label();
  }
  if (button) { button.addEventListener("click", toggle); }
  label();
})();
