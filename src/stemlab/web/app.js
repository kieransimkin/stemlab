var Pr = { exports: {} }, Yu = {};
var Vh;
function py() {
  if (Vh) return Yu;
  Vh = 1;
  var c = /* @__PURE__ */ Symbol.for("react.transitional.element"), o = /* @__PURE__ */ Symbol.for("react.fragment");
  function r(s, h, m) {
    var b = null;
    if (m !== void 0 && (b = "" + m), h.key !== void 0 && (b = "" + h.key), "key" in h) {
      m = {};
      for (var _ in h)
        _ !== "key" && (m[_] = h[_]);
    } else m = h;
    return h = m.ref, {
      $$typeof: c,
      type: s,
      key: b,
      ref: h !== void 0 ? h : null,
      props: m
    };
  }
  return Yu.Fragment = o, Yu.jsx = r, Yu.jsxs = r, Yu;
}
var Qh;
function Sy() {
  return Qh || (Qh = 1, Pr.exports = py()), Pr.exports;
}
var d = Sy(), tf = { exports: {} }, gt = {};
var Zh;
function _y() {
  if (Zh) return gt;
  Zh = 1;
  var c = /* @__PURE__ */ Symbol.for("react.transitional.element"), o = /* @__PURE__ */ Symbol.for("react.portal"), r = /* @__PURE__ */ Symbol.for("react.fragment"), s = /* @__PURE__ */ Symbol.for("react.strict_mode"), h = /* @__PURE__ */ Symbol.for("react.profiler"), m = /* @__PURE__ */ Symbol.for("react.consumer"), b = /* @__PURE__ */ Symbol.for("react.context"), _ = /* @__PURE__ */ Symbol.for("react.forward_ref"), C = /* @__PURE__ */ Symbol.for("react.suspense"), A = /* @__PURE__ */ Symbol.for("react.memo"), N = /* @__PURE__ */ Symbol.for("react.lazy"), g = /* @__PURE__ */ Symbol.for("react.activity"), j = /* @__PURE__ */ Symbol.for("react.view_transition"), B = Symbol.iterator;
  function Z(p) {
    return p === null || typeof p != "object" ? null : (p = B && p[B] || p["@@iterator"], typeof p == "function" ? p : null);
  }
  var lt = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, k = Object.assign, mt = {};
  function Q(p, H, F) {
    this.props = p, this.context = H, this.refs = mt, this.updater = F || lt;
  }
  Q.prototype.isReactComponent = {}, Q.prototype.setState = function(p, H) {
    if (typeof p != "object" && typeof p != "function" && p != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, p, H, "setState");
  }, Q.prototype.forceUpdate = function(p) {
    this.updater.enqueueForceUpdate(this, p, "forceUpdate");
  };
  function X() {
  }
  X.prototype = Q.prototype;
  function Nt(p, H, F) {
    this.props = p, this.context = H, this.refs = mt, this.updater = F || lt;
  }
  var Et = Nt.prototype = new X();
  Et.constructor = Nt, k(Et, Q.prototype), Et.isPureReactComponent = !0;
  var At = Array.isArray;
  function K() {
  }
  var dt = { H: null, A: null, T: null, S: null }, Gt = Object.prototype.hasOwnProperty;
  function at(p, H, F) {
    var P = F.ref;
    return {
      $$typeof: c,
      type: p,
      key: H,
      ref: P !== void 0 ? P : null,
      props: F
    };
  }
  function et(p, H) {
    return at(p.type, H, p.props);
  }
  function ft(p) {
    return typeof p == "object" && p !== null && p.$$typeof === c;
  }
  function Qt(p) {
    var H = { "=": "=0", ":": "=2" };
    return "$" + p.replace(/[=:]/g, function(F) {
      return H[F];
    });
  }
  var kt = /\/+/g;
  function St(p, H) {
    return typeof p == "object" && p !== null && p.key != null ? Qt("" + p.key) : H.toString(36);
  }
  function q(p) {
    switch (p.status) {
      case "fulfilled":
        return p.value;
      case "rejected":
        throw p.reason;
      default:
        switch (typeof p.status == "string" ? p.then(K, K) : (p.status = "pending", p.then(
          function(H) {
            p.status === "pending" && (p.status = "fulfilled", p.value = H);
          },
          function(H) {
            p.status === "pending" && (p.status = "rejected", p.reason = H);
          }
        )), p.status) {
          case "fulfilled":
            return p.value;
          case "rejected":
            throw p.reason;
        }
    }
    throw p;
  }
  function Y(p, H, F, P, ht) {
    var pt = typeof p;
    (pt === "undefined" || pt === "boolean") && (p = null);
    var ot = !1;
    if (p === null) ot = !0;
    else
      switch (pt) {
        case "bigint":
        case "string":
        case "number":
          ot = !0;
          break;
        case "object":
          switch (p.$$typeof) {
            case c:
            case o:
              ot = !0;
              break;
            case N:
              return ot = p._init, Y(
                ot(p._payload),
                H,
                F,
                P,
                ht
              );
          }
      }
    if (ot)
      return ht = ht(p), ot = P === "" ? "." + St(p, 0) : P, At(ht) ? (F = "", ot != null && (F = ot.replace(kt, "$&/") + "/"), Y(ht, H, F, "", function(Wt) {
        return Wt;
      })) : ht != null && (ft(ht) && (ht = et(
        ht,
        F + (ht.key == null || p && p.key === ht.key ? "" : ("" + ht.key).replace(
          kt,
          "$&/"
        ) + "/") + ot
      )), H.push(ht)), 1;
    ot = 0;
    var J = P === "" ? "." : P + ":";
    if (At(p))
      for (var ct = 0; ct < p.length; ct++)
        P = p[ct], pt = J + St(P, ct), ot += Y(
          P,
          H,
          F,
          pt,
          ht
        );
    else if (ct = Z(p), typeof ct == "function")
      for (p = ct.call(p), ct = 0; !(P = p.next()).done; )
        P = P.value, pt = J + St(P, ct++), ot += Y(
          P,
          H,
          F,
          pt,
          ht
        );
    else if (pt === "object") {
      if (typeof p.then == "function")
        return Y(
          q(p),
          H,
          F,
          P,
          ht
        );
      throw H = String(p), Error(
        "Objects are not valid as a React child (found: " + (H === "[object Object]" ? "object with keys {" + Object.keys(p).join(", ") + "}" : H) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ot;
  }
  function L(p, H, F) {
    if (p == null) return p;
    var P = [], ht = 0;
    return Y(p, P, "", "", function(pt) {
      return H.call(F, pt, ht++);
    }), P;
  }
  function $(p) {
    if (p._status === -1) {
      var H = p._result, F = H();
      F.then(
        function(P) {
          (p._status === 0 || p._status === -1) && (p._status = 1, p._result = P, F.status === void 0 && (F.status = "fulfilled", F.value = P));
        },
        function(P) {
          (p._status === 0 || p._status === -1) && (p._status = 2, p._result = P, F.status === void 0 && (F.status = "rejected", F.reason = P));
        }
      ), p._status === -1 && (p._status = 0, p._result = F);
    }
    if (p._status === 1) return p._result.default;
    throw p._result;
  }
  var it = typeof reportError == "function" ? reportError : function(p) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var H = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof p == "object" && p !== null && typeof p.message == "string" ? String(p.message) : String(p),
        error: p
      });
      if (!window.dispatchEvent(H)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", p);
      return;
    }
    console.error(p);
  };
  function Zt(p) {
    var H = dt.T, F = {};
    F.types = H !== null ? H.types : null, dt.T = F;
    try {
      var P = p(), ht = dt.S;
      ht !== null && ht(F, P), typeof P == "object" && P !== null && typeof P.then == "function" && P.then(K, it);
    } catch (pt) {
      it(pt);
    } finally {
      H !== null && F.types !== null && (H.types = F.types), dt.T = H;
    }
  }
  function Ft(p) {
    var H = dt.T;
    if (H !== null) {
      var F = H.types;
      F === null ? H.types = [p] : F.indexOf(p) === -1 && F.push(p);
    } else Zt(Ft.bind(null, p));
  }
  var te = {
    map: L,
    forEach: function(p, H, F) {
      L(
        p,
        function() {
          H.apply(this, arguments);
        },
        F
      );
    },
    count: function(p) {
      var H = 0;
      return L(p, function() {
        H++;
      }), H;
    },
    toArray: function(p) {
      return L(p, function(H) {
        return H;
      }) || [];
    },
    only: function(p) {
      if (!ft(p))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return p;
    }
  };
  return gt.Activity = g, gt.Children = te, gt.Component = Q, gt.Fragment = r, gt.Profiler = h, gt.PureComponent = Nt, gt.StrictMode = s, gt.Suspense = C, gt.ViewTransition = j, gt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = dt, gt.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(p) {
      return dt.H.useMemoCache(p);
    }
  }, gt.addTransitionType = Ft, gt.cache = function(p) {
    return function() {
      return p.apply(null, arguments);
    };
  }, gt.cacheSignal = function() {
    return null;
  }, gt.cloneElement = function(p, H, F) {
    if (p == null)
      throw Error(
        "The argument must be a React element, but you passed " + p + "."
      );
    var P = k({}, p.props), ht = p.key;
    if (H != null)
      for (pt in H.key !== void 0 && (ht = "" + H.key), H)
        !Gt.call(H, pt) || pt === "key" || pt === "__self" || pt === "__source" || pt === "ref" && H.ref === void 0 || (P[pt] = H[pt]);
    var pt = arguments.length - 2;
    if (pt === 1) P.children = F;
    else if (1 < pt) {
      for (var ot = Array(pt), J = 0; J < pt; J++)
        ot[J] = arguments[J + 2];
      P.children = ot;
    }
    return at(p.type, ht, P);
  }, gt.createContext = function(p) {
    return p = {
      $$typeof: b,
      _currentValue: p,
      _currentValue2: p,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, p.Provider = p, p.Consumer = {
      $$typeof: m,
      _context: p
    }, p;
  }, gt.createElement = function(p, H, F) {
    var P, ht = {}, pt = null;
    if (H != null)
      for (P in H.key !== void 0 && (pt = "" + H.key), H)
        Gt.call(H, P) && P !== "key" && P !== "__self" && P !== "__source" && (ht[P] = H[P]);
    var ot = arguments.length - 2;
    if (ot === 1) ht.children = F;
    else if (1 < ot) {
      for (var J = Array(ot), ct = 0; ct < ot; ct++)
        J[ct] = arguments[ct + 2];
      ht.children = J;
    }
    if (p && p.defaultProps)
      for (P in ot = p.defaultProps, ot)
        ht[P] === void 0 && (ht[P] = ot[P]);
    return at(p, pt, ht);
  }, gt.createRef = function() {
    return { current: null };
  }, gt.forwardRef = function(p) {
    return { $$typeof: _, render: p };
  }, gt.isValidElement = ft, gt.lazy = function(p) {
    return {
      $$typeof: N,
      _payload: { _status: -1, _result: p },
      _init: $
    };
  }, gt.memo = function(p, H) {
    return {
      $$typeof: A,
      type: p,
      compare: H === void 0 ? null : H
    };
  }, gt.startTransition = Zt, gt.unstable_useCacheRefresh = function() {
    return dt.H.useCacheRefresh();
  }, gt.use = function(p) {
    return dt.H.use(p);
  }, gt.useActionState = function(p, H, F) {
    return dt.H.useActionState(p, H, F);
  }, gt.useCallback = function(p, H) {
    return dt.H.useCallback(p, H);
  }, gt.useContext = function(p) {
    return dt.H.useContext(p);
  }, gt.useDebugValue = function() {
  }, gt.useDeferredValue = function(p, H) {
    return dt.H.useDeferredValue(p, H);
  }, gt.useEffect = function(p, H) {
    return dt.H.useEffect(p, H);
  }, gt.useEffectEvent = function(p) {
    return dt.H.useEffectEvent(p);
  }, gt.useId = function() {
    return dt.H.useId();
  }, gt.useImperativeHandle = function(p, H, F) {
    return dt.H.useImperativeHandle(p, H, F);
  }, gt.useInsertionEffect = function(p, H) {
    return dt.H.useInsertionEffect(p, H);
  }, gt.useLayoutEffect = function(p, H) {
    return dt.H.useLayoutEffect(p, H);
  }, gt.useMemo = function(p, H) {
    return dt.H.useMemo(p, H);
  }, gt.useOptimistic = function(p, H) {
    return dt.H.useOptimistic(p, H);
  }, gt.useReducer = function(p, H, F) {
    return dt.H.useReducer(p, H, F);
  }, gt.useRef = function(p) {
    return dt.H.useRef(p);
  }, gt.useState = function(p) {
    return dt.H.useState(p);
  }, gt.useSyncExternalStore = function(p, H, F) {
    return dt.H.useSyncExternalStore(
      p,
      H,
      F
    );
  }, gt.useTransition = function() {
    return dt.H.useTransition();
  }, gt.version = "19.3.0", gt;
}
var Kh;
function gf() {
  return Kh || (Kh = 1, tf.exports = _y()), tf.exports;
}
var U = gf(), ef = { exports: {} }, qu = {}, lf = { exports: {} }, af = {};
var Jh;
function Ey() {
  return Jh || (Jh = 1, (function(c) {
    function o(q, Y) {
      var L = q.length;
      q.push(Y);
      t: for (; 0 < L; ) {
        var $ = L - 1 >>> 1, it = q[$];
        if (0 < h(it, Y))
          q[$] = Y, q[L] = it, L = $;
        else break t;
      }
    }
    function r(q) {
      return q.length === 0 ? null : q[0];
    }
    function s(q) {
      if (q.length === 0) return null;
      var Y = q[0], L = q.pop();
      if (L !== Y) {
        q[0] = L;
        t: for (var $ = 0, it = q.length, Zt = it >>> 1; $ < Zt; ) {
          var Ft = 2 * ($ + 1) - 1, te = q[Ft], p = Ft + 1, H = q[p];
          if (0 > h(te, L))
            p < it && 0 > h(H, te) ? (q[$] = H, q[p] = L, $ = p) : (q[$] = te, q[Ft] = L, $ = Ft);
          else if (p < it && 0 > h(H, L))
            q[$] = H, q[p] = L, $ = p;
          else break t;
        }
      }
      return Y;
    }
    function h(q, Y) {
      var L = q.sortIndex - Y.sortIndex;
      return L !== 0 ? L : q.id - Y.id;
    }
    if (c.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var m = performance;
      c.unstable_now = function() {
        return m.now();
      };
    } else {
      var b = Date, _ = b.now();
      c.unstable_now = function() {
        return b.now() - _;
      };
    }
    var C = [], A = [], N = 1, g = null, j = 3, B = !1, Z = !1, lt = !1, k = !1, mt = typeof setTimeout == "function" ? setTimeout : null, Q = typeof clearTimeout == "function" ? clearTimeout : null, X = typeof setImmediate < "u" ? setImmediate : null;
    function Nt(q) {
      for (var Y = r(A); Y !== null; ) {
        if (Y.callback === null) s(A);
        else if (Y.startTime <= q)
          s(A), Y.sortIndex = Y.expirationTime, o(C, Y);
        else break;
        Y = r(A);
      }
    }
    function Et(q) {
      if (lt = !1, Nt(q), !Z)
        if (r(C) !== null)
          Z = !0, At || (At = !0, ft());
        else {
          var Y = r(A);
          Y !== null && St(Et, Y.startTime - q);
        }
    }
    var At = !1, K = -1, dt = 5, Gt = -1;
    function at() {
      return k ? !0 : !(c.unstable_now() - Gt < dt);
    }
    function et() {
      if (k = !1, At) {
        var q = c.unstable_now();
        Gt = q;
        var Y = !0;
        try {
          t: {
            Z = !1, lt && (lt = !1, Q(K), K = -1), B = !0;
            var L = j;
            try {
              e: {
                for (Nt(q), g = r(C); g !== null && !(g.expirationTime > q && at()); ) {
                  var $ = g.callback;
                  if (typeof $ == "function") {
                    g.callback = null, j = g.priorityLevel;
                    var it = $(
                      g.expirationTime <= q
                    );
                    if (q = c.unstable_now(), typeof it == "function") {
                      g.callback = it, Nt(q), Y = !0;
                      break e;
                    }
                    g === r(C) && s(C), Nt(q);
                  } else s(C);
                  g = r(C);
                }
                if (g !== null) Y = !0;
                else {
                  var Zt = r(A);
                  Zt !== null && St(
                    Et,
                    Zt.startTime - q
                  ), Y = !1;
                }
              }
              break t;
            } finally {
              g = null, j = L, B = !1;
            }
            Y = void 0;
          }
        } finally {
          Y ? ft() : At = !1;
        }
      }
    }
    var ft;
    if (typeof X == "function")
      ft = function() {
        X(et);
      };
    else if (typeof MessageChannel < "u") {
      var Qt = new MessageChannel(), kt = Qt.port2;
      Qt.port1.onmessage = et, ft = function() {
        kt.postMessage(null);
      };
    } else
      ft = function() {
        mt(et, 0);
      };
    function St(q, Y) {
      K = mt(function() {
        q(c.unstable_now());
      }, Y);
    }
    c.unstable_IdlePriority = 5, c.unstable_ImmediatePriority = 1, c.unstable_LowPriority = 4, c.unstable_NormalPriority = 3, c.unstable_Profiling = null, c.unstable_UserBlockingPriority = 2, c.unstable_cancelCallback = function(q) {
      q.callback = null;
    }, c.unstable_forceFrameRate = function(q) {
      0 > q || 125 < q ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : dt = 0 < q ? Math.floor(1e3 / q) : 5;
    }, c.unstable_getCurrentPriorityLevel = function() {
      return j;
    }, c.unstable_next = function(q) {
      switch (j) {
        case 1:
        case 2:
        case 3:
          var Y = 3;
          break;
        default:
          Y = j;
      }
      var L = j;
      j = Y;
      try {
        return q();
      } finally {
        j = L;
      }
    }, c.unstable_requestPaint = function() {
      k = !0;
    }, c.unstable_runWithPriority = function(q, Y) {
      switch (q) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          q = 3;
      }
      var L = j;
      j = q;
      try {
        return Y();
      } finally {
        j = L;
      }
    }, c.unstable_scheduleCallback = function(q, Y, L) {
      var $ = c.unstable_now();
      switch (typeof L == "object" && L !== null ? (L = L.delay, L = typeof L == "number" && 0 < L ? $ + L : $) : L = $, q) {
        case 1:
          var it = -1;
          break;
        case 2:
          it = 250;
          break;
        case 5:
          it = 1073741823;
          break;
        case 4:
          it = 1e4;
          break;
        default:
          it = 5e3;
      }
      return it = L + it, q = {
        id: N++,
        callback: Y,
        priorityLevel: q,
        startTime: L,
        expirationTime: it,
        sortIndex: -1
      }, L > $ ? (q.sortIndex = L, o(A, q), r(C) === null && q === r(A) && (lt ? (Q(K), K = -1) : lt = !0, St(Et, L - $))) : (q.sortIndex = it, o(C, q), Z || B || (Z = !0, At || (At = !0, ft()))), q;
    }, c.unstable_shouldYield = at, c.unstable_wrapCallback = function(q) {
      var Y = j;
      return function() {
        var L = j;
        j = Y;
        try {
          return q.apply(this, arguments);
        } finally {
          j = L;
        }
      };
    };
  })(af)), af;
}
var $h;
function Ty() {
  return $h || ($h = 1, lf.exports = Ey()), lf.exports;
}
var nf = { exports: {} }, Te = {};
var kh;
function Ny() {
  if (kh) return Te;
  kh = 1;
  var c = gf();
  function o(N) {
    var g = "https://react.dev/errors/" + N;
    if (1 < arguments.length) {
      g += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var j = 2; j < arguments.length; j++)
        g += "&args[]=" + encodeURIComponent(arguments[j]);
    }
    return "Minified React error #" + N + "; visit " + g + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function r() {
  }
  var s = {
    d: {
      f: r,
      r: function() {
        throw Error(o(522));
      },
      D: r,
      C: r,
      L: r,
      m: r,
      X: r,
      S: r,
      M: r
    },
    p: 0,
    findDOMNode: null
  }, h = /* @__PURE__ */ Symbol.for("react.portal"), m = /* @__PURE__ */ Symbol.for("react.recoverable"), b = /* @__PURE__ */ Symbol.for("react.optimistic_key");
  function _(N, g, j) {
    var B = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: h,
      key: B == null ? null : B === b ? b : "" + B,
      children: N,
      containerInfo: g,
      implementation: j
    };
  }
  var C = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function A(N, g) {
    if (N === "font") return "";
    if (typeof g == "string")
      return g === "use-credentials" ? g : "";
  }
  return Te.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, Te.browser = function(N) {
    return { $$typeof: m, _reason: N };
  }, Te.createPortal = function(N, g) {
    var j = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!g || g.nodeType !== 1 && g.nodeType !== 9 && g.nodeType !== 11)
      throw Error(o(299));
    return _(N, g, null, j);
  }, Te.flushSync = function(N) {
    var g = C.T, j = s.p;
    try {
      if (C.T = null, s.p = 2, N) return N();
    } finally {
      C.T = g, s.p = j, s.d.f();
    }
  }, Te.preconnect = function(N, g) {
    typeof N == "string" && (g ? (g = g.crossOrigin, g = typeof g == "string" ? g === "use-credentials" ? g : "" : void 0) : g = null, s.d.C(N, g));
  }, Te.prefetchDNS = function(N) {
    typeof N == "string" && s.d.D(N);
  }, Te.preinit = function(N, g) {
    if (typeof N == "string" && g && typeof g.as == "string") {
      var j = g.as, B = A(j, g.crossOrigin), Z = typeof g.integrity == "string" ? g.integrity : void 0, lt = typeof g.fetchPriority == "string" ? g.fetchPriority : void 0;
      j === "style" ? s.d.S(
        N,
        typeof g.precedence == "string" ? g.precedence : void 0,
        {
          crossOrigin: B,
          integrity: Z,
          fetchPriority: lt
        }
      ) : j === "script" && s.d.X(N, {
        crossOrigin: B,
        integrity: Z,
        fetchPriority: lt,
        nonce: typeof g.nonce == "string" ? g.nonce : void 0
      });
    }
  }, Te.preinitModule = function(N, g) {
    if (typeof N == "string")
      if (typeof g == "object" && g !== null) {
        if (g.as == null || g.as === "script") {
          var j = A(
            g.as,
            g.crossOrigin
          );
          s.d.M(N, {
            crossOrigin: j,
            integrity: typeof g.integrity == "string" ? g.integrity : void 0,
            nonce: typeof g.nonce == "string" ? g.nonce : void 0,
            fetchPriority: typeof g.fetchPriority == "string" ? g.fetchPriority : void 0
          });
        }
      } else g == null && s.d.M(N);
  }, Te.preload = function(N, g) {
    if (typeof N == "string" && typeof g == "object" && g !== null && typeof g.as == "string") {
      var j = g.as, B = A(j, g.crossOrigin);
      s.d.L(N, j, {
        crossOrigin: B,
        integrity: typeof g.integrity == "string" ? g.integrity : void 0,
        nonce: typeof g.nonce == "string" ? g.nonce : void 0,
        type: typeof g.type == "string" ? g.type : void 0,
        fetchPriority: typeof g.fetchPriority == "string" ? g.fetchPriority : void 0,
        referrerPolicy: typeof g.referrerPolicy == "string" ? g.referrerPolicy : void 0,
        imageSrcSet: typeof g.imageSrcSet == "string" ? g.imageSrcSet : void 0,
        imageSizes: typeof g.imageSizes == "string" ? g.imageSizes : void 0,
        media: typeof g.media == "string" ? g.media : void 0
      });
    }
  }, Te.preloadModule = function(N, g) {
    if (typeof N == "string")
      if (g) {
        var j = A(g.as, g.crossOrigin);
        s.d.m(N, {
          as: typeof g.as == "string" && g.as !== "script" ? g.as : void 0,
          crossOrigin: j,
          integrity: typeof g.integrity == "string" ? g.integrity : void 0,
          nonce: typeof g.nonce == "string" ? g.nonce : void 0,
          fetchPriority: typeof g.fetchPriority == "string" ? g.fetchPriority : void 0
        });
      } else s.d.m(N);
  }, Te.requestFormReset = function(N) {
    s.d.r(N);
  }, Te.unstable_batchedUpdates = function(N, g) {
    return N(g);
  }, Te.useFormState = function(N, g, j) {
    return C.H.useFormState(N, g, j);
  }, Te.useFormStatus = function() {
    return C.H.useHostTransitionStatus();
  }, Te.version = "19.3.0", Te;
}
var Fh;
function xy() {
  if (Fh) return nf.exports;
  Fh = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (o) {
        console.error(o);
      }
  }
  return c(), nf.exports = Ny(), nf.exports;
}
var Wh;
function My() {
  if (Wh) return qu;
  Wh = 1;
  var c = Ty(), o = gf(), r = xy();
  function s(t) {
    var e = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      e += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++)
        e += "&args[]=" + encodeURIComponent(arguments[l]);
    }
    return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function h(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function m(t) {
    for (var e = t, l = e; l && !l.alternate; )
      e = l, (e.flags & 4098) !== 0 && (t = e.return), l = e.return;
    for (; e.return; ) e = e.return;
    return e.tag === 3 ? t : null;
  }
  function b(t) {
    if (t.tag === 13) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function _(t) {
    if (t.tag === 31) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function C(t) {
    if (m(t) !== t)
      throw Error(s(188));
  }
  function A(t) {
    var e = t.alternate;
    if (!e) {
      if (e = m(t), e === null) throw Error(s(188));
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
          if (u === l) return C(n), t;
          if (u === a) return C(n), e;
          u = u.sibling;
        }
        throw Error(s(188));
      }
      if (l.return !== a.return) l = n, a = u;
      else {
        for (var i = !1, f = n.child; f; ) {
          if (f === l) {
            i = !0, l = n, a = u;
            break;
          }
          if (f === a) {
            i = !0, a = n, l = u;
            break;
          }
          f = f.sibling;
        }
        if (!i) {
          for (f = u.child; f; ) {
            if (f === l) {
              i = !0, l = u, a = n;
              break;
            }
            if (f === a) {
              i = !0, a = u, l = n;
              break;
            }
            f = f.sibling;
          }
          if (!i) throw Error(s(189));
        }
      }
      if (l.alternate !== a) throw Error(s(190));
    }
    if (l.tag !== 3) throw Error(s(188));
    return l.stateNode.current === l ? t : e;
  }
  function N(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (e = N(t), e !== null) return e;
      t = t.sibling;
    }
    return null;
  }
  function g(t, e, l, a, n, u) {
    for (; t !== null; ) {
      if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && l(t, a, n, u) || (t.tag !== 22 || t.memoizedState === null) && (e || t.tag !== 5 && t.tag !== 27) && g(
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
  function j(t) {
    for (t = t.return; t !== null; ) {
      if (t.tag === 3 || t.tag === 5 || t.tag === 27) return t;
      t = t.return;
    }
    return null;
  }
  function B(t) {
    var e = !1;
    for (t = t.return; t !== null && (t.tag === 4 && (e = !0), !(t.tag === 3 || t.tag === 5 || t.tag === 27)); )
      t = t.return;
    return e;
  }
  function Z(t) {
    var e = [null, null], l = j(t);
    return l === null || lt(
      e,
      t,
      l.child,
      { foundSelf: !1 }
    ), e;
  }
  function lt(t, e, l, a) {
    for (; l !== null; ) {
      if (l === e) a.foundSelf = !0;
      else if (l.tag === 5 || l.tag === 27 || l.tag === 6) {
        if (a.foundSelf) return t[1] = l, !0;
        t[0] = l;
      } else if ((l.tag !== 22 || l.memoizedState === null) && lt(
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
  function k(t) {
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
  var mt = null, Q = null;
  function X(t, e, l) {
    return t === l ? !0 : t === e ? (mt = t, !0) : !1;
  }
  function Nt(t, e, l) {
    return t === l ? (Q = t, !1) : t === e ? (Q !== null && (mt = t), !0) : !1;
  }
  function Et(t) {
    if (t === null) return null;
    do
      t = t === null ? null : t.return;
    while (t && t.tag !== 5 && t.tag !== 27 && t.tag !== 3);
    return t || null;
  }
  function At(t, e, l) {
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
  var K = Object.assign, dt = /* @__PURE__ */ Symbol.for("react.element"), Gt = /* @__PURE__ */ Symbol.for("react.transitional.element"), at = /* @__PURE__ */ Symbol.for("react.portal"), et = /* @__PURE__ */ Symbol.for("react.fragment"), ft = /* @__PURE__ */ Symbol.for("react.strict_mode"), Qt = /* @__PURE__ */ Symbol.for("react.profiler"), kt = /* @__PURE__ */ Symbol.for("react.consumer"), St = /* @__PURE__ */ Symbol.for("react.context"), q = /* @__PURE__ */ Symbol.for("react.forward_ref"), Y = /* @__PURE__ */ Symbol.for("react.suspense"), L = /* @__PURE__ */ Symbol.for("react.suspense_list"), $ = /* @__PURE__ */ Symbol.for("react.memo"), it = /* @__PURE__ */ Symbol.for("react.lazy"), Zt = /* @__PURE__ */ Symbol.for("react.activity"), Ft = /* @__PURE__ */ Symbol.for("react.legacy_hidden"), te = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), p = /* @__PURE__ */ Symbol.for("react.view_transition"), H = /* @__PURE__ */ Symbol.for("react.recoverable"), F = Symbol.iterator;
  function P(t) {
    return t === null || typeof t != "object" ? null : (t = F && t[F] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var ht = /* @__PURE__ */ Symbol.for("react.client.reference");
  function pt(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === ht ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case et:
        return "Fragment";
      case Qt:
        return "Profiler";
      case ft:
        return "StrictMode";
      case Y:
        return "Suspense";
      case L:
        return "SuspenseList";
      case Zt:
        return "Activity";
      case p:
        return "ViewTransition";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case at:
          return "Portal";
        case St:
          return t.displayName || "Context";
        case kt:
          return (t._context.displayName || "Context") + ".Consumer";
        case q:
          var e = t.render;
          return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case $:
          return e = t.displayName || null, e !== null ? e : pt(t.type) || "Memo";
        case it:
          e = t._payload, t = t._init;
          try {
            return pt(t(e));
          } catch {
          }
      }
    return null;
  }
  var ot = Array.isArray, J = o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ct = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Wt = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, le = [], wt = -1;
  function It(t) {
    return { current: t };
  }
  function $t(t) {
    0 > wt || (t.current = le[wt], le[wt] = null, wt--);
  }
  function xt(t, e) {
    wt++, le[wt] = t.current, t.current = e;
  }
  var G = It(null), nt = It(null), st = It(null), Re = It(null);
  function Ne(t, e) {
    switch (xt(st, e), xt(nt, t), xt(G, null), e.nodeType) {
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
    $t(G), xt(G, t);
  }
  function xe() {
    $t(G), $t(nt), $t(st);
  }
  function hl(t) {
    var e = t.memoizedState;
    e !== null && (Gn._currentValue = e.memoizedState, xt(Re, t)), e = G.current;
    var l = Pm(e, t.type);
    e !== l && (xt(nt, t), xt(G, l));
  }
  function vl(t) {
    nt.current === t && ($t(G), $t(nt)), Re.current === t && ($t(Re), Gn._currentValue = Wt);
  }
  var _a, Vl;
  function Fe(t) {
    if (_a === void 0)
      try {
        throw Error();
      } catch (l) {
        var e = l.stack.trim().match(/\n( *(at )?)/);
        _a = e && e[1] || "", Vl = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + _a + t + Vl;
  }
  var Ea = !1;
  function R(t, e) {
    if (!t || Ea) return "";
    Ea = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (e) {
              var w = function() {
                throw Error();
              };
              if (Object.defineProperty(w.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(w, []);
                } catch (V) {
                  var S = V;
                }
                Reflect.construct(t, [], w);
              } else {
                try {
                  w.call();
                } catch (V) {
                  S = V;
                }
                w = !1;
                try {
                  var M = Object.getOwnPropertyDescriptor(
                    t.prototype,
                    "props"
                  );
                  Object.defineProperty(t.prototype, "props", {
                    configurable: !0,
                    set: function() {
                      throw Error();
                    }
                  }), w = !0, new t();
                } finally {
                  w && (M !== void 0 ? Object.defineProperty(t.prototype, "props", M) : delete t.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (V) {
                S = V;
              }
              (w = t()) && typeof w.catch == "function" && w.catch(function() {
              });
            }
          } catch (V) {
            if (V && S && typeof V.stack == "string")
              return [V.stack, S.stack];
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
      var u = a.DetermineComponentFrameRoot(), i = u[0], f = u[1];
      if (i && f) {
        var v = i.split(`
`), T = f.split(`
`);
        for (n = a = 0; a < v.length && !v[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; n < T.length && !T[n].includes(
          "DetermineComponentFrameRoot"
        ); )
          n++;
        if (a === v.length || n === T.length)
          for (a = v.length - 1, n = T.length - 1; 1 <= a && 0 <= n && v[a] !== T[n]; )
            n--;
        for (; 1 <= a && 0 <= n; a--, n--)
          if (v[a] !== T[n]) {
            if (a !== 1 || n !== 1)
              do
                if (a--, n--, 0 > n || v[a] !== T[n]) {
                  var z = `
` + v[a].replace(" at new ", " at ");
                  return t.displayName && z.includes("<anonymous>") && (z = z.replace("<anonymous>", t.displayName)), z;
                }
              while (1 <= a && 0 <= n);
            break;
          }
      }
    } finally {
      Ea = !1, Error.prepareStackTrace = l;
    }
    return (l = t ? t.displayName || t.name : "") ? Fe(l) : "";
  }
  function vt(t, e) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Fe(t.type);
      case 16:
        return Fe("Lazy");
      case 13:
        return t.child !== e && e !== null ? Fe("Suspense Fallback") : Fe("Suspense");
      case 19:
        return Fe("SuspenseList");
      case 0:
      case 15:
        return R(t.type, !1);
      case 11:
        return R(t.type.render, !1);
      case 1:
        return R(t.type, !0);
      case 31:
        return Fe("Activity");
      case 30:
        return Fe("ViewTransition");
      default:
        return "";
    }
  }
  function Tt(t) {
    try {
      var e = "", l = null;
      do
        e += vt(t, l), l = t, t = t.return;
      while (t);
      return e;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var de = Object.prototype.hasOwnProperty, ie = c.unstable_scheduleCallback, O = c.unstable_cancelCallback, I = c.unstable_shouldYield, Mt = c.unstable_requestPaint, Ot = c.unstable_now, Ta = c.unstable_getCurrentPriorityLevel, Ql = c.unstable_ImmediatePriority, Pa = c.unstable_UserBlockingPriority, Ju = c.unstable_NormalPriority, O0 = c.unstable_LowPriority, Ef = c.unstable_IdlePriority, z0 = c.log, C0 = c.unstable_setDisableYieldValue, Kn = null, Ye = null;
  function Zl(t) {
    if (typeof z0 == "function" && C0(t), Ye && typeof Ye.setStrictMode == "function")
      try {
        Ye.setStrictMode(Kn, t);
      } catch {
      }
  }
  var qe = Math.clz32 ? Math.clz32 : R0, A0 = Math.log, j0 = Math.LN2;
  function R0(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (A0(t) / j0 | 0) | 0;
  }
  var $u = 256, ku = 262144, Fu = 4194304;
  function Na(t) {
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
  function Wu(t, e, l) {
    var a = t.pendingLanes;
    if (a === 0) return 0;
    var n = 0, u = t.suspendedLanes, i = t.pingedLanes;
    t = t.warmLanes;
    var f = a & 134217727;
    return f !== 0 ? (a = f & ~u, a !== 0 ? n = Na(a) : (i &= f, i !== 0 ? n = Na(i) : l || (l = f & ~t, l !== 0 && (n = Na(l))))) : (f = a & ~u, f !== 0 ? n = Na(f) : i !== 0 ? n = Na(i) : l || (l = a & ~t, l !== 0 && (n = Na(l)))), n === 0 ? 0 : e !== 0 && e !== n && (e & u) === 0 && (u = n & -n, l = e & -e, u >= l || u === 32 && (l & 4194048) !== 0) ? e : n;
  }
  function Jn(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function Tf(t, e) {
    (e & 8) !== 0 && (e |= e & 32);
    var l = t.entangledLanes;
    if (l !== 0)
      for (t = t.entanglements, l &= e; 0 < l; ) {
        var a = 31 - qe(l), n = 1 << a;
        e |= t[a], l &= ~n;
      }
    return e;
  }
  function D0(t, e) {
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
  function Nf() {
    var t = Fu;
    return Fu <<= 1, (Fu & 62914560) === 0 && (Fu = 4194304), t;
  }
  function Mc(t) {
    for (var e = [], l = 0; 31 > l; l++) e.push(t);
    return e;
  }
  function $n(t, e) {
    t.pendingLanes |= e, e !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function w0(t, e, l, a, n, u) {
    var i = t.pendingLanes;
    t.pendingLanes = l, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= l, t.entangledLanes &= l, t.errorRecoveryDisabledLanes &= l, t.shellSuspendCounter = 0;
    var f = t.entanglements, v = t.expirationTimes, T = t.hiddenUpdates;
    for (l = i & ~l; 0 < l; ) {
      var z = 31 - qe(l), w = 1 << z;
      f[z] = 0, v[z] = -1;
      var S = T[z];
      if (S !== null)
        for (T[z] = null, z = 0; z < S.length; z++) {
          var M = S[z];
          M !== null && (M.lane &= -536870913);
        }
      l &= ~w;
    }
    a !== 0 && xf(t, a, 0), u !== 0 && n === 0 && t.tag !== 0 && (t.suspendedLanes |= u & ~(i & ~e));
  }
  function xf(t, e, l) {
    t.pendingLanes |= e, t.suspendedLanes &= ~e;
    var a = 31 - qe(e);
    t.entangledLanes |= e, t.entanglements[a] = t.entanglements[a] | 1073741824 | l & 261930;
  }
  function Mf(t, e) {
    var l = t.entangledLanes |= e;
    for (t = t.entanglements; l; ) {
      var a = 31 - qe(l), n = 1 << a;
      n & e | t[a] & e && (t[a] |= e), l &= ~n;
    }
  }
  function Of(t, e) {
    var l = e & -e;
    return l = (l & 42) !== 0 ? 1 : Oc(l), (l & (t.suspendedLanes | e)) !== 0 ? 0 : l;
  }
  function Oc(t) {
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
  function zc(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function zf() {
    var t = ct.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : Bh(t.type));
  }
  function Cf(t, e) {
    var l = ct.p;
    try {
      return ct.p = t, e();
    } finally {
      ct.p = l;
    }
  }
  var zl = Math.random().toString(36).slice(2), ye = "__reactFiber$" + zl, De = "__reactProps$" + zl, tn = "__reactContainer$" + zl, Af = "__reactEvents$" + zl, U0 = "__reactListeners$" + zl, B0 = "__reactHandles$" + zl, jf = "__reactResources$" + zl, kn = "__reactMarker$" + zl, Iu = "__reactLoad$" + zl;
  function Pu(t) {
    delete t[ye], delete t[De], delete t[U0], delete t[B0];
  }
  function xa(t) {
    var e;
    if (e = t[ye]) return e;
    for (var l = t.parentNode; l; ) {
      if (e = l[tn] || l[ye]) {
        if (l = e.alternate, e.child !== null || l !== null && l.child !== null)
          for (t = gh(t); t !== null; ) {
            if (l = t[ye]) return l;
            t = gh(t);
          }
        return e;
      }
      t = l, l = t.parentNode;
    }
    return null;
  }
  function en(t) {
    if (t = t[ye] || t[tn]) {
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
  function ln(t) {
    var e = t[jf];
    return e || (e = t[jf] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), e;
  }
  function me(t) {
    t[kn] = !0;
  }
  function Rf(t) {
    t[Iu] = void 0;
  }
  var Df = /* @__PURE__ */ new Set(), wf = {};
  function Ma(t, e) {
    an(t, e), an(t + "Capture", e);
  }
  function an(t, e) {
    for (wf[t] = e, t = 0; t < e.length; t++)
      Df.add(e[t]);
  }
  var H0 = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Uf = {}, Bf = {};
  function L0(t) {
    return de.call(Bf, t) ? !0 : de.call(Uf, t) ? !1 : H0.test(t) ? Bf[t] = !0 : (Uf[t] = !0, !1);
  }
  var Ut = !1;
  function Hf() {
    var t = Ut;
    return Ut = !1, t;
  }
  function ti(t, e, l) {
    if (L0(e))
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
  function ei(t, e, l) {
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
  function Ge(t) {
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
  function Lf(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
  }
  function Y0(t, e, l) {
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
  function Cc(t) {
    if (!t._valueTracker) {
      var e = Lf(t) ? "checked" : "value";
      t._valueTracker = Y0(
        t,
        e,
        "" + t[e]
      );
    }
  }
  function Yf(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var l = e.getValue(), a = "";
    return t && (a = Lf(t) ? t.checked ? "true" : "false" : t.value), t = a, t !== l ? (e.setValue(t), !0) : !1;
  }
  var q0 = /[\n"\\]/g;
  function We(t) {
    return t.replace(
      q0,
      function(e) {
        return "\\" + e.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Ac(t, e, l, a, n, u, i, f) {
    t.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? t.type = i : t.removeAttribute("type"), e != null ? i === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + Ge(e)) : t.value !== "" + Ge(e) && (t.value = "" + Ge(e)) : i !== "submit" && i !== "reset" || t.removeAttribute("value"), e != null ? i === "number" && t.value == e ? jc(t, Ge(t.value)) : jc(t, Ge(e)) : l != null ? jc(t, Ge(l)) : a != null && t.removeAttribute("value"), n == null && u != null && (t.defaultChecked = !!u), n != null && (t.checked = n && typeof n != "function" && typeof n != "symbol"), f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? t.name = "" + Ge(f) : t.removeAttribute("name");
  }
  function qf(t, e, l, a, n, u, i, f) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (t.type = u), e != null || l != null) {
      if (!(u !== "submit" && u !== "reset" || e != null)) {
        Cc(t);
        return;
      }
      l = l != null ? "" + Ge(l) : "", e = e != null ? "" + Ge(e) : l, f || e === t.value || (t.value = e), t.defaultValue = e;
    }
    a = a ?? n, a = typeof a != "function" && typeof a != "symbol" && !!a, t.checked = f ? t.checked : !!a, t.defaultChecked = !!a, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (t.name = i), Cc(t);
  }
  function jc(t, e) {
    t.defaultValue !== "" + e && (t.defaultValue = "" + e);
  }
  function nn(t, e, l, a) {
    if (t = t.options, e) {
      e = {};
      for (var n = 0; n < l.length; n++)
        e["$" + l[n]] = !0;
      for (l = 0; l < t.length; l++)
        n = e.hasOwnProperty("$" + t[l].value), t[l].selected !== n && (t[l].selected = n), n && a && (t[l].defaultSelected = !0);
    } else {
      for (l = "" + Ge(l), e = null, n = 0; n < t.length; n++) {
        if (t[n].value === l) {
          t[n].selected = !0, a && (t[n].defaultSelected = !0);
          return;
        }
        e !== null || t[n].disabled || (e = t[n]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function Gf(t, e, l) {
    if (e != null && (e = "" + Ge(e), e !== t.value && (t.value = e), l == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = l != null ? "" + Ge(l) : "";
  }
  function Xf(t, e, l, a) {
    if (e == null) {
      if (a != null) {
        if (l != null) throw Error(s(92));
        if (ot(a)) {
          if (1 < a.length) throw Error(s(93));
          a = a[0];
        }
        l = a;
      }
      l == null && (l = ""), e = l;
    }
    l = Ge(e), t.defaultValue = l, a = t.textContent, a === l && a !== "" && a !== null && (t.value = a), Cc(t);
  }
  function un(t, e) {
    if (e) {
      var l = t.firstChild;
      if (l && l === t.lastChild && l.nodeType === 3) {
        l.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var G0 = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Vf(t, e, l) {
    var a = e.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? a ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "" : a ? t.setProperty(e, l) : typeof l != "number" || l === 0 || G0.has(e) ? e === "float" ? t.cssFloat = l : t[e] = ("" + l).trim() : t[e] = l + "px";
  }
  function Qf(t, e, l) {
    if (e != null && typeof e != "object")
      throw Error(s(62));
    if (t = t.style, l != null) {
      for (var a in l)
        !l.hasOwnProperty(a) || e != null && e.hasOwnProperty(a) || (a.indexOf("--") === 0 ? t.setProperty(a, "") : a === "float" ? t.cssFloat = "" : t[a] = "", Ut = !0);
      for (var n in e)
        a = e[n], e.hasOwnProperty(n) && l[n] !== a && (Vf(t, n, a), Ut = !0);
    } else
      for (var u in e)
        e.hasOwnProperty(u) && Vf(t, u, e[u]);
  }
  function Rc(t) {
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
  var X0 = /* @__PURE__ */ new Map([
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
  ]), V0 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function li(t) {
    return V0.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function gl() {
  }
  var Dc = null;
  function wc(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var cn = null, sn = null;
  function Zf(t) {
    var e = en(t);
    if (e && (t = e.stateNode)) {
      var l = t[De] || null;
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
              'input[name="' + We(
                "" + e
              ) + '"][type="radio"]'
            ), e = 0; e < l.length; e++) {
              var a = l[e];
              if (a !== t && a.form === t.form) {
                var n = a[De] || null;
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
              a = l[e], a.form === t.form && Yf(a);
          }
          break t;
        case "textarea":
          Gf(t, l.value, l.defaultValue);
          break t;
        case "select":
          e = l.value, e != null && nn(t, !!l.multiple, e, !1);
      }
    }
  }
  var Uc = !1;
  function Kf(t, e, l) {
    if (Uc) return t(e, l);
    Uc = !0;
    try {
      var a = t(e);
      return a;
    } finally {
      if (Uc = !1, (cn !== null || sn !== null) && (lc(), cn && (e = cn, t = sn, sn = cn = null, Zf(e), t)))
        for (e = 0; e < t.length; e++) Zf(t[e]);
    }
  }
  function Wn(t, e) {
    var l = t.stateNode;
    if (l === null) return null;
    var a = l[De] || null;
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
  var Al = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Bc = !1;
  if (Al)
    try {
      var In = {};
      Object.defineProperty(In, "passive", {
        get: function() {
          Bc = !0;
        }
      }), window.addEventListener("test", In, In), window.removeEventListener("test", In, In);
    } catch {
      Bc = !1;
    }
  var Kl = null, Hc = null, ai = null;
  function Jf() {
    if (ai) return ai;
    var t, e = Hc, l = e.length, a, n = "value" in Kl ? Kl.value : Kl.textContent, u = n.length;
    for (t = 0; t < l && e[t] === n[t]; t++) ;
    var i = l - t;
    for (a = 1; a <= i && e[l - a] === n[u - a]; a++) ;
    return ai = n.slice(t, 1 < a ? 1 - a : void 0);
  }
  function ni(t) {
    var e = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function ui() {
    return !0;
  }
  function $f() {
    return !1;
  }
  function ze(t) {
    function e(l, a, n, u, i) {
      this._reactName = l, this._targetInst = n, this.type = a, this.nativeEvent = u, this.target = i, this.currentTarget = null;
      for (var f in t)
        t.hasOwnProperty(f) && (l = t[f], this[f] = l ? l(u) : u[f]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? ui : $f, this.isPropagationStopped = $f, this;
    }
    return K(e.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = ui);
      },
      stopPropagation: function() {
        var l = this.nativeEvent;
        l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = ui);
      },
      persist: function() {
      },
      isPersistent: ui
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
  }, ii = ze(Jl), Pn = K({}, Jl, { view: 0, detail: 0 }), Q0 = ze(Pn), Lc, Yc, tu, ci = K({}, Pn, {
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
    getModifierState: Gc,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== tu && (tu && t.type === "mousemove" ? (Lc = t.screenX - tu.screenX, Yc = t.screenY - tu.screenY) : Yc = Lc = 0, tu = t), Lc);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : Yc;
    }
  }), kf = ze(ci), Z0 = K({}, ci, { dataTransfer: 0 }), K0 = ze(Z0), J0 = K({}, Pn, { relatedTarget: 0 }), qc = ze(J0), $0 = K({}, Jl, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), k0 = ze($0), F0 = K({}, Jl, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), W0 = ze(F0), I0 = K({}, Jl, { data: 0 }), Ff = ze(I0), P0 = {
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
  }, tv = {
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
  }, ev = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function lv(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = ev[t]) ? !!e[t] : !1;
  }
  function Gc() {
    return lv;
  }
  var av = K({}, Pn, {
    key: function(t) {
      if (t.key) {
        var e = P0[t.key] || t.key;
        if (e !== "Unidentified") return e;
      }
      return t.type === "keypress" ? (t = ni(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? tv[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Gc,
    charCode: function(t) {
      return t.type === "keypress" ? ni(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? ni(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), nv = ze(av), uv = K({}, ci, {
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
  }), Wf = ze(uv), iv = K({}, Jl, { submitter: 0 }), cv = ze(iv), sv = K({}, Pn, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Gc
  }), rv = ze(sv), fv = K({}, Jl, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), ov = ze(fv), dv = K({}, ci, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), mv = ze(dv), hv = K({}, Jl, {
    newState: 0,
    oldState: 0,
    source: 0
  }), vv = ze(hv), gv = [9, 13, 27, 32], Xc = Al && "CompositionEvent" in window, eu = null;
  Al && "documentMode" in document && (eu = document.documentMode);
  var yv = Al && "TextEvent" in window && !eu, If = Al && (!Xc || eu && 8 < eu && 11 >= eu), Pf = " ", to = !1;
  function eo(t, e) {
    switch (t) {
      case "keyup":
        return gv.indexOf(e.keyCode) !== -1;
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
  var rn = !1;
  function bv(t, e) {
    switch (t) {
      case "compositionend":
        return lo(e);
      case "keypress":
        return e.which !== 32 ? null : (to = !0, Pf);
      case "textInput":
        return t = e.data, t === Pf && to ? null : t;
      default:
        return null;
    }
  }
  function pv(t, e) {
    if (rn)
      return t === "compositionend" || !Xc && eo(t, e) ? (t = Jf(), ai = Hc = Kl = null, rn = !1, t) : null;
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
        return If && e.locale !== "ko" ? null : e.data;
      default:
        return null;
    }
  }
  var Sv = {
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
    return e === "input" ? !!Sv[t.type] : e === "textarea";
  }
  function no(t, e, l, a) {
    cn ? sn ? sn.push(a) : sn = [a] : cn = a, e = sc(e, "onChange"), 0 < e.length && (l = new ii(
      "onChange",
      "change",
      null,
      l,
      a
    ), t.push({ event: l, listeners: e }));
  }
  var lu = null, au = null;
  function _v(t) {
    Km(t, 0);
  }
  function si(t) {
    var e = Fn(t);
    if (Yf(e)) return t;
  }
  function uo(t, e) {
    if (t === "change") return e;
  }
  var io = !1;
  if (Al) {
    var Vc;
    if (Al) {
      var Qc = "oninput" in document;
      if (!Qc) {
        var co = document.createElement("div");
        co.setAttribute("oninput", "return;"), Qc = typeof co.oninput == "function";
      }
      Vc = Qc;
    } else Vc = !1;
    io = Vc && (!document.documentMode || 9 < document.documentMode);
  }
  function so() {
    lu && (lu.detachEvent("onpropertychange", ro), au = lu = null);
  }
  function ro(t) {
    if (t.propertyName === "value" && si(au)) {
      var e = [];
      no(
        e,
        au,
        t,
        wc(t)
      ), Kf(_v, e);
    }
  }
  function Ev(t, e, l) {
    t === "focusin" ? (so(), lu = e, au = l, lu.attachEvent("onpropertychange", ro)) : t === "focusout" && so();
  }
  function Tv(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return si(au);
  }
  function Nv(t, e) {
    if (t === "click") return si(e);
  }
  function xv(t, e) {
    if (t === "input" || t === "change")
      return si(e);
  }
  function Mv(t, e) {
    return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
  }
  var Xe = typeof Object.is == "function" ? Object.is : Mv;
  function nu(t, e) {
    if (Xe(t, e)) return !0;
    if (typeof t != "object" || t === null || typeof e != "object" || e === null)
      return !1;
    var l = Object.keys(t), a = Object.keys(e);
    if (l.length !== a.length) return !1;
    for (a = 0; a < l.length; a++) {
      var n = l[a];
      if (!de.call(e, n) || !Xe(t[n], e[n]))
        return !1;
    }
    return !0;
  }
  function Zc(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  function fo(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function oo(t, e) {
    var l = fo(t);
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
      l = fo(l);
    }
  }
  function mo(t, e) {
    return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? mo(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
  }
  function ho(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var e = Zc(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var l = typeof e.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) t = e.contentWindow;
      else break;
      e = Zc(t.document);
    }
    return e;
  }
  function Kc(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
  }
  var Ov = Al && "documentMode" in document && 11 >= document.documentMode, fn = null, Jc = null, uu = null, $c = !1;
  function vo(t, e, l) {
    var a = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    $c || fn == null || fn !== Zc(a) || (a = fn, "selectionStart" in a && Kc(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), uu && nu(uu, a) || (uu = a, a = sc(Jc, "onSelect"), 0 < a.length && (e = new ii(
      "onSelect",
      "select",
      null,
      e,
      l
    ), t.push({ event: e, listeners: a }), e.target = fn)));
  }
  function Oa(t, e) {
    var l = {};
    return l[t.toLowerCase()] = e.toLowerCase(), l["Webkit" + t] = "webkit" + e, l["Moz" + t] = "moz" + e, l;
  }
  var on = {
    animationend: Oa("Animation", "AnimationEnd"),
    animationiteration: Oa("Animation", "AnimationIteration"),
    animationstart: Oa("Animation", "AnimationStart"),
    transitionrun: Oa("Transition", "TransitionRun"),
    transitionstart: Oa("Transition", "TransitionStart"),
    transitioncancel: Oa("Transition", "TransitionCancel"),
    transitionend: Oa("Transition", "TransitionEnd")
  }, kc = {}, go = {};
  Al && (go = document.createElement("div").style, "AnimationEvent" in window || (delete on.animationend.animation, delete on.animationiteration.animation, delete on.animationstart.animation), "TransitionEvent" in window || delete on.transitionend.transition);
  function za(t) {
    if (kc[t]) return kc[t];
    if (!on[t]) return t;
    var e = on[t], l;
    for (l in e)
      if (e.hasOwnProperty(l) && l in go)
        return kc[t] = e[l];
    return t;
  }
  var yo = za("animationend"), bo = za("animationiteration"), po = za("animationstart"), zv = za("transitionrun"), Cv = za("transitionstart"), Av = za("transitioncancel"), So = za("transitionend"), _o = /* @__PURE__ */ new Map(), Fc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Fc.push("scrollEnd");
  function il(t, e) {
    _o.set(t, e), Ma(e, [t]);
  }
  var jv = 0;
  function jl(t, e) {
    if (t.name != null && t.name !== "auto") return t.name;
    if (e.autoName !== null) return e.autoName;
    t = fl.identifierPrefix;
    var l = jv++;
    return t = "_" + t + "t_" + l.toString(32) + "_", e.autoName = t;
  }
  function Eo(t) {
    if (t == null || typeof t == "string")
      return t;
    var e = null, l = jn;
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
  function Rl(t, e) {
    return t = Eo(t), e = Eo(e), e == null ? t === "auto" ? null : t : e === "auto" ? null : e;
  }
  var ri = typeof reportError == "function" ? reportError : function(t) {
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
  }, Ie = [], dn = 0, Wc = 0;
  function fi() {
    for (var t = dn, e = Wc = dn = 0; e < t; ) {
      var l = Ie[e];
      Ie[e++] = null;
      var a = Ie[e];
      Ie[e++] = null;
      var n = Ie[e];
      Ie[e++] = null;
      var u = Ie[e];
      if (Ie[e++] = null, a !== null && n !== null) {
        var i = a.pending;
        i === null ? n.next = n : (n.next = i.next, i.next = n), a.pending = n;
      }
      u !== 0 && To(l, n, u);
    }
  }
  function oi(t, e, l, a) {
    Ie[dn++] = t, Ie[dn++] = e, Ie[dn++] = l, Ie[dn++] = a, Wc |= a, t.lanes |= a, t = t.alternate, t !== null && (t.lanes |= a);
  }
  function Ic(t, e, l, a) {
    return oi(t, e, l, a), di(t);
  }
  function Ca(t, e) {
    return oi(t, null, null, e), di(t);
  }
  function To(t, e, l) {
    t.lanes |= l;
    var a = t.alternate;
    a !== null && (a.lanes |= l);
    for (var n = !1, u = t.return; u !== null; )
      u.childLanes |= l, a = u.alternate, a !== null && (a.childLanes |= l), u.tag === 22 && (t = u.stateNode, t === null || t._visibility & 1 || (n = !0)), t = u, u = u.return;
    return t.tag === 3 ? (u = t.stateNode, n && e !== null && (n = 31 - qe(l), t = u.hiddenUpdates, a = t[n], a === null ? t[n] = [e] : a.push(e), e.lane = l | 536870912), u) : null;
  }
  function di(t) {
    if (50 < Ou)
      throw Ou = 0, ec = null, Error(s(185));
    for (var e = t.return; e !== null; )
      t = e, e = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var mn = {};
  function Rv(t, e, l, a) {
    this.tag = t, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function we(t, e, l, a) {
    return new Rv(t, e, l, a);
  }
  function Pc(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Dl(t, e) {
    var l = t.alternate;
    return l === null ? (l = we(
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
  function mi(t, e, l, a, n, u) {
    var i = 0;
    if (a = t, typeof a == "function") Pc(a) && (i = 1);
    else if (typeof a == "string")
      i = iy(
        t,
        l,
        G.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (a) {
        case Zt:
          return t = we(31, l, e, n), t.elementType = Zt, t.lanes = u, t;
        case et:
          return Aa(l.children, n, u, e);
        case ft:
          i = 8, n |= 24;
          break;
        case Qt:
          return t = we(12, l, e, n | 2), t.elementType = Qt, t.lanes = u, t;
        case Y:
          return t = we(13, l, e, n), t.elementType = Y, t.lanes = u, t;
        case L:
          return t = we(19, l, e, n), t.elementType = L, t.lanes = u, t;
        case Ft:
        case p:
          return t = n | 32, t = we(30, l, e, t), t.elementType = p, t.lanes = u, t.stateNode = {
            autoName: null,
            paired: null,
            clones: null,
            ref: null
          }, t;
        default:
          if (typeof a == "object" && a !== null)
            switch (a.$$typeof) {
              case St:
                i = 10;
                break t;
              case kt:
                i = 9;
                break t;
              case q:
                i = 11;
                break t;
              case $:
                i = 14;
                break t;
              case it:
                i = 16, a = null;
                break t;
            }
          i = 29, l = Error(
            s(130, t === null ? "null" : typeof t, "")
          ), a = null;
      }
    return e = we(i, l, e, n), e.elementType = t, e.type = a, e.lanes = u, e;
  }
  function Aa(t, e, l, a) {
    return t = we(7, t, a, e), t.lanes = l, t;
  }
  function ts(t, e, l) {
    return t = we(6, t, null, e), t.lanes = l, t;
  }
  function xo(t) {
    var e = we(18, null, null, 0);
    return e.stateNode = t, e;
  }
  function es(t, e, l) {
    return e = we(
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
  function Pe(t, e) {
    if (typeof t == "object" && t !== null) {
      var l = Mo.get(t);
      return l !== void 0 ? l : (e = {
        value: t,
        source: e,
        stack: Tt(e)
      }, Mo.set(t, e), e);
    }
    return {
      value: t,
      source: e,
      stack: Tt(e)
    };
  }
  var hn = [], vn = 0, hi = null, iu = 0, tl = [], el = 0, $l = null, yl = 1, bl = "";
  function wl(t, e) {
    hn[vn++] = iu, hn[vn++] = hi, hi = t, iu = e;
  }
  function Oo(t, e, l) {
    tl[el++] = yl, tl[el++] = bl, tl[el++] = $l, $l = t;
    var a = yl;
    t = bl;
    var n = 32 - qe(a) - 1;
    a &= ~(1 << n), l += 1;
    var u = 32 - qe(e) + n;
    if (30 < u) {
      var i = n - n % 5;
      u = (a & (1 << i) - 1).toString(32), a >>= i, n -= i, yl = 1 << 32 - qe(e) + n | l << n | a, bl = u + t;
    } else
      yl = 1 << u | l << n | a, bl = t;
  }
  function vi(t) {
    t.return !== null && (wl(t, 1), Oo(t, 1, 0));
  }
  function ls(t) {
    for (; t === hi; )
      hi = hn[--vn], hn[vn] = null, iu = hn[--vn], hn[vn] = null;
    for (; t === $l; )
      $l = tl[--el], tl[el] = null, bl = tl[--el], tl[el] = null, yl = tl[--el], tl[el] = null;
  }
  function zo(t, e) {
    tl[el++] = yl, tl[el++] = bl, tl[el++] = $l, yl = e.id, bl = e.overflow, $l = t;
  }
  var he = null, Kt = null, _t = !1, kl = null, ll = !1, as = Error(s(519));
  function Fl(t) {
    var e = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw cu(Pe(e, t)), as;
  }
  function Co(t) {
    var e = t.stateNode, l = t.type, a = t.memoizedProps;
    switch (e[ye] = t, e[De] = a, l) {
      case "dialog":
        Ct("cancel", e), Ct("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        Ct("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Cu.length; l++)
          Ct(Cu[l], e);
        break;
      case "source":
        Ct("error", e);
        break;
      case "img":
      case "image":
      case "link":
        Ct("error", e), Ct("load", e);
        break;
      case "details":
        Ct("toggle", e);
        break;
      case "input":
        Ct("invalid", e), qf(
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
        Ct("invalid", e);
        break;
      case "textarea":
        Ct("invalid", e), Xf(e, a.value, a.defaultValue, a.children);
    }
    l = a.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || e.textContent === "" + l || a.suppressHydrationWarning === !0 || Fm(e.textContent, l) ? (a.popover != null && (Ct("beforetoggle", e), Ct("toggle", e)), a.onScroll != null && Ct("scroll", e), a.onScrollEnd != null && Ct("scrollend", e), a.onClick != null && (e.onclick = gl), e = !0) : e = !1, e || Fl(t, !0);
  }
  function gi(t) {
    for (he = t.return; he; )
      switch (he.tag) {
        case 5:
        case 31:
        case 13:
          ll = !1;
          return;
        case 27:
        case 3:
          ll = !0;
          return;
        default:
          he = he.return;
      }
  }
  function gn(t) {
    if (t !== he) return !1;
    if (!_t) return gi(t), _t = !0, !1;
    var e = t.tag, l;
    if ((l = e !== 3 && e !== 27) && ((l = e === 5) && (l = t.type, l = !(l !== "form" && l !== "button") || Dr(t.type, t.memoizedProps)), l = !l), l && Kt && Fl(t), gi(t), e === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      Kt = vh(t);
    } else if (e === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      Kt = vh(t);
    } else
      e === 27 ? (e = Kt, da(t.type) ? (t = Xr, Xr = null, Kt = t) : Kt = e) : Kt = he ? nl(t.stateNode.nextSibling) : null;
    return !0;
  }
  function ja() {
    Kt = he = null, _t = !1;
  }
  function ns() {
    var t = kl;
    return t !== null && (He === null ? He = t : He.push.apply(
      He,
      t
    ), kl = null), t;
  }
  function cu(t) {
    kl === null ? kl = [t] : kl.push(t);
  }
  var us = It(null), Ra = null, Ul = null;
  function Wl(t, e, l) {
    xt(us, e._currentValue), e._currentValue = l;
  }
  function Bl(t) {
    t._currentValue = us.current, $t(us);
  }
  function yi(t, e, l) {
    for (; t !== null; ) {
      var a = t.alternate;
      if ((t.childLanes & e) !== e ? (t.childLanes |= e, a !== null && (a.childLanes |= e)) : a !== null && (a.childLanes & e) !== e && (a.childLanes |= e), t === l) break;
      t = t.return;
    }
  }
  function is(t, e, l, a) {
    var n = t.child;
    for (n !== null && (n.return = t); n !== null; ) {
      var u = n.dependencies;
      if (u !== null) {
        var i = n.child;
        u = u.firstContext;
        t: for (; u !== null; ) {
          var f = u;
          u = n;
          for (var v = 0; v < e.length; v++)
            if (f.context === e[v]) {
              u.lanes |= l, f = u.alternate, f !== null && (f.lanes |= l), yi(
                u.return,
                l,
                t
              ), a || (i = null);
              break t;
            }
          u = f.next;
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
  function Da(t, e, l, a) {
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
          var f = n.type;
          Xe(n.pendingProps.value, i.value) || (t !== null ? t.push(f) : t = [f]);
        }
      } else if (n === Re.current) {
        if (i = n.alternate, i === null) throw Error(s(387));
        i.memoizedState.memoizedState !== n.memoizedState.memoizedState && (t !== null ? t.push(Gn) : t = [Gn]);
      }
      n = n.return;
    }
    return t !== null && is(
      e,
      t,
      l,
      a
    ), e.flags |= 262144, t !== null;
  }
  function bi(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!Xe(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function wa(t) {
    Ra = t, Ul = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function be(t) {
    return Ao(Ra, t);
  }
  function pi(t, e) {
    return Ra === null && wa(t), Ao(t, e);
  }
  function Ao(t, e) {
    var l = e._currentValue;
    if (e = { context: e, memoizedValue: l, next: null }, Ul === null) {
      if (t === null) throw Error(s(308));
      Ul = e, t.dependencies = { lanes: 0, firstContext: e }, t.flags |= 524288;
    } else Ul = Ul.next = e;
    return l;
  }
  var Dv = typeof AbortController < "u" ? AbortController : function() {
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
  }, wv = c.unstable_scheduleCallback, Uv = c.unstable_NormalPriority, ce = {
    $$typeof: St,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function cs() {
    return {
      controller: new Dv(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function su(t) {
    t.refCount--, t.refCount === 0 && wv(Uv, function() {
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
  var ru = null;
  function Bv(t) {
    var e = t.transitionTypes;
    return t.transitionTypes = null, e;
  }
  var fu = null, ss = 0, Ua = 0, yn = null;
  function Hv(t, e) {
    if (fu === null) {
      var l = fu = [];
      ss = 0, Ua = Nr(), yn = {
        status: "pending",
        value: void 0,
        then: function(a) {
          l.push(a);
        }
      };
    }
    return ss++, e.then(Ro, Ro), e;
  }
  function Ro() {
    if (--ss === 0 && (ru = null, fu !== null)) {
      yn !== null && (yn.status = "fulfilled");
      var t = fu;
      fu = null, Ua = 0, yn = null;
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function Lv(t, e) {
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
  var Do = J.S;
  J.S = function(t, e) {
    if (xm = Ot(), typeof e == "object" && e !== null && typeof e.then == "function" && Hv(t, e), ru !== null)
      for (var l = Un; l !== null; )
        jo(l, ru), l = l.next;
    if (l = t.types, l !== null) {
      for (var a = Un; a !== null; )
        jo(a, l), a = a.next;
      if (Ua !== 0) {
        a = ru, a === null && (a = ru = []);
        for (var n = 0; n < l.length; n++) {
          var u = l[n];
          a.indexOf(u) === -1 && a.push(u);
        }
      }
    }
    Do !== null && Do(t, e);
  };
  var Ba = It(null);
  function rs() {
    var t = Ba.current;
    return t !== null ? t : Vt.pooledCache;
  }
  function Si(t, e) {
    e === null ? xt(Ba, Ba.current) : xt(Ba, e.pool);
  }
  function wo() {
    var t = rs();
    return t === null ? null : { parent: ce._currentValue, pool: t };
  }
  var bn = Error(s(460)), fs = Error(s(474)), _i = Error(s(542)), Ei = { then: function() {
  } };
  function Uo(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function Bo(t, e, l) {
    switch (l = t[l], l === void 0 ? t.push(e) : l !== e && (e.then(gl, gl), e = l), e.status) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw t = e.reason, Lo(t), t === void 0 && !("reason" in e) ? Error(s(600)) : t;
      default:
        if (typeof e.status == "string") e.then(gl, gl);
        else {
          if (t = Vt, t !== null && 100 < t.shellSuspendCounter)
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
        throw La = e, bn;
    }
  }
  function Ha(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (La = l, bn) : l;
    }
  }
  var La = null;
  function Ho() {
    if (La === null) throw Error(s(459));
    var t = La;
    return La = null, t;
  }
  function Lo(t) {
    if (t === bn || t === _i)
      throw Error(s(483));
  }
  var pn = null, ou = 0;
  function Ti(t) {
    var e = ou;
    return ou += 1, pn === null && (pn = []), Bo(pn, t, e);
  }
  function Il(t, e) {
    e = e.props.ref, t.ref = e !== void 0 ? e : null;
  }
  function Ni(t, e) {
    throw e.$$typeof === dt ? Error(s(525)) : (t = Object.prototype.toString.call(e), Error(
      s(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t
      )
    ));
  }
  function Yo(t) {
    function e(E, y) {
      if (t) {
        var x = E.deletions;
        x === null ? (E.deletions = [y], E.flags |= 16) : x.push(y);
      }
    }
    function l(E, y) {
      if (!t) return null;
      for (; y !== null; )
        e(E, y), y = y.sibling;
      return null;
    }
    function a(E) {
      for (var y = /* @__PURE__ */ new Map(); E !== null; )
        E.key === null ? y.set(E.index, E) : y.set(E.key, E), E = E.sibling;
      return y;
    }
    function n(E, y) {
      return E = Dl(E, y), E.index = 0, E.sibling = null, E;
    }
    function u(E, y, x) {
      return E.index = x, t ? (x = E.alternate, x !== null ? (x = x.index, x < y ? (E.flags |= 2, y) : x) : (E.flags |= 134217730, y)) : (E.flags |= 1048576, y);
    }
    function i(E) {
      return t && E.alternate === null && (E.flags |= 134217730), E;
    }
    function f(E, y, x, D) {
      return y === null || y.tag !== 6 ? (y = ts(x, E.mode, D), y.return = E, y) : (y = n(y, x), y.return = E, y);
    }
    function v(E, y, x, D) {
      var W = x.type;
      return W === et ? (E = z(
        E,
        y,
        x.props.children,
        D,
        x.key
      ), Il(E, x), E) : y !== null && (y.elementType === W || typeof W == "object" && W !== null && W.$$typeof === it && Ha(W) === y.type) ? (y = n(y, x.props), Il(y, x), y.return = E, y) : (y = mi(
        x.type,
        x.key,
        x.props,
        null,
        E.mode,
        D
      ), Il(y, x), y.return = E, y);
    }
    function T(E, y, x, D) {
      return y === null || y.tag !== 4 || y.stateNode.containerInfo !== x.containerInfo || y.stateNode.implementation !== x.implementation ? (y = es(x, E.mode, D), y.return = E, y) : (y = n(y, x.children || []), y.return = E, y);
    }
    function z(E, y, x, D, W) {
      return y === null || y.tag !== 7 ? (y = Aa(
        x,
        E.mode,
        D,
        W
      ), y.return = E, y) : (y = n(y, x), y.return = E, y);
    }
    function w(E, y, x) {
      if (typeof y == "string" && y !== "" || typeof y == "number" || typeof y == "bigint")
        return y = ts(
          "" + y,
          E.mode,
          x
        ), y.return = E, y;
      if (typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case Gt:
            return x = mi(
              y.type,
              y.key,
              y.props,
              null,
              E.mode,
              x
            ), Il(x, y), x.return = E, x;
          case at:
            return y = es(
              y,
              E.mode,
              x
            ), y.return = E, y;
          case it:
            return y = Ha(y), w(E, y, x);
        }
        if (ot(y) || P(y))
          return y = Aa(
            y,
            E.mode,
            x,
            null
          ), y.return = E, y;
        if (typeof y.then == "function")
          return w(E, Ti(y), x);
        if (y.$$typeof === St)
          return w(
            E,
            pi(E, y),
            x
          );
        Ni(E, y);
      }
      return null;
    }
    function S(E, y, x, D) {
      var W = y !== null ? y.key : null;
      if (typeof x == "string" && x !== "" || typeof x == "number" || typeof x == "bigint")
        return W !== null ? null : f(E, y, "" + x, D);
      if (typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case Gt:
            return x.key === W ? v(E, y, x, D) : null;
          case at:
            return x.key === W ? T(E, y, x, D) : null;
          case it:
            return x = Ha(x), S(E, y, x, D);
        }
        if (ot(x) || P(x))
          return W !== null ? null : z(E, y, x, D, null);
        if (typeof x.then == "function")
          return S(
            E,
            y,
            Ti(x),
            D
          );
        if (x.$$typeof === St)
          return S(
            E,
            y,
            pi(E, x),
            D
          );
        Ni(E, x);
      }
      return null;
    }
    function M(E, y, x, D, W) {
      if (typeof D == "string" && D !== "" || typeof D == "number" || typeof D == "bigint")
        return E = E.get(x) || null, f(y, E, "" + D, W);
      if (typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case Gt:
            return E = E.get(
              D.key === null ? x : D.key
            ) || null, v(y, E, D, W);
          case at:
            return E = E.get(
              D.key === null ? x : D.key
            ) || null, T(y, E, D, W);
          case it:
            return D = Ha(D), M(
              E,
              y,
              x,
              D,
              W
            );
        }
        if (ot(D) || P(D))
          return E = E.get(x) || null, z(y, E, D, W, null);
        if (typeof D.then == "function")
          return M(
            E,
            y,
            x,
            Ti(D),
            W
          );
        if (D.$$typeof === St)
          return M(
            E,
            y,
            x,
            pi(y, D),
            W
          );
        Ni(y, D);
      }
      return null;
    }
    function V(E, y, x, D) {
      for (var W = null, Rt = null, ut = y, rt = y = 0, fe = null; ut !== null && rt < x.length; rt++) {
        ut.index > rt ? (fe = ut, ut = null) : fe = ut.sibling;
        var Dt = S(
          E,
          ut,
          x[rt],
          D
        );
        if (Dt === null) {
          ut === null && (ut = fe);
          break;
        }
        t && ut && Dt.alternate === null && e(E, ut), y = u(Dt, y, rt), Rt === null ? W = Dt : Rt.sibling = Dt, Rt = Dt, ut = fe;
      }
      if (rt === x.length)
        return l(E, ut), _t && wl(E, rt), W;
      if (ut === null) {
        for (; rt < x.length; rt++)
          ut = w(E, x[rt], D), ut !== null && (y = u(
            ut,
            y,
            rt
          ), Rt === null ? W = ut : Rt.sibling = ut, Rt = ut);
        return _t && wl(E, rt), W;
      }
      for (ut = a(ut); rt < x.length; rt++)
        fe = M(
          ut,
          E,
          rt,
          x[rt],
          D
        ), fe !== null && (t && (Dt = fe.alternate, Dt !== null && ut.delete(Dt.key === null ? rt : Dt.key)), y = u(
          fe,
          y,
          rt
        ), Rt === null ? W = fe : Rt.sibling = fe, Rt = fe);
      return t && ut.forEach(function(ya) {
        return e(E, ya);
      }), _t && wl(E, rt), W;
    }
    function tt(E, y, x, D) {
      if (x == null) throw Error(s(151));
      for (var W = null, Rt = null, ut = y, rt = y = 0, fe = null, Dt = x.next(); ut !== null && !Dt.done; rt++, Dt = x.next()) {
        ut.index > rt ? (fe = ut, ut = null) : fe = ut.sibling;
        var ya = S(E, ut, Dt.value, D);
        if (ya === null) {
          ut === null && (ut = fe);
          break;
        }
        t && ut && ya.alternate === null && e(E, ut), y = u(ya, y, rt), Rt === null ? W = ya : Rt.sibling = ya, Rt = ya, ut = fe;
      }
      if (Dt.done)
        return l(E, ut), _t && wl(E, rt), W;
      if (ut === null) {
        for (; !Dt.done; rt++, Dt = x.next())
          Dt = w(E, Dt.value, D), Dt !== null && (y = u(Dt, y, rt), Rt === null ? W = Dt : Rt.sibling = Dt, Rt = Dt);
        return _t && wl(E, rt), W;
      }
      for (ut = a(ut); !Dt.done; rt++, Dt = x.next())
        Dt = M(ut, E, rt, Dt.value, D), Dt !== null && (t && (fe = Dt.alternate, fe !== null && ut.delete(
          fe.key === null ? rt : fe.key
        )), y = u(Dt, y, rt), Rt === null ? W = Dt : Rt.sibling = Dt, Rt = Dt);
      return t && ut.forEach(function(by) {
        return e(E, by);
      }), _t && wl(E, rt), W;
    }
    function bt(E, y, x, D) {
      if (typeof x == "object" && x !== null && x.type === et && x.key === null && x.props.ref === void 0 && (x = x.props.children), typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case Gt:
            t: {
              for (var W = x.key; y !== null; ) {
                if (y.key === W) {
                  if (W = x.type, W === et) {
                    if (y.tag === 7) {
                      l(
                        E,
                        y.sibling
                      ), D = n(
                        y,
                        x.props.children
                      ), Il(D, x), D.return = E, E = D;
                      break t;
                    }
                  } else if (y.elementType === W || typeof W == "object" && W !== null && W.$$typeof === it && Ha(W) === y.type) {
                    l(
                      E,
                      y.sibling
                    ), D = n(y, x.props), Il(D, x), D.return = E, E = D;
                    break t;
                  }
                  l(E, y);
                  break;
                } else e(E, y);
                y = y.sibling;
              }
              x.type === et ? (D = Aa(
                x.props.children,
                E.mode,
                D,
                x.key
              ), Il(D, x), D.return = E, E = D) : (D = mi(
                x.type,
                x.key,
                x.props,
                null,
                E.mode,
                D
              ), Il(D, x), D.return = E, E = D);
            }
            return i(E);
          case at:
            t: {
              for (W = x.key; y !== null; ) {
                if (y.key === W)
                  if (y.tag === 4 && y.stateNode.containerInfo === x.containerInfo && y.stateNode.implementation === x.implementation) {
                    l(
                      E,
                      y.sibling
                    ), D = n(y, x.children || []), D.return = E, E = D;
                    break t;
                  } else {
                    l(E, y);
                    break;
                  }
                else e(E, y);
                y = y.sibling;
              }
              D = es(x, E.mode, D), D.return = E, E = D;
            }
            return i(E);
          case it:
            return x = Ha(x), bt(
              E,
              y,
              x,
              D
            );
        }
        if (ot(x))
          return V(
            E,
            y,
            x,
            D
          );
        if (P(x)) {
          if (W = P(x), typeof W != "function") throw Error(s(150));
          return x = W.call(x), tt(
            E,
            y,
            x,
            D
          );
        }
        if (typeof x.then == "function")
          return bt(
            E,
            y,
            Ti(x),
            D
          );
        if (x.$$typeof === St)
          return bt(
            E,
            y,
            pi(E, x),
            D
          );
        Ni(E, x);
      }
      return typeof x == "string" && x !== "" || typeof x == "number" || typeof x == "bigint" ? (x = "" + x, y !== null && y.tag === 6 ? (l(E, y.sibling), D = n(y, x), D.return = E, E = D) : (l(E, y), D = ts(x, E.mode, D), D.return = E, E = D), i(E)) : l(E, y);
    }
    return function(E, y, x, D) {
      try {
        ou = 0;
        var W = bt(
          E,
          y,
          x,
          D
        );
        return pn = null, W;
      } catch (ut) {
        if (ut === bn || ut === _i) throw ut;
        var Rt = we(29, ut, null, E.mode);
        return Rt.lanes = D, Rt.return = E, Rt;
      }
    };
  }
  var Ya = Yo(!0), qo = Yo(!1), Pl = !1;
  function os(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function ds(t, e) {
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
    if (a = a.shared, (Bt & 2) !== 0) {
      var n = a.pending;
      return n === null ? e.next = e : (e.next = n.next, n.next = e), a.pending = e, e = di(t), To(t, null, l), e;
    }
    return oi(t, a, e, l), di(t);
  }
  function du(t, e, l) {
    if (e = e.updateQueue, e !== null && (e = e.shared, (l & 4194048) !== 0)) {
      var a = e.lanes;
      a &= t.pendingLanes, l |= a, e.lanes = l, Mf(t, l);
    }
  }
  function ms(t, e) {
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
  var hs = !1;
  function mu() {
    if (hs) {
      var t = yn;
      if (t !== null) throw t;
    }
  }
  function hu(t, e, l, a) {
    hs = !1;
    var n = t.updateQueue;
    Pl = !1;
    var u = n.firstBaseUpdate, i = n.lastBaseUpdate, f = n.shared.pending;
    if (f !== null) {
      n.shared.pending = null;
      var v = f, T = v.next;
      v.next = null, i === null ? u = T : i.next = T, i = v;
      var z = t.alternate;
      z !== null && (z = z.updateQueue, f = z.lastBaseUpdate, f !== i && (f === null ? z.firstBaseUpdate = T : f.next = T, z.lastBaseUpdate = v));
    }
    if (u !== null) {
      var w = n.baseState;
      i = 0, z = T = v = null, f = u;
      do {
        var S = f.lane & -536870913, M = S !== f.lane;
        if (M ? (jt & S) === S : (a & S) === S) {
          S !== 0 && S === Ua && (hs = !0), z !== null && (z = z.next = {
            lane: 0,
            tag: f.tag,
            payload: f.payload,
            callback: null,
            next: null
          });
          t: {
            var V = t, tt = f;
            S = e;
            var bt = l;
            switch (tt.tag) {
              case 1:
                if (V = tt.payload, typeof V == "function") {
                  w = V.call(bt, w, S);
                  break t;
                }
                w = V;
                break t;
              case 3:
                V.flags = V.flags & -65537 | 128;
              case 0:
                if (V = tt.payload, S = typeof V == "function" ? V.call(bt, w, S) : V, S == null) break t;
                w = K({}, w, S);
                break t;
              case 2:
                Pl = !0;
            }
          }
          S = f.callback, S !== null && (t.flags |= 64, M && (t.flags |= 8192), M = n.callbacks, M === null ? n.callbacks = [S] : M.push(S));
        } else
          M = {
            lane: S,
            tag: f.tag,
            payload: f.payload,
            callback: f.callback,
            next: null
          }, z === null ? (T = z = M, v = w) : z = z.next = M, i |= S;
        if (f = f.next, f === null) {
          if (f = n.shared.pending, f === null)
            break;
          M = f, f = M.next, M.next = null, n.lastBaseUpdate = M, n.shared.pending = null;
        }
      } while (!0);
      z === null && (v = w), n.baseState = v, n.firstBaseUpdate = T, n.lastBaseUpdate = z, u === null && (n.shared.lanes = 0), sa |= i, t.lanes = i, t.memoizedState = w;
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
  var la = It(null), xi = It(0);
  function Vo(t, e) {
    t = Gl, xt(xi, t), xt(la, e), Gl = t | e.baseLanes;
  }
  function vs() {
    xt(xi, Gl), xt(la, la.current);
  }
  function gs() {
    Gl = xi.current, $t(la), $t(xi);
  }
  var pe = It(null), Me = null;
  function aa(t) {
    var e = t.alternate;
    xt(Se, Se.current & 1), xt(pe, t), Me === null && (e === null || la.current !== null || e.memoizedState !== null) && (Me = t);
  }
  function ys(t) {
    xt(Se, Se.current), xt(pe, t), Me === null && (Me = t);
  }
  function Qo(t) {
    t.tag === 22 ? (xt(Se, Se.current), xt(pe, t), Me === null && (Me = t)) : na();
  }
  function na() {
    xt(Se, Se.current), xt(pe, pe.current);
  }
  function Ve(t) {
    $t(pe), Me === t && (Me = null), $t(Se);
  }
  var Se = It(0);
  function vu(t, e) {
    xt(pe, pe.current), xt(Se, e);
  }
  function bs(t) {
    $t(Se), $t(pe), Me === t && (Me = null);
  }
  function Mi(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var l = e.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || qr(l) || Gr(l)))
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
  var Hl = 0, yt = null, Xt = null, se = null, Oi = !1, Sn = !1, qa = !1, zi = 0, gu = 0, _n = null, Yv = 0;
  function ae() {
    throw Error(s(321));
  }
  function ps(t, e) {
    if (e === null) return !1;
    for (var l = 0; l < e.length && l < t.length; l++)
      if (!Xe(t[l], e[l])) return !1;
    return !0;
  }
  function Ss(t, e, l, a, n, u) {
    return Hl = u, yt = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, J.H = t === null || t.memoizedState === null ? Od : zd, qa = !1, u = l(a, n), qa = !1, Sn && (u = Ko(
      e,
      l,
      a,
      n
    )), Zo(t), u;
  }
  function Zo(t) {
    J.H = Ui;
    var e = Xt !== null && Xt.next !== null;
    if (Hl = 0, se = Xt = yt = null, Oi = !1, gu = 0, _n = null, e) throw Error(s(300));
    t === null || re || (t = t.dependencies, t !== null && bi(t) && (re = !0));
  }
  function Ko(t, e, l, a) {
    yt = t;
    var n = 0;
    do {
      if (Sn && (_n = null), gu = 0, Sn = !1, 25 <= n) throw Error(s(301));
      if (n += 1, se = Xt = null, t.updateQueue != null) {
        var u = t.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      J.H = Jv, u = e(l, a);
    } while (Sn);
    return u;
  }
  function qv() {
    var t = J.H, e = t.useState()[0];
    return e = typeof e.then == "function" ? yu(e) : e, t = t.useState()[0], (Xt !== null ? Xt.memoizedState : null) !== t && (yt.flags |= 1024), e;
  }
  function _s() {
    var t = zi !== 0;
    return zi = 0, t;
  }
  function Es(t, e, l) {
    e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~l;
  }
  function Ts(t) {
    if (Oi) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        e !== null && (e.pending = null), t = t.next;
      }
      Oi = !1;
    }
    Hl = 0, se = Xt = yt = null, Sn = !1, gu = zi = 0, _n = null;
  }
  function Ce() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return se === null ? yt.memoizedState = se = t : se = se.next = t, se;
  }
  function ue() {
    if (Xt === null) {
      var t = yt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Xt.next;
    var e = se === null ? yt.memoizedState : se.next;
    if (e !== null)
      se = e, Xt = t;
    else {
      if (t === null)
        throw yt.alternate === null ? Error(s(467)) : Error(s(310));
      Xt = t, t = {
        memoizedState: Xt.memoizedState,
        baseState: Xt.baseState,
        baseQueue: Xt.baseQueue,
        queue: Xt.queue,
        next: null
      }, se === null ? yt.memoizedState = se = t : se = se.next = t;
    }
    return se;
  }
  function Ci() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function yu(t) {
    var e = gu;
    return gu += 1, _n === null && (_n = []), t = Bo(_n, t, e), e = yt, (se === null ? e.memoizedState : se.next) === null && (e = e.alternate, J.H = e === null || e.memoizedState === null ? Od : zd), t;
  }
  function Ai(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return yu(t);
      if (t.$$typeof === H) return;
      if (t.$$typeof === St) return be(t);
    }
    throw Error(s(438, String(t)));
  }
  function Ns(t) {
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
    if (e == null && (e = { data: [], index: 0 }), l === null && (l = Ci(), yt.updateQueue = l), l.memoCache = e, l = e.data[e.index], l === void 0)
      for (l = e.data[e.index] = Array(t), a = 0; a < t; a++)
        l[a] = te;
    return e.index++, l;
  }
  function Ll(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function ji(t) {
    var e = ue();
    return xs(e, Xt, t);
  }
  function xs(t, e, l) {
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
      var f = i = null, v = null, T = e, z = !1;
      do {
        var w = T.lane & -536870913;
        if (w !== T.lane ? (jt & w) === w : (Hl & w) === w) {
          var S = T.revertLane;
          if (S === 0)
            v !== null && (v = v.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: T.action,
              hasEagerState: T.hasEagerState,
              eagerState: T.eagerState,
              next: null
            }), w === Ua && (z = !0);
          else if ((Hl & S) === S) {
            T = T.next, S === Ua && (z = !0);
            continue;
          } else
            w = {
              lane: 0,
              revertLane: T.revertLane,
              gesture: null,
              action: T.action,
              hasEagerState: T.hasEagerState,
              eagerState: T.eagerState,
              next: null
            }, v === null ? (f = v = w, i = u) : v = v.next = w, yt.lanes |= S, sa |= S;
          w = T.action, qa && l(u, w), u = T.hasEagerState ? T.eagerState : l(u, w);
        } else
          S = {
            lane: w,
            revertLane: T.revertLane,
            gesture: T.gesture,
            action: T.action,
            hasEagerState: T.hasEagerState,
            eagerState: T.eagerState,
            next: null
          }, v === null ? (f = v = S, i = u) : v = v.next = S, yt.lanes |= w, sa |= w;
        T = T.next;
      } while (T !== null && T !== e);
      if (v === null ? i = u : v.next = f, !Xe(u, t.memoizedState) && (re = !0, z && (l = yn, l !== null)))
        throw l;
      t.memoizedState = u, t.baseState = i, t.baseQueue = v, a.lastRenderedState = u;
    }
    return n === null && (a.lanes = 0), [t.memoizedState, a.dispatch];
  }
  function Ms(t) {
    var e = ue(), l = e.queue;
    if (l === null) throw Error(s(311));
    l.lastRenderedReducer = t;
    var a = l.dispatch, n = l.pending, u = e.memoizedState;
    if (n !== null) {
      l.pending = null;
      var i = n = n.next;
      do
        u = t(u, i.action), i = i.next;
      while (i !== n);
      Xe(u, e.memoizedState) || (re = !0), e.memoizedState = u, e.baseQueue === null && (e.baseState = u), l.lastRenderedState = u;
    }
    return [u, a];
  }
  function Jo(t, e, l) {
    var a = yt, n = ue(), u = _t;
    if (u) {
      if (l === void 0) throw Error(s(407));
      l = l();
    } else l = e();
    var i = !Xe(
      (Xt || n).memoizedState,
      l
    );
    if (i && (n.memoizedState = l, re = !0), n = n.queue, Cs(Fo.bind(null, a, n, t), [
      t
    ]), t = n.getSnapshot !== e || i || se !== null && (se.memoizedState.tag & 1) !== 0, En(
      t ? 9 : 8,
      { destroy: void 0 },
      ko.bind(null, a, n, l, e),
      null
    ), t) {
      if (a.flags |= 2048, Vt === null) throw Error(s(349));
      u || (Hl & 127) !== 0 || $o(a, e, l);
    }
    return l;
  }
  function $o(t, e, l) {
    t.flags |= 16384, t = { getSnapshot: e, value: l }, e = yt.updateQueue, e === null ? (e = Ci(), yt.updateQueue = e, e.stores = [t]) : (l = e.stores, l === null ? e.stores = [t] : l.push(t));
  }
  function ko(t, e, l, a) {
    e.value = l, e.getSnapshot = a, Wo(e) && Io(t);
  }
  function Fo(t, e, l) {
    return l(function() {
      Wo(e) && Io(t);
    });
  }
  function Wo(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var l = e();
      return !Xe(t, l);
    } catch {
      return !0;
    }
  }
  function Io(t) {
    var e = Ca(t, 2);
    e !== null && Le(e, t, 2);
  }
  function Os(t) {
    var e = Ce();
    if (typeof t == "function") {
      var l = t;
      if (t = l(), qa) {
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
      lastRenderedReducer: Ll,
      lastRenderedState: t
    }, e;
  }
  function Po(t, e, l, a) {
    return t.baseState = l, xs(
      t,
      Xt,
      typeof a == "function" ? a : Ll
    );
  }
  function Gv(t, e, l, a, n) {
    if (wi(t)) throw Error(s(485));
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
      J.T !== null ? l(!0) : u.isTransition = !1, a(u), l = e.pending, l === null ? (u.next = e.pending = u, td(e, u)) : (u.next = l.next, e.pending = l.next = u);
    }
  }
  function td(t, e) {
    var l = e.action, a = e.payload, n = t.state;
    if (e.isTransition) {
      var u = J.T, i = {};
      i.types = u !== null ? u.types : null, J.T = i;
      try {
        var f = l(n, a), v = J.S;
        v !== null && v(i, f), ed(t, e, f);
      } catch (T) {
        zs(t, e, T);
      } finally {
        u !== null && i.types !== null && (u.types = i.types), J.T = u;
      }
    } else
      try {
        u = l(n, a), ed(t, e, u);
      } catch (T) {
        zs(t, e, T);
      }
  }
  function ed(t, e, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(a) {
        ld(t, e, a);
      },
      function(a) {
        return zs(t, e, a);
      }
    ) : ld(t, e, l);
  }
  function ld(t, e, l) {
    e.status = "fulfilled", e.value = l, ad(e), t.state = l, e = t.pending, e !== null && (l = e.next, l === e ? t.pending = null : (l = l.next, e.next = l, td(t, l)));
  }
  function zs(t, e, l) {
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
    if (_t) {
      var l = Vt.formState;
      if (l !== null) {
        t: {
          var a = yt;
          if (_t) {
            if (Kt) {
              e: {
                for (var n = Kt, u = ll; n.nodeType !== 8; ) {
                  if (!u) {
                    n = null;
                    break e;
                  }
                  if (n = nl(
                    n.nextSibling
                  ), n === null) {
                    n = null;
                    break e;
                  }
                }
                u = n.data, n = u === "F!" || u === "F" ? n : null;
              }
              if (n) {
                Kt = nl(
                  n.nextSibling
                ), a = n.data === "F!";
                break t;
              }
            }
            Fl(a);
          }
          a = !1;
        }
        a && (e = l[0]);
      }
    }
    return l = Ce(), l.memoizedState = l.baseState = e, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: nd,
      lastRenderedState: e
    }, l.queue = a, l = Nd.bind(
      null,
      yt,
      a
    ), a.dispatch = l, a = Os(!1), u = ws.bind(
      null,
      yt,
      !1,
      a.queue
    ), a = Ce(), n = {
      state: e,
      dispatch: null,
      action: t,
      pending: null
    }, a.queue = n, l = Gv.bind(
      null,
      yt,
      n,
      u,
      l
    ), n.dispatch = l, a.memoizedState = t, [e, l, !1];
  }
  function id(t) {
    var e = ue();
    return cd(e, Xt, t);
  }
  function cd(t, e, l) {
    if (e = xs(
      t,
      e,
      nd
    )[0], t = ji(Ll)[0], typeof e == "object" && e !== null && typeof e.then == "function")
      try {
        var a = yu(e);
      } catch (i) {
        throw i === bn ? _i : i;
      }
    else a = e;
    e = ue();
    var n = e.queue, u = n.dispatch;
    return l !== e.memoizedState && (yt.flags |= 2048, En(
      9,
      { destroy: void 0 },
      Xv.bind(null, n, l),
      null
    )), [a, u, t];
  }
  function Xv(t, e) {
    t.action = e;
  }
  function sd(t) {
    var e = ue(), l = Xt;
    if (l !== null)
      return cd(e, l, t);
    ue(), e = e.memoizedState, l = ue();
    var a = l.queue.dispatch;
    return l.memoizedState = t, [e, a, !1];
  }
  function En(t, e, l, a) {
    return t = { tag: t, create: l, deps: a, inst: e, next: null }, e = yt.updateQueue, e === null && (e = Ci(), yt.updateQueue = e), l = e.lastEffect, l === null ? e.lastEffect = t.next = t : (a = l.next, l.next = t, t.next = a, e.lastEffect = t), t;
  }
  function rd() {
    return ue().memoizedState;
  }
  function Ri(t, e, l, a) {
    var n = Ce();
    yt.flags |= t, n.memoizedState = En(
      1 | e,
      { destroy: void 0 },
      l,
      a === void 0 ? null : a
    );
  }
  function Di(t, e, l, a) {
    var n = ue();
    a = a === void 0 ? null : a;
    var u = n.memoizedState.inst;
    Xt !== null && a !== null && ps(a, Xt.memoizedState.deps) ? n.memoizedState = En(e, u, l, a) : (yt.flags |= t, n.memoizedState = En(
      1 | e,
      u,
      l,
      a
    ));
  }
  function fd(t, e) {
    Ri(8390656, 8, t, e);
  }
  function Cs(t, e) {
    Di(2048, 8, t, e);
  }
  function Vv(t) {
    yt.flags |= 4;
    var e = yt.updateQueue;
    if (e === null)
      e = Ci(), yt.updateQueue = e, e.events = [t];
    else {
      var l = e.events;
      l === null ? e.events = [t] : l.push(t);
    }
  }
  function od(t) {
    var e = ue().memoizedState;
    return Vv({ ref: e, nextImpl: t }), function() {
      if ((Bt & 2) !== 0) throw Error(s(440));
      return e.impl.apply(void 0, arguments);
    };
  }
  function dd(t, e) {
    return Di(4, 2, t, e);
  }
  function md(t, e) {
    return Di(4, 4, t, e);
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
    l = l != null ? l.concat([t]) : null, Di(4, 4, hd.bind(null, e, t), l);
  }
  function As() {
  }
  function gd(t, e) {
    var l = ue();
    e = e === void 0 ? null : e;
    var a = l.memoizedState;
    return e !== null && ps(e, a[1]) ? a[0] : (l.memoizedState = [t, e], t);
  }
  function yd(t, e) {
    var l = ue();
    e = e === void 0 ? null : e;
    var a = l.memoizedState;
    if (e !== null && ps(e, a[1]))
      return a[0];
    if (a = t(), qa) {
      Zl(!0);
      try {
        t();
      } finally {
        Zl(!1);
      }
    }
    return l.memoizedState = [a, e], a;
  }
  function js(t, e, l) {
    return l === void 0 || (Hl & 1073741824) !== 0 && (jt & 261930) === 0 ? t.memoizedState = e : (t.memoizedState = l, t = Om(), yt.lanes |= t, sa |= t, l);
  }
  function bd(t, e, l, a) {
    return Xe(l, e) ? l : la.current !== null ? (t = js(t, l, a), Xe(t, e) || (re = !0), t) : (Hl & 106) === 0 || (Hl & 1073741824) !== 0 && (jt & 261930) === 0 ? (re = !0, t.memoizedState = l) : (t = Om(), yt.lanes |= t, sa |= t, e);
  }
  function pd(t, e, l, a, n) {
    var u = ct.p;
    ct.p = u !== 0 && 8 > u ? u : 8;
    var i = J.T, f = {};
    f.types = i !== null ? i.types : null, J.T = f, ws(t, !1, e, l);
    try {
      var v = n(), T = J.S;
      if (T !== null && T(f, v), v !== null && typeof v == "object" && typeof v.then == "function") {
        var z = Lv(
          v,
          a
        );
        bu(
          t,
          e,
          z,
          Je(t)
        );
      } else
        bu(
          t,
          e,
          a,
          Je(t)
        );
    } catch (w) {
      bu(
        t,
        e,
        { then: function() {
        }, status: "rejected", reason: w },
        Je()
      );
    } finally {
      ct.p = u, i !== null && f.types !== null && (i.types = f.types), J.T = i;
    }
  }
  function Qv() {
  }
  function Rs(t, e, l, a) {
    if (t.tag !== 5) throw Error(s(476));
    var n = Sd(t).queue;
    pd(
      t,
      n,
      e,
      Wt,
      l === null ? Qv : function() {
        return _d(t), l(a);
      }
    );
  }
  function Sd(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: Wt,
      baseState: Wt,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ll,
        lastRenderedState: Wt
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
        lastRenderedReducer: Ll,
        lastRenderedState: l
      },
      next: null
    }, t.memoizedState = e, t = t.alternate, t !== null && (t.memoizedState = e), e;
  }
  function _d(t) {
    var e = Sd(t);
    e.next === null && (e = t.alternate.memoizedState), bu(
      t,
      e.next.queue,
      {},
      Je()
    );
  }
  function Ds() {
    return be(Gn);
  }
  function Ed() {
    return ue().memoizedState;
  }
  function Td() {
    return ue().memoizedState;
  }
  function Zv(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var l = Je();
          t = ta(l);
          var a = ea(e, t, l);
          a !== null && (Le(a, e, l), du(a, e, l)), e = { cache: cs() }, t.payload = e;
          return;
      }
      e = e.return;
    }
  }
  function Kv(t, e, l) {
    var a = Je();
    l = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, wi(t) ? xd(e, l) : (l = Ic(t, e, l, a), l !== null && (Le(l, t, a), Md(l, e, a)));
  }
  function Nd(t, e, l) {
    var a = Je();
    bu(t, e, l, a);
  }
  function bu(t, e, l, a) {
    var n = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (wi(t)) xd(e, n);
    else {
      var u = t.alternate;
      if (t.lanes === 0 && (u === null || u.lanes === 0) && (u = e.lastRenderedReducer, u !== null))
        try {
          var i = e.lastRenderedState, f = u(i, l);
          if (n.hasEagerState = !0, n.eagerState = f, Xe(f, i))
            return oi(t, e, n, 0), Vt === null && fi(), !1;
        } catch {
        }
      if (l = Ic(t, e, n, a), l !== null)
        return Le(l, t, a), Md(l, e, a), !0;
    }
    return !1;
  }
  function ws(t, e, l, a) {
    if (a = {
      lane: 2,
      revertLane: Nr(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, wi(t)) {
      if (e) throw Error(s(479));
    } else
      e = Ic(
        t,
        l,
        a,
        2
      ), e !== null && Le(e, t, 2);
  }
  function wi(t) {
    var e = t.alternate;
    return t === yt || e !== null && e === yt;
  }
  function xd(t, e) {
    Sn = Oi = !0;
    var l = t.pending;
    l === null ? e.next = e : (e.next = l.next, l.next = e), t.pending = e;
  }
  function Md(t, e, l) {
    if ((l & 4194048) !== 0) {
      var a = e.lanes;
      a &= t.pendingLanes, l |= a, e.lanes = l, Mf(t, l);
    }
  }
  var Ui = {
    readContext: be,
    use: Ai,
    useCallback: ae,
    useContext: ae,
    useEffect: ae,
    useImperativeHandle: ae,
    useLayoutEffect: ae,
    useInsertionEffect: ae,
    useMemo: ae,
    useReducer: ae,
    useRef: ae,
    useState: ae,
    useDebugValue: ae,
    useDeferredValue: ae,
    useTransition: ae,
    useSyncExternalStore: ae,
    useId: ae,
    useHostTransitionStatus: ae,
    useFormState: ae,
    useActionState: ae,
    useOptimistic: ae,
    useMemoCache: ae,
    useCacheRefresh: ae,
    useEffectEvent: ae
  }, Od = {
    readContext: be,
    use: Ai,
    useCallback: function(t, e) {
      return Ce().memoizedState = [
        t,
        e === void 0 ? null : e
      ], t;
    },
    useContext: be,
    useEffect: fd,
    useImperativeHandle: function(t, e, l) {
      l = l != null ? l.concat([t]) : null, Ri(
        4194308,
        4,
        hd.bind(null, e, t),
        l
      );
    },
    useLayoutEffect: function(t, e) {
      return Ri(4194308, 4, t, e);
    },
    useInsertionEffect: function(t, e) {
      Ri(4, 2, t, e);
    },
    useMemo: function(t, e) {
      var l = Ce();
      e = e === void 0 ? null : e;
      var a = t();
      if (qa) {
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
      var a = Ce();
      if (l !== void 0) {
        var n = l(e);
        if (qa) {
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
      }, a.queue = t, t = t.dispatch = Kv.bind(
        null,
        yt,
        t
      ), [a.memoizedState, t];
    },
    useRef: function(t) {
      var e = Ce();
      return t = { current: t }, e.memoizedState = t;
    },
    useState: function(t) {
      t = Os(t);
      var e = t.queue, l = Nd.bind(null, yt, e);
      return e.dispatch = l, [t.memoizedState, l];
    },
    useDebugValue: As,
    useDeferredValue: function(t, e) {
      var l = Ce();
      return js(l, t, e);
    },
    useTransition: function() {
      var t = Os(!1);
      return t = pd.bind(
        null,
        yt,
        t.queue,
        !0,
        !1
      ), Ce().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, e, l) {
      var a = yt, n = Ce();
      if (_t) {
        if (l === void 0)
          throw Error(s(407));
        l = l();
      } else {
        if (l = e(), Vt === null)
          throw Error(s(349));
        (jt & 127) !== 0 || $o(a, e, l);
      }
      n.memoizedState = l;
      var u = { value: l, getSnapshot: e };
      return n.queue = u, fd(Fo.bind(null, a, u, t), [
        t
      ]), a.flags |= 2048, En(
        9,
        { destroy: void 0 },
        ko.bind(
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
      var t = Ce(), e = Vt.identifierPrefix;
      if (_t) {
        var l = bl, a = yl;
        l = (a & ~(1 << 32 - qe(a) - 1)).toString(32) + l, e = "_" + e + "R_" + l, l = zi++, 0 < l && (e += "H" + l.toString(32)), e += "_";
      } else
        l = Yv++, e = "_" + e + "r_" + l.toString(32) + "_";
      return t.memoizedState = e;
    },
    useHostTransitionStatus: Ds,
    useFormState: ud,
    useActionState: ud,
    useOptimistic: function(t) {
      var e = Ce();
      e.memoizedState = e.baseState = t;
      var l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return e.queue = l, e = ws.bind(
        null,
        yt,
        !0,
        l
      ), l.dispatch = e, [t, e];
    },
    useMemoCache: Ns,
    useCacheRefresh: function() {
      return Ce().memoizedState = Zv.bind(
        null,
        yt
      );
    },
    useEffectEvent: function(t) {
      var e = Ce(), l = { impl: t };
      return e.memoizedState = l, function() {
        if ((Bt & 2) !== 0)
          throw Error(s(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, zd = {
    readContext: be,
    use: Ai,
    useCallback: gd,
    useContext: be,
    useEffect: Cs,
    useImperativeHandle: vd,
    useInsertionEffect: dd,
    useLayoutEffect: md,
    useMemo: yd,
    useReducer: ji,
    useRef: rd,
    useState: function() {
      return ji(Ll);
    },
    useDebugValue: As,
    useDeferredValue: function(t, e) {
      var l = ue();
      return bd(
        l,
        Xt.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = ji(Ll)[0], e = ue().memoizedState;
      return [
        typeof t == "boolean" ? t : yu(t),
        e
      ];
    },
    useSyncExternalStore: Jo,
    useId: Ed,
    useHostTransitionStatus: Ds,
    useFormState: id,
    useActionState: id,
    useOptimistic: function(t, e) {
      var l = ue();
      return Po(l, Xt, t, e);
    },
    useMemoCache: Ns,
    useCacheRefresh: Td,
    useEffectEvent: od
  }, Jv = {
    readContext: be,
    use: Ai,
    useCallback: gd,
    useContext: be,
    useEffect: Cs,
    useImperativeHandle: vd,
    useInsertionEffect: dd,
    useLayoutEffect: md,
    useMemo: yd,
    useReducer: Ms,
    useRef: rd,
    useState: function() {
      return Ms(Ll);
    },
    useDebugValue: As,
    useDeferredValue: function(t, e) {
      var l = ue();
      return Xt === null ? js(l, t, e) : bd(
        l,
        Xt.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = Ms(Ll)[0], e = ue().memoizedState;
      return [
        typeof t == "boolean" ? t : yu(t),
        e
      ];
    },
    useSyncExternalStore: Jo,
    useId: Ed,
    useHostTransitionStatus: Ds,
    useFormState: sd,
    useActionState: sd,
    useOptimistic: function(t, e) {
      var l = ue();
      return Xt !== null ? Po(l, Xt, t, e) : (l.baseState = t, [t, l.queue.dispatch]);
    },
    useMemoCache: Ns,
    useCacheRefresh: Td,
    useEffectEvent: od
  };
  function Us(t, e, l, a) {
    e = t.memoizedState, l = l(a, e), l = l == null ? e : K({}, e, l), t.memoizedState = l, t.lanes === 0 && (t.updateQueue.baseState = l);
  }
  var Bs = {
    enqueueSetState: function(t, e, l) {
      t = t._reactInternals;
      var a = Je(), n = ta(a);
      n.payload = e, l != null && (n.callback = l), e = ea(t, n, a), e !== null && (Le(e, t, a), du(e, t, a));
    },
    enqueueReplaceState: function(t, e, l) {
      t = t._reactInternals;
      var a = Je(), n = ta(a);
      n.tag = 1, n.payload = e, l != null && (n.callback = l), e = ea(t, n, a), e !== null && (Le(e, t, a), du(e, t, a));
    },
    enqueueForceUpdate: function(t, e) {
      t = t._reactInternals;
      var l = Je(), a = ta(l);
      a.tag = 2, e != null && (a.callback = e), e = ea(t, a, l), e !== null && (Le(e, t, l), du(e, t, l));
    }
  };
  function Cd(t, e, l, a, n, u, i) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(a, u, i) : e.prototype && e.prototype.isPureReactComponent ? !nu(l, a) || !nu(n, u) : !0;
  }
  function Ad(t, e, l, a) {
    t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(l, a), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(l, a), e.state !== t && Bs.enqueueReplaceState(e, e.state, null);
  }
  function Ga(t, e) {
    var l = e;
    if ("ref" in e) {
      l = {};
      for (var a in e)
        a !== "ref" && (l[a] = e[a]);
    }
    if (t = t.defaultProps) {
      l === e && (l = K({}, l));
      for (var n in t)
        l[n] === void 0 && (l[n] = t[n]);
    }
    return l;
  }
  function jd(t) {
    ri(t);
  }
  function Rd(t) {
    console.error(t);
  }
  function Dd(t) {
    ri(t);
  }
  function Bi(t, e) {
    try {
      var l = t.onUncaughtError;
      l(e.value, { componentStack: e.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function wd(t, e, l) {
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
  function Hs(t, e, l) {
    return l = ta(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      Bi(t, e);
    }, l;
  }
  function Ud(t) {
    return t = ta(t), t.tag = 3, t;
  }
  function Bd(t, e, l, a) {
    var n = l.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var u = a.value;
      t.payload = function() {
        return n(u);
      }, t.callback = function() {
        wd(e, l, a);
      };
    }
    var i = l.stateNode;
    i !== null && typeof i.componentDidCatch == "function" && (t.callback = function() {
      wd(e, l, a), typeof n != "function" && (ra === null ? ra = /* @__PURE__ */ new Set([this]) : ra.add(this));
      var f = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: f !== null ? f : ""
      });
    });
  }
  function $v(t, e, l, a, n) {
    if (l.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (e = l.alternate, e !== null && Da(
        e,
        l,
        n,
        !0
      ), l = pe.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
          case 19:
            return Me === null ? ac() : l.alternate === null && ne === 0 && (ne = 3), l.flags &= -257, l.flags |= 65536, l.lanes = n, a === Ei ? l.flags |= 16384 : (e = l.updateQueue, e === null ? l.updateQueue = /* @__PURE__ */ new Set([a]) : e.add(a), _r(t, a, n)), !1;
          case 22:
            return l.flags |= 65536, a === Ei ? l.flags |= 16384 : (e = l.updateQueue, e === null ? (e = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, l.updateQueue = e) : (l = e.retryQueue, l === null ? e.retryQueue = /* @__PURE__ */ new Set([a]) : l.add(a)), _r(t, a, n)), !1;
        }
        throw Error(s(435, l.tag));
      }
      return _r(t, a, n), ac(), !1;
    }
    if (_t)
      return e = pe.current, e !== null ? ((e.flags & 65536) === 0 && (e.flags |= 256), e.flags |= 65536, e.lanes = n, a !== as && (t = Error(s(422), { cause: a }), cu(Pe(t, l)))) : (a !== as && (e = Error(s(423), {
        cause: a
      }), cu(
        Pe(e, l)
      )), t = t.current.alternate, t.flags |= 65536, n &= -n, t.lanes |= n, a = Pe(a, l), n = Hs(
        t.stateNode,
        a,
        n
      ), ms(t, n), ne !== 4 && (ne = 2)), !1;
    var u = Error(s(520), { cause: a });
    if (u = Pe(u, l), Mu === null ? Mu = [u] : Mu.push(u), ne !== 4 && (ne = 2), e === null) return !0;
    a = Pe(a, l), l = e;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, t = n & -n, l.lanes |= t, t = Hs(l.stateNode, a, t), ms(l, t), !1;
        case 1:
          if (e = l.type, u = l.stateNode, (l.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (ra === null || !ra.has(u))))
            return l.flags |= 65536, n &= -n, l.lanes |= n, n = Ud(n), Bd(
              n,
              t,
              l,
              a
            ), ms(l, n), !1;
          break;
        case 22:
          if (l.memoizedState !== null)
            return l.flags |= 65536, !1;
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var Ls = Error(s(461)), re = !1;
  function oe(t, e, l, a) {
    e.child = t === null ? qo(e, null, l, a) : Ya(
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
      for (var f in a)
        f !== "ref" && (i[f] = a[f]);
    } else i = a;
    return wa(e), a = Ss(
      t,
      e,
      l,
      i,
      u,
      n
    ), f = _s(), t !== null && !re ? (Es(t, e, n), Yl(t, e, n)) : (_t && f && vi(e), e.flags |= 1, oe(t, e, a, n), e.child);
  }
  function Ld(t, e, l, a, n) {
    if (t === null) {
      var u = l.type;
      return typeof u == "function" && !Pc(u) && u.defaultProps === void 0 && l.compare === null ? (e.tag = 15, e.type = u, Yd(
        t,
        e,
        u,
        a,
        n
      )) : (t = mi(
        l.type,
        null,
        a,
        e,
        e.mode,
        n
      ), t.ref = e.ref, t.return = e, e.child = t);
    }
    if (u = t.child, !Ks(t, n)) {
      var i = u.memoizedProps;
      if (l = l.compare, l = l !== null ? l : nu, l(i, a) && t.ref === e.ref)
        return Yl(t, e, n);
    }
    return e.flags |= 1, t = Dl(u, a), t.ref = e.ref, t.return = e, e.child = t;
  }
  function Yd(t, e, l, a, n) {
    if (t !== null) {
      var u = t.memoizedProps;
      if (nu(u, a) && t.ref === e.ref)
        if (re = !1, e.pendingProps = a = u, Ks(t, n))
          (t.flags & 131072) !== 0 && (re = !0);
        else
          return e.lanes = t.lanes, Yl(t, e, n);
    }
    return Ys(
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
        e.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Si(
          e,
          u !== null ? u.cachePool : null
        ), u !== null ? Vo(e, u) : vs(), Qo(e);
      else
        return a = e.lanes = 536870912, Gd(
          t,
          e,
          u !== null ? u.baseLanes | l : l,
          l,
          a
        );
    } else
      u !== null ? (Si(e, u.cachePool), Vo(e, u), na(), e.memoizedState = null) : (t !== null && Si(e, null), vs(), na());
    return oe(t, e, n, l), e.child;
  }
  function pu(t, e) {
    return t !== null && t.tag === 22 || e.stateNode !== null || (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), e.sibling;
  }
  function Gd(t, e, l, a, n) {
    var u = rs();
    return u = u === null ? null : { parent: ce._currentValue, pool: u }, e.memoizedState = {
      baseLanes: l,
      cachePool: u
    }, t !== null && Si(e, null), vs(), Qo(e), t !== null && Da(t, e, a, !0), e.childLanes = n, null;
  }
  function Hi(t, e) {
    return e = Li(
      { mode: e.mode, children: e.children },
      t.mode
    ), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function Xd(t, e, l) {
    return Ya(e, t.child, null, l), t = Hi(e, e.pendingProps), t.flags |= 2, Ve(e), e.memoizedState = null, t;
  }
  function kv(t, e, l) {
    var a = e.pendingProps, n = (e.flags & 128) !== 0;
    if (e.flags &= -129, t === null) {
      if (_t) {
        if (a.mode === "hidden")
          return t = Hi(e, a), e.lanes = 536870912, t.memoizedState = { baseLanes: 0, cachePool: null }, pu(null, t);
        if (ys(e), (t = Kt) ? (t = hh(
          t,
          ll
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: $l !== null ? { id: yl, overflow: bl } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = xo(t), l.return = e, e.child = l, he = e, Kt = null)) : t = null, t === null) throw Fl(e);
        return e.lanes = 536870912, null;
      }
      return Hi(e, a);
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
      else if (re || Da(t, e, l, !1), n = (l & t.childLanes) !== 0, re || n) {
        if (la.current === null) {
          if (a = Vt, a !== null && (i = Of(a, l), i !== 0 && i !== u.retryLane))
            throw u.retryLane = i, Ca(t, i), Le(a, t, i), Ls;
          ac();
        }
        e = Xd(
          t,
          e,
          l
        );
      } else
        t = u.treeContext, Kt = nl(i.nextSibling), he = e, _t = !0, kl = null, ll = !1, t !== null && zo(e, t), e = Hi(e, a), e.flags |= 134221824;
      return e;
    }
    return t = Dl(t.child, {
      mode: a.mode,
      children: a.children
    }), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Tn(t, e) {
    var l = e.ref;
    if (l === null)
      t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object")
        throw Error(s(284));
      (t === null || t.ref !== l) && (e.flags |= 4194816);
    }
  }
  function Ys(t, e, l, a, n) {
    return wa(e), l = Ss(
      t,
      e,
      l,
      a,
      void 0,
      n
    ), a = _s(), t !== null && !re ? (Es(t, e, n), Yl(t, e, n)) : (_t && a && vi(e), e.flags |= 1, oe(t, e, l, n), e.child);
  }
  function Vd(t, e, l, a, n, u) {
    return wa(e), e.updateQueue = null, l = Ko(
      e,
      a,
      l,
      n
    ), Zo(t), a = _s(), t !== null && !re ? (Es(t, e, u), Yl(t, e, u)) : (_t && a && vi(e), e.flags |= 1, oe(t, e, l, u), e.child);
  }
  function Qd(t, e, l, a, n) {
    if (wa(e), e.stateNode === null) {
      var u = mn, i = l.contextType;
      typeof i == "object" && i !== null && (u = be(i)), u = new l(a, u), e.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = Bs, e.stateNode = u, u._reactInternals = e, u = e.stateNode, u.props = a, u.state = e.memoizedState, u.refs = {}, os(e), i = l.contextType, u.context = typeof i == "object" && i !== null ? be(i) : mn, u.state = e.memoizedState, i = l.getDerivedStateFromProps, typeof i == "function" && (Us(
        e,
        l,
        i,
        a
      ), u.state = e.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (i = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), i !== u.state && Bs.enqueueReplaceState(u, u.state, null), hu(e, a, u, n), mu(), u.state = e.memoizedState), typeof u.componentDidMount == "function" && (e.flags |= 4194308), a = !0;
    } else if (t === null) {
      u = e.stateNode;
      var f = e.memoizedProps, v = Ga(l, f);
      u.props = v;
      var T = u.context, z = l.contextType;
      i = mn, typeof z == "object" && z !== null && (i = be(z));
      var w = l.getDerivedStateFromProps;
      z = typeof w == "function" || typeof u.getSnapshotBeforeUpdate == "function", f = e.pendingProps !== f, z || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (f || T !== i) && Ad(
        e,
        u,
        a,
        i
      ), Pl = !1;
      var S = e.memoizedState;
      u.state = S, hu(e, a, u, n), mu(), T = e.memoizedState, f || S !== T || Pl ? (typeof w == "function" && (Us(
        e,
        l,
        w,
        a
      ), T = e.memoizedState), (v = Pl || Cd(
        e,
        l,
        v,
        a,
        S,
        T,
        i
      )) ? (z || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = a, e.memoizedState = T), u.props = a, u.state = T, u.context = i, a = v) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), a = !1);
    } else {
      u = e.stateNode, ds(t, e), i = e.memoizedProps, z = Ga(l, i), u.props = z, w = e.pendingProps, S = u.context, T = l.contextType, v = mn, typeof T == "object" && T !== null && (v = be(T)), f = l.getDerivedStateFromProps, (T = typeof f == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (i !== w || S !== v) && Ad(
        e,
        u,
        a,
        v
      ), Pl = !1, S = e.memoizedState, u.state = S, hu(e, a, u, n), mu();
      var M = e.memoizedState;
      i !== w || S !== M || Pl || t !== null && t.dependencies !== null && bi(t.dependencies) ? (typeof f == "function" && (Us(
        e,
        l,
        f,
        a
      ), M = e.memoizedState), (z = Pl || Cd(
        e,
        l,
        z,
        a,
        S,
        M,
        v
      ) || t !== null && t.dependencies !== null && bi(t.dependencies)) ? (T || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(a, M, v), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        a,
        M,
        v
      )), typeof u.componentDidUpdate == "function" && (e.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && S === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && S === t.memoizedState || (e.flags |= 1024), e.memoizedProps = a, e.memoizedState = M), u.props = a, u.state = M, u.context = v, a = z) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && S === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && S === t.memoizedState || (e.flags |= 1024), a = !1);
    }
    return u = a, Tn(t, e), a = (e.flags & 128) !== 0, u || a ? (u = e.stateNode, l = a && typeof l.getDerivedStateFromError != "function" ? null : u.render(), e.flags |= 1, t !== null && a ? (e.child = Ya(
      e,
      t.child,
      null,
      n
    ), e.child = Ya(
      e,
      null,
      l,
      n
    )) : oe(t, e, l, n), e.memoizedState = u.state, t = e.child) : t = Yl(
      t,
      e,
      n
    ), t;
  }
  function Zd(t, e, l, a) {
    return ja(), e.flags |= 256, oe(t, e, l, a), e.child;
  }
  var qs = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Gs(t) {
    return { baseLanes: t, cachePool: wo() };
  }
  function Xs(t, e, l) {
    return t = t !== null ? t.childLanes & ~l : 0, e && (t |= Ke), t;
  }
  function Kd(t, e, l) {
    var a = e.pendingProps, n = !1, u = (e.flags & 128) !== 0, i;
    if ((i = u) || (i = t !== null && t.memoizedState === null ? !1 : (Se.current & 2) !== 0), i && (n = !0, e.flags &= -129), i = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
      if (_t) {
        if (n ? aa(e) : na(), (t = Kt) ? (t = hh(
          t,
          ll
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: $l !== null ? { id: yl, overflow: bl } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = xo(t), l.return = e, e.child = l, he = e, Kt = null)) : t = null, t === null) throw Fl(e);
        return Gr(t) ? e.lanes = 32 : e.lanes = 536870912, null;
      }
      return u = a.children, a = a.fallback, n ? (na(), n = e.mode, u = Li(
        { mode: "hidden", children: u },
        n
      ), a = Aa(
        a,
        n,
        l,
        null
      ), u.return = e, a.return = e, u.sibling = a, e.child = u, a = e.child, a.memoizedState = Gs(l), a.childLanes = Xs(
        t,
        i,
        l
      ), e.memoizedState = qs, pu(null, a)) : (aa(e), Vs(e, u));
    }
    var f = t.memoizedState;
    if (f !== null) {
      var v = f.dehydrated;
      if (v !== null)
        return Fv(
          t,
          e,
          u,
          i,
          a,
          v,
          f,
          l
        );
    }
    return n ? (na(), n = a.fallback, u = e.mode, f = t.child, v = f.sibling, a = Dl(f, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = f.subtreeFlags & 1206910976, v !== null ? n = Dl(v, n) : (n = Aa(
      n,
      u,
      l,
      null
    ), n.flags |= 2), n.return = e, a.return = e, a.sibling = n, e.child = a, pu(null, a), a = e.child, n = t.child.memoizedState, n === null ? n = Gs(l) : (u = n.cachePool, u !== null ? (f = ce._currentValue, u = u.parent !== f ? { parent: f, pool: f } : u) : u = wo(), n = {
      baseLanes: n.baseLanes | l,
      cachePool: u
    }), a.memoizedState = n, a.childLanes = Xs(
      t,
      i,
      l
    ), e.memoizedState = qs, pu(t.child, a)) : (aa(e), l = t.child, t = l.sibling, l = Dl(l, {
      mode: "visible",
      children: a.children
    }), l.return = e, l.sibling = null, t !== null && (i = e.deletions, i === null ? (e.deletions = [t], e.flags |= 16) : i.push(t)), e.child = l, e.memoizedState = null, l);
  }
  function Vs(t, e) {
    return e = Li(
      { mode: "visible", children: e },
      t.mode
    ), e.return = t, t.child = e;
  }
  function Li(t, e) {
    return t = we(22, t, null, e), t.lanes = 0, t;
  }
  function Yi(t, e, l) {
    return Ya(e, t.child, null, l), t = Vs(
      e,
      e.pendingProps.children
    ), t.flags |= 2, e.memoizedState = null, t;
  }
  function Fv(t, e, l, a, n, u, i, f) {
    if (l)
      return e.flags & 256 ? (aa(e), e.flags &= -257, Yi(
        t,
        e,
        f
      )) : e.memoizedState !== null ? (na(), e.child = t.child, e.flags |= 128, null) : (na(), u = n.fallback, i = e.mode, n = Li(
        { mode: "visible", children: n.children },
        i
      ), u = Aa(
        u,
        i,
        f,
        null
      ), u.flags |= 2, n.return = e, u.return = e, n.sibling = u, e.child = n, Ya(e, t.child, null, f), n = e.child, n.memoizedState = Gs(f), n.childLanes = Xs(
        t,
        a,
        f
      ), e.memoizedState = qs, pu(null, n));
    if (aa(e), Gr(u)) {
      if (a = u.nextSibling && u.nextSibling.dataset, a) var v = a.dgst;
      return a = v, a !== "" && (n = Error(s(419)), n.stack = "", n.digest = a, cu({ value: n, source: null, stack: null })), Yi(
        t,
        e,
        f
      );
    }
    if (re || Da(t, e, f, !1), a = (f & t.childLanes) !== 0, re || a) {
      if (la.current !== null)
        return Yi(
          t,
          e,
          f
        );
      if (a = Vt, a !== null && (n = Of(
        a,
        f
      ), n !== 0 && n !== i.retryLane))
        throw i.retryLane = n, Ca(t, n), Le(a, t, n), Ls;
      return qr(u) || ac(), Yi(
        t,
        e,
        f
      );
    }
    return qr(u) ? (e.flags |= 192, e.child = t.child, null) : (t = i.treeContext, Kt = nl(u.nextSibling), he = e, _t = !0, kl = null, ll = !1, t !== null && zo(e, t), e = Vs(
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
      l !== null && Mi(l) === null && (e = t), t = t.sibling;
    }
    return e;
  }
  function qi(t, e, l, a, n, u) {
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
  function Zs(t, e, l) {
    var a = e.pendingProps, n = a.revealOrder, u = a.tail;
    a = a.children;
    var i = Se.current;
    if (e.flags & 128)
      return vu(e, i), null;
    var f = (i & 2) !== 0;
    if (f ? (i = i & 1 | 2, e.flags |= 128) : i &= 1, vu(e, i), n === "backwards" && t !== null ? (Qs(t), oe(t, e, a, l), Qs(t)) : oe(t, e, a, l), a = _t ? iu : 0, !f && t !== null && (t.flags & 128) !== 0)
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
        l = $d(e.child), l === null ? (n = e.child, e.child = null) : (n = l.sibling, l.sibling = null, Qs(e)), qi(
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
          if (t = n.alternate, t !== null && Mi(t) === null) {
            e.child = n;
            break;
          }
          t = n.sibling, n.sibling = l, l = n, n = t;
        }
        qi(
          e,
          !0,
          l,
          null,
          u,
          a
        );
        break;
      case "together":
        qi(
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
        l = $d(e.child), l === null ? (n = e.child, e.child = null) : (n = l.sibling, l.sibling = null), qi(
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
  function kd(t, e, l) {
    var a = e.pendingProps;
    return Wl(e, e.type, a.value), oe(t, e, a.children, l), e.child;
  }
  function Yl(t, e, l) {
    if (t !== null && (e.dependencies = t.dependencies), sa |= e.lanes, (l & e.childLanes) === 0)
      if (t !== null) {
        if (Da(
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
      for (t = e.child, l = Dl(t, t.pendingProps), e.child = l, l.return = e; t.sibling !== null; )
        t = t.sibling, l = l.sibling = Dl(t, t.pendingProps), l.return = e;
      l.sibling = null;
    }
    return e.child;
  }
  function Ks(t, e) {
    return (t.lanes & e) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && bi(t)));
  }
  function Wv(t, e, l) {
    switch (e.tag) {
      case 3:
        Ne(e, e.stateNode.containerInfo), Wl(e, ce, t.memoizedState.cache), ja();
        break;
      case 27:
      case 5:
        hl(e);
        break;
      case 4:
        Ne(e, e.stateNode.containerInfo);
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
          a = Da(
            t,
            e,
            l,
            !1
          );
          var n = e.child.childLanes;
          return a || (l & n) !== 0 ? Kd(t, e, l) : (aa(e), t = Yl(
            t,
            e,
            l
          ), t !== null ? t.sibling : null);
        }
        aa(e);
        break;
      case 19:
        if (e.flags & 128)
          return Zs(
            t,
            e,
            l
          );
        if (n = (t.flags & 128) !== 0, a = (l & e.childLanes) !== 0, a || (Da(
          t,
          e,
          l,
          !1
        ), a = (l & e.childLanes) !== 0), n) {
          if (a)
            return Zs(
              t,
              e,
              l
            );
          e.flags |= 128;
        }
        if (n = e.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), vu(e, Se.current), a) break;
        return null;
      case 22:
        return e.lanes = 0, qd(
          t,
          e,
          l,
          e.pendingProps
        );
      case 24:
        Wl(e, ce, t.memoizedState.cache);
    }
    return Yl(t, e, l);
  }
  function Fd(t, e, l) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps)
        re = !0;
      else {
        if (!Ks(t, l) && (e.flags & 128) === 0)
          return re = !1, Wv(
            t,
            e,
            l
          );
        re = (t.flags & 131072) !== 0;
      }
    else
      re = !1, _t && (e.flags & 1048576) !== 0 && Oo(e, iu, e.index);
    switch (e.lanes = 0, e.tag) {
      case 16:
        t: {
          var a = e.pendingProps;
          if (t = Ha(e.elementType), e.type = t, typeof t == "function")
            Pc(t) ? (a = Ga(t, a), e.tag = 1, e = Qd(
              null,
              e,
              t,
              a,
              l
            )) : (e.tag = 0, e = Ys(
              null,
              e,
              t,
              a,
              l
            ));
          else {
            if (t != null) {
              var n = t.$$typeof;
              if (n === q) {
                e.tag = 11, e = Hd(
                  null,
                  e,
                  t,
                  a,
                  l
                );
                break t;
              } else if (n === $) {
                e.tag = 14, e = Ld(
                  null,
                  e,
                  t,
                  a,
                  l
                );
                break t;
              } else if (n === St) {
                e.tag = 10, e.type = t, e = kd(
                  null,
                  e,
                  l
                );
                break t;
              }
            }
            throw e = pt(t) || t, Error(s(306, e, ""));
          }
        }
        return e;
      case 0:
        return Ys(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 1:
        return a = e.type, n = Ga(
          a,
          e.pendingProps
        ), Qd(
          t,
          e,
          a,
          n,
          l
        );
      case 3:
        t: {
          if (Ne(
            e,
            e.stateNode.containerInfo
          ), t === null) throw Error(s(387));
          a = e.pendingProps;
          var u = e.memoizedState;
          n = u.element, ds(t, e), hu(e, a, null, l);
          var i = e.memoizedState;
          if (a = i.cache, Wl(e, ce, a), a !== u.cache && is(
            e,
            [ce],
            l,
            !0
          ), mu(), a = i.element, u.isDehydrated)
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
              n = Pe(
                Error(s(424)),
                e
              ), cu(n), e = Zd(
                t,
                e,
                a,
                l
              );
              break t;
            } else
              for (t = e.stateNode.containerInfo, t.nodeType === 9 ? t = t.body : t = t.nodeName === "HTML" ? t.ownerDocument.body : t, Kt = nl(t.firstChild), he = e, _t = !0, kl = null, ll = !0, l = qo(
                e,
                null,
                a,
                l
              ), e.child = l; l; )
                l.flags = l.flags & -3 | 134221824, l = l.sibling;
          else {
            if (ja(), a === n) {
              e = Yl(
                t,
                e,
                l
              );
              break t;
            }
            oe(t, e, a, l);
          }
          e = e.child;
        }
        return e;
      case 26:
        return Tn(t, e), t === null ? (l = _h(
          e.type,
          null,
          e.pendingProps,
          null
        )) ? e.memoizedState = l : _t || (e.stateNode = th(
          e.type,
          e.pendingProps,
          st.current,
          e
        )) : e.memoizedState = _h(
          e.type,
          t.memoizedProps,
          e.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return hl(e), t === null && _t && (a = e.stateNode = yh(
          e.type,
          e.pendingProps,
          st.current
        ), he = e, ll = !0, n = Kt, da(e.type) ? (Xr = n, Kt = nl(a.firstChild)) : Kt = n), oe(
          t,
          e,
          e.pendingProps.children,
          l
        ), Tn(t, e), t === null && (e.flags |= 4194304), e.child;
      case 5:
        return t === null && _t && ((n = a = Kt) && (a = Zg(
          a,
          e.type,
          e.pendingProps,
          ll
        ), a !== null ? (e.stateNode = a, he = e, Kt = nl(a.firstChild), ll = !1, n = !0) : n = !1), n || Fl(e)), hl(e), n = e.type, u = e.pendingProps, i = t !== null ? t.memoizedProps : null, a = u.children, Dr(n, u) ? a = null : i !== null && Dr(n, i) && (e.flags |= 32), e.memoizedState !== null && (n = Ss(
          t,
          e,
          qv,
          null,
          null,
          l
        ), Gn._currentValue = n), Tn(t, e), oe(t, e, a, l), e.child;
      case 6:
        return t === null && _t && ((t = l = Kt) && (l = Kg(
          l,
          e.pendingProps,
          ll
        ), l !== null ? (e.stateNode = l, he = e, Kt = null, t = !0) : t = !1), t || Fl(e)), null;
      case 13:
        return Kd(t, e, l);
      case 4:
        return Ne(
          e,
          e.stateNode.containerInfo
        ), a = e.pendingProps, t === null ? e.child = Ya(
          e,
          null,
          a,
          l
        ) : oe(t, e, a, l), e.child;
      case 11:
        return Hd(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 7:
        return a = e.pendingProps, Tn(t, e), oe(t, e, a, l), e.child;
      case 8:
        return oe(
          t,
          e,
          e.pendingProps.children,
          l
        ), e.child;
      case 12:
        return oe(
          t,
          e,
          e.pendingProps.children,
          l
        ), e.child;
      case 10:
        return kd(t, e, l);
      case 9:
        return n = e.type._context, a = e.pendingProps.children, wa(e), n = be(n), a = a(n), e.flags |= 1, oe(t, e, a, l), e.child;
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
        return Zs(t, e, l);
      case 31:
        return kv(t, e, l);
      case 22:
        return qd(
          t,
          e,
          l,
          e.pendingProps
        );
      case 24:
        return wa(e), a = be(ce), t === null ? (n = rs(), n === null && (n = Vt, u = cs(), n.pooledCache = u, u.refCount++, u !== null && (n.pooledCacheLanes |= l), n = u), e.memoizedState = { parent: a, cache: n }, os(e), Wl(e, ce, n)) : ((t.lanes & l) !== 0 && (ds(t, e), hu(e, null, null, l), mu()), n = t.memoizedState, u = e.memoizedState, n.parent !== a ? (n = { parent: a, cache: a }, e.memoizedState = n, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = n), Wl(e, ce, a)) : (a = u.cache, Wl(e, ce, a), a !== n.cache && is(
          e,
          [ce],
          l,
          !0
        ))), oe(
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
        }), a = e.pendingProps, a.name != null && a.name !== "auto" ? e.flags |= t === null ? 18882560 : 18874368 : _t && vi(e), t !== null && t.memoizedProps.name !== a.name ? e.flags |= 4194816 : Tn(t, e), oe(t, e, a.children, l), e.child;
      case 29:
        throw e.pendingProps;
    }
    throw Error(s(156, e.tag));
  }
  function ql(t) {
    t.flags |= 4;
  }
  function Js(t, e, l, a, n) {
    var u;
    if ((u = (t.mode & 32) !== 0) && (u = l === null ? xh(e, a) : xh(e, a) && (a.src !== l.src || a.srcSet !== l.srcSet)), u) {
      if (t.flags |= 16777216, (n & 335544128) === n)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (jm()) t.flags |= 8192;
        else
          throw La = Ei, fs;
    } else t.flags &= -16777217;
  }
  function Wd(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !Mh(e))
      if (jm()) t.flags |= 8192;
      else
        throw La = Ei, fs;
  }
  function Gi(t, e) {
    e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? Nf() : 536870912, t.lanes |= e, zn |= e);
  }
  function Su(t, e) {
    if (!_t)
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
  function Jt(t) {
    var e = t.alternate !== null && t.alternate.child === t.child, l = 0, a = 0;
    if (e)
      for (var n = t.child; n !== null; )
        l |= n.lanes | n.childLanes, a |= n.subtreeFlags & 1206910976, a |= n.flags & 1206910976, n.return = t, n = n.sibling;
    else
      for (n = t.child; n !== null; )
        l |= n.lanes | n.childLanes, a |= n.subtreeFlags, a |= n.flags, n.return = t, n = n.sibling;
    return t.subtreeFlags |= a, t.childLanes = l, e;
  }
  function Iv(t, e, l) {
    var a = e.pendingProps;
    switch (ls(e), e.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Jt(e), null;
      case 1:
        return Jt(e), null;
      case 3:
        return l = e.stateNode, a = null, t !== null && (a = t.memoizedState.cache), e.memoizedState.cache !== a && (e.flags |= 2048), Bl(ce), xe(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (t === null || t.child === null) && (gn(e) ? ql(e) : t === null || t.memoizedState.isDehydrated && (e.flags & 256) === 0 || (e.flags |= 1024, ns())), Jt(e), null;
      case 26:
        var n = e.type, u = e.memoizedState;
        return t === null ? (ql(e), u !== null ? (Jt(e), Wd(e, u)) : (Jt(e), Js(
          e,
          n,
          null,
          a,
          l
        ))) : u ? u !== t.memoizedState ? (ql(e), Jt(e), Wd(e, u)) : (Jt(e), e.flags &= -16777217) : (t = t.memoizedProps, t !== a && ql(e), Jt(e), Js(
          e,
          n,
          t,
          a,
          l
        )), null;
      case 27:
        if (vl(e), l = st.current, n = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== a && ql(e);
        else {
          if (!a) {
            if (e.stateNode === null)
              throw Error(s(166));
            return Jt(e), e.subtreeFlags &= -33554433, null;
          }
          t = G.current, gn(e) ? Co(e) : (t = yh(n, a, l), e.stateNode = t, ql(e));
        }
        return Jt(e), e.subtreeFlags &= -33554433, null;
      case 5:
        if (vl(e), n = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== a && ql(e);
        else {
          if (!a) {
            if (e.stateNode === null)
              throw Error(s(166));
            return Jt(e), e.subtreeFlags &= -33554433, null;
          }
          if (u = G.current, gn(e))
            Co(e);
          else {
            var i = ju(
              st.current
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
            u[ye] = e, u[De] = a;
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
            t: switch (Ee(u, n, a), n) {
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
            a && ql(e);
          }
        }
        return Jt(e), e.subtreeFlags &= -33554433, Js(
          e,
          e.type,
          t === null ? null : t.memoizedProps,
          e.pendingProps,
          l
        ), null;
      case 6:
        if (t && e.stateNode != null)
          t.memoizedProps !== a && ql(e);
        else {
          if (typeof a != "string" && e.stateNode === null)
            throw Error(s(166));
          if (t = st.current, gn(e)) {
            if (t = e.stateNode, l = e.memoizedProps, a = null, n = he, n !== null)
              switch (n.tag) {
                case 27:
                case 5:
                  a = n.memoizedProps;
              }
            t[ye] = e, t = !!(t.nodeValue === l || a !== null && a.suppressHydrationWarning === !0 || Fm(t.nodeValue, l)), t || Fl(e, !0);
          } else
            t = ju(t).createTextNode(
              a
            ), t[ye] = e, e.stateNode = t;
        }
        return Jt(e), null;
      case 31:
        if (l = e.memoizedState, t === null || t.memoizedState !== null) {
          if (a = gn(e), l !== null) {
            if (t === null) {
              if (!a) throw Error(s(318));
              if (t = e.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(557));
              t[ye] = e;
            } else
              ja(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Jt(e), t = !1;
          } else
            l = ns(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = l), t = !0;
          if (!t)
            return e.flags & 256 ? (Ve(e), e) : (Ve(e), null);
          if ((e.flags & 128) !== 0)
            throw Error(s(558));
        }
        return Jt(e), null;
      case 13:
        if (a = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (n = gn(e), a !== null && a.dehydrated !== null) {
            if (t === null) {
              if (!n) throw Error(s(318));
              if (n = e.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(s(317));
              n[ye] = e;
            } else
              ja(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Jt(e), n = !1;
          } else
            n = ns(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return e.flags & 256 ? (Ve(e), e) : (Ve(e), null);
        }
        return Ve(e), (e.flags & 128) !== 0 ? (e.lanes = l, e) : (l = a !== null, t = t !== null && t.memoizedState !== null, l && (a = e.child, n = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (n = a.alternate.memoizedState.cachePool.pool), u = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (u = a.memoizedState.cachePool.pool), u !== n && (a.flags |= 2048)), l !== t && l && (e.child.flags |= 8192), Gi(e, e.updateQueue), Jt(e), null);
      case 4:
        return xe(), t === null && zr(e.stateNode.containerInfo), e.flags |= 67108864, Jt(e), null;
      case 10:
        return Bl(e.type), Jt(e), null;
      case 19:
        if (bs(e), a = e.memoizedState, a === null) return Jt(e), null;
        if (n = (e.flags & 128) !== 0, u = a.rendering, u === null)
          if (n) Su(a, !1);
          else {
            if (ne !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = e.child; t !== null; ) {
                if (u = Mi(t), u !== null) {
                  for (e.flags |= 128, Su(a, !1), t = u.updateQueue, e.updateQueue = t, Gi(e, t), e.subtreeFlags = 0, t = l, l = e.child; l !== null; )
                    No(l, t), l = l.sibling;
                  return vu(
                    e,
                    Se.current & 1 | 2
                  ), _t && wl(e, a.treeForkCount), e.child;
                }
                t = t.sibling;
              }
            a.tail !== null && Ot() > Pi && (e.flags |= 128, n = !0, Su(a, !1), e.lanes = 4194304);
          }
        else {
          if (!n)
            if (t = Mi(u), t !== null) {
              if (e.flags |= 128, n = !0, t = t.updateQueue, e.updateQueue = t, Gi(e, t), Su(a, !0), a.tail === null && a.tailMode !== "collapsed" && a.tailMode !== "visible" && !u.alternate && !_t)
                return Jt(e), null;
            } else
              2 * Ot() - a.renderingStartTime > Pi && l !== 536870912 && (e.flags |= 128, n = !0, Su(a, !1), e.lanes = 4194304);
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
          return a.rendering = t, a.tail = t.sibling, a.renderingStartTime = Ot(), t.sibling = null, u = Se.current, u = n ? u & 1 | 2 : u & 1, a.tailMode === "visible" || a.tailMode === "collapsed" || !l || _t ? vu(e, u) : (l = u, xt(pe, e), xt(Se, l), Me === null && (Me = e)), _t && wl(e, a.treeForkCount), t;
        }
        return Jt(e), null;
      case 22:
      case 23:
        return Ve(e), gs(), a = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== a && (e.flags |= 8192) : a && (e.flags |= 8192), a ? (l & 536870912) !== 0 && (e.flags & 128) === 0 && (Jt(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : Jt(e), l = e.updateQueue, l !== null && Gi(e, l.retryQueue), l = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), a = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), a !== l && (e.flags |= 2048), t !== null && $t(Ba), null;
      case 24:
        return l = null, t !== null && (l = t.memoizedState.cache), e.memoizedState.cache !== l && (e.flags |= 2048), Bl(ce), Jt(e), null;
      case 25:
        return null;
      case 30:
        return e.flags |= 33554432, Jt(e), null;
    }
    throw Error(s(156, e.tag));
  }
  function Pv(t, e) {
    switch (ls(e), e.tag) {
      case 1:
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 3:
        return Bl(ce), xe(), t = e.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (e.flags = t & -65537 | 128, e) : null;
      case 26:
      case 27:
      case 5:
        return vl(e), null;
      case 31:
        if (e.memoizedState !== null) {
          if (Ve(e), e.alternate === null)
            throw Error(s(340));
          ja();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 13:
        if (Ve(e), t = e.memoizedState, t !== null && t.dehydrated !== null) {
          if (e.alternate === null)
            throw Error(s(340));
          ja();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 19:
        return bs(e), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, t = e.memoizedState, t !== null && (t.rendering = null, t.tail = null), e.flags |= 4, e) : null;
      case 4:
        return xe(), null;
      case 10:
        return Bl(e.type), null;
      case 22:
      case 23:
        return Ve(e), gs(), t !== null && $t(Ba), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 24:
        return Bl(ce), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Id(t, e) {
    switch (ls(e), e.tag) {
      case 3:
        Bl(ce), xe();
        break;
      case 26:
      case 27:
      case 5:
        vl(e);
        break;
      case 4:
        xe();
        break;
      case 31:
        e.memoizedState !== null && Ve(e);
        break;
      case 13:
        Ve(e);
        break;
      case 19:
        bs(e);
        break;
      case 10:
        Bl(e.type);
        break;
      case 22:
      case 23:
        Ve(e), gs(), t !== null && $t(Ba);
        break;
      case 24:
        Bl(ce);
    }
  }
  function _u(t, e) {
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
    } catch (f) {
      Yt(e, e.return, f);
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
            var i = a.inst, f = i.destroy;
            if (f !== void 0) {
              i.destroy = void 0, n = e;
              var v = l, T = f;
              try {
                T();
              } catch (z) {
                Yt(
                  n,
                  v,
                  z
                );
              }
            }
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (z) {
      Yt(e, e.return, z);
    }
  }
  function Pd(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var l = t.stateNode;
      try {
        Xo(e, l);
      } catch (a) {
        Yt(t, t.return, a);
      }
    }
  }
  function tm(t, e, l) {
    l.props = Ga(
      t.type,
      t.memoizedProps
    ), l.state = t.memoizedState;
    try {
      l.componentWillUnmount();
    } catch (a) {
      Yt(t, e, a);
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
            var n = t.stateNode, u = jl(t.memoizedProps, n);
            (n.ref === null || n.ref.name !== u) && (n.ref = ch(u)), a = n.ref;
            break;
          case 7:
            if (t.stateNode === null) {
              var i = new $e(t);
              g(
                t.child,
                !1,
                Vg,
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
    } catch (f) {
      Yt(t, e, f);
    }
  }
  function _e(t, e) {
    var l = t.ref, a = t.refCleanup;
    if (l !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (n) {
          Yt(t, e, n);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (n) {
          Yt(t, e, n);
        }
      else l.current = null;
  }
  function Xi(t, e) {
    if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && t.alternate === null && e !== null)
      for (var l = 0; l < e.length; l++)
        mh(
          t.stateNode,
          e[l]
        );
  }
  function em(t) {
    for (var e = t.return; e !== null && (ks(e) && mh(t.stateNode, e.stateNode), !$s(e)); )
      e = e.return;
  }
  function Eu(t) {
    for (var e = t.return; e !== null && (ks(e) && Qg(t.stateNode, e.stateNode), !$s(e)); )
      e = e.return;
  }
  function $s(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 27;
  }
  function ks(t) {
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
      Yt(t, t.return, n);
    }
  }
  function Ws(t, e, l) {
    try {
      var a = t.stateNode;
      xg(a, t.type, l, e), a[De] = e;
    } catch (n) {
      Yt(t, t.return, n);
    }
  }
  function lm(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && da(t.type) || t.tag === 4;
  }
  function Is(t) {
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
  function Ps(t, e, l, a) {
    var n = t.tag;
    if (n === 5 || n === 6)
      n = t.stateNode, e ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(n, e) : (e = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, e.appendChild(n), l = l._reactRootContainer, l != null || e.onclick !== null || (e.onclick = gl)), Xi(t, a), Ut = !0;
    else if (n !== 4 && (n === 27 && (Xi(t, a), a = null, da(t.type) && (l = t.stateNode, e = null)), t = t.child, t !== null))
      for (Ps(
        t,
        e,
        l,
        a
      ), t = t.sibling; t !== null; )
        Ps(
          t,
          e,
          l,
          a
        ), t = t.sibling;
  }
  function Vi(t, e, l, a) {
    var n = t.tag;
    if (n === 5 || n === 6)
      n = t.stateNode, e ? l.insertBefore(n, e) : l.appendChild(n), Xi(t, a), Ut = !0;
    else if (n !== 4 && (n === 27 && (Xi(t, a), a = null, da(t.type) && (l = t.stateNode)), t = t.child, t !== null))
      for (Vi(
        t,
        e,
        l,
        a
      ), t = t.sibling; t !== null; )
        Vi(
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
      Ee(e, a, l), e[ye] = t, e[De] = l;
    } catch (u) {
      Yt(t, t.return, u);
    }
  }
  var Qi = !1, Qe = null;
  function nm(t) {
    (t.tag === 30 || (t.subtreeFlags & 33554432) !== 0) && (Qi = !0);
  }
  var Sl = null;
  function um() {
    var t = Sl;
    return Sl = null, t;
  }
  var Ue = 0;
  function Nn(t, e, l, a, n) {
    return Ue = 0, im(
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
          var f = Br(i);
          a.push(f), f.view && (u = !0);
        } else
          u || Br(i).view && (u = !0);
        Qi = !0, uh(
          i,
          Ue === 0 ? e : e + "_" + Ue,
          l
        ), Ue++;
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
  function Zi(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if ((t.tag !== 22 || t.memoizedState === null) && (Zi(t), t.tag === 30 && (t.flags & 18874368) !== 0 && t.stateNode.paired)) {
          var e = t.memoizedProps;
          if (e.name == null || e.name === "auto")
            throw Error(s(544));
          var l = e.name;
          e = Rl(e.default, e.share), e !== "none" && (Nn(
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
  function tr(t, e) {
    if (t.tag === 30) {
      var l = t.stateNode, a = t.memoizedProps, n = jl(a, l), u = Rl(
        a.default,
        l.paired ? a.share : a.enter
      );
      u !== "none" ? Nn(t, n, u, null, !1) ? (Zi(t), l.paired || e || Rn(t, a.onEnter)) : _l(t.child, !1) : Zi(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        tr(t, e), t = t.sibling;
    else Zi(t);
  }
  function er(t) {
    if (Qe !== null && Qe.size !== 0) {
      var e = Qe;
      if ((t.subtreeFlags & 18874368) !== 0)
        for (t = t.child; t !== null; ) {
          if (t.tag !== 22 || t.memoizedState === null) {
            if (t.tag === 30 && (t.flags & 18874368) !== 0) {
              var l = t.memoizedProps, a = l.name;
              if (a != null && a !== "auto") {
                var n = e.get(a);
                if (n !== void 0) {
                  var u = Rl(
                    l.default,
                    l.share
                  );
                  if (u !== "none" && (Nn(
                    t,
                    a,
                    u,
                    null,
                    !1
                  ) ? (u = t.stateNode, n.paired = u, u.paired = n, Rn(t, l.onShare)) : _l(t.child, !1)), e.delete(a), e.size === 0) break;
                }
              }
            }
            er(t);
          }
          t = t.sibling;
        }
    }
  }
  function lr(t) {
    if (t.tag === 30) {
      var e = t.memoizedProps, l = jl(e, t.stateNode), a = Qe !== null ? Qe.get(l) : void 0, n = Rl(
        e.default,
        a !== void 0 ? e.share : e.exit
      );
      n !== "none" && (Nn(t, l, n, null, !1) ? a !== void 0 ? (n = t.stateNode, a.paired = n, n.paired = a, Qe.delete(l), Rn(t, e.onShare)) : Rn(t, e.onExit) : _l(t.child, !1)), Qe !== null && er(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        lr(t), t = t.sibling;
    else
      Qe !== null && er(t);
  }
  function cm(t) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var e = t.memoizedProps, l = jl(e, t.stateNode);
        e = Rl(e.default, e.update), t.flags &= -5, e !== "none" && Nn(
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
  function ar(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if (t.tag !== 22 || t.memoizedState === null) {
          if (t.tag === 30 && (t.flags & 18874368) !== 0) {
            var e = t.stateNode;
            e.paired !== null && (e.paired = null, _l(t.child, !1));
          }
          ar(t);
        }
        t = t.sibling;
      }
  }
  function Ki(t) {
    if (t.tag === 30)
      t.stateNode.paired = null, _l(t.child, !1), ar(t);
    else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        Ki(t), t = t.sibling;
    else ar(t);
  }
  function sm(t) {
    for (t = t.child; t !== null; )
      t.tag === 30 ? _l(t.child, !1) : (t.subtreeFlags & 33554432) !== 0 && sm(t), t = t.sibling;
  }
  function nr(t, e, l, a, n, u, i) {
    for (var f = !1; e !== null; ) {
      if (e.tag === 5) {
        var v = e.stateNode;
        if (u !== null && Ue < u.length) {
          var T = u[Ue], z = Br(v);
          (T.view || z.view) && (f = !0);
          var w;
          if (w = (t.flags & 4) === 0)
            if (z.clip) w = !0;
            else {
              w = T.rect;
              var S = z.rect;
              w = w.y !== S.y || w.x !== S.x || w.height !== S.height || w.width !== S.width;
            }
          w && (t.flags |= 4), z.abs ? z = !T.abs : (T = T.rect, z = z.rect, z = T.height !== z.height || T.width !== z.width), z && (t.flags |= 32);
        } else t.flags |= 32;
        (t.flags & 4) !== 0 && uh(
          v,
          Ue === 0 ? l : l + "_" + Ue,
          n
        ), f && (t.flags & 4) !== 0 || (Sl === null && (Sl = []), Sl.push(
          v,
          Ue === 0 ? a : a + "_" + Ue,
          e.memoizedProps
        )), Ue++;
      } else (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && i ? t.flags |= e.flags & 32 : nr(
        t,
        e.child,
        l,
        a,
        n,
        u,
        i
      ) && (f = !0));
      e = e.sibling;
    }
    return f;
  }
  function rm(t, e) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var l = t.memoizedProps, a = t.stateNode, n = jl(l, a), u = Rl(l.default, l.update), i;
        i = t.memoizedState, t.memoizedState = null, a = t;
        var f = t.child;
        Ue = 0, n = nr(
          a,
          f,
          n,
          n,
          u,
          i,
          !1
        ), (t.flags & 4) !== 0 && n && Rn(t, l.onUpdate);
      } else
        (t.subtreeFlags & 33554432) !== 0 && rm(t);
      t = t.sibling;
    }
  }
  var ve = !1, Ht = !1, El = !1, ur = !1, fm = typeof WeakSet == "function" ? WeakSet : Set, ge = null, Tl = !1, Tu = !1, Ji = !1, ir = !1;
  function tg(t, e, l) {
    if (t = t.containerInfo, jr = Xn, t = ho(t), Kc(t)) {
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
            var f = 0, v = -1, T = -1, z = 0, w = 0, S = t, M = null;
            e: for (; ; ) {
              for (var V; S !== a || u !== 0 && S.nodeType !== 3 || (v = f + u), S !== i || n !== 0 && S.nodeType !== 3 || (T = f + n), S.nodeType === 3 && (f += S.nodeValue.length), (V = S.firstChild) !== null; )
                M = S, S = V;
              for (; ; ) {
                if (S === t) break e;
                if (M === a && ++z === u && (v = f), M === i && ++w === n && (T = f), (V = S.nextSibling) !== null) break;
                S = M, M = S.parentNode;
              }
              S = V;
            }
            a = v === -1 || T === -1 ? null : { start: v, end: T };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (Rr = { focusedElem: t, selectionRange: a }, Xn = !1, l = (l & 335544064) === l, ge = e, e = l ? 9270 : 1024; ge !== null; ) {
      if (t = ge, l && (a = t.deletions, a !== null))
        for (u = 0; u < a.length; u++)
          l && lr(a[u]);
      if (t.alternate === null && (t.flags & 2) !== 0)
        l && nm(t), $i(l);
      else {
        if (t.tag === 22) {
          if (a = t.alternate, t.memoizedState !== null) {
            a !== null && a.memoizedState === null && l && lr(a), $i(l);
            continue;
          } else if (a !== null && a.memoizedState !== null) {
            l && nm(t), $i(l);
            continue;
          }
        }
        a = t.child, (t.subtreeFlags & e) !== 0 && a !== null ? (a.return = t, ge = a) : (l && cm(t), $i(l));
      }
    }
    Qe = null;
  }
  function $i(t) {
    for (; ge !== null; ) {
      var e = ge, l = t, a = e.alternate, n = e.flags;
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
              var i = Ga(
                e.type,
                n
              );
              l = u.getSnapshotBeforeUpdate(
                i,
                a
              ), u.__reactInternalSnapshotBeforeUpdate = l;
            } catch (f) {
              Yt(e, e.return, f);
            }
          }
          break;
        case 3:
          if ((n & 1024) !== 0) {
            if (a = e.stateNode.containerInfo, l = a.nodeType, l === 9)
              Yr(a);
            else if (l === 1)
              switch (a.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  Yr(a);
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
          l && a !== null && (l = jl(
            a.memoizedProps,
            a.stateNode
          ), n = e.memoizedProps, n = Rl(n.default, n.update), n !== "none" && Nn(
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
        a.return = e.return, ge = a;
        break;
      }
      ge = e.return;
    }
  }
  function om(t, e, l) {
    var a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Nl(t, l), a & 4 && _u(5, l);
        break;
      case 1:
        if (Nl(t, l), a & 4)
          if (t = l.stateNode, e === null)
            try {
              t.componentDidMount();
            } catch (i) {
              Yt(l, l.return, i);
            }
          else {
            var n = Ga(
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
              Yt(
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
            Yt(l, l.return, i);
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
        Nl(t, l), a & 4 && gm(t, l), a & 64 && (t = l.memoizedState, t !== null && (t = t.dehydrated, t !== null && (l = dg.bind(
          null,
          l
        ), Jg(t, l))));
        break;
      case 22:
        if (a = l.memoizedState !== null || ve, !a) {
          var u = e !== null && e.memoizedState !== null || Ht;
          e = ve, n = Ht, ve = a, (Ht = u) && !n ? (a = 2, (l.subtreeFlags & 8772) !== 0 && (a |= 1), rl(
            t,
            l,
            a
          )) : Nl(t, l), ve = e, Ht = n;
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
  function cr(t, e) {
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
        } catch (v) {
          Yt(t, t.return, v);
        }
        sr(t, e);
        break;
      case 6:
        try {
          t.stateNode.nodeValue = e ? "" : t.memoizedProps, Ut = !0;
        } catch (v) {
          Yt(t, t.return, v);
        }
        break;
      case 18:
        try {
          var f = t.stateNode;
          e ? nh(f, !0) : nh(t.stateNode, !1);
        } catch (v) {
          Yt(t, t.return, v);
        }
        break;
      case 22:
      case 23:
        t.memoizedState === null && cr(t, e);
        break;
      default:
        cr(t, e);
    }
  }
  function sr(t, e) {
    if (t.subtreeFlags & 67108864)
      for (t = t.child; t !== null; ) {
        t: {
          var l = t, a = e;
          switch (l.tag) {
            case 4:
              dm(l, a);
              break t;
            case 22:
              l.memoizedState === null && sr(l, a);
              break t;
            default:
              sr(l, a);
          }
        }
        t = t.sibling;
      }
  }
  function mm(t) {
    var e = t.alternate;
    e !== null && (t.alternate = null, mm(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && Pu(e)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Pt = null, Be = !1;
  function cl(t, e, l) {
    for (l = l.child; l !== null; )
      hm(t, e, l), l = l.sibling;
  }
  function hm(t, e, l) {
    if (Ye && typeof Ye.onCommitFiberUnmount == "function")
      try {
        Ye.onCommitFiberUnmount(Kn, l);
      } catch {
      }
    switch (l.tag) {
      case 26:
        Ht || _e(l, e), cl(
          t,
          e,
          l
        ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && !Ht && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        Ht || _e(l, e), Eu(l);
        var a = Pt, n = Be;
        da(l.type) && (Pt = l.stateNode, Be = !1), cl(
          t,
          e,
          l
        ), bh(
          l.stateNode,
          l.type,
          l.memoizedProps
        ), Pt = a, Be = n;
        break;
      case 5:
        Ht || _e(l, e), Eu(l);
      case 6:
        if (l.tag === 6 && Eu(l), a = Pt, n = Be, Pt = null, cl(
          t,
          e,
          l
        ), Pt = a, Be = n, Pt !== null)
          if (Be)
            try {
              (Pt.nodeType === 9 ? Pt.body : Pt.nodeName === "HTML" ? Pt.ownerDocument.body : Pt).removeChild(l.stateNode), Ut = !0;
            } catch (u) {
              Yt(
                l,
                e,
                u
              );
            }
          else
            try {
              Pt.removeChild(l.stateNode), Ut = !0;
            } catch (u) {
              Yt(
                l,
                e,
                u
              );
            }
        break;
      case 18:
        Pt !== null && (Be ? (t = Pt, ah(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          l.stateNode
        ), Vn(t)) : ah(Pt, l.stateNode));
        break;
      case 4:
        a = Pt, n = Be, Pt = l.stateNode.containerInfo, Be = !0, cl(
          t,
          e,
          l
        ), Pt = a, Be = n;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        ua(2, l, e), Ht || ua(4, l, e), cl(
          t,
          e,
          l
        );
        break;
      case 1:
        Ht || (_e(l, e), a = l.stateNode, typeof a.componentWillUnmount == "function" && tm(
          l,
          e,
          a
        )), cl(
          t,
          e,
          l
        );
        break;
      case 21:
        cl(
          t,
          e,
          l
        );
        break;
      case 22:
        Ht = (a = Ht) || l.memoizedState !== null, cl(
          t,
          e,
          l
        ), Ht = a;
        break;
      case 30:
        _e(l, e), cl(
          t,
          e,
          l
        );
        break;
      case 7:
        Ht || _e(l, e), cl(
          t,
          e,
          l
        );
        break;
      default:
        cl(
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
        Vn(t);
      } catch (l) {
        Yt(e, e.return, l);
      }
    }
  }
  function gm(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        Vn(t);
      } catch (l) {
        Yt(e, e.return, l);
      }
  }
  function eg(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return e === null && (e = t.stateNode = new fm()), e;
      case 22:
        return t = t.stateNode, e = t._retryCache, e === null && (e = t._retryCache = new fm()), e;
      default:
        throw Error(s(435, t.tag));
    }
  }
  function ki(t, e) {
    var l = eg(t);
    e.forEach(function(a) {
      if (!l.has(a)) {
        l.add(a);
        var n = mg.bind(null, t, a);
        a.then(n, n);
      }
    });
  }
  function Ae(t, e, l) {
    var a = e.deletions;
    if (a !== null)
      for (var n = 0; n < a.length; n++) {
        var u = a[n], i = t, f = e, v = f;
        t: for (; v !== null; ) {
          switch (v.tag) {
            case 27:
              if (da(v.type)) {
                Pt = v.stateNode, Be = !1;
                break t;
              }
              break;
            case 5:
              Pt = v.stateNode, Be = !1;
              break t;
            case 3:
            case 4:
              Pt = v.stateNode.containerInfo, Be = !0;
              break t;
          }
          v = v.return;
        }
        if (Pt === null) throw Error(s(160));
        hm(i, f, u), Pt = null, Be = !1, i = u.alternate, i !== null && (i.return = null), u.return = null;
      }
    if (e.subtreeFlags & 13886)
      for (e = e.child; e !== null; )
        ym(e, t, l), e = e.sibling;
  }
  var sl = null;
  function ym(t, e, l) {
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
        Ae(e, t, l), je(t), n & 4 && (ua(3, t, t.return), _u(3, t), ua(5, t, t.return));
        break;
      case 1:
        Ae(e, t, l), je(t), n & 512 && (Ht || a === null || _e(a, a.return)), n & 64 && ve && (t = t.updateQueue, t !== null && (e = t.callbacks, e !== null && (l = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = l === null ? e : l.concat(e))));
        break;
      case 26:
        if (u = sl, Ae(e, t, l), je(t), n & 512 && (Ht || a === null || _e(a, a.return)), n & 4)
          if (n = a !== null ? a.memoizedState : null, l = t.memoizedState, a === null)
            if (l === null)
              if (t.stateNode === null)
                if (ve)
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
                        a = n.getElementsByTagName("title")[0], (!a || a[kn] || a[ye] || a.namespaceURI === "http://www.w3.org/2000/svg" || a.hasAttribute("itemprop")) && (a = n.createElement(e), n.head.insertBefore(
                          a,
                          n.querySelector("head > title")
                        )), Ee(a, e, l), a[ye] = t, me(a), e = a;
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
                        a = n.createElement(e), Ee(a, e, l), n.head.appendChild(a);
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
                        a = n.createElement(e), Ee(a, e, l), n.head.appendChild(a);
                        break;
                      default:
                        throw Error(s(468, e));
                    }
                    a[ye] = t, me(a), e = a;
                  }
                  t.stateNode = e;
                }
              else
                ve || Kr(u, t.type, t.stateNode);
            else
              t.stateNode = Th(
                u,
                l,
                t.memoizedProps
              );
          else
            n !== l ? (n === null ? (e = a.stateNode, e === null || Ht || e.parentNode.removeChild(e)) : n.count--, l === null ? ve || Kr(u, t.type, t.stateNode) : Th(u, l, t.memoizedProps)) : l === null && t.stateNode !== null && Ws(
              t,
              t.memoizedProps,
              a.memoizedProps
            );
        break;
      case 27:
        Ae(e, t, l), je(t), n & 512 && (Ht || a === null || _e(a, a.return)), a !== null && n & 4 && Ws(
          t,
          t.memoizedProps,
          a.memoizedProps
        );
        break;
      case 5:
        if (u = El, El = !1, Ae(e, t, l), El = u, je(t), n & 512 && (Ht || a === null || _e(a, a.return)), t.flags & 32) {
          e = t.stateNode;
          try {
            un(e, ""), Ut = !0;
          } catch (z) {
            Yt(t, t.return, z);
          }
        }
        n & 4 && t.stateNode != null && (e = t.memoizedProps, Ws(
          t,
          e,
          a !== null ? a.memoizedProps : e
        )), n & 1024 && (ur = !0);
        break;
      case 6:
        if (Ae(e, t, l), je(t), n & 4) {
          if (t.stateNode === null)
            throw Error(s(162));
          e = t.memoizedProps, l = t.stateNode;
          try {
            l.nodeValue = e, Ut = !0;
          } catch (z) {
            Yt(t, t.return, z);
          }
        }
        break;
      case 3:
        if (Ut = !1, fc = null, u = sl, sl = Ru(e.containerInfo), Ae(e, t, l), sl = u, je(t), n & 4 && a !== null && a.memoizedState.isDehydrated)
          try {
            Vn(e.containerInfo);
          } catch (z) {
            Yt(t, t.return, z);
          }
        ur && (ur = !1, bm(t)), Ut = !1;
        break;
      case 4:
        n = El, El = ve, a = Hf(), u = sl, sl = Ru(
          t.stateNode.containerInfo
        ), Ae(e, t, l), je(t), sl = u, Ut && Tu && (Ji = !0), Ut = a, El = n;
        break;
      case 12:
        Ae(e, t, l), je(t);
        break;
      case 31:
        Ae(e, t, l), je(t), n & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, ki(t, e)));
        break;
      case 13:
        Ae(e, t, l), je(t), t.child.flags & 8192 && t.memoizedState !== null != (a !== null && a.memoizedState !== null) && (Ii = Ot()), n & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, ki(t, e)));
        break;
      case 22:
        u = t.memoizedState !== null, i = a !== null && a.memoizedState !== null;
        var f = ve, v = Ht, T = El;
        ve = f || u, El = T || u, Ht = v || i, Ae(e, t, l), Ht = v, El = T, ve = f, je(t), n & 8192 && (e = t.stateNode, e._visibility = u ? e._visibility & -2 : e._visibility | 1, !u || a === null || i || ve || Ht || (e = i || Ht, l = ve, a = Ht, ve = u || ve, Ht = e, ia(t, 2), ve = l, Ht = a), !u && El || cr(t, u)), n & 4 && (e = t.updateQueue, e !== null && (l = e.retryQueue, l !== null && (e.retryQueue = null, ki(t, l))));
        break;
      case 19:
        Ae(e, t, l), je(t), n & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, ki(t, e)));
        break;
      case 30:
        n & 512 && (Ht || a === null || _e(a, a.return)), n = Hf(), u = Tu, i = (l & 335544064) === l, f = t.memoizedProps, Tu = i && Rl(
          f.default,
          f.update
        ) !== "none", Ae(e, t, l), je(t), i && a !== null && Ut && (t.flags |= 4), Tu = u, Ut = n;
        break;
      case 21:
        break;
      case 7:
        n & 512 && (Ht || a === null || _e(a, a.return)), a && a.stateNode !== null && (a.stateNode._fragmentFiber = t);
      default:
        Ae(e, t, l), je(t);
    }
  }
  function je(t) {
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
          if (ks(n)) {
            var u = n.stateNode;
            a === null ? a = [u] : a.push(u);
          }
          if ($s(n)) break;
          n = n.return;
        }
        var i = a;
        if (l == null) throw Error(s(160));
        switch (l.tag) {
          case 27:
            var f = l.stateNode, v = Is(t);
            Vi(
              t,
              v,
              f,
              i
            );
            break;
          case 5:
            var T = l.stateNode;
            l.flags & 32 && (un(T, ""), l.flags &= -33);
            var z = Is(t);
            Vi(
              t,
              z,
              T,
              i
            );
            break;
          case 3:
          case 4:
            var w = l.stateNode.containerInfo, S = Is(t);
            Ps(
              t,
              S,
              w,
              i
            );
            break;
          default:
            throw Error(s(161));
        }
      } catch (M) {
        Yt(t, t.return, M);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function bm(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        bm(e), e.tag === 5 && e.flags & 1024 && (e = e.stateNode, Xn = !0, e.reset(), Xn = !1), t = t.sibling;
      }
  }
  function xn(t, e) {
    if (e.subtreeFlags & 9270)
      for (e = e.child; e !== null; )
        pm(e, t), e = e.sibling;
    else rm(e);
  }
  function pm(t, e) {
    var l = t.alternate;
    if (l === null) tr(t, !1);
    else
      switch (t.tag) {
        case 3:
          if (ir = Tl = !1, um(), xn(e, t), !Tl && !Ji) {
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
            )), ir = !0;
          }
          Sl = null;
          break;
        case 5:
          xn(e, t);
          break;
        case 4:
          a = Tl, Tl = !1, xn(e, t), Tl && (Ji = !0), Tl = a;
          break;
        case 22:
          t.memoizedState === null && (l.memoizedState !== null ? tr(t, !1) : xn(e, t));
          break;
        case 30:
          a = Tl, n = um(), Tl = !1, xn(e, t), Tl && (t.flags |= 4);
          var u = t.memoizedProps, i = t.stateNode;
          e = jl(u, i), i = jl(l.memoizedProps, i);
          var f = Rl(u.default, u.update);
          f === "none" ? e = !1 : (u = l.memoizedState, l.memoizedState = null, l = t.child, Ue = 0, e = nr(
            t,
            l,
            e,
            i,
            f,
            u,
            !0
          ), Ue !== (u === null ? 0 : u.length) && (t.flags |= 32)), (t.flags & 4) !== 0 && e ? (Rn(
            t,
            t.memoizedProps.onUpdate
          ), Sl = n) : n !== null && (n.push.apply(n, Sl), Sl = n), Tl = (t.flags & 32) !== 0 ? !0 : a;
          break;
        default:
          xn(e, t);
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
          _e(l, l.return);
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
          _e(l, l.return), l.tag !== 5 && l.tag !== 27 || Eu(l), ia(
            l,
            a
          );
          break;
        case 6:
          Eu(l);
          break;
        case 26:
          _e(l, l.return), n = l.stateNode, l.memoizedState !== null || n === null || Ht || n.parentNode.removeChild(n), ia(
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
          _e(l, l.return), ia(
            l,
            a
          );
          break;
        case 7:
          _e(l, l.return);
        default:
          ia(
            l,
            a
          );
      }
      t = t.sibling;
    }
  }
  function rl(t, e, l) {
    for (l = (e.subtreeFlags & 8772) !== 0 ? l : l & -2, e = e.child; e !== null; ) {
      var a = e.alternate, n = t, u = e, i = u.flags, f = (l & 1) !== 0;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          rl(
            n,
            u,
            l
          ), _u(4, u);
          break;
        case 1:
          if (rl(
            n,
            u,
            l
          ), a = u, n = a.stateNode, typeof n.componentDidMount == "function")
            try {
              n.componentDidMount();
            } catch (z) {
              Yt(a, a.return, z);
            }
          if (a = u, n = a.updateQueue, n !== null) {
            var v = a.stateNode;
            try {
              var T = n.shared.hiddenCallbacks;
              if (T !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < T.length; n++)
                  Go(T[n], v);
            } catch (z) {
              Yt(a, a.return, z);
            }
          }
          f && i & 64 && Pd(u), pl(u, u.return);
          break;
        case 27:
          (l & 2) !== 0 && am(u);
        case 5:
          u.tag !== 5 && u.tag !== 27 || em(u), rl(
            n,
            u,
            l
          ), f && a === null && i & 4 && Fs(u), pl(u, u.return);
          break;
        case 6:
          em(u);
          break;
        case 26:
          v = u.stateNode, u.memoizedState !== null || v === null || ve || Kr(
            Ru(v.ownerDocument),
            u.type,
            v
          ), rl(
            n,
            u,
            l
          ), f && a === null && i & 4 && Fs(u), pl(u, u.return);
          break;
        case 12:
          rl(
            n,
            u,
            l
          );
          break;
        case 31:
          rl(
            n,
            u,
            l
          ), f && i & 4 && vm(n, u);
          break;
        case 13:
          rl(
            n,
            u,
            l
          ), f && i & 4 && gm(n, u);
          break;
        case 22:
          u.memoizedState === null && rl(
            n,
            u,
            l
          ), pl(u, u.return);
          break;
        case 30:
          rl(
            n,
            u,
            l
          ), pl(u, u.return);
          break;
        case 7:
          pl(u, u.return);
        default:
          rl(
            n,
            u,
            l
          );
      }
      e = e.sibling;
    }
  }
  function rr(t, e) {
    var l = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), t = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), t !== l && (t != null && t.refCount++, l != null && su(l));
  }
  function fr(t, e) {
    t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && su(t));
  }
  function al(t, e, l, a) {
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
    n && e.alternate === null && e.return !== null && e.return.alternate !== null && Ki(e);
    var u = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        al(
          t,
          e,
          l,
          a
        ), u & 2048 && _u(9, e);
        break;
      case 1:
        al(
          t,
          e,
          l,
          a
        );
        break;
      case 3:
        al(
          t,
          e,
          l,
          a
        ), n && ir && (t = t.containerInfo, t = t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, t.style.viewTransitionName === "root" && (t.style.viewTransitionName = ""), t = t.ownerDocument.documentElement, t !== null && t.style.viewTransitionName === "none" && (t.style.viewTransitionName = "")), u & 2048 && (u = null, e.alternate !== null && (u = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== u && (e.refCount++, u != null && su(u)));
        break;
      case 12:
        if (u & 2048) {
          al(
            t,
            e,
            l,
            a
          ), u = e.stateNode;
          try {
            var i = e.memoizedProps, f = i.id, v = i.onPostCommit;
            typeof v == "function" && v(
              f,
              e.alternate === null ? "mount" : "update",
              u.passiveEffectDuration,
              -0
            );
          } catch (T) {
            Yt(e, e.return, T);
          }
        } else
          al(
            t,
            e,
            l,
            a
          );
        break;
      case 31:
        al(
          t,
          e,
          l,
          a
        );
        break;
      case 13:
        al(
          t,
          e,
          l,
          a
        );
        break;
      case 23:
        break;
      case 22:
        i = e.stateNode, f = e.alternate, e.memoizedState !== null ? (n && f !== null && f.memoizedState === null && Ki(f), i._visibility & 2 ? al(
          t,
          e,
          l,
          a
        ) : Nu(
          t,
          e
        )) : (n && f !== null && f.memoizedState !== null && Ki(e), i._visibility & 2 ? al(
          t,
          e,
          l,
          a
        ) : (i._visibility |= 2, Mn(
          t,
          e,
          l,
          a,
          (e.subtreeFlags & 10256) !== 0 || !1
        ))), u & 2048 && rr(f, e);
        break;
      case 24:
        al(
          t,
          e,
          l,
          a
        ), u & 2048 && fr(e.alternate, e);
        break;
      case 30:
        n && (u = e.alternate, u !== null && (_l(u.child, !0), _l(e.child, !0))), al(
          t,
          e,
          l,
          a
        );
        break;
      default:
        al(
          t,
          e,
          l,
          a
        );
    }
  }
  function Mn(t, e, l, a, n) {
    for (n = n && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var u = t, i = e, f = l, v = a, T = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          Mn(
            u,
            i,
            f,
            v,
            n
          ), _u(8, i);
          break;
        case 23:
          break;
        case 22:
          var z = i.stateNode;
          i.memoizedState !== null ? z._visibility & 2 ? Mn(
            u,
            i,
            f,
            v,
            n
          ) : Nu(
            u,
            i
          ) : (z._visibility |= 2, Mn(
            u,
            i,
            f,
            v,
            n
          )), n && T & 2048 && rr(
            i.alternate,
            i
          );
          break;
        case 24:
          Mn(
            u,
            i,
            f,
            v,
            n
          ), n && T & 2048 && fr(i.alternate, i);
          break;
        default:
          Mn(
            u,
            i,
            f,
            v,
            n
          );
      }
      e = e.sibling;
    }
  }
  function Nu(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var l = t, a = e, n = a.flags;
        switch (a.tag) {
          case 22:
            Nu(l, a), n & 2048 && rr(
              a.alternate,
              a
            );
            break;
          case 24:
            Nu(l, a), n & 2048 && fr(a.alternate, a);
            break;
          default:
            Nu(l, a);
        }
        e = e.sibling;
      }
  }
  var Xa = 8192;
  function Va(t, e, l) {
    if (t.subtreeFlags & Xa)
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
        Va(
          t,
          e,
          l
        ), t.flags & Xa && (t.memoizedState !== null ? cy(
          l,
          sl,
          t.memoizedState,
          t.memoizedProps
        ) : (t = t.stateNode, (e & 335544128) === e && zh(l, t)));
        break;
      case 5:
        Va(
          t,
          e,
          l
        ), t.flags & Xa && (t = t.stateNode, (e & 335544128) === e && zh(l, t));
        break;
      case 3:
      case 4:
        var a = sl;
        sl = Ru(t.stateNode.containerInfo), Va(
          t,
          e,
          l
        ), sl = a;
        break;
      case 22:
        t.memoizedState === null && (a = t.alternate, a !== null && a.memoizedState !== null ? (a = Xa, Xa = 16777216, Va(
          t,
          e,
          l
        ), Xa = a) : Va(
          t,
          e,
          l
        ));
        break;
      case 30:
        if ((t.flags & Xa) !== 0 && (a = t.memoizedProps.name, a != null && a !== "auto")) {
          var n = t.stateNode;
          n.paired = null, Qe === null && (Qe = /* @__PURE__ */ new Map()), Qe.set(a, n);
        }
        Va(
          t,
          e,
          l
        );
        break;
      default:
        Va(
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
  function xu(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var a = e[l];
          ge = a, Nm(
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
        xu(t), t.flags & 2048 && ua(9, t, t.return);
        break;
      case 3:
        xu(t);
        break;
      case 12:
        xu(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (e._visibility &= -3, Fi(t)) : xu(t);
        break;
      default:
        xu(t);
    }
  }
  function Fi(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var a = e[l];
          ge = a, Nm(
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
    for (; ge !== null; ) {
      var l = ge;
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
          su(l.memoizedState.cache);
      }
      if (a = l.child, a !== null) a.return = l, ge = a;
      else
        t: for (l = t; ge !== null; ) {
          a = ge;
          var n = a.sibling, u = a.return;
          if (mm(a), a === l) {
            ge = null;
            break t;
          }
          if (n !== null) {
            n.return = u, ge = n;
            break t;
          }
          ge = u;
        }
    }
  }
  var lg = {
    getCacheForType: function(t) {
      var e = be(ce), l = e.data.get(t);
      return l === void 0 && (l = t(), e.data.set(t, l)), l;
    },
    cacheSignal: function() {
      return be(ce).controller.signal;
    }
  }, ag = typeof WeakMap == "function" ? WeakMap : Map, Bt = 0, Vt = null, zt = null, jt = 0, Lt = 0, Ze = null, ca = !1, On = !1, or = !1, Gl = 0, ne = 0, sa = 0, Qa = 0, Wi = 0, Ke = 0, zn = 0, Mu = null, He = null, dr = !1, Ii = 0, xm = 0, Pi = 1 / 0, tc = null, ra = null, ee = 0, fl = null, Za = null, xl = 0, mr = 0, hr = null, Mm = null, Cn = null, An = null, jn = null, Ou = 0, ec = null;
  function Je() {
    return (Bt & 2) !== 0 && jt !== 0 ? jt & -jt : J.T !== null ? Nr() : zf();
  }
  function Om() {
    if (Ke === 0)
      if ((jt & 536870912) === 0 || _t) {
        var t = ku;
        ku <<= 1, (ku & 3932160) === 0 && (ku = 262144), Ke = t;
      } else Ke = 536870912;
    return t = pe.current, t !== null && (t.flags |= 32), Ke;
  }
  function Rn(t, e) {
    if (e != null) {
      var l = t.stateNode, a = l.ref;
      a === null && (a = l.ref = ch(
        jl(t.memoizedProps, l)
      )), An === null && (An = []), An.push(e.bind(null, a));
    }
  }
  function Le(t, e, l) {
    (t === Vt && (Lt === 2 || Lt === 9) || t.cancelPendingCommit !== null) && (Dn(t, 0), fa(
      t,
      jt,
      Ke,
      !1
    )), $n(t, l), ((Bt & 2) === 0 || t !== Vt) && (t === Vt && ((Bt & 2) === 0 && (Qa |= l), ne === 4 && fa(
      t,
      jt,
      Ke,
      !1
    )), Ml(t));
  }
  function zm(t, e, l) {
    if ((Bt & 6) !== 0) throw Error(s(327));
    var a = !l && (e & 127) === 0 && (e & t.expiredLanes) === 0 || Jn(t, e), n = a ? ig(t, e) : gr(t, e, !0), u = a;
    do {
      if (n === 0) {
        On && !a && fa(t, e, 0, !1);
        break;
      } else {
        if (l = t.current.alternate, u && !ng(l)) {
          n = gr(t, e, !1), u = !1;
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
              var f = t;
              n = Mu;
              var v = f.current.memoizedState.isDehydrated;
              if (v && (Dn(f, i).flags |= 256), i = gr(
                f,
                i,
                !1
              ), i !== 2 && i !== 6) {
                if (or && !v) {
                  f.errorRecoveryDisabledLanes |= u, Qa |= u, n = 4;
                  break t;
                }
                u = He, He = n, u !== null && (He === null ? He = u : He.push.apply(
                  He,
                  u
                ));
              }
              n = i;
            }
            if (u = !1, n !== 2) continue;
          }
        }
        if (n === 1) {
          Dn(t, 0), fa(t, e, 0, !0);
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
              fa(
                a,
                e,
                Ke,
                !ca
              );
              break t;
            case 2:
              He = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((e & 62914560) === e && (n = Ii + 300 - Ot(), 10 < n)) {
            if (fa(
              a,
              e,
              Ke,
              !ca
            ), Wu(a, 0, !0) !== 0) break t;
            xl = e, a.timeoutHandle = Ur(
              Cm.bind(
                null,
                a,
                l,
                He,
                tc,
                dr,
                e,
                Ke,
                Qa,
                zn,
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
          Cm(
            a,
            l,
            He,
            tc,
            dr,
            e,
            Ke,
            Qa,
            zn,
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
  function Cm(t, e, l, a, n, u, i, f, v, T, z, w, S, M) {
    t.timeoutHandle = -1;
    var V = e.subtreeFlags, tt = (u & 335544064) === u;
    if (w = null, (tt || V & 8192 || (V & 16785408) === 16785408) && (w = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: gl
    }, Qe = null, _m(
      e,
      u,
      w
    ), tt && (V = w, tt = t.containerInfo, tt = (tt.nodeType === 9 ? tt : tt.ownerDocument).__reactViewTransition, tt != null && (V.count++, V.waitingForViewTransition = !0, V = Uu.bind(V), tt.finished.then(V, V))), V = (u & 62914560) === u ? Ii - Ot() : (u & 4194048) === u ? xm - Ot() : 0, V = sy(
      w,
      V
    ), V !== null)) {
      xl = u, t.cancelPendingCommit = V(
        Hm.bind(
          null,
          t,
          e,
          u,
          l,
          a,
          n,
          i,
          f,
          v,
          T,
          z,
          w,
          null,
          S,
          M
        )
      ), fa(t, u, i, !T);
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
      f,
      v,
      T,
      z,
      w
    );
  }
  function ng(t) {
    for (var e = t; ; ) {
      var l = e.tag;
      if ((l === 0 || l === 11 || l === 15) && e.flags & 16384 && (l = e.updateQueue, l !== null && (l = l.stores, l !== null)))
        for (var a = 0; a < l.length; a++) {
          var n = l[a], u = n.getSnapshot;
          n = n.value;
          try {
            if (!Xe(u(), n)) return !1;
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
  function fa(t, e, l, a) {
    e = Tf(t, e), e &= ~Wi, e &= ~Qa, t.suspendedLanes |= e, t.pingedLanes &= ~e, a && (t.warmLanes |= e), a = t.expirationTimes;
    for (var n = e; 0 < n; ) {
      var u = 31 - qe(n), i = 1 << u;
      a[u] = -1, n &= ~i;
    }
    l !== 0 && xf(t, l, e);
  }
  function lc() {
    return (Bt & 6) === 0 ? (zu(0), !1) : !0;
  }
  function vr() {
    if (zt !== null) {
      if (Lt === 0)
        var t = zt.return;
      else
        t = zt, Ul = Ra = null, Ts(t), pn = null, ou = 0, t = zt;
      for (; t !== null; )
        Id(t.alternate, t), t = t.return;
      zt = null;
    }
  }
  function Dn(t, e) {
    var l = t.timeoutHandle;
    return l !== -1 && (t.timeoutHandle = -1, zg(l)), l = t.cancelPendingCommit, l !== null && (t.cancelPendingCommit = null, l()), xl = 0, vr(), Vt = t, zt = l = Dl(t.current, null), jt = e, Lt = 0, Ze = null, ca = !1, On = Jn(t, e), or = !1, zn = Ke = Wi = Qa = sa = ne = 0, He = Mu = null, dr = !1, Gl = Tf(t, e), fi(), l;
  }
  function Am(t, e) {
    yt = null, J.H = Ui, e === bn || e === _i ? (e = Ho(), Lt = 3) : e === fs ? (e = Ho(), Lt = 4) : Lt = e === Ls ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, Ze = e, zt === null && (ne = 1, Bi(
      t,
      Pe(e, t.current)
    ));
  }
  function jm() {
    var t = pe.current;
    return t === null ? !0 : (jt & 4194048) === jt ? Me === null : (jt & 62914560) === jt || (jt & 536870912) !== 0 ? t === Me : !1;
  }
  function Rm() {
    var t = J.H;
    return J.H = Ui, t === null ? Ui : t;
  }
  function Dm() {
    var t = J.A;
    return J.A = lg, t;
  }
  function ac() {
    ne = 4, ca || (jt & 4194048) !== jt && pe.current !== null || (On = !0), (sa & 134217727) === 0 && (Qa & 134217727) === 0 || Vt === null || fa(
      Vt,
      jt,
      Ke,
      !1
    );
  }
  function gr(t, e, l) {
    var a = Bt;
    Bt |= 2;
    var n = Rm(), u = Dm();
    (Vt !== t || jt !== e) && (tc = null, Dn(t, e)), e = !1;
    var i = ne;
    t: do
      try {
        if (Lt !== 0 && zt !== null) {
          var f = zt, v = Ze;
          switch (Lt) {
            case 8:
              vr(), i = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              pe.current === null && (e = !0);
              var T = Lt;
              if (Lt = 0, Ze = null, wn(t, f, v, T), l && On) {
                i = 0;
                break t;
              }
              break;
            default:
              T = Lt, Lt = 0, Ze = null, wn(t, f, v, T);
          }
        }
        ug(), i = ne;
        break;
      } catch (z) {
        Am(t, z);
      }
    while (!0);
    return e && t.shellSuspendCounter++, Ul = Ra = null, Bt = a, J.H = n, J.A = u, zt === null && (Vt = null, jt = 0, fi()), i;
  }
  function ug() {
    for (; zt !== null; ) wm(zt);
  }
  function ig(t, e) {
    var l = Bt;
    Bt |= 2;
    var a = Rm(), n = Dm();
    Vt !== t || jt !== e ? (tc = null, Pi = Ot() + 500, Dn(t, e)) : On = Jn(
      t,
      e
    );
    t: do
      try {
        if (Lt !== 0 && zt !== null) {
          e = zt;
          var u = Ze;
          e: switch (Lt) {
            case 1:
              Lt = 0, Ze = null, wn(t, e, u, 1);
              break;
            case 2:
            case 9:
              if (Uo(u)) {
                Lt = 0, Ze = null, Um(e);
                break;
              }
              e = function() {
                Lt !== 2 && Lt !== 9 || Vt !== t || (Lt = 7), Ml(t);
              }, u.then(e, e);
              break t;
            case 3:
              Lt = 7;
              break t;
            case 4:
              Lt = 5;
              break t;
            case 7:
              Uo(u) ? (Lt = 0, Ze = null, Um(e)) : (Lt = 0, Ze = null, wn(t, e, u, 7));
              break;
            case 5:
              var i = null;
              switch (zt.tag) {
                case 26:
                  i = zt.memoizedState;
                case 5:
                case 27:
                  var f = zt;
                  if (i ? Mh(i) : f.stateNode.complete) {
                    Lt = 0, Ze = null;
                    var v = f.sibling;
                    if (v !== null) zt = v;
                    else {
                      var T = f.return;
                      T !== null ? (zt = T, nc(T)) : zt = null;
                    }
                    break e;
                  }
              }
              Lt = 0, Ze = null, wn(t, e, u, 5);
              break;
            case 6:
              Lt = 0, Ze = null, wn(t, e, u, 6);
              break;
            case 8:
              vr(), ne = 6;
              break t;
            default:
              throw Error(s(462));
          }
        }
        cg();
        break;
      } catch (z) {
        Am(t, z);
      }
    while (!0);
    return Ul = Ra = null, J.H = a, J.A = n, Bt = l, zt !== null ? 0 : (Vt = null, jt = 0, fi(), ne);
  }
  function cg() {
    for (; zt !== null && !I(); )
      wm(zt);
  }
  function wm(t) {
    var e = Fd(t.alternate, t, Gl);
    t.memoizedProps = t.pendingProps, e === null ? nc(t) : zt = e;
  }
  function Um(t) {
    var e = t, l = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = Vd(
          l,
          e,
          e.pendingProps,
          e.type,
          void 0,
          jt
        );
        break;
      case 11:
        e = Vd(
          l,
          e,
          e.pendingProps,
          e.type.render,
          e.ref,
          jt
        );
        break;
      case 5:
        Ts(e);
        var a = e;
        a === he && (_t ? (gi(a), a.tag === 5 && a.stateNode != null && (Kt = a.stateNode)) : (gi(a), _t = !0));
      default:
        Id(l, e), e = zt = No(e, Gl), e = Fd(l, e, Gl);
    }
    t.memoizedProps = t.pendingProps, e === null ? nc(t) : zt = e;
  }
  function wn(t, e, l, a) {
    Ul = Ra = null, Ts(e), pn = null, ou = 0;
    var n = e.return;
    try {
      if ($v(
        t,
        n,
        e,
        l,
        jt
      )) {
        ne = 1, Bi(
          t,
          Pe(l, t.current)
        ), zt = null;
        return;
      }
    } catch (u) {
      if (n !== null) throw zt = n, u;
      ne = 1, Bi(
        t,
        Pe(l, t.current)
      ), zt = null;
      return;
    }
    e.flags & 32768 ? (_t || a === 1 ? t = !0 : On || (jt & 536870912) !== 0 ? t = !1 : (ca = t = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = pe.current, a !== null && a.tag === 13 && (a.flags |= 16384))), Bm(e, t)) : nc(e);
  }
  function nc(t) {
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
      var l = Iv(
        e.alternate,
        e,
        Gl
      );
      if (l !== null) {
        zt = l;
        return;
      }
      if (e = e.sibling, e !== null) {
        zt = e;
        return;
      }
      zt = e = t;
    } while (e !== null);
    ne === 0 && (ne = 5);
  }
  function Bm(t, e) {
    do {
      var l = Pv(t.alternate, t);
      if (l !== null) {
        l.flags &= 32767, zt = l;
        return;
      }
      if (l = t.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !e && (t = t.sibling, t !== null)) {
        zt = t;
        return;
      }
      zt = t = l;
    } while (t !== null);
    ne = 6, zt = null;
  }
  function Hm(t, e, l, a, n, u, i, f, v, T, z, w) {
    t.cancelPendingCommit = null;
    do
      uc();
    while (ee !== 0);
    if ((Bt & 6) !== 0) throw Error(s(327));
    if (e !== null) {
      if (e === t.current) throw Error(s(177));
      t === Vt && (zt = Vt = null, jt = 0), Za = e, fl = t, xl = l, hr = n, Mm = a, sg(
        t,
        e,
        l,
        i,
        f,
        v,
        w
      );
    }
  }
  function sg(t, e, l, a, n, u, i) {
    var f = e.lanes | e.childLanes;
    if (mr = f, f |= Wc, w0(
      t,
      l,
      f,
      a,
      n,
      u
    ), An = null, (l & 335544064) === l ? (jn = Bv(t), a = 10262) : (jn = null, a = 10256), (e.subtreeFlags & a) !== 0 || (e.flags & a) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, hg(Ju, function() {
      return Sr(), null;
    })) : (t.callbackNode = null, t.callbackPriority = 0), Qi = !1, a = (e.flags & 13878) !== 0, (e.subtreeFlags & 13878) !== 0 || a) {
      a = J.T, J.T = null, n = ct.p, ct.p = 2, u = Bt, Bt |= 4;
      try {
        tg(t, e, l);
      } finally {
        Bt = u, ct.p = n, J.T = a;
      }
    }
    ee = 1, Qi ? Cn = wg(
      i,
      t.containerInfo,
      jn,
      yr,
      br,
      fg,
      pr,
      Sr,
      rg
    ) : (yr(), br(), pr());
  }
  function rg(t) {
    if (ee !== 0) {
      var e = fl.onRecoverableError;
      e(t, { componentStack: null });
    }
  }
  function fg() {
    ee === 3 && (ee = 0, pm(Za, fl), ee = 4);
  }
  function yr() {
    if (ee === 1) {
      ee = 0;
      var t = fl, e = Za, l = xl, a = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || a) {
        a = J.T, J.T = null;
        var n = ct.p;
        ct.p = 2;
        var u = Bt;
        Bt |= 4;
        try {
          Tu = Ji = !1, ym(e, t, l), l = Rr;
          var i = ho(t.containerInfo), f = l.focusedElem, v = l.selectionRange;
          if (i !== f && f && f.ownerDocument && mo(
            f.ownerDocument.documentElement,
            f
          )) {
            if (v !== null && Kc(f)) {
              var T = v.start, z = v.end;
              if (z === void 0 && (z = T), "selectionStart" in f)
                f.selectionStart = T, f.selectionEnd = Math.min(
                  z,
                  f.value.length
                );
              else {
                var w = f.ownerDocument || document, S = w && w.defaultView || window;
                if (S.getSelection) {
                  var M = S.getSelection(), V = f.textContent.length, tt = Math.min(v.start, V), bt = v.end === void 0 ? tt : Math.min(v.end, V);
                  !M.extend && tt > bt && (i = bt, bt = tt, tt = i);
                  var E = oo(
                    f,
                    tt
                  ), y = oo(
                    f,
                    bt
                  );
                  if (E && y && (M.rangeCount !== 1 || M.anchorNode !== E.node || M.anchorOffset !== E.offset || M.focusNode !== y.node || M.focusOffset !== y.offset)) {
                    var x = w.createRange();
                    x.setStart(E.node, E.offset), M.removeAllRanges(), tt > bt ? (M.addRange(x), M.extend(y.node, y.offset)) : (x.setEnd(y.node, y.offset), M.addRange(x));
                  }
                }
              }
            }
            for (w = [], M = f; M = M.parentNode; )
              M.nodeType === 1 && w.push({
                element: M,
                left: M.scrollLeft,
                top: M.scrollTop
              });
            for (typeof f.focus == "function" && f.focus(), f = 0; f < w.length; f++) {
              var D = w[f];
              D.element.scrollLeft = D.left, D.element.scrollTop = D.top;
            }
          }
          Xn = !!jr, Rr = jr = null;
        } finally {
          Bt = u, ct.p = n, J.T = a;
        }
      }
      t.current = e, ee = 2;
    }
  }
  function br() {
    if (ee === 2) {
      ee = 0;
      var t = fl, e = Za, l = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || l) {
        l = J.T, J.T = null;
        var a = ct.p;
        ct.p = 2;
        var n = Bt;
        Bt |= 4;
        try {
          om(t, e.alternate, e);
        } finally {
          Bt = n, ct.p = a, J.T = l;
        }
      }
      ee = 3;
    }
  }
  function pr() {
    if (ee === 4 || ee === 3) {
      ee = 0;
      var t = Cn;
      Cn = null, Mt();
      var e = fl, l = Za, a = xl, n = Mm, u = (a & 335544064) === a ? 10262 : 10256;
      if ((l.subtreeFlags & u) !== 0 || (l.flags & u) !== 0 ? ee = 5 : (ee = 0, Za = fl = null, Lm(e, e.pendingLanes)), u = e.pendingLanes, u === 0 && (ra = null), zc(a), l = l.stateNode, Ye && typeof Ye.onCommitFiberRoot == "function")
        try {
          Ye.onCommitFiberRoot(
            Kn,
            l,
            void 0,
            (l.current.flags & 128) === 128
          );
        } catch {
        }
      if (n !== null) {
        l = J.T, u = ct.p, ct.p = 2, J.T = null;
        try {
          for (var i = e.onRecoverableError, f = 0; f < n.length; f++) {
            var v = n[f];
            i(v.value, {
              componentStack: v.stack
            });
          }
        } finally {
          J.T = l, ct.p = u;
        }
      }
      if (n = An, i = jn, jn = null, n !== null && (An = null, i === null && (i = []), t !== null))
        for (v = 0; v < n.length; v++)
          l = (0, n[v])(
            i
          ), l !== void 0 && t.finished.finally(l);
      (xl & 3) !== 0 && uc(), Ml(e), u = e.pendingLanes, (a & 261930) !== 0 && (u & 42) !== 0 ? e === ec ? Ou++ : (Ou = 0, ec = e) : (Ou = 0, ec = null), zu(0);
    }
  }
  function Lm(t, e) {
    (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, su(e)));
  }
  function uc() {
    return Cn !== null && (Cn.skipTransition(), Cn = null), yr(), br(), pr(), Sr();
  }
  function Sr() {
    if (ee !== 5) return !1;
    var t = fl, e = mr;
    mr = 0;
    var l = zc(xl), a = J.T, n = ct.p;
    try {
      ct.p = 32 > l ? 32 : l, J.T = null, l = hr, hr = null;
      var u = fl, i = xl;
      if (ee = 0, Za = fl = null, xl = 0, (Bt & 6) !== 0) throw Error(s(331));
      var f = Bt;
      if (Bt |= 4, Tm(u.current), Sm(
        u,
        u.current,
        i,
        l
      ), Bt = f, zu(0, !1), Ye && typeof Ye.onPostCommitFiberRoot == "function")
        try {
          Ye.onPostCommitFiberRoot(Kn, u);
        } catch {
        }
      return !0;
    } finally {
      ct.p = n, J.T = a, Lm(t, e);
    }
  }
  function Ym(t, e, l) {
    e = Pe(l, e), e = Hs(t.stateNode, e, 2), t = ea(t, e, 2), t !== null && ($n(t, 2), Ml(t));
  }
  function Yt(t, e, l) {
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
          if (typeof e.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (ra === null || !ra.has(a))) {
            t = Pe(l, t), l = Ud(2), a = ea(e, l, 2), a !== null && (Bd(
              l,
              a,
              e,
              t
            ), $n(a, 2), Ml(a));
            break;
          }
        }
        e = e.return;
      }
  }
  function _r(t, e, l) {
    var a = t.pingCache;
    if (a === null) {
      a = t.pingCache = new ag();
      var n = /* @__PURE__ */ new Set();
      a.set(e, n);
    } else
      n = a.get(e), n === void 0 && (n = /* @__PURE__ */ new Set(), a.set(e, n));
    n.has(l) || (or = !0, n.add(l), t = og.bind(null, t, e, l), e.then(t, t));
  }
  function og(t, e, l) {
    var a = t.pingCache;
    a !== null && a.delete(e), t.pingedLanes |= t.suspendedLanes & l, t.warmLanes &= ~l, Vt === t && (jt & l) === l && ((ne === 4 || ne === 3 && (jt & 62914560) === jt && 300 > Ot() - Ii) && (Bt & 2) === 0 ? Dn(t, 0) : Wi |= l, zn === jt && (zn = 0)), Ml(t);
  }
  function qm(t, e) {
    e === 0 && (e = Nf()), t = Ca(t, e), t !== null && ($n(t, e), Ml(t));
  }
  function dg(t) {
    var e = t.memoizedState, l = 0;
    e !== null && (l = e.retryLane), qm(t, l);
  }
  function mg(t, e) {
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
  function hg(t, e) {
    return ie(t, e);
  }
  var Un = null, Bn = null, Er = !1, ic = !1, Tr = !1, oa = 0;
  function Ml(t) {
    t !== Bn && t.next === null && (Bn === null ? Un = Bn = t : Bn = Bn.next = t), ic = !0, Er || (Er = !0, gg());
  }
  function zu(t, e) {
    if (!Tr && ic) {
      Tr = !0;
      do
        for (var l = !1, a = Un; a !== null; ) {
          if (t !== 0) {
            var n = a.pendingLanes;
            if (n === 0) var u = 0;
            else {
              var i = a.suspendedLanes, f = a.pingedLanes;
              u = (1 << 31 - qe(42 | t) + 1) - 1, u &= n & ~(i & ~f), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (l = !0, Qm(a, u));
          } else
            u = jt, u = Wu(
              a,
              a === Vt ? u : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (u & 3) === 0 || Jn(a, u) || (l = !0, Qm(a, u));
          a = a.next;
        }
      while (l);
      Tr = !1;
    }
  }
  function vg() {
    Gm();
  }
  function Gm() {
    ic = Er = !1;
    var t = 0;
    oa !== 0 && Og() && (t = oa);
    for (var e = Ot(), l = null, a = Un; a !== null; ) {
      var n = a.next, u = Xm(a, e);
      u === 0 ? (a.next = null, l === null ? Un = n : l.next = n, n === null && (Bn = l)) : (l = a, (t !== 0 || (u & 3) !== 0) && (ic = !0)), a = n;
    }
    ee !== 0 && ee !== 5 || zu(t), oa !== 0 && (oa = 0);
  }
  function Xm(t, e) {
    for (var l = t.suspendedLanes, a = t.pingedLanes, n = t.expirationTimes, u = t.pendingLanes & -62914561; 0 < u; ) {
      var i = 31 - qe(u), f = 1 << i, v = n[i];
      v === -1 ? ((f & l) === 0 || (f & a) !== 0) && (n[i] = D0(f, e)) : v <= e && (t.expiredLanes |= f), u &= ~f;
    }
    if (e = Vt, l = jt, l = Wu(
      t,
      t === e ? l : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a = t.callbackNode, l === 0 || t === e && (Lt === 2 || Lt === 9) || t.cancelPendingCommit !== null)
      return a !== null && a !== null && O(a), t.callbackNode = null, t.callbackPriority = 0;
    if ((l & 3) === 0 || Jn(t, l)) {
      if (e = l & -l, e === t.callbackPriority) return e;
      switch (a !== null && O(a), zc(l)) {
        case 2:
        case 8:
          l = Pa;
          break;
        case 32:
          l = Ju;
          break;
        case 268435456:
          l = Ef;
          break;
        default:
          l = Ju;
      }
      return a = Vm.bind(null, t), l = ie(l, a), t.callbackPriority = e, t.callbackNode = l, e;
    }
    return a !== null && a !== null && O(a), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function Vm(t, e) {
    if (ee !== 0 && ee !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var l = t.callbackNode;
    if (uc() && t.callbackNode !== l)
      return null;
    var a = jt;
    return a = Wu(
      t,
      t === Vt ? a : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a === 0 ? null : (zm(t, a, e), Xm(t, Ot()), t.callbackNode != null && t.callbackNode === l ? Vm.bind(null, t) : null);
  }
  function Qm(t, e) {
    if (uc()) return null;
    zm(t, e, !0);
  }
  function gg() {
    Cg(function() {
      (Bt & 6) !== 0 ? ie(
        Ql,
        vg
      ) : Gm();
    });
  }
  function Nr() {
    if (oa === 0) {
      var t = Ua;
      t === 0 && (t = $u, $u <<= 1, ($u & 261888) === 0 && ($u = 256)), oa = t;
    }
    return oa;
  }
  function Zm(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : li(t);
  }
  function yg(t, e, l, a, n) {
    if (e === "submit" && l && l.stateNode === n) {
      var u = Zm(
        (n[De] || null).action
      ), i = a.submitter;
      i && (e = (e = i[De] || null) ? Zm(e.formAction) : i.getAttribute("formAction"), e !== null && (u = e, i = null));
      var f = new ii(
        "action",
        "action",
        null,
        a,
        n
      );
      t.push({
        event: f,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (a.defaultPrevented) {
                if (oa !== 0) {
                  var v = new FormData(n, i);
                  Rs(
                    l,
                    {
                      pending: !0,
                      data: v,
                      method: n.method,
                      action: u
                    },
                    null,
                    v
                  );
                }
              } else
                typeof u == "function" && (f.preventDefault(), v = new FormData(n, i), Rs(
                  l,
                  {
                    pending: !0,
                    data: v,
                    method: n.method,
                    action: u
                  },
                  u,
                  v
                ));
            },
            currentTarget: n
          }
        ]
      });
    }
  }
  for (var xr = 0; xr < Fc.length; xr++) {
    var Mr = Fc[xr], bg = Mr.toLowerCase(), pg = Mr[0].toUpperCase() + Mr.slice(1);
    il(
      bg,
      "on" + pg
    );
  }
  il(yo, "onAnimationEnd"), il(bo, "onAnimationIteration"), il(po, "onAnimationStart"), il("dblclick", "onDoubleClick"), il("focusin", "onFocus"), il("focusout", "onBlur"), il(zv, "onTransitionRun"), il(Cv, "onTransitionStart"), il(Av, "onTransitionCancel"), il(So, "onTransitionEnd"), an("onMouseEnter", ["mouseout", "mouseover"]), an("onMouseLeave", ["mouseout", "mouseover"]), an("onPointerEnter", ["pointerout", "pointerover"]), an("onPointerLeave", ["pointerout", "pointerover"]), Ma(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Ma(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Ma("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Ma(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Ma(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Ma(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Cu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Sg = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Cu)
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
            var f = a[i], v = f.instance, T = f.currentTarget;
            if (f = f.listener, v !== u && n.isPropagationStopped())
              break t;
            u = f, n.currentTarget = T;
            try {
              u(n);
            } catch (z) {
              ri(z);
            }
            n.currentTarget = null, u = v;
          }
        else
          for (i = 0; i < a.length; i++) {
            if (f = a[i], v = f.instance, T = f.currentTarget, f = f.listener, v !== u && n.isPropagationStopped())
              break t;
            u = f, n.currentTarget = T;
            try {
              u(n);
            } catch (z) {
              ri(z);
            }
            n.currentTarget = null, u = v;
          }
      }
    }
  }
  function Ct(t, e) {
    var l = e[Af];
    l === void 0 && (l = e[Af] = /* @__PURE__ */ new Set());
    var a = t + "__bubble";
    l.has(a) || (Jm(e, t, 2, !1), l.add(a));
  }
  function Or(t, e, l) {
    var a = 0;
    e && (a |= 4), Jm(
      l,
      t,
      a,
      e
    );
  }
  var cc = "_reactListening" + Math.random().toString(36).slice(2);
  function zr(t) {
    if (!t[cc]) {
      t[cc] = !0, Df.forEach(function(l) {
        l !== "selectionchange" && (Sg.has(l) || Or(l, !1, t), Or(l, !0, t));
      });
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[cc] || (e[cc] = !0, Or("selectionchange", !1, e));
    }
  }
  function Jm(t, e, l, a) {
    switch (Bh(e)) {
      case 2:
        var n = dy;
        break;
      case 8:
        n = my;
        break;
      default:
        n = $r;
    }
    l = n.bind(
      null,
      e,
      l,
      t
    ), n = void 0, !Bc || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (n = !0), a ? n !== void 0 ? t.addEventListener(e, l, {
      capture: !0,
      passive: n
    }) : t.addEventListener(e, l, !0) : n !== void 0 ? t.addEventListener(e, l, {
      passive: n
    }) : t.addEventListener(e, l, !1);
  }
  function Cr(t, e, l, a, n) {
    var u = a;
    if ((e & 1) === 0 && (e & 2) === 0 && a !== null)
      t: for (; ; ) {
        if (a === null) return;
        var i = a.tag;
        if (i === 3 || i === 4) {
          var f = a.stateNode.containerInfo;
          if (f === n) break;
          if (i === 4)
            for (i = a.return; i !== null; ) {
              var v = i.tag;
              if ((v === 3 || v === 4) && i.stateNode.containerInfo === n)
                return;
              i = i.return;
            }
          for (; f !== null; ) {
            if (i = xa(f), i === null) return;
            if (v = i.tag, v === 5 || v === 6 || v === 26 || v === 27) {
              a = u = i;
              continue t;
            }
            f = f.parentNode;
          }
        }
        a = a.return;
      }
    Kf(function() {
      var T = u, z = wc(l), w = [];
      t: {
        var S = _o.get(t);
        if (S !== void 0) {
          var M = ii, V = t;
          switch (t) {
            case "keypress":
              if (ni(l) === 0) break t;
            case "keydown":
            case "keyup":
              M = nv;
              break;
            case "focusin":
              V = "focus", M = qc;
              break;
            case "focusout":
              V = "blur", M = qc;
              break;
            case "beforeblur":
            case "afterblur":
              M = qc;
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
              M = kf;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              M = K0;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              M = rv;
              break;
            case yo:
            case bo:
            case po:
              M = k0;
              break;
            case So:
              M = ov;
              break;
            case "scroll":
            case "scrollend":
              M = Q0;
              break;
            case "wheel":
              M = mv;
              break;
            case "copy":
            case "cut":
            case "paste":
              M = W0;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              M = Wf;
              break;
            case "submit":
              M = cv;
              break;
            case "toggle":
            case "beforetoggle":
              M = vv;
          }
          var tt = (e & 4) !== 0, bt = !tt && (t === "scroll" || t === "scrollend"), E = tt ? S !== null ? S + "Capture" : null : S;
          tt = [];
          for (var y = T, x; y !== null; ) {
            var D = y;
            if (x = D.stateNode, D = D.tag, D !== 5 && D !== 26 && D !== 27 || x === null || E === null || (D = Wn(y, E), D != null && tt.push(
              Au(y, D, x)
            )), bt) break;
            y = y.return;
          }
          0 < tt.length && (S = new M(
            S,
            V,
            null,
            l,
            z
          ), w.push({ event: S, listeners: tt }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (M = t === "mouseover" || t === "pointerover", S = t === "mouseout" || t === "pointerout", M && l !== Dc && (V = l.relatedTarget || l.fromElement) && (xa(V) || V[tn]))
            break t;
          (S || M) && (V = z.window === z ? z : (M = z.ownerDocument) ? M.defaultView || M.parentWindow : window, S ? (M = l.relatedTarget || l.toElement, S = T, M = M ? xa(M) : null, M !== null && (bt = m(M), tt = M.tag, M !== bt || tt !== 5 && tt !== 27 && tt !== 6) && (M = null)) : (S = null, M = T), S !== M && (tt = kf, D = "onMouseLeave", E = "onMouseEnter", y = "mouse", (t === "pointerout" || t === "pointerover") && (tt = Wf, D = "onPointerLeave", E = "onPointerEnter", y = "pointer"), bt = S == null ? V : Fn(S), x = M == null ? V : Fn(M), V = new tt(
            D,
            y + "leave",
            S,
            l,
            z
          ), V.target = bt, V.relatedTarget = x, D = null, xa(z) === T && (tt = new tt(
            E,
            y + "enter",
            M,
            l,
            z
          ), tt.target = x, tt.relatedTarget = bt, D = tt), bt = D, tt = S && M ? At(
            S,
            M,
            _g
          ) : null, S !== null && $m(
            w,
            V,
            S,
            tt,
            !1
          ), M !== null && bt !== null && $m(
            w,
            bt,
            M,
            tt,
            !0
          )));
        }
        t: {
          if (S = T ? Fn(T) : window, M = S.nodeName && S.nodeName.toLowerCase(), M === "select" || M === "input" && S.type === "file")
            var W = uo;
          else if (ao(S))
            if (io)
              W = xv;
            else {
              W = Tv;
              var Rt = Ev;
            }
          else
            M = S.nodeName, !M || M.toLowerCase() !== "input" || S.type !== "checkbox" && S.type !== "radio" ? T && Rc(T.elementType) && (W = uo) : W = Nv;
          if (W && (W = W(t, T))) {
            no(
              w,
              W,
              l,
              z
            );
            break t;
          }
          Rt && Rt(t, S, T);
        }
        switch (Rt = T ? Fn(T) : window, t) {
          case "focusin":
            (ao(Rt) || Rt.contentEditable === "true") && (fn = Rt, Jc = T, uu = null);
            break;
          case "focusout":
            uu = Jc = fn = null;
            break;
          case "mousedown":
            $c = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            $c = !1, vo(w, l, z);
            break;
          case "selectionchange":
            if (Ov) break;
          case "keydown":
          case "keyup":
            vo(w, l, z);
        }
        var ut;
        if (Xc)
          t: {
            switch (t) {
              case "compositionstart":
                var rt = "onCompositionStart";
                break t;
              case "compositionend":
                rt = "onCompositionEnd";
                break t;
              case "compositionupdate":
                rt = "onCompositionUpdate";
                break t;
            }
            rt = void 0;
          }
        else
          rn ? eo(t, l) && (rt = "onCompositionEnd") : t === "keydown" && l.keyCode === 229 && (rt = "onCompositionStart");
        rt && (If && l.locale !== "ko" && (rn || rt !== "onCompositionStart" ? rt === "onCompositionEnd" && rn && (ut = Jf()) : (Kl = z, Hc = "value" in Kl ? Kl.value : Kl.textContent, rn = !0)), Rt = sc(T, rt), 0 < Rt.length && (rt = new Ff(
          rt,
          t,
          null,
          l,
          z
        ), w.push({ event: rt, listeners: Rt }), ut ? rt.data = ut : (ut = lo(l), ut !== null && (rt.data = ut)))), (ut = yv ? bv(t, l) : pv(t, l)) && (rt = sc(T, "onBeforeInput"), 0 < rt.length && (Rt = new Ff(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          z
        ), w.push({
          event: Rt,
          listeners: rt
        }), Rt.data = ut)), yg(
          w,
          t,
          T,
          l,
          z
        );
      }
      Km(w, e);
    });
  }
  function Au(t, e, l) {
    return {
      instance: t,
      listener: e,
      currentTarget: l
    };
  }
  function sc(t, e) {
    for (var l = e + "Capture", a = []; t !== null; ) {
      var n = t, u = n.stateNode;
      if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || u === null || (n = Wn(t, l), n != null && a.unshift(
        Au(t, n, u)
      ), n = Wn(t, e), n != null && a.push(
        Au(t, n, u)
      )), t.tag === 3) return a;
      t = t.return;
    }
    return [];
  }
  function _g(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function $m(t, e, l, a, n) {
    for (var u = e._reactName, i = []; l !== null && l !== a; ) {
      var f = l, v = f.alternate, T = f.stateNode;
      if (f = f.tag, v !== null && v === a) break;
      f !== 5 && f !== 26 && f !== 27 || T === null || (v = T, n ? (T = Wn(l, u), T != null && i.unshift(
        Au(l, T, v)
      )) : n || (T = Wn(l, u), T != null && i.push(
        Au(l, T, v)
      ))), l = l.return;
    }
    i.length !== 0 && t.push({ event: e, listeners: i });
  }
  var Eg = /\r\n?/g, Tg = /\u0000|\uFFFD/g;
  function km(t) {
    return (typeof t == "string" ? t : "" + t).replace(Eg, `
`).replace(Tg, "");
  }
  function Fm(t, e) {
    return e = km(e), km(t) === e;
  }
  function qt(t, e, l, a, n, u) {
    switch (l) {
      case "children":
        if (typeof a == "string")
          e === "body" || e === "textarea" && a === "" || un(t, a);
        else if (typeof a == "number" || typeof a == "bigint")
          e !== "body" && un(t, "" + a);
        else return;
        break;
      case "className":
        ei(t, "class", a);
        break;
      case "tabIndex":
        ei(t, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        ei(t, l, a);
        break;
      case "style":
        Qf(t, a, u);
        return;
      case "data":
        if (e !== "object") {
          ei(t, "data", a);
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
        a = li(a), t.setAttribute(l, a);
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
          typeof u == "function" && (l === "formAction" ? (e !== "input" && qt(t, e, "name", n.name, n, null), qt(
            t,
            e,
            "formEncType",
            n.formEncType,
            n,
            null
          ), qt(
            t,
            e,
            "formMethod",
            n.formMethod,
            n,
            null
          ), qt(
            t,
            e,
            "formTarget",
            n.formTarget,
            n,
            null
          )) : (qt(t, e, "encType", n.encType, n, null), qt(t, e, "method", n.method, n, null), qt(t, e, "target", n.target, n, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          t.removeAttribute(l);
          break;
        }
        a = li(a), t.setAttribute(l, a);
        break;
      case "onClick":
        a != null && (t.onclick = gl);
        return;
      case "onScroll":
        a != null && Ct("scroll", t);
        return;
      case "onScrollEnd":
        a != null && Ct("scrollend", t);
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
        l = li(a), t.setAttributeNS(
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
        Ct("beforetoggle", t), Ct("toggle", t), ti(t, "popover", a);
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
        ti(t, "is", a);
        break;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N")
          l = X0.get(l) || l, ti(t, l, a);
        else return;
    }
    Ut = !0;
  }
  function Ar(t, e, l, a, n, u) {
    switch (l) {
      case "style":
        Qf(t, a, u);
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
        if (typeof a == "string") un(t, a);
        else if (typeof a == "number" || typeof a == "bigint")
          un(t, "" + a);
        else return;
        break;
      case "onScroll":
        a != null && Ct("scroll", t);
        return;
      case "onScrollEnd":
        a != null && Ct("scrollend", t);
        return;
      case "onClick":
        a != null && (t.onclick = gl);
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
        if (!wf.hasOwnProperty(l))
          t: {
            if (l[0] === "o" && l[1] === "n" && (n = l.endsWith("Capture"), u = l.slice(2, n ? l.length - 7 : void 0), e = t[De] || null, e = e != null ? e[l] : null, typeof e == "function" && t.removeEventListener(u, e, n), typeof a == "function")) {
              typeof e != "function" && e !== null && (l in t ? t[l] = null : t.hasAttribute(l) && t.removeAttribute(l)), t.addEventListener(u, a, n);
              break t;
            }
            Ut = !0, l in t ? t[l] = a : a === !0 ? t.setAttribute(l, "") : ti(t, l, a);
          }
        return;
    }
    Ut = !0;
  }
  function Ee(t, e, l) {
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
        Ct("error", t), Ct("load", t);
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
                  qt(t, e, u, i, l, null);
              }
          }
        n && qt(t, e, "srcSet", l.srcSet, l, null), a && qt(t, e, "src", l.src, l, null);
        return;
      case "input":
        Ct("invalid", t);
        var f = u = i = n = null, v = null, T = null;
        for (a in l)
          if (l.hasOwnProperty(a)) {
            var z = l[a];
            if (z != null)
              switch (a) {
                case "name":
                  n = z;
                  break;
                case "type":
                  i = z;
                  break;
                case "checked":
                  v = z;
                  break;
                case "defaultChecked":
                  T = z;
                  break;
                case "value":
                  u = z;
                  break;
                case "defaultValue":
                  f = z;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (z != null)
                    throw Error(s(137, e));
                  break;
                default:
                  qt(t, e, a, z, l, null);
              }
          }
        qf(
          t,
          u,
          f,
          v,
          T,
          i,
          n,
          !1
        );
        return;
      case "select":
        Ct("invalid", t), a = i = u = null;
        for (n in l)
          if (l.hasOwnProperty(n) && (f = l[n], f != null))
            switch (n) {
              case "value":
                u = f;
                break;
              case "defaultValue":
                i = f;
                break;
              case "multiple":
                a = f;
              default:
                qt(t, e, n, f, l, null);
            }
        e = u, l = i, t.multiple = !!a, e != null ? nn(t, !!a, e, !1) : l != null && nn(t, !!a, l, !0);
        return;
      case "textarea":
        Ct("invalid", t), u = n = a = null;
        for (i in l)
          if (l.hasOwnProperty(i) && (f = l[i], f != null))
            switch (i) {
              case "value":
                a = f;
                break;
              case "defaultValue":
                n = f;
                break;
              case "children":
                u = f;
                break;
              case "dangerouslySetInnerHTML":
                if (f != null) throw Error(s(91));
                break;
              default:
                qt(t, e, i, f, l, null);
            }
        Xf(t, a, n, u);
        return;
      case "option":
        for (v in l)
          l.hasOwnProperty(v) && (a = l[v], a != null) && (v === "selected" ? t.selected = a && typeof a != "function" && typeof a != "symbol" : qt(t, e, v, a, l, null));
        return;
      case "dialog":
        Ct("beforetoggle", t), Ct("toggle", t), Ct("cancel", t), Ct("close", t);
        break;
      case "iframe":
      case "object":
        Ct("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < Cu.length; a++)
          Ct(Cu[a], t);
        break;
      case "image":
        Ct("error", t), Ct("load", t);
        break;
      case "details":
        Ct("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        Ct("error", t), Ct("load", t);
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
        for (T in l)
          if (l.hasOwnProperty(T) && (a = l[T], a != null))
            switch (T) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(s(137, e));
              default:
                qt(t, e, T, a, l, null);
            }
        return;
      default:
        if (Rc(e)) {
          for (z in l)
            l.hasOwnProperty(z) && (a = l[z], a !== void 0 && Ar(
              t,
              e,
              z,
              a,
              l,
              void 0
            ));
          return;
        }
    }
    for (f in l)
      l.hasOwnProperty(f) && (a = l[f], a != null && qt(t, e, f, a, l, null));
  }
  var Ng = {};
  function xg(t, e, l, a) {
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
        var n = null, u = null, i = null, f = null, v = null, T = null, z = null;
        for (M in l) {
          var w = l[M];
          if (l.hasOwnProperty(M) && w != null)
            switch (M) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                v = w;
              default:
                a.hasOwnProperty(M) || qt(t, e, M, null, a, w);
            }
        }
        for (var S in a) {
          var M = a[S];
          if (w = l[S], a.hasOwnProperty(S) && (M != null || w != null))
            switch (S) {
              case "type":
                M !== w && (Ut = !0), u = M;
                break;
              case "name":
                M !== w && (Ut = !0), n = M;
                break;
              case "checked":
                M !== w && (Ut = !0), T = M;
                break;
              case "defaultChecked":
                M !== w && (Ut = !0), z = M;
                break;
              case "value":
                M !== w && (Ut = !0), i = M;
                break;
              case "defaultValue":
                M !== w && (Ut = !0), f = M;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (M != null)
                  throw Error(s(137, e));
                break;
              default:
                M !== w && qt(
                  t,
                  e,
                  S,
                  M,
                  a,
                  w
                );
            }
        }
        Ac(
          t,
          i,
          f,
          v,
          T,
          z,
          u,
          n
        );
        return;
      case "select":
        M = i = f = S = null;
        for (u in l)
          if (v = l[u], l.hasOwnProperty(u) && v != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                M = v;
              default:
                a.hasOwnProperty(u) || qt(
                  t,
                  e,
                  u,
                  null,
                  a,
                  v
                );
            }
        for (n in a)
          if (u = a[n], v = l[n], a.hasOwnProperty(n) && (u != null || v != null))
            switch (n) {
              case "value":
                u !== v && (Ut = !0), S = u;
                break;
              case "defaultValue":
                u !== v && (Ut = !0), f = u;
                break;
              case "multiple":
                u !== v && (Ut = !0), i = u;
              default:
                u !== v && qt(
                  t,
                  e,
                  n,
                  u,
                  a,
                  v
                );
            }
        e = f, l = i, a = M, S != null ? nn(t, !!l, S, !1) : !!a != !!l && (e != null ? nn(t, !!l, e, !0) : nn(t, !!l, l ? [] : "", !1));
        return;
      case "textarea":
        M = S = null;
        for (f in l)
          if (n = l[f], l.hasOwnProperty(f) && n != null && !a.hasOwnProperty(f))
            switch (f) {
              case "value":
                break;
              case "children":
                break;
              default:
                qt(t, e, f, null, a, n);
            }
        for (i in a)
          if (n = a[i], u = l[i], a.hasOwnProperty(i) && (n != null || u != null))
            switch (i) {
              case "value":
                n !== u && (Ut = !0), S = n;
                break;
              case "defaultValue":
                n !== u && (Ut = !0), M = n;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (n != null) throw Error(s(91));
                break;
              default:
                n !== u && qt(t, e, i, n, a, u);
            }
        Gf(t, S, M);
        return;
      case "option":
        for (var V in l)
          S = l[V], l.hasOwnProperty(V) && S != null && !a.hasOwnProperty(V) && (V === "selected" ? t.selected = !1 : qt(
            t,
            e,
            V,
            null,
            a,
            S
          ));
        for (v in a)
          S = a[v], M = l[v], a.hasOwnProperty(v) && S !== M && (S != null || M != null) && (v === "selected" ? (S !== M && (Ut = !0), t.selected = S && typeof S != "function" && typeof S != "symbol") : qt(
            t,
            e,
            v,
            S,
            a,
            M
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
        for (var tt in l)
          S = l[tt], l.hasOwnProperty(tt) && S != null && !a.hasOwnProperty(tt) && qt(t, e, tt, null, a, S);
        for (T in a)
          if (S = a[T], M = l[T], a.hasOwnProperty(T) && S !== M && (S != null || M != null))
            switch (T) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (S != null)
                  throw Error(s(137, e));
                break;
              default:
                qt(
                  t,
                  e,
                  T,
                  S,
                  a,
                  M
                );
            }
        return;
      default:
        if (Rc(e)) {
          for (var bt in l)
            S = l[bt], l.hasOwnProperty(bt) && S !== void 0 && !a.hasOwnProperty(bt) && Ar(
              t,
              e,
              bt,
              void 0,
              a,
              S
            );
          for (z in a)
            S = a[z], M = l[z], !a.hasOwnProperty(z) || S === M || S === void 0 && M === void 0 || Ar(
              t,
              e,
              z,
              S,
              a,
              M
            );
          return;
        }
    }
    for (var E in l)
      S = l[E], l.hasOwnProperty(E) && S != null && !a.hasOwnProperty(E) && qt(t, e, E, null, a, S);
    for (w in a)
      S = a[w], M = l[w], !a.hasOwnProperty(w) || S === M || S == null && M == null || qt(t, e, w, S, a, M);
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
  function Mg() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, e = 0, l = performance.getEntriesByType("resource"), a = 0; a < l.length; a++) {
        var n = l[a], u = n.transferSize, i = n.initiatorType, f = n.duration;
        if (u && f && Wm(i)) {
          for (i = 0, f = n.responseEnd, a += 1; a < l.length; a++) {
            var v = l[a], T = v.startTime;
            if (T > f) break;
            var z = v.transferSize, w = v.initiatorType;
            z && Wm(w) && (v = v.responseEnd, i += z * (v < f ? 1 : (f - T) / (v - T)));
          }
          if (--a, e += 8 * (u + i) / (n.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var jr = null, Rr = null;
  function ju(t) {
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
    return l = ju(
      l
    ).createElement(t), l[ye] = a, l[De] = e, Ee(l, t, e), me(l), l;
  }
  function Dr(t, e) {
    return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.children == "bigint" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
  }
  var wr = null;
  function Og() {
    var t = window.event;
    return t && t.type === "popstate" ? t === wr ? !1 : (wr = t, !0) : (wr = null, !1);
  }
  var Ur = typeof setTimeout == "function" ? setTimeout : void 0, zg = typeof clearTimeout == "function" ? clearTimeout : void 0, eh = typeof Promise == "function" ? Promise : void 0, lh = typeof requestAnimationFrame == "function" ? requestAnimationFrame : Ur, Cg = typeof queueMicrotask == "function" ? queueMicrotask : typeof eh < "u" ? function(t) {
    return eh.resolve(null).then(t).catch(Ag);
  } : Ur;
  function Ag(t) {
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
            t.removeChild(n), Vn(e);
            return;
          }
          a--;
        } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&")
          a++;
        else if (l === "html")
          Vr(
            t.ownerDocument.documentElement
          );
        else if (l === "head") {
          l = t.ownerDocument.head, Vr(l);
          for (var u = l.firstChild; u; ) {
            var i = u.nextSibling, f = u.nodeName;
            u[kn] || f === "SCRIPT" || f === "STYLE" || f === "LINK" && u.rel.toLowerCase() === "stylesheet" || l.removeChild(u), u = i;
          }
        } else
          l === "body" && Vr(t.ownerDocument.body);
      l = n;
    } while (l);
    Vn(e);
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
  function jg(t, e, l) {
    return l = l.ownerDocument.defaultView, {
      rect: t,
      abs: e.position === "absolute" || e.position === "fixed",
      clip: e.clipPath !== "none" || e.overflow !== "visible" || e.filter !== "none" || e.mask !== "none" || e.mask !== "none" || e.borderRadius !== "0px",
      view: 0 <= t.bottom && 0 <= t.right && t.top <= l.innerHeight && t.left <= l.innerWidth
    };
  }
  function Br(t) {
    var e = t.getBoundingClientRect(), l = getComputedStyle(t);
    return jg(e, l, t);
  }
  function Rg(t) {
    return t.documentElement.clientHeight;
  }
  function Dg(t) {
    this.addEventListener("load", t), this.addEventListener("error", t);
  }
  function wg(t, e, l, a, n, u, i, f, v) {
    var T = e.nodeType === 9 ? e : e.ownerDocument;
    try {
      var z = T.startViewTransition({
        update: function() {
          var S = T.defaultView, M = S.navigation && S.navigation.transition, V = T.fonts.status;
          a();
          var tt = [];
          if (V === "loaded" && (Rg(T), T.fonts.status === "loading" && tt.push(T.fonts.ready)), V = tt.length, t !== null)
            for (var bt = t.suspenseyImages, E = 0, y = 0; y < bt.length; y++) {
              var x = bt[y];
              if (!x.complete) {
                var D = x.getBoundingClientRect();
                if (0 < D.bottom && 0 < D.right && D.top < S.innerHeight && D.left < S.innerWidth) {
                  if (E += Oh(x), E > oc) {
                    tt.length = V;
                    break;
                  }
                  x = new Promise(
                    Dg.bind(x)
                  ), tt.push(x);
                }
              }
            }
          if (0 < tt.length)
            return S = Promise.race([
              Promise.all(tt),
              new Promise(function(W) {
                return setTimeout(W, 500);
              })
            ]).then(n, n), (M ? Promise.allSettled([M.finished, S]) : S).then(u, u);
          if (n(), M)
            return M.finished.then(
              u,
              u
            );
          u();
        },
        types: l
      });
      T.__reactViewTransition = z;
      var w = [];
      return z.ready.then(
        function() {
          for (var S = T.documentElement.getAnimations({
            subtree: !0
          }), M = 0; M < S.length; M++) {
            var V = S[M], tt = V.effect, bt = tt.pseudoElement;
            if (bt != null && bt.startsWith("::view-transition")) {
              w.push(V), V = tt.getKeyframes();
              for (var E = bt = void 0, y = !0, x = 0; x < V.length; x++) {
                var D = V[x], W = D.width;
                if (bt === void 0) bt = W;
                else if (bt !== W) {
                  y = !1;
                  break;
                }
                if (W = D.height, E === void 0) E = W;
                else if (E !== W) {
                  y = !1;
                  break;
                }
                delete D.width, delete D.height, D.transform === "none" && delete D.transform;
              }
              y && bt !== void 0 && E !== void 0 && (tt.setKeyframes(V), y = getComputedStyle(
                tt.target,
                tt.pseudoElement
              ), y.width !== bt || y.height !== E) && (y = V[0], y.width = bt, y.height = E, y = V[V.length - 1], y.width = bt, y.height = E, tt.setKeyframes(V));
            }
          }
          i();
        },
        function(S) {
          T.__reactViewTransition === z && (T.__reactViewTransition = null);
          try {
            typeof S == "object" && S !== null && S.name === "InvalidStateError" && (S.message === "View transition was skipped because document visibility state is hidden." || S.message === "Skipping view transition because document visibility state has become hidden." || S.message === "Skipping view transition because viewport size changed." || S.message === "Transition was aborted because of invalid state") && (S = null), S !== null && v(S);
          } finally {
            a(), n(), i();
          }
        }
      ), z.finished.finally(function() {
        for (var S = 0; S < w.length; S++)
          w[S].cancel();
        T.__reactViewTransition === z && (T.__reactViewTransition = null), f();
      }), z;
    } catch {
      return a(), n(), i(), null;
    }
  }
  function Ka(t, e) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + t + "(" + e + ")";
  }
  Ka.prototype.animate = function(t, e) {
    return e = typeof e == "number" ? { duration: e } : K({}, e), e.pseudoElement = this._selector, this._scope.animate(t, e);
  }, Ka.prototype.getAnimations = function() {
    for (var t = this._scope, e = this._selector, l = t.getAnimations({ subtree: !0 }), a = [], n = 0; n < l.length; n++) {
      var u = l[n].effect;
      u !== null && u.target === t && u.pseudoElement === e && a.push(l[n]);
    }
    return a;
  }, Ka.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function ch(t) {
    return {
      name: t,
      group: new Ka("group", t),
      imagePair: new Ka("image-pair", t),
      old: new Ka("old", t),
      new: new Ka("new", t)
    };
  }
  function $e(t) {
    this._fragmentFiber = t, this._observers = this._eventListeners = null;
  }
  $e.prototype.addEventListener = function(t, e, l) {
    var a = null, n = null;
    if (!(l != null && typeof l != "boolean" && (a = l.signal || null, a !== null && a.aborted))) {
      this._eventListeners === null && (this._eventListeners = []);
      var u = this._eventListeners;
      if (rh(u, t, e, l) === -1) {
        var i = this, f = e;
        l != null && typeof l != "boolean" && l.once === !0 && (f = function(v) {
          i.removeEventListener(
            t,
            e,
            l
          ), typeof e == "function" ? e.call(this, v) : e.handleEvent(v);
        }), a !== null && (n = i.removeEventListener.bind(
          i,
          t,
          e,
          l
        ), a.addEventListener("abort", n, { once: !0 }), n = a.removeEventListener.bind(a, "abort", n)), a = Hn(l), u.push({
          type: t,
          listener: e,
          optionsOrUseCapture: l,
          attachedListener: f,
          cleanup: n
        }), g(
          this._fragmentFiber.child,
          !1,
          Ug,
          t,
          f,
          a
        );
      }
      this._eventListeners = u;
    }
  };
  function Ug(t, e, l, a) {
    return k(t).addEventListener(
      e,
      l,
      a
    ), !1;
  }
  $e.prototype.removeEventListener = function(t, e, l) {
    var a = this._eventListeners;
    if (a !== null && (e = rh(
      a,
      t,
      e,
      l
    ), e !== -1)) {
      var n = a[e];
      l = n.attachedListener;
      var u = n.cleanup;
      n = Hn(n.optionsOrUseCapture), g(
        this._fragmentFiber.child,
        !1,
        Bg,
        t,
        l,
        n
      ), a.splice(e, 1), u !== null && u();
    }
  };
  function Bg(t, e, l, a) {
    return k(t).removeEventListener(
      e,
      l,
      a
    ), !1;
  }
  function Hn(t) {
    return t != null && typeof t != "boolean" && (t.once === !0 || t.signal instanceof AbortSignal) ? { capture: t.capture, passive: t.passive } : t;
  }
  function sh(t) {
    return t == null ? "c=0" : typeof t == "boolean" ? "c=" + (t ? "1" : "0") : "c=" + (t.capture ? "1" : "0");
  }
  function rh(t, e, l, a) {
    if (t.length === 0) return -1;
    a = sh(a);
    for (var n = 0; n < t.length; n++) {
      var u = t[n];
      if (u.type === e && u.listener === l && sh(u.optionsOrUseCapture) === a)
        return n;
    }
    return -1;
  }
  $e.prototype.dispatchEvent = function(t) {
    var e = j(
      this._fragmentFiber
    );
    if (e === null) return !0;
    e = k(e);
    var l = this._eventListeners;
    if (l !== null && 0 < l.length || !t.bubbles) {
      var a = e.nodeType === 9 ? e.createComment("") : document.createTextNode("");
      if (l)
        for (var n = 0; n < l.length; n++) {
          var u = l[n];
          a.addEventListener(
            u.type,
            u.attachedListener,
            Hn(u.optionsOrUseCapture)
          );
        }
      if (e.appendChild(a), t = a.dispatchEvent(t), l)
        for (n = 0; n < l.length; n++)
          u = l[n], a.removeEventListener(
            u.type,
            u.attachedListener,
            Hn(u.optionsOrUseCapture)
          );
      return e.removeChild(a), t;
    }
    return e.dispatchEvent(t);
  }, $e.prototype.focus = function(t) {
    g(
      this._fragmentFiber.child,
      !0,
      fh,
      t,
      void 0,
      void 0
    );
  };
  function fh(t, e) {
    return t.tag === 6 ? !1 : (t = k(t), $g(t, e));
  }
  $e.prototype.focusLast = function(t) {
    var e = [];
    g(
      this._fragmentFiber.child,
      !0,
      Hr,
      e,
      void 0,
      void 0
    );
    for (var l = e.length - 1; 0 <= l && !fh(e[l], t); l--) ;
  };
  function Hr(t, e) {
    return e.push(t), !1;
  }
  $e.prototype.blur = function() {
    var t = j(
      this._fragmentFiber
    );
    t !== null && (t = k(t), t = ju(t).activeElement, t !== null && g(
      this._fragmentFiber.child,
      !1,
      Hg,
      t,
      void 0,
      void 0
    ));
  };
  function Hg(t, e) {
    return t.tag === 6 ? !1 : (t = k(t), t === e || t.contains(e) ? (e.blur(), !0) : !1);
  }
  $e.prototype.observeUsing = function(t) {
    this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(t), g(
      this._fragmentFiber.child,
      !1,
      Lg,
      t,
      void 0,
      void 0
    );
  };
  function Lg(t, e) {
    return t.tag === 6 || (t = k(t), e.observe(t)), !1;
  }
  $e.prototype.unobserveUsing = function(t) {
    var e = this._observers;
    if (e !== null && e.has(t)) {
      e.delete(t), g(
        this._fragmentFiber.child,
        !1,
        Yg,
        t,
        void 0,
        void 0
      );
      for (var l = e = 0; l < ol.length; l++) {
        var a = ol[l];
        a.fragmentInstance === this && a.observer === t ? t.unobserve(a.instance) : ol[e++] = a;
      }
      ol.length = e;
    }
  };
  function Yg(t, e) {
    return t.tag === 6 || (t = k(t), e.unobserve(t)), !1;
  }
  var ol = [], Lr = !1;
  function qg(t, e, l) {
    ol.push({
      fragmentInstance: t,
      observer: e,
      instance: l
    }), Lr || (Lr = !0, kg(function() {
      Lr = !1;
      var a = ol;
      ol = [];
      for (var n = 0; n < a.length; n++) {
        var u = a[n];
        u.observer.unobserve(u.instance);
      }
    }));
  }
  $e.prototype.getClientRects = function() {
    var t = [];
    return g(
      this._fragmentFiber.child,
      !1,
      Gg,
      t,
      void 0,
      void 0
    ), t;
  };
  function Gg(t, e) {
    if (t.tag === 6) {
      t = t.stateNode;
      var l = t.ownerDocument.createRange();
      l.selectNodeContents(t), e.push.apply(e, l.getClientRects());
    } else
      t = k(t), e.push.apply(e, t.getClientRects());
    return !1;
  }
  $e.prototype.getRootNode = function(t) {
    var e = j(
      this._fragmentFiber
    );
    return e === null ? this : k(e).getRootNode(t);
  }, $e.prototype.compareDocumentPosition = function(t) {
    var e = j(
      this._fragmentFiber
    );
    if (e === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var l = [];
    g(
      this._fragmentFiber.child,
      !1,
      Hr,
      l,
      void 0,
      void 0
    );
    var a = k(e);
    if (l.length === 0) {
      if (l = a, B(this._fragmentFiber)) {
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
      return l === t ? n = Node.DOCUMENT_POSITION_CONTAINS : a & Node.DOCUMENT_POSITION_CONTAINED_BY && (l = Z(e)[1], l === null ? n = Node.DOCUMENT_POSITION_PRECEDING : (t = k(l).compareDocumentPosition(
        t
      ), n = t === 0 || t & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), n |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    e = k(l[0]), n = k(l[l.length - 1]);
    var u = B(this._fragmentFiber) ? e.parentElement : a;
    if (u == null)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    a = u.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_CONTAINED_BY, u = u.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var i = e.compareDocumentPosition(t), f = n.compareDocumentPosition(t), v = i & Node.DOCUMENT_POSITION_CONTAINED_BY || f & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return f = a && u && i & Node.DOCUMENT_POSITION_FOLLOWING && f & Node.DOCUMENT_POSITION_PRECEDING, e = a && e === t || u && n === t || v || f ? Node.DOCUMENT_POSITION_CONTAINED_BY : !a && e === t || !u && n === t ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : i, e & Node.DOCUMENT_POSITION_DISCONNECTED || e & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || Xg(
      e,
      this._fragmentFiber,
      l[0],
      l[l.length - 1],
      t
    ) ? e : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function Xg(t, e, l, a, n) {
    var u = xa(n);
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
        for (u = e, e = j(e); u !== null; ) {
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
    return t & Node.DOCUMENT_POSITION_PRECEDING ? ((e = !!u) && !(e = u === l) && (e = At(
      l,
      u,
      Et
    ), e === null ? e = !1 : (g(
      e,
      !0,
      X,
      u,
      l
    ), u = mt, mt = null, e = u !== null)), e) : t & Node.DOCUMENT_POSITION_FOLLOWING ? ((e = !!u) && !(e = u === a) && (e = At(
      a,
      u,
      Et
    ), e === null ? e = !1 : (g(
      e,
      !0,
      Nt,
      u,
      a
    ), u = mt, Q = mt = null, e = u !== null)), e) : !1;
  }
  function oh(t, e) {
    var l = t.ownerDocument.createRange();
    l.selectNodeContents(t), t = l.getBoundingClientRect(), window.scrollTo(
      window.scrollX + t.left,
      e ? window.scrollY + t.top : window.scrollY + t.bottom - window.innerHeight
    );
  }
  $e.prototype.scrollIntoView = function(t) {
    if (typeof t == "object") throw Error(s(566));
    var e = [];
    g(
      this._fragmentFiber.child,
      !1,
      Hr,
      e,
      void 0,
      void 0
    );
    var l = t !== !1;
    if (e.length === 0) {
      var a = Z(
        this._fragmentFiber
      );
      if (a = l ? a[1] || a[0] || j(this._fragmentFiber) : a[0] || a[1], a === null) return;
      if (a.tag === 6) {
        t = k(a), oh(t, l);
        return;
      }
      if (a = k(a), a.nodeType !== 9) {
        if (a.nodeType === 11) {
          l = "host" in a ? a.host : null, l !== null && l.scrollIntoView(t);
          return;
        }
        a.scrollIntoView(t);
      }
    }
    for (a = l ? e.length - 1 : 0; a !== (l ? -1 : e.length); ) {
      var n = e[a];
      n.tag === 6 ? (n = k(n), oh(n, l)) : k(n).scrollIntoView(t), a += l ? -1 : 1;
    }
  };
  function Vg(t, e) {
    return t = k(t), dh(t, e), !1;
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
          Hn(n.optionsOrUseCapture)
        );
      }
    t.nodeType !== 3 && (l = e._observers, l !== null && l.forEach(function(u) {
      for (var i = 0, f = 0; f < ol.length; f++) {
        var v = ol[f];
        (v.fragmentInstance !== e || v.observer !== u || v.instance !== t) && (ol[i++] = v);
      }
      ol.length = i, u.observe(t);
    }), dh(t, e));
  }
  function Qg(t, e) {
    var l = e._eventListeners;
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var n = l[a];
        t.removeEventListener(
          n.type,
          n.attachedListener,
          Hn(n.optionsOrUseCapture)
        );
      }
    t.nodeType !== 3 && (l = e._observers, l !== null && l.forEach(function(u) {
      typeof u.rootMargin == "string" ? qg(
        e,
        u,
        t
      ) : u.unobserve(t);
    }), t.reactFragments != null && t.reactFragments.delete(e));
  }
  function Yr(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var l = e;
      switch (e = e.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Yr(l), Pu(l);
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
  function Zg(t, e, l, a) {
    for (; t.nodeType === 1; ) {
      var n = l;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!a && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (a) {
        if (!t[kn])
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
      if (t = nl(t.nextSibling), t === null) break;
    }
    return null;
  }
  function Kg(t, e, l) {
    if (e === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l || (t = nl(t.nextSibling), t === null)) return null;
    return t;
  }
  function hh(t, e) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = nl(t.nextSibling), t === null)) return null;
    return t;
  }
  function qr(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Gr(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function Jg(t, e) {
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
  function nl(t) {
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
  var Xr = null;
  function vh(t) {
    t = t.nextSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var l = t.data;
        if (l === "/$" || l === "/&") {
          if (e === 0)
            return nl(t.nextSibling);
          e--;
        } else
          l !== "$" && l !== "$!" && l !== "$?" && l !== "$~" && l !== "&" || e++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function gh(t) {
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
  function $g(t, e) {
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
  function kg(t) {
    lh(function() {
      lh(function(e) {
        return t(e);
      });
    });
  }
  function yh(t, e, l) {
    switch (e = ju(l), t) {
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
      l.hasOwnProperty(a) && n != null && qt(t, e, a, null, Ng, n);
    }
    l.dangerouslySetInnerHTML != null && (t.textContent = ""), t.onclick === gl && (t.onclick = null), Pu(t);
  }
  function Vr(t) {
    for (var e = t.attributes; e.length; )
      t.removeAttributeNode(e[0]);
    Pu(t);
  }
  var ul = /* @__PURE__ */ new Map(), ph = /* @__PURE__ */ new Set();
  function Ru(t) {
    if (typeof t.getRootNode == "function") {
      var e = t.getRootNode();
      if (e.nodeType === 9 || e.nodeType === 11) return e;
    }
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  var Xl = ct.d;
  ct.d = {
    f: Fg,
    r: Wg,
    D: Ig,
    C: Pg,
    L: ty,
    m: ey,
    X: ay,
    S: ly,
    M: ny
  };
  function Fg() {
    var t = Xl.f(), e = lc();
    return t || e;
  }
  function Wg(t) {
    var e = en(t);
    e !== null && e.tag === 5 && e.type === "form" ? _d(e) : Xl.r(t);
  }
  var Ln = typeof document > "u" ? null : document;
  function Sh(t, e, l) {
    var a = Ln;
    if (a && typeof e == "string" && e) {
      var n = We(e);
      n = 'link[rel="' + t + '"][href="' + n + '"]', typeof l == "string" && (n += '[crossorigin="' + l + '"]'), ph.has(n) || (ph.add(n), t = { rel: t, crossOrigin: l, href: e }, a.querySelector(n) === null && (e = a.createElement("link"), Ee(e, "link", t), me(e), a.head.appendChild(e)));
    }
  }
  function Ig(t) {
    Xl.D(t), Sh("dns-prefetch", t, null);
  }
  function Pg(t, e) {
    Xl.C(t, e), Sh("preconnect", t, e);
  }
  function ty(t, e, l) {
    Xl.L(t, e, l);
    var a = Ln;
    if (a && t && e) {
      var n = 'link[rel="preload"][as="' + We(e) + '"]';
      e === "image" && l && l.imageSrcSet ? (n += '[imagesrcset="' + We(
        l.imageSrcSet
      ) + '"]', typeof l.imageSizes == "string" && (n += '[imagesizes="' + We(
        l.imageSizes
      ) + '"]')) : n += '[href="' + We(t) + '"]';
      var u = n;
      switch (e) {
        case "style":
          u = Yn(t);
          break;
        case "script":
          u = qn(t);
      }
      if (!(ul.has(u) || (t = K(
        {
          rel: "preload",
          href: e === "image" && l && l.imageSrcSet ? void 0 : t,
          as: e
        },
        l
      ), ul.set(u, t), a.querySelector(n) !== null || e === "style" && a.querySelector(Du(u)) || e === "script" && a.querySelector(wu(u))))) {
        var i = a.createElement("link");
        Ee(i, "link", t), e === "style" && (i[Iu] = !0, i.onload = i.onerror = function() {
          Rf(i);
        }), me(i), a.head.appendChild(i);
      }
    }
  }
  function ey(t, e) {
    Xl.m(t, e);
    var l = Ln;
    if (l && t) {
      var a = e && typeof e.as == "string" ? e.as : "script", n = 'link[rel="modulepreload"][as="' + We(a) + '"][href="' + We(t) + '"]', u = n;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = qn(t);
      }
      if (!ul.has(u) && (t = K({ rel: "modulepreload", href: t }, e), ul.set(u, t), l.querySelector(n) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(wu(u)))
              return;
        }
        a = l.createElement("link"), Ee(a, "link", t), me(a), l.head.appendChild(a);
      }
    }
  }
  function ly(t, e, l) {
    Xl.S(t, e, l);
    var a = Ln;
    if (a && t) {
      var n = ln(a).hoistableStyles, u = Yn(t);
      e = e || "default";
      var i = n.get(u);
      if (!i) {
        var f = { loading: 0, preload: null };
        if (i = a.querySelector(
          Du(u)
        ))
          f.loading = 5;
        else {
          t = K(
            { rel: "stylesheet", href: t, "data-precedence": e },
            l
          ), (l = ul.get(u)) && Qr(t, l);
          var v = i = a.createElement("link");
          me(v), Ee(v, "link", t), v._p = new Promise(function(T, z) {
            v.onload = T, v.onerror = z;
          }), v.addEventListener("load", function() {
            f.loading |= 1;
          }), v.addEventListener("error", function() {
            f.loading |= 2;
          }), f.loading |= 4, rc(i, e, a);
        }
        i = {
          type: "stylesheet",
          instance: i,
          count: 1,
          state: f
        }, n.set(u, i);
      }
    }
  }
  function ay(t, e) {
    Xl.X(t, e);
    var l = Ln;
    if (l && t) {
      var a = ln(l).hoistableScripts, n = qn(t), u = a.get(n);
      u || (u = l.querySelector(wu(n)), u || (t = K({ src: t, async: !0 }, e), (e = ul.get(n)) && Zr(t, e), u = l.createElement("script"), me(u), Ee(u, "link", t), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function ny(t, e) {
    Xl.M(t, e);
    var l = Ln;
    if (l && t) {
      var a = ln(l).hoistableScripts, n = qn(t), u = a.get(n);
      u || (u = l.querySelector(wu(n)), u || (t = K({ src: t, async: !0, type: "module" }, e), (e = ul.get(n)) && Zr(t, e), u = l.createElement("script"), me(u), Ee(u, "link", t), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function _h(t, e, l, a) {
    var n = (n = st.current) ? Ru(n) : null;
    if (!n) throw Error(s(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string" ? (l = Yn(l.href), e = ln(
          n
        ).hoistableStyles, a = e.get(l), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, e.set(l, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          t = Yn(l.href);
          var u = ln(
            n
          ).hoistableStyles, i = u.get(t);
          if (i || (n = n.ownerDocument || n, i = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(t, i), (u = n.querySelector(
            Du(t)
          )) ? u._p || (i.instance = u, i.state.loading = 5) : (u = ul.get(t), u || (u = {
            rel: "preload",
            as: "style",
            href: l.href,
            crossOrigin: l.crossOrigin,
            integrity: l.integrity,
            media: l.media,
            hrefLang: l.hrefLang,
            referrerPolicy: l.referrerPolicy
          }, ul.set(t, u)), uy(
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
        return e = l.async, l = l.src, typeof l == "string" && e && typeof e != "function" && typeof e != "symbol" ? (l = qn(l), e = ln(
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
  function Yn(t) {
    return 'href="' + We(t) + '"';
  }
  function Du(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function Eh(t) {
    return K({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function uy(t, e, l, a) {
    if (e = t.querySelector(
      'link[rel="preload"][as="style"][' + e + "]"
    )) {
      if (e[Iu] !== !0) {
        a.loading = 1;
        return;
      }
    } else
      e = t.createElement("link"), e[Iu] = !0, e.onload = e.onerror = Rf.bind(null, e), Ee(e, "link", l), me(e), t.head.appendChild(e);
    a.preload = e, e.addEventListener("load", function() {
      return a.loading |= 1;
    }), e.addEventListener("error", function() {
      return a.loading |= 2;
    });
  }
  function qn(t) {
    return '[src="' + We(t) + '"]';
  }
  function wu(t) {
    return "script[async]" + t;
  }
  function Th(t, e, l) {
    if (e.count++, e.instance === null)
      switch (e.type) {
        case "style":
          var a = t.querySelector(
            'style[data-href~="' + We(l.href) + '"]'
          );
          if (a)
            return e.instance = a, me(a), a;
          var n = K({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          return a = (t.ownerDocument || t).createElement(
            "style"
          ), me(a), Ee(a, "style", n), rc(a, l.precedence, t), e.instance = a;
        case "stylesheet":
          n = Yn(l.href);
          var u = t.querySelector(
            Du(n)
          );
          if (u)
            return e.state.loading |= 4, e.instance = u, me(u), u;
          a = Eh(l), (n = ul.get(n)) && Qr(a, n), u = (t.ownerDocument || t).createElement("link"), me(u);
          var i = u;
          return i._p = new Promise(function(f, v) {
            i.onload = f, i.onerror = v;
          }), Ee(u, "link", a), e.state.loading |= 4, rc(u, l.precedence, t), e.instance = u;
        case "script":
          return u = qn(l.src), (n = t.querySelector(
            wu(u)
          )) ? (e.instance = n, me(n), n) : (a = l, (n = ul.get(u)) && (a = K({}, l), Zr(a, n)), t = t.ownerDocument || t, n = t.createElement("script"), me(n), Ee(n, "link", a), t.head.appendChild(n), e.instance = n);
        case "void":
          return null;
        default:
          throw Error(s(443, e.type));
      }
    else
      e.type === "stylesheet" && (e.state.loading & 4) === 0 && (a = e.instance, e.state.loading |= 4, rc(a, l.precedence, t));
    return e.instance;
  }
  function rc(t, e, l) {
    for (var a = l.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), n = a.length ? a[a.length - 1] : null, u = n, i = 0; i < a.length; i++) {
      var f = a[i];
      if (f.dataset.precedence === e) u = f;
      else if (u !== n) break;
    }
    u ? u.parentNode.insertBefore(t, u.nextSibling) : (e = l.nodeType === 9 ? l.head : l, e.insertBefore(t, e.firstChild));
  }
  function Qr(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.title == null && (t.title = e.title);
  }
  function Zr(t, e) {
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
      if (!(u[kn] || u[ye] || t === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var i = u.getAttribute(e) || "";
        i = t + i;
        var f = a.get(i);
        f ? f.push(u) : a.set(i, [u]);
      }
    }
    return a;
  }
  function Kr(t, e, l) {
    t = t.ownerDocument || t, t.head.insertBefore(
      l,
      e === "title" ? t.querySelector("head > title") : null
    );
  }
  function iy(t, e, l) {
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
    typeof e.decode == "function" && (t.imgCount++, e.complete || (t.imgBytes += Oh(e), t.suspenseyImages.push(e)), t = ry.bind(t), e.decode().then(t, t));
  }
  function cy(t, e, l, a) {
    if (l.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var n = Yn(a.href), u = e.querySelector(
          Du(n)
        );
        if (u) {
          e = u._p, e !== null && typeof e == "object" && typeof e.then == "function" && (t.count++, t = Uu.bind(t), e.then(t, t)), l.state.loading |= 4, l.instance = u, me(u);
          return;
        }
        u = e.ownerDocument || e, a = Eh(a), (n = ul.get(n)) && Qr(a, n), u = u.createElement("link"), me(u);
        var i = u;
        i._p = new Promise(function(f, v) {
          i.onload = f, i.onerror = v;
        }), Ee(u, "link", a), l.instance = u;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(l, e), (e = l.state.preload) && (l.state.loading & 3) === 0 && (t.count++, l = Uu.bind(t), e.addEventListener("load", l), e.addEventListener("error", l));
    }
  }
  var oc = 0;
  function sy(t, e) {
    return t.stylesheets && t.count === 0 && mc(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(l) {
      var a = setTimeout(function() {
        if (t.stylesheets && mc(t, t.stylesheets), t.unsuspend) {
          var u = t.unsuspend;
          t.unsuspend = null, u();
        }
      }, 6e4 + e);
      0 < t.imgBytes && oc === 0 && (oc = 62500 * Mg());
      var n = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && mc(t, t.stylesheets), t.unsuspend)) {
            var u = t.unsuspend;
            t.unsuspend = null, u();
          }
        },
        (t.imgBytes > oc ? 50 : 800) + e
      );
      return t.unsuspend = l, function() {
        t.unsuspend = null, clearTimeout(a), clearTimeout(n);
      };
    } : null;
  }
  function Ch(t) {
    if (t.count === 0 && (t.imgCount === 0 || !t.waitingForImages)) {
      if (t.stylesheets) mc(t, t.stylesheets);
      else if (t.unsuspend) {
        var e = t.unsuspend;
        t.unsuspend = null, e();
      }
    }
  }
  function Uu() {
    this.count--, Ch(this);
  }
  function ry() {
    this.imgCount--, Ch(this);
  }
  var dc = null;
  function mc(t, e) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, dc = /* @__PURE__ */ new Map(), e.forEach(fy, t), dc = null, Uu.call(t));
  }
  function fy(t, e) {
    if (!(e.state.loading & 4)) {
      var l = dc.get(t);
      if (l) var a = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), dc.set(t, l);
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
  var Gn = {
    $$typeof: St,
    Provider: null,
    Consumer: null,
    _currentValue: Wt,
    _currentValue2: Wt,
    _threadCount: 0
  };
  function oy(t, e, l, a, n, u, i, f, v) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Mc(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Mc(0), this.hiddenUpdates = Mc(null), this.identifierPrefix = a, this.onUncaughtError = n, this.onCaughtError = u, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = v, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Ah(t, e, l, a, n, u, i, f, v, T, z, w) {
    return t = new oy(
      t,
      e,
      l,
      i,
      v,
      T,
      z,
      w,
      f
    ), e = 1, u === !0 && (e |= 24), u = we(3, null, null, e), t.current = u, u.stateNode = t, e = cs(), e.refCount++, t.pooledCache = e, e.refCount++, u.memoizedState = {
      element: a,
      isDehydrated: l,
      cache: e
    }, os(u), t;
  }
  function jh(t) {
    return t ? (t = mn, t) : mn;
  }
  function Rh(t, e, l, a, n, u) {
    n = jh(n), a.context === null ? a.context = n : a.pendingContext = n, a = ta(e), a.payload = { element: l }, u = u === void 0 ? null : u, u !== null && (a.callback = u), l = ea(t, a, e), l !== null && (Le(l, t, e), du(l, t, e));
  }
  function Dh(t, e) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var l = t.retryLane;
      t.retryLane = l !== 0 && l < e ? l : e;
    }
  }
  function Jr(t, e) {
    Dh(t, e), (t = t.alternate) && Dh(t, e);
  }
  function wh(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Ca(t, 67108864);
      e !== null && Le(e, t, 67108864), Jr(t, 67108864);
    }
  }
  function Uh(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Je();
      e = Oc(e);
      var l = Ca(t, e);
      l !== null && Le(l, t, e), Jr(t, e);
    }
  }
  var Xn = !0;
  function dy(t, e, l, a) {
    var n = J.T;
    J.T = null;
    var u = ct.p;
    try {
      ct.p = 2, $r(t, e, l, a);
    } finally {
      ct.p = u, J.T = n;
    }
  }
  function my(t, e, l, a) {
    var n = J.T;
    J.T = null;
    var u = ct.p;
    try {
      ct.p = 8, $r(t, e, l, a);
    } finally {
      ct.p = u, J.T = n;
    }
  }
  function $r(t, e, l, a) {
    if (Xn) {
      var n = kr(a);
      if (n === null)
        Cr(
          t,
          e,
          a,
          hc,
          l
        ), Hh(t, a);
      else if (vy(
        n,
        t,
        e,
        l,
        a
      ))
        a.stopPropagation();
      else if (Hh(t, a), e & 4 && -1 < hy.indexOf(t)) {
        for (; n !== null; ) {
          var u = en(n);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var i = Na(u.pendingLanes);
                  if (i !== 0) {
                    var f = u;
                    for (f.pendingLanes |= 2, f.entangledLanes |= 2; i; ) {
                      var v = 1 << 31 - qe(i);
                      f.entanglements[1] |= v, i &= ~v;
                    }
                    Ml(u), (Bt & 6) === 0 && (Pi = Ot() + 500, zu(0));
                  }
                }
                break;
              case 31:
              case 13:
                f = Ca(u, 2), f !== null && Le(f, u, 2), lc(), Jr(u, 2);
            }
          if (u = kr(a), u === null && Cr(
            t,
            e,
            a,
            hc,
            l
          ), u === n) break;
          n = u;
        }
        n !== null && a.stopPropagation();
      } else
        Cr(
          t,
          e,
          a,
          null,
          l
        );
    }
  }
  function kr(t) {
    return t = wc(t), Fr(t);
  }
  var hc = null;
  function Fr(t) {
    if (hc = null, t = xa(t), t !== null) {
      var e = m(t);
      if (e === null) t = null;
      else {
        var l = e.tag;
        if (l === 13) {
          if (t = b(e), t !== null) return t;
          t = null;
        } else if (l === 31) {
          if (t = _(e), t !== null) return t;
          t = null;
        } else if (l === 3) {
          if (e.stateNode.current.memoizedState.isDehydrated)
            return e.tag === 3 ? e.stateNode.containerInfo : null;
          t = null;
        } else e !== t && (t = null);
      }
    }
    return hc = t, null;
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
        switch (Ta()) {
          case Ql:
            return 2;
          case Pa:
            return 8;
          case Ju:
          case O0:
            return 32;
          case Ef:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Wr = !1, ma = null, ha = null, va = null, Bu = /* @__PURE__ */ new Map(), Hu = /* @__PURE__ */ new Map(), ga = [], hy = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
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
        Bu.delete(e.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Hu.delete(e.pointerId);
    }
  }
  function Lu(t, e, l, a, n, u) {
    return t === null || t.nativeEvent !== u ? (t = {
      blockedOn: e,
      domEventName: l,
      eventSystemFlags: a,
      nativeEvent: u,
      targetContainers: [n]
    }, e !== null && (e = en(e), e !== null && wh(e)), t) : (t.eventSystemFlags |= a, e = t.targetContainers, n !== null && e.indexOf(n) === -1 && e.push(n), t);
  }
  function vy(t, e, l, a, n) {
    switch (e) {
      case "focusin":
        return ma = Lu(
          ma,
          t,
          e,
          l,
          a,
          n
        ), !0;
      case "dragenter":
        return ha = Lu(
          ha,
          t,
          e,
          l,
          a,
          n
        ), !0;
      case "mouseover":
        return va = Lu(
          va,
          t,
          e,
          l,
          a,
          n
        ), !0;
      case "pointerover":
        var u = n.pointerId;
        return Bu.set(
          u,
          Lu(
            Bu.get(u) || null,
            t,
            e,
            l,
            a,
            n
          )
        ), !0;
      case "gotpointercapture":
        return u = n.pointerId, Hu.set(
          u,
          Lu(
            Hu.get(u) || null,
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
    var e = xa(t.target);
    if (e !== null) {
      var l = m(e);
      if (l !== null) {
        if (e = l.tag, e === 13) {
          if (e = b(l), e !== null) {
            t.blockedOn = e, Cf(t.priority, function() {
              Uh(l);
            });
            return;
          }
        } else if (e === 31) {
          if (e = _(l), e !== null) {
            t.blockedOn = e, Cf(t.priority, function() {
              Uh(l);
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
  function vc(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var l = kr(t.nativeEvent);
      if (l === null) {
        l = t.nativeEvent;
        var a = new l.constructor(
          l.type,
          l
        );
        Dc = a, l.target.dispatchEvent(a), Dc = null;
      } else
        return e = en(l), e !== null && wh(e), t.blockedOn = l, !1;
      e.shift();
    }
    return !0;
  }
  function Yh(t, e, l) {
    vc(t) && l.delete(e);
  }
  function gy() {
    Wr = !1, ma !== null && vc(ma) && (ma = null), ha !== null && vc(ha) && (ha = null), va !== null && vc(va) && (va = null), Bu.forEach(Yh), Hu.forEach(Yh);
  }
  function gc(t, e) {
    t.blockedOn === e && (t.blockedOn = null, Wr || (Wr = !0, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      gy
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
            if (Fr(a || l) === null)
              continue;
            break;
          }
          var u = en(l);
          u !== null && (t.splice(e, 3), e -= 3, Rs(
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
  function Vn(t) {
    function e(v) {
      return gc(v, t);
    }
    ma !== null && gc(ma, t), ha !== null && gc(ha, t), va !== null && gc(va, t), Bu.forEach(e), Hu.forEach(e);
    for (var l = 0; l < ga.length; l++) {
      var a = ga[l];
      a.blockedOn === t && (a.blockedOn = null);
    }
    for (; 0 < ga.length && (l = ga[0], l.blockedOn === null); )
      Lh(l), l.blockedOn === null && ga.shift();
    if (l = (t.ownerDocument || t).$$reactFormReplay, l != null)
      for (a = 0; a < l.length; a += 3) {
        var n = l[a], u = l[a + 1], i = n[De] || null;
        if (typeof u == "function")
          i || qh(l);
        else if (i) {
          var f = null;
          if (u && u.hasAttribute("formAction")) {
            if (n = u, i = u[De] || null)
              f = i.formAction;
            else if (Fr(n) !== null) continue;
          } else f = i.action;
          typeof f == "function" ? l[a + 1] = f : (l.splice(a, 3), a -= 3), qh(l);
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
  function Ir(t) {
    this._internalRoot = t;
  }
  bc.prototype.render = Ir.prototype.render = function(t) {
    var e = this._internalRoot;
    if (e === null) throw Error(s(409));
    var l = e.current, a = Je();
    Rh(l, a, t, e, null, null);
  }, bc.prototype.unmount = Ir.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var e = t.containerInfo;
      Rh(t.current, 2, null, t, null, null), lc(), e[tn] = null;
    }
  };
  function bc(t) {
    this._internalRoot = t;
  }
  bc.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var e = zf();
      t = { blockedOn: null, target: t, priority: e };
      for (var l = 0; l < ga.length && e !== 0 && e < ga[l].priority; l++) ;
      ga.splice(l, 0, t), l === 0 && Lh(t);
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
  ct.findDOMNode = function(t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function" ? Error(s(188)) : (t = Object.keys(t).join(","), Error(s(268, t)));
    return t = A(e), t = t !== null ? N(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var yy = {
    bundleType: 0,
    version: "19.3.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: J,
    reconcilerVersion: "19.3.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var pc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!pc.isDisabled && pc.supportsFiber)
      try {
        Kn = pc.inject(
          yy
        ), Ye = pc;
      } catch {
      }
  }
  return qu.createRoot = function(t, e) {
    if (!h(t)) throw Error(s(299));
    var l = !1, a = "", n = jd, u = Rd, i = Dd;
    return e != null && (e.unstable_strictMode === !0 && (l = !0), e.identifierPrefix !== void 0 && (a = e.identifierPrefix), e.onUncaughtError !== void 0 && (n = e.onUncaughtError), e.onCaughtError !== void 0 && (u = e.onCaughtError), e.onRecoverableError !== void 0 && (i = e.onRecoverableError)), e = Ah(
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
    ), t[tn] = e.current, zr(t), new Ir(e);
  }, qu.hydrateRoot = function(t, e, l) {
    if (!h(t)) throw Error(s(299));
    var a = !1, n = "", u = jd, i = Rd, f = Dd, v = null;
    return l != null && (l.unstable_strictMode === !0 && (a = !0), l.identifierPrefix !== void 0 && (n = l.identifierPrefix), l.onUncaughtError !== void 0 && (u = l.onUncaughtError), l.onCaughtError !== void 0 && (i = l.onCaughtError), l.onRecoverableError !== void 0 && (f = l.onRecoverableError), l.formState !== void 0 && (v = l.formState)), e = Ah(
      t,
      1,
      !0,
      e,
      l ?? null,
      a,
      n,
      v,
      u,
      i,
      f,
      Gh
    ), e.context = jh(null), l = e.current, a = Je(), a = Oc(a), n = ta(a), n.callback = null, ea(l, n, a), l = a, e.current.lanes = l, $n(e, l), Ml(e), t[tn] = e.current, zr(t), new bc(e);
  }, qu.version = "19.3.0", qu;
}
var Ih;
function Oy() {
  if (Ih) return ef.exports;
  Ih = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (o) {
        console.error(o);
      }
  }
  return c(), ef.exports = My(), ef.exports;
}
var zy = Oy();
const r0 = 128, f0 = 640;
function Xu(c, o = 144) {
  return Math.max(r0, Math.min(
    f0,
    Number.isFinite(c) ? Math.round(c) : o
  ));
}
function o0(c, o, r) {
  return o ? r ? c : "waveform" : "spectrogram";
}
function Cy(c, o, r) {
  return Number.isFinite(c) ? c * (o === 1 ? 16 : o === 2 ? r : 1) : 0;
}
function Ay(c, o) {
  return Math.max(0, Math.min(100, c - Math.max(-240, Math.min(240, o)) * 0.08));
}
function jy(c, o) {
  return Xu(c * Math.exp(-Math.max(-240, Math.min(240, o)) * 2e-3));
}
function Ph(c, o, r) {
  return Math.max(0, c * o - r);
}
function ka(c) {
  if (!c.id || !Number.isSafeInteger(c.startSample) || !Number.isSafeInteger(c.endSample) || !Number.isFinite(c.sampleRate) || c.sampleRate <= 0 || c.startSample < 0 || c.endSample <= c.startSample)
    throw new RangeError("A loop needs an id, valid sample rate and increasing integer sample bounds");
  return {
    start: c.startSample / c.sampleRate,
    end: c.endSample / c.sampleRate,
    duration: (c.endSample - c.startSample) / c.sampleRate
  };
}
function Ry(c, o = 0) {
  const r = /* @__PURE__ */ new Set();
  return c.filter((s) => {
    try {
      const h = ka(s);
      return r.has(s.id) || o > 0 && h.end > o + 0.02 ? !1 : (r.add(s.id), !0);
    } catch {
      return !1;
    }
  });
}
function d0(c, o, r) {
  const s = r - o;
  return !Number.isFinite(c) || s <= 0 ? o : o + ((c - o) % s + s) % s;
}
class Dy {
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
  async play(o, r, s, h = "same-origin") {
    const m = ka(o);
    this.pause();
    const b = this.generation;
    this.context ??= this.createContext();
    const _ = this.context, C = _.resume();
    C.catch(() => {
    });
    const A = o.audioSrc || r, N = JSON.stringify([A, o.startSample, o.endSample, o.sampleRate]);
    try {
      let g = this.cache?.url === N ? this.cache.buffer : null;
      if (!g) {
        const k = new AbortController();
        this.abort = k;
        const mt = await fetch(A, { signal: k.signal, credentials: h });
        if (!mt.ok) throw new Error(`Could not load loop audio (HTTP ${mt.status})`);
        const Q = 128 * 1024 * 1024;
        if (Number(mt.headers.get("Content-Length")) > Q) throw new Error("Loop audio exceeds 128 MiB");
        const X = await mt.arrayBuffer();
        if (X.byteLength > Q) throw new Error("Loop audio exceeds 128 MiB");
        if (g = await _.decodeAudioData(X), b !== this.generation) return !1;
        this.cache = { url: N, buffer: g };
      }
      if (await C, b !== this.generation) return !1;
      const j = o.audioSrc ? 0 : m.start, B = j + m.duration, Z = Math.max(2 / g.sampleRate, 2e-3);
      if (!Number.isFinite(g.duration) || g.duration <= j || B > g.duration + Z || o.audioSrc && Math.abs(g.duration - m.duration) > Z)
        throw new Error("Loop audio duration does not match the reported sample boundaries");
      const lt = _.createBufferSource();
      return lt.buffer = g, lt.loop = !0, lt.loopStart = j, lt.loopEnd = Math.min(B, g.duration), lt.connect(_.destination), this.start = m.start, this.length = lt.loopEnd - j, this.offset = d0(s, m.start, m.start + this.length) - m.start, this.anchor = _.currentTime, lt.start(this.anchor, j + this.offset), this.node = lt, !0;
    } catch (g) {
      if (b !== this.generation) return !1;
      throw g;
    } finally {
      C.catch(() => {
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
function pa(c, o, r) {
  return Math.min(r, Math.max(o, c));
}
function Sa(c) {
  const o = Math.max(0, Number(c) || 0), r = Math.floor(o / 60), s = Math.floor(o % 60), h = Math.floor((o - Math.floor(o)) * 1e3);
  return `${String(r).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(h).padStart(3, "0")}`;
}
function m0(c) {
  const o = [0.1, 0.25, 0.5, 1, 2, 5, 10, 15, 30, 60, 120, 300, 600];
  return o.find((r) => r * c >= 70) ?? o[o.length - 1];
}
function wy(c, o, r, s, h) {
  if (h <= 0 || s <= 0) return { start: 0, end: 0 };
  const m = Math.max(0, c - r), b = Math.max(0, c + o - r), _ = pa(m / s, 0, h), C = pa(b / s, _, h);
  return { start: _, end: C };
}
function t0(c, o) {
  if (typeof c != "number" || !Number.isFinite(c)) throw new RangeError(`${o} must be finite`);
  return c;
}
function Uy(c, o) {
  const r = o * c.source_audio.sample_rate, s = c.beats;
  let h = 0, m = s.length;
  for (; h < m; ) {
    const b = h + m >>> 1;
    s[b].frame <= r ? h = b + 1 : m = b;
  }
  return Math.max(0, Math.min(s.length - 2, h - 1));
}
function h0(c, o, r = 0.15) {
  if (t0(o, "source seconds"), t0(r, "tolerance") < 0 || r > 60) throw new RangeError("Invalid snap tolerance");
  let s, h;
  if (c.mode === "fixed")
    s = Math.round((o - c.firstBeatSeconds) * c.bpm / 60), h = c.firstBeatSeconds + s * 60 / c.bpm;
  else {
    const b = c.beats, _ = c.source_audio.sample_rate, C = Uy(c, o), A = [b[C], b[C + 1]].reduce((N, g) => Math.abs(N.frame / _ - o) <= Math.abs(g.frame / _ - o) ? N : g);
    s = A.beat - c.origin_beat, h = A.frame / _;
  }
  const m = o - h;
  return {
    beat: s,
    time: h,
    errorSeconds: m,
    errorMilliseconds: m * 1e3,
    withinTolerance: Math.abs(m) <= r,
    mode: c.mode
  };
}
function By(c, o, r, s = 2e3) {
  if (!(Number.isFinite(o) && Number.isFinite(r) && r > o)) return [];
  const h = Math.max(1, Math.min(2e3, Math.floor(s)));
  if (c.mode === "variable") {
    const N = c.beats.filter((j) => j.frame / c.source_audio.sample_rate >= o && j.frame / c.source_audio.sample_rate <= r), g = Math.max(1, Math.ceil(N.length / h));
    return N.filter((j, B) => B % g === 0).map((j) => ({
      time: j.frame / c.source_audio.sample_rate,
      label: `Observed beat ${j.beat}`,
      emphasis: j.beat === c.origin_beat
    }));
  }
  const m = Math.max(Math.ceil((o - c.firstBeatSeconds) * c.bpm / 60), Math.ceil(-c.firstBeatSeconds * c.bpm / 60)), b = Math.floor((r - c.firstBeatSeconds) * c.bpm / 60), _ = Math.max(0, b - m + 1), C = Math.max(1, Math.ceil(_ / h)), A = [];
  for (let N = m; N <= b && A.length < h; N += C) A.push({
    time: c.firstBeatSeconds + N * 60 / c.bpm,
    label: `Fixed-BPM grid beat ${N} (not detected)`,
    emphasis: N === 0
  });
  return A;
}
function e0(c, o, r, s) {
  if (!Number.isFinite(r) || !Number.isFinite(s.duration) || s.duration <= 0) throw new RangeError("Invalid timing edit timebase");
  const h = Math.max(0, s.bounds?.start ?? 0, s.previousEnd ?? 0), m = Math.min(s.duration, s.bounds?.end ?? s.duration, s.nextStart ?? s.duration);
  if (m < h) throw new RangeError("No space between neighbouring timing items");
  const b = s.minimumDuration ?? 0;
  if (b < 0) throw new RangeError("minimumDuration must be nonnegative");
  let _ = Math.min(m, Math.max(h, r));
  if (s.snap && s.clock) {
    const N = h0(s.clock, _, s.toleranceSeconds ?? 0.15);
    N.withinTolerance && (_ = Math.min(m, Math.max(h, N.time)));
  }
  const C = c.end !== void 0 && Number.isFinite(c.end), A = C ? Number(c.end) - c.start : 0;
  if (o === "move") {
    const N = Math.max(h, Math.min(Math.max(h, m - A), _));
    return C ? { ...c, start: N, end: N + A } : { ...c, start: N };
  }
  if (o === "start") {
    const N = C ? c.end - b : m;
    if (N < h) throw new RangeError("No valid start fits within the parent bounds");
    return { ...c, start: Math.min(_, N) };
  }
  if (!C) throw new RangeError("This event has no editable end");
  if (c.start + b > m) throw new RangeError("No valid end fits inside the parent bounds");
  return { ...c, end: Math.max(c.start + b, _) };
}
function l0(c, o, r) {
  const s = c.parentId ? r.parents?.find((_) => _.id === c.parentId) : null, h = o.filter((_) => _.id !== c.id && (_.parentId ?? "") === (c.parentId ?? "")).sort((_, C) => _.start - C.start), m = h.filter((_) => _.start <= c.start).slice(-1)[0], b = h.find((_) => _.start > c.start);
  return {
    duration: r.duration,
    bounds: s ? { start: s.start, end: s.end } : void 0,
    previousEnd: m ? m.end ?? m.start : void 0,
    nextStart: b?.start,
    clock: r.clock,
    snap: r.snap,
    toleranceSeconds: r.toleranceSeconds,
    minimumDuration: 1e-3
  };
}
function Hy(c) {
  const { items: o, kind: r, duration: s, clock: h, selectedId: m, onSelect: b, onEdit: _ } = c, C = c.editable === !0 && typeof _ == "function", [A, N] = U.useState(null), g = U.useRef(null), j = U.useRef(null), B = (Q) => `${Math.max(0, Math.min(100, Q * 100 / Math.max(s, 1e-9)))}%`;
  function Z(Q, X, Nt) {
    if (!C || Q.button !== 0) return;
    const Et = Q.currentTarget.closest(".rts-track");
    if (!Et) return;
    const At = Et.getBoundingClientRect().width;
    !Number.isFinite(At) || At <= 0 || (g.current = { id: X.id, edge: Nt, x: Q.clientX, origin: X, width: At }, j.current = X, Q.currentTarget.setPointerCapture(Q.pointerId), Q.stopPropagation(), Q.preventDefault(), b?.(X.id));
  }
  function lt(Q) {
    const X = g.current;
    if (!X || !C) return;
    const Nt = (X.edge === "end" ? X.origin.end ?? X.origin.start : X.origin.start) + (Q.clientX - X.x) * s / X.width;
    try {
      j.current = e0(X.origin, X.edge, Nt, l0(X.origin, o, c)), N(j.current);
    } catch {
    }
    Q.stopPropagation();
  }
  function k(Q, X = !1) {
    const Nt = g.current;
    Nt && (g.current = null, !X && j.current && _ && (j.current.start !== Nt.origin.start || j.current.end !== Nt.origin.end) && _(j.current), j.current = null, N(null), Q.stopPropagation());
  }
  function mt(Q, X, Nt) {
    if (!C || Q.key !== "ArrowLeft" && Q.key !== "ArrowRight") return;
    Q.preventDefault(), Q.stopPropagation();
    const Et = (Q.key === "ArrowRight" ? 1 : -1) * (Q.shiftKey ? 1e-3 : 0.01), At = Nt === "end" ? X.end ?? X.start : X.start;
    try {
      _?.(e0(X, Nt, At + Et, l0(X, o, c)));
    } catch {
    }
  }
  return /* @__PURE__ */ d.jsx("div", { className: `rts-editable-timing rts-timing-${r}`, role: "group", "aria-label": `${r} timings`, children: o.filter((Q) => Number.isFinite(Q.start) && Q.start >= 0 && Q.start <= s).map((Q) => {
    const X = A?.id === Q.id ? A : Q, Nt = X.end !== void 0 ? Math.max(0.1, (X.end - X.start) * 100 / s) : 0.12, Et = h ? h0(h, X.start, c.toleranceSeconds ?? 0.15) : null, At = `${Q.label} at ${Sa(X.start)}${Et ? `, ${Et.withinTolerance ? "near" : "off"} ${Et.mode} beat ${Et.beat}, signed gap ${Et.errorMilliseconds.toFixed(1)} ms` : ""}`;
    return /* @__PURE__ */ d.jsxs(
      "div",
      {
        className: `rts-timing-region ${m === Q.id ? "is-selected" : ""} ${Q.className ?? ""}`,
        style: { left: B(X.start), width: `${Nt}%` },
        children: [
          /* @__PURE__ */ d.jsx(
            "button",
            {
              type: "button",
              className: `rts-timing-handle rts-timing-main ${Et?.withinTolerance ? "is-matched" : ""}`,
              "aria-label": `Move ${At}`,
              title: At,
              "aria-pressed": m === Q.id,
              onClick: (K) => {
                K.stopPropagation(), b?.(Q.id);
              },
              onPointerDown: (K) => Z(K, Q, "move"),
              onPointerMove: lt,
              onPointerUp: k,
              onPointerCancel: (K) => k(K, !0),
              onKeyDown: (K) => mt(K, Q, "move"),
              children: Q.label
            }
          ),
          C && X.end !== void 0 && /* @__PURE__ */ d.jsx(
            "button",
            {
              type: "button",
              className: "rts-timing-end",
              "aria-label": `Resize end of ${Q.label}`,
              title: "Resize end · arrows: 10 ms, Shift: 1 ms",
              onPointerDown: (K) => Z(K, Q, "end"),
              onPointerMove: lt,
              onPointerUp: k,
              onPointerCancel: (K) => k(K, !0),
              onKeyDown: (K) => mt(K, Q, "end")
            }
          ),
          C && X.end !== void 0 && /* @__PURE__ */ d.jsx(
            "button",
            {
              type: "button",
              className: "rts-timing-start",
              "aria-label": `Resize start of ${Q.label}`,
              title: "Resize start · arrows: 10 ms, Shift: 1 ms",
              onPointerDown: (K) => Z(K, Q, "start"),
              onPointerMove: lt,
              onPointerUp: k,
              onPointerCancel: (K) => k(K, !0),
              onKeyDown: (K) => mt(K, Q, "start")
            }
          )
        ]
      },
      Q.id
    );
  }) });
}
function rf(c, o) {
  return `${pa(c / Math.max(o, 1e-9), 0, 1) * 100}%`;
}
function v0(c, o, r, s = 0.08) {
  const h = Number.isFinite(o) && Number(o) > c ? Number(o) : c + 0.5;
  return `${Math.max(s, (h - c) / Math.max(r, 1e-9) * 100)}%`;
}
function Ly({ min: c, max: o, colour: r = "#79c0ff" }) {
  const s = U.useRef(null);
  return U.useEffect(() => {
    const h = s.current;
    if (!h) return;
    const m = Math.max(1, Math.min(c.length, o.length));
    h.width = m, h.height = 180;
    const b = h.getContext("2d");
    if (!b) return;
    b.clearRect(0, 0, m, h.height), b.strokeStyle = r, b.lineWidth = 1, b.beginPath();
    const _ = h.height / 2, C = h.height * 0.46;
    for (let A = 0; A < m; A += 1) {
      const N = A + 0.5;
      b.moveTo(N, _ - (Number(o[A]) || 0) * C), b.lineTo(N, _ - (Number(c[A]) || 0) * C);
    }
    b.stroke();
  }, [r, o, c]), /* @__PURE__ */ d.jsx("canvas", { ref: s, className: "rts-waveform", "aria-hidden": "true" });
}
function Yy({ rows: c }) {
  const o = U.useRef(null);
  return U.useEffect(() => {
    const r = o.current, s = c.filter((_) => _.length > 0);
    if (!r || !s.length) return;
    const h = Math.max(...s.map((_) => _.length));
    r.width = Math.min(4096, s.length), r.height = Math.min(256, h);
    const m = r.getContext("2d");
    if (!m) return;
    const b = m.createImageData(r.width, r.height);
    for (let _ = 0; _ < r.width; _ += 1) {
      const C = Math.min(s.length - 1, Math.floor(_ * s.length / r.width)), A = s[C], N = Math.max(1e-9, ...A.map((g) => Number(g) || 0));
      for (let g = 0; g < r.height; g += 1) {
        const j = Math.min(A.length - 1, Math.floor((r.height - 1 - g) * A.length / r.height)), B = pa((Number(A[j]) || 0) / N, 0, 1), Z = (g * r.width + _) * 4;
        b.data[Z] = Math.round(40 + 180 * B), b.data[Z + 1] = Math.round(35 + 110 * B), b.data[Z + 2] = Math.round(80 + 170 * B), b.data[Z + 3] = 255;
      }
    }
    m.putImageData(b, 0, 0);
  }, [c]), /* @__PURE__ */ d.jsx("canvas", { ref: o, className: "rts-matrix", "aria-hidden": "true" });
}
function qy({ items: c, duration: o }) {
  const r = c.filter((m) => Number.isFinite(m.value) && m.value > 0);
  if (!r.length) return null;
  const s = Math.log2(Math.max(20, Math.min(...r.map((m) => m.value)))), h = Math.log2(Math.max(100, ...r.map((m) => m.value)));
  return r.map((m, b) => {
    const _ = (Math.log2(m.value) - s) / Math.max(0.01, h - s);
    return /* @__PURE__ */ d.jsx(
      "span",
      {
        className: `rts-note ${m.className ?? ""}`,
        style: { left: rf(m.start, o), width: v0(m.start, m.end ?? m.start + 0.12, o, 0.04), top: `${8 + (1 - _) * 72}px` },
        title: m.title ?? `${m.label ?? `${m.value.toFixed(1)} Hz`} · ${Sa(m.start)}`
      },
      `${m.start}-${b}`
    );
  });
}
function ff({ content: c, duration: o }) {
  switch (c.type) {
    case "waveform":
      return /* @__PURE__ */ d.jsx(Ly, { ...c });
    case "image":
      return /* @__PURE__ */ d.jsx("img", { className: `rts-image ${c.className ?? ""}`, src: c.src, alt: c.alt });
    case "markers":
      return /* @__PURE__ */ d.jsx(d.Fragment, { children: c.items.map((r, s) => /* @__PURE__ */ d.jsx(
        "span",
        {
          className: `rts-marker ${r.emphasis ? "rts-marker-emphasis" : ""} ${r.className ?? ""}`,
          style: { left: rf(r.time, o) },
          title: r.label
        },
        `${r.time}-${s}`
      )) });
    case "blocks":
      return /* @__PURE__ */ d.jsx(d.Fragment, { children: c.items.map((r, s) => /* @__PURE__ */ d.jsx(
        "span",
        {
          className: `rts-block ${r.className ?? ""}`,
          style: { left: rf(r.start, o), width: v0(r.start, r.end, o) },
          title: r.title ?? `${r.label ?? ""} · ${Sa(r.start)}${r.end ? ` — ${Sa(r.end)}` : ""}`,
          children: r.label
        },
        `${r.start}-${s}`
      )) });
    case "notes":
      return /* @__PURE__ */ d.jsx(qy, { items: c.items, duration: o });
    case "curve": {
      const r = c.points.filter((_) => Number.isFinite(_.time) && Number.isFinite(_.value));
      if (!r.length) return null;
      const s = r.map((_) => _.value), h = Math.min(...s), m = Math.max(...s), b = r.map((_) => {
        const C = _.time / Math.max(o, 1e-9) * 2e3, A = 180 - (_.value - h) / Math.max(1e-9, m - h) * 168 - 6;
        return `${C.toFixed(2)},${A.toFixed(2)}`;
      }).join(" ");
      return /* @__PURE__ */ d.jsx("svg", { className: "rts-curve", viewBox: "0 0 2000 180", preserveAspectRatio: "none", "aria-hidden": "true", children: /* @__PURE__ */ d.jsx("polyline", { fill: "none", stroke: c.colour ?? "#7ee787", strokeWidth: "2", vectorEffect: "non-scaling-stroke", points: b }) });
    }
    case "matrix":
      return /* @__PURE__ */ d.jsx(Yy, { ...c });
    case "summary":
      return /* @__PURE__ */ d.jsx("div", { className: "rts-summary", children: c.items.map((r, s) => /* @__PURE__ */ d.jsxs("span", { className: "rts-summary-item", children: [
        /* @__PURE__ */ d.jsxs("strong", { children: [
          r.label,
          ": "
        ] }),
        r.value
      ] }, `${r.label}-${s}`)) });
    case "artifact":
      return /* @__PURE__ */ d.jsxs("div", { className: "rts-artifact", children: [
        /* @__PURE__ */ d.jsx("span", { children: c.note }),
        c.href && /* @__PURE__ */ d.jsx("a", { href: c.href, target: "_blank", rel: "noopener noreferrer", children: c.linkLabel ?? "open" })
      ] });
    case "text":
      return /* @__PURE__ */ d.jsx("div", { className: "rts-text", children: c.text });
    case "timing":
      return /* @__PURE__ */ d.jsx(Hy, { ...c, duration: o });
    case "custom":
      return /* @__PURE__ */ d.jsx(d.Fragment, { children: c.node });
  }
}
function Gy({ content: c, duration: o, view: r }) {
  const s = o0(r, !!c.waveform, !!c.spectrogram);
  return /* @__PURE__ */ d.jsxs("div", { className: `rts-audio-layers rts-audio-${s}`, "data-audio-view": s, children: [
    c.spectrogram && s !== "waveform" && /* @__PURE__ */ d.jsx("div", { className: "rts-audio-spectrum", children: /* @__PURE__ */ d.jsx(ff, { content: { type: "image", ...c.spectrogram }, duration: o }) }),
    c.waveform && s !== "spectrogram" && /* @__PURE__ */ d.jsx("div", { className: "rts-audio-envelope", children: /* @__PURE__ */ d.jsx(ff, { content: { type: "waveform", ...c.waveform, colour: s === "both" ? "#e6fff7" : c.waveform.colour }, duration: o }) }),
    !c.waveform && !c.spectrogram && /* @__PURE__ */ d.jsx("span", { className: "rts-meta", children: "Waiting for audio analysis" })
  ] });
}
function Xy(c, o, r, s, h = "same-origin") {
  const [m, b] = U.useState(0), [_, C] = U.useState(!1), [A, N] = U.useState(!1), [g, j] = U.useState(""), B = U.useRef(!1), Z = U.useRef("media"), lt = U.useRef(null), k = U.useRef(0), mt = U.useRef({ audioSrc: o, activeLoop: r, onError: s, credentials: h });
  mt.current = { audioSrc: o, activeLoop: r, onError: s, credentials: h };
  const Q = U.useCallback(() => Z.current === "loop" ? lt.current?.currentTime ?? 0 : c.current?.currentTime ?? 0, [c]), X = U.useCallback(() => {
    const at = Q();
    return k.current += 1, B.current = !1, lt.current?.pause(), c.current?.pause(), N(!1), C(!1), b(at), at;
  }, [c, Q]), Nt = U.useCallback((at) => {
    X(), j(at instanceof Error ? at.message : String(at)), mt.current.onError?.(at);
  }, [X]), Et = U.useCallback(async (at) => {
    X();
    const et = k.current;
    B.current = !0, N(!0), j("");
    const { activeLoop: ft, audioSrc: Qt, credentials: kt } = mt.current;
    try {
      if (ft) {
        if (Z.current = "loop", lt.current ??= new Dy(), !await lt.current.play(ft, Qt, at, kt)) return;
      } else {
        Z.current = "media";
        const St = c.current;
        if (!St) return;
        St.currentTime = Math.max(0, at), await St.play();
      }
      if (et !== k.current) return;
      b(Q()), N(!1), C(!0);
    } catch (St) {
      et === k.current && Nt(St);
    }
  }, [c, Nt, X, Q]), At = U.useCallback((at) => {
    const et = mt.current.activeLoop;
    if (et) {
      const ft = ka(et);
      at = d0(at, ft.start, ft.end);
    }
    B.current ? Et(at) : (X(), Z.current = "media", c.current && (c.current.currentTime = at), b(at));
  }, [c, X, Et]), K = U.useCallback(() => {
    if (B.current) {
      X();
      return;
    }
    let at = Q();
    const et = mt.current.activeLoop;
    if (et) {
      const ft = ka(et);
      (at < ft.start || at >= ft.end) && (at = ft.start);
    }
    Et(at);
  }, [X, Et, Q]);
  U.useEffect(() => (X(), Z.current = "media", b(0), j(""), lt.current?.dispose(), lt.current = null, () => {
    k.current += 1, B.current = !1, lt.current?.dispose(), lt.current = null, c.current?.pause();
  }), [o, c, X]);
  const dt = r ? JSON.stringify([r.id, r.startSample, r.endSample, r.sampleRate, r.audioSrc]) : "";
  U.useEffect(() => {
    const at = B.current;
    let et = X();
    const ft = mt.current.activeLoop;
    ft && (et = ka(ft).start), Z.current = "media", c.current && (c.current.currentTime = et), b(et), at && Et(et);
  }, [dt, c, X, Et]), U.useEffect(() => {
    if (!_) return;
    let at = 0;
    const et = () => {
      b(Q()), at = requestAnimationFrame(et);
    };
    return at = requestAnimationFrame(et), () => cancelAnimationFrame(at);
  }, [_, Q]);
  const Gt = U.useCallback(() => {
    Z.current === "media" && X();
  }, [X]);
  return { time: m, playing: _, loading: A, error: g, toggle: K, seek: At, ended: Gt, fail: Nt };
}
function Vy(c, o) {
  if (c <= 0 || o <= 0) return [];
  const r = m0(o) / 5, s = [];
  for (let h = 0; h * r <= c + 1e-6; h += 1)
    s.push({
      time: h * r,
      major: h % 5 === 0
    });
  return s;
}
function Qy(c, o) {
  const r = Math.round(c * 1e3), s = Math.floor(r / 1e3), h = `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  return m0(o) < 1 ? `${h}.${String(r % 1e3).padStart(3, "0")}` : h;
}
function Zy({
  audioSrc: c,
  loops: o = [],
  onLoopSelect: r,
  onLoopEnabledChange: s,
  lanes: h,
  title: m = "Audio timeline",
  subtitle: b,
  duration: _ = 0,
  grid: C = [],
  beatClock: A = null,
  showBeatGrid: N = !1,
  headerEnd: g,
  footer: j,
  className: B = "",
  labelWidth: Z = 230,
  initialZoom: lt = 20,
  laneControls: k = !1,
  wheelNavigation: mt = !1,
  followPlayheadByDefault: Q = !0,
  preload: X = "metadata",
  crossOrigin: Nt,
  onDurationChange: Et,
  onTimeChange: At,
  onWindowChange: K,
  onPlaybackError: dt
}) {
  const Gt = U.useRef(null), at = U.useRef(null), [et, ft] = U.useState(Math.max(0, _)), [Qt, kt] = U.useState(null), [St, q] = U.useState(!1), Y = U.useMemo(() => Ry(o, et), [o, et]), L = Y.find((R) => R.id === Qt) ?? null, $ = Xy(
    Gt,
    c,
    St ? L : null,
    dt,
    Nt === "use-credentials" ? "include" : "same-origin"
  ), it = $.time, Zt = $.playing, Ft = L ? ka(L) : null, te = (R) => {
    kt(R), r?.(Y.find((vt) => vt.id === R) ?? null);
  }, p = (R) => {
    q(R), s?.(R);
  };
  U.useEffect(() => {
    Qt && !Y.some((R) => R.id === Qt) && (kt(null), q(!1), r?.(null), s?.(!1));
  }, [Qt, Y, r, s]), U.useEffect(() => {
    kt(null), q(!1), ft(Math.max(0, _));
  }, [c]);
  const [H, F] = U.useState(Q), [P, ht] = U.useState(lt), [pt, ot] = U.useState({}), [J, ct] = U.useState({}), Wt = U.useRef(lt), le = U.useRef(null), wt = U.useRef(() => {
  });
  U.useEffect(() => {
    ot({}), ct({});
  }, [c]);
  const [It, $t] = U.useState(0), [xt, G] = U.useState({ start: 0, end: 0 });
  U.useEffect(() => {
    _ > 0 && ft(_);
  }, [_]), U.useEffect(() => {
    const R = at.current;
    if (!R) return;
    const vt = () => $t(R.clientWidth);
    vt();
    const Tt = new ResizeObserver(vt);
    return Tt.observe(R), () => Tt.disconnect();
  }, []);
  const nt = et > 0 ? Math.max(0.4, Math.max(320, It - Z - 16) / et) : 0.4, st = Math.max(nt, nt * Math.pow(2, P / 18));
  U.useLayoutEffect(() => {
    if (Wt.current = P, le.current && at.current) {
      const { time: R, pointer: vt } = le.current;
      at.current.scrollLeft = Ph(R, st, vt), le.current = null;
    }
  }, [P, st]), U.useEffect(() => {
    const R = at.current;
    if (!R || !mt) return;
    const vt = (Tt) => wt.current(Tt);
    return R.addEventListener("wheel", vt, { passive: !1 }), () => R.removeEventListener("wheel", vt);
  }, [mt]);
  const Re = Math.max(1, et * st), Ne = U.useMemo(() => Vy(et, st), [et, st]), xe = U.useMemo(() => A && N ? By(A, 0, et, 2e3).map((R) => ({
    time: R.time,
    emphasis: R.emphasis,
    label: R.label,
    className: `rts-beat-grid-${A.mode}`
  })) : [], [A, N, et]), hl = [...C, ...xe], vl = U.useCallback(() => {
    const R = at.current;
    if (!R) return;
    const vt = wy(
      R.scrollLeft + Z,
      Math.max(0, R.clientWidth - Z),
      Z,
      st,
      et
    );
    G(vt), K?.(vt);
  }, [et, Z, K, st]);
  U.useEffect(() => {
    vl();
  }, [vl, It]), U.useEffect(() => {
    At?.(it);
    const R = at.current;
    if (!R || !H || !Zt) return;
    const vt = Z + it * st, Tt = R.scrollLeft + R.clientWidth, de = Math.min(180, R.clientWidth * 0.2);
    vt > Tt - de ? R.scrollLeft = Math.max(0, vt - R.clientWidth + de) : vt < R.scrollLeft + Z && (R.scrollLeft = Math.max(0, vt - Z - de));
  }, [it, H, Zt, Z, At, st]);
  const _a = (R) => {
    if (et <= 0 || R.target.closest(".rts-label, a, button, input, select, textarea")) return;
    const vt = at.current, Tt = Gt.current;
    if (!vt || !Tt) return;
    const de = vt.getBoundingClientRect(), ie = R.clientX - de.left + vt.scrollLeft - Z;
    if (ie < 0) return;
    const O = pa(ie / st, 0, et);
    $.seek(O);
  }, Vl = (R, vt) => {
    const Tt = at.current;
    if (R = pa(R, 0, 100), R !== Wt.current) {
      if (Tt) {
        const de = Math.max(1, Tt.clientWidth - Z), ie = vt === void 0 ? de / 2 : pa(vt - Tt.getBoundingClientRect().left - Z, 0, de), O = le.current, I = nt * Math.pow(2, Wt.current / 18), Mt = O ? Ph(O.time, I, O.pointer) : Tt.scrollLeft;
        le.current = { time: (Mt + ie) / I, pointer: ie };
      }
      Wt.current = R, ht(R);
    }
  };
  wt.current = (R) => {
    const vt = at.current, Tt = R.target instanceof Element ? R.target : null;
    if (!vt || !Tt || Tt.closest("input, select, textarea, button, [contenteditable=true]")) return;
    const de = Math.abs(R.deltaX) > Math.abs(R.deltaY) ? R.deltaX : R.deltaY, ie = Cy(de, R.deltaMode, vt.clientWidth - Z);
    if (ie)
      if (R.ctrlKey || R.metaKey) {
        if (et <= 0) return;
        R.preventDefault(), R.stopPropagation(), F(!1), Vl(Ay(Wt.current, ie), R.clientX);
      } else if (R.altKey) {
        const O = Tt.closest("[data-lane-id]")?.dataset.laneId, I = h.find((Mt) => Mt.id === O);
        if (!k || !I) return;
        R.preventDefault(), R.stopPropagation(), ot((Mt) => ({
          ...Mt,
          [I.id]: jy(Mt[I.id] ?? Xu(I.height), ie)
        }));
      } else
        R.preventDefault(), R.stopPropagation(), R.shiftKey ? vt.scrollTop += ie : (F(!1), vt.scrollLeft += ie);
  };
  const Fe = () => {
    if (!Ft || !at.current) return;
    const R = Math.max(320, It - Z - 16) / (Ft.duration * 1.1), vt = pa(18 * Math.log2(R / nt), 0, 100);
    le.current = null, Wt.current = vt, ht(vt);
    const Tt = nt * Math.pow(2, vt / 18);
    requestAnimationFrame(() => {
      at.current && (at.current.scrollLeft = Math.max(0, (Ft.start - Ft.duration * 0.05) * Tt));
    });
  }, Ea = () => {
    const R = Number(Gt.current?.duration) || 0;
    Number.isFinite(R) && R > 0 && (ft(R), Et?.(R));
  };
  return /* @__PURE__ */ d.jsxs(
    "section",
    {
      className: `rts-sequence ${k ? "rts-display-controls" : ""} ${B}`,
      style: { "--rts-label-width": `${Z}px`, "--rts-track-width": `${Re}px` },
      children: [
        /* @__PURE__ */ d.jsxs("header", { className: "rts-toolbar", children: [
          /* @__PURE__ */ d.jsxs("div", { className: "rts-ident", children: [
            /* @__PURE__ */ d.jsx("strong", { children: m }),
            b && /* @__PURE__ */ d.jsx("span", { children: b })
          ] }),
          /* @__PURE__ */ d.jsxs("div", { className: "rts-transport", "aria-label": "Timeline playback controls", children: [
            /* @__PURE__ */ d.jsx("button", { type: "button", className: "rts-button rts-play", onClick: $.toggle, "aria-label": Zt || $.loading ? "Pause" : "Play", children: $.loading ? "…" : Zt ? "❚❚" : "▶" }),
            /* @__PURE__ */ d.jsxs("output", { className: "rts-time", "aria-live": "off", children: [
              Sa(it),
              " / ",
              Sa(et)
            ] }),
            /* @__PURE__ */ d.jsx("button", { type: "button", className: "rts-button", onClick: () => Vl(0), children: "Fit" }),
            /* @__PURE__ */ d.jsxs("label", { className: "rts-control", children: [
              /* @__PURE__ */ d.jsx("span", { children: "Zoom" }),
              /* @__PURE__ */ d.jsx("input", { "aria-label": "Timeline zoom", type: "range", min: "0", max: "100", value: P, onChange: (R) => Vl(Number(R.target.value)) })
            ] }),
            /* @__PURE__ */ d.jsxs("label", { className: "rts-control", children: [
              /* @__PURE__ */ d.jsx("input", { type: "checkbox", checked: H, onChange: (R) => F(R.target.checked) }),
              /* @__PURE__ */ d.jsx("span", { children: "Follow" })
            ] })
          ] }),
          /* @__PURE__ */ d.jsx("div", { className: "rts-header-end", children: g }),
          Y.length > 0 && /* @__PURE__ */ d.jsxs("div", { className: "rts-loop-controls", "aria-label": "Loop controls", children: [
            /* @__PURE__ */ d.jsxs("label", { children: [
              "Loop ",
              /* @__PURE__ */ d.jsxs("select", { "aria-label": "Select loop", value: Qt ?? "", onChange: (R) => te(R.target.value), children: [
                /* @__PURE__ */ d.jsx("option", { value: "", children: "Choose a loop…" }),
                Y.map((R) => /* @__PURE__ */ d.jsx("option", { value: R.id, children: R.label || R.id }, R.id))
              ] })
            ] }),
            /* @__PURE__ */ d.jsxs("label", { children: [
              /* @__PURE__ */ d.jsx("input", { type: "checkbox", "aria-label": "Enable loop", disabled: !L, checked: St && !!L, onChange: (R) => p(R.target.checked) }),
              "Enable loop"
            ] }),
            /* @__PURE__ */ d.jsx("button", { type: "button", className: "rts-button", disabled: !L, onClick: Fe, children: "Zoom to loop" }),
            L && /* @__PURE__ */ d.jsxs("output", { children: [
              L.startSample.toLocaleString(),
              " → ",
              L.endSample.toLocaleString(),
              " samples (end exclusive) · ",
              L.sampleRate.toLocaleString(),
              " Hz"
            ] }),
            L?.downloadUrl && /* @__PURE__ */ d.jsx("a", { href: L.downloadUrl, download: !0, children: "Download loop WAV" }),
            /* @__PURE__ */ d.jsx("span", { className: "rts-loop-status", role: "status", children: $.loading ? "Loading loop…" : St && L ? "Loop enabled · Play repeats selection" : "Full-song playback" })
          ] }),
          $.error && /* @__PURE__ */ d.jsx("div", { role: "alert", className: "rts-loop-error", children: $.error })
        ] }),
        /* @__PURE__ */ d.jsx(
          "audio",
          {
            ref: Gt,
            src: c,
            preload: X,
            crossOrigin: Nt,
            onLoadedMetadata: Ea,
            onEnded: $.ended,
            onError: () => $.fail(new Error(Gt.current?.error?.message || "Audio playback failed"))
          }
        ),
        /* @__PURE__ */ d.jsx("div", { className: "rts-workspace", children: /* @__PURE__ */ d.jsx("div", { ref: at, className: "rts-scroller", onScroll: vl, onClick: _a, children: /* @__PURE__ */ d.jsxs("div", { className: "rts-inner", children: [
          /* @__PURE__ */ d.jsxs("div", { className: "rts-ruler-row", children: [
            /* @__PURE__ */ d.jsx("div", { className: "rts-label rts-ruler-label", children: "TIME" }),
            /* @__PURE__ */ d.jsx("div", { className: "rts-ruler-track", children: Ne.map((R) => /* @__PURE__ */ d.jsx("span", { className: `rts-tick ${R.major ? "rts-tick-major" : ""}`, style: { left: `${R.time * st}px` }, children: R.major && /* @__PURE__ */ d.jsx("span", { className: "rts-tick-label", children: Qy(R.time, st) }) }, R.time)) })
          ] }),
          Y.length > 0 && /* @__PURE__ */ d.jsxs("div", { className: "rts-lane rts-lane-loops", children: [
            /* @__PURE__ */ d.jsxs("div", { className: "rts-label", children: [
              /* @__PURE__ */ d.jsx("div", { className: "rts-title", children: "LOOPS" }),
              /* @__PURE__ */ d.jsx("div", { className: "rts-meta", children: "Select a region, enable, then Play" })
            ] }),
            /* @__PURE__ */ d.jsx("div", { className: "rts-track", children: Y.map((R) => {
              const vt = ka(R);
              return /* @__PURE__ */ d.jsx(
                "button",
                {
                  type: "button",
                  className: "rts-loop-region",
                  "aria-pressed": Qt === R.id,
                  "aria-label": `Select ${R.label || R.id}`,
                  onClick: () => te(R.id),
                  title: `${R.label || R.id}: [${R.startSample}, ${R.endSample}) at ${R.sampleRate} Hz`,
                  style: { left: `${vt.start * st}px`, width: `${vt.duration * st}px` },
                  children: R.label || R.id
                },
                R.id
              );
            }) })
          ] }),
          Ft && /* @__PURE__ */ d.jsx(
            "div",
            {
              className: `rts-loop-shade ${St ? "" : "is-disabled"}`,
              "aria-hidden": "true",
              style: { left: `${Z + Ft.start * st}px`, width: `${Ft.duration * st}px` }
            }
          ),
          /* @__PURE__ */ d.jsx("div", { className: "rts-lanes", children: h.map((R) => {
            const vt = R.content, Tt = vt.type === "audio" ? vt : null, de = J[R.id] ?? Tt?.view ?? "both", ie = Tt ? o0(de, !!Tt.waveform, !!Tt.spectrogram) : "both", O = k ? pt[R.id] ?? Xu(R.height) : R.height, I = typeof R.title == "string" ? R.title : R.id;
            return /* @__PURE__ */ d.jsxs(
              "div",
              {
                "data-lane-id": R.id,
                className: `rts-lane rts-lane-${R.kind ?? "default"} ${R.className ?? ""}`,
                style: O ? { "--rts-lane-height": `${O}px` } : void 0,
                children: [
                  /* @__PURE__ */ d.jsxs("div", { className: "rts-label", children: [
                    /* @__PURE__ */ d.jsx("div", { className: "rts-title", children: R.title }),
                    R.meta && /* @__PURE__ */ d.jsx("div", { className: "rts-meta", children: R.meta }),
                    k && /* @__PURE__ */ d.jsxs("div", { className: "rts-lane-controls", children: [
                      Tt && /* @__PURE__ */ d.jsxs("label", { children: [
                        "View ",
                        /* @__PURE__ */ d.jsxs(
                          "select",
                          {
                            "aria-label": `View for ${I}`,
                            value: ie,
                            onChange: (Mt) => ct((Ot) => ({ ...Ot, [R.id]: Mt.target.value })),
                            children: [
                              /* @__PURE__ */ d.jsx("option", { value: "waveform", disabled: !Tt.waveform, children: "Waveform" }),
                              /* @__PURE__ */ d.jsx("option", { value: "spectrogram", disabled: !Tt.spectrogram, children: "Spectrogram" }),
                              /* @__PURE__ */ d.jsx("option", { value: "both", disabled: !Tt.waveform || !Tt.spectrogram, children: "Both" })
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
                            min: r0,
                            max: f0,
                            step: "1",
                            "aria-label": `Height for ${I}`,
                            value: O,
                            onChange: (Mt) => ot((Ot) => ({ ...Ot, [R.id]: Xu(Number(Mt.target.value)) }))
                          }
                        ),
                        /* @__PURE__ */ d.jsxs("output", { children: [
                          O,
                          "px"
                        ] })
                      ] }),
                      /* @__PURE__ */ d.jsx(
                        "button",
                        {
                          type: "button",
                          className: "rts-height-reset",
                          "aria-label": `Reset height for ${I}`,
                          onClick: () => ot((Mt) => ({ ...Mt, [R.id]: Xu(R.height) })),
                          children: "Reset height"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ d.jsx("div", { className: "rts-track", children: Tt ? /* @__PURE__ */ d.jsx(Gy, { content: Tt, duration: et, view: ie }) : /* @__PURE__ */ d.jsx(ff, { content: vt, duration: et }) })
                ]
              },
              R.id
            );
          }) }),
          hl.length > 0 && /* @__PURE__ */ d.jsx("div", { className: "rts-grid", "aria-hidden": "true", children: hl.map((R, vt) => /* @__PURE__ */ d.jsx("span", { className: `rts-grid-line ${R.emphasis ? "rts-grid-line-emphasis" : ""} ${R.className ?? ""}`, style: { left: `${R.time * st}px` } }, `${R.time}-${vt}`)) }),
          /* @__PURE__ */ d.jsx("div", { className: "rts-playhead", style: { left: `${Z + it * st}px` }, "aria-hidden": "true" })
        ] }) }) }),
        /* @__PURE__ */ d.jsxs("footer", { className: "rts-footer", children: [
          /* @__PURE__ */ d.jsxs("div", { children: [
            j,
            mt && /* @__PURE__ */ d.jsx("div", { className: "rts-navigation-help", children: "Wheel: time · Ctrl/⌘ + wheel: time zoom · Alt + wheel: channel height · Shift + wheel: channel scroll" })
          ] }),
          /* @__PURE__ */ d.jsxs("output", { className: "rts-window", children: [
            Sa(xt.start),
            " — ",
            Sa(xt.end)
          ] })
        ] })
      ]
    }
  );
}
const uf = /\.(wav|flac|mp3|ogg|opus|m4a|aif|aiff)$/i;
function a0(c) {
  return c === "__source__" || c.startsWith("input/") ? "master" : c.startsWith("stems/") ? c.slice(6).replace(uf, "") : c.startsWith("speech/") && uf.test(c) ? c.replace(uf, "") : null;
}
function Ky(c) {
  const o = /* @__PURE__ */ new Map(), r = [], s = /* @__PURE__ */ new Map();
  for (const m of c) for (const b of Array.isArray(m.sourceMap) ? m.sourceMap : [])
    if (typeof b?.audio == "string" && typeof b.data == "string") {
      const _ = a0(b.audio.replace(/\\/g, "/"));
      _ && (s.set(b.data.replace(/\\/g, "/"), _), typeof b.png == "string" && s.set(b.png.replace(/\\/g, "/"), _));
    }
  const h = (m) => (o.has(m) || o.set(m, { key: m }), o.get(m));
  for (const m of c) {
    const b = (m.id?.replace(/^file:/, "") || "").replace(/\\/g, "/"), _ = a0(b), C = b.startsWith("spectrograms/") ? s.get(b) || b.slice(13).replace(/\.(npz|png)$/i, "") : null;
    if (_ && (m.content?.type === "waveform" || m.content?.type === "artifact")) {
      const A = h(_);
      (!A.audio || m.id === "__source__") && (A.audio = m);
    } else C && b.endsWith(".npz") && m.content?.type === "image" ? h(C).spectrum = m : C && b.endsWith(".png") && m.content?.type === "image" ? h(C).png = m : r.push(m);
  }
  for (const m of o.values()) {
    if (!m.audio && !m.spectrum) {
      m.png && r.push(m.png);
      continue;
    }
    const b = m.audio || m.spectrum, _ = m.audio?.content?.type === "waveform" ? m.audio.content : null, C = m.audio?.content?.type === "artifact" ? m.audio.content.note : null;
    r.push({
      ...b,
      id: m.key === "master" ? "__source__" : `audio:${m.key}`,
      title: m.key === "master" ? "MASTER · uploaded source" : m.key.replace(/\//g, " · ").replace(/_/g, " "),
      kind: "audio",
      height: 160,
      meta: C || (_ && m.spectrum ? "waveform + aligned spectrogram" : _ ? "waveform · spectrogram pending" : "spectrogram · waveform pending"),
      content: {
        type: "audio",
        view: "both",
        waveform: _ ? { min: _.min, max: _.max, colour: _.colour } : void 0,
        spectrogram: m.spectrum ? { src: m.spectrum.content.src, alt: m.spectrum.content.alt } : void 0
      }
    }), !m.spectrum && m.png && r.push(m.png);
  }
  return r;
}
const of = (c) => typeof c == "number" && Number.isFinite(c) && c > 0, Jy = { canonical: "Canonical", combined: "Consensus · observed tempo", combined_family: "Consensus · canonical tempo family", combined_fit: "Consensus · fitted constant grid" };
function n0(c, o, r, s) {
  if (!of(c) || !Number.isFinite(o) || o < 0 || !Number.isFinite(r) || r <= 0) return [];
  const h = Math.max(0, Math.floor((r - o) * c / 60 + 1e-9) + 1), m = Math.max(1, Math.ceil(h / 25e3));
  return Array.from({ length: Math.ceil(h / m) }, (b, _) => {
    const C = _ * m;
    return {
      time: o + C * 60 / c,
      emphasis: C === 0,
      label: `${s === "original" ? "Original" : "Aligned"} beat ${C + 1}${C === 0 && s === "aligned" ? " · pip 0" : ""}`,
      className: `stemlab-grid-${s}`
    };
  });
}
function $y(c, o, r, s = "canonical", h = "consensus") {
  const m = c?.schema === "stemlab.beat-offsets.v1" && c.pips_per_beat === 64;
  let b = m ? (c.bpm_bases || []).filter((B) => B.status === "available" && of(B.bpm)) : [];
  !b.length && of(o) && (b = [{ id: "canonical", bpm: o }]);
  const _ = b.find((B) => B.id === s) || b.find((B) => B.id === "combined_fit") || b[0] || null, C = m ? (c.analyses || []).filter((B) => B.status === "available") : [], A = C.find((B) => B.analysis_id === h) || C.find((B) => B.kind === "consensus") || C[0] || null, N = _ && A ? c.comparisons?.find((B) => B.status === "available" && B.bpm_basis === _.id && B.analysis_id === A.analysis_id) : null, g = _ ? n0(_.bpm, 0, r, "original") : [], j = N && Number.isFinite(N.beat_zero_seconds) ? n0(N.bpm, N.beat_zero_seconds, r, "aligned") : [];
  return {
    bases: b.map((B) => ({ ...B, label: `${Jy[B.id] || B.id}${B.multiplier ? ` ×${B.multiplier}` : ""} · ${B.bpm.toFixed(4)} BPM` })),
    basis: _,
    analysis: A,
    analyses: C,
    row: N,
    original: g,
    aligned: j,
    thinned: !!_ && Math.floor(r * _.bpm / 60) + 1 > 25e3,
    grid: [...g, ...j].sort((B, Z) => B.time - Z.time)
  };
}
function ky({ comparison: c, onBasis: o, onAnalysis: r }) {
  const { bases: s, basis: h, analyses: m, analysis: b, row: _, thinned: C } = c;
  return /* @__PURE__ */ d.jsxs("section", { className: "stemlab-beat-offset-controls", "aria-label": "BPM grid comparison", children: [
    /* @__PURE__ */ d.jsxs("div", { className: "stemlab-beat-offset-selectors", children: [
      /* @__PURE__ */ d.jsxs("label", { children: [
        "BPM grid ",
        /* @__PURE__ */ d.jsxs("select", { "aria-label": "BPM grid basis", value: h?.id || "", onChange: (A) => o(A.target.value), disabled: !s.length, children: [
          !s.length && /* @__PURE__ */ d.jsx("option", { value: "", children: "BPM unavailable" }),
          s.map((A) => /* @__PURE__ */ d.jsx("option", { value: A.id, children: A.label }, A.id))
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("label", { children: [
        "First beat from ",
        /* @__PURE__ */ d.jsxs("select", { "aria-label": "First beat analysis", value: b?.analysis_id || "", onChange: (A) => r(A.target.value), disabled: !m.length, children: [
          !m.length && /* @__PURE__ */ d.jsx("option", { value: "", children: "Detected beat unavailable" }),
          m.map((A) => /* @__PURE__ */ d.jsx("option", { value: A.analysis_id, children: A.analysis_id }, A.analysis_id))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("p", { className: "stemlab-grid-legend", children: [
      /* @__PURE__ */ d.jsx("span", { className: "stemlab-legend-original", children: "Original grid · source time 0" }),
      /* @__PURE__ */ d.jsx("span", { className: "stemlab-legend-aligned", children: "Offset grid · detected first beat = pip 0" })
    ] }),
    /* @__PURE__ */ d.jsx("output", { "aria-live": "polite", "data-testid": "beat-offset-value", children: _ ? `${_.offset_pips.toFixed(6)} pips · first detected beat ${_.first_beat_seconds.toFixed(6)}s · nearest whole offset ${_.integer_offset_pips} pips (${(_.integer_residual_seconds * 1e3).toFixed(3)} ms residual)` : "Waiting for usable beat evidence; no aligned grid is inferred." }),
    b?.constant_grid_fit && /* @__PURE__ */ d.jsxs("p", { className: "small", children: [
      "Selected detector fit: ",
      b.constant_grid_fit.proposed_bpm.toFixed(4),
      " BPM · 95% beat error ",
      b.constant_grid_fit.p95_absolute_beat_error_ms.toFixed(3),
      " ms · grade ",
      b.constant_grid_fit.precision_grade,
      ".",
      h?.fit ? ` Consensus grid fit grade: ${h.fit.precision_grade}.` : ""
    ] }),
    /* @__PURE__ */ d.jsxs("p", { className: "small", children: [
      "Half- and double-time readings are normal. Observed beats stay in their own lanes; tempo-family options compare ×½ / ×1 / ×2 interpretations. Constant grids and detector phases remain estimates.",
      C ? " Dense grids are thinned for display only." : ""
    ] })
  ] });
}
const Fy = "stemlab.beat-timeline.v1", Zu = 64, Ol = (c) => Number.isSafeInteger(c);
function _c(c) {
  if (!c || c.schema !== Fy || c.pips_per_beat !== Zu || !Number.isSafeInteger(c.source_audio?.sample_rate) || c.source_audio.sample_rate < 1 || !Number.isSafeInteger(c.source_audio?.num_frames) || c.source_audio.num_frames < 2 || !/^[0-9a-f]{64}$/.test(c.source_audio?.sha256 || "") || !/^[0-9a-f]{64}$/.test(c.consensus_sha256 || "") || !Array.isArray(c.beats) || c.beats.length < 2 || c.beats.length > 25e3 || !Ol(c.origin_beat)) throw new Error("Not a valid source-bound StemLab beat timeline");
  const o = { beat: -1, frame: -1 };
  for (const r of c.beats) {
    if (!Ol(r.beat) || !Ol(r.frame) || r.beat <= o.beat || r.frame <= o.frame || r.frame >= c.source_audio.num_frames || !["consensus", "corrected", "manual"].includes(r.source) || r.reference_frame !== null && (!Ol(r.reference_frame) || r.reference_frame < 0 || r.reference_frame >= c.source_audio.num_frames) || r.source === "consensus" && r.frame !== r.reference_frame || r.source === "manual" && r.reference_frame !== null)
      throw new Error("Beat indices and source sample frames must increase; original consensus timestamps stay immutable");
    o.beat = r.beat, o.frame = r.frame;
  }
  if (!c.beats.some((r) => r.beat === c.origin_beat)) throw new Error("Beat 1 must identify a real anchor");
  return c;
}
const Wa = (c) => ({ ...c, beats: c.beats.map((o) => ({ ...o })) }), Ia = (c) => _c(c), Wy = (c, o) => c.beats[o].frame / c.source_audio.sample_rate, Zn = (c, o) => o < 0 || o + 1 >= c.beats.length ? null : 60 * c.source_audio.sample_rate * (c.beats[o + 1].beat - c.beats[o].beat) / (c.beats[o + 1].frame - c.beats[o].frame), g0 = (c, o) => Math.round(o * c.source_audio.sample_rate);
function u0(c, o, r) {
  const s = Wa(c);
  if (!Ol(o) || o < 0 || o >= s.beats.length) throw new Error("Select a beat");
  const h = g0(s, r), m = s.beats[o - 1]?.frame ?? -1, b = s.beats[o + 1]?.frame ?? s.source_audio.num_frames;
  if (!Ol(h) || h <= m || h >= b) throw new Error("Beat must remain between its neighbours");
  const _ = s.beats[o];
  return _.frame = h, _.source = h === _.reference_frame ? "consensus" : _.reference_frame === null ? "manual" : "corrected", Ia(s);
}
function Iy(c, o, r) {
  if (!Number.isFinite(r) || r <= 0 || r > 1200) throw new Error("BPM must be 0..1200");
  const s = Wa(c);
  if (!Ol(o) || o < 0 || o + 1 >= s.beats.length) throw new Error("Choose an interval");
  const h = s.beats[o], m = s.beats[o + 1], b = Math.round(60 * (m.beat - h.beat) * s.source_audio.sample_rate / r);
  if (b < 1) throw new Error("BPM exceeds available sample precision");
  const _ = h.frame + b - m.frame;
  for (let C = o + 1; C < s.beats.length; C++) {
    const A = s.beats[C];
    A.frame += _, A.source = A.reference_frame === null ? "manual" : A.frame === A.reference_frame ? "consensus" : "corrected";
  }
  return Ia(s);
}
function Py(c, o) {
  if (!Number.isFinite(o) || Math.abs(o) > 1e5) throw new Error("Phase shift is out of bounds");
  const r = Wa(c), s = Zn(r, 0), h = Math.round(o / Zu * (60 / s) * r.source_audio.sample_rate);
  for (const m of r.beats)
    m.frame += h, m.source = m.reference_frame === null ? "manual" : m.frame === m.reference_frame ? "consensus" : "corrected";
  return Ia(r);
}
function i0(c, o) {
  const r = Wa(c), s = g0(r, o);
  if (!Ol(s) || s < 0 || s >= r.source_audio.num_frames) throw new Error("Beat outside source");
  let h = r.beats.findIndex((A) => A.frame > s);
  if (h < 0 && (h = r.beats.length), h === 0 || h === r.beats.length || r.beats[h - 1].frame === s)
    throw new Error("Insert between two existing anchors; use the timeline selection to move end beats");
  const m = r.beats[h - 1], b = r.beats[h], _ = b.beat - m.beat > 1, C = m.beat + 1;
  if (!_) {
    r.origin_beat >= b.beat && (r.origin_beat += 1);
    for (let A = h; A < r.beats.length; A++) r.beats[A].beat += 1;
  }
  return r.beats.splice(h, 0, { beat: C, frame: s, source: "manual", reference_frame: null }), Ia(r);
}
function tb(c, o) {
  const r = Wa(c);
  if (!Ol(o) || o < 0 || o >= r.beats.length || r.beats.length <= 2)
    throw new Error("Keep at least two beat anchors");
  const [s] = r.beats.splice(o, 1);
  return s.beat === r.origin_beat && (r.origin_beat = r.beats[Math.min(o, r.beats.length - 1)].beat), Ia(r);
}
function eb(c, o) {
  const r = Wa(c);
  if (!Ol(o) || o < 0 || o >= r.beats.length) throw new Error("Select Beat 1");
  return r.origin_beat = r.beats[o].beat, Ia(r);
}
function lb(c) {
  const o = Wa(c);
  for (const r of o.beats) r.reference_frame !== null && (r.frame = r.reference_frame, r.source = "consensus");
  return Ia(o);
}
function ab(c) {
  const o = Zn(c, 0), r = c.beats.find((s) => s.beat === c.origin_beat);
  return c.beats.map((s) => ({
    time: s.frame / c.source_audio.sample_rate,
    value: Zu * (s.beat - c.origin_beat) - (s.frame - r.frame) * o * Zu / (c.source_audio.sample_rate * 60)
  }));
}
function nb(c, o, r = 3e3) {
  if (!c?.beats?.length) return [];
  const s = c.source_audio.sample_rate, h = Number.isFinite(o?.start) ? o.start : 0, m = Number.isFinite(o?.end) && o.end > h ? o.end : Number.MAX_VALUE, b = c.beats.filter((C) => C.frame / s >= h - 0.05 && C.frame / s <= m + 0.05), _ = Math.max(1, Math.ceil(b.length / r));
  return b.filter((C, A) => A % _ === 0).map((C) => ({
    time: C.frame / s,
    emphasis: C.beat === c.origin_beat,
    label: `Corrected beat ${C.beat} · native pip ${(C.beat - c.origin_beat) * Zu}`,
    className: "stemlab-grid-corrected"
  }));
}
const Qu = 20, df = 400, y0 = (c, o, r) => Math.max(o, Math.min(r, c)), c0 = (c) => 100 * (1 - Math.log(y0(c, Qu, df) / Qu) / Math.log(df / Qu)), ub = (c, o) => Qu * (df / Qu) ** y0(1 - (c - o.top) / o.height, 0, 1);
async function cf(c, o = "GET", r) {
  const s = await fetch(
    `/api/${c}/beat-timeline${o === "POST" ? "/preview" : ""}`,
    { method: o, headers: { "Content-Type": "application/json" }, body: r === void 0 ? void 0 : JSON.stringify(r), cache: "no-store" }
  ), h = await s.json().catch(() => ({}));
  if (!s.ok) throw new Error(h.detail || `Beat timeline HTTP ${s.status}`);
  return h;
}
function ib({ map: c, duration: o, visible: r, selected: s, onSelect: h, onEdit: m, onInsert: b }) {
  const _ = c.source_audio.sample_rate, A = c.beats.map((g, j) => ({ row: g, i: j })).filter(({ row: g }) => {
    const j = g.frame / _;
    return j >= r.start - 0.1 && j <= r.end + 0.1;
  }), N = Math.max(1, Math.ceil(A.length / 2e3));
  return /* @__PURE__ */ d.jsx(
    "div",
    {
      className: "stemlab-beatmap-track",
      "aria-label": "Editable sample-accurate beat anchors",
      onDoubleClick: (g) => {
        if (g.target !== g.currentTarget) return;
        const j = g.currentTarget.getBoundingClientRect();
        b((g.clientX - j.left) / j.width * o), g.stopPropagation();
      },
      children: A.filter((g, j) => j % N === 0).map(({ row: g, i: j }) => /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          className: `stemlab-beatmap-anchor ${g.source} ${s === j ? "selected" : ""} ${g.beat === c.origin_beat ? "origin" : ""}`,
          "aria-label": `Beat ${g.beat}, ${Wy(c, j).toFixed(6)} seconds, ${g.source}; drag or use arrow keys`,
          "aria-pressed": s === j,
          title: `Beat ${g.beat}: frame ${g.frame} · ${(g.frame / _).toFixed(6)} s · ${g.source}${g.reference_frame === null ? "" : ` · reference ${g.reference_frame}`}`,
          style: { left: `${g.frame / (_ * Math.max(o, 1e-9)) * 100}%` },
          onPointerDown: (B) => {
            B.currentTarget.setPointerCapture(B.pointerId), h(j), B.stopPropagation();
          },
          onPointerMove: (B) => {
            if (!B.currentTarget.hasPointerCapture(B.pointerId)) return;
            const Z = B.currentTarget.parentElement.getBoundingClientRect();
            m(j, (B.clientX - Z.left) / Z.width * o), B.stopPropagation();
          },
          onPointerUp: (B) => {
            B.currentTarget.releasePointerCapture(B.pointerId), B.stopPropagation();
          },
          onClick: (B) => {
            h(j), B.stopPropagation();
          },
          onKeyDown: (B) => {
            if (B.key !== "ArrowLeft" && B.key !== "ArrowRight") return;
            B.preventDefault(), B.stopPropagation();
            const Z = B.shiftKey ? Math.max(1, Math.round(_ / 1e3)) : 1;
            m(j, (g.frame + (B.key === "ArrowLeft" ? -Z : Z)) / _);
          },
          children: /* @__PURE__ */ d.jsx("span", { children: g.beat === c.origin_beat ? "1" : "" })
        },
        g.beat
      ))
    }
  );
}
function cb({ map: c, duration: o, visible: r, selected: s, onSelect: h, onTempo: m }) {
  const b = c.source_audio.sample_rate, _ = c.beats.slice(0, -1).map((N, g) => ({
    i: g,
    start: N.frame / b,
    end: c.beats[g + 1].frame / b,
    bpm: Zn(c, g)
  })).filter((N) => N.end >= r.start && N.start <= r.end), C = Math.max(1, Math.ceil(_.length / 1800)), A = _.filter((N, g) => g % C === 0);
  return /* @__PURE__ */ d.jsxs("div", { className: "stemlab-beatmap-tempo", "aria-label": "Editable local BPM envelope", children: [
    /* @__PURE__ */ d.jsx("svg", { className: "stemlab-beatmap-tempo-line", viewBox: "0 0 1000 100", preserveAspectRatio: "none", "aria-hidden": "true", children: /* @__PURE__ */ d.jsx(
      "polyline",
      {
        points: A.map((N) => `${(N.start + N.end) / 2 / Math.max(o, 1e-9) * 1e3},${c0(N.bpm)}`).join(" "),
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
    A.map((N) => /* @__PURE__ */ d.jsx(
      "button",
      {
        type: "button",
        className: `stemlab-beatmap-tempo-node ${s === N.i ? "selected" : ""}`,
        style: { left: `${(N.start + N.end) / 2 / Math.max(o, 1e-9) * 100}%`, top: `${c0(N.bpm)}%` },
        title: `Interval ${N.i} → ${N.i + 1}: ${N.bpm.toFixed(3)} BPM · drag vertically to change local tempo`,
        "aria-label": `BPM envelope interval ${N.i}: ${N.bpm.toFixed(3)} BPM`,
        "aria-pressed": s === N.i,
        onPointerDown: (g) => {
          g.currentTarget.setPointerCapture(g.pointerId), h(N.i), g.stopPropagation();
        },
        onPointerMove: (g) => {
          if (!g.currentTarget.hasPointerCapture(g.pointerId)) return;
          const j = g.currentTarget.parentElement.getBoundingClientRect();
          m(N.i, ub(g.clientY, j)), g.stopPropagation();
        },
        onPointerUp: (g) => {
          g.currentTarget.releasePointerCapture(g.pointerId), g.stopPropagation();
        },
        onClick: (g) => {
          h(N.i), g.stopPropagation();
        },
        onKeyDown: (g) => {
          g.key !== "ArrowUp" && g.key !== "ArrowDown" || (g.preventDefault(), g.stopPropagation(), m(N.i, Math.max(0.01, N.bpm + (g.key === "ArrowUp" ? 1 : -1) * (g.shiftKey ? 0.01 : 1))));
        },
        children: N.bpm.toFixed(1)
      },
      N.i
    ))
  ] });
}
function sb(c, o, r = !0) {
  const [s, h] = U.useState(null), [m, b] = U.useState(!1), [_, C] = U.useState(null), [A, N] = U.useState(!1), [g, j] = U.useState(!1), [B, Z] = U.useState(!0), [lt, k] = U.useState(0), [mt, Q] = U.useState({ start: 0, end: 1 / 0 }), [X, Nt] = U.useState(!1), [Et, At] = U.useState(!0), [K, dt] = U.useState(""), [Gt, at] = U.useState("0"), [et, ft] = U.useState(""), [Qt, kt] = U.useState(!1), [St, q] = U.useState([]), [Y, L] = U.useState([]), $ = U.useRef(null), it = U.useRef(0), Zt = U.useRef(null);
  Zt.current = s;
  const Ft = U.useCallback(async (G = !1) => {
    if (!(A && !G && !window.confirm("Discard unsaved beat edits and reload the saved map?")))
      try {
        const nt = await cf(c);
        if (!nt.available) {
          j(!1);
          return;
        }
        _c(nt.map), h(nt.map), j(!0), b(nt.saved), C(nt.revision), N(!1), q([]), L([]), k(0), dt(Zn(nt.map, 0)?.toFixed(3) || ""), ft(nt.saved ? "Loaded saved beat corrections" : "Prepared an editable proposal at exact consensus sample frames");
      } catch (nt) {
        nt.message.includes("HTTP 404") && !Zt.current ? Z(!1) : ft(nt.message);
      }
  }, [c, A]);
  U.useEffect(() => {
    if (!r) return;
    let G = !0;
    const nt = async () => {
      G && await Ft(!0);
    };
    nt();
    const st = window.setInterval(() => {
      G && !Zt.current && nt();
    }, 5e3);
    return () => {
      G = !1, window.clearInterval(st);
    };
  }, [c]);
  const te = U.useCallback((G) => {
    try {
      const nt = Zt.current;
      if (!nt) return;
      const st = G(nt);
      nt.review_status === "artist_confirmed" && st.review_status === "artist_confirmed" && (st.beats !== nt.beats || st.origin_beat !== nt.origin_beat) && (st.review_status = "estimated"), _c(st), h(st), N(!0), q((Re) => [...Re.slice(-59), nt]), L([]), ft("Unsaved beat-map edits · original consensus unchanged");
    } catch (nt) {
      ft(nt.message);
    }
  }, []), p = () => {
    St.length && (L((G) => [...G.slice(-59), s]), h(St.at(-1)), q((G) => G.slice(0, -1)), N(!0));
  }, H = () => {
    Y.length && (q((G) => [...G.slice(-59), s]), h(Y.at(-1)), L((G) => G.slice(0, -1)), N(!0));
  }, F = (G) => {
    k(G), dt(Zn(Zt.current, G)?.toFixed(3) || "");
  }, P = async (G) => {
    const nt = await cf(c, "POST", G);
    return _c(nt), nt;
  }, ht = async () => {
    if (s) {
      kt(!0);
      try {
        const G = await cf(c, "PUT", { map: s, expected_revision: _ });
        h(G.map), b(!0), C(G.revision), N(!1), q([]), L([]), ft("Beat corrections saved separately from the consensus detections");
      } catch (G) {
        ft(G.message);
      } finally {
        kt(!1);
      }
    }
  }, pt = async (G) => {
    if (s) {
      kt(!0);
      try {
        const nt = await P(s), st = JSON.stringify(nt, null, 2);
        if (G === "copy")
          await navigator.clipboard.writeText(st), ft("Copied one complete beat-timeline JSON value with Beat 1 and pip phase synchronisation");
        else {
          const Re = new Blob([st + `
`], { type: "application/json" }), Ne = URL.createObjectURL(Re), xe = document.createElement("a");
          xe.href = Ne, xe.download = `stemlab-beat-timeline-${c.slice(0, 12)}.json`, document.body.appendChild(xe), xe.click(), xe.remove(), URL.revokeObjectURL(Ne), ft("Exported a single source-bound beat-timeline JSON file");
        }
      } catch (nt) {
        ft(nt.message);
      } finally {
        kt(!1);
      }
    }
  }, ot = async (G) => {
    const nt = G.target.files?.[0];
    if (G.target.value = "", !!nt) {
      if (nt.size > 32 * 1024 * 1024) {
        ft("Import limited to 32 MiB");
        return;
      }
      kt(!0);
      try {
        const st = JSON.parse(await nt.text()), Re = await P(st);
        h(Re), N(!0), q((Ne) => s ? [...Ne.slice(-59), s] : Ne), L([]), ft("Imported and validated: review changes before saving. Original consensus unchanged.");
      } catch (st) {
        ft(st.message);
      } finally {
        kt(!1);
      }
    }
  }, J = (G, nt) => te((st) => Iy(st, G, nt)), ct = () => te((G) => lb(G)), Wt = s && X && o > 0 ? [
    {
      id: "corrected:anchors",
      title: "Corrected beats",
      kind: "beatmap",
      height: 80,
      meta: "Drag to place · arrows: 1 sample · Shift: 1 ms · double-click empty space to insert",
      content: { type: "custom", node: /* @__PURE__ */ d.jsx(
        ib,
        {
          map: s,
          duration: o,
          visible: mt,
          selected: lt,
          onSelect: F,
          onEdit: (G, nt) => te((st) => u0(st, G, nt)),
          onInsert: (G) => te((nt) => i0(nt, G))
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
        cb,
        {
          map: s,
          duration: o,
          visible: mt,
          selected: lt,
          onSelect: F,
          onTempo: J
        }
      ) }
    },
    {
      id: "corrected:phase",
      title: "Phase CV",
      kind: "beatmap",
      height: 80,
      meta: "Relative pips vs the opening tempo · visible irregular drift",
      content: { type: "curve", points: ab(s).filter((G, nt) => nt % Math.max(1, Math.ceil(s.beats.length / 4e3)) === 0), colour: "#ecb7fd" }
    }
  ] : [], le = s && Et ? nb(s, mt) : [], wt = s?.beats?.[Math.min(lt, s.beats.length - 1)], It = s?.source_audio?.sample_rate || 1, $t = s && lt < s.beats.length - 1 ? Zn(s, lt) : null, xt = /* @__PURE__ */ d.jsxs("section", { className: "stemlab-beatmap-panel", "aria-label": "Editable variable tempo and Beat 1 phase", children: [
    /* @__PURE__ */ d.jsxs("header", { children: [
      /* @__PURE__ */ d.jsx("strong", { children: "Beat correction · variable BPM & phase" }),
      s && /* @__PURE__ */ d.jsxs("span", { children: [
        s.beats.length.toLocaleString(),
        " anchors · ",
        m ? "saved" : "consensus draft",
        A ? " · unsaved changes" : ""
      ] }),
      /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => Nt((G) => !G), children: X ? "Hide editor" : "Show editor" })
    ] }),
    X && s && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
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
              value: wt?.beat ?? 0,
              onChange: (G) => {
                const nt = s.beats.findIndex((st) => st.beat === Number(G.target.value));
                nt >= 0 && F(nt);
              }
            }
          )
        ] }),
        /* @__PURE__ */ d.jsxs("output", { children: [
          "Frame ",
          wt?.frame ?? 0,
          " · ",
          wt ? (wt.frame / It).toFixed(6) : "0",
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
              value: K,
              onChange: (G) => dt(G.target.value),
              onKeyDown: (G) => {
                G.key === "Enter" && J(lt, Number(K));
              }
            }
          )
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: lt >= s.beats.length - 1, onClick: () => J(lt, Number(K)), children: "Apply BPM" }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Phase shift (pips) ",
          /* @__PURE__ */ d.jsx(
            "input",
            {
              "aria-label": "Global phase shift pips",
              type: "number",
              step: "0.25",
              value: Gt,
              onChange: (G) => at(G.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => te((G) => Py(G, Number(Gt))), children: "Shift all beats" })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-beatmap-actions", children: [
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => te((G) => u0(G, lt, it.current)), children: "Place selected at playhead" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => te((G) => i0(G, it.current)), children: "Insert at playhead" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => te((G) => eb(G, lt)), children: "Set selected as Beat 1" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => te((G) => tb(G, lt)), children: "Delete selected" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: !St.length, onClick: p, children: "Undo" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: !Y.length, onClick: H, children: "Redo" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: ct, children: "Match consensus beats" }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          /* @__PURE__ */ d.jsx("input", { type: "checkbox", checked: Et, onChange: (G) => At(G.target.checked) }),
          "Corrected grid"
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          /* @__PURE__ */ d.jsx(
            "input",
            {
              type: "checkbox",
              checked: s.review_status === "artist_confirmed",
              onChange: (G) => te((nt) => ({ ...nt, review_status: G.target.checked ? "artist_confirmed" : "estimated" }))
            }
          ),
          "Artist-reviewed Beat 1 / phase"
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-beatmap-export", children: [
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: Qt || !A, onClick: ht, children: "Save corrections" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: Qt, onClick: () => pt("download"), children: "Export Beat 1 + full beat timeline JSON" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: Qt, onClick: () => pt("copy"), children: "Copy JSON value" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: Qt, onClick: () => $.current?.click(), children: "Import JSON" }),
        /* @__PURE__ */ d.jsx("input", { ref: $, type: "file", accept: ".json,application/json", hidden: !0, onChange: ot }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => Ft(), children: "Reload saved/consensus" })
      ] }),
      /* @__PURE__ */ d.jsxs("small", { children: [
        "Current local BPM: ",
        $t?.toFixed(3) ?? "last anchor",
        " · original consensus matches remain labelled separately. Native timebase: 64 pips/beat, imported DanceMoves clocks use 16 ticks/beat. DanceMoves supports optional beat-timeline.v1 variable playback where its new consumer is installed; beat-alignment.v1 remains a separate fixed-tempo format."
      ] })
    ] }),
    !g && X && /* @__PURE__ */ d.jsx("p", { children: "Waiting for an available consensus beat list (and exact master audio). No timing is invented." }),
    et && /* @__PURE__ */ d.jsx("output", { role: "status", className: "stemlab-beatmap-status", children: et })
  ] });
  return {
    map: s,
    revision: _,
    saved: m,
    ready: g,
    dirty: A,
    lanes: Wt,
    grid: le,
    panel: B ? xt : null,
    onWindowChange: Q,
    onTimeChange: (G) => {
      it.current = G;
    }
  };
}
const mf = Object.freeze(["SECTION", "ENTRY", "DROP", "BREAK"]), Vu = Object.freeze([
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
]), $a = (c, o) => Math.round(Number(c) * o);
function yf(c, o) {
  const r = String(c).trim().toUpperCase(), s = String(o).trim().toUpperCase().replace(/ +/g, " ");
  if (!mf.includes(r)) throw new Error("Cue type must be SECTION, ENTRY, DROP or BREAK");
  const h = /^([A-Z][A-Z -]*?)(?: ([1-9][0-9]{0,2}|A|B|FINAL))?$/.exec(s);
  if (!h || !Vu.includes(h[1]) || s.length > 64)
    throw new Error("Use a standard section (INTRO, VERSE 1, CHORUS, BUILD 1, DROP 1, OUTRO, etc.)");
  return { type: r, section: s, label: `[${r}: ${s}]` };
}
const bf = (c) => ({ ...c, lines: c.lines.map((o) => ({ ...o })), words: c.words.map((o) => ({ ...o })), cues: c.cues.map((o) => ({ ...o })), fixed_clock: { ...c.fixed_clock } });
function Qn(c, o, r, s) {
  if (!Number.isSafeInteger(c) || c < o || c > r) throw new Error(`${s} cannot cross its parent, another event or source duration`);
  return c;
}
function rb(c, o = "start_frame") {
  return c.every((r, s) => s === 0 || r[o] >= c[s - 1][o]);
}
function fb(c, o, r) {
  const s = bf(c), h = c.sample_rate, m = c.num_frames;
  if (!Number.isSafeInteger(h) || !Number.isSafeInteger(m) || h < 1 || m < 2) throw new Error("Invalid source-frame metadata");
  if (o === "cue") {
    const b = s.cues.findIndex((N) => N.id === r.id);
    if (b < 0) throw new Error("Cue not found");
    const _ = s.cues[b], C = yf(r.type ?? _.type, r.section ?? _.section), A = Qn($a(r.start, h), 0, m - 1, "Cue");
    if (s.cues[b] = { ...s.cues[b], frame: A, type: C.type, section: C.section }, !rb(s.cues, "frame")) throw new Error("Cue movement must preserve chronological order");
  } else if (o === "line") {
    const b = s.lines.findIndex((j) => j.id === r.id);
    if (b < 0) throw new Error("Lyric line not found");
    const _ = s.lines[b], C = Qn($a(r.start, h), 0, m - 1, "Line"), A = Qn($a(r.end, h), C + 1, m, "Line");
    if (b > 0 && C < s.lines[b - 1].end_frame || b + 1 < s.lines.length && A > s.lines[b + 1].start_frame)
      throw new Error("Lyric line cannot cross neighbouring line bounds");
    s.lines[b] = { ..._, start_frame: C, end_frame: A };
    const N = C - _.start_frame, g = A - C === _.end_frame - _.start_frame;
    for (const j of s.words) if (j.line_id === _.id && (g && (j.start_frame += N, j.end_frame += N), j.start_frame < C || j.end_frame > A))
      throw new Error("Line edit would cut off a word; adjust its words first");
  } else if (o === "word") {
    const b = s.words.findIndex((B) => B.id === r.id);
    if (b < 0) throw new Error("Word not found");
    const _ = s.words[b], C = s.lines.find((B) => B.id === _.line_id);
    if (!C) throw new Error("Word parent line missing");
    const A = Qn($a(r.start, h), C.start_frame, C.end_frame - 1, "Word"), N = Qn($a(r.end, h), A + 1, C.end_frame, "Word"), g = s.words.filter((B) => B.line_id === _.line_id), j = g.findIndex((B) => B.id === _.id);
    if (j > 0 && A < g[j - 1].end_frame || j + 1 < g.length && N > g[j + 1].start_frame)
      throw new Error("Word cannot overlap a neighbour within the same lyric line");
    s.words[b] = { ..._, start_frame: A, end_frame: N };
  } else throw new Error("Expected line, word or cue edit");
  return s.review_status = "draft", s;
}
function ob(c, o, r, s = {}) {
  const h = bf(c), m = c.sample_rate, b = Qn($a(r, m), 0, c.num_frames - 1, "Playhead"), _ = new Set([...c.lines, ...c.words, ...c.cues].map((N) => N.id)), C = { line: "line", word: "word", cue: "cue" }[o];
  if (!C) throw new Error("Unknown timing track");
  let A;
  for (let N = 1; N <= 1e5 && (A = `${C}-edit-${N}`, !!_.has(A)); N++)
    ;
  if (_.has(A)) throw new Error("Too many events");
  if (o === "cue") {
    const { type: N, section: g } = yf(s.type || "SECTION", s.section || "INTRO");
    h.cues.push({ id: A, frame: b, type: N, section: g }), h.cues.sort((j, B) => j.frame - B.frame);
  } else if (o === "line") {
    const N = String(s.text || "").trim();
    if (!N) throw new Error("Type lyric text before adding a line");
    const g = c.lines.find((Z) => Z.start_frame > b), j = [...c.lines].reverse().find((Z) => Z.start_frame <= b);
    if (j && b < j.end_frame) throw new Error("Playhead is inside an existing line");
    const B = Math.min(c.num_frames, g?.start_frame ?? c.num_frames, b + Math.round(m * 2));
    if (B <= b) throw new Error("No room for a new line");
    h.lines.push({ id: A, start_frame: b, end_frame: B, text: N }), h.lines.sort((Z, lt) => Z.start_frame - lt.start_frame);
  } else {
    const N = h.lines.find((k) => k.id === s.lineId);
    if (!N) throw new Error("Select a lyric line before adding its word");
    const g = String(s.word || "").trim();
    if (!g) throw new Error("Type word text before adding a word");
    if (b < N.start_frame || b >= N.end_frame) throw new Error("Playhead must be within selected lyric line");
    const j = h.words.filter((k) => k.line_id === N.id), B = j.find((k) => k.start_frame > b), Z = [...j].reverse().find((k) => k.start_frame <= b);
    if (Z && Z.end_frame > b) throw new Error("Playhead is already within another word");
    const lt = Math.min(N.end_frame, B?.start_frame ?? N.end_frame, b + Math.round(m * 0.25));
    if (lt <= b) throw new Error("No room within the selected lyric line");
    h.words.push({ id: A, line_id: N.id, start_frame: b, end_frame: lt, word: g }), h.words.sort((k, mt) => k.start_frame - mt.start_frame);
  }
  return h.review_status = "draft", h;
}
function db(c, o, r) {
  const s = bf(c), h = { line: "lines", word: "words", cue: "cues" }[o];
  if (!h) throw new Error("Invalid track");
  if (o === "line" && s.words.some((m) => m.line_id === r)) throw new Error("Delete or reassign words before deleting their line");
  return s[h] = s[h].filter((m) => m.id !== r), s.review_status = "draft", s;
}
const Sc = async (c, o = "GET", r = null, s = "") => {
  const h = await fetch(`/api/${c}/song-timing${s}`, {
    method: o,
    headers: r ? { "Content-Type": "application/json" } : void 0,
    body: r ? JSON.stringify(r) : void 0,
    cache: "no-store"
  }), m = await h.json();
  if (!h.ok) throw new Error(m.detail || `Timing edits HTTP ${h.status}`);
  return m;
}, s0 = (c, o) => c / o, Gu = (c, o) => `stemlab-${o.slice(0, 12)}-${c}`;
function mb(c, o, r) {
  const s = new Blob([c], { type: r }), h = URL.createObjectURL(s), m = document.createElement("a");
  try {
    m.href = h, m.download = o, document.body.appendChild(m), m.click(), m.remove();
  } finally {
    window.setTimeout(() => URL.revokeObjectURL(h), 1e3);
  }
}
function hb(c, o, r, s = !0) {
  const [h, m] = U.useState(null), [b, _] = U.useState(!1), [C, A] = U.useState(null), [N, g] = U.useState(!1), [j, B] = U.useState(!1), [Z, lt] = U.useState(!1), [k, mt] = U.useState({ kind: "line", id: null }), [Q, X] = U.useState(""), [Nt, Et] = U.useState(!1), [At, K] = U.useState(0.15), [dt, Gt] = U.useState(!1), [at, et] = U.useState({ start: 0, end: 1 / 0 }), [ft, Qt] = U.useState(""), [kt, St] = U.useState(""), [q, Y] = U.useState("SECTION"), [L, $] = U.useState("INTRO"), [it, Zt] = U.useState("lines"), [Ft, te] = U.useState("bundle"), p = U.useRef(0), H = U.useRef(null), F = U.useRef(null), P = U.useRef(c), ht = U.useRef(!1);
  F.current = h;
  const pt = U.useCallback(async (O = !1) => {
    if (!(!O && F.current && N && !window.confirm("Discard unsaved song timing changes?")))
      try {
        const I = await Sc(c);
        if (!I.available) {
          X(I.reason || "Waiting for exact source audio");
          return;
        }
        if (P.current !== c) return;
        m(I.document), _(I.saved), A(I.revision), g(!1), mt({ kind: "line", id: I.document.lines[0]?.id ?? null }), X(I.warnings?.join(" · ") || "Song timing loaded · source evidence unchanged");
      } catch (I) {
        X(I.message);
      }
  }, [c, N]);
  U.useEffect(() => {
    if (!s) return;
    P.current = c, m(null), A(null), g(!1), mt({ kind: "line", id: null }), pt(!0);
    const O = window.setInterval(() => {
      !F.current && !ht.current && pt(!0);
    }, 5e3);
    return () => window.clearInterval(O);
  }, [c]);
  const ot = U.useCallback((O) => {
    try {
      const I = F.current;
      if (!I) return;
      const Mt = O(I);
      m(Mt), g(!0), X("Unsaved song timing edits · original evidence preserved");
    } catch (I) {
      X(I.message);
    }
  }, []), J = h?.sample_rate || 1, ct = h ? h.num_frames / J : Math.max(0, o), Wt = h?.lines.find((O) => O.id === (k.kind === "line" ? k.id : h?.words.find((I) => I.id === k.id)?.line_id)) ?? h?.lines[0] ?? null, le = k.kind, wt = h?.[le === "line" ? "lines" : le === "word" ? "words" : "cues"].find((O) => O.id === k.id) ?? null, It = !!(r?.map?.beats?.length && r?.map?.source_audio?.sha256 === c), $t = r?.revision ?? null, xt = h?.clock_mode === "variable", G = U.useMemo(() => h ? h.clock_mode === "variable" ? It ? { ...r.map, mode: "variable" } : null : { mode: "fixed", bpm: h.fixed_clock.bpm, firstBeatSeconds: h.fixed_clock.first_beat_frame / J } : null, [h, It, r?.map, J]), nt = (O) => {
    ot((I) => ({ ...I, clock_mode: O, beat_revision: O === "variable" ? $t : null, review_status: "draft" }));
  }, st = (O, I) => ot((Mt) => ({ ...Mt, fixed_clock: { ...Mt.fixed_clock, [O]: I }, review_status: "draft" })), Re = (O, I) => ot((Mt) => fb(Mt, O, I)), Ne = (O) => ot((I) => ob(I, O, p.current, {
    text: ft,
    word: kt,
    lineId: Wt?.id,
    type: q,
    section: L
  })), xe = (O, I, Mt) => ot((Ot) => {
    if (!Mt.trim() || /\r|\n|[\x00-\x1f]/.test(Mt)) throw new Error("Text must be nonempty, without newlines");
    const Ta = O === "line" ? "lines" : "words", Ql = O === "line" ? "text" : "word";
    return { ...Ot, [Ta]: Ot[Ta].map((Pa) => Pa.id === I ? { ...Pa, [Ql]: Mt.trim() } : Pa), review_status: "draft" };
  }), hl = (O, I, Mt) => ot((Ot) => {
    const Ta = yf(I, Mt);
    return { ...Ot, cues: Ot.cues.map((Ql) => Ql.id === O ? { ...Ql, type: Ta.type, section: Ta.section } : Ql), review_status: "draft" };
  }), vl = async () => {
    if (h) {
      B(!0), ht.current = !0;
      try {
        if (xt && (r?.dirty || !It)) throw new Error("Save/reload the corrected beat map first; an enabled variable clock must refer to the current real beat map");
        const O = await Sc(c, "PUT", { document: h, expected_revision: C });
        m(O.document), A(O.revision), _(!0), g(!1), X("Saved exact source-frame corrections · original canonical, cue and ASR files unchanged");
      } catch (O) {
        X(O.message);
      } finally {
        B(!1), ht.current = !1;
      }
    }
  }, _a = async () => {
    if (h) {
      B(!0), ht.current = !0;
      try {
        if (xt && (r?.dirty || !It)) throw new Error("Save and verify the exact beat map before exporting variable-clock timing");
        const O = await Sc(c, "POST", { document: h }, "/preview"), I = {
          bundle: [JSON.stringify(O, null, 2) + `
`, Gu("timing-bundle", c) + ".json", "application/json"],
          lines: [O.line_lrc, Gu("lines", c) + ".lrc", "text/plain;charset=utf-8"],
          words: [O.word_tsv, Gu("words", c) + ".tsv", "text/tab-separated-values;charset=utf-8"],
          wordjson: [JSON.stringify(O.word_json, null, 2) + `
`, Gu("words", c) + ".json", "application/json"],
          cues: [O.cue_lrc, Gu("cues", c) + ".lrc", "text/plain;charset=utf-8"]
        };
        mb(...I[Ft]), X(`Exported ${Ft} · source-bound clock and all timing forms remain available via the bundle`);
      } catch (O) {
        X(O.message);
      } finally {
        B(!1), ht.current = !1;
      }
    }
  }, Vl = async (O) => {
    const I = O.target.files?.[0];
    if (O.target.value = "", !I || !h) return;
    if (I.size > 1048576) {
      X("Timing import limited to 1 MiB");
      return;
    }
    const Mt = I.name.split(".").at(-1).toLowerCase();
    B(!0), ht.current = !0;
    try {
      const Ot = await Sc(c, "POST", { document: h, kind: it, format: Mt, text: await I.text() }, "/import");
      m(Ot.document), g(!0), X(`Imported ${it} for review; not saved until Save corrections`);
    } catch (Ot) {
      X(Ot.message);
    } finally {
      B(!1), ht.current = !1;
    }
  }, Fe = (O) => {
    const I = O.start_frame ?? O.frame, Mt = O.end_frame ?? I;
    return I / J <= at.end + 0.01 && Mt / J >= at.start - 0.01;
  }, Ea = (O, I) => ({
    id: O.id,
    label: I === "cue" ? `[${O.type}: ${O.section}]` : I === "word" ? O.word : O.text,
    ...I === "cue" ? { type: O.type, section: O.section } : {},
    start: s0(O.start_frame ?? O.frame, J),
    ...I === "cue" ? {} : { end: s0(O.end_frame, J) },
    ...I === "word" ? { parentId: O.line_id } : {}
  }), R = h?.lines || [], vt = (h?.words || []).filter((O) => O.line_id === Wt?.id), Tt = (O, I, Mt = null) => ({
    id: `timing:${O}`,
    kind: `timing-${O}`,
    title: O === "line" ? "Lyric lines · editable" : O === "word" ? `Words · ${Wt?.text || "select a line"}` : "Cue sections · editable",
    meta: `${I.length} ${O} events · drag or arrow to adjust · ${G?.mode || "no clock"} match`,
    height: O === "word" ? 88 : 94,
    content: {
      type: "timing",
      kind: O,
      clock: G,
      editable: !0,
      snap: Nt,
      toleranceSeconds: At,
      items: I.filter(Fe).slice(0, 1600).map((Ot) => Ea(Ot, O)),
      parents: Mt ? Mt.map((Ot) => ({ id: Ot.id, start: Ot.start_frame / J, end: Ot.end_frame / J })) : void 0,
      selectedId: k.kind === O ? k.id : null,
      onSelect: (Ot) => mt({ kind: O, id: Ot }),
      onEdit: (Ot) => Re(O, Ot)
    }
  }), de = h && Z ? [
    Tt("line", R),
    Tt("word", vt, R),
    Tt("cue", h.cues)
  ] : [], ie = /* @__PURE__ */ d.jsxs("section", { className: "stemlab-timing-panel", "aria-label": "Editable lyric, word and cue timing", children: [
    /* @__PURE__ */ d.jsxs("header", { children: [
      /* @__PURE__ */ d.jsx("strong", { children: "Song timing · line lyrics, words & cue sections" }),
      /* @__PURE__ */ d.jsx("span", { children: h ? `${h.lines.length} lines · ${h.words.length} words · ${h.cues.length} cues · ${N ? "unsaved" : "saved/seeded"}` : "Awaiting master" }),
      /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => lt((O) => !O), children: Z ? "Hide timing editor" : "Show timing editor" })
    ] }),
    Z && h && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsx("p", { children: "Line, word and cue edits are kept in a separate source-bound document. Choose a lyric line to adjust its individual words. Cue names must follow the established [SECTION: VERSE 1] / [DROP: CHORUS 1] convention." }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-timing-fields", children: [
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Timing clock ",
          /* @__PURE__ */ d.jsxs("select", { "aria-label": "Timing clock", value: h.clock_mode, onChange: (O) => nt(O.target.value), children: [
            /* @__PURE__ */ d.jsx("option", { value: "fixed", children: "Fixed BPM + Beat 1 offset" }),
            /* @__PURE__ */ d.jsx("option", { value: "variable", disabled: !It, children: "Corrected variable BPM beat map" })
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
              value: h.fixed_clock.bpm,
              onChange: (O) => st("bpm", Number(O.target.value))
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
              max: ct,
              step: ".001",
              value: h.fixed_clock.first_beat_frame / J,
              onChange: (O) => st("first_beat_frame", $a(O.target.value, J))
            }
          )
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          /* @__PURE__ */ d.jsx("input", { type: "checkbox", checked: Nt, onChange: (O) => Et(O.target.checked) }),
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
              value: Math.round(At * 1e3),
              onChange: (O) => K(Math.max(0, Math.min(1, Number(O.target.value) / 1e3)))
            }
          )
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          /* @__PURE__ */ d.jsx("input", { type: "checkbox", checked: dt, onChange: (O) => Gt(O.target.checked) }),
          "Beat grid overlay"
        ] })
      ] }),
      xt && !It && /* @__PURE__ */ d.jsx("p", { role: "alert", children: "Variable BPM is selected but its source-bound beat map is unavailable; no silent fixed-BPM downgrade." }),
      xt && r?.dirty && /* @__PURE__ */ d.jsx("p", { role: "alert", children: "Save the beat-map corrections before saving/exporting lyric and cue timing changes." }),
      xt && It && h.beat_revision !== $t && /* @__PURE__ */ d.jsxs("p", { role: "alert", children: [
        "The saved beat-map revision has changed. Review its timing, then explicitly rebind these lyrics and cues to that revision. ",
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: r.dirty, onClick: () => ot((O) => ({ ...O, beat_revision: $t, review_status: "draft" })), children: "Rebind to reviewed beat-map revision" })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-timing-fields", children: [
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Selected line ",
          /* @__PURE__ */ d.jsxs("select", { "aria-label": "Selected lyric line", value: Wt?.id || "", onChange: (O) => mt({ kind: "line", id: O.target.value }), children: [
            /* @__PURE__ */ d.jsx("option", { value: "", children: "Choose line" }),
            h.lines.map((O) => /* @__PURE__ */ d.jsx("option", { value: O.id, children: O.text.slice(0, 75) }, O.id))
          ] })
        ] }),
        wt && le !== "cue" && /* @__PURE__ */ d.jsxs("label", { children: [
          le === "line" ? "Line text" : "Word text",
          /* @__PURE__ */ d.jsx(
            "input",
            {
              "aria-label": "Selected text",
              value: le === "line" ? wt.text : wt.word,
              onChange: (O) => xe(le, wt.id, O.target.value)
            }
          )
        ] }),
        wt && le === "cue" && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
          /* @__PURE__ */ d.jsxs("label", { children: [
            "Cue type ",
            /* @__PURE__ */ d.jsx("select", { value: wt.type, onChange: (O) => hl(wt.id, O.target.value, wt.section), children: mf.map((O) => /* @__PURE__ */ d.jsx("option", { value: O, children: O }, O)) })
          ] }),
          /* @__PURE__ */ d.jsxs("label", { children: [
            "Standard section ",
            /* @__PURE__ */ d.jsx(
              "select",
              {
                value: Vu.find((O) => wt.section === O || wt.section.startsWith(O + " ")) || "INTRO",
                onChange: (O) => hl(wt.id, wt.type, O.target.value),
                children: Vu.map((O) => /* @__PURE__ */ d.jsx("option", { value: O, children: O }, O))
              }
            )
          ] }),
          /* @__PURE__ */ d.jsxs("label", { children: [
            "Section number / suffix ",
            /* @__PURE__ */ d.jsxs(
              "select",
              {
                "aria-label": "Cue section suffix",
                value: wt.section.match(/ (\d+|A|B|FINAL)$/)?.[1] || "",
                onChange: (O) => {
                  const I = Vu.find((Mt) => wt.section === Mt || wt.section.startsWith(Mt + " ")) || "INTRO";
                  hl(wt.id, wt.type, I + (O.target.value ? " " + O.target.value : ""));
                },
                children: [
                  /* @__PURE__ */ d.jsx("option", { value: "", children: "None" }),
                  Array.from({ length: 64 }, (O, I) => String(I + 1)).concat(["A", "B", "FINAL"]).map((O) => /* @__PURE__ */ d.jsx("option", { value: O, children: O }, O))
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-timing-fields", children: [
        /* @__PURE__ */ d.jsxs("label", { children: [
          "New line text ",
          /* @__PURE__ */ d.jsx("input", { value: ft, placeholder: "Lyrics line", onChange: (O) => Qt(O.target.value) })
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => Ne("line"), children: "Add line at playhead" }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "New word ",
          /* @__PURE__ */ d.jsx("input", { value: kt, placeholder: "Single word", onChange: (O) => St(O.target.value) })
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: !Wt, onClick: () => Ne("word"), children: "Add word inside selected line" })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-timing-fields", children: [
        /* @__PURE__ */ d.jsxs("label", { children: [
          "New cue type ",
          /* @__PURE__ */ d.jsx("select", { value: q, onChange: (O) => Y(O.target.value), children: mf.map((O) => /* @__PURE__ */ d.jsx("option", { children: O }, O)) })
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Section ",
          /* @__PURE__ */ d.jsx("select", { value: L, onChange: (O) => $(O.target.value), children: Vu.map((O) => /* @__PURE__ */ d.jsx("option", { children: O }, O)) })
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => Ne("cue"), children: "Add cue at playhead" }),
        /* @__PURE__ */ d.jsxs("button", { type: "button", disabled: !wt, onClick: () => ot((O) => db(O, le, k.id)), children: [
          "Delete selected ",
          le
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          /* @__PURE__ */ d.jsx("input", { type: "checkbox", checked: h.review_status === "artist_confirmed", onChange: (O) => ot((I) => ({ ...I, review_status: O.target.checked ? "artist_confirmed" : "draft" })) }),
          "Artist-reviewed timing"
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-timing-actions", children: [
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: j || !N, onClick: vl, children: "Save source-frame corrections" }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Export format ",
          /* @__PURE__ */ d.jsxs("select", { value: Ft, onChange: (O) => te(O.target.value), children: [
            /* @__PURE__ */ d.jsx("option", { value: "bundle", children: "Complete JSON bundle" }),
            /* @__PURE__ */ d.jsx("option", { value: "lines", children: "Line LRC" }),
            /* @__PURE__ */ d.jsx("option", { value: "words", children: "Word TSV" }),
            /* @__PURE__ */ d.jsx("option", { value: "wordjson", children: "Word JSON" }),
            /* @__PURE__ */ d.jsx("option", { value: "cues", children: "Named cue LRC" })
          ] })
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: j, onClick: _a, children: "Download selection" }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Import track ",
          /* @__PURE__ */ d.jsxs("select", { value: it, onChange: (O) => Zt(O.target.value), children: [
            /* @__PURE__ */ d.jsx("option", { value: "lines", children: "Per-line LRC" }),
            /* @__PURE__ */ d.jsx("option", { value: "words", children: "Per-word LRC/TSV/JSON" }),
            /* @__PURE__ */ d.jsx("option", { value: "cues", children: "Section-cue LRC" })
          ] })
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: j, onClick: () => H.current?.click(), children: "Choose timing file" }),
        /* @__PURE__ */ d.jsx("input", { ref: H, type: "file", hidden: !0, accept: it === "words" ? ".lrc,.tsv,.json" : ".lrc", onChange: Vl }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: j, onClick: () => pt(), children: "Reload saved" })
      ] }),
      /* @__PURE__ */ d.jsx("small", { children: "Word positions must stay inside their lyric line. An off-grid word/cue is preserved until you explicitly drag or enable nearby-beat snapping. Pips=64/beat, DanceMoves ticks=16/beat. LRC/TSV exports round timestamps; the JSON retains native frames." })
    ] }),
    Z && !h && /* @__PURE__ */ d.jsx("p", { children: "Waiting for decoded source audio; no lyric or cue times are invented." }),
    Q && /* @__PURE__ */ d.jsx("output", { role: "status", className: "stemlab-timing-status", children: Q })
  ] });
  return { clock: G, lanes: de, panel: ie, gridVisible: dt, onWindowChange: et, onTimeChange: (O) => {
    p.current = O;
  } };
}
function vb(c, o) {
  if (!c || c.schema !== "stemlab.loops.v1") return [];
  const r = c.sample_rate;
  return !Number.isSafeInteger(r) || r <= 0 ? [] : (c.loops || []).flatMap((s) => {
    if (!/^(verse|chorus)-\d+-\d+$/.test(s.id) || !Number.isSafeInteger(s.start_sample) || !Number.isSafeInteger(s.end_sample) || s.start_sample < 0 || s.end_sample <= s.start_sample || s.end_sample > c.source_frames) return [];
    const h = encodeURIComponent(`${c.source_sha256}:${s.start_sample}:${s.end_sample}`);
    return [{
      id: s.id,
      label: `${s.section_label} · ${s.bars} bar${s.bars === 1 ? "" : "s"}`,
      startSample: s.start_sample,
      endSample: s.end_sample,
      sampleRate: r,
      // Exact native-rate PCM excerpt, computed read-only whether or not --export-loops was used.
      audioSrc: `/api/${o}/loops/${encodeURIComponent(s.id)}/audio?v=${h}`,
      downloadUrl: s.file && /^audio\/[a-zA-Z0-9._-]+\.wav$/.test(s.file) ? `/${o}/deep/loops/${s.file.split("/").map(encodeURIComponent).join("/")}` : void 0
    }];
  });
}
function gb(c) {
  const [o, r] = U.useState({ report: null, error: "" });
  U.useEffect(() => {
    let h = !0, m, b = "";
    const _ = new AbortController();
    r({ report: null, error: "" });
    const C = async () => {
      try {
        const A = await fetch(`/${c}/deep/loops/loops.json`, {
          cache: "no-store",
          signal: _.signal
        });
        if (!h) return;
        if (A.status === 404)
          b = "", r({ report: null, error: "" });
        else {
          if (!A.ok) throw new Error(`Loop report: HTTP ${A.status}`);
          const N = await A.json();
          if (N.schema === "stemlab.loop-availability.v1" && N.status === "not-analysed") {
            r({ report: null, error: "", note: N.reason });
            return;
          }
          if (N.schema !== "stemlab.loops.v1") throw new Error("Unsupported loop report schema");
          const g = JSON.stringify(N);
          h && g !== b && (r({ report: N, error: "" }), b = g);
        }
      } catch (A) {
        h && A.name !== "AbortError" && (b = "", r({ report: null, error: A.message }));
      } finally {
        h && (m = window.setTimeout(C, 2500));
      }
    };
    return C(), () => {
      h = !1, _.abort(), window.clearTimeout(m);
    };
  }, [c]);
  const s = U.useMemo(() => vb(o.report, c), [o.report, c]);
  return { ...o, loops: s };
}
function yb({ state: c, hash: o }) {
  const r = c.report;
  return c.error ? /* @__PURE__ */ d.jsx("p", { role: "alert", className: "stemlab-loop-summary", children: c.error }) : c.note ? /* @__PURE__ */ d.jsx("p", { className: "stemlab-loop-summary", children: c.note }) : r ? /* @__PURE__ */ d.jsxs("details", { className: "stemlab-loop-summary", open: r.unresolved_sections.length > 0, children: [
    /* @__PURE__ */ d.jsxs("summary", { children: [
      r.loop_count,
      " loop(s) · ",
      r.unresolved_sections.length,
      " unresolved section(s) · ",
      /* @__PURE__ */ d.jsx("a", { href: `/${o}/deep/loops/loops.json`, target: "_blank", rel: "noopener", children: "Sample report" })
    ] }),
    /* @__PURE__ */ d.jsx("p", { children: "Choose a loop region or use the Loop selector, tick Enable loop, then press Play. Previewing writes no files." }),
    r.unresolved_sections.map((s) => /* @__PURE__ */ d.jsxs("p", { children: [
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
const Oe = (c) => document.querySelector(c), bb = Oe("#uploadView"), pf = Oe("#timelineView"), Fa = Oe("#dropZone"), Ku = Oe("#fileInput"), b0 = Oe("#chooseButton"), p0 = Oe("#uploadProgressWrap"), Ec = Oe("#uploadProgress"), Tc = Oe("#uploadLabel"), ba = Oe("#connectionBadge"), S0 = Oe("#canonicalBpm"), _0 = Oe("#canonicalLyrics"), E0 = Oe("#canonicalTiming"), hf = Oe("#knownInfoStatus"), pb = Oe("#loadArcadiansReference"), Sb = Oe("#loadArcadiansHero"), _b = Array.from(pf.children), Sf = document.createElement("div");
Sf.id = "timelineRoot";
pf.replaceChildren(Sf);
for (const c of _b) c.remove();
const Eb = zy.createRoot(Sf), Tb = /* @__PURE__ */ new Set(["wav", "flac", "mp3", "ogg", "opus", "m4a", "aif", "aiff"]);
let vf = {};
function Nb(c) {
  const o = String(c).split("/").pop() || "", r = o.lastIndexOf(".");
  return r >= 0 ? o.slice(r + 1).toLowerCase() : "";
}
function dl(c) {
  return String(c).replace(/^stems\//, "").replace(/^spectrograms\//, "").replace(/^vamp\/data\//, "Vamp · ").replace(/^beats\//, "Beats · ").replace(/^speech\//, "Speech · ").replace(/^deep\//, "Deep · ").replace(/[_-]+/g, " ");
}
function _f(c, o) {
  return `/${c}/${o.split("/").map(encodeURIComponent).join("/")}`;
}
function Nc(c, o, r = "Generated analysis artifact") {
  return { type: "artifact", note: r, href: o === "__source__" ? `/api/${c}/source` : _f(c, o) };
}
async function ke(c, o) {
  const r = await fetch(_f(c, o), { cache: "no-store" });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}
function ml(c, o = 2, r = "") {
  const s = Number(c);
  return Number.isFinite(s) ? `${s.toFixed(o)}${r}` : "—";
}
function Ja(c, o, r, s, h = "feature") {
  const m = s.filter(([, b]) => b != null && b !== "");
  return {
    id: c,
    title: o,
    meta: r,
    kind: h,
    content: {
      type: "summary",
      items: (m.length ? m : [["status", "analysis available"]]).map(([b, _]) => ({ label: b, value: _ }))
    }
  };
}
function xc(c) {
  return (c || []).flatMap((o) => {
    const r = Number(o.start);
    if (!Number.isFinite(r)) return [];
    const s = Number(o.end);
    return [{
      start: r,
      end: Number.isFinite(s) && s > r ? s : r + 0.5,
      label: o.label || o.text || o.values?.[0] || ""
    }];
  });
}
function xb(c) {
  const o = Array.isArray(c.events) ? c.events : [];
  switch (String(c.kind || "")) {
    case "curve":
      return { type: "curve", points: o.flatMap((r) => {
        const s = Number(r.start), h = Number(r.values?.[0]);
        return Number.isFinite(s) && Number.isFinite(h) && h > 0 ? [{ time: s, value: h }] : [];
      }) };
    case "matrix":
      return { type: "matrix", rows: o.map((r) => r.values || []).filter((r) => r.length) };
    case "notes":
      return { type: "notes", items: o.flatMap((r) => {
        const s = Number(r.values?.[0]), h = Number(r.start);
        if (!Number.isFinite(s) || s <= 0 || !Number.isFinite(h)) return [];
        const m = Number(r.end);
        return [{ start: h, end: Number.isFinite(m) && m > h ? m : h + 0.12, value: s, label: r.label }];
      }) };
    case "segments":
      return { type: "blocks", items: xc(o) };
    case "events":
      return { type: "markers", items: o.flatMap((r) => Number.isFinite(Number(r.start)) ? [{ time: Number(r.start) }] : []) };
    default:
      return { type: "artifact", note: o[0]?.label || o[0]?.values?.join(", ") || c.title || "analysis" };
  }
}
async function T0(c, o, r, s, h) {
  const m = new URLSearchParams({ path: h, points: "12000" }), b = await fetch(`/api/${c}/waveform?${m}`);
  if (!b.ok) return { id: o, title: r, meta: s, kind: "artifact", content: Nc(c, h, `waveform unavailable (${b.status})`) };
  const _ = await b.json();
  return { id: o, title: r, meta: s, kind: "waveform", content: { type: "waveform", min: _.min || [], max: _.max || [] }, duration: Number(_.duration_seconds) || 0 };
}
async function Mb(c, o) {
  const r = o.path, s = `file:${r}`, h = Nb(r);
  if (r === "canonical.json" || r.startsWith("deep/loops/")) return null;
  if (Tb.has(h)) return T0(c, s, dl(r), "audio waveform", r);
  if (r.startsWith("spectrograms/") && h === "npz") {
    const m = new URLSearchParams({ path: r, max_width: "8192", max_height: "768" });
    return { id: s, title: dl(r), meta: "spectrogram data · exact song timeline", kind: "spectrogram", content: { type: "image", src: `/api/${c}/spectrogram?${m}`, alt: `${dl(r)} spectrogram` } };
  }
  if (r.startsWith("spectrograms/") && h === "png")
    return { id: s, title: dl(r), meta: "rendered spectrogram PNG", kind: "image", content: { type: "image", src: _f(c, r), alt: `${dl(r)} rendered spectrogram` } };
  try {
    if (r === "analysis.json") {
      const m = await ke(c, r);
      return {
        id: s,
        title: dl(r),
        meta: "analysis provenance",
        kind: "artifact",
        sourceMap: m.spectrograms || [],
        content: Nc(c, r)
      };
    }
    if (r.startsWith("deep/midi/") && r.endsWith("/notes.json")) {
      const m = await ke(c, r);
      return {
        id: s,
        title: `MIDI · ${m.source_stem || dl(r)}`,
        meta: `${m.model_title || m.model || "Transcription"} · ${m.note_count || 0} inferred notes · original audio clock`,
        kind: "midi-notes",
        content: { type: "notes", items: (m.notes || []).map((b) => ({
          start: b.start,
          end: b.end,
          value: b.midi_pitch,
          label: `MIDI ${b.midi_pitch} · velocity ${b.velocity}`
        })) }
      };
    }
    if (r.startsWith("beats/") && h === "json") {
      const m = await ke(c, r), b = new Set((m.downbeats || []).map((_) => Number(_).toFixed(3)));
      return { id: s, title: dl(r), meta: "beat / downbeat events", kind: "events", content: { type: "markers", items: (m.beats || []).flatMap((_) => {
        const C = Number(_);
        return Number.isFinite(C) ? [{ time: C, emphasis: b.has(C.toFixed(3)), label: b.has(C.toFixed(3)) ? "Downbeat" : "Beat" }] : [];
      }) } };
    }
    if (r.startsWith("vamp/data/") && h === "json") {
      const m = await ke(c, r);
      return { id: s, title: dl(r), meta: "Vamp feature analysis", kind: "feature", content: xb(m) };
    }
    if (r === "speech/whisper.json") {
      const m = await ke(c, r);
      return { id: s, title: "Speech · Whisper words", meta: "word-aligned transcript", kind: "words", content: { type: "blocks", items: (m.words || []).flatMap((b) => {
        const _ = Number(b.start), C = Number(b.end);
        return Number.isFinite(_) ? [{ start: _, end: Number.isFinite(C) ? Math.max(_ + 0.03, C) : _ + 0.03, label: String(b.word || "").trim() }] : [];
      }) } };
    }
    if (r === "deep/structure/structure.json" || r === "deep/song_map/song_map.json") {
      const m = await ke(c, r), b = r.includes("song_map");
      return { id: s, title: b ? "Deep · song map" : "Deep · functional structure", meta: b ? "section-level sonic / rhythm / harmony / lyric fusion" : "All-In-One · functional song sections", kind: "deep-structure", content: { type: "blocks", items: xc(b ? m.sections : m.segments) } };
    }
    if (r === "deep/harmony/harmony.json") {
      const m = await ke(c, r), b = m.chords?.collapsed_progression || [];
      return b.length ? { id: s, title: "Deep · harmony", meta: "collapsed chord progression + key evidence", kind: "deep-harmony", content: { type: "blocks", items: xc(b) } } : Ja(s, "Deep · harmony", "collapsed chord progression + key evidence", [["key", m.vamp_key || m.independent_key_candidates_from_nnls_chroma?.[0]?.key || "—"], ["tuning", m.tuning_hz ? `${Number(m.tuning_hz).toFixed(1)} Hz` : "—"]], "deep-harmony");
    }
    if (r === "deep/lyrics/lyrics.json") {
      const m = await ke(c, r), b = (m.lines || []).filter((_) => Number.isFinite(Number(_.start)) && Number.isFinite(Number(_.end)));
      return b.length ? { id: s, title: "Deep · rhyme & prosody", meta: "phonetic rhyme, repetition and delivery", kind: "deep-lyrics", content: { type: "blocks", items: xc(b) } } : Ja(s, "Deep · rhyme & prosody", "phonetic rhyme, repetition and delivery", [["rhyme scheme", m.rhyme?.scheme || "—"], ["lines", m.line_count ?? "—"], ["words", m.word_count ?? "—"]], "deep-lyrics");
    }
    if (r === "deep/sonic/sonic.json") {
      const m = await ke(c, r);
      return Ja(s, "Deep · sonic profile", "loudness · dynamics · timbre · stereo", [["LUFS", ml(m.loudness?.integrated_lufs_bs1770, 1)], ["crest", ml(m.loudness?.crest_factor_db, 1, " dB")], ["RMS range", ml(m.loudness?.short_term_rms_range_db_p95_p10, 1, " dB")], ["centroid", ml(m.timbre?.spectral_centroid_hz_mean, 0, " Hz")], ["stereo corr", ml(m.stereo?.left_right_correlation, 2)]]);
    }
    if (r === "deep/rhythm/rhythm.json") {
      const m = await ke(c, r);
      return Ja(s, "Deep · groove", "meter · stability · swing · syncopation evidence", [["tempo", ml(m.tempo?.median_bpm, 2, " BPM")], ["meter", m.meter?.estimated_beats_per_bar ? `${m.meter.estimated_beats_per_bar}/4-ish` : "—"], ["swing", ml(m.groove?.swing_ratio_long_to_short, 2, ":1")], ["offbeat energy", ml(m.groove?.offbeat_onset_energy_ratio, 3)], ["onsets/s", ml(m.groove?.onset_density_per_second, 2)]]);
    }
    if (r === "deep/semantic_text/semantic_text.json") {
      const m = await ke(c, r);
      return Ja(s, "Deep · lyric semantics", "sentence embedding theme similarities · not probabilities", (m.theme_similarity || []).slice(0, 7).map((b) => [b.theme, ml(b.similarity, 3)]));
    }
    if (r === "deep/semantic_audio/semantic_audio.json") {
      const m = await ke(c, r), b = Object.entries(m.prompt_sets || {}).flatMap(([_, C]) => (C || []).slice(0, 2).map((A) => [`${_}: ${A.prompt}`, ml(A.similarity, 3)]));
      return Ja(s, "Deep · audio semantics", "MuQ-MuLan zero-shot similarities · CC-BY-NC weights", b);
    }
    if (r === "deep/summary.json") {
      const m = await ke(c, r), b = Object.entries(m.analyses || {}).map(([_, C]) => [_, C.available ? "ready" : "unavailable"]);
      return (m.errors || []).length && b.push(["errors", m.errors.length]), Ja(s, "Deep · analysis summary", "cross-domain action inventory", b);
    }
  } catch (m) {
    return { id: s, title: dl(r), meta: "analysis artifact", kind: "artifact", content: Nc(c, r, m.message) };
  }
  return { id: s, title: dl(r), meta: `${h || "file"} · ${Number(o.bytes || 0).toLocaleString()} bytes`, kind: "artifact", content: Nc(c, r) };
}
function Ob(c) {
  const o = [];
  c?.lyrics && o.push({ id: "canonical:lyrics", title: "Canonical lyrics", meta: "known reference text", kind: "canonical-lyrics", height: 104, content: { type: "text", text: c.lyrics } });
  const r = Array.isArray(c?.lyric_timing) ? c.lyric_timing : [];
  return r.length && o.push({ id: "canonical:timing", title: "Canonical lyric timing", meta: `${r.length} timed lyric event${r.length === 1 ? "" : "s"}`, kind: "canonical-timing", height: 104, content: { type: "blocks", items: r.flatMap((s) => {
    const h = Number(s.start), m = Number(s.end);
    return Number.isFinite(h) && h >= 0 ? [{ start: h, end: Number.isFinite(m) && m > h ? m : h + 0.75, label: String(s.text || ""), className: "stemlab-canonical-lyric" }] : [];
  }) } }), { lanes: o };
}
function zb({ lines: c }) {
  return /* @__PURE__ */ d.jsxs("details", { open: !0, className: "stemlab-log", children: [
    /* @__PURE__ */ d.jsx("summary", { children: "Analysis log" }),
    /* @__PURE__ */ d.jsx("div", { className: "log", children: c.map((o, r) => /* @__PURE__ */ d.jsxs("div", { className: o.stream === "stderr" ? "stderr" : "stdout", children: [
      "[",
      o.stream,
      "] ",
      o.text
    ] }, r)) })
  ] });
}
function Cb({ hash: c, filename: o }) {
  const r = gb(c), [s, h] = U.useState([]), [m, b] = U.useState(0), _ = !window.__stemlabStatic, C = sb(c, m, _), A = hb(c, m, C, _), [N, g] = U.useState({ state: "submitted" }), [j, B] = U.useState({ bpm: null, lyrics: null, lyric_timing: [] }), [Z, lt] = U.useState(null), [k, mt] = U.useState("canonical"), [Q, X] = U.useState("consensus"), [Nt, Et] = U.useState([]), At = U.useRef(/* @__PURE__ */ new Set()), K = U.useCallback((Y, L) => {
    L && Et(($) => [...$.slice(-799), { stream: Y === "stderr" ? "stderr" : "stdout", text: L }]);
  }, []), dt = U.useCallback(async (Y) => {
    if (!Y?.path || At.current.has(Y.path)) return;
    At.current.add(Y.path);
    const L = await Mb(c, Y);
    L && (L.duration && b(($) => $ || L.duration), h(($) => $.some((it) => it.id === L.id) ? $ : [...$, L]));
  }, [c]), Gt = U.useCallback(async () => {
    const Y = await fetch(`/api/${c}/timeline`, { cache: "no-store" });
    if (!Y.ok) return;
    const L = await Y.json();
    g(L.status || { state: "submitted" }), L.duration_seconds && b(Number(L.duration_seconds)), L.canonical && B(L.canonical), lt(L.beat_offsets || null);
    for (const $ of L.files || []) dt($);
  }, [dt, c]);
  U.useEffect(() => {
    At.current = /* @__PURE__ */ new Set(), h([]), lt(null), mt("canonical"), X("consensus"), T0(c, "__source__", "MASTER · uploaded source", o, "__source__").then(($) => {
      $.duration && b($.duration), h((it) => [$, ...it.filter((Zt) => Zt.id !== $.id)]);
    }).catch(($) => K("stderr", $.message)), Gt();
    const Y = window.setInterval(() => {
      Gt();
    }, 2500);
    let L = null;
    return typeof window.io == "function" ? (L = window.io({ path: "/socket.io" }), L.on("connect", () => {
      ba.textContent = "live", ba.classList.remove("muted"), L.emit("subscribe", { hash: c });
    }), L.on("disconnect", () => {
      ba.textContent = "reconnecting", ba.classList.add("muted");
    }), L.on("process_output", ($) => K($.stream || "stdout", $.line || "")), L.on("process_history", ($) => {
      for (const it of $.stdout || []) K("stdout", it);
      for (const it of $.stderr || []) K("stderr", it);
    }), L.on("new_file", ($) => {
      dt($);
    }), L.on("job_status", ($) => {
      g($.status || {}), Gt();
    }), L.on("canonical_metadata", ($) => {
      $?.canonical && B($.canonical);
    }), L.on("job_timeout", ($) => K("stderr", `Job timeout: ${$.message || "analysis exceeded timeout"}`))) : window.__stemlabStatic ? (ba.textContent = "static", ba.classList.add("muted")) : (ba.textContent = "polling", ba.classList.add("muted"), K("stderr", "Socket.IO browser client unavailable; timeline inventory polling remains active.")), () => {
      window.clearInterval(Y), L?.disconnect();
    };
  }, [dt, K, o, c, Gt]);
  const at = U.useMemo(() => Ob(j), [j]), et = U.useMemo(() => $y(Z, j.bpm, m, k, Q), [Z, j.bpm, m, k, Q]), ft = (Y) => Y.id === "__source__" ? 0 : Y.kind === "deep-structure" ? 10 : Y.kind === "events" ? 20 : Y.kind === "audio" ? 1 : Y.kind === "spectrogram" ? 30 : Y.kind === "waveform" ? 40 : 90, Qt = U.useMemo(() => Ky(s), [s]), St = [...et.basis ? [
    { id: "canonical:bpm", title: "BPM grid · original", meta: `${et.basis.bpm.toFixed(4)} BPM · source time 0`, kind: "canonical-bpm", height: 74, content: { type: "markers", items: et.original } },
    { id: "bpm:aligned", title: "BPM grid · offset", meta: et.row ? `${et.row.offset_pips.toFixed(6)} pips · ${et.analysis.analysis_id}` : "Waiting for detected first beat", kind: "canonical-bpm", height: 74, content: { type: "markers", items: et.aligned } }
  ] : [], ...C.lanes, ...A.lanes, ...at.lanes, ...[...Qt].sort((Y, L) => ft(Y) - ft(L) || Y.id.localeCompare(L.id))], q = N.state || "submitted";
  return /* @__PURE__ */ d.jsx(
    Zy,
    {
      className: "stemlab-timeline",
      laneControls: !0,
      wheelNavigation: !0,
      audioSrc: `/api/${c}/source`,
      duration: m,
      title: j.title || o,
      subtitle: c,
      loops: r.loops,
      lanes: St,
      grid: [...et.grid, ...C.grid],
      beatClock: A.clock,
      showBeatGrid: A.gridVisible,
      onDurationChange: b,
      onWindowChange: (Y) => {
        C.onWindowChange(Y), A.onWindowChange(Y);
      },
      onTimeChange: (Y) => {
        C.onTimeChange(Y), A.onTimeChange(Y);
      },
      onPlaybackError: (Y) => K("stderr", Y instanceof Error ? Y.message : String(Y)),
      headerEnd: /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
        /* @__PURE__ */ d.jsx("span", { className: `badge ${q}`, children: q }),
        /* @__PURE__ */ d.jsxs("span", { className: "small", children: [
          St.length,
          " lane",
          St.length === 1 ? "" : "s"
        ] })
      ] }),
      footer: /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
        /* @__PURE__ */ d.jsx(ky, { comparison: et, onBasis: mt, onAnalysis: X }),
        _ && C.panel,
        _ && A.panel,
        /* @__PURE__ */ d.jsx(yb, { state: r, hash: c }),
        /* @__PURE__ */ d.jsx(zb, { lines: Nt }),
        /* @__PURE__ */ d.jsx("span", { className: "dock-links", children: /* @__PURE__ */ d.jsx("a", { href: "https://kieransimkin.co.uk/my-songs/", target: "_blank", rel: "noopener", children: "Kieran Simkin · My Songs ↗" }) })
      ] })
    }
  );
}
function Ab() {
  const c = S0?.value?.trim() || "", o = _0?.value || "", r = E0?.value || "";
  return { ...vf, bpm: c ? Number(c) : null, lyrics: o.trim() || null, lyric_timing: r.trim() || [] };
}
function jb(c) {
  return Number.isFinite(Number(c.bpm)) || !!c.lyrics || !!(typeof c.lyric_timing == "string" && c.lyric_timing.trim()) || !!(Array.isArray(c.lyric_timing) && c.lyric_timing.length);
}
async function Rb(c) {
  const o = Ab();
  if (!jb(o)) return;
  const r = await fetch(`/api/${c}/canonical`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(o) }), s = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(s.detail || `Could not save canonical metadata (${r.status})`);
  hf.textContent = "Known information saved with this song hash.";
}
function Db(c) {
  return new Promise((o, r) => {
    const s = new XMLHttpRequest();
    s.open("PUT", `/upload/${encodeURIComponent(c.name)}`), s.setRequestHeader("Content-Type", c.type || "application/octet-stream"), s.upload.onprogress = (h) => {
      p0.classList.remove("hidden");
      const m = h.lengthComputable ? h.loaded / h.total : 0;
      Ec.style.width = `${Math.round(m * 100)}%`, Tc.textContent = h.lengthComputable ? `${Math.round(m * 100)}% · ${(h.loaded / 1048576).toFixed(1)} / ${(h.total / 1048576).toFixed(1)} MiB` : `${(h.loaded / 1048576).toFixed(1)} MiB uploaded`;
    }, s.onerror = () => r(new Error("Upload failed")), s.onload = () => {
      let h = {};
      try {
        h = JSON.parse(s.responseText);
      } catch {
      }
      s.status < 200 || s.status >= 300 ? r(new Error(h.detail || `Upload failed (${s.status})`)) : o(h);
    }, s.send(c);
  });
}
async function N0(c, o) {
  bb.classList.add("hidden"), pf.classList.remove("hidden"), Eb.render(/* @__PURE__ */ d.jsx(Cb, { hash: c, filename: o || "uploaded audio" }, c));
}
async function x0(c) {
  if (c) {
    Ec.style.width = "0%", Tc.textContent = `Uploading ${c.name}`, p0.classList.remove("hidden");
    try {
      const o = await Db(c);
      Ec.style.width = "100%", Tc.textContent = "Upload complete · attaching to analysis", await Rb(o.hash), await N0(o.hash, o.filename || c.name);
    } catch (o) {
      Tc.textContent = o.message, Ec.style.width = "0%";
    }
  }
}
async function M0(c) {
  c?.preventDefault(), c?.stopPropagation();
  try {
    const o = await fetch("/assets/arcadians-reference.json", { cache: "no-store" });
    if (!o.ok) throw new Error(`Could not load Arcadians reference (${o.status})`);
    const r = await o.json();
    vf = {};
    for (const s of ["title", "artist", "release_date", "isrc", "upc", "website", "my_songs_url", "epk_url", "cover_art_url", "source_url", "sections"])
      r[s] !== void 0 && r[s] !== null && (vf[s] = r[s]);
    S0.value = r.bpm ?? "", _0.value = r.lyrics ?? "", E0.value = Array.isArray(r.lyric_timing) && r.lyric_timing.length ? JSON.stringify(r.lyric_timing, null, 2) : "", Oe(".known-info").open = !0, hf.textContent = r.lyric_timing?.length ? `Loaded ${r.title || "Arcadians"}: canonical release metadata, sections, ${r.bpm} BPM, lyrics and timing.` : `Loaded ${r.title || "Arcadians"} canonical reference metadata.`;
  } catch (o) {
    hf.textContent = o.message;
  }
}
b0.addEventListener("click", (c) => {
  c.stopPropagation(), Ku.click();
});
Ku.addEventListener("change", () => {
  x0(Ku.files?.[0]);
});
Fa.addEventListener("click", (c) => {
  c.target !== b0 && !c.target.closest(".known-info") && Ku.click();
});
Fa.addEventListener("keydown", (c) => {
  (c.key === "Enter" || c.key === " ") && Ku.click();
});
for (const c of ["dragenter", "dragover"]) Fa.addEventListener(c, (o) => {
  o.preventDefault(), Fa.classList.add("dragging");
});
for (const c of ["dragleave", "drop"]) Fa.addEventListener(c, (o) => {
  o.preventDefault(), Fa.classList.remove("dragging");
});
Fa.addEventListener("drop", (c) => {
  x0(c.dataTransfer?.files?.[0]);
});
pb?.addEventListener("click", M0);
Sb?.addEventListener("click", M0);
const sf = new URLSearchParams(location.search).get("hash");
sf && /^[0-9a-f]{64}$/i.test(sf) && N0(sf.toLowerCase(), "Existing analysis");
export {
  Sa as formatTimelineTime
};
