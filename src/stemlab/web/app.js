var qs = { exports: {} }, An = {};
var E0;
function Vy() {
  if (E0) return An;
  E0 = 1;
  var f = /* @__PURE__ */ Symbol.for("react.transitional.element"), v = /* @__PURE__ */ Symbol.for("react.fragment");
  function o(s, A, S) {
    var M = null;
    if (S !== void 0 && (M = "" + S), A.key !== void 0 && (M = "" + A.key), "key" in A) {
      S = {};
      for (var C in A)
        C !== "key" && (S[C] = A[C]);
    } else S = A;
    return A = S.ref, {
      $$typeof: f,
      type: s,
      key: M,
      ref: A !== void 0 ? A : null,
      props: S
    };
  }
  return An.Fragment = v, An.jsx = o, An.jsxs = o, An;
}
var _0;
function wy() {
  return _0 || (_0 = 1, qs.exports = Vy()), qs.exports;
}
var z = wy(), Ys = { exports: {} }, P = {};
var N0;
function Ky() {
  if (N0) return P;
  N0 = 1;
  var f = /* @__PURE__ */ Symbol.for("react.transitional.element"), v = /* @__PURE__ */ Symbol.for("react.portal"), o = /* @__PURE__ */ Symbol.for("react.fragment"), s = /* @__PURE__ */ Symbol.for("react.strict_mode"), A = /* @__PURE__ */ Symbol.for("react.profiler"), S = /* @__PURE__ */ Symbol.for("react.consumer"), M = /* @__PURE__ */ Symbol.for("react.context"), C = /* @__PURE__ */ Symbol.for("react.forward_ref"), H = /* @__PURE__ */ Symbol.for("react.suspense"), Z = /* @__PURE__ */ Symbol.for("react.memo"), j = /* @__PURE__ */ Symbol.for("react.lazy"), T = /* @__PURE__ */ Symbol.for("react.activity"), R = /* @__PURE__ */ Symbol.for("react.view_transition"), it = Symbol.iterator;
  function dt(d) {
    return d === null || typeof d != "object" ? null : (d = it && d[it] || d["@@iterator"], typeof d == "function" ? d : null);
  }
  var ct = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, ut = Object.assign, Ot = {};
  function ot(d, D, w) {
    this.props = d, this.context = D, this.refs = Ot, this.updater = w || ct;
  }
  ot.prototype.isReactComponent = {}, ot.prototype.setState = function(d, D) {
    if (typeof d != "object" && typeof d != "function" && d != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, d, D, "setState");
  }, ot.prototype.forceUpdate = function(d) {
    this.updater.enqueueForceUpdate(this, d, "forceUpdate");
  };
  function pt() {
  }
  pt.prototype = ot.prototype;
  function Gt(d, D, w) {
    this.props = d, this.context = D, this.refs = Ot, this.updater = w || ct;
  }
  var Yt = Gt.prototype = new pt();
  Yt.constructor = Gt, ut(Yt, ot.prototype), Yt.isPureReactComponent = !0;
  var Vt = Array.isArray;
  function I() {
  }
  var W = { H: null, A: null, T: null, S: null }, Nt = Object.prototype.hasOwnProperty;
  function B(d, D, w) {
    var K = w.ref;
    return {
      $$typeof: f,
      type: d,
      key: D,
      ref: K !== void 0 ? K : null,
      props: w
    };
  }
  function q(d, D) {
    return B(d.type, D, d.props);
  }
  function X(d) {
    return typeof d == "object" && d !== null && d.$$typeof === f;
  }
  function Bt(d) {
    var D = { "=": "=0", ":": "=2" };
    return "$" + d.replace(/[=:]/g, function(w) {
      return D[w];
    });
  }
  var dl = /\/+/g;
  function bt(d, D) {
    return typeof d == "object" && d !== null && d.key != null ? Bt("" + d.key) : D.toString(36);
  }
  function U(d) {
    switch (d.status) {
      case "fulfilled":
        return d.value;
      case "rejected":
        throw d.reason;
      default:
        switch (typeof d.status == "string" ? d.then(I, I) : (d.status = "pending", d.then(
          function(D) {
            d.status === "pending" && (d.status = "fulfilled", d.value = D);
          },
          function(D) {
            d.status === "pending" && (d.status = "rejected", d.reason = D);
          }
        )), d.status) {
          case "fulfilled":
            return d.value;
          case "rejected":
            throw d.reason;
        }
    }
    throw d;
  }
  function V(d, D, w, K, st) {
    var yt = typeof d;
    (yt === "undefined" || yt === "boolean") && (d = null);
    var gt = !1;
    if (d === null) gt = !0;
    else
      switch (yt) {
        case "bigint":
        case "string":
        case "number":
          gt = !0;
          break;
        case "object":
          switch (d.$$typeof) {
            case f:
            case v:
              gt = !0;
              break;
            case j:
              return gt = d._init, V(
                gt(d._payload),
                D,
                w,
                K,
                st
              );
          }
      }
    if (gt)
      return st = st(d), gt = K === "" ? "." + bt(d, 0) : K, Vt(st) ? (w = "", gt != null && (w = gt.replace(dl, "$&/") + "/"), V(st, D, w, "", function(Ll) {
        return Ll;
      })) : st != null && (X(st) && (st = q(
        st,
        w + (st.key == null || d && d.key === st.key ? "" : ("" + st.key).replace(
          dl,
          "$&/"
        ) + "/") + gt
      )), D.push(st)), 1;
    gt = 0;
    var L = K === "" ? "." : K + ":";
    if (Vt(d))
      for (var F = 0; F < d.length; F++)
        K = d[F], yt = L + bt(K, F), gt += V(
          K,
          D,
          w,
          yt,
          st
        );
    else if (F = dt(d), typeof F == "function")
      for (d = F.call(d), F = 0; !(K = d.next()).done; )
        K = K.value, yt = L + bt(K, F++), gt += V(
          K,
          D,
          w,
          yt,
          st
        );
    else if (yt === "object") {
      if (typeof d.then == "function")
        return V(
          U(d),
          D,
          w,
          K,
          st
        );
      throw D = String(d), Error(
        "Objects are not valid as a React child (found: " + (D === "[object Object]" ? "object with keys {" + Object.keys(d).join(", ") + "}" : D) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return gt;
  }
  function $(d, D, w) {
    if (d == null) return d;
    var K = [], st = 0;
    return V(d, K, "", "", function(yt) {
      return D.call(w, yt, st++);
    }), K;
  }
  function Tt(d) {
    if (d._status === -1) {
      var D = d._result, w = D();
      w.then(
        function(K) {
          (d._status === 0 || d._status === -1) && (d._status = 1, d._result = K, w.status === void 0 && (w.status = "fulfilled", w.value = K));
        },
        function(K) {
          (d._status === 0 || d._status === -1) && (d._status = 2, d._result = K, w.status === void 0 && (w.status = "rejected", w.reason = K));
        }
      ), d._status === -1 && (d._status = 0, d._result = w);
    }
    if (d._status === 1) return d._result.default;
    throw d._result;
  }
  var ft = typeof reportError == "function" ? reportError : function(d) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var D = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof d == "object" && d !== null && typeof d.message == "string" ? String(d.message) : String(d),
        error: d
      });
      if (!window.dispatchEvent(D)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", d);
      return;
    }
    console.error(d);
  };
  function Sl(d) {
    var D = W.T, w = {};
    w.types = D !== null ? D.types : null, W.T = w;
    try {
      var K = d(), st = W.S;
      st !== null && st(w, K), typeof K == "object" && K !== null && typeof K.then == "function" && K.then(I, ft);
    } catch (yt) {
      ft(yt);
    } finally {
      D !== null && w.types !== null && (D.types = w.types), W.T = D;
    }
  }
  function Wl(d) {
    var D = W.T;
    if (D !== null) {
      var w = D.types;
      w === null ? D.types = [d] : w.indexOf(d) === -1 && w.push(d);
    } else Sl(Wl.bind(null, d));
  }
  var kl = {
    map: $,
    forEach: function(d, D, w) {
      $(
        d,
        function() {
          D.apply(this, arguments);
        },
        w
      );
    },
    count: function(d) {
      var D = 0;
      return $(d, function() {
        D++;
      }), D;
    },
    toArray: function(d) {
      return $(d, function(D) {
        return D;
      }) || [];
    },
    only: function(d) {
      if (!X(d))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return d;
    }
  };
  return P.Activity = T, P.Children = kl, P.Component = ot, P.Fragment = o, P.Profiler = A, P.PureComponent = Gt, P.StrictMode = s, P.Suspense = H, P.ViewTransition = R, P.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = W, P.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(d) {
      return W.H.useMemoCache(d);
    }
  }, P.addTransitionType = Wl, P.cache = function(d) {
    return function() {
      return d.apply(null, arguments);
    };
  }, P.cacheSignal = function() {
    return null;
  }, P.cloneElement = function(d, D, w) {
    if (d == null)
      throw Error(
        "The argument must be a React element, but you passed " + d + "."
      );
    var K = ut({}, d.props), st = d.key;
    if (D != null)
      for (yt in D.key !== void 0 && (st = "" + D.key), D)
        !Nt.call(D, yt) || yt === "key" || yt === "__self" || yt === "__source" || yt === "ref" && D.ref === void 0 || (K[yt] = D[yt]);
    var yt = arguments.length - 2;
    if (yt === 1) K.children = w;
    else if (1 < yt) {
      for (var gt = Array(yt), L = 0; L < yt; L++)
        gt[L] = arguments[L + 2];
      K.children = gt;
    }
    return B(d.type, st, K);
  }, P.createContext = function(d) {
    return d = {
      $$typeof: M,
      _currentValue: d,
      _currentValue2: d,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, d.Provider = d, d.Consumer = {
      $$typeof: S,
      _context: d
    }, d;
  }, P.createElement = function(d, D, w) {
    var K, st = {}, yt = null;
    if (D != null)
      for (K in D.key !== void 0 && (yt = "" + D.key), D)
        Nt.call(D, K) && K !== "key" && K !== "__self" && K !== "__source" && (st[K] = D[K]);
    var gt = arguments.length - 2;
    if (gt === 1) st.children = w;
    else if (1 < gt) {
      for (var L = Array(gt), F = 0; F < gt; F++)
        L[F] = arguments[F + 2];
      st.children = L;
    }
    if (d && d.defaultProps)
      for (K in gt = d.defaultProps, gt)
        st[K] === void 0 && (st[K] = gt[K]);
    return B(d, yt, st);
  }, P.createRef = function() {
    return { current: null };
  }, P.forwardRef = function(d) {
    return { $$typeof: C, render: d };
  }, P.isValidElement = X, P.lazy = function(d) {
    return {
      $$typeof: j,
      _payload: { _status: -1, _result: d },
      _init: Tt
    };
  }, P.memo = function(d, D) {
    return {
      $$typeof: Z,
      type: d,
      compare: D === void 0 ? null : D
    };
  }, P.startTransition = Sl, P.unstable_useCacheRefresh = function() {
    return W.H.useCacheRefresh();
  }, P.use = function(d) {
    return W.H.use(d);
  }, P.useActionState = function(d, D, w) {
    return W.H.useActionState(d, D, w);
  }, P.useCallback = function(d, D) {
    return W.H.useCallback(d, D);
  }, P.useContext = function(d) {
    return W.H.useContext(d);
  }, P.useDebugValue = function() {
  }, P.useDeferredValue = function(d, D) {
    return W.H.useDeferredValue(d, D);
  }, P.useEffect = function(d, D) {
    return W.H.useEffect(d, D);
  }, P.useEffectEvent = function(d) {
    return W.H.useEffectEvent(d);
  }, P.useId = function() {
    return W.H.useId();
  }, P.useImperativeHandle = function(d, D, w) {
    return W.H.useImperativeHandle(d, D, w);
  }, P.useInsertionEffect = function(d, D) {
    return W.H.useInsertionEffect(d, D);
  }, P.useLayoutEffect = function(d, D) {
    return W.H.useLayoutEffect(d, D);
  }, P.useMemo = function(d, D) {
    return W.H.useMemo(d, D);
  }, P.useOptimistic = function(d, D) {
    return W.H.useOptimistic(d, D);
  }, P.useReducer = function(d, D, w) {
    return W.H.useReducer(d, D, w);
  }, P.useRef = function(d) {
    return W.H.useRef(d);
  }, P.useState = function(d) {
    return W.H.useState(d);
  }, P.useSyncExternalStore = function(d, D, w) {
    return W.H.useSyncExternalStore(
      d,
      D,
      w
    );
  }, P.useTransition = function() {
    return W.H.useTransition();
  }, P.version = "19.3.0", P;
}
var z0;
function Fs() {
  return z0 || (z0 = 1, Ys.exports = Ky()), Ys.exports;
}
var G = Fs(), Ls = { exports: {} }, Mn = {}, Gs = { exports: {} }, Xs = {};
var O0;
function Jy() {
  return O0 || (O0 = 1, (function(f) {
    function v(U, V) {
      var $ = U.length;
      U.push(V);
      t: for (; 0 < $; ) {
        var Tt = $ - 1 >>> 1, ft = U[Tt];
        if (0 < A(ft, V))
          U[Tt] = V, U[$] = ft, $ = Tt;
        else break t;
      }
    }
    function o(U) {
      return U.length === 0 ? null : U[0];
    }
    function s(U) {
      if (U.length === 0) return null;
      var V = U[0], $ = U.pop();
      if ($ !== V) {
        U[0] = $;
        t: for (var Tt = 0, ft = U.length, Sl = ft >>> 1; Tt < Sl; ) {
          var Wl = 2 * (Tt + 1) - 1, kl = U[Wl], d = Wl + 1, D = U[d];
          if (0 > A(kl, $))
            d < ft && 0 > A(D, kl) ? (U[Tt] = D, U[d] = $, Tt = d) : (U[Tt] = kl, U[Wl] = $, Tt = Wl);
          else if (d < ft && 0 > A(D, $))
            U[Tt] = D, U[d] = $, Tt = d;
          else break t;
        }
      }
      return V;
    }
    function A(U, V) {
      var $ = U.sortIndex - V.sortIndex;
      return $ !== 0 ? $ : U.id - V.id;
    }
    if (f.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var S = performance;
      f.unstable_now = function() {
        return S.now();
      };
    } else {
      var M = Date, C = M.now();
      f.unstable_now = function() {
        return M.now() - C;
      };
    }
    var H = [], Z = [], j = 1, T = null, R = 3, it = !1, dt = !1, ct = !1, ut = !1, Ot = typeof setTimeout == "function" ? setTimeout : null, ot = typeof clearTimeout == "function" ? clearTimeout : null, pt = typeof setImmediate < "u" ? setImmediate : null;
    function Gt(U) {
      for (var V = o(Z); V !== null; ) {
        if (V.callback === null) s(Z);
        else if (V.startTime <= U)
          s(Z), V.sortIndex = V.expirationTime, v(H, V);
        else break;
        V = o(Z);
      }
    }
    function Yt(U) {
      if (ct = !1, Gt(U), !dt)
        if (o(H) !== null)
          dt = !0, Vt || (Vt = !0, X());
        else {
          var V = o(Z);
          V !== null && bt(Yt, V.startTime - U);
        }
    }
    var Vt = !1, I = -1, W = 5, Nt = -1;
    function B() {
      return ut ? !0 : !(f.unstable_now() - Nt < W);
    }
    function q() {
      if (ut = !1, Vt) {
        var U = f.unstable_now();
        Nt = U;
        var V = !0;
        try {
          t: {
            dt = !1, ct && (ct = !1, ot(I), I = -1), it = !0;
            var $ = R;
            try {
              l: {
                for (Gt(U), T = o(H); T !== null && !(T.expirationTime > U && B()); ) {
                  var Tt = T.callback;
                  if (typeof Tt == "function") {
                    T.callback = null, R = T.priorityLevel;
                    var ft = Tt(
                      T.expirationTime <= U
                    );
                    if (U = f.unstable_now(), typeof ft == "function") {
                      T.callback = ft, Gt(U), V = !0;
                      break l;
                    }
                    T === o(H) && s(H), Gt(U);
                  } else s(H);
                  T = o(H);
                }
                if (T !== null) V = !0;
                else {
                  var Sl = o(Z);
                  Sl !== null && bt(
                    Yt,
                    Sl.startTime - U
                  ), V = !1;
                }
              }
              break t;
            } finally {
              T = null, R = $, it = !1;
            }
            V = void 0;
          }
        } finally {
          V ? X() : Vt = !1;
        }
      }
    }
    var X;
    if (typeof pt == "function")
      X = function() {
        pt(q);
      };
    else if (typeof MessageChannel < "u") {
      var Bt = new MessageChannel(), dl = Bt.port2;
      Bt.port1.onmessage = q, X = function() {
        dl.postMessage(null);
      };
    } else
      X = function() {
        Ot(q, 0);
      };
    function bt(U, V) {
      I = Ot(function() {
        U(f.unstable_now());
      }, V);
    }
    f.unstable_IdlePriority = 5, f.unstable_ImmediatePriority = 1, f.unstable_LowPriority = 4, f.unstable_NormalPriority = 3, f.unstable_Profiling = null, f.unstable_UserBlockingPriority = 2, f.unstable_cancelCallback = function(U) {
      U.callback = null;
    }, f.unstable_forceFrameRate = function(U) {
      0 > U || 125 < U ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : W = 0 < U ? Math.floor(1e3 / U) : 5;
    }, f.unstable_getCurrentPriorityLevel = function() {
      return R;
    }, f.unstable_next = function(U) {
      switch (R) {
        case 1:
        case 2:
        case 3:
          var V = 3;
          break;
        default:
          V = R;
      }
      var $ = R;
      R = V;
      try {
        return U();
      } finally {
        R = $;
      }
    }, f.unstable_requestPaint = function() {
      ut = !0;
    }, f.unstable_runWithPriority = function(U, V) {
      switch (U) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          U = 3;
      }
      var $ = R;
      R = U;
      try {
        return V();
      } finally {
        R = $;
      }
    }, f.unstable_scheduleCallback = function(U, V, $) {
      var Tt = f.unstable_now();
      switch (typeof $ == "object" && $ !== null ? ($ = $.delay, $ = typeof $ == "number" && 0 < $ ? Tt + $ : Tt) : $ = Tt, U) {
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
      return ft = $ + ft, U = {
        id: j++,
        callback: V,
        priorityLevel: U,
        startTime: $,
        expirationTime: ft,
        sortIndex: -1
      }, $ > Tt ? (U.sortIndex = $, v(Z, U), o(H) === null && U === o(Z) && (ct ? (ot(I), I = -1) : ct = !0, bt(Yt, $ - Tt))) : (U.sortIndex = ft, v(H, U), dt || it || (dt = !0, Vt || (Vt = !0, X()))), U;
    }, f.unstable_shouldYield = B, f.unstable_wrapCallback = function(U) {
      var V = R;
      return function() {
        var $ = R;
        R = V;
        try {
          return U.apply(this, arguments);
        } finally {
          R = $;
        }
      };
    };
  })(Xs)), Xs;
}
var A0;
function $y() {
  return A0 || (A0 = 1, Gs.exports = Jy()), Gs.exports;
}
var Qs = { exports: {} }, fl = {};
var M0;
function Fy() {
  if (M0) return fl;
  M0 = 1;
  var f = Fs();
  function v(j) {
    var T = "https://react.dev/errors/" + j;
    if (1 < arguments.length) {
      T += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var R = 2; R < arguments.length; R++)
        T += "&args[]=" + encodeURIComponent(arguments[R]);
    }
    return "Minified React error #" + j + "; visit " + T + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
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
  }, A = /* @__PURE__ */ Symbol.for("react.portal"), S = /* @__PURE__ */ Symbol.for("react.recoverable"), M = /* @__PURE__ */ Symbol.for("react.optimistic_key");
  function C(j, T, R) {
    var it = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: A,
      key: it == null ? null : it === M ? M : "" + it,
      children: j,
      containerInfo: T,
      implementation: R
    };
  }
  var H = f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function Z(j, T) {
    if (j === "font") return "";
    if (typeof T == "string")
      return T === "use-credentials" ? T : "";
  }
  return fl.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, fl.browser = function(j) {
    return { $$typeof: S, _reason: j };
  }, fl.createPortal = function(j, T) {
    var R = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!T || T.nodeType !== 1 && T.nodeType !== 9 && T.nodeType !== 11)
      throw Error(v(299));
    return C(j, T, null, R);
  }, fl.flushSync = function(j) {
    var T = H.T, R = s.p;
    try {
      if (H.T = null, s.p = 2, j) return j();
    } finally {
      H.T = T, s.p = R, s.d.f();
    }
  }, fl.preconnect = function(j, T) {
    typeof j == "string" && (T ? (T = T.crossOrigin, T = typeof T == "string" ? T === "use-credentials" ? T : "" : void 0) : T = null, s.d.C(j, T));
  }, fl.prefetchDNS = function(j) {
    typeof j == "string" && s.d.D(j);
  }, fl.preinit = function(j, T) {
    if (typeof j == "string" && T && typeof T.as == "string") {
      var R = T.as, it = Z(R, T.crossOrigin), dt = typeof T.integrity == "string" ? T.integrity : void 0, ct = typeof T.fetchPriority == "string" ? T.fetchPriority : void 0;
      R === "style" ? s.d.S(
        j,
        typeof T.precedence == "string" ? T.precedence : void 0,
        {
          crossOrigin: it,
          integrity: dt,
          fetchPriority: ct
        }
      ) : R === "script" && s.d.X(j, {
        crossOrigin: it,
        integrity: dt,
        fetchPriority: ct,
        nonce: typeof T.nonce == "string" ? T.nonce : void 0
      });
    }
  }, fl.preinitModule = function(j, T) {
    if (typeof j == "string")
      if (typeof T == "object" && T !== null) {
        if (T.as == null || T.as === "script") {
          var R = Z(
            T.as,
            T.crossOrigin
          );
          s.d.M(j, {
            crossOrigin: R,
            integrity: typeof T.integrity == "string" ? T.integrity : void 0,
            nonce: typeof T.nonce == "string" ? T.nonce : void 0,
            fetchPriority: typeof T.fetchPriority == "string" ? T.fetchPriority : void 0
          });
        }
      } else T == null && s.d.M(j);
  }, fl.preload = function(j, T) {
    if (typeof j == "string" && typeof T == "object" && T !== null && typeof T.as == "string") {
      var R = T.as, it = Z(R, T.crossOrigin);
      s.d.L(j, R, {
        crossOrigin: it,
        integrity: typeof T.integrity == "string" ? T.integrity : void 0,
        nonce: typeof T.nonce == "string" ? T.nonce : void 0,
        type: typeof T.type == "string" ? T.type : void 0,
        fetchPriority: typeof T.fetchPriority == "string" ? T.fetchPriority : void 0,
        referrerPolicy: typeof T.referrerPolicy == "string" ? T.referrerPolicy : void 0,
        imageSrcSet: typeof T.imageSrcSet == "string" ? T.imageSrcSet : void 0,
        imageSizes: typeof T.imageSizes == "string" ? T.imageSizes : void 0,
        media: typeof T.media == "string" ? T.media : void 0
      });
    }
  }, fl.preloadModule = function(j, T) {
    if (typeof j == "string")
      if (T) {
        var R = Z(T.as, T.crossOrigin);
        s.d.m(j, {
          as: typeof T.as == "string" && T.as !== "script" ? T.as : void 0,
          crossOrigin: R,
          integrity: typeof T.integrity == "string" ? T.integrity : void 0,
          nonce: typeof T.nonce == "string" ? T.nonce : void 0,
          fetchPriority: typeof T.fetchPriority == "string" ? T.fetchPriority : void 0
        });
      } else s.d.m(j);
  }, fl.requestFormReset = function(j) {
    s.d.r(j);
  }, fl.unstable_batchedUpdates = function(j, T) {
    return j(T);
  }, fl.useFormState = function(j, T, R) {
    return H.H.useFormState(j, T, R);
  }, fl.useFormStatus = function() {
    return H.H.useHostTransitionStatus();
  }, fl.version = "19.3.0", fl;
}
var D0;
function Wy() {
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
  return f(), Qs.exports = Fy(), Qs.exports;
}
var C0;
function ky() {
  if (C0) return Mn;
  C0 = 1;
  var f = $y(), v = Fs(), o = Wy();
  function s(t) {
    var l = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      l += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var e = 2; e < arguments.length; e++)
        l += "&args[]=" + encodeURIComponent(arguments[e]);
    }
    return "Minified React error #" + t + "; visit " + l + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function A(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function S(t) {
    for (var l = t, e = l; e && !e.alternate; )
      l = e, (l.flags & 4098) !== 0 && (t = l.return), e = l.return;
    for (; l.return; ) l = l.return;
    return l.tag === 3 ? t : null;
  }
  function M(t) {
    if (t.tag === 13) {
      var l = t.memoizedState;
      if (l === null && (t = t.alternate, t !== null && (l = t.memoizedState)), l !== null) return l.dehydrated;
    }
    return null;
  }
  function C(t) {
    if (t.tag === 31) {
      var l = t.memoizedState;
      if (l === null && (t = t.alternate, t !== null && (l = t.memoizedState)), l !== null) return l.dehydrated;
    }
    return null;
  }
  function H(t) {
    if (S(t) !== t)
      throw Error(s(188));
  }
  function Z(t) {
    var l = t.alternate;
    if (!l) {
      if (l = S(t), l === null) throw Error(s(188));
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
  function T(t, l, e, a, u, n) {
    for (; t !== null; ) {
      if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && e(t, a, u, n) || (t.tag !== 22 || t.memoizedState === null) && (l || t.tag !== 5 && t.tag !== 27) && T(
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
  function R(t) {
    for (t = t.return; t !== null; ) {
      if (t.tag === 3 || t.tag === 5 || t.tag === 27) return t;
      t = t.return;
    }
    return null;
  }
  function it(t) {
    var l = !1;
    for (t = t.return; t !== null && (t.tag === 4 && (l = !0), !(t.tag === 3 || t.tag === 5 || t.tag === 27)); )
      t = t.return;
    return l;
  }
  function dt(t) {
    var l = [null, null], e = R(t);
    return e === null || ct(
      l,
      t,
      e.child,
      { foundSelf: !1 }
    ), l;
  }
  function ct(t, l, e, a) {
    for (; e !== null; ) {
      if (e === l) a.foundSelf = !0;
      else if (e.tag === 5 || e.tag === 27 || e.tag === 6) {
        if (a.foundSelf) return t[1] = e, !0;
        t[0] = e;
      } else if ((e.tag !== 22 || e.memoizedState === null) && ct(
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
  function ut(t) {
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
  var Ot = null, ot = null;
  function pt(t, l, e) {
    return t === e ? !0 : t === l ? (Ot = t, !0) : !1;
  }
  function Gt(t, l, e) {
    return t === e ? (ot = t, !1) : t === l ? (ot !== null && (Ot = t), !0) : !1;
  }
  function Yt(t) {
    if (t === null) return null;
    do
      t = t === null ? null : t.return;
    while (t && t.tag !== 5 && t.tag !== 27 && t.tag !== 3);
    return t || null;
  }
  function Vt(t, l, e) {
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
  var I = Object.assign, W = /* @__PURE__ */ Symbol.for("react.element"), Nt = /* @__PURE__ */ Symbol.for("react.transitional.element"), B = /* @__PURE__ */ Symbol.for("react.portal"), q = /* @__PURE__ */ Symbol.for("react.fragment"), X = /* @__PURE__ */ Symbol.for("react.strict_mode"), Bt = /* @__PURE__ */ Symbol.for("react.profiler"), dl = /* @__PURE__ */ Symbol.for("react.consumer"), bt = /* @__PURE__ */ Symbol.for("react.context"), U = /* @__PURE__ */ Symbol.for("react.forward_ref"), V = /* @__PURE__ */ Symbol.for("react.suspense"), $ = /* @__PURE__ */ Symbol.for("react.suspense_list"), Tt = /* @__PURE__ */ Symbol.for("react.memo"), ft = /* @__PURE__ */ Symbol.for("react.lazy"), Sl = /* @__PURE__ */ Symbol.for("react.activity"), Wl = /* @__PURE__ */ Symbol.for("react.legacy_hidden"), kl = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), d = /* @__PURE__ */ Symbol.for("react.view_transition"), D = /* @__PURE__ */ Symbol.for("react.recoverable"), w = Symbol.iterator;
  function K(t) {
    return t === null || typeof t != "object" ? null : (t = w && t[w] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var st = /* @__PURE__ */ Symbol.for("react.client.reference");
  function yt(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === st ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case q:
        return "Fragment";
      case Bt:
        return "Profiler";
      case X:
        return "StrictMode";
      case V:
        return "Suspense";
      case $:
        return "SuspenseList";
      case Sl:
        return "Activity";
      case d:
        return "ViewTransition";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case B:
          return "Portal";
        case bt:
          return t.displayName || "Context";
        case dl:
          return (t._context.displayName || "Context") + ".Consumer";
        case U:
          var l = t.render;
          return t = t.displayName, t || (t = l.displayName || l.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case Tt:
          return l = t.displayName || null, l !== null ? l : yt(t.type) || "Memo";
        case ft:
          l = t._payload, t = t._init;
          try {
            return yt(t(l));
          } catch {
          }
      }
    return null;
  }
  var gt = Array.isArray, L = v.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, F = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Ll = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, oa = [], je = -1;
  function Al(t) {
    return { current: t };
  }
  function Ft(t) {
    0 > je || (t.current = oa[je], oa[je] = null, je--);
  }
  function Et(t, l) {
    je++, oa[je] = t.current, t.current = l;
  }
  var Mt = Al(null), ra = Al(null), ne = Al(null), He = Al(null);
  function Ga(t, l) {
    switch (Et(ne, l), Et(ra, t), Et(Mt, null), l.nodeType) {
      case 9:
      case 11:
        t = (t = l.documentElement) && (t = t.namespaceURI) ? Ud(t) : 0;
        break;
      default:
        if (t = l.tagName, l = l.namespaceURI)
          l = Ud(l), t = Rd(l, t);
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
    Ft(Mt), Et(Mt, t);
  }
  function ie() {
    Ft(Mt), Ft(ra), Ft(ne);
  }
  function Ru(t) {
    var l = t.memoizedState;
    l !== null && (Mu._currentValue = l.memoizedState, Et(He, t)), l = Mt.current;
    var e = Rd(l, t.type);
    l !== e && (Et(ra, t), Et(Mt, e));
  }
  function Xa(t) {
    ra.current === t && (Ft(Mt), Ft(ra)), He.current === t && (Ft(He), Mu._currentValue = Ll);
  }
  var _, tt;
  function at(t) {
    if (_ === void 0)
      try {
        throw Error();
      } catch (e) {
        var l = e.stack.trim().match(/\n( *(at )?)/);
        _ = l && l[1] || "", tt = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + _ + t + tt;
  }
  var sl = !1;
  function kt(t, l) {
    if (!t || sl) return "";
    sl = !0;
    var e = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (l) {
              var O = function() {
                throw Error();
              };
              if (Object.defineProperty(O.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(O, []);
                } catch (x) {
                  var h = x;
                }
                Reflect.construct(t, [], O);
              } else {
                try {
                  O.call();
                } catch (x) {
                  h = x;
                }
                O = !1;
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
                  }), O = !0, new t();
                } finally {
                  O && (p !== void 0 ? Object.defineProperty(t.prototype, "props", p) : delete t.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (x) {
                h = x;
              }
              (O = t()) && typeof O.catch == "function" && O.catch(function() {
              });
            }
          } catch (x) {
            if (x && h && typeof x.stack == "string")
              return [x.stack, h.stack];
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
`), g = c.split(`
`);
        for (u = a = 0; a < r.length && !r[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; u < g.length && !g[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (a === r.length || u === g.length)
          for (a = r.length - 1, u = g.length - 1; 1 <= a && 0 <= u && r[a] !== g[u]; )
            u--;
        for (; 1 <= a && 0 <= u; a--, u--)
          if (r[a] !== g[u]) {
            if (a !== 1 || u !== 1)
              do
                if (a--, u--, 0 > u || r[a] !== g[u]) {
                  var E = `
` + r[a].replace(" at new ", " at ");
                  return t.displayName && E.includes("<anonymous>") && (E = E.replace("<anonymous>", t.displayName)), E;
                }
              while (1 <= a && 0 <= u);
            break;
          }
      }
    } finally {
      sl = !1, Error.prepareStackTrace = e;
    }
    return (e = t ? t.displayName || t.name : "") ? at(e) : "";
  }
  function bl(t, l) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return at(t.type);
      case 16:
        return at("Lazy");
      case 13:
        return t.child !== l && l !== null ? at("Suspense Fallback") : at("Suspense");
      case 19:
        return at("SuspenseList");
      case 0:
      case 15:
        return kt(t.type, !1);
      case 11:
        return kt(t.type.render, !1);
      case 1:
        return kt(t.type, !0);
      case 31:
        return at("Activity");
      case 30:
        return at("ViewTransition");
      default:
        return "";
    }
  }
  function pl(t) {
    try {
      var l = "", e = null;
      do
        l += bl(t, e), e = t, t = t.return;
      while (t);
      return l;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var ol = Object.prototype.hasOwnProperty, ma = f.unstable_scheduleCallback, fc = f.unstable_cancelCallback, F0 = f.unstable_shouldYield, W0 = f.unstable_requestPaint, Ml = f.unstable_now, k0 = f.unstable_getCurrentPriorityLevel, Ps = f.unstable_ImmediatePriority, to = f.unstable_UserBlockingPriority, Un = f.unstable_NormalPriority, I0 = f.unstable_LowPriority, lo = f.unstable_IdlePriority, P0 = f.log, tv = f.unstable_setDisableYieldValue, xu = null, Dl = null;
  function Be(t) {
    if (typeof P0 == "function" && tv(t), Dl && typeof Dl.setStrictMode == "function")
      try {
        Dl.setStrictMode(xu, t);
      } catch {
      }
  }
  var Cl = Math.clz32 ? Math.clz32 : av, lv = Math.log, ev = Math.LN2;
  function av(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (lv(t) / ev | 0) | 0;
  }
  var Rn = 256, xn = 262144, jn = 4194304;
  function da(t) {
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
    return c !== 0 ? (a = c & ~n, a !== 0 ? u = da(a) : (i &= c, i !== 0 ? u = da(i) : e || (e = c & ~t, e !== 0 && (u = da(e))))) : (c = a & ~n, c !== 0 ? u = da(c) : i !== 0 ? u = da(i) : e || (e = a & ~t, e !== 0 && (u = da(e)))), u === 0 ? 0 : l !== 0 && l !== u && (l & n) === 0 && (n = u & -u, e = l & -l, n >= e || n === 32 && (e & 4194048) !== 0) ? l : u;
  }
  function ju(t, l) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & l) === 0;
  }
  function eo(t, l) {
    (l & 8) !== 0 && (l |= l & 32);
    var e = t.entangledLanes;
    if (e !== 0)
      for (t = t.entanglements, e &= l; 0 < e; ) {
        var a = 31 - Cl(e), u = 1 << a;
        l |= t[a], e &= ~u;
      }
    return l;
  }
  function uv(t, l) {
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
  function ao() {
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
  function nv(t, l, e, a, u, n) {
    var i = t.pendingLanes;
    t.pendingLanes = e, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= e, t.entangledLanes &= e, t.errorRecoveryDisabledLanes &= e, t.shellSuspendCounter = 0;
    var c = t.entanglements, r = t.expirationTimes, g = t.hiddenUpdates;
    for (e = i & ~e; 0 < e; ) {
      var E = 31 - Cl(e), O = 1 << E;
      c[E] = 0, r[E] = -1;
      var h = g[E];
      if (h !== null)
        for (g[E] = null, E = 0; E < h.length; E++) {
          var p = h[E];
          p !== null && (p.lane &= -536870913);
        }
      e &= ~O;
    }
    a !== 0 && uo(t, a, 0), n !== 0 && u === 0 && t.tag !== 0 && (t.suspendedLanes |= n & ~(i & ~l));
  }
  function uo(t, l, e) {
    t.pendingLanes |= l, t.suspendedLanes &= ~l;
    var a = 31 - Cl(l);
    t.entangledLanes |= l, t.entanglements[a] = t.entanglements[a] | 1073741824 | e & 261930;
  }
  function no(t, l) {
    var e = t.entangledLanes |= l;
    for (t = t.entanglements; e; ) {
      var a = 31 - Cl(e), u = 1 << a;
      u & l | t[a] & l && (t[a] |= l), e &= ~u;
    }
  }
  function io(t, l) {
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
  function co() {
    var t = F.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : h0(t.type));
  }
  function fo(t, l) {
    var e = F.p;
    try {
      return F.p = t, l();
    } finally {
      F.p = e;
    }
  }
  var be = Math.random().toString(36).slice(2), el = "__reactFiber$" + be, Tl = "__reactProps$" + be, Qa = "__reactContainer$" + be, so = "__reactEvents$" + be, iv = "__reactListeners$" + be, cv = "__reactHandles$" + be, oo = "__reactResources$" + be, Bu = "__reactMarker$" + be, Bn = "__reactLoad$" + be;
  function qn(t) {
    delete t[el], delete t[Tl], delete t[iv], delete t[cv];
  }
  function va(t) {
    var l;
    if (l = t[el]) return l;
    for (var e = t.parentNode; e; ) {
      if (l = e[Qa] || e[el]) {
        if (e = l.alternate, l.child !== null || e !== null && e.child !== null)
          for (t = Fd(t); t !== null; ) {
            if (e = t[el]) return e;
            t = Fd(t);
          }
        return l;
      }
      t = e, e = t.parentNode;
    }
    return null;
  }
  function Za(t) {
    if (t = t[el] || t[Qa]) {
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
    var l = t[oo];
    return l || (l = t[oo] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), l;
  }
  function It(t) {
    t[Bu] = !0;
  }
  function ro(t) {
    t[Bn] = void 0;
  }
  var mo = /* @__PURE__ */ new Set(), vo = {};
  function ha(t, l) {
    wa(t, l), wa(t + "Capture", l);
  }
  function wa(t, l) {
    for (vo[t] = l, t = 0; t < l.length; t++)
      mo.add(l[t]);
  }
  var fv = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), ho = {}, yo = {};
  function sv(t) {
    return ol.call(yo, t) ? !0 : ol.call(ho, t) ? !1 : fv.test(t) ? yo[t] = !0 : (ho[t] = !0, !1);
  }
  var _t = !1;
  function go() {
    var t = _t;
    return _t = !1, t;
  }
  function Yn(t, l, e) {
    if (sv(l))
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
  function Ln(t, l, e) {
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
  function Ul(t) {
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
  function ov(t, l, e) {
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
  function mc(t) {
    if (!t._valueTracker) {
      var l = So(t) ? "checked" : "value";
      t._valueTracker = ov(
        t,
        l,
        "" + t[l]
      );
    }
  }
  function bo(t) {
    if (!t) return !1;
    var l = t._valueTracker;
    if (!l) return !0;
    var e = l.getValue(), a = "";
    return t && (a = So(t) ? t.checked ? "true" : "false" : t.value), t = a, t !== e ? (l.setValue(t), !0) : !1;
  }
  var rv = /[\n"\\]/g;
  function Gl(t) {
    return t.replace(
      rv,
      function(l) {
        return "\\" + l.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function dc(t, l, e, a, u, n, i, c) {
    t.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? t.type = i : t.removeAttribute("type"), l != null ? i === "number" ? (l === 0 && t.value === "" || t.value != l) && (t.value = "" + Ul(l)) : t.value !== "" + Ul(l) && (t.value = "" + Ul(l)) : i !== "submit" && i !== "reset" || t.removeAttribute("value"), l != null ? i === "number" && t.value == l ? vc(t, Ul(t.value)) : vc(t, Ul(l)) : e != null ? vc(t, Ul(e)) : a != null && t.removeAttribute("value"), u == null && n != null && (t.defaultChecked = !!n), u != null && (t.checked = u && typeof u != "function" && typeof u != "symbol"), c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? t.name = "" + Ul(c) : t.removeAttribute("name");
  }
  function po(t, l, e, a, u, n, i, c) {
    if (n != null && typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" && (t.type = n), l != null || e != null) {
      if (!(n !== "submit" && n !== "reset" || l != null)) {
        mc(t);
        return;
      }
      e = e != null ? "" + Ul(e) : "", l = l != null ? "" + Ul(l) : e, c || l === t.value || (t.value = l), t.defaultValue = l;
    }
    a = a ?? u, a = typeof a != "function" && typeof a != "symbol" && !!a, t.checked = c ? t.checked : !!a, t.defaultChecked = !!a, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (t.name = i), mc(t);
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
      for (e = "" + Ul(e), l = null, u = 0; u < t.length; u++) {
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
    if (l != null && (l = "" + Ul(l), l !== t.value && (t.value = l), e == null)) {
      t.defaultValue !== l && (t.defaultValue = l);
      return;
    }
    t.defaultValue = e != null ? "" + Ul(e) : "";
  }
  function Eo(t, l, e, a) {
    if (l == null) {
      if (a != null) {
        if (e != null) throw Error(s(92));
        if (gt(a)) {
          if (1 < a.length) throw Error(s(93));
          a = a[0];
        }
        e = a;
      }
      e == null && (e = ""), l = e;
    }
    e = Ul(l), t.defaultValue = e, a = t.textContent, a === e && a !== "" && a !== null && (t.value = a), mc(t);
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
  var mv = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function _o(t, l, e) {
    var a = l.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === "" ? a ? t.setProperty(l, "") : l === "float" ? t.cssFloat = "" : t[l] = "" : a ? t.setProperty(l, e) : typeof e != "number" || e === 0 || mv.has(l) ? l === "float" ? t.cssFloat = e : t[l] = ("" + e).trim() : t[l] = e + "px";
  }
  function No(t, l, e) {
    if (l != null && typeof l != "object")
      throw Error(s(62));
    if (t = t.style, e != null) {
      for (var a in e)
        !e.hasOwnProperty(a) || l != null && l.hasOwnProperty(a) || (a.indexOf("--") === 0 ? t.setProperty(a, "") : a === "float" ? t.cssFloat = "" : t[a] = "", _t = !0);
      for (var u in l)
        a = l[u], l.hasOwnProperty(u) && e[u] !== a && (_o(t, u, a), _t = !0);
    } else
      for (var n in l)
        l.hasOwnProperty(n) && _o(t, n, l[n]);
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
  var dv = /* @__PURE__ */ new Map([
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
  ]), vv = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Gn(t) {
    return vv.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function ce() {
  }
  var yc = null;
  function gc(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var $a = null, Fa = null;
  function zo(t) {
    var l = Za(t);
    if (l && (t = l.stateNode)) {
      var e = t[Tl] || null;
      t: switch (t = l.stateNode, l.type) {
        case "input":
          if (dc(
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
              'input[name="' + Gl(
                "" + l
              ) + '"][type="radio"]'
            ), l = 0; l < e.length; l++) {
              var a = e[l];
              if (a !== t && a.form === t.form) {
                var u = a[Tl] || null;
                if (!u) throw Error(s(90));
                dc(
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
              a = e[l], a.form === t.form && bo(a);
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
  var Sc = !1;
  function Oo(t, l, e) {
    if (Sc) return t(l, e);
    Sc = !0;
    try {
      var a = t(l);
      return a;
    } finally {
      if (Sc = !1, ($a !== null || Fa !== null) && (Gi(), $a && (l = $a, t = Fa, Fa = $a = null, zo(l), t)))
        for (l = 0; l < t.length; l++) zo(t[l]);
    }
  }
  function Yu(t, l) {
    var e = t.stateNode;
    if (e === null) return null;
    var a = e[Tl] || null;
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
  var Te = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), bc = !1;
  if (Te)
    try {
      var Lu = {};
      Object.defineProperty(Lu, "passive", {
        get: function() {
          bc = !0;
        }
      }), window.addEventListener("test", Lu, Lu), window.removeEventListener("test", Lu, Lu);
    } catch {
      bc = !1;
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
  function Mo() {
    return !1;
  }
  function vl(t) {
    function l(e, a, u, n, i) {
      this._reactName = e, this._targetInst = u, this.type = a, this.nativeEvent = n, this.target = i, this.currentTarget = null;
      for (var c in t)
        t.hasOwnProperty(c) && (e = t[c], this[c] = e ? e(n) : n[c]);
      return this.isDefaultPrevented = (n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1) ? Zn : Mo, this.isPropagationStopped = Mo, this;
    }
    return I(l.prototype, {
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
  }, Vn = vl(Ye), Gu = I({}, Ye, { view: 0, detail: 0 }), hv = vl(Gu), Tc, Ec, Xu, wn = I({}, Gu, {
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
      return "movementX" in t ? t.movementX : (t !== Xu && (Xu && t.type === "mousemove" ? (Tc = t.screenX - Xu.screenX, Ec = t.screenY - Xu.screenY) : Ec = Tc = 0, Xu = t), Tc);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : Ec;
    }
  }), Do = vl(wn), yv = I({}, wn, { dataTransfer: 0 }), gv = vl(yv), Sv = I({}, Gu, { relatedTarget: 0 }), _c = vl(Sv), bv = I({}, Ye, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), pv = vl(bv), Tv = I({}, Ye, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), Ev = vl(Tv), _v = I({}, Ye, { data: 0 }), Co = vl(_v), Nv = {
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
  }, zv = {
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
  }, Ov = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Av(t) {
    var l = this.nativeEvent;
    return l.getModifierState ? l.getModifierState(t) : (t = Ov[t]) ? !!l[t] : !1;
  }
  function Nc() {
    return Av;
  }
  var Mv = I({}, Gu, {
    key: function(t) {
      if (t.key) {
        var l = Nv[t.key] || t.key;
        if (l !== "Unidentified") return l;
      }
      return t.type === "keypress" ? (t = Qn(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? zv[t.keyCode] || "Unidentified" : "";
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
  }), Dv = vl(Mv), Cv = I({}, wn, {
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
  }), Uo = vl(Cv), Uv = I({}, Ye, { submitter: 0 }), Rv = vl(Uv), xv = I({}, Gu, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Nc
  }), jv = vl(xv), Hv = I({}, Ye, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Bv = vl(Hv), qv = I({}, wn, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Yv = vl(qv), Lv = I({}, Ye, {
    newState: 0,
    oldState: 0,
    source: 0
  }), Gv = vl(Lv), Xv = [9, 13, 27, 32], zc = Te && "CompositionEvent" in window, Qu = null;
  Te && "documentMode" in document && (Qu = document.documentMode);
  var Qv = Te && "TextEvent" in window && !Qu, Ro = Te && (!zc || Qu && 8 < Qu && 11 >= Qu), xo = " ", jo = !1;
  function Ho(t, l) {
    switch (t) {
      case "keyup":
        return Xv.indexOf(l.keyCode) !== -1;
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
  function Bo(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var Wa = !1;
  function Zv(t, l) {
    switch (t) {
      case "compositionend":
        return Bo(l);
      case "keypress":
        return l.which !== 32 ? null : (jo = !0, xo);
      case "textInput":
        return t = l.data, t === xo && jo ? null : t;
      default:
        return null;
    }
  }
  function Vv(t, l) {
    if (Wa)
      return t === "compositionend" || !zc && Ho(t, l) ? (t = Ao(), Xn = pc = qe = null, Wa = !1, t) : null;
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
  var wv = {
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
  function qo(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l === "input" ? !!wv[t.type] : l === "textarea";
  }
  function Yo(t, l, e, a) {
    $a ? Fa ? Fa.push(a) : Fa = [a] : $a = a, l = Ki(l, "onChange"), 0 < l.length && (e = new Vn(
      "onChange",
      "change",
      null,
      e,
      a
    ), t.push({ event: e, listeners: l }));
  }
  var Zu = null, Vu = null;
  function Kv(t) {
    zd(t, 0);
  }
  function Kn(t) {
    var l = qu(t);
    if (bo(l)) return t;
  }
  function Lo(t, l) {
    if (t === "change") return l;
  }
  var Go = !1;
  if (Te) {
    var Oc;
    if (Te) {
      var Ac = "oninput" in document;
      if (!Ac) {
        var Xo = document.createElement("div");
        Xo.setAttribute("oninput", "return;"), Ac = typeof Xo.oninput == "function";
      }
      Oc = Ac;
    } else Oc = !1;
    Go = Oc && (!document.documentMode || 9 < document.documentMode);
  }
  function Qo() {
    Zu && (Zu.detachEvent("onpropertychange", Zo), Vu = Zu = null);
  }
  function Zo(t) {
    if (t.propertyName === "value" && Kn(Vu)) {
      var l = [];
      Yo(
        l,
        Vu,
        t,
        gc(t)
      ), Oo(Kv, l);
    }
  }
  function Jv(t, l, e) {
    t === "focusin" ? (Qo(), Zu = l, Vu = e, Zu.attachEvent("onpropertychange", Zo)) : t === "focusout" && Qo();
  }
  function $v(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return Kn(Vu);
  }
  function Fv(t, l) {
    if (t === "click") return Kn(l);
  }
  function Wv(t, l) {
    if (t === "input" || t === "change")
      return Kn(l);
  }
  function kv(t, l) {
    return t === l && (t !== 0 || 1 / t === 1 / l) || t !== t && l !== l;
  }
  var Rl = typeof Object.is == "function" ? Object.is : kv;
  function wu(t, l) {
    if (Rl(t, l)) return !0;
    if (typeof t != "object" || t === null || typeof l != "object" || l === null)
      return !1;
    var e = Object.keys(t), a = Object.keys(l);
    if (e.length !== a.length) return !1;
    for (a = 0; a < e.length; a++) {
      var u = e[a];
      if (!ol.call(l, u) || !Rl(t[u], l[u]))
        return !1;
    }
    return !0;
  }
  function Mc(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  function Vo(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function wo(t, l) {
    var e = Vo(t);
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
      e = Vo(e);
    }
  }
  function Ko(t, l) {
    return t && l ? t === l ? !0 : t && t.nodeType === 3 ? !1 : l && l.nodeType === 3 ? Ko(t, l.parentNode) : "contains" in t ? t.contains(l) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(l) & 16) : !1 : !1;
  }
  function Jo(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var l = Mc(t.document); l instanceof t.HTMLIFrameElement; ) {
      try {
        var e = typeof l.contentWindow.location.href == "string";
      } catch {
        e = !1;
      }
      if (e) t = l.contentWindow;
      else break;
      l = Mc(t.document);
    }
    return l;
  }
  function Dc(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l && (l === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || l === "textarea" || t.contentEditable === "true");
  }
  var Iv = Te && "documentMode" in document && 11 >= document.documentMode, ka = null, Cc = null, Ku = null, Uc = !1;
  function $o(t, l, e) {
    var a = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    Uc || ka == null || ka !== Mc(a) || (a = ka, "selectionStart" in a && Dc(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), Ku && wu(Ku, a) || (Ku = a, a = Ki(Cc, "onSelect"), 0 < a.length && (l = new Vn(
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
  }, Rc = {}, Fo = {};
  Te && (Fo = document.createElement("div").style, "AnimationEvent" in window || (delete Ia.animationend.animation, delete Ia.animationiteration.animation, delete Ia.animationstart.animation), "TransitionEvent" in window || delete Ia.transitionend.transition);
  function ga(t) {
    if (Rc[t]) return Rc[t];
    if (!Ia[t]) return t;
    var l = Ia[t], e;
    for (e in l)
      if (l.hasOwnProperty(e) && e in Fo)
        return Rc[t] = l[e];
    return t;
  }
  var Wo = ga("animationend"), ko = ga("animationiteration"), Io = ga("animationstart"), Pv = ga("transitionrun"), th = ga("transitionstart"), lh = ga("transitioncancel"), Po = ga("transitionend"), tr = /* @__PURE__ */ new Map(), xc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  xc.push("scrollEnd");
  function Il(t, l) {
    tr.set(t, l), ha(l, [t]);
  }
  var eh = 0;
  function Ee(t, l) {
    if (t.name != null && t.name !== "auto") return t.name;
    if (l.autoName !== null) return l.autoName;
    t = ee.identifierPrefix;
    var e = eh++;
    return t = "_" + t + "t_" + e.toString(32) + "_", l.autoName = t;
  }
  function lr(t) {
    if (t == null || typeof t == "string")
      return t;
    var l = null, e = Su;
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
  function _e(t, l) {
    return t = lr(t), l = lr(l), l == null ? t === "auto" ? null : t : l === "auto" ? null : l;
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
      n !== 0 && er(e, u, n);
    }
  }
  function Fn(t, l, e, a) {
    Xl[Pa++] = t, Xl[Pa++] = l, Xl[Pa++] = e, Xl[Pa++] = a, jc |= a, t.lanes |= a, t = t.alternate, t !== null && (t.lanes |= a);
  }
  function Hc(t, l, e, a) {
    return Fn(t, l, e, a), Wn(t);
  }
  function Sa(t, l) {
    return Fn(t, null, null, l), Wn(t);
  }
  function er(t, l, e) {
    t.lanes |= e;
    var a = t.alternate;
    a !== null && (a.lanes |= e);
    for (var u = !1, n = t.return; n !== null; )
      n.childLanes |= e, a = n.alternate, a !== null && (a.childLanes |= e), n.tag === 22 && (t = n.stateNode, t === null || t._visibility & 1 || (u = !0)), t = n, n = n.return;
    return t.tag === 3 ? (n = t.stateNode, u && l !== null && (u = 31 - Cl(e), t = n.hiddenUpdates, a = t[u], a === null ? t[u] = [l] : a.push(l), l.lane = e | 536870912), n) : null;
  }
  function Wn(t) {
    if (50 < hn)
      throw hn = 0, Li = null, Error(s(185));
    for (var l = t.return; l !== null; )
      t = l, l = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var tu = {};
  function ah(t, l, e, a) {
    this.tag = t, this.key = e, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = l, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function El(t, l, e, a) {
    return new ah(t, l, e, a);
  }
  function Bc(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Ne(t, l) {
    var e = t.alternate;
    return e === null ? (e = El(
      t.tag,
      l,
      t.key,
      t.mode
    ), e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.alternate = t, t.alternate = e) : (e.pendingProps = l, e.type = t.type, e.flags = 0, e.subtreeFlags = 0, e.deletions = null), e.flags = t.flags & 1206910976, e.childLanes = t.childLanes, e.lanes = t.lanes, e.child = t.child, e.memoizedProps = t.memoizedProps, e.memoizedState = t.memoizedState, e.updateQueue = t.updateQueue, l = t.dependencies, e.dependencies = l === null ? null : { lanes: l.lanes, firstContext: l.firstContext }, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.refCleanup = t.refCleanup, e;
  }
  function ar(t, l) {
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
      i = Uy(
        t,
        e,
        Mt.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (a) {
        case Sl:
          return t = El(31, e, l, u), t.elementType = Sl, t.lanes = n, t;
        case q:
          return ba(e.children, u, n, l);
        case X:
          i = 8, u |= 24;
          break;
        case Bt:
          return t = El(12, e, l, u | 2), t.elementType = Bt, t.lanes = n, t;
        case V:
          return t = El(13, e, l, u), t.elementType = V, t.lanes = n, t;
        case $:
          return t = El(19, e, l, u), t.elementType = $, t.lanes = n, t;
        case Wl:
        case d:
          return t = u | 32, t = El(30, e, l, t), t.elementType = d, t.lanes = n, t.stateNode = {
            autoName: null,
            paired: null,
            clones: null,
            ref: null
          }, t;
        default:
          if (typeof a == "object" && a !== null)
            switch (a.$$typeof) {
              case bt:
                i = 10;
                break t;
              case dl:
                i = 9;
                break t;
              case U:
                i = 11;
                break t;
              case Tt:
                i = 14;
                break t;
              case ft:
                i = 16, a = null;
                break t;
            }
          i = 29, e = Error(
            s(130, t === null ? "null" : typeof t, "")
          ), a = null;
      }
    return l = El(i, e, l, u), l.elementType = t, l.type = a, l.lanes = n, l;
  }
  function ba(t, l, e, a) {
    return t = El(7, t, a, l), t.lanes = e, t;
  }
  function qc(t, l, e) {
    return t = El(6, t, null, l), t.lanes = e, t;
  }
  function ur(t) {
    var l = El(18, null, null, 0);
    return l.stateNode = t, l;
  }
  function Yc(t, l, e) {
    return l = El(
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
  var nr = /* @__PURE__ */ new WeakMap();
  function Ql(t, l) {
    if (typeof t == "object" && t !== null) {
      var e = nr.get(t);
      return e !== void 0 ? e : (l = {
        value: t,
        source: l,
        stack: pl(l)
      }, nr.set(t, l), l);
    }
    return {
      value: t,
      source: l,
      stack: pl(l)
    };
  }
  var lu = [], eu = 0, In = null, Ju = 0, Zl = [], Vl = 0, Le = null, fe = 1, se = "";
  function ze(t, l) {
    lu[eu++] = Ju, lu[eu++] = In, In = t, Ju = l;
  }
  function ir(t, l, e) {
    Zl[Vl++] = fe, Zl[Vl++] = se, Zl[Vl++] = Le, Le = t;
    var a = fe;
    t = se;
    var u = 32 - Cl(a) - 1;
    a &= ~(1 << u), e += 1;
    var n = 32 - Cl(l) + u;
    if (30 < n) {
      var i = u - u % 5;
      n = (a & (1 << i) - 1).toString(32), a >>= i, u -= i, fe = 1 << 32 - Cl(l) + u | e << u | a, se = n + t;
    } else
      fe = 1 << n | e << u | a, se = t;
  }
  function Pn(t) {
    t.return !== null && (ze(t, 1), ir(t, 1, 0));
  }
  function Lc(t) {
    for (; t === In; )
      In = lu[--eu], lu[eu] = null, Ju = lu[--eu], lu[eu] = null;
    for (; t === Le; )
      Le = Zl[--Vl], Zl[Vl] = null, se = Zl[--Vl], Zl[Vl] = null, fe = Zl[--Vl], Zl[Vl] = null;
  }
  function cr(t, l) {
    Zl[Vl++] = fe, Zl[Vl++] = se, Zl[Vl++] = Le, fe = l.id, se = l.overflow, Le = t;
  }
  var Pt = null, jt = null, nt = !1, Ge = null, wl = !1, Gc = Error(s(519));
  function Xe(t) {
    var l = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw $u(Ql(l, t)), Gc;
  }
  function fr(t) {
    var l = t.stateNode, e = t.type, a = t.memoizedProps;
    switch (l[el] = t, l[Tl] = a, e) {
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
        mt("invalid", l), po(
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
    e = a.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || l.textContent === "" + e || a.suppressHydrationWarning === !0 || Dd(l.textContent, e) ? (a.popover != null && (mt("beforetoggle", l), mt("toggle", l)), a.onScroll != null && mt("scroll", l), a.onScrollEnd != null && mt("scrollend", l), a.onClick != null && (l.onclick = ce), l = !0) : l = !1, l || Xe(t, !0);
  }
  function ti(t) {
    for (Pt = t.return; Pt; )
      switch (Pt.tag) {
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
          Pt = Pt.return;
      }
  }
  function au(t) {
    if (t !== Pt) return !1;
    if (!nt) return ti(t), nt = !0, !1;
    var l = t.tag, e;
    if ((e = l !== 3 && l !== 27) && ((e = l === 5) && (e = t.type, e = !(e !== "form" && e !== "button") || gs(t.type, t.memoizedProps)), e = !e), e && jt && Xe(t), ti(t), l === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      jt = $d(t);
    } else if (l === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      jt = $d(t);
    } else
      l === 27 ? (l = jt, aa(t.type) ? (t = Os, Os = null, jt = t) : jt = l) : jt = Pt ? Jl(t.stateNode.nextSibling) : null;
    return !0;
  }
  function pa() {
    jt = Pt = null, nt = !1;
  }
  function Xc() {
    var t = Ge;
    return t !== null && (zl === null ? zl = t : zl.push.apply(
      zl,
      t
    ), Ge = null), t;
  }
  function $u(t) {
    Ge === null ? Ge = [t] : Ge.push(t);
  }
  var Qc = Al(null), Ta = null, Oe = null;
  function Qe(t, l, e) {
    Et(Qc, l._currentValue), l._currentValue = e;
  }
  function Ae(t) {
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
  function Ea(t, l, e, a) {
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
          Rl(u.pendingProps.value, i.value) || (t !== null ? t.push(c) : t = [c]);
        }
      } else if (u === He.current) {
        if (i = u.alternate, i === null) throw Error(s(387));
        i.memoizedState.memoizedState !== u.memoizedState.memoizedState && (t !== null ? t.push(Mu) : t = [Mu]);
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
      if (!Rl(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function _a(t) {
    Ta = t, Oe = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function al(t) {
    return sr(Ta, t);
  }
  function ai(t, l) {
    return Ta === null && _a(t), sr(t, l);
  }
  function sr(t, l) {
    var e = l._currentValue;
    if (l = { context: l, memoizedValue: e, next: null }, Oe === null) {
      if (t === null) throw Error(s(308));
      Oe = l, t.dependencies = { lanes: 0, firstContext: l }, t.flags |= 524288;
    } else Oe = Oe.next = l;
    return e;
  }
  var uh = typeof AbortController < "u" ? AbortController : function() {
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
  }, nh = f.unstable_scheduleCallback, ih = f.unstable_NormalPriority, wt = {
    $$typeof: bt,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Vc() {
    return {
      controller: new uh(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Fu(t) {
    t.refCount--, t.refCount === 0 && nh(ih, function() {
      t.controller.abort();
    });
  }
  function or(t, l) {
    if ((t.pendingLanes & 4194048) !== 0) {
      var e = t.transitionTypes;
      for (e === null && (e = t.transitionTypes = []), t = 0; t < l.length; t++) {
        var a = l[t];
        e.indexOf(a) === -1 && e.push(a);
      }
    }
  }
  var Wu = null;
  function ch(t) {
    var l = t.transitionTypes;
    return t.transitionTypes = null, l;
  }
  var ku = null, wc = 0, Na = 0, uu = null;
  function fh(t, l) {
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
    return wc++, l.then(rr, rr), l;
  }
  function rr() {
    if (--wc === 0 && (Wu = null, ku !== null)) {
      uu !== null && (uu.status = "fulfilled");
      var t = ku;
      ku = null, Na = 0, uu = null;
      for (var l = 0; l < t.length; l++) (0, t[l])();
    }
  }
  function sh(t, l) {
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
    if (ud = Ml(), typeof l == "object" && l !== null && typeof l.then == "function" && fh(t, l), Wu !== null)
      for (var e = Eu; e !== null; )
        or(e, Wu), e = e.next;
    if (e = t.types, e !== null) {
      for (var a = Eu; a !== null; )
        or(a, e), a = a.next;
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
  var za = Al(null);
  function Kc() {
    var t = za.current;
    return t !== null ? t : xt.pooledCache;
  }
  function ui(t, l) {
    l === null ? Et(za, za.current) : Et(za, l.pool);
  }
  function dr() {
    var t = Kc();
    return t === null ? null : { parent: wt._currentValue, pool: t };
  }
  var nu = Error(s(460)), Jc = Error(s(474)), ni = Error(s(542)), ii = { then: function() {
  } };
  function vr(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function hr(t, l, e) {
    switch (e = t[e], e === void 0 ? t.push(l) : e !== l && (l.then(ce, ce), l = e), l.status) {
      case "fulfilled":
        return l.value;
      case "rejected":
        throw t = l.reason, gr(t), t === void 0 && !("reason" in l) ? Error(s(600)) : t;
      default:
        if (typeof l.status == "string") l.then(ce, ce);
        else {
          if (t = xt, t !== null && 100 < t.shellSuspendCounter)
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
            throw t = l.reason, gr(t), t;
        }
        throw Aa = l, nu;
    }
  }
  function Oa(t) {
    try {
      var l = t._init;
      return l(t._payload);
    } catch (e) {
      throw e !== null && typeof e == "object" && typeof e.then == "function" ? (Aa = e, nu) : e;
    }
  }
  var Aa = null;
  function yr() {
    if (Aa === null) throw Error(s(459));
    var t = Aa;
    return Aa = null, t;
  }
  function gr(t) {
    if (t === nu || t === ni)
      throw Error(s(483));
  }
  var iu = null, Iu = 0;
  function ci(t) {
    var l = Iu;
    return Iu += 1, iu === null && (iu = []), hr(iu, t, l);
  }
  function Ze(t, l) {
    l = l.props.ref, t.ref = l !== void 0 ? l : null;
  }
  function fi(t, l) {
    throw l.$$typeof === W ? Error(s(525)) : (t = Object.prototype.toString.call(l), Error(
      s(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(l).join(", ") + "}" : t
      )
    ));
  }
  function Sr(t) {
    function l(y, m) {
      if (t) {
        var b = y.deletions;
        b === null ? (y.deletions = [m], y.flags |= 16) : b.push(m);
      }
    }
    function e(y, m) {
      if (!t) return null;
      for (; m !== null; )
        l(y, m), m = m.sibling;
      return null;
    }
    function a(y) {
      for (var m = /* @__PURE__ */ new Map(); y !== null; )
        y.key === null ? m.set(y.index, y) : m.set(y.key, y), y = y.sibling;
      return m;
    }
    function u(y, m) {
      return y = Ne(y, m), y.index = 0, y.sibling = null, y;
    }
    function n(y, m, b) {
      return y.index = b, t ? (b = y.alternate, b !== null ? (b = b.index, b < m ? (y.flags |= 2, m) : b) : (y.flags |= 134217730, m)) : (y.flags |= 1048576, m);
    }
    function i(y) {
      return t && y.alternate === null && (y.flags |= 134217730), y;
    }
    function c(y, m, b, N) {
      return m === null || m.tag !== 6 ? (m = qc(b, y.mode, N), m.return = y, m) : (m = u(m, b), m.return = y, m);
    }
    function r(y, m, b, N) {
      var Y = b.type;
      return Y === q ? (y = E(
        y,
        m,
        b.props.children,
        N,
        b.key
      ), Ze(y, b), y) : m !== null && (m.elementType === Y || typeof Y == "object" && Y !== null && Y.$$typeof === ft && Oa(Y) === m.type) ? (m = u(m, b.props), Ze(m, b), m.return = y, m) : (m = kn(
        b.type,
        b.key,
        b.props,
        null,
        y.mode,
        N
      ), Ze(m, b), m.return = y, m);
    }
    function g(y, m, b, N) {
      return m === null || m.tag !== 4 || m.stateNode.containerInfo !== b.containerInfo || m.stateNode.implementation !== b.implementation ? (m = Yc(b, y.mode, N), m.return = y, m) : (m = u(m, b.children || []), m.return = y, m);
    }
    function E(y, m, b, N, Y) {
      return m === null || m.tag !== 7 ? (m = ba(
        b,
        y.mode,
        N,
        Y
      ), m.return = y, m) : (m = u(m, b), m.return = y, m);
    }
    function O(y, m, b) {
      if (typeof m == "string" && m !== "" || typeof m == "number" || typeof m == "bigint")
        return m = qc(
          "" + m,
          y.mode,
          b
        ), m.return = y, m;
      if (typeof m == "object" && m !== null) {
        switch (m.$$typeof) {
          case Nt:
            return b = kn(
              m.type,
              m.key,
              m.props,
              null,
              y.mode,
              b
            ), Ze(b, m), b.return = y, b;
          case B:
            return m = Yc(
              m,
              y.mode,
              b
            ), m.return = y, m;
          case ft:
            return m = Oa(m), O(y, m, b);
        }
        if (gt(m) || K(m))
          return m = ba(
            m,
            y.mode,
            b,
            null
          ), m.return = y, m;
        if (typeof m.then == "function")
          return O(y, ci(m), b);
        if (m.$$typeof === bt)
          return O(
            y,
            ai(y, m),
            b
          );
        fi(y, m);
      }
      return null;
    }
    function h(y, m, b, N) {
      var Y = m !== null ? m.key : null;
      if (typeof b == "string" && b !== "" || typeof b == "number" || typeof b == "bigint")
        return Y !== null ? null : c(y, m, "" + b, N);
      if (typeof b == "object" && b !== null) {
        switch (b.$$typeof) {
          case Nt:
            return b.key === Y ? r(y, m, b, N) : null;
          case B:
            return b.key === Y ? g(y, m, b, N) : null;
          case ft:
            return b = Oa(b), h(y, m, b, N);
        }
        if (gt(b) || K(b))
          return Y !== null ? null : E(y, m, b, N, null);
        if (typeof b.then == "function")
          return h(
            y,
            m,
            ci(b),
            N
          );
        if (b.$$typeof === bt)
          return h(
            y,
            m,
            ai(y, b),
            N
          );
        fi(y, b);
      }
      return null;
    }
    function p(y, m, b, N, Y) {
      if (typeof N == "string" && N !== "" || typeof N == "number" || typeof N == "bigint")
        return y = y.get(b) || null, c(m, y, "" + N, Y);
      if (typeof N == "object" && N !== null) {
        switch (N.$$typeof) {
          case Nt:
            return y = y.get(
              N.key === null ? b : N.key
            ) || null, r(m, y, N, Y);
          case B:
            return y = y.get(
              N.key === null ? b : N.key
            ) || null, g(m, y, N, Y);
          case ft:
            return N = Oa(N), p(
              y,
              m,
              b,
              N,
              Y
            );
        }
        if (gt(N) || K(N))
          return y = y.get(b) || null, E(m, y, N, Y, null);
        if (typeof N.then == "function")
          return p(
            y,
            m,
            b,
            ci(N),
            Y
          );
        if (N.$$typeof === bt)
          return p(
            y,
            m,
            b,
            ai(m, N),
            Y
          );
        fi(m, N);
      }
      return null;
    }
    function x(y, m, b, N) {
      for (var Y = null, ht = null, J = m, k = m = 0, $t = null; J !== null && k < b.length; k++) {
        J.index > k ? ($t = J, J = null) : $t = J.sibling;
        var St = h(
          y,
          J,
          b[k],
          N
        );
        if (St === null) {
          J === null && (J = $t);
          break;
        }
        t && J && St.alternate === null && l(y, J), m = n(St, m, k), ht === null ? Y = St : ht.sibling = St, ht = St, J = $t;
      }
      if (k === b.length)
        return e(y, J), nt && ze(y, k), Y;
      if (J === null) {
        for (; k < b.length; k++)
          J = O(y, b[k], N), J !== null && (m = n(
            J,
            m,
            k
          ), ht === null ? Y = J : ht.sibling = J, ht = J);
        return nt && ze(y, k), Y;
      }
      for (J = a(J); k < b.length; k++)
        $t = p(
          J,
          y,
          k,
          b[k],
          N
        ), $t !== null && (t && (St = $t.alternate, St !== null && J.delete(St.key === null ? k : St.key)), m = n(
          $t,
          m,
          k
        ), ht === null ? Y = $t : ht.sibling = $t, ht = $t);
      return t && J.forEach(function(fa) {
        return l(y, fa);
      }), nt && ze(y, k), Y;
    }
    function Q(y, m, b, N) {
      if (b == null) throw Error(s(151));
      for (var Y = null, ht = null, J = m, k = m = 0, $t = null, St = b.next(); J !== null && !St.done; k++, St = b.next()) {
        J.index > k ? ($t = J, J = null) : $t = J.sibling;
        var fa = h(y, J, St.value, N);
        if (fa === null) {
          J === null && (J = $t);
          break;
        }
        t && J && fa.alternate === null && l(y, J), m = n(fa, m, k), ht === null ? Y = fa : ht.sibling = fa, ht = fa, J = $t;
      }
      if (St.done)
        return e(y, J), nt && ze(y, k), Y;
      if (J === null) {
        for (; !St.done; k++, St = b.next())
          St = O(y, St.value, N), St !== null && (m = n(St, m, k), ht === null ? Y = St : ht.sibling = St, ht = St);
        return nt && ze(y, k), Y;
      }
      for (J = a(J); !St.done; k++, St = b.next())
        St = p(J, y, k, St.value, N), St !== null && (t && ($t = St.alternate, $t !== null && J.delete(
          $t.key === null ? k : $t.key
        )), m = n(St, m, k), ht === null ? Y = St : ht.sibling = St, ht = St);
      return t && J.forEach(function(Zy) {
        return l(y, Zy);
      }), nt && ze(y, k), Y;
    }
    function et(y, m, b, N) {
      if (typeof b == "object" && b !== null && b.type === q && b.key === null && b.props.ref === void 0 && (b = b.props.children), typeof b == "object" && b !== null) {
        switch (b.$$typeof) {
          case Nt:
            t: {
              for (var Y = b.key; m !== null; ) {
                if (m.key === Y) {
                  if (Y = b.type, Y === q) {
                    if (m.tag === 7) {
                      e(
                        y,
                        m.sibling
                      ), N = u(
                        m,
                        b.props.children
                      ), Ze(N, b), N.return = y, y = N;
                      break t;
                    }
                  } else if (m.elementType === Y || typeof Y == "object" && Y !== null && Y.$$typeof === ft && Oa(Y) === m.type) {
                    e(
                      y,
                      m.sibling
                    ), N = u(m, b.props), Ze(N, b), N.return = y, y = N;
                    break t;
                  }
                  e(y, m);
                  break;
                } else l(y, m);
                m = m.sibling;
              }
              b.type === q ? (N = ba(
                b.props.children,
                y.mode,
                N,
                b.key
              ), Ze(N, b), N.return = y, y = N) : (N = kn(
                b.type,
                b.key,
                b.props,
                null,
                y.mode,
                N
              ), Ze(N, b), N.return = y, y = N);
            }
            return i(y);
          case B:
            t: {
              for (Y = b.key; m !== null; ) {
                if (m.key === Y)
                  if (m.tag === 4 && m.stateNode.containerInfo === b.containerInfo && m.stateNode.implementation === b.implementation) {
                    e(
                      y,
                      m.sibling
                    ), N = u(m, b.children || []), N.return = y, y = N;
                    break t;
                  } else {
                    e(y, m);
                    break;
                  }
                else l(y, m);
                m = m.sibling;
              }
              N = Yc(b, y.mode, N), N.return = y, y = N;
            }
            return i(y);
          case ft:
            return b = Oa(b), et(
              y,
              m,
              b,
              N
            );
        }
        if (gt(b))
          return x(
            y,
            m,
            b,
            N
          );
        if (K(b)) {
          if (Y = K(b), typeof Y != "function") throw Error(s(150));
          return b = Y.call(b), Q(
            y,
            m,
            b,
            N
          );
        }
        if (typeof b.then == "function")
          return et(
            y,
            m,
            ci(b),
            N
          );
        if (b.$$typeof === bt)
          return et(
            y,
            m,
            ai(y, b),
            N
          );
        fi(y, b);
      }
      return typeof b == "string" && b !== "" || typeof b == "number" || typeof b == "bigint" ? (b = "" + b, m !== null && m.tag === 6 ? (e(y, m.sibling), N = u(m, b), N.return = y, y = N) : (e(y, m), N = qc(b, y.mode, N), N.return = y, y = N), i(y)) : e(y, m);
    }
    return function(y, m, b, N) {
      try {
        Iu = 0;
        var Y = et(
          y,
          m,
          b,
          N
        );
        return iu = null, Y;
      } catch (J) {
        if (J === nu || J === ni) throw J;
        var ht = El(29, J, null, y.mode);
        return ht.lanes = N, ht.return = y, ht;
      }
    };
  }
  var Ma = Sr(!0), br = Sr(!1), Ve = !1;
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
      return u === null ? l.next = l : (l.next = u.next, u.next = l), a.pending = l, l = Wn(t), er(t, null, e), l;
    }
    return Fn(t, a, l, e), Wn(t);
  }
  function Pu(t, l, e) {
    if (l = l.updateQueue, l !== null && (l = l.shared, (e & 4194048) !== 0)) {
      var a = l.lanes;
      a &= t.pendingLanes, e |= a, l.lanes = e, no(t, e);
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
      var r = c, g = r.next;
      r.next = null, i === null ? n = g : i.next = g, i = r;
      var E = t.alternate;
      E !== null && (E = E.updateQueue, c = E.lastBaseUpdate, c !== i && (c === null ? E.firstBaseUpdate = g : c.next = g, E.lastBaseUpdate = r));
    }
    if (n !== null) {
      var O = u.baseState;
      i = 0, E = g = r = null, c = n;
      do {
        var h = c.lane & -536870913, p = h !== c.lane;
        if (p ? (vt & h) === h : (a & h) === h) {
          h !== 0 && h === Na && (kc = !0), E !== null && (E = E.next = {
            lane: 0,
            tag: c.tag,
            payload: c.payload,
            callback: null,
            next: null
          });
          t: {
            var x = t, Q = c;
            h = l;
            var et = e;
            switch (Q.tag) {
              case 1:
                if (x = Q.payload, typeof x == "function") {
                  O = x.call(et, O, h);
                  break t;
                }
                O = x;
                break t;
              case 3:
                x.flags = x.flags & -65537 | 128;
              case 0:
                if (x = Q.payload, h = typeof x == "function" ? x.call(et, O, h) : x, h == null) break t;
                O = I({}, O, h);
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
          }, E === null ? (g = E = p, r = O) : E = E.next = p, i |= h;
        if (c = c.next, c === null) {
          if (c = u.shared.pending, c === null)
            break;
          p = c, c = p.next, p.next = null, u.lastBaseUpdate = p, u.shared.pending = null;
        }
      } while (!0);
      E === null && (r = O), u.baseState = r, u.firstBaseUpdate = g, u.lastBaseUpdate = E, n === null && (u.shared.lanes = 0), Pe |= i, t.lanes = i, t.memoizedState = O;
    }
  }
  function pr(t, l) {
    if (typeof t != "function")
      throw Error(s(191, t));
    t.call(l);
  }
  function Tr(t, l) {
    var e = t.callbacks;
    if (e !== null)
      for (t.callbacks = null, t = 0; t < e.length; t++)
        pr(e[t], l);
  }
  var Je = Al(null), si = Al(0);
  function Er(t, l) {
    t = Re, Et(si, t), Et(Je, l), Re = t | l.baseLanes;
  }
  function Ic() {
    Et(si, Re), Et(Je, Je.current);
  }
  function Pc() {
    Re = si.current, Ft(Je), Ft(si);
  }
  var ul = Al(null), rl = null;
  function $e(t) {
    var l = t.alternate;
    Et(nl, nl.current & 1), Et(ul, t), rl === null && (l === null || Je.current !== null || l.memoizedState !== null) && (rl = t);
  }
  function tf(t) {
    Et(nl, nl.current), Et(ul, t), rl === null && (rl = t);
  }
  function _r(t) {
    t.tag === 22 ? (Et(nl, nl.current), Et(ul, t), rl === null && (rl = t)) : Fe();
  }
  function Fe() {
    Et(nl, nl.current), Et(ul, ul.current);
  }
  function xl(t) {
    Ft(ul), rl === t && (rl = null), Ft(nl);
  }
  var nl = Al(0);
  function en(t, l) {
    Et(ul, ul.current), Et(nl, l);
  }
  function lf(t) {
    Ft(nl), Ft(ul), rl === t && (rl = null);
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
  var Me = 0, lt = null, Rt = null, Kt = null, ri = !1, cu = !1, Da = !1, mi = 0, an = 0, fu = null, oh = 0;
  function Xt() {
    throw Error(s(321));
  }
  function ef(t, l) {
    if (l === null) return !1;
    for (var e = 0; e < l.length && e < t.length; e++)
      if (!Rl(t[e], l[e])) return !1;
    return !0;
  }
  function af(t, l, e, a, u, n) {
    return Me = n, lt = l, l.memoizedState = null, l.updateQueue = null, l.lanes = 0, L.H = t === null || t.memoizedState === null ? im : cm, Da = !1, n = e(a, u), Da = !1, cu && (n = zr(
      l,
      e,
      a,
      u
    )), Nr(t), n;
  }
  function Nr(t) {
    L.H = bi;
    var l = Rt !== null && Rt.next !== null;
    if (Me = 0, Kt = Rt = lt = null, ri = !1, an = 0, fu = null, l) throw Error(s(300));
    t === null || Jt || (t = t.dependencies, t !== null && ei(t) && (Jt = !0));
  }
  function zr(t, l, e, a) {
    lt = t;
    var u = 0;
    do {
      if (cu && (fu = null), an = 0, cu = !1, 25 <= u) throw Error(s(301));
      if (u += 1, Kt = Rt = null, t.updateQueue != null) {
        var n = t.updateQueue;
        n.lastEffect = null, n.events = null, n.stores = null, n.memoCache != null && (n.memoCache.index = 0);
      }
      L.H = Sh, n = l(e, a);
    } while (cu);
    return n;
  }
  function rh() {
    var t = L.H, l = t.useState()[0];
    return l = typeof l.then == "function" ? un(l) : l, t = t.useState()[0], (Rt !== null ? Rt.memoizedState : null) !== t && (lt.flags |= 1024), l;
  }
  function uf() {
    var t = mi !== 0;
    return mi = 0, t;
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
    Me = 0, Kt = Rt = lt = null, cu = !1, an = mi = 0, fu = null;
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
  function Zt() {
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
  function di() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function un(t) {
    var l = an;
    return an += 1, fu === null && (fu = []), t = hr(fu, t, l), l = lt, (Kt === null ? l.memoizedState : Kt.next) === null && (l = l.alternate, L.H = l === null || l.memoizedState === null ? im : cm), t;
  }
  function vi(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return un(t);
      if (t.$$typeof === D) return;
      if (t.$$typeof === bt) return al(t);
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
    if (l == null && (l = { data: [], index: 0 }), e === null && (e = di(), lt.updateQueue = e), e.memoCache = l, e = l.data[l.index], e === void 0)
      for (e = l.data[l.index] = Array(t), a = 0; a < t; a++)
        e[a] = kl;
    return l.index++, e;
  }
  function De(t, l) {
    return typeof l == "function" ? l(t) : l;
  }
  function hi(t) {
    var l = Zt();
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
      var c = i = null, r = null, g = l, E = !1;
      do {
        var O = g.lane & -536870913;
        if (O !== g.lane ? (vt & O) === O : (Me & O) === O) {
          var h = g.revertLane;
          if (h === 0)
            r !== null && (r = r.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: g.action,
              hasEagerState: g.hasEagerState,
              eagerState: g.eagerState,
              next: null
            }), O === Na && (E = !0);
          else if ((Me & h) === h) {
            g = g.next, h === Na && (E = !0);
            continue;
          } else
            O = {
              lane: 0,
              revertLane: g.revertLane,
              gesture: null,
              action: g.action,
              hasEagerState: g.hasEagerState,
              eagerState: g.eagerState,
              next: null
            }, r === null ? (c = r = O, i = n) : r = r.next = O, lt.lanes |= h, Pe |= h;
          O = g.action, Da && e(n, O), n = g.hasEagerState ? g.eagerState : e(n, O);
        } else
          h = {
            lane: O,
            revertLane: g.revertLane,
            gesture: g.gesture,
            action: g.action,
            hasEagerState: g.hasEagerState,
            eagerState: g.eagerState,
            next: null
          }, r === null ? (c = r = h, i = n) : r = r.next = h, lt.lanes |= O, Pe |= O;
        g = g.next;
      } while (g !== null && g !== l);
      if (r === null ? i = n : r.next = c, !Rl(n, t.memoizedState) && (Jt = !0, E && (e = uu, e !== null)))
        throw e;
      t.memoizedState = n, t.baseState = i, t.baseQueue = r, a.lastRenderedState = n;
    }
    return u === null && (a.lanes = 0), [t.memoizedState, a.dispatch];
  }
  function of(t) {
    var l = Zt(), e = l.queue;
    if (e === null) throw Error(s(311));
    e.lastRenderedReducer = t;
    var a = e.dispatch, u = e.pending, n = l.memoizedState;
    if (u !== null) {
      e.pending = null;
      var i = u = u.next;
      do
        n = t(n, i.action), i = i.next;
      while (i !== u);
      Rl(n, l.memoizedState) || (Jt = !0), l.memoizedState = n, l.baseQueue === null && (l.baseState = n), e.lastRenderedState = n;
    }
    return [n, a];
  }
  function Or(t, l, e) {
    var a = lt, u = Zt(), n = nt;
    if (n) {
      if (e === void 0) throw Error(s(407));
      e = e();
    } else e = l();
    var i = !Rl(
      (Rt || u).memoizedState,
      e
    );
    if (i && (u.memoizedState = e, Jt = !0), u = u.queue, df(Dr.bind(null, a, u, t), [
      t
    ]), t = u.getSnapshot !== l || i || Kt !== null && (Kt.memoizedState.tag & 1) !== 0, su(
      t ? 9 : 8,
      { destroy: void 0 },
      Mr.bind(null, a, u, e, l),
      null
    ), t) {
      if (a.flags |= 2048, xt === null) throw Error(s(349));
      n || (Me & 127) !== 0 || Ar(a, l, e);
    }
    return e;
  }
  function Ar(t, l, e) {
    t.flags |= 16384, t = { getSnapshot: l, value: e }, l = lt.updateQueue, l === null ? (l = di(), lt.updateQueue = l, l.stores = [t]) : (e = l.stores, e === null ? l.stores = [t] : e.push(t));
  }
  function Mr(t, l, e, a) {
    l.value = e, l.getSnapshot = a, Cr(l) && Ur(t);
  }
  function Dr(t, l, e) {
    return e(function() {
      Cr(l) && Ur(t);
    });
  }
  function Cr(t) {
    var l = t.getSnapshot;
    t = t.value;
    try {
      var e = l();
      return !Rl(t, e);
    } catch {
      return !0;
    }
  }
  function Ur(t) {
    var l = Sa(t, 2);
    l !== null && Ol(l, t, 2);
  }
  function rf(t) {
    var l = hl();
    if (typeof t == "function") {
      var e = t;
      if (t = e(), Da) {
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
      lastRenderedReducer: De,
      lastRenderedState: t
    }, l;
  }
  function Rr(t, l, e, a) {
    return t.baseState = e, sf(
      t,
      Rt,
      typeof a == "function" ? a : De
    );
  }
  function mh(t, l, e, a, u) {
    if (Si(t)) throw Error(s(485));
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
      L.T !== null ? e(!0) : n.isTransition = !1, a(n), e = l.pending, e === null ? (n.next = l.pending = n, xr(l, n)) : (n.next = e.next, l.pending = e.next = n);
    }
  }
  function xr(t, l) {
    var e = l.action, a = l.payload, u = t.state;
    if (l.isTransition) {
      var n = L.T, i = {};
      i.types = n !== null ? n.types : null, L.T = i;
      try {
        var c = e(u, a), r = L.S;
        r !== null && r(i, c), jr(t, l, c);
      } catch (g) {
        mf(t, l, g);
      } finally {
        n !== null && i.types !== null && (n.types = i.types), L.T = n;
      }
    } else
      try {
        n = e(u, a), jr(t, l, n);
      } catch (g) {
        mf(t, l, g);
      }
  }
  function jr(t, l, e) {
    e !== null && typeof e == "object" && typeof e.then == "function" ? e.then(
      function(a) {
        Hr(t, l, a);
      },
      function(a) {
        return mf(t, l, a);
      }
    ) : Hr(t, l, e);
  }
  function Hr(t, l, e) {
    l.status = "fulfilled", l.value = e, Br(l), t.state = e, l = t.pending, l !== null && (e = l.next, e === l ? t.pending = null : (e = e.next, l.next = e, xr(t, e)));
  }
  function mf(t, l, e) {
    var a = t.pending;
    if (t.pending = null, a !== null) {
      a = a.next;
      do
        l.status = "rejected", l.reason = e, Br(l), l = l.next;
      while (l !== a);
    }
    t.action = null;
  }
  function Br(t) {
    t = t.listeners;
    for (var l = 0; l < t.length; l++) (0, t[l])();
  }
  function qr(t, l) {
    return l;
  }
  function Yr(t, l) {
    if (nt) {
      var e = xt.formState;
      if (e !== null) {
        t: {
          var a = lt;
          if (nt) {
            if (jt) {
              l: {
                for (var u = jt, n = wl; u.nodeType !== 8; ) {
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
                jt = Jl(
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
      lastRenderedReducer: qr,
      lastRenderedState: l
    }, e.queue = a, e = am.bind(
      null,
      lt,
      a
    ), a.dispatch = e, a = rf(!1), n = Sf.bind(
      null,
      lt,
      !1,
      a.queue
    ), a = hl(), u = {
      state: l,
      dispatch: null,
      action: t,
      pending: null
    }, a.queue = u, e = mh.bind(
      null,
      lt,
      u,
      n,
      e
    ), u.dispatch = e, a.memoizedState = t, [l, e, !1];
  }
  function Lr(t) {
    var l = Zt();
    return Gr(l, Rt, t);
  }
  function Gr(t, l, e) {
    if (l = sf(
      t,
      l,
      qr
    )[0], t = hi(De)[0], typeof l == "object" && l !== null && typeof l.then == "function")
      try {
        var a = un(l);
      } catch (i) {
        throw i === nu ? ni : i;
      }
    else a = l;
    l = Zt();
    var u = l.queue, n = u.dispatch;
    return e !== l.memoizedState && (lt.flags |= 2048, su(
      9,
      { destroy: void 0 },
      dh.bind(null, u, e),
      null
    )), [a, n, t];
  }
  function dh(t, l) {
    t.action = l;
  }
  function Xr(t) {
    var l = Zt(), e = Rt;
    if (e !== null)
      return Gr(l, e, t);
    Zt(), l = l.memoizedState, e = Zt();
    var a = e.queue.dispatch;
    return e.memoizedState = t, [l, a, !1];
  }
  function su(t, l, e, a) {
    return t = { tag: t, create: e, deps: a, inst: l, next: null }, l = lt.updateQueue, l === null && (l = di(), lt.updateQueue = l), e = l.lastEffect, e === null ? l.lastEffect = t.next = t : (a = e.next, e.next = t, t.next = a, l.lastEffect = t), t;
  }
  function Qr() {
    return Zt().memoizedState;
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
    var u = Zt();
    a = a === void 0 ? null : a;
    var n = u.memoizedState.inst;
    Rt !== null && a !== null && ef(a, Rt.memoizedState.deps) ? u.memoizedState = su(l, n, e, a) : (lt.flags |= t, u.memoizedState = su(
      1 | l,
      n,
      e,
      a
    ));
  }
  function Zr(t, l) {
    yi(8390656, 8, t, l);
  }
  function df(t, l) {
    gi(2048, 8, t, l);
  }
  function vh(t) {
    lt.flags |= 4;
    var l = lt.updateQueue;
    if (l === null)
      l = di(), lt.updateQueue = l, l.events = [t];
    else {
      var e = l.events;
      e === null ? l.events = [t] : e.push(t);
    }
  }
  function Vr(t) {
    var l = Zt().memoizedState;
    return vh({ ref: l, nextImpl: t }), function() {
      if ((zt & 2) !== 0) throw Error(s(440));
      return l.impl.apply(void 0, arguments);
    };
  }
  function wr(t, l) {
    return gi(4, 2, t, l);
  }
  function Kr(t, l) {
    return gi(4, 4, t, l);
  }
  function Jr(t, l) {
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
  function $r(t, l, e) {
    e = e != null ? e.concat([t]) : null, gi(4, 4, Jr.bind(null, l, t), e);
  }
  function vf() {
  }
  function Fr(t, l) {
    var e = Zt();
    l = l === void 0 ? null : l;
    var a = e.memoizedState;
    return l !== null && ef(l, a[1]) ? a[0] : (e.memoizedState = [t, l], t);
  }
  function Wr(t, l) {
    var e = Zt();
    l = l === void 0 ? null : l;
    var a = e.memoizedState;
    if (l !== null && ef(l, a[1]))
      return a[0];
    if (a = t(), Da) {
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
    return e === void 0 || (Me & 1073741824) !== 0 && (vt & 261930) === 0 ? t.memoizedState = l : (t.memoizedState = e, t = id(), lt.lanes |= t, Pe |= t, e);
  }
  function kr(t, l, e, a) {
    return Rl(e, l) ? e : Je.current !== null ? (t = hf(t, e, a), Rl(t, l) || (Jt = !0), t) : (Me & 106) === 0 || (Me & 1073741824) !== 0 && (vt & 261930) === 0 ? (Jt = !0, t.memoizedState = e) : (t = id(), lt.lanes |= t, Pe |= t, l);
  }
  function Ir(t, l, e, a, u) {
    var n = F.p;
    F.p = n !== 0 && 8 > n ? n : 8;
    var i = L.T, c = {};
    c.types = i !== null ? i.types : null, L.T = c, Sf(t, !1, l, e);
    try {
      var r = u(), g = L.S;
      if (g !== null && g(c, r), r !== null && typeof r == "object" && typeof r.then == "function") {
        var E = sh(
          r,
          a
        );
        nn(
          t,
          l,
          E,
          ql(t)
        );
      } else
        nn(
          t,
          l,
          a,
          ql(t)
        );
    } catch (O) {
      nn(
        t,
        l,
        { then: function() {
        }, status: "rejected", reason: O },
        ql()
      );
    } finally {
      F.p = n, i !== null && c.types !== null && (i.types = c.types), L.T = i;
    }
  }
  function hh() {
  }
  function yf(t, l, e, a) {
    if (t.tag !== 5) throw Error(s(476));
    var u = Pr(t).queue;
    Ir(
      t,
      u,
      l,
      Ll,
      e === null ? hh : function() {
        return tm(t), e(a);
      }
    );
  }
  function Pr(t) {
    var l = t.memoizedState;
    if (l !== null) return l;
    l = {
      memoizedState: Ll,
      baseState: Ll,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: De,
        lastRenderedState: Ll
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
        lastRenderedReducer: De,
        lastRenderedState: e
      },
      next: null
    }, t.memoizedState = l, t = t.alternate, t !== null && (t.memoizedState = l), l;
  }
  function tm(t) {
    var l = Pr(t);
    l.next === null && (l = t.alternate.memoizedState), nn(
      t,
      l.next.queue,
      {},
      ql()
    );
  }
  function gf() {
    return al(Mu);
  }
  function lm() {
    return Zt().memoizedState;
  }
  function em() {
    return Zt().memoizedState;
  }
  function yh(t) {
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
  function gh(t, l, e) {
    var a = ql();
    e = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Si(t) ? um(l, e) : (e = Hc(t, l, e, a), e !== null && (Ol(e, t, a), nm(e, l, a)));
  }
  function am(t, l, e) {
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
    if (Si(t)) um(l, u);
    else {
      var n = t.alternate;
      if (t.lanes === 0 && (n === null || n.lanes === 0) && (n = l.lastRenderedReducer, n !== null))
        try {
          var i = l.lastRenderedState, c = n(i, e);
          if (u.hasEagerState = !0, u.eagerState = c, Rl(c, i))
            return Fn(t, l, u, 0), xt === null && $n(), !1;
        } catch {
        }
      if (e = Hc(t, l, u, a), e !== null)
        return Ol(e, t, a), nm(e, l, a), !0;
    }
    return !1;
  }
  function Sf(t, l, e, a) {
    if (a = {
      lane: 2,
      revertLane: fs(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Si(t)) {
      if (l) throw Error(s(479));
    } else
      l = Hc(
        t,
        e,
        a,
        2
      ), l !== null && Ol(l, t, 2);
  }
  function Si(t) {
    var l = t.alternate;
    return t === lt || l !== null && l === lt;
  }
  function um(t, l) {
    cu = ri = !0;
    var e = t.pending;
    e === null ? l.next = l : (l.next = e.next, e.next = l), t.pending = l;
  }
  function nm(t, l, e) {
    if ((e & 4194048) !== 0) {
      var a = l.lanes;
      a &= t.pendingLanes, e |= a, l.lanes = e, no(t, e);
    }
  }
  var bi = {
    readContext: al,
    use: vi,
    useCallback: Xt,
    useContext: Xt,
    useEffect: Xt,
    useImperativeHandle: Xt,
    useLayoutEffect: Xt,
    useInsertionEffect: Xt,
    useMemo: Xt,
    useReducer: Xt,
    useRef: Xt,
    useState: Xt,
    useDebugValue: Xt,
    useDeferredValue: Xt,
    useTransition: Xt,
    useSyncExternalStore: Xt,
    useId: Xt,
    useHostTransitionStatus: Xt,
    useFormState: Xt,
    useActionState: Xt,
    useOptimistic: Xt,
    useMemoCache: Xt,
    useCacheRefresh: Xt,
    useEffectEvent: Xt
  }, im = {
    readContext: al,
    use: vi,
    useCallback: function(t, l) {
      return hl().memoizedState = [
        t,
        l === void 0 ? null : l
      ], t;
    },
    useContext: al,
    useEffect: Zr,
    useImperativeHandle: function(t, l, e) {
      e = e != null ? e.concat([t]) : null, yi(
        4194308,
        4,
        Jr.bind(null, l, t),
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
      if (Da) {
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
        if (Da) {
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
      }, a.queue = t, t = t.dispatch = gh.bind(
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
      var l = t.queue, e = am.bind(null, lt, l);
      return l.dispatch = e, [t.memoizedState, e];
    },
    useDebugValue: vf,
    useDeferredValue: function(t, l) {
      var e = hl();
      return hf(e, t, l);
    },
    useTransition: function() {
      var t = rf(!1);
      return t = Ir.bind(
        null,
        lt,
        t.queue,
        !0,
        !1
      ), hl().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, l, e) {
      var a = lt, u = hl();
      if (nt) {
        if (e === void 0)
          throw Error(s(407));
        e = e();
      } else {
        if (e = l(), xt === null)
          throw Error(s(349));
        (vt & 127) !== 0 || Ar(a, l, e);
      }
      u.memoizedState = e;
      var n = { value: e, getSnapshot: l };
      return u.queue = n, Zr(Dr.bind(null, a, n, t), [
        t
      ]), a.flags |= 2048, su(
        9,
        { destroy: void 0 },
        Mr.bind(
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
      var t = hl(), l = xt.identifierPrefix;
      if (nt) {
        var e = se, a = fe;
        e = (a & ~(1 << 32 - Cl(a) - 1)).toString(32) + e, l = "_" + l + "R_" + e, e = mi++, 0 < e && (l += "H" + e.toString(32)), l += "_";
      } else
        e = oh++, l = "_" + l + "r_" + e.toString(32) + "_";
      return t.memoizedState = l;
    },
    useHostTransitionStatus: gf,
    useFormState: Yr,
    useActionState: Yr,
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
      return l.queue = e, l = Sf.bind(
        null,
        lt,
        !0,
        e
      ), e.dispatch = l, [t, l];
    },
    useMemoCache: ff,
    useCacheRefresh: function() {
      return hl().memoizedState = yh.bind(
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
  }, cm = {
    readContext: al,
    use: vi,
    useCallback: Fr,
    useContext: al,
    useEffect: df,
    useImperativeHandle: $r,
    useInsertionEffect: wr,
    useLayoutEffect: Kr,
    useMemo: Wr,
    useReducer: hi,
    useRef: Qr,
    useState: function() {
      return hi(De);
    },
    useDebugValue: vf,
    useDeferredValue: function(t, l) {
      var e = Zt();
      return kr(
        e,
        Rt.memoizedState,
        t,
        l
      );
    },
    useTransition: function() {
      var t = hi(De)[0], l = Zt().memoizedState;
      return [
        typeof t == "boolean" ? t : un(t),
        l
      ];
    },
    useSyncExternalStore: Or,
    useId: lm,
    useHostTransitionStatus: gf,
    useFormState: Lr,
    useActionState: Lr,
    useOptimistic: function(t, l) {
      var e = Zt();
      return Rr(e, Rt, t, l);
    },
    useMemoCache: ff,
    useCacheRefresh: em,
    useEffectEvent: Vr
  }, Sh = {
    readContext: al,
    use: vi,
    useCallback: Fr,
    useContext: al,
    useEffect: df,
    useImperativeHandle: $r,
    useInsertionEffect: wr,
    useLayoutEffect: Kr,
    useMemo: Wr,
    useReducer: of,
    useRef: Qr,
    useState: function() {
      return of(De);
    },
    useDebugValue: vf,
    useDeferredValue: function(t, l) {
      var e = Zt();
      return Rt === null ? hf(e, t, l) : kr(
        e,
        Rt.memoizedState,
        t,
        l
      );
    },
    useTransition: function() {
      var t = of(De)[0], l = Zt().memoizedState;
      return [
        typeof t == "boolean" ? t : un(t),
        l
      ];
    },
    useSyncExternalStore: Or,
    useId: lm,
    useHostTransitionStatus: gf,
    useFormState: Xr,
    useActionState: Xr,
    useOptimistic: function(t, l) {
      var e = Zt();
      return Rt !== null ? Rr(e, Rt, t, l) : (e.baseState = t, [t, e.queue.dispatch]);
    },
    useMemoCache: ff,
    useCacheRefresh: em,
    useEffectEvent: Vr
  };
  function bf(t, l, e, a) {
    l = t.memoizedState, e = e(a, l), e = e == null ? l : I({}, l, e), t.memoizedState = e, t.lanes === 0 && (t.updateQueue.baseState = e);
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
  function fm(t, l, e, a, u, n, i) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(a, n, i) : l.prototype && l.prototype.isPureReactComponent ? !wu(e, a) || !wu(u, n) : !0;
  }
  function sm(t, l, e, a) {
    t = l.state, typeof l.componentWillReceiveProps == "function" && l.componentWillReceiveProps(e, a), typeof l.UNSAFE_componentWillReceiveProps == "function" && l.UNSAFE_componentWillReceiveProps(e, a), l.state !== t && pf.enqueueReplaceState(l, l.state, null);
  }
  function Ca(t, l) {
    var e = l;
    if ("ref" in l) {
      e = {};
      for (var a in l)
        a !== "ref" && (e[a] = l[a]);
    }
    if (t = t.defaultProps) {
      e === l && (e = I({}, e));
      for (var u in t)
        e[u] === void 0 && (e[u] = t[u]);
    }
    return e;
  }
  function om(t) {
    Jn(t);
  }
  function rm(t) {
    console.error(t);
  }
  function mm(t) {
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
  function dm(t, l, e) {
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
  function Tf(t, l, e) {
    return e = we(e), e.tag = 3, e.payload = { element: null }, e.callback = function() {
      pi(t, l);
    }, e;
  }
  function vm(t) {
    return t = we(t), t.tag = 3, t;
  }
  function hm(t, l, e, a) {
    var u = e.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var n = a.value;
      t.payload = function() {
        return u(n);
      }, t.callback = function() {
        dm(l, e, a);
      };
    }
    var i = e.stateNode;
    i !== null && typeof i.componentDidCatch == "function" && (t.callback = function() {
      dm(l, e, a), typeof u != "function" && (ta === null ? ta = /* @__PURE__ */ new Set([this]) : ta.add(this));
      var c = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: c !== null ? c : ""
      });
    });
  }
  function bh(t, l, e, a, u) {
    if (e.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (l = e.alternate, l !== null && Ea(
        l,
        e,
        u,
        !0
      ), e = ul.current, e !== null) {
        switch (e.tag) {
          case 31:
          case 13:
          case 19:
            return rl === null ? Xi() : e.alternate === null && Qt === 0 && (Qt = 3), e.flags &= -257, e.flags |= 65536, e.lanes = u, a === ii ? e.flags |= 16384 : (l = e.updateQueue, l === null ? e.updateQueue = /* @__PURE__ */ new Set([a]) : l.add(a), ns(t, a, u)), !1;
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
    if (nt)
      return l = ul.current, l !== null ? ((l.flags & 65536) === 0 && (l.flags |= 256), l.flags |= 65536, l.lanes = u, a !== Gc && (t = Error(s(422), { cause: a }), $u(Ql(t, e)))) : (a !== Gc && (l = Error(s(423), {
        cause: a
      }), $u(
        Ql(l, e)
      )), t = t.current.alternate, t.flags |= 65536, u &= -u, t.lanes |= u, a = Ql(a, e), u = Tf(
        t.stateNode,
        a,
        u
      ), Wc(t, u), Qt !== 4 && (Qt = 2)), !1;
    var n = Error(s(520), { cause: a });
    if (n = Ql(n, e), vn === null ? vn = [n] : vn.push(n), Qt !== 4 && (Qt = 2), l === null) return !0;
    a = Ql(a, e), e = l;
    do {
      switch (e.tag) {
        case 3:
          return e.flags |= 65536, t = u & -u, e.lanes |= t, t = Tf(e.stateNode, a, t), Wc(e, t), !1;
        case 1:
          if (l = e.type, n = e.stateNode, (e.flags & 128) === 0 && (typeof l.getDerivedStateFromError == "function" || n !== null && typeof n.componentDidCatch == "function" && (ta === null || !ta.has(n))))
            return e.flags |= 65536, u &= -u, e.lanes |= u, u = vm(u), hm(
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
  var Ef = Error(s(461)), Jt = !1;
  function Wt(t, l, e, a) {
    l.child = t === null ? br(l, null, e, a) : Ma(
      l,
      t.child,
      e,
      a
    );
  }
  function ym(t, l, e, a, u) {
    e = e.render;
    var n = l.ref;
    if ("ref" in a) {
      var i = {};
      for (var c in a)
        c !== "ref" && (i[c] = a[c]);
    } else i = a;
    return _a(l), a = af(
      t,
      l,
      e,
      i,
      n,
      u
    ), c = uf(), t !== null && !Jt ? (nf(t, l, u), Ce(t, l, u)) : (nt && c && Pn(l), l.flags |= 1, Wt(t, l, a, u), l.child);
  }
  function gm(t, l, e, a, u) {
    if (t === null) {
      var n = e.type;
      return typeof n == "function" && !Bc(n) && n.defaultProps === void 0 && e.compare === null ? (l.tag = 15, l.type = n, Sm(
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
    if (n = t.child, !Cf(t, u)) {
      var i = n.memoizedProps;
      if (e = e.compare, e = e !== null ? e : wu, e(i, a) && t.ref === l.ref)
        return Ce(t, l, u);
    }
    return l.flags |= 1, t = Ne(n, a), t.ref = l.ref, t.return = l, l.child = t;
  }
  function Sm(t, l, e, a, u) {
    if (t !== null) {
      var n = t.memoizedProps;
      if (wu(n, a) && t.ref === l.ref)
        if (Jt = !1, l.pendingProps = a = n, Cf(t, u))
          (t.flags & 131072) !== 0 && (Jt = !0);
        else
          return l.lanes = t.lanes, Ce(t, l, u);
    }
    return _f(
      t,
      l,
      e,
      a,
      u
    );
  }
  function bm(t, l, e, a) {
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
        return pm(
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
        ), n !== null ? Er(l, n) : Ic(), _r(l);
      else
        return a = l.lanes = 536870912, pm(
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
  function pm(t, l, e, a, u) {
    var n = Kc();
    return n = n === null ? null : { parent: wt._currentValue, pool: n }, l.memoizedState = {
      baseLanes: e,
      cachePool: n
    }, t !== null && ui(l, null), Ic(), _r(l), t !== null && Ea(t, l, a, !0), l.childLanes = u, null;
  }
  function Ti(t, l) {
    return l = Ei(
      { mode: l.mode, children: l.children },
      t.mode
    ), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function Tm(t, l, e) {
    return Ma(l, t.child, null, e), t = Ti(l, l.pendingProps), t.flags |= 2, xl(l), l.memoizedState = null, t;
  }
  function ph(t, l, e) {
    var a = l.pendingProps, u = (l.flags & 128) !== 0;
    if (l.flags &= -129, t === null) {
      if (nt) {
        if (a.mode === "hidden")
          return t = Ti(l, a), l.lanes = 536870912, t.memoizedState = { baseLanes: 0, cachePool: null }, cn(null, t);
        if (tf(l), (t = jt) ? (t = Jd(
          t,
          wl
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: Le !== null ? { id: fe, overflow: se } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = ur(t), e.return = l, l.child = e, Pt = l, jt = null)) : t = null, t === null) throw Xe(l);
        return l.lanes = 536870912, null;
      }
      return Ti(l, a);
    }
    var n = t.memoizedState;
    if (n !== null) {
      var i = n.dehydrated;
      if (tf(l), u)
        if (l.flags & 256)
          l.flags &= -257, l = Tm(
            t,
            l,
            e
          );
        else if (l.memoizedState !== null)
          l.child = t.child, l.flags |= 128, l = null;
        else throw Error(s(558));
      else if (Jt || Ea(t, l, e, !1), u = (e & t.childLanes) !== 0, Jt || u) {
        if (Je.current === null) {
          if (a = xt, a !== null && (i = io(a, e), i !== 0 && i !== n.retryLane))
            throw n.retryLane = i, Sa(t, i), Ol(a, t, i), Ef;
          Xi();
        }
        l = Tm(
          t,
          l,
          e
        );
      } else
        t = n.treeContext, jt = Jl(i.nextSibling), Pt = l, nt = !0, Ge = null, wl = !1, t !== null && cr(l, t), l = Ti(l, a), l.flags |= 134221824;
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
  function _f(t, l, e, a, u) {
    return _a(l), e = af(
      t,
      l,
      e,
      a,
      void 0,
      u
    ), a = uf(), t !== null && !Jt ? (nf(t, l, u), Ce(t, l, u)) : (nt && a && Pn(l), l.flags |= 1, Wt(t, l, e, u), l.child);
  }
  function Em(t, l, e, a, u, n) {
    return _a(l), l.updateQueue = null, e = zr(
      l,
      a,
      e,
      u
    ), Nr(t), a = uf(), t !== null && !Jt ? (nf(t, l, n), Ce(t, l, n)) : (nt && a && Pn(l), l.flags |= 1, Wt(t, l, e, n), l.child);
  }
  function _m(t, l, e, a, u) {
    if (_a(l), l.stateNode === null) {
      var n = tu, i = e.contextType;
      typeof i == "object" && i !== null && (n = al(i)), n = new e(a, n), l.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = pf, l.stateNode = n, n._reactInternals = l, n = l.stateNode, n.props = a, n.state = l.memoizedState, n.refs = {}, $c(l), i = e.contextType, n.context = typeof i == "object" && i !== null ? al(i) : tu, n.state = l.memoizedState, i = e.getDerivedStateFromProps, typeof i == "function" && (bf(
        l,
        e,
        i,
        a
      ), n.state = l.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof n.getSnapshotBeforeUpdate == "function" || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (i = n.state, typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(), i !== n.state && pf.enqueueReplaceState(n, n.state, null), ln(l, a, n, u), tn(), n.state = l.memoizedState), typeof n.componentDidMount == "function" && (l.flags |= 4194308), a = !0;
    } else if (t === null) {
      n = l.stateNode;
      var c = l.memoizedProps, r = Ca(e, c);
      n.props = r;
      var g = n.context, E = e.contextType;
      i = tu, typeof E == "object" && E !== null && (i = al(E));
      var O = e.getDerivedStateFromProps;
      E = typeof O == "function" || typeof n.getSnapshotBeforeUpdate == "function", c = l.pendingProps !== c, E || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (c || g !== i) && sm(
        l,
        n,
        a,
        i
      ), Ve = !1;
      var h = l.memoizedState;
      n.state = h, ln(l, a, n, u), tn(), g = l.memoizedState, c || h !== g || Ve ? (typeof O == "function" && (bf(
        l,
        e,
        O,
        a
      ), g = l.memoizedState), (r = Ve || fm(
        l,
        e,
        r,
        a,
        h,
        g,
        i
      )) ? (E || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount()), typeof n.componentDidMount == "function" && (l.flags |= 4194308)) : (typeof n.componentDidMount == "function" && (l.flags |= 4194308), l.memoizedProps = a, l.memoizedState = g), n.props = a, n.state = g, n.context = i, a = r) : (typeof n.componentDidMount == "function" && (l.flags |= 4194308), a = !1);
    } else {
      n = l.stateNode, Fc(t, l), i = l.memoizedProps, E = Ca(e, i), n.props = E, O = l.pendingProps, h = n.context, g = e.contextType, r = tu, typeof g == "object" && g !== null && (r = al(g)), c = e.getDerivedStateFromProps, (g = typeof c == "function" || typeof n.getSnapshotBeforeUpdate == "function") || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (i !== O || h !== r) && sm(
        l,
        n,
        a,
        r
      ), Ve = !1, h = l.memoizedState, n.state = h, ln(l, a, n, u), tn();
      var p = l.memoizedState;
      i !== O || h !== p || Ve || t !== null && t.dependencies !== null && ei(t.dependencies) ? (typeof c == "function" && (bf(
        l,
        e,
        c,
        a
      ), p = l.memoizedState), (E = Ve || fm(
        l,
        e,
        E,
        a,
        h,
        p,
        r
      ) || t !== null && t.dependencies !== null && ei(t.dependencies)) ? (g || typeof n.UNSAFE_componentWillUpdate != "function" && typeof n.componentWillUpdate != "function" || (typeof n.componentWillUpdate == "function" && n.componentWillUpdate(a, p, r), typeof n.UNSAFE_componentWillUpdate == "function" && n.UNSAFE_componentWillUpdate(
        a,
        p,
        r
      )), typeof n.componentDidUpdate == "function" && (l.flags |= 4), typeof n.getSnapshotBeforeUpdate == "function" && (l.flags |= 1024)) : (typeof n.componentDidUpdate != "function" || i === t.memoizedProps && h === t.memoizedState || (l.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && h === t.memoizedState || (l.flags |= 1024), l.memoizedProps = a, l.memoizedState = p), n.props = a, n.state = p, n.context = r, a = E) : (typeof n.componentDidUpdate != "function" || i === t.memoizedProps && h === t.memoizedState || (l.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && h === t.memoizedState || (l.flags |= 1024), a = !1);
    }
    return n = a, ou(t, l), a = (l.flags & 128) !== 0, n || a ? (n = l.stateNode, e = a && typeof e.getDerivedStateFromError != "function" ? null : n.render(), l.flags |= 1, t !== null && a ? (l.child = Ma(
      l,
      t.child,
      null,
      u
    ), l.child = Ma(
      l,
      null,
      e,
      u
    )) : Wt(t, l, e, u), l.memoizedState = n.state, t = l.child) : t = Ce(
      t,
      l,
      u
    ), t;
  }
  function Nm(t, l, e, a) {
    return pa(), l.flags |= 256, Wt(t, l, e, a), l.child;
  }
  var Nf = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function zf(t) {
    return { baseLanes: t, cachePool: dr() };
  }
  function Of(t, l, e) {
    return t = t !== null ? t.childLanes & ~e : 0, l && (t |= Bl), t;
  }
  function zm(t, l, e) {
    var a = l.pendingProps, u = !1, n = (l.flags & 128) !== 0, i;
    if ((i = n) || (i = t !== null && t.memoizedState === null ? !1 : (nl.current & 2) !== 0), i && (u = !0, l.flags &= -129), i = (l.flags & 32) !== 0, l.flags &= -33, t === null) {
      if (nt) {
        if (u ? $e(l) : Fe(), (t = jt) ? (t = Jd(
          t,
          wl
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: Le !== null ? { id: fe, overflow: se } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = ur(t), e.return = l, l.child = e, Pt = l, jt = null)) : t = null, t === null) throw Xe(l);
        return zs(t) ? l.lanes = 32 : l.lanes = 536870912, null;
      }
      return n = a.children, a = a.fallback, u ? (Fe(), u = l.mode, n = Ei(
        { mode: "hidden", children: n },
        u
      ), a = ba(
        a,
        u,
        e,
        null
      ), n.return = l, a.return = l, n.sibling = a, l.child = n, a = l.child, a.memoizedState = zf(e), a.childLanes = Of(
        t,
        i,
        e
      ), l.memoizedState = Nf, cn(null, a)) : ($e(l), Af(l, n));
    }
    var c = t.memoizedState;
    if (c !== null) {
      var r = c.dehydrated;
      if (r !== null)
        return Th(
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
    }), a.subtreeFlags = c.subtreeFlags & 1206910976, r !== null ? u = Ne(r, u) : (u = ba(
      u,
      n,
      e,
      null
    ), u.flags |= 2), u.return = l, a.return = l, a.sibling = u, l.child = a, cn(null, a), a = l.child, u = t.child.memoizedState, u === null ? u = zf(e) : (n = u.cachePool, n !== null ? (c = wt._currentValue, n = n.parent !== c ? { parent: c, pool: c } : n) : n = dr(), u = {
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
  function Af(t, l) {
    return l = Ei(
      { mode: "visible", children: l },
      t.mode
    ), l.return = t, t.child = l;
  }
  function Ei(t, l) {
    return t = El(22, t, null, l), t.lanes = 0, t;
  }
  function _i(t, l, e) {
    return Ma(l, t.child, null, e), t = Af(
      l,
      l.pendingProps.children
    ), t.flags |= 2, l.memoizedState = null, t;
  }
  function Th(t, l, e, a, u, n, i, c) {
    if (e)
      return l.flags & 256 ? ($e(l), l.flags &= -257, _i(
        t,
        l,
        c
      )) : l.memoizedState !== null ? (Fe(), l.child = t.child, l.flags |= 128, null) : (Fe(), n = u.fallback, i = l.mode, u = Ei(
        { mode: "visible", children: u.children },
        i
      ), n = ba(
        n,
        i,
        c,
        null
      ), n.flags |= 2, u.return = l, n.return = l, u.sibling = n, l.child = u, Ma(l, t.child, null, c), u = l.child, u.memoizedState = zf(c), u.childLanes = Of(
        t,
        a,
        c
      ), l.memoizedState = Nf, cn(null, u));
    if ($e(l), zs(n)) {
      if (a = n.nextSibling && n.nextSibling.dataset, a) var r = a.dgst;
      return a = r, a !== "" && (u = Error(s(419)), u.stack = "", u.digest = a, $u({ value: u, source: null, stack: null })), _i(
        t,
        l,
        c
      );
    }
    if (Jt || Ea(t, l, c, !1), a = (c & t.childLanes) !== 0, Jt || a) {
      if (Je.current !== null)
        return _i(
          t,
          l,
          c
        );
      if (a = xt, a !== null && (u = io(
        a,
        c
      ), u !== 0 && u !== i.retryLane))
        throw i.retryLane = u, Sa(t, u), Ol(a, t, u), Ef;
      return Ns(n) || Xi(), _i(
        t,
        l,
        c
      );
    }
    return Ns(n) ? (l.flags |= 192, l.child = t.child, null) : (t = i.treeContext, jt = Jl(n.nextSibling), Pt = l, nt = !0, Ge = null, wl = !1, t !== null && cr(l, t), l = Af(
      l,
      u.children
    ), l.flags |= 134221824, l);
  }
  function Om(t, l, e) {
    t.lanes |= l;
    var a = t.alternate;
    a !== null && (a.lanes |= l), li(t.return, l, e);
  }
  function Am(t) {
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
  function Mf(t) {
    var l = t.child;
    for (t.child = null; l !== null; ) {
      var e = l.sibling;
      l.sibling = t.child, t.child = l, l = e;
    }
  }
  function Df(t, l, e) {
    var a = l.pendingProps, u = a.revealOrder, n = a.tail;
    a = a.children;
    var i = nl.current;
    if (l.flags & 128)
      return en(l, i), null;
    var c = (i & 2) !== 0;
    if (c ? (i = i & 1 | 2, l.flags |= 128) : i &= 1, en(l, i), u === "backwards" && t !== null ? (Mf(t), Wt(t, l, a, e), Mf(t)) : Wt(t, l, a, e), a = nt ? Ju : 0, !c && t !== null && (t.flags & 128) !== 0)
      t: for (t = l.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && Om(t, e, l);
        else if (t.tag === 19)
          Om(t, e, l);
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
        e = Am(l.child), e === null ? (u = l.child, l.child = null) : (u = e.sibling, e.sibling = null, Mf(l)), Ni(
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
        e = Am(l.child), e === null ? (u = l.child, l.child = null) : (u = e.sibling, e.sibling = null), Ni(
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
  function Mm(t, l, e) {
    var a = l.pendingProps;
    return Qe(l, l.type, a.value), Wt(t, l, a.children, e), l.child;
  }
  function Ce(t, l, e) {
    if (t !== null && (l.dependencies = t.dependencies), Pe |= l.lanes, (e & l.childLanes) === 0)
      if (t !== null) {
        if (Ea(
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
  function Cf(t, l) {
    return (t.lanes & l) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && ei(t)));
  }
  function Eh(t, l, e) {
    switch (l.tag) {
      case 3:
        Ga(l, l.stateNode.containerInfo), Qe(l, wt, t.memoizedState.cache), pa();
        break;
      case 27:
      case 5:
        Ru(l);
        break;
      case 4:
        Ga(l, l.stateNode.containerInfo);
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
          a = Ea(
            t,
            l,
            e,
            !1
          );
          var u = l.child.childLanes;
          return a || (e & u) !== 0 ? zm(t, l, e) : ($e(l), t = Ce(
            t,
            l,
            e
          ), t !== null ? t.sibling : null);
        }
        $e(l);
        break;
      case 19:
        if (l.flags & 128)
          return Df(
            t,
            l,
            e
          );
        if (u = (t.flags & 128) !== 0, a = (e & l.childLanes) !== 0, a || (Ea(
          t,
          l,
          e,
          !1
        ), a = (e & l.childLanes) !== 0), u) {
          if (a)
            return Df(
              t,
              l,
              e
            );
          l.flags |= 128;
        }
        if (u = l.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), en(l, nl.current), a) break;
        return null;
      case 22:
        return l.lanes = 0, bm(
          t,
          l,
          e,
          l.pendingProps
        );
      case 24:
        Qe(l, wt, t.memoizedState.cache);
    }
    return Ce(t, l, e);
  }
  function Dm(t, l, e) {
    if (t !== null)
      if (t.memoizedProps !== l.pendingProps)
        Jt = !0;
      else {
        if (!Cf(t, e) && (l.flags & 128) === 0)
          return Jt = !1, Eh(
            t,
            l,
            e
          );
        Jt = (t.flags & 131072) !== 0;
      }
    else
      Jt = !1, nt && (l.flags & 1048576) !== 0 && ir(l, Ju, l.index);
    switch (l.lanes = 0, l.tag) {
      case 16:
        t: {
          var a = l.pendingProps;
          if (t = Oa(l.elementType), l.type = t, typeof t == "function")
            Bc(t) ? (a = Ca(t, a), l.tag = 1, l = _m(
              null,
              l,
              t,
              a,
              e
            )) : (l.tag = 0, l = _f(
              null,
              l,
              t,
              a,
              e
            ));
          else {
            if (t != null) {
              var u = t.$$typeof;
              if (u === U) {
                l.tag = 11, l = ym(
                  null,
                  l,
                  t,
                  a,
                  e
                );
                break t;
              } else if (u === Tt) {
                l.tag = 14, l = gm(
                  null,
                  l,
                  t,
                  a,
                  e
                );
                break t;
              } else if (u === bt) {
                l.tag = 10, l.type = t, l = Mm(
                  null,
                  l,
                  e
                );
                break t;
              }
            }
            throw l = yt(t) || t, Error(s(306, l, ""));
          }
        }
        return l;
      case 0:
        return _f(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 1:
        return a = l.type, u = Ca(
          a,
          l.pendingProps
        ), _m(
          t,
          l,
          a,
          u,
          e
        );
      case 3:
        t: {
          if (Ga(
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
              l = Nm(
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
              ), $u(u), l = Nm(
                t,
                l,
                a,
                e
              );
              break t;
            } else
              for (t = l.stateNode.containerInfo, t.nodeType === 9 ? t = t.body : t = t.nodeName === "HTML" ? t.ownerDocument.body : t, jt = Jl(t.firstChild), Pt = l, nt = !0, Ge = null, wl = !0, e = br(
                l,
                null,
                a,
                e
              ), l.child = e; e; )
                e.flags = e.flags & -3 | 134221824, e = e.sibling;
          else {
            if (pa(), a === u) {
              l = Ce(
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
        return ou(t, l), t === null ? (e = t0(
          l.type,
          null,
          l.pendingProps,
          null
        )) ? l.memoizedState = e : nt || (l.stateNode = xd(
          l.type,
          l.pendingProps,
          ne.current,
          l
        )) : l.memoizedState = t0(
          l.type,
          t.memoizedProps,
          l.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return Ru(l), t === null && nt && (a = l.stateNode = Wd(
          l.type,
          l.pendingProps,
          ne.current
        ), Pt = l, wl = !0, u = jt, aa(l.type) ? (Os = u, jt = Jl(a.firstChild)) : jt = u), Wt(
          t,
          l,
          l.pendingProps.children,
          e
        ), ou(t, l), t === null && (l.flags |= 4194304), l.child;
      case 5:
        return t === null && nt && ((u = a = jt) && (a = yy(
          a,
          l.type,
          l.pendingProps,
          wl
        ), a !== null ? (l.stateNode = a, Pt = l, jt = Jl(a.firstChild), wl = !1, u = !0) : u = !1), u || Xe(l)), Ru(l), u = l.type, n = l.pendingProps, i = t !== null ? t.memoizedProps : null, a = n.children, gs(u, n) ? a = null : i !== null && gs(u, i) && (l.flags |= 32), l.memoizedState !== null && (u = af(
          t,
          l,
          rh,
          null,
          null,
          e
        ), Mu._currentValue = u), ou(t, l), Wt(t, l, a, e), l.child;
      case 6:
        return t === null && nt && ((t = e = jt) && (e = gy(
          e,
          l.pendingProps,
          wl
        ), e !== null ? (l.stateNode = e, Pt = l, jt = null, t = !0) : t = !1), t || Xe(l)), null;
      case 13:
        return zm(t, l, e);
      case 4:
        return Ga(
          l,
          l.stateNode.containerInfo
        ), a = l.pendingProps, t === null ? l.child = Ma(
          l,
          null,
          a,
          e
        ) : Wt(t, l, a, e), l.child;
      case 11:
        return ym(
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
        return Mm(t, l, e);
      case 9:
        return u = l.type._context, a = l.pendingProps.children, _a(l), u = al(u), a = a(u), l.flags |= 1, Wt(t, l, a, e), l.child;
      case 14:
        return gm(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 15:
        return Sm(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 19:
        return Df(t, l, e);
      case 31:
        return ph(t, l, e);
      case 22:
        return bm(
          t,
          l,
          e,
          l.pendingProps
        );
      case 24:
        return _a(l), a = al(wt), t === null ? (u = Kc(), u === null && (u = xt, n = Vc(), u.pooledCache = n, n.refCount++, n !== null && (u.pooledCacheLanes |= e), u = n), l.memoizedState = { parent: a, cache: u }, $c(l), Qe(l, wt, u)) : ((t.lanes & e) !== 0 && (Fc(t, l), ln(l, null, null, e), tn()), u = t.memoizedState, n = l.memoizedState, u.parent !== a ? (u = { parent: a, cache: a }, l.memoizedState = u, l.lanes === 0 && (l.memoizedState = l.updateQueue.baseState = u), Qe(l, wt, a)) : (a = n.cache, Qe(l, wt, a), a !== u.cache && Zc(
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
        }), a = l.pendingProps, a.name != null && a.name !== "auto" ? l.flags |= t === null ? 18882560 : 18874368 : nt && Pn(l), t !== null && t.memoizedProps.name !== a.name ? l.flags |= 4194816 : ou(t, l), Wt(t, l, a.children, e), l.child;
      case 29:
        throw l.pendingProps;
    }
    throw Error(s(156, l.tag));
  }
  function Ue(t) {
    t.flags |= 4;
  }
  function Uf(t, l, e, a, u) {
    var n;
    if ((n = (t.mode & 32) !== 0) && (n = e === null ? u0(l, a) : u0(l, a) && (a.src !== e.src || a.srcSet !== e.srcSet)), n) {
      if (t.flags |= 16777216, (u & 335544128) === u)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (od()) t.flags |= 8192;
        else
          throw Aa = ii, Jc;
    } else t.flags &= -16777217;
  }
  function Cm(t, l) {
    if (l.type !== "stylesheet" || (l.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !n0(l))
      if (od()) t.flags |= 8192;
      else
        throw Aa = ii, Jc;
  }
  function zi(t, l) {
    l !== null && (t.flags |= 4), t.flags & 16384 && (l = t.tag !== 22 ? ao() : 536870912, t.lanes |= l, hu |= l);
  }
  function fn(t, l) {
    if (!nt)
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
  function Ht(t) {
    var l = t.alternate !== null && t.alternate.child === t.child, e = 0, a = 0;
    if (l)
      for (var u = t.child; u !== null; )
        e |= u.lanes | u.childLanes, a |= u.subtreeFlags & 1206910976, a |= u.flags & 1206910976, u.return = t, u = u.sibling;
    else
      for (u = t.child; u !== null; )
        e |= u.lanes | u.childLanes, a |= u.subtreeFlags, a |= u.flags, u.return = t, u = u.sibling;
    return t.subtreeFlags |= a, t.childLanes = e, l;
  }
  function _h(t, l, e) {
    var a = l.pendingProps;
    switch (Lc(l), l.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Ht(l), null;
      case 1:
        return Ht(l), null;
      case 3:
        return e = l.stateNode, a = null, t !== null && (a = t.memoizedState.cache), l.memoizedState.cache !== a && (l.flags |= 2048), Ae(wt), ie(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (t === null || t.child === null) && (au(l) ? Ue(l) : t === null || t.memoizedState.isDehydrated && (l.flags & 256) === 0 || (l.flags |= 1024, Xc())), Ht(l), null;
      case 26:
        var u = l.type, n = l.memoizedState;
        return t === null ? (Ue(l), n !== null ? (Ht(l), Cm(l, n)) : (Ht(l), Uf(
          l,
          u,
          null,
          a,
          e
        ))) : n ? n !== t.memoizedState ? (Ue(l), Ht(l), Cm(l, n)) : (Ht(l), l.flags &= -16777217) : (t = t.memoizedProps, t !== a && Ue(l), Ht(l), Uf(
          l,
          u,
          t,
          a,
          e
        )), null;
      case 27:
        if (Xa(l), e = ne.current, u = l.type, t !== null && l.stateNode != null)
          t.memoizedProps !== a && Ue(l);
        else {
          if (!a) {
            if (l.stateNode === null)
              throw Error(s(166));
            return Ht(l), l.subtreeFlags &= -33554433, null;
          }
          t = Mt.current, au(l) ? fr(l) : (t = Wd(u, a, e), l.stateNode = t, Ue(l));
        }
        return Ht(l), l.subtreeFlags &= -33554433, null;
      case 5:
        if (Xa(l), u = l.type, t !== null && l.stateNode != null)
          t.memoizedProps !== a && Ue(l);
        else {
          if (!a) {
            if (l.stateNode === null)
              throw Error(s(166));
            return Ht(l), l.subtreeFlags &= -33554433, null;
          }
          if (n = Mt.current, au(l))
            fr(l);
          else {
            var i = bn(
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
            n[el] = l, n[Tl] = a;
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
            t: switch (cl(n, u, a), u) {
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
            a && Ue(l);
          }
        }
        return Ht(l), l.subtreeFlags &= -33554433, Uf(
          l,
          l.type,
          t === null ? null : t.memoizedProps,
          l.pendingProps,
          e
        ), null;
      case 6:
        if (t && l.stateNode != null)
          t.memoizedProps !== a && Ue(l);
        else {
          if (typeof a != "string" && l.stateNode === null)
            throw Error(s(166));
          if (t = ne.current, au(l)) {
            if (t = l.stateNode, e = l.memoizedProps, a = null, u = Pt, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  a = u.memoizedProps;
              }
            t[el] = l, t = !!(t.nodeValue === e || a !== null && a.suppressHydrationWarning === !0 || Dd(t.nodeValue, e)), t || Xe(l, !0);
          } else
            t = bn(t).createTextNode(
              a
            ), t[el] = l, l.stateNode = t;
        }
        return Ht(l), null;
      case 31:
        if (e = l.memoizedState, t === null || t.memoizedState !== null) {
          if (a = au(l), e !== null) {
            if (t === null) {
              if (!a) throw Error(s(318));
              if (t = l.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(557));
              t[el] = l;
            } else
              pa(), (l.flags & 128) === 0 && (l.memoizedState = null), l.flags |= 4;
            Ht(l), t = !1;
          } else
            e = Xc(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = e), t = !0;
          if (!t)
            return l.flags & 256 ? (xl(l), l) : (xl(l), null);
          if ((l.flags & 128) !== 0)
            throw Error(s(558));
        }
        return Ht(l), null;
      case 13:
        if (a = l.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (u = au(l), a !== null && a.dehydrated !== null) {
            if (t === null) {
              if (!u) throw Error(s(318));
              if (u = l.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(s(317));
              u[el] = l;
            } else
              pa(), (l.flags & 128) === 0 && (l.memoizedState = null), l.flags |= 4;
            Ht(l), u = !1;
          } else
            u = Xc(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return l.flags & 256 ? (xl(l), l) : (xl(l), null);
        }
        return xl(l), (l.flags & 128) !== 0 ? (l.lanes = e, l) : (e = a !== null, t = t !== null && t.memoizedState !== null, e && (a = l.child, u = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (u = a.alternate.memoizedState.cachePool.pool), n = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (n = a.memoizedState.cachePool.pool), n !== u && (a.flags |= 2048)), e !== t && e && (l.child.flags |= 8192), zi(l, l.updateQueue), Ht(l), null);
      case 4:
        return ie(), t === null && ms(l.stateNode.containerInfo), l.flags |= 67108864, Ht(l), null;
      case 10:
        return Ae(l.type), Ht(l), null;
      case 19:
        if (lf(l), a = l.memoizedState, a === null) return Ht(l), null;
        if (u = (l.flags & 128) !== 0, n = a.rendering, n === null)
          if (u) fn(a, !1);
          else {
            if (Qt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = l.child; t !== null; ) {
                if (n = oi(t), n !== null) {
                  for (l.flags |= 128, fn(a, !1), t = n.updateQueue, l.updateQueue = t, zi(l, t), l.subtreeFlags = 0, t = e, e = l.child; e !== null; )
                    ar(e, t), e = e.sibling;
                  return en(
                    l,
                    nl.current & 1 | 2
                  ), nt && ze(l, a.treeForkCount), l.child;
                }
                t = t.sibling;
              }
            a.tail !== null && Ml() > qi && (l.flags |= 128, u = !0, fn(a, !1), l.lanes = 4194304);
          }
        else {
          if (!u)
            if (t = oi(n), t !== null) {
              if (l.flags |= 128, u = !0, t = t.updateQueue, l.updateQueue = t, zi(l, t), fn(a, !0), a.tail === null && a.tailMode !== "collapsed" && a.tailMode !== "visible" && !n.alternate && !nt)
                return Ht(l), null;
            } else
              2 * Ml() - a.renderingStartTime > qi && e !== 536870912 && (l.flags |= 128, u = !0, fn(a, !1), l.lanes = 4194304);
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
          return a.rendering = t, a.tail = t.sibling, a.renderingStartTime = Ml(), t.sibling = null, n = nl.current, n = u ? n & 1 | 2 : n & 1, a.tailMode === "visible" || a.tailMode === "collapsed" || !e || nt ? en(l, n) : (e = n, Et(ul, l), Et(nl, e), rl === null && (rl = l)), nt && ze(l, a.treeForkCount), t;
        }
        return Ht(l), null;
      case 22:
      case 23:
        return xl(l), Pc(), a = l.memoizedState !== null, t !== null ? t.memoizedState !== null !== a && (l.flags |= 8192) : a && (l.flags |= 8192), a ? (e & 536870912) !== 0 && (l.flags & 128) === 0 && (Ht(l), l.subtreeFlags & 6 && (l.flags |= 8192)) : Ht(l), e = l.updateQueue, e !== null && zi(l, e.retryQueue), e = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), a = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (a = l.memoizedState.cachePool.pool), a !== e && (l.flags |= 2048), t !== null && Ft(za), null;
      case 24:
        return e = null, t !== null && (e = t.memoizedState.cache), l.memoizedState.cache !== e && (l.flags |= 2048), Ae(wt), Ht(l), null;
      case 25:
        return null;
      case 30:
        return l.flags |= 33554432, Ht(l), null;
    }
    throw Error(s(156, l.tag));
  }
  function Nh(t, l) {
    switch (Lc(l), l.tag) {
      case 1:
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 3:
        return Ae(wt), ie(), t = l.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (l.flags = t & -65537 | 128, l) : null;
      case 26:
      case 27:
      case 5:
        return Xa(l), null;
      case 31:
        if (l.memoizedState !== null) {
          if (xl(l), l.alternate === null)
            throw Error(s(340));
          pa();
        }
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 13:
        if (xl(l), t = l.memoizedState, t !== null && t.dehydrated !== null) {
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
        return Ae(l.type), null;
      case 22:
      case 23:
        return xl(l), Pc(), t !== null && Ft(za), t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 24:
        return Ae(wt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Um(t, l) {
    switch (Lc(l), l.tag) {
      case 3:
        Ae(wt), ie();
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
        l.memoizedState !== null && xl(l);
        break;
      case 13:
        xl(l);
        break;
      case 19:
        lf(l);
        break;
      case 10:
        Ae(l.type);
        break;
      case 22:
      case 23:
        xl(l), Pc(), t !== null && Ft(za);
        break;
      case 24:
        Ae(wt);
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
      Ct(l, l.return, c);
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
              var r = e, g = c;
              try {
                g();
              } catch (E) {
                Ct(
                  u,
                  r,
                  E
                );
              }
            }
          }
          a = a.next;
        } while (a !== n);
      }
    } catch (E) {
      Ct(l, l.return, E);
    }
  }
  function Rm(t) {
    var l = t.updateQueue;
    if (l !== null) {
      var e = t.stateNode;
      try {
        Tr(l, e);
      } catch (a) {
        Ct(t, t.return, a);
      }
    }
  }
  function xm(t, l, e) {
    e.props = Ca(
      t.type,
      t.memoizedProps
    ), e.state = t.memoizedState;
    try {
      e.componentWillUnmount();
    } catch (a) {
      Ct(t, l, a);
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
            var u = t.stateNode, n = Ee(t.memoizedProps, u);
            (u.ref === null || u.ref.name !== n) && (u.ref = Gd(n)), a = u.ref;
            break;
          case 7:
            if (t.stateNode === null) {
              var i = new Yl(t);
              T(
                t.child,
                !1,
                vy,
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
      Ct(t, l, c);
    }
  }
  function il(t, l) {
    var e = t.ref, a = t.refCleanup;
    if (e !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (u) {
          Ct(t, l, u);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof e == "function")
        try {
          e(null);
        } catch (u) {
          Ct(t, l, u);
        }
      else e.current = null;
  }
  function Oi(t, l) {
    if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && t.alternate === null && l !== null)
      for (var e = 0; e < l.length; e++)
        Kd(
          t.stateNode,
          l[e]
        );
  }
  function jm(t) {
    for (var l = t.return; l !== null && (xf(l) && Kd(t.stateNode, l.stateNode), !Rf(l)); )
      l = l.return;
  }
  function on(t) {
    for (var l = t.return; l !== null && (xf(l) && hy(t.stateNode, l.stateNode), !Rf(l)); )
      l = l.return;
  }
  function Rf(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 27;
  }
  function xf(t) {
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
      Ct(t, t.return, u);
    }
  }
  function Hf(t, l, e) {
    try {
      var a = t.stateNode;
      Wh(a, t.type, e, l), a[Tl] = l;
    } catch (u) {
      Ct(t, t.return, u);
    }
  }
  function Hm(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && aa(t.type) || t.tag === 4;
  }
  function Bf(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Hm(t.return)) return null;
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
      u = t.stateNode, l ? (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).insertBefore(u, l) : (l = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, l.appendChild(u), e = e._reactRootContainer, e != null || l.onclick !== null || (l.onclick = ce)), Oi(t, a), _t = !0;
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
  function Ai(t, l, e, a) {
    var u = t.tag;
    if (u === 5 || u === 6)
      u = t.stateNode, l ? e.insertBefore(u, l) : e.appendChild(u), Oi(t, a), _t = !0;
    else if (u !== 4 && (u === 27 && (Oi(t, a), a = null, aa(t.type) && (e = t.stateNode)), t = t.child, t !== null))
      for (Ai(
        t,
        l,
        e,
        a
      ), t = t.sibling; t !== null; )
        Ai(
          t,
          l,
          e,
          a
        ), t = t.sibling;
  }
  function Bm(t) {
    var l = t.stateNode, e = t.memoizedProps;
    try {
      for (var a = t.type, u = l.attributes; u.length; )
        l.removeAttributeNode(u[0]);
      cl(l, a, e), l[el] = t, l[Tl] = e;
    } catch (n) {
      Ct(t, t.return, n);
    }
  }
  var Mi = !1, jl = null;
  function qm(t) {
    (t.tag === 30 || (t.subtreeFlags & 33554432) !== 0) && (Mi = !0);
  }
  var re = null;
  function Ym() {
    var t = re;
    return re = null, t;
  }
  var _l = 0;
  function ru(t, l, e, a, u) {
    return _l = 0, Lm(
      t.child,
      l,
      e,
      a,
      u
    );
  }
  function Lm(t, l, e, a, u) {
    for (var n = !1; t !== null; ) {
      if (t.tag === 5) {
        var i = t.stateNode;
        if (a !== null) {
          var c = ps(i);
          a.push(c), c.view && (n = !0);
        } else
          n || ps(i).view && (n = !0);
        Mi = !0, Yd(
          i,
          _l === 0 ? l : l + "_" + _l,
          e
        ), _l++;
      } else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && u || Lm(
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
  function me(t, l) {
    for (; t !== null; )
      t.tag === 5 ? Ld(t.stateNode, t.memoizedProps) : (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && l || me(
        t.child,
        l
      )), t = t.sibling;
  }
  function Di(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if ((t.tag !== 22 || t.memoizedState === null) && (Di(t), t.tag === 30 && (t.flags & 18874368) !== 0 && t.stateNode.paired)) {
          var l = t.memoizedProps;
          if (l.name == null || l.name === "auto")
            throw Error(s(544));
          var e = l.name;
          l = _e(l.default, l.share), l !== "none" && (ru(
            t,
            e,
            l,
            null,
            !1
          ) || me(t.child, !1));
        }
        t = t.sibling;
      }
  }
  function Yf(t, l) {
    if (t.tag === 30) {
      var e = t.stateNode, a = t.memoizedProps, u = Ee(a, e), n = _e(
        a.default,
        e.paired ? a.share : a.enter
      );
      n !== "none" ? ru(t, u, n, null, !1) ? (Di(t), e.paired || l || bu(t, a.onEnter)) : me(t.child, !1) : Di(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        Yf(t, l), t = t.sibling;
    else Di(t);
  }
  function Lf(t) {
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
                  var n = _e(
                    e.default,
                    e.share
                  );
                  if (n !== "none" && (ru(
                    t,
                    a,
                    n,
                    null,
                    !1
                  ) ? (n = t.stateNode, u.paired = n, n.paired = u, bu(t, e.onShare)) : me(t.child, !1)), l.delete(a), l.size === 0) break;
                }
              }
            }
            Lf(t);
          }
          t = t.sibling;
        }
    }
  }
  function Gf(t) {
    if (t.tag === 30) {
      var l = t.memoizedProps, e = Ee(l, t.stateNode), a = jl !== null ? jl.get(e) : void 0, u = _e(
        l.default,
        a !== void 0 ? l.share : l.exit
      );
      u !== "none" && (ru(t, e, u, null, !1) ? a !== void 0 ? (u = t.stateNode, a.paired = u, u.paired = a, jl.delete(e), bu(t, l.onShare)) : bu(t, l.onExit) : me(t.child, !1)), jl !== null && Lf(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        Gf(t), t = t.sibling;
    else
      jl !== null && Lf(t);
  }
  function Gm(t) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var l = t.memoizedProps, e = Ee(l, t.stateNode);
        l = _e(l.default, l.update), t.flags &= -5, l !== "none" && ru(
          t,
          e,
          l,
          t.memoizedState = [],
          !1
        );
      } else
        (t.subtreeFlags & 33554432) !== 0 && Gm(t);
      t = t.sibling;
    }
  }
  function Xf(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if (t.tag !== 22 || t.memoizedState === null) {
          if (t.tag === 30 && (t.flags & 18874368) !== 0) {
            var l = t.stateNode;
            l.paired !== null && (l.paired = null, me(t.child, !1));
          }
          Xf(t);
        }
        t = t.sibling;
      }
  }
  function Ci(t) {
    if (t.tag === 30)
      t.stateNode.paired = null, me(t.child, !1), Xf(t);
    else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        Ci(t), t = t.sibling;
    else Xf(t);
  }
  function Xm(t) {
    for (t = t.child; t !== null; )
      t.tag === 30 ? me(t.child, !1) : (t.subtreeFlags & 33554432) !== 0 && Xm(t), t = t.sibling;
  }
  function Qf(t, l, e, a, u, n, i) {
    for (var c = !1; l !== null; ) {
      if (l.tag === 5) {
        var r = l.stateNode;
        if (n !== null && _l < n.length) {
          var g = n[_l], E = ps(r);
          (g.view || E.view) && (c = !0);
          var O;
          if (O = (t.flags & 4) === 0)
            if (E.clip) O = !0;
            else {
              O = g.rect;
              var h = E.rect;
              O = O.y !== h.y || O.x !== h.x || O.height !== h.height || O.width !== h.width;
            }
          O && (t.flags |= 4), E.abs ? E = !g.abs : (g = g.rect, E = E.rect, E = g.height !== E.height || g.width !== E.width), E && (t.flags |= 32);
        } else t.flags |= 32;
        (t.flags & 4) !== 0 && Yd(
          r,
          _l === 0 ? e : e + "_" + _l,
          u
        ), c && (t.flags & 4) !== 0 || (re === null && (re = []), re.push(
          r,
          _l === 0 ? a : a + "_" + _l,
          l.memoizedProps
        )), _l++;
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
  function Qm(t, l) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var e = t.memoizedProps, a = t.stateNode, u = Ee(e, a), n = _e(e.default, e.update), i;
        i = t.memoizedState, t.memoizedState = null, a = t;
        var c = t.child;
        _l = 0, u = Qf(
          a,
          c,
          u,
          u,
          n,
          i,
          !1
        ), (t.flags & 4) !== 0 && u && bu(t, e.onUpdate);
      } else
        (t.subtreeFlags & 33554432) !== 0 && Qm(t);
      t = t.sibling;
    }
  }
  var tl = !1, At = !1, de = !1, Zf = !1, Zm = typeof WeakSet == "function" ? WeakSet : Set, ll = null, ve = !1, rn = !1, Ui = !1, Vf = !1;
  function zh(t, l, e) {
    if (t = t.containerInfo, hs = Du, t = Jo(t), Dc(t)) {
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
            var c = 0, r = -1, g = -1, E = 0, O = 0, h = t, p = null;
            l: for (; ; ) {
              for (var x; h !== a || n !== 0 && h.nodeType !== 3 || (r = c + n), h !== i || u !== 0 && h.nodeType !== 3 || (g = c + u), h.nodeType === 3 && (c += h.nodeValue.length), (x = h.firstChild) !== null; )
                p = h, h = x;
              for (; ; ) {
                if (h === t) break l;
                if (p === a && ++E === n && (r = c), p === i && ++O === u && (g = c), (x = h.nextSibling) !== null) break;
                h = p, p = h.parentNode;
              }
              h = x;
            }
            a = r === -1 || g === -1 ? null : { start: r, end: g };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (ys = { focusedElem: t, selectionRange: a }, Du = !1, e = (e & 335544064) === e, ll = l, l = e ? 9270 : 1024; ll !== null; ) {
      if (t = ll, e && (a = t.deletions, a !== null))
        for (n = 0; n < a.length; n++)
          e && Gf(a[n]);
      if (t.alternate === null && (t.flags & 2) !== 0)
        e && qm(t), Ri(e);
      else {
        if (t.tag === 22) {
          if (a = t.alternate, t.memoizedState !== null) {
            a !== null && a.memoizedState === null && e && Gf(a), Ri(e);
            continue;
          } else if (a !== null && a.memoizedState !== null) {
            e && qm(t), Ri(e);
            continue;
          }
        }
        a = t.child, (t.subtreeFlags & l) !== 0 && a !== null ? (a.return = t, ll = a) : (e && Gm(t), Ri(e));
      }
    }
    jl = null;
  }
  function Ri(t) {
    for (; ll !== null; ) {
      var l = ll, e = t, a = l.alternate, u = l.flags;
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
              var i = Ca(
                l.type,
                u
              );
              e = n.getSnapshotBeforeUpdate(
                i,
                a
              ), n.__reactInternalSnapshotBeforeUpdate = e;
            } catch (c) {
              Ct(l, l.return, c);
            }
          }
          break;
        case 3:
          if ((u & 1024) !== 0) {
            if (a = l.stateNode.containerInfo, e = a.nodeType, e === 9)
              _s(a);
            else if (e === 1)
              switch (a.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  _s(a);
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
          e && a !== null && (e = Ee(
            a.memoizedProps,
            a.stateNode
          ), u = l.memoizedProps, u = _e(u.default, u.update), u !== "none" && ru(
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
        a.return = l.return, ll = a;
        break;
      }
      ll = l.return;
    }
  }
  function Vm(t, l, e) {
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
              Ct(e, e.return, i);
            }
          else {
            var u = Ca(
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
              Ct(
                e,
                e.return,
                i
              );
            }
          }
        a & 64 && Rm(e), a & 512 && oe(e, e.return);
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
            Ct(e, e.return, i);
          }
        }
        break;
      case 27:
        l === null && a & 4 && Bm(e);
      case 26:
      case 5:
        he(t, e), l === null && a & 4 && jf(e), a & 512 && oe(e, e.return);
        break;
      case 12:
        he(t, e);
        break;
      case 31:
        he(t, e), a & 4 && $m(t, e);
        break;
      case 13:
        he(t, e), a & 4 && Fm(t, e), a & 64 && (t = e.memoizedState, t !== null && (t = t.dehydrated, t !== null && (e = qh.bind(
          null,
          e
        ), Sy(t, e))));
        break;
      case 22:
        if (a = e.memoizedState !== null || tl, !a) {
          var n = l !== null && l.memoizedState !== null || At;
          l = tl, u = At, tl = a, (At = n) && !u ? (a = 2, (e.subtreeFlags & 8772) !== 0 && (a |= 1), le(
            t,
            e,
            a
          )) : he(t, e), tl = l, At = u;
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
      wm(t, l), t = t.sibling;
  }
  function wm(t, l) {
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
          Ct(t, t.return, r);
        }
        Kf(t, l);
        break;
      case 6:
        try {
          t.stateNode.nodeValue = l ? "" : t.memoizedProps, _t = !0;
        } catch (r) {
          Ct(t, t.return, r);
        }
        break;
      case 18:
        try {
          var c = t.stateNode;
          l ? qd(c, !0) : qd(t.stateNode, !1);
        } catch (r) {
          Ct(t, t.return, r);
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
              wm(e, a);
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
  function Km(t) {
    var l = t.alternate;
    l !== null && (t.alternate = null, Km(l)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (l = t.stateNode, l !== null && qn(l)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var qt = null, Nl = !1;
  function Pl(t, l, e) {
    for (e = e.child; e !== null; )
      Jm(t, l, e), e = e.sibling;
  }
  function Jm(t, l, e) {
    if (Dl && typeof Dl.onCommitFiberUnmount == "function")
      try {
        Dl.onCommitFiberUnmount(xu, e);
      } catch {
      }
    switch (e.tag) {
      case 26:
        At || il(e, l), Pl(
          t,
          l,
          e
        ), e.memoizedState ? e.memoizedState.count-- : e.stateNode && !At && (e = e.stateNode, e.parentNode.removeChild(e));
        break;
      case 27:
        At || il(e, l), on(e);
        var a = qt, u = Nl;
        aa(e.type) && (qt = e.stateNode, Nl = !1), Pl(
          t,
          l,
          e
        ), kd(
          e.stateNode,
          e.type,
          e.memoizedProps
        ), qt = a, Nl = u;
        break;
      case 5:
        At || il(e, l), on(e);
      case 6:
        if (e.tag === 6 && on(e), a = qt, u = Nl, qt = null, Pl(
          t,
          l,
          e
        ), qt = a, Nl = u, qt !== null)
          if (Nl)
            try {
              (qt.nodeType === 9 ? qt.body : qt.nodeName === "HTML" ? qt.ownerDocument.body : qt).removeChild(e.stateNode), _t = !0;
            } catch (n) {
              Ct(
                e,
                l,
                n
              );
            }
          else
            try {
              qt.removeChild(e.stateNode), _t = !0;
            } catch (n) {
              Ct(
                e,
                l,
                n
              );
            }
        break;
      case 18:
        qt !== null && (Nl ? (t = qt, Bd(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          e.stateNode
        ), Cu(t)) : Bd(qt, e.stateNode));
        break;
      case 4:
        a = qt, u = Nl, qt = e.stateNode.containerInfo, Nl = !0, Pl(
          t,
          l,
          e
        ), qt = a, Nl = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        We(2, e, l), At || We(4, e, l), Pl(
          t,
          l,
          e
        );
        break;
      case 1:
        At || (il(e, l), a = e.stateNode, typeof a.componentWillUnmount == "function" && xm(
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
        At = (a = At) || e.memoizedState !== null, Pl(
          t,
          l,
          e
        ), At = a;
        break;
      case 30:
        il(e, l), Pl(
          t,
          l,
          e
        );
        break;
      case 7:
        At || il(e, l), Pl(
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
  function $m(t, l) {
    if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        Cu(t);
      } catch (e) {
        Ct(l, l.return, e);
      }
    }
  }
  function Fm(t, l) {
    if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        Cu(t);
      } catch (e) {
        Ct(l, l.return, e);
      }
  }
  function Oh(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var l = t.stateNode;
        return l === null && (l = t.stateNode = new Zm()), l;
      case 22:
        return t = t.stateNode, l = t._retryCache, l === null && (l = t._retryCache = new Zm()), l;
      default:
        throw Error(s(435, t.tag));
    }
  }
  function xi(t, l) {
    var e = Oh(t);
    l.forEach(function(a) {
      if (!e.has(a)) {
        e.add(a);
        var u = Yh.bind(null, t, a);
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
                qt = r.stateNode, Nl = !1;
                break t;
              }
              break;
            case 5:
              qt = r.stateNode, Nl = !1;
              break t;
            case 3:
            case 4:
              qt = r.stateNode.containerInfo, Nl = !0;
              break t;
          }
          r = r.return;
        }
        if (qt === null) throw Error(s(160));
        Jm(i, c, n), qt = null, Nl = !1, i = n.alternate, i !== null && (i.return = null), n.return = null;
      }
    if (l.subtreeFlags & 13886)
      for (l = l.child; l !== null; )
        Wm(l, t, e), l = l.sibling;
  }
  var te = null;
  function Wm(t, l, e) {
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
        yl(l, t, e), gl(t), u & 512 && (At || a === null || il(a, a.return)), u & 64 && tl && (t = t.updateQueue, t !== null && (l = t.callbacks, l !== null && (e = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = e === null ? l : e.concat(l))));
        break;
      case 26:
        if (n = te, yl(l, t, e), gl(t), u & 512 && (At || a === null || il(a, a.return)), u & 4)
          if (u = a !== null ? a.memoizedState : null, e = t.memoizedState, a === null)
            if (e === null)
              if (t.stateNode === null)
                if (tl)
                  t.stateNode = xd(
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
                        a = u.getElementsByTagName("title")[0], (!a || a[Bu] || a[el] || a.namespaceURI === "http://www.w3.org/2000/svg" || a.hasAttribute("itemprop")) && (a = u.createElement(l), u.head.insertBefore(
                          a,
                          u.querySelector("head > title")
                        )), cl(a, l, e), a[el] = t, It(a), l = a;
                        break t;
                      case "link":
                        if (n = a0(
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
                        a = u.createElement(l), cl(a, l, e), u.head.appendChild(a);
                        break;
                      case "meta":
                        if (n = a0(
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
                        a = u.createElement(l), cl(a, l, e), u.head.appendChild(a);
                        break;
                      default:
                        throw Error(s(468, l));
                    }
                    a[el] = t, It(a), l = a;
                  }
                  t.stateNode = l;
                }
              else
                tl || Cs(n, t.type, t.stateNode);
            else
              t.stateNode = e0(
                n,
                e,
                t.memoizedProps
              );
          else
            u !== e ? (u === null ? (l = a.stateNode, l === null || At || l.parentNode.removeChild(l)) : u.count--, e === null ? tl || Cs(n, t.type, t.stateNode) : e0(n, e, t.memoizedProps)) : e === null && t.stateNode !== null && Hf(
              t,
              t.memoizedProps,
              a.memoizedProps
            );
        break;
      case 27:
        yl(l, t, e), gl(t), u & 512 && (At || a === null || il(a, a.return)), a !== null && u & 4 && Hf(
          t,
          t.memoizedProps,
          a.memoizedProps
        );
        break;
      case 5:
        if (n = de, de = !1, yl(l, t, e), de = n, gl(t), u & 512 && (At || a === null || il(a, a.return)), t.flags & 32) {
          l = t.stateNode;
          try {
            Ja(l, ""), _t = !0;
          } catch (E) {
            Ct(t, t.return, E);
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
            e.nodeValue = l, _t = !0;
          } catch (E) {
            Ct(t, t.return, E);
          }
        }
        break;
      case 3:
        if (_t = !1, $i = null, n = te, te = pn(l.containerInfo), yl(l, t, e), te = n, gl(t), u & 4 && a !== null && a.memoizedState.isDehydrated)
          try {
            Cu(l.containerInfo);
          } catch (E) {
            Ct(t, t.return, E);
          }
        Zf && (Zf = !1, km(t)), _t = !1;
        break;
      case 4:
        u = de, de = tl, a = go(), n = te, te = pn(
          t.stateNode.containerInfo
        ), yl(l, t, e), gl(t), te = n, _t && rn && (Ui = !0), _t = a, de = u;
        break;
      case 12:
        yl(l, t, e), gl(t);
        break;
      case 31:
        yl(l, t, e), gl(t), u & 4 && (l = t.updateQueue, l !== null && (t.updateQueue = null, xi(t, l)));
        break;
      case 13:
        yl(l, t, e), gl(t), t.child.flags & 8192 && t.memoizedState !== null != (a !== null && a.memoizedState !== null) && (Bi = Ml()), u & 4 && (l = t.updateQueue, l !== null && (t.updateQueue = null, xi(t, l)));
        break;
      case 22:
        n = t.memoizedState !== null, i = a !== null && a.memoizedState !== null;
        var c = tl, r = At, g = de;
        tl = c || n, de = g || n, At = r || i, yl(l, t, e), At = r, de = g, tl = c, gl(t), u & 8192 && (l = t.stateNode, l._visibility = n ? l._visibility & -2 : l._visibility | 1, !n || a === null || i || tl || At || (l = i || At, e = tl, a = At, tl = n || tl, At = l, ke(t, 2), tl = e, At = a), !n && de || wf(t, n)), u & 4 && (l = t.updateQueue, l !== null && (e = l.retryQueue, e !== null && (l.retryQueue = null, xi(t, e))));
        break;
      case 19:
        yl(l, t, e), gl(t), u & 4 && (l = t.updateQueue, l !== null && (t.updateQueue = null, xi(t, l)));
        break;
      case 30:
        u & 512 && (At || a === null || il(a, a.return)), u = go(), n = rn, i = (e & 335544064) === e, c = t.memoizedProps, rn = i && _e(
          c.default,
          c.update
        ) !== "none", yl(l, t, e), gl(t), i && a !== null && _t && (t.flags |= 4), rn = n, _t = u;
        break;
      case 21:
        break;
      case 7:
        u & 512 && (At || a === null || il(a, a.return)), a && a.stateNode !== null && (a.stateNode._fragmentFiber = t);
      default:
        yl(l, t, e), gl(t);
    }
  }
  function gl(t) {
    var l = t.flags;
    if (l & 2) {
      try {
        for (var e, a = t.return; a !== null; ) {
          if (Hm(a)) {
            e = a;
            break;
          }
          a = a.return;
        }
        a = null;
        for (var u = t.return; u !== null; ) {
          if (xf(u)) {
            var n = u.stateNode;
            a === null ? a = [n] : a.push(n);
          }
          if (Rf(u)) break;
          u = u.return;
        }
        var i = a;
        if (e == null) throw Error(s(160));
        switch (e.tag) {
          case 27:
            var c = e.stateNode, r = Bf(t);
            Ai(
              t,
              r,
              c,
              i
            );
            break;
          case 5:
            var g = e.stateNode;
            e.flags & 32 && (Ja(g, ""), e.flags &= -33);
            var E = Bf(t);
            Ai(
              t,
              E,
              g,
              i
            );
            break;
          case 3:
          case 4:
            var O = e.stateNode.containerInfo, h = Bf(t);
            qf(
              t,
              h,
              O,
              i
            );
            break;
          default:
            throw Error(s(161));
        }
      } catch (p) {
        Ct(t, t.return, p);
      }
      t.flags &= -3;
    }
    l & 4096 && (t.flags &= -4097);
  }
  function km(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var l = t;
        km(l), l.tag === 5 && l.flags & 1024 && (l = l.stateNode, Du = !0, l.reset(), Du = !1), t = t.sibling;
      }
  }
  function mu(t, l) {
    if (l.subtreeFlags & 9270)
      for (l = l.child; l !== null; )
        Im(l, t), l = l.sibling;
    else Qm(l);
  }
  function Im(t, l) {
    var e = t.alternate;
    if (e === null) Yf(t, !1);
    else
      switch (t.tag) {
        case 3:
          if (Vf = ve = !1, Ym(), mu(l, t), !ve && !Ui) {
            if (t = re, t !== null)
              for (var a = 0; a < t.length; a += 3) {
                e = t[a];
                var u = t[a + 1];
                Ld(e, t[a + 2]), e = e.ownerDocument.documentElement, e !== null && e.animate(
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
          mu(l, t);
          break;
        case 4:
          a = ve, ve = !1, mu(l, t), ve && (Ui = !0), ve = a;
          break;
        case 22:
          t.memoizedState === null && (e.memoizedState !== null ? Yf(t, !1) : mu(l, t));
          break;
        case 30:
          a = ve, u = Ym(), ve = !1, mu(l, t), ve && (t.flags |= 4);
          var n = t.memoizedProps, i = t.stateNode;
          l = Ee(n, i), i = Ee(e.memoizedProps, i);
          var c = _e(n.default, n.update);
          c === "none" ? l = !1 : (n = e.memoizedState, e.memoizedState = null, e = t.child, _l = 0, l = Qf(
            t,
            e,
            l,
            i,
            c,
            n,
            !0
          ), _l !== (n === null ? 0 : n.length) && (t.flags |= 32)), (t.flags & 4) !== 0 && l ? (bu(
            t,
            t.memoizedProps.onUpdate
          ), re = u) : u !== null && (u.push.apply(u, re), re = u), ve = (t.flags & 32) !== 0 ? !0 : a;
          break;
        default:
          mu(l, t);
      }
  }
  function he(t, l) {
    if (l.subtreeFlags & 8772)
      for (l = l.child; l !== null; )
        Vm(t, l.alternate, l), l = l.sibling;
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
          il(e, e.return);
          var u = e.stateNode;
          typeof u.componentWillUnmount == "function" && xm(
            e,
            e.return,
            u
          ), ke(
            e,
            a
          );
          break;
        case 27:
          (a & 2) !== 0 && kd(
            e.stateNode,
            e.type,
            e.memoizedProps
          );
        case 5:
          il(e, e.return), e.tag !== 5 && e.tag !== 27 || on(e), ke(
            e,
            a
          );
          break;
        case 6:
          on(e);
          break;
        case 26:
          il(e, e.return), u = e.stateNode, e.memoizedState !== null || u === null || At || u.parentNode.removeChild(u), ke(
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
          il(e, e.return), ke(
            e,
            a
          );
          break;
        case 7:
          il(e, e.return);
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
            } catch (E) {
              Ct(a, a.return, E);
            }
          if (a = n, u = a.updateQueue, u !== null) {
            var r = a.stateNode;
            try {
              var g = u.shared.hiddenCallbacks;
              if (g !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < g.length; u++)
                  pr(g[u], r);
            } catch (E) {
              Ct(a, a.return, E);
            }
          }
          c && i & 64 && Rm(n), oe(n, n.return);
          break;
        case 27:
          (e & 2) !== 0 && Bm(n);
        case 5:
          n.tag !== 5 && n.tag !== 27 || jm(n), le(
            u,
            n,
            e
          ), c && a === null && i & 4 && jf(n), oe(n, n.return);
          break;
        case 6:
          jm(n);
          break;
        case 26:
          r = n.stateNode, n.memoizedState !== null || r === null || tl || Cs(
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
          ), c && i & 4 && $m(u, n);
          break;
        case 13:
          le(
            u,
            n,
            e
          ), c && i & 4 && Fm(u, n);
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
        Pm(
          t,
          l,
          e,
          a
        ), l = l.sibling;
    else u && Xm(l);
  }
  function Pm(t, l, e, a) {
    var u = (e & 335544064) === e;
    u && l.alternate === null && l.return !== null && l.return.alternate !== null && Ci(l);
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
          } catch (g) {
            Ct(l, l.return, g);
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
        i = l.stateNode, c = l.alternate, l.memoizedState !== null ? (u && c !== null && c.memoizedState === null && Ci(c), i._visibility & 2 ? Kl(
          t,
          l,
          e,
          a
        ) : mn(
          t,
          l
        )) : (u && c !== null && c.memoizedState !== null && Ci(l), i._visibility & 2 ? Kl(
          t,
          l,
          e,
          a
        ) : (i._visibility |= 2, du(
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
        u && (n = l.alternate, n !== null && (me(n.child, !0), me(l.child, !0))), Kl(
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
  function du(t, l, e, a, u) {
    for (u = u && ((l.subtreeFlags & 10256) !== 0 || !1), l = l.child; l !== null; ) {
      var n = t, i = l, c = e, r = a, g = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          du(
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
          var E = i.stateNode;
          i.memoizedState !== null ? E._visibility & 2 ? du(
            n,
            i,
            c,
            r,
            u
          ) : mn(
            n,
            i
          ) : (E._visibility |= 2, du(
            n,
            i,
            c,
            r,
            u
          )), u && g & 2048 && Jf(
            i.alternate,
            i
          );
          break;
        case 24:
          du(
            n,
            i,
            c,
            r,
            u
          ), u && g & 2048 && $f(i.alternate, i);
          break;
        default:
          du(
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
  function mn(t, l) {
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; ) {
        var e = t, a = l, u = a.flags;
        switch (a.tag) {
          case 22:
            mn(e, a), u & 2048 && Jf(
              a.alternate,
              a
            );
            break;
          case 24:
            mn(e, a), u & 2048 && $f(a.alternate, a);
            break;
          default:
            mn(e, a);
        }
        l = l.sibling;
      }
  }
  var Ua = 8192;
  function Ra(t, l, e) {
    if (t.subtreeFlags & Ua)
      for (t = t.child; t !== null; )
        td(
          t,
          l,
          e
        ), t = t.sibling;
  }
  function td(t, l, e) {
    switch (t.tag) {
      case 26:
        Ra(
          t,
          l,
          e
        ), t.flags & Ua && (t.memoizedState !== null ? Ry(
          e,
          te,
          t.memoizedState,
          t.memoizedProps
        ) : (t = t.stateNode, (l & 335544128) === l && c0(e, t)));
        break;
      case 5:
        Ra(
          t,
          l,
          e
        ), t.flags & Ua && (t = t.stateNode, (l & 335544128) === l && c0(e, t));
        break;
      case 3:
      case 4:
        var a = te;
        te = pn(t.stateNode.containerInfo), Ra(
          t,
          l,
          e
        ), te = a;
        break;
      case 22:
        t.memoizedState === null && (a = t.alternate, a !== null && a.memoizedState !== null ? (a = Ua, Ua = 16777216, Ra(
          t,
          l,
          e
        ), Ua = a) : Ra(
          t,
          l,
          e
        ));
        break;
      case 30:
        if ((t.flags & Ua) !== 0 && (a = t.memoizedProps.name, a != null && a !== "auto")) {
          var u = t.stateNode;
          u.paired = null, jl === null && (jl = /* @__PURE__ */ new Map()), jl.set(a, u);
        }
        Ra(
          t,
          l,
          e
        );
        break;
      default:
        Ra(
          t,
          l,
          e
        );
    }
  }
  function ld(t) {
    var l = t.alternate;
    if (l !== null && (t = l.child, t !== null)) {
      l.child = null;
      do
        l = t.sibling, t.sibling = null, t = l;
      while (t !== null);
    }
  }
  function dn(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var e = 0; e < l.length; e++) {
          var a = l[e];
          ll = a, ad(
            a,
            t
          );
        }
      ld(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        ed(t), t = t.sibling;
  }
  function ed(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        dn(t), t.flags & 2048 && We(9, t, t.return);
        break;
      case 3:
        dn(t);
        break;
      case 12:
        dn(t);
        break;
      case 22:
        var l = t.stateNode;
        t.memoizedState !== null && l._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (l._visibility &= -3, ji(t)) : dn(t);
        break;
      default:
        dn(t);
    }
  }
  function ji(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var e = 0; e < l.length; e++) {
          var a = l[e];
          ll = a, ad(
            a,
            t
          );
        }
      ld(t);
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
  function ad(t, l) {
    for (; ll !== null; ) {
      var e = ll;
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
      if (a = e.child, a !== null) a.return = e, ll = a;
      else
        t: for (e = t; ll !== null; ) {
          a = ll;
          var u = a.sibling, n = a.return;
          if (Km(a), a === e) {
            ll = null;
            break t;
          }
          if (u !== null) {
            u.return = n, ll = u;
            break t;
          }
          ll = n;
        }
    }
  }
  var Ah = {
    getCacheForType: function(t) {
      var l = al(wt), e = l.data.get(t);
      return e === void 0 && (e = t(), l.data.set(t, e)), e;
    },
    cacheSignal: function() {
      return al(wt).controller.signal;
    }
  }, Mh = typeof WeakMap == "function" ? WeakMap : Map, zt = 0, xt = null, rt = null, vt = 0, Dt = 0, Hl = null, Ie = !1, vu = !1, Ff = !1, Re = 0, Qt = 0, Pe = 0, xa = 0, Hi = 0, Bl = 0, hu = 0, vn = null, zl = null, Wf = !1, Bi = 0, ud = 0, qi = 1 / 0, Yi = null, ta = null, Lt = 0, ee = null, ja = null, ye = 0, kf = 0, If = null, nd = null, yu = null, gu = null, Su = null, hn = 0, Li = null;
  function ql() {
    return (zt & 2) !== 0 && vt !== 0 ? vt & -vt : L.T !== null ? fs() : co();
  }
  function id() {
    if (Bl === 0)
      if ((vt & 536870912) === 0 || nt) {
        var t = xn;
        xn <<= 1, (xn & 3932160) === 0 && (xn = 262144), Bl = t;
      } else Bl = 536870912;
    return t = ul.current, t !== null && (t.flags |= 32), Bl;
  }
  function bu(t, l) {
    if (l != null) {
      var e = t.stateNode, a = e.ref;
      a === null && (a = e.ref = Gd(
        Ee(t.memoizedProps, e)
      )), gu === null && (gu = []), gu.push(l.bind(null, a));
    }
  }
  function Ol(t, l, e) {
    (t === xt && (Dt === 2 || Dt === 9) || t.cancelPendingCommit !== null) && (pu(t, 0), la(
      t,
      vt,
      Bl,
      !1
    )), Hu(t, e), ((zt & 2) === 0 || t !== xt) && (t === xt && ((zt & 2) === 0 && (xa |= e), Qt === 4 && la(
      t,
      vt,
      Bl,
      !1
    )), ge(t));
  }
  function cd(t, l, e) {
    if ((zt & 6) !== 0) throw Error(s(327));
    var a = !e && (l & 127) === 0 && (l & t.expiredLanes) === 0 || ju(t, l), u = a ? Uh(t, l) : ts(t, l, !0), n = a;
    do {
      if (u === 0) {
        vu && !a && la(t, l, 0, !1);
        break;
      } else {
        if (e = t.current.alternate, n && !Dh(e)) {
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
                  c.errorRecoveryDisabledLanes |= n, xa |= n, u = 4;
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
          if ((l & 62914560) === l && (u = Bi + 300 - Ml(), 10 < u)) {
            if (la(
              a,
              l,
              Bl,
              !Ie
            ), Hn(a, 0, !0) !== 0) break t;
            ye = l, a.timeoutHandle = bs(
              fd.bind(
                null,
                a,
                e,
                zl,
                Yi,
                Wf,
                l,
                Bl,
                xa,
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
          fd(
            a,
            e,
            zl,
            Yi,
            Wf,
            l,
            Bl,
            xa,
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
  function fd(t, l, e, a, u, n, i, c, r, g, E, O, h, p) {
    t.timeoutHandle = -1;
    var x = l.subtreeFlags, Q = (n & 335544064) === n;
    if (O = null, (Q || x & 8192 || (x & 16785408) === 16785408) && (O = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: ce
    }, jl = null, td(
      l,
      n,
      O
    ), Q && (x = O, Q = t.containerInfo, Q = (Q.nodeType === 9 ? Q : Q.ownerDocument).__reactViewTransition, Q != null && (x.count++, x.waitingForViewTransition = !0, x = _n.bind(x), Q.finished.then(x, x))), x = (n & 62914560) === n ? Bi - Ml() : (n & 4194048) === n ? ud - Ml() : 0, x = xy(
      O,
      x
    ), x !== null)) {
      ye = n, t.cancelPendingCommit = x(
        yd.bind(
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
          g,
          E,
          O,
          null,
          h,
          p
        )
      ), la(t, n, i, !g);
      return;
    }
    yd(
      t,
      l,
      n,
      e,
      a,
      u,
      i,
      c,
      r,
      g,
      E,
      O
    );
  }
  function Dh(t) {
    for (var l = t; ; ) {
      var e = l.tag;
      if ((e === 0 || e === 11 || e === 15) && l.flags & 16384 && (e = l.updateQueue, e !== null && (e = e.stores, e !== null)))
        for (var a = 0; a < e.length; a++) {
          var u = e[a], n = u.getSnapshot;
          u = u.value;
          try {
            if (!Rl(n(), u)) return !1;
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
    l = eo(t, l), l &= ~Hi, l &= ~xa, t.suspendedLanes |= l, t.pingedLanes &= ~l, a && (t.warmLanes |= l), a = t.expirationTimes;
    for (var u = l; 0 < u; ) {
      var n = 31 - Cl(u), i = 1 << n;
      a[n] = -1, u &= ~i;
    }
    e !== 0 && uo(t, e, l);
  }
  function Gi() {
    return (zt & 6) === 0 ? (yn(0), !1) : !0;
  }
  function Pf() {
    if (rt !== null) {
      if (Dt === 0)
        var t = rt.return;
      else
        t = rt, Oe = Ta = null, cf(t), iu = null, Iu = 0, t = rt;
      for (; t !== null; )
        Um(t.alternate, t), t = t.return;
      rt = null;
    }
  }
  function pu(t, l) {
    var e = t.timeoutHandle;
    return e !== -1 && (t.timeoutHandle = -1, Ph(e)), e = t.cancelPendingCommit, e !== null && (t.cancelPendingCommit = null, e()), ye = 0, Pf(), xt = t, rt = e = Ne(t.current, null), vt = l, Dt = 0, Hl = null, Ie = !1, vu = ju(t, l), Ff = !1, hu = Bl = Hi = xa = Pe = Qt = 0, zl = vn = null, Wf = !1, Re = eo(t, l), $n(), e;
  }
  function sd(t, l) {
    lt = null, L.H = bi, l === nu || l === ni ? (l = yr(), Dt = 3) : l === Jc ? (l = yr(), Dt = 4) : Dt = l === Ef ? 8 : l !== null && typeof l == "object" && typeof l.then == "function" ? 6 : 1, Hl = l, rt === null && (Qt = 1, pi(
      t,
      Ql(l, t.current)
    ));
  }
  function od() {
    var t = ul.current;
    return t === null ? !0 : (vt & 4194048) === vt ? rl === null : (vt & 62914560) === vt || (vt & 536870912) !== 0 ? t === rl : !1;
  }
  function rd() {
    var t = L.H;
    return L.H = bi, t === null ? bi : t;
  }
  function md() {
    var t = L.A;
    return L.A = Ah, t;
  }
  function Xi() {
    Qt = 4, Ie || (vt & 4194048) !== vt && ul.current !== null || (vu = !0), (Pe & 134217727) === 0 && (xa & 134217727) === 0 || xt === null || la(
      xt,
      vt,
      Bl,
      !1
    );
  }
  function ts(t, l, e) {
    var a = zt;
    zt |= 2;
    var u = rd(), n = md();
    (xt !== t || vt !== l) && (Yi = null, pu(t, l)), l = !1;
    var i = Qt;
    t: do
      try {
        if (Dt !== 0 && rt !== null) {
          var c = rt, r = Hl;
          switch (Dt) {
            case 8:
              Pf(), i = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              ul.current === null && (l = !0);
              var g = Dt;
              if (Dt = 0, Hl = null, Tu(t, c, r, g), e && vu) {
                i = 0;
                break t;
              }
              break;
            default:
              g = Dt, Dt = 0, Hl = null, Tu(t, c, r, g);
          }
        }
        Ch(), i = Qt;
        break;
      } catch (E) {
        sd(t, E);
      }
    while (!0);
    return l && t.shellSuspendCounter++, Oe = Ta = null, zt = a, L.H = u, L.A = n, rt === null && (xt = null, vt = 0, $n()), i;
  }
  function Ch() {
    for (; rt !== null; ) dd(rt);
  }
  function Uh(t, l) {
    var e = zt;
    zt |= 2;
    var a = rd(), u = md();
    xt !== t || vt !== l ? (Yi = null, qi = Ml() + 500, pu(t, l)) : vu = ju(
      t,
      l
    );
    t: do
      try {
        if (Dt !== 0 && rt !== null) {
          l = rt;
          var n = Hl;
          l: switch (Dt) {
            case 1:
              Dt = 0, Hl = null, Tu(t, l, n, 1);
              break;
            case 2:
            case 9:
              if (vr(n)) {
                Dt = 0, Hl = null, vd(l);
                break;
              }
              l = function() {
                Dt !== 2 && Dt !== 9 || xt !== t || (Dt = 7), ge(t);
              }, n.then(l, l);
              break t;
            case 3:
              Dt = 7;
              break t;
            case 4:
              Dt = 5;
              break t;
            case 7:
              vr(n) ? (Dt = 0, Hl = null, vd(l)) : (Dt = 0, Hl = null, Tu(t, l, n, 7));
              break;
            case 5:
              var i = null;
              switch (rt.tag) {
                case 26:
                  i = rt.memoizedState;
                case 5:
                case 27:
                  var c = rt;
                  if (i ? n0(i) : c.stateNode.complete) {
                    Dt = 0, Hl = null;
                    var r = c.sibling;
                    if (r !== null) rt = r;
                    else {
                      var g = c.return;
                      g !== null ? (rt = g, Qi(g)) : rt = null;
                    }
                    break l;
                  }
              }
              Dt = 0, Hl = null, Tu(t, l, n, 5);
              break;
            case 6:
              Dt = 0, Hl = null, Tu(t, l, n, 6);
              break;
            case 8:
              Pf(), Qt = 6;
              break t;
            default:
              throw Error(s(462));
          }
        }
        Rh();
        break;
      } catch (E) {
        sd(t, E);
      }
    while (!0);
    return Oe = Ta = null, L.H = a, L.A = u, zt = e, rt !== null ? 0 : (xt = null, vt = 0, $n(), Qt);
  }
  function Rh() {
    for (; rt !== null && !F0(); )
      dd(rt);
  }
  function dd(t) {
    var l = Dm(t.alternate, t, Re);
    t.memoizedProps = t.pendingProps, l === null ? Qi(t) : rt = l;
  }
  function vd(t) {
    var l = t, e = l.alternate;
    switch (l.tag) {
      case 15:
      case 0:
        l = Em(
          e,
          l,
          l.pendingProps,
          l.type,
          void 0,
          vt
        );
        break;
      case 11:
        l = Em(
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
        a === Pt && (nt ? (ti(a), a.tag === 5 && a.stateNode != null && (jt = a.stateNode)) : (ti(a), nt = !0));
      default:
        Um(e, l), l = rt = ar(l, Re), l = Dm(e, l, Re);
    }
    t.memoizedProps = t.pendingProps, l === null ? Qi(t) : rt = l;
  }
  function Tu(t, l, e, a) {
    Oe = Ta = null, cf(l), iu = null, Iu = 0;
    var u = l.return;
    try {
      if (bh(
        t,
        u,
        l,
        e,
        vt
      )) {
        Qt = 1, pi(
          t,
          Ql(e, t.current)
        ), rt = null;
        return;
      }
    } catch (n) {
      if (u !== null) throw rt = u, n;
      Qt = 1, pi(
        t,
        Ql(e, t.current)
      ), rt = null;
      return;
    }
    l.flags & 32768 ? (nt || a === 1 ? t = !0 : vu || (vt & 536870912) !== 0 ? t = !1 : (Ie = t = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = ul.current, a !== null && a.tag === 13 && (a.flags |= 16384))), hd(l, t)) : Qi(l);
  }
  function Qi(t) {
    var l = t;
    do {
      if ((l.flags & 32768) !== 0) {
        hd(
          l,
          Ie
        );
        return;
      }
      t = l.return;
      var e = _h(
        l.alternate,
        l,
        Re
      );
      if (e !== null) {
        rt = e;
        return;
      }
      if (l = l.sibling, l !== null) {
        rt = l;
        return;
      }
      rt = l = t;
    } while (l !== null);
    Qt === 0 && (Qt = 5);
  }
  function hd(t, l) {
    do {
      var e = Nh(t.alternate, t);
      if (e !== null) {
        e.flags &= 32767, rt = e;
        return;
      }
      if (e = t.return, e !== null && (e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null), !l && (t = t.sibling, t !== null)) {
        rt = t;
        return;
      }
      rt = t = e;
    } while (t !== null);
    Qt = 6, rt = null;
  }
  function yd(t, l, e, a, u, n, i, c, r, g, E, O) {
    t.cancelPendingCommit = null;
    do
      Zi();
    while (Lt !== 0);
    if ((zt & 6) !== 0) throw Error(s(327));
    if (l !== null) {
      if (l === t.current) throw Error(s(177));
      t === xt && (rt = xt = null, vt = 0), ja = l, ee = t, ye = e, If = u, nd = a, xh(
        t,
        l,
        e,
        i,
        c,
        r,
        O
      );
    }
  }
  function xh(t, l, e, a, u, n, i) {
    var c = l.lanes | l.childLanes;
    if (kf = c, c |= jc, nv(
      t,
      e,
      c,
      a,
      u,
      n
    ), gu = null, (e & 335544064) === e ? (Su = ch(t), a = 10262) : (Su = null, a = 10256), (l.subtreeFlags & a) !== 0 || (l.flags & a) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, Lh(Un, function() {
      return us(), null;
    })) : (t.callbackNode = null, t.callbackPriority = 0), Mi = !1, a = (l.flags & 13878) !== 0, (l.subtreeFlags & 13878) !== 0 || a) {
      a = L.T, L.T = null, u = F.p, F.p = 2, n = zt, zt |= 4;
      try {
        zh(t, l, e);
      } finally {
        zt = n, F.p = u, L.T = a;
      }
    }
    Lt = 1, Mi ? yu = ny(
      i,
      t.containerInfo,
      Su,
      ls,
      es,
      Hh,
      as,
      us,
      jh
    ) : (ls(), es(), as());
  }
  function jh(t) {
    if (Lt !== 0) {
      var l = ee.onRecoverableError;
      l(t, { componentStack: null });
    }
  }
  function Hh() {
    Lt === 3 && (Lt = 0, Im(ja, ee), Lt = 4);
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
          rn = Ui = !1, Wm(l, t, e), e = ys;
          var i = Jo(t.containerInfo), c = e.focusedElem, r = e.selectionRange;
          if (i !== c && c && c.ownerDocument && Ko(
            c.ownerDocument.documentElement,
            c
          )) {
            if (r !== null && Dc(c)) {
              var g = r.start, E = r.end;
              if (E === void 0 && (E = g), "selectionStart" in c)
                c.selectionStart = g, c.selectionEnd = Math.min(
                  E,
                  c.value.length
                );
              else {
                var O = c.ownerDocument || document, h = O && O.defaultView || window;
                if (h.getSelection) {
                  var p = h.getSelection(), x = c.textContent.length, Q = Math.min(r.start, x), et = r.end === void 0 ? Q : Math.min(r.end, x);
                  !p.extend && Q > et && (i = et, et = Q, Q = i);
                  var y = wo(
                    c,
                    Q
                  ), m = wo(
                    c,
                    et
                  );
                  if (y && m && (p.rangeCount !== 1 || p.anchorNode !== y.node || p.anchorOffset !== y.offset || p.focusNode !== m.node || p.focusOffset !== m.offset)) {
                    var b = O.createRange();
                    b.setStart(y.node, y.offset), p.removeAllRanges(), Q > et ? (p.addRange(b), p.extend(m.node, m.offset)) : (b.setEnd(m.node, m.offset), p.addRange(b));
                  }
                }
              }
            }
            for (O = [], p = c; p = p.parentNode; )
              p.nodeType === 1 && O.push({
                element: p,
                left: p.scrollLeft,
                top: p.scrollTop
              });
            for (typeof c.focus == "function" && c.focus(), c = 0; c < O.length; c++) {
              var N = O[c];
              N.element.scrollLeft = N.left, N.element.scrollTop = N.top;
            }
          }
          Du = !!hs, ys = hs = null;
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
          Vm(t, l.alternate, l);
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
      yu = null, W0();
      var l = ee, e = ja, a = ye, u = nd, n = (a & 335544064) === a ? 10262 : 10256;
      if ((e.subtreeFlags & n) !== 0 || (e.flags & n) !== 0 ? Lt = 5 : (Lt = 0, ja = ee = null, gd(l, l.pendingLanes)), n = l.pendingLanes, n === 0 && (ta = null), rc(a), e = e.stateNode, Dl && typeof Dl.onCommitFiberRoot == "function")
        try {
          Dl.onCommitFiberRoot(
            xu,
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
      if (u = gu, i = Su, Su = null, u !== null && (gu = null, i === null && (i = []), t !== null))
        for (r = 0; r < u.length; r++)
          e = (0, u[r])(
            i
          ), e !== void 0 && t.finished.finally(e);
      (ye & 3) !== 0 && Zi(), ge(l), n = l.pendingLanes, (a & 261930) !== 0 && (n & 42) !== 0 ? l === Li ? hn++ : (hn = 0, Li = l) : (hn = 0, Li = null), yn(0);
    }
  }
  function gd(t, l) {
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
      if (zt |= 4, ed(n.current), Pm(
        n,
        n.current,
        i,
        e
      ), zt = c, yn(0, !1), Dl && typeof Dl.onPostCommitFiberRoot == "function")
        try {
          Dl.onPostCommitFiberRoot(xu, n);
        } catch {
        }
      return !0;
    } finally {
      F.p = u, L.T = a, gd(t, l);
    }
  }
  function Sd(t, l, e) {
    l = Ql(e, l), l = Tf(t.stateNode, l, 2), t = Ke(t, l, 2), t !== null && (Hu(t, 2), ge(t));
  }
  function Ct(t, l, e) {
    if (t.tag === 3)
      Sd(t, t, e);
    else
      for (; l !== null; ) {
        if (l.tag === 3) {
          Sd(
            l,
            t,
            e
          );
          break;
        } else if (l.tag === 1) {
          var a = l.stateNode;
          if (typeof l.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (ta === null || !ta.has(a))) {
            t = Ql(e, t), e = vm(2), a = Ke(l, e, 2), a !== null && (hm(
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
      a = t.pingCache = new Mh();
      var u = /* @__PURE__ */ new Set();
      a.set(l, u);
    } else
      u = a.get(l), u === void 0 && (u = /* @__PURE__ */ new Set(), a.set(l, u));
    u.has(e) || (Ff = !0, u.add(e), t = Bh.bind(null, t, l, e), l.then(t, t));
  }
  function Bh(t, l, e) {
    var a = t.pingCache;
    a !== null && a.delete(l), t.pingedLanes |= t.suspendedLanes & e, t.warmLanes &= ~e, xt === t && (vt & e) === e && ((Qt === 4 || Qt === 3 && (vt & 62914560) === vt && 300 > Ml() - Bi) && (zt & 2) === 0 ? pu(t, 0) : Hi |= e, hu === vt && (hu = 0)), ge(t);
  }
  function bd(t, l) {
    l === 0 && (l = ao()), t = Sa(t, l), t !== null && (Hu(t, l), ge(t));
  }
  function qh(t) {
    var l = t.memoizedState, e = 0;
    l !== null && (e = l.retryLane), bd(t, e);
  }
  function Yh(t, l) {
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
    a !== null && a.delete(l), bd(t, e);
  }
  function Lh(t, l) {
    return ma(t, l);
  }
  var Eu = null, _u = null, is = !1, Vi = !1, cs = !1, ea = 0;
  function ge(t) {
    t !== _u && t.next === null && (_u === null ? Eu = _u = t : _u = _u.next = t), Vi = !0, is || (is = !0, Xh());
  }
  function yn(t, l) {
    if (!cs && Vi) {
      cs = !0;
      do
        for (var e = !1, a = Eu; a !== null; ) {
          if (t !== 0) {
            var u = a.pendingLanes;
            if (u === 0) var n = 0;
            else {
              var i = a.suspendedLanes, c = a.pingedLanes;
              n = (1 << 31 - Cl(42 | t) + 1) - 1, n &= u & ~(i & ~c), n = n & 201326741 ? n & 201326741 | 1 : n ? n | 2 : 0;
            }
            n !== 0 && (e = !0, _d(a, n));
          } else
            n = vt, n = Hn(
              a,
              a === xt ? n : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (n & 3) === 0 || ju(a, n) || (e = !0, _d(a, n));
          a = a.next;
        }
      while (e);
      cs = !1;
    }
  }
  function Gh() {
    pd();
  }
  function pd() {
    Vi = is = !1;
    var t = 0;
    ea !== 0 && Ih() && (t = ea);
    for (var l = Ml(), e = null, a = Eu; a !== null; ) {
      var u = a.next, n = Td(a, l);
      n === 0 ? (a.next = null, e === null ? Eu = u : e.next = u, u === null && (_u = e)) : (e = a, (t !== 0 || (n & 3) !== 0) && (Vi = !0)), a = u;
    }
    Lt !== 0 && Lt !== 5 || yn(t), ea !== 0 && (ea = 0);
  }
  function Td(t, l) {
    for (var e = t.suspendedLanes, a = t.pingedLanes, u = t.expirationTimes, n = t.pendingLanes & -62914561; 0 < n; ) {
      var i = 31 - Cl(n), c = 1 << i, r = u[i];
      r === -1 ? ((c & e) === 0 || (c & a) !== 0) && (u[i] = uv(c, l)) : r <= l && (t.expiredLanes |= c), n &= ~c;
    }
    if (l = xt, e = vt, e = Hn(
      t,
      t === l ? e : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a = t.callbackNode, e === 0 || t === l && (Dt === 2 || Dt === 9) || t.cancelPendingCommit !== null)
      return a !== null && a !== null && fc(a), t.callbackNode = null, t.callbackPriority = 0;
    if ((e & 3) === 0 || ju(t, e)) {
      if (l = e & -e, l === t.callbackPriority) return l;
      switch (a !== null && fc(a), rc(e)) {
        case 2:
        case 8:
          e = to;
          break;
        case 32:
          e = Un;
          break;
        case 268435456:
          e = lo;
          break;
        default:
          e = Un;
      }
      return a = Ed.bind(null, t), e = ma(e, a), t.callbackPriority = l, t.callbackNode = e, l;
    }
    return a !== null && a !== null && fc(a), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function Ed(t, l) {
    if (Lt !== 0 && Lt !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var e = t.callbackNode;
    if (Zi() && t.callbackNode !== e)
      return null;
    var a = vt;
    return a = Hn(
      t,
      t === xt ? a : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a === 0 ? null : (cd(t, a, l), Td(t, Ml()), t.callbackNode != null && t.callbackNode === e ? Ed.bind(null, t) : null);
  }
  function _d(t, l) {
    if (Zi()) return null;
    cd(t, l, !0);
  }
  function Xh() {
    ty(function() {
      (zt & 6) !== 0 ? ma(
        Ps,
        Gh
      ) : pd();
    });
  }
  function fs() {
    if (ea === 0) {
      var t = Na;
      t === 0 && (t = Rn, Rn <<= 1, (Rn & 261888) === 0 && (Rn = 256)), ea = t;
    }
    return ea;
  }
  function Nd(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : Gn(t);
  }
  function Qh(t, l, e, a, u) {
    if (l === "submit" && e && e.stateNode === u) {
      var n = Nd(
        (u[Tl] || null).action
      ), i = a.submitter;
      i && (l = (l = i[Tl] || null) ? Nd(l.formAction) : i.getAttribute("formAction"), l !== null && (n = l, i = null));
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
  for (var ss = 0; ss < xc.length; ss++) {
    var os = xc[ss], Zh = os.toLowerCase(), Vh = os[0].toUpperCase() + os.slice(1);
    Il(
      Zh,
      "on" + Vh
    );
  }
  Il(Wo, "onAnimationEnd"), Il(ko, "onAnimationIteration"), Il(Io, "onAnimationStart"), Il("dblclick", "onDoubleClick"), Il("focusin", "onFocus"), Il("focusout", "onBlur"), Il(Pv, "onTransitionRun"), Il(th, "onTransitionStart"), Il(lh, "onTransitionCancel"), Il(Po, "onTransitionEnd"), wa("onMouseEnter", ["mouseout", "mouseover"]), wa("onMouseLeave", ["mouseout", "mouseover"]), wa("onPointerEnter", ["pointerout", "pointerover"]), wa("onPointerLeave", ["pointerout", "pointerover"]), ha(
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
  ), wh = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(gn)
  );
  function zd(t, l) {
    l = (l & 4) !== 0;
    for (var e = 0; e < t.length; e++) {
      var a = t[e], u = a.event;
      a = a.listeners;
      t: {
        var n = void 0;
        if (l)
          for (var i = a.length - 1; 0 <= i; i--) {
            var c = a[i], r = c.instance, g = c.currentTarget;
            if (c = c.listener, r !== n && u.isPropagationStopped())
              break t;
            n = c, u.currentTarget = g;
            try {
              n(u);
            } catch (E) {
              Jn(E);
            }
            u.currentTarget = null, n = r;
          }
        else
          for (i = 0; i < a.length; i++) {
            if (c = a[i], r = c.instance, g = c.currentTarget, c = c.listener, r !== n && u.isPropagationStopped())
              break t;
            n = c, u.currentTarget = g;
            try {
              n(u);
            } catch (E) {
              Jn(E);
            }
            u.currentTarget = null, n = r;
          }
      }
    }
  }
  function mt(t, l) {
    var e = l[so];
    e === void 0 && (e = l[so] = /* @__PURE__ */ new Set());
    var a = t + "__bubble";
    e.has(a) || (Od(l, t, 2, !1), e.add(a));
  }
  function rs(t, l, e) {
    var a = 0;
    l && (a |= 4), Od(
      e,
      t,
      a,
      l
    );
  }
  var wi = "_reactListening" + Math.random().toString(36).slice(2);
  function ms(t) {
    if (!t[wi]) {
      t[wi] = !0, mo.forEach(function(e) {
        e !== "selectionchange" && (wh.has(e) || rs(e, !1, t), rs(e, !0, t));
      });
      var l = t.nodeType === 9 ? t : t.ownerDocument;
      l === null || l[wi] || (l[wi] = !0, rs("selectionchange", !1, l));
    }
  }
  function Od(t, l, e, a) {
    switch (h0(l)) {
      case 2:
        var u = qy;
        break;
      case 8:
        u = Yy;
        break;
      default:
        u = Rs;
    }
    e = u.bind(
      null,
      l,
      e,
      t
    ), u = void 0, !bc || l !== "touchstart" && l !== "touchmove" && l !== "wheel" || (u = !0), a ? u !== void 0 ? t.addEventListener(l, e, {
      capture: !0,
      passive: u
    }) : t.addEventListener(l, e, !0) : u !== void 0 ? t.addEventListener(l, e, {
      passive: u
    }) : t.addEventListener(l, e, !1);
  }
  function ds(t, l, e, a, u) {
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
    Oo(function() {
      var g = n, E = gc(e), O = [];
      t: {
        var h = tr.get(t);
        if (h !== void 0) {
          var p = Vn, x = t;
          switch (t) {
            case "keypress":
              if (Qn(e) === 0) break t;
            case "keydown":
            case "keyup":
              p = Dv;
              break;
            case "focusin":
              x = "focus", p = _c;
              break;
            case "focusout":
              x = "blur", p = _c;
              break;
            case "beforeblur":
            case "afterblur":
              p = _c;
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
              p = gv;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              p = jv;
              break;
            case Wo:
            case ko:
            case Io:
              p = pv;
              break;
            case Po:
              p = Bv;
              break;
            case "scroll":
            case "scrollend":
              p = hv;
              break;
            case "wheel":
              p = Yv;
              break;
            case "copy":
            case "cut":
            case "paste":
              p = Ev;
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
              p = Rv;
              break;
            case "toggle":
            case "beforetoggle":
              p = Gv;
          }
          var Q = (l & 4) !== 0, et = !Q && (t === "scroll" || t === "scrollend"), y = Q ? h !== null ? h + "Capture" : null : h;
          Q = [];
          for (var m = g, b; m !== null; ) {
            var N = m;
            if (b = N.stateNode, N = N.tag, N !== 5 && N !== 26 && N !== 27 || b === null || y === null || (N = Yu(m, y), N != null && Q.push(
              Sn(m, N, b)
            )), et) break;
            m = m.return;
          }
          0 < Q.length && (h = new p(
            h,
            x,
            null,
            e,
            E
          ), O.push({ event: h, listeners: Q }));
        }
      }
      if ((l & 7) === 0) {
        t: {
          if (p = t === "mouseover" || t === "pointerover", h = t === "mouseout" || t === "pointerout", p && e !== yc && (x = e.relatedTarget || e.fromElement) && (va(x) || x[Qa]))
            break t;
          (h || p) && (x = E.window === E ? E : (p = E.ownerDocument) ? p.defaultView || p.parentWindow : window, h ? (p = e.relatedTarget || e.toElement, h = g, p = p ? va(p) : null, p !== null && (et = S(p), Q = p.tag, p !== et || Q !== 5 && Q !== 27 && Q !== 6) && (p = null)) : (h = null, p = g), h !== p && (Q = Do, N = "onMouseLeave", y = "onMouseEnter", m = "mouse", (t === "pointerout" || t === "pointerover") && (Q = Uo, N = "onPointerLeave", y = "onPointerEnter", m = "pointer"), et = h == null ? x : qu(h), b = p == null ? x : qu(p), x = new Q(
            N,
            m + "leave",
            h,
            e,
            E
          ), x.target = et, x.relatedTarget = b, N = null, va(E) === g && (Q = new Q(
            y,
            m + "enter",
            p,
            e,
            E
          ), Q.target = b, Q.relatedTarget = et, N = Q), et = N, Q = h && p ? Vt(
            h,
            p,
            Kh
          ) : null, h !== null && Ad(
            O,
            x,
            h,
            Q,
            !1
          ), p !== null && et !== null && Ad(
            O,
            et,
            p,
            Q,
            !0
          )));
        }
        t: {
          if (h = g ? qu(g) : window, p = h.nodeName && h.nodeName.toLowerCase(), p === "select" || p === "input" && h.type === "file")
            var Y = Lo;
          else if (qo(h))
            if (Go)
              Y = Wv;
            else {
              Y = $v;
              var ht = Jv;
            }
          else
            p = h.nodeName, !p || p.toLowerCase() !== "input" || h.type !== "checkbox" && h.type !== "radio" ? g && hc(g.elementType) && (Y = Lo) : Y = Fv;
          if (Y && (Y = Y(t, g))) {
            Yo(
              O,
              Y,
              e,
              E
            );
            break t;
          }
          ht && ht(t, h, g);
        }
        switch (ht = g ? qu(g) : window, t) {
          case "focusin":
            (qo(ht) || ht.contentEditable === "true") && (ka = ht, Cc = g, Ku = null);
            break;
          case "focusout":
            Ku = Cc = ka = null;
            break;
          case "mousedown":
            Uc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Uc = !1, $o(O, e, E);
            break;
          case "selectionchange":
            if (Iv) break;
          case "keydown":
          case "keyup":
            $o(O, e, E);
        }
        var J;
        if (zc)
          t: {
            switch (t) {
              case "compositionstart":
                var k = "onCompositionStart";
                break t;
              case "compositionend":
                k = "onCompositionEnd";
                break t;
              case "compositionupdate":
                k = "onCompositionUpdate";
                break t;
            }
            k = void 0;
          }
        else
          Wa ? Ho(t, e) && (k = "onCompositionEnd") : t === "keydown" && e.keyCode === 229 && (k = "onCompositionStart");
        k && (Ro && e.locale !== "ko" && (Wa || k !== "onCompositionStart" ? k === "onCompositionEnd" && Wa && (J = Ao()) : (qe = E, pc = "value" in qe ? qe.value : qe.textContent, Wa = !0)), ht = Ki(g, k), 0 < ht.length && (k = new Co(
          k,
          t,
          null,
          e,
          E
        ), O.push({ event: k, listeners: ht }), J ? k.data = J : (J = Bo(e), J !== null && (k.data = J)))), (J = Qv ? Zv(t, e) : Vv(t, e)) && (k = Ki(g, "onBeforeInput"), 0 < k.length && (ht = new Co(
          "onBeforeInput",
          "beforeinput",
          null,
          e,
          E
        ), O.push({
          event: ht,
          listeners: k
        }), ht.data = J)), Qh(
          O,
          t,
          g,
          e,
          E
        );
      }
      zd(O, l);
    });
  }
  function Sn(t, l, e) {
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
        Sn(t, u, n)
      ), u = Yu(t, l), u != null && a.push(
        Sn(t, u, n)
      )), t.tag === 3) return a;
      t = t.return;
    }
    return [];
  }
  function Kh(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function Ad(t, l, e, a, u) {
    for (var n = l._reactName, i = []; e !== null && e !== a; ) {
      var c = e, r = c.alternate, g = c.stateNode;
      if (c = c.tag, r !== null && r === a) break;
      c !== 5 && c !== 26 && c !== 27 || g === null || (r = g, u ? (g = Yu(e, n), g != null && i.unshift(
        Sn(e, g, r)
      )) : u || (g = Yu(e, n), g != null && i.push(
        Sn(e, g, r)
      ))), e = e.return;
    }
    i.length !== 0 && t.push({ event: l, listeners: i });
  }
  var Jh = /\r\n?/g, $h = /\u0000|\uFFFD/g;
  function Md(t) {
    return (typeof t == "string" ? t : "" + t).replace(Jh, `
`).replace($h, "");
  }
  function Dd(t, l) {
    return l = Md(l), Md(t) === l;
  }
  function Ut(t, l, e, a, u, n) {
    switch (e) {
      case "children":
        if (typeof a == "string")
          l === "body" || l === "textarea" && a === "" || Ja(t, a);
        else if (typeof a == "number" || typeof a == "bigint")
          l !== "body" && Ja(t, "" + a);
        else return;
        break;
      case "className":
        Ln(t, "class", a);
        break;
      case "tabIndex":
        Ln(t, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Ln(t, e, a);
        break;
      case "style":
        No(t, a, n);
        return;
      case "data":
        if (l !== "object") {
          Ln(t, "data", a);
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
        a = Gn(a), t.setAttribute(e, a);
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
          typeof n == "function" && (e === "formAction" ? (l !== "input" && Ut(t, l, "name", u.name, u, null), Ut(
            t,
            l,
            "formEncType",
            u.formEncType,
            u,
            null
          ), Ut(
            t,
            l,
            "formMethod",
            u.formMethod,
            u,
            null
          ), Ut(
            t,
            l,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (Ut(t, l, "encType", u.encType, u, null), Ut(t, l, "method", u.method, u, null), Ut(t, l, "target", u.target, u, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          t.removeAttribute(e);
          break;
        }
        a = Gn(a), t.setAttribute(e, a);
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
        e = Gn(a), t.setAttributeNS(
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
          e = dv.get(e) || e, Yn(t, e, a);
        else return;
    }
    _t = !0;
  }
  function vs(t, l, e, a, u, n) {
    switch (e) {
      case "style":
        No(t, a, n);
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
        if (!vo.hasOwnProperty(e))
          t: {
            if (e[0] === "o" && e[1] === "n" && (u = e.endsWith("Capture"), n = e.slice(2, u ? e.length - 7 : void 0), l = t[Tl] || null, l = l != null ? l[e] : null, typeof l == "function" && t.removeEventListener(n, l, u), typeof a == "function")) {
              typeof l != "function" && l !== null && (e in t ? t[e] = null : t.hasAttribute(e) && t.removeAttribute(e)), t.addEventListener(n, a, u);
              break t;
            }
            _t = !0, e in t ? t[e] = a : a === !0 ? t.setAttribute(e, "") : Yn(t, e, a);
          }
        return;
    }
    _t = !0;
  }
  function cl(t, l, e) {
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
                  Ut(t, l, n, i, e, null);
              }
          }
        u && Ut(t, l, "srcSet", e.srcSet, e, null), a && Ut(t, l, "src", e.src, e, null);
        return;
      case "input":
        mt("invalid", t);
        var c = n = i = u = null, r = null, g = null;
        for (a in e)
          if (e.hasOwnProperty(a)) {
            var E = e[a];
            if (E != null)
              switch (a) {
                case "name":
                  u = E;
                  break;
                case "type":
                  i = E;
                  break;
                case "checked":
                  r = E;
                  break;
                case "defaultChecked":
                  g = E;
                  break;
                case "value":
                  n = E;
                  break;
                case "defaultValue":
                  c = E;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (E != null)
                    throw Error(s(137, l));
                  break;
                default:
                  Ut(t, l, a, E, e, null);
              }
          }
        po(
          t,
          n,
          c,
          r,
          g,
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
                Ut(t, l, u, c, e, null);
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
                Ut(t, l, i, c, e, null);
            }
        Eo(t, a, u, n);
        return;
      case "option":
        for (r in e)
          e.hasOwnProperty(r) && (a = e[r], a != null) && (r === "selected" ? t.selected = a && typeof a != "function" && typeof a != "symbol" : Ut(t, l, r, a, e, null));
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
        for (g in e)
          if (e.hasOwnProperty(g) && (a = e[g], a != null))
            switch (g) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(s(137, l));
              default:
                Ut(t, l, g, a, e, null);
            }
        return;
      default:
        if (hc(l)) {
          for (E in e)
            e.hasOwnProperty(E) && (a = e[E], a !== void 0 && vs(
              t,
              l,
              E,
              a,
              e,
              void 0
            ));
          return;
        }
    }
    for (c in e)
      e.hasOwnProperty(c) && (a = e[c], a != null && Ut(t, l, c, a, e, null));
  }
  var Fh = {};
  function Wh(t, l, e, a) {
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
        var u = null, n = null, i = null, c = null, r = null, g = null, E = null;
        for (p in e) {
          var O = e[p];
          if (e.hasOwnProperty(p) && O != null)
            switch (p) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                r = O;
              default:
                a.hasOwnProperty(p) || Ut(t, l, p, null, a, O);
            }
        }
        for (var h in a) {
          var p = a[h];
          if (O = e[h], a.hasOwnProperty(h) && (p != null || O != null))
            switch (h) {
              case "type":
                p !== O && (_t = !0), n = p;
                break;
              case "name":
                p !== O && (_t = !0), u = p;
                break;
              case "checked":
                p !== O && (_t = !0), g = p;
                break;
              case "defaultChecked":
                p !== O && (_t = !0), E = p;
                break;
              case "value":
                p !== O && (_t = !0), i = p;
                break;
              case "defaultValue":
                p !== O && (_t = !0), c = p;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (p != null)
                  throw Error(s(137, l));
                break;
              default:
                p !== O && Ut(
                  t,
                  l,
                  h,
                  p,
                  a,
                  O
                );
            }
        }
        dc(
          t,
          i,
          c,
          r,
          g,
          E,
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
                a.hasOwnProperty(n) || Ut(
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
                n !== r && (_t = !0), h = n;
                break;
              case "defaultValue":
                n !== r && (_t = !0), c = n;
                break;
              case "multiple":
                n !== r && (_t = !0), i = n;
              default:
                n !== r && Ut(
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
                Ut(t, l, c, null, a, u);
            }
        for (i in a)
          if (u = a[i], n = e[i], a.hasOwnProperty(i) && (u != null || n != null))
            switch (i) {
              case "value":
                u !== n && (_t = !0), h = u;
                break;
              case "defaultValue":
                u !== n && (_t = !0), p = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(s(91));
                break;
              default:
                u !== n && Ut(t, l, i, u, a, n);
            }
        To(t, h, p);
        return;
      case "option":
        for (var x in e)
          h = e[x], e.hasOwnProperty(x) && h != null && !a.hasOwnProperty(x) && (x === "selected" ? t.selected = !1 : Ut(
            t,
            l,
            x,
            null,
            a,
            h
          ));
        for (r in a)
          h = a[r], p = e[r], a.hasOwnProperty(r) && h !== p && (h != null || p != null) && (r === "selected" ? (h !== p && (_t = !0), t.selected = h && typeof h != "function" && typeof h != "symbol") : Ut(
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
        for (var Q in e)
          h = e[Q], e.hasOwnProperty(Q) && h != null && !a.hasOwnProperty(Q) && Ut(t, l, Q, null, a, h);
        for (g in a)
          if (h = a[g], p = e[g], a.hasOwnProperty(g) && h !== p && (h != null || p != null))
            switch (g) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (h != null)
                  throw Error(s(137, l));
                break;
              default:
                Ut(
                  t,
                  l,
                  g,
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
          for (E in a)
            h = a[E], p = e[E], !a.hasOwnProperty(E) || h === p || h === void 0 && p === void 0 || vs(
              t,
              l,
              E,
              h,
              a,
              p
            );
          return;
        }
    }
    for (var y in e)
      h = e[y], e.hasOwnProperty(y) && h != null && !a.hasOwnProperty(y) && Ut(t, l, y, null, a, h);
    for (O in a)
      h = a[O], p = e[O], !a.hasOwnProperty(O) || h === p || h == null && p == null || Ut(t, l, O, h, a, p);
  }
  function Cd(t) {
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
  function kh() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, l = 0, e = performance.getEntriesByType("resource"), a = 0; a < e.length; a++) {
        var u = e[a], n = u.transferSize, i = u.initiatorType, c = u.duration;
        if (n && c && Cd(i)) {
          for (i = 0, c = u.responseEnd, a += 1; a < e.length; a++) {
            var r = e[a], g = r.startTime;
            if (g > c) break;
            var E = r.transferSize, O = r.initiatorType;
            E && Cd(O) && (r = r.responseEnd, i += E * (r < c ? 1 : (c - g) / (r - g)));
          }
          if (--a, l += 8 * (n + i) / (u.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return l / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var hs = null, ys = null;
  function bn(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function Ud(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Rd(t, l) {
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
  function xd(t, l, e, a) {
    return e = bn(
      e
    ).createElement(t), e[el] = a, e[Tl] = l, cl(e, t, l), It(e), e;
  }
  function gs(t, l) {
    return t === "textarea" || t === "noscript" || typeof l.children == "string" || typeof l.children == "number" || typeof l.children == "bigint" || typeof l.dangerouslySetInnerHTML == "object" && l.dangerouslySetInnerHTML !== null && l.dangerouslySetInnerHTML.__html != null;
  }
  var Ss = null;
  function Ih() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Ss ? !1 : (Ss = t, !0) : (Ss = null, !1);
  }
  var bs = typeof setTimeout == "function" ? setTimeout : void 0, Ph = typeof clearTimeout == "function" ? clearTimeout : void 0, jd = typeof Promise == "function" ? Promise : void 0, Hd = typeof requestAnimationFrame == "function" ? requestAnimationFrame : bs, ty = typeof queueMicrotask == "function" ? queueMicrotask : typeof jd < "u" ? function(t) {
    return jd.resolve(null).then(t).catch(ly);
  } : bs;
  function ly(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function aa(t) {
    return t === "head";
  }
  function Bd(t, l) {
    var e = l, a = 0;
    do {
      var u = e.nextSibling;
      if (t.removeChild(e), u && u.nodeType === 8)
        if (e = u.data, e === "/$" || e === "/&") {
          if (a === 0) {
            t.removeChild(u), Cu(l);
            return;
          }
          a--;
        } else if (e === "$" || e === "$?" || e === "$~" || e === "$!" || e === "&")
          a++;
        else if (e === "html")
          As(
            t.ownerDocument.documentElement
          );
        else if (e === "head") {
          e = t.ownerDocument.head, As(e);
          for (var n = e.firstChild; n; ) {
            var i = n.nextSibling, c = n.nodeName;
            n[Bu] || c === "SCRIPT" || c === "STYLE" || c === "LINK" && n.rel.toLowerCase() === "stylesheet" || e.removeChild(n), n = i;
          }
        } else
          e === "body" && As(t.ownerDocument.body);
      e = u;
    } while (e);
    Cu(l);
  }
  function qd(t, l) {
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
  function Yd(t, l, e) {
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
  function Ld(t, l) {
    t = t.style, l = l.style;
    var e = l != null ? l.hasOwnProperty("viewTransitionName") ? l.viewTransitionName : l.hasOwnProperty("view-transition-name") ? l["view-transition-name"] : null : null;
    t.viewTransitionName = e == null || typeof e == "boolean" ? "" : ("" + e).trim(), e = l != null ? l.hasOwnProperty("viewTransitionClass") ? l.viewTransitionClass : l.hasOwnProperty("view-transition-class") ? l["view-transition-class"] : null : null, t.viewTransitionClass = e == null || typeof e == "boolean" ? "" : ("" + e).trim(), t.display === "inline-block" && (l == null ? t.display = t.margin = "" : (e = l.display, t.display = e == null || typeof e == "boolean" ? "" : e, e = l.margin, e != null ? t.margin = e : (e = l.hasOwnProperty("marginTop") ? l.marginTop : l["margin-top"], t.marginTop = e == null || typeof e == "boolean" ? "" : e, l = l.hasOwnProperty("marginBottom") ? l.marginBottom : l["margin-bottom"], t.marginBottom = l == null || typeof l == "boolean" ? "" : l)));
  }
  function ey(t, l, e) {
    return e = e.ownerDocument.defaultView, {
      rect: t,
      abs: l.position === "absolute" || l.position === "fixed",
      clip: l.clipPath !== "none" || l.overflow !== "visible" || l.filter !== "none" || l.mask !== "none" || l.mask !== "none" || l.borderRadius !== "0px",
      view: 0 <= t.bottom && 0 <= t.right && t.top <= e.innerHeight && t.left <= e.innerWidth
    };
  }
  function ps(t) {
    var l = t.getBoundingClientRect(), e = getComputedStyle(t);
    return ey(l, e, t);
  }
  function ay(t) {
    return t.documentElement.clientHeight;
  }
  function uy(t) {
    this.addEventListener("load", t), this.addEventListener("error", t);
  }
  function ny(t, l, e, a, u, n, i, c, r) {
    var g = l.nodeType === 9 ? l : l.ownerDocument;
    try {
      var E = g.startViewTransition({
        update: function() {
          var h = g.defaultView, p = h.navigation && h.navigation.transition, x = g.fonts.status;
          a();
          var Q = [];
          if (x === "loaded" && (ay(g), g.fonts.status === "loading" && Q.push(g.fonts.ready)), x = Q.length, t !== null)
            for (var et = t.suspenseyImages, y = 0, m = 0; m < et.length; m++) {
              var b = et[m];
              if (!b.complete) {
                var N = b.getBoundingClientRect();
                if (0 < N.bottom && 0 < N.right && N.top < h.innerHeight && N.left < h.innerWidth) {
                  if (y += i0(b), y > Fi) {
                    Q.length = x;
                    break;
                  }
                  b = new Promise(
                    uy.bind(b)
                  ), Q.push(b);
                }
              }
            }
          if (0 < Q.length)
            return h = Promise.race([
              Promise.all(Q),
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
      g.__reactViewTransition = E;
      var O = [];
      return E.ready.then(
        function() {
          for (var h = g.documentElement.getAnimations({
            subtree: !0
          }), p = 0; p < h.length; p++) {
            var x = h[p], Q = x.effect, et = Q.pseudoElement;
            if (et != null && et.startsWith("::view-transition")) {
              O.push(x), x = Q.getKeyframes();
              for (var y = et = void 0, m = !0, b = 0; b < x.length; b++) {
                var N = x[b], Y = N.width;
                if (et === void 0) et = Y;
                else if (et !== Y) {
                  m = !1;
                  break;
                }
                if (Y = N.height, y === void 0) y = Y;
                else if (y !== Y) {
                  m = !1;
                  break;
                }
                delete N.width, delete N.height, N.transform === "none" && delete N.transform;
              }
              m && et !== void 0 && y !== void 0 && (Q.setKeyframes(x), m = getComputedStyle(
                Q.target,
                Q.pseudoElement
              ), m.width !== et || m.height !== y) && (m = x[0], m.width = et, m.height = y, m = x[x.length - 1], m.width = et, m.height = y, Q.setKeyframes(x));
            }
          }
          i();
        },
        function(h) {
          g.__reactViewTransition === E && (g.__reactViewTransition = null);
          try {
            typeof h == "object" && h !== null && h.name === "InvalidStateError" && (h.message === "View transition was skipped because document visibility state is hidden." || h.message === "Skipping view transition because document visibility state has become hidden." || h.message === "Skipping view transition because viewport size changed." || h.message === "Transition was aborted because of invalid state") && (h = null), h !== null && r(h);
          } finally {
            a(), u(), i();
          }
        }
      ), E.finished.finally(function() {
        for (var h = 0; h < O.length; h++)
          O[h].cancel();
        g.__reactViewTransition === E && (g.__reactViewTransition = null), c();
      }), E;
    } catch {
      return a(), u(), i(), null;
    }
  }
  function Ha(t, l) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + t + "(" + l + ")";
  }
  Ha.prototype.animate = function(t, l) {
    return l = typeof l == "number" ? { duration: l } : I({}, l), l.pseudoElement = this._selector, this._scope.animate(t, l);
  }, Ha.prototype.getAnimations = function() {
    for (var t = this._scope, l = this._selector, e = t.getAnimations({ subtree: !0 }), a = [], u = 0; u < e.length; u++) {
      var n = e[u].effect;
      n !== null && n.target === t && n.pseudoElement === l && a.push(e[u]);
    }
    return a;
  }, Ha.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function Gd(t) {
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
      if (Qd(n, t, l, e) === -1) {
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
        }), T(
          this._fragmentFiber.child,
          !1,
          iy,
          t,
          c,
          a
        );
      }
      this._eventListeners = n;
    }
  };
  function iy(t, l, e, a) {
    return ut(t).addEventListener(
      l,
      e,
      a
    ), !1;
  }
  Yl.prototype.removeEventListener = function(t, l, e) {
    var a = this._eventListeners;
    if (a !== null && (l = Qd(
      a,
      t,
      l,
      e
    ), l !== -1)) {
      var u = a[l];
      e = u.attachedListener;
      var n = u.cleanup;
      u = Nu(u.optionsOrUseCapture), T(
        this._fragmentFiber.child,
        !1,
        cy,
        t,
        e,
        u
      ), a.splice(l, 1), n !== null && n();
    }
  };
  function cy(t, l, e, a) {
    return ut(t).removeEventListener(
      l,
      e,
      a
    ), !1;
  }
  function Nu(t) {
    return t != null && typeof t != "boolean" && (t.once === !0 || t.signal instanceof AbortSignal) ? { capture: t.capture, passive: t.passive } : t;
  }
  function Xd(t) {
    return t == null ? "c=0" : typeof t == "boolean" ? "c=" + (t ? "1" : "0") : "c=" + (t.capture ? "1" : "0");
  }
  function Qd(t, l, e, a) {
    if (t.length === 0) return -1;
    a = Xd(a);
    for (var u = 0; u < t.length; u++) {
      var n = t[u];
      if (n.type === l && n.listener === e && Xd(n.optionsOrUseCapture) === a)
        return u;
    }
    return -1;
  }
  Yl.prototype.dispatchEvent = function(t) {
    var l = R(
      this._fragmentFiber
    );
    if (l === null) return !0;
    l = ut(l);
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
    T(
      this._fragmentFiber.child,
      !0,
      Zd,
      t,
      void 0,
      void 0
    );
  };
  function Zd(t, l) {
    return t.tag === 6 ? !1 : (t = ut(t), by(t, l));
  }
  Yl.prototype.focusLast = function(t) {
    var l = [];
    T(
      this._fragmentFiber.child,
      !0,
      Ts,
      l,
      void 0,
      void 0
    );
    for (var e = l.length - 1; 0 <= e && !Zd(l[e], t); e--) ;
  };
  function Ts(t, l) {
    return l.push(t), !1;
  }
  Yl.prototype.blur = function() {
    var t = R(
      this._fragmentFiber
    );
    t !== null && (t = ut(t), t = bn(t).activeElement, t !== null && T(
      this._fragmentFiber.child,
      !1,
      fy,
      t,
      void 0,
      void 0
    ));
  };
  function fy(t, l) {
    return t.tag === 6 ? !1 : (t = ut(t), t === l || t.contains(l) ? (l.blur(), !0) : !1);
  }
  Yl.prototype.observeUsing = function(t) {
    this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(t), T(
      this._fragmentFiber.child,
      !1,
      sy,
      t,
      void 0,
      void 0
    );
  };
  function sy(t, l) {
    return t.tag === 6 || (t = ut(t), l.observe(t)), !1;
  }
  Yl.prototype.unobserveUsing = function(t) {
    var l = this._observers;
    if (l !== null && l.has(t)) {
      l.delete(t), T(
        this._fragmentFiber.child,
        !1,
        oy,
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
  function oy(t, l) {
    return t.tag === 6 || (t = ut(t), l.unobserve(t)), !1;
  }
  var ae = [], Es = !1;
  function ry(t, l, e) {
    ae.push({
      fragmentInstance: t,
      observer: l,
      instance: e
    }), Es || (Es = !0, py(function() {
      Es = !1;
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
    return T(
      this._fragmentFiber.child,
      !1,
      my,
      t,
      void 0,
      void 0
    ), t;
  };
  function my(t, l) {
    if (t.tag === 6) {
      t = t.stateNode;
      var e = t.ownerDocument.createRange();
      e.selectNodeContents(t), l.push.apply(l, e.getClientRects());
    } else
      t = ut(t), l.push.apply(l, t.getClientRects());
    return !1;
  }
  Yl.prototype.getRootNode = function(t) {
    var l = R(
      this._fragmentFiber
    );
    return l === null ? this : ut(l).getRootNode(t);
  }, Yl.prototype.compareDocumentPosition = function(t) {
    var l = R(
      this._fragmentFiber
    );
    if (l === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var e = [];
    T(
      this._fragmentFiber.child,
      !1,
      Ts,
      e,
      void 0,
      void 0
    );
    var a = ut(l);
    if (e.length === 0) {
      if (e = a, it(this._fragmentFiber)) {
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
      return e === t ? u = Node.DOCUMENT_POSITION_CONTAINS : a & Node.DOCUMENT_POSITION_CONTAINED_BY && (e = dt(l)[1], e === null ? u = Node.DOCUMENT_POSITION_PRECEDING : (t = ut(e).compareDocumentPosition(
        t
      ), u = t === 0 || t & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), u |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    l = ut(e[0]), u = ut(e[e.length - 1]);
    var n = it(this._fragmentFiber) ? l.parentElement : a;
    if (n == null)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    a = n.compareDocumentPosition(l) & Node.DOCUMENT_POSITION_CONTAINED_BY, n = n.compareDocumentPosition(u) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var i = l.compareDocumentPosition(t), c = u.compareDocumentPosition(t), r = i & Node.DOCUMENT_POSITION_CONTAINED_BY || c & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return c = a && n && i & Node.DOCUMENT_POSITION_FOLLOWING && c & Node.DOCUMENT_POSITION_PRECEDING, l = a && l === t || n && u === t || r || c ? Node.DOCUMENT_POSITION_CONTAINED_BY : !a && l === t || !n && u === t ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : i, l & Node.DOCUMENT_POSITION_DISCONNECTED || l & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || dy(
      l,
      this._fragmentFiber,
      e[0],
      e[e.length - 1],
      t
    ) ? l : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function dy(t, l, e, a, u) {
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
        for (n = l, l = R(l); n !== null; ) {
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
    return t & Node.DOCUMENT_POSITION_PRECEDING ? ((l = !!n) && !(l = n === e) && (l = Vt(
      e,
      n,
      Yt
    ), l === null ? l = !1 : (T(
      l,
      !0,
      pt,
      n,
      e
    ), n = Ot, Ot = null, l = n !== null)), l) : t & Node.DOCUMENT_POSITION_FOLLOWING ? ((l = !!n) && !(l = n === a) && (l = Vt(
      a,
      n,
      Yt
    ), l === null ? l = !1 : (T(
      l,
      !0,
      Gt,
      n,
      a
    ), n = Ot, ot = Ot = null, l = n !== null)), l) : !1;
  }
  function Vd(t, l) {
    var e = t.ownerDocument.createRange();
    e.selectNodeContents(t), t = e.getBoundingClientRect(), window.scrollTo(
      window.scrollX + t.left,
      l ? window.scrollY + t.top : window.scrollY + t.bottom - window.innerHeight
    );
  }
  Yl.prototype.scrollIntoView = function(t) {
    if (typeof t == "object") throw Error(s(566));
    var l = [];
    T(
      this._fragmentFiber.child,
      !1,
      Ts,
      l,
      void 0,
      void 0
    );
    var e = t !== !1;
    if (l.length === 0) {
      var a = dt(
        this._fragmentFiber
      );
      if (a = e ? a[1] || a[0] || R(this._fragmentFiber) : a[0] || a[1], a === null) return;
      if (a.tag === 6) {
        t = ut(a), Vd(t, e);
        return;
      }
      if (a = ut(a), a.nodeType !== 9) {
        if (a.nodeType === 11) {
          e = "host" in a ? a.host : null, e !== null && e.scrollIntoView(t);
          return;
        }
        a.scrollIntoView(t);
      }
    }
    for (a = e ? l.length - 1 : 0; a !== (e ? -1 : l.length); ) {
      var u = l[a];
      u.tag === 6 ? (u = ut(u), Vd(u, e)) : ut(u).scrollIntoView(t), a += e ? -1 : 1;
    }
  };
  function vy(t, l) {
    return t = ut(t), wd(t, l), !1;
  }
  function wd(t, l) {
    t.reactFragments == null && (t.reactFragments = /* @__PURE__ */ new Set()), t.reactFragments.add(l);
  }
  function Kd(t, l) {
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
    }), wd(t, l));
  }
  function hy(t, l) {
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
      typeof n.rootMargin == "string" ? ry(
        l,
        n,
        t
      ) : n.unobserve(t);
    }), t.reactFragments != null && t.reactFragments.delete(l));
  }
  function _s(t) {
    var l = t.firstChild;
    for (l && l.nodeType === 10 && (l = l.nextSibling); l; ) {
      var e = l;
      switch (l = l.nextSibling, e.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          _s(e), qn(e);
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
  function yy(t, l, e, a) {
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
  function gy(t, l, e) {
    if (l === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = Jl(t.nextSibling), t === null)) return null;
    return t;
  }
  function Jd(t, l) {
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
  function Sy(t, l) {
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
  function $d(t) {
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
  function Fd(t) {
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
  function by(t, l) {
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
  function py(t) {
    Hd(function() {
      Hd(function(l) {
        return t(l);
      });
    });
  }
  function Wd(t, l, e) {
    switch (l = bn(e), t) {
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
  function kd(t, l, e) {
    for (var a in e) {
      var u = e[a];
      e.hasOwnProperty(a) && u != null && Ut(t, l, a, null, Fh, u);
    }
    e.dangerouslySetInnerHTML != null && (t.textContent = ""), t.onclick === ce && (t.onclick = null), qn(t);
  }
  function As(t) {
    for (var l = t.attributes; l.length; )
      t.removeAttributeNode(l[0]);
    qn(t);
  }
  var $l = /* @__PURE__ */ new Map(), Id = /* @__PURE__ */ new Set();
  function pn(t) {
    if (typeof t.getRootNode == "function") {
      var l = t.getRootNode();
      if (l.nodeType === 9 || l.nodeType === 11) return l;
    }
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  var xe = F.d;
  F.d = {
    f: Ty,
    r: Ey,
    D: _y,
    C: Ny,
    L: zy,
    m: Oy,
    X: My,
    S: Ay,
    M: Dy
  };
  function Ty() {
    var t = xe.f(), l = Gi();
    return t || l;
  }
  function Ey(t) {
    var l = Za(t);
    l !== null && l.tag === 5 && l.type === "form" ? tm(l) : xe.r(t);
  }
  var zu = typeof document > "u" ? null : document;
  function Pd(t, l, e) {
    var a = zu;
    if (a && typeof l == "string" && l) {
      var u = Gl(l);
      u = 'link[rel="' + t + '"][href="' + u + '"]', typeof e == "string" && (u += '[crossorigin="' + e + '"]'), Id.has(u) || (Id.add(u), t = { rel: t, crossOrigin: e, href: l }, a.querySelector(u) === null && (l = a.createElement("link"), cl(l, "link", t), It(l), a.head.appendChild(l)));
    }
  }
  function _y(t) {
    xe.D(t), Pd("dns-prefetch", t, null);
  }
  function Ny(t, l) {
    xe.C(t, l), Pd("preconnect", t, l);
  }
  function zy(t, l, e) {
    xe.L(t, l, e);
    var a = zu;
    if (a && t && l) {
      var u = 'link[rel="preload"][as="' + Gl(l) + '"]';
      l === "image" && e && e.imageSrcSet ? (u += '[imagesrcset="' + Gl(
        e.imageSrcSet
      ) + '"]', typeof e.imageSizes == "string" && (u += '[imagesizes="' + Gl(
        e.imageSizes
      ) + '"]')) : u += '[href="' + Gl(t) + '"]';
      var n = u;
      switch (l) {
        case "style":
          n = Ou(t);
          break;
        case "script":
          n = Au(t);
      }
      if (!($l.has(n) || (t = I(
        {
          rel: "preload",
          href: l === "image" && e && e.imageSrcSet ? void 0 : t,
          as: l
        },
        e
      ), $l.set(n, t), a.querySelector(u) !== null || l === "style" && a.querySelector(Tn(n)) || l === "script" && a.querySelector(En(n))))) {
        var i = a.createElement("link");
        cl(i, "link", t), l === "style" && (i[Bn] = !0, i.onload = i.onerror = function() {
          ro(i);
        }), It(i), a.head.appendChild(i);
      }
    }
  }
  function Oy(t, l) {
    xe.m(t, l);
    var e = zu;
    if (e && t) {
      var a = l && typeof l.as == "string" ? l.as : "script", u = 'link[rel="modulepreload"][as="' + Gl(a) + '"][href="' + Gl(t) + '"]', n = u;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          n = Au(t);
      }
      if (!$l.has(n) && (t = I({ rel: "modulepreload", href: t }, l), $l.set(n, t), e.querySelector(u) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (e.querySelector(En(n)))
              return;
        }
        a = e.createElement("link"), cl(a, "link", t), It(a), e.head.appendChild(a);
      }
    }
  }
  function Ay(t, l, e) {
    xe.S(t, l, e);
    var a = zu;
    if (a && t) {
      var u = Va(a).hoistableStyles, n = Ou(t);
      l = l || "default";
      var i = u.get(n);
      if (!i) {
        var c = { loading: 0, preload: null };
        if (i = a.querySelector(
          Tn(n)
        ))
          c.loading = 5;
        else {
          t = I(
            { rel: "stylesheet", href: t, "data-precedence": l },
            e
          ), (e = $l.get(n)) && Ms(t, e);
          var r = i = a.createElement("link");
          It(r), cl(r, "link", t), r._p = new Promise(function(g, E) {
            r.onload = g, r.onerror = E;
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
  function My(t, l) {
    xe.X(t, l);
    var e = zu;
    if (e && t) {
      var a = Va(e).hoistableScripts, u = Au(t), n = a.get(u);
      n || (n = e.querySelector(En(u)), n || (t = I({ src: t, async: !0 }, l), (l = $l.get(u)) && Ds(t, l), n = e.createElement("script"), It(n), cl(n, "link", t), e.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, a.set(u, n));
    }
  }
  function Dy(t, l) {
    xe.M(t, l);
    var e = zu;
    if (e && t) {
      var a = Va(e).hoistableScripts, u = Au(t), n = a.get(u);
      n || (n = e.querySelector(En(u)), n || (t = I({ src: t, async: !0, type: "module" }, l), (l = $l.get(u)) && Ds(t, l), n = e.createElement("script"), It(n), cl(n, "link", t), e.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, a.set(u, n));
    }
  }
  function t0(t, l, e, a) {
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
            Tn(t)
          )) ? n._p || (i.instance = n, i.state.loading = 5) : (n = $l.get(t), n || (n = {
            rel: "preload",
            as: "style",
            href: e.href,
            crossOrigin: e.crossOrigin,
            integrity: e.integrity,
            media: e.media,
            hrefLang: e.hrefLang,
            referrerPolicy: e.referrerPolicy
          }, $l.set(t, n)), Cy(
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
        return l = e.async, e = e.src, typeof e == "string" && l && typeof l != "function" && typeof l != "symbol" ? (e = Au(e), l = Va(
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
    return 'href="' + Gl(t) + '"';
  }
  function Tn(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function l0(t) {
    return I({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function Cy(t, l, e, a) {
    if (l = t.querySelector(
      'link[rel="preload"][as="style"][' + l + "]"
    )) {
      if (l[Bn] !== !0) {
        a.loading = 1;
        return;
      }
    } else
      l = t.createElement("link"), l[Bn] = !0, l.onload = l.onerror = ro.bind(null, l), cl(l, "link", e), It(l), t.head.appendChild(l);
    a.preload = l, l.addEventListener("load", function() {
      return a.loading |= 1;
    }), l.addEventListener("error", function() {
      return a.loading |= 2;
    });
  }
  function Au(t) {
    return '[src="' + Gl(t) + '"]';
  }
  function En(t) {
    return "script[async]" + t;
  }
  function e0(t, l, e) {
    if (l.count++, l.instance === null)
      switch (l.type) {
        case "style":
          var a = t.querySelector(
            'style[data-href~="' + Gl(e.href) + '"]'
          );
          if (a)
            return l.instance = a, It(a), a;
          var u = I({}, e, {
            "data-href": e.href,
            "data-precedence": e.precedence,
            href: null,
            precedence: null
          });
          return a = (t.ownerDocument || t).createElement(
            "style"
          ), It(a), cl(a, "style", u), Ji(a, e.precedence, t), l.instance = a;
        case "stylesheet":
          u = Ou(e.href);
          var n = t.querySelector(
            Tn(u)
          );
          if (n)
            return l.state.loading |= 4, l.instance = n, It(n), n;
          a = l0(e), (u = $l.get(u)) && Ms(a, u), n = (t.ownerDocument || t).createElement("link"), It(n);
          var i = n;
          return i._p = new Promise(function(c, r) {
            i.onload = c, i.onerror = r;
          }), cl(n, "link", a), l.state.loading |= 4, Ji(n, e.precedence, t), l.instance = n;
        case "script":
          return n = Au(e.src), (u = t.querySelector(
            En(n)
          )) ? (l.instance = u, It(u), u) : (a = e, (u = $l.get(n)) && (a = I({}, e), Ds(a, u)), t = t.ownerDocument || t, u = t.createElement("script"), It(u), cl(u, "link", a), t.head.appendChild(u), l.instance = u);
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
  function Ms(t, l) {
    t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.title == null && (t.title = l.title);
  }
  function Ds(t, l) {
    t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.integrity == null && (t.integrity = l.integrity);
  }
  var $i = null;
  function a0(t, l, e) {
    if ($i === null) {
      var a = /* @__PURE__ */ new Map(), u = $i = /* @__PURE__ */ new Map();
      u.set(e, a);
    } else
      u = $i, a = u.get(e), a || (a = /* @__PURE__ */ new Map(), u.set(e, a));
    if (a.has(t)) return a;
    for (a.set(t, null), e = e.getElementsByTagName(t), u = 0; u < e.length; u++) {
      var n = e[u];
      if (!(n[Bu] || n[el] || t === "link" && n.getAttribute("rel") === "stylesheet") && n.namespaceURI !== "http://www.w3.org/2000/svg") {
        var i = n.getAttribute(l) || "";
        i = t + i;
        var c = a.get(i);
        c ? c.push(n) : a.set(i, [n]);
      }
    }
    return a;
  }
  function Cs(t, l, e) {
    t = t.ownerDocument || t, t.head.insertBefore(
      e,
      l === "title" ? t.querySelector("head > title") : null
    );
  }
  function Uy(t, l, e) {
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
  function u0(t, l) {
    return t === "img" && l.src != null && l.src !== "" && l.onLoad == null && l.loading !== "lazy";
  }
  function n0(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function i0(t) {
    return (t.width || 100) * (t.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
  }
  function c0(t, l) {
    typeof l.decode == "function" && (t.imgCount++, l.complete || (t.imgBytes += i0(l), t.suspenseyImages.push(l)), t = jy.bind(t), l.decode().then(t, t));
  }
  function Ry(t, l, e, a) {
    if (e.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (e.state.loading & 4) === 0) {
      if (e.instance === null) {
        var u = Ou(a.href), n = l.querySelector(
          Tn(u)
        );
        if (n) {
          l = n._p, l !== null && typeof l == "object" && typeof l.then == "function" && (t.count++, t = _n.bind(t), l.then(t, t)), e.state.loading |= 4, e.instance = n, It(n);
          return;
        }
        n = l.ownerDocument || l, a = l0(a), (u = $l.get(u)) && Ms(a, u), n = n.createElement("link"), It(n);
        var i = n;
        i._p = new Promise(function(c, r) {
          i.onload = c, i.onerror = r;
        }), cl(n, "link", a), e.instance = n;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(e, l), (l = e.state.preload) && (e.state.loading & 3) === 0 && (t.count++, e = _n.bind(t), l.addEventListener("load", e), l.addEventListener("error", e));
    }
  }
  var Fi = 0;
  function xy(t, l) {
    return t.stylesheets && t.count === 0 && ki(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(e) {
      var a = setTimeout(function() {
        if (t.stylesheets && ki(t, t.stylesheets), t.unsuspend) {
          var n = t.unsuspend;
          t.unsuspend = null, n();
        }
      }, 6e4 + l);
      0 < t.imgBytes && Fi === 0 && (Fi = 62500 * kh());
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
  function f0(t) {
    if (t.count === 0 && (t.imgCount === 0 || !t.waitingForImages)) {
      if (t.stylesheets) ki(t, t.stylesheets);
      else if (t.unsuspend) {
        var l = t.unsuspend;
        t.unsuspend = null, l();
      }
    }
  }
  function _n() {
    this.count--, f0(this);
  }
  function jy() {
    this.imgCount--, f0(this);
  }
  var Wi = null;
  function ki(t, l) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, Wi = /* @__PURE__ */ new Map(), l.forEach(Hy, t), Wi = null, _n.call(t));
  }
  function Hy(t, l) {
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
      u = l.instance, i = u.getAttribute("data-precedence"), n = e.get(i) || a, n === a && e.set(null, u), e.set(i, u), this.count++, a = _n.bind(this), u.addEventListener("load", a), u.addEventListener("error", a), n ? n.parentNode.insertBefore(u, n.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(u, t.firstChild)), l.state.loading |= 4;
    }
  }
  var Mu = {
    $$typeof: bt,
    Provider: null,
    Consumer: null,
    _currentValue: Ll,
    _currentValue2: Ll,
    _threadCount: 0
  };
  function By(t, l, e, a, u, n, i, c, r) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = sc(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = sc(0), this.hiddenUpdates = sc(null), this.identifierPrefix = a, this.onUncaughtError = u, this.onCaughtError = n, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = r, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function s0(t, l, e, a, u, n, i, c, r, g, E, O) {
    return t = new By(
      t,
      l,
      e,
      i,
      r,
      g,
      E,
      O,
      c
    ), l = 1, n === !0 && (l |= 24), n = El(3, null, null, l), t.current = n, n.stateNode = t, l = Vc(), l.refCount++, t.pooledCache = l, l.refCount++, n.memoizedState = {
      element: a,
      isDehydrated: e,
      cache: l
    }, $c(n), t;
  }
  function o0(t) {
    return t ? (t = tu, t) : tu;
  }
  function r0(t, l, e, a, u, n) {
    u = o0(u), a.context === null ? a.context = u : a.pendingContext = u, a = we(l), a.payload = { element: e }, n = n === void 0 ? null : n, n !== null && (a.callback = n), e = Ke(t, a, l), e !== null && (Ol(e, t, l), Pu(e, t, l));
  }
  function m0(t, l) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var e = t.retryLane;
      t.retryLane = e !== 0 && e < l ? e : l;
    }
  }
  function Us(t, l) {
    m0(t, l), (t = t.alternate) && m0(t, l);
  }
  function d0(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = Sa(t, 67108864);
      l !== null && Ol(l, t, 67108864), Us(t, 67108864);
    }
  }
  function v0(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = ql();
      l = oc(l);
      var e = Sa(t, l);
      e !== null && Ol(e, t, l), Us(t, l);
    }
  }
  var Du = !0;
  function qy(t, l, e, a) {
    var u = L.T;
    L.T = null;
    var n = F.p;
    try {
      F.p = 2, Rs(t, l, e, a);
    } finally {
      F.p = n, L.T = u;
    }
  }
  function Yy(t, l, e, a) {
    var u = L.T;
    L.T = null;
    var n = F.p;
    try {
      F.p = 8, Rs(t, l, e, a);
    } finally {
      F.p = n, L.T = u;
    }
  }
  function Rs(t, l, e, a) {
    if (Du) {
      var u = xs(a);
      if (u === null)
        ds(
          t,
          l,
          a,
          Ii,
          e
        ), y0(t, a);
      else if (Gy(
        u,
        t,
        l,
        e,
        a
      ))
        a.stopPropagation();
      else if (y0(t, a), l & 4 && -1 < Ly.indexOf(t)) {
        for (; u !== null; ) {
          var n = Za(u);
          if (n !== null)
            switch (n.tag) {
              case 3:
                if (n = n.stateNode, n.current.memoizedState.isDehydrated) {
                  var i = da(n.pendingLanes);
                  if (i !== 0) {
                    var c = n;
                    for (c.pendingLanes |= 2, c.entangledLanes |= 2; i; ) {
                      var r = 1 << 31 - Cl(i);
                      c.entanglements[1] |= r, i &= ~r;
                    }
                    ge(n), (zt & 6) === 0 && (qi = Ml() + 500, yn(0));
                  }
                }
                break;
              case 31:
              case 13:
                c = Sa(n, 2), c !== null && Ol(c, n, 2), Gi(), Us(n, 2);
            }
          if (n = xs(a), n === null && ds(
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
        ds(
          t,
          l,
          a,
          null,
          e
        );
    }
  }
  function xs(t) {
    return t = gc(t), js(t);
  }
  var Ii = null;
  function js(t) {
    if (Ii = null, t = va(t), t !== null) {
      var l = S(t);
      if (l === null) t = null;
      else {
        var e = l.tag;
        if (e === 13) {
          if (t = M(l), t !== null) return t;
          t = null;
        } else if (e === 31) {
          if (t = C(l), t !== null) return t;
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
  function h0(t) {
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
        switch (k0()) {
          case Ps:
            return 2;
          case to:
            return 8;
          case Un:
          case I0:
            return 32;
          case lo:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Hs = !1, ua = null, na = null, ia = null, Nn = /* @__PURE__ */ new Map(), zn = /* @__PURE__ */ new Map(), ca = [], Ly = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function y0(t, l) {
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
    }, l !== null && (l = Za(l), l !== null && d0(l)), t) : (t.eventSystemFlags |= a, l = t.targetContainers, u !== null && l.indexOf(u) === -1 && l.push(u), t);
  }
  function Gy(t, l, e, a, u) {
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
  function g0(t) {
    var l = va(t.target);
    if (l !== null) {
      var e = S(l);
      if (e !== null) {
        if (l = e.tag, l === 13) {
          if (l = M(e), l !== null) {
            t.blockedOn = l, fo(t.priority, function() {
              v0(e);
            });
            return;
          }
        } else if (l === 31) {
          if (l = C(e), l !== null) {
            t.blockedOn = l, fo(t.priority, function() {
              v0(e);
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
      var e = xs(t.nativeEvent);
      if (e === null) {
        e = t.nativeEvent;
        var a = new e.constructor(
          e.type,
          e
        );
        yc = a, e.target.dispatchEvent(a), yc = null;
      } else
        return l = Za(e), l !== null && d0(l), t.blockedOn = e, !1;
      l.shift();
    }
    return !0;
  }
  function S0(t, l, e) {
    Pi(t) && e.delete(l);
  }
  function Xy() {
    Hs = !1, ua !== null && Pi(ua) && (ua = null), na !== null && Pi(na) && (na = null), ia !== null && Pi(ia) && (ia = null), Nn.forEach(S0), zn.forEach(S0);
  }
  function tc(t, l) {
    t.blockedOn === l && (t.blockedOn = null, Hs || (Hs = !0, f.unstable_scheduleCallback(
      f.unstable_NormalPriority,
      Xy
    )));
  }
  var lc = null;
  function b0(t) {
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
  function Cu(t) {
    function l(r) {
      return tc(r, t);
    }
    ua !== null && tc(ua, t), na !== null && tc(na, t), ia !== null && tc(ia, t), Nn.forEach(l), zn.forEach(l);
    for (var e = 0; e < ca.length; e++) {
      var a = ca[e];
      a.blockedOn === t && (a.blockedOn = null);
    }
    for (; 0 < ca.length && (e = ca[0], e.blockedOn === null); )
      g0(e), e.blockedOn === null && ca.shift();
    if (e = (t.ownerDocument || t).$$reactFormReplay, e != null)
      for (a = 0; a < e.length; a += 3) {
        var u = e[a], n = e[a + 1], i = u[Tl] || null;
        if (typeof n == "function")
          i || b0(e);
        else if (i) {
          var c = null;
          if (n && n.hasAttribute("formAction")) {
            if (u = n, i = n[Tl] || null)
              c = i.formAction;
            else if (js(u) !== null) continue;
          } else c = i.action;
          typeof c == "function" ? e[a + 1] = c : (e.splice(a, 3), a -= 3), b0(e);
        }
      }
  }
  function p0() {
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
    r0(e, a, t, l, null, null);
  }, ec.prototype.unmount = Bs.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var l = t.containerInfo;
      r0(t.current, 2, null, t, null, null), Gi(), l[Qa] = null;
    }
  };
  function ec(t) {
    this._internalRoot = t;
  }
  ec.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var l = co();
      t = { blockedOn: null, target: t, priority: l };
      for (var e = 0; e < ca.length && l !== 0 && l < ca[e].priority; e++) ;
      ca.splice(e, 0, t), e === 0 && g0(t);
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
    return t = Z(l), t = t !== null ? j(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var Qy = {
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
        xu = ac.inject(
          Qy
        ), Dl = ac;
      } catch {
      }
  }
  return Mn.createRoot = function(t, l) {
    if (!A(t)) throw Error(s(299));
    var e = !1, a = "", u = om, n = rm, i = mm;
    return l != null && (l.unstable_strictMode === !0 && (e = !0), l.identifierPrefix !== void 0 && (a = l.identifierPrefix), l.onUncaughtError !== void 0 && (u = l.onUncaughtError), l.onCaughtError !== void 0 && (n = l.onCaughtError), l.onRecoverableError !== void 0 && (i = l.onRecoverableError)), l = s0(
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
      p0
    ), t[Qa] = l.current, ms(t), new Bs(l);
  }, Mn.hydrateRoot = function(t, l, e) {
    if (!A(t)) throw Error(s(299));
    var a = !1, u = "", n = om, i = rm, c = mm, r = null;
    return e != null && (e.unstable_strictMode === !0 && (a = !0), e.identifierPrefix !== void 0 && (u = e.identifierPrefix), e.onUncaughtError !== void 0 && (n = e.onUncaughtError), e.onCaughtError !== void 0 && (i = e.onCaughtError), e.onRecoverableError !== void 0 && (c = e.onRecoverableError), e.formState !== void 0 && (r = e.formState)), l = s0(
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
      p0
    ), l.context = o0(null), e = l.current, a = ql(), a = oc(a), u = we(a), u.callback = null, Ke(e, u, a), e = a, l.current.lanes = e, Hu(l, e), ge(l), t[Qa] = l.current, ms(t), new ec(l);
  }, Mn.version = "19.3.0", Mn;
}
var U0;
function Iy() {
  if (U0) return Ls.exports;
  U0 = 1;
  function f() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
      } catch (v) {
        console.error(v);
      }
  }
  return f(), Ls.exports = ky(), Ls.exports;
}
var Py = Iy();
const j0 = 128, H0 = 640;
function Dn(f, v = 144) {
  return Math.max(j0, Math.min(
    H0,
    Number.isFinite(f) ? Math.round(f) : v
  ));
}
function B0(f, v, o) {
  return v ? o ? f : "waveform" : "spectrogram";
}
function tg(f, v, o) {
  return Number.isFinite(f) ? f * (v === 1 ? 16 : v === 2 ? o : 1) : 0;
}
function lg(f, v) {
  return Math.max(0, Math.min(100, f - Math.max(-240, Math.min(240, v)) * 0.08));
}
function eg(f, v) {
  return Dn(f * Math.exp(-Math.max(-240, Math.min(240, v)) * 2e-3));
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
function ag(f, v = 0) {
  const o = /* @__PURE__ */ new Set();
  return f.filter((s) => {
    try {
      const A = Ya(s);
      return o.has(s.id) || v > 0 && A.end > v + 0.02 ? !1 : (o.add(s.id), !0);
    } catch {
      return !1;
    }
  });
}
function q0(f, v, o) {
  const s = o - v;
  return !Number.isFinite(f) || s <= 0 ? v : v + ((f - v) % s + s) % s;
}
class ug {
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
  async play(v, o, s, A = "same-origin") {
    const S = Ya(v);
    this.pause();
    const M = this.generation;
    this.context ??= this.createContext();
    const C = this.context, H = C.resume();
    H.catch(() => {
    });
    const Z = v.audioSrc || o, j = JSON.stringify([Z, v.startSample, v.endSample, v.sampleRate]);
    try {
      let T = this.cache?.url === j ? this.cache.buffer : null;
      if (!T) {
        const ut = new AbortController();
        this.abort = ut;
        const Ot = await fetch(Z, { signal: ut.signal, credentials: A });
        if (!Ot.ok) throw new Error(`Could not load loop audio (HTTP ${Ot.status})`);
        const ot = 128 * 1024 * 1024;
        if (Number(Ot.headers.get("Content-Length")) > ot) throw new Error("Loop audio exceeds 128 MiB");
        const pt = await Ot.arrayBuffer();
        if (pt.byteLength > ot) throw new Error("Loop audio exceeds 128 MiB");
        if (T = await C.decodeAudioData(pt), M !== this.generation) return !1;
        this.cache = { url: j, buffer: T };
      }
      if (await H, M !== this.generation) return !1;
      const R = v.audioSrc ? 0 : S.start, it = R + S.duration, dt = Math.max(2 / T.sampleRate, 2e-3);
      if (!Number.isFinite(T.duration) || T.duration <= R || it > T.duration + dt || v.audioSrc && Math.abs(T.duration - S.duration) > dt)
        throw new Error("Loop audio duration does not match the reported sample boundaries");
      const ct = C.createBufferSource();
      return ct.buffer = T, ct.loop = !0, ct.loopStart = R, ct.loopEnd = Math.min(it, T.duration), ct.connect(C.destination), this.start = S.start, this.length = ct.loopEnd - R, this.offset = q0(s, S.start, S.start + this.length) - S.start, this.anchor = C.currentTime, ct.start(this.anchor, R + this.offset), this.node = ct, !0;
    } catch (T) {
      if (M !== this.generation) return !1;
      throw T;
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
  const v = Math.max(0, Number(f) || 0), o = Math.floor(v / 60), s = Math.floor(v % 60), A = Math.floor((v - Math.floor(v)) * 1e3);
  return `${String(o).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(A).padStart(3, "0")}`;
}
function Y0(f) {
  const v = [0.1, 0.25, 0.5, 1, 2, 5, 10, 15, 30, 60, 120, 300, 600];
  return v.find((o) => o * f >= 70) ?? v[v.length - 1];
}
function ng(f, v, o, s, A) {
  if (A <= 0 || s <= 0) return { start: 0, end: 0 };
  const S = Math.max(0, f - o), M = Math.max(0, f + v - o), C = sa(S / s, 0, A), H = sa(M / s, C, A);
  return { start: C, end: H };
}
function ws(f, v) {
  return `${sa(f / Math.max(v, 1e-9), 0, 1) * 100}%`;
}
function L0(f, v, o, s = 0.08) {
  const A = Number.isFinite(v) && Number(v) > f ? Number(v) : f + 0.5;
  return `${Math.max(s, (A - f) / Math.max(o, 1e-9) * 100)}%`;
}
function ig({ min: f, max: v, colour: o = "#79c0ff" }) {
  const s = G.useRef(null);
  return G.useEffect(() => {
    const A = s.current;
    if (!A) return;
    const S = Math.max(1, Math.min(f.length, v.length));
    A.width = S, A.height = 180;
    const M = A.getContext("2d");
    if (!M) return;
    M.clearRect(0, 0, S, A.height), M.strokeStyle = o, M.lineWidth = 1, M.beginPath();
    const C = A.height / 2, H = A.height * 0.46;
    for (let Z = 0; Z < S; Z += 1) {
      const j = Z + 0.5;
      M.moveTo(j, C - (Number(v[Z]) || 0) * H), M.lineTo(j, C - (Number(f[Z]) || 0) * H);
    }
    M.stroke();
  }, [o, v, f]), /* @__PURE__ */ z.jsx("canvas", { ref: s, className: "rts-waveform", "aria-hidden": "true" });
}
function cg({ rows: f }) {
  const v = G.useRef(null);
  return G.useEffect(() => {
    const o = v.current, s = f.filter((C) => C.length > 0);
    if (!o || !s.length) return;
    const A = Math.max(...s.map((C) => C.length));
    o.width = Math.min(4096, s.length), o.height = Math.min(256, A);
    const S = o.getContext("2d");
    if (!S) return;
    const M = S.createImageData(o.width, o.height);
    for (let C = 0; C < o.width; C += 1) {
      const H = Math.min(s.length - 1, Math.floor(C * s.length / o.width)), Z = s[H], j = Math.max(1e-9, ...Z.map((T) => Number(T) || 0));
      for (let T = 0; T < o.height; T += 1) {
        const R = Math.min(Z.length - 1, Math.floor((o.height - 1 - T) * Z.length / o.height)), it = sa((Number(Z[R]) || 0) / j, 0, 1), dt = (T * o.width + C) * 4;
        M.data[dt] = Math.round(40 + 180 * it), M.data[dt + 1] = Math.round(35 + 110 * it), M.data[dt + 2] = Math.round(80 + 170 * it), M.data[dt + 3] = 255;
      }
    }
    S.putImageData(M, 0, 0);
  }, [f]), /* @__PURE__ */ z.jsx("canvas", { ref: v, className: "rts-matrix", "aria-hidden": "true" });
}
function fg({ items: f, duration: v }) {
  const o = f.filter((S) => Number.isFinite(S.value) && S.value > 0);
  if (!o.length) return null;
  const s = Math.log2(Math.max(20, Math.min(...o.map((S) => S.value)))), A = Math.log2(Math.max(100, ...o.map((S) => S.value)));
  return o.map((S, M) => {
    const C = (Math.log2(S.value) - s) / Math.max(0.01, A - s);
    return /* @__PURE__ */ z.jsx(
      "span",
      {
        className: `rts-note ${S.className ?? ""}`,
        style: { left: ws(S.start, v), width: L0(S.start, S.end ?? S.start + 0.12, v, 0.04), top: `${8 + (1 - C) * 72}px` },
        title: S.title ?? `${S.label ?? `${S.value.toFixed(1)} Hz`} · ${qa(S.start)}`
      },
      `${S.start}-${M}`
    );
  });
}
function Ks({ content: f, duration: v }) {
  switch (f.type) {
    case "waveform":
      return /* @__PURE__ */ z.jsx(ig, { ...f });
    case "image":
      return /* @__PURE__ */ z.jsx("img", { className: `rts-image ${f.className ?? ""}`, src: f.src, alt: f.alt });
    case "markers":
      return /* @__PURE__ */ z.jsx(z.Fragment, { children: f.items.map((o, s) => /* @__PURE__ */ z.jsx(
        "span",
        {
          className: `rts-marker ${o.emphasis ? "rts-marker-emphasis" : ""} ${o.className ?? ""}`,
          style: { left: ws(o.time, v) },
          title: o.label
        },
        `${o.time}-${s}`
      )) });
    case "blocks":
      return /* @__PURE__ */ z.jsx(z.Fragment, { children: f.items.map((o, s) => /* @__PURE__ */ z.jsx(
        "span",
        {
          className: `rts-block ${o.className ?? ""}`,
          style: { left: ws(o.start, v), width: L0(o.start, o.end, v) },
          title: o.title ?? `${o.label ?? ""} · ${qa(o.start)}${o.end ? ` — ${qa(o.end)}` : ""}`,
          children: o.label
        },
        `${o.start}-${s}`
      )) });
    case "notes":
      return /* @__PURE__ */ z.jsx(fg, { items: f.items, duration: v });
    case "curve": {
      const o = f.points.filter((C) => Number.isFinite(C.time) && Number.isFinite(C.value));
      if (!o.length) return null;
      const s = o.map((C) => C.value), A = Math.min(...s), S = Math.max(...s), M = o.map((C) => {
        const H = C.time / Math.max(v, 1e-9) * 2e3, Z = 180 - (C.value - A) / Math.max(1e-9, S - A) * 168 - 6;
        return `${H.toFixed(2)},${Z.toFixed(2)}`;
      }).join(" ");
      return /* @__PURE__ */ z.jsx("svg", { className: "rts-curve", viewBox: "0 0 2000 180", preserveAspectRatio: "none", "aria-hidden": "true", children: /* @__PURE__ */ z.jsx("polyline", { fill: "none", stroke: f.colour ?? "#7ee787", strokeWidth: "2", vectorEffect: "non-scaling-stroke", points: M }) });
    }
    case "matrix":
      return /* @__PURE__ */ z.jsx(cg, { ...f });
    case "summary":
      return /* @__PURE__ */ z.jsx("div", { className: "rts-summary", children: f.items.map((o, s) => /* @__PURE__ */ z.jsxs("span", { className: "rts-summary-item", children: [
        /* @__PURE__ */ z.jsxs("strong", { children: [
          o.label,
          ": "
        ] }),
        o.value
      ] }, `${o.label}-${s}`)) });
    case "artifact":
      return /* @__PURE__ */ z.jsxs("div", { className: "rts-artifact", children: [
        /* @__PURE__ */ z.jsx("span", { children: f.note }),
        f.href && /* @__PURE__ */ z.jsx("a", { href: f.href, target: "_blank", rel: "noopener noreferrer", children: f.linkLabel ?? "open" })
      ] });
    case "text":
      return /* @__PURE__ */ z.jsx("div", { className: "rts-text", children: f.text });
    case "custom":
      return /* @__PURE__ */ z.jsx(z.Fragment, { children: f.node });
  }
}
function sg({ content: f, duration: v, view: o }) {
  const s = B0(o, !!f.waveform, !!f.spectrogram);
  return /* @__PURE__ */ z.jsxs("div", { className: `rts-audio-layers rts-audio-${s}`, "data-audio-view": s, children: [
    f.spectrogram && s !== "waveform" && /* @__PURE__ */ z.jsx("div", { className: "rts-audio-spectrum", children: /* @__PURE__ */ z.jsx(Ks, { content: { type: "image", ...f.spectrogram }, duration: v }) }),
    f.waveform && s !== "spectrogram" && /* @__PURE__ */ z.jsx("div", { className: "rts-audio-envelope", children: /* @__PURE__ */ z.jsx(Ks, { content: { type: "waveform", ...f.waveform, colour: s === "both" ? "#e6fff7" : f.waveform.colour }, duration: v }) }),
    !f.waveform && !f.spectrogram && /* @__PURE__ */ z.jsx("span", { className: "rts-meta", children: "Waiting for audio analysis" })
  ] });
}
function og(f, v, o, s, A = "same-origin") {
  const [S, M] = G.useState(0), [C, H] = G.useState(!1), [Z, j] = G.useState(!1), [T, R] = G.useState(""), it = G.useRef(!1), dt = G.useRef("media"), ct = G.useRef(null), ut = G.useRef(0), Ot = G.useRef({ audioSrc: v, activeLoop: o, onError: s, credentials: A });
  Ot.current = { audioSrc: v, activeLoop: o, onError: s, credentials: A };
  const ot = G.useCallback(() => dt.current === "loop" ? ct.current?.currentTime ?? 0 : f.current?.currentTime ?? 0, [f]), pt = G.useCallback(() => {
    const B = ot();
    return ut.current += 1, it.current = !1, ct.current?.pause(), f.current?.pause(), j(!1), H(!1), M(B), B;
  }, [f, ot]), Gt = G.useCallback((B) => {
    pt(), R(B instanceof Error ? B.message : String(B)), Ot.current.onError?.(B);
  }, [pt]), Yt = G.useCallback(async (B) => {
    pt();
    const q = ut.current;
    it.current = !0, j(!0), R("");
    const { activeLoop: X, audioSrc: Bt, credentials: dl } = Ot.current;
    try {
      if (X) {
        if (dt.current = "loop", ct.current ??= new ug(), !await ct.current.play(X, Bt, B, dl)) return;
      } else {
        dt.current = "media";
        const bt = f.current;
        if (!bt) return;
        bt.currentTime = Math.max(0, B), await bt.play();
      }
      if (q !== ut.current) return;
      M(ot()), j(!1), H(!0);
    } catch (bt) {
      q === ut.current && Gt(bt);
    }
  }, [f, Gt, pt, ot]), Vt = G.useCallback((B) => {
    const q = Ot.current.activeLoop;
    if (q) {
      const X = Ya(q);
      B = q0(B, X.start, X.end);
    }
    it.current ? Yt(B) : (pt(), dt.current = "media", f.current && (f.current.currentTime = B), M(B));
  }, [f, pt, Yt]), I = G.useCallback(() => {
    if (it.current) {
      pt();
      return;
    }
    let B = ot();
    const q = Ot.current.activeLoop;
    if (q) {
      const X = Ya(q);
      (B < X.start || B >= X.end) && (B = X.start);
    }
    Yt(B);
  }, [pt, Yt, ot]);
  G.useEffect(() => (pt(), dt.current = "media", M(0), R(""), ct.current?.dispose(), ct.current = null, () => {
    ut.current += 1, it.current = !1, ct.current?.dispose(), ct.current = null, f.current?.pause();
  }), [v, f, pt]);
  const W = o ? JSON.stringify([o.id, o.startSample, o.endSample, o.sampleRate, o.audioSrc]) : "";
  G.useEffect(() => {
    const B = it.current;
    let q = pt();
    const X = Ot.current.activeLoop;
    X && (q = Ya(X).start), dt.current = "media", f.current && (f.current.currentTime = q), M(q), B && Yt(q);
  }, [W, f, pt, Yt]), G.useEffect(() => {
    if (!C) return;
    let B = 0;
    const q = () => {
      M(ot()), B = requestAnimationFrame(q);
    };
    return B = requestAnimationFrame(q), () => cancelAnimationFrame(B);
  }, [C, ot]);
  const Nt = G.useCallback(() => {
    dt.current === "media" && pt();
  }, [pt]);
  return { time: S, playing: C, loading: Z, error: T, toggle: I, seek: Vt, ended: Nt, fail: Gt };
}
function rg(f, v) {
  if (f <= 0 || v <= 0) return [];
  const o = Y0(v) / 5, s = [];
  for (let A = 0; A * o <= f + 1e-6; A += 1)
    s.push({
      time: A * o,
      major: A % 5 === 0
    });
  return s;
}
function mg(f, v) {
  const o = Math.round(f * 1e3), s = Math.floor(o / 1e3), A = `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  return Y0(v) < 1 ? `${A}.${String(o % 1e3).padStart(3, "0")}` : A;
}
function dg({
  audioSrc: f,
  loops: v = [],
  onLoopSelect: o,
  onLoopEnabledChange: s,
  lanes: A,
  title: S = "Audio timeline",
  subtitle: M,
  duration: C = 0,
  grid: H = [],
  headerEnd: Z,
  footer: j,
  className: T = "",
  labelWidth: R = 230,
  initialZoom: it = 20,
  laneControls: dt = !1,
  wheelNavigation: ct = !1,
  followPlayheadByDefault: ut = !0,
  preload: Ot = "metadata",
  crossOrigin: ot,
  onDurationChange: pt,
  onTimeChange: Gt,
  onWindowChange: Yt,
  onPlaybackError: Vt
}) {
  const I = G.useRef(null), W = G.useRef(null), [Nt, B] = G.useState(Math.max(0, C)), [q, X] = G.useState(null), [Bt, dl] = G.useState(!1), bt = G.useMemo(() => ag(v, Nt), [v, Nt]), U = bt.find((_) => _.id === q) ?? null, V = og(
    I,
    f,
    Bt ? U : null,
    Vt,
    ot === "use-credentials" ? "include" : "same-origin"
  ), $ = V.time, Tt = V.playing, ft = U ? Ya(U) : null, Sl = (_) => {
    X(_), o?.(bt.find((tt) => tt.id === _) ?? null);
  }, Wl = (_) => {
    dl(_), s?.(_);
  };
  G.useEffect(() => {
    q && !bt.some((_) => _.id === q) && (X(null), dl(!1), o?.(null), s?.(!1));
  }, [q, bt, o, s]), G.useEffect(() => {
    X(null), dl(!1), B(Math.max(0, C));
  }, [f]);
  const [kl, d] = G.useState(ut), [D, w] = G.useState(it), [K, st] = G.useState({}), [yt, gt] = G.useState({}), L = G.useRef(it), F = G.useRef(null), Ll = G.useRef(() => {
  });
  G.useEffect(() => {
    st({}), gt({});
  }, [f]);
  const [oa, je] = G.useState(0), [Al, Ft] = G.useState({ start: 0, end: 0 });
  G.useEffect(() => {
    C > 0 && B(C);
  }, [C]), G.useEffect(() => {
    const _ = W.current;
    if (!_) return;
    const tt = () => je(_.clientWidth);
    tt();
    const at = new ResizeObserver(tt);
    return at.observe(_), () => at.disconnect();
  }, []);
  const Et = Nt > 0 ? Math.max(0.4, Math.max(320, oa - R - 16) / Nt) : 0.4, Mt = Math.max(Et, Et * Math.pow(2, D / 18));
  G.useLayoutEffect(() => {
    if (L.current = D, F.current && W.current) {
      const { time: _, pointer: tt } = F.current;
      W.current.scrollLeft = R0(_, Mt, tt), F.current = null;
    }
  }, [D, Mt]), G.useEffect(() => {
    const _ = W.current;
    if (!_ || !ct) return;
    const tt = (at) => Ll.current(at);
    return _.addEventListener("wheel", tt, { passive: !1 }), () => _.removeEventListener("wheel", tt);
  }, [ct]);
  const ra = Math.max(1, Nt * Mt), ne = G.useMemo(() => rg(Nt, Mt), [Nt, Mt]), He = G.useCallback(() => {
    const _ = W.current;
    if (!_) return;
    const tt = ng(
      _.scrollLeft + R,
      Math.max(0, _.clientWidth - R),
      R,
      Mt,
      Nt
    );
    Ft(tt), Yt?.(tt);
  }, [Nt, R, Yt, Mt]);
  G.useEffect(() => {
    He();
  }, [He, oa]), G.useEffect(() => {
    Gt?.($);
    const _ = W.current;
    if (!_ || !kl || !Tt) return;
    const tt = R + $ * Mt, at = _.scrollLeft + _.clientWidth, sl = Math.min(180, _.clientWidth * 0.2);
    tt > at - sl ? _.scrollLeft = Math.max(0, tt - _.clientWidth + sl) : tt < _.scrollLeft + R && (_.scrollLeft = Math.max(0, tt - R - sl));
  }, [$, kl, Tt, R, Gt, Mt]);
  const Ga = (_) => {
    if (Nt <= 0 || _.target.closest(".rts-label, a, button, input, select, textarea")) return;
    const tt = W.current, at = I.current;
    if (!tt || !at) return;
    const sl = tt.getBoundingClientRect(), kt = _.clientX - sl.left + tt.scrollLeft - R;
    if (kt < 0) return;
    const bl = sa(kt / Mt, 0, Nt);
    V.seek(bl);
  }, ie = (_, tt) => {
    const at = W.current;
    if (_ = sa(_, 0, 100), _ !== L.current) {
      if (at) {
        const sl = Math.max(1, at.clientWidth - R), kt = tt === void 0 ? sl / 2 : sa(tt - at.getBoundingClientRect().left - R, 0, sl), bl = F.current, pl = Et * Math.pow(2, L.current / 18), ol = bl ? R0(bl.time, pl, bl.pointer) : at.scrollLeft;
        F.current = { time: (ol + kt) / pl, pointer: kt };
      }
      L.current = _, w(_);
    }
  };
  Ll.current = (_) => {
    const tt = W.current, at = _.target instanceof Element ? _.target : null;
    if (!tt || !at || at.closest("input, select, textarea, button, [contenteditable=true]")) return;
    const sl = Math.abs(_.deltaX) > Math.abs(_.deltaY) ? _.deltaX : _.deltaY, kt = tg(sl, _.deltaMode, tt.clientWidth - R);
    if (kt)
      if (_.ctrlKey || _.metaKey) {
        if (Nt <= 0) return;
        _.preventDefault(), _.stopPropagation(), d(!1), ie(lg(L.current, kt), _.clientX);
      } else if (_.altKey) {
        const bl = at.closest("[data-lane-id]")?.dataset.laneId, pl = A.find((ol) => ol.id === bl);
        if (!dt || !pl) return;
        _.preventDefault(), _.stopPropagation(), st((ol) => ({
          ...ol,
          [pl.id]: eg(ol[pl.id] ?? Dn(pl.height), kt)
        }));
      } else
        _.preventDefault(), _.stopPropagation(), _.shiftKey ? tt.scrollTop += kt : (d(!1), tt.scrollLeft += kt);
  };
  const Ru = () => {
    if (!ft || !W.current) return;
    const _ = Math.max(320, oa - R - 16) / (ft.duration * 1.1), tt = sa(18 * Math.log2(_ / Et), 0, 100);
    F.current = null, L.current = tt, w(tt);
    const at = Et * Math.pow(2, tt / 18);
    requestAnimationFrame(() => {
      W.current && (W.current.scrollLeft = Math.max(0, (ft.start - ft.duration * 0.05) * at));
    });
  }, Xa = () => {
    const _ = Number(I.current?.duration) || 0;
    Number.isFinite(_) && _ > 0 && (B(_), pt?.(_));
  };
  return /* @__PURE__ */ z.jsxs(
    "section",
    {
      className: `rts-sequence ${dt ? "rts-display-controls" : ""} ${T}`,
      style: { "--rts-label-width": `${R}px`, "--rts-track-width": `${ra}px` },
      children: [
        /* @__PURE__ */ z.jsxs("header", { className: "rts-toolbar", children: [
          /* @__PURE__ */ z.jsxs("div", { className: "rts-ident", children: [
            /* @__PURE__ */ z.jsx("strong", { children: S }),
            M && /* @__PURE__ */ z.jsx("span", { children: M })
          ] }),
          /* @__PURE__ */ z.jsxs("div", { className: "rts-transport", "aria-label": "Timeline playback controls", children: [
            /* @__PURE__ */ z.jsx("button", { type: "button", className: "rts-button rts-play", onClick: V.toggle, "aria-label": Tt || V.loading ? "Pause" : "Play", children: V.loading ? "…" : Tt ? "❚❚" : "▶" }),
            /* @__PURE__ */ z.jsxs("output", { className: "rts-time", "aria-live": "off", children: [
              qa($),
              " / ",
              qa(Nt)
            ] }),
            /* @__PURE__ */ z.jsx("button", { type: "button", className: "rts-button", onClick: () => ie(0), children: "Fit" }),
            /* @__PURE__ */ z.jsxs("label", { className: "rts-control", children: [
              /* @__PURE__ */ z.jsx("span", { children: "Zoom" }),
              /* @__PURE__ */ z.jsx("input", { "aria-label": "Timeline zoom", type: "range", min: "0", max: "100", value: D, onChange: (_) => ie(Number(_.target.value)) })
            ] }),
            /* @__PURE__ */ z.jsxs("label", { className: "rts-control", children: [
              /* @__PURE__ */ z.jsx("input", { type: "checkbox", checked: kl, onChange: (_) => d(_.target.checked) }),
              /* @__PURE__ */ z.jsx("span", { children: "Follow" })
            ] })
          ] }),
          /* @__PURE__ */ z.jsx("div", { className: "rts-header-end", children: Z }),
          bt.length > 0 && /* @__PURE__ */ z.jsxs("div", { className: "rts-loop-controls", "aria-label": "Loop controls", children: [
            /* @__PURE__ */ z.jsxs("label", { children: [
              "Loop ",
              /* @__PURE__ */ z.jsxs("select", { "aria-label": "Select loop", value: q ?? "", onChange: (_) => Sl(_.target.value), children: [
                /* @__PURE__ */ z.jsx("option", { value: "", children: "Choose a loop…" }),
                bt.map((_) => /* @__PURE__ */ z.jsx("option", { value: _.id, children: _.label || _.id }, _.id))
              ] })
            ] }),
            /* @__PURE__ */ z.jsxs("label", { children: [
              /* @__PURE__ */ z.jsx("input", { type: "checkbox", "aria-label": "Enable loop", disabled: !U, checked: Bt && !!U, onChange: (_) => Wl(_.target.checked) }),
              "Enable loop"
            ] }),
            /* @__PURE__ */ z.jsx("button", { type: "button", className: "rts-button", disabled: !U, onClick: Ru, children: "Zoom to loop" }),
            U && /* @__PURE__ */ z.jsxs("output", { children: [
              U.startSample.toLocaleString(),
              " → ",
              U.endSample.toLocaleString(),
              " samples (end exclusive) · ",
              U.sampleRate.toLocaleString(),
              " Hz"
            ] }),
            U?.downloadUrl && /* @__PURE__ */ z.jsx("a", { href: U.downloadUrl, download: !0, children: "Download loop WAV" }),
            /* @__PURE__ */ z.jsx("span", { className: "rts-loop-status", role: "status", children: V.loading ? "Loading loop…" : Bt && U ? "Loop enabled · Play repeats selection" : "Full-song playback" })
          ] }),
          V.error && /* @__PURE__ */ z.jsx("div", { role: "alert", className: "rts-loop-error", children: V.error })
        ] }),
        /* @__PURE__ */ z.jsx(
          "audio",
          {
            ref: I,
            src: f,
            preload: Ot,
            crossOrigin: ot,
            onLoadedMetadata: Xa,
            onEnded: V.ended,
            onError: () => V.fail(new Error(I.current?.error?.message || "Audio playback failed"))
          }
        ),
        /* @__PURE__ */ z.jsx("div", { className: "rts-workspace", children: /* @__PURE__ */ z.jsx("div", { ref: W, className: "rts-scroller", onScroll: He, onClick: Ga, children: /* @__PURE__ */ z.jsxs("div", { className: "rts-inner", children: [
          /* @__PURE__ */ z.jsxs("div", { className: "rts-ruler-row", children: [
            /* @__PURE__ */ z.jsx("div", { className: "rts-label rts-ruler-label", children: "TIME" }),
            /* @__PURE__ */ z.jsx("div", { className: "rts-ruler-track", children: ne.map((_) => /* @__PURE__ */ z.jsx("span", { className: `rts-tick ${_.major ? "rts-tick-major" : ""}`, style: { left: `${_.time * Mt}px` }, children: _.major && /* @__PURE__ */ z.jsx("span", { className: "rts-tick-label", children: mg(_.time, Mt) }) }, _.time)) })
          ] }),
          bt.length > 0 && /* @__PURE__ */ z.jsxs("div", { className: "rts-lane rts-lane-loops", children: [
            /* @__PURE__ */ z.jsxs("div", { className: "rts-label", children: [
              /* @__PURE__ */ z.jsx("div", { className: "rts-title", children: "LOOPS" }),
              /* @__PURE__ */ z.jsx("div", { className: "rts-meta", children: "Select a region, enable, then Play" })
            ] }),
            /* @__PURE__ */ z.jsx("div", { className: "rts-track", children: bt.map((_) => {
              const tt = Ya(_);
              return /* @__PURE__ */ z.jsx(
                "button",
                {
                  type: "button",
                  className: "rts-loop-region",
                  "aria-pressed": q === _.id,
                  "aria-label": `Select ${_.label || _.id}`,
                  onClick: () => Sl(_.id),
                  title: `${_.label || _.id}: [${_.startSample}, ${_.endSample}) at ${_.sampleRate} Hz`,
                  style: { left: `${tt.start * Mt}px`, width: `${tt.duration * Mt}px` },
                  children: _.label || _.id
                },
                _.id
              );
            }) })
          ] }),
          ft && /* @__PURE__ */ z.jsx(
            "div",
            {
              className: `rts-loop-shade ${Bt ? "" : "is-disabled"}`,
              "aria-hidden": "true",
              style: { left: `${R + ft.start * Mt}px`, width: `${ft.duration * Mt}px` }
            }
          ),
          /* @__PURE__ */ z.jsx("div", { className: "rts-lanes", children: A.map((_) => {
            const tt = _.content, at = tt.type === "audio" ? tt : null, sl = yt[_.id] ?? at?.view ?? "both", kt = at ? B0(sl, !!at.waveform, !!at.spectrogram) : "both", bl = dt ? K[_.id] ?? Dn(_.height) : _.height, pl = typeof _.title == "string" ? _.title : _.id;
            return /* @__PURE__ */ z.jsxs(
              "div",
              {
                "data-lane-id": _.id,
                className: `rts-lane rts-lane-${_.kind ?? "default"} ${_.className ?? ""}`,
                style: bl ? { "--rts-lane-height": `${bl}px` } : void 0,
                children: [
                  /* @__PURE__ */ z.jsxs("div", { className: "rts-label", children: [
                    /* @__PURE__ */ z.jsx("div", { className: "rts-title", children: _.title }),
                    _.meta && /* @__PURE__ */ z.jsx("div", { className: "rts-meta", children: _.meta }),
                    dt && /* @__PURE__ */ z.jsxs("div", { className: "rts-lane-controls", children: [
                      at && /* @__PURE__ */ z.jsxs("label", { children: [
                        "View ",
                        /* @__PURE__ */ z.jsxs(
                          "select",
                          {
                            "aria-label": `View for ${pl}`,
                            value: kt,
                            onChange: (ol) => gt((ma) => ({ ...ma, [_.id]: ol.target.value })),
                            children: [
                              /* @__PURE__ */ z.jsx("option", { value: "waveform", disabled: !at.waveform, children: "Waveform" }),
                              /* @__PURE__ */ z.jsx("option", { value: "spectrogram", disabled: !at.spectrogram, children: "Spectrogram" }),
                              /* @__PURE__ */ z.jsx("option", { value: "both", disabled: !at.waveform || !at.spectrogram, children: "Both" })
                            ]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ z.jsxs("label", { children: [
                        "Height ",
                        /* @__PURE__ */ z.jsx(
                          "input",
                          {
                            type: "range",
                            min: j0,
                            max: H0,
                            step: "1",
                            "aria-label": `Height for ${pl}`,
                            value: bl,
                            onChange: (ol) => st((ma) => ({ ...ma, [_.id]: Dn(Number(ol.target.value)) }))
                          }
                        ),
                        /* @__PURE__ */ z.jsxs("output", { children: [
                          bl,
                          "px"
                        ] })
                      ] }),
                      /* @__PURE__ */ z.jsx(
                        "button",
                        {
                          type: "button",
                          className: "rts-height-reset",
                          "aria-label": `Reset height for ${pl}`,
                          onClick: () => st((ol) => ({ ...ol, [_.id]: Dn(_.height) })),
                          children: "Reset height"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ z.jsx("div", { className: "rts-track", children: at ? /* @__PURE__ */ z.jsx(sg, { content: at, duration: Nt, view: kt }) : /* @__PURE__ */ z.jsx(Ks, { content: tt, duration: Nt }) })
                ]
              },
              _.id
            );
          }) }),
          H.length > 0 && /* @__PURE__ */ z.jsx("div", { className: "rts-grid", "aria-hidden": "true", children: H.map((_, tt) => /* @__PURE__ */ z.jsx("span", { className: `rts-grid-line ${_.emphasis ? "rts-grid-line-emphasis" : ""} ${_.className ?? ""}`, style: { left: `${_.time * Mt}px` } }, `${_.time}-${tt}`)) }),
          /* @__PURE__ */ z.jsx("div", { className: "rts-playhead", style: { left: `${R + $ * Mt}px` }, "aria-hidden": "true" })
        ] }) }) }),
        /* @__PURE__ */ z.jsxs("footer", { className: "rts-footer", children: [
          /* @__PURE__ */ z.jsxs("div", { children: [
            j,
            ct && /* @__PURE__ */ z.jsx("div", { className: "rts-navigation-help", children: "Wheel: time · Ctrl/⌘ + wheel: time zoom · Alt + wheel: channel height · Shift + wheel: channel scroll" })
          ] }),
          /* @__PURE__ */ z.jsxs("output", { className: "rts-window", children: [
            qa(Al.start),
            " — ",
            qa(Al.end)
          ] })
        ] })
      ]
    }
  );
}
const Zs = /\.(wav|flac|mp3|ogg|opus|m4a|aif|aiff)$/i;
function x0(f) {
  return f === "__source__" || f.startsWith("input/") ? "master" : f.startsWith("stems/") ? f.slice(6).replace(Zs, "") : f.startsWith("speech/") && Zs.test(f) ? f.replace(Zs, "") : null;
}
function vg(f) {
  const v = /* @__PURE__ */ new Map(), o = [], s = /* @__PURE__ */ new Map();
  for (const S of f) for (const M of Array.isArray(S.sourceMap) ? S.sourceMap : [])
    if (typeof M?.audio == "string" && typeof M.data == "string") {
      const C = x0(M.audio.replace(/\\/g, "/"));
      C && (s.set(M.data.replace(/\\/g, "/"), C), typeof M.png == "string" && s.set(M.png.replace(/\\/g, "/"), C));
    }
  const A = (S) => (v.has(S) || v.set(S, { key: S }), v.get(S));
  for (const S of f) {
    const M = (S.id?.replace(/^file:/, "") || "").replace(/\\/g, "/"), C = x0(M), H = M.startsWith("spectrograms/") ? s.get(M) || M.slice(13).replace(/\.(npz|png)$/i, "") : null;
    if (C && (S.content?.type === "waveform" || S.content?.type === "artifact")) {
      const Z = A(C);
      (!Z.audio || S.id === "__source__") && (Z.audio = S);
    } else H && M.endsWith(".npz") && S.content?.type === "image" ? A(H).spectrum = S : H && M.endsWith(".png") && S.content?.type === "image" ? A(H).png = S : o.push(S);
  }
  for (const S of v.values()) {
    if (!S.audio && !S.spectrum) {
      S.png && o.push(S.png);
      continue;
    }
    const M = S.audio || S.spectrum, C = S.audio?.content?.type === "waveform" ? S.audio.content : null, H = S.audio?.content?.type === "artifact" ? S.audio.content.note : null;
    o.push({
      ...M,
      id: S.key === "master" ? "__source__" : `audio:${S.key}`,
      title: S.key === "master" ? "MASTER · uploaded source" : S.key.replace(/\//g, " · ").replace(/_/g, " "),
      kind: "audio",
      height: 160,
      meta: H || (C && S.spectrum ? "waveform + aligned spectrogram" : C ? "waveform · spectrogram pending" : "spectrogram · waveform pending"),
      content: {
        type: "audio",
        view: "both",
        waveform: C ? { min: C.min, max: C.max, colour: C.colour } : void 0,
        spectrogram: S.spectrum ? { src: S.spectrum.content.src, alt: S.spectrum.content.alt } : void 0
      }
    }), !S.spectrum && S.png && o.push(S.png);
  }
  return o;
}
function hg(f, v) {
  if (!f || f.schema !== "stemlab.loops.v1") return [];
  const o = f.sample_rate;
  return !Number.isSafeInteger(o) || o <= 0 ? [] : (f.loops || []).flatMap((s) => {
    if (!/^(verse|chorus)-\d+-\d+$/.test(s.id) || !Number.isSafeInteger(s.start_sample) || !Number.isSafeInteger(s.end_sample) || s.start_sample < 0 || s.end_sample <= s.start_sample || s.end_sample > f.source_frames) return [];
    const A = encodeURIComponent(`${f.source_sha256}:${s.start_sample}:${s.end_sample}`);
    return [{
      id: s.id,
      label: `${s.section_label} · ${s.bars} bar${s.bars === 1 ? "" : "s"}`,
      startSample: s.start_sample,
      endSample: s.end_sample,
      sampleRate: o,
      // Exact native-rate PCM excerpt, computed read-only whether or not --export-loops was used.
      audioSrc: `/api/${v}/loops/${encodeURIComponent(s.id)}/audio?v=${A}`,
      downloadUrl: s.file && /^audio\/[a-zA-Z0-9._-]+\.wav$/.test(s.file) ? `/${v}/deep/loops/${s.file.split("/").map(encodeURIComponent).join("/")}` : void 0
    }];
  });
}
function yg(f) {
  const [v, o] = G.useState({ report: null, error: "" });
  G.useEffect(() => {
    let A = !0, S, M = "";
    const C = new AbortController();
    o({ report: null, error: "" });
    const H = async () => {
      try {
        const Z = await fetch(`/${f}/deep/loops/loops.json`, {
          cache: "no-store",
          signal: C.signal
        });
        if (!A) return;
        if (Z.status === 404)
          M = "", o({ report: null, error: "" });
        else {
          if (!Z.ok) throw new Error(`Loop report: HTTP ${Z.status}`);
          const j = await Z.json();
          if (j.schema !== "stemlab.loops.v1") throw new Error("Unsupported loop report schema");
          const T = JSON.stringify(j);
          A && T !== M && (o({ report: j, error: "" }), M = T);
        }
      } catch (Z) {
        A && Z.name !== "AbortError" && (M = "", o({ report: null, error: Z.message }));
      } finally {
        A && (S = window.setTimeout(H, 2500));
      }
    };
    return H(), () => {
      A = !1, C.abort(), window.clearTimeout(S);
    };
  }, [f]);
  const s = G.useMemo(() => hg(v.report, f), [v.report, f]);
  return { ...v, loops: s };
}
function gg({ state: f, hash: v }) {
  const o = f.report;
  return f.error ? /* @__PURE__ */ z.jsx("p", { role: "alert", className: "stemlab-loop-summary", children: f.error }) : o ? /* @__PURE__ */ z.jsxs("details", { className: "stemlab-loop-summary", open: o.unresolved_sections.length > 0, children: [
    /* @__PURE__ */ z.jsxs("summary", { children: [
      o.loop_count,
      " loop(s) · ",
      o.unresolved_sections.length,
      " unresolved section(s) · ",
      /* @__PURE__ */ z.jsx("a", { href: `/${v}/deep/loops/loops.json`, target: "_blank", rel: "noopener", children: "Sample report" })
    ] }),
    /* @__PURE__ */ z.jsx("p", { children: "Choose a loop region or use the Loop selector, tick Enable loop, then press Play. Previewing writes no files." }),
    o.unresolved_sections.map((s) => /* @__PURE__ */ z.jsxs("p", { children: [
      /* @__PURE__ */ z.jsxs("strong", { children: [
        s.label,
        ":"
      ] }),
      " ",
      s.reason
    ] }, s.index))
  ] }) : /* @__PURE__ */ z.jsxs("p", { className: "stemlab-loop-summary", children: [
    "No loop report yet. New analyses discover loops automatically; for existing results run ",
    /* @__PURE__ */ z.jsx("code", { children: "stemlab loops RESULTS_DIR" }),
    "."
  ] });
}
const ml = (f) => document.querySelector(f), Sg = ml("#uploadView"), Ws = ml("#timelineView"), La = ml("#dropZone"), Cn = ml("#fileInput"), G0 = ml("#chooseButton"), X0 = ml("#uploadProgressWrap"), uc = ml("#uploadProgress"), nc = ml("#uploadLabel"), Uu = ml("#connectionBadge"), Q0 = ml("#canonicalBpm"), Z0 = ml("#canonicalLyrics"), V0 = ml("#canonicalTiming"), Js = ml("#knownInfoStatus"), bg = ml("#loadArcadiansReference"), pg = ml("#loadArcadiansHero"), Tg = Array.from(Ws.children), ks = document.createElement("div");
ks.id = "timelineRoot";
Ws.replaceChildren(ks);
for (const f of Tg) f.remove();
const Eg = Py.createRoot(ks), _g = /* @__PURE__ */ new Set(["wav", "flac", "mp3", "ogg", "opus", "m4a", "aif", "aiff"]);
let $s = {};
function Ng(f) {
  const v = String(f).split("/").pop() || "", o = v.lastIndexOf(".");
  return o >= 0 ? v.slice(o + 1).toLowerCase() : "";
}
function Se(f) {
  return String(f).replace(/^stems\//, "").replace(/^spectrograms\//, "").replace(/^vamp\/data\//, "Vamp · ").replace(/^beats\//, "Beats · ").replace(/^speech\//, "Speech · ").replace(/^deep\//, "Deep · ").replace(/[_-]+/g, " ");
}
function Is(f, v) {
  return `/${f}/${v.split("/").map(encodeURIComponent).join("/")}`;
}
function ic(f, v, o = "Generated analysis artifact") {
  return { type: "artifact", note: o, href: v === "__source__" ? `/api/${f}/source` : Is(f, v) };
}
async function Fl(f, v) {
  const o = await fetch(Is(f, v), { cache: "no-store" });
  if (!o.ok) throw new Error(`HTTP ${o.status}`);
  return o.json();
}
function ue(f, v = 2, o = "") {
  const s = Number(f);
  return Number.isFinite(s) ? `${s.toFixed(v)}${o}` : "—";
}
function Ba(f, v, o, s, A = "feature") {
  const S = s.filter(([, M]) => M != null && M !== "");
  return {
    id: f,
    title: v,
    meta: o,
    kind: A,
    content: {
      type: "summary",
      items: (S.length ? S : [["status", "analysis available"]]).map(([M, C]) => ({ label: M, value: C }))
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
function zg(f) {
  const v = Array.isArray(f.events) ? f.events : [];
  switch (String(f.kind || "")) {
    case "curve":
      return { type: "curve", points: v.flatMap((o) => {
        const s = Number(o.start), A = Number(o.values?.[0]);
        return Number.isFinite(s) && Number.isFinite(A) && A > 0 ? [{ time: s, value: A }] : [];
      }) };
    case "matrix":
      return { type: "matrix", rows: v.map((o) => o.values || []).filter((o) => o.length) };
    case "notes":
      return { type: "notes", items: v.flatMap((o) => {
        const s = Number(o.values?.[0]), A = Number(o.start);
        if (!Number.isFinite(s) || s <= 0 || !Number.isFinite(A)) return [];
        const S = Number(o.end);
        return [{ start: A, end: Number.isFinite(S) && S > A ? S : A + 0.12, value: s, label: o.label }];
      }) };
    case "segments":
      return { type: "blocks", items: cc(v) };
    case "events":
      return { type: "markers", items: v.flatMap((o) => Number.isFinite(Number(o.start)) ? [{ time: Number(o.start) }] : []) };
    default:
      return { type: "artifact", note: v[0]?.label || v[0]?.values?.join(", ") || f.title || "analysis" };
  }
}
async function w0(f, v, o, s, A) {
  const S = new URLSearchParams({ path: A, points: "12000" }), M = await fetch(`/api/${f}/waveform?${S}`);
  if (!M.ok) return { id: v, title: o, meta: s, kind: "artifact", content: ic(f, A, `waveform unavailable (${M.status})`) };
  const C = await M.json();
  return { id: v, title: o, meta: s, kind: "waveform", content: { type: "waveform", min: C.min || [], max: C.max || [] }, duration: Number(C.duration_seconds) || 0 };
}
async function Og(f, v) {
  const o = v.path, s = `file:${o}`, A = Ng(o);
  if (o === "canonical.json" || o.startsWith("deep/loops/")) return null;
  if (_g.has(A)) return w0(f, s, Se(o), "audio waveform", o);
  if (o.startsWith("spectrograms/") && A === "npz") {
    const S = new URLSearchParams({ path: o, max_width: "8192", max_height: "768" });
    return { id: s, title: Se(o), meta: "spectrogram data · exact song timeline", kind: "spectrogram", content: { type: "image", src: `/api/${f}/spectrogram?${S}`, alt: `${Se(o)} spectrogram` } };
  }
  if (o.startsWith("spectrograms/") && A === "png")
    return { id: s, title: Se(o), meta: "rendered spectrogram PNG", kind: "image", content: { type: "image", src: Is(f, o), alt: `${Se(o)} rendered spectrogram` } };
  try {
    if (o === "analysis.json") {
      const S = await Fl(f, o);
      return {
        id: s,
        title: Se(o),
        meta: "analysis provenance",
        kind: "artifact",
        sourceMap: S.spectrograms || [],
        content: ic(f, o)
      };
    }
    if (o.startsWith("beats/") && A === "json") {
      const S = await Fl(f, o), M = new Set((S.downbeats || []).map((C) => Number(C).toFixed(3)));
      return { id: s, title: Se(o), meta: "beat / downbeat events", kind: "events", content: { type: "markers", items: (S.beats || []).flatMap((C) => {
        const H = Number(C);
        return Number.isFinite(H) ? [{ time: H, emphasis: M.has(H.toFixed(3)), label: M.has(H.toFixed(3)) ? "Downbeat" : "Beat" }] : [];
      }) } };
    }
    if (o.startsWith("vamp/data/") && A === "json") {
      const S = await Fl(f, o);
      return { id: s, title: Se(o), meta: "Vamp feature analysis", kind: "feature", content: zg(S) };
    }
    if (o === "speech/whisper.json") {
      const S = await Fl(f, o);
      return { id: s, title: "Speech · Whisper words", meta: "word-aligned transcript", kind: "words", content: { type: "blocks", items: (S.words || []).flatMap((M) => {
        const C = Number(M.start), H = Number(M.end);
        return Number.isFinite(C) ? [{ start: C, end: Number.isFinite(H) ? Math.max(C + 0.03, H) : C + 0.03, label: String(M.word || "").trim() }] : [];
      }) } };
    }
    if (o === "deep/structure/structure.json" || o === "deep/song_map/song_map.json") {
      const S = await Fl(f, o), M = o.includes("song_map");
      return { id: s, title: M ? "Deep · song map" : "Deep · functional structure", meta: M ? "section-level sonic / rhythm / harmony / lyric fusion" : "All-In-One · functional song sections", kind: "deep-structure", content: { type: "blocks", items: cc(M ? S.sections : S.segments) } };
    }
    if (o === "deep/harmony/harmony.json") {
      const S = await Fl(f, o), M = S.chords?.collapsed_progression || [];
      return M.length ? { id: s, title: "Deep · harmony", meta: "collapsed chord progression + key evidence", kind: "deep-harmony", content: { type: "blocks", items: cc(M) } } : Ba(s, "Deep · harmony", "collapsed chord progression + key evidence", [["key", S.vamp_key || S.independent_key_candidates_from_nnls_chroma?.[0]?.key || "—"], ["tuning", S.tuning_hz ? `${Number(S.tuning_hz).toFixed(1)} Hz` : "—"]], "deep-harmony");
    }
    if (o === "deep/lyrics/lyrics.json") {
      const S = await Fl(f, o), M = (S.lines || []).filter((C) => Number.isFinite(Number(C.start)) && Number.isFinite(Number(C.end)));
      return M.length ? { id: s, title: "Deep · rhyme & prosody", meta: "phonetic rhyme, repetition and delivery", kind: "deep-lyrics", content: { type: "blocks", items: cc(M) } } : Ba(s, "Deep · rhyme & prosody", "phonetic rhyme, repetition and delivery", [["rhyme scheme", S.rhyme?.scheme || "—"], ["lines", S.line_count ?? "—"], ["words", S.word_count ?? "—"]], "deep-lyrics");
    }
    if (o === "deep/sonic/sonic.json") {
      const S = await Fl(f, o);
      return Ba(s, "Deep · sonic profile", "loudness · dynamics · timbre · stereo", [["LUFS", ue(S.loudness?.integrated_lufs_bs1770, 1)], ["crest", ue(S.loudness?.crest_factor_db, 1, " dB")], ["RMS range", ue(S.loudness?.short_term_rms_range_db_p95_p10, 1, " dB")], ["centroid", ue(S.timbre?.spectral_centroid_hz_mean, 0, " Hz")], ["stereo corr", ue(S.stereo?.left_right_correlation, 2)]]);
    }
    if (o === "deep/rhythm/rhythm.json") {
      const S = await Fl(f, o);
      return Ba(s, "Deep · groove", "meter · stability · swing · syncopation evidence", [["tempo", ue(S.tempo?.median_bpm, 2, " BPM")], ["meter", S.meter?.estimated_beats_per_bar ? `${S.meter.estimated_beats_per_bar}/4-ish` : "—"], ["swing", ue(S.groove?.swing_ratio_long_to_short, 2, ":1")], ["offbeat energy", ue(S.groove?.offbeat_onset_energy_ratio, 3)], ["onsets/s", ue(S.groove?.onset_density_per_second, 2)]]);
    }
    if (o === "deep/semantic_text/semantic_text.json") {
      const S = await Fl(f, o);
      return Ba(s, "Deep · lyric semantics", "sentence embedding theme similarities · not probabilities", (S.theme_similarity || []).slice(0, 7).map((M) => [M.theme, ue(M.similarity, 3)]));
    }
    if (o === "deep/semantic_audio/semantic_audio.json") {
      const S = await Fl(f, o), M = Object.entries(S.prompt_sets || {}).flatMap(([C, H]) => (H || []).slice(0, 2).map((Z) => [`${C}: ${Z.prompt}`, ue(Z.similarity, 3)]));
      return Ba(s, "Deep · audio semantics", "MuQ-MuLan zero-shot similarities · CC-BY-NC weights", M);
    }
    if (o === "deep/summary.json") {
      const S = await Fl(f, o), M = Object.entries(S.analyses || {}).map(([C, H]) => [C, H.available ? "ready" : "unavailable"]);
      return (S.errors || []).length && M.push(["errors", S.errors.length]), Ba(s, "Deep · analysis summary", "cross-domain action inventory", M);
    }
  } catch (S) {
    return { id: s, title: Se(o), meta: "analysis artifact", kind: "artifact", content: ic(f, o, S.message) };
  }
  return { id: s, title: Se(o), meta: `${A || "file"} · ${Number(v.bytes || 0).toLocaleString()} bytes`, kind: "artifact", content: ic(f, o) };
}
function Ag(f, v, o, s) {
  const A = [], S = Number(f?.bpm);
  if (Number.isFinite(S) && S > 0) {
    const H = [];
    if (Number.isFinite(v) && s > 0) {
      const Z = 60 / S;
      for (let j = v, T = 0; j <= s + 1e-7; j += Z, T += 1) H.push({ time: j, emphasis: T === 0, label: `Canonical beat ${T + 1}` });
    }
    A.push({ id: "canonical:bpm", title: "Canonical BPM", meta: Number.isFinite(v) ? `${S} BPM · anchor ${v.toFixed(3)}s · ${o || "detected beat"}` : `${S} BPM · waiting for first detected beat`, kind: "canonical-bpm", height: 104, content: H.length ? { type: "markers", items: H } : { type: "artifact", note: `${S} BPM — grid will begin at the first detected beat` } });
  }
  f?.lyrics && A.push({ id: "canonical:lyrics", title: "Canonical lyrics", meta: "known reference text", kind: "canonical-lyrics", height: 104, content: { type: "text", text: f.lyrics } });
  const M = Array.isArray(f?.lyric_timing) ? f.lyric_timing : [];
  M.length && A.push({ id: "canonical:timing", title: "Canonical lyric timing", meta: `${M.length} timed lyric event${M.length === 1 ? "" : "s"}`, kind: "canonical-timing", height: 104, content: { type: "blocks", items: M.flatMap((H) => {
    const Z = Number(H.start), j = Number(H.end);
    return Number.isFinite(Z) && Z >= 0 ? [{ start: Z, end: Number.isFinite(j) && j > Z ? j : Z + 0.75, label: String(H.text || ""), className: "stemlab-canonical-lyric" }] : [];
  }) } });
  const C = A.find((H) => H.id === "canonical:bpm")?.content?.items || [];
  return { lanes: A, grid: C };
}
function Mg({ lines: f }) {
  return /* @__PURE__ */ z.jsxs("details", { open: !0, className: "stemlab-log", children: [
    /* @__PURE__ */ z.jsx("summary", { children: "Analysis log" }),
    /* @__PURE__ */ z.jsx("div", { className: "log", children: f.map((v, o) => /* @__PURE__ */ z.jsxs("div", { className: v.stream === "stderr" ? "stderr" : "stdout", children: [
      "[",
      v.stream,
      "] ",
      v.text
    ] }, o)) })
  ] });
}
function Dg({ hash: f, filename: v }) {
  const o = yg(f), [s, A] = G.useState([]), [S, M] = G.useState(0), [C, H] = G.useState({ state: "submitted" }), [Z, j] = G.useState({ bpm: null, lyrics: null, lyric_timing: [] }), [T, R] = G.useState(null), [it, dt] = G.useState(null), [ct, ut] = G.useState([]), Ot = G.useRef(/* @__PURE__ */ new Set()), ot = G.useCallback((B, q) => {
    q && ut((X) => [...X.slice(-799), { stream: B === "stderr" ? "stderr" : "stdout", text: q }]);
  }, []), pt = G.useCallback(async (B) => {
    if (!B?.path || Ot.current.has(B.path)) return;
    Ot.current.add(B.path);
    const q = await Og(f, B);
    q && (q.duration && M((X) => X || q.duration), A((X) => X.some((Bt) => Bt.id === q.id) ? X : [...X, q]));
  }, [f]), Gt = G.useCallback(async () => {
    const B = await fetch(`/api/${f}/timeline`, { cache: "no-store" });
    if (!B.ok) return;
    const q = await B.json();
    H(q.status || { state: "submitted" }), q.duration_seconds && M(Number(q.duration_seconds)), q.canonical && j(q.canonical);
    const X = q.first_detected_beat == null ? NaN : Number(q.first_detected_beat);
    Number.isFinite(X) && X >= 0 && (R(X), dt(q.first_detected_beat_source || "detected beat"));
    for (const Bt of q.files || []) pt(Bt);
  }, [pt, f]);
  G.useEffect(() => {
    Ot.current = /* @__PURE__ */ new Set(), A([]), w0(f, "__source__", "MASTER · uploaded source", v, "__source__").then((X) => {
      X.duration && M(X.duration), A((Bt) => [X, ...Bt.filter((dl) => dl.id !== X.id)]);
    }).catch((X) => ot("stderr", X.message)), Gt();
    const B = window.setInterval(() => {
      Gt();
    }, 2500);
    let q = null;
    return typeof window.io == "function" ? (q = window.io({ path: "/socket.io" }), q.on("connect", () => {
      Uu.textContent = "live", Uu.classList.remove("muted"), q.emit("subscribe", { hash: f });
    }), q.on("disconnect", () => {
      Uu.textContent = "reconnecting", Uu.classList.add("muted");
    }), q.on("process_output", (X) => ot(X.stream || "stdout", X.line || "")), q.on("process_history", (X) => {
      for (const Bt of X.stdout || []) ot("stdout", Bt);
      for (const Bt of X.stderr || []) ot("stderr", Bt);
    }), q.on("new_file", (X) => {
      pt(X);
    }), q.on("job_status", (X) => {
      H(X.status || {}), Gt();
    }), q.on("canonical_metadata", (X) => {
      X?.canonical && j(X.canonical);
    }), q.on("job_timeout", (X) => ot("stderr", `Job timeout: ${X.message || "analysis exceeded timeout"}`))) : (Uu.textContent = "polling", Uu.classList.add("muted"), ot("stderr", "Socket.IO browser client unavailable; timeline inventory polling remains active.")), () => {
      window.clearInterval(B), q?.disconnect();
    };
  }, [pt, ot, v, f, Gt]);
  const Yt = G.useMemo(() => Ag(Z, T, it, S), [T, it, Z, S]), Vt = (B) => B.id === "__source__" ? 0 : B.kind === "deep-structure" ? 10 : B.kind === "events" ? 20 : B.kind === "audio" ? 1 : B.kind === "spectrogram" ? 30 : B.kind === "waveform" ? 40 : 90, I = G.useMemo(() => vg(s), [s]), W = [...Yt.lanes, ...[...I].sort((B, q) => Vt(B) - Vt(q) || B.id.localeCompare(q.id))], Nt = C.state || "submitted";
  return /* @__PURE__ */ z.jsx(
    dg,
    {
      className: "stemlab-timeline",
      laneControls: !0,
      wheelNavigation: !0,
      audioSrc: `/api/${f}/source`,
      duration: S,
      title: Z.title || v,
      subtitle: f,
      loops: o.loops,
      lanes: W,
      grid: Yt.grid,
      onDurationChange: M,
      onPlaybackError: (B) => ot("stderr", B instanceof Error ? B.message : String(B)),
      headerEnd: /* @__PURE__ */ z.jsxs(z.Fragment, { children: [
        /* @__PURE__ */ z.jsx("span", { className: `badge ${Nt}`, children: Nt }),
        /* @__PURE__ */ z.jsxs("span", { className: "small", children: [
          W.length,
          " lane",
          W.length === 1 ? "" : "s"
        ] })
      ] }),
      footer: /* @__PURE__ */ z.jsxs(z.Fragment, { children: [
        /* @__PURE__ */ z.jsx(gg, { state: o, hash: f }),
        /* @__PURE__ */ z.jsx(Mg, { lines: ct }),
        /* @__PURE__ */ z.jsx("span", { className: "dock-links", children: /* @__PURE__ */ z.jsx("a", { href: "https://kieransimkin.co.uk/my-songs/", target: "_blank", rel: "noopener", children: "Kieran Simkin · My Songs ↗" }) })
      ] })
    }
  );
}
function Cg() {
  const f = Q0?.value?.trim() || "", v = Z0?.value || "", o = V0?.value || "";
  return { ...$s, bpm: f ? Number(f) : null, lyrics: v.trim() || null, lyric_timing: o.trim() || [] };
}
function Ug(f) {
  return Number.isFinite(Number(f.bpm)) || !!f.lyrics || !!(typeof f.lyric_timing == "string" && f.lyric_timing.trim()) || !!(Array.isArray(f.lyric_timing) && f.lyric_timing.length);
}
async function Rg(f) {
  const v = Cg();
  if (!Ug(v)) return;
  const o = await fetch(`/api/${f}/canonical`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(v) }), s = await o.json().catch(() => ({}));
  if (!o.ok) throw new Error(s.detail || `Could not save canonical metadata (${o.status})`);
  Js.textContent = "Known information saved with this song hash.";
}
function xg(f) {
  return new Promise((v, o) => {
    const s = new XMLHttpRequest();
    s.open("PUT", `/upload/${encodeURIComponent(f.name)}`), s.setRequestHeader("Content-Type", f.type || "application/octet-stream"), s.upload.onprogress = (A) => {
      X0.classList.remove("hidden");
      const S = A.lengthComputable ? A.loaded / A.total : 0;
      uc.style.width = `${Math.round(S * 100)}%`, nc.textContent = A.lengthComputable ? `${Math.round(S * 100)}% · ${(A.loaded / 1048576).toFixed(1)} / ${(A.total / 1048576).toFixed(1)} MiB` : `${(A.loaded / 1048576).toFixed(1)} MiB uploaded`;
    }, s.onerror = () => o(new Error("Upload failed")), s.onload = () => {
      let A = {};
      try {
        A = JSON.parse(s.responseText);
      } catch {
      }
      s.status < 200 || s.status >= 300 ? o(new Error(A.detail || `Upload failed (${s.status})`)) : v(A);
    }, s.send(f);
  });
}
async function K0(f, v) {
  Sg.classList.add("hidden"), Ws.classList.remove("hidden"), Eg.render(/* @__PURE__ */ z.jsx(Dg, { hash: f, filename: v || "uploaded audio" }, f));
}
async function J0(f) {
  if (f) {
    uc.style.width = "0%", nc.textContent = `Uploading ${f.name}`, X0.classList.remove("hidden");
    try {
      const v = await xg(f);
      uc.style.width = "100%", nc.textContent = "Upload complete · attaching to analysis", await Rg(v.hash), await K0(v.hash, v.filename || f.name);
    } catch (v) {
      nc.textContent = v.message, uc.style.width = "0%";
    }
  }
}
async function $0(f) {
  f?.preventDefault(), f?.stopPropagation();
  try {
    const v = await fetch("/assets/arcadians-reference.json", { cache: "no-store" });
    if (!v.ok) throw new Error(`Could not load Arcadians reference (${v.status})`);
    const o = await v.json();
    $s = {};
    for (const s of ["title", "artist", "release_date", "isrc", "upc", "website", "my_songs_url", "epk_url", "cover_art_url", "source_url", "sections"])
      o[s] !== void 0 && o[s] !== null && ($s[s] = o[s]);
    Q0.value = o.bpm ?? "", Z0.value = o.lyrics ?? "", V0.value = Array.isArray(o.lyric_timing) && o.lyric_timing.length ? JSON.stringify(o.lyric_timing, null, 2) : "", ml(".known-info").open = !0, Js.textContent = o.lyric_timing?.length ? `Loaded ${o.title || "Arcadians"}: canonical release metadata, sections, ${o.bpm} BPM, lyrics and timing.` : `Loaded ${o.title || "Arcadians"} canonical reference metadata.`;
  } catch (v) {
    Js.textContent = v.message;
  }
}
G0.addEventListener("click", (f) => {
  f.stopPropagation(), Cn.click();
});
Cn.addEventListener("change", () => {
  J0(Cn.files?.[0]);
});
La.addEventListener("click", (f) => {
  f.target !== G0 && !f.target.closest(".known-info") && Cn.click();
});
La.addEventListener("keydown", (f) => {
  (f.key === "Enter" || f.key === " ") && Cn.click();
});
for (const f of ["dragenter", "dragover"]) La.addEventListener(f, (v) => {
  v.preventDefault(), La.classList.add("dragging");
});
for (const f of ["dragleave", "drop"]) La.addEventListener(f, (v) => {
  v.preventDefault(), La.classList.remove("dragging");
});
La.addEventListener("drop", (f) => {
  J0(f.dataTransfer?.files?.[0]);
});
bg?.addEventListener("click", $0);
pg?.addEventListener("click", $0);
const Vs = new URLSearchParams(location.search).get("hash");
Vs && /^[0-9a-f]{64}$/i.test(Vs) && K0(Vs.toLowerCase(), "Existing analysis");
export {
  qa as formatTimelineTime
};
