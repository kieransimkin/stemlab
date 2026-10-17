var Ir = { exports: {} }, Lu = {};
var Vh;
function py() {
  if (Vh) return Lu;
  Vh = 1;
  var c = /* @__PURE__ */ Symbol.for("react.transitional.element"), o = /* @__PURE__ */ Symbol.for("react.fragment");
  function r(s, g, m) {
    var p = null;
    if (m !== void 0 && (p = "" + m), g.key !== void 0 && (p = "" + g.key), "key" in g) {
      m = {};
      for (var _ in g)
        _ !== "key" && (m[_] = g[_]);
    } else m = g;
    return g = m.ref, {
      $$typeof: c,
      type: s,
      key: p,
      ref: g !== void 0 ? g : null,
      props: m
    };
  }
  return Lu.Fragment = o, Lu.jsx = r, Lu.jsxs = r, Lu;
}
var Qh;
function Sy() {
  return Qh || (Qh = 1, Ir.exports = py()), Ir.exports;
}
var d = Sy(), Pr = { exports: {} }, dt = {};
var Zh;
function _y() {
  if (Zh) return dt;
  Zh = 1;
  var c = /* @__PURE__ */ Symbol.for("react.transitional.element"), o = /* @__PURE__ */ Symbol.for("react.portal"), r = /* @__PURE__ */ Symbol.for("react.fragment"), s = /* @__PURE__ */ Symbol.for("react.strict_mode"), g = /* @__PURE__ */ Symbol.for("react.profiler"), m = /* @__PURE__ */ Symbol.for("react.consumer"), p = /* @__PURE__ */ Symbol.for("react.context"), _ = /* @__PURE__ */ Symbol.for("react.forward_ref"), C = /* @__PURE__ */ Symbol.for("react.suspense"), j = /* @__PURE__ */ Symbol.for("react.memo"), N = /* @__PURE__ */ Symbol.for("react.lazy"), v = /* @__PURE__ */ Symbol.for("react.activity"), A = /* @__PURE__ */ Symbol.for("react.view_transition"), H = Symbol.iterator;
  function V(b) {
    return b === null || typeof b != "object" ? null : (b = H && b[H] || b["@@iterator"], typeof b == "function" ? b : null);
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
  }, $ = Object.assign, vt = {};
  function X(b, L, P) {
    this.props = b, this.context = L, this.refs = vt, this.updater = P || at;
  }
  X.prototype.isReactComponent = {}, X.prototype.setState = function(b, L) {
    if (typeof b != "object" && typeof b != "function" && b != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, b, L, "setState");
  }, X.prototype.forceUpdate = function(b) {
    this.updater.enqueueForceUpdate(this, b, "forceUpdate");
  };
  function W() {
  }
  W.prototype = X.prototype;
  function Tt(b, L, P) {
    this.props = b, this.context = L, this.refs = vt, this.updater = P || at;
  }
  var St = Tt.prototype = new W();
  St.constructor = Tt, $(St, X.prototype), St.isPureReactComponent = !0;
  var gt = Array.isArray;
  function Z() {
  }
  var mt = { H: null, A: null, T: null, S: null }, Ft = Object.prototype.hasOwnProperty;
  function F(b, L, P) {
    var K = P.ref;
    return {
      $$typeof: c,
      type: b,
      key: L,
      ref: K !== void 0 ? K : null,
      props: P
    };
  }
  function I(b, L) {
    return F(b.type, L, b.props);
  }
  function _t(b) {
    return typeof b == "object" && b !== null && b.$$typeof === c;
  }
  function Xt(b) {
    var L = { "=": "=0", ":": "=2" };
    return "$" + b.replace(/[=:]/g, function(P) {
      return L[P];
    });
  }
  var Wt = /\/+/g;
  function yt(b, L) {
    return typeof b == "object" && b !== null && b.key != null ? Xt("" + b.key) : L.toString(36);
  }
  function B(b) {
    switch (b.status) {
      case "fulfilled":
        return b.value;
      case "rejected":
        throw b.reason;
      default:
        switch (typeof b.status == "string" ? b.then(Z, Z) : (b.status = "pending", b.then(
          function(L) {
            b.status === "pending" && (b.status = "fulfilled", b.value = L);
          },
          function(L) {
            b.status === "pending" && (b.status = "rejected", b.reason = L);
          }
        )), b.status) {
          case "fulfilled":
            return b.value;
          case "rejected":
            throw b.reason;
        }
    }
    throw b;
  }
  function Y(b, L, P, K, ht) {
    var ot = typeof b;
    (ot === "undefined" || ot === "boolean") && (b = null);
    var ct = !1;
    if (b === null) ct = !0;
    else
      switch (ot) {
        case "bigint":
        case "string":
        case "number":
          ct = !0;
          break;
        case "object":
          switch (b.$$typeof) {
            case c:
            case o:
              ct = !0;
              break;
            case N:
              return ct = b._init, Y(
                ct(b._payload),
                L,
                P,
                K,
                ht
              );
          }
      }
    if (ct)
      return ht = ht(b), ct = K === "" ? "." + yt(b, 0) : K, gt(ht) ? (P = "", ct != null && (P = ct.replace(Wt, "$&/") + "/"), Y(ht, L, P, "", function(Vt) {
        return Vt;
      })) : ht != null && (_t(ht) && (ht = I(
        ht,
        P + (ht.key == null || b && b.key === ht.key ? "" : ("" + ht.key).replace(
          Wt,
          "$&/"
        ) + "/") + ct
      )), L.push(ht)), 1;
    ct = 0;
    var tt = K === "" ? "." : K + ":";
    if (gt(b))
      for (var nt = 0; nt < b.length; nt++)
        K = b[nt], ot = tt + yt(K, nt), ct += Y(
          K,
          L,
          P,
          ot,
          ht
        );
    else if (nt = V(b), typeof nt == "function")
      for (b = nt.call(b), nt = 0; !(K = b.next()).done; )
        K = K.value, ot = tt + yt(K, nt++), ct += Y(
          K,
          L,
          P,
          ot,
          ht
        );
    else if (ot === "object") {
      if (typeof b.then == "function")
        return Y(
          B(b),
          L,
          P,
          K,
          ht
        );
      throw L = String(b), Error(
        "Objects are not valid as a React child (found: " + (L === "[object Object]" ? "object with keys {" + Object.keys(b).join(", ") + "}" : L) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ct;
  }
  function G(b, L, P) {
    if (b == null) return b;
    var K = [], ht = 0;
    return Y(b, K, "", "", function(ot) {
      return L.call(P, ot, ht++);
    }), K;
  }
  function it(b) {
    if (b._status === -1) {
      var L = b._result, P = L();
      P.then(
        function(K) {
          (b._status === 0 || b._status === -1) && (b._status = 1, b._result = K, P.status === void 0 && (P.status = "fulfilled", P.value = K));
        },
        function(K) {
          (b._status === 0 || b._status === -1) && (b._status = 2, b._result = K, P.status === void 0 && (P.status = "rejected", P.reason = K));
        }
      ), b._status === -1 && (b._status = 0, b._result = P);
    }
    if (b._status === 1) return b._result.default;
    throw b._result;
  }
  var ft = typeof reportError == "function" ? reportError : function(b) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var L = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof b == "object" && b !== null && typeof b.message == "string" ? String(b.message) : String(b),
        error: b
      });
      if (!window.dispatchEvent(L)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", b);
      return;
    }
    console.error(b);
  };
  function It(b) {
    var L = mt.T, P = {};
    P.types = L !== null ? L.types : null, mt.T = P;
    try {
      var K = b(), ht = mt.S;
      ht !== null && ht(P, K), typeof K == "object" && K !== null && typeof K.then == "function" && K.then(Z, ft);
    } catch (ot) {
      ft(ot);
    } finally {
      L !== null && P.types !== null && (L.types = P.types), mt.T = L;
    }
  }
  function Ht(b) {
    var L = mt.T;
    if (L !== null) {
      var P = L.types;
      P === null ? L.types = [b] : P.indexOf(b) === -1 && P.push(b);
    } else It(Ht.bind(null, b));
  }
  var Me = {
    map: G,
    forEach: function(b, L, P) {
      G(
        b,
        function() {
          L.apply(this, arguments);
        },
        P
      );
    },
    count: function(b) {
      var L = 0;
      return G(b, function() {
        L++;
      }), L;
    },
    toArray: function(b) {
      return G(b, function(L) {
        return L;
      }) || [];
    },
    only: function(b) {
      if (!_t(b))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return b;
    }
  };
  return dt.Activity = v, dt.Children = Me, dt.Component = X, dt.Fragment = r, dt.Profiler = g, dt.PureComponent = Tt, dt.StrictMode = s, dt.Suspense = C, dt.ViewTransition = A, dt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = mt, dt.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(b) {
      return mt.H.useMemoCache(b);
    }
  }, dt.addTransitionType = Ht, dt.cache = function(b) {
    return function() {
      return b.apply(null, arguments);
    };
  }, dt.cacheSignal = function() {
    return null;
  }, dt.cloneElement = function(b, L, P) {
    if (b == null)
      throw Error(
        "The argument must be a React element, but you passed " + b + "."
      );
    var K = $({}, b.props), ht = b.key;
    if (L != null)
      for (ot in L.key !== void 0 && (ht = "" + L.key), L)
        !Ft.call(L, ot) || ot === "key" || ot === "__self" || ot === "__source" || ot === "ref" && L.ref === void 0 || (K[ot] = L[ot]);
    var ot = arguments.length - 2;
    if (ot === 1) K.children = P;
    else if (1 < ot) {
      for (var ct = Array(ot), tt = 0; tt < ot; tt++)
        ct[tt] = arguments[tt + 2];
      K.children = ct;
    }
    return F(b.type, ht, K);
  }, dt.createContext = function(b) {
    return b = {
      $$typeof: p,
      _currentValue: b,
      _currentValue2: b,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, b.Provider = b, b.Consumer = {
      $$typeof: m,
      _context: b
    }, b;
  }, dt.createElement = function(b, L, P) {
    var K, ht = {}, ot = null;
    if (L != null)
      for (K in L.key !== void 0 && (ot = "" + L.key), L)
        Ft.call(L, K) && K !== "key" && K !== "__self" && K !== "__source" && (ht[K] = L[K]);
    var ct = arguments.length - 2;
    if (ct === 1) ht.children = P;
    else if (1 < ct) {
      for (var tt = Array(ct), nt = 0; nt < ct; nt++)
        tt[nt] = arguments[nt + 2];
      ht.children = tt;
    }
    if (b && b.defaultProps)
      for (K in ct = b.defaultProps, ct)
        ht[K] === void 0 && (ht[K] = ct[K]);
    return F(b, ot, ht);
  }, dt.createRef = function() {
    return { current: null };
  }, dt.forwardRef = function(b) {
    return { $$typeof: _, render: b };
  }, dt.isValidElement = _t, dt.lazy = function(b) {
    return {
      $$typeof: N,
      _payload: { _status: -1, _result: b },
      _init: it
    };
  }, dt.memo = function(b, L) {
    return {
      $$typeof: j,
      type: b,
      compare: L === void 0 ? null : L
    };
  }, dt.startTransition = It, dt.unstable_useCacheRefresh = function() {
    return mt.H.useCacheRefresh();
  }, dt.use = function(b) {
    return mt.H.use(b);
  }, dt.useActionState = function(b, L, P) {
    return mt.H.useActionState(b, L, P);
  }, dt.useCallback = function(b, L) {
    return mt.H.useCallback(b, L);
  }, dt.useContext = function(b) {
    return mt.H.useContext(b);
  }, dt.useDebugValue = function() {
  }, dt.useDeferredValue = function(b, L) {
    return mt.H.useDeferredValue(b, L);
  }, dt.useEffect = function(b, L) {
    return mt.H.useEffect(b, L);
  }, dt.useEffectEvent = function(b) {
    return mt.H.useEffectEvent(b);
  }, dt.useId = function() {
    return mt.H.useId();
  }, dt.useImperativeHandle = function(b, L, P) {
    return mt.H.useImperativeHandle(b, L, P);
  }, dt.useInsertionEffect = function(b, L) {
    return mt.H.useInsertionEffect(b, L);
  }, dt.useLayoutEffect = function(b, L) {
    return mt.H.useLayoutEffect(b, L);
  }, dt.useMemo = function(b, L) {
    return mt.H.useMemo(b, L);
  }, dt.useOptimistic = function(b, L) {
    return mt.H.useOptimistic(b, L);
  }, dt.useReducer = function(b, L, P) {
    return mt.H.useReducer(b, L, P);
  }, dt.useRef = function(b) {
    return mt.H.useRef(b);
  }, dt.useState = function(b) {
    return mt.H.useState(b);
  }, dt.useSyncExternalStore = function(b, L, P) {
    return mt.H.useSyncExternalStore(
      b,
      L,
      P
    );
  }, dt.useTransition = function() {
    return mt.H.useTransition();
  }, dt.version = "19.3.0", dt;
}
var Kh;
function vf() {
  return Kh || (Kh = 1, Pr.exports = _y()), Pr.exports;
}
var U = vf(), tf = { exports: {} }, Yu = {}, ef = { exports: {} }, lf = {};
var Jh;
function Ey() {
  return Jh || (Jh = 1, (function(c) {
    function o(B, Y) {
      var G = B.length;
      B.push(Y);
      t: for (; 0 < G; ) {
        var it = G - 1 >>> 1, ft = B[it];
        if (0 < g(ft, Y))
          B[it] = Y, B[G] = ft, G = it;
        else break t;
      }
    }
    function r(B) {
      return B.length === 0 ? null : B[0];
    }
    function s(B) {
      if (B.length === 0) return null;
      var Y = B[0], G = B.pop();
      if (G !== Y) {
        B[0] = G;
        t: for (var it = 0, ft = B.length, It = ft >>> 1; it < It; ) {
          var Ht = 2 * (it + 1) - 1, Me = B[Ht], b = Ht + 1, L = B[b];
          if (0 > g(Me, G))
            b < ft && 0 > g(L, Me) ? (B[it] = L, B[b] = G, it = b) : (B[it] = Me, B[Ht] = G, it = Ht);
          else if (b < ft && 0 > g(L, G))
            B[it] = L, B[b] = G, it = b;
          else break t;
        }
      }
      return Y;
    }
    function g(B, Y) {
      var G = B.sortIndex - Y.sortIndex;
      return G !== 0 ? G : B.id - Y.id;
    }
    if (c.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var m = performance;
      c.unstable_now = function() {
        return m.now();
      };
    } else {
      var p = Date, _ = p.now();
      c.unstable_now = function() {
        return p.now() - _;
      };
    }
    var C = [], j = [], N = 1, v = null, A = 3, H = !1, V = !1, at = !1, $ = !1, vt = typeof setTimeout == "function" ? setTimeout : null, X = typeof clearTimeout == "function" ? clearTimeout : null, W = typeof setImmediate < "u" ? setImmediate : null;
    function Tt(B) {
      for (var Y = r(j); Y !== null; ) {
        if (Y.callback === null) s(j);
        else if (Y.startTime <= B)
          s(j), Y.sortIndex = Y.expirationTime, o(C, Y);
        else break;
        Y = r(j);
      }
    }
    function St(B) {
      if (at = !1, Tt(B), !V)
        if (r(C) !== null)
          V = !0, gt || (gt = !0, _t());
        else {
          var Y = r(j);
          Y !== null && yt(St, Y.startTime - B);
        }
    }
    var gt = !1, Z = -1, mt = 5, Ft = -1;
    function F() {
      return $ ? !0 : !(c.unstable_now() - Ft < mt);
    }
    function I() {
      if ($ = !1, gt) {
        var B = c.unstable_now();
        Ft = B;
        var Y = !0;
        try {
          t: {
            V = !1, at && (at = !1, X(Z), Z = -1), H = !0;
            var G = A;
            try {
              e: {
                for (Tt(B), v = r(C); v !== null && !(v.expirationTime > B && F()); ) {
                  var it = v.callback;
                  if (typeof it == "function") {
                    v.callback = null, A = v.priorityLevel;
                    var ft = it(
                      v.expirationTime <= B
                    );
                    if (B = c.unstable_now(), typeof ft == "function") {
                      v.callback = ft, Tt(B), Y = !0;
                      break e;
                    }
                    v === r(C) && s(C), Tt(B);
                  } else s(C);
                  v = r(C);
                }
                if (v !== null) Y = !0;
                else {
                  var It = r(j);
                  It !== null && yt(
                    St,
                    It.startTime - B
                  ), Y = !1;
                }
              }
              break t;
            } finally {
              v = null, A = G, H = !1;
            }
            Y = void 0;
          }
        } finally {
          Y ? _t() : gt = !1;
        }
      }
    }
    var _t;
    if (typeof W == "function")
      _t = function() {
        W(I);
      };
    else if (typeof MessageChannel < "u") {
      var Xt = new MessageChannel(), Wt = Xt.port2;
      Xt.port1.onmessage = I, _t = function() {
        Wt.postMessage(null);
      };
    } else
      _t = function() {
        vt(I, 0);
      };
    function yt(B, Y) {
      Z = vt(function() {
        B(c.unstable_now());
      }, Y);
    }
    c.unstable_IdlePriority = 5, c.unstable_ImmediatePriority = 1, c.unstable_LowPriority = 4, c.unstable_NormalPriority = 3, c.unstable_Profiling = null, c.unstable_UserBlockingPriority = 2, c.unstable_cancelCallback = function(B) {
      B.callback = null;
    }, c.unstable_forceFrameRate = function(B) {
      0 > B || 125 < B ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : mt = 0 < B ? Math.floor(1e3 / B) : 5;
    }, c.unstable_getCurrentPriorityLevel = function() {
      return A;
    }, c.unstable_next = function(B) {
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
        return B();
      } finally {
        A = G;
      }
    }, c.unstable_requestPaint = function() {
      $ = !0;
    }, c.unstable_runWithPriority = function(B, Y) {
      switch (B) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          B = 3;
      }
      var G = A;
      A = B;
      try {
        return Y();
      } finally {
        A = G;
      }
    }, c.unstable_scheduleCallback = function(B, Y, G) {
      var it = c.unstable_now();
      switch (typeof G == "object" && G !== null ? (G = G.delay, G = typeof G == "number" && 0 < G ? it + G : it) : G = it, B) {
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
      return ft = G + ft, B = {
        id: N++,
        callback: Y,
        priorityLevel: B,
        startTime: G,
        expirationTime: ft,
        sortIndex: -1
      }, G > it ? (B.sortIndex = G, o(j, B), r(C) === null && B === r(j) && (at ? (X(Z), Z = -1) : at = !0, yt(St, G - it))) : (B.sortIndex = ft, o(C, B), V || H || (V = !0, gt || (gt = !0, _t()))), B;
    }, c.unstable_shouldYield = F, c.unstable_wrapCallback = function(B) {
      var Y = A;
      return function() {
        var G = A;
        A = Y;
        try {
          return B.apply(this, arguments);
        } finally {
          A = G;
        }
      };
    };
  })(lf)), lf;
}
var $h;
function Ty() {
  return $h || ($h = 1, ef.exports = Ey()), ef.exports;
}
var af = { exports: {} }, Ee = {};
var Fh;
function Ny() {
  if (Fh) return Ee;
  Fh = 1;
  var c = vf();
  function o(N) {
    var v = "https://react.dev/errors/" + N;
    if (1 < arguments.length) {
      v += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var A = 2; A < arguments.length; A++)
        v += "&args[]=" + encodeURIComponent(arguments[A]);
    }
    return "Minified React error #" + N + "; visit " + v + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
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
  }, g = /* @__PURE__ */ Symbol.for("react.portal"), m = /* @__PURE__ */ Symbol.for("react.recoverable"), p = /* @__PURE__ */ Symbol.for("react.optimistic_key");
  function _(N, v, A) {
    var H = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: g,
      key: H == null ? null : H === p ? p : "" + H,
      children: N,
      containerInfo: v,
      implementation: A
    };
  }
  var C = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function j(N, v) {
    if (N === "font") return "";
    if (typeof v == "string")
      return v === "use-credentials" ? v : "";
  }
  return Ee.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, Ee.browser = function(N) {
    return { $$typeof: m, _reason: N };
  }, Ee.createPortal = function(N, v) {
    var A = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!v || v.nodeType !== 1 && v.nodeType !== 9 && v.nodeType !== 11)
      throw Error(o(299));
    return _(N, v, null, A);
  }, Ee.flushSync = function(N) {
    var v = C.T, A = s.p;
    try {
      if (C.T = null, s.p = 2, N) return N();
    } finally {
      C.T = v, s.p = A, s.d.f();
    }
  }, Ee.preconnect = function(N, v) {
    typeof N == "string" && (v ? (v = v.crossOrigin, v = typeof v == "string" ? v === "use-credentials" ? v : "" : void 0) : v = null, s.d.C(N, v));
  }, Ee.prefetchDNS = function(N) {
    typeof N == "string" && s.d.D(N);
  }, Ee.preinit = function(N, v) {
    if (typeof N == "string" && v && typeof v.as == "string") {
      var A = v.as, H = j(A, v.crossOrigin), V = typeof v.integrity == "string" ? v.integrity : void 0, at = typeof v.fetchPriority == "string" ? v.fetchPriority : void 0;
      A === "style" ? s.d.S(
        N,
        typeof v.precedence == "string" ? v.precedence : void 0,
        {
          crossOrigin: H,
          integrity: V,
          fetchPriority: at
        }
      ) : A === "script" && s.d.X(N, {
        crossOrigin: H,
        integrity: V,
        fetchPriority: at,
        nonce: typeof v.nonce == "string" ? v.nonce : void 0
      });
    }
  }, Ee.preinitModule = function(N, v) {
    if (typeof N == "string")
      if (typeof v == "object" && v !== null) {
        if (v.as == null || v.as === "script") {
          var A = j(
            v.as,
            v.crossOrigin
          );
          s.d.M(N, {
            crossOrigin: A,
            integrity: typeof v.integrity == "string" ? v.integrity : void 0,
            nonce: typeof v.nonce == "string" ? v.nonce : void 0,
            fetchPriority: typeof v.fetchPriority == "string" ? v.fetchPriority : void 0
          });
        }
      } else v == null && s.d.M(N);
  }, Ee.preload = function(N, v) {
    if (typeof N == "string" && typeof v == "object" && v !== null && typeof v.as == "string") {
      var A = v.as, H = j(A, v.crossOrigin);
      s.d.L(N, A, {
        crossOrigin: H,
        integrity: typeof v.integrity == "string" ? v.integrity : void 0,
        nonce: typeof v.nonce == "string" ? v.nonce : void 0,
        type: typeof v.type == "string" ? v.type : void 0,
        fetchPriority: typeof v.fetchPriority == "string" ? v.fetchPriority : void 0,
        referrerPolicy: typeof v.referrerPolicy == "string" ? v.referrerPolicy : void 0,
        imageSrcSet: typeof v.imageSrcSet == "string" ? v.imageSrcSet : void 0,
        imageSizes: typeof v.imageSizes == "string" ? v.imageSizes : void 0,
        media: typeof v.media == "string" ? v.media : void 0
      });
    }
  }, Ee.preloadModule = function(N, v) {
    if (typeof N == "string")
      if (v) {
        var A = j(v.as, v.crossOrigin);
        s.d.m(N, {
          as: typeof v.as == "string" && v.as !== "script" ? v.as : void 0,
          crossOrigin: A,
          integrity: typeof v.integrity == "string" ? v.integrity : void 0,
          nonce: typeof v.nonce == "string" ? v.nonce : void 0,
          fetchPriority: typeof v.fetchPriority == "string" ? v.fetchPriority : void 0
        });
      } else s.d.m(N);
  }, Ee.requestFormReset = function(N) {
    s.d.r(N);
  }, Ee.unstable_batchedUpdates = function(N, v) {
    return N(v);
  }, Ee.useFormState = function(N, v, A) {
    return C.H.useFormState(N, v, A);
  }, Ee.useFormStatus = function() {
    return C.H.useHostTransitionStatus();
  }, Ee.version = "19.3.0", Ee;
}
var kh;
function xy() {
  if (kh) return af.exports;
  kh = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (o) {
        console.error(o);
      }
  }
  return c(), af.exports = Ny(), af.exports;
}
var Wh;
function My() {
  if (Wh) return Yu;
  Wh = 1;
  var c = Ty(), o = vf(), r = xy();
  function s(t) {
    var e = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      e += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++)
        e += "&args[]=" + encodeURIComponent(arguments[l]);
    }
    return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function g(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function m(t) {
    for (var e = t, l = e; l && !l.alternate; )
      e = l, (e.flags & 4098) !== 0 && (t = e.return), l = e.return;
    for (; e.return; ) e = e.return;
    return e.tag === 3 ? t : null;
  }
  function p(t) {
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
  function j(t) {
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
  function v(t, e, l, a, n, u) {
    for (; t !== null; ) {
      if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && l(t, a, n, u) || (t.tag !== 22 || t.memoizedState === null) && (e || t.tag !== 5 && t.tag !== 27) && v(
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
  function H(t) {
    var e = !1;
    for (t = t.return; t !== null && (t.tag === 4 && (e = !0), !(t.tag === 3 || t.tag === 5 || t.tag === 27)); )
      t = t.return;
    return e;
  }
  function V(t) {
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
  function $(t) {
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
  var vt = null, X = null;
  function W(t, e, l) {
    return t === l ? !0 : t === e ? (vt = t, !0) : !1;
  }
  function Tt(t, e, l) {
    return t === l ? (X = t, !1) : t === e ? (X !== null && (vt = t), !0) : !1;
  }
  function St(t) {
    if (t === null) return null;
    do
      t = t === null ? null : t.return;
    while (t && t.tag !== 5 && t.tag !== 27 && t.tag !== 3);
    return t || null;
  }
  function gt(t, e, l) {
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
  var Z = Object.assign, mt = /* @__PURE__ */ Symbol.for("react.element"), Ft = /* @__PURE__ */ Symbol.for("react.transitional.element"), F = /* @__PURE__ */ Symbol.for("react.portal"), I = /* @__PURE__ */ Symbol.for("react.fragment"), _t = /* @__PURE__ */ Symbol.for("react.strict_mode"), Xt = /* @__PURE__ */ Symbol.for("react.profiler"), Wt = /* @__PURE__ */ Symbol.for("react.consumer"), yt = /* @__PURE__ */ Symbol.for("react.context"), B = /* @__PURE__ */ Symbol.for("react.forward_ref"), Y = /* @__PURE__ */ Symbol.for("react.suspense"), G = /* @__PURE__ */ Symbol.for("react.suspense_list"), it = /* @__PURE__ */ Symbol.for("react.memo"), ft = /* @__PURE__ */ Symbol.for("react.lazy"), It = /* @__PURE__ */ Symbol.for("react.activity"), Ht = /* @__PURE__ */ Symbol.for("react.legacy_hidden"), Me = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), b = /* @__PURE__ */ Symbol.for("react.view_transition"), L = /* @__PURE__ */ Symbol.for("react.recoverable"), P = Symbol.iterator;
  function K(t) {
    return t === null || typeof t != "object" ? null : (t = P && t[P] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var ht = /* @__PURE__ */ Symbol.for("react.client.reference");
  function ot(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === ht ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case I:
        return "Fragment";
      case Xt:
        return "Profiler";
      case _t:
        return "StrictMode";
      case Y:
        return "Suspense";
      case G:
        return "SuspenseList";
      case It:
        return "Activity";
      case b:
        return "ViewTransition";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case F:
          return "Portal";
        case yt:
          return t.displayName || "Context";
        case Wt:
          return (t._context.displayName || "Context") + ".Consumer";
        case B:
          var e = t.render;
          return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case it:
          return e = t.displayName || null, e !== null ? e : ot(t.type) || "Memo";
        case ft:
          e = t._payload, t = t._init;
          try {
            return ot(t(e));
          } catch {
          }
      }
    return null;
  }
  var ct = Array.isArray, tt = o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, nt = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Vt = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, Rt = [], re = -1;
  function ne(t) {
    return { current: t };
  }
  function Zt(t) {
    0 > re || (t.current = Rt[re], Rt[re] = null, re--);
  }
  function q(t, e) {
    re++, Rt[re] = t.current, t.current = e;
  }
  var lt = ne(null), Mt = ne(null), jt = ne(null), Te = ne(null);
  function je(t, e) {
    switch (q(jt, e), q(Mt, t), q(lt, null), e.nodeType) {
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
    Zt(lt), q(lt, t);
  }
  function $e() {
    Zt(lt), Zt(Mt), Zt(jt);
  }
  function Xl(t) {
    var e = t.memoizedState;
    e !== null && (Yn._currentValue = e.memoizedState, q(Te, t)), e = lt.current;
    var l = Pm(e, t.type);
    e !== l && (q(Mt, t), q(lt, l));
  }
  function ml(t) {
    Mt.current === t && (Zt(lt), Zt(Mt)), Te.current === t && (Zt(Te), Yn._currentValue = Vt);
  }
  var Sa, Vl;
  function Fe(t) {
    if (Sa === void 0)
      try {
        throw Error();
      } catch (l) {
        var e = l.stack.trim().match(/\n( *(at )?)/);
        Sa = e && e[1] || "", Vl = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Sa + t + Vl;
  }
  var Ql = !1;
  function R(t, e) {
    if (!t || Ql) return "";
    Ql = !0;
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
                } catch (Q) {
                  var S = Q;
                }
                Reflect.construct(t, [], w);
              } else {
                try {
                  w.call();
                } catch (Q) {
                  S = Q;
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
              } catch (Q) {
                S = Q;
              }
              (w = t()) && typeof w.catch == "function" && w.catch(function() {
              });
            }
          } catch (Q) {
            if (Q && S && typeof Q.stack == "string")
              return [Q.stack, S.stack];
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
        var h = i.split(`
`), T = f.split(`
`);
        for (n = a = 0; a < h.length && !h[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; n < T.length && !T[n].includes(
          "DetermineComponentFrameRoot"
        ); )
          n++;
        if (a === h.length || n === T.length)
          for (a = h.length - 1, n = T.length - 1; 1 <= a && 0 <= n && h[a] !== T[n]; )
            n--;
        for (; 1 <= a && 0 <= n; a--, n--)
          if (h[a] !== T[n]) {
            if (a !== 1 || n !== 1)
              do
                if (a--, n--, 0 > n || h[a] !== T[n]) {
                  var z = `
` + h[a].replace(" at new ", " at ");
                  return t.displayName && z.includes("<anonymous>") && (z = z.replace("<anonymous>", t.displayName)), z;
                }
              while (1 <= a && 0 <= n);
            break;
          }
      }
    } finally {
      Ql = !1, Error.prepareStackTrace = l;
    }
    return (l = t ? t.displayName || t.name : "") ? Fe(l) : "";
  }
  function rt(t, e) {
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
  function Ot(t) {
    try {
      var e = "", l = null;
      do
        e += rt(t, l), l = t, t = t.return;
      while (t);
      return e;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var oe = Object.prototype.hasOwnProperty, O = c.unstable_scheduleCallback, J = c.unstable_cancelCallback, zt = c.unstable_shouldYield, Dt = c.unstable_requestPaint, Pt = c.unstable_now, _a = c.unstable_getCurrentPriorityLevel, Wa = c.unstable_ImmediatePriority, _f = c.unstable_UserBlockingPriority, Ku = c.unstable_NormalPriority, O0 = c.unstable_LowPriority, Ef = c.unstable_IdlePriority, z0 = c.log, C0 = c.unstable_setDisableYieldValue, Zn = null, Le = null;
  function Zl(t) {
    if (typeof z0 == "function" && C0(t), Le && typeof Le.setStrictMode == "function")
      try {
        Le.setStrictMode(Zn, t);
      } catch {
      }
  }
  var Ye = Math.clz32 ? Math.clz32 : R0, A0 = Math.log, j0 = Math.LN2;
  function R0(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (A0(t) / j0 | 0) | 0;
  }
  var Ju = 256, $u = 262144, Fu = 4194304;
  function Ea(t) {
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
    var f = a & 134217727;
    return f !== 0 ? (a = f & ~u, a !== 0 ? n = Ea(a) : (i &= f, i !== 0 ? n = Ea(i) : l || (l = f & ~t, l !== 0 && (n = Ea(l))))) : (f = a & ~u, f !== 0 ? n = Ea(f) : i !== 0 ? n = Ea(i) : l || (l = a & ~t, l !== 0 && (n = Ea(l)))), n === 0 ? 0 : e !== 0 && e !== n && (e & u) === 0 && (u = n & -n, l = e & -e, u >= l || u === 32 && (l & 4194048) !== 0) ? e : n;
  }
  function Kn(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function Tf(t, e) {
    (e & 8) !== 0 && (e |= e & 32);
    var l = t.entangledLanes;
    if (l !== 0)
      for (t = t.entanglements, l &= e; 0 < l; ) {
        var a = 31 - Ye(l), n = 1 << a;
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
  function xc(t) {
    for (var e = [], l = 0; 31 > l; l++) e.push(t);
    return e;
  }
  function Jn(t, e) {
    t.pendingLanes |= e, e !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function w0(t, e, l, a, n, u) {
    var i = t.pendingLanes;
    t.pendingLanes = l, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= l, t.entangledLanes &= l, t.errorRecoveryDisabledLanes &= l, t.shellSuspendCounter = 0;
    var f = t.entanglements, h = t.expirationTimes, T = t.hiddenUpdates;
    for (l = i & ~l; 0 < l; ) {
      var z = 31 - Ye(l), w = 1 << z;
      f[z] = 0, h[z] = -1;
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
    var a = 31 - Ye(e);
    t.entangledLanes |= e, t.entanglements[a] = t.entanglements[a] | 1073741824 | l & 261930;
  }
  function Mf(t, e) {
    var l = t.entangledLanes |= e;
    for (t = t.entanglements; l; ) {
      var a = 31 - Ye(l), n = 1 << a;
      n & e | t[a] & e && (t[a] |= e), l &= ~n;
    }
  }
  function Of(t, e) {
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
  function zf() {
    var t = nt.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : Bh(t.type));
  }
  function Cf(t, e) {
    var l = nt.p;
    try {
      return nt.p = t, e();
    } finally {
      nt.p = l;
    }
  }
  var Ol = Math.random().toString(36).slice(2), ge = "__reactFiber$" + Ol, Re = "__reactProps$" + Ol, Ia = "__reactContainer$" + Ol, Af = "__reactEvents$" + Ol, U0 = "__reactListeners$" + Ol, B0 = "__reactHandles$" + Ol, jf = "__reactResources$" + Ol, $n = "__reactMarker$" + Ol, Wu = "__reactLoad$" + Ol;
  function Iu(t) {
    delete t[ge], delete t[Re], delete t[U0], delete t[B0];
  }
  function Ta(t) {
    var e;
    if (e = t[ge]) return e;
    for (var l = t.parentNode; l; ) {
      if (e = l[Ia] || l[ge]) {
        if (l = e.alternate, e.child !== null || l !== null && l.child !== null)
          for (t = gh(t); t !== null; ) {
            if (l = t[ge]) return l;
            t = gh(t);
          }
        return e;
      }
      t = l, l = t.parentNode;
    }
    return null;
  }
  function Pa(t) {
    if (t = t[ge] || t[Ia]) {
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
    var e = t[jf];
    return e || (e = t[jf] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), e;
  }
  function de(t) {
    t[$n] = !0;
  }
  function Rf(t) {
    t[Wu] = void 0;
  }
  var Df = /* @__PURE__ */ new Set(), wf = {};
  function Na(t, e) {
    en(t, e), en(t + "Capture", e);
  }
  function en(t, e) {
    for (wf[t] = e, t = 0; t < e.length; t++)
      Df.add(e[t]);
  }
  var H0 = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Uf = {}, Bf = {};
  function L0(t) {
    return oe.call(Bf, t) ? !0 : oe.call(Uf, t) ? !1 : H0.test(t) ? Bf[t] = !0 : (Uf[t] = !0, !1);
  }
  var Ut = !1;
  function Hf() {
    var t = Ut;
    return Ut = !1, t;
  }
  function Pu(t, e, l) {
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
  function zl(t, e, l, a) {
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
  function qe(t) {
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
  function zc(t) {
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
  function ke(t) {
    return t.replace(
      q0,
      function(e) {
        return "\\" + e.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Cc(t, e, l, a, n, u, i, f) {
    t.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? t.type = i : t.removeAttribute("type"), e != null ? i === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + qe(e)) : t.value !== "" + qe(e) && (t.value = "" + qe(e)) : i !== "submit" && i !== "reset" || t.removeAttribute("value"), e != null ? i === "number" && t.value == e ? Ac(t, qe(t.value)) : Ac(t, qe(e)) : l != null ? Ac(t, qe(l)) : a != null && t.removeAttribute("value"), n == null && u != null && (t.defaultChecked = !!u), n != null && (t.checked = n && typeof n != "function" && typeof n != "symbol"), f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? t.name = "" + qe(f) : t.removeAttribute("name");
  }
  function qf(t, e, l, a, n, u, i, f) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (t.type = u), e != null || l != null) {
      if (!(u !== "submit" && u !== "reset" || e != null)) {
        zc(t);
        return;
      }
      l = l != null ? "" + qe(l) : "", e = e != null ? "" + qe(e) : l, f || e === t.value || (t.value = e), t.defaultValue = e;
    }
    a = a ?? n, a = typeof a != "function" && typeof a != "symbol" && !!a, t.checked = f ? t.checked : !!a, t.defaultChecked = !!a, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (t.name = i), zc(t);
  }
  function Ac(t, e) {
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
      for (l = "" + qe(l), e = null, n = 0; n < t.length; n++) {
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
    if (e != null && (e = "" + qe(e), e !== t.value && (t.value = e), l == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = l != null ? "" + qe(l) : "";
  }
  function Xf(t, e, l, a) {
    if (e == null) {
      if (a != null) {
        if (l != null) throw Error(s(92));
        if (ct(a)) {
          if (1 < a.length) throw Error(s(93));
          a = a[0];
        }
        l = a;
      }
      l == null && (l = ""), e = l;
    }
    l = qe(e), t.defaultValue = l, a = t.textContent, a === l && a !== "" && a !== null && (t.value = a), zc(t);
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
  function ei(t) {
    return V0.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function hl() {
  }
  var Rc = null;
  function Dc(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var nn = null, un = null;
  function Zf(t) {
    var e = Pa(t);
    if (e && (t = e.stateNode)) {
      var l = t[Re] || null;
      t: switch (t = e.stateNode, e.type) {
        case "input":
          if (Cc(
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
              'input[name="' + ke(
                "" + e
              ) + '"][type="radio"]'
            ), e = 0; e < l.length; e++) {
              var a = l[e];
              if (a !== t && a.form === t.form) {
                var n = a[Re] || null;
                if (!n) throw Error(s(90));
                Cc(
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
          e = l.value, e != null && ln(t, !!l.multiple, e, !1);
      }
    }
  }
  var wc = !1;
  function Kf(t, e, l) {
    if (wc) return t(e, l);
    wc = !0;
    try {
      var a = t(e);
      return a;
    } finally {
      if (wc = !1, (nn !== null || un !== null) && (ec(), nn && (e = nn, t = un, un = nn = null, Zf(e), t)))
        for (e = 0; e < t.length; e++) Zf(t[e]);
    }
  }
  function kn(t, e) {
    var l = t.stateNode;
    if (l === null) return null;
    var a = l[Re] || null;
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
  var Cl = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Uc = !1;
  if (Cl)
    try {
      var Wn = {};
      Object.defineProperty(Wn, "passive", {
        get: function() {
          Uc = !0;
        }
      }), window.addEventListener("test", Wn, Wn), window.removeEventListener("test", Wn, Wn);
    } catch {
      Uc = !1;
    }
  var Kl = null, Bc = null, li = null;
  function Jf() {
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
  function $f() {
    return !1;
  }
  function Oe(t) {
    function e(l, a, n, u, i) {
      this._reactName = l, this._targetInst = n, this.type = a, this.nativeEvent = u, this.target = i, this.currentTarget = null;
      for (var f in t)
        t.hasOwnProperty(f) && (l = t[f], this[f] = l ? l(u) : u[f]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? ni : $f, this.isPropagationStopped = $f, this;
    }
    return Z(e.prototype, {
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
  }, ui = Oe(Jl), In = Z({}, Jl, { view: 0, detail: 0 }), Q0 = Oe(In), Hc, Lc, Pn, ii = Z({}, In, {
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
  }), Ff = Oe(ii), Z0 = Z({}, ii, { dataTransfer: 0 }), K0 = Oe(Z0), J0 = Z({}, In, { relatedTarget: 0 }), Yc = Oe(J0), $0 = Z({}, Jl, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), F0 = Oe($0), k0 = Z({}, Jl, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), W0 = Oe(k0), I0 = Z({}, Jl, { data: 0 }), kf = Oe(I0), P0 = {
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
  function qc() {
    return lv;
  }
  var av = Z({}, In, {
    key: function(t) {
      if (t.key) {
        var e = P0[t.key] || t.key;
        if (e !== "Unidentified") return e;
      }
      return t.type === "keypress" ? (t = ai(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? tv[t.keyCode] || "Unidentified" : "";
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
  }), nv = Oe(av), uv = Z({}, ii, {
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
  }), Wf = Oe(uv), iv = Z({}, Jl, { submitter: 0 }), cv = Oe(iv), sv = Z({}, In, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: qc
  }), rv = Oe(sv), fv = Z({}, Jl, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), ov = Oe(fv), dv = Z({}, ii, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), mv = Oe(dv), hv = Z({}, Jl, {
    newState: 0,
    oldState: 0,
    source: 0
  }), vv = Oe(hv), gv = [9, 13, 27, 32], Gc = Cl && "CompositionEvent" in window, tu = null;
  Cl && "documentMode" in document && (tu = document.documentMode);
  var yv = Cl && "TextEvent" in window && !tu, If = Cl && (!Gc || tu && 8 < tu && 11 >= tu), Pf = " ", to = !1;
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
  var cn = !1;
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
    if (cn)
      return t === "compositionend" || !Gc && eo(t, e) ? (t = Jf(), li = Bc = Kl = null, cn = !1, t) : null;
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
    nn ? un ? un.push(a) : un = [a] : nn = a, e = cc(e, "onChange"), 0 < e.length && (l = new ui(
      "onChange",
      "change",
      null,
      l,
      a
    ), t.push({ event: l, listeners: e }));
  }
  var eu = null, lu = null;
  function _v(t) {
    Km(t, 0);
  }
  function ci(t) {
    var e = Fn(t);
    if (Yf(e)) return t;
  }
  function uo(t, e) {
    if (t === "change") return e;
  }
  var io = !1;
  if (Cl) {
    var Xc;
    if (Cl) {
      var Vc = "oninput" in document;
      if (!Vc) {
        var co = document.createElement("div");
        co.setAttribute("oninput", "return;"), Vc = typeof co.oninput == "function";
      }
      Xc = Vc;
    } else Xc = !1;
    io = Xc && (!document.documentMode || 9 < document.documentMode);
  }
  function so() {
    eu && (eu.detachEvent("onpropertychange", ro), lu = eu = null);
  }
  function ro(t) {
    if (t.propertyName === "value" && ci(lu)) {
      var e = [];
      no(
        e,
        lu,
        t,
        Dc(t)
      ), Kf(_v, e);
    }
  }
  function Ev(t, e, l) {
    t === "focusin" ? (so(), eu = e, lu = l, eu.attachEvent("onpropertychange", ro)) : t === "focusout" && so();
  }
  function Tv(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return ci(lu);
  }
  function Nv(t, e) {
    if (t === "click") return ci(e);
  }
  function xv(t, e) {
    if (t === "input" || t === "change")
      return ci(e);
  }
  function Mv(t, e) {
    return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
  }
  var Ge = typeof Object.is == "function" ? Object.is : Mv;
  function au(t, e) {
    if (Ge(t, e)) return !0;
    if (typeof t != "object" || t === null || typeof e != "object" || e === null)
      return !1;
    var l = Object.keys(t), a = Object.keys(e);
    if (l.length !== a.length) return !1;
    for (a = 0; a < l.length; a++) {
      var n = l[a];
      if (!oe.call(e, n) || !Ge(t[n], e[n]))
        return !1;
    }
    return !0;
  }
  function Qc(t) {
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
    for (var e = Qc(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var l = typeof e.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) t = e.contentWindow;
      else break;
      e = Qc(t.document);
    }
    return e;
  }
  function Zc(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
  }
  var Ov = Cl && "documentMode" in document && 11 >= document.documentMode, sn = null, Kc = null, nu = null, Jc = !1;
  function vo(t, e, l) {
    var a = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Jc || sn == null || sn !== Qc(a) || (a = sn, "selectionStart" in a && Zc(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
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
  function xa(t, e) {
    var l = {};
    return l[t.toLowerCase()] = e.toLowerCase(), l["Webkit" + t] = "webkit" + e, l["Moz" + t] = "moz" + e, l;
  }
  var rn = {
    animationend: xa("Animation", "AnimationEnd"),
    animationiteration: xa("Animation", "AnimationIteration"),
    animationstart: xa("Animation", "AnimationStart"),
    transitionrun: xa("Transition", "TransitionRun"),
    transitionstart: xa("Transition", "TransitionStart"),
    transitioncancel: xa("Transition", "TransitionCancel"),
    transitionend: xa("Transition", "TransitionEnd")
  }, $c = {}, go = {};
  Cl && (go = document.createElement("div").style, "AnimationEvent" in window || (delete rn.animationend.animation, delete rn.animationiteration.animation, delete rn.animationstart.animation), "TransitionEvent" in window || delete rn.transitionend.transition);
  function Ma(t) {
    if ($c[t]) return $c[t];
    if (!rn[t]) return t;
    var e = rn[t], l;
    for (l in e)
      if (e.hasOwnProperty(l) && l in go)
        return $c[t] = e[l];
    return t;
  }
  var yo = Ma("animationend"), bo = Ma("animationiteration"), po = Ma("animationstart"), zv = Ma("transitionrun"), Cv = Ma("transitionstart"), Av = Ma("transitioncancel"), So = Ma("transitionend"), _o = /* @__PURE__ */ new Map(), Fc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Fc.push("scrollEnd");
  function il(t, e) {
    _o.set(t, e), Na(e, [t]);
  }
  var jv = 0;
  function Al(t, e) {
    if (t.name != null && t.name !== "auto") return t.name;
    if (e.autoName !== null) return e.autoName;
    t = fl.identifierPrefix;
    var l = jv++;
    return t = "_" + t + "t_" + l.toString(32) + "_", e.autoName = t;
  }
  function Eo(t) {
    if (t == null || typeof t == "string")
      return t;
    var e = null, l = Cn;
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
  function jl(t, e) {
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
  }, We = [], fn = 0, kc = 0;
  function ri() {
    for (var t = fn, e = kc = fn = 0; e < t; ) {
      var l = We[e];
      We[e++] = null;
      var a = We[e];
      We[e++] = null;
      var n = We[e];
      We[e++] = null;
      var u = We[e];
      if (We[e++] = null, a !== null && n !== null) {
        var i = a.pending;
        i === null ? n.next = n : (n.next = i.next, i.next = n), a.pending = n;
      }
      u !== 0 && To(l, n, u);
    }
  }
  function fi(t, e, l, a) {
    We[fn++] = t, We[fn++] = e, We[fn++] = l, We[fn++] = a, kc |= a, t.lanes |= a, t = t.alternate, t !== null && (t.lanes |= a);
  }
  function Wc(t, e, l, a) {
    return fi(t, e, l, a), oi(t);
  }
  function Oa(t, e) {
    return fi(t, null, null, e), oi(t);
  }
  function To(t, e, l) {
    t.lanes |= l;
    var a = t.alternate;
    a !== null && (a.lanes |= l);
    for (var n = !1, u = t.return; u !== null; )
      u.childLanes |= l, a = u.alternate, a !== null && (a.childLanes |= l), u.tag === 22 && (t = u.stateNode, t === null || t._visibility & 1 || (n = !0)), t = u, u = u.return;
    return t.tag === 3 ? (u = t.stateNode, n && e !== null && (n = 31 - Ye(l), t = u.hiddenUpdates, a = t[n], a === null ? t[n] = [e] : a.push(e), e.lane = l | 536870912), u) : null;
  }
  function oi(t) {
    if (50 < Mu)
      throw Mu = 0, tc = null, Error(s(185));
    for (var e = t.return; e !== null; )
      t = e, e = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var on = {};
  function Rv(t, e, l, a) {
    this.tag = t, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function De(t, e, l, a) {
    return new Rv(t, e, l, a);
  }
  function Ic(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Rl(t, e) {
    var l = t.alternate;
    return l === null ? (l = De(
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
      i = iy(
        t,
        l,
        lt.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (a) {
        case It:
          return t = De(31, l, e, n), t.elementType = It, t.lanes = u, t;
        case I:
          return za(l.children, n, u, e);
        case _t:
          i = 8, n |= 24;
          break;
        case Xt:
          return t = De(12, l, e, n | 2), t.elementType = Xt, t.lanes = u, t;
        case Y:
          return t = De(13, l, e, n), t.elementType = Y, t.lanes = u, t;
        case G:
          return t = De(19, l, e, n), t.elementType = G, t.lanes = u, t;
        case Ht:
        case b:
          return t = n | 32, t = De(30, l, e, t), t.elementType = b, t.lanes = u, t.stateNode = {
            autoName: null,
            paired: null,
            clones: null,
            ref: null
          }, t;
        default:
          if (typeof a == "object" && a !== null)
            switch (a.$$typeof) {
              case yt:
                i = 10;
                break t;
              case Wt:
                i = 9;
                break t;
              case B:
                i = 11;
                break t;
              case it:
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
    return e = De(i, l, e, n), e.elementType = t, e.type = a, e.lanes = u, e;
  }
  function za(t, e, l, a) {
    return t = De(7, t, a, e), t.lanes = l, t;
  }
  function Pc(t, e, l) {
    return t = De(6, t, null, e), t.lanes = l, t;
  }
  function xo(t) {
    var e = De(18, null, null, 0);
    return e.stateNode = t, e;
  }
  function ts(t, e, l) {
    return e = De(
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
  function Ie(t, e) {
    if (typeof t == "object" && t !== null) {
      var l = Mo.get(t);
      return l !== void 0 ? l : (e = {
        value: t,
        source: e,
        stack: Ot(e)
      }, Mo.set(t, e), e);
    }
    return {
      value: t,
      source: e,
      stack: Ot(e)
    };
  }
  var dn = [], mn = 0, mi = null, uu = 0, Pe = [], tl = 0, $l = null, vl = 1, gl = "";
  function Dl(t, e) {
    dn[mn++] = uu, dn[mn++] = mi, mi = t, uu = e;
  }
  function Oo(t, e, l) {
    Pe[tl++] = vl, Pe[tl++] = gl, Pe[tl++] = $l, $l = t;
    var a = vl;
    t = gl;
    var n = 32 - Ye(a) - 1;
    a &= ~(1 << n), l += 1;
    var u = 32 - Ye(e) + n;
    if (30 < u) {
      var i = n - n % 5;
      u = (a & (1 << i) - 1).toString(32), a >>= i, n -= i, vl = 1 << 32 - Ye(e) + n | l << n | a, gl = u + t;
    } else
      vl = 1 << u | l << n | a, gl = t;
  }
  function hi(t) {
    t.return !== null && (Dl(t, 1), Oo(t, 1, 0));
  }
  function es(t) {
    for (; t === mi; )
      mi = dn[--mn], dn[mn] = null, uu = dn[--mn], dn[mn] = null;
    for (; t === $l; )
      $l = Pe[--tl], Pe[tl] = null, gl = Pe[--tl], Pe[tl] = null, vl = Pe[--tl], Pe[tl] = null;
  }
  function zo(t, e) {
    Pe[tl++] = vl, Pe[tl++] = gl, Pe[tl++] = $l, vl = e.id, gl = e.overflow, $l = t;
  }
  var me = null, Jt = null, Et = !1, Fl = null, el = !1, ls = Error(s(519));
  function kl(t) {
    var e = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw iu(Ie(e, t)), ls;
  }
  function Co(t) {
    var e = t.stateNode, l = t.type, a = t.memoizedProps;
    switch (e[ge] = t, e[Re] = a, l) {
      case "dialog":
        xt("cancel", e), xt("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        xt("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < zu.length; l++)
          xt(zu[l], e);
        break;
      case "source":
        xt("error", e);
        break;
      case "img":
      case "image":
      case "link":
        xt("error", e), xt("load", e);
        break;
      case "details":
        xt("toggle", e);
        break;
      case "input":
        xt("invalid", e), qf(
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
        xt("invalid", e);
        break;
      case "textarea":
        xt("invalid", e), Xf(e, a.value, a.defaultValue, a.children);
    }
    l = a.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || e.textContent === "" + l || a.suppressHydrationWarning === !0 || km(e.textContent, l) ? (a.popover != null && (xt("beforetoggle", e), xt("toggle", e)), a.onScroll != null && xt("scroll", e), a.onScrollEnd != null && xt("scrollend", e), a.onClick != null && (e.onclick = hl), e = !0) : e = !1, e || kl(t, !0);
  }
  function vi(t) {
    for (me = t.return; me; )
      switch (me.tag) {
        case 5:
        case 31:
        case 13:
          el = !1;
          return;
        case 27:
        case 3:
          el = !0;
          return;
        default:
          me = me.return;
      }
  }
  function hn(t) {
    if (t !== me) return !1;
    if (!Et) return vi(t), Et = !0, !1;
    var e = t.tag, l;
    if ((l = e !== 3 && e !== 27) && ((l = e === 5) && (l = t.type, l = !(l !== "form" && l !== "button") || Rr(t.type, t.memoizedProps)), l = !l), l && Jt && kl(t), vi(t), e === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      Jt = vh(t);
    } else if (e === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      Jt = vh(t);
    } else
      e === 27 ? (e = Jt, da(t.type) ? (t = Gr, Gr = null, Jt = t) : Jt = e) : Jt = me ? al(t.stateNode.nextSibling) : null;
    return !0;
  }
  function Ca() {
    Jt = me = null, Et = !1;
  }
  function as() {
    var t = Fl;
    return t !== null && (Be === null ? Be = t : Be.push.apply(
      Be,
      t
    ), Fl = null), t;
  }
  function iu(t) {
    Fl === null ? Fl = [t] : Fl.push(t);
  }
  var ns = ne(null), Aa = null, wl = null;
  function Wl(t, e, l) {
    q(ns, e._currentValue), e._currentValue = l;
  }
  function Ul(t) {
    t._currentValue = ns.current, Zt(ns);
  }
  function gi(t, e, l) {
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
          var f = u;
          u = n;
          for (var h = 0; h < e.length; h++)
            if (f.context === e[h]) {
              u.lanes |= l, f = u.alternate, f !== null && (f.lanes |= l), gi(
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
        i.lanes |= l, u = i.alternate, u !== null && (u.lanes |= l), gi(i, l, t), i = null;
      } else
        n.tag === 13 && n.memoizedState !== null && n.memoizedState.dehydrated === null ? (n.lanes |= l, i = n.alternate, i !== null && (i.lanes |= l), gi(
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
  function ja(t, e, l, a) {
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
          Ge(n.pendingProps.value, i.value) || (t !== null ? t.push(f) : t = [f]);
        }
      } else if (n === Te.current) {
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
  function yi(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!Ge(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function Ra(t) {
    Aa = t, wl = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function ye(t) {
    return Ao(Aa, t);
  }
  function bi(t, e) {
    return Aa === null && Ra(t), Ao(t, e);
  }
  function Ao(t, e) {
    var l = e._currentValue;
    if (e = { context: e, memoizedValue: l, next: null }, wl === null) {
      if (t === null) throw Error(s(308));
      wl = e, t.dependencies = { lanes: 0, firstContext: e }, t.flags |= 524288;
    } else wl = wl.next = e;
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
  }, wv = c.unstable_scheduleCallback, Uv = c.unstable_NormalPriority, ue = {
    $$typeof: yt,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function is() {
    return {
      controller: new Dv(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function cu(t) {
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
  var su = null;
  function Bv(t) {
    var e = t.transitionTypes;
    return t.transitionTypes = null, e;
  }
  var ru = null, cs = 0, Da = 0, vn = null;
  function Hv(t, e) {
    if (ru === null) {
      var l = ru = [];
      cs = 0, Da = Tr(), vn = {
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
    if (--cs === 0 && (su = null, ru !== null)) {
      vn !== null && (vn.status = "fulfilled");
      var t = ru;
      ru = null, Da = 0, vn = null;
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
  var Do = tt.S;
  tt.S = function(t, e) {
    if (xm = Pt(), typeof e == "object" && e !== null && typeof e.then == "function" && Hv(t, e), su !== null)
      for (var l = Dn; l !== null; )
        jo(l, su), l = l.next;
    if (l = t.types, l !== null) {
      for (var a = Dn; a !== null; )
        jo(a, l), a = a.next;
      if (Da !== 0) {
        a = su, a === null && (a = su = []);
        for (var n = 0; n < l.length; n++) {
          var u = l[n];
          a.indexOf(u) === -1 && a.push(u);
        }
      }
    }
    Do !== null && Do(t, e);
  };
  var wa = ne(null);
  function ss() {
    var t = wa.current;
    return t !== null ? t : Kt.pooledCache;
  }
  function pi(t, e) {
    e === null ? q(wa, wa.current) : q(wa, e.pool);
  }
  function wo() {
    var t = ss();
    return t === null ? null : { parent: ue._currentValue, pool: t };
  }
  var gn = Error(s(460)), rs = Error(s(474)), Si = Error(s(542)), _i = { then: function() {
  } };
  function Uo(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function Bo(t, e, l) {
    switch (l = t[l], l === void 0 ? t.push(e) : l !== e && (e.then(hl, hl), e = l), e.status) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw t = e.reason, Lo(t), t === void 0 && !("reason" in e) ? Error(s(600)) : t;
      default:
        if (typeof e.status == "string") e.then(hl, hl);
        else {
          if (t = Kt, t !== null && 100 < t.shellSuspendCounter)
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
        throw Ba = e, gn;
    }
  }
  function Ua(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (Ba = l, gn) : l;
    }
  }
  var Ba = null;
  function Ho() {
    if (Ba === null) throw Error(s(459));
    var t = Ba;
    return Ba = null, t;
  }
  function Lo(t) {
    if (t === gn || t === Si)
      throw Error(s(483));
  }
  var yn = null, fu = 0;
  function Ei(t) {
    var e = fu;
    return fu += 1, yn === null && (yn = []), Bo(yn, t, e);
  }
  function Il(t, e) {
    e = e.props.ref, t.ref = e !== void 0 ? e : null;
  }
  function Ti(t, e) {
    throw e.$$typeof === mt ? Error(s(525)) : (t = Object.prototype.toString.call(e), Error(
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
      return E = Rl(E, y), E.index = 0, E.sibling = null, E;
    }
    function u(E, y, x) {
      return E.index = x, t ? (x = E.alternate, x !== null ? (x = x.index, x < y ? (E.flags |= 2, y) : x) : (E.flags |= 134217730, y)) : (E.flags |= 1048576, y);
    }
    function i(E) {
      return t && E.alternate === null && (E.flags |= 134217730), E;
    }
    function f(E, y, x, D) {
      return y === null || y.tag !== 6 ? (y = Pc(x, E.mode, D), y.return = E, y) : (y = n(y, x), y.return = E, y);
    }
    function h(E, y, x, D) {
      var k = x.type;
      return k === I ? (E = z(
        E,
        y,
        x.props.children,
        D,
        x.key
      ), Il(E, x), E) : y !== null && (y.elementType === k || typeof k == "object" && k !== null && k.$$typeof === ft && Ua(k) === y.type) ? (y = n(y, x.props), Il(y, x), y.return = E, y) : (y = di(
        x.type,
        x.key,
        x.props,
        null,
        E.mode,
        D
      ), Il(y, x), y.return = E, y);
    }
    function T(E, y, x, D) {
      return y === null || y.tag !== 4 || y.stateNode.containerInfo !== x.containerInfo || y.stateNode.implementation !== x.implementation ? (y = ts(x, E.mode, D), y.return = E, y) : (y = n(y, x.children || []), y.return = E, y);
    }
    function z(E, y, x, D, k) {
      return y === null || y.tag !== 7 ? (y = za(
        x,
        E.mode,
        D,
        k
      ), y.return = E, y) : (y = n(y, x), y.return = E, y);
    }
    function w(E, y, x) {
      if (typeof y == "string" && y !== "" || typeof y == "number" || typeof y == "bigint")
        return y = Pc(
          "" + y,
          E.mode,
          x
        ), y.return = E, y;
      if (typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case Ft:
            return x = di(
              y.type,
              y.key,
              y.props,
              null,
              E.mode,
              x
            ), Il(x, y), x.return = E, x;
          case F:
            return y = ts(
              y,
              E.mode,
              x
            ), y.return = E, y;
          case ft:
            return y = Ua(y), w(E, y, x);
        }
        if (ct(y) || K(y))
          return y = za(
            y,
            E.mode,
            x,
            null
          ), y.return = E, y;
        if (typeof y.then == "function")
          return w(E, Ei(y), x);
        if (y.$$typeof === yt)
          return w(
            E,
            bi(E, y),
            x
          );
        Ti(E, y);
      }
      return null;
    }
    function S(E, y, x, D) {
      var k = y !== null ? y.key : null;
      if (typeof x == "string" && x !== "" || typeof x == "number" || typeof x == "bigint")
        return k !== null ? null : f(E, y, "" + x, D);
      if (typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case Ft:
            return x.key === k ? h(E, y, x, D) : null;
          case F:
            return x.key === k ? T(E, y, x, D) : null;
          case ft:
            return x = Ua(x), S(E, y, x, D);
        }
        if (ct(x) || K(x))
          return k !== null ? null : z(E, y, x, D, null);
        if (typeof x.then == "function")
          return S(
            E,
            y,
            Ei(x),
            D
          );
        if (x.$$typeof === yt)
          return S(
            E,
            y,
            bi(E, x),
            D
          );
        Ti(E, x);
      }
      return null;
    }
    function M(E, y, x, D, k) {
      if (typeof D == "string" && D !== "" || typeof D == "number" || typeof D == "bigint")
        return E = E.get(x) || null, f(y, E, "" + D, k);
      if (typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case Ft:
            return E = E.get(
              D.key === null ? x : D.key
            ) || null, h(y, E, D, k);
          case F:
            return E = E.get(
              D.key === null ? x : D.key
            ) || null, T(y, E, D, k);
          case ft:
            return D = Ua(D), M(
              E,
              y,
              x,
              D,
              k
            );
        }
        if (ct(D) || K(D))
          return E = E.get(x) || null, z(y, E, D, k, null);
        if (typeof D.then == "function")
          return M(
            E,
            y,
            x,
            Ei(D),
            k
          );
        if (D.$$typeof === yt)
          return M(
            E,
            y,
            x,
            bi(y, D),
            k
          );
        Ti(y, D);
      }
      return null;
    }
    function Q(E, y, x, D) {
      for (var k = null, At = null, ut = y, st = y = 0, se = null; ut !== null && st < x.length; st++) {
        ut.index > st ? (se = ut, ut = null) : se = ut.sibling;
        var wt = S(
          E,
          ut,
          x[st],
          D
        );
        if (wt === null) {
          ut === null && (ut = se);
          break;
        }
        t && ut && wt.alternate === null && e(E, ut), y = u(wt, y, st), At === null ? k = wt : At.sibling = wt, At = wt, ut = se;
      }
      if (st === x.length)
        return l(E, ut), Et && Dl(E, st), k;
      if (ut === null) {
        for (; st < x.length; st++)
          ut = w(E, x[st], D), ut !== null && (y = u(
            ut,
            y,
            st
          ), At === null ? k = ut : At.sibling = ut, At = ut);
        return Et && Dl(E, st), k;
      }
      for (ut = a(ut); st < x.length; st++)
        se = M(
          ut,
          E,
          st,
          x[st],
          D
        ), se !== null && (t && (wt = se.alternate, wt !== null && ut.delete(wt.key === null ? st : wt.key)), y = u(
          se,
          y,
          st
        ), At === null ? k = se : At.sibling = se, At = se);
      return t && ut.forEach(function(ya) {
        return e(E, ya);
      }), Et && Dl(E, st), k;
    }
    function et(E, y, x, D) {
      if (x == null) throw Error(s(151));
      for (var k = null, At = null, ut = y, st = y = 0, se = null, wt = x.next(); ut !== null && !wt.done; st++, wt = x.next()) {
        ut.index > st ? (se = ut, ut = null) : se = ut.sibling;
        var ya = S(E, ut, wt.value, D);
        if (ya === null) {
          ut === null && (ut = se);
          break;
        }
        t && ut && ya.alternate === null && e(E, ut), y = u(ya, y, st), At === null ? k = ya : At.sibling = ya, At = ya, ut = se;
      }
      if (wt.done)
        return l(E, ut), Et && Dl(E, st), k;
      if (ut === null) {
        for (; !wt.done; st++, wt = x.next())
          wt = w(E, wt.value, D), wt !== null && (y = u(wt, y, st), At === null ? k = wt : At.sibling = wt, At = wt);
        return Et && Dl(E, st), k;
      }
      for (ut = a(ut); !wt.done; st++, wt = x.next())
        wt = M(ut, E, st, wt.value, D), wt !== null && (t && (se = wt.alternate, se !== null && ut.delete(
          se.key === null ? st : se.key
        )), y = u(wt, y, st), At === null ? k = wt : At.sibling = wt, At = wt);
      return t && ut.forEach(function(by) {
        return e(E, by);
      }), Et && Dl(E, st), k;
    }
    function pt(E, y, x, D) {
      if (typeof x == "object" && x !== null && x.type === I && x.key === null && x.props.ref === void 0 && (x = x.props.children), typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case Ft:
            t: {
              for (var k = x.key; y !== null; ) {
                if (y.key === k) {
                  if (k = x.type, k === I) {
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
                  } else if (y.elementType === k || typeof k == "object" && k !== null && k.$$typeof === ft && Ua(k) === y.type) {
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
              x.type === I ? (D = za(
                x.props.children,
                E.mode,
                D,
                x.key
              ), Il(D, x), D.return = E, E = D) : (D = di(
                x.type,
                x.key,
                x.props,
                null,
                E.mode,
                D
              ), Il(D, x), D.return = E, E = D);
            }
            return i(E);
          case F:
            t: {
              for (k = x.key; y !== null; ) {
                if (y.key === k)
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
              D = ts(x, E.mode, D), D.return = E, E = D;
            }
            return i(E);
          case ft:
            return x = Ua(x), pt(
              E,
              y,
              x,
              D
            );
        }
        if (ct(x))
          return Q(
            E,
            y,
            x,
            D
          );
        if (K(x)) {
          if (k = K(x), typeof k != "function") throw Error(s(150));
          return x = k.call(x), et(
            E,
            y,
            x,
            D
          );
        }
        if (typeof x.then == "function")
          return pt(
            E,
            y,
            Ei(x),
            D
          );
        if (x.$$typeof === yt)
          return pt(
            E,
            y,
            bi(E, x),
            D
          );
        Ti(E, x);
      }
      return typeof x == "string" && x !== "" || typeof x == "number" || typeof x == "bigint" ? (x = "" + x, y !== null && y.tag === 6 ? (l(E, y.sibling), D = n(y, x), D.return = E, E = D) : (l(E, y), D = Pc(x, E.mode, D), D.return = E, E = D), i(E)) : l(E, y);
    }
    return function(E, y, x, D) {
      try {
        fu = 0;
        var k = pt(
          E,
          y,
          x,
          D
        );
        return yn = null, k;
      } catch (ut) {
        if (ut === gn || ut === Si) throw ut;
        var At = De(29, ut, null, E.mode);
        return At.lanes = D, At.return = E, At;
      }
    };
  }
  var Ha = Yo(!0), qo = Yo(!1), Pl = !1;
  function fs(t) {
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
    if (a = a.shared, (Bt & 2) !== 0) {
      var n = a.pending;
      return n === null ? e.next = e : (e.next = n.next, n.next = e), a.pending = e, e = oi(t), To(t, null, l), e;
    }
    return fi(t, a, e, l), oi(t);
  }
  function ou(t, e, l) {
    if (e = e.updateQueue, e !== null && (e = e.shared, (l & 4194048) !== 0)) {
      var a = e.lanes;
      a &= t.pendingLanes, l |= a, e.lanes = l, Mf(t, l);
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
    var u = n.firstBaseUpdate, i = n.lastBaseUpdate, f = n.shared.pending;
    if (f !== null) {
      n.shared.pending = null;
      var h = f, T = h.next;
      h.next = null, i === null ? u = T : i.next = T, i = h;
      var z = t.alternate;
      z !== null && (z = z.updateQueue, f = z.lastBaseUpdate, f !== i && (f === null ? z.firstBaseUpdate = T : f.next = T, z.lastBaseUpdate = h));
    }
    if (u !== null) {
      var w = n.baseState;
      i = 0, z = T = h = null, f = u;
      do {
        var S = f.lane & -536870913, M = S !== f.lane;
        if (M ? (Ct & S) === S : (a & S) === S) {
          S !== 0 && S === Da && (ms = !0), z !== null && (z = z.next = {
            lane: 0,
            tag: f.tag,
            payload: f.payload,
            callback: null,
            next: null
          });
          t: {
            var Q = t, et = f;
            S = e;
            var pt = l;
            switch (et.tag) {
              case 1:
                if (Q = et.payload, typeof Q == "function") {
                  w = Q.call(pt, w, S);
                  break t;
                }
                w = Q;
                break t;
              case 3:
                Q.flags = Q.flags & -65537 | 128;
              case 0:
                if (Q = et.payload, S = typeof Q == "function" ? Q.call(pt, w, S) : Q, S == null) break t;
                w = Z({}, w, S);
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
          }, z === null ? (T = z = M, h = w) : z = z.next = M, i |= S;
        if (f = f.next, f === null) {
          if (f = n.shared.pending, f === null)
            break;
          M = f, f = M.next, M.next = null, n.lastBaseUpdate = M, n.shared.pending = null;
        }
      } while (!0);
      z === null && (h = w), n.baseState = h, n.firstBaseUpdate = T, n.lastBaseUpdate = z, u === null && (n.shared.lanes = 0), sa |= i, t.lanes = i, t.memoizedState = w;
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
  var la = ne(null), Ni = ne(0);
  function Vo(t, e) {
    t = ql, q(Ni, t), q(la, e), ql = t | e.baseLanes;
  }
  function hs() {
    q(Ni, ql), q(la, la.current);
  }
  function vs() {
    ql = Ni.current, Zt(la), Zt(Ni);
  }
  var be = ne(null), Ne = null;
  function aa(t) {
    var e = t.alternate;
    q(pe, pe.current & 1), q(be, t), Ne === null && (e === null || la.current !== null || e.memoizedState !== null) && (Ne = t);
  }
  function gs(t) {
    q(pe, pe.current), q(be, t), Ne === null && (Ne = t);
  }
  function Qo(t) {
    t.tag === 22 ? (q(pe, pe.current), q(be, t), Ne === null && (Ne = t)) : na();
  }
  function na() {
    q(pe, pe.current), q(be, be.current);
  }
  function Xe(t) {
    Zt(be), Ne === t && (Ne = null), Zt(pe);
  }
  var pe = ne(0);
  function hu(t, e) {
    q(be, be.current), q(pe, e);
  }
  function ys(t) {
    Zt(pe), Zt(be), Ne === t && (Ne = null);
  }
  function xi(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var l = e.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || Yr(l) || qr(l)))
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
  var Bl = 0, bt = null, Qt = null, ie = null, Mi = !1, bn = !1, La = !1, Oi = 0, vu = 0, pn = null, Yv = 0;
  function ee() {
    throw Error(s(321));
  }
  function bs(t, e) {
    if (e === null) return !1;
    for (var l = 0; l < e.length && l < t.length; l++)
      if (!Ge(t[l], e[l])) return !1;
    return !0;
  }
  function ps(t, e, l, a, n, u) {
    return Bl = u, bt = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, tt.H = t === null || t.memoizedState === null ? Od : zd, La = !1, u = l(a, n), La = !1, bn && (u = Ko(
      e,
      l,
      a,
      n
    )), Zo(t), u;
  }
  function Zo(t) {
    tt.H = wi;
    var e = Qt !== null && Qt.next !== null;
    if (Bl = 0, ie = Qt = bt = null, Mi = !1, vu = 0, pn = null, e) throw Error(s(300));
    t === null || ce || (t = t.dependencies, t !== null && yi(t) && (ce = !0));
  }
  function Ko(t, e, l, a) {
    bt = t;
    var n = 0;
    do {
      if (bn && (pn = null), vu = 0, bn = !1, 25 <= n) throw Error(s(301));
      if (n += 1, ie = Qt = null, t.updateQueue != null) {
        var u = t.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      tt.H = Jv, u = e(l, a);
    } while (bn);
    return u;
  }
  function qv() {
    var t = tt.H, e = t.useState()[0];
    return e = typeof e.then == "function" ? gu(e) : e, t = t.useState()[0], (Qt !== null ? Qt.memoizedState : null) !== t && (bt.flags |= 1024), e;
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
    Bl = 0, ie = Qt = bt = null, bn = !1, vu = Oi = 0, pn = null;
  }
  function ze() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return ie === null ? bt.memoizedState = ie = t : ie = ie.next = t, ie;
  }
  function ae() {
    if (Qt === null) {
      var t = bt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Qt.next;
    var e = ie === null ? bt.memoizedState : ie.next;
    if (e !== null)
      ie = e, Qt = t;
    else {
      if (t === null)
        throw bt.alternate === null ? Error(s(467)) : Error(s(310));
      Qt = t, t = {
        memoizedState: Qt.memoizedState,
        baseState: Qt.baseState,
        baseQueue: Qt.baseQueue,
        queue: Qt.queue,
        next: null
      }, ie === null ? bt.memoizedState = ie = t : ie = ie.next = t;
    }
    return ie;
  }
  function zi() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function gu(t) {
    var e = vu;
    return vu += 1, pn === null && (pn = []), t = Bo(pn, t, e), e = bt, (ie === null ? e.memoizedState : ie.next) === null && (e = e.alternate, tt.H = e === null || e.memoizedState === null ? Od : zd), t;
  }
  function Ci(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return gu(t);
      if (t.$$typeof === L) return;
      if (t.$$typeof === yt) return ye(t);
    }
    throw Error(s(438, String(t)));
  }
  function Ts(t) {
    var e = null, l = bt.updateQueue;
    if (l !== null && (e = l.memoCache), e == null) {
      var a = bt.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (e = {
        data: a.data.map(function(n) {
          return n.slice();
        }),
        index: 0
      })));
    }
    if (e == null && (e = { data: [], index: 0 }), l === null && (l = zi(), bt.updateQueue = l), l.memoCache = e, l = e.data[e.index], l === void 0)
      for (l = e.data[e.index] = Array(t), a = 0; a < t; a++)
        l[a] = Me;
    return e.index++, l;
  }
  function Hl(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function Ai(t) {
    var e = ae();
    return Ns(e, Qt, t);
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
      var f = i = null, h = null, T = e, z = !1;
      do {
        var w = T.lane & -536870913;
        if (w !== T.lane ? (Ct & w) === w : (Bl & w) === w) {
          var S = T.revertLane;
          if (S === 0)
            h !== null && (h = h.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: T.action,
              hasEagerState: T.hasEagerState,
              eagerState: T.eagerState,
              next: null
            }), w === Da && (z = !0);
          else if ((Bl & S) === S) {
            T = T.next, S === Da && (z = !0);
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
            }, h === null ? (f = h = w, i = u) : h = h.next = w, bt.lanes |= S, sa |= S;
          w = T.action, La && l(u, w), u = T.hasEagerState ? T.eagerState : l(u, w);
        } else
          S = {
            lane: w,
            revertLane: T.revertLane,
            gesture: T.gesture,
            action: T.action,
            hasEagerState: T.hasEagerState,
            eagerState: T.eagerState,
            next: null
          }, h === null ? (f = h = S, i = u) : h = h.next = S, bt.lanes |= w, sa |= w;
        T = T.next;
      } while (T !== null && T !== e);
      if (h === null ? i = u : h.next = f, !Ge(u, t.memoizedState) && (ce = !0, z && (l = vn, l !== null)))
        throw l;
      t.memoizedState = u, t.baseState = i, t.baseQueue = h, a.lastRenderedState = u;
    }
    return n === null && (a.lanes = 0), [t.memoizedState, a.dispatch];
  }
  function xs(t) {
    var e = ae(), l = e.queue;
    if (l === null) throw Error(s(311));
    l.lastRenderedReducer = t;
    var a = l.dispatch, n = l.pending, u = e.memoizedState;
    if (n !== null) {
      l.pending = null;
      var i = n = n.next;
      do
        u = t(u, i.action), i = i.next;
      while (i !== n);
      Ge(u, e.memoizedState) || (ce = !0), e.memoizedState = u, e.baseQueue === null && (e.baseState = u), l.lastRenderedState = u;
    }
    return [u, a];
  }
  function Jo(t, e, l) {
    var a = bt, n = ae(), u = Et;
    if (u) {
      if (l === void 0) throw Error(s(407));
      l = l();
    } else l = e();
    var i = !Ge(
      (Qt || n).memoizedState,
      l
    );
    if (i && (n.memoizedState = l, ce = !0), n = n.queue, zs(ko.bind(null, a, n, t), [
      t
    ]), t = n.getSnapshot !== e || i || ie !== null && (ie.memoizedState.tag & 1) !== 0, Sn(
      t ? 9 : 8,
      { destroy: void 0 },
      Fo.bind(null, a, n, l, e),
      null
    ), t) {
      if (a.flags |= 2048, Kt === null) throw Error(s(349));
      u || (Bl & 127) !== 0 || $o(a, e, l);
    }
    return l;
  }
  function $o(t, e, l) {
    t.flags |= 16384, t = { getSnapshot: e, value: l }, e = bt.updateQueue, e === null ? (e = zi(), bt.updateQueue = e, e.stores = [t]) : (l = e.stores, l === null ? e.stores = [t] : l.push(t));
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
      return !Ge(t, l);
    } catch {
      return !0;
    }
  }
  function Io(t) {
    var e = Oa(t, 2);
    e !== null && He(e, t, 2);
  }
  function Ms(t) {
    var e = ze();
    if (typeof t == "function") {
      var l = t;
      if (t = l(), La) {
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
      lastRenderedReducer: Hl,
      lastRenderedState: t
    }, e;
  }
  function Po(t, e, l, a) {
    return t.baseState = l, Ns(
      t,
      Qt,
      typeof a == "function" ? a : Hl
    );
  }
  function Gv(t, e, l, a, n) {
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
      tt.T !== null ? l(!0) : u.isTransition = !1, a(u), l = e.pending, l === null ? (u.next = e.pending = u, td(e, u)) : (u.next = l.next, e.pending = l.next = u);
    }
  }
  function td(t, e) {
    var l = e.action, a = e.payload, n = t.state;
    if (e.isTransition) {
      var u = tt.T, i = {};
      i.types = u !== null ? u.types : null, tt.T = i;
      try {
        var f = l(n, a), h = tt.S;
        h !== null && h(i, f), ed(t, e, f);
      } catch (T) {
        Os(t, e, T);
      } finally {
        u !== null && i.types !== null && (u.types = i.types), tt.T = u;
      }
    } else
      try {
        u = l(n, a), ed(t, e, u);
      } catch (T) {
        Os(t, e, T);
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
    if (Et) {
      var l = Kt.formState;
      if (l !== null) {
        t: {
          var a = bt;
          if (Et) {
            if (Jt) {
              e: {
                for (var n = Jt, u = el; n.nodeType !== 8; ) {
                  if (!u) {
                    n = null;
                    break e;
                  }
                  if (n = al(
                    n.nextSibling
                  ), n === null) {
                    n = null;
                    break e;
                  }
                }
                u = n.data, n = u === "F!" || u === "F" ? n : null;
              }
              if (n) {
                Jt = al(
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
    return l = ze(), l.memoizedState = l.baseState = e, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: nd,
      lastRenderedState: e
    }, l.queue = a, l = Nd.bind(
      null,
      bt,
      a
    ), a.dispatch = l, a = Ms(!1), u = Ds.bind(
      null,
      bt,
      !1,
      a.queue
    ), a = ze(), n = {
      state: e,
      dispatch: null,
      action: t,
      pending: null
    }, a.queue = n, l = Gv.bind(
      null,
      bt,
      n,
      u,
      l
    ), n.dispatch = l, a.memoizedState = t, [e, l, !1];
  }
  function id(t) {
    var e = ae();
    return cd(e, Qt, t);
  }
  function cd(t, e, l) {
    if (e = Ns(
      t,
      e,
      nd
    )[0], t = Ai(Hl)[0], typeof e == "object" && e !== null && typeof e.then == "function")
      try {
        var a = gu(e);
      } catch (i) {
        throw i === gn ? Si : i;
      }
    else a = e;
    e = ae();
    var n = e.queue, u = n.dispatch;
    return l !== e.memoizedState && (bt.flags |= 2048, Sn(
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
    var e = ae(), l = Qt;
    if (l !== null)
      return cd(e, l, t);
    ae(), e = e.memoizedState, l = ae();
    var a = l.queue.dispatch;
    return l.memoizedState = t, [e, a, !1];
  }
  function Sn(t, e, l, a) {
    return t = { tag: t, create: l, deps: a, inst: e, next: null }, e = bt.updateQueue, e === null && (e = zi(), bt.updateQueue = e), l = e.lastEffect, l === null ? e.lastEffect = t.next = t : (a = l.next, l.next = t, t.next = a, e.lastEffect = t), t;
  }
  function rd() {
    return ae().memoizedState;
  }
  function ji(t, e, l, a) {
    var n = ze();
    bt.flags |= t, n.memoizedState = Sn(
      1 | e,
      { destroy: void 0 },
      l,
      a === void 0 ? null : a
    );
  }
  function Ri(t, e, l, a) {
    var n = ae();
    a = a === void 0 ? null : a;
    var u = n.memoizedState.inst;
    Qt !== null && a !== null && bs(a, Qt.memoizedState.deps) ? n.memoizedState = Sn(e, u, l, a) : (bt.flags |= t, n.memoizedState = Sn(
      1 | e,
      u,
      l,
      a
    ));
  }
  function fd(t, e) {
    ji(8390656, 8, t, e);
  }
  function zs(t, e) {
    Ri(2048, 8, t, e);
  }
  function Vv(t) {
    bt.flags |= 4;
    var e = bt.updateQueue;
    if (e === null)
      e = zi(), bt.updateQueue = e, e.events = [t];
    else {
      var l = e.events;
      l === null ? e.events = [t] : l.push(t);
    }
  }
  function od(t) {
    var e = ae().memoizedState;
    return Vv({ ref: e, nextImpl: t }), function() {
      if ((Bt & 2) !== 0) throw Error(s(440));
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
  function Cs() {
  }
  function gd(t, e) {
    var l = ae();
    e = e === void 0 ? null : e;
    var a = l.memoizedState;
    return e !== null && bs(e, a[1]) ? a[0] : (l.memoizedState = [t, e], t);
  }
  function yd(t, e) {
    var l = ae();
    e = e === void 0 ? null : e;
    var a = l.memoizedState;
    if (e !== null && bs(e, a[1]))
      return a[0];
    if (a = t(), La) {
      Zl(!0);
      try {
        t();
      } finally {
        Zl(!1);
      }
    }
    return l.memoizedState = [a, e], a;
  }
  function As(t, e, l) {
    return l === void 0 || (Bl & 1073741824) !== 0 && (Ct & 261930) === 0 ? t.memoizedState = e : (t.memoizedState = l, t = Om(), bt.lanes |= t, sa |= t, l);
  }
  function bd(t, e, l, a) {
    return Ge(l, e) ? l : la.current !== null ? (t = As(t, l, a), Ge(t, e) || (ce = !0), t) : (Bl & 106) === 0 || (Bl & 1073741824) !== 0 && (Ct & 261930) === 0 ? (ce = !0, t.memoizedState = l) : (t = Om(), bt.lanes |= t, sa |= t, e);
  }
  function pd(t, e, l, a, n) {
    var u = nt.p;
    nt.p = u !== 0 && 8 > u ? u : 8;
    var i = tt.T, f = {};
    f.types = i !== null ? i.types : null, tt.T = f, Ds(t, !1, e, l);
    try {
      var h = n(), T = tt.S;
      if (T !== null && T(f, h), h !== null && typeof h == "object" && typeof h.then == "function") {
        var z = Lv(
          h,
          a
        );
        yu(
          t,
          e,
          z,
          Ke(t)
        );
      } else
        yu(
          t,
          e,
          a,
          Ke(t)
        );
    } catch (w) {
      yu(
        t,
        e,
        { then: function() {
        }, status: "rejected", reason: w },
        Ke()
      );
    } finally {
      nt.p = u, i !== null && f.types !== null && (i.types = f.types), tt.T = i;
    }
  }
  function Qv() {
  }
  function js(t, e, l, a) {
    if (t.tag !== 5) throw Error(s(476));
    var n = Sd(t).queue;
    pd(
      t,
      n,
      e,
      Vt,
      l === null ? Qv : function() {
        return _d(t), l(a);
      }
    );
  }
  function Sd(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: Vt,
      baseState: Vt,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Hl,
        lastRenderedState: Vt
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
        lastRenderedReducer: Hl,
        lastRenderedState: l
      },
      next: null
    }, t.memoizedState = e, t = t.alternate, t !== null && (t.memoizedState = e), e;
  }
  function _d(t) {
    var e = Sd(t);
    e.next === null && (e = t.alternate.memoizedState), yu(
      t,
      e.next.queue,
      {},
      Ke()
    );
  }
  function Rs() {
    return ye(Yn);
  }
  function Ed() {
    return ae().memoizedState;
  }
  function Td() {
    return ae().memoizedState;
  }
  function Zv(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var l = Ke();
          t = ta(l);
          var a = ea(e, t, l);
          a !== null && (He(a, e, l), ou(a, e, l)), e = { cache: is() }, t.payload = e;
          return;
      }
      e = e.return;
    }
  }
  function Kv(t, e, l) {
    var a = Ke();
    l = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Di(t) ? xd(e, l) : (l = Wc(t, e, l, a), l !== null && (He(l, t, a), Md(l, e, a)));
  }
  function Nd(t, e, l) {
    var a = Ke();
    yu(t, e, l, a);
  }
  function yu(t, e, l, a) {
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
          var i = e.lastRenderedState, f = u(i, l);
          if (n.hasEagerState = !0, n.eagerState = f, Ge(f, i))
            return fi(t, e, n, 0), Kt === null && ri(), !1;
        } catch {
        }
      if (l = Wc(t, e, n, a), l !== null)
        return He(l, t, a), Md(l, e, a), !0;
    }
    return !1;
  }
  function Ds(t, e, l, a) {
    if (a = {
      lane: 2,
      revertLane: Tr(),
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
      ), e !== null && He(e, t, 2);
  }
  function Di(t) {
    var e = t.alternate;
    return t === bt || e !== null && e === bt;
  }
  function xd(t, e) {
    bn = Mi = !0;
    var l = t.pending;
    l === null ? e.next = e : (e.next = l.next, l.next = e), t.pending = e;
  }
  function Md(t, e, l) {
    if ((l & 4194048) !== 0) {
      var a = e.lanes;
      a &= t.pendingLanes, l |= a, e.lanes = l, Mf(t, l);
    }
  }
  var wi = {
    readContext: ye,
    use: Ci,
    useCallback: ee,
    useContext: ee,
    useEffect: ee,
    useImperativeHandle: ee,
    useLayoutEffect: ee,
    useInsertionEffect: ee,
    useMemo: ee,
    useReducer: ee,
    useRef: ee,
    useState: ee,
    useDebugValue: ee,
    useDeferredValue: ee,
    useTransition: ee,
    useSyncExternalStore: ee,
    useId: ee,
    useHostTransitionStatus: ee,
    useFormState: ee,
    useActionState: ee,
    useOptimistic: ee,
    useMemoCache: ee,
    useCacheRefresh: ee,
    useEffectEvent: ee
  }, Od = {
    readContext: ye,
    use: Ci,
    useCallback: function(t, e) {
      return ze().memoizedState = [
        t,
        e === void 0 ? null : e
      ], t;
    },
    useContext: ye,
    useEffect: fd,
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
      var l = ze();
      e = e === void 0 ? null : e;
      var a = t();
      if (La) {
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
      var a = ze();
      if (l !== void 0) {
        var n = l(e);
        if (La) {
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
        bt,
        t
      ), [a.memoizedState, t];
    },
    useRef: function(t) {
      var e = ze();
      return t = { current: t }, e.memoizedState = t;
    },
    useState: function(t) {
      t = Ms(t);
      var e = t.queue, l = Nd.bind(null, bt, e);
      return e.dispatch = l, [t.memoizedState, l];
    },
    useDebugValue: Cs,
    useDeferredValue: function(t, e) {
      var l = ze();
      return As(l, t, e);
    },
    useTransition: function() {
      var t = Ms(!1);
      return t = pd.bind(
        null,
        bt,
        t.queue,
        !0,
        !1
      ), ze().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, e, l) {
      var a = bt, n = ze();
      if (Et) {
        if (l === void 0)
          throw Error(s(407));
        l = l();
      } else {
        if (l = e(), Kt === null)
          throw Error(s(349));
        (Ct & 127) !== 0 || $o(a, e, l);
      }
      n.memoizedState = l;
      var u = { value: l, getSnapshot: e };
      return n.queue = u, fd(ko.bind(null, a, u, t), [
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
      var t = ze(), e = Kt.identifierPrefix;
      if (Et) {
        var l = gl, a = vl;
        l = (a & ~(1 << 32 - Ye(a) - 1)).toString(32) + l, e = "_" + e + "R_" + l, l = Oi++, 0 < l && (e += "H" + l.toString(32)), e += "_";
      } else
        l = Yv++, e = "_" + e + "r_" + l.toString(32) + "_";
      return t.memoizedState = e;
    },
    useHostTransitionStatus: Rs,
    useFormState: ud,
    useActionState: ud,
    useOptimistic: function(t) {
      var e = ze();
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
        bt,
        !0,
        l
      ), l.dispatch = e, [t, e];
    },
    useMemoCache: Ts,
    useCacheRefresh: function() {
      return ze().memoizedState = Zv.bind(
        null,
        bt
      );
    },
    useEffectEvent: function(t) {
      var e = ze(), l = { impl: t };
      return e.memoizedState = l, function() {
        if ((Bt & 2) !== 0)
          throw Error(s(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, zd = {
    readContext: ye,
    use: Ci,
    useCallback: gd,
    useContext: ye,
    useEffect: zs,
    useImperativeHandle: vd,
    useInsertionEffect: dd,
    useLayoutEffect: md,
    useMemo: yd,
    useReducer: Ai,
    useRef: rd,
    useState: function() {
      return Ai(Hl);
    },
    useDebugValue: Cs,
    useDeferredValue: function(t, e) {
      var l = ae();
      return bd(
        l,
        Qt.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = Ai(Hl)[0], e = ae().memoizedState;
      return [
        typeof t == "boolean" ? t : gu(t),
        e
      ];
    },
    useSyncExternalStore: Jo,
    useId: Ed,
    useHostTransitionStatus: Rs,
    useFormState: id,
    useActionState: id,
    useOptimistic: function(t, e) {
      var l = ae();
      return Po(l, Qt, t, e);
    },
    useMemoCache: Ts,
    useCacheRefresh: Td,
    useEffectEvent: od
  }, Jv = {
    readContext: ye,
    use: Ci,
    useCallback: gd,
    useContext: ye,
    useEffect: zs,
    useImperativeHandle: vd,
    useInsertionEffect: dd,
    useLayoutEffect: md,
    useMemo: yd,
    useReducer: xs,
    useRef: rd,
    useState: function() {
      return xs(Hl);
    },
    useDebugValue: Cs,
    useDeferredValue: function(t, e) {
      var l = ae();
      return Qt === null ? As(l, t, e) : bd(
        l,
        Qt.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = xs(Hl)[0], e = ae().memoizedState;
      return [
        typeof t == "boolean" ? t : gu(t),
        e
      ];
    },
    useSyncExternalStore: Jo,
    useId: Ed,
    useHostTransitionStatus: Rs,
    useFormState: sd,
    useActionState: sd,
    useOptimistic: function(t, e) {
      var l = ae();
      return Qt !== null ? Po(l, Qt, t, e) : (l.baseState = t, [t, l.queue.dispatch]);
    },
    useMemoCache: Ts,
    useCacheRefresh: Td,
    useEffectEvent: od
  };
  function ws(t, e, l, a) {
    e = t.memoizedState, l = l(a, e), l = l == null ? e : Z({}, e, l), t.memoizedState = l, t.lanes === 0 && (t.updateQueue.baseState = l);
  }
  var Us = {
    enqueueSetState: function(t, e, l) {
      t = t._reactInternals;
      var a = Ke(), n = ta(a);
      n.payload = e, l != null && (n.callback = l), e = ea(t, n, a), e !== null && (He(e, t, a), ou(e, t, a));
    },
    enqueueReplaceState: function(t, e, l) {
      t = t._reactInternals;
      var a = Ke(), n = ta(a);
      n.tag = 1, n.payload = e, l != null && (n.callback = l), e = ea(t, n, a), e !== null && (He(e, t, a), ou(e, t, a));
    },
    enqueueForceUpdate: function(t, e) {
      t = t._reactInternals;
      var l = Ke(), a = ta(l);
      a.tag = 2, e != null && (a.callback = e), e = ea(t, a, l), e !== null && (He(e, t, l), ou(e, t, l));
    }
  };
  function Cd(t, e, l, a, n, u, i) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(a, u, i) : e.prototype && e.prototype.isPureReactComponent ? !au(l, a) || !au(n, u) : !0;
  }
  function Ad(t, e, l, a) {
    t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(l, a), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(l, a), e.state !== t && Us.enqueueReplaceState(e, e.state, null);
  }
  function Ya(t, e) {
    var l = e;
    if ("ref" in e) {
      l = {};
      for (var a in e)
        a !== "ref" && (l[a] = e[a]);
    }
    if (t = t.defaultProps) {
      l === e && (l = Z({}, l));
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
  function Ui(t, e) {
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
  function Bs(t, e, l) {
    return l = ta(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      Ui(t, e);
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
      if (e = l.alternate, e !== null && ja(
        e,
        l,
        n,
        !0
      ), l = be.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
          case 19:
            return Ne === null ? lc() : l.alternate === null && le === 0 && (le = 3), l.flags &= -257, l.flags |= 65536, l.lanes = n, a === _i ? l.flags |= 16384 : (e = l.updateQueue, e === null ? l.updateQueue = /* @__PURE__ */ new Set([a]) : e.add(a), Sr(t, a, n)), !1;
          case 22:
            return l.flags |= 65536, a === _i ? l.flags |= 16384 : (e = l.updateQueue, e === null ? (e = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, l.updateQueue = e) : (l = e.retryQueue, l === null ? e.retryQueue = /* @__PURE__ */ new Set([a]) : l.add(a)), Sr(t, a, n)), !1;
        }
        throw Error(s(435, l.tag));
      }
      return Sr(t, a, n), lc(), !1;
    }
    if (Et)
      return e = be.current, e !== null ? ((e.flags & 65536) === 0 && (e.flags |= 256), e.flags |= 65536, e.lanes = n, a !== ls && (t = Error(s(422), { cause: a }), iu(Ie(t, l)))) : (a !== ls && (e = Error(s(423), {
        cause: a
      }), iu(
        Ie(e, l)
      )), t = t.current.alternate, t.flags |= 65536, n &= -n, t.lanes |= n, a = Ie(a, l), n = Bs(
        t.stateNode,
        a,
        n
      ), ds(t, n), le !== 4 && (le = 2)), !1;
    var u = Error(s(520), { cause: a });
    if (u = Ie(u, l), xu === null ? xu = [u] : xu.push(u), le !== 4 && (le = 2), e === null) return !0;
    a = Ie(a, l), l = e;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, t = n & -n, l.lanes |= t, t = Bs(l.stateNode, a, t), ds(l, t), !1;
        case 1:
          if (e = l.type, u = l.stateNode, (l.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (ra === null || !ra.has(u))))
            return l.flags |= 65536, n &= -n, l.lanes |= n, n = Ud(n), Bd(
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
  var Hs = Error(s(461)), ce = !1;
  function fe(t, e, l, a) {
    e.child = t === null ? qo(e, null, l, a) : Ha(
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
    return Ra(e), a = ps(
      t,
      e,
      l,
      i,
      u,
      n
    ), f = Ss(), t !== null && !ce ? (_s(t, e, n), Ll(t, e, n)) : (Et && f && hi(e), e.flags |= 1, fe(t, e, a, n), e.child);
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
        return Ll(t, e, n);
    }
    return e.flags |= 1, t = Rl(u, a), t.ref = e.ref, t.return = e, e.child = t;
  }
  function Yd(t, e, l, a, n) {
    if (t !== null) {
      var u = t.memoizedProps;
      if (au(u, a) && t.ref === e.ref)
        if (ce = !1, e.pendingProps = a = u, Zs(t, n))
          (t.flags & 131072) !== 0 && (ce = !0);
        else
          return e.lanes = t.lanes, Ll(t, e, n);
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
        ), u !== null ? Vo(e, u) : hs(), Qo(e);
      else
        return a = e.lanes = 536870912, Gd(
          t,
          e,
          u !== null ? u.baseLanes | l : l,
          l,
          a
        );
    } else
      u !== null ? (pi(e, u.cachePool), Vo(e, u), na(), e.memoizedState = null) : (t !== null && pi(e, null), hs(), na());
    return fe(t, e, n, l), e.child;
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
    return u = u === null ? null : { parent: ue._currentValue, pool: u }, e.memoizedState = {
      baseLanes: l,
      cachePool: u
    }, t !== null && pi(e, null), hs(), Qo(e), t !== null && ja(t, e, a, !0), e.childLanes = n, null;
  }
  function Bi(t, e) {
    return e = Hi(
      { mode: e.mode, children: e.children },
      t.mode
    ), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function Xd(t, e, l) {
    return Ha(e, t.child, null, l), t = Bi(e, e.pendingProps), t.flags |= 2, Xe(e), e.memoizedState = null, t;
  }
  function Fv(t, e, l) {
    var a = e.pendingProps, n = (e.flags & 128) !== 0;
    if (e.flags &= -129, t === null) {
      if (Et) {
        if (a.mode === "hidden")
          return t = Bi(e, a), e.lanes = 536870912, t.memoizedState = { baseLanes: 0, cachePool: null }, bu(null, t);
        if (gs(e), (t = Jt) ? (t = hh(
          t,
          el
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: $l !== null ? { id: vl, overflow: gl } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = xo(t), l.return = e, e.child = l, me = e, Jt = null)) : t = null, t === null) throw kl(e);
        return e.lanes = 536870912, null;
      }
      return Bi(e, a);
    }
    var u = t.memoizedState;
    if (u !== null) {
      var i = u.dehydrated;
      if (gs(e), n)
        if (e.flags & 256)
          e.flags &= -257, e = Xd(
            t,
            e,
            l
          );
        else if (e.memoizedState !== null)
          e.child = t.child, e.flags |= 128, e = null;
        else throw Error(s(558));
      else if (ce || ja(t, e, l, !1), n = (l & t.childLanes) !== 0, ce || n) {
        if (la.current === null) {
          if (a = Kt, a !== null && (i = Of(a, l), i !== 0 && i !== u.retryLane))
            throw u.retryLane = i, Oa(t, i), He(a, t, i), Hs;
          lc();
        }
        e = Xd(
          t,
          e,
          l
        );
      } else
        t = u.treeContext, Jt = al(i.nextSibling), me = e, Et = !0, Fl = null, el = !1, t !== null && zo(e, t), e = Bi(e, a), e.flags |= 134221824;
      return e;
    }
    return t = Rl(t.child, {
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
    return Ra(e), l = ps(
      t,
      e,
      l,
      a,
      void 0,
      n
    ), a = Ss(), t !== null && !ce ? (_s(t, e, n), Ll(t, e, n)) : (Et && a && hi(e), e.flags |= 1, fe(t, e, l, n), e.child);
  }
  function Vd(t, e, l, a, n, u) {
    return Ra(e), e.updateQueue = null, l = Ko(
      e,
      a,
      l,
      n
    ), Zo(t), a = Ss(), t !== null && !ce ? (_s(t, e, u), Ll(t, e, u)) : (Et && a && hi(e), e.flags |= 1, fe(t, e, l, u), e.child);
  }
  function Qd(t, e, l, a, n) {
    if (Ra(e), e.stateNode === null) {
      var u = on, i = l.contextType;
      typeof i == "object" && i !== null && (u = ye(i)), u = new l(a, u), e.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = Us, e.stateNode = u, u._reactInternals = e, u = e.stateNode, u.props = a, u.state = e.memoizedState, u.refs = {}, fs(e), i = l.contextType, u.context = typeof i == "object" && i !== null ? ye(i) : on, u.state = e.memoizedState, i = l.getDerivedStateFromProps, typeof i == "function" && (ws(
        e,
        l,
        i,
        a
      ), u.state = e.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (i = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), i !== u.state && Us.enqueueReplaceState(u, u.state, null), mu(e, a, u, n), du(), u.state = e.memoizedState), typeof u.componentDidMount == "function" && (e.flags |= 4194308), a = !0;
    } else if (t === null) {
      u = e.stateNode;
      var f = e.memoizedProps, h = Ya(l, f);
      u.props = h;
      var T = u.context, z = l.contextType;
      i = on, typeof z == "object" && z !== null && (i = ye(z));
      var w = l.getDerivedStateFromProps;
      z = typeof w == "function" || typeof u.getSnapshotBeforeUpdate == "function", f = e.pendingProps !== f, z || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (f || T !== i) && Ad(
        e,
        u,
        a,
        i
      ), Pl = !1;
      var S = e.memoizedState;
      u.state = S, mu(e, a, u, n), du(), T = e.memoizedState, f || S !== T || Pl ? (typeof w == "function" && (ws(
        e,
        l,
        w,
        a
      ), T = e.memoizedState), (h = Pl || Cd(
        e,
        l,
        h,
        a,
        S,
        T,
        i
      )) ? (z || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = a, e.memoizedState = T), u.props = a, u.state = T, u.context = i, a = h) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), a = !1);
    } else {
      u = e.stateNode, os(t, e), i = e.memoizedProps, z = Ya(l, i), u.props = z, w = e.pendingProps, S = u.context, T = l.contextType, h = on, typeof T == "object" && T !== null && (h = ye(T)), f = l.getDerivedStateFromProps, (T = typeof f == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (i !== w || S !== h) && Ad(
        e,
        u,
        a,
        h
      ), Pl = !1, S = e.memoizedState, u.state = S, mu(e, a, u, n), du();
      var M = e.memoizedState;
      i !== w || S !== M || Pl || t !== null && t.dependencies !== null && yi(t.dependencies) ? (typeof f == "function" && (ws(
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
        h
      ) || t !== null && t.dependencies !== null && yi(t.dependencies)) ? (T || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(a, M, h), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        a,
        M,
        h
      )), typeof u.componentDidUpdate == "function" && (e.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && S === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && S === t.memoizedState || (e.flags |= 1024), e.memoizedProps = a, e.memoizedState = M), u.props = a, u.state = M, u.context = h, a = z) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && S === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && S === t.memoizedState || (e.flags |= 1024), a = !1);
    }
    return u = a, _n(t, e), a = (e.flags & 128) !== 0, u || a ? (u = e.stateNode, l = a && typeof l.getDerivedStateFromError != "function" ? null : u.render(), e.flags |= 1, t !== null && a ? (e.child = Ha(
      e,
      t.child,
      null,
      n
    ), e.child = Ha(
      e,
      null,
      l,
      n
    )) : fe(t, e, l, n), e.memoizedState = u.state, t = e.child) : t = Ll(
      t,
      e,
      n
    ), t;
  }
  function Zd(t, e, l, a) {
    return Ca(), e.flags |= 256, fe(t, e, l, a), e.child;
  }
  var Ys = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function qs(t) {
    return { baseLanes: t, cachePool: wo() };
  }
  function Gs(t, e, l) {
    return t = t !== null ? t.childLanes & ~l : 0, e && (t |= Ze), t;
  }
  function Kd(t, e, l) {
    var a = e.pendingProps, n = !1, u = (e.flags & 128) !== 0, i;
    if ((i = u) || (i = t !== null && t.memoizedState === null ? !1 : (pe.current & 2) !== 0), i && (n = !0, e.flags &= -129), i = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
      if (Et) {
        if (n ? aa(e) : na(), (t = Jt) ? (t = hh(
          t,
          el
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: $l !== null ? { id: vl, overflow: gl } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = xo(t), l.return = e, e.child = l, me = e, Jt = null)) : t = null, t === null) throw kl(e);
        return qr(t) ? e.lanes = 32 : e.lanes = 536870912, null;
      }
      return u = a.children, a = a.fallback, n ? (na(), n = e.mode, u = Hi(
        { mode: "hidden", children: u },
        n
      ), a = za(
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
    var f = t.memoizedState;
    if (f !== null) {
      var h = f.dehydrated;
      if (h !== null)
        return kv(
          t,
          e,
          u,
          i,
          a,
          h,
          f,
          l
        );
    }
    return n ? (na(), n = a.fallback, u = e.mode, f = t.child, h = f.sibling, a = Rl(f, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = f.subtreeFlags & 1206910976, h !== null ? n = Rl(h, n) : (n = za(
      n,
      u,
      l,
      null
    ), n.flags |= 2), n.return = e, a.return = e, a.sibling = n, e.child = a, bu(null, a), a = e.child, n = t.child.memoizedState, n === null ? n = qs(l) : (u = n.cachePool, u !== null ? (f = ue._currentValue, u = u.parent !== f ? { parent: f, pool: f } : u) : u = wo(), n = {
      baseLanes: n.baseLanes | l,
      cachePool: u
    }), a.memoizedState = n, a.childLanes = Gs(
      t,
      i,
      l
    ), e.memoizedState = Ys, bu(t.child, a)) : (aa(e), l = t.child, t = l.sibling, l = Rl(l, {
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
    return t = De(22, t, null, e), t.lanes = 0, t;
  }
  function Li(t, e, l) {
    return Ha(e, t.child, null, l), t = Xs(
      e,
      e.pendingProps.children
    ), t.flags |= 2, e.memoizedState = null, t;
  }
  function kv(t, e, l, a, n, u, i, f) {
    if (l)
      return e.flags & 256 ? (aa(e), e.flags &= -257, Li(
        t,
        e,
        f
      )) : e.memoizedState !== null ? (na(), e.child = t.child, e.flags |= 128, null) : (na(), u = n.fallback, i = e.mode, n = Hi(
        { mode: "visible", children: n.children },
        i
      ), u = za(
        u,
        i,
        f,
        null
      ), u.flags |= 2, n.return = e, u.return = e, n.sibling = u, e.child = n, Ha(e, t.child, null, f), n = e.child, n.memoizedState = qs(f), n.childLanes = Gs(
        t,
        a,
        f
      ), e.memoizedState = Ys, bu(null, n));
    if (aa(e), qr(u)) {
      if (a = u.nextSibling && u.nextSibling.dataset, a) var h = a.dgst;
      return a = h, a !== "" && (n = Error(s(419)), n.stack = "", n.digest = a, iu({ value: n, source: null, stack: null })), Li(
        t,
        e,
        f
      );
    }
    if (ce || ja(t, e, f, !1), a = (f & t.childLanes) !== 0, ce || a) {
      if (la.current !== null)
        return Li(
          t,
          e,
          f
        );
      if (a = Kt, a !== null && (n = Of(
        a,
        f
      ), n !== 0 && n !== i.retryLane))
        throw i.retryLane = n, Oa(t, n), He(a, t, n), Hs;
      return Yr(u) || lc(), Li(
        t,
        e,
        f
      );
    }
    return Yr(u) ? (e.flags |= 192, e.child = t.child, null) : (t = i.treeContext, Jt = al(u.nextSibling), me = e, Et = !0, Fl = null, el = !1, t !== null && zo(e, t), e = Xs(
      e,
      n.children
    ), e.flags |= 134221824, e);
  }
  function Jd(t, e, l) {
    t.lanes |= e;
    var a = t.alternate;
    a !== null && (a.lanes |= e), gi(t.return, e, l);
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
  function Vs(t) {
    var e = t.child;
    for (t.child = null; e !== null; ) {
      var l = e.sibling;
      e.sibling = t.child, t.child = e, e = l;
    }
  }
  function Qs(t, e, l) {
    var a = e.pendingProps, n = a.revealOrder, u = a.tail;
    a = a.children;
    var i = pe.current;
    if (e.flags & 128)
      return hu(e, i), null;
    var f = (i & 2) !== 0;
    if (f ? (i = i & 1 | 2, e.flags |= 128) : i &= 1, hu(e, i), n === "backwards" && t !== null ? (Vs(t), fe(t, e, a, l), Vs(t)) : fe(t, e, a, l), a = Et ? uu : 0, !f && t !== null && (t.flags & 128) !== 0)
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
        l = $d(e.child), l === null ? (n = e.child, e.child = null) : (n = l.sibling, l.sibling = null, Vs(e)), Yi(
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
    return Wl(e, e.type, a.value), fe(t, e, a.children, l), e.child;
  }
  function Ll(t, e, l) {
    if (t !== null && (e.dependencies = t.dependencies), sa |= e.lanes, (l & e.childLanes) === 0)
      if (t !== null) {
        if (ja(
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
      for (t = e.child, l = Rl(t, t.pendingProps), e.child = l, l.return = e; t.sibling !== null; )
        t = t.sibling, l = l.sibling = Rl(t, t.pendingProps), l.return = e;
      l.sibling = null;
    }
    return e.child;
  }
  function Zs(t, e) {
    return (t.lanes & e) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && yi(t)));
  }
  function Wv(t, e, l) {
    switch (e.tag) {
      case 3:
        je(e, e.stateNode.containerInfo), Wl(e, ue, t.memoizedState.cache), Ca();
        break;
      case 27:
      case 5:
        Xl(e);
        break;
      case 4:
        je(e, e.stateNode.containerInfo);
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
          return e.flags |= 128, gs(e), null;
        break;
      case 13:
        var a = e.memoizedState;
        if (a !== null) {
          if (a.dehydrated !== null)
            return aa(e), e.flags |= 128, null;
          a = ja(
            t,
            e,
            l,
            !1
          );
          var n = e.child.childLanes;
          return a || (l & n) !== 0 ? Kd(t, e, l) : (aa(e), t = Ll(
            t,
            e,
            l
          ), t !== null ? t.sibling : null);
        }
        aa(e);
        break;
      case 19:
        if (e.flags & 128)
          return Qs(
            t,
            e,
            l
          );
        if (n = (t.flags & 128) !== 0, a = (l & e.childLanes) !== 0, a || (ja(
          t,
          e,
          l,
          !1
        ), a = (l & e.childLanes) !== 0), n) {
          if (a)
            return Qs(
              t,
              e,
              l
            );
          e.flags |= 128;
        }
        if (n = e.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), hu(e, pe.current), a) break;
        return null;
      case 22:
        return e.lanes = 0, qd(
          t,
          e,
          l,
          e.pendingProps
        );
      case 24:
        Wl(e, ue, t.memoizedState.cache);
    }
    return Ll(t, e, l);
  }
  function kd(t, e, l) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps)
        ce = !0;
      else {
        if (!Zs(t, l) && (e.flags & 128) === 0)
          return ce = !1, Wv(
            t,
            e,
            l
          );
        ce = (t.flags & 131072) !== 0;
      }
    else
      ce = !1, Et && (e.flags & 1048576) !== 0 && Oo(e, uu, e.index);
    switch (e.lanes = 0, e.tag) {
      case 16:
        t: {
          var a = e.pendingProps;
          if (t = Ua(e.elementType), e.type = t, typeof t == "function")
            Ic(t) ? (a = Ya(t, a), e.tag = 1, e = Qd(
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
              if (n === B) {
                e.tag = 11, e = Hd(
                  null,
                  e,
                  t,
                  a,
                  l
                );
                break t;
              } else if (n === it) {
                e.tag = 14, e = Ld(
                  null,
                  e,
                  t,
                  a,
                  l
                );
                break t;
              } else if (n === yt) {
                e.tag = 10, e.type = t, e = Fd(
                  null,
                  e,
                  l
                );
                break t;
              }
            }
            throw e = ot(t) || t, Error(s(306, e, ""));
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
        return a = e.type, n = Ya(
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
          if (je(
            e,
            e.stateNode.containerInfo
          ), t === null) throw Error(s(387));
          a = e.pendingProps;
          var u = e.memoizedState;
          n = u.element, os(t, e), mu(e, a, null, l);
          var i = e.memoizedState;
          if (a = i.cache, Wl(e, ue, a), a !== u.cache && us(
            e,
            [ue],
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
              n = Ie(
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
              for (t = e.stateNode.containerInfo, t.nodeType === 9 ? t = t.body : t = t.nodeName === "HTML" ? t.ownerDocument.body : t, Jt = al(t.firstChild), me = e, Et = !0, Fl = null, el = !0, l = qo(
                e,
                null,
                a,
                l
              ), e.child = l; l; )
                l.flags = l.flags & -3 | 134221824, l = l.sibling;
          else {
            if (Ca(), a === n) {
              e = Ll(
                t,
                e,
                l
              );
              break t;
            }
            fe(t, e, a, l);
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
        )) ? e.memoizedState = l : Et || (e.stateNode = th(
          e.type,
          e.pendingProps,
          jt.current,
          e
        )) : e.memoizedState = _h(
          e.type,
          t.memoizedProps,
          e.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return Xl(e), t === null && Et && (a = e.stateNode = yh(
          e.type,
          e.pendingProps,
          jt.current
        ), me = e, el = !0, n = Jt, da(e.type) ? (Gr = n, Jt = al(a.firstChild)) : Jt = n), fe(
          t,
          e,
          e.pendingProps.children,
          l
        ), _n(t, e), t === null && (e.flags |= 4194304), e.child;
      case 5:
        return t === null && Et && ((n = a = Jt) && (a = Zg(
          a,
          e.type,
          e.pendingProps,
          el
        ), a !== null ? (e.stateNode = a, me = e, Jt = al(a.firstChild), el = !1, n = !0) : n = !1), n || kl(e)), Xl(e), n = e.type, u = e.pendingProps, i = t !== null ? t.memoizedProps : null, a = u.children, Rr(n, u) ? a = null : i !== null && Rr(n, i) && (e.flags |= 32), e.memoizedState !== null && (n = ps(
          t,
          e,
          qv,
          null,
          null,
          l
        ), Yn._currentValue = n), _n(t, e), fe(t, e, a, l), e.child;
      case 6:
        return t === null && Et && ((t = l = Jt) && (l = Kg(
          l,
          e.pendingProps,
          el
        ), l !== null ? (e.stateNode = l, me = e, Jt = null, t = !0) : t = !1), t || kl(e)), null;
      case 13:
        return Kd(t, e, l);
      case 4:
        return je(
          e,
          e.stateNode.containerInfo
        ), a = e.pendingProps, t === null ? e.child = Ha(
          e,
          null,
          a,
          l
        ) : fe(t, e, a, l), e.child;
      case 11:
        return Hd(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 7:
        return a = e.pendingProps, _n(t, e), fe(t, e, a, l), e.child;
      case 8:
        return fe(
          t,
          e,
          e.pendingProps.children,
          l
        ), e.child;
      case 12:
        return fe(
          t,
          e,
          e.pendingProps.children,
          l
        ), e.child;
      case 10:
        return Fd(t, e, l);
      case 9:
        return n = e.type._context, a = e.pendingProps.children, Ra(e), n = ye(n), a = a(n), e.flags |= 1, fe(t, e, a, l), e.child;
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
        return Qs(t, e, l);
      case 31:
        return Fv(t, e, l);
      case 22:
        return qd(
          t,
          e,
          l,
          e.pendingProps
        );
      case 24:
        return Ra(e), a = ye(ue), t === null ? (n = ss(), n === null && (n = Kt, u = is(), n.pooledCache = u, u.refCount++, u !== null && (n.pooledCacheLanes |= l), n = u), e.memoizedState = { parent: a, cache: n }, fs(e), Wl(e, ue, n)) : ((t.lanes & l) !== 0 && (os(t, e), mu(e, null, null, l), du()), n = t.memoizedState, u = e.memoizedState, n.parent !== a ? (n = { parent: a, cache: a }, e.memoizedState = n, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = n), Wl(e, ue, a)) : (a = u.cache, Wl(e, ue, a), a !== n.cache && us(
          e,
          [ue],
          l,
          !0
        ))), fe(
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
        }), a = e.pendingProps, a.name != null && a.name !== "auto" ? e.flags |= t === null ? 18882560 : 18874368 : Et && hi(e), t !== null && t.memoizedProps.name !== a.name ? e.flags |= 4194816 : _n(t, e), fe(t, e, a.children, l), e.child;
      case 29:
        throw e.pendingProps;
    }
    throw Error(s(156, e.tag));
  }
  function Yl(t) {
    t.flags |= 4;
  }
  function Ks(t, e, l, a, n) {
    var u;
    if ((u = (t.mode & 32) !== 0) && (u = l === null ? xh(e, a) : xh(e, a) && (a.src !== l.src || a.srcSet !== l.srcSet)), u) {
      if (t.flags |= 16777216, (n & 335544128) === n)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (jm()) t.flags |= 8192;
        else
          throw Ba = _i, rs;
    } else t.flags &= -16777217;
  }
  function Wd(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !Mh(e))
      if (jm()) t.flags |= 8192;
      else
        throw Ba = _i, rs;
  }
  function qi(t, e) {
    e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? Nf() : 536870912, t.lanes |= e, Mn |= e);
  }
  function pu(t, e) {
    if (!Et)
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
  function $t(t) {
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
        return $t(e), null;
      case 1:
        return $t(e), null;
      case 3:
        return l = e.stateNode, a = null, t !== null && (a = t.memoizedState.cache), e.memoizedState.cache !== a && (e.flags |= 2048), Ul(ue), $e(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (t === null || t.child === null) && (hn(e) ? Yl(e) : t === null || t.memoizedState.isDehydrated && (e.flags & 256) === 0 || (e.flags |= 1024, as())), $t(e), null;
      case 26:
        var n = e.type, u = e.memoizedState;
        return t === null ? (Yl(e), u !== null ? ($t(e), Wd(e, u)) : ($t(e), Ks(
          e,
          n,
          null,
          a,
          l
        ))) : u ? u !== t.memoizedState ? (Yl(e), $t(e), Wd(e, u)) : ($t(e), e.flags &= -16777217) : (t = t.memoizedProps, t !== a && Yl(e), $t(e), Ks(
          e,
          n,
          t,
          a,
          l
        )), null;
      case 27:
        if (ml(e), l = jt.current, n = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== a && Yl(e);
        else {
          if (!a) {
            if (e.stateNode === null)
              throw Error(s(166));
            return $t(e), e.subtreeFlags &= -33554433, null;
          }
          t = lt.current, hn(e) ? Co(e) : (t = yh(n, a, l), e.stateNode = t, Yl(e));
        }
        return $t(e), e.subtreeFlags &= -33554433, null;
      case 5:
        if (ml(e), n = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== a && Yl(e);
        else {
          if (!a) {
            if (e.stateNode === null)
              throw Error(s(166));
            return $t(e), e.subtreeFlags &= -33554433, null;
          }
          if (u = lt.current, hn(e))
            Co(e);
          else {
            var i = Au(
              jt.current
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
            u[ge] = e, u[Re] = a;
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
            t: switch (_e(u, n, a), n) {
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
            a && Yl(e);
          }
        }
        return $t(e), e.subtreeFlags &= -33554433, Ks(
          e,
          e.type,
          t === null ? null : t.memoizedProps,
          e.pendingProps,
          l
        ), null;
      case 6:
        if (t && e.stateNode != null)
          t.memoizedProps !== a && Yl(e);
        else {
          if (typeof a != "string" && e.stateNode === null)
            throw Error(s(166));
          if (t = jt.current, hn(e)) {
            if (t = e.stateNode, l = e.memoizedProps, a = null, n = me, n !== null)
              switch (n.tag) {
                case 27:
                case 5:
                  a = n.memoizedProps;
              }
            t[ge] = e, t = !!(t.nodeValue === l || a !== null && a.suppressHydrationWarning === !0 || km(t.nodeValue, l)), t || kl(e, !0);
          } else
            t = Au(t).createTextNode(
              a
            ), t[ge] = e, e.stateNode = t;
        }
        return $t(e), null;
      case 31:
        if (l = e.memoizedState, t === null || t.memoizedState !== null) {
          if (a = hn(e), l !== null) {
            if (t === null) {
              if (!a) throw Error(s(318));
              if (t = e.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(557));
              t[ge] = e;
            } else
              Ca(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            $t(e), t = !1;
          } else
            l = as(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = l), t = !0;
          if (!t)
            return e.flags & 256 ? (Xe(e), e) : (Xe(e), null);
          if ((e.flags & 128) !== 0)
            throw Error(s(558));
        }
        return $t(e), null;
      case 13:
        if (a = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (n = hn(e), a !== null && a.dehydrated !== null) {
            if (t === null) {
              if (!n) throw Error(s(318));
              if (n = e.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(s(317));
              n[ge] = e;
            } else
              Ca(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            $t(e), n = !1;
          } else
            n = as(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return e.flags & 256 ? (Xe(e), e) : (Xe(e), null);
        }
        return Xe(e), (e.flags & 128) !== 0 ? (e.lanes = l, e) : (l = a !== null, t = t !== null && t.memoizedState !== null, l && (a = e.child, n = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (n = a.alternate.memoizedState.cachePool.pool), u = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (u = a.memoizedState.cachePool.pool), u !== n && (a.flags |= 2048)), l !== t && l && (e.child.flags |= 8192), qi(e, e.updateQueue), $t(e), null);
      case 4:
        return $e(), t === null && Or(e.stateNode.containerInfo), e.flags |= 67108864, $t(e), null;
      case 10:
        return Ul(e.type), $t(e), null;
      case 19:
        if (ys(e), a = e.memoizedState, a === null) return $t(e), null;
        if (n = (e.flags & 128) !== 0, u = a.rendering, u === null)
          if (n) pu(a, !1);
          else {
            if (le !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = e.child; t !== null; ) {
                if (u = xi(t), u !== null) {
                  for (e.flags |= 128, pu(a, !1), t = u.updateQueue, e.updateQueue = t, qi(e, t), e.subtreeFlags = 0, t = l, l = e.child; l !== null; )
                    No(l, t), l = l.sibling;
                  return hu(
                    e,
                    pe.current & 1 | 2
                  ), Et && Dl(e, a.treeForkCount), e.child;
                }
                t = t.sibling;
              }
            a.tail !== null && Pt() > Ii && (e.flags |= 128, n = !0, pu(a, !1), e.lanes = 4194304);
          }
        else {
          if (!n)
            if (t = xi(u), t !== null) {
              if (e.flags |= 128, n = !0, t = t.updateQueue, e.updateQueue = t, qi(e, t), pu(a, !0), a.tail === null && a.tailMode !== "collapsed" && a.tailMode !== "visible" && !u.alternate && !Et)
                return $t(e), null;
            } else
              2 * Pt() - a.renderingStartTime > Ii && l !== 536870912 && (e.flags |= 128, n = !0, pu(a, !1), e.lanes = 4194304);
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
          return a.rendering = t, a.tail = t.sibling, a.renderingStartTime = Pt(), t.sibling = null, u = pe.current, u = n ? u & 1 | 2 : u & 1, a.tailMode === "visible" || a.tailMode === "collapsed" || !l || Et ? hu(e, u) : (l = u, q(be, e), q(pe, l), Ne === null && (Ne = e)), Et && Dl(e, a.treeForkCount), t;
        }
        return $t(e), null;
      case 22:
      case 23:
        return Xe(e), vs(), a = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== a && (e.flags |= 8192) : a && (e.flags |= 8192), a ? (l & 536870912) !== 0 && (e.flags & 128) === 0 && ($t(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : $t(e), l = e.updateQueue, l !== null && qi(e, l.retryQueue), l = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), a = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), a !== l && (e.flags |= 2048), t !== null && Zt(wa), null;
      case 24:
        return l = null, t !== null && (l = t.memoizedState.cache), e.memoizedState.cache !== l && (e.flags |= 2048), Ul(ue), $t(e), null;
      case 25:
        return null;
      case 30:
        return e.flags |= 33554432, $t(e), null;
    }
    throw Error(s(156, e.tag));
  }
  function Pv(t, e) {
    switch (es(e), e.tag) {
      case 1:
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 3:
        return Ul(ue), $e(), t = e.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (e.flags = t & -65537 | 128, e) : null;
      case 26:
      case 27:
      case 5:
        return ml(e), null;
      case 31:
        if (e.memoizedState !== null) {
          if (Xe(e), e.alternate === null)
            throw Error(s(340));
          Ca();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 13:
        if (Xe(e), t = e.memoizedState, t !== null && t.dehydrated !== null) {
          if (e.alternate === null)
            throw Error(s(340));
          Ca();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 19:
        return ys(e), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, t = e.memoizedState, t !== null && (t.rendering = null, t.tail = null), e.flags |= 4, e) : null;
      case 4:
        return $e(), null;
      case 10:
        return Ul(e.type), null;
      case 22:
      case 23:
        return Xe(e), vs(), t !== null && Zt(wa), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 24:
        return Ul(ue), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Id(t, e) {
    switch (es(e), e.tag) {
      case 3:
        Ul(ue), $e();
        break;
      case 26:
      case 27:
      case 5:
        ml(e);
        break;
      case 4:
        $e();
        break;
      case 31:
        e.memoizedState !== null && Xe(e);
        break;
      case 13:
        Xe(e);
        break;
      case 19:
        ys(e);
        break;
      case 10:
        Ul(e.type);
        break;
      case 22:
      case 23:
        Xe(e), vs(), t !== null && Zt(wa);
        break;
      case 24:
        Ul(ue);
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
    } catch (f) {
      qt(e, e.return, f);
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
              var h = l, T = f;
              try {
                T();
              } catch (z) {
                qt(
                  n,
                  h,
                  z
                );
              }
            }
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (z) {
      qt(e, e.return, z);
    }
  }
  function Pd(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var l = t.stateNode;
      try {
        Xo(e, l);
      } catch (a) {
        qt(t, t.return, a);
      }
    }
  }
  function tm(t, e, l) {
    l.props = Ya(
      t.type,
      t.memoizedProps
    ), l.state = t.memoizedState;
    try {
      l.componentWillUnmount();
    } catch (a) {
      qt(t, e, a);
    }
  }
  function yl(t, e) {
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
            var n = t.stateNode, u = Al(t.memoizedProps, n);
            (n.ref === null || n.ref.name !== u) && (n.ref = ch(u)), a = n.ref;
            break;
          case 7:
            if (t.stateNode === null) {
              var i = new Je(t);
              v(
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
      qt(t, e, f);
    }
  }
  function Se(t, e) {
    var l = t.ref, a = t.refCleanup;
    if (l !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (n) {
          qt(t, e, n);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (n) {
          qt(t, e, n);
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
    for (var e = t.return; e !== null && ($s(e) && Qg(t.stateNode, e.stateNode), !Js(e)); )
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
      qt(t, t.return, n);
    }
  }
  function ks(t, e, l) {
    try {
      var a = t.stateNode;
      xg(a, t.type, l, e), a[Re] = e;
    } catch (n) {
      qt(t, t.return, n);
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
      n = t.stateNode, e ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(n, e) : (e = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, e.appendChild(n), l = l._reactRootContainer, l != null || e.onclick !== null || (e.onclick = hl)), Gi(t, a), Ut = !0;
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
      n = t.stateNode, e ? l.insertBefore(n, e) : l.appendChild(n), Gi(t, a), Ut = !0;
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
      _e(e, a, l), e[ge] = t, e[Re] = l;
    } catch (u) {
      qt(t, t.return, u);
    }
  }
  var Vi = !1, Ve = null;
  function nm(t) {
    (t.tag === 30 || (t.subtreeFlags & 33554432) !== 0) && (Vi = !0);
  }
  var bl = null;
  function um() {
    var t = bl;
    return bl = null, t;
  }
  var we = 0;
  function En(t, e, l, a, n) {
    return we = 0, im(
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
          var f = Ur(i);
          a.push(f), f.view && (u = !0);
        } else
          u || Ur(i).view && (u = !0);
        Vi = !0, uh(
          i,
          we === 0 ? e : e + "_" + we,
          l
        ), we++;
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
  function pl(t, e) {
    for (; t !== null; )
      t.tag === 5 ? ih(t.stateNode, t.memoizedProps) : (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && e || pl(
        t.child,
        e
      )), t = t.sibling;
  }
  function Qi(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if ((t.tag !== 22 || t.memoizedState === null) && (Qi(t), t.tag === 30 && (t.flags & 18874368) !== 0 && t.stateNode.paired)) {
          var e = t.memoizedProps;
          if (e.name == null || e.name === "auto")
            throw Error(s(544));
          var l = e.name;
          e = jl(e.default, e.share), e !== "none" && (En(
            t,
            l,
            e,
            null,
            !1
          ) || pl(t.child, !1));
        }
        t = t.sibling;
      }
  }
  function Ps(t, e) {
    if (t.tag === 30) {
      var l = t.stateNode, a = t.memoizedProps, n = Al(a, l), u = jl(
        a.default,
        l.paired ? a.share : a.enter
      );
      u !== "none" ? En(t, n, u, null, !1) ? (Qi(t), l.paired || e || An(t, a.onEnter)) : pl(t.child, !1) : Qi(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        Ps(t, e), t = t.sibling;
    else Qi(t);
  }
  function tr(t) {
    if (Ve !== null && Ve.size !== 0) {
      var e = Ve;
      if ((t.subtreeFlags & 18874368) !== 0)
        for (t = t.child; t !== null; ) {
          if (t.tag !== 22 || t.memoizedState === null) {
            if (t.tag === 30 && (t.flags & 18874368) !== 0) {
              var l = t.memoizedProps, a = l.name;
              if (a != null && a !== "auto") {
                var n = e.get(a);
                if (n !== void 0) {
                  var u = jl(
                    l.default,
                    l.share
                  );
                  if (u !== "none" && (En(
                    t,
                    a,
                    u,
                    null,
                    !1
                  ) ? (u = t.stateNode, n.paired = u, u.paired = n, An(t, l.onShare)) : pl(t.child, !1)), e.delete(a), e.size === 0) break;
                }
              }
            }
            tr(t);
          }
          t = t.sibling;
        }
    }
  }
  function er(t) {
    if (t.tag === 30) {
      var e = t.memoizedProps, l = Al(e, t.stateNode), a = Ve !== null ? Ve.get(l) : void 0, n = jl(
        e.default,
        a !== void 0 ? e.share : e.exit
      );
      n !== "none" && (En(t, l, n, null, !1) ? a !== void 0 ? (n = t.stateNode, a.paired = n, n.paired = a, Ve.delete(l), An(t, e.onShare)) : An(t, e.onExit) : pl(t.child, !1)), Ve !== null && tr(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        er(t), t = t.sibling;
    else
      Ve !== null && tr(t);
  }
  function cm(t) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var e = t.memoizedProps, l = Al(e, t.stateNode);
        e = jl(e.default, e.update), t.flags &= -5, e !== "none" && En(
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
  function lr(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if (t.tag !== 22 || t.memoizedState === null) {
          if (t.tag === 30 && (t.flags & 18874368) !== 0) {
            var e = t.stateNode;
            e.paired !== null && (e.paired = null, pl(t.child, !1));
          }
          lr(t);
        }
        t = t.sibling;
      }
  }
  function Zi(t) {
    if (t.tag === 30)
      t.stateNode.paired = null, pl(t.child, !1), lr(t);
    else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        Zi(t), t = t.sibling;
    else lr(t);
  }
  function sm(t) {
    for (t = t.child; t !== null; )
      t.tag === 30 ? pl(t.child, !1) : (t.subtreeFlags & 33554432) !== 0 && sm(t), t = t.sibling;
  }
  function ar(t, e, l, a, n, u, i) {
    for (var f = !1; e !== null; ) {
      if (e.tag === 5) {
        var h = e.stateNode;
        if (u !== null && we < u.length) {
          var T = u[we], z = Ur(h);
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
          h,
          we === 0 ? l : l + "_" + we,
          n
        ), f && (t.flags & 4) !== 0 || (bl === null && (bl = []), bl.push(
          h,
          we === 0 ? a : a + "_" + we,
          e.memoizedProps
        )), we++;
      } else (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && i ? t.flags |= e.flags & 32 : ar(
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
        var l = t.memoizedProps, a = t.stateNode, n = Al(l, a), u = jl(l.default, l.update), i;
        i = t.memoizedState, t.memoizedState = null, a = t;
        var f = t.child;
        we = 0, n = ar(
          a,
          f,
          n,
          n,
          u,
          i,
          !1
        ), (t.flags & 4) !== 0 && n && An(t, l.onUpdate);
      } else
        (t.subtreeFlags & 33554432) !== 0 && rm(t);
      t = t.sibling;
    }
  }
  var he = !1, Lt = !1, Sl = !1, nr = !1, fm = typeof WeakSet == "function" ? WeakSet : Set, ve = null, _l = !1, Eu = !1, Ki = !1, ur = !1;
  function tg(t, e, l) {
    if (t = t.containerInfo, Ar = qn, t = ho(t), Zc(t)) {
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
            var f = 0, h = -1, T = -1, z = 0, w = 0, S = t, M = null;
            e: for (; ; ) {
              for (var Q; S !== a || u !== 0 && S.nodeType !== 3 || (h = f + u), S !== i || n !== 0 && S.nodeType !== 3 || (T = f + n), S.nodeType === 3 && (f += S.nodeValue.length), (Q = S.firstChild) !== null; )
                M = S, S = Q;
              for (; ; ) {
                if (S === t) break e;
                if (M === a && ++z === u && (h = f), M === i && ++w === n && (T = f), (Q = S.nextSibling) !== null) break;
                S = M, M = S.parentNode;
              }
              S = Q;
            }
            a = h === -1 || T === -1 ? null : { start: h, end: T };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (jr = { focusedElem: t, selectionRange: a }, qn = !1, l = (l & 335544064) === l, ve = e, e = l ? 9270 : 1024; ve !== null; ) {
      if (t = ve, l && (a = t.deletions, a !== null))
        for (u = 0; u < a.length; u++)
          l && er(a[u]);
      if (t.alternate === null && (t.flags & 2) !== 0)
        l && nm(t), Ji(l);
      else {
        if (t.tag === 22) {
          if (a = t.alternate, t.memoizedState !== null) {
            a !== null && a.memoizedState === null && l && er(a), Ji(l);
            continue;
          } else if (a !== null && a.memoizedState !== null) {
            l && nm(t), Ji(l);
            continue;
          }
        }
        a = t.child, (t.subtreeFlags & e) !== 0 && a !== null ? (a.return = t, ve = a) : (l && cm(t), Ji(l));
      }
    }
    Ve = null;
  }
  function Ji(t) {
    for (; ve !== null; ) {
      var e = ve, l = t, a = e.alternate, n = e.flags;
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
              var i = Ya(
                e.type,
                n
              );
              l = u.getSnapshotBeforeUpdate(
                i,
                a
              ), u.__reactInternalSnapshotBeforeUpdate = l;
            } catch (f) {
              qt(e, e.return, f);
            }
          }
          break;
        case 3:
          if ((n & 1024) !== 0) {
            if (a = e.stateNode.containerInfo, l = a.nodeType, l === 9)
              Lr(a);
            else if (l === 1)
              switch (a.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  Lr(a);
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
          l && a !== null && (l = Al(
            a.memoizedProps,
            a.stateNode
          ), n = e.memoizedProps, n = jl(n.default, n.update), n !== "none" && En(
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
        a.return = e.return, ve = a;
        break;
      }
      ve = e.return;
    }
  }
  function om(t, e, l) {
    var a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        El(t, l), a & 4 && Su(5, l);
        break;
      case 1:
        if (El(t, l), a & 4)
          if (t = l.stateNode, e === null)
            try {
              t.componentDidMount();
            } catch (i) {
              qt(l, l.return, i);
            }
          else {
            var n = Ya(
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
              qt(
                l,
                l.return,
                i
              );
            }
          }
        a & 64 && Pd(l), a & 512 && yl(l, l.return);
        break;
      case 3:
        if (El(t, l), a & 64 && (t = l.updateQueue, t !== null)) {
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
            qt(l, l.return, i);
          }
        }
        break;
      case 27:
        e === null && a & 4 && am(l);
      case 26:
      case 5:
        El(t, l), e === null && a & 4 && Fs(l), a & 512 && yl(l, l.return);
        break;
      case 12:
        El(t, l);
        break;
      case 31:
        El(t, l), a & 4 && vm(t, l);
        break;
      case 13:
        El(t, l), a & 4 && gm(t, l), a & 64 && (t = l.memoizedState, t !== null && (t = t.dehydrated, t !== null && (l = dg.bind(
          null,
          l
        ), Jg(t, l))));
        break;
      case 22:
        if (a = l.memoizedState !== null || he, !a) {
          var u = e !== null && e.memoizedState !== null || Lt;
          e = he, n = Lt, he = a, (Lt = u) && !n ? (a = 2, (l.subtreeFlags & 8772) !== 0 && (a |= 1), rl(
            t,
            l,
            a
          )) : El(t, l), he = e, Lt = n;
        }
        break;
      case 30:
        El(t, l), a & 512 && yl(l, l.return);
        break;
      case 7:
        a & 512 && yl(l, l.return);
      default:
        El(t, l);
    }
  }
  function ir(t, e) {
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
        } catch (h) {
          qt(t, t.return, h);
        }
        cr(t, e);
        break;
      case 6:
        try {
          t.stateNode.nodeValue = e ? "" : t.memoizedProps, Ut = !0;
        } catch (h) {
          qt(t, t.return, h);
        }
        break;
      case 18:
        try {
          var f = t.stateNode;
          e ? nh(f, !0) : nh(t.stateNode, !1);
        } catch (h) {
          qt(t, t.return, h);
        }
        break;
      case 22:
      case 23:
        t.memoizedState === null && ir(t, e);
        break;
      default:
        ir(t, e);
    }
  }
  function cr(t, e) {
    if (t.subtreeFlags & 67108864)
      for (t = t.child; t !== null; ) {
        t: {
          var l = t, a = e;
          switch (l.tag) {
            case 4:
              dm(l, a);
              break t;
            case 22:
              l.memoizedState === null && cr(l, a);
              break t;
            default:
              cr(l, a);
          }
        }
        t = t.sibling;
      }
  }
  function mm(t) {
    var e = t.alternate;
    e !== null && (t.alternate = null, mm(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && Iu(e)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var kt = null, Ue = !1;
  function cl(t, e, l) {
    for (l = l.child; l !== null; )
      hm(t, e, l), l = l.sibling;
  }
  function hm(t, e, l) {
    if (Le && typeof Le.onCommitFiberUnmount == "function")
      try {
        Le.onCommitFiberUnmount(Zn, l);
      } catch {
      }
    switch (l.tag) {
      case 26:
        Lt || Se(l, e), cl(
          t,
          e,
          l
        ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && !Lt && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        Lt || Se(l, e), _u(l);
        var a = kt, n = Ue;
        da(l.type) && (kt = l.stateNode, Ue = !1), cl(
          t,
          e,
          l
        ), bh(
          l.stateNode,
          l.type,
          l.memoizedProps
        ), kt = a, Ue = n;
        break;
      case 5:
        Lt || Se(l, e), _u(l);
      case 6:
        if (l.tag === 6 && _u(l), a = kt, n = Ue, kt = null, cl(
          t,
          e,
          l
        ), kt = a, Ue = n, kt !== null)
          if (Ue)
            try {
              (kt.nodeType === 9 ? kt.body : kt.nodeName === "HTML" ? kt.ownerDocument.body : kt).removeChild(l.stateNode), Ut = !0;
            } catch (u) {
              qt(
                l,
                e,
                u
              );
            }
          else
            try {
              kt.removeChild(l.stateNode), Ut = !0;
            } catch (u) {
              qt(
                l,
                e,
                u
              );
            }
        break;
      case 18:
        kt !== null && (Ue ? (t = kt, ah(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          l.stateNode
        ), Gn(t)) : ah(kt, l.stateNode));
        break;
      case 4:
        a = kt, n = Ue, kt = l.stateNode.containerInfo, Ue = !0, cl(
          t,
          e,
          l
        ), kt = a, Ue = n;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        ua(2, l, e), Lt || ua(4, l, e), cl(
          t,
          e,
          l
        );
        break;
      case 1:
        Lt || (Se(l, e), a = l.stateNode, typeof a.componentWillUnmount == "function" && tm(
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
        Lt = (a = Lt) || l.memoizedState !== null, cl(
          t,
          e,
          l
        ), Lt = a;
        break;
      case 30:
        Se(l, e), cl(
          t,
          e,
          l
        );
        break;
      case 7:
        Lt || Se(l, e), cl(
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
        Gn(t);
      } catch (l) {
        qt(e, e.return, l);
      }
    }
  }
  function gm(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        Gn(t);
      } catch (l) {
        qt(e, e.return, l);
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
  function $i(t, e) {
    var l = eg(t);
    e.forEach(function(a) {
      if (!l.has(a)) {
        l.add(a);
        var n = mg.bind(null, t, a);
        a.then(n, n);
      }
    });
  }
  function Ce(t, e, l) {
    var a = e.deletions;
    if (a !== null)
      for (var n = 0; n < a.length; n++) {
        var u = a[n], i = t, f = e, h = f;
        t: for (; h !== null; ) {
          switch (h.tag) {
            case 27:
              if (da(h.type)) {
                kt = h.stateNode, Ue = !1;
                break t;
              }
              break;
            case 5:
              kt = h.stateNode, Ue = !1;
              break t;
            case 3:
            case 4:
              kt = h.stateNode.containerInfo, Ue = !0;
              break t;
          }
          h = h.return;
        }
        if (kt === null) throw Error(s(160));
        hm(i, f, u), kt = null, Ue = !1, i = u.alternate, i !== null && (i.return = null), u.return = null;
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
        Ce(e, t, l), Ae(t), n & 4 && (ua(3, t, t.return), Su(3, t), ua(5, t, t.return));
        break;
      case 1:
        Ce(e, t, l), Ae(t), n & 512 && (Lt || a === null || Se(a, a.return)), n & 64 && he && (t = t.updateQueue, t !== null && (e = t.callbacks, e !== null && (l = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = l === null ? e : l.concat(e))));
        break;
      case 26:
        if (u = sl, Ce(e, t, l), Ae(t), n & 512 && (Lt || a === null || Se(a, a.return)), n & 4)
          if (n = a !== null ? a.memoizedState : null, l = t.memoizedState, a === null)
            if (l === null)
              if (t.stateNode === null)
                if (he)
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
                        a = n.getElementsByTagName("title")[0], (!a || a[$n] || a[ge] || a.namespaceURI === "http://www.w3.org/2000/svg" || a.hasAttribute("itemprop")) && (a = n.createElement(e), n.head.insertBefore(
                          a,
                          n.querySelector("head > title")
                        )), _e(a, e, l), a[ge] = t, de(a), e = a;
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
                        a = n.createElement(e), _e(a, e, l), n.head.appendChild(a);
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
                        a = n.createElement(e), _e(a, e, l), n.head.appendChild(a);
                        break;
                      default:
                        throw Error(s(468, e));
                    }
                    a[ge] = t, de(a), e = a;
                  }
                  t.stateNode = e;
                }
              else
                he || Zr(u, t.type, t.stateNode);
            else
              t.stateNode = Th(
                u,
                l,
                t.memoizedProps
              );
          else
            n !== l ? (n === null ? (e = a.stateNode, e === null || Lt || e.parentNode.removeChild(e)) : n.count--, l === null ? he || Zr(u, t.type, t.stateNode) : Th(u, l, t.memoizedProps)) : l === null && t.stateNode !== null && ks(
              t,
              t.memoizedProps,
              a.memoizedProps
            );
        break;
      case 27:
        Ce(e, t, l), Ae(t), n & 512 && (Lt || a === null || Se(a, a.return)), a !== null && n & 4 && ks(
          t,
          t.memoizedProps,
          a.memoizedProps
        );
        break;
      case 5:
        if (u = Sl, Sl = !1, Ce(e, t, l), Sl = u, Ae(t), n & 512 && (Lt || a === null || Se(a, a.return)), t.flags & 32) {
          e = t.stateNode;
          try {
            an(e, ""), Ut = !0;
          } catch (z) {
            qt(t, t.return, z);
          }
        }
        n & 4 && t.stateNode != null && (e = t.memoizedProps, ks(
          t,
          e,
          a !== null ? a.memoizedProps : e
        )), n & 1024 && (nr = !0);
        break;
      case 6:
        if (Ce(e, t, l), Ae(t), n & 4) {
          if (t.stateNode === null)
            throw Error(s(162));
          e = t.memoizedProps, l = t.stateNode;
          try {
            l.nodeValue = e, Ut = !0;
          } catch (z) {
            qt(t, t.return, z);
          }
        }
        break;
      case 3:
        if (Ut = !1, rc = null, u = sl, sl = ju(e.containerInfo), Ce(e, t, l), sl = u, Ae(t), n & 4 && a !== null && a.memoizedState.isDehydrated)
          try {
            Gn(e.containerInfo);
          } catch (z) {
            qt(t, t.return, z);
          }
        nr && (nr = !1, bm(t)), Ut = !1;
        break;
      case 4:
        n = Sl, Sl = he, a = Hf(), u = sl, sl = ju(
          t.stateNode.containerInfo
        ), Ce(e, t, l), Ae(t), sl = u, Ut && Eu && (Ki = !0), Ut = a, Sl = n;
        break;
      case 12:
        Ce(e, t, l), Ae(t);
        break;
      case 31:
        Ce(e, t, l), Ae(t), n & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, $i(t, e)));
        break;
      case 13:
        Ce(e, t, l), Ae(t), t.child.flags & 8192 && t.memoizedState !== null != (a !== null && a.memoizedState !== null) && (Wi = Pt()), n & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, $i(t, e)));
        break;
      case 22:
        u = t.memoizedState !== null, i = a !== null && a.memoizedState !== null;
        var f = he, h = Lt, T = Sl;
        he = f || u, Sl = T || u, Lt = h || i, Ce(e, t, l), Lt = h, Sl = T, he = f, Ae(t), n & 8192 && (e = t.stateNode, e._visibility = u ? e._visibility & -2 : e._visibility | 1, !u || a === null || i || he || Lt || (e = i || Lt, l = he, a = Lt, he = u || he, Lt = e, ia(t, 2), he = l, Lt = a), !u && Sl || ir(t, u)), n & 4 && (e = t.updateQueue, e !== null && (l = e.retryQueue, l !== null && (e.retryQueue = null, $i(t, l))));
        break;
      case 19:
        Ce(e, t, l), Ae(t), n & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, $i(t, e)));
        break;
      case 30:
        n & 512 && (Lt || a === null || Se(a, a.return)), n = Hf(), u = Eu, i = (l & 335544064) === l, f = t.memoizedProps, Eu = i && jl(
          f.default,
          f.update
        ) !== "none", Ce(e, t, l), Ae(t), i && a !== null && Ut && (t.flags |= 4), Eu = u, Ut = n;
        break;
      case 21:
        break;
      case 7:
        n & 512 && (Lt || a === null || Se(a, a.return)), a && a.stateNode !== null && (a.stateNode._fragmentFiber = t);
      default:
        Ce(e, t, l), Ae(t);
    }
  }
  function Ae(t) {
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
            var f = l.stateNode, h = Ws(t);
            Xi(
              t,
              h,
              f,
              i
            );
            break;
          case 5:
            var T = l.stateNode;
            l.flags & 32 && (an(T, ""), l.flags &= -33);
            var z = Ws(t);
            Xi(
              t,
              z,
              T,
              i
            );
            break;
          case 3:
          case 4:
            var w = l.stateNode.containerInfo, S = Ws(t);
            Is(
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
        qt(t, t.return, M);
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
    else rm(e);
  }
  function pm(t, e) {
    var l = t.alternate;
    if (l === null) Ps(t, !1);
    else
      switch (t.tag) {
        case 3:
          if (ur = _l = !1, um(), Tn(e, t), !_l && !Ki) {
            if (t = bl, t !== null)
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
            )), ur = !0;
          }
          bl = null;
          break;
        case 5:
          Tn(e, t);
          break;
        case 4:
          a = _l, _l = !1, Tn(e, t), _l && (Ki = !0), _l = a;
          break;
        case 22:
          t.memoizedState === null && (l.memoizedState !== null ? Ps(t, !1) : Tn(e, t));
          break;
        case 30:
          a = _l, n = um(), _l = !1, Tn(e, t), _l && (t.flags |= 4);
          var u = t.memoizedProps, i = t.stateNode;
          e = Al(u, i), i = Al(l.memoizedProps, i);
          var f = jl(u.default, u.update);
          f === "none" ? e = !1 : (u = l.memoizedState, l.memoizedState = null, l = t.child, we = 0, e = ar(
            t,
            l,
            e,
            i,
            f,
            u,
            !0
          ), we !== (u === null ? 0 : u.length) && (t.flags |= 32)), (t.flags & 4) !== 0 && e ? (An(
            t,
            t.memoizedProps.onUpdate
          ), bl = n) : n !== null && (n.push.apply(n, bl), bl = n), _l = (t.flags & 32) !== 0 ? !0 : a;
          break;
        default:
          Tn(e, t);
      }
  }
  function El(t, e) {
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
          Se(l, l.return);
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
          Se(l, l.return), l.tag !== 5 && l.tag !== 27 || _u(l), ia(
            l,
            a
          );
          break;
        case 6:
          _u(l);
          break;
        case 26:
          Se(l, l.return), n = l.stateNode, l.memoizedState !== null || n === null || Lt || n.parentNode.removeChild(n), ia(
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
          Se(l, l.return), ia(
            l,
            a
          );
          break;
        case 7:
          Se(l, l.return);
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
          ), Su(4, u);
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
              qt(a, a.return, z);
            }
          if (a = u, n = a.updateQueue, n !== null) {
            var h = a.stateNode;
            try {
              var T = n.shared.hiddenCallbacks;
              if (T !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < T.length; n++)
                  Go(T[n], h);
            } catch (z) {
              qt(a, a.return, z);
            }
          }
          f && i & 64 && Pd(u), yl(u, u.return);
          break;
        case 27:
          (l & 2) !== 0 && am(u);
        case 5:
          u.tag !== 5 && u.tag !== 27 || em(u), rl(
            n,
            u,
            l
          ), f && a === null && i & 4 && Fs(u), yl(u, u.return);
          break;
        case 6:
          em(u);
          break;
        case 26:
          h = u.stateNode, u.memoizedState !== null || h === null || he || Zr(
            ju(h.ownerDocument),
            u.type,
            h
          ), rl(
            n,
            u,
            l
          ), f && a === null && i & 4 && Fs(u), yl(u, u.return);
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
          ), yl(u, u.return);
          break;
        case 30:
          rl(
            n,
            u,
            l
          ), yl(u, u.return);
          break;
        case 7:
          yl(u, u.return);
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
  function sr(t, e) {
    var l = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), t = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), t !== l && (t != null && t.refCount++, l != null && cu(l));
  }
  function rr(t, e) {
    t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && cu(t));
  }
  function ll(t, e, l, a) {
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
        ll(
          t,
          e,
          l,
          a
        ), u & 2048 && Su(9, e);
        break;
      case 1:
        ll(
          t,
          e,
          l,
          a
        );
        break;
      case 3:
        ll(
          t,
          e,
          l,
          a
        ), n && ur && (t = t.containerInfo, t = t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, t.style.viewTransitionName === "root" && (t.style.viewTransitionName = ""), t = t.ownerDocument.documentElement, t !== null && t.style.viewTransitionName === "none" && (t.style.viewTransitionName = "")), u & 2048 && (u = null, e.alternate !== null && (u = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== u && (e.refCount++, u != null && cu(u)));
        break;
      case 12:
        if (u & 2048) {
          ll(
            t,
            e,
            l,
            a
          ), u = e.stateNode;
          try {
            var i = e.memoizedProps, f = i.id, h = i.onPostCommit;
            typeof h == "function" && h(
              f,
              e.alternate === null ? "mount" : "update",
              u.passiveEffectDuration,
              -0
            );
          } catch (T) {
            qt(e, e.return, T);
          }
        } else
          ll(
            t,
            e,
            l,
            a
          );
        break;
      case 31:
        ll(
          t,
          e,
          l,
          a
        );
        break;
      case 13:
        ll(
          t,
          e,
          l,
          a
        );
        break;
      case 23:
        break;
      case 22:
        i = e.stateNode, f = e.alternate, e.memoizedState !== null ? (n && f !== null && f.memoizedState === null && Zi(f), i._visibility & 2 ? ll(
          t,
          e,
          l,
          a
        ) : Tu(
          t,
          e
        )) : (n && f !== null && f.memoizedState !== null && Zi(e), i._visibility & 2 ? ll(
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
        ))), u & 2048 && sr(f, e);
        break;
      case 24:
        ll(
          t,
          e,
          l,
          a
        ), u & 2048 && rr(e.alternate, e);
        break;
      case 30:
        n && (u = e.alternate, u !== null && (pl(u.child, !0), pl(e.child, !0))), ll(
          t,
          e,
          l,
          a
        );
        break;
      default:
        ll(
          t,
          e,
          l,
          a
        );
    }
  }
  function Nn(t, e, l, a, n) {
    for (n = n && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var u = t, i = e, f = l, h = a, T = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          Nn(
            u,
            i,
            f,
            h,
            n
          ), Su(8, i);
          break;
        case 23:
          break;
        case 22:
          var z = i.stateNode;
          i.memoizedState !== null ? z._visibility & 2 ? Nn(
            u,
            i,
            f,
            h,
            n
          ) : Tu(
            u,
            i
          ) : (z._visibility |= 2, Nn(
            u,
            i,
            f,
            h,
            n
          )), n && T & 2048 && sr(
            i.alternate,
            i
          );
          break;
        case 24:
          Nn(
            u,
            i,
            f,
            h,
            n
          ), n && T & 2048 && rr(i.alternate, i);
          break;
        default:
          Nn(
            u,
            i,
            f,
            h,
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
            Tu(l, a), n & 2048 && sr(
              a.alternate,
              a
            );
            break;
          case 24:
            Tu(l, a), n & 2048 && rr(a.alternate, a);
            break;
          default:
            Tu(l, a);
        }
        e = e.sibling;
      }
  }
  var qa = 8192;
  function Ga(t, e, l) {
    if (t.subtreeFlags & qa)
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
        Ga(
          t,
          e,
          l
        ), t.flags & qa && (t.memoizedState !== null ? cy(
          l,
          sl,
          t.memoizedState,
          t.memoizedProps
        ) : (t = t.stateNode, (e & 335544128) === e && zh(l, t)));
        break;
      case 5:
        Ga(
          t,
          e,
          l
        ), t.flags & qa && (t = t.stateNode, (e & 335544128) === e && zh(l, t));
        break;
      case 3:
      case 4:
        var a = sl;
        sl = ju(t.stateNode.containerInfo), Ga(
          t,
          e,
          l
        ), sl = a;
        break;
      case 22:
        t.memoizedState === null && (a = t.alternate, a !== null && a.memoizedState !== null ? (a = qa, qa = 16777216, Ga(
          t,
          e,
          l
        ), qa = a) : Ga(
          t,
          e,
          l
        ));
        break;
      case 30:
        if ((t.flags & qa) !== 0 && (a = t.memoizedProps.name, a != null && a !== "auto")) {
          var n = t.stateNode;
          n.paired = null, Ve === null && (Ve = /* @__PURE__ */ new Map()), Ve.set(a, n);
        }
        Ga(
          t,
          e,
          l
        );
        break;
      default:
        Ga(
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
          ve = a, Nm(
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
          ve = a, Nm(
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
    for (; ve !== null; ) {
      var l = ve;
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
      if (a = l.child, a !== null) a.return = l, ve = a;
      else
        t: for (l = t; ve !== null; ) {
          a = ve;
          var n = a.sibling, u = a.return;
          if (mm(a), a === l) {
            ve = null;
            break t;
          }
          if (n !== null) {
            n.return = u, ve = n;
            break t;
          }
          ve = u;
        }
    }
  }
  var lg = {
    getCacheForType: function(t) {
      var e = ye(ue), l = e.data.get(t);
      return l === void 0 && (l = t(), e.data.set(t, l)), l;
    },
    cacheSignal: function() {
      return ye(ue).controller.signal;
    }
  }, ag = typeof WeakMap == "function" ? WeakMap : Map, Bt = 0, Kt = null, Nt = null, Ct = 0, Yt = 0, Qe = null, ca = !1, xn = !1, fr = !1, ql = 0, le = 0, sa = 0, Xa = 0, ki = 0, Ze = 0, Mn = 0, xu = null, Be = null, or = !1, Wi = 0, xm = 0, Ii = 1 / 0, Pi = null, ra = null, te = 0, fl = null, Va = null, Tl = 0, dr = 0, mr = null, Mm = null, On = null, zn = null, Cn = null, Mu = 0, tc = null;
  function Ke() {
    return (Bt & 2) !== 0 && Ct !== 0 ? Ct & -Ct : tt.T !== null ? Tr() : zf();
  }
  function Om() {
    if (Ze === 0)
      if ((Ct & 536870912) === 0 || Et) {
        var t = $u;
        $u <<= 1, ($u & 3932160) === 0 && ($u = 262144), Ze = t;
      } else Ze = 536870912;
    return t = be.current, t !== null && (t.flags |= 32), Ze;
  }
  function An(t, e) {
    if (e != null) {
      var l = t.stateNode, a = l.ref;
      a === null && (a = l.ref = ch(
        Al(t.memoizedProps, l)
      )), zn === null && (zn = []), zn.push(e.bind(null, a));
    }
  }
  function He(t, e, l) {
    (t === Kt && (Yt === 2 || Yt === 9) || t.cancelPendingCommit !== null) && (jn(t, 0), fa(
      t,
      Ct,
      Ze,
      !1
    )), Jn(t, l), ((Bt & 2) === 0 || t !== Kt) && (t === Kt && ((Bt & 2) === 0 && (Xa |= l), le === 4 && fa(
      t,
      Ct,
      Ze,
      !1
    )), Nl(t));
  }
  function zm(t, e, l) {
    if ((Bt & 6) !== 0) throw Error(s(327));
    var a = !l && (e & 127) === 0 && (e & t.expiredLanes) === 0 || Kn(t, e), n = a ? ig(t, e) : vr(t, e, !0), u = a;
    do {
      if (n === 0) {
        xn && !a && fa(t, e, 0, !1);
        break;
      } else {
        if (l = t.current.alternate, u && !ng(l)) {
          n = vr(t, e, !1), u = !1;
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
              n = xu;
              var h = f.current.memoizedState.isDehydrated;
              if (h && (jn(f, i).flags |= 256), i = vr(
                f,
                i,
                !1
              ), i !== 2 && i !== 6) {
                if (fr && !h) {
                  f.errorRecoveryDisabledLanes |= u, Xa |= u, n = 4;
                  break t;
                }
                u = Be, Be = n, u !== null && (Be === null ? Be = u : Be.push.apply(
                  Be,
                  u
                ));
              }
              n = i;
            }
            if (u = !1, n !== 2) continue;
          }
        }
        if (n === 1) {
          jn(t, 0), fa(t, e, 0, !0);
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
                Ze,
                !ca
              );
              break t;
            case 2:
              Be = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((e & 62914560) === e && (n = Wi + 300 - Pt(), 10 < n)) {
            if (fa(
              a,
              e,
              Ze,
              !ca
            ), ku(a, 0, !0) !== 0) break t;
            Tl = e, a.timeoutHandle = wr(
              Cm.bind(
                null,
                a,
                l,
                Be,
                Pi,
                or,
                e,
                Ze,
                Xa,
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
          Cm(
            a,
            l,
            Be,
            Pi,
            or,
            e,
            Ze,
            Xa,
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
    Nl(t);
  }
  function Cm(t, e, l, a, n, u, i, f, h, T, z, w, S, M) {
    t.timeoutHandle = -1;
    var Q = e.subtreeFlags, et = (u & 335544064) === u;
    if (w = null, (et || Q & 8192 || (Q & 16785408) === 16785408) && (w = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: hl
    }, Ve = null, _m(
      e,
      u,
      w
    ), et && (Q = w, et = t.containerInfo, et = (et.nodeType === 9 ? et : et.ownerDocument).__reactViewTransition, et != null && (Q.count++, Q.waitingForViewTransition = !0, Q = wu.bind(Q), et.finished.then(Q, Q))), Q = (u & 62914560) === u ? Wi - Pt() : (u & 4194048) === u ? xm - Pt() : 0, Q = sy(
      w,
      Q
    ), Q !== null)) {
      Tl = u, t.cancelPendingCommit = Q(
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
          h,
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
      h,
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
            if (!Ge(u(), n)) return !1;
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
    e = Tf(t, e), e &= ~ki, e &= ~Xa, t.suspendedLanes |= e, t.pingedLanes &= ~e, a && (t.warmLanes |= e), a = t.expirationTimes;
    for (var n = e; 0 < n; ) {
      var u = 31 - Ye(n), i = 1 << u;
      a[u] = -1, n &= ~i;
    }
    l !== 0 && xf(t, l, e);
  }
  function ec() {
    return (Bt & 6) === 0 ? (Ou(0), !1) : !0;
  }
  function hr() {
    if (Nt !== null) {
      if (Yt === 0)
        var t = Nt.return;
      else
        t = Nt, wl = Aa = null, Es(t), yn = null, fu = 0, t = Nt;
      for (; t !== null; )
        Id(t.alternate, t), t = t.return;
      Nt = null;
    }
  }
  function jn(t, e) {
    var l = t.timeoutHandle;
    return l !== -1 && (t.timeoutHandle = -1, zg(l)), l = t.cancelPendingCommit, l !== null && (t.cancelPendingCommit = null, l()), Tl = 0, hr(), Kt = t, Nt = l = Rl(t.current, null), Ct = e, Yt = 0, Qe = null, ca = !1, xn = Kn(t, e), fr = !1, Mn = Ze = ki = Xa = sa = le = 0, Be = xu = null, or = !1, ql = Tf(t, e), ri(), l;
  }
  function Am(t, e) {
    bt = null, tt.H = wi, e === gn || e === Si ? (e = Ho(), Yt = 3) : e === rs ? (e = Ho(), Yt = 4) : Yt = e === Hs ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, Qe = e, Nt === null && (le = 1, Ui(
      t,
      Ie(e, t.current)
    ));
  }
  function jm() {
    var t = be.current;
    return t === null ? !0 : (Ct & 4194048) === Ct ? Ne === null : (Ct & 62914560) === Ct || (Ct & 536870912) !== 0 ? t === Ne : !1;
  }
  function Rm() {
    var t = tt.H;
    return tt.H = wi, t === null ? wi : t;
  }
  function Dm() {
    var t = tt.A;
    return tt.A = lg, t;
  }
  function lc() {
    le = 4, ca || (Ct & 4194048) !== Ct && be.current !== null || (xn = !0), (sa & 134217727) === 0 && (Xa & 134217727) === 0 || Kt === null || fa(
      Kt,
      Ct,
      Ze,
      !1
    );
  }
  function vr(t, e, l) {
    var a = Bt;
    Bt |= 2;
    var n = Rm(), u = Dm();
    (Kt !== t || Ct !== e) && (Pi = null, jn(t, e)), e = !1;
    var i = le;
    t: do
      try {
        if (Yt !== 0 && Nt !== null) {
          var f = Nt, h = Qe;
          switch (Yt) {
            case 8:
              hr(), i = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              be.current === null && (e = !0);
              var T = Yt;
              if (Yt = 0, Qe = null, Rn(t, f, h, T), l && xn) {
                i = 0;
                break t;
              }
              break;
            default:
              T = Yt, Yt = 0, Qe = null, Rn(t, f, h, T);
          }
        }
        ug(), i = le;
        break;
      } catch (z) {
        Am(t, z);
      }
    while (!0);
    return e && t.shellSuspendCounter++, wl = Aa = null, Bt = a, tt.H = n, tt.A = u, Nt === null && (Kt = null, Ct = 0, ri()), i;
  }
  function ug() {
    for (; Nt !== null; ) wm(Nt);
  }
  function ig(t, e) {
    var l = Bt;
    Bt |= 2;
    var a = Rm(), n = Dm();
    Kt !== t || Ct !== e ? (Pi = null, Ii = Pt() + 500, jn(t, e)) : xn = Kn(
      t,
      e
    );
    t: do
      try {
        if (Yt !== 0 && Nt !== null) {
          e = Nt;
          var u = Qe;
          e: switch (Yt) {
            case 1:
              Yt = 0, Qe = null, Rn(t, e, u, 1);
              break;
            case 2:
            case 9:
              if (Uo(u)) {
                Yt = 0, Qe = null, Um(e);
                break;
              }
              e = function() {
                Yt !== 2 && Yt !== 9 || Kt !== t || (Yt = 7), Nl(t);
              }, u.then(e, e);
              break t;
            case 3:
              Yt = 7;
              break t;
            case 4:
              Yt = 5;
              break t;
            case 7:
              Uo(u) ? (Yt = 0, Qe = null, Um(e)) : (Yt = 0, Qe = null, Rn(t, e, u, 7));
              break;
            case 5:
              var i = null;
              switch (Nt.tag) {
                case 26:
                  i = Nt.memoizedState;
                case 5:
                case 27:
                  var f = Nt;
                  if (i ? Mh(i) : f.stateNode.complete) {
                    Yt = 0, Qe = null;
                    var h = f.sibling;
                    if (h !== null) Nt = h;
                    else {
                      var T = f.return;
                      T !== null ? (Nt = T, ac(T)) : Nt = null;
                    }
                    break e;
                  }
              }
              Yt = 0, Qe = null, Rn(t, e, u, 5);
              break;
            case 6:
              Yt = 0, Qe = null, Rn(t, e, u, 6);
              break;
            case 8:
              hr(), le = 6;
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
    return wl = Aa = null, tt.H = a, tt.A = n, Bt = l, Nt !== null ? 0 : (Kt = null, Ct = 0, ri(), le);
  }
  function cg() {
    for (; Nt !== null && !zt(); )
      wm(Nt);
  }
  function wm(t) {
    var e = kd(t.alternate, t, ql);
    t.memoizedProps = t.pendingProps, e === null ? ac(t) : Nt = e;
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
          Ct
        );
        break;
      case 11:
        e = Vd(
          l,
          e,
          e.pendingProps,
          e.type.render,
          e.ref,
          Ct
        );
        break;
      case 5:
        Es(e);
        var a = e;
        a === me && (Et ? (vi(a), a.tag === 5 && a.stateNode != null && (Jt = a.stateNode)) : (vi(a), Et = !0));
      default:
        Id(l, e), e = Nt = No(e, ql), e = kd(l, e, ql);
    }
    t.memoizedProps = t.pendingProps, e === null ? ac(t) : Nt = e;
  }
  function Rn(t, e, l, a) {
    wl = Aa = null, Es(e), yn = null, fu = 0;
    var n = e.return;
    try {
      if ($v(
        t,
        n,
        e,
        l,
        Ct
      )) {
        le = 1, Ui(
          t,
          Ie(l, t.current)
        ), Nt = null;
        return;
      }
    } catch (u) {
      if (n !== null) throw Nt = n, u;
      le = 1, Ui(
        t,
        Ie(l, t.current)
      ), Nt = null;
      return;
    }
    e.flags & 32768 ? (Et || a === 1 ? t = !0 : xn || (Ct & 536870912) !== 0 ? t = !1 : (ca = t = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = be.current, a !== null && a.tag === 13 && (a.flags |= 16384))), Bm(e, t)) : ac(e);
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
      var l = Iv(
        e.alternate,
        e,
        ql
      );
      if (l !== null) {
        Nt = l;
        return;
      }
      if (e = e.sibling, e !== null) {
        Nt = e;
        return;
      }
      Nt = e = t;
    } while (e !== null);
    le === 0 && (le = 5);
  }
  function Bm(t, e) {
    do {
      var l = Pv(t.alternate, t);
      if (l !== null) {
        l.flags &= 32767, Nt = l;
        return;
      }
      if (l = t.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !e && (t = t.sibling, t !== null)) {
        Nt = t;
        return;
      }
      Nt = t = l;
    } while (t !== null);
    le = 6, Nt = null;
  }
  function Hm(t, e, l, a, n, u, i, f, h, T, z, w) {
    t.cancelPendingCommit = null;
    do
      nc();
    while (te !== 0);
    if ((Bt & 6) !== 0) throw Error(s(327));
    if (e !== null) {
      if (e === t.current) throw Error(s(177));
      t === Kt && (Nt = Kt = null, Ct = 0), Va = e, fl = t, Tl = l, mr = n, Mm = a, sg(
        t,
        e,
        l,
        i,
        f,
        h,
        w
      );
    }
  }
  function sg(t, e, l, a, n, u, i) {
    var f = e.lanes | e.childLanes;
    if (dr = f, f |= kc, w0(
      t,
      l,
      f,
      a,
      n,
      u
    ), zn = null, (l & 335544064) === l ? (Cn = Bv(t), a = 10262) : (Cn = null, a = 10256), (e.subtreeFlags & a) !== 0 || (e.flags & a) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, hg(Ku, function() {
      return pr(), null;
    })) : (t.callbackNode = null, t.callbackPriority = 0), Vi = !1, a = (e.flags & 13878) !== 0, (e.subtreeFlags & 13878) !== 0 || a) {
      a = tt.T, tt.T = null, n = nt.p, nt.p = 2, u = Bt, Bt |= 4;
      try {
        tg(t, e, l);
      } finally {
        Bt = u, nt.p = n, tt.T = a;
      }
    }
    te = 1, Vi ? On = wg(
      i,
      t.containerInfo,
      Cn,
      gr,
      yr,
      fg,
      br,
      pr,
      rg
    ) : (gr(), yr(), br());
  }
  function rg(t) {
    if (te !== 0) {
      var e = fl.onRecoverableError;
      e(t, { componentStack: null });
    }
  }
  function fg() {
    te === 3 && (te = 0, pm(Va, fl), te = 4);
  }
  function gr() {
    if (te === 1) {
      te = 0;
      var t = fl, e = Va, l = Tl, a = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || a) {
        a = tt.T, tt.T = null;
        var n = nt.p;
        nt.p = 2;
        var u = Bt;
        Bt |= 4;
        try {
          Eu = Ki = !1, ym(e, t, l), l = jr;
          var i = ho(t.containerInfo), f = l.focusedElem, h = l.selectionRange;
          if (i !== f && f && f.ownerDocument && mo(
            f.ownerDocument.documentElement,
            f
          )) {
            if (h !== null && Zc(f)) {
              var T = h.start, z = h.end;
              if (z === void 0 && (z = T), "selectionStart" in f)
                f.selectionStart = T, f.selectionEnd = Math.min(
                  z,
                  f.value.length
                );
              else {
                var w = f.ownerDocument || document, S = w && w.defaultView || window;
                if (S.getSelection) {
                  var M = S.getSelection(), Q = f.textContent.length, et = Math.min(h.start, Q), pt = h.end === void 0 ? et : Math.min(h.end, Q);
                  !M.extend && et > pt && (i = pt, pt = et, et = i);
                  var E = oo(
                    f,
                    et
                  ), y = oo(
                    f,
                    pt
                  );
                  if (E && y && (M.rangeCount !== 1 || M.anchorNode !== E.node || M.anchorOffset !== E.offset || M.focusNode !== y.node || M.focusOffset !== y.offset)) {
                    var x = w.createRange();
                    x.setStart(E.node, E.offset), M.removeAllRanges(), et > pt ? (M.addRange(x), M.extend(y.node, y.offset)) : (x.setEnd(y.node, y.offset), M.addRange(x));
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
          qn = !!Ar, jr = Ar = null;
        } finally {
          Bt = u, nt.p = n, tt.T = a;
        }
      }
      t.current = e, te = 2;
    }
  }
  function yr() {
    if (te === 2) {
      te = 0;
      var t = fl, e = Va, l = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || l) {
        l = tt.T, tt.T = null;
        var a = nt.p;
        nt.p = 2;
        var n = Bt;
        Bt |= 4;
        try {
          om(t, e.alternate, e);
        } finally {
          Bt = n, nt.p = a, tt.T = l;
        }
      }
      te = 3;
    }
  }
  function br() {
    if (te === 4 || te === 3) {
      te = 0;
      var t = On;
      On = null, Dt();
      var e = fl, l = Va, a = Tl, n = Mm, u = (a & 335544064) === a ? 10262 : 10256;
      if ((l.subtreeFlags & u) !== 0 || (l.flags & u) !== 0 ? te = 5 : (te = 0, Va = fl = null, Lm(e, e.pendingLanes)), u = e.pendingLanes, u === 0 && (ra = null), Oc(a), l = l.stateNode, Le && typeof Le.onCommitFiberRoot == "function")
        try {
          Le.onCommitFiberRoot(
            Zn,
            l,
            void 0,
            (l.current.flags & 128) === 128
          );
        } catch {
        }
      if (n !== null) {
        l = tt.T, u = nt.p, nt.p = 2, tt.T = null;
        try {
          for (var i = e.onRecoverableError, f = 0; f < n.length; f++) {
            var h = n[f];
            i(h.value, {
              componentStack: h.stack
            });
          }
        } finally {
          tt.T = l, nt.p = u;
        }
      }
      if (n = zn, i = Cn, Cn = null, n !== null && (zn = null, i === null && (i = []), t !== null))
        for (h = 0; h < n.length; h++)
          l = (0, n[h])(
            i
          ), l !== void 0 && t.finished.finally(l);
      (Tl & 3) !== 0 && nc(), Nl(e), u = e.pendingLanes, (a & 261930) !== 0 && (u & 42) !== 0 ? e === tc ? Mu++ : (Mu = 0, tc = e) : (Mu = 0, tc = null), Ou(0);
    }
  }
  function Lm(t, e) {
    (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, cu(e)));
  }
  function nc() {
    return On !== null && (On.skipTransition(), On = null), gr(), yr(), br(), pr();
  }
  function pr() {
    if (te !== 5) return !1;
    var t = fl, e = dr;
    dr = 0;
    var l = Oc(Tl), a = tt.T, n = nt.p;
    try {
      nt.p = 32 > l ? 32 : l, tt.T = null, l = mr, mr = null;
      var u = fl, i = Tl;
      if (te = 0, Va = fl = null, Tl = 0, (Bt & 6) !== 0) throw Error(s(331));
      var f = Bt;
      if (Bt |= 4, Tm(u.current), Sm(
        u,
        u.current,
        i,
        l
      ), Bt = f, Ou(0, !1), Le && typeof Le.onPostCommitFiberRoot == "function")
        try {
          Le.onPostCommitFiberRoot(Zn, u);
        } catch {
        }
      return !0;
    } finally {
      nt.p = n, tt.T = a, Lm(t, e);
    }
  }
  function Ym(t, e, l) {
    e = Ie(l, e), e = Bs(t.stateNode, e, 2), t = ea(t, e, 2), t !== null && (Jn(t, 2), Nl(t));
  }
  function qt(t, e, l) {
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
            t = Ie(l, t), l = Ud(2), a = ea(e, l, 2), a !== null && (Bd(
              l,
              a,
              e,
              t
            ), Jn(a, 2), Nl(a));
            break;
          }
        }
        e = e.return;
      }
  }
  function Sr(t, e, l) {
    var a = t.pingCache;
    if (a === null) {
      a = t.pingCache = new ag();
      var n = /* @__PURE__ */ new Set();
      a.set(e, n);
    } else
      n = a.get(e), n === void 0 && (n = /* @__PURE__ */ new Set(), a.set(e, n));
    n.has(l) || (fr = !0, n.add(l), t = og.bind(null, t, e, l), e.then(t, t));
  }
  function og(t, e, l) {
    var a = t.pingCache;
    a !== null && a.delete(e), t.pingedLanes |= t.suspendedLanes & l, t.warmLanes &= ~l, Kt === t && (Ct & l) === l && ((le === 4 || le === 3 && (Ct & 62914560) === Ct && 300 > Pt() - Wi) && (Bt & 2) === 0 ? jn(t, 0) : ki |= l, Mn === Ct && (Mn = 0)), Nl(t);
  }
  function qm(t, e) {
    e === 0 && (e = Nf()), t = Oa(t, e), t !== null && (Jn(t, e), Nl(t));
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
    return O(t, e);
  }
  var Dn = null, wn = null, _r = !1, uc = !1, Er = !1, oa = 0;
  function Nl(t) {
    t !== wn && t.next === null && (wn === null ? Dn = wn = t : wn = wn.next = t), uc = !0, _r || (_r = !0, gg());
  }
  function Ou(t, e) {
    if (!Er && uc) {
      Er = !0;
      do
        for (var l = !1, a = Dn; a !== null; ) {
          if (t !== 0) {
            var n = a.pendingLanes;
            if (n === 0) var u = 0;
            else {
              var i = a.suspendedLanes, f = a.pingedLanes;
              u = (1 << 31 - Ye(42 | t) + 1) - 1, u &= n & ~(i & ~f), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (l = !0, Qm(a, u));
          } else
            u = Ct, u = ku(
              a,
              a === Kt ? u : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (u & 3) === 0 || Kn(a, u) || (l = !0, Qm(a, u));
          a = a.next;
        }
      while (l);
      Er = !1;
    }
  }
  function vg() {
    Gm();
  }
  function Gm() {
    uc = _r = !1;
    var t = 0;
    oa !== 0 && Og() && (t = oa);
    for (var e = Pt(), l = null, a = Dn; a !== null; ) {
      var n = a.next, u = Xm(a, e);
      u === 0 ? (a.next = null, l === null ? Dn = n : l.next = n, n === null && (wn = l)) : (l = a, (t !== 0 || (u & 3) !== 0) && (uc = !0)), a = n;
    }
    te !== 0 && te !== 5 || Ou(t), oa !== 0 && (oa = 0);
  }
  function Xm(t, e) {
    for (var l = t.suspendedLanes, a = t.pingedLanes, n = t.expirationTimes, u = t.pendingLanes & -62914561; 0 < u; ) {
      var i = 31 - Ye(u), f = 1 << i, h = n[i];
      h === -1 ? ((f & l) === 0 || (f & a) !== 0) && (n[i] = D0(f, e)) : h <= e && (t.expiredLanes |= f), u &= ~f;
    }
    if (e = Kt, l = Ct, l = ku(
      t,
      t === e ? l : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a = t.callbackNode, l === 0 || t === e && (Yt === 2 || Yt === 9) || t.cancelPendingCommit !== null)
      return a !== null && a !== null && J(a), t.callbackNode = null, t.callbackPriority = 0;
    if ((l & 3) === 0 || Kn(t, l)) {
      if (e = l & -l, e === t.callbackPriority) return e;
      switch (a !== null && J(a), Oc(l)) {
        case 2:
        case 8:
          l = _f;
          break;
        case 32:
          l = Ku;
          break;
        case 268435456:
          l = Ef;
          break;
        default:
          l = Ku;
      }
      return a = Vm.bind(null, t), l = O(l, a), t.callbackPriority = e, t.callbackNode = l, e;
    }
    return a !== null && a !== null && J(a), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function Vm(t, e) {
    if (te !== 0 && te !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var l = t.callbackNode;
    if (nc() && t.callbackNode !== l)
      return null;
    var a = Ct;
    return a = ku(
      t,
      t === Kt ? a : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a === 0 ? null : (zm(t, a, e), Xm(t, Pt()), t.callbackNode != null && t.callbackNode === l ? Vm.bind(null, t) : null);
  }
  function Qm(t, e) {
    if (nc()) return null;
    zm(t, e, !0);
  }
  function gg() {
    Cg(function() {
      (Bt & 6) !== 0 ? O(
        Wa,
        vg
      ) : Gm();
    });
  }
  function Tr() {
    if (oa === 0) {
      var t = Da;
      t === 0 && (t = Ju, Ju <<= 1, (Ju & 261888) === 0 && (Ju = 256)), oa = t;
    }
    return oa;
  }
  function Zm(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : ei(t);
  }
  function yg(t, e, l, a, n) {
    if (e === "submit" && l && l.stateNode === n) {
      var u = Zm(
        (n[Re] || null).action
      ), i = a.submitter;
      i && (e = (e = i[Re] || null) ? Zm(e.formAction) : i.getAttribute("formAction"), e !== null && (u = e, i = null));
      var f = new ui(
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
                  var h = new FormData(n, i);
                  js(
                    l,
                    {
                      pending: !0,
                      data: h,
                      method: n.method,
                      action: u
                    },
                    null,
                    h
                  );
                }
              } else
                typeof u == "function" && (f.preventDefault(), h = new FormData(n, i), js(
                  l,
                  {
                    pending: !0,
                    data: h,
                    method: n.method,
                    action: u
                  },
                  u,
                  h
                ));
            },
            currentTarget: n
          }
        ]
      });
    }
  }
  for (var Nr = 0; Nr < Fc.length; Nr++) {
    var xr = Fc[Nr], bg = xr.toLowerCase(), pg = xr[0].toUpperCase() + xr.slice(1);
    il(
      bg,
      "on" + pg
    );
  }
  il(yo, "onAnimationEnd"), il(bo, "onAnimationIteration"), il(po, "onAnimationStart"), il("dblclick", "onDoubleClick"), il("focusin", "onFocus"), il("focusout", "onBlur"), il(zv, "onTransitionRun"), il(Cv, "onTransitionStart"), il(Av, "onTransitionCancel"), il(So, "onTransitionEnd"), en("onMouseEnter", ["mouseout", "mouseover"]), en("onMouseLeave", ["mouseout", "mouseover"]), en("onPointerEnter", ["pointerout", "pointerover"]), en("onPointerLeave", ["pointerout", "pointerover"]), Na(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Na(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Na("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Na(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Na(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Na(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var zu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Sg = new Set(
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
            var f = a[i], h = f.instance, T = f.currentTarget;
            if (f = f.listener, h !== u && n.isPropagationStopped())
              break t;
            u = f, n.currentTarget = T;
            try {
              u(n);
            } catch (z) {
              si(z);
            }
            n.currentTarget = null, u = h;
          }
        else
          for (i = 0; i < a.length; i++) {
            if (f = a[i], h = f.instance, T = f.currentTarget, f = f.listener, h !== u && n.isPropagationStopped())
              break t;
            u = f, n.currentTarget = T;
            try {
              u(n);
            } catch (z) {
              si(z);
            }
            n.currentTarget = null, u = h;
          }
      }
    }
  }
  function xt(t, e) {
    var l = e[Af];
    l === void 0 && (l = e[Af] = /* @__PURE__ */ new Set());
    var a = t + "__bubble";
    l.has(a) || (Jm(e, t, 2, !1), l.add(a));
  }
  function Mr(t, e, l) {
    var a = 0;
    e && (a |= 4), Jm(
      l,
      t,
      a,
      e
    );
  }
  var ic = "_reactListening" + Math.random().toString(36).slice(2);
  function Or(t) {
    if (!t[ic]) {
      t[ic] = !0, Df.forEach(function(l) {
        l !== "selectionchange" && (Sg.has(l) || Mr(l, !1, t), Mr(l, !0, t));
      });
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[ic] || (e[ic] = !0, Mr("selectionchange", !1, e));
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
        n = Jr;
    }
    l = n.bind(
      null,
      e,
      l,
      t
    ), n = void 0, !Uc || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (n = !0), a ? n !== void 0 ? t.addEventListener(e, l, {
      capture: !0,
      passive: n
    }) : t.addEventListener(e, l, !0) : n !== void 0 ? t.addEventListener(e, l, {
      passive: n
    }) : t.addEventListener(e, l, !1);
  }
  function zr(t, e, l, a, n) {
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
              var h = i.tag;
              if ((h === 3 || h === 4) && i.stateNode.containerInfo === n)
                return;
              i = i.return;
            }
          for (; f !== null; ) {
            if (i = Ta(f), i === null) return;
            if (h = i.tag, h === 5 || h === 6 || h === 26 || h === 27) {
              a = u = i;
              continue t;
            }
            f = f.parentNode;
          }
        }
        a = a.return;
      }
    Kf(function() {
      var T = u, z = Dc(l), w = [];
      t: {
        var S = _o.get(t);
        if (S !== void 0) {
          var M = ui, Q = t;
          switch (t) {
            case "keypress":
              if (ai(l) === 0) break t;
            case "keydown":
            case "keyup":
              M = nv;
              break;
            case "focusin":
              Q = "focus", M = Yc;
              break;
            case "focusout":
              Q = "blur", M = Yc;
              break;
            case "beforeblur":
            case "afterblur":
              M = Yc;
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
              M = Ff;
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
              M = F0;
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
          var et = (e & 4) !== 0, pt = !et && (t === "scroll" || t === "scrollend"), E = et ? S !== null ? S + "Capture" : null : S;
          et = [];
          for (var y = T, x; y !== null; ) {
            var D = y;
            if (x = D.stateNode, D = D.tag, D !== 5 && D !== 26 && D !== 27 || x === null || E === null || (D = kn(y, E), D != null && et.push(
              Cu(y, D, x)
            )), pt) break;
            y = y.return;
          }
          0 < et.length && (S = new M(
            S,
            Q,
            null,
            l,
            z
          ), w.push({ event: S, listeners: et }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (M = t === "mouseover" || t === "pointerover", S = t === "mouseout" || t === "pointerout", M && l !== Rc && (Q = l.relatedTarget || l.fromElement) && (Ta(Q) || Q[Ia]))
            break t;
          (S || M) && (Q = z.window === z ? z : (M = z.ownerDocument) ? M.defaultView || M.parentWindow : window, S ? (M = l.relatedTarget || l.toElement, S = T, M = M ? Ta(M) : null, M !== null && (pt = m(M), et = M.tag, M !== pt || et !== 5 && et !== 27 && et !== 6) && (M = null)) : (S = null, M = T), S !== M && (et = Ff, D = "onMouseLeave", E = "onMouseEnter", y = "mouse", (t === "pointerout" || t === "pointerover") && (et = Wf, D = "onPointerLeave", E = "onPointerEnter", y = "pointer"), pt = S == null ? Q : Fn(S), x = M == null ? Q : Fn(M), Q = new et(
            D,
            y + "leave",
            S,
            l,
            z
          ), Q.target = pt, Q.relatedTarget = x, D = null, Ta(z) === T && (et = new et(
            E,
            y + "enter",
            M,
            l,
            z
          ), et.target = x, et.relatedTarget = pt, D = et), pt = D, et = S && M ? gt(
            S,
            M,
            _g
          ) : null, S !== null && $m(
            w,
            Q,
            S,
            et,
            !1
          ), M !== null && pt !== null && $m(
            w,
            pt,
            M,
            et,
            !0
          )));
        }
        t: {
          if (S = T ? Fn(T) : window, M = S.nodeName && S.nodeName.toLowerCase(), M === "select" || M === "input" && S.type === "file")
            var k = uo;
          else if (ao(S))
            if (io)
              k = xv;
            else {
              k = Tv;
              var At = Ev;
            }
          else
            M = S.nodeName, !M || M.toLowerCase() !== "input" || S.type !== "checkbox" && S.type !== "radio" ? T && jc(T.elementType) && (k = uo) : k = Nv;
          if (k && (k = k(t, T))) {
            no(
              w,
              k,
              l,
              z
            );
            break t;
          }
          At && At(t, S, T);
        }
        switch (At = T ? Fn(T) : window, t) {
          case "focusin":
            (ao(At) || At.contentEditable === "true") && (sn = At, Kc = T, nu = null);
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
            Jc = !1, vo(w, l, z);
            break;
          case "selectionchange":
            if (Ov) break;
          case "keydown":
          case "keyup":
            vo(w, l, z);
        }
        var ut;
        if (Gc)
          t: {
            switch (t) {
              case "compositionstart":
                var st = "onCompositionStart";
                break t;
              case "compositionend":
                st = "onCompositionEnd";
                break t;
              case "compositionupdate":
                st = "onCompositionUpdate";
                break t;
            }
            st = void 0;
          }
        else
          cn ? eo(t, l) && (st = "onCompositionEnd") : t === "keydown" && l.keyCode === 229 && (st = "onCompositionStart");
        st && (If && l.locale !== "ko" && (cn || st !== "onCompositionStart" ? st === "onCompositionEnd" && cn && (ut = Jf()) : (Kl = z, Bc = "value" in Kl ? Kl.value : Kl.textContent, cn = !0)), At = cc(T, st), 0 < At.length && (st = new kf(
          st,
          t,
          null,
          l,
          z
        ), w.push({ event: st, listeners: At }), ut ? st.data = ut : (ut = lo(l), ut !== null && (st.data = ut)))), (ut = yv ? bv(t, l) : pv(t, l)) && (st = cc(T, "onBeforeInput"), 0 < st.length && (At = new kf(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          z
        ), w.push({
          event: At,
          listeners: st
        }), At.data = ut)), yg(
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
  function Cu(t, e, l) {
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
        Cu(t, n, u)
      ), n = kn(t, e), n != null && a.push(
        Cu(t, n, u)
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
      var f = l, h = f.alternate, T = f.stateNode;
      if (f = f.tag, h !== null && h === a) break;
      f !== 5 && f !== 26 && f !== 27 || T === null || (h = T, n ? (T = kn(l, u), T != null && i.unshift(
        Cu(l, T, h)
      )) : n || (T = kn(l, u), T != null && i.push(
        Cu(l, T, h)
      ))), l = l.return;
    }
    i.length !== 0 && t.push({ event: e, listeners: i });
  }
  var Eg = /\r\n?/g, Tg = /\u0000|\uFFFD/g;
  function Fm(t) {
    return (typeof t == "string" ? t : "" + t).replace(Eg, `
`).replace(Tg, "");
  }
  function km(t, e) {
    return e = Fm(e), Fm(t) === e;
  }
  function Gt(t, e, l, a, n, u) {
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
        Qf(t, a, u);
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
          typeof u == "function" && (l === "formAction" ? (e !== "input" && Gt(t, e, "name", n.name, n, null), Gt(
            t,
            e,
            "formEncType",
            n.formEncType,
            n,
            null
          ), Gt(
            t,
            e,
            "formMethod",
            n.formMethod,
            n,
            null
          ), Gt(
            t,
            e,
            "formTarget",
            n.formTarget,
            n,
            null
          )) : (Gt(t, e, "encType", n.encType, n, null), Gt(t, e, "method", n.method, n, null), Gt(t, e, "target", n.target, n, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          t.removeAttribute(l);
          break;
        }
        a = ei(a), t.setAttribute(l, a);
        break;
      case "onClick":
        a != null && (t.onclick = hl);
        return;
      case "onScroll":
        a != null && xt("scroll", t);
        return;
      case "onScrollEnd":
        a != null && xt("scrollend", t);
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
        xt("beforetoggle", t), xt("toggle", t), Pu(t, "popover", a);
        break;
      case "xlinkActuate":
        zl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        zl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        zl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        zl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        zl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        zl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        zl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        zl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        zl(
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
          l = X0.get(l) || l, Pu(t, l, a);
        else return;
    }
    Ut = !0;
  }
  function Cr(t, e, l, a, n, u) {
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
        if (typeof a == "string") an(t, a);
        else if (typeof a == "number" || typeof a == "bigint")
          an(t, "" + a);
        else return;
        break;
      case "onScroll":
        a != null && xt("scroll", t);
        return;
      case "onScrollEnd":
        a != null && xt("scrollend", t);
        return;
      case "onClick":
        a != null && (t.onclick = hl);
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
            if (l[0] === "o" && l[1] === "n" && (n = l.endsWith("Capture"), u = l.slice(2, n ? l.length - 7 : void 0), e = t[Re] || null, e = e != null ? e[l] : null, typeof e == "function" && t.removeEventListener(u, e, n), typeof a == "function")) {
              typeof e != "function" && e !== null && (l in t ? t[l] = null : t.hasAttribute(l) && t.removeAttribute(l)), t.addEventListener(u, a, n);
              break t;
            }
            Ut = !0, l in t ? t[l] = a : a === !0 ? t.setAttribute(l, "") : Pu(t, l, a);
          }
        return;
    }
    Ut = !0;
  }
  function _e(t, e, l) {
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
        xt("error", t), xt("load", t);
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
                  Gt(t, e, u, i, l, null);
              }
          }
        n && Gt(t, e, "srcSet", l.srcSet, l, null), a && Gt(t, e, "src", l.src, l, null);
        return;
      case "input":
        xt("invalid", t);
        var f = u = i = n = null, h = null, T = null;
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
                  h = z;
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
                  Gt(t, e, a, z, l, null);
              }
          }
        qf(
          t,
          u,
          f,
          h,
          T,
          i,
          n,
          !1
        );
        return;
      case "select":
        xt("invalid", t), a = i = u = null;
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
                Gt(t, e, n, f, l, null);
            }
        e = u, l = i, t.multiple = !!a, e != null ? ln(t, !!a, e, !1) : l != null && ln(t, !!a, l, !0);
        return;
      case "textarea":
        xt("invalid", t), u = n = a = null;
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
                Gt(t, e, i, f, l, null);
            }
        Xf(t, a, n, u);
        return;
      case "option":
        for (h in l)
          l.hasOwnProperty(h) && (a = l[h], a != null) && (h === "selected" ? t.selected = a && typeof a != "function" && typeof a != "symbol" : Gt(t, e, h, a, l, null));
        return;
      case "dialog":
        xt("beforetoggle", t), xt("toggle", t), xt("cancel", t), xt("close", t);
        break;
      case "iframe":
      case "object":
        xt("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < zu.length; a++)
          xt(zu[a], t);
        break;
      case "image":
        xt("error", t), xt("load", t);
        break;
      case "details":
        xt("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        xt("error", t), xt("load", t);
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
                Gt(t, e, T, a, l, null);
            }
        return;
      default:
        if (jc(e)) {
          for (z in l)
            l.hasOwnProperty(z) && (a = l[z], a !== void 0 && Cr(
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
      l.hasOwnProperty(f) && (a = l[f], a != null && Gt(t, e, f, a, l, null));
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
        var n = null, u = null, i = null, f = null, h = null, T = null, z = null;
        for (M in l) {
          var w = l[M];
          if (l.hasOwnProperty(M) && w != null)
            switch (M) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                h = w;
              default:
                a.hasOwnProperty(M) || Gt(t, e, M, null, a, w);
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
                M !== w && Gt(
                  t,
                  e,
                  S,
                  M,
                  a,
                  w
                );
            }
        }
        Cc(
          t,
          i,
          f,
          h,
          T,
          z,
          u,
          n
        );
        return;
      case "select":
        M = i = f = S = null;
        for (u in l)
          if (h = l[u], l.hasOwnProperty(u) && h != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                M = h;
              default:
                a.hasOwnProperty(u) || Gt(
                  t,
                  e,
                  u,
                  null,
                  a,
                  h
                );
            }
        for (n in a)
          if (u = a[n], h = l[n], a.hasOwnProperty(n) && (u != null || h != null))
            switch (n) {
              case "value":
                u !== h && (Ut = !0), S = u;
                break;
              case "defaultValue":
                u !== h && (Ut = !0), f = u;
                break;
              case "multiple":
                u !== h && (Ut = !0), i = u;
              default:
                u !== h && Gt(
                  t,
                  e,
                  n,
                  u,
                  a,
                  h
                );
            }
        e = f, l = i, a = M, S != null ? ln(t, !!l, S, !1) : !!a != !!l && (e != null ? ln(t, !!l, e, !0) : ln(t, !!l, l ? [] : "", !1));
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
                Gt(t, e, f, null, a, n);
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
                n !== u && Gt(t, e, i, n, a, u);
            }
        Gf(t, S, M);
        return;
      case "option":
        for (var Q in l)
          S = l[Q], l.hasOwnProperty(Q) && S != null && !a.hasOwnProperty(Q) && (Q === "selected" ? t.selected = !1 : Gt(
            t,
            e,
            Q,
            null,
            a,
            S
          ));
        for (h in a)
          S = a[h], M = l[h], a.hasOwnProperty(h) && S !== M && (S != null || M != null) && (h === "selected" ? (S !== M && (Ut = !0), t.selected = S && typeof S != "function" && typeof S != "symbol") : Gt(
            t,
            e,
            h,
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
        for (var et in l)
          S = l[et], l.hasOwnProperty(et) && S != null && !a.hasOwnProperty(et) && Gt(t, e, et, null, a, S);
        for (T in a)
          if (S = a[T], M = l[T], a.hasOwnProperty(T) && S !== M && (S != null || M != null))
            switch (T) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (S != null)
                  throw Error(s(137, e));
                break;
              default:
                Gt(
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
        if (jc(e)) {
          for (var pt in l)
            S = l[pt], l.hasOwnProperty(pt) && S !== void 0 && !a.hasOwnProperty(pt) && Cr(
              t,
              e,
              pt,
              void 0,
              a,
              S
            );
          for (z in a)
            S = a[z], M = l[z], !a.hasOwnProperty(z) || S === M || S === void 0 && M === void 0 || Cr(
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
      S = l[E], l.hasOwnProperty(E) && S != null && !a.hasOwnProperty(E) && Gt(t, e, E, null, a, S);
    for (w in a)
      S = a[w], M = l[w], !a.hasOwnProperty(w) || S === M || S == null && M == null || Gt(t, e, w, S, a, M);
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
            var h = l[a], T = h.startTime;
            if (T > f) break;
            var z = h.transferSize, w = h.initiatorType;
            z && Wm(w) && (h = h.responseEnd, i += z * (h < f ? 1 : (f - T) / (h - T)));
          }
          if (--a, e += 8 * (u + i) / (n.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var Ar = null, jr = null;
  function Au(t) {
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
    return l = Au(
      l
    ).createElement(t), l[ge] = a, l[Re] = e, _e(l, t, e), de(l), l;
  }
  function Rr(t, e) {
    return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.children == "bigint" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
  }
  var Dr = null;
  function Og() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Dr ? !1 : (Dr = t, !0) : (Dr = null, !1);
  }
  var wr = typeof setTimeout == "function" ? setTimeout : void 0, zg = typeof clearTimeout == "function" ? clearTimeout : void 0, eh = typeof Promise == "function" ? Promise : void 0, lh = typeof requestAnimationFrame == "function" ? requestAnimationFrame : wr, Cg = typeof queueMicrotask == "function" ? queueMicrotask : typeof eh < "u" ? function(t) {
    return eh.resolve(null).then(t).catch(Ag);
  } : wr;
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
            t.removeChild(n), Gn(e);
            return;
          }
          a--;
        } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&")
          a++;
        else if (l === "html")
          Xr(
            t.ownerDocument.documentElement
          );
        else if (l === "head") {
          l = t.ownerDocument.head, Xr(l);
          for (var u = l.firstChild; u; ) {
            var i = u.nextSibling, f = u.nodeName;
            u[$n] || f === "SCRIPT" || f === "STYLE" || f === "LINK" && u.rel.toLowerCase() === "stylesheet" || l.removeChild(u), u = i;
          }
        } else
          l === "body" && Xr(t.ownerDocument.body);
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
  function jg(t, e, l) {
    return l = l.ownerDocument.defaultView, {
      rect: t,
      abs: e.position === "absolute" || e.position === "fixed",
      clip: e.clipPath !== "none" || e.overflow !== "visible" || e.filter !== "none" || e.mask !== "none" || e.mask !== "none" || e.borderRadius !== "0px",
      view: 0 <= t.bottom && 0 <= t.right && t.top <= l.innerHeight && t.left <= l.innerWidth
    };
  }
  function Ur(t) {
    var e = t.getBoundingClientRect(), l = getComputedStyle(t);
    return jg(e, l, t);
  }
  function Rg(t) {
    return t.documentElement.clientHeight;
  }
  function Dg(t) {
    this.addEventListener("load", t), this.addEventListener("error", t);
  }
  function wg(t, e, l, a, n, u, i, f, h) {
    var T = e.nodeType === 9 ? e : e.ownerDocument;
    try {
      var z = T.startViewTransition({
        update: function() {
          var S = T.defaultView, M = S.navigation && S.navigation.transition, Q = T.fonts.status;
          a();
          var et = [];
          if (Q === "loaded" && (Rg(T), T.fonts.status === "loading" && et.push(T.fonts.ready)), Q = et.length, t !== null)
            for (var pt = t.suspenseyImages, E = 0, y = 0; y < pt.length; y++) {
              var x = pt[y];
              if (!x.complete) {
                var D = x.getBoundingClientRect();
                if (0 < D.bottom && 0 < D.right && D.top < S.innerHeight && D.left < S.innerWidth) {
                  if (E += Oh(x), E > fc) {
                    et.length = Q;
                    break;
                  }
                  x = new Promise(
                    Dg.bind(x)
                  ), et.push(x);
                }
              }
            }
          if (0 < et.length)
            return S = Promise.race([
              Promise.all(et),
              new Promise(function(k) {
                return setTimeout(k, 500);
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
            var Q = S[M], et = Q.effect, pt = et.pseudoElement;
            if (pt != null && pt.startsWith("::view-transition")) {
              w.push(Q), Q = et.getKeyframes();
              for (var E = pt = void 0, y = !0, x = 0; x < Q.length; x++) {
                var D = Q[x], k = D.width;
                if (pt === void 0) pt = k;
                else if (pt !== k) {
                  y = !1;
                  break;
                }
                if (k = D.height, E === void 0) E = k;
                else if (E !== k) {
                  y = !1;
                  break;
                }
                delete D.width, delete D.height, D.transform === "none" && delete D.transform;
              }
              y && pt !== void 0 && E !== void 0 && (et.setKeyframes(Q), y = getComputedStyle(
                et.target,
                et.pseudoElement
              ), y.width !== pt || y.height !== E) && (y = Q[0], y.width = pt, y.height = E, y = Q[Q.length - 1], y.width = pt, y.height = E, et.setKeyframes(Q));
            }
          }
          i();
        },
        function(S) {
          T.__reactViewTransition === z && (T.__reactViewTransition = null);
          try {
            typeof S == "object" && S !== null && S.name === "InvalidStateError" && (S.message === "View transition was skipped because document visibility state is hidden." || S.message === "Skipping view transition because document visibility state has become hidden." || S.message === "Skipping view transition because viewport size changed." || S.message === "Transition was aborted because of invalid state") && (S = null), S !== null && h(S);
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
  function Qa(t, e) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + t + "(" + e + ")";
  }
  Qa.prototype.animate = function(t, e) {
    return e = typeof e == "number" ? { duration: e } : Z({}, e), e.pseudoElement = this._selector, this._scope.animate(t, e);
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
  function Je(t) {
    this._fragmentFiber = t, this._observers = this._eventListeners = null;
  }
  Je.prototype.addEventListener = function(t, e, l) {
    var a = null, n = null;
    if (!(l != null && typeof l != "boolean" && (a = l.signal || null, a !== null && a.aborted))) {
      this._eventListeners === null && (this._eventListeners = []);
      var u = this._eventListeners;
      if (rh(u, t, e, l) === -1) {
        var i = this, f = e;
        l != null && typeof l != "boolean" && l.once === !0 && (f = function(h) {
          i.removeEventListener(
            t,
            e,
            l
          ), typeof e == "function" ? e.call(this, h) : e.handleEvent(h);
        }), a !== null && (n = i.removeEventListener.bind(
          i,
          t,
          e,
          l
        ), a.addEventListener("abort", n, { once: !0 }), n = a.removeEventListener.bind(a, "abort", n)), a = Un(l), u.push({
          type: t,
          listener: e,
          optionsOrUseCapture: l,
          attachedListener: f,
          cleanup: n
        }), v(
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
    return $(t).addEventListener(
      e,
      l,
      a
    ), !1;
  }
  Je.prototype.removeEventListener = function(t, e, l) {
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
      n = Un(n.optionsOrUseCapture), v(
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
    return $(t).removeEventListener(
      e,
      l,
      a
    ), !1;
  }
  function Un(t) {
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
  Je.prototype.dispatchEvent = function(t) {
    var e = A(
      this._fragmentFiber
    );
    if (e === null) return !0;
    e = $(e);
    var l = this._eventListeners;
    if (l !== null && 0 < l.length || !t.bubbles) {
      var a = e.nodeType === 9 ? e.createComment("") : document.createTextNode("");
      if (l)
        for (var n = 0; n < l.length; n++) {
          var u = l[n];
          a.addEventListener(
            u.type,
            u.attachedListener,
            Un(u.optionsOrUseCapture)
          );
        }
      if (e.appendChild(a), t = a.dispatchEvent(t), l)
        for (n = 0; n < l.length; n++)
          u = l[n], a.removeEventListener(
            u.type,
            u.attachedListener,
            Un(u.optionsOrUseCapture)
          );
      return e.removeChild(a), t;
    }
    return e.dispatchEvent(t);
  }, Je.prototype.focus = function(t) {
    v(
      this._fragmentFiber.child,
      !0,
      fh,
      t,
      void 0,
      void 0
    );
  };
  function fh(t, e) {
    return t.tag === 6 ? !1 : (t = $(t), $g(t, e));
  }
  Je.prototype.focusLast = function(t) {
    var e = [];
    v(
      this._fragmentFiber.child,
      !0,
      Br,
      e,
      void 0,
      void 0
    );
    for (var l = e.length - 1; 0 <= l && !fh(e[l], t); l--) ;
  };
  function Br(t, e) {
    return e.push(t), !1;
  }
  Je.prototype.blur = function() {
    var t = A(
      this._fragmentFiber
    );
    t !== null && (t = $(t), t = Au(t).activeElement, t !== null && v(
      this._fragmentFiber.child,
      !1,
      Hg,
      t,
      void 0,
      void 0
    ));
  };
  function Hg(t, e) {
    return t.tag === 6 ? !1 : (t = $(t), t === e || t.contains(e) ? (e.blur(), !0) : !1);
  }
  Je.prototype.observeUsing = function(t) {
    this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(t), v(
      this._fragmentFiber.child,
      !1,
      Lg,
      t,
      void 0,
      void 0
    );
  };
  function Lg(t, e) {
    return t.tag === 6 || (t = $(t), e.observe(t)), !1;
  }
  Je.prototype.unobserveUsing = function(t) {
    var e = this._observers;
    if (e !== null && e.has(t)) {
      e.delete(t), v(
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
    return t.tag === 6 || (t = $(t), e.unobserve(t)), !1;
  }
  var ol = [], Hr = !1;
  function qg(t, e, l) {
    ol.push({
      fragmentInstance: t,
      observer: e,
      instance: l
    }), Hr || (Hr = !0, Fg(function() {
      Hr = !1;
      var a = ol;
      ol = [];
      for (var n = 0; n < a.length; n++) {
        var u = a[n];
        u.observer.unobserve(u.instance);
      }
    }));
  }
  Je.prototype.getClientRects = function() {
    var t = [];
    return v(
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
      t = $(t), e.push.apply(e, t.getClientRects());
    return !1;
  }
  Je.prototype.getRootNode = function(t) {
    var e = A(
      this._fragmentFiber
    );
    return e === null ? this : $(e).getRootNode(t);
  }, Je.prototype.compareDocumentPosition = function(t) {
    var e = A(
      this._fragmentFiber
    );
    if (e === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var l = [];
    v(
      this._fragmentFiber.child,
      !1,
      Br,
      l,
      void 0,
      void 0
    );
    var a = $(e);
    if (l.length === 0) {
      if (l = a, H(this._fragmentFiber)) {
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
      return l === t ? n = Node.DOCUMENT_POSITION_CONTAINS : a & Node.DOCUMENT_POSITION_CONTAINED_BY && (l = V(e)[1], l === null ? n = Node.DOCUMENT_POSITION_PRECEDING : (t = $(l).compareDocumentPosition(
        t
      ), n = t === 0 || t & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), n |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    e = $(l[0]), n = $(l[l.length - 1]);
    var u = H(this._fragmentFiber) ? e.parentElement : a;
    if (u == null)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    a = u.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_CONTAINED_BY, u = u.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var i = e.compareDocumentPosition(t), f = n.compareDocumentPosition(t), h = i & Node.DOCUMENT_POSITION_CONTAINED_BY || f & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return f = a && u && i & Node.DOCUMENT_POSITION_FOLLOWING && f & Node.DOCUMENT_POSITION_PRECEDING, e = a && e === t || u && n === t || h || f ? Node.DOCUMENT_POSITION_CONTAINED_BY : !a && e === t || !u && n === t ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : i, e & Node.DOCUMENT_POSITION_DISCONNECTED || e & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || Xg(
      e,
      this._fragmentFiber,
      l[0],
      l[l.length - 1],
      t
    ) ? e : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function Xg(t, e, l, a, n) {
    var u = Ta(n);
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
    return t & Node.DOCUMENT_POSITION_PRECEDING ? ((e = !!u) && !(e = u === l) && (e = gt(
      l,
      u,
      St
    ), e === null ? e = !1 : (v(
      e,
      !0,
      W,
      u,
      l
    ), u = vt, vt = null, e = u !== null)), e) : t & Node.DOCUMENT_POSITION_FOLLOWING ? ((e = !!u) && !(e = u === a) && (e = gt(
      a,
      u,
      St
    ), e === null ? e = !1 : (v(
      e,
      !0,
      Tt,
      u,
      a
    ), u = vt, X = vt = null, e = u !== null)), e) : !1;
  }
  function oh(t, e) {
    var l = t.ownerDocument.createRange();
    l.selectNodeContents(t), t = l.getBoundingClientRect(), window.scrollTo(
      window.scrollX + t.left,
      e ? window.scrollY + t.top : window.scrollY + t.bottom - window.innerHeight
    );
  }
  Je.prototype.scrollIntoView = function(t) {
    if (typeof t == "object") throw Error(s(566));
    var e = [];
    v(
      this._fragmentFiber.child,
      !1,
      Br,
      e,
      void 0,
      void 0
    );
    var l = t !== !1;
    if (e.length === 0) {
      var a = V(
        this._fragmentFiber
      );
      if (a = l ? a[1] || a[0] || A(this._fragmentFiber) : a[0] || a[1], a === null) return;
      if (a.tag === 6) {
        t = $(a), oh(t, l);
        return;
      }
      if (a = $(a), a.nodeType !== 9) {
        if (a.nodeType === 11) {
          l = "host" in a ? a.host : null, l !== null && l.scrollIntoView(t);
          return;
        }
        a.scrollIntoView(t);
      }
    }
    for (a = l ? e.length - 1 : 0; a !== (l ? -1 : e.length); ) {
      var n = e[a];
      n.tag === 6 ? (n = $(n), oh(n, l)) : $(n).scrollIntoView(t), a += l ? -1 : 1;
    }
  };
  function Vg(t, e) {
    return t = $(t), dh(t, e), !1;
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
          Un(n.optionsOrUseCapture)
        );
      }
    t.nodeType !== 3 && (l = e._observers, l !== null && l.forEach(function(u) {
      for (var i = 0, f = 0; f < ol.length; f++) {
        var h = ol[f];
        (h.fragmentInstance !== e || h.observer !== u || h.instance !== t) && (ol[i++] = h);
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
          Un(n.optionsOrUseCapture)
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
  function Lr(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var l = e;
      switch (e = e.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Lr(l), Iu(l);
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
      if (t = al(t.nextSibling), t === null) break;
    }
    return null;
  }
  function Kg(t, e, l) {
    if (e === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l || (t = al(t.nextSibling), t === null)) return null;
    return t;
  }
  function hh(t, e) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = al(t.nextSibling), t === null)) return null;
    return t;
  }
  function Yr(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function qr(t) {
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
  function al(t) {
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
  var Gr = null;
  function vh(t) {
    t = t.nextSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var l = t.data;
        if (l === "/$" || l === "/&") {
          if (e === 0)
            return al(t.nextSibling);
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
  function Fg(t) {
    lh(function() {
      lh(function(e) {
        return t(e);
      });
    });
  }
  function yh(t, e, l) {
    switch (e = Au(l), t) {
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
      l.hasOwnProperty(a) && n != null && Gt(t, e, a, null, Ng, n);
    }
    l.dangerouslySetInnerHTML != null && (t.textContent = ""), t.onclick === hl && (t.onclick = null), Iu(t);
  }
  function Xr(t) {
    for (var e = t.attributes; e.length; )
      t.removeAttributeNode(e[0]);
    Iu(t);
  }
  var nl = /* @__PURE__ */ new Map(), ph = /* @__PURE__ */ new Set();
  function ju(t) {
    if (typeof t.getRootNode == "function") {
      var e = t.getRootNode();
      if (e.nodeType === 9 || e.nodeType === 11) return e;
    }
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  var Gl = nt.d;
  nt.d = {
    f: kg,
    r: Wg,
    D: Ig,
    C: Pg,
    L: ty,
    m: ey,
    X: ay,
    S: ly,
    M: ny
  };
  function kg() {
    var t = Gl.f(), e = ec();
    return t || e;
  }
  function Wg(t) {
    var e = Pa(t);
    e !== null && e.tag === 5 && e.type === "form" ? _d(e) : Gl.r(t);
  }
  var Bn = typeof document > "u" ? null : document;
  function Sh(t, e, l) {
    var a = Bn;
    if (a && typeof e == "string" && e) {
      var n = ke(e);
      n = 'link[rel="' + t + '"][href="' + n + '"]', typeof l == "string" && (n += '[crossorigin="' + l + '"]'), ph.has(n) || (ph.add(n), t = { rel: t, crossOrigin: l, href: e }, a.querySelector(n) === null && (e = a.createElement("link"), _e(e, "link", t), de(e), a.head.appendChild(e)));
    }
  }
  function Ig(t) {
    Gl.D(t), Sh("dns-prefetch", t, null);
  }
  function Pg(t, e) {
    Gl.C(t, e), Sh("preconnect", t, e);
  }
  function ty(t, e, l) {
    Gl.L(t, e, l);
    var a = Bn;
    if (a && t && e) {
      var n = 'link[rel="preload"][as="' + ke(e) + '"]';
      e === "image" && l && l.imageSrcSet ? (n += '[imagesrcset="' + ke(
        l.imageSrcSet
      ) + '"]', typeof l.imageSizes == "string" && (n += '[imagesizes="' + ke(
        l.imageSizes
      ) + '"]')) : n += '[href="' + ke(t) + '"]';
      var u = n;
      switch (e) {
        case "style":
          u = Hn(t);
          break;
        case "script":
          u = Ln(t);
      }
      if (!(nl.has(u) || (t = Z(
        {
          rel: "preload",
          href: e === "image" && l && l.imageSrcSet ? void 0 : t,
          as: e
        },
        l
      ), nl.set(u, t), a.querySelector(n) !== null || e === "style" && a.querySelector(Ru(u)) || e === "script" && a.querySelector(Du(u))))) {
        var i = a.createElement("link");
        _e(i, "link", t), e === "style" && (i[Wu] = !0, i.onload = i.onerror = function() {
          Rf(i);
        }), de(i), a.head.appendChild(i);
      }
    }
  }
  function ey(t, e) {
    Gl.m(t, e);
    var l = Bn;
    if (l && t) {
      var a = e && typeof e.as == "string" ? e.as : "script", n = 'link[rel="modulepreload"][as="' + ke(a) + '"][href="' + ke(t) + '"]', u = n;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = Ln(t);
      }
      if (!nl.has(u) && (t = Z({ rel: "modulepreload", href: t }, e), nl.set(u, t), l.querySelector(n) === null)) {
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
        a = l.createElement("link"), _e(a, "link", t), de(a), l.head.appendChild(a);
      }
    }
  }
  function ly(t, e, l) {
    Gl.S(t, e, l);
    var a = Bn;
    if (a && t) {
      var n = tn(a).hoistableStyles, u = Hn(t);
      e = e || "default";
      var i = n.get(u);
      if (!i) {
        var f = { loading: 0, preload: null };
        if (i = a.querySelector(
          Ru(u)
        ))
          f.loading = 5;
        else {
          t = Z(
            { rel: "stylesheet", href: t, "data-precedence": e },
            l
          ), (l = nl.get(u)) && Vr(t, l);
          var h = i = a.createElement("link");
          de(h), _e(h, "link", t), h._p = new Promise(function(T, z) {
            h.onload = T, h.onerror = z;
          }), h.addEventListener("load", function() {
            f.loading |= 1;
          }), h.addEventListener("error", function() {
            f.loading |= 2;
          }), f.loading |= 4, sc(i, e, a);
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
    Gl.X(t, e);
    var l = Bn;
    if (l && t) {
      var a = tn(l).hoistableScripts, n = Ln(t), u = a.get(n);
      u || (u = l.querySelector(Du(n)), u || (t = Z({ src: t, async: !0 }, e), (e = nl.get(n)) && Qr(t, e), u = l.createElement("script"), de(u), _e(u, "link", t), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function ny(t, e) {
    Gl.M(t, e);
    var l = Bn;
    if (l && t) {
      var a = tn(l).hoistableScripts, n = Ln(t), u = a.get(n);
      u || (u = l.querySelector(Du(n)), u || (t = Z({ src: t, async: !0, type: "module" }, e), (e = nl.get(n)) && Qr(t, e), u = l.createElement("script"), de(u), _e(u, "link", t), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function _h(t, e, l, a) {
    var n = (n = jt.current) ? ju(n) : null;
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
          )) ? u._p || (i.instance = u, i.state.loading = 5) : (u = nl.get(t), u || (u = {
            rel: "preload",
            as: "style",
            href: l.href,
            crossOrigin: l.crossOrigin,
            integrity: l.integrity,
            media: l.media,
            hrefLang: l.hrefLang,
            referrerPolicy: l.referrerPolicy
          }, nl.set(t, u)), uy(
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
    return 'href="' + ke(t) + '"';
  }
  function Ru(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function Eh(t) {
    return Z({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function uy(t, e, l, a) {
    if (e = t.querySelector(
      'link[rel="preload"][as="style"][' + e + "]"
    )) {
      if (e[Wu] !== !0) {
        a.loading = 1;
        return;
      }
    } else
      e = t.createElement("link"), e[Wu] = !0, e.onload = e.onerror = Rf.bind(null, e), _e(e, "link", l), de(e), t.head.appendChild(e);
    a.preload = e, e.addEventListener("load", function() {
      return a.loading |= 1;
    }), e.addEventListener("error", function() {
      return a.loading |= 2;
    });
  }
  function Ln(t) {
    return '[src="' + ke(t) + '"]';
  }
  function Du(t) {
    return "script[async]" + t;
  }
  function Th(t, e, l) {
    if (e.count++, e.instance === null)
      switch (e.type) {
        case "style":
          var a = t.querySelector(
            'style[data-href~="' + ke(l.href) + '"]'
          );
          if (a)
            return e.instance = a, de(a), a;
          var n = Z({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          return a = (t.ownerDocument || t).createElement(
            "style"
          ), de(a), _e(a, "style", n), sc(a, l.precedence, t), e.instance = a;
        case "stylesheet":
          n = Hn(l.href);
          var u = t.querySelector(
            Ru(n)
          );
          if (u)
            return e.state.loading |= 4, e.instance = u, de(u), u;
          a = Eh(l), (n = nl.get(n)) && Vr(a, n), u = (t.ownerDocument || t).createElement("link"), de(u);
          var i = u;
          return i._p = new Promise(function(f, h) {
            i.onload = f, i.onerror = h;
          }), _e(u, "link", a), e.state.loading |= 4, sc(u, l.precedence, t), e.instance = u;
        case "script":
          return u = Ln(l.src), (n = t.querySelector(
            Du(u)
          )) ? (e.instance = n, de(n), n) : (a = l, (n = nl.get(u)) && (a = Z({}, l), Qr(a, n)), t = t.ownerDocument || t, n = t.createElement("script"), de(n), _e(n, "link", a), t.head.appendChild(n), e.instance = n);
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
      var f = a[i];
      if (f.dataset.precedence === e) u = f;
      else if (u !== n) break;
    }
    u ? u.parentNode.insertBefore(t, u.nextSibling) : (e = l.nodeType === 9 ? l.head : l, e.insertBefore(t, e.firstChild));
  }
  function Vr(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.title == null && (t.title = e.title);
  }
  function Qr(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.integrity == null && (t.integrity = e.integrity);
  }
  var rc = null;
  function Nh(t, e, l) {
    if (rc === null) {
      var a = /* @__PURE__ */ new Map(), n = rc = /* @__PURE__ */ new Map();
      n.set(l, a);
    } else
      n = rc, a = n.get(l), a || (a = /* @__PURE__ */ new Map(), n.set(l, a));
    if (a.has(t)) return a;
    for (a.set(t, null), l = l.getElementsByTagName(t), n = 0; n < l.length; n++) {
      var u = l[n];
      if (!(u[$n] || u[ge] || t === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var i = u.getAttribute(e) || "";
        i = t + i;
        var f = a.get(i);
        f ? f.push(u) : a.set(i, [u]);
      }
    }
    return a;
  }
  function Zr(t, e, l) {
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
        var n = Hn(a.href), u = e.querySelector(
          Ru(n)
        );
        if (u) {
          e = u._p, e !== null && typeof e == "object" && typeof e.then == "function" && (t.count++, t = wu.bind(t), e.then(t, t)), l.state.loading |= 4, l.instance = u, de(u);
          return;
        }
        u = e.ownerDocument || e, a = Eh(a), (n = nl.get(n)) && Vr(a, n), u = u.createElement("link"), de(u);
        var i = u;
        i._p = new Promise(function(f, h) {
          i.onload = f, i.onerror = h;
        }), _e(u, "link", a), l.instance = u;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(l, e), (e = l.state.preload) && (l.state.loading & 3) === 0 && (t.count++, l = wu.bind(t), e.addEventListener("load", l), e.addEventListener("error", l));
    }
  }
  var fc = 0;
  function sy(t, e) {
    return t.stylesheets && t.count === 0 && dc(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(l) {
      var a = setTimeout(function() {
        if (t.stylesheets && dc(t, t.stylesheets), t.unsuspend) {
          var u = t.unsuspend;
          t.unsuspend = null, u();
        }
      }, 6e4 + e);
      0 < t.imgBytes && fc === 0 && (fc = 62500 * Mg());
      var n = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && dc(t, t.stylesheets), t.unsuspend)) {
            var u = t.unsuspend;
            t.unsuspend = null, u();
          }
        },
        (t.imgBytes > fc ? 50 : 800) + e
      );
      return t.unsuspend = l, function() {
        t.unsuspend = null, clearTimeout(a), clearTimeout(n);
      };
    } : null;
  }
  function Ch(t) {
    if (t.count === 0 && (t.imgCount === 0 || !t.waitingForImages)) {
      if (t.stylesheets) dc(t, t.stylesheets);
      else if (t.unsuspend) {
        var e = t.unsuspend;
        t.unsuspend = null, e();
      }
    }
  }
  function wu() {
    this.count--, Ch(this);
  }
  function ry() {
    this.imgCount--, Ch(this);
  }
  var oc = null;
  function dc(t, e) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, oc = /* @__PURE__ */ new Map(), e.forEach(fy, t), oc = null, wu.call(t));
  }
  function fy(t, e) {
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
      n = e.instance, i = n.getAttribute("data-precedence"), u = l.get(i) || a, u === a && l.set(null, n), l.set(i, n), this.count++, a = wu.bind(this), n.addEventListener("load", a), n.addEventListener("error", a), u ? u.parentNode.insertBefore(n, u.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(n, t.firstChild)), e.state.loading |= 4;
    }
  }
  var Yn = {
    $$typeof: yt,
    Provider: null,
    Consumer: null,
    _currentValue: Vt,
    _currentValue2: Vt,
    _threadCount: 0
  };
  function oy(t, e, l, a, n, u, i, f, h) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = xc(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = xc(0), this.hiddenUpdates = xc(null), this.identifierPrefix = a, this.onUncaughtError = n, this.onCaughtError = u, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = h, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Ah(t, e, l, a, n, u, i, f, h, T, z, w) {
    return t = new oy(
      t,
      e,
      l,
      i,
      h,
      T,
      z,
      w,
      f
    ), e = 1, u === !0 && (e |= 24), u = De(3, null, null, e), t.current = u, u.stateNode = t, e = is(), e.refCount++, t.pooledCache = e, e.refCount++, u.memoizedState = {
      element: a,
      isDehydrated: l,
      cache: e
    }, fs(u), t;
  }
  function jh(t) {
    return t ? (t = on, t) : on;
  }
  function Rh(t, e, l, a, n, u) {
    n = jh(n), a.context === null ? a.context = n : a.pendingContext = n, a = ta(e), a.payload = { element: l }, u = u === void 0 ? null : u, u !== null && (a.callback = u), l = ea(t, a, e), l !== null && (He(l, t, e), ou(l, t, e));
  }
  function Dh(t, e) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var l = t.retryLane;
      t.retryLane = l !== 0 && l < e ? l : e;
    }
  }
  function Kr(t, e) {
    Dh(t, e), (t = t.alternate) && Dh(t, e);
  }
  function wh(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Oa(t, 67108864);
      e !== null && He(e, t, 67108864), Kr(t, 67108864);
    }
  }
  function Uh(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Ke();
      e = Mc(e);
      var l = Oa(t, e);
      l !== null && He(l, t, e), Kr(t, e);
    }
  }
  var qn = !0;
  function dy(t, e, l, a) {
    var n = tt.T;
    tt.T = null;
    var u = nt.p;
    try {
      nt.p = 2, Jr(t, e, l, a);
    } finally {
      nt.p = u, tt.T = n;
    }
  }
  function my(t, e, l, a) {
    var n = tt.T;
    tt.T = null;
    var u = nt.p;
    try {
      nt.p = 8, Jr(t, e, l, a);
    } finally {
      nt.p = u, tt.T = n;
    }
  }
  function Jr(t, e, l, a) {
    if (qn) {
      var n = $r(a);
      if (n === null)
        zr(
          t,
          e,
          a,
          mc,
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
          var u = Pa(n);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var i = Ea(u.pendingLanes);
                  if (i !== 0) {
                    var f = u;
                    for (f.pendingLanes |= 2, f.entangledLanes |= 2; i; ) {
                      var h = 1 << 31 - Ye(i);
                      f.entanglements[1] |= h, i &= ~h;
                    }
                    Nl(u), (Bt & 6) === 0 && (Ii = Pt() + 500, Ou(0));
                  }
                }
                break;
              case 31:
              case 13:
                f = Oa(u, 2), f !== null && He(f, u, 2), ec(), Kr(u, 2);
            }
          if (u = $r(a), u === null && zr(
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
        zr(
          t,
          e,
          a,
          null,
          l
        );
    }
  }
  function $r(t) {
    return t = Dc(t), Fr(t);
  }
  var mc = null;
  function Fr(t) {
    if (mc = null, t = Ta(t), t !== null) {
      var e = m(t);
      if (e === null) t = null;
      else {
        var l = e.tag;
        if (l === 13) {
          if (t = p(e), t !== null) return t;
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
        switch (_a()) {
          case Wa:
            return 2;
          case _f:
            return 8;
          case Ku:
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
  var kr = !1, ma = null, ha = null, va = null, Uu = /* @__PURE__ */ new Map(), Bu = /* @__PURE__ */ new Map(), ga = [], hy = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
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
        Uu.delete(e.pointerId);
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
    }, e !== null && (e = Pa(e), e !== null && wh(e)), t) : (t.eventSystemFlags |= a, e = t.targetContainers, n !== null && e.indexOf(n) === -1 && e.push(n), t);
  }
  function vy(t, e, l, a, n) {
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
        return Uu.set(
          u,
          Hu(
            Uu.get(u) || null,
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
    var e = Ta(t.target);
    if (e !== null) {
      var l = m(e);
      if (l !== null) {
        if (e = l.tag, e === 13) {
          if (e = p(l), e !== null) {
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
  function hc(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var l = $r(t.nativeEvent);
      if (l === null) {
        l = t.nativeEvent;
        var a = new l.constructor(
          l.type,
          l
        );
        Rc = a, l.target.dispatchEvent(a), Rc = null;
      } else
        return e = Pa(l), e !== null && wh(e), t.blockedOn = l, !1;
      e.shift();
    }
    return !0;
  }
  function Yh(t, e, l) {
    hc(t) && l.delete(e);
  }
  function gy() {
    kr = !1, ma !== null && hc(ma) && (ma = null), ha !== null && hc(ha) && (ha = null), va !== null && hc(va) && (va = null), Uu.forEach(Yh), Bu.forEach(Yh);
  }
  function vc(t, e) {
    t.blockedOn === e && (t.blockedOn = null, kr || (kr = !0, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      gy
    )));
  }
  var gc = null;
  function qh(t) {
    gc !== t && (gc = t, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      function() {
        gc === t && (gc = null);
        for (var e = 0; e < t.length; e += 3) {
          var l = t[e], a = t[e + 1], n = t[e + 2];
          if (typeof a != "function") {
            if (Fr(a || l) === null)
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
    function e(h) {
      return vc(h, t);
    }
    ma !== null && vc(ma, t), ha !== null && vc(ha, t), va !== null && vc(va, t), Uu.forEach(e), Bu.forEach(e);
    for (var l = 0; l < ga.length; l++) {
      var a = ga[l];
      a.blockedOn === t && (a.blockedOn = null);
    }
    for (; 0 < ga.length && (l = ga[0], l.blockedOn === null); )
      Lh(l), l.blockedOn === null && ga.shift();
    if (l = (t.ownerDocument || t).$$reactFormReplay, l != null)
      for (a = 0; a < l.length; a += 3) {
        var n = l[a], u = l[a + 1], i = n[Re] || null;
        if (typeof u == "function")
          i || qh(l);
        else if (i) {
          var f = null;
          if (u && u.hasAttribute("formAction")) {
            if (n = u, i = u[Re] || null)
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
  function Wr(t) {
    this._internalRoot = t;
  }
  yc.prototype.render = Wr.prototype.render = function(t) {
    var e = this._internalRoot;
    if (e === null) throw Error(s(409));
    var l = e.current, a = Ke();
    Rh(l, a, t, e, null, null);
  }, yc.prototype.unmount = Wr.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var e = t.containerInfo;
      Rh(t.current, 2, null, t, null, null), ec(), e[Ia] = null;
    }
  };
  function yc(t) {
    this._internalRoot = t;
  }
  yc.prototype.unstable_scheduleHydration = function(t) {
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
  nt.findDOMNode = function(t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function" ? Error(s(188)) : (t = Object.keys(t).join(","), Error(s(268, t)));
    return t = j(e), t = t !== null ? N(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var yy = {
    bundleType: 0,
    version: "19.3.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: tt,
    reconcilerVersion: "19.3.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var bc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!bc.isDisabled && bc.supportsFiber)
      try {
        Zn = bc.inject(
          yy
        ), Le = bc;
      } catch {
      }
  }
  return Yu.createRoot = function(t, e) {
    if (!g(t)) throw Error(s(299));
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
    ), t[Ia] = e.current, Or(t), new Wr(e);
  }, Yu.hydrateRoot = function(t, e, l) {
    if (!g(t)) throw Error(s(299));
    var a = !1, n = "", u = jd, i = Rd, f = Dd, h = null;
    return l != null && (l.unstable_strictMode === !0 && (a = !0), l.identifierPrefix !== void 0 && (n = l.identifierPrefix), l.onUncaughtError !== void 0 && (u = l.onUncaughtError), l.onCaughtError !== void 0 && (i = l.onCaughtError), l.onRecoverableError !== void 0 && (f = l.onRecoverableError), l.formState !== void 0 && (h = l.formState)), e = Ah(
      t,
      1,
      !0,
      e,
      l ?? null,
      a,
      n,
      h,
      u,
      i,
      f,
      Gh
    ), e.context = jh(null), l = e.current, a = Ke(), a = Mc(a), n = ta(a), n.callback = null, ea(l, n, a), l = a, e.current.lanes = l, Jn(e, l), Nl(e), t[Ia] = e.current, Or(t), new yc(e);
  }, Yu.version = "19.3.0", Yu;
}
var Ih;
function Oy() {
  if (Ih) return tf.exports;
  Ih = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (o) {
        console.error(o);
      }
  }
  return c(), tf.exports = My(), tf.exports;
}
var zy = Oy();
const r0 = 128, f0 = 640;
function Gu(c, o = 144) {
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
  return Gu(c * Math.exp(-Math.max(-240, Math.min(240, o)) * 2e-3));
}
function Ph(c, o, r) {
  return Math.max(0, c * o - r);
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
function Ry(c, o = 0) {
  const r = /* @__PURE__ */ new Set();
  return c.filter((s) => {
    try {
      const g = Ja(s);
      return r.has(s.id) || o > 0 && g.end > o + 0.02 ? !1 : (r.add(s.id), !0);
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
  async play(o, r, s, g = "same-origin") {
    const m = Ja(o);
    this.pause();
    const p = this.generation;
    this.context ??= this.createContext();
    const _ = this.context, C = _.resume();
    C.catch(() => {
    });
    const j = o.audioSrc || r, N = JSON.stringify([j, o.startSample, o.endSample, o.sampleRate]);
    try {
      let v = this.cache?.url === N ? this.cache.buffer : null;
      if (!v) {
        const $ = new AbortController();
        this.abort = $;
        const vt = await fetch(j, { signal: $.signal, credentials: g });
        if (!vt.ok) throw new Error(`Could not load loop audio (HTTP ${vt.status})`);
        const X = 128 * 1024 * 1024;
        if (Number(vt.headers.get("Content-Length")) > X) throw new Error("Loop audio exceeds 128 MiB");
        const W = await vt.arrayBuffer();
        if (W.byteLength > X) throw new Error("Loop audio exceeds 128 MiB");
        if (v = await _.decodeAudioData(W), p !== this.generation) return !1;
        this.cache = { url: N, buffer: v };
      }
      if (await C, p !== this.generation) return !1;
      const A = o.audioSrc ? 0 : m.start, H = A + m.duration, V = Math.max(2 / v.sampleRate, 2e-3);
      if (!Number.isFinite(v.duration) || v.duration <= A || H > v.duration + V || o.audioSrc && Math.abs(v.duration - m.duration) > V)
        throw new Error("Loop audio duration does not match the reported sample boundaries");
      const at = _.createBufferSource();
      return at.buffer = v, at.loop = !0, at.loopStart = A, at.loopEnd = Math.min(H, v.duration), at.connect(_.destination), this.start = m.start, this.length = at.loopEnd - A, this.offset = d0(s, m.start, m.start + this.length) - m.start, this.anchor = _.currentTime, at.start(this.anchor, A + this.offset), this.node = at, !0;
    } catch (v) {
      if (p !== this.generation) return !1;
      throw v;
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
function ba(c, o, r) {
  return Math.min(r, Math.max(o, c));
}
function pa(c) {
  const o = Math.max(0, Number(c) || 0), r = Math.floor(o / 60), s = Math.floor(o % 60), g = Math.floor((o - Math.floor(o)) * 1e3);
  return `${String(r).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(g).padStart(3, "0")}`;
}
function m0(c) {
  const o = [0.1, 0.25, 0.5, 1, 2, 5, 10, 15, 30, 60, 120, 300, 600];
  return o.find((r) => r * c >= 70) ?? o[o.length - 1];
}
function wy(c, o, r, s, g) {
  if (g <= 0 || s <= 0) return { start: 0, end: 0 };
  const m = Math.max(0, c - r), p = Math.max(0, c + o - r), _ = ba(m / s, 0, g), C = ba(p / s, _, g);
  return { start: _, end: C };
}
function t0(c, o) {
  if (typeof c != "number" || !Number.isFinite(c)) throw new RangeError(`${o} must be finite`);
  return c;
}
function Uy(c, o) {
  const r = o * c.source_audio.sample_rate, s = c.beats;
  let g = 0, m = s.length;
  for (; g < m; ) {
    const p = g + m >>> 1;
    s[p].frame <= r ? g = p + 1 : m = p;
  }
  return Math.max(0, Math.min(s.length - 2, g - 1));
}
function h0(c, o, r = 0.15) {
  if (t0(o, "source seconds"), t0(r, "tolerance") < 0 || r > 60) throw new RangeError("Invalid snap tolerance");
  let s, g;
  if (c.mode === "fixed")
    s = Math.round((o - c.firstBeatSeconds) * c.bpm / 60), g = c.firstBeatSeconds + s * 60 / c.bpm;
  else {
    const p = c.beats, _ = c.source_audio.sample_rate, C = Uy(c, o), j = [p[C], p[C + 1]].reduce((N, v) => Math.abs(N.frame / _ - o) <= Math.abs(v.frame / _ - o) ? N : v);
    s = j.beat - c.origin_beat, g = j.frame / _;
  }
  const m = o - g;
  return {
    beat: s,
    time: g,
    errorSeconds: m,
    errorMilliseconds: m * 1e3,
    withinTolerance: Math.abs(m) <= r,
    mode: c.mode
  };
}
function By(c, o, r, s = 2e3) {
  if (!(Number.isFinite(o) && Number.isFinite(r) && r > o)) return [];
  const g = Math.max(1, Math.min(2e3, Math.floor(s)));
  if (c.mode === "variable") {
    const N = c.beats.filter((A) => A.frame / c.source_audio.sample_rate >= o && A.frame / c.source_audio.sample_rate <= r), v = Math.max(1, Math.ceil(N.length / g));
    return N.filter((A, H) => H % v === 0).map((A) => ({
      time: A.frame / c.source_audio.sample_rate,
      label: `Observed beat ${A.beat}`,
      emphasis: A.beat === c.origin_beat
    }));
  }
  const m = Math.max(Math.ceil((o - c.firstBeatSeconds) * c.bpm / 60), Math.ceil(-c.firstBeatSeconds * c.bpm / 60)), p = Math.floor((r - c.firstBeatSeconds) * c.bpm / 60), _ = Math.max(0, p - m + 1), C = Math.max(1, Math.ceil(_ / g)), j = [];
  for (let N = m; N <= p && j.length < g; N += C) j.push({
    time: c.firstBeatSeconds + N * 60 / c.bpm,
    label: `Fixed-BPM grid beat ${N} (not detected)`,
    emphasis: N === 0
  });
  return j;
}
function e0(c, o, r, s) {
  if (!Number.isFinite(r) || !Number.isFinite(s.duration) || s.duration <= 0) throw new RangeError("Invalid timing edit timebase");
  const g = Math.max(0, s.bounds?.start ?? 0, s.previousEnd ?? 0), m = Math.min(s.duration, s.bounds?.end ?? s.duration, s.nextStart ?? s.duration);
  if (m < g) throw new RangeError("No space between neighbouring timing items");
  const p = s.minimumDuration ?? 0;
  if (p < 0) throw new RangeError("minimumDuration must be nonnegative");
  let _ = Math.min(m, Math.max(g, r));
  if (s.snap && s.clock) {
    const N = h0(s.clock, _, s.toleranceSeconds ?? 0.15);
    N.withinTolerance && (_ = Math.min(m, Math.max(g, N.time)));
  }
  const C = c.end !== void 0 && Number.isFinite(c.end), j = C ? Number(c.end) - c.start : 0;
  if (o === "move") {
    const N = Math.max(g, Math.min(Math.max(g, m - j), _));
    return C ? { ...c, start: N, end: N + j } : { ...c, start: N };
  }
  if (o === "start") {
    const N = C ? c.end - p : m;
    if (N < g) throw new RangeError("No valid start fits within the parent bounds");
    return { ...c, start: Math.min(_, N) };
  }
  if (!C) throw new RangeError("This event has no editable end");
  if (c.start + p > m) throw new RangeError("No valid end fits inside the parent bounds");
  return { ...c, end: Math.max(c.start + p, _) };
}
function l0(c, o, r) {
  const s = c.parentId ? r.parents?.find((_) => _.id === c.parentId) : null, g = o.filter((_) => _.id !== c.id && (_.parentId ?? "") === (c.parentId ?? "")).sort((_, C) => _.start - C.start), m = g.filter((_) => _.start <= c.start).slice(-1)[0], p = g.find((_) => _.start > c.start);
  return {
    duration: r.duration,
    bounds: s ? { start: s.start, end: s.end } : void 0,
    previousEnd: m ? m.end ?? m.start : void 0,
    nextStart: p?.start,
    clock: r.clock,
    snap: r.snap,
    toleranceSeconds: r.toleranceSeconds,
    minimumDuration: 1e-3
  };
}
function Hy(c) {
  const { items: o, kind: r, duration: s, clock: g, selectedId: m, onSelect: p, onEdit: _ } = c, C = c.editable === !0 && typeof _ == "function", [j, N] = U.useState(null), v = U.useRef(null), A = U.useRef(null), H = (X) => `${Math.max(0, Math.min(100, X * 100 / Math.max(s, 1e-9)))}%`;
  function V(X, W, Tt) {
    if (!C || X.button !== 0) return;
    const St = X.currentTarget.closest(".rts-track");
    if (!St) return;
    const gt = St.getBoundingClientRect().width;
    !Number.isFinite(gt) || gt <= 0 || (v.current = { id: W.id, edge: Tt, x: X.clientX, origin: W, width: gt }, A.current = W, X.currentTarget.setPointerCapture(X.pointerId), X.stopPropagation(), X.preventDefault(), p?.(W.id));
  }
  function at(X) {
    const W = v.current;
    if (!W || !C) return;
    const Tt = (W.edge === "end" ? W.origin.end ?? W.origin.start : W.origin.start) + (X.clientX - W.x) * s / W.width;
    try {
      A.current = e0(W.origin, W.edge, Tt, l0(W.origin, o, c)), N(A.current);
    } catch {
    }
    X.stopPropagation();
  }
  function $(X, W = !1) {
    const Tt = v.current;
    Tt && (v.current = null, !W && A.current && _ && (A.current.start !== Tt.origin.start || A.current.end !== Tt.origin.end) && _(A.current), A.current = null, N(null), X.stopPropagation());
  }
  function vt(X, W, Tt) {
    if (!C || X.key !== "ArrowLeft" && X.key !== "ArrowRight") return;
    X.preventDefault(), X.stopPropagation();
    const St = (X.key === "ArrowRight" ? 1 : -1) * (X.shiftKey ? 1e-3 : 0.01), gt = Tt === "end" ? W.end ?? W.start : W.start;
    try {
      _?.(e0(W, Tt, gt + St, l0(W, o, c)));
    } catch {
    }
  }
  return /* @__PURE__ */ d.jsx("div", { className: `rts-editable-timing rts-timing-${r}`, role: "group", "aria-label": `${r} timings`, children: o.filter((X) => Number.isFinite(X.start) && X.start >= 0 && X.start <= s).map((X) => {
    const W = j?.id === X.id ? j : X, Tt = W.end !== void 0 ? Math.max(0.1, (W.end - W.start) * 100 / s) : 0.12, St = g ? h0(g, W.start, c.toleranceSeconds ?? 0.15) : null, gt = `${X.label} at ${pa(W.start)}${St ? `, ${St.withinTolerance ? "near" : "off"} ${St.mode} beat ${St.beat}, signed gap ${St.errorMilliseconds.toFixed(1)} ms` : ""}`;
    return /* @__PURE__ */ d.jsxs(
      "div",
      {
        className: `rts-timing-region ${m === X.id ? "is-selected" : ""} ${X.className ?? ""}`,
        style: { left: H(W.start), width: `${Tt}%` },
        children: [
          /* @__PURE__ */ d.jsx(
            "button",
            {
              type: "button",
              className: `rts-timing-handle rts-timing-main ${St?.withinTolerance ? "is-matched" : ""}`,
              "aria-label": `Move ${gt}`,
              title: gt,
              "aria-pressed": m === X.id,
              onClick: (Z) => {
                Z.stopPropagation(), p?.(X.id);
              },
              onPointerDown: (Z) => V(Z, X, "move"),
              onPointerMove: at,
              onPointerUp: $,
              onPointerCancel: (Z) => $(Z, !0),
              onKeyDown: (Z) => vt(Z, X, "move"),
              children: X.label
            }
          ),
          C && W.end !== void 0 && /* @__PURE__ */ d.jsx(
            "button",
            {
              type: "button",
              className: "rts-timing-end",
              "aria-label": `Resize end of ${X.label}`,
              title: "Resize end · arrows: 10 ms, Shift: 1 ms",
              onPointerDown: (Z) => V(Z, X, "end"),
              onPointerMove: at,
              onPointerUp: $,
              onPointerCancel: (Z) => $(Z, !0),
              onKeyDown: (Z) => vt(Z, X, "end")
            }
          ),
          C && W.end !== void 0 && /* @__PURE__ */ d.jsx(
            "button",
            {
              type: "button",
              className: "rts-timing-start",
              "aria-label": `Resize start of ${X.label}`,
              title: "Resize start · arrows: 10 ms, Shift: 1 ms",
              onPointerDown: (Z) => V(Z, X, "start"),
              onPointerMove: at,
              onPointerUp: $,
              onPointerCancel: (Z) => $(Z, !0),
              onKeyDown: (Z) => vt(Z, X, "start")
            }
          )
        ]
      },
      X.id
    );
  }) });
}
function sf(c, o) {
  return `${ba(c / Math.max(o, 1e-9), 0, 1) * 100}%`;
}
function v0(c, o, r, s = 0.08) {
  const g = Number.isFinite(o) && Number(o) > c ? Number(o) : c + 0.5;
  return `${Math.max(s, (g - c) / Math.max(r, 1e-9) * 100)}%`;
}
function Ly({ min: c, max: o, colour: r = "#79c0ff" }) {
  const s = U.useRef(null);
  return U.useEffect(() => {
    const g = s.current;
    if (!g) return;
    const m = Math.max(1, Math.min(c.length, o.length));
    g.width = m, g.height = 180;
    const p = g.getContext("2d");
    if (!p) return;
    p.clearRect(0, 0, m, g.height), p.strokeStyle = r, p.lineWidth = 1, p.beginPath();
    const _ = g.height / 2, C = g.height * 0.46;
    for (let j = 0; j < m; j += 1) {
      const N = j + 0.5;
      p.moveTo(N, _ - (Number(o[j]) || 0) * C), p.lineTo(N, _ - (Number(c[j]) || 0) * C);
    }
    p.stroke();
  }, [r, o, c]), /* @__PURE__ */ d.jsx("canvas", { ref: s, className: "rts-waveform", "aria-hidden": "true" });
}
function Yy({ rows: c }) {
  const o = U.useRef(null);
  return U.useEffect(() => {
    const r = o.current, s = c.filter((_) => _.length > 0);
    if (!r || !s.length) return;
    const g = Math.max(...s.map((_) => _.length));
    r.width = Math.min(4096, s.length), r.height = Math.min(256, g);
    const m = r.getContext("2d");
    if (!m) return;
    const p = m.createImageData(r.width, r.height);
    for (let _ = 0; _ < r.width; _ += 1) {
      const C = Math.min(s.length - 1, Math.floor(_ * s.length / r.width)), j = s[C], N = Math.max(1e-9, ...j.map((v) => Number(v) || 0));
      for (let v = 0; v < r.height; v += 1) {
        const A = Math.min(j.length - 1, Math.floor((r.height - 1 - v) * j.length / r.height)), H = ba((Number(j[A]) || 0) / N, 0, 1), V = (v * r.width + _) * 4;
        p.data[V] = Math.round(40 + 180 * H), p.data[V + 1] = Math.round(35 + 110 * H), p.data[V + 2] = Math.round(80 + 170 * H), p.data[V + 3] = 255;
      }
    }
    m.putImageData(p, 0, 0);
  }, [c]), /* @__PURE__ */ d.jsx("canvas", { ref: o, className: "rts-matrix", "aria-hidden": "true" });
}
function qy({ items: c, duration: o }) {
  const r = c.filter((m) => Number.isFinite(m.value) && m.value > 0);
  if (!r.length) return null;
  const s = Math.log2(Math.max(20, Math.min(...r.map((m) => m.value)))), g = Math.log2(Math.max(100, ...r.map((m) => m.value)));
  return r.map((m, p) => {
    const _ = (Math.log2(m.value) - s) / Math.max(0.01, g - s);
    return /* @__PURE__ */ d.jsx(
      "span",
      {
        className: `rts-note ${m.className ?? ""}`,
        style: { left: sf(m.start, o), width: v0(m.start, m.end ?? m.start + 0.12, o, 0.04), top: `${8 + (1 - _) * 72}px` },
        title: m.title ?? `${m.label ?? `${m.value.toFixed(1)} Hz`} · ${pa(m.start)}`
      },
      `${m.start}-${p}`
    );
  });
}
function rf({ content: c, duration: o }) {
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
          style: { left: sf(r.time, o) },
          title: r.label
        },
        `${r.time}-${s}`
      )) });
    case "blocks":
      return /* @__PURE__ */ d.jsx(d.Fragment, { children: c.items.map((r, s) => /* @__PURE__ */ d.jsx(
        "span",
        {
          className: `rts-block ${r.className ?? ""}`,
          style: { left: sf(r.start, o), width: v0(r.start, r.end, o) },
          title: r.title ?? `${r.label ?? ""} · ${pa(r.start)}${r.end ? ` — ${pa(r.end)}` : ""}`,
          children: r.label
        },
        `${r.start}-${s}`
      )) });
    case "notes":
      return /* @__PURE__ */ d.jsx(qy, { items: c.items, duration: o });
    case "curve": {
      const r = c.points.filter((_) => Number.isFinite(_.time) && Number.isFinite(_.value));
      if (!r.length) return null;
      const s = r.map((_) => _.value), g = Math.min(...s), m = Math.max(...s), p = r.map((_) => {
        const C = _.time / Math.max(o, 1e-9) * 2e3, j = 180 - (_.value - g) / Math.max(1e-9, m - g) * 168 - 6;
        return `${C.toFixed(2)},${j.toFixed(2)}`;
      }).join(" ");
      return /* @__PURE__ */ d.jsx("svg", { className: "rts-curve", viewBox: "0 0 2000 180", preserveAspectRatio: "none", "aria-hidden": "true", children: /* @__PURE__ */ d.jsx("polyline", { fill: "none", stroke: c.colour ?? "#7ee787", strokeWidth: "2", vectorEffect: "non-scaling-stroke", points: p }) });
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
    c.spectrogram && s !== "waveform" && /* @__PURE__ */ d.jsx("div", { className: "rts-audio-spectrum", children: /* @__PURE__ */ d.jsx(rf, { content: { type: "image", ...c.spectrogram }, duration: o }) }),
    c.waveform && s !== "spectrogram" && /* @__PURE__ */ d.jsx("div", { className: "rts-audio-envelope", children: /* @__PURE__ */ d.jsx(rf, { content: { type: "waveform", ...c.waveform, colour: s === "both" ? "#e6fff7" : c.waveform.colour }, duration: o }) }),
    !c.waveform && !c.spectrogram && /* @__PURE__ */ d.jsx("span", { className: "rts-meta", children: "Waiting for audio analysis" })
  ] });
}
function Xy(c, o, r, s, g = "same-origin") {
  const [m, p] = U.useState(0), [_, C] = U.useState(!1), [j, N] = U.useState(!1), [v, A] = U.useState(""), H = U.useRef(!1), V = U.useRef("media"), at = U.useRef(null), $ = U.useRef(0), vt = U.useRef({ audioSrc: o, activeLoop: r, onError: s, credentials: g });
  vt.current = { audioSrc: o, activeLoop: r, onError: s, credentials: g };
  const X = U.useCallback(() => V.current === "loop" ? at.current?.currentTime ?? 0 : c.current?.currentTime ?? 0, [c]), W = U.useCallback(() => {
    const F = X();
    return $.current += 1, H.current = !1, at.current?.pause(), c.current?.pause(), N(!1), C(!1), p(F), F;
  }, [c, X]), Tt = U.useCallback((F) => {
    W(), A(F instanceof Error ? F.message : String(F)), vt.current.onError?.(F);
  }, [W]), St = U.useCallback(async (F) => {
    W();
    const I = $.current;
    H.current = !0, N(!0), A("");
    const { activeLoop: _t, audioSrc: Xt, credentials: Wt } = vt.current;
    try {
      if (_t) {
        if (V.current = "loop", at.current ??= new Dy(), !await at.current.play(_t, Xt, F, Wt)) return;
      } else {
        V.current = "media";
        const yt = c.current;
        if (!yt) return;
        yt.currentTime = Math.max(0, F), await yt.play();
      }
      if (I !== $.current) return;
      p(X()), N(!1), C(!0);
    } catch (yt) {
      I === $.current && Tt(yt);
    }
  }, [c, Tt, W, X]), gt = U.useCallback((F) => {
    const I = vt.current.activeLoop;
    if (I) {
      const _t = Ja(I);
      F = d0(F, _t.start, _t.end);
    }
    H.current ? St(F) : (W(), V.current = "media", c.current && (c.current.currentTime = F), p(F));
  }, [c, W, St]), Z = U.useCallback(() => {
    if (H.current) {
      W();
      return;
    }
    let F = X();
    const I = vt.current.activeLoop;
    if (I) {
      const _t = Ja(I);
      (F < _t.start || F >= _t.end) && (F = _t.start);
    }
    St(F);
  }, [W, St, X]);
  U.useEffect(() => (W(), V.current = "media", p(0), A(""), at.current?.dispose(), at.current = null, () => {
    $.current += 1, H.current = !1, at.current?.dispose(), at.current = null, c.current?.pause();
  }), [o, c, W]);
  const mt = r ? JSON.stringify([r.id, r.startSample, r.endSample, r.sampleRate, r.audioSrc]) : "";
  U.useEffect(() => {
    const F = H.current;
    let I = W();
    const _t = vt.current.activeLoop;
    _t && (I = Ja(_t).start), V.current = "media", c.current && (c.current.currentTime = I), p(I), F && St(I);
  }, [mt, c, W, St]), U.useEffect(() => {
    if (!_) return;
    let F = 0;
    const I = () => {
      p(X()), F = requestAnimationFrame(I);
    };
    return F = requestAnimationFrame(I), () => cancelAnimationFrame(F);
  }, [_, X]);
  const Ft = U.useCallback(() => {
    V.current === "media" && W();
  }, [W]);
  return { time: m, playing: _, loading: j, error: v, toggle: Z, seek: gt, ended: Ft, fail: Tt };
}
function Vy(c, o) {
  if (c <= 0 || o <= 0) return [];
  const r = m0(o) / 5, s = [];
  for (let g = 0; g * r <= c + 1e-6; g += 1)
    s.push({
      time: g * r,
      major: g % 5 === 0
    });
  return s;
}
function Qy(c, o) {
  const r = Math.round(c * 1e3), s = Math.floor(r / 1e3), g = `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  return m0(o) < 1 ? `${g}.${String(r % 1e3).padStart(3, "0")}` : g;
}
function Zy({
  audioSrc: c,
  loops: o = [],
  onLoopSelect: r,
  onLoopEnabledChange: s,
  lanes: g,
  title: m = "Audio timeline",
  subtitle: p,
  duration: _ = 0,
  grid: C = [],
  beatClock: j = null,
  showBeatGrid: N = !1,
  headerEnd: v,
  footer: A,
  className: H = "",
  labelWidth: V = 230,
  initialZoom: at = 20,
  laneControls: $ = !1,
  wheelNavigation: vt = !1,
  followPlayheadByDefault: X = !0,
  preload: W = "metadata",
  crossOrigin: Tt,
  onDurationChange: St,
  onTimeChange: gt,
  onWindowChange: Z,
  onPlaybackError: mt
}) {
  const Ft = U.useRef(null), F = U.useRef(null), [I, _t] = U.useState(Math.max(0, _)), [Xt, Wt] = U.useState(null), [yt, B] = U.useState(!1), Y = U.useMemo(() => Ry(o, I), [o, I]), G = Y.find((R) => R.id === Xt) ?? null, it = Xy(
    Ft,
    c,
    yt ? G : null,
    mt,
    Tt === "use-credentials" ? "include" : "same-origin"
  ), ft = it.time, It = it.playing, Ht = G ? Ja(G) : null, Me = (R) => {
    Wt(R), r?.(Y.find((rt) => rt.id === R) ?? null);
  }, b = (R) => {
    B(R), s?.(R);
  };
  U.useEffect(() => {
    Xt && !Y.some((R) => R.id === Xt) && (Wt(null), B(!1), r?.(null), s?.(!1));
  }, [Xt, Y, r, s]), U.useEffect(() => {
    Wt(null), B(!1), _t(Math.max(0, _));
  }, [c]);
  const [L, P] = U.useState(X), [K, ht] = U.useState(at), [ot, ct] = U.useState({}), [tt, nt] = U.useState({}), Vt = U.useRef(at), Rt = U.useRef(null), re = U.useRef(() => {
  });
  U.useEffect(() => {
    ct({}), nt({});
  }, [c]);
  const [ne, Zt] = U.useState(0), [q, lt] = U.useState({ start: 0, end: 0 });
  U.useEffect(() => {
    _ > 0 && _t(_);
  }, [_]), U.useEffect(() => {
    const R = F.current;
    if (!R) return;
    const rt = () => Zt(R.clientWidth);
    rt();
    const Ot = new ResizeObserver(rt);
    return Ot.observe(R), () => Ot.disconnect();
  }, []);
  const Mt = I > 0 ? Math.max(0.4, Math.max(320, ne - V - 16) / I) : 0.4, jt = Math.max(Mt, Mt * Math.pow(2, K / 18));
  U.useLayoutEffect(() => {
    if (Vt.current = K, Rt.current && F.current) {
      const { time: R, pointer: rt } = Rt.current;
      F.current.scrollLeft = Ph(R, jt, rt), Rt.current = null;
    }
  }, [K, jt]), U.useEffect(() => {
    const R = F.current;
    if (!R || !vt) return;
    const rt = (Ot) => re.current(Ot);
    return R.addEventListener("wheel", rt, { passive: !1 }), () => R.removeEventListener("wheel", rt);
  }, [vt]);
  const Te = Math.max(1, I * jt), je = U.useMemo(() => Vy(I, jt), [I, jt]), $e = U.useMemo(() => j && N ? By(j, 0, I, 2e3).map((R) => ({
    time: R.time,
    emphasis: R.emphasis,
    label: R.label,
    className: `rts-beat-grid-${j.mode}`
  })) : [], [j, N, I]), Xl = [...C, ...$e], ml = U.useCallback(() => {
    const R = F.current;
    if (!R) return;
    const rt = wy(
      R.scrollLeft + V,
      Math.max(0, R.clientWidth - V),
      V,
      jt,
      I
    );
    lt(rt), Z?.(rt);
  }, [I, V, Z, jt]);
  U.useEffect(() => {
    ml();
  }, [ml, ne]), U.useEffect(() => {
    gt?.(ft);
    const R = F.current;
    if (!R || !L || !It) return;
    const rt = V + ft * jt, Ot = R.scrollLeft + R.clientWidth, oe = Math.min(180, R.clientWidth * 0.2);
    rt > Ot - oe ? R.scrollLeft = Math.max(0, rt - R.clientWidth + oe) : rt < R.scrollLeft + V && (R.scrollLeft = Math.max(0, rt - V - oe));
  }, [ft, L, It, V, gt, jt]);
  const Sa = (R) => {
    if (I <= 0 || R.target.closest(".rts-label, a, button, input, select, textarea")) return;
    const rt = F.current, Ot = Ft.current;
    if (!rt || !Ot) return;
    const oe = rt.getBoundingClientRect(), O = R.clientX - oe.left + rt.scrollLeft - V;
    if (O < 0) return;
    const J = ba(O / jt, 0, I);
    it.seek(J);
  }, Vl = (R, rt) => {
    const Ot = F.current;
    if (R = ba(R, 0, 100), R !== Vt.current) {
      if (Ot) {
        const oe = Math.max(1, Ot.clientWidth - V), O = rt === void 0 ? oe / 2 : ba(rt - Ot.getBoundingClientRect().left - V, 0, oe), J = Rt.current, zt = Mt * Math.pow(2, Vt.current / 18), Dt = J ? Ph(J.time, zt, J.pointer) : Ot.scrollLeft;
        Rt.current = { time: (Dt + O) / zt, pointer: O };
      }
      Vt.current = R, ht(R);
    }
  };
  re.current = (R) => {
    const rt = F.current, Ot = R.target instanceof Element ? R.target : null;
    if (!rt || !Ot || Ot.closest("input, select, textarea, button, [contenteditable=true]")) return;
    const oe = Math.abs(R.deltaX) > Math.abs(R.deltaY) ? R.deltaX : R.deltaY, O = Cy(oe, R.deltaMode, rt.clientWidth - V);
    if (O)
      if (R.ctrlKey || R.metaKey) {
        if (I <= 0) return;
        R.preventDefault(), R.stopPropagation(), P(!1), Vl(Ay(Vt.current, O), R.clientX);
      } else if (R.altKey) {
        const J = Ot.closest("[data-lane-id]")?.dataset.laneId, zt = g.find((Dt) => Dt.id === J);
        if (!$ || !zt) return;
        R.preventDefault(), R.stopPropagation(), ct((Dt) => ({
          ...Dt,
          [zt.id]: jy(Dt[zt.id] ?? Gu(zt.height), O)
        }));
      } else
        R.preventDefault(), R.stopPropagation(), R.shiftKey ? rt.scrollTop += O : (P(!1), rt.scrollLeft += O);
  };
  const Fe = () => {
    if (!Ht || !F.current) return;
    const R = Math.max(320, ne - V - 16) / (Ht.duration * 1.1), rt = ba(18 * Math.log2(R / Mt), 0, 100);
    Rt.current = null, Vt.current = rt, ht(rt);
    const Ot = Mt * Math.pow(2, rt / 18);
    requestAnimationFrame(() => {
      F.current && (F.current.scrollLeft = Math.max(0, (Ht.start - Ht.duration * 0.05) * Ot));
    });
  }, Ql = () => {
    const R = Number(Ft.current?.duration) || 0;
    Number.isFinite(R) && R > 0 && (_t(R), St?.(R));
  };
  return /* @__PURE__ */ d.jsxs(
    "section",
    {
      className: `rts-sequence ${$ ? "rts-display-controls" : ""} ${H}`,
      style: { "--rts-label-width": `${V}px`, "--rts-track-width": `${Te}px` },
      children: [
        /* @__PURE__ */ d.jsxs("header", { className: "rts-toolbar", children: [
          /* @__PURE__ */ d.jsxs("div", { className: "rts-ident", children: [
            /* @__PURE__ */ d.jsx("strong", { children: m }),
            p && /* @__PURE__ */ d.jsx("span", { children: p })
          ] }),
          /* @__PURE__ */ d.jsxs("div", { className: "rts-transport", "aria-label": "Timeline playback controls", children: [
            /* @__PURE__ */ d.jsx("button", { type: "button", className: "rts-button rts-play", onClick: it.toggle, "aria-label": It || it.loading ? "Pause" : "Play", children: it.loading ? "…" : It ? "❚❚" : "▶" }),
            /* @__PURE__ */ d.jsxs("output", { className: "rts-time", "aria-live": "off", children: [
              pa(ft),
              " / ",
              pa(I)
            ] }),
            /* @__PURE__ */ d.jsx("button", { type: "button", className: "rts-button", onClick: () => Vl(0), children: "Fit" }),
            /* @__PURE__ */ d.jsxs("label", { className: "rts-control", children: [
              /* @__PURE__ */ d.jsx("span", { children: "Zoom" }),
              /* @__PURE__ */ d.jsx("input", { "aria-label": "Timeline zoom", type: "range", min: "0", max: "100", value: K, onChange: (R) => Vl(Number(R.target.value)) })
            ] }),
            /* @__PURE__ */ d.jsxs("label", { className: "rts-control", children: [
              /* @__PURE__ */ d.jsx("input", { type: "checkbox", checked: L, onChange: (R) => P(R.target.checked) }),
              /* @__PURE__ */ d.jsx("span", { children: "Follow" })
            ] })
          ] }),
          /* @__PURE__ */ d.jsx("div", { className: "rts-header-end", children: v }),
          Y.length > 0 && /* @__PURE__ */ d.jsxs("div", { className: "rts-loop-controls", "aria-label": "Loop controls", children: [
            /* @__PURE__ */ d.jsxs("label", { children: [
              "Loop ",
              /* @__PURE__ */ d.jsxs("select", { "aria-label": "Select loop", value: Xt ?? "", onChange: (R) => Me(R.target.value), children: [
                /* @__PURE__ */ d.jsx("option", { value: "", children: "Choose a loop…" }),
                Y.map((R) => /* @__PURE__ */ d.jsx("option", { value: R.id, children: R.label || R.id }, R.id))
              ] })
            ] }),
            /* @__PURE__ */ d.jsxs("label", { children: [
              /* @__PURE__ */ d.jsx("input", { type: "checkbox", "aria-label": "Enable loop", disabled: !G, checked: yt && !!G, onChange: (R) => b(R.target.checked) }),
              "Enable loop"
            ] }),
            /* @__PURE__ */ d.jsx("button", { type: "button", className: "rts-button", disabled: !G, onClick: Fe, children: "Zoom to loop" }),
            G && /* @__PURE__ */ d.jsxs("output", { children: [
              G.startSample.toLocaleString(),
              " → ",
              G.endSample.toLocaleString(),
              " samples (end exclusive) · ",
              G.sampleRate.toLocaleString(),
              " Hz"
            ] }),
            G?.downloadUrl && /* @__PURE__ */ d.jsx("a", { href: G.downloadUrl, download: !0, children: "Download loop WAV" }),
            /* @__PURE__ */ d.jsx("span", { className: "rts-loop-status", role: "status", children: it.loading ? "Loading loop…" : yt && G ? "Loop enabled · Play repeats selection" : "Full-song playback" })
          ] }),
          it.error && /* @__PURE__ */ d.jsx("div", { role: "alert", className: "rts-loop-error", children: it.error })
        ] }),
        /* @__PURE__ */ d.jsx(
          "audio",
          {
            ref: Ft,
            src: c,
            preload: W,
            crossOrigin: Tt,
            onLoadedMetadata: Ql,
            onEnded: it.ended,
            onError: () => it.fail(new Error(Ft.current?.error?.message || "Audio playback failed"))
          }
        ),
        /* @__PURE__ */ d.jsx("div", { className: "rts-workspace", children: /* @__PURE__ */ d.jsx("div", { ref: F, className: "rts-scroller", onScroll: ml, onClick: Sa, children: /* @__PURE__ */ d.jsxs("div", { className: "rts-inner", children: [
          /* @__PURE__ */ d.jsxs("div", { className: "rts-ruler-row", children: [
            /* @__PURE__ */ d.jsx("div", { className: "rts-label rts-ruler-label", children: "TIME" }),
            /* @__PURE__ */ d.jsx("div", { className: "rts-ruler-track", children: je.map((R) => /* @__PURE__ */ d.jsx("span", { className: `rts-tick ${R.major ? "rts-tick-major" : ""}`, style: { left: `${R.time * jt}px` }, children: R.major && /* @__PURE__ */ d.jsx("span", { className: "rts-tick-label", children: Qy(R.time, jt) }) }, R.time)) })
          ] }),
          Y.length > 0 && /* @__PURE__ */ d.jsxs("div", { className: "rts-lane rts-lane-loops", children: [
            /* @__PURE__ */ d.jsxs("div", { className: "rts-label", children: [
              /* @__PURE__ */ d.jsx("div", { className: "rts-title", children: "LOOPS" }),
              /* @__PURE__ */ d.jsx("div", { className: "rts-meta", children: "Select a region, enable, then Play" })
            ] }),
            /* @__PURE__ */ d.jsx("div", { className: "rts-track", children: Y.map((R) => {
              const rt = Ja(R);
              return /* @__PURE__ */ d.jsx(
                "button",
                {
                  type: "button",
                  className: "rts-loop-region",
                  "aria-pressed": Xt === R.id,
                  "aria-label": `Select ${R.label || R.id}`,
                  onClick: () => Me(R.id),
                  title: `${R.label || R.id}: [${R.startSample}, ${R.endSample}) at ${R.sampleRate} Hz`,
                  style: { left: `${rt.start * jt}px`, width: `${rt.duration * jt}px` },
                  children: R.label || R.id
                },
                R.id
              );
            }) })
          ] }),
          Ht && /* @__PURE__ */ d.jsx(
            "div",
            {
              className: `rts-loop-shade ${yt ? "" : "is-disabled"}`,
              "aria-hidden": "true",
              style: { left: `${V + Ht.start * jt}px`, width: `${Ht.duration * jt}px` }
            }
          ),
          /* @__PURE__ */ d.jsx("div", { className: "rts-lanes", children: g.map((R) => {
            const rt = R.content, Ot = rt.type === "audio" ? rt : null, oe = tt[R.id] ?? Ot?.view ?? "both", O = Ot ? o0(oe, !!Ot.waveform, !!Ot.spectrogram) : "both", J = $ ? ot[R.id] ?? Gu(R.height) : R.height, zt = typeof R.title == "string" ? R.title : R.id;
            return /* @__PURE__ */ d.jsxs(
              "div",
              {
                "data-lane-id": R.id,
                className: `rts-lane rts-lane-${R.kind ?? "default"} ${R.className ?? ""}`,
                style: J ? { "--rts-lane-height": `${J}px` } : void 0,
                children: [
                  /* @__PURE__ */ d.jsxs("div", { className: "rts-label", children: [
                    /* @__PURE__ */ d.jsx("div", { className: "rts-title", children: R.title }),
                    R.meta && /* @__PURE__ */ d.jsx("div", { className: "rts-meta", children: R.meta }),
                    $ && /* @__PURE__ */ d.jsxs("div", { className: "rts-lane-controls", children: [
                      Ot && /* @__PURE__ */ d.jsxs("label", { children: [
                        "View ",
                        /* @__PURE__ */ d.jsxs(
                          "select",
                          {
                            "aria-label": `View for ${zt}`,
                            value: O,
                            onChange: (Dt) => nt((Pt) => ({ ...Pt, [R.id]: Dt.target.value })),
                            children: [
                              /* @__PURE__ */ d.jsx("option", { value: "waveform", disabled: !Ot.waveform, children: "Waveform" }),
                              /* @__PURE__ */ d.jsx("option", { value: "spectrogram", disabled: !Ot.spectrogram, children: "Spectrogram" }),
                              /* @__PURE__ */ d.jsx("option", { value: "both", disabled: !Ot.waveform || !Ot.spectrogram, children: "Both" })
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
                            "aria-label": `Height for ${zt}`,
                            value: J,
                            onChange: (Dt) => ct((Pt) => ({ ...Pt, [R.id]: Gu(Number(Dt.target.value)) }))
                          }
                        ),
                        /* @__PURE__ */ d.jsxs("output", { children: [
                          J,
                          "px"
                        ] })
                      ] }),
                      /* @__PURE__ */ d.jsx(
                        "button",
                        {
                          type: "button",
                          className: "rts-height-reset",
                          "aria-label": `Reset height for ${zt}`,
                          onClick: () => ct((Dt) => ({ ...Dt, [R.id]: Gu(R.height) })),
                          children: "Reset height"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ d.jsx("div", { className: "rts-track", children: Ot ? /* @__PURE__ */ d.jsx(Gy, { content: Ot, duration: I, view: O }) : /* @__PURE__ */ d.jsx(rf, { content: rt, duration: I }) })
                ]
              },
              R.id
            );
          }) }),
          Xl.length > 0 && /* @__PURE__ */ d.jsx("div", { className: "rts-grid", "aria-hidden": "true", children: Xl.map((R, rt) => /* @__PURE__ */ d.jsx("span", { className: `rts-grid-line ${R.emphasis ? "rts-grid-line-emphasis" : ""} ${R.className ?? ""}`, style: { left: `${R.time * jt}px` } }, `${R.time}-${rt}`)) }),
          /* @__PURE__ */ d.jsx("div", { className: "rts-playhead", style: { left: `${V + ft * jt}px` }, "aria-hidden": "true" })
        ] }) }) }),
        /* @__PURE__ */ d.jsxs("footer", { className: "rts-footer", children: [
          /* @__PURE__ */ d.jsxs("div", { children: [
            A,
            vt && /* @__PURE__ */ d.jsx("div", { className: "rts-navigation-help", children: "Wheel: time · Ctrl/⌘ + wheel: time zoom · Alt + wheel: channel height · Shift + wheel: channel scroll" })
          ] }),
          /* @__PURE__ */ d.jsxs("output", { className: "rts-window", children: [
            pa(q.start),
            " — ",
            pa(q.end)
          ] })
        ] })
      ]
    }
  );
}
const nf = /\.(wav|flac|mp3|ogg|opus|m4a|aif|aiff)$/i;
function a0(c) {
  return c === "__source__" || c.startsWith("input/") ? "master" : c.startsWith("stems/") ? c.slice(6).replace(nf, "") : c.startsWith("speech/") && nf.test(c) ? c.replace(nf, "") : null;
}
function Ky(c) {
  const o = /* @__PURE__ */ new Map(), r = [], s = /* @__PURE__ */ new Map();
  for (const m of c) for (const p of Array.isArray(m.sourceMap) ? m.sourceMap : [])
    if (typeof p?.audio == "string" && typeof p.data == "string") {
      const _ = a0(p.audio.replace(/\\/g, "/"));
      _ && (s.set(p.data.replace(/\\/g, "/"), _), typeof p.png == "string" && s.set(p.png.replace(/\\/g, "/"), _));
    }
  const g = (m) => (o.has(m) || o.set(m, { key: m }), o.get(m));
  for (const m of c) {
    const p = (m.id?.replace(/^file:/, "") || "").replace(/\\/g, "/"), _ = a0(p), C = p.startsWith("spectrograms/") ? s.get(p) || p.slice(13).replace(/\.(npz|png)$/i, "") : null;
    if (_ && (m.content?.type === "waveform" || m.content?.type === "artifact")) {
      const j = g(_);
      (!j.audio || m.id === "__source__") && (j.audio = m);
    } else C && p.endsWith(".npz") && m.content?.type === "image" ? g(C).spectrum = m : C && p.endsWith(".png") && m.content?.type === "image" ? g(C).png = m : r.push(m);
  }
  for (const m of o.values()) {
    if (!m.audio && !m.spectrum) {
      m.png && r.push(m.png);
      continue;
    }
    const p = m.audio || m.spectrum, _ = m.audio?.content?.type === "waveform" ? m.audio.content : null, C = m.audio?.content?.type === "artifact" ? m.audio.content.note : null;
    r.push({
      ...p,
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
const ff = (c) => typeof c == "number" && Number.isFinite(c) && c > 0, Jy = { canonical: "Canonical", combined: "Consensus · observed tempo", combined_family: "Consensus · canonical tempo family", combined_fit: "Consensus · fitted constant grid" };
function n0(c, o, r, s) {
  if (!ff(c) || !Number.isFinite(o) || o < 0 || !Number.isFinite(r) || r <= 0) return [];
  const g = Math.max(0, Math.floor((r - o) * c / 60 + 1e-9) + 1), m = Math.max(1, Math.ceil(g / 25e3));
  return Array.from({ length: Math.ceil(g / m) }, (p, _) => {
    const C = _ * m;
    return {
      time: o + C * 60 / c,
      emphasis: C === 0,
      label: `${s === "original" ? "Original" : "Aligned"} beat ${C + 1}${C === 0 && s === "aligned" ? " · pip 0" : ""}`,
      className: `stemlab-grid-${s}`
    };
  });
}
function $y(c, o, r, s = "canonical", g = "consensus") {
  const m = c?.schema === "stemlab.beat-offsets.v1" && c.pips_per_beat === 64;
  let p = m ? (c.bpm_bases || []).filter((H) => H.status === "available" && ff(H.bpm)) : [];
  !p.length && ff(o) && (p = [{ id: "canonical", bpm: o }]);
  const _ = p.find((H) => H.id === s) || p.find((H) => H.id === "combined_fit") || p[0] || null, C = m ? (c.analyses || []).filter((H) => H.status === "available") : [], j = C.find((H) => H.analysis_id === g) || C.find((H) => H.kind === "consensus") || C[0] || null, N = _ && j ? c.comparisons?.find((H) => H.status === "available" && H.bpm_basis === _.id && H.analysis_id === j.analysis_id) : null, v = _ ? n0(_.bpm, 0, r, "original") : [], A = N && Number.isFinite(N.beat_zero_seconds) ? n0(N.bpm, N.beat_zero_seconds, r, "aligned") : [];
  return {
    bases: p.map((H) => ({ ...H, label: `${Jy[H.id] || H.id}${H.multiplier ? ` ×${H.multiplier}` : ""} · ${H.bpm.toFixed(4)} BPM` })),
    basis: _,
    analysis: j,
    analyses: C,
    row: N,
    original: v,
    aligned: A,
    thinned: !!_ && Math.floor(r * _.bpm / 60) + 1 > 25e3,
    grid: [...v, ...A].sort((H, V) => H.time - V.time)
  };
}
function Fy({ comparison: c, onBasis: o, onAnalysis: r }) {
  const { bases: s, basis: g, analyses: m, analysis: p, row: _, thinned: C } = c;
  return /* @__PURE__ */ d.jsxs("section", { className: "stemlab-beat-offset-controls", "aria-label": "BPM grid comparison", children: [
    /* @__PURE__ */ d.jsxs("div", { className: "stemlab-beat-offset-selectors", children: [
      /* @__PURE__ */ d.jsxs("label", { children: [
        "BPM grid ",
        /* @__PURE__ */ d.jsxs("select", { "aria-label": "BPM grid basis", value: g?.id || "", onChange: (j) => o(j.target.value), disabled: !s.length, children: [
          !s.length && /* @__PURE__ */ d.jsx("option", { value: "", children: "BPM unavailable" }),
          s.map((j) => /* @__PURE__ */ d.jsx("option", { value: j.id, children: j.label }, j.id))
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("label", { children: [
        "First beat from ",
        /* @__PURE__ */ d.jsxs("select", { "aria-label": "First beat analysis", value: p?.analysis_id || "", onChange: (j) => r(j.target.value), disabled: !m.length, children: [
          !m.length && /* @__PURE__ */ d.jsx("option", { value: "", children: "Detected beat unavailable" }),
          m.map((j) => /* @__PURE__ */ d.jsx("option", { value: j.analysis_id, children: j.analysis_id }, j.analysis_id))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("p", { className: "stemlab-grid-legend", children: [
      /* @__PURE__ */ d.jsx("span", { className: "stemlab-legend-original", children: "Original grid · source time 0" }),
      /* @__PURE__ */ d.jsx("span", { className: "stemlab-legend-aligned", children: "Offset grid · detected first beat = pip 0" })
    ] }),
    /* @__PURE__ */ d.jsx("output", { "aria-live": "polite", "data-testid": "beat-offset-value", children: _ ? `${_.offset_pips.toFixed(6)} pips · first detected beat ${_.first_beat_seconds.toFixed(6)}s · nearest whole offset ${_.integer_offset_pips} pips (${(_.integer_residual_seconds * 1e3).toFixed(3)} ms residual)` : "Waiting for usable beat evidence; no aligned grid is inferred." }),
    p?.constant_grid_fit && /* @__PURE__ */ d.jsxs("p", { className: "small", children: [
      "Selected detector fit: ",
      p.constant_grid_fit.proposed_bpm.toFixed(4),
      " BPM · 95% beat error ",
      p.constant_grid_fit.p95_absolute_beat_error_ms.toFixed(3),
      " ms · grade ",
      p.constant_grid_fit.precision_grade,
      ".",
      g?.fit ? ` Consensus grid fit grade: ${g.fit.precision_grade}.` : ""
    ] }),
    /* @__PURE__ */ d.jsxs("p", { className: "small", children: [
      "Half- and double-time readings are normal. Observed beats stay in their own lanes; tempo-family options compare ×½ / ×1 / ×2 interpretations. Constant grids and detector phases remain estimates.",
      C ? " Dense grids are thinned for display only." : ""
    ] })
  ] });
}
const ky = "stemlab.beat-timeline.v1", Qu = 64, Ml = (c) => Number.isSafeInteger(c);
function Sc(c) {
  if (!c || c.schema !== ky || c.pips_per_beat !== Qu || !Number.isSafeInteger(c.source_audio?.sample_rate) || c.source_audio.sample_rate < 1 || !Number.isSafeInteger(c.source_audio?.num_frames) || c.source_audio.num_frames < 2 || !/^[0-9a-f]{64}$/.test(c.source_audio?.sha256 || "") || !/^[0-9a-f]{64}$/.test(c.consensus_sha256 || "") || !Array.isArray(c.beats) || c.beats.length < 2 || c.beats.length > 25e3 || !Ml(c.origin_beat)) throw new Error("Not a valid source-bound StemLab beat timeline");
  const o = { beat: -1, frame: -1 };
  for (const r of c.beats) {
    if (!Ml(r.beat) || !Ml(r.frame) || r.beat <= o.beat || r.frame <= o.frame || r.frame >= c.source_audio.num_frames || !["consensus", "corrected", "manual"].includes(r.source) || r.reference_frame !== null && (!Ml(r.reference_frame) || r.reference_frame < 0 || r.reference_frame >= c.source_audio.num_frames) || r.source === "consensus" && r.frame !== r.reference_frame || r.source === "manual" && r.reference_frame !== null)
      throw new Error("Beat indices and source sample frames must increase; original consensus timestamps stay immutable");
    o.beat = r.beat, o.frame = r.frame;
  }
  if (!c.beats.some((r) => r.beat === c.origin_beat)) throw new Error("Beat 1 must identify a real anchor");
  return c;
}
const Fa = (c) => ({ ...c, beats: c.beats.map((o) => ({ ...o })) }), ka = (c) => Sc(c), Wy = (c, o) => c.beats[o].frame / c.source_audio.sample_rate, Qn = (c, o) => o < 0 || o + 1 >= c.beats.length ? null : 60 * c.source_audio.sample_rate * (c.beats[o + 1].beat - c.beats[o].beat) / (c.beats[o + 1].frame - c.beats[o].frame), g0 = (c, o) => Math.round(o * c.source_audio.sample_rate);
function u0(c, o, r) {
  const s = Fa(c);
  if (!Ml(o) || o < 0 || o >= s.beats.length) throw new Error("Select a beat");
  const g = g0(s, r), m = s.beats[o - 1]?.frame ?? -1, p = s.beats[o + 1]?.frame ?? s.source_audio.num_frames;
  if (!Ml(g) || g <= m || g >= p) throw new Error("Beat must remain between its neighbours");
  const _ = s.beats[o];
  return _.frame = g, _.source = g === _.reference_frame ? "consensus" : _.reference_frame === null ? "manual" : "corrected", ka(s);
}
function Iy(c, o, r) {
  if (!Number.isFinite(r) || r <= 0 || r > 1200) throw new Error("BPM must be 0..1200");
  const s = Fa(c);
  if (!Ml(o) || o < 0 || o + 1 >= s.beats.length) throw new Error("Choose an interval");
  const g = s.beats[o], m = s.beats[o + 1], p = Math.round(60 * (m.beat - g.beat) * s.source_audio.sample_rate / r);
  if (p < 1) throw new Error("BPM exceeds available sample precision");
  const _ = g.frame + p - m.frame;
  for (let C = o + 1; C < s.beats.length; C++) {
    const j = s.beats[C];
    j.frame += _, j.source = j.reference_frame === null ? "manual" : j.frame === j.reference_frame ? "consensus" : "corrected";
  }
  return ka(s);
}
function Py(c, o) {
  if (!Number.isFinite(o) || Math.abs(o) > 1e5) throw new Error("Phase shift is out of bounds");
  const r = Fa(c), s = Qn(r, 0), g = Math.round(o / Qu * (60 / s) * r.source_audio.sample_rate);
  for (const m of r.beats)
    m.frame += g, m.source = m.reference_frame === null ? "manual" : m.frame === m.reference_frame ? "consensus" : "corrected";
  return ka(r);
}
function i0(c, o) {
  const r = Fa(c), s = g0(r, o);
  if (!Ml(s) || s < 0 || s >= r.source_audio.num_frames) throw new Error("Beat outside source");
  let g = r.beats.findIndex((j) => j.frame > s);
  if (g < 0 && (g = r.beats.length), g === 0 || g === r.beats.length || r.beats[g - 1].frame === s)
    throw new Error("Insert between two existing anchors; use the timeline selection to move end beats");
  const m = r.beats[g - 1], p = r.beats[g], _ = p.beat - m.beat > 1, C = m.beat + 1;
  if (!_) {
    r.origin_beat >= p.beat && (r.origin_beat += 1);
    for (let j = g; j < r.beats.length; j++) r.beats[j].beat += 1;
  }
  return r.beats.splice(g, 0, { beat: C, frame: s, source: "manual", reference_frame: null }), ka(r);
}
function tb(c, o) {
  const r = Fa(c);
  if (!Ml(o) || o < 0 || o >= r.beats.length || r.beats.length <= 2)
    throw new Error("Keep at least two beat anchors");
  const [s] = r.beats.splice(o, 1);
  return s.beat === r.origin_beat && (r.origin_beat = r.beats[Math.min(o, r.beats.length - 1)].beat), ka(r);
}
function eb(c, o) {
  const r = Fa(c);
  if (!Ml(o) || o < 0 || o >= r.beats.length) throw new Error("Select Beat 1");
  return r.origin_beat = r.beats[o].beat, ka(r);
}
function lb(c) {
  const o = Fa(c);
  for (const r of o.beats) r.reference_frame !== null && (r.frame = r.reference_frame, r.source = "consensus");
  return ka(o);
}
function ab(c) {
  const o = Qn(c, 0), r = c.beats.find((s) => s.beat === c.origin_beat);
  return c.beats.map((s) => ({
    time: s.frame / c.source_audio.sample_rate,
    value: Qu * (s.beat - c.origin_beat) - (s.frame - r.frame) * o * Qu / (c.source_audio.sample_rate * 60)
  }));
}
function nb(c, o, r = 3e3) {
  if (!c?.beats?.length) return [];
  const s = c.source_audio.sample_rate, g = Number.isFinite(o?.start) ? o.start : 0, m = Number.isFinite(o?.end) && o.end > g ? o.end : Number.MAX_VALUE, p = c.beats.filter((C) => C.frame / s >= g - 0.05 && C.frame / s <= m + 0.05), _ = Math.max(1, Math.ceil(p.length / r));
  return p.filter((C, j) => j % _ === 0).map((C) => ({
    time: C.frame / s,
    emphasis: C.beat === c.origin_beat,
    label: `Corrected beat ${C.beat} · native pip ${(C.beat - c.origin_beat) * Qu}`,
    className: "stemlab-grid-corrected"
  }));
}
const Vu = 20, of = 400, y0 = (c, o, r) => Math.max(o, Math.min(r, c)), c0 = (c) => 100 * (1 - Math.log(y0(c, Vu, of) / Vu) / Math.log(of / Vu)), ub = (c, o) => Vu * (of / Vu) ** y0(1 - (c - o.top) / o.height, 0, 1);
async function uf(c, o = "GET", r) {
  const s = await fetch(
    `/api/${c}/beat-timeline${o === "POST" ? "/preview" : ""}`,
    { method: o, headers: { "Content-Type": "application/json" }, body: r === void 0 ? void 0 : JSON.stringify(r), cache: "no-store" }
  ), g = await s.json().catch(() => ({}));
  if (!s.ok) throw new Error(g.detail || `Beat timeline HTTP ${s.status}`);
  return g;
}
function ib({ map: c, duration: o, visible: r, selected: s, onSelect: g, onEdit: m, onInsert: p }) {
  const _ = c.source_audio.sample_rate, j = c.beats.map((v, A) => ({ row: v, i: A })).filter(({ row: v }) => {
    const A = v.frame / _;
    return A >= r.start - 0.1 && A <= r.end + 0.1;
  }), N = Math.max(1, Math.ceil(j.length / 2e3));
  return /* @__PURE__ */ d.jsx(
    "div",
    {
      className: "stemlab-beatmap-track",
      "aria-label": "Editable sample-accurate beat anchors",
      onDoubleClick: (v) => {
        if (v.target !== v.currentTarget) return;
        const A = v.currentTarget.getBoundingClientRect();
        p((v.clientX - A.left) / A.width * o), v.stopPropagation();
      },
      children: j.filter((v, A) => A % N === 0).map(({ row: v, i: A }) => /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          className: `stemlab-beatmap-anchor ${v.source} ${s === A ? "selected" : ""} ${v.beat === c.origin_beat ? "origin" : ""}`,
          "aria-label": `Beat ${v.beat}, ${Wy(c, A).toFixed(6)} seconds, ${v.source}; drag or use arrow keys`,
          "aria-pressed": s === A,
          title: `Beat ${v.beat}: frame ${v.frame} · ${(v.frame / _).toFixed(6)} s · ${v.source}${v.reference_frame === null ? "" : ` · reference ${v.reference_frame}`}`,
          style: { left: `${v.frame / (_ * Math.max(o, 1e-9)) * 100}%` },
          onPointerDown: (H) => {
            H.currentTarget.setPointerCapture(H.pointerId), g(A), H.stopPropagation();
          },
          onPointerMove: (H) => {
            if (!H.currentTarget.hasPointerCapture(H.pointerId)) return;
            const V = H.currentTarget.parentElement.getBoundingClientRect();
            m(A, (H.clientX - V.left) / V.width * o), H.stopPropagation();
          },
          onPointerUp: (H) => {
            H.currentTarget.releasePointerCapture(H.pointerId), H.stopPropagation();
          },
          onClick: (H) => {
            g(A), H.stopPropagation();
          },
          onKeyDown: (H) => {
            if (H.key !== "ArrowLeft" && H.key !== "ArrowRight") return;
            H.preventDefault(), H.stopPropagation();
            const V = H.shiftKey ? Math.max(1, Math.round(_ / 1e3)) : 1;
            m(A, (v.frame + (H.key === "ArrowLeft" ? -V : V)) / _);
          },
          children: /* @__PURE__ */ d.jsx("span", { children: v.beat === c.origin_beat ? "1" : "" })
        },
        v.beat
      ))
    }
  );
}
function cb({ map: c, duration: o, visible: r, selected: s, onSelect: g, onTempo: m }) {
  const p = c.source_audio.sample_rate, _ = c.beats.slice(0, -1).map((N, v) => ({
    i: v,
    start: N.frame / p,
    end: c.beats[v + 1].frame / p,
    bpm: Qn(c, v)
  })).filter((N) => N.end >= r.start && N.start <= r.end), C = Math.max(1, Math.ceil(_.length / 1800)), j = _.filter((N, v) => v % C === 0);
  return /* @__PURE__ */ d.jsxs("div", { className: "stemlab-beatmap-tempo", "aria-label": "Editable local BPM envelope", children: [
    /* @__PURE__ */ d.jsx("svg", { className: "stemlab-beatmap-tempo-line", viewBox: "0 0 1000 100", preserveAspectRatio: "none", "aria-hidden": "true", children: /* @__PURE__ */ d.jsx(
      "polyline",
      {
        points: j.map((N) => `${(N.start + N.end) / 2 / Math.max(o, 1e-9) * 1e3},${c0(N.bpm)}`).join(" "),
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
    j.map((N) => /* @__PURE__ */ d.jsx(
      "button",
      {
        type: "button",
        className: `stemlab-beatmap-tempo-node ${s === N.i ? "selected" : ""}`,
        style: { left: `${(N.start + N.end) / 2 / Math.max(o, 1e-9) * 100}%`, top: `${c0(N.bpm)}%` },
        title: `Interval ${N.i} → ${N.i + 1}: ${N.bpm.toFixed(3)} BPM · drag vertically to change local tempo`,
        "aria-label": `BPM envelope interval ${N.i}: ${N.bpm.toFixed(3)} BPM`,
        "aria-pressed": s === N.i,
        onPointerDown: (v) => {
          v.currentTarget.setPointerCapture(v.pointerId), g(N.i), v.stopPropagation();
        },
        onPointerMove: (v) => {
          if (!v.currentTarget.hasPointerCapture(v.pointerId)) return;
          const A = v.currentTarget.parentElement.getBoundingClientRect();
          m(N.i, ub(v.clientY, A)), v.stopPropagation();
        },
        onPointerUp: (v) => {
          v.currentTarget.releasePointerCapture(v.pointerId), v.stopPropagation();
        },
        onClick: (v) => {
          g(N.i), v.stopPropagation();
        },
        onKeyDown: (v) => {
          v.key !== "ArrowUp" && v.key !== "ArrowDown" || (v.preventDefault(), v.stopPropagation(), m(N.i, Math.max(0.01, N.bpm + (v.key === "ArrowUp" ? 1 : -1) * (v.shiftKey ? 0.01 : 1))));
        },
        children: N.bpm.toFixed(1)
      },
      N.i
    ))
  ] });
}
function sb(c, o) {
  const [r, s] = U.useState(null), [g, m] = U.useState(!1), [p, _] = U.useState(null), [C, j] = U.useState(!1), [N, v] = U.useState(!1), [A, H] = U.useState(!0), [V, at] = U.useState(0), [$, vt] = U.useState({ start: 0, end: 1 / 0 }), [X, W] = U.useState(!1), [Tt, St] = U.useState(!0), [gt, Z] = U.useState(""), [mt, Ft] = U.useState("0"), [F, I] = U.useState(""), [_t, Xt] = U.useState(!1), [Wt, yt] = U.useState([]), [B, Y] = U.useState([]), G = U.useRef(null), it = U.useRef(0), ft = U.useRef(null);
  ft.current = r;
  const It = U.useCallback(async (q = !1) => {
    if (!(C && !q && !window.confirm("Discard unsaved beat edits and reload the saved map?")))
      try {
        const lt = await uf(c);
        if (!lt.available) {
          v(!1);
          return;
        }
        Sc(lt.map), s(lt.map), v(!0), m(lt.saved), _(lt.revision), j(!1), yt([]), Y([]), at(0), Z(Qn(lt.map, 0)?.toFixed(3) || ""), I(lt.saved ? "Loaded saved beat corrections" : "Prepared an editable proposal at exact consensus sample frames");
      } catch (lt) {
        lt.message.includes("HTTP 404") && !ft.current ? H(!1) : I(lt.message);
      }
  }, [c, C]);
  U.useEffect(() => {
    let q = !0;
    const lt = async () => {
      q && await It(!0);
    };
    lt();
    const Mt = window.setInterval(() => {
      q && !ft.current && lt();
    }, 5e3);
    return () => {
      q = !1, window.clearInterval(Mt);
    };
  }, [c]);
  const Ht = U.useCallback((q) => {
    try {
      const lt = ft.current;
      if (!lt) return;
      const Mt = q(lt);
      lt.review_status === "artist_confirmed" && Mt.review_status === "artist_confirmed" && (Mt.beats !== lt.beats || Mt.origin_beat !== lt.origin_beat) && (Mt.review_status = "estimated"), Sc(Mt), s(Mt), j(!0), yt((jt) => [...jt.slice(-59), lt]), Y([]), I("Unsaved beat-map edits · original consensus unchanged");
    } catch (lt) {
      I(lt.message);
    }
  }, []), Me = () => {
    Wt.length && (Y((q) => [...q.slice(-59), r]), s(Wt.at(-1)), yt((q) => q.slice(0, -1)), j(!0));
  }, b = () => {
    B.length && (yt((q) => [...q.slice(-59), r]), s(B.at(-1)), Y((q) => q.slice(0, -1)), j(!0));
  }, L = (q) => {
    at(q), Z(Qn(ft.current, q)?.toFixed(3) || "");
  }, P = async (q) => {
    const lt = await uf(c, "POST", q);
    return Sc(lt), lt;
  }, K = async () => {
    if (r) {
      Xt(!0);
      try {
        const q = await uf(c, "PUT", { map: r, expected_revision: p });
        s(q.map), m(!0), _(q.revision), j(!1), yt([]), Y([]), I("Beat corrections saved separately from the consensus detections");
      } catch (q) {
        I(q.message);
      } finally {
        Xt(!1);
      }
    }
  }, ht = async (q) => {
    if (r) {
      Xt(!0);
      try {
        const lt = await P(r), Mt = JSON.stringify(lt, null, 2);
        if (q === "copy")
          await navigator.clipboard.writeText(Mt), I("Copied one complete beat-timeline JSON value with Beat 1 and pip phase synchronisation");
        else {
          const jt = new Blob([Mt + `
`], { type: "application/json" }), Te = URL.createObjectURL(jt), je = document.createElement("a");
          je.href = Te, je.download = `stemlab-beat-timeline-${c.slice(0, 12)}.json`, document.body.appendChild(je), je.click(), je.remove(), URL.revokeObjectURL(Te), I("Exported a single source-bound beat-timeline JSON file");
        }
      } catch (lt) {
        I(lt.message);
      } finally {
        Xt(!1);
      }
    }
  }, ot = async (q) => {
    const lt = q.target.files?.[0];
    if (q.target.value = "", !!lt) {
      if (lt.size > 32 * 1024 * 1024) {
        I("Import limited to 32 MiB");
        return;
      }
      Xt(!0);
      try {
        const Mt = JSON.parse(await lt.text()), jt = await P(Mt);
        s(jt), j(!0), yt((Te) => r ? [...Te.slice(-59), r] : Te), Y([]), I("Imported and validated: review changes before saving. Original consensus unchanged.");
      } catch (Mt) {
        I(Mt.message);
      } finally {
        Xt(!1);
      }
    }
  }, ct = (q, lt) => Ht((Mt) => Iy(Mt, q, lt)), tt = () => Ht((q) => lb(q)), nt = r && X && o > 0 ? [
    {
      id: "corrected:anchors",
      title: "Corrected beats",
      kind: "beatmap",
      height: 80,
      meta: "Drag to place · arrows: 1 sample · Shift: 1 ms · double-click empty space to insert",
      content: { type: "custom", node: /* @__PURE__ */ d.jsx(
        ib,
        {
          map: r,
          duration: o,
          visible: $,
          selected: V,
          onSelect: L,
          onEdit: (q, lt) => Ht((Mt) => u0(Mt, q, lt)),
          onInsert: (q) => Ht((lt) => i0(lt, q))
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
          map: r,
          duration: o,
          visible: $,
          selected: V,
          onSelect: L,
          onTempo: ct
        }
      ) }
    },
    {
      id: "corrected:phase",
      title: "Phase CV",
      kind: "beatmap",
      height: 80,
      meta: "Relative pips vs the opening tempo · visible irregular drift",
      content: { type: "curve", points: ab(r).filter((q, lt) => lt % Math.max(1, Math.ceil(r.beats.length / 4e3)) === 0), colour: "#ecb7fd" }
    }
  ] : [], Vt = r && Tt ? nb(r, $) : [], Rt = r?.beats?.[Math.min(V, r.beats.length - 1)], re = r?.source_audio?.sample_rate || 1, ne = r && V < r.beats.length - 1 ? Qn(r, V) : null, Zt = /* @__PURE__ */ d.jsxs("section", { className: "stemlab-beatmap-panel", "aria-label": "Editable variable tempo and Beat 1 phase", children: [
    /* @__PURE__ */ d.jsxs("header", { children: [
      /* @__PURE__ */ d.jsx("strong", { children: "Beat correction · variable BPM & phase" }),
      r && /* @__PURE__ */ d.jsxs("span", { children: [
        r.beats.length.toLocaleString(),
        " anchors · ",
        g ? "saved" : "consensus draft",
        C ? " · unsaved changes" : ""
      ] }),
      /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => W((q) => !q), children: X ? "Hide editor" : "Show editor" })
    ] }),
    X && r && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
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
              value: Rt?.beat ?? 0,
              onChange: (q) => {
                const lt = r.beats.findIndex((Mt) => Mt.beat === Number(q.target.value));
                lt >= 0 && L(lt);
              }
            }
          )
        ] }),
        /* @__PURE__ */ d.jsxs("output", { children: [
          "Frame ",
          Rt?.frame ?? 0,
          " · ",
          Rt ? (Rt.frame / re).toFixed(6) : "0",
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
              value: gt,
              onChange: (q) => Z(q.target.value),
              onKeyDown: (q) => {
                q.key === "Enter" && ct(V, Number(gt));
              }
            }
          )
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: V >= r.beats.length - 1, onClick: () => ct(V, Number(gt)), children: "Apply BPM" }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Phase shift (pips) ",
          /* @__PURE__ */ d.jsx(
            "input",
            {
              "aria-label": "Global phase shift pips",
              type: "number",
              step: "0.25",
              value: mt,
              onChange: (q) => Ft(q.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => Ht((q) => Py(q, Number(mt))), children: "Shift all beats" })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-beatmap-actions", children: [
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => Ht((q) => u0(q, V, it.current)), children: "Place selected at playhead" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => Ht((q) => i0(q, it.current)), children: "Insert at playhead" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => Ht((q) => eb(q, V)), children: "Set selected as Beat 1" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => Ht((q) => tb(q, V)), children: "Delete selected" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: !Wt.length, onClick: Me, children: "Undo" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: !B.length, onClick: b, children: "Redo" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: tt, children: "Match consensus beats" }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          /* @__PURE__ */ d.jsx("input", { type: "checkbox", checked: Tt, onChange: (q) => St(q.target.checked) }),
          "Corrected grid"
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          /* @__PURE__ */ d.jsx(
            "input",
            {
              type: "checkbox",
              checked: r.review_status === "artist_confirmed",
              onChange: (q) => Ht((lt) => ({ ...lt, review_status: q.target.checked ? "artist_confirmed" : "estimated" }))
            }
          ),
          "Artist-reviewed Beat 1 / phase"
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-beatmap-export", children: [
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: _t || !C, onClick: K, children: "Save corrections" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: _t, onClick: () => ht("download"), children: "Export Beat 1 + full beat timeline JSON" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: _t, onClick: () => ht("copy"), children: "Copy JSON value" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: _t, onClick: () => G.current?.click(), children: "Import JSON" }),
        /* @__PURE__ */ d.jsx("input", { ref: G, type: "file", accept: ".json,application/json", hidden: !0, onChange: ot }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => It(), children: "Reload saved/consensus" })
      ] }),
      /* @__PURE__ */ d.jsxs("small", { children: [
        "Current local BPM: ",
        ne?.toFixed(3) ?? "last anchor",
        " · original consensus matches remain labelled separately. Native timebase: 64 pips/beat, imported DanceMoves clocks use 16 ticks/beat. DanceMoves supports optional beat-timeline.v1 variable playback where its new consumer is installed; beat-alignment.v1 remains a separate fixed-tempo format."
      ] })
    ] }),
    !N && X && /* @__PURE__ */ d.jsx("p", { children: "Waiting for an available consensus beat list (and exact master audio). No timing is invented." }),
    F && /* @__PURE__ */ d.jsx("output", { role: "status", className: "stemlab-beatmap-status", children: F })
  ] });
  return {
    map: r,
    revision: p,
    saved: g,
    ready: N,
    dirty: C,
    lanes: nt,
    grid: Vt,
    panel: A ? Zt : null,
    onWindowChange: vt,
    onTimeChange: (q) => {
      it.current = q;
    }
  };
}
const df = Object.freeze(["SECTION", "ENTRY", "DROP", "BREAK"]), Xu = Object.freeze([
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
]), Ka = (c, o) => Math.round(Number(c) * o);
function gf(c, o) {
  const r = String(c).trim().toUpperCase(), s = String(o).trim().toUpperCase().replace(/ +/g, " ");
  if (!df.includes(r)) throw new Error("Cue type must be SECTION, ENTRY, DROP or BREAK");
  const g = /^([A-Z][A-Z -]*?)(?: ([1-9][0-9]{0,2}|A|B|FINAL))?$/.exec(s);
  if (!g || !Xu.includes(g[1]) || s.length > 64)
    throw new Error("Use a standard section (INTRO, VERSE 1, CHORUS, BUILD 1, DROP 1, OUTRO, etc.)");
  return { type: r, section: s, label: `[${r}: ${s}]` };
}
const yf = (c) => ({ ...c, lines: c.lines.map((o) => ({ ...o })), words: c.words.map((o) => ({ ...o })), cues: c.cues.map((o) => ({ ...o })), fixed_clock: { ...c.fixed_clock } });
function Vn(c, o, r, s) {
  if (!Number.isSafeInteger(c) || c < o || c > r) throw new Error(`${s} cannot cross its parent, another event or source duration`);
  return c;
}
function rb(c, o = "start_frame") {
  return c.every((r, s) => s === 0 || r[o] >= c[s - 1][o]);
}
function fb(c, o, r) {
  const s = yf(c), g = c.sample_rate, m = c.num_frames;
  if (!Number.isSafeInteger(g) || !Number.isSafeInteger(m) || g < 1 || m < 2) throw new Error("Invalid source-frame metadata");
  if (o === "cue") {
    const p = s.cues.findIndex((N) => N.id === r.id);
    if (p < 0) throw new Error("Cue not found");
    const _ = s.cues[p], C = gf(r.type ?? _.type, r.section ?? _.section), j = Vn(Ka(r.start, g), 0, m - 1, "Cue");
    if (s.cues[p] = { ...s.cues[p], frame: j, type: C.type, section: C.section }, !rb(s.cues, "frame")) throw new Error("Cue movement must preserve chronological order");
  } else if (o === "line") {
    const p = s.lines.findIndex((A) => A.id === r.id);
    if (p < 0) throw new Error("Lyric line not found");
    const _ = s.lines[p], C = Vn(Ka(r.start, g), 0, m - 1, "Line"), j = Vn(Ka(r.end, g), C + 1, m, "Line");
    if (p > 0 && C < s.lines[p - 1].end_frame || p + 1 < s.lines.length && j > s.lines[p + 1].start_frame)
      throw new Error("Lyric line cannot cross neighbouring line bounds");
    s.lines[p] = { ..._, start_frame: C, end_frame: j };
    const N = C - _.start_frame, v = j - C === _.end_frame - _.start_frame;
    for (const A of s.words) if (A.line_id === _.id && (v && (A.start_frame += N, A.end_frame += N), A.start_frame < C || A.end_frame > j))
      throw new Error("Line edit would cut off a word; adjust its words first");
  } else if (o === "word") {
    const p = s.words.findIndex((H) => H.id === r.id);
    if (p < 0) throw new Error("Word not found");
    const _ = s.words[p], C = s.lines.find((H) => H.id === _.line_id);
    if (!C) throw new Error("Word parent line missing");
    const j = Vn(Ka(r.start, g), C.start_frame, C.end_frame - 1, "Word"), N = Vn(Ka(r.end, g), j + 1, C.end_frame, "Word"), v = s.words.filter((H) => H.line_id === _.line_id), A = v.findIndex((H) => H.id === _.id);
    if (A > 0 && j < v[A - 1].end_frame || A + 1 < v.length && N > v[A + 1].start_frame)
      throw new Error("Word cannot overlap a neighbour within the same lyric line");
    s.words[p] = { ..._, start_frame: j, end_frame: N };
  } else throw new Error("Expected line, word or cue edit");
  return s.review_status = "draft", s;
}
function ob(c, o, r, s = {}) {
  const g = yf(c), m = c.sample_rate, p = Vn(Ka(r, m), 0, c.num_frames - 1, "Playhead"), _ = new Set([...c.lines, ...c.words, ...c.cues].map((N) => N.id)), C = { line: "line", word: "word", cue: "cue" }[o];
  if (!C) throw new Error("Unknown timing track");
  let j;
  for (let N = 1; N <= 1e5 && (j = `${C}-edit-${N}`, !!_.has(j)); N++)
    ;
  if (_.has(j)) throw new Error("Too many events");
  if (o === "cue") {
    const { type: N, section: v } = gf(s.type || "SECTION", s.section || "INTRO");
    g.cues.push({ id: j, frame: p, type: N, section: v }), g.cues.sort((A, H) => A.frame - H.frame);
  } else if (o === "line") {
    const N = String(s.text || "").trim();
    if (!N) throw new Error("Type lyric text before adding a line");
    const v = c.lines.find((V) => V.start_frame > p), A = [...c.lines].reverse().find((V) => V.start_frame <= p);
    if (A && p < A.end_frame) throw new Error("Playhead is inside an existing line");
    const H = Math.min(c.num_frames, v?.start_frame ?? c.num_frames, p + Math.round(m * 2));
    if (H <= p) throw new Error("No room for a new line");
    g.lines.push({ id: j, start_frame: p, end_frame: H, text: N }), g.lines.sort((V, at) => V.start_frame - at.start_frame);
  } else {
    const N = g.lines.find(($) => $.id === s.lineId);
    if (!N) throw new Error("Select a lyric line before adding its word");
    const v = String(s.word || "").trim();
    if (!v) throw new Error("Type word text before adding a word");
    if (p < N.start_frame || p >= N.end_frame) throw new Error("Playhead must be within selected lyric line");
    const A = g.words.filter(($) => $.line_id === N.id), H = A.find(($) => $.start_frame > p), V = [...A].reverse().find(($) => $.start_frame <= p);
    if (V && V.end_frame > p) throw new Error("Playhead is already within another word");
    const at = Math.min(N.end_frame, H?.start_frame ?? N.end_frame, p + Math.round(m * 0.25));
    if (at <= p) throw new Error("No room within the selected lyric line");
    g.words.push({ id: j, line_id: N.id, start_frame: p, end_frame: at, word: v }), g.words.sort(($, vt) => $.start_frame - vt.start_frame);
  }
  return g.review_status = "draft", g;
}
function db(c, o, r) {
  const s = yf(c), g = { line: "lines", word: "words", cue: "cues" }[o];
  if (!g) throw new Error("Invalid track");
  if (o === "line" && s.words.some((m) => m.line_id === r)) throw new Error("Delete or reassign words before deleting their line");
  return s[g] = s[g].filter((m) => m.id !== r), s.review_status = "draft", s;
}
const pc = async (c, o = "GET", r = null, s = "") => {
  const g = await fetch(`/api/${c}/song-timing${s}`, {
    method: o,
    headers: r ? { "Content-Type": "application/json" } : void 0,
    body: r ? JSON.stringify(r) : void 0,
    cache: "no-store"
  }), m = await g.json();
  if (!g.ok) throw new Error(m.detail || `Timing edits HTTP ${g.status}`);
  return m;
}, s0 = (c, o) => c / o, qu = (c, o) => `stemlab-${o.slice(0, 12)}-${c}`;
function mb(c, o, r) {
  const s = new Blob([c], { type: r }), g = URL.createObjectURL(s), m = document.createElement("a");
  try {
    m.href = g, m.download = o, document.body.appendChild(m), m.click(), m.remove();
  } finally {
    window.setTimeout(() => URL.revokeObjectURL(g), 1e3);
  }
}
function hb(c, o, r) {
  const [s, g] = U.useState(null), [m, p] = U.useState(!1), [_, C] = U.useState(null), [j, N] = U.useState(!1), [v, A] = U.useState(!1), [H, V] = U.useState(!1), [at, $] = U.useState({ kind: "line", id: null }), [vt, X] = U.useState(""), [W, Tt] = U.useState(!1), [St, gt] = U.useState(0.15), [Z, mt] = U.useState(!1), [Ft, F] = U.useState({ start: 0, end: 1 / 0 }), [I, _t] = U.useState(""), [Xt, Wt] = U.useState(""), [yt, B] = U.useState("SECTION"), [Y, G] = U.useState("INTRO"), [it, ft] = U.useState("lines"), [It, Ht] = U.useState("bundle"), Me = U.useRef(0), b = U.useRef(null), L = U.useRef(null), P = U.useRef(c), K = U.useRef(!1);
  L.current = s;
  const ht = U.useCallback(async (O = !1) => {
    if (!(!O && L.current && j && !window.confirm("Discard unsaved song timing changes?")))
      try {
        const J = await pc(c);
        if (!J.available) {
          X(J.reason || "Waiting for exact source audio");
          return;
        }
        if (P.current !== c) return;
        g(J.document), p(J.saved), C(J.revision), N(!1), $({ kind: "line", id: J.document.lines[0]?.id ?? null }), X(J.warnings?.join(" · ") || "Song timing loaded · source evidence unchanged");
      } catch (J) {
        X(J.message);
      }
  }, [c, j]);
  U.useEffect(() => {
    P.current = c, g(null), C(null), N(!1), $({ kind: "line", id: null }), ht(!0);
    const O = window.setInterval(() => {
      !L.current && !K.current && ht(!0);
    }, 5e3);
    return () => window.clearInterval(O);
  }, [c]);
  const ot = U.useCallback((O) => {
    try {
      const J = L.current;
      if (!J) return;
      const zt = O(J);
      g(zt), N(!0), X("Unsaved song timing edits · original evidence preserved");
    } catch (J) {
      X(J.message);
    }
  }, []), ct = s?.sample_rate || 1, tt = s ? s.num_frames / ct : Math.max(0, o), nt = s?.lines.find((O) => O.id === (at.kind === "line" ? at.id : s?.words.find((J) => J.id === at.id)?.line_id)) ?? s?.lines[0] ?? null, Vt = at.kind, Rt = s?.[Vt === "line" ? "lines" : Vt === "word" ? "words" : "cues"].find((O) => O.id === at.id) ?? null, re = !!(r?.map?.beats?.length && r?.map?.source_audio?.sha256 === c), ne = r?.revision ?? null, Zt = s?.clock_mode === "variable", q = U.useMemo(() => s ? s.clock_mode === "variable" ? re ? { ...r.map, mode: "variable" } : null : { mode: "fixed", bpm: s.fixed_clock.bpm, firstBeatSeconds: s.fixed_clock.first_beat_frame / ct } : null, [s, re, r?.map, ct]), lt = (O) => {
    ot((J) => ({ ...J, clock_mode: O, beat_revision: O === "variable" ? ne : null, review_status: "draft" }));
  }, Mt = (O, J) => ot((zt) => ({ ...zt, fixed_clock: { ...zt.fixed_clock, [O]: J }, review_status: "draft" })), jt = (O, J) => ot((zt) => fb(zt, O, J)), Te = (O) => ot((J) => ob(J, O, Me.current, {
    text: I,
    word: Xt,
    lineId: nt?.id,
    type: yt,
    section: Y
  })), je = (O, J, zt) => ot((Dt) => {
    if (!zt.trim() || /\r|\n|[\x00-\x1f]/.test(zt)) throw new Error("Text must be nonempty, without newlines");
    const Pt = O === "line" ? "lines" : "words", _a = O === "line" ? "text" : "word";
    return { ...Dt, [Pt]: Dt[Pt].map((Wa) => Wa.id === J ? { ...Wa, [_a]: zt.trim() } : Wa), review_status: "draft" };
  }), $e = (O, J, zt) => ot((Dt) => {
    const Pt = gf(J, zt);
    return { ...Dt, cues: Dt.cues.map((_a) => _a.id === O ? { ..._a, type: Pt.type, section: Pt.section } : _a), review_status: "draft" };
  }), Xl = async () => {
    if (s) {
      A(!0), K.current = !0;
      try {
        if (Zt && (r?.dirty || !re)) throw new Error("Save/reload the corrected beat map first; an enabled variable clock must refer to the current real beat map");
        const O = await pc(c, "PUT", { document: s, expected_revision: _ });
        g(O.document), C(O.revision), p(!0), N(!1), X("Saved exact source-frame corrections · original canonical, cue and ASR files unchanged");
      } catch (O) {
        X(O.message);
      } finally {
        A(!1), K.current = !1;
      }
    }
  }, ml = async () => {
    if (s) {
      A(!0), K.current = !0;
      try {
        if (Zt && (r?.dirty || !re)) throw new Error("Save and verify the exact beat map before exporting variable-clock timing");
        const O = await pc(c, "POST", { document: s }, "/preview"), J = {
          bundle: [JSON.stringify(O, null, 2) + `
`, qu("timing-bundle", c) + ".json", "application/json"],
          lines: [O.line_lrc, qu("lines", c) + ".lrc", "text/plain;charset=utf-8"],
          words: [O.word_tsv, qu("words", c) + ".tsv", "text/tab-separated-values;charset=utf-8"],
          wordjson: [JSON.stringify(O.word_json, null, 2) + `
`, qu("words", c) + ".json", "application/json"],
          cues: [O.cue_lrc, qu("cues", c) + ".lrc", "text/plain;charset=utf-8"]
        };
        mb(...J[It]), X(`Exported ${It} · source-bound clock and all timing forms remain available via the bundle`);
      } catch (O) {
        X(O.message);
      } finally {
        A(!1), K.current = !1;
      }
    }
  }, Sa = async (O) => {
    const J = O.target.files?.[0];
    if (O.target.value = "", !J || !s) return;
    if (J.size > 1048576) {
      X("Timing import limited to 1 MiB");
      return;
    }
    const zt = J.name.split(".").at(-1).toLowerCase();
    A(!0), K.current = !0;
    try {
      const Dt = await pc(c, "POST", { document: s, kind: it, format: zt, text: await J.text() }, "/import");
      g(Dt.document), N(!0), X(`Imported ${it} for review; not saved until Save corrections`);
    } catch (Dt) {
      X(Dt.message);
    } finally {
      A(!1), K.current = !1;
    }
  }, Vl = (O) => {
    const J = O.start_frame ?? O.frame, zt = O.end_frame ?? J;
    return J / ct <= Ft.end + 0.01 && zt / ct >= Ft.start - 0.01;
  }, Fe = (O, J) => ({
    id: O.id,
    label: J === "cue" ? `[${O.type}: ${O.section}]` : J === "word" ? O.word : O.text,
    ...J === "cue" ? { type: O.type, section: O.section } : {},
    start: s0(O.start_frame ?? O.frame, ct),
    ...J === "cue" ? {} : { end: s0(O.end_frame, ct) },
    ...J === "word" ? { parentId: O.line_id } : {}
  }), Ql = s?.lines || [], R = (s?.words || []).filter((O) => O.line_id === nt?.id), rt = (O, J, zt = null) => ({
    id: `timing:${O}`,
    kind: `timing-${O}`,
    title: O === "line" ? "Lyric lines · editable" : O === "word" ? `Words · ${nt?.text || "select a line"}` : "Cue sections · editable",
    meta: `${J.length} ${O} events · drag or arrow to adjust · ${q?.mode || "no clock"} match`,
    height: O === "word" ? 88 : 94,
    content: {
      type: "timing",
      kind: O,
      clock: q,
      editable: !0,
      snap: W,
      toleranceSeconds: St,
      items: J.filter(Vl).slice(0, 1600).map((Dt) => Fe(Dt, O)),
      parents: zt ? zt.map((Dt) => ({ id: Dt.id, start: Dt.start_frame / ct, end: Dt.end_frame / ct })) : void 0,
      selectedId: at.kind === O ? at.id : null,
      onSelect: (Dt) => $({ kind: O, id: Dt }),
      onEdit: (Dt) => jt(O, Dt)
    }
  }), Ot = s && H ? [
    rt("line", Ql),
    rt("word", R, Ql),
    rt("cue", s.cues)
  ] : [], oe = /* @__PURE__ */ d.jsxs("section", { className: "stemlab-timing-panel", "aria-label": "Editable lyric, word and cue timing", children: [
    /* @__PURE__ */ d.jsxs("header", { children: [
      /* @__PURE__ */ d.jsx("strong", { children: "Song timing · line lyrics, words & cue sections" }),
      /* @__PURE__ */ d.jsx("span", { children: s ? `${s.lines.length} lines · ${s.words.length} words · ${s.cues.length} cues · ${j ? "unsaved" : "saved/seeded"}` : "Awaiting master" }),
      /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => V((O) => !O), children: H ? "Hide timing editor" : "Show timing editor" })
    ] }),
    H && s && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsx("p", { children: "Line, word and cue edits are kept in a separate source-bound document. Choose a lyric line to adjust its individual words. Cue names must follow the established [SECTION: VERSE 1] / [DROP: CHORUS 1] convention." }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-timing-fields", children: [
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Timing clock ",
          /* @__PURE__ */ d.jsxs("select", { "aria-label": "Timing clock", value: s.clock_mode, onChange: (O) => lt(O.target.value), children: [
            /* @__PURE__ */ d.jsx("option", { value: "fixed", children: "Fixed BPM + Beat 1 offset" }),
            /* @__PURE__ */ d.jsx("option", { value: "variable", disabled: !re, children: "Corrected variable BPM beat map" })
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
              onChange: (O) => Mt("bpm", Number(O.target.value))
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
              max: tt,
              step: ".001",
              value: s.fixed_clock.first_beat_frame / ct,
              onChange: (O) => Mt("first_beat_frame", Ka(O.target.value, ct))
            }
          )
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          /* @__PURE__ */ d.jsx("input", { type: "checkbox", checked: W, onChange: (O) => Tt(O.target.checked) }),
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
              value: Math.round(St * 1e3),
              onChange: (O) => gt(Math.max(0, Math.min(1, Number(O.target.value) / 1e3)))
            }
          )
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          /* @__PURE__ */ d.jsx("input", { type: "checkbox", checked: Z, onChange: (O) => mt(O.target.checked) }),
          "Beat grid overlay"
        ] })
      ] }),
      Zt && !re && /* @__PURE__ */ d.jsx("p", { role: "alert", children: "Variable BPM is selected but its source-bound beat map is unavailable; no silent fixed-BPM downgrade." }),
      Zt && r?.dirty && /* @__PURE__ */ d.jsx("p", { role: "alert", children: "Save the beat-map corrections before saving/exporting lyric and cue timing changes." }),
      Zt && re && s.beat_revision !== ne && /* @__PURE__ */ d.jsxs("p", { role: "alert", children: [
        "The saved beat-map revision has changed. Review its timing, then explicitly rebind these lyrics and cues to that revision. ",
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: r.dirty, onClick: () => ot((O) => ({ ...O, beat_revision: ne, review_status: "draft" })), children: "Rebind to reviewed beat-map revision" })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-timing-fields", children: [
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Selected line ",
          /* @__PURE__ */ d.jsxs("select", { "aria-label": "Selected lyric line", value: nt?.id || "", onChange: (O) => $({ kind: "line", id: O.target.value }), children: [
            /* @__PURE__ */ d.jsx("option", { value: "", children: "Choose line" }),
            s.lines.map((O) => /* @__PURE__ */ d.jsx("option", { value: O.id, children: O.text.slice(0, 75) }, O.id))
          ] })
        ] }),
        Rt && Vt !== "cue" && /* @__PURE__ */ d.jsxs("label", { children: [
          Vt === "line" ? "Line text" : "Word text",
          /* @__PURE__ */ d.jsx(
            "input",
            {
              "aria-label": "Selected text",
              value: Vt === "line" ? Rt.text : Rt.word,
              onChange: (O) => je(Vt, Rt.id, O.target.value)
            }
          )
        ] }),
        Rt && Vt === "cue" && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
          /* @__PURE__ */ d.jsxs("label", { children: [
            "Cue type ",
            /* @__PURE__ */ d.jsx("select", { value: Rt.type, onChange: (O) => $e(Rt.id, O.target.value, Rt.section), children: df.map((O) => /* @__PURE__ */ d.jsx("option", { value: O, children: O }, O)) })
          ] }),
          /* @__PURE__ */ d.jsxs("label", { children: [
            "Standard section ",
            /* @__PURE__ */ d.jsx(
              "select",
              {
                value: Xu.find((O) => Rt.section === O || Rt.section.startsWith(O + " ")) || "INTRO",
                onChange: (O) => $e(Rt.id, Rt.type, O.target.value),
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
                value: Rt.section.match(/ (\d+|A|B|FINAL)$/)?.[1] || "",
                onChange: (O) => {
                  const J = Xu.find((zt) => Rt.section === zt || Rt.section.startsWith(zt + " ")) || "INTRO";
                  $e(Rt.id, Rt.type, J + (O.target.value ? " " + O.target.value : ""));
                },
                children: [
                  /* @__PURE__ */ d.jsx("option", { value: "", children: "None" }),
                  Array.from({ length: 64 }, (O, J) => String(J + 1)).concat(["A", "B", "FINAL"]).map((O) => /* @__PURE__ */ d.jsx("option", { value: O, children: O }, O))
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-timing-fields", children: [
        /* @__PURE__ */ d.jsxs("label", { children: [
          "New line text ",
          /* @__PURE__ */ d.jsx("input", { value: I, placeholder: "Lyrics line", onChange: (O) => _t(O.target.value) })
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => Te("line"), children: "Add line at playhead" }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "New word ",
          /* @__PURE__ */ d.jsx("input", { value: Xt, placeholder: "Single word", onChange: (O) => Wt(O.target.value) })
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: !nt, onClick: () => Te("word"), children: "Add word inside selected line" })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-timing-fields", children: [
        /* @__PURE__ */ d.jsxs("label", { children: [
          "New cue type ",
          /* @__PURE__ */ d.jsx("select", { value: yt, onChange: (O) => B(O.target.value), children: df.map((O) => /* @__PURE__ */ d.jsx("option", { children: O }, O)) })
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Section ",
          /* @__PURE__ */ d.jsx("select", { value: Y, onChange: (O) => G(O.target.value), children: Xu.map((O) => /* @__PURE__ */ d.jsx("option", { children: O }, O)) })
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => Te("cue"), children: "Add cue at playhead" }),
        /* @__PURE__ */ d.jsxs("button", { type: "button", disabled: !Rt, onClick: () => ot((O) => db(O, Vt, at.id)), children: [
          "Delete selected ",
          Vt
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          /* @__PURE__ */ d.jsx("input", { type: "checkbox", checked: s.review_status === "artist_confirmed", onChange: (O) => ot((J) => ({ ...J, review_status: O.target.checked ? "artist_confirmed" : "draft" })) }),
          "Artist-reviewed timing"
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-timing-actions", children: [
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: v || !j, onClick: Xl, children: "Save source-frame corrections" }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Export format ",
          /* @__PURE__ */ d.jsxs("select", { value: It, onChange: (O) => Ht(O.target.value), children: [
            /* @__PURE__ */ d.jsx("option", { value: "bundle", children: "Complete JSON bundle" }),
            /* @__PURE__ */ d.jsx("option", { value: "lines", children: "Line LRC" }),
            /* @__PURE__ */ d.jsx("option", { value: "words", children: "Word TSV" }),
            /* @__PURE__ */ d.jsx("option", { value: "wordjson", children: "Word JSON" }),
            /* @__PURE__ */ d.jsx("option", { value: "cues", children: "Named cue LRC" })
          ] })
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: v, onClick: ml, children: "Download selection" }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Import track ",
          /* @__PURE__ */ d.jsxs("select", { value: it, onChange: (O) => ft(O.target.value), children: [
            /* @__PURE__ */ d.jsx("option", { value: "lines", children: "Per-line LRC" }),
            /* @__PURE__ */ d.jsx("option", { value: "words", children: "Per-word LRC/TSV/JSON" }),
            /* @__PURE__ */ d.jsx("option", { value: "cues", children: "Section-cue LRC" })
          ] })
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: v, onClick: () => b.current?.click(), children: "Choose timing file" }),
        /* @__PURE__ */ d.jsx("input", { ref: b, type: "file", hidden: !0, accept: it === "words" ? ".lrc,.tsv,.json" : ".lrc", onChange: Sa }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: v, onClick: () => ht(), children: "Reload saved" })
      ] }),
      /* @__PURE__ */ d.jsx("small", { children: "Word positions must stay inside their lyric line. An off-grid word/cue is preserved until you explicitly drag or enable nearby-beat snapping. Pips=64/beat, DanceMoves ticks=16/beat. LRC/TSV exports round timestamps; the JSON retains native frames." })
    ] }),
    H && !s && /* @__PURE__ */ d.jsx("p", { children: "Waiting for decoded source audio; no lyric or cue times are invented." }),
    vt && /* @__PURE__ */ d.jsx("output", { role: "status", className: "stemlab-timing-status", children: vt })
  ] });
  return { clock: q, lanes: Ot, panel: oe, gridVisible: Z, onWindowChange: F, onTimeChange: (O) => {
    Me.current = O;
  } };
}
function vb(c, o) {
  if (!c || c.schema !== "stemlab.loops.v1") return [];
  const r = c.sample_rate;
  return !Number.isSafeInteger(r) || r <= 0 ? [] : (c.loops || []).flatMap((s) => {
    if (!/^(verse|chorus)-\d+-\d+$/.test(s.id) || !Number.isSafeInteger(s.start_sample) || !Number.isSafeInteger(s.end_sample) || s.start_sample < 0 || s.end_sample <= s.start_sample || s.end_sample > c.source_frames) return [];
    const g = encodeURIComponent(`${c.source_sha256}:${s.start_sample}:${s.end_sample}`);
    return [{
      id: s.id,
      label: `${s.section_label} · ${s.bars} bar${s.bars === 1 ? "" : "s"}`,
      startSample: s.start_sample,
      endSample: s.end_sample,
      sampleRate: r,
      // Exact native-rate PCM excerpt, computed read-only whether or not --export-loops was used.
      audioSrc: `/api/${o}/loops/${encodeURIComponent(s.id)}/audio?v=${g}`,
      downloadUrl: s.file && /^audio\/[a-zA-Z0-9._-]+\.wav$/.test(s.file) ? `/${o}/deep/loops/${s.file.split("/").map(encodeURIComponent).join("/")}` : void 0
    }];
  });
}
function gb(c) {
  const [o, r] = U.useState({ report: null, error: "" });
  U.useEffect(() => {
    let g = !0, m, p = "";
    const _ = new AbortController();
    r({ report: null, error: "" });
    const C = async () => {
      try {
        const j = await fetch(`/${c}/deep/loops/loops.json`, {
          cache: "no-store",
          signal: _.signal
        });
        if (!g) return;
        if (j.status === 404)
          p = "", r({ report: null, error: "" });
        else {
          if (!j.ok) throw new Error(`Loop report: HTTP ${j.status}`);
          const N = await j.json();
          if (N.schema === "stemlab.loop-availability.v1" && N.status === "not-analysed") {
            r({ report: null, error: "", note: N.reason });
            return;
          }
          if (N.schema !== "stemlab.loops.v1") throw new Error("Unsupported loop report schema");
          const v = JSON.stringify(N);
          g && v !== p && (r({ report: N, error: "" }), p = v);
        }
      } catch (j) {
        g && j.name !== "AbortError" && (p = "", r({ report: null, error: j.message }));
      } finally {
        g && (m = window.setTimeout(C, 2500));
      }
    };
    return C(), () => {
      g = !1, _.abort(), window.clearTimeout(m);
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
const xe = (c) => document.querySelector(c), bb = xe("#uploadView"), bf = xe("#timelineView"), $a = xe("#dropZone"), Zu = xe("#fileInput"), b0 = xe("#chooseButton"), p0 = xe("#uploadProgressWrap"), _c = xe("#uploadProgress"), Ec = xe("#uploadLabel"), Xn = xe("#connectionBadge"), S0 = xe("#canonicalBpm"), _0 = xe("#canonicalLyrics"), E0 = xe("#canonicalTiming"), mf = xe("#knownInfoStatus"), pb = xe("#loadArcadiansReference"), Sb = xe("#loadArcadiansHero"), _b = Array.from(bf.children), pf = document.createElement("div");
pf.id = "timelineRoot";
bf.replaceChildren(pf);
for (const c of _b) c.remove();
const Eb = zy.createRoot(pf), Tb = /* @__PURE__ */ new Set(["wav", "flac", "mp3", "ogg", "opus", "m4a", "aif", "aiff"]);
let hf = {};
function Nb(c) {
  const o = String(c).split("/").pop() || "", r = o.lastIndexOf(".");
  return r >= 0 ? o.slice(r + 1).toLowerCase() : "";
}
function xl(c) {
  return String(c).replace(/^stems\//, "").replace(/^spectrograms\//, "").replace(/^vamp\/data\//, "Vamp · ").replace(/^beats\//, "Beats · ").replace(/^speech\//, "Speech · ").replace(/^deep\//, "Deep · ").replace(/[_-]+/g, " ");
}
function Sf(c, o) {
  return `/${c}/${o.split("/").map(encodeURIComponent).join("/")}`;
}
function Tc(c, o, r = "Generated analysis artifact") {
  return { type: "artifact", note: r, href: o === "__source__" ? `/api/${c}/source` : Sf(c, o) };
}
async function ul(c, o) {
  const r = await fetch(Sf(c, o), { cache: "no-store" });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}
function dl(c, o = 2, r = "") {
  const s = Number(c);
  return Number.isFinite(s) ? `${s.toFixed(o)}${r}` : "—";
}
function Za(c, o, r, s, g = "feature") {
  const m = s.filter(([, p]) => p != null && p !== "");
  return {
    id: c,
    title: o,
    meta: r,
    kind: g,
    content: {
      type: "summary",
      items: (m.length ? m : [["status", "analysis available"]]).map(([p, _]) => ({ label: p, value: _ }))
    }
  };
}
function Nc(c) {
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
        const s = Number(r.start), g = Number(r.values?.[0]);
        return Number.isFinite(s) && Number.isFinite(g) && g > 0 ? [{ time: s, value: g }] : [];
      }) };
    case "matrix":
      return { type: "matrix", rows: o.map((r) => r.values || []).filter((r) => r.length) };
    case "notes":
      return { type: "notes", items: o.flatMap((r) => {
        const s = Number(r.values?.[0]), g = Number(r.start);
        if (!Number.isFinite(s) || s <= 0 || !Number.isFinite(g)) return [];
        const m = Number(r.end);
        return [{ start: g, end: Number.isFinite(m) && m > g ? m : g + 0.12, value: s, label: r.label }];
      }) };
    case "segments":
      return { type: "blocks", items: Nc(o) };
    case "events":
      return { type: "markers", items: o.flatMap((r) => Number.isFinite(Number(r.start)) ? [{ time: Number(r.start) }] : []) };
    default:
      return { type: "artifact", note: o[0]?.label || o[0]?.values?.join(", ") || c.title || "analysis" };
  }
}
async function T0(c, o, r, s, g) {
  const m = new URLSearchParams({ path: g, points: "12000" }), p = await fetch(`/api/${c}/waveform?${m}`);
  if (!p.ok) return { id: o, title: r, meta: s, kind: "artifact", content: Tc(c, g, `waveform unavailable (${p.status})`) };
  const _ = await p.json();
  return { id: o, title: r, meta: s, kind: "waveform", content: { type: "waveform", min: _.min || [], max: _.max || [] }, duration: Number(_.duration_seconds) || 0 };
}
async function Mb(c, o) {
  const r = o.path, s = `file:${r}`, g = Nb(r);
  if (r === "canonical.json" || r.startsWith("deep/loops/")) return null;
  if (Tb.has(g)) return T0(c, s, xl(r), "audio waveform", r);
  if (r.startsWith("spectrograms/") && g === "npz") {
    const m = new URLSearchParams({ path: r, max_width: "8192", max_height: "768" });
    return { id: s, title: xl(r), meta: "spectrogram data · exact song timeline", kind: "spectrogram", content: { type: "image", src: `/api/${c}/spectrogram?${m}`, alt: `${xl(r)} spectrogram` } };
  }
  if (r.startsWith("spectrograms/") && g === "png")
    return { id: s, title: xl(r), meta: "rendered spectrogram PNG", kind: "image", content: { type: "image", src: Sf(c, r), alt: `${xl(r)} rendered spectrogram` } };
  try {
    if (r === "analysis.json") {
      const m = await ul(c, r);
      return {
        id: s,
        title: xl(r),
        meta: "analysis provenance",
        kind: "artifact",
        sourceMap: m.spectrograms || [],
        content: Tc(c, r)
      };
    }
    if (r.startsWith("beats/") && g === "json") {
      const m = await ul(c, r), p = new Set((m.downbeats || []).map((_) => Number(_).toFixed(3)));
      return { id: s, title: xl(r), meta: "beat / downbeat events", kind: "events", content: { type: "markers", items: (m.beats || []).flatMap((_) => {
        const C = Number(_);
        return Number.isFinite(C) ? [{ time: C, emphasis: p.has(C.toFixed(3)), label: p.has(C.toFixed(3)) ? "Downbeat" : "Beat" }] : [];
      }) } };
    }
    if (r.startsWith("vamp/data/") && g === "json") {
      const m = await ul(c, r);
      return { id: s, title: xl(r), meta: "Vamp feature analysis", kind: "feature", content: xb(m) };
    }
    if (r === "speech/whisper.json") {
      const m = await ul(c, r);
      return { id: s, title: "Speech · Whisper words", meta: "word-aligned transcript", kind: "words", content: { type: "blocks", items: (m.words || []).flatMap((p) => {
        const _ = Number(p.start), C = Number(p.end);
        return Number.isFinite(_) ? [{ start: _, end: Number.isFinite(C) ? Math.max(_ + 0.03, C) : _ + 0.03, label: String(p.word || "").trim() }] : [];
      }) } };
    }
    if (r === "deep/structure/structure.json" || r === "deep/song_map/song_map.json") {
      const m = await ul(c, r), p = r.includes("song_map");
      return { id: s, title: p ? "Deep · song map" : "Deep · functional structure", meta: p ? "section-level sonic / rhythm / harmony / lyric fusion" : "All-In-One · functional song sections", kind: "deep-structure", content: { type: "blocks", items: Nc(p ? m.sections : m.segments) } };
    }
    if (r === "deep/harmony/harmony.json") {
      const m = await ul(c, r), p = m.chords?.collapsed_progression || [];
      return p.length ? { id: s, title: "Deep · harmony", meta: "collapsed chord progression + key evidence", kind: "deep-harmony", content: { type: "blocks", items: Nc(p) } } : Za(s, "Deep · harmony", "collapsed chord progression + key evidence", [["key", m.vamp_key || m.independent_key_candidates_from_nnls_chroma?.[0]?.key || "—"], ["tuning", m.tuning_hz ? `${Number(m.tuning_hz).toFixed(1)} Hz` : "—"]], "deep-harmony");
    }
    if (r === "deep/lyrics/lyrics.json") {
      const m = await ul(c, r), p = (m.lines || []).filter((_) => Number.isFinite(Number(_.start)) && Number.isFinite(Number(_.end)));
      return p.length ? { id: s, title: "Deep · rhyme & prosody", meta: "phonetic rhyme, repetition and delivery", kind: "deep-lyrics", content: { type: "blocks", items: Nc(p) } } : Za(s, "Deep · rhyme & prosody", "phonetic rhyme, repetition and delivery", [["rhyme scheme", m.rhyme?.scheme || "—"], ["lines", m.line_count ?? "—"], ["words", m.word_count ?? "—"]], "deep-lyrics");
    }
    if (r === "deep/sonic/sonic.json") {
      const m = await ul(c, r);
      return Za(s, "Deep · sonic profile", "loudness · dynamics · timbre · stereo", [["LUFS", dl(m.loudness?.integrated_lufs_bs1770, 1)], ["crest", dl(m.loudness?.crest_factor_db, 1, " dB")], ["RMS range", dl(m.loudness?.short_term_rms_range_db_p95_p10, 1, " dB")], ["centroid", dl(m.timbre?.spectral_centroid_hz_mean, 0, " Hz")], ["stereo corr", dl(m.stereo?.left_right_correlation, 2)]]);
    }
    if (r === "deep/rhythm/rhythm.json") {
      const m = await ul(c, r);
      return Za(s, "Deep · groove", "meter · stability · swing · syncopation evidence", [["tempo", dl(m.tempo?.median_bpm, 2, " BPM")], ["meter", m.meter?.estimated_beats_per_bar ? `${m.meter.estimated_beats_per_bar}/4-ish` : "—"], ["swing", dl(m.groove?.swing_ratio_long_to_short, 2, ":1")], ["offbeat energy", dl(m.groove?.offbeat_onset_energy_ratio, 3)], ["onsets/s", dl(m.groove?.onset_density_per_second, 2)]]);
    }
    if (r === "deep/semantic_text/semantic_text.json") {
      const m = await ul(c, r);
      return Za(s, "Deep · lyric semantics", "sentence embedding theme similarities · not probabilities", (m.theme_similarity || []).slice(0, 7).map((p) => [p.theme, dl(p.similarity, 3)]));
    }
    if (r === "deep/semantic_audio/semantic_audio.json") {
      const m = await ul(c, r), p = Object.entries(m.prompt_sets || {}).flatMap(([_, C]) => (C || []).slice(0, 2).map((j) => [`${_}: ${j.prompt}`, dl(j.similarity, 3)]));
      return Za(s, "Deep · audio semantics", "MuQ-MuLan zero-shot similarities · CC-BY-NC weights", p);
    }
    if (r === "deep/summary.json") {
      const m = await ul(c, r), p = Object.entries(m.analyses || {}).map(([_, C]) => [_, C.available ? "ready" : "unavailable"]);
      return (m.errors || []).length && p.push(["errors", m.errors.length]), Za(s, "Deep · analysis summary", "cross-domain action inventory", p);
    }
  } catch (m) {
    return { id: s, title: xl(r), meta: "analysis artifact", kind: "artifact", content: Tc(c, r, m.message) };
  }
  return { id: s, title: xl(r), meta: `${g || "file"} · ${Number(o.bytes || 0).toLocaleString()} bytes`, kind: "artifact", content: Tc(c, r) };
}
function Ob(c) {
  const o = [];
  c?.lyrics && o.push({ id: "canonical:lyrics", title: "Canonical lyrics", meta: "known reference text", kind: "canonical-lyrics", height: 104, content: { type: "text", text: c.lyrics } });
  const r = Array.isArray(c?.lyric_timing) ? c.lyric_timing : [];
  return r.length && o.push({ id: "canonical:timing", title: "Canonical lyric timing", meta: `${r.length} timed lyric event${r.length === 1 ? "" : "s"}`, kind: "canonical-timing", height: 104, content: { type: "blocks", items: r.flatMap((s) => {
    const g = Number(s.start), m = Number(s.end);
    return Number.isFinite(g) && g >= 0 ? [{ start: g, end: Number.isFinite(m) && m > g ? m : g + 0.75, label: String(s.text || ""), className: "stemlab-canonical-lyric" }] : [];
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
  const r = gb(c), [s, g] = U.useState([]), [m, p] = U.useState(0), _ = sb(c, m), C = hb(c, m, _), [j, N] = U.useState({ state: "submitted" }), [v, A] = U.useState({ bpm: null, lyrics: null, lyric_timing: [] }), [H, V] = U.useState(null), [at, $] = U.useState("canonical"), [vt, X] = U.useState("consensus"), [W, Tt] = U.useState([]), St = U.useRef(/* @__PURE__ */ new Set()), gt = U.useCallback((B, Y) => {
    Y && Tt((G) => [...G.slice(-799), { stream: B === "stderr" ? "stderr" : "stdout", text: Y }]);
  }, []), Z = U.useCallback(async (B) => {
    if (!B?.path || St.current.has(B.path)) return;
    St.current.add(B.path);
    const Y = await Mb(c, B);
    Y && (Y.duration && p((G) => G || Y.duration), g((G) => G.some((it) => it.id === Y.id) ? G : [...G, Y]));
  }, [c]), mt = U.useCallback(async () => {
    const B = await fetch(`/api/${c}/timeline`, { cache: "no-store" });
    if (!B.ok) return;
    const Y = await B.json();
    N(Y.status || { state: "submitted" }), Y.duration_seconds && p(Number(Y.duration_seconds)), Y.canonical && A(Y.canonical), V(Y.beat_offsets || null);
    for (const G of Y.files || []) Z(G);
  }, [Z, c]);
  U.useEffect(() => {
    St.current = /* @__PURE__ */ new Set(), g([]), V(null), $("canonical"), X("consensus"), T0(c, "__source__", "MASTER · uploaded source", o, "__source__").then((G) => {
      G.duration && p(G.duration), g((it) => [G, ...it.filter((ft) => ft.id !== G.id)]);
    }).catch((G) => gt("stderr", G.message)), mt();
    const B = window.setInterval(() => {
      mt();
    }, 2500);
    let Y = null;
    return typeof window.io == "function" ? (Y = window.io({ path: "/socket.io" }), Y.on("connect", () => {
      Xn.textContent = "live", Xn.classList.remove("muted"), Y.emit("subscribe", { hash: c });
    }), Y.on("disconnect", () => {
      Xn.textContent = "reconnecting", Xn.classList.add("muted");
    }), Y.on("process_output", (G) => gt(G.stream || "stdout", G.line || "")), Y.on("process_history", (G) => {
      for (const it of G.stdout || []) gt("stdout", it);
      for (const it of G.stderr || []) gt("stderr", it);
    }), Y.on("new_file", (G) => {
      Z(G);
    }), Y.on("job_status", (G) => {
      N(G.status || {}), mt();
    }), Y.on("canonical_metadata", (G) => {
      G?.canonical && A(G.canonical);
    }), Y.on("job_timeout", (G) => gt("stderr", `Job timeout: ${G.message || "analysis exceeded timeout"}`))) : (Xn.textContent = "polling", Xn.classList.add("muted"), gt("stderr", "Socket.IO browser client unavailable; timeline inventory polling remains active.")), () => {
      window.clearInterval(B), Y?.disconnect();
    };
  }, [Z, gt, o, c, mt]);
  const Ft = U.useMemo(() => Ob(v), [v]), F = U.useMemo(() => $y(H, v.bpm, m, at, vt), [H, v.bpm, m, at, vt]), I = (B) => B.id === "__source__" ? 0 : B.kind === "deep-structure" ? 10 : B.kind === "events" ? 20 : B.kind === "audio" ? 1 : B.kind === "spectrogram" ? 30 : B.kind === "waveform" ? 40 : 90, _t = U.useMemo(() => Ky(s), [s]), Wt = [...F.basis ? [
    { id: "canonical:bpm", title: "BPM grid · original", meta: `${F.basis.bpm.toFixed(4)} BPM · source time 0`, kind: "canonical-bpm", height: 74, content: { type: "markers", items: F.original } },
    { id: "bpm:aligned", title: "BPM grid · offset", meta: F.row ? `${F.row.offset_pips.toFixed(6)} pips · ${F.analysis.analysis_id}` : "Waiting for detected first beat", kind: "canonical-bpm", height: 74, content: { type: "markers", items: F.aligned } }
  ] : [], ..._.lanes, ...C.lanes, ...Ft.lanes, ...[..._t].sort((B, Y) => I(B) - I(Y) || B.id.localeCompare(Y.id))], yt = j.state || "submitted";
  return /* @__PURE__ */ d.jsx(
    Zy,
    {
      className: "stemlab-timeline",
      laneControls: !0,
      wheelNavigation: !0,
      audioSrc: `/api/${c}/source`,
      duration: m,
      title: v.title || o,
      subtitle: c,
      loops: r.loops,
      lanes: Wt,
      grid: [...F.grid, ..._.grid],
      beatClock: C.clock,
      showBeatGrid: C.gridVisible,
      onDurationChange: p,
      onWindowChange: (B) => {
        _.onWindowChange(B), C.onWindowChange(B);
      },
      onTimeChange: (B) => {
        _.onTimeChange(B), C.onTimeChange(B);
      },
      onPlaybackError: (B) => gt("stderr", B instanceof Error ? B.message : String(B)),
      headerEnd: /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
        /* @__PURE__ */ d.jsx("span", { className: `badge ${yt}`, children: yt }),
        /* @__PURE__ */ d.jsxs("span", { className: "small", children: [
          Wt.length,
          " lane",
          Wt.length === 1 ? "" : "s"
        ] })
      ] }),
      footer: /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
        /* @__PURE__ */ d.jsx(Fy, { comparison: F, onBasis: $, onAnalysis: X }),
        _.panel,
        C.panel,
        /* @__PURE__ */ d.jsx(yb, { state: r, hash: c }),
        /* @__PURE__ */ d.jsx(zb, { lines: W }),
        /* @__PURE__ */ d.jsx("span", { className: "dock-links", children: /* @__PURE__ */ d.jsx("a", { href: "https://kieransimkin.co.uk/my-songs/", target: "_blank", rel: "noopener", children: "Kieran Simkin · My Songs ↗" }) })
      ] })
    }
  );
}
function Ab() {
  const c = S0?.value?.trim() || "", o = _0?.value || "", r = E0?.value || "";
  return { ...hf, bpm: c ? Number(c) : null, lyrics: o.trim() || null, lyric_timing: r.trim() || [] };
}
function jb(c) {
  return Number.isFinite(Number(c.bpm)) || !!c.lyrics || !!(typeof c.lyric_timing == "string" && c.lyric_timing.trim()) || !!(Array.isArray(c.lyric_timing) && c.lyric_timing.length);
}
async function Rb(c) {
  const o = Ab();
  if (!jb(o)) return;
  const r = await fetch(`/api/${c}/canonical`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(o) }), s = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(s.detail || `Could not save canonical metadata (${r.status})`);
  mf.textContent = "Known information saved with this song hash.";
}
function Db(c) {
  return new Promise((o, r) => {
    const s = new XMLHttpRequest();
    s.open("PUT", `/upload/${encodeURIComponent(c.name)}`), s.setRequestHeader("Content-Type", c.type || "application/octet-stream"), s.upload.onprogress = (g) => {
      p0.classList.remove("hidden");
      const m = g.lengthComputable ? g.loaded / g.total : 0;
      _c.style.width = `${Math.round(m * 100)}%`, Ec.textContent = g.lengthComputable ? `${Math.round(m * 100)}% · ${(g.loaded / 1048576).toFixed(1)} / ${(g.total / 1048576).toFixed(1)} MiB` : `${(g.loaded / 1048576).toFixed(1)} MiB uploaded`;
    }, s.onerror = () => r(new Error("Upload failed")), s.onload = () => {
      let g = {};
      try {
        g = JSON.parse(s.responseText);
      } catch {
      }
      s.status < 200 || s.status >= 300 ? r(new Error(g.detail || `Upload failed (${s.status})`)) : o(g);
    }, s.send(c);
  });
}
async function N0(c, o) {
  bb.classList.add("hidden"), bf.classList.remove("hidden"), Eb.render(/* @__PURE__ */ d.jsx(Cb, { hash: c, filename: o || "uploaded audio" }, c));
}
async function x0(c) {
  if (c) {
    _c.style.width = "0%", Ec.textContent = `Uploading ${c.name}`, p0.classList.remove("hidden");
    try {
      const o = await Db(c);
      _c.style.width = "100%", Ec.textContent = "Upload complete · attaching to analysis", await Rb(o.hash), await N0(o.hash, o.filename || c.name);
    } catch (o) {
      Ec.textContent = o.message, _c.style.width = "0%";
    }
  }
}
async function M0(c) {
  c?.preventDefault(), c?.stopPropagation();
  try {
    const o = await fetch("/assets/arcadians-reference.json", { cache: "no-store" });
    if (!o.ok) throw new Error(`Could not load Arcadians reference (${o.status})`);
    const r = await o.json();
    hf = {};
    for (const s of ["title", "artist", "release_date", "isrc", "upc", "website", "my_songs_url", "epk_url", "cover_art_url", "source_url", "sections"])
      r[s] !== void 0 && r[s] !== null && (hf[s] = r[s]);
    S0.value = r.bpm ?? "", _0.value = r.lyrics ?? "", E0.value = Array.isArray(r.lyric_timing) && r.lyric_timing.length ? JSON.stringify(r.lyric_timing, null, 2) : "", xe(".known-info").open = !0, mf.textContent = r.lyric_timing?.length ? `Loaded ${r.title || "Arcadians"}: canonical release metadata, sections, ${r.bpm} BPM, lyrics and timing.` : `Loaded ${r.title || "Arcadians"} canonical reference metadata.`;
  } catch (o) {
    mf.textContent = o.message;
  }
}
b0.addEventListener("click", (c) => {
  c.stopPropagation(), Zu.click();
});
Zu.addEventListener("change", () => {
  x0(Zu.files?.[0]);
});
$a.addEventListener("click", (c) => {
  c.target !== b0 && !c.target.closest(".known-info") && Zu.click();
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
  x0(c.dataTransfer?.files?.[0]);
});
pb?.addEventListener("click", M0);
Sb?.addEventListener("click", M0);
const cf = new URLSearchParams(location.search).get("hash");
cf && /^[0-9a-f]{64}$/i.test(cf) && N0(cf.toLowerCase(), "Existing analysis");
export {
  pa as formatTimelineTime
};
