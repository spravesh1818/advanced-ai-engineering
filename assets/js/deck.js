/* Advanced Generative AI: shared slide engine
   Keys:  Right / Space / PageDown = next (reveals steps first)   Left / PageUp = back
          Home / End = first / last     Mouse wheel: down = next, up = back     Q (or N) = likely questions + answers     F = fullscreen     T = light/dark theme
   Print: Ctrl+P -> Save as PDF (one slide per page, all steps visible) */
(function () {
  var stage = document.querySelector(".deck-stage");
  var slides = Array.prototype.slice.call(document.querySelectorAll(".slide"));
  var total = slides.length;
  var idx = 0;
  var stepIdx = 0;

  var counter = document.getElementById("counter");
  var progress = document.querySelector(".progress");
  var panel = document.getElementById("notes-panel");

  function pad(n) { return (n < 10 ? "0" : "") + n; }

  // theme: light (default) or dark. Press T. Remembered between visits; light is forced for print.
  var root = document.documentElement;
  function setTheme(t) {
    if (t === "dark") { root.setAttribute("data-theme", "dark"); } else { root.removeAttribute("data-theme"); }
    try { localStorage.setItem("deck-theme", t); } catch (e) {}
  }
  function toggleTheme() { setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark"); }
  try { if (localStorage.getItem("deck-theme") === "dark") setTheme("dark"); } catch (e) {}
  var wasDark = false;
  window.addEventListener("beforeprint", function () { wasDark = root.getAttribute("data-theme") === "dark"; root.removeAttribute("data-theme"); });
  window.addEventListener("afterprint", function () { if (wasDark) root.setAttribute("data-theme", "dark"); });

  // number every slide
  slides.forEach(function (s, i) {
    var el = s.querySelector(".slide-num");
    if (el) el.textContent = pad(i + 1) + " / " + pad(total);
  });

  function fit() {
    if (!window.innerWidth || !window.innerHeight) return; // hidden/zero-size window: keep last scale
    var s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    stage.style.transform = "scale(" + s + ")";
    stage.style.left = (window.innerWidth - 1920 * s) / 2 + "px";
    stage.style.top = (window.innerHeight - 1080 * s) / 2 + "px";
  }

  function steps() { return slides[idx].querySelectorAll(".step"); }

  function renderNotes() {
    var n = slides[idx].querySelector(".notes");
    panel.innerHTML = n ? n.innerHTML : "<i>No questions listed for this slide.</i>";
  }

  function show(i, fromEnd) {
    idx = Math.max(0, Math.min(total - 1, i));
    slides.forEach(function (s, k) { s.classList.toggle("active", k === idx); });
    var st = steps();
    stepIdx = fromEnd ? st.length : 0;
    Array.prototype.forEach.call(st, function (el, k) { el.classList.toggle("on", k < stepIdx); });
    counter.textContent = pad(idx + 1) + " / " + pad(total);
    progress.style.width = ((idx + 1) / total) * 100 + "%";
    renderNotes();
    try { history.replaceState(null, "", "#" + (idx + 1)); } catch (e) {}
  }

  function next() {
    var st = steps();
    if (stepIdx < st.length) { st[stepIdx].classList.add("on"); stepIdx++; }
    else if (idx < total - 1) show(idx + 1);
  }
  function prev() {
    var st = steps();
    if (stepIdx > 0) { stepIdx--; st[stepIdx].classList.remove("on"); }
    else if (idx > 0) show(idx - 1, true);
  }

  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    var k = e.key;
    if (k === "ArrowRight" || k === " " || k === "PageDown" || k === "Enter") { e.preventDefault(); next(); }
    else if (k === "ArrowLeft" || k === "PageUp" || k === "Backspace") { e.preventDefault(); prev(); }
    else if (k === "Home") { show(0); }
    else if (k === "End") { show(total - 1); }
    else if (k === "q" || k === "Q" || k === "n" || k === "N") { panel.classList.toggle("on"); }
    else if (k === "f" || k === "F") { toggleFullscreen(); }
    else if (k === "t" || k === "T") { toggleTheme(); }
  });

  document.querySelector(".deck-viewport").addEventListener("click", function (e) {
    if (e.target.closest(".deck-controls") || e.target.closest(".notes-panel")) return;
    next();
  });
  document.getElementById("btn-next").addEventListener("click", function (e) { e.stopPropagation(); next(); });
  document.getElementById("btn-prev").addEventListener("click", function (e) { e.stopPropagation(); prev(); });
  document.getElementById("btn-notes").addEventListener("click", function (e) { e.stopPropagation(); panel.classList.toggle("on"); });
  document.getElementById("btn-full").addEventListener("click", function (e) { e.stopPropagation(); toggleFullscreen(); });
  document.getElementById("btn-theme").addEventListener("click", function (e) { e.stopPropagation(); toggleTheme(); });

  function toggleFullscreen() {
    if (!document.fullscreenElement) { document.documentElement.requestFullscreen && document.documentElement.requestFullscreen(); }
    else { document.exitFullscreen && document.exitFullscreen(); }
  }

  // mouse wheel / trackpad: scroll down = next, scroll up = back (throttled so one gesture moves one step)
  var wheelLock = 0;
  document.addEventListener("wheel", function (e) {
    if (e.ctrlKey) return; // pinch-zoom
    if (e.target.closest && e.target.closest(".notes-panel")) return; // let the Q&A panel scroll itself
    e.preventDefault();
    var now = Date.now();
    if (now - wheelLock < 450 || Math.abs(e.deltaY) < 4) return;
    wheelLock = now;
    if (e.deltaY > 0) next(); else prev();
  }, { passive: false });

  // touch swipe
  var x0 = null;
  document.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  document.addEventListener("touchend", function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 60) { dx < 0 ? next() : prev(); }
    x0 = null;
  }, { passive: true });

  window.addEventListener("resize", fit);
  fit();
  var start = parseInt((location.hash || "").replace("#", ""), 10);
  show(isNaN(start) ? 0 : start - 1);
})();
