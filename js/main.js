(function () {
  var C = window.SITE_CONFIG || {};
  var mq = function (q) { return window.matchMedia(q).matches; };
  var reduce = mq("(prefers-reduced-motion: reduce)");
  document.documentElement.classList.add("js");

  // Booking tiles (book.html)
  var tiles = document.getElementById("booking-tiles");
  if (tiles && C.booking) {
    tiles.innerHTML = C.booking.map(function (b, i) {
      return '<a class="tile reveal' + (i === 1 ? ' tile-feat' : '') + '" href="' + b.url + '" target="_blank" rel="noopener">' +
        '<span class="tile-min">' + b.minutes + ' min video call</span><span class="tile-price">' + b.price + '</span>' +
        '<span class="tile-title">' + b.title + '</span><span class="tile-desc">' + b.desc + '</span>' +
        '<span class="tile-cta">Pay &amp; book ' + b.minutes + ' minutes</span></a>';
    }).join("");
  }

  // Mobile menu with focus trap and Esc
  var btn = document.querySelector(".menu-btn"), nav = document.getElementById("menu");
  function setMenu(open) {
    btn.setAttribute("aria-expanded", String(open)); nav.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
    if (open) { var f = nav.querySelector("a,button"); if (f) f.focus(); } else { btn.focus(); }
  }
  btn.addEventListener("click", function () { setMenu(btn.getAttribute("aria-expanded") !== "true"); });
  document.addEventListener("keydown", function (e) {
    var open = btn.getAttribute("aria-expanded") === "true";
    if (e.key === "Escape") {
      if (open) setMenu(false);
      document.querySelectorAll(".dd.open").forEach(function (d) { d.classList.remove("open"); d.querySelector(".dd-btn").setAttribute("aria-expanded", "false"); });
    }
    if (e.key === "Tab" && open) {
      var f = Array.prototype.filter.call(nav.querySelectorAll("a,button"), function (el) { return el.offsetParent !== null; });
      f.unshift(btn);
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  window.addEventListener("resize", function () { if (!mq("(max-width: 1240px)") && nav.classList.contains("open")) { nav.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); document.body.style.overflow = ""; } });

  // Services dropdown
  document.querySelectorAll(".dd").forEach(function (d) {
    var b = d.querySelector(".dd-btn");
    b.addEventListener("click", function (e) { e.stopPropagation(); var o = !d.classList.contains("open"); d.classList.toggle("open", o); b.setAttribute("aria-expanded", String(o)); });
  });
  document.addEventListener("click", function (e) {
    document.querySelectorAll(".dd.open").forEach(function (d) { if (!d.contains(e.target)) { d.classList.remove("open"); d.querySelector(".dd-btn").setAttribute("aria-expanded", "false"); } });
  });

  // Header shadow
  var head = document.querySelector(".nav");
  var onScroll = function () { head.classList.toggle("scrolled", window.scrollY > 8); };
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  // Home hero video
  var vid = document.querySelector(".hero-video");
  if (vid) {
    var saveData = navigator.connection && navigator.connection.saveData;
    if (reduce || saveData || !mq("(min-width: 768px)")) { vid.remove(); }
    else {
      [["mp4", "video/mp4"], ["webm", "video/webm"]].forEach(function (t) {
        var s = document.createElement("source"); s.src = vid.getAttribute("data-" + t[0]); s.type = t[1]; vid.appendChild(s);
      });
      vid.muted = true;
      vid.addEventListener("playing", function () { vid.classList.add("on"); }, { once: true });
      vid.load();
      var visible = true;
      var tryPlay = function () { if (visible && !document.hidden) { var p = vid.play(); if (p && p.catch) p.catch(function () {}); } else { vid.pause(); } };
      if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; tryPlay(); }).observe(vid.closest(".hero"));
      document.addEventListener("visibilitychange", tryPlay);
      tryPlay();
    }
  }

  // Counters
  var nums = document.querySelectorAll("[data-count]");
  function count(el) {
    var end = +el.getAttribute("data-count"), t0 = null;
    function step(ts) { if (!t0) t0 = ts; var p = Math.min((ts - t0) / 1200, 1); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); }
    requestAnimationFrame(step);
  }

  // Reveal
  var els = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    els.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); e.target.querySelectorAll("[data-count]").forEach(count); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  // Enquiry form (contact.html)
  var form = document.getElementById("enquiry-form");
  if (form) {
    var status = form.querySelector(".form-status");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { status.textContent = "Please add your name, a valid email and a short message."; form.reportValidity(); return; }
      if (form._gotcha.value) return;
      var d = new FormData(form);
      if (C.FORM_ENDPOINT) {
        status.textContent = "Sending...";
        fetch(C.FORM_ENDPOINT, { method: "POST", body: d, headers: { Accept: "application/json" } })
          .then(function (r) { if (!r.ok) throw 0; status.textContent = "Thank you. I will reply within two working days."; form.reset(); })
          .catch(function () { mailto(d); });
      } else { mailto(d); }
    });
    var mailto = function (d) {
      var body = "Name: " + d.get("name") + "\nEmail: " + d.get("email") + "\nBased in: " + d.get("location") + "\nDeal size: " + d.get("size") + "\n\n" + d.get("message");
      window.location.href = "mailto:" + C.FALLBACK_EMAIL + "?cc=" + encodeURIComponent(C.CC_EMAIL || "") + "&subject=" + encodeURIComponent("Enquiry from harishmanderna.com") + "&body=" + encodeURIComponent(body);
      status.textContent = "Opening your email app, addressed to " + C.FALLBACK_EMAIL + " and " + C.CC_EMAIL + ".";
    };
  }
  var yr = document.getElementById("yr"); if (yr) yr.textContent = new Date().getFullYear();
})();
