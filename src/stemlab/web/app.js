var Pf = { exports: {} }, Lu = {};
var Qh;
function vg() {
  if (Qh) return Lu;
  Qh = 1;
  var c = /* @__PURE__ */ Symbol.for("react.transitional.element"), o = /* @__PURE__ */ Symbol.for("react.fragment");
  function f(s, b, v) {
    var E = null;
    if (v !== void 0 && (E = "" + v), b.key !== void 0 && (E = "" + b.key), "key" in b) {
      v = {};
      for (var x in b)
        x !== "key" && (v[x] = b[x]);
    } else v = b;
    return b = v.ref, {
      $$typeof: c,
      type: s,
      key: E,
      ref: b !== void 0 ? b : null,
      props: v
    };
  }
  return Lu.Fragment = o, Lu.jsx = f, Lu.jsxs = f, Lu;
}
var Vh;
function yg() {
  return Vh || (Vh = 1, Pf.exports = vg()), Pf.exports;
}
var d = yg(), tr = { exports: {} }, mt = {};
var Zh;
function gg() {
  if (Zh) return mt;
  Zh = 1;
  var c = /* @__PURE__ */ Symbol.for("react.transitional.element"), o = /* @__PURE__ */ Symbol.for("react.portal"), f = /* @__PURE__ */ Symbol.for("react.fragment"), s = /* @__PURE__ */ Symbol.for("react.strict_mode"), b = /* @__PURE__ */ Symbol.for("react.profiler"), v = /* @__PURE__ */ Symbol.for("react.consumer"), E = /* @__PURE__ */ Symbol.for("react.context"), x = /* @__PURE__ */ Symbol.for("react.forward_ref"), j = /* @__PURE__ */ Symbol.for("react.suspense"), w = /* @__PURE__ */ Symbol.for("react.memo"), z = /* @__PURE__ */ Symbol.for("react.lazy"), h = /* @__PURE__ */ Symbol.for("react.activity"), A = /* @__PURE__ */ Symbol.for("react.view_transition"), L = Symbol.iterator;
  function Z(g) {
    return g === null || typeof g != "object" ? null : (g = L && g[L] || g["@@iterator"], typeof g == "function" ? g : null);
  }
  var at = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, W = Object.assign, Et = {};
  function ct(g, H, $) {
    this.props = g, this.context = H, this.refs = Et, this.updater = $ || at;
  }
  ct.prototype.isReactComponent = {}, ct.prototype.setState = function(g, H) {
    if (typeof g != "object" && typeof g != "function" && g != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, g, H, "setState");
  }, ct.prototype.forceUpdate = function(g) {
    this.updater.enqueueForceUpdate(this, g, "forceUpdate");
  };
  function Mt() {
  }
  Mt.prototype = ct.prototype;
  function Vt(g, H, $) {
    this.props = g, this.context = H, this.refs = Et, this.updater = $ || at;
  }
  var Ut = Vt.prototype = new Mt();
  Ut.constructor = Vt, W(Ut, ct.prototype), Ut.isPureReactComponent = !0;
  var zt = Array.isArray;
  function P() {
  }
  var tt = { H: null, A: null, T: null, S: null }, xt = Object.prototype.hasOwnProperty;
  function I(g, H, $) {
    var J = $.ref;
    return {
      $$typeof: c,
      type: g,
      key: H,
      ref: J !== void 0 ? J : null,
      props: $
    };
  }
  function nt(g, H) {
    return I(g.type, H, g.props);
  }
  function bt(g) {
    return typeof g == "object" && g !== null && g.$$typeof === c;
  }
  function Gt(g) {
    var H = { "=": "=0", ":": "=2" };
    return "$" + g.replace(/[=:]/g, function($) {
      return H[$];
    });
  }
  var Ft = /\/+/g;
  function ot(g, H) {
    return typeof g == "object" && g !== null && g.key != null ? Gt("" + g.key) : H.toString(36);
  }
  function R(g) {
    switch (g.status) {
      case "fulfilled":
        return g.value;
      case "rejected":
        throw g.reason;
      default:
        switch (typeof g.status == "string" ? g.then(P, P) : (g.status = "pending", g.then(
          function(H) {
            g.status === "pending" && (g.status = "fulfilled", g.value = H);
          },
          function(H) {
            g.status === "pending" && (g.status = "rejected", g.reason = H);
          }
        )), g.status) {
          case "fulfilled":
            return g.value;
          case "rejected":
            throw g.reason;
        }
    }
    throw g;
  }
  function Y(g, H, $, J, ht) {
    var dt = typeof g;
    (dt === "undefined" || dt === "boolean") && (g = null);
    var ut = !1;
    if (g === null) ut = !0;
    else
      switch (dt) {
        case "bigint":
        case "string":
        case "number":
          ut = !0;
          break;
        case "object":
          switch (g.$$typeof) {
            case c:
            case o:
              ut = !0;
              break;
            case z:
              return ut = g._init, Y(
                ut(g._payload),
                H,
                $,
                J,
                ht
              );
          }
      }
    if (ut)
      return ht = ht(g), ut = J === "" ? "." + ot(g, 0) : J, zt(ht) ? ($ = "", ut != null && ($ = ut.replace(Ft, "$&/") + "/"), Y(ht, H, $, "", function(Kt) {
        return Kt;
      })) : ht != null && (bt(ht) && (ht = nt(
        ht,
        $ + (ht.key == null || g && g.key === ht.key ? "" : ("" + ht.key).replace(
          Ft,
          "$&/"
        ) + "/") + ut
      )), H.push(ht)), 1;
    ut = 0;
    var V = J === "" ? "." : J + ":";
    if (zt(g))
      for (var k = 0; k < g.length; k++)
        J = g[k], dt = V + ot(J, k), ut += Y(
          J,
          H,
          $,
          dt,
          ht
        );
    else if (k = Z(g), typeof k == "function")
      for (g = k.call(g), k = 0; !(J = g.next()).done; )
        J = J.value, dt = V + ot(J, k++), ut += Y(
          J,
          H,
          $,
          dt,
          ht
        );
    else if (dt === "object") {
      if (typeof g.then == "function")
        return Y(
          R(g),
          H,
          $,
          J,
          ht
        );
      throw H = String(g), Error(
        "Objects are not valid as a React child (found: " + (H === "[object Object]" ? "object with keys {" + Object.keys(g).join(", ") + "}" : H) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ut;
  }
  function G(g, H, $) {
    if (g == null) return g;
    var J = [], ht = 0;
    return Y(g, J, "", "", function(dt) {
      return H.call($, dt, ht++);
    }), J;
  }
  function st(g) {
    if (g._status === -1) {
      var H = g._result, $ = H();
      $.then(
        function(J) {
          (g._status === 0 || g._status === -1) && (g._status = 1, g._result = J, $.status === void 0 && ($.status = "fulfilled", $.value = J));
        },
        function(J) {
          (g._status === 0 || g._status === -1) && (g._status = 2, g._result = J, $.status === void 0 && ($.status = "rejected", $.reason = J));
        }
      ), g._status === -1 && (g._status = 0, g._result = $);
    }
    if (g._status === 1) return g._result.default;
    throw g._result;
  }
  var ft = typeof reportError == "function" ? reportError : function(g) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var H = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof g == "object" && g !== null && typeof g.message == "string" ? String(g.message) : String(g),
        error: g
      });
      if (!window.dispatchEvent(H)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", g);
      return;
    }
    console.error(g);
  };
  function Pt(g) {
    var H = tt.T, $ = {};
    $.types = H !== null ? H.types : null, tt.T = $;
    try {
      var J = g(), ht = tt.S;
      ht !== null && ht($, J), typeof J == "object" && J !== null && typeof J.then == "function" && J.then(P, ft);
    } catch (dt) {
      ft(dt);
    } finally {
      H !== null && $.types !== null && (H.types = $.types), tt.T = H;
    }
  }
  function Zt(g) {
    var H = tt.T;
    if (H !== null) {
      var $ = H.types;
      $ === null ? H.types = [g] : $.indexOf(g) === -1 && $.push(g);
    } else Pt(Zt.bind(null, g));
  }
  var Oe = {
    map: G,
    forEach: function(g, H, $) {
      G(
        g,
        function() {
          H.apply(this, arguments);
        },
        $
      );
    },
    count: function(g) {
      var H = 0;
      return G(g, function() {
        H++;
      }), H;
    },
    toArray: function(g) {
      return G(g, function(H) {
        return H;
      }) || [];
    },
    only: function(g) {
      if (!bt(g))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return g;
    }
  };
  return mt.Activity = h, mt.Children = Oe, mt.Component = ct, mt.Fragment = f, mt.Profiler = b, mt.PureComponent = Vt, mt.StrictMode = s, mt.Suspense = j, mt.ViewTransition = A, mt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = tt, mt.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(g) {
      return tt.H.useMemoCache(g);
    }
  }, mt.addTransitionType = Zt, mt.cache = function(g) {
    return function() {
      return g.apply(null, arguments);
    };
  }, mt.cacheSignal = function() {
    return null;
  }, mt.cloneElement = function(g, H, $) {
    if (g == null)
      throw Error(
        "The argument must be a React element, but you passed " + g + "."
      );
    var J = W({}, g.props), ht = g.key;
    if (H != null)
      for (dt in H.key !== void 0 && (ht = "" + H.key), H)
        !xt.call(H, dt) || dt === "key" || dt === "__self" || dt === "__source" || dt === "ref" && H.ref === void 0 || (J[dt] = H[dt]);
    var dt = arguments.length - 2;
    if (dt === 1) J.children = $;
    else if (1 < dt) {
      for (var ut = Array(dt), V = 0; V < dt; V++)
        ut[V] = arguments[V + 2];
      J.children = ut;
    }
    return I(g.type, ht, J);
  }, mt.createContext = function(g) {
    return g = {
      $$typeof: E,
      _currentValue: g,
      _currentValue2: g,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, g.Provider = g, g.Consumer = {
      $$typeof: v,
      _context: g
    }, g;
  }, mt.createElement = function(g, H, $) {
    var J, ht = {}, dt = null;
    if (H != null)
      for (J in H.key !== void 0 && (dt = "" + H.key), H)
        xt.call(H, J) && J !== "key" && J !== "__self" && J !== "__source" && (ht[J] = H[J]);
    var ut = arguments.length - 2;
    if (ut === 1) ht.children = $;
    else if (1 < ut) {
      for (var V = Array(ut), k = 0; k < ut; k++)
        V[k] = arguments[k + 2];
      ht.children = V;
    }
    if (g && g.defaultProps)
      for (J in ut = g.defaultProps, ut)
        ht[J] === void 0 && (ht[J] = ut[J]);
    return I(g, dt, ht);
  }, mt.createRef = function() {
    return { current: null };
  }, mt.forwardRef = function(g) {
    return { $$typeof: x, render: g };
  }, mt.isValidElement = bt, mt.lazy = function(g) {
    return {
      $$typeof: z,
      _payload: { _status: -1, _result: g },
      _init: st
    };
  }, mt.memo = function(g, H) {
    return {
      $$typeof: w,
      type: g,
      compare: H === void 0 ? null : H
    };
  }, mt.startTransition = Pt, mt.unstable_useCacheRefresh = function() {
    return tt.H.useCacheRefresh();
  }, mt.use = function(g) {
    return tt.H.use(g);
  }, mt.useActionState = function(g, H, $) {
    return tt.H.useActionState(g, H, $);
  }, mt.useCallback = function(g, H) {
    return tt.H.useCallback(g, H);
  }, mt.useContext = function(g) {
    return tt.H.useContext(g);
  }, mt.useDebugValue = function() {
  }, mt.useDeferredValue = function(g, H) {
    return tt.H.useDeferredValue(g, H);
  }, mt.useEffect = function(g, H) {
    return tt.H.useEffect(g, H);
  }, mt.useEffectEvent = function(g) {
    return tt.H.useEffectEvent(g);
  }, mt.useId = function() {
    return tt.H.useId();
  }, mt.useImperativeHandle = function(g, H, $) {
    return tt.H.useImperativeHandle(g, H, $);
  }, mt.useInsertionEffect = function(g, H) {
    return tt.H.useInsertionEffect(g, H);
  }, mt.useLayoutEffect = function(g, H) {
    return tt.H.useLayoutEffect(g, H);
  }, mt.useMemo = function(g, H) {
    return tt.H.useMemo(g, H);
  }, mt.useOptimistic = function(g, H) {
    return tt.H.useOptimistic(g, H);
  }, mt.useReducer = function(g, H, $) {
    return tt.H.useReducer(g, H, $);
  }, mt.useRef = function(g) {
    return tt.H.useRef(g);
  }, mt.useState = function(g) {
    return tt.H.useState(g);
  }, mt.useSyncExternalStore = function(g, H, $) {
    return tt.H.useSyncExternalStore(
      g,
      H,
      $
    );
  }, mt.useTransition = function() {
    return tt.H.useTransition();
  }, mt.version = "19.3.0", mt;
}
var Kh;
function vr() {
  return Kh || (Kh = 1, tr.exports = gg()), tr.exports;
}
var B = vr(), er = { exports: {} }, Yu = {}, lr = { exports: {} }, ar = {};
var Jh;
function bg() {
  return Jh || (Jh = 1, (function(c) {
    function o(R, Y) {
      var G = R.length;
      R.push(Y);
      t: for (; 0 < G; ) {
        var st = G - 1 >>> 1, ft = R[st];
        if (0 < b(ft, Y))
          R[st] = Y, R[G] = ft, G = st;
        else break t;
      }
    }
    function f(R) {
      return R.length === 0 ? null : R[0];
    }
    function s(R) {
      if (R.length === 0) return null;
      var Y = R[0], G = R.pop();
      if (G !== Y) {
        R[0] = G;
        t: for (var st = 0, ft = R.length, Pt = ft >>> 1; st < Pt; ) {
          var Zt = 2 * (st + 1) - 1, Oe = R[Zt], g = Zt + 1, H = R[g];
          if (0 > b(Oe, G))
            g < ft && 0 > b(H, Oe) ? (R[st] = H, R[g] = G, st = g) : (R[st] = Oe, R[Zt] = G, st = Zt);
          else if (g < ft && 0 > b(H, G))
            R[st] = H, R[g] = G, st = g;
          else break t;
        }
      }
      return Y;
    }
    function b(R, Y) {
      var G = R.sortIndex - Y.sortIndex;
      return G !== 0 ? G : R.id - Y.id;
    }
    if (c.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var v = performance;
      c.unstable_now = function() {
        return v.now();
      };
    } else {
      var E = Date, x = E.now();
      c.unstable_now = function() {
        return E.now() - x;
      };
    }
    var j = [], w = [], z = 1, h = null, A = 3, L = !1, Z = !1, at = !1, W = !1, Et = typeof setTimeout == "function" ? setTimeout : null, ct = typeof clearTimeout == "function" ? clearTimeout : null, Mt = typeof setImmediate < "u" ? setImmediate : null;
    function Vt(R) {
      for (var Y = f(w); Y !== null; ) {
        if (Y.callback === null) s(w);
        else if (Y.startTime <= R)
          s(w), Y.sortIndex = Y.expirationTime, o(j, Y);
        else break;
        Y = f(w);
      }
    }
    function Ut(R) {
      if (at = !1, Vt(R), !Z)
        if (f(j) !== null)
          Z = !0, zt || (zt = !0, bt());
        else {
          var Y = f(w);
          Y !== null && ot(Ut, Y.startTime - R);
        }
    }
    var zt = !1, P = -1, tt = 5, xt = -1;
    function I() {
      return W ? !0 : !(c.unstable_now() - xt < tt);
    }
    function nt() {
      if (W = !1, zt) {
        var R = c.unstable_now();
        xt = R;
        var Y = !0;
        try {
          t: {
            Z = !1, at && (at = !1, ct(P), P = -1), L = !0;
            var G = A;
            try {
              e: {
                for (Vt(R), h = f(j); h !== null && !(h.expirationTime > R && I()); ) {
                  var st = h.callback;
                  if (typeof st == "function") {
                    h.callback = null, A = h.priorityLevel;
                    var ft = st(
                      h.expirationTime <= R
                    );
                    if (R = c.unstable_now(), typeof ft == "function") {
                      h.callback = ft, Vt(R), Y = !0;
                      break e;
                    }
                    h === f(j) && s(j), Vt(R);
                  } else s(j);
                  h = f(j);
                }
                if (h !== null) Y = !0;
                else {
                  var Pt = f(w);
                  Pt !== null && ot(
                    Ut,
                    Pt.startTime - R
                  ), Y = !1;
                }
              }
              break t;
            } finally {
              h = null, A = G, L = !1;
            }
            Y = void 0;
          }
        } finally {
          Y ? bt() : zt = !1;
        }
      }
    }
    var bt;
    if (typeof Mt == "function")
      bt = function() {
        Mt(nt);
      };
    else if (typeof MessageChannel < "u") {
      var Gt = new MessageChannel(), Ft = Gt.port2;
      Gt.port1.onmessage = nt, bt = function() {
        Ft.postMessage(null);
      };
    } else
      bt = function() {
        Et(nt, 0);
      };
    function ot(R, Y) {
      P = Et(function() {
        R(c.unstable_now());
      }, Y);
    }
    c.unstable_IdlePriority = 5, c.unstable_ImmediatePriority = 1, c.unstable_LowPriority = 4, c.unstable_NormalPriority = 3, c.unstable_Profiling = null, c.unstable_UserBlockingPriority = 2, c.unstable_cancelCallback = function(R) {
      R.callback = null;
    }, c.unstable_forceFrameRate = function(R) {
      0 > R || 125 < R ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : tt = 0 < R ? Math.floor(1e3 / R) : 5;
    }, c.unstable_getCurrentPriorityLevel = function() {
      return A;
    }, c.unstable_next = function(R) {
      switch (A) {
        case 1:
        case 2:
        case 3:
          var Y = 3;
          break;
        default:
          Y = A;
      }
      var G = A;
      A = Y;
      try {
        return R();
      } finally {
        A = G;
      }
    }, c.unstable_requestPaint = function() {
      W = !0;
    }, c.unstable_runWithPriority = function(R, Y) {
      switch (R) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          R = 3;
      }
      var G = A;
      A = R;
      try {
        return Y();
      } finally {
        A = G;
      }
    }, c.unstable_scheduleCallback = function(R, Y, G) {
      var st = c.unstable_now();
      switch (typeof G == "object" && G !== null ? (G = G.delay, G = typeof G == "number" && 0 < G ? st + G : st) : G = st, R) {
        case 1:
          var ft = -1;
          break;
        case 2:
          ft = 250;
          break;
        case 5:
          ft = 1073741823;
          break;
        case 4:
          ft = 1e4;
          break;
        default:
          ft = 5e3;
      }
      return ft = G + ft, R = {
        id: z++,
        callback: Y,
        priorityLevel: R,
        startTime: G,
        expirationTime: ft,
        sortIndex: -1
      }, G > st ? (R.sortIndex = G, o(w, R), f(j) === null && R === f(w) && (at ? (ct(P), P = -1) : at = !0, ot(Ut, G - st))) : (R.sortIndex = ft, o(j, R), Z || L || (Z = !0, zt || (zt = !0, bt()))), R;
    }, c.unstable_shouldYield = I, c.unstable_wrapCallback = function(R) {
      var Y = A;
      return function() {
        var G = A;
        A = Y;
        try {
          return R.apply(this, arguments);
        } finally {
          A = G;
        }
      };
    };
  })(ar)), ar;
}
var $h;
function pg() {
  return $h || ($h = 1, lr.exports = bg()), lr.exports;
}
var nr = { exports: {} }, Me = {};
var Fh;
function Sg() {
  if (Fh) return Me;
  Fh = 1;
  var c = vr();
  function o(z) {
    var h = "https://react.dev/errors/" + z;
    if (1 < arguments.length) {
      h += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var A = 2; A < arguments.length; A++)
        h += "&args[]=" + encodeURIComponent(arguments[A]);
    }
    return "Minified React error #" + z + "; visit " + h + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function f() {
  }
  var s = {
    d: {
      f,
      r: function() {
        throw Error(o(522));
      },
      D: f,
      C: f,
      L: f,
      m: f,
      X: f,
      S: f,
      M: f
    },
    p: 0,
    findDOMNode: null
  }, b = /* @__PURE__ */ Symbol.for("react.portal"), v = /* @__PURE__ */ Symbol.for("react.recoverable"), E = /* @__PURE__ */ Symbol.for("react.optimistic_key");
  function x(z, h, A) {
    var L = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: b,
      key: L == null ? null : L === E ? E : "" + L,
      children: z,
      containerInfo: h,
      implementation: A
    };
  }
  var j = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function w(z, h) {
    if (z === "font") return "";
    if (typeof h == "string")
      return h === "use-credentials" ? h : "";
  }
  return Me.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, Me.browser = function(z) {
    return { $$typeof: v, _reason: z };
  }, Me.createPortal = function(z, h) {
    var A = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!h || h.nodeType !== 1 && h.nodeType !== 9 && h.nodeType !== 11)
      throw Error(o(299));
    return x(z, h, null, A);
  }, Me.flushSync = function(z) {
    var h = j.T, A = s.p;
    try {
      if (j.T = null, s.p = 2, z) return z();
    } finally {
      j.T = h, s.p = A, s.d.f();
    }
  }, Me.preconnect = function(z, h) {
    typeof z == "string" && (h ? (h = h.crossOrigin, h = typeof h == "string" ? h === "use-credentials" ? h : "" : void 0) : h = null, s.d.C(z, h));
  }, Me.prefetchDNS = function(z) {
    typeof z == "string" && s.d.D(z);
  }, Me.preinit = function(z, h) {
    if (typeof z == "string" && h && typeof h.as == "string") {
      var A = h.as, L = w(A, h.crossOrigin), Z = typeof h.integrity == "string" ? h.integrity : void 0, at = typeof h.fetchPriority == "string" ? h.fetchPriority : void 0;
      A === "style" ? s.d.S(
        z,
        typeof h.precedence == "string" ? h.precedence : void 0,
        {
          crossOrigin: L,
          integrity: Z,
          fetchPriority: at
        }
      ) : A === "script" && s.d.X(z, {
        crossOrigin: L,
        integrity: Z,
        fetchPriority: at,
        nonce: typeof h.nonce == "string" ? h.nonce : void 0
      });
    }
  }, Me.preinitModule = function(z, h) {
    if (typeof z == "string")
      if (typeof h == "object" && h !== null) {
        if (h.as == null || h.as === "script") {
          var A = w(
            h.as,
            h.crossOrigin
          );
          s.d.M(z, {
            crossOrigin: A,
            integrity: typeof h.integrity == "string" ? h.integrity : void 0,
            nonce: typeof h.nonce == "string" ? h.nonce : void 0,
            fetchPriority: typeof h.fetchPriority == "string" ? h.fetchPriority : void 0
          });
        }
      } else h == null && s.d.M(z);
  }, Me.preload = function(z, h) {
    if (typeof z == "string" && typeof h == "object" && h !== null && typeof h.as == "string") {
      var A = h.as, L = w(A, h.crossOrigin);
      s.d.L(z, A, {
        crossOrigin: L,
        integrity: typeof h.integrity == "string" ? h.integrity : void 0,
        nonce: typeof h.nonce == "string" ? h.nonce : void 0,
        type: typeof h.type == "string" ? h.type : void 0,
        fetchPriority: typeof h.fetchPriority == "string" ? h.fetchPriority : void 0,
        referrerPolicy: typeof h.referrerPolicy == "string" ? h.referrerPolicy : void 0,
        imageSrcSet: typeof h.imageSrcSet == "string" ? h.imageSrcSet : void 0,
        imageSizes: typeof h.imageSizes == "string" ? h.imageSizes : void 0,
        media: typeof h.media == "string" ? h.media : void 0
      });
    }
  }, Me.preloadModule = function(z, h) {
    if (typeof z == "string")
      if (h) {
        var A = w(h.as, h.crossOrigin);
        s.d.m(z, {
          as: typeof h.as == "string" && h.as !== "script" ? h.as : void 0,
          crossOrigin: A,
          integrity: typeof h.integrity == "string" ? h.integrity : void 0,
          nonce: typeof h.nonce == "string" ? h.nonce : void 0,
          fetchPriority: typeof h.fetchPriority == "string" ? h.fetchPriority : void 0
        });
      } else s.d.m(z);
  }, Me.requestFormReset = function(z) {
    s.d.r(z);
  }, Me.unstable_batchedUpdates = function(z, h) {
    return z(h);
  }, Me.useFormState = function(z, h, A) {
    return j.H.useFormState(z, h, A);
  }, Me.useFormStatus = function() {
    return j.H.useHostTransitionStatus();
  }, Me.version = "19.3.0", Me;
}
var kh;
function _g() {
  if (kh) return nr.exports;
  kh = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (o) {
        console.error(o);
      }
  }
  return c(), nr.exports = Sg(), nr.exports;
}
var Wh;
function Eg() {
  if (Wh) return Yu;
  Wh = 1;
  var c = pg(), o = vr(), f = _g();
  function s(t) {
    var e = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      e += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++)
        e += "&args[]=" + encodeURIComponent(arguments[l]);
    }
    return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function b(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function v(t) {
    for (var e = t, l = e; l && !l.alternate; )
      e = l, (e.flags & 4098) !== 0 && (t = e.return), l = e.return;
    for (; e.return; ) e = e.return;
    return e.tag === 3 ? t : null;
  }
  function E(t) {
    if (t.tag === 13) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function x(t) {
    if (t.tag === 31) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function j(t) {
    if (v(t) !== t)
      throw Error(s(188));
  }
  function w(t) {
    var e = t.alternate;
    if (!e) {
      if (e = v(t), e === null) throw Error(s(188));
      return e !== t ? null : t;
    }
    for (var l = t, a = e; ; ) {
      var n = l.return;
      if (n === null) break;
      var u = n.alternate;
      if (u === null) {
        if (a = n.return, a !== null) {
          l = a;
          continue;
        }
        break;
      }
      if (n.child === u.child) {
        for (u = n.child; u; ) {
          if (u === l) return j(n), t;
          if (u === a) return j(n), e;
          u = u.sibling;
        }
        throw Error(s(188));
      }
      if (l.return !== a.return) l = n, a = u;
      else {
        for (var i = !1, r = n.child; r; ) {
          if (r === l) {
            i = !0, l = n, a = u;
            break;
          }
          if (r === a) {
            i = !0, a = n, l = u;
            break;
          }
          r = r.sibling;
        }
        if (!i) {
          for (r = u.child; r; ) {
            if (r === l) {
              i = !0, l = u, a = n;
              break;
            }
            if (r === a) {
              i = !0, a = u, l = n;
              break;
            }
            r = r.sibling;
          }
          if (!i) throw Error(s(189));
        }
      }
      if (l.alternate !== a) throw Error(s(190));
    }
    if (l.tag !== 3) throw Error(s(188));
    return l.stateNode.current === l ? t : e;
  }
  function z(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (e = z(t), e !== null) return e;
      t = t.sibling;
    }
    return null;
  }
  function h(t, e, l, a, n, u) {
    for (; t !== null; ) {
      if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && l(t, a, n, u) || (t.tag !== 22 || t.memoizedState === null) && (e || t.tag !== 5 && t.tag !== 27) && h(
        t.child,
        e,
        l,
        a,
        n,
        u
      ))
        return !0;
      t = t.sibling;
    }
    return !1;
  }
  function A(t) {
    for (t = t.return; t !== null; ) {
      if (t.tag === 3 || t.tag === 5 || t.tag === 27) return t;
      t = t.return;
    }
    return null;
  }
  function L(t) {
    var e = !1;
    for (t = t.return; t !== null && (t.tag === 4 && (e = !0), !(t.tag === 3 || t.tag === 5 || t.tag === 27)); )
      t = t.return;
    return e;
  }
  function Z(t) {
    var e = [null, null], l = A(t);
    return l === null || at(
      e,
      t,
      l.child,
      { foundSelf: !1 }
    ), e;
  }
  function at(t, e, l, a) {
    for (; l !== null; ) {
      if (l === e) a.foundSelf = !0;
      else if (l.tag === 5 || l.tag === 27 || l.tag === 6) {
        if (a.foundSelf) return t[1] = l, !0;
        t[0] = l;
      } else if ((l.tag !== 22 || l.memoizedState === null) && at(
        t,
        e,
        l.child,
        a
      ))
        return !0;
      l = l.sibling;
    }
    return !1;
  }
  function W(t) {
    switch (t.tag) {
      case 5:
      case 27:
      case 6:
        return t.stateNode;
      case 3:
        return t.stateNode.containerInfo;
      default:
        throw Error(s(559));
    }
  }
  var Et = null, ct = null;
  function Mt(t, e, l) {
    return t === l ? !0 : t === e ? (Et = t, !0) : !1;
  }
  function Vt(t, e, l) {
    return t === l ? (ct = t, !1) : t === e ? (ct !== null && (Et = t), !0) : !1;
  }
  function Ut(t) {
    if (t === null) return null;
    do
      t = t === null ? null : t.return;
    while (t && t.tag !== 5 && t.tag !== 27 && t.tag !== 3);
    return t || null;
  }
  function zt(t, e, l) {
    for (var a = 0, n = t; n; n = l(n)) a++;
    n = 0;
    for (var u = e; u; u = l(u)) n++;
    for (; 0 < a - n; ) t = l(t), a--;
    for (; 0 < n - a; ) e = l(e), n--;
    for (; a--; ) {
      if (t === e || e !== null && t === e.alternate)
        return t;
      t = l(t), e = l(e);
    }
    return null;
  }
  var P = Object.assign, tt = /* @__PURE__ */ Symbol.for("react.element"), xt = /* @__PURE__ */ Symbol.for("react.transitional.element"), I = /* @__PURE__ */ Symbol.for("react.portal"), nt = /* @__PURE__ */ Symbol.for("react.fragment"), bt = /* @__PURE__ */ Symbol.for("react.strict_mode"), Gt = /* @__PURE__ */ Symbol.for("react.profiler"), Ft = /* @__PURE__ */ Symbol.for("react.consumer"), ot = /* @__PURE__ */ Symbol.for("react.context"), R = /* @__PURE__ */ Symbol.for("react.forward_ref"), Y = /* @__PURE__ */ Symbol.for("react.suspense"), G = /* @__PURE__ */ Symbol.for("react.suspense_list"), st = /* @__PURE__ */ Symbol.for("react.memo"), ft = /* @__PURE__ */ Symbol.for("react.lazy"), Pt = /* @__PURE__ */ Symbol.for("react.activity"), Zt = /* @__PURE__ */ Symbol.for("react.legacy_hidden"), Oe = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), g = /* @__PURE__ */ Symbol.for("react.view_transition"), H = /* @__PURE__ */ Symbol.for("react.recoverable"), $ = Symbol.iterator;
  function J(t) {
    return t === null || typeof t != "object" ? null : (t = $ && t[$] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var ht = /* @__PURE__ */ Symbol.for("react.client.reference");
  function dt(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === ht ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case nt:
        return "Fragment";
      case Gt:
        return "Profiler";
      case bt:
        return "StrictMode";
      case Y:
        return "Suspense";
      case G:
        return "SuspenseList";
      case Pt:
        return "Activity";
      case g:
        return "ViewTransition";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case I:
          return "Portal";
        case ot:
          return t.displayName || "Context";
        case Ft:
          return (t._context.displayName || "Context") + ".Consumer";
        case R:
          var e = t.render;
          return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case st:
          return e = t.displayName || null, e !== null ? e : dt(t.type) || "Memo";
        case ft:
          e = t._payload, t = t._init;
          try {
            return dt(t(e));
          } catch {
          }
      }
    return null;
  }
  var ut = Array.isArray, V = o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, k = f.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Kt = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, jt = [], oe = -1;
  function ce(t) {
    return { current: t };
  }
  function Yt(t) {
    0 > oe || (t.current = jt[oe], jt[oe] = null, oe--);
  }
  function q(t, e) {
    oe++, jt[oe] = t.current, t.current = e;
  }
  var Q = ce(null), At = ce(null), de = ce(null), me = ce(null);
  function we(t, e) {
    switch (q(de, e), q(At, t), q(Q, null), e.nodeType) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? Im(t) : 0;
        break;
      default:
        if (t = e.tagName, e = e.namespaceURI)
          e = Im(e), t = Pm(e, t);
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    Yt(Q), q(Q, t);
  }
  function Be() {
    Yt(Q), Yt(At), Yt(de);
  }
  function pa(t) {
    var e = t.memoizedState;
    e !== null && (Yn._currentValue = e.memoizedState, q(me, t)), e = Q.current;
    var l = Pm(e, t.type);
    e !== l && (q(At, t), q(Q, l));
  }
  function Vl(t) {
    At.current === t && (Yt(Q), Yt(At)), me.current === t && (Yt(me), Yn._currentValue = Kt);
  }
  var C, rt;
  function vt(t) {
    if (C === void 0)
      try {
        throw Error();
      } catch (l) {
        var e = l.stack.trim().match(/\n( *(at )?)/);
        C = e && e[1] || "", rt = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + C + t + rt;
  }
  var se = !1;
  function le(t, e) {
    if (!t || se) return "";
    se = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (e) {
              var U = function() {
                throw Error();
              };
              if (Object.defineProperty(U.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(U, []);
                } catch (X) {
                  var p = X;
                }
                Reflect.construct(t, [], U);
              } else {
                try {
                  U.call();
                } catch (X) {
                  p = X;
                }
                U = !1;
                try {
                  var N = Object.getOwnPropertyDescriptor(
                    t.prototype,
                    "props"
                  );
                  Object.defineProperty(t.prototype, "props", {
                    configurable: !0,
                    set: function() {
                      throw Error();
                    }
                  }), U = !0, new t();
                } finally {
                  U && (N !== void 0 ? Object.defineProperty(t.prototype, "props", N) : delete t.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (X) {
                p = X;
              }
              (U = t()) && typeof U.catch == "function" && U.catch(function() {
              });
            }
          } catch (X) {
            if (X && p && typeof X.stack == "string")
              return [X.stack, p.stack];
          }
          return [null, null];
        }
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var n = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name"
      );
      n && n.configurable && Object.defineProperty(
        a.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var u = a.DetermineComponentFrameRoot(), i = u[0], r = u[1];
      if (i && r) {
        var m = i.split(`
`), _ = r.split(`
`);
        for (n = a = 0; a < m.length && !m[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; n < _.length && !_[n].includes(
          "DetermineComponentFrameRoot"
        ); )
          n++;
        if (a === m.length || n === _.length)
          for (a = m.length - 1, n = _.length - 1; 1 <= a && 0 <= n && m[a] !== _[n]; )
            n--;
        for (; 1 <= a && 0 <= n; a--, n--)
          if (m[a] !== _[n]) {
            if (a !== 1 || n !== 1)
              do
                if (a--, n--, 0 > n || m[a] !== _[n]) {
                  var M = `
` + m[a].replace(" at new ", " at ");
                  return t.displayName && M.includes("<anonymous>") && (M = M.replace("<anonymous>", t.displayName)), M;
                }
              while (1 <= a && 0 <= n);
            break;
          }
      }
    } finally {
      se = !1, Error.prepareStackTrace = l;
    }
    return (l = t ? t.displayName || t.name : "") ? vt(l) : "";
  }
  function he(t, e) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return vt(t.type);
      case 16:
        return vt("Lazy");
      case 13:
        return t.child !== e && e !== null ? vt("Suspense Fallback") : vt("Suspense");
      case 19:
        return vt("SuspenseList");
      case 0:
      case 15:
        return le(t.type, !1);
      case 11:
        return le(t.type.render, !1);
      case 1:
        return le(t.type, !0);
      case 31:
        return vt("Activity");
      case 30:
        return vt("ViewTransition");
      default:
        return "";
    }
  }
  function ze(t) {
    try {
      var e = "", l = null;
      do
        e += he(t, l), l = t, t = t.return;
      while (t);
      return e;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var ve = Object.prototype.hasOwnProperty, O = c.unstable_scheduleCallback, et = c.unstable_cancelCallback, Jt = c.unstable_shouldYield, te = c.unstable_requestPaint, fe = c.unstable_now, Sa = c.unstable_getCurrentPriorityLevel, Wa = c.unstable_ImmediatePriority, _r = c.unstable_UserBlockingPriority, Ku = c.unstable_NormalPriority, T0 = c.unstable_LowPriority, Er = c.unstable_IdlePriority, N0 = c.log, x0 = c.unstable_setDisableYieldValue, Zn = null, Qe = null;
  function Zl(t) {
    if (typeof N0 == "function" && x0(t), Qe && typeof Qe.setStrictMode == "function")
      try {
        Qe.setStrictMode(Zn, t);
      } catch {
      }
  }
  var Ve = Math.clz32 ? Math.clz32 : z0, M0 = Math.log, O0 = Math.LN2;
  function z0(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (M0(t) / O0 | 0) | 0;
  }
  var Ju = 256, $u = 262144, Fu = 4194304;
  function _a(t) {
    var e = t & 42;
    if (e !== 0) return e;
    switch (t & -t) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return t & -t;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return t;
    }
  }
  function ku(t, e, l) {
    var a = t.pendingLanes;
    if (a === 0) return 0;
    var n = 0, u = t.suspendedLanes, i = t.pingedLanes;
    t = t.warmLanes;
    var r = a & 134217727;
    return r !== 0 ? (a = r & ~u, a !== 0 ? n = _a(a) : (i &= r, i !== 0 ? n = _a(i) : l || (l = r & ~t, l !== 0 && (n = _a(l))))) : (r = a & ~u, r !== 0 ? n = _a(r) : i !== 0 ? n = _a(i) : l || (l = a & ~t, l !== 0 && (n = _a(l)))), n === 0 ? 0 : e !== 0 && e !== n && (e & u) === 0 && (u = n & -n, l = e & -e, u >= l || u === 32 && (l & 4194048) !== 0) ? e : n;
  }
  function Kn(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function Tr(t, e) {
    (e & 8) !== 0 && (e |= e & 32);
    var l = t.entangledLanes;
    if (l !== 0)
      for (t = t.entanglements, l &= e; 0 < l; ) {
        var a = 31 - Ve(l), n = 1 << a;
        e |= t[a], l &= ~n;
      }
    return e;
  }
  function A0(t, e) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return e + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Nr() {
    var t = Fu;
    return Fu <<= 1, (Fu & 62914560) === 0 && (Fu = 4194304), t;
  }
  function xc(t) {
    for (var e = [], l = 0; 31 > l; l++) e.push(t);
    return e;
  }
  function Jn(t, e) {
    t.pendingLanes |= e, e !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function C0(t, e, l, a, n, u) {
    var i = t.pendingLanes;
    t.pendingLanes = l, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= l, t.entangledLanes &= l, t.errorRecoveryDisabledLanes &= l, t.shellSuspendCounter = 0;
    var r = t.entanglements, m = t.expirationTimes, _ = t.hiddenUpdates;
    for (l = i & ~l; 0 < l; ) {
      var M = 31 - Ve(l), U = 1 << M;
      r[M] = 0, m[M] = -1;
      var p = _[M];
      if (p !== null)
        for (_[M] = null, M = 0; M < p.length; M++) {
          var N = p[M];
          N !== null && (N.lane &= -536870913);
        }
      l &= ~U;
    }
    a !== 0 && xr(t, a, 0), u !== 0 && n === 0 && t.tag !== 0 && (t.suspendedLanes |= u & ~(i & ~e));
  }
  function xr(t, e, l) {
    t.pendingLanes |= e, t.suspendedLanes &= ~e;
    var a = 31 - Ve(e);
    t.entangledLanes |= e, t.entanglements[a] = t.entanglements[a] | 1073741824 | l & 261930;
  }
  function Mr(t, e) {
    var l = t.entangledLanes |= e;
    for (t = t.entanglements; l; ) {
      var a = 31 - Ve(l), n = 1 << a;
      n & e | t[a] & e && (t[a] |= e), l &= ~n;
    }
  }
  function Or(t, e) {
    var l = e & -e;
    return l = (l & 42) !== 0 ? 1 : Mc(l), (l & (t.suspendedLanes | e)) !== 0 ? 0 : l;
  }
  function Mc(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function Oc(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function zr() {
    var t = k.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : Bh(t.type));
  }
  function Ar(t, e) {
    var l = k.p;
    try {
      return k.p = t, e();
    } finally {
      k.p = l;
    }
  }
  var Al = Math.random().toString(36).slice(2), Se = "__reactFiber$" + Al, He = "__reactProps$" + Al, Ia = "__reactContainer$" + Al, Cr = "__reactEvents$" + Al, j0 = "__reactListeners$" + Al, R0 = "__reactHandles$" + Al, jr = "__reactResources$" + Al, $n = "__reactMarker$" + Al, Wu = "__reactLoad$" + Al;
  function Iu(t) {
    delete t[Se], delete t[He], delete t[j0], delete t[R0];
  }
  function Ea(t) {
    var e;
    if (e = t[Se]) return e;
    for (var l = t.parentNode; l; ) {
      if (e = l[Ia] || l[Se]) {
        if (l = e.alternate, e.child !== null || l !== null && l.child !== null)
          for (t = yh(t); t !== null; ) {
            if (l = t[Se]) return l;
            t = yh(t);
          }
        return e;
      }
      t = l, l = t.parentNode;
    }
    return null;
  }
  function Pa(t) {
    if (t = t[Se] || t[Ia]) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3)
        return t;
    }
    return null;
  }
  function Fn(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(s(33));
  }
  function tn(t) {
    var e = t[jr];
    return e || (e = t[jr] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), e;
  }
  function ye(t) {
    t[$n] = !0;
  }
  function Rr(t) {
    t[Wu] = void 0;
  }
  var Dr = /* @__PURE__ */ new Set(), Ur = {};
  function Ta(t, e) {
    en(t, e), en(t + "Capture", e);
  }
  function en(t, e) {
    for (Ur[t] = e, t = 0; t < e.length; t++)
      Dr.add(e[t]);
  }
  var D0 = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), wr = {}, Br = {};
  function U0(t) {
    return ve.call(Br, t) ? !0 : ve.call(wr, t) ? !1 : D0.test(t) ? Br[t] = !0 : (wr[t] = !0, !1);
  }
  var Ct = !1;
  function Hr() {
    var t = Ct;
    return Ct = !1, t;
  }
  function Pu(t, e, l) {
    if (U0(e))
      if (l === null) t.removeAttribute(e);
      else {
        switch (typeof l) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(e);
            return;
          case "boolean":
            var a = e.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              t.removeAttribute(e);
              return;
            }
        }
        t.setAttribute(e, l);
      }
  }
  function ti(t, e, l) {
    if (l === null) t.removeAttribute(e);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(e);
          return;
      }
      t.setAttribute(e, l);
    }
  }
  function Cl(t, e, l, a) {
    if (a === null) t.removeAttribute(l);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(l);
          return;
      }
      t.setAttributeNS(e, l, a);
    }
  }
  function Ze(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function Lr(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
  }
  function w0(t, e, l) {
    var a = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      e
    );
    if (!t.hasOwnProperty(e) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
      var n = a.get, u = a.set;
      return Object.defineProperty(t, e, {
        configurable: !0,
        get: function() {
          return n.call(this);
        },
        set: function(i) {
          l = "" + i, u.call(this, i);
        }
      }), Object.defineProperty(t, e, {
        enumerable: a.enumerable
      }), {
        getValue: function() {
          return l;
        },
        setValue: function(i) {
          l = "" + i;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[e];
        }
      };
    }
  }
  function zc(t) {
    if (!t._valueTracker) {
      var e = Lr(t) ? "checked" : "value";
      t._valueTracker = w0(
        t,
        e,
        "" + t[e]
      );
    }
  }
  function Yr(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var l = e.getValue(), a = "";
    return t && (a = Lr(t) ? t.checked ? "true" : "false" : t.value), t = a, t !== l ? (e.setValue(t), !0) : !1;
  }
  var B0 = /[\n"\\]/g;
  function Pe(t) {
    return t.replace(
      B0,
      function(e) {
        return "\\" + e.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Ac(t, e, l, a, n, u, i, r) {
    t.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? t.type = i : t.removeAttribute("type"), e != null ? i === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + Ze(e)) : t.value !== "" + Ze(e) && (t.value = "" + Ze(e)) : i !== "submit" && i !== "reset" || t.removeAttribute("value"), e != null ? i === "number" && t.value == e ? Cc(t, Ze(t.value)) : Cc(t, Ze(e)) : l != null ? Cc(t, Ze(l)) : a != null && t.removeAttribute("value"), n == null && u != null && (t.defaultChecked = !!u), n != null && (t.checked = n && typeof n != "function" && typeof n != "symbol"), r != null && typeof r != "function" && typeof r != "symbol" && typeof r != "boolean" ? t.name = "" + Ze(r) : t.removeAttribute("name");
  }
  function qr(t, e, l, a, n, u, i, r) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (t.type = u), e != null || l != null) {
      if (!(u !== "submit" && u !== "reset" || e != null)) {
        zc(t);
        return;
      }
      l = l != null ? "" + Ze(l) : "", e = e != null ? "" + Ze(e) : l, r || e === t.value || (t.value = e), t.defaultValue = e;
    }
    a = a ?? n, a = typeof a != "function" && typeof a != "symbol" && !!a, t.checked = r ? t.checked : !!a, t.defaultChecked = !!a, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (t.name = i), zc(t);
  }
  function Cc(t, e) {
    t.defaultValue !== "" + e && (t.defaultValue = "" + e);
  }
  function ln(t, e, l, a) {
    if (t = t.options, e) {
      e = {};
      for (var n = 0; n < l.length; n++)
        e["$" + l[n]] = !0;
      for (l = 0; l < t.length; l++)
        n = e.hasOwnProperty("$" + t[l].value), t[l].selected !== n && (t[l].selected = n), n && a && (t[l].defaultSelected = !0);
    } else {
      for (l = "" + Ze(l), e = null, n = 0; n < t.length; n++) {
        if (t[n].value === l) {
          t[n].selected = !0, a && (t[n].defaultSelected = !0);
          return;
        }
        e !== null || t[n].disabled || (e = t[n]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function Gr(t, e, l) {
    if (e != null && (e = "" + Ze(e), e !== t.value && (t.value = e), l == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = l != null ? "" + Ze(l) : "";
  }
  function Xr(t, e, l, a) {
    if (e == null) {
      if (a != null) {
        if (l != null) throw Error(s(92));
        if (ut(a)) {
          if (1 < a.length) throw Error(s(93));
          a = a[0];
        }
        l = a;
      }
      l == null && (l = ""), e = l;
    }
    l = Ze(e), t.defaultValue = l, a = t.textContent, a === l && a !== "" && a !== null && (t.value = a), zc(t);
  }
  function an(t, e) {
    if (e) {
      var l = t.firstChild;
      if (l && l === t.lastChild && l.nodeType === 3) {
        l.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var H0 = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Qr(t, e, l) {
    var a = e.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? a ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "" : a ? t.setProperty(e, l) : typeof l != "number" || l === 0 || H0.has(e) ? e === "float" ? t.cssFloat = l : t[e] = ("" + l).trim() : t[e] = l + "px";
  }
  function Vr(t, e, l) {
    if (e != null && typeof e != "object")
      throw Error(s(62));
    if (t = t.style, l != null) {
      for (var a in l)
        !l.hasOwnProperty(a) || e != null && e.hasOwnProperty(a) || (a.indexOf("--") === 0 ? t.setProperty(a, "") : a === "float" ? t.cssFloat = "" : t[a] = "", Ct = !0);
      for (var n in e)
        a = e[n], e.hasOwnProperty(n) && l[n] !== a && (Qr(t, n, a), Ct = !0);
    } else
      for (var u in e)
        e.hasOwnProperty(u) && Qr(t, u, e[u]);
  }
  function jc(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var L0 = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["maskType", "mask-type"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), Y0 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function ei(t) {
    return Y0.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function yl() {
  }
  var Rc = null;
  function Dc(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var nn = null, un = null;
  function Zr(t) {
    var e = Pa(t);
    if (e && (t = e.stateNode)) {
      var l = t[He] || null;
      t: switch (t = e.stateNode, e.type) {
        case "input":
          if (Ac(
            t,
            l.value,
            l.defaultValue,
            l.defaultValue,
            l.checked,
            l.defaultChecked,
            l.type,
            l.name
          ), e = l.name, l.type === "radio" && e != null) {
            for (l = t; l.parentNode; ) l = l.parentNode;
            for (l = l.querySelectorAll(
              'input[name="' + Pe(
                "" + e
              ) + '"][type="radio"]'
            ), e = 0; e < l.length; e++) {
              var a = l[e];
              if (a !== t && a.form === t.form) {
                var n = a[He] || null;
                if (!n) throw Error(s(90));
                Ac(
                  a,
                  n.value,
                  n.defaultValue,
                  n.defaultValue,
                  n.checked,
                  n.defaultChecked,
                  n.type,
                  n.name
                );
              }
            }
            for (e = 0; e < l.length; e++)
              a = l[e], a.form === t.form && Yr(a);
          }
          break t;
        case "textarea":
          Gr(t, l.value, l.defaultValue);
          break t;
        case "select":
          e = l.value, e != null && ln(t, !!l.multiple, e, !1);
      }
    }
  }
  var Uc = !1;
  function Kr(t, e, l) {
    if (Uc) return t(e, l);
    Uc = !0;
    try {
      var a = t(e);
      return a;
    } finally {
      if (Uc = !1, (nn !== null || un !== null) && (ec(), nn && (e = nn, t = un, un = nn = null, Zr(e), t)))
        for (e = 0; e < t.length; e++) Zr(t[e]);
    }
  }
  function kn(t, e) {
    var l = t.stateNode;
    if (l === null) return null;
    var a = l[He] || null;
    if (a === null) return null;
    l = a[e];
    t: switch (e) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (a = !a.disabled) || (t = t.type, a = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !a;
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (l && typeof l != "function")
      throw Error(
        s(231, e, typeof l)
      );
    return l;
  }
  var jl = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), wc = !1;
  if (jl)
    try {
      var Wn = {};
      Object.defineProperty(Wn, "passive", {
        get: function() {
          wc = !0;
        }
      }), window.addEventListener("test", Wn, Wn), window.removeEventListener("test", Wn, Wn);
    } catch {
      wc = !1;
    }
  var Kl = null, Bc = null, li = null;
  function Jr() {
    if (li) return li;
    var t, e = Bc, l = e.length, a, n = "value" in Kl ? Kl.value : Kl.textContent, u = n.length;
    for (t = 0; t < l && e[t] === n[t]; t++) ;
    var i = l - t;
    for (a = 1; a <= i && e[l - a] === n[u - a]; a++) ;
    return li = n.slice(t, 1 < a ? 1 - a : void 0);
  }
  function ai(t) {
    var e = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function ni() {
    return !0;
  }
  function $r() {
    return !1;
  }
  function je(t) {
    function e(l, a, n, u, i) {
      this._reactName = l, this._targetInst = n, this.type = a, this.nativeEvent = u, this.target = i, this.currentTarget = null;
      for (var r in t)
        t.hasOwnProperty(r) && (l = t[r], this[r] = l ? l(u) : u[r]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? ni : $r, this.isPropagationStopped = $r, this;
    }
    return P(e.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = ni);
      },
      stopPropagation: function() {
        var l = this.nativeEvent;
        l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = ni);
      },
      persist: function() {
      },
      isPersistent: ni
    }), e;
  }
  var Jl = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, ui = je(Jl), In = P({}, Jl, { view: 0, detail: 0 }), q0 = je(In), Hc, Lc, Pn, ii = P({}, In, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: qc,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== Pn && (Pn && t.type === "mousemove" ? (Hc = t.screenX - Pn.screenX, Lc = t.screenY - Pn.screenY) : Lc = Hc = 0, Pn = t), Hc);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : Lc;
    }
  }), Fr = je(ii), G0 = P({}, ii, { dataTransfer: 0 }), X0 = je(G0), Q0 = P({}, In, { relatedTarget: 0 }), Yc = je(Q0), V0 = P({}, Jl, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Z0 = je(V0), K0 = P({}, Jl, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), J0 = je(K0), $0 = P({}, Jl, { data: 0 }), kr = je($0), F0 = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, k0 = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, W0 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function I0(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = W0[t]) ? !!e[t] : !1;
  }
  function qc() {
    return I0;
  }
  var P0 = P({}, In, {
    key: function(t) {
      if (t.key) {
        var e = F0[t.key] || t.key;
        if (e !== "Unidentified") return e;
      }
      return t.type === "keypress" ? (t = ai(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? k0[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: qc,
    charCode: function(t) {
      return t.type === "keypress" ? ai(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? ai(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), tv = je(P0), ev = P({}, ii, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), Wr = je(ev), lv = P({}, Jl, { submitter: 0 }), av = je(lv), nv = P({}, In, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: qc
  }), uv = je(nv), iv = P({}, Jl, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), cv = je(iv), sv = P({}, ii, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), fv = je(sv), rv = P({}, Jl, {
    newState: 0,
    oldState: 0,
    source: 0
  }), ov = je(rv), dv = [9, 13, 27, 32], Gc = jl && "CompositionEvent" in window, tu = null;
  jl && "documentMode" in document && (tu = document.documentMode);
  var mv = jl && "TextEvent" in window && !tu, Ir = jl && (!Gc || tu && 8 < tu && 11 >= tu), Pr = " ", to = !1;
  function eo(t, e) {
    switch (t) {
      case "keyup":
        return dv.indexOf(e.keyCode) !== -1;
      case "keydown":
        return e.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function lo(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var cn = !1;
  function hv(t, e) {
    switch (t) {
      case "compositionend":
        return lo(e);
      case "keypress":
        return e.which !== 32 ? null : (to = !0, Pr);
      case "textInput":
        return t = e.data, t === Pr && to ? null : t;
      default:
        return null;
    }
  }
  function vv(t, e) {
    if (cn)
      return t === "compositionend" || !Gc && eo(t, e) ? (t = Jr(), li = Bc = Kl = null, cn = !1, t) : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(e.ctrlKey || e.altKey || e.metaKey) || e.ctrlKey && e.altKey) {
          if (e.char && 1 < e.char.length)
            return e.char;
          if (e.which) return String.fromCharCode(e.which);
        }
        return null;
      case "compositionend":
        return Ir && e.locale !== "ko" ? null : e.data;
      default:
        return null;
    }
  }
  var yv = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function ao(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === "input" ? !!yv[t.type] : e === "textarea";
  }
  function no(t, e, l, a) {
    nn ? un ? un.push(a) : un = [a] : nn = a, e = cc(e, "onChange"), 0 < e.length && (l = new ui(
      "onChange",
      "change",
      null,
      l,
      a
    ), t.push({ event: l, listeners: e }));
  }
  var eu = null, lu = null;
  function gv(t) {
    Km(t, 0);
  }
  function ci(t) {
    var e = Fn(t);
    if (Yr(e)) return t;
  }
  function uo(t, e) {
    if (t === "change") return e;
  }
  var io = !1;
  if (jl) {
    var Xc;
    if (jl) {
      var Qc = "oninput" in document;
      if (!Qc) {
        var co = document.createElement("div");
        co.setAttribute("oninput", "return;"), Qc = typeof co.oninput == "function";
      }
      Xc = Qc;
    } else Xc = !1;
    io = Xc && (!document.documentMode || 9 < document.documentMode);
  }
  function so() {
    eu && (eu.detachEvent("onpropertychange", fo), lu = eu = null);
  }
  function fo(t) {
    if (t.propertyName === "value" && ci(lu)) {
      var e = [];
      no(
        e,
        lu,
        t,
        Dc(t)
      ), Kr(gv, e);
    }
  }
  function bv(t, e, l) {
    t === "focusin" ? (so(), eu = e, lu = l, eu.attachEvent("onpropertychange", fo)) : t === "focusout" && so();
  }
  function pv(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return ci(lu);
  }
  function Sv(t, e) {
    if (t === "click") return ci(e);
  }
  function _v(t, e) {
    if (t === "input" || t === "change")
      return ci(e);
  }
  function Ev(t, e) {
    return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
  }
  var Ke = typeof Object.is == "function" ? Object.is : Ev;
  function au(t, e) {
    if (Ke(t, e)) return !0;
    if (typeof t != "object" || t === null || typeof e != "object" || e === null)
      return !1;
    var l = Object.keys(t), a = Object.keys(e);
    if (l.length !== a.length) return !1;
    for (a = 0; a < l.length; a++) {
      var n = l[a];
      if (!ve.call(e, n) || !Ke(t[n], e[n]))
        return !1;
    }
    return !0;
  }
  function Vc(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  function ro(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function oo(t, e) {
    var l = ro(t);
    t = 0;
    for (var a; l; ) {
      if (l.nodeType === 3) {
        if (a = t + l.textContent.length, t <= e && a >= e)
          return { node: l, offset: e - t };
        t = a;
      }
      t: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break t;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = ro(l);
    }
  }
  function mo(t, e) {
    return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? mo(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
  }
  function ho(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var e = Vc(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var l = typeof e.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) t = e.contentWindow;
      else break;
      e = Vc(t.document);
    }
    return e;
  }
  function Zc(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
  }
  var Tv = jl && "documentMode" in document && 11 >= document.documentMode, sn = null, Kc = null, nu = null, Jc = !1;
  function vo(t, e, l) {
    var a = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Jc || sn == null || sn !== Vc(a) || (a = sn, "selectionStart" in a && Zc(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), nu && au(nu, a) || (nu = a, a = cc(Kc, "onSelect"), 0 < a.length && (e = new ui(
      "onSelect",
      "select",
      null,
      e,
      l
    ), t.push({ event: e, listeners: a }), e.target = sn)));
  }
  function Na(t, e) {
    var l = {};
    return l[t.toLowerCase()] = e.toLowerCase(), l["Webkit" + t] = "webkit" + e, l["Moz" + t] = "moz" + e, l;
  }
  var fn = {
    animationend: Na("Animation", "AnimationEnd"),
    animationiteration: Na("Animation", "AnimationIteration"),
    animationstart: Na("Animation", "AnimationStart"),
    transitionrun: Na("Transition", "TransitionRun"),
    transitionstart: Na("Transition", "TransitionStart"),
    transitioncancel: Na("Transition", "TransitionCancel"),
    transitionend: Na("Transition", "TransitionEnd")
  }, $c = {}, yo = {};
  jl && (yo = document.createElement("div").style, "AnimationEvent" in window || (delete fn.animationend.animation, delete fn.animationiteration.animation, delete fn.animationstart.animation), "TransitionEvent" in window || delete fn.transitionend.transition);
  function xa(t) {
    if ($c[t]) return $c[t];
    if (!fn[t]) return t;
    var e = fn[t], l;
    for (l in e)
      if (e.hasOwnProperty(l) && l in yo)
        return $c[t] = e[l];
    return t;
  }
  var go = xa("animationend"), bo = xa("animationiteration"), po = xa("animationstart"), Nv = xa("transitionrun"), xv = xa("transitionstart"), Mv = xa("transitioncancel"), So = xa("transitionend"), _o = /* @__PURE__ */ new Map(), Fc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Fc.push("scrollEnd");
  function fl(t, e) {
    _o.set(t, e), Ta(e, [t]);
  }
  var Ov = 0;
  function Rl(t, e) {
    if (t.name != null && t.name !== "auto") return t.name;
    if (e.autoName !== null) return e.autoName;
    t = ml.identifierPrefix;
    var l = Ov++;
    return t = "_" + t + "t_" + l.toString(32) + "_", e.autoName = t;
  }
  function Eo(t) {
    if (t == null || typeof t == "string")
      return t;
    var e = null, l = An;
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var n = t[l[a]];
        if (n != null) {
          if (n === "none") return "none";
          e = e == null ? n : e + (" " + n);
        }
      }
    return e ?? t.default;
  }
  function Dl(t, e) {
    return t = Eo(t), e = Eo(e), e == null ? t === "auto" ? null : t : e === "auto" ? null : e;
  }
  var si = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var e = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(e)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  }, tl = [], rn = 0, kc = 0;
  function fi() {
    for (var t = rn, e = kc = rn = 0; e < t; ) {
      var l = tl[e];
      tl[e++] = null;
      var a = tl[e];
      tl[e++] = null;
      var n = tl[e];
      tl[e++] = null;
      var u = tl[e];
      if (tl[e++] = null, a !== null && n !== null) {
        var i = a.pending;
        i === null ? n.next = n : (n.next = i.next, i.next = n), a.pending = n;
      }
      u !== 0 && To(l, n, u);
    }
  }
  function ri(t, e, l, a) {
    tl[rn++] = t, tl[rn++] = e, tl[rn++] = l, tl[rn++] = a, kc |= a, t.lanes |= a, t = t.alternate, t !== null && (t.lanes |= a);
  }
  function Wc(t, e, l, a) {
    return ri(t, e, l, a), oi(t);
  }
  function Ma(t, e) {
    return ri(t, null, null, e), oi(t);
  }
  function To(t, e, l) {
    t.lanes |= l;
    var a = t.alternate;
    a !== null && (a.lanes |= l);
    for (var n = !1, u = t.return; u !== null; )
      u.childLanes |= l, a = u.alternate, a !== null && (a.childLanes |= l), u.tag === 22 && (t = u.stateNode, t === null || t._visibility & 1 || (n = !0)), t = u, u = u.return;
    return t.tag === 3 ? (u = t.stateNode, n && e !== null && (n = 31 - Ve(l), t = u.hiddenUpdates, a = t[n], a === null ? t[n] = [e] : a.push(e), e.lane = l | 536870912), u) : null;
  }
  function oi(t) {
    if (50 < Mu)
      throw Mu = 0, tc = null, Error(s(185));
    for (var e = t.return; e !== null; )
      t = e, e = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var on = {};
  function zv(t, e, l, a) {
    this.tag = t, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Le(t, e, l, a) {
    return new zv(t, e, l, a);
  }
  function Ic(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Ul(t, e) {
    var l = t.alternate;
    return l === null ? (l = Le(
      t.tag,
      e,
      t.key,
      t.mode
    ), l.elementType = t.elementType, l.type = t.type, l.stateNode = t.stateNode, l.alternate = t, t.alternate = l) : (l.pendingProps = e, l.type = t.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = t.flags & 1206910976, l.childLanes = t.childLanes, l.lanes = t.lanes, l.child = t.child, l.memoizedProps = t.memoizedProps, l.memoizedState = t.memoizedState, l.updateQueue = t.updateQueue, e = t.dependencies, l.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }, l.sibling = t.sibling, l.index = t.index, l.ref = t.ref, l.refCleanup = t.refCleanup, l;
  }
  function No(t, e) {
    t.flags &= 1206910978;
    var l = t.alternate;
    return l === null ? (t.childLanes = 0, t.lanes = e, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = l.childLanes, t.lanes = l.lanes, t.child = l.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = l.memoizedProps, t.memoizedState = l.memoizedState, t.updateQueue = l.updateQueue, t.type = l.type, e = l.dependencies, t.dependencies = e === null ? null : {
      lanes: e.lanes,
      firstContext: e.firstContext
    }), t;
  }
  function di(t, e, l, a, n, u) {
    var i = 0;
    if (a = t, typeof a == "function") Ic(a) && (i = 1);
    else if (typeof a == "string")
      i = lg(
        t,
        l,
        Q.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (a) {
        case Pt:
          return t = Le(31, l, e, n), t.elementType = Pt, t.lanes = u, t;
        case nt:
          return Oa(l.children, n, u, e);
        case bt:
          i = 8, n |= 24;
          break;
        case Gt:
          return t = Le(12, l, e, n | 2), t.elementType = Gt, t.lanes = u, t;
        case Y:
          return t = Le(13, l, e, n), t.elementType = Y, t.lanes = u, t;
        case G:
          return t = Le(19, l, e, n), t.elementType = G, t.lanes = u, t;
        case Zt:
        case g:
          return t = n | 32, t = Le(30, l, e, t), t.elementType = g, t.lanes = u, t.stateNode = {
            autoName: null,
            paired: null,
            clones: null,
            ref: null
          }, t;
        default:
          if (typeof a == "object" && a !== null)
            switch (a.$$typeof) {
              case ot:
                i = 10;
                break t;
              case Ft:
                i = 9;
                break t;
              case R:
                i = 11;
                break t;
              case st:
                i = 14;
                break t;
              case ft:
                i = 16, a = null;
                break t;
            }
          i = 29, l = Error(
            s(130, t === null ? "null" : typeof t, "")
          ), a = null;
      }
    return e = Le(i, l, e, n), e.elementType = t, e.type = a, e.lanes = u, e;
  }
  function Oa(t, e, l, a) {
    return t = Le(7, t, a, e), t.lanes = l, t;
  }
  function Pc(t, e, l) {
    return t = Le(6, t, null, e), t.lanes = l, t;
  }
  function xo(t) {
    var e = Le(18, null, null, 0);
    return e.stateNode = t, e;
  }
  function ts(t, e, l) {
    return e = Le(
      4,
      t.children !== null ? t.children : [],
      t.key,
      e
    ), e.lanes = l, e.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation
    }, e;
  }
  var Mo = /* @__PURE__ */ new WeakMap();
  function el(t, e) {
    if (typeof t == "object" && t !== null) {
      var l = Mo.get(t);
      return l !== void 0 ? l : (e = {
        value: t,
        source: e,
        stack: ze(e)
      }, Mo.set(t, e), e);
    }
    return {
      value: t,
      source: e,
      stack: ze(e)
    };
  }
  var dn = [], mn = 0, mi = null, uu = 0, ll = [], al = 0, $l = null, gl = 1, bl = "";
  function wl(t, e) {
    dn[mn++] = uu, dn[mn++] = mi, mi = t, uu = e;
  }
  function Oo(t, e, l) {
    ll[al++] = gl, ll[al++] = bl, ll[al++] = $l, $l = t;
    var a = gl;
    t = bl;
    var n = 32 - Ve(a) - 1;
    a &= ~(1 << n), l += 1;
    var u = 32 - Ve(e) + n;
    if (30 < u) {
      var i = n - n % 5;
      u = (a & (1 << i) - 1).toString(32), a >>= i, n -= i, gl = 1 << 32 - Ve(e) + n | l << n | a, bl = u + t;
    } else
      gl = 1 << u | l << n | a, bl = t;
  }
  function hi(t) {
    t.return !== null && (wl(t, 1), Oo(t, 1, 0));
  }
  function es(t) {
    for (; t === mi; )
      mi = dn[--mn], dn[mn] = null, uu = dn[--mn], dn[mn] = null;
    for (; t === $l; )
      $l = ll[--al], ll[al] = null, bl = ll[--al], ll[al] = null, gl = ll[--al], ll[al] = null;
  }
  function zo(t, e) {
    ll[al++] = gl, ll[al++] = bl, ll[al++] = $l, gl = e.id, bl = e.overflow, $l = t;
  }
  var ge = null, Xt = null, pt = !1, Fl = null, nl = !1, ls = Error(s(519));
  function kl(t) {
    var e = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw iu(el(e, t)), ls;
  }
  function Ao(t) {
    var e = t.stateNode, l = t.type, a = t.memoizedProps;
    switch (e[Se] = t, e[He] = a, l) {
      case "dialog":
        _t("cancel", e), _t("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        _t("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < zu.length; l++)
          _t(zu[l], e);
        break;
      case "source":
        _t("error", e);
        break;
      case "img":
      case "image":
      case "link":
        _t("error", e), _t("load", e);
        break;
      case "details":
        _t("toggle", e);
        break;
      case "input":
        _t("invalid", e), qr(
          e,
          a.value,
          a.defaultValue,
          a.checked,
          a.defaultChecked,
          a.type,
          a.name,
          !0
        );
        break;
      case "select":
        _t("invalid", e);
        break;
      case "textarea":
        _t("invalid", e), Xr(e, a.value, a.defaultValue, a.children);
    }
    l = a.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || e.textContent === "" + l || a.suppressHydrationWarning === !0 || km(e.textContent, l) ? (a.popover != null && (_t("beforetoggle", e), _t("toggle", e)), a.onScroll != null && _t("scroll", e), a.onScrollEnd != null && _t("scrollend", e), a.onClick != null && (e.onclick = yl), e = !0) : e = !1, e || kl(t, !0);
  }
  function vi(t) {
    for (ge = t.return; ge; )
      switch (ge.tag) {
        case 5:
        case 31:
        case 13:
          nl = !1;
          return;
        case 27:
        case 3:
          nl = !0;
          return;
        default:
          ge = ge.return;
      }
  }
  function hn(t) {
    if (t !== ge) return !1;
    if (!pt) return vi(t), pt = !0, !1;
    var e = t.tag, l;
    if ((l = e !== 3 && e !== 27) && ((l = e === 5) && (l = t.type, l = !(l !== "form" && l !== "button") || Df(t.type, t.memoizedProps)), l = !l), l && Xt && kl(t), vi(t), e === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      Xt = vh(t);
    } else if (e === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      Xt = vh(t);
    } else
      e === 27 ? (e = Xt, da(t.type) ? (t = Xf, Xf = null, Xt = t) : Xt = e) : Xt = ge ? il(t.stateNode.nextSibling) : null;
    return !0;
  }
  function za() {
    Xt = ge = null, pt = !1;
  }
  function as() {
    var t = Fl;
    return t !== null && (Ge === null ? Ge = t : Ge.push.apply(
      Ge,
      t
    ), Fl = null), t;
  }
  function iu(t) {
    Fl === null ? Fl = [t] : Fl.push(t);
  }
  var ns = ce(null), Aa = null, Bl = null;
  function Wl(t, e, l) {
    q(ns, e._currentValue), e._currentValue = l;
  }
  function Hl(t) {
    t._currentValue = ns.current, Yt(ns);
  }
  function yi(t, e, l) {
    for (; t !== null; ) {
      var a = t.alternate;
      if ((t.childLanes & e) !== e ? (t.childLanes |= e, a !== null && (a.childLanes |= e)) : a !== null && (a.childLanes & e) !== e && (a.childLanes |= e), t === l) break;
      t = t.return;
    }
  }
  function us(t, e, l, a) {
    var n = t.child;
    for (n !== null && (n.return = t); n !== null; ) {
      var u = n.dependencies;
      if (u !== null) {
        var i = n.child;
        u = u.firstContext;
        t: for (; u !== null; ) {
          var r = u;
          u = n;
          for (var m = 0; m < e.length; m++)
            if (r.context === e[m]) {
              u.lanes |= l, r = u.alternate, r !== null && (r.lanes |= l), yi(
                u.return,
                l,
                t
              ), a || (i = null);
              break t;
            }
          u = r.next;
        }
      } else if (n.tag === 18) {
        if (i = n.return, i === null) throw Error(s(341));
        i.lanes |= l, u = i.alternate, u !== null && (u.lanes |= l), yi(i, l, t), i = null;
      } else
        n.tag === 13 && n.memoizedState !== null && n.memoizedState.dehydrated === null ? (n.lanes |= l, i = n.alternate, i !== null && (i.lanes |= l), yi(
          n.return,
          l,
          t
        ), i = n.child, i = i !== null ? i.sibling : null) : i = n.child;
      if (i !== null) i.return = n;
      else
        for (i = n; i !== null; ) {
          if (i === t) {
            i = null;
            break;
          }
          if (n = i.sibling, n !== null) {
            n.return = i.return, i = n;
            break;
          }
          i = i.return;
        }
      n = i;
    }
  }
  function Ca(t, e, l, a) {
    t = null;
    for (var n = e, u = !1; n !== null; ) {
      if (!u) {
        if ((n.flags & 524288) !== 0) u = !0;
        else if ((n.flags & 262144) !== 0) break;
      }
      if (n.tag === 10) {
        var i = n.alternate;
        if (i === null) throw Error(s(387));
        if (i = i.memoizedProps, i !== null) {
          var r = n.type;
          Ke(n.pendingProps.value, i.value) || (t !== null ? t.push(r) : t = [r]);
        }
      } else if (n === me.current) {
        if (i = n.alternate, i === null) throw Error(s(387));
        i.memoizedState.memoizedState !== n.memoizedState.memoizedState && (t !== null ? t.push(Yn) : t = [Yn]);
      }
      n = n.return;
    }
    return t !== null && us(
      e,
      t,
      l,
      a
    ), e.flags |= 262144, t !== null;
  }
  function gi(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!Ke(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function ja(t) {
    Aa = t, Bl = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function _e(t) {
    return Co(Aa, t);
  }
  function bi(t, e) {
    return Aa === null && ja(t), Co(t, e);
  }
  function Co(t, e) {
    var l = e._currentValue;
    if (e = { context: e, memoizedValue: l, next: null }, Bl === null) {
      if (t === null) throw Error(s(308));
      Bl = e, t.dependencies = { lanes: 0, firstContext: e }, t.flags |= 524288;
    } else Bl = Bl.next = e;
    return l;
  }
  var Av = typeof AbortController < "u" ? AbortController : function() {
    var t = [], e = this.signal = {
      aborted: !1,
      addEventListener: function(l, a) {
        t.push(a);
      }
    };
    this.abort = function() {
      e.aborted = !0, t.forEach(function(l) {
        return l();
      });
    };
  }, Cv = c.unstable_scheduleCallback, jv = c.unstable_NormalPriority, ae = {
    $$typeof: ot,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function is() {
    return {
      controller: new Av(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function cu(t) {
    t.refCount--, t.refCount === 0 && Cv(jv, function() {
      t.controller.abort();
    });
  }
  function jo(t, e) {
    if ((t.pendingLanes & 4194048) !== 0) {
      var l = t.transitionTypes;
      for (l === null && (l = t.transitionTypes = []), t = 0; t < e.length; t++) {
        var a = e[t];
        l.indexOf(a) === -1 && l.push(a);
      }
    }
  }
  var su = null;
  function Rv(t) {
    var e = t.transitionTypes;
    return t.transitionTypes = null, e;
  }
  var fu = null, cs = 0, Ra = 0, vn = null;
  function Dv(t, e) {
    if (fu === null) {
      var l = fu = [];
      cs = 0, Ra = Nf(), vn = {
        status: "pending",
        value: void 0,
        then: function(a) {
          l.push(a);
        }
      };
    }
    return cs++, e.then(Ro, Ro), e;
  }
  function Ro() {
    if (--cs === 0 && (su = null, fu !== null)) {
      vn !== null && (vn.status = "fulfilled");
      var t = fu;
      fu = null, Ra = 0, vn = null;
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function Uv(t, e) {
    var l = [], a = {
      status: "pending",
      value: null,
      reason: null,
      then: function(n) {
        l.push(n);
      }
    };
    return t.then(
      function() {
        a.status = "fulfilled", a.value = e;
        for (var n = 0; n < l.length; n++) (0, l[n])(e);
      },
      function(n) {
        for (a.status = "rejected", a.reason = n, n = 0; n < l.length; n++)
          (0, l[n])(void 0);
      }
    ), a;
  }
  var Do = V.S;
  V.S = function(t, e) {
    if (xm = fe(), typeof e == "object" && e !== null && typeof e.then == "function" && Dv(t, e), su !== null)
      for (var l = Dn; l !== null; )
        jo(l, su), l = l.next;
    if (l = t.types, l !== null) {
      for (var a = Dn; a !== null; )
        jo(a, l), a = a.next;
      if (Ra !== 0) {
        a = su, a === null && (a = su = []);
        for (var n = 0; n < l.length; n++) {
          var u = l[n];
          a.indexOf(u) === -1 && a.push(u);
        }
      }
    }
    Do !== null && Do(t, e);
  };
  var Da = ce(null);
  function ss() {
    var t = Da.current;
    return t !== null ? t : qt.pooledCache;
  }
  function pi(t, e) {
    e === null ? q(Da, Da.current) : q(Da, e.pool);
  }
  function Uo() {
    var t = ss();
    return t === null ? null : { parent: ae._currentValue, pool: t };
  }
  var yn = Error(s(460)), fs = Error(s(474)), Si = Error(s(542)), _i = { then: function() {
  } };
  function wo(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function Bo(t, e, l) {
    switch (l = t[l], l === void 0 ? t.push(e) : l !== e && (e.then(yl, yl), e = l), e.status) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw t = e.reason, Lo(t), t === void 0 && !("reason" in e) ? Error(s(600)) : t;
      default:
        if (typeof e.status == "string") e.then(yl, yl);
        else {
          if (t = qt, t !== null && 100 < t.shellSuspendCounter)
            throw Error(s(482));
          t = e, t.status = "pending", t.then(
            function(a) {
              if (e.status === "pending") {
                var n = e;
                n.status = "fulfilled", n.value = a;
              }
            },
            function(a) {
              if (e.status === "pending") {
                var n = e;
                n.status = "rejected", n.reason = a;
              }
            }
          );
        }
        switch (e.status) {
          case "fulfilled":
            return e.value;
          case "rejected":
            throw t = e.reason, Lo(t), t;
        }
        throw wa = e, yn;
    }
  }
  function Ua(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (wa = l, yn) : l;
    }
  }
  var wa = null;
  function Ho() {
    if (wa === null) throw Error(s(459));
    var t = wa;
    return wa = null, t;
  }
  function Lo(t) {
    if (t === yn || t === Si)
      throw Error(s(483));
  }
  var gn = null, ru = 0;
  function Ei(t) {
    var e = ru;
    return ru += 1, gn === null && (gn = []), Bo(gn, t, e);
  }
  function Il(t, e) {
    e = e.props.ref, t.ref = e !== void 0 ? e : null;
  }
  function Ti(t, e) {
    throw e.$$typeof === tt ? Error(s(525)) : (t = Object.prototype.toString.call(e), Error(
      s(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t
      )
    ));
  }
  function Yo(t) {
    function e(S, y) {
      if (t) {
        var T = S.deletions;
        T === null ? (S.deletions = [y], S.flags |= 16) : T.push(y);
      }
    }
    function l(S, y) {
      if (!t) return null;
      for (; y !== null; )
        e(S, y), y = y.sibling;
      return null;
    }
    function a(S) {
      for (var y = /* @__PURE__ */ new Map(); S !== null; )
        S.key === null ? y.set(S.index, S) : y.set(S.key, S), S = S.sibling;
      return y;
    }
    function n(S, y) {
      return S = Ul(S, y), S.index = 0, S.sibling = null, S;
    }
    function u(S, y, T) {
      return S.index = T, t ? (T = S.alternate, T !== null ? (T = T.index, T < y ? (S.flags |= 2, y) : T) : (S.flags |= 134217730, y)) : (S.flags |= 1048576, y);
    }
    function i(S) {
      return t && S.alternate === null && (S.flags |= 134217730), S;
    }
    function r(S, y, T, D) {
      return y === null || y.tag !== 6 ? (y = Pc(T, S.mode, D), y.return = S, y) : (y = n(y, T), y.return = S, y);
    }
    function m(S, y, T, D) {
      var K = T.type;
      return K === nt ? (S = M(
        S,
        y,
        T.props.children,
        D,
        T.key
      ), Il(S, T), S) : y !== null && (y.elementType === K || typeof K == "object" && K !== null && K.$$typeof === ft && Ua(K) === y.type) ? (y = n(y, T.props), Il(y, T), y.return = S, y) : (y = di(
        T.type,
        T.key,
        T.props,
        null,
        S.mode,
        D
      ), Il(y, T), y.return = S, y);
    }
    function _(S, y, T, D) {
      return y === null || y.tag !== 4 || y.stateNode.containerInfo !== T.containerInfo || y.stateNode.implementation !== T.implementation ? (y = ts(T, S.mode, D), y.return = S, y) : (y = n(y, T.children || []), y.return = S, y);
    }
    function M(S, y, T, D, K) {
      return y === null || y.tag !== 7 ? (y = Oa(
        T,
        S.mode,
        D,
        K
      ), y.return = S, y) : (y = n(y, T), y.return = S, y);
    }
    function U(S, y, T) {
      if (typeof y == "string" && y !== "" || typeof y == "number" || typeof y == "bigint")
        return y = Pc(
          "" + y,
          S.mode,
          T
        ), y.return = S, y;
      if (typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case xt:
            return T = di(
              y.type,
              y.key,
              y.props,
              null,
              S.mode,
              T
            ), Il(T, y), T.return = S, T;
          case I:
            return y = ts(
              y,
              S.mode,
              T
            ), y.return = S, y;
          case ft:
            return y = Ua(y), U(S, y, T);
        }
        if (ut(y) || J(y))
          return y = Oa(
            y,
            S.mode,
            T,
            null
          ), y.return = S, y;
        if (typeof y.then == "function")
          return U(S, Ei(y), T);
        if (y.$$typeof === ot)
          return U(
            S,
            bi(S, y),
            T
          );
        Ti(S, y);
      }
      return null;
    }
    function p(S, y, T, D) {
      var K = y !== null ? y.key : null;
      if (typeof T == "string" && T !== "" || typeof T == "number" || typeof T == "bigint")
        return K !== null ? null : r(S, y, "" + T, D);
      if (typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case xt:
            return T.key === K ? m(S, y, T, D) : null;
          case I:
            return T.key === K ? _(S, y, T, D) : null;
          case ft:
            return T = Ua(T), p(S, y, T, D);
        }
        if (ut(T) || J(T))
          return K !== null ? null : M(S, y, T, D, null);
        if (typeof T.then == "function")
          return p(
            S,
            y,
            Ei(T),
            D
          );
        if (T.$$typeof === ot)
          return p(
            S,
            y,
            bi(S, T),
            D
          );
        Ti(S, T);
      }
      return null;
    }
    function N(S, y, T, D, K) {
      if (typeof D == "string" && D !== "" || typeof D == "number" || typeof D == "bigint")
        return S = S.get(T) || null, r(y, S, "" + D, K);
      if (typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case xt:
            return S = S.get(
              D.key === null ? T : D.key
            ) || null, m(y, S, D, K);
          case I:
            return S = S.get(
              D.key === null ? T : D.key
            ) || null, _(y, S, D, K);
          case ft:
            return D = Ua(D), N(
              S,
              y,
              T,
              D,
              K
            );
        }
        if (ut(D) || J(D))
          return S = S.get(T) || null, M(y, S, D, K, null);
        if (typeof D.then == "function")
          return N(
            S,
            y,
            T,
            Ei(D),
            K
          );
        if (D.$$typeof === ot)
          return N(
            S,
            y,
            T,
            bi(y, D),
            K
          );
        Ti(y, D);
      }
      return null;
    }
    function X(S, y, T, D) {
      for (var K = null, Nt = null, lt = y, it = y = 0, ie = null; lt !== null && it < T.length; it++) {
        lt.index > it ? (ie = lt, lt = null) : ie = lt.sibling;
        var Ot = p(
          S,
          lt,
          T[it],
          D
        );
        if (Ot === null) {
          lt === null && (lt = ie);
          break;
        }
        t && lt && Ot.alternate === null && e(S, lt), y = u(Ot, y, it), Nt === null ? K = Ot : Nt.sibling = Ot, Nt = Ot, lt = ie;
      }
      if (it === T.length)
        return l(S, lt), pt && wl(S, it), K;
      if (lt === null) {
        for (; it < T.length; it++)
          lt = U(S, T[it], D), lt !== null && (y = u(
            lt,
            y,
            it
          ), Nt === null ? K = lt : Nt.sibling = lt, Nt = lt);
        return pt && wl(S, it), K;
      }
      for (lt = a(lt); it < T.length; it++)
        ie = N(
          lt,
          S,
          it,
          T[it],
          D
        ), ie !== null && (t && (Ot = ie.alternate, Ot !== null && lt.delete(Ot.key === null ? it : Ot.key)), y = u(
          ie,
          y,
          it
        ), Nt === null ? K = ie : Nt.sibling = ie, Nt = ie);
      return t && lt.forEach(function(ga) {
        return e(S, ga);
      }), pt && wl(S, it), K;
    }
    function F(S, y, T, D) {
      if (T == null) throw Error(s(151));
      for (var K = null, Nt = null, lt = y, it = y = 0, ie = null, Ot = T.next(); lt !== null && !Ot.done; it++, Ot = T.next()) {
        lt.index > it ? (ie = lt, lt = null) : ie = lt.sibling;
        var ga = p(S, lt, Ot.value, D);
        if (ga === null) {
          lt === null && (lt = ie);
          break;
        }
        t && lt && ga.alternate === null && e(S, lt), y = u(ga, y, it), Nt === null ? K = ga : Nt.sibling = ga, Nt = ga, lt = ie;
      }
      if (Ot.done)
        return l(S, lt), pt && wl(S, it), K;
      if (lt === null) {
        for (; !Ot.done; it++, Ot = T.next())
          Ot = U(S, Ot.value, D), Ot !== null && (y = u(Ot, y, it), Nt === null ? K = Ot : Nt.sibling = Ot, Nt = Ot);
        return pt && wl(S, it), K;
      }
      for (lt = a(lt); !Ot.done; it++, Ot = T.next())
        Ot = N(lt, S, it, Ot.value, D), Ot !== null && (t && (ie = Ot.alternate, ie !== null && lt.delete(
          ie.key === null ? it : ie.key
        )), y = u(Ot, y, it), Nt === null ? K = Ot : Nt.sibling = Ot, Nt = Ot);
      return t && lt.forEach(function(hg) {
        return e(S, hg);
      }), pt && wl(S, it), K;
    }
    function gt(S, y, T, D) {
      if (typeof T == "object" && T !== null && T.type === nt && T.key === null && T.props.ref === void 0 && (T = T.props.children), typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case xt:
            t: {
              for (var K = T.key; y !== null; ) {
                if (y.key === K) {
                  if (K = T.type, K === nt) {
                    if (y.tag === 7) {
                      l(
                        S,
                        y.sibling
                      ), D = n(
                        y,
                        T.props.children
                      ), Il(D, T), D.return = S, S = D;
                      break t;
                    }
                  } else if (y.elementType === K || typeof K == "object" && K !== null && K.$$typeof === ft && Ua(K) === y.type) {
                    l(
                      S,
                      y.sibling
                    ), D = n(y, T.props), Il(D, T), D.return = S, S = D;
                    break t;
                  }
                  l(S, y);
                  break;
                } else e(S, y);
                y = y.sibling;
              }
              T.type === nt ? (D = Oa(
                T.props.children,
                S.mode,
                D,
                T.key
              ), Il(D, T), D.return = S, S = D) : (D = di(
                T.type,
                T.key,
                T.props,
                null,
                S.mode,
                D
              ), Il(D, T), D.return = S, S = D);
            }
            return i(S);
          case I:
            t: {
              for (K = T.key; y !== null; ) {
                if (y.key === K)
                  if (y.tag === 4 && y.stateNode.containerInfo === T.containerInfo && y.stateNode.implementation === T.implementation) {
                    l(
                      S,
                      y.sibling
                    ), D = n(y, T.children || []), D.return = S, S = D;
                    break t;
                  } else {
                    l(S, y);
                    break;
                  }
                else e(S, y);
                y = y.sibling;
              }
              D = ts(T, S.mode, D), D.return = S, S = D;
            }
            return i(S);
          case ft:
            return T = Ua(T), gt(
              S,
              y,
              T,
              D
            );
        }
        if (ut(T))
          return X(
            S,
            y,
            T,
            D
          );
        if (J(T)) {
          if (K = J(T), typeof K != "function") throw Error(s(150));
          return T = K.call(T), F(
            S,
            y,
            T,
            D
          );
        }
        if (typeof T.then == "function")
          return gt(
            S,
            y,
            Ei(T),
            D
          );
        if (T.$$typeof === ot)
          return gt(
            S,
            y,
            bi(S, T),
            D
          );
        Ti(S, T);
      }
      return typeof T == "string" && T !== "" || typeof T == "number" || typeof T == "bigint" ? (T = "" + T, y !== null && y.tag === 6 ? (l(S, y.sibling), D = n(y, T), D.return = S, S = D) : (l(S, y), D = Pc(T, S.mode, D), D.return = S, S = D), i(S)) : l(S, y);
    }
    return function(S, y, T, D) {
      try {
        ru = 0;
        var K = gt(
          S,
          y,
          T,
          D
        );
        return gn = null, K;
      } catch (lt) {
        if (lt === yn || lt === Si) throw lt;
        var Nt = Le(29, lt, null, S.mode);
        return Nt.lanes = D, Nt.return = S, Nt;
      }
    };
  }
  var Ba = Yo(!0), qo = Yo(!1), Pl = !1;
  function rs(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function os(t, e) {
    t = t.updateQueue, e.updateQueue === t && (e.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function ta(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function ea(t, e, l) {
    var a = t.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (Rt & 2) !== 0) {
      var n = a.pending;
      return n === null ? e.next = e : (e.next = n.next, n.next = e), a.pending = e, e = oi(t), To(t, null, l), e;
    }
    return ri(t, a, e, l), oi(t);
  }
  function ou(t, e, l) {
    if (e = e.updateQueue, e !== null && (e = e.shared, (l & 4194048) !== 0)) {
      var a = e.lanes;
      a &= t.pendingLanes, l |= a, e.lanes = l, Mr(t, l);
    }
  }
  function ds(t, e) {
    var l = t.updateQueue, a = t.alternate;
    if (a !== null && (a = a.updateQueue, l === a)) {
      var n = null, u = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var i = {
            lane: l.lane,
            tag: l.tag,
            payload: l.payload,
            callback: null,
            next: null
          };
          u === null ? n = u = i : u = u.next = i, l = l.next;
        } while (l !== null);
        u === null ? n = u = e : u = u.next = e;
      } else n = u = e;
      l = {
        baseState: a.baseState,
        firstBaseUpdate: n,
        lastBaseUpdate: u,
        shared: a.shared,
        callbacks: a.callbacks
      }, t.updateQueue = l;
      return;
    }
    t = l.lastBaseUpdate, t === null ? l.firstBaseUpdate = e : t.next = e, l.lastBaseUpdate = e;
  }
  var ms = !1;
  function du() {
    if (ms) {
      var t = vn;
      if (t !== null) throw t;
    }
  }
  function mu(t, e, l, a) {
    ms = !1;
    var n = t.updateQueue;
    Pl = !1;
    var u = n.firstBaseUpdate, i = n.lastBaseUpdate, r = n.shared.pending;
    if (r !== null) {
      n.shared.pending = null;
      var m = r, _ = m.next;
      m.next = null, i === null ? u = _ : i.next = _, i = m;
      var M = t.alternate;
      M !== null && (M = M.updateQueue, r = M.lastBaseUpdate, r !== i && (r === null ? M.firstBaseUpdate = _ : r.next = _, M.lastBaseUpdate = m));
    }
    if (u !== null) {
      var U = n.baseState;
      i = 0, M = _ = m = null, r = u;
      do {
        var p = r.lane & -536870913, N = p !== r.lane;
        if (N ? (Tt & p) === p : (a & p) === p) {
          p !== 0 && p === Ra && (ms = !0), M !== null && (M = M.next = {
            lane: 0,
            tag: r.tag,
            payload: r.payload,
            callback: null,
            next: null
          });
          t: {
            var X = t, F = r;
            p = e;
            var gt = l;
            switch (F.tag) {
              case 1:
                if (X = F.payload, typeof X == "function") {
                  U = X.call(gt, U, p);
                  break t;
                }
                U = X;
                break t;
              case 3:
                X.flags = X.flags & -65537 | 128;
              case 0:
                if (X = F.payload, p = typeof X == "function" ? X.call(gt, U, p) : X, p == null) break t;
                U = P({}, U, p);
                break t;
              case 2:
                Pl = !0;
            }
          }
          p = r.callback, p !== null && (t.flags |= 64, N && (t.flags |= 8192), N = n.callbacks, N === null ? n.callbacks = [p] : N.push(p));
        } else
          N = {
            lane: p,
            tag: r.tag,
            payload: r.payload,
            callback: r.callback,
            next: null
          }, M === null ? (_ = M = N, m = U) : M = M.next = N, i |= p;
        if (r = r.next, r === null) {
          if (r = n.shared.pending, r === null)
            break;
          N = r, r = N.next, N.next = null, n.lastBaseUpdate = N, n.shared.pending = null;
        }
      } while (!0);
      M === null && (m = U), n.baseState = m, n.firstBaseUpdate = _, n.lastBaseUpdate = M, u === null && (n.shared.lanes = 0), sa |= i, t.lanes = i, t.memoizedState = U;
    }
  }
  function Go(t, e) {
    if (typeof t != "function")
      throw Error(s(191, t));
    t.call(e);
  }
  function Xo(t, e) {
    var l = t.callbacks;
    if (l !== null)
      for (t.callbacks = null, t = 0; t < l.length; t++)
        Go(l[t], e);
  }
  var la = ce(null), Ni = ce(0);
  function Qo(t, e) {
    t = Xl, q(Ni, t), q(la, e), Xl = t | e.baseLanes;
  }
  function hs() {
    q(Ni, Xl), q(la, la.current);
  }
  function vs() {
    Xl = Ni.current, Yt(la), Yt(Ni);
  }
  var Ee = ce(null), Ae = null;
  function aa(t) {
    var e = t.alternate;
    q(Te, Te.current & 1), q(Ee, t), Ae === null && (e === null || la.current !== null || e.memoizedState !== null) && (Ae = t);
  }
  function ys(t) {
    q(Te, Te.current), q(Ee, t), Ae === null && (Ae = t);
  }
  function Vo(t) {
    t.tag === 22 ? (q(Te, Te.current), q(Ee, t), Ae === null && (Ae = t)) : na();
  }
  function na() {
    q(Te, Te.current), q(Ee, Ee.current);
  }
  function Je(t) {
    Yt(Ee), Ae === t && (Ae = null), Yt(Te);
  }
  var Te = ce(0);
  function hu(t, e) {
    q(Ee, Ee.current), q(Te, e);
  }
  function gs(t) {
    Yt(Te), Yt(Ee), Ae === t && (Ae = null);
  }
  function xi(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var l = e.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || qf(l) || Gf(l)))
          return e;
      } else if (e.tag === 19 && e.memoizedProps.revealOrder !== "independent") {
        if ((e.flags & 128) !== 0) return e;
      } else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === t) break;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) return null;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    return null;
  }
  var Ll = 0, yt = null, Lt = null, ne = null, Mi = !1, bn = !1, Ha = !1, Oi = 0, vu = 0, pn = null, wv = 0;
  function Wt() {
    throw Error(s(321));
  }
  function bs(t, e) {
    if (e === null) return !1;
    for (var l = 0; l < e.length && l < t.length; l++)
      if (!Ke(t[l], e[l])) return !1;
    return !0;
  }
  function ps(t, e, l, a, n, u) {
    return Ll = u, yt = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, V.H = t === null || t.memoizedState === null ? Od : zd, Ha = !1, u = l(a, n), Ha = !1, bn && (u = Ko(
      e,
      l,
      a,
      n
    )), Zo(t), u;
  }
  function Zo(t) {
    V.H = Ui;
    var e = Lt !== null && Lt.next !== null;
    if (Ll = 0, ne = Lt = yt = null, Mi = !1, vu = 0, pn = null, e) throw Error(s(300));
    t === null || ue || (t = t.dependencies, t !== null && gi(t) && (ue = !0));
  }
  function Ko(t, e, l, a) {
    yt = t;
    var n = 0;
    do {
      if (bn && (pn = null), vu = 0, bn = !1, 25 <= n) throw Error(s(301));
      if (n += 1, ne = Lt = null, t.updateQueue != null) {
        var u = t.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      V.H = Qv, u = e(l, a);
    } while (bn);
    return u;
  }
  function Bv() {
    var t = V.H, e = t.useState()[0];
    return e = typeof e.then == "function" ? yu(e) : e, t = t.useState()[0], (Lt !== null ? Lt.memoizedState : null) !== t && (yt.flags |= 1024), e;
  }
  function Ss() {
    var t = Oi !== 0;
    return Oi = 0, t;
  }
  function _s(t, e, l) {
    e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~l;
  }
  function Es(t) {
    if (Mi) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        e !== null && (e.pending = null), t = t.next;
      }
      Mi = !1;
    }
    Ll = 0, ne = Lt = yt = null, bn = !1, vu = Oi = 0, pn = null;
  }
  function Re() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return ne === null ? yt.memoizedState = ne = t : ne = ne.next = t, ne;
  }
  function ee() {
    if (Lt === null) {
      var t = yt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Lt.next;
    var e = ne === null ? yt.memoizedState : ne.next;
    if (e !== null)
      ne = e, Lt = t;
    else {
      if (t === null)
        throw yt.alternate === null ? Error(s(467)) : Error(s(310));
      Lt = t, t = {
        memoizedState: Lt.memoizedState,
        baseState: Lt.baseState,
        baseQueue: Lt.baseQueue,
        queue: Lt.queue,
        next: null
      }, ne === null ? yt.memoizedState = ne = t : ne = ne.next = t;
    }
    return ne;
  }
  function zi() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function yu(t) {
    var e = vu;
    return vu += 1, pn === null && (pn = []), t = Bo(pn, t, e), e = yt, (ne === null ? e.memoizedState : ne.next) === null && (e = e.alternate, V.H = e === null || e.memoizedState === null ? Od : zd), t;
  }
  function Ai(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return yu(t);
      if (t.$$typeof === H) return;
      if (t.$$typeof === ot) return _e(t);
    }
    throw Error(s(438, String(t)));
  }
  function Ts(t) {
    var e = null, l = yt.updateQueue;
    if (l !== null && (e = l.memoCache), e == null) {
      var a = yt.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (e = {
        data: a.data.map(function(n) {
          return n.slice();
        }),
        index: 0
      })));
    }
    if (e == null && (e = { data: [], index: 0 }), l === null && (l = zi(), yt.updateQueue = l), l.memoCache = e, l = e.data[e.index], l === void 0)
      for (l = e.data[e.index] = Array(t), a = 0; a < t; a++)
        l[a] = Oe;
    return e.index++, l;
  }
  function Yl(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function Ci(t) {
    var e = ee();
    return Ns(e, Lt, t);
  }
  function Ns(t, e, l) {
    var a = t.queue;
    if (a === null) throw Error(s(311));
    a.lastRenderedReducer = l;
    var n = t.baseQueue, u = a.pending;
    if (u !== null) {
      if (n !== null) {
        var i = n.next;
        n.next = u.next, u.next = i;
      }
      e.baseQueue = n = u, a.pending = null;
    }
    if (u = t.baseState, n === null) t.memoizedState = u;
    else {
      e = n.next;
      var r = i = null, m = null, _ = e, M = !1;
      do {
        var U = _.lane & -536870913;
        if (U !== _.lane ? (Tt & U) === U : (Ll & U) === U) {
          var p = _.revertLane;
          if (p === 0)
            m !== null && (m = m.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: _.action,
              hasEagerState: _.hasEagerState,
              eagerState: _.eagerState,
              next: null
            }), U === Ra && (M = !0);
          else if ((Ll & p) === p) {
            _ = _.next, p === Ra && (M = !0);
            continue;
          } else
            U = {
              lane: 0,
              revertLane: _.revertLane,
              gesture: null,
              action: _.action,
              hasEagerState: _.hasEagerState,
              eagerState: _.eagerState,
              next: null
            }, m === null ? (r = m = U, i = u) : m = m.next = U, yt.lanes |= p, sa |= p;
          U = _.action, Ha && l(u, U), u = _.hasEagerState ? _.eagerState : l(u, U);
        } else
          p = {
            lane: U,
            revertLane: _.revertLane,
            gesture: _.gesture,
            action: _.action,
            hasEagerState: _.hasEagerState,
            eagerState: _.eagerState,
            next: null
          }, m === null ? (r = m = p, i = u) : m = m.next = p, yt.lanes |= U, sa |= U;
        _ = _.next;
      } while (_ !== null && _ !== e);
      if (m === null ? i = u : m.next = r, !Ke(u, t.memoizedState) && (ue = !0, M && (l = vn, l !== null)))
        throw l;
      t.memoizedState = u, t.baseState = i, t.baseQueue = m, a.lastRenderedState = u;
    }
    return n === null && (a.lanes = 0), [t.memoizedState, a.dispatch];
  }
  function xs(t) {
    var e = ee(), l = e.queue;
    if (l === null) throw Error(s(311));
    l.lastRenderedReducer = t;
    var a = l.dispatch, n = l.pending, u = e.memoizedState;
    if (n !== null) {
      l.pending = null;
      var i = n = n.next;
      do
        u = t(u, i.action), i = i.next;
      while (i !== n);
      Ke(u, e.memoizedState) || (ue = !0), e.memoizedState = u, e.baseQueue === null && (e.baseState = u), l.lastRenderedState = u;
    }
    return [u, a];
  }
  function Jo(t, e, l) {
    var a = yt, n = ee(), u = pt;
    if (u) {
      if (l === void 0) throw Error(s(407));
      l = l();
    } else l = e();
    var i = !Ke(
      (Lt || n).memoizedState,
      l
    );
    if (i && (n.memoizedState = l, ue = !0), n = n.queue, zs(ko.bind(null, a, n, t), [
      t
    ]), t = n.getSnapshot !== e || i || ne !== null && (ne.memoizedState.tag & 1) !== 0, Sn(
      t ? 9 : 8,
      { destroy: void 0 },
      Fo.bind(null, a, n, l, e),
      null
    ), t) {
      if (a.flags |= 2048, qt === null) throw Error(s(349));
      u || (Ll & 127) !== 0 || $o(a, e, l);
    }
    return l;
  }
  function $o(t, e, l) {
    t.flags |= 16384, t = { getSnapshot: e, value: l }, e = yt.updateQueue, e === null ? (e = zi(), yt.updateQueue = e, e.stores = [t]) : (l = e.stores, l === null ? e.stores = [t] : l.push(t));
  }
  function Fo(t, e, l, a) {
    e.value = l, e.getSnapshot = a, Wo(e) && Io(t);
  }
  function ko(t, e, l) {
    return l(function() {
      Wo(e) && Io(t);
    });
  }
  function Wo(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var l = e();
      return !Ke(t, l);
    } catch {
      return !0;
    }
  }
  function Io(t) {
    var e = Ma(t, 2);
    e !== null && Xe(e, t, 2);
  }
  function Ms(t) {
    var e = Re();
    if (typeof t == "function") {
      var l = t;
      if (t = l(), Ha) {
        Zl(!0);
        try {
          l();
        } finally {
          Zl(!1);
        }
      }
    }
    return e.memoizedState = e.baseState = t, e.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Yl,
      lastRenderedState: t
    }, e;
  }
  function Po(t, e, l, a) {
    return t.baseState = l, Ns(
      t,
      Lt,
      typeof a == "function" ? a : Yl
    );
  }
  function Hv(t, e, l, a, n) {
    if (Di(t)) throw Error(s(485));
    if (t = e.action, t !== null) {
      var u = {
        payload: n,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(i) {
          u.listeners.push(i);
        }
      };
      V.T !== null ? l(!0) : u.isTransition = !1, a(u), l = e.pending, l === null ? (u.next = e.pending = u, td(e, u)) : (u.next = l.next, e.pending = l.next = u);
    }
  }
  function td(t, e) {
    var l = e.action, a = e.payload, n = t.state;
    if (e.isTransition) {
      var u = V.T, i = {};
      i.types = u !== null ? u.types : null, V.T = i;
      try {
        var r = l(n, a), m = V.S;
        m !== null && m(i, r), ed(t, e, r);
      } catch (_) {
        Os(t, e, _);
      } finally {
        u !== null && i.types !== null && (u.types = i.types), V.T = u;
      }
    } else
      try {
        u = l(n, a), ed(t, e, u);
      } catch (_) {
        Os(t, e, _);
      }
  }
  function ed(t, e, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(a) {
        ld(t, e, a);
      },
      function(a) {
        return Os(t, e, a);
      }
    ) : ld(t, e, l);
  }
  function ld(t, e, l) {
    e.status = "fulfilled", e.value = l, ad(e), t.state = l, e = t.pending, e !== null && (l = e.next, l === e ? t.pending = null : (l = l.next, e.next = l, td(t, l)));
  }
  function Os(t, e, l) {
    var a = t.pending;
    if (t.pending = null, a !== null) {
      a = a.next;
      do
        e.status = "rejected", e.reason = l, ad(e), e = e.next;
      while (e !== a);
    }
    t.action = null;
  }
  function ad(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function nd(t, e) {
    return e;
  }
  function ud(t, e) {
    if (pt) {
      var l = qt.formState;
      if (l !== null) {
        t: {
          var a = yt;
          if (pt) {
            if (Xt) {
              e: {
                for (var n = Xt, u = nl; n.nodeType !== 8; ) {
                  if (!u) {
                    n = null;
                    break e;
                  }
                  if (n = il(
                    n.nextSibling
                  ), n === null) {
                    n = null;
                    break e;
                  }
                }
                u = n.data, n = u === "F!" || u === "F" ? n : null;
              }
              if (n) {
                Xt = il(
                  n.nextSibling
                ), a = n.data === "F!";
                break t;
              }
            }
            kl(a);
          }
          a = !1;
        }
        a && (e = l[0]);
      }
    }
    return l = Re(), l.memoizedState = l.baseState = e, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: nd,
      lastRenderedState: e
    }, l.queue = a, l = Nd.bind(
      null,
      yt,
      a
    ), a.dispatch = l, a = Ms(!1), u = Ds.bind(
      null,
      yt,
      !1,
      a.queue
    ), a = Re(), n = {
      state: e,
      dispatch: null,
      action: t,
      pending: null
    }, a.queue = n, l = Hv.bind(
      null,
      yt,
      n,
      u,
      l
    ), n.dispatch = l, a.memoizedState = t, [e, l, !1];
  }
  function id(t) {
    var e = ee();
    return cd(e, Lt, t);
  }
  function cd(t, e, l) {
    if (e = Ns(
      t,
      e,
      nd
    )[0], t = Ci(Yl)[0], typeof e == "object" && e !== null && typeof e.then == "function")
      try {
        var a = yu(e);
      } catch (i) {
        throw i === yn ? Si : i;
      }
    else a = e;
    e = ee();
    var n = e.queue, u = n.dispatch;
    return l !== e.memoizedState && (yt.flags |= 2048, Sn(
      9,
      { destroy: void 0 },
      Lv.bind(null, n, l),
      null
    )), [a, u, t];
  }
  function Lv(t, e) {
    t.action = e;
  }
  function sd(t) {
    var e = ee(), l = Lt;
    if (l !== null)
      return cd(e, l, t);
    ee(), e = e.memoizedState, l = ee();
    var a = l.queue.dispatch;
    return l.memoizedState = t, [e, a, !1];
  }
  function Sn(t, e, l, a) {
    return t = { tag: t, create: l, deps: a, inst: e, next: null }, e = yt.updateQueue, e === null && (e = zi(), yt.updateQueue = e), l = e.lastEffect, l === null ? e.lastEffect = t.next = t : (a = l.next, l.next = t, t.next = a, e.lastEffect = t), t;
  }
  function fd() {
    return ee().memoizedState;
  }
  function ji(t, e, l, a) {
    var n = Re();
    yt.flags |= t, n.memoizedState = Sn(
      1 | e,
      { destroy: void 0 },
      l,
      a === void 0 ? null : a
    );
  }
  function Ri(t, e, l, a) {
    var n = ee();
    a = a === void 0 ? null : a;
    var u = n.memoizedState.inst;
    Lt !== null && a !== null && bs(a, Lt.memoizedState.deps) ? n.memoizedState = Sn(e, u, l, a) : (yt.flags |= t, n.memoizedState = Sn(
      1 | e,
      u,
      l,
      a
    ));
  }
  function rd(t, e) {
    ji(8390656, 8, t, e);
  }
  function zs(t, e) {
    Ri(2048, 8, t, e);
  }
  function Yv(t) {
    yt.flags |= 4;
    var e = yt.updateQueue;
    if (e === null)
      e = zi(), yt.updateQueue = e, e.events = [t];
    else {
      var l = e.events;
      l === null ? e.events = [t] : l.push(t);
    }
  }
  function od(t) {
    var e = ee().memoizedState;
    return Yv({ ref: e, nextImpl: t }), function() {
      if ((Rt & 2) !== 0) throw Error(s(440));
      return e.impl.apply(void 0, arguments);
    };
  }
  function dd(t, e) {
    return Ri(4, 2, t, e);
  }
  function md(t, e) {
    return Ri(4, 4, t, e);
  }
  function hd(t, e) {
    if (typeof e == "function") {
      t = t();
      var l = e(t);
      return function() {
        typeof l == "function" ? l() : e(null);
      };
    }
    if (e != null)
      return t = t(), e.current = t, function() {
        e.current = null;
      };
  }
  function vd(t, e, l) {
    l = l != null ? l.concat([t]) : null, Ri(4, 4, hd.bind(null, e, t), l);
  }
  function As() {
  }
  function yd(t, e) {
    var l = ee();
    e = e === void 0 ? null : e;
    var a = l.memoizedState;
    return e !== null && bs(e, a[1]) ? a[0] : (l.memoizedState = [t, e], t);
  }
  function gd(t, e) {
    var l = ee();
    e = e === void 0 ? null : e;
    var a = l.memoizedState;
    if (e !== null && bs(e, a[1]))
      return a[0];
    if (a = t(), Ha) {
      Zl(!0);
      try {
        t();
      } finally {
        Zl(!1);
      }
    }
    return l.memoizedState = [a, e], a;
  }
  function Cs(t, e, l) {
    return l === void 0 || (Ll & 1073741824) !== 0 && (Tt & 261930) === 0 ? t.memoizedState = e : (t.memoizedState = l, t = Om(), yt.lanes |= t, sa |= t, l);
  }
  function bd(t, e, l, a) {
    return Ke(l, e) ? l : la.current !== null ? (t = Cs(t, l, a), Ke(t, e) || (ue = !0), t) : (Ll & 106) === 0 || (Ll & 1073741824) !== 0 && (Tt & 261930) === 0 ? (ue = !0, t.memoizedState = l) : (t = Om(), yt.lanes |= t, sa |= t, e);
  }
  function pd(t, e, l, a, n) {
    var u = k.p;
    k.p = u !== 0 && 8 > u ? u : 8;
    var i = V.T, r = {};
    r.types = i !== null ? i.types : null, V.T = r, Ds(t, !1, e, l);
    try {
      var m = n(), _ = V.S;
      if (_ !== null && _(r, m), m !== null && typeof m == "object" && typeof m.then == "function") {
        var M = Uv(
          m,
          a
        );
        gu(
          t,
          e,
          M,
          We(t)
        );
      } else
        gu(
          t,
          e,
          a,
          We(t)
        );
    } catch (U) {
      gu(
        t,
        e,
        { then: function() {
        }, status: "rejected", reason: U },
        We()
      );
    } finally {
      k.p = u, i !== null && r.types !== null && (i.types = r.types), V.T = i;
    }
  }
  function qv() {
  }
  function js(t, e, l, a) {
    if (t.tag !== 5) throw Error(s(476));
    var n = Sd(t).queue;
    pd(
      t,
      n,
      e,
      Kt,
      l === null ? qv : function() {
        return _d(t), l(a);
      }
    );
  }
  function Sd(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: Kt,
      baseState: Kt,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Yl,
        lastRenderedState: Kt
      },
      next: null
    };
    var l = {};
    return e.next = {
      memoizedState: l,
      baseState: l,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Yl,
        lastRenderedState: l
      },
      next: null
    }, t.memoizedState = e, t = t.alternate, t !== null && (t.memoizedState = e), e;
  }
  function _d(t) {
    var e = Sd(t);
    e.next === null && (e = t.alternate.memoizedState), gu(
      t,
      e.next.queue,
      {},
      We()
    );
  }
  function Rs() {
    return _e(Yn);
  }
  function Ed() {
    return ee().memoizedState;
  }
  function Td() {
    return ee().memoizedState;
  }
  function Gv(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var l = We();
          t = ta(l);
          var a = ea(e, t, l);
          a !== null && (Xe(a, e, l), ou(a, e, l)), e = { cache: is() }, t.payload = e;
          return;
      }
      e = e.return;
    }
  }
  function Xv(t, e, l) {
    var a = We();
    l = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Di(t) ? xd(e, l) : (l = Wc(t, e, l, a), l !== null && (Xe(l, t, a), Md(l, e, a)));
  }
  function Nd(t, e, l) {
    var a = We();
    gu(t, e, l, a);
  }
  function gu(t, e, l, a) {
    var n = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Di(t)) xd(e, n);
    else {
      var u = t.alternate;
      if (t.lanes === 0 && (u === null || u.lanes === 0) && (u = e.lastRenderedReducer, u !== null))
        try {
          var i = e.lastRenderedState, r = u(i, l);
          if (n.hasEagerState = !0, n.eagerState = r, Ke(r, i))
            return ri(t, e, n, 0), qt === null && fi(), !1;
        } catch {
        }
      if (l = Wc(t, e, n, a), l !== null)
        return Xe(l, t, a), Md(l, e, a), !0;
    }
    return !1;
  }
  function Ds(t, e, l, a) {
    if (a = {
      lane: 2,
      revertLane: Nf(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Di(t)) {
      if (e) throw Error(s(479));
    } else
      e = Wc(
        t,
        l,
        a,
        2
      ), e !== null && Xe(e, t, 2);
  }
  function Di(t) {
    var e = t.alternate;
    return t === yt || e !== null && e === yt;
  }
  function xd(t, e) {
    bn = Mi = !0;
    var l = t.pending;
    l === null ? e.next = e : (e.next = l.next, l.next = e), t.pending = e;
  }
  function Md(t, e, l) {
    if ((l & 4194048) !== 0) {
      var a = e.lanes;
      a &= t.pendingLanes, l |= a, e.lanes = l, Mr(t, l);
    }
  }
  var Ui = {
    readContext: _e,
    use: Ai,
    useCallback: Wt,
    useContext: Wt,
    useEffect: Wt,
    useImperativeHandle: Wt,
    useLayoutEffect: Wt,
    useInsertionEffect: Wt,
    useMemo: Wt,
    useReducer: Wt,
    useRef: Wt,
    useState: Wt,
    useDebugValue: Wt,
    useDeferredValue: Wt,
    useTransition: Wt,
    useSyncExternalStore: Wt,
    useId: Wt,
    useHostTransitionStatus: Wt,
    useFormState: Wt,
    useActionState: Wt,
    useOptimistic: Wt,
    useMemoCache: Wt,
    useCacheRefresh: Wt,
    useEffectEvent: Wt
  }, Od = {
    readContext: _e,
    use: Ai,
    useCallback: function(t, e) {
      return Re().memoizedState = [
        t,
        e === void 0 ? null : e
      ], t;
    },
    useContext: _e,
    useEffect: rd,
    useImperativeHandle: function(t, e, l) {
      l = l != null ? l.concat([t]) : null, ji(
        4194308,
        4,
        hd.bind(null, e, t),
        l
      );
    },
    useLayoutEffect: function(t, e) {
      return ji(4194308, 4, t, e);
    },
    useInsertionEffect: function(t, e) {
      ji(4, 2, t, e);
    },
    useMemo: function(t, e) {
      var l = Re();
      e = e === void 0 ? null : e;
      var a = t();
      if (Ha) {
        Zl(!0);
        try {
          t();
        } finally {
          Zl(!1);
        }
      }
      return l.memoizedState = [a, e], a;
    },
    useReducer: function(t, e, l) {
      var a = Re();
      if (l !== void 0) {
        var n = l(e);
        if (Ha) {
          Zl(!0);
          try {
            l(e);
          } finally {
            Zl(!1);
          }
        }
      } else n = e;
      return a.memoizedState = a.baseState = n, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: n
      }, a.queue = t, t = t.dispatch = Xv.bind(
        null,
        yt,
        t
      ), [a.memoizedState, t];
    },
    useRef: function(t) {
      var e = Re();
      return t = { current: t }, e.memoizedState = t;
    },
    useState: function(t) {
      t = Ms(t);
      var e = t.queue, l = Nd.bind(null, yt, e);
      return e.dispatch = l, [t.memoizedState, l];
    },
    useDebugValue: As,
    useDeferredValue: function(t, e) {
      var l = Re();
      return Cs(l, t, e);
    },
    useTransition: function() {
      var t = Ms(!1);
      return t = pd.bind(
        null,
        yt,
        t.queue,
        !0,
        !1
      ), Re().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, e, l) {
      var a = yt, n = Re();
      if (pt) {
        if (l === void 0)
          throw Error(s(407));
        l = l();
      } else {
        if (l = e(), qt === null)
          throw Error(s(349));
        (Tt & 127) !== 0 || $o(a, e, l);
      }
      n.memoizedState = l;
      var u = { value: l, getSnapshot: e };
      return n.queue = u, rd(ko.bind(null, a, u, t), [
        t
      ]), a.flags |= 2048, Sn(
        9,
        { destroy: void 0 },
        Fo.bind(
          null,
          a,
          u,
          l,
          e
        ),
        null
      ), l;
    },
    useId: function() {
      var t = Re(), e = qt.identifierPrefix;
      if (pt) {
        var l = bl, a = gl;
        l = (a & ~(1 << 32 - Ve(a) - 1)).toString(32) + l, e = "_" + e + "R_" + l, l = Oi++, 0 < l && (e += "H" + l.toString(32)), e += "_";
      } else
        l = wv++, e = "_" + e + "r_" + l.toString(32) + "_";
      return t.memoizedState = e;
    },
    useHostTransitionStatus: Rs,
    useFormState: ud,
    useActionState: ud,
    useOptimistic: function(t) {
      var e = Re();
      e.memoizedState = e.baseState = t;
      var l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return e.queue = l, e = Ds.bind(
        null,
        yt,
        !0,
        l
      ), l.dispatch = e, [t, e];
    },
    useMemoCache: Ts,
    useCacheRefresh: function() {
      return Re().memoizedState = Gv.bind(
        null,
        yt
      );
    },
    useEffectEvent: function(t) {
      var e = Re(), l = { impl: t };
      return e.memoizedState = l, function() {
        if ((Rt & 2) !== 0)
          throw Error(s(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, zd = {
    readContext: _e,
    use: Ai,
    useCallback: yd,
    useContext: _e,
    useEffect: zs,
    useImperativeHandle: vd,
    useInsertionEffect: dd,
    useLayoutEffect: md,
    useMemo: gd,
    useReducer: Ci,
    useRef: fd,
    useState: function() {
      return Ci(Yl);
    },
    useDebugValue: As,
    useDeferredValue: function(t, e) {
      var l = ee();
      return bd(
        l,
        Lt.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = Ci(Yl)[0], e = ee().memoizedState;
      return [
        typeof t == "boolean" ? t : yu(t),
        e
      ];
    },
    useSyncExternalStore: Jo,
    useId: Ed,
    useHostTransitionStatus: Rs,
    useFormState: id,
    useActionState: id,
    useOptimistic: function(t, e) {
      var l = ee();
      return Po(l, Lt, t, e);
    },
    useMemoCache: Ts,
    useCacheRefresh: Td,
    useEffectEvent: od
  }, Qv = {
    readContext: _e,
    use: Ai,
    useCallback: yd,
    useContext: _e,
    useEffect: zs,
    useImperativeHandle: vd,
    useInsertionEffect: dd,
    useLayoutEffect: md,
    useMemo: gd,
    useReducer: xs,
    useRef: fd,
    useState: function() {
      return xs(Yl);
    },
    useDebugValue: As,
    useDeferredValue: function(t, e) {
      var l = ee();
      return Lt === null ? Cs(l, t, e) : bd(
        l,
        Lt.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = xs(Yl)[0], e = ee().memoizedState;
      return [
        typeof t == "boolean" ? t : yu(t),
        e
      ];
    },
    useSyncExternalStore: Jo,
    useId: Ed,
    useHostTransitionStatus: Rs,
    useFormState: sd,
    useActionState: sd,
    useOptimistic: function(t, e) {
      var l = ee();
      return Lt !== null ? Po(l, Lt, t, e) : (l.baseState = t, [t, l.queue.dispatch]);
    },
    useMemoCache: Ts,
    useCacheRefresh: Td,
    useEffectEvent: od
  };
  function Us(t, e, l, a) {
    e = t.memoizedState, l = l(a, e), l = l == null ? e : P({}, e, l), t.memoizedState = l, t.lanes === 0 && (t.updateQueue.baseState = l);
  }
  var ws = {
    enqueueSetState: function(t, e, l) {
      t = t._reactInternals;
      var a = We(), n = ta(a);
      n.payload = e, l != null && (n.callback = l), e = ea(t, n, a), e !== null && (Xe(e, t, a), ou(e, t, a));
    },
    enqueueReplaceState: function(t, e, l) {
      t = t._reactInternals;
      var a = We(), n = ta(a);
      n.tag = 1, n.payload = e, l != null && (n.callback = l), e = ea(t, n, a), e !== null && (Xe(e, t, a), ou(e, t, a));
    },
    enqueueForceUpdate: function(t, e) {
      t = t._reactInternals;
      var l = We(), a = ta(l);
      a.tag = 2, e != null && (a.callback = e), e = ea(t, a, l), e !== null && (Xe(e, t, l), ou(e, t, l));
    }
  };
  function Ad(t, e, l, a, n, u, i) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(a, u, i) : e.prototype && e.prototype.isPureReactComponent ? !au(l, a) || !au(n, u) : !0;
  }
  function Cd(t, e, l, a) {
    t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(l, a), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(l, a), e.state !== t && ws.enqueueReplaceState(e, e.state, null);
  }
  function La(t, e) {
    var l = e;
    if ("ref" in e) {
      l = {};
      for (var a in e)
        a !== "ref" && (l[a] = e[a]);
    }
    if (t = t.defaultProps) {
      l === e && (l = P({}, l));
      for (var n in t)
        l[n] === void 0 && (l[n] = t[n]);
    }
    return l;
  }
  function jd(t) {
    si(t);
  }
  function Rd(t) {
    console.error(t);
  }
  function Dd(t) {
    si(t);
  }
  function wi(t, e) {
    try {
      var l = t.onUncaughtError;
      l(e.value, { componentStack: e.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function Ud(t, e, l) {
    try {
      var a = t.onCaughtError;
      a(l.value, {
        componentStack: l.stack,
        errorBoundary: e.tag === 1 ? e.stateNode : null
      });
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  function Bs(t, e, l) {
    return l = ta(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      wi(t, e);
    }, l;
  }
  function wd(t) {
    return t = ta(t), t.tag = 3, t;
  }
  function Bd(t, e, l, a) {
    var n = l.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var u = a.value;
      t.payload = function() {
        return n(u);
      }, t.callback = function() {
        Ud(e, l, a);
      };
    }
    var i = l.stateNode;
    i !== null && typeof i.componentDidCatch == "function" && (t.callback = function() {
      Ud(e, l, a), typeof n != "function" && (fa === null ? fa = /* @__PURE__ */ new Set([this]) : fa.add(this));
      var r = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: r !== null ? r : ""
      });
    });
  }
  function Vv(t, e, l, a, n) {
    if (l.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (e = l.alternate, e !== null && Ca(
        e,
        l,
        n,
        !0
      ), l = Ee.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
          case 19:
            return Ae === null ? lc() : l.alternate === null && It === 0 && (It = 3), l.flags &= -257, l.flags |= 65536, l.lanes = n, a === _i ? l.flags |= 16384 : (e = l.updateQueue, e === null ? l.updateQueue = /* @__PURE__ */ new Set([a]) : e.add(a), _f(t, a, n)), !1;
          case 22:
            return l.flags |= 65536, a === _i ? l.flags |= 16384 : (e = l.updateQueue, e === null ? (e = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, l.updateQueue = e) : (l = e.retryQueue, l === null ? e.retryQueue = /* @__PURE__ */ new Set([a]) : l.add(a)), _f(t, a, n)), !1;
        }
        throw Error(s(435, l.tag));
      }
      return _f(t, a, n), lc(), !1;
    }
    if (pt)
      return e = Ee.current, e !== null ? ((e.flags & 65536) === 0 && (e.flags |= 256), e.flags |= 65536, e.lanes = n, a !== ls && (t = Error(s(422), { cause: a }), iu(el(t, l)))) : (a !== ls && (e = Error(s(423), {
        cause: a
      }), iu(
        el(e, l)
      )), t = t.current.alternate, t.flags |= 65536, n &= -n, t.lanes |= n, a = el(a, l), n = Bs(
        t.stateNode,
        a,
        n
      ), ds(t, n), It !== 4 && (It = 2)), !1;
    var u = Error(s(520), { cause: a });
    if (u = el(u, l), xu === null ? xu = [u] : xu.push(u), It !== 4 && (It = 2), e === null) return !0;
    a = el(a, l), l = e;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, t = n & -n, l.lanes |= t, t = Bs(l.stateNode, a, t), ds(l, t), !1;
        case 1:
          if (e = l.type, u = l.stateNode, (l.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (fa === null || !fa.has(u))))
            return l.flags |= 65536, n &= -n, l.lanes |= n, n = wd(n), Bd(
              n,
              t,
              l,
              a
            ), ds(l, n), !1;
          break;
        case 22:
          if (l.memoizedState !== null)
            return l.flags |= 65536, !1;
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var Hs = Error(s(461)), ue = !1;
  function re(t, e, l, a) {
    e.child = t === null ? qo(e, null, l, a) : Ba(
      e,
      t.child,
      l,
      a
    );
  }
  function Hd(t, e, l, a, n) {
    l = l.render;
    var u = e.ref;
    if ("ref" in a) {
      var i = {};
      for (var r in a)
        r !== "ref" && (i[r] = a[r]);
    } else i = a;
    return ja(e), a = ps(
      t,
      e,
      l,
      i,
      u,
      n
    ), r = Ss(), t !== null && !ue ? (_s(t, e, n), ql(t, e, n)) : (pt && r && hi(e), e.flags |= 1, re(t, e, a, n), e.child);
  }
  function Ld(t, e, l, a, n) {
    if (t === null) {
      var u = l.type;
      return typeof u == "function" && !Ic(u) && u.defaultProps === void 0 && l.compare === null ? (e.tag = 15, e.type = u, Yd(
        t,
        e,
        u,
        a,
        n
      )) : (t = di(
        l.type,
        null,
        a,
        e,
        e.mode,
        n
      ), t.ref = e.ref, t.return = e, e.child = t);
    }
    if (u = t.child, !Zs(t, n)) {
      var i = u.memoizedProps;
      if (l = l.compare, l = l !== null ? l : au, l(i, a) && t.ref === e.ref)
        return ql(t, e, n);
    }
    return e.flags |= 1, t = Ul(u, a), t.ref = e.ref, t.return = e, e.child = t;
  }
  function Yd(t, e, l, a, n) {
    if (t !== null) {
      var u = t.memoizedProps;
      if (au(u, a) && t.ref === e.ref)
        if (ue = !1, e.pendingProps = a = u, Zs(t, n))
          (t.flags & 131072) !== 0 && (ue = !0);
        else
          return e.lanes = t.lanes, ql(t, e, n);
    }
    return Ls(
      t,
      e,
      l,
      a,
      n
    );
  }
  function qd(t, e, l, a) {
    var n = a.children, u = t !== null ? t.memoizedState : null;
    if (t === null && e.stateNode === null && (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), a.mode === "hidden") {
      if ((e.flags & 128) !== 0) {
        if (u = u !== null ? u.baseLanes | l : l, t !== null) {
          for (a = e.child = t.child, n = 0; a !== null; )
            n = n | a.lanes | a.childLanes, a = a.sibling;
          a = n & ~u;
        } else a = 0, e.child = null;
        return Gd(
          t,
          e,
          u,
          l,
          a
        );
      }
      if ((l & 536870912) !== 0)
        e.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && pi(
          e,
          u !== null ? u.cachePool : null
        ), u !== null ? Qo(e, u) : hs(), Vo(e);
      else
        return a = e.lanes = 536870912, Gd(
          t,
          e,
          u !== null ? u.baseLanes | l : l,
          l,
          a
        );
    } else
      u !== null ? (pi(e, u.cachePool), Qo(e, u), na(), e.memoizedState = null) : (t !== null && pi(e, null), hs(), na());
    return re(t, e, n, l), e.child;
  }
  function bu(t, e) {
    return t !== null && t.tag === 22 || e.stateNode !== null || (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), e.sibling;
  }
  function Gd(t, e, l, a, n) {
    var u = ss();
    return u = u === null ? null : { parent: ae._currentValue, pool: u }, e.memoizedState = {
      baseLanes: l,
      cachePool: u
    }, t !== null && pi(e, null), hs(), Vo(e), t !== null && Ca(t, e, a, !0), e.childLanes = n, null;
  }
  function Bi(t, e) {
    return e = Hi(
      { mode: e.mode, children: e.children },
      t.mode
    ), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function Xd(t, e, l) {
    return Ba(e, t.child, null, l), t = Bi(e, e.pendingProps), t.flags |= 2, Je(e), e.memoizedState = null, t;
  }
  function Zv(t, e, l) {
    var a = e.pendingProps, n = (e.flags & 128) !== 0;
    if (e.flags &= -129, t === null) {
      if (pt) {
        if (a.mode === "hidden")
          return t = Bi(e, a), e.lanes = 536870912, t.memoizedState = { baseLanes: 0, cachePool: null }, bu(null, t);
        if (ys(e), (t = Xt) ? (t = hh(
          t,
          nl
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: $l !== null ? { id: gl, overflow: bl } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = xo(t), l.return = e, e.child = l, ge = e, Xt = null)) : t = null, t === null) throw kl(e);
        return e.lanes = 536870912, null;
      }
      return Bi(e, a);
    }
    var u = t.memoizedState;
    if (u !== null) {
      var i = u.dehydrated;
      if (ys(e), n)
        if (e.flags & 256)
          e.flags &= -257, e = Xd(
            t,
            e,
            l
          );
        else if (e.memoizedState !== null)
          e.child = t.child, e.flags |= 128, e = null;
        else throw Error(s(558));
      else if (ue || Ca(t, e, l, !1), n = (l & t.childLanes) !== 0, ue || n) {
        if (la.current === null) {
          if (a = qt, a !== null && (i = Or(a, l), i !== 0 && i !== u.retryLane))
            throw u.retryLane = i, Ma(t, i), Xe(a, t, i), Hs;
          lc();
        }
        e = Xd(
          t,
          e,
          l
        );
      } else
        t = u.treeContext, Xt = il(i.nextSibling), ge = e, pt = !0, Fl = null, nl = !1, t !== null && zo(e, t), e = Bi(e, a), e.flags |= 134221824;
      return e;
    }
    return t = Ul(t.child, {
      mode: a.mode,
      children: a.children
    }), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function _n(t, e) {
    var l = e.ref;
    if (l === null)
      t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object")
        throw Error(s(284));
      (t === null || t.ref !== l) && (e.flags |= 4194816);
    }
  }
  function Ls(t, e, l, a, n) {
    return ja(e), l = ps(
      t,
      e,
      l,
      a,
      void 0,
      n
    ), a = Ss(), t !== null && !ue ? (_s(t, e, n), ql(t, e, n)) : (pt && a && hi(e), e.flags |= 1, re(t, e, l, n), e.child);
  }
  function Qd(t, e, l, a, n, u) {
    return ja(e), e.updateQueue = null, l = Ko(
      e,
      a,
      l,
      n
    ), Zo(t), a = Ss(), t !== null && !ue ? (_s(t, e, u), ql(t, e, u)) : (pt && a && hi(e), e.flags |= 1, re(t, e, l, u), e.child);
  }
  function Vd(t, e, l, a, n) {
    if (ja(e), e.stateNode === null) {
      var u = on, i = l.contextType;
      typeof i == "object" && i !== null && (u = _e(i)), u = new l(a, u), e.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = ws, e.stateNode = u, u._reactInternals = e, u = e.stateNode, u.props = a, u.state = e.memoizedState, u.refs = {}, rs(e), i = l.contextType, u.context = typeof i == "object" && i !== null ? _e(i) : on, u.state = e.memoizedState, i = l.getDerivedStateFromProps, typeof i == "function" && (Us(
        e,
        l,
        i,
        a
      ), u.state = e.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (i = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), i !== u.state && ws.enqueueReplaceState(u, u.state, null), mu(e, a, u, n), du(), u.state = e.memoizedState), typeof u.componentDidMount == "function" && (e.flags |= 4194308), a = !0;
    } else if (t === null) {
      u = e.stateNode;
      var r = e.memoizedProps, m = La(l, r);
      u.props = m;
      var _ = u.context, M = l.contextType;
      i = on, typeof M == "object" && M !== null && (i = _e(M));
      var U = l.getDerivedStateFromProps;
      M = typeof U == "function" || typeof u.getSnapshotBeforeUpdate == "function", r = e.pendingProps !== r, M || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (r || _ !== i) && Cd(
        e,
        u,
        a,
        i
      ), Pl = !1;
      var p = e.memoizedState;
      u.state = p, mu(e, a, u, n), du(), _ = e.memoizedState, r || p !== _ || Pl ? (typeof U == "function" && (Us(
        e,
        l,
        U,
        a
      ), _ = e.memoizedState), (m = Pl || Ad(
        e,
        l,
        m,
        a,
        p,
        _,
        i
      )) ? (M || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = a, e.memoizedState = _), u.props = a, u.state = _, u.context = i, a = m) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), a = !1);
    } else {
      u = e.stateNode, os(t, e), i = e.memoizedProps, M = La(l, i), u.props = M, U = e.pendingProps, p = u.context, _ = l.contextType, m = on, typeof _ == "object" && _ !== null && (m = _e(_)), r = l.getDerivedStateFromProps, (_ = typeof r == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (i !== U || p !== m) && Cd(
        e,
        u,
        a,
        m
      ), Pl = !1, p = e.memoizedState, u.state = p, mu(e, a, u, n), du();
      var N = e.memoizedState;
      i !== U || p !== N || Pl || t !== null && t.dependencies !== null && gi(t.dependencies) ? (typeof r == "function" && (Us(
        e,
        l,
        r,
        a
      ), N = e.memoizedState), (M = Pl || Ad(
        e,
        l,
        M,
        a,
        p,
        N,
        m
      ) || t !== null && t.dependencies !== null && gi(t.dependencies)) ? (_ || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(a, N, m), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        a,
        N,
        m
      )), typeof u.componentDidUpdate == "function" && (e.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && p === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && p === t.memoizedState || (e.flags |= 1024), e.memoizedProps = a, e.memoizedState = N), u.props = a, u.state = N, u.context = m, a = M) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && p === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && p === t.memoizedState || (e.flags |= 1024), a = !1);
    }
    return u = a, _n(t, e), a = (e.flags & 128) !== 0, u || a ? (u = e.stateNode, l = a && typeof l.getDerivedStateFromError != "function" ? null : u.render(), e.flags |= 1, t !== null && a ? (e.child = Ba(
      e,
      t.child,
      null,
      n
    ), e.child = Ba(
      e,
      null,
      l,
      n
    )) : re(t, e, l, n), e.memoizedState = u.state, t = e.child) : t = ql(
      t,
      e,
      n
    ), t;
  }
  function Zd(t, e, l, a) {
    return za(), e.flags |= 256, re(t, e, l, a), e.child;
  }
  var Ys = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function qs(t) {
    return { baseLanes: t, cachePool: Uo() };
  }
  function Gs(t, e, l) {
    return t = t !== null ? t.childLanes & ~l : 0, e && (t |= ke), t;
  }
  function Kd(t, e, l) {
    var a = e.pendingProps, n = !1, u = (e.flags & 128) !== 0, i;
    if ((i = u) || (i = t !== null && t.memoizedState === null ? !1 : (Te.current & 2) !== 0), i && (n = !0, e.flags &= -129), i = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
      if (pt) {
        if (n ? aa(e) : na(), (t = Xt) ? (t = hh(
          t,
          nl
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: $l !== null ? { id: gl, overflow: bl } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = xo(t), l.return = e, e.child = l, ge = e, Xt = null)) : t = null, t === null) throw kl(e);
        return Gf(t) ? e.lanes = 32 : e.lanes = 536870912, null;
      }
      return u = a.children, a = a.fallback, n ? (na(), n = e.mode, u = Hi(
        { mode: "hidden", children: u },
        n
      ), a = Oa(
        a,
        n,
        l,
        null
      ), u.return = e, a.return = e, u.sibling = a, e.child = u, a = e.child, a.memoizedState = qs(l), a.childLanes = Gs(
        t,
        i,
        l
      ), e.memoizedState = Ys, bu(null, a)) : (aa(e), Xs(e, u));
    }
    var r = t.memoizedState;
    if (r !== null) {
      var m = r.dehydrated;
      if (m !== null)
        return Kv(
          t,
          e,
          u,
          i,
          a,
          m,
          r,
          l
        );
    }
    return n ? (na(), n = a.fallback, u = e.mode, r = t.child, m = r.sibling, a = Ul(r, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = r.subtreeFlags & 1206910976, m !== null ? n = Ul(m, n) : (n = Oa(
      n,
      u,
      l,
      null
    ), n.flags |= 2), n.return = e, a.return = e, a.sibling = n, e.child = a, bu(null, a), a = e.child, n = t.child.memoizedState, n === null ? n = qs(l) : (u = n.cachePool, u !== null ? (r = ae._currentValue, u = u.parent !== r ? { parent: r, pool: r } : u) : u = Uo(), n = {
      baseLanes: n.baseLanes | l,
      cachePool: u
    }), a.memoizedState = n, a.childLanes = Gs(
      t,
      i,
      l
    ), e.memoizedState = Ys, bu(t.child, a)) : (aa(e), l = t.child, t = l.sibling, l = Ul(l, {
      mode: "visible",
      children: a.children
    }), l.return = e, l.sibling = null, t !== null && (i = e.deletions, i === null ? (e.deletions = [t], e.flags |= 16) : i.push(t)), e.child = l, e.memoizedState = null, l);
  }
  function Xs(t, e) {
    return e = Hi(
      { mode: "visible", children: e },
      t.mode
    ), e.return = t, t.child = e;
  }
  function Hi(t, e) {
    return t = Le(22, t, null, e), t.lanes = 0, t;
  }
  function Li(t, e, l) {
    return Ba(e, t.child, null, l), t = Xs(
      e,
      e.pendingProps.children
    ), t.flags |= 2, e.memoizedState = null, t;
  }
  function Kv(t, e, l, a, n, u, i, r) {
    if (l)
      return e.flags & 256 ? (aa(e), e.flags &= -257, Li(
        t,
        e,
        r
      )) : e.memoizedState !== null ? (na(), e.child = t.child, e.flags |= 128, null) : (na(), u = n.fallback, i = e.mode, n = Hi(
        { mode: "visible", children: n.children },
        i
      ), u = Oa(
        u,
        i,
        r,
        null
      ), u.flags |= 2, n.return = e, u.return = e, n.sibling = u, e.child = n, Ba(e, t.child, null, r), n = e.child, n.memoizedState = qs(r), n.childLanes = Gs(
        t,
        a,
        r
      ), e.memoizedState = Ys, bu(null, n));
    if (aa(e), Gf(u)) {
      if (a = u.nextSibling && u.nextSibling.dataset, a) var m = a.dgst;
      return a = m, a !== "" && (n = Error(s(419)), n.stack = "", n.digest = a, iu({ value: n, source: null, stack: null })), Li(
        t,
        e,
        r
      );
    }
    if (ue || Ca(t, e, r, !1), a = (r & t.childLanes) !== 0, ue || a) {
      if (la.current !== null)
        return Li(
          t,
          e,
          r
        );
      if (a = qt, a !== null && (n = Or(
        a,
        r
      ), n !== 0 && n !== i.retryLane))
        throw i.retryLane = n, Ma(t, n), Xe(a, t, n), Hs;
      return qf(u) || lc(), Li(
        t,
        e,
        r
      );
    }
    return qf(u) ? (e.flags |= 192, e.child = t.child, null) : (t = i.treeContext, Xt = il(u.nextSibling), ge = e, pt = !0, Fl = null, nl = !1, t !== null && zo(e, t), e = Xs(
      e,
      n.children
    ), e.flags |= 134221824, e);
  }
  function Jd(t, e, l) {
    t.lanes |= e;
    var a = t.alternate;
    a !== null && (a.lanes |= e), yi(t.return, e, l);
  }
  function $d(t) {
    for (var e = null; t !== null; ) {
      var l = t.alternate;
      l !== null && xi(l) === null && (e = t), t = t.sibling;
    }
    return e;
  }
  function Yi(t, e, l, a, n, u) {
    var i = t.memoizedState;
    i === null ? t.memoizedState = {
      isBackwards: e,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: l,
      tailMode: n,
      treeForkCount: u
    } : (i.isBackwards = e, i.rendering = null, i.renderingStartTime = 0, i.last = a, i.tail = l, i.tailMode = n, i.treeForkCount = u);
  }
  function Qs(t) {
    var e = t.child;
    for (t.child = null; e !== null; ) {
      var l = e.sibling;
      e.sibling = t.child, t.child = e, e = l;
    }
  }
  function Vs(t, e, l) {
    var a = e.pendingProps, n = a.revealOrder, u = a.tail;
    a = a.children;
    var i = Te.current;
    if (e.flags & 128)
      return hu(e, i), null;
    var r = (i & 2) !== 0;
    if (r ? (i = i & 1 | 2, e.flags |= 128) : i &= 1, hu(e, i), n === "backwards" && t !== null ? (Qs(t), re(t, e, a, l), Qs(t)) : re(t, e, a, l), a = pt ? uu : 0, !r && t !== null && (t.flags & 128) !== 0)
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && Jd(t, l, e);
        else if (t.tag === 19)
          Jd(t, l, e);
        else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            break t;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    switch (n) {
      case "backwards":
        l = $d(e.child), l === null ? (n = e.child, e.child = null) : (n = l.sibling, l.sibling = null, Qs(e)), Yi(
          e,
          !0,
          n,
          null,
          u,
          a
        );
        break;
      case "unstable_legacy-backwards":
        for (l = null, n = e.child, e.child = null; n !== null; ) {
          if (t = n.alternate, t !== null && xi(t) === null) {
            e.child = n;
            break;
          }
          t = n.sibling, n.sibling = l, l = n, n = t;
        }
        Yi(
          e,
          !0,
          l,
          null,
          u,
          a
        );
        break;
      case "together":
        Yi(
          e,
          !1,
          null,
          null,
          void 0,
          a
        );
        break;
      case "independent":
        e.memoizedState = null;
        break;
      default:
        l = $d(e.child), l === null ? (n = e.child, e.child = null) : (n = l.sibling, l.sibling = null), Yi(
          e,
          !1,
          n,
          l,
          u,
          a
        );
    }
    return e.child;
  }
  function Fd(t, e, l) {
    var a = e.pendingProps;
    return Wl(e, e.type, a.value), re(t, e, a.children, l), e.child;
  }
  function ql(t, e, l) {
    if (t !== null && (e.dependencies = t.dependencies), sa |= e.lanes, (l & e.childLanes) === 0)
      if (t !== null) {
        if (Ca(
          t,
          e,
          l,
          !1
        ), (l & e.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && e.child !== t.child)
      throw Error(s(153));
    if (e.child !== null) {
      for (t = e.child, l = Ul(t, t.pendingProps), e.child = l, l.return = e; t.sibling !== null; )
        t = t.sibling, l = l.sibling = Ul(t, t.pendingProps), l.return = e;
      l.sibling = null;
    }
    return e.child;
  }
  function Zs(t, e) {
    return (t.lanes & e) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && gi(t)));
  }
  function Jv(t, e, l) {
    switch (e.tag) {
      case 3:
        we(e, e.stateNode.containerInfo), Wl(e, ae, t.memoizedState.cache), za();
        break;
      case 27:
      case 5:
        pa(e);
        break;
      case 4:
        we(e, e.stateNode.containerInfo);
        break;
      case 10:
        Wl(
          e,
          e.type,
          e.memoizedProps.value
        );
        break;
      case 31:
        if (e.memoizedState !== null)
          return e.flags |= 128, ys(e), null;
        break;
      case 13:
        var a = e.memoizedState;
        if (a !== null) {
          if (a.dehydrated !== null)
            return aa(e), e.flags |= 128, null;
          a = Ca(
            t,
            e,
            l,
            !1
          );
          var n = e.child.childLanes;
          return a || (l & n) !== 0 ? Kd(t, e, l) : (aa(e), t = ql(
            t,
            e,
            l
          ), t !== null ? t.sibling : null);
        }
        aa(e);
        break;
      case 19:
        if (e.flags & 128)
          return Vs(
            t,
            e,
            l
          );
        if (n = (t.flags & 128) !== 0, a = (l & e.childLanes) !== 0, a || (Ca(
          t,
          e,
          l,
          !1
        ), a = (l & e.childLanes) !== 0), n) {
          if (a)
            return Vs(
              t,
              e,
              l
            );
          e.flags |= 128;
        }
        if (n = e.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), hu(e, Te.current), a) break;
        return null;
      case 22:
        return e.lanes = 0, qd(
          t,
          e,
          l,
          e.pendingProps
        );
      case 24:
        Wl(e, ae, t.memoizedState.cache);
    }
    return ql(t, e, l);
  }
  function kd(t, e, l) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps)
        ue = !0;
      else {
        if (!Zs(t, l) && (e.flags & 128) === 0)
          return ue = !1, Jv(
            t,
            e,
            l
          );
        ue = (t.flags & 131072) !== 0;
      }
    else
      ue = !1, pt && (e.flags & 1048576) !== 0 && Oo(e, uu, e.index);
    switch (e.lanes = 0, e.tag) {
      case 16:
        t: {
          var a = e.pendingProps;
          if (t = Ua(e.elementType), e.type = t, typeof t == "function")
            Ic(t) ? (a = La(t, a), e.tag = 1, e = Vd(
              null,
              e,
              t,
              a,
              l
            )) : (e.tag = 0, e = Ls(
              null,
              e,
              t,
              a,
              l
            ));
          else {
            if (t != null) {
              var n = t.$$typeof;
              if (n === R) {
                e.tag = 11, e = Hd(
                  null,
                  e,
                  t,
                  a,
                  l
                );
                break t;
              } else if (n === st) {
                e.tag = 14, e = Ld(
                  null,
                  e,
                  t,
                  a,
                  l
                );
                break t;
              } else if (n === ot) {
                e.tag = 10, e.type = t, e = Fd(
                  null,
                  e,
                  l
                );
                break t;
              }
            }
            throw e = dt(t) || t, Error(s(306, e, ""));
          }
        }
        return e;
      case 0:
        return Ls(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 1:
        return a = e.type, n = La(
          a,
          e.pendingProps
        ), Vd(
          t,
          e,
          a,
          n,
          l
        );
      case 3:
        t: {
          if (we(
            e,
            e.stateNode.containerInfo
          ), t === null) throw Error(s(387));
          a = e.pendingProps;
          var u = e.memoizedState;
          n = u.element, os(t, e), mu(e, a, null, l);
          var i = e.memoizedState;
          if (a = i.cache, Wl(e, ae, a), a !== u.cache && us(
            e,
            [ae],
            l,
            !0
          ), du(), a = i.element, u.isDehydrated)
            if (u = {
              element: a,
              isDehydrated: !1,
              cache: i.cache
            }, e.updateQueue.baseState = u, e.memoizedState = u, e.flags & 256) {
              e = Zd(
                t,
                e,
                a,
                l
              );
              break t;
            } else if (a !== n) {
              n = el(
                Error(s(424)),
                e
              ), iu(n), e = Zd(
                t,
                e,
                a,
                l
              );
              break t;
            } else
              for (t = e.stateNode.containerInfo, t.nodeType === 9 ? t = t.body : t = t.nodeName === "HTML" ? t.ownerDocument.body : t, Xt = il(t.firstChild), ge = e, pt = !0, Fl = null, nl = !0, l = qo(
                e,
                null,
                a,
                l
              ), e.child = l; l; )
                l.flags = l.flags & -3 | 134221824, l = l.sibling;
          else {
            if (za(), a === n) {
              e = ql(
                t,
                e,
                l
              );
              break t;
            }
            re(t, e, a, l);
          }
          e = e.child;
        }
        return e;
      case 26:
        return _n(t, e), t === null ? (l = _h(
          e.type,
          null,
          e.pendingProps,
          null
        )) ? e.memoizedState = l : pt || (e.stateNode = th(
          e.type,
          e.pendingProps,
          de.current,
          e
        )) : e.memoizedState = _h(
          e.type,
          t.memoizedProps,
          e.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return pa(e), t === null && pt && (a = e.stateNode = gh(
          e.type,
          e.pendingProps,
          de.current
        ), ge = e, nl = !0, n = Xt, da(e.type) ? (Xf = n, Xt = il(a.firstChild)) : Xt = n), re(
          t,
          e,
          e.pendingProps.children,
          l
        ), _n(t, e), t === null && (e.flags |= 4194304), e.child;
      case 5:
        return t === null && pt && ((n = a = Xt) && (a = Gy(
          a,
          e.type,
          e.pendingProps,
          nl
        ), a !== null ? (e.stateNode = a, ge = e, Xt = il(a.firstChild), nl = !1, n = !0) : n = !1), n || kl(e)), pa(e), n = e.type, u = e.pendingProps, i = t !== null ? t.memoizedProps : null, a = u.children, Df(n, u) ? a = null : i !== null && Df(n, i) && (e.flags |= 32), e.memoizedState !== null && (n = ps(
          t,
          e,
          Bv,
          null,
          null,
          l
        ), Yn._currentValue = n), _n(t, e), re(t, e, a, l), e.child;
      case 6:
        return t === null && pt && ((t = l = Xt) && (l = Xy(
          l,
          e.pendingProps,
          nl
        ), l !== null ? (e.stateNode = l, ge = e, Xt = null, t = !0) : t = !1), t || kl(e)), null;
      case 13:
        return Kd(t, e, l);
      case 4:
        return we(
          e,
          e.stateNode.containerInfo
        ), a = e.pendingProps, t === null ? e.child = Ba(
          e,
          null,
          a,
          l
        ) : re(t, e, a, l), e.child;
      case 11:
        return Hd(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 7:
        return a = e.pendingProps, _n(t, e), re(t, e, a, l), e.child;
      case 8:
        return re(
          t,
          e,
          e.pendingProps.children,
          l
        ), e.child;
      case 12:
        return re(
          t,
          e,
          e.pendingProps.children,
          l
        ), e.child;
      case 10:
        return Fd(t, e, l);
      case 9:
        return n = e.type._context, a = e.pendingProps.children, ja(e), n = _e(n), a = a(n), e.flags |= 1, re(t, e, a, l), e.child;
      case 14:
        return Ld(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 15:
        return Yd(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 19:
        return Vs(t, e, l);
      case 31:
        return Zv(t, e, l);
      case 22:
        return qd(
          t,
          e,
          l,
          e.pendingProps
        );
      case 24:
        return ja(e), a = _e(ae), t === null ? (n = ss(), n === null && (n = qt, u = is(), n.pooledCache = u, u.refCount++, u !== null && (n.pooledCacheLanes |= l), n = u), e.memoizedState = { parent: a, cache: n }, rs(e), Wl(e, ae, n)) : ((t.lanes & l) !== 0 && (os(t, e), mu(e, null, null, l), du()), n = t.memoizedState, u = e.memoizedState, n.parent !== a ? (n = { parent: a, cache: a }, e.memoizedState = n, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = n), Wl(e, ae, a)) : (a = u.cache, Wl(e, ae, a), a !== n.cache && us(
          e,
          [ae],
          l,
          !0
        ))), re(
          t,
          e,
          e.pendingProps.children,
          l
        ), e.child;
      case 30:
        return e.stateNode === null && (e.stateNode = {
          autoName: null,
          paired: null,
          clones: null,
          ref: null
        }), a = e.pendingProps, a.name != null && a.name !== "auto" ? e.flags |= t === null ? 18882560 : 18874368 : pt && hi(e), t !== null && t.memoizedProps.name !== a.name ? e.flags |= 4194816 : _n(t, e), re(t, e, a.children, l), e.child;
      case 29:
        throw e.pendingProps;
    }
    throw Error(s(156, e.tag));
  }
  function Gl(t) {
    t.flags |= 4;
  }
  function Ks(t, e, l, a, n) {
    var u;
    if ((u = (t.mode & 32) !== 0) && (u = l === null ? xh(e, a) : xh(e, a) && (a.src !== l.src || a.srcSet !== l.srcSet)), u) {
      if (t.flags |= 16777216, (n & 335544128) === n)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (jm()) t.flags |= 8192;
        else
          throw wa = _i, fs;
    } else t.flags &= -16777217;
  }
  function Wd(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !Mh(e))
      if (jm()) t.flags |= 8192;
      else
        throw wa = _i, fs;
  }
  function qi(t, e) {
    e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? Nr() : 536870912, t.lanes |= e, Mn |= e);
  }
  function pu(t, e) {
    if (!pt)
      switch (t.tailMode) {
        case "visible":
          break;
        case "collapsed":
          for (var l = t.tail, a = null; l !== null; )
            l.alternate !== null && (a = l), l = l.sibling;
          a === null ? e || t.tail === null ? t.tail = null : t.tail.sibling = null : a.sibling = null;
          break;
        default:
          for (e = t.tail, l = null; e !== null; )
            e.alternate !== null && (l = e), e = e.sibling;
          l === null ? t.tail = null : l.sibling = null;
      }
  }
  function Qt(t) {
    var e = t.alternate !== null && t.alternate.child === t.child, l = 0, a = 0;
    if (e)
      for (var n = t.child; n !== null; )
        l |= n.lanes | n.childLanes, a |= n.subtreeFlags & 1206910976, a |= n.flags & 1206910976, n.return = t, n = n.sibling;
    else
      for (n = t.child; n !== null; )
        l |= n.lanes | n.childLanes, a |= n.subtreeFlags, a |= n.flags, n.return = t, n = n.sibling;
    return t.subtreeFlags |= a, t.childLanes = l, e;
  }
  function $v(t, e, l) {
    var a = e.pendingProps;
    switch (es(e), e.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Qt(e), null;
      case 1:
        return Qt(e), null;
      case 3:
        return l = e.stateNode, a = null, t !== null && (a = t.memoizedState.cache), e.memoizedState.cache !== a && (e.flags |= 2048), Hl(ae), Be(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (t === null || t.child === null) && (hn(e) ? Gl(e) : t === null || t.memoizedState.isDehydrated && (e.flags & 256) === 0 || (e.flags |= 1024, as())), Qt(e), null;
      case 26:
        var n = e.type, u = e.memoizedState;
        return t === null ? (Gl(e), u !== null ? (Qt(e), Wd(e, u)) : (Qt(e), Ks(
          e,
          n,
          null,
          a,
          l
        ))) : u ? u !== t.memoizedState ? (Gl(e), Qt(e), Wd(e, u)) : (Qt(e), e.flags &= -16777217) : (t = t.memoizedProps, t !== a && Gl(e), Qt(e), Ks(
          e,
          n,
          t,
          a,
          l
        )), null;
      case 27:
        if (Vl(e), l = de.current, n = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== a && Gl(e);
        else {
          if (!a) {
            if (e.stateNode === null)
              throw Error(s(166));
            return Qt(e), e.subtreeFlags &= -33554433, null;
          }
          t = Q.current, hn(e) ? Ao(e) : (t = gh(n, a, l), e.stateNode = t, Gl(e));
        }
        return Qt(e), e.subtreeFlags &= -33554433, null;
      case 5:
        if (Vl(e), n = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== a && Gl(e);
        else {
          if (!a) {
            if (e.stateNode === null)
              throw Error(s(166));
            return Qt(e), e.subtreeFlags &= -33554433, null;
          }
          if (u = Q.current, hn(e))
            Ao(e);
          else {
            var i = Cu(
              de.current
            );
            switch (u) {
              case 1:
                u = i.createElementNS(
                  "http://www.w3.org/2000/svg",
                  n
                );
                break;
              case 2:
                u = i.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  n
                );
                break;
              default:
                switch (n) {
                  case "svg":
                    u = i.createElementNS(
                      "http://www.w3.org/2000/svg",
                      n
                    );
                    break;
                  case "math":
                    u = i.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      n
                    );
                    break;
                  case "script":
                    u = i.createElement("div"), u.innerHTML = "<script><\/script>", u = u.removeChild(
                      u.firstChild
                    );
                    break;
                  case "select":
                    u = typeof a.is == "string" ? i.createElement("select", {
                      is: a.is
                    }) : i.createElement("select"), a.multiple ? u.multiple = !0 : a.size && (u.size = a.size);
                    break;
                  default:
                    u = typeof a.is == "string" ? i.createElement(n, { is: a.is }) : i.createElement(n);
                }
            }
            u[Se] = e, u[He] = a;
            t: for (i = e.child; i !== null; ) {
              if (i.tag === 5 || i.tag === 6)
                u.appendChild(i.stateNode);
              else if (i.tag !== 4 && i.tag !== 27 && i.child !== null) {
                i.child.return = i, i = i.child;
                continue;
              }
              if (i === e) break t;
              for (; i.sibling === null; ) {
                if (i.return === null || i.return === e)
                  break t;
                i = i.return;
              }
              i.sibling.return = i.return, i = i.sibling;
            }
            e.stateNode = u;
            t: switch (xe(u, n, a), n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                a = !!a.autoFocus;
                break t;
              case "img":
                a = !0;
                break t;
              default:
                a = !1;
            }
            a && Gl(e);
          }
        }
        return Qt(e), e.subtreeFlags &= -33554433, Ks(
          e,
          e.type,
          t === null ? null : t.memoizedProps,
          e.pendingProps,
          l
        ), null;
      case 6:
        if (t && e.stateNode != null)
          t.memoizedProps !== a && Gl(e);
        else {
          if (typeof a != "string" && e.stateNode === null)
            throw Error(s(166));
          if (t = de.current, hn(e)) {
            if (t = e.stateNode, l = e.memoizedProps, a = null, n = ge, n !== null)
              switch (n.tag) {
                case 27:
                case 5:
                  a = n.memoizedProps;
              }
            t[Se] = e, t = !!(t.nodeValue === l || a !== null && a.suppressHydrationWarning === !0 || km(t.nodeValue, l)), t || kl(e, !0);
          } else
            t = Cu(t).createTextNode(
              a
            ), t[Se] = e, e.stateNode = t;
        }
        return Qt(e), null;
      case 31:
        if (l = e.memoizedState, t === null || t.memoizedState !== null) {
          if (a = hn(e), l !== null) {
            if (t === null) {
              if (!a) throw Error(s(318));
              if (t = e.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(557));
              t[Se] = e;
            } else
              za(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Qt(e), t = !1;
          } else
            l = as(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = l), t = !0;
          if (!t)
            return e.flags & 256 ? (Je(e), e) : (Je(e), null);
          if ((e.flags & 128) !== 0)
            throw Error(s(558));
        }
        return Qt(e), null;
      case 13:
        if (a = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (n = hn(e), a !== null && a.dehydrated !== null) {
            if (t === null) {
              if (!n) throw Error(s(318));
              if (n = e.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(s(317));
              n[Se] = e;
            } else
              za(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Qt(e), n = !1;
          } else
            n = as(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return e.flags & 256 ? (Je(e), e) : (Je(e), null);
        }
        return Je(e), (e.flags & 128) !== 0 ? (e.lanes = l, e) : (l = a !== null, t = t !== null && t.memoizedState !== null, l && (a = e.child, n = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (n = a.alternate.memoizedState.cachePool.pool), u = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (u = a.memoizedState.cachePool.pool), u !== n && (a.flags |= 2048)), l !== t && l && (e.child.flags |= 8192), qi(e, e.updateQueue), Qt(e), null);
      case 4:
        return Be(), t === null && zf(e.stateNode.containerInfo), e.flags |= 67108864, Qt(e), null;
      case 10:
        return Hl(e.type), Qt(e), null;
      case 19:
        if (gs(e), a = e.memoizedState, a === null) return Qt(e), null;
        if (n = (e.flags & 128) !== 0, u = a.rendering, u === null)
          if (n) pu(a, !1);
          else {
            if (It !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = e.child; t !== null; ) {
                if (u = xi(t), u !== null) {
                  for (e.flags |= 128, pu(a, !1), t = u.updateQueue, e.updateQueue = t, qi(e, t), e.subtreeFlags = 0, t = l, l = e.child; l !== null; )
                    No(l, t), l = l.sibling;
                  return hu(
                    e,
                    Te.current & 1 | 2
                  ), pt && wl(e, a.treeForkCount), e.child;
                }
                t = t.sibling;
              }
            a.tail !== null && fe() > Ii && (e.flags |= 128, n = !0, pu(a, !1), e.lanes = 4194304);
          }
        else {
          if (!n)
            if (t = xi(u), t !== null) {
              if (e.flags |= 128, n = !0, t = t.updateQueue, e.updateQueue = t, qi(e, t), pu(a, !0), a.tail === null && a.tailMode !== "collapsed" && a.tailMode !== "visible" && !u.alternate && !pt)
                return Qt(e), null;
            } else
              2 * fe() - a.renderingStartTime > Ii && l !== 536870912 && (e.flags |= 128, n = !0, pu(a, !1), e.lanes = 4194304);
          a.isBackwards ? (u.sibling = e.child, e.child = u) : (t = a.last, t !== null ? t.sibling = u : e.child = u, a.last = u);
        }
        if (a.tail !== null) {
          t = a.tail;
          t: {
            for (l = t; l !== null; ) {
              if (l.alternate !== null) {
                l = !1;
                break t;
              }
              l = l.sibling;
            }
            l = !0;
          }
          return a.rendering = t, a.tail = t.sibling, a.renderingStartTime = fe(), t.sibling = null, u = Te.current, u = n ? u & 1 | 2 : u & 1, a.tailMode === "visible" || a.tailMode === "collapsed" || !l || pt ? hu(e, u) : (l = u, q(Ee, e), q(Te, l), Ae === null && (Ae = e)), pt && wl(e, a.treeForkCount), t;
        }
        return Qt(e), null;
      case 22:
      case 23:
        return Je(e), vs(), a = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== a && (e.flags |= 8192) : a && (e.flags |= 8192), a ? (l & 536870912) !== 0 && (e.flags & 128) === 0 && (Qt(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : Qt(e), l = e.updateQueue, l !== null && qi(e, l.retryQueue), l = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), a = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), a !== l && (e.flags |= 2048), t !== null && Yt(Da), null;
      case 24:
        return l = null, t !== null && (l = t.memoizedState.cache), e.memoizedState.cache !== l && (e.flags |= 2048), Hl(ae), Qt(e), null;
      case 25:
        return null;
      case 30:
        return e.flags |= 33554432, Qt(e), null;
    }
    throw Error(s(156, e.tag));
  }
  function Fv(t, e) {
    switch (es(e), e.tag) {
      case 1:
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 3:
        return Hl(ae), Be(), t = e.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (e.flags = t & -65537 | 128, e) : null;
      case 26:
      case 27:
      case 5:
        return Vl(e), null;
      case 31:
        if (e.memoizedState !== null) {
          if (Je(e), e.alternate === null)
            throw Error(s(340));
          za();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 13:
        if (Je(e), t = e.memoizedState, t !== null && t.dehydrated !== null) {
          if (e.alternate === null)
            throw Error(s(340));
          za();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 19:
        return gs(e), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, t = e.memoizedState, t !== null && (t.rendering = null, t.tail = null), e.flags |= 4, e) : null;
      case 4:
        return Be(), null;
      case 10:
        return Hl(e.type), null;
      case 22:
      case 23:
        return Je(e), vs(), t !== null && Yt(Da), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 24:
        return Hl(ae), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Id(t, e) {
    switch (es(e), e.tag) {
      case 3:
        Hl(ae), Be();
        break;
      case 26:
      case 27:
      case 5:
        Vl(e);
        break;
      case 4:
        Be();
        break;
      case 31:
        e.memoizedState !== null && Je(e);
        break;
      case 13:
        Je(e);
        break;
      case 19:
        gs(e);
        break;
      case 10:
        Hl(e.type);
        break;
      case 22:
      case 23:
        Je(e), vs(), t !== null && Yt(Da);
        break;
      case 24:
        Hl(ae);
    }
  }
  function Su(t, e) {
    try {
      var l = e.updateQueue, a = l !== null ? l.lastEffect : null;
      if (a !== null) {
        var n = a.next;
        l = n;
        do {
          if ((l.tag & t) === t) {
            a = void 0;
            var u = l.create, i = l.inst;
            a = u(), i.destroy = a;
          }
          l = l.next;
        } while (l !== n);
      }
    } catch (r) {
      Bt(e, e.return, r);
    }
  }
  function ua(t, e, l) {
    try {
      var a = e.updateQueue, n = a !== null ? a.lastEffect : null;
      if (n !== null) {
        var u = n.next;
        a = u;
        do {
          if ((a.tag & t) === t) {
            var i = a.inst, r = i.destroy;
            if (r !== void 0) {
              i.destroy = void 0, n = e;
              var m = l, _ = r;
              try {
                _();
              } catch (M) {
                Bt(
                  n,
                  m,
                  M
                );
              }
            }
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (M) {
      Bt(e, e.return, M);
    }
  }
  function Pd(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var l = t.stateNode;
      try {
        Xo(e, l);
      } catch (a) {
        Bt(t, t.return, a);
      }
    }
  }
  function tm(t, e, l) {
    l.props = La(
      t.type,
      t.memoizedProps
    ), l.state = t.memoizedState;
    try {
      l.componentWillUnmount();
    } catch (a) {
      Bt(t, e, a);
    }
  }
  function pl(t, e) {
    try {
      var l = t.ref;
      if (l !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var a = t.stateNode;
            break;
          case 30:
            var n = t.stateNode, u = Rl(t.memoizedProps, n);
            (n.ref === null || n.ref.name !== u) && (n.ref = ch(u)), a = n.ref;
            break;
          case 7:
            if (t.stateNode === null) {
              var i = new Ie(t);
              h(
                t.child,
                !1,
                Yy,
                i,
                void 0,
                void 0
              ), t.stateNode = i;
            }
            a = t.stateNode;
            break;
          default:
            a = t.stateNode;
        }
        typeof l == "function" ? t.refCleanup = l(a) : l.current = a;
      }
    } catch (r) {
      Bt(t, e, r);
    }
  }
  function Ne(t, e) {
    var l = t.ref, a = t.refCleanup;
    if (l !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (n) {
          Bt(t, e, n);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (n) {
          Bt(t, e, n);
        }
      else l.current = null;
  }
  function Gi(t, e) {
    if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && t.alternate === null && e !== null)
      for (var l = 0; l < e.length; l++)
        mh(
          t.stateNode,
          e[l]
        );
  }
  function em(t) {
    for (var e = t.return; e !== null && ($s(e) && mh(t.stateNode, e.stateNode), !Js(e)); )
      e = e.return;
  }
  function _u(t) {
    for (var e = t.return; e !== null && ($s(e) && qy(t.stateNode, e.stateNode), !Js(e)); )
      e = e.return;
  }
  function Js(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 27;
  }
  function $s(t) {
    return t && t.tag === 7 && t.stateNode !== null;
  }
  function Fs(t) {
    var e = t.type, l = t.memoizedProps, a = t.stateNode;
    try {
      t: switch (e) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          l.autoFocus && a.focus();
          break t;
        case "img":
          l.src ? a.src = l.src : l.srcSet && (a.srcset = l.srcSet);
      }
    } catch (n) {
      Bt(t, t.return, n);
    }
  }
  function ks(t, e, l) {
    try {
      var a = t.stateNode;
      _y(a, t.type, l, e), a[He] = e;
    } catch (n) {
      Bt(t, t.return, n);
    }
  }
  function lm(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && da(t.type) || t.tag === 4;
  }
  function Ws(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || lm(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && da(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Is(t, e, l, a) {
    var n = t.tag;
    if (n === 5 || n === 6)
      n = t.stateNode, e ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(n, e) : (e = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, e.appendChild(n), l = l._reactRootContainer, l != null || e.onclick !== null || (e.onclick = yl)), Gi(t, a), Ct = !0;
    else if (n !== 4 && (n === 27 && (Gi(t, a), a = null, da(t.type) && (l = t.stateNode, e = null)), t = t.child, t !== null))
      for (Is(
        t,
        e,
        l,
        a
      ), t = t.sibling; t !== null; )
        Is(
          t,
          e,
          l,
          a
        ), t = t.sibling;
  }
  function Xi(t, e, l, a) {
    var n = t.tag;
    if (n === 5 || n === 6)
      n = t.stateNode, e ? l.insertBefore(n, e) : l.appendChild(n), Gi(t, a), Ct = !0;
    else if (n !== 4 && (n === 27 && (Gi(t, a), a = null, da(t.type) && (l = t.stateNode)), t = t.child, t !== null))
      for (Xi(
        t,
        e,
        l,
        a
      ), t = t.sibling; t !== null; )
        Xi(
          t,
          e,
          l,
          a
        ), t = t.sibling;
  }
  function am(t) {
    var e = t.stateNode, l = t.memoizedProps;
    try {
      for (var a = t.type, n = e.attributes; n.length; )
        e.removeAttributeNode(n[0]);
      xe(e, a, l), e[Se] = t, e[He] = l;
    } catch (u) {
      Bt(t, t.return, u);
    }
  }
  var Qi = !1, $e = null;
  function nm(t) {
    (t.tag === 30 || (t.subtreeFlags & 33554432) !== 0) && (Qi = !0);
  }
  var Sl = null;
  function um() {
    var t = Sl;
    return Sl = null, t;
  }
  var Ye = 0;
  function En(t, e, l, a, n) {
    return Ye = 0, im(
      t.child,
      e,
      l,
      a,
      n
    );
  }
  function im(t, e, l, a, n) {
    for (var u = !1; t !== null; ) {
      if (t.tag === 5) {
        var i = t.stateNode;
        if (a !== null) {
          var r = Bf(i);
          a.push(r), r.view && (u = !0);
        } else
          u || Bf(i).view && (u = !0);
        Qi = !0, uh(
          i,
          Ye === 0 ? e : e + "_" + Ye,
          l
        ), Ye++;
      } else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && n || im(
        t.child,
        e,
        l,
        a,
        n
      ) && (u = !0));
      t = t.sibling;
    }
    return u;
  }
  function _l(t, e) {
    for (; t !== null; )
      t.tag === 5 ? ih(t.stateNode, t.memoizedProps) : (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && e || _l(
        t.child,
        e
      )), t = t.sibling;
  }
  function Vi(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if ((t.tag !== 22 || t.memoizedState === null) && (Vi(t), t.tag === 30 && (t.flags & 18874368) !== 0 && t.stateNode.paired)) {
          var e = t.memoizedProps;
          if (e.name == null || e.name === "auto")
            throw Error(s(544));
          var l = e.name;
          e = Dl(e.default, e.share), e !== "none" && (En(
            t,
            l,
            e,
            null,
            !1
          ) || _l(t.child, !1));
        }
        t = t.sibling;
      }
  }
  function Ps(t, e) {
    if (t.tag === 30) {
      var l = t.stateNode, a = t.memoizedProps, n = Rl(a, l), u = Dl(
        a.default,
        l.paired ? a.share : a.enter
      );
      u !== "none" ? En(t, n, u, null, !1) ? (Vi(t), l.paired || e || Cn(t, a.onEnter)) : _l(t.child, !1) : Vi(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        Ps(t, e), t = t.sibling;
    else Vi(t);
  }
  function tf(t) {
    if ($e !== null && $e.size !== 0) {
      var e = $e;
      if ((t.subtreeFlags & 18874368) !== 0)
        for (t = t.child; t !== null; ) {
          if (t.tag !== 22 || t.memoizedState === null) {
            if (t.tag === 30 && (t.flags & 18874368) !== 0) {
              var l = t.memoizedProps, a = l.name;
              if (a != null && a !== "auto") {
                var n = e.get(a);
                if (n !== void 0) {
                  var u = Dl(
                    l.default,
                    l.share
                  );
                  if (u !== "none" && (En(
                    t,
                    a,
                    u,
                    null,
                    !1
                  ) ? (u = t.stateNode, n.paired = u, u.paired = n, Cn(t, l.onShare)) : _l(t.child, !1)), e.delete(a), e.size === 0) break;
                }
              }
            }
            tf(t);
          }
          t = t.sibling;
        }
    }
  }
  function ef(t) {
    if (t.tag === 30) {
      var e = t.memoizedProps, l = Rl(e, t.stateNode), a = $e !== null ? $e.get(l) : void 0, n = Dl(
        e.default,
        a !== void 0 ? e.share : e.exit
      );
      n !== "none" && (En(t, l, n, null, !1) ? a !== void 0 ? (n = t.stateNode, a.paired = n, n.paired = a, $e.delete(l), Cn(t, e.onShare)) : Cn(t, e.onExit) : _l(t.child, !1)), $e !== null && tf(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        ef(t), t = t.sibling;
    else
      $e !== null && tf(t);
  }
  function cm(t) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var e = t.memoizedProps, l = Rl(e, t.stateNode);
        e = Dl(e.default, e.update), t.flags &= -5, e !== "none" && En(
          t,
          l,
          e,
          t.memoizedState = [],
          !1
        );
      } else
        (t.subtreeFlags & 33554432) !== 0 && cm(t);
      t = t.sibling;
    }
  }
  function lf(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if (t.tag !== 22 || t.memoizedState === null) {
          if (t.tag === 30 && (t.flags & 18874368) !== 0) {
            var e = t.stateNode;
            e.paired !== null && (e.paired = null, _l(t.child, !1));
          }
          lf(t);
        }
        t = t.sibling;
      }
  }
  function Zi(t) {
    if (t.tag === 30)
      t.stateNode.paired = null, _l(t.child, !1), lf(t);
    else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        Zi(t), t = t.sibling;
    else lf(t);
  }
  function sm(t) {
    for (t = t.child; t !== null; )
      t.tag === 30 ? _l(t.child, !1) : (t.subtreeFlags & 33554432) !== 0 && sm(t), t = t.sibling;
  }
  function af(t, e, l, a, n, u, i) {
    for (var r = !1; e !== null; ) {
      if (e.tag === 5) {
        var m = e.stateNode;
        if (u !== null && Ye < u.length) {
          var _ = u[Ye], M = Bf(m);
          (_.view || M.view) && (r = !0);
          var U;
          if (U = (t.flags & 4) === 0)
            if (M.clip) U = !0;
            else {
              U = _.rect;
              var p = M.rect;
              U = U.y !== p.y || U.x !== p.x || U.height !== p.height || U.width !== p.width;
            }
          U && (t.flags |= 4), M.abs ? M = !_.abs : (_ = _.rect, M = M.rect, M = _.height !== M.height || _.width !== M.width), M && (t.flags |= 32);
        } else t.flags |= 32;
        (t.flags & 4) !== 0 && uh(
          m,
          Ye === 0 ? l : l + "_" + Ye,
          n
        ), r && (t.flags & 4) !== 0 || (Sl === null && (Sl = []), Sl.push(
          m,
          Ye === 0 ? a : a + "_" + Ye,
          e.memoizedProps
        )), Ye++;
      } else (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && i ? t.flags |= e.flags & 32 : af(
        t,
        e.child,
        l,
        a,
        n,
        u,
        i
      ) && (r = !0));
      e = e.sibling;
    }
    return r;
  }
  function fm(t, e) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var l = t.memoizedProps, a = t.stateNode, n = Rl(l, a), u = Dl(l.default, l.update), i;
        i = t.memoizedState, t.memoizedState = null, a = t;
        var r = t.child;
        Ye = 0, n = af(
          a,
          r,
          n,
          n,
          u,
          i,
          !1
        ), (t.flags & 4) !== 0 && n && Cn(t, l.onUpdate);
      } else
        (t.subtreeFlags & 33554432) !== 0 && fm(t);
      t = t.sibling;
    }
  }
  var be = !1, Dt = !1, El = !1, nf = !1, rm = typeof WeakSet == "function" ? WeakSet : Set, pe = null, Tl = !1, Eu = !1, Ki = !1, uf = !1;
  function kv(t, e, l) {
    if (t = t.containerInfo, jf = qn, t = ho(t), Zc(t)) {
      if ("selectionStart" in t)
        var a = {
          start: t.selectionStart,
          end: t.selectionEnd
        };
      else
        t: {
          a = (a = t.ownerDocument) && a.defaultView || window;
          var n = a.getSelection && a.getSelection();
          if (n && n.rangeCount !== 0) {
            a = n.anchorNode;
            var u = n.anchorOffset, i = n.focusNode;
            n = n.focusOffset;
            try {
              a.nodeType, i.nodeType;
            } catch {
              a = null;
              break t;
            }
            var r = 0, m = -1, _ = -1, M = 0, U = 0, p = t, N = null;
            e: for (; ; ) {
              for (var X; p !== a || u !== 0 && p.nodeType !== 3 || (m = r + u), p !== i || n !== 0 && p.nodeType !== 3 || (_ = r + n), p.nodeType === 3 && (r += p.nodeValue.length), (X = p.firstChild) !== null; )
                N = p, p = X;
              for (; ; ) {
                if (p === t) break e;
                if (N === a && ++M === u && (m = r), N === i && ++U === n && (_ = r), (X = p.nextSibling) !== null) break;
                p = N, N = p.parentNode;
              }
              p = X;
            }
            a = m === -1 || _ === -1 ? null : { start: m, end: _ };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (Rf = { focusedElem: t, selectionRange: a }, qn = !1, l = (l & 335544064) === l, pe = e, e = l ? 9270 : 1024; pe !== null; ) {
      if (t = pe, l && (a = t.deletions, a !== null))
        for (u = 0; u < a.length; u++)
          l && ef(a[u]);
      if (t.alternate === null && (t.flags & 2) !== 0)
        l && nm(t), Ji(l);
      else {
        if (t.tag === 22) {
          if (a = t.alternate, t.memoizedState !== null) {
            a !== null && a.memoizedState === null && l && ef(a), Ji(l);
            continue;
          } else if (a !== null && a.memoizedState !== null) {
            l && nm(t), Ji(l);
            continue;
          }
        }
        a = t.child, (t.subtreeFlags & e) !== 0 && a !== null ? (a.return = t, pe = a) : (l && cm(t), Ji(l));
      }
    }
    $e = null;
  }
  function Ji(t) {
    for (; pe !== null; ) {
      var e = pe, l = t, a = e.alternate, n = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if ((n & 1024) !== 0 && a !== null) {
            l = void 0, n = a.memoizedProps, a = a.memoizedState;
            var u = e.stateNode;
            try {
              var i = La(
                e.type,
                n
              );
              l = u.getSnapshotBeforeUpdate(
                i,
                a
              ), u.__reactInternalSnapshotBeforeUpdate = l;
            } catch (r) {
              Bt(e, e.return, r);
            }
          }
          break;
        case 3:
          if ((n & 1024) !== 0) {
            if (a = e.stateNode.containerInfo, l = a.nodeType, l === 9)
              Yf(a);
            else if (l === 1)
              switch (a.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  Yf(a);
                  break;
                default:
                  a.textContent = "";
              }
          }
          break;
        case 5:
        case 26:
        case 27:
        case 6:
        case 4:
        case 17:
          break;
        case 30:
          l && a !== null && (l = Rl(
            a.memoizedProps,
            a.stateNode
          ), n = e.memoizedProps, n = Dl(n.default, n.update), n !== "none" && En(
            a,
            l,
            n,
            a.memoizedState = [],
            !0
          ));
          break;
        default:
          if ((n & 1024) !== 0) throw Error(s(163));
      }
      if (a = e.sibling, a !== null) {
        a.return = e.return, pe = a;
        break;
      }
      pe = e.return;
    }
  }
  function om(t, e, l) {
    var a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Nl(t, l), a & 4 && Su(5, l);
        break;
      case 1:
        if (Nl(t, l), a & 4)
          if (t = l.stateNode, e === null)
            try {
              t.componentDidMount();
            } catch (i) {
              Bt(l, l.return, i);
            }
          else {
            var n = La(
              l.type,
              e.memoizedProps
            );
            e = e.memoizedState;
            try {
              t.componentDidUpdate(
                n,
                e,
                t.__reactInternalSnapshotBeforeUpdate
              );
            } catch (i) {
              Bt(
                l,
                l.return,
                i
              );
            }
          }
        a & 64 && Pd(l), a & 512 && pl(l, l.return);
        break;
      case 3:
        if (Nl(t, l), a & 64 && (t = l.updateQueue, t !== null)) {
          if (e = null, l.child !== null)
            switch (l.child.tag) {
              case 27:
              case 5:
                e = l.child.stateNode;
                break;
              case 1:
                e = l.child.stateNode;
            }
          try {
            Xo(t, e);
          } catch (i) {
            Bt(l, l.return, i);
          }
        }
        break;
      case 27:
        e === null && a & 4 && am(l);
      case 26:
      case 5:
        Nl(t, l), e === null && a & 4 && Fs(l), a & 512 && pl(l, l.return);
        break;
      case 12:
        Nl(t, l);
        break;
      case 31:
        Nl(t, l), a & 4 && vm(t, l);
        break;
      case 13:
        Nl(t, l), a & 4 && ym(t, l), a & 64 && (t = l.memoizedState, t !== null && (t = t.dehydrated, t !== null && (l = sy.bind(
          null,
          l
        ), Qy(t, l))));
        break;
      case 22:
        if (a = l.memoizedState !== null || be, !a) {
          var u = e !== null && e.memoizedState !== null || Dt;
          e = be, n = Dt, be = a, (Dt = u) && !n ? (a = 2, (l.subtreeFlags & 8772) !== 0 && (a |= 1), dl(
            t,
            l,
            a
          )) : Nl(t, l), be = e, Dt = n;
        }
        break;
      case 30:
        Nl(t, l), a & 512 && pl(l, l.return);
        break;
      case 7:
        a & 512 && pl(l, l.return);
      default:
        Nl(t, l);
    }
  }
  function cf(t, e) {
    for (t = t.child; t !== null; )
      dm(t, e), t = t.sibling;
  }
  function dm(t, e) {
    switch (t.tag) {
      case 5:
      case 26:
        try {
          var l = t.stateNode;
          if (e) {
            var a = l.style;
            typeof a.setProperty == "function" ? a.setProperty("display", "none", "important") : a.display = "none";
          } else {
            var n = t.stateNode, u = t.memoizedProps.style, i = u != null && u.hasOwnProperty("display") ? u.display : null;
            n.style.display = i == null || typeof i == "boolean" ? "" : ("" + i).trim();
          }
        } catch (m) {
          Bt(t, t.return, m);
        }
        sf(t, e);
        break;
      case 6:
        try {
          t.stateNode.nodeValue = e ? "" : t.memoizedProps, Ct = !0;
        } catch (m) {
          Bt(t, t.return, m);
        }
        break;
      case 18:
        try {
          var r = t.stateNode;
          e ? nh(r, !0) : nh(t.stateNode, !1);
        } catch (m) {
          Bt(t, t.return, m);
        }
        break;
      case 22:
      case 23:
        t.memoizedState === null && cf(t, e);
        break;
      default:
        cf(t, e);
    }
  }
  function sf(t, e) {
    if (t.subtreeFlags & 67108864)
      for (t = t.child; t !== null; ) {
        t: {
          var l = t, a = e;
          switch (l.tag) {
            case 4:
              dm(l, a);
              break t;
            case 22:
              l.memoizedState === null && sf(l, a);
              break t;
            default:
              sf(l, a);
          }
        }
        t = t.sibling;
      }
  }
  function mm(t) {
    var e = t.alternate;
    e !== null && (t.alternate = null, mm(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && Iu(e)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var $t = null, qe = !1;
  function rl(t, e, l) {
    for (l = l.child; l !== null; )
      hm(t, e, l), l = l.sibling;
  }
  function hm(t, e, l) {
    if (Qe && typeof Qe.onCommitFiberUnmount == "function")
      try {
        Qe.onCommitFiberUnmount(Zn, l);
      } catch {
      }
    switch (l.tag) {
      case 26:
        Dt || Ne(l, e), rl(
          t,
          e,
          l
        ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && !Dt && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        Dt || Ne(l, e), _u(l);
        var a = $t, n = qe;
        da(l.type) && ($t = l.stateNode, qe = !1), rl(
          t,
          e,
          l
        ), bh(
          l.stateNode,
          l.type,
          l.memoizedProps
        ), $t = a, qe = n;
        break;
      case 5:
        Dt || Ne(l, e), _u(l);
      case 6:
        if (l.tag === 6 && _u(l), a = $t, n = qe, $t = null, rl(
          t,
          e,
          l
        ), $t = a, qe = n, $t !== null)
          if (qe)
            try {
              ($t.nodeType === 9 ? $t.body : $t.nodeName === "HTML" ? $t.ownerDocument.body : $t).removeChild(l.stateNode), Ct = !0;
            } catch (u) {
              Bt(
                l,
                e,
                u
              );
            }
          else
            try {
              $t.removeChild(l.stateNode), Ct = !0;
            } catch (u) {
              Bt(
                l,
                e,
                u
              );
            }
        break;
      case 18:
        $t !== null && (qe ? (t = $t, ah(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          l.stateNode
        ), Gn(t)) : ah($t, l.stateNode));
        break;
      case 4:
        a = $t, n = qe, $t = l.stateNode.containerInfo, qe = !0, rl(
          t,
          e,
          l
        ), $t = a, qe = n;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        ua(2, l, e), Dt || ua(4, l, e), rl(
          t,
          e,
          l
        );
        break;
      case 1:
        Dt || (Ne(l, e), a = l.stateNode, typeof a.componentWillUnmount == "function" && tm(
          l,
          e,
          a
        )), rl(
          t,
          e,
          l
        );
        break;
      case 21:
        rl(
          t,
          e,
          l
        );
        break;
      case 22:
        Dt = (a = Dt) || l.memoizedState !== null, rl(
          t,
          e,
          l
        ), Dt = a;
        break;
      case 30:
        Ne(l, e), rl(
          t,
          e,
          l
        );
        break;
      case 7:
        Dt || Ne(l, e), rl(
          t,
          e,
          l
        );
        break;
      default:
        rl(
          t,
          e,
          l
        );
    }
  }
  function vm(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        Gn(t);
      } catch (l) {
        Bt(e, e.return, l);
      }
    }
  }
  function ym(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        Gn(t);
      } catch (l) {
        Bt(e, e.return, l);
      }
  }
  function Wv(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return e === null && (e = t.stateNode = new rm()), e;
      case 22:
        return t = t.stateNode, e = t._retryCache, e === null && (e = t._retryCache = new rm()), e;
      default:
        throw Error(s(435, t.tag));
    }
  }
  function $i(t, e) {
    var l = Wv(t);
    e.forEach(function(a) {
      if (!l.has(a)) {
        l.add(a);
        var n = fy.bind(null, t, a);
        a.then(n, n);
      }
    });
  }
  function De(t, e, l) {
    var a = e.deletions;
    if (a !== null)
      for (var n = 0; n < a.length; n++) {
        var u = a[n], i = t, r = e, m = r;
        t: for (; m !== null; ) {
          switch (m.tag) {
            case 27:
              if (da(m.type)) {
                $t = m.stateNode, qe = !1;
                break t;
              }
              break;
            case 5:
              $t = m.stateNode, qe = !1;
              break t;
            case 3:
            case 4:
              $t = m.stateNode.containerInfo, qe = !0;
              break t;
          }
          m = m.return;
        }
        if ($t === null) throw Error(s(160));
        hm(i, r, u), $t = null, qe = !1, i = u.alternate, i !== null && (i.return = null), u.return = null;
      }
    if (e.subtreeFlags & 13886)
      for (e = e.child; e !== null; )
        gm(e, t, l), e = e.sibling;
  }
  var ol = null;
  function gm(t, e, l) {
    var a = t.alternate, n = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (n & 4 && (a = t.updateQueue, a = a !== null ? a.events : null, a !== null))
          for (var u = 0; u < a.length; u++) {
            var i = a[u];
            i.ref.impl = i.nextImpl;
          }
        De(e, t, l), Ue(t), n & 4 && (ua(3, t, t.return), Su(3, t), ua(5, t, t.return));
        break;
      case 1:
        De(e, t, l), Ue(t), n & 512 && (Dt || a === null || Ne(a, a.return)), n & 64 && be && (t = t.updateQueue, t !== null && (e = t.callbacks, e !== null && (l = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = l === null ? e : l.concat(e))));
        break;
      case 26:
        if (u = ol, De(e, t, l), Ue(t), n & 512 && (Dt || a === null || Ne(a, a.return)), n & 4)
          if (n = a !== null ? a.memoizedState : null, l = t.memoizedState, a === null)
            if (l === null)
              if (t.stateNode === null)
                if (be)
                  t.stateNode = th(
                    t.type,
                    t.memoizedProps,
                    e.containerInfo,
                    t
                  );
                else {
                  t: {
                    e = t.type, l = t.memoizedProps, n = u.ownerDocument || u;
                    e: switch (e) {
                      case "title":
                        a = n.getElementsByTagName("title")[0], (!a || a[$n] || a[Se] || a.namespaceURI === "http://www.w3.org/2000/svg" || a.hasAttribute("itemprop")) && (a = n.createElement(e), n.head.insertBefore(
                          a,
                          n.querySelector("head > title")
                        )), xe(a, e, l), a[Se] = t, ye(a), e = a;
                        break t;
                      case "link":
                        if (u = Nh(
                          "link",
                          "href",
                          n
                        ).get(e + (l.href || ""))) {
                          for (i = 0; i < u.length; i++)
                            if (a = u[i], a.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && a.getAttribute("rel") === (l.rel == null ? null : l.rel) && a.getAttribute("title") === (l.title == null ? null : l.title) && a.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                              u.splice(i, 1);
                              break e;
                            }
                        }
                        a = n.createElement(e), xe(a, e, l), n.head.appendChild(a);
                        break;
                      case "meta":
                        if (u = Nh(
                          "meta",
                          "content",
                          n
                        ).get(e + (l.content || ""))) {
                          for (i = 0; i < u.length; i++)
                            if (a = u[i], a.getAttribute("content") === (l.content == null ? null : "" + l.content) && a.getAttribute("name") === (l.name == null ? null : l.name) && a.getAttribute("property") === (l.property == null ? null : l.property) && a.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && a.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                              u.splice(i, 1);
                              break e;
                            }
                        }
                        a = n.createElement(e), xe(a, e, l), n.head.appendChild(a);
                        break;
                      default:
                        throw Error(s(468, e));
                    }
                    a[Se] = t, ye(a), e = a;
                  }
                  t.stateNode = e;
                }
              else
                be || Kf(u, t.type, t.stateNode);
            else
              t.stateNode = Th(
                u,
                l,
                t.memoizedProps
              );
          else
            n !== l ? (n === null ? (e = a.stateNode, e === null || Dt || e.parentNode.removeChild(e)) : n.count--, l === null ? be || Kf(u, t.type, t.stateNode) : Th(u, l, t.memoizedProps)) : l === null && t.stateNode !== null && ks(
              t,
              t.memoizedProps,
              a.memoizedProps
            );
        break;
      case 27:
        De(e, t, l), Ue(t), n & 512 && (Dt || a === null || Ne(a, a.return)), a !== null && n & 4 && ks(
          t,
          t.memoizedProps,
          a.memoizedProps
        );
        break;
      case 5:
        if (u = El, El = !1, De(e, t, l), El = u, Ue(t), n & 512 && (Dt || a === null || Ne(a, a.return)), t.flags & 32) {
          e = t.stateNode;
          try {
            an(e, ""), Ct = !0;
          } catch (M) {
            Bt(t, t.return, M);
          }
        }
        n & 4 && t.stateNode != null && (e = t.memoizedProps, ks(
          t,
          e,
          a !== null ? a.memoizedProps : e
        )), n & 1024 && (nf = !0);
        break;
      case 6:
        if (De(e, t, l), Ue(t), n & 4) {
          if (t.stateNode === null)
            throw Error(s(162));
          e = t.memoizedProps, l = t.stateNode;
          try {
            l.nodeValue = e, Ct = !0;
          } catch (M) {
            Bt(t, t.return, M);
          }
        }
        break;
      case 3:
        if (Ct = !1, fc = null, u = ol, ol = ju(e.containerInfo), De(e, t, l), ol = u, Ue(t), n & 4 && a !== null && a.memoizedState.isDehydrated)
          try {
            Gn(e.containerInfo);
          } catch (M) {
            Bt(t, t.return, M);
          }
        nf && (nf = !1, bm(t)), Ct = !1;
        break;
      case 4:
        n = El, El = be, a = Hr(), u = ol, ol = ju(
          t.stateNode.containerInfo
        ), De(e, t, l), Ue(t), ol = u, Ct && Eu && (Ki = !0), Ct = a, El = n;
        break;
      case 12:
        De(e, t, l), Ue(t);
        break;
      case 31:
        De(e, t, l), Ue(t), n & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, $i(t, e)));
        break;
      case 13:
        De(e, t, l), Ue(t), t.child.flags & 8192 && t.memoizedState !== null != (a !== null && a.memoizedState !== null) && (Wi = fe()), n & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, $i(t, e)));
        break;
      case 22:
        u = t.memoizedState !== null, i = a !== null && a.memoizedState !== null;
        var r = be, m = Dt, _ = El;
        be = r || u, El = _ || u, Dt = m || i, De(e, t, l), Dt = m, El = _, be = r, Ue(t), n & 8192 && (e = t.stateNode, e._visibility = u ? e._visibility & -2 : e._visibility | 1, !u || a === null || i || be || Dt || (e = i || Dt, l = be, a = Dt, be = u || be, Dt = e, ia(t, 2), be = l, Dt = a), !u && El || cf(t, u)), n & 4 && (e = t.updateQueue, e !== null && (l = e.retryQueue, l !== null && (e.retryQueue = null, $i(t, l))));
        break;
      case 19:
        De(e, t, l), Ue(t), n & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, $i(t, e)));
        break;
      case 30:
        n & 512 && (Dt || a === null || Ne(a, a.return)), n = Hr(), u = Eu, i = (l & 335544064) === l, r = t.memoizedProps, Eu = i && Dl(
          r.default,
          r.update
        ) !== "none", De(e, t, l), Ue(t), i && a !== null && Ct && (t.flags |= 4), Eu = u, Ct = n;
        break;
      case 21:
        break;
      case 7:
        n & 512 && (Dt || a === null || Ne(a, a.return)), a && a.stateNode !== null && (a.stateNode._fragmentFiber = t);
      default:
        De(e, t, l), Ue(t);
    }
  }
  function Ue(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        for (var l, a = t.return; a !== null; ) {
          if (lm(a)) {
            l = a;
            break;
          }
          a = a.return;
        }
        a = null;
        for (var n = t.return; n !== null; ) {
          if ($s(n)) {
            var u = n.stateNode;
            a === null ? a = [u] : a.push(u);
          }
          if (Js(n)) break;
          n = n.return;
        }
        var i = a;
        if (l == null) throw Error(s(160));
        switch (l.tag) {
          case 27:
            var r = l.stateNode, m = Ws(t);
            Xi(
              t,
              m,
              r,
              i
            );
            break;
          case 5:
            var _ = l.stateNode;
            l.flags & 32 && (an(_, ""), l.flags &= -33);
            var M = Ws(t);
            Xi(
              t,
              M,
              _,
              i
            );
            break;
          case 3:
          case 4:
            var U = l.stateNode.containerInfo, p = Ws(t);
            Is(
              t,
              p,
              U,
              i
            );
            break;
          default:
            throw Error(s(161));
        }
      } catch (N) {
        Bt(t, t.return, N);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function bm(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        bm(e), e.tag === 5 && e.flags & 1024 && (e = e.stateNode, qn = !0, e.reset(), qn = !1), t = t.sibling;
      }
  }
  function Tn(t, e) {
    if (e.subtreeFlags & 9270)
      for (e = e.child; e !== null; )
        pm(e, t), e = e.sibling;
    else fm(e);
  }
  function pm(t, e) {
    var l = t.alternate;
    if (l === null) Ps(t, !1);
    else
      switch (t.tag) {
        case 3:
          if (uf = Tl = !1, um(), Tn(e, t), !Tl && !Ki) {
            if (t = Sl, t !== null)
              for (var a = 0; a < t.length; a += 3) {
                l = t[a];
                var n = t[a + 1];
                ih(l, t[a + 2]), l = l.ownerDocument.documentElement, l !== null && l.animate(
                  { opacity: [0, 0], pointerEvents: ["none", "none"] },
                  {
                    duration: 0,
                    fill: "forwards",
                    pseudoElement: "::view-transition-group(" + n + ")"
                  }
                );
              }
            t = e.containerInfo, t = t.nodeType === 9 ? t.documentElement : t.ownerDocument.documentElement, t !== null && t.style.viewTransitionName === "" && (t.style.viewTransitionName = "none", t.animate(
              { opacity: [0, 0], pointerEvents: ["none", "none"] },
              {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition-group(root)"
              }
            ), t.animate(
              { width: [0, 0], height: [0, 0] },
              {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition"
              }
            )), uf = !0;
          }
          Sl = null;
          break;
        case 5:
          Tn(e, t);
          break;
        case 4:
          a = Tl, Tl = !1, Tn(e, t), Tl && (Ki = !0), Tl = a;
          break;
        case 22:
          t.memoizedState === null && (l.memoizedState !== null ? Ps(t, !1) : Tn(e, t));
          break;
        case 30:
          a = Tl, n = um(), Tl = !1, Tn(e, t), Tl && (t.flags |= 4);
          var u = t.memoizedProps, i = t.stateNode;
          e = Rl(u, i), i = Rl(l.memoizedProps, i);
          var r = Dl(u.default, u.update);
          r === "none" ? e = !1 : (u = l.memoizedState, l.memoizedState = null, l = t.child, Ye = 0, e = af(
            t,
            l,
            e,
            i,
            r,
            u,
            !0
          ), Ye !== (u === null ? 0 : u.length) && (t.flags |= 32)), (t.flags & 4) !== 0 && e ? (Cn(
            t,
            t.memoizedProps.onUpdate
          ), Sl = n) : n !== null && (n.push.apply(n, Sl), Sl = n), Tl = (t.flags & 32) !== 0 ? !0 : a;
          break;
        default:
          Tn(e, t);
      }
  }
  function Nl(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; )
        om(t, e.alternate, e), e = e.sibling;
  }
  function ia(t, e) {
    for (t = t.child; t !== null; ) {
      var l = t, a = e;
      switch (l.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ua(4, l, l.return), ia(
            l,
            a
          );
          break;
        case 1:
          Ne(l, l.return);
          var n = l.stateNode;
          typeof n.componentWillUnmount == "function" && tm(
            l,
            l.return,
            n
          ), ia(
            l,
            a
          );
          break;
        case 27:
          (a & 2) !== 0 && bh(
            l.stateNode,
            l.type,
            l.memoizedProps
          );
        case 5:
          Ne(l, l.return), l.tag !== 5 && l.tag !== 27 || _u(l), ia(
            l,
            a
          );
          break;
        case 6:
          _u(l);
          break;
        case 26:
          Ne(l, l.return), n = l.stateNode, l.memoizedState !== null || n === null || Dt || n.parentNode.removeChild(n), ia(
            l,
            a
          );
          break;
        case 22:
          l.memoizedState === null && ia(
            l,
            a
          );
          break;
        case 30:
          Ne(l, l.return), ia(
            l,
            a
          );
          break;
        case 7:
          Ne(l, l.return);
        default:
          ia(
            l,
            a
          );
      }
      t = t.sibling;
    }
  }
  function dl(t, e, l) {
    for (l = (e.subtreeFlags & 8772) !== 0 ? l : l & -2, e = e.child; e !== null; ) {
      var a = e.alternate, n = t, u = e, i = u.flags, r = (l & 1) !== 0;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          dl(
            n,
            u,
            l
          ), Su(4, u);
          break;
        case 1:
          if (dl(
            n,
            u,
            l
          ), a = u, n = a.stateNode, typeof n.componentDidMount == "function")
            try {
              n.componentDidMount();
            } catch (M) {
              Bt(a, a.return, M);
            }
          if (a = u, n = a.updateQueue, n !== null) {
            var m = a.stateNode;
            try {
              var _ = n.shared.hiddenCallbacks;
              if (_ !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < _.length; n++)
                  Go(_[n], m);
            } catch (M) {
              Bt(a, a.return, M);
            }
          }
          r && i & 64 && Pd(u), pl(u, u.return);
          break;
        case 27:
          (l & 2) !== 0 && am(u);
        case 5:
          u.tag !== 5 && u.tag !== 27 || em(u), dl(
            n,
            u,
            l
          ), r && a === null && i & 4 && Fs(u), pl(u, u.return);
          break;
        case 6:
          em(u);
          break;
        case 26:
          m = u.stateNode, u.memoizedState !== null || m === null || be || Kf(
            ju(m.ownerDocument),
            u.type,
            m
          ), dl(
            n,
            u,
            l
          ), r && a === null && i & 4 && Fs(u), pl(u, u.return);
          break;
        case 12:
          dl(
            n,
            u,
            l
          );
          break;
        case 31:
          dl(
            n,
            u,
            l
          ), r && i & 4 && vm(n, u);
          break;
        case 13:
          dl(
            n,
            u,
            l
          ), r && i & 4 && ym(n, u);
          break;
        case 22:
          u.memoizedState === null && dl(
            n,
            u,
            l
          ), pl(u, u.return);
          break;
        case 30:
          dl(
            n,
            u,
            l
          ), pl(u, u.return);
          break;
        case 7:
          pl(u, u.return);
        default:
          dl(
            n,
            u,
            l
          );
      }
      e = e.sibling;
    }
  }
  function ff(t, e) {
    var l = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), t = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), t !== l && (t != null && t.refCount++, l != null && cu(l));
  }
  function rf(t, e) {
    t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && cu(t));
  }
  function ul(t, e, l, a) {
    var n = (l & 335544064) === l;
    if (e.subtreeFlags & (n ? 10262 : 10256))
      for (e = e.child; e !== null; )
        Sm(
          t,
          e,
          l,
          a
        ), e = e.sibling;
    else n && sm(e);
  }
  function Sm(t, e, l, a) {
    var n = (l & 335544064) === l;
    n && e.alternate === null && e.return !== null && e.return.alternate !== null && Zi(e);
    var u = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        ul(
          t,
          e,
          l,
          a
        ), u & 2048 && Su(9, e);
        break;
      case 1:
        ul(
          t,
          e,
          l,
          a
        );
        break;
      case 3:
        ul(
          t,
          e,
          l,
          a
        ), n && uf && (t = t.containerInfo, t = t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, t.style.viewTransitionName === "root" && (t.style.viewTransitionName = ""), t = t.ownerDocument.documentElement, t !== null && t.style.viewTransitionName === "none" && (t.style.viewTransitionName = "")), u & 2048 && (u = null, e.alternate !== null && (u = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== u && (e.refCount++, u != null && cu(u)));
        break;
      case 12:
        if (u & 2048) {
          ul(
            t,
            e,
            l,
            a
          ), u = e.stateNode;
          try {
            var i = e.memoizedProps, r = i.id, m = i.onPostCommit;
            typeof m == "function" && m(
              r,
              e.alternate === null ? "mount" : "update",
              u.passiveEffectDuration,
              -0
            );
          } catch (_) {
            Bt(e, e.return, _);
          }
        } else
          ul(
            t,
            e,
            l,
            a
          );
        break;
      case 31:
        ul(
          t,
          e,
          l,
          a
        );
        break;
      case 13:
        ul(
          t,
          e,
          l,
          a
        );
        break;
      case 23:
        break;
      case 22:
        i = e.stateNode, r = e.alternate, e.memoizedState !== null ? (n && r !== null && r.memoizedState === null && Zi(r), i._visibility & 2 ? ul(
          t,
          e,
          l,
          a
        ) : Tu(
          t,
          e
        )) : (n && r !== null && r.memoizedState !== null && Zi(e), i._visibility & 2 ? ul(
          t,
          e,
          l,
          a
        ) : (i._visibility |= 2, Nn(
          t,
          e,
          l,
          a,
          (e.subtreeFlags & 10256) !== 0 || !1
        ))), u & 2048 && ff(r, e);
        break;
      case 24:
        ul(
          t,
          e,
          l,
          a
        ), u & 2048 && rf(e.alternate, e);
        break;
      case 30:
        n && (u = e.alternate, u !== null && (_l(u.child, !0), _l(e.child, !0))), ul(
          t,
          e,
          l,
          a
        );
        break;
      default:
        ul(
          t,
          e,
          l,
          a
        );
    }
  }
  function Nn(t, e, l, a, n) {
    for (n = n && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var u = t, i = e, r = l, m = a, _ = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          Nn(
            u,
            i,
            r,
            m,
            n
          ), Su(8, i);
          break;
        case 23:
          break;
        case 22:
          var M = i.stateNode;
          i.memoizedState !== null ? M._visibility & 2 ? Nn(
            u,
            i,
            r,
            m,
            n
          ) : Tu(
            u,
            i
          ) : (M._visibility |= 2, Nn(
            u,
            i,
            r,
            m,
            n
          )), n && _ & 2048 && ff(
            i.alternate,
            i
          );
          break;
        case 24:
          Nn(
            u,
            i,
            r,
            m,
            n
          ), n && _ & 2048 && rf(i.alternate, i);
          break;
        default:
          Nn(
            u,
            i,
            r,
            m,
            n
          );
      }
      e = e.sibling;
    }
  }
  function Tu(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var l = t, a = e, n = a.flags;
        switch (a.tag) {
          case 22:
            Tu(l, a), n & 2048 && ff(
              a.alternate,
              a
            );
            break;
          case 24:
            Tu(l, a), n & 2048 && rf(a.alternate, a);
            break;
          default:
            Tu(l, a);
        }
        e = e.sibling;
      }
  }
  var Ya = 8192;
  function qa(t, e, l) {
    if (t.subtreeFlags & Ya)
      for (t = t.child; t !== null; )
        _m(
          t,
          e,
          l
        ), t = t.sibling;
  }
  function _m(t, e, l) {
    switch (t.tag) {
      case 26:
        qa(
          t,
          e,
          l
        ), t.flags & Ya && (t.memoizedState !== null ? ag(
          l,
          ol,
          t.memoizedState,
          t.memoizedProps
        ) : (t = t.stateNode, (e & 335544128) === e && zh(l, t)));
        break;
      case 5:
        qa(
          t,
          e,
          l
        ), t.flags & Ya && (t = t.stateNode, (e & 335544128) === e && zh(l, t));
        break;
      case 3:
      case 4:
        var a = ol;
        ol = ju(t.stateNode.containerInfo), qa(
          t,
          e,
          l
        ), ol = a;
        break;
      case 22:
        t.memoizedState === null && (a = t.alternate, a !== null && a.memoizedState !== null ? (a = Ya, Ya = 16777216, qa(
          t,
          e,
          l
        ), Ya = a) : qa(
          t,
          e,
          l
        ));
        break;
      case 30:
        if ((t.flags & Ya) !== 0 && (a = t.memoizedProps.name, a != null && a !== "auto")) {
          var n = t.stateNode;
          n.paired = null, $e === null && ($e = /* @__PURE__ */ new Map()), $e.set(a, n);
        }
        qa(
          t,
          e,
          l
        );
        break;
      default:
        qa(
          t,
          e,
          l
        );
    }
  }
  function Em(t) {
    var e = t.alternate;
    if (e !== null && (t = e.child, t !== null)) {
      e.child = null;
      do
        e = t.sibling, t.sibling = null, t = e;
      while (t !== null);
    }
  }
  function Nu(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var a = e[l];
          pe = a, Nm(
            a,
            t
          );
        }
      Em(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Tm(t), t = t.sibling;
  }
  function Tm(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Nu(t), t.flags & 2048 && ua(9, t, t.return);
        break;
      case 3:
        Nu(t);
        break;
      case 12:
        Nu(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (e._visibility &= -3, Fi(t)) : Nu(t);
        break;
      default:
        Nu(t);
    }
  }
  function Fi(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var a = e[l];
          pe = a, Nm(
            a,
            t
          );
        }
      Em(t);
    }
    for (t = t.child; t !== null; ) {
      switch (e = t, e.tag) {
        case 0:
        case 11:
        case 15:
          ua(8, e, e.return), Fi(e);
          break;
        case 22:
          l = e.stateNode, l._visibility & 2 && (l._visibility &= -3, Fi(e));
          break;
        default:
          Fi(e);
      }
      t = t.sibling;
    }
  }
  function Nm(t, e) {
    for (; pe !== null; ) {
      var l = pe;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          ua(8, l, e);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var a = l.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          cu(l.memoizedState.cache);
      }
      if (a = l.child, a !== null) a.return = l, pe = a;
      else
        t: for (l = t; pe !== null; ) {
          a = pe;
          var n = a.sibling, u = a.return;
          if (mm(a), a === l) {
            pe = null;
            break t;
          }
          if (n !== null) {
            n.return = u, pe = n;
            break t;
          }
          pe = u;
        }
    }
  }
  var Iv = {
    getCacheForType: function(t) {
      var e = _e(ae), l = e.data.get(t);
      return l === void 0 && (l = t(), e.data.set(t, l)), l;
    },
    cacheSignal: function() {
      return _e(ae).controller.signal;
    }
  }, Pv = typeof WeakMap == "function" ? WeakMap : Map, Rt = 0, qt = null, St = null, Tt = 0, wt = 0, Fe = null, ca = !1, xn = !1, of = !1, Xl = 0, It = 0, sa = 0, Ga = 0, ki = 0, ke = 0, Mn = 0, xu = null, Ge = null, df = !1, Wi = 0, xm = 0, Ii = 1 / 0, Pi = null, fa = null, kt = 0, ml = null, Xa = null, xl = 0, mf = 0, hf = null, Mm = null, On = null, zn = null, An = null, Mu = 0, tc = null;
  function We() {
    return (Rt & 2) !== 0 && Tt !== 0 ? Tt & -Tt : V.T !== null ? Nf() : zr();
  }
  function Om() {
    if (ke === 0)
      if ((Tt & 536870912) === 0 || pt) {
        var t = $u;
        $u <<= 1, ($u & 3932160) === 0 && ($u = 262144), ke = t;
      } else ke = 536870912;
    return t = Ee.current, t !== null && (t.flags |= 32), ke;
  }
  function Cn(t, e) {
    if (e != null) {
      var l = t.stateNode, a = l.ref;
      a === null && (a = l.ref = ch(
        Rl(t.memoizedProps, l)
      )), zn === null && (zn = []), zn.push(e.bind(null, a));
    }
  }
  function Xe(t, e, l) {
    (t === qt && (wt === 2 || wt === 9) || t.cancelPendingCommit !== null) && (jn(t, 0), ra(
      t,
      Tt,
      ke,
      !1
    )), Jn(t, l), ((Rt & 2) === 0 || t !== qt) && (t === qt && ((Rt & 2) === 0 && (Ga |= l), It === 4 && ra(
      t,
      Tt,
      ke,
      !1
    )), Ml(t));
  }
  function zm(t, e, l) {
    if ((Rt & 6) !== 0) throw Error(s(327));
    var a = !l && (e & 127) === 0 && (e & t.expiredLanes) === 0 || Kn(t, e), n = a ? ly(t, e) : yf(t, e, !0), u = a;
    do {
      if (n === 0) {
        xn && !a && ra(t, e, 0, !1);
        break;
      } else {
        if (l = t.current.alternate, u && !ty(l)) {
          n = yf(t, e, !1), u = !1;
          continue;
        }
        if (n === 2) {
          if (u = e, t.errorRecoveryDisabledLanes & u)
            var i = 0;
          else
            i = t.pendingLanes & -536870913, i = i !== 0 ? i : i & 536870912 ? 536870912 : 0;
          if (i !== 0) {
            e = i;
            t: {
              var r = t;
              n = xu;
              var m = r.current.memoizedState.isDehydrated;
              if (m && (jn(r, i).flags |= 256), i = yf(
                r,
                i,
                !1
              ), i !== 2 && i !== 6) {
                if (of && !m) {
                  r.errorRecoveryDisabledLanes |= u, Ga |= u, n = 4;
                  break t;
                }
                u = Ge, Ge = n, u !== null && (Ge === null ? Ge = u : Ge.push.apply(
                  Ge,
                  u
                ));
              }
              n = i;
            }
            if (u = !1, n !== 2) continue;
          }
        }
        if (n === 1) {
          jn(t, 0), ra(t, e, 0, !0);
          break;
        }
        t: {
          switch (a = t, u = n, u) {
            case 0:
            case 1:
              throw Error(s(345));
            case 4:
              if ((e & 4194048) !== e && (e & 62914560) !== e)
                break;
            case 6:
              ra(
                a,
                e,
                ke,
                !ca
              );
              break t;
            case 2:
              Ge = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((e & 62914560) === e && (n = Wi + 300 - fe(), 10 < n)) {
            if (ra(
              a,
              e,
              ke,
              !ca
            ), ku(a, 0, !0) !== 0) break t;
            xl = e, a.timeoutHandle = wf(
              Am.bind(
                null,
                a,
                l,
                Ge,
                Pi,
                df,
                e,
                ke,
                Ga,
                Mn,
                ca,
                u,
                "Throttled",
                -0,
                0
              ),
              n
            );
            break t;
          }
          Am(
            a,
            l,
            Ge,
            Pi,
            df,
            e,
            ke,
            Ga,
            Mn,
            ca,
            u,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Ml(t);
  }
  function Am(t, e, l, a, n, u, i, r, m, _, M, U, p, N) {
    t.timeoutHandle = -1;
    var X = e.subtreeFlags, F = (u & 335544064) === u;
    if (U = null, (F || X & 8192 || (X & 16785408) === 16785408) && (U = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: yl
    }, $e = null, _m(
      e,
      u,
      U
    ), F && (X = U, F = t.containerInfo, F = (F.nodeType === 9 ? F : F.ownerDocument).__reactViewTransition, F != null && (X.count++, X.waitingForViewTransition = !0, X = Uu.bind(X), F.finished.then(X, X))), X = (u & 62914560) === u ? Wi - fe() : (u & 4194048) === u ? xm - fe() : 0, X = ng(
      U,
      X
    ), X !== null)) {
      xl = u, t.cancelPendingCommit = X(
        Hm.bind(
          null,
          t,
          e,
          u,
          l,
          a,
          n,
          i,
          r,
          m,
          _,
          M,
          U,
          null,
          p,
          N
        )
      ), ra(t, u, i, !_);
      return;
    }
    Hm(
      t,
      e,
      u,
      l,
      a,
      n,
      i,
      r,
      m,
      _,
      M,
      U
    );
  }
  function ty(t) {
    for (var e = t; ; ) {
      var l = e.tag;
      if ((l === 0 || l === 11 || l === 15) && e.flags & 16384 && (l = e.updateQueue, l !== null && (l = l.stores, l !== null)))
        for (var a = 0; a < l.length; a++) {
          var n = l[a], u = n.getSnapshot;
          n = n.value;
          try {
            if (!Ke(u(), n)) return !1;
          } catch {
            return !1;
          }
        }
      if (l = e.child, e.subtreeFlags & 16384 && l !== null)
        l.return = e, e = l;
      else {
        if (e === t) break;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) return !0;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    }
    return !0;
  }
  function ra(t, e, l, a) {
    e = Tr(t, e), e &= ~ki, e &= ~Ga, t.suspendedLanes |= e, t.pingedLanes &= ~e, a && (t.warmLanes |= e), a = t.expirationTimes;
    for (var n = e; 0 < n; ) {
      var u = 31 - Ve(n), i = 1 << u;
      a[u] = -1, n &= ~i;
    }
    l !== 0 && xr(t, l, e);
  }
  function ec() {
    return (Rt & 6) === 0 ? (Ou(0), !1) : !0;
  }
  function vf() {
    if (St !== null) {
      if (wt === 0)
        var t = St.return;
      else
        t = St, Bl = Aa = null, Es(t), gn = null, ru = 0, t = St;
      for (; t !== null; )
        Id(t.alternate, t), t = t.return;
      St = null;
    }
  }
  function jn(t, e) {
    var l = t.timeoutHandle;
    return l !== -1 && (t.timeoutHandle = -1, Ny(l)), l = t.cancelPendingCommit, l !== null && (t.cancelPendingCommit = null, l()), xl = 0, vf(), qt = t, St = l = Ul(t.current, null), Tt = e, wt = 0, Fe = null, ca = !1, xn = Kn(t, e), of = !1, Mn = ke = ki = Ga = sa = It = 0, Ge = xu = null, df = !1, Xl = Tr(t, e), fi(), l;
  }
  function Cm(t, e) {
    yt = null, V.H = Ui, e === yn || e === Si ? (e = Ho(), wt = 3) : e === fs ? (e = Ho(), wt = 4) : wt = e === Hs ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, Fe = e, St === null && (It = 1, wi(
      t,
      el(e, t.current)
    ));
  }
  function jm() {
    var t = Ee.current;
    return t === null ? !0 : (Tt & 4194048) === Tt ? Ae === null : (Tt & 62914560) === Tt || (Tt & 536870912) !== 0 ? t === Ae : !1;
  }
  function Rm() {
    var t = V.H;
    return V.H = Ui, t === null ? Ui : t;
  }
  function Dm() {
    var t = V.A;
    return V.A = Iv, t;
  }
  function lc() {
    It = 4, ca || (Tt & 4194048) !== Tt && Ee.current !== null || (xn = !0), (sa & 134217727) === 0 && (Ga & 134217727) === 0 || qt === null || ra(
      qt,
      Tt,
      ke,
      !1
    );
  }
  function yf(t, e, l) {
    var a = Rt;
    Rt |= 2;
    var n = Rm(), u = Dm();
    (qt !== t || Tt !== e) && (Pi = null, jn(t, e)), e = !1;
    var i = It;
    t: do
      try {
        if (wt !== 0 && St !== null) {
          var r = St, m = Fe;
          switch (wt) {
            case 8:
              vf(), i = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              Ee.current === null && (e = !0);
              var _ = wt;
              if (wt = 0, Fe = null, Rn(t, r, m, _), l && xn) {
                i = 0;
                break t;
              }
              break;
            default:
              _ = wt, wt = 0, Fe = null, Rn(t, r, m, _);
          }
        }
        ey(), i = It;
        break;
      } catch (M) {
        Cm(t, M);
      }
    while (!0);
    return e && t.shellSuspendCounter++, Bl = Aa = null, Rt = a, V.H = n, V.A = u, St === null && (qt = null, Tt = 0, fi()), i;
  }
  function ey() {
    for (; St !== null; ) Um(St);
  }
  function ly(t, e) {
    var l = Rt;
    Rt |= 2;
    var a = Rm(), n = Dm();
    qt !== t || Tt !== e ? (Pi = null, Ii = fe() + 500, jn(t, e)) : xn = Kn(
      t,
      e
    );
    t: do
      try {
        if (wt !== 0 && St !== null) {
          e = St;
          var u = Fe;
          e: switch (wt) {
            case 1:
              wt = 0, Fe = null, Rn(t, e, u, 1);
              break;
            case 2:
            case 9:
              if (wo(u)) {
                wt = 0, Fe = null, wm(e);
                break;
              }
              e = function() {
                wt !== 2 && wt !== 9 || qt !== t || (wt = 7), Ml(t);
              }, u.then(e, e);
              break t;
            case 3:
              wt = 7;
              break t;
            case 4:
              wt = 5;
              break t;
            case 7:
              wo(u) ? (wt = 0, Fe = null, wm(e)) : (wt = 0, Fe = null, Rn(t, e, u, 7));
              break;
            case 5:
              var i = null;
              switch (St.tag) {
                case 26:
                  i = St.memoizedState;
                case 5:
                case 27:
                  var r = St;
                  if (i ? Mh(i) : r.stateNode.complete) {
                    wt = 0, Fe = null;
                    var m = r.sibling;
                    if (m !== null) St = m;
                    else {
                      var _ = r.return;
                      _ !== null ? (St = _, ac(_)) : St = null;
                    }
                    break e;
                  }
              }
              wt = 0, Fe = null, Rn(t, e, u, 5);
              break;
            case 6:
              wt = 0, Fe = null, Rn(t, e, u, 6);
              break;
            case 8:
              vf(), It = 6;
              break t;
            default:
              throw Error(s(462));
          }
        }
        ay();
        break;
      } catch (M) {
        Cm(t, M);
      }
    while (!0);
    return Bl = Aa = null, V.H = a, V.A = n, Rt = l, St !== null ? 0 : (qt = null, Tt = 0, fi(), It);
  }
  function ay() {
    for (; St !== null && !Jt(); )
      Um(St);
  }
  function Um(t) {
    var e = kd(t.alternate, t, Xl);
    t.memoizedProps = t.pendingProps, e === null ? ac(t) : St = e;
  }
  function wm(t) {
    var e = t, l = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = Qd(
          l,
          e,
          e.pendingProps,
          e.type,
          void 0,
          Tt
        );
        break;
      case 11:
        e = Qd(
          l,
          e,
          e.pendingProps,
          e.type.render,
          e.ref,
          Tt
        );
        break;
      case 5:
        Es(e);
        var a = e;
        a === ge && (pt ? (vi(a), a.tag === 5 && a.stateNode != null && (Xt = a.stateNode)) : (vi(a), pt = !0));
      default:
        Id(l, e), e = St = No(e, Xl), e = kd(l, e, Xl);
    }
    t.memoizedProps = t.pendingProps, e === null ? ac(t) : St = e;
  }
  function Rn(t, e, l, a) {
    Bl = Aa = null, Es(e), gn = null, ru = 0;
    var n = e.return;
    try {
      if (Vv(
        t,
        n,
        e,
        l,
        Tt
      )) {
        It = 1, wi(
          t,
          el(l, t.current)
        ), St = null;
        return;
      }
    } catch (u) {
      if (n !== null) throw St = n, u;
      It = 1, wi(
        t,
        el(l, t.current)
      ), St = null;
      return;
    }
    e.flags & 32768 ? (pt || a === 1 ? t = !0 : xn || (Tt & 536870912) !== 0 ? t = !1 : (ca = t = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = Ee.current, a !== null && a.tag === 13 && (a.flags |= 16384))), Bm(e, t)) : ac(e);
  }
  function ac(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        Bm(
          e,
          ca
        );
        return;
      }
      t = e.return;
      var l = $v(
        e.alternate,
        e,
        Xl
      );
      if (l !== null) {
        St = l;
        return;
      }
      if (e = e.sibling, e !== null) {
        St = e;
        return;
      }
      St = e = t;
    } while (e !== null);
    It === 0 && (It = 5);
  }
  function Bm(t, e) {
    do {
      var l = Fv(t.alternate, t);
      if (l !== null) {
        l.flags &= 32767, St = l;
        return;
      }
      if (l = t.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !e && (t = t.sibling, t !== null)) {
        St = t;
        return;
      }
      St = t = l;
    } while (t !== null);
    It = 6, St = null;
  }
  function Hm(t, e, l, a, n, u, i, r, m, _, M, U) {
    t.cancelPendingCommit = null;
    do
      nc();
    while (kt !== 0);
    if ((Rt & 6) !== 0) throw Error(s(327));
    if (e !== null) {
      if (e === t.current) throw Error(s(177));
      t === qt && (St = qt = null, Tt = 0), Xa = e, ml = t, xl = l, hf = n, Mm = a, ny(
        t,
        e,
        l,
        i,
        r,
        m,
        U
      );
    }
  }
  function ny(t, e, l, a, n, u, i) {
    var r = e.lanes | e.childLanes;
    if (mf = r, r |= kc, C0(
      t,
      l,
      r,
      a,
      n,
      u
    ), zn = null, (l & 335544064) === l ? (An = Rv(t), a = 10262) : (An = null, a = 10256), (e.subtreeFlags & a) !== 0 || (e.flags & a) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, ry(Ku, function() {
      return Sf(), null;
    })) : (t.callbackNode = null, t.callbackPriority = 0), Qi = !1, a = (e.flags & 13878) !== 0, (e.subtreeFlags & 13878) !== 0 || a) {
      a = V.T, V.T = null, n = k.p, k.p = 2, u = Rt, Rt |= 4;
      try {
        kv(t, e, l);
      } finally {
        Rt = u, k.p = n, V.T = a;
      }
    }
    kt = 1, Qi ? On = Cy(
      i,
      t.containerInfo,
      An,
      gf,
      bf,
      iy,
      pf,
      Sf,
      uy
    ) : (gf(), bf(), pf());
  }
  function uy(t) {
    if (kt !== 0) {
      var e = ml.onRecoverableError;
      e(t, { componentStack: null });
    }
  }
  function iy() {
    kt === 3 && (kt = 0, pm(Xa, ml), kt = 4);
  }
  function gf() {
    if (kt === 1) {
      kt = 0;
      var t = ml, e = Xa, l = xl, a = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || a) {
        a = V.T, V.T = null;
        var n = k.p;
        k.p = 2;
        var u = Rt;
        Rt |= 4;
        try {
          Eu = Ki = !1, gm(e, t, l), l = Rf;
          var i = ho(t.containerInfo), r = l.focusedElem, m = l.selectionRange;
          if (i !== r && r && r.ownerDocument && mo(
            r.ownerDocument.documentElement,
            r
          )) {
            if (m !== null && Zc(r)) {
              var _ = m.start, M = m.end;
              if (M === void 0 && (M = _), "selectionStart" in r)
                r.selectionStart = _, r.selectionEnd = Math.min(
                  M,
                  r.value.length
                );
              else {
                var U = r.ownerDocument || document, p = U && U.defaultView || window;
                if (p.getSelection) {
                  var N = p.getSelection(), X = r.textContent.length, F = Math.min(m.start, X), gt = m.end === void 0 ? F : Math.min(m.end, X);
                  !N.extend && F > gt && (i = gt, gt = F, F = i);
                  var S = oo(
                    r,
                    F
                  ), y = oo(
                    r,
                    gt
                  );
                  if (S && y && (N.rangeCount !== 1 || N.anchorNode !== S.node || N.anchorOffset !== S.offset || N.focusNode !== y.node || N.focusOffset !== y.offset)) {
                    var T = U.createRange();
                    T.setStart(S.node, S.offset), N.removeAllRanges(), F > gt ? (N.addRange(T), N.extend(y.node, y.offset)) : (T.setEnd(y.node, y.offset), N.addRange(T));
                  }
                }
              }
            }
            for (U = [], N = r; N = N.parentNode; )
              N.nodeType === 1 && U.push({
                element: N,
                left: N.scrollLeft,
                top: N.scrollTop
              });
            for (typeof r.focus == "function" && r.focus(), r = 0; r < U.length; r++) {
              var D = U[r];
              D.element.scrollLeft = D.left, D.element.scrollTop = D.top;
            }
          }
          qn = !!jf, Rf = jf = null;
        } finally {
          Rt = u, k.p = n, V.T = a;
        }
      }
      t.current = e, kt = 2;
    }
  }
  function bf() {
    if (kt === 2) {
      kt = 0;
      var t = ml, e = Xa, l = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || l) {
        l = V.T, V.T = null;
        var a = k.p;
        k.p = 2;
        var n = Rt;
        Rt |= 4;
        try {
          om(t, e.alternate, e);
        } finally {
          Rt = n, k.p = a, V.T = l;
        }
      }
      kt = 3;
    }
  }
  function pf() {
    if (kt === 4 || kt === 3) {
      kt = 0;
      var t = On;
      On = null, te();
      var e = ml, l = Xa, a = xl, n = Mm, u = (a & 335544064) === a ? 10262 : 10256;
      if ((l.subtreeFlags & u) !== 0 || (l.flags & u) !== 0 ? kt = 5 : (kt = 0, Xa = ml = null, Lm(e, e.pendingLanes)), u = e.pendingLanes, u === 0 && (fa = null), Oc(a), l = l.stateNode, Qe && typeof Qe.onCommitFiberRoot == "function")
        try {
          Qe.onCommitFiberRoot(
            Zn,
            l,
            void 0,
            (l.current.flags & 128) === 128
          );
        } catch {
        }
      if (n !== null) {
        l = V.T, u = k.p, k.p = 2, V.T = null;
        try {
          for (var i = e.onRecoverableError, r = 0; r < n.length; r++) {
            var m = n[r];
            i(m.value, {
              componentStack: m.stack
            });
          }
        } finally {
          V.T = l, k.p = u;
        }
      }
      if (n = zn, i = An, An = null, n !== null && (zn = null, i === null && (i = []), t !== null))
        for (m = 0; m < n.length; m++)
          l = (0, n[m])(
            i
          ), l !== void 0 && t.finished.finally(l);
      (xl & 3) !== 0 && nc(), Ml(e), u = e.pendingLanes, (a & 261930) !== 0 && (u & 42) !== 0 ? e === tc ? Mu++ : (Mu = 0, tc = e) : (Mu = 0, tc = null), Ou(0);
    }
  }
  function Lm(t, e) {
    (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, cu(e)));
  }
  function nc() {
    return On !== null && (On.skipTransition(), On = null), gf(), bf(), pf(), Sf();
  }
  function Sf() {
    if (kt !== 5) return !1;
    var t = ml, e = mf;
    mf = 0;
    var l = Oc(xl), a = V.T, n = k.p;
    try {
      k.p = 32 > l ? 32 : l, V.T = null, l = hf, hf = null;
      var u = ml, i = xl;
      if (kt = 0, Xa = ml = null, xl = 0, (Rt & 6) !== 0) throw Error(s(331));
      var r = Rt;
      if (Rt |= 4, Tm(u.current), Sm(
        u,
        u.current,
        i,
        l
      ), Rt = r, Ou(0, !1), Qe && typeof Qe.onPostCommitFiberRoot == "function")
        try {
          Qe.onPostCommitFiberRoot(Zn, u);
        } catch {
        }
      return !0;
    } finally {
      k.p = n, V.T = a, Lm(t, e);
    }
  }
  function Ym(t, e, l) {
    e = el(l, e), e = Bs(t.stateNode, e, 2), t = ea(t, e, 2), t !== null && (Jn(t, 2), Ml(t));
  }
  function Bt(t, e, l) {
    if (t.tag === 3)
      Ym(t, t, l);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          Ym(
            e,
            t,
            l
          );
          break;
        } else if (e.tag === 1) {
          var a = e.stateNode;
          if (typeof e.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (fa === null || !fa.has(a))) {
            t = el(l, t), l = wd(2), a = ea(e, l, 2), a !== null && (Bd(
              l,
              a,
              e,
              t
            ), Jn(a, 2), Ml(a));
            break;
          }
        }
        e = e.return;
      }
  }
  function _f(t, e, l) {
    var a = t.pingCache;
    if (a === null) {
      a = t.pingCache = new Pv();
      var n = /* @__PURE__ */ new Set();
      a.set(e, n);
    } else
      n = a.get(e), n === void 0 && (n = /* @__PURE__ */ new Set(), a.set(e, n));
    n.has(l) || (of = !0, n.add(l), t = cy.bind(null, t, e, l), e.then(t, t));
  }
  function cy(t, e, l) {
    var a = t.pingCache;
    a !== null && a.delete(e), t.pingedLanes |= t.suspendedLanes & l, t.warmLanes &= ~l, qt === t && (Tt & l) === l && ((It === 4 || It === 3 && (Tt & 62914560) === Tt && 300 > fe() - Wi) && (Rt & 2) === 0 ? jn(t, 0) : ki |= l, Mn === Tt && (Mn = 0)), Ml(t);
  }
  function qm(t, e) {
    e === 0 && (e = Nr()), t = Ma(t, e), t !== null && (Jn(t, e), Ml(t));
  }
  function sy(t) {
    var e = t.memoizedState, l = 0;
    e !== null && (l = e.retryLane), qm(t, l);
  }
  function fy(t, e) {
    var l = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var a = t.stateNode, n = t.memoizedState;
        n !== null && (l = n.retryLane);
        break;
      case 19:
        a = t.stateNode;
        break;
      case 22:
        a = t.stateNode._retryCache;
        break;
      default:
        throw Error(s(314));
    }
    a !== null && a.delete(e), qm(t, l);
  }
  function ry(t, e) {
    return O(t, e);
  }
  var Dn = null, Un = null, Ef = !1, uc = !1, Tf = !1, oa = 0;
  function Ml(t) {
    t !== Un && t.next === null && (Un === null ? Dn = Un = t : Un = Un.next = t), uc = !0, Ef || (Ef = !0, dy());
  }
  function Ou(t, e) {
    if (!Tf && uc) {
      Tf = !0;
      do
        for (var l = !1, a = Dn; a !== null; ) {
          if (t !== 0) {
            var n = a.pendingLanes;
            if (n === 0) var u = 0;
            else {
              var i = a.suspendedLanes, r = a.pingedLanes;
              u = (1 << 31 - Ve(42 | t) + 1) - 1, u &= n & ~(i & ~r), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (l = !0, Vm(a, u));
          } else
            u = Tt, u = ku(
              a,
              a === qt ? u : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (u & 3) === 0 || Kn(a, u) || (l = !0, Vm(a, u));
          a = a.next;
        }
      while (l);
      Tf = !1;
    }
  }
  function oy() {
    Gm();
  }
  function Gm() {
    uc = Ef = !1;
    var t = 0;
    oa !== 0 && Ty() && (t = oa);
    for (var e = fe(), l = null, a = Dn; a !== null; ) {
      var n = a.next, u = Xm(a, e);
      u === 0 ? (a.next = null, l === null ? Dn = n : l.next = n, n === null && (Un = l)) : (l = a, (t !== 0 || (u & 3) !== 0) && (uc = !0)), a = n;
    }
    kt !== 0 && kt !== 5 || Ou(t), oa !== 0 && (oa = 0);
  }
  function Xm(t, e) {
    for (var l = t.suspendedLanes, a = t.pingedLanes, n = t.expirationTimes, u = t.pendingLanes & -62914561; 0 < u; ) {
      var i = 31 - Ve(u), r = 1 << i, m = n[i];
      m === -1 ? ((r & l) === 0 || (r & a) !== 0) && (n[i] = A0(r, e)) : m <= e && (t.expiredLanes |= r), u &= ~r;
    }
    if (e = qt, l = Tt, l = ku(
      t,
      t === e ? l : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a = t.callbackNode, l === 0 || t === e && (wt === 2 || wt === 9) || t.cancelPendingCommit !== null)
      return a !== null && a !== null && et(a), t.callbackNode = null, t.callbackPriority = 0;
    if ((l & 3) === 0 || Kn(t, l)) {
      if (e = l & -l, e === t.callbackPriority) return e;
      switch (a !== null && et(a), Oc(l)) {
        case 2:
        case 8:
          l = _r;
          break;
        case 32:
          l = Ku;
          break;
        case 268435456:
          l = Er;
          break;
        default:
          l = Ku;
      }
      return a = Qm.bind(null, t), l = O(l, a), t.callbackPriority = e, t.callbackNode = l, e;
    }
    return a !== null && a !== null && et(a), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function Qm(t, e) {
    if (kt !== 0 && kt !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var l = t.callbackNode;
    if (nc() && t.callbackNode !== l)
      return null;
    var a = Tt;
    return a = ku(
      t,
      t === qt ? a : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a === 0 ? null : (zm(t, a, e), Xm(t, fe()), t.callbackNode != null && t.callbackNode === l ? Qm.bind(null, t) : null);
  }
  function Vm(t, e) {
    if (nc()) return null;
    zm(t, e, !0);
  }
  function dy() {
    xy(function() {
      (Rt & 6) !== 0 ? O(
        Wa,
        oy
      ) : Gm();
    });
  }
  function Nf() {
    if (oa === 0) {
      var t = Ra;
      t === 0 && (t = Ju, Ju <<= 1, (Ju & 261888) === 0 && (Ju = 256)), oa = t;
    }
    return oa;
  }
  function Zm(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : ei(t);
  }
  function my(t, e, l, a, n) {
    if (e === "submit" && l && l.stateNode === n) {
      var u = Zm(
        (n[He] || null).action
      ), i = a.submitter;
      i && (e = (e = i[He] || null) ? Zm(e.formAction) : i.getAttribute("formAction"), e !== null && (u = e, i = null));
      var r = new ui(
        "action",
        "action",
        null,
        a,
        n
      );
      t.push({
        event: r,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (a.defaultPrevented) {
                if (oa !== 0) {
                  var m = new FormData(n, i);
                  js(
                    l,
                    {
                      pending: !0,
                      data: m,
                      method: n.method,
                      action: u
                    },
                    null,
                    m
                  );
                }
              } else
                typeof u == "function" && (r.preventDefault(), m = new FormData(n, i), js(
                  l,
                  {
                    pending: !0,
                    data: m,
                    method: n.method,
                    action: u
                  },
                  u,
                  m
                ));
            },
            currentTarget: n
          }
        ]
      });
    }
  }
  for (var xf = 0; xf < Fc.length; xf++) {
    var Mf = Fc[xf], hy = Mf.toLowerCase(), vy = Mf[0].toUpperCase() + Mf.slice(1);
    fl(
      hy,
      "on" + vy
    );
  }
  fl(go, "onAnimationEnd"), fl(bo, "onAnimationIteration"), fl(po, "onAnimationStart"), fl("dblclick", "onDoubleClick"), fl("focusin", "onFocus"), fl("focusout", "onBlur"), fl(Nv, "onTransitionRun"), fl(xv, "onTransitionStart"), fl(Mv, "onTransitionCancel"), fl(So, "onTransitionEnd"), en("onMouseEnter", ["mouseout", "mouseover"]), en("onMouseLeave", ["mouseout", "mouseover"]), en("onPointerEnter", ["pointerout", "pointerover"]), en("onPointerLeave", ["pointerout", "pointerover"]), Ta(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Ta(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Ta("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Ta(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Ta(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Ta(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var zu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), yy = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(zu)
  );
  function Km(t, e) {
    e = (e & 4) !== 0;
    for (var l = 0; l < t.length; l++) {
      var a = t[l], n = a.event;
      a = a.listeners;
      t: {
        var u = void 0;
        if (e)
          for (var i = a.length - 1; 0 <= i; i--) {
            var r = a[i], m = r.instance, _ = r.currentTarget;
            if (r = r.listener, m !== u && n.isPropagationStopped())
              break t;
            u = r, n.currentTarget = _;
            try {
              u(n);
            } catch (M) {
              si(M);
            }
            n.currentTarget = null, u = m;
          }
        else
          for (i = 0; i < a.length; i++) {
            if (r = a[i], m = r.instance, _ = r.currentTarget, r = r.listener, m !== u && n.isPropagationStopped())
              break t;
            u = r, n.currentTarget = _;
            try {
              u(n);
            } catch (M) {
              si(M);
            }
            n.currentTarget = null, u = m;
          }
      }
    }
  }
  function _t(t, e) {
    var l = e[Cr];
    l === void 0 && (l = e[Cr] = /* @__PURE__ */ new Set());
    var a = t + "__bubble";
    l.has(a) || (Jm(e, t, 2, !1), l.add(a));
  }
  function Of(t, e, l) {
    var a = 0;
    e && (a |= 4), Jm(
      l,
      t,
      a,
      e
    );
  }
  var ic = "_reactListening" + Math.random().toString(36).slice(2);
  function zf(t) {
    if (!t[ic]) {
      t[ic] = !0, Dr.forEach(function(l) {
        l !== "selectionchange" && (yy.has(l) || Of(l, !1, t), Of(l, !0, t));
      });
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[ic] || (e[ic] = !0, Of("selectionchange", !1, e));
    }
  }
  function Jm(t, e, l, a) {
    switch (Bh(e)) {
      case 2:
        var n = sg;
        break;
      case 8:
        n = fg;
        break;
      default:
        n = $f;
    }
    l = n.bind(
      null,
      e,
      l,
      t
    ), n = void 0, !wc || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (n = !0), a ? n !== void 0 ? t.addEventListener(e, l, {
      capture: !0,
      passive: n
    }) : t.addEventListener(e, l, !0) : n !== void 0 ? t.addEventListener(e, l, {
      passive: n
    }) : t.addEventListener(e, l, !1);
  }
  function Af(t, e, l, a, n) {
    var u = a;
    if ((e & 1) === 0 && (e & 2) === 0 && a !== null)
      t: for (; ; ) {
        if (a === null) return;
        var i = a.tag;
        if (i === 3 || i === 4) {
          var r = a.stateNode.containerInfo;
          if (r === n) break;
          if (i === 4)
            for (i = a.return; i !== null; ) {
              var m = i.tag;
              if ((m === 3 || m === 4) && i.stateNode.containerInfo === n)
                return;
              i = i.return;
            }
          for (; r !== null; ) {
            if (i = Ea(r), i === null) return;
            if (m = i.tag, m === 5 || m === 6 || m === 26 || m === 27) {
              a = u = i;
              continue t;
            }
            r = r.parentNode;
          }
        }
        a = a.return;
      }
    Kr(function() {
      var _ = u, M = Dc(l), U = [];
      t: {
        var p = _o.get(t);
        if (p !== void 0) {
          var N = ui, X = t;
          switch (t) {
            case "keypress":
              if (ai(l) === 0) break t;
            case "keydown":
            case "keyup":
              N = tv;
              break;
            case "focusin":
              X = "focus", N = Yc;
              break;
            case "focusout":
              X = "blur", N = Yc;
              break;
            case "beforeblur":
            case "afterblur":
              N = Yc;
              break;
            case "click":
              if (l.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              N = Fr;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              N = X0;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              N = uv;
              break;
            case go:
            case bo:
            case po:
              N = Z0;
              break;
            case So:
              N = cv;
              break;
            case "scroll":
            case "scrollend":
              N = q0;
              break;
            case "wheel":
              N = fv;
              break;
            case "copy":
            case "cut":
            case "paste":
              N = J0;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              N = Wr;
              break;
            case "submit":
              N = av;
              break;
            case "toggle":
            case "beforetoggle":
              N = ov;
          }
          var F = (e & 4) !== 0, gt = !F && (t === "scroll" || t === "scrollend"), S = F ? p !== null ? p + "Capture" : null : p;
          F = [];
          for (var y = _, T; y !== null; ) {
            var D = y;
            if (T = D.stateNode, D = D.tag, D !== 5 && D !== 26 && D !== 27 || T === null || S === null || (D = kn(y, S), D != null && F.push(
              Au(y, D, T)
            )), gt) break;
            y = y.return;
          }
          0 < F.length && (p = new N(
            p,
            X,
            null,
            l,
            M
          ), U.push({ event: p, listeners: F }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (N = t === "mouseover" || t === "pointerover", p = t === "mouseout" || t === "pointerout", N && l !== Rc && (X = l.relatedTarget || l.fromElement) && (Ea(X) || X[Ia]))
            break t;
          (p || N) && (X = M.window === M ? M : (N = M.ownerDocument) ? N.defaultView || N.parentWindow : window, p ? (N = l.relatedTarget || l.toElement, p = _, N = N ? Ea(N) : null, N !== null && (gt = v(N), F = N.tag, N !== gt || F !== 5 && F !== 27 && F !== 6) && (N = null)) : (p = null, N = _), p !== N && (F = Fr, D = "onMouseLeave", S = "onMouseEnter", y = "mouse", (t === "pointerout" || t === "pointerover") && (F = Wr, D = "onPointerLeave", S = "onPointerEnter", y = "pointer"), gt = p == null ? X : Fn(p), T = N == null ? X : Fn(N), X = new F(
            D,
            y + "leave",
            p,
            l,
            M
          ), X.target = gt, X.relatedTarget = T, D = null, Ea(M) === _ && (F = new F(
            S,
            y + "enter",
            N,
            l,
            M
          ), F.target = T, F.relatedTarget = gt, D = F), gt = D, F = p && N ? zt(
            p,
            N,
            gy
          ) : null, p !== null && $m(
            U,
            X,
            p,
            F,
            !1
          ), N !== null && gt !== null && $m(
            U,
            gt,
            N,
            F,
            !0
          )));
        }
        t: {
          if (p = _ ? Fn(_) : window, N = p.nodeName && p.nodeName.toLowerCase(), N === "select" || N === "input" && p.type === "file")
            var K = uo;
          else if (ao(p))
            if (io)
              K = _v;
            else {
              K = pv;
              var Nt = bv;
            }
          else
            N = p.nodeName, !N || N.toLowerCase() !== "input" || p.type !== "checkbox" && p.type !== "radio" ? _ && jc(_.elementType) && (K = uo) : K = Sv;
          if (K && (K = K(t, _))) {
            no(
              U,
              K,
              l,
              M
            );
            break t;
          }
          Nt && Nt(t, p, _);
        }
        switch (Nt = _ ? Fn(_) : window, t) {
          case "focusin":
            (ao(Nt) || Nt.contentEditable === "true") && (sn = Nt, Kc = _, nu = null);
            break;
          case "focusout":
            nu = Kc = sn = null;
            break;
          case "mousedown":
            Jc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Jc = !1, vo(U, l, M);
            break;
          case "selectionchange":
            if (Tv) break;
          case "keydown":
          case "keyup":
            vo(U, l, M);
        }
        var lt;
        if (Gc)
          t: {
            switch (t) {
              case "compositionstart":
                var it = "onCompositionStart";
                break t;
              case "compositionend":
                it = "onCompositionEnd";
                break t;
              case "compositionupdate":
                it = "onCompositionUpdate";
                break t;
            }
            it = void 0;
          }
        else
          cn ? eo(t, l) && (it = "onCompositionEnd") : t === "keydown" && l.keyCode === 229 && (it = "onCompositionStart");
        it && (Ir && l.locale !== "ko" && (cn || it !== "onCompositionStart" ? it === "onCompositionEnd" && cn && (lt = Jr()) : (Kl = M, Bc = "value" in Kl ? Kl.value : Kl.textContent, cn = !0)), Nt = cc(_, it), 0 < Nt.length && (it = new kr(
          it,
          t,
          null,
          l,
          M
        ), U.push({ event: it, listeners: Nt }), lt ? it.data = lt : (lt = lo(l), lt !== null && (it.data = lt)))), (lt = mv ? hv(t, l) : vv(t, l)) && (it = cc(_, "onBeforeInput"), 0 < it.length && (Nt = new kr(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          M
        ), U.push({
          event: Nt,
          listeners: it
        }), Nt.data = lt)), my(
          U,
          t,
          _,
          l,
          M
        );
      }
      Km(U, e);
    });
  }
  function Au(t, e, l) {
    return {
      instance: t,
      listener: e,
      currentTarget: l
    };
  }
  function cc(t, e) {
    for (var l = e + "Capture", a = []; t !== null; ) {
      var n = t, u = n.stateNode;
      if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || u === null || (n = kn(t, l), n != null && a.unshift(
        Au(t, n, u)
      ), n = kn(t, e), n != null && a.push(
        Au(t, n, u)
      )), t.tag === 3) return a;
      t = t.return;
    }
    return [];
  }
  function gy(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function $m(t, e, l, a, n) {
    for (var u = e._reactName, i = []; l !== null && l !== a; ) {
      var r = l, m = r.alternate, _ = r.stateNode;
      if (r = r.tag, m !== null && m === a) break;
      r !== 5 && r !== 26 && r !== 27 || _ === null || (m = _, n ? (_ = kn(l, u), _ != null && i.unshift(
        Au(l, _, m)
      )) : n || (_ = kn(l, u), _ != null && i.push(
        Au(l, _, m)
      ))), l = l.return;
    }
    i.length !== 0 && t.push({ event: e, listeners: i });
  }
  var by = /\r\n?/g, py = /\u0000|\uFFFD/g;
  function Fm(t) {
    return (typeof t == "string" ? t : "" + t).replace(by, `
`).replace(py, "");
  }
  function km(t, e) {
    return e = Fm(e), Fm(t) === e;
  }
  function Ht(t, e, l, a, n, u) {
    switch (l) {
      case "children":
        if (typeof a == "string")
          e === "body" || e === "textarea" && a === "" || an(t, a);
        else if (typeof a == "number" || typeof a == "bigint")
          e !== "body" && an(t, "" + a);
        else return;
        break;
      case "className":
        ti(t, "class", a);
        break;
      case "tabIndex":
        ti(t, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        ti(t, l, a);
        break;
      case "style":
        Vr(t, a, u);
        return;
      case "data":
        if (e !== "object") {
          ti(t, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (e !== "a" || l !== "href")) {
          t.removeAttribute(l);
          break;
        }
        if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
          t.removeAttribute(l);
          break;
        }
        a = ei(a), t.setAttribute(l, a);
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          t.setAttribute(
            l,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof u == "function" && (l === "formAction" ? (e !== "input" && Ht(t, e, "name", n.name, n, null), Ht(
            t,
            e,
            "formEncType",
            n.formEncType,
            n,
            null
          ), Ht(
            t,
            e,
            "formMethod",
            n.formMethod,
            n,
            null
          ), Ht(
            t,
            e,
            "formTarget",
            n.formTarget,
            n,
            null
          )) : (Ht(t, e, "encType", n.encType, n, null), Ht(t, e, "method", n.method, n, null), Ht(t, e, "target", n.target, n, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          t.removeAttribute(l);
          break;
        }
        a = ei(a), t.setAttribute(l, a);
        break;
      case "onClick":
        a != null && (t.onclick = yl);
        return;
      case "onScroll":
        a != null && _t("scroll", t);
        return;
      case "onScrollEnd":
        a != null && _t("scrollend", t);
        return;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(s(61));
          if (l = a.__html, l != null) {
            if (n.children != null) throw Error(s(60));
            u?.__html !== l && (t.innerHTML = l);
          }
        }
        break;
      case "multiple":
        t.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        t.muted = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (a == null || typeof a == "function" || typeof a == "boolean" || typeof a == "symbol") {
          t.removeAttribute("xlink:href");
          break;
        }
        l = ei(a), t.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          l
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        a != null && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(l, a) : t.removeAttribute(l);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "credentialless":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        a && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(l, "") : t.removeAttribute(l);
        break;
      case "capture":
      case "download":
        a === !0 ? t.setAttribute(l, "") : a !== !1 && a != null && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(l, a) : t.removeAttribute(l);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? t.setAttribute(l, a) : t.removeAttribute(l);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? t.removeAttribute(l) : t.setAttribute(l, a);
        break;
      case "popover":
        _t("beforetoggle", t), _t("toggle", t), Pu(t, "popover", a);
        break;
      case "xlinkActuate":
        Cl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        Cl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        Cl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        Cl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        Cl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        Cl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        Cl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        Cl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        Cl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        Pu(t, "is", a);
        break;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N")
          l = L0.get(l) || l, Pu(t, l, a);
        else return;
    }
    Ct = !0;
  }
  function Cf(t, e, l, a, n, u) {
    switch (l) {
      case "style":
        Vr(t, a, u);
        return;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(s(61));
          if (l = a.__html, l != null) {
            if (n.children != null) throw Error(s(60));
            u?.__html !== l && (t.innerHTML = l);
          }
        }
        break;
      case "children":
        if (typeof a == "string") an(t, a);
        else if (typeof a == "number" || typeof a == "bigint")
          an(t, "" + a);
        else return;
        break;
      case "onScroll":
        a != null && _t("scroll", t);
        return;
      case "onScrollEnd":
        a != null && _t("scrollend", t);
        return;
      case "onClick":
        a != null && (t.onclick = yl);
        return;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        return;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!Ur.hasOwnProperty(l))
          t: {
            if (l[0] === "o" && l[1] === "n" && (n = l.endsWith("Capture"), u = l.slice(2, n ? l.length - 7 : void 0), e = t[He] || null, e = e != null ? e[l] : null, typeof e == "function" && t.removeEventListener(u, e, n), typeof a == "function")) {
              typeof e != "function" && e !== null && (l in t ? t[l] = null : t.hasAttribute(l) && t.removeAttribute(l)), t.addEventListener(u, a, n);
              break t;
            }
            Ct = !0, l in t ? t[l] = a : a === !0 ? t.setAttribute(l, "") : Pu(t, l, a);
          }
        return;
    }
    Ct = !0;
  }
  function xe(t, e, l) {
    switch (e) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        _t("error", t), _t("load", t);
        var a = !1, n = !1, u;
        for (u in l)
          if (l.hasOwnProperty(u)) {
            var i = l[u];
            if (i != null)
              switch (u) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  n = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(s(137, e));
                default:
                  Ht(t, e, u, i, l, null);
              }
          }
        n && Ht(t, e, "srcSet", l.srcSet, l, null), a && Ht(t, e, "src", l.src, l, null);
        return;
      case "input":
        _t("invalid", t);
        var r = u = i = n = null, m = null, _ = null;
        for (a in l)
          if (l.hasOwnProperty(a)) {
            var M = l[a];
            if (M != null)
              switch (a) {
                case "name":
                  n = M;
                  break;
                case "type":
                  i = M;
                  break;
                case "checked":
                  m = M;
                  break;
                case "defaultChecked":
                  _ = M;
                  break;
                case "value":
                  u = M;
                  break;
                case "defaultValue":
                  r = M;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (M != null)
                    throw Error(s(137, e));
                  break;
                default:
                  Ht(t, e, a, M, l, null);
              }
          }
        qr(
          t,
          u,
          r,
          m,
          _,
          i,
          n,
          !1
        );
        return;
      case "select":
        _t("invalid", t), a = i = u = null;
        for (n in l)
          if (l.hasOwnProperty(n) && (r = l[n], r != null))
            switch (n) {
              case "value":
                u = r;
                break;
              case "defaultValue":
                i = r;
                break;
              case "multiple":
                a = r;
              default:
                Ht(t, e, n, r, l, null);
            }
        e = u, l = i, t.multiple = !!a, e != null ? ln(t, !!a, e, !1) : l != null && ln(t, !!a, l, !0);
        return;
      case "textarea":
        _t("invalid", t), u = n = a = null;
        for (i in l)
          if (l.hasOwnProperty(i) && (r = l[i], r != null))
            switch (i) {
              case "value":
                a = r;
                break;
              case "defaultValue":
                n = r;
                break;
              case "children":
                u = r;
                break;
              case "dangerouslySetInnerHTML":
                if (r != null) throw Error(s(91));
                break;
              default:
                Ht(t, e, i, r, l, null);
            }
        Xr(t, a, n, u);
        return;
      case "option":
        for (m in l)
          l.hasOwnProperty(m) && (a = l[m], a != null) && (m === "selected" ? t.selected = a && typeof a != "function" && typeof a != "symbol" : Ht(t, e, m, a, l, null));
        return;
      case "dialog":
        _t("beforetoggle", t), _t("toggle", t), _t("cancel", t), _t("close", t);
        break;
      case "iframe":
      case "object":
        _t("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < zu.length; a++)
          _t(zu[a], t);
        break;
      case "image":
        _t("error", t), _t("load", t);
        break;
      case "details":
        _t("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        _t("error", t), _t("load", t);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (_ in l)
          if (l.hasOwnProperty(_) && (a = l[_], a != null))
            switch (_) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(s(137, e));
              default:
                Ht(t, e, _, a, l, null);
            }
        return;
      default:
        if (jc(e)) {
          for (M in l)
            l.hasOwnProperty(M) && (a = l[M], a !== void 0 && Cf(
              t,
              e,
              M,
              a,
              l,
              void 0
            ));
          return;
        }
    }
    for (r in l)
      l.hasOwnProperty(r) && (a = l[r], a != null && Ht(t, e, r, a, l, null));
  }
  var Sy = {};
  function _y(t, e, l, a) {
    switch (e) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var n = null, u = null, i = null, r = null, m = null, _ = null, M = null;
        for (N in l) {
          var U = l[N];
          if (l.hasOwnProperty(N) && U != null)
            switch (N) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                m = U;
              default:
                a.hasOwnProperty(N) || Ht(t, e, N, null, a, U);
            }
        }
        for (var p in a) {
          var N = a[p];
          if (U = l[p], a.hasOwnProperty(p) && (N != null || U != null))
            switch (p) {
              case "type":
                N !== U && (Ct = !0), u = N;
                break;
              case "name":
                N !== U && (Ct = !0), n = N;
                break;
              case "checked":
                N !== U && (Ct = !0), _ = N;
                break;
              case "defaultChecked":
                N !== U && (Ct = !0), M = N;
                break;
              case "value":
                N !== U && (Ct = !0), i = N;
                break;
              case "defaultValue":
                N !== U && (Ct = !0), r = N;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (N != null)
                  throw Error(s(137, e));
                break;
              default:
                N !== U && Ht(
                  t,
                  e,
                  p,
                  N,
                  a,
                  U
                );
            }
        }
        Ac(
          t,
          i,
          r,
          m,
          _,
          M,
          u,
          n
        );
        return;
      case "select":
        N = i = r = p = null;
        for (u in l)
          if (m = l[u], l.hasOwnProperty(u) && m != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                N = m;
              default:
                a.hasOwnProperty(u) || Ht(
                  t,
                  e,
                  u,
                  null,
                  a,
                  m
                );
            }
        for (n in a)
          if (u = a[n], m = l[n], a.hasOwnProperty(n) && (u != null || m != null))
            switch (n) {
              case "value":
                u !== m && (Ct = !0), p = u;
                break;
              case "defaultValue":
                u !== m && (Ct = !0), r = u;
                break;
              case "multiple":
                u !== m && (Ct = !0), i = u;
              default:
                u !== m && Ht(
                  t,
                  e,
                  n,
                  u,
                  a,
                  m
                );
            }
        e = r, l = i, a = N, p != null ? ln(t, !!l, p, !1) : !!a != !!l && (e != null ? ln(t, !!l, e, !0) : ln(t, !!l, l ? [] : "", !1));
        return;
      case "textarea":
        N = p = null;
        for (r in l)
          if (n = l[r], l.hasOwnProperty(r) && n != null && !a.hasOwnProperty(r))
            switch (r) {
              case "value":
                break;
              case "children":
                break;
              default:
                Ht(t, e, r, null, a, n);
            }
        for (i in a)
          if (n = a[i], u = l[i], a.hasOwnProperty(i) && (n != null || u != null))
            switch (i) {
              case "value":
                n !== u && (Ct = !0), p = n;
                break;
              case "defaultValue":
                n !== u && (Ct = !0), N = n;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (n != null) throw Error(s(91));
                break;
              default:
                n !== u && Ht(t, e, i, n, a, u);
            }
        Gr(t, p, N);
        return;
      case "option":
        for (var X in l)
          p = l[X], l.hasOwnProperty(X) && p != null && !a.hasOwnProperty(X) && (X === "selected" ? t.selected = !1 : Ht(
            t,
            e,
            X,
            null,
            a,
            p
          ));
        for (m in a)
          p = a[m], N = l[m], a.hasOwnProperty(m) && p !== N && (p != null || N != null) && (m === "selected" ? (p !== N && (Ct = !0), t.selected = p && typeof p != "function" && typeof p != "symbol") : Ht(
            t,
            e,
            m,
            p,
            a,
            N
          ));
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var F in l)
          p = l[F], l.hasOwnProperty(F) && p != null && !a.hasOwnProperty(F) && Ht(t, e, F, null, a, p);
        for (_ in a)
          if (p = a[_], N = l[_], a.hasOwnProperty(_) && p !== N && (p != null || N != null))
            switch (_) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (p != null)
                  throw Error(s(137, e));
                break;
              default:
                Ht(
                  t,
                  e,
                  _,
                  p,
                  a,
                  N
                );
            }
        return;
      default:
        if (jc(e)) {
          for (var gt in l)
            p = l[gt], l.hasOwnProperty(gt) && p !== void 0 && !a.hasOwnProperty(gt) && Cf(
              t,
              e,
              gt,
              void 0,
              a,
              p
            );
          for (M in a)
            p = a[M], N = l[M], !a.hasOwnProperty(M) || p === N || p === void 0 && N === void 0 || Cf(
              t,
              e,
              M,
              p,
              a,
              N
            );
          return;
        }
    }
    for (var S in l)
      p = l[S], l.hasOwnProperty(S) && p != null && !a.hasOwnProperty(S) && Ht(t, e, S, null, a, p);
    for (U in a)
      p = a[U], N = l[U], !a.hasOwnProperty(U) || p === N || p == null && N == null || Ht(t, e, U, p, a, N);
  }
  function Wm(t) {
    switch (t) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function Ey() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, e = 0, l = performance.getEntriesByType("resource"), a = 0; a < l.length; a++) {
        var n = l[a], u = n.transferSize, i = n.initiatorType, r = n.duration;
        if (u && r && Wm(i)) {
          for (i = 0, r = n.responseEnd, a += 1; a < l.length; a++) {
            var m = l[a], _ = m.startTime;
            if (_ > r) break;
            var M = m.transferSize, U = m.initiatorType;
            M && Wm(U) && (m = m.responseEnd, i += M * (m < r ? 1 : (r - _) / (m - _)));
          }
          if (--a, e += 8 * (u + i) / (n.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var jf = null, Rf = null;
  function Cu(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function Im(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Pm(t, e) {
    if (t === 0)
      switch (e) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && e === "foreignObject" ? 0 : t;
  }
  function th(t, e, l, a) {
    return l = Cu(
      l
    ).createElement(t), l[Se] = a, l[He] = e, xe(l, t, e), ye(l), l;
  }
  function Df(t, e) {
    return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.children == "bigint" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
  }
  var Uf = null;
  function Ty() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Uf ? !1 : (Uf = t, !0) : (Uf = null, !1);
  }
  var wf = typeof setTimeout == "function" ? setTimeout : void 0, Ny = typeof clearTimeout == "function" ? clearTimeout : void 0, eh = typeof Promise == "function" ? Promise : void 0, lh = typeof requestAnimationFrame == "function" ? requestAnimationFrame : wf, xy = typeof queueMicrotask == "function" ? queueMicrotask : typeof eh < "u" ? function(t) {
    return eh.resolve(null).then(t).catch(My);
  } : wf;
  function My(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function da(t) {
    return t === "head";
  }
  function ah(t, e) {
    var l = e, a = 0;
    do {
      var n = l.nextSibling;
      if (t.removeChild(l), n && n.nodeType === 8)
        if (l = n.data, l === "/$" || l === "/&") {
          if (a === 0) {
            t.removeChild(n), Gn(e);
            return;
          }
          a--;
        } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&")
          a++;
        else if (l === "html")
          Qf(
            t.ownerDocument.documentElement
          );
        else if (l === "head") {
          l = t.ownerDocument.head, Qf(l);
          for (var u = l.firstChild; u; ) {
            var i = u.nextSibling, r = u.nodeName;
            u[$n] || r === "SCRIPT" || r === "STYLE" || r === "LINK" && u.rel.toLowerCase() === "stylesheet" || l.removeChild(u), u = i;
          }
        } else
          l === "body" && Qf(t.ownerDocument.body);
      l = n;
    } while (l);
    Gn(e);
  }
  function nh(t, e) {
    var l = t;
    t = 0;
    do {
      var a = l.nextSibling;
      if (l.nodeType === 1 ? e ? (l._stashedDisplay = l.style.display, l.style.display = "none") : (l.style.display = l._stashedDisplay || "", l.getAttribute("style") === "" && l.removeAttribute("style")) : l.nodeType === 3 && (e ? (l._stashedText = l.nodeValue, l.nodeValue = "") : l.nodeValue = l._stashedText || ""), a && a.nodeType === 8)
        if (l = a.data, l === "/$") {
          if (t === 0) break;
          t--;
        } else
          l !== "$" && l !== "$?" && l !== "$~" && l !== "$!" || t++;
      l = a;
    } while (l);
  }
  function uh(t, e, l) {
    if (e = CSS.escape(e) !== e ? "r-" + btoa(e).replace(/=/g, "") : e, t.style.viewTransitionName = e, l != null && (t.style.viewTransitionClass = l), l = getComputedStyle(t), l.display === "inline") {
      if (e = t.getClientRects(), e.length === 1) var a = 1;
      else
        for (var n = a = 0; n < e.length; n++) {
          var u = e[n];
          0 < u.width && 0 < u.height && a++;
        }
      a === 1 && (t = t.style, t.display = e.length === 1 ? "inline-block" : "block", t.marginTop = "-" + l.paddingTop, t.marginBottom = "-" + l.paddingBottom);
    }
  }
  function ih(t, e) {
    t = t.style, e = e.style;
    var l = e != null ? e.hasOwnProperty("viewTransitionName") ? e.viewTransitionName : e.hasOwnProperty("view-transition-name") ? e["view-transition-name"] : null : null;
    t.viewTransitionName = l == null || typeof l == "boolean" ? "" : ("" + l).trim(), l = e != null ? e.hasOwnProperty("viewTransitionClass") ? e.viewTransitionClass : e.hasOwnProperty("view-transition-class") ? e["view-transition-class"] : null : null, t.viewTransitionClass = l == null || typeof l == "boolean" ? "" : ("" + l).trim(), t.display === "inline-block" && (e == null ? t.display = t.margin = "" : (l = e.display, t.display = l == null || typeof l == "boolean" ? "" : l, l = e.margin, l != null ? t.margin = l : (l = e.hasOwnProperty("marginTop") ? e.marginTop : e["margin-top"], t.marginTop = l == null || typeof l == "boolean" ? "" : l, e = e.hasOwnProperty("marginBottom") ? e.marginBottom : e["margin-bottom"], t.marginBottom = e == null || typeof e == "boolean" ? "" : e)));
  }
  function Oy(t, e, l) {
    return l = l.ownerDocument.defaultView, {
      rect: t,
      abs: e.position === "absolute" || e.position === "fixed",
      clip: e.clipPath !== "none" || e.overflow !== "visible" || e.filter !== "none" || e.mask !== "none" || e.mask !== "none" || e.borderRadius !== "0px",
      view: 0 <= t.bottom && 0 <= t.right && t.top <= l.innerHeight && t.left <= l.innerWidth
    };
  }
  function Bf(t) {
    var e = t.getBoundingClientRect(), l = getComputedStyle(t);
    return Oy(e, l, t);
  }
  function zy(t) {
    return t.documentElement.clientHeight;
  }
  function Ay(t) {
    this.addEventListener("load", t), this.addEventListener("error", t);
  }
  function Cy(t, e, l, a, n, u, i, r, m) {
    var _ = e.nodeType === 9 ? e : e.ownerDocument;
    try {
      var M = _.startViewTransition({
        update: function() {
          var p = _.defaultView, N = p.navigation && p.navigation.transition, X = _.fonts.status;
          a();
          var F = [];
          if (X === "loaded" && (zy(_), _.fonts.status === "loading" && F.push(_.fonts.ready)), X = F.length, t !== null)
            for (var gt = t.suspenseyImages, S = 0, y = 0; y < gt.length; y++) {
              var T = gt[y];
              if (!T.complete) {
                var D = T.getBoundingClientRect();
                if (0 < D.bottom && 0 < D.right && D.top < p.innerHeight && D.left < p.innerWidth) {
                  if (S += Oh(T), S > rc) {
                    F.length = X;
                    break;
                  }
                  T = new Promise(
                    Ay.bind(T)
                  ), F.push(T);
                }
              }
            }
          if (0 < F.length)
            return p = Promise.race([
              Promise.all(F),
              new Promise(function(K) {
                return setTimeout(K, 500);
              })
            ]).then(n, n), (N ? Promise.allSettled([N.finished, p]) : p).then(u, u);
          if (n(), N)
            return N.finished.then(
              u,
              u
            );
          u();
        },
        types: l
      });
      _.__reactViewTransition = M;
      var U = [];
      return M.ready.then(
        function() {
          for (var p = _.documentElement.getAnimations({
            subtree: !0
          }), N = 0; N < p.length; N++) {
            var X = p[N], F = X.effect, gt = F.pseudoElement;
            if (gt != null && gt.startsWith("::view-transition")) {
              U.push(X), X = F.getKeyframes();
              for (var S = gt = void 0, y = !0, T = 0; T < X.length; T++) {
                var D = X[T], K = D.width;
                if (gt === void 0) gt = K;
                else if (gt !== K) {
                  y = !1;
                  break;
                }
                if (K = D.height, S === void 0) S = K;
                else if (S !== K) {
                  y = !1;
                  break;
                }
                delete D.width, delete D.height, D.transform === "none" && delete D.transform;
              }
              y && gt !== void 0 && S !== void 0 && (F.setKeyframes(X), y = getComputedStyle(
                F.target,
                F.pseudoElement
              ), y.width !== gt || y.height !== S) && (y = X[0], y.width = gt, y.height = S, y = X[X.length - 1], y.width = gt, y.height = S, F.setKeyframes(X));
            }
          }
          i();
        },
        function(p) {
          _.__reactViewTransition === M && (_.__reactViewTransition = null);
          try {
            typeof p == "object" && p !== null && p.name === "InvalidStateError" && (p.message === "View transition was skipped because document visibility state is hidden." || p.message === "Skipping view transition because document visibility state has become hidden." || p.message === "Skipping view transition because viewport size changed." || p.message === "Transition was aborted because of invalid state") && (p = null), p !== null && m(p);
          } finally {
            a(), n(), i();
          }
        }
      ), M.finished.finally(function() {
        for (var p = 0; p < U.length; p++)
          U[p].cancel();
        _.__reactViewTransition === M && (_.__reactViewTransition = null), r();
      }), M;
    } catch {
      return a(), n(), i(), null;
    }
  }
  function Qa(t, e) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + t + "(" + e + ")";
  }
  Qa.prototype.animate = function(t, e) {
    return e = typeof e == "number" ? { duration: e } : P({}, e), e.pseudoElement = this._selector, this._scope.animate(t, e);
  }, Qa.prototype.getAnimations = function() {
    for (var t = this._scope, e = this._selector, l = t.getAnimations({ subtree: !0 }), a = [], n = 0; n < l.length; n++) {
      var u = l[n].effect;
      u !== null && u.target === t && u.pseudoElement === e && a.push(l[n]);
    }
    return a;
  }, Qa.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function ch(t) {
    return {
      name: t,
      group: new Qa("group", t),
      imagePair: new Qa("image-pair", t),
      old: new Qa("old", t),
      new: new Qa("new", t)
    };
  }
  function Ie(t) {
    this._fragmentFiber = t, this._observers = this._eventListeners = null;
  }
  Ie.prototype.addEventListener = function(t, e, l) {
    var a = null, n = null;
    if (!(l != null && typeof l != "boolean" && (a = l.signal || null, a !== null && a.aborted))) {
      this._eventListeners === null && (this._eventListeners = []);
      var u = this._eventListeners;
      if (fh(u, t, e, l) === -1) {
        var i = this, r = e;
        l != null && typeof l != "boolean" && l.once === !0 && (r = function(m) {
          i.removeEventListener(
            t,
            e,
            l
          ), typeof e == "function" ? e.call(this, m) : e.handleEvent(m);
        }), a !== null && (n = i.removeEventListener.bind(
          i,
          t,
          e,
          l
        ), a.addEventListener("abort", n, { once: !0 }), n = a.removeEventListener.bind(a, "abort", n)), a = wn(l), u.push({
          type: t,
          listener: e,
          optionsOrUseCapture: l,
          attachedListener: r,
          cleanup: n
        }), h(
          this._fragmentFiber.child,
          !1,
          jy,
          t,
          r,
          a
        );
      }
      this._eventListeners = u;
    }
  };
  function jy(t, e, l, a) {
    return W(t).addEventListener(
      e,
      l,
      a
    ), !1;
  }
  Ie.prototype.removeEventListener = function(t, e, l) {
    var a = this._eventListeners;
    if (a !== null && (e = fh(
      a,
      t,
      e,
      l
    ), e !== -1)) {
      var n = a[e];
      l = n.attachedListener;
      var u = n.cleanup;
      n = wn(n.optionsOrUseCapture), h(
        this._fragmentFiber.child,
        !1,
        Ry,
        t,
        l,
        n
      ), a.splice(e, 1), u !== null && u();
    }
  };
  function Ry(t, e, l, a) {
    return W(t).removeEventListener(
      e,
      l,
      a
    ), !1;
  }
  function wn(t) {
    return t != null && typeof t != "boolean" && (t.once === !0 || t.signal instanceof AbortSignal) ? { capture: t.capture, passive: t.passive } : t;
  }
  function sh(t) {
    return t == null ? "c=0" : typeof t == "boolean" ? "c=" + (t ? "1" : "0") : "c=" + (t.capture ? "1" : "0");
  }
  function fh(t, e, l, a) {
    if (t.length === 0) return -1;
    a = sh(a);
    for (var n = 0; n < t.length; n++) {
      var u = t[n];
      if (u.type === e && u.listener === l && sh(u.optionsOrUseCapture) === a)
        return n;
    }
    return -1;
  }
  Ie.prototype.dispatchEvent = function(t) {
    var e = A(
      this._fragmentFiber
    );
    if (e === null) return !0;
    e = W(e);
    var l = this._eventListeners;
    if (l !== null && 0 < l.length || !t.bubbles) {
      var a = e.nodeType === 9 ? e.createComment("") : document.createTextNode("");
      if (l)
        for (var n = 0; n < l.length; n++) {
          var u = l[n];
          a.addEventListener(
            u.type,
            u.attachedListener,
            wn(u.optionsOrUseCapture)
          );
        }
      if (e.appendChild(a), t = a.dispatchEvent(t), l)
        for (n = 0; n < l.length; n++)
          u = l[n], a.removeEventListener(
            u.type,
            u.attachedListener,
            wn(u.optionsOrUseCapture)
          );
      return e.removeChild(a), t;
    }
    return e.dispatchEvent(t);
  }, Ie.prototype.focus = function(t) {
    h(
      this._fragmentFiber.child,
      !0,
      rh,
      t,
      void 0,
      void 0
    );
  };
  function rh(t, e) {
    return t.tag === 6 ? !1 : (t = W(t), Vy(t, e));
  }
  Ie.prototype.focusLast = function(t) {
    var e = [];
    h(
      this._fragmentFiber.child,
      !0,
      Hf,
      e,
      void 0,
      void 0
    );
    for (var l = e.length - 1; 0 <= l && !rh(e[l], t); l--) ;
  };
  function Hf(t, e) {
    return e.push(t), !1;
  }
  Ie.prototype.blur = function() {
    var t = A(
      this._fragmentFiber
    );
    t !== null && (t = W(t), t = Cu(t).activeElement, t !== null && h(
      this._fragmentFiber.child,
      !1,
      Dy,
      t,
      void 0,
      void 0
    ));
  };
  function Dy(t, e) {
    return t.tag === 6 ? !1 : (t = W(t), t === e || t.contains(e) ? (e.blur(), !0) : !1);
  }
  Ie.prototype.observeUsing = function(t) {
    this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(t), h(
      this._fragmentFiber.child,
      !1,
      Uy,
      t,
      void 0,
      void 0
    );
  };
  function Uy(t, e) {
    return t.tag === 6 || (t = W(t), e.observe(t)), !1;
  }
  Ie.prototype.unobserveUsing = function(t) {
    var e = this._observers;
    if (e !== null && e.has(t)) {
      e.delete(t), h(
        this._fragmentFiber.child,
        !1,
        wy,
        t,
        void 0,
        void 0
      );
      for (var l = e = 0; l < hl.length; l++) {
        var a = hl[l];
        a.fragmentInstance === this && a.observer === t ? t.unobserve(a.instance) : hl[e++] = a;
      }
      hl.length = e;
    }
  };
  function wy(t, e) {
    return t.tag === 6 || (t = W(t), e.unobserve(t)), !1;
  }
  var hl = [], Lf = !1;
  function By(t, e, l) {
    hl.push({
      fragmentInstance: t,
      observer: e,
      instance: l
    }), Lf || (Lf = !0, Zy(function() {
      Lf = !1;
      var a = hl;
      hl = [];
      for (var n = 0; n < a.length; n++) {
        var u = a[n];
        u.observer.unobserve(u.instance);
      }
    }));
  }
  Ie.prototype.getClientRects = function() {
    var t = [];
    return h(
      this._fragmentFiber.child,
      !1,
      Hy,
      t,
      void 0,
      void 0
    ), t;
  };
  function Hy(t, e) {
    if (t.tag === 6) {
      t = t.stateNode;
      var l = t.ownerDocument.createRange();
      l.selectNodeContents(t), e.push.apply(e, l.getClientRects());
    } else
      t = W(t), e.push.apply(e, t.getClientRects());
    return !1;
  }
  Ie.prototype.getRootNode = function(t) {
    var e = A(
      this._fragmentFiber
    );
    return e === null ? this : W(e).getRootNode(t);
  }, Ie.prototype.compareDocumentPosition = function(t) {
    var e = A(
      this._fragmentFiber
    );
    if (e === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var l = [];
    h(
      this._fragmentFiber.child,
      !1,
      Hf,
      l,
      void 0,
      void 0
    );
    var a = W(e);
    if (l.length === 0) {
      if (l = a, L(this._fragmentFiber)) {
        t: {
          for (e = this._fragmentFiber.return; e !== null; ) {
            if (e.tag === 4) {
              e = e.stateNode.containerInfo;
              break t;
            }
            if (e.tag === 3 || e.tag === 5 || e.tag === 27)
              break;
            e = e.return;
          }
          e = null;
        }
        e != null && (l = e);
      }
      e = this._fragmentFiber;
      var n = a = l.compareDocumentPosition(t);
      return l === t ? n = Node.DOCUMENT_POSITION_CONTAINS : a & Node.DOCUMENT_POSITION_CONTAINED_BY && (l = Z(e)[1], l === null ? n = Node.DOCUMENT_POSITION_PRECEDING : (t = W(l).compareDocumentPosition(
        t
      ), n = t === 0 || t & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), n |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    e = W(l[0]), n = W(l[l.length - 1]);
    var u = L(this._fragmentFiber) ? e.parentElement : a;
    if (u == null)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    a = u.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_CONTAINED_BY, u = u.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var i = e.compareDocumentPosition(t), r = n.compareDocumentPosition(t), m = i & Node.DOCUMENT_POSITION_CONTAINED_BY || r & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return r = a && u && i & Node.DOCUMENT_POSITION_FOLLOWING && r & Node.DOCUMENT_POSITION_PRECEDING, e = a && e === t || u && n === t || m || r ? Node.DOCUMENT_POSITION_CONTAINED_BY : !a && e === t || !u && n === t ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : i, e & Node.DOCUMENT_POSITION_DISCONNECTED || e & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || Ly(
      e,
      this._fragmentFiber,
      l[0],
      l[l.length - 1],
      t
    ) ? e : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function Ly(t, e, l, a, n) {
    var u = Ea(n);
    if (t & Node.DOCUMENT_POSITION_CONTAINED_BY) {
      if (l = !!u)
        t: {
          for (; u !== null; ) {
            if (u.tag === 7 && (u === e || u.alternate === e)) {
              l = !0;
              break t;
            }
            u = u.return;
          }
          l = !1;
        }
      return l;
    }
    if (t & Node.DOCUMENT_POSITION_CONTAINS) {
      if (u === null)
        return u = n.ownerDocument, n === u || n === u.documentElement || n === u.body;
      t: {
        for (u = e, e = A(e); u !== null; ) {
          if (!(u.tag !== 5 && u.tag !== 3 && u.tag !== 27 || u !== e && u.alternate !== e)) {
            u = !0;
            break t;
          }
          u = u.return;
        }
        u = !1;
      }
      return u;
    }
    return t & Node.DOCUMENT_POSITION_PRECEDING ? ((e = !!u) && !(e = u === l) && (e = zt(
      l,
      u,
      Ut
    ), e === null ? e = !1 : (h(
      e,
      !0,
      Mt,
      u,
      l
    ), u = Et, Et = null, e = u !== null)), e) : t & Node.DOCUMENT_POSITION_FOLLOWING ? ((e = !!u) && !(e = u === a) && (e = zt(
      a,
      u,
      Ut
    ), e === null ? e = !1 : (h(
      e,
      !0,
      Vt,
      u,
      a
    ), u = Et, ct = Et = null, e = u !== null)), e) : !1;
  }
  function oh(t, e) {
    var l = t.ownerDocument.createRange();
    l.selectNodeContents(t), t = l.getBoundingClientRect(), window.scrollTo(
      window.scrollX + t.left,
      e ? window.scrollY + t.top : window.scrollY + t.bottom - window.innerHeight
    );
  }
  Ie.prototype.scrollIntoView = function(t) {
    if (typeof t == "object") throw Error(s(566));
    var e = [];
    h(
      this._fragmentFiber.child,
      !1,
      Hf,
      e,
      void 0,
      void 0
    );
    var l = t !== !1;
    if (e.length === 0) {
      var a = Z(
        this._fragmentFiber
      );
      if (a = l ? a[1] || a[0] || A(this._fragmentFiber) : a[0] || a[1], a === null) return;
      if (a.tag === 6) {
        t = W(a), oh(t, l);
        return;
      }
      if (a = W(a), a.nodeType !== 9) {
        if (a.nodeType === 11) {
          l = "host" in a ? a.host : null, l !== null && l.scrollIntoView(t);
          return;
        }
        a.scrollIntoView(t);
      }
    }
    for (a = l ? e.length - 1 : 0; a !== (l ? -1 : e.length); ) {
      var n = e[a];
      n.tag === 6 ? (n = W(n), oh(n, l)) : W(n).scrollIntoView(t), a += l ? -1 : 1;
    }
  };
  function Yy(t, e) {
    return t = W(t), dh(t, e), !1;
  }
  function dh(t, e) {
    t.reactFragments == null && (t.reactFragments = /* @__PURE__ */ new Set()), t.reactFragments.add(e);
  }
  function mh(t, e) {
    var l = e._eventListeners;
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var n = l[a];
        t.addEventListener(
          n.type,
          n.attachedListener,
          wn(n.optionsOrUseCapture)
        );
      }
    t.nodeType !== 3 && (l = e._observers, l !== null && l.forEach(function(u) {
      for (var i = 0, r = 0; r < hl.length; r++) {
        var m = hl[r];
        (m.fragmentInstance !== e || m.observer !== u || m.instance !== t) && (hl[i++] = m);
      }
      hl.length = i, u.observe(t);
    }), dh(t, e));
  }
  function qy(t, e) {
    var l = e._eventListeners;
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var n = l[a];
        t.removeEventListener(
          n.type,
          n.attachedListener,
          wn(n.optionsOrUseCapture)
        );
      }
    t.nodeType !== 3 && (l = e._observers, l !== null && l.forEach(function(u) {
      typeof u.rootMargin == "string" ? By(
        e,
        u,
        t
      ) : u.unobserve(t);
    }), t.reactFragments != null && t.reactFragments.delete(e));
  }
  function Yf(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var l = e;
      switch (e = e.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Yf(l), Iu(l);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (l.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(l);
    }
  }
  function Gy(t, e, l, a) {
    for (; t.nodeType === 1; ) {
      var n = l;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!a && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (a) {
        if (!t[$n])
          switch (e) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (u = t.getAttribute("rel"), u === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (u !== n.rel || t.getAttribute("href") !== (n.href == null || n.href === "" ? null : n.href) || t.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin) || t.getAttribute("title") !== (n.title == null ? null : n.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (u = t.getAttribute("src"), (u !== (n.src == null ? null : n.src) || t.getAttribute("type") !== (n.type == null ? null : n.type) || t.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin)) && u && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (e === "input" && t.type === "hidden") {
        var u = n.name == null ? null : "" + n.name;
        if (n.type === "hidden" && t.getAttribute("name") === u)
          return t;
      } else return t;
      if (t = il(t.nextSibling), t === null) break;
    }
    return null;
  }
  function Xy(t, e, l) {
    if (e === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l || (t = il(t.nextSibling), t === null)) return null;
    return t;
  }
  function hh(t, e) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = il(t.nextSibling), t === null)) return null;
    return t;
  }
  function qf(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Gf(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function Qy(t, e) {
    var l = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = e;
    else if (t.data !== "$?" || l.readyState !== "loading")
      e();
    else {
      var a = function() {
        e(), l.removeEventListener("DOMContentLoaded", a);
      };
      l.addEventListener("DOMContentLoaded", a), t._reactRetry = a;
    }
  }
  function il(t) {
    for (; t != null; t = t.nextSibling) {
      var e = t.nodeType;
      if (e === 1 || e === 3) break;
      if (e === 8) {
        if (e = t.data, e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&" || e === "F!" || e === "F")
          break;
        if (e === "/$" || e === "/&") return null;
      }
    }
    return t;
  }
  var Xf = null;
  function vh(t) {
    t = t.nextSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var l = t.data;
        if (l === "/$" || l === "/&") {
          if (e === 0)
            return il(t.nextSibling);
          e--;
        } else
          l !== "$" && l !== "$!" && l !== "$?" && l !== "$~" && l !== "&" || e++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function yh(t) {
    t = t.previousSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var l = t.data;
        if (l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&") {
          if (e === 0) return t;
          e--;
        } else l !== "/$" && l !== "/&" || e++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function Vy(t, e) {
    function l() {
      a = !0;
    }
    if (t.ownerDocument.activeElement === t) return !0;
    var a = !1;
    try {
      t.ownerDocument.addEventListener("focus", l, !0), (t.focus || HTMLElement.prototype.focus).call(t, e);
    } finally {
      t.ownerDocument.removeEventListener("focus", l, !0);
    }
    return a;
  }
  function Zy(t) {
    lh(function() {
      lh(function(e) {
        return t(e);
      });
    });
  }
  function gh(t, e, l) {
    switch (e = Cu(l), t) {
      case "html":
        if (t = e.documentElement, !t) throw Error(s(452));
        return t;
      case "head":
        if (t = e.head, !t) throw Error(s(453));
        return t;
      case "body":
        if (t = e.body, !t) throw Error(s(454));
        return t;
      default:
        throw Error(s(451));
    }
  }
  function bh(t, e, l) {
    for (var a in l) {
      var n = l[a];
      l.hasOwnProperty(a) && n != null && Ht(t, e, a, null, Sy, n);
    }
    l.dangerouslySetInnerHTML != null && (t.textContent = ""), t.onclick === yl && (t.onclick = null), Iu(t);
  }
  function Qf(t) {
    for (var e = t.attributes; e.length; )
      t.removeAttributeNode(e[0]);
    Iu(t);
  }
  var cl = /* @__PURE__ */ new Map(), ph = /* @__PURE__ */ new Set();
  function ju(t) {
    if (typeof t.getRootNode == "function") {
      var e = t.getRootNode();
      if (e.nodeType === 9 || e.nodeType === 11) return e;
    }
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  var Ql = k.d;
  k.d = {
    f: Ky,
    r: Jy,
    D: $y,
    C: Fy,
    L: ky,
    m: Wy,
    X: Py,
    S: Iy,
    M: tg
  };
  function Ky() {
    var t = Ql.f(), e = ec();
    return t || e;
  }
  function Jy(t) {
    var e = Pa(t);
    e !== null && e.tag === 5 && e.type === "form" ? _d(e) : Ql.r(t);
  }
  var Bn = typeof document > "u" ? null : document;
  function Sh(t, e, l) {
    var a = Bn;
    if (a && typeof e == "string" && e) {
      var n = Pe(e);
      n = 'link[rel="' + t + '"][href="' + n + '"]', typeof l == "string" && (n += '[crossorigin="' + l + '"]'), ph.has(n) || (ph.add(n), t = { rel: t, crossOrigin: l, href: e }, a.querySelector(n) === null && (e = a.createElement("link"), xe(e, "link", t), ye(e), a.head.appendChild(e)));
    }
  }
  function $y(t) {
    Ql.D(t), Sh("dns-prefetch", t, null);
  }
  function Fy(t, e) {
    Ql.C(t, e), Sh("preconnect", t, e);
  }
  function ky(t, e, l) {
    Ql.L(t, e, l);
    var a = Bn;
    if (a && t && e) {
      var n = 'link[rel="preload"][as="' + Pe(e) + '"]';
      e === "image" && l && l.imageSrcSet ? (n += '[imagesrcset="' + Pe(
        l.imageSrcSet
      ) + '"]', typeof l.imageSizes == "string" && (n += '[imagesizes="' + Pe(
        l.imageSizes
      ) + '"]')) : n += '[href="' + Pe(t) + '"]';
      var u = n;
      switch (e) {
        case "style":
          u = Hn(t);
          break;
        case "script":
          u = Ln(t);
      }
      if (!(cl.has(u) || (t = P(
        {
          rel: "preload",
          href: e === "image" && l && l.imageSrcSet ? void 0 : t,
          as: e
        },
        l
      ), cl.set(u, t), a.querySelector(n) !== null || e === "style" && a.querySelector(Ru(u)) || e === "script" && a.querySelector(Du(u))))) {
        var i = a.createElement("link");
        xe(i, "link", t), e === "style" && (i[Wu] = !0, i.onload = i.onerror = function() {
          Rr(i);
        }), ye(i), a.head.appendChild(i);
      }
    }
  }
  function Wy(t, e) {
    Ql.m(t, e);
    var l = Bn;
    if (l && t) {
      var a = e && typeof e.as == "string" ? e.as : "script", n = 'link[rel="modulepreload"][as="' + Pe(a) + '"][href="' + Pe(t) + '"]', u = n;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = Ln(t);
      }
      if (!cl.has(u) && (t = P({ rel: "modulepreload", href: t }, e), cl.set(u, t), l.querySelector(n) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(Du(u)))
              return;
        }
        a = l.createElement("link"), xe(a, "link", t), ye(a), l.head.appendChild(a);
      }
    }
  }
  function Iy(t, e, l) {
    Ql.S(t, e, l);
    var a = Bn;
    if (a && t) {
      var n = tn(a).hoistableStyles, u = Hn(t);
      e = e || "default";
      var i = n.get(u);
      if (!i) {
        var r = { loading: 0, preload: null };
        if (i = a.querySelector(
          Ru(u)
        ))
          r.loading = 5;
        else {
          t = P(
            { rel: "stylesheet", href: t, "data-precedence": e },
            l
          ), (l = cl.get(u)) && Vf(t, l);
          var m = i = a.createElement("link");
          ye(m), xe(m, "link", t), m._p = new Promise(function(_, M) {
            m.onload = _, m.onerror = M;
          }), m.addEventListener("load", function() {
            r.loading |= 1;
          }), m.addEventListener("error", function() {
            r.loading |= 2;
          }), r.loading |= 4, sc(i, e, a);
        }
        i = {
          type: "stylesheet",
          instance: i,
          count: 1,
          state: r
        }, n.set(u, i);
      }
    }
  }
  function Py(t, e) {
    Ql.X(t, e);
    var l = Bn;
    if (l && t) {
      var a = tn(l).hoistableScripts, n = Ln(t), u = a.get(n);
      u || (u = l.querySelector(Du(n)), u || (t = P({ src: t, async: !0 }, e), (e = cl.get(n)) && Zf(t, e), u = l.createElement("script"), ye(u), xe(u, "link", t), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function tg(t, e) {
    Ql.M(t, e);
    var l = Bn;
    if (l && t) {
      var a = tn(l).hoistableScripts, n = Ln(t), u = a.get(n);
      u || (u = l.querySelector(Du(n)), u || (t = P({ src: t, async: !0, type: "module" }, e), (e = cl.get(n)) && Zf(t, e), u = l.createElement("script"), ye(u), xe(u, "link", t), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function _h(t, e, l, a) {
    var n = (n = de.current) ? ju(n) : null;
    if (!n) throw Error(s(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string" ? (l = Hn(l.href), e = tn(
          n
        ).hoistableStyles, a = e.get(l), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, e.set(l, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          t = Hn(l.href);
          var u = tn(
            n
          ).hoistableStyles, i = u.get(t);
          if (i || (n = n.ownerDocument || n, i = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(t, i), (u = n.querySelector(
            Ru(t)
          )) ? u._p || (i.instance = u, i.state.loading = 5) : (u = cl.get(t), u || (u = {
            rel: "preload",
            as: "style",
            href: l.href,
            crossOrigin: l.crossOrigin,
            integrity: l.integrity,
            media: l.media,
            hrefLang: l.hrefLang,
            referrerPolicy: l.referrerPolicy
          }, cl.set(t, u)), eg(
            n,
            t,
            u,
            i.state
          ))), e && a === null)
            throw Error(s(528, ""));
          return i;
        }
        if (e && a !== null)
          throw Error(s(529, ""));
        return null;
      case "script":
        return e = l.async, l = l.src, typeof l == "string" && e && typeof e != "function" && typeof e != "symbol" ? (l = Ln(l), e = tn(
          n
        ).hoistableScripts, a = e.get(l), a || (a = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, e.set(l, a)), a) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(s(444, t));
    }
  }
  function Hn(t) {
    return 'href="' + Pe(t) + '"';
  }
  function Ru(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function Eh(t) {
    return P({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function eg(t, e, l, a) {
    if (e = t.querySelector(
      'link[rel="preload"][as="style"][' + e + "]"
    )) {
      if (e[Wu] !== !0) {
        a.loading = 1;
        return;
      }
    } else
      e = t.createElement("link"), e[Wu] = !0, e.onload = e.onerror = Rr.bind(null, e), xe(e, "link", l), ye(e), t.head.appendChild(e);
    a.preload = e, e.addEventListener("load", function() {
      return a.loading |= 1;
    }), e.addEventListener("error", function() {
      return a.loading |= 2;
    });
  }
  function Ln(t) {
    return '[src="' + Pe(t) + '"]';
  }
  function Du(t) {
    return "script[async]" + t;
  }
  function Th(t, e, l) {
    if (e.count++, e.instance === null)
      switch (e.type) {
        case "style":
          var a = t.querySelector(
            'style[data-href~="' + Pe(l.href) + '"]'
          );
          if (a)
            return e.instance = a, ye(a), a;
          var n = P({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          return a = (t.ownerDocument || t).createElement(
            "style"
          ), ye(a), xe(a, "style", n), sc(a, l.precedence, t), e.instance = a;
        case "stylesheet":
          n = Hn(l.href);
          var u = t.querySelector(
            Ru(n)
          );
          if (u)
            return e.state.loading |= 4, e.instance = u, ye(u), u;
          a = Eh(l), (n = cl.get(n)) && Vf(a, n), u = (t.ownerDocument || t).createElement("link"), ye(u);
          var i = u;
          return i._p = new Promise(function(r, m) {
            i.onload = r, i.onerror = m;
          }), xe(u, "link", a), e.state.loading |= 4, sc(u, l.precedence, t), e.instance = u;
        case "script":
          return u = Ln(l.src), (n = t.querySelector(
            Du(u)
          )) ? (e.instance = n, ye(n), n) : (a = l, (n = cl.get(u)) && (a = P({}, l), Zf(a, n)), t = t.ownerDocument || t, n = t.createElement("script"), ye(n), xe(n, "link", a), t.head.appendChild(n), e.instance = n);
        case "void":
          return null;
        default:
          throw Error(s(443, e.type));
      }
    else
      e.type === "stylesheet" && (e.state.loading & 4) === 0 && (a = e.instance, e.state.loading |= 4, sc(a, l.precedence, t));
    return e.instance;
  }
  function sc(t, e, l) {
    for (var a = l.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), n = a.length ? a[a.length - 1] : null, u = n, i = 0; i < a.length; i++) {
      var r = a[i];
      if (r.dataset.precedence === e) u = r;
      else if (u !== n) break;
    }
    u ? u.parentNode.insertBefore(t, u.nextSibling) : (e = l.nodeType === 9 ? l.head : l, e.insertBefore(t, e.firstChild));
  }
  function Vf(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.title == null && (t.title = e.title);
  }
  function Zf(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.integrity == null && (t.integrity = e.integrity);
  }
  var fc = null;
  function Nh(t, e, l) {
    if (fc === null) {
      var a = /* @__PURE__ */ new Map(), n = fc = /* @__PURE__ */ new Map();
      n.set(l, a);
    } else
      n = fc, a = n.get(l), a || (a = /* @__PURE__ */ new Map(), n.set(l, a));
    if (a.has(t)) return a;
    for (a.set(t, null), l = l.getElementsByTagName(t), n = 0; n < l.length; n++) {
      var u = l[n];
      if (!(u[$n] || u[Se] || t === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var i = u.getAttribute(e) || "";
        i = t + i;
        var r = a.get(i);
        r ? r.push(u) : a.set(i, [u]);
      }
    }
    return a;
  }
  function Kf(t, e, l) {
    t = t.ownerDocument || t, t.head.insertBefore(
      l,
      e === "title" ? t.querySelector("head > title") : null
    );
  }
  function lg(t, e, l) {
    if (l === 1 || e.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof e.precedence != "string" || typeof e.href != "string" || e.href === "")
          break;
        return !0;
      case "link":
        if (typeof e.rel != "string" || typeof e.href != "string" || e.href === "" || e.onLoad || e.onError)
          break;
        return e.rel === "stylesheet" ? (t = e.disabled, typeof e.precedence == "string" && t == null) : !0;
      case "script":
        if (e.async && typeof e.async != "function" && typeof e.async != "symbol" && !e.onLoad && !e.onError && e.src && typeof e.src == "string")
          return !0;
    }
    return !1;
  }
  function xh(t, e) {
    return t === "img" && e.src != null && e.src !== "" && e.onLoad == null && e.loading !== "lazy";
  }
  function Mh(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function Oh(t) {
    return (t.width || 100) * (t.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
  }
  function zh(t, e) {
    typeof e.decode == "function" && (t.imgCount++, e.complete || (t.imgBytes += Oh(e), t.suspenseyImages.push(e)), t = ug.bind(t), e.decode().then(t, t));
  }
  function ag(t, e, l, a) {
    if (l.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var n = Hn(a.href), u = e.querySelector(
          Ru(n)
        );
        if (u) {
          e = u._p, e !== null && typeof e == "object" && typeof e.then == "function" && (t.count++, t = Uu.bind(t), e.then(t, t)), l.state.loading |= 4, l.instance = u, ye(u);
          return;
        }
        u = e.ownerDocument || e, a = Eh(a), (n = cl.get(n)) && Vf(a, n), u = u.createElement("link"), ye(u);
        var i = u;
        i._p = new Promise(function(r, m) {
          i.onload = r, i.onerror = m;
        }), xe(u, "link", a), l.instance = u;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(l, e), (e = l.state.preload) && (l.state.loading & 3) === 0 && (t.count++, l = Uu.bind(t), e.addEventListener("load", l), e.addEventListener("error", l));
    }
  }
  var rc = 0;
  function ng(t, e) {
    return t.stylesheets && t.count === 0 && dc(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(l) {
      var a = setTimeout(function() {
        if (t.stylesheets && dc(t, t.stylesheets), t.unsuspend) {
          var u = t.unsuspend;
          t.unsuspend = null, u();
        }
      }, 6e4 + e);
      0 < t.imgBytes && rc === 0 && (rc = 62500 * Ey());
      var n = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && dc(t, t.stylesheets), t.unsuspend)) {
            var u = t.unsuspend;
            t.unsuspend = null, u();
          }
        },
        (t.imgBytes > rc ? 50 : 800) + e
      );
      return t.unsuspend = l, function() {
        t.unsuspend = null, clearTimeout(a), clearTimeout(n);
      };
    } : null;
  }
  function Ah(t) {
    if (t.count === 0 && (t.imgCount === 0 || !t.waitingForImages)) {
      if (t.stylesheets) dc(t, t.stylesheets);
      else if (t.unsuspend) {
        var e = t.unsuspend;
        t.unsuspend = null, e();
      }
    }
  }
  function Uu() {
    this.count--, Ah(this);
  }
  function ug() {
    this.imgCount--, Ah(this);
  }
  var oc = null;
  function dc(t, e) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, oc = /* @__PURE__ */ new Map(), e.forEach(ig, t), oc = null, Uu.call(t));
  }
  function ig(t, e) {
    if (!(e.state.loading & 4)) {
      var l = oc.get(t);
      if (l) var a = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), oc.set(t, l);
        for (var n = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < n.length; u++) {
          var i = n[u];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (l.set(i.dataset.precedence, i), a = i);
        }
        a && l.set(null, a);
      }
      n = e.instance, i = n.getAttribute("data-precedence"), u = l.get(i) || a, u === a && l.set(null, n), l.set(i, n), this.count++, a = Uu.bind(this), n.addEventListener("load", a), n.addEventListener("error", a), u ? u.parentNode.insertBefore(n, u.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(n, t.firstChild)), e.state.loading |= 4;
    }
  }
  var Yn = {
    $$typeof: ot,
    Provider: null,
    Consumer: null,
    _currentValue: Kt,
    _currentValue2: Kt,
    _threadCount: 0
  };
  function cg(t, e, l, a, n, u, i, r, m) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = xc(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = xc(0), this.hiddenUpdates = xc(null), this.identifierPrefix = a, this.onUncaughtError = n, this.onCaughtError = u, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = m, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Ch(t, e, l, a, n, u, i, r, m, _, M, U) {
    return t = new cg(
      t,
      e,
      l,
      i,
      m,
      _,
      M,
      U,
      r
    ), e = 1, u === !0 && (e |= 24), u = Le(3, null, null, e), t.current = u, u.stateNode = t, e = is(), e.refCount++, t.pooledCache = e, e.refCount++, u.memoizedState = {
      element: a,
      isDehydrated: l,
      cache: e
    }, rs(u), t;
  }
  function jh(t) {
    return t ? (t = on, t) : on;
  }
  function Rh(t, e, l, a, n, u) {
    n = jh(n), a.context === null ? a.context = n : a.pendingContext = n, a = ta(e), a.payload = { element: l }, u = u === void 0 ? null : u, u !== null && (a.callback = u), l = ea(t, a, e), l !== null && (Xe(l, t, e), ou(l, t, e));
  }
  function Dh(t, e) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var l = t.retryLane;
      t.retryLane = l !== 0 && l < e ? l : e;
    }
  }
  function Jf(t, e) {
    Dh(t, e), (t = t.alternate) && Dh(t, e);
  }
  function Uh(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Ma(t, 67108864);
      e !== null && Xe(e, t, 67108864), Jf(t, 67108864);
    }
  }
  function wh(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = We();
      e = Mc(e);
      var l = Ma(t, e);
      l !== null && Xe(l, t, e), Jf(t, e);
    }
  }
  var qn = !0;
  function sg(t, e, l, a) {
    var n = V.T;
    V.T = null;
    var u = k.p;
    try {
      k.p = 2, $f(t, e, l, a);
    } finally {
      k.p = u, V.T = n;
    }
  }
  function fg(t, e, l, a) {
    var n = V.T;
    V.T = null;
    var u = k.p;
    try {
      k.p = 8, $f(t, e, l, a);
    } finally {
      k.p = u, V.T = n;
    }
  }
  function $f(t, e, l, a) {
    if (qn) {
      var n = Ff(a);
      if (n === null)
        Af(
          t,
          e,
          a,
          mc,
          l
        ), Hh(t, a);
      else if (og(
        n,
        t,
        e,
        l,
        a
      ))
        a.stopPropagation();
      else if (Hh(t, a), e & 4 && -1 < rg.indexOf(t)) {
        for (; n !== null; ) {
          var u = Pa(n);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var i = _a(u.pendingLanes);
                  if (i !== 0) {
                    var r = u;
                    for (r.pendingLanes |= 2, r.entangledLanes |= 2; i; ) {
                      var m = 1 << 31 - Ve(i);
                      r.entanglements[1] |= m, i &= ~m;
                    }
                    Ml(u), (Rt & 6) === 0 && (Ii = fe() + 500, Ou(0));
                  }
                }
                break;
              case 31:
              case 13:
                r = Ma(u, 2), r !== null && Xe(r, u, 2), ec(), Jf(u, 2);
            }
          if (u = Ff(a), u === null && Af(
            t,
            e,
            a,
            mc,
            l
          ), u === n) break;
          n = u;
        }
        n !== null && a.stopPropagation();
      } else
        Af(
          t,
          e,
          a,
          null,
          l
        );
    }
  }
  function Ff(t) {
    return t = Dc(t), kf(t);
  }
  var mc = null;
  function kf(t) {
    if (mc = null, t = Ea(t), t !== null) {
      var e = v(t);
      if (e === null) t = null;
      else {
        var l = e.tag;
        if (l === 13) {
          if (t = E(e), t !== null) return t;
          t = null;
        } else if (l === 31) {
          if (t = x(e), t !== null) return t;
          t = null;
        } else if (l === 3) {
          if (e.stateNode.current.memoizedState.isDehydrated)
            return e.tag === 3 ? e.stateNode.containerInfo : null;
          t = null;
        } else e !== t && (t = null);
      }
    }
    return mc = t, null;
  }
  function Bh(t) {
    switch (t) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "fullscreenerror":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "resize":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Sa()) {
          case Wa:
            return 2;
          case _r:
            return 8;
          case Ku:
          case T0:
            return 32;
          case Er:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Wf = !1, ma = null, ha = null, va = null, wu = /* @__PURE__ */ new Map(), Bu = /* @__PURE__ */ new Map(), ya = [], rg = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Hh(t, e) {
    switch (t) {
      case "focusin":
      case "focusout":
        ma = null;
        break;
      case "dragenter":
      case "dragleave":
        ha = null;
        break;
      case "mouseover":
      case "mouseout":
        va = null;
        break;
      case "pointerover":
      case "pointerout":
        wu.delete(e.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Bu.delete(e.pointerId);
    }
  }
  function Hu(t, e, l, a, n, u) {
    return t === null || t.nativeEvent !== u ? (t = {
      blockedOn: e,
      domEventName: l,
      eventSystemFlags: a,
      nativeEvent: u,
      targetContainers: [n]
    }, e !== null && (e = Pa(e), e !== null && Uh(e)), t) : (t.eventSystemFlags |= a, e = t.targetContainers, n !== null && e.indexOf(n) === -1 && e.push(n), t);
  }
  function og(t, e, l, a, n) {
    switch (e) {
      case "focusin":
        return ma = Hu(
          ma,
          t,
          e,
          l,
          a,
          n
        ), !0;
      case "dragenter":
        return ha = Hu(
          ha,
          t,
          e,
          l,
          a,
          n
        ), !0;
      case "mouseover":
        return va = Hu(
          va,
          t,
          e,
          l,
          a,
          n
        ), !0;
      case "pointerover":
        var u = n.pointerId;
        return wu.set(
          u,
          Hu(
            wu.get(u) || null,
            t,
            e,
            l,
            a,
            n
          )
        ), !0;
      case "gotpointercapture":
        return u = n.pointerId, Bu.set(
          u,
          Hu(
            Bu.get(u) || null,
            t,
            e,
            l,
            a,
            n
          )
        ), !0;
    }
    return !1;
  }
  function Lh(t) {
    var e = Ea(t.target);
    if (e !== null) {
      var l = v(e);
      if (l !== null) {
        if (e = l.tag, e === 13) {
          if (e = E(l), e !== null) {
            t.blockedOn = e, Ar(t.priority, function() {
              wh(l);
            });
            return;
          }
        } else if (e === 31) {
          if (e = x(l), e !== null) {
            t.blockedOn = e, Ar(t.priority, function() {
              wh(l);
            });
            return;
          }
        } else if (e === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function hc(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var l = Ff(t.nativeEvent);
      if (l === null) {
        l = t.nativeEvent;
        var a = new l.constructor(
          l.type,
          l
        );
        Rc = a, l.target.dispatchEvent(a), Rc = null;
      } else
        return e = Pa(l), e !== null && Uh(e), t.blockedOn = l, !1;
      e.shift();
    }
    return !0;
  }
  function Yh(t, e, l) {
    hc(t) && l.delete(e);
  }
  function dg() {
    Wf = !1, ma !== null && hc(ma) && (ma = null), ha !== null && hc(ha) && (ha = null), va !== null && hc(va) && (va = null), wu.forEach(Yh), Bu.forEach(Yh);
  }
  function vc(t, e) {
    t.blockedOn === e && (t.blockedOn = null, Wf || (Wf = !0, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      dg
    )));
  }
  var yc = null;
  function qh(t) {
    yc !== t && (yc = t, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      function() {
        yc === t && (yc = null);
        for (var e = 0; e < t.length; e += 3) {
          var l = t[e], a = t[e + 1], n = t[e + 2];
          if (typeof a != "function") {
            if (kf(a || l) === null)
              continue;
            break;
          }
          var u = Pa(l);
          u !== null && (t.splice(e, 3), e -= 3, js(
            u,
            {
              pending: !0,
              data: n,
              method: l.method,
              action: a
            },
            a,
            n
          ));
        }
      }
    ));
  }
  function Gn(t) {
    function e(m) {
      return vc(m, t);
    }
    ma !== null && vc(ma, t), ha !== null && vc(ha, t), va !== null && vc(va, t), wu.forEach(e), Bu.forEach(e);
    for (var l = 0; l < ya.length; l++) {
      var a = ya[l];
      a.blockedOn === t && (a.blockedOn = null);
    }
    for (; 0 < ya.length && (l = ya[0], l.blockedOn === null); )
      Lh(l), l.blockedOn === null && ya.shift();
    if (l = (t.ownerDocument || t).$$reactFormReplay, l != null)
      for (a = 0; a < l.length; a += 3) {
        var n = l[a], u = l[a + 1], i = n[He] || null;
        if (typeof u == "function")
          i || qh(l);
        else if (i) {
          var r = null;
          if (u && u.hasAttribute("formAction")) {
            if (n = u, i = u[He] || null)
              r = i.formAction;
            else if (kf(n) !== null) continue;
          } else r = i.action;
          typeof r == "function" ? l[a + 1] = r : (l.splice(a, 3), a -= 3), qh(l);
        }
      }
  }
  function Gh() {
    function t(u) {
      u.canIntercept && u.info === "react-transition" && u.intercept({
        handler: function() {
          return new Promise(function(i) {
            return n = i;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function e() {
      n !== null && (n(), n = null), a || setTimeout(l, 20);
    }
    function l() {
      if (!a && !navigation.transition) {
        var u = navigation.currentEntry;
        u && u.url != null && navigation.navigate(u.url, {
          state: u.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var a = !1, n = null;
      return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", e), navigation.addEventListener("navigateerror", e), setTimeout(l, 100), function() {
        a = !0, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", e), navigation.removeEventListener("navigateerror", e), n !== null && (n(), n = null);
      };
    }
  }
  function If(t) {
    this._internalRoot = t;
  }
  gc.prototype.render = If.prototype.render = function(t) {
    var e = this._internalRoot;
    if (e === null) throw Error(s(409));
    var l = e.current, a = We();
    Rh(l, a, t, e, null, null);
  }, gc.prototype.unmount = If.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var e = t.containerInfo;
      Rh(t.current, 2, null, t, null, null), ec(), e[Ia] = null;
    }
  };
  function gc(t) {
    this._internalRoot = t;
  }
  gc.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var e = zr();
      t = { blockedOn: null, target: t, priority: e };
      for (var l = 0; l < ya.length && e !== 0 && e < ya[l].priority; l++) ;
      ya.splice(l, 0, t), l === 0 && Lh(t);
    }
  };
  var Xh = o.version;
  if (Xh !== "19.3.0")
    throw Error(
      s(
        527,
        Xh,
        "19.3.0"
      )
    );
  k.findDOMNode = function(t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function" ? Error(s(188)) : (t = Object.keys(t).join(","), Error(s(268, t)));
    return t = w(e), t = t !== null ? z(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var mg = {
    bundleType: 0,
    version: "19.3.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: V,
    reconcilerVersion: "19.3.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var bc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!bc.isDisabled && bc.supportsFiber)
      try {
        Zn = bc.inject(
          mg
        ), Qe = bc;
      } catch {
      }
  }
  return Yu.createRoot = function(t, e) {
    if (!b(t)) throw Error(s(299));
    var l = !1, a = "", n = jd, u = Rd, i = Dd;
    return e != null && (e.unstable_strictMode === !0 && (l = !0), e.identifierPrefix !== void 0 && (a = e.identifierPrefix), e.onUncaughtError !== void 0 && (n = e.onUncaughtError), e.onCaughtError !== void 0 && (u = e.onCaughtError), e.onRecoverableError !== void 0 && (i = e.onRecoverableError)), e = Ch(
      t,
      1,
      !1,
      null,
      null,
      l,
      a,
      null,
      n,
      u,
      i,
      Gh
    ), t[Ia] = e.current, zf(t), new If(e);
  }, Yu.hydrateRoot = function(t, e, l) {
    if (!b(t)) throw Error(s(299));
    var a = !1, n = "", u = jd, i = Rd, r = Dd, m = null;
    return l != null && (l.unstable_strictMode === !0 && (a = !0), l.identifierPrefix !== void 0 && (n = l.identifierPrefix), l.onUncaughtError !== void 0 && (u = l.onUncaughtError), l.onCaughtError !== void 0 && (i = l.onCaughtError), l.onRecoverableError !== void 0 && (r = l.onRecoverableError), l.formState !== void 0 && (m = l.formState)), e = Ch(
      t,
      1,
      !0,
      e,
      l ?? null,
      a,
      n,
      m,
      u,
      i,
      r,
      Gh
    ), e.context = jh(null), l = e.current, a = We(), a = Mc(a), n = ta(a), n.callback = null, ea(l, n, a), l = a, e.current.lanes = l, Jn(e, l), Ml(e), t[Ia] = e.current, zf(t), new gc(e);
  }, Yu.version = "19.3.0", Yu;
}
var Ih;
function Tg() {
  if (Ih) return er.exports;
  Ih = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (o) {
        console.error(o);
      }
  }
  return c(), er.exports = Eg(), er.exports;
}
var Ng = Tg();
const i0 = 128, c0 = 640;
function Gu(c, o = 144) {
  return Math.max(i0, Math.min(
    c0,
    Number.isFinite(c) ? Math.round(c) : o
  ));
}
function s0(c, o, f) {
  return o ? f ? c : "waveform" : "spectrogram";
}
function xg(c, o, f) {
  return Number.isFinite(c) ? c * (o === 1 ? 16 : o === 2 ? f : 1) : 0;
}
function Mg(c, o) {
  return Math.max(0, Math.min(100, c - Math.max(-240, Math.min(240, o)) * 0.08));
}
function Og(c, o) {
  return Gu(c * Math.exp(-Math.max(-240, Math.min(240, o)) * 2e-3));
}
function Ph(c, o, f) {
  return Math.max(0, c * o - f);
}
function Ja(c) {
  if (!c.id || !Number.isSafeInteger(c.startSample) || !Number.isSafeInteger(c.endSample) || !Number.isFinite(c.sampleRate) || c.sampleRate <= 0 || c.startSample < 0 || c.endSample <= c.startSample)
    throw new RangeError("A loop needs an id, valid sample rate and increasing integer sample bounds");
  return {
    start: c.startSample / c.sampleRate,
    end: c.endSample / c.sampleRate,
    duration: (c.endSample - c.startSample) / c.sampleRate
  };
}
function zg(c, o = 0) {
  const f = /* @__PURE__ */ new Set();
  return c.filter((s) => {
    try {
      const b = Ja(s);
      return f.has(s.id) || o > 0 && b.end > o + 0.02 ? !1 : (f.add(s.id), !0);
    } catch {
      return !1;
    }
  });
}
function f0(c, o, f) {
  const s = f - o;
  return !Number.isFinite(c) || s <= 0 ? o : o + ((c - o) % s + s) % s;
}
class Ag {
  constructor(o = () => new AudioContext()) {
    this.createContext = o;
  }
  createContext;
  context = null;
  node = null;
  generation = 0;
  abort = null;
  cache = null;
  anchor = 0;
  offset = 0;
  start = 0;
  length = 1;
  stoppedTime = 0;
  get playing() {
    return this.node !== null;
  }
  get currentTime() {
    if (!this.node || !this.context) return this.stoppedTime;
    const o = Math.max(0, this.context.currentTime - this.anchor);
    return this.start + (this.offset + o) % this.length;
  }
  pause() {
    return this.stoppedTime = this.currentTime, this.generation += 1, this.abort?.abort(), this.abort = null, this.node && (this.node.stop(), this.node.disconnect(), this.node = null), this.stoppedTime;
  }
  async play(o, f, s, b = "same-origin") {
    const v = Ja(o);
    this.pause();
    const E = this.generation;
    this.context ??= this.createContext();
    const x = this.context, j = x.resume();
    j.catch(() => {
    });
    const w = o.audioSrc || f, z = JSON.stringify([w, o.startSample, o.endSample, o.sampleRate]);
    try {
      let h = this.cache?.url === z ? this.cache.buffer : null;
      if (!h) {
        const W = new AbortController();
        this.abort = W;
        const Et = await fetch(w, { signal: W.signal, credentials: b });
        if (!Et.ok) throw new Error(`Could not load loop audio (HTTP ${Et.status})`);
        const ct = 128 * 1024 * 1024;
        if (Number(Et.headers.get("Content-Length")) > ct) throw new Error("Loop audio exceeds 128 MiB");
        const Mt = await Et.arrayBuffer();
        if (Mt.byteLength > ct) throw new Error("Loop audio exceeds 128 MiB");
        if (h = await x.decodeAudioData(Mt), E !== this.generation) return !1;
        this.cache = { url: z, buffer: h };
      }
      if (await j, E !== this.generation) return !1;
      const A = o.audioSrc ? 0 : v.start, L = A + v.duration, Z = Math.max(2 / h.sampleRate, 2e-3);
      if (!Number.isFinite(h.duration) || h.duration <= A || L > h.duration + Z || o.audioSrc && Math.abs(h.duration - v.duration) > Z)
        throw new Error("Loop audio duration does not match the reported sample boundaries");
      const at = x.createBufferSource();
      return at.buffer = h, at.loop = !0, at.loopStart = A, at.loopEnd = Math.min(L, h.duration), at.connect(x.destination), this.start = v.start, this.length = at.loopEnd - A, this.offset = f0(s, v.start, v.start + this.length) - v.start, this.anchor = x.currentTime, at.start(this.anchor, A + this.offset), this.node = at, !0;
    } catch (h) {
      if (E !== this.generation) return !1;
      throw h;
    } finally {
      j.catch(() => {
      });
    }
  }
  dispose() {
    this.pause(), this.cache = null;
    const o = this.context;
    this.context = null, o && o.close().catch(() => {
    });
  }
}
function ba(c, o, f) {
  return Math.min(f, Math.max(o, c));
}
function Ka(c) {
  const o = Math.max(0, Number(c) || 0), f = Math.floor(o / 60), s = Math.floor(o % 60), b = Math.floor((o - Math.floor(o)) * 1e3);
  return `${String(f).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(b).padStart(3, "0")}`;
}
function r0(c) {
  const o = [0.1, 0.25, 0.5, 1, 2, 5, 10, 15, 30, 60, 120, 300, 600];
  return o.find((f) => f * c >= 70) ?? o[o.length - 1];
}
function Cg(c, o, f, s, b) {
  if (b <= 0 || s <= 0) return { start: 0, end: 0 };
  const v = Math.max(0, c - f), E = Math.max(0, c + o - f), x = ba(v / s, 0, b), j = ba(E / s, x, b);
  return { start: x, end: j };
}
function sr(c, o) {
  return `${ba(c / Math.max(o, 1e-9), 0, 1) * 100}%`;
}
function o0(c, o, f, s = 0.08) {
  const b = Number.isFinite(o) && Number(o) > c ? Number(o) : c + 0.5;
  return `${Math.max(s, (b - c) / Math.max(f, 1e-9) * 100)}%`;
}
function jg({ min: c, max: o, colour: f = "#79c0ff" }) {
  const s = B.useRef(null);
  return B.useEffect(() => {
    const b = s.current;
    if (!b) return;
    const v = Math.max(1, Math.min(c.length, o.length));
    b.width = v, b.height = 180;
    const E = b.getContext("2d");
    if (!E) return;
    E.clearRect(0, 0, v, b.height), E.strokeStyle = f, E.lineWidth = 1, E.beginPath();
    const x = b.height / 2, j = b.height * 0.46;
    for (let w = 0; w < v; w += 1) {
      const z = w + 0.5;
      E.moveTo(z, x - (Number(o[w]) || 0) * j), E.lineTo(z, x - (Number(c[w]) || 0) * j);
    }
    E.stroke();
  }, [f, o, c]), /* @__PURE__ */ d.jsx("canvas", { ref: s, className: "rts-waveform", "aria-hidden": "true" });
}
function Rg({ rows: c }) {
  const o = B.useRef(null);
  return B.useEffect(() => {
    const f = o.current, s = c.filter((x) => x.length > 0);
    if (!f || !s.length) return;
    const b = Math.max(...s.map((x) => x.length));
    f.width = Math.min(4096, s.length), f.height = Math.min(256, b);
    const v = f.getContext("2d");
    if (!v) return;
    const E = v.createImageData(f.width, f.height);
    for (let x = 0; x < f.width; x += 1) {
      const j = Math.min(s.length - 1, Math.floor(x * s.length / f.width)), w = s[j], z = Math.max(1e-9, ...w.map((h) => Number(h) || 0));
      for (let h = 0; h < f.height; h += 1) {
        const A = Math.min(w.length - 1, Math.floor((f.height - 1 - h) * w.length / f.height)), L = ba((Number(w[A]) || 0) / z, 0, 1), Z = (h * f.width + x) * 4;
        E.data[Z] = Math.round(40 + 180 * L), E.data[Z + 1] = Math.round(35 + 110 * L), E.data[Z + 2] = Math.round(80 + 170 * L), E.data[Z + 3] = 255;
      }
    }
    v.putImageData(E, 0, 0);
  }, [c]), /* @__PURE__ */ d.jsx("canvas", { ref: o, className: "rts-matrix", "aria-hidden": "true" });
}
function Dg({ items: c, duration: o }) {
  const f = c.filter((v) => Number.isFinite(v.value) && v.value > 0);
  if (!f.length) return null;
  const s = Math.log2(Math.max(20, Math.min(...f.map((v) => v.value)))), b = Math.log2(Math.max(100, ...f.map((v) => v.value)));
  return f.map((v, E) => {
    const x = (Math.log2(v.value) - s) / Math.max(0.01, b - s);
    return /* @__PURE__ */ d.jsx(
      "span",
      {
        className: `rts-note ${v.className ?? ""}`,
        style: { left: sr(v.start, o), width: o0(v.start, v.end ?? v.start + 0.12, o, 0.04), top: `${8 + (1 - x) * 72}px` },
        title: v.title ?? `${v.label ?? `${v.value.toFixed(1)} Hz`} · ${Ka(v.start)}`
      },
      `${v.start}-${E}`
    );
  });
}
function fr({ content: c, duration: o }) {
  switch (c.type) {
    case "waveform":
      return /* @__PURE__ */ d.jsx(jg, { ...c });
    case "image":
      return /* @__PURE__ */ d.jsx("img", { className: `rts-image ${c.className ?? ""}`, src: c.src, alt: c.alt });
    case "markers":
      return /* @__PURE__ */ d.jsx(d.Fragment, { children: c.items.map((f, s) => /* @__PURE__ */ d.jsx(
        "span",
        {
          className: `rts-marker ${f.emphasis ? "rts-marker-emphasis" : ""} ${f.className ?? ""}`,
          style: { left: sr(f.time, o) },
          title: f.label
        },
        `${f.time}-${s}`
      )) });
    case "blocks":
      return /* @__PURE__ */ d.jsx(d.Fragment, { children: c.items.map((f, s) => /* @__PURE__ */ d.jsx(
        "span",
        {
          className: `rts-block ${f.className ?? ""}`,
          style: { left: sr(f.start, o), width: o0(f.start, f.end, o) },
          title: f.title ?? `${f.label ?? ""} · ${Ka(f.start)}${f.end ? ` — ${Ka(f.end)}` : ""}`,
          children: f.label
        },
        `${f.start}-${s}`
      )) });
    case "notes":
      return /* @__PURE__ */ d.jsx(Dg, { items: c.items, duration: o });
    case "curve": {
      const f = c.points.filter((x) => Number.isFinite(x.time) && Number.isFinite(x.value));
      if (!f.length) return null;
      const s = f.map((x) => x.value), b = Math.min(...s), v = Math.max(...s), E = f.map((x) => {
        const j = x.time / Math.max(o, 1e-9) * 2e3, w = 180 - (x.value - b) / Math.max(1e-9, v - b) * 168 - 6;
        return `${j.toFixed(2)},${w.toFixed(2)}`;
      }).join(" ");
      return /* @__PURE__ */ d.jsx("svg", { className: "rts-curve", viewBox: "0 0 2000 180", preserveAspectRatio: "none", "aria-hidden": "true", children: /* @__PURE__ */ d.jsx("polyline", { fill: "none", stroke: c.colour ?? "#7ee787", strokeWidth: "2", vectorEffect: "non-scaling-stroke", points: E }) });
    }
    case "matrix":
      return /* @__PURE__ */ d.jsx(Rg, { ...c });
    case "summary":
      return /* @__PURE__ */ d.jsx("div", { className: "rts-summary", children: c.items.map((f, s) => /* @__PURE__ */ d.jsxs("span", { className: "rts-summary-item", children: [
        /* @__PURE__ */ d.jsxs("strong", { children: [
          f.label,
          ": "
        ] }),
        f.value
      ] }, `${f.label}-${s}`)) });
    case "artifact":
      return /* @__PURE__ */ d.jsxs("div", { className: "rts-artifact", children: [
        /* @__PURE__ */ d.jsx("span", { children: c.note }),
        c.href && /* @__PURE__ */ d.jsx("a", { href: c.href, target: "_blank", rel: "noopener noreferrer", children: c.linkLabel ?? "open" })
      ] });
    case "text":
      return /* @__PURE__ */ d.jsx("div", { className: "rts-text", children: c.text });
    case "custom":
      return /* @__PURE__ */ d.jsx(d.Fragment, { children: c.node });
  }
}
function Ug({ content: c, duration: o, view: f }) {
  const s = s0(f, !!c.waveform, !!c.spectrogram);
  return /* @__PURE__ */ d.jsxs("div", { className: `rts-audio-layers rts-audio-${s}`, "data-audio-view": s, children: [
    c.spectrogram && s !== "waveform" && /* @__PURE__ */ d.jsx("div", { className: "rts-audio-spectrum", children: /* @__PURE__ */ d.jsx(fr, { content: { type: "image", ...c.spectrogram }, duration: o }) }),
    c.waveform && s !== "spectrogram" && /* @__PURE__ */ d.jsx("div", { className: "rts-audio-envelope", children: /* @__PURE__ */ d.jsx(fr, { content: { type: "waveform", ...c.waveform, colour: s === "both" ? "#e6fff7" : c.waveform.colour }, duration: o }) }),
    !c.waveform && !c.spectrogram && /* @__PURE__ */ d.jsx("span", { className: "rts-meta", children: "Waiting for audio analysis" })
  ] });
}
function wg(c, o, f, s, b = "same-origin") {
  const [v, E] = B.useState(0), [x, j] = B.useState(!1), [w, z] = B.useState(!1), [h, A] = B.useState(""), L = B.useRef(!1), Z = B.useRef("media"), at = B.useRef(null), W = B.useRef(0), Et = B.useRef({ audioSrc: o, activeLoop: f, onError: s, credentials: b });
  Et.current = { audioSrc: o, activeLoop: f, onError: s, credentials: b };
  const ct = B.useCallback(() => Z.current === "loop" ? at.current?.currentTime ?? 0 : c.current?.currentTime ?? 0, [c]), Mt = B.useCallback(() => {
    const I = ct();
    return W.current += 1, L.current = !1, at.current?.pause(), c.current?.pause(), z(!1), j(!1), E(I), I;
  }, [c, ct]), Vt = B.useCallback((I) => {
    Mt(), A(I instanceof Error ? I.message : String(I)), Et.current.onError?.(I);
  }, [Mt]), Ut = B.useCallback(async (I) => {
    Mt();
    const nt = W.current;
    L.current = !0, z(!0), A("");
    const { activeLoop: bt, audioSrc: Gt, credentials: Ft } = Et.current;
    try {
      if (bt) {
        if (Z.current = "loop", at.current ??= new Ag(), !await at.current.play(bt, Gt, I, Ft)) return;
      } else {
        Z.current = "media";
        const ot = c.current;
        if (!ot) return;
        ot.currentTime = Math.max(0, I), await ot.play();
      }
      if (nt !== W.current) return;
      E(ct()), z(!1), j(!0);
    } catch (ot) {
      nt === W.current && Vt(ot);
    }
  }, [c, Vt, Mt, ct]), zt = B.useCallback((I) => {
    const nt = Et.current.activeLoop;
    if (nt) {
      const bt = Ja(nt);
      I = f0(I, bt.start, bt.end);
    }
    L.current ? Ut(I) : (Mt(), Z.current = "media", c.current && (c.current.currentTime = I), E(I));
  }, [c, Mt, Ut]), P = B.useCallback(() => {
    if (L.current) {
      Mt();
      return;
    }
    let I = ct();
    const nt = Et.current.activeLoop;
    if (nt) {
      const bt = Ja(nt);
      (I < bt.start || I >= bt.end) && (I = bt.start);
    }
    Ut(I);
  }, [Mt, Ut, ct]);
  B.useEffect(() => (Mt(), Z.current = "media", E(0), A(""), at.current?.dispose(), at.current = null, () => {
    W.current += 1, L.current = !1, at.current?.dispose(), at.current = null, c.current?.pause();
  }), [o, c, Mt]);
  const tt = f ? JSON.stringify([f.id, f.startSample, f.endSample, f.sampleRate, f.audioSrc]) : "";
  B.useEffect(() => {
    const I = L.current;
    let nt = Mt();
    const bt = Et.current.activeLoop;
    bt && (nt = Ja(bt).start), Z.current = "media", c.current && (c.current.currentTime = nt), E(nt), I && Ut(nt);
  }, [tt, c, Mt, Ut]), B.useEffect(() => {
    if (!x) return;
    let I = 0;
    const nt = () => {
      E(ct()), I = requestAnimationFrame(nt);
    };
    return I = requestAnimationFrame(nt), () => cancelAnimationFrame(I);
  }, [x, ct]);
  const xt = B.useCallback(() => {
    Z.current === "media" && Mt();
  }, [Mt]);
  return { time: v, playing: x, loading: w, error: h, toggle: P, seek: zt, ended: xt, fail: Vt };
}
function Bg(c, o) {
  if (c <= 0 || o <= 0) return [];
  const f = r0(o) / 5, s = [];
  for (let b = 0; b * f <= c + 1e-6; b += 1)
    s.push({
      time: b * f,
      major: b % 5 === 0
    });
  return s;
}
function Hg(c, o) {
  const f = Math.round(c * 1e3), s = Math.floor(f / 1e3), b = `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  return r0(o) < 1 ? `${b}.${String(f % 1e3).padStart(3, "0")}` : b;
}
function Lg({
  audioSrc: c,
  loops: o = [],
  onLoopSelect: f,
  onLoopEnabledChange: s,
  lanes: b,
  title: v = "Audio timeline",
  subtitle: E,
  duration: x = 0,
  grid: j = [],
  headerEnd: w,
  footer: z,
  className: h = "",
  labelWidth: A = 230,
  initialZoom: L = 20,
  laneControls: Z = !1,
  wheelNavigation: at = !1,
  followPlayheadByDefault: W = !0,
  preload: Et = "metadata",
  crossOrigin: ct,
  onDurationChange: Mt,
  onTimeChange: Vt,
  onWindowChange: Ut,
  onPlaybackError: zt
}) {
  const P = B.useRef(null), tt = B.useRef(null), [xt, I] = B.useState(Math.max(0, x)), [nt, bt] = B.useState(null), [Gt, Ft] = B.useState(!1), ot = B.useMemo(() => zg(o, xt), [o, xt]), R = ot.find((C) => C.id === nt) ?? null, Y = wg(
    P,
    c,
    Gt ? R : null,
    zt,
    ct === "use-credentials" ? "include" : "same-origin"
  ), G = Y.time, st = Y.playing, ft = R ? Ja(R) : null, Pt = (C) => {
    bt(C), f?.(ot.find((rt) => rt.id === C) ?? null);
  }, Zt = (C) => {
    Ft(C), s?.(C);
  };
  B.useEffect(() => {
    nt && !ot.some((C) => C.id === nt) && (bt(null), Ft(!1), f?.(null), s?.(!1));
  }, [nt, ot, f, s]), B.useEffect(() => {
    bt(null), Ft(!1), I(Math.max(0, x));
  }, [c]);
  const [Oe, g] = B.useState(W), [H, $] = B.useState(L), [J, ht] = B.useState({}), [dt, ut] = B.useState({}), V = B.useRef(L), k = B.useRef(null), Kt = B.useRef(() => {
  });
  B.useEffect(() => {
    ht({}), ut({});
  }, [c]);
  const [jt, oe] = B.useState(0), [ce, Yt] = B.useState({ start: 0, end: 0 });
  B.useEffect(() => {
    x > 0 && I(x);
  }, [x]), B.useEffect(() => {
    const C = tt.current;
    if (!C) return;
    const rt = () => oe(C.clientWidth);
    rt();
    const vt = new ResizeObserver(rt);
    return vt.observe(C), () => vt.disconnect();
  }, []);
  const q = xt > 0 ? Math.max(0.4, Math.max(320, jt - A - 16) / xt) : 0.4, Q = Math.max(q, q * Math.pow(2, H / 18));
  B.useLayoutEffect(() => {
    if (V.current = H, k.current && tt.current) {
      const { time: C, pointer: rt } = k.current;
      tt.current.scrollLeft = Ph(C, Q, rt), k.current = null;
    }
  }, [H, Q]), B.useEffect(() => {
    const C = tt.current;
    if (!C || !at) return;
    const rt = (vt) => Kt.current(vt);
    return C.addEventListener("wheel", rt, { passive: !1 }), () => C.removeEventListener("wheel", rt);
  }, [at]);
  const At = Math.max(1, xt * Q), de = B.useMemo(() => Bg(xt, Q), [xt, Q]), me = B.useCallback(() => {
    const C = tt.current;
    if (!C) return;
    const rt = Cg(
      C.scrollLeft + A,
      Math.max(0, C.clientWidth - A),
      A,
      Q,
      xt
    );
    Yt(rt), Ut?.(rt);
  }, [xt, A, Ut, Q]);
  B.useEffect(() => {
    me();
  }, [me, jt]), B.useEffect(() => {
    Vt?.(G);
    const C = tt.current;
    if (!C || !Oe || !st) return;
    const rt = A + G * Q, vt = C.scrollLeft + C.clientWidth, se = Math.min(180, C.clientWidth * 0.2);
    rt > vt - se ? C.scrollLeft = Math.max(0, rt - C.clientWidth + se) : rt < C.scrollLeft + A && (C.scrollLeft = Math.max(0, rt - A - se));
  }, [G, Oe, st, A, Vt, Q]);
  const we = (C) => {
    if (xt <= 0 || C.target.closest(".rts-label, a, button, input, select, textarea")) return;
    const rt = tt.current, vt = P.current;
    if (!rt || !vt) return;
    const se = rt.getBoundingClientRect(), le = C.clientX - se.left + rt.scrollLeft - A;
    if (le < 0) return;
    const he = ba(le / Q, 0, xt);
    Y.seek(he);
  }, Be = (C, rt) => {
    const vt = tt.current;
    if (C = ba(C, 0, 100), C !== V.current) {
      if (vt) {
        const se = Math.max(1, vt.clientWidth - A), le = rt === void 0 ? se / 2 : ba(rt - vt.getBoundingClientRect().left - A, 0, se), he = k.current, ze = q * Math.pow(2, V.current / 18), ve = he ? Ph(he.time, ze, he.pointer) : vt.scrollLeft;
        k.current = { time: (ve + le) / ze, pointer: le };
      }
      V.current = C, $(C);
    }
  };
  Kt.current = (C) => {
    const rt = tt.current, vt = C.target instanceof Element ? C.target : null;
    if (!rt || !vt || vt.closest("input, select, textarea, button, [contenteditable=true]")) return;
    const se = Math.abs(C.deltaX) > Math.abs(C.deltaY) ? C.deltaX : C.deltaY, le = xg(se, C.deltaMode, rt.clientWidth - A);
    if (le)
      if (C.ctrlKey || C.metaKey) {
        if (xt <= 0) return;
        C.preventDefault(), C.stopPropagation(), g(!1), Be(Mg(V.current, le), C.clientX);
      } else if (C.altKey) {
        const he = vt.closest("[data-lane-id]")?.dataset.laneId, ze = b.find((ve) => ve.id === he);
        if (!Z || !ze) return;
        C.preventDefault(), C.stopPropagation(), ht((ve) => ({
          ...ve,
          [ze.id]: Og(ve[ze.id] ?? Gu(ze.height), le)
        }));
      } else
        C.preventDefault(), C.stopPropagation(), C.shiftKey ? rt.scrollTop += le : (g(!1), rt.scrollLeft += le);
  };
  const pa = () => {
    if (!ft || !tt.current) return;
    const C = Math.max(320, jt - A - 16) / (ft.duration * 1.1), rt = ba(18 * Math.log2(C / q), 0, 100);
    k.current = null, V.current = rt, $(rt);
    const vt = q * Math.pow(2, rt / 18);
    requestAnimationFrame(() => {
      tt.current && (tt.current.scrollLeft = Math.max(0, (ft.start - ft.duration * 0.05) * vt));
    });
  }, Vl = () => {
    const C = Number(P.current?.duration) || 0;
    Number.isFinite(C) && C > 0 && (I(C), Mt?.(C));
  };
  return /* @__PURE__ */ d.jsxs(
    "section",
    {
      className: `rts-sequence ${Z ? "rts-display-controls" : ""} ${h}`,
      style: { "--rts-label-width": `${A}px`, "--rts-track-width": `${At}px` },
      children: [
        /* @__PURE__ */ d.jsxs("header", { className: "rts-toolbar", children: [
          /* @__PURE__ */ d.jsxs("div", { className: "rts-ident", children: [
            /* @__PURE__ */ d.jsx("strong", { children: v }),
            E && /* @__PURE__ */ d.jsx("span", { children: E })
          ] }),
          /* @__PURE__ */ d.jsxs("div", { className: "rts-transport", "aria-label": "Timeline playback controls", children: [
            /* @__PURE__ */ d.jsx("button", { type: "button", className: "rts-button rts-play", onClick: Y.toggle, "aria-label": st || Y.loading ? "Pause" : "Play", children: Y.loading ? "…" : st ? "❚❚" : "▶" }),
            /* @__PURE__ */ d.jsxs("output", { className: "rts-time", "aria-live": "off", children: [
              Ka(G),
              " / ",
              Ka(xt)
            ] }),
            /* @__PURE__ */ d.jsx("button", { type: "button", className: "rts-button", onClick: () => Be(0), children: "Fit" }),
            /* @__PURE__ */ d.jsxs("label", { className: "rts-control", children: [
              /* @__PURE__ */ d.jsx("span", { children: "Zoom" }),
              /* @__PURE__ */ d.jsx("input", { "aria-label": "Timeline zoom", type: "range", min: "0", max: "100", value: H, onChange: (C) => Be(Number(C.target.value)) })
            ] }),
            /* @__PURE__ */ d.jsxs("label", { className: "rts-control", children: [
              /* @__PURE__ */ d.jsx("input", { type: "checkbox", checked: Oe, onChange: (C) => g(C.target.checked) }),
              /* @__PURE__ */ d.jsx("span", { children: "Follow" })
            ] })
          ] }),
          /* @__PURE__ */ d.jsx("div", { className: "rts-header-end", children: w }),
          ot.length > 0 && /* @__PURE__ */ d.jsxs("div", { className: "rts-loop-controls", "aria-label": "Loop controls", children: [
            /* @__PURE__ */ d.jsxs("label", { children: [
              "Loop ",
              /* @__PURE__ */ d.jsxs("select", { "aria-label": "Select loop", value: nt ?? "", onChange: (C) => Pt(C.target.value), children: [
                /* @__PURE__ */ d.jsx("option", { value: "", children: "Choose a loop…" }),
                ot.map((C) => /* @__PURE__ */ d.jsx("option", { value: C.id, children: C.label || C.id }, C.id))
              ] })
            ] }),
            /* @__PURE__ */ d.jsxs("label", { children: [
              /* @__PURE__ */ d.jsx("input", { type: "checkbox", "aria-label": "Enable loop", disabled: !R, checked: Gt && !!R, onChange: (C) => Zt(C.target.checked) }),
              "Enable loop"
            ] }),
            /* @__PURE__ */ d.jsx("button", { type: "button", className: "rts-button", disabled: !R, onClick: pa, children: "Zoom to loop" }),
            R && /* @__PURE__ */ d.jsxs("output", { children: [
              R.startSample.toLocaleString(),
              " → ",
              R.endSample.toLocaleString(),
              " samples (end exclusive) · ",
              R.sampleRate.toLocaleString(),
              " Hz"
            ] }),
            R?.downloadUrl && /* @__PURE__ */ d.jsx("a", { href: R.downloadUrl, download: !0, children: "Download loop WAV" }),
            /* @__PURE__ */ d.jsx("span", { className: "rts-loop-status", role: "status", children: Y.loading ? "Loading loop…" : Gt && R ? "Loop enabled · Play repeats selection" : "Full-song playback" })
          ] }),
          Y.error && /* @__PURE__ */ d.jsx("div", { role: "alert", className: "rts-loop-error", children: Y.error })
        ] }),
        /* @__PURE__ */ d.jsx(
          "audio",
          {
            ref: P,
            src: c,
            preload: Et,
            crossOrigin: ct,
            onLoadedMetadata: Vl,
            onEnded: Y.ended,
            onError: () => Y.fail(new Error(P.current?.error?.message || "Audio playback failed"))
          }
        ),
        /* @__PURE__ */ d.jsx("div", { className: "rts-workspace", children: /* @__PURE__ */ d.jsx("div", { ref: tt, className: "rts-scroller", onScroll: me, onClick: we, children: /* @__PURE__ */ d.jsxs("div", { className: "rts-inner", children: [
          /* @__PURE__ */ d.jsxs("div", { className: "rts-ruler-row", children: [
            /* @__PURE__ */ d.jsx("div", { className: "rts-label rts-ruler-label", children: "TIME" }),
            /* @__PURE__ */ d.jsx("div", { className: "rts-ruler-track", children: de.map((C) => /* @__PURE__ */ d.jsx("span", { className: `rts-tick ${C.major ? "rts-tick-major" : ""}`, style: { left: `${C.time * Q}px` }, children: C.major && /* @__PURE__ */ d.jsx("span", { className: "rts-tick-label", children: Hg(C.time, Q) }) }, C.time)) })
          ] }),
          ot.length > 0 && /* @__PURE__ */ d.jsxs("div", { className: "rts-lane rts-lane-loops", children: [
            /* @__PURE__ */ d.jsxs("div", { className: "rts-label", children: [
              /* @__PURE__ */ d.jsx("div", { className: "rts-title", children: "LOOPS" }),
              /* @__PURE__ */ d.jsx("div", { className: "rts-meta", children: "Select a region, enable, then Play" })
            ] }),
            /* @__PURE__ */ d.jsx("div", { className: "rts-track", children: ot.map((C) => {
              const rt = Ja(C);
              return /* @__PURE__ */ d.jsx(
                "button",
                {
                  type: "button",
                  className: "rts-loop-region",
                  "aria-pressed": nt === C.id,
                  "aria-label": `Select ${C.label || C.id}`,
                  onClick: () => Pt(C.id),
                  title: `${C.label || C.id}: [${C.startSample}, ${C.endSample}) at ${C.sampleRate} Hz`,
                  style: { left: `${rt.start * Q}px`, width: `${rt.duration * Q}px` },
                  children: C.label || C.id
                },
                C.id
              );
            }) })
          ] }),
          ft && /* @__PURE__ */ d.jsx(
            "div",
            {
              className: `rts-loop-shade ${Gt ? "" : "is-disabled"}`,
              "aria-hidden": "true",
              style: { left: `${A + ft.start * Q}px`, width: `${ft.duration * Q}px` }
            }
          ),
          /* @__PURE__ */ d.jsx("div", { className: "rts-lanes", children: b.map((C) => {
            const rt = C.content, vt = rt.type === "audio" ? rt : null, se = dt[C.id] ?? vt?.view ?? "both", le = vt ? s0(se, !!vt.waveform, !!vt.spectrogram) : "both", he = Z ? J[C.id] ?? Gu(C.height) : C.height, ze = typeof C.title == "string" ? C.title : C.id;
            return /* @__PURE__ */ d.jsxs(
              "div",
              {
                "data-lane-id": C.id,
                className: `rts-lane rts-lane-${C.kind ?? "default"} ${C.className ?? ""}`,
                style: he ? { "--rts-lane-height": `${he}px` } : void 0,
                children: [
                  /* @__PURE__ */ d.jsxs("div", { className: "rts-label", children: [
                    /* @__PURE__ */ d.jsx("div", { className: "rts-title", children: C.title }),
                    C.meta && /* @__PURE__ */ d.jsx("div", { className: "rts-meta", children: C.meta }),
                    Z && /* @__PURE__ */ d.jsxs("div", { className: "rts-lane-controls", children: [
                      vt && /* @__PURE__ */ d.jsxs("label", { children: [
                        "View ",
                        /* @__PURE__ */ d.jsxs(
                          "select",
                          {
                            "aria-label": `View for ${ze}`,
                            value: le,
                            onChange: (ve) => ut((O) => ({ ...O, [C.id]: ve.target.value })),
                            children: [
                              /* @__PURE__ */ d.jsx("option", { value: "waveform", disabled: !vt.waveform, children: "Waveform" }),
                              /* @__PURE__ */ d.jsx("option", { value: "spectrogram", disabled: !vt.spectrogram, children: "Spectrogram" }),
                              /* @__PURE__ */ d.jsx("option", { value: "both", disabled: !vt.waveform || !vt.spectrogram, children: "Both" })
                            ]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ d.jsxs("label", { children: [
                        "Height ",
                        /* @__PURE__ */ d.jsx(
                          "input",
                          {
                            type: "range",
                            min: i0,
                            max: c0,
                            step: "1",
                            "aria-label": `Height for ${ze}`,
                            value: he,
                            onChange: (ve) => ht((O) => ({ ...O, [C.id]: Gu(Number(ve.target.value)) }))
                          }
                        ),
                        /* @__PURE__ */ d.jsxs("output", { children: [
                          he,
                          "px"
                        ] })
                      ] }),
                      /* @__PURE__ */ d.jsx(
                        "button",
                        {
                          type: "button",
                          className: "rts-height-reset",
                          "aria-label": `Reset height for ${ze}`,
                          onClick: () => ht((ve) => ({ ...ve, [C.id]: Gu(C.height) })),
                          children: "Reset height"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ d.jsx("div", { className: "rts-track", children: vt ? /* @__PURE__ */ d.jsx(Ug, { content: vt, duration: xt, view: le }) : /* @__PURE__ */ d.jsx(fr, { content: rt, duration: xt }) })
                ]
              },
              C.id
            );
          }) }),
          j.length > 0 && /* @__PURE__ */ d.jsx("div", { className: "rts-grid", "aria-hidden": "true", children: j.map((C, rt) => /* @__PURE__ */ d.jsx("span", { className: `rts-grid-line ${C.emphasis ? "rts-grid-line-emphasis" : ""} ${C.className ?? ""}`, style: { left: `${C.time * Q}px` } }, `${C.time}-${rt}`)) }),
          /* @__PURE__ */ d.jsx("div", { className: "rts-playhead", style: { left: `${A + G * Q}px` }, "aria-hidden": "true" })
        ] }) }) }),
        /* @__PURE__ */ d.jsxs("footer", { className: "rts-footer", children: [
          /* @__PURE__ */ d.jsxs("div", { children: [
            z,
            at && /* @__PURE__ */ d.jsx("div", { className: "rts-navigation-help", children: "Wheel: time · Ctrl/⌘ + wheel: time zoom · Alt + wheel: channel height · Shift + wheel: channel scroll" })
          ] }),
          /* @__PURE__ */ d.jsxs("output", { className: "rts-window", children: [
            Ka(ce.start),
            " — ",
            Ka(ce.end)
          ] })
        ] })
      ]
    }
  );
}
const ur = /\.(wav|flac|mp3|ogg|opus|m4a|aif|aiff)$/i;
function t0(c) {
  return c === "__source__" || c.startsWith("input/") ? "master" : c.startsWith("stems/") ? c.slice(6).replace(ur, "") : c.startsWith("speech/") && ur.test(c) ? c.replace(ur, "") : null;
}
function Yg(c) {
  const o = /* @__PURE__ */ new Map(), f = [], s = /* @__PURE__ */ new Map();
  for (const v of c) for (const E of Array.isArray(v.sourceMap) ? v.sourceMap : [])
    if (typeof E?.audio == "string" && typeof E.data == "string") {
      const x = t0(E.audio.replace(/\\/g, "/"));
      x && (s.set(E.data.replace(/\\/g, "/"), x), typeof E.png == "string" && s.set(E.png.replace(/\\/g, "/"), x));
    }
  const b = (v) => (o.has(v) || o.set(v, { key: v }), o.get(v));
  for (const v of c) {
    const E = (v.id?.replace(/^file:/, "") || "").replace(/\\/g, "/"), x = t0(E), j = E.startsWith("spectrograms/") ? s.get(E) || E.slice(13).replace(/\.(npz|png)$/i, "") : null;
    if (x && (v.content?.type === "waveform" || v.content?.type === "artifact")) {
      const w = b(x);
      (!w.audio || v.id === "__source__") && (w.audio = v);
    } else j && E.endsWith(".npz") && v.content?.type === "image" ? b(j).spectrum = v : j && E.endsWith(".png") && v.content?.type === "image" ? b(j).png = v : f.push(v);
  }
  for (const v of o.values()) {
    if (!v.audio && !v.spectrum) {
      v.png && f.push(v.png);
      continue;
    }
    const E = v.audio || v.spectrum, x = v.audio?.content?.type === "waveform" ? v.audio.content : null, j = v.audio?.content?.type === "artifact" ? v.audio.content.note : null;
    f.push({
      ...E,
      id: v.key === "master" ? "__source__" : `audio:${v.key}`,
      title: v.key === "master" ? "MASTER · uploaded source" : v.key.replace(/\//g, " · ").replace(/_/g, " "),
      kind: "audio",
      height: 160,
      meta: j || (x && v.spectrum ? "waveform + aligned spectrogram" : x ? "waveform · spectrogram pending" : "spectrogram · waveform pending"),
      content: {
        type: "audio",
        view: "both",
        waveform: x ? { min: x.min, max: x.max, colour: x.colour } : void 0,
        spectrogram: v.spectrum ? { src: v.spectrum.content.src, alt: v.spectrum.content.alt } : void 0
      }
    }), !v.spectrum && v.png && f.push(v.png);
  }
  return f;
}
const rr = (c) => typeof c == "number" && Number.isFinite(c) && c > 0, qg = { canonical: "Canonical", combined: "Consensus · observed tempo", combined_family: "Consensus · canonical tempo family", combined_fit: "Consensus · fitted constant grid" };
function e0(c, o, f, s) {
  if (!rr(c) || !Number.isFinite(o) || o < 0 || !Number.isFinite(f) || f <= 0) return [];
  const b = Math.max(0, Math.floor((f - o) * c / 60 + 1e-9) + 1), v = Math.max(1, Math.ceil(b / 25e3));
  return Array.from({ length: Math.ceil(b / v) }, (E, x) => {
    const j = x * v;
    return {
      time: o + j * 60 / c,
      emphasis: j === 0,
      label: `${s === "original" ? "Original" : "Aligned"} beat ${j + 1}${j === 0 && s === "aligned" ? " · pip 0" : ""}`,
      className: `stemlab-grid-${s}`
    };
  });
}
function Gg(c, o, f, s = "canonical", b = "consensus") {
  const v = c?.schema === "stemlab.beat-offsets.v1" && c.pips_per_beat === 64;
  let E = v ? (c.bpm_bases || []).filter((L) => L.status === "available" && rr(L.bpm)) : [];
  !E.length && rr(o) && (E = [{ id: "canonical", bpm: o }]);
  const x = E.find((L) => L.id === s) || E.find((L) => L.id === "combined_fit") || E[0] || null, j = v ? (c.analyses || []).filter((L) => L.status === "available") : [], w = j.find((L) => L.analysis_id === b) || j.find((L) => L.kind === "consensus") || j[0] || null, z = x && w ? c.comparisons?.find((L) => L.status === "available" && L.bpm_basis === x.id && L.analysis_id === w.analysis_id) : null, h = x ? e0(x.bpm, 0, f, "original") : [], A = z && Number.isFinite(z.beat_zero_seconds) ? e0(z.bpm, z.beat_zero_seconds, f, "aligned") : [];
  return {
    bases: E.map((L) => ({ ...L, label: `${qg[L.id] || L.id}${L.multiplier ? ` ×${L.multiplier}` : ""} · ${L.bpm.toFixed(4)} BPM` })),
    basis: x,
    analysis: w,
    analyses: j,
    row: z,
    original: h,
    aligned: A,
    thinned: !!x && Math.floor(f * x.bpm / 60) + 1 > 25e3,
    grid: [...h, ...A].sort((L, Z) => L.time - Z.time)
  };
}
function Xg({ comparison: c, onBasis: o, onAnalysis: f }) {
  const { bases: s, basis: b, analyses: v, analysis: E, row: x, thinned: j } = c;
  return /* @__PURE__ */ d.jsxs("section", { className: "stemlab-beat-offset-controls", "aria-label": "BPM grid comparison", children: [
    /* @__PURE__ */ d.jsxs("div", { className: "stemlab-beat-offset-selectors", children: [
      /* @__PURE__ */ d.jsxs("label", { children: [
        "BPM grid ",
        /* @__PURE__ */ d.jsxs("select", { "aria-label": "BPM grid basis", value: b?.id || "", onChange: (w) => o(w.target.value), disabled: !s.length, children: [
          !s.length && /* @__PURE__ */ d.jsx("option", { value: "", children: "BPM unavailable" }),
          s.map((w) => /* @__PURE__ */ d.jsx("option", { value: w.id, children: w.label }, w.id))
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("label", { children: [
        "First beat from ",
        /* @__PURE__ */ d.jsxs("select", { "aria-label": "First beat analysis", value: E?.analysis_id || "", onChange: (w) => f(w.target.value), disabled: !v.length, children: [
          !v.length && /* @__PURE__ */ d.jsx("option", { value: "", children: "Detected beat unavailable" }),
          v.map((w) => /* @__PURE__ */ d.jsx("option", { value: w.analysis_id, children: w.analysis_id }, w.analysis_id))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("p", { className: "stemlab-grid-legend", children: [
      /* @__PURE__ */ d.jsx("span", { className: "stemlab-legend-original", children: "Original grid · source time 0" }),
      /* @__PURE__ */ d.jsx("span", { className: "stemlab-legend-aligned", children: "Offset grid · detected first beat = pip 0" })
    ] }),
    /* @__PURE__ */ d.jsx("output", { "aria-live": "polite", "data-testid": "beat-offset-value", children: x ? `${x.offset_pips.toFixed(6)} pips · first detected beat ${x.first_beat_seconds.toFixed(6)}s · nearest whole offset ${x.integer_offset_pips} pips (${(x.integer_residual_seconds * 1e3).toFixed(3)} ms residual)` : "Waiting for usable beat evidence; no aligned grid is inferred." }),
    E?.constant_grid_fit && /* @__PURE__ */ d.jsxs("p", { className: "small", children: [
      "Selected detector fit: ",
      E.constant_grid_fit.proposed_bpm.toFixed(4),
      " BPM · 95% beat error ",
      E.constant_grid_fit.p95_absolute_beat_error_ms.toFixed(3),
      " ms · grade ",
      E.constant_grid_fit.precision_grade,
      ".",
      b?.fit ? ` Consensus grid fit grade: ${b.fit.precision_grade}.` : ""
    ] }),
    /* @__PURE__ */ d.jsxs("p", { className: "small", children: [
      "Half- and double-time readings are normal. Observed beats stay in their own lanes; tempo-family options compare ×½ / ×1 / ×2 interpretations. Constant grids and detector phases remain estimates.",
      j ? " Dense grids are thinned for display only." : ""
    ] })
  ] });
}
const Qg = "stemlab.beat-timeline.v1", Vu = 64, zl = (c) => Number.isSafeInteger(c);
function Sc(c) {
  if (!c || c.schema !== Qg || c.pips_per_beat !== Vu || !Number.isSafeInteger(c.source_audio?.sample_rate) || c.source_audio.sample_rate < 1 || !Number.isSafeInteger(c.source_audio?.num_frames) || c.source_audio.num_frames < 2 || !/^[0-9a-f]{64}$/.test(c.source_audio?.sha256 || "") || !/^[0-9a-f]{64}$/.test(c.consensus_sha256 || "") || !Array.isArray(c.beats) || c.beats.length < 2 || c.beats.length > 25e3 || !zl(c.origin_beat)) throw new Error("Not a valid source-bound StemLab beat timeline");
  const o = { beat: -1, frame: -1 };
  for (const f of c.beats) {
    if (!zl(f.beat) || !zl(f.frame) || f.beat <= o.beat || f.frame <= o.frame || f.frame >= c.source_audio.num_frames || !["consensus", "corrected", "manual"].includes(f.source) || f.reference_frame !== null && (!zl(f.reference_frame) || f.reference_frame < 0 || f.reference_frame >= c.source_audio.num_frames) || f.source === "consensus" && f.frame !== f.reference_frame || f.source === "manual" && f.reference_frame !== null)
      throw new Error("Beat indices and source sample frames must increase; original consensus timestamps stay immutable");
    o.beat = f.beat, o.frame = f.frame;
  }
  if (!c.beats.some((f) => f.beat === c.origin_beat)) throw new Error("Beat 1 must identify a real anchor");
  return c;
}
const Fa = (c) => ({ ...c, beats: c.beats.map((o) => ({ ...o })) }), ka = (c) => Sc(c), Vg = (c, o) => c.beats[o].frame / c.source_audio.sample_rate, Vn = (c, o) => o < 0 || o + 1 >= c.beats.length ? null : 60 * c.source_audio.sample_rate * (c.beats[o + 1].beat - c.beats[o].beat) / (c.beats[o + 1].frame - c.beats[o].frame), d0 = (c, o) => Math.round(o * c.source_audio.sample_rate);
function l0(c, o, f) {
  const s = Fa(c);
  if (!zl(o) || o < 0 || o >= s.beats.length) throw new Error("Select a beat");
  const b = d0(s, f), v = s.beats[o - 1]?.frame ?? -1, E = s.beats[o + 1]?.frame ?? s.source_audio.num_frames;
  if (!zl(b) || b <= v || b >= E) throw new Error("Beat must remain between its neighbours");
  const x = s.beats[o];
  return x.frame = b, x.source = b === x.reference_frame ? "consensus" : x.reference_frame === null ? "manual" : "corrected", ka(s);
}
function Zg(c, o, f) {
  if (!Number.isFinite(f) || f <= 0 || f > 1200) throw new Error("BPM must be 0..1200");
  const s = Fa(c);
  if (!zl(o) || o < 0 || o + 1 >= s.beats.length) throw new Error("Choose an interval");
  const b = s.beats[o], v = s.beats[o + 1], E = Math.round(60 * (v.beat - b.beat) * s.source_audio.sample_rate / f);
  if (E < 1) throw new Error("BPM exceeds available sample precision");
  const x = b.frame + E - v.frame;
  for (let j = o + 1; j < s.beats.length; j++) {
    const w = s.beats[j];
    w.frame += x, w.source = w.reference_frame === null ? "manual" : w.frame === w.reference_frame ? "consensus" : "corrected";
  }
  return ka(s);
}
function Kg(c, o) {
  if (!Number.isFinite(o) || Math.abs(o) > 1e5) throw new Error("Phase shift is out of bounds");
  const f = Fa(c), s = Vn(f, 0), b = Math.round(o / Vu * (60 / s) * f.source_audio.sample_rate);
  for (const v of f.beats)
    v.frame += b, v.source = v.reference_frame === null ? "manual" : v.frame === v.reference_frame ? "consensus" : "corrected";
  return ka(f);
}
function a0(c, o) {
  const f = Fa(c), s = d0(f, o);
  if (!zl(s) || s < 0 || s >= f.source_audio.num_frames) throw new Error("Beat outside source");
  let b = f.beats.findIndex((w) => w.frame > s);
  if (b < 0 && (b = f.beats.length), b === 0 || b === f.beats.length || f.beats[b - 1].frame === s)
    throw new Error("Insert between two existing anchors; use the timeline selection to move end beats");
  const v = f.beats[b - 1], E = f.beats[b], x = E.beat - v.beat > 1, j = v.beat + 1;
  if (!x) {
    f.origin_beat >= E.beat && (f.origin_beat += 1);
    for (let w = b; w < f.beats.length; w++) f.beats[w].beat += 1;
  }
  return f.beats.splice(b, 0, { beat: j, frame: s, source: "manual", reference_frame: null }), ka(f);
}
function Jg(c, o) {
  const f = Fa(c);
  if (!zl(o) || o < 0 || o >= f.beats.length || f.beats.length <= 2)
    throw new Error("Keep at least two beat anchors");
  const [s] = f.beats.splice(o, 1);
  return s.beat === f.origin_beat && (f.origin_beat = f.beats[Math.min(o, f.beats.length - 1)].beat), ka(f);
}
function $g(c, o) {
  const f = Fa(c);
  if (!zl(o) || o < 0 || o >= f.beats.length) throw new Error("Select Beat 1");
  return f.origin_beat = f.beats[o].beat, ka(f);
}
function Fg(c) {
  const o = Fa(c);
  for (const f of o.beats) f.reference_frame !== null && (f.frame = f.reference_frame, f.source = "consensus");
  return ka(o);
}
function kg(c) {
  const o = Vn(c, 0), f = c.beats.find((s) => s.beat === c.origin_beat);
  return c.beats.map((s) => ({
    time: s.frame / c.source_audio.sample_rate,
    value: Vu * (s.beat - c.origin_beat) - (s.frame - f.frame) * o * Vu / (c.source_audio.sample_rate * 60)
  }));
}
function Wg(c, o, f = 3e3) {
  if (!c?.beats?.length) return [];
  const s = c.source_audio.sample_rate, b = Number.isFinite(o?.start) ? o.start : 0, v = Number.isFinite(o?.end) && o.end > b ? o.end : Number.MAX_VALUE, E = c.beats.filter((j) => j.frame / s >= b - 0.05 && j.frame / s <= v + 0.05), x = Math.max(1, Math.ceil(E.length / f));
  return E.filter((j, w) => w % x === 0).map((j) => ({
    time: j.frame / s,
    emphasis: j.beat === c.origin_beat,
    label: `Corrected beat ${j.beat} · native pip ${(j.beat - c.origin_beat) * Vu}`,
    className: "stemlab-grid-corrected"
  }));
}
const Qu = 20, or = 400, m0 = (c, o, f) => Math.max(o, Math.min(f, c)), n0 = (c) => 100 * (1 - Math.log(m0(c, Qu, or) / Qu) / Math.log(or / Qu)), Ig = (c, o) => Qu * (or / Qu) ** m0(1 - (c - o.top) / o.height, 0, 1);
async function ir(c, o = "GET", f) {
  const s = await fetch(
    `/api/${c}/beat-timeline${o === "POST" ? "/preview" : ""}`,
    { method: o, headers: { "Content-Type": "application/json" }, body: f === void 0 ? void 0 : JSON.stringify(f), cache: "no-store" }
  ), b = await s.json().catch(() => ({}));
  if (!s.ok) throw new Error(b.detail || `Beat timeline HTTP ${s.status}`);
  return b;
}
function Pg({ map: c, duration: o, visible: f, selected: s, onSelect: b, onEdit: v, onInsert: E }) {
  const x = c.source_audio.sample_rate, w = c.beats.map((h, A) => ({ row: h, i: A })).filter(({ row: h }) => {
    const A = h.frame / x;
    return A >= f.start - 0.1 && A <= f.end + 0.1;
  }), z = Math.max(1, Math.ceil(w.length / 2e3));
  return /* @__PURE__ */ d.jsx(
    "div",
    {
      className: "stemlab-beatmap-track",
      "aria-label": "Editable sample-accurate beat anchors",
      onDoubleClick: (h) => {
        if (h.target !== h.currentTarget) return;
        const A = h.currentTarget.getBoundingClientRect();
        E((h.clientX - A.left) / A.width * o), h.stopPropagation();
      },
      children: w.filter((h, A) => A % z === 0).map(({ row: h, i: A }) => /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          className: `stemlab-beatmap-anchor ${h.source} ${s === A ? "selected" : ""} ${h.beat === c.origin_beat ? "origin" : ""}`,
          "aria-label": `Beat ${h.beat}, ${Vg(c, A).toFixed(6)} seconds, ${h.source}; drag or use arrow keys`,
          "aria-pressed": s === A,
          title: `Beat ${h.beat}: frame ${h.frame} · ${(h.frame / x).toFixed(6)} s · ${h.source}${h.reference_frame === null ? "" : ` · reference ${h.reference_frame}`}`,
          style: { left: `${h.frame / (x * Math.max(o, 1e-9)) * 100}%` },
          onPointerDown: (L) => {
            L.currentTarget.setPointerCapture(L.pointerId), b(A), L.stopPropagation();
          },
          onPointerMove: (L) => {
            if (!L.currentTarget.hasPointerCapture(L.pointerId)) return;
            const Z = L.currentTarget.parentElement.getBoundingClientRect();
            v(A, (L.clientX - Z.left) / Z.width * o), L.stopPropagation();
          },
          onPointerUp: (L) => {
            L.currentTarget.releasePointerCapture(L.pointerId), L.stopPropagation();
          },
          onClick: (L) => {
            b(A), L.stopPropagation();
          },
          onKeyDown: (L) => {
            if (L.key !== "ArrowLeft" && L.key !== "ArrowRight") return;
            L.preventDefault(), L.stopPropagation();
            const Z = L.shiftKey ? Math.max(1, Math.round(x / 1e3)) : 1;
            v(A, (h.frame + (L.key === "ArrowLeft" ? -Z : Z)) / x);
          },
          children: /* @__PURE__ */ d.jsx("span", { children: h.beat === c.origin_beat ? "1" : "" })
        },
        h.beat
      ))
    }
  );
}
function tb({ map: c, duration: o, visible: f, selected: s, onSelect: b, onTempo: v }) {
  const E = c.source_audio.sample_rate, x = c.beats.slice(0, -1).map((z, h) => ({
    i: h,
    start: z.frame / E,
    end: c.beats[h + 1].frame / E,
    bpm: Vn(c, h)
  })).filter((z) => z.end >= f.start && z.start <= f.end), j = Math.max(1, Math.ceil(x.length / 1800)), w = x.filter((z, h) => h % j === 0);
  return /* @__PURE__ */ d.jsxs("div", { className: "stemlab-beatmap-tempo", "aria-label": "Editable local BPM envelope", children: [
    /* @__PURE__ */ d.jsx("svg", { className: "stemlab-beatmap-tempo-line", viewBox: "0 0 1000 100", preserveAspectRatio: "none", "aria-hidden": "true", children: /* @__PURE__ */ d.jsx(
      "polyline",
      {
        points: w.map((z) => `${(z.start + z.end) / 2 / Math.max(o, 1e-9) * 1e3},${n0(z.bpm)}`).join(" "),
        fill: "none",
        stroke: "#f4d76e",
        strokeWidth: "1.5",
        vectorEffect: "non-scaling-stroke"
      }
    ) }),
    /* @__PURE__ */ d.jsxs("div", { className: "stemlab-beatmap-extent", "aria-hidden": "true", children: [
      "400 BPM",
      /* @__PURE__ */ d.jsx("br", {}),
      "20 BPM"
    ] }),
    w.map((z) => /* @__PURE__ */ d.jsx(
      "button",
      {
        type: "button",
        className: `stemlab-beatmap-tempo-node ${s === z.i ? "selected" : ""}`,
        style: { left: `${(z.start + z.end) / 2 / Math.max(o, 1e-9) * 100}%`, top: `${n0(z.bpm)}%` },
        title: `Interval ${z.i} → ${z.i + 1}: ${z.bpm.toFixed(3)} BPM · drag vertically to change local tempo`,
        "aria-label": `BPM envelope interval ${z.i}: ${z.bpm.toFixed(3)} BPM`,
        "aria-pressed": s === z.i,
        onPointerDown: (h) => {
          h.currentTarget.setPointerCapture(h.pointerId), b(z.i), h.stopPropagation();
        },
        onPointerMove: (h) => {
          if (!h.currentTarget.hasPointerCapture(h.pointerId)) return;
          const A = h.currentTarget.parentElement.getBoundingClientRect();
          v(z.i, Ig(h.clientY, A)), h.stopPropagation();
        },
        onPointerUp: (h) => {
          h.currentTarget.releasePointerCapture(h.pointerId), h.stopPropagation();
        },
        onClick: (h) => {
          b(z.i), h.stopPropagation();
        },
        onKeyDown: (h) => {
          h.key !== "ArrowUp" && h.key !== "ArrowDown" || (h.preventDefault(), h.stopPropagation(), v(z.i, Math.max(0.01, z.bpm + (h.key === "ArrowUp" ? 1 : -1) * (h.shiftKey ? 0.01 : 1))));
        },
        children: z.bpm.toFixed(1)
      },
      z.i
    ))
  ] });
}
function eb(c, o) {
  const [f, s] = B.useState(null), [b, v] = B.useState(!1), [E, x] = B.useState(null), [j, w] = B.useState(!1), [z, h] = B.useState(!1), [A, L] = B.useState(!0), [Z, at] = B.useState(0), [W, Et] = B.useState({ start: 0, end: 1 / 0 }), [ct, Mt] = B.useState(!1), [Vt, Ut] = B.useState(!0), [zt, P] = B.useState(""), [tt, xt] = B.useState("0"), [I, nt] = B.useState(""), [bt, Gt] = B.useState(!1), [Ft, ot] = B.useState([]), [R, Y] = B.useState([]), G = B.useRef(null), st = B.useRef(0), ft = B.useRef(null);
  ft.current = f;
  const Pt = B.useCallback(async (q = !1) => {
    if (!(j && !q && !window.confirm("Discard unsaved beat edits and reload the saved map?")))
      try {
        const Q = await ir(c);
        if (!Q.available) {
          h(!1);
          return;
        }
        Sc(Q.map), s(Q.map), h(!0), v(Q.saved), x(Q.revision), w(!1), ot([]), Y([]), at(0), P(Vn(Q.map, 0)?.toFixed(3) || ""), nt(Q.saved ? "Loaded saved beat corrections" : "Prepared an editable proposal at exact consensus sample frames");
      } catch (Q) {
        Q.message.includes("HTTP 404") && !ft.current ? L(!1) : nt(Q.message);
      }
  }, [c, j]);
  B.useEffect(() => {
    let q = !0;
    const Q = async () => {
      q && await Pt(!0);
    };
    Q();
    const At = window.setInterval(() => {
      q && !ft.current && Q();
    }, 5e3);
    return () => {
      q = !1, window.clearInterval(At);
    };
  }, [c]);
  const Zt = B.useCallback((q) => {
    try {
      const Q = ft.current;
      if (!Q) return;
      const At = q(Q);
      Q.review_status === "artist_confirmed" && At.review_status === "artist_confirmed" && (At.beats !== Q.beats || At.origin_beat !== Q.origin_beat) && (At.review_status = "estimated"), Sc(At), s(At), w(!0), ot((de) => [...de.slice(-59), Q]), Y([]), nt("Unsaved beat-map edits · original consensus unchanged");
    } catch (Q) {
      nt(Q.message);
    }
  }, []), Oe = () => {
    Ft.length && (Y((q) => [...q.slice(-59), f]), s(Ft.at(-1)), ot((q) => q.slice(0, -1)), w(!0));
  }, g = () => {
    R.length && (ot((q) => [...q.slice(-59), f]), s(R.at(-1)), Y((q) => q.slice(0, -1)), w(!0));
  }, H = (q) => {
    at(q), P(Vn(ft.current, q)?.toFixed(3) || "");
  }, $ = async (q) => {
    const Q = await ir(c, "POST", q);
    return Sc(Q), Q;
  }, J = async () => {
    if (f) {
      Gt(!0);
      try {
        const q = await ir(c, "PUT", { map: f, expected_revision: E });
        s(q.map), v(!0), x(q.revision), w(!1), ot([]), Y([]), nt("Beat corrections saved separately from the consensus detections");
      } catch (q) {
        nt(q.message);
      } finally {
        Gt(!1);
      }
    }
  }, ht = async (q) => {
    if (f) {
      Gt(!0);
      try {
        const Q = await $(f), At = JSON.stringify(Q, null, 2);
        if (q === "copy")
          await navigator.clipboard.writeText(At), nt("Copied one complete beat-timeline JSON value with Beat 1 and pip phase synchronisation");
        else {
          const de = new Blob([At + `
`], { type: "application/json" }), me = URL.createObjectURL(de), we = document.createElement("a");
          we.href = me, we.download = `stemlab-beat-timeline-${c.slice(0, 12)}.json`, document.body.appendChild(we), we.click(), we.remove(), URL.revokeObjectURL(me), nt("Exported a single source-bound beat-timeline JSON file");
        }
      } catch (Q) {
        nt(Q.message);
      } finally {
        Gt(!1);
      }
    }
  }, dt = async (q) => {
    const Q = q.target.files?.[0];
    if (q.target.value = "", !!Q) {
      if (Q.size > 32 * 1024 * 1024) {
        nt("Import limited to 32 MiB");
        return;
      }
      Gt(!0);
      try {
        const At = JSON.parse(await Q.text()), de = await $(At);
        s(de), w(!0), ot((me) => f ? [...me.slice(-59), f] : me), Y([]), nt("Imported and validated: review changes before saving. Original consensus unchanged.");
      } catch (At) {
        nt(At.message);
      } finally {
        Gt(!1);
      }
    }
  }, ut = (q, Q) => Zt((At) => Zg(At, q, Q)), V = () => Zt((q) => Fg(q)), k = f && ct && o > 0 ? [
    {
      id: "corrected:anchors",
      title: "Corrected beats",
      kind: "beatmap",
      height: 80,
      meta: "Drag to place · arrows: 1 sample · Shift: 1 ms · double-click empty space to insert",
      content: { type: "custom", node: /* @__PURE__ */ d.jsx(
        Pg,
        {
          map: f,
          duration: o,
          visible: W,
          selected: Z,
          onSelect: H,
          onEdit: (q, Q) => Zt((At) => l0(At, q, Q)),
          onInsert: (q) => Zt((Q) => a0(Q, q))
        }
      ) }
    },
    {
      id: "corrected:tempo",
      title: "BPM envelope",
      kind: "beatmap",
      height: 110,
      meta: "Actual interval tempo · drag vertically to change BPM (later beats follow)",
      content: { type: "custom", node: /* @__PURE__ */ d.jsx(
        tb,
        {
          map: f,
          duration: o,
          visible: W,
          selected: Z,
          onSelect: H,
          onTempo: ut
        }
      ) }
    },
    {
      id: "corrected:phase",
      title: "Phase CV",
      kind: "beatmap",
      height: 80,
      meta: "Relative pips vs the opening tempo · visible irregular drift",
      content: { type: "curve", points: kg(f).filter((q, Q) => Q % Math.max(1, Math.ceil(f.beats.length / 4e3)) === 0), colour: "#ecb7fd" }
    }
  ] : [], Kt = f && Vt ? Wg(f, W) : [], jt = f?.beats?.[Math.min(Z, f.beats.length - 1)], oe = f?.source_audio?.sample_rate || 1, ce = f && Z < f.beats.length - 1 ? Vn(f, Z) : null, Yt = /* @__PURE__ */ d.jsxs("section", { className: "stemlab-beatmap-panel", "aria-label": "Editable variable tempo and Beat 1 phase", children: [
    /* @__PURE__ */ d.jsxs("header", { children: [
      /* @__PURE__ */ d.jsx("strong", { children: "Beat correction · variable BPM & phase" }),
      f && /* @__PURE__ */ d.jsxs("span", { children: [
        f.beats.length.toLocaleString(),
        " anchors · ",
        b ? "saved" : "consensus draft",
        j ? " · unsaved changes" : ""
      ] }),
      /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => Mt((q) => !q), children: ct ? "Hide editor" : "Show editor" })
    ] }),
    ct && f && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsx("p", { children: "Default = exact saved consensus beat placements. Change individual source-frame anchors, drag BPM envelope nodes, or shift global phase. This does not modify detector evidence or source audio." }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-beatmap-fields", children: [
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Selected beat # ",
          /* @__PURE__ */ d.jsx(
            "input",
            {
              "aria-label": "Selected beat number",
              type: "number",
              min: "0",
              step: "1",
              value: jt?.beat ?? 0,
              onChange: (q) => {
                const Q = f.beats.findIndex((At) => At.beat === Number(q.target.value));
                Q >= 0 && H(Q);
              }
            }
          )
        ] }),
        /* @__PURE__ */ d.jsxs("output", { children: [
          "Frame ",
          jt?.frame ?? 0,
          " · ",
          jt ? (jt.frame / oe).toFixed(6) : "0",
          "s"
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Local BPM ",
          /* @__PURE__ */ d.jsx(
            "input",
            {
              "aria-label": "Selected interval BPM",
              type: "number",
              min: "0.01",
              max: "1200",
              step: "0.001",
              value: zt,
              onChange: (q) => P(q.target.value),
              onKeyDown: (q) => {
                q.key === "Enter" && ut(Z, Number(zt));
              }
            }
          )
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: Z >= f.beats.length - 1, onClick: () => ut(Z, Number(zt)), children: "Apply BPM" }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Phase shift (pips) ",
          /* @__PURE__ */ d.jsx(
            "input",
            {
              "aria-label": "Global phase shift pips",
              type: "number",
              step: "0.25",
              value: tt,
              onChange: (q) => xt(q.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => Zt((q) => Kg(q, Number(tt))), children: "Shift all beats" })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-beatmap-actions", children: [
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => Zt((q) => l0(q, Z, st.current)), children: "Place selected at playhead" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => Zt((q) => a0(q, st.current)), children: "Insert at playhead" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => Zt((q) => $g(q, Z)), children: "Set selected as Beat 1" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => Zt((q) => Jg(q, Z)), children: "Delete selected" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: !Ft.length, onClick: Oe, children: "Undo" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: !R.length, onClick: g, children: "Redo" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: V, children: "Match consensus beats" }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          /* @__PURE__ */ d.jsx("input", { type: "checkbox", checked: Vt, onChange: (q) => Ut(q.target.checked) }),
          "Corrected grid"
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          /* @__PURE__ */ d.jsx(
            "input",
            {
              type: "checkbox",
              checked: f.review_status === "artist_confirmed",
              onChange: (q) => Zt((Q) => ({ ...Q, review_status: q.target.checked ? "artist_confirmed" : "estimated" }))
            }
          ),
          "Artist-reviewed Beat 1 / phase"
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-beatmap-export", children: [
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: bt || !j, onClick: J, children: "Save corrections" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: bt, onClick: () => ht("download"), children: "Export Beat 1 + full beat timeline JSON" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: bt, onClick: () => ht("copy"), children: "Copy JSON value" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: bt, onClick: () => G.current?.click(), children: "Import JSON" }),
        /* @__PURE__ */ d.jsx("input", { ref: G, type: "file", accept: ".json,application/json", hidden: !0, onChange: dt }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => Pt(), children: "Reload saved/consensus" })
      ] }),
      /* @__PURE__ */ d.jsxs("small", { children: [
        "Current local BPM: ",
        ce?.toFixed(3) ?? "last anchor",
        " · original consensus matches remain labelled separately. Native timebase: 64 pips/beat, imported DanceMoves clocks use 16 ticks/beat. DanceMoves supports optional beat-timeline.v1 variable playback where its new consumer is installed; beat-alignment.v1 remains a separate fixed-tempo format."
      ] })
    ] }),
    !z && ct && /* @__PURE__ */ d.jsx("p", { children: "Waiting for an available consensus beat list (and exact master audio). No timing is invented." }),
    I && /* @__PURE__ */ d.jsx("output", { role: "status", className: "stemlab-beatmap-status", children: I })
  ] });
  return {
    map: f,
    revision: E,
    saved: b,
    ready: z,
    dirty: j,
    lanes: k,
    grid: Kt,
    panel: A ? Yt : null,
    onWindowChange: Et,
    onTimeChange: (q) => {
      st.current = q;
    }
  };
}
const dr = Object.freeze(["SECTION", "ENTRY", "DROP", "BREAK"]), Xu = Object.freeze([
  "INTRO",
  "VOCAL INTRO",
  "VERSE",
  "PRE-CHORUS",
  "CHORUS",
  "POST-CHORUS",
  "BUILD",
  "DROP",
  "FINAL DROP",
  "POST-DROP",
  "BRIDGE",
  "BREAK",
  "BREAKDOWN",
  "SPOKEN BREAKDOWN",
  "INSTRUMENTAL",
  "INTERLUDE",
  "SOLO",
  "HOOK",
  "REFRAIN",
  "MIDDLE EIGHT",
  "OUTRO"
]), Za = (c, o) => Math.round(Number(c) * o);
function yr(c, o) {
  const f = String(c).trim().toUpperCase(), s = String(o).trim().toUpperCase().replace(/ +/g, " ");
  if (!dr.includes(f)) throw new Error("Cue type must be SECTION, ENTRY, DROP or BREAK");
  const b = /^([A-Z][A-Z -]*?)(?: ([1-9][0-9]{0,2}|A|B|FINAL))?$/.exec(s);
  if (!b || !Xu.includes(b[1]) || s.length > 64)
    throw new Error("Use a standard section (INTRO, VERSE 1, CHORUS, BUILD 1, DROP 1, OUTRO, etc.)");
  return { type: f, section: s, label: `[${f}: ${s}]` };
}
const gr = (c) => ({ ...c, lines: c.lines.map((o) => ({ ...o })), words: c.words.map((o) => ({ ...o })), cues: c.cues.map((o) => ({ ...o })), fixed_clock: { ...c.fixed_clock } });
function Qn(c, o, f, s) {
  if (!Number.isSafeInteger(c) || c < o || c > f) throw new Error(`${s} cannot cross its parent, another event or source duration`);
  return c;
}
function lb(c, o = "start_frame") {
  return c.every((f, s) => s === 0 || f[o] >= c[s - 1][o]);
}
function ab(c, o, f) {
  const s = gr(c), b = c.sample_rate, v = c.num_frames;
  if (!Number.isSafeInteger(b) || !Number.isSafeInteger(v) || b < 1 || v < 2) throw new Error("Invalid source-frame metadata");
  if (o === "cue") {
    const E = s.cues.findIndex((z) => z.id === f.id);
    if (E < 0) throw new Error("Cue not found");
    const x = s.cues[E], j = yr(f.type ?? x.type, f.section ?? x.section), w = Qn(Za(f.start, b), 0, v - 1, "Cue");
    if (s.cues[E] = { ...s.cues[E], frame: w, type: j.type, section: j.section }, !lb(s.cues, "frame")) throw new Error("Cue movement must preserve chronological order");
  } else if (o === "line") {
    const E = s.lines.findIndex((A) => A.id === f.id);
    if (E < 0) throw new Error("Lyric line not found");
    const x = s.lines[E], j = Qn(Za(f.start, b), 0, v - 1, "Line"), w = Qn(Za(f.end, b), j + 1, v, "Line");
    if (E > 0 && j < s.lines[E - 1].end_frame || E + 1 < s.lines.length && w > s.lines[E + 1].start_frame)
      throw new Error("Lyric line cannot cross neighbouring line bounds");
    s.lines[E] = { ...x, start_frame: j, end_frame: w };
    const z = j - x.start_frame, h = w - j === x.end_frame - x.start_frame;
    for (const A of s.words) if (A.line_id === x.id && (h && (A.start_frame += z, A.end_frame += z), A.start_frame < j || A.end_frame > w))
      throw new Error("Line edit would cut off a word; adjust its words first");
  } else if (o === "word") {
    const E = s.words.findIndex((L) => L.id === f.id);
    if (E < 0) throw new Error("Word not found");
    const x = s.words[E], j = s.lines.find((L) => L.id === x.line_id);
    if (!j) throw new Error("Word parent line missing");
    const w = Qn(Za(f.start, b), j.start_frame, j.end_frame - 1, "Word"), z = Qn(Za(f.end, b), w + 1, j.end_frame, "Word"), h = s.words.filter((L) => L.line_id === x.line_id), A = h.findIndex((L) => L.id === x.id);
    if (A > 0 && w < h[A - 1].end_frame || A + 1 < h.length && z > h[A + 1].start_frame)
      throw new Error("Word cannot overlap a neighbour within the same lyric line");
    s.words[E] = { ...x, start_frame: w, end_frame: z };
  } else throw new Error("Expected line, word or cue edit");
  return s.review_status = "draft", s;
}
function nb(c, o, f, s = {}) {
  const b = gr(c), v = c.sample_rate, E = Qn(Za(f, v), 0, c.num_frames - 1, "Playhead"), x = new Set([...c.lines, ...c.words, ...c.cues].map((z) => z.id)), j = { line: "line", word: "word", cue: "cue" }[o];
  if (!j) throw new Error("Unknown timing track");
  let w;
  for (let z = 1; z <= 1e5 && (w = `${j}-edit-${z}`, !!x.has(w)); z++)
    ;
  if (x.has(w)) throw new Error("Too many events");
  if (o === "cue") {
    const { type: z, section: h } = yr(s.type || "SECTION", s.section || "INTRO");
    b.cues.push({ id: w, frame: E, type: z, section: h }), b.cues.sort((A, L) => A.frame - L.frame);
  } else if (o === "line") {
    const z = String(s.text || "").trim();
    if (!z) throw new Error("Type lyric text before adding a line");
    const h = c.lines.find((Z) => Z.start_frame > E), A = [...c.lines].reverse().find((Z) => Z.start_frame <= E);
    if (A && E < A.end_frame) throw new Error("Playhead is inside an existing line");
    const L = Math.min(c.num_frames, h?.start_frame ?? c.num_frames, E + Math.round(v * 2));
    if (L <= E) throw new Error("No room for a new line");
    b.lines.push({ id: w, start_frame: E, end_frame: L, text: z }), b.lines.sort((Z, at) => Z.start_frame - at.start_frame);
  } else {
    const z = b.lines.find((W) => W.id === s.lineId);
    if (!z) throw new Error("Select a lyric line before adding its word");
    const h = String(s.word || "").trim();
    if (!h) throw new Error("Type word text before adding a word");
    if (E < z.start_frame || E >= z.end_frame) throw new Error("Playhead must be within selected lyric line");
    const A = b.words.filter((W) => W.line_id === z.id), L = A.find((W) => W.start_frame > E), Z = [...A].reverse().find((W) => W.start_frame <= E);
    if (Z && Z.end_frame > E) throw new Error("Playhead is already within another word");
    const at = Math.min(z.end_frame, L?.start_frame ?? z.end_frame, E + Math.round(v * 0.25));
    if (at <= E) throw new Error("No room within the selected lyric line");
    b.words.push({ id: w, line_id: z.id, start_frame: E, end_frame: at, word: h }), b.words.sort((W, Et) => W.start_frame - Et.start_frame);
  }
  return b.review_status = "draft", b;
}
function ub(c, o, f) {
  const s = gr(c), b = { line: "lines", word: "words", cue: "cues" }[o];
  if (!b) throw new Error("Invalid track");
  if (o === "line" && s.words.some((v) => v.line_id === f)) throw new Error("Delete or reassign words before deleting their line");
  return s[b] = s[b].filter((v) => v.id !== f), s.review_status = "draft", s;
}
const pc = async (c, o = "GET", f = null, s = "") => {
  const b = await fetch(`/api/${c}/song-timing${s}`, {
    method: o,
    headers: f ? { "Content-Type": "application/json" } : void 0,
    body: f ? JSON.stringify(f) : void 0,
    cache: "no-store"
  }), v = await b.json();
  if (!b.ok) throw new Error(v.detail || `Timing edits HTTP ${b.status}`);
  return v;
}, u0 = (c, o) => c / o, qu = (c, o) => `stemlab-${o.slice(0, 12)}-${c}`;
function ib(c, o, f) {
  const s = new Blob([c], { type: f }), b = URL.createObjectURL(s), v = document.createElement("a");
  try {
    v.href = b, v.download = o, document.body.appendChild(v), v.click(), v.remove();
  } finally {
    window.setTimeout(() => URL.revokeObjectURL(b), 1e3);
  }
}
function cb(c, o, f) {
  const [s, b] = B.useState(null), [v, E] = B.useState(!1), [x, j] = B.useState(null), [w, z] = B.useState(!1), [h, A] = B.useState(!1), [L, Z] = B.useState(!1), [at, W] = B.useState({ kind: "line", id: null }), [Et, ct] = B.useState(""), [Mt, Vt] = B.useState(!1), [Ut, zt] = B.useState(0.15), [P, tt] = B.useState(!1), [xt, I] = B.useState({ start: 0, end: 1 / 0 }), [nt, bt] = B.useState(""), [Gt, Ft] = B.useState(""), [ot, R] = B.useState("SECTION"), [Y, G] = B.useState("INTRO"), [st, ft] = B.useState("lines"), [Pt, Zt] = B.useState("bundle"), Oe = B.useRef(0), g = B.useRef(null), H = B.useRef(null), $ = B.useRef(c), J = B.useRef(!1);
  H.current = s;
  const ht = B.useCallback(async (O = !1) => {
    if (!(!O && H.current && w && !window.confirm("Discard unsaved song timing changes?")))
      try {
        const et = await pc(c);
        if (!et.available) {
          ct(et.reason || "Waiting for exact source audio");
          return;
        }
        if ($.current !== c) return;
        b(et.document), E(et.saved), j(et.revision), z(!1), W({ kind: "line", id: et.document.lines[0]?.id ?? null }), ct(et.warnings?.join(" · ") || "Song timing loaded · source evidence unchanged");
      } catch (et) {
        ct(et.message);
      }
  }, [c, w]);
  B.useEffect(() => {
    $.current = c, b(null), j(null), z(!1), W({ kind: "line", id: null }), ht(!0);
    const O = window.setInterval(() => {
      !H.current && !J.current && ht(!0);
    }, 5e3);
    return () => window.clearInterval(O);
  }, [c]);
  const dt = B.useCallback((O) => {
    try {
      const et = H.current;
      if (!et) return;
      const Jt = O(et);
      b(Jt), z(!0), ct("Unsaved song timing edits · original evidence preserved");
    } catch (et) {
      ct(et.message);
    }
  }, []), ut = s?.sample_rate || 1, V = s ? s.num_frames / ut : Math.max(0, o), k = s?.lines.find((O) => O.id === (at.kind === "line" ? at.id : s?.words.find((et) => et.id === at.id)?.line_id)) ?? s?.lines[0] ?? null, Kt = at.kind, jt = s?.[Kt === "line" ? "lines" : Kt === "word" ? "words" : "cues"].find((O) => O.id === at.id) ?? null, oe = !!(f?.map?.beats?.length && f?.map?.source_audio?.sha256 === c), ce = f?.revision ?? null, Yt = s?.clock_mode === "variable", q = B.useMemo(() => s ? s.clock_mode === "variable" ? oe ? { ...f.map, mode: "variable" } : null : { mode: "fixed", bpm: s.fixed_clock.bpm, firstBeatSeconds: s.fixed_clock.first_beat_frame / ut } : null, [s, oe, f?.map, ut]), Q = (O) => {
    dt((et) => ({ ...et, clock_mode: O, beat_revision: O === "variable" ? ce : null, review_status: "draft" }));
  }, At = (O, et) => dt((Jt) => ({ ...Jt, fixed_clock: { ...Jt.fixed_clock, [O]: et }, review_status: "draft" })), de = (O, et) => dt((Jt) => ab(Jt, O, et)), me = (O) => dt((et) => nb(et, O, Oe.current, {
    text: nt,
    word: Gt,
    lineId: k?.id,
    type: ot,
    section: Y
  })), we = (O, et, Jt) => dt((te) => {
    if (!Jt.trim() || /\r|\n|[\x00-\x1f]/.test(Jt)) throw new Error("Text must be nonempty, without newlines");
    const fe = O === "line" ? "lines" : "words", Sa = O === "line" ? "text" : "word";
    return { ...te, [fe]: te[fe].map((Wa) => Wa.id === et ? { ...Wa, [Sa]: Jt.trim() } : Wa), review_status: "draft" };
  }), Be = (O, et, Jt) => dt((te) => {
    const fe = yr(et, Jt);
    return { ...te, cues: te.cues.map((Sa) => Sa.id === O ? { ...Sa, type: fe.type, section: fe.section } : Sa), review_status: "draft" };
  }), pa = async () => {
    if (s) {
      A(!0), J.current = !0;
      try {
        if (Yt && (f?.dirty || !oe)) throw new Error("Save/reload the corrected beat map first; an enabled variable clock must refer to the current real beat map");
        const O = await pc(c, "PUT", { document: s, expected_revision: x });
        b(O.document), j(O.revision), E(!0), z(!1), ct("Saved exact source-frame corrections · original canonical, cue and ASR files unchanged");
      } catch (O) {
        ct(O.message);
      } finally {
        A(!1), J.current = !1;
      }
    }
  }, Vl = async () => {
    if (s) {
      A(!0), J.current = !0;
      try {
        if (Yt && (f?.dirty || !oe)) throw new Error("Save and verify the exact beat map before exporting variable-clock timing");
        const O = await pc(c, "POST", { document: s }, "/preview"), et = {
          bundle: [JSON.stringify(O, null, 2) + `
`, qu("timing-bundle", c) + ".json", "application/json"],
          lines: [O.line_lrc, qu("lines", c) + ".lrc", "text/plain;charset=utf-8"],
          words: [O.word_tsv, qu("words", c) + ".tsv", "text/tab-separated-values;charset=utf-8"],
          wordjson: [JSON.stringify(O.word_json, null, 2) + `
`, qu("words", c) + ".json", "application/json"],
          cues: [O.cue_lrc, qu("cues", c) + ".lrc", "text/plain;charset=utf-8"]
        };
        ib(...et[Pt]), ct(`Exported ${Pt} · source-bound clock and all timing forms remain available via the bundle`);
      } catch (O) {
        ct(O.message);
      } finally {
        A(!1), J.current = !1;
      }
    }
  }, C = async (O) => {
    const et = O.target.files?.[0];
    if (O.target.value = "", !et || !s) return;
    if (et.size > 1048576) {
      ct("Timing import limited to 1 MiB");
      return;
    }
    const Jt = et.name.split(".").at(-1).toLowerCase();
    A(!0), J.current = !0;
    try {
      const te = await pc(c, "POST", { document: s, kind: st, format: Jt, text: await et.text() }, "/import");
      b(te.document), z(!0), ct(`Imported ${st} for review; not saved until Save corrections`);
    } catch (te) {
      ct(te.message);
    } finally {
      A(!1), J.current = !1;
    }
  }, rt = (O) => {
    const et = O.start_frame ?? O.frame, Jt = O.end_frame ?? et;
    return et / ut <= xt.end + 0.01 && Jt / ut >= xt.start - 0.01;
  }, vt = (O, et) => ({
    id: O.id,
    label: et === "cue" ? `[${O.type}: ${O.section}]` : et === "word" ? O.word : O.text,
    ...et === "cue" ? { type: O.type, section: O.section } : {},
    start: u0(O.start_frame ?? O.frame, ut),
    ...et === "cue" ? {} : { end: u0(O.end_frame, ut) },
    ...et === "word" ? { parentId: O.line_id } : {}
  }), se = s?.lines || [], le = (s?.words || []).filter((O) => O.line_id === k?.id), he = (O, et, Jt = null) => ({
    id: `timing:${O}`,
    kind: `timing-${O}`,
    title: O === "line" ? "Lyric lines · editable" : O === "word" ? `Words · ${k?.text || "select a line"}` : "Cue sections · editable",
    meta: `${et.length} ${O} events · drag or arrow to adjust · ${q?.mode || "no clock"} match`,
    height: O === "word" ? 88 : 94,
    content: {
      type: "timing",
      kind: O,
      clock: q,
      editable: !0,
      snap: Mt,
      toleranceSeconds: Ut,
      items: et.filter(rt).slice(0, 1600).map((te) => vt(te, O)),
      parents: Jt ? Jt.map((te) => ({ id: te.id, start: te.start_frame / ut, end: te.end_frame / ut })) : void 0,
      selectedId: at.kind === O ? at.id : null,
      onSelect: (te) => W({ kind: O, id: te }),
      onEdit: (te) => de(O, te)
    }
  }), ze = s && L ? [
    he("line", se),
    he("word", le, se),
    he("cue", s.cues)
  ] : [], ve = /* @__PURE__ */ d.jsxs("section", { className: "stemlab-timing-panel", "aria-label": "Editable lyric, word and cue timing", children: [
    /* @__PURE__ */ d.jsxs("header", { children: [
      /* @__PURE__ */ d.jsx("strong", { children: "Song timing · line lyrics, words & cue sections" }),
      /* @__PURE__ */ d.jsx("span", { children: s ? `${s.lines.length} lines · ${s.words.length} words · ${s.cues.length} cues · ${w ? "unsaved" : "saved/seeded"}` : "Awaiting master" }),
      /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => Z((O) => !O), children: L ? "Hide timing editor" : "Show timing editor" })
    ] }),
    L && s && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsx("p", { children: "Line, word and cue edits are kept in a separate source-bound document. Choose a lyric line to adjust its individual words. Cue names must follow the established [SECTION: VERSE 1] / [DROP: CHORUS 1] convention." }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-timing-fields", children: [
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Timing clock ",
          /* @__PURE__ */ d.jsxs("select", { "aria-label": "Timing clock", value: s.clock_mode, onChange: (O) => Q(O.target.value), children: [
            /* @__PURE__ */ d.jsx("option", { value: "fixed", children: "Fixed BPM + Beat 1 offset" }),
            /* @__PURE__ */ d.jsx("option", { value: "variable", disabled: !oe, children: "Corrected variable BPM beat map" })
          ] })
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Fixed BPM ",
          /* @__PURE__ */ d.jsx(
            "input",
            {
              type: "number",
              min: "20",
              max: "400",
              step: ".001",
              value: s.fixed_clock.bpm,
              onChange: (O) => At("bpm", Number(O.target.value))
            }
          )
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Fixed Beat 1 (seconds) ",
          /* @__PURE__ */ d.jsx(
            "input",
            {
              type: "number",
              min: "0",
              max: V,
              step: ".001",
              value: s.fixed_clock.first_beat_frame / ut,
              onChange: (O) => At("first_beat_frame", Za(O.target.value, ut))
            }
          )
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          /* @__PURE__ */ d.jsx("input", { type: "checkbox", checked: Mt, onChange: (O) => Vt(O.target.checked) }),
          "Snap near real/fixed beats"
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Snap tolerance (ms) ",
          /* @__PURE__ */ d.jsx(
            "input",
            {
              type: "number",
              min: "0",
              max: "1000",
              step: "10",
              value: Math.round(Ut * 1e3),
              onChange: (O) => zt(Math.max(0, Math.min(1, Number(O.target.value) / 1e3)))
            }
          )
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          /* @__PURE__ */ d.jsx("input", { type: "checkbox", checked: P, onChange: (O) => tt(O.target.checked) }),
          "Beat grid overlay"
        ] })
      ] }),
      Yt && !oe && /* @__PURE__ */ d.jsx("p", { role: "alert", children: "Variable BPM is selected but its source-bound beat map is unavailable; no silent fixed-BPM downgrade." }),
      Yt && f?.dirty && /* @__PURE__ */ d.jsx("p", { role: "alert", children: "Save the beat-map corrections before saving/exporting lyric and cue timing changes." }),
      Yt && oe && s.beat_revision !== ce && /* @__PURE__ */ d.jsxs("p", { role: "alert", children: [
        "The saved beat-map revision has changed. Review its timing, then explicitly rebind these lyrics and cues to that revision. ",
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: f.dirty, onClick: () => dt((O) => ({ ...O, beat_revision: ce, review_status: "draft" })), children: "Rebind to reviewed beat-map revision" })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-timing-fields", children: [
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Selected line ",
          /* @__PURE__ */ d.jsxs("select", { "aria-label": "Selected lyric line", value: k?.id || "", onChange: (O) => W({ kind: "line", id: O.target.value }), children: [
            /* @__PURE__ */ d.jsx("option", { value: "", children: "Choose line" }),
            s.lines.map((O) => /* @__PURE__ */ d.jsx("option", { value: O.id, children: O.text.slice(0, 75) }, O.id))
          ] })
        ] }),
        jt && Kt !== "cue" && /* @__PURE__ */ d.jsxs("label", { children: [
          Kt === "line" ? "Line text" : "Word text",
          /* @__PURE__ */ d.jsx(
            "input",
            {
              "aria-label": "Selected text",
              value: Kt === "line" ? jt.text : jt.word,
              onChange: (O) => we(Kt, jt.id, O.target.value)
            }
          )
        ] }),
        jt && Kt === "cue" && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
          /* @__PURE__ */ d.jsxs("label", { children: [
            "Cue type ",
            /* @__PURE__ */ d.jsx("select", { value: jt.type, onChange: (O) => Be(jt.id, O.target.value, jt.section), children: dr.map((O) => /* @__PURE__ */ d.jsx("option", { value: O, children: O }, O)) })
          ] }),
          /* @__PURE__ */ d.jsxs("label", { children: [
            "Standard section ",
            /* @__PURE__ */ d.jsx(
              "select",
              {
                value: Xu.find((O) => jt.section === O || jt.section.startsWith(O + " ")) || "INTRO",
                onChange: (O) => Be(jt.id, jt.type, O.target.value),
                children: Xu.map((O) => /* @__PURE__ */ d.jsx("option", { value: O, children: O }, O))
              }
            )
          ] }),
          /* @__PURE__ */ d.jsxs("label", { children: [
            "Section number / suffix ",
            /* @__PURE__ */ d.jsxs(
              "select",
              {
                "aria-label": "Cue section suffix",
                value: jt.section.match(/ (\d+|A|B|FINAL)$/)?.[1] || "",
                onChange: (O) => {
                  const et = Xu.find((Jt) => jt.section === Jt || jt.section.startsWith(Jt + " ")) || "INTRO";
                  Be(jt.id, jt.type, et + (O.target.value ? " " + O.target.value : ""));
                },
                children: [
                  /* @__PURE__ */ d.jsx("option", { value: "", children: "None" }),
                  Array.from({ length: 64 }, (O, et) => String(et + 1)).concat(["A", "B", "FINAL"]).map((O) => /* @__PURE__ */ d.jsx("option", { value: O, children: O }, O))
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-timing-fields", children: [
        /* @__PURE__ */ d.jsxs("label", { children: [
          "New line text ",
          /* @__PURE__ */ d.jsx("input", { value: nt, placeholder: "Lyrics line", onChange: (O) => bt(O.target.value) })
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => me("line"), children: "Add line at playhead" }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "New word ",
          /* @__PURE__ */ d.jsx("input", { value: Gt, placeholder: "Single word", onChange: (O) => Ft(O.target.value) })
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: !k, onClick: () => me("word"), children: "Add word inside selected line" })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-timing-fields", children: [
        /* @__PURE__ */ d.jsxs("label", { children: [
          "New cue type ",
          /* @__PURE__ */ d.jsx("select", { value: ot, onChange: (O) => R(O.target.value), children: dr.map((O) => /* @__PURE__ */ d.jsx("option", { children: O }, O)) })
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Section ",
          /* @__PURE__ */ d.jsx("select", { value: Y, onChange: (O) => G(O.target.value), children: Xu.map((O) => /* @__PURE__ */ d.jsx("option", { children: O }, O)) })
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => me("cue"), children: "Add cue at playhead" }),
        /* @__PURE__ */ d.jsxs("button", { type: "button", disabled: !jt, onClick: () => dt((O) => ub(O, Kt, at.id)), children: [
          "Delete selected ",
          Kt
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          /* @__PURE__ */ d.jsx("input", { type: "checkbox", checked: s.review_status === "artist_confirmed", onChange: (O) => dt((et) => ({ ...et, review_status: O.target.checked ? "artist_confirmed" : "draft" })) }),
          "Artist-reviewed timing"
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-timing-actions", children: [
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: h || !w, onClick: pa, children: "Save source-frame corrections" }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Export format ",
          /* @__PURE__ */ d.jsxs("select", { value: Pt, onChange: (O) => Zt(O.target.value), children: [
            /* @__PURE__ */ d.jsx("option", { value: "bundle", children: "Complete JSON bundle" }),
            /* @__PURE__ */ d.jsx("option", { value: "lines", children: "Line LRC" }),
            /* @__PURE__ */ d.jsx("option", { value: "words", children: "Word TSV" }),
            /* @__PURE__ */ d.jsx("option", { value: "wordjson", children: "Word JSON" }),
            /* @__PURE__ */ d.jsx("option", { value: "cues", children: "Named cue LRC" })
          ] })
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: h, onClick: Vl, children: "Download selection" }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Import track ",
          /* @__PURE__ */ d.jsxs("select", { value: st, onChange: (O) => ft(O.target.value), children: [
            /* @__PURE__ */ d.jsx("option", { value: "lines", children: "Per-line LRC" }),
            /* @__PURE__ */ d.jsx("option", { value: "words", children: "Per-word LRC/TSV/JSON" }),
            /* @__PURE__ */ d.jsx("option", { value: "cues", children: "Section-cue LRC" })
          ] })
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: h, onClick: () => g.current?.click(), children: "Choose timing file" }),
        /* @__PURE__ */ d.jsx("input", { ref: g, type: "file", hidden: !0, accept: st === "words" ? ".lrc,.tsv,.json" : ".lrc", onChange: C }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: h, onClick: () => ht(), children: "Reload saved" })
      ] }),
      /* @__PURE__ */ d.jsx("small", { children: "Word positions must stay inside their lyric line. An off-grid word/cue is preserved until you explicitly drag or enable nearby-beat snapping. Pips=64/beat, DanceMoves ticks=16/beat. LRC/TSV exports round timestamps; the JSON retains native frames." })
    ] }),
    L && !s && /* @__PURE__ */ d.jsx("p", { children: "Waiting for decoded source audio; no lyric or cue times are invented." }),
    Et && /* @__PURE__ */ d.jsx("output", { role: "status", className: "stemlab-timing-status", children: Et })
  ] });
  return { clock: q, lanes: ze, panel: ve, gridVisible: P, onWindowChange: I, onTimeChange: (O) => {
    Oe.current = O;
  } };
}
function sb(c, o) {
  if (!c || c.schema !== "stemlab.loops.v1") return [];
  const f = c.sample_rate;
  return !Number.isSafeInteger(f) || f <= 0 ? [] : (c.loops || []).flatMap((s) => {
    if (!/^(verse|chorus)-\d+-\d+$/.test(s.id) || !Number.isSafeInteger(s.start_sample) || !Number.isSafeInteger(s.end_sample) || s.start_sample < 0 || s.end_sample <= s.start_sample || s.end_sample > c.source_frames) return [];
    const b = encodeURIComponent(`${c.source_sha256}:${s.start_sample}:${s.end_sample}`);
    return [{
      id: s.id,
      label: `${s.section_label} · ${s.bars} bar${s.bars === 1 ? "" : "s"}`,
      startSample: s.start_sample,
      endSample: s.end_sample,
      sampleRate: f,
      // Exact native-rate PCM excerpt, computed read-only whether or not --export-loops was used.
      audioSrc: `/api/${o}/loops/${encodeURIComponent(s.id)}/audio?v=${b}`,
      downloadUrl: s.file && /^audio\/[a-zA-Z0-9._-]+\.wav$/.test(s.file) ? `/${o}/deep/loops/${s.file.split("/").map(encodeURIComponent).join("/")}` : void 0
    }];
  });
}
function fb(c) {
  const [o, f] = B.useState({ report: null, error: "" });
  B.useEffect(() => {
    let b = !0, v, E = "";
    const x = new AbortController();
    f({ report: null, error: "" });
    const j = async () => {
      try {
        const w = await fetch(`/${c}/deep/loops/loops.json`, {
          cache: "no-store",
          signal: x.signal
        });
        if (!b) return;
        if (w.status === 404)
          E = "", f({ report: null, error: "" });
        else {
          if (!w.ok) throw new Error(`Loop report: HTTP ${w.status}`);
          const z = await w.json();
          if (z.schema === "stemlab.loop-availability.v1" && z.status === "not-analysed") {
            f({ report: null, error: "", note: z.reason });
            return;
          }
          if (z.schema !== "stemlab.loops.v1") throw new Error("Unsupported loop report schema");
          const h = JSON.stringify(z);
          b && h !== E && (f({ report: z, error: "" }), E = h);
        }
      } catch (w) {
        b && w.name !== "AbortError" && (E = "", f({ report: null, error: w.message }));
      } finally {
        b && (v = window.setTimeout(j, 2500));
      }
    };
    return j(), () => {
      b = !1, x.abort(), window.clearTimeout(v);
    };
  }, [c]);
  const s = B.useMemo(() => sb(o.report, c), [o.report, c]);
  return { ...o, loops: s };
}
function rb({ state: c, hash: o }) {
  const f = c.report;
  return c.error ? /* @__PURE__ */ d.jsx("p", { role: "alert", className: "stemlab-loop-summary", children: c.error }) : c.note ? /* @__PURE__ */ d.jsx("p", { className: "stemlab-loop-summary", children: c.note }) : f ? /* @__PURE__ */ d.jsxs("details", { className: "stemlab-loop-summary", open: f.unresolved_sections.length > 0, children: [
    /* @__PURE__ */ d.jsxs("summary", { children: [
      f.loop_count,
      " loop(s) · ",
      f.unresolved_sections.length,
      " unresolved section(s) · ",
      /* @__PURE__ */ d.jsx("a", { href: `/${o}/deep/loops/loops.json`, target: "_blank", rel: "noopener", children: "Sample report" })
    ] }),
    /* @__PURE__ */ d.jsx("p", { children: "Choose a loop region or use the Loop selector, tick Enable loop, then press Play. Previewing writes no files." }),
    f.unresolved_sections.map((s) => /* @__PURE__ */ d.jsxs("p", { children: [
      /* @__PURE__ */ d.jsxs("strong", { children: [
        s.label,
        ":"
      ] }),
      " ",
      s.reason
    ] }, s.index))
  ] }) : /* @__PURE__ */ d.jsxs("p", { className: "stemlab-loop-summary", children: [
    "No loop report yet. New analyses discover loops automatically; for existing results run ",
    /* @__PURE__ */ d.jsx("code", { children: "stemlab loops RESULTS_DIR" }),
    "."
  ] });
}
const Ce = (c) => document.querySelector(c), ob = Ce("#uploadView"), br = Ce("#timelineView"), $a = Ce("#dropZone"), Zu = Ce("#fileInput"), h0 = Ce("#chooseButton"), v0 = Ce("#uploadProgressWrap"), _c = Ce("#uploadProgress"), Ec = Ce("#uploadLabel"), Xn = Ce("#connectionBadge"), y0 = Ce("#canonicalBpm"), g0 = Ce("#canonicalLyrics"), b0 = Ce("#canonicalTiming"), mr = Ce("#knownInfoStatus"), db = Ce("#loadArcadiansReference"), mb = Ce("#loadArcadiansHero"), hb = Array.from(br.children), pr = document.createElement("div");
pr.id = "timelineRoot";
br.replaceChildren(pr);
for (const c of hb) c.remove();
const vb = Ng.createRoot(pr), yb = /* @__PURE__ */ new Set(["wav", "flac", "mp3", "ogg", "opus", "m4a", "aif", "aiff"]);
let hr = {};
function gb(c) {
  const o = String(c).split("/").pop() || "", f = o.lastIndexOf(".");
  return f >= 0 ? o.slice(f + 1).toLowerCase() : "";
}
function Ol(c) {
  return String(c).replace(/^stems\//, "").replace(/^spectrograms\//, "").replace(/^vamp\/data\//, "Vamp · ").replace(/^beats\//, "Beats · ").replace(/^speech\//, "Speech · ").replace(/^deep\//, "Deep · ").replace(/[_-]+/g, " ");
}
function Sr(c, o) {
  return `/${c}/${o.split("/").map(encodeURIComponent).join("/")}`;
}
function Tc(c, o, f = "Generated analysis artifact") {
  return { type: "artifact", note: f, href: o === "__source__" ? `/api/${c}/source` : Sr(c, o) };
}
async function sl(c, o) {
  const f = await fetch(Sr(c, o), { cache: "no-store" });
  if (!f.ok) throw new Error(`HTTP ${f.status}`);
  return f.json();
}
function vl(c, o = 2, f = "") {
  const s = Number(c);
  return Number.isFinite(s) ? `${s.toFixed(o)}${f}` : "—";
}
function Va(c, o, f, s, b = "feature") {
  const v = s.filter(([, E]) => E != null && E !== "");
  return {
    id: c,
    title: o,
    meta: f,
    kind: b,
    content: {
      type: "summary",
      items: (v.length ? v : [["status", "analysis available"]]).map(([E, x]) => ({ label: E, value: x }))
    }
  };
}
function Nc(c) {
  return (c || []).flatMap((o) => {
    const f = Number(o.start);
    if (!Number.isFinite(f)) return [];
    const s = Number(o.end);
    return [{
      start: f,
      end: Number.isFinite(s) && s > f ? s : f + 0.5,
      label: o.label || o.text || o.values?.[0] || ""
    }];
  });
}
function bb(c) {
  const o = Array.isArray(c.events) ? c.events : [];
  switch (String(c.kind || "")) {
    case "curve":
      return { type: "curve", points: o.flatMap((f) => {
        const s = Number(f.start), b = Number(f.values?.[0]);
        return Number.isFinite(s) && Number.isFinite(b) && b > 0 ? [{ time: s, value: b }] : [];
      }) };
    case "matrix":
      return { type: "matrix", rows: o.map((f) => f.values || []).filter((f) => f.length) };
    case "notes":
      return { type: "notes", items: o.flatMap((f) => {
        const s = Number(f.values?.[0]), b = Number(f.start);
        if (!Number.isFinite(s) || s <= 0 || !Number.isFinite(b)) return [];
        const v = Number(f.end);
        return [{ start: b, end: Number.isFinite(v) && v > b ? v : b + 0.12, value: s, label: f.label }];
      }) };
    case "segments":
      return { type: "blocks", items: Nc(o) };
    case "events":
      return { type: "markers", items: o.flatMap((f) => Number.isFinite(Number(f.start)) ? [{ time: Number(f.start) }] : []) };
    default:
      return { type: "artifact", note: o[0]?.label || o[0]?.values?.join(", ") || c.title || "analysis" };
  }
}
async function p0(c, o, f, s, b) {
  const v = new URLSearchParams({ path: b, points: "12000" }), E = await fetch(`/api/${c}/waveform?${v}`);
  if (!E.ok) return { id: o, title: f, meta: s, kind: "artifact", content: Tc(c, b, `waveform unavailable (${E.status})`) };
  const x = await E.json();
  return { id: o, title: f, meta: s, kind: "waveform", content: { type: "waveform", min: x.min || [], max: x.max || [] }, duration: Number(x.duration_seconds) || 0 };
}
async function pb(c, o) {
  const f = o.path, s = `file:${f}`, b = gb(f);
  if (f === "canonical.json" || f.startsWith("deep/loops/")) return null;
  if (yb.has(b)) return p0(c, s, Ol(f), "audio waveform", f);
  if (f.startsWith("spectrograms/") && b === "npz") {
    const v = new URLSearchParams({ path: f, max_width: "8192", max_height: "768" });
    return { id: s, title: Ol(f), meta: "spectrogram data · exact song timeline", kind: "spectrogram", content: { type: "image", src: `/api/${c}/spectrogram?${v}`, alt: `${Ol(f)} spectrogram` } };
  }
  if (f.startsWith("spectrograms/") && b === "png")
    return { id: s, title: Ol(f), meta: "rendered spectrogram PNG", kind: "image", content: { type: "image", src: Sr(c, f), alt: `${Ol(f)} rendered spectrogram` } };
  try {
    if (f === "analysis.json") {
      const v = await sl(c, f);
      return {
        id: s,
        title: Ol(f),
        meta: "analysis provenance",
        kind: "artifact",
        sourceMap: v.spectrograms || [],
        content: Tc(c, f)
      };
    }
    if (f.startsWith("beats/") && b === "json") {
      const v = await sl(c, f), E = new Set((v.downbeats || []).map((x) => Number(x).toFixed(3)));
      return { id: s, title: Ol(f), meta: "beat / downbeat events", kind: "events", content: { type: "markers", items: (v.beats || []).flatMap((x) => {
        const j = Number(x);
        return Number.isFinite(j) ? [{ time: j, emphasis: E.has(j.toFixed(3)), label: E.has(j.toFixed(3)) ? "Downbeat" : "Beat" }] : [];
      }) } };
    }
    if (f.startsWith("vamp/data/") && b === "json") {
      const v = await sl(c, f);
      return { id: s, title: Ol(f), meta: "Vamp feature analysis", kind: "feature", content: bb(v) };
    }
    if (f === "speech/whisper.json") {
      const v = await sl(c, f);
      return { id: s, title: "Speech · Whisper words", meta: "word-aligned transcript", kind: "words", content: { type: "blocks", items: (v.words || []).flatMap((E) => {
        const x = Number(E.start), j = Number(E.end);
        return Number.isFinite(x) ? [{ start: x, end: Number.isFinite(j) ? Math.max(x + 0.03, j) : x + 0.03, label: String(E.word || "").trim() }] : [];
      }) } };
    }
    if (f === "deep/structure/structure.json" || f === "deep/song_map/song_map.json") {
      const v = await sl(c, f), E = f.includes("song_map");
      return { id: s, title: E ? "Deep · song map" : "Deep · functional structure", meta: E ? "section-level sonic / rhythm / harmony / lyric fusion" : "All-In-One · functional song sections", kind: "deep-structure", content: { type: "blocks", items: Nc(E ? v.sections : v.segments) } };
    }
    if (f === "deep/harmony/harmony.json") {
      const v = await sl(c, f), E = v.chords?.collapsed_progression || [];
      return E.length ? { id: s, title: "Deep · harmony", meta: "collapsed chord progression + key evidence", kind: "deep-harmony", content: { type: "blocks", items: Nc(E) } } : Va(s, "Deep · harmony", "collapsed chord progression + key evidence", [["key", v.vamp_key || v.independent_key_candidates_from_nnls_chroma?.[0]?.key || "—"], ["tuning", v.tuning_hz ? `${Number(v.tuning_hz).toFixed(1)} Hz` : "—"]], "deep-harmony");
    }
    if (f === "deep/lyrics/lyrics.json") {
      const v = await sl(c, f), E = (v.lines || []).filter((x) => Number.isFinite(Number(x.start)) && Number.isFinite(Number(x.end)));
      return E.length ? { id: s, title: "Deep · rhyme & prosody", meta: "phonetic rhyme, repetition and delivery", kind: "deep-lyrics", content: { type: "blocks", items: Nc(E) } } : Va(s, "Deep · rhyme & prosody", "phonetic rhyme, repetition and delivery", [["rhyme scheme", v.rhyme?.scheme || "—"], ["lines", v.line_count ?? "—"], ["words", v.word_count ?? "—"]], "deep-lyrics");
    }
    if (f === "deep/sonic/sonic.json") {
      const v = await sl(c, f);
      return Va(s, "Deep · sonic profile", "loudness · dynamics · timbre · stereo", [["LUFS", vl(v.loudness?.integrated_lufs_bs1770, 1)], ["crest", vl(v.loudness?.crest_factor_db, 1, " dB")], ["RMS range", vl(v.loudness?.short_term_rms_range_db_p95_p10, 1, " dB")], ["centroid", vl(v.timbre?.spectral_centroid_hz_mean, 0, " Hz")], ["stereo corr", vl(v.stereo?.left_right_correlation, 2)]]);
    }
    if (f === "deep/rhythm/rhythm.json") {
      const v = await sl(c, f);
      return Va(s, "Deep · groove", "meter · stability · swing · syncopation evidence", [["tempo", vl(v.tempo?.median_bpm, 2, " BPM")], ["meter", v.meter?.estimated_beats_per_bar ? `${v.meter.estimated_beats_per_bar}/4-ish` : "—"], ["swing", vl(v.groove?.swing_ratio_long_to_short, 2, ":1")], ["offbeat energy", vl(v.groove?.offbeat_onset_energy_ratio, 3)], ["onsets/s", vl(v.groove?.onset_density_per_second, 2)]]);
    }
    if (f === "deep/semantic_text/semantic_text.json") {
      const v = await sl(c, f);
      return Va(s, "Deep · lyric semantics", "sentence embedding theme similarities · not probabilities", (v.theme_similarity || []).slice(0, 7).map((E) => [E.theme, vl(E.similarity, 3)]));
    }
    if (f === "deep/semantic_audio/semantic_audio.json") {
      const v = await sl(c, f), E = Object.entries(v.prompt_sets || {}).flatMap(([x, j]) => (j || []).slice(0, 2).map((w) => [`${x}: ${w.prompt}`, vl(w.similarity, 3)]));
      return Va(s, "Deep · audio semantics", "MuQ-MuLan zero-shot similarities · CC-BY-NC weights", E);
    }
    if (f === "deep/summary.json") {
      const v = await sl(c, f), E = Object.entries(v.analyses || {}).map(([x, j]) => [x, j.available ? "ready" : "unavailable"]);
      return (v.errors || []).length && E.push(["errors", v.errors.length]), Va(s, "Deep · analysis summary", "cross-domain action inventory", E);
    }
  } catch (v) {
    return { id: s, title: Ol(f), meta: "analysis artifact", kind: "artifact", content: Tc(c, f, v.message) };
  }
  return { id: s, title: Ol(f), meta: `${b || "file"} · ${Number(o.bytes || 0).toLocaleString()} bytes`, kind: "artifact", content: Tc(c, f) };
}
function Sb(c) {
  const o = [];
  c?.lyrics && o.push({ id: "canonical:lyrics", title: "Canonical lyrics", meta: "known reference text", kind: "canonical-lyrics", height: 104, content: { type: "text", text: c.lyrics } });
  const f = Array.isArray(c?.lyric_timing) ? c.lyric_timing : [];
  return f.length && o.push({ id: "canonical:timing", title: "Canonical lyric timing", meta: `${f.length} timed lyric event${f.length === 1 ? "" : "s"}`, kind: "canonical-timing", height: 104, content: { type: "blocks", items: f.flatMap((s) => {
    const b = Number(s.start), v = Number(s.end);
    return Number.isFinite(b) && b >= 0 ? [{ start: b, end: Number.isFinite(v) && v > b ? v : b + 0.75, label: String(s.text || ""), className: "stemlab-canonical-lyric" }] : [];
  }) } }), { lanes: o };
}
function _b({ lines: c }) {
  return /* @__PURE__ */ d.jsxs("details", { open: !0, className: "stemlab-log", children: [
    /* @__PURE__ */ d.jsx("summary", { children: "Analysis log" }),
    /* @__PURE__ */ d.jsx("div", { className: "log", children: c.map((o, f) => /* @__PURE__ */ d.jsxs("div", { className: o.stream === "stderr" ? "stderr" : "stdout", children: [
      "[",
      o.stream,
      "] ",
      o.text
    ] }, f)) })
  ] });
}
function Eb({ hash: c, filename: o }) {
  const f = fb(c), [s, b] = B.useState([]), [v, E] = B.useState(0), x = eb(c, v), j = cb(c, v, x), [w, z] = B.useState({ state: "submitted" }), [h, A] = B.useState({ bpm: null, lyrics: null, lyric_timing: [] }), [L, Z] = B.useState(null), [at, W] = B.useState("canonical"), [Et, ct] = B.useState("consensus"), [Mt, Vt] = B.useState([]), Ut = B.useRef(/* @__PURE__ */ new Set()), zt = B.useCallback((R, Y) => {
    Y && Vt((G) => [...G.slice(-799), { stream: R === "stderr" ? "stderr" : "stdout", text: Y }]);
  }, []), P = B.useCallback(async (R) => {
    if (!R?.path || Ut.current.has(R.path)) return;
    Ut.current.add(R.path);
    const Y = await pb(c, R);
    Y && (Y.duration && E((G) => G || Y.duration), b((G) => G.some((st) => st.id === Y.id) ? G : [...G, Y]));
  }, [c]), tt = B.useCallback(async () => {
    const R = await fetch(`/api/${c}/timeline`, { cache: "no-store" });
    if (!R.ok) return;
    const Y = await R.json();
    z(Y.status || { state: "submitted" }), Y.duration_seconds && E(Number(Y.duration_seconds)), Y.canonical && A(Y.canonical), Z(Y.beat_offsets || null);
    for (const G of Y.files || []) P(G);
  }, [P, c]);
  B.useEffect(() => {
    Ut.current = /* @__PURE__ */ new Set(), b([]), Z(null), W("canonical"), ct("consensus"), p0(c, "__source__", "MASTER · uploaded source", o, "__source__").then((G) => {
      G.duration && E(G.duration), b((st) => [G, ...st.filter((ft) => ft.id !== G.id)]);
    }).catch((G) => zt("stderr", G.message)), tt();
    const R = window.setInterval(() => {
      tt();
    }, 2500);
    let Y = null;
    return typeof window.io == "function" ? (Y = window.io({ path: "/socket.io" }), Y.on("connect", () => {
      Xn.textContent = "live", Xn.classList.remove("muted"), Y.emit("subscribe", { hash: c });
    }), Y.on("disconnect", () => {
      Xn.textContent = "reconnecting", Xn.classList.add("muted");
    }), Y.on("process_output", (G) => zt(G.stream || "stdout", G.line || "")), Y.on("process_history", (G) => {
      for (const st of G.stdout || []) zt("stdout", st);
      for (const st of G.stderr || []) zt("stderr", st);
    }), Y.on("new_file", (G) => {
      P(G);
    }), Y.on("job_status", (G) => {
      z(G.status || {}), tt();
    }), Y.on("canonical_metadata", (G) => {
      G?.canonical && A(G.canonical);
    }), Y.on("job_timeout", (G) => zt("stderr", `Job timeout: ${G.message || "analysis exceeded timeout"}`))) : (Xn.textContent = "polling", Xn.classList.add("muted"), zt("stderr", "Socket.IO browser client unavailable; timeline inventory polling remains active.")), () => {
      window.clearInterval(R), Y?.disconnect();
    };
  }, [P, zt, o, c, tt]);
  const xt = B.useMemo(() => Sb(h), [h]), I = B.useMemo(() => Gg(L, h.bpm, v, at, Et), [L, h.bpm, v, at, Et]), nt = (R) => R.id === "__source__" ? 0 : R.kind === "deep-structure" ? 10 : R.kind === "events" ? 20 : R.kind === "audio" ? 1 : R.kind === "spectrogram" ? 30 : R.kind === "waveform" ? 40 : 90, bt = B.useMemo(() => Yg(s), [s]), Ft = [...I.basis ? [
    { id: "canonical:bpm", title: "BPM grid · original", meta: `${I.basis.bpm.toFixed(4)} BPM · source time 0`, kind: "canonical-bpm", height: 74, content: { type: "markers", items: I.original } },
    { id: "bpm:aligned", title: "BPM grid · offset", meta: I.row ? `${I.row.offset_pips.toFixed(6)} pips · ${I.analysis.analysis_id}` : "Waiting for detected first beat", kind: "canonical-bpm", height: 74, content: { type: "markers", items: I.aligned } }
  ] : [], ...x.lanes, ...j.lanes, ...xt.lanes, ...[...bt].sort((R, Y) => nt(R) - nt(Y) || R.id.localeCompare(Y.id))], ot = w.state || "submitted";
  return /* @__PURE__ */ d.jsx(
    Lg,
    {
      className: "stemlab-timeline",
      laneControls: !0,
      wheelNavigation: !0,
      audioSrc: `/api/${c}/source`,
      duration: v,
      title: h.title || o,
      subtitle: c,
      loops: f.loops,
      lanes: Ft,
      grid: [...I.grid, ...x.grid],
      beatClock: j.clock,
      showBeatGrid: j.gridVisible,
      onDurationChange: E,
      onWindowChange: (R) => {
        x.onWindowChange(R), j.onWindowChange(R);
      },
      onTimeChange: (R) => {
        x.onTimeChange(R), j.onTimeChange(R);
      },
      onPlaybackError: (R) => zt("stderr", R instanceof Error ? R.message : String(R)),
      headerEnd: /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
        /* @__PURE__ */ d.jsx("span", { className: `badge ${ot}`, children: ot }),
        /* @__PURE__ */ d.jsxs("span", { className: "small", children: [
          Ft.length,
          " lane",
          Ft.length === 1 ? "" : "s"
        ] })
      ] }),
      footer: /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
        /* @__PURE__ */ d.jsx(Xg, { comparison: I, onBasis: W, onAnalysis: ct }),
        x.panel,
        j.panel,
        /* @__PURE__ */ d.jsx(rb, { state: f, hash: c }),
        /* @__PURE__ */ d.jsx(_b, { lines: Mt }),
        /* @__PURE__ */ d.jsx("span", { className: "dock-links", children: /* @__PURE__ */ d.jsx("a", { href: "https://kieransimkin.co.uk/my-songs/", target: "_blank", rel: "noopener", children: "Kieran Simkin · My Songs ↗" }) })
      ] })
    }
  );
}
function Tb() {
  const c = y0?.value?.trim() || "", o = g0?.value || "", f = b0?.value || "";
  return { ...hr, bpm: c ? Number(c) : null, lyrics: o.trim() || null, lyric_timing: f.trim() || [] };
}
function Nb(c) {
  return Number.isFinite(Number(c.bpm)) || !!c.lyrics || !!(typeof c.lyric_timing == "string" && c.lyric_timing.trim()) || !!(Array.isArray(c.lyric_timing) && c.lyric_timing.length);
}
async function xb(c) {
  const o = Tb();
  if (!Nb(o)) return;
  const f = await fetch(`/api/${c}/canonical`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(o) }), s = await f.json().catch(() => ({}));
  if (!f.ok) throw new Error(s.detail || `Could not save canonical metadata (${f.status})`);
  mr.textContent = "Known information saved with this song hash.";
}
function Mb(c) {
  return new Promise((o, f) => {
    const s = new XMLHttpRequest();
    s.open("PUT", `/upload/${encodeURIComponent(c.name)}`), s.setRequestHeader("Content-Type", c.type || "application/octet-stream"), s.upload.onprogress = (b) => {
      v0.classList.remove("hidden");
      const v = b.lengthComputable ? b.loaded / b.total : 0;
      _c.style.width = `${Math.round(v * 100)}%`, Ec.textContent = b.lengthComputable ? `${Math.round(v * 100)}% · ${(b.loaded / 1048576).toFixed(1)} / ${(b.total / 1048576).toFixed(1)} MiB` : `${(b.loaded / 1048576).toFixed(1)} MiB uploaded`;
    }, s.onerror = () => f(new Error("Upload failed")), s.onload = () => {
      let b = {};
      try {
        b = JSON.parse(s.responseText);
      } catch {
      }
      s.status < 200 || s.status >= 300 ? f(new Error(b.detail || `Upload failed (${s.status})`)) : o(b);
    }, s.send(c);
  });
}
async function S0(c, o) {
  ob.classList.add("hidden"), br.classList.remove("hidden"), vb.render(/* @__PURE__ */ d.jsx(Eb, { hash: c, filename: o || "uploaded audio" }, c));
}
async function _0(c) {
  if (c) {
    _c.style.width = "0%", Ec.textContent = `Uploading ${c.name}`, v0.classList.remove("hidden");
    try {
      const o = await Mb(c);
      _c.style.width = "100%", Ec.textContent = "Upload complete · attaching to analysis", await xb(o.hash), await S0(o.hash, o.filename || c.name);
    } catch (o) {
      Ec.textContent = o.message, _c.style.width = "0%";
    }
  }
}
async function E0(c) {
  c?.preventDefault(), c?.stopPropagation();
  try {
    const o = await fetch("/assets/arcadians-reference.json", { cache: "no-store" });
    if (!o.ok) throw new Error(`Could not load Arcadians reference (${o.status})`);
    const f = await o.json();
    hr = {};
    for (const s of ["title", "artist", "release_date", "isrc", "upc", "website", "my_songs_url", "epk_url", "cover_art_url", "source_url", "sections"])
      f[s] !== void 0 && f[s] !== null && (hr[s] = f[s]);
    y0.value = f.bpm ?? "", g0.value = f.lyrics ?? "", b0.value = Array.isArray(f.lyric_timing) && f.lyric_timing.length ? JSON.stringify(f.lyric_timing, null, 2) : "", Ce(".known-info").open = !0, mr.textContent = f.lyric_timing?.length ? `Loaded ${f.title || "Arcadians"}: canonical release metadata, sections, ${f.bpm} BPM, lyrics and timing.` : `Loaded ${f.title || "Arcadians"} canonical reference metadata.`;
  } catch (o) {
    mr.textContent = o.message;
  }
}
h0.addEventListener("click", (c) => {
  c.stopPropagation(), Zu.click();
});
Zu.addEventListener("change", () => {
  _0(Zu.files?.[0]);
});
$a.addEventListener("click", (c) => {
  c.target !== h0 && !c.target.closest(".known-info") && Zu.click();
});
$a.addEventListener("keydown", (c) => {
  (c.key === "Enter" || c.key === " ") && Zu.click();
});
for (const c of ["dragenter", "dragover"]) $a.addEventListener(c, (o) => {
  o.preventDefault(), $a.classList.add("dragging");
});
for (const c of ["dragleave", "drop"]) $a.addEventListener(c, (o) => {
  o.preventDefault(), $a.classList.remove("dragging");
});
$a.addEventListener("drop", (c) => {
  _0(c.dataTransfer?.files?.[0]);
});
db?.addEventListener("click", E0);
mb?.addEventListener("click", E0);
const cr = new URLSearchParams(location.search).get("hash");
cr && /^[0-9a-f]{64}$/i.test(cr) && S0(cr.toLowerCase(), "Existing analysis");
export {
  Ka as formatTimelineTime
};
