!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
      ? define(e)
      : ((t || self).Lenis = e());
})(this, function () {
  function t(t, e) {
    for (var i = 0; i < e.length; i++) {
      var o = e[i];
      ((o.enumerable = o.enumerable || !1),
        (o.configurable = !0),
        "value" in o && (o.writable = !0),
        Object.defineProperty(
          t,
          "symbol" ==
            typeof (n = (function (t, e) {
              if ("object" != typeof t || null === t) return t;
              var i = t[Symbol.toPrimitive];
              if (void 0 !== i) {
                var o = i.call(t, "string");
                if ("object" != typeof o) return o;
                throw new TypeError(
                  "@@toPrimitive must return a primitive value.",
                );
              }
              return String(t);
            })(o.key))
            ? n
            : String(n),
          o,
        ));
    }
    var n;
  }
  function e(e, i, o) {
    return (
      i && t(e.prototype, i),
      o && t(e, o),
      Object.defineProperty(e, "prototype", { writable: !1 }),
      e
    );
  }
  function i() {
    return (
      (i = Object.assign
        ? Object.assign.bind()
        : function (t) {
            for (var e = 1; e < arguments.length; e++) {
              var i = arguments[e];
              for (var o in i)
                Object.prototype.hasOwnProperty.call(i, o) && (t[o] = i[o]);
            }
            return t;
          }),
      i.apply(this, arguments)
    );
  }
  function o(t, e, i) {
    return Math.max(t, Math.min(e, i));
  }
  var n = /*#__PURE__*/ (function () {
      function t() {}
      var e = t.prototype;
      return (
        (e.advance = function (t) {
          var e, i, n, s;
          if (this.isRunning) {
            var r = !1;
            if (this.lerp)
              ((this.value =
                ((i = this.value),
                (n = this.to),
                (1 - (s = 1 - Math.exp(-60 * this.lerp * t))) * i + s * n)),
                Math.round(this.value) === this.to &&
                  ((this.value = this.to), (r = !0)));
            else {
              this.currentTime += t;
              var l = o(0, this.currentTime / this.duration, 1),
                h = (r = l >= 1) ? 1 : this.easing(l);
              this.value = this.from + (this.to - this.from) * h;
            }
            (null == (e = this.onUpdate) || e.call(this, this.value, r),
              r && this.stop());
          }
        }),
        (e.stop = function () {
          this.isRunning = !1;
        }),
        (e.fromTo = function (t, e, i) {
          var o = i.lerp,
            n = void 0 === o ? 0.1 : o,
            s = i.duration,
            r = void 0 === s ? 1 : s,
            l = i.easing,
            h =
              void 0 === l
                ? function (t) {
                    return t;
                  }
                : l,
            a = i.onStart,
            c = i.onUpdate;
          ((this.from = this.value = t),
            (this.to = e),
            (this.lerp = n),
            (this.duration = r),
            (this.easing = h),
            (this.currentTime = 0),
            (this.isRunning = !0),
            null == a || a(),
            (this.onUpdate = c));
        }),
        t
      );
    })(),
    s = /*#__PURE__*/ (function () {
      function t(t) {
        var e,
          i,
          o = this,
          n = void 0 === t ? {} : t,
          s = n.wrapper,
          r = n.content,
          l = n.autoResize,
          h = void 0 === l || l;
        if (
          ((this.resize = function () {
            (o.onWrapperResize(), o.onContentResize());
          }),
          (this.onWrapperResize = function () {
            o.wrapper === window
              ? ((o.width = window.innerWidth), (o.height = window.innerHeight))
              : ((o.width = o.wrapper.clientWidth),
                (o.height = o.wrapper.clientHeight));
          }),
          (this.onContentResize = function () {
            ((o.scrollHeight = o.content.scrollHeight),
              (o.scrollWidth = o.content.scrollWidth));
          }),
          (this.wrapper = s),
          (this.content = r),
          h)
        ) {
          var a =
            ((e = this.resize),
            function () {
              var t = arguments,
                o = this;
              (clearTimeout(i),
                (i = setTimeout(function () {
                  e.apply(o, t);
                }, 250)));
            });
          (this.wrapper !== window &&
            ((this.wrapperResizeObserver = new ResizeObserver(a)),
            this.wrapperResizeObserver.observe(this.wrapper)),
            (this.contentResizeObserver = new ResizeObserver(a)),
            this.contentResizeObserver.observe(this.content));
        }
        this.resize();
      }
      return (
        (t.prototype.destroy = function () {
          var t, e;
          (null == (t = this.wrapperResizeObserver) || t.disconnect(),
            null == (e = this.contentResizeObserver) || e.disconnect());
        }),
        e(t, [
          {
            key: "limit",
            get: function () {
              return {
                x: this.scrollWidth - this.width,
                y: this.scrollHeight - this.height,
              };
            },
          },
        ]),
        t
      );
    })(),
    r = /*#__PURE__*/ (function () {
      function t() {
        this.events = {};
      }
      var e = t.prototype;
      return (
        (e.emit = function (t) {
          for (var e = this.events[t] || [], i = 0, o = e.length; i < o; i++)
            e[i].apply(e, [].slice.call(arguments, 1));
        }),
        (e.on = function (t, e) {
          var i,
            o = this;
          return (
            (null == (i = this.events[t]) ? void 0 : i.push(e)) ||
              (this.events[t] = [e]),
            function () {
              var i;
              o.events[t] =
                null == (i = o.events[t])
                  ? void 0
                  : i.filter(function (t) {
                      return e !== t;
                    });
            }
          );
        }),
        (e.off = function (t, e) {
          var i;
          this.events[t] =
            null == (i = this.events[t])
              ? void 0
              : i.filter(function (t) {
                  return e !== t;
                });
        }),
        (e.destroy = function () {
          this.events = {};
        }),
        t
      );
    })(),
    l = /*#__PURE__*/ (function () {
      function t(t, e) {
        var i = this,
          n = e.wheelMultiplier,
          s = void 0 === n ? 1 : n,
          l = e.touchMultiplier,
          h = void 0 === l ? 2 : l,
          a = e.normalizeWheel,
          c = void 0 !== a && a;
        ((this.onTouchStart = function (t) {
          var e = t.targetTouches ? t.targetTouches[0] : t,
            o = e.clientY;
          ((i.touchStart.x = e.clientX),
            (i.touchStart.y = o),
            (i.lastDelta = { x: 0, y: 0 }));
        }),
          (this.onTouchMove = function (t) {
            var e = t.targetTouches ? t.targetTouches[0] : t,
              o = e.clientX,
              n = e.clientY,
              s = -(o - i.touchStart.x) * i.touchMultiplier,
              r = -(n - i.touchStart.y) * i.touchMultiplier;
            ((i.touchStart.x = o),
              (i.touchStart.y = n),
              (i.lastDelta = { x: s, y: r }),
              i.emitter.emit("scroll", { deltaX: s, deltaY: r, event: t }));
          }),
          (this.onTouchEnd = function (t) {
            i.emitter.emit("scroll", {
              deltaX: i.lastDelta.x,
              deltaY: i.lastDelta.y,
              event: t,
            });
          }),
          (this.onWheel = function (t) {
            var e = t.deltaX,
              n = t.deltaY;
            (i.normalizeWheel && ((e = o(-100, e, 100)), (n = o(-100, n, 100))),
              i.emitter.emit("scroll", {
                deltaX: (e *= i.wheelMultiplier),
                deltaY: (n *= i.wheelMultiplier),
                event: t,
              }));
          }),
          (this.element = t),
          (this.wheelMultiplier = s),
          (this.touchMultiplier = h),
          (this.normalizeWheel = c),
          (this.touchStart = { x: null, y: null }),
          (this.emitter = new r()),
          this.element.addEventListener("wheel", this.onWheel, { passive: !1 }),
          this.element.addEventListener("touchstart", this.onTouchStart, {
            passive: !1,
          }),
          this.element.addEventListener("touchmove", this.onTouchMove, {
            passive: !1,
          }),
          this.element.addEventListener("touchend", this.onTouchEnd, {
            passive: !1,
          }));
      }
      var e = t.prototype;
      return (
        (e.on = function (t, e) {
          return this.emitter.on(t, e);
        }),
        (e.destroy = function () {
          (this.emitter.destroy(),
            this.element.removeEventListener("wheel", this.onWheel, {
              passive: !1,
            }),
            this.element.removeEventListener("touchstart", this.onTouchStart, {
              passive: !1,
            }),
            this.element.removeEventListener("touchmove", this.onTouchMove, {
              passive: !1,
            }),
            this.element.removeEventListener("touchend", this.onTouchEnd, {
              passive: !1,
            }));
        }),
        t
      );
    })(); /*#__PURE__*/
  return (function () {
    function t(t) {
      var e = this,
        o = void 0 === t ? {} : t,
        h = o.wrapper,
        a = void 0 === h ? window : h,
        c = o.content,
        u = void 0 === c ? document.documentElement : c,
        p = o.wheelEventsTarget,
        d = void 0 === p ? a : p,
        v = o.eventsTarget,
        f = void 0 === v ? d : v,
        m = o.smoothWheel,
        g = void 0 === m || m,
        S = o.smoothTouch,
        y = void 0 !== S && S,
        w = o.syncTouch,
        T = void 0 !== w && w,
        b = o.syncTouchLerp,
        z = void 0 === b ? 0.1 : b,
        _ = o.__iosNoInertiaSyncTouchLerp,
        M = void 0 === _ ? 0.4 : _,
        L = o.touchInertiaMultiplier,
        E = void 0 === L ? 35 : L,
        k = o.duration,
        O = o.easing,
        R =
          void 0 === O
            ? function (t) {
                return Math.min(1, 1.001 - Math.pow(2, -10 * t));
              }
            : O,
        W = o.lerp,
        x = void 0 === W ? !k && 0.1 : W,
        C = o.infinite,
        H = void 0 !== C && C,
        N = o.orientation,
        j = void 0 === N ? "vertical" : N,
        A = o.gestureOrientation,
        X = void 0 === A ? "vertical" : A,
        Y = o.touchMultiplier,
        D = void 0 === Y ? 1 : Y,
        I = o.wheelMultiplier,
        P = void 0 === I ? 1 : I,
        U = o.normalizeWheel,
        V = void 0 !== U && U,
        q = o.autoResize,
        B = void 0 === q || q;
      ((this.onVirtualScroll = function (t) {
        var o = t.deltaX,
          n = t.deltaY,
          s = t.event;
        if (!s.ctrlKey) {
          var r = s.type.includes("touch"),
            l = s.type.includes("wheel");
          if (
            !(
              ("both" === e.options.gestureOrientation && 0 === o && 0 === n) ||
              ("vertical" === e.options.gestureOrientation && 0 === n) ||
              ("horizontal" === e.options.gestureOrientation && 0 === o) ||
              (r &&
                "vertical" === e.options.gestureOrientation &&
                0 === e.scroll &&
                !e.options.infinite &&
                n <= 0)
            )
          ) {
            var h = s.composedPath();
            if (
              !(h = h.slice(0, h.indexOf(e.rootElement))).find(function (t) {
                var e;
                return (
                  (null == t.hasAttribute
                    ? void 0
                    : t.hasAttribute("data-lenis-prevent")) ||
                  (r &&
                    (null == t.hasAttribute
                      ? void 0
                      : t.hasAttribute("data-lenis-prevent-touch"))) ||
                  (l &&
                    (null == t.hasAttribute
                      ? void 0
                      : t.hasAttribute("data-lenis-prevent-wheel"))) ||
                  (null == (e = t.classList) ? void 0 : e.contains("lenis"))
                );
              })
            )
              if (e.isStopped || e.isLocked) s.preventDefault();
              else {
                if (
                  ((e.isSmooth =
                    ((e.options.smoothTouch || e.options.syncTouch) && r) ||
                    (e.options.smoothWheel && l)),
                  !e.isSmooth)
                )
                  return ((e.isScrolling = !1), void e.animate.stop());
                s.preventDefault();
                var a = n;
                "both" === e.options.gestureOrientation
                  ? (a = Math.abs(n) > Math.abs(o) ? n : o)
                  : "horizontal" === e.options.gestureOrientation && (a = o);
                var c = r && e.options.syncTouch,
                  u = r && "touchend" === s.type && Math.abs(a) > 1;
                (u && (a = e.velocity * e.options.touchInertiaMultiplier),
                  e.scrollTo(
                    e.targetScroll + a,
                    i(
                      { programmatic: !1 },
                      c && {
                        lerp: u
                          ? e.syncTouchLerp
                          : e.options.__iosNoInertiaSyncTouchLerp,
                      },
                    ),
                  ));
              }
          }
        }
      }),
        (this.onNativeScroll = function () {
          if (!e.__preventNextScrollEvent && !e.isScrolling) {
            var t = e.animatedScroll;
            ((e.animatedScroll = e.targetScroll = e.actualScroll),
              (e.velocity = 0),
              (e.direction = Math.sign(e.animatedScroll - t)),
              e.emit());
          }
        }),
        (window.lenisVersion = "1.0.29"),
        (a !== document.documentElement && a !== document.body) || (a = window),
        (this.options = {
          wrapper: a,
          content: u,
          wheelEventsTarget: d,
          eventsTarget: f,
          smoothWheel: g,
          smoothTouch: y,
          syncTouch: T,
          syncTouchLerp: z,
          __iosNoInertiaSyncTouchLerp: M,
          touchInertiaMultiplier: E,
          duration: k,
          easing: R,
          lerp: x,
          infinite: H,
          gestureOrientation: X,
          orientation: j,
          touchMultiplier: D,
          wheelMultiplier: P,
          normalizeWheel: V,
          autoResize: B,
        }),
        (this.animate = new n()),
        (this.emitter = new r()),
        (this.dimensions = new s({ wrapper: a, content: u, autoResize: B })),
        this.toggleClass("lenis", !0),
        (this.velocity = 0),
        (this.isLocked = !1),
        (this.isStopped = !1),
        (this.isSmooth = T || g || y),
        (this.isScrolling = !1),
        (this.targetScroll = this.animatedScroll = this.actualScroll),
        this.options.wrapper.addEventListener("scroll", this.onNativeScroll, {
          passive: !1,
        }),
        (this.virtualScroll = new l(f, {
          touchMultiplier: D,
          wheelMultiplier: P,
          normalizeWheel: V,
        })),
        this.virtualScroll.on("scroll", this.onVirtualScroll));
    }
    var h = t.prototype;
    return (
      (h.destroy = function () {
        (this.emitter.destroy(),
          this.options.wrapper.removeEventListener(
            "scroll",
            this.onNativeScroll,
            { passive: !1 },
          ),
          this.virtualScroll.destroy(),
          this.dimensions.destroy(),
          this.toggleClass("lenis", !1),
          this.toggleClass("lenis-smooth", !1),
          this.toggleClass("lenis-scrolling", !1),
          this.toggleClass("lenis-stopped", !1),
          this.toggleClass("lenis-locked", !1));
      }),
      (h.on = function (t, e) {
        return this.emitter.on(t, e);
      }),
      (h.off = function (t, e) {
        return this.emitter.off(t, e);
      }),
      (h.setScroll = function (t) {
        this.isHorizontal
          ? (this.rootElement.scrollLeft = t)
          : (this.rootElement.scrollTop = t);
      }),
      (h.resize = function () {
        this.dimensions.resize();
      }),
      (h.emit = function () {
        this.emitter.emit("scroll", this);
      }),
      (h.reset = function () {
        ((this.isLocked = !1),
          (this.isScrolling = !1),
          (this.animatedScroll = this.targetScroll = this.actualScroll),
          (this.velocity = 0),
          this.animate.stop());
      }),
      (h.start = function () {
        ((this.isStopped = !1), this.reset());
      }),
      (h.stop = function () {
        ((this.isStopped = !0), this.animate.stop(), this.reset());
      }),
      (h.raf = function (t) {
        var e = t - (this.time || t);
        ((this.time = t), this.animate.advance(0.001 * e));
      }),
      (h.scrollTo = function (t, e) {
        var i = this,
          n = void 0 === e ? {} : e,
          s = n.offset,
          r = void 0 === s ? 0 : s,
          l = n.immediate,
          h = void 0 !== l && l,
          a = n.lock,
          c = void 0 !== a && a,
          u = n.duration,
          p = void 0 === u ? this.options.duration : u,
          d = n.easing,
          v = void 0 === d ? this.options.easing : d,
          f = n.lerp,
          m = void 0 === f ? !p && this.options.lerp : f,
          g = n.onComplete,
          S = void 0 === g ? null : g,
          y = n.force,
          w = n.programmatic,
          T = void 0 === w || w;
        if ((!this.isStopped && !this.isLocked) || (void 0 !== y && y)) {
          if (["top", "left", "start"].includes(t)) t = 0;
          else if (["bottom", "right", "end"].includes(t)) t = this.limit;
          else {
            var b, z;
            if (
              ("string" == typeof t
                ? (z = document.querySelector(t))
                : null != (b = t) && b.nodeType && (z = t),
              z)
            ) {
              if (this.options.wrapper !== window) {
                var _ = this.options.wrapper.getBoundingClientRect();
                r -= this.isHorizontal ? _.left : _.top;
              }
              var M = z.getBoundingClientRect();
              t = (this.isHorizontal ? M.left : M.top) + this.animatedScroll;
            }
          }
          if ("number" == typeof t) {
            if (
              ((t += r),
              (t = Math.round(t)),
              this.options.infinite
                ? T && (this.targetScroll = this.animatedScroll = this.scroll)
                : (t = o(0, t, this.limit)),
              h)
            )
              return (
                (this.animatedScroll = this.targetScroll = t),
                this.setScroll(this.scroll),
                this.reset(),
                void (null == S || S(this))
              );
            if (!T) {
              if (t === this.targetScroll) return;
              this.targetScroll = t;
            }
            this.animate.fromTo(this.animatedScroll, t, {
              duration: p,
              easing: v,
              lerp: m,
              onStart: function () {
                (c && (i.isLocked = !0), (i.isScrolling = !0));
              },
              onUpdate: function (t, e) {
                ((i.isScrolling = !0),
                  (i.velocity = t - i.animatedScroll),
                  (i.direction = Math.sign(i.velocity)),
                  (i.animatedScroll = t),
                  i.setScroll(i.scroll),
                  T && (i.targetScroll = t),
                  e || i.emit(),
                  e &&
                    (i.reset(),
                    i.emit(),
                    null == S || S(i),
                    (i.__preventNextScrollEvent = !0),
                    requestAnimationFrame(function () {
                      delete i.__preventNextScrollEvent;
                    })));
              },
            });
          }
        }
      }),
      (h.toggleClass = function (t, e) {
        (this.rootElement.classList.toggle(t, e),
          this.emitter.emit("className change", this));
      }),
      e(t, [
        {
          key: "rootElement",
          get: function () {
            return this.options.wrapper === window
              ? document.documentElement
              : this.options.wrapper;
          },
        },
        {
          key: "limit",
          get: function () {
            return this.dimensions.limit[this.isHorizontal ? "x" : "y"];
          },
        },
        {
          key: "isHorizontal",
          get: function () {
            return "horizontal" === this.options.orientation;
          },
        },
        {
          key: "actualScroll",
          get: function () {
            return this.isHorizontal
              ? this.rootElement.scrollLeft
              : this.rootElement.scrollTop;
          },
        },
        {
          key: "scroll",
          get: function () {
            return this.options.infinite
              ? ((this.animatedScroll % (t = this.limit)) + t) % t
              : this.animatedScroll;
            var t;
          },
        },
        {
          key: "progress",
          get: function () {
            return 0 === this.limit ? 1 : this.scroll / this.limit;
          },
        },
        {
          key: "isSmooth",
          get: function () {
            return this.__isSmooth;
          },
          set: function (t) {
            this.__isSmooth !== t &&
              ((this.__isSmooth = t), this.toggleClass("lenis-smooth", t));
          },
        },
        {
          key: "isScrolling",
          get: function () {
            return this.__isScrolling;
          },
          set: function (t) {
            this.__isScrolling !== t &&
              ((this.__isScrolling = t),
              this.toggleClass("lenis-scrolling", t));
          },
        },
        {
          key: "isStopped",
          get: function () {
            return this.__isStopped;
          },
          set: function (t) {
            this.__isStopped !== t &&
              ((this.__isStopped = t), this.toggleClass("lenis-stopped", t));
          },
        },
        {
          key: "isLocked",
          get: function () {
            return this.__isLocked;
          },
          set: function (t) {
            this.__isLocked !== t &&
              ((this.__isLocked = t), this.toggleClass("lenis-locked", t));
          },
        },
        {
          key: "className",
          get: function () {
            var t = "lenis";
            return (
              this.isStopped && (t += " lenis-stopped"),
              this.isLocked && (t += " lenis-locked"),
              this.isScrolling && (t += " lenis-scrolling"),
              this.isSmooth && (t += " lenis-smooth"),
              t
            );
          },
        },
      ]),
      t
    );
  })();
});

!(function (n, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
      ? define(e)
      : (n.anime = e());
})(this, function () {
  "use strict";
  var i = {
      update: null,
      begin: null,
      loopBegin: null,
      changeBegin: null,
      change: null,
      changeComplete: null,
      loopComplete: null,
      complete: null,
      loop: 1,
      direction: "normal",
      autoplay: !0,
      timelineOffset: 0,
    },
    M = {
      duration: 1e3,
      delay: 0,
      endDelay: 0,
      easing: "easeOutElastic(1, .5)",
      round: 0,
    },
    j = [
      "translateX",
      "translateY",
      "translateZ",
      "rotate",
      "rotateX",
      "rotateY",
      "rotateZ",
      "scale",
      "scaleX",
      "scaleY",
      "scaleZ",
      "skew",
      "skewX",
      "skewY",
      "perspective",
      "matrix",
      "matrix3d",
    ],
    l = { CSS: {}, springs: {} };
  function C(n, e, t) {
    return Math.min(Math.max(n, e), t);
  }
  function u(n, e) {
    return -1 < n.indexOf(e);
  }
  function o(n, e) {
    return n.apply(null, e);
  }
  var w = {
    arr: function (n) {
      return Array.isArray(n);
    },
    obj: function (n) {
      return u(Object.prototype.toString.call(n), "Object");
    },
    pth: function (n) {
      return w.obj(n) && n.hasOwnProperty("totalLength");
    },
    svg: function (n) {
      return n instanceof SVGElement;
    },
    inp: function (n) {
      return n instanceof HTMLInputElement;
    },
    dom: function (n) {
      return n.nodeType || w.svg(n);
    },
    str: function (n) {
      return "string" == typeof n;
    },
    fnc: function (n) {
      return "function" == typeof n;
    },
    und: function (n) {
      return void 0 === n;
    },
    nil: function (n) {
      return w.und(n) || null === n;
    },
    hex: function (n) {
      return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(n);
    },
    rgb: function (n) {
      return /^rgb/.test(n);
    },
    hsl: function (n) {
      return /^hsl/.test(n);
    },
    col: function (n) {
      return w.hex(n) || w.rgb(n) || w.hsl(n);
    },
    key: function (n) {
      return (
        !i.hasOwnProperty(n) &&
        !M.hasOwnProperty(n) &&
        "targets" !== n &&
        "keyframes" !== n
      );
    },
  };
  function d(n) {
    n = /\(([^)]+)\)/.exec(n);
    return n
      ? n[1].split(",").map(function (n) {
          return parseFloat(n);
        })
      : [];
  }
  function c(r, t) {
    var n = d(r),
      e = C(w.und(n[0]) ? 1 : n[0], 0.1, 100),
      a = C(w.und(n[1]) ? 100 : n[1], 0.1, 100),
      o = C(w.und(n[2]) ? 10 : n[2], 0.1, 100),
      n = C(w.und(n[3]) ? 0 : n[3], 0.1, 100),
      u = Math.sqrt(a / e),
      i = o / (2 * Math.sqrt(a * e)),
      c = i < 1 ? u * Math.sqrt(1 - i * i) : 0,
      s = i < 1 ? (i * u - n) / c : -n + u;
    function f(n) {
      var e = t ? (t * n) / 1e3 : n,
        e =
          i < 1
            ? Math.exp(-e * i * u) * (+Math.cos(c * e) + s * Math.sin(c * e))
            : (1 + s * e) * Math.exp(-e * u);
      return 0 === n || 1 === n ? n : 1 - e;
    }
    return t
      ? f
      : function () {
          var n = l.springs[r];
          if (n) return n;
          for (var e = 0, t = 0; ; )
            if (1 === f((e += 1 / 6))) {
              if (16 <= ++t) break;
            } else t = 0;
          return ((n = e * (1 / 6) * 1e3), (l.springs[r] = n));
        };
  }
  function q(e) {
    return (
      void 0 === e && (e = 10),
      function (n) {
        return Math.ceil(C(n, 1e-6, 1) * e) * (1 / e);
      }
    );
  }
  var H = function (b, e, M, t) {
    if (0 <= b && b <= 1 && 0 <= M && M <= 1) {
      var x = new Float32Array(11);
      if (b !== e || M !== t)
        for (var n = 0; n < 11; ++n) x[n] = k(0.1 * n, b, M);
      return function (n) {
        return (b === e && M === t) || 0 === n || 1 === n ? n : k(r(n), e, t);
      };
    }
    function r(n) {
      for (var e = 0, t = 1; 10 !== t && x[t] <= n; ++t) e += 0.1;
      var r = e + 0.1 * ((n - x[--t]) / (x[t + 1] - x[t])),
        a = O(r, b, M);
      if (0.001 <= a) {
        for (var o = n, u = r, i = b, c = M, s = 0; s < 4; ++s) {
          var f = O(u, i, c);
          if (0 === f) return u;
          u -= (k(u, i, c) - o) / f;
        }
        return u;
      }
      if (0 === a) return r;
      for (
        var l, d, p = n, h = e, g = e + 0.1, m = b, v = M, y = 0;
        0 < (l = k((d = h + (g - h) / 2), m, v) - p) ? (g = d) : (h = d),
          1e-7 < Math.abs(l) && ++y < 10;
      );
      return d;
    }
  };
  function r(n, e) {
    return 1 - 3 * e + 3 * n;
  }
  function k(n, e, t) {
    return ((r(e, t) * n + (3 * t - 6 * e)) * n + 3 * e) * n;
  }
  function O(n, e, t) {
    return 3 * r(e, t) * n * n + 2 * (3 * t - 6 * e) * n + 3 * e;
  }
  ((e = {
    linear: function () {
      return function (n) {
        return n;
      };
    },
  }),
    (t = {
      Sine: function () {
        return function (n) {
          return 1 - Math.cos((n * Math.PI) / 2);
        };
      },
      Expo: function () {
        return function (n) {
          return n ? Math.pow(2, 10 * n - 10) : 0;
        };
      },
      Circ: function () {
        return function (n) {
          return 1 - Math.sqrt(1 - n * n);
        };
      },
      Back: function () {
        return function (n) {
          return n * n * (3 * n - 2);
        };
      },
      Bounce: function () {
        return function (n) {
          for (var e, t = 4; n < ((e = Math.pow(2, --t)) - 1) / 11; );
          return (
            1 / Math.pow(4, 3 - t) - 7.5625 * Math.pow((3 * e - 2) / 22 - n, 2)
          );
        };
      },
      Elastic: function (n, e) {
        void 0 === e && (e = 0.5);
        var t = C((n = void 0 === n ? 1 : n), 1, 10),
          r = C(e, 0.1, 2);
        return function (n) {
          return 0 === n || 1 === n
            ? n
            : -t *
                Math.pow(2, 10 * (n - 1)) *
                Math.sin(
                  ((n - 1 - (r / (2 * Math.PI)) * Math.asin(1 / t)) *
                    (2 * Math.PI)) /
                    r,
                );
        };
      },
    }),
    ["Quad", "Cubic", "Quart", "Quint"].forEach(function (n, e) {
      t[n] = function () {
        return function (n) {
          return Math.pow(n, e + 2);
        };
      };
    }),
    Object.keys(t).forEach(function (n) {
      var r = t[n];
      ((e["easeIn" + n] = r),
        (e["easeOut" + n] = function (e, t) {
          return function (n) {
            return 1 - r(e, t)(1 - n);
          };
        }),
        (e["easeInOut" + n] = function (e, t) {
          return function (n) {
            return n < 0.5 ? r(e, t)(2 * n) / 2 : 1 - r(e, t)(-2 * n + 2) / 2;
          };
        }),
        (e["easeOutIn" + n] = function (e, t) {
          return function (n) {
            return n < 0.5
              ? (1 - r(e, t)(1 - 2 * n)) / 2
              : (r(e, t)(2 * n - 1) + 1) / 2;
          };
        }));
    }));
  var e,
    t,
    s = e;
  function P(n, e) {
    if (w.fnc(n)) return n;
    var t = n.split("(")[0],
      r = s[t],
      a = d(n);
    switch (t) {
      case "spring":
        return c(n, e);
      case "cubicBezier":
        return o(H, a);
      case "steps":
        return o(q, a);
      default:
        return o(r, a);
    }
  }
  function a(n) {
    try {
      return document.querySelectorAll(n);
    } catch (n) {}
  }
  function I(n, e) {
    for (
      var t,
        r = n.length,
        a = 2 <= arguments.length ? e : void 0,
        o = [],
        u = 0;
      u < r;
      u++
    )
      u in n && ((t = n[u]), e.call(a, t, u, n)) && o.push(t);
    return o;
  }
  function f(n) {
    return n.reduce(function (n, e) {
      return n.concat(w.arr(e) ? f(e) : e);
    }, []);
  }
  function p(n) {
    return w.arr(n)
      ? n
      : (n = w.str(n) ? a(n) || n : n) instanceof NodeList ||
          n instanceof HTMLCollection
        ? [].slice.call(n)
        : [n];
  }
  function h(n, e) {
    return n.some(function (n) {
      return n === e;
    });
  }
  function g(n) {
    var e,
      t = {};
    for (e in n) t[e] = n[e];
    return t;
  }
  function x(n, e) {
    var t,
      r = g(n);
    for (t in n) r[t] = (e.hasOwnProperty(t) ? e : n)[t];
    return r;
  }
  function D(n, e) {
    var t,
      r = g(n);
    for (t in e) r[t] = (w.und(n[t]) ? e : n)[t];
    return r;
  }
  function V(n) {
    var e, t, r, a, o, u, i;
    return w.rgb(n)
      ? (e = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec((t = n)))
        ? "rgba(" + e[1] + ",1)"
        : t
      : w.hex(n)
        ? ((e = (e = n).replace(
            /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
            function (n, e, t, r) {
              return e + e + t + t + r + r;
            },
          )),
          (e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e)),
          "rgba(" +
            parseInt(e[1], 16) +
            "," +
            parseInt(e[2], 16) +
            "," +
            parseInt(e[3], 16) +
            ",1)")
        : w.hsl(n)
          ? ((t =
              /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec((t = n)) ||
              /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(t)),
            (n = parseInt(t[1], 10) / 360),
            (u = parseInt(t[2], 10) / 100),
            (i = parseInt(t[3], 10) / 100),
            (t = t[4] || 1),
            0 == u
              ? (r = a = o = i)
              : ((r = c(
                  (u = 2 * i - (i = i < 0.5 ? i * (1 + u) : i + u - i * u)),
                  i,
                  n + 1 / 3,
                )),
                (a = c(u, i, n)),
                (o = c(u, i, n - 1 / 3))),
            "rgba(" + 255 * r + "," + 255 * a + "," + 255 * o + "," + t + ")")
          : void 0;
    function c(n, e, t) {
      return (
        t < 0 && (t += 1),
        1 < t && --t,
        t < 1 / 6
          ? n + 6 * (e - n) * t
          : t < 0.5
            ? e
            : t < 2 / 3
              ? n + (e - n) * (2 / 3 - t) * 6
              : n
      );
    }
  }
  function B(n) {
    n =
      /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(
        n,
      );
    if (n) return n[1];
  }
  function m(n, e) {
    return w.fnc(n) ? n(e.target, e.id, e.total) : n;
  }
  function v(n, e) {
    return n.getAttribute(e);
  }
  function y(n, e, t) {
    var r, a, o;
    return h([t, "deg", "rad", "turn"], B(e))
      ? e
      : ((r = l.CSS[e + t]),
        w.und(r)
          ? ((a = document.createElement(n.tagName)),
            (n =
              n.parentNode && n.parentNode !== document
                ? n.parentNode
                : document.body).appendChild(a),
            (a.style.position = "absolute"),
            (a.style.width = 100 + t),
            (o = 100 / a.offsetWidth),
            n.removeChild(a),
            (n = o * parseFloat(e)),
            (l.CSS[e + t] = n))
          : r);
  }
  function $(n, e, t) {
    var r;
    if (e in n.style)
      return (
        (r = e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()),
        (e = n.style[e] || getComputedStyle(n).getPropertyValue(r) || "0"),
        t ? y(n, e, t) : e
      );
  }
  function b(n, e) {
    return w.dom(n) && !w.inp(n) && (!w.nil(v(n, e)) || (w.svg(n) && n[e]))
      ? "attribute"
      : w.dom(n) && h(j, e)
        ? "transform"
        : w.dom(n) && "transform" !== e && $(n, e)
          ? "css"
          : null != n[e]
            ? "object"
            : void 0;
  }
  function W(n) {
    if (w.dom(n)) {
      for (
        var e,
          t = n.style.transform || "",
          r = /(\w+)\(([^)]*)\)/g,
          a = new Map();
        (e = r.exec(t));
      )
        a.set(e[1], e[2]);
      return a;
    }
  }
  function X(n, e, t, r) {
    var a = u(e, "scale")
        ? 1
        : 0 +
          (u((a = e), "translate") || "perspective" === a
            ? "px"
            : u(a, "rotate") || u(a, "skew")
              ? "deg"
              : void 0),
      o = W(n).get(e) || a;
    return (
      t && (t.transforms.list.set(e, o), (t.transforms.last = e)),
      r ? y(n, o, r) : o
    );
  }
  function T(n, e, t, r) {
    switch (b(n, e)) {
      case "transform":
        return X(n, e, r, t);
      case "css":
        return $(n, e, t);
      case "attribute":
        return v(n, e);
      default:
        return n[e] || 0;
    }
  }
  function E(n, e) {
    var t = /^(\*=|\+=|-=)/.exec(n);
    if (!t) return n;
    var r = B(n) || 0,
      a = parseFloat(e),
      o = parseFloat(n.replace(t[0], ""));
    switch (t[0][0]) {
      case "+":
        return a + o + r;
      case "-":
        return a - o + r;
      case "*":
        return a * o + r;
    }
  }
  function Y(n, e) {
    var t;
    return w.col(n)
      ? V(n)
      : /\s/g.test(n)
        ? n
        : ((t = (t = B(n)) ? n.substr(0, n.length - t.length) : n),
          e ? t + e : t);
  }
  function F(n, e) {
    return Math.sqrt(Math.pow(e.x - n.x, 2) + Math.pow(e.y - n.y, 2));
  }
  function Z(n) {
    for (var e, t = n.points, r = 0, a = 0; a < t.numberOfItems; a++) {
      var o = t.getItem(a);
      (0 < a && (r += F(e, o)), (e = o));
    }
    return r;
  }
  function G(n) {
    if (n.getTotalLength) return n.getTotalLength();
    switch (n.tagName.toLowerCase()) {
      case "circle":
        return 2 * Math.PI * v(n, "r");
      case "rect":
        return 2 * v((t = n), "width") + 2 * v(t, "height");
      case "line":
        return F(
          { x: v((t = n), "x1"), y: v(t, "y1") },
          { x: v(t, "x2"), y: v(t, "y2") },
        );
      case "polyline":
        return Z(n);
      case "polygon":
        return (
          (e = n.points),
          Z(n) + F(e.getItem(e.numberOfItems - 1), e.getItem(0))
        );
    }
    var e, t;
  }
  function Q(n, e) {
    var e = e || {},
      n =
        e.el ||
        (function (n) {
          for (var e = n.parentNode; w.svg(e) && w.svg(e.parentNode); )
            e = e.parentNode;
          return e;
        })(n),
      t = n.getBoundingClientRect(),
      r = v(n, "viewBox"),
      a = t.width,
      t = t.height,
      e = e.viewBox || (r ? r.split(" ") : [0, 0, a, t]);
    return {
      el: n,
      viewBox: e,
      x: +e[0],
      y: +e[1],
      w: a,
      h: t,
      vW: e[2],
      vH: e[3],
    };
  }
  function z(n, e) {
    var t = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g,
      r = Y(w.pth(n) ? n.totalLength : n, e) + "";
    return {
      original: r,
      numbers: r.match(t) ? r.match(t).map(Number) : [0],
      strings: w.str(n) || e ? r.split(t) : [],
    };
  }
  function A(n) {
    return I(n ? f(w.arr(n) ? n.map(p) : p(n)) : [], function (n, e, t) {
      return t.indexOf(n) === e;
    });
  }
  function _(n) {
    var t = A(n);
    return t.map(function (n, e) {
      return { target: n, id: e, total: t.length, transforms: { list: W(n) } };
    });
  }
  function R(e) {
    for (
      var t = I(
          f(
            e.map(function (n) {
              return Object.keys(n);
            }),
          ),
          function (n) {
            return w.key(n);
          },
        ).reduce(function (n, e) {
          return (n.indexOf(e) < 0 && n.push(e), n);
        }, []),
        a = {},
        n = 0;
      n < t.length;
      n++
    )
      !(function (n) {
        var r = t[n];
        a[r] = e.map(function (n) {
          var e,
            t = {};
          for (e in n) w.key(e) ? e == r && (t.value = n[e]) : (t[e] = n[e]);
          return t;
        });
      })(n);
    return a;
  }
  function J(n, e) {
    var t,
      r = [],
      a = e.keyframes;
    for (t in (e = a ? D(R(a), e) : e))
      w.key(t) &&
        r.push({
          name: t,
          tweens: (function (n, t) {
            var e,
              r = g(t),
              a =
                (/^spring/.test(r.easing) && (r.duration = c(r.easing)),
                w.arr(n) &&
                  (2 === (e = n.length) && !w.obj(n[0])
                    ? (n = { value: n })
                    : w.fnc(t.duration) || (r.duration = t.duration / e)),
                w.arr(n) ? n : [n]);
            return a
              .map(function (n, e) {
                n = w.obj(n) && !w.pth(n) ? n : { value: n };
                return (
                  w.und(n.delay) && (n.delay = e ? 0 : t.delay),
                  w.und(n.endDelay) &&
                    (n.endDelay = e === a.length - 1 ? t.endDelay : 0),
                  n
                );
              })
              .map(function (n) {
                return D(n, r);
              });
          })(e[t], n),
        });
    return r;
  }
  function K(i, c) {
    var s;
    return i.tweens.map(function (n) {
      var n = (function (n, e) {
          var t,
            r = {};
          for (t in n) {
            var a = m(n[t], e);
            (w.arr(a) &&
              1 ===
                (a = a.map(function (n) {
                  return m(n, e);
                })).length &&
              (a = a[0]),
              (r[t] = a));
          }
          return (
            (r.duration = parseFloat(r.duration)),
            (r.delay = parseFloat(r.delay)),
            r
          );
        })(n, c),
        e = n.value,
        t = w.arr(e) ? e[1] : e,
        r = B(t),
        a = T(c.target, i.name, r, c),
        o = s ? s.to.original : a,
        u = w.arr(e) ? e[0] : o,
        a = B(u) || B(a),
        r = r || a;
      return (
        w.und(t) && (t = o),
        (n.from = z(u, r)),
        (n.to = z(E(t, u), r)),
        (n.start = s ? s.end : 0),
        (n.end = n.start + n.delay + n.duration + n.endDelay),
        (n.easing = P(n.easing, n.duration)),
        (n.isPath = w.pth(e)),
        (n.isPathTargetInsideSVG = n.isPath && w.svg(c.target)),
        (n.isColor = w.col(n.from.original)),
        n.isColor && (n.round = 1),
        (s = n)
      );
    });
  }
  var U = {
    css: function (n, e, t) {
      return (n.style[e] = t);
    },
    attribute: function (n, e, t) {
      return n.setAttribute(e, t);
    },
    object: function (n, e, t) {
      return (n[e] = t);
    },
    transform: function (n, e, t, r, a) {
      var o;
      (r.list.set(e, t),
        (e !== r.last && !a) ||
          ((o = ""),
          r.list.forEach(function (n, e) {
            o += e + "(" + n + ") ";
          }),
          (n.style.transform = o)));
    },
  };
  function nn(n, u) {
    _(n).forEach(function (n) {
      for (var e in u) {
        var t = m(u[e], n),
          r = n.target,
          a = B(t),
          o = T(r, e, a, n),
          t = E(Y(t, a || B(o)), o),
          a = b(r, e);
        U[a](r, e, t, n.transforms, !0);
      }
    });
  }
  function en(n, e) {
    return I(
      f(
        n.map(function (o) {
          return e.map(function (n) {
            var e,
              t,
              r = o,
              a = b(r.target, n.name);
            if (a)
              return (
                (t = (e = K(n, r))[e.length - 1]),
                {
                  type: a,
                  property: n.name,
                  animatable: r,
                  tweens: e,
                  duration: t.end,
                  delay: e[0].delay,
                  endDelay: t.endDelay,
                }
              );
          });
        }),
      ),
      function (n) {
        return !w.und(n);
      },
    );
  }
  function tn(n, e) {
    function t(n) {
      return n.timelineOffset || 0;
    }
    var r = n.length,
      a = {};
    return (
      (a.duration = r
        ? Math.max.apply(
            Math,
            n.map(function (n) {
              return t(n) + n.duration;
            }),
          )
        : e.duration),
      (a.delay = r
        ? Math.min.apply(
            Math,
            n.map(function (n) {
              return t(n) + n.delay;
            }),
          )
        : e.delay),
      (a.endDelay = r
        ? a.duration -
          Math.max.apply(
            Math,
            n.map(function (n) {
              return t(n) + n.duration - n.endDelay;
            }),
          )
        : e.endDelay),
      a
    );
  }
  var rn = 0;
  var N,
    S = [],
    an =
      ("undefined" != typeof document &&
        document.addEventListener("visibilitychange", function () {
          L.suspendWhenDocumentHidden &&
            (n()
              ? (N = cancelAnimationFrame(N))
              : (S.forEach(function (n) {
                  return n._onDocumentVisibility();
                }),
                an()));
        }),
      function () {
        !(N || (n() && L.suspendWhenDocumentHidden)) &&
          0 < S.length &&
          (N = requestAnimationFrame(on));
      });
  function on(n) {
    for (var e = S.length, t = 0; t < e; ) {
      var r = S[t];
      r.paused ? (S.splice(t, 1), e--) : (r.tick(n), t++);
    }
    N = 0 < t ? requestAnimationFrame(on) : void 0;
  }
  function n() {
    return document && document.hidden;
  }
  function L(n) {
    var c,
      s = 0,
      f = 0,
      l = 0,
      d = 0,
      p = null;
    function h(n) {
      var e =
        window.Promise &&
        new Promise(function (n) {
          return (p = n);
        });
      return (n.finished = e);
    }
    ((e = x(i, (n = n = void 0 === n ? {} : n))),
      (t = J((r = x(M, n)), n)),
      (n = _(n.targets)),
      (r = tn((t = en(n, t)), r)),
      (a = rn),
      rn++);
    var e,
      t,
      r,
      a,
      k = D(e, {
        id: a,
        children: [],
        animatables: n,
        animations: t,
        duration: r.duration,
        delay: r.delay,
        endDelay: r.endDelay,
      });
    h(k);
    function g() {
      var n = k.direction;
      ("alternate" !== n &&
        (k.direction = "normal" !== n ? "normal" : "reverse"),
        (k.reversed = !k.reversed),
        c.forEach(function (n) {
          return (n.reversed = k.reversed);
        }));
    }
    function m(n) {
      return k.reversed ? k.duration - n : n;
    }
    function o() {
      ((s = 0), (f = m(k.currentTime) * (1 / L.speed)));
    }
    function v(n, e) {
      e && e.seek(n - e.timelineOffset);
    }
    function y(e) {
      for (var n = 0, t = k.animations, r = t.length; n < r; ) {
        for (
          var a = t[n],
            o = a.animatable,
            u = a.tweens,
            i = u.length - 1,
            c = u[i],
            i =
              (i &&
                (c =
                  I(u, function (n) {
                    return e < n.end;
                  })[0] || c),
              C(e - c.start - c.delay, 0, c.duration) / c.duration),
            s = isNaN(i) ? 1 : c.easing(i),
            f = c.to.strings,
            l = c.round,
            d = [],
            p = c.to.numbers.length,
            h = void 0,
            g = 0;
          g < p;
          g++
        ) {
          var m = void 0,
            v = c.to.numbers[g],
            y = c.from.numbers[g] || 0,
            m = c.isPath
              ? (function (e, t, n) {
                  function r(n) {
                    return e.el.getPointAtLength(
                      1 <= t + (n = void 0 === n ? 0 : n) ? t + n : 0,
                    );
                  }
                  var a = Q(e.el, e.svg),
                    o = r(),
                    u = r(-1),
                    i = r(1),
                    c = n ? 1 : a.w / a.vW,
                    s = n ? 1 : a.h / a.vH;
                  switch (e.property) {
                    case "x":
                      return (o.x - a.x) * c;
                    case "y":
                      return (o.y - a.y) * s;
                    case "angle":
                      return (180 * Math.atan2(i.y - u.y, i.x - u.x)) / Math.PI;
                  }
                })(c.value, s * v, c.isPathTargetInsideSVG)
              : y + s * (v - y);
          (!l || (c.isColor && 2 < g) || (m = Math.round(m * l) / l),
            d.push(m));
        }
        var b = f.length;
        if (b)
          for (var h = f[0], M = 0; M < b; M++) {
            f[M];
            var x = f[M + 1],
              w = d[M];
            isNaN(w) || (h += x ? w + x : w + " ");
          }
        else h = d[0];
        (U[a.type](o.target, a.property, h, o.transforms),
          (a.currentValue = h),
          n++);
      }
    }
    function b(n) {
      k[n] && !k.passThrough && k[n](k);
    }
    function u(n) {
      var e = k.duration,
        t = k.delay,
        r = e - k.endDelay,
        a = m(n);
      if (
        ((k.progress = C((a / e) * 100, 0, 100)),
        (k.reversePlayback = a < k.currentTime),
        c)
      ) {
        var o = a;
        if (k.reversePlayback) for (var u = d; u--; ) v(o, c[u]);
        else for (var i = 0; i < d; i++) v(o, c[i]);
      }
      (!k.began && 0 < k.currentTime && ((k.began = !0), b("begin")),
        !k.loopBegan &&
          0 < k.currentTime &&
          ((k.loopBegan = !0), b("loopBegin")),
        a <= t && 0 !== k.currentTime && y(0),
        ((r <= a && k.currentTime !== e) || !e) && y(e),
        t < a && a < r
          ? (k.changeBegan ||
              ((k.changeBegan = !0),
              (k.changeCompleted = !1),
              b("changeBegin")),
            b("change"),
            y(a))
          : k.changeBegan &&
            ((k.changeCompleted = !0),
            (k.changeBegan = !1),
            b("changeComplete")),
        (k.currentTime = C(a, 0, e)),
        k.began && b("update"),
        e <= n &&
          ((f = 0),
          k.remaining && !0 !== k.remaining && k.remaining--,
          k.remaining
            ? ((s = l),
              b("loopComplete"),
              (k.loopBegan = !1),
              "alternate" === k.direction && g())
            : ((k.paused = !0),
              k.completed ||
                ((k.completed = !0),
                b("loopComplete"),
                b("complete"),
                !k.passThrough && "Promise" in window && (p(), h(k))))));
    }
    return (
      (k.reset = function () {
        var n = k.direction;
        ((k.passThrough = !1),
          (k.currentTime = 0),
          (k.progress = 0),
          (k.paused = !0),
          (k.began = !1),
          (k.loopBegan = !1),
          (k.changeBegan = !1),
          (k.completed = !1),
          (k.changeCompleted = !1),
          (k.reversePlayback = !1),
          (k.reversed = "reverse" === n),
          (k.remaining = k.loop),
          (c = k.children));
        for (var e = (d = c.length); e--; ) k.children[e].reset();
        (((k.reversed && !0 !== k.loop) ||
          ("alternate" === n && 1 === k.loop)) &&
          k.remaining++,
          y(k.reversed ? k.duration : 0));
      }),
      (k._onDocumentVisibility = o),
      (k.set = function (n, e) {
        return (nn(n, e), k);
      }),
      (k.tick = function (n) {
        u(((l = n) + (f - (s = s || l))) * L.speed);
      }),
      (k.seek = function (n) {
        u(m(n));
      }),
      (k.pause = function () {
        ((k.paused = !0), o());
      }),
      (k.play = function () {
        k.paused &&
          (k.completed && k.reset(), (k.paused = !1), S.push(k), o(), an());
      }),
      (k.reverse = function () {
        (g(), (k.completed = !k.reversed), o());
      }),
      (k.restart = function () {
        (k.reset(), k.play());
      }),
      (k.remove = function (n) {
        cn(A(n), k);
      }),
      k.reset(),
      k.autoplay && k.play(),
      k
    );
  }
  function un(n, e) {
    for (var t = e.length; t--; )
      h(n, e[t].animatable.target) && e.splice(t, 1);
  }
  function cn(n, e) {
    var t = e.animations,
      r = e.children;
    un(n, t);
    for (var a = r.length; a--; ) {
      var o = r[a],
        u = o.animations;
      (un(n, u), u.length || o.children.length || r.splice(a, 1));
    }
    t.length || r.length || e.pause();
  }
  return (
    (L.version = "3.2.2"),
    (L.speed = 1),
    (L.suspendWhenDocumentHidden = !0),
    (L.running = S),
    (L.remove = function (n) {
      for (var e = A(n), t = S.length; t--; ) cn(e, S[t]);
    }),
    (L.get = T),
    (L.set = nn),
    (L.convertPx = y),
    (L.path = function (n, e) {
      var t = w.str(n) ? a(n)[0] : n,
        r = e || 100;
      return function (n) {
        return { property: n, el: t, svg: Q(t), totalLength: G(t) * (r / 100) };
      };
    }),
    (L.setDashoffset = function (n) {
      var e = G(n);
      return (n.setAttribute("stroke-dasharray", e), e);
    }),
    (L.stagger = function (n, e) {
      var i = (e = void 0 === e ? {} : e).direction || "normal",
        c = e.easing ? P(e.easing) : null,
        s = e.grid,
        f = e.axis,
        l = e.from || 0,
        d = "first" === l,
        p = "center" === l,
        h = "last" === l,
        g = w.arr(n),
        m = g ? parseFloat(n[0]) : parseFloat(n),
        v = g ? parseFloat(n[1]) : 0,
        y = B(g ? n[1] : n) || 0,
        b = e.start || 0 + (g ? m : 0),
        M = [],
        x = 0;
      return function (n, e, t) {
        if (
          (d && (l = 0), p && (l = (t - 1) / 2), h && (l = t - 1), !M.length)
        ) {
          for (var r, a, o, u = 0; u < t; u++)
            (s
              ? ((r = p ? (s[0] - 1) / 2 : l % s[0]),
                (a = p ? (s[1] - 1) / 2 : Math.floor(l / s[0])),
                (r = r - (u % s[0])),
                (a = a - Math.floor(u / s[0])),
                (o = Math.sqrt(r * r + a * a)),
                "x" === f && (o = -r),
                M.push((o = "y" === f ? -a : o)))
              : M.push(Math.abs(l - u)),
              (x = Math.max.apply(Math, M)));
          (c &&
            (M = M.map(function (n) {
              return c(n / x) * x;
            })),
            "reverse" === i &&
              (M = M.map(function (n) {
                return f ? (n < 0 ? -1 * n : -n) : Math.abs(x - n);
              })));
        }
        return b + (g ? (v - m) / x : m) * (Math.round(100 * M[e]) / 100) + y;
      };
    }),
    (L.timeline = function (u) {
      var i = L((u = void 0 === u ? {} : u));
      return (
        (i.duration = 0),
        (i.add = function (n, e) {
          var t = S.indexOf(i),
            r = i.children;
          function a(n) {
            n.passThrough = !0;
          }
          -1 < t && S.splice(t, 1);
          for (var o = 0; o < r.length; o++) a(r[o]);
          ((t = D(n, x(M, u))),
            (t.targets = t.targets || u.targets),
            (n = i.duration),
            (t.autoplay = !1),
            (t.direction = i.direction),
            (t.timelineOffset = w.und(e) ? n : E(e, n)),
            a(i),
            i.seek(t.timelineOffset),
            (e = L(t)),
            a(e),
            r.push(e),
            (n = tn(r, u)));
          return (
            (i.delay = n.delay),
            (i.endDelay = n.endDelay),
            (i.duration = n.duration),
            i.seek(0),
            i.reset(),
            i.autoplay && i.play(),
            i
          );
        }),
        i
      );
    }),
    (L.easing = P),
    (L.penner = s),
    (L.random = function (n, e) {
      return Math.floor(Math.random() * (e - n + 1)) + n;
    }),
    L
  );
});
/*!
 * GSAP 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license.
 * @author: Jack Doyle, jack@greensock.com
 */
!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? e(exports)
    : "function" == typeof define && define.amd
      ? define(["exports"], e)
      : e(((t = t || self).window = t.window || {}));
})(this, function (e) {
  "use strict";
  function _inheritsLoose(t, e) {
    ((t.prototype = Object.create(e.prototype)),
      ((t.prototype.constructor = t).__proto__ = e));
  }
  function _assertThisInitialized(t) {
    if (void 0 === t)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called",
      );
    return t;
  }
  function r(t) {
    return "string" == typeof t;
  }
  function s(t) {
    return "function" == typeof t;
  }
  function t(t) {
    return "number" == typeof t;
  }
  function u(t) {
    return void 0 === t;
  }
  function v(t) {
    return "object" == typeof t;
  }
  function w(t) {
    return !1 !== t;
  }
  function x() {
    return "undefined" != typeof window;
  }
  function y(t) {
    return s(t) || r(t);
  }
  function P(t) {
    return (i = yt(t, ot)) && ze;
  }
  function Q(t, e) {
    return console.warn(
      "Invalid property",
      t,
      "set to",
      e,
      "Missing plugin? gsap.registerPlugin()",
    );
  }
  function R(t, e) {
    return !e && console.warn(t);
  }
  function S(t, e) {
    return (t && (ot[t] = e) && i && (i[t] = e)) || ot;
  }
  function T() {
    return 0;
  }
  function ea(t) {
    var e,
      r,
      i = t[0];
    if ((v(i) || s(i) || (t = [t]), !(e = (i._gsap || {}).harness))) {
      for (r = gt.length; r-- && !gt[r].targetTest(i); );
      e = gt[r];
    }
    for (r = t.length; r--; )
      (t[r] && (t[r]._gsap || (t[r]._gsap = new Zt(t[r], e)))) ||
        t.splice(r, 1);
    return t;
  }
  function fa(t) {
    return t._gsap || ea(Ot(t))[0]._gsap;
  }
  function ga(t, e, r) {
    return (r = t[e]) && s(r)
      ? t[e]()
      : (u(r) && t.getAttribute && t.getAttribute(e)) || r;
  }
  function ha(t, e) {
    return (t = t.split(",")).forEach(e) || t;
  }
  function ia(t) {
    return Math.round(1e5 * t) / 1e5 || 0;
  }
  function ja(t) {
    return Math.round(1e7 * t) / 1e7 || 0;
  }
  function ka(t, e) {
    var r = e.charAt(0),
      i = parseFloat(e.substr(2));
    return (
      (t = parseFloat(t)),
      "+" === r ? t + i : "-" === r ? t - i : "*" === r ? t * i : t / i
    );
  }
  function la(t, e) {
    for (var r = e.length, i = 0; t.indexOf(e[i]) < 0 && ++i < r; );
    return i < r;
  }
  function ma() {
    var t,
      e,
      r = dt.length,
      i = dt.slice(0);
    for (ct = {}, t = dt.length = 0; t < r; t++)
      (e = i[t]) && e._lazy && (e.render(e._lazy[0], e._lazy[1], !0)._lazy = 0);
  }
  function na(t) {
    return !!(t._initted || t._startAt || t.add);
  }
  function oa(t, e, r, i) {
    (dt.length && !L && ma(),
      t.render(e, r, i || !!(L && e < 0 && na(t))),
      dt.length && !L && ma());
  }
  function pa(t) {
    var e = parseFloat(t);
    return (e || 0 === e) && (t + "").match(at).length < 2
      ? e
      : r(t)
        ? t.trim()
        : t;
  }
  function qa(t) {
    return t;
  }
  function ra(t, e) {
    for (var r in e) r in t || (t[r] = e[r]);
    return t;
  }
  function ua(t, e) {
    for (var r in e)
      "__proto__" !== r &&
        "constructor" !== r &&
        "prototype" !== r &&
        (t[r] = v(e[r]) ? ua(t[r] || (t[r] = {}), e[r]) : e[r]);
    return t;
  }
  function va(t, e) {
    var r,
      i = {};
    for (r in t) r in e || (i[r] = t[r]);
    return i;
  }
  function wa(t) {
    var e = t.parent || I,
      r = t.keyframes
        ? (function _setKeyframeDefaults(i) {
            return function (t, e) {
              for (var r in e)
                r in t ||
                  ("duration" === r && i) ||
                  "ease" === r ||
                  (t[r] = e[r]);
            };
          })($(t.keyframes))
        : ra;
    if (w(t.inherit))
      for (; e; ) (r(t, e.vars.defaults), (e = e.parent || e._dp));
    return t;
  }
  function ya(t, e, r, i, n) {
    (void 0 === r && (r = "_first"), void 0 === i && (i = "_last"));
    var a,
      s = t[i];
    if (n) for (a = e[n]; s && s[n] > a; ) s = s._prev;
    return (
      s ? ((e._next = s._next), (s._next = e)) : ((e._next = t[r]), (t[r] = e)),
      e._next ? (e._next._prev = e) : (t[i] = e),
      (e._prev = s),
      (e.parent = e._dp = t),
      e
    );
  }
  function za(t, e, r, i) {
    (void 0 === r && (r = "_first"), void 0 === i && (i = "_last"));
    var n = e._prev,
      a = e._next;
    (n ? (n._next = a) : t[r] === e && (t[r] = a),
      a ? (a._prev = n) : t[i] === e && (t[i] = n),
      (e._next = e._prev = e.parent = null));
  }
  function Aa(t, e) {
    (t.parent &&
      (!e || t.parent.autoRemoveChildren) &&
      t.parent.remove &&
      t.parent.remove(t),
      (t._act = 0));
  }
  function Ba(t, e) {
    if (t && (!e || e._end > t._dur || e._start < 0))
      for (var r = t; r; ) ((r._dirty = 1), (r = r.parent));
    return t;
  }
  function Da(t, e, r, i) {
    return (
      t._startAt &&
      (L
        ? t._startAt.revert(ht)
        : (t.vars.immediateRender && !t.vars.autoRevert) ||
          t._startAt.render(e, !0, i))
    );
  }
  function Fa(t) {
    return t._repeat ? Tt(t._tTime, (t = t.duration() + t._rDelay)) * t : 0;
  }
  function Ha(t, e) {
    return (
      (t - e._start) * e._ts +
      (0 <= e._ts ? 0 : e._dirty ? e.totalDuration() : e._tDur)
    );
  }
  function Ia(t) {
    return (t._end = ja(
      t._start + (t._tDur / Math.abs(t._ts || t._rts || U) || 0),
    ));
  }
  function Ja(t, e) {
    var r = t._dp;
    return (
      r &&
        r.smoothChildTiming &&
        t._ts &&
        ((t._start = ja(
          r._time -
            (0 < t._ts
              ? e / t._ts
              : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts),
        )),
        Ia(t),
        r._dirty || Ba(r, t)),
      t
    );
  }
  function Ka(t, e) {
    var r;
    if (
      ((e._time ||
        (!e._dur && e._initted) ||
        (e._start < t._time && (e._dur || !e.add))) &&
        ((r = Ha(t.rawTime(), e)),
        (!e._dur || Mt(0, e.totalDuration(), r) - e._tTime > U) &&
          e.render(r, !0)),
      Ba(t, e)._dp && t._initted && t._time >= t._dur && t._ts)
    ) {
      if (t._dur < t.duration())
        for (r = t; r._dp; )
          (0 <= r.rawTime() && r.totalTime(r._tTime), (r = r._dp));
      t._zTime = -U;
    }
  }
  function La(e, r, i, n) {
    return (
      r.parent && Aa(r),
      (r._start = ja(
        (t(i) ? i : i || e !== I ? xt(e, i, r) : e._time) + r._delay,
      )),
      (r._end = ja(
        r._start + (r.totalDuration() / Math.abs(r.timeScale()) || 0),
      )),
      ya(e, r, "_first", "_last", e._sort ? "_start" : 0),
      bt(r) || (e._recent = r),
      n || Ka(e, r),
      e._ts < 0 && Ja(e, e._tTime),
      e
    );
  }
  function Ma(t, e) {
    return (
      (ot.ScrollTrigger || Q("scrollTrigger", e)) &&
      ot.ScrollTrigger.create(e, t)
    );
  }
  function Na(t, e, r, i, n) {
    return (
      Wt(t, e, n),
      t._initted
        ? !r &&
          t._pt &&
          !L &&
          ((t._dur && !1 !== t.vars.lazy) || (!t._dur && t.vars.lazy)) &&
          f !== Rt.frame
          ? (dt.push(t), (t._lazy = [n, i]), 1)
          : void 0
        : 1
    );
  }
  function Sa(t, e, r, i) {
    var n = t._repeat,
      a = ja(e) || 0,
      s = t._tTime / t._tDur;
    return (
      s && !i && (t._time *= a / t._dur),
      (t._dur = a),
      (t._tDur = n ? (n < 0 ? 1e10 : ja(a * (n + 1) + t._rDelay * n)) : a),
      0 < s && !i && Ja(t, (t._tTime = t._tDur * s)),
      t.parent && Ia(t),
      r || Ba(t.parent, t),
      t
    );
  }
  function Ta(t) {
    return t instanceof Qt ? Ba(t) : Sa(t, t._dur);
  }
  function Wa(e, r, i) {
    var n,
      a,
      s = t(r[1]),
      o = (s ? 2 : 1) + (e < 2 ? 0 : 1),
      u = r[o];
    if ((s && (u.duration = r[1]), (u.parent = i), e)) {
      for (n = u, a = i; a && !("immediateRender" in n); )
        ((n = a.vars.defaults || {}), (a = w(a.vars.inherit) && a.parent));
      ((u.immediateRender = w(n.immediateRender)),
        e < 2 ? (u.runBackwards = 1) : (u.startAt = r[o - 1]));
    }
    return new Jt(r[0], u, r[1 + o]);
  }
  function Xa(t, e) {
    return t || 0 === t ? e(t) : e;
  }
  function Za(t, e) {
    return r(t) && (e = st.exec(t)) ? e[1] : "";
  }
  function ab(t, e) {
    return (
      t &&
      v(t) &&
      "length" in t &&
      ((!e && !t.length) || (t.length - 1 in t && v(t[0]))) &&
      !t.nodeType &&
      t !== h
    );
  }
  function db(r) {
    return (
      (r = Ot(r)[0] || R("Invalid scope") || {}),
      function (t) {
        var e = r.current || r.nativeElement || r;
        return Ot(
          t,
          e.querySelectorAll
            ? e
            : e === r
              ? R("Invalid scope") || a.createElement("div")
              : r,
        );
      }
    );
  }
  function eb(t) {
    return t.sort(function () {
      return 0.5 - Math.random();
    });
  }
  function fb(t) {
    if (s(t)) return t;
    var p = v(t) ? t : { each: t },
      _ = Yt(p.ease),
      m = p.from || 0,
      g = parseFloat(p.base) || 0,
      y = {},
      e = 0 < m && m < 1,
      T = isNaN(m) || e,
      b = p.axis,
      w = m,
      x = m;
    return (
      r(m)
        ? (w = x = { center: 0.5, edges: 0.5, end: 1 }[m] || 0)
        : !e && T && ((w = m[0]), (x = m[1])),
      function (t, e, r) {
        var i,
          n,
          a,
          s,
          o,
          u,
          h,
          l,
          f,
          d = (r || p).length,
          c = y[d];
        if (!c) {
          if (!(f = "auto" === p.grid ? 0 : (p.grid || [1, N])[1])) {
            for (
              h = -N;
              h < (h = r[f++].getBoundingClientRect().left) && f < d;
            );
            f < d && f--;
          }
          for (
            c = y[d] = [],
              i = T ? Math.min(f, d) * w - 0.5 : m % f,
              n = f === N ? 0 : T ? (d * x) / f - 0.5 : (m / f) | 0,
              l = N,
              u = h = 0;
            u < d;
            u++
          )
            ((a = (u % f) - i),
              (s = n - ((u / f) | 0)),
              (c[u] = o = b ? Math.abs("y" === b ? s : a) : G(a * a + s * s)),
              h < o && (h = o),
              o < l && (l = o));
          ("random" === m && eb(c),
            (c.max = h - l),
            (c.min = l),
            (c.v = d =
              (parseFloat(p.amount) ||
                parseFloat(p.each) *
                  (d < f
                    ? d - 1
                    : b
                      ? "y" === b
                        ? d / f
                        : f
                      : Math.max(f, d / f)) ||
                0) * ("edges" === m ? -1 : 1)),
            (c.b = d < 0 ? g - d : g),
            (c.u = Za(p.amount || p.each) || 0),
            (_ = _ && d < 0 ? jt(_) : _));
        }
        return (
          (d = (c[t] - c.min) / c.max || 0),
          ja(c.b + (_ ? _(d) : d) * c.v) + c.u
        );
      }
    );
  }
  function gb(i) {
    var n = Math.pow(10, ((i + "").split(".")[1] || "").length);
    return function (e) {
      var r = ja(Math.round(parseFloat(e) / i) * i * n);
      return (r - (r % 1)) / n + (t(e) ? 0 : Za(e));
    };
  }
  function hb(h, e) {
    var l,
      f,
      r = $(h);
    return (
      !r &&
        v(h) &&
        ((l = r = h.radius || N),
        h.values
          ? ((h = Ot(h.values)), (f = !t(h[0])) && (l *= l))
          : (h = gb(h.increment))),
      Xa(
        e,
        r
          ? s(h)
            ? function (t) {
                return ((f = h(t)), Math.abs(f - t) <= l ? f : t);
              }
            : function (e) {
                for (
                  var r,
                    i,
                    n = parseFloat(f ? e.x : e),
                    a = parseFloat(f ? e.y : 0),
                    s = N,
                    o = 0,
                    u = h.length;
                  u--;
                )
                  (r = f
                    ? (r = h[u].x - n) * r + (i = h[u].y - a) * i
                    : Math.abs(h[u] - n)) < s && ((s = r), (o = u));
                return (
                  (o = !l || s <= l ? h[o] : e),
                  f || o === e || t(e) ? o : o + Za(e)
                );
              }
          : gb(h),
      )
    );
  }
  function ib(t, e, r, i) {
    return Xa($(t) ? !e : !0 === r ? !!(r = 0) : !i, function () {
      return $(t)
        ? t[~~(Math.random() * t.length)]
        : (r = r || 1e-5) &&
            (i = r < 1 ? Math.pow(10, (r + "").length - 2) : 1) &&
            Math.floor(
              Math.round((t - r / 2 + Math.random() * (e - t + 0.99 * r)) / r) *
                r *
                i,
            ) / i;
    });
  }
  function mb(e, r, t) {
    return Xa(t, function (t) {
      return e[~~r(t)];
    });
  }
  function pb(t) {
    for (var e, r, i, n, a = 0, s = ""; ~(e = t.indexOf("random(", a)); )
      ((i = t.indexOf(")", e)),
        (n = "[" === t.charAt(e + 7)),
        (r = t.substr(e + 7, i - e - 7).match(n ? at : tt)),
        (s +=
          t.substr(a, e - a) + ib(n ? r : +r[0], n ? 0 : +r[1], +r[2] || 1e-5)),
        (a = i + 1));
    return s + t.substr(a, t.length - a);
  }
  function sb(t, e, r) {
    var i,
      n,
      a,
      s = t.labels,
      o = N;
    for (i in s)
      (n = s[i] - e) < 0 == !!r &&
        n &&
        o > (n = Math.abs(n)) &&
        ((a = i), (o = n));
    return a;
  }
  function ub(t) {
    return (
      Aa(t),
      t.scrollTrigger && t.scrollTrigger.kill(!!L),
      t.progress() < 1 && Pt(t, "onInterrupt"),
      t
    );
  }
  function xb(t) {
    if (t)
      if (((t = (!t.name && t.default) || t), x() || t.headless)) {
        var e = t.name,
          r = s(t),
          i =
            e && !r && t.init
              ? function () {
                  this._props = [];
                }
              : t,
          n = {
            init: T,
            render: ue,
            add: Vt,
            kill: de,
            modifier: he,
            rawVars: 0,
          },
          a = {
            targetTest: 0,
            get: 0,
            getSetter: ie,
            aliases: {},
            register: 0,
          };
        if ((Ft(), t !== i)) {
          if (pt[e]) return;
          (ra(i, ra(va(t, n), a)),
            yt(i.prototype, yt(n, va(t, a))),
            (pt[(i.prop = e)] = i),
            t.targetTest && (gt.push(i), (ft[e] = 1)),
            (e =
              ("css" === e ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) +
              "Plugin"));
        }
        (S(e, i), t.register && t.register(ze, i, ge));
      } else Ct.push(t);
  }
  function Ab(t, e, r) {
    return (
      ((6 * (t += t < 0 ? 1 : 1 < t ? -1 : 0) < 1
        ? e + (r - e) * t * 6
        : t < 0.5
          ? r
          : 3 * t < 2
            ? e + (r - e) * (2 / 3 - t) * 6
            : e) *
        St +
        0.5) |
      0
    );
  }
  function Bb(e, r, i) {
    var n,
      a,
      s,
      o,
      u,
      h,
      l,
      f,
      d,
      c,
      p = e ? (t(e) ? [e >> 16, (e >> 8) & St, e & St] : 0) : Dt.black;
    if (!p) {
      if (("," === e.substr(-1) && (e = e.substr(0, e.length - 1)), Dt[e]))
        p = Dt[e];
      else if ("#" === e.charAt(0)) {
        if (
          (e.length < 6 &&
            (e =
              "#" +
              (n = e.charAt(1)) +
              n +
              (a = e.charAt(2)) +
              a +
              (s = e.charAt(3)) +
              s +
              (5 === e.length ? e.charAt(4) + e.charAt(4) : "")),
          9 === e.length)
        )
          return [
            (p = parseInt(e.substr(1, 6), 16)) >> 16,
            (p >> 8) & St,
            p & St,
            parseInt(e.substr(7), 16) / 255,
          ];
        p = [(e = parseInt(e.substr(1), 16)) >> 16, (e >> 8) & St, e & St];
      } else if ("hsl" === e.substr(0, 3))
        if (((p = c = e.match(tt)), r)) {
          if (~e.indexOf("="))
            return ((p = e.match(et)), i && p.length < 4 && (p[3] = 1), p);
        } else
          ((o = (+p[0] % 360) / 360),
            (u = p[1] / 100),
            (n =
              2 * (h = p[2] / 100) -
              (a = h <= 0.5 ? h * (u + 1) : h + u - h * u)),
            3 < p.length && (p[3] *= 1),
            (p[0] = Ab(o + 1 / 3, n, a)),
            (p[1] = Ab(o, n, a)),
            (p[2] = Ab(o - 1 / 3, n, a)));
      else p = e.match(tt) || Dt.transparent;
      p = p.map(Number);
    }
    return (
      r &&
        !c &&
        ((n = p[0] / St),
        (a = p[1] / St),
        (s = p[2] / St),
        (h = ((l = Math.max(n, a, s)) + (f = Math.min(n, a, s))) / 2),
        l === f
          ? (o = u = 0)
          : ((d = l - f),
            (u = 0.5 < h ? d / (2 - l - f) : d / (l + f)),
            (o =
              l === n
                ? (a - s) / d + (a < s ? 6 : 0)
                : l === a
                  ? (s - n) / d + 2
                  : (n - a) / d + 4),
            (o *= 60)),
        (p[0] = ~~(o + 0.5)),
        (p[1] = ~~(100 * u + 0.5)),
        (p[2] = ~~(100 * h + 0.5))),
      i && p.length < 4 && (p[3] = 1),
      p
    );
  }
  function Cb(t) {
    var r = [],
      i = [],
      n = -1;
    return (
      t.split(zt).forEach(function (t) {
        var e = t.match(rt) || [];
        (r.push.apply(r, e), i.push((n += e.length + 1)));
      }),
      (r.c = i),
      r
    );
  }
  function Db(t, e, r) {
    var i,
      n,
      a,
      s,
      o = "",
      u = (t + o).match(zt),
      h = e ? "hsla(" : "rgba(",
      l = 0;
    if (!u) return t;
    if (
      ((u = u.map(function (t) {
        return (
          (t = Bb(t, e, 1)) &&
          h +
            (e ? t[0] + "," + t[1] + "%," + t[2] + "%," + t[3] : t.join(",")) +
            ")"
        );
      })),
      r && ((a = Cb(t)), (i = r.c).join(o) !== a.c.join(o)))
    )
      for (s = (n = t.replace(zt, "1").split(rt)).length - 1; l < s; l++)
        o +=
          n[l] +
          (~i.indexOf(l)
            ? u.shift() || h + "0,0,0,0)"
            : (a.length ? a : u.length ? u : r).shift());
    if (!n) for (s = (n = t.split(zt)).length - 1; l < s; l++) o += n[l] + u[l];
    return o + n[s];
  }
  function Gb(t) {
    var e,
      r = t.join(" ");
    if (((zt.lastIndex = 0), zt.test(r)))
      return (
        (e = Et.test(r)),
        (t[1] = Db(t[1], e)),
        (t[0] = Db(t[0], e, Cb(t[1]))),
        !0
      );
  }
  function Pb(t) {
    var e = (t + "").split("("),
      r = Lt[e[0]];
    return r && 1 < e.length && r.config
      ? r.config.apply(
          null,
          ~t.indexOf("{")
            ? [
                (function _parseObjectInString(t) {
                  for (
                    var e,
                      r,
                      i,
                      n = {},
                      a = t.substr(1, t.length - 3).split(":"),
                      s = a[0],
                      o = 1,
                      u = a.length;
                    o < u;
                    o++
                  )
                    ((r = a[o]),
                      (e = o !== u - 1 ? r.lastIndexOf(",") : r.length),
                      (i = r.substr(0, e)),
                      (n[s] = isNaN(i) ? i.replace(Bt, "").trim() : +i),
                      (s = r.substr(e + 1).trim()));
                  return n;
                })(e[1]),
              ]
            : (function _valueInParentheses(t) {
                var e = t.indexOf("(") + 1,
                  r = t.indexOf(")"),
                  i = t.indexOf("(", e);
                return t.substring(e, ~i && i < r ? t.indexOf(")", r + 1) : r);
              })(t)
                .split(",")
                .map(pa),
        )
      : Lt._CE && It.test(t)
        ? Lt._CE("", t)
        : r;
  }
  function Rb(t, e) {
    for (var r, i = t._first; i; )
      (i instanceof Qt
        ? Rb(i, e)
        : !i.vars.yoyoEase ||
          (i._yoyo && i._repeat) ||
          i._yoyo === e ||
          (i.timeline
            ? Rb(i.timeline, e)
            : ((r = i._ease),
              (i._ease = i._yEase),
              (i._yEase = r),
              (i._yoyo = e))),
        (i = i._next));
  }
  function Tb(t, e, r, i) {
    (void 0 === r &&
      (r = function easeOut(t) {
        return 1 - e(1 - t);
      }),
      void 0 === i &&
        (i = function easeInOut(t) {
          return t < 0.5 ? e(2 * t) / 2 : 1 - e(2 * (1 - t)) / 2;
        }));
    var n,
      a = { easeIn: e, easeOut: r, easeInOut: i };
    return (
      ha(t, function (t) {
        for (var e in ((Lt[t] = ot[t] = a), (Lt[(n = t.toLowerCase())] = r), a))
          Lt[
            n + ("easeIn" === e ? ".in" : "easeOut" === e ? ".out" : ".inOut")
          ] = Lt[t + "." + e] = a[e];
      }),
      a
    );
  }
  function Ub(e) {
    return function (t) {
      return t < 0.5 ? (1 - e(1 - 2 * t)) / 2 : 0.5 + e(2 * (t - 0.5)) / 2;
    };
  }
  function Vb(r, t, e) {
    function Lm(t) {
      return 1 === t ? 1 : i * Math.pow(2, -10 * t) * K((t - a) * n) + 1;
    }
    var i = 1 <= t ? t : 1,
      n = (e || (r ? 0.3 : 0.45)) / (t < 1 ? t : 1),
      a = (n / q) * (Math.asin(1 / i) || 0),
      s =
        "out" === r
          ? Lm
          : "in" === r
            ? function (t) {
                return 1 - Lm(1 - t);
              }
            : Ub(Lm);
    return (
      (n = q / n),
      (s.config = function (t, e) {
        return Vb(r, t, e);
      }),
      s
    );
  }
  function Wb(e, r) {
    function Tm(t) {
      return t ? --t * t * ((r + 1) * t + r) + 1 : 0;
    }
    void 0 === r && (r = 1.70158);
    var t =
      "out" === e
        ? Tm
        : "in" === e
          ? function (t) {
              return 1 - Tm(1 - t);
            }
          : Ub(Tm);
    return (
      (t.config = function (t) {
        return Wb(e, t);
      }),
      t
    );
  }
  var F,
    L,
    l,
    I,
    h,
    n,
    a,
    i,
    o,
    f,
    d,
    c,
    p,
    _,
    m,
    g,
    b,
    M,
    k,
    O,
    A,
    C,
    D,
    z,
    E,
    B,
    j,
    Y,
    X = {
      autoSleep: 120,
      force3D: "auto",
      nullTargetWarn: 1,
      units: { lineHeight: "" },
    },
    Z = { duration: 0.5, overwrite: !1, delay: 0 },
    N = 1e8,
    U = 1 / N,
    q = 2 * Math.PI,
    V = q / 4,
    W = 0,
    G = Math.sqrt,
    H = Math.cos,
    K = Math.sin,
    J =
      ("function" == typeof ArrayBuffer && ArrayBuffer.isView) ||
      function () {},
    $ = Array.isArray,
    tt = /(?:-?\.?\d|\.)+/gi,
    et = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
    rt = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
    it = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
    nt = /[+-]=-?[.\d]+/,
    at = /[^,'"\[\]\s]+/gi,
    st = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
    ot = {},
    ut = { suppressEvents: !0, isStart: !0, kill: !1 },
    ht = { suppressEvents: !0, kill: !1 },
    lt = { suppressEvents: !0 },
    ft = {},
    dt = [],
    ct = {},
    pt = {},
    _t = {},
    mt = 30,
    gt = [],
    vt = "",
    yt = function _merge(t, e) {
      for (var r in e) t[r] = e[r];
      return t;
    },
    Tt = function _animationCycle(t, e) {
      var r = Math.floor((t = ja(t / e)));
      return t && r === t ? r - 1 : r;
    },
    bt = function _isFromOrFromStart(t) {
      var e = t.data;
      return "isFromStart" === e || "isStart" === e;
    },
    wt = { _start: 0, endTime: T, totalDuration: T },
    xt = function _parsePosition(t, e, i) {
      var n,
        a,
        s,
        o = t.labels,
        u = t._recent || wt,
        h = t.duration() >= N ? u.endTime(!1) : t._dur;
      return r(e) && (isNaN(e) || e in o)
        ? ((a = e.charAt(0)),
          (s = "%" === e.substr(-1)),
          (n = e.indexOf("=")),
          "<" === a || ">" === a
            ? (0 <= n && (e = e.replace(/=/, "")),
              ("<" === a ? u._start : u.endTime(0 <= u._repeat)) +
                (parseFloat(e.substr(1)) || 0) *
                  (s ? (n < 0 ? u : i).totalDuration() / 100 : 1))
            : n < 0
              ? (e in o || (o[e] = h), o[e])
              : ((a = parseFloat(e.charAt(n - 1) + e.substr(n + 1))),
                s && i && (a = (a / 100) * ($(i) ? i[0] : i).totalDuration()),
                1 < n ? _parsePosition(t, e.substr(0, n - 1), i) + a : h + a))
        : null == e
          ? h
          : +e;
    },
    Mt = function _clamp(t, e, r) {
      return r < t ? t : e < r ? e : r;
    },
    kt = [].slice,
    Ot = function toArray(t, e, i) {
      return l && !e && l.selector
        ? l.selector(t)
        : !r(t) || i || (!n && Ft())
          ? $(t)
            ? (function _flatten(t, e, i) {
                return (
                  void 0 === i && (i = []),
                  t.forEach(function (t) {
                    return (r(t) && !e) || ab(t, 1)
                      ? i.push.apply(i, Ot(t))
                      : i.push(t);
                  }) || i
                );
              })(t, i)
            : ab(t)
              ? kt.call(t, 0)
              : t
                ? [t]
                : []
          : kt.call((e || a).querySelectorAll(t), 0);
    },
    At = function mapRange(e, t, r, i, n) {
      var a = t - e,
        s = i - r;
      return Xa(n, function (t) {
        return r + (((t - e) / a) * s || 0);
      });
    },
    Pt = function _callback(t, e, r) {
      var i,
        n,
        a,
        s = t.vars,
        o = s[e],
        u = l,
        h = t._ctx;
      if (o)
        return (
          (i = s[e + "Params"]),
          (n = s.callbackScope || t),
          r && dt.length && ma(),
          h && (l = h),
          (a = i ? o.apply(n, i) : o.call(n)),
          (l = u),
          a
        );
    },
    Ct = [],
    St = 255,
    Dt = {
      aqua: [0, St, St],
      lime: [0, St, 0],
      silver: [192, 192, 192],
      black: [0, 0, 0],
      maroon: [128, 0, 0],
      teal: [0, 128, 128],
      blue: [0, 0, St],
      navy: [0, 0, 128],
      white: [St, St, St],
      olive: [128, 128, 0],
      yellow: [St, St, 0],
      orange: [St, 165, 0],
      gray: [128, 128, 128],
      purple: [128, 0, 128],
      green: [0, 128, 0],
      red: [St, 0, 0],
      pink: [St, 192, 203],
      cyan: [0, St, St],
      transparent: [St, St, St, 0],
    },
    zt = (function () {
      var t,
        e =
          "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";
      for (t in Dt) e += "|" + t + "\\b";
      return new RegExp(e + ")", "gi");
    })(),
    Et = /hsl[a]?\(/,
    Rt =
      ((k = Date.now),
      (O = 500),
      (A = 33),
      (C = k()),
      (D = C),
      (E = z = 1e3 / 240),
      (g = {
        time: 0,
        frame: 0,
        tick: function tick() {
          Al(!0);
        },
        deltaRatio: function deltaRatio(t) {
          return b / (1e3 / (t || 60));
        },
        wake: function wake() {
          o &&
            (!n &&
              x() &&
              ((h = n = window),
              (a = h.document || {}),
              (ot.gsap = ze),
              (h.gsapVersions || (h.gsapVersions = [])).push(ze.version),
              P(i || h.GreenSockGlobals || (!h.gsap && h) || {}),
              Ct.forEach(xb)),
            (m =
              "undefined" != typeof requestAnimationFrame &&
              requestAnimationFrame),
            p && g.sleep(),
            (_ =
              m ||
              function (t) {
                return setTimeout(t, (E - 1e3 * g.time + 1) | 0);
              }),
            (c = 1),
            Al(2));
        },
        sleep: function sleep() {
          ((m ? cancelAnimationFrame : clearTimeout)(p), (c = 0), (_ = T));
        },
        lagSmoothing: function lagSmoothing(t, e) {
          ((O = t || 1 / 0), (A = Math.min(e || 33, O)));
        },
        fps: function fps(t) {
          ((z = 1e3 / (t || 240)), (E = 1e3 * g.time + z));
        },
        add: function add(n, t, e) {
          var a = t
            ? function (t, e, r, i) {
                (n(t, e, r, i), g.remove(a));
              }
            : n;
          return (g.remove(n), B[e ? "unshift" : "push"](a), Ft(), a);
        },
        remove: function remove(t, e) {
          ~(e = B.indexOf(t)) && B.splice(e, 1) && e <= M && M--;
        },
        _listeners: (B = []),
      })),
    Ft = function _wake() {
      return !c && Rt.wake();
    },
    Lt = {},
    It = /^[\d.\-M][\d.\-,\s]/,
    Bt = /["']/g,
    jt = function _invertEase(e) {
      return function (t) {
        return 1 - e(1 - t);
      };
    },
    Yt = function _parseEase(t, e) {
      return (t && (s(t) ? t : Lt[t] || Pb(t))) || e;
    };
  function Al(t) {
    var e,
      r,
      i,
      n,
      a = k() - D,
      s = !0 === t;
    if (
      ((O < a || a < 0) && (C += a - A),
      (0 < (e = (i = (D += a) - C) - E) || s) &&
        ((n = ++g.frame),
        (b = i - 1e3 * g.time),
        (g.time = i /= 1e3),
        (E += e + (z <= e ? 4 : z - e)),
        (r = 1)),
      s || (p = _(Al)),
      r)
    )
      for (M = 0; M < B.length; M++) B[M](i, b, n, t);
  }
  function jn(t) {
    return t < Y
      ? j * t * t
      : t < 0.7272727272727273
        ? j * Math.pow(t - 1.5 / 2.75, 2) + 0.75
        : t < 0.9090909090909092
          ? j * (t -= 2.25 / 2.75) * t + 0.9375
          : j * Math.pow(t - 2.625 / 2.75, 2) + 0.984375;
  }
  (ha("Linear,Quad,Cubic,Quart,Quint,Strong", function (t, e) {
    var r = e < 5 ? e + 1 : e;
    Tb(
      t + ",Power" + (r - 1),
      e
        ? function (t) {
            return Math.pow(t, r);
          }
        : function (t) {
            return t;
          },
      function (t) {
        return 1 - Math.pow(1 - t, r);
      },
      function (t) {
        return t < 0.5
          ? Math.pow(2 * t, r) / 2
          : 1 - Math.pow(2 * (1 - t), r) / 2;
      },
    );
  }),
    (Lt.Linear.easeNone = Lt.none = Lt.Linear.easeIn),
    Tb("Elastic", Vb("in"), Vb("out"), Vb()),
    (j = 7.5625),
    (Y = 1 / 2.75),
    Tb(
      "Bounce",
      function (t) {
        return 1 - jn(1 - t);
      },
      jn,
    ),
    Tb("Expo", function (t) {
      return Math.pow(2, 10 * (t - 1)) * t + t * t * t * t * t * t * (1 - t);
    }),
    Tb("Circ", function (t) {
      return -(G(1 - t * t) - 1);
    }),
    Tb("Sine", function (t) {
      return 1 === t ? 1 : 1 - H(t * V);
    }),
    Tb("Back", Wb("in"), Wb("out"), Wb()),
    (Lt.SteppedEase =
      Lt.steps =
      ot.SteppedEase =
        {
          config: function config(t, e) {
            void 0 === t && (t = 1);
            var r = 1 / t,
              i = t + (e ? 0 : 1),
              n = e ? 1 : 0;
            return function (t) {
              return (((i * Mt(0, 0.99999999, t)) | 0) + n) * r;
            };
          },
        }),
    (Z.ease = Lt["quad.out"]),
    ha(
      "onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",
      function (t) {
        return (vt += t + "," + t + "Params,");
      },
    ));
  var Xt,
    Zt = function GSCache(t, e) {
      ((this.id = W++),
        ((t._gsap = this).target = t),
        (this.harness = e),
        (this.get = e ? e.get : ga),
        (this.set = e ? e.getSetter : ie));
    },
    Nt =
      (((Xt = Animation.prototype).delay = function delay(t) {
        return t || 0 === t
          ? (this.parent &&
              this.parent.smoothChildTiming &&
              this.startTime(this._start + t - this._delay),
            (this._delay = t),
            this)
          : this._delay;
      }),
      (Xt.duration = function duration(t) {
        return arguments.length
          ? this.totalDuration(
              0 < this._repeat ? t + (t + this._rDelay) * this._repeat : t,
            )
          : this.totalDuration() && this._dur;
      }),
      (Xt.totalDuration = function totalDuration(t) {
        return arguments.length
          ? ((this._dirty = 0),
            Sa(
              this,
              this._repeat < 0
                ? t
                : (t - this._repeat * this._rDelay) / (this._repeat + 1),
            ))
          : this._tDur;
      }),
      (Xt.totalTime = function totalTime(t, e) {
        if ((Ft(), !arguments.length)) return this._tTime;
        var r = this._dp;
        if (r && r.smoothChildTiming && this._ts) {
          for (Ja(this, t), !r._dp || r.parent || Ka(r, this); r && r.parent; )
            (r.parent._time !==
              r._start +
                (0 <= r._ts
                  ? r._tTime / r._ts
                  : (r.totalDuration() - r._tTime) / -r._ts) &&
              r.totalTime(r._tTime, !0),
              (r = r.parent));
          !this.parent &&
            this._dp.autoRemoveChildren &&
            ((0 < this._ts && t < this._tDur) ||
              (this._ts < 0 && 0 < t) ||
              (!this._tDur && !t)) &&
            La(this._dp, this, this._start - this._delay);
        }
        return (
          (this._tTime !== t ||
            (!this._dur && !e) ||
            (this._initted && Math.abs(this._zTime) === U) ||
            (!t && !this._initted && (this.add || this._ptLookup))) &&
            (this._ts || (this._pTime = t), oa(this, t, e)),
          this
        );
      }),
      (Xt.time = function time(t, e) {
        return arguments.length
          ? this.totalTime(
              Math.min(this.totalDuration(), t + Fa(this)) %
                (this._dur + this._rDelay) || (t ? this._dur : 0),
              e,
            )
          : this._time;
      }),
      (Xt.totalProgress = function totalProgress(t, e) {
        return arguments.length
          ? this.totalTime(this.totalDuration() * t, e)
          : this.totalDuration()
            ? Math.min(1, this._tTime / this._tDur)
            : 0 <= this.rawTime() && this._initted
              ? 1
              : 0;
      }),
      (Xt.progress = function progress(t, e) {
        return arguments.length
          ? this.totalTime(
              this.duration() *
                (!this._yoyo || 1 & this.iteration() ? t : 1 - t) +
                Fa(this),
              e,
            )
          : this.duration()
            ? Math.min(1, this._time / this._dur)
            : 0 < this.rawTime()
              ? 1
              : 0;
      }),
      (Xt.iteration = function iteration(t, e) {
        var r = this.duration() + this._rDelay;
        return arguments.length
          ? this.totalTime(this._time + (t - 1) * r, e)
          : this._repeat
            ? Tt(this._tTime, r) + 1
            : 1;
      }),
      (Xt.timeScale = function timeScale(t, e) {
        if (!arguments.length) return this._rts === -U ? 0 : this._rts;
        if (this._rts === t) return this;
        var r =
          this.parent && this._ts ? Ha(this.parent._time, this) : this._tTime;
        return (
          (this._rts = +t || 0),
          (this._ts = this._ps || t === -U ? 0 : this._rts),
          this.totalTime(
            Mt(-Math.abs(this._delay), this.totalDuration(), r),
            !1 !== e,
          ),
          Ia(this),
          (function _recacheAncestors(t) {
            for (var e = t.parent; e && e.parent; )
              ((e._dirty = 1), e.totalDuration(), (e = e.parent));
            return t;
          })(this)
        );
      }),
      (Xt.paused = function paused(t) {
        return arguments.length
          ? (this._ps !== t &&
              ((this._ps = t)
                ? ((this._pTime =
                    this._tTime || Math.max(-this._delay, this.rawTime())),
                  (this._ts = this._act = 0))
                : (Ft(),
                  (this._ts = this._rts),
                  this.totalTime(
                    this.parent && !this.parent.smoothChildTiming
                      ? this.rawTime()
                      : this._tTime || this._pTime,
                    1 === this.progress() &&
                      Math.abs(this._zTime) !== U &&
                      (this._tTime -= U),
                  ))),
            this)
          : this._ps;
      }),
      (Xt.startTime = function startTime(t) {
        if (arguments.length) {
          this._start = t;
          var e = this.parent || this._dp;
          return (
            !e || (!e._sort && this.parent) || La(e, this, t - this._delay),
            this
          );
        }
        return this._start;
      }),
      (Xt.endTime = function endTime(t) {
        return (
          this._start +
          (w(t) ? this.totalDuration() : this.duration()) /
            Math.abs(this._ts || 1)
        );
      }),
      (Xt.rawTime = function rawTime(t) {
        var e = this.parent || this._dp;
        return e
          ? t &&
            (!this._ts ||
              (this._repeat && this._time && this.totalProgress() < 1))
            ? this._tTime % (this._dur + this._rDelay)
            : this._ts
              ? Ha(e.rawTime(t), this)
              : this._tTime
          : this._tTime;
      }),
      (Xt.revert = function revert(t) {
        void 0 === t && (t = lt);
        var e = L;
        return (
          (L = t),
          na(this) &&
            (this.timeline && this.timeline.revert(t),
            this.totalTime(-0.01, t.suppressEvents)),
          "nested" !== this.data && !1 !== t.kill && this.kill(),
          (L = e),
          this
        );
      }),
      (Xt.globalTime = function globalTime(t) {
        for (var e = this, r = arguments.length ? t : e.rawTime(); e; )
          ((r = e._start + r / (Math.abs(e._ts) || 1)), (e = e._dp));
        return !this.parent && this._sat ? this._sat.globalTime(t) : r;
      }),
      (Xt.repeat = function repeat(t) {
        return arguments.length
          ? ((this._repeat = t === 1 / 0 ? -2 : t), Ta(this))
          : -2 === this._repeat
            ? 1 / 0
            : this._repeat;
      }),
      (Xt.repeatDelay = function repeatDelay(t) {
        if (arguments.length) {
          var e = this._time;
          return ((this._rDelay = t), Ta(this), e ? this.time(e) : this);
        }
        return this._rDelay;
      }),
      (Xt.yoyo = function yoyo(t) {
        return arguments.length ? ((this._yoyo = t), this) : this._yoyo;
      }),
      (Xt.seek = function seek(t, e) {
        return this.totalTime(xt(this, t), w(e));
      }),
      (Xt.restart = function restart(t, e) {
        return (
          this.play().totalTime(t ? -this._delay : 0, w(e)),
          this._dur || (this._zTime = -U),
          this
        );
      }),
      (Xt.play = function play(t, e) {
        return (null != t && this.seek(t, e), this.reversed(!1).paused(!1));
      }),
      (Xt.reverse = function reverse(t, e) {
        return (
          null != t && this.seek(t || this.totalDuration(), e),
          this.reversed(!0).paused(!1)
        );
      }),
      (Xt.pause = function pause(t, e) {
        return (null != t && this.seek(t, e), this.paused(!0));
      }),
      (Xt.resume = function resume() {
        return this.paused(!1);
      }),
      (Xt.reversed = function reversed(t) {
        return arguments.length
          ? (!!t !== this.reversed() &&
              this.timeScale(-this._rts || (t ? -U : 0)),
            this)
          : this._rts < 0;
      }),
      (Xt.invalidate = function invalidate() {
        return ((this._initted = this._act = 0), (this._zTime = -U), this);
      }),
      (Xt.isActive = function isActive() {
        var t,
          e = this.parent || this._dp,
          r = this._start;
        return !(
          e &&
          !(
            this._ts &&
            this._initted &&
            e.isActive() &&
            (t = e.rawTime(!0)) >= r &&
            t < this.endTime(!0) - U
          )
        );
      }),
      (Xt.eventCallback = function eventCallback(t, e, r) {
        var i = this.vars;
        return 1 < arguments.length
          ? (e
              ? ((i[t] = e),
                r && (i[t + "Params"] = r),
                "onUpdate" === t && (this._onUpdate = e))
              : delete i[t],
            this)
          : i[t];
      }),
      (Xt.then = function then(t) {
        var i = this;
        return new Promise(function (e) {
          function Eo() {
            var t = i.then;
            ((i.then = null),
              s(r) && (r = r(i)) && (r.then || r === i) && (i.then = t),
              e(r),
              (i.then = t));
          }
          var r = s(t) ? t : qa;
          (i._initted && 1 === i.totalProgress() && 0 <= i._ts) ||
          (!i._tTime && i._ts < 0)
            ? Eo()
            : (i._prom = Eo);
        });
      }),
      (Xt.kill = function kill() {
        ub(this);
      }),
      Animation);
  function Animation(t) {
    ((this.vars = t),
      (this._delay = +t.delay || 0),
      (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) &&
        ((this._rDelay = t.repeatDelay || 0),
        (this._yoyo = !!t.yoyo || !!t.yoyoEase)),
      (this._ts = 1),
      Sa(this, +t.duration, 1, 1),
      (this.data = t.data),
      l && (this._ctx = l).data.push(this),
      c || Rt.wake());
  }
  ra(Nt.prototype, {
    _time: 0,
    _start: 0,
    _end: 0,
    _tTime: 0,
    _tDur: 0,
    _dirty: 0,
    _repeat: 0,
    _yoyo: !1,
    parent: null,
    _initted: !1,
    _rDelay: 0,
    _ts: 1,
    _dp: 0,
    ratio: 0,
    _zTime: -U,
    _prom: 0,
    _ps: !1,
    _rts: 1,
  });
  var Qt = (function (i) {
    function Timeline(t, e) {
      var r;
      return (
        void 0 === t && (t = {}),
        ((r = i.call(this, t) || this).labels = {}),
        (r.smoothChildTiming = !!t.smoothChildTiming),
        (r.autoRemoveChildren = !!t.autoRemoveChildren),
        (r._sort = w(t.sortChildren)),
        I && La(t.parent || I, _assertThisInitialized(r), e),
        t.reversed && r.reverse(),
        t.paused && r.paused(!0),
        t.scrollTrigger && Ma(_assertThisInitialized(r), t.scrollTrigger),
        r
      );
    }
    _inheritsLoose(Timeline, i);
    var e = Timeline.prototype;
    return (
      (e.to = function to(t, e, r) {
        return (Wa(0, arguments, this), this);
      }),
      (e.from = function from(t, e, r) {
        return (Wa(1, arguments, this), this);
      }),
      (e.fromTo = function fromTo(t, e, r, i) {
        return (Wa(2, arguments, this), this);
      }),
      (e.set = function set(t, e, r) {
        return (
          (e.duration = 0),
          (e.parent = this),
          wa(e).repeatDelay || (e.repeat = 0),
          (e.immediateRender = !!e.immediateRender),
          new Jt(t, e, xt(this, r), 1),
          this
        );
      }),
      (e.call = function call(t, e, r) {
        return La(this, Jt.delayedCall(0, t, e), r);
      }),
      (e.staggerTo = function staggerTo(t, e, r, i, n, a, s) {
        return (
          (r.duration = e),
          (r.stagger = r.stagger || i),
          (r.onComplete = a),
          (r.onCompleteParams = s),
          (r.parent = this),
          new Jt(t, r, xt(this, n)),
          this
        );
      }),
      (e.staggerFrom = function staggerFrom(t, e, r, i, n, a, s) {
        return (
          (r.runBackwards = 1),
          (wa(r).immediateRender = w(r.immediateRender)),
          this.staggerTo(t, e, r, i, n, a, s)
        );
      }),
      (e.staggerFromTo = function staggerFromTo(t, e, r, i, n, a, s, o) {
        return (
          (i.startAt = r),
          (wa(i).immediateRender = w(i.immediateRender)),
          this.staggerTo(t, e, i, n, a, s, o)
        );
      }),
      (e.render = function render(t, e, r) {
        var i,
          n,
          a,
          s,
          o,
          u,
          h,
          l,
          f,
          d,
          c,
          p,
          _ = this._time,
          m = this._dirty ? this.totalDuration() : this._tDur,
          g = this._dur,
          v = t <= 0 ? 0 : ja(t),
          y = this._zTime < 0 != t < 0 && (this._initted || !g);
        if (
          (this !== I && m < v && 0 <= t && (v = m),
          v !== this._tTime || r || y)
        ) {
          if (
            (_ !== this._time &&
              g &&
              ((v += this._time - _), (t += this._time - _)),
            (i = v),
            (f = this._start),
            (u = !(l = this._ts)),
            y && (g || (_ = this._zTime), (!t && e) || (this._zTime = t)),
            this._repeat)
          ) {
            if (
              ((c = this._yoyo),
              (o = g + this._rDelay),
              this._repeat < -1 && t < 0)
            )
              return this.totalTime(100 * o + t, e, r);
            if (
              ((i = ja(v % o)),
              v === m
                ? ((s = this._repeat), (i = g))
                : ((s = ~~(d = ja(v / o))) && s === d && ((i = g), s--),
                  g < i && (i = g)),
              (d = Tt(this._tTime, o)),
              !_ &&
                this._tTime &&
                d !== s &&
                this._tTime - d * o - this._dur <= 0 &&
                (d = s),
              c && 1 & s && ((i = g - i), (p = 1)),
              s !== d && !this._lock)
            ) {
              var T = c && 1 & d,
                b = T === (c && 1 & s);
              if (
                (s < d && (T = !T),
                (_ = T ? 0 : v % g ? g : v),
                (this._lock = 1),
                (this.render(_ || (p ? 0 : ja(s * o)), e, !g)._lock = 0),
                (this._tTime = v),
                !e && this.parent && Pt(this, "onRepeat"),
                this.vars.repeatRefresh && !p && (this.invalidate()._lock = 1),
                (_ && _ !== this._time) ||
                  u != !this._ts ||
                  (this.vars.onRepeat && !this.parent && !this._act))
              )
                return this;
              if (
                ((g = this._dur),
                (m = this._tDur),
                b &&
                  ((this._lock = 2),
                  (_ = T ? g : -1e-4),
                  this.render(_, !0),
                  this.vars.repeatRefresh && !p && this.invalidate()),
                (this._lock = 0),
                !this._ts && !u)
              )
                return this;
              Rb(this, p);
            }
          }
          if (
            (this._hasPause &&
              !this._forcing &&
              this._lock < 2 &&
              (h = (function _findNextPauseTween(t, e, r) {
                var i;
                if (e < r)
                  for (i = t._first; i && i._start <= r; ) {
                    if ("isPause" === i.data && i._start > e) return i;
                    i = i._next;
                  }
                else
                  for (i = t._last; i && i._start >= r; ) {
                    if ("isPause" === i.data && i._start < e) return i;
                    i = i._prev;
                  }
              })(this, ja(_), ja(i))) &&
              (v -= i - (i = h._start)),
            (this._tTime = v),
            (this._time = i),
            (this._act = !l),
            this._initted ||
              ((this._onUpdate = this.vars.onUpdate),
              (this._initted = 1),
              (this._zTime = t),
              (_ = 0)),
            !_ && v && !e && !d && (Pt(this, "onStart"), this._tTime !== v))
          )
            return this;
          if (_ <= i && 0 <= t)
            for (n = this._first; n; ) {
              if (
                ((a = n._next), (n._act || i >= n._start) && n._ts && h !== n)
              ) {
                if (n.parent !== this) return this.render(t, e, r);
                if (
                  (n.render(
                    0 < n._ts
                      ? (i - n._start) * n._ts
                      : (n._dirty ? n.totalDuration() : n._tDur) +
                          (i - n._start) * n._ts,
                    e,
                    r,
                  ),
                  i !== this._time || (!this._ts && !u))
                ) {
                  ((h = 0), a && (v += this._zTime = -U));
                  break;
                }
              }
              n = a;
            }
          else {
            n = this._last;
            for (var w = t < 0 ? t : i; n; ) {
              if (
                ((a = n._prev), (n._act || w <= n._end) && n._ts && h !== n)
              ) {
                if (n.parent !== this) return this.render(t, e, r);
                if (
                  (n.render(
                    0 < n._ts
                      ? (w - n._start) * n._ts
                      : (n._dirty ? n.totalDuration() : n._tDur) +
                          (w - n._start) * n._ts,
                    e,
                    r || (L && na(n)),
                  ),
                  i !== this._time || (!this._ts && !u))
                ) {
                  ((h = 0), a && (v += this._zTime = w ? -U : U));
                  break;
                }
              }
              n = a;
            }
          }
          if (
            h &&
            !e &&
            (this.pause(),
            (h.render(_ <= i ? 0 : -U)._zTime = _ <= i ? 1 : -1),
            this._ts)
          )
            return ((this._start = f), Ia(this), this.render(t, e, r));
          (this._onUpdate && !e && Pt(this, "onUpdate", !0),
            ((v === m && this._tTime >= this.totalDuration()) || (!v && _)) &&
              ((f !== this._start && Math.abs(l) === Math.abs(this._ts)) ||
                this._lock ||
                ((!t && g) ||
                  !((v === m && 0 < this._ts) || (!v && this._ts < 0)) ||
                  Aa(this, 1),
                e ||
                  (t < 0 && !_) ||
                  (!v && !_ && m) ||
                  (Pt(
                    this,
                    v === m && 0 <= t ? "onComplete" : "onReverseComplete",
                    !0,
                  ),
                  !this._prom ||
                    (v < m && 0 < this.timeScale()) ||
                    this._prom()))));
        }
        return this;
      }),
      (e.add = function add(e, i) {
        var n = this;
        if ((t(i) || (i = xt(this, i, e)), !(e instanceof Nt))) {
          if ($(e))
            return (
              e.forEach(function (t) {
                return n.add(t, i);
              }),
              this
            );
          if (r(e)) return this.addLabel(e, i);
          if (!s(e)) return this;
          e = Jt.delayedCall(0, e);
        }
        return this !== e ? La(this, e, i) : this;
      }),
      (e.getChildren = function getChildren(t, e, r, i) {
        (void 0 === t && (t = !0),
          void 0 === e && (e = !0),
          void 0 === r && (r = !0),
          void 0 === i && (i = -N));
        for (var n = [], a = this._first; a; )
          (a._start >= i &&
            (a instanceof Jt
              ? e && n.push(a)
              : (r && n.push(a),
                t && n.push.apply(n, a.getChildren(!0, e, r)))),
            (a = a._next));
        return n;
      }),
      (e.getById = function getById(t) {
        for (var e = this.getChildren(1, 1, 1), r = e.length; r--; )
          if (e[r].vars.id === t) return e[r];
      }),
      (e.remove = function remove(t) {
        return r(t)
          ? this.removeLabel(t)
          : s(t)
            ? this.killTweensOf(t)
            : (t.parent === this && za(this, t),
              t === this._recent && (this._recent = this._last),
              Ba(this));
      }),
      (e.totalTime = function totalTime(t, e) {
        return arguments.length
          ? ((this._forcing = 1),
            !this._dp &&
              this._ts &&
              (this._start = ja(
                Rt.time -
                  (0 < this._ts
                    ? t / this._ts
                    : (this.totalDuration() - t) / -this._ts),
              )),
            i.prototype.totalTime.call(this, t, e),
            (this._forcing = 0),
            this)
          : this._tTime;
      }),
      (e.addLabel = function addLabel(t, e) {
        return ((this.labels[t] = xt(this, e)), this);
      }),
      (e.removeLabel = function removeLabel(t) {
        return (delete this.labels[t], this);
      }),
      (e.addPause = function addPause(t, e, r) {
        var i = Jt.delayedCall(0, e || T, r);
        return (
          (i.data = "isPause"),
          (this._hasPause = 1),
          La(this, i, xt(this, t))
        );
      }),
      (e.removePause = function removePause(t) {
        var e = this._first;
        for (t = xt(this, t); e; )
          (e._start === t && "isPause" === e.data && Aa(e), (e = e._next));
      }),
      (e.killTweensOf = function killTweensOf(t, e, r) {
        for (var i = this.getTweensOf(t, r), n = i.length; n--; )
          Ut !== i[n] && i[n].kill(t, e);
        return this;
      }),
      (e.getTweensOf = function getTweensOf(e, r) {
        for (var i, n = [], a = Ot(e), s = this._first, o = t(r); s; )
          (s instanceof Jt
            ? la(s._targets, a) &&
              (o
                ? (!Ut || (s._initted && s._ts)) &&
                  s.globalTime(0) <= r &&
                  s.globalTime(s.totalDuration()) > r
                : !r || s.isActive()) &&
              n.push(s)
            : (i = s.getTweensOf(a, r)).length && n.push.apply(n, i),
            (s = s._next));
        return n;
      }),
      (e.tweenTo = function tweenTo(t, e) {
        e = e || {};
        var r,
          i = this,
          n = xt(i, t),
          a = e.startAt,
          s = e.onStart,
          o = e.onStartParams,
          u = e.immediateRender,
          h = Jt.to(
            i,
            ra(
              {
                ease: e.ease || "none",
                lazy: !1,
                immediateRender: !1,
                time: n,
                overwrite: "auto",
                duration:
                  e.duration ||
                  Math.abs(
                    (n - (a && "time" in a ? a.time : i._time)) / i.timeScale(),
                  ) ||
                  U,
                onStart: function onStart() {
                  if ((i.pause(), !r)) {
                    var t =
                      e.duration ||
                      Math.abs(
                        (n - (a && "time" in a ? a.time : i._time)) /
                          i.timeScale(),
                      );
                    (h._dur !== t && Sa(h, t, 0, 1).render(h._time, !0, !0),
                      (r = 1));
                  }
                  s && s.apply(h, o || []);
                },
              },
              e,
            ),
          );
        return u ? h.render(0) : h;
      }),
      (e.tweenFromTo = function tweenFromTo(t, e, r) {
        return this.tweenTo(e, ra({ startAt: { time: xt(this, t) } }, r));
      }),
      (e.recent = function recent() {
        return this._recent;
      }),
      (e.nextLabel = function nextLabel(t) {
        return (void 0 === t && (t = this._time), sb(this, xt(this, t)));
      }),
      (e.previousLabel = function previousLabel(t) {
        return (void 0 === t && (t = this._time), sb(this, xt(this, t), 1));
      }),
      (e.currentLabel = function currentLabel(t) {
        return arguments.length
          ? this.seek(t, !0)
          : this.previousLabel(this._time + U);
      }),
      (e.shiftChildren = function shiftChildren(t, e, r) {
        void 0 === r && (r = 0);
        for (var i, n = this._first, a = this.labels; n; )
          (n._start >= r && ((n._start += t), (n._end += t)), (n = n._next));
        if (e) for (i in a) a[i] >= r && (a[i] += t);
        return Ba(this);
      }),
      (e.invalidate = function invalidate(t) {
        var e = this._first;
        for (this._lock = 0; e; ) (e.invalidate(t), (e = e._next));
        return i.prototype.invalidate.call(this, t);
      }),
      (e.clear = function clear(t) {
        void 0 === t && (t = !0);
        for (var e, r = this._first; r; )
          ((e = r._next), this.remove(r), (r = e));
        return (
          this._dp && (this._time = this._tTime = this._pTime = 0),
          t && (this.labels = {}),
          Ba(this)
        );
      }),
      (e.totalDuration = function totalDuration(t) {
        var e,
          r,
          i,
          n = 0,
          a = this,
          s = a._last,
          o = N;
        if (arguments.length)
          return a.timeScale(
            (a._repeat < 0 ? a.duration() : a.totalDuration()) /
              (a.reversed() ? -t : t),
          );
        if (a._dirty) {
          for (i = a.parent; s; )
            ((e = s._prev),
              s._dirty && s.totalDuration(),
              o < (r = s._start) && a._sort && s._ts && !a._lock
                ? ((a._lock = 1), (La(a, s, r - s._delay, 1)._lock = 0))
                : (o = r),
              r < 0 &&
                s._ts &&
                ((n -= r),
                ((!i && !a._dp) || (i && i.smoothChildTiming)) &&
                  ((a._start += r / a._ts), (a._time -= r), (a._tTime -= r)),
                a.shiftChildren(-r, !1, -Infinity),
                (o = 0)),
              s._end > n && s._ts && (n = s._end),
              (s = e));
          (Sa(a, a === I && a._time > n ? a._time : n, 1, 1), (a._dirty = 0));
        }
        return a._tDur;
      }),
      (Timeline.updateRoot = function updateRoot(t) {
        if ((I._ts && (oa(I, Ha(t, I)), (f = Rt.frame)), Rt.frame >= mt)) {
          mt += X.autoSleep || 120;
          var e = I._first;
          if ((!e || !e._ts) && X.autoSleep && Rt._listeners.length < 2) {
            for (; e && !e._ts; ) e = e._next;
            e || Rt.sleep();
          }
        }
      }),
      Timeline
    );
  })(Nt);
  ra(Qt.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 });
  function bc(t, e, i, n, a, o) {
    var u, h, l, f;
    if (
      pt[t] &&
      !1 !==
        (u = new pt[t]()).init(
          a,
          u.rawVars
            ? e[t]
            : (function _processVars(t, e, i, n, a) {
                if (
                  (s(t) && (t = Gt(t, a, e, i, n)),
                  !v(t) || (t.style && t.nodeType) || $(t) || J(t))
                )
                  return r(t) ? Gt(t, a, e, i, n) : t;
                var o,
                  u = {};
                for (o in t) u[o] = Gt(t[o], a, e, i, n);
                return u;
              })(e[t], n, a, o, i),
          i,
          n,
          o,
        ) &&
      ((i._pt = h = new ge(i._pt, a, t, 0, 1, u.render, u, 0, u.priority)),
      i !== d)
    )
      for (l = i._ptLookup[i._targets.indexOf(a)], f = u._props.length; f--; )
        l[u._props[f]] = h;
    return u;
  }
  function hc(t, r, e, i) {
    var n,
      a,
      s = r.ease || i || "power1.inOut";
    if ($(r))
      ((a = e[t] || (e[t] = [])),
        r.forEach(function (t, e) {
          return a.push({ t: (e / (r.length - 1)) * 100, v: t, e: s });
        }));
    else
      for (n in r)
        ((a = e[n] || (e[n] = [])),
          "ease" === n || a.push({ t: parseFloat(t), v: r[n], e: s }));
  }
  var Ut,
    qt,
    Vt = function _addPropTween(t, e, i, n, a, o, u, h, l, f) {
      s(n) && (n = n(a || 0, t, o));
      var d,
        c = t[e],
        p =
          "get" !== i
            ? i
            : s(c)
              ? l
                ? t[
                    e.indexOf("set") || !s(t["get" + e.substr(3)])
                      ? e
                      : "get" + e.substr(3)
                  ](l)
                : t[e]()
              : c,
        _ = s(c) ? (l ? re : te) : $t;
      if (
        (r(n) &&
          (~n.indexOf("random(") && (n = pb(n)),
          "=" === n.charAt(1) &&
            ((!(d = ka(p, n) + (Za(p) || 0)) && 0 !== d) || (n = d))),
        !f || p !== n || qt)
      )
        return isNaN(p * n) || "" === n
          ? (c || e in t || Q(e, n),
            function _addComplexStringPropTween(t, e, r, i, n, a, s) {
              var o,
                u,
                h,
                l,
                f,
                d,
                c,
                p,
                _ = new ge(this._pt, t, e, 0, 1, oe, null, n),
                m = 0,
                g = 0;
              for (
                _.b = r,
                  _.e = i,
                  r += "",
                  (c = ~(i += "").indexOf("random(")) && (i = pb(i)),
                  a && (a((p = [r, i]), t, e), (r = p[0]), (i = p[1])),
                  u = r.match(it) || [];
                (o = it.exec(i));
              )
                ((l = o[0]),
                  (f = i.substring(m, o.index)),
                  h ? (h = (h + 1) % 5) : "rgba(" === f.substr(-5) && (h = 1),
                  l !== u[g++] &&
                    ((d = parseFloat(u[g - 1]) || 0),
                    (_._pt = {
                      _next: _._pt,
                      p: f || 1 === g ? f : ",",
                      s: d,
                      c: "=" === l.charAt(1) ? ka(d, l) - d : parseFloat(l) - d,
                      m: h && h < 4 ? Math.round : 0,
                    }),
                    (m = it.lastIndex)));
              return (
                (_.c = m < i.length ? i.substring(m, i.length) : ""),
                (_.fp = s),
                (nt.test(i) || c) && (_.e = 0),
                (this._pt = _)
              );
            }.call(this, t, e, p, n, _, h || X.stringFilter, l))
          : ((d = new ge(
              this._pt,
              t,
              e,
              +p || 0,
              n - (p || 0),
              "boolean" == typeof c ? se : ne,
              0,
              _,
            )),
            l && (d.fp = l),
            u && d.modifier(u, this, t),
            (this._pt = d));
    },
    Wt = function _initTween(t, e, r) {
      var i,
        n,
        a,
        s,
        o,
        u,
        h,
        l,
        f,
        d,
        c,
        p,
        _,
        m = t.vars,
        g = m.ease,
        v = m.startAt,
        y = m.immediateRender,
        T = m.lazy,
        b = m.onUpdate,
        x = m.runBackwards,
        M = m.yoyoEase,
        k = m.keyframes,
        O = m.autoRevert,
        A = t._dur,
        P = t._startAt,
        C = t._targets,
        S = t.parent,
        D = S && "nested" === S.data ? S.vars.targets : C,
        z = "auto" === t._overwrite && !F,
        E = t.timeline;
      if (
        (!E || (k && g) || (g = "none"),
        (t._ease = Yt(g, Z.ease)),
        (t._yEase = M ? jt(Yt(!0 === M ? g : M, Z.ease)) : 0),
        M &&
          t._yoyo &&
          !t._repeat &&
          ((M = t._yEase), (t._yEase = t._ease), (t._ease = M)),
        (t._from = !E && !!m.runBackwards),
        !E || (k && !m.stagger))
      ) {
        if (
          ((p = (l = C[0] ? fa(C[0]).harness : 0) && m[l.prop]),
          (i = va(m, ft)),
          P &&
            (P._zTime < 0 && P.progress(1),
            e < 0 && x && y && !O
              ? P.render(-1, !0)
              : P.revert(x && A ? ht : ut),
            (P._lazy = 0)),
          v)
        ) {
          if (
            (Aa(
              (t._startAt = Jt.set(
                C,
                ra(
                  {
                    data: "isStart",
                    overwrite: !1,
                    parent: S,
                    immediateRender: !0,
                    lazy: !P && w(T),
                    startAt: null,
                    delay: 0,
                    onUpdate:
                      b &&
                      function () {
                        return Pt(t, "onUpdate");
                      },
                    stagger: 0,
                  },
                  v,
                ),
              )),
            ),
            (t._startAt._dp = 0),
            (t._startAt._sat = t),
            e < 0 && (L || (!y && !O)) && t._startAt.revert(ht),
            y && A && e <= 0 && r <= 0)
          )
            return void (e && (t._zTime = e));
        } else if (x && A && !P)
          if (
            (e && (y = !1),
            (a = ra(
              {
                overwrite: !1,
                data: "isFromStart",
                lazy: y && !P && w(T),
                immediateRender: y,
                stagger: 0,
                parent: S,
              },
              i,
            )),
            p && (a[l.prop] = p),
            Aa((t._startAt = Jt.set(C, a))),
            (t._startAt._dp = 0),
            (t._startAt._sat = t),
            e < 0 && (L ? t._startAt.revert(ht) : t._startAt.render(-1, !0)),
            (t._zTime = e),
            y)
          ) {
            if (!e) return;
          } else _initTween(t._startAt, U, U);
        for (
          t._pt = t._ptCache = 0, T = (A && w(T)) || (T && !A), n = 0;
          n < C.length;
          n++
        ) {
          if (
            ((h = (o = C[n])._gsap || ea(C)[n]._gsap),
            (t._ptLookup[n] = d = {}),
            ct[h.id] && dt.length && ma(),
            (c = D === C ? n : D.indexOf(o)),
            l &&
              !1 !== (f = new l()).init(o, p || i, t, c, D) &&
              ((t._pt = s =
                new ge(t._pt, o, f.name, 0, 1, f.render, f, 0, f.priority)),
              f._props.forEach(function (t) {
                d[t] = s;
              }),
              f.priority && (u = 1)),
            !l || p)
          )
            for (a in i)
              pt[a] && (f = bc(a, i, t, c, o, D))
                ? f.priority && (u = 1)
                : (d[a] = s =
                    Vt.call(t, o, a, "get", i[a], c, D, 0, m.stringFilter));
          (t._op && t._op[n] && t.kill(o, t._op[n]),
            z &&
              t._pt &&
              ((Ut = t),
              I.killTweensOf(o, d, t.globalTime(e)),
              (_ = !t.parent),
              (Ut = 0)),
            t._pt && T && (ct[h.id] = 1));
        }
        (u && _e(t), t._onInit && t._onInit(t));
      }
      ((t._onUpdate = b),
        (t._initted = (!t._op || t._pt) && !_),
        k && e <= 0 && E.render(N, !0, !0));
    },
    Gt = function _parseFuncOrString(t, e, i, n, a) {
      return s(t)
        ? t.call(e, i, n, a)
        : r(t) && ~t.indexOf("random(")
          ? pb(t)
          : t;
    },
    Ht = vt + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",
    Kt = {};
  ha(Ht + ",id,stagger,delay,duration,paused,scrollTrigger", function (t) {
    return (Kt[t] = 1);
  });
  var Jt = (function (E) {
    function Tween(e, r, i, n) {
      var a;
      "number" == typeof r && ((i.duration = r), (r = i), (i = null));
      var s,
        o,
        u,
        h,
        l,
        f,
        d,
        c,
        p = (a = E.call(this, n ? r : wa(r)) || this).vars,
        _ = p.duration,
        m = p.delay,
        g = p.immediateRender,
        T = p.stagger,
        b = p.overwrite,
        x = p.keyframes,
        M = p.defaults,
        k = p.scrollTrigger,
        O = p.yoyoEase,
        A = r.parent || I,
        P = ($(e) || J(e) ? t(e[0]) : "length" in r) ? [e] : Ot(e);
      if (
        ((a._targets = P.length
          ? ea(P)
          : R(
              "GSAP target " + e + " not found. https://gsap.com",
              !X.nullTargetWarn,
            ) || []),
        (a._ptLookup = []),
        (a._overwrite = b),
        x || T || y(_) || y(m))
      ) {
        if (
          ((r = a.vars),
          (s = a.timeline =
            new Qt({
              data: "nested",
              defaults: M || {},
              targets: A && "nested" === A.data ? A.vars.targets : P,
            })).kill(),
          (s.parent = s._dp = _assertThisInitialized(a)),
          (s._start = 0),
          T || y(_) || y(m))
        ) {
          if (((h = P.length), (d = T && fb(T)), v(T)))
            for (l in T) ~Ht.indexOf(l) && ((c = c || {})[l] = T[l]);
          for (o = 0; o < h; o++)
            (((u = va(r, Kt)).stagger = 0),
              O && (u.yoyoEase = O),
              c && yt(u, c),
              (f = P[o]),
              (u.duration = +Gt(_, _assertThisInitialized(a), o, f, P)),
              (u.delay =
                (+Gt(m, _assertThisInitialized(a), o, f, P) || 0) - a._delay),
              !T &&
                1 === h &&
                u.delay &&
                ((a._delay = m = u.delay), (a._start += m), (u.delay = 0)),
              s.to(f, u, d ? d(o, f, P) : 0),
              (s._ease = Lt.none));
          s.duration() ? (_ = m = 0) : (a.timeline = 0);
        } else if (x) {
          (wa(ra(s.vars.defaults, { ease: "none" })),
            (s._ease = Yt(x.ease || r.ease || "none")));
          var C,
            S,
            D,
            z = 0;
          if ($(x))
            (x.forEach(function (t) {
              return s.to(P, t, ">");
            }),
              s.duration());
          else {
            for (l in ((u = {}), x))
              "ease" === l || "easeEach" === l || hc(l, x[l], u, x.easeEach);
            for (l in u)
              for (
                C = u[l].sort(function (t, e) {
                  return t.t - e.t;
                }),
                  o = z = 0;
                o < C.length;
                o++
              )
                (((D = {
                  ease: (S = C[o]).e,
                  duration: ((S.t - (o ? C[o - 1].t : 0)) / 100) * _,
                })[l] = S.v),
                  s.to(P, D, z),
                  (z += D.duration));
            s.duration() < _ && s.to({}, { duration: _ - s.duration() });
          }
        }
        _ || a.duration((_ = s.duration()));
      } else a.timeline = 0;
      return (
        !0 !== b ||
          F ||
          ((Ut = _assertThisInitialized(a)), I.killTweensOf(P), (Ut = 0)),
        La(A, _assertThisInitialized(a), i),
        r.reversed && a.reverse(),
        r.paused && a.paused(!0),
        (g ||
          (!_ &&
            !x &&
            a._start === ja(A._time) &&
            w(g) &&
            (function _hasNoPausedAncestors(t) {
              return !t || (t._ts && _hasNoPausedAncestors(t.parent));
            })(_assertThisInitialized(a)) &&
            "nested" !== A.data)) &&
          ((a._tTime = -U), a.render(Math.max(0, -m) || 0)),
        k && Ma(_assertThisInitialized(a), k),
        a
      );
    }
    _inheritsLoose(Tween, E);
    var e = Tween.prototype;
    return (
      (e.render = function render(t, e, r) {
        var i,
          n,
          a,
          s,
          o,
          u,
          h,
          l,
          f,
          d = this._time,
          c = this._tDur,
          p = this._dur,
          _ = t < 0,
          m = c - U < t && !_ ? c : t < U ? 0 : t;
        if (p) {
          if (
            m !== this._tTime ||
            !t ||
            r ||
            (!this._initted && this._tTime) ||
            (this._startAt && this._zTime < 0 != _) ||
            this._lazy
          ) {
            if (((i = m), (l = this.timeline), this._repeat)) {
              if (((s = p + this._rDelay), this._repeat < -1 && _))
                return this.totalTime(100 * s + t, e, r);
              if (
                ((i = ja(m % s)),
                m === c
                  ? ((a = this._repeat), (i = p))
                  : (a = ~~(o = ja(m / s))) && a === o
                    ? ((i = p), a--)
                    : p < i && (i = p),
                (u = this._yoyo && 1 & a) && ((f = this._yEase), (i = p - i)),
                (o = Tt(this._tTime, s)),
                i === d && !r && this._initted && a === o)
              )
                return ((this._tTime = m), this);
              a !== o &&
                (l && this._yEase && Rb(l, u),
                this.vars.repeatRefresh &&
                  !u &&
                  !this._lock &&
                  i !== s &&
                  this._initted &&
                  ((this._lock = r = 1),
                  (this.render(ja(s * a), !0).invalidate()._lock = 0)));
            }
            if (!this._initted) {
              if (Na(this, _ ? t : i, r, e, m))
                return ((this._tTime = 0), this);
              if (
                !(d === this._time || (r && this.vars.repeatRefresh && a !== o))
              )
                return this;
              if (p !== this._dur) return this.render(t, e, r);
            }
            if (
              ((this._tTime = m),
              (this._time = i),
              !this._act && this._ts && ((this._act = 1), (this._lazy = 0)),
              (this.ratio = h = (f || this._ease)(i / p)),
              this._from && (this.ratio = h = 1 - h),
              !d && m && !e && !o && (Pt(this, "onStart"), this._tTime !== m))
            )
              return this;
            for (n = this._pt; n; ) (n.r(h, n.d), (n = n._next));
            ((l &&
              l.render(t < 0 ? t : l._dur * l._ease(i / this._dur), e, r)) ||
              (this._startAt && (this._zTime = t)),
              this._onUpdate &&
                !e &&
                (_ && Da(this, t, 0, r), Pt(this, "onUpdate")),
              this._repeat &&
                a !== o &&
                this.vars.onRepeat &&
                !e &&
                this.parent &&
                Pt(this, "onRepeat"),
              (m !== this._tDur && m) ||
                this._tTime !== m ||
                (_ && !this._onUpdate && Da(this, t, 0, !0),
                (!t && p) ||
                  !(
                    (m === this._tDur && 0 < this._ts) ||
                    (!m && this._ts < 0)
                  ) ||
                  Aa(this, 1),
                e ||
                  (_ && !d) ||
                  !(m || d || u) ||
                  (Pt(this, m === c ? "onComplete" : "onReverseComplete", !0),
                  !this._prom ||
                    (m < c && 0 < this.timeScale()) ||
                    this._prom())));
          }
        } else
          !(function _renderZeroDurationTween(t, e, r, i) {
            var n,
              a,
              s,
              o = t.ratio,
              u =
                e < 0 ||
                (!e &&
                  ((!t._start &&
                    (function _parentPlayheadIsBeforeStart(t) {
                      var e = t.parent;
                      return (
                        e &&
                        e._ts &&
                        e._initted &&
                        !e._lock &&
                        (e.rawTime() < 0 || _parentPlayheadIsBeforeStart(e))
                      );
                    })(t) &&
                    (t._initted || !bt(t))) ||
                    ((t._ts < 0 || t._dp._ts < 0) && !bt(t))))
                  ? 0
                  : 1,
              h = t._rDelay,
              l = 0;
            if (
              (h &&
                t._repeat &&
                ((l = Mt(0, t._tDur, e)),
                (a = Tt(l, h)),
                t._yoyo && 1 & a && (u = 1 - u),
                a !== Tt(t._tTime, h) &&
                  ((o = 1 - u),
                  t.vars.repeatRefresh && t._initted && t.invalidate())),
              u !== o || L || i || t._zTime === U || (!e && t._zTime))
            ) {
              if (!t._initted && Na(t, e, i, r, l)) return;
              for (
                s = t._zTime,
                  t._zTime = e || (r ? U : 0),
                  r = r || (e && !s),
                  t.ratio = u,
                  t._from && (u = 1 - u),
                  t._time = 0,
                  t._tTime = l,
                  n = t._pt;
                n;
              )
                (n.r(u, n.d), (n = n._next));
              (e < 0 && Da(t, e, 0, !0),
                t._onUpdate && !r && Pt(t, "onUpdate"),
                l && t._repeat && !r && t.parent && Pt(t, "onRepeat"),
                (e >= t._tDur || e < 0) &&
                  t.ratio === u &&
                  (u && Aa(t, 1),
                  r ||
                    L ||
                    (Pt(t, u ? "onComplete" : "onReverseComplete", !0),
                    t._prom && t._prom())));
            } else t._zTime || (t._zTime = e);
          })(this, t, e, r);
        return this;
      }),
      (e.targets = function targets() {
        return this._targets;
      }),
      (e.invalidate = function invalidate(t) {
        return (
          (t && this.vars.runBackwards) || (this._startAt = 0),
          (this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0),
          (this._ptLookup = []),
          this.timeline && this.timeline.invalidate(t),
          E.prototype.invalidate.call(this, t)
        );
      }),
      (e.resetTo = function resetTo(t, e, r, i, n) {
        (c || Rt.wake(), this._ts || this.play());
        var a,
          s = Math.min(this._dur, (this._dp._time - this._start) * this._ts);
        return (
          this._initted || Wt(this, s),
          (a = this._ease(s / this._dur)),
          (function _updatePropTweens(t, e, r, i, n, a, s, o) {
            var u,
              h,
              l,
              f,
              d = ((t._pt && t._ptCache) || (t._ptCache = {}))[e];
            if (!d)
              for (
                d = t._ptCache[e] = [], l = t._ptLookup, f = t._targets.length;
                f--;
              ) {
                if ((u = l[f][e]) && u.d && u.d._pt)
                  for (u = u.d._pt; u && u.p !== e && u.fp !== e; ) u = u._next;
                if (!u)
                  return (
                    (qt = 1),
                    (t.vars[e] = "+=0"),
                    Wt(t, s),
                    (qt = 0),
                    o ? R(e + " not eligible for reset") : 1
                  );
                d.push(u);
              }
            for (f = d.length; f--; )
              (((u = (h = d[f])._pt || h).s =
                (!i && 0 !== i) || n ? u.s + (i || 0) + a * u.c : i),
                (u.c = r - u.s),
                h.e && (h.e = ia(r) + Za(h.e)),
                h.b && (h.b = u.s + Za(h.b)));
          })(this, t, e, r, i, a, s, n)
            ? this.resetTo(t, e, r, i, 1)
            : (Ja(this, 0),
              this.parent ||
                ya(
                  this._dp,
                  this,
                  "_first",
                  "_last",
                  this._dp._sort ? "_start" : 0,
                ),
              this.render(0))
        );
      }),
      (e.kill = function kill(t, e) {
        if ((void 0 === e && (e = "all"), !(t || (e && "all" !== e))))
          return (
            (this._lazy = this._pt = 0),
            this.parent
              ? ub(this)
              : this.scrollTrigger && this.scrollTrigger.kill(!!L),
            this
          );
        if (this.timeline) {
          var i = this.timeline.totalDuration();
          return (
            this.timeline.killTweensOf(t, e, Ut && !0 !== Ut.vars.overwrite)
              ._first || ub(this),
            this.parent &&
              i !== this.timeline.totalDuration() &&
              Sa(this, (this._dur * this.timeline._tDur) / i, 0, 1),
            this
          );
        }
        var n,
          a,
          s,
          o,
          u,
          h,
          l,
          f = this._targets,
          d = t ? Ot(t) : f,
          c = this._ptLookup,
          p = this._pt;
        if (
          (!e || "all" === e) &&
          (function _arraysMatch(t, e) {
            for (
              var r = t.length, i = r === e.length;
              i && r-- && t[r] === e[r];
            );
            return r < 0;
          })(f, d)
        )
          return ("all" === e && (this._pt = 0), ub(this));
        for (
          n = this._op = this._op || [],
            "all" !== e &&
              (r(e) &&
                ((u = {}),
                ha(e, function (t) {
                  return (u[t] = 1);
                }),
                (e = u)),
              (e = (function _addAliasesToVars(t, e) {
                var r,
                  i,
                  n,
                  a,
                  s = t[0] ? fa(t[0]).harness : 0,
                  o = s && s.aliases;
                if (!o) return e;
                for (i in ((r = yt({}, e)), o))
                  if ((i in r))
                    for (n = (a = o[i].split(",")).length; n--; )
                      r[a[n]] = r[i];
                return r;
              })(f, e))),
            l = f.length;
          l--;
        )
          if (~d.indexOf(f[l]))
            for (u in ((a = c[l]),
            "all" === e
              ? ((n[l] = e), (o = a), (s = {}))
              : ((s = n[l] = n[l] || {}), (o = e)),
            o))
              ((h = a && a[u]) &&
                (("kill" in h.d && !0 !== h.d.kill(u)) || za(this, h, "_pt"),
                delete a[u]),
                "all" !== s && (s[u] = 1));
        return (this._initted && !this._pt && p && ub(this), this);
      }),
      (Tween.to = function to(t, e, r) {
        return new Tween(t, e, r);
      }),
      (Tween.from = function from(t, e) {
        return Wa(1, arguments);
      }),
      (Tween.delayedCall = function delayedCall(t, e, r, i) {
        return new Tween(e, 0, {
          immediateRender: !1,
          lazy: !1,
          overwrite: !1,
          delay: t,
          onComplete: e,
          onReverseComplete: e,
          onCompleteParams: r,
          onReverseCompleteParams: r,
          callbackScope: i,
        });
      }),
      (Tween.fromTo = function fromTo(t, e, r) {
        return Wa(2, arguments);
      }),
      (Tween.set = function set(t, e) {
        return (
          (e.duration = 0),
          e.repeatDelay || (e.repeat = 0),
          new Tween(t, e)
        );
      }),
      (Tween.killTweensOf = function killTweensOf(t, e, r) {
        return I.killTweensOf(t, e, r);
      }),
      Tween
    );
  })(Nt);
  (ra(Jt.prototype, {
    _targets: [],
    _lazy: 0,
    _startAt: 0,
    _op: 0,
    _onInit: 0,
  }),
    ha("staggerTo,staggerFrom,staggerFromTo", function (r) {
      Jt[r] = function () {
        var t = new Qt(),
          e = kt.call(arguments, 0);
        return (
          e.splice("staggerFromTo" === r ? 5 : 4, 0, 0),
          t[r].apply(t, e)
        );
      };
    }));
  function pc(t, e, r) {
    return t.setAttribute(e, r);
  }
  function xc(t, e, r, i) {
    i.mSet(t, e, i.m.call(i.tween, r, i.mt), i);
  }
  var $t = function _setterPlain(t, e, r) {
      return (t[e] = r);
    },
    te = function _setterFunc(t, e, r) {
      return t[e](r);
    },
    re = function _setterFuncWithParam(t, e, r, i) {
      return t[e](i.fp, r);
    },
    ie = function _getSetter(t, e) {
      return s(t[e]) ? te : u(t[e]) && t.setAttribute ? pc : $t;
    },
    ne = function _renderPlain(t, e) {
      return e.set(e.t, e.p, Math.round(1e6 * (e.s + e.c * t)) / 1e6, e);
    },
    se = function _renderBoolean(t, e) {
      return e.set(e.t, e.p, !!(e.s + e.c * t), e);
    },
    oe = function _renderComplexString(t, e) {
      var r = e._pt,
        i = "";
      if (!t && e.b) i = e.b;
      else if (1 === t && e.e) i = e.e;
      else {
        for (; r; )
          ((i =
            r.p +
            (r.m
              ? r.m(r.s + r.c * t)
              : Math.round(1e4 * (r.s + r.c * t)) / 1e4) +
            i),
            (r = r._next));
        i += e.c;
      }
      e.set(e.t, e.p, i, e);
    },
    ue = function _renderPropTweens(t, e) {
      for (var r = e._pt; r; ) (r.r(t, r.d), (r = r._next));
    },
    he = function _addPluginModifier(t, e, r, i) {
      for (var n, a = this._pt; a; )
        ((n = a._next), a.p === i && a.modifier(t, e, r), (a = n));
    },
    de = function _killPropTweensOf(t) {
      for (var e, r, i = this._pt; i; )
        ((r = i._next),
          (i.p === t && !i.op) || i.op === t
            ? za(this, i, "_pt")
            : i.dep || (e = 1),
          (i = r));
      return !e;
    },
    _e = function _sortPropTweensByPriority(t) {
      for (var e, r, i, n, a = t._pt; a; ) {
        for (e = a._next, r = i; r && r.pr > a.pr; ) r = r._next;
        ((a._prev = r ? r._prev : n) ? (a._prev._next = a) : (i = a),
          (a._next = r) ? (r._prev = a) : (n = a),
          (a = e));
      }
      t._pt = i;
    },
    ge =
      ((PropTween.prototype.modifier = function modifier(t, e, r) {
        ((this.mSet = this.mSet || this.set),
          (this.set = xc),
          (this.m = t),
          (this.mt = r),
          (this.tween = e));
      }),
      PropTween);
  function PropTween(t, e, r, i, n, a, s, o, u) {
    ((this.t = e),
      (this.s = i),
      (this.c = n),
      (this.p = r),
      (this.r = a || ne),
      (this.d = s || this),
      (this.set = o || $t),
      (this.pr = u || 0),
      (this._next = t) && (t._prev = this));
  }
  (ha(
    vt +
      "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",
    function (t) {
      return (ft[t] = 1);
    },
  ),
    (ot.TweenMax = ot.TweenLite = Jt),
    (ot.TimelineLite = ot.TimelineMax = Qt),
    (I = new Qt({
      sortChildren: !1,
      defaults: Z,
      autoRemoveChildren: !0,
      id: "root",
      smoothChildTiming: !0,
    })),
    (X.stringFilter = Gb));
  function Fc(t) {
    return (be[t] || Me).map(function (t) {
      return t();
    });
  }
  function Gc() {
    var t = Date.now(),
      o = [];
    2 < t - Oe &&
      (Fc("matchMediaInit"),
      Te.forEach(function (t) {
        var e,
          r,
          i,
          n,
          a = t.queries,
          s = t.conditions;
        for (r in a)
          ((e = h.matchMedia(a[r]).matches) && (i = 1),
            e !== s[r] && ((s[r] = e), (n = 1)));
        n && (t.revert(), i && o.push(t));
      }),
      Fc("matchMediaRevert"),
      o.forEach(function (e) {
        return e.onMatch(e, function (t) {
          return e.add(null, t);
        });
      }),
      (Oe = t),
      Fc("matchMedia"));
  }
  var ve,
    Te = [],
    be = {},
    Me = [],
    Oe = 0,
    Ae = 0,
    Pe =
      (((ve = Context.prototype).add = function add(t, i, n) {
        function Iw() {
          var t,
            e = l,
            r = a.selector;
          return (
            e && e !== a && e.data.push(a),
            n && (a.selector = db(n)),
            (l = a),
            (t = i.apply(a, arguments)),
            s(t) && a._r.push(t),
            (l = e),
            (a.selector = r),
            (a.isReverted = !1),
            t
          );
        }
        s(t) && ((n = i), (i = t), (t = s));
        var a = this;
        return (
          (a.last = Iw),
          t === s
            ? Iw(a, function (t) {
                return a.add(null, t);
              })
            : t
              ? (a[t] = Iw)
              : Iw
        );
      }),
      (ve.ignore = function ignore(t) {
        var e = l;
        ((l = null), t(this), (l = e));
      }),
      (ve.getTweens = function getTweens() {
        var e = [];
        return (
          this.data.forEach(function (t) {
            return t instanceof Context
              ? e.push.apply(e, t.getTweens())
              : t instanceof Jt &&
                  !(t.parent && "nested" === t.parent.data) &&
                  e.push(t);
          }),
          e
        );
      }),
      (ve.clear = function clear() {
        this._r.length = this.data.length = 0;
      }),
      (ve.kill = function kill(i, t) {
        var n = this;
        if (
          (i
            ? (function () {
                for (var t, e = n.getTweens(), r = n.data.length; r--; )
                  "isFlip" === (t = n.data[r]).data &&
                    (t.revert(),
                    t.getChildren(!0, !0, !1).forEach(function (t) {
                      return e.splice(e.indexOf(t), 1);
                    }));
                for (
                  e
                    .map(function (t) {
                      return {
                        g:
                          t._dur ||
                          t._delay ||
                          (t._sat && !t._sat.vars.immediateRender)
                            ? t.globalTime(0)
                            : -1 / 0,
                        t: t,
                      };
                    })
                    .sort(function (t, e) {
                      return e.g - t.g || -1 / 0;
                    })
                    .forEach(function (t) {
                      return t.t.revert(i);
                    }),
                    r = n.data.length;
                  r--;
                )
                  (t = n.data[r]) instanceof Qt
                    ? "nested" !== t.data &&
                      (t.scrollTrigger && t.scrollTrigger.revert(), t.kill())
                    : t instanceof Jt || !t.revert || t.revert(i);
                (n._r.forEach(function (t) {
                  return t(i, n);
                }),
                  (n.isReverted = !0));
              })()
            : this.data.forEach(function (t) {
                return t.kill && t.kill();
              }),
          this.clear(),
          t)
        )
          for (var e = Te.length; e--; )
            Te[e].id === this.id && Te.splice(e, 1);
      }),
      (ve.revert = function revert(t) {
        this.kill(t || {});
      }),
      Context);
  function Context(t, e) {
    ((this.selector = e && db(e)),
      (this.data = []),
      (this._r = []),
      (this.isReverted = !1),
      (this.id = Ae++),
      t && this.add(t));
  }
  var Ce,
    Se =
      (((Ce = MatchMedia.prototype).add = function add(t, e, r) {
        v(t) || (t = { matches: t });
        var i,
          n,
          a,
          s = new Pe(0, r || this.scope),
          o = (s.conditions = {});
        for (n in (l && !s.selector && (s.selector = l.selector),
        this.contexts.push(s),
        (e = s.add("onMatch", e)),
        (s.queries = t)))
          "all" === n
            ? (a = 1)
            : (i = h.matchMedia(t[n])) &&
              (Te.indexOf(s) < 0 && Te.push(s),
              (o[n] = i.matches) && (a = 1),
              i.addListener
                ? i.addListener(Gc)
                : i.addEventListener("change", Gc));
        return (
          a &&
            e(s, function (t) {
              return s.add(null, t);
            }),
          this
        );
      }),
      (Ce.revert = function revert(t) {
        this.kill(t || {});
      }),
      (Ce.kill = function kill(e) {
        this.contexts.forEach(function (t) {
          return t.kill(e, !0);
        });
      }),
      MatchMedia);
  function MatchMedia(t) {
    ((this.contexts = []), (this.scope = t), l && l.data.push(this));
  }
  var De = {
    registerPlugin: function registerPlugin() {
      for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
        e[r] = arguments[r];
      e.forEach(function (t) {
        return xb(t);
      });
    },
    timeline: function timeline(t) {
      return new Qt(t);
    },
    getTweensOf: function getTweensOf(t, e) {
      return I.getTweensOf(t, e);
    },
    getProperty: function getProperty(i, t, e, n) {
      r(i) && (i = Ot(i)[0]);
      var a = fa(i || {}).get,
        s = e ? qa : pa;
      return (
        "native" === e && (e = ""),
        i
          ? t
            ? s(((pt[t] && pt[t].get) || a)(i, t, e, n))
            : function (t, e, r) {
                return s(((pt[t] && pt[t].get) || a)(i, t, e, r));
              }
          : i
      );
    },
    quickSetter: function quickSetter(r, e, i) {
      if (1 < (r = Ot(r)).length) {
        var n = r.map(function (t) {
            return ze.quickSetter(t, e, i);
          }),
          a = n.length;
        return function (t) {
          for (var e = a; e--; ) n[e](t);
        };
      }
      r = r[0] || {};
      var s = pt[e],
        o = fa(r),
        u = (o.harness && (o.harness.aliases || {})[e]) || e,
        h = s
          ? function (t) {
              var e = new s();
              ((d._pt = 0),
                e.init(r, i ? t + i : t, d, 0, [r]),
                e.render(1, e),
                d._pt && ue(1, d));
            }
          : o.set(r, u);
      return s
        ? h
        : function (t) {
            return h(r, u, i ? t + i : t, o, 1);
          };
    },
    quickTo: function quickTo(t, i, e) {
      function ay(t, e, r) {
        return n.resetTo(i, t, e, r);
      }
      var r,
        n = ze.to(
          t,
          ra(
            (((r = {})[i] = "+=0.1"), (r.paused = !0), (r.stagger = 0), r),
            e || {},
          ),
        );
      return ((ay.tween = n), ay);
    },
    isTweening: function isTweening(t) {
      return 0 < I.getTweensOf(t, !0).length;
    },
    defaults: function defaults(t) {
      return (t && t.ease && (t.ease = Yt(t.ease, Z.ease)), ua(Z, t || {}));
    },
    config: function config(t) {
      return ua(X, t || {});
    },
    registerEffect: function registerEffect(t) {
      var i = t.name,
        n = t.effect,
        e = t.plugins,
        a = t.defaults,
        r = t.extendTimeline;
      ((e || "").split(",").forEach(function (t) {
        return (
          t && !pt[t] && !ot[t] && R(i + " effect requires " + t + " plugin.")
        );
      }),
        (_t[i] = function (t, e, r) {
          return n(Ot(t), ra(e || {}, a), r);
        }),
        r &&
          (Qt.prototype[i] = function (t, e, r) {
            return this.add(_t[i](t, v(e) ? e : (r = e) && {}, this), r);
          }));
    },
    registerEase: function registerEase(t, e) {
      Lt[t] = Yt(e);
    },
    parseEase: function parseEase(t, e) {
      return arguments.length ? Yt(t, e) : Lt;
    },
    getById: function getById(t) {
      return I.getById(t);
    },
    exportRoot: function exportRoot(t, e) {
      void 0 === t && (t = {});
      var r,
        i,
        n = new Qt(t);
      for (
        n.smoothChildTiming = w(t.smoothChildTiming),
          I.remove(n),
          n._dp = 0,
          n._time = n._tTime = I._time,
          r = I._first;
        r;
      )
        ((i = r._next),
          (!e &&
            !r._dur &&
            r instanceof Jt &&
            r.vars.onComplete === r._targets[0]) ||
            La(n, r, r._start - r._delay),
          (r = i));
      return (La(I, n, 0), n);
    },
    context: function context(t, e) {
      return t ? new Pe(t, e) : l;
    },
    matchMedia: function matchMedia(t) {
      return new Se(t);
    },
    matchMediaRefresh: function matchMediaRefresh() {
      return (
        Te.forEach(function (t) {
          var e,
            r,
            i = t.conditions;
          for (r in i) i[r] && ((i[r] = !1), (e = 1));
          e && t.revert();
        }) || Gc()
      );
    },
    addEventListener: function addEventListener(t, e) {
      var r = be[t] || (be[t] = []);
      ~r.indexOf(e) || r.push(e);
    },
    removeEventListener: function removeEventListener(t, e) {
      var r = be[t],
        i = r && r.indexOf(e);
      0 <= i && r.splice(i, 1);
    },
    utils: {
      wrap: function wrap(e, t, r) {
        var i = t - e;
        return $(e)
          ? mb(e, wrap(0, e.length), t)
          : Xa(r, function (t) {
              return ((i + ((t - e) % i)) % i) + e;
            });
      },
      wrapYoyo: function wrapYoyo(e, t, r) {
        var i = t - e,
          n = 2 * i;
        return $(e)
          ? mb(e, wrapYoyo(0, e.length - 1), t)
          : Xa(r, function (t) {
              return e + (i < (t = (n + ((t - e) % n)) % n || 0) ? n - t : t);
            });
      },
      distribute: fb,
      random: ib,
      snap: hb,
      normalize: function normalize(t, e, r) {
        return At(t, e, 0, 1, r);
      },
      getUnit: Za,
      clamp: function clamp(e, r, t) {
        return Xa(t, function (t) {
          return Mt(e, r, t);
        });
      },
      splitColor: Bb,
      toArray: Ot,
      selector: db,
      mapRange: At,
      pipe: function pipe() {
        for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
          e[r] = arguments[r];
        return function (t) {
          return e.reduce(function (t, e) {
            return e(t);
          }, t);
        };
      },
      unitize: function unitize(e, r) {
        return function (t) {
          return e(parseFloat(t)) + (r || Za(t));
        };
      },
      interpolate: function interpolate(e, i, t, n) {
        var a = isNaN(e + i)
          ? 0
          : function (t) {
              return (1 - t) * e + t * i;
            };
        if (!a) {
          var s,
            o,
            u,
            h,
            l,
            f = r(e),
            d = {};
          if ((!0 === t && (n = 1) && (t = null), f))
            ((e = { p: e }), (i = { p: i }));
          else if ($(e) && !$(i)) {
            for (u = [], h = e.length, l = h - 2, o = 1; o < h; o++)
              u.push(interpolate(e[o - 1], e[o]));
            (h--,
              (a = function func(t) {
                t *= h;
                var e = Math.min(l, ~~t);
                return u[e](t - e);
              }),
              (t = i));
          } else n || (e = yt($(e) ? [] : {}, e));
          if (!u) {
            for (s in i) Vt.call(d, e, s, "get", i[s]);
            a = function func(t) {
              return ue(t, d) || (f ? e.p : e);
            };
          }
        }
        return Xa(t, a);
      },
      shuffle: eb,
    },
    install: P,
    effects: _t,
    ticker: Rt,
    updateRoot: Qt.updateRoot,
    plugins: pt,
    globalTimeline: I,
    core: {
      PropTween: ge,
      globals: S,
      Tween: Jt,
      Timeline: Qt,
      Animation: Nt,
      getCache: fa,
      _removeLinkedListItem: za,
      reverting: function reverting() {
        return L;
      },
      context: function context(t) {
        return (t && l && (l.data.push(t), (t._ctx = l)), l);
      },
      suppressOverwrites: function suppressOverwrites(t) {
        return (F = t);
      },
    },
  };
  (ha("to,from,fromTo,delayedCall,set,killTweensOf", function (t) {
    return (De[t] = Jt[t]);
  }),
    Rt.add(Qt.updateRoot),
    (d = De.to({}, { duration: 0 })));
  function Kc(t, e) {
    for (var r = t._pt; r && r.p !== e && r.op !== e && r.fp !== e; )
      r = r._next;
    return r;
  }
  function Mc(t, a) {
    return {
      name: t,
      headless: 1,
      rawVars: 1,
      init: function init(t, n, e) {
        e._onInit = function (t) {
          var e, i;
          if (
            (r(n) &&
              ((e = {}),
              ha(n, function (t) {
                return (e[t] = 1);
              }),
              (n = e)),
            a)
          ) {
            for (i in ((e = {}), n)) e[i] = a(n[i]);
            n = e;
          }
          !(function _addModifiers(t, e) {
            var r,
              i,
              n,
              a = t._targets;
            for (r in e)
              for (i = a.length; i--; )
                (n = (n = t._ptLookup[i][r]) && n.d) &&
                  (n._pt && (n = Kc(n, r)),
                  n && n.modifier && n.modifier(e[r], t, a[i], r));
          })(t, n);
        };
      },
    };
  }
  var ze =
    De.registerPlugin(
      {
        name: "attr",
        init: function init(t, e, r, i, n) {
          var a, s, o;
          for (a in ((this.tween = r), e))
            ((o = t.getAttribute(a) || ""),
              ((s = this.add(
                t,
                "setAttribute",
                (o || 0) + "",
                e[a],
                i,
                n,
                0,
                0,
                a,
              )).op = a),
              (s.b = o),
              this._props.push(a));
        },
        render: function render(t, e) {
          for (var r = e._pt; r; )
            (L ? r.set(r.t, r.p, r.b, r) : r.r(t, r.d), (r = r._next));
        },
      },
      {
        name: "endArray",
        headless: 1,
        init: function init(t, e) {
          for (var r = e.length; r--; )
            this.add(t, r, t[r] || 0, e[r], 0, 0, 0, 0, 0, 1);
        },
      },
      Mc("roundProps", gb),
      Mc("modifiers"),
      Mc("snap", hb),
    ) || De;
  ((Jt.version = Qt.version = ze.version = "3.13.0"), (o = 1), x() && Ft());
  function wd(t, e) {
    return e.set(e.t, e.p, Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e);
  }
  function xd(t, e) {
    return e.set(
      e.t,
      e.p,
      1 === t ? e.e : Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u,
      e,
    );
  }
  function yd(t, e) {
    return e.set(
      e.t,
      e.p,
      t ? Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u : e.b,
      e,
    );
  }
  function zd(t, e) {
    var r = e.s + e.c * t;
    e.set(e.t, e.p, ~~(r + (r < 0 ? -0.5 : 0.5)) + e.u, e);
  }
  function Ad(t, e) {
    return e.set(e.t, e.p, t ? e.e : e.b, e);
  }
  function Bd(t, e) {
    return e.set(e.t, e.p, 1 !== t ? e.b : e.e, e);
  }
  function Cd(t, e, r) {
    return (t.style[e] = r);
  }
  function Dd(t, e, r) {
    return t.style.setProperty(e, r);
  }
  function Ed(t, e, r) {
    return (t._gsap[e] = r);
  }
  function Fd(t, e, r) {
    return (t._gsap.scaleX = t._gsap.scaleY = r);
  }
  function Gd(t, e, r, i, n) {
    var a = t._gsap;
    ((a.scaleX = a.scaleY = r), a.renderTransform(n, a));
  }
  function Hd(t, e, r, i, n) {
    var a = t._gsap;
    ((a[e] = r), a.renderTransform(n, a));
  }
  function Kd(t, e) {
    var r = this,
      i = this.target,
      n = i.style,
      a = i._gsap;
    if (t in sr && n) {
      if (((this.tfm = this.tfm || {}), "transform" === t))
        return cr.transform.split(",").forEach(function (t) {
          return Kd.call(r, t, e);
        });
      if (
        (~(t = cr[t] || t).indexOf(",")
          ? t.split(",").forEach(function (t) {
              return (r.tfm[t] = Tr(i, t));
            })
          : (this.tfm[t] = a.x ? a[t] : Tr(i, t)),
        t === _r && (this.tfm.zOrigin = a.zOrigin),
        0 <= this.props.indexOf(pr))
      )
        return;
      (a.svg &&
        ((this.svgo = i.getAttribute("data-svg-origin")),
        this.props.push(_r, e, "")),
        (t = pr));
    }
    (n || e) && this.props.push(t, e, n[t]);
  }
  function Ld(t) {
    t.translate &&
      (t.removeProperty("translate"),
      t.removeProperty("scale"),
      t.removeProperty("rotate"));
  }
  function Md() {
    var t,
      e,
      r = this.props,
      i = this.target,
      n = i.style,
      a = i._gsap;
    for (t = 0; t < r.length; t += 3)
      r[t + 1]
        ? 2 === r[t + 1]
          ? i[r[t]](r[t + 2])
          : (i[r[t]] = r[t + 2])
        : r[t + 2]
          ? (n[r[t]] = r[t + 2])
          : n.removeProperty(
              "--" === r[t].substr(0, 2)
                ? r[t]
                : r[t].replace(lr, "-$1").toLowerCase(),
            );
    if (this.tfm) {
      for (e in this.tfm) a[e] = this.tfm[e];
      (a.svg &&
        (a.renderTransform(),
        i.setAttribute("data-svg-origin", this.svgo || "")),
        ((t = Ye()) && t.isStart) ||
          n[pr] ||
          (Ld(n),
          a.zOrigin &&
            n[_r] &&
            ((n[_r] += " " + a.zOrigin + "px"),
            (a.zOrigin = 0),
            a.renderTransform()),
          (a.uncache = 1)));
    }
  }
  function Nd(t, e) {
    var r = { target: t, props: [], revert: Md, save: Kd };
    return (
      t._gsap || ze.core.getCache(t),
      e &&
        t.style &&
        t.nodeType &&
        e.split(",").forEach(function (t) {
          return r.save(t);
        }),
      r
    );
  }
  function Pd(t, e) {
    var r = Re.createElementNS
      ? Re.createElementNS(
          (e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"),
          t,
        )
      : Re.createElement(t);
    return r && r.style ? r : Re.createElement(t);
  }
  function Qd(t, e, r) {
    var i = getComputedStyle(t);
    return (
      i[e] ||
      i.getPropertyValue(e.replace(lr, "-$1").toLowerCase()) ||
      i.getPropertyValue(e) ||
      (!r && Qd(t, gr(e) || e, 1)) ||
      ""
    );
  }
  function Td() {
    (function _windowExists() {
      return "undefined" != typeof window;
    })() &&
      window.document &&
      ((Ee = window),
      (Re = Ee.document),
      (Fe = Re.documentElement),
      (Ie = Pd("div") || { style: {} }),
      Pd("div"),
      (pr = gr(pr)),
      (_r = pr + "Origin"),
      (Ie.style.cssText =
        "border-width:0;line-height:0;position:absolute;padding:0"),
      (Xe = !!gr("perspective")),
      (Ye = ze.core.reverting),
      (Le = 1));
  }
  function Ud(t) {
    var e,
      r = t.ownerSVGElement,
      i = Pd(
        "svg",
        (r && r.getAttribute("xmlns")) || "http://www.w3.org/2000/svg",
      ),
      n = t.cloneNode(!0);
    ((n.style.display = "block"), i.appendChild(n), Fe.appendChild(i));
    try {
      e = n.getBBox();
    } catch (t) {}
    return (i.removeChild(n), Fe.removeChild(i), e);
  }
  function Vd(t, e) {
    for (var r = e.length; r--; )
      if (t.hasAttribute(e[r])) return t.getAttribute(e[r]);
  }
  function Wd(e) {
    var r, i;
    try {
      r = e.getBBox();
    } catch (t) {
      ((r = Ud(e)), (i = 1));
    }
    return (
      (r && (r.width || r.height)) || i || (r = Ud(e)),
      !r || r.width || r.x || r.y
        ? r
        : {
            x: +Vd(e, ["x", "cx", "x1"]) || 0,
            y: +Vd(e, ["y", "cy", "y1"]) || 0,
            width: 0,
            height: 0,
          }
    );
  }
  function Xd(t) {
    return !(!t.getCTM || (t.parentNode && !t.ownerSVGElement) || !Wd(t));
  }
  function Yd(t, e) {
    if (e) {
      var r,
        i = t.style;
      (e in sr && e !== _r && (e = pr),
        i.removeProperty
          ? (("ms" !== (r = e.substr(0, 2)) && "webkit" !== e.substr(0, 6)) ||
              (e = "-" + e),
            i.removeProperty(
              "--" === r ? e : e.replace(lr, "-$1").toLowerCase(),
            ))
          : i.removeAttribute(e));
    }
  }
  function Zd(t, e, r, i, n, a) {
    var s = new ge(t._pt, e, r, 0, 1, a ? Bd : Ad);
    return (((t._pt = s).b = i), (s.e = n), t._props.push(r), s);
  }
  function ae(t, e, r, i) {
    var n,
      a,
      s,
      o,
      u = parseFloat(r) || 0,
      h = (r + "").trim().substr((u + "").length) || "px",
      l = Ie.style,
      f = fr.test(e),
      d = "svg" === t.tagName.toLowerCase(),
      c = (d ? "client" : "offset") + (f ? "Width" : "Height"),
      p = "px" === i,
      _ = "%" === i;
    if (i === h || !u || vr[i] || vr[h]) return u;
    if (
      ("px" === h || p || (u = ae(t, e, r, "px")),
      (o = t.getCTM && Xd(t)),
      (_ || "%" === h) && (sr[e] || ~e.indexOf("adius")))
    )
      return (
        (n = o ? t.getBBox()[f ? "width" : "height"] : t[c]),
        ia(_ ? (u / n) * 100 : (u / 100) * n)
      );
    if (
      ((l[f ? "width" : "height"] = 100 + (p ? h : i)),
      (a =
        ("rem" !== i && ~e.indexOf("adius")) ||
        ("em" === i && t.appendChild && !d)
          ? t
          : t.parentNode),
      o && (a = (t.ownerSVGElement || {}).parentNode),
      (a && a !== Re && a.appendChild) || (a = Re.body),
      (s = a._gsap) && _ && s.width && f && s.time === Rt.time && !s.uncache)
    )
      return ia((u / s.width) * 100);
    if (!_ || ("height" !== e && "width" !== e))
      ((!_ && "%" !== h) ||
        yr[Qd(a, "display")] ||
        (l.position = Qd(t, "position")),
        a === t && (l.position = "static"),
        a.appendChild(Ie),
        (n = Ie[c]),
        a.removeChild(Ie),
        (l.position = "absolute"));
    else {
      var m = t.style[e];
      ((t.style[e] = 100 + i), (n = t[c]), m ? (t.style[e] = m) : Yd(t, e));
    }
    return (
      f && _ && (((s = fa(a)).time = Rt.time), (s.width = a[c])),
      ia(p ? (n * u) / 100 : n && u ? (100 / n) * u : 0)
    );
  }
  function ce(t, e, r, i) {
    if (!r || "none" === r) {
      var n = gr(e, t, 1),
        a = n && Qd(t, n, 1);
      a && a !== r
        ? ((e = n), (r = a))
        : "borderColor" === e && (r = Qd(t, "borderTopColor"));
    }
    var s,
      o,
      u,
      h,
      l,
      f,
      d,
      c,
      p,
      _,
      m,
      g = new ge(this._pt, t.style, e, 0, 1, oe),
      v = 0,
      y = 0;
    if (
      ((g.b = r),
      (g.e = i),
      (r += ""),
      "var(--" === (i += "").substring(0, 6) &&
        (i = Qd(t, i.substring(4, i.indexOf(")")))),
      "auto" === i &&
        ((f = t.style[e]),
        (t.style[e] = i),
        (i = Qd(t, e) || i),
        f ? (t.style[e] = f) : Yd(t, e)),
      Gb((s = [r, i])),
      (i = s[1]),
      (u = (r = s[0]).match(rt) || []),
      (i.match(rt) || []).length)
    ) {
      for (; (o = rt.exec(i)); )
        ((d = o[0]),
          (p = i.substring(v, o.index)),
          l
            ? (l = (l + 1) % 5)
            : ("rgba(" !== p.substr(-5) && "hsla(" !== p.substr(-5)) || (l = 1),
          d !== (f = u[y++] || "") &&
            ((h = parseFloat(f) || 0),
            (m = f.substr((h + "").length)),
            "=" === d.charAt(1) && (d = ka(h, d) + m),
            (c = parseFloat(d)),
            (_ = d.substr((c + "").length)),
            (v = rt.lastIndex - _.length),
            _ ||
              ((_ = _ || X.units[e] || m),
              v === i.length && ((i += _), (g.e += _))),
            m !== _ && (h = ae(t, e, f, _) || 0),
            (g._pt = {
              _next: g._pt,
              p: p || 1 === y ? p : ",",
              s: h,
              c: c - h,
              m: (l && l < 4) || "zIndex" === e ? Math.round : 0,
            })));
      g.c = v < i.length ? i.substring(v, i.length) : "";
    } else g.r = "display" === e && "none" === i ? Bd : Ad;
    return (nt.test(i) && (g.e = 0), (this._pt = g));
  }
  function ee(t) {
    var e = t.split(" "),
      r = e[0],
      i = e[1] || "50%";
    return (
      ("top" !== r && "bottom" !== r && "left" !== i && "right" !== i) ||
        ((t = r), (r = i), (i = t)),
      (e[0] = br[r] || r),
      (e[1] = br[i] || i),
      e.join(" ")
    );
  }
  function fe(t, e) {
    if (e.tween && e.tween._time === e.tween._dur) {
      var r,
        i,
        n,
        a = e.t,
        s = a.style,
        o = e.u,
        u = a._gsap;
      if ("all" === o || !0 === o) ((s.cssText = ""), (i = 1));
      else
        for (n = (o = o.split(",")).length; -1 < --n; )
          ((r = o[n]),
            sr[r] && ((i = 1), (r = "transformOrigin" === r ? _r : pr)),
            Yd(a, r));
      i &&
        (Yd(a, pr),
        u &&
          (u.svg && a.removeAttribute("transform"),
          (s.scale = s.rotate = s.translate = "none"),
          kr(a, 1),
          (u.uncache = 1),
          Ld(s)));
    }
  }
  function je(t) {
    return "matrix(1, 0, 0, 1, 0, 0)" === t || "none" === t || !t;
  }
  function ke(t) {
    var e = Qd(t, pr);
    return je(e) ? xr : e.substr(7).match(et).map(ia);
  }
  function le(t, e) {
    var r,
      i,
      n,
      a,
      s = t._gsap || fa(t),
      o = t.style,
      u = ke(t);
    return s.svg && t.getAttribute("transform")
      ? "1,0,0,1,0,0" ===
        (u = [
          (n = t.transform.baseVal.consolidate().matrix).a,
          n.b,
          n.c,
          n.d,
          n.e,
          n.f,
        ]).join(",")
        ? xr
        : u
      : (u !== xr ||
          t.offsetParent ||
          t === Fe ||
          s.svg ||
          ((n = o.display),
          (o.display = "block"),
          ((r = t.parentNode) &&
            (t.offsetParent || t.getBoundingClientRect().width)) ||
            ((a = 1), (i = t.nextElementSibling), Fe.appendChild(t)),
          (u = ke(t)),
          n ? (o.display = n) : Yd(t, "display"),
          a &&
            (i
              ? r.insertBefore(t, i)
              : r
                ? r.appendChild(t)
                : Fe.removeChild(t))),
        e && 6 < u.length ? [u[0], u[1], u[4], u[5], u[12], u[13]] : u);
  }
  function me(t, e, r, i, n, a) {
    var s,
      o,
      u,
      h = t._gsap,
      l = n || le(t, !0),
      f = h.xOrigin || 0,
      d = h.yOrigin || 0,
      c = h.xOffset || 0,
      p = h.yOffset || 0,
      _ = l[0],
      m = l[1],
      g = l[2],
      v = l[3],
      y = l[4],
      T = l[5],
      b = e.split(" "),
      w = parseFloat(b[0]) || 0,
      x = parseFloat(b[1]) || 0;
    (r
      ? l !== xr &&
        (o = _ * v - m * g) &&
        ((u = w * (-m / o) + x * (_ / o) - (_ * T - m * y) / o),
        (w = w * (v / o) + x * (-g / o) + (g * T - v * y) / o),
        (x = u))
      : ((w = (s = Wd(t)).x + (~b[0].indexOf("%") ? (w / 100) * s.width : w)),
        (x = s.y + (~(b[1] || b[0]).indexOf("%") ? (x / 100) * s.height : x))),
      i || (!1 !== i && h.smooth)
        ? ((y = w - f),
          (T = x - d),
          (h.xOffset = c + (y * _ + T * g) - y),
          (h.yOffset = p + (y * m + T * v) - T))
        : (h.xOffset = h.yOffset = 0),
      (h.xOrigin = w),
      (h.yOrigin = x),
      (h.smooth = !!i),
      (h.origin = e),
      (h.originIsAbsolute = !!r),
      (t.style[_r] = "0px 0px"),
      a &&
        (Zd(a, h, "xOrigin", f, w),
        Zd(a, h, "yOrigin", d, x),
        Zd(a, h, "xOffset", c, h.xOffset),
        Zd(a, h, "yOffset", p, h.yOffset)),
      t.setAttribute("data-svg-origin", w + " " + x));
  }
  function pe(t, e, r) {
    var i = Za(e);
    return ia(parseFloat(e) + parseFloat(ae(t, "x", r + "px", i))) + i;
  }
  function we(t, e, i, n, a) {
    var s,
      o,
      u = 360,
      h = r(a),
      l = parseFloat(a) * (h && ~a.indexOf("rad") ? or : 1) - n,
      f = n + l + "deg";
    return (
      h &&
        ("short" === (s = a.split("_")[1]) &&
          (l %= u) !== l % 180 &&
          (l += l < 0 ? u : -u),
        "cw" === s && l < 0
          ? (l = ((l + 36e9) % u) - ~~(l / u) * u)
          : "ccw" === s && 0 < l && (l = ((l - 36e9) % u) - ~~(l / u) * u)),
      (t._pt = o = new ge(t._pt, e, i, n, l, xd)),
      (o.e = f),
      (o.u = "deg"),
      t._props.push(i),
      o
    );
  }
  function xe(t, e) {
    for (var r in e) t[r] = e[r];
    return t;
  }
  function ye(t, e, r) {
    var i,
      n,
      a,
      s,
      o,
      u,
      h,
      l = xe({}, r._gsap),
      f = r.style;
    for (n in (l.svg
      ? ((a = r.getAttribute("transform")),
        r.setAttribute("transform", ""),
        (f[pr] = e),
        (i = kr(r, 1)),
        Yd(r, pr),
        r.setAttribute("transform", a))
      : ((a = getComputedStyle(r)[pr]),
        (f[pr] = e),
        (i = kr(r, 1)),
        (f[pr] = a)),
    sr))
      (a = l[n]) !== (s = i[n]) &&
        "perspective,force3D,transformOrigin,svgOrigin".indexOf(n) < 0 &&
        ((o = Za(a) !== (h = Za(s)) ? ae(r, n, a, h) : parseFloat(a)),
        (u = parseFloat(s)),
        (t._pt = new ge(t._pt, i, n, o, u - o, wd)),
        (t._pt.u = h || 0),
        t._props.push(n));
    xe(i, l);
  }
  var Ee,
    Re,
    Fe,
    Le,
    Ie,
    Be,
    Ye,
    Xe,
    Ze = Lt.Power0,
    Ne = Lt.Power1,
    Qe = Lt.Power2,
    Ue = Lt.Power3,
    qe = Lt.Power4,
    Ve = Lt.Linear,
    We = Lt.Quad,
    Ge = Lt.Cubic,
    He = Lt.Quart,
    Ke = Lt.Quint,
    Je = Lt.Strong,
    $e = Lt.Elastic,
    tr = Lt.Back,
    er = Lt.SteppedEase,
    rr = Lt.Bounce,
    ir = Lt.Sine,
    nr = Lt.Expo,
    ar = Lt.Circ,
    sr = {},
    or = 180 / Math.PI,
    ur = Math.PI / 180,
    hr = Math.atan2,
    lr = /([A-Z])/g,
    fr = /(left|right|width|margin|padding|x)/i,
    dr = /[\s,\(]\S/,
    cr = {
      autoAlpha: "opacity,visibility",
      scale: "scaleX,scaleY",
      alpha: "opacity",
    },
    pr = "transform",
    _r = pr + "Origin",
    mr = "O,Moz,ms,Ms,Webkit".split(","),
    gr = function _checkPropPrefix(t, e, r) {
      var i = (e || Ie).style,
        n = 5;
      if (t in i && !r) return t;
      for (
        t = t.charAt(0).toUpperCase() + t.substr(1);
        n-- && !(mr[n] + t in i);
      );
      return n < 0 ? null : (3 === n ? "ms" : 0 <= n ? mr[n] : "") + t;
    },
    vr = { deg: 1, rad: 1, turn: 1 },
    yr = { grid: 1, flex: 1 },
    Tr = function _get(t, e, r, i) {
      var n;
      return (
        Le || Td(),
        e in cr &&
          "transform" !== e &&
          ~(e = cr[e]).indexOf(",") &&
          (e = e.split(",")[0]),
        sr[e] && "transform" !== e
          ? ((n = kr(t, i)),
            (n =
              "transformOrigin" !== e
                ? n[e]
                : n.svg
                  ? n.origin
                  : Or(Qd(t, _r)) + " " + n.zOrigin + "px"))
          : ((n = t.style[e]) &&
              "auto" !== n &&
              !i &&
              !~(n + "").indexOf("calc(")) ||
            (n =
              (wr[e] && wr[e](t, e, r)) ||
              Qd(t, e) ||
              ga(t, e) ||
              ("opacity" === e ? 1 : 0)),
        r && !~(n + "").trim().indexOf(" ") ? ae(t, e, n, r) + r : n
      );
    },
    br = {
      top: "0%",
      bottom: "100%",
      left: "0%",
      right: "100%",
      center: "50%",
    },
    wr = {
      clearProps: function clearProps(t, e, r, i, n) {
        if ("isFromStart" !== n.data) {
          var a = (t._pt = new ge(t._pt, e, r, 0, 0, fe));
          return ((a.u = i), (a.pr = -10), (a.tween = n), t._props.push(r), 1);
        }
      },
    },
    xr = [1, 0, 0, 1, 0, 0],
    Mr = {},
    kr = function _parseTransform(t, e) {
      var r = t._gsap || new Zt(t);
      if ("x" in r && !e && !r.uncache) return r;
      var i,
        n,
        a,
        s,
        o,
        u,
        h,
        l,
        f,
        d,
        c,
        p,
        _,
        m,
        g,
        v,
        y,
        T,
        b,
        w,
        x,
        M,
        k,
        O,
        A,
        P,
        C,
        S,
        D,
        z,
        E,
        R,
        F = t.style,
        L = r.scaleX < 0,
        I = "deg",
        B = getComputedStyle(t),
        j = Qd(t, _r) || "0";
      return (
        (i = n = a = u = h = l = f = d = c = 0),
        (s = o = 1),
        (r.svg = !(!t.getCTM || !Xd(t))),
        B.translate &&
          (("none" === B.translate &&
            "none" === B.scale &&
            "none" === B.rotate) ||
            (F[pr] =
              ("none" !== B.translate
                ? "translate3d(" +
                  (B.translate + " 0 0").split(" ").slice(0, 3).join(", ") +
                  ") "
                : "") +
              ("none" !== B.rotate ? "rotate(" + B.rotate + ") " : "") +
              ("none" !== B.scale
                ? "scale(" + B.scale.split(" ").join(",") + ") "
                : "") +
              ("none" !== B[pr] ? B[pr] : "")),
          (F.scale = F.rotate = F.translate = "none")),
        (m = le(t, r.svg)),
        r.svg &&
          ((O = r.uncache
            ? ((A = t.getBBox()),
              (j = r.xOrigin - A.x + "px " + (r.yOrigin - A.y) + "px"),
              "")
            : !e && t.getAttribute("data-svg-origin")),
          me(t, O || j, !!O || r.originIsAbsolute, !1 !== r.smooth, m)),
        (p = r.xOrigin || 0),
        (_ = r.yOrigin || 0),
        m !== xr &&
          ((T = m[0]),
          (b = m[1]),
          (w = m[2]),
          (x = m[3]),
          (i = M = m[4]),
          (n = k = m[5]),
          6 === m.length
            ? ((s = Math.sqrt(T * T + b * b)),
              (o = Math.sqrt(x * x + w * w)),
              (u = T || b ? hr(b, T) * or : 0),
              (f = w || x ? hr(w, x) * or + u : 0) &&
                (o *= Math.abs(Math.cos(f * ur))),
              r.svg && ((i -= p - (p * T + _ * w)), (n -= _ - (p * b + _ * x))))
            : ((R = m[6]),
              (z = m[7]),
              (C = m[8]),
              (S = m[9]),
              (D = m[10]),
              (E = m[11]),
              (i = m[12]),
              (n = m[13]),
              (a = m[14]),
              (h = (g = hr(R, D)) * or),
              g &&
                ((O = M * (v = Math.cos(-g)) + C * (y = Math.sin(-g))),
                (A = k * v + S * y),
                (P = R * v + D * y),
                (C = M * -y + C * v),
                (S = k * -y + S * v),
                (D = R * -y + D * v),
                (E = z * -y + E * v),
                (M = O),
                (k = A),
                (R = P)),
              (l = (g = hr(-w, D)) * or),
              g &&
                ((v = Math.cos(-g)),
                (E = x * (y = Math.sin(-g)) + E * v),
                (T = O = T * v - C * y),
                (b = A = b * v - S * y),
                (w = P = w * v - D * y)),
              (u = (g = hr(b, T)) * or),
              g &&
                ((O = T * (v = Math.cos(g)) + b * (y = Math.sin(g))),
                (A = M * v + k * y),
                (b = b * v - T * y),
                (k = k * v - M * y),
                (T = O),
                (M = A)),
              h &&
                359.9 < Math.abs(h) + Math.abs(u) &&
                ((h = u = 0), (l = 180 - l)),
              (s = ia(Math.sqrt(T * T + b * b + w * w))),
              (o = ia(Math.sqrt(k * k + R * R))),
              (g = hr(M, k)),
              (f = 2e-4 < Math.abs(g) ? g * or : 0),
              (c = E ? 1 / (E < 0 ? -E : E) : 0)),
          r.svg &&
            ((O = t.getAttribute("transform")),
            (r.forceCSS = t.setAttribute("transform", "") || !je(Qd(t, pr))),
            O && t.setAttribute("transform", O))),
        90 < Math.abs(f) &&
          Math.abs(f) < 270 &&
          (L
            ? ((s *= -1),
              (f += u <= 0 ? 180 : -180),
              (u += u <= 0 ? 180 : -180))
            : ((o *= -1), (f += f <= 0 ? 180 : -180))),
        (e = e || r.uncache),
        (r.x =
          i -
          ((r.xPercent =
            i &&
            ((!e && r.xPercent) ||
              (Math.round(t.offsetWidth / 2) === Math.round(-i) ? -50 : 0)))
            ? (t.offsetWidth * r.xPercent) / 100
            : 0) +
          "px"),
        (r.y =
          n -
          ((r.yPercent =
            n &&
            ((!e && r.yPercent) ||
              (Math.round(t.offsetHeight / 2) === Math.round(-n) ? -50 : 0)))
            ? (t.offsetHeight * r.yPercent) / 100
            : 0) +
          "px"),
        (r.z = a + "px"),
        (r.scaleX = ia(s)),
        (r.scaleY = ia(o)),
        (r.rotation = ia(u) + I),
        (r.rotationX = ia(h) + I),
        (r.rotationY = ia(l) + I),
        (r.skewX = f + I),
        (r.skewY = d + I),
        (r.transformPerspective = c + "px"),
        (r.zOrigin = parseFloat(j.split(" ")[2]) || (!e && r.zOrigin) || 0) &&
          (F[_r] = Or(j)),
        (r.xOffset = r.yOffset = 0),
        (r.force3D = X.force3D),
        (r.renderTransform = r.svg ? zr : Xe ? Dr : Ar),
        (r.uncache = 0),
        r
      );
    },
    Or = function _firstTwoOnly(t) {
      return (t = t.split(" "))[0] + " " + t[1];
    },
    Ar = function _renderNon3DTransforms(t, e) {
      ((e.z = "0px"),
        (e.rotationY = e.rotationX = "0deg"),
        (e.force3D = 0),
        Dr(t, e));
    },
    Pr = "0deg",
    Cr = "0px",
    Sr = ") ",
    Dr = function _renderCSSTransforms(t, e) {
      var r = e || this,
        i = r.xPercent,
        n = r.yPercent,
        a = r.x,
        s = r.y,
        o = r.z,
        u = r.rotation,
        h = r.rotationY,
        l = r.rotationX,
        f = r.skewX,
        d = r.skewY,
        c = r.scaleX,
        p = r.scaleY,
        _ = r.transformPerspective,
        m = r.force3D,
        g = r.target,
        v = r.zOrigin,
        y = "",
        T = ("auto" === m && t && 1 !== t) || !0 === m;
      if (v && (l !== Pr || h !== Pr)) {
        var b,
          w = parseFloat(h) * ur,
          x = Math.sin(w),
          M = Math.cos(w);
        ((w = parseFloat(l) * ur),
          (b = Math.cos(w)),
          (a = pe(g, a, x * b * -v)),
          (s = pe(g, s, -Math.sin(w) * -v)),
          (o = pe(g, o, M * b * -v + v)));
      }
      (_ !== Cr && (y += "perspective(" + _ + Sr),
        (i || n) && (y += "translate(" + i + "%, " + n + "%) "),
        (!T && a === Cr && s === Cr && o === Cr) ||
          (y +=
            o !== Cr || T
              ? "translate3d(" + a + ", " + s + ", " + o + ") "
              : "translate(" + a + ", " + s + Sr),
        u !== Pr && (y += "rotate(" + u + Sr),
        h !== Pr && (y += "rotateY(" + h + Sr),
        l !== Pr && (y += "rotateX(" + l + Sr),
        (f === Pr && d === Pr) || (y += "skew(" + f + ", " + d + Sr),
        (1 === c && 1 === p) || (y += "scale(" + c + ", " + p + Sr),
        (g.style[pr] = y || "translate(0, 0)"));
    },
    zr = function _renderSVGTransforms(t, e) {
      var r,
        i,
        n,
        a,
        s,
        o = e || this,
        u = o.xPercent,
        h = o.yPercent,
        l = o.x,
        f = o.y,
        d = o.rotation,
        c = o.skewX,
        p = o.skewY,
        _ = o.scaleX,
        m = o.scaleY,
        g = o.target,
        v = o.xOrigin,
        y = o.yOrigin,
        T = o.xOffset,
        b = o.yOffset,
        w = o.forceCSS,
        x = parseFloat(l),
        M = parseFloat(f);
      ((d = parseFloat(d)),
        (c = parseFloat(c)),
        (p = parseFloat(p)) && ((c += p = parseFloat(p)), (d += p)),
        d || c
          ? ((d *= ur),
            (c *= ur),
            (r = Math.cos(d) * _),
            (i = Math.sin(d) * _),
            (n = Math.sin(d - c) * -m),
            (a = Math.cos(d - c) * m),
            c &&
              ((p *= ur),
              (s = Math.tan(c - p)),
              (n *= s = Math.sqrt(1 + s * s)),
              (a *= s),
              p &&
                ((s = Math.tan(p)), (r *= s = Math.sqrt(1 + s * s)), (i *= s))),
            (r = ia(r)),
            (i = ia(i)),
            (n = ia(n)),
            (a = ia(a)))
          : ((r = _), (a = m), (i = n = 0)),
        ((x && !~(l + "").indexOf("px")) || (M && !~(f + "").indexOf("px"))) &&
          ((x = ae(g, "x", l, "px")), (M = ae(g, "y", f, "px"))),
        (v || y || T || b) &&
          ((x = ia(x + v - (v * r + y * n) + T)),
          (M = ia(M + y - (v * i + y * a) + b))),
        (u || h) &&
          ((s = g.getBBox()),
          (x = ia(x + (u / 100) * s.width)),
          (M = ia(M + (h / 100) * s.height))),
        (s =
          "matrix(" +
          r +
          "," +
          i +
          "," +
          n +
          "," +
          a +
          "," +
          x +
          "," +
          M +
          ")"),
        g.setAttribute("transform", s),
        w && (g.style[pr] = s));
    };
  ha("padding,margin,Width,Radius", function (e, r) {
    var t = "Right",
      i = "Bottom",
      n = "Left",
      o = (r < 3 ? ["Top", t, i, n] : ["Top" + n, "Top" + t, i + t, i + n]).map(
        function (t) {
          return r < 2 ? e + t : "border" + t + e;
        },
      );
    wr[1 < r ? "border" + e : e] = function (e, t, r, i, n) {
      var a, s;
      if (arguments.length < 4)
        return (
          (a = o.map(function (t) {
            return Tr(e, t, r);
          })),
          5 === (s = a.join(" ")).split(a[0]).length ? a[0] : s
        );
      ((a = (i + "").split(" ")),
        (s = {}),
        o.forEach(function (t, e) {
          return (s[t] = a[e] = a[e] || a[((e - 1) / 2) | 0]);
        }),
        e.init(t, s, n));
    };
  });
  var Er,
    Rr,
    Fr,
    Lr = {
      name: "css",
      register: Td,
      targetTest: function targetTest(t) {
        return t.style && t.nodeType;
      },
      init: function init(t, e, i, n, a) {
        var s,
          o,
          u,
          h,
          l,
          f,
          d,
          c,
          p,
          _,
          m,
          g,
          v,
          y,
          T,
          b,
          w = this._props,
          x = t.style,
          M = i.vars.startAt;
        for (d in (Le || Td(),
        (this.styles = this.styles || Nd(t)),
        (b = this.styles.props),
        (this.tween = i),
        e))
          if (
            "autoRound" !== d &&
            ((o = e[d]), !pt[d] || !bc(d, e, i, n, t, a))
          )
            if (
              ((l = typeof o),
              (f = wr[d]),
              "function" === l && (l = typeof (o = o.call(i, n, t, a))),
              "string" === l && ~o.indexOf("random(") && (o = pb(o)),
              f)
            )
              f(this, t, d, o, i) && (T = 1);
            else if ("--" === d.substr(0, 2))
              ((s = (getComputedStyle(t).getPropertyValue(d) + "").trim()),
                (o += ""),
                (zt.lastIndex = 0),
                zt.test(s) || ((c = Za(s)), (p = Za(o))),
                p ? c !== p && (s = ae(t, d, s, p) + p) : c && (o += c),
                this.add(x, "setProperty", s, o, n, a, 0, 0, d),
                w.push(d),
                b.push(d, 0, x[d]));
            else if ("undefined" !== l) {
              if (
                (M && d in M
                  ? ((s =
                      "function" == typeof M[d] ? M[d].call(i, n, t, a) : M[d]),
                    r(s) && ~s.indexOf("random(") && (s = pb(s)),
                    Za(s + "") ||
                      "auto" === s ||
                      (s += X.units[d] || Za(Tr(t, d)) || ""),
                    "=" === (s + "").charAt(1) && (s = Tr(t, d)))
                  : (s = Tr(t, d)),
                (h = parseFloat(s)),
                (_ = "string" === l && "=" === o.charAt(1) && o.substr(0, 2)) &&
                  (o = o.substr(2)),
                (u = parseFloat(o)),
                d in cr &&
                  ("autoAlpha" === d &&
                    (1 === h &&
                      "hidden" === Tr(t, "visibility") &&
                      u &&
                      (h = 0),
                    b.push("visibility", 0, x.visibility),
                    Zd(
                      this,
                      x,
                      "visibility",
                      h ? "inherit" : "hidden",
                      u ? "inherit" : "hidden",
                      !u,
                    )),
                  "scale" !== d &&
                    "transform" !== d &&
                    ~(d = cr[d]).indexOf(",") &&
                    (d = d.split(",")[0])),
                (m = d in sr))
              )
                if (
                  (this.styles.save(d),
                  "string" === l &&
                    "var(--" === o.substring(0, 6) &&
                    ((o = Qd(t, o.substring(4, o.indexOf(")")))),
                    (u = parseFloat(o))),
                  g ||
                    (((v = t._gsap).renderTransform && !e.parseTransform) ||
                      kr(t, e.parseTransform),
                    (y = !1 !== e.smoothOrigin && v.smooth),
                    ((g = this._pt =
                      new ge(
                        this._pt,
                        x,
                        pr,
                        0,
                        1,
                        v.renderTransform,
                        v,
                        0,
                        -1,
                      )).dep = 1)),
                  "scale" === d)
                )
                  ((this._pt = new ge(
                    this._pt,
                    v,
                    "scaleY",
                    v.scaleY,
                    (_ ? ka(v.scaleY, _ + u) : u) - v.scaleY || 0,
                    wd,
                  )),
                    (this._pt.u = 0),
                    w.push("scaleY", d),
                    (d += "X"));
                else {
                  if ("transformOrigin" === d) {
                    (b.push(_r, 0, x[_r]),
                      (o = ee(o)),
                      v.svg
                        ? me(t, o, 0, y, 0, this)
                        : ((p = parseFloat(o.split(" ")[2]) || 0) !==
                            v.zOrigin && Zd(this, v, "zOrigin", v.zOrigin, p),
                          Zd(this, x, d, Or(s), Or(o))));
                    continue;
                  }
                  if ("svgOrigin" === d) {
                    me(t, o, 1, y, 0, this);
                    continue;
                  }
                  if (d in Mr) {
                    we(this, v, d, h, _ ? ka(h, _ + o) : o);
                    continue;
                  }
                  if ("smoothOrigin" === d) {
                    Zd(this, v, "smooth", v.smooth, o);
                    continue;
                  }
                  if ("force3D" === d) {
                    v[d] = o;
                    continue;
                  }
                  if ("transform" === d) {
                    ye(this, o, t);
                    continue;
                  }
                }
              else d in x || (d = gr(d) || d);
              if (
                m ||
                ((u || 0 === u) && (h || 0 === h) && !dr.test(o) && d in x)
              )
                ((u = u || 0),
                  (c = (s + "").substr((h + "").length)) !==
                    (p = Za(o) || (d in X.units ? X.units[d] : c)) &&
                    (h = ae(t, d, s, p)),
                  (this._pt = new ge(
                    this._pt,
                    m ? v : x,
                    d,
                    h,
                    (_ ? ka(h, _ + u) : u) - h,
                    m || ("px" !== p && "zIndex" !== d) || !1 === e.autoRound
                      ? wd
                      : zd,
                  )),
                  (this._pt.u = p || 0),
                  c !== p &&
                    "%" !== p &&
                    ((this._pt.b = s), (this._pt.r = yd)));
              else if (d in x) ce.call(this, t, d, s, _ ? _ + o : o);
              else if (d in t) this.add(t, d, s || t[d], _ ? _ + o : o, n, a);
              else if ("parseTransform" !== d) {
                Q(d, o);
                continue;
              }
              (m ||
                (d in x
                  ? b.push(d, 0, x[d])
                  : "function" == typeof t[d]
                    ? b.push(d, 2, t[d]())
                    : b.push(d, 1, s || t[d])),
                w.push(d));
            }
        T && _e(this);
      },
      render: function render(t, e) {
        if (e.tween._time || !Ye())
          for (var r = e._pt; r; ) (r.r(t, r.d), (r = r._next));
        else e.styles.revert();
      },
      get: Tr,
      aliases: cr,
      getSetter: function getSetter(t, e, r) {
        var i = cr[e];
        return (
          i && i.indexOf(",") < 0 && (e = i),
          e in sr && e !== _r && (t._gsap.x || Tr(t, "x"))
            ? r && Be === r
              ? "scale" === e
                ? Fd
                : Ed
              : (Be = r || {}) && ("scale" === e ? Gd : Hd)
            : t.style && !u(t.style[e])
              ? Cd
              : ~e.indexOf("-")
                ? Dd
                : ie(t, e)
        );
      },
      core: { _removeProperty: Yd, _getMatrix: le },
    };
  ((ze.utils.checkPrefix = gr),
    (ze.core.getStyleSaver = Nd),
    (Fr = ha(
      (Er = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent") +
        "," +
        (Rr = "rotation,rotationX,rotationY,skewX,skewY") +
        ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",
      function (t) {
        sr[t] = 1;
      },
    )),
    ha(Rr, function (t) {
      ((X.units[t] = "deg"), (Mr[t] = 1));
    }),
    (cr[Fr[13]] = Er + "," + Rr),
    ha(
      "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY",
      function (t) {
        var e = t.split(":");
        cr[e[1]] = Fr[e[0]];
      },
    ),
    ha(
      "x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",
      function (t) {
        X.units[t] = "px";
      },
    ),
    ze.registerPlugin(Lr));
  var Ir = ze.registerPlugin(Lr) || ze,
    Br = Ir.core.Tween;
  ((e.Back = tr),
    (e.Bounce = rr),
    (e.CSSPlugin = Lr),
    (e.Circ = ar),
    (e.Cubic = Ge),
    (e.Elastic = $e),
    (e.Expo = nr),
    (e.Linear = Ve),
    (e.Power0 = Ze),
    (e.Power1 = Ne),
    (e.Power2 = Qe),
    (e.Power3 = Ue),
    (e.Power4 = qe),
    (e.Quad = We),
    (e.Quart = He),
    (e.Quint = Ke),
    (e.Sine = ir),
    (e.SteppedEase = er),
    (e.Strong = Je),
    (e.TimelineLite = Qt),
    (e.TimelineMax = Qt),
    (e.TweenLite = Jt),
    (e.TweenMax = Br),
    (e.default = Ir),
    (e.gsap = Ir));
  if (typeof window === "undefined" || window !== e) {
    Object.defineProperty(e, "__esModule", { value: !0 });
  } else {
    delete e.default;
  }
});
!(function (t, n) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = n())
    : "function" == typeof define && define.amd
      ? define(n)
      : ((t || self).barba = n());
})(this, function () {
  function t(t, n) {
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      ((i.enumerable = i.enumerable || !1),
        (i.configurable = !0),
        "value" in i && (i.writable = !0),
        Object.defineProperty(
          t,
          "symbol" ==
            typeof (e = (function (t, n) {
              if ("object" != typeof t || null === t) return t;
              var r = t[Symbol.toPrimitive];
              if (void 0 !== r) {
                var i = r.call(t, "string");
                if ("object" != typeof i) return i;
                throw new TypeError(
                  "@@toPrimitive must return a primitive value.",
                );
              }
              return String(t);
            })(i.key))
            ? e
            : String(e),
          i,
        ));
    }
    var e;
  }
  function n(n, r, i) {
    return (
      r && t(n.prototype, r),
      i && t(n, i),
      Object.defineProperty(n, "prototype", { writable: !1 }),
      n
    );
  }
  function r() {
    return (
      (r = Object.assign
        ? Object.assign.bind()
        : function (t) {
            for (var n = 1; n < arguments.length; n++) {
              var r = arguments[n];
              for (var i in r)
                Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]);
            }
            return t;
          }),
      r.apply(this, arguments)
    );
  }
  function i(t, n) {
    ((t.prototype = Object.create(n.prototype)),
      (t.prototype.constructor = t),
      o(t, n));
  }
  function e(t) {
    return (
      (e = Object.setPrototypeOf
        ? Object.getPrototypeOf.bind()
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          }),
      e(t)
    );
  }
  function o(t, n) {
    return (
      (o = Object.setPrototypeOf
        ? Object.setPrototypeOf.bind()
        : function (t, n) {
            return ((t.__proto__ = n), t);
          }),
      o(t, n)
    );
  }
  function u() {
    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
    if (Reflect.construct.sham) return !1;
    if ("function" == typeof Proxy) return !0;
    try {
      return (
        Boolean.prototype.valueOf.call(
          Reflect.construct(Boolean, [], function () {}),
        ),
        !0
      );
    } catch (t) {
      return !1;
    }
  }
  function s(t, n, r) {
    return (
      (s = u()
        ? Reflect.construct.bind()
        : function (t, n, r) {
            var i = [null];
            i.push.apply(i, n);
            var e = new (Function.bind.apply(t, i))();
            return (r && o(e, r.prototype), e);
          }),
      s.apply(null, arguments)
    );
  }
  function f(t) {
    var n = "function" == typeof Map ? new Map() : void 0;
    return (
      (f = function (t) {
        if (
          null === t ||
          -1 === Function.toString.call(t).indexOf("[native code]")
        )
          return t;
        if ("function" != typeof t)
          throw new TypeError(
            "Super expression must either be null or a function",
          );
        if (void 0 !== n) {
          if (n.has(t)) return n.get(t);
          n.set(t, r);
        }
        function r() {
          return s(t, arguments, e(this).constructor);
        }
        return (
          (r.prototype = Object.create(t.prototype, {
            constructor: {
              value: r,
              enumerable: !1,
              writable: !0,
              configurable: !0,
            },
          })),
          o(r, t)
        );
      }),
      f(t)
    );
  }
  function c(t) {
    if (void 0 === t)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called",
      );
    return t;
  }
  var a,
    h = function () {
      ((this.before = void 0),
        (this.beforeLeave = void 0),
        (this.leave = void 0),
        (this.afterLeave = void 0),
        (this.beforeEnter = void 0),
        (this.enter = void 0),
        (this.afterEnter = void 0),
        (this.after = void 0));
    };
  !(function (t) {
    ((t[(t.off = 0)] = "off"),
      (t[(t.error = 1)] = "error"),
      (t[(t.warning = 2)] = "warning"),
      (t[(t.info = 3)] = "info"),
      (t[(t.debug = 4)] = "debug"));
  })(a || (a = {}));
  var v = a.off,
    d = (function () {
      function t(t) {
        ((this.t = void 0), (this.t = t));
      }
      ((t.getLevel = function () {
        return v;
      }),
        (t.setLevel = function (t) {
          return (v = a[t]);
        }));
      var n = t.prototype;
      return (
        (n.error = function () {
          this.i(console.error, a.error, [].slice.call(arguments));
        }),
        (n.warn = function () {
          this.i(console.warn, a.warning, [].slice.call(arguments));
        }),
        (n.info = function () {
          this.i(console.info, a.info, [].slice.call(arguments));
        }),
        (n.debug = function () {
          this.i(console.log, a.debug, [].slice.call(arguments));
        }),
        (n.i = function (n, r, i) {
          r <= t.getLevel() &&
            n.apply(console, ["[" + this.t + "] "].concat(i));
        }),
        t
      );
    })();
  function l(t) {
    return t.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
  }
  function p(t) {
    return t && t.sensitive ? "" : "i";
  }
  var m = {
      container: "container",
      history: "history",
      namespace: "namespace",
      prefix: "data-barba",
      prevent: "prevent",
      wrapper: "wrapper",
    },
    w = (function () {
      function t() {
        ((this.o = m),
          (this.u = void 0),
          (this.h = { after: null, before: null, parent: null }));
      }
      var n = t.prototype;
      return (
        (n.toString = function (t) {
          return t.outerHTML;
        }),
        (n.toDocument = function (t) {
          return (
            this.u || (this.u = new DOMParser()),
            this.u.parseFromString(t, "text/html")
          );
        }),
        (n.toElement = function (t) {
          var n = document.createElement("div");
          return ((n.innerHTML = t), n);
        }),
        (n.getHtml = function (t) {
          return (
            void 0 === t && (t = document),
            this.toString(t.documentElement)
          );
        }),
        (n.getWrapper = function (t) {
          return (
            void 0 === t && (t = document),
            t.querySelector("[" + this.o.prefix + '="' + this.o.wrapper + '"]')
          );
        }),
        (n.getContainer = function (t) {
          return (
            void 0 === t && (t = document),
            t.querySelector(
              "[" + this.o.prefix + '="' + this.o.container + '"]',
            )
          );
        }),
        (n.removeContainer = function (t) {
          document.body.contains(t) && (this.v(t), t.parentNode.removeChild(t));
        }),
        (n.addContainer = function (t, n) {
          var r = this.getContainer() || this.h.before;
          r
            ? this.l(t, r)
            : this.h.after
              ? this.h.after.parentNode.insertBefore(t, this.h.after)
              : this.h.parent
                ? this.h.parent.appendChild(t)
                : n.appendChild(t);
        }),
        (n.getSibling = function () {
          return this.h;
        }),
        (n.getNamespace = function (t) {
          void 0 === t && (t = document);
          var n = t.querySelector(
            "[" + this.o.prefix + "-" + this.o.namespace + "]",
          );
          return n
            ? n.getAttribute(this.o.prefix + "-" + this.o.namespace)
            : null;
        }),
        (n.getHref = function (t) {
          if (t.tagName && "a" === t.tagName.toLowerCase()) {
            if ("string" == typeof t.href) return t.href;
            var n = t.getAttribute("href") || t.getAttribute("xlink:href");
            if (n) return this.resolveUrl(n.baseVal || n);
          }
          return null;
        }),
        (n.resolveUrl = function () {
          var t = [].slice.call(arguments).length;
          if (0 === t)
            throw new Error(
              "resolveUrl requires at least one argument; got none.",
            );
          var n = document.createElement("base");
          if (((n.href = arguments[0]), 1 === t)) return n.href;
          var r = document.getElementsByTagName("head")[0];
          r.insertBefore(n, r.firstChild);
          for (var i, e = document.createElement("a"), o = 1; o < t; o++)
            ((e.href = arguments[o]), (n.href = i = e.href));
          return (r.removeChild(n), i);
        }),
        (n.l = function (t, n) {
          n.parentNode.insertBefore(t, n.nextSibling);
        }),
        (n.v = function (t) {
          return (
            (this.h = {
              after: t.nextElementSibling,
              before: t.previousElementSibling,
              parent: t.parentElement,
            }),
            this.h
          );
        }),
        t
      );
    })(),
    b = new w(),
    y = (function () {
      function t() {
        ((this.p = void 0), (this.m = []), (this.P = -1));
      }
      var i = t.prototype;
      return (
        (i.init = function (t, n) {
          this.p = "barba";
          var r = {
            data: {},
            ns: n,
            scroll: { x: window.scrollX, y: window.scrollY },
            url: t,
          };
          ((this.P = 0), this.m.push(r));
          var i = { from: this.p, index: this.P, states: [].concat(this.m) };
          window.history && window.history.replaceState(i, "", t);
        }),
        (i.change = function (t, n, r) {
          if (r && r.state) {
            var i = r.state,
              e = i.index;
            ((n = this.g(this.P - e)), this.replace(i.states), (this.P = e));
          } else this.add(t, n);
          return n;
        }),
        (i.add = function (t, n, r, i) {
          var e = null != r ? r : this.R(n),
            o = {
              data: null != i ? i : {},
              ns: "tmp",
              scroll: { x: window.scrollX, y: window.scrollY },
              url: t,
            };
          switch (e) {
            case "push":
              ((this.P = this.size), this.m.push(o));
              break;
            case "replace":
              this.set(this.P, o);
          }
          var u = { from: this.p, index: this.P, states: [].concat(this.m) };
          switch (e) {
            case "push":
              window.history && window.history.pushState(u, "", t);
              break;
            case "replace":
              window.history && window.history.replaceState(u, "", t);
          }
        }),
        (i.store = function (t, n) {
          var i = n || this.P,
            e = this.get(i);
          ((e.data = r({}, e.data, t)), this.set(i, e));
          var o = { from: this.p, index: this.P, states: [].concat(this.m) };
          window.history.replaceState(o, "");
        }),
        (i.update = function (t, n) {
          var i = n || this.P,
            e = r({}, this.get(i), t);
          this.set(i, e);
        }),
        (i.remove = function (t) {
          (t ? this.m.splice(t, 1) : this.m.pop(), this.P--);
        }),
        (i.clear = function () {
          ((this.m = []), (this.P = -1));
        }),
        (i.replace = function (t) {
          this.m = t;
        }),
        (i.get = function (t) {
          return this.m[t];
        }),
        (i.set = function (t, n) {
          return (this.m[t] = n);
        }),
        (i.R = function (t) {
          var n = "push",
            r = t,
            i = m.prefix + "-" + m.history;
          return (
            r.hasAttribute && r.hasAttribute(i) && (n = r.getAttribute(i)),
            n
          );
        }),
        (i.g = function (t) {
          return Math.abs(t) > 1
            ? t > 0
              ? "forward"
              : "back"
            : 0 === t
              ? "popstate"
              : t > 0
                ? "back"
                : "forward";
        }),
        n(t, [
          {
            key: "current",
            get: function () {
              return this.m[this.P];
            },
          },
          {
            key: "previous",
            get: function () {
              return this.P < 1 ? null : this.m[this.P - 1];
            },
          },
          {
            key: "size",
            get: function () {
              return this.m.length;
            },
          },
        ]),
        t
      );
    })(),
    P = new y(),
    g = function (t, n) {
      try {
        var r = (function () {
          if (!n.next.html)
            return Promise.resolve(t).then(function (t) {
              var r = n.next;
              if (t) {
                var i = b.toElement(t.html);
                ((r.namespace = b.getNamespace(i)),
                  (r.container = b.getContainer(i)),
                  (r.url = t.url),
                  (r.html = t.html),
                  P.update({ ns: r.namespace }));
                var e = b.toDocument(t.html);
                document.title = e.title;
              }
            });
        })();
        return Promise.resolve(r && r.then ? r.then(function () {}) : void 0);
      } catch (t) {
        return Promise.reject(t);
      }
    },
    E = function t(n, r, i) {
      return n instanceof RegExp
        ? (function (t, n) {
            if (!n) return t;
            for (
              var r = /\((?:\?<(.*?)>)?(?!\?)/g, i = 0, e = r.exec(t.source);
              e;
            )
              (n.push({
                name: e[1] || i++,
                prefix: "",
                suffix: "",
                modifier: "",
                pattern: "",
              }),
                (e = r.exec(t.source)));
            return t;
          })(n, r)
        : Array.isArray(n)
          ? (function (n, r, i) {
              var e = n.map(function (n) {
                return t(n, r, i).source;
              });
              return new RegExp("(?:".concat(e.join("|"), ")"), p(i));
            })(n, r, i)
          : (function (t, n, r) {
              return (function (t, n, r) {
                void 0 === r && (r = {});
                for (
                  var i = r.strict,
                    e = void 0 !== i && i,
                    o = r.start,
                    u = void 0 === o || o,
                    s = r.end,
                    f = void 0 === s || s,
                    c = r.encode,
                    a =
                      void 0 === c
                        ? function (t) {
                            return t;
                          }
                        : c,
                    h = r.delimiter,
                    v = void 0 === h ? "/#?" : h,
                    d = r.endsWith,
                    m = "[".concat(l(void 0 === d ? "" : d), "]|$"),
                    w = "[".concat(l(v), "]"),
                    b = u ? "^" : "",
                    y = 0,
                    P = t;
                  y < P.length;
                  y++
                ) {
                  var g = P[y];
                  if ("string" == typeof g) b += l(a(g));
                  else {
                    var E = l(a(g.prefix)),
                      x = l(a(g.suffix));
                    if (g.pattern)
                      if ((n && n.push(g), E || x))
                        if ("+" === g.modifier || "*" === g.modifier) {
                          var R = "*" === g.modifier ? "?" : "";
                          b += "(?:"
                            .concat(E, "((?:")
                            .concat(g.pattern, ")(?:")
                            .concat(x)
                            .concat(E, "(?:")
                            .concat(g.pattern, "))*)")
                            .concat(x, ")")
                            .concat(R);
                        } else
                          b += "(?:"
                            .concat(E, "(")
                            .concat(g.pattern, ")")
                            .concat(x, ")")
                            .concat(g.modifier);
                      else
                        b +=
                          "+" === g.modifier || "*" === g.modifier
                            ? "((?:"
                                .concat(g.pattern, ")")
                                .concat(g.modifier, ")")
                            : "(".concat(g.pattern, ")").concat(g.modifier);
                    else b += "(?:".concat(E).concat(x, ")").concat(g.modifier);
                  }
                }
                if (f)
                  (e || (b += "".concat(w, "?")),
                    (b += r.endsWith ? "(?=".concat(m, ")") : "$"));
                else {
                  var k = t[t.length - 1],
                    O =
                      "string" == typeof k
                        ? w.indexOf(k[k.length - 1]) > -1
                        : void 0 === k;
                  (e || (b += "(?:".concat(w, "(?=").concat(m, "))?")),
                    O || (b += "(?=".concat(w, "|").concat(m, ")")));
                }
                return new RegExp(b, p(r));
              })(
                (function (t, n) {
                  void 0 === n && (n = {});
                  for (
                    var r = (function (t) {
                        for (var n = [], r = 0; r < t.length; ) {
                          var i = t[r];
                          if ("*" !== i && "+" !== i && "?" !== i)
                            if ("\\" !== i)
                              if ("{" !== i)
                                if ("}" !== i)
                                  if (":" !== i)
                                    if ("(" !== i)
                                      n.push({
                                        type: "CHAR",
                                        index: r,
                                        value: t[r++],
                                      });
                                    else {
                                      var e = 1,
                                        o = "";
                                      if ("?" === t[(s = r + 1)])
                                        throw new TypeError(
                                          'Pattern cannot start with "?" at '.concat(
                                            s,
                                          ),
                                        );
                                      for (; s < t.length; )
                                        if ("\\" !== t[s]) {
                                          if (")" === t[s]) {
                                            if (0 == --e) {
                                              s++;
                                              break;
                                            }
                                          } else if (
                                            "(" === t[s] &&
                                            (e++, "?" !== t[s + 1])
                                          )
                                            throw new TypeError(
                                              "Capturing groups are not allowed at ".concat(
                                                s,
                                              ),
                                            );
                                          o += t[s++];
                                        } else o += t[s++] + t[s++];
                                      if (e)
                                        throw new TypeError(
                                          "Unbalanced pattern at ".concat(r),
                                        );
                                      if (!o)
                                        throw new TypeError(
                                          "Missing pattern at ".concat(r),
                                        );
                                      (n.push({
                                        type: "PATTERN",
                                        index: r,
                                        value: o,
                                      }),
                                        (r = s));
                                    }
                                  else {
                                    for (
                                      var u = "", s = r + 1;
                                      s < t.length;
                                    ) {
                                      var f = t.charCodeAt(s);
                                      if (
                                        !(
                                          (f >= 48 && f <= 57) ||
                                          (f >= 65 && f <= 90) ||
                                          (f >= 97 && f <= 122) ||
                                          95 === f
                                        )
                                      )
                                        break;
                                      u += t[s++];
                                    }
                                    if (!u)
                                      throw new TypeError(
                                        "Missing parameter name at ".concat(r),
                                      );
                                    (n.push({
                                      type: "NAME",
                                      index: r,
                                      value: u,
                                    }),
                                      (r = s));
                                  }
                                else
                                  n.push({
                                    type: "CLOSE",
                                    index: r,
                                    value: t[r++],
                                  });
                              else
                                n.push({
                                  type: "OPEN",
                                  index: r,
                                  value: t[r++],
                                });
                            else
                              n.push({
                                type: "ESCAPED_CHAR",
                                index: r++,
                                value: t[r++],
                              });
                          else
                            n.push({
                              type: "MODIFIER",
                              index: r,
                              value: t[r++],
                            });
                        }
                        return (
                          n.push({ type: "END", index: r, value: "" }),
                          n
                        );
                      })(t),
                      i = n.prefixes,
                      e = void 0 === i ? "./" : i,
                      o = "[^".concat(l(n.delimiter || "/#?"), "]+?"),
                      u = [],
                      s = 0,
                      f = 0,
                      c = "",
                      a = function (t) {
                        if (f < r.length && r[f].type === t)
                          return r[f++].value;
                      },
                      h = function (t) {
                        var n = a(t);
                        if (void 0 !== n) return n;
                        var i = r[f],
                          e = i.index;
                        throw new TypeError(
                          "Unexpected "
                            .concat(i.type, " at ")
                            .concat(e, ", expected ")
                            .concat(t),
                        );
                      },
                      v = function () {
                        for (
                          var t, n = "";
                          (t = a("CHAR") || a("ESCAPED_CHAR"));
                        )
                          n += t;
                        return n;
                      };
                    f < r.length;
                  ) {
                    var d = a("CHAR"),
                      p = a("NAME"),
                      m = a("PATTERN");
                    if (p || m)
                      (-1 === e.indexOf((b = d || "")) && ((c += b), (b = "")),
                        c && (u.push(c), (c = "")),
                        u.push({
                          name: p || s++,
                          prefix: b,
                          suffix: "",
                          pattern: m || o,
                          modifier: a("MODIFIER") || "",
                        }));
                    else {
                      var w = d || a("ESCAPED_CHAR");
                      if (w) c += w;
                      else if ((c && (u.push(c), (c = "")), a("OPEN"))) {
                        var b = v(),
                          y = a("NAME") || "",
                          P = a("PATTERN") || "",
                          g = v();
                        (h("CLOSE"),
                          u.push({
                            name: y || (P ? s++ : ""),
                            pattern: y && !P ? o : P,
                            prefix: b,
                            suffix: g,
                            modifier: a("MODIFIER") || "",
                          }));
                      } else h("END");
                    }
                  }
                  return u;
                })(t, r),
                n,
                r,
              );
            })(n, r, i);
    },
    x = {
      __proto__: null,
      update: g,
      nextTick: function () {
        return new Promise(function (t) {
          window.requestAnimationFrame(t);
        });
      },
      pathToRegexp: E,
    },
    R = function () {
      return window.location.origin;
    },
    k = function (t) {
      return (void 0 === t && (t = window.location.href), O(t).port);
    },
    O = function (t) {
      var n,
        r = t.match(/:\d+/);
      if (null === r)
        (/^http/.test(t) && (n = 80), /^https/.test(t) && (n = 443));
      else {
        var i = r[0].substring(1);
        n = parseInt(i, 10);
      }
      var e,
        o = t.replace(R(), ""),
        u = {},
        s = o.indexOf("#");
      s >= 0 && ((e = o.slice(s + 1)), (o = o.slice(0, s)));
      var f = o.indexOf("?");
      return (
        f >= 0 && ((u = T(o.slice(f + 1))), (o = o.slice(0, f))),
        { hash: e, path: o, port: n, query: u }
      );
    },
    T = function (t) {
      return t.split("&").reduce(function (t, n) {
        var r = n.split("=");
        return ((t[r[0]] = r[1]), t);
      }, {});
    },
    A = function (t) {
      return (
        void 0 === t && (t = window.location.href),
        t.replace(/(\/#.*|\/|#.*)$/, "")
      );
    },
    j = {
      __proto__: null,
      getHref: function () {
        return window.location.href;
      },
      getAbsoluteHref: function (t, n) {
        return (void 0 === n && (n = document.baseURI), new URL(t, n).href);
      },
      getOrigin: R,
      getPort: k,
      getPath: function (t) {
        return (void 0 === t && (t = window.location.href), O(t).path);
      },
      getQuery: function (t, n) {
        return (
          void 0 === n && (n = !1),
          n ? JSON.stringify(O(t).query) : O(t).query
        );
      },
      getHash: function (t) {
        return O(t).hash;
      },
      parse: O,
      parseQuery: T,
      clean: A,
    };
  function M(t, n, i, e, o) {
    return (
      void 0 === n && (n = 2e3),
      new Promise(function (u, s) {
        var f = new XMLHttpRequest();
        ((f.onreadystatechange = function () {
          if (f.readyState === XMLHttpRequest.DONE)
            if (200 === f.status) {
              var n =
                "" !== f.responseURL && f.responseURL !== t ? f.responseURL : t;
              (u({ html: f.responseText, url: r({ href: n }, O(n)) }),
                e.update(t, { status: "fulfilled", target: n }));
            } else if (f.status) {
              var o = { status: f.status, statusText: f.statusText };
              (i(t, o), s(o), e.update(t, { status: "rejected" }));
            }
        }),
          (f.ontimeout = function () {
            var r = new Error("Timeout error [" + n + "]");
            (i(t, r), s(r), e.update(t, { status: "rejected" }));
          }),
          (f.onerror = function () {
            var n = new Error("Fetch error");
            (i(t, n), s(n), e.update(t, { status: "rejected" }));
          }),
          f.open("GET", t),
          (f.timeout = n),
          f.setRequestHeader(
            "Accept",
            "text/html,application/xhtml+xml,application/xml",
          ),
          f.setRequestHeader("x-barba", "yes"),
          o.all().forEach(function (t, n) {
            f.setRequestHeader(n, t);
          }),
          f.send());
      })
    );
  }
  function N(t) {
    return (
      !!t &&
      ("object" == typeof t || "function" == typeof t) &&
      "function" == typeof t.then
    );
  }
  function S(t, n) {
    return (
      void 0 === n && (n = {}),
      function () {
        var r = arguments,
          i = !1,
          e = new Promise(function (e, o) {
            n.async = function () {
              return (
                (i = !0),
                function (t, n) {
                  t ? o(t) : e(n);
                }
              );
            };
            var u = t.apply(n, [].slice.call(r));
            i || (N(u) ? u.then(e, o) : e(u));
          });
        return e;
      }
    );
  }
  var C = (function (t) {
      function n() {
        var n;
        return (
          ((n = t.call(this) || this).logger = new d("@barba/core")),
          (n.all = [
            "ready",
            "page",
            "reset",
            "currentAdded",
            "currentRemoved",
            "nextAdded",
            "nextRemoved",
            "beforeOnce",
            "once",
            "afterOnce",
            "before",
            "beforeLeave",
            "leave",
            "afterLeave",
            "beforeEnter",
            "enter",
            "afterEnter",
            "after",
          ]),
          (n.registered = new Map()),
          n.init(),
          n
        );
      }
      i(n, t);
      var r = n.prototype;
      return (
        (r.init = function () {
          var t = this;
          (this.registered.clear(),
            this.all.forEach(function (n) {
              t[n] ||
                (t[n] = function (r, i) {
                  (t.registered.has(n) || t.registered.set(n, new Set()),
                    t.registered.get(n).add({ ctx: i || {}, fn: r }));
                });
            }));
        }),
        (r.do = function (t) {
          var n = arguments,
            r = this;
          if (this.registered.has(t)) {
            var i = Promise.resolve();
            return (
              this.registered.get(t).forEach(function (t) {
                i = i.then(function () {
                  return S(t.fn, t.ctx).apply(void 0, [].slice.call(n, 1));
                });
              }),
              i.catch(function (n) {
                (r.logger.debug("Hook error [" + t + "]"), r.logger.error(n));
              })
            );
          }
          return Promise.resolve();
        }),
        (r.clear = function () {
          var t = this;
          (this.all.forEach(function (n) {
            delete t[n];
          }),
            this.init());
        }),
        (r.help = function () {
          this.logger.info("Available hooks: " + this.all.join(","));
          var t = [];
          (this.registered.forEach(function (n, r) {
            return t.push(r);
          }),
            this.logger.info("Registered hooks: " + t.join(",")));
        }),
        n
      );
    })(h),
    L = new C(),
    H = (function () {
      function t(t) {
        if (((this.k = void 0), (this.O = []), "boolean" == typeof t))
          this.k = t;
        else {
          var n = Array.isArray(t) ? t : [t];
          this.O = n.map(function (t) {
            return E(t);
          });
        }
      }
      return (
        (t.prototype.checkHref = function (t) {
          if ("boolean" == typeof this.k) return this.k;
          var n = O(t).path;
          return this.O.some(function (t) {
            return null !== t.exec(n);
          });
        }),
        t
      );
    })(),
    _ = (function (t) {
      function n(n) {
        var r;
        return (((r = t.call(this, n) || this).T = new Map()), r);
      }
      i(n, t);
      var e = n.prototype;
      return (
        (e.set = function (t, n, r, i, e) {
          return (
            this.T.set(t, {
              action: r,
              request: n,
              status: i,
              target: null != e ? e : t,
            }),
            { action: r, request: n, status: i, target: e }
          );
        }),
        (e.get = function (t) {
          return this.T.get(t);
        }),
        (e.getRequest = function (t) {
          return this.T.get(t).request;
        }),
        (e.getAction = function (t) {
          return this.T.get(t).action;
        }),
        (e.getStatus = function (t) {
          return this.T.get(t).status;
        }),
        (e.getTarget = function (t) {
          return this.T.get(t).target;
        }),
        (e.has = function (t) {
          return !this.checkHref(t) && this.T.has(t);
        }),
        (e.delete = function (t) {
          return this.T.delete(t);
        }),
        (e.update = function (t, n) {
          var i = r({}, this.T.get(t), n);
          return (this.T.set(t, i), i);
        }),
        n
      );
    })(H),
    D = (function () {
      function t() {
        this.A = new Map();
      }
      var n = t.prototype;
      return (
        (n.set = function (t, n) {
          return (this.A.set(t, n), { name: n });
        }),
        (n.get = function (t) {
          return this.A.get(t);
        }),
        (n.all = function () {
          return this.A;
        }),
        (n.has = function (t) {
          return this.A.has(t);
        }),
        (n.delete = function (t) {
          return this.A.delete(t);
        }),
        (n.clear = function () {
          return this.A.clear();
        }),
        t
      );
    })(),
    B = function () {
      return !window.history.pushState;
    },
    q = function (t) {
      return !t.el || !t.href;
    },
    F = function (t) {
      var n = t.event;
      return n.which > 1 || n.metaKey || n.ctrlKey || n.shiftKey || n.altKey;
    },
    I = function (t) {
      var n = t.el;
      return n.hasAttribute("target") && "_blank" === n.target;
    },
    U = function (t) {
      var n = t.el;
      return (
        (void 0 !== n.protocol && window.location.protocol !== n.protocol) ||
        (void 0 !== n.hostname && window.location.hostname !== n.hostname)
      );
    },
    $ = function (t) {
      var n = t.el;
      return void 0 !== n.port && k() !== k(n.href);
    },
    Q = function (t) {
      var n = t.el;
      return n.getAttribute && "string" == typeof n.getAttribute("download");
    },
    X = function (t) {
      return t.el.hasAttribute(m.prefix + "-" + m.prevent);
    },
    z = function (t) {
      return Boolean(
        t.el.closest("[" + m.prefix + "-" + m.prevent + '="all"]'),
      );
    },
    G = function (t) {
      var n = t.href;
      return A(n) === A() && k(n) === k();
    },
    J = (function (t) {
      function n(n) {
        var r;
        return (
          ((r = t.call(this, n) || this).suite = []),
          (r.tests = new Map()),
          r.init(),
          r
        );
      }
      i(n, t);
      var r = n.prototype;
      return (
        (r.init = function () {
          (this.add("pushState", B),
            this.add("exists", q),
            this.add("newTab", F),
            this.add("blank", I),
            this.add("corsDomain", U),
            this.add("corsPort", $),
            this.add("download", Q),
            this.add("preventSelf", X),
            this.add("preventAll", z),
            this.add("sameUrl", G, !1));
        }),
        (r.add = function (t, n, r) {
          (void 0 === r && (r = !0),
            this.tests.set(t, n),
            r && this.suite.push(t));
        }),
        (r.run = function (t, n, r, i) {
          return this.tests.get(t)({ el: n, event: r, href: i });
        }),
        (r.checkLink = function (t, n, r) {
          var i = this;
          return this.suite.some(function (e) {
            return i.run(e, t, n, r);
          });
        }),
        n
      );
    })(H),
    W = (function (t) {
      function n(r, i) {
        var e;
        return (
          void 0 === i && (i = "Barba error"),
          ((e =
            t.call.apply(t, [this].concat([].slice.call(arguments, 2))) ||
            this).error = void 0),
          (e.label = void 0),
          (e.error = r),
          (e.label = i),
          Error.captureStackTrace && Error.captureStackTrace(c(e), n),
          (e.name = "BarbaError"),
          e
        );
      }
      return (i(n, t), n);
    })(f(Error)),
    K = (function () {
      function t(t) {
        (void 0 === t && (t = []),
          (this.logger = new d("@barba/core")),
          (this.all = []),
          (this.page = []),
          (this.once = []),
          (this.j = [
            { name: "namespace", type: "strings" },
            { name: "custom", type: "function" },
          ]),
          t && (this.all = this.all.concat(t)),
          this.update());
      }
      var n = t.prototype;
      return (
        (n.add = function (t, n) {
          ("rule" === t
            ? this.j.splice(n.position || 0, 0, n.value)
            : this.all.push(n),
            this.update());
        }),
        (n.resolve = function (t, n) {
          var r = this;
          void 0 === n && (n = {});
          var i = n.once ? this.once : this.page;
          i = i.filter(
            n.self
              ? function (t) {
                  return t.name && "self" === t.name;
                }
              : function (t) {
                  return !t.name || "self" !== t.name;
                },
          );
          var e = new Map(),
            o = i.find(function (i) {
              var o = !0,
                u = {};
              return n.self && "self" === i.name
                ? (e.set(i, u), !0)
                : (r.j.reverse().forEach(function (n) {
                    o &&
                      ((o = r.M(i, n, t, u)),
                      i.from &&
                        i.to &&
                        (o = r.M(i, n, t, u, "from") && r.M(i, n, t, u, "to")),
                      i.from && !i.to && (o = r.M(i, n, t, u, "from")),
                      !i.from && i.to && (o = r.M(i, n, t, u, "to")));
                  }),
                  e.set(i, u),
                  o);
            }),
            u = e.get(o),
            s = [];
          if ((s.push(n.once ? "once" : "page"), n.self && s.push("self"), u)) {
            var f,
              c = [o];
            (Object.keys(u).length > 0 && c.push(u),
              (f = this.logger).info.apply(
                f,
                ["Transition found [" + s.join(",") + "]"].concat(c),
              ));
          } else this.logger.info("No transition found [" + s.join(",") + "]");
          return o;
        }),
        (n.update = function () {
          var t = this;
          ((this.all = this.all
            .map(function (n) {
              return t.N(n);
            })
            .sort(function (t, n) {
              return t.priority - n.priority;
            })
            .reverse()
            .map(function (t) {
              return (delete t.priority, t);
            })),
            (this.page = this.all.filter(function (t) {
              return void 0 !== t.leave || void 0 !== t.enter;
            })),
            (this.once = this.all.filter(function (t) {
              return void 0 !== t.once;
            })));
        }),
        (n.M = function (t, n, r, i, e) {
          var o = !0,
            u = !1,
            s = t,
            f = n.name,
            c = f,
            a = f,
            h = f,
            v = e ? s[e] : s,
            d = "to" === e ? r.next : r.current;
          if (e ? v && v[f] : v[f]) {
            switch (n.type) {
              case "strings":
              default:
                var l = Array.isArray(v[c]) ? v[c] : [v[c]];
                (d[c] && -1 !== l.indexOf(d[c]) && (u = !0),
                  -1 === l.indexOf(d[c]) && (o = !1));
                break;
              case "object":
                var p = Array.isArray(v[a]) ? v[a] : [v[a]];
                d[a]
                  ? (d[a].name && -1 !== p.indexOf(d[a].name) && (u = !0),
                    -1 === p.indexOf(d[a].name) && (o = !1))
                  : (o = !1);
                break;
              case "function":
                v[h](r) ? (u = !0) : (o = !1);
            }
            u &&
              (e ? ((i[e] = i[e] || {}), (i[e][f] = s[e][f])) : (i[f] = s[f]));
          }
          return o;
        }),
        (n.S = function (t, n, r) {
          var i = 0;
          return (
            (t[n] || (t.from && t.from[n]) || (t.to && t.to[n])) &&
              ((i += Math.pow(10, r)),
              t.from && t.from[n] && (i += 1),
              t.to && t.to[n] && (i += 2)),
            i
          );
        }),
        (n.N = function (t) {
          var n = this;
          t.priority = 0;
          var r = 0;
          return (
            this.j.forEach(function (i, e) {
              r += n.S(t, i.name, e + 1);
            }),
            (t.priority = r),
            t
          );
        }),
        t
      );
    })();
  function V(t, n) {
    try {
      var r = t();
    } catch (t) {
      return n(t);
    }
    return r && r.then ? r.then(void 0, n) : r;
  }
  var Y = (function () {
      function t(t) {
        (void 0 === t && (t = []),
          (this.logger = new d("@barba/core")),
          (this.store = void 0),
          (this.C = !1),
          (this.store = new K(t)));
      }
      var r = t.prototype;
      return (
        (r.get = function (t, n) {
          return this.store.resolve(t, n);
        }),
        (r.doOnce = function (t) {
          var n = t.data,
            r = t.transition;
          try {
            var i = function () {
                e.C = !1;
              },
              e = this,
              o = r || {};
            e.C = !0;
            var u = V(
              function () {
                return Promise.resolve(e.L("beforeOnce", n, o)).then(
                  function () {
                    return Promise.resolve(e.once(n, o)).then(function () {
                      return Promise.resolve(e.L("afterOnce", n, o)).then(
                        function () {},
                      );
                    });
                  },
                );
              },
              function (t) {
                ((e.C = !1),
                  e.logger.debug("Transition error [before/after/once]"),
                  e.logger.error(t));
              },
            );
            return Promise.resolve(u && u.then ? u.then(i) : i());
          } catch (t) {
            return Promise.reject(t);
          }
        }),
        (r.doPage = function (t) {
          var n = t.data,
            r = t.transition,
            i = t.page,
            e = t.wrapper;
          try {
            var o = function (t) {
                u.C = !1;
              },
              u = this,
              s = r || {},
              f = !0 === s.sync || !1;
            u.C = !0;
            var c = V(
              function () {
                function t() {
                  return Promise.resolve(u.L("before", n, s)).then(function () {
                    function t(t) {
                      return Promise.resolve(u.remove(n)).then(function () {
                        return Promise.resolve(u.L("after", n, s)).then(
                          function () {},
                        );
                      });
                    }
                    var r = (function () {
                      if (f)
                        return V(
                          function () {
                            return Promise.resolve(u.add(n, e)).then(
                              function () {
                                return Promise.resolve(
                                  u.L("beforeLeave", n, s),
                                ).then(function () {
                                  return Promise.resolve(
                                    u.L("beforeEnter", n, s),
                                  ).then(function () {
                                    return Promise.resolve(
                                      Promise.all([
                                        u.leave(n, s),
                                        u.enter(n, s),
                                      ]),
                                    ).then(function () {
                                      return Promise.resolve(
                                        u.L("afterLeave", n, s),
                                      ).then(function () {
                                        return Promise.resolve(
                                          u.L("afterEnter", n, s),
                                        ).then(function () {});
                                      });
                                    });
                                  });
                                });
                              },
                            );
                          },
                          function (t) {
                            if (u.H(t))
                              throw new W(t, "Transition error [sync]");
                          },
                        );
                      var t = function (t) {
                          return V(
                            function () {
                              var t = (function () {
                                if (!1 !== r)
                                  return Promise.resolve(u.add(n, e)).then(
                                    function () {
                                      return Promise.resolve(
                                        u.L("beforeEnter", n, s),
                                      ).then(function () {
                                        return Promise.resolve(
                                          u.enter(n, s, r),
                                        ).then(function () {
                                          return Promise.resolve(
                                            u.L("afterEnter", n, s),
                                          ).then(function () {});
                                        });
                                      });
                                    },
                                  );
                              })();
                              if (t && t.then) return t.then(function () {});
                            },
                            function (t) {
                              if (u.H(t))
                                throw new W(
                                  t,
                                  "Transition error [before/after/enter]",
                                );
                            },
                          );
                        },
                        r = !1,
                        o = V(
                          function () {
                            return Promise.resolve(
                              u.L("beforeLeave", n, s),
                            ).then(function () {
                              return Promise.resolve(
                                Promise.all([u.leave(n, s), g(i, n)]).then(
                                  function (t) {
                                    return t[0];
                                  },
                                ),
                              ).then(function (t) {
                                return (
                                  (r = t),
                                  Promise.resolve(u.L("afterLeave", n, s)).then(
                                    function () {},
                                  )
                                );
                              });
                            });
                          },
                          function (t) {
                            if (u.H(t))
                              throw new W(
                                t,
                                "Transition error [before/after/leave]",
                              );
                          },
                        );
                      return o && o.then ? o.then(t) : t();
                    })();
                    return r && r.then ? r.then(t) : t();
                  });
                }
                var r = (function () {
                  if (f) return Promise.resolve(g(i, n)).then(function () {});
                })();
                return r && r.then ? r.then(t) : t();
              },
              function (t) {
                if (((u.C = !1), t.name && "BarbaError" === t.name))
                  throw (u.logger.debug(t.label), u.logger.error(t.error), t);
                throw (
                  u.logger.debug("Transition error [page]"),
                  u.logger.error(t),
                  t
                );
              },
            );
            return Promise.resolve(c && c.then ? c.then(o) : o());
          } catch (t) {
            return Promise.reject(t);
          }
        }),
        (r.once = function (t, n) {
          try {
            return Promise.resolve(L.do("once", t, n)).then(function () {
              return n.once ? S(n.once, n)(t) : Promise.resolve();
            });
          } catch (t) {
            return Promise.reject(t);
          }
        }),
        (r.leave = function (t, n) {
          try {
            return Promise.resolve(L.do("leave", t, n)).then(function () {
              return n.leave ? S(n.leave, n)(t) : Promise.resolve();
            });
          } catch (t) {
            return Promise.reject(t);
          }
        }),
        (r.enter = function (t, n, r) {
          try {
            return Promise.resolve(L.do("enter", t, n)).then(function () {
              return n.enter ? S(n.enter, n)(t, r) : Promise.resolve();
            });
          } catch (t) {
            return Promise.reject(t);
          }
        }),
        (r.add = function (t, n) {
          try {
            return (
              b.addContainer(t.next.container, n),
              L.do("nextAdded", t),
              Promise.resolve()
            );
          } catch (t) {
            return Promise.reject(t);
          }
        }),
        (r.remove = function (t) {
          try {
            return (
              b.removeContainer(t.current.container),
              L.do("currentRemoved", t),
              Promise.resolve()
            );
          } catch (t) {
            return Promise.reject(t);
          }
        }),
        (r.H = function (t) {
          return t.message
            ? !/Timeout error|Fetch error/.test(t.message)
            : !t.status;
        }),
        (r.L = function (t, n, r) {
          try {
            return Promise.resolve(L.do(t, n, r)).then(function () {
              return r[t] ? S(r[t], r)(n) : Promise.resolve();
            });
          } catch (t) {
            return Promise.reject(t);
          }
        }),
        n(t, [
          {
            key: "isRunning",
            get: function () {
              return this.C;
            },
            set: function (t) {
              this.C = t;
            },
          },
          {
            key: "hasOnce",
            get: function () {
              return this.store.once.length > 0;
            },
          },
          {
            key: "hasSelf",
            get: function () {
              return this.store.all.some(function (t) {
                return "self" === t.name;
              });
            },
          },
          {
            key: "shouldWait",
            get: function () {
              return this.store.all.some(function (t) {
                return (t.to && !t.to.route) || t.sync;
              });
            },
          },
        ]),
        t
      );
    })(),
    Z = (function () {
      function t(t) {
        var n = this;
        ((this.names = [
          "beforeLeave",
          "afterLeave",
          "beforeEnter",
          "afterEnter",
        ]),
          (this.byNamespace = new Map()),
          0 !== t.length &&
            (t.forEach(function (t) {
              n.byNamespace.set(t.namespace, t);
            }),
            this.names.forEach(function (t) {
              L[t](n._(t));
            })));
      }
      return (
        (t.prototype._ = function (t) {
          var n = this;
          return function (r) {
            var i = t.match(/enter/i) ? r.next : r.current,
              e = n.byNamespace.get(i.namespace);
            return e && e[t] ? S(e[t], e)(r) : Promise.resolve();
          };
        }),
        t
      );
    })();
  (Element.prototype.matches ||
    (Element.prototype.matches =
      Element.prototype.msMatchesSelector ||
      Element.prototype.webkitMatchesSelector),
    Element.prototype.closest ||
      (Element.prototype.closest = function (t) {
        var n = this;
        do {
          if (n.matches(t)) return n;
          n = n.parentElement || n.parentNode;
        } while (null !== n && 1 === n.nodeType);
        return null;
      }));
  var tt = {
      container: null,
      html: "",
      namespace: "",
      url: { hash: "", href: "", path: "", port: null, query: {} },
    },
    nt = (function () {
      function t() {
        ((this.version = "2.10.3"),
          (this.schemaPage = tt),
          (this.Logger = d),
          (this.logger = new d("@barba/core")),
          (this.plugins = []),
          (this.timeout = void 0),
          (this.cacheIgnore = void 0),
          (this.cacheFirstPage = void 0),
          (this.prefetchIgnore = void 0),
          (this.preventRunning = void 0),
          (this.hooks = L),
          (this.cache = void 0),
          (this.headers = void 0),
          (this.prevent = void 0),
          (this.transitions = void 0),
          (this.views = void 0),
          (this.dom = b),
          (this.helpers = x),
          (this.history = P),
          (this.request = M),
          (this.url = j),
          (this.D = void 0),
          (this.B = void 0),
          (this.q = void 0),
          (this.F = void 0));
      }
      var i = t.prototype;
      return (
        (i.use = function (t, n) {
          var r = this.plugins;
          r.indexOf(t) > -1
            ? this.logger.warn("Plugin [" + t.name + "] already installed.")
            : "function" == typeof t.install
              ? (t.install(this, n), r.push(t))
              : this.logger.warn(
                  "Plugin [" + t.name + '] has no "install" method.',
                );
        }),
        (i.init = function (t) {
          var n = void 0 === t ? {} : t,
            i = n.transitions,
            e = void 0 === i ? [] : i,
            o = n.views,
            u = void 0 === o ? [] : o,
            s = n.schema,
            f = void 0 === s ? m : s,
            c = n.requestError,
            a = n.timeout,
            h = void 0 === a ? 2e3 : a,
            v = n.cacheIgnore,
            l = void 0 !== v && v,
            p = n.cacheFirstPage,
            w = void 0 !== p && p,
            b = n.prefetchIgnore,
            y = void 0 !== b && b,
            P = n.preventRunning,
            g = void 0 !== P && P,
            E = n.prevent,
            x = void 0 === E ? null : E,
            R = n.debug,
            k = n.logLevel;
          if (
            (d.setLevel(
              !0 === (void 0 !== R && R) ? "debug" : void 0 === k ? "off" : k,
            ),
            this.logger.info(this.version),
            Object.keys(f).forEach(function (t) {
              m[t] && (m[t] = f[t]);
            }),
            (this.B = c),
            (this.timeout = h),
            (this.cacheIgnore = l),
            (this.cacheFirstPage = w),
            (this.prefetchIgnore = y),
            (this.preventRunning = g),
            (this.q = this.dom.getWrapper()),
            !this.q)
          )
            throw new Error("[@barba/core] No Barba wrapper found");
          this.I();
          var O = this.data.current;
          if (!O.container)
            throw new Error("[@barba/core] No Barba container found");
          if (
            ((this.cache = new _(l)),
            (this.headers = new D()),
            (this.prevent = new J(y)),
            (this.transitions = new Y(e)),
            (this.views = new Z(u)),
            null !== x)
          ) {
            if ("function" != typeof x)
              throw new Error("[@barba/core] Prevent should be a function");
            this.prevent.add("preventCustom", x);
          }
          (this.history.init(O.url.href, O.namespace),
            w &&
              this.cache.set(
                O.url.href,
                Promise.resolve({ html: O.html, url: O.url }),
                "init",
                "fulfilled",
              ),
            (this.U = this.U.bind(this)),
            (this.$ = this.$.bind(this)),
            (this.X = this.X.bind(this)),
            this.G(),
            this.plugins.forEach(function (t) {
              return t.init();
            }));
          var T = this.data;
          ((T.trigger = "barba"),
            (T.next = T.current),
            (T.current = r({}, this.schemaPage)),
            this.hooks.do("ready", T),
            this.once(T),
            this.I());
        }),
        (i.destroy = function () {
          (this.I(),
            this.J(),
            this.history.clear(),
            this.hooks.clear(),
            (this.plugins = []));
        }),
        (i.force = function (t) {
          window.location.assign(t);
        }),
        (i.go = function (t, n, r) {
          var i;
          if (
            (void 0 === n && (n = "barba"),
            (this.F = null),
            this.transitions.isRunning)
          )
            this.force(t);
          else if (
            !(i =
              "popstate" === n
                ? this.history.current &&
                  this.url.getPath(this.history.current.url) ===
                    this.url.getPath(t) &&
                  this.url.getQuery(this.history.current.url, !0) ===
                    this.url.getQuery(t, !0)
                : this.prevent.run("sameUrl", null, null, t)) ||
            this.transitions.hasSelf
          )
            return (
              (n = this.history.change(
                this.cache.has(t) ? this.cache.get(t).target : t,
                n,
                r,
              )),
              r && (r.stopPropagation(), r.preventDefault()),
              this.page(t, n, null != r ? r : void 0, i)
            );
        }),
        (i.once = function (t) {
          try {
            var n = this;
            return Promise.resolve(n.hooks.do("beforeEnter", t)).then(
              function () {
                function r() {
                  return Promise.resolve(n.hooks.do("afterEnter", t)).then(
                    function () {},
                  );
                }
                var i = (function () {
                  if (n.transitions.hasOnce) {
                    var r = n.transitions.get(t, { once: !0 });
                    return Promise.resolve(
                      n.transitions.doOnce({ transition: r, data: t }),
                    ).then(function () {});
                  }
                })();
                return i && i.then ? i.then(r) : r();
              },
            );
          } catch (t) {
            return Promise.reject(t);
          }
        }),
        (i.page = function (t, n, i, e) {
          try {
            var o,
              u = function () {
                var t = s.data;
                return Promise.resolve(s.hooks.do("page", t)).then(function () {
                  var n = (function (n, r) {
                    try {
                      var i =
                        ((u = s.transitions.get(t, { once: !1, self: e })),
                        Promise.resolve(
                          s.transitions.doPage({
                            data: t,
                            page: o,
                            transition: u,
                            wrapper: s.q,
                          }),
                        ).then(function () {
                          s.I();
                        }));
                    } catch (t) {
                      return r();
                    }
                    var u;
                    return i && i.then ? i.then(void 0, r) : i;
                  })(0, function () {
                    0 === d.getLevel() && s.force(t.next.url.href);
                  });
                  if (n && n.then) return n.then(function () {});
                });
              },
              s = this;
            if (
              ((s.data.next.url = r({ href: t }, s.url.parse(t))),
              (s.data.trigger = n),
              (s.data.event = i),
              s.cache.has(t))
            )
              o = s.cache.update(t, { action: "click" }).request;
            else {
              var f = s.request(
                t,
                s.timeout,
                s.onRequestError.bind(s, n),
                s.cache,
                s.headers,
              );
              (f.then(function (r) {
                r.url.href !== t && s.history.add(r.url.href, n, "replace");
              }),
                (o = s.cache.set(t, f, "click", "pending").request));
            }
            var c = (function () {
              if (s.transitions.shouldWait)
                return Promise.resolve(g(o, s.data)).then(function () {});
            })();
            return Promise.resolve(c && c.then ? c.then(u) : u());
          } catch (t) {
            return Promise.reject(t);
          }
        }),
        (i.onRequestError = function (t) {
          this.transitions.isRunning = !1;
          var n = [].slice.call(arguments, 1),
            r = n[0],
            i = n[1],
            e = this.cache.getAction(r);
          return (
            this.cache.delete(r),
            (this.B && !1 === this.B(t, e, r, i)) ||
              ("click" === e && this.force(r)),
            !1
          );
        }),
        (i.prefetch = function (t) {
          var n = this;
          ((t = this.url.getAbsoluteHref(t)),
            this.cache.has(t) ||
              this.cache.set(
                t,
                this.request(
                  t,
                  this.timeout,
                  this.onRequestError.bind(this, "barba"),
                  this.cache,
                  this.headers,
                ).catch(function (t) {
                  n.logger.error(t);
                }),
                "prefetch",
                "pending",
              ));
        }),
        (i.G = function () {
          (!0 !== this.prefetchIgnore &&
            (document.addEventListener("mouseover", this.U),
            document.addEventListener("touchstart", this.U)),
            document.addEventListener("click", this.$),
            window.addEventListener("popstate", this.X));
        }),
        (i.J = function () {
          (!0 !== this.prefetchIgnore &&
            (document.removeEventListener("mouseover", this.U),
            document.removeEventListener("touchstart", this.U)),
            document.removeEventListener("click", this.$),
            window.removeEventListener("popstate", this.X));
        }),
        (i.U = function (t) {
          var n = this,
            r = this.W(t);
          if (r) {
            var i = this.url.getAbsoluteHref(this.dom.getHref(r));
            this.prevent.checkHref(i) ||
              this.cache.has(i) ||
              this.cache.set(
                i,
                this.request(
                  i,
                  this.timeout,
                  this.onRequestError.bind(this, r),
                  this.cache,
                  this.headers,
                ).catch(function (t) {
                  n.logger.error(t);
                }),
                "enter",
                "pending",
              );
          }
        }),
        (i.$ = function (t) {
          var n = this.W(t);
          if (n) {
            if (this.transitions.isRunning && this.preventRunning)
              return (t.preventDefault(), void t.stopPropagation());
            ((this.F = t), this.go(this.dom.getHref(n), n, t));
          }
        }),
        (i.X = function (t) {
          this.go(this.url.getHref(), "popstate", t);
        }),
        (i.W = function (t) {
          for (var n = t.target; n && !this.dom.getHref(n); ) n = n.parentNode;
          if (n && !this.prevent.checkLink(n, t, this.dom.getHref(n))) return n;
        }),
        (i.I = function () {
          var t = this.url.getHref(),
            n = {
              container: this.dom.getContainer(),
              html: this.dom.getHtml(),
              namespace: this.dom.getNamespace(),
              url: r({ href: t }, this.url.parse(t)),
            };
          ((this.D = {
            current: n,
            event: void 0,
            next: r({}, this.schemaPage),
            trigger: void 0,
          }),
            this.hooks.do("reset", this.data));
        }),
        n(t, [
          {
            key: "data",
            get: function () {
              return this.D;
            },
          },
          {
            key: "wrapper",
            get: function () {
              return this.q;
            },
          },
        ]),
        t
      );
    })();
  return new nt();
});

var Swiper = (function () {
  "use strict";
  function e(e) {
    return (
      null !== e &&
      "object" == typeof e &&
      "constructor" in e &&
      e.constructor === Object
    );
  }
  function t(s, a) {
    (void 0 === s && (s = {}),
      void 0 === a && (a = {}),
      Object.keys(a).forEach((i) => {
        void 0 === s[i]
          ? (s[i] = a[i])
          : e(a[i]) && e(s[i]) && Object.keys(a[i]).length > 0 && t(s[i], a[i]);
      }));
  }
  const s = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: { blur() {}, nodeName: "" },
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    createEvent: () => ({ initEvent() {} }),
    createElement: () => ({
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName: () => [],
    }),
    createElementNS: () => ({}),
    importNode: () => null,
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
  };
  function a() {
    const e = "undefined" != typeof document ? document : {};
    return (t(e, s), e);
  }
  const i = {
    document: s,
    navigator: { userAgent: "" },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
    history: { replaceState() {}, pushState() {}, go() {}, back() {} },
    CustomEvent: function () {
      return this;
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle: () => ({ getPropertyValue: () => "" }),
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia: () => ({}),
    requestAnimationFrame: (e) =>
      "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
    cancelAnimationFrame(e) {
      "undefined" != typeof setTimeout && clearTimeout(e);
    },
  };
  function r() {
    const e = "undefined" != typeof window ? window : {};
    return (t(e, i), e);
  }
  function n(e) {
    return (
      void 0 === e && (e = ""),
      e
        .trim()
        .split(" ")
        .filter((e) => !!e.trim())
    );
  }
  function l(e, t) {
    return (void 0 === t && (t = 0), setTimeout(e, t));
  }
  function o() {
    return Date.now();
  }
  function d(e, t) {
    void 0 === t && (t = "x");
    const s = r();
    let a, i, n;
    const l = (function (e) {
      const t = r();
      let s;
      return (
        t.getComputedStyle && (s = t.getComputedStyle(e, null)),
        !s && e.currentStyle && (s = e.currentStyle),
        s || (s = e.style),
        s
      );
    })(e);
    return (
      s.WebKitCSSMatrix
        ? ((i = l.transform || l.webkitTransform),
          i.split(",").length > 6 &&
            (i = i
              .split(", ")
              .map((e) => e.replace(",", "."))
              .join(", ")),
          (n = new s.WebKitCSSMatrix("none" === i ? "" : i)))
        : ((n =
            l.MozTransform ||
            l.OTransform ||
            l.MsTransform ||
            l.msTransform ||
            l.transform ||
            l
              .getPropertyValue("transform")
              .replace("translate(", "matrix(1, 0, 0, 1,")),
          (a = n.toString().split(","))),
      "x" === t &&
        (i = s.WebKitCSSMatrix
          ? n.m41
          : 16 === a.length
            ? parseFloat(a[12])
            : parseFloat(a[4])),
      "y" === t &&
        (i = s.WebKitCSSMatrix
          ? n.m42
          : 16 === a.length
            ? parseFloat(a[13])
            : parseFloat(a[5])),
      i || 0
    );
  }
  function c(e) {
    return (
      "object" == typeof e &&
      null !== e &&
      e.constructor &&
      "Object" === Object.prototype.toString.call(e).slice(8, -1)
    );
  }
  function p() {
    const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
      t = ["__proto__", "constructor", "prototype"];
    for (let a = 1; a < arguments.length; a += 1) {
      const i = a < 0 || arguments.length <= a ? void 0 : arguments[a];
      if (
        null != i &&
        ((s = i),
        !("undefined" != typeof window && void 0 !== window.HTMLElement
          ? s instanceof HTMLElement
          : s && (1 === s.nodeType || 11 === s.nodeType)))
      ) {
        const s = Object.keys(Object(i)).filter((e) => t.indexOf(e) < 0);
        for (let t = 0, a = s.length; t < a; t += 1) {
          const a = s[t],
            r = Object.getOwnPropertyDescriptor(i, a);
          void 0 !== r &&
            r.enumerable &&
            (c(e[a]) && c(i[a])
              ? i[a].__swiper__
                ? (e[a] = i[a])
                : p(e[a], i[a])
              : !c(e[a]) && c(i[a])
                ? ((e[a] = {}), i[a].__swiper__ ? (e[a] = i[a]) : p(e[a], i[a]))
                : (e[a] = i[a]));
        }
      }
    }
    var s;
    return e;
  }
  function u(e, t, s) {
    e.style.setProperty(t, s);
  }
  function m(e) {
    let { swiper: t, targetPosition: s, side: a } = e;
    const i = r(),
      n = -t.translate;
    let l,
      o = null;
    const d = t.params.speed;
    ((t.wrapperEl.style.scrollSnapType = "none"),
      i.cancelAnimationFrame(t.cssModeFrameID));
    const c = s > n ? "next" : "prev",
      p = (e, t) => ("next" === c && e >= t) || ("prev" === c && e <= t),
      u = () => {
        ((l = new Date().getTime()), null === o && (o = l));
        const e = Math.max(Math.min((l - o) / d, 1), 0),
          r = 0.5 - Math.cos(e * Math.PI) / 2;
        let c = n + r * (s - n);
        if ((p(c, s) && (c = s), t.wrapperEl.scrollTo({ [a]: c }), p(c, s)))
          return (
            (t.wrapperEl.style.overflow = "hidden"),
            (t.wrapperEl.style.scrollSnapType = ""),
            setTimeout(() => {
              ((t.wrapperEl.style.overflow = ""),
                t.wrapperEl.scrollTo({ [a]: c }));
            }),
            void i.cancelAnimationFrame(t.cssModeFrameID)
          );
        t.cssModeFrameID = i.requestAnimationFrame(u);
      };
    u();
  }
  function h(e) {
    return (
      e.querySelector(".swiper-slide-transform") ||
      (e.shadowRoot && e.shadowRoot.querySelector(".swiper-slide-transform")) ||
      e
    );
  }
  function f(e, t) {
    void 0 === t && (t = "");
    const s = [...e.children];
    return (
      e instanceof HTMLSlotElement && s.push(...e.assignedElements()),
      t ? s.filter((e) => e.matches(t)) : s
    );
  }
  function g(e) {
    try {
      return void console.warn(e);
    } catch (e) {}
  }
  function v(e, t) {
    void 0 === t && (t = []);
    const s = document.createElement(e);
    return (s.classList.add(...(Array.isArray(t) ? t : n(t))), s);
  }
  function w(e) {
    const t = r(),
      s = a(),
      i = e.getBoundingClientRect(),
      n = s.body,
      l = e.clientTop || n.clientTop || 0,
      o = e.clientLeft || n.clientLeft || 0,
      d = e === t ? t.scrollY : e.scrollTop,
      c = e === t ? t.scrollX : e.scrollLeft;
    return { top: i.top + d - l, left: i.left + c - o };
  }
  function b(e, t) {
    return r().getComputedStyle(e, null).getPropertyValue(t);
  }
  function y(e) {
    let t,
      s = e;
    if (s) {
      for (t = 0; null !== (s = s.previousSibling); )
        1 === s.nodeType && (t += 1);
      return t;
    }
  }
  function E(e, t) {
    const s = [];
    let a = e.parentElement;
    for (; a; )
      (t ? a.matches(t) && s.push(a) : s.push(a), (a = a.parentElement));
    return s;
  }
  function x(e, t) {
    t &&
      e.addEventListener("transitionend", function s(a) {
        a.target === e &&
          (t.call(e, a), e.removeEventListener("transitionend", s));
      });
  }
  function S(e, t, s) {
    const a = r();
    return s
      ? e["width" === t ? "offsetWidth" : "offsetHeight"] +
          parseFloat(
            a
              .getComputedStyle(e, null)
              .getPropertyValue("width" === t ? "margin-right" : "margin-top"),
          ) +
          parseFloat(
            a
              .getComputedStyle(e, null)
              .getPropertyValue(
                "width" === t ? "margin-left" : "margin-bottom",
              ),
          )
      : e.offsetWidth;
  }
  function T(e) {
    return (Array.isArray(e) ? e : [e]).filter((e) => !!e);
  }
  function M(e) {
    return (t) =>
      Math.abs(t) > 0 &&
      e.browser &&
      e.browser.need3dFix &&
      Math.abs(t) % 90 == 0
        ? t + 0.001
        : t;
  }
  let C, P, L;
  function I() {
    return (
      C ||
        (C = (function () {
          const e = r(),
            t = a();
          return {
            smoothScroll:
              t.documentElement &&
              t.documentElement.style &&
              "scrollBehavior" in t.documentElement.style,
            touch: !!(
              "ontouchstart" in e ||
              (e.DocumentTouch && t instanceof e.DocumentTouch)
            ),
          };
        })()),
      C
    );
  }
  function z(e) {
    return (
      void 0 === e && (e = {}),
      P ||
        (P = (function (e) {
          let { userAgent: t } = void 0 === e ? {} : e;
          const s = I(),
            a = r(),
            i = a.navigator.platform,
            n = t || a.navigator.userAgent,
            l = { ios: !1, android: !1 },
            o = a.screen.width,
            d = a.screen.height,
            c = n.match(/(Android);?[\s\/]+([\d.]+)?/);
          let p = n.match(/(iPad).*OS\s([\d_]+)/);
          const u = n.match(/(iPod)(.*OS\s([\d_]+))?/),
            m = !p && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
            h = "Win32" === i;
          let f = "MacIntel" === i;
          return (
            !p &&
              f &&
              s.touch &&
              [
                "1024x1366",
                "1366x1024",
                "834x1194",
                "1194x834",
                "834x1112",
                "1112x834",
                "768x1024",
                "1024x768",
                "820x1180",
                "1180x820",
                "810x1080",
                "1080x810",
              ].indexOf(`${o}x${d}`) >= 0 &&
              ((p = n.match(/(Version)\/([\d.]+)/)),
              p || (p = [0, 1, "13_0_0"]),
              (f = !1)),
            c && !h && ((l.os = "android"), (l.android = !0)),
            (p || m || u) && ((l.os = "ios"), (l.ios = !0)),
            l
          );
        })(e)),
      P
    );
  }
  function A() {
    return (
      L ||
        (L = (function () {
          const e = r(),
            t = z();
          let s = !1;
          function a() {
            const t = e.navigator.userAgent.toLowerCase();
            return (
              t.indexOf("safari") >= 0 &&
              t.indexOf("chrome") < 0 &&
              t.indexOf("android") < 0
            );
          }
          if (a()) {
            const t = String(e.navigator.userAgent);
            if (t.includes("Version/")) {
              const [e, a] = t
                .split("Version/")[1]
                .split(" ")[0]
                .split(".")
                .map((e) => Number(e));
              s = e < 16 || (16 === e && a < 2);
            }
          }
          const i = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
              e.navigator.userAgent,
            ),
            n = a();
          return {
            isSafari: s || n,
            needPerspectiveFix: s,
            need3dFix: n || (i && t.ios),
            isWebView: i,
          };
        })()),
      L
    );
  }
  var $ = {
    on(e, t, s) {
      const a = this;
      if (!a.eventsListeners || a.destroyed) return a;
      if ("function" != typeof t) return a;
      const i = s ? "unshift" : "push";
      return (
        e.split(" ").forEach((e) => {
          (a.eventsListeners[e] || (a.eventsListeners[e] = []),
            a.eventsListeners[e][i](t));
        }),
        a
      );
    },
    once(e, t, s) {
      const a = this;
      if (!a.eventsListeners || a.destroyed) return a;
      if ("function" != typeof t) return a;
      function i() {
        (a.off(e, i), i.__emitterProxy && delete i.__emitterProxy);
        for (var s = arguments.length, r = new Array(s), n = 0; n < s; n++)
          r[n] = arguments[n];
        t.apply(a, r);
      }
      return ((i.__emitterProxy = t), a.on(e, i, s));
    },
    onAny(e, t) {
      const s = this;
      if (!s.eventsListeners || s.destroyed) return s;
      if ("function" != typeof e) return s;
      const a = t ? "unshift" : "push";
      return (
        s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[a](e),
        s
      );
    },
    offAny(e) {
      const t = this;
      if (!t.eventsListeners || t.destroyed) return t;
      if (!t.eventsAnyListeners) return t;
      const s = t.eventsAnyListeners.indexOf(e);
      return (s >= 0 && t.eventsAnyListeners.splice(s, 1), t);
    },
    off(e, t) {
      const s = this;
      return !s.eventsListeners || s.destroyed
        ? s
        : s.eventsListeners
          ? (e.split(" ").forEach((e) => {
              void 0 === t
                ? (s.eventsListeners[e] = [])
                : s.eventsListeners[e] &&
                  s.eventsListeners[e].forEach((a, i) => {
                    (a === t || (a.__emitterProxy && a.__emitterProxy === t)) &&
                      s.eventsListeners[e].splice(i, 1);
                  });
            }),
            s)
          : s;
    },
    emit() {
      const e = this;
      if (!e.eventsListeners || e.destroyed) return e;
      if (!e.eventsListeners) return e;
      let t, s, a;
      for (var i = arguments.length, r = new Array(i), n = 0; n < i; n++)
        r[n] = arguments[n];
      ("string" == typeof r[0] || Array.isArray(r[0])
        ? ((t = r[0]), (s = r.slice(1, r.length)), (a = e))
        : ((t = r[0].events), (s = r[0].data), (a = r[0].context || e)),
        s.unshift(a));
      return (
        (Array.isArray(t) ? t : t.split(" ")).forEach((t) => {
          (e.eventsAnyListeners &&
            e.eventsAnyListeners.length &&
            e.eventsAnyListeners.forEach((e) => {
              e.apply(a, [t, ...s]);
            }),
            e.eventsListeners &&
              e.eventsListeners[t] &&
              e.eventsListeners[t].forEach((e) => {
                e.apply(a, s);
              }));
        }),
        e
      );
    },
  };
  const k = (e, t, s) => {
    t && !e.classList.contains(s)
      ? e.classList.add(s)
      : !t && e.classList.contains(s) && e.classList.remove(s);
  };
  const O = (e, t, s) => {
    t && !e.classList.contains(s)
      ? e.classList.add(s)
      : !t && e.classList.contains(s) && e.classList.remove(s);
  };
  const D = (e, t) => {
      if (!e || e.destroyed || !e.params) return;
      const s = t.closest(
        e.isElement ? "swiper-slide" : `.${e.params.slideClass}`,
      );
      if (s) {
        let t = s.querySelector(`.${e.params.lazyPreloaderClass}`);
        (!t &&
          e.isElement &&
          (s.shadowRoot
            ? (t = s.shadowRoot.querySelector(
                `.${e.params.lazyPreloaderClass}`,
              ))
            : requestAnimationFrame(() => {
                s.shadowRoot &&
                  ((t = s.shadowRoot.querySelector(
                    `.${e.params.lazyPreloaderClass}`,
                  )),
                  t && t.remove());
              })),
          t && t.remove());
      }
    },
    G = (e, t) => {
      if (!e.slides[t]) return;
      const s = e.slides[t].querySelector('[loading="lazy"]');
      s && s.removeAttribute("loading");
    },
    H = (e) => {
      if (!e || e.destroyed || !e.params) return;
      let t = e.params.lazyPreloadPrevNext;
      const s = e.slides.length;
      if (!s || !t || t < 0) return;
      t = Math.min(t, s);
      const a =
          "auto" === e.params.slidesPerView
            ? e.slidesPerViewDynamic()
            : Math.ceil(e.params.slidesPerView),
        i = e.activeIndex;
      if (e.params.grid && e.params.grid.rows > 1) {
        const s = i,
          r = [s - t];
        return (
          r.push(...Array.from({ length: t }).map((e, t) => s + a + t)),
          void e.slides.forEach((t, s) => {
            r.includes(t.column) && G(e, s);
          })
        );
      }
      const r = i + a - 1;
      if (e.params.rewind || e.params.loop)
        for (let a = i - t; a <= r + t; a += 1) {
          const t = ((a % s) + s) % s;
          (t < i || t > r) && G(e, t);
        }
      else
        for (let a = Math.max(i - t, 0); a <= Math.min(r + t, s - 1); a += 1)
          a !== i && (a > r || a < i) && G(e, a);
    };
  var B = {
    updateSize: function () {
      const e = this;
      let t, s;
      const a = e.el;
      ((t =
        void 0 !== e.params.width && null !== e.params.width
          ? e.params.width
          : a.clientWidth),
        (s =
          void 0 !== e.params.height && null !== e.params.height
            ? e.params.height
            : a.clientHeight),
        (0 === t && e.isHorizontal()) ||
          (0 === s && e.isVertical()) ||
          ((t =
            t -
            parseInt(b(a, "padding-left") || 0, 10) -
            parseInt(b(a, "padding-right") || 0, 10)),
          (s =
            s -
            parseInt(b(a, "padding-top") || 0, 10) -
            parseInt(b(a, "padding-bottom") || 0, 10)),
          Number.isNaN(t) && (t = 0),
          Number.isNaN(s) && (s = 0),
          Object.assign(e, {
            width: t,
            height: s,
            size: e.isHorizontal() ? t : s,
          })));
    },
    updateSlides: function () {
      const e = this;
      function t(t, s) {
        return parseFloat(t.getPropertyValue(e.getDirectionLabel(s)) || 0);
      }
      const s = e.params,
        {
          wrapperEl: a,
          slidesEl: i,
          size: r,
          rtlTranslate: n,
          wrongRTL: l,
        } = e,
        o = e.virtual && s.virtual.enabled,
        d = o ? e.virtual.slides.length : e.slides.length,
        c = f(i, `.${e.params.slideClass}, swiper-slide`),
        p = o ? e.virtual.slides.length : c.length;
      let m = [];
      const h = [],
        g = [];
      let v = s.slidesOffsetBefore;
      "function" == typeof v && (v = s.slidesOffsetBefore.call(e));
      let w = s.slidesOffsetAfter;
      "function" == typeof w && (w = s.slidesOffsetAfter.call(e));
      const y = e.snapGrid.length,
        E = e.slidesGrid.length;
      let x = s.spaceBetween,
        T = -v,
        M = 0,
        C = 0;
      if (void 0 === r) return;
      ("string" == typeof x && x.indexOf("%") >= 0
        ? (x = (parseFloat(x.replace("%", "")) / 100) * r)
        : "string" == typeof x && (x = parseFloat(x)),
        (e.virtualSize = -x),
        c.forEach((e) => {
          (n ? (e.style.marginLeft = "") : (e.style.marginRight = ""),
            (e.style.marginBottom = ""),
            (e.style.marginTop = ""));
        }),
        s.centeredSlides &&
          s.cssMode &&
          (u(a, "--swiper-centered-offset-before", ""),
          u(a, "--swiper-centered-offset-after", "")));
      const P = s.grid && s.grid.rows > 1 && e.grid;
      let L;
      P ? e.grid.initSlides(c) : e.grid && e.grid.unsetSlides();
      const I =
        "auto" === s.slidesPerView &&
        s.breakpoints &&
        Object.keys(s.breakpoints).filter(
          (e) => void 0 !== s.breakpoints[e].slidesPerView,
        ).length > 0;
      for (let a = 0; a < p; a += 1) {
        let i;
        if (
          ((L = 0),
          c[a] && (i = c[a]),
          P && e.grid.updateSlide(a, i, c),
          !c[a] || "none" !== b(i, "display"))
        ) {
          if ("auto" === s.slidesPerView) {
            I && (c[a].style[e.getDirectionLabel("width")] = "");
            const r = getComputedStyle(i),
              n = i.style.transform,
              l = i.style.webkitTransform;
            if (
              (n && (i.style.transform = "none"),
              l && (i.style.webkitTransform = "none"),
              s.roundLengths)
            )
              L = e.isHorizontal() ? S(i, "width", !0) : S(i, "height", !0);
            else {
              const e = t(r, "width"),
                s = t(r, "padding-left"),
                a = t(r, "padding-right"),
                n = t(r, "margin-left"),
                l = t(r, "margin-right"),
                o = r.getPropertyValue("box-sizing");
              if (o && "border-box" === o) L = e + n + l;
              else {
                const { clientWidth: t, offsetWidth: r } = i;
                L = e + s + a + n + l + (r - t);
              }
            }
            (n && (i.style.transform = n),
              l && (i.style.webkitTransform = l),
              s.roundLengths && (L = Math.floor(L)));
          } else
            ((L = (r - (s.slidesPerView - 1) * x) / s.slidesPerView),
              s.roundLengths && (L = Math.floor(L)),
              c[a] && (c[a].style[e.getDirectionLabel("width")] = `${L}px`));
          (c[a] && (c[a].swiperSlideSize = L),
            g.push(L),
            s.centeredSlides
              ? ((T = T + L / 2 + M / 2 + x),
                0 === M && 0 !== a && (T = T - r / 2 - x),
                0 === a && (T = T - r / 2 - x),
                Math.abs(T) < 0.001 && (T = 0),
                s.roundLengths && (T = Math.floor(T)),
                C % s.slidesPerGroup == 0 && m.push(T),
                h.push(T))
              : (s.roundLengths && (T = Math.floor(T)),
                (C - Math.min(e.params.slidesPerGroupSkip, C)) %
                  e.params.slidesPerGroup ==
                  0 && m.push(T),
                h.push(T),
                (T = T + L + x)),
            (e.virtualSize += L + x),
            (M = L),
            (C += 1));
        }
      }
      if (
        ((e.virtualSize = Math.max(e.virtualSize, r) + w),
        n &&
          l &&
          ("slide" === s.effect || "coverflow" === s.effect) &&
          (a.style.width = `${e.virtualSize + x}px`),
        s.setWrapperSize &&
          (a.style[e.getDirectionLabel("width")] = `${e.virtualSize + x}px`),
        P && e.grid.updateWrapperSize(L, m),
        !s.centeredSlides)
      ) {
        const t = [];
        for (let a = 0; a < m.length; a += 1) {
          let i = m[a];
          (s.roundLengths && (i = Math.floor(i)),
            m[a] <= e.virtualSize - r && t.push(i));
        }
        ((m = t),
          Math.floor(e.virtualSize - r) - Math.floor(m[m.length - 1]) > 1 &&
            m.push(e.virtualSize - r));
      }
      if (o && s.loop) {
        const t = g[0] + x;
        if (s.slidesPerGroup > 1) {
          const a = Math.ceil(
              (e.virtual.slidesBefore + e.virtual.slidesAfter) /
                s.slidesPerGroup,
            ),
            i = t * s.slidesPerGroup;
          for (let e = 0; e < a; e += 1) m.push(m[m.length - 1] + i);
        }
        for (
          let a = 0;
          a < e.virtual.slidesBefore + e.virtual.slidesAfter;
          a += 1
        )
          (1 === s.slidesPerGroup && m.push(m[m.length - 1] + t),
            h.push(h[h.length - 1] + t),
            (e.virtualSize += t));
      }
      if ((0 === m.length && (m = [0]), 0 !== x)) {
        const t =
          e.isHorizontal() && n
            ? "marginLeft"
            : e.getDirectionLabel("marginRight");
        c.filter(
          (e, t) => !(s.cssMode && !s.loop) || t !== c.length - 1,
        ).forEach((e) => {
          e.style[t] = `${x}px`;
        });
      }
      if (s.centeredSlides && s.centeredSlidesBounds) {
        let e = 0;
        (g.forEach((t) => {
          e += t + (x || 0);
        }),
          (e -= x));
        const t = e > r ? e - r : 0;
        m = m.map((e) => (e <= 0 ? -v : e > t ? t + w : e));
      }
      if (s.centerInsufficientSlides) {
        let e = 0;
        (g.forEach((t) => {
          e += t + (x || 0);
        }),
          (e -= x));
        const t = (s.slidesOffsetBefore || 0) + (s.slidesOffsetAfter || 0);
        if (e + t < r) {
          const s = (r - e - t) / 2;
          (m.forEach((e, t) => {
            m[t] = e - s;
          }),
            h.forEach((e, t) => {
              h[t] = e + s;
            }));
        }
      }
      if (
        (Object.assign(e, {
          slides: c,
          snapGrid: m,
          slidesGrid: h,
          slidesSizesGrid: g,
        }),
        s.centeredSlides && s.cssMode && !s.centeredSlidesBounds)
      ) {
        (u(a, "--swiper-centered-offset-before", -m[0] + "px"),
          u(
            a,
            "--swiper-centered-offset-after",
            e.size / 2 - g[g.length - 1] / 2 + "px",
          ));
        const t = -e.snapGrid[0],
          s = -e.slidesGrid[0];
        ((e.snapGrid = e.snapGrid.map((e) => e + t)),
          (e.slidesGrid = e.slidesGrid.map((e) => e + s)));
      }
      if (
        (p !== d && e.emit("slidesLengthChange"),
        m.length !== y &&
          (e.params.watchOverflow && e.checkOverflow(),
          e.emit("snapGridLengthChange")),
        h.length !== E && e.emit("slidesGridLengthChange"),
        s.watchSlidesProgress && e.updateSlidesOffset(),
        e.emit("slidesUpdated"),
        !(o || s.cssMode || ("slide" !== s.effect && "fade" !== s.effect)))
      ) {
        const t = `${s.containerModifierClass}backface-hidden`,
          a = e.el.classList.contains(t);
        p <= s.maxBackfaceHiddenSlides
          ? a || e.el.classList.add(t)
          : a && e.el.classList.remove(t);
      }
    },
    updateAutoHeight: function (e) {
      const t = this,
        s = [],
        a = t.virtual && t.params.virtual.enabled;
      let i,
        r = 0;
      "number" == typeof e
        ? t.setTransition(e)
        : !0 === e && t.setTransition(t.params.speed);
      const n = (e) => (a ? t.slides[t.getSlideIndexByData(e)] : t.slides[e]);
      if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
        if (t.params.centeredSlides)
          (t.visibleSlides || []).forEach((e) => {
            s.push(e);
          });
        else
          for (i = 0; i < Math.ceil(t.params.slidesPerView); i += 1) {
            const e = t.activeIndex + i;
            if (e > t.slides.length && !a) break;
            s.push(n(e));
          }
      else s.push(n(t.activeIndex));
      for (i = 0; i < s.length; i += 1)
        if (void 0 !== s[i]) {
          const e = s[i].offsetHeight;
          r = e > r ? e : r;
        }
      (r || 0 === r) && (t.wrapperEl.style.height = `${r}px`);
    },
    updateSlidesOffset: function () {
      const e = this,
        t = e.slides,
        s = e.isElement
          ? e.isHorizontal()
            ? e.wrapperEl.offsetLeft
            : e.wrapperEl.offsetTop
          : 0;
      for (let a = 0; a < t.length; a += 1)
        t[a].swiperSlideOffset =
          (e.isHorizontal() ? t[a].offsetLeft : t[a].offsetTop) -
          s -
          e.cssOverflowAdjustment();
    },
    updateSlidesProgress: function (e) {
      void 0 === e && (e = (this && this.translate) || 0);
      const t = this,
        s = t.params,
        { slides: a, rtlTranslate: i, snapGrid: r } = t;
      if (0 === a.length) return;
      void 0 === a[0].swiperSlideOffset && t.updateSlidesOffset();
      let n = -e;
      (i && (n = e), (t.visibleSlidesIndexes = []), (t.visibleSlides = []));
      let l = s.spaceBetween;
      "string" == typeof l && l.indexOf("%") >= 0
        ? (l = (parseFloat(l.replace("%", "")) / 100) * t.size)
        : "string" == typeof l && (l = parseFloat(l));
      for (let e = 0; e < a.length; e += 1) {
        const o = a[e];
        let d = o.swiperSlideOffset;
        s.cssMode && s.centeredSlides && (d -= a[0].swiperSlideOffset);
        const c =
            (n + (s.centeredSlides ? t.minTranslate() : 0) - d) /
            (o.swiperSlideSize + l),
          p =
            (n - r[0] + (s.centeredSlides ? t.minTranslate() : 0) - d) /
            (o.swiperSlideSize + l),
          u = -(n - d),
          m = u + t.slidesSizesGrid[e],
          h = u >= 0 && u <= t.size - t.slidesSizesGrid[e],
          f =
            (u >= 0 && u < t.size - 1) ||
            (m > 1 && m <= t.size) ||
            (u <= 0 && m >= t.size);
        (f && (t.visibleSlides.push(o), t.visibleSlidesIndexes.push(e)),
          k(o, f, s.slideVisibleClass),
          k(o, h, s.slideFullyVisibleClass),
          (o.progress = i ? -c : c),
          (o.originalProgress = i ? -p : p));
      }
    },
    updateProgress: function (e) {
      const t = this;
      if (void 0 === e) {
        const s = t.rtlTranslate ? -1 : 1;
        e = (t && t.translate && t.translate * s) || 0;
      }
      const s = t.params,
        a = t.maxTranslate() - t.minTranslate();
      let { progress: i, isBeginning: r, isEnd: n, progressLoop: l } = t;
      const o = r,
        d = n;
      if (0 === a) ((i = 0), (r = !0), (n = !0));
      else {
        i = (e - t.minTranslate()) / a;
        const s = Math.abs(e - t.minTranslate()) < 1,
          l = Math.abs(e - t.maxTranslate()) < 1;
        ((r = s || i <= 0), (n = l || i >= 1), s && (i = 0), l && (i = 1));
      }
      if (s.loop) {
        const s = t.getSlideIndexByData(0),
          a = t.getSlideIndexByData(t.slides.length - 1),
          i = t.slidesGrid[s],
          r = t.slidesGrid[a],
          n = t.slidesGrid[t.slidesGrid.length - 1],
          o = Math.abs(e);
        ((l = o >= i ? (o - i) / n : (o + n - r) / n), l > 1 && (l -= 1));
      }
      (Object.assign(t, {
        progress: i,
        progressLoop: l,
        isBeginning: r,
        isEnd: n,
      }),
        (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
          t.updateSlidesProgress(e),
        r && !o && t.emit("reachBeginning toEdge"),
        n && !d && t.emit("reachEnd toEdge"),
        ((o && !r) || (d && !n)) && t.emit("fromEdge"),
        t.emit("progress", i));
    },
    updateSlidesClasses: function () {
      const e = this,
        { slides: t, params: s, slidesEl: a, activeIndex: i } = e,
        r = e.virtual && s.virtual.enabled,
        n = e.grid && s.grid && s.grid.rows > 1,
        l = (e) => f(a, `.${s.slideClass}${e}, swiper-slide${e}`)[0];
      let o, d, c;
      if (r)
        if (s.loop) {
          let t = i - e.virtual.slidesBefore;
          (t < 0 && (t = e.virtual.slides.length + t),
            t >= e.virtual.slides.length && (t -= e.virtual.slides.length),
            (o = l(`[data-swiper-slide-index="${t}"]`)));
        } else o = l(`[data-swiper-slide-index="${i}"]`);
      else
        n
          ? ((o = t.filter((e) => e.column === i)[0]),
            (c = t.filter((e) => e.column === i + 1)[0]),
            (d = t.filter((e) => e.column === i - 1)[0]))
          : (o = t[i]);
      (o &&
        (n ||
          ((c = (function (e, t) {
            const s = [];
            for (; e.nextElementSibling; ) {
              const a = e.nextElementSibling;
              (t ? a.matches(t) && s.push(a) : s.push(a), (e = a));
            }
            return s;
          })(o, `.${s.slideClass}, swiper-slide`)[0]),
          s.loop && !c && (c = t[0]),
          (d = (function (e, t) {
            const s = [];
            for (; e.previousElementSibling; ) {
              const a = e.previousElementSibling;
              (t ? a.matches(t) && s.push(a) : s.push(a), (e = a));
            }
            return s;
          })(o, `.${s.slideClass}, swiper-slide`)[0]),
          s.loop && 0 === !d && (d = t[t.length - 1]))),
        t.forEach((e) => {
          (O(e, e === o, s.slideActiveClass),
            O(e, e === c, s.slideNextClass),
            O(e, e === d, s.slidePrevClass));
        }),
        e.emitSlidesClasses());
    },
    updateActiveIndex: function (e) {
      const t = this,
        s = t.rtlTranslate ? t.translate : -t.translate,
        {
          snapGrid: a,
          params: i,
          activeIndex: r,
          realIndex: n,
          snapIndex: l,
        } = t;
      let o,
        d = e;
      const c = (e) => {
        let s = e - t.virtual.slidesBefore;
        return (
          s < 0 && (s = t.virtual.slides.length + s),
          s >= t.virtual.slides.length && (s -= t.virtual.slides.length),
          s
        );
      };
      if (
        (void 0 === d &&
          (d = (function (e) {
            const { slidesGrid: t, params: s } = e,
              a = e.rtlTranslate ? e.translate : -e.translate;
            let i;
            for (let e = 0; e < t.length; e += 1)
              void 0 !== t[e + 1]
                ? a >= t[e] && a < t[e + 1] - (t[e + 1] - t[e]) / 2
                  ? (i = e)
                  : a >= t[e] && a < t[e + 1] && (i = e + 1)
                : a >= t[e] && (i = e);
            return (
              s.normalizeSlideIndex && (i < 0 || void 0 === i) && (i = 0),
              i
            );
          })(t)),
        a.indexOf(s) >= 0)
      )
        o = a.indexOf(s);
      else {
        const e = Math.min(i.slidesPerGroupSkip, d);
        o = e + Math.floor((d - e) / i.slidesPerGroup);
      }
      if ((o >= a.length && (o = a.length - 1), d === r && !t.params.loop))
        return void (o !== l && ((t.snapIndex = o), t.emit("snapIndexChange")));
      if (d === r && t.params.loop && t.virtual && t.params.virtual.enabled)
        return void (t.realIndex = c(d));
      const p = t.grid && i.grid && i.grid.rows > 1;
      let u;
      if (t.virtual && i.virtual.enabled && i.loop) u = c(d);
      else if (p) {
        const e = t.slides.filter((e) => e.column === d)[0];
        let s = parseInt(e.getAttribute("data-swiper-slide-index"), 10);
        (Number.isNaN(s) && (s = Math.max(t.slides.indexOf(e), 0)),
          (u = Math.floor(s / i.grid.rows)));
      } else if (t.slides[d]) {
        const e = t.slides[d].getAttribute("data-swiper-slide-index");
        u = e ? parseInt(e, 10) : d;
      } else u = d;
      (Object.assign(t, {
        previousSnapIndex: l,
        snapIndex: o,
        previousRealIndex: n,
        realIndex: u,
        previousIndex: r,
        activeIndex: d,
      }),
        t.initialized && H(t),
        t.emit("activeIndexChange"),
        t.emit("snapIndexChange"),
        (t.initialized || t.params.runCallbacksOnInit) &&
          (n !== u && t.emit("realIndexChange"), t.emit("slideChange")));
    },
    updateClickedSlide: function (e, t) {
      const s = this,
        a = s.params;
      let i = e.closest(`.${a.slideClass}, swiper-slide`);
      !i &&
        s.isElement &&
        t &&
        t.length > 1 &&
        t.includes(e) &&
        [...t.slice(t.indexOf(e) + 1, t.length)].forEach((e) => {
          !i &&
            e.matches &&
            e.matches(`.${a.slideClass}, swiper-slide`) &&
            (i = e);
        });
      let r,
        n = !1;
      if (i)
        for (let e = 0; e < s.slides.length; e += 1)
          if (s.slides[e] === i) {
            ((n = !0), (r = e));
            break;
          }
      if (!i || !n)
        return ((s.clickedSlide = void 0), void (s.clickedIndex = void 0));
      ((s.clickedSlide = i),
        s.virtual && s.params.virtual.enabled
          ? (s.clickedIndex = parseInt(
              i.getAttribute("data-swiper-slide-index"),
              10,
            ))
          : (s.clickedIndex = r),
        a.slideToClickedSlide &&
          void 0 !== s.clickedIndex &&
          s.clickedIndex !== s.activeIndex &&
          s.slideToClickedSlide());
    },
  };
  var N = {
    getTranslate: function (e) {
      void 0 === e && (e = this.isHorizontal() ? "x" : "y");
      const { params: t, rtlTranslate: s, translate: a, wrapperEl: i } = this;
      if (t.virtualTranslate) return s ? -a : a;
      if (t.cssMode) return a;
      let r = d(i, e);
      return ((r += this.cssOverflowAdjustment()), s && (r = -r), r || 0);
    },
    setTranslate: function (e, t) {
      const s = this,
        { rtlTranslate: a, params: i, wrapperEl: r, progress: n } = s;
      let l,
        o = 0,
        d = 0;
      (s.isHorizontal() ? (o = a ? -e : e) : (d = e),
        i.roundLengths && ((o = Math.floor(o)), (d = Math.floor(d))),
        (s.previousTranslate = s.translate),
        (s.translate = s.isHorizontal() ? o : d),
        i.cssMode
          ? (r[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal()
              ? -o
              : -d)
          : i.virtualTranslate ||
            (s.isHorizontal()
              ? (o -= s.cssOverflowAdjustment())
              : (d -= s.cssOverflowAdjustment()),
            (r.style.transform = `translate3d(${o}px, ${d}px, 0px)`)));
      const c = s.maxTranslate() - s.minTranslate();
      ((l = 0 === c ? 0 : (e - s.minTranslate()) / c),
        l !== n && s.updateProgress(e),
        s.emit("setTranslate", s.translate, t));
    },
    minTranslate: function () {
      return -this.snapGrid[0];
    },
    maxTranslate: function () {
      return -this.snapGrid[this.snapGrid.length - 1];
    },
    translateTo: function (e, t, s, a, i) {
      (void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === s && (s = !0),
        void 0 === a && (a = !0));
      const r = this,
        { params: n, wrapperEl: l } = r;
      if (r.animating && n.preventInteractionOnTransition) return !1;
      const o = r.minTranslate(),
        d = r.maxTranslate();
      let c;
      if (
        ((c = a && e > o ? o : a && e < d ? d : e),
        r.updateProgress(c),
        n.cssMode)
      ) {
        const e = r.isHorizontal();
        if (0 === t) l[e ? "scrollLeft" : "scrollTop"] = -c;
        else {
          if (!r.support.smoothScroll)
            return (
              m({ swiper: r, targetPosition: -c, side: e ? "left" : "top" }),
              !0
            );
          l.scrollTo({ [e ? "left" : "top"]: -c, behavior: "smooth" });
        }
        return !0;
      }
      return (
        0 === t
          ? (r.setTransition(0),
            r.setTranslate(c),
            s &&
              (r.emit("beforeTransitionStart", t, i), r.emit("transitionEnd")))
          : (r.setTransition(t),
            r.setTranslate(c),
            s &&
              (r.emit("beforeTransitionStart", t, i),
              r.emit("transitionStart")),
            r.animating ||
              ((r.animating = !0),
              r.onTranslateToWrapperTransitionEnd ||
                (r.onTranslateToWrapperTransitionEnd = function (e) {
                  r &&
                    !r.destroyed &&
                    e.target === this &&
                    (r.wrapperEl.removeEventListener(
                      "transitionend",
                      r.onTranslateToWrapperTransitionEnd,
                    ),
                    (r.onTranslateToWrapperTransitionEnd = null),
                    delete r.onTranslateToWrapperTransitionEnd,
                    (r.animating = !1),
                    s && r.emit("transitionEnd"));
                }),
              r.wrapperEl.addEventListener(
                "transitionend",
                r.onTranslateToWrapperTransitionEnd,
              ))),
        !0
      );
    },
  };
  function X(e) {
    let { swiper: t, runCallbacks: s, direction: a, step: i } = e;
    const { activeIndex: r, previousIndex: n } = t;
    let l = a;
    if (
      (l || (l = r > n ? "next" : r < n ? "prev" : "reset"),
      t.emit(`transition${i}`),
      s && r !== n)
    ) {
      if ("reset" === l) return void t.emit(`slideResetTransition${i}`);
      (t.emit(`slideChangeTransition${i}`),
        "next" === l
          ? t.emit(`slideNextTransition${i}`)
          : t.emit(`slidePrevTransition${i}`));
    }
  }
  var Y = {
    slideTo: function (e, t, s, a, i) {
      (void 0 === e && (e = 0),
        void 0 === s && (s = !0),
        "string" == typeof e && (e = parseInt(e, 10)));
      const r = this;
      let n = e;
      n < 0 && (n = 0);
      const {
        params: l,
        snapGrid: o,
        slidesGrid: d,
        previousIndex: c,
        activeIndex: p,
        rtlTranslate: u,
        wrapperEl: h,
        enabled: f,
      } = r;
      if (
        (!f && !a && !i) ||
        r.destroyed ||
        (r.animating && l.preventInteractionOnTransition)
      )
        return !1;
      void 0 === t && (t = r.params.speed);
      const g = Math.min(r.params.slidesPerGroupSkip, n);
      let v = g + Math.floor((n - g) / r.params.slidesPerGroup);
      v >= o.length && (v = o.length - 1);
      const w = -o[v];
      if (l.normalizeSlideIndex)
        for (let e = 0; e < d.length; e += 1) {
          const t = -Math.floor(100 * w),
            s = Math.floor(100 * d[e]),
            a = Math.floor(100 * d[e + 1]);
          void 0 !== d[e + 1]
            ? t >= s && t < a - (a - s) / 2
              ? (n = e)
              : t >= s && t < a && (n = e + 1)
            : t >= s && (n = e);
        }
      if (r.initialized && n !== p) {
        if (
          !r.allowSlideNext &&
          (u
            ? w > r.translate && w > r.minTranslate()
            : w < r.translate && w < r.minTranslate())
        )
          return !1;
        if (
          !r.allowSlidePrev &&
          w > r.translate &&
          w > r.maxTranslate() &&
          (p || 0) !== n
        )
          return !1;
      }
      let b;
      (n !== (c || 0) && s && r.emit("beforeSlideChangeStart"),
        r.updateProgress(w),
        (b = n > p ? "next" : n < p ? "prev" : "reset"));
      const y = r.virtual && r.params.virtual.enabled;
      if (!(y && i) && ((u && -w === r.translate) || (!u && w === r.translate)))
        return (
          r.updateActiveIndex(n),
          l.autoHeight && r.updateAutoHeight(),
          r.updateSlidesClasses(),
          "slide" !== l.effect && r.setTranslate(w),
          "reset" !== b && (r.transitionStart(s, b), r.transitionEnd(s, b)),
          !1
        );
      if (l.cssMode) {
        const e = r.isHorizontal(),
          s = u ? w : -w;
        if (0 === t)
          (y &&
            ((r.wrapperEl.style.scrollSnapType = "none"),
            (r._immediateVirtual = !0)),
            y && !r._cssModeVirtualInitialSet && r.params.initialSlide > 0
              ? ((r._cssModeVirtualInitialSet = !0),
                requestAnimationFrame(() => {
                  h[e ? "scrollLeft" : "scrollTop"] = s;
                }))
              : (h[e ? "scrollLeft" : "scrollTop"] = s),
            y &&
              requestAnimationFrame(() => {
                ((r.wrapperEl.style.scrollSnapType = ""),
                  (r._immediateVirtual = !1));
              }));
        else {
          if (!r.support.smoothScroll)
            return (
              m({ swiper: r, targetPosition: s, side: e ? "left" : "top" }),
              !0
            );
          h.scrollTo({ [e ? "left" : "top"]: s, behavior: "smooth" });
        }
        return !0;
      }
      return (
        r.setTransition(t),
        r.setTranslate(w),
        r.updateActiveIndex(n),
        r.updateSlidesClasses(),
        r.emit("beforeTransitionStart", t, a),
        r.transitionStart(s, b),
        0 === t
          ? r.transitionEnd(s, b)
          : r.animating ||
            ((r.animating = !0),
            r.onSlideToWrapperTransitionEnd ||
              (r.onSlideToWrapperTransitionEnd = function (e) {
                r &&
                  !r.destroyed &&
                  e.target === this &&
                  (r.wrapperEl.removeEventListener(
                    "transitionend",
                    r.onSlideToWrapperTransitionEnd,
                  ),
                  (r.onSlideToWrapperTransitionEnd = null),
                  delete r.onSlideToWrapperTransitionEnd,
                  r.transitionEnd(s, b));
              }),
            r.wrapperEl.addEventListener(
              "transitionend",
              r.onSlideToWrapperTransitionEnd,
            )),
        !0
      );
    },
    slideToLoop: function (e, t, s, a) {
      if (
        (void 0 === e && (e = 0),
        void 0 === s && (s = !0),
        "string" == typeof e)
      ) {
        e = parseInt(e, 10);
      }
      const i = this;
      if (i.destroyed) return;
      void 0 === t && (t = i.params.speed);
      const r = i.grid && i.params.grid && i.params.grid.rows > 1;
      let n = e;
      if (i.params.loop)
        if (i.virtual && i.params.virtual.enabled) n += i.virtual.slidesBefore;
        else {
          let e;
          if (r) {
            const t = n * i.params.grid.rows;
            e = i.slides.filter(
              (e) => 1 * e.getAttribute("data-swiper-slide-index") === t,
            )[0].column;
          } else e = i.getSlideIndexByData(n);
          const t = r
              ? Math.ceil(i.slides.length / i.params.grid.rows)
              : i.slides.length,
            { centeredSlides: s } = i.params;
          let l = i.params.slidesPerView;
          "auto" === l
            ? (l = i.slidesPerViewDynamic())
            : ((l = Math.ceil(parseFloat(i.params.slidesPerView, 10))),
              s && l % 2 == 0 && (l += 1));
          let o = t - e < l;
          if (
            (s && (o = o || e < Math.ceil(l / 2)),
            a && s && "auto" !== i.params.slidesPerView && !r && (o = !1),
            o)
          ) {
            const a = s
              ? e < i.activeIndex
                ? "prev"
                : "next"
              : e - i.activeIndex - 1 < i.params.slidesPerView
                ? "next"
                : "prev";
            i.loopFix({
              direction: a,
              slideTo: !0,
              activeSlideIndex: "next" === a ? e + 1 : e - t + 1,
              slideRealIndex: "next" === a ? i.realIndex : void 0,
            });
          }
          if (r) {
            const e = n * i.params.grid.rows;
            n = i.slides.filter(
              (t) => 1 * t.getAttribute("data-swiper-slide-index") === e,
            )[0].column;
          } else n = i.getSlideIndexByData(n);
        }
      return (
        requestAnimationFrame(() => {
          i.slideTo(n, t, s, a);
        }),
        i
      );
    },
    slideNext: function (e, t, s) {
      void 0 === t && (t = !0);
      const a = this,
        { enabled: i, params: r, animating: n } = a;
      if (!i || a.destroyed) return a;
      void 0 === e && (e = a.params.speed);
      let l = r.slidesPerGroup;
      "auto" === r.slidesPerView &&
        1 === r.slidesPerGroup &&
        r.slidesPerGroupAuto &&
        (l = Math.max(a.slidesPerViewDynamic("current", !0), 1));
      const o = a.activeIndex < r.slidesPerGroupSkip ? 1 : l,
        d = a.virtual && r.virtual.enabled;
      if (r.loop) {
        if (n && !d && r.loopPreventsSliding) return !1;
        if (
          (a.loopFix({ direction: "next" }),
          (a._clientLeft = a.wrapperEl.clientLeft),
          a.activeIndex === a.slides.length - 1 && r.cssMode)
        )
          return (
            requestAnimationFrame(() => {
              a.slideTo(a.activeIndex + o, e, t, s);
            }),
            !0
          );
      }
      return r.rewind && a.isEnd
        ? a.slideTo(0, e, t, s)
        : a.slideTo(a.activeIndex + o, e, t, s);
    },
    slidePrev: function (e, t, s) {
      void 0 === t && (t = !0);
      const a = this,
        {
          params: i,
          snapGrid: r,
          slidesGrid: n,
          rtlTranslate: l,
          enabled: o,
          animating: d,
        } = a;
      if (!o || a.destroyed) return a;
      void 0 === e && (e = a.params.speed);
      const c = a.virtual && i.virtual.enabled;
      if (i.loop) {
        if (d && !c && i.loopPreventsSliding) return !1;
        (a.loopFix({ direction: "prev" }),
          (a._clientLeft = a.wrapperEl.clientLeft));
      }
      function p(e) {
        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
      }
      const u = p(l ? a.translate : -a.translate),
        m = r.map((e) => p(e));
      let h = r[m.indexOf(u) - 1];
      if (void 0 === h && i.cssMode) {
        let e;
        (r.forEach((t, s) => {
          u >= t && (e = s);
        }),
          void 0 !== e && (h = r[e > 0 ? e - 1 : e]));
      }
      let f = 0;
      if (
        (void 0 !== h &&
          ((f = n.indexOf(h)),
          f < 0 && (f = a.activeIndex - 1),
          "auto" === i.slidesPerView &&
            1 === i.slidesPerGroup &&
            i.slidesPerGroupAuto &&
            ((f = f - a.slidesPerViewDynamic("previous", !0) + 1),
            (f = Math.max(f, 0)))),
        i.rewind && a.isBeginning)
      ) {
        const i =
          a.params.virtual && a.params.virtual.enabled && a.virtual
            ? a.virtual.slides.length - 1
            : a.slides.length - 1;
        return a.slideTo(i, e, t, s);
      }
      return i.loop && 0 === a.activeIndex && i.cssMode
        ? (requestAnimationFrame(() => {
            a.slideTo(f, e, t, s);
          }),
          !0)
        : a.slideTo(f, e, t, s);
    },
    slideReset: function (e, t, s) {
      void 0 === t && (t = !0);
      const a = this;
      if (!a.destroyed)
        return (
          void 0 === e && (e = a.params.speed),
          a.slideTo(a.activeIndex, e, t, s)
        );
    },
    slideToClosest: function (e, t, s, a) {
      (void 0 === t && (t = !0), void 0 === a && (a = 0.5));
      const i = this;
      if (i.destroyed) return;
      void 0 === e && (e = i.params.speed);
      let r = i.activeIndex;
      const n = Math.min(i.params.slidesPerGroupSkip, r),
        l = n + Math.floor((r - n) / i.params.slidesPerGroup),
        o = i.rtlTranslate ? i.translate : -i.translate;
      if (o >= i.snapGrid[l]) {
        const e = i.snapGrid[l];
        o - e > (i.snapGrid[l + 1] - e) * a && (r += i.params.slidesPerGroup);
      } else {
        const e = i.snapGrid[l - 1];
        o - e <= (i.snapGrid[l] - e) * a && (r -= i.params.slidesPerGroup);
      }
      return (
        (r = Math.max(r, 0)),
        (r = Math.min(r, i.slidesGrid.length - 1)),
        i.slideTo(r, e, t, s)
      );
    },
    slideToClickedSlide: function () {
      const e = this;
      if (e.destroyed) return;
      const { params: t, slidesEl: s } = e,
        a =
          "auto" === t.slidesPerView
            ? e.slidesPerViewDynamic()
            : t.slidesPerView;
      let i,
        r = e.clickedIndex;
      const n = e.isElement ? "swiper-slide" : `.${t.slideClass}`;
      if (t.loop) {
        if (e.animating) return;
        ((i = parseInt(
          e.clickedSlide.getAttribute("data-swiper-slide-index"),
          10,
        )),
          t.centeredSlides
            ? r < e.loopedSlides - a / 2 ||
              r > e.slides.length - e.loopedSlides + a / 2
              ? (e.loopFix(),
                (r = e.getSlideIndex(
                  f(s, `${n}[data-swiper-slide-index="${i}"]`)[0],
                )),
                l(() => {
                  e.slideTo(r);
                }))
              : e.slideTo(r)
            : r > e.slides.length - a
              ? (e.loopFix(),
                (r = e.getSlideIndex(
                  f(s, `${n}[data-swiper-slide-index="${i}"]`)[0],
                )),
                l(() => {
                  e.slideTo(r);
                }))
              : e.slideTo(r));
      } else e.slideTo(r);
    },
  };
  var R = {
    loopCreate: function (e) {
      const t = this,
        { params: s, slidesEl: a } = t;
      if (!s.loop || (t.virtual && t.params.virtual.enabled)) return;
      const i = () => {
          f(a, `.${s.slideClass}, swiper-slide`).forEach((e, t) => {
            e.setAttribute("data-swiper-slide-index", t);
          });
        },
        r = t.grid && s.grid && s.grid.rows > 1,
        n = s.slidesPerGroup * (r ? s.grid.rows : 1),
        l = t.slides.length % n != 0,
        o = r && t.slides.length % s.grid.rows != 0,
        d = (e) => {
          for (let a = 0; a < e; a += 1) {
            const e = t.isElement
              ? v("swiper-slide", [s.slideBlankClass])
              : v("div", [s.slideClass, s.slideBlankClass]);
            t.slidesEl.append(e);
          }
        };
      if (l) {
        if (s.loopAddBlankSlides) {
          (d(n - (t.slides.length % n)), t.recalcSlides(), t.updateSlides());
        } else
          g(
            "Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)",
          );
        i();
      } else if (o) {
        if (s.loopAddBlankSlides) {
          (d(s.grid.rows - (t.slides.length % s.grid.rows)),
            t.recalcSlides(),
            t.updateSlides());
        } else
          g(
            "Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)",
          );
        i();
      } else i();
      t.loopFix({
        slideRealIndex: e,
        direction: s.centeredSlides ? void 0 : "next",
      });
    },
    loopFix: function (e) {
      let {
        slideRealIndex: t,
        slideTo: s = !0,
        direction: a,
        setTranslate: i,
        activeSlideIndex: r,
        byController: n,
        byMousewheel: l,
      } = void 0 === e ? {} : e;
      const o = this;
      if (!o.params.loop) return;
      o.emit("beforeLoopFix");
      const {
          slides: d,
          allowSlidePrev: c,
          allowSlideNext: p,
          slidesEl: u,
          params: m,
        } = o,
        { centeredSlides: h } = m;
      if (
        ((o.allowSlidePrev = !0),
        (o.allowSlideNext = !0),
        o.virtual && m.virtual.enabled)
      )
        return (
          s &&
            (m.centeredSlides || 0 !== o.snapIndex
              ? m.centeredSlides && o.snapIndex < m.slidesPerView
                ? o.slideTo(o.virtual.slides.length + o.snapIndex, 0, !1, !0)
                : o.snapIndex === o.snapGrid.length - 1 &&
                  o.slideTo(o.virtual.slidesBefore, 0, !1, !0)
              : o.slideTo(o.virtual.slides.length, 0, !1, !0)),
          (o.allowSlidePrev = c),
          (o.allowSlideNext = p),
          void o.emit("loopFix")
        );
      let f = m.slidesPerView;
      "auto" === f
        ? (f = o.slidesPerViewDynamic())
        : ((f = Math.ceil(parseFloat(m.slidesPerView, 10))),
          h && f % 2 == 0 && (f += 1));
      const v = m.slidesPerGroupAuto ? f : m.slidesPerGroup;
      let w = v;
      (w % v != 0 && (w += v - (w % v)),
        (w += m.loopAdditionalSlides),
        (o.loopedSlides = w));
      const b = o.grid && m.grid && m.grid.rows > 1;
      d.length < f + w
        ? g(
            "Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters",
          )
        : b &&
          "row" === m.grid.fill &&
          g(
            "Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`",
          );
      const y = [],
        E = [];
      let x = o.activeIndex;
      void 0 === r
        ? (r = o.getSlideIndex(
            d.filter((e) => e.classList.contains(m.slideActiveClass))[0],
          ))
        : (x = r);
      const S = "next" === a || !a,
        T = "prev" === a || !a;
      let M = 0,
        C = 0;
      const P = b ? Math.ceil(d.length / m.grid.rows) : d.length,
        L = (b ? d[r].column : r) + (h && void 0 === i ? -f / 2 + 0.5 : 0);
      if (L < w) {
        M = Math.max(w - L, v);
        for (let e = 0; e < w - L; e += 1) {
          const t = e - Math.floor(e / P) * P;
          if (b) {
            const e = P - t - 1;
            for (let t = d.length - 1; t >= 0; t -= 1)
              d[t].column === e && y.push(t);
          } else y.push(P - t - 1);
        }
      } else if (L + f > P - w) {
        C = Math.max(L - (P - 2 * w), v);
        for (let e = 0; e < C; e += 1) {
          const t = e - Math.floor(e / P) * P;
          b
            ? d.forEach((e, s) => {
                e.column === t && E.push(s);
              })
            : E.push(t);
        }
      }
      if (
        ((o.__preventObserver__ = !0),
        requestAnimationFrame(() => {
          o.__preventObserver__ = !1;
        }),
        T &&
          y.forEach((e) => {
            ((d[e].swiperLoopMoveDOM = !0),
              u.prepend(d[e]),
              (d[e].swiperLoopMoveDOM = !1));
          }),
        S &&
          E.forEach((e) => {
            ((d[e].swiperLoopMoveDOM = !0),
              u.append(d[e]),
              (d[e].swiperLoopMoveDOM = !1));
          }),
        o.recalcSlides(),
        "auto" === m.slidesPerView
          ? o.updateSlides()
          : b &&
            ((y.length > 0 && T) || (E.length > 0 && S)) &&
            o.slides.forEach((e, t) => {
              o.grid.updateSlide(t, e, o.slides);
            }),
        m.watchSlidesProgress && o.updateSlidesOffset(),
        s)
      )
        if (y.length > 0 && T) {
          if (void 0 === t) {
            const e = o.slidesGrid[x],
              t = o.slidesGrid[x + M] - e;
            l
              ? o.setTranslate(o.translate - t)
              : (o.slideTo(x + Math.ceil(M), 0, !1, !0),
                i &&
                  ((o.touchEventsData.startTranslate =
                    o.touchEventsData.startTranslate - t),
                  (o.touchEventsData.currentTranslate =
                    o.touchEventsData.currentTranslate - t)));
          } else if (i) {
            const e = b ? y.length / m.grid.rows : y.length;
            (o.slideTo(o.activeIndex + e, 0, !1, !0),
              (o.touchEventsData.currentTranslate = o.translate));
          }
        } else if (E.length > 0 && S)
          if (void 0 === t) {
            const e = o.slidesGrid[x],
              t = o.slidesGrid[x - C] - e;
            l
              ? o.setTranslate(o.translate - t)
              : (o.slideTo(x - C, 0, !1, !0),
                i &&
                  ((o.touchEventsData.startTranslate =
                    o.touchEventsData.startTranslate - t),
                  (o.touchEventsData.currentTranslate =
                    o.touchEventsData.currentTranslate - t)));
          } else {
            const e = b ? E.length / m.grid.rows : E.length;
            o.slideTo(o.activeIndex - e, 0, !1, !0);
          }
      if (
        ((o.allowSlidePrev = c),
        (o.allowSlideNext = p),
        o.controller && o.controller.control && !n)
      ) {
        const e = {
          slideRealIndex: t,
          direction: a,
          setTranslate: i,
          activeSlideIndex: r,
          byController: !0,
        };
        Array.isArray(o.controller.control)
          ? o.controller.control.forEach((t) => {
              !t.destroyed &&
                t.params.loop &&
                t.loopFix({
                  ...e,
                  slideTo: t.params.slidesPerView === m.slidesPerView && s,
                });
            })
          : o.controller.control instanceof o.constructor &&
            o.controller.control.params.loop &&
            o.controller.control.loopFix({
              ...e,
              slideTo:
                o.controller.control.params.slidesPerView === m.slidesPerView &&
                s,
            });
      }
      o.emit("loopFix");
    },
    loopDestroy: function () {
      const e = this,
        { params: t, slidesEl: s } = e;
      if (!t.loop || (e.virtual && e.params.virtual.enabled)) return;
      e.recalcSlides();
      const a = [];
      (e.slides.forEach((e) => {
        const t =
          void 0 === e.swiperSlideIndex
            ? 1 * e.getAttribute("data-swiper-slide-index")
            : e.swiperSlideIndex;
        a[t] = e;
      }),
        e.slides.forEach((e) => {
          e.removeAttribute("data-swiper-slide-index");
        }),
        a.forEach((e) => {
          s.append(e);
        }),
        e.recalcSlides(),
        e.slideTo(e.realIndex, 0));
    },
  };
  function q(e, t, s) {
    const a = r(),
      { params: i } = e,
      n = i.edgeSwipeDetection,
      l = i.edgeSwipeThreshold;
    return (
      !n ||
      !(s <= l || s >= a.innerWidth - l) ||
      ("prevent" === n && (t.preventDefault(), !0))
    );
  }
  function F(e) {
    const t = this,
      s = a();
    let i = e;
    i.originalEvent && (i = i.originalEvent);
    const n = t.touchEventsData;
    if ("pointerdown" === i.type) {
      if (null !== n.pointerId && n.pointerId !== i.pointerId) return;
      n.pointerId = i.pointerId;
    } else
      "touchstart" === i.type &&
        1 === i.targetTouches.length &&
        (n.touchId = i.targetTouches[0].identifier);
    if ("touchstart" === i.type) return void q(t, i, i.targetTouches[0].pageX);
    const { params: l, touches: d, enabled: c } = t;
    if (!c) return;
    if (!l.simulateTouch && "mouse" === i.pointerType) return;
    if (t.animating && l.preventInteractionOnTransition) return;
    !t.animating && l.cssMode && l.loop && t.loopFix();
    let p = i.target;
    if (
      "wrapper" === l.touchEventsTarget &&
      !(function (e, t) {
        const s = t.contains(e);
        if (!s && t instanceof HTMLSlotElement)
          return [...t.assignedElements()].includes(e);
        return s;
      })(p, t.wrapperEl)
    )
      return;
    if ("which" in i && 3 === i.which) return;
    if ("button" in i && i.button > 0) return;
    if (n.isTouched && n.isMoved) return;
    const u = !!l.noSwipingClass && "" !== l.noSwipingClass,
      m = i.composedPath ? i.composedPath() : i.path;
    u && i.target && i.target.shadowRoot && m && (p = m[0]);
    const h = l.noSwipingSelector
        ? l.noSwipingSelector
        : `.${l.noSwipingClass}`,
      f = !(!i.target || !i.target.shadowRoot);
    if (
      l.noSwiping &&
      (f
        ? (function (e, t) {
            return (
              void 0 === t && (t = this),
              (function t(s) {
                if (!s || s === a() || s === r()) return null;
                s.assignedSlot && (s = s.assignedSlot);
                const i = s.closest(e);
                return i || s.getRootNode ? i || t(s.getRootNode().host) : null;
              })(t)
            );
          })(h, p)
        : p.closest(h))
    )
      return void (t.allowClick = !0);
    if (l.swipeHandler && !p.closest(l.swipeHandler)) return;
    ((d.currentX = i.pageX), (d.currentY = i.pageY));
    const g = d.currentX,
      v = d.currentY;
    if (!q(t, i, g)) return;
    (Object.assign(n, {
      isTouched: !0,
      isMoved: !1,
      allowTouchCallbacks: !0,
      isScrolling: void 0,
      startMoving: void 0,
    }),
      (d.startX = g),
      (d.startY = v),
      (n.touchStartTime = o()),
      (t.allowClick = !0),
      t.updateSize(),
      (t.swipeDirection = void 0),
      l.threshold > 0 && (n.allowThresholdMove = !1));
    let w = !0;
    (p.matches(n.focusableElements) &&
      ((w = !1), "SELECT" === p.nodeName && (n.isTouched = !1)),
      s.activeElement &&
        s.activeElement.matches(n.focusableElements) &&
        s.activeElement !== p &&
        ("mouse" === i.pointerType ||
          ("mouse" !== i.pointerType && !p.matches(n.focusableElements))) &&
        s.activeElement.blur());
    const b = w && t.allowTouchMove && l.touchStartPreventDefault;
    ((!l.touchStartForcePreventDefault && !b) ||
      p.isContentEditable ||
      i.preventDefault(),
      l.freeMode &&
        l.freeMode.enabled &&
        t.freeMode &&
        t.animating &&
        !l.cssMode &&
        t.freeMode.onTouchStart(),
      t.emit("touchStart", i));
  }
  function V(e) {
    const t = a(),
      s = this,
      i = s.touchEventsData,
      { params: r, touches: n, rtlTranslate: l, enabled: d } = s;
    if (!d) return;
    if (!r.simulateTouch && "mouse" === e.pointerType) return;
    let c,
      p = e;
    if ((p.originalEvent && (p = p.originalEvent), "pointermove" === p.type)) {
      if (null !== i.touchId) return;
      if (p.pointerId !== i.pointerId) return;
    }
    if ("touchmove" === p.type) {
      if (
        ((c = [...p.changedTouches].filter(
          (e) => e.identifier === i.touchId,
        )[0]),
        !c || c.identifier !== i.touchId)
      )
        return;
    } else c = p;
    if (!i.isTouched)
      return void (
        i.startMoving &&
        i.isScrolling &&
        s.emit("touchMoveOpposite", p)
      );
    const u = c.pageX,
      m = c.pageY;
    if (p.preventedByNestedSwiper) return ((n.startX = u), void (n.startY = m));
    if (!s.allowTouchMove)
      return (
        p.target.matches(i.focusableElements) || (s.allowClick = !1),
        void (
          i.isTouched &&
          (Object.assign(n, { startX: u, startY: m, currentX: u, currentY: m }),
          (i.touchStartTime = o()))
        )
      );
    if (r.touchReleaseOnEdges && !r.loop)
      if (s.isVertical()) {
        if (
          (m < n.startY && s.translate <= s.maxTranslate()) ||
          (m > n.startY && s.translate >= s.minTranslate())
        )
          return ((i.isTouched = !1), void (i.isMoved = !1));
      } else if (
        (u < n.startX && s.translate <= s.maxTranslate()) ||
        (u > n.startX && s.translate >= s.minTranslate())
      )
        return;
    if (
      (t.activeElement &&
        t.activeElement.matches(i.focusableElements) &&
        t.activeElement !== p.target &&
        "mouse" !== p.pointerType &&
        t.activeElement.blur(),
      t.activeElement &&
        p.target === t.activeElement &&
        p.target.matches(i.focusableElements))
    )
      return ((i.isMoved = !0), void (s.allowClick = !1));
    (i.allowTouchCallbacks && s.emit("touchMove", p),
      (n.previousX = n.currentX),
      (n.previousY = n.currentY),
      (n.currentX = u),
      (n.currentY = m));
    const h = n.currentX - n.startX,
      f = n.currentY - n.startY;
    if (s.params.threshold && Math.sqrt(h ** 2 + f ** 2) < s.params.threshold)
      return;
    if (void 0 === i.isScrolling) {
      let e;
      (s.isHorizontal() && n.currentY === n.startY) ||
      (s.isVertical() && n.currentX === n.startX)
        ? (i.isScrolling = !1)
        : h * h + f * f >= 25 &&
          ((e = (180 * Math.atan2(Math.abs(f), Math.abs(h))) / Math.PI),
          (i.isScrolling = s.isHorizontal()
            ? e > r.touchAngle
            : 90 - e > r.touchAngle));
    }
    if (
      (i.isScrolling && s.emit("touchMoveOpposite", p),
      void 0 === i.startMoving &&
        ((n.currentX === n.startX && n.currentY === n.startY) ||
          (i.startMoving = !0)),
      i.isScrolling ||
        ("touchmove" === p.type && i.preventTouchMoveFromPointerMove))
    )
      return void (i.isTouched = !1);
    if (!i.startMoving) return;
    ((s.allowClick = !1),
      !r.cssMode && p.cancelable && p.preventDefault(),
      r.touchMoveStopPropagation && !r.nested && p.stopPropagation());
    let g = s.isHorizontal() ? h : f,
      v = s.isHorizontal()
        ? n.currentX - n.previousX
        : n.currentY - n.previousY;
    (r.oneWayMovement &&
      ((g = Math.abs(g) * (l ? 1 : -1)), (v = Math.abs(v) * (l ? 1 : -1))),
      (n.diff = g),
      (g *= r.touchRatio),
      l && ((g = -g), (v = -v)));
    const w = s.touchesDirection;
    ((s.swipeDirection = g > 0 ? "prev" : "next"),
      (s.touchesDirection = v > 0 ? "prev" : "next"));
    const b = s.params.loop && !r.cssMode,
      y =
        ("next" === s.touchesDirection && s.allowSlideNext) ||
        ("prev" === s.touchesDirection && s.allowSlidePrev);
    if (!i.isMoved) {
      if (
        (b && y && s.loopFix({ direction: s.swipeDirection }),
        (i.startTranslate = s.getTranslate()),
        s.setTransition(0),
        s.animating)
      ) {
        const e = new window.CustomEvent("transitionend", {
          bubbles: !0,
          cancelable: !0,
          detail: { bySwiperTouchMove: !0 },
        });
        s.wrapperEl.dispatchEvent(e);
      }
      ((i.allowMomentumBounce = !1),
        !r.grabCursor ||
          (!0 !== s.allowSlideNext && !0 !== s.allowSlidePrev) ||
          s.setGrabCursor(!0),
        s.emit("sliderFirstMove", p));
    }
    if (
      (new Date().getTime(),
      i.isMoved &&
        i.allowThresholdMove &&
        w !== s.touchesDirection &&
        b &&
        y &&
        Math.abs(g) >= 1)
    )
      return (
        Object.assign(n, {
          startX: u,
          startY: m,
          currentX: u,
          currentY: m,
          startTranslate: i.currentTranslate,
        }),
        (i.loopSwapReset = !0),
        void (i.startTranslate = i.currentTranslate)
      );
    (s.emit("sliderMove", p),
      (i.isMoved = !0),
      (i.currentTranslate = g + i.startTranslate));
    let E = !0,
      x = r.resistanceRatio;
    if (
      (r.touchReleaseOnEdges && (x = 0),
      g > 0
        ? (b &&
            y &&
            i.allowThresholdMove &&
            i.currentTranslate >
              (r.centeredSlides
                ? s.minTranslate() -
                  s.slidesSizesGrid[s.activeIndex + 1] -
                  ("auto" !== r.slidesPerView &&
                  s.slides.length - r.slidesPerView >= 2
                    ? s.slidesSizesGrid[s.activeIndex + 1] +
                      s.params.spaceBetween
                    : 0) -
                  s.params.spaceBetween
                : s.minTranslate()) &&
            s.loopFix({
              direction: "prev",
              setTranslate: !0,
              activeSlideIndex: 0,
            }),
          i.currentTranslate > s.minTranslate() &&
            ((E = !1),
            r.resistance &&
              (i.currentTranslate =
                s.minTranslate() -
                1 +
                (-s.minTranslate() + i.startTranslate + g) ** x)))
        : g < 0 &&
          (b &&
            y &&
            i.allowThresholdMove &&
            i.currentTranslate <
              (r.centeredSlides
                ? s.maxTranslate() +
                  s.slidesSizesGrid[s.slidesSizesGrid.length - 1] +
                  s.params.spaceBetween +
                  ("auto" !== r.slidesPerView &&
                  s.slides.length - r.slidesPerView >= 2
                    ? s.slidesSizesGrid[s.slidesSizesGrid.length - 1] +
                      s.params.spaceBetween
                    : 0)
                : s.maxTranslate()) &&
            s.loopFix({
              direction: "next",
              setTranslate: !0,
              activeSlideIndex:
                s.slides.length -
                ("auto" === r.slidesPerView
                  ? s.slidesPerViewDynamic()
                  : Math.ceil(parseFloat(r.slidesPerView, 10))),
            }),
          i.currentTranslate < s.maxTranslate() &&
            ((E = !1),
            r.resistance &&
              (i.currentTranslate =
                s.maxTranslate() +
                1 -
                (s.maxTranslate() - i.startTranslate - g) ** x))),
      E && (p.preventedByNestedSwiper = !0),
      !s.allowSlideNext &&
        "next" === s.swipeDirection &&
        i.currentTranslate < i.startTranslate &&
        (i.currentTranslate = i.startTranslate),
      !s.allowSlidePrev &&
        "prev" === s.swipeDirection &&
        i.currentTranslate > i.startTranslate &&
        (i.currentTranslate = i.startTranslate),
      s.allowSlidePrev ||
        s.allowSlideNext ||
        (i.currentTranslate = i.startTranslate),
      r.threshold > 0)
    ) {
      if (!(Math.abs(g) > r.threshold || i.allowThresholdMove))
        return void (i.currentTranslate = i.startTranslate);
      if (!i.allowThresholdMove)
        return (
          (i.allowThresholdMove = !0),
          (n.startX = n.currentX),
          (n.startY = n.currentY),
          (i.currentTranslate = i.startTranslate),
          void (n.diff = s.isHorizontal()
            ? n.currentX - n.startX
            : n.currentY - n.startY)
        );
    }
    r.followFinger &&
      !r.cssMode &&
      (((r.freeMode && r.freeMode.enabled && s.freeMode) ||
        r.watchSlidesProgress) &&
        (s.updateActiveIndex(), s.updateSlidesClasses()),
      r.freeMode &&
        r.freeMode.enabled &&
        s.freeMode &&
        s.freeMode.onTouchMove(),
      s.updateProgress(i.currentTranslate),
      s.setTranslate(i.currentTranslate));
  }
  function _(e) {
    const t = this,
      s = t.touchEventsData;
    let a,
      i = e;
    i.originalEvent && (i = i.originalEvent);
    if ("touchend" === i.type || "touchcancel" === i.type) {
      if (
        ((a = [...i.changedTouches].filter(
          (e) => e.identifier === s.touchId,
        )[0]),
        !a || a.identifier !== s.touchId)
      )
        return;
    } else {
      if (null !== s.touchId) return;
      if (i.pointerId !== s.pointerId) return;
      a = i;
    }
    if (
      ["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(
        i.type,
      )
    ) {
      if (
        !(
          ["pointercancel", "contextmenu"].includes(i.type) &&
          (t.browser.isSafari || t.browser.isWebView)
        )
      )
        return;
    }
    ((s.pointerId = null), (s.touchId = null));
    const {
      params: r,
      touches: n,
      rtlTranslate: d,
      slidesGrid: c,
      enabled: p,
    } = t;
    if (!p) return;
    if (!r.simulateTouch && "mouse" === i.pointerType) return;
    if (
      (s.allowTouchCallbacks && t.emit("touchEnd", i),
      (s.allowTouchCallbacks = !1),
      !s.isTouched)
    )
      return (
        s.isMoved && r.grabCursor && t.setGrabCursor(!1),
        (s.isMoved = !1),
        void (s.startMoving = !1)
      );
    r.grabCursor &&
      s.isMoved &&
      s.isTouched &&
      (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
      t.setGrabCursor(!1);
    const u = o(),
      m = u - s.touchStartTime;
    if (t.allowClick) {
      const e = i.path || (i.composedPath && i.composedPath());
      (t.updateClickedSlide((e && e[0]) || i.target, e),
        t.emit("tap click", i),
        m < 300 &&
          u - s.lastClickTime < 300 &&
          t.emit("doubleTap doubleClick", i));
    }
    if (
      ((s.lastClickTime = o()),
      l(() => {
        t.destroyed || (t.allowClick = !0);
      }),
      !s.isTouched ||
        !s.isMoved ||
        !t.swipeDirection ||
        (0 === n.diff && !s.loopSwapReset) ||
        (s.currentTranslate === s.startTranslate && !s.loopSwapReset))
    )
      return ((s.isTouched = !1), (s.isMoved = !1), void (s.startMoving = !1));
    let h;
    if (
      ((s.isTouched = !1),
      (s.isMoved = !1),
      (s.startMoving = !1),
      (h = r.followFinger
        ? d
          ? t.translate
          : -t.translate
        : -s.currentTranslate),
      r.cssMode)
    )
      return;
    if (r.freeMode && r.freeMode.enabled)
      return void t.freeMode.onTouchEnd({ currentPos: h });
    const f = h >= -t.maxTranslate() && !t.params.loop;
    let g = 0,
      v = t.slidesSizesGrid[0];
    for (
      let e = 0;
      e < c.length;
      e += e < r.slidesPerGroupSkip ? 1 : r.slidesPerGroup
    ) {
      const t = e < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
      void 0 !== c[e + t]
        ? (f || (h >= c[e] && h < c[e + t])) && ((g = e), (v = c[e + t] - c[e]))
        : (f || h >= c[e]) &&
          ((g = e), (v = c[c.length - 1] - c[c.length - 2]));
    }
    let w = null,
      b = null;
    r.rewind &&
      (t.isBeginning
        ? (b =
            r.virtual && r.virtual.enabled && t.virtual
              ? t.virtual.slides.length - 1
              : t.slides.length - 1)
        : t.isEnd && (w = 0));
    const y = (h - c[g]) / v,
      E = g < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
    if (m > r.longSwipesMs) {
      if (!r.longSwipes) return void t.slideTo(t.activeIndex);
      ("next" === t.swipeDirection &&
        (y >= r.longSwipesRatio
          ? t.slideTo(r.rewind && t.isEnd ? w : g + E)
          : t.slideTo(g)),
        "prev" === t.swipeDirection &&
          (y > 1 - r.longSwipesRatio
            ? t.slideTo(g + E)
            : null !== b && y < 0 && Math.abs(y) > r.longSwipesRatio
              ? t.slideTo(b)
              : t.slideTo(g)));
    } else {
      if (!r.shortSwipes) return void t.slideTo(t.activeIndex);
      t.navigation &&
      (i.target === t.navigation.nextEl || i.target === t.navigation.prevEl)
        ? i.target === t.navigation.nextEl
          ? t.slideTo(g + E)
          : t.slideTo(g)
        : ("next" === t.swipeDirection && t.slideTo(null !== w ? w : g + E),
          "prev" === t.swipeDirection && t.slideTo(null !== b ? b : g));
    }
  }
  function W() {
    const e = this,
      { params: t, el: s } = e;
    if (s && 0 === s.offsetWidth) return;
    t.breakpoints && e.setBreakpoint();
    const { allowSlideNext: a, allowSlidePrev: i, snapGrid: r } = e,
      n = e.virtual && e.params.virtual.enabled;
    ((e.allowSlideNext = !0),
      (e.allowSlidePrev = !0),
      e.updateSize(),
      e.updateSlides(),
      e.updateSlidesClasses());
    const l = n && t.loop;
    (!("auto" === t.slidesPerView || t.slidesPerView > 1) ||
    !e.isEnd ||
    e.isBeginning ||
    e.params.centeredSlides ||
    l
      ? e.params.loop && !n
        ? e.slideToLoop(e.realIndex, 0, !1, !0)
        : e.slideTo(e.activeIndex, 0, !1, !0)
      : e.slideTo(e.slides.length - 1, 0, !1, !0),
      e.autoplay &&
        e.autoplay.running &&
        e.autoplay.paused &&
        (clearTimeout(e.autoplay.resizeTimeout),
        (e.autoplay.resizeTimeout = setTimeout(() => {
          e.autoplay &&
            e.autoplay.running &&
            e.autoplay.paused &&
            e.autoplay.resume();
        }, 500))),
      (e.allowSlidePrev = i),
      (e.allowSlideNext = a),
      e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow());
  }
  function j(e) {
    const t = this;
    t.enabled &&
      (t.allowClick ||
        (t.params.preventClicks && e.preventDefault(),
        t.params.preventClicksPropagation &&
          t.animating &&
          (e.stopPropagation(), e.stopImmediatePropagation())));
  }
  function U() {
    const e = this,
      { wrapperEl: t, rtlTranslate: s, enabled: a } = e;
    if (!a) return;
    let i;
    ((e.previousTranslate = e.translate),
      e.isHorizontal()
        ? (e.translate = -t.scrollLeft)
        : (e.translate = -t.scrollTop),
      0 === e.translate && (e.translate = 0),
      e.updateActiveIndex(),
      e.updateSlidesClasses());
    const r = e.maxTranslate() - e.minTranslate();
    ((i = 0 === r ? 0 : (e.translate - e.minTranslate()) / r),
      i !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
      e.emit("setTranslate", e.translate, !1));
  }
  function K(e) {
    const t = this;
    (D(t, e.target),
      t.params.cssMode ||
        ("auto" !== t.params.slidesPerView && !t.params.autoHeight) ||
        t.update());
  }
  function Z() {
    const e = this;
    e.documentTouchHandlerProceeded ||
      ((e.documentTouchHandlerProceeded = !0),
      e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto"));
  }
  const Q = (e, t) => {
    const s = a(),
      { params: i, el: r, wrapperEl: n, device: l } = e,
      o = !!i.nested,
      d = "on" === t ? "addEventListener" : "removeEventListener",
      c = t;
    r &&
      "string" != typeof r &&
      (s[d]("touchstart", e.onDocumentTouchStart, { passive: !1, capture: o }),
      r[d]("touchstart", e.onTouchStart, { passive: !1 }),
      r[d]("pointerdown", e.onTouchStart, { passive: !1 }),
      s[d]("touchmove", e.onTouchMove, { passive: !1, capture: o }),
      s[d]("pointermove", e.onTouchMove, { passive: !1, capture: o }),
      s[d]("touchend", e.onTouchEnd, { passive: !0 }),
      s[d]("pointerup", e.onTouchEnd, { passive: !0 }),
      s[d]("pointercancel", e.onTouchEnd, { passive: !0 }),
      s[d]("touchcancel", e.onTouchEnd, { passive: !0 }),
      s[d]("pointerout", e.onTouchEnd, { passive: !0 }),
      s[d]("pointerleave", e.onTouchEnd, { passive: !0 }),
      s[d]("contextmenu", e.onTouchEnd, { passive: !0 }),
      (i.preventClicks || i.preventClicksPropagation) &&
        r[d]("click", e.onClick, !0),
      i.cssMode && n[d]("scroll", e.onScroll),
      i.updateOnWindowResize
        ? e[c](
            l.ios || l.android
              ? "resize orientationchange observerUpdate"
              : "resize observerUpdate",
            W,
            !0,
          )
        : e[c]("observerUpdate", W, !0),
      r[d]("load", e.onLoad, { capture: !0 }));
  };
  const J = (e, t) => e.grid && t.grid && t.grid.rows > 1;
  var ee = {
    init: !0,
    direction: "horizontal",
    oneWayMovement: !1,
    swiperElementNodeName: "SWIPER-CONTAINER",
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    eventsPrefix: "swiper",
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 5,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    loop: !1,
    loopAddBlankSlides: !0,
    loopAdditionalSlides: 0,
    loopPreventsSliding: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-blank",
    slideActiveClass: "swiper-slide-active",
    slideVisibleClass: "swiper-slide-visible",
    slideFullyVisibleClass: "swiper-slide-fully-visible",
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-prev",
    wrapperClass: "swiper-wrapper",
    lazyPreloaderClass: "swiper-lazy-preloader",
    lazyPreloadPrevNext: 0,
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  };
  function te(e, t) {
    return function (s) {
      void 0 === s && (s = {});
      const a = Object.keys(s)[0],
        i = s[a];
      "object" == typeof i && null !== i
        ? (!0 === e[a] && (e[a] = { enabled: !0 }),
          "navigation" === a &&
            e[a] &&
            e[a].enabled &&
            !e[a].prevEl &&
            !e[a].nextEl &&
            (e[a].auto = !0),
          ["pagination", "scrollbar"].indexOf(a) >= 0 &&
            e[a] &&
            e[a].enabled &&
            !e[a].el &&
            (e[a].auto = !0),
          a in e && "enabled" in i
            ? ("object" != typeof e[a] ||
                "enabled" in e[a] ||
                (e[a].enabled = !0),
              e[a] || (e[a] = { enabled: !1 }),
              p(t, s))
            : p(t, s))
        : p(t, s);
    };
  }
  const se = {
      eventsEmitter: $,
      update: B,
      translate: N,
      transition: {
        setTransition: function (e, t) {
          const s = this;
          (s.params.cssMode ||
            ((s.wrapperEl.style.transitionDuration = `${e}ms`),
            (s.wrapperEl.style.transitionDelay = 0 === e ? "0ms" : "")),
            s.emit("setTransition", e, t));
        },
        transitionStart: function (e, t) {
          void 0 === e && (e = !0);
          const s = this,
            { params: a } = s;
          a.cssMode ||
            (a.autoHeight && s.updateAutoHeight(),
            X({ swiper: s, runCallbacks: e, direction: t, step: "Start" }));
        },
        transitionEnd: function (e, t) {
          void 0 === e && (e = !0);
          const s = this,
            { params: a } = s;
          ((s.animating = !1),
            a.cssMode ||
              (s.setTransition(0),
              X({ swiper: s, runCallbacks: e, direction: t, step: "End" })));
        },
      },
      slide: Y,
      loop: R,
      grabCursor: {
        setGrabCursor: function (e) {
          const t = this;
          if (
            !t.params.simulateTouch ||
            (t.params.watchOverflow && t.isLocked) ||
            t.params.cssMode
          )
            return;
          const s =
            "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
          (t.isElement && (t.__preventObserver__ = !0),
            (s.style.cursor = "move"),
            (s.style.cursor = e ? "grabbing" : "grab"),
            t.isElement &&
              requestAnimationFrame(() => {
                t.__preventObserver__ = !1;
              }));
        },
        unsetGrabCursor: function () {
          const e = this;
          (e.params.watchOverflow && e.isLocked) ||
            e.params.cssMode ||
            (e.isElement && (e.__preventObserver__ = !0),
            (e[
              "container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
            ].style.cursor = ""),
            e.isElement &&
              requestAnimationFrame(() => {
                e.__preventObserver__ = !1;
              }));
        },
      },
      events: {
        attachEvents: function () {
          const e = this,
            { params: t } = e;
          ((e.onTouchStart = F.bind(e)),
            (e.onTouchMove = V.bind(e)),
            (e.onTouchEnd = _.bind(e)),
            (e.onDocumentTouchStart = Z.bind(e)),
            t.cssMode && (e.onScroll = U.bind(e)),
            (e.onClick = j.bind(e)),
            (e.onLoad = K.bind(e)),
            Q(e, "on"));
        },
        detachEvents: function () {
          Q(this, "off");
        },
      },
      breakpoints: {
        setBreakpoint: function () {
          const e = this,
            { realIndex: t, initialized: s, params: a, el: i } = e,
            r = a.breakpoints;
          if (!r || (r && 0 === Object.keys(r).length)) return;
          const n = e.getBreakpoint(r, e.params.breakpointsBase, e.el);
          if (!n || e.currentBreakpoint === n) return;
          const l = (n in r ? r[n] : void 0) || e.originalParams,
            o = J(e, a),
            d = J(e, l),
            c = e.params.grabCursor,
            u = l.grabCursor,
            m = a.enabled;
          (o && !d
            ? (i.classList.remove(
                `${a.containerModifierClass}grid`,
                `${a.containerModifierClass}grid-column`,
              ),
              e.emitContainerClasses())
            : !o &&
              d &&
              (i.classList.add(`${a.containerModifierClass}grid`),
              ((l.grid.fill && "column" === l.grid.fill) ||
                (!l.grid.fill && "column" === a.grid.fill)) &&
                i.classList.add(`${a.containerModifierClass}grid-column`),
              e.emitContainerClasses()),
            c && !u ? e.unsetGrabCursor() : !c && u && e.setGrabCursor(),
            ["navigation", "pagination", "scrollbar"].forEach((t) => {
              if (void 0 === l[t]) return;
              const s = a[t] && a[t].enabled,
                i = l[t] && l[t].enabled;
              (s && !i && e[t].disable(), !s && i && e[t].enable());
            }));
          const h = l.direction && l.direction !== a.direction,
            f = a.loop && (l.slidesPerView !== a.slidesPerView || h),
            g = a.loop;
          (h && s && e.changeDirection(), p(e.params, l));
          const v = e.params.enabled,
            w = e.params.loop;
          (Object.assign(e, {
            allowTouchMove: e.params.allowTouchMove,
            allowSlideNext: e.params.allowSlideNext,
            allowSlidePrev: e.params.allowSlidePrev,
          }),
            m && !v ? e.disable() : !m && v && e.enable(),
            (e.currentBreakpoint = n),
            e.emit("_beforeBreakpoint", l),
            s &&
              (f
                ? (e.loopDestroy(), e.loopCreate(t), e.updateSlides())
                : !g && w
                  ? (e.loopCreate(t), e.updateSlides())
                  : g && !w && e.loopDestroy()),
            e.emit("breakpoint", l));
        },
        getBreakpoint: function (e, t, s) {
          if ((void 0 === t && (t = "window"), !e || ("container" === t && !s)))
            return;
          let a = !1;
          const i = r(),
            n = "window" === t ? i.innerHeight : s.clientHeight,
            l = Object.keys(e).map((e) => {
              if ("string" == typeof e && 0 === e.indexOf("@")) {
                const t = parseFloat(e.substr(1));
                return { value: n * t, point: e };
              }
              return { value: e, point: e };
            });
          l.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
          for (let e = 0; e < l.length; e += 1) {
            const { point: r, value: n } = l[e];
            "window" === t
              ? i.matchMedia(`(min-width: ${n}px)`).matches && (a = r)
              : n <= s.clientWidth && (a = r);
          }
          return a || "max";
        },
      },
      checkOverflow: {
        checkOverflow: function () {
          const e = this,
            { isLocked: t, params: s } = e,
            { slidesOffsetBefore: a } = s;
          if (a) {
            const t = e.slides.length - 1,
              s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * a;
            e.isLocked = e.size > s;
          } else e.isLocked = 1 === e.snapGrid.length;
          (!0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
            !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
            t && t !== e.isLocked && (e.isEnd = !1),
            t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock"));
        },
      },
      classes: {
        addClasses: function () {
          const e = this,
            { classNames: t, params: s, rtl: a, el: i, device: r } = e,
            n = (function (e, t) {
              const s = [];
              return (
                e.forEach((e) => {
                  "object" == typeof e
                    ? Object.keys(e).forEach((a) => {
                        e[a] && s.push(t + a);
                      })
                    : "string" == typeof e && s.push(t + e);
                }),
                s
              );
            })(
              [
                "initialized",
                s.direction,
                { "free-mode": e.params.freeMode && s.freeMode.enabled },
                { autoheight: s.autoHeight },
                { rtl: a },
                { grid: s.grid && s.grid.rows > 1 },
                {
                  "grid-column":
                    s.grid && s.grid.rows > 1 && "column" === s.grid.fill,
                },
                { android: r.android },
                { ios: r.ios },
                { "css-mode": s.cssMode },
                { centered: s.cssMode && s.centeredSlides },
                { "watch-progress": s.watchSlidesProgress },
              ],
              s.containerModifierClass,
            );
          (t.push(...n), i.classList.add(...t), e.emitContainerClasses());
        },
        removeClasses: function () {
          const { el: e, classNames: t } = this;
          e &&
            "string" != typeof e &&
            (e.classList.remove(...t), this.emitContainerClasses());
        },
      },
    },
    ae = {};
  class ie {
    constructor() {
      let e, t;
      for (var s = arguments.length, i = new Array(s), r = 0; r < s; r++)
        i[r] = arguments[r];
      (1 === i.length &&
      i[0].constructor &&
      "Object" === Object.prototype.toString.call(i[0]).slice(8, -1)
        ? (t = i[0])
        : ([e, t] = i),
        t || (t = {}),
        (t = p({}, t)),
        e && !t.el && (t.el = e));
      const n = a();
      if (
        t.el &&
        "string" == typeof t.el &&
        n.querySelectorAll(t.el).length > 1
      ) {
        const e = [];
        return (
          n.querySelectorAll(t.el).forEach((s) => {
            const a = p({}, t, { el: s });
            e.push(new ie(a));
          }),
          e
        );
      }
      const l = this;
      ((l.__swiper__ = !0),
        (l.support = I()),
        (l.device = z({ userAgent: t.userAgent })),
        (l.browser = A()),
        (l.eventsListeners = {}),
        (l.eventsAnyListeners = []),
        (l.modules = [...l.__modules__]),
        t.modules && Array.isArray(t.modules) && l.modules.push(...t.modules));
      const o = {};
      l.modules.forEach((e) => {
        e({
          params: t,
          swiper: l,
          extendParams: te(t, o),
          on: l.on.bind(l),
          once: l.once.bind(l),
          off: l.off.bind(l),
          emit: l.emit.bind(l),
        });
      });
      const d = p({}, ee, o);
      return (
        (l.params = p({}, d, ae, t)),
        (l.originalParams = p({}, l.params)),
        (l.passedParams = p({}, t)),
        l.params &&
          l.params.on &&
          Object.keys(l.params.on).forEach((e) => {
            l.on(e, l.params.on[e]);
          }),
        l.params && l.params.onAny && l.onAny(l.params.onAny),
        Object.assign(l, {
          enabled: l.params.enabled,
          el: e,
          classNames: [],
          slides: [],
          slidesGrid: [],
          snapGrid: [],
          slidesSizesGrid: [],
          isHorizontal: () => "horizontal" === l.params.direction,
          isVertical: () => "vertical" === l.params.direction,
          activeIndex: 0,
          realIndex: 0,
          isBeginning: !0,
          isEnd: !1,
          translate: 0,
          previousTranslate: 0,
          progress: 0,
          velocity: 0,
          animating: !1,
          cssOverflowAdjustment() {
            return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
          },
          allowSlideNext: l.params.allowSlideNext,
          allowSlidePrev: l.params.allowSlidePrev,
          touchEventsData: {
            isTouched: void 0,
            isMoved: void 0,
            allowTouchCallbacks: void 0,
            touchStartTime: void 0,
            isScrolling: void 0,
            currentTranslate: void 0,
            startTranslate: void 0,
            allowThresholdMove: void 0,
            focusableElements: l.params.focusableElements,
            lastClickTime: 0,
            clickTimeout: void 0,
            velocities: [],
            allowMomentumBounce: void 0,
            startMoving: void 0,
            pointerId: null,
            touchId: null,
          },
          allowClick: !0,
          allowTouchMove: l.params.allowTouchMove,
          touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
          imagesToLoad: [],
          imagesLoaded: 0,
        }),
        l.emit("_swiper"),
        l.params.init && l.init(),
        l
      );
    }
    getDirectionLabel(e) {
      return this.isHorizontal()
        ? e
        : {
            width: "height",
            "margin-top": "margin-left",
            "margin-bottom ": "margin-right",
            "margin-left": "margin-top",
            "margin-right": "margin-bottom",
            "padding-left": "padding-top",
            "padding-right": "padding-bottom",
            marginRight: "marginBottom",
          }[e];
    }
    getSlideIndex(e) {
      const { slidesEl: t, params: s } = this,
        a = y(f(t, `.${s.slideClass}, swiper-slide`)[0]);
      return y(e) - a;
    }
    getSlideIndexByData(e) {
      return this.getSlideIndex(
        this.slides.filter(
          (t) => 1 * t.getAttribute("data-swiper-slide-index") === e,
        )[0],
      );
    }
    recalcSlides() {
      const { slidesEl: e, params: t } = this;
      this.slides = f(e, `.${t.slideClass}, swiper-slide`);
    }
    enable() {
      const e = this;
      e.enabled ||
        ((e.enabled = !0),
        e.params.grabCursor && e.setGrabCursor(),
        e.emit("enable"));
    }
    disable() {
      const e = this;
      e.enabled &&
        ((e.enabled = !1),
        e.params.grabCursor && e.unsetGrabCursor(),
        e.emit("disable"));
    }
    setProgress(e, t) {
      const s = this;
      e = Math.min(Math.max(e, 0), 1);
      const a = s.minTranslate(),
        i = (s.maxTranslate() - a) * e + a;
      (s.translateTo(i, void 0 === t ? 0 : t),
        s.updateActiveIndex(),
        s.updateSlidesClasses());
    }
    emitContainerClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = e.el.className
        .split(" ")
        .filter(
          (t) =>
            0 === t.indexOf("swiper") ||
            0 === t.indexOf(e.params.containerModifierClass),
        );
      e.emit("_containerClasses", t.join(" "));
    }
    getSlideClasses(e) {
      const t = this;
      return t.destroyed
        ? ""
        : e.className
            .split(" ")
            .filter(
              (e) =>
                0 === e.indexOf("swiper-slide") ||
                0 === e.indexOf(t.params.slideClass),
            )
            .join(" ");
    }
    emitSlidesClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = [];
      (e.slides.forEach((s) => {
        const a = e.getSlideClasses(s);
        (t.push({ slideEl: s, classNames: a }), e.emit("_slideClass", s, a));
      }),
        e.emit("_slideClasses", t));
    }
    slidesPerViewDynamic(e, t) {
      (void 0 === e && (e = "current"), void 0 === t && (t = !1));
      const {
        params: s,
        slides: a,
        slidesGrid: i,
        slidesSizesGrid: r,
        size: n,
        activeIndex: l,
      } = this;
      let o = 1;
      if ("number" == typeof s.slidesPerView) return s.slidesPerView;
      if (s.centeredSlides) {
        let e,
          t = a[l] ? Math.ceil(a[l].swiperSlideSize) : 0;
        for (let s = l + 1; s < a.length; s += 1)
          a[s] &&
            !e &&
            ((t += Math.ceil(a[s].swiperSlideSize)),
            (o += 1),
            t > n && (e = !0));
        for (let s = l - 1; s >= 0; s -= 1)
          a[s] &&
            !e &&
            ((t += a[s].swiperSlideSize), (o += 1), t > n && (e = !0));
      } else if ("current" === e)
        for (let e = l + 1; e < a.length; e += 1) {
          (t ? i[e] + r[e] - i[l] < n : i[e] - i[l] < n) && (o += 1);
        }
      else
        for (let e = l - 1; e >= 0; e -= 1) {
          i[l] - i[e] < n && (o += 1);
        }
      return o;
    }
    update() {
      const e = this;
      if (!e || e.destroyed) return;
      const { snapGrid: t, params: s } = e;
      function a() {
        const t = e.rtlTranslate ? -1 * e.translate : e.translate,
          s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
        (e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses());
      }
      let i;
      if (
        (s.breakpoints && e.setBreakpoint(),
        [...e.el.querySelectorAll('[loading="lazy"]')].forEach((t) => {
          t.complete && D(e, t);
        }),
        e.updateSize(),
        e.updateSlides(),
        e.updateProgress(),
        e.updateSlidesClasses(),
        s.freeMode && s.freeMode.enabled && !s.cssMode)
      )
        (a(), s.autoHeight && e.updateAutoHeight());
      else {
        if (
          ("auto" === s.slidesPerView || s.slidesPerView > 1) &&
          e.isEnd &&
          !s.centeredSlides
        ) {
          const t =
            e.virtual && s.virtual.enabled ? e.virtual.slides : e.slides;
          i = e.slideTo(t.length - 1, 0, !1, !0);
        } else i = e.slideTo(e.activeIndex, 0, !1, !0);
        i || a();
      }
      (s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
        e.emit("update"));
    }
    changeDirection(e, t) {
      void 0 === t && (t = !0);
      const s = this,
        a = s.params.direction;
      return (
        e || (e = "horizontal" === a ? "vertical" : "horizontal"),
        e === a ||
          ("horizontal" !== e && "vertical" !== e) ||
          (s.el.classList.remove(`${s.params.containerModifierClass}${a}`),
          s.el.classList.add(`${s.params.containerModifierClass}${e}`),
          s.emitContainerClasses(),
          (s.params.direction = e),
          s.slides.forEach((t) => {
            "vertical" === e ? (t.style.width = "") : (t.style.height = "");
          }),
          s.emit("changeDirection"),
          t && s.update()),
        s
      );
    }
    changeLanguageDirection(e) {
      const t = this;
      (t.rtl && "rtl" === e) ||
        (!t.rtl && "ltr" === e) ||
        ((t.rtl = "rtl" === e),
        (t.rtlTranslate = "horizontal" === t.params.direction && t.rtl),
        t.rtl
          ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`),
            (t.el.dir = "rtl"))
          : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`),
            (t.el.dir = "ltr")),
        t.update());
    }
    mount(e) {
      const t = this;
      if (t.mounted) return !0;
      let s = e || t.params.el;
      if (("string" == typeof s && (s = document.querySelector(s)), !s))
        return !1;
      ((s.swiper = t),
        s.parentNode &&
          s.parentNode.host &&
          s.parentNode.host.nodeName ===
            t.params.swiperElementNodeName.toUpperCase() &&
          (t.isElement = !0));
      const a = () =>
        `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
      let i = (() => {
        if (s && s.shadowRoot && s.shadowRoot.querySelector) {
          return s.shadowRoot.querySelector(a());
        }
        return f(s, a())[0];
      })();
      return (
        !i &&
          t.params.createElements &&
          ((i = v("div", t.params.wrapperClass)),
          s.append(i),
          f(s, `.${t.params.slideClass}`).forEach((e) => {
            i.append(e);
          })),
        Object.assign(t, {
          el: s,
          wrapperEl: i,
          slidesEl:
            t.isElement && !s.parentNode.host.slideSlots
              ? s.parentNode.host
              : i,
          hostEl: t.isElement ? s.parentNode.host : s,
          mounted: !0,
          rtl: "rtl" === s.dir.toLowerCase() || "rtl" === b(s, "direction"),
          rtlTranslate:
            "horizontal" === t.params.direction &&
            ("rtl" === s.dir.toLowerCase() || "rtl" === b(s, "direction")),
          wrongRTL: "-webkit-box" === b(i, "display"),
        }),
        !0
      );
    }
    init(e) {
      const t = this;
      if (t.initialized) return t;
      if (!1 === t.mount(e)) return t;
      (t.emit("beforeInit"),
        t.params.breakpoints && t.setBreakpoint(),
        t.addClasses(),
        t.updateSize(),
        t.updateSlides(),
        t.params.watchOverflow && t.checkOverflow(),
        t.params.grabCursor && t.enabled && t.setGrabCursor(),
        t.params.loop && t.virtual && t.params.virtual.enabled
          ? t.slideTo(
              t.params.initialSlide + t.virtual.slidesBefore,
              0,
              t.params.runCallbacksOnInit,
              !1,
              !0,
            )
          : t.slideTo(
              t.params.initialSlide,
              0,
              t.params.runCallbacksOnInit,
              !1,
              !0,
            ),
        t.params.loop && t.loopCreate(),
        t.attachEvents());
      const s = [...t.el.querySelectorAll('[loading="lazy"]')];
      return (
        t.isElement && s.push(...t.hostEl.querySelectorAll('[loading="lazy"]')),
        s.forEach((e) => {
          e.complete
            ? D(t, e)
            : e.addEventListener("load", (e) => {
                D(t, e.target);
              });
        }),
        H(t),
        (t.initialized = !0),
        H(t),
        t.emit("init"),
        t.emit("afterInit"),
        t
      );
    }
    destroy(e, t) {
      (void 0 === e && (e = !0), void 0 === t && (t = !0));
      const s = this,
        { params: a, el: i, wrapperEl: r, slides: n } = s;
      return (
        void 0 === s.params ||
          s.destroyed ||
          (s.emit("beforeDestroy"),
          (s.initialized = !1),
          s.detachEvents(),
          a.loop && s.loopDestroy(),
          t &&
            (s.removeClasses(),
            i && "string" != typeof i && i.removeAttribute("style"),
            r && r.removeAttribute("style"),
            n &&
              n.length &&
              n.forEach((e) => {
                (e.classList.remove(
                  a.slideVisibleClass,
                  a.slideFullyVisibleClass,
                  a.slideActiveClass,
                  a.slideNextClass,
                  a.slidePrevClass,
                ),
                  e.removeAttribute("style"),
                  e.removeAttribute("data-swiper-slide-index"));
              })),
          s.emit("destroy"),
          Object.keys(s.eventsListeners).forEach((e) => {
            s.off(e);
          }),
          !1 !== e &&
            (s.el && "string" != typeof s.el && (s.el.swiper = null),
            (function (e) {
              const t = e;
              Object.keys(t).forEach((e) => {
                try {
                  t[e] = null;
                } catch (e) {}
                try {
                  delete t[e];
                } catch (e) {}
              });
            })(s)),
          (s.destroyed = !0)),
        null
      );
    }
    static extendDefaults(e) {
      p(ae, e);
    }
    static get extendedDefaults() {
      return ae;
    }
    static get defaults() {
      return ee;
    }
    static installModule(e) {
      ie.prototype.__modules__ || (ie.prototype.__modules__ = []);
      const t = ie.prototype.__modules__;
      "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
    }
    static use(e) {
      return Array.isArray(e)
        ? (e.forEach((e) => ie.installModule(e)), ie)
        : (ie.installModule(e), ie);
    }
  }
  function re(e, t, s, a) {
    return (
      e.params.createElements &&
        Object.keys(a).forEach((i) => {
          if (!s[i] && !0 === s.auto) {
            let r = f(e.el, `.${a[i]}`)[0];
            (r || ((r = v("div", a[i])), (r.className = a[i]), e.el.append(r)),
              (s[i] = r),
              (t[i] = r));
          }
        }),
      s
    );
  }
  function ne(e) {
    return (
      void 0 === e && (e = ""),
      `.${e
        .trim()
        .replace(/([\.:!+\/])/g, "\\$1")
        .replace(/ /g, ".")}`
    );
  }
  function le(e) {
    const t = this,
      { params: s, slidesEl: a } = t;
    s.loop && t.loopDestroy();
    const i = (e) => {
      if ("string" == typeof e) {
        const t = document.createElement("div");
        ((t.innerHTML = e), a.append(t.children[0]), (t.innerHTML = ""));
      } else a.append(e);
    };
    if ("object" == typeof e && "length" in e)
      for (let t = 0; t < e.length; t += 1) e[t] && i(e[t]);
    else i(e);
    (t.recalcSlides(),
      s.loop && t.loopCreate(),
      (s.observer && !t.isElement) || t.update());
  }
  function oe(e) {
    const t = this,
      { params: s, activeIndex: a, slidesEl: i } = t;
    s.loop && t.loopDestroy();
    let r = a + 1;
    const n = (e) => {
      if ("string" == typeof e) {
        const t = document.createElement("div");
        ((t.innerHTML = e), i.prepend(t.children[0]), (t.innerHTML = ""));
      } else i.prepend(e);
    };
    if ("object" == typeof e && "length" in e) {
      for (let t = 0; t < e.length; t += 1) e[t] && n(e[t]);
      r = a + e.length;
    } else n(e);
    (t.recalcSlides(),
      s.loop && t.loopCreate(),
      (s.observer && !t.isElement) || t.update(),
      t.slideTo(r, 0, !1));
  }
  function de(e, t) {
    const s = this,
      { params: a, activeIndex: i, slidesEl: r } = s;
    let n = i;
    a.loop && ((n -= s.loopedSlides), s.loopDestroy(), s.recalcSlides());
    const l = s.slides.length;
    if (e <= 0) return void s.prependSlide(t);
    if (e >= l) return void s.appendSlide(t);
    let o = n > e ? n + 1 : n;
    const d = [];
    for (let t = l - 1; t >= e; t -= 1) {
      const e = s.slides[t];
      (e.remove(), d.unshift(e));
    }
    if ("object" == typeof t && "length" in t) {
      for (let e = 0; e < t.length; e += 1) t[e] && r.append(t[e]);
      o = n > e ? n + t.length : n;
    } else r.append(t);
    for (let e = 0; e < d.length; e += 1) r.append(d[e]);
    (s.recalcSlides(),
      a.loop && s.loopCreate(),
      (a.observer && !s.isElement) || s.update(),
      a.loop ? s.slideTo(o + s.loopedSlides, 0, !1) : s.slideTo(o, 0, !1));
  }
  function ce(e) {
    const t = this,
      { params: s, activeIndex: a } = t;
    let i = a;
    s.loop && ((i -= t.loopedSlides), t.loopDestroy());
    let r,
      n = i;
    if ("object" == typeof e && "length" in e) {
      for (let s = 0; s < e.length; s += 1)
        ((r = e[s]), t.slides[r] && t.slides[r].remove(), r < n && (n -= 1));
      n = Math.max(n, 0);
    } else
      ((r = e),
        t.slides[r] && t.slides[r].remove(),
        r < n && (n -= 1),
        (n = Math.max(n, 0)));
    (t.recalcSlides(),
      s.loop && t.loopCreate(),
      (s.observer && !t.isElement) || t.update(),
      s.loop ? t.slideTo(n + t.loopedSlides, 0, !1) : t.slideTo(n, 0, !1));
  }
  function pe() {
    const e = this,
      t = [];
    for (let s = 0; s < e.slides.length; s += 1) t.push(s);
    e.removeSlide(t);
  }
  function ue(e) {
    const {
      effect: t,
      swiper: s,
      on: a,
      setTranslate: i,
      setTransition: r,
      overwriteParams: n,
      perspective: l,
      recreateShadows: o,
      getEffectParams: d,
    } = e;
    let c;
    (a("beforeInit", () => {
      if (s.params.effect !== t) return;
      (s.classNames.push(`${s.params.containerModifierClass}${t}`),
        l && l() && s.classNames.push(`${s.params.containerModifierClass}3d`));
      const e = n ? n() : {};
      (Object.assign(s.params, e), Object.assign(s.originalParams, e));
    }),
      a("setTranslate", () => {
        s.params.effect === t && i();
      }),
      a("setTransition", (e, a) => {
        s.params.effect === t && r(a);
      }),
      a("transitionEnd", () => {
        if (s.params.effect === t && o) {
          if (!d || !d().slideShadows) return;
          (s.slides.forEach((e) => {
            e.querySelectorAll(
              ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left",
            ).forEach((e) => e.remove());
          }),
            o());
        }
      }),
      a("virtualUpdate", () => {
        s.params.effect === t &&
          (s.slides.length || (c = !0),
          requestAnimationFrame(() => {
            c && s.slides && s.slides.length && (i(), (c = !1));
          }));
      }));
  }
  function me(e, t) {
    const s = h(t);
    return (
      s !== t &&
        ((s.style.backfaceVisibility = "hidden"),
        (s.style["-webkit-backface-visibility"] = "hidden")),
      s
    );
  }
  function he(e) {
    let { swiper: t, duration: s, transformElements: a, allSlides: i } = e;
    const { activeIndex: r } = t;
    if (t.params.virtualTranslate && 0 !== s) {
      let e,
        s = !1;
      ((e = i
        ? a
        : a.filter((e) => {
            const s = e.classList.contains("swiper-slide-transform")
              ? ((e) => {
                  if (!e.parentElement)
                    return t.slides.filter(
                      (t) => t.shadowRoot && t.shadowRoot === e.parentNode,
                    )[0];
                  return e.parentElement;
                })(e)
              : e;
            return t.getSlideIndex(s) === r;
          })),
        e.forEach((e) => {
          x(e, () => {
            if (s) return;
            if (!t || t.destroyed) return;
            ((s = !0), (t.animating = !1));
            const e = new window.CustomEvent("transitionend", {
              bubbles: !0,
              cancelable: !0,
            });
            t.wrapperEl.dispatchEvent(e);
          });
        }));
    }
  }
  function fe(e, t, s) {
    const a = `swiper-slide-shadow${s ? `-${s}` : ""}${e ? ` swiper-slide-shadow-${e}` : ""}`,
      i = h(t);
    let r = i.querySelector(`.${a.split(" ").join(".")}`);
    return (r || ((r = v("div", a.split(" "))), i.append(r)), r);
  }
  (Object.keys(se).forEach((e) => {
    Object.keys(se[e]).forEach((t) => {
      ie.prototype[t] = se[e][t];
    });
  }),
    ie.use([
      function (e) {
        let { swiper: t, on: s, emit: a } = e;
        const i = r();
        let n = null,
          l = null;
        const o = () => {
            t &&
              !t.destroyed &&
              t.initialized &&
              (a("beforeResize"), a("resize"));
          },
          d = () => {
            t && !t.destroyed && t.initialized && a("orientationchange");
          };
        (s("init", () => {
          t.params.resizeObserver && void 0 !== i.ResizeObserver
            ? t &&
              !t.destroyed &&
              t.initialized &&
              ((n = new ResizeObserver((e) => {
                l = i.requestAnimationFrame(() => {
                  const { width: s, height: a } = t;
                  let i = s,
                    r = a;
                  (e.forEach((e) => {
                    let { contentBoxSize: s, contentRect: a, target: n } = e;
                    (n && n !== t.el) ||
                      ((i = a ? a.width : (s[0] || s).inlineSize),
                      (r = a ? a.height : (s[0] || s).blockSize));
                  }),
                    (i === s && r === a) || o());
                });
              })),
              n.observe(t.el))
            : (i.addEventListener("resize", o),
              i.addEventListener("orientationchange", d));
        }),
          s("destroy", () => {
            (l && i.cancelAnimationFrame(l),
              n && n.unobserve && t.el && (n.unobserve(t.el), (n = null)),
              i.removeEventListener("resize", o),
              i.removeEventListener("orientationchange", d));
          }));
      },
      function (e) {
        let { swiper: t, extendParams: s, on: a, emit: i } = e;
        const n = [],
          l = r(),
          o = function (e, s) {
            void 0 === s && (s = {});
            const a = new (l.MutationObserver || l.WebkitMutationObserver)(
              (e) => {
                if (t.__preventObserver__) return;
                if (1 === e.length) return void i("observerUpdate", e[0]);
                const s = function () {
                  i("observerUpdate", e[0]);
                };
                l.requestAnimationFrame
                  ? l.requestAnimationFrame(s)
                  : l.setTimeout(s, 0);
              },
            );
            (a.observe(e, {
              attributes: void 0 === s.attributes || s.attributes,
              childList: t.isElement || (void 0 === s.childList || s).childList,
              characterData: void 0 === s.characterData || s.characterData,
            }),
              n.push(a));
          };
        (s({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
          a("init", () => {
            if (t.params.observer) {
              if (t.params.observeParents) {
                const e = E(t.hostEl);
                for (let t = 0; t < e.length; t += 1) o(e[t]);
              }
              (o(t.hostEl, { childList: t.params.observeSlideChildren }),
                o(t.wrapperEl, { attributes: !1 }));
            }
          }),
          a("destroy", () => {
            (n.forEach((e) => {
              e.disconnect();
            }),
              n.splice(0, n.length));
          }));
      },
    ]));
  const ge = [
    function (e) {
      let t,
        { swiper: s, extendParams: i, on: r, emit: n } = e;
      i({
        virtual: {
          enabled: !1,
          slides: [],
          cache: !0,
          renderSlide: null,
          renderExternal: null,
          renderExternalUpdate: !0,
          addSlidesBefore: 0,
          addSlidesAfter: 0,
        },
      });
      const l = a();
      s.virtual = {
        cache: {},
        from: void 0,
        to: void 0,
        slides: [],
        offset: 0,
        slidesGrid: [],
      };
      const o = l.createElement("div");
      function d(e, t) {
        const a = s.params.virtual;
        if (a.cache && s.virtual.cache[t]) return s.virtual.cache[t];
        let i;
        return (
          a.renderSlide
            ? ((i = a.renderSlide.call(s, e, t)),
              "string" == typeof i && ((o.innerHTML = i), (i = o.children[0])))
            : (i = s.isElement
                ? v("swiper-slide")
                : v("div", s.params.slideClass)),
          i.setAttribute("data-swiper-slide-index", t),
          a.renderSlide || (i.innerHTML = e),
          a.cache && (s.virtual.cache[t] = i),
          i
        );
      }
      function c(e, t) {
        const {
          slidesPerView: a,
          slidesPerGroup: i,
          centeredSlides: r,
          loop: l,
          initialSlide: o,
        } = s.params;
        if (t && !l && o > 0) return;
        const { addSlidesBefore: c, addSlidesAfter: p } = s.params.virtual,
          { from: u, to: m, slides: h, slidesGrid: g, offset: v } = s.virtual;
        s.params.cssMode || s.updateActiveIndex();
        const w = s.activeIndex || 0;
        let b, y, E;
        ((b = s.rtlTranslate ? "right" : s.isHorizontal() ? "left" : "top"),
          r
            ? ((y = Math.floor(a / 2) + i + p), (E = Math.floor(a / 2) + i + c))
            : ((y = a + (i - 1) + p), (E = (l ? a : i) + c)));
        let x = w - E,
          S = w + y;
        l || ((x = Math.max(x, 0)), (S = Math.min(S, h.length - 1)));
        let T = (s.slidesGrid[x] || 0) - (s.slidesGrid[0] || 0);
        function M() {
          (s.updateSlides(),
            s.updateProgress(),
            s.updateSlidesClasses(),
            n("virtualUpdate"));
        }
        if (
          (l && w >= E
            ? ((x -= E), r || (T += s.slidesGrid[0]))
            : l && w < E && ((x = -E), r && (T += s.slidesGrid[0])),
          Object.assign(s.virtual, {
            from: x,
            to: S,
            offset: T,
            slidesGrid: s.slidesGrid,
            slidesBefore: E,
            slidesAfter: y,
          }),
          u === x && m === S && !e)
        )
          return (
            s.slidesGrid !== g &&
              T !== v &&
              s.slides.forEach((e) => {
                e.style[b] = T - Math.abs(s.cssOverflowAdjustment()) + "px";
              }),
            s.updateProgress(),
            void n("virtualUpdate")
          );
        if (s.params.virtual.renderExternal)
          return (
            s.params.virtual.renderExternal.call(s, {
              offset: T,
              from: x,
              to: S,
              slides: (function () {
                const e = [];
                for (let t = x; t <= S; t += 1) e.push(h[t]);
                return e;
              })(),
            }),
            void (s.params.virtual.renderExternalUpdate
              ? M()
              : n("virtualUpdate"))
          );
        const C = [],
          P = [],
          L = (e) => {
            let t = e;
            return (
              e < 0 ? (t = h.length + e) : t >= h.length && (t -= h.length),
              t
            );
          };
        if (e)
          s.slides
            .filter((e) => e.matches(`.${s.params.slideClass}, swiper-slide`))
            .forEach((e) => {
              e.remove();
            });
        else
          for (let e = u; e <= m; e += 1)
            if (e < x || e > S) {
              const t = L(e);
              s.slides
                .filter((e) =>
                  e.matches(
                    `.${s.params.slideClass}[data-swiper-slide-index="${t}"], swiper-slide[data-swiper-slide-index="${t}"]`,
                  ),
                )
                .forEach((e) => {
                  e.remove();
                });
            }
        const I = l ? -h.length : 0,
          z = l ? 2 * h.length : h.length;
        for (let t = I; t < z; t += 1)
          if (t >= x && t <= S) {
            const s = L(t);
            void 0 === m || e
              ? P.push(s)
              : (t > m && P.push(s), t < u && C.push(s));
          }
        if (
          (P.forEach((e) => {
            s.slidesEl.append(d(h[e], e));
          }),
          l)
        )
          for (let e = C.length - 1; e >= 0; e -= 1) {
            const t = C[e];
            s.slidesEl.prepend(d(h[t], t));
          }
        else
          (C.sort((e, t) => t - e),
            C.forEach((e) => {
              s.slidesEl.prepend(d(h[e], e));
            }));
        (f(s.slidesEl, ".swiper-slide, swiper-slide").forEach((e) => {
          e.style[b] = T - Math.abs(s.cssOverflowAdjustment()) + "px";
        }),
          M());
      }
      (r("beforeInit", () => {
        if (!s.params.virtual.enabled) return;
        let e;
        if (void 0 === s.passedParams.virtual.slides) {
          const t = [...s.slidesEl.children].filter((e) =>
            e.matches(`.${s.params.slideClass}, swiper-slide`),
          );
          t &&
            t.length &&
            ((s.virtual.slides = [...t]),
            (e = !0),
            t.forEach((e, t) => {
              (e.setAttribute("data-swiper-slide-index", t),
                (s.virtual.cache[t] = e),
                e.remove());
            }));
        }
        (e || (s.virtual.slides = s.params.virtual.slides),
          s.classNames.push(`${s.params.containerModifierClass}virtual`),
          (s.params.watchSlidesProgress = !0),
          (s.originalParams.watchSlidesProgress = !0),
          c(!1, !0));
      }),
        r("setTranslate", () => {
          s.params.virtual.enabled &&
            (s.params.cssMode && !s._immediateVirtual
              ? (clearTimeout(t),
                (t = setTimeout(() => {
                  c();
                }, 100)))
              : c());
        }),
        r("init update resize", () => {
          s.params.virtual.enabled &&
            s.params.cssMode &&
            u(s.wrapperEl, "--swiper-virtual-size", `${s.virtualSize}px`);
        }),
        Object.assign(s.virtual, {
          appendSlide: function (e) {
            if ("object" == typeof e && "length" in e)
              for (let t = 0; t < e.length; t += 1)
                e[t] && s.virtual.slides.push(e[t]);
            else s.virtual.slides.push(e);
            c(!0);
          },
          prependSlide: function (e) {
            const t = s.activeIndex;
            let a = t + 1,
              i = 1;
            if (Array.isArray(e)) {
              for (let t = 0; t < e.length; t += 1)
                e[t] && s.virtual.slides.unshift(e[t]);
              ((a = t + e.length), (i = e.length));
            } else s.virtual.slides.unshift(e);
            if (s.params.virtual.cache) {
              const e = s.virtual.cache,
                t = {};
              (Object.keys(e).forEach((s) => {
                const a = e[s],
                  r = a.getAttribute("data-swiper-slide-index");
                (r &&
                  a.setAttribute(
                    "data-swiper-slide-index",
                    parseInt(r, 10) + i,
                  ),
                  (t[parseInt(s, 10) + i] = a));
              }),
                (s.virtual.cache = t));
            }
            (c(!0), s.slideTo(a, 0));
          },
          removeSlide: function (e) {
            if (null == e) return;
            let t = s.activeIndex;
            if (Array.isArray(e))
              for (let a = e.length - 1; a >= 0; a -= 1)
                (s.params.virtual.cache &&
                  (delete s.virtual.cache[e[a]],
                  Object.keys(s.virtual.cache).forEach((t) => {
                    t > e &&
                      ((s.virtual.cache[t - 1] = s.virtual.cache[t]),
                      s.virtual.cache[t - 1].setAttribute(
                        "data-swiper-slide-index",
                        t - 1,
                      ),
                      delete s.virtual.cache[t]);
                  })),
                  s.virtual.slides.splice(e[a], 1),
                  e[a] < t && (t -= 1),
                  (t = Math.max(t, 0)));
            else
              (s.params.virtual.cache &&
                (delete s.virtual.cache[e],
                Object.keys(s.virtual.cache).forEach((t) => {
                  t > e &&
                    ((s.virtual.cache[t - 1] = s.virtual.cache[t]),
                    s.virtual.cache[t - 1].setAttribute(
                      "data-swiper-slide-index",
                      t - 1,
                    ),
                    delete s.virtual.cache[t]);
                })),
                s.virtual.slides.splice(e, 1),
                e < t && (t -= 1),
                (t = Math.max(t, 0)));
            (c(!0), s.slideTo(t, 0));
          },
          removeAllSlides: function () {
            ((s.virtual.slides = []),
              s.params.virtual.cache && (s.virtual.cache = {}),
              c(!0),
              s.slideTo(0, 0));
          },
          update: c,
        }));
    },
    function (e) {
      let { swiper: t, extendParams: s, on: i, emit: n } = e;
      const l = a(),
        o = r();
      function d(e) {
        if (!t.enabled) return;
        const { rtlTranslate: s } = t;
        let a = e;
        a.originalEvent && (a = a.originalEvent);
        const i = a.keyCode || a.charCode,
          r = t.params.keyboard.pageUpDown,
          d = r && 33 === i,
          c = r && 34 === i,
          p = 37 === i,
          u = 39 === i,
          m = 38 === i,
          h = 40 === i;
        if (
          !t.allowSlideNext &&
          ((t.isHorizontal() && u) || (t.isVertical() && h) || c)
        )
          return !1;
        if (
          !t.allowSlidePrev &&
          ((t.isHorizontal() && p) || (t.isVertical() && m) || d)
        )
          return !1;
        if (
          !(
            a.shiftKey ||
            a.altKey ||
            a.ctrlKey ||
            a.metaKey ||
            (l.activeElement &&
              l.activeElement.nodeName &&
              ("input" === l.activeElement.nodeName.toLowerCase() ||
                "textarea" === l.activeElement.nodeName.toLowerCase()))
          )
        ) {
          if (
            t.params.keyboard.onlyInViewport &&
            (d || c || p || u || m || h)
          ) {
            let e = !1;
            if (
              E(t.el, `.${t.params.slideClass}, swiper-slide`).length > 0 &&
              0 === E(t.el, `.${t.params.slideActiveClass}`).length
            )
              return;
            const a = t.el,
              i = a.clientWidth,
              r = a.clientHeight,
              n = o.innerWidth,
              l = o.innerHeight,
              d = w(a);
            s && (d.left -= a.scrollLeft);
            const c = [
              [d.left, d.top],
              [d.left + i, d.top],
              [d.left, d.top + r],
              [d.left + i, d.top + r],
            ];
            for (let t = 0; t < c.length; t += 1) {
              const s = c[t];
              if (s[0] >= 0 && s[0] <= n && s[1] >= 0 && s[1] <= l) {
                if (0 === s[0] && 0 === s[1]) continue;
                e = !0;
              }
            }
            if (!e) return;
          }
          (t.isHorizontal()
            ? ((d || c || p || u) &&
                (a.preventDefault ? a.preventDefault() : (a.returnValue = !1)),
              (((c || u) && !s) || ((d || p) && s)) && t.slideNext(),
              (((d || p) && !s) || ((c || u) && s)) && t.slidePrev())
            : ((d || c || m || h) &&
                (a.preventDefault ? a.preventDefault() : (a.returnValue = !1)),
              (c || h) && t.slideNext(),
              (d || m) && t.slidePrev()),
            n("keyPress", i));
        }
      }
      function c() {
        t.keyboard.enabled ||
          (l.addEventListener("keydown", d), (t.keyboard.enabled = !0));
      }
      function p() {
        t.keyboard.enabled &&
          (l.removeEventListener("keydown", d), (t.keyboard.enabled = !1));
      }
      ((t.keyboard = { enabled: !1 }),
        s({ keyboard: { enabled: !1, onlyInViewport: !0, pageUpDown: !0 } }),
        i("init", () => {
          t.params.keyboard.enabled && c();
        }),
        i("destroy", () => {
          t.keyboard.enabled && p();
        }),
        Object.assign(t.keyboard, { enable: c, disable: p }));
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a, emit: i } = e;
      const n = r();
      let d;
      (s({
        mousewheel: {
          enabled: !1,
          releaseOnEdges: !1,
          invert: !1,
          forceToAxis: !1,
          sensitivity: 1,
          eventsTarget: "container",
          thresholdDelta: null,
          thresholdTime: null,
          noMousewheelClass: "swiper-no-mousewheel",
        },
      }),
        (t.mousewheel = { enabled: !1 }));
      let c,
        p = o();
      const u = [];
      function m() {
        t.enabled && (t.mouseEntered = !0);
      }
      function h() {
        t.enabled && (t.mouseEntered = !1);
      }
      function f(e) {
        return (
          !(
            t.params.mousewheel.thresholdDelta &&
            e.delta < t.params.mousewheel.thresholdDelta
          ) &&
          !(
            t.params.mousewheel.thresholdTime &&
            o() - p < t.params.mousewheel.thresholdTime
          ) &&
          ((e.delta >= 6 && o() - p < 60) ||
            (e.direction < 0
              ? (t.isEnd && !t.params.loop) ||
                t.animating ||
                (t.slideNext(), i("scroll", e.raw))
              : (t.isBeginning && !t.params.loop) ||
                t.animating ||
                (t.slidePrev(), i("scroll", e.raw)),
            (p = new n.Date().getTime()),
            !1))
        );
      }
      function g(e) {
        let s = e,
          a = !0;
        if (!t.enabled) return;
        if (e.target.closest(`.${t.params.mousewheel.noMousewheelClass}`))
          return;
        const r = t.params.mousewheel;
        t.params.cssMode && s.preventDefault();
        let n = t.el;
        "container" !== t.params.mousewheel.eventsTarget &&
          (n = document.querySelector(t.params.mousewheel.eventsTarget));
        const p = n && n.contains(s.target);
        if (!t.mouseEntered && !p && !r.releaseOnEdges) return !0;
        s.originalEvent && (s = s.originalEvent);
        let m = 0;
        const h = t.rtlTranslate ? -1 : 1,
          g = (function (e) {
            let t = 0,
              s = 0,
              a = 0,
              i = 0;
            return (
              "detail" in e && (s = e.detail),
              "wheelDelta" in e && (s = -e.wheelDelta / 120),
              "wheelDeltaY" in e && (s = -e.wheelDeltaY / 120),
              "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120),
              "axis" in e && e.axis === e.HORIZONTAL_AXIS && ((t = s), (s = 0)),
              (a = 10 * t),
              (i = 10 * s),
              "deltaY" in e && (i = e.deltaY),
              "deltaX" in e && (a = e.deltaX),
              e.shiftKey && !a && ((a = i), (i = 0)),
              (a || i) &&
                e.deltaMode &&
                (1 === e.deltaMode
                  ? ((a *= 40), (i *= 40))
                  : ((a *= 800), (i *= 800))),
              a && !t && (t = a < 1 ? -1 : 1),
              i && !s && (s = i < 1 ? -1 : 1),
              { spinX: t, spinY: s, pixelX: a, pixelY: i }
            );
          })(s);
        if (r.forceToAxis)
          if (t.isHorizontal()) {
            if (!(Math.abs(g.pixelX) > Math.abs(g.pixelY))) return !0;
            m = -g.pixelX * h;
          } else {
            if (!(Math.abs(g.pixelY) > Math.abs(g.pixelX))) return !0;
            m = -g.pixelY;
          }
        else
          m =
            Math.abs(g.pixelX) > Math.abs(g.pixelY) ? -g.pixelX * h : -g.pixelY;
        if (0 === m) return !0;
        r.invert && (m = -m);
        let v = t.getTranslate() + m * r.sensitivity;
        if (
          (v >= t.minTranslate() && (v = t.minTranslate()),
          v <= t.maxTranslate() && (v = t.maxTranslate()),
          (a =
            !!t.params.loop ||
            !(v === t.minTranslate() || v === t.maxTranslate())),
          a && t.params.nested && s.stopPropagation(),
          t.params.freeMode && t.params.freeMode.enabled)
        ) {
          const e = { time: o(), delta: Math.abs(m), direction: Math.sign(m) },
            a =
              c &&
              e.time < c.time + 500 &&
              e.delta <= c.delta &&
              e.direction === c.direction;
          if (!a) {
            c = void 0;
            let n = t.getTranslate() + m * r.sensitivity;
            const o = t.isBeginning,
              p = t.isEnd;
            if (
              (n >= t.minTranslate() && (n = t.minTranslate()),
              n <= t.maxTranslate() && (n = t.maxTranslate()),
              t.setTransition(0),
              t.setTranslate(n),
              t.updateProgress(),
              t.updateActiveIndex(),
              t.updateSlidesClasses(),
              ((!o && t.isBeginning) || (!p && t.isEnd)) &&
                t.updateSlidesClasses(),
              t.params.loop &&
                t.loopFix({
                  direction: e.direction < 0 ? "next" : "prev",
                  byMousewheel: !0,
                }),
              t.params.freeMode.sticky)
            ) {
              (clearTimeout(d), (d = void 0), u.length >= 15 && u.shift());
              const s = u.length ? u[u.length - 1] : void 0,
                a = u[0];
              if (
                (u.push(e),
                s && (e.delta > s.delta || e.direction !== s.direction))
              )
                u.splice(0);
              else if (
                u.length >= 15 &&
                e.time - a.time < 500 &&
                a.delta - e.delta >= 1 &&
                e.delta <= 6
              ) {
                const s = m > 0 ? 0.8 : 0.2;
                ((c = e),
                  u.splice(0),
                  (d = l(() => {
                    !t.destroyed &&
                      t.params &&
                      t.slideToClosest(t.params.speed, !0, void 0, s);
                  }, 0)));
              }
              d ||
                (d = l(() => {
                  if (t.destroyed || !t.params) return;
                  ((c = e),
                    u.splice(0),
                    t.slideToClosest(t.params.speed, !0, void 0, 0.5));
                }, 500));
            }
            if (
              (a || i("scroll", s),
              t.params.autoplay &&
                t.params.autoplayDisableOnInteraction &&
                t.autoplay.stop(),
              r.releaseOnEdges &&
                (n === t.minTranslate() || n === t.maxTranslate()))
            )
              return !0;
          }
        } else {
          const s = {
            time: o(),
            delta: Math.abs(m),
            direction: Math.sign(m),
            raw: e,
          };
          u.length >= 2 && u.shift();
          const a = u.length ? u[u.length - 1] : void 0;
          if (
            (u.push(s),
            a
              ? (s.direction !== a.direction ||
                  s.delta > a.delta ||
                  s.time > a.time + 150) &&
                f(s)
              : f(s),
            (function (e) {
              const s = t.params.mousewheel;
              if (e.direction < 0) {
                if (t.isEnd && !t.params.loop && s.releaseOnEdges) return !0;
              } else if (t.isBeginning && !t.params.loop && s.releaseOnEdges)
                return !0;
              return !1;
            })(s))
          )
            return !0;
        }
        return (
          s.preventDefault ? s.preventDefault() : (s.returnValue = !1),
          !1
        );
      }
      function v(e) {
        let s = t.el;
        ("container" !== t.params.mousewheel.eventsTarget &&
          (s = document.querySelector(t.params.mousewheel.eventsTarget)),
          s[e]("mouseenter", m),
          s[e]("mouseleave", h),
          s[e]("wheel", g));
      }
      function w() {
        return t.params.cssMode
          ? (t.wrapperEl.removeEventListener("wheel", g), !0)
          : !t.mousewheel.enabled &&
              (v("addEventListener"), (t.mousewheel.enabled = !0), !0);
      }
      function b() {
        return t.params.cssMode
          ? (t.wrapperEl.addEventListener(event, g), !0)
          : !!t.mousewheel.enabled &&
              (v("removeEventListener"), (t.mousewheel.enabled = !1), !0);
      }
      (a("init", () => {
        (!t.params.mousewheel.enabled && t.params.cssMode && b(),
          t.params.mousewheel.enabled && w());
      }),
        a("destroy", () => {
          (t.params.cssMode && w(), t.mousewheel.enabled && b());
        }),
        Object.assign(t.mousewheel, { enable: w, disable: b }));
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a, emit: i } = e;
      function r(e) {
        let s;
        return e &&
          "string" == typeof e &&
          t.isElement &&
          ((s = t.el.querySelector(e) || t.hostEl.querySelector(e)), s)
          ? s
          : (e &&
              ("string" == typeof e && (s = [...document.querySelectorAll(e)]),
              t.params.uniqueNavElements &&
              "string" == typeof e &&
              s &&
              s.length > 1 &&
              1 === t.el.querySelectorAll(e).length
                ? (s = t.el.querySelector(e))
                : s && 1 === s.length && (s = s[0])),
            e && !s ? e : s);
      }
      function n(e, s) {
        const a = t.params.navigation;
        (e = T(e)).forEach((e) => {
          e &&
            (e.classList[s ? "add" : "remove"](...a.disabledClass.split(" ")),
            "BUTTON" === e.tagName && (e.disabled = s),
            t.params.watchOverflow &&
              t.enabled &&
              e.classList[t.isLocked ? "add" : "remove"](a.lockClass));
        });
      }
      function l() {
        const { nextEl: e, prevEl: s } = t.navigation;
        if (t.params.loop) return (n(s, !1), void n(e, !1));
        (n(s, t.isBeginning && !t.params.rewind),
          n(e, t.isEnd && !t.params.rewind));
      }
      function o(e) {
        (e.preventDefault(),
          (!t.isBeginning || t.params.loop || t.params.rewind) &&
            (t.slidePrev(), i("navigationPrev")));
      }
      function d(e) {
        (e.preventDefault(),
          (!t.isEnd || t.params.loop || t.params.rewind) &&
            (t.slideNext(), i("navigationNext")));
      }
      function c() {
        const e = t.params.navigation;
        if (
          ((t.params.navigation = re(
            t,
            t.originalParams.navigation,
            t.params.navigation,
            { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" },
          )),
          !e.nextEl && !e.prevEl)
        )
          return;
        let s = r(e.nextEl),
          a = r(e.prevEl);
        (Object.assign(t.navigation, { nextEl: s, prevEl: a }),
          (s = T(s)),
          (a = T(a)));
        const i = (s, a) => {
          (s && s.addEventListener("click", "next" === a ? d : o),
            !t.enabled && s && s.classList.add(...e.lockClass.split(" ")));
        };
        (s.forEach((e) => i(e, "next")), a.forEach((e) => i(e, "prev")));
      }
      function p() {
        let { nextEl: e, prevEl: s } = t.navigation;
        ((e = T(e)), (s = T(s)));
        const a = (e, s) => {
          (e.removeEventListener("click", "next" === s ? d : o),
            e.classList.remove(
              ...t.params.navigation.disabledClass.split(" "),
            ));
        };
        (e.forEach((e) => a(e, "next")), s.forEach((e) => a(e, "prev")));
      }
      (s({
        navigation: {
          nextEl: null,
          prevEl: null,
          hideOnClick: !1,
          disabledClass: "swiper-button-disabled",
          hiddenClass: "swiper-button-hidden",
          lockClass: "swiper-button-lock",
          navigationDisabledClass: "swiper-navigation-disabled",
        },
      }),
        (t.navigation = { nextEl: null, prevEl: null }),
        a("init", () => {
          !1 === t.params.navigation.enabled ? u() : (c(), l());
        }),
        a("toEdge fromEdge lock unlock", () => {
          l();
        }),
        a("destroy", () => {
          p();
        }),
        a("enable disable", () => {
          let { nextEl: e, prevEl: s } = t.navigation;
          ((e = T(e)),
            (s = T(s)),
            t.enabled
              ? l()
              : [...e, ...s]
                  .filter((e) => !!e)
                  .forEach((e) =>
                    e.classList.add(t.params.navigation.lockClass),
                  ));
        }),
        a("click", (e, s) => {
          let { nextEl: a, prevEl: r } = t.navigation;
          ((a = T(a)), (r = T(r)));
          const n = s.target;
          let l = r.includes(n) || a.includes(n);
          if (t.isElement && !l) {
            const e = s.path || (s.composedPath && s.composedPath());
            e && (l = e.find((e) => a.includes(e) || r.includes(e)));
          }
          if (t.params.navigation.hideOnClick && !l) {
            if (
              t.pagination &&
              t.params.pagination &&
              t.params.pagination.clickable &&
              (t.pagination.el === n || t.pagination.el.contains(n))
            )
              return;
            let e;
            (a.length
              ? (e = a[0].classList.contains(t.params.navigation.hiddenClass))
              : r.length &&
                (e = r[0].classList.contains(t.params.navigation.hiddenClass)),
              i(!0 === e ? "navigationShow" : "navigationHide"),
              [...a, ...r]
                .filter((e) => !!e)
                .forEach((e) =>
                  e.classList.toggle(t.params.navigation.hiddenClass),
                ));
          }
        }));
      const u = () => {
        (t.el.classList.add(
          ...t.params.navigation.navigationDisabledClass.split(" "),
        ),
          p());
      };
      Object.assign(t.navigation, {
        enable: () => {
          (t.el.classList.remove(
            ...t.params.navigation.navigationDisabledClass.split(" "),
          ),
            c(),
            l());
        },
        disable: u,
        update: l,
        init: c,
        destroy: p,
      });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a, emit: i } = e;
      const r = "swiper-pagination";
      let n;
      (s({
        pagination: {
          el: null,
          bulletElement: "span",
          clickable: !1,
          hideOnClick: !1,
          renderBullet: null,
          renderProgressbar: null,
          renderFraction: null,
          renderCustom: null,
          progressbarOpposite: !1,
          type: "bullets",
          dynamicBullets: !1,
          dynamicMainBullets: 1,
          formatFractionCurrent: (e) => e,
          formatFractionTotal: (e) => e,
          bulletClass: `${r}-bullet`,
          bulletActiveClass: `${r}-bullet-active`,
          modifierClass: `${r}-`,
          currentClass: `${r}-current`,
          totalClass: `${r}-total`,
          hiddenClass: `${r}-hidden`,
          progressbarFillClass: `${r}-progressbar-fill`,
          progressbarOppositeClass: `${r}-progressbar-opposite`,
          clickableClass: `${r}-clickable`,
          lockClass: `${r}-lock`,
          horizontalClass: `${r}-horizontal`,
          verticalClass: `${r}-vertical`,
          paginationDisabledClass: `${r}-disabled`,
        },
      }),
        (t.pagination = { el: null, bullets: [] }));
      let l = 0;
      function o() {
        return (
          !t.params.pagination.el ||
          !t.pagination.el ||
          (Array.isArray(t.pagination.el) && 0 === t.pagination.el.length)
        );
      }
      function d(e, s) {
        const { bulletActiveClass: a } = t.params.pagination;
        e &&
          (e = e[("prev" === s ? "previous" : "next") + "ElementSibling"]) &&
          (e.classList.add(`${a}-${s}`),
          (e = e[("prev" === s ? "previous" : "next") + "ElementSibling"]) &&
            e.classList.add(`${a}-${s}-${s}`));
      }
      function c(e) {
        const s = e.target.closest(ne(t.params.pagination.bulletClass));
        if (!s) return;
        e.preventDefault();
        const a = y(s) * t.params.slidesPerGroup;
        if (t.params.loop) {
          if (t.realIndex === a) return;
          const e =
            ((i = t.realIndex),
            (r = a),
            (n = t.slides.length),
            (r %= n) == 1 + (i %= n)
              ? "next"
              : r === i - 1
                ? "previous"
                : void 0);
          "next" === e
            ? t.slideNext()
            : "previous" === e
              ? t.slidePrev()
              : t.slideToLoop(a);
        } else t.slideTo(a);
        var i, r, n;
      }
      function p() {
        const e = t.rtl,
          s = t.params.pagination;
        if (o()) return;
        let a,
          r,
          c = t.pagination.el;
        c = T(c);
        const p =
            t.virtual && t.params.virtual.enabled
              ? t.virtual.slides.length
              : t.slides.length,
          u = t.params.loop
            ? Math.ceil(p / t.params.slidesPerGroup)
            : t.snapGrid.length;
        if (
          (t.params.loop
            ? ((r = t.previousRealIndex || 0),
              (a =
                t.params.slidesPerGroup > 1
                  ? Math.floor(t.realIndex / t.params.slidesPerGroup)
                  : t.realIndex))
            : void 0 !== t.snapIndex
              ? ((a = t.snapIndex), (r = t.previousSnapIndex))
              : ((r = t.previousIndex || 0), (a = t.activeIndex || 0)),
          "bullets" === s.type &&
            t.pagination.bullets &&
            t.pagination.bullets.length > 0)
        ) {
          const i = t.pagination.bullets;
          let o, p, u;
          if (
            (s.dynamicBullets &&
              ((n = S(i[0], t.isHorizontal() ? "width" : "height", !0)),
              c.forEach((e) => {
                e.style[t.isHorizontal() ? "width" : "height"] =
                  n * (s.dynamicMainBullets + 4) + "px";
              }),
              s.dynamicMainBullets > 1 &&
                void 0 !== r &&
                ((l += a - (r || 0)),
                l > s.dynamicMainBullets - 1
                  ? (l = s.dynamicMainBullets - 1)
                  : l < 0 && (l = 0)),
              (o = Math.max(a - l, 0)),
              (p = o + (Math.min(i.length, s.dynamicMainBullets) - 1)),
              (u = (p + o) / 2)),
            i.forEach((e) => {
              const t = [
                ...[
                  "",
                  "-next",
                  "-next-next",
                  "-prev",
                  "-prev-prev",
                  "-main",
                ].map((e) => `${s.bulletActiveClass}${e}`),
              ]
                .map((e) =>
                  "string" == typeof e && e.includes(" ") ? e.split(" ") : e,
                )
                .flat();
              e.classList.remove(...t);
            }),
            c.length > 1)
          )
            i.forEach((e) => {
              const i = y(e);
              (i === a
                ? e.classList.add(...s.bulletActiveClass.split(" "))
                : t.isElement && e.setAttribute("part", "bullet"),
                s.dynamicBullets &&
                  (i >= o &&
                    i <= p &&
                    e.classList.add(
                      ...`${s.bulletActiveClass}-main`.split(" "),
                    ),
                  i === o && d(e, "prev"),
                  i === p && d(e, "next")));
            });
          else {
            const e = i[a];
            if (
              (e && e.classList.add(...s.bulletActiveClass.split(" ")),
              t.isElement &&
                i.forEach((e, t) => {
                  e.setAttribute("part", t === a ? "bullet-active" : "bullet");
                }),
              s.dynamicBullets)
            ) {
              const e = i[o],
                t = i[p];
              for (let e = o; e <= p; e += 1)
                i[e] &&
                  i[e].classList.add(
                    ...`${s.bulletActiveClass}-main`.split(" "),
                  );
              (d(e, "prev"), d(t, "next"));
            }
          }
          if (s.dynamicBullets) {
            const a = Math.min(i.length, s.dynamicMainBullets + 4),
              r = (n * a - n) / 2 - u * n,
              l = e ? "right" : "left";
            i.forEach((e) => {
              e.style[t.isHorizontal() ? l : "top"] = `${r}px`;
            });
          }
        }
        c.forEach((e, r) => {
          if (
            ("fraction" === s.type &&
              (e.querySelectorAll(ne(s.currentClass)).forEach((e) => {
                e.textContent = s.formatFractionCurrent(a + 1);
              }),
              e.querySelectorAll(ne(s.totalClass)).forEach((e) => {
                e.textContent = s.formatFractionTotal(u);
              })),
            "progressbar" === s.type)
          ) {
            let i;
            i = s.progressbarOpposite
              ? t.isHorizontal()
                ? "vertical"
                : "horizontal"
              : t.isHorizontal()
                ? "horizontal"
                : "vertical";
            const r = (a + 1) / u;
            let n = 1,
              l = 1;
            ("horizontal" === i ? (n = r) : (l = r),
              e.querySelectorAll(ne(s.progressbarFillClass)).forEach((e) => {
                ((e.style.transform = `translate3d(0,0,0) scaleX(${n}) scaleY(${l})`),
                  (e.style.transitionDuration = `${t.params.speed}ms`));
              }));
          }
          ("custom" === s.type && s.renderCustom
            ? ((e.innerHTML = s.renderCustom(t, a + 1, u)),
              0 === r && i("paginationRender", e))
            : (0 === r && i("paginationRender", e), i("paginationUpdate", e)),
            t.params.watchOverflow &&
              t.enabled &&
              e.classList[t.isLocked ? "add" : "remove"](s.lockClass));
        });
      }
      function u() {
        const e = t.params.pagination;
        if (o()) return;
        const s =
          t.virtual && t.params.virtual.enabled
            ? t.virtual.slides.length
            : t.grid && t.params.grid.rows > 1
              ? t.slides.length / Math.ceil(t.params.grid.rows)
              : t.slides.length;
        let a = t.pagination.el;
        a = T(a);
        let r = "";
        if ("bullets" === e.type) {
          let a = t.params.loop
            ? Math.ceil(s / t.params.slidesPerGroup)
            : t.snapGrid.length;
          t.params.freeMode && t.params.freeMode.enabled && a > s && (a = s);
          for (let s = 0; s < a; s += 1)
            e.renderBullet
              ? (r += e.renderBullet.call(t, s, e.bulletClass))
              : (r += `<${e.bulletElement} ${t.isElement ? 'part="bullet"' : ""} class="${e.bulletClass}"></${e.bulletElement}>`);
        }
        ("fraction" === e.type &&
          (r = e.renderFraction
            ? e.renderFraction.call(t, e.currentClass, e.totalClass)
            : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`),
          "progressbar" === e.type &&
            (r = e.renderProgressbar
              ? e.renderProgressbar.call(t, e.progressbarFillClass)
              : `<span class="${e.progressbarFillClass}"></span>`),
          (t.pagination.bullets = []),
          a.forEach((s) => {
            ("custom" !== e.type && (s.innerHTML = r || ""),
              "bullets" === e.type &&
                t.pagination.bullets.push(
                  ...s.querySelectorAll(ne(e.bulletClass)),
                ));
          }),
          "custom" !== e.type && i("paginationRender", a[0]));
      }
      function m() {
        t.params.pagination = re(
          t,
          t.originalParams.pagination,
          t.params.pagination,
          { el: "swiper-pagination" },
        );
        const e = t.params.pagination;
        if (!e.el) return;
        let s;
        ("string" == typeof e.el &&
          t.isElement &&
          (s = t.el.querySelector(e.el)),
          s ||
            "string" != typeof e.el ||
            (s = [...document.querySelectorAll(e.el)]),
          s || (s = e.el),
          s &&
            0 !== s.length &&
            (t.params.uniqueNavElements &&
              "string" == typeof e.el &&
              Array.isArray(s) &&
              s.length > 1 &&
              ((s = [...t.el.querySelectorAll(e.el)]),
              s.length > 1 &&
                (s = s.filter((e) => E(e, ".swiper")[0] === t.el)[0])),
            Array.isArray(s) && 1 === s.length && (s = s[0]),
            Object.assign(t.pagination, { el: s }),
            (s = T(s)),
            s.forEach((s) => {
              ("bullets" === e.type &&
                e.clickable &&
                s.classList.add(...(e.clickableClass || "").split(" ")),
                s.classList.add(e.modifierClass + e.type),
                s.classList.add(
                  t.isHorizontal() ? e.horizontalClass : e.verticalClass,
                ),
                "bullets" === e.type &&
                  e.dynamicBullets &&
                  (s.classList.add(`${e.modifierClass}${e.type}-dynamic`),
                  (l = 0),
                  e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)),
                "progressbar" === e.type &&
                  e.progressbarOpposite &&
                  s.classList.add(e.progressbarOppositeClass),
                e.clickable && s.addEventListener("click", c),
                t.enabled || s.classList.add(e.lockClass));
            })));
      }
      function h() {
        const e = t.params.pagination;
        if (o()) return;
        let s = t.pagination.el;
        (s &&
          ((s = T(s)),
          s.forEach((s) => {
            (s.classList.remove(e.hiddenClass),
              s.classList.remove(e.modifierClass + e.type),
              s.classList.remove(
                t.isHorizontal() ? e.horizontalClass : e.verticalClass,
              ),
              e.clickable &&
                (s.classList.remove(...(e.clickableClass || "").split(" ")),
                s.removeEventListener("click", c)));
          })),
          t.pagination.bullets &&
            t.pagination.bullets.forEach((t) =>
              t.classList.remove(...e.bulletActiveClass.split(" ")),
            ));
      }
      (a("changeDirection", () => {
        if (!t.pagination || !t.pagination.el) return;
        const e = t.params.pagination;
        let { el: s } = t.pagination;
        ((s = T(s)),
          s.forEach((s) => {
            (s.classList.remove(e.horizontalClass, e.verticalClass),
              s.classList.add(
                t.isHorizontal() ? e.horizontalClass : e.verticalClass,
              ));
          }));
      }),
        a("init", () => {
          !1 === t.params.pagination.enabled ? f() : (m(), u(), p());
        }),
        a("activeIndexChange", () => {
          void 0 === t.snapIndex && p();
        }),
        a("snapIndexChange", () => {
          p();
        }),
        a("snapGridLengthChange", () => {
          (u(), p());
        }),
        a("destroy", () => {
          h();
        }),
        a("enable disable", () => {
          let { el: e } = t.pagination;
          e &&
            ((e = T(e)),
            e.forEach((e) =>
              e.classList[t.enabled ? "remove" : "add"](
                t.params.pagination.lockClass,
              ),
            ));
        }),
        a("lock unlock", () => {
          p();
        }),
        a("click", (e, s) => {
          const a = s.target,
            r = T(t.pagination.el);
          if (
            t.params.pagination.el &&
            t.params.pagination.hideOnClick &&
            r &&
            r.length > 0 &&
            !a.classList.contains(t.params.pagination.bulletClass)
          ) {
            if (
              t.navigation &&
              ((t.navigation.nextEl && a === t.navigation.nextEl) ||
                (t.navigation.prevEl && a === t.navigation.prevEl))
            )
              return;
            const e = r[0].classList.contains(t.params.pagination.hiddenClass);
            (i(!0 === e ? "paginationShow" : "paginationHide"),
              r.forEach((e) =>
                e.classList.toggle(t.params.pagination.hiddenClass),
              ));
          }
        }));
      const f = () => {
        t.el.classList.add(t.params.pagination.paginationDisabledClass);
        let { el: e } = t.pagination;
        (e &&
          ((e = T(e)),
          e.forEach((e) =>
            e.classList.add(t.params.pagination.paginationDisabledClass),
          )),
          h());
      };
      Object.assign(t.pagination, {
        enable: () => {
          t.el.classList.remove(t.params.pagination.paginationDisabledClass);
          let { el: e } = t.pagination;
          (e &&
            ((e = T(e)),
            e.forEach((e) =>
              e.classList.remove(t.params.pagination.paginationDisabledClass),
            )),
            m(),
            u(),
            p());
        },
        disable: f,
        render: u,
        update: p,
        init: m,
        destroy: h,
      });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: i, emit: r } = e;
      const o = a();
      let d,
        c,
        p,
        u,
        m = !1,
        h = null,
        f = null;
      function g() {
        if (!t.params.scrollbar.el || !t.scrollbar.el) return;
        const { scrollbar: e, rtlTranslate: s } = t,
          { dragEl: a, el: i } = e,
          r = t.params.scrollbar,
          n = t.params.loop ? t.progressLoop : t.progress;
        let l = c,
          o = (p - c) * n;
        (s
          ? ((o = -o),
            o > 0 ? ((l = c - o), (o = 0)) : -o + c > p && (l = p + o))
          : o < 0
            ? ((l = c + o), (o = 0))
            : o + c > p && (l = p - o),
          t.isHorizontal()
            ? ((a.style.transform = `translate3d(${o}px, 0, 0)`),
              (a.style.width = `${l}px`))
            : ((a.style.transform = `translate3d(0px, ${o}px, 0)`),
              (a.style.height = `${l}px`)),
          r.hide &&
            (clearTimeout(h),
            (i.style.opacity = 1),
            (h = setTimeout(() => {
              ((i.style.opacity = 0), (i.style.transitionDuration = "400ms"));
            }, 1e3))));
      }
      function b() {
        if (!t.params.scrollbar.el || !t.scrollbar.el) return;
        const { scrollbar: e } = t,
          { dragEl: s, el: a } = e;
        ((s.style.width = ""),
          (s.style.height = ""),
          (p = t.isHorizontal() ? a.offsetWidth : a.offsetHeight),
          (u =
            t.size /
            (t.virtualSize +
              t.params.slidesOffsetBefore -
              (t.params.centeredSlides ? t.snapGrid[0] : 0))),
          (c =
            "auto" === t.params.scrollbar.dragSize
              ? p * u
              : parseInt(t.params.scrollbar.dragSize, 10)),
          t.isHorizontal()
            ? (s.style.width = `${c}px`)
            : (s.style.height = `${c}px`),
          (a.style.display = u >= 1 ? "none" : ""),
          t.params.scrollbar.hide && (a.style.opacity = 0),
          t.params.watchOverflow &&
            t.enabled &&
            e.el.classList[t.isLocked ? "add" : "remove"](
              t.params.scrollbar.lockClass,
            ));
      }
      function y(e) {
        return t.isHorizontal() ? e.clientX : e.clientY;
      }
      function E(e) {
        const { scrollbar: s, rtlTranslate: a } = t,
          { el: i } = s;
        let r;
        ((r =
          (y(e) -
            w(i)[t.isHorizontal() ? "left" : "top"] -
            (null !== d ? d : c / 2)) /
          (p - c)),
          (r = Math.max(Math.min(r, 1), 0)),
          a && (r = 1 - r));
        const n = t.minTranslate() + (t.maxTranslate() - t.minTranslate()) * r;
        (t.updateProgress(n),
          t.setTranslate(n),
          t.updateActiveIndex(),
          t.updateSlidesClasses());
      }
      function x(e) {
        const s = t.params.scrollbar,
          { scrollbar: a, wrapperEl: i } = t,
          { el: n, dragEl: l } = a;
        ((m = !0),
          (d =
            e.target === l
              ? y(e) -
                e.target.getBoundingClientRect()[
                  t.isHorizontal() ? "left" : "top"
                ]
              : null),
          e.preventDefault(),
          e.stopPropagation(),
          (i.style.transitionDuration = "100ms"),
          (l.style.transitionDuration = "100ms"),
          E(e),
          clearTimeout(f),
          (n.style.transitionDuration = "0ms"),
          s.hide && (n.style.opacity = 1),
          t.params.cssMode && (t.wrapperEl.style["scroll-snap-type"] = "none"),
          r("scrollbarDragStart", e));
      }
      function S(e) {
        const { scrollbar: s, wrapperEl: a } = t,
          { el: i, dragEl: n } = s;
        m &&
          (e.preventDefault && e.cancelable
            ? e.preventDefault()
            : (e.returnValue = !1),
          E(e),
          (a.style.transitionDuration = "0ms"),
          (i.style.transitionDuration = "0ms"),
          (n.style.transitionDuration = "0ms"),
          r("scrollbarDragMove", e));
      }
      function M(e) {
        const s = t.params.scrollbar,
          { scrollbar: a, wrapperEl: i } = t,
          { el: n } = a;
        m &&
          ((m = !1),
          t.params.cssMode &&
            ((t.wrapperEl.style["scroll-snap-type"] = ""),
            (i.style.transitionDuration = "")),
          s.hide &&
            (clearTimeout(f),
            (f = l(() => {
              ((n.style.opacity = 0), (n.style.transitionDuration = "400ms"));
            }, 1e3))),
          r("scrollbarDragEnd", e),
          s.snapOnRelease && t.slideToClosest());
      }
      function C(e) {
        const { scrollbar: s, params: a } = t,
          i = s.el;
        if (!i) return;
        const r = i,
          n = !!a.passiveListeners && { passive: !1, capture: !1 },
          l = !!a.passiveListeners && { passive: !0, capture: !1 };
        if (!r) return;
        const d = "on" === e ? "addEventListener" : "removeEventListener";
        (r[d]("pointerdown", x, n),
          o[d]("pointermove", S, n),
          o[d]("pointerup", M, l));
      }
      function P() {
        const { scrollbar: e, el: s } = t;
        t.params.scrollbar = re(
          t,
          t.originalParams.scrollbar,
          t.params.scrollbar,
          { el: "swiper-scrollbar" },
        );
        const a = t.params.scrollbar;
        if (!a.el) return;
        let i, r;
        if (
          ("string" == typeof a.el &&
            t.isElement &&
            (i = t.el.querySelector(a.el)),
          i || "string" != typeof a.el)
        )
          i || (i = a.el);
        else if (((i = o.querySelectorAll(a.el)), !i.length)) return;
        (t.params.uniqueNavElements &&
          "string" == typeof a.el &&
          i.length > 1 &&
          1 === s.querySelectorAll(a.el).length &&
          (i = s.querySelector(a.el)),
          i.length > 0 && (i = i[0]),
          i.classList.add(
            t.isHorizontal() ? a.horizontalClass : a.verticalClass,
          ),
          i &&
            ((r = i.querySelector(ne(t.params.scrollbar.dragClass))),
            r || ((r = v("div", t.params.scrollbar.dragClass)), i.append(r))),
          Object.assign(e, { el: i, dragEl: r }),
          a.draggable && t.params.scrollbar.el && t.scrollbar.el && C("on"),
          i &&
            i.classList[t.enabled ? "remove" : "add"](
              ...n(t.params.scrollbar.lockClass),
            ));
      }
      function L() {
        const e = t.params.scrollbar,
          s = t.scrollbar.el;
        (s &&
          s.classList.remove(
            ...n(t.isHorizontal() ? e.horizontalClass : e.verticalClass),
          ),
          t.params.scrollbar.el && t.scrollbar.el && C("off"));
      }
      (s({
        scrollbar: {
          el: null,
          dragSize: "auto",
          hide: !1,
          draggable: !1,
          snapOnRelease: !0,
          lockClass: "swiper-scrollbar-lock",
          dragClass: "swiper-scrollbar-drag",
          scrollbarDisabledClass: "swiper-scrollbar-disabled",
          horizontalClass: "swiper-scrollbar-horizontal",
          verticalClass: "swiper-scrollbar-vertical",
        },
      }),
        (t.scrollbar = { el: null, dragEl: null }),
        i("changeDirection", () => {
          if (!t.scrollbar || !t.scrollbar.el) return;
          const e = t.params.scrollbar;
          let { el: s } = t.scrollbar;
          ((s = T(s)),
            s.forEach((s) => {
              (s.classList.remove(e.horizontalClass, e.verticalClass),
                s.classList.add(
                  t.isHorizontal() ? e.horizontalClass : e.verticalClass,
                ));
            }));
        }),
        i("init", () => {
          !1 === t.params.scrollbar.enabled ? I() : (P(), b(), g());
        }),
        i("update resize observerUpdate lock unlock changeDirection", () => {
          b();
        }),
        i("setTranslate", () => {
          g();
        }),
        i("setTransition", (e, s) => {
          !(function (e) {
            t.params.scrollbar.el &&
              t.scrollbar.el &&
              (t.scrollbar.dragEl.style.transitionDuration = `${e}ms`);
          })(s);
        }),
        i("enable disable", () => {
          const { el: e } = t.scrollbar;
          e &&
            e.classList[t.enabled ? "remove" : "add"](
              ...n(t.params.scrollbar.lockClass),
            );
        }),
        i("destroy", () => {
          L();
        }));
      const I = () => {
        (t.el.classList.add(...n(t.params.scrollbar.scrollbarDisabledClass)),
          t.scrollbar.el &&
            t.scrollbar.el.classList.add(
              ...n(t.params.scrollbar.scrollbarDisabledClass),
            ),
          L());
      };
      Object.assign(t.scrollbar, {
        enable: () => {
          (t.el.classList.remove(
            ...n(t.params.scrollbar.scrollbarDisabledClass),
          ),
            t.scrollbar.el &&
              t.scrollbar.el.classList.remove(
                ...n(t.params.scrollbar.scrollbarDisabledClass),
              ),
            P(),
            b(),
            g());
        },
        disable: I,
        updateSize: b,
        setTranslate: g,
        init: P,
        destroy: L,
      });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a } = e;
      s({ parallax: { enabled: !1 } });
      const i =
          "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]",
        r = (e, s) => {
          const { rtl: a } = t,
            i = a ? -1 : 1,
            r = e.getAttribute("data-swiper-parallax") || "0";
          let n = e.getAttribute("data-swiper-parallax-x"),
            l = e.getAttribute("data-swiper-parallax-y");
          const o = e.getAttribute("data-swiper-parallax-scale"),
            d = e.getAttribute("data-swiper-parallax-opacity"),
            c = e.getAttribute("data-swiper-parallax-rotate");
          if (
            (n || l
              ? ((n = n || "0"), (l = l || "0"))
              : t.isHorizontal()
                ? ((n = r), (l = "0"))
                : ((l = r), (n = "0")),
            (n =
              n.indexOf("%") >= 0
                ? parseInt(n, 10) * s * i + "%"
                : n * s * i + "px"),
            (l =
              l.indexOf("%") >= 0 ? parseInt(l, 10) * s + "%" : l * s + "px"),
            null != d)
          ) {
            const t = d - (d - 1) * (1 - Math.abs(s));
            e.style.opacity = t;
          }
          let p = `translate3d(${n}, ${l}, 0px)`;
          if (null != o) {
            p += ` scale(${o - (o - 1) * (1 - Math.abs(s))})`;
          }
          if (c && null != c) {
            p += ` rotate(${c * s * -1}deg)`;
          }
          e.style.transform = p;
        },
        n = () => {
          const {
              el: e,
              slides: s,
              progress: a,
              snapGrid: n,
              isElement: l,
            } = t,
            o = f(e, i);
          (t.isElement && o.push(...f(t.hostEl, i)),
            o.forEach((e) => {
              r(e, a);
            }),
            s.forEach((e, s) => {
              let l = e.progress;
              (t.params.slidesPerGroup > 1 &&
                "auto" !== t.params.slidesPerView &&
                (l += Math.ceil(s / 2) - a * (n.length - 1)),
                (l = Math.min(Math.max(l, -1), 1)),
                e
                  .querySelectorAll(`${i}, [data-swiper-parallax-rotate]`)
                  .forEach((e) => {
                    r(e, l);
                  }));
            }));
        };
      (a("beforeInit", () => {
        t.params.parallax.enabled &&
          ((t.params.watchSlidesProgress = !0),
          (t.originalParams.watchSlidesProgress = !0));
      }),
        a("init", () => {
          t.params.parallax.enabled && n();
        }),
        a("setTranslate", () => {
          t.params.parallax.enabled && n();
        }),
        a("setTransition", (e, s) => {
          t.params.parallax.enabled &&
            (function (e) {
              void 0 === e && (e = t.params.speed);
              const { el: s, hostEl: a } = t,
                r = [...s.querySelectorAll(i)];
              (t.isElement && r.push(...a.querySelectorAll(i)),
                r.forEach((t) => {
                  let s =
                    parseInt(
                      t.getAttribute("data-swiper-parallax-duration"),
                      10,
                    ) || e;
                  (0 === e && (s = 0), (t.style.transitionDuration = `${s}ms`));
                }));
            })(s);
        }));
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a, emit: i } = e;
      const n = r();
      (s({
        zoom: {
          enabled: !1,
          limitToOriginalSize: !1,
          maxRatio: 3,
          minRatio: 1,
          toggle: !0,
          containerClass: "swiper-zoom-container",
          zoomedSlideClass: "swiper-slide-zoomed",
        },
      }),
        (t.zoom = { enabled: !1 }));
      let l,
        o,
        c = 1,
        p = !1;
      const u = [],
        m = {
          originX: 0,
          originY: 0,
          slideEl: void 0,
          slideWidth: void 0,
          slideHeight: void 0,
          imageEl: void 0,
          imageWrapEl: void 0,
          maxRatio: 3,
        },
        h = {
          isTouched: void 0,
          isMoved: void 0,
          currentX: void 0,
          currentY: void 0,
          minX: void 0,
          minY: void 0,
          maxX: void 0,
          maxY: void 0,
          width: void 0,
          height: void 0,
          startX: void 0,
          startY: void 0,
          touchesStart: {},
          touchesCurrent: {},
        },
        g = {
          x: void 0,
          y: void 0,
          prevPositionX: void 0,
          prevPositionY: void 0,
          prevTime: void 0,
        };
      let v,
        b = 1;
      function y() {
        if (u.length < 2) return 1;
        const e = u[0].pageX,
          t = u[0].pageY,
          s = u[1].pageX,
          a = u[1].pageY;
        return Math.sqrt((s - e) ** 2 + (a - t) ** 2);
      }
      function x() {
        const e = t.params.zoom,
          s = m.imageWrapEl.getAttribute("data-swiper-zoom") || e.maxRatio;
        if (e.limitToOriginalSize && m.imageEl && m.imageEl.naturalWidth) {
          const e = m.imageEl.naturalWidth / m.imageEl.offsetWidth;
          return Math.min(e, s);
        }
        return s;
      }
      function S(e) {
        const s = t.isElement ? "swiper-slide" : `.${t.params.slideClass}`;
        return (
          !!e.target.matches(s) ||
          t.slides.filter((t) => t.contains(e.target)).length > 0
        );
      }
      function T(e) {
        if (("mouse" === e.pointerType && u.splice(0, u.length), !S(e))) return;
        const s = t.params.zoom;
        if (((l = !1), (o = !1), u.push(e), !(u.length < 2))) {
          if (((l = !0), (m.scaleStart = y()), !m.slideEl)) {
            ((m.slideEl = e.target.closest(
              `.${t.params.slideClass}, swiper-slide`,
            )),
              m.slideEl || (m.slideEl = t.slides[t.activeIndex]));
            let a = m.slideEl.querySelector(`.${s.containerClass}`);
            if (
              (a &&
                (a = a.querySelectorAll(
                  "picture, img, svg, canvas, .swiper-zoom-target",
                )[0]),
              (m.imageEl = a),
              (m.imageWrapEl = a
                ? E(m.imageEl, `.${s.containerClass}`)[0]
                : void 0),
              !m.imageWrapEl)
            )
              return void (m.imageEl = void 0);
            m.maxRatio = x();
          }
          if (m.imageEl) {
            const [e, t] = (function () {
              if (u.length < 2) return { x: null, y: null };
              const e = m.imageEl.getBoundingClientRect();
              return [
                (u[0].pageX + (u[1].pageX - u[0].pageX) / 2 - e.x - n.scrollX) /
                  c,
                (u[0].pageY + (u[1].pageY - u[0].pageY) / 2 - e.y - n.scrollY) /
                  c,
              ];
            })();
            ((m.originX = e),
              (m.originY = t),
              (m.imageEl.style.transitionDuration = "0ms"));
          }
          p = !0;
        }
      }
      function M(e) {
        if (!S(e)) return;
        const s = t.params.zoom,
          a = t.zoom,
          i = u.findIndex((t) => t.pointerId === e.pointerId);
        (i >= 0 && (u[i] = e),
          u.length < 2 ||
            ((o = !0),
            (m.scaleMove = y()),
            m.imageEl &&
              ((a.scale = (m.scaleMove / m.scaleStart) * c),
              a.scale > m.maxRatio &&
                (a.scale = m.maxRatio - 1 + (a.scale - m.maxRatio + 1) ** 0.5),
              a.scale < s.minRatio &&
                (a.scale = s.minRatio + 1 - (s.minRatio - a.scale + 1) ** 0.5),
              (m.imageEl.style.transform = `translate3d(0,0,0) scale(${a.scale})`))));
      }
      function C(e) {
        if (!S(e)) return;
        if ("mouse" === e.pointerType && "pointerout" === e.type) return;
        const s = t.params.zoom,
          a = t.zoom,
          i = u.findIndex((t) => t.pointerId === e.pointerId);
        (i >= 0 && u.splice(i, 1),
          l &&
            o &&
            ((l = !1),
            (o = !1),
            m.imageEl &&
              ((a.scale = Math.max(Math.min(a.scale, m.maxRatio), s.minRatio)),
              (m.imageEl.style.transitionDuration = `${t.params.speed}ms`),
              (m.imageEl.style.transform = `translate3d(0,0,0) scale(${a.scale})`),
              (c = a.scale),
              (p = !1),
              a.scale > 1 && m.slideEl
                ? m.slideEl.classList.add(`${s.zoomedSlideClass}`)
                : a.scale <= 1 &&
                  m.slideEl &&
                  m.slideEl.classList.remove(`${s.zoomedSlideClass}`),
              1 === a.scale &&
                ((m.originX = 0), (m.originY = 0), (m.slideEl = void 0)))));
      }
      function P() {
        t.touchEventsData.preventTouchMoveFromPointerMove = !1;
      }
      function L(e) {
        if (
          !S(e) ||
          !(function (e) {
            const s = `.${t.params.zoom.containerClass}`;
            return (
              !!e.target.matches(s) ||
              [...t.hostEl.querySelectorAll(s)].filter((t) =>
                t.contains(e.target),
              ).length > 0
            );
          })(e)
        )
          return;
        const s = t.zoom;
        if (!m.imageEl) return;
        if (!h.isTouched || !m.slideEl) return;
        h.isMoved ||
          ((h.width = m.imageEl.offsetWidth || m.imageEl.clientWidth),
          (h.height = m.imageEl.offsetHeight || m.imageEl.clientHeight),
          (h.startX = d(m.imageWrapEl, "x") || 0),
          (h.startY = d(m.imageWrapEl, "y") || 0),
          (m.slideWidth = m.slideEl.offsetWidth),
          (m.slideHeight = m.slideEl.offsetHeight),
          (m.imageWrapEl.style.transitionDuration = "0ms"));
        const a = h.width * s.scale,
          i = h.height * s.scale;
        ((h.minX = Math.min(m.slideWidth / 2 - a / 2, 0)),
          (h.maxX = -h.minX),
          (h.minY = Math.min(m.slideHeight / 2 - i / 2, 0)),
          (h.maxY = -h.minY),
          (h.touchesCurrent.x = u.length > 0 ? u[0].pageX : e.pageX),
          (h.touchesCurrent.y = u.length > 0 ? u[0].pageY : e.pageY));
        if (
          (Math.max(
            Math.abs(h.touchesCurrent.x - h.touchesStart.x),
            Math.abs(h.touchesCurrent.y - h.touchesStart.y),
          ) > 5 && (t.allowClick = !1),
          !h.isMoved && !p)
        ) {
          if (
            t.isHorizontal() &&
            ((Math.floor(h.minX) === Math.floor(h.startX) &&
              h.touchesCurrent.x < h.touchesStart.x) ||
              (Math.floor(h.maxX) === Math.floor(h.startX) &&
                h.touchesCurrent.x > h.touchesStart.x))
          )
            return ((h.isTouched = !1), void P());
          if (
            !t.isHorizontal() &&
            ((Math.floor(h.minY) === Math.floor(h.startY) &&
              h.touchesCurrent.y < h.touchesStart.y) ||
              (Math.floor(h.maxY) === Math.floor(h.startY) &&
                h.touchesCurrent.y > h.touchesStart.y))
          )
            return ((h.isTouched = !1), void P());
        }
        (e.cancelable && e.preventDefault(),
          e.stopPropagation(),
          clearTimeout(v),
          (t.touchEventsData.preventTouchMoveFromPointerMove = !0),
          (v = setTimeout(() => {
            t.destroyed || P();
          })),
          (h.isMoved = !0));
        const r = (s.scale - c) / (m.maxRatio - t.params.zoom.minRatio),
          { originX: n, originY: l } = m;
        ((h.currentX =
          h.touchesCurrent.x -
          h.touchesStart.x +
          h.startX +
          r * (h.width - 2 * n)),
          (h.currentY =
            h.touchesCurrent.y -
            h.touchesStart.y +
            h.startY +
            r * (h.height - 2 * l)),
          h.currentX < h.minX &&
            (h.currentX = h.minX + 1 - (h.minX - h.currentX + 1) ** 0.8),
          h.currentX > h.maxX &&
            (h.currentX = h.maxX - 1 + (h.currentX - h.maxX + 1) ** 0.8),
          h.currentY < h.minY &&
            (h.currentY = h.minY + 1 - (h.minY - h.currentY + 1) ** 0.8),
          h.currentY > h.maxY &&
            (h.currentY = h.maxY - 1 + (h.currentY - h.maxY + 1) ** 0.8),
          g.prevPositionX || (g.prevPositionX = h.touchesCurrent.x),
          g.prevPositionY || (g.prevPositionY = h.touchesCurrent.y),
          g.prevTime || (g.prevTime = Date.now()),
          (g.x =
            (h.touchesCurrent.x - g.prevPositionX) /
            (Date.now() - g.prevTime) /
            2),
          (g.y =
            (h.touchesCurrent.y - g.prevPositionY) /
            (Date.now() - g.prevTime) /
            2),
          Math.abs(h.touchesCurrent.x - g.prevPositionX) < 2 && (g.x = 0),
          Math.abs(h.touchesCurrent.y - g.prevPositionY) < 2 && (g.y = 0),
          (g.prevPositionX = h.touchesCurrent.x),
          (g.prevPositionY = h.touchesCurrent.y),
          (g.prevTime = Date.now()),
          (m.imageWrapEl.style.transform = `translate3d(${h.currentX}px, ${h.currentY}px,0)`));
      }
      function I() {
        const e = t.zoom;
        m.slideEl &&
          t.activeIndex !== t.slides.indexOf(m.slideEl) &&
          (m.imageEl &&
            (m.imageEl.style.transform = "translate3d(0,0,0) scale(1)"),
          m.imageWrapEl &&
            (m.imageWrapEl.style.transform = "translate3d(0,0,0)"),
          m.slideEl.classList.remove(`${t.params.zoom.zoomedSlideClass}`),
          (e.scale = 1),
          (c = 1),
          (m.slideEl = void 0),
          (m.imageEl = void 0),
          (m.imageWrapEl = void 0),
          (m.originX = 0),
          (m.originY = 0));
      }
      function z(e) {
        const s = t.zoom,
          a = t.params.zoom;
        if (!m.slideEl) {
          (e &&
            e.target &&
            (m.slideEl = e.target.closest(
              `.${t.params.slideClass}, swiper-slide`,
            )),
            m.slideEl ||
              (t.params.virtual && t.params.virtual.enabled && t.virtual
                ? (m.slideEl = f(
                    t.slidesEl,
                    `.${t.params.slideActiveClass}`,
                  )[0])
                : (m.slideEl = t.slides[t.activeIndex])));
          let s = m.slideEl.querySelector(`.${a.containerClass}`);
          (s &&
            (s = s.querySelectorAll(
              "picture, img, svg, canvas, .swiper-zoom-target",
            )[0]),
            (m.imageEl = s),
            (m.imageWrapEl = s
              ? E(m.imageEl, `.${a.containerClass}`)[0]
              : void 0));
        }
        if (!m.imageEl || !m.imageWrapEl) return;
        let i, r, l, o, d, p, u, g, v, b, y, S, T, M, C, P, L, I;
        (t.params.cssMode &&
          ((t.wrapperEl.style.overflow = "hidden"),
          (t.wrapperEl.style.touchAction = "none")),
          m.slideEl.classList.add(`${a.zoomedSlideClass}`),
          void 0 === h.touchesStart.x && e
            ? ((i = e.pageX), (r = e.pageY))
            : ((i = h.touchesStart.x), (r = h.touchesStart.y)));
        const z = "number" == typeof e ? e : null;
        1 === c &&
          z &&
          ((i = void 0),
          (r = void 0),
          (h.touchesStart.x = void 0),
          (h.touchesStart.y = void 0));
        const A = x();
        ((s.scale = z || A),
          (c = z || A),
          !e || (1 === c && z)
            ? ((u = 0), (g = 0))
            : ((L = m.slideEl.offsetWidth),
              (I = m.slideEl.offsetHeight),
              (l = w(m.slideEl).left + n.scrollX),
              (o = w(m.slideEl).top + n.scrollY),
              (d = l + L / 2 - i),
              (p = o + I / 2 - r),
              (v = m.imageEl.offsetWidth || m.imageEl.clientWidth),
              (b = m.imageEl.offsetHeight || m.imageEl.clientHeight),
              (y = v * s.scale),
              (S = b * s.scale),
              (T = Math.min(L / 2 - y / 2, 0)),
              (M = Math.min(I / 2 - S / 2, 0)),
              (C = -T),
              (P = -M),
              (u = d * s.scale),
              (g = p * s.scale),
              u < T && (u = T),
              u > C && (u = C),
              g < M && (g = M),
              g > P && (g = P)),
          z && 1 === s.scale && ((m.originX = 0), (m.originY = 0)),
          (m.imageWrapEl.style.transitionDuration = "300ms"),
          (m.imageWrapEl.style.transform = `translate3d(${u}px, ${g}px,0)`),
          (m.imageEl.style.transitionDuration = "300ms"),
          (m.imageEl.style.transform = `translate3d(0,0,0) scale(${s.scale})`));
      }
      function A() {
        const e = t.zoom,
          s = t.params.zoom;
        if (!m.slideEl) {
          t.params.virtual && t.params.virtual.enabled && t.virtual
            ? (m.slideEl = f(t.slidesEl, `.${t.params.slideActiveClass}`)[0])
            : (m.slideEl = t.slides[t.activeIndex]);
          let e = m.slideEl.querySelector(`.${s.containerClass}`);
          (e &&
            (e = e.querySelectorAll(
              "picture, img, svg, canvas, .swiper-zoom-target",
            )[0]),
            (m.imageEl = e),
            (m.imageWrapEl = e
              ? E(m.imageEl, `.${s.containerClass}`)[0]
              : void 0));
        }
        m.imageEl &&
          m.imageWrapEl &&
          (t.params.cssMode &&
            ((t.wrapperEl.style.overflow = ""),
            (t.wrapperEl.style.touchAction = "")),
          (e.scale = 1),
          (c = 1),
          (h.touchesStart.x = void 0),
          (h.touchesStart.y = void 0),
          (m.imageWrapEl.style.transitionDuration = "300ms"),
          (m.imageWrapEl.style.transform = "translate3d(0,0,0)"),
          (m.imageEl.style.transitionDuration = "300ms"),
          (m.imageEl.style.transform = "translate3d(0,0,0) scale(1)"),
          m.slideEl.classList.remove(`${s.zoomedSlideClass}`),
          (m.slideEl = void 0),
          (m.originX = 0),
          (m.originY = 0));
      }
      function $(e) {
        const s = t.zoom;
        s.scale && 1 !== s.scale ? A() : z(e);
      }
      function k() {
        return {
          passiveListener: !!t.params.passiveListeners && {
            passive: !0,
            capture: !1,
          },
          activeListenerWithCapture: !t.params.passiveListeners || {
            passive: !1,
            capture: !0,
          },
        };
      }
      function O() {
        const e = t.zoom;
        if (e.enabled) return;
        e.enabled = !0;
        const { passiveListener: s, activeListenerWithCapture: a } = k();
        (t.wrapperEl.addEventListener("pointerdown", T, s),
          t.wrapperEl.addEventListener("pointermove", M, a),
          ["pointerup", "pointercancel", "pointerout"].forEach((e) => {
            t.wrapperEl.addEventListener(e, C, s);
          }),
          t.wrapperEl.addEventListener("pointermove", L, a));
      }
      function D() {
        const e = t.zoom;
        if (!e.enabled) return;
        e.enabled = !1;
        const { passiveListener: s, activeListenerWithCapture: a } = k();
        (t.wrapperEl.removeEventListener("pointerdown", T, s),
          t.wrapperEl.removeEventListener("pointermove", M, a),
          ["pointerup", "pointercancel", "pointerout"].forEach((e) => {
            t.wrapperEl.removeEventListener(e, C, s);
          }),
          t.wrapperEl.removeEventListener("pointermove", L, a));
      }
      (Object.defineProperty(t.zoom, "scale", {
        get: () => b,
        set(e) {
          if (b !== e) {
            const t = m.imageEl,
              s = m.slideEl;
            i("zoomChange", e, t, s);
          }
          b = e;
        },
      }),
        a("init", () => {
          t.params.zoom.enabled && O();
        }),
        a("destroy", () => {
          D();
        }),
        a("touchStart", (e, s) => {
          t.zoom.enabled &&
            (function (e) {
              const s = t.device;
              if (!m.imageEl) return;
              if (h.isTouched) return;
              (s.android && e.cancelable && e.preventDefault(),
                (h.isTouched = !0));
              const a = u.length > 0 ? u[0] : e;
              ((h.touchesStart.x = a.pageX), (h.touchesStart.y = a.pageY));
            })(s);
        }),
        a("touchEnd", (e, s) => {
          t.zoom.enabled &&
            (function () {
              const e = t.zoom;
              if (!m.imageEl) return;
              if (!h.isTouched || !h.isMoved)
                return ((h.isTouched = !1), void (h.isMoved = !1));
              ((h.isTouched = !1), (h.isMoved = !1));
              let s = 300,
                a = 300;
              const i = g.x * s,
                r = h.currentX + i,
                n = g.y * a,
                l = h.currentY + n;
              (0 !== g.x && (s = Math.abs((r - h.currentX) / g.x)),
                0 !== g.y && (a = Math.abs((l - h.currentY) / g.y)));
              const o = Math.max(s, a);
              ((h.currentX = r), (h.currentY = l));
              const d = h.width * e.scale,
                c = h.height * e.scale;
              ((h.minX = Math.min(m.slideWidth / 2 - d / 2, 0)),
                (h.maxX = -h.minX),
                (h.minY = Math.min(m.slideHeight / 2 - c / 2, 0)),
                (h.maxY = -h.minY),
                (h.currentX = Math.max(Math.min(h.currentX, h.maxX), h.minX)),
                (h.currentY = Math.max(Math.min(h.currentY, h.maxY), h.minY)),
                (m.imageWrapEl.style.transitionDuration = `${o}ms`),
                (m.imageWrapEl.style.transform = `translate3d(${h.currentX}px, ${h.currentY}px,0)`));
            })();
        }),
        a("doubleTap", (e, s) => {
          !t.animating &&
            t.params.zoom.enabled &&
            t.zoom.enabled &&
            t.params.zoom.toggle &&
            $(s);
        }),
        a("transitionEnd", () => {
          t.zoom.enabled && t.params.zoom.enabled && I();
        }),
        a("slideChange", () => {
          t.zoom.enabled && t.params.zoom.enabled && t.params.cssMode && I();
        }),
        Object.assign(t.zoom, {
          enable: O,
          disable: D,
          in: z,
          out: A,
          toggle: $,
        }));
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a } = e;
      function i(e, t) {
        const s = (function () {
          let e, t, s;
          return (a, i) => {
            for (t = -1, e = a.length; e - t > 1; )
              ((s = (e + t) >> 1), a[s] <= i ? (t = s) : (e = s));
            return e;
          };
        })();
        let a, i;
        return (
          (this.x = e),
          (this.y = t),
          (this.lastIndex = e.length - 1),
          (this.interpolate = function (e) {
            return e
              ? ((i = s(this.x, e)),
                (a = i - 1),
                ((e - this.x[a]) * (this.y[i] - this.y[a])) /
                  (this.x[i] - this.x[a]) +
                  this.y[a])
              : 0;
          }),
          this
        );
      }
      function r() {
        t.controller.control &&
          t.controller.spline &&
          ((t.controller.spline = void 0), delete t.controller.spline);
      }
      (s({ controller: { control: void 0, inverse: !1, by: "slide" } }),
        (t.controller = { control: void 0 }),
        a("beforeInit", () => {
          if (
            "undefined" != typeof window &&
            ("string" == typeof t.params.controller.control ||
              t.params.controller.control instanceof HTMLElement)
          ) {
            ("string" == typeof t.params.controller.control
              ? [...document.querySelectorAll(t.params.controller.control)]
              : [t.params.controller.control]
            ).forEach((e) => {
              if (
                (t.controller.control || (t.controller.control = []),
                e && e.swiper)
              )
                t.controller.control.push(e.swiper);
              else if (e) {
                const s = `${t.params.eventsPrefix}init`,
                  a = (i) => {
                    (t.controller.control.push(i.detail[0]),
                      t.update(),
                      e.removeEventListener(s, a));
                  };
                e.addEventListener(s, a);
              }
            });
          } else t.controller.control = t.params.controller.control;
        }),
        a("update", () => {
          r();
        }),
        a("resize", () => {
          r();
        }),
        a("observerUpdate", () => {
          r();
        }),
        a("setTranslate", (e, s, a) => {
          t.controller.control &&
            !t.controller.control.destroyed &&
            t.controller.setTranslate(s, a);
        }),
        a("setTransition", (e, s, a) => {
          t.controller.control &&
            !t.controller.control.destroyed &&
            t.controller.setTransition(s, a);
        }),
        Object.assign(t.controller, {
          setTranslate: function (e, s) {
            const a = t.controller.control;
            let r, n;
            const l = t.constructor;
            function o(e) {
              if (e.destroyed) return;
              const s = t.rtlTranslate ? -t.translate : t.translate;
              ("slide" === t.params.controller.by &&
                (!(function (e) {
                  t.controller.spline = t.params.loop
                    ? new i(t.slidesGrid, e.slidesGrid)
                    : new i(t.snapGrid, e.snapGrid);
                })(e),
                (n = -t.controller.spline.interpolate(-s))),
                (n && "container" !== t.params.controller.by) ||
                  ((r =
                    (e.maxTranslate() - e.minTranslate()) /
                    (t.maxTranslate() - t.minTranslate())),
                  (!Number.isNaN(r) && Number.isFinite(r)) || (r = 1),
                  (n = (s - t.minTranslate()) * r + e.minTranslate())),
                t.params.controller.inverse && (n = e.maxTranslate() - n),
                e.updateProgress(n),
                e.setTranslate(n, t),
                e.updateActiveIndex(),
                e.updateSlidesClasses());
            }
            if (Array.isArray(a))
              for (let e = 0; e < a.length; e += 1)
                a[e] !== s && a[e] instanceof l && o(a[e]);
            else a instanceof l && s !== a && o(a);
          },
          setTransition: function (e, s) {
            const a = t.constructor,
              i = t.controller.control;
            let r;
            function n(s) {
              s.destroyed ||
                (s.setTransition(e, t),
                0 !== e &&
                  (s.transitionStart(),
                  s.params.autoHeight &&
                    l(() => {
                      s.updateAutoHeight();
                    }),
                  x(s.wrapperEl, () => {
                    i && s.transitionEnd();
                  })));
            }
            if (Array.isArray(i))
              for (r = 0; r < i.length; r += 1)
                i[r] !== s && i[r] instanceof a && n(i[r]);
            else i instanceof a && s !== i && n(i);
          },
        }));
    },
    function (e) {
      let { swiper: t, extendParams: s, on: i } = e;
      (s({
        a11y: {
          enabled: !0,
          notificationClass: "swiper-notification",
          prevSlideMessage: "Previous slide",
          nextSlideMessage: "Next slide",
          firstSlideMessage: "This is the first slide",
          lastSlideMessage: "This is the last slide",
          paginationBulletMessage: "Go to slide {{index}}",
          slideLabelMessage: "{{index}} / {{slidesLength}}",
          containerMessage: null,
          containerRoleDescriptionMessage: null,
          containerRole: null,
          itemRoleDescriptionMessage: null,
          slideRole: "group",
          id: null,
          scrollOnFocus: !0,
        },
      }),
        (t.a11y = { clicked: !1 }));
      let r,
        n,
        l = null,
        o = new Date().getTime();
      function d(e) {
        const t = l;
        0 !== t.length && ((t.innerHTML = ""), (t.innerHTML = e));
      }
      function c(e) {
        (e = T(e)).forEach((e) => {
          e.setAttribute("tabIndex", "0");
        });
      }
      function p(e) {
        (e = T(e)).forEach((e) => {
          e.setAttribute("tabIndex", "-1");
        });
      }
      function u(e, t) {
        (e = T(e)).forEach((e) => {
          e.setAttribute("role", t);
        });
      }
      function m(e, t) {
        (e = T(e)).forEach((e) => {
          e.setAttribute("aria-roledescription", t);
        });
      }
      function h(e, t) {
        (e = T(e)).forEach((e) => {
          e.setAttribute("aria-label", t);
        });
      }
      function f(e) {
        (e = T(e)).forEach((e) => {
          e.setAttribute("aria-disabled", !0);
        });
      }
      function g(e) {
        (e = T(e)).forEach((e) => {
          e.setAttribute("aria-disabled", !1);
        });
      }
      function w(e) {
        if (13 !== e.keyCode && 32 !== e.keyCode) return;
        const s = t.params.a11y,
          a = e.target;
        if (
          !t.pagination ||
          !t.pagination.el ||
          (a !== t.pagination.el && !t.pagination.el.contains(e.target)) ||
          e.target.matches(ne(t.params.pagination.bulletClass))
        ) {
          if (t.navigation && t.navigation.prevEl && t.navigation.nextEl) {
            const e = T(t.navigation.prevEl);
            (T(t.navigation.nextEl).includes(a) &&
              ((t.isEnd && !t.params.loop) || t.slideNext(),
              t.isEnd ? d(s.lastSlideMessage) : d(s.nextSlideMessage)),
              e.includes(a) &&
                ((t.isBeginning && !t.params.loop) || t.slidePrev(),
                t.isBeginning
                  ? d(s.firstSlideMessage)
                  : d(s.prevSlideMessage)));
          }
          t.pagination &&
            a.matches(ne(t.params.pagination.bulletClass)) &&
            a.click();
        }
      }
      function b() {
        return (
          t.pagination && t.pagination.bullets && t.pagination.bullets.length
        );
      }
      function E() {
        return b() && t.params.pagination.clickable;
      }
      const x = (e, t, s) => {
          (c(e),
            "BUTTON" !== e.tagName &&
              (u(e, "button"), e.addEventListener("keydown", w)),
            h(e, s),
            (function (e, t) {
              (e = T(e)).forEach((e) => {
                e.setAttribute("aria-controls", t);
              });
            })(e, t));
        },
        S = (e) => {
          (n && n !== e.target && !n.contains(e.target) && (r = !0),
            (t.a11y.clicked = !0));
        },
        M = () => {
          ((r = !1),
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                t.destroyed || (t.a11y.clicked = !1);
              });
            }));
        },
        C = (e) => {
          o = new Date().getTime();
        },
        P = (e) => {
          if (t.a11y.clicked || !t.params.a11y.scrollOnFocus) return;
          if (new Date().getTime() - o < 100) return;
          const s = e.target.closest(`.${t.params.slideClass}, swiper-slide`);
          if (!s || !t.slides.includes(s)) return;
          n = s;
          const a = t.slides.indexOf(s) === t.activeIndex,
            i =
              t.params.watchSlidesProgress &&
              t.visibleSlides &&
              t.visibleSlides.includes(s);
          a ||
            i ||
            (e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents) ||
            (t.isHorizontal() ? (t.el.scrollLeft = 0) : (t.el.scrollTop = 0),
            requestAnimationFrame(() => {
              r ||
                (t.params.loop
                  ? t.slideToLoop(
                      parseInt(s.getAttribute("data-swiper-slide-index")),
                      0,
                    )
                  : t.slideTo(t.slides.indexOf(s), 0),
                (r = !1));
            }));
        },
        L = () => {
          const e = t.params.a11y;
          (e.itemRoleDescriptionMessage &&
            m(t.slides, e.itemRoleDescriptionMessage),
            e.slideRole && u(t.slides, e.slideRole));
          const s = t.slides.length;
          e.slideLabelMessage &&
            t.slides.forEach((a, i) => {
              const r = t.params.loop
                ? parseInt(a.getAttribute("data-swiper-slide-index"), 10)
                : i;
              h(
                a,
                e.slideLabelMessage
                  .replace(/\{\{index\}\}/, r + 1)
                  .replace(/\{\{slidesLength\}\}/, s),
              );
            });
        },
        I = () => {
          const e = t.params.a11y;
          t.el.append(l);
          const s = t.el;
          (e.containerRoleDescriptionMessage &&
            m(s, e.containerRoleDescriptionMessage),
            e.containerMessage && h(s, e.containerMessage),
            e.containerRole && u(s, e.containerRole));
          const i = t.wrapperEl,
            r =
              e.id ||
              i.getAttribute("id") ||
              `swiper-wrapper-${((n = 16), void 0 === n && (n = 16), "x".repeat(n).replace(/x/g, () => Math.round(16 * Math.random()).toString(16)))}`;
          var n;
          const o =
            t.params.autoplay && t.params.autoplay.enabled ? "off" : "polite";
          var d;
          ((d = r),
            T(i).forEach((e) => {
              e.setAttribute("id", d);
            }),
            (function (e, t) {
              (e = T(e)).forEach((e) => {
                e.setAttribute("aria-live", t);
              });
            })(i, o),
            L());
          let { nextEl: c, prevEl: p } = t.navigation ? t.navigation : {};
          if (
            ((c = T(c)),
            (p = T(p)),
            c && c.forEach((t) => x(t, r, e.nextSlideMessage)),
            p && p.forEach((t) => x(t, r, e.prevSlideMessage)),
            E())
          ) {
            T(t.pagination.el).forEach((e) => {
              e.addEventListener("keydown", w);
            });
          }
          (a().addEventListener("visibilitychange", C),
            t.el.addEventListener("focus", P, !0),
            t.el.addEventListener("focus", P, !0),
            t.el.addEventListener("pointerdown", S, !0),
            t.el.addEventListener("pointerup", M, !0));
        };
      (i("beforeInit", () => {
        ((l = v("span", t.params.a11y.notificationClass)),
          l.setAttribute("aria-live", "assertive"),
          l.setAttribute("aria-atomic", "true"));
      }),
        i("afterInit", () => {
          t.params.a11y.enabled && I();
        }),
        i(
          "slidesLengthChange snapGridLengthChange slidesGridLengthChange",
          () => {
            t.params.a11y.enabled && L();
          },
        ),
        i("fromEdge toEdge afterInit lock unlock", () => {
          t.params.a11y.enabled &&
            (function () {
              if (t.params.loop || t.params.rewind || !t.navigation) return;
              const { nextEl: e, prevEl: s } = t.navigation;
              (s && (t.isBeginning ? (f(s), p(s)) : (g(s), c(s))),
                e && (t.isEnd ? (f(e), p(e)) : (g(e), c(e))));
            })();
        }),
        i("paginationUpdate", () => {
          t.params.a11y.enabled &&
            (function () {
              const e = t.params.a11y;
              b() &&
                t.pagination.bullets.forEach((s) => {
                  (t.params.pagination.clickable &&
                    (c(s),
                    t.params.pagination.renderBullet ||
                      (u(s, "button"),
                      h(
                        s,
                        e.paginationBulletMessage.replace(
                          /\{\{index\}\}/,
                          y(s) + 1,
                        ),
                      ))),
                    s.matches(ne(t.params.pagination.bulletActiveClass))
                      ? s.setAttribute("aria-current", "true")
                      : s.removeAttribute("aria-current"));
                });
            })();
        }),
        i("destroy", () => {
          t.params.a11y.enabled &&
            (function () {
              l && l.remove();
              let { nextEl: e, prevEl: s } = t.navigation ? t.navigation : {};
              ((e = T(e)),
                (s = T(s)),
                e && e.forEach((e) => e.removeEventListener("keydown", w)),
                s && s.forEach((e) => e.removeEventListener("keydown", w)),
                E() &&
                  T(t.pagination.el).forEach((e) => {
                    e.removeEventListener("keydown", w);
                  }));
              (a().removeEventListener("visibilitychange", C),
                t.el &&
                  "string" != typeof t.el &&
                  (t.el.removeEventListener("focus", P, !0),
                  t.el.removeEventListener("pointerdown", S, !0),
                  t.el.removeEventListener("pointerup", M, !0)));
            })();
        }));
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a } = e;
      s({
        history: {
          enabled: !1,
          root: "",
          replaceState: !1,
          key: "slides",
          keepQuery: !1,
        },
      });
      let i = !1,
        n = {};
      const l = (e) =>
          e
            .toString()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "")
            .replace(/--+/g, "-")
            .replace(/^-+/, "")
            .replace(/-+$/, ""),
        o = (e) => {
          const t = r();
          let s;
          s = e ? new URL(e) : t.location;
          const a = s.pathname
              .slice(1)
              .split("/")
              .filter((e) => "" !== e),
            i = a.length;
          return { key: a[i - 2], value: a[i - 1] };
        },
        d = (e, s) => {
          const a = r();
          if (!i || !t.params.history.enabled) return;
          let n;
          n = t.params.url ? new URL(t.params.url) : a.location;
          const o =
            t.virtual && t.params.virtual.enabled
              ? t.slidesEl.querySelector(`[data-swiper-slide-index="${s}"]`)
              : t.slides[s];
          let d = l(o.getAttribute("data-history"));
          if (t.params.history.root.length > 0) {
            let s = t.params.history.root;
            ("/" === s[s.length - 1] && (s = s.slice(0, s.length - 1)),
              (d = `${s}/${e ? `${e}/` : ""}${d}`));
          } else n.pathname.includes(e) || (d = `${e ? `${e}/` : ""}${d}`);
          t.params.history.keepQuery && (d += n.search);
          const c = a.history.state;
          (c && c.value === d) ||
            (t.params.history.replaceState
              ? a.history.replaceState({ value: d }, null, d)
              : a.history.pushState({ value: d }, null, d));
        },
        c = (e, s, a) => {
          if (s)
            for (let i = 0, r = t.slides.length; i < r; i += 1) {
              const r = t.slides[i];
              if (l(r.getAttribute("data-history")) === s) {
                const s = t.getSlideIndex(r);
                t.slideTo(s, e, a);
              }
            }
          else t.slideTo(0, e, a);
        },
        p = () => {
          ((n = o(t.params.url)), c(t.params.speed, n.value, !1));
        };
      (a("init", () => {
        t.params.history.enabled &&
          (() => {
            const e = r();
            if (t.params.history) {
              if (!e.history || !e.history.pushState)
                return (
                  (t.params.history.enabled = !1),
                  void (t.params.hashNavigation.enabled = !0)
                );
              ((i = !0),
                (n = o(t.params.url)),
                n.key || n.value
                  ? (c(0, n.value, t.params.runCallbacksOnInit),
                    t.params.history.replaceState ||
                      e.addEventListener("popstate", p))
                  : t.params.history.replaceState ||
                    e.addEventListener("popstate", p));
            }
          })();
      }),
        a("destroy", () => {
          t.params.history.enabled &&
            (() => {
              const e = r();
              t.params.history.replaceState ||
                e.removeEventListener("popstate", p);
            })();
        }),
        a("transitionEnd _freeModeNoMomentumRelease", () => {
          i && d(t.params.history.key, t.activeIndex);
        }),
        a("slideChange", () => {
          i && t.params.cssMode && d(t.params.history.key, t.activeIndex);
        }));
    },
    function (e) {
      let { swiper: t, extendParams: s, emit: i, on: n } = e,
        l = !1;
      const o = a(),
        d = r();
      s({
        hashNavigation: {
          enabled: !1,
          replaceState: !1,
          watchState: !1,
          getSlideIndex(e, s) {
            if (t.virtual && t.params.virtual.enabled) {
              const e = t.slides.filter(
                (e) => e.getAttribute("data-hash") === s,
              )[0];
              if (!e) return 0;
              return parseInt(e.getAttribute("data-swiper-slide-index"), 10);
            }
            return t.getSlideIndex(
              f(
                t.slidesEl,
                `.${t.params.slideClass}[data-hash="${s}"], swiper-slide[data-hash="${s}"]`,
              )[0],
            );
          },
        },
      });
      const c = () => {
          i("hashChange");
          const e = o.location.hash.replace("#", ""),
            s =
              t.virtual && t.params.virtual.enabled
                ? t.slidesEl.querySelector(
                    `[data-swiper-slide-index="${t.activeIndex}"]`,
                  )
                : t.slides[t.activeIndex];
          if (e !== (s ? s.getAttribute("data-hash") : "")) {
            const s = t.params.hashNavigation.getSlideIndex(t, e);
            if (void 0 === s || Number.isNaN(s)) return;
            t.slideTo(s);
          }
        },
        p = () => {
          if (!l || !t.params.hashNavigation.enabled) return;
          const e =
              t.virtual && t.params.virtual.enabled
                ? t.slidesEl.querySelector(
                    `[data-swiper-slide-index="${t.activeIndex}"]`,
                  )
                : t.slides[t.activeIndex],
            s = e
              ? e.getAttribute("data-hash") || e.getAttribute("data-history")
              : "";
          t.params.hashNavigation.replaceState &&
          d.history &&
          d.history.replaceState
            ? (d.history.replaceState(null, null, `#${s}` || ""), i("hashSet"))
            : ((o.location.hash = s || ""), i("hashSet"));
        };
      (n("init", () => {
        t.params.hashNavigation.enabled &&
          (() => {
            if (
              !t.params.hashNavigation.enabled ||
              (t.params.history && t.params.history.enabled)
            )
              return;
            l = !0;
            const e = o.location.hash.replace("#", "");
            if (e) {
              const s = 0,
                a = t.params.hashNavigation.getSlideIndex(t, e);
              t.slideTo(a || 0, s, t.params.runCallbacksOnInit, !0);
            }
            t.params.hashNavigation.watchState &&
              d.addEventListener("hashchange", c);
          })();
      }),
        n("destroy", () => {
          t.params.hashNavigation.enabled &&
            t.params.hashNavigation.watchState &&
            d.removeEventListener("hashchange", c);
        }),
        n("transitionEnd _freeModeNoMomentumRelease", () => {
          l && p();
        }),
        n("slideChange", () => {
          l && t.params.cssMode && p();
        }));
    },
    function (e) {
      let t,
        s,
        { swiper: i, extendParams: r, on: n, emit: l, params: o } = e;
      ((i.autoplay = { running: !1, paused: !1, timeLeft: 0 }),
        r({
          autoplay: {
            enabled: !1,
            delay: 3e3,
            waitForTransition: !0,
            disableOnInteraction: !1,
            stopOnLastSlide: !1,
            reverseDirection: !1,
            pauseOnMouseEnter: !1,
          },
        }));
      let d,
        c,
        p,
        u,
        m,
        h,
        f,
        g,
        v = o && o.autoplay ? o.autoplay.delay : 3e3,
        w = o && o.autoplay ? o.autoplay.delay : 3e3,
        b = new Date().getTime();
      function y(e) {
        i &&
          !i.destroyed &&
          i.wrapperEl &&
          e.target === i.wrapperEl &&
          (i.wrapperEl.removeEventListener("transitionend", y),
          g || (e.detail && e.detail.bySwiperTouchMove) || C());
      }
      const E = () => {
          if (i.destroyed || !i.autoplay.running) return;
          i.autoplay.paused ? (c = !0) : c && ((w = d), (c = !1));
          const e = i.autoplay.paused ? d : b + w - new Date().getTime();
          ((i.autoplay.timeLeft = e),
            l("autoplayTimeLeft", e, e / v),
            (s = requestAnimationFrame(() => {
              E();
            })));
        },
        x = (e) => {
          if (i.destroyed || !i.autoplay.running) return;
          (cancelAnimationFrame(s), E());
          let a = void 0 === e ? i.params.autoplay.delay : e;
          ((v = i.params.autoplay.delay), (w = i.params.autoplay.delay));
          const r = (() => {
            let e;
            if (
              ((e =
                i.virtual && i.params.virtual.enabled
                  ? i.slides.filter((e) =>
                      e.classList.contains("swiper-slide-active"),
                    )[0]
                  : i.slides[i.activeIndex]),
              !e)
            )
              return;
            return parseInt(e.getAttribute("data-swiper-autoplay"), 10);
          })();
          (!Number.isNaN(r) &&
            r > 0 &&
            void 0 === e &&
            ((a = r), (v = r), (w = r)),
            (d = a));
          const n = i.params.speed,
            o = () => {
              i &&
                !i.destroyed &&
                (i.params.autoplay.reverseDirection
                  ? !i.isBeginning || i.params.loop || i.params.rewind
                    ? (i.slidePrev(n, !0, !0), l("autoplay"))
                    : i.params.autoplay.stopOnLastSlide ||
                      (i.slideTo(i.slides.length - 1, n, !0, !0), l("autoplay"))
                  : !i.isEnd || i.params.loop || i.params.rewind
                    ? (i.slideNext(n, !0, !0), l("autoplay"))
                    : i.params.autoplay.stopOnLastSlide ||
                      (i.slideTo(0, n, !0, !0), l("autoplay")),
                i.params.cssMode &&
                  ((b = new Date().getTime()),
                  requestAnimationFrame(() => {
                    x();
                  })));
            };
          return (
            a > 0
              ? (clearTimeout(t),
                (t = setTimeout(() => {
                  o();
                }, a)))
              : requestAnimationFrame(() => {
                  o();
                }),
            a
          );
        },
        S = () => {
          ((b = new Date().getTime()),
            (i.autoplay.running = !0),
            x(),
            l("autoplayStart"));
        },
        T = () => {
          ((i.autoplay.running = !1),
            clearTimeout(t),
            cancelAnimationFrame(s),
            l("autoplayStop"));
        },
        M = (e, s) => {
          if (i.destroyed || !i.autoplay.running) return;
          (clearTimeout(t), e || (f = !0));
          const a = () => {
            (l("autoplayPause"),
              i.params.autoplay.waitForTransition
                ? i.wrapperEl.addEventListener("transitionend", y)
                : C());
          };
          if (((i.autoplay.paused = !0), s))
            return (h && (d = i.params.autoplay.delay), (h = !1), void a());
          const r = d || i.params.autoplay.delay;
          ((d = r - (new Date().getTime() - b)),
            (i.isEnd && d < 0 && !i.params.loop) || (d < 0 && (d = 0), a()));
        },
        C = () => {
          (i.isEnd && d < 0 && !i.params.loop) ||
            i.destroyed ||
            !i.autoplay.running ||
            ((b = new Date().getTime()),
            f ? ((f = !1), x(d)) : x(),
            (i.autoplay.paused = !1),
            l("autoplayResume"));
        },
        P = () => {
          if (i.destroyed || !i.autoplay.running) return;
          const e = a();
          ("hidden" === e.visibilityState && ((f = !0), M(!0)),
            "visible" === e.visibilityState && C());
        },
        L = (e) => {
          "mouse" === e.pointerType &&
            ((f = !0), (g = !0), i.animating || i.autoplay.paused || M(!0));
        },
        I = (e) => {
          "mouse" === e.pointerType && ((g = !1), i.autoplay.paused && C());
        };
      (n("init", () => {
        i.params.autoplay.enabled &&
          (i.params.autoplay.pauseOnMouseEnter &&
            (i.el.addEventListener("pointerenter", L),
            i.el.addEventListener("pointerleave", I)),
          a().addEventListener("visibilitychange", P),
          S());
      }),
        n("destroy", () => {
          (i.el &&
            "string" != typeof i.el &&
            (i.el.removeEventListener("pointerenter", L),
            i.el.removeEventListener("pointerleave", I)),
            a().removeEventListener("visibilitychange", P),
            i.autoplay.running && T());
        }),
        n("_freeModeStaticRelease", () => {
          (u || f) && C();
        }),
        n("_freeModeNoMomentumRelease", () => {
          i.params.autoplay.disableOnInteraction ? T() : M(!0, !0);
        }),
        n("beforeTransitionStart", (e, t, s) => {
          !i.destroyed &&
            i.autoplay.running &&
            (s || !i.params.autoplay.disableOnInteraction ? M(!0, !0) : T());
        }),
        n("sliderFirstMove", () => {
          !i.destroyed &&
            i.autoplay.running &&
            (i.params.autoplay.disableOnInteraction
              ? T()
              : ((p = !0),
                (u = !1),
                (f = !1),
                (m = setTimeout(() => {
                  ((f = !0), (u = !0), M(!0));
                }, 200))));
        }),
        n("touchEnd", () => {
          if (!i.destroyed && i.autoplay.running && p) {
            if (
              (clearTimeout(m),
              clearTimeout(t),
              i.params.autoplay.disableOnInteraction)
            )
              return ((u = !1), void (p = !1));
            (u && i.params.cssMode && C(), (u = !1), (p = !1));
          }
        }),
        n("slideChange", () => {
          !i.destroyed && i.autoplay.running && (h = !0);
        }),
        Object.assign(i.autoplay, { start: S, stop: T, pause: M, resume: C }));
    },
    function (e) {
      let { swiper: t, extendParams: s, on: i } = e;
      s({
        thumbs: {
          swiper: null,
          multipleActiveThumbs: !0,
          autoScrollOffset: 0,
          slideThumbActiveClass: "swiper-slide-thumb-active",
          thumbsContainerClass: "swiper-thumbs",
        },
      });
      let r = !1,
        n = !1;
      function l() {
        const e = t.thumbs.swiper;
        if (!e || e.destroyed) return;
        const s = e.clickedIndex,
          a = e.clickedSlide;
        if (a && a.classList.contains(t.params.thumbs.slideThumbActiveClass))
          return;
        if (null == s) return;
        let i;
        ((i = e.params.loop
          ? parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10)
          : s),
          t.params.loop ? t.slideToLoop(i) : t.slideTo(i));
      }
      function o() {
        const { thumbs: e } = t.params;
        if (r) return !1;
        r = !0;
        const s = t.constructor;
        if (e.swiper instanceof s)
          ((t.thumbs.swiper = e.swiper),
            Object.assign(t.thumbs.swiper.originalParams, {
              watchSlidesProgress: !0,
              slideToClickedSlide: !1,
            }),
            Object.assign(t.thumbs.swiper.params, {
              watchSlidesProgress: !0,
              slideToClickedSlide: !1,
            }),
            t.thumbs.swiper.update());
        else if (c(e.swiper)) {
          const a = Object.assign({}, e.swiper);
          (Object.assign(a, {
            watchSlidesProgress: !0,
            slideToClickedSlide: !1,
          }),
            (t.thumbs.swiper = new s(a)),
            (n = !0));
        }
        return (
          t.thumbs.swiper.el.classList.add(
            t.params.thumbs.thumbsContainerClass,
          ),
          t.thumbs.swiper.on("tap", l),
          !0
        );
      }
      function d(e) {
        const s = t.thumbs.swiper;
        if (!s || s.destroyed) return;
        const a =
          "auto" === s.params.slidesPerView
            ? s.slidesPerViewDynamic()
            : s.params.slidesPerView;
        let i = 1;
        const r = t.params.thumbs.slideThumbActiveClass;
        if (
          (t.params.slidesPerView > 1 &&
            !t.params.centeredSlides &&
            (i = t.params.slidesPerView),
          t.params.thumbs.multipleActiveThumbs || (i = 1),
          (i = Math.floor(i)),
          s.slides.forEach((e) => e.classList.remove(r)),
          s.params.loop || (s.params.virtual && s.params.virtual.enabled))
        )
          for (let e = 0; e < i; e += 1)
            f(
              s.slidesEl,
              `[data-swiper-slide-index="${t.realIndex + e}"]`,
            ).forEach((e) => {
              e.classList.add(r);
            });
        else
          for (let e = 0; e < i; e += 1)
            s.slides[t.realIndex + e] &&
              s.slides[t.realIndex + e].classList.add(r);
        const n = t.params.thumbs.autoScrollOffset,
          l = n && !s.params.loop;
        if (t.realIndex !== s.realIndex || l) {
          const i = s.activeIndex;
          let r, o;
          if (s.params.loop) {
            const e = s.slides.filter(
              (e) =>
                e.getAttribute("data-swiper-slide-index") === `${t.realIndex}`,
            )[0];
            ((r = s.slides.indexOf(e)),
              (o = t.activeIndex > t.previousIndex ? "next" : "prev"));
          } else
            ((r = t.realIndex), (o = r > t.previousIndex ? "next" : "prev"));
          (l && (r += "next" === o ? n : -1 * n),
            s.visibleSlidesIndexes &&
              s.visibleSlidesIndexes.indexOf(r) < 0 &&
              (s.params.centeredSlides
                ? (r =
                    r > i
                      ? r - Math.floor(a / 2) + 1
                      : r + Math.floor(a / 2) - 1)
                : r > i && s.params.slidesPerGroup,
              s.slideTo(r, e ? 0 : void 0)));
        }
      }
      ((t.thumbs = { swiper: null }),
        i("beforeInit", () => {
          const { thumbs: e } = t.params;
          if (e && e.swiper)
            if (
              "string" == typeof e.swiper ||
              e.swiper instanceof HTMLElement
            ) {
              const s = a(),
                i = () => {
                  const a =
                    "string" == typeof e.swiper
                      ? s.querySelector(e.swiper)
                      : e.swiper;
                  if (a && a.swiper) ((e.swiper = a.swiper), o(), d(!0));
                  else if (a) {
                    const s = `${t.params.eventsPrefix}init`,
                      i = (r) => {
                        ((e.swiper = r.detail[0]),
                          a.removeEventListener(s, i),
                          o(),
                          d(!0),
                          e.swiper.update(),
                          t.update());
                      };
                    a.addEventListener(s, i);
                  }
                  return a;
                },
                r = () => {
                  if (t.destroyed) return;
                  i() || requestAnimationFrame(r);
                };
              requestAnimationFrame(r);
            } else (o(), d(!0));
        }),
        i("slideChange update resize observerUpdate", () => {
          d();
        }),
        i("setTransition", (e, s) => {
          const a = t.thumbs.swiper;
          a && !a.destroyed && a.setTransition(s);
        }),
        i("beforeDestroy", () => {
          const e = t.thumbs.swiper;
          e && !e.destroyed && n && e.destroy();
        }),
        Object.assign(t.thumbs, { init: o, update: d }));
    },
    function (e) {
      let { swiper: t, extendParams: s, emit: a, once: i } = e;
      (s({
        freeMode: {
          enabled: !1,
          momentum: !0,
          momentumRatio: 1,
          momentumBounce: !0,
          momentumBounceRatio: 1,
          momentumVelocityRatio: 1,
          sticky: !1,
          minimumVelocity: 0.02,
        },
      }),
        Object.assign(t, {
          freeMode: {
            onTouchStart: function () {
              if (t.params.cssMode) return;
              const e = t.getTranslate();
              (t.setTranslate(e),
                t.setTransition(0),
                (t.touchEventsData.velocities.length = 0),
                t.freeMode.onTouchEnd({
                  currentPos: t.rtl ? t.translate : -t.translate,
                }));
            },
            onTouchMove: function () {
              if (t.params.cssMode) return;
              const { touchEventsData: e, touches: s } = t;
              (0 === e.velocities.length &&
                e.velocities.push({
                  position: s[t.isHorizontal() ? "startX" : "startY"],
                  time: e.touchStartTime,
                }),
                e.velocities.push({
                  position: s[t.isHorizontal() ? "currentX" : "currentY"],
                  time: o(),
                }));
            },
            onTouchEnd: function (e) {
              let { currentPos: s } = e;
              if (t.params.cssMode) return;
              const {
                  params: r,
                  wrapperEl: n,
                  rtlTranslate: l,
                  snapGrid: d,
                  touchEventsData: c,
                } = t,
                p = o() - c.touchStartTime;
              if (s < -t.minTranslate()) t.slideTo(t.activeIndex);
              else if (s > -t.maxTranslate())
                t.slides.length < d.length
                  ? t.slideTo(d.length - 1)
                  : t.slideTo(t.slides.length - 1);
              else {
                if (r.freeMode.momentum) {
                  if (c.velocities.length > 1) {
                    const e = c.velocities.pop(),
                      s = c.velocities.pop(),
                      a = e.position - s.position,
                      i = e.time - s.time;
                    ((t.velocity = a / i),
                      (t.velocity /= 2),
                      Math.abs(t.velocity) < r.freeMode.minimumVelocity &&
                        (t.velocity = 0),
                      (i > 150 || o() - e.time > 300) && (t.velocity = 0));
                  } else t.velocity = 0;
                  ((t.velocity *= r.freeMode.momentumVelocityRatio),
                    (c.velocities.length = 0));
                  let e = 1e3 * r.freeMode.momentumRatio;
                  const s = t.velocity * e;
                  let p = t.translate + s;
                  l && (p = -p);
                  let u,
                    m = !1;
                  const h =
                    20 * Math.abs(t.velocity) * r.freeMode.momentumBounceRatio;
                  let f;
                  if (p < t.maxTranslate())
                    (r.freeMode.momentumBounce
                      ? (p + t.maxTranslate() < -h &&
                          (p = t.maxTranslate() - h),
                        (u = t.maxTranslate()),
                        (m = !0),
                        (c.allowMomentumBounce = !0))
                      : (p = t.maxTranslate()),
                      r.loop && r.centeredSlides && (f = !0));
                  else if (p > t.minTranslate())
                    (r.freeMode.momentumBounce
                      ? (p - t.minTranslate() > h && (p = t.minTranslate() + h),
                        (u = t.minTranslate()),
                        (m = !0),
                        (c.allowMomentumBounce = !0))
                      : (p = t.minTranslate()),
                      r.loop && r.centeredSlides && (f = !0));
                  else if (r.freeMode.sticky) {
                    let e;
                    for (let t = 0; t < d.length; t += 1)
                      if (d[t] > -p) {
                        e = t;
                        break;
                      }
                    ((p =
                      Math.abs(d[e] - p) < Math.abs(d[e - 1] - p) ||
                      "next" === t.swipeDirection
                        ? d[e]
                        : d[e - 1]),
                      (p = -p));
                  }
                  if (
                    (f &&
                      i("transitionEnd", () => {
                        t.loopFix();
                      }),
                    0 !== t.velocity)
                  ) {
                    if (
                      ((e = l
                        ? Math.abs((-p - t.translate) / t.velocity)
                        : Math.abs((p - t.translate) / t.velocity)),
                      r.freeMode.sticky)
                    ) {
                      const s = Math.abs((l ? -p : p) - t.translate),
                        a = t.slidesSizesGrid[t.activeIndex];
                      e =
                        s < a
                          ? r.speed
                          : s < 2 * a
                            ? 1.5 * r.speed
                            : 2.5 * r.speed;
                    }
                  } else if (r.freeMode.sticky) return void t.slideToClosest();
                  (r.freeMode.momentumBounce && m
                    ? (t.updateProgress(u),
                      t.setTransition(e),
                      t.setTranslate(p),
                      t.transitionStart(!0, t.swipeDirection),
                      (t.animating = !0),
                      x(n, () => {
                        t &&
                          !t.destroyed &&
                          c.allowMomentumBounce &&
                          (a("momentumBounce"),
                          t.setTransition(r.speed),
                          setTimeout(() => {
                            (t.setTranslate(u),
                              x(n, () => {
                                t && !t.destroyed && t.transitionEnd();
                              }));
                          }, 0));
                      }))
                    : t.velocity
                      ? (a("_freeModeNoMomentumRelease"),
                        t.updateProgress(p),
                        t.setTransition(e),
                        t.setTranslate(p),
                        t.transitionStart(!0, t.swipeDirection),
                        t.animating ||
                          ((t.animating = !0),
                          x(n, () => {
                            t && !t.destroyed && t.transitionEnd();
                          })))
                      : t.updateProgress(p),
                    t.updateActiveIndex(),
                    t.updateSlidesClasses());
                } else {
                  if (r.freeMode.sticky) return void t.slideToClosest();
                  r.freeMode && a("_freeModeNoMomentumRelease");
                }
                (!r.freeMode.momentum || p >= r.longSwipesMs) &&
                  (a("_freeModeStaticRelease"),
                  t.updateProgress(),
                  t.updateActiveIndex(),
                  t.updateSlidesClasses());
              }
            },
          },
        }));
    },
    function (e) {
      let t,
        s,
        a,
        i,
        { swiper: r, extendParams: n, on: l } = e;
      n({ grid: { rows: 1, fill: "column" } });
      const o = () => {
        let e = r.params.spaceBetween;
        return (
          "string" == typeof e && e.indexOf("%") >= 0
            ? (e = (parseFloat(e.replace("%", "")) / 100) * r.size)
            : "string" == typeof e && (e = parseFloat(e)),
          e
        );
      };
      (l("init", () => {
        i = r.params.grid && r.params.grid.rows > 1;
      }),
        l("update", () => {
          const { params: e, el: t } = r,
            s = e.grid && e.grid.rows > 1;
          (i && !s
            ? (t.classList.remove(
                `${e.containerModifierClass}grid`,
                `${e.containerModifierClass}grid-column`,
              ),
              (a = 1),
              r.emitContainerClasses())
            : !i &&
              s &&
              (t.classList.add(`${e.containerModifierClass}grid`),
              "column" === e.grid.fill &&
                t.classList.add(`${e.containerModifierClass}grid-column`),
              r.emitContainerClasses()),
            (i = s));
        }),
        (r.grid = {
          initSlides: (e) => {
            const { slidesPerView: i } = r.params,
              { rows: n, fill: l } = r.params.grid,
              o =
                r.virtual && r.params.virtual.enabled
                  ? r.virtual.slides.length
                  : e.length;
            ((a = Math.floor(o / n)),
              (t = Math.floor(o / n) === o / n ? o : Math.ceil(o / n) * n),
              "auto" !== i && "row" === l && (t = Math.max(t, i * n)),
              (s = t / n));
          },
          unsetSlides: () => {
            r.slides &&
              r.slides.forEach((e) => {
                e.swiperSlideGridSet &&
                  ((e.style.height = ""),
                  (e.style[r.getDirectionLabel("margin-top")] = ""));
              });
          },
          updateSlide: (e, i, n) => {
            const { slidesPerGroup: l } = r.params,
              d = o(),
              { rows: c, fill: p } = r.params.grid,
              u =
                r.virtual && r.params.virtual.enabled
                  ? r.virtual.slides.length
                  : n.length;
            let m, h, f;
            if ("row" === p && l > 1) {
              const s = Math.floor(e / (l * c)),
                a = e - c * l * s,
                r = 0 === s ? l : Math.min(Math.ceil((u - s * c * l) / c), l);
              ((f = Math.floor(a / r)),
                (h = a - f * r + s * l),
                (m = h + (f * t) / c),
                (i.style.order = m));
            } else
              "column" === p
                ? ((h = Math.floor(e / c)),
                  (f = e - h * c),
                  (h > a || (h === a && f === c - 1)) &&
                    ((f += 1), f >= c && ((f = 0), (h += 1))))
                : ((f = Math.floor(e / s)), (h = e - f * s));
            ((i.row = f),
              (i.column = h),
              (i.style.height = `calc((100% - ${(c - 1) * d}px) / ${c})`),
              (i.style[r.getDirectionLabel("margin-top")] =
                0 !== f ? d && `${d}px` : ""),
              (i.swiperSlideGridSet = !0));
          },
          updateWrapperSize: (e, s) => {
            const { centeredSlides: a, roundLengths: i } = r.params,
              n = o(),
              { rows: l } = r.params.grid;
            if (
              ((r.virtualSize = (e + n) * t),
              (r.virtualSize = Math.ceil(r.virtualSize / l) - n),
              r.params.cssMode ||
                (r.wrapperEl.style[r.getDirectionLabel("width")] =
                  `${r.virtualSize + n}px`),
              a)
            ) {
              const e = [];
              for (let t = 0; t < s.length; t += 1) {
                let a = s[t];
                (i && (a = Math.floor(a)),
                  s[t] < r.virtualSize + s[0] && e.push(a));
              }
              (s.splice(0, s.length), s.push(...e));
            }
          },
        }));
    },
    function (e) {
      let { swiper: t } = e;
      Object.assign(t, {
        appendSlide: le.bind(t),
        prependSlide: oe.bind(t),
        addSlide: de.bind(t),
        removeSlide: ce.bind(t),
        removeAllSlides: pe.bind(t),
      });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a } = e;
      (s({ fadeEffect: { crossFade: !1 } }),
        ue({
          effect: "fade",
          swiper: t,
          on: a,
          setTranslate: () => {
            const { slides: e } = t;
            t.params.fadeEffect;
            for (let s = 0; s < e.length; s += 1) {
              const e = t.slides[s];
              let a = -e.swiperSlideOffset;
              t.params.virtualTranslate || (a -= t.translate);
              let i = 0;
              t.isHorizontal() || ((i = a), (a = 0));
              const r = t.params.fadeEffect.crossFade
                  ? Math.max(1 - Math.abs(e.progress), 0)
                  : 1 + Math.min(Math.max(e.progress, -1), 0),
                n = me(0, e);
              ((n.style.opacity = r),
                (n.style.transform = `translate3d(${a}px, ${i}px, 0px)`));
            }
          },
          setTransition: (e) => {
            const s = t.slides.map((e) => h(e));
            (s.forEach((t) => {
              t.style.transitionDuration = `${e}ms`;
            }),
              he({
                swiper: t,
                duration: e,
                transformElements: s,
                allSlides: !0,
              }));
          },
          overwriteParams: () => ({
            slidesPerView: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: !0,
            spaceBetween: 0,
            virtualTranslate: !t.params.cssMode,
          }),
        }));
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a } = e;
      s({
        cubeEffect: {
          slideShadows: !0,
          shadow: !0,
          shadowOffset: 20,
          shadowScale: 0.94,
        },
      });
      const i = (e, t, s) => {
        let a = s
            ? e.querySelector(".swiper-slide-shadow-left")
            : e.querySelector(".swiper-slide-shadow-top"),
          i = s
            ? e.querySelector(".swiper-slide-shadow-right")
            : e.querySelector(".swiper-slide-shadow-bottom");
        (a ||
          ((a = v(
            "div",
            (
              "swiper-slide-shadow-cube swiper-slide-shadow-" +
              (s ? "left" : "top")
            ).split(" "),
          )),
          e.append(a)),
          i ||
            ((i = v(
              "div",
              (
                "swiper-slide-shadow-cube swiper-slide-shadow-" +
                (s ? "right" : "bottom")
              ).split(" "),
            )),
            e.append(i)),
          a && (a.style.opacity = Math.max(-t, 0)),
          i && (i.style.opacity = Math.max(t, 0)));
      };
      ue({
        effect: "cube",
        swiper: t,
        on: a,
        setTranslate: () => {
          const {
              el: e,
              wrapperEl: s,
              slides: a,
              width: r,
              height: n,
              rtlTranslate: l,
              size: o,
              browser: d,
            } = t,
            c = M(t),
            p = t.params.cubeEffect,
            u = t.isHorizontal(),
            m = t.virtual && t.params.virtual.enabled;
          let h,
            f = 0;
          p.shadow &&
            (u
              ? ((h = t.wrapperEl.querySelector(".swiper-cube-shadow")),
                h ||
                  ((h = v("div", "swiper-cube-shadow")), t.wrapperEl.append(h)),
                (h.style.height = `${r}px`))
              : ((h = e.querySelector(".swiper-cube-shadow")),
                h || ((h = v("div", "swiper-cube-shadow")), e.append(h))));
          for (let e = 0; e < a.length; e += 1) {
            const t = a[e];
            let s = e;
            m && (s = parseInt(t.getAttribute("data-swiper-slide-index"), 10));
            let r = 90 * s,
              n = Math.floor(r / 360);
            l && ((r = -r), (n = Math.floor(-r / 360)));
            const d = Math.max(Math.min(t.progress, 1), -1);
            let h = 0,
              g = 0,
              v = 0;
            (s % 4 == 0
              ? ((h = 4 * -n * o), (v = 0))
              : (s - 1) % 4 == 0
                ? ((h = 0), (v = 4 * -n * o))
                : (s - 2) % 4 == 0
                  ? ((h = o + 4 * n * o), (v = o))
                  : (s - 3) % 4 == 0 && ((h = -o), (v = 3 * o + 4 * o * n)),
              l && (h = -h),
              u || ((g = h), (h = 0)));
            const w = `rotateX(${c(u ? 0 : -r)}deg) rotateY(${c(u ? r : 0)}deg) translate3d(${h}px, ${g}px, ${v}px)`;
            (d <= 1 &&
              d > -1 &&
              ((f = 90 * s + 90 * d), l && (f = 90 * -s - 90 * d)),
              (t.style.transform = w),
              p.slideShadows && i(t, d, u));
          }
          if (
            ((s.style.transformOrigin = `50% 50% -${o / 2}px`),
            (s.style["-webkit-transform-origin"] = `50% 50% -${o / 2}px`),
            p.shadow)
          )
            if (u)
              h.style.transform = `translate3d(0px, ${r / 2 + p.shadowOffset}px, ${-r / 2}px) rotateX(89.99deg) rotateZ(0deg) scale(${p.shadowScale})`;
            else {
              const e = Math.abs(f) - 90 * Math.floor(Math.abs(f) / 90),
                t =
                  1.5 -
                  (Math.sin((2 * e * Math.PI) / 360) / 2 +
                    Math.cos((2 * e * Math.PI) / 360) / 2),
                s = p.shadowScale,
                a = p.shadowScale / t,
                i = p.shadowOffset;
              h.style.transform = `scale3d(${s}, 1, ${a}) translate3d(0px, ${n / 2 + i}px, ${-n / 2 / a}px) rotateX(-89.99deg)`;
            }
          const g =
            (d.isSafari || d.isWebView) && d.needPerspectiveFix ? -o / 2 : 0;
          ((s.style.transform = `translate3d(0px,0,${g}px) rotateX(${c(t.isHorizontal() ? 0 : f)}deg) rotateY(${c(t.isHorizontal() ? -f : 0)}deg)`),
            s.style.setProperty("--swiper-cube-translate-z", `${g}px`));
        },
        setTransition: (e) => {
          const { el: s, slides: a } = t;
          if (
            (a.forEach((t) => {
              ((t.style.transitionDuration = `${e}ms`),
                t
                  .querySelectorAll(
                    ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left",
                  )
                  .forEach((t) => {
                    t.style.transitionDuration = `${e}ms`;
                  }));
            }),
            t.params.cubeEffect.shadow && !t.isHorizontal())
          ) {
            const t = s.querySelector(".swiper-cube-shadow");
            t && (t.style.transitionDuration = `${e}ms`);
          }
        },
        recreateShadows: () => {
          const e = t.isHorizontal();
          t.slides.forEach((t) => {
            const s = Math.max(Math.min(t.progress, 1), -1);
            i(t, s, e);
          });
        },
        getEffectParams: () => t.params.cubeEffect,
        perspective: () => !0,
        overwriteParams: () => ({
          slidesPerView: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: !0,
          resistanceRatio: 0,
          spaceBetween: 0,
          centeredSlides: !1,
          virtualTranslate: !0,
        }),
      });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a } = e;
      s({ flipEffect: { slideShadows: !0, limitRotation: !0 } });
      const i = (e, s) => {
        let a = t.isHorizontal()
            ? e.querySelector(".swiper-slide-shadow-left")
            : e.querySelector(".swiper-slide-shadow-top"),
          i = t.isHorizontal()
            ? e.querySelector(".swiper-slide-shadow-right")
            : e.querySelector(".swiper-slide-shadow-bottom");
        (a || (a = fe("flip", e, t.isHorizontal() ? "left" : "top")),
          i || (i = fe("flip", e, t.isHorizontal() ? "right" : "bottom")),
          a && (a.style.opacity = Math.max(-s, 0)),
          i && (i.style.opacity = Math.max(s, 0)));
      };
      ue({
        effect: "flip",
        swiper: t,
        on: a,
        setTranslate: () => {
          const { slides: e, rtlTranslate: s } = t,
            a = t.params.flipEffect,
            r = M(t);
          for (let n = 0; n < e.length; n += 1) {
            const l = e[n];
            let o = l.progress;
            t.params.flipEffect.limitRotation &&
              (o = Math.max(Math.min(l.progress, 1), -1));
            const d = l.swiperSlideOffset;
            let c = -180 * o,
              p = 0,
              u = t.params.cssMode ? -d - t.translate : -d,
              m = 0;
            (t.isHorizontal()
              ? s && (c = -c)
              : ((m = u), (u = 0), (p = -c), (c = 0)),
              (l.style.zIndex = -Math.abs(Math.round(o)) + e.length),
              a.slideShadows && i(l, o));
            const h = `translate3d(${u}px, ${m}px, 0px) rotateX(${r(p)}deg) rotateY(${r(c)}deg)`;
            me(0, l).style.transform = h;
          }
        },
        setTransition: (e) => {
          const s = t.slides.map((e) => h(e));
          (s.forEach((t) => {
            ((t.style.transitionDuration = `${e}ms`),
              t
                .querySelectorAll(
                  ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left",
                )
                .forEach((t) => {
                  t.style.transitionDuration = `${e}ms`;
                }));
          }),
            he({ swiper: t, duration: e, transformElements: s }));
        },
        recreateShadows: () => {
          (t.params.flipEffect,
            t.slides.forEach((e) => {
              let s = e.progress;
              (t.params.flipEffect.limitRotation &&
                (s = Math.max(Math.min(e.progress, 1), -1)),
                i(e, s));
            }));
        },
        getEffectParams: () => t.params.flipEffect,
        perspective: () => !0,
        overwriteParams: () => ({
          slidesPerView: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: !0,
          spaceBetween: 0,
          virtualTranslate: !t.params.cssMode,
        }),
      });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a } = e;
      (s({
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          scale: 1,
          modifier: 1,
          slideShadows: !0,
        },
      }),
        ue({
          effect: "coverflow",
          swiper: t,
          on: a,
          setTranslate: () => {
            const { width: e, height: s, slides: a, slidesSizesGrid: i } = t,
              r = t.params.coverflowEffect,
              n = t.isHorizontal(),
              l = t.translate,
              o = n ? e / 2 - l : s / 2 - l,
              d = n ? r.rotate : -r.rotate,
              c = r.depth,
              p = M(t);
            for (let e = 0, t = a.length; e < t; e += 1) {
              const t = a[e],
                s = i[e],
                l = (o - t.swiperSlideOffset - s / 2) / s,
                u =
                  "function" == typeof r.modifier
                    ? r.modifier(l)
                    : l * r.modifier;
              let m = n ? d * u : 0,
                h = n ? 0 : d * u,
                f = -c * Math.abs(u),
                g = r.stretch;
              "string" == typeof g &&
                -1 !== g.indexOf("%") &&
                (g = (parseFloat(r.stretch) / 100) * s);
              let v = n ? 0 : g * u,
                w = n ? g * u : 0,
                b = 1 - (1 - r.scale) * Math.abs(u);
              (Math.abs(w) < 0.001 && (w = 0),
                Math.abs(v) < 0.001 && (v = 0),
                Math.abs(f) < 0.001 && (f = 0),
                Math.abs(m) < 0.001 && (m = 0),
                Math.abs(h) < 0.001 && (h = 0),
                Math.abs(b) < 0.001 && (b = 0));
              const y = `translate3d(${w}px,${v}px,${f}px)  rotateX(${p(h)}deg) rotateY(${p(m)}deg) scale(${b})`;
              if (
                ((me(0, t).style.transform = y),
                (t.style.zIndex = 1 - Math.abs(Math.round(u))),
                r.slideShadows)
              ) {
                let e = n
                    ? t.querySelector(".swiper-slide-shadow-left")
                    : t.querySelector(".swiper-slide-shadow-top"),
                  s = n
                    ? t.querySelector(".swiper-slide-shadow-right")
                    : t.querySelector(".swiper-slide-shadow-bottom");
                (e || (e = fe("coverflow", t, n ? "left" : "top")),
                  s || (s = fe("coverflow", t, n ? "right" : "bottom")),
                  e && (e.style.opacity = u > 0 ? u : 0),
                  s && (s.style.opacity = -u > 0 ? -u : 0));
              }
            }
          },
          setTransition: (e) => {
            t.slides
              .map((e) => h(e))
              .forEach((t) => {
                ((t.style.transitionDuration = `${e}ms`),
                  t
                    .querySelectorAll(
                      ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left",
                    )
                    .forEach((t) => {
                      t.style.transitionDuration = `${e}ms`;
                    }));
              });
          },
          perspective: () => !0,
          overwriteParams: () => ({ watchSlidesProgress: !0 }),
        }));
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a } = e;
      s({
        creativeEffect: {
          limitProgress: 1,
          shadowPerProgress: !1,
          progressMultiplier: 1,
          perspective: !0,
          prev: {
            translate: [0, 0, 0],
            rotate: [0, 0, 0],
            opacity: 1,
            scale: 1,
          },
          next: {
            translate: [0, 0, 0],
            rotate: [0, 0, 0],
            opacity: 1,
            scale: 1,
          },
        },
      });
      const i = (e) => ("string" == typeof e ? e : `${e}px`);
      ue({
        effect: "creative",
        swiper: t,
        on: a,
        setTranslate: () => {
          const { slides: e, wrapperEl: s, slidesSizesGrid: a } = t,
            r = t.params.creativeEffect,
            { progressMultiplier: n } = r,
            l = t.params.centeredSlides,
            o = M(t);
          if (l) {
            const e = a[0] / 2 - t.params.slidesOffsetBefore || 0;
            s.style.transform = `translateX(calc(50% - ${e}px))`;
          }
          for (let s = 0; s < e.length; s += 1) {
            const a = e[s],
              d = a.progress,
              c = Math.min(
                Math.max(a.progress, -r.limitProgress),
                r.limitProgress,
              );
            let p = c;
            l ||
              (p = Math.min(
                Math.max(a.originalProgress, -r.limitProgress),
                r.limitProgress,
              ));
            const u = a.swiperSlideOffset,
              m = [t.params.cssMode ? -u - t.translate : -u, 0, 0],
              h = [0, 0, 0];
            let f = !1;
            t.isHorizontal() || ((m[1] = m[0]), (m[0] = 0));
            let g = {
              translate: [0, 0, 0],
              rotate: [0, 0, 0],
              scale: 1,
              opacity: 1,
            };
            (c < 0
              ? ((g = r.next), (f = !0))
              : c > 0 && ((g = r.prev), (f = !0)),
              m.forEach((e, t) => {
                m[t] =
                  `calc(${e}px + (${i(g.translate[t])} * ${Math.abs(c * n)}))`;
              }),
              h.forEach((e, t) => {
                let s = g.rotate[t] * Math.abs(c * n);
                h[t] = s;
              }),
              (a.style.zIndex = -Math.abs(Math.round(d)) + e.length));
            const v = m.join(", "),
              w = `rotateX(${o(h[0])}deg) rotateY(${o(h[1])}deg) rotateZ(${o(h[2])}deg)`,
              b =
                p < 0
                  ? `scale(${1 + (1 - g.scale) * p * n})`
                  : `scale(${1 - (1 - g.scale) * p * n})`,
              y =
                p < 0
                  ? 1 + (1 - g.opacity) * p * n
                  : 1 - (1 - g.opacity) * p * n,
              E = `translate3d(${v}) ${w} ${b}`;
            if ((f && g.shadow) || !f) {
              let e = a.querySelector(".swiper-slide-shadow");
              if ((!e && g.shadow && (e = fe("creative", a)), e)) {
                const t = r.shadowPerProgress ? c * (1 / r.limitProgress) : c;
                e.style.opacity = Math.min(Math.max(Math.abs(t), 0), 1);
              }
            }
            const x = me(0, a);
            ((x.style.transform = E),
              (x.style.opacity = y),
              g.origin && (x.style.transformOrigin = g.origin));
          }
        },
        setTransition: (e) => {
          const s = t.slides.map((e) => h(e));
          (s.forEach((t) => {
            ((t.style.transitionDuration = `${e}ms`),
              t.querySelectorAll(".swiper-slide-shadow").forEach((t) => {
                t.style.transitionDuration = `${e}ms`;
              }));
          }),
            he({
              swiper: t,
              duration: e,
              transformElements: s,
              allSlides: !0,
            }));
        },
        perspective: () => t.params.creativeEffect.perspective,
        overwriteParams: () => ({
          watchSlidesProgress: !0,
          virtualTranslate: !t.params.cssMode,
        }),
      });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a } = e;
      (s({
        cardsEffect: {
          slideShadows: !0,
          rotate: !0,
          perSlideRotate: 2,
          perSlideOffset: 8,
        },
      }),
        ue({
          effect: "cards",
          swiper: t,
          on: a,
          setTranslate: () => {
            const { slides: e, activeIndex: s, rtlTranslate: a } = t,
              i = t.params.cardsEffect,
              { startTranslate: r, isTouched: n } = t.touchEventsData,
              l = a ? -t.translate : t.translate;
            for (let o = 0; o < e.length; o += 1) {
              const d = e[o],
                c = d.progress,
                p = Math.min(Math.max(c, -4), 4);
              let u = d.swiperSlideOffset;
              (t.params.centeredSlides &&
                !t.params.cssMode &&
                (t.wrapperEl.style.transform = `translateX(${t.minTranslate()}px)`),
                t.params.centeredSlides &&
                  t.params.cssMode &&
                  (u -= e[0].swiperSlideOffset));
              let m = t.params.cssMode ? -u - t.translate : -u,
                h = 0;
              const f = -100 * Math.abs(p);
              let g = 1,
                v = -i.perSlideRotate * p,
                w = i.perSlideOffset - 0.75 * Math.abs(p);
              const b =
                  t.virtual && t.params.virtual.enabled
                    ? t.virtual.from + o
                    : o,
                y =
                  (b === s || b === s - 1) &&
                  p > 0 &&
                  p < 1 &&
                  (n || t.params.cssMode) &&
                  l < r,
                E =
                  (b === s || b === s + 1) &&
                  p < 0 &&
                  p > -1 &&
                  (n || t.params.cssMode) &&
                  l > r;
              if (y || E) {
                const e = (1 - Math.abs((Math.abs(p) - 0.5) / 0.5)) ** 0.5;
                ((v += -28 * p * e),
                  (g += -0.5 * e),
                  (w += 96 * e),
                  (h = -25 * e * Math.abs(p) + "%"));
              }
              if (
                ((m =
                  p < 0
                    ? `calc(${m}px ${a ? "-" : "+"} (${w * Math.abs(p)}%))`
                    : p > 0
                      ? `calc(${m}px ${a ? "-" : "+"} (-${w * Math.abs(p)}%))`
                      : `${m}px`),
                !t.isHorizontal())
              ) {
                const e = h;
                ((h = m), (m = e));
              }
              const x = p < 0 ? "" + (1 + (1 - g) * p) : "" + (1 - (1 - g) * p),
                S = `\n        translate3d(${m}, ${h}, ${f}px)\n        rotateZ(${i.rotate ? (a ? -v : v) : 0}deg)\n        scale(${x})\n      `;
              if (i.slideShadows) {
                let e = d.querySelector(".swiper-slide-shadow");
                (e || (e = fe("cards", d)),
                  e &&
                    (e.style.opacity = Math.min(
                      Math.max((Math.abs(p) - 0.5) / 0.5, 0),
                      1,
                    )));
              }
              d.style.zIndex = -Math.abs(Math.round(c)) + e.length;
              me(0, d).style.transform = S;
            }
          },
          setTransition: (e) => {
            const s = t.slides.map((e) => h(e));
            (s.forEach((t) => {
              ((t.style.transitionDuration = `${e}ms`),
                t.querySelectorAll(".swiper-slide-shadow").forEach((t) => {
                  t.style.transitionDuration = `${e}ms`;
                }));
            }),
              he({ swiper: t, duration: e, transformElements: s }));
          },
          perspective: () => !0,
          overwriteParams: () => ({
            watchSlidesProgress: !0,
            virtualTranslate: !t.params.cssMode,
          }),
        }));
    },
  ];
  return (ie.use(ge), ie);
})();
!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
      ? define(t)
      : ((e = e || self).GLightbox = t());
})(this, function () {
  "use strict";
  function e(e, t) {
    if (!(e instanceof t))
      throw new TypeError("Cannot call a class as a function");
  }
  function t(e, t) {
    for (var i = 0; i < t.length; i++) {
      var s = t[i];
      ((s.enumerable = s.enumerable || !1),
        (s.configurable = !0),
        "value" in s && (s.writable = !0),
        Object.defineProperty(e, n(s.key), s));
    }
  }
  function i(e, i, n) {
    return (
      i && t(e.prototype, i),
      n && t(e, n),
      Object.defineProperty(e, "prototype", { writable: !1 }),
      e
    );
  }
  function n(e) {
    var t = (function (e, t) {
      if ("object" != typeof e || !e) return e;
      var i = e[Symbol.toPrimitive];
      if (void 0 !== i) {
        var n = i.call(e, t || "default");
        if ("object" != typeof n) return n;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === t ? String : Number)(e);
    })(e, "string");
    return "symbol" == typeof t ? t : t + "";
  }
  function s(e) {
    return (s =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          })(e);
  }
  var l = Date.now();
  function o() {
    var e = {},
      t = !0,
      i = 0,
      n = arguments.length;
    "[object Boolean]" === Object.prototype.toString.call(arguments[0]) &&
      ((t = arguments[0]), i++);
    for (
      var s = function (i) {
        for (var n in i)
          Object.prototype.hasOwnProperty.call(i, n) &&
            (t && "[object Object]" === Object.prototype.toString.call(i[n])
              ? (e[n] = o(!0, e[n], i[n]))
              : (e[n] = i[n]));
      };
      i < n;
      i++
    ) {
      var l = arguments[i];
      s(l);
    }
    return e;
  }
  function r(e, t) {
    if (
      ((E(e) || e === window || e === document) && (e = [e]),
      L(e) || I(e) || (e = [e]),
      0 != M(e))
    )
      if (L(e) && !I(e))
        for (
          var i = e.length, n = 0;
          n < i && !1 !== t.call(e[n], e[n], n, e);
          n++
        );
      else if (I(e))
        for (var s in e) if (P(e, s) && !1 === t.call(e[s], e[s], s, e)) break;
  }
  function a(e) {
    var t =
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
      i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
      n = (e[l] = e[l] || []),
      s = { all: n, evt: null, found: null };
    return (
      t &&
        i &&
        M(n) > 0 &&
        r(n, function (e, n) {
          if (e.eventName == t && e.fn.toString() == i.toString())
            return ((s.found = !0), (s.evt = n), !1);
        }),
      s
    );
  }
  function h(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
      i = t.onElement,
      n = t.withCallback,
      s = t.avoidDuplicate,
      l = void 0 === s || s,
      o = t.once,
      h = void 0 !== o && o,
      d = t.useCapture,
      c = void 0 !== d && d,
      u = arguments.length > 2 ? arguments[2] : void 0,
      g = i || [];
    function v(e) {
      (C(n) && n.call(u, e, this), h && v.destroy());
    }
    return (
      k(g) && (g = document.querySelectorAll(g)),
      (v.destroy = function () {
        r(g, function (t) {
          var i = a(t, e, v);
          (i.found && i.all.splice(i.evt, 1),
            t.removeEventListener && t.removeEventListener(e, v, c));
        });
      }),
      r(g, function (t) {
        var i = a(t, e, v);
        ((t.addEventListener && l && !i.found) || !l) &&
          (t.addEventListener(e, v, c), i.all.push({ eventName: e, fn: v }));
      }),
      v
    );
  }
  function d(e, t) {
    r(t.split(" "), function (t) {
      return e.classList.add(t);
    });
  }
  function c(e, t) {
    r(t.split(" "), function (t) {
      return e.classList.remove(t);
    });
  }
  function u(e, t) {
    return e.classList.contains(t);
  }
  function g(e, t) {
    for (; e !== document.body; ) {
      if (!(e = e.parentElement)) return !1;
      if (
        "function" == typeof e.matches ? e.matches(t) : e.msMatchesSelector(t)
      )
        return e;
    }
  }
  function v(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
      i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
    if (!e || "" === t) return !1;
    if ("none" === t) return (C(i) && i(), !1);
    var n = b(),
      s = t.split(" ");
    (r(s, function (t) {
      d(e, "g" + t);
    }),
      h(n, {
        onElement: e,
        avoidDuplicate: !1,
        once: !0,
        withCallback: function (e, t) {
          (r(s, function (e) {
            c(t, "g" + e);
          }),
            C(i) && i());
        },
      }));
  }
  function f(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
    if ("" === t)
      return (
        (e.style.webkitTransform = ""),
        (e.style.MozTransform = ""),
        (e.style.msTransform = ""),
        (e.style.OTransform = ""),
        (e.style.transform = ""),
        !1
      );
    ((e.style.webkitTransform = t),
      (e.style.MozTransform = t),
      (e.style.msTransform = t),
      (e.style.OTransform = t),
      (e.style.transform = t));
  }
  function p(e) {
    e.style.display = "block";
  }
  function m(e) {
    e.style.display = "none";
  }
  function y(e) {
    var t = document.createDocumentFragment(),
      i = document.createElement("div");
    for (i.innerHTML = e; i.firstChild; ) t.appendChild(i.firstChild);
    return t;
  }
  function x() {
    return {
      width:
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth,
      height:
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight,
    };
  }
  function b() {
    var e,
      t = document.createElement("fakeelement"),
      i = {
        animation: "animationend",
        OAnimation: "oAnimationEnd",
        MozAnimation: "animationend",
        WebkitAnimation: "webkitAnimationEnd",
      };
    for (e in i) if (void 0 !== t.style[e]) return i[e];
  }
  function S(e, t, i, n) {
    if (e()) t();
    else {
      var s;
      i || (i = 100);
      var l = setInterval(function () {
        e() && (clearInterval(l), s && clearTimeout(s), t());
      }, i);
      n &&
        (s = setTimeout(function () {
          clearInterval(l);
        }, n));
    }
  }
  function w(e, t, i) {
    if (O(e)) console.error("Inject assets error");
    else if ((C(t) && ((i = t), (t = !1)), k(t) && t in window)) C(i) && i();
    else {
      var n;
      if (-1 !== e.indexOf(".css")) {
        if (
          (n = document.querySelectorAll('link[href="' + e + '"]')) &&
          n.length > 0
        )
          return void (C(i) && i());
        var s = document.getElementsByTagName("head")[0],
          l = s.querySelectorAll('link[rel="stylesheet"]'),
          o = document.createElement("link");
        return (
          (o.rel = "stylesheet"),
          (o.type = "text/css"),
          (o.href = e),
          (o.media = "all"),
          l ? s.insertBefore(o, l[0]) : s.appendChild(o),
          void (C(i) && i())
        );
      }
      if (
        (n = document.querySelectorAll('script[src="' + e + '"]')) &&
        n.length > 0
      ) {
        if (C(i)) {
          if (k(t))
            return (
              S(
                function () {
                  return void 0 !== window[t];
                },
                function () {
                  i();
                },
              ),
              !1
            );
          i();
        }
      } else {
        var r = document.createElement("script");
        ((r.type = "text/javascript"),
          (r.src = e),
          (r.onload = function () {
            if (C(i)) {
              if (k(t))
                return (
                  S(
                    function () {
                      return void 0 !== window[t];
                    },
                    function () {
                      i();
                    },
                  ),
                  !1
                );
              i();
            }
          }),
          document.body.appendChild(r));
      }
    }
  }
  function T() {
    return (
      "navigator" in window &&
      window.navigator.userAgent.match(
        /(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i,
      )
    );
  }
  function C(e) {
    return "function" == typeof e;
  }
  function k(e) {
    return "string" == typeof e;
  }
  function E(e) {
    return !(!e || !e.nodeType || 1 != e.nodeType);
  }
  function A(e) {
    return Array.isArray(e);
  }
  function L(e) {
    return e && e.length && isFinite(e.length);
  }
  function I(e) {
    return "object" === s(e) && null != e && !C(e) && !A(e);
  }
  function O(e) {
    return null == e;
  }
  function P(e, t) {
    return null !== e && hasOwnProperty.call(e, t);
  }
  function M(e) {
    if (I(e)) {
      if (e.keys) return e.keys().length;
      var t = 0;
      for (var i in e) P(e, i) && t++;
      return t;
    }
    return e.length;
  }
  function z(e) {
    return !isNaN(parseFloat(e)) && isFinite(e);
  }
  function X() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1,
      t = document.querySelectorAll(".gbtn[data-taborder]:not(.disabled)");
    if (!t.length) return !1;
    if (1 == t.length) return t[0];
    "string" == typeof e && (e = parseInt(e));
    var i = [];
    r(t, function (e) {
      i.push(e.getAttribute("data-taborder"));
    });
    var n = Math.max.apply(
        Math,
        i.map(function (e) {
          return parseInt(e);
        }),
      ),
      s = e < 0 ? 1 : e + 1;
    s > n && (s = "1");
    var l = i.filter(function (e) {
        return e >= parseInt(s);
      }),
      o = l.sort()[0];
    return document.querySelector('.gbtn[data-taborder="'.concat(o, '"]'));
  }
  function Y(e) {
    if (e.events.hasOwnProperty("keyboard")) return !1;
    e.events.keyboard = h("keydown", {
      onElement: window,
      withCallback: function (t, i) {
        var n = (t = t || window.event).keyCode;
        if (9 == n) {
          var s = document.querySelector(".gbtn.focused");
          if (!s) {
            var l =
              !(!document.activeElement || !document.activeElement.nodeName) &&
              document.activeElement.nodeName.toLocaleLowerCase();
            if ("input" == l || "textarea" == l || "button" == l) return;
          }
          t.preventDefault();
          var o = document.querySelectorAll(".gbtn[data-taborder]");
          if (!o || o.length <= 0) return;
          if (!s) {
            var r = X();
            return void (r && (r.focus(), d(r, "focused")));
          }
          var a = X(s.getAttribute("data-taborder"));
          (c(s, "focused"), a && (a.focus(), d(a, "focused")));
        }
        (39 == n && e.nextSlide(),
          37 == n && e.prevSlide(),
          27 == n && e.close());
      },
    });
  }
  var q = i(
      function t(i, n) {
        var s = this,
          l =
            arguments.length > 2 && void 0 !== arguments[2]
              ? arguments[2]
              : null;
        if (
          (e(this, t),
          (this.img = i),
          (this.slide = n),
          (this.onclose = l),
          this.img.setZoomEvents)
        )
          return !1;
        ((this.active = !1),
          (this.zoomedIn = !1),
          (this.dragging = !1),
          (this.currentX = null),
          (this.currentY = null),
          (this.initialX = null),
          (this.initialY = null),
          (this.xOffset = 0),
          (this.yOffset = 0),
          this.img.addEventListener(
            "mousedown",
            function (e) {
              return s.dragStart(e);
            },
            !1,
          ),
          this.img.addEventListener(
            "mouseup",
            function (e) {
              return s.dragEnd(e);
            },
            !1,
          ),
          this.img.addEventListener(
            "mousemove",
            function (e) {
              return s.drag(e);
            },
            !1,
          ),
          this.img.addEventListener(
            "click",
            function (e) {
              return s.slide.classList.contains("dragging-nav")
                ? (s.zoomOut(), !1)
                : s.zoomedIn
                  ? void (s.zoomedIn && !s.dragging && s.zoomOut())
                  : s.zoomIn();
            },
            !1,
          ),
          (this.img.setZoomEvents = !0));
      },
      [
        {
          key: "zoomIn",
          value: function () {
            var e = this.widowWidth();
            if (!(this.zoomedIn || e <= 768)) {
              var t = this.img;
              if (
                (t.setAttribute("data-style", t.getAttribute("style")),
                (t.style.maxWidth = t.naturalWidth + "px"),
                (t.style.maxHeight = t.naturalHeight + "px"),
                t.naturalWidth > e)
              ) {
                var i = e / 2 - t.naturalWidth / 2;
                this.setTranslate(this.img.parentNode, i, 0);
              }
              (this.slide.classList.add("zoomed"), (this.zoomedIn = !0));
            }
          },
        },
        {
          key: "zoomOut",
          value: function () {
            (this.img.parentNode.setAttribute("style", ""),
              this.img.setAttribute(
                "style",
                this.img.getAttribute("data-style"),
              ),
              this.slide.classList.remove("zoomed"),
              (this.zoomedIn = !1),
              (this.currentX = null),
              (this.currentY = null),
              (this.initialX = null),
              (this.initialY = null),
              (this.xOffset = 0),
              (this.yOffset = 0),
              this.onclose &&
                "function" == typeof this.onclose &&
                this.onclose());
          },
        },
        {
          key: "dragStart",
          value: function (e) {
            (e.preventDefault(),
              this.zoomedIn
                ? ("touchstart" === e.type
                    ? ((this.initialX = e.touches[0].clientX - this.xOffset),
                      (this.initialY = e.touches[0].clientY - this.yOffset))
                    : ((this.initialX = e.clientX - this.xOffset),
                      (this.initialY = e.clientY - this.yOffset)),
                  e.target === this.img &&
                    ((this.active = !0), this.img.classList.add("dragging")))
                : (this.active = !1));
          },
        },
        {
          key: "dragEnd",
          value: function (e) {
            var t = this;
            (e.preventDefault(),
              (this.initialX = this.currentX),
              (this.initialY = this.currentY),
              (this.active = !1),
              setTimeout(function () {
                ((t.dragging = !1),
                  (t.img.isDragging = !1),
                  t.img.classList.remove("dragging"));
              }, 100));
          },
        },
        {
          key: "drag",
          value: function (e) {
            this.active &&
              (e.preventDefault(),
              "touchmove" === e.type
                ? ((this.currentX = e.touches[0].clientX - this.initialX),
                  (this.currentY = e.touches[0].clientY - this.initialY))
                : ((this.currentX = e.clientX - this.initialX),
                  (this.currentY = e.clientY - this.initialY)),
              (this.xOffset = this.currentX),
              (this.yOffset = this.currentY),
              (this.img.isDragging = !0),
              (this.dragging = !0),
              this.setTranslate(this.img, this.currentX, this.currentY));
          },
        },
        {
          key: "onMove",
          value: function (e) {
            if (this.zoomedIn) {
              var t = e.clientX - this.img.naturalWidth / 2,
                i = e.clientY - this.img.naturalHeight / 2;
              this.setTranslate(this.img, t, i);
            }
          },
        },
        {
          key: "setTranslate",
          value: function (e, t, i) {
            e.style.transform = "translate3d(" + t + "px, " + i + "px, 0)";
          },
        },
        {
          key: "widowWidth",
          value: function () {
            return (
              window.innerWidth ||
              document.documentElement.clientWidth ||
              document.body.clientWidth
            );
          },
        },
      ],
    ),
    N = i(
      function t() {
        var i = this,
          n =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        e(this, t);
        var s = n.dragEl,
          l = n.toleranceX,
          o = void 0 === l ? 40 : l,
          r = n.toleranceY,
          a = void 0 === r ? 65 : r,
          h = n.slide,
          d = void 0 === h ? null : h,
          c = n.instance,
          u = void 0 === c ? null : c;
        ((this.el = s),
          (this.active = !1),
          (this.dragging = !1),
          (this.currentX = null),
          (this.currentY = null),
          (this.initialX = null),
          (this.initialY = null),
          (this.xOffset = 0),
          (this.yOffset = 0),
          (this.direction = null),
          (this.lastDirection = null),
          (this.toleranceX = o),
          (this.toleranceY = a),
          (this.toleranceReached = !1),
          (this.dragContainer = this.el),
          (this.slide = d),
          (this.instance = u),
          this.el.addEventListener(
            "mousedown",
            function (e) {
              return i.dragStart(e);
            },
            !1,
          ),
          this.el.addEventListener(
            "mouseup",
            function (e) {
              return i.dragEnd(e);
            },
            !1,
          ),
          this.el.addEventListener(
            "mousemove",
            function (e) {
              return i.drag(e);
            },
            !1,
          ));
      },
      [
        {
          key: "dragStart",
          value: function (e) {
            if (this.slide.classList.contains("zoomed")) this.active = !1;
            else {
              "touchstart" === e.type
                ? ((this.initialX = e.touches[0].clientX - this.xOffset),
                  (this.initialY = e.touches[0].clientY - this.yOffset))
                : ((this.initialX = e.clientX - this.xOffset),
                  (this.initialY = e.clientY - this.yOffset));
              var t = e.target.nodeName.toLowerCase();
              e.target.classList.contains("nodrag") ||
              g(e.target, ".nodrag") ||
              -1 !== ["input", "select", "textarea", "button", "a"].indexOf(t)
                ? (this.active = !1)
                : (e.preventDefault(),
                  (e.target === this.el ||
                    ("img" !== t && g(e.target, ".gslide-inline"))) &&
                    ((this.active = !0),
                    this.el.classList.add("dragging"),
                    (this.dragContainer = g(e.target, ".ginner-container"))));
            }
          },
        },
        {
          key: "dragEnd",
          value: function (e) {
            var t = this;
            (e && e.preventDefault(),
              (this.initialX = 0),
              (this.initialY = 0),
              (this.currentX = null),
              (this.currentY = null),
              (this.initialX = null),
              (this.initialY = null),
              (this.xOffset = 0),
              (this.yOffset = 0),
              (this.active = !1),
              this.doSlideChange &&
                ((this.instance.preventOutsideClick = !0),
                "right" == this.doSlideChange && this.instance.prevSlide(),
                "left" == this.doSlideChange && this.instance.nextSlide()),
              this.doSlideClose && this.instance.close(),
              this.toleranceReached ||
                this.setTranslate(this.dragContainer, 0, 0, !0),
              setTimeout(function () {
                ((t.instance.preventOutsideClick = !1),
                  (t.toleranceReached = !1),
                  (t.lastDirection = null),
                  (t.dragging = !1),
                  (t.el.isDragging = !1),
                  t.el.classList.remove("dragging"),
                  t.slide.classList.remove("dragging-nav"),
                  (t.dragContainer.style.transform = ""),
                  (t.dragContainer.style.transition = ""));
              }, 100));
          },
        },
        {
          key: "drag",
          value: function (e) {
            if (this.active) {
              (e.preventDefault(),
                this.slide.classList.add("dragging-nav"),
                "touchmove" === e.type
                  ? ((this.currentX = e.touches[0].clientX - this.initialX),
                    (this.currentY = e.touches[0].clientY - this.initialY))
                  : ((this.currentX = e.clientX - this.initialX),
                    (this.currentY = e.clientY - this.initialY)),
                (this.xOffset = this.currentX),
                (this.yOffset = this.currentY),
                (this.el.isDragging = !0),
                (this.dragging = !0),
                (this.doSlideChange = !1),
                (this.doSlideClose = !1));
              var t = Math.abs(this.currentX),
                i = Math.abs(this.currentY);
              if (
                t > 0 &&
                t >= Math.abs(this.currentY) &&
                (!this.lastDirection || "x" == this.lastDirection)
              ) {
                ((this.yOffset = 0),
                  (this.lastDirection = "x"),
                  this.setTranslate(this.dragContainer, this.currentX, 0));
                var n = this.shouldChange();
                if (
                  (!this.instance.settings.dragAutoSnap &&
                    n &&
                    (this.doSlideChange = n),
                  this.instance.settings.dragAutoSnap && n)
                )
                  return (
                    (this.instance.preventOutsideClick = !0),
                    (this.toleranceReached = !0),
                    (this.active = !1),
                    (this.instance.preventOutsideClick = !0),
                    this.dragEnd(null),
                    "right" == n && this.instance.prevSlide(),
                    void ("left" == n && this.instance.nextSlide())
                  );
              }
              if (
                this.toleranceY > 0 &&
                i > 0 &&
                i >= t &&
                (!this.lastDirection || "y" == this.lastDirection)
              ) {
                ((this.xOffset = 0),
                  (this.lastDirection = "y"),
                  this.setTranslate(this.dragContainer, 0, this.currentY));
                var s = this.shouldClose();
                return (
                  !this.instance.settings.dragAutoSnap &&
                    s &&
                    (this.doSlideClose = !0),
                  void (
                    this.instance.settings.dragAutoSnap &&
                    s &&
                    this.instance.close()
                  )
                );
              }
            }
          },
        },
        {
          key: "shouldChange",
          value: function () {
            var e = !1;
            if (Math.abs(this.currentX) >= this.toleranceX) {
              var t = this.currentX > 0 ? "right" : "left";
              (("left" == t &&
                this.slide !== this.slide.parentNode.lastChild) ||
                ("right" == t &&
                  this.slide !== this.slide.parentNode.firstChild)) &&
                (e = t);
            }
            return e;
          },
        },
        {
          key: "shouldClose",
          value: function () {
            var e = !1;
            return (Math.abs(this.currentY) >= this.toleranceY && (e = !0), e);
          },
        },
        {
          key: "setTranslate",
          value: function (e, t, i) {
            var n =
              arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
            ((e.style.transition = n ? "all .2s ease" : ""),
              (e.style.transform = "translate3d("
                .concat(t, "px, ")
                .concat(i, "px, 0)")));
          },
        },
      ],
    );
  function D(e, t, i, n) {
    var s = e.querySelector(".gslide-media"),
      l = new Image(),
      o = "gSlideTitle_" + i,
      r = "gSlideDesc_" + i;
    (l.addEventListener(
      "load",
      function () {
        C(n) && n();
      },
      !1,
    ),
      (l.src = t.href),
      "" != t.sizes &&
        "" != t.srcset &&
        ((l.sizes = t.sizes), (l.srcset = t.srcset)),
      (l.alt = ""),
      O(t.alt) || "" === t.alt || (l.alt = t.alt),
      "" !== t.title && l.setAttribute("aria-labelledby", o),
      "" !== t.description && l.setAttribute("aria-describedby", r),
      t.hasOwnProperty("_hasCustomWidth") &&
        t._hasCustomWidth &&
        (l.style.width = t.width),
      t.hasOwnProperty("_hasCustomHeight") &&
        t._hasCustomHeight &&
        (l.style.height = t.height),
      s.insertBefore(l, s.firstChild));
  }
  function _(e, t, i, n) {
    var s = this,
      l = e.querySelector(".ginner-container"),
      o = "gvideo" + i,
      r = e.querySelector(".gslide-media"),
      a = this.getAllPlayers();
    (d(l, "gvideo-container"),
      r.insertBefore(y('<div class="gvideo-wrapper"></div>'), r.firstChild));
    var h = e.querySelector(".gvideo-wrapper");
    w(this.settings.plyr.css, "Plyr");
    var c = t.href,
      u = null == t ? void 0 : t.videoProvider,
      g = !1;
    ((r.style.maxWidth = t.width),
      w(this.settings.plyr.js, "Plyr", function () {
        if (
          (!u && c.match(/vimeo\.com\/([0-9]*)/) && (u = "vimeo"),
          !u &&
            (c.match(
              /(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/,
            ) ||
              c.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) ||
              c.match(
                /(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/,
              ) ||
              c.match(
                /(youtube\.com|youtube-nocookie\.com)\/shorts\/([a-zA-Z0-9\-_]+)/,
              )) &&
            (u = "youtube"),
          "local" === u || !u)
        ) {
          u = "local";
          var l = '<video id="' + o + '" ';
          ((l += 'style="background:#000; max-width: '.concat(t.width, ';" ')),
            (l += 'preload="metadata" '),
            (l += 'x-webkit-airplay="allow" '),
            (l += "playsinline "),
            (l += "controls "),
            (l += 'class="gvideo-local">'),
            (l += '<source src="'.concat(c, '">')),
            (g = y((l += "</video>"))));
        }
        var r =
          g ||
          y(
            '<div id="'
              .concat(o, '" data-plyr-provider="')
              .concat(u, '" data-plyr-embed-id="')
              .concat(c, '"></div>'),
          );
        (d(h, "".concat(u, "-video gvideo")),
          h.appendChild(r),
          h.setAttribute("data-id", o),
          h.setAttribute("data-index", i));
        var v = P(s.settings.plyr, "config") ? s.settings.plyr.config : {},
          f = new Plyr("#" + o, v);
        (f.on("ready", function (e) {
          ((a[o] = e.detail.plyr), C(n) && n());
        }),
          S(
            function () {
              return (
                e.querySelector("iframe") &&
                "true" == e.querySelector("iframe").dataset.ready
              );
            },
            function () {
              s.resize(e);
            },
          ),
          f.on("enterfullscreen", W),
          f.on("exitfullscreen", W));
      }));
  }
  function W(e) {
    var t = g(e.target, ".gslide-media");
    ("enterfullscreen" === e.type && d(t, "fullscreen"),
      "exitfullscreen" === e.type && c(t, "fullscreen"));
  }
  function B(e, t, i, n) {
    var s,
      l = this,
      o = e.querySelector(".gslide-media"),
      r = !(!P(t, "href") || !t.href) && t.href.split("#").pop().trim(),
      a = !(!P(t, "content") || !t.content) && t.content;
    if (
      a &&
      (k(a) && (s = y('<div class="ginlined-content">'.concat(a, "</div>"))),
      E(a))
    ) {
      "none" == a.style.display && (a.style.display = "block");
      var c = document.createElement("div");
      ((c.className = "ginlined-content"), c.appendChild(a), (s = c));
    }
    if (r) {
      var u = document.getElementById(r);
      if (!u) return !1;
      var g = u.cloneNode(!0);
      ((g.style.height = t.height),
        (g.style.maxWidth = t.width),
        d(g, "ginlined-content"),
        (s = g));
    }
    if (!s)
      return (console.error("Unable to append inline slide content", t), !1);
    ((o.style.height = t.height),
      (o.style.width = t.width),
      o.appendChild(s),
      (this.events["inlineclose" + r] = h("click", {
        onElement: o.querySelectorAll(".gtrigger-close"),
        withCallback: function (e) {
          (e.preventDefault(), l.close());
        },
      })),
      C(n) && n());
  }
  function H(e, t, i, n) {
    var s = e.querySelector(".gslide-media"),
      l = (function (e) {
        var t = e.url,
          i = e.allow,
          n = e.callback,
          s = e.appendTo,
          l = document.createElement("iframe");
        return (
          (l.className = "vimeo-video gvideo"),
          (l.src = t),
          (l.style.width = "100%"),
          (l.style.height = "100%"),
          i && l.setAttribute("allow", i),
          (l.onload = function () {
            ((l.onload = null), d(l, "node-ready"), C(n) && n());
          }),
          s && s.appendChild(l),
          l
        );
      })({ url: t.href, callback: n });
    ((s.parentNode.style.maxWidth = t.width),
      (s.parentNode.style.height = t.height),
      s.appendChild(l));
  }
  var j = i(
      function t() {
        var i =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        (e(this, t),
          (this.defaults = {
            href: "",
            sizes: "",
            srcset: "",
            title: "",
            type: "",
            videoProvider: "",
            description: "",
            alt: "",
            descPosition: "bottom",
            effect: "",
            width: "",
            height: "",
            content: !1,
            zoomable: !0,
            draggable: !0,
          }),
          I(i) && (this.defaults = o(this.defaults, i)));
      },
      [
        {
          key: "sourceType",
          value: function (e) {
            var t = e;
            return null !==
              (e = e.toLowerCase()).match(
                /\.(jpeg|jpg|jpe|gif|png|apn|webp|avif|svg)/,
              )
              ? "image"
              : e.match(
                    /(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/,
                  ) ||
                  e.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) ||
                  e.match(
                    /(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/,
                  ) ||
                  e.match(
                    /(youtube\.com|youtube-nocookie\.com)\/shorts\/([a-zA-Z0-9\-_]+)/,
                  ) ||
                  e.match(/vimeo\.com\/([0-9]*)/) ||
                  null !== e.match(/\.(mp4|ogg|webm|mov)/)
                ? "video"
                : null !== e.match(/\.(mp3|wav|wma|aac|ogg)/)
                  ? "audio"
                  : e.indexOf("#") > -1 && "" !== t.split("#").pop().trim()
                    ? "inline"
                    : e.indexOf("goajax=true") > -1
                      ? "ajax"
                      : "external";
          },
        },
        {
          key: "parseConfig",
          value: function (e, t) {
            var i = this,
              n = o({ descPosition: t.descPosition }, this.defaults);
            if (I(e) && !E(e)) {
              P(e, "type") ||
                (P(e, "content") && e.content
                  ? (e.type = "inline")
                  : P(e, "href") && (e.type = this.sourceType(e.href)));
              var s = o(n, e);
              return (this.setSize(s, t), s);
            }
            var l = "",
              a = e.getAttribute("data-glightbox"),
              h = e.nodeName.toLowerCase();
            if (
              ("a" === h && (l = e.href),
              "img" === h && ((l = e.src), (n.alt = e.alt)),
              (n.href = l),
              r(n, function (s, l) {
                P(t, l) && "width" !== l && (n[l] = t[l]);
                var o = e.dataset[l];
                O(o) || (n[l] = i.sanitizeValue(o));
              }),
              n.content && (n.type = "inline"),
              !n.type && l && (n.type = this.sourceType(l)),
              O(a))
            ) {
              if (!n.title && "a" == h) {
                var d = e.title;
                O(d) || "" === d || (n.title = d);
              }
              if (!n.title && "img" == h) {
                var c = e.alt;
                O(c) || "" === c || (n.title = c);
              }
            } else {
              var u = [];
              (r(n, function (e, t) {
                u.push(";\\s?" + t);
              }),
                (u = u.join("\\s?:|")),
                "" !== a.trim() &&
                  r(n, function (e, t) {
                    var s = a,
                      l = new RegExp("s?" + t + "s?:s?(.*?)(" + u + "s?:|$)"),
                      o = s.match(l);
                    if (o && o.length && o[1]) {
                      var r = o[1].trim().replace(/;\s*$/, "");
                      n[t] = i.sanitizeValue(r);
                    }
                  }));
            }
            if (n.description && "." === n.description.substring(0, 1)) {
              var g;
              try {
                g = document.querySelector(n.description).innerHTML;
              } catch (e) {
                if (!(e instanceof DOMException)) throw e;
              }
              g && (n.description = g);
            }
            if (!n.description) {
              var v = e.querySelector(".glightbox-desc");
              v && (n.description = v.innerHTML);
            }
            return (this.setSize(n, t, e), (this.slideConfig = n), n);
          },
        },
        {
          key: "setSize",
          value: function (e, t) {
            var i =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : null,
              n =
                "video" == e.type
                  ? this.checkSize(t.videosWidth)
                  : this.checkSize(t.width),
              s = this.checkSize(t.height);
            return (
              (e.width =
                P(e, "width") && "" !== e.width ? this.checkSize(e.width) : n),
              (e.height =
                P(e, "height") && "" !== e.height
                  ? this.checkSize(e.height)
                  : s),
              i &&
                "image" == e.type &&
                ((e._hasCustomWidth = !!i.dataset.width),
                (e._hasCustomHeight = !!i.dataset.height)),
              e
            );
          },
        },
        {
          key: "checkSize",
          value: function (e) {
            return z(e) ? "".concat(e, "px") : e;
          },
        },
        {
          key: "sanitizeValue",
          value: function (e) {
            return "true" !== e && "false" !== e ? e : "true" === e;
          },
        },
      ],
    ),
    V = i(
      function t(i, n, s) {
        (e(this, t), (this.element = i), (this.instance = n), (this.index = s));
      },
      [
        {
          key: "setContent",
          value: function () {
            var e = this,
              t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : null,
              i =
                arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            if (u(t, "loaded")) return !1;
            var n = this.instance.settings,
              s = this.slideConfig,
              l = T();
            C(n.beforeSlideLoad) &&
              n.beforeSlideLoad({ index: this.index, slide: t, player: !1 });
            var o = s.type,
              r = s.descPosition,
              a = t.querySelector(".gslide-media"),
              h = t.querySelector(".gslide-title"),
              c = t.querySelector(".gslide-desc"),
              g = t.querySelector(".gdesc-inner"),
              v = i,
              f = "gSlideTitle_" + this.index,
              p = "gSlideDesc_" + this.index;
            if (
              (C(n.afterSlideLoad) &&
                (v = function () {
                  (C(i) && i(),
                    n.afterSlideLoad({
                      index: e.index,
                      slide: t,
                      player: e.instance.getSlidePlayerInstance(e.index),
                    }));
                }),
              "" == s.title && "" == s.description
                ? g && g.parentNode.parentNode.removeChild(g.parentNode)
                : (h && "" !== s.title
                    ? ((h.id = f), (h.innerHTML = s.title))
                    : h.parentNode.removeChild(h),
                  c && "" !== s.description
                    ? ((c.id = p),
                      l && n.moreLength > 0
                        ? ((s.smallDescription = this.slideShortDesc(
                            s.description,
                            n.moreLength,
                            n.moreText,
                          )),
                          (c.innerHTML = s.smallDescription),
                          this.descriptionEvents(c, s))
                        : (c.innerHTML = s.description))
                    : c.parentNode.removeChild(c),
                  d(a.parentNode, "desc-".concat(r)),
                  d(g.parentNode, "description-".concat(r))),
              d(a, "gslide-".concat(o)),
              d(t, "loaded"),
              "video" !== o)
            ) {
              if ("external" !== o)
                return "inline" === o
                  ? (B.apply(this.instance, [t, s, this.index, v]),
                    void (
                      s.draggable &&
                      new N({
                        dragEl: t.querySelector(".gslide-inline"),
                        toleranceX: n.dragToleranceX,
                        toleranceY: n.dragToleranceY,
                        slide: t,
                        instance: this.instance,
                      })
                    ))
                  : void ("image" !== o
                      ? C(v) && v()
                      : D(t, s, this.index, function () {
                          var i = t.querySelector("img");
                          (s.draggable &&
                            new N({
                              dragEl: i,
                              toleranceX: n.dragToleranceX,
                              toleranceY: n.dragToleranceY,
                              slide: t,
                              instance: e.instance,
                            }),
                            s.zoomable &&
                              i.naturalWidth > i.offsetWidth &&
                              (d(i, "zoomable"),
                              new q(i, t, function () {
                                e.instance.resize();
                              })),
                            C(v) && v());
                        }));
              H.apply(this, [t, s, this.index, v]);
            } else _.apply(this.instance, [t, s, this.index, v]);
          },
        },
        {
          key: "slideShortDesc",
          value: function (e) {
            var t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : 50,
              i =
                arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
              n = document.createElement("div");
            n.innerHTML = e;
            var s = n.innerText,
              l = i;
            if ((e = s.trim()).length <= t) return e;
            var o = e.substr(0, t - 1);
            return l
              ? ((n = null),
                o + '... <a href="#" class="desc-more">' + i + "</a>")
              : o;
          },
        },
        {
          key: "descriptionEvents",
          value: function (e, t) {
            var i = this,
              n = e.querySelector(".desc-more");
            if (!n) return !1;
            h("click", {
              onElement: n,
              withCallback: function (e, n) {
                e.preventDefault();
                var s = document.body,
                  l = g(n, ".gslide-desc");
                if (!l) return !1;
                ((l.innerHTML = t.description), d(s, "gdesc-open"));
                var o = h("click", {
                  onElement: [s, g(l, ".gslide-description")],
                  withCallback: function (e, n) {
                    "a" !== e.target.nodeName.toLowerCase() &&
                      (c(s, "gdesc-open"),
                      d(s, "gdesc-closed"),
                      (l.innerHTML = t.smallDescription),
                      i.descriptionEvents(l, t),
                      setTimeout(function () {
                        c(s, "gdesc-closed");
                      }, 400),
                      o.destroy());
                  },
                });
              },
            });
          },
        },
        {
          key: "create",
          value: function () {
            return y(this.instance.settings.slideHTML);
          },
        },
        {
          key: "getConfig",
          value: function () {
            E(this.element) ||
              this.element.hasOwnProperty("draggable") ||
              (this.element.draggable = this.instance.settings.draggable);
            var e = new j(this.instance.settings.slideExtraAttributes);
            return (
              (this.slideConfig = e.parseConfig(
                this.element,
                this.instance.settings,
              )),
              this.slideConfig
            );
          },
        },
      ],
    );
  function F(e) {
    return Math.sqrt(e.x * e.x + e.y * e.y);
  }
  function R(e, t) {
    var i = (function (e, t) {
      var i = F(e) * F(t);
      if (0 === i) return 0;
      var n =
        (function (e, t) {
          return e.x * t.x + e.y * t.y;
        })(e, t) / i;
      return (n > 1 && (n = 1), Math.acos(n));
    })(e, t);
    return (
      (function (e, t) {
        return e.x * t.y - t.x * e.y;
      })(e, t) > 0 && (i *= -1),
      (180 * i) / Math.PI
    );
  }
  var G = i(
    function t(i) {
      (e(this, t), (this.handlers = []), (this.el = i));
    },
    [
      {
        key: "add",
        value: function (e) {
          this.handlers.push(e);
        },
      },
      {
        key: "del",
        value: function (e) {
          e || (this.handlers = []);
          for (var t = this.handlers.length; t >= 0; t--)
            this.handlers[t] === e && this.handlers.splice(t, 1);
        },
      },
      {
        key: "dispatch",
        value: function () {
          for (var e = 0, t = this.handlers.length; e < t; e++) {
            var i = this.handlers[e];
            "function" == typeof i && i.apply(this.el, arguments);
          }
        },
      },
    ],
  );
  function Z(e, t) {
    var i = new G(e);
    return (i.add(t), i);
  }
  var U = i(
    function t(i, n) {
      (e(this, t),
        (this.element = "string" == typeof i ? document.querySelector(i) : i),
        (this.start = this.start.bind(this)),
        (this.move = this.move.bind(this)),
        (this.end = this.end.bind(this)),
        (this.cancel = this.cancel.bind(this)),
        this.element.addEventListener("touchstart", this.start, !1),
        this.element.addEventListener("touchmove", this.move, !1),
        this.element.addEventListener("touchend", this.end, !1),
        this.element.addEventListener("touchcancel", this.cancel, !1),
        (this.preV = { x: null, y: null }),
        (this.pinchStartLen = null),
        (this.zoom = 1),
        (this.isDoubleTap = !1));
      var s = function () {};
      ((this.rotate = Z(this.element, n.rotate || s)),
        (this.touchStart = Z(this.element, n.touchStart || s)),
        (this.multipointStart = Z(this.element, n.multipointStart || s)),
        (this.multipointEnd = Z(this.element, n.multipointEnd || s)),
        (this.pinch = Z(this.element, n.pinch || s)),
        (this.swipe = Z(this.element, n.swipe || s)),
        (this.tap = Z(this.element, n.tap || s)),
        (this.doubleTap = Z(this.element, n.doubleTap || s)),
        (this.longTap = Z(this.element, n.longTap || s)),
        (this.singleTap = Z(this.element, n.singleTap || s)),
        (this.pressMove = Z(this.element, n.pressMove || s)),
        (this.twoFingerPressMove = Z(this.element, n.twoFingerPressMove || s)),
        (this.touchMove = Z(this.element, n.touchMove || s)),
        (this.touchEnd = Z(this.element, n.touchEnd || s)),
        (this.touchCancel = Z(this.element, n.touchCancel || s)),
        (this.translateContainer = this.element),
        (this._cancelAllHandler = this.cancelAll.bind(this)),
        window.addEventListener("scroll", this._cancelAllHandler),
        (this.delta = null),
        (this.last = null),
        (this.now = null),
        (this.tapTimeout = null),
        (this.singleTapTimeout = null),
        (this.longTapTimeout = null),
        (this.swipeTimeout = null),
        (this.x1 = this.x2 = this.y1 = this.y2 = null),
        (this.preTapPosition = { x: null, y: null }));
    },
    [
      {
        key: "start",
        value: function (e) {
          if (e.touches)
            if (
              e.target &&
              e.target.nodeName &&
              ["a", "button", "input"].indexOf(
                e.target.nodeName.toLowerCase(),
              ) >= 0
            )
              console.log(
                "ignore drag for this touched element",
                e.target.nodeName.toLowerCase(),
              );
            else {
              ((this.now = Date.now()),
                (this.x1 = e.touches[0].pageX),
                (this.y1 = e.touches[0].pageY),
                (this.delta = this.now - (this.last || this.now)),
                this.touchStart.dispatch(e, this.element),
                null !== this.preTapPosition.x &&
                  ((this.isDoubleTap =
                    this.delta > 0 &&
                    this.delta <= 250 &&
                    Math.abs(this.preTapPosition.x - this.x1) < 30 &&
                    Math.abs(this.preTapPosition.y - this.y1) < 30),
                  this.isDoubleTap && clearTimeout(this.singleTapTimeout)),
                (this.preTapPosition.x = this.x1),
                (this.preTapPosition.y = this.y1),
                (this.last = this.now));
              var t = this.preV;
              if (e.touches.length > 1) {
                (this._cancelLongTap(), this._cancelSingleTap());
                var i = {
                  x: e.touches[1].pageX - this.x1,
                  y: e.touches[1].pageY - this.y1,
                };
                ((t.x = i.x),
                  (t.y = i.y),
                  (this.pinchStartLen = F(t)),
                  this.multipointStart.dispatch(e, this.element));
              }
              ((this._preventTap = !1),
                (this.longTapTimeout = setTimeout(
                  function () {
                    (this.longTap.dispatch(e, this.element),
                      (this._preventTap = !0));
                  }.bind(this),
                  750,
                )));
            }
        },
      },
      {
        key: "move",
        value: function (e) {
          if (e.touches) {
            var t = this.preV,
              i = e.touches.length,
              n = e.touches[0].pageX,
              s = e.touches[0].pageY;
            if (((this.isDoubleTap = !1), i > 1)) {
              var l = e.touches[1].pageX,
                o = e.touches[1].pageY,
                r = { x: e.touches[1].pageX - n, y: e.touches[1].pageY - s };
              (null !== t.x &&
                (this.pinchStartLen > 0 &&
                  ((e.zoom = F(r) / this.pinchStartLen),
                  this.pinch.dispatch(e, this.element)),
                (e.angle = R(r, t)),
                this.rotate.dispatch(e, this.element)),
                (t.x = r.x),
                (t.y = r.y),
                null !== this.x2 && null !== this.sx2
                  ? ((e.deltaX = (n - this.x2 + l - this.sx2) / 2),
                    (e.deltaY = (s - this.y2 + o - this.sy2) / 2))
                  : ((e.deltaX = 0), (e.deltaY = 0)),
                this.twoFingerPressMove.dispatch(e, this.element),
                (this.sx2 = l),
                (this.sy2 = o));
            } else {
              if (null !== this.x2) {
                ((e.deltaX = n - this.x2), (e.deltaY = s - this.y2));
                var a = Math.abs(this.x1 - this.x2),
                  h = Math.abs(this.y1 - this.y2);
                (a > 10 || h > 10) && (this._preventTap = !0);
              } else ((e.deltaX = 0), (e.deltaY = 0));
              this.pressMove.dispatch(e, this.element);
            }
            (this.touchMove.dispatch(e, this.element),
              this._cancelLongTap(),
              (this.x2 = n),
              (this.y2 = s),
              i > 1 && e.preventDefault());
          }
        },
      },
      {
        key: "end",
        value: function (e) {
          if (e.changedTouches) {
            this._cancelLongTap();
            var t = this;
            (e.touches.length < 2 &&
              (this.multipointEnd.dispatch(e, this.element),
              (this.sx2 = this.sy2 = null)),
              (this.x2 && Math.abs(this.x1 - this.x2) > 30) ||
              (this.y2 && Math.abs(this.y1 - this.y2) > 30)
                ? ((e.direction = this._swipeDirection(
                    this.x1,
                    this.x2,
                    this.y1,
                    this.y2,
                  )),
                  (this.swipeTimeout = setTimeout(function () {
                    t.swipe.dispatch(e, t.element);
                  }, 0)))
                : ((this.tapTimeout = setTimeout(function () {
                    (t._preventTap || t.tap.dispatch(e, t.element),
                      t.isDoubleTap &&
                        (t.doubleTap.dispatch(e, t.element),
                        (t.isDoubleTap = !1)));
                  }, 0)),
                  t.isDoubleTap ||
                    (t.singleTapTimeout = setTimeout(function () {
                      t.singleTap.dispatch(e, t.element);
                    }, 250))),
              this.touchEnd.dispatch(e, this.element),
              (this.preV.x = 0),
              (this.preV.y = 0),
              (this.zoom = 1),
              (this.pinchStartLen = null),
              (this.x1 = this.x2 = this.y1 = this.y2 = null));
          }
        },
      },
      {
        key: "cancelAll",
        value: function () {
          ((this._preventTap = !0),
            clearTimeout(this.singleTapTimeout),
            clearTimeout(this.tapTimeout),
            clearTimeout(this.longTapTimeout),
            clearTimeout(this.swipeTimeout));
        },
      },
      {
        key: "cancel",
        value: function (e) {
          (this.cancelAll(), this.touchCancel.dispatch(e, this.element));
        },
      },
      {
        key: "_cancelLongTap",
        value: function () {
          clearTimeout(this.longTapTimeout);
        },
      },
      {
        key: "_cancelSingleTap",
        value: function () {
          clearTimeout(this.singleTapTimeout);
        },
      },
      {
        key: "_swipeDirection",
        value: function (e, t, i, n) {
          return Math.abs(e - t) >= Math.abs(i - n)
            ? e - t > 0
              ? "Left"
              : "Right"
            : i - n > 0
              ? "Up"
              : "Down";
        },
      },
      {
        key: "on",
        value: function (e, t) {
          this[e] && this[e].add(t);
        },
      },
      {
        key: "off",
        value: function (e, t) {
          this[e] && this[e].del(t);
        },
      },
      {
        key: "destroy",
        value: function () {
          return (
            this.singleTapTimeout && clearTimeout(this.singleTapTimeout),
            this.tapTimeout && clearTimeout(this.tapTimeout),
            this.longTapTimeout && clearTimeout(this.longTapTimeout),
            this.swipeTimeout && clearTimeout(this.swipeTimeout),
            this.element.removeEventListener("touchstart", this.start),
            this.element.removeEventListener("touchmove", this.move),
            this.element.removeEventListener("touchend", this.end),
            this.element.removeEventListener("touchcancel", this.cancel),
            this.rotate.del(),
            this.touchStart.del(),
            this.multipointStart.del(),
            this.multipointEnd.del(),
            this.pinch.del(),
            this.swipe.del(),
            this.tap.del(),
            this.doubleTap.del(),
            this.longTap.del(),
            this.singleTap.del(),
            this.pressMove.del(),
            this.twoFingerPressMove.del(),
            this.touchMove.del(),
            this.touchEnd.del(),
            this.touchCancel.del(),
            (this.preV =
              this.pinchStartLen =
              this.zoom =
              this.isDoubleTap =
              this.delta =
              this.last =
              this.now =
              this.tapTimeout =
              this.singleTapTimeout =
              this.longTapTimeout =
              this.swipeTimeout =
              this.x1 =
              this.x2 =
              this.y1 =
              this.y2 =
              this.preTapPosition =
              this.rotate =
              this.touchStart =
              this.multipointStart =
              this.multipointEnd =
              this.pinch =
              this.swipe =
              this.tap =
              this.doubleTap =
              this.longTap =
              this.singleTap =
              this.pressMove =
              this.touchMove =
              this.touchEnd =
              this.touchCancel =
              this.twoFingerPressMove =
                null),
            window.removeEventListener("scroll", this._cancelAllHandler),
            null
          );
        },
      },
    ],
  );
  function $(e) {
    var t = (function () {
        var e,
          t = document.createElement("fakeelement"),
          i = {
            transition: "transitionend",
            OTransition: "oTransitionEnd",
            MozTransition: "transitionend",
            WebkitTransition: "webkitTransitionEnd",
          };
        for (e in i) if (void 0 !== t.style[e]) return i[e];
      })(),
      i =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth,
      n = u(e, "gslide-media") ? e : e.querySelector(".gslide-media"),
      s = g(n, ".ginner-container"),
      l = e.querySelector(".gslide-description");
    (i > 769 && (n = s),
      d(n, "greset"),
      f(n, "translate3d(0, 0, 0)"),
      h(t, {
        onElement: n,
        once: !0,
        withCallback: function (e, t) {
          c(n, "greset");
        },
      }),
      (n.style.opacity = ""),
      l && (l.style.opacity = ""));
  }
  function J(e) {
    if (e.events.hasOwnProperty("touch")) return !1;
    var t,
      i,
      n,
      s = x(),
      l = s.width,
      o = s.height,
      r = !1,
      a = null,
      h = null,
      v = null,
      p = !1,
      m = 1,
      y = 1,
      b = !1,
      S = !1,
      w = null,
      T = null,
      C = null,
      k = null,
      E = 0,
      A = 0,
      L = !1,
      I = !1,
      O = {},
      P = {},
      M = 0,
      z = 0,
      X = document.getElementById("glightbox-slider"),
      Y = document.querySelector(".goverlay"),
      q = new U(X, {
        touchStart: function (t) {
          if (
            ((r = !0),
            (u(t.targetTouches[0].target, "ginner-container") ||
              g(t.targetTouches[0].target, ".gslide-desc") ||
              "a" == t.targetTouches[0].target.nodeName.toLowerCase()) &&
              (r = !1),
            g(t.targetTouches[0].target, ".gslide-inline") &&
              !u(t.targetTouches[0].target.parentNode, "gslide-inline") &&
              (r = !1),
            r)
          ) {
            if (
              ((P = t.targetTouches[0]),
              (O.pageX = t.targetTouches[0].pageX),
              (O.pageY = t.targetTouches[0].pageY),
              (M = t.targetTouches[0].clientX),
              (z = t.targetTouches[0].clientY),
              (a = e.activeSlide),
              (h = a.querySelector(".gslide-media")),
              (n = a.querySelector(".gslide-inline")),
              (v = null),
              u(h, "gslide-image") && (v = h.querySelector("img")),
              (window.innerWidth ||
                document.documentElement.clientWidth ||
                document.body.clientWidth) > 769 &&
                (h = a.querySelector(".ginner-container")),
              c(Y, "greset"),
              t.pageX > 20 && t.pageX < window.innerWidth - 20)
            )
              return;
            t.preventDefault();
          }
        },
        touchMove: function (s) {
          if (r && ((P = s.targetTouches[0]), !b && !S)) {
            if (n && n.offsetHeight > o) {
              var a = O.pageX - P.pageX;
              if (Math.abs(a) <= 13) return !1;
            }
            p = !0;
            var d,
              c = s.targetTouches[0].clientX,
              u = s.targetTouches[0].clientY,
              g = M - c,
              m = z - u;
            if (
              (Math.abs(g) > Math.abs(m)
                ? ((L = !1), (I = !0))
                : ((I = !1), (L = !0)),
              (t = P.pageX - O.pageX),
              (E = (100 * t) / l),
              (i = P.pageY - O.pageY),
              (A = (100 * i) / o),
              L &&
                v &&
                ((d = 1 - Math.abs(i) / o),
                (Y.style.opacity = d),
                e.settings.touchFollowAxis && (E = 0)),
              I &&
                ((d = 1 - Math.abs(t) / l),
                (h.style.opacity = d),
                e.settings.touchFollowAxis && (A = 0)),
              !v)
            )
              return f(h, "translate3d(".concat(E, "%, 0, 0)"));
            f(h, "translate3d(".concat(E, "%, ").concat(A, "%, 0)"));
          }
        },
        touchEnd: function () {
          if (r) {
            if (((p = !1), S || b)) return ((C = w), void (k = T));
            var t = Math.abs(parseInt(A)),
              i = Math.abs(parseInt(E));
            if (!(t > 29 && v))
              return t < 29 && i < 25
                ? (d(Y, "greset"), (Y.style.opacity = 1), $(h))
                : void 0;
            e.close();
          }
        },
        multipointEnd: function () {
          setTimeout(function () {
            b = !1;
          }, 50);
        },
        multipointStart: function () {
          ((b = !0), (m = y || 1));
        },
        pinch: function (e) {
          if (!v || p) return !1;
          ((b = !0), (v.scaleX = v.scaleY = m * e.zoom));
          var t = m * e.zoom;
          if (((S = !0), t <= 1))
            return (
              (S = !1),
              (t = 1),
              (k = null),
              (C = null),
              (w = null),
              (T = null),
              void v.setAttribute("style", "")
            );
          (t > 4.5 && (t = 4.5),
            (v.style.transform = "scale3d(".concat(t, ", ").concat(t, ", 1)")),
            (y = t));
        },
        pressMove: function (e) {
          if (S && !b) {
            var t = P.pageX - O.pageX,
              i = P.pageY - O.pageY;
            (C && (t += C), k && (i += k), (w = t), (T = i));
            var n = "translate3d(".concat(t, "px, ").concat(i, "px, 0)");
            (y && (n += " scale3d(".concat(y, ", ").concat(y, ", 1)")),
              f(v, n));
          }
        },
        swipe: function (t) {
          if (!S)
            if (b) b = !1;
            else {
              if ("Left" == t.direction) {
                if (e.index == e.elements.length - 1) return $(h);
                e.nextSlide();
              }
              if ("Right" == t.direction) {
                if (0 == e.index) return $(h);
                e.prevSlide();
              }
            }
        },
      });
    e.events.touch = q;
  }
  var K = T(),
    Q =
      null !== T() ||
      void 0 !== document.createTouch ||
      "ontouchstart" in window ||
      "onmsgesturechange" in window ||
      navigator.msMaxTouchPoints,
    ee = document.getElementsByTagName("html")[0],
    te = {
      selector: ".glightbox",
      elements: null,
      skin: "clean",
      theme: "clean",
      closeButton: !0,
      startAt: null,
      autoplayVideos: !0,
      autofocusVideos: !0,
      descPosition: "bottom",
      width: "900px",
      height: "506px",
      videosWidth: "960px",
      beforeSlideChange: null,
      afterSlideChange: null,
      beforeSlideLoad: null,
      afterSlideLoad: null,
      slideInserted: null,
      slideRemoved: null,
      slideExtraAttributes: null,
      onOpen: null,
      onClose: null,
      loop: !1,
      zoomable: !0,
      draggable: !0,
      dragAutoSnap: !1,
      dragToleranceX: 40,
      dragToleranceY: 65,
      preload: !0,
      oneSlidePerOpen: !1,
      touchNavigation: !0,
      touchFollowAxis: !0,
      keyboardNavigation: !0,
      closeOnOutsideClick: !0,
      plugins: !1,
      plyr: {
        css: "https://cdn.plyr.io/3.6.12/plyr.css",
        js: "https://cdn.plyr.io/3.6.12/plyr.js",
        config: {
          ratio: "16:9",
          fullscreen: { enabled: !0, iosNative: !0 },
          youtube: { noCookie: !0, rel: 0, showinfo: 0, iv_load_policy: 3 },
          vimeo: { byline: !1, portrait: !1, title: !1, transparent: !1 },
        },
      },
      openEffect: "zoom",
      closeEffect: "zoom",
      slideEffect: "slide",
      moreText: "See more",
      moreLength: 60,
      cssEfects: {
        fade: { in: "fadeIn", out: "fadeOut" },
        zoom: { in: "zoomIn", out: "zoomOut" },
        slide: { in: "slideInRight", out: "slideOutLeft" },
        slideBack: { in: "slideInLeft", out: "slideOutRight" },
        none: { in: "none", out: "none" },
      },
      svg: {
        close:
          '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve"><g><g><path d="M505.943,6.058c-8.077-8.077-21.172-8.077-29.249,0L6.058,476.693c-8.077,8.077-8.077,21.172,0,29.249C10.096,509.982,15.39,512,20.683,512c5.293,0,10.586-2.019,14.625-6.059L505.943,35.306C514.019,27.23,514.019,14.135,505.943,6.058z"/></g></g><g><g><path d="M505.942,476.694L35.306,6.059c-8.076-8.077-21.172-8.077-29.248,0c-8.077,8.076-8.077,21.171,0,29.248l470.636,470.636c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.624-6.057C514.018,497.866,514.018,484.771,505.942,476.694z"/></g></g></svg>',
        next: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"> <g><path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z"/></g></svg>',
        prev: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"><g><path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"/></g></svg>',
      },
      slideHTML:
        '<div class="gslide">\n    <div class="gslide-inner-content">\n        <div class="ginner-container">\n            <div class="gslide-media">\n            </div>\n            <div class="gslide-description">\n                <div class="gdesc-inner">\n                    <h4 class="gslide-title"></h4>\n                    <div class="gslide-desc"></div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>',
      lightboxHTML:
        '<div id="glightbox-body" class="glightbox-container" tabindex="-1" role="dialog" aria-hidden="false">\n    <div class="gloader visible"></div>\n    <div class="goverlay"></div>\n    <div class="gcontainer">\n    <div id="glightbox-slider" class="gslider"></div>\n    <button class="gclose gbtn" aria-label="Close" data-taborder="3">{closeSVG}</button>\n    <button class="gprev gbtn" aria-label="Previous" data-taborder="2">{prevSVG}</button>\n    <button class="gnext gbtn" aria-label="Next" data-taborder="1">{nextSVG}</button>\n</div>\n</div>',
    },
    ie = i(
      function t() {
        var i =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        (e(this, t),
          (this.customOptions = i),
          (this.settings = o(te, i)),
          (this.effectsClasses = this.getAnimationClasses()),
          (this.videoPlayers = {}),
          (this.apiEvents = []),
          (this.fullElementsList = !1));
      },
      [
        {
          key: "init",
          value: function () {
            var e = this,
              t = this.getSelector();
            (t &&
              (this.baseEvents = h("click", {
                onElement: t,
                withCallback: function (t, i) {
                  (t.preventDefault(), e.open(i));
                },
              })),
              (this.elements = this.getElements()));
          },
        },
        {
          key: "open",
          value: function () {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : null,
              t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : null;
            if (0 === this.elements.length) return !1;
            ((this.activeSlide = null),
              (this.prevActiveSlideIndex = null),
              (this.prevActiveSlide = null));
            var i = z(t) ? t : this.settings.startAt;
            if (E(e)) {
              var n = e.getAttribute("data-gallery");
              (n &&
                ((this.fullElementsList = this.elements),
                (this.elements = this.getGalleryElements(this.elements, n))),
                O(i) && (i = this.getElementIndex(e)) < 0 && (i = 0));
            }
            (z(i) || (i = 0),
              this.build(),
              v(
                this.overlay,
                "none" === this.settings.openEffect
                  ? "none"
                  : this.settings.cssEfects.fade.in,
              ));
            var s = document.body,
              l = window.innerWidth - document.documentElement.clientWidth;
            if (l > 0) {
              var o = document.createElement("style");
              ((o.type = "text/css"),
                (o.className = "gcss-styles"),
                (o.innerText = ".gscrollbar-fixer {margin-right: ".concat(
                  l,
                  "px}",
                )),
                document.head.appendChild(o),
                d(s, "gscrollbar-fixer"));
            }
            (d(s, "glightbox-open"),
              d(ee, "glightbox-open"),
              K &&
                (d(document.body, "glightbox-mobile"),
                (this.settings.slideEffect = "slide")),
              this.showSlide(i, !0),
              1 === this.elements.length
                ? (d(this.prevButton, "glightbox-button-hidden"),
                  d(this.nextButton, "glightbox-button-hidden"))
                : (c(this.prevButton, "glightbox-button-hidden"),
                  c(this.nextButton, "glightbox-button-hidden")),
              (this.lightboxOpen = !0),
              this.trigger("open"),
              C(this.settings.onOpen) && this.settings.onOpen(),
              Q && this.settings.touchNavigation && J(this),
              this.settings.keyboardNavigation && Y(this));
          },
        },
        {
          key: "openAt",
          value: function () {
            var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : 0;
            this.open(null, e);
          },
        },
        {
          key: "showSlide",
          value: function () {
            var e = this,
              t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : 0,
              i =
                arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            (p(this.loader), (this.index = parseInt(t)));
            var n = this.slidesContainer.querySelector(".current");
            (n && c(n, "current"), this.slideAnimateOut());
            var s = this.slidesContainer.querySelectorAll(".gslide")[t];
            if (u(s, "loaded")) (this.slideAnimateIn(s, i), m(this.loader));
            else {
              p(this.loader);
              var l = this.elements[t],
                o = {
                  index: this.index,
                  slide: s,
                  slideNode: s,
                  slideConfig: l.slideConfig,
                  slideIndex: this.index,
                  trigger: l.node,
                  player: null,
                };
              (this.trigger("slide_before_load", o),
                l.instance.setContent(s, function () {
                  (m(e.loader),
                    e.resize(),
                    e.slideAnimateIn(s, i),
                    e.trigger("slide_after_load", o));
                }));
            }
            ((this.slideDescription = s.querySelector(".gslide-description")),
              (this.slideDescriptionContained =
                this.slideDescription &&
                u(this.slideDescription.parentNode, "gslide-media")),
              this.settings.preload &&
                (this.preloadSlide(t + 1), this.preloadSlide(t - 1)),
              this.updateNavigationClasses(),
              (this.activeSlide = s));
          },
        },
        {
          key: "preloadSlide",
          value: function (e) {
            var t = this;
            if (e < 0 || e > this.elements.length - 1) return !1;
            if (O(this.elements[e])) return !1;
            var i = this.slidesContainer.querySelectorAll(".gslide")[e];
            if (u(i, "loaded")) return !1;
            var n = this.elements[e],
              s = n.type,
              l = {
                index: e,
                slide: i,
                slideNode: i,
                slideConfig: n.slideConfig,
                slideIndex: e,
                trigger: n.node,
                player: null,
              };
            (this.trigger("slide_before_load", l),
              "video" === s || "external" === s
                ? setTimeout(function () {
                    n.instance.setContent(i, function () {
                      t.trigger("slide_after_load", l);
                    });
                  }, 200)
                : n.instance.setContent(i, function () {
                    t.trigger("slide_after_load", l);
                  }));
          },
        },
        {
          key: "prevSlide",
          value: function () {
            this.goToSlide(this.index - 1);
          },
        },
        {
          key: "nextSlide",
          value: function () {
            this.goToSlide(this.index + 1);
          },
        },
        {
          key: "goToSlide",
          value: function () {
            var e =
              arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            if (
              ((this.prevActiveSlide = this.activeSlide),
              (this.prevActiveSlideIndex = this.index),
              !this.loop() && (e < 0 || e > this.elements.length - 1))
            )
              return !1;
            (e < 0
              ? (e = this.elements.length - 1)
              : e >= this.elements.length && (e = 0),
              this.showSlide(e));
          },
        },
        {
          key: "insertSlide",
          value: function () {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : -1;
            t < 0 && (t = this.elements.length);
            var i = new V(e, this, t),
              n = i.getConfig(),
              s = o({}, n),
              l = i.create(),
              r = this.elements.length - 1;
            ((s.index = t),
              (s.node = !1),
              (s.instance = i),
              (s.slideConfig = n),
              this.elements.splice(t, 0, s));
            var a = null,
              h = null;
            if (this.slidesContainer) {
              if (t > r) this.slidesContainer.appendChild(l);
              else {
                var d = this.slidesContainer.querySelectorAll(".gslide")[t];
                this.slidesContainer.insertBefore(l, d);
              }
              (((this.settings.preload && 0 == this.index && 0 == t) ||
                this.index - 1 == t ||
                this.index + 1 == t) &&
                this.preloadSlide(t),
                0 === this.index && 0 === t && (this.index = 1),
                this.updateNavigationClasses(),
                (a = this.slidesContainer.querySelectorAll(".gslide")[t]),
                (h = this.getSlidePlayerInstance(t)),
                (s.slideNode = a));
            }
            (this.trigger("slide_inserted", {
              index: t,
              slide: a,
              slideNode: a,
              slideConfig: n,
              slideIndex: t,
              trigger: null,
              player: h,
            }),
              C(this.settings.slideInserted) &&
                this.settings.slideInserted({ index: t, slide: a, player: h }));
          },
        },
        {
          key: "removeSlide",
          value: function () {
            var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : -1;
            if (e < 0 || e > this.elements.length - 1) return !1;
            var t =
              this.slidesContainer &&
              this.slidesContainer.querySelectorAll(".gslide")[e];
            (t &&
              (this.getActiveSlideIndex() == e &&
                (e == this.elements.length - 1
                  ? this.prevSlide()
                  : this.nextSlide()),
              t.parentNode.removeChild(t)),
              this.elements.splice(e, 1),
              this.trigger("slide_removed", e),
              C(this.settings.slideRemoved) && this.settings.slideRemoved(e));
          },
        },
        {
          key: "slideAnimateIn",
          value: function (e, t) {
            var i = this,
              n = e.querySelector(".gslide-media"),
              s = e.querySelector(".gslide-description"),
              l = {
                index: this.prevActiveSlideIndex,
                slide: this.prevActiveSlide,
                slideNode: this.prevActiveSlide,
                slideIndex: this.prevActiveSlide,
                slideConfig: O(this.prevActiveSlideIndex)
                  ? null
                  : this.elements[this.prevActiveSlideIndex].slideConfig,
                trigger: O(this.prevActiveSlideIndex)
                  ? null
                  : this.elements[this.prevActiveSlideIndex].node,
                player: this.getSlidePlayerInstance(this.prevActiveSlideIndex),
              },
              o = {
                index: this.index,
                slide: this.activeSlide,
                slideNode: this.activeSlide,
                slideConfig: this.elements[this.index].slideConfig,
                slideIndex: this.index,
                trigger: this.elements[this.index].node,
                player: this.getSlidePlayerInstance(this.index),
              };
            if (
              (n.offsetWidth > 0 && s && (m(s), (s.style.display = "")),
              c(e, this.effectsClasses),
              t)
            )
              v(
                e,
                this.settings.cssEfects[this.settings.openEffect].in,
                function () {
                  (i.settings.autoplayVideos && i.slidePlayerPlay(e),
                    i.trigger("slide_changed", { prev: l, current: o }),
                    C(i.settings.afterSlideChange) &&
                      i.settings.afterSlideChange.apply(i, [l, o]));
                },
              );
            else {
              var r = this.settings.slideEffect,
                a = "none" !== r ? this.settings.cssEfects[r].in : r;
              (this.prevActiveSlideIndex > this.index &&
                "slide" == this.settings.slideEffect &&
                (a = this.settings.cssEfects.slideBack.in),
                v(e, a, function () {
                  (i.settings.autoplayVideos && i.slidePlayerPlay(e),
                    i.trigger("slide_changed", { prev: l, current: o }),
                    C(i.settings.afterSlideChange) &&
                      i.settings.afterSlideChange.apply(i, [l, o]));
                }));
            }
            (setTimeout(function () {
              i.resize(e);
            }, 100),
              d(e, "current"));
          },
        },
        {
          key: "slideAnimateOut",
          value: function () {
            if (!this.prevActiveSlide) return !1;
            var e = this.prevActiveSlide;
            (c(e, this.effectsClasses), d(e, "prev"));
            var t = this.settings.slideEffect,
              i = "none" !== t ? this.settings.cssEfects[t].out : t;
            (this.slidePlayerPause(e),
              this.trigger("slide_before_change", {
                prev: {
                  index: this.prevActiveSlideIndex,
                  slide: this.prevActiveSlide,
                  slideNode: this.prevActiveSlide,
                  slideIndex: this.prevActiveSlideIndex,
                  slideConfig: O(this.prevActiveSlideIndex)
                    ? null
                    : this.elements[this.prevActiveSlideIndex].slideConfig,
                  trigger: O(this.prevActiveSlideIndex)
                    ? null
                    : this.elements[this.prevActiveSlideIndex].node,
                  player: this.getSlidePlayerInstance(
                    this.prevActiveSlideIndex,
                  ),
                },
                current: {
                  index: this.index,
                  slide: this.activeSlide,
                  slideNode: this.activeSlide,
                  slideIndex: this.index,
                  slideConfig: this.elements[this.index].slideConfig,
                  trigger: this.elements[this.index].node,
                  player: this.getSlidePlayerInstance(this.index),
                },
              }),
              C(this.settings.beforeSlideChange) &&
                this.settings.beforeSlideChange.apply(this, [
                  {
                    index: this.prevActiveSlideIndex,
                    slide: this.prevActiveSlide,
                    player: this.getSlidePlayerInstance(
                      this.prevActiveSlideIndex,
                    ),
                  },
                  {
                    index: this.index,
                    slide: this.activeSlide,
                    player: this.getSlidePlayerInstance(this.index),
                  },
                ]),
              this.prevActiveSlideIndex > this.index &&
                "slide" == this.settings.slideEffect &&
                (i = this.settings.cssEfects.slideBack.out),
              v(e, i, function () {
                var t = e.querySelector(".ginner-container"),
                  i = e.querySelector(".gslide-media"),
                  n = e.querySelector(".gslide-description");
                ((t.style.transform = ""),
                  (i.style.transform = ""),
                  c(i, "greset"),
                  (i.style.opacity = ""),
                  n && (n.style.opacity = ""),
                  c(e, "prev"));
              }));
          },
        },
        {
          key: "getAllPlayers",
          value: function () {
            return this.videoPlayers;
          },
        },
        {
          key: "getSlidePlayerInstance",
          value: function (e) {
            var t = "gvideo" + e,
              i = this.getAllPlayers();
            return !(!P(i, t) || !i[t]) && i[t];
          },
        },
        {
          key: "stopSlideVideo",
          value: function (e) {
            if (E(e)) {
              var t = e.querySelector(".gvideo-wrapper");
              t && (e = t.getAttribute("data-index"));
            }
            console.log("stopSlideVideo is deprecated, use slidePlayerPause");
            var i = this.getSlidePlayerInstance(e);
            i && i.playing && i.pause();
          },
        },
        {
          key: "slidePlayerPause",
          value: function (e) {
            if (E(e)) {
              var t = e.querySelector(".gvideo-wrapper");
              t && (e = t.getAttribute("data-index"));
            }
            var i = this.getSlidePlayerInstance(e);
            i && i.playing && i.pause();
          },
        },
        {
          key: "playSlideVideo",
          value: function (e) {
            if (E(e)) {
              var t = e.querySelector(".gvideo-wrapper");
              t && (e = t.getAttribute("data-index"));
            }
            console.log("playSlideVideo is deprecated, use slidePlayerPlay");
            var i = this.getSlidePlayerInstance(e);
            i && !i.playing && i.play();
          },
        },
        {
          key: "slidePlayerPlay",
          value: function (e) {
            var t;
            if (
              !K ||
              (null !== (t = this.settings.plyr.config) &&
                void 0 !== t &&
                t.muted)
            ) {
              if (E(e)) {
                var i = e.querySelector(".gvideo-wrapper");
                i && (e = i.getAttribute("data-index"));
              }
              var n = this.getSlidePlayerInstance(e);
              n &&
                !n.playing &&
                (n.play(),
                this.settings.autofocusVideos && n.elements.container.focus());
            }
          },
        },
        {
          key: "setElements",
          value: function (e) {
            var t = this;
            this.settings.elements = !1;
            var i = [];
            (e &&
              e.length &&
              r(e, function (e, n) {
                var s = new V(e, t, n),
                  l = s.getConfig(),
                  r = o({}, l);
                ((r.slideConfig = l),
                  (r.instance = s),
                  (r.index = n),
                  i.push(r));
              }),
              (this.elements = i),
              this.lightboxOpen &&
                ((this.slidesContainer.innerHTML = ""),
                this.elements.length &&
                  (r(this.elements, function () {
                    var e = y(t.settings.slideHTML);
                    t.slidesContainer.appendChild(e);
                  }),
                  this.showSlide(0, !0))));
          },
        },
        {
          key: "getElementIndex",
          value: function (e) {
            var t = !1;
            return (
              r(this.elements, function (i, n) {
                if (P(i, "node") && i.node == e) return ((t = n), !0);
              }),
              t
            );
          },
        },
        {
          key: "getElements",
          value: function () {
            var e = this,
              t = [];
            ((this.elements = this.elements ? this.elements : []),
              !O(this.settings.elements) &&
                A(this.settings.elements) &&
                this.settings.elements.length &&
                r(this.settings.elements, function (i, n) {
                  var s = new V(i, e, n),
                    l = s.getConfig(),
                    r = o({}, l);
                  ((r.node = !1),
                    (r.index = n),
                    (r.instance = s),
                    (r.slideConfig = l),
                    t.push(r));
                }));
            var i = !1;
            return (
              this.getSelector() &&
                (i = document.querySelectorAll(this.getSelector())),
              i
                ? (r(i, function (i, n) {
                    var s = new V(i, e, n),
                      l = s.getConfig(),
                      r = o({}, l);
                    ((r.node = i),
                      (r.index = n),
                      (r.instance = s),
                      (r.slideConfig = l),
                      (r.gallery = i.getAttribute("data-gallery")),
                      t.push(r));
                  }),
                  t)
                : t
            );
          },
        },
        {
          key: "getGalleryElements",
          value: function (e, t) {
            return e.filter(function (e) {
              return e.gallery == t;
            });
          },
        },
        {
          key: "getSelector",
          value: function () {
            return (
              !this.settings.elements &&
              (this.settings.selector &&
              "data-" == this.settings.selector.substring(0, 5)
                ? "*[".concat(this.settings.selector, "]")
                : this.settings.selector)
            );
          },
        },
        {
          key: "getActiveSlide",
          value: function () {
            return this.slidesContainer.querySelectorAll(".gslide")[this.index];
          },
        },
        {
          key: "getActiveSlideIndex",
          value: function () {
            return this.index;
          },
        },
        {
          key: "getAnimationClasses",
          value: function () {
            var e = [];
            for (var t in this.settings.cssEfects)
              if (this.settings.cssEfects.hasOwnProperty(t)) {
                var i = this.settings.cssEfects[t];
                (e.push("g".concat(i.in)), e.push("g".concat(i.out)));
              }
            return e.join(" ");
          },
        },
        {
          key: "build",
          value: function () {
            var e = this;
            if (this.built) return !1;
            var t = document.body.childNodes,
              i = [];
            r(t, function (e) {
              e.parentNode == document.body &&
                "#" !== e.nodeName.charAt(0) &&
                e.hasAttribute &&
                !e.hasAttribute("aria-hidden") &&
                (i.push(e), e.setAttribute("aria-hidden", "true"));
            });
            var n = P(this.settings.svg, "next") ? this.settings.svg.next : "",
              s = P(this.settings.svg, "prev") ? this.settings.svg.prev : "",
              l = P(this.settings.svg, "close") ? this.settings.svg.close : "",
              o = this.settings.lightboxHTML;
            ((o = y(
              (o = (o = (o = o.replace(/{nextSVG}/g, n)).replace(
                /{prevSVG}/g,
                s,
              )).replace(/{closeSVG}/g, l)),
            )),
              document.body.appendChild(o));
            var a = document.getElementById("glightbox-body");
            this.modal = a;
            var c = a.querySelector(".gclose");
            ((this.prevButton = a.querySelector(".gprev")),
              (this.nextButton = a.querySelector(".gnext")),
              (this.overlay = a.querySelector(".goverlay")),
              (this.loader = a.querySelector(".gloader")),
              (this.slidesContainer =
                document.getElementById("glightbox-slider")),
              (this.bodyHiddenChildElms = i),
              (this.events = {}),
              d(this.modal, "glightbox-" + this.settings.skin),
              this.settings.closeButton &&
                c &&
                (this.events.close = h("click", {
                  onElement: c,
                  withCallback: function (t, i) {
                    (t.preventDefault(), e.close());
                  },
                })),
              c && !this.settings.closeButton && c.parentNode.removeChild(c),
              this.nextButton &&
                (this.events.next = h("click", {
                  onElement: this.nextButton,
                  withCallback: function (t, i) {
                    (t.preventDefault(), e.nextSlide());
                  },
                })),
              this.prevButton &&
                (this.events.prev = h("click", {
                  onElement: this.prevButton,
                  withCallback: function (t, i) {
                    (t.preventDefault(), e.prevSlide());
                  },
                })),
              this.settings.closeOnOutsideClick &&
                (this.events.outClose = h("click", {
                  onElement: a,
                  withCallback: function (t, i) {
                    e.preventOutsideClick ||
                      u(document.body, "glightbox-mobile") ||
                      g(t.target, ".ginner-container") ||
                      g(t.target, ".gbtn") ||
                      u(t.target, "gnext") ||
                      u(t.target, "gprev") ||
                      e.close();
                  },
                })),
              r(this.elements, function (t, i) {
                (e.slidesContainer.appendChild(t.instance.create()),
                  (t.slideNode =
                    e.slidesContainer.querySelectorAll(".gslide")[i]));
              }),
              Q && d(document.body, "glightbox-touch"),
              (this.events.resize = h("resize", {
                onElement: window,
                withCallback: function () {
                  e.resize();
                },
              })),
              (this.built = !0));
          },
        },
        {
          key: "resize",
          value: function () {
            var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : null;
            if ((e = e || this.activeSlide) && !u(e, "zoomed")) {
              var t = x(),
                i = e.querySelector(".gvideo-wrapper"),
                n = e.querySelector(".gslide-image"),
                s = this.slideDescription,
                l = t.width,
                o = t.height;
              if (
                (l <= 768
                  ? d(document.body, "glightbox-mobile")
                  : c(document.body, "glightbox-mobile"),
                i || n)
              ) {
                var r = !1;
                if (
                  (s &&
                    (u(s, "description-bottom") || u(s, "description-top")) &&
                    !u(s, "gabsolute") &&
                    (r = !0),
                  n)
                )
                  if (l <= 768) n.querySelector("img");
                  else if (r) {
                    var a,
                      h,
                      g = s.offsetHeight,
                      v = n.querySelector("img"),
                      f =
                        null === (a = this.elements[this.index]) || void 0 === a
                          ? void 0
                          : a.node,
                      p = "100vh";
                    (f &&
                      (p =
                        null !== (h = f.getAttribute("data-height")) &&
                        void 0 !== h
                          ? h
                          : p),
                      v.setAttribute(
                        "style",
                        "max-height: calc(".concat(p, " - ").concat(g, "px)"),
                      ),
                      s.setAttribute(
                        "style",
                        "max-width: ".concat(v.offsetWidth, "px;"),
                      ));
                  }
                if (i) {
                  var m = P(this.settings.plyr.config, "ratio")
                    ? this.settings.plyr.config.ratio
                    : "";
                  if (!m) {
                    var y = i.clientWidth,
                      b = i.clientHeight,
                      S = y / b;
                    m = "".concat(y / S, ":").concat(b / S);
                  }
                  var w = m.split(":"),
                    T = this.settings.videosWidth,
                    C = this.settings.videosWidth,
                    k =
                      (C =
                        z(T) || -1 !== T.indexOf("px")
                          ? parseInt(T)
                          : -1 !== T.indexOf("vw")
                            ? (l * parseInt(T)) / 100
                            : -1 !== T.indexOf("vh")
                              ? (o * parseInt(T)) / 100
                              : -1 !== T.indexOf("%")
                                ? (l * parseInt(T)) / 100
                                : parseInt(i.clientWidth)) /
                      (parseInt(w[0]) / parseInt(w[1]));
                  if (
                    ((k = Math.floor(k)),
                    r && (o -= s.offsetHeight),
                    C > l || k > o || (o < k && l > C))
                  ) {
                    var E = i.offsetWidth,
                      A = i.offsetHeight,
                      L = o / A,
                      I = { width: E * L, height: A * L };
                    (i.parentNode.setAttribute(
                      "style",
                      "max-width: ".concat(I.width, "px"),
                    ),
                      r &&
                        s.setAttribute(
                          "style",
                          "max-width: ".concat(I.width, "px;"),
                        ));
                  } else
                    ((i.parentNode.style.maxWidth = "".concat(T)),
                      r &&
                        s.setAttribute("style", "max-width: ".concat(T, ";")));
                }
              }
            }
          },
        },
        {
          key: "reload",
          value: function () {
            this.init();
          },
        },
        {
          key: "updateNavigationClasses",
          value: function () {
            var e = this.loop();
            (c(this.nextButton, "disabled"),
              c(this.prevButton, "disabled"),
              0 == this.index && this.elements.length - 1 == 0
                ? (d(this.prevButton, "disabled"),
                  d(this.nextButton, "disabled"))
                : 0 !== this.index || e
                  ? this.index !== this.elements.length - 1 ||
                    e ||
                    d(this.nextButton, "disabled")
                  : d(this.prevButton, "disabled"));
          },
        },
        {
          key: "loop",
          value: function () {
            var e = P(this.settings, "loopAtEnd")
              ? this.settings.loopAtEnd
              : null;
            return ((e = P(this.settings, "loop") ? this.settings.loop : e), e);
          },
        },
        {
          key: "close",
          value: function () {
            var e = this;
            if (!this.lightboxOpen) {
              if (this.events) {
                for (var t in this.events)
                  this.events.hasOwnProperty(t) && this.events[t].destroy();
                this.events = null;
              }
              return !1;
            }
            if (this.closing) return !1;
            ((this.closing = !0),
              this.slidePlayerPause(this.activeSlide),
              this.fullElementsList && (this.elements = this.fullElementsList),
              this.bodyHiddenChildElms.length &&
                r(this.bodyHiddenChildElms, function (e) {
                  e.removeAttribute("aria-hidden");
                }),
              d(this.modal, "glightbox-closing"),
              v(
                this.overlay,
                "none" == this.settings.openEffect
                  ? "none"
                  : this.settings.cssEfects.fade.out,
              ),
              v(
                this.activeSlide,
                this.settings.cssEfects[this.settings.closeEffect].out,
                function () {
                  if (
                    ((e.activeSlide = null),
                    (e.prevActiveSlideIndex = null),
                    (e.prevActiveSlide = null),
                    (e.built = !1),
                    e.events)
                  ) {
                    for (var t in e.events)
                      e.events.hasOwnProperty(t) && e.events[t].destroy();
                    e.events = null;
                  }
                  var i = document.body;
                  (c(ee, "glightbox-open"),
                    c(
                      i,
                      "glightbox-open touching gdesc-open glightbox-touch glightbox-mobile gscrollbar-fixer",
                    ),
                    e.modal.parentNode.removeChild(e.modal),
                    e.trigger("close"),
                    C(e.settings.onClose) && e.settings.onClose());
                  var n = document.querySelector(".gcss-styles");
                  (n && n.parentNode.removeChild(n),
                    (e.lightboxOpen = !1),
                    (e.closing = null));
                },
              ));
          },
        },
        {
          key: "destroy",
          value: function () {
            (this.close(),
              this.clearAllEvents(),
              this.baseEvents && this.baseEvents.destroy());
          },
        },
        {
          key: "on",
          value: function (e, t) {
            var i =
              arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            if (!e || !C(t))
              throw new TypeError("Event name and callback must be defined");
            this.apiEvents.push({ evt: e, once: i, callback: t });
          },
        },
        {
          key: "once",
          value: function (e, t) {
            this.on(e, t, !0);
          },
        },
        {
          key: "trigger",
          value: function (e) {
            var t = this,
              i =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : null,
              n = [];
            (r(this.apiEvents, function (t, s) {
              var l = t.evt,
                o = t.once,
                r = t.callback;
              l == e && (r(i), o && n.push(s));
            }),
              n.length &&
                r(n, function (e) {
                  return t.apiEvents.splice(e, 1);
                }));
          },
        },
        {
          key: "clearAllEvents",
          value: function () {
            this.apiEvents.splice(0, this.apiEvents.length);
          },
        },
        {
          key: "version",
          value: function () {
            return "3.3.1";
          },
        },
      ],
    );
  return function () {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
      t = new ie(e);
    return (t.init(), t);
  };
});
console.log(
  "%c emelecollab.com",
  "font-family:Arial, sans-serif; font-weight:600; color:#fff; background: #000; font-size:15px; text-transform: uppercase; padding: 20px 30px;",
);
