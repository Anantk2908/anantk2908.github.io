// The focus line. Each output starts out of focus, sharpens once as it
// scrolls into view, and can then be dragged or moved with the arrow keys.
(function () {
  var outs = document.querySelectorAll("[data-focus]");
  if (!outs.length) return;

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function set(el, value) {
    var v = Math.max(0, Math.min(100, value));
    el._p = v;
    el.style.setProperty("--p", v + "%");
    var slider = el._slider;
    slider.setAttribute("aria-valuenow", String(Math.round(v)));
    slider.setAttribute(
      "aria-valuetext",
      v >= 99.5 ? "In focus" : v <= 0.5 ? "Out of focus" : Math.round(v) + "% in focus"
    );
  }

  function animate(el, to) {
    cancelAnimationFrame(el._raf);
    if (reduce) return set(el, to);
    var from = el._p;
    var start = performance.now();
    var duration = 1100;
    function step(now) {
      var k = Math.min(1, (now - start) / duration);
      var eased = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
      set(el, from + (to - from) * eased);
      if (k < 1) el._raf = requestAnimationFrame(step);
    }
    el._raf = requestAnimationFrame(step);
  }

  var observer =
    !reduce && "IntersectionObserver" in window
      ? new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (!entry.isIntersecting) return;
              observer.unobserve(entry.target);
              if (!entry.target._touched) animate(entry.target, 100);
            });
          },
          { rootMargin: "0px 0px -22% 0px" }
        )
      : null;

  outs.forEach(function (el) {
    var slider = el.querySelector('[role="slider"]');
    var veil = el.querySelector(".veil");
    el._slider = slider;
    set(el, observer ? 0 : 100);
    if (observer) observer.observe(el);

    var dragging = false;

    slider.addEventListener("pointerdown", function (event) {
      dragging = true;
      el._touched = true;
      cancelAnimationFrame(el._raf);
      slider.setPointerCapture(event.pointerId);
      event.preventDefault();
      slider.focus({ preventScroll: true });
    });

    slider.addEventListener("pointermove", function (event) {
      if (!dragging) return;
      var rect = el.getBoundingClientRect();
      set(el, ((event.clientX - rect.left) / rect.width) * 100);
    });

    function stop() {
      dragging = false;
    }
    slider.addEventListener("pointerup", stop);
    slider.addEventListener("pointercancel", stop);

    slider.addEventListener("keydown", function (event) {
      var steps = {
        ArrowLeft: -5,
        ArrowDown: -5,
        ArrowRight: 5,
        ArrowUp: 5,
        PageDown: -20,
        PageUp: 20,
      };
      var next;
      if (event.key in steps) next = el._p + steps[event.key];
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = 100;
      else return;
      event.preventDefault();
      el._touched = true;
      cancelAnimationFrame(el._raf);
      set(el, next);
    });

    // Clicking the blurred part brings it into focus.
    if (veil) {
      veil.addEventListener("click", function () {
        el._touched = true;
        animate(el, 100);
      });
    }

    // Tabbing to a link inside a blurred output brings it into focus too.
    el.addEventListener("focusin", function (event) {
      if (event.target !== slider && el._p < 100) {
        el._touched = true;
        cancelAnimationFrame(el._raf);
        set(el, 100);
      }
    });
  });

  // Never leave anything blurred on paper.
  window.addEventListener("beforeprint", function () {
    outs.forEach(function (el) {
      cancelAnimationFrame(el._raf);
      set(el, 100);
    });
  });
})();
