var qs = { exports: {} }, Mn = {};
var E0;
function Ky() {
  if (E0) return Mn;
  E0 = 1;
  var f = /* @__PURE__ */ Symbol.for("react.transitional.element"), v = /* @__PURE__ */ Symbol.for("react.fragment");
  function o(s, z, y) {
    var O = null;
    if (y !== void 0 && (O = "" + y), z.key !== void 0 && (O = "" + z.key), "key" in z) {
      y = {};
      for (var D in z)
        D !== "key" && (y[D] = z[D]);
    } else y = z;
    return z = y.ref, {
      $$typeof: f,
      type: s,
      key: O,
      ref: z !== void 0 ? z : null,
      props: y
    };
  }
  return Mn.Fragment = v, Mn.jsx = o, Mn.jsxs = o, Mn;
}
var N0;
function Jy() {
  return N0 || (N0 = 1, qs.exports = Ky()), qs.exports;
}
var E = Jy(), Ys = { exports: {} }, P = {};
var z0;
function $y() {
  if (z0) return P;
  z0 = 1;
  var f = /* @__PURE__ */ Symbol.for("react.transitional.element"), v = /* @__PURE__ */ Symbol.for("react.portal"), o = /* @__PURE__ */ Symbol.for("react.fragment"), s = /* @__PURE__ */ Symbol.for("react.strict_mode"), z = /* @__PURE__ */ Symbol.for("react.profiler"), y = /* @__PURE__ */ Symbol.for("react.consumer"), O = /* @__PURE__ */ Symbol.for("react.context"), D = /* @__PURE__ */ Symbol.for("react.forward_ref"), H = /* @__PURE__ */ Symbol.for("react.suspense"), B = /* @__PURE__ */ Symbol.for("react.memo"), j = /* @__PURE__ */ Symbol.for("react.lazy"), _ = /* @__PURE__ */ Symbol.for("react.activity"), U = /* @__PURE__ */ Symbol.for("react.view_transition"), Q = Symbol.iterator;
  function nt(m) {
    return m === null || typeof m != "object" ? null : (m = Q && m[Q] || m["@@iterator"], typeof m == "function" ? m : null);
  }
  var it = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, at = Object.assign, Ut = {};
  function Ot(m, x, V) {
    this.props = m, this.context = x, this.refs = Ut, this.updater = V || it;
  }
  Ot.prototype.isReactComponent = {}, Ot.prototype.setState = function(m, x) {
    if (typeof m != "object" && typeof m != "function" && m != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, m, x, "setState");
  }, Ot.prototype.forceUpdate = function(m) {
    this.updater.enqueueForceUpdate(this, m, "forceUpdate");
  };
  function Et() {
  }
  Et.prototype = Ot.prototype;
  function Ht(m, x, V) {
    this.props = m, this.context = x, this.refs = Ut, this.updater = V || it;
  }
  var Yt = Ht.prototype = new Et();
  Yt.constructor = Ht, at(Yt, Ot.prototype), Yt.isPureReactComponent = !0;
  var Xt = Array.isArray;
  function k() {
  }
  var w = { H: null, A: null, T: null, S: null }, Nt = Object.prototype.hasOwnProperty;
  function I(m, x, V) {
    var K = V.ref;
    return {
      $$typeof: f,
      type: m,
      key: x,
      ref: K !== void 0 ? K : null,
      props: V
    };
  }
  function rt(m, x) {
    return I(m.type, x, m.props);
  }
  function yt(m) {
    return typeof m == "object" && m !== null && m.$$typeof === f;
  }
  function kt(m) {
    var x = { "=": "=0", ":": "=2" };
    return "$" + m.replace(/[=:]/g, function(V) {
      return x[V];
    });
  }
  var ct = /\/+/g;
  function X(m, x) {
    return typeof m == "object" && m !== null && m.key != null ? kt("" + m.key) : x.toString(36);
  }
  function C(m) {
    switch (m.status) {
      case "fulfilled":
        return m.value;
      case "rejected":
        throw m.reason;
      default:
        switch (typeof m.status == "string" ? m.then(k, k) : (m.status = "pending", m.then(
          function(x) {
            m.status === "pending" && (m.status = "fulfilled", m.value = x);
          },
          function(x) {
            m.status === "pending" && (m.status = "rejected", m.reason = x);
          }
        )), m.status) {
          case "fulfilled":
            return m.value;
          case "rejected":
            throw m.reason;
        }
    }
    throw m;
  }
  function q(m, x, V, K, ot) {
    var gt = typeof m;
    (gt === "undefined" || gt === "boolean") && (m = null);
    var bt = !1;
    if (m === null) bt = !0;
    else
      switch (gt) {
        case "bigint":
        case "string":
        case "number":
          bt = !0;
          break;
        case "object":
          switch (m.$$typeof) {
            case f:
            case v:
              bt = !0;
              break;
            case j:
              return bt = m._init, q(
                bt(m._payload),
                x,
                V,
                K,
                ot
              );
          }
      }
    if (bt)
      return ot = ot(m), bt = K === "" ? "." + X(m, 0) : K, Xt(ot) ? (V = "", bt != null && (V = bt.replace(ct, "$&/") + "/"), q(ot, x, V, "", function(Gl) {
        return Gl;
      })) : ot != null && (yt(ot) && (ot = rt(
        ot,
        V + (ot.key == null || m && m.key === ot.key ? "" : ("" + ot.key).replace(
          ct,
          "$&/"
        ) + "/") + bt
      )), x.push(ot)), 1;
    bt = 0;
    var L = K === "" ? "." : K + ":";
    if (Xt(m))
      for (var F = 0; F < m.length; F++)
        K = m[F], gt = L + X(K, F), bt += q(
          K,
          x,
          V,
          gt,
          ot
        );
    else if (F = nt(m), typeof F == "function")
      for (m = F.call(m), F = 0; !(K = m.next()).done; )
        K = K.value, gt = L + X(K, F++), bt += q(
          K,
          x,
          V,
          gt,
          ot
        );
    else if (gt === "object") {
      if (typeof m.then == "function")
        return q(
          C(m),
          x,
          V,
          K,
          ot
        );
      throw x = String(m), Error(
        "Objects are not valid as a React child (found: " + (x === "[object Object]" ? "object with keys {" + Object.keys(m).join(", ") + "}" : x) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return bt;
  }
  function $(m, x, V) {
    if (m == null) return m;
    var K = [], ot = 0;
    return q(m, K, "", "", function(gt) {
      return x.call(V, gt, ot++);
    }), K;
  }
  function pt(m) {
    if (m._status === -1) {
      var x = m._result, V = x();
      V.then(
        function(K) {
          (m._status === 0 || m._status === -1) && (m._status = 1, m._result = K, V.status === void 0 && (V.status = "fulfilled", V.value = K));
        },
        function(K) {
          (m._status === 0 || m._status === -1) && (m._status = 2, m._result = K, V.status === void 0 && (V.status = "rejected", V.reason = K));
        }
      ), m._status === -1 && (m._status = 0, m._result = V);
    }
    if (m._status === 1) return m._result.default;
    throw m._result;
  }
  var st = typeof reportError == "function" ? reportError : function(m) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var x = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof m == "object" && m !== null && typeof m.message == "string" ? String(m.message) : String(m),
        error: m
      });
      if (!window.dispatchEvent(x)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", m);
      return;
    }
    console.error(m);
  };
  function bl(m) {
    var x = w.T, V = {};
    V.types = x !== null ? x.types : null, w.T = V;
    try {
      var K = m(), ot = w.S;
      ot !== null && ot(V, K), typeof K == "object" && K !== null && typeof K.then == "function" && K.then(k, st);
    } catch (gt) {
      st(gt);
    } finally {
      x !== null && V.types !== null && (x.types = V.types), w.T = x;
    }
  }
  function Wl(m) {
    var x = w.T;
    if (x !== null) {
      var V = x.types;
      V === null ? x.types = [m] : V.indexOf(m) === -1 && V.push(m);
    } else bl(Wl.bind(null, m));
  }
  var kl = {
    map: $,
    forEach: function(m, x, V) {
      $(
        m,
        function() {
          x.apply(this, arguments);
        },
        V
      );
    },
    count: function(m) {
      var x = 0;
      return $(m, function() {
        x++;
      }), x;
    },
    toArray: function(m) {
      return $(m, function(x) {
        return x;
      }) || [];
    },
    only: function(m) {
      if (!yt(m))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return m;
    }
  };
  return P.Activity = _, P.Children = kl, P.Component = Ot, P.Fragment = o, P.Profiler = z, P.PureComponent = Ht, P.StrictMode = s, P.Suspense = H, P.ViewTransition = U, P.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = w, P.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(m) {
      return w.H.useMemoCache(m);
    }
  }, P.addTransitionType = Wl, P.cache = function(m) {
    return function() {
      return m.apply(null, arguments);
    };
  }, P.cacheSignal = function() {
    return null;
  }, P.cloneElement = function(m, x, V) {
    if (m == null)
      throw Error(
        "The argument must be a React element, but you passed " + m + "."
      );
    var K = at({}, m.props), ot = m.key;
    if (x != null)
      for (gt in x.key !== void 0 && (ot = "" + x.key), x)
        !Nt.call(x, gt) || gt === "key" || gt === "__self" || gt === "__source" || gt === "ref" && x.ref === void 0 || (K[gt] = x[gt]);
    var gt = arguments.length - 2;
    if (gt === 1) K.children = V;
    else if (1 < gt) {
      for (var bt = Array(gt), L = 0; L < gt; L++)
        bt[L] = arguments[L + 2];
      K.children = bt;
    }
    return I(m.type, ot, K);
  }, P.createContext = function(m) {
    return m = {
      $$typeof: O,
      _currentValue: m,
      _currentValue2: m,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, m.Provider = m, m.Consumer = {
      $$typeof: y,
      _context: m
    }, m;
  }, P.createElement = function(m, x, V) {
    var K, ot = {}, gt = null;
    if (x != null)
      for (K in x.key !== void 0 && (gt = "" + x.key), x)
        Nt.call(x, K) && K !== "key" && K !== "__self" && K !== "__source" && (ot[K] = x[K]);
    var bt = arguments.length - 2;
    if (bt === 1) ot.children = V;
    else if (1 < bt) {
      for (var L = Array(bt), F = 0; F < bt; F++)
        L[F] = arguments[F + 2];
      ot.children = L;
    }
    if (m && m.defaultProps)
      for (K in bt = m.defaultProps, bt)
        ot[K] === void 0 && (ot[K] = bt[K]);
    return I(m, gt, ot);
  }, P.createRef = function() {
    return { current: null };
  }, P.forwardRef = function(m) {
    return { $$typeof: D, render: m };
  }, P.isValidElement = yt, P.lazy = function(m) {
    return {
      $$typeof: j,
      _payload: { _status: -1, _result: m },
      _init: pt
    };
  }, P.memo = function(m, x) {
    return {
      $$typeof: B,
      type: m,
      compare: x === void 0 ? null : x
    };
  }, P.startTransition = bl, P.unstable_useCacheRefresh = function() {
    return w.H.useCacheRefresh();
  }, P.use = function(m) {
    return w.H.use(m);
  }, P.useActionState = function(m, x, V) {
    return w.H.useActionState(m, x, V);
  }, P.useCallback = function(m, x) {
    return w.H.useCallback(m, x);
  }, P.useContext = function(m) {
    return w.H.useContext(m);
  }, P.useDebugValue = function() {
  }, P.useDeferredValue = function(m, x) {
    return w.H.useDeferredValue(m, x);
  }, P.useEffect = function(m, x) {
    return w.H.useEffect(m, x);
  }, P.useEffectEvent = function(m) {
    return w.H.useEffectEvent(m);
  }, P.useId = function() {
    return w.H.useId();
  }, P.useImperativeHandle = function(m, x, V) {
    return w.H.useImperativeHandle(m, x, V);
  }, P.useInsertionEffect = function(m, x) {
    return w.H.useInsertionEffect(m, x);
  }, P.useLayoutEffect = function(m, x) {
    return w.H.useLayoutEffect(m, x);
  }, P.useMemo = function(m, x) {
    return w.H.useMemo(m, x);
  }, P.useOptimistic = function(m, x) {
    return w.H.useOptimistic(m, x);
  }, P.useReducer = function(m, x, V) {
    return w.H.useReducer(m, x, V);
  }, P.useRef = function(m) {
    return w.H.useRef(m);
  }, P.useState = function(m) {
    return w.H.useState(m);
  }, P.useSyncExternalStore = function(m, x, V) {
    return w.H.useSyncExternalStore(
      m,
      x,
      V
    );
  }, P.useTransition = function() {
    return w.H.useTransition();
  }, P.version = "19.3.0", P;
}
var O0;
function Ws() {
  return O0 || (O0 = 1, Ys.exports = $y()), Ys.exports;
}
var G = Ws(), Gs = { exports: {} }, An = {}, Ls = { exports: {} }, Xs = {};
var M0;
function Fy() {
  return M0 || (M0 = 1, (function(f) {
    function v(C, q) {
      var $ = C.length;
      C.push(q);
      t: for (; 0 < $; ) {
        var pt = $ - 1 >>> 1, st = C[pt];
        if (0 < z(st, q))
          C[pt] = q, C[$] = st, $ = pt;
        else break t;
      }
    }
    function o(C) {
      return C.length === 0 ? null : C[0];
    }
    function s(C) {
      if (C.length === 0) return null;
      var q = C[0], $ = C.pop();
      if ($ !== q) {
        C[0] = $;
        t: for (var pt = 0, st = C.length, bl = st >>> 1; pt < bl; ) {
          var Wl = 2 * (pt + 1) - 1, kl = C[Wl], m = Wl + 1, x = C[m];
          if (0 > z(kl, $))
            m < st && 0 > z(x, kl) ? (C[pt] = x, C[m] = $, pt = m) : (C[pt] = kl, C[Wl] = $, pt = Wl);
          else if (m < st && 0 > z(x, $))
            C[pt] = x, C[m] = $, pt = m;
          else break t;
        }
      }
      return q;
    }
    function z(C, q) {
      var $ = C.sortIndex - q.sortIndex;
      return $ !== 0 ? $ : C.id - q.id;
    }
    if (f.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var y = performance;
      f.unstable_now = function() {
        return y.now();
      };
    } else {
      var O = Date, D = O.now();
      f.unstable_now = function() {
        return O.now() - D;
      };
    }
    var H = [], B = [], j = 1, _ = null, U = 3, Q = !1, nt = !1, it = !1, at = !1, Ut = typeof setTimeout == "function" ? setTimeout : null, Ot = typeof clearTimeout == "function" ? clearTimeout : null, Et = typeof setImmediate < "u" ? setImmediate : null;
    function Ht(C) {
      for (var q = o(B); q !== null; ) {
        if (q.callback === null) s(B);
        else if (q.startTime <= C)
          s(B), q.sortIndex = q.expirationTime, v(H, q);
        else break;
        q = o(B);
      }
    }
    function Yt(C) {
      if (it = !1, Ht(C), !nt)
        if (o(H) !== null)
          nt = !0, Xt || (Xt = !0, yt());
        else {
          var q = o(B);
          q !== null && X(Yt, q.startTime - C);
        }
    }
    var Xt = !1, k = -1, w = 5, Nt = -1;
    function I() {
      return at ? !0 : !(f.unstable_now() - Nt < w);
    }
    function rt() {
      if (at = !1, Xt) {
        var C = f.unstable_now();
        Nt = C;
        var q = !0;
        try {
          t: {
            nt = !1, it && (it = !1, Ot(k), k = -1), Q = !0;
            var $ = U;
            try {
              l: {
                for (Ht(C), _ = o(H); _ !== null && !(_.expirationTime > C && I()); ) {
                  var pt = _.callback;
                  if (typeof pt == "function") {
                    _.callback = null, U = _.priorityLevel;
                    var st = pt(
                      _.expirationTime <= C
                    );
                    if (C = f.unstable_now(), typeof st == "function") {
                      _.callback = st, Ht(C), q = !0;
                      break l;
                    }
                    _ === o(H) && s(H), Ht(C);
                  } else s(H);
                  _ = o(H);
                }
                if (_ !== null) q = !0;
                else {
                  var bl = o(B);
                  bl !== null && X(
                    Yt,
                    bl.startTime - C
                  ), q = !1;
                }
              }
              break t;
            } finally {
              _ = null, U = $, Q = !1;
            }
            q = void 0;
          }
        } finally {
          q ? yt() : Xt = !1;
        }
      }
    }
    var yt;
    if (typeof Et == "function")
      yt = function() {
        Et(rt);
      };
    else if (typeof MessageChannel < "u") {
      var kt = new MessageChannel(), ct = kt.port2;
      kt.port1.onmessage = rt, yt = function() {
        ct.postMessage(null);
      };
    } else
      yt = function() {
        Ut(rt, 0);
      };
    function X(C, q) {
      k = Ut(function() {
        C(f.unstable_now());
      }, q);
    }
    f.unstable_IdlePriority = 5, f.unstable_ImmediatePriority = 1, f.unstable_LowPriority = 4, f.unstable_NormalPriority = 3, f.unstable_Profiling = null, f.unstable_UserBlockingPriority = 2, f.unstable_cancelCallback = function(C) {
      C.callback = null;
    }, f.unstable_forceFrameRate = function(C) {
      0 > C || 125 < C ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : w = 0 < C ? Math.floor(1e3 / C) : 5;
    }, f.unstable_getCurrentPriorityLevel = function() {
      return U;
    }, f.unstable_next = function(C) {
      switch (U) {
        case 1:
        case 2:
        case 3:
          var q = 3;
          break;
        default:
          q = U;
      }
      var $ = U;
      U = q;
      try {
        return C();
      } finally {
        U = $;
      }
    }, f.unstable_requestPaint = function() {
      at = !0;
    }, f.unstable_runWithPriority = function(C, q) {
      switch (C) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          C = 3;
      }
      var $ = U;
      U = C;
      try {
        return q();
      } finally {
        U = $;
      }
    }, f.unstable_scheduleCallback = function(C, q, $) {
      var pt = f.unstable_now();
      switch (typeof $ == "object" && $ !== null ? ($ = $.delay, $ = typeof $ == "number" && 0 < $ ? pt + $ : pt) : $ = pt, C) {
        case 1:
          var st = -1;
          break;
        case 2:
          st = 250;
          break;
        case 5:
          st = 1073741823;
          break;
        case 4:
          st = 1e4;
          break;
        default:
          st = 5e3;
      }
      return st = $ + st, C = {
        id: j++,
        callback: q,
        priorityLevel: C,
        startTime: $,
        expirationTime: st,
        sortIndex: -1
      }, $ > pt ? (C.sortIndex = $, v(B, C), o(H) === null && C === o(B) && (it ? (Ot(k), k = -1) : it = !0, X(Yt, $ - pt))) : (C.sortIndex = st, v(H, C), nt || Q || (nt = !0, Xt || (Xt = !0, yt()))), C;
    }, f.unstable_shouldYield = I, f.unstable_wrapCallback = function(C) {
      var q = U;
      return function() {
        var $ = U;
        U = q;
        try {
          return C.apply(this, arguments);
        } finally {
          U = $;
        }
      };
    };
  })(Xs)), Xs;
}
var A0;
function Wy() {
  return A0 || (A0 = 1, Ls.exports = Fy()), Ls.exports;
}
var Qs = { exports: {} }, sl = {};
var C0;
function ky() {
  if (C0) return sl;
  C0 = 1;
  var f = Ws();
  function v(j) {
    var _ = "https://react.dev/errors/" + j;
    if (1 < arguments.length) {
      _ += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var U = 2; U < arguments.length; U++)
        _ += "&args[]=" + encodeURIComponent(arguments[U]);
    }
    return "Minified React error #" + j + "; visit " + _ + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function o() {
  }
  var s = {
    d: {
      f: o,
      r: function() {
        throw Error(v(522));
      },
      D: o,
      C: o,
      L: o,
      m: o,
      X: o,
      S: o,
      M: o
    },
    p: 0,
    findDOMNode: null
  }, z = /* @__PURE__ */ Symbol.for("react.portal"), y = /* @__PURE__ */ Symbol.for("react.recoverable"), O = /* @__PURE__ */ Symbol.for("react.optimistic_key");
  function D(j, _, U) {
    var Q = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: z,
      key: Q == null ? null : Q === O ? O : "" + Q,
      children: j,
      containerInfo: _,
      implementation: U
    };
  }
  var H = f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function B(j, _) {
    if (j === "font") return "";
    if (typeof _ == "string")
      return _ === "use-credentials" ? _ : "";
  }
  return sl.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, sl.browser = function(j) {
    return { $$typeof: y, _reason: j };
  }, sl.createPortal = function(j, _) {
    var U = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!_ || _.nodeType !== 1 && _.nodeType !== 9 && _.nodeType !== 11)
      throw Error(v(299));
    return D(j, _, null, U);
  }, sl.flushSync = function(j) {
    var _ = H.T, U = s.p;
    try {
      if (H.T = null, s.p = 2, j) return j();
    } finally {
      H.T = _, s.p = U, s.d.f();
    }
  }, sl.preconnect = function(j, _) {
    typeof j == "string" && (_ ? (_ = _.crossOrigin, _ = typeof _ == "string" ? _ === "use-credentials" ? _ : "" : void 0) : _ = null, s.d.C(j, _));
  }, sl.prefetchDNS = function(j) {
    typeof j == "string" && s.d.D(j);
  }, sl.preinit = function(j, _) {
    if (typeof j == "string" && _ && typeof _.as == "string") {
      var U = _.as, Q = B(U, _.crossOrigin), nt = typeof _.integrity == "string" ? _.integrity : void 0, it = typeof _.fetchPriority == "string" ? _.fetchPriority : void 0;
      U === "style" ? s.d.S(
        j,
        typeof _.precedence == "string" ? _.precedence : void 0,
        {
          crossOrigin: Q,
          integrity: nt,
          fetchPriority: it
        }
      ) : U === "script" && s.d.X(j, {
        crossOrigin: Q,
        integrity: nt,
        fetchPriority: it,
        nonce: typeof _.nonce == "string" ? _.nonce : void 0
      });
    }
  }, sl.preinitModule = function(j, _) {
    if (typeof j == "string")
      if (typeof _ == "object" && _ !== null) {
        if (_.as == null || _.as === "script") {
          var U = B(
            _.as,
            _.crossOrigin
          );
          s.d.M(j, {
            crossOrigin: U,
            integrity: typeof _.integrity == "string" ? _.integrity : void 0,
            nonce: typeof _.nonce == "string" ? _.nonce : void 0,
            fetchPriority: typeof _.fetchPriority == "string" ? _.fetchPriority : void 0
          });
        }
      } else _ == null && s.d.M(j);
  }, sl.preload = function(j, _) {
    if (typeof j == "string" && typeof _ == "object" && _ !== null && typeof _.as == "string") {
      var U = _.as, Q = B(U, _.crossOrigin);
      s.d.L(j, U, {
        crossOrigin: Q,
        integrity: typeof _.integrity == "string" ? _.integrity : void 0,
        nonce: typeof _.nonce == "string" ? _.nonce : void 0,
        type: typeof _.type == "string" ? _.type : void 0,
        fetchPriority: typeof _.fetchPriority == "string" ? _.fetchPriority : void 0,
        referrerPolicy: typeof _.referrerPolicy == "string" ? _.referrerPolicy : void 0,
        imageSrcSet: typeof _.imageSrcSet == "string" ? _.imageSrcSet : void 0,
        imageSizes: typeof _.imageSizes == "string" ? _.imageSizes : void 0,
        media: typeof _.media == "string" ? _.media : void 0
      });
    }
  }, sl.preloadModule = function(j, _) {
    if (typeof j == "string")
      if (_) {
        var U = B(_.as, _.crossOrigin);
        s.d.m(j, {
          as: typeof _.as == "string" && _.as !== "script" ? _.as : void 0,
          crossOrigin: U,
          integrity: typeof _.integrity == "string" ? _.integrity : void 0,
          nonce: typeof _.nonce == "string" ? _.nonce : void 0,
          fetchPriority: typeof _.fetchPriority == "string" ? _.fetchPriority : void 0
        });
      } else s.d.m(j);
  }, sl.requestFormReset = function(j) {
    s.d.r(j);
  }, sl.unstable_batchedUpdates = function(j, _) {
    return j(_);
  }, sl.useFormState = function(j, _, U) {
    return H.H.useFormState(j, _, U);
  }, sl.useFormStatus = function() {
    return H.H.useHostTransitionStatus();
  }, sl.version = "19.3.0", sl;
}
var D0;
function Iy() {
  if (D0) return Qs.exports;
  D0 = 1;
  function f() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
      } catch (v) {
        console.error(v);
      }
  }
  return f(), Qs.exports = ky(), Qs.exports;
}
var x0;
function Py() {
  if (x0) return An;
  x0 = 1;
  var f = Wy(), v = Ws(), o = Iy();
  function s(t) {
    var l = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      l += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var e = 2; e < arguments.length; e++)
        l += "&args[]=" + encodeURIComponent(arguments[e]);
    }
    return "Minified React error #" + t + "; visit " + l + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function z(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function y(t) {
    for (var l = t, e = l; e && !e.alternate; )
      l = e, (l.flags & 4098) !== 0 && (t = l.return), e = l.return;
    for (; l.return; ) l = l.return;
    return l.tag === 3 ? t : null;
  }
  function O(t) {
    if (t.tag === 13) {
      var l = t.memoizedState;
      if (l === null && (t = t.alternate, t !== null && (l = t.memoizedState)), l !== null) return l.dehydrated;
    }
    return null;
  }
  function D(t) {
    if (t.tag === 31) {
      var l = t.memoizedState;
      if (l === null && (t = t.alternate, t !== null && (l = t.memoizedState)), l !== null) return l.dehydrated;
    }
    return null;
  }
  function H(t) {
    if (y(t) !== t)
      throw Error(s(188));
  }
  function B(t) {
    var l = t.alternate;
    if (!l) {
      if (l = y(t), l === null) throw Error(s(188));
      return l !== t ? null : t;
    }
    for (var e = t, a = l; ; ) {
      var u = e.return;
      if (u === null) break;
      var n = u.alternate;
      if (n === null) {
        if (a = u.return, a !== null) {
          e = a;
          continue;
        }
        break;
      }
      if (u.child === n.child) {
        for (n = u.child; n; ) {
          if (n === e) return H(u), t;
          if (n === a) return H(u), l;
          n = n.sibling;
        }
        throw Error(s(188));
      }
      if (e.return !== a.return) e = u, a = n;
      else {
        for (var i = !1, c = u.child; c; ) {
          if (c === e) {
            i = !0, e = u, a = n;
            break;
          }
          if (c === a) {
            i = !0, a = u, e = n;
            break;
          }
          c = c.sibling;
        }
        if (!i) {
          for (c = n.child; c; ) {
            if (c === e) {
              i = !0, e = n, a = u;
              break;
            }
            if (c === a) {
              i = !0, a = n, e = u;
              break;
            }
            c = c.sibling;
          }
          if (!i) throw Error(s(189));
        }
      }
      if (e.alternate !== a) throw Error(s(190));
    }
    if (e.tag !== 3) throw Error(s(188));
    return e.stateNode.current === e ? t : l;
  }
  function j(t) {
    var l = t.tag;
    if (l === 5 || l === 26 || l === 27 || l === 6) return t;
    for (t = t.child; t !== null; ) {
      if (l = j(t), l !== null) return l;
      t = t.sibling;
    }
    return null;
  }
  function _(t, l, e, a, u, n) {
    for (; t !== null; ) {
      if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && e(t, a, u, n) || (t.tag !== 22 || t.memoizedState === null) && (l || t.tag !== 5 && t.tag !== 27) && _(
        t.child,
        l,
        e,
        a,
        u,
        n
      ))
        return !0;
      t = t.sibling;
    }
    return !1;
  }
  function U(t) {
    for (t = t.return; t !== null; ) {
      if (t.tag === 3 || t.tag === 5 || t.tag === 27) return t;
      t = t.return;
    }
    return null;
  }
  function Q(t) {
    var l = !1;
    for (t = t.return; t !== null && (t.tag === 4 && (l = !0), !(t.tag === 3 || t.tag === 5 || t.tag === 27)); )
      t = t.return;
    return l;
  }
  function nt(t) {
    var l = [null, null], e = U(t);
    return e === null || it(
      l,
      t,
      e.child,
      { foundSelf: !1 }
    ), l;
  }
  function it(t, l, e, a) {
    for (; e !== null; ) {
      if (e === l) a.foundSelf = !0;
      else if (e.tag === 5 || e.tag === 27 || e.tag === 6) {
        if (a.foundSelf) return t[1] = e, !0;
        t[0] = e;
      } else if ((e.tag !== 22 || e.memoizedState === null) && it(
        t,
        l,
        e.child,
        a
      ))
        return !0;
      e = e.sibling;
    }
    return !1;
  }
  function at(t) {
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
  var Ut = null, Ot = null;
  function Et(t, l, e) {
    return t === e ? !0 : t === l ? (Ut = t, !0) : !1;
  }
  function Ht(t, l, e) {
    return t === e ? (Ot = t, !1) : t === l ? (Ot !== null && (Ut = t), !0) : !1;
  }
  function Yt(t) {
    if (t === null) return null;
    do
      t = t === null ? null : t.return;
    while (t && t.tag !== 5 && t.tag !== 27 && t.tag !== 3);
    return t || null;
  }
  function Xt(t, l, e) {
    for (var a = 0, u = t; u; u = e(u)) a++;
    u = 0;
    for (var n = l; n; n = e(n)) u++;
    for (; 0 < a - u; ) t = e(t), a--;
    for (; 0 < u - a; ) l = e(l), u--;
    for (; a--; ) {
      if (t === l || l !== null && t === l.alternate)
        return t;
      t = e(t), l = e(l);
    }
    return null;
  }
  var k = Object.assign, w = /* @__PURE__ */ Symbol.for("react.element"), Nt = /* @__PURE__ */ Symbol.for("react.transitional.element"), I = /* @__PURE__ */ Symbol.for("react.portal"), rt = /* @__PURE__ */ Symbol.for("react.fragment"), yt = /* @__PURE__ */ Symbol.for("react.strict_mode"), kt = /* @__PURE__ */ Symbol.for("react.profiler"), ct = /* @__PURE__ */ Symbol.for("react.consumer"), X = /* @__PURE__ */ Symbol.for("react.context"), C = /* @__PURE__ */ Symbol.for("react.forward_ref"), q = /* @__PURE__ */ Symbol.for("react.suspense"), $ = /* @__PURE__ */ Symbol.for("react.suspense_list"), pt = /* @__PURE__ */ Symbol.for("react.memo"), st = /* @__PURE__ */ Symbol.for("react.lazy"), bl = /* @__PURE__ */ Symbol.for("react.activity"), Wl = /* @__PURE__ */ Symbol.for("react.legacy_hidden"), kl = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), m = /* @__PURE__ */ Symbol.for("react.view_transition"), x = /* @__PURE__ */ Symbol.for("react.recoverable"), V = Symbol.iterator;
  function K(t) {
    return t === null || typeof t != "object" ? null : (t = V && t[V] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var ot = /* @__PURE__ */ Symbol.for("react.client.reference");
  function gt(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === ot ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case rt:
        return "Fragment";
      case kt:
        return "Profiler";
      case yt:
        return "StrictMode";
      case q:
        return "Suspense";
      case $:
        return "SuspenseList";
      case bl:
        return "Activity";
      case m:
        return "ViewTransition";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case I:
          return "Portal";
        case X:
          return t.displayName || "Context";
        case ct:
          return (t._context.displayName || "Context") + ".Consumer";
        case C:
          var l = t.render;
          return t = t.displayName, t || (t = l.displayName || l.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case pt:
          return l = t.displayName || null, l !== null ? l : gt(t.type) || "Memo";
        case st:
          l = t._payload, t = t._init;
          try {
            return gt(t(l));
          } catch {
          }
      }
    return null;
  }
  var bt = Array.isArray, L = v.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, F = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Gl = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, oa = [], je = -1;
  function Ml(t) {
    return { current: t };
  }
  function Ft(t) {
    0 > je || (t.current = oa[je], oa[je] = null, je--);
  }
  function _t(t, l) {
    je++, oa[je] = t.current, t.current = l;
  }
  var At = Ml(null), ra = Ml(null), ne = Ml(null), He = Ml(null);
  function La(t, l) {
    switch (_t(ne, l), _t(ra, t), _t(At, null), l.nodeType) {
      case 9:
      case 11:
        t = (t = l.documentElement) && (t = t.namespaceURI) ? Um(t) : 0;
        break;
      default:
        if (t = l.tagName, l = l.namespaceURI)
          l = Um(l), t = Rm(l, t);
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
    Ft(At), _t(At, t);
  }
  function ie() {
    Ft(At), Ft(ra), Ft(ne);
  }
  function Uu(t) {
    var l = t.memoizedState;
    l !== null && (Au._currentValue = l.memoizedState, _t(He, t)), l = At.current;
    var e = Rm(l, t.type);
    l !== e && (_t(ra, t), _t(At, e));
  }
  function Xa(t) {
    ra.current === t && (Ft(At), Ft(ra)), He.current === t && (Ft(He), Au._currentValue = Gl);
  }
  var N, tt;
  function ut(t) {
    if (N === void 0)
      try {
        throw Error();
      } catch (e) {
        var l = e.stack.trim().match(/\n( *(at )?)/);
        N = l && l[1] || "", tt = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + N + t + tt;
  }
  var ol = !1;
  function It(t, l) {
    if (!t || ol) return "";
    ol = !0;
    var e = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (l) {
              var A = function() {
                throw Error();
              };
              if (Object.defineProperty(A.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(A, []);
                } catch (R) {
                  var h = R;
                }
                Reflect.construct(t, [], A);
              } else {
                try {
                  A.call();
                } catch (R) {
                  h = R;
                }
                A = !1;
                try {
                  var p = Object.getOwnPropertyDescriptor(
                    t.prototype,
                    "props"
                  );
                  Object.defineProperty(t.prototype, "props", {
                    configurable: !0,
                    set: function() {
                      throw Error();
                    }
                  }), A = !0, new t();
                } finally {
                  A && (p !== void 0 ? Object.defineProperty(t.prototype, "props", p) : delete t.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (R) {
                h = R;
              }
              (A = t()) && typeof A.catch == "function" && A.catch(function() {
              });
            }
          } catch (R) {
            if (R && h && typeof R.stack == "string")
              return [R.stack, h.stack];
          }
          return [null, null];
        }
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name"
      );
      u && u.configurable && Object.defineProperty(
        a.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var n = a.DetermineComponentFrameRoot(), i = n[0], c = n[1];
      if (i && c) {
        var r = i.split(`
`), b = c.split(`
`);
        for (u = a = 0; a < r.length && !r[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; u < b.length && !b[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (a === r.length || u === b.length)
          for (a = r.length - 1, u = b.length - 1; 1 <= a && 0 <= u && r[a] !== b[u]; )
            u--;
        for (; 1 <= a && 0 <= u; a--, u--)
          if (r[a] !== b[u]) {
            if (a !== 1 || u !== 1)
              do
                if (a--, u--, 0 > u || r[a] !== b[u]) {
                  var T = `
` + r[a].replace(" at new ", " at ");
                  return t.displayName && T.includes("<anonymous>") && (T = T.replace("<anonymous>", t.displayName)), T;
                }
              while (1 <= a && 0 <= u);
            break;
          }
      }
    } finally {
      ol = !1, Error.prepareStackTrace = e;
    }
    return (e = t ? t.displayName || t.name : "") ? ut(e) : "";
  }
  function Sl(t, l) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return ut(t.type);
      case 16:
        return ut("Lazy");
      case 13:
        return t.child !== l && l !== null ? ut("Suspense Fallback") : ut("Suspense");
      case 19:
        return ut("SuspenseList");
      case 0:
      case 15:
        return It(t.type, !1);
      case 11:
        return It(t.type.render, !1);
      case 1:
        return It(t.type, !0);
      case 31:
        return ut("Activity");
      case 30:
        return ut("ViewTransition");
      default:
        return "";
    }
  }
  function pl(t) {
    try {
      var l = "", e = null;
      do
        l += Sl(t, e), e = t, t = t.return;
      while (t);
      return l;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var rl = Object.prototype.hasOwnProperty, da = f.unstable_scheduleCallback, fc = f.unstable_cancelCallback, k0 = f.unstable_shouldYield, I0 = f.unstable_requestPaint, Al = f.unstable_now, P0 = f.unstable_getCurrentPriorityLevel, to = f.unstable_ImmediatePriority, lo = f.unstable_UserBlockingPriority, xn = f.unstable_NormalPriority, tv = f.unstable_LowPriority, eo = f.unstable_IdlePriority, lv = f.log, ev = f.unstable_setDisableYieldValue, Ru = null, Cl = null;
  function Be(t) {
    if (typeof lv == "function" && ev(t), Cl && typeof Cl.setStrictMode == "function")
      try {
        Cl.setStrictMode(Ru, t);
      } catch {
      }
  }
  var Dl = Math.clz32 ? Math.clz32 : nv, av = Math.log, uv = Math.LN2;
  function nv(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (av(t) / uv | 0) | 0;
  }
  var Un = 256, Rn = 262144, jn = 4194304;
  function ma(t) {
    var l = t & 42;
    if (l !== 0) return l;
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
  function Hn(t, l, e) {
    var a = t.pendingLanes;
    if (a === 0) return 0;
    var u = 0, n = t.suspendedLanes, i = t.pingedLanes;
    t = t.warmLanes;
    var c = a & 134217727;
    return c !== 0 ? (a = c & ~n, a !== 0 ? u = ma(a) : (i &= c, i !== 0 ? u = ma(i) : e || (e = c & ~t, e !== 0 && (u = ma(e))))) : (c = a & ~n, c !== 0 ? u = ma(c) : i !== 0 ? u = ma(i) : e || (e = a & ~t, e !== 0 && (u = ma(e)))), u === 0 ? 0 : l !== 0 && l !== u && (l & n) === 0 && (n = u & -u, e = l & -l, n >= e || n === 32 && (e & 4194048) !== 0) ? l : u;
  }
  function ju(t, l) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & l) === 0;
  }
  function ao(t, l) {
    (l & 8) !== 0 && (l |= l & 32);
    var e = t.entangledLanes;
    if (e !== 0)
      for (t = t.entanglements, e &= l; 0 < e; ) {
        var a = 31 - Dl(e), u = 1 << a;
        l |= t[a], e &= ~u;
      }
    return l;
  }
  function iv(t, l) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return l + 250;
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
        return l + 5e3;
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
  function uo() {
    var t = jn;
    return jn <<= 1, (jn & 62914560) === 0 && (jn = 4194304), t;
  }
  function sc(t) {
    for (var l = [], e = 0; 31 > e; e++) l.push(t);
    return l;
  }
  function Hu(t, l) {
    t.pendingLanes |= l, l !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function cv(t, l, e, a, u, n) {
    var i = t.pendingLanes;
    t.pendingLanes = e, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= e, t.entangledLanes &= e, t.errorRecoveryDisabledLanes &= e, t.shellSuspendCounter = 0;
    var c = t.entanglements, r = t.expirationTimes, b = t.hiddenUpdates;
    for (e = i & ~e; 0 < e; ) {
      var T = 31 - Dl(e), A = 1 << T;
      c[T] = 0, r[T] = -1;
      var h = b[T];
      if (h !== null)
        for (b[T] = null, T = 0; T < h.length; T++) {
          var p = h[T];
          p !== null && (p.lane &= -536870913);
        }
      e &= ~A;
    }
    a !== 0 && no(t, a, 0), n !== 0 && u === 0 && t.tag !== 0 && (t.suspendedLanes |= n & ~(i & ~l));
  }
  function no(t, l, e) {
    t.pendingLanes |= l, t.suspendedLanes &= ~l;
    var a = 31 - Dl(l);
    t.entangledLanes |= l, t.entanglements[a] = t.entanglements[a] | 1073741824 | e & 261930;
  }
  function io(t, l) {
    var e = t.entangledLanes |= l;
    for (t = t.entanglements; e; ) {
      var a = 31 - Dl(e), u = 1 << a;
      u & l | t[a] & l && (t[a] |= l), e &= ~u;
    }
  }
  function co(t, l) {
    var e = l & -l;
    return e = (e & 42) !== 0 ? 1 : oc(e), (e & (t.suspendedLanes | l)) !== 0 ? 0 : e;
  }
  function oc(t) {
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
  function rc(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function fo() {
    var t = F.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : y0(t.type));
  }
  function so(t, l) {
    var e = F.p;
    try {
      return F.p = t, l();
    } finally {
      F.p = e;
    }
  }
  var Se = Math.random().toString(36).slice(2), al = "__reactFiber$" + Se, _l = "__reactProps$" + Se, Qa = "__reactContainer$" + Se, oo = "__reactEvents$" + Se, fv = "__reactListeners$" + Se, sv = "__reactHandles$" + Se, ro = "__reactResources$" + Se, Bu = "__reactMarker$" + Se, Bn = "__reactLoad$" + Se;
  function qn(t) {
    delete t[al], delete t[_l], delete t[fv], delete t[sv];
  }
  function va(t) {
    var l;
    if (l = t[al]) return l;
    for (var e = t.parentNode; e; ) {
      if (l = e[Qa] || e[al]) {
        if (e = l.alternate, l.child !== null || e !== null && e.child !== null)
          for (t = Wm(t); t !== null; ) {
            if (e = t[al]) return e;
            t = Wm(t);
          }
        return l;
      }
      t = e, e = t.parentNode;
    }
    return null;
  }
  function Za(t) {
    if (t = t[al] || t[Qa]) {
      var l = t.tag;
      if (l === 5 || l === 6 || l === 13 || l === 31 || l === 26 || l === 27 || l === 3)
        return t;
    }
    return null;
  }
  function qu(t) {
    var l = t.tag;
    if (l === 5 || l === 26 || l === 27 || l === 6) return t.stateNode;
    throw Error(s(33));
  }
  function Va(t) {
    var l = t[ro];
    return l || (l = t[ro] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), l;
  }
  function Pt(t) {
    t[Bu] = !0;
  }
  function mo(t) {
    t[Bn] = void 0;
  }
  var vo = /* @__PURE__ */ new Set(), ho = {};
  function ha(t, l) {
    wa(t, l), wa(t + "Capture", l);
  }
  function wa(t, l) {
    for (ho[t] = l, t = 0; t < l.length; t++)
      vo.add(l[t]);
  }
  var ov = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), yo = {}, go = {};
  function rv(t) {
    return rl.call(go, t) ? !0 : rl.call(yo, t) ? !1 : ov.test(t) ? go[t] = !0 : (yo[t] = !0, !1);
  }
  var Tt = !1;
  function bo() {
    var t = Tt;
    return Tt = !1, t;
  }
  function Yn(t, l, e) {
    if (rv(l))
      if (e === null) t.removeAttribute(l);
      else {
        switch (typeof e) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(l);
            return;
          case "boolean":
            var a = l.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              t.removeAttribute(l);
              return;
            }
        }
        t.setAttribute(l, e);
      }
  }
  function Gn(t, l, e) {
    if (e === null) t.removeAttribute(l);
    else {
      switch (typeof e) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(l);
          return;
      }
      t.setAttribute(l, e);
    }
  }
  function pe(t, l, e, a) {
    if (a === null) t.removeAttribute(e);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(e);
          return;
      }
      t.setAttributeNS(l, e, a);
    }
  }
  function xl(t) {
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
  function So(t) {
    var l = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (l === "checkbox" || l === "radio");
  }
  function dv(t, l, e) {
    var a = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      l
    );
    if (!t.hasOwnProperty(l) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
      var u = a.get, n = a.set;
      return Object.defineProperty(t, l, {
        configurable: !0,
        get: function() {
          return u.call(this);
        },
        set: function(i) {
          e = "" + i, n.call(this, i);
        }
      }), Object.defineProperty(t, l, {
        enumerable: a.enumerable
      }), {
        getValue: function() {
          return e;
        },
        setValue: function(i) {
          e = "" + i;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[l];
        }
      };
    }
  }
  function dc(t) {
    if (!t._valueTracker) {
      var l = So(t) ? "checked" : "value";
      t._valueTracker = dv(
        t,
        l,
        "" + t[l]
      );
    }
  }
  function po(t) {
    if (!t) return !1;
    var l = t._valueTracker;
    if (!l) return !0;
    var e = l.getValue(), a = "";
    return t && (a = So(t) ? t.checked ? "true" : "false" : t.value), t = a, t !== e ? (l.setValue(t), !0) : !1;
  }
  var mv = /[\n"\\]/g;
  function Ll(t) {
    return t.replace(
      mv,
      function(l) {
        return "\\" + l.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function mc(t, l, e, a, u, n, i, c) {
    t.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? t.type = i : t.removeAttribute("type"), l != null ? i === "number" ? (l === 0 && t.value === "" || t.value != l) && (t.value = "" + xl(l)) : t.value !== "" + xl(l) && (t.value = "" + xl(l)) : i !== "submit" && i !== "reset" || t.removeAttribute("value"), l != null ? i === "number" && t.value == l ? vc(t, xl(t.value)) : vc(t, xl(l)) : e != null ? vc(t, xl(e)) : a != null && t.removeAttribute("value"), u == null && n != null && (t.defaultChecked = !!n), u != null && (t.checked = u && typeof u != "function" && typeof u != "symbol"), c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? t.name = "" + xl(c) : t.removeAttribute("name");
  }
  function _o(t, l, e, a, u, n, i, c) {
    if (n != null && typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" && (t.type = n), l != null || e != null) {
      if (!(n !== "submit" && n !== "reset" || l != null)) {
        dc(t);
        return;
      }
      e = e != null ? "" + xl(e) : "", l = l != null ? "" + xl(l) : e, c || l === t.value || (t.value = l), t.defaultValue = l;
    }
    a = a ?? u, a = typeof a != "function" && typeof a != "symbol" && !!a, t.checked = c ? t.checked : !!a, t.defaultChecked = !!a, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (t.name = i), dc(t);
  }
  function vc(t, l) {
    t.defaultValue !== "" + l && (t.defaultValue = "" + l);
  }
  function Ka(t, l, e, a) {
    if (t = t.options, l) {
      l = {};
      for (var u = 0; u < e.length; u++)
        l["$" + e[u]] = !0;
      for (e = 0; e < t.length; e++)
        u = l.hasOwnProperty("$" + t[e].value), t[e].selected !== u && (t[e].selected = u), u && a && (t[e].defaultSelected = !0);
    } else {
      for (e = "" + xl(e), l = null, u = 0; u < t.length; u++) {
        if (t[u].value === e) {
          t[u].selected = !0, a && (t[u].defaultSelected = !0);
          return;
        }
        l !== null || t[u].disabled || (l = t[u]);
      }
      l !== null && (l.selected = !0);
    }
  }
  function To(t, l, e) {
    if (l != null && (l = "" + xl(l), l !== t.value && (t.value = l), e == null)) {
      t.defaultValue !== l && (t.defaultValue = l);
      return;
    }
    t.defaultValue = e != null ? "" + xl(e) : "";
  }
  function Eo(t, l, e, a) {
    if (l == null) {
      if (a != null) {
        if (e != null) throw Error(s(92));
        if (bt(a)) {
          if (1 < a.length) throw Error(s(93));
          a = a[0];
        }
        e = a;
      }
      e == null && (e = ""), l = e;
    }
    e = xl(l), t.defaultValue = e, a = t.textContent, a === e && a !== "" && a !== null && (t.value = a), dc(t);
  }
  function Ja(t, l) {
    if (l) {
      var e = t.firstChild;
      if (e && e === t.lastChild && e.nodeType === 3) {
        e.nodeValue = l;
        return;
      }
    }
    t.textContent = l;
  }
  var vv = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function No(t, l, e) {
    var a = l.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === "" ? a ? t.setProperty(l, "") : l === "float" ? t.cssFloat = "" : t[l] = "" : a ? t.setProperty(l, e) : typeof e != "number" || e === 0 || vv.has(l) ? l === "float" ? t.cssFloat = e : t[l] = ("" + e).trim() : t[l] = e + "px";
  }
  function zo(t, l, e) {
    if (l != null && typeof l != "object")
      throw Error(s(62));
    if (t = t.style, e != null) {
      for (var a in e)
        !e.hasOwnProperty(a) || l != null && l.hasOwnProperty(a) || (a.indexOf("--") === 0 ? t.setProperty(a, "") : a === "float" ? t.cssFloat = "" : t[a] = "", Tt = !0);
      for (var u in l)
        a = l[u], l.hasOwnProperty(u) && e[u] !== a && (No(t, u, a), Tt = !0);
    } else
      for (var n in l)
        l.hasOwnProperty(n) && No(t, n, l[n]);
  }
  function hc(t) {
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
  var hv = /* @__PURE__ */ new Map([
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
  ]), yv = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Ln(t) {
    return yv.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function ce() {
  }
  var yc = null;
  function gc(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var $a = null, Fa = null;
  function Oo(t) {
    var l = Za(t);
    if (l && (t = l.stateNode)) {
      var e = t[_l] || null;
      t: switch (t = l.stateNode, l.type) {
        case "input":
          if (mc(
            t,
            e.value,
            e.defaultValue,
            e.defaultValue,
            e.checked,
            e.defaultChecked,
            e.type,
            e.name
          ), l = e.name, e.type === "radio" && l != null) {
            for (e = t; e.parentNode; ) e = e.parentNode;
            for (e = e.querySelectorAll(
              'input[name="' + Ll(
                "" + l
              ) + '"][type="radio"]'
            ), l = 0; l < e.length; l++) {
              var a = e[l];
              if (a !== t && a.form === t.form) {
                var u = a[_l] || null;
                if (!u) throw Error(s(90));
                mc(
                  a,
                  u.value,
                  u.defaultValue,
                  u.defaultValue,
                  u.checked,
                  u.defaultChecked,
                  u.type,
                  u.name
                );
              }
            }
            for (l = 0; l < e.length; l++)
              a = e[l], a.form === t.form && po(a);
          }
          break t;
        case "textarea":
          To(t, e.value, e.defaultValue);
          break t;
        case "select":
          l = e.value, l != null && Ka(t, !!e.multiple, l, !1);
      }
    }
  }
  var bc = !1;
  function Mo(t, l, e) {
    if (bc) return t(l, e);
    bc = !0;
    try {
      var a = t(l);
      return a;
    } finally {
      if (bc = !1, ($a !== null || Fa !== null) && (Li(), $a && (l = $a, t = Fa, Fa = $a = null, Oo(l), t)))
        for (l = 0; l < t.length; l++) Oo(t[l]);
    }
  }
  function Yu(t, l) {
    var e = t.stateNode;
    if (e === null) return null;
    var a = e[_l] || null;
    if (a === null) return null;
    e = a[l];
    t: switch (l) {
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
    if (e && typeof e != "function")
      throw Error(
        s(231, l, typeof e)
      );
    return e;
  }
  var _e = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Sc = !1;
  if (_e)
    try {
      var Gu = {};
      Object.defineProperty(Gu, "passive", {
        get: function() {
          Sc = !0;
        }
      }), window.addEventListener("test", Gu, Gu), window.removeEventListener("test", Gu, Gu);
    } catch {
      Sc = !1;
    }
  var qe = null, pc = null, Xn = null;
  function Ao() {
    if (Xn) return Xn;
    var t, l = pc, e = l.length, a, u = "value" in qe ? qe.value : qe.textContent, n = u.length;
    for (t = 0; t < e && l[t] === u[t]; t++) ;
    var i = e - t;
    for (a = 1; a <= i && l[e - a] === u[n - a]; a++) ;
    return Xn = u.slice(t, 1 < a ? 1 - a : void 0);
  }
  function Qn(t) {
    var l = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && l === 13 && (t = 13)) : t = l, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function Zn() {
    return !0;
  }
  function Co() {
    return !1;
  }
  function vl(t) {
    function l(e, a, u, n, i) {
      this._reactName = e, this._targetInst = u, this.type = a, this.nativeEvent = n, this.target = i, this.currentTarget = null;
      for (var c in t)
        t.hasOwnProperty(c) && (e = t[c], this[c] = e ? e(n) : n[c]);
      return this.isDefaultPrevented = (n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1) ? Zn : Co, this.isPropagationStopped = Co, this;
    }
    return k(l.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var e = this.nativeEvent;
        e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = Zn);
      },
      stopPropagation: function() {
        var e = this.nativeEvent;
        e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = Zn);
      },
      persist: function() {
      },
      isPersistent: Zn
    }), l;
  }
  var Ye = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Vn = vl(Ye), Lu = k({}, Ye, { view: 0, detail: 0 }), gv = vl(Lu), _c, Tc, Xu, wn = k({}, Lu, {
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
    getModifierState: Nc,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== Xu && (Xu && t.type === "mousemove" ? (_c = t.screenX - Xu.screenX, Tc = t.screenY - Xu.screenY) : Tc = _c = 0, Xu = t), _c);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : Tc;
    }
  }), Do = vl(wn), bv = k({}, wn, { dataTransfer: 0 }), Sv = vl(bv), pv = k({}, Lu, { relatedTarget: 0 }), Ec = vl(pv), _v = k({}, Ye, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Tv = vl(_v), Ev = k({}, Ye, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), Nv = vl(Ev), zv = k({}, Ye, { data: 0 }), xo = vl(zv), Ov = {
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
  }, Mv = {
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
  }, Av = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Cv(t) {
    var l = this.nativeEvent;
    return l.getModifierState ? l.getModifierState(t) : (t = Av[t]) ? !!l[t] : !1;
  }
  function Nc() {
    return Cv;
  }
  var Dv = k({}, Lu, {
    key: function(t) {
      if (t.key) {
        var l = Ov[t.key] || t.key;
        if (l !== "Unidentified") return l;
      }
      return t.type === "keypress" ? (t = Qn(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? Mv[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Nc,
    charCode: function(t) {
      return t.type === "keypress" ? Qn(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? Qn(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), xv = vl(Dv), Uv = k({}, wn, {
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
  }), Uo = vl(Uv), Rv = k({}, Ye, { submitter: 0 }), jv = vl(Rv), Hv = k({}, Lu, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Nc
  }), Bv = vl(Hv), qv = k({}, Ye, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Yv = vl(qv), Gv = k({}, wn, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Lv = vl(Gv), Xv = k({}, Ye, {
    newState: 0,
    oldState: 0,
    source: 0
  }), Qv = vl(Xv), Zv = [9, 13, 27, 32], zc = _e && "CompositionEvent" in window, Qu = null;
  _e && "documentMode" in document && (Qu = document.documentMode);
  var Vv = _e && "TextEvent" in window && !Qu, Ro = _e && (!zc || Qu && 8 < Qu && 11 >= Qu), jo = " ", Ho = !1;
  function Bo(t, l) {
    switch (t) {
      case "keyup":
        return Zv.indexOf(l.keyCode) !== -1;
      case "keydown":
        return l.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function qo(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var Wa = !1;
  function wv(t, l) {
    switch (t) {
      case "compositionend":
        return qo(l);
      case "keypress":
        return l.which !== 32 ? null : (Ho = !0, jo);
      case "textInput":
        return t = l.data, t === jo && Ho ? null : t;
      default:
        return null;
    }
  }
  function Kv(t, l) {
    if (Wa)
      return t === "compositionend" || !zc && Bo(t, l) ? (t = Ao(), Xn = pc = qe = null, Wa = !1, t) : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(l.ctrlKey || l.altKey || l.metaKey) || l.ctrlKey && l.altKey) {
          if (l.char && 1 < l.char.length)
            return l.char;
          if (l.which) return String.fromCharCode(l.which);
        }
        return null;
      case "compositionend":
        return Ro && l.locale !== "ko" ? null : l.data;
      default:
        return null;
    }
  }
  var Jv = {
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
  function Yo(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l === "input" ? !!Jv[t.type] : l === "textarea";
  }
  function Go(t, l, e, a) {
    $a ? Fa ? Fa.push(a) : Fa = [a] : $a = a, l = Ki(l, "onChange"), 0 < l.length && (e = new Vn(
      "onChange",
      "change",
      null,
      e,
      a
    ), t.push({ event: e, listeners: l }));
  }
  var Zu = null, Vu = null;
  function $v(t) {
    Om(t, 0);
  }
  function Kn(t) {
    var l = qu(t);
    if (po(l)) return t;
  }
  function Lo(t, l) {
    if (t === "change") return l;
  }
  var Xo = !1;
  if (_e) {
    var Oc;
    if (_e) {
      var Mc = "oninput" in document;
      if (!Mc) {
        var Qo = document.createElement("div");
        Qo.setAttribute("oninput", "return;"), Mc = typeof Qo.oninput == "function";
      }
      Oc = Mc;
    } else Oc = !1;
    Xo = Oc && (!document.documentMode || 9 < document.documentMode);
  }
  function Zo() {
    Zu && (Zu.detachEvent("onpropertychange", Vo), Vu = Zu = null);
  }
  function Vo(t) {
    if (t.propertyName === "value" && Kn(Vu)) {
      var l = [];
      Go(
        l,
        Vu,
        t,
        gc(t)
      ), Mo($v, l);
    }
  }
  function Fv(t, l, e) {
    t === "focusin" ? (Zo(), Zu = l, Vu = e, Zu.attachEvent("onpropertychange", Vo)) : t === "focusout" && Zo();
  }
  function Wv(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return Kn(Vu);
  }
  function kv(t, l) {
    if (t === "click") return Kn(l);
  }
  function Iv(t, l) {
    if (t === "input" || t === "change")
      return Kn(l);
  }
  function Pv(t, l) {
    return t === l && (t !== 0 || 1 / t === 1 / l) || t !== t && l !== l;
  }
  var Ul = typeof Object.is == "function" ? Object.is : Pv;
  function wu(t, l) {
    if (Ul(t, l)) return !0;
    if (typeof t != "object" || t === null || typeof l != "object" || l === null)
      return !1;
    var e = Object.keys(t), a = Object.keys(l);
    if (e.length !== a.length) return !1;
    for (a = 0; a < e.length; a++) {
      var u = e[a];
      if (!rl.call(l, u) || !Ul(t[u], l[u]))
        return !1;
    }
    return !0;
  }
  function Ac(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  function wo(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Ko(t, l) {
    var e = wo(t);
    t = 0;
    for (var a; e; ) {
      if (e.nodeType === 3) {
        if (a = t + e.textContent.length, t <= l && a >= l)
          return { node: e, offset: l - t };
        t = a;
      }
      t: {
        for (; e; ) {
          if (e.nextSibling) {
            e = e.nextSibling;
            break t;
          }
          e = e.parentNode;
        }
        e = void 0;
      }
      e = wo(e);
    }
  }
  function Jo(t, l) {
    return t && l ? t === l ? !0 : t && t.nodeType === 3 ? !1 : l && l.nodeType === 3 ? Jo(t, l.parentNode) : "contains" in t ? t.contains(l) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(l) & 16) : !1 : !1;
  }
  function $o(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var l = Ac(t.document); l instanceof t.HTMLIFrameElement; ) {
      try {
        var e = typeof l.contentWindow.location.href == "string";
      } catch {
        e = !1;
      }
      if (e) t = l.contentWindow;
      else break;
      l = Ac(t.document);
    }
    return l;
  }
  function Cc(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l && (l === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || l === "textarea" || t.contentEditable === "true");
  }
  var th = _e && "documentMode" in document && 11 >= document.documentMode, ka = null, Dc = null, Ku = null, xc = !1;
  function Fo(t, l, e) {
    var a = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    xc || ka == null || ka !== Ac(a) || (a = ka, "selectionStart" in a && Cc(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), Ku && wu(Ku, a) || (Ku = a, a = Ki(Dc, "onSelect"), 0 < a.length && (l = new Vn(
      "onSelect",
      "select",
      null,
      l,
      e
    ), t.push({ event: l, listeners: a }), l.target = ka)));
  }
  function ya(t, l) {
    var e = {};
    return e[t.toLowerCase()] = l.toLowerCase(), e["Webkit" + t] = "webkit" + l, e["Moz" + t] = "moz" + l, e;
  }
  var Ia = {
    animationend: ya("Animation", "AnimationEnd"),
    animationiteration: ya("Animation", "AnimationIteration"),
    animationstart: ya("Animation", "AnimationStart"),
    transitionrun: ya("Transition", "TransitionRun"),
    transitionstart: ya("Transition", "TransitionStart"),
    transitioncancel: ya("Transition", "TransitionCancel"),
    transitionend: ya("Transition", "TransitionEnd")
  }, Uc = {}, Wo = {};
  _e && (Wo = document.createElement("div").style, "AnimationEvent" in window || (delete Ia.animationend.animation, delete Ia.animationiteration.animation, delete Ia.animationstart.animation), "TransitionEvent" in window || delete Ia.transitionend.transition);
  function ga(t) {
    if (Uc[t]) return Uc[t];
    if (!Ia[t]) return t;
    var l = Ia[t], e;
    for (e in l)
      if (l.hasOwnProperty(e) && e in Wo)
        return Uc[t] = l[e];
    return t;
  }
  var ko = ga("animationend"), Io = ga("animationiteration"), Po = ga("animationstart"), lh = ga("transitionrun"), eh = ga("transitionstart"), ah = ga("transitioncancel"), tr = ga("transitionend"), lr = /* @__PURE__ */ new Map(), Rc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Rc.push("scrollEnd");
  function Il(t, l) {
    lr.set(t, l), ha(l, [t]);
  }
  var uh = 0;
  function Te(t, l) {
    if (t.name != null && t.name !== "auto") return t.name;
    if (l.autoName !== null) return l.autoName;
    t = ee.identifierPrefix;
    var e = uh++;
    return t = "_" + t + "t_" + e.toString(32) + "_", l.autoName = t;
  }
  function er(t) {
    if (t == null || typeof t == "string")
      return t;
    var l = null, e = bu;
    if (e !== null)
      for (var a = 0; a < e.length; a++) {
        var u = t[e[a]];
        if (u != null) {
          if (u === "none") return "none";
          l = l == null ? u : l + (" " + u);
        }
      }
    return l ?? t.default;
  }
  function Ee(t, l) {
    return t = er(t), l = er(l), l == null ? t === "auto" ? null : t : l === "auto" ? null : l;
  }
  var Jn = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var l = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(l)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  }, Xl = [], Pa = 0, jc = 0;
  function $n() {
    for (var t = Pa, l = jc = Pa = 0; l < t; ) {
      var e = Xl[l];
      Xl[l++] = null;
      var a = Xl[l];
      Xl[l++] = null;
      var u = Xl[l];
      Xl[l++] = null;
      var n = Xl[l];
      if (Xl[l++] = null, a !== null && u !== null) {
        var i = a.pending;
        i === null ? u.next = u : (u.next = i.next, i.next = u), a.pending = u;
      }
      n !== 0 && ar(e, u, n);
    }
  }
  function Fn(t, l, e, a) {
    Xl[Pa++] = t, Xl[Pa++] = l, Xl[Pa++] = e, Xl[Pa++] = a, jc |= a, t.lanes |= a, t = t.alternate, t !== null && (t.lanes |= a);
  }
  function Hc(t, l, e, a) {
    return Fn(t, l, e, a), Wn(t);
  }
  function ba(t, l) {
    return Fn(t, null, null, l), Wn(t);
  }
  function ar(t, l, e) {
    t.lanes |= e;
    var a = t.alternate;
    a !== null && (a.lanes |= e);
    for (var u = !1, n = t.return; n !== null; )
      n.childLanes |= e, a = n.alternate, a !== null && (a.childLanes |= e), n.tag === 22 && (t = n.stateNode, t === null || t._visibility & 1 || (u = !0)), t = n, n = n.return;
    return t.tag === 3 ? (n = t.stateNode, u && l !== null && (u = 31 - Dl(e), t = n.hiddenUpdates, a = t[u], a === null ? t[u] = [l] : a.push(l), l.lane = e | 536870912), n) : null;
  }
  function Wn(t) {
    if (50 < hn)
      throw hn = 0, Gi = null, Error(s(185));
    for (var l = t.return; l !== null; )
      t = l, l = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var tu = {};
  function nh(t, l, e, a) {
    this.tag = t, this.key = e, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = l, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Tl(t, l, e, a) {
    return new nh(t, l, e, a);
  }
  function Bc(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Ne(t, l) {
    var e = t.alternate;
    return e === null ? (e = Tl(
      t.tag,
      l,
      t.key,
      t.mode
    ), e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.alternate = t, t.alternate = e) : (e.pendingProps = l, e.type = t.type, e.flags = 0, e.subtreeFlags = 0, e.deletions = null), e.flags = t.flags & 1206910976, e.childLanes = t.childLanes, e.lanes = t.lanes, e.child = t.child, e.memoizedProps = t.memoizedProps, e.memoizedState = t.memoizedState, e.updateQueue = t.updateQueue, l = t.dependencies, e.dependencies = l === null ? null : { lanes: l.lanes, firstContext: l.firstContext }, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.refCleanup = t.refCleanup, e;
  }
  function ur(t, l) {
    t.flags &= 1206910978;
    var e = t.alternate;
    return e === null ? (t.childLanes = 0, t.lanes = l, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = e.childLanes, t.lanes = e.lanes, t.child = e.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = e.memoizedProps, t.memoizedState = e.memoizedState, t.updateQueue = e.updateQueue, t.type = e.type, l = e.dependencies, t.dependencies = l === null ? null : {
      lanes: l.lanes,
      firstContext: l.firstContext
    }), t;
  }
  function kn(t, l, e, a, u, n) {
    var i = 0;
    if (a = t, typeof a == "function") Bc(a) && (i = 1);
    else if (typeof a == "string")
      i = Ry(
        t,
        e,
        At.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (a) {
        case bl:
          return t = Tl(31, e, l, u), t.elementType = bl, t.lanes = n, t;
        case rt:
          return Sa(e.children, u, n, l);
        case yt:
          i = 8, u |= 24;
          break;
        case kt:
          return t = Tl(12, e, l, u | 2), t.elementType = kt, t.lanes = n, t;
        case q:
          return t = Tl(13, e, l, u), t.elementType = q, t.lanes = n, t;
        case $:
          return t = Tl(19, e, l, u), t.elementType = $, t.lanes = n, t;
        case Wl:
        case m:
          return t = u | 32, t = Tl(30, e, l, t), t.elementType = m, t.lanes = n, t.stateNode = {
            autoName: null,
            paired: null,
            clones: null,
            ref: null
          }, t;
        default:
          if (typeof a == "object" && a !== null)
            switch (a.$$typeof) {
              case X:
                i = 10;
                break t;
              case ct:
                i = 9;
                break t;
              case C:
                i = 11;
                break t;
              case pt:
                i = 14;
                break t;
              case st:
                i = 16, a = null;
                break t;
            }
          i = 29, e = Error(
            s(130, t === null ? "null" : typeof t, "")
          ), a = null;
      }
    return l = Tl(i, e, l, u), l.elementType = t, l.type = a, l.lanes = n, l;
  }
  function Sa(t, l, e, a) {
    return t = Tl(7, t, a, l), t.lanes = e, t;
  }
  function qc(t, l, e) {
    return t = Tl(6, t, null, l), t.lanes = e, t;
  }
  function nr(t) {
    var l = Tl(18, null, null, 0);
    return l.stateNode = t, l;
  }
  function Yc(t, l, e) {
    return l = Tl(
      4,
      t.children !== null ? t.children : [],
      t.key,
      l
    ), l.lanes = e, l.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation
    }, l;
  }
  var ir = /* @__PURE__ */ new WeakMap();
  function Ql(t, l) {
    if (typeof t == "object" && t !== null) {
      var e = ir.get(t);
      return e !== void 0 ? e : (l = {
        value: t,
        source: l,
        stack: pl(l)
      }, ir.set(t, l), l);
    }
    return {
      value: t,
      source: l,
      stack: pl(l)
    };
  }
  var lu = [], eu = 0, In = null, Ju = 0, Zl = [], Vl = 0, Ge = null, fe = 1, se = "";
  function ze(t, l) {
    lu[eu++] = Ju, lu[eu++] = In, In = t, Ju = l;
  }
  function cr(t, l, e) {
    Zl[Vl++] = fe, Zl[Vl++] = se, Zl[Vl++] = Ge, Ge = t;
    var a = fe;
    t = se;
    var u = 32 - Dl(a) - 1;
    a &= ~(1 << u), e += 1;
    var n = 32 - Dl(l) + u;
    if (30 < n) {
      var i = u - u % 5;
      n = (a & (1 << i) - 1).toString(32), a >>= i, u -= i, fe = 1 << 32 - Dl(l) + u | e << u | a, se = n + t;
    } else
      fe = 1 << n | e << u | a, se = t;
  }
  function Pn(t) {
    t.return !== null && (ze(t, 1), cr(t, 1, 0));
  }
  function Gc(t) {
    for (; t === In; )
      In = lu[--eu], lu[eu] = null, Ju = lu[--eu], lu[eu] = null;
    for (; t === Ge; )
      Ge = Zl[--Vl], Zl[Vl] = null, se = Zl[--Vl], Zl[Vl] = null, fe = Zl[--Vl], Zl[Vl] = null;
  }
  function fr(t, l) {
    Zl[Vl++] = fe, Zl[Vl++] = se, Zl[Vl++] = Ge, fe = l.id, se = l.overflow, Ge = t;
  }
  var tl = null, Bt = null, ft = !1, Le = null, wl = !1, Lc = Error(s(519));
  function Xe(t) {
    var l = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw $u(Ql(l, t)), Lc;
  }
  function sr(t) {
    var l = t.stateNode, e = t.type, a = t.memoizedProps;
    switch (l[al] = t, l[_l] = a, e) {
      case "dialog":
        mt("cancel", l), mt("close", l);
        break;
      case "iframe":
      case "object":
      case "embed":
        mt("load", l);
        break;
      case "video":
      case "audio":
        for (e = 0; e < gn.length; e++)
          mt(gn[e], l);
        break;
      case "source":
        mt("error", l);
        break;
      case "img":
      case "image":
      case "link":
        mt("error", l), mt("load", l);
        break;
      case "details":
        mt("toggle", l);
        break;
      case "input":
        mt("invalid", l), _o(
          l,
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
        mt("invalid", l);
        break;
      case "textarea":
        mt("invalid", l), Eo(l, a.value, a.defaultValue, a.children);
    }
    e = a.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || l.textContent === "" + e || a.suppressHydrationWarning === !0 || Dm(l.textContent, e) ? (a.popover != null && (mt("beforetoggle", l), mt("toggle", l)), a.onScroll != null && mt("scroll", l), a.onScrollEnd != null && mt("scrollend", l), a.onClick != null && (l.onclick = ce), l = !0) : l = !1, l || Xe(t, !0);
  }
  function ti(t) {
    for (tl = t.return; tl; )
      switch (tl.tag) {
        case 5:
        case 31:
        case 13:
          wl = !1;
          return;
        case 27:
        case 3:
          wl = !0;
          return;
        default:
          tl = tl.return;
      }
  }
  function au(t) {
    if (t !== tl) return !1;
    if (!ft) return ti(t), ft = !0, !1;
    var l = t.tag, e;
    if ((e = l !== 3 && l !== 27) && ((e = l === 5) && (e = t.type, e = !(e !== "form" && e !== "button") || gs(t.type, t.memoizedProps)), e = !e), e && Bt && Xe(t), ti(t), l === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      Bt = Fm(t);
    } else if (l === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      Bt = Fm(t);
    } else
      l === 27 ? (l = Bt, aa(t.type) ? (t = Os, Os = null, Bt = t) : Bt = l) : Bt = tl ? Jl(t.stateNode.nextSibling) : null;
    return !0;
  }
  function pa() {
    Bt = tl = null, ft = !1;
  }
  function Xc() {
    var t = Le;
    return t !== null && (zl === null ? zl = t : zl.push.apply(
      zl,
      t
    ), Le = null), t;
  }
  function $u(t) {
    Le === null ? Le = [t] : Le.push(t);
  }
  var Qc = Ml(null), _a = null, Oe = null;
  function Qe(t, l, e) {
    _t(Qc, l._currentValue), l._currentValue = e;
  }
  function Me(t) {
    t._currentValue = Qc.current, Ft(Qc);
  }
  function li(t, l, e) {
    for (; t !== null; ) {
      var a = t.alternate;
      if ((t.childLanes & l) !== l ? (t.childLanes |= l, a !== null && (a.childLanes |= l)) : a !== null && (a.childLanes & l) !== l && (a.childLanes |= l), t === e) break;
      t = t.return;
    }
  }
  function Zc(t, l, e, a) {
    var u = t.child;
    for (u !== null && (u.return = t); u !== null; ) {
      var n = u.dependencies;
      if (n !== null) {
        var i = u.child;
        n = n.firstContext;
        t: for (; n !== null; ) {
          var c = n;
          n = u;
          for (var r = 0; r < l.length; r++)
            if (c.context === l[r]) {
              n.lanes |= e, c = n.alternate, c !== null && (c.lanes |= e), li(
                n.return,
                e,
                t
              ), a || (i = null);
              break t;
            }
          n = c.next;
        }
      } else if (u.tag === 18) {
        if (i = u.return, i === null) throw Error(s(341));
        i.lanes |= e, n = i.alternate, n !== null && (n.lanes |= e), li(i, e, t), i = null;
      } else
        u.tag === 13 && u.memoizedState !== null && u.memoizedState.dehydrated === null ? (u.lanes |= e, i = u.alternate, i !== null && (i.lanes |= e), li(
          u.return,
          e,
          t
        ), i = u.child, i = i !== null ? i.sibling : null) : i = u.child;
      if (i !== null) i.return = u;
      else
        for (i = u; i !== null; ) {
          if (i === t) {
            i = null;
            break;
          }
          if (u = i.sibling, u !== null) {
            u.return = i.return, i = u;
            break;
          }
          i = i.return;
        }
      u = i;
    }
  }
  function Ta(t, l, e, a) {
    t = null;
    for (var u = l, n = !1; u !== null; ) {
      if (!n) {
        if ((u.flags & 524288) !== 0) n = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var i = u.alternate;
        if (i === null) throw Error(s(387));
        if (i = i.memoizedProps, i !== null) {
          var c = u.type;
          Ul(u.pendingProps.value, i.value) || (t !== null ? t.push(c) : t = [c]);
        }
      } else if (u === He.current) {
        if (i = u.alternate, i === null) throw Error(s(387));
        i.memoizedState.memoizedState !== u.memoizedState.memoizedState && (t !== null ? t.push(Au) : t = [Au]);
      }
      u = u.return;
    }
    return t !== null && Zc(
      l,
      t,
      e,
      a
    ), l.flags |= 262144, t !== null;
  }
  function ei(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!Ul(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function Ea(t) {
    _a = t, Oe = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function ul(t) {
    return or(_a, t);
  }
  function ai(t, l) {
    return _a === null && Ea(t), or(t, l);
  }
  function or(t, l) {
    var e = l._currentValue;
    if (l = { context: l, memoizedValue: e, next: null }, Oe === null) {
      if (t === null) throw Error(s(308));
      Oe = l, t.dependencies = { lanes: 0, firstContext: l }, t.flags |= 524288;
    } else Oe = Oe.next = l;
    return e;
  }
  var ih = typeof AbortController < "u" ? AbortController : function() {
    var t = [], l = this.signal = {
      aborted: !1,
      addEventListener: function(e, a) {
        t.push(a);
      }
    };
    this.abort = function() {
      l.aborted = !0, t.forEach(function(e) {
        return e();
      });
    };
  }, ch = f.unstable_scheduleCallback, fh = f.unstable_NormalPriority, wt = {
    $$typeof: X,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Vc() {
    return {
      controller: new ih(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Fu(t) {
    t.refCount--, t.refCount === 0 && ch(fh, function() {
      t.controller.abort();
    });
  }
  function rr(t, l) {
    if ((t.pendingLanes & 4194048) !== 0) {
      var e = t.transitionTypes;
      for (e === null && (e = t.transitionTypes = []), t = 0; t < l.length; t++) {
        var a = l[t];
        e.indexOf(a) === -1 && e.push(a);
      }
    }
  }
  var Wu = null;
  function sh(t) {
    var l = t.transitionTypes;
    return t.transitionTypes = null, l;
  }
  var ku = null, wc = 0, Na = 0, uu = null;
  function oh(t, l) {
    if (ku === null) {
      var e = ku = [];
      wc = 0, Na = fs(), uu = {
        status: "pending",
        value: void 0,
        then: function(a) {
          e.push(a);
        }
      };
    }
    return wc++, l.then(dr, dr), l;
  }
  function dr() {
    if (--wc === 0 && (Wu = null, ku !== null)) {
      uu !== null && (uu.status = "fulfilled");
      var t = ku;
      ku = null, Na = 0, uu = null;
      for (var l = 0; l < t.length; l++) (0, t[l])();
    }
  }
  function rh(t, l) {
    var e = [], a = {
      status: "pending",
      value: null,
      reason: null,
      then: function(u) {
        e.push(u);
      }
    };
    return t.then(
      function() {
        a.status = "fulfilled", a.value = l;
        for (var u = 0; u < e.length; u++) (0, e[u])(l);
      },
      function(u) {
        for (a.status = "rejected", a.reason = u, u = 0; u < e.length; u++)
          (0, e[u])(void 0);
      }
    ), a;
  }
  var mr = L.S;
  L.S = function(t, l) {
    if (nm = Al(), typeof l == "object" && l !== null && typeof l.then == "function" && oh(t, l), Wu !== null)
      for (var e = Tu; e !== null; )
        rr(e, Wu), e = e.next;
    if (e = t.types, e !== null) {
      for (var a = Tu; a !== null; )
        rr(a, e), a = a.next;
      if (Na !== 0) {
        a = Wu, a === null && (a = Wu = []);
        for (var u = 0; u < e.length; u++) {
          var n = e[u];
          a.indexOf(n) === -1 && a.push(n);
        }
      }
    }
    mr !== null && mr(t, l);
  };
  var za = Ml(null);
  function Kc() {
    var t = za.current;
    return t !== null ? t : jt.pooledCache;
  }
  function ui(t, l) {
    l === null ? _t(za, za.current) : _t(za, l.pool);
  }
  function vr() {
    var t = Kc();
    return t === null ? null : { parent: wt._currentValue, pool: t };
  }
  var nu = Error(s(460)), Jc = Error(s(474)), ni = Error(s(542)), ii = { then: function() {
  } };
  function hr(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function yr(t, l, e) {
    switch (e = t[e], e === void 0 ? t.push(l) : e !== l && (l.then(ce, ce), l = e), l.status) {
      case "fulfilled":
        return l.value;
      case "rejected":
        throw t = l.reason, br(t), t === void 0 && !("reason" in l) ? Error(s(600)) : t;
      default:
        if (typeof l.status == "string") l.then(ce, ce);
        else {
          if (t = jt, t !== null && 100 < t.shellSuspendCounter)
            throw Error(s(482));
          t = l, t.status = "pending", t.then(
            function(a) {
              if (l.status === "pending") {
                var u = l;
                u.status = "fulfilled", u.value = a;
              }
            },
            function(a) {
              if (l.status === "pending") {
                var u = l;
                u.status = "rejected", u.reason = a;
              }
            }
          );
        }
        switch (l.status) {
          case "fulfilled":
            return l.value;
          case "rejected":
            throw t = l.reason, br(t), t;
        }
        throw Ma = l, nu;
    }
  }
  function Oa(t) {
    try {
      var l = t._init;
      return l(t._payload);
    } catch (e) {
      throw e !== null && typeof e == "object" && typeof e.then == "function" ? (Ma = e, nu) : e;
    }
  }
  var Ma = null;
  function gr() {
    if (Ma === null) throw Error(s(459));
    var t = Ma;
    return Ma = null, t;
  }
  function br(t) {
    if (t === nu || t === ni)
      throw Error(s(483));
  }
  var iu = null, Iu = 0;
  function ci(t) {
    var l = Iu;
    return Iu += 1, iu === null && (iu = []), yr(iu, t, l);
  }
  function Ze(t, l) {
    l = l.props.ref, t.ref = l !== void 0 ? l : null;
  }
  function fi(t, l) {
    throw l.$$typeof === w ? Error(s(525)) : (t = Object.prototype.toString.call(l), Error(
      s(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(l).join(", ") + "}" : t
      )
    ));
  }
  function Sr(t) {
    function l(g, d) {
      if (t) {
        var S = g.deletions;
        S === null ? (g.deletions = [d], g.flags |= 16) : S.push(d);
      }
    }
    function e(g, d) {
      if (!t) return null;
      for (; d !== null; )
        l(g, d), d = d.sibling;
      return null;
    }
    function a(g) {
      for (var d = /* @__PURE__ */ new Map(); g !== null; )
        g.key === null ? d.set(g.index, g) : d.set(g.key, g), g = g.sibling;
      return d;
    }
    function u(g, d) {
      return g = Ne(g, d), g.index = 0, g.sibling = null, g;
    }
    function n(g, d, S) {
      return g.index = S, t ? (S = g.alternate, S !== null ? (S = S.index, S < d ? (g.flags |= 2, d) : S) : (g.flags |= 134217730, d)) : (g.flags |= 1048576, d);
    }
    function i(g) {
      return t && g.alternate === null && (g.flags |= 134217730), g;
    }
    function c(g, d, S, M) {
      return d === null || d.tag !== 6 ? (d = qc(S, g.mode, M), d.return = g, d) : (d = u(d, S), d.return = g, d);
    }
    function r(g, d, S, M) {
      var Y = S.type;
      return Y === rt ? (g = T(
        g,
        d,
        S.props.children,
        M,
        S.key
      ), Ze(g, S), g) : d !== null && (d.elementType === Y || typeof Y == "object" && Y !== null && Y.$$typeof === st && Oa(Y) === d.type) ? (d = u(d, S.props), Ze(d, S), d.return = g, d) : (d = kn(
        S.type,
        S.key,
        S.props,
        null,
        g.mode,
        M
      ), Ze(d, S), d.return = g, d);
    }
    function b(g, d, S, M) {
      return d === null || d.tag !== 4 || d.stateNode.containerInfo !== S.containerInfo || d.stateNode.implementation !== S.implementation ? (d = Yc(S, g.mode, M), d.return = g, d) : (d = u(d, S.children || []), d.return = g, d);
    }
    function T(g, d, S, M, Y) {
      return d === null || d.tag !== 7 ? (d = Sa(
        S,
        g.mode,
        M,
        Y
      ), d.return = g, d) : (d = u(d, S), d.return = g, d);
    }
    function A(g, d, S) {
      if (typeof d == "string" && d !== "" || typeof d == "number" || typeof d == "bigint")
        return d = qc(
          "" + d,
          g.mode,
          S
        ), d.return = g, d;
      if (typeof d == "object" && d !== null) {
        switch (d.$$typeof) {
          case Nt:
            return S = kn(
              d.type,
              d.key,
              d.props,
              null,
              g.mode,
              S
            ), Ze(S, d), S.return = g, S;
          case I:
            return d = Yc(
              d,
              g.mode,
              S
            ), d.return = g, d;
          case st:
            return d = Oa(d), A(g, d, S);
        }
        if (bt(d) || K(d))
          return d = Sa(
            d,
            g.mode,
            S,
            null
          ), d.return = g, d;
        if (typeof d.then == "function")
          return A(g, ci(d), S);
        if (d.$$typeof === X)
          return A(
            g,
            ai(g, d),
            S
          );
        fi(g, d);
      }
      return null;
    }
    function h(g, d, S, M) {
      var Y = d !== null ? d.key : null;
      if (typeof S == "string" && S !== "" || typeof S == "number" || typeof S == "bigint")
        return Y !== null ? null : c(g, d, "" + S, M);
      if (typeof S == "object" && S !== null) {
        switch (S.$$typeof) {
          case Nt:
            return S.key === Y ? r(g, d, S, M) : null;
          case I:
            return S.key === Y ? b(g, d, S, M) : null;
          case st:
            return S = Oa(S), h(g, d, S, M);
        }
        if (bt(S) || K(S))
          return Y !== null ? null : T(g, d, S, M, null);
        if (typeof S.then == "function")
          return h(
            g,
            d,
            ci(S),
            M
          );
        if (S.$$typeof === X)
          return h(
            g,
            d,
            ai(g, S),
            M
          );
        fi(g, S);
      }
      return null;
    }
    function p(g, d, S, M, Y) {
      if (typeof M == "string" && M !== "" || typeof M == "number" || typeof M == "bigint")
        return g = g.get(S) || null, c(d, g, "" + M, Y);
      if (typeof M == "object" && M !== null) {
        switch (M.$$typeof) {
          case Nt:
            return g = g.get(
              M.key === null ? S : M.key
            ) || null, r(d, g, M, Y);
          case I:
            return g = g.get(
              M.key === null ? S : M.key
            ) || null, b(d, g, M, Y);
          case st:
            return M = Oa(M), p(
              g,
              d,
              S,
              M,
              Y
            );
        }
        if (bt(M) || K(M))
          return g = g.get(S) || null, T(d, g, M, Y, null);
        if (typeof M.then == "function")
          return p(
            g,
            d,
            S,
            ci(M),
            Y
          );
        if (M.$$typeof === X)
          return p(
            g,
            d,
            S,
            ai(d, M),
            Y
          );
        fi(d, M);
      }
      return null;
    }
    function R(g, d, S, M) {
      for (var Y = null, ht = null, J = d, W = d = 0, $t = null; J !== null && W < S.length; W++) {
        J.index > W ? ($t = J, J = null) : $t = J.sibling;
        var St = h(
          g,
          J,
          S[W],
          M
        );
        if (St === null) {
          J === null && (J = $t);
          break;
        }
        t && J && St.alternate === null && l(g, J), d = n(St, d, W), ht === null ? Y = St : ht.sibling = St, ht = St, J = $t;
      }
      if (W === S.length)
        return e(g, J), ft && ze(g, W), Y;
      if (J === null) {
        for (; W < S.length; W++)
          J = A(g, S[W], M), J !== null && (d = n(
            J,
            d,
            W
          ), ht === null ? Y = J : ht.sibling = J, ht = J);
        return ft && ze(g, W), Y;
      }
      for (J = a(J); W < S.length; W++)
        $t = p(
          J,
          g,
          W,
          S[W],
          M
        ), $t !== null && (t && (St = $t.alternate, St !== null && J.delete(St.key === null ? W : St.key)), d = n(
          $t,
          d,
          W
        ), ht === null ? Y = $t : ht.sibling = $t, ht = $t);
      return t && J.forEach(function(fa) {
        return l(g, fa);
      }), ft && ze(g, W), Y;
    }
    function Z(g, d, S, M) {
      if (S == null) throw Error(s(151));
      for (var Y = null, ht = null, J = d, W = d = 0, $t = null, St = S.next(); J !== null && !St.done; W++, St = S.next()) {
        J.index > W ? ($t = J, J = null) : $t = J.sibling;
        var fa = h(g, J, St.value, M);
        if (fa === null) {
          J === null && (J = $t);
          break;
        }
        t && J && fa.alternate === null && l(g, J), d = n(fa, d, W), ht === null ? Y = fa : ht.sibling = fa, ht = fa, J = $t;
      }
      if (St.done)
        return e(g, J), ft && ze(g, W), Y;
      if (J === null) {
        for (; !St.done; W++, St = S.next())
          St = A(g, St.value, M), St !== null && (d = n(St, d, W), ht === null ? Y = St : ht.sibling = St, ht = St);
        return ft && ze(g, W), Y;
      }
      for (J = a(J); !St.done; W++, St = S.next())
        St = p(J, g, W, St.value, M), St !== null && (t && ($t = St.alternate, $t !== null && J.delete(
          $t.key === null ? W : $t.key
        )), d = n(St, d, W), ht === null ? Y = St : ht.sibling = St, ht = St);
      return t && J.forEach(function(wy) {
        return l(g, wy);
      }), ft && ze(g, W), Y;
    }
    function et(g, d, S, M) {
      if (typeof S == "object" && S !== null && S.type === rt && S.key === null && S.props.ref === void 0 && (S = S.props.children), typeof S == "object" && S !== null) {
        switch (S.$$typeof) {
          case Nt:
            t: {
              for (var Y = S.key; d !== null; ) {
                if (d.key === Y) {
                  if (Y = S.type, Y === rt) {
                    if (d.tag === 7) {
                      e(
                        g,
                        d.sibling
                      ), M = u(
                        d,
                        S.props.children
                      ), Ze(M, S), M.return = g, g = M;
                      break t;
                    }
                  } else if (d.elementType === Y || typeof Y == "object" && Y !== null && Y.$$typeof === st && Oa(Y) === d.type) {
                    e(
                      g,
                      d.sibling
                    ), M = u(d, S.props), Ze(M, S), M.return = g, g = M;
                    break t;
                  }
                  e(g, d);
                  break;
                } else l(g, d);
                d = d.sibling;
              }
              S.type === rt ? (M = Sa(
                S.props.children,
                g.mode,
                M,
                S.key
              ), Ze(M, S), M.return = g, g = M) : (M = kn(
                S.type,
                S.key,
                S.props,
                null,
                g.mode,
                M
              ), Ze(M, S), M.return = g, g = M);
            }
            return i(g);
          case I:
            t: {
              for (Y = S.key; d !== null; ) {
                if (d.key === Y)
                  if (d.tag === 4 && d.stateNode.containerInfo === S.containerInfo && d.stateNode.implementation === S.implementation) {
                    e(
                      g,
                      d.sibling
                    ), M = u(d, S.children || []), M.return = g, g = M;
                    break t;
                  } else {
                    e(g, d);
                    break;
                  }
                else l(g, d);
                d = d.sibling;
              }
              M = Yc(S, g.mode, M), M.return = g, g = M;
            }
            return i(g);
          case st:
            return S = Oa(S), et(
              g,
              d,
              S,
              M
            );
        }
        if (bt(S))
          return R(
            g,
            d,
            S,
            M
          );
        if (K(S)) {
          if (Y = K(S), typeof Y != "function") throw Error(s(150));
          return S = Y.call(S), Z(
            g,
            d,
            S,
            M
          );
        }
        if (typeof S.then == "function")
          return et(
            g,
            d,
            ci(S),
            M
          );
        if (S.$$typeof === X)
          return et(
            g,
            d,
            ai(g, S),
            M
          );
        fi(g, S);
      }
      return typeof S == "string" && S !== "" || typeof S == "number" || typeof S == "bigint" ? (S = "" + S, d !== null && d.tag === 6 ? (e(g, d.sibling), M = u(d, S), M.return = g, g = M) : (e(g, d), M = qc(S, g.mode, M), M.return = g, g = M), i(g)) : e(g, d);
    }
    return function(g, d, S, M) {
      try {
        Iu = 0;
        var Y = et(
          g,
          d,
          S,
          M
        );
        return iu = null, Y;
      } catch (J) {
        if (J === nu || J === ni) throw J;
        var ht = Tl(29, J, null, g.mode);
        return ht.lanes = M, ht.return = g, ht;
      }
    };
  }
  var Aa = Sr(!0), pr = Sr(!1), Ve = !1;
  function $c(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Fc(t, l) {
    t = t.updateQueue, l.updateQueue === t && (l.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function we(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Ke(t, l, e) {
    var a = t.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (zt & 2) !== 0) {
      var u = a.pending;
      return u === null ? l.next = l : (l.next = u.next, u.next = l), a.pending = l, l = Wn(t), ar(t, null, e), l;
    }
    return Fn(t, a, l, e), Wn(t);
  }
  function Pu(t, l, e) {
    if (l = l.updateQueue, l !== null && (l = l.shared, (e & 4194048) !== 0)) {
      var a = l.lanes;
      a &= t.pendingLanes, e |= a, l.lanes = e, io(t, e);
    }
  }
  function Wc(t, l) {
    var e = t.updateQueue, a = t.alternate;
    if (a !== null && (a = a.updateQueue, e === a)) {
      var u = null, n = null;
      if (e = e.firstBaseUpdate, e !== null) {
        do {
          var i = {
            lane: e.lane,
            tag: e.tag,
            payload: e.payload,
            callback: null,
            next: null
          };
          n === null ? u = n = i : n = n.next = i, e = e.next;
        } while (e !== null);
        n === null ? u = n = l : n = n.next = l;
      } else u = n = l;
      e = {
        baseState: a.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: n,
        shared: a.shared,
        callbacks: a.callbacks
      }, t.updateQueue = e;
      return;
    }
    t = e.lastBaseUpdate, t === null ? e.firstBaseUpdate = l : t.next = l, e.lastBaseUpdate = l;
  }
  var kc = !1;
  function tn() {
    if (kc) {
      var t = uu;
      if (t !== null) throw t;
    }
  }
  function ln(t, l, e, a) {
    kc = !1;
    var u = t.updateQueue;
    Ve = !1;
    var n = u.firstBaseUpdate, i = u.lastBaseUpdate, c = u.shared.pending;
    if (c !== null) {
      u.shared.pending = null;
      var r = c, b = r.next;
      r.next = null, i === null ? n = b : i.next = b, i = r;
      var T = t.alternate;
      T !== null && (T = T.updateQueue, c = T.lastBaseUpdate, c !== i && (c === null ? T.firstBaseUpdate = b : c.next = b, T.lastBaseUpdate = r));
    }
    if (n !== null) {
      var A = u.baseState;
      i = 0, T = b = r = null, c = n;
      do {
        var h = c.lane & -536870913, p = h !== c.lane;
        if (p ? (vt & h) === h : (a & h) === h) {
          h !== 0 && h === Na && (kc = !0), T !== null && (T = T.next = {
            lane: 0,
            tag: c.tag,
            payload: c.payload,
            callback: null,
            next: null
          });
          t: {
            var R = t, Z = c;
            h = l;
            var et = e;
            switch (Z.tag) {
              case 1:
                if (R = Z.payload, typeof R == "function") {
                  A = R.call(et, A, h);
                  break t;
                }
                A = R;
                break t;
              case 3:
                R.flags = R.flags & -65537 | 128;
              case 0:
                if (R = Z.payload, h = typeof R == "function" ? R.call(et, A, h) : R, h == null) break t;
                A = k({}, A, h);
                break t;
              case 2:
                Ve = !0;
            }
          }
          h = c.callback, h !== null && (t.flags |= 64, p && (t.flags |= 8192), p = u.callbacks, p === null ? u.callbacks = [h] : p.push(h));
        } else
          p = {
            lane: h,
            tag: c.tag,
            payload: c.payload,
            callback: c.callback,
            next: null
          }, T === null ? (b = T = p, r = A) : T = T.next = p, i |= h;
        if (c = c.next, c === null) {
          if (c = u.shared.pending, c === null)
            break;
          p = c, c = p.next, p.next = null, u.lastBaseUpdate = p, u.shared.pending = null;
        }
      } while (!0);
      T === null && (r = A), u.baseState = r, u.firstBaseUpdate = b, u.lastBaseUpdate = T, n === null && (u.shared.lanes = 0), Pe |= i, t.lanes = i, t.memoizedState = A;
    }
  }
  function _r(t, l) {
    if (typeof t != "function")
      throw Error(s(191, t));
    t.call(l);
  }
  function Tr(t, l) {
    var e = t.callbacks;
    if (e !== null)
      for (t.callbacks = null, t = 0; t < e.length; t++)
        _r(e[t], l);
  }
  var Je = Ml(null), si = Ml(0);
  function Er(t, l) {
    t = Ue, _t(si, t), _t(Je, l), Ue = t | l.baseLanes;
  }
  function Ic() {
    _t(si, Ue), _t(Je, Je.current);
  }
  function Pc() {
    Ue = si.current, Ft(Je), Ft(si);
  }
  var nl = Ml(null), dl = null;
  function $e(t) {
    var l = t.alternate;
    _t(il, il.current & 1), _t(nl, t), dl === null && (l === null || Je.current !== null || l.memoizedState !== null) && (dl = t);
  }
  function tf(t) {
    _t(il, il.current), _t(nl, t), dl === null && (dl = t);
  }
  function Nr(t) {
    t.tag === 22 ? (_t(il, il.current), _t(nl, t), dl === null && (dl = t)) : Fe();
  }
  function Fe() {
    _t(il, il.current), _t(nl, nl.current);
  }
  function Rl(t) {
    Ft(nl), dl === t && (dl = null), Ft(il);
  }
  var il = Ml(0);
  function en(t, l) {
    _t(nl, nl.current), _t(il, l);
  }
  function lf(t) {
    Ft(il), Ft(nl), dl === t && (dl = null);
  }
  function oi(t) {
    for (var l = t; l !== null; ) {
      if (l.tag === 13) {
        var e = l.memoizedState;
        if (e !== null && (e = e.dehydrated, e === null || Ns(e) || zs(e)))
          return l;
      } else if (l.tag === 19 && l.memoizedProps.revealOrder !== "independent") {
        if ((l.flags & 128) !== 0) return l;
      } else if (l.child !== null) {
        l.child.return = l, l = l.child;
        continue;
      }
      if (l === t) break;
      for (; l.sibling === null; ) {
        if (l.return === null || l.return === t) return null;
        l = l.return;
      }
      l.sibling.return = l.return, l = l.sibling;
    }
    return null;
  }
  var Ae = 0, lt = null, Rt = null, Kt = null, ri = !1, cu = !1, Ca = !1, di = 0, an = 0, fu = null, dh = 0;
  function Qt() {
    throw Error(s(321));
  }
  function ef(t, l) {
    if (l === null) return !1;
    for (var e = 0; e < l.length && e < t.length; e++)
      if (!Ul(t[e], l[e])) return !1;
    return !0;
  }
  function af(t, l, e, a, u, n) {
    return Ae = n, lt = l, l.memoizedState = null, l.updateQueue = null, l.lanes = 0, L.H = t === null || t.memoizedState === null ? cd : fd, Ca = !1, n = e(a, u), Ca = !1, cu && (n = Or(
      l,
      e,
      a,
      u
    )), zr(t), n;
  }
  function zr(t) {
    L.H = Si;
    var l = Rt !== null && Rt.next !== null;
    if (Ae = 0, Kt = Rt = lt = null, ri = !1, an = 0, fu = null, l) throw Error(s(300));
    t === null || Jt || (t = t.dependencies, t !== null && ei(t) && (Jt = !0));
  }
  function Or(t, l, e, a) {
    lt = t;
    var u = 0;
    do {
      if (cu && (fu = null), an = 0, cu = !1, 25 <= u) throw Error(s(301));
      if (u += 1, Kt = Rt = null, t.updateQueue != null) {
        var n = t.updateQueue;
        n.lastEffect = null, n.events = null, n.stores = null, n.memoCache != null && (n.memoCache.index = 0);
      }
      L.H = ph, n = l(e, a);
    } while (cu);
    return n;
  }
  function mh() {
    var t = L.H, l = t.useState()[0];
    return l = typeof l.then == "function" ? un(l) : l, t = t.useState()[0], (Rt !== null ? Rt.memoizedState : null) !== t && (lt.flags |= 1024), l;
  }
  function uf() {
    var t = di !== 0;
    return di = 0, t;
  }
  function nf(t, l, e) {
    l.updateQueue = t.updateQueue, l.flags &= -2053, t.lanes &= ~e;
  }
  function cf(t) {
    if (ri) {
      for (t = t.memoizedState; t !== null; ) {
        var l = t.queue;
        l !== null && (l.pending = null), t = t.next;
      }
      ri = !1;
    }
    Ae = 0, Kt = Rt = lt = null, cu = !1, an = di = 0, fu = null;
  }
  function hl() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Kt === null ? lt.memoizedState = Kt = t : Kt = Kt.next = t, Kt;
  }
  function Vt() {
    if (Rt === null) {
      var t = lt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Rt.next;
    var l = Kt === null ? lt.memoizedState : Kt.next;
    if (l !== null)
      Kt = l, Rt = t;
    else {
      if (t === null)
        throw lt.alternate === null ? Error(s(467)) : Error(s(310));
      Rt = t, t = {
        memoizedState: Rt.memoizedState,
        baseState: Rt.baseState,
        baseQueue: Rt.baseQueue,
        queue: Rt.queue,
        next: null
      }, Kt === null ? lt.memoizedState = Kt = t : Kt = Kt.next = t;
    }
    return Kt;
  }
  function mi() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function un(t) {
    var l = an;
    return an += 1, fu === null && (fu = []), t = yr(fu, t, l), l = lt, (Kt === null ? l.memoizedState : Kt.next) === null && (l = l.alternate, L.H = l === null || l.memoizedState === null ? cd : fd), t;
  }
  function vi(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return un(t);
      if (t.$$typeof === x) return;
      if (t.$$typeof === X) return ul(t);
    }
    throw Error(s(438, String(t)));
  }
  function ff(t) {
    var l = null, e = lt.updateQueue;
    if (e !== null && (l = e.memoCache), l == null) {
      var a = lt.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (l = {
        data: a.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (l == null && (l = { data: [], index: 0 }), e === null && (e = mi(), lt.updateQueue = e), e.memoCache = l, e = l.data[l.index], e === void 0)
      for (e = l.data[l.index] = Array(t), a = 0; a < t; a++)
        e[a] = kl;
    return l.index++, e;
  }
  function Ce(t, l) {
    return typeof l == "function" ? l(t) : l;
  }
  function hi(t) {
    var l = Vt();
    return sf(l, Rt, t);
  }
  function sf(t, l, e) {
    var a = t.queue;
    if (a === null) throw Error(s(311));
    a.lastRenderedReducer = e;
    var u = t.baseQueue, n = a.pending;
    if (n !== null) {
      if (u !== null) {
        var i = u.next;
        u.next = n.next, n.next = i;
      }
      l.baseQueue = u = n, a.pending = null;
    }
    if (n = t.baseState, u === null) t.memoizedState = n;
    else {
      l = u.next;
      var c = i = null, r = null, b = l, T = !1;
      do {
        var A = b.lane & -536870913;
        if (A !== b.lane ? (vt & A) === A : (Ae & A) === A) {
          var h = b.revertLane;
          if (h === 0)
            r !== null && (r = r.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: b.action,
              hasEagerState: b.hasEagerState,
              eagerState: b.eagerState,
              next: null
            }), A === Na && (T = !0);
          else if ((Ae & h) === h) {
            b = b.next, h === Na && (T = !0);
            continue;
          } else
            A = {
              lane: 0,
              revertLane: b.revertLane,
              gesture: null,
              action: b.action,
              hasEagerState: b.hasEagerState,
              eagerState: b.eagerState,
              next: null
            }, r === null ? (c = r = A, i = n) : r = r.next = A, lt.lanes |= h, Pe |= h;
          A = b.action, Ca && e(n, A), n = b.hasEagerState ? b.eagerState : e(n, A);
        } else
          h = {
            lane: A,
            revertLane: b.revertLane,
            gesture: b.gesture,
            action: b.action,
            hasEagerState: b.hasEagerState,
            eagerState: b.eagerState,
            next: null
          }, r === null ? (c = r = h, i = n) : r = r.next = h, lt.lanes |= A, Pe |= A;
        b = b.next;
      } while (b !== null && b !== l);
      if (r === null ? i = n : r.next = c, !Ul(n, t.memoizedState) && (Jt = !0, T && (e = uu, e !== null)))
        throw e;
      t.memoizedState = n, t.baseState = i, t.baseQueue = r, a.lastRenderedState = n;
    }
    return u === null && (a.lanes = 0), [t.memoizedState, a.dispatch];
  }
  function of(t) {
    var l = Vt(), e = l.queue;
    if (e === null) throw Error(s(311));
    e.lastRenderedReducer = t;
    var a = e.dispatch, u = e.pending, n = l.memoizedState;
    if (u !== null) {
      e.pending = null;
      var i = u = u.next;
      do
        n = t(n, i.action), i = i.next;
      while (i !== u);
      Ul(n, l.memoizedState) || (Jt = !0), l.memoizedState = n, l.baseQueue === null && (l.baseState = n), e.lastRenderedState = n;
    }
    return [n, a];
  }
  function Mr(t, l, e) {
    var a = lt, u = Vt(), n = ft;
    if (n) {
      if (e === void 0) throw Error(s(407));
      e = e();
    } else e = l();
    var i = !Ul(
      (Rt || u).memoizedState,
      e
    );
    if (i && (u.memoizedState = e, Jt = !0), u = u.queue, mf(Dr.bind(null, a, u, t), [
      t
    ]), t = u.getSnapshot !== l || i || Kt !== null && (Kt.memoizedState.tag & 1) !== 0, su(
      t ? 9 : 8,
      { destroy: void 0 },
      Cr.bind(null, a, u, e, l),
      null
    ), t) {
      if (a.flags |= 2048, jt === null) throw Error(s(349));
      n || (Ae & 127) !== 0 || Ar(a, l, e);
    }
    return e;
  }
  function Ar(t, l, e) {
    t.flags |= 16384, t = { getSnapshot: l, value: e }, l = lt.updateQueue, l === null ? (l = mi(), lt.updateQueue = l, l.stores = [t]) : (e = l.stores, e === null ? l.stores = [t] : e.push(t));
  }
  function Cr(t, l, e, a) {
    l.value = e, l.getSnapshot = a, xr(l) && Ur(t);
  }
  function Dr(t, l, e) {
    return e(function() {
      xr(l) && Ur(t);
    });
  }
  function xr(t) {
    var l = t.getSnapshot;
    t = t.value;
    try {
      var e = l();
      return !Ul(t, e);
    } catch {
      return !0;
    }
  }
  function Ur(t) {
    var l = ba(t, 2);
    l !== null && Ol(l, t, 2);
  }
  function rf(t) {
    var l = hl();
    if (typeof t == "function") {
      var e = t;
      if (t = e(), Ca) {
        Be(!0);
        try {
          e();
        } finally {
          Be(!1);
        }
      }
    }
    return l.memoizedState = l.baseState = t, l.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ce,
      lastRenderedState: t
    }, l;
  }
  function Rr(t, l, e, a) {
    return t.baseState = e, sf(
      t,
      Rt,
      typeof a == "function" ? a : Ce
    );
  }
  function vh(t, l, e, a, u) {
    if (bi(t)) throw Error(s(485));
    if (t = l.action, t !== null) {
      var n = {
        payload: u,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(i) {
          n.listeners.push(i);
        }
      };
      L.T !== null ? e(!0) : n.isTransition = !1, a(n), e = l.pending, e === null ? (n.next = l.pending = n, jr(l, n)) : (n.next = e.next, l.pending = e.next = n);
    }
  }
  function jr(t, l) {
    var e = l.action, a = l.payload, u = t.state;
    if (l.isTransition) {
      var n = L.T, i = {};
      i.types = n !== null ? n.types : null, L.T = i;
      try {
        var c = e(u, a), r = L.S;
        r !== null && r(i, c), Hr(t, l, c);
      } catch (b) {
        df(t, l, b);
      } finally {
        n !== null && i.types !== null && (n.types = i.types), L.T = n;
      }
    } else
      try {
        n = e(u, a), Hr(t, l, n);
      } catch (b) {
        df(t, l, b);
      }
  }
  function Hr(t, l, e) {
    e !== null && typeof e == "object" && typeof e.then == "function" ? e.then(
      function(a) {
        Br(t, l, a);
      },
      function(a) {
        return df(t, l, a);
      }
    ) : Br(t, l, e);
  }
  function Br(t, l, e) {
    l.status = "fulfilled", l.value = e, qr(l), t.state = e, l = t.pending, l !== null && (e = l.next, e === l ? t.pending = null : (e = e.next, l.next = e, jr(t, e)));
  }
  function df(t, l, e) {
    var a = t.pending;
    if (t.pending = null, a !== null) {
      a = a.next;
      do
        l.status = "rejected", l.reason = e, qr(l), l = l.next;
      while (l !== a);
    }
    t.action = null;
  }
  function qr(t) {
    t = t.listeners;
    for (var l = 0; l < t.length; l++) (0, t[l])();
  }
  function Yr(t, l) {
    return l;
  }
  function Gr(t, l) {
    if (ft) {
      var e = jt.formState;
      if (e !== null) {
        t: {
          var a = lt;
          if (ft) {
            if (Bt) {
              l: {
                for (var u = Bt, n = wl; u.nodeType !== 8; ) {
                  if (!n) {
                    u = null;
                    break l;
                  }
                  if (u = Jl(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break l;
                  }
                }
                n = u.data, u = n === "F!" || n === "F" ? u : null;
              }
              if (u) {
                Bt = Jl(
                  u.nextSibling
                ), a = u.data === "F!";
                break t;
              }
            }
            Xe(a);
          }
          a = !1;
        }
        a && (l = e[0]);
      }
    }
    return e = hl(), e.memoizedState = e.baseState = l, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Yr,
      lastRenderedState: l
    }, e.queue = a, e = ud.bind(
      null,
      lt,
      a
    ), a.dispatch = e, a = rf(!1), n = bf.bind(
      null,
      lt,
      !1,
      a.queue
    ), a = hl(), u = {
      state: l,
      dispatch: null,
      action: t,
      pending: null
    }, a.queue = u, e = vh.bind(
      null,
      lt,
      u,
      n,
      e
    ), u.dispatch = e, a.memoizedState = t, [l, e, !1];
  }
  function Lr(t) {
    var l = Vt();
    return Xr(l, Rt, t);
  }
  function Xr(t, l, e) {
    if (l = sf(
      t,
      l,
      Yr
    )[0], t = hi(Ce)[0], typeof l == "object" && l !== null && typeof l.then == "function")
      try {
        var a = un(l);
      } catch (i) {
        throw i === nu ? ni : i;
      }
    else a = l;
    l = Vt();
    var u = l.queue, n = u.dispatch;
    return e !== l.memoizedState && (lt.flags |= 2048, su(
      9,
      { destroy: void 0 },
      hh.bind(null, u, e),
      null
    )), [a, n, t];
  }
  function hh(t, l) {
    t.action = l;
  }
  function Qr(t) {
    var l = Vt(), e = Rt;
    if (e !== null)
      return Xr(l, e, t);
    Vt(), l = l.memoizedState, e = Vt();
    var a = e.queue.dispatch;
    return e.memoizedState = t, [l, a, !1];
  }
  function su(t, l, e, a) {
    return t = { tag: t, create: e, deps: a, inst: l, next: null }, l = lt.updateQueue, l === null && (l = mi(), lt.updateQueue = l), e = l.lastEffect, e === null ? l.lastEffect = t.next = t : (a = e.next, e.next = t, t.next = a, l.lastEffect = t), t;
  }
  function Zr() {
    return Vt().memoizedState;
  }
  function yi(t, l, e, a) {
    var u = hl();
    lt.flags |= t, u.memoizedState = su(
      1 | l,
      { destroy: void 0 },
      e,
      a === void 0 ? null : a
    );
  }
  function gi(t, l, e, a) {
    var u = Vt();
    a = a === void 0 ? null : a;
    var n = u.memoizedState.inst;
    Rt !== null && a !== null && ef(a, Rt.memoizedState.deps) ? u.memoizedState = su(l, n, e, a) : (lt.flags |= t, u.memoizedState = su(
      1 | l,
      n,
      e,
      a
    ));
  }
  function Vr(t, l) {
    yi(8390656, 8, t, l);
  }
  function mf(t, l) {
    gi(2048, 8, t, l);
  }
  function yh(t) {
    lt.flags |= 4;
    var l = lt.updateQueue;
    if (l === null)
      l = mi(), lt.updateQueue = l, l.events = [t];
    else {
      var e = l.events;
      e === null ? l.events = [t] : e.push(t);
    }
  }
  function wr(t) {
    var l = Vt().memoizedState;
    return yh({ ref: l, nextImpl: t }), function() {
      if ((zt & 2) !== 0) throw Error(s(440));
      return l.impl.apply(void 0, arguments);
    };
  }
  function Kr(t, l) {
    return gi(4, 2, t, l);
  }
  function Jr(t, l) {
    return gi(4, 4, t, l);
  }
  function $r(t, l) {
    if (typeof l == "function") {
      t = t();
      var e = l(t);
      return function() {
        typeof e == "function" ? e() : l(null);
      };
    }
    if (l != null)
      return t = t(), l.current = t, function() {
        l.current = null;
      };
  }
  function Fr(t, l, e) {
    e = e != null ? e.concat([t]) : null, gi(4, 4, $r.bind(null, l, t), e);
  }
  function vf() {
  }
  function Wr(t, l) {
    var e = Vt();
    l = l === void 0 ? null : l;
    var a = e.memoizedState;
    return l !== null && ef(l, a[1]) ? a[0] : (e.memoizedState = [t, l], t);
  }
  function kr(t, l) {
    var e = Vt();
    l = l === void 0 ? null : l;
    var a = e.memoizedState;
    if (l !== null && ef(l, a[1]))
      return a[0];
    if (a = t(), Ca) {
      Be(!0);
      try {
        t();
      } finally {
        Be(!1);
      }
    }
    return e.memoizedState = [a, l], a;
  }
  function hf(t, l, e) {
    return e === void 0 || (Ae & 1073741824) !== 0 && (vt & 261930) === 0 ? t.memoizedState = l : (t.memoizedState = e, t = cm(), lt.lanes |= t, Pe |= t, e);
  }
  function Ir(t, l, e, a) {
    return Ul(e, l) ? e : Je.current !== null ? (t = hf(t, e, a), Ul(t, l) || (Jt = !0), t) : (Ae & 106) === 0 || (Ae & 1073741824) !== 0 && (vt & 261930) === 0 ? (Jt = !0, t.memoizedState = e) : (t = cm(), lt.lanes |= t, Pe |= t, l);
  }
  function Pr(t, l, e, a, u) {
    var n = F.p;
    F.p = n !== 0 && 8 > n ? n : 8;
    var i = L.T, c = {};
    c.types = i !== null ? i.types : null, L.T = c, bf(t, !1, l, e);
    try {
      var r = u(), b = L.S;
      if (b !== null && b(c, r), r !== null && typeof r == "object" && typeof r.then == "function") {
        var T = rh(
          r,
          a
        );
        nn(
          t,
          l,
          T,
          ql(t)
        );
      } else
        nn(
          t,
          l,
          a,
          ql(t)
        );
    } catch (A) {
      nn(
        t,
        l,
        { then: function() {
        }, status: "rejected", reason: A },
        ql()
      );
    } finally {
      F.p = n, i !== null && c.types !== null && (i.types = c.types), L.T = i;
    }
  }
  function gh() {
  }
  function yf(t, l, e, a) {
    if (t.tag !== 5) throw Error(s(476));
    var u = td(t).queue;
    Pr(
      t,
      u,
      l,
      Gl,
      e === null ? gh : function() {
        return ld(t), e(a);
      }
    );
  }
  function td(t) {
    var l = t.memoizedState;
    if (l !== null) return l;
    l = {
      memoizedState: Gl,
      baseState: Gl,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ce,
        lastRenderedState: Gl
      },
      next: null
    };
    var e = {};
    return l.next = {
      memoizedState: e,
      baseState: e,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ce,
        lastRenderedState: e
      },
      next: null
    }, t.memoizedState = l, t = t.alternate, t !== null && (t.memoizedState = l), l;
  }
  function ld(t) {
    var l = td(t);
    l.next === null && (l = t.alternate.memoizedState), nn(
      t,
      l.next.queue,
      {},
      ql()
    );
  }
  function gf() {
    return ul(Au);
  }
  function ed() {
    return Vt().memoizedState;
  }
  function ad() {
    return Vt().memoizedState;
  }
  function bh(t) {
    for (var l = t.return; l !== null; ) {
      switch (l.tag) {
        case 24:
        case 3:
          var e = ql();
          t = we(e);
          var a = Ke(l, t, e);
          a !== null && (Ol(a, l, e), Pu(a, l, e)), l = { cache: Vc() }, t.payload = l;
          return;
      }
      l = l.return;
    }
  }
  function Sh(t, l, e) {
    var a = ql();
    e = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, bi(t) ? nd(l, e) : (e = Hc(t, l, e, a), e !== null && (Ol(e, t, a), id(e, l, a)));
  }
  function ud(t, l, e) {
    var a = ql();
    nn(t, l, e, a);
  }
  function nn(t, l, e, a) {
    var u = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (bi(t)) nd(l, u);
    else {
      var n = t.alternate;
      if (t.lanes === 0 && (n === null || n.lanes === 0) && (n = l.lastRenderedReducer, n !== null))
        try {
          var i = l.lastRenderedState, c = n(i, e);
          if (u.hasEagerState = !0, u.eagerState = c, Ul(c, i))
            return Fn(t, l, u, 0), jt === null && $n(), !1;
        } catch {
        }
      if (e = Hc(t, l, u, a), e !== null)
        return Ol(e, t, a), id(e, l, a), !0;
    }
    return !1;
  }
  function bf(t, l, e, a) {
    if (a = {
      lane: 2,
      revertLane: fs(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, bi(t)) {
      if (l) throw Error(s(479));
    } else
      l = Hc(
        t,
        e,
        a,
        2
      ), l !== null && Ol(l, t, 2);
  }
  function bi(t) {
    var l = t.alternate;
    return t === lt || l !== null && l === lt;
  }
  function nd(t, l) {
    cu = ri = !0;
    var e = t.pending;
    e === null ? l.next = l : (l.next = e.next, e.next = l), t.pending = l;
  }
  function id(t, l, e) {
    if ((e & 4194048) !== 0) {
      var a = l.lanes;
      a &= t.pendingLanes, e |= a, l.lanes = e, io(t, e);
    }
  }
  var Si = {
    readContext: ul,
    use: vi,
    useCallback: Qt,
    useContext: Qt,
    useEffect: Qt,
    useImperativeHandle: Qt,
    useLayoutEffect: Qt,
    useInsertionEffect: Qt,
    useMemo: Qt,
    useReducer: Qt,
    useRef: Qt,
    useState: Qt,
    useDebugValue: Qt,
    useDeferredValue: Qt,
    useTransition: Qt,
    useSyncExternalStore: Qt,
    useId: Qt,
    useHostTransitionStatus: Qt,
    useFormState: Qt,
    useActionState: Qt,
    useOptimistic: Qt,
    useMemoCache: Qt,
    useCacheRefresh: Qt,
    useEffectEvent: Qt
  }, cd = {
    readContext: ul,
    use: vi,
    useCallback: function(t, l) {
      return hl().memoizedState = [
        t,
        l === void 0 ? null : l
      ], t;
    },
    useContext: ul,
    useEffect: Vr,
    useImperativeHandle: function(t, l, e) {
      e = e != null ? e.concat([t]) : null, yi(
        4194308,
        4,
        $r.bind(null, l, t),
        e
      );
    },
    useLayoutEffect: function(t, l) {
      return yi(4194308, 4, t, l);
    },
    useInsertionEffect: function(t, l) {
      yi(4, 2, t, l);
    },
    useMemo: function(t, l) {
      var e = hl();
      l = l === void 0 ? null : l;
      var a = t();
      if (Ca) {
        Be(!0);
        try {
          t();
        } finally {
          Be(!1);
        }
      }
      return e.memoizedState = [a, l], a;
    },
    useReducer: function(t, l, e) {
      var a = hl();
      if (e !== void 0) {
        var u = e(l);
        if (Ca) {
          Be(!0);
          try {
            e(l);
          } finally {
            Be(!1);
          }
        }
      } else u = l;
      return a.memoizedState = a.baseState = u, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: u
      }, a.queue = t, t = t.dispatch = Sh.bind(
        null,
        lt,
        t
      ), [a.memoizedState, t];
    },
    useRef: function(t) {
      var l = hl();
      return t = { current: t }, l.memoizedState = t;
    },
    useState: function(t) {
      t = rf(t);
      var l = t.queue, e = ud.bind(null, lt, l);
      return l.dispatch = e, [t.memoizedState, e];
    },
    useDebugValue: vf,
    useDeferredValue: function(t, l) {
      var e = hl();
      return hf(e, t, l);
    },
    useTransition: function() {
      var t = rf(!1);
      return t = Pr.bind(
        null,
        lt,
        t.queue,
        !0,
        !1
      ), hl().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, l, e) {
      var a = lt, u = hl();
      if (ft) {
        if (e === void 0)
          throw Error(s(407));
        e = e();
      } else {
        if (e = l(), jt === null)
          throw Error(s(349));
        (vt & 127) !== 0 || Ar(a, l, e);
      }
      u.memoizedState = e;
      var n = { value: e, getSnapshot: l };
      return u.queue = n, Vr(Dr.bind(null, a, n, t), [
        t
      ]), a.flags |= 2048, su(
        9,
        { destroy: void 0 },
        Cr.bind(
          null,
          a,
          n,
          e,
          l
        ),
        null
      ), e;
    },
    useId: function() {
      var t = hl(), l = jt.identifierPrefix;
      if (ft) {
        var e = se, a = fe;
        e = (a & ~(1 << 32 - Dl(a) - 1)).toString(32) + e, l = "_" + l + "R_" + e, e = di++, 0 < e && (l += "H" + e.toString(32)), l += "_";
      } else
        e = dh++, l = "_" + l + "r_" + e.toString(32) + "_";
      return t.memoizedState = l;
    },
    useHostTransitionStatus: gf,
    useFormState: Gr,
    useActionState: Gr,
    useOptimistic: function(t) {
      var l = hl();
      l.memoizedState = l.baseState = t;
      var e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return l.queue = e, l = bf.bind(
        null,
        lt,
        !0,
        e
      ), e.dispatch = l, [t, l];
    },
    useMemoCache: ff,
    useCacheRefresh: function() {
      return hl().memoizedState = bh.bind(
        null,
        lt
      );
    },
    useEffectEvent: function(t) {
      var l = hl(), e = { impl: t };
      return l.memoizedState = e, function() {
        if ((zt & 2) !== 0)
          throw Error(s(440));
        return e.impl.apply(void 0, arguments);
      };
    }
  }, fd = {
    readContext: ul,
    use: vi,
    useCallback: Wr,
    useContext: ul,
    useEffect: mf,
    useImperativeHandle: Fr,
    useInsertionEffect: Kr,
    useLayoutEffect: Jr,
    useMemo: kr,
    useReducer: hi,
    useRef: Zr,
    useState: function() {
      return hi(Ce);
    },
    useDebugValue: vf,
    useDeferredValue: function(t, l) {
      var e = Vt();
      return Ir(
        e,
        Rt.memoizedState,
        t,
        l
      );
    },
    useTransition: function() {
      var t = hi(Ce)[0], l = Vt().memoizedState;
      return [
        typeof t == "boolean" ? t : un(t),
        l
      ];
    },
    useSyncExternalStore: Mr,
    useId: ed,
    useHostTransitionStatus: gf,
    useFormState: Lr,
    useActionState: Lr,
    useOptimistic: function(t, l) {
      var e = Vt();
      return Rr(e, Rt, t, l);
    },
    useMemoCache: ff,
    useCacheRefresh: ad,
    useEffectEvent: wr
  }, ph = {
    readContext: ul,
    use: vi,
    useCallback: Wr,
    useContext: ul,
    useEffect: mf,
    useImperativeHandle: Fr,
    useInsertionEffect: Kr,
    useLayoutEffect: Jr,
    useMemo: kr,
    useReducer: of,
    useRef: Zr,
    useState: function() {
      return of(Ce);
    },
    useDebugValue: vf,
    useDeferredValue: function(t, l) {
      var e = Vt();
      return Rt === null ? hf(e, t, l) : Ir(
        e,
        Rt.memoizedState,
        t,
        l
      );
    },
    useTransition: function() {
      var t = of(Ce)[0], l = Vt().memoizedState;
      return [
        typeof t == "boolean" ? t : un(t),
        l
      ];
    },
    useSyncExternalStore: Mr,
    useId: ed,
    useHostTransitionStatus: gf,
    useFormState: Qr,
    useActionState: Qr,
    useOptimistic: function(t, l) {
      var e = Vt();
      return Rt !== null ? Rr(e, Rt, t, l) : (e.baseState = t, [t, e.queue.dispatch]);
    },
    useMemoCache: ff,
    useCacheRefresh: ad,
    useEffectEvent: wr
  };
  function Sf(t, l, e, a) {
    l = t.memoizedState, e = e(a, l), e = e == null ? l : k({}, l, e), t.memoizedState = e, t.lanes === 0 && (t.updateQueue.baseState = e);
  }
  var pf = {
    enqueueSetState: function(t, l, e) {
      t = t._reactInternals;
      var a = ql(), u = we(a);
      u.payload = l, e != null && (u.callback = e), l = Ke(t, u, a), l !== null && (Ol(l, t, a), Pu(l, t, a));
    },
    enqueueReplaceState: function(t, l, e) {
      t = t._reactInternals;
      var a = ql(), u = we(a);
      u.tag = 1, u.payload = l, e != null && (u.callback = e), l = Ke(t, u, a), l !== null && (Ol(l, t, a), Pu(l, t, a));
    },
    enqueueForceUpdate: function(t, l) {
      t = t._reactInternals;
      var e = ql(), a = we(e);
      a.tag = 2, l != null && (a.callback = l), l = Ke(t, a, e), l !== null && (Ol(l, t, e), Pu(l, t, e));
    }
  };
  function sd(t, l, e, a, u, n, i) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(a, n, i) : l.prototype && l.prototype.isPureReactComponent ? !wu(e, a) || !wu(u, n) : !0;
  }
  function od(t, l, e, a) {
    t = l.state, typeof l.componentWillReceiveProps == "function" && l.componentWillReceiveProps(e, a), typeof l.UNSAFE_componentWillReceiveProps == "function" && l.UNSAFE_componentWillReceiveProps(e, a), l.state !== t && pf.enqueueReplaceState(l, l.state, null);
  }
  function Da(t, l) {
    var e = l;
    if ("ref" in l) {
      e = {};
      for (var a in l)
        a !== "ref" && (e[a] = l[a]);
    }
    if (t = t.defaultProps) {
      e === l && (e = k({}, e));
      for (var u in t)
        e[u] === void 0 && (e[u] = t[u]);
    }
    return e;
  }
  function rd(t) {
    Jn(t);
  }
  function dd(t) {
    console.error(t);
  }
  function md(t) {
    Jn(t);
  }
  function pi(t, l) {
    try {
      var e = t.onUncaughtError;
      e(l.value, { componentStack: l.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function vd(t, l, e) {
    try {
      var a = t.onCaughtError;
      a(e.value, {
        componentStack: e.stack,
        errorBoundary: l.tag === 1 ? l.stateNode : null
      });
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  function _f(t, l, e) {
    return e = we(e), e.tag = 3, e.payload = { element: null }, e.callback = function() {
      pi(t, l);
    }, e;
  }
  function hd(t) {
    return t = we(t), t.tag = 3, t;
  }
  function yd(t, l, e, a) {
    var u = e.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var n = a.value;
      t.payload = function() {
        return u(n);
      }, t.callback = function() {
        vd(l, e, a);
      };
    }
    var i = e.stateNode;
    i !== null && typeof i.componentDidCatch == "function" && (t.callback = function() {
      vd(l, e, a), typeof u != "function" && (ta === null ? ta = /* @__PURE__ */ new Set([this]) : ta.add(this));
      var c = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: c !== null ? c : ""
      });
    });
  }
  function _h(t, l, e, a, u) {
    if (e.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (l = e.alternate, l !== null && Ta(
        l,
        e,
        u,
        !0
      ), e = nl.current, e !== null) {
        switch (e.tag) {
          case 31:
          case 13:
          case 19:
            return dl === null ? Xi() : e.alternate === null && Zt === 0 && (Zt = 3), e.flags &= -257, e.flags |= 65536, e.lanes = u, a === ii ? e.flags |= 16384 : (l = e.updateQueue, l === null ? e.updateQueue = /* @__PURE__ */ new Set([a]) : l.add(a), ns(t, a, u)), !1;
          case 22:
            return e.flags |= 65536, a === ii ? e.flags |= 16384 : (l = e.updateQueue, l === null ? (l = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, e.updateQueue = l) : (e = l.retryQueue, e === null ? l.retryQueue = /* @__PURE__ */ new Set([a]) : e.add(a)), ns(t, a, u)), !1;
        }
        throw Error(s(435, e.tag));
      }
      return ns(t, a, u), Xi(), !1;
    }
    if (ft)
      return l = nl.current, l !== null ? ((l.flags & 65536) === 0 && (l.flags |= 256), l.flags |= 65536, l.lanes = u, a !== Lc && (t = Error(s(422), { cause: a }), $u(Ql(t, e)))) : (a !== Lc && (l = Error(s(423), {
        cause: a
      }), $u(
        Ql(l, e)
      )), t = t.current.alternate, t.flags |= 65536, u &= -u, t.lanes |= u, a = Ql(a, e), u = _f(
        t.stateNode,
        a,
        u
      ), Wc(t, u), Zt !== 4 && (Zt = 2)), !1;
    var n = Error(s(520), { cause: a });
    if (n = Ql(n, e), vn === null ? vn = [n] : vn.push(n), Zt !== 4 && (Zt = 2), l === null) return !0;
    a = Ql(a, e), e = l;
    do {
      switch (e.tag) {
        case 3:
          return e.flags |= 65536, t = u & -u, e.lanes |= t, t = _f(e.stateNode, a, t), Wc(e, t), !1;
        case 1:
          if (l = e.type, n = e.stateNode, (e.flags & 128) === 0 && (typeof l.getDerivedStateFromError == "function" || n !== null && typeof n.componentDidCatch == "function" && (ta === null || !ta.has(n))))
            return e.flags |= 65536, u &= -u, e.lanes |= u, u = hd(u), yd(
              u,
              t,
              e,
              a
            ), Wc(e, u), !1;
          break;
        case 22:
          if (e.memoizedState !== null)
            return e.flags |= 65536, !1;
      }
      e = e.return;
    } while (e !== null);
    return !1;
  }
  var Tf = Error(s(461)), Jt = !1;
  function Wt(t, l, e, a) {
    l.child = t === null ? pr(l, null, e, a) : Aa(
      l,
      t.child,
      e,
      a
    );
  }
  function gd(t, l, e, a, u) {
    e = e.render;
    var n = l.ref;
    if ("ref" in a) {
      var i = {};
      for (var c in a)
        c !== "ref" && (i[c] = a[c]);
    } else i = a;
    return Ea(l), a = af(
      t,
      l,
      e,
      i,
      n,
      u
    ), c = uf(), t !== null && !Jt ? (nf(t, l, u), De(t, l, u)) : (ft && c && Pn(l), l.flags |= 1, Wt(t, l, a, u), l.child);
  }
  function bd(t, l, e, a, u) {
    if (t === null) {
      var n = e.type;
      return typeof n == "function" && !Bc(n) && n.defaultProps === void 0 && e.compare === null ? (l.tag = 15, l.type = n, Sd(
        t,
        l,
        n,
        a,
        u
      )) : (t = kn(
        e.type,
        null,
        a,
        l,
        l.mode,
        u
      ), t.ref = l.ref, t.return = l, l.child = t);
    }
    if (n = t.child, !Df(t, u)) {
      var i = n.memoizedProps;
      if (e = e.compare, e = e !== null ? e : wu, e(i, a) && t.ref === l.ref)
        return De(t, l, u);
    }
    return l.flags |= 1, t = Ne(n, a), t.ref = l.ref, t.return = l, l.child = t;
  }
  function Sd(t, l, e, a, u) {
    if (t !== null) {
      var n = t.memoizedProps;
      if (wu(n, a) && t.ref === l.ref)
        if (Jt = !1, l.pendingProps = a = n, Df(t, u))
          (t.flags & 131072) !== 0 && (Jt = !0);
        else
          return l.lanes = t.lanes, De(t, l, u);
    }
    return Ef(
      t,
      l,
      e,
      a,
      u
    );
  }
  function pd(t, l, e, a) {
    var u = a.children, n = t !== null ? t.memoizedState : null;
    if (t === null && l.stateNode === null && (l.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), a.mode === "hidden") {
      if ((l.flags & 128) !== 0) {
        if (n = n !== null ? n.baseLanes | e : e, t !== null) {
          for (a = l.child = t.child, u = 0; a !== null; )
            u = u | a.lanes | a.childLanes, a = a.sibling;
          a = u & ~n;
        } else a = 0, l.child = null;
        return _d(
          t,
          l,
          n,
          e,
          a
        );
      }
      if ((e & 536870912) !== 0)
        l.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && ui(
          l,
          n !== null ? n.cachePool : null
        ), n !== null ? Er(l, n) : Ic(), Nr(l);
      else
        return a = l.lanes = 536870912, _d(
          t,
          l,
          n !== null ? n.baseLanes | e : e,
          e,
          a
        );
    } else
      n !== null ? (ui(l, n.cachePool), Er(l, n), Fe(), l.memoizedState = null) : (t !== null && ui(l, null), Ic(), Fe());
    return Wt(t, l, u, e), l.child;
  }
  function cn(t, l) {
    return t !== null && t.tag === 22 || l.stateNode !== null || (l.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.sibling;
  }
  function _d(t, l, e, a, u) {
    var n = Kc();
    return n = n === null ? null : { parent: wt._currentValue, pool: n }, l.memoizedState = {
      baseLanes: e,
      cachePool: n
    }, t !== null && ui(l, null), Ic(), Nr(l), t !== null && Ta(t, l, a, !0), l.childLanes = u, null;
  }
  function _i(t, l) {
    return l = Ti(
      { mode: l.mode, children: l.children },
      t.mode
    ), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function Td(t, l, e) {
    return Aa(l, t.child, null, e), t = _i(l, l.pendingProps), t.flags |= 2, Rl(l), l.memoizedState = null, t;
  }
  function Th(t, l, e) {
    var a = l.pendingProps, u = (l.flags & 128) !== 0;
    if (l.flags &= -129, t === null) {
      if (ft) {
        if (a.mode === "hidden")
          return t = _i(l, a), l.lanes = 536870912, t.memoizedState = { baseLanes: 0, cachePool: null }, cn(null, t);
        if (tf(l), (t = Bt) ? (t = $m(
          t,
          wl
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: Ge !== null ? { id: fe, overflow: se } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = nr(t), e.return = l, l.child = e, tl = l, Bt = null)) : t = null, t === null) throw Xe(l);
        return l.lanes = 536870912, null;
      }
      return _i(l, a);
    }
    var n = t.memoizedState;
    if (n !== null) {
      var i = n.dehydrated;
      if (tf(l), u)
        if (l.flags & 256)
          l.flags &= -257, l = Td(
            t,
            l,
            e
          );
        else if (l.memoizedState !== null)
          l.child = t.child, l.flags |= 128, l = null;
        else throw Error(s(558));
      else if (Jt || Ta(t, l, e, !1), u = (e & t.childLanes) !== 0, Jt || u) {
        if (Je.current === null) {
          if (a = jt, a !== null && (i = co(a, e), i !== 0 && i !== n.retryLane))
            throw n.retryLane = i, ba(t, i), Ol(a, t, i), Tf;
          Xi();
        }
        l = Td(
          t,
          l,
          e
        );
      } else
        t = n.treeContext, Bt = Jl(i.nextSibling), tl = l, ft = !0, Le = null, wl = !1, t !== null && fr(l, t), l = _i(l, a), l.flags |= 134221824;
      return l;
    }
    return t = Ne(t.child, {
      mode: a.mode,
      children: a.children
    }), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function ou(t, l) {
    var e = l.ref;
    if (e === null)
      t !== null && t.ref !== null && (l.flags |= 4194816);
    else {
      if (typeof e != "function" && typeof e != "object")
        throw Error(s(284));
      (t === null || t.ref !== e) && (l.flags |= 4194816);
    }
  }
  function Ef(t, l, e, a, u) {
    return Ea(l), e = af(
      t,
      l,
      e,
      a,
      void 0,
      u
    ), a = uf(), t !== null && !Jt ? (nf(t, l, u), De(t, l, u)) : (ft && a && Pn(l), l.flags |= 1, Wt(t, l, e, u), l.child);
  }
  function Ed(t, l, e, a, u, n) {
    return Ea(l), l.updateQueue = null, e = Or(
      l,
      a,
      e,
      u
    ), zr(t), a = uf(), t !== null && !Jt ? (nf(t, l, n), De(t, l, n)) : (ft && a && Pn(l), l.flags |= 1, Wt(t, l, e, n), l.child);
  }
  function Nd(t, l, e, a, u) {
    if (Ea(l), l.stateNode === null) {
      var n = tu, i = e.contextType;
      typeof i == "object" && i !== null && (n = ul(i)), n = new e(a, n), l.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = pf, l.stateNode = n, n._reactInternals = l, n = l.stateNode, n.props = a, n.state = l.memoizedState, n.refs = {}, $c(l), i = e.contextType, n.context = typeof i == "object" && i !== null ? ul(i) : tu, n.state = l.memoizedState, i = e.getDerivedStateFromProps, typeof i == "function" && (Sf(
        l,
        e,
        i,
        a
      ), n.state = l.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof n.getSnapshotBeforeUpdate == "function" || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (i = n.state, typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(), i !== n.state && pf.enqueueReplaceState(n, n.state, null), ln(l, a, n, u), tn(), n.state = l.memoizedState), typeof n.componentDidMount == "function" && (l.flags |= 4194308), a = !0;
    } else if (t === null) {
      n = l.stateNode;
      var c = l.memoizedProps, r = Da(e, c);
      n.props = r;
      var b = n.context, T = e.contextType;
      i = tu, typeof T == "object" && T !== null && (i = ul(T));
      var A = e.getDerivedStateFromProps;
      T = typeof A == "function" || typeof n.getSnapshotBeforeUpdate == "function", c = l.pendingProps !== c, T || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (c || b !== i) && od(
        l,
        n,
        a,
        i
      ), Ve = !1;
      var h = l.memoizedState;
      n.state = h, ln(l, a, n, u), tn(), b = l.memoizedState, c || h !== b || Ve ? (typeof A == "function" && (Sf(
        l,
        e,
        A,
        a
      ), b = l.memoizedState), (r = Ve || sd(
        l,
        e,
        r,
        a,
        h,
        b,
        i
      )) ? (T || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount()), typeof n.componentDidMount == "function" && (l.flags |= 4194308)) : (typeof n.componentDidMount == "function" && (l.flags |= 4194308), l.memoizedProps = a, l.memoizedState = b), n.props = a, n.state = b, n.context = i, a = r) : (typeof n.componentDidMount == "function" && (l.flags |= 4194308), a = !1);
    } else {
      n = l.stateNode, Fc(t, l), i = l.memoizedProps, T = Da(e, i), n.props = T, A = l.pendingProps, h = n.context, b = e.contextType, r = tu, typeof b == "object" && b !== null && (r = ul(b)), c = e.getDerivedStateFromProps, (b = typeof c == "function" || typeof n.getSnapshotBeforeUpdate == "function") || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (i !== A || h !== r) && od(
        l,
        n,
        a,
        r
      ), Ve = !1, h = l.memoizedState, n.state = h, ln(l, a, n, u), tn();
      var p = l.memoizedState;
      i !== A || h !== p || Ve || t !== null && t.dependencies !== null && ei(t.dependencies) ? (typeof c == "function" && (Sf(
        l,
        e,
        c,
        a
      ), p = l.memoizedState), (T = Ve || sd(
        l,
        e,
        T,
        a,
        h,
        p,
        r
      ) || t !== null && t.dependencies !== null && ei(t.dependencies)) ? (b || typeof n.UNSAFE_componentWillUpdate != "function" && typeof n.componentWillUpdate != "function" || (typeof n.componentWillUpdate == "function" && n.componentWillUpdate(a, p, r), typeof n.UNSAFE_componentWillUpdate == "function" && n.UNSAFE_componentWillUpdate(
        a,
        p,
        r
      )), typeof n.componentDidUpdate == "function" && (l.flags |= 4), typeof n.getSnapshotBeforeUpdate == "function" && (l.flags |= 1024)) : (typeof n.componentDidUpdate != "function" || i === t.memoizedProps && h === t.memoizedState || (l.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && h === t.memoizedState || (l.flags |= 1024), l.memoizedProps = a, l.memoizedState = p), n.props = a, n.state = p, n.context = r, a = T) : (typeof n.componentDidUpdate != "function" || i === t.memoizedProps && h === t.memoizedState || (l.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && h === t.memoizedState || (l.flags |= 1024), a = !1);
    }
    return n = a, ou(t, l), a = (l.flags & 128) !== 0, n || a ? (n = l.stateNode, e = a && typeof e.getDerivedStateFromError != "function" ? null : n.render(), l.flags |= 1, t !== null && a ? (l.child = Aa(
      l,
      t.child,
      null,
      u
    ), l.child = Aa(
      l,
      null,
      e,
      u
    )) : Wt(t, l, e, u), l.memoizedState = n.state, t = l.child) : t = De(
      t,
      l,
      u
    ), t;
  }
  function zd(t, l, e, a) {
    return pa(), l.flags |= 256, Wt(t, l, e, a), l.child;
  }
  var Nf = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function zf(t) {
    return { baseLanes: t, cachePool: vr() };
  }
  function Of(t, l, e) {
    return t = t !== null ? t.childLanes & ~e : 0, l && (t |= Bl), t;
  }
  function Od(t, l, e) {
    var a = l.pendingProps, u = !1, n = (l.flags & 128) !== 0, i;
    if ((i = n) || (i = t !== null && t.memoizedState === null ? !1 : (il.current & 2) !== 0), i && (u = !0, l.flags &= -129), i = (l.flags & 32) !== 0, l.flags &= -33, t === null) {
      if (ft) {
        if (u ? $e(l) : Fe(), (t = Bt) ? (t = $m(
          t,
          wl
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: Ge !== null ? { id: fe, overflow: se } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = nr(t), e.return = l, l.child = e, tl = l, Bt = null)) : t = null, t === null) throw Xe(l);
        return zs(t) ? l.lanes = 32 : l.lanes = 536870912, null;
      }
      return n = a.children, a = a.fallback, u ? (Fe(), u = l.mode, n = Ti(
        { mode: "hidden", children: n },
        u
      ), a = Sa(
        a,
        u,
        e,
        null
      ), n.return = l, a.return = l, n.sibling = a, l.child = n, a = l.child, a.memoizedState = zf(e), a.childLanes = Of(
        t,
        i,
        e
      ), l.memoizedState = Nf, cn(null, a)) : ($e(l), Mf(l, n));
    }
    var c = t.memoizedState;
    if (c !== null) {
      var r = c.dehydrated;
      if (r !== null)
        return Eh(
          t,
          l,
          n,
          i,
          a,
          r,
          c,
          e
        );
    }
    return u ? (Fe(), u = a.fallback, n = l.mode, c = t.child, r = c.sibling, a = Ne(c, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = c.subtreeFlags & 1206910976, r !== null ? u = Ne(r, u) : (u = Sa(
      u,
      n,
      e,
      null
    ), u.flags |= 2), u.return = l, a.return = l, a.sibling = u, l.child = a, cn(null, a), a = l.child, u = t.child.memoizedState, u === null ? u = zf(e) : (n = u.cachePool, n !== null ? (c = wt._currentValue, n = n.parent !== c ? { parent: c, pool: c } : n) : n = vr(), u = {
      baseLanes: u.baseLanes | e,
      cachePool: n
    }), a.memoizedState = u, a.childLanes = Of(
      t,
      i,
      e
    ), l.memoizedState = Nf, cn(t.child, a)) : ($e(l), e = t.child, t = e.sibling, e = Ne(e, {
      mode: "visible",
      children: a.children
    }), e.return = l, e.sibling = null, t !== null && (i = l.deletions, i === null ? (l.deletions = [t], l.flags |= 16) : i.push(t)), l.child = e, l.memoizedState = null, e);
  }
  function Mf(t, l) {
    return l = Ti(
      { mode: "visible", children: l },
      t.mode
    ), l.return = t, t.child = l;
  }
  function Ti(t, l) {
    return t = Tl(22, t, null, l), t.lanes = 0, t;
  }
  function Ei(t, l, e) {
    return Aa(l, t.child, null, e), t = Mf(
      l,
      l.pendingProps.children
    ), t.flags |= 2, l.memoizedState = null, t;
  }
  function Eh(t, l, e, a, u, n, i, c) {
    if (e)
      return l.flags & 256 ? ($e(l), l.flags &= -257, Ei(
        t,
        l,
        c
      )) : l.memoizedState !== null ? (Fe(), l.child = t.child, l.flags |= 128, null) : (Fe(), n = u.fallback, i = l.mode, u = Ti(
        { mode: "visible", children: u.children },
        i
      ), n = Sa(
        n,
        i,
        c,
        null
      ), n.flags |= 2, u.return = l, n.return = l, u.sibling = n, l.child = u, Aa(l, t.child, null, c), u = l.child, u.memoizedState = zf(c), u.childLanes = Of(
        t,
        a,
        c
      ), l.memoizedState = Nf, cn(null, u));
    if ($e(l), zs(n)) {
      if (a = n.nextSibling && n.nextSibling.dataset, a) var r = a.dgst;
      return a = r, a !== "" && (u = Error(s(419)), u.stack = "", u.digest = a, $u({ value: u, source: null, stack: null })), Ei(
        t,
        l,
        c
      );
    }
    if (Jt || Ta(t, l, c, !1), a = (c & t.childLanes) !== 0, Jt || a) {
      if (Je.current !== null)
        return Ei(
          t,
          l,
          c
        );
      if (a = jt, a !== null && (u = co(
        a,
        c
      ), u !== 0 && u !== i.retryLane))
        throw i.retryLane = u, ba(t, u), Ol(a, t, u), Tf;
      return Ns(n) || Xi(), Ei(
        t,
        l,
        c
      );
    }
    return Ns(n) ? (l.flags |= 192, l.child = t.child, null) : (t = i.treeContext, Bt = Jl(n.nextSibling), tl = l, ft = !0, Le = null, wl = !1, t !== null && fr(l, t), l = Mf(
      l,
      u.children
    ), l.flags |= 134221824, l);
  }
  function Md(t, l, e) {
    t.lanes |= l;
    var a = t.alternate;
    a !== null && (a.lanes |= l), li(t.return, l, e);
  }
  function Ad(t) {
    for (var l = null; t !== null; ) {
      var e = t.alternate;
      e !== null && oi(e) === null && (l = t), t = t.sibling;
    }
    return l;
  }
  function Ni(t, l, e, a, u, n) {
    var i = t.memoizedState;
    i === null ? t.memoizedState = {
      isBackwards: l,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: e,
      tailMode: u,
      treeForkCount: n
    } : (i.isBackwards = l, i.rendering = null, i.renderingStartTime = 0, i.last = a, i.tail = e, i.tailMode = u, i.treeForkCount = n);
  }
  function Af(t) {
    var l = t.child;
    for (t.child = null; l !== null; ) {
      var e = l.sibling;
      l.sibling = t.child, t.child = l, l = e;
    }
  }
  function Cf(t, l, e) {
    var a = l.pendingProps, u = a.revealOrder, n = a.tail;
    a = a.children;
    var i = il.current;
    if (l.flags & 128)
      return en(l, i), null;
    var c = (i & 2) !== 0;
    if (c ? (i = i & 1 | 2, l.flags |= 128) : i &= 1, en(l, i), u === "backwards" && t !== null ? (Af(t), Wt(t, l, a, e), Af(t)) : Wt(t, l, a, e), a = ft ? Ju : 0, !c && t !== null && (t.flags & 128) !== 0)
      t: for (t = l.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && Md(t, e, l);
        else if (t.tag === 19)
          Md(t, e, l);
        else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === l) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === l)
            break t;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    switch (u) {
      case "backwards":
        e = Ad(l.child), e === null ? (u = l.child, l.child = null) : (u = e.sibling, e.sibling = null, Af(l)), Ni(
          l,
          !0,
          u,
          null,
          n,
          a
        );
        break;
      case "unstable_legacy-backwards":
        for (e = null, u = l.child, l.child = null; u !== null; ) {
          if (t = u.alternate, t !== null && oi(t) === null) {
            l.child = u;
            break;
          }
          t = u.sibling, u.sibling = e, e = u, u = t;
        }
        Ni(
          l,
          !0,
          e,
          null,
          n,
          a
        );
        break;
      case "together":
        Ni(
          l,
          !1,
          null,
          null,
          void 0,
          a
        );
        break;
      case "independent":
        l.memoizedState = null;
        break;
      default:
        e = Ad(l.child), e === null ? (u = l.child, l.child = null) : (u = e.sibling, e.sibling = null), Ni(
          l,
          !1,
          u,
          e,
          n,
          a
        );
    }
    return l.child;
  }
  function Cd(t, l, e) {
    var a = l.pendingProps;
    return Qe(l, l.type, a.value), Wt(t, l, a.children, e), l.child;
  }
  function De(t, l, e) {
    if (t !== null && (l.dependencies = t.dependencies), Pe |= l.lanes, (e & l.childLanes) === 0)
      if (t !== null) {
        if (Ta(
          t,
          l,
          e,
          !1
        ), (e & l.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && l.child !== t.child)
      throw Error(s(153));
    if (l.child !== null) {
      for (t = l.child, e = Ne(t, t.pendingProps), l.child = e, e.return = l; t.sibling !== null; )
        t = t.sibling, e = e.sibling = Ne(t, t.pendingProps), e.return = l;
      e.sibling = null;
    }
    return l.child;
  }
  function Df(t, l) {
    return (t.lanes & l) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && ei(t)));
  }
  function Nh(t, l, e) {
    switch (l.tag) {
      case 3:
        La(l, l.stateNode.containerInfo), Qe(l, wt, t.memoizedState.cache), pa();
        break;
      case 27:
      case 5:
        Uu(l);
        break;
      case 4:
        La(l, l.stateNode.containerInfo);
        break;
      case 10:
        Qe(
          l,
          l.type,
          l.memoizedProps.value
        );
        break;
      case 31:
        if (l.memoizedState !== null)
          return l.flags |= 128, tf(l), null;
        break;
      case 13:
        var a = l.memoizedState;
        if (a !== null) {
          if (a.dehydrated !== null)
            return $e(l), l.flags |= 128, null;
          a = Ta(
            t,
            l,
            e,
            !1
          );
          var u = l.child.childLanes;
          return a || (e & u) !== 0 ? Od(t, l, e) : ($e(l), t = De(
            t,
            l,
            e
          ), t !== null ? t.sibling : null);
        }
        $e(l);
        break;
      case 19:
        if (l.flags & 128)
          return Cf(
            t,
            l,
            e
          );
        if (u = (t.flags & 128) !== 0, a = (e & l.childLanes) !== 0, a || (Ta(
          t,
          l,
          e,
          !1
        ), a = (e & l.childLanes) !== 0), u) {
          if (a)
            return Cf(
              t,
              l,
              e
            );
          l.flags |= 128;
        }
        if (u = l.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), en(l, il.current), a) break;
        return null;
      case 22:
        return l.lanes = 0, pd(
          t,
          l,
          e,
          l.pendingProps
        );
      case 24:
        Qe(l, wt, t.memoizedState.cache);
    }
    return De(t, l, e);
  }
  function Dd(t, l, e) {
    if (t !== null)
      if (t.memoizedProps !== l.pendingProps)
        Jt = !0;
      else {
        if (!Df(t, e) && (l.flags & 128) === 0)
          return Jt = !1, Nh(
            t,
            l,
            e
          );
        Jt = (t.flags & 131072) !== 0;
      }
    else
      Jt = !1, ft && (l.flags & 1048576) !== 0 && cr(l, Ju, l.index);
    switch (l.lanes = 0, l.tag) {
      case 16:
        t: {
          var a = l.pendingProps;
          if (t = Oa(l.elementType), l.type = t, typeof t == "function")
            Bc(t) ? (a = Da(t, a), l.tag = 1, l = Nd(
              null,
              l,
              t,
              a,
              e
            )) : (l.tag = 0, l = Ef(
              null,
              l,
              t,
              a,
              e
            ));
          else {
            if (t != null) {
              var u = t.$$typeof;
              if (u === C) {
                l.tag = 11, l = gd(
                  null,
                  l,
                  t,
                  a,
                  e
                );
                break t;
              } else if (u === pt) {
                l.tag = 14, l = bd(
                  null,
                  l,
                  t,
                  a,
                  e
                );
                break t;
              } else if (u === X) {
                l.tag = 10, l.type = t, l = Cd(
                  null,
                  l,
                  e
                );
                break t;
              }
            }
            throw l = gt(t) || t, Error(s(306, l, ""));
          }
        }
        return l;
      case 0:
        return Ef(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 1:
        return a = l.type, u = Da(
          a,
          l.pendingProps
        ), Nd(
          t,
          l,
          a,
          u,
          e
        );
      case 3:
        t: {
          if (La(
            l,
            l.stateNode.containerInfo
          ), t === null) throw Error(s(387));
          a = l.pendingProps;
          var n = l.memoizedState;
          u = n.element, Fc(t, l), ln(l, a, null, e);
          var i = l.memoizedState;
          if (a = i.cache, Qe(l, wt, a), a !== n.cache && Zc(
            l,
            [wt],
            e,
            !0
          ), tn(), a = i.element, n.isDehydrated)
            if (n = {
              element: a,
              isDehydrated: !1,
              cache: i.cache
            }, l.updateQueue.baseState = n, l.memoizedState = n, l.flags & 256) {
              l = zd(
                t,
                l,
                a,
                e
              );
              break t;
            } else if (a !== u) {
              u = Ql(
                Error(s(424)),
                l
              ), $u(u), l = zd(
                t,
                l,
                a,
                e
              );
              break t;
            } else
              for (t = l.stateNode.containerInfo, t.nodeType === 9 ? t = t.body : t = t.nodeName === "HTML" ? t.ownerDocument.body : t, Bt = Jl(t.firstChild), tl = l, ft = !0, Le = null, wl = !0, e = pr(
                l,
                null,
                a,
                e
              ), l.child = e; e; )
                e.flags = e.flags & -3 | 134221824, e = e.sibling;
          else {
            if (pa(), a === u) {
              l = De(
                t,
                l,
                e
              );
              break t;
            }
            Wt(t, l, a, e);
          }
          l = l.child;
        }
        return l;
      case 26:
        return ou(t, l), t === null ? (e = l0(
          l.type,
          null,
          l.pendingProps,
          null
        )) ? l.memoizedState = e : ft || (l.stateNode = jm(
          l.type,
          l.pendingProps,
          ne.current,
          l
        )) : l.memoizedState = l0(
          l.type,
          t.memoizedProps,
          l.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return Uu(l), t === null && ft && (a = l.stateNode = km(
          l.type,
          l.pendingProps,
          ne.current
        ), tl = l, wl = !0, u = Bt, aa(l.type) ? (Os = u, Bt = Jl(a.firstChild)) : Bt = u), Wt(
          t,
          l,
          l.pendingProps.children,
          e
        ), ou(t, l), t === null && (l.flags |= 4194304), l.child;
      case 5:
        return t === null && ft && ((u = a = Bt) && (a = by(
          a,
          l.type,
          l.pendingProps,
          wl
        ), a !== null ? (l.stateNode = a, tl = l, Bt = Jl(a.firstChild), wl = !1, u = !0) : u = !1), u || Xe(l)), Uu(l), u = l.type, n = l.pendingProps, i = t !== null ? t.memoizedProps : null, a = n.children, gs(u, n) ? a = null : i !== null && gs(u, i) && (l.flags |= 32), l.memoizedState !== null && (u = af(
          t,
          l,
          mh,
          null,
          null,
          e
        ), Au._currentValue = u), ou(t, l), Wt(t, l, a, e), l.child;
      case 6:
        return t === null && ft && ((t = e = Bt) && (e = Sy(
          e,
          l.pendingProps,
          wl
        ), e !== null ? (l.stateNode = e, tl = l, Bt = null, t = !0) : t = !1), t || Xe(l)), null;
      case 13:
        return Od(t, l, e);
      case 4:
        return La(
          l,
          l.stateNode.containerInfo
        ), a = l.pendingProps, t === null ? l.child = Aa(
          l,
          null,
          a,
          e
        ) : Wt(t, l, a, e), l.child;
      case 11:
        return gd(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 7:
        return a = l.pendingProps, ou(t, l), Wt(t, l, a, e), l.child;
      case 8:
        return Wt(
          t,
          l,
          l.pendingProps.children,
          e
        ), l.child;
      case 12:
        return Wt(
          t,
          l,
          l.pendingProps.children,
          e
        ), l.child;
      case 10:
        return Cd(t, l, e);
      case 9:
        return u = l.type._context, a = l.pendingProps.children, Ea(l), u = ul(u), a = a(u), l.flags |= 1, Wt(t, l, a, e), l.child;
      case 14:
        return bd(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 15:
        return Sd(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 19:
        return Cf(t, l, e);
      case 31:
        return Th(t, l, e);
      case 22:
        return pd(
          t,
          l,
          e,
          l.pendingProps
        );
      case 24:
        return Ea(l), a = ul(wt), t === null ? (u = Kc(), u === null && (u = jt, n = Vc(), u.pooledCache = n, n.refCount++, n !== null && (u.pooledCacheLanes |= e), u = n), l.memoizedState = { parent: a, cache: u }, $c(l), Qe(l, wt, u)) : ((t.lanes & e) !== 0 && (Fc(t, l), ln(l, null, null, e), tn()), u = t.memoizedState, n = l.memoizedState, u.parent !== a ? (u = { parent: a, cache: a }, l.memoizedState = u, l.lanes === 0 && (l.memoizedState = l.updateQueue.baseState = u), Qe(l, wt, a)) : (a = n.cache, Qe(l, wt, a), a !== u.cache && Zc(
          l,
          [wt],
          e,
          !0
        ))), Wt(
          t,
          l,
          l.pendingProps.children,
          e
        ), l.child;
      case 30:
        return l.stateNode === null && (l.stateNode = {
          autoName: null,
          paired: null,
          clones: null,
          ref: null
        }), a = l.pendingProps, a.name != null && a.name !== "auto" ? l.flags |= t === null ? 18882560 : 18874368 : ft && Pn(l), t !== null && t.memoizedProps.name !== a.name ? l.flags |= 4194816 : ou(t, l), Wt(t, l, a.children, e), l.child;
      case 29:
        throw l.pendingProps;
    }
    throw Error(s(156, l.tag));
  }
  function xe(t) {
    t.flags |= 4;
  }
  function xf(t, l, e, a, u) {
    var n;
    if ((n = (t.mode & 32) !== 0) && (n = e === null ? n0(l, a) : n0(l, a) && (a.src !== e.src || a.srcSet !== e.srcSet)), n) {
      if (t.flags |= 16777216, (u & 335544128) === u)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (rm()) t.flags |= 8192;
        else
          throw Ma = ii, Jc;
    } else t.flags &= -16777217;
  }
  function xd(t, l) {
    if (l.type !== "stylesheet" || (l.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !i0(l))
      if (rm()) t.flags |= 8192;
      else
        throw Ma = ii, Jc;
  }
  function zi(t, l) {
    l !== null && (t.flags |= 4), t.flags & 16384 && (l = t.tag !== 22 ? uo() : 536870912, t.lanes |= l, hu |= l);
  }
  function fn(t, l) {
    if (!ft)
      switch (t.tailMode) {
        case "visible":
          break;
        case "collapsed":
          for (var e = t.tail, a = null; e !== null; )
            e.alternate !== null && (a = e), e = e.sibling;
          a === null ? l || t.tail === null ? t.tail = null : t.tail.sibling = null : a.sibling = null;
          break;
        default:
          for (l = t.tail, e = null; l !== null; )
            l.alternate !== null && (e = l), l = l.sibling;
          e === null ? t.tail = null : e.sibling = null;
      }
  }
  function qt(t) {
    var l = t.alternate !== null && t.alternate.child === t.child, e = 0, a = 0;
    if (l)
      for (var u = t.child; u !== null; )
        e |= u.lanes | u.childLanes, a |= u.subtreeFlags & 1206910976, a |= u.flags & 1206910976, u.return = t, u = u.sibling;
    else
      for (u = t.child; u !== null; )
        e |= u.lanes | u.childLanes, a |= u.subtreeFlags, a |= u.flags, u.return = t, u = u.sibling;
    return t.subtreeFlags |= a, t.childLanes = e, l;
  }
  function zh(t, l, e) {
    var a = l.pendingProps;
    switch (Gc(l), l.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return qt(l), null;
      case 1:
        return qt(l), null;
      case 3:
        return e = l.stateNode, a = null, t !== null && (a = t.memoizedState.cache), l.memoizedState.cache !== a && (l.flags |= 2048), Me(wt), ie(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (t === null || t.child === null) && (au(l) ? xe(l) : t === null || t.memoizedState.isDehydrated && (l.flags & 256) === 0 || (l.flags |= 1024, Xc())), qt(l), null;
      case 26:
        var u = l.type, n = l.memoizedState;
        return t === null ? (xe(l), n !== null ? (qt(l), xd(l, n)) : (qt(l), xf(
          l,
          u,
          null,
          a,
          e
        ))) : n ? n !== t.memoizedState ? (xe(l), qt(l), xd(l, n)) : (qt(l), l.flags &= -16777217) : (t = t.memoizedProps, t !== a && xe(l), qt(l), xf(
          l,
          u,
          t,
          a,
          e
        )), null;
      case 27:
        if (Xa(l), e = ne.current, u = l.type, t !== null && l.stateNode != null)
          t.memoizedProps !== a && xe(l);
        else {
          if (!a) {
            if (l.stateNode === null)
              throw Error(s(166));
            return qt(l), l.subtreeFlags &= -33554433, null;
          }
          t = At.current, au(l) ? sr(l) : (t = km(u, a, e), l.stateNode = t, xe(l));
        }
        return qt(l), l.subtreeFlags &= -33554433, null;
      case 5:
        if (Xa(l), u = l.type, t !== null && l.stateNode != null)
          t.memoizedProps !== a && xe(l);
        else {
          if (!a) {
            if (l.stateNode === null)
              throw Error(s(166));
            return qt(l), l.subtreeFlags &= -33554433, null;
          }
          if (n = At.current, au(l))
            sr(l);
          else {
            var i = Sn(
              ne.current
            );
            switch (n) {
              case 1:
                n = i.createElementNS(
                  "http://www.w3.org/2000/svg",
                  u
                );
                break;
              case 2:
                n = i.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  u
                );
                break;
              default:
                switch (u) {
                  case "svg":
                    n = i.createElementNS(
                      "http://www.w3.org/2000/svg",
                      u
                    );
                    break;
                  case "math":
                    n = i.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u
                    );
                    break;
                  case "script":
                    n = i.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(
                      n.firstChild
                    );
                    break;
                  case "select":
                    n = typeof a.is == "string" ? i.createElement("select", {
                      is: a.is
                    }) : i.createElement("select"), a.multiple ? n.multiple = !0 : a.size && (n.size = a.size);
                    break;
                  default:
                    n = typeof a.is == "string" ? i.createElement(u, { is: a.is }) : i.createElement(u);
                }
            }
            n[al] = l, n[_l] = a;
            t: for (i = l.child; i !== null; ) {
              if (i.tag === 5 || i.tag === 6)
                n.appendChild(i.stateNode);
              else if (i.tag !== 4 && i.tag !== 27 && i.child !== null) {
                i.child.return = i, i = i.child;
                continue;
              }
              if (i === l) break t;
              for (; i.sibling === null; ) {
                if (i.return === null || i.return === l)
                  break t;
                i = i.return;
              }
              i.sibling.return = i.return, i = i.sibling;
            }
            l.stateNode = n;
            t: switch (fl(n, u, a), u) {
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
            a && xe(l);
          }
        }
        return qt(l), l.subtreeFlags &= -33554433, xf(
          l,
          l.type,
          t === null ? null : t.memoizedProps,
          l.pendingProps,
          e
        ), null;
      case 6:
        if (t && l.stateNode != null)
          t.memoizedProps !== a && xe(l);
        else {
          if (typeof a != "string" && l.stateNode === null)
            throw Error(s(166));
          if (t = ne.current, au(l)) {
            if (t = l.stateNode, e = l.memoizedProps, a = null, u = tl, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  a = u.memoizedProps;
              }
            t[al] = l, t = !!(t.nodeValue === e || a !== null && a.suppressHydrationWarning === !0 || Dm(t.nodeValue, e)), t || Xe(l, !0);
          } else
            t = Sn(t).createTextNode(
              a
            ), t[al] = l, l.stateNode = t;
        }
        return qt(l), null;
      case 31:
        if (e = l.memoizedState, t === null || t.memoizedState !== null) {
          if (a = au(l), e !== null) {
            if (t === null) {
              if (!a) throw Error(s(318));
              if (t = l.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(557));
              t[al] = l;
            } else
              pa(), (l.flags & 128) === 0 && (l.memoizedState = null), l.flags |= 4;
            qt(l), t = !1;
          } else
            e = Xc(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = e), t = !0;
          if (!t)
            return l.flags & 256 ? (Rl(l), l) : (Rl(l), null);
          if ((l.flags & 128) !== 0)
            throw Error(s(558));
        }
        return qt(l), null;
      case 13:
        if (a = l.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (u = au(l), a !== null && a.dehydrated !== null) {
            if (t === null) {
              if (!u) throw Error(s(318));
              if (u = l.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(s(317));
              u[al] = l;
            } else
              pa(), (l.flags & 128) === 0 && (l.memoizedState = null), l.flags |= 4;
            qt(l), u = !1;
          } else
            u = Xc(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return l.flags & 256 ? (Rl(l), l) : (Rl(l), null);
        }
        return Rl(l), (l.flags & 128) !== 0 ? (l.lanes = e, l) : (e = a !== null, t = t !== null && t.memoizedState !== null, e && (a = l.child, u = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (u = a.alternate.memoizedState.cachePool.pool), n = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (n = a.memoizedState.cachePool.pool), n !== u && (a.flags |= 2048)), e !== t && e && (l.child.flags |= 8192), zi(l, l.updateQueue), qt(l), null);
      case 4:
        return ie(), t === null && ds(l.stateNode.containerInfo), l.flags |= 67108864, qt(l), null;
      case 10:
        return Me(l.type), qt(l), null;
      case 19:
        if (lf(l), a = l.memoizedState, a === null) return qt(l), null;
        if (u = (l.flags & 128) !== 0, n = a.rendering, n === null)
          if (u) fn(a, !1);
          else {
            if (Zt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = l.child; t !== null; ) {
                if (n = oi(t), n !== null) {
                  for (l.flags |= 128, fn(a, !1), t = n.updateQueue, l.updateQueue = t, zi(l, t), l.subtreeFlags = 0, t = e, e = l.child; e !== null; )
                    ur(e, t), e = e.sibling;
                  return en(
                    l,
                    il.current & 1 | 2
                  ), ft && ze(l, a.treeForkCount), l.child;
                }
                t = t.sibling;
              }
            a.tail !== null && Al() > qi && (l.flags |= 128, u = !0, fn(a, !1), l.lanes = 4194304);
          }
        else {
          if (!u)
            if (t = oi(n), t !== null) {
              if (l.flags |= 128, u = !0, t = t.updateQueue, l.updateQueue = t, zi(l, t), fn(a, !0), a.tail === null && a.tailMode !== "collapsed" && a.tailMode !== "visible" && !n.alternate && !ft)
                return qt(l), null;
            } else
              2 * Al() - a.renderingStartTime > qi && e !== 536870912 && (l.flags |= 128, u = !0, fn(a, !1), l.lanes = 4194304);
          a.isBackwards ? (n.sibling = l.child, l.child = n) : (t = a.last, t !== null ? t.sibling = n : l.child = n, a.last = n);
        }
        if (a.tail !== null) {
          t = a.tail;
          t: {
            for (e = t; e !== null; ) {
              if (e.alternate !== null) {
                e = !1;
                break t;
              }
              e = e.sibling;
            }
            e = !0;
          }
          return a.rendering = t, a.tail = t.sibling, a.renderingStartTime = Al(), t.sibling = null, n = il.current, n = u ? n & 1 | 2 : n & 1, a.tailMode === "visible" || a.tailMode === "collapsed" || !e || ft ? en(l, n) : (e = n, _t(nl, l), _t(il, e), dl === null && (dl = l)), ft && ze(l, a.treeForkCount), t;
        }
        return qt(l), null;
      case 22:
      case 23:
        return Rl(l), Pc(), a = l.memoizedState !== null, t !== null ? t.memoizedState !== null !== a && (l.flags |= 8192) : a && (l.flags |= 8192), a ? (e & 536870912) !== 0 && (l.flags & 128) === 0 && (qt(l), l.subtreeFlags & 6 && (l.flags |= 8192)) : qt(l), e = l.updateQueue, e !== null && zi(l, e.retryQueue), e = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), a = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (a = l.memoizedState.cachePool.pool), a !== e && (l.flags |= 2048), t !== null && Ft(za), null;
      case 24:
        return e = null, t !== null && (e = t.memoizedState.cache), l.memoizedState.cache !== e && (l.flags |= 2048), Me(wt), qt(l), null;
      case 25:
        return null;
      case 30:
        return l.flags |= 33554432, qt(l), null;
    }
    throw Error(s(156, l.tag));
  }
  function Oh(t, l) {
    switch (Gc(l), l.tag) {
      case 1:
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 3:
        return Me(wt), ie(), t = l.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (l.flags = t & -65537 | 128, l) : null;
      case 26:
      case 27:
      case 5:
        return Xa(l), null;
      case 31:
        if (l.memoizedState !== null) {
          if (Rl(l), l.alternate === null)
            throw Error(s(340));
          pa();
        }
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 13:
        if (Rl(l), t = l.memoizedState, t !== null && t.dehydrated !== null) {
          if (l.alternate === null)
            throw Error(s(340));
          pa();
        }
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 19:
        return lf(l), t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, t = l.memoizedState, t !== null && (t.rendering = null, t.tail = null), l.flags |= 4, l) : null;
      case 4:
        return ie(), null;
      case 10:
        return Me(l.type), null;
      case 22:
      case 23:
        return Rl(l), Pc(), t !== null && Ft(za), t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 24:
        return Me(wt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Ud(t, l) {
    switch (Gc(l), l.tag) {
      case 3:
        Me(wt), ie();
        break;
      case 26:
      case 27:
      case 5:
        Xa(l);
        break;
      case 4:
        ie();
        break;
      case 31:
        l.memoizedState !== null && Rl(l);
        break;
      case 13:
        Rl(l);
        break;
      case 19:
        lf(l);
        break;
      case 10:
        Me(l.type);
        break;
      case 22:
      case 23:
        Rl(l), Pc(), t !== null && Ft(za);
        break;
      case 24:
        Me(wt);
    }
  }
  function sn(t, l) {
    try {
      var e = l.updateQueue, a = e !== null ? e.lastEffect : null;
      if (a !== null) {
        var u = a.next;
        e = u;
        do {
          if ((e.tag & t) === t) {
            a = void 0;
            var n = e.create, i = e.inst;
            a = n(), i.destroy = a;
          }
          e = e.next;
        } while (e !== u);
      }
    } catch (c) {
      Dt(l, l.return, c);
    }
  }
  function We(t, l, e) {
    try {
      var a = l.updateQueue, u = a !== null ? a.lastEffect : null;
      if (u !== null) {
        var n = u.next;
        a = n;
        do {
          if ((a.tag & t) === t) {
            var i = a.inst, c = i.destroy;
            if (c !== void 0) {
              i.destroy = void 0, u = l;
              var r = e, b = c;
              try {
                b();
              } catch (T) {
                Dt(
                  u,
                  r,
                  T
                );
              }
            }
          }
          a = a.next;
        } while (a !== n);
      }
    } catch (T) {
      Dt(l, l.return, T);
    }
  }
  function Rd(t) {
    var l = t.updateQueue;
    if (l !== null) {
      var e = t.stateNode;
      try {
        Tr(l, e);
      } catch (a) {
        Dt(t, t.return, a);
      }
    }
  }
  function jd(t, l, e) {
    e.props = Da(
      t.type,
      t.memoizedProps
    ), e.state = t.memoizedState;
    try {
      e.componentWillUnmount();
    } catch (a) {
      Dt(t, l, a);
    }
  }
  function oe(t, l) {
    try {
      var e = t.ref;
      if (e !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var a = t.stateNode;
            break;
          case 30:
            var u = t.stateNode, n = Te(t.memoizedProps, u);
            (u.ref === null || u.ref.name !== n) && (u.ref = Xm(n)), a = u.ref;
            break;
          case 7:
            if (t.stateNode === null) {
              var i = new Yl(t);
              _(
                t.child,
                !1,
                yy,
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
        typeof e == "function" ? t.refCleanup = e(a) : e.current = a;
      }
    } catch (c) {
      Dt(t, l, c);
    }
  }
  function cl(t, l) {
    var e = t.ref, a = t.refCleanup;
    if (e !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (u) {
          Dt(t, l, u);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof e == "function")
        try {
          e(null);
        } catch (u) {
          Dt(t, l, u);
        }
      else e.current = null;
  }
  function Oi(t, l) {
    if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && t.alternate === null && l !== null)
      for (var e = 0; e < l.length; e++)
        Jm(
          t.stateNode,
          l[e]
        );
  }
  function Hd(t) {
    for (var l = t.return; l !== null && (Rf(l) && Jm(t.stateNode, l.stateNode), !Uf(l)); )
      l = l.return;
  }
  function on(t) {
    for (var l = t.return; l !== null && (Rf(l) && gy(t.stateNode, l.stateNode), !Uf(l)); )
      l = l.return;
  }
  function Uf(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 27;
  }
  function Rf(t) {
    return t && t.tag === 7 && t.stateNode !== null;
  }
  function jf(t) {
    var l = t.type, e = t.memoizedProps, a = t.stateNode;
    try {
      t: switch (l) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          e.autoFocus && a.focus();
          break t;
        case "img":
          e.src ? a.src = e.src : e.srcSet && (a.srcset = e.srcSet);
      }
    } catch (u) {
      Dt(t, t.return, u);
    }
  }
  function Hf(t, l, e) {
    try {
      var a = t.stateNode;
      Ih(a, t.type, e, l), a[_l] = l;
    } catch (u) {
      Dt(t, t.return, u);
    }
  }
  function Bd(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && aa(t.type) || t.tag === 4;
  }
  function Bf(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Bd(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && aa(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function qf(t, l, e, a) {
    var u = t.tag;
    if (u === 5 || u === 6)
      u = t.stateNode, l ? (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).insertBefore(u, l) : (l = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, l.appendChild(u), e = e._reactRootContainer, e != null || l.onclick !== null || (l.onclick = ce)), Oi(t, a), Tt = !0;
    else if (u !== 4 && (u === 27 && (Oi(t, a), a = null, aa(t.type) && (e = t.stateNode, l = null)), t = t.child, t !== null))
      for (qf(
        t,
        l,
        e,
        a
      ), t = t.sibling; t !== null; )
        qf(
          t,
          l,
          e,
          a
        ), t = t.sibling;
  }
  function Mi(t, l, e, a) {
    var u = t.tag;
    if (u === 5 || u === 6)
      u = t.stateNode, l ? e.insertBefore(u, l) : e.appendChild(u), Oi(t, a), Tt = !0;
    else if (u !== 4 && (u === 27 && (Oi(t, a), a = null, aa(t.type) && (e = t.stateNode)), t = t.child, t !== null))
      for (Mi(
        t,
        l,
        e,
        a
      ), t = t.sibling; t !== null; )
        Mi(
          t,
          l,
          e,
          a
        ), t = t.sibling;
  }
  function qd(t) {
    var l = t.stateNode, e = t.memoizedProps;
    try {
      for (var a = t.type, u = l.attributes; u.length; )
        l.removeAttributeNode(u[0]);
      fl(l, a, e), l[al] = t, l[_l] = e;
    } catch (n) {
      Dt(t, t.return, n);
    }
  }
  var Ai = !1, jl = null;
  function Yd(t) {
    (t.tag === 30 || (t.subtreeFlags & 33554432) !== 0) && (Ai = !0);
  }
  var re = null;
  function Gd() {
    var t = re;
    return re = null, t;
  }
  var El = 0;
  function ru(t, l, e, a, u) {
    return El = 0, Ld(
      t.child,
      l,
      e,
      a,
      u
    );
  }
  function Ld(t, l, e, a, u) {
    for (var n = !1; t !== null; ) {
      if (t.tag === 5) {
        var i = t.stateNode;
        if (a !== null) {
          var c = ps(i);
          a.push(c), c.view && (n = !0);
        } else
          n || ps(i).view && (n = !0);
        Ai = !0, Gm(
          i,
          El === 0 ? l : l + "_" + El,
          e
        ), El++;
      } else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && u || Ld(
        t.child,
        l,
        e,
        a,
        u
      ) && (n = !0));
      t = t.sibling;
    }
    return n;
  }
  function de(t, l) {
    for (; t !== null; )
      t.tag === 5 ? Lm(t.stateNode, t.memoizedProps) : (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && l || de(
        t.child,
        l
      )), t = t.sibling;
  }
  function Ci(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if ((t.tag !== 22 || t.memoizedState === null) && (Ci(t), t.tag === 30 && (t.flags & 18874368) !== 0 && t.stateNode.paired)) {
          var l = t.memoizedProps;
          if (l.name == null || l.name === "auto")
            throw Error(s(544));
          var e = l.name;
          l = Ee(l.default, l.share), l !== "none" && (ru(
            t,
            e,
            l,
            null,
            !1
          ) || de(t.child, !1));
        }
        t = t.sibling;
      }
  }
  function Yf(t, l) {
    if (t.tag === 30) {
      var e = t.stateNode, a = t.memoizedProps, u = Te(a, e), n = Ee(
        a.default,
        e.paired ? a.share : a.enter
      );
      n !== "none" ? ru(t, u, n, null, !1) ? (Ci(t), e.paired || l || Su(t, a.onEnter)) : de(t.child, !1) : Ci(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        Yf(t, l), t = t.sibling;
    else Ci(t);
  }
  function Gf(t) {
    if (jl !== null && jl.size !== 0) {
      var l = jl;
      if ((t.subtreeFlags & 18874368) !== 0)
        for (t = t.child; t !== null; ) {
          if (t.tag !== 22 || t.memoizedState === null) {
            if (t.tag === 30 && (t.flags & 18874368) !== 0) {
              var e = t.memoizedProps, a = e.name;
              if (a != null && a !== "auto") {
                var u = l.get(a);
                if (u !== void 0) {
                  var n = Ee(
                    e.default,
                    e.share
                  );
                  if (n !== "none" && (ru(
                    t,
                    a,
                    n,
                    null,
                    !1
                  ) ? (n = t.stateNode, u.paired = n, n.paired = u, Su(t, e.onShare)) : de(t.child, !1)), l.delete(a), l.size === 0) break;
                }
              }
            }
            Gf(t);
          }
          t = t.sibling;
        }
    }
  }
  function Lf(t) {
    if (t.tag === 30) {
      var l = t.memoizedProps, e = Te(l, t.stateNode), a = jl !== null ? jl.get(e) : void 0, u = Ee(
        l.default,
        a !== void 0 ? l.share : l.exit
      );
      u !== "none" && (ru(t, e, u, null, !1) ? a !== void 0 ? (u = t.stateNode, a.paired = u, u.paired = a, jl.delete(e), Su(t, l.onShare)) : Su(t, l.onExit) : de(t.child, !1)), jl !== null && Gf(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        Lf(t), t = t.sibling;
    else
      jl !== null && Gf(t);
  }
  function Xd(t) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var l = t.memoizedProps, e = Te(l, t.stateNode);
        l = Ee(l.default, l.update), t.flags &= -5, l !== "none" && ru(
          t,
          e,
          l,
          t.memoizedState = [],
          !1
        );
      } else
        (t.subtreeFlags & 33554432) !== 0 && Xd(t);
      t = t.sibling;
    }
  }
  function Xf(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if (t.tag !== 22 || t.memoizedState === null) {
          if (t.tag === 30 && (t.flags & 18874368) !== 0) {
            var l = t.stateNode;
            l.paired !== null && (l.paired = null, de(t.child, !1));
          }
          Xf(t);
        }
        t = t.sibling;
      }
  }
  function Di(t) {
    if (t.tag === 30)
      t.stateNode.paired = null, de(t.child, !1), Xf(t);
    else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        Di(t), t = t.sibling;
    else Xf(t);
  }
  function Qd(t) {
    for (t = t.child; t !== null; )
      t.tag === 30 ? de(t.child, !1) : (t.subtreeFlags & 33554432) !== 0 && Qd(t), t = t.sibling;
  }
  function Qf(t, l, e, a, u, n, i) {
    for (var c = !1; l !== null; ) {
      if (l.tag === 5) {
        var r = l.stateNode;
        if (n !== null && El < n.length) {
          var b = n[El], T = ps(r);
          (b.view || T.view) && (c = !0);
          var A;
          if (A = (t.flags & 4) === 0)
            if (T.clip) A = !0;
            else {
              A = b.rect;
              var h = T.rect;
              A = A.y !== h.y || A.x !== h.x || A.height !== h.height || A.width !== h.width;
            }
          A && (t.flags |= 4), T.abs ? T = !b.abs : (b = b.rect, T = T.rect, T = b.height !== T.height || b.width !== T.width), T && (t.flags |= 32);
        } else t.flags |= 32;
        (t.flags & 4) !== 0 && Gm(
          r,
          El === 0 ? e : e + "_" + El,
          u
        ), c && (t.flags & 4) !== 0 || (re === null && (re = []), re.push(
          r,
          El === 0 ? a : a + "_" + El,
          l.memoizedProps
        )), El++;
      } else (l.tag !== 22 || l.memoizedState === null) && (l.tag === 30 && i ? t.flags |= l.flags & 32 : Qf(
        t,
        l.child,
        e,
        a,
        u,
        n,
        i
      ) && (c = !0));
      l = l.sibling;
    }
    return c;
  }
  function Zd(t, l) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var e = t.memoizedProps, a = t.stateNode, u = Te(e, a), n = Ee(e.default, e.update), i;
        i = t.memoizedState, t.memoizedState = null, a = t;
        var c = t.child;
        El = 0, u = Qf(
          a,
          c,
          u,
          u,
          n,
          i,
          !1
        ), (t.flags & 4) !== 0 && u && Su(t, e.onUpdate);
      } else
        (t.subtreeFlags & 33554432) !== 0 && Zd(t);
      t = t.sibling;
    }
  }
  var ll = !1, Mt = !1, me = !1, Zf = !1, Vd = typeof WeakSet == "function" ? WeakSet : Set, el = null, ve = !1, rn = !1, xi = !1, Vf = !1;
  function Mh(t, l, e) {
    if (t = t.containerInfo, hs = Cu, t = $o(t), Cc(t)) {
      if ("selectionStart" in t)
        var a = {
          start: t.selectionStart,
          end: t.selectionEnd
        };
      else
        t: {
          a = (a = t.ownerDocument) && a.defaultView || window;
          var u = a.getSelection && a.getSelection();
          if (u && u.rangeCount !== 0) {
            a = u.anchorNode;
            var n = u.anchorOffset, i = u.focusNode;
            u = u.focusOffset;
            try {
              a.nodeType, i.nodeType;
            } catch {
              a = null;
              break t;
            }
            var c = 0, r = -1, b = -1, T = 0, A = 0, h = t, p = null;
            l: for (; ; ) {
              for (var R; h !== a || n !== 0 && h.nodeType !== 3 || (r = c + n), h !== i || u !== 0 && h.nodeType !== 3 || (b = c + u), h.nodeType === 3 && (c += h.nodeValue.length), (R = h.firstChild) !== null; )
                p = h, h = R;
              for (; ; ) {
                if (h === t) break l;
                if (p === a && ++T === n && (r = c), p === i && ++A === u && (b = c), (R = h.nextSibling) !== null) break;
                h = p, p = h.parentNode;
              }
              h = R;
            }
            a = r === -1 || b === -1 ? null : { start: r, end: b };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (ys = { focusedElem: t, selectionRange: a }, Cu = !1, e = (e & 335544064) === e, el = l, l = e ? 9270 : 1024; el !== null; ) {
      if (t = el, e && (a = t.deletions, a !== null))
        for (n = 0; n < a.length; n++)
          e && Lf(a[n]);
      if (t.alternate === null && (t.flags & 2) !== 0)
        e && Yd(t), Ui(e);
      else {
        if (t.tag === 22) {
          if (a = t.alternate, t.memoizedState !== null) {
            a !== null && a.memoizedState === null && e && Lf(a), Ui(e);
            continue;
          } else if (a !== null && a.memoizedState !== null) {
            e && Yd(t), Ui(e);
            continue;
          }
        }
        a = t.child, (t.subtreeFlags & l) !== 0 && a !== null ? (a.return = t, el = a) : (e && Xd(t), Ui(e));
      }
    }
    jl = null;
  }
  function Ui(t) {
    for (; el !== null; ) {
      var l = el, e = t, a = l.alternate, u = l.flags;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if ((u & 1024) !== 0 && a !== null) {
            e = void 0, u = a.memoizedProps, a = a.memoizedState;
            var n = l.stateNode;
            try {
              var i = Da(
                l.type,
                u
              );
              e = n.getSnapshotBeforeUpdate(
                i,
                a
              ), n.__reactInternalSnapshotBeforeUpdate = e;
            } catch (c) {
              Dt(l, l.return, c);
            }
          }
          break;
        case 3:
          if ((u & 1024) !== 0) {
            if (a = l.stateNode.containerInfo, e = a.nodeType, e === 9)
              Es(a);
            else if (e === 1)
              switch (a.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  Es(a);
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
          e && a !== null && (e = Te(
            a.memoizedProps,
            a.stateNode
          ), u = l.memoizedProps, u = Ee(u.default, u.update), u !== "none" && ru(
            a,
            e,
            u,
            a.memoizedState = [],
            !0
          ));
          break;
        default:
          if ((u & 1024) !== 0) throw Error(s(163));
      }
      if (a = l.sibling, a !== null) {
        a.return = l.return, el = a;
        break;
      }
      el = l.return;
    }
  }
  function wd(t, l, e) {
    var a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        he(t, e), a & 4 && sn(5, e);
        break;
      case 1:
        if (he(t, e), a & 4)
          if (t = e.stateNode, l === null)
            try {
              t.componentDidMount();
            } catch (i) {
              Dt(e, e.return, i);
            }
          else {
            var u = Da(
              e.type,
              l.memoizedProps
            );
            l = l.memoizedState;
            try {
              t.componentDidUpdate(
                u,
                l,
                t.__reactInternalSnapshotBeforeUpdate
              );
            } catch (i) {
              Dt(
                e,
                e.return,
                i
              );
            }
          }
        a & 64 && Rd(e), a & 512 && oe(e, e.return);
        break;
      case 3:
        if (he(t, e), a & 64 && (t = e.updateQueue, t !== null)) {
          if (l = null, e.child !== null)
            switch (e.child.tag) {
              case 27:
              case 5:
                l = e.child.stateNode;
                break;
              case 1:
                l = e.child.stateNode;
            }
          try {
            Tr(t, l);
          } catch (i) {
            Dt(e, e.return, i);
          }
        }
        break;
      case 27:
        l === null && a & 4 && qd(e);
      case 26:
      case 5:
        he(t, e), l === null && a & 4 && jf(e), a & 512 && oe(e, e.return);
        break;
      case 12:
        he(t, e);
        break;
      case 31:
        he(t, e), a & 4 && Fd(t, e);
        break;
      case 13:
        he(t, e), a & 4 && Wd(t, e), a & 64 && (t = e.memoizedState, t !== null && (t = t.dehydrated, t !== null && (e = Gh.bind(
          null,
          e
        ), py(t, e))));
        break;
      case 22:
        if (a = e.memoizedState !== null || ll, !a) {
          var n = l !== null && l.memoizedState !== null || Mt;
          l = ll, u = Mt, ll = a, (Mt = n) && !u ? (a = 2, (e.subtreeFlags & 8772) !== 0 && (a |= 1), le(
            t,
            e,
            a
          )) : he(t, e), ll = l, Mt = u;
        }
        break;
      case 30:
        he(t, e), a & 512 && oe(e, e.return);
        break;
      case 7:
        a & 512 && oe(e, e.return);
      default:
        he(t, e);
    }
  }
  function wf(t, l) {
    for (t = t.child; t !== null; )
      Kd(t, l), t = t.sibling;
  }
  function Kd(t, l) {
    switch (t.tag) {
      case 5:
      case 26:
        try {
          var e = t.stateNode;
          if (l) {
            var a = e.style;
            typeof a.setProperty == "function" ? a.setProperty("display", "none", "important") : a.display = "none";
          } else {
            var u = t.stateNode, n = t.memoizedProps.style, i = n != null && n.hasOwnProperty("display") ? n.display : null;
            u.style.display = i == null || typeof i == "boolean" ? "" : ("" + i).trim();
          }
        } catch (r) {
          Dt(t, t.return, r);
        }
        Kf(t, l);
        break;
      case 6:
        try {
          t.stateNode.nodeValue = l ? "" : t.memoizedProps, Tt = !0;
        } catch (r) {
          Dt(t, t.return, r);
        }
        break;
      case 18:
        try {
          var c = t.stateNode;
          l ? Ym(c, !0) : Ym(t.stateNode, !1);
        } catch (r) {
          Dt(t, t.return, r);
        }
        break;
      case 22:
      case 23:
        t.memoizedState === null && wf(t, l);
        break;
      default:
        wf(t, l);
    }
  }
  function Kf(t, l) {
    if (t.subtreeFlags & 67108864)
      for (t = t.child; t !== null; ) {
        t: {
          var e = t, a = l;
          switch (e.tag) {
            case 4:
              Kd(e, a);
              break t;
            case 22:
              e.memoizedState === null && Kf(e, a);
              break t;
            default:
              Kf(e, a);
          }
        }
        t = t.sibling;
      }
  }
  function Jd(t) {
    var l = t.alternate;
    l !== null && (t.alternate = null, Jd(l)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (l = t.stateNode, l !== null && qn(l)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Gt = null, Nl = !1;
  function Pl(t, l, e) {
    for (e = e.child; e !== null; )
      $d(t, l, e), e = e.sibling;
  }
  function $d(t, l, e) {
    if (Cl && typeof Cl.onCommitFiberUnmount == "function")
      try {
        Cl.onCommitFiberUnmount(Ru, e);
      } catch {
      }
    switch (e.tag) {
      case 26:
        Mt || cl(e, l), Pl(
          t,
          l,
          e
        ), e.memoizedState ? e.memoizedState.count-- : e.stateNode && !Mt && (e = e.stateNode, e.parentNode.removeChild(e));
        break;
      case 27:
        Mt || cl(e, l), on(e);
        var a = Gt, u = Nl;
        aa(e.type) && (Gt = e.stateNode, Nl = !1), Pl(
          t,
          l,
          e
        ), Im(
          e.stateNode,
          e.type,
          e.memoizedProps
        ), Gt = a, Nl = u;
        break;
      case 5:
        Mt || cl(e, l), on(e);
      case 6:
        if (e.tag === 6 && on(e), a = Gt, u = Nl, Gt = null, Pl(
          t,
          l,
          e
        ), Gt = a, Nl = u, Gt !== null)
          if (Nl)
            try {
              (Gt.nodeType === 9 ? Gt.body : Gt.nodeName === "HTML" ? Gt.ownerDocument.body : Gt).removeChild(e.stateNode), Tt = !0;
            } catch (n) {
              Dt(
                e,
                l,
                n
              );
            }
          else
            try {
              Gt.removeChild(e.stateNode), Tt = !0;
            } catch (n) {
              Dt(
                e,
                l,
                n
              );
            }
        break;
      case 18:
        Gt !== null && (Nl ? (t = Gt, qm(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          e.stateNode
        ), Du(t)) : qm(Gt, e.stateNode));
        break;
      case 4:
        a = Gt, u = Nl, Gt = e.stateNode.containerInfo, Nl = !0, Pl(
          t,
          l,
          e
        ), Gt = a, Nl = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        We(2, e, l), Mt || We(4, e, l), Pl(
          t,
          l,
          e
        );
        break;
      case 1:
        Mt || (cl(e, l), a = e.stateNode, typeof a.componentWillUnmount == "function" && jd(
          e,
          l,
          a
        )), Pl(
          t,
          l,
          e
        );
        break;
      case 21:
        Pl(
          t,
          l,
          e
        );
        break;
      case 22:
        Mt = (a = Mt) || e.memoizedState !== null, Pl(
          t,
          l,
          e
        ), Mt = a;
        break;
      case 30:
        cl(e, l), Pl(
          t,
          l,
          e
        );
        break;
      case 7:
        Mt || cl(e, l), Pl(
          t,
          l,
          e
        );
        break;
      default:
        Pl(
          t,
          l,
          e
        );
    }
  }
  function Fd(t, l) {
    if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        Du(t);
      } catch (e) {
        Dt(l, l.return, e);
      }
    }
  }
  function Wd(t, l) {
    if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        Du(t);
      } catch (e) {
        Dt(l, l.return, e);
      }
  }
  function Ah(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var l = t.stateNode;
        return l === null && (l = t.stateNode = new Vd()), l;
      case 22:
        return t = t.stateNode, l = t._retryCache, l === null && (l = t._retryCache = new Vd()), l;
      default:
        throw Error(s(435, t.tag));
    }
  }
  function Ri(t, l) {
    var e = Ah(t);
    l.forEach(function(a) {
      if (!e.has(a)) {
        e.add(a);
        var u = Lh.bind(null, t, a);
        a.then(u, u);
      }
    });
  }
  function yl(t, l, e) {
    var a = l.deletions;
    if (a !== null)
      for (var u = 0; u < a.length; u++) {
        var n = a[u], i = t, c = l, r = c;
        t: for (; r !== null; ) {
          switch (r.tag) {
            case 27:
              if (aa(r.type)) {
                Gt = r.stateNode, Nl = !1;
                break t;
              }
              break;
            case 5:
              Gt = r.stateNode, Nl = !1;
              break t;
            case 3:
            case 4:
              Gt = r.stateNode.containerInfo, Nl = !0;
              break t;
          }
          r = r.return;
        }
        if (Gt === null) throw Error(s(160));
        $d(i, c, n), Gt = null, Nl = !1, i = n.alternate, i !== null && (i.return = null), n.return = null;
      }
    if (l.subtreeFlags & 13886)
      for (l = l.child; l !== null; )
        kd(l, t, e), l = l.sibling;
  }
  var te = null;
  function kd(t, l, e) {
    var a = t.alternate, u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (u & 4 && (a = t.updateQueue, a = a !== null ? a.events : null, a !== null))
          for (var n = 0; n < a.length; n++) {
            var i = a[n];
            i.ref.impl = i.nextImpl;
          }
        yl(l, t, e), gl(t), u & 4 && (We(3, t, t.return), sn(3, t), We(5, t, t.return));
        break;
      case 1:
        yl(l, t, e), gl(t), u & 512 && (Mt || a === null || cl(a, a.return)), u & 64 && ll && (t = t.updateQueue, t !== null && (l = t.callbacks, l !== null && (e = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = e === null ? l : e.concat(l))));
        break;
      case 26:
        if (n = te, yl(l, t, e), gl(t), u & 512 && (Mt || a === null || cl(a, a.return)), u & 4)
          if (u = a !== null ? a.memoizedState : null, e = t.memoizedState, a === null)
            if (e === null)
              if (t.stateNode === null)
                if (ll)
                  t.stateNode = jm(
                    t.type,
                    t.memoizedProps,
                    l.containerInfo,
                    t
                  );
                else {
                  t: {
                    l = t.type, e = t.memoizedProps, u = n.ownerDocument || n;
                    l: switch (l) {
                      case "title":
                        a = u.getElementsByTagName("title")[0], (!a || a[Bu] || a[al] || a.namespaceURI === "http://www.w3.org/2000/svg" || a.hasAttribute("itemprop")) && (a = u.createElement(l), u.head.insertBefore(
                          a,
                          u.querySelector("head > title")
                        )), fl(a, l, e), a[al] = t, Pt(a), l = a;
                        break t;
                      case "link":
                        if (n = u0(
                          "link",
                          "href",
                          u
                        ).get(l + (e.href || ""))) {
                          for (i = 0; i < n.length; i++)
                            if (a = n[i], a.getAttribute("href") === (e.href == null || e.href === "" ? null : e.href) && a.getAttribute("rel") === (e.rel == null ? null : e.rel) && a.getAttribute("title") === (e.title == null ? null : e.title) && a.getAttribute("crossorigin") === (e.crossOrigin == null ? null : e.crossOrigin)) {
                              n.splice(i, 1);
                              break l;
                            }
                        }
                        a = u.createElement(l), fl(a, l, e), u.head.appendChild(a);
                        break;
                      case "meta":
                        if (n = u0(
                          "meta",
                          "content",
                          u
                        ).get(l + (e.content || ""))) {
                          for (i = 0; i < n.length; i++)
                            if (a = n[i], a.getAttribute("content") === (e.content == null ? null : "" + e.content) && a.getAttribute("name") === (e.name == null ? null : e.name) && a.getAttribute("property") === (e.property == null ? null : e.property) && a.getAttribute("http-equiv") === (e.httpEquiv == null ? null : e.httpEquiv) && a.getAttribute("charset") === (e.charSet == null ? null : e.charSet)) {
                              n.splice(i, 1);
                              break l;
                            }
                        }
                        a = u.createElement(l), fl(a, l, e), u.head.appendChild(a);
                        break;
                      default:
                        throw Error(s(468, l));
                    }
                    a[al] = t, Pt(a), l = a;
                  }
                  t.stateNode = l;
                }
              else
                ll || Ds(n, t.type, t.stateNode);
            else
              t.stateNode = a0(
                n,
                e,
                t.memoizedProps
              );
          else
            u !== e ? (u === null ? (l = a.stateNode, l === null || Mt || l.parentNode.removeChild(l)) : u.count--, e === null ? ll || Ds(n, t.type, t.stateNode) : a0(n, e, t.memoizedProps)) : e === null && t.stateNode !== null && Hf(
              t,
              t.memoizedProps,
              a.memoizedProps
            );
        break;
      case 27:
        yl(l, t, e), gl(t), u & 512 && (Mt || a === null || cl(a, a.return)), a !== null && u & 4 && Hf(
          t,
          t.memoizedProps,
          a.memoizedProps
        );
        break;
      case 5:
        if (n = me, me = !1, yl(l, t, e), me = n, gl(t), u & 512 && (Mt || a === null || cl(a, a.return)), t.flags & 32) {
          l = t.stateNode;
          try {
            Ja(l, ""), Tt = !0;
          } catch (T) {
            Dt(t, t.return, T);
          }
        }
        u & 4 && t.stateNode != null && (l = t.memoizedProps, Hf(
          t,
          l,
          a !== null ? a.memoizedProps : l
        )), u & 1024 && (Zf = !0);
        break;
      case 6:
        if (yl(l, t, e), gl(t), u & 4) {
          if (t.stateNode === null)
            throw Error(s(162));
          l = t.memoizedProps, e = t.stateNode;
          try {
            e.nodeValue = l, Tt = !0;
          } catch (T) {
            Dt(t, t.return, T);
          }
        }
        break;
      case 3:
        if (Tt = !1, $i = null, n = te, te = pn(l.containerInfo), yl(l, t, e), te = n, gl(t), u & 4 && a !== null && a.memoizedState.isDehydrated)
          try {
            Du(l.containerInfo);
          } catch (T) {
            Dt(t, t.return, T);
          }
        Zf && (Zf = !1, Id(t)), Tt = !1;
        break;
      case 4:
        u = me, me = ll, a = bo(), n = te, te = pn(
          t.stateNode.containerInfo
        ), yl(l, t, e), gl(t), te = n, Tt && rn && (xi = !0), Tt = a, me = u;
        break;
      case 12:
        yl(l, t, e), gl(t);
        break;
      case 31:
        yl(l, t, e), gl(t), u & 4 && (l = t.updateQueue, l !== null && (t.updateQueue = null, Ri(t, l)));
        break;
      case 13:
        yl(l, t, e), gl(t), t.child.flags & 8192 && t.memoizedState !== null != (a !== null && a.memoizedState !== null) && (Bi = Al()), u & 4 && (l = t.updateQueue, l !== null && (t.updateQueue = null, Ri(t, l)));
        break;
      case 22:
        n = t.memoizedState !== null, i = a !== null && a.memoizedState !== null;
        var c = ll, r = Mt, b = me;
        ll = c || n, me = b || n, Mt = r || i, yl(l, t, e), Mt = r, me = b, ll = c, gl(t), u & 8192 && (l = t.stateNode, l._visibility = n ? l._visibility & -2 : l._visibility | 1, !n || a === null || i || ll || Mt || (l = i || Mt, e = ll, a = Mt, ll = n || ll, Mt = l, ke(t, 2), ll = e, Mt = a), !n && me || wf(t, n)), u & 4 && (l = t.updateQueue, l !== null && (e = l.retryQueue, e !== null && (l.retryQueue = null, Ri(t, e))));
        break;
      case 19:
        yl(l, t, e), gl(t), u & 4 && (l = t.updateQueue, l !== null && (t.updateQueue = null, Ri(t, l)));
        break;
      case 30:
        u & 512 && (Mt || a === null || cl(a, a.return)), u = bo(), n = rn, i = (e & 335544064) === e, c = t.memoizedProps, rn = i && Ee(
          c.default,
          c.update
        ) !== "none", yl(l, t, e), gl(t), i && a !== null && Tt && (t.flags |= 4), rn = n, Tt = u;
        break;
      case 21:
        break;
      case 7:
        u & 512 && (Mt || a === null || cl(a, a.return)), a && a.stateNode !== null && (a.stateNode._fragmentFiber = t);
      default:
        yl(l, t, e), gl(t);
    }
  }
  function gl(t) {
    var l = t.flags;
    if (l & 2) {
      try {
        for (var e, a = t.return; a !== null; ) {
          if (Bd(a)) {
            e = a;
            break;
          }
          a = a.return;
        }
        a = null;
        for (var u = t.return; u !== null; ) {
          if (Rf(u)) {
            var n = u.stateNode;
            a === null ? a = [n] : a.push(n);
          }
          if (Uf(u)) break;
          u = u.return;
        }
        var i = a;
        if (e == null) throw Error(s(160));
        switch (e.tag) {
          case 27:
            var c = e.stateNode, r = Bf(t);
            Mi(
              t,
              r,
              c,
              i
            );
            break;
          case 5:
            var b = e.stateNode;
            e.flags & 32 && (Ja(b, ""), e.flags &= -33);
            var T = Bf(t);
            Mi(
              t,
              T,
              b,
              i
            );
            break;
          case 3:
          case 4:
            var A = e.stateNode.containerInfo, h = Bf(t);
            qf(
              t,
              h,
              A,
              i
            );
            break;
          default:
            throw Error(s(161));
        }
      } catch (p) {
        Dt(t, t.return, p);
      }
      t.flags &= -3;
    }
    l & 4096 && (t.flags &= -4097);
  }
  function Id(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var l = t;
        Id(l), l.tag === 5 && l.flags & 1024 && (l = l.stateNode, Cu = !0, l.reset(), Cu = !1), t = t.sibling;
      }
  }
  function du(t, l) {
    if (l.subtreeFlags & 9270)
      for (l = l.child; l !== null; )
        Pd(l, t), l = l.sibling;
    else Zd(l);
  }
  function Pd(t, l) {
    var e = t.alternate;
    if (e === null) Yf(t, !1);
    else
      switch (t.tag) {
        case 3:
          if (Vf = ve = !1, Gd(), du(l, t), !ve && !xi) {
            if (t = re, t !== null)
              for (var a = 0; a < t.length; a += 3) {
                e = t[a];
                var u = t[a + 1];
                Lm(e, t[a + 2]), e = e.ownerDocument.documentElement, e !== null && e.animate(
                  { opacity: [0, 0], pointerEvents: ["none", "none"] },
                  {
                    duration: 0,
                    fill: "forwards",
                    pseudoElement: "::view-transition-group(" + u + ")"
                  }
                );
              }
            t = l.containerInfo, t = t.nodeType === 9 ? t.documentElement : t.ownerDocument.documentElement, t !== null && t.style.viewTransitionName === "" && (t.style.viewTransitionName = "none", t.animate(
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
            )), Vf = !0;
          }
          re = null;
          break;
        case 5:
          du(l, t);
          break;
        case 4:
          a = ve, ve = !1, du(l, t), ve && (xi = !0), ve = a;
          break;
        case 22:
          t.memoizedState === null && (e.memoizedState !== null ? Yf(t, !1) : du(l, t));
          break;
        case 30:
          a = ve, u = Gd(), ve = !1, du(l, t), ve && (t.flags |= 4);
          var n = t.memoizedProps, i = t.stateNode;
          l = Te(n, i), i = Te(e.memoizedProps, i);
          var c = Ee(n.default, n.update);
          c === "none" ? l = !1 : (n = e.memoizedState, e.memoizedState = null, e = t.child, El = 0, l = Qf(
            t,
            e,
            l,
            i,
            c,
            n,
            !0
          ), El !== (n === null ? 0 : n.length) && (t.flags |= 32)), (t.flags & 4) !== 0 && l ? (Su(
            t,
            t.memoizedProps.onUpdate
          ), re = u) : u !== null && (u.push.apply(u, re), re = u), ve = (t.flags & 32) !== 0 ? !0 : a;
          break;
        default:
          du(l, t);
      }
  }
  function he(t, l) {
    if (l.subtreeFlags & 8772)
      for (l = l.child; l !== null; )
        wd(t, l.alternate, l), l = l.sibling;
  }
  function ke(t, l) {
    for (t = t.child; t !== null; ) {
      var e = t, a = l;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          We(4, e, e.return), ke(
            e,
            a
          );
          break;
        case 1:
          cl(e, e.return);
          var u = e.stateNode;
          typeof u.componentWillUnmount == "function" && jd(
            e,
            e.return,
            u
          ), ke(
            e,
            a
          );
          break;
        case 27:
          (a & 2) !== 0 && Im(
            e.stateNode,
            e.type,
            e.memoizedProps
          );
        case 5:
          cl(e, e.return), e.tag !== 5 && e.tag !== 27 || on(e), ke(
            e,
            a
          );
          break;
        case 6:
          on(e);
          break;
        case 26:
          cl(e, e.return), u = e.stateNode, e.memoizedState !== null || u === null || Mt || u.parentNode.removeChild(u), ke(
            e,
            a
          );
          break;
        case 22:
          e.memoizedState === null && ke(
            e,
            a
          );
          break;
        case 30:
          cl(e, e.return), ke(
            e,
            a
          );
          break;
        case 7:
          cl(e, e.return);
        default:
          ke(
            e,
            a
          );
      }
      t = t.sibling;
    }
  }
  function le(t, l, e) {
    for (e = (l.subtreeFlags & 8772) !== 0 ? e : e & -2, l = l.child; l !== null; ) {
      var a = l.alternate, u = t, n = l, i = n.flags, c = (e & 1) !== 0;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          le(
            u,
            n,
            e
          ), sn(4, n);
          break;
        case 1:
          if (le(
            u,
            n,
            e
          ), a = n, u = a.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (T) {
              Dt(a, a.return, T);
            }
          if (a = n, u = a.updateQueue, u !== null) {
            var r = a.stateNode;
            try {
              var b = u.shared.hiddenCallbacks;
              if (b !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < b.length; u++)
                  _r(b[u], r);
            } catch (T) {
              Dt(a, a.return, T);
            }
          }
          c && i & 64 && Rd(n), oe(n, n.return);
          break;
        case 27:
          (e & 2) !== 0 && qd(n);
        case 5:
          n.tag !== 5 && n.tag !== 27 || Hd(n), le(
            u,
            n,
            e
          ), c && a === null && i & 4 && jf(n), oe(n, n.return);
          break;
        case 6:
          Hd(n);
          break;
        case 26:
          r = n.stateNode, n.memoizedState !== null || r === null || ll || Ds(
            pn(r.ownerDocument),
            n.type,
            r
          ), le(
            u,
            n,
            e
          ), c && a === null && i & 4 && jf(n), oe(n, n.return);
          break;
        case 12:
          le(
            u,
            n,
            e
          );
          break;
        case 31:
          le(
            u,
            n,
            e
          ), c && i & 4 && Fd(u, n);
          break;
        case 13:
          le(
            u,
            n,
            e
          ), c && i & 4 && Wd(u, n);
          break;
        case 22:
          n.memoizedState === null && le(
            u,
            n,
            e
          ), oe(n, n.return);
          break;
        case 30:
          le(
            u,
            n,
            e
          ), oe(n, n.return);
          break;
        case 7:
          oe(n, n.return);
        default:
          le(
            u,
            n,
            e
          );
      }
      l = l.sibling;
    }
  }
  function Jf(t, l) {
    var e = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), t = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (t = l.memoizedState.cachePool.pool), t !== e && (t != null && t.refCount++, e != null && Fu(e));
  }
  function $f(t, l) {
    t = null, l.alternate !== null && (t = l.alternate.memoizedState.cache), l = l.memoizedState.cache, l !== t && (l.refCount++, t != null && Fu(t));
  }
  function Kl(t, l, e, a) {
    var u = (e & 335544064) === e;
    if (l.subtreeFlags & (u ? 10262 : 10256))
      for (l = l.child; l !== null; )
        tm(
          t,
          l,
          e,
          a
        ), l = l.sibling;
    else u && Qd(l);
  }
  function tm(t, l, e, a) {
    var u = (e & 335544064) === e;
    u && l.alternate === null && l.return !== null && l.return.alternate !== null && Di(l);
    var n = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Kl(
          t,
          l,
          e,
          a
        ), n & 2048 && sn(9, l);
        break;
      case 1:
        Kl(
          t,
          l,
          e,
          a
        );
        break;
      case 3:
        Kl(
          t,
          l,
          e,
          a
        ), u && Vf && (t = t.containerInfo, t = t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, t.style.viewTransitionName === "root" && (t.style.viewTransitionName = ""), t = t.ownerDocument.documentElement, t !== null && t.style.viewTransitionName === "none" && (t.style.viewTransitionName = "")), n & 2048 && (n = null, l.alternate !== null && (n = l.alternate.memoizedState.cache), l = l.memoizedState.cache, l !== n && (l.refCount++, n != null && Fu(n)));
        break;
      case 12:
        if (n & 2048) {
          Kl(
            t,
            l,
            e,
            a
          ), n = l.stateNode;
          try {
            var i = l.memoizedProps, c = i.id, r = i.onPostCommit;
            typeof r == "function" && r(
              c,
              l.alternate === null ? "mount" : "update",
              n.passiveEffectDuration,
              -0
            );
          } catch (b) {
            Dt(l, l.return, b);
          }
        } else
          Kl(
            t,
            l,
            e,
            a
          );
        break;
      case 31:
        Kl(
          t,
          l,
          e,
          a
        );
        break;
      case 13:
        Kl(
          t,
          l,
          e,
          a
        );
        break;
      case 23:
        break;
      case 22:
        i = l.stateNode, c = l.alternate, l.memoizedState !== null ? (u && c !== null && c.memoizedState === null && Di(c), i._visibility & 2 ? Kl(
          t,
          l,
          e,
          a
        ) : dn(
          t,
          l
        )) : (u && c !== null && c.memoizedState !== null && Di(l), i._visibility & 2 ? Kl(
          t,
          l,
          e,
          a
        ) : (i._visibility |= 2, mu(
          t,
          l,
          e,
          a,
          (l.subtreeFlags & 10256) !== 0 || !1
        ))), n & 2048 && Jf(c, l);
        break;
      case 24:
        Kl(
          t,
          l,
          e,
          a
        ), n & 2048 && $f(l.alternate, l);
        break;
      case 30:
        u && (n = l.alternate, n !== null && (de(n.child, !0), de(l.child, !0))), Kl(
          t,
          l,
          e,
          a
        );
        break;
      default:
        Kl(
          t,
          l,
          e,
          a
        );
    }
  }
  function mu(t, l, e, a, u) {
    for (u = u && ((l.subtreeFlags & 10256) !== 0 || !1), l = l.child; l !== null; ) {
      var n = t, i = l, c = e, r = a, b = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          mu(
            n,
            i,
            c,
            r,
            u
          ), sn(8, i);
          break;
        case 23:
          break;
        case 22:
          var T = i.stateNode;
          i.memoizedState !== null ? T._visibility & 2 ? mu(
            n,
            i,
            c,
            r,
            u
          ) : dn(
            n,
            i
          ) : (T._visibility |= 2, mu(
            n,
            i,
            c,
            r,
            u
          )), u && b & 2048 && Jf(
            i.alternate,
            i
          );
          break;
        case 24:
          mu(
            n,
            i,
            c,
            r,
            u
          ), u && b & 2048 && $f(i.alternate, i);
          break;
        default:
          mu(
            n,
            i,
            c,
            r,
            u
          );
      }
      l = l.sibling;
    }
  }
  function dn(t, l) {
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; ) {
        var e = t, a = l, u = a.flags;
        switch (a.tag) {
          case 22:
            dn(e, a), u & 2048 && Jf(
              a.alternate,
              a
            );
            break;
          case 24:
            dn(e, a), u & 2048 && $f(a.alternate, a);
            break;
          default:
            dn(e, a);
        }
        l = l.sibling;
      }
  }
  var xa = 8192;
  function Ua(t, l, e) {
    if (t.subtreeFlags & xa)
      for (t = t.child; t !== null; )
        lm(
          t,
          l,
          e
        ), t = t.sibling;
  }
  function lm(t, l, e) {
    switch (t.tag) {
      case 26:
        Ua(
          t,
          l,
          e
        ), t.flags & xa && (t.memoizedState !== null ? jy(
          e,
          te,
          t.memoizedState,
          t.memoizedProps
        ) : (t = t.stateNode, (l & 335544128) === l && f0(e, t)));
        break;
      case 5:
        Ua(
          t,
          l,
          e
        ), t.flags & xa && (t = t.stateNode, (l & 335544128) === l && f0(e, t));
        break;
      case 3:
      case 4:
        var a = te;
        te = pn(t.stateNode.containerInfo), Ua(
          t,
          l,
          e
        ), te = a;
        break;
      case 22:
        t.memoizedState === null && (a = t.alternate, a !== null && a.memoizedState !== null ? (a = xa, xa = 16777216, Ua(
          t,
          l,
          e
        ), xa = a) : Ua(
          t,
          l,
          e
        ));
        break;
      case 30:
        if ((t.flags & xa) !== 0 && (a = t.memoizedProps.name, a != null && a !== "auto")) {
          var u = t.stateNode;
          u.paired = null, jl === null && (jl = /* @__PURE__ */ new Map()), jl.set(a, u);
        }
        Ua(
          t,
          l,
          e
        );
        break;
      default:
        Ua(
          t,
          l,
          e
        );
    }
  }
  function em(t) {
    var l = t.alternate;
    if (l !== null && (t = l.child, t !== null)) {
      l.child = null;
      do
        l = t.sibling, t.sibling = null, t = l;
      while (t !== null);
    }
  }
  function mn(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var e = 0; e < l.length; e++) {
          var a = l[e];
          el = a, um(
            a,
            t
          );
        }
      em(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        am(t), t = t.sibling;
  }
  function am(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        mn(t), t.flags & 2048 && We(9, t, t.return);
        break;
      case 3:
        mn(t);
        break;
      case 12:
        mn(t);
        break;
      case 22:
        var l = t.stateNode;
        t.memoizedState !== null && l._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (l._visibility &= -3, ji(t)) : mn(t);
        break;
      default:
        mn(t);
    }
  }
  function ji(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var e = 0; e < l.length; e++) {
          var a = l[e];
          el = a, um(
            a,
            t
          );
        }
      em(t);
    }
    for (t = t.child; t !== null; ) {
      switch (l = t, l.tag) {
        case 0:
        case 11:
        case 15:
          We(8, l, l.return), ji(l);
          break;
        case 22:
          e = l.stateNode, e._visibility & 2 && (e._visibility &= -3, ji(l));
          break;
        default:
          ji(l);
      }
      t = t.sibling;
    }
  }
  function um(t, l) {
    for (; el !== null; ) {
      var e = el;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          We(8, e, l);
          break;
        case 23:
        case 22:
          if (e.memoizedState !== null && e.memoizedState.cachePool !== null) {
            var a = e.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          Fu(e.memoizedState.cache);
      }
      if (a = e.child, a !== null) a.return = e, el = a;
      else
        t: for (e = t; el !== null; ) {
          a = el;
          var u = a.sibling, n = a.return;
          if (Jd(a), a === e) {
            el = null;
            break t;
          }
          if (u !== null) {
            u.return = n, el = u;
            break t;
          }
          el = n;
        }
    }
  }
  var Ch = {
    getCacheForType: function(t) {
      var l = ul(wt), e = l.data.get(t);
      return e === void 0 && (e = t(), l.data.set(t, e)), e;
    },
    cacheSignal: function() {
      return ul(wt).controller.signal;
    }
  }, Dh = typeof WeakMap == "function" ? WeakMap : Map, zt = 0, jt = null, dt = null, vt = 0, Ct = 0, Hl = null, Ie = !1, vu = !1, Ff = !1, Ue = 0, Zt = 0, Pe = 0, Ra = 0, Hi = 0, Bl = 0, hu = 0, vn = null, zl = null, Wf = !1, Bi = 0, nm = 0, qi = 1 / 0, Yi = null, ta = null, Lt = 0, ee = null, ja = null, ye = 0, kf = 0, If = null, im = null, yu = null, gu = null, bu = null, hn = 0, Gi = null;
  function ql() {
    return (zt & 2) !== 0 && vt !== 0 ? vt & -vt : L.T !== null ? fs() : fo();
  }
  function cm() {
    if (Bl === 0)
      if ((vt & 536870912) === 0 || ft) {
        var t = Rn;
        Rn <<= 1, (Rn & 3932160) === 0 && (Rn = 262144), Bl = t;
      } else Bl = 536870912;
    return t = nl.current, t !== null && (t.flags |= 32), Bl;
  }
  function Su(t, l) {
    if (l != null) {
      var e = t.stateNode, a = e.ref;
      a === null && (a = e.ref = Xm(
        Te(t.memoizedProps, e)
      )), gu === null && (gu = []), gu.push(l.bind(null, a));
    }
  }
  function Ol(t, l, e) {
    (t === jt && (Ct === 2 || Ct === 9) || t.cancelPendingCommit !== null) && (pu(t, 0), la(
      t,
      vt,
      Bl,
      !1
    )), Hu(t, e), ((zt & 2) === 0 || t !== jt) && (t === jt && ((zt & 2) === 0 && (Ra |= e), Zt === 4 && la(
      t,
      vt,
      Bl,
      !1
    )), ge(t));
  }
  function fm(t, l, e) {
    if ((zt & 6) !== 0) throw Error(s(327));
    var a = !e && (l & 127) === 0 && (l & t.expiredLanes) === 0 || ju(t, l), u = a ? Rh(t, l) : ts(t, l, !0), n = a;
    do {
      if (u === 0) {
        vu && !a && la(t, l, 0, !1);
        break;
      } else {
        if (e = t.current.alternate, n && !xh(e)) {
          u = ts(t, l, !1), n = !1;
          continue;
        }
        if (u === 2) {
          if (n = l, t.errorRecoveryDisabledLanes & n)
            var i = 0;
          else
            i = t.pendingLanes & -536870913, i = i !== 0 ? i : i & 536870912 ? 536870912 : 0;
          if (i !== 0) {
            l = i;
            t: {
              var c = t;
              u = vn;
              var r = c.current.memoizedState.isDehydrated;
              if (r && (pu(c, i).flags |= 256), i = ts(
                c,
                i,
                !1
              ), i !== 2 && i !== 6) {
                if (Ff && !r) {
                  c.errorRecoveryDisabledLanes |= n, Ra |= n, u = 4;
                  break t;
                }
                n = zl, zl = u, n !== null && (zl === null ? zl = n : zl.push.apply(
                  zl,
                  n
                ));
              }
              u = i;
            }
            if (n = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          pu(t, 0), la(t, l, 0, !0);
          break;
        }
        t: {
          switch (a = t, n = u, n) {
            case 0:
            case 1:
              throw Error(s(345));
            case 4:
              if ((l & 4194048) !== l && (l & 62914560) !== l)
                break;
            case 6:
              la(
                a,
                l,
                Bl,
                !Ie
              );
              break t;
            case 2:
              zl = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((l & 62914560) === l && (u = Bi + 300 - Al(), 10 < u)) {
            if (la(
              a,
              l,
              Bl,
              !Ie
            ), Hn(a, 0, !0) !== 0) break t;
            ye = l, a.timeoutHandle = Ss(
              sm.bind(
                null,
                a,
                e,
                zl,
                Yi,
                Wf,
                l,
                Bl,
                Ra,
                hu,
                Ie,
                n,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break t;
          }
          sm(
            a,
            e,
            zl,
            Yi,
            Wf,
            l,
            Bl,
            Ra,
            hu,
            Ie,
            n,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    ge(t);
  }
  function sm(t, l, e, a, u, n, i, c, r, b, T, A, h, p) {
    t.timeoutHandle = -1;
    var R = l.subtreeFlags, Z = (n & 335544064) === n;
    if (A = null, (Z || R & 8192 || (R & 16785408) === 16785408) && (A = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: ce
    }, jl = null, lm(
      l,
      n,
      A
    ), Z && (R = A, Z = t.containerInfo, Z = (Z.nodeType === 9 ? Z : Z.ownerDocument).__reactViewTransition, Z != null && (R.count++, R.waitingForViewTransition = !0, R = En.bind(R), Z.finished.then(R, R))), R = (n & 62914560) === n ? Bi - Al() : (n & 4194048) === n ? nm - Al() : 0, R = Hy(
      A,
      R
    ), R !== null)) {
      ye = n, t.cancelPendingCommit = R(
        gm.bind(
          null,
          t,
          l,
          n,
          e,
          a,
          u,
          i,
          c,
          r,
          b,
          T,
          A,
          null,
          h,
          p
        )
      ), la(t, n, i, !b);
      return;
    }
    gm(
      t,
      l,
      n,
      e,
      a,
      u,
      i,
      c,
      r,
      b,
      T,
      A
    );
  }
  function xh(t) {
    for (var l = t; ; ) {
      var e = l.tag;
      if ((e === 0 || e === 11 || e === 15) && l.flags & 16384 && (e = l.updateQueue, e !== null && (e = e.stores, e !== null)))
        for (var a = 0; a < e.length; a++) {
          var u = e[a], n = u.getSnapshot;
          u = u.value;
          try {
            if (!Ul(n(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (e = l.child, l.subtreeFlags & 16384 && e !== null)
        e.return = l, l = e;
      else {
        if (l === t) break;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === t) return !0;
          l = l.return;
        }
        l.sibling.return = l.return, l = l.sibling;
      }
    }
    return !0;
  }
  function la(t, l, e, a) {
    l = ao(t, l), l &= ~Hi, l &= ~Ra, t.suspendedLanes |= l, t.pingedLanes &= ~l, a && (t.warmLanes |= l), a = t.expirationTimes;
    for (var u = l; 0 < u; ) {
      var n = 31 - Dl(u), i = 1 << n;
      a[n] = -1, u &= ~i;
    }
    e !== 0 && no(t, e, l);
  }
  function Li() {
    return (zt & 6) === 0 ? (yn(0), !1) : !0;
  }
  function Pf() {
    if (dt !== null) {
      if (Ct === 0)
        var t = dt.return;
      else
        t = dt, Oe = _a = null, cf(t), iu = null, Iu = 0, t = dt;
      for (; t !== null; )
        Ud(t.alternate, t), t = t.return;
      dt = null;
    }
  }
  function pu(t, l) {
    var e = t.timeoutHandle;
    return e !== -1 && (t.timeoutHandle = -1, ly(e)), e = t.cancelPendingCommit, e !== null && (t.cancelPendingCommit = null, e()), ye = 0, Pf(), jt = t, dt = e = Ne(t.current, null), vt = l, Ct = 0, Hl = null, Ie = !1, vu = ju(t, l), Ff = !1, hu = Bl = Hi = Ra = Pe = Zt = 0, zl = vn = null, Wf = !1, Ue = ao(t, l), $n(), e;
  }
  function om(t, l) {
    lt = null, L.H = Si, l === nu || l === ni ? (l = gr(), Ct = 3) : l === Jc ? (l = gr(), Ct = 4) : Ct = l === Tf ? 8 : l !== null && typeof l == "object" && typeof l.then == "function" ? 6 : 1, Hl = l, dt === null && (Zt = 1, pi(
      t,
      Ql(l, t.current)
    ));
  }
  function rm() {
    var t = nl.current;
    return t === null ? !0 : (vt & 4194048) === vt ? dl === null : (vt & 62914560) === vt || (vt & 536870912) !== 0 ? t === dl : !1;
  }
  function dm() {
    var t = L.H;
    return L.H = Si, t === null ? Si : t;
  }
  function mm() {
    var t = L.A;
    return L.A = Ch, t;
  }
  function Xi() {
    Zt = 4, Ie || (vt & 4194048) !== vt && nl.current !== null || (vu = !0), (Pe & 134217727) === 0 && (Ra & 134217727) === 0 || jt === null || la(
      jt,
      vt,
      Bl,
      !1
    );
  }
  function ts(t, l, e) {
    var a = zt;
    zt |= 2;
    var u = dm(), n = mm();
    (jt !== t || vt !== l) && (Yi = null, pu(t, l)), l = !1;
    var i = Zt;
    t: do
      try {
        if (Ct !== 0 && dt !== null) {
          var c = dt, r = Hl;
          switch (Ct) {
            case 8:
              Pf(), i = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              nl.current === null && (l = !0);
              var b = Ct;
              if (Ct = 0, Hl = null, _u(t, c, r, b), e && vu) {
                i = 0;
                break t;
              }
              break;
            default:
              b = Ct, Ct = 0, Hl = null, _u(t, c, r, b);
          }
        }
        Uh(), i = Zt;
        break;
      } catch (T) {
        om(t, T);
      }
    while (!0);
    return l && t.shellSuspendCounter++, Oe = _a = null, zt = a, L.H = u, L.A = n, dt === null && (jt = null, vt = 0, $n()), i;
  }
  function Uh() {
    for (; dt !== null; ) vm(dt);
  }
  function Rh(t, l) {
    var e = zt;
    zt |= 2;
    var a = dm(), u = mm();
    jt !== t || vt !== l ? (Yi = null, qi = Al() + 500, pu(t, l)) : vu = ju(
      t,
      l
    );
    t: do
      try {
        if (Ct !== 0 && dt !== null) {
          l = dt;
          var n = Hl;
          l: switch (Ct) {
            case 1:
              Ct = 0, Hl = null, _u(t, l, n, 1);
              break;
            case 2:
            case 9:
              if (hr(n)) {
                Ct = 0, Hl = null, hm(l);
                break;
              }
              l = function() {
                Ct !== 2 && Ct !== 9 || jt !== t || (Ct = 7), ge(t);
              }, n.then(l, l);
              break t;
            case 3:
              Ct = 7;
              break t;
            case 4:
              Ct = 5;
              break t;
            case 7:
              hr(n) ? (Ct = 0, Hl = null, hm(l)) : (Ct = 0, Hl = null, _u(t, l, n, 7));
              break;
            case 5:
              var i = null;
              switch (dt.tag) {
                case 26:
                  i = dt.memoizedState;
                case 5:
                case 27:
                  var c = dt;
                  if (i ? i0(i) : c.stateNode.complete) {
                    Ct = 0, Hl = null;
                    var r = c.sibling;
                    if (r !== null) dt = r;
                    else {
                      var b = c.return;
                      b !== null ? (dt = b, Qi(b)) : dt = null;
                    }
                    break l;
                  }
              }
              Ct = 0, Hl = null, _u(t, l, n, 5);
              break;
            case 6:
              Ct = 0, Hl = null, _u(t, l, n, 6);
              break;
            case 8:
              Pf(), Zt = 6;
              break t;
            default:
              throw Error(s(462));
          }
        }
        jh();
        break;
      } catch (T) {
        om(t, T);
      }
    while (!0);
    return Oe = _a = null, L.H = a, L.A = u, zt = e, dt !== null ? 0 : (jt = null, vt = 0, $n(), Zt);
  }
  function jh() {
    for (; dt !== null && !k0(); )
      vm(dt);
  }
  function vm(t) {
    var l = Dd(t.alternate, t, Ue);
    t.memoizedProps = t.pendingProps, l === null ? Qi(t) : dt = l;
  }
  function hm(t) {
    var l = t, e = l.alternate;
    switch (l.tag) {
      case 15:
      case 0:
        l = Ed(
          e,
          l,
          l.pendingProps,
          l.type,
          void 0,
          vt
        );
        break;
      case 11:
        l = Ed(
          e,
          l,
          l.pendingProps,
          l.type.render,
          l.ref,
          vt
        );
        break;
      case 5:
        cf(l);
        var a = l;
        a === tl && (ft ? (ti(a), a.tag === 5 && a.stateNode != null && (Bt = a.stateNode)) : (ti(a), ft = !0));
      default:
        Ud(e, l), l = dt = ur(l, Ue), l = Dd(e, l, Ue);
    }
    t.memoizedProps = t.pendingProps, l === null ? Qi(t) : dt = l;
  }
  function _u(t, l, e, a) {
    Oe = _a = null, cf(l), iu = null, Iu = 0;
    var u = l.return;
    try {
      if (_h(
        t,
        u,
        l,
        e,
        vt
      )) {
        Zt = 1, pi(
          t,
          Ql(e, t.current)
        ), dt = null;
        return;
      }
    } catch (n) {
      if (u !== null) throw dt = u, n;
      Zt = 1, pi(
        t,
        Ql(e, t.current)
      ), dt = null;
      return;
    }
    l.flags & 32768 ? (ft || a === 1 ? t = !0 : vu || (vt & 536870912) !== 0 ? t = !1 : (Ie = t = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = nl.current, a !== null && a.tag === 13 && (a.flags |= 16384))), ym(l, t)) : Qi(l);
  }
  function Qi(t) {
    var l = t;
    do {
      if ((l.flags & 32768) !== 0) {
        ym(
          l,
          Ie
        );
        return;
      }
      t = l.return;
      var e = zh(
        l.alternate,
        l,
        Ue
      );
      if (e !== null) {
        dt = e;
        return;
      }
      if (l = l.sibling, l !== null) {
        dt = l;
        return;
      }
      dt = l = t;
    } while (l !== null);
    Zt === 0 && (Zt = 5);
  }
  function ym(t, l) {
    do {
      var e = Oh(t.alternate, t);
      if (e !== null) {
        e.flags &= 32767, dt = e;
        return;
      }
      if (e = t.return, e !== null && (e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null), !l && (t = t.sibling, t !== null)) {
        dt = t;
        return;
      }
      dt = t = e;
    } while (t !== null);
    Zt = 6, dt = null;
  }
  function gm(t, l, e, a, u, n, i, c, r, b, T, A) {
    t.cancelPendingCommit = null;
    do
      Zi();
    while (Lt !== 0);
    if ((zt & 6) !== 0) throw Error(s(327));
    if (l !== null) {
      if (l === t.current) throw Error(s(177));
      t === jt && (dt = jt = null, vt = 0), ja = l, ee = t, ye = e, If = u, im = a, Hh(
        t,
        l,
        e,
        i,
        c,
        r,
        A
      );
    }
  }
  function Hh(t, l, e, a, u, n, i) {
    var c = l.lanes | l.childLanes;
    if (kf = c, c |= jc, cv(
      t,
      e,
      c,
      a,
      u,
      n
    ), gu = null, (e & 335544064) === e ? (bu = sh(t), a = 10262) : (bu = null, a = 10256), (l.subtreeFlags & a) !== 0 || (l.flags & a) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, Xh(xn, function() {
      return us(), null;
    })) : (t.callbackNode = null, t.callbackPriority = 0), Ai = !1, a = (l.flags & 13878) !== 0, (l.subtreeFlags & 13878) !== 0 || a) {
      a = L.T, L.T = null, u = F.p, F.p = 2, n = zt, zt |= 4;
      try {
        Mh(t, l, e);
      } finally {
        zt = n, F.p = u, L.T = a;
      }
    }
    Lt = 1, Ai ? yu = cy(
      i,
      t.containerInfo,
      bu,
      ls,
      es,
      qh,
      as,
      us,
      Bh
    ) : (ls(), es(), as());
  }
  function Bh(t) {
    if (Lt !== 0) {
      var l = ee.onRecoverableError;
      l(t, { componentStack: null });
    }
  }
  function qh() {
    Lt === 3 && (Lt = 0, Pd(ja, ee), Lt = 4);
  }
  function ls() {
    if (Lt === 1) {
      Lt = 0;
      var t = ee, l = ja, e = ye, a = (l.flags & 13878) !== 0;
      if ((l.subtreeFlags & 13878) !== 0 || a) {
        a = L.T, L.T = null;
        var u = F.p;
        F.p = 2;
        var n = zt;
        zt |= 4;
        try {
          rn = xi = !1, kd(l, t, e), e = ys;
          var i = $o(t.containerInfo), c = e.focusedElem, r = e.selectionRange;
          if (i !== c && c && c.ownerDocument && Jo(
            c.ownerDocument.documentElement,
            c
          )) {
            if (r !== null && Cc(c)) {
              var b = r.start, T = r.end;
              if (T === void 0 && (T = b), "selectionStart" in c)
                c.selectionStart = b, c.selectionEnd = Math.min(
                  T,
                  c.value.length
                );
              else {
                var A = c.ownerDocument || document, h = A && A.defaultView || window;
                if (h.getSelection) {
                  var p = h.getSelection(), R = c.textContent.length, Z = Math.min(r.start, R), et = r.end === void 0 ? Z : Math.min(r.end, R);
                  !p.extend && Z > et && (i = et, et = Z, Z = i);
                  var g = Ko(
                    c,
                    Z
                  ), d = Ko(
                    c,
                    et
                  );
                  if (g && d && (p.rangeCount !== 1 || p.anchorNode !== g.node || p.anchorOffset !== g.offset || p.focusNode !== d.node || p.focusOffset !== d.offset)) {
                    var S = A.createRange();
                    S.setStart(g.node, g.offset), p.removeAllRanges(), Z > et ? (p.addRange(S), p.extend(d.node, d.offset)) : (S.setEnd(d.node, d.offset), p.addRange(S));
                  }
                }
              }
            }
            for (A = [], p = c; p = p.parentNode; )
              p.nodeType === 1 && A.push({
                element: p,
                left: p.scrollLeft,
                top: p.scrollTop
              });
            for (typeof c.focus == "function" && c.focus(), c = 0; c < A.length; c++) {
              var M = A[c];
              M.element.scrollLeft = M.left, M.element.scrollTop = M.top;
            }
          }
          Cu = !!hs, ys = hs = null;
        } finally {
          zt = n, F.p = u, L.T = a;
        }
      }
      t.current = l, Lt = 2;
    }
  }
  function es() {
    if (Lt === 2) {
      Lt = 0;
      var t = ee, l = ja, e = (l.flags & 8772) !== 0;
      if ((l.subtreeFlags & 8772) !== 0 || e) {
        e = L.T, L.T = null;
        var a = F.p;
        F.p = 2;
        var u = zt;
        zt |= 4;
        try {
          wd(t, l.alternate, l);
        } finally {
          zt = u, F.p = a, L.T = e;
        }
      }
      Lt = 3;
    }
  }
  function as() {
    if (Lt === 4 || Lt === 3) {
      Lt = 0;
      var t = yu;
      yu = null, I0();
      var l = ee, e = ja, a = ye, u = im, n = (a & 335544064) === a ? 10262 : 10256;
      if ((e.subtreeFlags & n) !== 0 || (e.flags & n) !== 0 ? Lt = 5 : (Lt = 0, ja = ee = null, bm(l, l.pendingLanes)), n = l.pendingLanes, n === 0 && (ta = null), rc(a), e = e.stateNode, Cl && typeof Cl.onCommitFiberRoot == "function")
        try {
          Cl.onCommitFiberRoot(
            Ru,
            e,
            void 0,
            (e.current.flags & 128) === 128
          );
        } catch {
        }
      if (u !== null) {
        e = L.T, n = F.p, F.p = 2, L.T = null;
        try {
          for (var i = l.onRecoverableError, c = 0; c < u.length; c++) {
            var r = u[c];
            i(r.value, {
              componentStack: r.stack
            });
          }
        } finally {
          L.T = e, F.p = n;
        }
      }
      if (u = gu, i = bu, bu = null, u !== null && (gu = null, i === null && (i = []), t !== null))
        for (r = 0; r < u.length; r++)
          e = (0, u[r])(
            i
          ), e !== void 0 && t.finished.finally(e);
      (ye & 3) !== 0 && Zi(), ge(l), n = l.pendingLanes, (a & 261930) !== 0 && (n & 42) !== 0 ? l === Gi ? hn++ : (hn = 0, Gi = l) : (hn = 0, Gi = null), yn(0);
    }
  }
  function bm(t, l) {
    (t.pooledCacheLanes &= l) === 0 && (l = t.pooledCache, l != null && (t.pooledCache = null, Fu(l)));
  }
  function Zi() {
    return yu !== null && (yu.skipTransition(), yu = null), ls(), es(), as(), us();
  }
  function us() {
    if (Lt !== 5) return !1;
    var t = ee, l = kf;
    kf = 0;
    var e = rc(ye), a = L.T, u = F.p;
    try {
      F.p = 32 > e ? 32 : e, L.T = null, e = If, If = null;
      var n = ee, i = ye;
      if (Lt = 0, ja = ee = null, ye = 0, (zt & 6) !== 0) throw Error(s(331));
      var c = zt;
      if (zt |= 4, am(n.current), tm(
        n,
        n.current,
        i,
        e
      ), zt = c, yn(0, !1), Cl && typeof Cl.onPostCommitFiberRoot == "function")
        try {
          Cl.onPostCommitFiberRoot(Ru, n);
        } catch {
        }
      return !0;
    } finally {
      F.p = u, L.T = a, bm(t, l);
    }
  }
  function Sm(t, l, e) {
    l = Ql(e, l), l = _f(t.stateNode, l, 2), t = Ke(t, l, 2), t !== null && (Hu(t, 2), ge(t));
  }
  function Dt(t, l, e) {
    if (t.tag === 3)
      Sm(t, t, e);
    else
      for (; l !== null; ) {
        if (l.tag === 3) {
          Sm(
            l,
            t,
            e
          );
          break;
        } else if (l.tag === 1) {
          var a = l.stateNode;
          if (typeof l.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (ta === null || !ta.has(a))) {
            t = Ql(e, t), e = hd(2), a = Ke(l, e, 2), a !== null && (yd(
              e,
              a,
              l,
              t
            ), Hu(a, 2), ge(a));
            break;
          }
        }
        l = l.return;
      }
  }
  function ns(t, l, e) {
    var a = t.pingCache;
    if (a === null) {
      a = t.pingCache = new Dh();
      var u = /* @__PURE__ */ new Set();
      a.set(l, u);
    } else
      u = a.get(l), u === void 0 && (u = /* @__PURE__ */ new Set(), a.set(l, u));
    u.has(e) || (Ff = !0, u.add(e), t = Yh.bind(null, t, l, e), l.then(t, t));
  }
  function Yh(t, l, e) {
    var a = t.pingCache;
    a !== null && a.delete(l), t.pingedLanes |= t.suspendedLanes & e, t.warmLanes &= ~e, jt === t && (vt & e) === e && ((Zt === 4 || Zt === 3 && (vt & 62914560) === vt && 300 > Al() - Bi) && (zt & 2) === 0 ? pu(t, 0) : Hi |= e, hu === vt && (hu = 0)), ge(t);
  }
  function pm(t, l) {
    l === 0 && (l = uo()), t = ba(t, l), t !== null && (Hu(t, l), ge(t));
  }
  function Gh(t) {
    var l = t.memoizedState, e = 0;
    l !== null && (e = l.retryLane), pm(t, e);
  }
  function Lh(t, l) {
    var e = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var a = t.stateNode, u = t.memoizedState;
        u !== null && (e = u.retryLane);
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
    a !== null && a.delete(l), pm(t, e);
  }
  function Xh(t, l) {
    return da(t, l);
  }
  var Tu = null, Eu = null, is = !1, Vi = !1, cs = !1, ea = 0;
  function ge(t) {
    t !== Eu && t.next === null && (Eu === null ? Tu = Eu = t : Eu = Eu.next = t), Vi = !0, is || (is = !0, Zh());
  }
  function yn(t, l) {
    if (!cs && Vi) {
      cs = !0;
      do
        for (var e = !1, a = Tu; a !== null; ) {
          if (t !== 0) {
            var u = a.pendingLanes;
            if (u === 0) var n = 0;
            else {
              var i = a.suspendedLanes, c = a.pingedLanes;
              n = (1 << 31 - Dl(42 | t) + 1) - 1, n &= u & ~(i & ~c), n = n & 201326741 ? n & 201326741 | 1 : n ? n | 2 : 0;
            }
            n !== 0 && (e = !0, Nm(a, n));
          } else
            n = vt, n = Hn(
              a,
              a === jt ? n : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (n & 3) === 0 || ju(a, n) || (e = !0, Nm(a, n));
          a = a.next;
        }
      while (e);
      cs = !1;
    }
  }
  function Qh() {
    _m();
  }
  function _m() {
    Vi = is = !1;
    var t = 0;
    ea !== 0 && ty() && (t = ea);
    for (var l = Al(), e = null, a = Tu; a !== null; ) {
      var u = a.next, n = Tm(a, l);
      n === 0 ? (a.next = null, e === null ? Tu = u : e.next = u, u === null && (Eu = e)) : (e = a, (t !== 0 || (n & 3) !== 0) && (Vi = !0)), a = u;
    }
    Lt !== 0 && Lt !== 5 || yn(t), ea !== 0 && (ea = 0);
  }
  function Tm(t, l) {
    for (var e = t.suspendedLanes, a = t.pingedLanes, u = t.expirationTimes, n = t.pendingLanes & -62914561; 0 < n; ) {
      var i = 31 - Dl(n), c = 1 << i, r = u[i];
      r === -1 ? ((c & e) === 0 || (c & a) !== 0) && (u[i] = iv(c, l)) : r <= l && (t.expiredLanes |= c), n &= ~c;
    }
    if (l = jt, e = vt, e = Hn(
      t,
      t === l ? e : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a = t.callbackNode, e === 0 || t === l && (Ct === 2 || Ct === 9) || t.cancelPendingCommit !== null)
      return a !== null && a !== null && fc(a), t.callbackNode = null, t.callbackPriority = 0;
    if ((e & 3) === 0 || ju(t, e)) {
      if (l = e & -e, l === t.callbackPriority) return l;
      switch (a !== null && fc(a), rc(e)) {
        case 2:
        case 8:
          e = lo;
          break;
        case 32:
          e = xn;
          break;
        case 268435456:
          e = eo;
          break;
        default:
          e = xn;
      }
      return a = Em.bind(null, t), e = da(e, a), t.callbackPriority = l, t.callbackNode = e, l;
    }
    return a !== null && a !== null && fc(a), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function Em(t, l) {
    if (Lt !== 0 && Lt !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var e = t.callbackNode;
    if (Zi() && t.callbackNode !== e)
      return null;
    var a = vt;
    return a = Hn(
      t,
      t === jt ? a : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a === 0 ? null : (fm(t, a, l), Tm(t, Al()), t.callbackNode != null && t.callbackNode === e ? Em.bind(null, t) : null);
  }
  function Nm(t, l) {
    if (Zi()) return null;
    fm(t, l, !0);
  }
  function Zh() {
    ey(function() {
      (zt & 6) !== 0 ? da(
        to,
        Qh
      ) : _m();
    });
  }
  function fs() {
    if (ea === 0) {
      var t = Na;
      t === 0 && (t = Un, Un <<= 1, (Un & 261888) === 0 && (Un = 256)), ea = t;
    }
    return ea;
  }
  function zm(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : Ln(t);
  }
  function Vh(t, l, e, a, u) {
    if (l === "submit" && e && e.stateNode === u) {
      var n = zm(
        (u[_l] || null).action
      ), i = a.submitter;
      i && (l = (l = i[_l] || null) ? zm(l.formAction) : i.getAttribute("formAction"), l !== null && (n = l, i = null));
      var c = new Vn(
        "action",
        "action",
        null,
        a,
        u
      );
      t.push({
        event: c,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (a.defaultPrevented) {
                if (ea !== 0) {
                  var r = new FormData(u, i);
                  yf(
                    e,
                    {
                      pending: !0,
                      data: r,
                      method: u.method,
                      action: n
                    },
                    null,
                    r
                  );
                }
              } else
                typeof n == "function" && (c.preventDefault(), r = new FormData(u, i), yf(
                  e,
                  {
                    pending: !0,
                    data: r,
                    method: u.method,
                    action: n
                  },
                  n,
                  r
                ));
            },
            currentTarget: u
          }
        ]
      });
    }
  }
  for (var ss = 0; ss < Rc.length; ss++) {
    var os = Rc[ss], wh = os.toLowerCase(), Kh = os[0].toUpperCase() + os.slice(1);
    Il(
      wh,
      "on" + Kh
    );
  }
  Il(ko, "onAnimationEnd"), Il(Io, "onAnimationIteration"), Il(Po, "onAnimationStart"), Il("dblclick", "onDoubleClick"), Il("focusin", "onFocus"), Il("focusout", "onBlur"), Il(lh, "onTransitionRun"), Il(eh, "onTransitionStart"), Il(ah, "onTransitionCancel"), Il(tr, "onTransitionEnd"), wa("onMouseEnter", ["mouseout", "mouseover"]), wa("onMouseLeave", ["mouseout", "mouseover"]), wa("onPointerEnter", ["pointerout", "pointerover"]), wa("onPointerLeave", ["pointerout", "pointerover"]), ha(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), ha(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), ha("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), ha(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), ha(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), ha(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var gn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Jh = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(gn)
  );
  function Om(t, l) {
    l = (l & 4) !== 0;
    for (var e = 0; e < t.length; e++) {
      var a = t[e], u = a.event;
      a = a.listeners;
      t: {
        var n = void 0;
        if (l)
          for (var i = a.length - 1; 0 <= i; i--) {
            var c = a[i], r = c.instance, b = c.currentTarget;
            if (c = c.listener, r !== n && u.isPropagationStopped())
              break t;
            n = c, u.currentTarget = b;
            try {
              n(u);
            } catch (T) {
              Jn(T);
            }
            u.currentTarget = null, n = r;
          }
        else
          for (i = 0; i < a.length; i++) {
            if (c = a[i], r = c.instance, b = c.currentTarget, c = c.listener, r !== n && u.isPropagationStopped())
              break t;
            n = c, u.currentTarget = b;
            try {
              n(u);
            } catch (T) {
              Jn(T);
            }
            u.currentTarget = null, n = r;
          }
      }
    }
  }
  function mt(t, l) {
    var e = l[oo];
    e === void 0 && (e = l[oo] = /* @__PURE__ */ new Set());
    var a = t + "__bubble";
    e.has(a) || (Mm(l, t, 2, !1), e.add(a));
  }
  function rs(t, l, e) {
    var a = 0;
    l && (a |= 4), Mm(
      e,
      t,
      a,
      l
    );
  }
  var wi = "_reactListening" + Math.random().toString(36).slice(2);
  function ds(t) {
    if (!t[wi]) {
      t[wi] = !0, vo.forEach(function(e) {
        e !== "selectionchange" && (Jh.has(e) || rs(e, !1, t), rs(e, !0, t));
      });
      var l = t.nodeType === 9 ? t : t.ownerDocument;
      l === null || l[wi] || (l[wi] = !0, rs("selectionchange", !1, l));
    }
  }
  function Mm(t, l, e, a) {
    switch (y0(l)) {
      case 2:
        var u = Gy;
        break;
      case 8:
        u = Ly;
        break;
      default:
        u = Us;
    }
    e = u.bind(
      null,
      l,
      e,
      t
    ), u = void 0, !Sc || l !== "touchstart" && l !== "touchmove" && l !== "wheel" || (u = !0), a ? u !== void 0 ? t.addEventListener(l, e, {
      capture: !0,
      passive: u
    }) : t.addEventListener(l, e, !0) : u !== void 0 ? t.addEventListener(l, e, {
      passive: u
    }) : t.addEventListener(l, e, !1);
  }
  function ms(t, l, e, a, u) {
    var n = a;
    if ((l & 1) === 0 && (l & 2) === 0 && a !== null)
      t: for (; ; ) {
        if (a === null) return;
        var i = a.tag;
        if (i === 3 || i === 4) {
          var c = a.stateNode.containerInfo;
          if (c === u) break;
          if (i === 4)
            for (i = a.return; i !== null; ) {
              var r = i.tag;
              if ((r === 3 || r === 4) && i.stateNode.containerInfo === u)
                return;
              i = i.return;
            }
          for (; c !== null; ) {
            if (i = va(c), i === null) return;
            if (r = i.tag, r === 5 || r === 6 || r === 26 || r === 27) {
              a = n = i;
              continue t;
            }
            c = c.parentNode;
          }
        }
        a = a.return;
      }
    Mo(function() {
      var b = n, T = gc(e), A = [];
      t: {
        var h = lr.get(t);
        if (h !== void 0) {
          var p = Vn, R = t;
          switch (t) {
            case "keypress":
              if (Qn(e) === 0) break t;
            case "keydown":
            case "keyup":
              p = xv;
              break;
            case "focusin":
              R = "focus", p = Ec;
              break;
            case "focusout":
              R = "blur", p = Ec;
              break;
            case "beforeblur":
            case "afterblur":
              p = Ec;
              break;
            case "click":
              if (e.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              p = Do;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              p = Sv;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              p = Bv;
              break;
            case ko:
            case Io:
            case Po:
              p = Tv;
              break;
            case tr:
              p = Yv;
              break;
            case "scroll":
            case "scrollend":
              p = gv;
              break;
            case "wheel":
              p = Lv;
              break;
            case "copy":
            case "cut":
            case "paste":
              p = Nv;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              p = Uo;
              break;
            case "submit":
              p = jv;
              break;
            case "toggle":
            case "beforetoggle":
              p = Qv;
          }
          var Z = (l & 4) !== 0, et = !Z && (t === "scroll" || t === "scrollend"), g = Z ? h !== null ? h + "Capture" : null : h;
          Z = [];
          for (var d = b, S; d !== null; ) {
            var M = d;
            if (S = M.stateNode, M = M.tag, M !== 5 && M !== 26 && M !== 27 || S === null || g === null || (M = Yu(d, g), M != null && Z.push(
              bn(d, M, S)
            )), et) break;
            d = d.return;
          }
          0 < Z.length && (h = new p(
            h,
            R,
            null,
            e,
            T
          ), A.push({ event: h, listeners: Z }));
        }
      }
      if ((l & 7) === 0) {
        t: {
          if (p = t === "mouseover" || t === "pointerover", h = t === "mouseout" || t === "pointerout", p && e !== yc && (R = e.relatedTarget || e.fromElement) && (va(R) || R[Qa]))
            break t;
          (h || p) && (R = T.window === T ? T : (p = T.ownerDocument) ? p.defaultView || p.parentWindow : window, h ? (p = e.relatedTarget || e.toElement, h = b, p = p ? va(p) : null, p !== null && (et = y(p), Z = p.tag, p !== et || Z !== 5 && Z !== 27 && Z !== 6) && (p = null)) : (h = null, p = b), h !== p && (Z = Do, M = "onMouseLeave", g = "onMouseEnter", d = "mouse", (t === "pointerout" || t === "pointerover") && (Z = Uo, M = "onPointerLeave", g = "onPointerEnter", d = "pointer"), et = h == null ? R : qu(h), S = p == null ? R : qu(p), R = new Z(
            M,
            d + "leave",
            h,
            e,
            T
          ), R.target = et, R.relatedTarget = S, M = null, va(T) === b && (Z = new Z(
            g,
            d + "enter",
            p,
            e,
            T
          ), Z.target = S, Z.relatedTarget = et, M = Z), et = M, Z = h && p ? Xt(
            h,
            p,
            $h
          ) : null, h !== null && Am(
            A,
            R,
            h,
            Z,
            !1
          ), p !== null && et !== null && Am(
            A,
            et,
            p,
            Z,
            !0
          )));
        }
        t: {
          if (h = b ? qu(b) : window, p = h.nodeName && h.nodeName.toLowerCase(), p === "select" || p === "input" && h.type === "file")
            var Y = Lo;
          else if (Yo(h))
            if (Xo)
              Y = Iv;
            else {
              Y = Wv;
              var ht = Fv;
            }
          else
            p = h.nodeName, !p || p.toLowerCase() !== "input" || h.type !== "checkbox" && h.type !== "radio" ? b && hc(b.elementType) && (Y = Lo) : Y = kv;
          if (Y && (Y = Y(t, b))) {
            Go(
              A,
              Y,
              e,
              T
            );
            break t;
          }
          ht && ht(t, h, b);
        }
        switch (ht = b ? qu(b) : window, t) {
          case "focusin":
            (Yo(ht) || ht.contentEditable === "true") && (ka = ht, Dc = b, Ku = null);
            break;
          case "focusout":
            Ku = Dc = ka = null;
            break;
          case "mousedown":
            xc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            xc = !1, Fo(A, e, T);
            break;
          case "selectionchange":
            if (th) break;
          case "keydown":
          case "keyup":
            Fo(A, e, T);
        }
        var J;
        if (zc)
          t: {
            switch (t) {
              case "compositionstart":
                var W = "onCompositionStart";
                break t;
              case "compositionend":
                W = "onCompositionEnd";
                break t;
              case "compositionupdate":
                W = "onCompositionUpdate";
                break t;
            }
            W = void 0;
          }
        else
          Wa ? Bo(t, e) && (W = "onCompositionEnd") : t === "keydown" && e.keyCode === 229 && (W = "onCompositionStart");
        W && (Ro && e.locale !== "ko" && (Wa || W !== "onCompositionStart" ? W === "onCompositionEnd" && Wa && (J = Ao()) : (qe = T, pc = "value" in qe ? qe.value : qe.textContent, Wa = !0)), ht = Ki(b, W), 0 < ht.length && (W = new xo(
          W,
          t,
          null,
          e,
          T
        ), A.push({ event: W, listeners: ht }), J ? W.data = J : (J = qo(e), J !== null && (W.data = J)))), (J = Vv ? wv(t, e) : Kv(t, e)) && (W = Ki(b, "onBeforeInput"), 0 < W.length && (ht = new xo(
          "onBeforeInput",
          "beforeinput",
          null,
          e,
          T
        ), A.push({
          event: ht,
          listeners: W
        }), ht.data = J)), Vh(
          A,
          t,
          b,
          e,
          T
        );
      }
      Om(A, l);
    });
  }
  function bn(t, l, e) {
    return {
      instance: t,
      listener: l,
      currentTarget: e
    };
  }
  function Ki(t, l) {
    for (var e = l + "Capture", a = []; t !== null; ) {
      var u = t, n = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || n === null || (u = Yu(t, e), u != null && a.unshift(
        bn(t, u, n)
      ), u = Yu(t, l), u != null && a.push(
        bn(t, u, n)
      )), t.tag === 3) return a;
      t = t.return;
    }
    return [];
  }
  function $h(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function Am(t, l, e, a, u) {
    for (var n = l._reactName, i = []; e !== null && e !== a; ) {
      var c = e, r = c.alternate, b = c.stateNode;
      if (c = c.tag, r !== null && r === a) break;
      c !== 5 && c !== 26 && c !== 27 || b === null || (r = b, u ? (b = Yu(e, n), b != null && i.unshift(
        bn(e, b, r)
      )) : u || (b = Yu(e, n), b != null && i.push(
        bn(e, b, r)
      ))), e = e.return;
    }
    i.length !== 0 && t.push({ event: l, listeners: i });
  }
  var Fh = /\r\n?/g, Wh = /\u0000|\uFFFD/g;
  function Cm(t) {
    return (typeof t == "string" ? t : "" + t).replace(Fh, `
`).replace(Wh, "");
  }
  function Dm(t, l) {
    return l = Cm(l), Cm(t) === l;
  }
  function xt(t, l, e, a, u, n) {
    switch (e) {
      case "children":
        if (typeof a == "string")
          l === "body" || l === "textarea" && a === "" || Ja(t, a);
        else if (typeof a == "number" || typeof a == "bigint")
          l !== "body" && Ja(t, "" + a);
        else return;
        break;
      case "className":
        Gn(t, "class", a);
        break;
      case "tabIndex":
        Gn(t, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Gn(t, e, a);
        break;
      case "style":
        zo(t, a, n);
        return;
      case "data":
        if (l !== "object") {
          Gn(t, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (l !== "a" || e !== "href")) {
          t.removeAttribute(e);
          break;
        }
        if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
          t.removeAttribute(e);
          break;
        }
        a = Ln(a), t.setAttribute(e, a);
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          t.setAttribute(
            e,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof n == "function" && (e === "formAction" ? (l !== "input" && xt(t, l, "name", u.name, u, null), xt(
            t,
            l,
            "formEncType",
            u.formEncType,
            u,
            null
          ), xt(
            t,
            l,
            "formMethod",
            u.formMethod,
            u,
            null
          ), xt(
            t,
            l,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (xt(t, l, "encType", u.encType, u, null), xt(t, l, "method", u.method, u, null), xt(t, l, "target", u.target, u, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          t.removeAttribute(e);
          break;
        }
        a = Ln(a), t.setAttribute(e, a);
        break;
      case "onClick":
        a != null && (t.onclick = ce);
        return;
      case "onScroll":
        a != null && mt("scroll", t);
        return;
      case "onScrollEnd":
        a != null && mt("scrollend", t);
        return;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(s(61));
          if (e = a.__html, e != null) {
            if (u.children != null) throw Error(s(60));
            n?.__html !== e && (t.innerHTML = e);
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
        e = Ln(a), t.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          e
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
        a != null && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(e, a) : t.removeAttribute(e);
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
        a && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(e, "") : t.removeAttribute(e);
        break;
      case "capture":
      case "download":
        a === !0 ? t.setAttribute(e, "") : a !== !1 && a != null && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(e, a) : t.removeAttribute(e);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? t.setAttribute(e, a) : t.removeAttribute(e);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? t.removeAttribute(e) : t.setAttribute(e, a);
        break;
      case "popover":
        mt("beforetoggle", t), mt("toggle", t), Yn(t, "popover", a);
        break;
      case "xlinkActuate":
        pe(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        pe(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        pe(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        pe(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        pe(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        pe(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        pe(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        pe(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        pe(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        Yn(t, "is", a);
        break;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N")
          e = hv.get(e) || e, Yn(t, e, a);
        else return;
    }
    Tt = !0;
  }
  function vs(t, l, e, a, u, n) {
    switch (e) {
      case "style":
        zo(t, a, n);
        return;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(s(61));
          if (e = a.__html, e != null) {
            if (u.children != null) throw Error(s(60));
            n?.__html !== e && (t.innerHTML = e);
          }
        }
        break;
      case "children":
        if (typeof a == "string") Ja(t, a);
        else if (typeof a == "number" || typeof a == "bigint")
          Ja(t, "" + a);
        else return;
        break;
      case "onScroll":
        a != null && mt("scroll", t);
        return;
      case "onScrollEnd":
        a != null && mt("scrollend", t);
        return;
      case "onClick":
        a != null && (t.onclick = ce);
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
        if (!ho.hasOwnProperty(e))
          t: {
            if (e[0] === "o" && e[1] === "n" && (u = e.endsWith("Capture"), n = e.slice(2, u ? e.length - 7 : void 0), l = t[_l] || null, l = l != null ? l[e] : null, typeof l == "function" && t.removeEventListener(n, l, u), typeof a == "function")) {
              typeof l != "function" && l !== null && (e in t ? t[e] = null : t.hasAttribute(e) && t.removeAttribute(e)), t.addEventListener(n, a, u);
              break t;
            }
            Tt = !0, e in t ? t[e] = a : a === !0 ? t.setAttribute(e, "") : Yn(t, e, a);
          }
        return;
    }
    Tt = !0;
  }
  function fl(t, l, e) {
    switch (l) {
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
        mt("error", t), mt("load", t);
        var a = !1, u = !1, n;
        for (n in e)
          if (e.hasOwnProperty(n)) {
            var i = e[n];
            if (i != null)
              switch (n) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(s(137, l));
                default:
                  xt(t, l, n, i, e, null);
              }
          }
        u && xt(t, l, "srcSet", e.srcSet, e, null), a && xt(t, l, "src", e.src, e, null);
        return;
      case "input":
        mt("invalid", t);
        var c = n = i = u = null, r = null, b = null;
        for (a in e)
          if (e.hasOwnProperty(a)) {
            var T = e[a];
            if (T != null)
              switch (a) {
                case "name":
                  u = T;
                  break;
                case "type":
                  i = T;
                  break;
                case "checked":
                  r = T;
                  break;
                case "defaultChecked":
                  b = T;
                  break;
                case "value":
                  n = T;
                  break;
                case "defaultValue":
                  c = T;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (T != null)
                    throw Error(s(137, l));
                  break;
                default:
                  xt(t, l, a, T, e, null);
              }
          }
        _o(
          t,
          n,
          c,
          r,
          b,
          i,
          u,
          !1
        );
        return;
      case "select":
        mt("invalid", t), a = i = n = null;
        for (u in e)
          if (e.hasOwnProperty(u) && (c = e[u], c != null))
            switch (u) {
              case "value":
                n = c;
                break;
              case "defaultValue":
                i = c;
                break;
              case "multiple":
                a = c;
              default:
                xt(t, l, u, c, e, null);
            }
        l = n, e = i, t.multiple = !!a, l != null ? Ka(t, !!a, l, !1) : e != null && Ka(t, !!a, e, !0);
        return;
      case "textarea":
        mt("invalid", t), n = u = a = null;
        for (i in e)
          if (e.hasOwnProperty(i) && (c = e[i], c != null))
            switch (i) {
              case "value":
                a = c;
                break;
              case "defaultValue":
                u = c;
                break;
              case "children":
                n = c;
                break;
              case "dangerouslySetInnerHTML":
                if (c != null) throw Error(s(91));
                break;
              default:
                xt(t, l, i, c, e, null);
            }
        Eo(t, a, u, n);
        return;
      case "option":
        for (r in e)
          e.hasOwnProperty(r) && (a = e[r], a != null) && (r === "selected" ? t.selected = a && typeof a != "function" && typeof a != "symbol" : xt(t, l, r, a, e, null));
        return;
      case "dialog":
        mt("beforetoggle", t), mt("toggle", t), mt("cancel", t), mt("close", t);
        break;
      case "iframe":
      case "object":
        mt("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < gn.length; a++)
          mt(gn[a], t);
        break;
      case "image":
        mt("error", t), mt("load", t);
        break;
      case "details":
        mt("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        mt("error", t), mt("load", t);
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
        for (b in e)
          if (e.hasOwnProperty(b) && (a = e[b], a != null))
            switch (b) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(s(137, l));
              default:
                xt(t, l, b, a, e, null);
            }
        return;
      default:
        if (hc(l)) {
          for (T in e)
            e.hasOwnProperty(T) && (a = e[T], a !== void 0 && vs(
              t,
              l,
              T,
              a,
              e,
              void 0
            ));
          return;
        }
    }
    for (c in e)
      e.hasOwnProperty(c) && (a = e[c], a != null && xt(t, l, c, a, e, null));
  }
  var kh = {};
  function Ih(t, l, e, a) {
    switch (l) {
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
        var u = null, n = null, i = null, c = null, r = null, b = null, T = null;
        for (p in e) {
          var A = e[p];
          if (e.hasOwnProperty(p) && A != null)
            switch (p) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                r = A;
              default:
                a.hasOwnProperty(p) || xt(t, l, p, null, a, A);
            }
        }
        for (var h in a) {
          var p = a[h];
          if (A = e[h], a.hasOwnProperty(h) && (p != null || A != null))
            switch (h) {
              case "type":
                p !== A && (Tt = !0), n = p;
                break;
              case "name":
                p !== A && (Tt = !0), u = p;
                break;
              case "checked":
                p !== A && (Tt = !0), b = p;
                break;
              case "defaultChecked":
                p !== A && (Tt = !0), T = p;
                break;
              case "value":
                p !== A && (Tt = !0), i = p;
                break;
              case "defaultValue":
                p !== A && (Tt = !0), c = p;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (p != null)
                  throw Error(s(137, l));
                break;
              default:
                p !== A && xt(
                  t,
                  l,
                  h,
                  p,
                  a,
                  A
                );
            }
        }
        mc(
          t,
          i,
          c,
          r,
          b,
          T,
          n,
          u
        );
        return;
      case "select":
        p = i = c = h = null;
        for (n in e)
          if (r = e[n], e.hasOwnProperty(n) && r != null)
            switch (n) {
              case "value":
                break;
              case "multiple":
                p = r;
              default:
                a.hasOwnProperty(n) || xt(
                  t,
                  l,
                  n,
                  null,
                  a,
                  r
                );
            }
        for (u in a)
          if (n = a[u], r = e[u], a.hasOwnProperty(u) && (n != null || r != null))
            switch (u) {
              case "value":
                n !== r && (Tt = !0), h = n;
                break;
              case "defaultValue":
                n !== r && (Tt = !0), c = n;
                break;
              case "multiple":
                n !== r && (Tt = !0), i = n;
              default:
                n !== r && xt(
                  t,
                  l,
                  u,
                  n,
                  a,
                  r
                );
            }
        l = c, e = i, a = p, h != null ? Ka(t, !!e, h, !1) : !!a != !!e && (l != null ? Ka(t, !!e, l, !0) : Ka(t, !!e, e ? [] : "", !1));
        return;
      case "textarea":
        p = h = null;
        for (c in e)
          if (u = e[c], e.hasOwnProperty(c) && u != null && !a.hasOwnProperty(c))
            switch (c) {
              case "value":
                break;
              case "children":
                break;
              default:
                xt(t, l, c, null, a, u);
            }
        for (i in a)
          if (u = a[i], n = e[i], a.hasOwnProperty(i) && (u != null || n != null))
            switch (i) {
              case "value":
                u !== n && (Tt = !0), h = u;
                break;
              case "defaultValue":
                u !== n && (Tt = !0), p = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(s(91));
                break;
              default:
                u !== n && xt(t, l, i, u, a, n);
            }
        To(t, h, p);
        return;
      case "option":
        for (var R in e)
          h = e[R], e.hasOwnProperty(R) && h != null && !a.hasOwnProperty(R) && (R === "selected" ? t.selected = !1 : xt(
            t,
            l,
            R,
            null,
            a,
            h
          ));
        for (r in a)
          h = a[r], p = e[r], a.hasOwnProperty(r) && h !== p && (h != null || p != null) && (r === "selected" ? (h !== p && (Tt = !0), t.selected = h && typeof h != "function" && typeof h != "symbol") : xt(
            t,
            l,
            r,
            h,
            a,
            p
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
        for (var Z in e)
          h = e[Z], e.hasOwnProperty(Z) && h != null && !a.hasOwnProperty(Z) && xt(t, l, Z, null, a, h);
        for (b in a)
          if (h = a[b], p = e[b], a.hasOwnProperty(b) && h !== p && (h != null || p != null))
            switch (b) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (h != null)
                  throw Error(s(137, l));
                break;
              default:
                xt(
                  t,
                  l,
                  b,
                  h,
                  a,
                  p
                );
            }
        return;
      default:
        if (hc(l)) {
          for (var et in e)
            h = e[et], e.hasOwnProperty(et) && h !== void 0 && !a.hasOwnProperty(et) && vs(
              t,
              l,
              et,
              void 0,
              a,
              h
            );
          for (T in a)
            h = a[T], p = e[T], !a.hasOwnProperty(T) || h === p || h === void 0 && p === void 0 || vs(
              t,
              l,
              T,
              h,
              a,
              p
            );
          return;
        }
    }
    for (var g in e)
      h = e[g], e.hasOwnProperty(g) && h != null && !a.hasOwnProperty(g) && xt(t, l, g, null, a, h);
    for (A in a)
      h = a[A], p = e[A], !a.hasOwnProperty(A) || h === p || h == null && p == null || xt(t, l, A, h, a, p);
  }
  function xm(t) {
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
  function Ph() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, l = 0, e = performance.getEntriesByType("resource"), a = 0; a < e.length; a++) {
        var u = e[a], n = u.transferSize, i = u.initiatorType, c = u.duration;
        if (n && c && xm(i)) {
          for (i = 0, c = u.responseEnd, a += 1; a < e.length; a++) {
            var r = e[a], b = r.startTime;
            if (b > c) break;
            var T = r.transferSize, A = r.initiatorType;
            T && xm(A) && (r = r.responseEnd, i += T * (r < c ? 1 : (c - b) / (r - b)));
          }
          if (--a, l += 8 * (n + i) / (u.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return l / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var hs = null, ys = null;
  function Sn(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function Um(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Rm(t, l) {
    if (t === 0)
      switch (l) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && l === "foreignObject" ? 0 : t;
  }
  function jm(t, l, e, a) {
    return e = Sn(
      e
    ).createElement(t), e[al] = a, e[_l] = l, fl(e, t, l), Pt(e), e;
  }
  function gs(t, l) {
    return t === "textarea" || t === "noscript" || typeof l.children == "string" || typeof l.children == "number" || typeof l.children == "bigint" || typeof l.dangerouslySetInnerHTML == "object" && l.dangerouslySetInnerHTML !== null && l.dangerouslySetInnerHTML.__html != null;
  }
  var bs = null;
  function ty() {
    var t = window.event;
    return t && t.type === "popstate" ? t === bs ? !1 : (bs = t, !0) : (bs = null, !1);
  }
  var Ss = typeof setTimeout == "function" ? setTimeout : void 0, ly = typeof clearTimeout == "function" ? clearTimeout : void 0, Hm = typeof Promise == "function" ? Promise : void 0, Bm = typeof requestAnimationFrame == "function" ? requestAnimationFrame : Ss, ey = typeof queueMicrotask == "function" ? queueMicrotask : typeof Hm < "u" ? function(t) {
    return Hm.resolve(null).then(t).catch(ay);
  } : Ss;
  function ay(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function aa(t) {
    return t === "head";
  }
  function qm(t, l) {
    var e = l, a = 0;
    do {
      var u = e.nextSibling;
      if (t.removeChild(e), u && u.nodeType === 8)
        if (e = u.data, e === "/$" || e === "/&") {
          if (a === 0) {
            t.removeChild(u), Du(l);
            return;
          }
          a--;
        } else if (e === "$" || e === "$?" || e === "$~" || e === "$!" || e === "&")
          a++;
        else if (e === "html")
          Ms(
            t.ownerDocument.documentElement
          );
        else if (e === "head") {
          e = t.ownerDocument.head, Ms(e);
          for (var n = e.firstChild; n; ) {
            var i = n.nextSibling, c = n.nodeName;
            n[Bu] || c === "SCRIPT" || c === "STYLE" || c === "LINK" && n.rel.toLowerCase() === "stylesheet" || e.removeChild(n), n = i;
          }
        } else
          e === "body" && Ms(t.ownerDocument.body);
      e = u;
    } while (e);
    Du(l);
  }
  function Ym(t, l) {
    var e = t;
    t = 0;
    do {
      var a = e.nextSibling;
      if (e.nodeType === 1 ? l ? (e._stashedDisplay = e.style.display, e.style.display = "none") : (e.style.display = e._stashedDisplay || "", e.getAttribute("style") === "" && e.removeAttribute("style")) : e.nodeType === 3 && (l ? (e._stashedText = e.nodeValue, e.nodeValue = "") : e.nodeValue = e._stashedText || ""), a && a.nodeType === 8)
        if (e = a.data, e === "/$") {
          if (t === 0) break;
          t--;
        } else
          e !== "$" && e !== "$?" && e !== "$~" && e !== "$!" || t++;
      e = a;
    } while (e);
  }
  function Gm(t, l, e) {
    if (l = CSS.escape(l) !== l ? "r-" + btoa(l).replace(/=/g, "") : l, t.style.viewTransitionName = l, e != null && (t.style.viewTransitionClass = e), e = getComputedStyle(t), e.display === "inline") {
      if (l = t.getClientRects(), l.length === 1) var a = 1;
      else
        for (var u = a = 0; u < l.length; u++) {
          var n = l[u];
          0 < n.width && 0 < n.height && a++;
        }
      a === 1 && (t = t.style, t.display = l.length === 1 ? "inline-block" : "block", t.marginTop = "-" + e.paddingTop, t.marginBottom = "-" + e.paddingBottom);
    }
  }
  function Lm(t, l) {
    t = t.style, l = l.style;
    var e = l != null ? l.hasOwnProperty("viewTransitionName") ? l.viewTransitionName : l.hasOwnProperty("view-transition-name") ? l["view-transition-name"] : null : null;
    t.viewTransitionName = e == null || typeof e == "boolean" ? "" : ("" + e).trim(), e = l != null ? l.hasOwnProperty("viewTransitionClass") ? l.viewTransitionClass : l.hasOwnProperty("view-transition-class") ? l["view-transition-class"] : null : null, t.viewTransitionClass = e == null || typeof e == "boolean" ? "" : ("" + e).trim(), t.display === "inline-block" && (l == null ? t.display = t.margin = "" : (e = l.display, t.display = e == null || typeof e == "boolean" ? "" : e, e = l.margin, e != null ? t.margin = e : (e = l.hasOwnProperty("marginTop") ? l.marginTop : l["margin-top"], t.marginTop = e == null || typeof e == "boolean" ? "" : e, l = l.hasOwnProperty("marginBottom") ? l.marginBottom : l["margin-bottom"], t.marginBottom = l == null || typeof l == "boolean" ? "" : l)));
  }
  function uy(t, l, e) {
    return e = e.ownerDocument.defaultView, {
      rect: t,
      abs: l.position === "absolute" || l.position === "fixed",
      clip: l.clipPath !== "none" || l.overflow !== "visible" || l.filter !== "none" || l.mask !== "none" || l.mask !== "none" || l.borderRadius !== "0px",
      view: 0 <= t.bottom && 0 <= t.right && t.top <= e.innerHeight && t.left <= e.innerWidth
    };
  }
  function ps(t) {
    var l = t.getBoundingClientRect(), e = getComputedStyle(t);
    return uy(l, e, t);
  }
  function ny(t) {
    return t.documentElement.clientHeight;
  }
  function iy(t) {
    this.addEventListener("load", t), this.addEventListener("error", t);
  }
  function cy(t, l, e, a, u, n, i, c, r) {
    var b = l.nodeType === 9 ? l : l.ownerDocument;
    try {
      var T = b.startViewTransition({
        update: function() {
          var h = b.defaultView, p = h.navigation && h.navigation.transition, R = b.fonts.status;
          a();
          var Z = [];
          if (R === "loaded" && (ny(b), b.fonts.status === "loading" && Z.push(b.fonts.ready)), R = Z.length, t !== null)
            for (var et = t.suspenseyImages, g = 0, d = 0; d < et.length; d++) {
              var S = et[d];
              if (!S.complete) {
                var M = S.getBoundingClientRect();
                if (0 < M.bottom && 0 < M.right && M.top < h.innerHeight && M.left < h.innerWidth) {
                  if (g += c0(S), g > Fi) {
                    Z.length = R;
                    break;
                  }
                  S = new Promise(
                    iy.bind(S)
                  ), Z.push(S);
                }
              }
            }
          if (0 < Z.length)
            return h = Promise.race([
              Promise.all(Z),
              new Promise(function(Y) {
                return setTimeout(Y, 500);
              })
            ]).then(u, u), (p ? Promise.allSettled([p.finished, h]) : h).then(n, n);
          if (u(), p)
            return p.finished.then(
              n,
              n
            );
          n();
        },
        types: e
      });
      b.__reactViewTransition = T;
      var A = [];
      return T.ready.then(
        function() {
          for (var h = b.documentElement.getAnimations({
            subtree: !0
          }), p = 0; p < h.length; p++) {
            var R = h[p], Z = R.effect, et = Z.pseudoElement;
            if (et != null && et.startsWith("::view-transition")) {
              A.push(R), R = Z.getKeyframes();
              for (var g = et = void 0, d = !0, S = 0; S < R.length; S++) {
                var M = R[S], Y = M.width;
                if (et === void 0) et = Y;
                else if (et !== Y) {
                  d = !1;
                  break;
                }
                if (Y = M.height, g === void 0) g = Y;
                else if (g !== Y) {
                  d = !1;
                  break;
                }
                delete M.width, delete M.height, M.transform === "none" && delete M.transform;
              }
              d && et !== void 0 && g !== void 0 && (Z.setKeyframes(R), d = getComputedStyle(
                Z.target,
                Z.pseudoElement
              ), d.width !== et || d.height !== g) && (d = R[0], d.width = et, d.height = g, d = R[R.length - 1], d.width = et, d.height = g, Z.setKeyframes(R));
            }
          }
          i();
        },
        function(h) {
          b.__reactViewTransition === T && (b.__reactViewTransition = null);
          try {
            typeof h == "object" && h !== null && h.name === "InvalidStateError" && (h.message === "View transition was skipped because document visibility state is hidden." || h.message === "Skipping view transition because document visibility state has become hidden." || h.message === "Skipping view transition because viewport size changed." || h.message === "Transition was aborted because of invalid state") && (h = null), h !== null && r(h);
          } finally {
            a(), u(), i();
          }
        }
      ), T.finished.finally(function() {
        for (var h = 0; h < A.length; h++)
          A[h].cancel();
        b.__reactViewTransition === T && (b.__reactViewTransition = null), c();
      }), T;
    } catch {
      return a(), u(), i(), null;
    }
  }
  function Ha(t, l) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + t + "(" + l + ")";
  }
  Ha.prototype.animate = function(t, l) {
    return l = typeof l == "number" ? { duration: l } : k({}, l), l.pseudoElement = this._selector, this._scope.animate(t, l);
  }, Ha.prototype.getAnimations = function() {
    for (var t = this._scope, l = this._selector, e = t.getAnimations({ subtree: !0 }), a = [], u = 0; u < e.length; u++) {
      var n = e[u].effect;
      n !== null && n.target === t && n.pseudoElement === l && a.push(e[u]);
    }
    return a;
  }, Ha.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function Xm(t) {
    return {
      name: t,
      group: new Ha("group", t),
      imagePair: new Ha("image-pair", t),
      old: new Ha("old", t),
      new: new Ha("new", t)
    };
  }
  function Yl(t) {
    this._fragmentFiber = t, this._observers = this._eventListeners = null;
  }
  Yl.prototype.addEventListener = function(t, l, e) {
    var a = null, u = null;
    if (!(e != null && typeof e != "boolean" && (a = e.signal || null, a !== null && a.aborted))) {
      this._eventListeners === null && (this._eventListeners = []);
      var n = this._eventListeners;
      if (Zm(n, t, l, e) === -1) {
        var i = this, c = l;
        e != null && typeof e != "boolean" && e.once === !0 && (c = function(r) {
          i.removeEventListener(
            t,
            l,
            e
          ), typeof l == "function" ? l.call(this, r) : l.handleEvent(r);
        }), a !== null && (u = i.removeEventListener.bind(
          i,
          t,
          l,
          e
        ), a.addEventListener("abort", u, { once: !0 }), u = a.removeEventListener.bind(a, "abort", u)), a = Nu(e), n.push({
          type: t,
          listener: l,
          optionsOrUseCapture: e,
          attachedListener: c,
          cleanup: u
        }), _(
          this._fragmentFiber.child,
          !1,
          fy,
          t,
          c,
          a
        );
      }
      this._eventListeners = n;
    }
  };
  function fy(t, l, e, a) {
    return at(t).addEventListener(
      l,
      e,
      a
    ), !1;
  }
  Yl.prototype.removeEventListener = function(t, l, e) {
    var a = this._eventListeners;
    if (a !== null && (l = Zm(
      a,
      t,
      l,
      e
    ), l !== -1)) {
      var u = a[l];
      e = u.attachedListener;
      var n = u.cleanup;
      u = Nu(u.optionsOrUseCapture), _(
        this._fragmentFiber.child,
        !1,
        sy,
        t,
        e,
        u
      ), a.splice(l, 1), n !== null && n();
    }
  };
  function sy(t, l, e, a) {
    return at(t).removeEventListener(
      l,
      e,
      a
    ), !1;
  }
  function Nu(t) {
    return t != null && typeof t != "boolean" && (t.once === !0 || t.signal instanceof AbortSignal) ? { capture: t.capture, passive: t.passive } : t;
  }
  function Qm(t) {
    return t == null ? "c=0" : typeof t == "boolean" ? "c=" + (t ? "1" : "0") : "c=" + (t.capture ? "1" : "0");
  }
  function Zm(t, l, e, a) {
    if (t.length === 0) return -1;
    a = Qm(a);
    for (var u = 0; u < t.length; u++) {
      var n = t[u];
      if (n.type === l && n.listener === e && Qm(n.optionsOrUseCapture) === a)
        return u;
    }
    return -1;
  }
  Yl.prototype.dispatchEvent = function(t) {
    var l = U(
      this._fragmentFiber
    );
    if (l === null) return !0;
    l = at(l);
    var e = this._eventListeners;
    if (e !== null && 0 < e.length || !t.bubbles) {
      var a = l.nodeType === 9 ? l.createComment("") : document.createTextNode("");
      if (e)
        for (var u = 0; u < e.length; u++) {
          var n = e[u];
          a.addEventListener(
            n.type,
            n.attachedListener,
            Nu(n.optionsOrUseCapture)
          );
        }
      if (l.appendChild(a), t = a.dispatchEvent(t), e)
        for (u = 0; u < e.length; u++)
          n = e[u], a.removeEventListener(
            n.type,
            n.attachedListener,
            Nu(n.optionsOrUseCapture)
          );
      return l.removeChild(a), t;
    }
    return l.dispatchEvent(t);
  }, Yl.prototype.focus = function(t) {
    _(
      this._fragmentFiber.child,
      !0,
      Vm,
      t,
      void 0,
      void 0
    );
  };
  function Vm(t, l) {
    return t.tag === 6 ? !1 : (t = at(t), _y(t, l));
  }
  Yl.prototype.focusLast = function(t) {
    var l = [];
    _(
      this._fragmentFiber.child,
      !0,
      _s,
      l,
      void 0,
      void 0
    );
    for (var e = l.length - 1; 0 <= e && !Vm(l[e], t); e--) ;
  };
  function _s(t, l) {
    return l.push(t), !1;
  }
  Yl.prototype.blur = function() {
    var t = U(
      this._fragmentFiber
    );
    t !== null && (t = at(t), t = Sn(t).activeElement, t !== null && _(
      this._fragmentFiber.child,
      !1,
      oy,
      t,
      void 0,
      void 0
    ));
  };
  function oy(t, l) {
    return t.tag === 6 ? !1 : (t = at(t), t === l || t.contains(l) ? (l.blur(), !0) : !1);
  }
  Yl.prototype.observeUsing = function(t) {
    this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(t), _(
      this._fragmentFiber.child,
      !1,
      ry,
      t,
      void 0,
      void 0
    );
  };
  function ry(t, l) {
    return t.tag === 6 || (t = at(t), l.observe(t)), !1;
  }
  Yl.prototype.unobserveUsing = function(t) {
    var l = this._observers;
    if (l !== null && l.has(t)) {
      l.delete(t), _(
        this._fragmentFiber.child,
        !1,
        dy,
        t,
        void 0,
        void 0
      );
      for (var e = l = 0; e < ae.length; e++) {
        var a = ae[e];
        a.fragmentInstance === this && a.observer === t ? t.unobserve(a.instance) : ae[l++] = a;
      }
      ae.length = l;
    }
  };
  function dy(t, l) {
    return t.tag === 6 || (t = at(t), l.unobserve(t)), !1;
  }
  var ae = [], Ts = !1;
  function my(t, l, e) {
    ae.push({
      fragmentInstance: t,
      observer: l,
      instance: e
    }), Ts || (Ts = !0, Ty(function() {
      Ts = !1;
      var a = ae;
      ae = [];
      for (var u = 0; u < a.length; u++) {
        var n = a[u];
        n.observer.unobserve(n.instance);
      }
    }));
  }
  Yl.prototype.getClientRects = function() {
    var t = [];
    return _(
      this._fragmentFiber.child,
      !1,
      vy,
      t,
      void 0,
      void 0
    ), t;
  };
  function vy(t, l) {
    if (t.tag === 6) {
      t = t.stateNode;
      var e = t.ownerDocument.createRange();
      e.selectNodeContents(t), l.push.apply(l, e.getClientRects());
    } else
      t = at(t), l.push.apply(l, t.getClientRects());
    return !1;
  }
  Yl.prototype.getRootNode = function(t) {
    var l = U(
      this._fragmentFiber
    );
    return l === null ? this : at(l).getRootNode(t);
  }, Yl.prototype.compareDocumentPosition = function(t) {
    var l = U(
      this._fragmentFiber
    );
    if (l === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var e = [];
    _(
      this._fragmentFiber.child,
      !1,
      _s,
      e,
      void 0,
      void 0
    );
    var a = at(l);
    if (e.length === 0) {
      if (e = a, Q(this._fragmentFiber)) {
        t: {
          for (l = this._fragmentFiber.return; l !== null; ) {
            if (l.tag === 4) {
              l = l.stateNode.containerInfo;
              break t;
            }
            if (l.tag === 3 || l.tag === 5 || l.tag === 27)
              break;
            l = l.return;
          }
          l = null;
        }
        l != null && (e = l);
      }
      l = this._fragmentFiber;
      var u = a = e.compareDocumentPosition(t);
      return e === t ? u = Node.DOCUMENT_POSITION_CONTAINS : a & Node.DOCUMENT_POSITION_CONTAINED_BY && (e = nt(l)[1], e === null ? u = Node.DOCUMENT_POSITION_PRECEDING : (t = at(e).compareDocumentPosition(
        t
      ), u = t === 0 || t & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), u |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    l = at(e[0]), u = at(e[e.length - 1]);
    var n = Q(this._fragmentFiber) ? l.parentElement : a;
    if (n == null)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    a = n.compareDocumentPosition(l) & Node.DOCUMENT_POSITION_CONTAINED_BY, n = n.compareDocumentPosition(u) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var i = l.compareDocumentPosition(t), c = u.compareDocumentPosition(t), r = i & Node.DOCUMENT_POSITION_CONTAINED_BY || c & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return c = a && n && i & Node.DOCUMENT_POSITION_FOLLOWING && c & Node.DOCUMENT_POSITION_PRECEDING, l = a && l === t || n && u === t || r || c ? Node.DOCUMENT_POSITION_CONTAINED_BY : !a && l === t || !n && u === t ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : i, l & Node.DOCUMENT_POSITION_DISCONNECTED || l & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || hy(
      l,
      this._fragmentFiber,
      e[0],
      e[e.length - 1],
      t
    ) ? l : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function hy(t, l, e, a, u) {
    var n = va(u);
    if (t & Node.DOCUMENT_POSITION_CONTAINED_BY) {
      if (e = !!n)
        t: {
          for (; n !== null; ) {
            if (n.tag === 7 && (n === l || n.alternate === l)) {
              e = !0;
              break t;
            }
            n = n.return;
          }
          e = !1;
        }
      return e;
    }
    if (t & Node.DOCUMENT_POSITION_CONTAINS) {
      if (n === null)
        return n = u.ownerDocument, u === n || u === n.documentElement || u === n.body;
      t: {
        for (n = l, l = U(l); n !== null; ) {
          if (!(n.tag !== 5 && n.tag !== 3 && n.tag !== 27 || n !== l && n.alternate !== l)) {
            n = !0;
            break t;
          }
          n = n.return;
        }
        n = !1;
      }
      return n;
    }
    return t & Node.DOCUMENT_POSITION_PRECEDING ? ((l = !!n) && !(l = n === e) && (l = Xt(
      e,
      n,
      Yt
    ), l === null ? l = !1 : (_(
      l,
      !0,
      Et,
      n,
      e
    ), n = Ut, Ut = null, l = n !== null)), l) : t & Node.DOCUMENT_POSITION_FOLLOWING ? ((l = !!n) && !(l = n === a) && (l = Xt(
      a,
      n,
      Yt
    ), l === null ? l = !1 : (_(
      l,
      !0,
      Ht,
      n,
      a
    ), n = Ut, Ot = Ut = null, l = n !== null)), l) : !1;
  }
  function wm(t, l) {
    var e = t.ownerDocument.createRange();
    e.selectNodeContents(t), t = e.getBoundingClientRect(), window.scrollTo(
      window.scrollX + t.left,
      l ? window.scrollY + t.top : window.scrollY + t.bottom - window.innerHeight
    );
  }
  Yl.prototype.scrollIntoView = function(t) {
    if (typeof t == "object") throw Error(s(566));
    var l = [];
    _(
      this._fragmentFiber.child,
      !1,
      _s,
      l,
      void 0,
      void 0
    );
    var e = t !== !1;
    if (l.length === 0) {
      var a = nt(
        this._fragmentFiber
      );
      if (a = e ? a[1] || a[0] || U(this._fragmentFiber) : a[0] || a[1], a === null) return;
      if (a.tag === 6) {
        t = at(a), wm(t, e);
        return;
      }
      if (a = at(a), a.nodeType !== 9) {
        if (a.nodeType === 11) {
          e = "host" in a ? a.host : null, e !== null && e.scrollIntoView(t);
          return;
        }
        a.scrollIntoView(t);
      }
    }
    for (a = e ? l.length - 1 : 0; a !== (e ? -1 : l.length); ) {
      var u = l[a];
      u.tag === 6 ? (u = at(u), wm(u, e)) : at(u).scrollIntoView(t), a += e ? -1 : 1;
    }
  };
  function yy(t, l) {
    return t = at(t), Km(t, l), !1;
  }
  function Km(t, l) {
    t.reactFragments == null && (t.reactFragments = /* @__PURE__ */ new Set()), t.reactFragments.add(l);
  }
  function Jm(t, l) {
    var e = l._eventListeners;
    if (e !== null)
      for (var a = 0; a < e.length; a++) {
        var u = e[a];
        t.addEventListener(
          u.type,
          u.attachedListener,
          Nu(u.optionsOrUseCapture)
        );
      }
    t.nodeType !== 3 && (e = l._observers, e !== null && e.forEach(function(n) {
      for (var i = 0, c = 0; c < ae.length; c++) {
        var r = ae[c];
        (r.fragmentInstance !== l || r.observer !== n || r.instance !== t) && (ae[i++] = r);
      }
      ae.length = i, n.observe(t);
    }), Km(t, l));
  }
  function gy(t, l) {
    var e = l._eventListeners;
    if (e !== null)
      for (var a = 0; a < e.length; a++) {
        var u = e[a];
        t.removeEventListener(
          u.type,
          u.attachedListener,
          Nu(u.optionsOrUseCapture)
        );
      }
    t.nodeType !== 3 && (e = l._observers, e !== null && e.forEach(function(n) {
      typeof n.rootMargin == "string" ? my(
        l,
        n,
        t
      ) : n.unobserve(t);
    }), t.reactFragments != null && t.reactFragments.delete(l));
  }
  function Es(t) {
    var l = t.firstChild;
    for (l && l.nodeType === 10 && (l = l.nextSibling); l; ) {
      var e = l;
      switch (l = l.nextSibling, e.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Es(e), qn(e);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (e.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(e);
    }
  }
  function by(t, l, e, a) {
    for (; t.nodeType === 1; ) {
      var u = e;
      if (t.nodeName.toLowerCase() !== l.toLowerCase()) {
        if (!a && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (a) {
        if (!t[Bu])
          switch (l) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (n = t.getAttribute("rel"), n === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (n !== u.rel || t.getAttribute("href") !== (u.href == null || u.href === "" ? null : u.href) || t.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin) || t.getAttribute("title") !== (u.title == null ? null : u.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (n = t.getAttribute("src"), (n !== (u.src == null ? null : u.src) || t.getAttribute("type") !== (u.type == null ? null : u.type) || t.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin)) && n && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (l === "input" && t.type === "hidden") {
        var n = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && t.getAttribute("name") === n)
          return t;
      } else return t;
      if (t = Jl(t.nextSibling), t === null) break;
    }
    return null;
  }
  function Sy(t, l, e) {
    if (l === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = Jl(t.nextSibling), t === null)) return null;
    return t;
  }
  function $m(t, l) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l || (t = Jl(t.nextSibling), t === null)) return null;
    return t;
  }
  function Ns(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function zs(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function py(t, l) {
    var e = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = l;
    else if (t.data !== "$?" || e.readyState !== "loading")
      l();
    else {
      var a = function() {
        l(), e.removeEventListener("DOMContentLoaded", a);
      };
      e.addEventListener("DOMContentLoaded", a), t._reactRetry = a;
    }
  }
  function Jl(t) {
    for (; t != null; t = t.nextSibling) {
      var l = t.nodeType;
      if (l === 1 || l === 3) break;
      if (l === 8) {
        if (l = t.data, l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&" || l === "F!" || l === "F")
          break;
        if (l === "/$" || l === "/&") return null;
      }
    }
    return t;
  }
  var Os = null;
  function Fm(t) {
    t = t.nextSibling;
    for (var l = 0; t; ) {
      if (t.nodeType === 8) {
        var e = t.data;
        if (e === "/$" || e === "/&") {
          if (l === 0)
            return Jl(t.nextSibling);
          l--;
        } else
          e !== "$" && e !== "$!" && e !== "$?" && e !== "$~" && e !== "&" || l++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function Wm(t) {
    t = t.previousSibling;
    for (var l = 0; t; ) {
      if (t.nodeType === 8) {
        var e = t.data;
        if (e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&") {
          if (l === 0) return t;
          l--;
        } else e !== "/$" && e !== "/&" || l++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function _y(t, l) {
    function e() {
      a = !0;
    }
    if (t.ownerDocument.activeElement === t) return !0;
    var a = !1;
    try {
      t.ownerDocument.addEventListener("focus", e, !0), (t.focus || HTMLElement.prototype.focus).call(t, l);
    } finally {
      t.ownerDocument.removeEventListener("focus", e, !0);
    }
    return a;
  }
  function Ty(t) {
    Bm(function() {
      Bm(function(l) {
        return t(l);
      });
    });
  }
  function km(t, l, e) {
    switch (l = Sn(e), t) {
      case "html":
        if (t = l.documentElement, !t) throw Error(s(452));
        return t;
      case "head":
        if (t = l.head, !t) throw Error(s(453));
        return t;
      case "body":
        if (t = l.body, !t) throw Error(s(454));
        return t;
      default:
        throw Error(s(451));
    }
  }
  function Im(t, l, e) {
    for (var a in e) {
      var u = e[a];
      e.hasOwnProperty(a) && u != null && xt(t, l, a, null, kh, u);
    }
    e.dangerouslySetInnerHTML != null && (t.textContent = ""), t.onclick === ce && (t.onclick = null), qn(t);
  }
  function Ms(t) {
    for (var l = t.attributes; l.length; )
      t.removeAttributeNode(l[0]);
    qn(t);
  }
  var $l = /* @__PURE__ */ new Map(), Pm = /* @__PURE__ */ new Set();
  function pn(t) {
    if (typeof t.getRootNode == "function") {
      var l = t.getRootNode();
      if (l.nodeType === 9 || l.nodeType === 11) return l;
    }
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  var Re = F.d;
  F.d = {
    f: Ey,
    r: Ny,
    D: zy,
    C: Oy,
    L: My,
    m: Ay,
    X: Dy,
    S: Cy,
    M: xy
  };
  function Ey() {
    var t = Re.f(), l = Li();
    return t || l;
  }
  function Ny(t) {
    var l = Za(t);
    l !== null && l.tag === 5 && l.type === "form" ? ld(l) : Re.r(t);
  }
  var zu = typeof document > "u" ? null : document;
  function t0(t, l, e) {
    var a = zu;
    if (a && typeof l == "string" && l) {
      var u = Ll(l);
      u = 'link[rel="' + t + '"][href="' + u + '"]', typeof e == "string" && (u += '[crossorigin="' + e + '"]'), Pm.has(u) || (Pm.add(u), t = { rel: t, crossOrigin: e, href: l }, a.querySelector(u) === null && (l = a.createElement("link"), fl(l, "link", t), Pt(l), a.head.appendChild(l)));
    }
  }
  function zy(t) {
    Re.D(t), t0("dns-prefetch", t, null);
  }
  function Oy(t, l) {
    Re.C(t, l), t0("preconnect", t, l);
  }
  function My(t, l, e) {
    Re.L(t, l, e);
    var a = zu;
    if (a && t && l) {
      var u = 'link[rel="preload"][as="' + Ll(l) + '"]';
      l === "image" && e && e.imageSrcSet ? (u += '[imagesrcset="' + Ll(
        e.imageSrcSet
      ) + '"]', typeof e.imageSizes == "string" && (u += '[imagesizes="' + Ll(
        e.imageSizes
      ) + '"]')) : u += '[href="' + Ll(t) + '"]';
      var n = u;
      switch (l) {
        case "style":
          n = Ou(t);
          break;
        case "script":
          n = Mu(t);
      }
      if (!($l.has(n) || (t = k(
        {
          rel: "preload",
          href: l === "image" && e && e.imageSrcSet ? void 0 : t,
          as: l
        },
        e
      ), $l.set(n, t), a.querySelector(u) !== null || l === "style" && a.querySelector(_n(n)) || l === "script" && a.querySelector(Tn(n))))) {
        var i = a.createElement("link");
        fl(i, "link", t), l === "style" && (i[Bn] = !0, i.onload = i.onerror = function() {
          mo(i);
        }), Pt(i), a.head.appendChild(i);
      }
    }
  }
  function Ay(t, l) {
    Re.m(t, l);
    var e = zu;
    if (e && t) {
      var a = l && typeof l.as == "string" ? l.as : "script", u = 'link[rel="modulepreload"][as="' + Ll(a) + '"][href="' + Ll(t) + '"]', n = u;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          n = Mu(t);
      }
      if (!$l.has(n) && (t = k({ rel: "modulepreload", href: t }, l), $l.set(n, t), e.querySelector(u) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (e.querySelector(Tn(n)))
              return;
        }
        a = e.createElement("link"), fl(a, "link", t), Pt(a), e.head.appendChild(a);
      }
    }
  }
  function Cy(t, l, e) {
    Re.S(t, l, e);
    var a = zu;
    if (a && t) {
      var u = Va(a).hoistableStyles, n = Ou(t);
      l = l || "default";
      var i = u.get(n);
      if (!i) {
        var c = { loading: 0, preload: null };
        if (i = a.querySelector(
          _n(n)
        ))
          c.loading = 5;
        else {
          t = k(
            { rel: "stylesheet", href: t, "data-precedence": l },
            e
          ), (e = $l.get(n)) && As(t, e);
          var r = i = a.createElement("link");
          Pt(r), fl(r, "link", t), r._p = new Promise(function(b, T) {
            r.onload = b, r.onerror = T;
          }), r.addEventListener("load", function() {
            c.loading |= 1;
          }), r.addEventListener("error", function() {
            c.loading |= 2;
          }), c.loading |= 4, Ji(i, l, a);
        }
        i = {
          type: "stylesheet",
          instance: i,
          count: 1,
          state: c
        }, u.set(n, i);
      }
    }
  }
  function Dy(t, l) {
    Re.X(t, l);
    var e = zu;
    if (e && t) {
      var a = Va(e).hoistableScripts, u = Mu(t), n = a.get(u);
      n || (n = e.querySelector(Tn(u)), n || (t = k({ src: t, async: !0 }, l), (l = $l.get(u)) && Cs(t, l), n = e.createElement("script"), Pt(n), fl(n, "link", t), e.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, a.set(u, n));
    }
  }
  function xy(t, l) {
    Re.M(t, l);
    var e = zu;
    if (e && t) {
      var a = Va(e).hoistableScripts, u = Mu(t), n = a.get(u);
      n || (n = e.querySelector(Tn(u)), n || (t = k({ src: t, async: !0, type: "module" }, l), (l = $l.get(u)) && Cs(t, l), n = e.createElement("script"), Pt(n), fl(n, "link", t), e.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, a.set(u, n));
    }
  }
  function l0(t, l, e, a) {
    var u = (u = ne.current) ? pn(u) : null;
    if (!u) throw Error(s(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof e.precedence == "string" && typeof e.href == "string" ? (e = Ou(e.href), l = Va(
          u
        ).hoistableStyles, a = l.get(e), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, l.set(e, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (e.rel === "stylesheet" && typeof e.href == "string" && typeof e.precedence == "string") {
          t = Ou(e.href);
          var n = Va(
            u
          ).hoistableStyles, i = n.get(t);
          if (i || (u = u.ownerDocument || u, i = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, n.set(t, i), (n = u.querySelector(
            _n(t)
          )) ? n._p || (i.instance = n, i.state.loading = 5) : (n = $l.get(t), n || (n = {
            rel: "preload",
            as: "style",
            href: e.href,
            crossOrigin: e.crossOrigin,
            integrity: e.integrity,
            media: e.media,
            hrefLang: e.hrefLang,
            referrerPolicy: e.referrerPolicy
          }, $l.set(t, n)), Uy(
            u,
            t,
            n,
            i.state
          ))), l && a === null)
            throw Error(s(528, ""));
          return i;
        }
        if (l && a !== null)
          throw Error(s(529, ""));
        return null;
      case "script":
        return l = e.async, e = e.src, typeof e == "string" && l && typeof l != "function" && typeof l != "symbol" ? (e = Mu(e), l = Va(
          u
        ).hoistableScripts, a = l.get(e), a || (a = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, l.set(e, a)), a) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(s(444, t));
    }
  }
  function Ou(t) {
    return 'href="' + Ll(t) + '"';
  }
  function _n(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function e0(t) {
    return k({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function Uy(t, l, e, a) {
    if (l = t.querySelector(
      'link[rel="preload"][as="style"][' + l + "]"
    )) {
      if (l[Bn] !== !0) {
        a.loading = 1;
        return;
      }
    } else
      l = t.createElement("link"), l[Bn] = !0, l.onload = l.onerror = mo.bind(null, l), fl(l, "link", e), Pt(l), t.head.appendChild(l);
    a.preload = l, l.addEventListener("load", function() {
      return a.loading |= 1;
    }), l.addEventListener("error", function() {
      return a.loading |= 2;
    });
  }
  function Mu(t) {
    return '[src="' + Ll(t) + '"]';
  }
  function Tn(t) {
    return "script[async]" + t;
  }
  function a0(t, l, e) {
    if (l.count++, l.instance === null)
      switch (l.type) {
        case "style":
          var a = t.querySelector(
            'style[data-href~="' + Ll(e.href) + '"]'
          );
          if (a)
            return l.instance = a, Pt(a), a;
          var u = k({}, e, {
            "data-href": e.href,
            "data-precedence": e.precedence,
            href: null,
            precedence: null
          });
          return a = (t.ownerDocument || t).createElement(
            "style"
          ), Pt(a), fl(a, "style", u), Ji(a, e.precedence, t), l.instance = a;
        case "stylesheet":
          u = Ou(e.href);
          var n = t.querySelector(
            _n(u)
          );
          if (n)
            return l.state.loading |= 4, l.instance = n, Pt(n), n;
          a = e0(e), (u = $l.get(u)) && As(a, u), n = (t.ownerDocument || t).createElement("link"), Pt(n);
          var i = n;
          return i._p = new Promise(function(c, r) {
            i.onload = c, i.onerror = r;
          }), fl(n, "link", a), l.state.loading |= 4, Ji(n, e.precedence, t), l.instance = n;
        case "script":
          return n = Mu(e.src), (u = t.querySelector(
            Tn(n)
          )) ? (l.instance = u, Pt(u), u) : (a = e, (u = $l.get(n)) && (a = k({}, e), Cs(a, u)), t = t.ownerDocument || t, u = t.createElement("script"), Pt(u), fl(u, "link", a), t.head.appendChild(u), l.instance = u);
        case "void":
          return null;
        default:
          throw Error(s(443, l.type));
      }
    else
      l.type === "stylesheet" && (l.state.loading & 4) === 0 && (a = l.instance, l.state.loading |= 4, Ji(a, e.precedence, t));
    return l.instance;
  }
  function Ji(t, l, e) {
    for (var a = e.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = a.length ? a[a.length - 1] : null, n = u, i = 0; i < a.length; i++) {
      var c = a[i];
      if (c.dataset.precedence === l) n = c;
      else if (n !== u) break;
    }
    n ? n.parentNode.insertBefore(t, n.nextSibling) : (l = e.nodeType === 9 ? e.head : e, l.insertBefore(t, l.firstChild));
  }
  function As(t, l) {
    t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.title == null && (t.title = l.title);
  }
  function Cs(t, l) {
    t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.integrity == null && (t.integrity = l.integrity);
  }
  var $i = null;
  function u0(t, l, e) {
    if ($i === null) {
      var a = /* @__PURE__ */ new Map(), u = $i = /* @__PURE__ */ new Map();
      u.set(e, a);
    } else
      u = $i, a = u.get(e), a || (a = /* @__PURE__ */ new Map(), u.set(e, a));
    if (a.has(t)) return a;
    for (a.set(t, null), e = e.getElementsByTagName(t), u = 0; u < e.length; u++) {
      var n = e[u];
      if (!(n[Bu] || n[al] || t === "link" && n.getAttribute("rel") === "stylesheet") && n.namespaceURI !== "http://www.w3.org/2000/svg") {
        var i = n.getAttribute(l) || "";
        i = t + i;
        var c = a.get(i);
        c ? c.push(n) : a.set(i, [n]);
      }
    }
    return a;
  }
  function Ds(t, l, e) {
    t = t.ownerDocument || t, t.head.insertBefore(
      e,
      l === "title" ? t.querySelector("head > title") : null
    );
  }
  function Ry(t, l, e) {
    if (e === 1 || l.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof l.precedence != "string" || typeof l.href != "string" || l.href === "")
          break;
        return !0;
      case "link":
        if (typeof l.rel != "string" || typeof l.href != "string" || l.href === "" || l.onLoad || l.onError)
          break;
        return l.rel === "stylesheet" ? (t = l.disabled, typeof l.precedence == "string" && t == null) : !0;
      case "script":
        if (l.async && typeof l.async != "function" && typeof l.async != "symbol" && !l.onLoad && !l.onError && l.src && typeof l.src == "string")
          return !0;
    }
    return !1;
  }
  function n0(t, l) {
    return t === "img" && l.src != null && l.src !== "" && l.onLoad == null && l.loading !== "lazy";
  }
  function i0(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function c0(t) {
    return (t.width || 100) * (t.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
  }
  function f0(t, l) {
    typeof l.decode == "function" && (t.imgCount++, l.complete || (t.imgBytes += c0(l), t.suspenseyImages.push(l)), t = By.bind(t), l.decode().then(t, t));
  }
  function jy(t, l, e, a) {
    if (e.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (e.state.loading & 4) === 0) {
      if (e.instance === null) {
        var u = Ou(a.href), n = l.querySelector(
          _n(u)
        );
        if (n) {
          l = n._p, l !== null && typeof l == "object" && typeof l.then == "function" && (t.count++, t = En.bind(t), l.then(t, t)), e.state.loading |= 4, e.instance = n, Pt(n);
          return;
        }
        n = l.ownerDocument || l, a = e0(a), (u = $l.get(u)) && As(a, u), n = n.createElement("link"), Pt(n);
        var i = n;
        i._p = new Promise(function(c, r) {
          i.onload = c, i.onerror = r;
        }), fl(n, "link", a), e.instance = n;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(e, l), (l = e.state.preload) && (e.state.loading & 3) === 0 && (t.count++, e = En.bind(t), l.addEventListener("load", e), l.addEventListener("error", e));
    }
  }
  var Fi = 0;
  function Hy(t, l) {
    return t.stylesheets && t.count === 0 && ki(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(e) {
      var a = setTimeout(function() {
        if (t.stylesheets && ki(t, t.stylesheets), t.unsuspend) {
          var n = t.unsuspend;
          t.unsuspend = null, n();
        }
      }, 6e4 + l);
      0 < t.imgBytes && Fi === 0 && (Fi = 62500 * Ph());
      var u = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && ki(t, t.stylesheets), t.unsuspend)) {
            var n = t.unsuspend;
            t.unsuspend = null, n();
          }
        },
        (t.imgBytes > Fi ? 50 : 800) + l
      );
      return t.unsuspend = e, function() {
        t.unsuspend = null, clearTimeout(a), clearTimeout(u);
      };
    } : null;
  }
  function s0(t) {
    if (t.count === 0 && (t.imgCount === 0 || !t.waitingForImages)) {
      if (t.stylesheets) ki(t, t.stylesheets);
      else if (t.unsuspend) {
        var l = t.unsuspend;
        t.unsuspend = null, l();
      }
    }
  }
  function En() {
    this.count--, s0(this);
  }
  function By() {
    this.imgCount--, s0(this);
  }
  var Wi = null;
  function ki(t, l) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, Wi = /* @__PURE__ */ new Map(), l.forEach(qy, t), Wi = null, En.call(t));
  }
  function qy(t, l) {
    if (!(l.state.loading & 4)) {
      var e = Wi.get(t);
      if (e) var a = e.get(null);
      else {
        e = /* @__PURE__ */ new Map(), Wi.set(t, e);
        for (var u = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), n = 0; n < u.length; n++) {
          var i = u[n];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (e.set(i.dataset.precedence, i), a = i);
        }
        a && e.set(null, a);
      }
      u = l.instance, i = u.getAttribute("data-precedence"), n = e.get(i) || a, n === a && e.set(null, u), e.set(i, u), this.count++, a = En.bind(this), u.addEventListener("load", a), u.addEventListener("error", a), n ? n.parentNode.insertBefore(u, n.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(u, t.firstChild)), l.state.loading |= 4;
    }
  }
  var Au = {
    $$typeof: X,
    Provider: null,
    Consumer: null,
    _currentValue: Gl,
    _currentValue2: Gl,
    _threadCount: 0
  };
  function Yy(t, l, e, a, u, n, i, c, r) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = sc(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = sc(0), this.hiddenUpdates = sc(null), this.identifierPrefix = a, this.onUncaughtError = u, this.onCaughtError = n, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = r, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function o0(t, l, e, a, u, n, i, c, r, b, T, A) {
    return t = new Yy(
      t,
      l,
      e,
      i,
      r,
      b,
      T,
      A,
      c
    ), l = 1, n === !0 && (l |= 24), n = Tl(3, null, null, l), t.current = n, n.stateNode = t, l = Vc(), l.refCount++, t.pooledCache = l, l.refCount++, n.memoizedState = {
      element: a,
      isDehydrated: e,
      cache: l
    }, $c(n), t;
  }
  function r0(t) {
    return t ? (t = tu, t) : tu;
  }
  function d0(t, l, e, a, u, n) {
    u = r0(u), a.context === null ? a.context = u : a.pendingContext = u, a = we(l), a.payload = { element: e }, n = n === void 0 ? null : n, n !== null && (a.callback = n), e = Ke(t, a, l), e !== null && (Ol(e, t, l), Pu(e, t, l));
  }
  function m0(t, l) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var e = t.retryLane;
      t.retryLane = e !== 0 && e < l ? e : l;
    }
  }
  function xs(t, l) {
    m0(t, l), (t = t.alternate) && m0(t, l);
  }
  function v0(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = ba(t, 67108864);
      l !== null && Ol(l, t, 67108864), xs(t, 67108864);
    }
  }
  function h0(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = ql();
      l = oc(l);
      var e = ba(t, l);
      e !== null && Ol(e, t, l), xs(t, l);
    }
  }
  var Cu = !0;
  function Gy(t, l, e, a) {
    var u = L.T;
    L.T = null;
    var n = F.p;
    try {
      F.p = 2, Us(t, l, e, a);
    } finally {
      F.p = n, L.T = u;
    }
  }
  function Ly(t, l, e, a) {
    var u = L.T;
    L.T = null;
    var n = F.p;
    try {
      F.p = 8, Us(t, l, e, a);
    } finally {
      F.p = n, L.T = u;
    }
  }
  function Us(t, l, e, a) {
    if (Cu) {
      var u = Rs(a);
      if (u === null)
        ms(
          t,
          l,
          a,
          Ii,
          e
        ), g0(t, a);
      else if (Qy(
        u,
        t,
        l,
        e,
        a
      ))
        a.stopPropagation();
      else if (g0(t, a), l & 4 && -1 < Xy.indexOf(t)) {
        for (; u !== null; ) {
          var n = Za(u);
          if (n !== null)
            switch (n.tag) {
              case 3:
                if (n = n.stateNode, n.current.memoizedState.isDehydrated) {
                  var i = ma(n.pendingLanes);
                  if (i !== 0) {
                    var c = n;
                    for (c.pendingLanes |= 2, c.entangledLanes |= 2; i; ) {
                      var r = 1 << 31 - Dl(i);
                      c.entanglements[1] |= r, i &= ~r;
                    }
                    ge(n), (zt & 6) === 0 && (qi = Al() + 500, yn(0));
                  }
                }
                break;
              case 31:
              case 13:
                c = ba(n, 2), c !== null && Ol(c, n, 2), Li(), xs(n, 2);
            }
          if (n = Rs(a), n === null && ms(
            t,
            l,
            a,
            Ii,
            e
          ), n === u) break;
          u = n;
        }
        u !== null && a.stopPropagation();
      } else
        ms(
          t,
          l,
          a,
          null,
          e
        );
    }
  }
  function Rs(t) {
    return t = gc(t), js(t);
  }
  var Ii = null;
  function js(t) {
    if (Ii = null, t = va(t), t !== null) {
      var l = y(t);
      if (l === null) t = null;
      else {
        var e = l.tag;
        if (e === 13) {
          if (t = O(l), t !== null) return t;
          t = null;
        } else if (e === 31) {
          if (t = D(l), t !== null) return t;
          t = null;
        } else if (e === 3) {
          if (l.stateNode.current.memoizedState.isDehydrated)
            return l.tag === 3 ? l.stateNode.containerInfo : null;
          t = null;
        } else l !== t && (t = null);
      }
    }
    return Ii = t, null;
  }
  function y0(t) {
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
        switch (P0()) {
          case to:
            return 2;
          case lo:
            return 8;
          case xn:
          case tv:
            return 32;
          case eo:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Hs = !1, ua = null, na = null, ia = null, Nn = /* @__PURE__ */ new Map(), zn = /* @__PURE__ */ new Map(), ca = [], Xy = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function g0(t, l) {
    switch (t) {
      case "focusin":
      case "focusout":
        ua = null;
        break;
      case "dragenter":
      case "dragleave":
        na = null;
        break;
      case "mouseover":
      case "mouseout":
        ia = null;
        break;
      case "pointerover":
      case "pointerout":
        Nn.delete(l.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        zn.delete(l.pointerId);
    }
  }
  function On(t, l, e, a, u, n) {
    return t === null || t.nativeEvent !== n ? (t = {
      blockedOn: l,
      domEventName: e,
      eventSystemFlags: a,
      nativeEvent: n,
      targetContainers: [u]
    }, l !== null && (l = Za(l), l !== null && v0(l)), t) : (t.eventSystemFlags |= a, l = t.targetContainers, u !== null && l.indexOf(u) === -1 && l.push(u), t);
  }
  function Qy(t, l, e, a, u) {
    switch (l) {
      case "focusin":
        return ua = On(
          ua,
          t,
          l,
          e,
          a,
          u
        ), !0;
      case "dragenter":
        return na = On(
          na,
          t,
          l,
          e,
          a,
          u
        ), !0;
      case "mouseover":
        return ia = On(
          ia,
          t,
          l,
          e,
          a,
          u
        ), !0;
      case "pointerover":
        var n = u.pointerId;
        return Nn.set(
          n,
          On(
            Nn.get(n) || null,
            t,
            l,
            e,
            a,
            u
          )
        ), !0;
      case "gotpointercapture":
        return n = u.pointerId, zn.set(
          n,
          On(
            zn.get(n) || null,
            t,
            l,
            e,
            a,
            u
          )
        ), !0;
    }
    return !1;
  }
  function b0(t) {
    var l = va(t.target);
    if (l !== null) {
      var e = y(l);
      if (e !== null) {
        if (l = e.tag, l === 13) {
          if (l = O(e), l !== null) {
            t.blockedOn = l, so(t.priority, function() {
              h0(e);
            });
            return;
          }
        } else if (l === 31) {
          if (l = D(e), l !== null) {
            t.blockedOn = l, so(t.priority, function() {
              h0(e);
            });
            return;
          }
        } else if (l === 3 && e.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = e.tag === 3 ? e.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function Pi(t) {
    if (t.blockedOn !== null) return !1;
    for (var l = t.targetContainers; 0 < l.length; ) {
      var e = Rs(t.nativeEvent);
      if (e === null) {
        e = t.nativeEvent;
        var a = new e.constructor(
          e.type,
          e
        );
        yc = a, e.target.dispatchEvent(a), yc = null;
      } else
        return l = Za(e), l !== null && v0(l), t.blockedOn = e, !1;
      l.shift();
    }
    return !0;
  }
  function S0(t, l, e) {
    Pi(t) && e.delete(l);
  }
  function Zy() {
    Hs = !1, ua !== null && Pi(ua) && (ua = null), na !== null && Pi(na) && (na = null), ia !== null && Pi(ia) && (ia = null), Nn.forEach(S0), zn.forEach(S0);
  }
  function tc(t, l) {
    t.blockedOn === l && (t.blockedOn = null, Hs || (Hs = !0, f.unstable_scheduleCallback(
      f.unstable_NormalPriority,
      Zy
    )));
  }
  var lc = null;
  function p0(t) {
    lc !== t && (lc = t, f.unstable_scheduleCallback(
      f.unstable_NormalPriority,
      function() {
        lc === t && (lc = null);
        for (var l = 0; l < t.length; l += 3) {
          var e = t[l], a = t[l + 1], u = t[l + 2];
          if (typeof a != "function") {
            if (js(a || e) === null)
              continue;
            break;
          }
          var n = Za(e);
          n !== null && (t.splice(l, 3), l -= 3, yf(
            n,
            {
              pending: !0,
              data: u,
              method: e.method,
              action: a
            },
            a,
            u
          ));
        }
      }
    ));
  }
  function Du(t) {
    function l(r) {
      return tc(r, t);
    }
    ua !== null && tc(ua, t), na !== null && tc(na, t), ia !== null && tc(ia, t), Nn.forEach(l), zn.forEach(l);
    for (var e = 0; e < ca.length; e++) {
      var a = ca[e];
      a.blockedOn === t && (a.blockedOn = null);
    }
    for (; 0 < ca.length && (e = ca[0], e.blockedOn === null); )
      b0(e), e.blockedOn === null && ca.shift();
    if (e = (t.ownerDocument || t).$$reactFormReplay, e != null)
      for (a = 0; a < e.length; a += 3) {
        var u = e[a], n = e[a + 1], i = u[_l] || null;
        if (typeof n == "function")
          i || p0(e);
        else if (i) {
          var c = null;
          if (n && n.hasAttribute("formAction")) {
            if (u = n, i = n[_l] || null)
              c = i.formAction;
            else if (js(u) !== null) continue;
          } else c = i.action;
          typeof c == "function" ? e[a + 1] = c : (e.splice(a, 3), a -= 3), p0(e);
        }
      }
  }
  function _0() {
    function t(n) {
      n.canIntercept && n.info === "react-transition" && n.intercept({
        handler: function() {
          return new Promise(function(i) {
            return u = i;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function l() {
      u !== null && (u(), u = null), a || setTimeout(e, 20);
    }
    function e() {
      if (!a && !navigation.transition) {
        var n = navigation.currentEntry;
        n && n.url != null && navigation.navigate(n.url, {
          state: n.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var a = !1, u = null;
      return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", l), navigation.addEventListener("navigateerror", l), setTimeout(e, 100), function() {
        a = !0, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", l), navigation.removeEventListener("navigateerror", l), u !== null && (u(), u = null);
      };
    }
  }
  function Bs(t) {
    this._internalRoot = t;
  }
  ec.prototype.render = Bs.prototype.render = function(t) {
    var l = this._internalRoot;
    if (l === null) throw Error(s(409));
    var e = l.current, a = ql();
    d0(e, a, t, l, null, null);
  }, ec.prototype.unmount = Bs.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var l = t.containerInfo;
      d0(t.current, 2, null, t, null, null), Li(), l[Qa] = null;
    }
  };
  function ec(t) {
    this._internalRoot = t;
  }
  ec.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var l = fo();
      t = { blockedOn: null, target: t, priority: l };
      for (var e = 0; e < ca.length && l !== 0 && l < ca[e].priority; e++) ;
      ca.splice(e, 0, t), e === 0 && b0(t);
    }
  };
  var T0 = v.version;
  if (T0 !== "19.3.0")
    throw Error(
      s(
        527,
        T0,
        "19.3.0"
      )
    );
  F.findDOMNode = function(t) {
    var l = t._reactInternals;
    if (l === void 0)
      throw typeof t.render == "function" ? Error(s(188)) : (t = Object.keys(t).join(","), Error(s(268, t)));
    return t = B(l), t = t !== null ? j(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var Vy = {
    bundleType: 0,
    version: "19.3.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: L,
    reconcilerVersion: "19.3.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var ac = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!ac.isDisabled && ac.supportsFiber)
      try {
        Ru = ac.inject(
          Vy
        ), Cl = ac;
      } catch {
      }
  }
  return An.createRoot = function(t, l) {
    if (!z(t)) throw Error(s(299));
    var e = !1, a = "", u = rd, n = dd, i = md;
    return l != null && (l.unstable_strictMode === !0 && (e = !0), l.identifierPrefix !== void 0 && (a = l.identifierPrefix), l.onUncaughtError !== void 0 && (u = l.onUncaughtError), l.onCaughtError !== void 0 && (n = l.onCaughtError), l.onRecoverableError !== void 0 && (i = l.onRecoverableError)), l = o0(
      t,
      1,
      !1,
      null,
      null,
      e,
      a,
      null,
      u,
      n,
      i,
      _0
    ), t[Qa] = l.current, ds(t), new Bs(l);
  }, An.hydrateRoot = function(t, l, e) {
    if (!z(t)) throw Error(s(299));
    var a = !1, u = "", n = rd, i = dd, c = md, r = null;
    return e != null && (e.unstable_strictMode === !0 && (a = !0), e.identifierPrefix !== void 0 && (u = e.identifierPrefix), e.onUncaughtError !== void 0 && (n = e.onUncaughtError), e.onCaughtError !== void 0 && (i = e.onCaughtError), e.onRecoverableError !== void 0 && (c = e.onRecoverableError), e.formState !== void 0 && (r = e.formState)), l = o0(
      t,
      1,
      !0,
      l,
      e ?? null,
      a,
      u,
      r,
      n,
      i,
      c,
      _0
    ), l.context = r0(null), e = l.current, a = ql(), a = oc(a), u = we(a), u.callback = null, Ke(e, u, a), e = a, l.current.lanes = e, Hu(l, e), ge(l), t[Qa] = l.current, ds(t), new ec(l);
  }, An.version = "19.3.0", An;
}
var U0;
function tg() {
  if (U0) return Gs.exports;
  U0 = 1;
  function f() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
      } catch (v) {
        console.error(v);
      }
  }
  return f(), Gs.exports = Py(), Gs.exports;
}
var lg = tg();
const B0 = 128, q0 = 640;
function Cn(f, v = 144) {
  return Math.max(B0, Math.min(
    q0,
    Number.isFinite(f) ? Math.round(f) : v
  ));
}
function Y0(f, v, o) {
  return v ? o ? f : "waveform" : "spectrogram";
}
function eg(f, v, o) {
  return Number.isFinite(f) ? f * (v === 1 ? 16 : v === 2 ? o : 1) : 0;
}
function ag(f, v) {
  return Math.max(0, Math.min(100, f - Math.max(-240, Math.min(240, v)) * 0.08));
}
function ug(f, v) {
  return Cn(f * Math.exp(-Math.max(-240, Math.min(240, v)) * 2e-3));
}
function R0(f, v, o) {
  return Math.max(0, f * v - o);
}
function Ya(f) {
  if (!f.id || !Number.isSafeInteger(f.startSample) || !Number.isSafeInteger(f.endSample) || !Number.isFinite(f.sampleRate) || f.sampleRate <= 0 || f.startSample < 0 || f.endSample <= f.startSample)
    throw new RangeError("A loop needs an id, valid sample rate and increasing integer sample bounds");
  return {
    start: f.startSample / f.sampleRate,
    end: f.endSample / f.sampleRate,
    duration: (f.endSample - f.startSample) / f.sampleRate
  };
}
function ng(f, v = 0) {
  const o = /* @__PURE__ */ new Set();
  return f.filter((s) => {
    try {
      const z = Ya(s);
      return o.has(s.id) || v > 0 && z.end > v + 0.02 ? !1 : (o.add(s.id), !0);
    } catch {
      return !1;
    }
  });
}
function G0(f, v, o) {
  const s = o - v;
  return !Number.isFinite(f) || s <= 0 ? v : v + ((f - v) % s + s) % s;
}
class ig {
  constructor(v = () => new AudioContext()) {
    this.createContext = v;
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
    const v = Math.max(0, this.context.currentTime - this.anchor);
    return this.start + (this.offset + v) % this.length;
  }
  pause() {
    return this.stoppedTime = this.currentTime, this.generation += 1, this.abort?.abort(), this.abort = null, this.node && (this.node.stop(), this.node.disconnect(), this.node = null), this.stoppedTime;
  }
  async play(v, o, s, z = "same-origin") {
    const y = Ya(v);
    this.pause();
    const O = this.generation;
    this.context ??= this.createContext();
    const D = this.context, H = D.resume();
    H.catch(() => {
    });
    const B = v.audioSrc || o, j = JSON.stringify([B, v.startSample, v.endSample, v.sampleRate]);
    try {
      let _ = this.cache?.url === j ? this.cache.buffer : null;
      if (!_) {
        const at = new AbortController();
        this.abort = at;
        const Ut = await fetch(B, { signal: at.signal, credentials: z });
        if (!Ut.ok) throw new Error(`Could not load loop audio (HTTP ${Ut.status})`);
        const Ot = 128 * 1024 * 1024;
        if (Number(Ut.headers.get("Content-Length")) > Ot) throw new Error("Loop audio exceeds 128 MiB");
        const Et = await Ut.arrayBuffer();
        if (Et.byteLength > Ot) throw new Error("Loop audio exceeds 128 MiB");
        if (_ = await D.decodeAudioData(Et), O !== this.generation) return !1;
        this.cache = { url: j, buffer: _ };
      }
      if (await H, O !== this.generation) return !1;
      const U = v.audioSrc ? 0 : y.start, Q = U + y.duration, nt = Math.max(2 / _.sampleRate, 2e-3);
      if (!Number.isFinite(_.duration) || _.duration <= U || Q > _.duration + nt || v.audioSrc && Math.abs(_.duration - y.duration) > nt)
        throw new Error("Loop audio duration does not match the reported sample boundaries");
      const it = D.createBufferSource();
      return it.buffer = _, it.loop = !0, it.loopStart = U, it.loopEnd = Math.min(Q, _.duration), it.connect(D.destination), this.start = y.start, this.length = it.loopEnd - U, this.offset = G0(s, y.start, y.start + this.length) - y.start, this.anchor = D.currentTime, it.start(this.anchor, U + this.offset), this.node = it, !0;
    } catch (_) {
      if (O !== this.generation) return !1;
      throw _;
    } finally {
      H.catch(() => {
      });
    }
  }
  dispose() {
    this.pause(), this.cache = null;
    const v = this.context;
    this.context = null, v && v.close().catch(() => {
    });
  }
}
function sa(f, v, o) {
  return Math.min(o, Math.max(v, f));
}
function qa(f) {
  const v = Math.max(0, Number(f) || 0), o = Math.floor(v / 60), s = Math.floor(v % 60), z = Math.floor((v - Math.floor(v)) * 1e3);
  return `${String(o).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(z).padStart(3, "0")}`;
}
function L0(f) {
  const v = [0.1, 0.25, 0.5, 1, 2, 5, 10, 15, 30, 60, 120, 300, 600];
  return v.find((o) => o * f >= 70) ?? v[v.length - 1];
}
function cg(f, v, o, s, z) {
  if (z <= 0 || s <= 0) return { start: 0, end: 0 };
  const y = Math.max(0, f - o), O = Math.max(0, f + v - o), D = sa(y / s, 0, z), H = sa(O / s, D, z);
  return { start: D, end: H };
}
function ws(f, v) {
  return `${sa(f / Math.max(v, 1e-9), 0, 1) * 100}%`;
}
function X0(f, v, o, s = 0.08) {
  const z = Number.isFinite(v) && Number(v) > f ? Number(v) : f + 0.5;
  return `${Math.max(s, (z - f) / Math.max(o, 1e-9) * 100)}%`;
}
function fg({ min: f, max: v, colour: o = "#79c0ff" }) {
  const s = G.useRef(null);
  return G.useEffect(() => {
    const z = s.current;
    if (!z) return;
    const y = Math.max(1, Math.min(f.length, v.length));
    z.width = y, z.height = 180;
    const O = z.getContext("2d");
    if (!O) return;
    O.clearRect(0, 0, y, z.height), O.strokeStyle = o, O.lineWidth = 1, O.beginPath();
    const D = z.height / 2, H = z.height * 0.46;
    for (let B = 0; B < y; B += 1) {
      const j = B + 0.5;
      O.moveTo(j, D - (Number(v[B]) || 0) * H), O.lineTo(j, D - (Number(f[B]) || 0) * H);
    }
    O.stroke();
  }, [o, v, f]), /* @__PURE__ */ E.jsx("canvas", { ref: s, className: "rts-waveform", "aria-hidden": "true" });
}
function sg({ rows: f }) {
  const v = G.useRef(null);
  return G.useEffect(() => {
    const o = v.current, s = f.filter((D) => D.length > 0);
    if (!o || !s.length) return;
    const z = Math.max(...s.map((D) => D.length));
    o.width = Math.min(4096, s.length), o.height = Math.min(256, z);
    const y = o.getContext("2d");
    if (!y) return;
    const O = y.createImageData(o.width, o.height);
    for (let D = 0; D < o.width; D += 1) {
      const H = Math.min(s.length - 1, Math.floor(D * s.length / o.width)), B = s[H], j = Math.max(1e-9, ...B.map((_) => Number(_) || 0));
      for (let _ = 0; _ < o.height; _ += 1) {
        const U = Math.min(B.length - 1, Math.floor((o.height - 1 - _) * B.length / o.height)), Q = sa((Number(B[U]) || 0) / j, 0, 1), nt = (_ * o.width + D) * 4;
        O.data[nt] = Math.round(40 + 180 * Q), O.data[nt + 1] = Math.round(35 + 110 * Q), O.data[nt + 2] = Math.round(80 + 170 * Q), O.data[nt + 3] = 255;
      }
    }
    y.putImageData(O, 0, 0);
  }, [f]), /* @__PURE__ */ E.jsx("canvas", { ref: v, className: "rts-matrix", "aria-hidden": "true" });
}
function og({ items: f, duration: v }) {
  const o = f.filter((y) => Number.isFinite(y.value) && y.value > 0);
  if (!o.length) return null;
  const s = Math.log2(Math.max(20, Math.min(...o.map((y) => y.value)))), z = Math.log2(Math.max(100, ...o.map((y) => y.value)));
  return o.map((y, O) => {
    const D = (Math.log2(y.value) - s) / Math.max(0.01, z - s);
    return /* @__PURE__ */ E.jsx(
      "span",
      {
        className: `rts-note ${y.className ?? ""}`,
        style: { left: ws(y.start, v), width: X0(y.start, y.end ?? y.start + 0.12, v, 0.04), top: `${8 + (1 - D) * 72}px` },
        title: y.title ?? `${y.label ?? `${y.value.toFixed(1)} Hz`} · ${qa(y.start)}`
      },
      `${y.start}-${O}`
    );
  });
}
function Ks({ content: f, duration: v }) {
  switch (f.type) {
    case "waveform":
      return /* @__PURE__ */ E.jsx(fg, { ...f });
    case "image":
      return /* @__PURE__ */ E.jsx("img", { className: `rts-image ${f.className ?? ""}`, src: f.src, alt: f.alt });
    case "markers":
      return /* @__PURE__ */ E.jsx(E.Fragment, { children: f.items.map((o, s) => /* @__PURE__ */ E.jsx(
        "span",
        {
          className: `rts-marker ${o.emphasis ? "rts-marker-emphasis" : ""} ${o.className ?? ""}`,
          style: { left: ws(o.time, v) },
          title: o.label
        },
        `${o.time}-${s}`
      )) });
    case "blocks":
      return /* @__PURE__ */ E.jsx(E.Fragment, { children: f.items.map((o, s) => /* @__PURE__ */ E.jsx(
        "span",
        {
          className: `rts-block ${o.className ?? ""}`,
          style: { left: ws(o.start, v), width: X0(o.start, o.end, v) },
          title: o.title ?? `${o.label ?? ""} · ${qa(o.start)}${o.end ? ` — ${qa(o.end)}` : ""}`,
          children: o.label
        },
        `${o.start}-${s}`
      )) });
    case "notes":
      return /* @__PURE__ */ E.jsx(og, { items: f.items, duration: v });
    case "curve": {
      const o = f.points.filter((D) => Number.isFinite(D.time) && Number.isFinite(D.value));
      if (!o.length) return null;
      const s = o.map((D) => D.value), z = Math.min(...s), y = Math.max(...s), O = o.map((D) => {
        const H = D.time / Math.max(v, 1e-9) * 2e3, B = 180 - (D.value - z) / Math.max(1e-9, y - z) * 168 - 6;
        return `${H.toFixed(2)},${B.toFixed(2)}`;
      }).join(" ");
      return /* @__PURE__ */ E.jsx("svg", { className: "rts-curve", viewBox: "0 0 2000 180", preserveAspectRatio: "none", "aria-hidden": "true", children: /* @__PURE__ */ E.jsx("polyline", { fill: "none", stroke: f.colour ?? "#7ee787", strokeWidth: "2", vectorEffect: "non-scaling-stroke", points: O }) });
    }
    case "matrix":
      return /* @__PURE__ */ E.jsx(sg, { ...f });
    case "summary":
      return /* @__PURE__ */ E.jsx("div", { className: "rts-summary", children: f.items.map((o, s) => /* @__PURE__ */ E.jsxs("span", { className: "rts-summary-item", children: [
        /* @__PURE__ */ E.jsxs("strong", { children: [
          o.label,
          ": "
        ] }),
        o.value
      ] }, `${o.label}-${s}`)) });
    case "artifact":
      return /* @__PURE__ */ E.jsxs("div", { className: "rts-artifact", children: [
        /* @__PURE__ */ E.jsx("span", { children: f.note }),
        f.href && /* @__PURE__ */ E.jsx("a", { href: f.href, target: "_blank", rel: "noopener noreferrer", children: f.linkLabel ?? "open" })
      ] });
    case "text":
      return /* @__PURE__ */ E.jsx("div", { className: "rts-text", children: f.text });
    case "custom":
      return /* @__PURE__ */ E.jsx(E.Fragment, { children: f.node });
  }
}
function rg({ content: f, duration: v, view: o }) {
  const s = Y0(o, !!f.waveform, !!f.spectrogram);
  return /* @__PURE__ */ E.jsxs("div", { className: `rts-audio-layers rts-audio-${s}`, "data-audio-view": s, children: [
    f.spectrogram && s !== "waveform" && /* @__PURE__ */ E.jsx("div", { className: "rts-audio-spectrum", children: /* @__PURE__ */ E.jsx(Ks, { content: { type: "image", ...f.spectrogram }, duration: v }) }),
    f.waveform && s !== "spectrogram" && /* @__PURE__ */ E.jsx("div", { className: "rts-audio-envelope", children: /* @__PURE__ */ E.jsx(Ks, { content: { type: "waveform", ...f.waveform, colour: s === "both" ? "#e6fff7" : f.waveform.colour }, duration: v }) }),
    !f.waveform && !f.spectrogram && /* @__PURE__ */ E.jsx("span", { className: "rts-meta", children: "Waiting for audio analysis" })
  ] });
}
function dg(f, v, o, s, z = "same-origin") {
  const [y, O] = G.useState(0), [D, H] = G.useState(!1), [B, j] = G.useState(!1), [_, U] = G.useState(""), Q = G.useRef(!1), nt = G.useRef("media"), it = G.useRef(null), at = G.useRef(0), Ut = G.useRef({ audioSrc: v, activeLoop: o, onError: s, credentials: z });
  Ut.current = { audioSrc: v, activeLoop: o, onError: s, credentials: z };
  const Ot = G.useCallback(() => nt.current === "loop" ? it.current?.currentTime ?? 0 : f.current?.currentTime ?? 0, [f]), Et = G.useCallback(() => {
    const I = Ot();
    return at.current += 1, Q.current = !1, it.current?.pause(), f.current?.pause(), j(!1), H(!1), O(I), I;
  }, [f, Ot]), Ht = G.useCallback((I) => {
    Et(), U(I instanceof Error ? I.message : String(I)), Ut.current.onError?.(I);
  }, [Et]), Yt = G.useCallback(async (I) => {
    Et();
    const rt = at.current;
    Q.current = !0, j(!0), U("");
    const { activeLoop: yt, audioSrc: kt, credentials: ct } = Ut.current;
    try {
      if (yt) {
        if (nt.current = "loop", it.current ??= new ig(), !await it.current.play(yt, kt, I, ct)) return;
      } else {
        nt.current = "media";
        const X = f.current;
        if (!X) return;
        X.currentTime = Math.max(0, I), await X.play();
      }
      if (rt !== at.current) return;
      O(Ot()), j(!1), H(!0);
    } catch (X) {
      rt === at.current && Ht(X);
    }
  }, [f, Ht, Et, Ot]), Xt = G.useCallback((I) => {
    const rt = Ut.current.activeLoop;
    if (rt) {
      const yt = Ya(rt);
      I = G0(I, yt.start, yt.end);
    }
    Q.current ? Yt(I) : (Et(), nt.current = "media", f.current && (f.current.currentTime = I), O(I));
  }, [f, Et, Yt]), k = G.useCallback(() => {
    if (Q.current) {
      Et();
      return;
    }
    let I = Ot();
    const rt = Ut.current.activeLoop;
    if (rt) {
      const yt = Ya(rt);
      (I < yt.start || I >= yt.end) && (I = yt.start);
    }
    Yt(I);
  }, [Et, Yt, Ot]);
  G.useEffect(() => (Et(), nt.current = "media", O(0), U(""), it.current?.dispose(), it.current = null, () => {
    at.current += 1, Q.current = !1, it.current?.dispose(), it.current = null, f.current?.pause();
  }), [v, f, Et]);
  const w = o ? JSON.stringify([o.id, o.startSample, o.endSample, o.sampleRate, o.audioSrc]) : "";
  G.useEffect(() => {
    const I = Q.current;
    let rt = Et();
    const yt = Ut.current.activeLoop;
    yt && (rt = Ya(yt).start), nt.current = "media", f.current && (f.current.currentTime = rt), O(rt), I && Yt(rt);
  }, [w, f, Et, Yt]), G.useEffect(() => {
    if (!D) return;
    let I = 0;
    const rt = () => {
      O(Ot()), I = requestAnimationFrame(rt);
    };
    return I = requestAnimationFrame(rt), () => cancelAnimationFrame(I);
  }, [D, Ot]);
  const Nt = G.useCallback(() => {
    nt.current === "media" && Et();
  }, [Et]);
  return { time: y, playing: D, loading: B, error: _, toggle: k, seek: Xt, ended: Nt, fail: Ht };
}
function mg(f, v) {
  if (f <= 0 || v <= 0) return [];
  const o = L0(v) / 5, s = [];
  for (let z = 0; z * o <= f + 1e-6; z += 1)
    s.push({
      time: z * o,
      major: z % 5 === 0
    });
  return s;
}
function vg(f, v) {
  const o = Math.round(f * 1e3), s = Math.floor(o / 1e3), z = `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  return L0(v) < 1 ? `${z}.${String(o % 1e3).padStart(3, "0")}` : z;
}
function hg({
  audioSrc: f,
  loops: v = [],
  onLoopSelect: o,
  onLoopEnabledChange: s,
  lanes: z,
  title: y = "Audio timeline",
  subtitle: O,
  duration: D = 0,
  grid: H = [],
  headerEnd: B,
  footer: j,
  className: _ = "",
  labelWidth: U = 230,
  initialZoom: Q = 20,
  laneControls: nt = !1,
  wheelNavigation: it = !1,
  followPlayheadByDefault: at = !0,
  preload: Ut = "metadata",
  crossOrigin: Ot,
  onDurationChange: Et,
  onTimeChange: Ht,
  onWindowChange: Yt,
  onPlaybackError: Xt
}) {
  const k = G.useRef(null), w = G.useRef(null), [Nt, I] = G.useState(Math.max(0, D)), [rt, yt] = G.useState(null), [kt, ct] = G.useState(!1), X = G.useMemo(() => ng(v, Nt), [v, Nt]), C = X.find((N) => N.id === rt) ?? null, q = dg(
    k,
    f,
    kt ? C : null,
    Xt,
    Ot === "use-credentials" ? "include" : "same-origin"
  ), $ = q.time, pt = q.playing, st = C ? Ya(C) : null, bl = (N) => {
    yt(N), o?.(X.find((tt) => tt.id === N) ?? null);
  }, Wl = (N) => {
    ct(N), s?.(N);
  };
  G.useEffect(() => {
    rt && !X.some((N) => N.id === rt) && (yt(null), ct(!1), o?.(null), s?.(!1));
  }, [rt, X, o, s]), G.useEffect(() => {
    yt(null), ct(!1), I(Math.max(0, D));
  }, [f]);
  const [kl, m] = G.useState(at), [x, V] = G.useState(Q), [K, ot] = G.useState({}), [gt, bt] = G.useState({}), L = G.useRef(Q), F = G.useRef(null), Gl = G.useRef(() => {
  });
  G.useEffect(() => {
    ot({}), bt({});
  }, [f]);
  const [oa, je] = G.useState(0), [Ml, Ft] = G.useState({ start: 0, end: 0 });
  G.useEffect(() => {
    D > 0 && I(D);
  }, [D]), G.useEffect(() => {
    const N = w.current;
    if (!N) return;
    const tt = () => je(N.clientWidth);
    tt();
    const ut = new ResizeObserver(tt);
    return ut.observe(N), () => ut.disconnect();
  }, []);
  const _t = Nt > 0 ? Math.max(0.4, Math.max(320, oa - U - 16) / Nt) : 0.4, At = Math.max(_t, _t * Math.pow(2, x / 18));
  G.useLayoutEffect(() => {
    if (L.current = x, F.current && w.current) {
      const { time: N, pointer: tt } = F.current;
      w.current.scrollLeft = R0(N, At, tt), F.current = null;
    }
  }, [x, At]), G.useEffect(() => {
    const N = w.current;
    if (!N || !it) return;
    const tt = (ut) => Gl.current(ut);
    return N.addEventListener("wheel", tt, { passive: !1 }), () => N.removeEventListener("wheel", tt);
  }, [it]);
  const ra = Math.max(1, Nt * At), ne = G.useMemo(() => mg(Nt, At), [Nt, At]), He = G.useCallback(() => {
    const N = w.current;
    if (!N) return;
    const tt = cg(
      N.scrollLeft + U,
      Math.max(0, N.clientWidth - U),
      U,
      At,
      Nt
    );
    Ft(tt), Yt?.(tt);
  }, [Nt, U, Yt, At]);
  G.useEffect(() => {
    He();
  }, [He, oa]), G.useEffect(() => {
    Ht?.($);
    const N = w.current;
    if (!N || !kl || !pt) return;
    const tt = U + $ * At, ut = N.scrollLeft + N.clientWidth, ol = Math.min(180, N.clientWidth * 0.2);
    tt > ut - ol ? N.scrollLeft = Math.max(0, tt - N.clientWidth + ol) : tt < N.scrollLeft + U && (N.scrollLeft = Math.max(0, tt - U - ol));
  }, [$, kl, pt, U, Ht, At]);
  const La = (N) => {
    if (Nt <= 0 || N.target.closest(".rts-label, a, button, input, select, textarea")) return;
    const tt = w.current, ut = k.current;
    if (!tt || !ut) return;
    const ol = tt.getBoundingClientRect(), It = N.clientX - ol.left + tt.scrollLeft - U;
    if (It < 0) return;
    const Sl = sa(It / At, 0, Nt);
    q.seek(Sl);
  }, ie = (N, tt) => {
    const ut = w.current;
    if (N = sa(N, 0, 100), N !== L.current) {
      if (ut) {
        const ol = Math.max(1, ut.clientWidth - U), It = tt === void 0 ? ol / 2 : sa(tt - ut.getBoundingClientRect().left - U, 0, ol), Sl = F.current, pl = _t * Math.pow(2, L.current / 18), rl = Sl ? R0(Sl.time, pl, Sl.pointer) : ut.scrollLeft;
        F.current = { time: (rl + It) / pl, pointer: It };
      }
      L.current = N, V(N);
    }
  };
  Gl.current = (N) => {
    const tt = w.current, ut = N.target instanceof Element ? N.target : null;
    if (!tt || !ut || ut.closest("input, select, textarea, button, [contenteditable=true]")) return;
    const ol = Math.abs(N.deltaX) > Math.abs(N.deltaY) ? N.deltaX : N.deltaY, It = eg(ol, N.deltaMode, tt.clientWidth - U);
    if (It)
      if (N.ctrlKey || N.metaKey) {
        if (Nt <= 0) return;
        N.preventDefault(), N.stopPropagation(), m(!1), ie(ag(L.current, It), N.clientX);
      } else if (N.altKey) {
        const Sl = ut.closest("[data-lane-id]")?.dataset.laneId, pl = z.find((rl) => rl.id === Sl);
        if (!nt || !pl) return;
        N.preventDefault(), N.stopPropagation(), ot((rl) => ({
          ...rl,
          [pl.id]: ug(rl[pl.id] ?? Cn(pl.height), It)
        }));
      } else
        N.preventDefault(), N.stopPropagation(), N.shiftKey ? tt.scrollTop += It : (m(!1), tt.scrollLeft += It);
  };
  const Uu = () => {
    if (!st || !w.current) return;
    const N = Math.max(320, oa - U - 16) / (st.duration * 1.1), tt = sa(18 * Math.log2(N / _t), 0, 100);
    F.current = null, L.current = tt, V(tt);
    const ut = _t * Math.pow(2, tt / 18);
    requestAnimationFrame(() => {
      w.current && (w.current.scrollLeft = Math.max(0, (st.start - st.duration * 0.05) * ut));
    });
  }, Xa = () => {
    const N = Number(k.current?.duration) || 0;
    Number.isFinite(N) && N > 0 && (I(N), Et?.(N));
  };
  return /* @__PURE__ */ E.jsxs(
    "section",
    {
      className: `rts-sequence ${nt ? "rts-display-controls" : ""} ${_}`,
      style: { "--rts-label-width": `${U}px`, "--rts-track-width": `${ra}px` },
      children: [
        /* @__PURE__ */ E.jsxs("header", { className: "rts-toolbar", children: [
          /* @__PURE__ */ E.jsxs("div", { className: "rts-ident", children: [
            /* @__PURE__ */ E.jsx("strong", { children: y }),
            O && /* @__PURE__ */ E.jsx("span", { children: O })
          ] }),
          /* @__PURE__ */ E.jsxs("div", { className: "rts-transport", "aria-label": "Timeline playback controls", children: [
            /* @__PURE__ */ E.jsx("button", { type: "button", className: "rts-button rts-play", onClick: q.toggle, "aria-label": pt || q.loading ? "Pause" : "Play", children: q.loading ? "…" : pt ? "❚❚" : "▶" }),
            /* @__PURE__ */ E.jsxs("output", { className: "rts-time", "aria-live": "off", children: [
              qa($),
              " / ",
              qa(Nt)
            ] }),
            /* @__PURE__ */ E.jsx("button", { type: "button", className: "rts-button", onClick: () => ie(0), children: "Fit" }),
            /* @__PURE__ */ E.jsxs("label", { className: "rts-control", children: [
              /* @__PURE__ */ E.jsx("span", { children: "Zoom" }),
              /* @__PURE__ */ E.jsx("input", { "aria-label": "Timeline zoom", type: "range", min: "0", max: "100", value: x, onChange: (N) => ie(Number(N.target.value)) })
            ] }),
            /* @__PURE__ */ E.jsxs("label", { className: "rts-control", children: [
              /* @__PURE__ */ E.jsx("input", { type: "checkbox", checked: kl, onChange: (N) => m(N.target.checked) }),
              /* @__PURE__ */ E.jsx("span", { children: "Follow" })
            ] })
          ] }),
          /* @__PURE__ */ E.jsx("div", { className: "rts-header-end", children: B }),
          X.length > 0 && /* @__PURE__ */ E.jsxs("div", { className: "rts-loop-controls", "aria-label": "Loop controls", children: [
            /* @__PURE__ */ E.jsxs("label", { children: [
              "Loop ",
              /* @__PURE__ */ E.jsxs("select", { "aria-label": "Select loop", value: rt ?? "", onChange: (N) => bl(N.target.value), children: [
                /* @__PURE__ */ E.jsx("option", { value: "", children: "Choose a loop…" }),
                X.map((N) => /* @__PURE__ */ E.jsx("option", { value: N.id, children: N.label || N.id }, N.id))
              ] })
            ] }),
            /* @__PURE__ */ E.jsxs("label", { children: [
              /* @__PURE__ */ E.jsx("input", { type: "checkbox", "aria-label": "Enable loop", disabled: !C, checked: kt && !!C, onChange: (N) => Wl(N.target.checked) }),
              "Enable loop"
            ] }),
            /* @__PURE__ */ E.jsx("button", { type: "button", className: "rts-button", disabled: !C, onClick: Uu, children: "Zoom to loop" }),
            C && /* @__PURE__ */ E.jsxs("output", { children: [
              C.startSample.toLocaleString(),
              " → ",
              C.endSample.toLocaleString(),
              " samples (end exclusive) · ",
              C.sampleRate.toLocaleString(),
              " Hz"
            ] }),
            C?.downloadUrl && /* @__PURE__ */ E.jsx("a", { href: C.downloadUrl, download: !0, children: "Download loop WAV" }),
            /* @__PURE__ */ E.jsx("span", { className: "rts-loop-status", role: "status", children: q.loading ? "Loading loop…" : kt && C ? "Loop enabled · Play repeats selection" : "Full-song playback" })
          ] }),
          q.error && /* @__PURE__ */ E.jsx("div", { role: "alert", className: "rts-loop-error", children: q.error })
        ] }),
        /* @__PURE__ */ E.jsx(
          "audio",
          {
            ref: k,
            src: f,
            preload: Ut,
            crossOrigin: Ot,
            onLoadedMetadata: Xa,
            onEnded: q.ended,
            onError: () => q.fail(new Error(k.current?.error?.message || "Audio playback failed"))
          }
        ),
        /* @__PURE__ */ E.jsx("div", { className: "rts-workspace", children: /* @__PURE__ */ E.jsx("div", { ref: w, className: "rts-scroller", onScroll: He, onClick: La, children: /* @__PURE__ */ E.jsxs("div", { className: "rts-inner", children: [
          /* @__PURE__ */ E.jsxs("div", { className: "rts-ruler-row", children: [
            /* @__PURE__ */ E.jsx("div", { className: "rts-label rts-ruler-label", children: "TIME" }),
            /* @__PURE__ */ E.jsx("div", { className: "rts-ruler-track", children: ne.map((N) => /* @__PURE__ */ E.jsx("span", { className: `rts-tick ${N.major ? "rts-tick-major" : ""}`, style: { left: `${N.time * At}px` }, children: N.major && /* @__PURE__ */ E.jsx("span", { className: "rts-tick-label", children: vg(N.time, At) }) }, N.time)) })
          ] }),
          X.length > 0 && /* @__PURE__ */ E.jsxs("div", { className: "rts-lane rts-lane-loops", children: [
            /* @__PURE__ */ E.jsxs("div", { className: "rts-label", children: [
              /* @__PURE__ */ E.jsx("div", { className: "rts-title", children: "LOOPS" }),
              /* @__PURE__ */ E.jsx("div", { className: "rts-meta", children: "Select a region, enable, then Play" })
            ] }),
            /* @__PURE__ */ E.jsx("div", { className: "rts-track", children: X.map((N) => {
              const tt = Ya(N);
              return /* @__PURE__ */ E.jsx(
                "button",
                {
                  type: "button",
                  className: "rts-loop-region",
                  "aria-pressed": rt === N.id,
                  "aria-label": `Select ${N.label || N.id}`,
                  onClick: () => bl(N.id),
                  title: `${N.label || N.id}: [${N.startSample}, ${N.endSample}) at ${N.sampleRate} Hz`,
                  style: { left: `${tt.start * At}px`, width: `${tt.duration * At}px` },
                  children: N.label || N.id
                },
                N.id
              );
            }) })
          ] }),
          st && /* @__PURE__ */ E.jsx(
            "div",
            {
              className: `rts-loop-shade ${kt ? "" : "is-disabled"}`,
              "aria-hidden": "true",
              style: { left: `${U + st.start * At}px`, width: `${st.duration * At}px` }
            }
          ),
          /* @__PURE__ */ E.jsx("div", { className: "rts-lanes", children: z.map((N) => {
            const tt = N.content, ut = tt.type === "audio" ? tt : null, ol = gt[N.id] ?? ut?.view ?? "both", It = ut ? Y0(ol, !!ut.waveform, !!ut.spectrogram) : "both", Sl = nt ? K[N.id] ?? Cn(N.height) : N.height, pl = typeof N.title == "string" ? N.title : N.id;
            return /* @__PURE__ */ E.jsxs(
              "div",
              {
                "data-lane-id": N.id,
                className: `rts-lane rts-lane-${N.kind ?? "default"} ${N.className ?? ""}`,
                style: Sl ? { "--rts-lane-height": `${Sl}px` } : void 0,
                children: [
                  /* @__PURE__ */ E.jsxs("div", { className: "rts-label", children: [
                    /* @__PURE__ */ E.jsx("div", { className: "rts-title", children: N.title }),
                    N.meta && /* @__PURE__ */ E.jsx("div", { className: "rts-meta", children: N.meta }),
                    nt && /* @__PURE__ */ E.jsxs("div", { className: "rts-lane-controls", children: [
                      ut && /* @__PURE__ */ E.jsxs("label", { children: [
                        "View ",
                        /* @__PURE__ */ E.jsxs(
                          "select",
                          {
                            "aria-label": `View for ${pl}`,
                            value: It,
                            onChange: (rl) => bt((da) => ({ ...da, [N.id]: rl.target.value })),
                            children: [
                              /* @__PURE__ */ E.jsx("option", { value: "waveform", disabled: !ut.waveform, children: "Waveform" }),
                              /* @__PURE__ */ E.jsx("option", { value: "spectrogram", disabled: !ut.spectrogram, children: "Spectrogram" }),
                              /* @__PURE__ */ E.jsx("option", { value: "both", disabled: !ut.waveform || !ut.spectrogram, children: "Both" })
                            ]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ E.jsxs("label", { children: [
                        "Height ",
                        /* @__PURE__ */ E.jsx(
                          "input",
                          {
                            type: "range",
                            min: B0,
                            max: q0,
                            step: "1",
                            "aria-label": `Height for ${pl}`,
                            value: Sl,
                            onChange: (rl) => ot((da) => ({ ...da, [N.id]: Cn(Number(rl.target.value)) }))
                          }
                        ),
                        /* @__PURE__ */ E.jsxs("output", { children: [
                          Sl,
                          "px"
                        ] })
                      ] }),
                      /* @__PURE__ */ E.jsx(
                        "button",
                        {
                          type: "button",
                          className: "rts-height-reset",
                          "aria-label": `Reset height for ${pl}`,
                          onClick: () => ot((rl) => ({ ...rl, [N.id]: Cn(N.height) })),
                          children: "Reset height"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ E.jsx("div", { className: "rts-track", children: ut ? /* @__PURE__ */ E.jsx(rg, { content: ut, duration: Nt, view: It }) : /* @__PURE__ */ E.jsx(Ks, { content: tt, duration: Nt }) })
                ]
              },
              N.id
            );
          }) }),
          H.length > 0 && /* @__PURE__ */ E.jsx("div", { className: "rts-grid", "aria-hidden": "true", children: H.map((N, tt) => /* @__PURE__ */ E.jsx("span", { className: `rts-grid-line ${N.emphasis ? "rts-grid-line-emphasis" : ""} ${N.className ?? ""}`, style: { left: `${N.time * At}px` } }, `${N.time}-${tt}`)) }),
          /* @__PURE__ */ E.jsx("div", { className: "rts-playhead", style: { left: `${U + $ * At}px` }, "aria-hidden": "true" })
        ] }) }) }),
        /* @__PURE__ */ E.jsxs("footer", { className: "rts-footer", children: [
          /* @__PURE__ */ E.jsxs("div", { children: [
            j,
            it && /* @__PURE__ */ E.jsx("div", { className: "rts-navigation-help", children: "Wheel: time · Ctrl/⌘ + wheel: time zoom · Alt + wheel: channel height · Shift + wheel: channel scroll" })
          ] }),
          /* @__PURE__ */ E.jsxs("output", { className: "rts-window", children: [
            qa(Ml.start),
            " — ",
            qa(Ml.end)
          ] })
        ] })
      ]
    }
  );
}
const Zs = /\.(wav|flac|mp3|ogg|opus|m4a|aif|aiff)$/i;
function j0(f) {
  return f === "__source__" || f.startsWith("input/") ? "master" : f.startsWith("stems/") ? f.slice(6).replace(Zs, "") : f.startsWith("speech/") && Zs.test(f) ? f.replace(Zs, "") : null;
}
function yg(f) {
  const v = /* @__PURE__ */ new Map(), o = [], s = /* @__PURE__ */ new Map();
  for (const y of f) for (const O of Array.isArray(y.sourceMap) ? y.sourceMap : [])
    if (typeof O?.audio == "string" && typeof O.data == "string") {
      const D = j0(O.audio.replace(/\\/g, "/"));
      D && (s.set(O.data.replace(/\\/g, "/"), D), typeof O.png == "string" && s.set(O.png.replace(/\\/g, "/"), D));
    }
  const z = (y) => (v.has(y) || v.set(y, { key: y }), v.get(y));
  for (const y of f) {
    const O = (y.id?.replace(/^file:/, "") || "").replace(/\\/g, "/"), D = j0(O), H = O.startsWith("spectrograms/") ? s.get(O) || O.slice(13).replace(/\.(npz|png)$/i, "") : null;
    if (D && (y.content?.type === "waveform" || y.content?.type === "artifact")) {
      const B = z(D);
      (!B.audio || y.id === "__source__") && (B.audio = y);
    } else H && O.endsWith(".npz") && y.content?.type === "image" ? z(H).spectrum = y : H && O.endsWith(".png") && y.content?.type === "image" ? z(H).png = y : o.push(y);
  }
  for (const y of v.values()) {
    if (!y.audio && !y.spectrum) {
      y.png && o.push(y.png);
      continue;
    }
    const O = y.audio || y.spectrum, D = y.audio?.content?.type === "waveform" ? y.audio.content : null, H = y.audio?.content?.type === "artifact" ? y.audio.content.note : null;
    o.push({
      ...O,
      id: y.key === "master" ? "__source__" : `audio:${y.key}`,
      title: y.key === "master" ? "MASTER · uploaded source" : y.key.replace(/\//g, " · ").replace(/_/g, " "),
      kind: "audio",
      height: 160,
      meta: H || (D && y.spectrum ? "waveform + aligned spectrogram" : D ? "waveform · spectrogram pending" : "spectrogram · waveform pending"),
      content: {
        type: "audio",
        view: "both",
        waveform: D ? { min: D.min, max: D.max, colour: D.colour } : void 0,
        spectrogram: y.spectrum ? { src: y.spectrum.content.src, alt: y.spectrum.content.alt } : void 0
      }
    }), !y.spectrum && y.png && o.push(y.png);
  }
  return o;
}
const Js = (f) => typeof f == "number" && Number.isFinite(f) && f > 0, gg = { canonical: "Canonical", combined: "Consensus · observed tempo", combined_family: "Consensus · canonical tempo family", combined_fit: "Consensus · fitted constant grid" };
function H0(f, v, o, s) {
  if (!Js(f) || !Number.isFinite(v) || v < 0 || !Number.isFinite(o) || o <= 0) return [];
  const z = Math.max(0, Math.floor((o - v) * f / 60 + 1e-9) + 1), y = Math.max(1, Math.ceil(z / 25e3));
  return Array.from({ length: Math.ceil(z / y) }, (O, D) => {
    const H = D * y;
    return {
      time: v + H * 60 / f,
      emphasis: H === 0,
      label: `${s === "original" ? "Original" : "Aligned"} beat ${H + 1}${H === 0 && s === "aligned" ? " · pip 0" : ""}`,
      className: `stemlab-grid-${s}`
    };
  });
}
function bg(f, v, o, s = "canonical", z = "consensus") {
  const y = f?.schema === "stemlab.beat-offsets.v1" && f.pips_per_beat === 64;
  let O = y ? (f.bpm_bases || []).filter((Q) => Q.status === "available" && Js(Q.bpm)) : [];
  !O.length && Js(v) && (O = [{ id: "canonical", bpm: v }]);
  const D = O.find((Q) => Q.id === s) || O.find((Q) => Q.id === "combined_fit") || O[0] || null, H = y ? (f.analyses || []).filter((Q) => Q.status === "available") : [], B = H.find((Q) => Q.analysis_id === z) || H.find((Q) => Q.kind === "consensus") || H[0] || null, j = D && B ? f.comparisons?.find((Q) => Q.status === "available" && Q.bpm_basis === D.id && Q.analysis_id === B.analysis_id) : null, _ = D ? H0(D.bpm, 0, o, "original") : [], U = j && Number.isFinite(j.beat_zero_seconds) ? H0(j.bpm, j.beat_zero_seconds, o, "aligned") : [];
  return {
    bases: O.map((Q) => ({ ...Q, label: `${gg[Q.id] || Q.id}${Q.multiplier ? ` ×${Q.multiplier}` : ""} · ${Q.bpm.toFixed(4)} BPM` })),
    basis: D,
    analysis: B,
    analyses: H,
    row: j,
    original: _,
    aligned: U,
    thinned: !!D && Math.floor(o * D.bpm / 60) + 1 > 25e3,
    grid: [..._, ...U].sort((Q, nt) => Q.time - nt.time)
  };
}
function Sg({ comparison: f, onBasis: v, onAnalysis: o }) {
  const { bases: s, basis: z, analyses: y, analysis: O, row: D, thinned: H } = f;
  return /* @__PURE__ */ E.jsxs("section", { className: "stemlab-beat-offset-controls", "aria-label": "BPM grid comparison", children: [
    /* @__PURE__ */ E.jsxs("div", { className: "stemlab-beat-offset-selectors", children: [
      /* @__PURE__ */ E.jsxs("label", { children: [
        "BPM grid ",
        /* @__PURE__ */ E.jsxs("select", { "aria-label": "BPM grid basis", value: z?.id || "", onChange: (B) => v(B.target.value), disabled: !s.length, children: [
          !s.length && /* @__PURE__ */ E.jsx("option", { value: "", children: "BPM unavailable" }),
          s.map((B) => /* @__PURE__ */ E.jsx("option", { value: B.id, children: B.label }, B.id))
        ] })
      ] }),
      /* @__PURE__ */ E.jsxs("label", { children: [
        "First beat from ",
        /* @__PURE__ */ E.jsxs("select", { "aria-label": "First beat analysis", value: O?.analysis_id || "", onChange: (B) => o(B.target.value), disabled: !y.length, children: [
          !y.length && /* @__PURE__ */ E.jsx("option", { value: "", children: "Detected beat unavailable" }),
          y.map((B) => /* @__PURE__ */ E.jsx("option", { value: B.analysis_id, children: B.analysis_id }, B.analysis_id))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ E.jsxs("p", { className: "stemlab-grid-legend", children: [
      /* @__PURE__ */ E.jsx("span", { className: "stemlab-legend-original", children: "Original grid · source time 0" }),
      /* @__PURE__ */ E.jsx("span", { className: "stemlab-legend-aligned", children: "Offset grid · detected first beat = pip 0" })
    ] }),
    /* @__PURE__ */ E.jsx("output", { "aria-live": "polite", "data-testid": "beat-offset-value", children: D ? `${D.offset_pips.toFixed(6)} pips · first detected beat ${D.first_beat_seconds.toFixed(6)}s · nearest whole offset ${D.integer_offset_pips} pips (${(D.integer_residual_seconds * 1e3).toFixed(3)} ms residual)` : "Waiting for usable beat evidence; no aligned grid is inferred." }),
    O?.constant_grid_fit && /* @__PURE__ */ E.jsxs("p", { className: "small", children: [
      "Selected detector fit: ",
      O.constant_grid_fit.proposed_bpm.toFixed(4),
      " BPM · 95% beat error ",
      O.constant_grid_fit.p95_absolute_beat_error_ms.toFixed(3),
      " ms · grade ",
      O.constant_grid_fit.precision_grade,
      ".",
      z?.fit ? ` Consensus grid fit grade: ${z.fit.precision_grade}.` : ""
    ] }),
    /* @__PURE__ */ E.jsxs("p", { className: "small", children: [
      "Half- and double-time readings are normal. Observed beats stay in their own lanes; tempo-family options compare ×½ / ×1 / ×2 interpretations. Constant grids and detector phases remain estimates.",
      H ? " Dense grids are thinned for display only." : ""
    ] })
  ] });
}
function pg(f, v) {
  if (!f || f.schema !== "stemlab.loops.v1") return [];
  const o = f.sample_rate;
  return !Number.isSafeInteger(o) || o <= 0 ? [] : (f.loops || []).flatMap((s) => {
    if (!/^(verse|chorus)-\d+-\d+$/.test(s.id) || !Number.isSafeInteger(s.start_sample) || !Number.isSafeInteger(s.end_sample) || s.start_sample < 0 || s.end_sample <= s.start_sample || s.end_sample > f.source_frames) return [];
    const z = encodeURIComponent(`${f.source_sha256}:${s.start_sample}:${s.end_sample}`);
    return [{
      id: s.id,
      label: `${s.section_label} · ${s.bars} bar${s.bars === 1 ? "" : "s"}`,
      startSample: s.start_sample,
      endSample: s.end_sample,
      sampleRate: o,
      // Exact native-rate PCM excerpt, computed read-only whether or not --export-loops was used.
      audioSrc: `/api/${v}/loops/${encodeURIComponent(s.id)}/audio?v=${z}`,
      downloadUrl: s.file && /^audio\/[a-zA-Z0-9._-]+\.wav$/.test(s.file) ? `/${v}/deep/loops/${s.file.split("/").map(encodeURIComponent).join("/")}` : void 0
    }];
  });
}
function _g(f) {
  const [v, o] = G.useState({ report: null, error: "" });
  G.useEffect(() => {
    let z = !0, y, O = "";
    const D = new AbortController();
    o({ report: null, error: "" });
    const H = async () => {
      try {
        const B = await fetch(`/${f}/deep/loops/loops.json`, {
          cache: "no-store",
          signal: D.signal
        });
        if (!z) return;
        if (B.status === 404)
          O = "", o({ report: null, error: "" });
        else {
          if (!B.ok) throw new Error(`Loop report: HTTP ${B.status}`);
          const j = await B.json();
          if (j.schema === "stemlab.loop-availability.v1" && j.status === "not-analysed") {
            o({ report: null, error: "", note: j.reason });
            return;
          }
          if (j.schema !== "stemlab.loops.v1") throw new Error("Unsupported loop report schema");
          const _ = JSON.stringify(j);
          z && _ !== O && (o({ report: j, error: "" }), O = _);
        }
      } catch (B) {
        z && B.name !== "AbortError" && (O = "", o({ report: null, error: B.message }));
      } finally {
        z && (y = window.setTimeout(H, 2500));
      }
    };
    return H(), () => {
      z = !1, D.abort(), window.clearTimeout(y);
    };
  }, [f]);
  const s = G.useMemo(() => pg(v.report, f), [v.report, f]);
  return { ...v, loops: s };
}
function Tg({ state: f, hash: v }) {
  const o = f.report;
  return f.error ? /* @__PURE__ */ E.jsx("p", { role: "alert", className: "stemlab-loop-summary", children: f.error }) : f.note ? /* @__PURE__ */ E.jsx("p", { className: "stemlab-loop-summary", children: f.note }) : o ? /* @__PURE__ */ E.jsxs("details", { className: "stemlab-loop-summary", open: o.unresolved_sections.length > 0, children: [
    /* @__PURE__ */ E.jsxs("summary", { children: [
      o.loop_count,
      " loop(s) · ",
      o.unresolved_sections.length,
      " unresolved section(s) · ",
      /* @__PURE__ */ E.jsx("a", { href: `/${v}/deep/loops/loops.json`, target: "_blank", rel: "noopener", children: "Sample report" })
    ] }),
    /* @__PURE__ */ E.jsx("p", { children: "Choose a loop region or use the Loop selector, tick Enable loop, then press Play. Previewing writes no files." }),
    o.unresolved_sections.map((s) => /* @__PURE__ */ E.jsxs("p", { children: [
      /* @__PURE__ */ E.jsxs("strong", { children: [
        s.label,
        ":"
      ] }),
      " ",
      s.reason
    ] }, s.index))
  ] }) : /* @__PURE__ */ E.jsxs("p", { className: "stemlab-loop-summary", children: [
    "No loop report yet. New analyses discover loops automatically; for existing results run ",
    /* @__PURE__ */ E.jsx("code", { children: "stemlab loops RESULTS_DIR" }),
    "."
  ] });
}
const ml = (f) => document.querySelector(f), Eg = ml("#uploadView"), ks = ml("#timelineView"), Ga = ml("#dropZone"), Dn = ml("#fileInput"), Q0 = ml("#chooseButton"), Z0 = ml("#uploadProgressWrap"), uc = ml("#uploadProgress"), nc = ml("#uploadLabel"), xu = ml("#connectionBadge"), V0 = ml("#canonicalBpm"), w0 = ml("#canonicalLyrics"), K0 = ml("#canonicalTiming"), $s = ml("#knownInfoStatus"), Ng = ml("#loadArcadiansReference"), zg = ml("#loadArcadiansHero"), Og = Array.from(ks.children), Is = document.createElement("div");
Is.id = "timelineRoot";
ks.replaceChildren(Is);
for (const f of Og) f.remove();
const Mg = lg.createRoot(Is), Ag = /* @__PURE__ */ new Set(["wav", "flac", "mp3", "ogg", "opus", "m4a", "aif", "aiff"]);
let Fs = {};
function Cg(f) {
  const v = String(f).split("/").pop() || "", o = v.lastIndexOf(".");
  return o >= 0 ? v.slice(o + 1).toLowerCase() : "";
}
function be(f) {
  return String(f).replace(/^stems\//, "").replace(/^spectrograms\//, "").replace(/^vamp\/data\//, "Vamp · ").replace(/^beats\//, "Beats · ").replace(/^speech\//, "Speech · ").replace(/^deep\//, "Deep · ").replace(/[_-]+/g, " ");
}
function Ps(f, v) {
  return `/${f}/${v.split("/").map(encodeURIComponent).join("/")}`;
}
function ic(f, v, o = "Generated analysis artifact") {
  return { type: "artifact", note: o, href: v === "__source__" ? `/api/${f}/source` : Ps(f, v) };
}
async function Fl(f, v) {
  const o = await fetch(Ps(f, v), { cache: "no-store" });
  if (!o.ok) throw new Error(`HTTP ${o.status}`);
  return o.json();
}
function ue(f, v = 2, o = "") {
  const s = Number(f);
  return Number.isFinite(s) ? `${s.toFixed(v)}${o}` : "—";
}
function Ba(f, v, o, s, z = "feature") {
  const y = s.filter(([, O]) => O != null && O !== "");
  return {
    id: f,
    title: v,
    meta: o,
    kind: z,
    content: {
      type: "summary",
      items: (y.length ? y : [["status", "analysis available"]]).map(([O, D]) => ({ label: O, value: D }))
    }
  };
}
function cc(f) {
  return (f || []).flatMap((v) => {
    const o = Number(v.start);
    if (!Number.isFinite(o)) return [];
    const s = Number(v.end);
    return [{
      start: o,
      end: Number.isFinite(s) && s > o ? s : o + 0.5,
      label: v.label || v.text || v.values?.[0] || ""
    }];
  });
}
function Dg(f) {
  const v = Array.isArray(f.events) ? f.events : [];
  switch (String(f.kind || "")) {
    case "curve":
      return { type: "curve", points: v.flatMap((o) => {
        const s = Number(o.start), z = Number(o.values?.[0]);
        return Number.isFinite(s) && Number.isFinite(z) && z > 0 ? [{ time: s, value: z }] : [];
      }) };
    case "matrix":
      return { type: "matrix", rows: v.map((o) => o.values || []).filter((o) => o.length) };
    case "notes":
      return { type: "notes", items: v.flatMap((o) => {
        const s = Number(o.values?.[0]), z = Number(o.start);
        if (!Number.isFinite(s) || s <= 0 || !Number.isFinite(z)) return [];
        const y = Number(o.end);
        return [{ start: z, end: Number.isFinite(y) && y > z ? y : z + 0.12, value: s, label: o.label }];
      }) };
    case "segments":
      return { type: "blocks", items: cc(v) };
    case "events":
      return { type: "markers", items: v.flatMap((o) => Number.isFinite(Number(o.start)) ? [{ time: Number(o.start) }] : []) };
    default:
      return { type: "artifact", note: v[0]?.label || v[0]?.values?.join(", ") || f.title || "analysis" };
  }
}
async function J0(f, v, o, s, z) {
  const y = new URLSearchParams({ path: z, points: "12000" }), O = await fetch(`/api/${f}/waveform?${y}`);
  if (!O.ok) return { id: v, title: o, meta: s, kind: "artifact", content: ic(f, z, `waveform unavailable (${O.status})`) };
  const D = await O.json();
  return { id: v, title: o, meta: s, kind: "waveform", content: { type: "waveform", min: D.min || [], max: D.max || [] }, duration: Number(D.duration_seconds) || 0 };
}
async function xg(f, v) {
  const o = v.path, s = `file:${o}`, z = Cg(o);
  if (o === "canonical.json" || o.startsWith("deep/loops/")) return null;
  if (Ag.has(z)) return J0(f, s, be(o), "audio waveform", o);
  if (o.startsWith("spectrograms/") && z === "npz") {
    const y = new URLSearchParams({ path: o, max_width: "8192", max_height: "768" });
    return { id: s, title: be(o), meta: "spectrogram data · exact song timeline", kind: "spectrogram", content: { type: "image", src: `/api/${f}/spectrogram?${y}`, alt: `${be(o)} spectrogram` } };
  }
  if (o.startsWith("spectrograms/") && z === "png")
    return { id: s, title: be(o), meta: "rendered spectrogram PNG", kind: "image", content: { type: "image", src: Ps(f, o), alt: `${be(o)} rendered spectrogram` } };
  try {
    if (o === "analysis.json") {
      const y = await Fl(f, o);
      return {
        id: s,
        title: be(o),
        meta: "analysis provenance",
        kind: "artifact",
        sourceMap: y.spectrograms || [],
        content: ic(f, o)
      };
    }
    if (o.startsWith("beats/") && z === "json") {
      const y = await Fl(f, o), O = new Set((y.downbeats || []).map((D) => Number(D).toFixed(3)));
      return { id: s, title: be(o), meta: "beat / downbeat events", kind: "events", content: { type: "markers", items: (y.beats || []).flatMap((D) => {
        const H = Number(D);
        return Number.isFinite(H) ? [{ time: H, emphasis: O.has(H.toFixed(3)), label: O.has(H.toFixed(3)) ? "Downbeat" : "Beat" }] : [];
      }) } };
    }
    if (o.startsWith("vamp/data/") && z === "json") {
      const y = await Fl(f, o);
      return { id: s, title: be(o), meta: "Vamp feature analysis", kind: "feature", content: Dg(y) };
    }
    if (o === "speech/whisper.json") {
      const y = await Fl(f, o);
      return { id: s, title: "Speech · Whisper words", meta: "word-aligned transcript", kind: "words", content: { type: "blocks", items: (y.words || []).flatMap((O) => {
        const D = Number(O.start), H = Number(O.end);
        return Number.isFinite(D) ? [{ start: D, end: Number.isFinite(H) ? Math.max(D + 0.03, H) : D + 0.03, label: String(O.word || "").trim() }] : [];
      }) } };
    }
    if (o === "deep/structure/structure.json" || o === "deep/song_map/song_map.json") {
      const y = await Fl(f, o), O = o.includes("song_map");
      return { id: s, title: O ? "Deep · song map" : "Deep · functional structure", meta: O ? "section-level sonic / rhythm / harmony / lyric fusion" : "All-In-One · functional song sections", kind: "deep-structure", content: { type: "blocks", items: cc(O ? y.sections : y.segments) } };
    }
    if (o === "deep/harmony/harmony.json") {
      const y = await Fl(f, o), O = y.chords?.collapsed_progression || [];
      return O.length ? { id: s, title: "Deep · harmony", meta: "collapsed chord progression + key evidence", kind: "deep-harmony", content: { type: "blocks", items: cc(O) } } : Ba(s, "Deep · harmony", "collapsed chord progression + key evidence", [["key", y.vamp_key || y.independent_key_candidates_from_nnls_chroma?.[0]?.key || "—"], ["tuning", y.tuning_hz ? `${Number(y.tuning_hz).toFixed(1)} Hz` : "—"]], "deep-harmony");
    }
    if (o === "deep/lyrics/lyrics.json") {
      const y = await Fl(f, o), O = (y.lines || []).filter((D) => Number.isFinite(Number(D.start)) && Number.isFinite(Number(D.end)));
      return O.length ? { id: s, title: "Deep · rhyme & prosody", meta: "phonetic rhyme, repetition and delivery", kind: "deep-lyrics", content: { type: "blocks", items: cc(O) } } : Ba(s, "Deep · rhyme & prosody", "phonetic rhyme, repetition and delivery", [["rhyme scheme", y.rhyme?.scheme || "—"], ["lines", y.line_count ?? "—"], ["words", y.word_count ?? "—"]], "deep-lyrics");
    }
    if (o === "deep/sonic/sonic.json") {
      const y = await Fl(f, o);
      return Ba(s, "Deep · sonic profile", "loudness · dynamics · timbre · stereo", [["LUFS", ue(y.loudness?.integrated_lufs_bs1770, 1)], ["crest", ue(y.loudness?.crest_factor_db, 1, " dB")], ["RMS range", ue(y.loudness?.short_term_rms_range_db_p95_p10, 1, " dB")], ["centroid", ue(y.timbre?.spectral_centroid_hz_mean, 0, " Hz")], ["stereo corr", ue(y.stereo?.left_right_correlation, 2)]]);
    }
    if (o === "deep/rhythm/rhythm.json") {
      const y = await Fl(f, o);
      return Ba(s, "Deep · groove", "meter · stability · swing · syncopation evidence", [["tempo", ue(y.tempo?.median_bpm, 2, " BPM")], ["meter", y.meter?.estimated_beats_per_bar ? `${y.meter.estimated_beats_per_bar}/4-ish` : "—"], ["swing", ue(y.groove?.swing_ratio_long_to_short, 2, ":1")], ["offbeat energy", ue(y.groove?.offbeat_onset_energy_ratio, 3)], ["onsets/s", ue(y.groove?.onset_density_per_second, 2)]]);
    }
    if (o === "deep/semantic_text/semantic_text.json") {
      const y = await Fl(f, o);
      return Ba(s, "Deep · lyric semantics", "sentence embedding theme similarities · not probabilities", (y.theme_similarity || []).slice(0, 7).map((O) => [O.theme, ue(O.similarity, 3)]));
    }
    if (o === "deep/semantic_audio/semantic_audio.json") {
      const y = await Fl(f, o), O = Object.entries(y.prompt_sets || {}).flatMap(([D, H]) => (H || []).slice(0, 2).map((B) => [`${D}: ${B.prompt}`, ue(B.similarity, 3)]));
      return Ba(s, "Deep · audio semantics", "MuQ-MuLan zero-shot similarities · CC-BY-NC weights", O);
    }
    if (o === "deep/summary.json") {
      const y = await Fl(f, o), O = Object.entries(y.analyses || {}).map(([D, H]) => [D, H.available ? "ready" : "unavailable"]);
      return (y.errors || []).length && O.push(["errors", y.errors.length]), Ba(s, "Deep · analysis summary", "cross-domain action inventory", O);
    }
  } catch (y) {
    return { id: s, title: be(o), meta: "analysis artifact", kind: "artifact", content: ic(f, o, y.message) };
  }
  return { id: s, title: be(o), meta: `${z || "file"} · ${Number(v.bytes || 0).toLocaleString()} bytes`, kind: "artifact", content: ic(f, o) };
}
function Ug(f) {
  const v = [];
  f?.lyrics && v.push({ id: "canonical:lyrics", title: "Canonical lyrics", meta: "known reference text", kind: "canonical-lyrics", height: 104, content: { type: "text", text: f.lyrics } });
  const o = Array.isArray(f?.lyric_timing) ? f.lyric_timing : [];
  return o.length && v.push({ id: "canonical:timing", title: "Canonical lyric timing", meta: `${o.length} timed lyric event${o.length === 1 ? "" : "s"}`, kind: "canonical-timing", height: 104, content: { type: "blocks", items: o.flatMap((s) => {
    const z = Number(s.start), y = Number(s.end);
    return Number.isFinite(z) && z >= 0 ? [{ start: z, end: Number.isFinite(y) && y > z ? y : z + 0.75, label: String(s.text || ""), className: "stemlab-canonical-lyric" }] : [];
  }) } }), { lanes: v };
}
function Rg({ lines: f }) {
  return /* @__PURE__ */ E.jsxs("details", { open: !0, className: "stemlab-log", children: [
    /* @__PURE__ */ E.jsx("summary", { children: "Analysis log" }),
    /* @__PURE__ */ E.jsx("div", { className: "log", children: f.map((v, o) => /* @__PURE__ */ E.jsxs("div", { className: v.stream === "stderr" ? "stderr" : "stdout", children: [
      "[",
      v.stream,
      "] ",
      v.text
    ] }, o)) })
  ] });
}
function jg({ hash: f, filename: v }) {
  const o = _g(f), [s, z] = G.useState([]), [y, O] = G.useState(0), [D, H] = G.useState({ state: "submitted" }), [B, j] = G.useState({ bpm: null, lyrics: null, lyric_timing: [] }), [_, U] = G.useState(null), [Q, nt] = G.useState("canonical"), [it, at] = G.useState("consensus"), [Ut, Ot] = G.useState([]), Et = G.useRef(/* @__PURE__ */ new Set()), Ht = G.useCallback((ct, X) => {
    X && Ot((C) => [...C.slice(-799), { stream: ct === "stderr" ? "stderr" : "stdout", text: X }]);
  }, []), Yt = G.useCallback(async (ct) => {
    if (!ct?.path || Et.current.has(ct.path)) return;
    Et.current.add(ct.path);
    const X = await xg(f, ct);
    X && (X.duration && O((C) => C || X.duration), z((C) => C.some((q) => q.id === X.id) ? C : [...C, X]));
  }, [f]), Xt = G.useCallback(async () => {
    const ct = await fetch(`/api/${f}/timeline`, { cache: "no-store" });
    if (!ct.ok) return;
    const X = await ct.json();
    H(X.status || { state: "submitted" }), X.duration_seconds && O(Number(X.duration_seconds)), X.canonical && j(X.canonical), U(X.beat_offsets || null);
    for (const C of X.files || []) Yt(C);
  }, [Yt, f]);
  G.useEffect(() => {
    Et.current = /* @__PURE__ */ new Set(), z([]), U(null), nt("canonical"), at("consensus"), J0(f, "__source__", "MASTER · uploaded source", v, "__source__").then((C) => {
      C.duration && O(C.duration), z((q) => [C, ...q.filter(($) => $.id !== C.id)]);
    }).catch((C) => Ht("stderr", C.message)), Xt();
    const ct = window.setInterval(() => {
      Xt();
    }, 2500);
    let X = null;
    return typeof window.io == "function" ? (X = window.io({ path: "/socket.io" }), X.on("connect", () => {
      xu.textContent = "live", xu.classList.remove("muted"), X.emit("subscribe", { hash: f });
    }), X.on("disconnect", () => {
      xu.textContent = "reconnecting", xu.classList.add("muted");
    }), X.on("process_output", (C) => Ht(C.stream || "stdout", C.line || "")), X.on("process_history", (C) => {
      for (const q of C.stdout || []) Ht("stdout", q);
      for (const q of C.stderr || []) Ht("stderr", q);
    }), X.on("new_file", (C) => {
      Yt(C);
    }), X.on("job_status", (C) => {
      H(C.status || {}), Xt();
    }), X.on("canonical_metadata", (C) => {
      C?.canonical && j(C.canonical);
    }), X.on("job_timeout", (C) => Ht("stderr", `Job timeout: ${C.message || "analysis exceeded timeout"}`))) : (xu.textContent = "polling", xu.classList.add("muted"), Ht("stderr", "Socket.IO browser client unavailable; timeline inventory polling remains active.")), () => {
      window.clearInterval(ct), X?.disconnect();
    };
  }, [Yt, Ht, v, f, Xt]);
  const k = G.useMemo(() => Ug(B), [B]), w = G.useMemo(() => bg(_, B.bpm, y, Q, it), [_, B.bpm, y, Q, it]), Nt = (ct) => ct.id === "__source__" ? 0 : ct.kind === "deep-structure" ? 10 : ct.kind === "events" ? 20 : ct.kind === "audio" ? 1 : ct.kind === "spectrogram" ? 30 : ct.kind === "waveform" ? 40 : 90, I = G.useMemo(() => yg(s), [s]), yt = [...w.basis ? [
    { id: "canonical:bpm", title: "BPM grid · original", meta: `${w.basis.bpm.toFixed(4)} BPM · source time 0`, kind: "canonical-bpm", height: 74, content: { type: "markers", items: w.original } },
    { id: "bpm:aligned", title: "BPM grid · offset", meta: w.row ? `${w.row.offset_pips.toFixed(6)} pips · ${w.analysis.analysis_id}` : "Waiting for detected first beat", kind: "canonical-bpm", height: 74, content: { type: "markers", items: w.aligned } }
  ] : [], ...k.lanes, ...[...I].sort((ct, X) => Nt(ct) - Nt(X) || ct.id.localeCompare(X.id))], kt = D.state || "submitted";
  return /* @__PURE__ */ E.jsx(
    hg,
    {
      className: "stemlab-timeline",
      laneControls: !0,
      wheelNavigation: !0,
      audioSrc: `/api/${f}/source`,
      duration: y,
      title: B.title || v,
      subtitle: f,
      loops: o.loops,
      lanes: yt,
      grid: w.grid,
      onDurationChange: O,
      onPlaybackError: (ct) => Ht("stderr", ct instanceof Error ? ct.message : String(ct)),
      headerEnd: /* @__PURE__ */ E.jsxs(E.Fragment, { children: [
        /* @__PURE__ */ E.jsx("span", { className: `badge ${kt}`, children: kt }),
        /* @__PURE__ */ E.jsxs("span", { className: "small", children: [
          yt.length,
          " lane",
          yt.length === 1 ? "" : "s"
        ] })
      ] }),
      footer: /* @__PURE__ */ E.jsxs(E.Fragment, { children: [
        /* @__PURE__ */ E.jsx(Sg, { comparison: w, onBasis: nt, onAnalysis: at }),
        /* @__PURE__ */ E.jsx(Tg, { state: o, hash: f }),
        /* @__PURE__ */ E.jsx(Rg, { lines: Ut }),
        /* @__PURE__ */ E.jsx("span", { className: "dock-links", children: /* @__PURE__ */ E.jsx("a", { href: "https://kieransimkin.co.uk/my-songs/", target: "_blank", rel: "noopener", children: "Kieran Simkin · My Songs ↗" }) })
      ] })
    }
  );
}
function Hg() {
  const f = V0?.value?.trim() || "", v = w0?.value || "", o = K0?.value || "";
  return { ...Fs, bpm: f ? Number(f) : null, lyrics: v.trim() || null, lyric_timing: o.trim() || [] };
}
function Bg(f) {
  return Number.isFinite(Number(f.bpm)) || !!f.lyrics || !!(typeof f.lyric_timing == "string" && f.lyric_timing.trim()) || !!(Array.isArray(f.lyric_timing) && f.lyric_timing.length);
}
async function qg(f) {
  const v = Hg();
  if (!Bg(v)) return;
  const o = await fetch(`/api/${f}/canonical`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(v) }), s = await o.json().catch(() => ({}));
  if (!o.ok) throw new Error(s.detail || `Could not save canonical metadata (${o.status})`);
  $s.textContent = "Known information saved with this song hash.";
}
function Yg(f) {
  return new Promise((v, o) => {
    const s = new XMLHttpRequest();
    s.open("PUT", `/upload/${encodeURIComponent(f.name)}`), s.setRequestHeader("Content-Type", f.type || "application/octet-stream"), s.upload.onprogress = (z) => {
      Z0.classList.remove("hidden");
      const y = z.lengthComputable ? z.loaded / z.total : 0;
      uc.style.width = `${Math.round(y * 100)}%`, nc.textContent = z.lengthComputable ? `${Math.round(y * 100)}% · ${(z.loaded / 1048576).toFixed(1)} / ${(z.total / 1048576).toFixed(1)} MiB` : `${(z.loaded / 1048576).toFixed(1)} MiB uploaded`;
    }, s.onerror = () => o(new Error("Upload failed")), s.onload = () => {
      let z = {};
      try {
        z = JSON.parse(s.responseText);
      } catch {
      }
      s.status < 200 || s.status >= 300 ? o(new Error(z.detail || `Upload failed (${s.status})`)) : v(z);
    }, s.send(f);
  });
}
async function $0(f, v) {
  Eg.classList.add("hidden"), ks.classList.remove("hidden"), Mg.render(/* @__PURE__ */ E.jsx(jg, { hash: f, filename: v || "uploaded audio" }, f));
}
async function F0(f) {
  if (f) {
    uc.style.width = "0%", nc.textContent = `Uploading ${f.name}`, Z0.classList.remove("hidden");
    try {
      const v = await Yg(f);
      uc.style.width = "100%", nc.textContent = "Upload complete · attaching to analysis", await qg(v.hash), await $0(v.hash, v.filename || f.name);
    } catch (v) {
      nc.textContent = v.message, uc.style.width = "0%";
    }
  }
}
async function W0(f) {
  f?.preventDefault(), f?.stopPropagation();
  try {
    const v = await fetch("/assets/arcadians-reference.json", { cache: "no-store" });
    if (!v.ok) throw new Error(`Could not load Arcadians reference (${v.status})`);
    const o = await v.json();
    Fs = {};
    for (const s of ["title", "artist", "release_date", "isrc", "upc", "website", "my_songs_url", "epk_url", "cover_art_url", "source_url", "sections"])
      o[s] !== void 0 && o[s] !== null && (Fs[s] = o[s]);
    V0.value = o.bpm ?? "", w0.value = o.lyrics ?? "", K0.value = Array.isArray(o.lyric_timing) && o.lyric_timing.length ? JSON.stringify(o.lyric_timing, null, 2) : "", ml(".known-info").open = !0, $s.textContent = o.lyric_timing?.length ? `Loaded ${o.title || "Arcadians"}: canonical release metadata, sections, ${o.bpm} BPM, lyrics and timing.` : `Loaded ${o.title || "Arcadians"} canonical reference metadata.`;
  } catch (v) {
    $s.textContent = v.message;
  }
}
Q0.addEventListener("click", (f) => {
  f.stopPropagation(), Dn.click();
});
Dn.addEventListener("change", () => {
  F0(Dn.files?.[0]);
});
Ga.addEventListener("click", (f) => {
  f.target !== Q0 && !f.target.closest(".known-info") && Dn.click();
});
Ga.addEventListener("keydown", (f) => {
  (f.key === "Enter" || f.key === " ") && Dn.click();
});
for (const f of ["dragenter", "dragover"]) Ga.addEventListener(f, (v) => {
  v.preventDefault(), Ga.classList.add("dragging");
});
for (const f of ["dragleave", "drop"]) Ga.addEventListener(f, (v) => {
  v.preventDefault(), Ga.classList.remove("dragging");
});
Ga.addEventListener("drop", (f) => {
  F0(f.dataTransfer?.files?.[0]);
});
Ng?.addEventListener("click", W0);
zg?.addEventListener("click", W0);
const Vs = new URLSearchParams(location.search).get("hash");
Vs && /^[0-9a-f]{64}$/i.test(Vs) && $0(Vs.toLowerCase(), "Existing analysis");
export {
  qa as formatTimelineTime
};
