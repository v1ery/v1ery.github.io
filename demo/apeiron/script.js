/* APEIRON - paginated section transitions */
// Paginated navigation keeps section transitions deterministic.

(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var html = document.documentElement;
  var body = document.body;
  var preloader = document.getElementById("preloader");
  var preloaderFill = document.getElementById("preloader-fill");
  var preloaderCount = document.getElementById("preloader-count");

  var SECTION_ORDER = ["hero", "quote-1", "manifesto", "quote-2", "quote-3", "colophon"];

  var COLOR_STOPS = {
    hero: { bg: "#E7E2D6", text: "#17140F" },
    "quote-1": { bg: "#E7E2D6", text: "#17140F" },
    manifesto: { bg: "#DCD6C7", text: "#17140F" },
    "quote-2": { bg: "#2F2019", text: "#E7E2D6" },
    "quote-3": { bg: "#F2E6CB", text: "#17140F" },
    colophon: { bg: "#E7E2D6", text: "#17140F" },
  };

  /* -------------------------------------------------------------
     PRELOADER - waits for every image + web font, then reveals.
     ------------------------------------------------------------- */
  var imgs = Array.prototype.slice.call(document.querySelectorAll("img"));
  var total = imgs.length || 1;
  var loadedCount = 0;

  function bump() {
    loadedCount++;
    var pct = Math.round((loadedCount / total) * 100);
    gsap.to(preloaderFill, { width: pct + "%", duration: 0.35, ease: "power1.out", overwrite: "auto" });
    preloaderCount.textContent = pct + "%";
    if (loadedCount >= total) settle();
  }

  var settled = false;
  function settle() {
    if (settled) return;
    settled = true;
    gsap.delayedCall(0.35, function () {
      var fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
      fontsReady.then(finishLoading);
    });
  }

  function finishLoading() {
    var tl = gsap.timeline({ onComplete: afterPreload });
    if (prefersReduced) {
      tl.to(preloader, { autoAlpha: 0, duration: 0.4 });
    } else {
      tl.to("#preloader-count", { opacity: 0, duration: 0.3 })
        .to(".preloader-word", { y: -18, opacity: 0, duration: 0.5, ease: "power2.in" }, "<")
        .to(preloader, { yPercent: -100, duration: 1, ease: "power4.inOut" }, "-=0.15");
    }
  }

  if (total === 0) {
    settle();
  } else {
    imgs.forEach(function (img) {
      if (img.complete) bump();
      else {
        img.addEventListener("load", bump, { once: true });
        img.addEventListener("error", bump, { once: true });
      }
    });
  }

  function afterPreload() {
    preloader.style.display = "none";
    body.classList.remove("is-loading");
    if (prefersReduced) {
      return;
    }
    html.classList.add("paginated");
    body.classList.add("paginated");
    startPaginatedExperience();
  }

  // GSAP timelines.
  var BUILDERS = {
    hero: function (tl, el) {
      var img = el.querySelector(".hero-image img");
      var img2 = el.querySelector(".hero-image");
      var textEls = el.querySelectorAll(".hero-text-top > *");
      var cue = el.querySelector(".hero-scroll .scroll-cue");

      tl.to(img, { scale: 1, opacity: 1, duration: 1.5, ease: "power4.out" })
        .to(textEls, { opacity: 1, y: 0, duration: 0.9, stagger: 0.16, ease: "power3.out" }, "-=0.65")
        .to(cue, { opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.3")
        .addLabel("settled")
        .to({}, { duration: 0.5 })
        .addLabel("exit")
        .to(textEls, { opacity: 0, x: -70, stagger: 0.05, duration: 1, ease: "power2.inOut" }, "exit")
        .to(cue, { opacity: 0, duration: 0.5, ease: "power2.inOut" }, "exit")
        .to(img, { opacity: 0, scale: .5, rotate: 90, xPercent: -20, duration: 1, ease: "power2.inOut" }, "+=0.15");
    },

    "quote-1": function (tl, el) {
      var img = el.querySelector(".quote-image img");
      var card = el.querySelector(".quote-card");

      gsap.set(img, { scale: 1.3, opacity: 0 });
      gsap.set(card, { opacity: 0, x: 70 });

      tl.to(img, { scale: 1, opacity: 1, duration: 1, ease: "power2.out" })
        .to(card, { opacity: 1, x: 0, duration: 0.9, ease: "power3.out" }, "-=0.55")
        .addLabel("settled")
        .to({}, { duration: 0.45 })
        .addLabel("exit")
        .to(card, { opacity: 0, x: -50, duration: 0.6, ease: "power2.inOut" }, "exit")
        .to(img, { scale: 1.18, opacity: 0, duration: 0.65, ease: "power2.inOut" }, "exit");
    },

    manifesto: function (tl, el) {
      var frame = el.querySelector(".manifesto-image");
      var img = frame.querySelector("img");
      var body_ = el.querySelector(".manifesto-body");

      gsap.set(frame, { clipPath: "inset(100% 0 0 0)", opacity: 1 });
      gsap.set(img, { scale: 1.15 });
      gsap.set(body_, { opacity: 0, y: 40 });

      tl.to(frame, { clipPath: "inset(0% 0 0 0)", duration: 1, ease: "power2.inOut" })
        .to(img, { scale: 1, duration: 1.1, ease: "power2.out" }, "<")
        .to(body_, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.35")
        .addLabel("settled")
        .to({}, { duration: 0.4 })
        .addLabel("exit")
        .to(body_, { opacity: 0, y: -30, duration: 0.55, ease: "power2.inOut" })
        .to(img, { scale: 1.1, duration: 0.6, ease: "power2.inOut" }, "-=0.35")
        .to(frame, { opacity: 0, duration: 0.6, ease: "power2.inOut" })
        .to(el, { backgroundColor: "#2F2019", duration: 0.7, ease: "power2.inOut" }, "exit");
    },

    "quote-2": function (tl, el) {
      var img = el.querySelector(".quote-split-image img");
      var textEls = el.querySelectorAll(".measure > *");

      gsap.set(img, { xPercent: 50, opacity: 0});
      gsap.set(textEls, { opacity: 0, y: 32 });

      tl.to(img, { xPercent: 0, opacity: 1, scale: 1, duration: 1.1, ease: "power2.out" })
        .to(textEls, { opacity: 1, y: 0, stagger: 0.16, duration: 0.8, ease: "power3.out" }, "-=0.15")
        .addLabel("settled")
        .to({}, { duration: 0.4 })
        .addLabel("exit")
        .to(textEls, { opacity: 0, y: -24, stagger: 0.1, duration: 0.55, ease: "power2.inOut" }, "exit")
        .to(img, { opacity: 0, scale: 1.15, duration: 0.65, ease: "power2.inOut" }, "exit")
        .to(el, { backgroundColor: "#F2E6CB", duration: 0.7, ease: "power2.inOut" }, "exit");
    },

    "quote-3": function (tl, el) {
      var frame = el.querySelector(".quote-pair-image");
      var img = frame.querySelector("img");
      var textEls = el.querySelectorAll(".measure > *");

      gsap.set(frame, { opacity: 0 });
      gsap.set(img, { clipPath: "inset(0 100% 0 0)", scale: 1.15 });
      gsap.set(textEls, { opacity: 0, x: 40 });

      tl.to(frame, { opacity: 1, duration: 0.7, ease: "power2.out" })
        .to(img, { clipPath: "inset(0 0% 0 0)", duration: 1, ease: "power2.inOut" })
        .to(img, { scale: 1, duration: 1.2, ease: "power2.out" }, "<")
        .to(textEls, { opacity: 1, x: 0, stagger: 0.16, duration: 0.8, ease: "power3.out" }, "-=0.44")
        .addLabel("settled")
        .to({}, { duration: 0.4 })
        .addLabel("exit")
        .to(textEls, { opacity: 0, x: -24, stagger: 0.1, duration: 0.55, ease: "power2.inOut" }, "exit")
        .to(frame, { opacity: 0, duration: 0.6, ease: "power2.inOut" }, "exit")
        .to(el, { backgroundColor: "#E7E2D6", duration: 0.7, ease: "power2.inOut" }, "exit");
    },

    colophon: function (tl, el) {
      var line = el.querySelector(".closing-line");
      var spans = el.querySelectorAll(".footer-row span");

      gsap.set(line, { opacity: 0, y: 30 });
      gsap.set(spans, { opacity: 0, y: 10 });

      tl.to(line, { opacity: 1, y: 0, duration: 1, ease: "power2.out" })
        .to(spans, { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: "power2.out" }, "-=0.6")
        .addLabel("settled")
        .to({}, { duration: 0.5 });
      // last page - no authored exit.
    },
  };

  /* =================================================================
     CONTROLLER
     ================================================================= */
  function startPaginatedExperience() {
    var sections = SECTION_ORDER.map(function (id) {
      var el = document.getElementById(id);
      var tl = gsap.timeline({ paused: true });
      BUILDERS[id](tl, el);
      return { id: id, el: el, tl: tl };
    });

    var currentIndex = 0;
    var isAnimating = true; // locked until hero's own intro settles

    var fill = document.getElementById("spine-fill");
    var marks = gsap.utils.toArray(".spine-mark");

    /* ---- initial paint: only hero visible ---- */
    sections.forEach(function (s, i) {
      s.el.style.zIndex = i === 0 ? 2 : 1;
      gsap.set(s.el, { autoAlpha: i === 0 ? 1 : 0 });
    });
    applyColor(COLOR_STOPS.hero, 0.01);
    updateSpine(0);

    tweenSection(sections[0].tl, sections[0].tl.labels.settled, function () {
      isAnimating = false;
    });

    /* ---- helpers ---- */
    function tweenSection(tl, targetTime, onComplete) {
      var dist = Math.max(Math.abs(targetTime - tl.time()), 0.3);
      tl.tweenTo(targetTime, { duration: dist, ease: "power2.inOut", onComplete: onComplete });
    }

    function applyColor(stop, duration) {
      gsap.to(body, {
        backgroundColor: stop.bg,
        color: stop.text,
        duration: duration === undefined ? 0.7 : duration,
        ease: "power2.out",
      });
    }

    function updateSpine(index) {
      var pct = (index / (sections.length - 1)) * 100;
      gsap.to(fill, { height: pct + "%", duration: 0.7, ease: "power2.inOut" });
      marks.forEach(function (m, idx) {
        m.classList.toggle("active", idx === index);
      });
    }

    function goTo(targetIndex) {
      targetIndex = Math.max(0, Math.min(sections.length - 1, targetIndex));
      if (targetIndex === currentIndex || isAnimating) return;
      isAnimating = true;

      var dir = targetIndex > currentIndex ? 1 : -1;

      for (var i = currentIndex + dir; i !== targetIndex; i += dir) {
        var mid = sections[i];
        mid.tl.progress(dir > 0 ? 1 : 0);
        gsap.set(mid.el, { autoAlpha: 0 });
        mid.el.style.zIndex = 1;
      }

      var outgoing = sections[currentIndex];
      var incoming = sections[targetIndex];

      applyColor(COLOR_STOPS[incoming.id]);
      updateSpine(targetIndex);

      outgoing.el.style.zIndex = 2;
      incoming.el.style.zIndex = 1;

      // Finish outgoing section before revealing the next one.
      tweenSection(outgoing.tl, dir > 0 ? outgoing.tl.duration() : 0, function () {
        gsap.set(outgoing.el, { autoAlpha: 0 });

        // Reveal and animate incoming section.
        incoming.el.style.zIndex = 2;
        gsap.set(incoming.el, { autoAlpha: 1 });

        tweenSection(incoming.tl, incoming.tl.labels.settled, function () {
          currentIndex = targetIndex;
          isAnimating = false;
        });
      });
    }

    /* ---- input: wheel ---- */
    var lastWheel = 0;
    var WHEEL_COOLDOWN = 950;
    function onWheel(e) {
      if (e.ctrlKey) return; // let pinch-zoom / ctrl+scroll zoom through
      e.preventDefault();
      var now = Date.now();
      if (isAnimating || now - lastWheel < WHEEL_COOLDOWN) return;
      if (Math.abs(e.deltaY) < 8) return;
      lastWheel = now;
      goTo(currentIndex + (e.deltaY > 0 ? 1 : -1));
    }
    window.addEventListener("wheel", onWheel, { passive: false });

    /* ---- input: touch swipe ---- */
    var touchStartY = null;
    function onTouchStart(e) {
      touchStartY = e.touches[0].clientY;
    }
    function onTouchMove(e) {
      e.preventDefault();
    }
    function onTouchEnd(e) {
      if (touchStartY === null || isAnimating) return;
      var dy = touchStartY - e.changedTouches[0].clientY;
      touchStartY = null;
      if (Math.abs(dy) < 42) return;
      goTo(currentIndex + (dy > 0 ? 1 : -1));
    }
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    /* ---- input: keyboard ---- */
    function onKey(e) {
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        goTo(currentIndex + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goTo(currentIndex - 1);
      }
    }
    window.addEventListener("keydown", onKey);

    /* ---- input: clickable spine waypoints ---- */
    marks.forEach(function (m, idx) {
      m.addEventListener("click", function () {
        goTo(idx);
      });
    });

    /* ---- decorative: subtle hero tilt on desktop pointer devices ---- */
    if (window.matchMedia("(min-width: 901px) and (hover: hover)").matches) {
      var heroSection = document.getElementById("hero");
      var heroImg = heroSection.querySelector(".hero-image img");
      heroSection.addEventListener("mousemove", function (e) {
        var r = heroSection.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(heroImg, {
          rotateY: px * 6,
          rotateX: -py * 6,
          transformPerspective: 800,
          duration: 0.6,
          ease: "power2.out",
        });
      });
      heroSection.addEventListener("mouseleave", function () {
        gsap.to(heroImg, { rotateY: 0, rotateX: 0, duration: 0.8, ease: "power3.out" });
      });
    }
  }
})();
