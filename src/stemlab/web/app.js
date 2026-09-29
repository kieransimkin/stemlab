var Rs = { exports: {} }, gn = {};
var S0;
function By() {
  if (S0) return gn;
  S0 = 1;
  var s = /* @__PURE__ */ Symbol.for("react.transitional.element"), g = /* @__PURE__ */ Symbol.for("react.fragment");
  function r(f, O, _) {
    var D = null;
    if (_ !== void 0 && (D = "" + _), O.key !== void 0 && (D = "" + O.key), "key" in O) {
      _ = {};
      for (var C in O)
        C !== "key" && (_[C] = O[C]);
    } else _ = O;
    return O = _.ref, {
      $$typeof: s,
      type: f,
      key: D,
      ref: O !== void 0 ? O : null,
      props: _
    };
  }
  return gn.Fragment = g, gn.jsx = r, gn.jsxs = r, gn;
}
var b0;
function qy() {
  return b0 || (b0 = 1, Rs.exports = By()), Rs.exports;
}
var A = qy(), xs = { exports: {} }, I = {};
var T0;
function Yy() {
  if (T0) return I;
  T0 = 1;
  var s = /* @__PURE__ */ Symbol.for("react.transitional.element"), g = /* @__PURE__ */ Symbol.for("react.portal"), r = /* @__PURE__ */ Symbol.for("react.fragment"), f = /* @__PURE__ */ Symbol.for("react.strict_mode"), O = /* @__PURE__ */ Symbol.for("react.profiler"), _ = /* @__PURE__ */ Symbol.for("react.consumer"), D = /* @__PURE__ */ Symbol.for("react.context"), C = /* @__PURE__ */ Symbol.for("react.forward_ref"), Y = /* @__PURE__ */ Symbol.for("react.suspense"), X = /* @__PURE__ */ Symbol.for("react.memo"), j = /* @__PURE__ */ Symbol.for("react.lazy"), T = /* @__PURE__ */ Symbol.for("react.activity"), U = /* @__PURE__ */ Symbol.for("react.view_transition"), ct = Symbol.iterator;
  function St(d) {
    return d === null || typeof d != "object" ? null : (d = ct && d[ct] || d["@@iterator"], typeof d == "function" ? d : null);
  }
  var mt = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, et = Object.assign, pt = {};
  function ft(d, M, V) {
    this.props = d, this.context = M, this.refs = pt, this.updater = V || mt;
  }
  ft.prototype.isReactComponent = {}, ft.prototype.setState = function(d, M) {
    if (typeof d != "object" && typeof d != "function" && d != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, d, M, "setState");
  }, ft.prototype.forceUpdate = function(d) {
    this.updater.enqueueForceUpdate(this, d, "forceUpdate");
  };
  function bt() {
  }
  bt.prototype = ft.prototype;
  function Lt(d, M, V) {
    this.props = d, this.context = M, this.refs = pt, this.updater = V || mt;
  }
  var Rt = Lt.prototype = new bt();
  Rt.constructor = Lt, et(Rt, ft.prototype), Rt.isPureReactComponent = !0;
  var Ot = Array.isArray;
  function Q() {
  }
  var at = { H: null, A: null, T: null, S: null }, P = Object.prototype.hasOwnProperty;
  function x(d, M, V) {
    var Z = V.ref;
    return {
      $$typeof: s,
      type: d,
      key: M,
      ref: Z !== void 0 ? Z : null,
      props: V
    };
  }
  function B(d, M) {
    return x(d.type, M, d.props);
  }
  function ut(d) {
    return typeof d == "object" && d !== null && d.$$typeof === s;
  }
  function Xt(d) {
    var M = { "=": "=0", ":": "=2" };
    return "$" + d.replace(/[=:]/g, function(V) {
      return M[V];
    });
  }
  var Bt = /\/+/g;
  function dt(d, M) {
    return typeof d == "object" && d !== null && d.key != null ? Xt("" + d.key) : M.toString(36);
  }
  function H(d) {
    switch (d.status) {
      case "fulfilled":
        return d.value;
      case "rejected":
        throw d.reason;
      default:
        switch (typeof d.status == "string" ? d.then(Q, Q) : (d.status = "pending", d.then(
          function(M) {
            d.status === "pending" && (d.status = "fulfilled", d.value = M);
          },
          function(M) {
            d.status === "pending" && (d.status = "rejected", d.reason = M);
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
  function $(d, M, V, Z, yt) {
    var st = typeof d;
    (st === "undefined" || st === "boolean") && (d = null);
    var W = !1;
    if (d === null) W = !0;
    else
      switch (st) {
        case "bigint":
        case "string":
        case "number":
          W = !0;
          break;
        case "object":
          switch (d.$$typeof) {
            case s:
            case g:
              W = !0;
              break;
            case j:
              return W = d._init, $(
                W(d._payload),
                M,
                V,
                Z,
                yt
              );
          }
      }
    if (W)
      return yt = yt(d), W = Z === "" ? "." + dt(d, 0) : Z, Ot(yt) ? (V = "", W != null && (V = W.replace(Bt, "$&/") + "/"), $(yt, M, V, "", function(El) {
        return El;
      })) : yt != null && (ut(yt) && (yt = B(
        yt,
        V + (yt.key == null || d && d.key === yt.key ? "" : ("" + yt.key).replace(
          Bt,
          "$&/"
        ) + "/") + W
      )), M.push(yt)), 1;
    W = 0;
    var L = Z === "" ? "." : Z + ":";
    if (Ot(d))
      for (var k = 0; k < d.length; k++)
        Z = d[k], st = L + dt(Z, k), W += $(
          Z,
          M,
          V,
          st,
          yt
        );
    else if (k = St(d), typeof k == "function")
      for (d = k.call(d), k = 0; !(Z = d.next()).done; )
        Z = Z.value, st = L + dt(Z, k++), W += $(
          Z,
          M,
          V,
          st,
          yt
        );
    else if (st === "object") {
      if (typeof d.then == "function")
        return $(
          H(d),
          M,
          V,
          Z,
          yt
        );
      throw M = String(d), Error(
        "Objects are not valid as a React child (found: " + (M === "[object Object]" ? "object with keys {" + Object.keys(d).join(", ") + "}" : M) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return W;
  }
  function J(d, M, V) {
    if (d == null) return d;
    var Z = [], yt = 0;
    return $(d, Z, "", "", function(st) {
      return M.call(V, st, yt++);
    }), Z;
  }
  function Nt(d) {
    if (d._status === -1) {
      var M = d._result, V = M();
      V.then(
        function(Z) {
          (d._status === 0 || d._status === -1) && (d._status = 1, d._result = Z, V.status === void 0 && (V.status = "fulfilled", V.value = Z));
        },
        function(Z) {
          (d._status === 0 || d._status === -1) && (d._status = 2, d._result = Z, V.status === void 0 && (V.status = "rejected", V.reason = Z));
        }
      ), d._status === -1 && (d._status = 0, d._result = V);
    }
    if (d._status === 1) return d._result.default;
    throw d._result;
  }
  var Tt = typeof reportError == "function" ? reportError : function(d) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var M = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof d == "object" && d !== null && typeof d.message == "string" ? String(d.message) : String(d),
        error: d
      });
      if (!window.dispatchEvent(M)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", d);
      return;
    }
    console.error(d);
  };
  function ol(d) {
    var M = at.T, V = {};
    V.types = M !== null ? M.types : null, at.T = V;
    try {
      var Z = d(), yt = at.S;
      yt !== null && yt(V, Z), typeof Z == "object" && Z !== null && typeof Z.then == "function" && Z.then(Q, Tt);
    } catch (st) {
      Tt(st);
    } finally {
      M !== null && V.types !== null && (M.types = V.types), at.T = M;
    }
  }
  function Zl(d) {
    var M = at.T;
    if (M !== null) {
      var V = M.types;
      V === null ? M.types = [d] : V.indexOf(d) === -1 && V.push(d);
    } else ol(Zl.bind(null, d));
  }
  var Il = {
    map: J,
    forEach: function(d, M, V) {
      J(
        d,
        function() {
          M.apply(this, arguments);
        },
        V
      );
    },
    count: function(d) {
      var M = 0;
      return J(d, function() {
        M++;
      }), M;
    },
    toArray: function(d) {
      return J(d, function(M) {
        return M;
      }) || [];
    },
    only: function(d) {
      if (!ut(d))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return d;
    }
  };
  return I.Activity = T, I.Children = Il, I.Component = ft, I.Fragment = r, I.Profiler = O, I.PureComponent = Lt, I.StrictMode = f, I.Suspense = Y, I.ViewTransition = U, I.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = at, I.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(d) {
      return at.H.useMemoCache(d);
    }
  }, I.addTransitionType = Zl, I.cache = function(d) {
    return function() {
      return d.apply(null, arguments);
    };
  }, I.cacheSignal = function() {
    return null;
  }, I.cloneElement = function(d, M, V) {
    if (d == null)
      throw Error(
        "The argument must be a React element, but you passed " + d + "."
      );
    var Z = et({}, d.props), yt = d.key;
    if (M != null)
      for (st in M.key !== void 0 && (yt = "" + M.key), M)
        !P.call(M, st) || st === "key" || st === "__self" || st === "__source" || st === "ref" && M.ref === void 0 || (Z[st] = M[st]);
    var st = arguments.length - 2;
    if (st === 1) Z.children = V;
    else if (1 < st) {
      for (var W = Array(st), L = 0; L < st; L++)
        W[L] = arguments[L + 2];
      Z.children = W;
    }
    return x(d.type, yt, Z);
  }, I.createContext = function(d) {
    return d = {
      $$typeof: D,
      _currentValue: d,
      _currentValue2: d,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, d.Provider = d, d.Consumer = {
      $$typeof: _,
      _context: d
    }, d;
  }, I.createElement = function(d, M, V) {
    var Z, yt = {}, st = null;
    if (M != null)
      for (Z in M.key !== void 0 && (st = "" + M.key), M)
        P.call(M, Z) && Z !== "key" && Z !== "__self" && Z !== "__source" && (yt[Z] = M[Z]);
    var W = arguments.length - 2;
    if (W === 1) yt.children = V;
    else if (1 < W) {
      for (var L = Array(W), k = 0; k < W; k++)
        L[k] = arguments[k + 2];
      yt.children = L;
    }
    if (d && d.defaultProps)
      for (Z in W = d.defaultProps, W)
        yt[Z] === void 0 && (yt[Z] = W[Z]);
    return x(d, st, yt);
  }, I.createRef = function() {
    return { current: null };
  }, I.forwardRef = function(d) {
    return { $$typeof: C, render: d };
  }, I.isValidElement = ut, I.lazy = function(d) {
    return {
      $$typeof: j,
      _payload: { _status: -1, _result: d },
      _init: Nt
    };
  }, I.memo = function(d, M) {
    return {
      $$typeof: X,
      type: d,
      compare: M === void 0 ? null : M
    };
  }, I.startTransition = ol, I.unstable_useCacheRefresh = function() {
    return at.H.useCacheRefresh();
  }, I.use = function(d) {
    return at.H.use(d);
  }, I.useActionState = function(d, M, V) {
    return at.H.useActionState(d, M, V);
  }, I.useCallback = function(d, M) {
    return at.H.useCallback(d, M);
  }, I.useContext = function(d) {
    return at.H.useContext(d);
  }, I.useDebugValue = function() {
  }, I.useDeferredValue = function(d, M) {
    return at.H.useDeferredValue(d, M);
  }, I.useEffect = function(d, M) {
    return at.H.useEffect(d, M);
  }, I.useEffectEvent = function(d) {
    return at.H.useEffectEvent(d);
  }, I.useId = function() {
    return at.H.useId();
  }, I.useImperativeHandle = function(d, M, V) {
    return at.H.useImperativeHandle(d, M, V);
  }, I.useInsertionEffect = function(d, M) {
    return at.H.useInsertionEffect(d, M);
  }, I.useLayoutEffect = function(d, M) {
    return at.H.useLayoutEffect(d, M);
  }, I.useMemo = function(d, M) {
    return at.H.useMemo(d, M);
  }, I.useOptimistic = function(d, M) {
    return at.H.useOptimistic(d, M);
  }, I.useReducer = function(d, M, V) {
    return at.H.useReducer(d, M, V);
  }, I.useRef = function(d) {
    return at.H.useRef(d);
  }, I.useState = function(d) {
    return at.H.useState(d);
  }, I.useSyncExternalStore = function(d, M, V) {
    return at.H.useSyncExternalStore(
      d,
      M,
      V
    );
  }, I.useTransition = function() {
    return at.H.useTransition();
  }, I.version = "19.3.0", I;
}
var E0;
function Zs() {
  return E0 || (E0 = 1, xs.exports = Yy()), xs.exports;
}
var K = Zs(), Hs = { exports: {} }, Sn = {}, js = { exports: {} }, Bs = {};
var _0;
function Gy() {
  return _0 || (_0 = 1, (function(s) {
    function g(H, $) {
      var J = H.length;
      H.push($);
      t: for (; 0 < J; ) {
        var Nt = J - 1 >>> 1, Tt = H[Nt];
        if (0 < O(Tt, $))
          H[Nt] = $, H[J] = Tt, J = Nt;
        else break t;
      }
    }
    function r(H) {
      return H.length === 0 ? null : H[0];
    }
    function f(H) {
      if (H.length === 0) return null;
      var $ = H[0], J = H.pop();
      if (J !== $) {
        H[0] = J;
        t: for (var Nt = 0, Tt = H.length, ol = Tt >>> 1; Nt < ol; ) {
          var Zl = 2 * (Nt + 1) - 1, Il = H[Zl], d = Zl + 1, M = H[d];
          if (0 > O(Il, J))
            d < Tt && 0 > O(M, Il) ? (H[Nt] = M, H[d] = J, Nt = d) : (H[Nt] = Il, H[Zl] = J, Nt = Zl);
          else if (d < Tt && 0 > O(M, J))
            H[Nt] = M, H[d] = J, Nt = d;
          else break t;
        }
      }
      return $;
    }
    function O(H, $) {
      var J = H.sortIndex - $.sortIndex;
      return J !== 0 ? J : H.id - $.id;
    }
    if (s.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var _ = performance;
      s.unstable_now = function() {
        return _.now();
      };
    } else {
      var D = Date, C = D.now();
      s.unstable_now = function() {
        return D.now() - C;
      };
    }
    var Y = [], X = [], j = 1, T = null, U = 3, ct = !1, St = !1, mt = !1, et = !1, pt = typeof setTimeout == "function" ? setTimeout : null, ft = typeof clearTimeout == "function" ? clearTimeout : null, bt = typeof setImmediate < "u" ? setImmediate : null;
    function Lt(H) {
      for (var $ = r(X); $ !== null; ) {
        if ($.callback === null) f(X);
        else if ($.startTime <= H)
          f(X), $.sortIndex = $.expirationTime, g(Y, $);
        else break;
        $ = r(X);
      }
    }
    function Rt(H) {
      if (mt = !1, Lt(H), !St)
        if (r(Y) !== null)
          St = !0, Ot || (Ot = !0, ut());
        else {
          var $ = r(X);
          $ !== null && dt(Rt, $.startTime - H);
        }
    }
    var Ot = !1, Q = -1, at = 5, P = -1;
    function x() {
      return et ? !0 : !(s.unstable_now() - P < at);
    }
    function B() {
      if (et = !1, Ot) {
        var H = s.unstable_now();
        P = H;
        var $ = !0;
        try {
          t: {
            St = !1, mt && (mt = !1, ft(Q), Q = -1), ct = !0;
            var J = U;
            try {
              l: {
                for (Lt(H), T = r(Y); T !== null && !(T.expirationTime > H && x()); ) {
                  var Nt = T.callback;
                  if (typeof Nt == "function") {
                    T.callback = null, U = T.priorityLevel;
                    var Tt = Nt(
                      T.expirationTime <= H
                    );
                    if (H = s.unstable_now(), typeof Tt == "function") {
                      T.callback = Tt, Lt(H), $ = !0;
                      break l;
                    }
                    T === r(Y) && f(Y), Lt(H);
                  } else f(Y);
                  T = r(Y);
                }
                if (T !== null) $ = !0;
                else {
                  var ol = r(X);
                  ol !== null && dt(
                    Rt,
                    ol.startTime - H
                  ), $ = !1;
                }
              }
              break t;
            } finally {
              T = null, U = J, ct = !1;
            }
            $ = void 0;
          }
        } finally {
          $ ? ut() : Ot = !1;
        }
      }
    }
    var ut;
    if (typeof bt == "function")
      ut = function() {
        bt(B);
      };
    else if (typeof MessageChannel < "u") {
      var Xt = new MessageChannel(), Bt = Xt.port2;
      Xt.port1.onmessage = B, ut = function() {
        Bt.postMessage(null);
      };
    } else
      ut = function() {
        pt(B, 0);
      };
    function dt(H, $) {
      Q = pt(function() {
        H(s.unstable_now());
      }, $);
    }
    s.unstable_IdlePriority = 5, s.unstable_ImmediatePriority = 1, s.unstable_LowPriority = 4, s.unstable_NormalPriority = 3, s.unstable_Profiling = null, s.unstable_UserBlockingPriority = 2, s.unstable_cancelCallback = function(H) {
      H.callback = null;
    }, s.unstable_forceFrameRate = function(H) {
      0 > H || 125 < H ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : at = 0 < H ? Math.floor(1e3 / H) : 5;
    }, s.unstable_getCurrentPriorityLevel = function() {
      return U;
    }, s.unstable_next = function(H) {
      switch (U) {
        case 1:
        case 2:
        case 3:
          var $ = 3;
          break;
        default:
          $ = U;
      }
      var J = U;
      U = $;
      try {
        return H();
      } finally {
        U = J;
      }
    }, s.unstable_requestPaint = function() {
      et = !0;
    }, s.unstable_runWithPriority = function(H, $) {
      switch (H) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          H = 3;
      }
      var J = U;
      U = H;
      try {
        return $();
      } finally {
        U = J;
      }
    }, s.unstable_scheduleCallback = function(H, $, J) {
      var Nt = s.unstable_now();
      switch (typeof J == "object" && J !== null ? (J = J.delay, J = typeof J == "number" && 0 < J ? Nt + J : Nt) : J = Nt, H) {
        case 1:
          var Tt = -1;
          break;
        case 2:
          Tt = 250;
          break;
        case 5:
          Tt = 1073741823;
          break;
        case 4:
          Tt = 1e4;
          break;
        default:
          Tt = 5e3;
      }
      return Tt = J + Tt, H = {
        id: j++,
        callback: $,
        priorityLevel: H,
        startTime: J,
        expirationTime: Tt,
        sortIndex: -1
      }, J > Nt ? (H.sortIndex = J, g(X, H), r(Y) === null && H === r(X) && (mt ? (ft(Q), Q = -1) : mt = !0, dt(Rt, J - Nt))) : (H.sortIndex = Tt, g(Y, H), St || ct || (St = !0, Ot || (Ot = !0, ut()))), H;
    }, s.unstable_shouldYield = x, s.unstable_wrapCallback = function(H) {
      var $ = U;
      return function() {
        var J = U;
        U = $;
        try {
          return H.apply(this, arguments);
        } finally {
          U = J;
        }
      };
    };
  })(Bs)), Bs;
}
var p0;
function Ly() {
  return p0 || (p0 = 1, js.exports = Gy()), js.exports;
}
var qs = { exports: {} }, il = {};
var N0;
function Xy() {
  if (N0) return il;
  N0 = 1;
  var s = Zs();
  function g(j) {
    var T = "https://react.dev/errors/" + j;
    if (1 < arguments.length) {
      T += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var U = 2; U < arguments.length; U++)
        T += "&args[]=" + encodeURIComponent(arguments[U]);
    }
    return "Minified React error #" + j + "; visit " + T + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function r() {
  }
  var f = {
    d: {
      f: r,
      r: function() {
        throw Error(g(522));
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
  }, O = /* @__PURE__ */ Symbol.for("react.portal"), _ = /* @__PURE__ */ Symbol.for("react.recoverable"), D = /* @__PURE__ */ Symbol.for("react.optimistic_key");
  function C(j, T, U) {
    var ct = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: O,
      key: ct == null ? null : ct === D ? D : "" + ct,
      children: j,
      containerInfo: T,
      implementation: U
    };
  }
  var Y = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function X(j, T) {
    if (j === "font") return "";
    if (typeof T == "string")
      return T === "use-credentials" ? T : "";
  }
  return il.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = f, il.browser = function(j) {
    return { $$typeof: _, _reason: j };
  }, il.createPortal = function(j, T) {
    var U = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!T || T.nodeType !== 1 && T.nodeType !== 9 && T.nodeType !== 11)
      throw Error(g(299));
    return C(j, T, null, U);
  }, il.flushSync = function(j) {
    var T = Y.T, U = f.p;
    try {
      if (Y.T = null, f.p = 2, j) return j();
    } finally {
      Y.T = T, f.p = U, f.d.f();
    }
  }, il.preconnect = function(j, T) {
    typeof j == "string" && (T ? (T = T.crossOrigin, T = typeof T == "string" ? T === "use-credentials" ? T : "" : void 0) : T = null, f.d.C(j, T));
  }, il.prefetchDNS = function(j) {
    typeof j == "string" && f.d.D(j);
  }, il.preinit = function(j, T) {
    if (typeof j == "string" && T && typeof T.as == "string") {
      var U = T.as, ct = X(U, T.crossOrigin), St = typeof T.integrity == "string" ? T.integrity : void 0, mt = typeof T.fetchPriority == "string" ? T.fetchPriority : void 0;
      U === "style" ? f.d.S(
        j,
        typeof T.precedence == "string" ? T.precedence : void 0,
        {
          crossOrigin: ct,
          integrity: St,
          fetchPriority: mt
        }
      ) : U === "script" && f.d.X(j, {
        crossOrigin: ct,
        integrity: St,
        fetchPriority: mt,
        nonce: typeof T.nonce == "string" ? T.nonce : void 0
      });
    }
  }, il.preinitModule = function(j, T) {
    if (typeof j == "string")
      if (typeof T == "object" && T !== null) {
        if (T.as == null || T.as === "script") {
          var U = X(
            T.as,
            T.crossOrigin
          );
          f.d.M(j, {
            crossOrigin: U,
            integrity: typeof T.integrity == "string" ? T.integrity : void 0,
            nonce: typeof T.nonce == "string" ? T.nonce : void 0,
            fetchPriority: typeof T.fetchPriority == "string" ? T.fetchPriority : void 0
          });
        }
      } else T == null && f.d.M(j);
  }, il.preload = function(j, T) {
    if (typeof j == "string" && typeof T == "object" && T !== null && typeof T.as == "string") {
      var U = T.as, ct = X(U, T.crossOrigin);
      f.d.L(j, U, {
        crossOrigin: ct,
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
  }, il.preloadModule = function(j, T) {
    if (typeof j == "string")
      if (T) {
        var U = X(T.as, T.crossOrigin);
        f.d.m(j, {
          as: typeof T.as == "string" && T.as !== "script" ? T.as : void 0,
          crossOrigin: U,
          integrity: typeof T.integrity == "string" ? T.integrity : void 0,
          nonce: typeof T.nonce == "string" ? T.nonce : void 0,
          fetchPriority: typeof T.fetchPriority == "string" ? T.fetchPriority : void 0
        });
      } else f.d.m(j);
  }, il.requestFormReset = function(j) {
    f.d.r(j);
  }, il.unstable_batchedUpdates = function(j, T) {
    return j(T);
  }, il.useFormState = function(j, T, U) {
    return Y.H.useFormState(j, T, U);
  }, il.useFormStatus = function() {
    return Y.H.useHostTransitionStatus();
  }, il.version = "19.3.0", il;
}
var z0;
function Qy() {
  if (z0) return qs.exports;
  z0 = 1;
  function s() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s);
      } catch (g) {
        console.error(g);
      }
  }
  return s(), qs.exports = Xy(), qs.exports;
}
var O0;
function Zy() {
  if (O0) return Sn;
  O0 = 1;
  var s = Ly(), g = Zs(), r = Qy();
  function f(t) {
    var l = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      l += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var e = 2; e < arguments.length; e++)
        l += "&args[]=" + encodeURIComponent(arguments[e]);
    }
    return "Minified React error #" + t + "; visit " + l + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function O(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function _(t) {
    for (var l = t, e = l; e && !e.alternate; )
      l = e, (l.flags & 4098) !== 0 && (t = l.return), e = l.return;
    for (; l.return; ) l = l.return;
    return l.tag === 3 ? t : null;
  }
  function D(t) {
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
  function Y(t) {
    if (_(t) !== t)
      throw Error(f(188));
  }
  function X(t) {
    var l = t.alternate;
    if (!l) {
      if (l = _(t), l === null) throw Error(f(188));
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
          if (n === e) return Y(u), t;
          if (n === a) return Y(u), l;
          n = n.sibling;
        }
        throw Error(f(188));
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
          if (!i) throw Error(f(189));
        }
      }
      if (e.alternate !== a) throw Error(f(190));
    }
    if (e.tag !== 3) throw Error(f(188));
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
  function U(t) {
    for (t = t.return; t !== null; ) {
      if (t.tag === 3 || t.tag === 5 || t.tag === 27) return t;
      t = t.return;
    }
    return null;
  }
  function ct(t) {
    var l = !1;
    for (t = t.return; t !== null && (t.tag === 4 && (l = !0), !(t.tag === 3 || t.tag === 5 || t.tag === 27)); )
      t = t.return;
    return l;
  }
  function St(t) {
    var l = [null, null], e = U(t);
    return e === null || mt(
      l,
      t,
      e.child,
      { foundSelf: !1 }
    ), l;
  }
  function mt(t, l, e, a) {
    for (; e !== null; ) {
      if (e === l) a.foundSelf = !0;
      else if (e.tag === 5 || e.tag === 27 || e.tag === 6) {
        if (a.foundSelf) return t[1] = e, !0;
        t[0] = e;
      } else if ((e.tag !== 22 || e.memoizedState === null) && mt(
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
  function et(t) {
    switch (t.tag) {
      case 5:
      case 27:
      case 6:
        return t.stateNode;
      case 3:
        return t.stateNode.containerInfo;
      default:
        throw Error(f(559));
    }
  }
  var pt = null, ft = null;
  function bt(t, l, e) {
    return t === e ? !0 : t === l ? (pt = t, !0) : !1;
  }
  function Lt(t, l, e) {
    return t === e ? (ft = t, !1) : t === l ? (ft !== null && (pt = t), !0) : !1;
  }
  function Rt(t) {
    if (t === null) return null;
    do
      t = t === null ? null : t.return;
    while (t && t.tag !== 5 && t.tag !== 27 && t.tag !== 3);
    return t || null;
  }
  function Ot(t, l, e) {
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
  var Q = Object.assign, at = /* @__PURE__ */ Symbol.for("react.element"), P = /* @__PURE__ */ Symbol.for("react.transitional.element"), x = /* @__PURE__ */ Symbol.for("react.portal"), B = /* @__PURE__ */ Symbol.for("react.fragment"), ut = /* @__PURE__ */ Symbol.for("react.strict_mode"), Xt = /* @__PURE__ */ Symbol.for("react.profiler"), Bt = /* @__PURE__ */ Symbol.for("react.consumer"), dt = /* @__PURE__ */ Symbol.for("react.context"), H = /* @__PURE__ */ Symbol.for("react.forward_ref"), $ = /* @__PURE__ */ Symbol.for("react.suspense"), J = /* @__PURE__ */ Symbol.for("react.suspense_list"), Nt = /* @__PURE__ */ Symbol.for("react.memo"), Tt = /* @__PURE__ */ Symbol.for("react.lazy"), ol = /* @__PURE__ */ Symbol.for("react.activity"), Zl = /* @__PURE__ */ Symbol.for("react.legacy_hidden"), Il = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), d = /* @__PURE__ */ Symbol.for("react.view_transition"), M = /* @__PURE__ */ Symbol.for("react.recoverable"), V = Symbol.iterator;
  function Z(t) {
    return t === null || typeof t != "object" ? null : (t = V && t[V] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var yt = /* @__PURE__ */ Symbol.for("react.client.reference");
  function st(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === yt ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case B:
        return "Fragment";
      case Xt:
        return "Profiler";
      case ut:
        return "StrictMode";
      case $:
        return "Suspense";
      case J:
        return "SuspenseList";
      case ol:
        return "Activity";
      case d:
        return "ViewTransition";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case x:
          return "Portal";
        case dt:
          return t.displayName || "Context";
        case Bt:
          return (t._context.displayName || "Context") + ".Consumer";
        case H:
          var l = t.render;
          return t = t.displayName, t || (t = l.displayName || l.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case Nt:
          return l = t.displayName || null, l !== null ? l : st(t.type) || "Memo";
        case Tt:
          l = t._payload, t = t._init;
          try {
            return st(t(l));
          } catch {
          }
      }
    return null;
  }
  var W = Array.isArray, L = g.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, k = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, El = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, _u = [], re = -1;
  function xl(t) {
    return { current: t };
  }
  function Jt(t) {
    0 > re || (t.current = _u[re], _u[re] = null, re--);
  }
  function z(t, l) {
    re++, _u[re] = t.current, t.current = l;
  }
  var nt = xl(null), cl = xl(null), $t = xl(null), Pl = xl(null);
  function Me(t, l) {
    switch (z($t, l), z(cl, t), z(nt, null), l.nodeType) {
      case 9:
      case 11:
        t = (t = l.documentElement) && (t = t.namespaceURI) ? Ad(t) : 0;
        break;
      default:
        if (t = l.tagName, l = l.namespaceURI)
          l = Ad(l), t = Md(l, t);
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
    Jt(nt), z(nt, t);
  }
  function Ca() {
    Jt(nt), Jt(cl), Jt($t);
  }
  function ki(t) {
    var l = t.memoizedState;
    l !== null && (gu._currentValue = l.memoizedState, z(Pl, t)), l = nt.current;
    var e = Md(l, t.type);
    l !== e && (z(cl, t), z(nt, e));
  }
  function Tn(t) {
    cl.current === t && (Jt(nt), Jt(cl)), Pl.current === t && (Jt(Pl), gu._currentValue = El);
  }
  var Ii, Js;
  function De(t) {
    if (Ii === void 0)
      try {
        throw Error();
      } catch (e) {
        var l = e.stack.trim().match(/\n( *(at )?)/);
        Ii = l && l[1] || "", Js = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Ii + t + Js;
  }
  var Pi = !1;
  function tc(t, l) {
    if (!t || Pi) return "";
    Pi = !0;
    var e = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (l) {
              var N = function() {
                throw Error();
              };
              if (Object.defineProperty(N.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(N, []);
                } catch (R) {
                  var v = R;
                }
                Reflect.construct(t, [], N);
              } else {
                try {
                  N.call();
                } catch (R) {
                  v = R;
                }
                N = !1;
                try {
                  var b = Object.getOwnPropertyDescriptor(
                    t.prototype,
                    "props"
                  );
                  Object.defineProperty(t.prototype, "props", {
                    configurable: !0,
                    set: function() {
                      throw Error();
                    }
                  }), N = !0, new t();
                } finally {
                  N && (b !== void 0 ? Object.defineProperty(t.prototype, "props", b) : delete t.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (R) {
                v = R;
              }
              (N = t()) && typeof N.catch == "function" && N.catch(function() {
              });
            }
          } catch (R) {
            if (R && v && typeof R.stack == "string")
              return [R.stack, v.stack];
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
        var o = i.split(`
`), y = c.split(`
`);
        for (u = a = 0; a < o.length && !o[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; u < y.length && !y[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (a === o.length || u === y.length)
          for (a = o.length - 1, u = y.length - 1; 1 <= a && 0 <= u && o[a] !== y[u]; )
            u--;
        for (; 1 <= a && 0 <= u; a--, u--)
          if (o[a] !== y[u]) {
            if (a !== 1 || u !== 1)
              do
                if (a--, u--, 0 > u || o[a] !== y[u]) {
                  var E = `
` + o[a].replace(" at new ", " at ");
                  return t.displayName && E.includes("<anonymous>") && (E = E.replace("<anonymous>", t.displayName)), E;
                }
              while (1 <= a && 0 <= u);
            break;
          }
      }
    } finally {
      Pi = !1, Error.prepareStackTrace = e;
    }
    return (e = t ? t.displayName || t.name : "") ? De(e) : "";
  }
  function L0(t, l) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return De(t.type);
      case 16:
        return De("Lazy");
      case 13:
        return t.child !== l && l !== null ? De("Suspense Fallback") : De("Suspense");
      case 19:
        return De("SuspenseList");
      case 0:
      case 15:
        return tc(t.type, !1);
      case 11:
        return tc(t.type.render, !1);
      case 1:
        return tc(t.type, !0);
      case 31:
        return De("Activity");
      case 30:
        return De("ViewTransition");
      default:
        return "";
    }
  }
  function $s(t) {
    try {
      var l = "", e = null;
      do
        l += L0(t, e), e = t, t = t.return;
      while (t);
      return l;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var lc = Object.prototype.hasOwnProperty, ec = s.unstable_scheduleCallback, ac = s.unstable_cancelCallback, X0 = s.unstable_shouldYield, Q0 = s.unstable_requestPaint, _l = s.unstable_now, Z0 = s.unstable_getCurrentPriorityLevel, Fs = s.unstable_ImmediatePriority, Ws = s.unstable_UserBlockingPriority, En = s.unstable_NormalPriority, V0 = s.unstable_LowPriority, ks = s.unstable_IdlePriority, w0 = s.log, K0 = s.unstable_setDisableYieldValue, pu = null, pl = null;
  function Ce(t) {
    if (typeof w0 == "function" && K0(t), pl && typeof pl.setStrictMode == "function")
      try {
        pl.setStrictMode(pu, t);
      } catch {
      }
  }
  var Nl = Math.clz32 ? Math.clz32 : F0, J0 = Math.log, $0 = Math.LN2;
  function F0(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (J0(t) / $0 | 0) | 0;
  }
  var _n = 256, pn = 262144, Nn = 4194304;
  function aa(t) {
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
  function zn(t, l, e) {
    var a = t.pendingLanes;
    if (a === 0) return 0;
    var u = 0, n = t.suspendedLanes, i = t.pingedLanes;
    t = t.warmLanes;
    var c = a & 134217727;
    return c !== 0 ? (a = c & ~n, a !== 0 ? u = aa(a) : (i &= c, i !== 0 ? u = aa(i) : e || (e = c & ~t, e !== 0 && (u = aa(e))))) : (c = a & ~n, c !== 0 ? u = aa(c) : i !== 0 ? u = aa(i) : e || (e = a & ~t, e !== 0 && (u = aa(e)))), u === 0 ? 0 : l !== 0 && l !== u && (l & n) === 0 && (n = u & -u, e = l & -l, n >= e || n === 32 && (e & 4194048) !== 0) ? l : u;
  }
  function Nu(t, l) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & l) === 0;
  }
  function Is(t, l) {
    (l & 8) !== 0 && (l |= l & 32);
    var e = t.entangledLanes;
    if (e !== 0)
      for (t = t.entanglements, e &= l; 0 < e; ) {
        var a = 31 - Nl(e), u = 1 << a;
        l |= t[a], e &= ~u;
      }
    return l;
  }
  function W0(t, l) {
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
  function Ps() {
    var t = Nn;
    return Nn <<= 1, (Nn & 62914560) === 0 && (Nn = 4194304), t;
  }
  function uc(t) {
    for (var l = [], e = 0; 31 > e; e++) l.push(t);
    return l;
  }
  function zu(t, l) {
    t.pendingLanes |= l, l !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function k0(t, l, e, a, u, n) {
    var i = t.pendingLanes;
    t.pendingLanes = e, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= e, t.entangledLanes &= e, t.errorRecoveryDisabledLanes &= e, t.shellSuspendCounter = 0;
    var c = t.entanglements, o = t.expirationTimes, y = t.hiddenUpdates;
    for (e = i & ~e; 0 < e; ) {
      var E = 31 - Nl(e), N = 1 << E;
      c[E] = 0, o[E] = -1;
      var v = y[E];
      if (v !== null)
        for (y[E] = null, E = 0; E < v.length; E++) {
          var b = v[E];
          b !== null && (b.lane &= -536870913);
        }
      e &= ~N;
    }
    a !== 0 && to(t, a, 0), n !== 0 && u === 0 && t.tag !== 0 && (t.suspendedLanes |= n & ~(i & ~l));
  }
  function to(t, l, e) {
    t.pendingLanes |= l, t.suspendedLanes &= ~l;
    var a = 31 - Nl(l);
    t.entangledLanes |= l, t.entanglements[a] = t.entanglements[a] | 1073741824 | e & 261930;
  }
  function lo(t, l) {
    var e = t.entangledLanes |= l;
    for (t = t.entanglements; e; ) {
      var a = 31 - Nl(e), u = 1 << a;
      u & l | t[a] & l && (t[a] |= l), e &= ~u;
    }
  }
  function eo(t, l) {
    var e = l & -l;
    return e = (e & 42) !== 0 ? 1 : nc(e), (e & (t.suspendedLanes | l)) !== 0 ? 0 : e;
  }
  function nc(t) {
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
  function ic(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function ao() {
    var t = k.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : r0(t.type));
  }
  function uo(t, l) {
    var e = k.p;
    try {
      return k.p = t, l();
    } finally {
      k.p = e;
    }
  }
  var me = Math.random().toString(36).slice(2), tl = "__reactFiber$" + me, hl = "__reactProps$" + me, Ua = "__reactContainer$" + me, no = "__reactEvents$" + me, I0 = "__reactListeners$" + me, P0 = "__reactHandles$" + me, io = "__reactResources$" + me, Ou = "__reactMarker$" + me, On = "__reactLoad$" + me;
  function An(t) {
    delete t[tl], delete t[hl], delete t[I0], delete t[P0];
  }
  function ua(t) {
    var l;
    if (l = t[tl]) return l;
    for (var e = t.parentNode; e; ) {
      if (l = e[Ua] || e[tl]) {
        if (e = l.alternate, l.child !== null || e !== null && e.child !== null)
          for (t = wd(t); t !== null; ) {
            if (e = t[tl]) return e;
            t = wd(t);
          }
        return l;
      }
      t = e, e = t.parentNode;
    }
    return null;
  }
  function Ra(t) {
    if (t = t[tl] || t[Ua]) {
      var l = t.tag;
      if (l === 5 || l === 6 || l === 13 || l === 31 || l === 26 || l === 27 || l === 3)
        return t;
    }
    return null;
  }
  function Au(t) {
    var l = t.tag;
    if (l === 5 || l === 26 || l === 27 || l === 6) return t.stateNode;
    throw Error(f(33));
  }
  function xa(t) {
    var l = t[io];
    return l || (l = t[io] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), l;
  }
  function Wt(t) {
    t[Ou] = !0;
  }
  function co(t) {
    t[On] = void 0;
  }
  var fo = /* @__PURE__ */ new Set(), so = {};
  function na(t, l) {
    Ha(t, l), Ha(t + "Capture", l);
  }
  function Ha(t, l) {
    for (so[t] = l, t = 0; t < l.length; t++)
      fo.add(l[t]);
  }
  var tv = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), oo = {}, ro = {};
  function lv(t) {
    return lc.call(ro, t) ? !0 : lc.call(oo, t) ? !1 : tv.test(t) ? ro[t] = !0 : (oo[t] = !0, !1);
  }
  var Et = !1;
  function mo() {
    var t = Et;
    return Et = !1, t;
  }
  function Mn(t, l, e) {
    if (lv(l))
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
  function Dn(t, l, e) {
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
  function de(t, l, e, a) {
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
  function zl(t) {
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
  function vo(t) {
    var l = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (l === "checkbox" || l === "radio");
  }
  function ev(t, l, e) {
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
  function cc(t) {
    if (!t._valueTracker) {
      var l = vo(t) ? "checked" : "value";
      t._valueTracker = ev(
        t,
        l,
        "" + t[l]
      );
    }
  }
  function ho(t) {
    if (!t) return !1;
    var l = t._valueTracker;
    if (!l) return !0;
    var e = l.getValue(), a = "";
    return t && (a = vo(t) ? t.checked ? "true" : "false" : t.value), t = a, t !== e ? (l.setValue(t), !0) : !1;
  }
  var av = /[\n"\\]/g;
  function Hl(t) {
    return t.replace(
      av,
      function(l) {
        return "\\" + l.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function fc(t, l, e, a, u, n, i, c) {
    t.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? t.type = i : t.removeAttribute("type"), l != null ? i === "number" ? (l === 0 && t.value === "" || t.value != l) && (t.value = "" + zl(l)) : t.value !== "" + zl(l) && (t.value = "" + zl(l)) : i !== "submit" && i !== "reset" || t.removeAttribute("value"), l != null ? i === "number" && t.value == l ? sc(t, zl(t.value)) : sc(t, zl(l)) : e != null ? sc(t, zl(e)) : a != null && t.removeAttribute("value"), u == null && n != null && (t.defaultChecked = !!n), u != null && (t.checked = u && typeof u != "function" && typeof u != "symbol"), c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? t.name = "" + zl(c) : t.removeAttribute("name");
  }
  function yo(t, l, e, a, u, n, i, c) {
    if (n != null && typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" && (t.type = n), l != null || e != null) {
      if (!(n !== "submit" && n !== "reset" || l != null)) {
        cc(t);
        return;
      }
      e = e != null ? "" + zl(e) : "", l = l != null ? "" + zl(l) : e, c || l === t.value || (t.value = l), t.defaultValue = l;
    }
    a = a ?? u, a = typeof a != "function" && typeof a != "symbol" && !!a, t.checked = c ? t.checked : !!a, t.defaultChecked = !!a, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (t.name = i), cc(t);
  }
  function sc(t, l) {
    t.defaultValue !== "" + l && (t.defaultValue = "" + l);
  }
  function ja(t, l, e, a) {
    if (t = t.options, l) {
      l = {};
      for (var u = 0; u < e.length; u++)
        l["$" + e[u]] = !0;
      for (e = 0; e < t.length; e++)
        u = l.hasOwnProperty("$" + t[e].value), t[e].selected !== u && (t[e].selected = u), u && a && (t[e].defaultSelected = !0);
    } else {
      for (e = "" + zl(e), l = null, u = 0; u < t.length; u++) {
        if (t[u].value === e) {
          t[u].selected = !0, a && (t[u].defaultSelected = !0);
          return;
        }
        l !== null || t[u].disabled || (l = t[u]);
      }
      l !== null && (l.selected = !0);
    }
  }
  function go(t, l, e) {
    if (l != null && (l = "" + zl(l), l !== t.value && (t.value = l), e == null)) {
      t.defaultValue !== l && (t.defaultValue = l);
      return;
    }
    t.defaultValue = e != null ? "" + zl(e) : "";
  }
  function So(t, l, e, a) {
    if (l == null) {
      if (a != null) {
        if (e != null) throw Error(f(92));
        if (W(a)) {
          if (1 < a.length) throw Error(f(93));
          a = a[0];
        }
        e = a;
      }
      e == null && (e = ""), l = e;
    }
    e = zl(l), t.defaultValue = e, a = t.textContent, a === e && a !== "" && a !== null && (t.value = a), cc(t);
  }
  function Ba(t, l) {
    if (l) {
      var e = t.firstChild;
      if (e && e === t.lastChild && e.nodeType === 3) {
        e.nodeValue = l;
        return;
      }
    }
    t.textContent = l;
  }
  var uv = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function bo(t, l, e) {
    var a = l.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === "" ? a ? t.setProperty(l, "") : l === "float" ? t.cssFloat = "" : t[l] = "" : a ? t.setProperty(l, e) : typeof e != "number" || e === 0 || uv.has(l) ? l === "float" ? t.cssFloat = e : t[l] = ("" + e).trim() : t[l] = e + "px";
  }
  function To(t, l, e) {
    if (l != null && typeof l != "object")
      throw Error(f(62));
    if (t = t.style, e != null) {
      for (var a in e)
        !e.hasOwnProperty(a) || l != null && l.hasOwnProperty(a) || (a.indexOf("--") === 0 ? t.setProperty(a, "") : a === "float" ? t.cssFloat = "" : t[a] = "", Et = !0);
      for (var u in l)
        a = l[u], l.hasOwnProperty(u) && e[u] !== a && (bo(t, u, a), Et = !0);
    } else
      for (var n in l)
        l.hasOwnProperty(n) && bo(t, n, l[n]);
  }
  function oc(t) {
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
  var nv = /* @__PURE__ */ new Map([
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
  ]), iv = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Cn(t) {
    return iv.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function te() {
  }
  var rc = null;
  function mc(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var qa = null, Ya = null;
  function Eo(t) {
    var l = Ra(t);
    if (l && (t = l.stateNode)) {
      var e = t[hl] || null;
      t: switch (t = l.stateNode, l.type) {
        case "input":
          if (fc(
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
              'input[name="' + Hl(
                "" + l
              ) + '"][type="radio"]'
            ), l = 0; l < e.length; l++) {
              var a = e[l];
              if (a !== t && a.form === t.form) {
                var u = a[hl] || null;
                if (!u) throw Error(f(90));
                fc(
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
              a = e[l], a.form === t.form && ho(a);
          }
          break t;
        case "textarea":
          go(t, e.value, e.defaultValue);
          break t;
        case "select":
          l = e.value, l != null && ja(t, !!e.multiple, l, !1);
      }
    }
  }
  var dc = !1;
  function _o(t, l, e) {
    if (dc) return t(l, e);
    dc = !0;
    try {
      var a = t(l);
      return a;
    } finally {
      if (dc = !1, (qa !== null || Ya !== null) && (Ci(), qa && (l = qa, t = Ya, Ya = qa = null, Eo(l), t)))
        for (l = 0; l < t.length; l++) Eo(t[l]);
    }
  }
  function Mu(t, l) {
    var e = t.stateNode;
    if (e === null) return null;
    var a = e[hl] || null;
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
        f(231, l, typeof e)
      );
    return e;
  }
  var ve = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), vc = !1;
  if (ve)
    try {
      var Du = {};
      Object.defineProperty(Du, "passive", {
        get: function() {
          vc = !0;
        }
      }), window.addEventListener("test", Du, Du), window.removeEventListener("test", Du, Du);
    } catch {
      vc = !1;
    }
  var Ue = null, hc = null, Un = null;
  function po() {
    if (Un) return Un;
    var t, l = hc, e = l.length, a, u = "value" in Ue ? Ue.value : Ue.textContent, n = u.length;
    for (t = 0; t < e && l[t] === u[t]; t++) ;
    var i = e - t;
    for (a = 1; a <= i && l[e - a] === u[n - a]; a++) ;
    return Un = u.slice(t, 1 < a ? 1 - a : void 0);
  }
  function Rn(t) {
    var l = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && l === 13 && (t = 13)) : t = l, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function xn() {
    return !0;
  }
  function No() {
    return !1;
  }
  function rl(t) {
    function l(e, a, u, n, i) {
      this._reactName = e, this._targetInst = u, this.type = a, this.nativeEvent = n, this.target = i, this.currentTarget = null;
      for (var c in t)
        t.hasOwnProperty(c) && (e = t[c], this[c] = e ? e(n) : n[c]);
      return this.isDefaultPrevented = (n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1) ? xn : No, this.isPropagationStopped = No, this;
    }
    return Q(l.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var e = this.nativeEvent;
        e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = xn);
      },
      stopPropagation: function() {
        var e = this.nativeEvent;
        e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = xn);
      },
      persist: function() {
      },
      isPersistent: xn
    }), l;
  }
  var Re = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Hn = rl(Re), Cu = Q({}, Re, { view: 0, detail: 0 }), cv = rl(Cu), yc, gc, Uu, jn = Q({}, Cu, {
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
    getModifierState: bc,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== Uu && (Uu && t.type === "mousemove" ? (yc = t.screenX - Uu.screenX, gc = t.screenY - Uu.screenY) : gc = yc = 0, Uu = t), yc);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : gc;
    }
  }), zo = rl(jn), fv = Q({}, jn, { dataTransfer: 0 }), sv = rl(fv), ov = Q({}, Cu, { relatedTarget: 0 }), Sc = rl(ov), rv = Q({}, Re, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), mv = rl(rv), dv = Q({}, Re, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), vv = rl(dv), hv = Q({}, Re, { data: 0 }), Oo = rl(hv), yv = {
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
  }, gv = {
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
  }, Sv = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function bv(t) {
    var l = this.nativeEvent;
    return l.getModifierState ? l.getModifierState(t) : (t = Sv[t]) ? !!l[t] : !1;
  }
  function bc() {
    return bv;
  }
  var Tv = Q({}, Cu, {
    key: function(t) {
      if (t.key) {
        var l = yv[t.key] || t.key;
        if (l !== "Unidentified") return l;
      }
      return t.type === "keypress" ? (t = Rn(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? gv[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: bc,
    charCode: function(t) {
      return t.type === "keypress" ? Rn(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? Rn(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), Ev = rl(Tv), _v = Q({}, jn, {
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
  }), Ao = rl(_v), pv = Q({}, Re, { submitter: 0 }), Nv = rl(pv), zv = Q({}, Cu, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: bc
  }), Ov = rl(zv), Av = Q({}, Re, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Mv = rl(Av), Dv = Q({}, jn, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Cv = rl(Dv), Uv = Q({}, Re, {
    newState: 0,
    oldState: 0,
    source: 0
  }), Rv = rl(Uv), xv = [9, 13, 27, 32], Tc = ve && "CompositionEvent" in window, Ru = null;
  ve && "documentMode" in document && (Ru = document.documentMode);
  var Hv = ve && "TextEvent" in window && !Ru, Mo = ve && (!Tc || Ru && 8 < Ru && 11 >= Ru), Do = " ", Co = !1;
  function Uo(t, l) {
    switch (t) {
      case "keyup":
        return xv.indexOf(l.keyCode) !== -1;
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
  function Ro(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var Ga = !1;
  function jv(t, l) {
    switch (t) {
      case "compositionend":
        return Ro(l);
      case "keypress":
        return l.which !== 32 ? null : (Co = !0, Do);
      case "textInput":
        return t = l.data, t === Do && Co ? null : t;
      default:
        return null;
    }
  }
  function Bv(t, l) {
    if (Ga)
      return t === "compositionend" || !Tc && Uo(t, l) ? (t = po(), Un = hc = Ue = null, Ga = !1, t) : null;
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
        return Mo && l.locale !== "ko" ? null : l.data;
      default:
        return null;
    }
  }
  var qv = {
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
  function xo(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l === "input" ? !!qv[t.type] : l === "textarea";
  }
  function Ho(t, l, e, a) {
    qa ? Ya ? Ya.push(a) : Ya = [a] : qa = a, l = Bi(l, "onChange"), 0 < l.length && (e = new Hn(
      "onChange",
      "change",
      null,
      e,
      a
    ), t.push({ event: e, listeners: l }));
  }
  var xu = null, Hu = null;
  function Yv(t) {
    Ed(t, 0);
  }
  function Bn(t) {
    var l = Au(t);
    if (ho(l)) return t;
  }
  function jo(t, l) {
    if (t === "change") return l;
  }
  var Bo = !1;
  if (ve) {
    var Ec;
    if (ve) {
      var _c = "oninput" in document;
      if (!_c) {
        var qo = document.createElement("div");
        qo.setAttribute("oninput", "return;"), _c = typeof qo.oninput == "function";
      }
      Ec = _c;
    } else Ec = !1;
    Bo = Ec && (!document.documentMode || 9 < document.documentMode);
  }
  function Yo() {
    xu && (xu.detachEvent("onpropertychange", Go), Hu = xu = null);
  }
  function Go(t) {
    if (t.propertyName === "value" && Bn(Hu)) {
      var l = [];
      Ho(
        l,
        Hu,
        t,
        mc(t)
      ), _o(Yv, l);
    }
  }
  function Gv(t, l, e) {
    t === "focusin" ? (Yo(), xu = l, Hu = e, xu.attachEvent("onpropertychange", Go)) : t === "focusout" && Yo();
  }
  function Lv(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return Bn(Hu);
  }
  function Xv(t, l) {
    if (t === "click") return Bn(l);
  }
  function Qv(t, l) {
    if (t === "input" || t === "change")
      return Bn(l);
  }
  function Zv(t, l) {
    return t === l && (t !== 0 || 1 / t === 1 / l) || t !== t && l !== l;
  }
  var Ol = typeof Object.is == "function" ? Object.is : Zv;
  function ju(t, l) {
    if (Ol(t, l)) return !0;
    if (typeof t != "object" || t === null || typeof l != "object" || l === null)
      return !1;
    var e = Object.keys(t), a = Object.keys(l);
    if (e.length !== a.length) return !1;
    for (a = 0; a < e.length; a++) {
      var u = e[a];
      if (!lc.call(l, u) || !Ol(t[u], l[u]))
        return !1;
    }
    return !0;
  }
  function pc(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  function Lo(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Xo(t, l) {
    var e = Lo(t);
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
      e = Lo(e);
    }
  }
  function Qo(t, l) {
    return t && l ? t === l ? !0 : t && t.nodeType === 3 ? !1 : l && l.nodeType === 3 ? Qo(t, l.parentNode) : "contains" in t ? t.contains(l) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(l) & 16) : !1 : !1;
  }
  function Zo(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var l = pc(t.document); l instanceof t.HTMLIFrameElement; ) {
      try {
        var e = typeof l.contentWindow.location.href == "string";
      } catch {
        e = !1;
      }
      if (e) t = l.contentWindow;
      else break;
      l = pc(t.document);
    }
    return l;
  }
  function Nc(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l && (l === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || l === "textarea" || t.contentEditable === "true");
  }
  var Vv = ve && "documentMode" in document && 11 >= document.documentMode, La = null, zc = null, Bu = null, Oc = !1;
  function Vo(t, l, e) {
    var a = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    Oc || La == null || La !== pc(a) || (a = La, "selectionStart" in a && Nc(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), Bu && ju(Bu, a) || (Bu = a, a = Bi(zc, "onSelect"), 0 < a.length && (l = new Hn(
      "onSelect",
      "select",
      null,
      l,
      e
    ), t.push({ event: l, listeners: a }), l.target = La)));
  }
  function ia(t, l) {
    var e = {};
    return e[t.toLowerCase()] = l.toLowerCase(), e["Webkit" + t] = "webkit" + l, e["Moz" + t] = "moz" + l, e;
  }
  var Xa = {
    animationend: ia("Animation", "AnimationEnd"),
    animationiteration: ia("Animation", "AnimationIteration"),
    animationstart: ia("Animation", "AnimationStart"),
    transitionrun: ia("Transition", "TransitionRun"),
    transitionstart: ia("Transition", "TransitionStart"),
    transitioncancel: ia("Transition", "TransitionCancel"),
    transitionend: ia("Transition", "TransitionEnd")
  }, Ac = {}, wo = {};
  ve && (wo = document.createElement("div").style, "AnimationEvent" in window || (delete Xa.animationend.animation, delete Xa.animationiteration.animation, delete Xa.animationstart.animation), "TransitionEvent" in window || delete Xa.transitionend.transition);
  function ca(t) {
    if (Ac[t]) return Ac[t];
    if (!Xa[t]) return t;
    var l = Xa[t], e;
    for (e in l)
      if (l.hasOwnProperty(e) && e in wo)
        return Ac[t] = l[e];
    return t;
  }
  var Ko = ca("animationend"), Jo = ca("animationiteration"), $o = ca("animationstart"), wv = ca("transitionrun"), Kv = ca("transitionstart"), Jv = ca("transitioncancel"), Fo = ca("transitionend"), Wo = /* @__PURE__ */ new Map(), Mc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Mc.push("scrollEnd");
  function Vl(t, l) {
    Wo.set(t, l), na(l, [t]);
  }
  var $v = 0;
  function he(t, l) {
    if (t.name != null && t.name !== "auto") return t.name;
    if (l.autoName !== null) return l.autoName;
    t = $l.identifierPrefix;
    var e = $v++;
    return t = "_" + t + "t_" + e.toString(32) + "_", l.autoName = t;
  }
  function ko(t) {
    if (t == null || typeof t == "string")
      return t;
    var l = null, e = cu;
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
  function ye(t, l) {
    return t = ko(t), l = ko(l), l == null ? t === "auto" ? null : t : l === "auto" ? null : l;
  }
  var qn = typeof reportError == "function" ? reportError : function(t) {
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
  }, jl = [], Qa = 0, Dc = 0;
  function Yn() {
    for (var t = Qa, l = Dc = Qa = 0; l < t; ) {
      var e = jl[l];
      jl[l++] = null;
      var a = jl[l];
      jl[l++] = null;
      var u = jl[l];
      jl[l++] = null;
      var n = jl[l];
      if (jl[l++] = null, a !== null && u !== null) {
        var i = a.pending;
        i === null ? u.next = u : (u.next = i.next, i.next = u), a.pending = u;
      }
      n !== 0 && Io(e, u, n);
    }
  }
  function Gn(t, l, e, a) {
    jl[Qa++] = t, jl[Qa++] = l, jl[Qa++] = e, jl[Qa++] = a, Dc |= a, t.lanes |= a, t = t.alternate, t !== null && (t.lanes |= a);
  }
  function Cc(t, l, e, a) {
    return Gn(t, l, e, a), Ln(t);
  }
  function fa(t, l) {
    return Gn(t, null, null, l), Ln(t);
  }
  function Io(t, l, e) {
    t.lanes |= e;
    var a = t.alternate;
    a !== null && (a.lanes |= e);
    for (var u = !1, n = t.return; n !== null; )
      n.childLanes |= e, a = n.alternate, a !== null && (a.childLanes |= e), n.tag === 22 && (t = n.stateNode, t === null || t._visibility & 1 || (u = !0)), t = n, n = n.return;
    return t.tag === 3 ? (n = t.stateNode, u && l !== null && (u = 31 - Nl(e), t = n.hiddenUpdates, a = t[u], a === null ? t[u] = [l] : a.push(l), l.lane = e | 536870912), n) : null;
  }
  function Ln(t) {
    if (50 < un)
      throw un = 0, Di = null, Error(f(185));
    for (var l = t.return; l !== null; )
      t = l, l = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var Za = {};
  function Fv(t, l, e, a) {
    this.tag = t, this.key = e, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = l, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function yl(t, l, e, a) {
    return new Fv(t, l, e, a);
  }
  function Uc(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function ge(t, l) {
    var e = t.alternate;
    return e === null ? (e = yl(
      t.tag,
      l,
      t.key,
      t.mode
    ), e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.alternate = t, t.alternate = e) : (e.pendingProps = l, e.type = t.type, e.flags = 0, e.subtreeFlags = 0, e.deletions = null), e.flags = t.flags & 1206910976, e.childLanes = t.childLanes, e.lanes = t.lanes, e.child = t.child, e.memoizedProps = t.memoizedProps, e.memoizedState = t.memoizedState, e.updateQueue = t.updateQueue, l = t.dependencies, e.dependencies = l === null ? null : { lanes: l.lanes, firstContext: l.firstContext }, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.refCleanup = t.refCleanup, e;
  }
  function Po(t, l) {
    t.flags &= 1206910978;
    var e = t.alternate;
    return e === null ? (t.childLanes = 0, t.lanes = l, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = e.childLanes, t.lanes = e.lanes, t.child = e.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = e.memoizedProps, t.memoizedState = e.memoizedState, t.updateQueue = e.updateQueue, t.type = e.type, l = e.dependencies, t.dependencies = l === null ? null : {
      lanes: l.lanes,
      firstContext: l.firstContext
    }), t;
  }
  function Xn(t, l, e, a, u, n) {
    var i = 0;
    if (a = t, typeof a == "function") Uc(a) && (i = 1);
    else if (typeof a == "string")
      i = py(
        t,
        e,
        nt.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (a) {
        case ol:
          return t = yl(31, e, l, u), t.elementType = ol, t.lanes = n, t;
        case B:
          return sa(e.children, u, n, l);
        case ut:
          i = 8, u |= 24;
          break;
        case Xt:
          return t = yl(12, e, l, u | 2), t.elementType = Xt, t.lanes = n, t;
        case $:
          return t = yl(13, e, l, u), t.elementType = $, t.lanes = n, t;
        case J:
          return t = yl(19, e, l, u), t.elementType = J, t.lanes = n, t;
        case Zl:
        case d:
          return t = u | 32, t = yl(30, e, l, t), t.elementType = d, t.lanes = n, t.stateNode = {
            autoName: null,
            paired: null,
            clones: null,
            ref: null
          }, t;
        default:
          if (typeof a == "object" && a !== null)
            switch (a.$$typeof) {
              case dt:
                i = 10;
                break t;
              case Bt:
                i = 9;
                break t;
              case H:
                i = 11;
                break t;
              case Nt:
                i = 14;
                break t;
              case Tt:
                i = 16, a = null;
                break t;
            }
          i = 29, e = Error(
            f(130, t === null ? "null" : typeof t, "")
          ), a = null;
      }
    return l = yl(i, e, l, u), l.elementType = t, l.type = a, l.lanes = n, l;
  }
  function sa(t, l, e, a) {
    return t = yl(7, t, a, l), t.lanes = e, t;
  }
  function Rc(t, l, e) {
    return t = yl(6, t, null, l), t.lanes = e, t;
  }
  function tr(t) {
    var l = yl(18, null, null, 0);
    return l.stateNode = t, l;
  }
  function xc(t, l, e) {
    return l = yl(
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
  var lr = /* @__PURE__ */ new WeakMap();
  function Bl(t, l) {
    if (typeof t == "object" && t !== null) {
      var e = lr.get(t);
      return e !== void 0 ? e : (l = {
        value: t,
        source: l,
        stack: $s(l)
      }, lr.set(t, l), l);
    }
    return {
      value: t,
      source: l,
      stack: $s(l)
    };
  }
  var Va = [], wa = 0, Qn = null, qu = 0, ql = [], Yl = 0, xe = null, le = 1, ee = "";
  function Se(t, l) {
    Va[wa++] = qu, Va[wa++] = Qn, Qn = t, qu = l;
  }
  function er(t, l, e) {
    ql[Yl++] = le, ql[Yl++] = ee, ql[Yl++] = xe, xe = t;
    var a = le;
    t = ee;
    var u = 32 - Nl(a) - 1;
    a &= ~(1 << u), e += 1;
    var n = 32 - Nl(l) + u;
    if (30 < n) {
      var i = u - u % 5;
      n = (a & (1 << i) - 1).toString(32), a >>= i, u -= i, le = 1 << 32 - Nl(l) + u | e << u | a, ee = n + t;
    } else
      le = 1 << n | e << u | a, ee = t;
  }
  function Zn(t) {
    t.return !== null && (Se(t, 1), er(t, 1, 0));
  }
  function Hc(t) {
    for (; t === Qn; )
      Qn = Va[--wa], Va[wa] = null, qu = Va[--wa], Va[wa] = null;
    for (; t === xe; )
      xe = ql[--Yl], ql[Yl] = null, ee = ql[--Yl], ql[Yl] = null, le = ql[--Yl], ql[Yl] = null;
  }
  function ar(t, l) {
    ql[Yl++] = le, ql[Yl++] = ee, ql[Yl++] = xe, le = l.id, ee = l.overflow, xe = t;
  }
  var kt = null, xt = null, it = !1, He = null, Gl = !1, jc = Error(f(519));
  function je(t) {
    var l = Error(
      f(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Yu(Bl(l, t)), jc;
  }
  function ur(t) {
    var l = t.stateNode, e = t.type, a = t.memoizedProps;
    switch (l[tl] = t, l[hl] = a, e) {
      case "dialog":
        rt("cancel", l), rt("close", l);
        break;
      case "iframe":
      case "object":
      case "embed":
        rt("load", l);
        break;
      case "video":
      case "audio":
        for (e = 0; e < cn.length; e++)
          rt(cn[e], l);
        break;
      case "source":
        rt("error", l);
        break;
      case "img":
      case "image":
      case "link":
        rt("error", l), rt("load", l);
        break;
      case "details":
        rt("toggle", l);
        break;
      case "input":
        rt("invalid", l), yo(
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
        rt("invalid", l);
        break;
      case "textarea":
        rt("invalid", l), So(l, a.value, a.defaultValue, a.children);
    }
    e = a.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || l.textContent === "" + e || a.suppressHydrationWarning === !0 || zd(l.textContent, e) ? (a.popover != null && (rt("beforetoggle", l), rt("toggle", l)), a.onScroll != null && rt("scroll", l), a.onScrollEnd != null && rt("scrollend", l), a.onClick != null && (l.onclick = te), l = !0) : l = !1, l || je(t, !0);
  }
  function Vn(t) {
    for (kt = t.return; kt; )
      switch (kt.tag) {
        case 5:
        case 31:
        case 13:
          Gl = !1;
          return;
        case 27:
        case 3:
          Gl = !0;
          return;
        default:
          kt = kt.return;
      }
  }
  function Ka(t) {
    if (t !== kt) return !1;
    if (!it) return Vn(t), it = !0, !1;
    var l = t.tag, e;
    if ((e = l !== 3 && l !== 27) && ((e = l === 5) && (e = t.type, e = !(e !== "form" && e !== "button") || ms(t.type, t.memoizedProps)), e = !e), e && xt && je(t), Vn(t), l === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(f(317));
      xt = Vd(t);
    } else if (l === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(f(317));
      xt = Vd(t);
    } else
      l === 27 ? (l = xt, ke(t.type) ? (t = Es, Es = null, xt = t) : xt = l) : xt = kt ? Xl(t.stateNode.nextSibling) : null;
    return !0;
  }
  function oa() {
    xt = kt = null, it = !1;
  }
  function Bc() {
    var t = He;
    return t !== null && (bl === null ? bl = t : bl.push.apply(
      bl,
      t
    ), He = null), t;
  }
  function Yu(t) {
    He === null ? He = [t] : He.push(t);
  }
  var qc = xl(null), ra = null, be = null;
  function Be(t, l, e) {
    z(qc, l._currentValue), l._currentValue = e;
  }
  function Te(t) {
    t._currentValue = qc.current, Jt(qc);
  }
  function wn(t, l, e) {
    for (; t !== null; ) {
      var a = t.alternate;
      if ((t.childLanes & l) !== l ? (t.childLanes |= l, a !== null && (a.childLanes |= l)) : a !== null && (a.childLanes & l) !== l && (a.childLanes |= l), t === e) break;
      t = t.return;
    }
  }
  function Yc(t, l, e, a) {
    var u = t.child;
    for (u !== null && (u.return = t); u !== null; ) {
      var n = u.dependencies;
      if (n !== null) {
        var i = u.child;
        n = n.firstContext;
        t: for (; n !== null; ) {
          var c = n;
          n = u;
          for (var o = 0; o < l.length; o++)
            if (c.context === l[o]) {
              n.lanes |= e, c = n.alternate, c !== null && (c.lanes |= e), wn(
                n.return,
                e,
                t
              ), a || (i = null);
              break t;
            }
          n = c.next;
        }
      } else if (u.tag === 18) {
        if (i = u.return, i === null) throw Error(f(341));
        i.lanes |= e, n = i.alternate, n !== null && (n.lanes |= e), wn(i, e, t), i = null;
      } else
        u.tag === 13 && u.memoizedState !== null && u.memoizedState.dehydrated === null ? (u.lanes |= e, i = u.alternate, i !== null && (i.lanes |= e), wn(
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
  function ma(t, l, e, a) {
    t = null;
    for (var u = l, n = !1; u !== null; ) {
      if (!n) {
        if ((u.flags & 524288) !== 0) n = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var i = u.alternate;
        if (i === null) throw Error(f(387));
        if (i = i.memoizedProps, i !== null) {
          var c = u.type;
          Ol(u.pendingProps.value, i.value) || (t !== null ? t.push(c) : t = [c]);
        }
      } else if (u === Pl.current) {
        if (i = u.alternate, i === null) throw Error(f(387));
        i.memoizedState.memoizedState !== u.memoizedState.memoizedState && (t !== null ? t.push(gu) : t = [gu]);
      }
      u = u.return;
    }
    return t !== null && Yc(
      l,
      t,
      e,
      a
    ), l.flags |= 262144, t !== null;
  }
  function Kn(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!Ol(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function da(t) {
    ra = t, be = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function ll(t) {
    return nr(ra, t);
  }
  function Jn(t, l) {
    return ra === null && da(t), nr(t, l);
  }
  function nr(t, l) {
    var e = l._currentValue;
    if (l = { context: l, memoizedValue: e, next: null }, be === null) {
      if (t === null) throw Error(f(308));
      be = l, t.dependencies = { lanes: 0, firstContext: l }, t.flags |= 524288;
    } else be = be.next = l;
    return e;
  }
  var Wv = typeof AbortController < "u" ? AbortController : function() {
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
  }, kv = s.unstable_scheduleCallback, Iv = s.unstable_NormalPriority, Zt = {
    $$typeof: dt,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Gc() {
    return {
      controller: new Wv(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Gu(t) {
    t.refCount--, t.refCount === 0 && kv(Iv, function() {
      t.controller.abort();
    });
  }
  function ir(t, l) {
    if ((t.pendingLanes & 4194048) !== 0) {
      var e = t.transitionTypes;
      for (e === null && (e = t.transitionTypes = []), t = 0; t < l.length; t++) {
        var a = l[t];
        e.indexOf(a) === -1 && e.push(a);
      }
    }
  }
  var Lu = null;
  function Pv(t) {
    var l = t.transitionTypes;
    return t.transitionTypes = null, l;
  }
  var Xu = null, Lc = 0, va = 0, Ja = null;
  function th(t, l) {
    if (Xu === null) {
      var e = Xu = [];
      Lc = 0, va = as(), Ja = {
        status: "pending",
        value: void 0,
        then: function(a) {
          e.push(a);
        }
      };
    }
    return Lc++, l.then(cr, cr), l;
  }
  function cr() {
    if (--Lc === 0 && (Lu = null, Xu !== null)) {
      Ja !== null && (Ja.status = "fulfilled");
      var t = Xu;
      Xu = null, va = 0, Ja = null;
      for (var l = 0; l < t.length; l++) (0, t[l])();
    }
  }
  function lh(t, l) {
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
  var fr = L.S;
  L.S = function(t, l) {
    if (td = _l(), typeof l == "object" && l !== null && typeof l.then == "function" && th(t, l), Lu !== null)
      for (var e = ru; e !== null; )
        ir(e, Lu), e = e.next;
    if (e = t.types, e !== null) {
      for (var a = ru; a !== null; )
        ir(a, e), a = a.next;
      if (va !== 0) {
        a = Lu, a === null && (a = Lu = []);
        for (var u = 0; u < e.length; u++) {
          var n = e[u];
          a.indexOf(n) === -1 && a.push(n);
        }
      }
    }
    fr !== null && fr(t, l);
  };
  var ha = xl(null);
  function Xc() {
    var t = ha.current;
    return t !== null ? t : Ut.pooledCache;
  }
  function $n(t, l) {
    l === null ? z(ha, ha.current) : z(ha, l.pool);
  }
  function sr() {
    var t = Xc();
    return t === null ? null : { parent: Zt._currentValue, pool: t };
  }
  var $a = Error(f(460)), Qc = Error(f(474)), Fn = Error(f(542)), Wn = { then: function() {
  } };
  function or(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function rr(t, l, e) {
    switch (e = t[e], e === void 0 ? t.push(l) : e !== l && (l.then(te, te), l = e), l.status) {
      case "fulfilled":
        return l.value;
      case "rejected":
        throw t = l.reason, dr(t), t === void 0 && !("reason" in l) ? Error(f(600)) : t;
      default:
        if (typeof l.status == "string") l.then(te, te);
        else {
          if (t = Ut, t !== null && 100 < t.shellSuspendCounter)
            throw Error(f(482));
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
            throw t = l.reason, dr(t), t;
        }
        throw ga = l, $a;
    }
  }
  function ya(t) {
    try {
      var l = t._init;
      return l(t._payload);
    } catch (e) {
      throw e !== null && typeof e == "object" && typeof e.then == "function" ? (ga = e, $a) : e;
    }
  }
  var ga = null;
  function mr() {
    if (ga === null) throw Error(f(459));
    var t = ga;
    return ga = null, t;
  }
  function dr(t) {
    if (t === $a || t === Fn)
      throw Error(f(483));
  }
  var Fa = null, Qu = 0;
  function kn(t) {
    var l = Qu;
    return Qu += 1, Fa === null && (Fa = []), rr(Fa, t, l);
  }
  function qe(t, l) {
    l = l.props.ref, t.ref = l !== void 0 ? l : null;
  }
  function In(t, l) {
    throw l.$$typeof === at ? Error(f(525)) : (t = Object.prototype.toString.call(l), Error(
      f(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(l).join(", ") + "}" : t
      )
    ));
  }
  function vr(t) {
    function l(h, m) {
      if (t) {
        var S = h.deletions;
        S === null ? (h.deletions = [m], h.flags |= 16) : S.push(m);
      }
    }
    function e(h, m) {
      if (!t) return null;
      for (; m !== null; )
        l(h, m), m = m.sibling;
      return null;
    }
    function a(h) {
      for (var m = /* @__PURE__ */ new Map(); h !== null; )
        h.key === null ? m.set(h.index, h) : m.set(h.key, h), h = h.sibling;
      return m;
    }
    function u(h, m) {
      return h = ge(h, m), h.index = 0, h.sibling = null, h;
    }
    function n(h, m, S) {
      return h.index = S, t ? (S = h.alternate, S !== null ? (S = S.index, S < m ? (h.flags |= 2, m) : S) : (h.flags |= 134217730, m)) : (h.flags |= 1048576, m);
    }
    function i(h) {
      return t && h.alternate === null && (h.flags |= 134217730), h;
    }
    function c(h, m, S, p) {
      return m === null || m.tag !== 6 ? (m = Rc(S, h.mode, p), m.return = h, m) : (m = u(m, S), m.return = h, m);
    }
    function o(h, m, S, p) {
      var q = S.type;
      return q === B ? (h = E(
        h,
        m,
        S.props.children,
        p,
        S.key
      ), qe(h, S), h) : m !== null && (m.elementType === q || typeof q == "object" && q !== null && q.$$typeof === Tt && ya(q) === m.type) ? (m = u(m, S.props), qe(m, S), m.return = h, m) : (m = Xn(
        S.type,
        S.key,
        S.props,
        null,
        h.mode,
        p
      ), qe(m, S), m.return = h, m);
    }
    function y(h, m, S, p) {
      return m === null || m.tag !== 4 || m.stateNode.containerInfo !== S.containerInfo || m.stateNode.implementation !== S.implementation ? (m = xc(S, h.mode, p), m.return = h, m) : (m = u(m, S.children || []), m.return = h, m);
    }
    function E(h, m, S, p, q) {
      return m === null || m.tag !== 7 ? (m = sa(
        S,
        h.mode,
        p,
        q
      ), m.return = h, m) : (m = u(m, S), m.return = h, m);
    }
    function N(h, m, S) {
      if (typeof m == "string" && m !== "" || typeof m == "number" || typeof m == "bigint")
        return m = Rc(
          "" + m,
          h.mode,
          S
        ), m.return = h, m;
      if (typeof m == "object" && m !== null) {
        switch (m.$$typeof) {
          case P:
            return S = Xn(
              m.type,
              m.key,
              m.props,
              null,
              h.mode,
              S
            ), qe(S, m), S.return = h, S;
          case x:
            return m = xc(
              m,
              h.mode,
              S
            ), m.return = h, m;
          case Tt:
            return m = ya(m), N(h, m, S);
        }
        if (W(m) || Z(m))
          return m = sa(
            m,
            h.mode,
            S,
            null
          ), m.return = h, m;
        if (typeof m.then == "function")
          return N(h, kn(m), S);
        if (m.$$typeof === dt)
          return N(
            h,
            Jn(h, m),
            S
          );
        In(h, m);
      }
      return null;
    }
    function v(h, m, S, p) {
      var q = m !== null ? m.key : null;
      if (typeof S == "string" && S !== "" || typeof S == "number" || typeof S == "bigint")
        return q !== null ? null : c(h, m, "" + S, p);
      if (typeof S == "object" && S !== null) {
        switch (S.$$typeof) {
          case P:
            return S.key === q ? o(h, m, S, p) : null;
          case x:
            return S.key === q ? y(h, m, S, p) : null;
          case Tt:
            return S = ya(S), v(h, m, S, p);
        }
        if (W(S) || Z(S))
          return q !== null ? null : E(h, m, S, p, null);
        if (typeof S.then == "function")
          return v(
            h,
            m,
            kn(S),
            p
          );
        if (S.$$typeof === dt)
          return v(
            h,
            m,
            Jn(h, S),
            p
          );
        In(h, S);
      }
      return null;
    }
    function b(h, m, S, p, q) {
      if (typeof p == "string" && p !== "" || typeof p == "number" || typeof p == "bigint")
        return h = h.get(S) || null, c(m, h, "" + p, q);
      if (typeof p == "object" && p !== null) {
        switch (p.$$typeof) {
          case P:
            return h = h.get(
              p.key === null ? S : p.key
            ) || null, o(m, h, p, q);
          case x:
            return h = h.get(
              p.key === null ? S : p.key
            ) || null, y(m, h, p, q);
          case Tt:
            return p = ya(p), b(
              h,
              m,
              S,
              p,
              q
            );
        }
        if (W(p) || Z(p))
          return h = h.get(S) || null, E(m, h, p, q, null);
        if (typeof p.then == "function")
          return b(
            h,
            m,
            S,
            kn(p),
            q
          );
        if (p.$$typeof === dt)
          return b(
            h,
            m,
            S,
            Jn(m, p),
            q
          );
        In(m, p);
      }
      return null;
    }
    function R(h, m, S, p) {
      for (var q = null, ht = null, w = m, F = m = 0, Kt = null; w !== null && F < S.length; F++) {
        w.index > F ? (Kt = w, w = null) : Kt = w.sibling;
        var gt = v(
          h,
          w,
          S[F],
          p
        );
        if (gt === null) {
          w === null && (w = Kt);
          break;
        }
        t && w && gt.alternate === null && l(h, w), m = n(gt, m, F), ht === null ? q = gt : ht.sibling = gt, ht = gt, w = Kt;
      }
      if (F === S.length)
        return e(h, w), it && Se(h, F), q;
      if (w === null) {
        for (; F < S.length; F++)
          w = N(h, S[F], p), w !== null && (m = n(
            w,
            m,
            F
          ), ht === null ? q = w : ht.sibling = w, ht = w);
        return it && Se(h, F), q;
      }
      for (w = a(w); F < S.length; F++)
        Kt = b(
          w,
          h,
          F,
          S[F],
          p
        ), Kt !== null && (t && (gt = Kt.alternate, gt !== null && w.delete(gt.key === null ? F : gt.key)), m = n(
          Kt,
          m,
          F
        ), ht === null ? q = Kt : ht.sibling = Kt, ht = Kt);
      return t && w.forEach(function(ea) {
        return l(h, ea);
      }), it && Se(h, F), q;
    }
    function G(h, m, S, p) {
      if (S == null) throw Error(f(151));
      for (var q = null, ht = null, w = m, F = m = 0, Kt = null, gt = S.next(); w !== null && !gt.done; F++, gt = S.next()) {
        w.index > F ? (Kt = w, w = null) : Kt = w.sibling;
        var ea = v(h, w, gt.value, p);
        if (ea === null) {
          w === null && (w = Kt);
          break;
        }
        t && w && ea.alternate === null && l(h, w), m = n(ea, m, F), ht === null ? q = ea : ht.sibling = ea, ht = ea, w = Kt;
      }
      if (gt.done)
        return e(h, w), it && Se(h, F), q;
      if (w === null) {
        for (; !gt.done; F++, gt = S.next())
          gt = N(h, gt.value, p), gt !== null && (m = n(gt, m, F), ht === null ? q = gt : ht.sibling = gt, ht = gt);
        return it && Se(h, F), q;
      }
      for (w = a(w); !gt.done; F++, gt = S.next())
        gt = b(w, h, F, gt.value, p), gt !== null && (t && (Kt = gt.alternate, Kt !== null && w.delete(
          Kt.key === null ? F : Kt.key
        )), m = n(gt, m, F), ht === null ? q = gt : ht.sibling = gt, ht = gt);
      return t && w.forEach(function(jy) {
        return l(h, jy);
      }), it && Se(h, F), q;
    }
    function lt(h, m, S, p) {
      if (typeof S == "object" && S !== null && S.type === B && S.key === null && S.props.ref === void 0 && (S = S.props.children), typeof S == "object" && S !== null) {
        switch (S.$$typeof) {
          case P:
            t: {
              for (var q = S.key; m !== null; ) {
                if (m.key === q) {
                  if (q = S.type, q === B) {
                    if (m.tag === 7) {
                      e(
                        h,
                        m.sibling
                      ), p = u(
                        m,
                        S.props.children
                      ), qe(p, S), p.return = h, h = p;
                      break t;
                    }
                  } else if (m.elementType === q || typeof q == "object" && q !== null && q.$$typeof === Tt && ya(q) === m.type) {
                    e(
                      h,
                      m.sibling
                    ), p = u(m, S.props), qe(p, S), p.return = h, h = p;
                    break t;
                  }
                  e(h, m);
                  break;
                } else l(h, m);
                m = m.sibling;
              }
              S.type === B ? (p = sa(
                S.props.children,
                h.mode,
                p,
                S.key
              ), qe(p, S), p.return = h, h = p) : (p = Xn(
                S.type,
                S.key,
                S.props,
                null,
                h.mode,
                p
              ), qe(p, S), p.return = h, h = p);
            }
            return i(h);
          case x:
            t: {
              for (q = S.key; m !== null; ) {
                if (m.key === q)
                  if (m.tag === 4 && m.stateNode.containerInfo === S.containerInfo && m.stateNode.implementation === S.implementation) {
                    e(
                      h,
                      m.sibling
                    ), p = u(m, S.children || []), p.return = h, h = p;
                    break t;
                  } else {
                    e(h, m);
                    break;
                  }
                else l(h, m);
                m = m.sibling;
              }
              p = xc(S, h.mode, p), p.return = h, h = p;
            }
            return i(h);
          case Tt:
            return S = ya(S), lt(
              h,
              m,
              S,
              p
            );
        }
        if (W(S))
          return R(
            h,
            m,
            S,
            p
          );
        if (Z(S)) {
          if (q = Z(S), typeof q != "function") throw Error(f(150));
          return S = q.call(S), G(
            h,
            m,
            S,
            p
          );
        }
        if (typeof S.then == "function")
          return lt(
            h,
            m,
            kn(S),
            p
          );
        if (S.$$typeof === dt)
          return lt(
            h,
            m,
            Jn(h, S),
            p
          );
        In(h, S);
      }
      return typeof S == "string" && S !== "" || typeof S == "number" || typeof S == "bigint" ? (S = "" + S, m !== null && m.tag === 6 ? (e(h, m.sibling), p = u(m, S), p.return = h, h = p) : (e(h, m), p = Rc(S, h.mode, p), p.return = h, h = p), i(h)) : e(h, m);
    }
    return function(h, m, S, p) {
      try {
        Qu = 0;
        var q = lt(
          h,
          m,
          S,
          p
        );
        return Fa = null, q;
      } catch (w) {
        if (w === $a || w === Fn) throw w;
        var ht = yl(29, w, null, h.mode);
        return ht.lanes = p, ht.return = h, ht;
      }
    };
  }
  var Sa = vr(!0), hr = vr(!1), Ye = !1;
  function Zc(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Vc(t, l) {
    t = t.updateQueue, l.updateQueue === t && (l.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function Ge(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Le(t, l, e) {
    var a = t.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (_t & 2) !== 0) {
      var u = a.pending;
      return u === null ? l.next = l : (l.next = u.next, u.next = l), a.pending = l, l = Ln(t), Io(t, null, e), l;
    }
    return Gn(t, a, l, e), Ln(t);
  }
  function Zu(t, l, e) {
    if (l = l.updateQueue, l !== null && (l = l.shared, (e & 4194048) !== 0)) {
      var a = l.lanes;
      a &= t.pendingLanes, e |= a, l.lanes = e, lo(t, e);
    }
  }
  function wc(t, l) {
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
  var Kc = !1;
  function Vu() {
    if (Kc) {
      var t = Ja;
      if (t !== null) throw t;
    }
  }
  function wu(t, l, e, a) {
    Kc = !1;
    var u = t.updateQueue;
    Ye = !1;
    var n = u.firstBaseUpdate, i = u.lastBaseUpdate, c = u.shared.pending;
    if (c !== null) {
      u.shared.pending = null;
      var o = c, y = o.next;
      o.next = null, i === null ? n = y : i.next = y, i = o;
      var E = t.alternate;
      E !== null && (E = E.updateQueue, c = E.lastBaseUpdate, c !== i && (c === null ? E.firstBaseUpdate = y : c.next = y, E.lastBaseUpdate = o));
    }
    if (n !== null) {
      var N = u.baseState;
      i = 0, E = y = o = null, c = n;
      do {
        var v = c.lane & -536870913, b = v !== c.lane;
        if (b ? (vt & v) === v : (a & v) === v) {
          v !== 0 && v === va && (Kc = !0), E !== null && (E = E.next = {
            lane: 0,
            tag: c.tag,
            payload: c.payload,
            callback: null,
            next: null
          });
          t: {
            var R = t, G = c;
            v = l;
            var lt = e;
            switch (G.tag) {
              case 1:
                if (R = G.payload, typeof R == "function") {
                  N = R.call(lt, N, v);
                  break t;
                }
                N = R;
                break t;
              case 3:
                R.flags = R.flags & -65537 | 128;
              case 0:
                if (R = G.payload, v = typeof R == "function" ? R.call(lt, N, v) : R, v == null) break t;
                N = Q({}, N, v);
                break t;
              case 2:
                Ye = !0;
            }
          }
          v = c.callback, v !== null && (t.flags |= 64, b && (t.flags |= 8192), b = u.callbacks, b === null ? u.callbacks = [v] : b.push(v));
        } else
          b = {
            lane: v,
            tag: c.tag,
            payload: c.payload,
            callback: c.callback,
            next: null
          }, E === null ? (y = E = b, o = N) : E = E.next = b, i |= v;
        if (c = c.next, c === null) {
          if (c = u.shared.pending, c === null)
            break;
          b = c, c = b.next, b.next = null, u.lastBaseUpdate = b, u.shared.pending = null;
        }
      } while (!0);
      E === null && (o = N), u.baseState = o, u.firstBaseUpdate = y, u.lastBaseUpdate = E, n === null && (u.shared.lanes = 0), Je |= i, t.lanes = i, t.memoizedState = N;
    }
  }
  function yr(t, l) {
    if (typeof t != "function")
      throw Error(f(191, t));
    t.call(l);
  }
  function gr(t, l) {
    var e = t.callbacks;
    if (e !== null)
      for (t.callbacks = null, t = 0; t < e.length; t++)
        yr(e[t], l);
  }
  var Xe = xl(null), Pn = xl(0);
  function Sr(t, l) {
    t = ze, z(Pn, t), z(Xe, l), ze = t | l.baseLanes;
  }
  function Jc() {
    z(Pn, ze), z(Xe, Xe.current);
  }
  function $c() {
    ze = Pn.current, Jt(Xe), Jt(Pn);
  }
  var el = xl(null), fl = null;
  function Qe(t) {
    var l = t.alternate;
    z(al, al.current & 1), z(el, t), fl === null && (l === null || Xe.current !== null || l.memoizedState !== null) && (fl = t);
  }
  function Fc(t) {
    z(al, al.current), z(el, t), fl === null && (fl = t);
  }
  function br(t) {
    t.tag === 22 ? (z(al, al.current), z(el, t), fl === null && (fl = t)) : Ze();
  }
  function Ze() {
    z(al, al.current), z(el, el.current);
  }
  function Al(t) {
    Jt(el), fl === t && (fl = null), Jt(al);
  }
  var al = xl(0);
  function Ku(t, l) {
    z(el, el.current), z(al, l);
  }
  function Wc(t) {
    Jt(al), Jt(el), fl === t && (fl = null);
  }
  function ti(t) {
    for (var l = t; l !== null; ) {
      if (l.tag === 13) {
        var e = l.memoizedState;
        if (e !== null && (e = e.dehydrated, e === null || bs(e) || Ts(e)))
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
  var Ee = 0, tt = null, Ct = null, Vt = null, li = !1, Wa = !1, ba = !1, ei = 0, Ju = 0, ka = null, eh = 0;
  function Yt() {
    throw Error(f(321));
  }
  function kc(t, l) {
    if (l === null) return !1;
    for (var e = 0; e < l.length && e < t.length; e++)
      if (!Ol(t[e], l[e])) return !1;
    return !0;
  }
  function Ic(t, l, e, a, u, n) {
    return Ee = n, tt = l, l.memoizedState = null, l.updateQueue = null, l.lanes = 0, L.H = t === null || t.memoizedState === null ? em : am, ba = !1, n = e(a, u), ba = !1, Wa && (n = Er(
      l,
      e,
      a,
      u
    )), Tr(t), n;
  }
  function Tr(t) {
    L.H = si;
    var l = Ct !== null && Ct.next !== null;
    if (Ee = 0, Vt = Ct = tt = null, li = !1, Ju = 0, ka = null, l) throw Error(f(300));
    t === null || wt || (t = t.dependencies, t !== null && Kn(t) && (wt = !0));
  }
  function Er(t, l, e, a) {
    tt = t;
    var u = 0;
    do {
      if (Wa && (ka = null), Ju = 0, Wa = !1, 25 <= u) throw Error(f(301));
      if (u += 1, Vt = Ct = null, t.updateQueue != null) {
        var n = t.updateQueue;
        n.lastEffect = null, n.events = null, n.stores = null, n.memoCache != null && (n.memoCache.index = 0);
      }
      L.H = oh, n = l(e, a);
    } while (Wa);
    return n;
  }
  function ah() {
    var t = L.H, l = t.useState()[0];
    return l = typeof l.then == "function" ? $u(l) : l, t = t.useState()[0], (Ct !== null ? Ct.memoizedState : null) !== t && (tt.flags |= 1024), l;
  }
  function Pc() {
    var t = ei !== 0;
    return ei = 0, t;
  }
  function tf(t, l, e) {
    l.updateQueue = t.updateQueue, l.flags &= -2053, t.lanes &= ~e;
  }
  function lf(t) {
    if (li) {
      for (t = t.memoizedState; t !== null; ) {
        var l = t.queue;
        l !== null && (l.pending = null), t = t.next;
      }
      li = !1;
    }
    Ee = 0, Vt = Ct = tt = null, Wa = !1, Ju = ei = 0, ka = null;
  }
  function ml() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Vt === null ? tt.memoizedState = Vt = t : Vt = Vt.next = t, Vt;
  }
  function Qt() {
    if (Ct === null) {
      var t = tt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Ct.next;
    var l = Vt === null ? tt.memoizedState : Vt.next;
    if (l !== null)
      Vt = l, Ct = t;
    else {
      if (t === null)
        throw tt.alternate === null ? Error(f(467)) : Error(f(310));
      Ct = t, t = {
        memoizedState: Ct.memoizedState,
        baseState: Ct.baseState,
        baseQueue: Ct.baseQueue,
        queue: Ct.queue,
        next: null
      }, Vt === null ? tt.memoizedState = Vt = t : Vt = Vt.next = t;
    }
    return Vt;
  }
  function ai() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function $u(t) {
    var l = Ju;
    return Ju += 1, ka === null && (ka = []), t = rr(ka, t, l), l = tt, (Vt === null ? l.memoizedState : Vt.next) === null && (l = l.alternate, L.H = l === null || l.memoizedState === null ? em : am), t;
  }
  function ui(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return $u(t);
      if (t.$$typeof === M) return;
      if (t.$$typeof === dt) return ll(t);
    }
    throw Error(f(438, String(t)));
  }
  function ef(t) {
    var l = null, e = tt.updateQueue;
    if (e !== null && (l = e.memoCache), l == null) {
      var a = tt.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (l = {
        data: a.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (l == null && (l = { data: [], index: 0 }), e === null && (e = ai(), tt.updateQueue = e), e.memoCache = l, e = l.data[l.index], e === void 0)
      for (e = l.data[l.index] = Array(t), a = 0; a < t; a++)
        e[a] = Il;
    return l.index++, e;
  }
  function _e(t, l) {
    return typeof l == "function" ? l(t) : l;
  }
  function ni(t) {
    var l = Qt();
    return af(l, Ct, t);
  }
  function af(t, l, e) {
    var a = t.queue;
    if (a === null) throw Error(f(311));
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
      var c = i = null, o = null, y = l, E = !1;
      do {
        var N = y.lane & -536870913;
        if (N !== y.lane ? (vt & N) === N : (Ee & N) === N) {
          var v = y.revertLane;
          if (v === 0)
            o !== null && (o = o.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: y.action,
              hasEagerState: y.hasEagerState,
              eagerState: y.eagerState,
              next: null
            }), N === va && (E = !0);
          else if ((Ee & v) === v) {
            y = y.next, v === va && (E = !0);
            continue;
          } else
            N = {
              lane: 0,
              revertLane: y.revertLane,
              gesture: null,
              action: y.action,
              hasEagerState: y.hasEagerState,
              eagerState: y.eagerState,
              next: null
            }, o === null ? (c = o = N, i = n) : o = o.next = N, tt.lanes |= v, Je |= v;
          N = y.action, ba && e(n, N), n = y.hasEagerState ? y.eagerState : e(n, N);
        } else
          v = {
            lane: N,
            revertLane: y.revertLane,
            gesture: y.gesture,
            action: y.action,
            hasEagerState: y.hasEagerState,
            eagerState: y.eagerState,
            next: null
          }, o === null ? (c = o = v, i = n) : o = o.next = v, tt.lanes |= N, Je |= N;
        y = y.next;
      } while (y !== null && y !== l);
      if (o === null ? i = n : o.next = c, !Ol(n, t.memoizedState) && (wt = !0, E && (e = Ja, e !== null)))
        throw e;
      t.memoizedState = n, t.baseState = i, t.baseQueue = o, a.lastRenderedState = n;
    }
    return u === null && (a.lanes = 0), [t.memoizedState, a.dispatch];
  }
  function uf(t) {
    var l = Qt(), e = l.queue;
    if (e === null) throw Error(f(311));
    e.lastRenderedReducer = t;
    var a = e.dispatch, u = e.pending, n = l.memoizedState;
    if (u !== null) {
      e.pending = null;
      var i = u = u.next;
      do
        n = t(n, i.action), i = i.next;
      while (i !== u);
      Ol(n, l.memoizedState) || (wt = !0), l.memoizedState = n, l.baseQueue === null && (l.baseState = n), e.lastRenderedState = n;
    }
    return [n, a];
  }
  function _r(t, l, e) {
    var a = tt, u = Qt(), n = it;
    if (n) {
      if (e === void 0) throw Error(f(407));
      e = e();
    } else e = l();
    var i = !Ol(
      (Ct || u).memoizedState,
      e
    );
    if (i && (u.memoizedState = e, wt = !0), u = u.queue, ff(zr.bind(null, a, u, t), [
      t
    ]), t = u.getSnapshot !== l || i || Vt !== null && (Vt.memoizedState.tag & 1) !== 0, Ia(
      t ? 9 : 8,
      { destroy: void 0 },
      Nr.bind(null, a, u, e, l),
      null
    ), t) {
      if (a.flags |= 2048, Ut === null) throw Error(f(349));
      n || (Ee & 127) !== 0 || pr(a, l, e);
    }
    return e;
  }
  function pr(t, l, e) {
    t.flags |= 16384, t = { getSnapshot: l, value: e }, l = tt.updateQueue, l === null ? (l = ai(), tt.updateQueue = l, l.stores = [t]) : (e = l.stores, e === null ? l.stores = [t] : e.push(t));
  }
  function Nr(t, l, e, a) {
    l.value = e, l.getSnapshot = a, Or(l) && Ar(t);
  }
  function zr(t, l, e) {
    return e(function() {
      Or(l) && Ar(t);
    });
  }
  function Or(t) {
    var l = t.getSnapshot;
    t = t.value;
    try {
      var e = l();
      return !Ol(t, e);
    } catch {
      return !0;
    }
  }
  function Ar(t) {
    var l = fa(t, 2);
    l !== null && Tl(l, t, 2);
  }
  function nf(t) {
    var l = ml();
    if (typeof t == "function") {
      var e = t;
      if (t = e(), ba) {
        Ce(!0);
        try {
          e();
        } finally {
          Ce(!1);
        }
      }
    }
    return l.memoizedState = l.baseState = t, l.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: _e,
      lastRenderedState: t
    }, l;
  }
  function Mr(t, l, e, a) {
    return t.baseState = e, af(
      t,
      Ct,
      typeof a == "function" ? a : _e
    );
  }
  function uh(t, l, e, a, u) {
    if (fi(t)) throw Error(f(485));
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
      L.T !== null ? e(!0) : n.isTransition = !1, a(n), e = l.pending, e === null ? (n.next = l.pending = n, Dr(l, n)) : (n.next = e.next, l.pending = e.next = n);
    }
  }
  function Dr(t, l) {
    var e = l.action, a = l.payload, u = t.state;
    if (l.isTransition) {
      var n = L.T, i = {};
      i.types = n !== null ? n.types : null, L.T = i;
      try {
        var c = e(u, a), o = L.S;
        o !== null && o(i, c), Cr(t, l, c);
      } catch (y) {
        cf(t, l, y);
      } finally {
        n !== null && i.types !== null && (n.types = i.types), L.T = n;
      }
    } else
      try {
        n = e(u, a), Cr(t, l, n);
      } catch (y) {
        cf(t, l, y);
      }
  }
  function Cr(t, l, e) {
    e !== null && typeof e == "object" && typeof e.then == "function" ? e.then(
      function(a) {
        Ur(t, l, a);
      },
      function(a) {
        return cf(t, l, a);
      }
    ) : Ur(t, l, e);
  }
  function Ur(t, l, e) {
    l.status = "fulfilled", l.value = e, Rr(l), t.state = e, l = t.pending, l !== null && (e = l.next, e === l ? t.pending = null : (e = e.next, l.next = e, Dr(t, e)));
  }
  function cf(t, l, e) {
    var a = t.pending;
    if (t.pending = null, a !== null) {
      a = a.next;
      do
        l.status = "rejected", l.reason = e, Rr(l), l = l.next;
      while (l !== a);
    }
    t.action = null;
  }
  function Rr(t) {
    t = t.listeners;
    for (var l = 0; l < t.length; l++) (0, t[l])();
  }
  function xr(t, l) {
    return l;
  }
  function Hr(t, l) {
    if (it) {
      var e = Ut.formState;
      if (e !== null) {
        t: {
          var a = tt;
          if (it) {
            if (xt) {
              l: {
                for (var u = xt, n = Gl; u.nodeType !== 8; ) {
                  if (!n) {
                    u = null;
                    break l;
                  }
                  if (u = Xl(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break l;
                  }
                }
                n = u.data, u = n === "F!" || n === "F" ? u : null;
              }
              if (u) {
                xt = Xl(
                  u.nextSibling
                ), a = u.data === "F!";
                break t;
              }
            }
            je(a);
          }
          a = !1;
        }
        a && (l = e[0]);
      }
    }
    return e = ml(), e.memoizedState = e.baseState = l, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: xr,
      lastRenderedState: l
    }, e.queue = a, e = Pr.bind(
      null,
      tt,
      a
    ), a.dispatch = e, a = nf(!1), n = df.bind(
      null,
      tt,
      !1,
      a.queue
    ), a = ml(), u = {
      state: l,
      dispatch: null,
      action: t,
      pending: null
    }, a.queue = u, e = uh.bind(
      null,
      tt,
      u,
      n,
      e
    ), u.dispatch = e, a.memoizedState = t, [l, e, !1];
  }
  function jr(t) {
    var l = Qt();
    return Br(l, Ct, t);
  }
  function Br(t, l, e) {
    if (l = af(
      t,
      l,
      xr
    )[0], t = ni(_e)[0], typeof l == "object" && l !== null && typeof l.then == "function")
      try {
        var a = $u(l);
      } catch (i) {
        throw i === $a ? Fn : i;
      }
    else a = l;
    l = Qt();
    var u = l.queue, n = u.dispatch;
    return e !== l.memoizedState && (tt.flags |= 2048, Ia(
      9,
      { destroy: void 0 },
      nh.bind(null, u, e),
      null
    )), [a, n, t];
  }
  function nh(t, l) {
    t.action = l;
  }
  function qr(t) {
    var l = Qt(), e = Ct;
    if (e !== null)
      return Br(l, e, t);
    Qt(), l = l.memoizedState, e = Qt();
    var a = e.queue.dispatch;
    return e.memoizedState = t, [l, a, !1];
  }
  function Ia(t, l, e, a) {
    return t = { tag: t, create: e, deps: a, inst: l, next: null }, l = tt.updateQueue, l === null && (l = ai(), tt.updateQueue = l), e = l.lastEffect, e === null ? l.lastEffect = t.next = t : (a = e.next, e.next = t, t.next = a, l.lastEffect = t), t;
  }
  function Yr() {
    return Qt().memoizedState;
  }
  function ii(t, l, e, a) {
    var u = ml();
    tt.flags |= t, u.memoizedState = Ia(
      1 | l,
      { destroy: void 0 },
      e,
      a === void 0 ? null : a
    );
  }
  function ci(t, l, e, a) {
    var u = Qt();
    a = a === void 0 ? null : a;
    var n = u.memoizedState.inst;
    Ct !== null && a !== null && kc(a, Ct.memoizedState.deps) ? u.memoizedState = Ia(l, n, e, a) : (tt.flags |= t, u.memoizedState = Ia(
      1 | l,
      n,
      e,
      a
    ));
  }
  function Gr(t, l) {
    ii(8390656, 8, t, l);
  }
  function ff(t, l) {
    ci(2048, 8, t, l);
  }
  function ih(t) {
    tt.flags |= 4;
    var l = tt.updateQueue;
    if (l === null)
      l = ai(), tt.updateQueue = l, l.events = [t];
    else {
      var e = l.events;
      e === null ? l.events = [t] : e.push(t);
    }
  }
  function Lr(t) {
    var l = Qt().memoizedState;
    return ih({ ref: l, nextImpl: t }), function() {
      if ((_t & 2) !== 0) throw Error(f(440));
      return l.impl.apply(void 0, arguments);
    };
  }
  function Xr(t, l) {
    return ci(4, 2, t, l);
  }
  function Qr(t, l) {
    return ci(4, 4, t, l);
  }
  function Zr(t, l) {
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
  function Vr(t, l, e) {
    e = e != null ? e.concat([t]) : null, ci(4, 4, Zr.bind(null, l, t), e);
  }
  function sf() {
  }
  function wr(t, l) {
    var e = Qt();
    l = l === void 0 ? null : l;
    var a = e.memoizedState;
    return l !== null && kc(l, a[1]) ? a[0] : (e.memoizedState = [t, l], t);
  }
  function Kr(t, l) {
    var e = Qt();
    l = l === void 0 ? null : l;
    var a = e.memoizedState;
    if (l !== null && kc(l, a[1]))
      return a[0];
    if (a = t(), ba) {
      Ce(!0);
      try {
        t();
      } finally {
        Ce(!1);
      }
    }
    return e.memoizedState = [a, l], a;
  }
  function of(t, l, e) {
    return e === void 0 || (Ee & 1073741824) !== 0 && (vt & 261930) === 0 ? t.memoizedState = l : (t.memoizedState = e, t = ed(), tt.lanes |= t, Je |= t, e);
  }
  function Jr(t, l, e, a) {
    return Ol(e, l) ? e : Xe.current !== null ? (t = of(t, e, a), Ol(t, l) || (wt = !0), t) : (Ee & 106) === 0 || (Ee & 1073741824) !== 0 && (vt & 261930) === 0 ? (wt = !0, t.memoizedState = e) : (t = ed(), tt.lanes |= t, Je |= t, l);
  }
  function $r(t, l, e, a, u) {
    var n = k.p;
    k.p = n !== 0 && 8 > n ? n : 8;
    var i = L.T, c = {};
    c.types = i !== null ? i.types : null, L.T = c, df(t, !1, l, e);
    try {
      var o = u(), y = L.S;
      if (y !== null && y(c, o), o !== null && typeof o == "object" && typeof o.then == "function") {
        var E = lh(
          o,
          a
        );
        Fu(
          t,
          l,
          E,
          Ul(t)
        );
      } else
        Fu(
          t,
          l,
          a,
          Ul(t)
        );
    } catch (N) {
      Fu(
        t,
        l,
        { then: function() {
        }, status: "rejected", reason: N },
        Ul()
      );
    } finally {
      k.p = n, i !== null && c.types !== null && (i.types = c.types), L.T = i;
    }
  }
  function ch() {
  }
  function rf(t, l, e, a) {
    if (t.tag !== 5) throw Error(f(476));
    var u = Fr(t).queue;
    $r(
      t,
      u,
      l,
      El,
      e === null ? ch : function() {
        return Wr(t), e(a);
      }
    );
  }
  function Fr(t) {
    var l = t.memoizedState;
    if (l !== null) return l;
    l = {
      memoizedState: El,
      baseState: El,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: _e,
        lastRenderedState: El
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
        lastRenderedReducer: _e,
        lastRenderedState: e
      },
      next: null
    }, t.memoizedState = l, t = t.alternate, t !== null && (t.memoizedState = l), l;
  }
  function Wr(t) {
    var l = Fr(t);
    l.next === null && (l = t.alternate.memoizedState), Fu(
      t,
      l.next.queue,
      {},
      Ul()
    );
  }
  function mf() {
    return ll(gu);
  }
  function kr() {
    return Qt().memoizedState;
  }
  function Ir() {
    return Qt().memoizedState;
  }
  function fh(t) {
    for (var l = t.return; l !== null; ) {
      switch (l.tag) {
        case 24:
        case 3:
          var e = Ul();
          t = Ge(e);
          var a = Le(l, t, e);
          a !== null && (Tl(a, l, e), Zu(a, l, e)), l = { cache: Gc() }, t.payload = l;
          return;
      }
      l = l.return;
    }
  }
  function sh(t, l, e) {
    var a = Ul();
    e = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, fi(t) ? tm(l, e) : (e = Cc(t, l, e, a), e !== null && (Tl(e, t, a), lm(e, l, a)));
  }
  function Pr(t, l, e) {
    var a = Ul();
    Fu(t, l, e, a);
  }
  function Fu(t, l, e, a) {
    var u = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (fi(t)) tm(l, u);
    else {
      var n = t.alternate;
      if (t.lanes === 0 && (n === null || n.lanes === 0) && (n = l.lastRenderedReducer, n !== null))
        try {
          var i = l.lastRenderedState, c = n(i, e);
          if (u.hasEagerState = !0, u.eagerState = c, Ol(c, i))
            return Gn(t, l, u, 0), Ut === null && Yn(), !1;
        } catch {
        }
      if (e = Cc(t, l, u, a), e !== null)
        return Tl(e, t, a), lm(e, l, a), !0;
    }
    return !1;
  }
  function df(t, l, e, a) {
    if (a = {
      lane: 2,
      revertLane: as(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, fi(t)) {
      if (l) throw Error(f(479));
    } else
      l = Cc(
        t,
        e,
        a,
        2
      ), l !== null && Tl(l, t, 2);
  }
  function fi(t) {
    var l = t.alternate;
    return t === tt || l !== null && l === tt;
  }
  function tm(t, l) {
    Wa = li = !0;
    var e = t.pending;
    e === null ? l.next = l : (l.next = e.next, e.next = l), t.pending = l;
  }
  function lm(t, l, e) {
    if ((e & 4194048) !== 0) {
      var a = l.lanes;
      a &= t.pendingLanes, e |= a, l.lanes = e, lo(t, e);
    }
  }
  var si = {
    readContext: ll,
    use: ui,
    useCallback: Yt,
    useContext: Yt,
    useEffect: Yt,
    useImperativeHandle: Yt,
    useLayoutEffect: Yt,
    useInsertionEffect: Yt,
    useMemo: Yt,
    useReducer: Yt,
    useRef: Yt,
    useState: Yt,
    useDebugValue: Yt,
    useDeferredValue: Yt,
    useTransition: Yt,
    useSyncExternalStore: Yt,
    useId: Yt,
    useHostTransitionStatus: Yt,
    useFormState: Yt,
    useActionState: Yt,
    useOptimistic: Yt,
    useMemoCache: Yt,
    useCacheRefresh: Yt,
    useEffectEvent: Yt
  }, em = {
    readContext: ll,
    use: ui,
    useCallback: function(t, l) {
      return ml().memoizedState = [
        t,
        l === void 0 ? null : l
      ], t;
    },
    useContext: ll,
    useEffect: Gr,
    useImperativeHandle: function(t, l, e) {
      e = e != null ? e.concat([t]) : null, ii(
        4194308,
        4,
        Zr.bind(null, l, t),
        e
      );
    },
    useLayoutEffect: function(t, l) {
      return ii(4194308, 4, t, l);
    },
    useInsertionEffect: function(t, l) {
      ii(4, 2, t, l);
    },
    useMemo: function(t, l) {
      var e = ml();
      l = l === void 0 ? null : l;
      var a = t();
      if (ba) {
        Ce(!0);
        try {
          t();
        } finally {
          Ce(!1);
        }
      }
      return e.memoizedState = [a, l], a;
    },
    useReducer: function(t, l, e) {
      var a = ml();
      if (e !== void 0) {
        var u = e(l);
        if (ba) {
          Ce(!0);
          try {
            e(l);
          } finally {
            Ce(!1);
          }
        }
      } else u = l;
      return a.memoizedState = a.baseState = u, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: u
      }, a.queue = t, t = t.dispatch = sh.bind(
        null,
        tt,
        t
      ), [a.memoizedState, t];
    },
    useRef: function(t) {
      var l = ml();
      return t = { current: t }, l.memoizedState = t;
    },
    useState: function(t) {
      t = nf(t);
      var l = t.queue, e = Pr.bind(null, tt, l);
      return l.dispatch = e, [t.memoizedState, e];
    },
    useDebugValue: sf,
    useDeferredValue: function(t, l) {
      var e = ml();
      return of(e, t, l);
    },
    useTransition: function() {
      var t = nf(!1);
      return t = $r.bind(
        null,
        tt,
        t.queue,
        !0,
        !1
      ), ml().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, l, e) {
      var a = tt, u = ml();
      if (it) {
        if (e === void 0)
          throw Error(f(407));
        e = e();
      } else {
        if (e = l(), Ut === null)
          throw Error(f(349));
        (vt & 127) !== 0 || pr(a, l, e);
      }
      u.memoizedState = e;
      var n = { value: e, getSnapshot: l };
      return u.queue = n, Gr(zr.bind(null, a, n, t), [
        t
      ]), a.flags |= 2048, Ia(
        9,
        { destroy: void 0 },
        Nr.bind(
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
      var t = ml(), l = Ut.identifierPrefix;
      if (it) {
        var e = ee, a = le;
        e = (a & ~(1 << 32 - Nl(a) - 1)).toString(32) + e, l = "_" + l + "R_" + e, e = ei++, 0 < e && (l += "H" + e.toString(32)), l += "_";
      } else
        e = eh++, l = "_" + l + "r_" + e.toString(32) + "_";
      return t.memoizedState = l;
    },
    useHostTransitionStatus: mf,
    useFormState: Hr,
    useActionState: Hr,
    useOptimistic: function(t) {
      var l = ml();
      l.memoizedState = l.baseState = t;
      var e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return l.queue = e, l = df.bind(
        null,
        tt,
        !0,
        e
      ), e.dispatch = l, [t, l];
    },
    useMemoCache: ef,
    useCacheRefresh: function() {
      return ml().memoizedState = fh.bind(
        null,
        tt
      );
    },
    useEffectEvent: function(t) {
      var l = ml(), e = { impl: t };
      return l.memoizedState = e, function() {
        if ((_t & 2) !== 0)
          throw Error(f(440));
        return e.impl.apply(void 0, arguments);
      };
    }
  }, am = {
    readContext: ll,
    use: ui,
    useCallback: wr,
    useContext: ll,
    useEffect: ff,
    useImperativeHandle: Vr,
    useInsertionEffect: Xr,
    useLayoutEffect: Qr,
    useMemo: Kr,
    useReducer: ni,
    useRef: Yr,
    useState: function() {
      return ni(_e);
    },
    useDebugValue: sf,
    useDeferredValue: function(t, l) {
      var e = Qt();
      return Jr(
        e,
        Ct.memoizedState,
        t,
        l
      );
    },
    useTransition: function() {
      var t = ni(_e)[0], l = Qt().memoizedState;
      return [
        typeof t == "boolean" ? t : $u(t),
        l
      ];
    },
    useSyncExternalStore: _r,
    useId: kr,
    useHostTransitionStatus: mf,
    useFormState: jr,
    useActionState: jr,
    useOptimistic: function(t, l) {
      var e = Qt();
      return Mr(e, Ct, t, l);
    },
    useMemoCache: ef,
    useCacheRefresh: Ir,
    useEffectEvent: Lr
  }, oh = {
    readContext: ll,
    use: ui,
    useCallback: wr,
    useContext: ll,
    useEffect: ff,
    useImperativeHandle: Vr,
    useInsertionEffect: Xr,
    useLayoutEffect: Qr,
    useMemo: Kr,
    useReducer: uf,
    useRef: Yr,
    useState: function() {
      return uf(_e);
    },
    useDebugValue: sf,
    useDeferredValue: function(t, l) {
      var e = Qt();
      return Ct === null ? of(e, t, l) : Jr(
        e,
        Ct.memoizedState,
        t,
        l
      );
    },
    useTransition: function() {
      var t = uf(_e)[0], l = Qt().memoizedState;
      return [
        typeof t == "boolean" ? t : $u(t),
        l
      ];
    },
    useSyncExternalStore: _r,
    useId: kr,
    useHostTransitionStatus: mf,
    useFormState: qr,
    useActionState: qr,
    useOptimistic: function(t, l) {
      var e = Qt();
      return Ct !== null ? Mr(e, Ct, t, l) : (e.baseState = t, [t, e.queue.dispatch]);
    },
    useMemoCache: ef,
    useCacheRefresh: Ir,
    useEffectEvent: Lr
  };
  function vf(t, l, e, a) {
    l = t.memoizedState, e = e(a, l), e = e == null ? l : Q({}, l, e), t.memoizedState = e, t.lanes === 0 && (t.updateQueue.baseState = e);
  }
  var hf = {
    enqueueSetState: function(t, l, e) {
      t = t._reactInternals;
      var a = Ul(), u = Ge(a);
      u.payload = l, e != null && (u.callback = e), l = Le(t, u, a), l !== null && (Tl(l, t, a), Zu(l, t, a));
    },
    enqueueReplaceState: function(t, l, e) {
      t = t._reactInternals;
      var a = Ul(), u = Ge(a);
      u.tag = 1, u.payload = l, e != null && (u.callback = e), l = Le(t, u, a), l !== null && (Tl(l, t, a), Zu(l, t, a));
    },
    enqueueForceUpdate: function(t, l) {
      t = t._reactInternals;
      var e = Ul(), a = Ge(e);
      a.tag = 2, l != null && (a.callback = l), l = Le(t, a, e), l !== null && (Tl(l, t, e), Zu(l, t, e));
    }
  };
  function um(t, l, e, a, u, n, i) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(a, n, i) : l.prototype && l.prototype.isPureReactComponent ? !ju(e, a) || !ju(u, n) : !0;
  }
  function nm(t, l, e, a) {
    t = l.state, typeof l.componentWillReceiveProps == "function" && l.componentWillReceiveProps(e, a), typeof l.UNSAFE_componentWillReceiveProps == "function" && l.UNSAFE_componentWillReceiveProps(e, a), l.state !== t && hf.enqueueReplaceState(l, l.state, null);
  }
  function Ta(t, l) {
    var e = l;
    if ("ref" in l) {
      e = {};
      for (var a in l)
        a !== "ref" && (e[a] = l[a]);
    }
    if (t = t.defaultProps) {
      e === l && (e = Q({}, e));
      for (var u in t)
        e[u] === void 0 && (e[u] = t[u]);
    }
    return e;
  }
  function im(t) {
    qn(t);
  }
  function cm(t) {
    console.error(t);
  }
  function fm(t) {
    qn(t);
  }
  function oi(t, l) {
    try {
      var e = t.onUncaughtError;
      e(l.value, { componentStack: l.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function sm(t, l, e) {
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
  function yf(t, l, e) {
    return e = Ge(e), e.tag = 3, e.payload = { element: null }, e.callback = function() {
      oi(t, l);
    }, e;
  }
  function om(t) {
    return t = Ge(t), t.tag = 3, t;
  }
  function rm(t, l, e, a) {
    var u = e.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var n = a.value;
      t.payload = function() {
        return u(n);
      }, t.callback = function() {
        sm(l, e, a);
      };
    }
    var i = e.stateNode;
    i !== null && typeof i.componentDidCatch == "function" && (t.callback = function() {
      sm(l, e, a), typeof u != "function" && ($e === null ? $e = /* @__PURE__ */ new Set([this]) : $e.add(this));
      var c = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: c !== null ? c : ""
      });
    });
  }
  function rh(t, l, e, a, u) {
    if (e.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (l = e.alternate, l !== null && ma(
        l,
        e,
        u,
        !0
      ), e = el.current, e !== null) {
        switch (e.tag) {
          case 31:
          case 13:
          case 19:
            return fl === null ? Ui() : e.alternate === null && Gt === 0 && (Gt = 3), e.flags &= -257, e.flags |= 65536, e.lanes = u, a === Wn ? e.flags |= 16384 : (l = e.updateQueue, l === null ? e.updateQueue = /* @__PURE__ */ new Set([a]) : l.add(a), ts(t, a, u)), !1;
          case 22:
            return e.flags |= 65536, a === Wn ? e.flags |= 16384 : (l = e.updateQueue, l === null ? (l = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, e.updateQueue = l) : (e = l.retryQueue, e === null ? l.retryQueue = /* @__PURE__ */ new Set([a]) : e.add(a)), ts(t, a, u)), !1;
        }
        throw Error(f(435, e.tag));
      }
      return ts(t, a, u), Ui(), !1;
    }
    if (it)
      return l = el.current, l !== null ? ((l.flags & 65536) === 0 && (l.flags |= 256), l.flags |= 65536, l.lanes = u, a !== jc && (t = Error(f(422), { cause: a }), Yu(Bl(t, e)))) : (a !== jc && (l = Error(f(423), {
        cause: a
      }), Yu(
        Bl(l, e)
      )), t = t.current.alternate, t.flags |= 65536, u &= -u, t.lanes |= u, a = Bl(a, e), u = yf(
        t.stateNode,
        a,
        u
      ), wc(t, u), Gt !== 4 && (Gt = 2)), !1;
    var n = Error(f(520), { cause: a });
    if (n = Bl(n, e), an === null ? an = [n] : an.push(n), Gt !== 4 && (Gt = 2), l === null) return !0;
    a = Bl(a, e), e = l;
    do {
      switch (e.tag) {
        case 3:
          return e.flags |= 65536, t = u & -u, e.lanes |= t, t = yf(e.stateNode, a, t), wc(e, t), !1;
        case 1:
          if (l = e.type, n = e.stateNode, (e.flags & 128) === 0 && (typeof l.getDerivedStateFromError == "function" || n !== null && typeof n.componentDidCatch == "function" && ($e === null || !$e.has(n))))
            return e.flags |= 65536, u &= -u, e.lanes |= u, u = om(u), rm(
              u,
              t,
              e,
              a
            ), wc(e, u), !1;
          break;
        case 22:
          if (e.memoizedState !== null)
            return e.flags |= 65536, !1;
      }
      e = e.return;
    } while (e !== null);
    return !1;
  }
  var gf = Error(f(461)), wt = !1;
  function Ft(t, l, e, a) {
    l.child = t === null ? hr(l, null, e, a) : Sa(
      l,
      t.child,
      e,
      a
    );
  }
  function mm(t, l, e, a, u) {
    e = e.render;
    var n = l.ref;
    if ("ref" in a) {
      var i = {};
      for (var c in a)
        c !== "ref" && (i[c] = a[c]);
    } else i = a;
    return da(l), a = Ic(
      t,
      l,
      e,
      i,
      n,
      u
    ), c = Pc(), t !== null && !wt ? (tf(t, l, u), pe(t, l, u)) : (it && c && Zn(l), l.flags |= 1, Ft(t, l, a, u), l.child);
  }
  function dm(t, l, e, a, u) {
    if (t === null) {
      var n = e.type;
      return typeof n == "function" && !Uc(n) && n.defaultProps === void 0 && e.compare === null ? (l.tag = 15, l.type = n, vm(
        t,
        l,
        n,
        a,
        u
      )) : (t = Xn(
        e.type,
        null,
        a,
        l,
        l.mode,
        u
      ), t.ref = l.ref, t.return = l, l.child = t);
    }
    if (n = t.child, !zf(t, u)) {
      var i = n.memoizedProps;
      if (e = e.compare, e = e !== null ? e : ju, e(i, a) && t.ref === l.ref)
        return pe(t, l, u);
    }
    return l.flags |= 1, t = ge(n, a), t.ref = l.ref, t.return = l, l.child = t;
  }
  function vm(t, l, e, a, u) {
    if (t !== null) {
      var n = t.memoizedProps;
      if (ju(n, a) && t.ref === l.ref)
        if (wt = !1, l.pendingProps = a = n, zf(t, u))
          (t.flags & 131072) !== 0 && (wt = !0);
        else
          return l.lanes = t.lanes, pe(t, l, u);
    }
    return Sf(
      t,
      l,
      e,
      a,
      u
    );
  }
  function hm(t, l, e, a) {
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
        return ym(
          t,
          l,
          n,
          e,
          a
        );
      }
      if ((e & 536870912) !== 0)
        l.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && $n(
          l,
          n !== null ? n.cachePool : null
        ), n !== null ? Sr(l, n) : Jc(), br(l);
      else
        return a = l.lanes = 536870912, ym(
          t,
          l,
          n !== null ? n.baseLanes | e : e,
          e,
          a
        );
    } else
      n !== null ? ($n(l, n.cachePool), Sr(l, n), Ze(), l.memoizedState = null) : (t !== null && $n(l, null), Jc(), Ze());
    return Ft(t, l, u, e), l.child;
  }
  function Wu(t, l) {
    return t !== null && t.tag === 22 || l.stateNode !== null || (l.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.sibling;
  }
  function ym(t, l, e, a, u) {
    var n = Xc();
    return n = n === null ? null : { parent: Zt._currentValue, pool: n }, l.memoizedState = {
      baseLanes: e,
      cachePool: n
    }, t !== null && $n(l, null), Jc(), br(l), t !== null && ma(t, l, a, !0), l.childLanes = u, null;
  }
  function ri(t, l) {
    return l = mi(
      { mode: l.mode, children: l.children },
      t.mode
    ), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function gm(t, l, e) {
    return Sa(l, t.child, null, e), t = ri(l, l.pendingProps), t.flags |= 2, Al(l), l.memoizedState = null, t;
  }
  function mh(t, l, e) {
    var a = l.pendingProps, u = (l.flags & 128) !== 0;
    if (l.flags &= -129, t === null) {
      if (it) {
        if (a.mode === "hidden")
          return t = ri(l, a), l.lanes = 536870912, t.memoizedState = { baseLanes: 0, cachePool: null }, Wu(null, t);
        if (Fc(l), (t = xt) ? (t = Zd(
          t,
          Gl
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: xe !== null ? { id: le, overflow: ee } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = tr(t), e.return = l, l.child = e, kt = l, xt = null)) : t = null, t === null) throw je(l);
        return l.lanes = 536870912, null;
      }
      return ri(l, a);
    }
    var n = t.memoizedState;
    if (n !== null) {
      var i = n.dehydrated;
      if (Fc(l), u)
        if (l.flags & 256)
          l.flags &= -257, l = gm(
            t,
            l,
            e
          );
        else if (l.memoizedState !== null)
          l.child = t.child, l.flags |= 128, l = null;
        else throw Error(f(558));
      else if (wt || ma(t, l, e, !1), u = (e & t.childLanes) !== 0, wt || u) {
        if (Xe.current === null) {
          if (a = Ut, a !== null && (i = eo(a, e), i !== 0 && i !== n.retryLane))
            throw n.retryLane = i, fa(t, i), Tl(a, t, i), gf;
          Ui();
        }
        l = gm(
          t,
          l,
          e
        );
      } else
        t = n.treeContext, xt = Xl(i.nextSibling), kt = l, it = !0, He = null, Gl = !1, t !== null && ar(l, t), l = ri(l, a), l.flags |= 134221824;
      return l;
    }
    return t = ge(t.child, {
      mode: a.mode,
      children: a.children
    }), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function Pa(t, l) {
    var e = l.ref;
    if (e === null)
      t !== null && t.ref !== null && (l.flags |= 4194816);
    else {
      if (typeof e != "function" && typeof e != "object")
        throw Error(f(284));
      (t === null || t.ref !== e) && (l.flags |= 4194816);
    }
  }
  function Sf(t, l, e, a, u) {
    return da(l), e = Ic(
      t,
      l,
      e,
      a,
      void 0,
      u
    ), a = Pc(), t !== null && !wt ? (tf(t, l, u), pe(t, l, u)) : (it && a && Zn(l), l.flags |= 1, Ft(t, l, e, u), l.child);
  }
  function Sm(t, l, e, a, u, n) {
    return da(l), l.updateQueue = null, e = Er(
      l,
      a,
      e,
      u
    ), Tr(t), a = Pc(), t !== null && !wt ? (tf(t, l, n), pe(t, l, n)) : (it && a && Zn(l), l.flags |= 1, Ft(t, l, e, n), l.child);
  }
  function bm(t, l, e, a, u) {
    if (da(l), l.stateNode === null) {
      var n = Za, i = e.contextType;
      typeof i == "object" && i !== null && (n = ll(i)), n = new e(a, n), l.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = hf, l.stateNode = n, n._reactInternals = l, n = l.stateNode, n.props = a, n.state = l.memoizedState, n.refs = {}, Zc(l), i = e.contextType, n.context = typeof i == "object" && i !== null ? ll(i) : Za, n.state = l.memoizedState, i = e.getDerivedStateFromProps, typeof i == "function" && (vf(
        l,
        e,
        i,
        a
      ), n.state = l.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof n.getSnapshotBeforeUpdate == "function" || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (i = n.state, typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(), i !== n.state && hf.enqueueReplaceState(n, n.state, null), wu(l, a, n, u), Vu(), n.state = l.memoizedState), typeof n.componentDidMount == "function" && (l.flags |= 4194308), a = !0;
    } else if (t === null) {
      n = l.stateNode;
      var c = l.memoizedProps, o = Ta(e, c);
      n.props = o;
      var y = n.context, E = e.contextType;
      i = Za, typeof E == "object" && E !== null && (i = ll(E));
      var N = e.getDerivedStateFromProps;
      E = typeof N == "function" || typeof n.getSnapshotBeforeUpdate == "function", c = l.pendingProps !== c, E || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (c || y !== i) && nm(
        l,
        n,
        a,
        i
      ), Ye = !1;
      var v = l.memoizedState;
      n.state = v, wu(l, a, n, u), Vu(), y = l.memoizedState, c || v !== y || Ye ? (typeof N == "function" && (vf(
        l,
        e,
        N,
        a
      ), y = l.memoizedState), (o = Ye || um(
        l,
        e,
        o,
        a,
        v,
        y,
        i
      )) ? (E || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount()), typeof n.componentDidMount == "function" && (l.flags |= 4194308)) : (typeof n.componentDidMount == "function" && (l.flags |= 4194308), l.memoizedProps = a, l.memoizedState = y), n.props = a, n.state = y, n.context = i, a = o) : (typeof n.componentDidMount == "function" && (l.flags |= 4194308), a = !1);
    } else {
      n = l.stateNode, Vc(t, l), i = l.memoizedProps, E = Ta(e, i), n.props = E, N = l.pendingProps, v = n.context, y = e.contextType, o = Za, typeof y == "object" && y !== null && (o = ll(y)), c = e.getDerivedStateFromProps, (y = typeof c == "function" || typeof n.getSnapshotBeforeUpdate == "function") || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (i !== N || v !== o) && nm(
        l,
        n,
        a,
        o
      ), Ye = !1, v = l.memoizedState, n.state = v, wu(l, a, n, u), Vu();
      var b = l.memoizedState;
      i !== N || v !== b || Ye || t !== null && t.dependencies !== null && Kn(t.dependencies) ? (typeof c == "function" && (vf(
        l,
        e,
        c,
        a
      ), b = l.memoizedState), (E = Ye || um(
        l,
        e,
        E,
        a,
        v,
        b,
        o
      ) || t !== null && t.dependencies !== null && Kn(t.dependencies)) ? (y || typeof n.UNSAFE_componentWillUpdate != "function" && typeof n.componentWillUpdate != "function" || (typeof n.componentWillUpdate == "function" && n.componentWillUpdate(a, b, o), typeof n.UNSAFE_componentWillUpdate == "function" && n.UNSAFE_componentWillUpdate(
        a,
        b,
        o
      )), typeof n.componentDidUpdate == "function" && (l.flags |= 4), typeof n.getSnapshotBeforeUpdate == "function" && (l.flags |= 1024)) : (typeof n.componentDidUpdate != "function" || i === t.memoizedProps && v === t.memoizedState || (l.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && v === t.memoizedState || (l.flags |= 1024), l.memoizedProps = a, l.memoizedState = b), n.props = a, n.state = b, n.context = o, a = E) : (typeof n.componentDidUpdate != "function" || i === t.memoizedProps && v === t.memoizedState || (l.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && v === t.memoizedState || (l.flags |= 1024), a = !1);
    }
    return n = a, Pa(t, l), a = (l.flags & 128) !== 0, n || a ? (n = l.stateNode, e = a && typeof e.getDerivedStateFromError != "function" ? null : n.render(), l.flags |= 1, t !== null && a ? (l.child = Sa(
      l,
      t.child,
      null,
      u
    ), l.child = Sa(
      l,
      null,
      e,
      u
    )) : Ft(t, l, e, u), l.memoizedState = n.state, t = l.child) : t = pe(
      t,
      l,
      u
    ), t;
  }
  function Tm(t, l, e, a) {
    return oa(), l.flags |= 256, Ft(t, l, e, a), l.child;
  }
  var bf = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Tf(t) {
    return { baseLanes: t, cachePool: sr() };
  }
  function Ef(t, l, e) {
    return t = t !== null ? t.childLanes & ~e : 0, l && (t |= Cl), t;
  }
  function Em(t, l, e) {
    var a = l.pendingProps, u = !1, n = (l.flags & 128) !== 0, i;
    if ((i = n) || (i = t !== null && t.memoizedState === null ? !1 : (al.current & 2) !== 0), i && (u = !0, l.flags &= -129), i = (l.flags & 32) !== 0, l.flags &= -33, t === null) {
      if (it) {
        if (u ? Qe(l) : Ze(), (t = xt) ? (t = Zd(
          t,
          Gl
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: xe !== null ? { id: le, overflow: ee } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = tr(t), e.return = l, l.child = e, kt = l, xt = null)) : t = null, t === null) throw je(l);
        return Ts(t) ? l.lanes = 32 : l.lanes = 536870912, null;
      }
      return n = a.children, a = a.fallback, u ? (Ze(), u = l.mode, n = mi(
        { mode: "hidden", children: n },
        u
      ), a = sa(
        a,
        u,
        e,
        null
      ), n.return = l, a.return = l, n.sibling = a, l.child = n, a = l.child, a.memoizedState = Tf(e), a.childLanes = Ef(
        t,
        i,
        e
      ), l.memoizedState = bf, Wu(null, a)) : (Qe(l), _f(l, n));
    }
    var c = t.memoizedState;
    if (c !== null) {
      var o = c.dehydrated;
      if (o !== null)
        return dh(
          t,
          l,
          n,
          i,
          a,
          o,
          c,
          e
        );
    }
    return u ? (Ze(), u = a.fallback, n = l.mode, c = t.child, o = c.sibling, a = ge(c, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = c.subtreeFlags & 1206910976, o !== null ? u = ge(o, u) : (u = sa(
      u,
      n,
      e,
      null
    ), u.flags |= 2), u.return = l, a.return = l, a.sibling = u, l.child = a, Wu(null, a), a = l.child, u = t.child.memoizedState, u === null ? u = Tf(e) : (n = u.cachePool, n !== null ? (c = Zt._currentValue, n = n.parent !== c ? { parent: c, pool: c } : n) : n = sr(), u = {
      baseLanes: u.baseLanes | e,
      cachePool: n
    }), a.memoizedState = u, a.childLanes = Ef(
      t,
      i,
      e
    ), l.memoizedState = bf, Wu(t.child, a)) : (Qe(l), e = t.child, t = e.sibling, e = ge(e, {
      mode: "visible",
      children: a.children
    }), e.return = l, e.sibling = null, t !== null && (i = l.deletions, i === null ? (l.deletions = [t], l.flags |= 16) : i.push(t)), l.child = e, l.memoizedState = null, e);
  }
  function _f(t, l) {
    return l = mi(
      { mode: "visible", children: l },
      t.mode
    ), l.return = t, t.child = l;
  }
  function mi(t, l) {
    return t = yl(22, t, null, l), t.lanes = 0, t;
  }
  function di(t, l, e) {
    return Sa(l, t.child, null, e), t = _f(
      l,
      l.pendingProps.children
    ), t.flags |= 2, l.memoizedState = null, t;
  }
  function dh(t, l, e, a, u, n, i, c) {
    if (e)
      return l.flags & 256 ? (Qe(l), l.flags &= -257, di(
        t,
        l,
        c
      )) : l.memoizedState !== null ? (Ze(), l.child = t.child, l.flags |= 128, null) : (Ze(), n = u.fallback, i = l.mode, u = mi(
        { mode: "visible", children: u.children },
        i
      ), n = sa(
        n,
        i,
        c,
        null
      ), n.flags |= 2, u.return = l, n.return = l, u.sibling = n, l.child = u, Sa(l, t.child, null, c), u = l.child, u.memoizedState = Tf(c), u.childLanes = Ef(
        t,
        a,
        c
      ), l.memoizedState = bf, Wu(null, u));
    if (Qe(l), Ts(n)) {
      if (a = n.nextSibling && n.nextSibling.dataset, a) var o = a.dgst;
      return a = o, a !== "" && (u = Error(f(419)), u.stack = "", u.digest = a, Yu({ value: u, source: null, stack: null })), di(
        t,
        l,
        c
      );
    }
    if (wt || ma(t, l, c, !1), a = (c & t.childLanes) !== 0, wt || a) {
      if (Xe.current !== null)
        return di(
          t,
          l,
          c
        );
      if (a = Ut, a !== null && (u = eo(
        a,
        c
      ), u !== 0 && u !== i.retryLane))
        throw i.retryLane = u, fa(t, u), Tl(a, t, u), gf;
      return bs(n) || Ui(), di(
        t,
        l,
        c
      );
    }
    return bs(n) ? (l.flags |= 192, l.child = t.child, null) : (t = i.treeContext, xt = Xl(n.nextSibling), kt = l, it = !0, He = null, Gl = !1, t !== null && ar(l, t), l = _f(
      l,
      u.children
    ), l.flags |= 134221824, l);
  }
  function _m(t, l, e) {
    t.lanes |= l;
    var a = t.alternate;
    a !== null && (a.lanes |= l), wn(t.return, l, e);
  }
  function pm(t) {
    for (var l = null; t !== null; ) {
      var e = t.alternate;
      e !== null && ti(e) === null && (l = t), t = t.sibling;
    }
    return l;
  }
  function vi(t, l, e, a, u, n) {
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
  function pf(t) {
    var l = t.child;
    for (t.child = null; l !== null; ) {
      var e = l.sibling;
      l.sibling = t.child, t.child = l, l = e;
    }
  }
  function Nf(t, l, e) {
    var a = l.pendingProps, u = a.revealOrder, n = a.tail;
    a = a.children;
    var i = al.current;
    if (l.flags & 128)
      return Ku(l, i), null;
    var c = (i & 2) !== 0;
    if (c ? (i = i & 1 | 2, l.flags |= 128) : i &= 1, Ku(l, i), u === "backwards" && t !== null ? (pf(t), Ft(t, l, a, e), pf(t)) : Ft(t, l, a, e), a = it ? qu : 0, !c && t !== null && (t.flags & 128) !== 0)
      t: for (t = l.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && _m(t, e, l);
        else if (t.tag === 19)
          _m(t, e, l);
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
        e = pm(l.child), e === null ? (u = l.child, l.child = null) : (u = e.sibling, e.sibling = null, pf(l)), vi(
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
          if (t = u.alternate, t !== null && ti(t) === null) {
            l.child = u;
            break;
          }
          t = u.sibling, u.sibling = e, e = u, u = t;
        }
        vi(
          l,
          !0,
          e,
          null,
          n,
          a
        );
        break;
      case "together":
        vi(
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
        e = pm(l.child), e === null ? (u = l.child, l.child = null) : (u = e.sibling, e.sibling = null), vi(
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
  function Nm(t, l, e) {
    var a = l.pendingProps;
    return Be(l, l.type, a.value), Ft(t, l, a.children, e), l.child;
  }
  function pe(t, l, e) {
    if (t !== null && (l.dependencies = t.dependencies), Je |= l.lanes, (e & l.childLanes) === 0)
      if (t !== null) {
        if (ma(
          t,
          l,
          e,
          !1
        ), (e & l.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && l.child !== t.child)
      throw Error(f(153));
    if (l.child !== null) {
      for (t = l.child, e = ge(t, t.pendingProps), l.child = e, e.return = l; t.sibling !== null; )
        t = t.sibling, e = e.sibling = ge(t, t.pendingProps), e.return = l;
      e.sibling = null;
    }
    return l.child;
  }
  function zf(t, l) {
    return (t.lanes & l) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Kn(t)));
  }
  function vh(t, l, e) {
    switch (l.tag) {
      case 3:
        Me(l, l.stateNode.containerInfo), Be(l, Zt, t.memoizedState.cache), oa();
        break;
      case 27:
      case 5:
        ki(l);
        break;
      case 4:
        Me(l, l.stateNode.containerInfo);
        break;
      case 10:
        Be(
          l,
          l.type,
          l.memoizedProps.value
        );
        break;
      case 31:
        if (l.memoizedState !== null)
          return l.flags |= 128, Fc(l), null;
        break;
      case 13:
        var a = l.memoizedState;
        if (a !== null) {
          if (a.dehydrated !== null)
            return Qe(l), l.flags |= 128, null;
          a = ma(
            t,
            l,
            e,
            !1
          );
          var u = l.child.childLanes;
          return a || (e & u) !== 0 ? Em(t, l, e) : (Qe(l), t = pe(
            t,
            l,
            e
          ), t !== null ? t.sibling : null);
        }
        Qe(l);
        break;
      case 19:
        if (l.flags & 128)
          return Nf(
            t,
            l,
            e
          );
        if (u = (t.flags & 128) !== 0, a = (e & l.childLanes) !== 0, a || (ma(
          t,
          l,
          e,
          !1
        ), a = (e & l.childLanes) !== 0), u) {
          if (a)
            return Nf(
              t,
              l,
              e
            );
          l.flags |= 128;
        }
        if (u = l.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), Ku(l, al.current), a) break;
        return null;
      case 22:
        return l.lanes = 0, hm(
          t,
          l,
          e,
          l.pendingProps
        );
      case 24:
        Be(l, Zt, t.memoizedState.cache);
    }
    return pe(t, l, e);
  }
  function zm(t, l, e) {
    if (t !== null)
      if (t.memoizedProps !== l.pendingProps)
        wt = !0;
      else {
        if (!zf(t, e) && (l.flags & 128) === 0)
          return wt = !1, vh(
            t,
            l,
            e
          );
        wt = (t.flags & 131072) !== 0;
      }
    else
      wt = !1, it && (l.flags & 1048576) !== 0 && er(l, qu, l.index);
    switch (l.lanes = 0, l.tag) {
      case 16:
        t: {
          var a = l.pendingProps;
          if (t = ya(l.elementType), l.type = t, typeof t == "function")
            Uc(t) ? (a = Ta(t, a), l.tag = 1, l = bm(
              null,
              l,
              t,
              a,
              e
            )) : (l.tag = 0, l = Sf(
              null,
              l,
              t,
              a,
              e
            ));
          else {
            if (t != null) {
              var u = t.$$typeof;
              if (u === H) {
                l.tag = 11, l = mm(
                  null,
                  l,
                  t,
                  a,
                  e
                );
                break t;
              } else if (u === Nt) {
                l.tag = 14, l = dm(
                  null,
                  l,
                  t,
                  a,
                  e
                );
                break t;
              } else if (u === dt) {
                l.tag = 10, l.type = t, l = Nm(
                  null,
                  l,
                  e
                );
                break t;
              }
            }
            throw l = st(t) || t, Error(f(306, l, ""));
          }
        }
        return l;
      case 0:
        return Sf(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 1:
        return a = l.type, u = Ta(
          a,
          l.pendingProps
        ), bm(
          t,
          l,
          a,
          u,
          e
        );
      case 3:
        t: {
          if (Me(
            l,
            l.stateNode.containerInfo
          ), t === null) throw Error(f(387));
          a = l.pendingProps;
          var n = l.memoizedState;
          u = n.element, Vc(t, l), wu(l, a, null, e);
          var i = l.memoizedState;
          if (a = i.cache, Be(l, Zt, a), a !== n.cache && Yc(
            l,
            [Zt],
            e,
            !0
          ), Vu(), a = i.element, n.isDehydrated)
            if (n = {
              element: a,
              isDehydrated: !1,
              cache: i.cache
            }, l.updateQueue.baseState = n, l.memoizedState = n, l.flags & 256) {
              l = Tm(
                t,
                l,
                a,
                e
              );
              break t;
            } else if (a !== u) {
              u = Bl(
                Error(f(424)),
                l
              ), Yu(u), l = Tm(
                t,
                l,
                a,
                e
              );
              break t;
            } else
              for (t = l.stateNode.containerInfo, t.nodeType === 9 ? t = t.body : t = t.nodeName === "HTML" ? t.ownerDocument.body : t, xt = Xl(t.firstChild), kt = l, it = !0, He = null, Gl = !0, e = hr(
                l,
                null,
                a,
                e
              ), l.child = e; e; )
                e.flags = e.flags & -3 | 134221824, e = e.sibling;
          else {
            if (oa(), a === u) {
              l = pe(
                t,
                l,
                e
              );
              break t;
            }
            Ft(t, l, a, e);
          }
          l = l.child;
        }
        return l;
      case 26:
        return Pa(t, l), t === null ? (e = Wd(
          l.type,
          null,
          l.pendingProps,
          null
        )) ? l.memoizedState = e : it || (l.stateNode = Dd(
          l.type,
          l.pendingProps,
          $t.current,
          l
        )) : l.memoizedState = Wd(
          l.type,
          t.memoizedProps,
          l.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return ki(l), t === null && it && (a = l.stateNode = Kd(
          l.type,
          l.pendingProps,
          $t.current
        ), kt = l, Gl = !0, u = xt, ke(l.type) ? (Es = u, xt = Xl(a.firstChild)) : xt = u), Ft(
          t,
          l,
          l.pendingProps.children,
          e
        ), Pa(t, l), t === null && (l.flags |= 4194304), l.child;
      case 5:
        return t === null && it && ((u = a = xt) && (a = fy(
          a,
          l.type,
          l.pendingProps,
          Gl
        ), a !== null ? (l.stateNode = a, kt = l, xt = Xl(a.firstChild), Gl = !1, u = !0) : u = !1), u || je(l)), ki(l), u = l.type, n = l.pendingProps, i = t !== null ? t.memoizedProps : null, a = n.children, ms(u, n) ? a = null : i !== null && ms(u, i) && (l.flags |= 32), l.memoizedState !== null && (u = Ic(
          t,
          l,
          ah,
          null,
          null,
          e
        ), gu._currentValue = u), Pa(t, l), Ft(t, l, a, e), l.child;
      case 6:
        return t === null && it && ((t = e = xt) && (e = sy(
          e,
          l.pendingProps,
          Gl
        ), e !== null ? (l.stateNode = e, kt = l, xt = null, t = !0) : t = !1), t || je(l)), null;
      case 13:
        return Em(t, l, e);
      case 4:
        return Me(
          l,
          l.stateNode.containerInfo
        ), a = l.pendingProps, t === null ? l.child = Sa(
          l,
          null,
          a,
          e
        ) : Ft(t, l, a, e), l.child;
      case 11:
        return mm(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 7:
        return a = l.pendingProps, Pa(t, l), Ft(t, l, a, e), l.child;
      case 8:
        return Ft(
          t,
          l,
          l.pendingProps.children,
          e
        ), l.child;
      case 12:
        return Ft(
          t,
          l,
          l.pendingProps.children,
          e
        ), l.child;
      case 10:
        return Nm(t, l, e);
      case 9:
        return u = l.type._context, a = l.pendingProps.children, da(l), u = ll(u), a = a(u), l.flags |= 1, Ft(t, l, a, e), l.child;
      case 14:
        return dm(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 15:
        return vm(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 19:
        return Nf(t, l, e);
      case 31:
        return mh(t, l, e);
      case 22:
        return hm(
          t,
          l,
          e,
          l.pendingProps
        );
      case 24:
        return da(l), a = ll(Zt), t === null ? (u = Xc(), u === null && (u = Ut, n = Gc(), u.pooledCache = n, n.refCount++, n !== null && (u.pooledCacheLanes |= e), u = n), l.memoizedState = { parent: a, cache: u }, Zc(l), Be(l, Zt, u)) : ((t.lanes & e) !== 0 && (Vc(t, l), wu(l, null, null, e), Vu()), u = t.memoizedState, n = l.memoizedState, u.parent !== a ? (u = { parent: a, cache: a }, l.memoizedState = u, l.lanes === 0 && (l.memoizedState = l.updateQueue.baseState = u), Be(l, Zt, a)) : (a = n.cache, Be(l, Zt, a), a !== u.cache && Yc(
          l,
          [Zt],
          e,
          !0
        ))), Ft(
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
        }), a = l.pendingProps, a.name != null && a.name !== "auto" ? l.flags |= t === null ? 18882560 : 18874368 : it && Zn(l), t !== null && t.memoizedProps.name !== a.name ? l.flags |= 4194816 : Pa(t, l), Ft(t, l, a.children, e), l.child;
      case 29:
        throw l.pendingProps;
    }
    throw Error(f(156, l.tag));
  }
  function Ne(t) {
    t.flags |= 4;
  }
  function Of(t, l, e, a, u) {
    var n;
    if ((n = (t.mode & 32) !== 0) && (n = e === null ? t0(l, a) : t0(l, a) && (a.src !== e.src || a.srcSet !== e.srcSet)), n) {
      if (t.flags |= 16777216, (u & 335544128) === u)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (id()) t.flags |= 8192;
        else
          throw ga = Wn, Qc;
    } else t.flags &= -16777217;
  }
  function Om(t, l) {
    if (l.type !== "stylesheet" || (l.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !l0(l))
      if (id()) t.flags |= 8192;
      else
        throw ga = Wn, Qc;
  }
  function hi(t, l) {
    l !== null && (t.flags |= 4), t.flags & 16384 && (l = t.tag !== 22 ? Ps() : 536870912, t.lanes |= l, uu |= l);
  }
  function ku(t, l) {
    if (!it)
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
  function hh(t, l, e) {
    var a = l.pendingProps;
    switch (Hc(l), l.tag) {
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
        return e = l.stateNode, a = null, t !== null && (a = t.memoizedState.cache), l.memoizedState.cache !== a && (l.flags |= 2048), Te(Zt), Ca(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (t === null || t.child === null) && (Ka(l) ? Ne(l) : t === null || t.memoizedState.isDehydrated && (l.flags & 256) === 0 || (l.flags |= 1024, Bc())), Ht(l), null;
      case 26:
        var u = l.type, n = l.memoizedState;
        return t === null ? (Ne(l), n !== null ? (Ht(l), Om(l, n)) : (Ht(l), Of(
          l,
          u,
          null,
          a,
          e
        ))) : n ? n !== t.memoizedState ? (Ne(l), Ht(l), Om(l, n)) : (Ht(l), l.flags &= -16777217) : (t = t.memoizedProps, t !== a && Ne(l), Ht(l), Of(
          l,
          u,
          t,
          a,
          e
        )), null;
      case 27:
        if (Tn(l), e = $t.current, u = l.type, t !== null && l.stateNode != null)
          t.memoizedProps !== a && Ne(l);
        else {
          if (!a) {
            if (l.stateNode === null)
              throw Error(f(166));
            return Ht(l), l.subtreeFlags &= -33554433, null;
          }
          t = nt.current, Ka(l) ? ur(l) : (t = Kd(u, a, e), l.stateNode = t, Ne(l));
        }
        return Ht(l), l.subtreeFlags &= -33554433, null;
      case 5:
        if (Tn(l), u = l.type, t !== null && l.stateNode != null)
          t.memoizedProps !== a && Ne(l);
        else {
          if (!a) {
            if (l.stateNode === null)
              throw Error(f(166));
            return Ht(l), l.subtreeFlags &= -33554433, null;
          }
          if (n = nt.current, Ka(l))
            ur(l);
          else {
            var i = sn(
              $t.current
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
            n[tl] = l, n[hl] = a;
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
            t: switch (nl(n, u, a), u) {
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
            a && Ne(l);
          }
        }
        return Ht(l), l.subtreeFlags &= -33554433, Of(
          l,
          l.type,
          t === null ? null : t.memoizedProps,
          l.pendingProps,
          e
        ), null;
      case 6:
        if (t && l.stateNode != null)
          t.memoizedProps !== a && Ne(l);
        else {
          if (typeof a != "string" && l.stateNode === null)
            throw Error(f(166));
          if (t = $t.current, Ka(l)) {
            if (t = l.stateNode, e = l.memoizedProps, a = null, u = kt, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  a = u.memoizedProps;
              }
            t[tl] = l, t = !!(t.nodeValue === e || a !== null && a.suppressHydrationWarning === !0 || zd(t.nodeValue, e)), t || je(l, !0);
          } else
            t = sn(t).createTextNode(
              a
            ), t[tl] = l, l.stateNode = t;
        }
        return Ht(l), null;
      case 31:
        if (e = l.memoizedState, t === null || t.memoizedState !== null) {
          if (a = Ka(l), e !== null) {
            if (t === null) {
              if (!a) throw Error(f(318));
              if (t = l.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(f(557));
              t[tl] = l;
            } else
              oa(), (l.flags & 128) === 0 && (l.memoizedState = null), l.flags |= 4;
            Ht(l), t = !1;
          } else
            e = Bc(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = e), t = !0;
          if (!t)
            return l.flags & 256 ? (Al(l), l) : (Al(l), null);
          if ((l.flags & 128) !== 0)
            throw Error(f(558));
        }
        return Ht(l), null;
      case 13:
        if (a = l.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (u = Ka(l), a !== null && a.dehydrated !== null) {
            if (t === null) {
              if (!u) throw Error(f(318));
              if (u = l.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(f(317));
              u[tl] = l;
            } else
              oa(), (l.flags & 128) === 0 && (l.memoizedState = null), l.flags |= 4;
            Ht(l), u = !1;
          } else
            u = Bc(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return l.flags & 256 ? (Al(l), l) : (Al(l), null);
        }
        return Al(l), (l.flags & 128) !== 0 ? (l.lanes = e, l) : (e = a !== null, t = t !== null && t.memoizedState !== null, e && (a = l.child, u = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (u = a.alternate.memoizedState.cachePool.pool), n = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (n = a.memoizedState.cachePool.pool), n !== u && (a.flags |= 2048)), e !== t && e && (l.child.flags |= 8192), hi(l, l.updateQueue), Ht(l), null);
      case 4:
        return Ca(), t === null && cs(l.stateNode.containerInfo), l.flags |= 67108864, Ht(l), null;
      case 10:
        return Te(l.type), Ht(l), null;
      case 19:
        if (Wc(l), a = l.memoizedState, a === null) return Ht(l), null;
        if (u = (l.flags & 128) !== 0, n = a.rendering, n === null)
          if (u) ku(a, !1);
          else {
            if (Gt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = l.child; t !== null; ) {
                if (n = ti(t), n !== null) {
                  for (l.flags |= 128, ku(a, !1), t = n.updateQueue, l.updateQueue = t, hi(l, t), l.subtreeFlags = 0, t = e, e = l.child; e !== null; )
                    Po(e, t), e = e.sibling;
                  return Ku(
                    l,
                    al.current & 1 | 2
                  ), it && Se(l, a.treeForkCount), l.child;
                }
                t = t.sibling;
              }
            a.tail !== null && _l() > Ai && (l.flags |= 128, u = !0, ku(a, !1), l.lanes = 4194304);
          }
        else {
          if (!u)
            if (t = ti(n), t !== null) {
              if (l.flags |= 128, u = !0, t = t.updateQueue, l.updateQueue = t, hi(l, t), ku(a, !0), a.tail === null && a.tailMode !== "collapsed" && a.tailMode !== "visible" && !n.alternate && !it)
                return Ht(l), null;
            } else
              2 * _l() - a.renderingStartTime > Ai && e !== 536870912 && (l.flags |= 128, u = !0, ku(a, !1), l.lanes = 4194304);
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
          return a.rendering = t, a.tail = t.sibling, a.renderingStartTime = _l(), t.sibling = null, n = al.current, n = u ? n & 1 | 2 : n & 1, a.tailMode === "visible" || a.tailMode === "collapsed" || !e || it ? Ku(l, n) : (e = n, z(el, l), z(al, e), fl === null && (fl = l)), it && Se(l, a.treeForkCount), t;
        }
        return Ht(l), null;
      case 22:
      case 23:
        return Al(l), $c(), a = l.memoizedState !== null, t !== null ? t.memoizedState !== null !== a && (l.flags |= 8192) : a && (l.flags |= 8192), a ? (e & 536870912) !== 0 && (l.flags & 128) === 0 && (Ht(l), l.subtreeFlags & 6 && (l.flags |= 8192)) : Ht(l), e = l.updateQueue, e !== null && hi(l, e.retryQueue), e = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), a = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (a = l.memoizedState.cachePool.pool), a !== e && (l.flags |= 2048), t !== null && Jt(ha), null;
      case 24:
        return e = null, t !== null && (e = t.memoizedState.cache), l.memoizedState.cache !== e && (l.flags |= 2048), Te(Zt), Ht(l), null;
      case 25:
        return null;
      case 30:
        return l.flags |= 33554432, Ht(l), null;
    }
    throw Error(f(156, l.tag));
  }
  function yh(t, l) {
    switch (Hc(l), l.tag) {
      case 1:
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 3:
        return Te(Zt), Ca(), t = l.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (l.flags = t & -65537 | 128, l) : null;
      case 26:
      case 27:
      case 5:
        return Tn(l), null;
      case 31:
        if (l.memoizedState !== null) {
          if (Al(l), l.alternate === null)
            throw Error(f(340));
          oa();
        }
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 13:
        if (Al(l), t = l.memoizedState, t !== null && t.dehydrated !== null) {
          if (l.alternate === null)
            throw Error(f(340));
          oa();
        }
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 19:
        return Wc(l), t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, t = l.memoizedState, t !== null && (t.rendering = null, t.tail = null), l.flags |= 4, l) : null;
      case 4:
        return Ca(), null;
      case 10:
        return Te(l.type), null;
      case 22:
      case 23:
        return Al(l), $c(), t !== null && Jt(ha), t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 24:
        return Te(Zt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Am(t, l) {
    switch (Hc(l), l.tag) {
      case 3:
        Te(Zt), Ca();
        break;
      case 26:
      case 27:
      case 5:
        Tn(l);
        break;
      case 4:
        Ca();
        break;
      case 31:
        l.memoizedState !== null && Al(l);
        break;
      case 13:
        Al(l);
        break;
      case 19:
        Wc(l);
        break;
      case 10:
        Te(l.type);
        break;
      case 22:
      case 23:
        Al(l), $c(), t !== null && Jt(ha);
        break;
      case 24:
        Te(Zt);
    }
  }
  function Iu(t, l) {
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
      Mt(l, l.return, c);
    }
  }
  function Ve(t, l, e) {
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
              var o = e, y = c;
              try {
                y();
              } catch (E) {
                Mt(
                  u,
                  o,
                  E
                );
              }
            }
          }
          a = a.next;
        } while (a !== n);
      }
    } catch (E) {
      Mt(l, l.return, E);
    }
  }
  function Mm(t) {
    var l = t.updateQueue;
    if (l !== null) {
      var e = t.stateNode;
      try {
        gr(l, e);
      } catch (a) {
        Mt(t, t.return, a);
      }
    }
  }
  function Dm(t, l, e) {
    e.props = Ta(
      t.type,
      t.memoizedProps
    ), e.state = t.memoizedState;
    try {
      e.componentWillUnmount();
    } catch (a) {
      Mt(t, l, a);
    }
  }
  function ae(t, l) {
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
            var u = t.stateNode, n = he(t.memoizedProps, u);
            (u.ref === null || u.ref.name !== n) && (u.ref = Bd(n)), a = u.ref;
            break;
          case 7:
            if (t.stateNode === null) {
              var i = new Rl(t);
              T(
                t.child,
                !1,
                iy,
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
      Mt(t, l, c);
    }
  }
  function ul(t, l) {
    var e = t.ref, a = t.refCleanup;
    if (e !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (u) {
          Mt(t, l, u);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof e == "function")
        try {
          e(null);
        } catch (u) {
          Mt(t, l, u);
        }
      else e.current = null;
  }
  function yi(t, l) {
    if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && t.alternate === null && l !== null)
      for (var e = 0; e < l.length; e++)
        Qd(
          t.stateNode,
          l[e]
        );
  }
  function Cm(t) {
    for (var l = t.return; l !== null && (Mf(l) && Qd(t.stateNode, l.stateNode), !Af(l)); )
      l = l.return;
  }
  function Pu(t) {
    for (var l = t.return; l !== null && (Mf(l) && cy(t.stateNode, l.stateNode), !Af(l)); )
      l = l.return;
  }
  function Af(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 27;
  }
  function Mf(t) {
    return t && t.tag === 7 && t.stateNode !== null;
  }
  function Df(t) {
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
      Mt(t, t.return, u);
    }
  }
  function Cf(t, l, e) {
    try {
      var a = t.stateNode;
      Qh(a, t.type, e, l), a[hl] = l;
    } catch (u) {
      Mt(t, t.return, u);
    }
  }
  function Um(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && ke(t.type) || t.tag === 4;
  }
  function Uf(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Um(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && ke(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Rf(t, l, e, a) {
    var u = t.tag;
    if (u === 5 || u === 6)
      u = t.stateNode, l ? (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).insertBefore(u, l) : (l = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, l.appendChild(u), e = e._reactRootContainer, e != null || l.onclick !== null || (l.onclick = te)), yi(t, a), Et = !0;
    else if (u !== 4 && (u === 27 && (yi(t, a), a = null, ke(t.type) && (e = t.stateNode, l = null)), t = t.child, t !== null))
      for (Rf(
        t,
        l,
        e,
        a
      ), t = t.sibling; t !== null; )
        Rf(
          t,
          l,
          e,
          a
        ), t = t.sibling;
  }
  function gi(t, l, e, a) {
    var u = t.tag;
    if (u === 5 || u === 6)
      u = t.stateNode, l ? e.insertBefore(u, l) : e.appendChild(u), yi(t, a), Et = !0;
    else if (u !== 4 && (u === 27 && (yi(t, a), a = null, ke(t.type) && (e = t.stateNode)), t = t.child, t !== null))
      for (gi(
        t,
        l,
        e,
        a
      ), t = t.sibling; t !== null; )
        gi(
          t,
          l,
          e,
          a
        ), t = t.sibling;
  }
  function Rm(t) {
    var l = t.stateNode, e = t.memoizedProps;
    try {
      for (var a = t.type, u = l.attributes; u.length; )
        l.removeAttributeNode(u[0]);
      nl(l, a, e), l[tl] = t, l[hl] = e;
    } catch (n) {
      Mt(t, t.return, n);
    }
  }
  var Si = !1, Ml = null;
  function xm(t) {
    (t.tag === 30 || (t.subtreeFlags & 33554432) !== 0) && (Si = !0);
  }
  var ue = null;
  function Hm() {
    var t = ue;
    return ue = null, t;
  }
  var gl = 0;
  function tu(t, l, e, a, u) {
    return gl = 0, jm(
      t.child,
      l,
      e,
      a,
      u
    );
  }
  function jm(t, l, e, a, u) {
    for (var n = !1; t !== null; ) {
      if (t.tag === 5) {
        var i = t.stateNode;
        if (a !== null) {
          var c = hs(i);
          a.push(c), c.view && (n = !0);
        } else
          n || hs(i).view && (n = !0);
        Si = !0, Hd(
          i,
          gl === 0 ? l : l + "_" + gl,
          e
        ), gl++;
      } else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && u || jm(
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
  function ne(t, l) {
    for (; t !== null; )
      t.tag === 5 ? jd(t.stateNode, t.memoizedProps) : (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && l || ne(
        t.child,
        l
      )), t = t.sibling;
  }
  function bi(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if ((t.tag !== 22 || t.memoizedState === null) && (bi(t), t.tag === 30 && (t.flags & 18874368) !== 0 && t.stateNode.paired)) {
          var l = t.memoizedProps;
          if (l.name == null || l.name === "auto")
            throw Error(f(544));
          var e = l.name;
          l = ye(l.default, l.share), l !== "none" && (tu(
            t,
            e,
            l,
            null,
            !1
          ) || ne(t.child, !1));
        }
        t = t.sibling;
      }
  }
  function xf(t, l) {
    if (t.tag === 30) {
      var e = t.stateNode, a = t.memoizedProps, u = he(a, e), n = ye(
        a.default,
        e.paired ? a.share : a.enter
      );
      n !== "none" ? tu(t, u, n, null, !1) ? (bi(t), e.paired || l || fu(t, a.onEnter)) : ne(t.child, !1) : bi(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        xf(t, l), t = t.sibling;
    else bi(t);
  }
  function Hf(t) {
    if (Ml !== null && Ml.size !== 0) {
      var l = Ml;
      if ((t.subtreeFlags & 18874368) !== 0)
        for (t = t.child; t !== null; ) {
          if (t.tag !== 22 || t.memoizedState === null) {
            if (t.tag === 30 && (t.flags & 18874368) !== 0) {
              var e = t.memoizedProps, a = e.name;
              if (a != null && a !== "auto") {
                var u = l.get(a);
                if (u !== void 0) {
                  var n = ye(
                    e.default,
                    e.share
                  );
                  if (n !== "none" && (tu(
                    t,
                    a,
                    n,
                    null,
                    !1
                  ) ? (n = t.stateNode, u.paired = n, n.paired = u, fu(t, e.onShare)) : ne(t.child, !1)), l.delete(a), l.size === 0) break;
                }
              }
            }
            Hf(t);
          }
          t = t.sibling;
        }
    }
  }
  function jf(t) {
    if (t.tag === 30) {
      var l = t.memoizedProps, e = he(l, t.stateNode), a = Ml !== null ? Ml.get(e) : void 0, u = ye(
        l.default,
        a !== void 0 ? l.share : l.exit
      );
      u !== "none" && (tu(t, e, u, null, !1) ? a !== void 0 ? (u = t.stateNode, a.paired = u, u.paired = a, Ml.delete(e), fu(t, l.onShare)) : fu(t, l.onExit) : ne(t.child, !1)), Ml !== null && Hf(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        jf(t), t = t.sibling;
    else
      Ml !== null && Hf(t);
  }
  function Bm(t) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var l = t.memoizedProps, e = he(l, t.stateNode);
        l = ye(l.default, l.update), t.flags &= -5, l !== "none" && tu(
          t,
          e,
          l,
          t.memoizedState = [],
          !1
        );
      } else
        (t.subtreeFlags & 33554432) !== 0 && Bm(t);
      t = t.sibling;
    }
  }
  function Bf(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if (t.tag !== 22 || t.memoizedState === null) {
          if (t.tag === 30 && (t.flags & 18874368) !== 0) {
            var l = t.stateNode;
            l.paired !== null && (l.paired = null, ne(t.child, !1));
          }
          Bf(t);
        }
        t = t.sibling;
      }
  }
  function Ti(t) {
    if (t.tag === 30)
      t.stateNode.paired = null, ne(t.child, !1), Bf(t);
    else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        Ti(t), t = t.sibling;
    else Bf(t);
  }
  function qm(t) {
    for (t = t.child; t !== null; )
      t.tag === 30 ? ne(t.child, !1) : (t.subtreeFlags & 33554432) !== 0 && qm(t), t = t.sibling;
  }
  function qf(t, l, e, a, u, n, i) {
    for (var c = !1; l !== null; ) {
      if (l.tag === 5) {
        var o = l.stateNode;
        if (n !== null && gl < n.length) {
          var y = n[gl], E = hs(o);
          (y.view || E.view) && (c = !0);
          var N;
          if (N = (t.flags & 4) === 0)
            if (E.clip) N = !0;
            else {
              N = y.rect;
              var v = E.rect;
              N = N.y !== v.y || N.x !== v.x || N.height !== v.height || N.width !== v.width;
            }
          N && (t.flags |= 4), E.abs ? E = !y.abs : (y = y.rect, E = E.rect, E = y.height !== E.height || y.width !== E.width), E && (t.flags |= 32);
        } else t.flags |= 32;
        (t.flags & 4) !== 0 && Hd(
          o,
          gl === 0 ? e : e + "_" + gl,
          u
        ), c && (t.flags & 4) !== 0 || (ue === null && (ue = []), ue.push(
          o,
          gl === 0 ? a : a + "_" + gl,
          l.memoizedProps
        )), gl++;
      } else (l.tag !== 22 || l.memoizedState === null) && (l.tag === 30 && i ? t.flags |= l.flags & 32 : qf(
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
  function Ym(t, l) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var e = t.memoizedProps, a = t.stateNode, u = he(e, a), n = ye(e.default, e.update), i;
        i = t.memoizedState, t.memoizedState = null, a = t;
        var c = t.child;
        gl = 0, u = qf(
          a,
          c,
          u,
          u,
          n,
          i,
          !1
        ), (t.flags & 4) !== 0 && u && fu(t, e.onUpdate);
      } else
        (t.subtreeFlags & 33554432) !== 0 && Ym(t);
      t = t.sibling;
    }
  }
  var It = !1, zt = !1, ie = !1, Yf = !1, Gm = typeof WeakSet == "function" ? WeakSet : Set, Pt = null, ce = !1, tn = !1, Ei = !1, Gf = !1;
  function gh(t, l, e) {
    if (t = t.containerInfo, os = Su, t = Zo(t), Nc(t)) {
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
            var c = 0, o = -1, y = -1, E = 0, N = 0, v = t, b = null;
            l: for (; ; ) {
              for (var R; v !== a || n !== 0 && v.nodeType !== 3 || (o = c + n), v !== i || u !== 0 && v.nodeType !== 3 || (y = c + u), v.nodeType === 3 && (c += v.nodeValue.length), (R = v.firstChild) !== null; )
                b = v, v = R;
              for (; ; ) {
                if (v === t) break l;
                if (b === a && ++E === n && (o = c), b === i && ++N === u && (y = c), (R = v.nextSibling) !== null) break;
                v = b, b = v.parentNode;
              }
              v = R;
            }
            a = o === -1 || y === -1 ? null : { start: o, end: y };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (rs = { focusedElem: t, selectionRange: a }, Su = !1, e = (e & 335544064) === e, Pt = l, l = e ? 9270 : 1024; Pt !== null; ) {
      if (t = Pt, e && (a = t.deletions, a !== null))
        for (n = 0; n < a.length; n++)
          e && jf(a[n]);
      if (t.alternate === null && (t.flags & 2) !== 0)
        e && xm(t), _i(e);
      else {
        if (t.tag === 22) {
          if (a = t.alternate, t.memoizedState !== null) {
            a !== null && a.memoizedState === null && e && jf(a), _i(e);
            continue;
          } else if (a !== null && a.memoizedState !== null) {
            e && xm(t), _i(e);
            continue;
          }
        }
        a = t.child, (t.subtreeFlags & l) !== 0 && a !== null ? (a.return = t, Pt = a) : (e && Bm(t), _i(e));
      }
    }
    Ml = null;
  }
  function _i(t) {
    for (; Pt !== null; ) {
      var l = Pt, e = t, a = l.alternate, u = l.flags;
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
              var i = Ta(
                l.type,
                u
              );
              e = n.getSnapshotBeforeUpdate(
                i,
                a
              ), n.__reactInternalSnapshotBeforeUpdate = e;
            } catch (c) {
              Mt(l, l.return, c);
            }
          }
          break;
        case 3:
          if ((u & 1024) !== 0) {
            if (a = l.stateNode.containerInfo, e = a.nodeType, e === 9)
              Ss(a);
            else if (e === 1)
              switch (a.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  Ss(a);
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
          e && a !== null && (e = he(
            a.memoizedProps,
            a.stateNode
          ), u = l.memoizedProps, u = ye(u.default, u.update), u !== "none" && tu(
            a,
            e,
            u,
            a.memoizedState = [],
            !0
          ));
          break;
        default:
          if ((u & 1024) !== 0) throw Error(f(163));
      }
      if (a = l.sibling, a !== null) {
        a.return = l.return, Pt = a;
        break;
      }
      Pt = l.return;
    }
  }
  function Lm(t, l, e) {
    var a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        fe(t, e), a & 4 && Iu(5, e);
        break;
      case 1:
        if (fe(t, e), a & 4)
          if (t = e.stateNode, l === null)
            try {
              t.componentDidMount();
            } catch (i) {
              Mt(e, e.return, i);
            }
          else {
            var u = Ta(
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
              Mt(
                e,
                e.return,
                i
              );
            }
          }
        a & 64 && Mm(e), a & 512 && ae(e, e.return);
        break;
      case 3:
        if (fe(t, e), a & 64 && (t = e.updateQueue, t !== null)) {
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
            gr(t, l);
          } catch (i) {
            Mt(e, e.return, i);
          }
        }
        break;
      case 27:
        l === null && a & 4 && Rm(e);
      case 26:
      case 5:
        fe(t, e), l === null && a & 4 && Df(e), a & 512 && ae(e, e.return);
        break;
      case 12:
        fe(t, e);
        break;
      case 31:
        fe(t, e), a & 4 && Vm(t, e);
        break;
      case 13:
        fe(t, e), a & 4 && wm(t, e), a & 64 && (t = e.memoizedState, t !== null && (t = t.dehydrated, t !== null && (e = Dh.bind(
          null,
          e
        ), oy(t, e))));
        break;
      case 22:
        if (a = e.memoizedState !== null || It, !a) {
          var n = l !== null && l.memoizedState !== null || zt;
          l = It, u = zt, It = a, (zt = n) && !u ? (a = 2, (e.subtreeFlags & 8772) !== 0 && (a |= 1), Jl(
            t,
            e,
            a
          )) : fe(t, e), It = l, zt = u;
        }
        break;
      case 30:
        fe(t, e), a & 512 && ae(e, e.return);
        break;
      case 7:
        a & 512 && ae(e, e.return);
      default:
        fe(t, e);
    }
  }
  function Lf(t, l) {
    for (t = t.child; t !== null; )
      Xm(t, l), t = t.sibling;
  }
  function Xm(t, l) {
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
        } catch (o) {
          Mt(t, t.return, o);
        }
        Xf(t, l);
        break;
      case 6:
        try {
          t.stateNode.nodeValue = l ? "" : t.memoizedProps, Et = !0;
        } catch (o) {
          Mt(t, t.return, o);
        }
        break;
      case 18:
        try {
          var c = t.stateNode;
          l ? xd(c, !0) : xd(t.stateNode, !1);
        } catch (o) {
          Mt(t, t.return, o);
        }
        break;
      case 22:
      case 23:
        t.memoizedState === null && Lf(t, l);
        break;
      default:
        Lf(t, l);
    }
  }
  function Xf(t, l) {
    if (t.subtreeFlags & 67108864)
      for (t = t.child; t !== null; ) {
        t: {
          var e = t, a = l;
          switch (e.tag) {
            case 4:
              Xm(e, a);
              break t;
            case 22:
              e.memoizedState === null && Xf(e, a);
              break t;
            default:
              Xf(e, a);
          }
        }
        t = t.sibling;
      }
  }
  function Qm(t) {
    var l = t.alternate;
    l !== null && (t.alternate = null, Qm(l)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (l = t.stateNode, l !== null && An(l)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var jt = null, Sl = !1;
  function wl(t, l, e) {
    for (e = e.child; e !== null; )
      Zm(t, l, e), e = e.sibling;
  }
  function Zm(t, l, e) {
    if (pl && typeof pl.onCommitFiberUnmount == "function")
      try {
        pl.onCommitFiberUnmount(pu, e);
      } catch {
      }
    switch (e.tag) {
      case 26:
        zt || ul(e, l), wl(
          t,
          l,
          e
        ), e.memoizedState ? e.memoizedState.count-- : e.stateNode && !zt && (e = e.stateNode, e.parentNode.removeChild(e));
        break;
      case 27:
        zt || ul(e, l), Pu(e);
        var a = jt, u = Sl;
        ke(e.type) && (jt = e.stateNode, Sl = !1), wl(
          t,
          l,
          e
        ), Jd(
          e.stateNode,
          e.type,
          e.memoizedProps
        ), jt = a, Sl = u;
        break;
      case 5:
        zt || ul(e, l), Pu(e);
      case 6:
        if (e.tag === 6 && Pu(e), a = jt, u = Sl, jt = null, wl(
          t,
          l,
          e
        ), jt = a, Sl = u, jt !== null)
          if (Sl)
            try {
              (jt.nodeType === 9 ? jt.body : jt.nodeName === "HTML" ? jt.ownerDocument.body : jt).removeChild(e.stateNode), Et = !0;
            } catch (n) {
              Mt(
                e,
                l,
                n
              );
            }
          else
            try {
              jt.removeChild(e.stateNode), Et = !0;
            } catch (n) {
              Mt(
                e,
                l,
                n
              );
            }
        break;
      case 18:
        jt !== null && (Sl ? (t = jt, Rd(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          e.stateNode
        ), bu(t)) : Rd(jt, e.stateNode));
        break;
      case 4:
        a = jt, u = Sl, jt = e.stateNode.containerInfo, Sl = !0, wl(
          t,
          l,
          e
        ), jt = a, Sl = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Ve(2, e, l), zt || Ve(4, e, l), wl(
          t,
          l,
          e
        );
        break;
      case 1:
        zt || (ul(e, l), a = e.stateNode, typeof a.componentWillUnmount == "function" && Dm(
          e,
          l,
          a
        )), wl(
          t,
          l,
          e
        );
        break;
      case 21:
        wl(
          t,
          l,
          e
        );
        break;
      case 22:
        zt = (a = zt) || e.memoizedState !== null, wl(
          t,
          l,
          e
        ), zt = a;
        break;
      case 30:
        ul(e, l), wl(
          t,
          l,
          e
        );
        break;
      case 7:
        zt || ul(e, l), wl(
          t,
          l,
          e
        );
        break;
      default:
        wl(
          t,
          l,
          e
        );
    }
  }
  function Vm(t, l) {
    if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        bu(t);
      } catch (e) {
        Mt(l, l.return, e);
      }
    }
  }
  function wm(t, l) {
    if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        bu(t);
      } catch (e) {
        Mt(l, l.return, e);
      }
  }
  function Sh(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var l = t.stateNode;
        return l === null && (l = t.stateNode = new Gm()), l;
      case 22:
        return t = t.stateNode, l = t._retryCache, l === null && (l = t._retryCache = new Gm()), l;
      default:
        throw Error(f(435, t.tag));
    }
  }
  function pi(t, l) {
    var e = Sh(t);
    l.forEach(function(a) {
      if (!e.has(a)) {
        e.add(a);
        var u = Ch.bind(null, t, a);
        a.then(u, u);
      }
    });
  }
  function dl(t, l, e) {
    var a = l.deletions;
    if (a !== null)
      for (var u = 0; u < a.length; u++) {
        var n = a[u], i = t, c = l, o = c;
        t: for (; o !== null; ) {
          switch (o.tag) {
            case 27:
              if (ke(o.type)) {
                jt = o.stateNode, Sl = !1;
                break t;
              }
              break;
            case 5:
              jt = o.stateNode, Sl = !1;
              break t;
            case 3:
            case 4:
              jt = o.stateNode.containerInfo, Sl = !0;
              break t;
          }
          o = o.return;
        }
        if (jt === null) throw Error(f(160));
        Zm(i, c, n), jt = null, Sl = !1, i = n.alternate, i !== null && (i.return = null), n.return = null;
      }
    if (l.subtreeFlags & 13886)
      for (l = l.child; l !== null; )
        Km(l, t, e), l = l.sibling;
  }
  var Kl = null;
  function Km(t, l, e) {
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
        dl(l, t, e), vl(t), u & 4 && (Ve(3, t, t.return), Iu(3, t), Ve(5, t, t.return));
        break;
      case 1:
        dl(l, t, e), vl(t), u & 512 && (zt || a === null || ul(a, a.return)), u & 64 && It && (t = t.updateQueue, t !== null && (l = t.callbacks, l !== null && (e = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = e === null ? l : e.concat(l))));
        break;
      case 26:
        if (n = Kl, dl(l, t, e), vl(t), u & 512 && (zt || a === null || ul(a, a.return)), u & 4)
          if (u = a !== null ? a.memoizedState : null, e = t.memoizedState, a === null)
            if (e === null)
              if (t.stateNode === null)
                if (It)
                  t.stateNode = Dd(
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
                        a = u.getElementsByTagName("title")[0], (!a || a[Ou] || a[tl] || a.namespaceURI === "http://www.w3.org/2000/svg" || a.hasAttribute("itemprop")) && (a = u.createElement(l), u.head.insertBefore(
                          a,
                          u.querySelector("head > title")
                        )), nl(a, l, e), a[tl] = t, Wt(a), l = a;
                        break t;
                      case "link":
                        if (n = Pd(
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
                        a = u.createElement(l), nl(a, l, e), u.head.appendChild(a);
                        break;
                      case "meta":
                        if (n = Pd(
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
                        a = u.createElement(l), nl(a, l, e), u.head.appendChild(a);
                        break;
                      default:
                        throw Error(f(468, l));
                    }
                    a[tl] = t, Wt(a), l = a;
                  }
                  t.stateNode = l;
                }
              else
                It || zs(n, t.type, t.stateNode);
            else
              t.stateNode = Id(
                n,
                e,
                t.memoizedProps
              );
          else
            u !== e ? (u === null ? (l = a.stateNode, l === null || zt || l.parentNode.removeChild(l)) : u.count--, e === null ? It || zs(n, t.type, t.stateNode) : Id(n, e, t.memoizedProps)) : e === null && t.stateNode !== null && Cf(
              t,
              t.memoizedProps,
              a.memoizedProps
            );
        break;
      case 27:
        dl(l, t, e), vl(t), u & 512 && (zt || a === null || ul(a, a.return)), a !== null && u & 4 && Cf(
          t,
          t.memoizedProps,
          a.memoizedProps
        );
        break;
      case 5:
        if (n = ie, ie = !1, dl(l, t, e), ie = n, vl(t), u & 512 && (zt || a === null || ul(a, a.return)), t.flags & 32) {
          l = t.stateNode;
          try {
            Ba(l, ""), Et = !0;
          } catch (E) {
            Mt(t, t.return, E);
          }
        }
        u & 4 && t.stateNode != null && (l = t.memoizedProps, Cf(
          t,
          l,
          a !== null ? a.memoizedProps : l
        )), u & 1024 && (Yf = !0);
        break;
      case 6:
        if (dl(l, t, e), vl(t), u & 4) {
          if (t.stateNode === null)
            throw Error(f(162));
          l = t.memoizedProps, e = t.stateNode;
          try {
            e.nodeValue = l, Et = !0;
          } catch (E) {
            Mt(t, t.return, E);
          }
        }
        break;
      case 3:
        if (Et = !1, Yi = null, n = Kl, Kl = on(l.containerInfo), dl(l, t, e), Kl = n, vl(t), u & 4 && a !== null && a.memoizedState.isDehydrated)
          try {
            bu(l.containerInfo);
          } catch (E) {
            Mt(t, t.return, E);
          }
        Yf && (Yf = !1, Jm(t)), Et = !1;
        break;
      case 4:
        u = ie, ie = It, a = mo(), n = Kl, Kl = on(
          t.stateNode.containerInfo
        ), dl(l, t, e), vl(t), Kl = n, Et && tn && (Ei = !0), Et = a, ie = u;
        break;
      case 12:
        dl(l, t, e), vl(t);
        break;
      case 31:
        dl(l, t, e), vl(t), u & 4 && (l = t.updateQueue, l !== null && (t.updateQueue = null, pi(t, l)));
        break;
      case 13:
        dl(l, t, e), vl(t), t.child.flags & 8192 && t.memoizedState !== null != (a !== null && a.memoizedState !== null) && (Oi = _l()), u & 4 && (l = t.updateQueue, l !== null && (t.updateQueue = null, pi(t, l)));
        break;
      case 22:
        n = t.memoizedState !== null, i = a !== null && a.memoizedState !== null;
        var c = It, o = zt, y = ie;
        It = c || n, ie = y || n, zt = o || i, dl(l, t, e), zt = o, ie = y, It = c, vl(t), u & 8192 && (l = t.stateNode, l._visibility = n ? l._visibility & -2 : l._visibility | 1, !n || a === null || i || It || zt || (l = i || zt, e = It, a = zt, It = n || It, zt = l, we(t, 2), It = e, zt = a), !n && ie || Lf(t, n)), u & 4 && (l = t.updateQueue, l !== null && (e = l.retryQueue, e !== null && (l.retryQueue = null, pi(t, e))));
        break;
      case 19:
        dl(l, t, e), vl(t), u & 4 && (l = t.updateQueue, l !== null && (t.updateQueue = null, pi(t, l)));
        break;
      case 30:
        u & 512 && (zt || a === null || ul(a, a.return)), u = mo(), n = tn, i = (e & 335544064) === e, c = t.memoizedProps, tn = i && ye(
          c.default,
          c.update
        ) !== "none", dl(l, t, e), vl(t), i && a !== null && Et && (t.flags |= 4), tn = n, Et = u;
        break;
      case 21:
        break;
      case 7:
        u & 512 && (zt || a === null || ul(a, a.return)), a && a.stateNode !== null && (a.stateNode._fragmentFiber = t);
      default:
        dl(l, t, e), vl(t);
    }
  }
  function vl(t) {
    var l = t.flags;
    if (l & 2) {
      try {
        for (var e, a = t.return; a !== null; ) {
          if (Um(a)) {
            e = a;
            break;
          }
          a = a.return;
        }
        a = null;
        for (var u = t.return; u !== null; ) {
          if (Mf(u)) {
            var n = u.stateNode;
            a === null ? a = [n] : a.push(n);
          }
          if (Af(u)) break;
          u = u.return;
        }
        var i = a;
        if (e == null) throw Error(f(160));
        switch (e.tag) {
          case 27:
            var c = e.stateNode, o = Uf(t);
            gi(
              t,
              o,
              c,
              i
            );
            break;
          case 5:
            var y = e.stateNode;
            e.flags & 32 && (Ba(y, ""), e.flags &= -33);
            var E = Uf(t);
            gi(
              t,
              E,
              y,
              i
            );
            break;
          case 3:
          case 4:
            var N = e.stateNode.containerInfo, v = Uf(t);
            Rf(
              t,
              v,
              N,
              i
            );
            break;
          default:
            throw Error(f(161));
        }
      } catch (b) {
        Mt(t, t.return, b);
      }
      t.flags &= -3;
    }
    l & 4096 && (t.flags &= -4097);
  }
  function Jm(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var l = t;
        Jm(l), l.tag === 5 && l.flags & 1024 && (l = l.stateNode, Su = !0, l.reset(), Su = !1), t = t.sibling;
      }
  }
  function lu(t, l) {
    if (l.subtreeFlags & 9270)
      for (l = l.child; l !== null; )
        $m(l, t), l = l.sibling;
    else Ym(l);
  }
  function $m(t, l) {
    var e = t.alternate;
    if (e === null) xf(t, !1);
    else
      switch (t.tag) {
        case 3:
          if (Gf = ce = !1, Hm(), lu(l, t), !ce && !Ei) {
            if (t = ue, t !== null)
              for (var a = 0; a < t.length; a += 3) {
                e = t[a];
                var u = t[a + 1];
                jd(e, t[a + 2]), e = e.ownerDocument.documentElement, e !== null && e.animate(
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
            )), Gf = !0;
          }
          ue = null;
          break;
        case 5:
          lu(l, t);
          break;
        case 4:
          a = ce, ce = !1, lu(l, t), ce && (Ei = !0), ce = a;
          break;
        case 22:
          t.memoizedState === null && (e.memoizedState !== null ? xf(t, !1) : lu(l, t));
          break;
        case 30:
          a = ce, u = Hm(), ce = !1, lu(l, t), ce && (t.flags |= 4);
          var n = t.memoizedProps, i = t.stateNode;
          l = he(n, i), i = he(e.memoizedProps, i);
          var c = ye(n.default, n.update);
          c === "none" ? l = !1 : (n = e.memoizedState, e.memoizedState = null, e = t.child, gl = 0, l = qf(
            t,
            e,
            l,
            i,
            c,
            n,
            !0
          ), gl !== (n === null ? 0 : n.length) && (t.flags |= 32)), (t.flags & 4) !== 0 && l ? (fu(
            t,
            t.memoizedProps.onUpdate
          ), ue = u) : u !== null && (u.push.apply(u, ue), ue = u), ce = (t.flags & 32) !== 0 ? !0 : a;
          break;
        default:
          lu(l, t);
      }
  }
  function fe(t, l) {
    if (l.subtreeFlags & 8772)
      for (l = l.child; l !== null; )
        Lm(t, l.alternate, l), l = l.sibling;
  }
  function we(t, l) {
    for (t = t.child; t !== null; ) {
      var e = t, a = l;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Ve(4, e, e.return), we(
            e,
            a
          );
          break;
        case 1:
          ul(e, e.return);
          var u = e.stateNode;
          typeof u.componentWillUnmount == "function" && Dm(
            e,
            e.return,
            u
          ), we(
            e,
            a
          );
          break;
        case 27:
          (a & 2) !== 0 && Jd(
            e.stateNode,
            e.type,
            e.memoizedProps
          );
        case 5:
          ul(e, e.return), e.tag !== 5 && e.tag !== 27 || Pu(e), we(
            e,
            a
          );
          break;
        case 6:
          Pu(e);
          break;
        case 26:
          ul(e, e.return), u = e.stateNode, e.memoizedState !== null || u === null || zt || u.parentNode.removeChild(u), we(
            e,
            a
          );
          break;
        case 22:
          e.memoizedState === null && we(
            e,
            a
          );
          break;
        case 30:
          ul(e, e.return), we(
            e,
            a
          );
          break;
        case 7:
          ul(e, e.return);
        default:
          we(
            e,
            a
          );
      }
      t = t.sibling;
    }
  }
  function Jl(t, l, e) {
    for (e = (l.subtreeFlags & 8772) !== 0 ? e : e & -2, l = l.child; l !== null; ) {
      var a = l.alternate, u = t, n = l, i = n.flags, c = (e & 1) !== 0;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          Jl(
            u,
            n,
            e
          ), Iu(4, n);
          break;
        case 1:
          if (Jl(
            u,
            n,
            e
          ), a = n, u = a.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (E) {
              Mt(a, a.return, E);
            }
          if (a = n, u = a.updateQueue, u !== null) {
            var o = a.stateNode;
            try {
              var y = u.shared.hiddenCallbacks;
              if (y !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < y.length; u++)
                  yr(y[u], o);
            } catch (E) {
              Mt(a, a.return, E);
            }
          }
          c && i & 64 && Mm(n), ae(n, n.return);
          break;
        case 27:
          (e & 2) !== 0 && Rm(n);
        case 5:
          n.tag !== 5 && n.tag !== 27 || Cm(n), Jl(
            u,
            n,
            e
          ), c && a === null && i & 4 && Df(n), ae(n, n.return);
          break;
        case 6:
          Cm(n);
          break;
        case 26:
          o = n.stateNode, n.memoizedState !== null || o === null || It || zs(
            on(o.ownerDocument),
            n.type,
            o
          ), Jl(
            u,
            n,
            e
          ), c && a === null && i & 4 && Df(n), ae(n, n.return);
          break;
        case 12:
          Jl(
            u,
            n,
            e
          );
          break;
        case 31:
          Jl(
            u,
            n,
            e
          ), c && i & 4 && Vm(u, n);
          break;
        case 13:
          Jl(
            u,
            n,
            e
          ), c && i & 4 && wm(u, n);
          break;
        case 22:
          n.memoizedState === null && Jl(
            u,
            n,
            e
          ), ae(n, n.return);
          break;
        case 30:
          Jl(
            u,
            n,
            e
          ), ae(n, n.return);
          break;
        case 7:
          ae(n, n.return);
        default:
          Jl(
            u,
            n,
            e
          );
      }
      l = l.sibling;
    }
  }
  function Qf(t, l) {
    var e = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), t = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (t = l.memoizedState.cachePool.pool), t !== e && (t != null && t.refCount++, e != null && Gu(e));
  }
  function Zf(t, l) {
    t = null, l.alternate !== null && (t = l.alternate.memoizedState.cache), l = l.memoizedState.cache, l !== t && (l.refCount++, t != null && Gu(t));
  }
  function Ll(t, l, e, a) {
    var u = (e & 335544064) === e;
    if (l.subtreeFlags & (u ? 10262 : 10256))
      for (l = l.child; l !== null; )
        Fm(
          t,
          l,
          e,
          a
        ), l = l.sibling;
    else u && qm(l);
  }
  function Fm(t, l, e, a) {
    var u = (e & 335544064) === e;
    u && l.alternate === null && l.return !== null && l.return.alternate !== null && Ti(l);
    var n = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Ll(
          t,
          l,
          e,
          a
        ), n & 2048 && Iu(9, l);
        break;
      case 1:
        Ll(
          t,
          l,
          e,
          a
        );
        break;
      case 3:
        Ll(
          t,
          l,
          e,
          a
        ), u && Gf && (t = t.containerInfo, t = t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, t.style.viewTransitionName === "root" && (t.style.viewTransitionName = ""), t = t.ownerDocument.documentElement, t !== null && t.style.viewTransitionName === "none" && (t.style.viewTransitionName = "")), n & 2048 && (n = null, l.alternate !== null && (n = l.alternate.memoizedState.cache), l = l.memoizedState.cache, l !== n && (l.refCount++, n != null && Gu(n)));
        break;
      case 12:
        if (n & 2048) {
          Ll(
            t,
            l,
            e,
            a
          ), n = l.stateNode;
          try {
            var i = l.memoizedProps, c = i.id, o = i.onPostCommit;
            typeof o == "function" && o(
              c,
              l.alternate === null ? "mount" : "update",
              n.passiveEffectDuration,
              -0
            );
          } catch (y) {
            Mt(l, l.return, y);
          }
        } else
          Ll(
            t,
            l,
            e,
            a
          );
        break;
      case 31:
        Ll(
          t,
          l,
          e,
          a
        );
        break;
      case 13:
        Ll(
          t,
          l,
          e,
          a
        );
        break;
      case 23:
        break;
      case 22:
        i = l.stateNode, c = l.alternate, l.memoizedState !== null ? (u && c !== null && c.memoizedState === null && Ti(c), i._visibility & 2 ? Ll(
          t,
          l,
          e,
          a
        ) : ln(
          t,
          l
        )) : (u && c !== null && c.memoizedState !== null && Ti(l), i._visibility & 2 ? Ll(
          t,
          l,
          e,
          a
        ) : (i._visibility |= 2, eu(
          t,
          l,
          e,
          a,
          (l.subtreeFlags & 10256) !== 0 || !1
        ))), n & 2048 && Qf(c, l);
        break;
      case 24:
        Ll(
          t,
          l,
          e,
          a
        ), n & 2048 && Zf(l.alternate, l);
        break;
      case 30:
        u && (n = l.alternate, n !== null && (ne(n.child, !0), ne(l.child, !0))), Ll(
          t,
          l,
          e,
          a
        );
        break;
      default:
        Ll(
          t,
          l,
          e,
          a
        );
    }
  }
  function eu(t, l, e, a, u) {
    for (u = u && ((l.subtreeFlags & 10256) !== 0 || !1), l = l.child; l !== null; ) {
      var n = t, i = l, c = e, o = a, y = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          eu(
            n,
            i,
            c,
            o,
            u
          ), Iu(8, i);
          break;
        case 23:
          break;
        case 22:
          var E = i.stateNode;
          i.memoizedState !== null ? E._visibility & 2 ? eu(
            n,
            i,
            c,
            o,
            u
          ) : ln(
            n,
            i
          ) : (E._visibility |= 2, eu(
            n,
            i,
            c,
            o,
            u
          )), u && y & 2048 && Qf(
            i.alternate,
            i
          );
          break;
        case 24:
          eu(
            n,
            i,
            c,
            o,
            u
          ), u && y & 2048 && Zf(i.alternate, i);
          break;
        default:
          eu(
            n,
            i,
            c,
            o,
            u
          );
      }
      l = l.sibling;
    }
  }
  function ln(t, l) {
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; ) {
        var e = t, a = l, u = a.flags;
        switch (a.tag) {
          case 22:
            ln(e, a), u & 2048 && Qf(
              a.alternate,
              a
            );
            break;
          case 24:
            ln(e, a), u & 2048 && Zf(a.alternate, a);
            break;
          default:
            ln(e, a);
        }
        l = l.sibling;
      }
  }
  var Ea = 8192;
  function _a(t, l, e) {
    if (t.subtreeFlags & Ea)
      for (t = t.child; t !== null; )
        Wm(
          t,
          l,
          e
        ), t = t.sibling;
  }
  function Wm(t, l, e) {
    switch (t.tag) {
      case 26:
        _a(
          t,
          l,
          e
        ), t.flags & Ea && (t.memoizedState !== null ? Ny(
          e,
          Kl,
          t.memoizedState,
          t.memoizedProps
        ) : (t = t.stateNode, (l & 335544128) === l && a0(e, t)));
        break;
      case 5:
        _a(
          t,
          l,
          e
        ), t.flags & Ea && (t = t.stateNode, (l & 335544128) === l && a0(e, t));
        break;
      case 3:
      case 4:
        var a = Kl;
        Kl = on(t.stateNode.containerInfo), _a(
          t,
          l,
          e
        ), Kl = a;
        break;
      case 22:
        t.memoizedState === null && (a = t.alternate, a !== null && a.memoizedState !== null ? (a = Ea, Ea = 16777216, _a(
          t,
          l,
          e
        ), Ea = a) : _a(
          t,
          l,
          e
        ));
        break;
      case 30:
        if ((t.flags & Ea) !== 0 && (a = t.memoizedProps.name, a != null && a !== "auto")) {
          var u = t.stateNode;
          u.paired = null, Ml === null && (Ml = /* @__PURE__ */ new Map()), Ml.set(a, u);
        }
        _a(
          t,
          l,
          e
        );
        break;
      default:
        _a(
          t,
          l,
          e
        );
    }
  }
  function km(t) {
    var l = t.alternate;
    if (l !== null && (t = l.child, t !== null)) {
      l.child = null;
      do
        l = t.sibling, t.sibling = null, t = l;
      while (t !== null);
    }
  }
  function en(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var e = 0; e < l.length; e++) {
          var a = l[e];
          Pt = a, Pm(
            a,
            t
          );
        }
      km(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Im(t), t = t.sibling;
  }
  function Im(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        en(t), t.flags & 2048 && Ve(9, t, t.return);
        break;
      case 3:
        en(t);
        break;
      case 12:
        en(t);
        break;
      case 22:
        var l = t.stateNode;
        t.memoizedState !== null && l._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (l._visibility &= -3, Ni(t)) : en(t);
        break;
      default:
        en(t);
    }
  }
  function Ni(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var e = 0; e < l.length; e++) {
          var a = l[e];
          Pt = a, Pm(
            a,
            t
          );
        }
      km(t);
    }
    for (t = t.child; t !== null; ) {
      switch (l = t, l.tag) {
        case 0:
        case 11:
        case 15:
          Ve(8, l, l.return), Ni(l);
          break;
        case 22:
          e = l.stateNode, e._visibility & 2 && (e._visibility &= -3, Ni(l));
          break;
        default:
          Ni(l);
      }
      t = t.sibling;
    }
  }
  function Pm(t, l) {
    for (; Pt !== null; ) {
      var e = Pt;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          Ve(8, e, l);
          break;
        case 23:
        case 22:
          if (e.memoizedState !== null && e.memoizedState.cachePool !== null) {
            var a = e.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          Gu(e.memoizedState.cache);
      }
      if (a = e.child, a !== null) a.return = e, Pt = a;
      else
        t: for (e = t; Pt !== null; ) {
          a = Pt;
          var u = a.sibling, n = a.return;
          if (Qm(a), a === e) {
            Pt = null;
            break t;
          }
          if (u !== null) {
            u.return = n, Pt = u;
            break t;
          }
          Pt = n;
        }
    }
  }
  var bh = {
    getCacheForType: function(t) {
      var l = ll(Zt), e = l.data.get(t);
      return e === void 0 && (e = t(), l.data.set(t, e)), e;
    },
    cacheSignal: function() {
      return ll(Zt).controller.signal;
    }
  }, Th = typeof WeakMap == "function" ? WeakMap : Map, _t = 0, Ut = null, ot = null, vt = 0, At = 0, Dl = null, Ke = !1, au = !1, Vf = !1, ze = 0, Gt = 0, Je = 0, pa = 0, zi = 0, Cl = 0, uu = 0, an = null, bl = null, wf = !1, Oi = 0, td = 0, Ai = 1 / 0, Mi = null, $e = null, qt = 0, $l = null, Na = null, se = 0, Kf = 0, Jf = null, ld = null, nu = null, iu = null, cu = null, un = 0, Di = null;
  function Ul() {
    return (_t & 2) !== 0 && vt !== 0 ? vt & -vt : L.T !== null ? as() : ao();
  }
  function ed() {
    if (Cl === 0)
      if ((vt & 536870912) === 0 || it) {
        var t = pn;
        pn <<= 1, (pn & 3932160) === 0 && (pn = 262144), Cl = t;
      } else Cl = 536870912;
    return t = el.current, t !== null && (t.flags |= 32), Cl;
  }
  function fu(t, l) {
    if (l != null) {
      var e = t.stateNode, a = e.ref;
      a === null && (a = e.ref = Bd(
        he(t.memoizedProps, e)
      )), iu === null && (iu = []), iu.push(l.bind(null, a));
    }
  }
  function Tl(t, l, e) {
    (t === Ut && (At === 2 || At === 9) || t.cancelPendingCommit !== null) && (su(t, 0), Fe(
      t,
      vt,
      Cl,
      !1
    )), zu(t, e), ((_t & 2) === 0 || t !== Ut) && (t === Ut && ((_t & 2) === 0 && (pa |= e), Gt === 4 && Fe(
      t,
      vt,
      Cl,
      !1
    )), oe(t));
  }
  function ad(t, l, e) {
    if ((_t & 6) !== 0) throw Error(f(327));
    var a = !e && (l & 127) === 0 && (l & t.expiredLanes) === 0 || Nu(t, l), u = a ? ph(t, l) : Ff(t, l, !0), n = a;
    do {
      if (u === 0) {
        au && !a && Fe(t, l, 0, !1);
        break;
      } else {
        if (e = t.current.alternate, n && !Eh(e)) {
          u = Ff(t, l, !1), n = !1;
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
              u = an;
              var o = c.current.memoizedState.isDehydrated;
              if (o && (su(c, i).flags |= 256), i = Ff(
                c,
                i,
                !1
              ), i !== 2 && i !== 6) {
                if (Vf && !o) {
                  c.errorRecoveryDisabledLanes |= n, pa |= n, u = 4;
                  break t;
                }
                n = bl, bl = u, n !== null && (bl === null ? bl = n : bl.push.apply(
                  bl,
                  n
                ));
              }
              u = i;
            }
            if (n = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          su(t, 0), Fe(t, l, 0, !0);
          break;
        }
        t: {
          switch (a = t, n = u, n) {
            case 0:
            case 1:
              throw Error(f(345));
            case 4:
              if ((l & 4194048) !== l && (l & 62914560) !== l)
                break;
            case 6:
              Fe(
                a,
                l,
                Cl,
                !Ke
              );
              break t;
            case 2:
              bl = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(f(329));
          }
          if ((l & 62914560) === l && (u = Oi + 300 - _l(), 10 < u)) {
            if (Fe(
              a,
              l,
              Cl,
              !Ke
            ), zn(a, 0, !0) !== 0) break t;
            se = l, a.timeoutHandle = vs(
              ud.bind(
                null,
                a,
                e,
                bl,
                Mi,
                wf,
                l,
                Cl,
                pa,
                uu,
                Ke,
                n,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break t;
          }
          ud(
            a,
            e,
            bl,
            Mi,
            wf,
            l,
            Cl,
            pa,
            uu,
            Ke,
            n,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    oe(t);
  }
  function ud(t, l, e, a, u, n, i, c, o, y, E, N, v, b) {
    t.timeoutHandle = -1;
    var R = l.subtreeFlags, G = (n & 335544064) === n;
    if (N = null, (G || R & 8192 || (R & 16785408) === 16785408) && (N = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: te
    }, Ml = null, Wm(
      l,
      n,
      N
    ), G && (R = N, G = t.containerInfo, G = (G.nodeType === 9 ? G : G.ownerDocument).__reactViewTransition, G != null && (R.count++, R.waitingForViewTransition = !0, R = dn.bind(R), G.finished.then(R, R))), R = (n & 62914560) === n ? Oi - _l() : (n & 4194048) === n ? td - _l() : 0, R = zy(
      N,
      R
    ), R !== null)) {
      se = n, t.cancelPendingCommit = R(
        md.bind(
          null,
          t,
          l,
          n,
          e,
          a,
          u,
          i,
          c,
          o,
          y,
          E,
          N,
          null,
          v,
          b
        )
      ), Fe(t, n, i, !y);
      return;
    }
    md(
      t,
      l,
      n,
      e,
      a,
      u,
      i,
      c,
      o,
      y,
      E,
      N
    );
  }
  function Eh(t) {
    for (var l = t; ; ) {
      var e = l.tag;
      if ((e === 0 || e === 11 || e === 15) && l.flags & 16384 && (e = l.updateQueue, e !== null && (e = e.stores, e !== null)))
        for (var a = 0; a < e.length; a++) {
          var u = e[a], n = u.getSnapshot;
          u = u.value;
          try {
            if (!Ol(n(), u)) return !1;
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
  function Fe(t, l, e, a) {
    l = Is(t, l), l &= ~zi, l &= ~pa, t.suspendedLanes |= l, t.pingedLanes &= ~l, a && (t.warmLanes |= l), a = t.expirationTimes;
    for (var u = l; 0 < u; ) {
      var n = 31 - Nl(u), i = 1 << n;
      a[n] = -1, u &= ~i;
    }
    e !== 0 && to(t, e, l);
  }
  function Ci() {
    return (_t & 6) === 0 ? (nn(0), !1) : !0;
  }
  function $f() {
    if (ot !== null) {
      if (At === 0)
        var t = ot.return;
      else
        t = ot, be = ra = null, lf(t), Fa = null, Qu = 0, t = ot;
      for (; t !== null; )
        Am(t.alternate, t), t = t.return;
      ot = null;
    }
  }
  function su(t, l) {
    var e = t.timeoutHandle;
    return e !== -1 && (t.timeoutHandle = -1, wh(e)), e = t.cancelPendingCommit, e !== null && (t.cancelPendingCommit = null, e()), se = 0, $f(), Ut = t, ot = e = ge(t.current, null), vt = l, At = 0, Dl = null, Ke = !1, au = Nu(t, l), Vf = !1, uu = Cl = zi = pa = Je = Gt = 0, bl = an = null, wf = !1, ze = Is(t, l), Yn(), e;
  }
  function nd(t, l) {
    tt = null, L.H = si, l === $a || l === Fn ? (l = mr(), At = 3) : l === Qc ? (l = mr(), At = 4) : At = l === gf ? 8 : l !== null && typeof l == "object" && typeof l.then == "function" ? 6 : 1, Dl = l, ot === null && (Gt = 1, oi(
      t,
      Bl(l, t.current)
    ));
  }
  function id() {
    var t = el.current;
    return t === null ? !0 : (vt & 4194048) === vt ? fl === null : (vt & 62914560) === vt || (vt & 536870912) !== 0 ? t === fl : !1;
  }
  function cd() {
    var t = L.H;
    return L.H = si, t === null ? si : t;
  }
  function fd() {
    var t = L.A;
    return L.A = bh, t;
  }
  function Ui() {
    Gt = 4, Ke || (vt & 4194048) !== vt && el.current !== null || (au = !0), (Je & 134217727) === 0 && (pa & 134217727) === 0 || Ut === null || Fe(
      Ut,
      vt,
      Cl,
      !1
    );
  }
  function Ff(t, l, e) {
    var a = _t;
    _t |= 2;
    var u = cd(), n = fd();
    (Ut !== t || vt !== l) && (Mi = null, su(t, l)), l = !1;
    var i = Gt;
    t: do
      try {
        if (At !== 0 && ot !== null) {
          var c = ot, o = Dl;
          switch (At) {
            case 8:
              $f(), i = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              el.current === null && (l = !0);
              var y = At;
              if (At = 0, Dl = null, ou(t, c, o, y), e && au) {
                i = 0;
                break t;
              }
              break;
            default:
              y = At, At = 0, Dl = null, ou(t, c, o, y);
          }
        }
        _h(), i = Gt;
        break;
      } catch (E) {
        nd(t, E);
      }
    while (!0);
    return l && t.shellSuspendCounter++, be = ra = null, _t = a, L.H = u, L.A = n, ot === null && (Ut = null, vt = 0, Yn()), i;
  }
  function _h() {
    for (; ot !== null; ) sd(ot);
  }
  function ph(t, l) {
    var e = _t;
    _t |= 2;
    var a = cd(), u = fd();
    Ut !== t || vt !== l ? (Mi = null, Ai = _l() + 500, su(t, l)) : au = Nu(
      t,
      l
    );
    t: do
      try {
        if (At !== 0 && ot !== null) {
          l = ot;
          var n = Dl;
          l: switch (At) {
            case 1:
              At = 0, Dl = null, ou(t, l, n, 1);
              break;
            case 2:
            case 9:
              if (or(n)) {
                At = 0, Dl = null, od(l);
                break;
              }
              l = function() {
                At !== 2 && At !== 9 || Ut !== t || (At = 7), oe(t);
              }, n.then(l, l);
              break t;
            case 3:
              At = 7;
              break t;
            case 4:
              At = 5;
              break t;
            case 7:
              or(n) ? (At = 0, Dl = null, od(l)) : (At = 0, Dl = null, ou(t, l, n, 7));
              break;
            case 5:
              var i = null;
              switch (ot.tag) {
                case 26:
                  i = ot.memoizedState;
                case 5:
                case 27:
                  var c = ot;
                  if (i ? l0(i) : c.stateNode.complete) {
                    At = 0, Dl = null;
                    var o = c.sibling;
                    if (o !== null) ot = o;
                    else {
                      var y = c.return;
                      y !== null ? (ot = y, Ri(y)) : ot = null;
                    }
                    break l;
                  }
              }
              At = 0, Dl = null, ou(t, l, n, 5);
              break;
            case 6:
              At = 0, Dl = null, ou(t, l, n, 6);
              break;
            case 8:
              $f(), Gt = 6;
              break t;
            default:
              throw Error(f(462));
          }
        }
        Nh();
        break;
      } catch (E) {
        nd(t, E);
      }
    while (!0);
    return be = ra = null, L.H = a, L.A = u, _t = e, ot !== null ? 0 : (Ut = null, vt = 0, Yn(), Gt);
  }
  function Nh() {
    for (; ot !== null && !X0(); )
      sd(ot);
  }
  function sd(t) {
    var l = zm(t.alternate, t, ze);
    t.memoizedProps = t.pendingProps, l === null ? Ri(t) : ot = l;
  }
  function od(t) {
    var l = t, e = l.alternate;
    switch (l.tag) {
      case 15:
      case 0:
        l = Sm(
          e,
          l,
          l.pendingProps,
          l.type,
          void 0,
          vt
        );
        break;
      case 11:
        l = Sm(
          e,
          l,
          l.pendingProps,
          l.type.render,
          l.ref,
          vt
        );
        break;
      case 5:
        lf(l);
        var a = l;
        a === kt && (it ? (Vn(a), a.tag === 5 && a.stateNode != null && (xt = a.stateNode)) : (Vn(a), it = !0));
      default:
        Am(e, l), l = ot = Po(l, ze), l = zm(e, l, ze);
    }
    t.memoizedProps = t.pendingProps, l === null ? Ri(t) : ot = l;
  }
  function ou(t, l, e, a) {
    be = ra = null, lf(l), Fa = null, Qu = 0;
    var u = l.return;
    try {
      if (rh(
        t,
        u,
        l,
        e,
        vt
      )) {
        Gt = 1, oi(
          t,
          Bl(e, t.current)
        ), ot = null;
        return;
      }
    } catch (n) {
      if (u !== null) throw ot = u, n;
      Gt = 1, oi(
        t,
        Bl(e, t.current)
      ), ot = null;
      return;
    }
    l.flags & 32768 ? (it || a === 1 ? t = !0 : au || (vt & 536870912) !== 0 ? t = !1 : (Ke = t = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = el.current, a !== null && a.tag === 13 && (a.flags |= 16384))), rd(l, t)) : Ri(l);
  }
  function Ri(t) {
    var l = t;
    do {
      if ((l.flags & 32768) !== 0) {
        rd(
          l,
          Ke
        );
        return;
      }
      t = l.return;
      var e = hh(
        l.alternate,
        l,
        ze
      );
      if (e !== null) {
        ot = e;
        return;
      }
      if (l = l.sibling, l !== null) {
        ot = l;
        return;
      }
      ot = l = t;
    } while (l !== null);
    Gt === 0 && (Gt = 5);
  }
  function rd(t, l) {
    do {
      var e = yh(t.alternate, t);
      if (e !== null) {
        e.flags &= 32767, ot = e;
        return;
      }
      if (e = t.return, e !== null && (e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null), !l && (t = t.sibling, t !== null)) {
        ot = t;
        return;
      }
      ot = t = e;
    } while (t !== null);
    Gt = 6, ot = null;
  }
  function md(t, l, e, a, u, n, i, c, o, y, E, N) {
    t.cancelPendingCommit = null;
    do
      xi();
    while (qt !== 0);
    if ((_t & 6) !== 0) throw Error(f(327));
    if (l !== null) {
      if (l === t.current) throw Error(f(177));
      t === Ut && (ot = Ut = null, vt = 0), Na = l, $l = t, se = e, Jf = u, ld = a, zh(
        t,
        l,
        e,
        i,
        c,
        o,
        N
      );
    }
  }
  function zh(t, l, e, a, u, n, i) {
    var c = l.lanes | l.childLanes;
    if (Kf = c, c |= Dc, k0(
      t,
      e,
      c,
      a,
      u,
      n
    ), iu = null, (e & 335544064) === e ? (cu = Pv(t), a = 10262) : (cu = null, a = 10256), (l.subtreeFlags & a) !== 0 || (l.flags & a) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, Uh(En, function() {
      return Pf(), null;
    })) : (t.callbackNode = null, t.callbackPriority = 0), Si = !1, a = (l.flags & 13878) !== 0, (l.subtreeFlags & 13878) !== 0 || a) {
      a = L.T, L.T = null, u = k.p, k.p = 2, n = _t, _t |= 4;
      try {
        gh(t, l, e);
      } finally {
        _t = n, k.p = u, L.T = a;
      }
    }
    qt = 1, Si ? nu = kh(
      i,
      t.containerInfo,
      cu,
      Wf,
      kf,
      Ah,
      If,
      Pf,
      Oh
    ) : (Wf(), kf(), If());
  }
  function Oh(t) {
    if (qt !== 0) {
      var l = $l.onRecoverableError;
      l(t, { componentStack: null });
    }
  }
  function Ah() {
    qt === 3 && (qt = 0, $m(Na, $l), qt = 4);
  }
  function Wf() {
    if (qt === 1) {
      qt = 0;
      var t = $l, l = Na, e = se, a = (l.flags & 13878) !== 0;
      if ((l.subtreeFlags & 13878) !== 0 || a) {
        a = L.T, L.T = null;
        var u = k.p;
        k.p = 2;
        var n = _t;
        _t |= 4;
        try {
          tn = Ei = !1, Km(l, t, e), e = rs;
          var i = Zo(t.containerInfo), c = e.focusedElem, o = e.selectionRange;
          if (i !== c && c && c.ownerDocument && Qo(
            c.ownerDocument.documentElement,
            c
          )) {
            if (o !== null && Nc(c)) {
              var y = o.start, E = o.end;
              if (E === void 0 && (E = y), "selectionStart" in c)
                c.selectionStart = y, c.selectionEnd = Math.min(
                  E,
                  c.value.length
                );
              else {
                var N = c.ownerDocument || document, v = N && N.defaultView || window;
                if (v.getSelection) {
                  var b = v.getSelection(), R = c.textContent.length, G = Math.min(o.start, R), lt = o.end === void 0 ? G : Math.min(o.end, R);
                  !b.extend && G > lt && (i = lt, lt = G, G = i);
                  var h = Xo(
                    c,
                    G
                  ), m = Xo(
                    c,
                    lt
                  );
                  if (h && m && (b.rangeCount !== 1 || b.anchorNode !== h.node || b.anchorOffset !== h.offset || b.focusNode !== m.node || b.focusOffset !== m.offset)) {
                    var S = N.createRange();
                    S.setStart(h.node, h.offset), b.removeAllRanges(), G > lt ? (b.addRange(S), b.extend(m.node, m.offset)) : (S.setEnd(m.node, m.offset), b.addRange(S));
                  }
                }
              }
            }
            for (N = [], b = c; b = b.parentNode; )
              b.nodeType === 1 && N.push({
                element: b,
                left: b.scrollLeft,
                top: b.scrollTop
              });
            for (typeof c.focus == "function" && c.focus(), c = 0; c < N.length; c++) {
              var p = N[c];
              p.element.scrollLeft = p.left, p.element.scrollTop = p.top;
            }
          }
          Su = !!os, rs = os = null;
        } finally {
          _t = n, k.p = u, L.T = a;
        }
      }
      t.current = l, qt = 2;
    }
  }
  function kf() {
    if (qt === 2) {
      qt = 0;
      var t = $l, l = Na, e = (l.flags & 8772) !== 0;
      if ((l.subtreeFlags & 8772) !== 0 || e) {
        e = L.T, L.T = null;
        var a = k.p;
        k.p = 2;
        var u = _t;
        _t |= 4;
        try {
          Lm(t, l.alternate, l);
        } finally {
          _t = u, k.p = a, L.T = e;
        }
      }
      qt = 3;
    }
  }
  function If() {
    if (qt === 4 || qt === 3) {
      qt = 0;
      var t = nu;
      nu = null, Q0();
      var l = $l, e = Na, a = se, u = ld, n = (a & 335544064) === a ? 10262 : 10256;
      if ((e.subtreeFlags & n) !== 0 || (e.flags & n) !== 0 ? qt = 5 : (qt = 0, Na = $l = null, dd(l, l.pendingLanes)), n = l.pendingLanes, n === 0 && ($e = null), ic(a), e = e.stateNode, pl && typeof pl.onCommitFiberRoot == "function")
        try {
          pl.onCommitFiberRoot(
            pu,
            e,
            void 0,
            (e.current.flags & 128) === 128
          );
        } catch {
        }
      if (u !== null) {
        e = L.T, n = k.p, k.p = 2, L.T = null;
        try {
          for (var i = l.onRecoverableError, c = 0; c < u.length; c++) {
            var o = u[c];
            i(o.value, {
              componentStack: o.stack
            });
          }
        } finally {
          L.T = e, k.p = n;
        }
      }
      if (u = iu, i = cu, cu = null, u !== null && (iu = null, i === null && (i = []), t !== null))
        for (o = 0; o < u.length; o++)
          e = (0, u[o])(
            i
          ), e !== void 0 && t.finished.finally(e);
      (se & 3) !== 0 && xi(), oe(l), n = l.pendingLanes, (a & 261930) !== 0 && (n & 42) !== 0 ? l === Di ? un++ : (un = 0, Di = l) : (un = 0, Di = null), nn(0);
    }
  }
  function dd(t, l) {
    (t.pooledCacheLanes &= l) === 0 && (l = t.pooledCache, l != null && (t.pooledCache = null, Gu(l)));
  }
  function xi() {
    return nu !== null && (nu.skipTransition(), nu = null), Wf(), kf(), If(), Pf();
  }
  function Pf() {
    if (qt !== 5) return !1;
    var t = $l, l = Kf;
    Kf = 0;
    var e = ic(se), a = L.T, u = k.p;
    try {
      k.p = 32 > e ? 32 : e, L.T = null, e = Jf, Jf = null;
      var n = $l, i = se;
      if (qt = 0, Na = $l = null, se = 0, (_t & 6) !== 0) throw Error(f(331));
      var c = _t;
      if (_t |= 4, Im(n.current), Fm(
        n,
        n.current,
        i,
        e
      ), _t = c, nn(0, !1), pl && typeof pl.onPostCommitFiberRoot == "function")
        try {
          pl.onPostCommitFiberRoot(pu, n);
        } catch {
        }
      return !0;
    } finally {
      k.p = u, L.T = a, dd(t, l);
    }
  }
  function vd(t, l, e) {
    l = Bl(e, l), l = yf(t.stateNode, l, 2), t = Le(t, l, 2), t !== null && (zu(t, 2), oe(t));
  }
  function Mt(t, l, e) {
    if (t.tag === 3)
      vd(t, t, e);
    else
      for (; l !== null; ) {
        if (l.tag === 3) {
          vd(
            l,
            t,
            e
          );
          break;
        } else if (l.tag === 1) {
          var a = l.stateNode;
          if (typeof l.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && ($e === null || !$e.has(a))) {
            t = Bl(e, t), e = om(2), a = Le(l, e, 2), a !== null && (rm(
              e,
              a,
              l,
              t
            ), zu(a, 2), oe(a));
            break;
          }
        }
        l = l.return;
      }
  }
  function ts(t, l, e) {
    var a = t.pingCache;
    if (a === null) {
      a = t.pingCache = new Th();
      var u = /* @__PURE__ */ new Set();
      a.set(l, u);
    } else
      u = a.get(l), u === void 0 && (u = /* @__PURE__ */ new Set(), a.set(l, u));
    u.has(e) || (Vf = !0, u.add(e), t = Mh.bind(null, t, l, e), l.then(t, t));
  }
  function Mh(t, l, e) {
    var a = t.pingCache;
    a !== null && a.delete(l), t.pingedLanes |= t.suspendedLanes & e, t.warmLanes &= ~e, Ut === t && (vt & e) === e && ((Gt === 4 || Gt === 3 && (vt & 62914560) === vt && 300 > _l() - Oi) && (_t & 2) === 0 ? su(t, 0) : zi |= e, uu === vt && (uu = 0)), oe(t);
  }
  function hd(t, l) {
    l === 0 && (l = Ps()), t = fa(t, l), t !== null && (zu(t, l), oe(t));
  }
  function Dh(t) {
    var l = t.memoizedState, e = 0;
    l !== null && (e = l.retryLane), hd(t, e);
  }
  function Ch(t, l) {
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
        throw Error(f(314));
    }
    a !== null && a.delete(l), hd(t, e);
  }
  function Uh(t, l) {
    return ec(t, l);
  }
  var ru = null, mu = null, ls = !1, Hi = !1, es = !1, We = 0;
  function oe(t) {
    t !== mu && t.next === null && (mu === null ? ru = mu = t : mu = mu.next = t), Hi = !0, ls || (ls = !0, xh());
  }
  function nn(t, l) {
    if (!es && Hi) {
      es = !0;
      do
        for (var e = !1, a = ru; a !== null; ) {
          if (t !== 0) {
            var u = a.pendingLanes;
            if (u === 0) var n = 0;
            else {
              var i = a.suspendedLanes, c = a.pingedLanes;
              n = (1 << 31 - Nl(42 | t) + 1) - 1, n &= u & ~(i & ~c), n = n & 201326741 ? n & 201326741 | 1 : n ? n | 2 : 0;
            }
            n !== 0 && (e = !0, bd(a, n));
          } else
            n = vt, n = zn(
              a,
              a === Ut ? n : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (n & 3) === 0 || Nu(a, n) || (e = !0, bd(a, n));
          a = a.next;
        }
      while (e);
      es = !1;
    }
  }
  function Rh() {
    yd();
  }
  function yd() {
    Hi = ls = !1;
    var t = 0;
    We !== 0 && Vh() && (t = We);
    for (var l = _l(), e = null, a = ru; a !== null; ) {
      var u = a.next, n = gd(a, l);
      n === 0 ? (a.next = null, e === null ? ru = u : e.next = u, u === null && (mu = e)) : (e = a, (t !== 0 || (n & 3) !== 0) && (Hi = !0)), a = u;
    }
    qt !== 0 && qt !== 5 || nn(t), We !== 0 && (We = 0);
  }
  function gd(t, l) {
    for (var e = t.suspendedLanes, a = t.pingedLanes, u = t.expirationTimes, n = t.pendingLanes & -62914561; 0 < n; ) {
      var i = 31 - Nl(n), c = 1 << i, o = u[i];
      o === -1 ? ((c & e) === 0 || (c & a) !== 0) && (u[i] = W0(c, l)) : o <= l && (t.expiredLanes |= c), n &= ~c;
    }
    if (l = Ut, e = vt, e = zn(
      t,
      t === l ? e : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a = t.callbackNode, e === 0 || t === l && (At === 2 || At === 9) || t.cancelPendingCommit !== null)
      return a !== null && a !== null && ac(a), t.callbackNode = null, t.callbackPriority = 0;
    if ((e & 3) === 0 || Nu(t, e)) {
      if (l = e & -e, l === t.callbackPriority) return l;
      switch (a !== null && ac(a), ic(e)) {
        case 2:
        case 8:
          e = Ws;
          break;
        case 32:
          e = En;
          break;
        case 268435456:
          e = ks;
          break;
        default:
          e = En;
      }
      return a = Sd.bind(null, t), e = ec(e, a), t.callbackPriority = l, t.callbackNode = e, l;
    }
    return a !== null && a !== null && ac(a), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function Sd(t, l) {
    if (qt !== 0 && qt !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var e = t.callbackNode;
    if (xi() && t.callbackNode !== e)
      return null;
    var a = vt;
    return a = zn(
      t,
      t === Ut ? a : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a === 0 ? null : (ad(t, a, l), gd(t, _l()), t.callbackNode != null && t.callbackNode === e ? Sd.bind(null, t) : null);
  }
  function bd(t, l) {
    if (xi()) return null;
    ad(t, l, !0);
  }
  function xh() {
    Kh(function() {
      (_t & 6) !== 0 ? ec(
        Fs,
        Rh
      ) : yd();
    });
  }
  function as() {
    if (We === 0) {
      var t = va;
      t === 0 && (t = _n, _n <<= 1, (_n & 261888) === 0 && (_n = 256)), We = t;
    }
    return We;
  }
  function Td(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : Cn(t);
  }
  function Hh(t, l, e, a, u) {
    if (l === "submit" && e && e.stateNode === u) {
      var n = Td(
        (u[hl] || null).action
      ), i = a.submitter;
      i && (l = (l = i[hl] || null) ? Td(l.formAction) : i.getAttribute("formAction"), l !== null && (n = l, i = null));
      var c = new Hn(
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
                if (We !== 0) {
                  var o = new FormData(u, i);
                  rf(
                    e,
                    {
                      pending: !0,
                      data: o,
                      method: u.method,
                      action: n
                    },
                    null,
                    o
                  );
                }
              } else
                typeof n == "function" && (c.preventDefault(), o = new FormData(u, i), rf(
                  e,
                  {
                    pending: !0,
                    data: o,
                    method: u.method,
                    action: n
                  },
                  n,
                  o
                ));
            },
            currentTarget: u
          }
        ]
      });
    }
  }
  for (var us = 0; us < Mc.length; us++) {
    var ns = Mc[us], jh = ns.toLowerCase(), Bh = ns[0].toUpperCase() + ns.slice(1);
    Vl(
      jh,
      "on" + Bh
    );
  }
  Vl(Ko, "onAnimationEnd"), Vl(Jo, "onAnimationIteration"), Vl($o, "onAnimationStart"), Vl("dblclick", "onDoubleClick"), Vl("focusin", "onFocus"), Vl("focusout", "onBlur"), Vl(wv, "onTransitionRun"), Vl(Kv, "onTransitionStart"), Vl(Jv, "onTransitionCancel"), Vl(Fo, "onTransitionEnd"), Ha("onMouseEnter", ["mouseout", "mouseover"]), Ha("onMouseLeave", ["mouseout", "mouseover"]), Ha("onPointerEnter", ["pointerout", "pointerover"]), Ha("onPointerLeave", ["pointerout", "pointerover"]), na(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), na(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), na("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), na(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), na(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), na(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var cn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), qh = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(cn)
  );
  function Ed(t, l) {
    l = (l & 4) !== 0;
    for (var e = 0; e < t.length; e++) {
      var a = t[e], u = a.event;
      a = a.listeners;
      t: {
        var n = void 0;
        if (l)
          for (var i = a.length - 1; 0 <= i; i--) {
            var c = a[i], o = c.instance, y = c.currentTarget;
            if (c = c.listener, o !== n && u.isPropagationStopped())
              break t;
            n = c, u.currentTarget = y;
            try {
              n(u);
            } catch (E) {
              qn(E);
            }
            u.currentTarget = null, n = o;
          }
        else
          for (i = 0; i < a.length; i++) {
            if (c = a[i], o = c.instance, y = c.currentTarget, c = c.listener, o !== n && u.isPropagationStopped())
              break t;
            n = c, u.currentTarget = y;
            try {
              n(u);
            } catch (E) {
              qn(E);
            }
            u.currentTarget = null, n = o;
          }
      }
    }
  }
  function rt(t, l) {
    var e = l[no];
    e === void 0 && (e = l[no] = /* @__PURE__ */ new Set());
    var a = t + "__bubble";
    e.has(a) || (_d(l, t, 2, !1), e.add(a));
  }
  function is(t, l, e) {
    var a = 0;
    l && (a |= 4), _d(
      e,
      t,
      a,
      l
    );
  }
  var ji = "_reactListening" + Math.random().toString(36).slice(2);
  function cs(t) {
    if (!t[ji]) {
      t[ji] = !0, fo.forEach(function(e) {
        e !== "selectionchange" && (qh.has(e) || is(e, !1, t), is(e, !0, t));
      });
      var l = t.nodeType === 9 ? t : t.ownerDocument;
      l === null || l[ji] || (l[ji] = !0, is("selectionchange", !1, l));
    }
  }
  function _d(t, l, e, a) {
    switch (r0(l)) {
      case 2:
        var u = Dy;
        break;
      case 8:
        u = Cy;
        break;
      default:
        u = As;
    }
    e = u.bind(
      null,
      l,
      e,
      t
    ), u = void 0, !vc || l !== "touchstart" && l !== "touchmove" && l !== "wheel" || (u = !0), a ? u !== void 0 ? t.addEventListener(l, e, {
      capture: !0,
      passive: u
    }) : t.addEventListener(l, e, !0) : u !== void 0 ? t.addEventListener(l, e, {
      passive: u
    }) : t.addEventListener(l, e, !1);
  }
  function fs(t, l, e, a, u) {
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
              var o = i.tag;
              if ((o === 3 || o === 4) && i.stateNode.containerInfo === u)
                return;
              i = i.return;
            }
          for (; c !== null; ) {
            if (i = ua(c), i === null) return;
            if (o = i.tag, o === 5 || o === 6 || o === 26 || o === 27) {
              a = n = i;
              continue t;
            }
            c = c.parentNode;
          }
        }
        a = a.return;
      }
    _o(function() {
      var y = n, E = mc(e), N = [];
      t: {
        var v = Wo.get(t);
        if (v !== void 0) {
          var b = Hn, R = t;
          switch (t) {
            case "keypress":
              if (Rn(e) === 0) break t;
            case "keydown":
            case "keyup":
              b = Ev;
              break;
            case "focusin":
              R = "focus", b = Sc;
              break;
            case "focusout":
              R = "blur", b = Sc;
              break;
            case "beforeblur":
            case "afterblur":
              b = Sc;
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
              b = zo;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              b = sv;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              b = Ov;
              break;
            case Ko:
            case Jo:
            case $o:
              b = mv;
              break;
            case Fo:
              b = Mv;
              break;
            case "scroll":
            case "scrollend":
              b = cv;
              break;
            case "wheel":
              b = Cv;
              break;
            case "copy":
            case "cut":
            case "paste":
              b = vv;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              b = Ao;
              break;
            case "submit":
              b = Nv;
              break;
            case "toggle":
            case "beforetoggle":
              b = Rv;
          }
          var G = (l & 4) !== 0, lt = !G && (t === "scroll" || t === "scrollend"), h = G ? v !== null ? v + "Capture" : null : v;
          G = [];
          for (var m = y, S; m !== null; ) {
            var p = m;
            if (S = p.stateNode, p = p.tag, p !== 5 && p !== 26 && p !== 27 || S === null || h === null || (p = Mu(m, h), p != null && G.push(
              fn(m, p, S)
            )), lt) break;
            m = m.return;
          }
          0 < G.length && (v = new b(
            v,
            R,
            null,
            e,
            E
          ), N.push({ event: v, listeners: G }));
        }
      }
      if ((l & 7) === 0) {
        t: {
          if (b = t === "mouseover" || t === "pointerover", v = t === "mouseout" || t === "pointerout", b && e !== rc && (R = e.relatedTarget || e.fromElement) && (ua(R) || R[Ua]))
            break t;
          (v || b) && (R = E.window === E ? E : (b = E.ownerDocument) ? b.defaultView || b.parentWindow : window, v ? (b = e.relatedTarget || e.toElement, v = y, b = b ? ua(b) : null, b !== null && (lt = _(b), G = b.tag, b !== lt || G !== 5 && G !== 27 && G !== 6) && (b = null)) : (v = null, b = y), v !== b && (G = zo, p = "onMouseLeave", h = "onMouseEnter", m = "mouse", (t === "pointerout" || t === "pointerover") && (G = Ao, p = "onPointerLeave", h = "onPointerEnter", m = "pointer"), lt = v == null ? R : Au(v), S = b == null ? R : Au(b), R = new G(
            p,
            m + "leave",
            v,
            e,
            E
          ), R.target = lt, R.relatedTarget = S, p = null, ua(E) === y && (G = new G(
            h,
            m + "enter",
            b,
            e,
            E
          ), G.target = S, G.relatedTarget = lt, p = G), lt = p, G = v && b ? Ot(
            v,
            b,
            Yh
          ) : null, v !== null && pd(
            N,
            R,
            v,
            G,
            !1
          ), b !== null && lt !== null && pd(
            N,
            lt,
            b,
            G,
            !0
          )));
        }
        t: {
          if (v = y ? Au(y) : window, b = v.nodeName && v.nodeName.toLowerCase(), b === "select" || b === "input" && v.type === "file")
            var q = jo;
          else if (xo(v))
            if (Bo)
              q = Qv;
            else {
              q = Lv;
              var ht = Gv;
            }
          else
            b = v.nodeName, !b || b.toLowerCase() !== "input" || v.type !== "checkbox" && v.type !== "radio" ? y && oc(y.elementType) && (q = jo) : q = Xv;
          if (q && (q = q(t, y))) {
            Ho(
              N,
              q,
              e,
              E
            );
            break t;
          }
          ht && ht(t, v, y);
        }
        switch (ht = y ? Au(y) : window, t) {
          case "focusin":
            (xo(ht) || ht.contentEditable === "true") && (La = ht, zc = y, Bu = null);
            break;
          case "focusout":
            Bu = zc = La = null;
            break;
          case "mousedown":
            Oc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Oc = !1, Vo(N, e, E);
            break;
          case "selectionchange":
            if (Vv) break;
          case "keydown":
          case "keyup":
            Vo(N, e, E);
        }
        var w;
        if (Tc)
          t: {
            switch (t) {
              case "compositionstart":
                var F = "onCompositionStart";
                break t;
              case "compositionend":
                F = "onCompositionEnd";
                break t;
              case "compositionupdate":
                F = "onCompositionUpdate";
                break t;
            }
            F = void 0;
          }
        else
          Ga ? Uo(t, e) && (F = "onCompositionEnd") : t === "keydown" && e.keyCode === 229 && (F = "onCompositionStart");
        F && (Mo && e.locale !== "ko" && (Ga || F !== "onCompositionStart" ? F === "onCompositionEnd" && Ga && (w = po()) : (Ue = E, hc = "value" in Ue ? Ue.value : Ue.textContent, Ga = !0)), ht = Bi(y, F), 0 < ht.length && (F = new Oo(
          F,
          t,
          null,
          e,
          E
        ), N.push({ event: F, listeners: ht }), w ? F.data = w : (w = Ro(e), w !== null && (F.data = w)))), (w = Hv ? jv(t, e) : Bv(t, e)) && (F = Bi(y, "onBeforeInput"), 0 < F.length && (ht = new Oo(
          "onBeforeInput",
          "beforeinput",
          null,
          e,
          E
        ), N.push({
          event: ht,
          listeners: F
        }), ht.data = w)), Hh(
          N,
          t,
          y,
          e,
          E
        );
      }
      Ed(N, l);
    });
  }
  function fn(t, l, e) {
    return {
      instance: t,
      listener: l,
      currentTarget: e
    };
  }
  function Bi(t, l) {
    for (var e = l + "Capture", a = []; t !== null; ) {
      var u = t, n = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || n === null || (u = Mu(t, e), u != null && a.unshift(
        fn(t, u, n)
      ), u = Mu(t, l), u != null && a.push(
        fn(t, u, n)
      )), t.tag === 3) return a;
      t = t.return;
    }
    return [];
  }
  function Yh(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function pd(t, l, e, a, u) {
    for (var n = l._reactName, i = []; e !== null && e !== a; ) {
      var c = e, o = c.alternate, y = c.stateNode;
      if (c = c.tag, o !== null && o === a) break;
      c !== 5 && c !== 26 && c !== 27 || y === null || (o = y, u ? (y = Mu(e, n), y != null && i.unshift(
        fn(e, y, o)
      )) : u || (y = Mu(e, n), y != null && i.push(
        fn(e, y, o)
      ))), e = e.return;
    }
    i.length !== 0 && t.push({ event: l, listeners: i });
  }
  var Gh = /\r\n?/g, Lh = /\u0000|\uFFFD/g;
  function Nd(t) {
    return (typeof t == "string" ? t : "" + t).replace(Gh, `
`).replace(Lh, "");
  }
  function zd(t, l) {
    return l = Nd(l), Nd(t) === l;
  }
  function Dt(t, l, e, a, u, n) {
    switch (e) {
      case "children":
        if (typeof a == "string")
          l === "body" || l === "textarea" && a === "" || Ba(t, a);
        else if (typeof a == "number" || typeof a == "bigint")
          l !== "body" && Ba(t, "" + a);
        else return;
        break;
      case "className":
        Dn(t, "class", a);
        break;
      case "tabIndex":
        Dn(t, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Dn(t, e, a);
        break;
      case "style":
        To(t, a, n);
        return;
      case "data":
        if (l !== "object") {
          Dn(t, "data", a);
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
        a = Cn(a), t.setAttribute(e, a);
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
          typeof n == "function" && (e === "formAction" ? (l !== "input" && Dt(t, l, "name", u.name, u, null), Dt(
            t,
            l,
            "formEncType",
            u.formEncType,
            u,
            null
          ), Dt(
            t,
            l,
            "formMethod",
            u.formMethod,
            u,
            null
          ), Dt(
            t,
            l,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (Dt(t, l, "encType", u.encType, u, null), Dt(t, l, "method", u.method, u, null), Dt(t, l, "target", u.target, u, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          t.removeAttribute(e);
          break;
        }
        a = Cn(a), t.setAttribute(e, a);
        break;
      case "onClick":
        a != null && (t.onclick = te);
        return;
      case "onScroll":
        a != null && rt("scroll", t);
        return;
      case "onScrollEnd":
        a != null && rt("scrollend", t);
        return;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(f(61));
          if (e = a.__html, e != null) {
            if (u.children != null) throw Error(f(60));
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
        e = Cn(a), t.setAttributeNS(
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
        rt("beforetoggle", t), rt("toggle", t), Mn(t, "popover", a);
        break;
      case "xlinkActuate":
        de(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        de(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        de(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        de(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        de(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        de(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        de(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        de(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        de(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        Mn(t, "is", a);
        break;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N")
          e = nv.get(e) || e, Mn(t, e, a);
        else return;
    }
    Et = !0;
  }
  function ss(t, l, e, a, u, n) {
    switch (e) {
      case "style":
        To(t, a, n);
        return;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(f(61));
          if (e = a.__html, e != null) {
            if (u.children != null) throw Error(f(60));
            n?.__html !== e && (t.innerHTML = e);
          }
        }
        break;
      case "children":
        if (typeof a == "string") Ba(t, a);
        else if (typeof a == "number" || typeof a == "bigint")
          Ba(t, "" + a);
        else return;
        break;
      case "onScroll":
        a != null && rt("scroll", t);
        return;
      case "onScrollEnd":
        a != null && rt("scrollend", t);
        return;
      case "onClick":
        a != null && (t.onclick = te);
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
        if (!so.hasOwnProperty(e))
          t: {
            if (e[0] === "o" && e[1] === "n" && (u = e.endsWith("Capture"), n = e.slice(2, u ? e.length - 7 : void 0), l = t[hl] || null, l = l != null ? l[e] : null, typeof l == "function" && t.removeEventListener(n, l, u), typeof a == "function")) {
              typeof l != "function" && l !== null && (e in t ? t[e] = null : t.hasAttribute(e) && t.removeAttribute(e)), t.addEventListener(n, a, u);
              break t;
            }
            Et = !0, e in t ? t[e] = a : a === !0 ? t.setAttribute(e, "") : Mn(t, e, a);
          }
        return;
    }
    Et = !0;
  }
  function nl(t, l, e) {
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
        rt("error", t), rt("load", t);
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
                  throw Error(f(137, l));
                default:
                  Dt(t, l, n, i, e, null);
              }
          }
        u && Dt(t, l, "srcSet", e.srcSet, e, null), a && Dt(t, l, "src", e.src, e, null);
        return;
      case "input":
        rt("invalid", t);
        var c = n = i = u = null, o = null, y = null;
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
                  o = E;
                  break;
                case "defaultChecked":
                  y = E;
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
                    throw Error(f(137, l));
                  break;
                default:
                  Dt(t, l, a, E, e, null);
              }
          }
        yo(
          t,
          n,
          c,
          o,
          y,
          i,
          u,
          !1
        );
        return;
      case "select":
        rt("invalid", t), a = i = n = null;
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
                Dt(t, l, u, c, e, null);
            }
        l = n, e = i, t.multiple = !!a, l != null ? ja(t, !!a, l, !1) : e != null && ja(t, !!a, e, !0);
        return;
      case "textarea":
        rt("invalid", t), n = u = a = null;
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
                if (c != null) throw Error(f(91));
                break;
              default:
                Dt(t, l, i, c, e, null);
            }
        So(t, a, u, n);
        return;
      case "option":
        for (o in e)
          e.hasOwnProperty(o) && (a = e[o], a != null) && (o === "selected" ? t.selected = a && typeof a != "function" && typeof a != "symbol" : Dt(t, l, o, a, e, null));
        return;
      case "dialog":
        rt("beforetoggle", t), rt("toggle", t), rt("cancel", t), rt("close", t);
        break;
      case "iframe":
      case "object":
        rt("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < cn.length; a++)
          rt(cn[a], t);
        break;
      case "image":
        rt("error", t), rt("load", t);
        break;
      case "details":
        rt("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        rt("error", t), rt("load", t);
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
        for (y in e)
          if (e.hasOwnProperty(y) && (a = e[y], a != null))
            switch (y) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(f(137, l));
              default:
                Dt(t, l, y, a, e, null);
            }
        return;
      default:
        if (oc(l)) {
          for (E in e)
            e.hasOwnProperty(E) && (a = e[E], a !== void 0 && ss(
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
      e.hasOwnProperty(c) && (a = e[c], a != null && Dt(t, l, c, a, e, null));
  }
  var Xh = {};
  function Qh(t, l, e, a) {
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
        var u = null, n = null, i = null, c = null, o = null, y = null, E = null;
        for (b in e) {
          var N = e[b];
          if (e.hasOwnProperty(b) && N != null)
            switch (b) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                o = N;
              default:
                a.hasOwnProperty(b) || Dt(t, l, b, null, a, N);
            }
        }
        for (var v in a) {
          var b = a[v];
          if (N = e[v], a.hasOwnProperty(v) && (b != null || N != null))
            switch (v) {
              case "type":
                b !== N && (Et = !0), n = b;
                break;
              case "name":
                b !== N && (Et = !0), u = b;
                break;
              case "checked":
                b !== N && (Et = !0), y = b;
                break;
              case "defaultChecked":
                b !== N && (Et = !0), E = b;
                break;
              case "value":
                b !== N && (Et = !0), i = b;
                break;
              case "defaultValue":
                b !== N && (Et = !0), c = b;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (b != null)
                  throw Error(f(137, l));
                break;
              default:
                b !== N && Dt(
                  t,
                  l,
                  v,
                  b,
                  a,
                  N
                );
            }
        }
        fc(
          t,
          i,
          c,
          o,
          y,
          E,
          n,
          u
        );
        return;
      case "select":
        b = i = c = v = null;
        for (n in e)
          if (o = e[n], e.hasOwnProperty(n) && o != null)
            switch (n) {
              case "value":
                break;
              case "multiple":
                b = o;
              default:
                a.hasOwnProperty(n) || Dt(
                  t,
                  l,
                  n,
                  null,
                  a,
                  o
                );
            }
        for (u in a)
          if (n = a[u], o = e[u], a.hasOwnProperty(u) && (n != null || o != null))
            switch (u) {
              case "value":
                n !== o && (Et = !0), v = n;
                break;
              case "defaultValue":
                n !== o && (Et = !0), c = n;
                break;
              case "multiple":
                n !== o && (Et = !0), i = n;
              default:
                n !== o && Dt(
                  t,
                  l,
                  u,
                  n,
                  a,
                  o
                );
            }
        l = c, e = i, a = b, v != null ? ja(t, !!e, v, !1) : !!a != !!e && (l != null ? ja(t, !!e, l, !0) : ja(t, !!e, e ? [] : "", !1));
        return;
      case "textarea":
        b = v = null;
        for (c in e)
          if (u = e[c], e.hasOwnProperty(c) && u != null && !a.hasOwnProperty(c))
            switch (c) {
              case "value":
                break;
              case "children":
                break;
              default:
                Dt(t, l, c, null, a, u);
            }
        for (i in a)
          if (u = a[i], n = e[i], a.hasOwnProperty(i) && (u != null || n != null))
            switch (i) {
              case "value":
                u !== n && (Et = !0), v = u;
                break;
              case "defaultValue":
                u !== n && (Et = !0), b = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(f(91));
                break;
              default:
                u !== n && Dt(t, l, i, u, a, n);
            }
        go(t, v, b);
        return;
      case "option":
        for (var R in e)
          v = e[R], e.hasOwnProperty(R) && v != null && !a.hasOwnProperty(R) && (R === "selected" ? t.selected = !1 : Dt(
            t,
            l,
            R,
            null,
            a,
            v
          ));
        for (o in a)
          v = a[o], b = e[o], a.hasOwnProperty(o) && v !== b && (v != null || b != null) && (o === "selected" ? (v !== b && (Et = !0), t.selected = v && typeof v != "function" && typeof v != "symbol") : Dt(
            t,
            l,
            o,
            v,
            a,
            b
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
        for (var G in e)
          v = e[G], e.hasOwnProperty(G) && v != null && !a.hasOwnProperty(G) && Dt(t, l, G, null, a, v);
        for (y in a)
          if (v = a[y], b = e[y], a.hasOwnProperty(y) && v !== b && (v != null || b != null))
            switch (y) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (v != null)
                  throw Error(f(137, l));
                break;
              default:
                Dt(
                  t,
                  l,
                  y,
                  v,
                  a,
                  b
                );
            }
        return;
      default:
        if (oc(l)) {
          for (var lt in e)
            v = e[lt], e.hasOwnProperty(lt) && v !== void 0 && !a.hasOwnProperty(lt) && ss(
              t,
              l,
              lt,
              void 0,
              a,
              v
            );
          for (E in a)
            v = a[E], b = e[E], !a.hasOwnProperty(E) || v === b || v === void 0 && b === void 0 || ss(
              t,
              l,
              E,
              v,
              a,
              b
            );
          return;
        }
    }
    for (var h in e)
      v = e[h], e.hasOwnProperty(h) && v != null && !a.hasOwnProperty(h) && Dt(t, l, h, null, a, v);
    for (N in a)
      v = a[N], b = e[N], !a.hasOwnProperty(N) || v === b || v == null && b == null || Dt(t, l, N, v, a, b);
  }
  function Od(t) {
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
  function Zh() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, l = 0, e = performance.getEntriesByType("resource"), a = 0; a < e.length; a++) {
        var u = e[a], n = u.transferSize, i = u.initiatorType, c = u.duration;
        if (n && c && Od(i)) {
          for (i = 0, c = u.responseEnd, a += 1; a < e.length; a++) {
            var o = e[a], y = o.startTime;
            if (y > c) break;
            var E = o.transferSize, N = o.initiatorType;
            E && Od(N) && (o = o.responseEnd, i += E * (o < c ? 1 : (c - y) / (o - y)));
          }
          if (--a, l += 8 * (n + i) / (u.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return l / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var os = null, rs = null;
  function sn(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function Ad(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Md(t, l) {
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
  function Dd(t, l, e, a) {
    return e = sn(
      e
    ).createElement(t), e[tl] = a, e[hl] = l, nl(e, t, l), Wt(e), e;
  }
  function ms(t, l) {
    return t === "textarea" || t === "noscript" || typeof l.children == "string" || typeof l.children == "number" || typeof l.children == "bigint" || typeof l.dangerouslySetInnerHTML == "object" && l.dangerouslySetInnerHTML !== null && l.dangerouslySetInnerHTML.__html != null;
  }
  var ds = null;
  function Vh() {
    var t = window.event;
    return t && t.type === "popstate" ? t === ds ? !1 : (ds = t, !0) : (ds = null, !1);
  }
  var vs = typeof setTimeout == "function" ? setTimeout : void 0, wh = typeof clearTimeout == "function" ? clearTimeout : void 0, Cd = typeof Promise == "function" ? Promise : void 0, Ud = typeof requestAnimationFrame == "function" ? requestAnimationFrame : vs, Kh = typeof queueMicrotask == "function" ? queueMicrotask : typeof Cd < "u" ? function(t) {
    return Cd.resolve(null).then(t).catch(Jh);
  } : vs;
  function Jh(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function ke(t) {
    return t === "head";
  }
  function Rd(t, l) {
    var e = l, a = 0;
    do {
      var u = e.nextSibling;
      if (t.removeChild(e), u && u.nodeType === 8)
        if (e = u.data, e === "/$" || e === "/&") {
          if (a === 0) {
            t.removeChild(u), bu(l);
            return;
          }
          a--;
        } else if (e === "$" || e === "$?" || e === "$~" || e === "$!" || e === "&")
          a++;
        else if (e === "html")
          _s(
            t.ownerDocument.documentElement
          );
        else if (e === "head") {
          e = t.ownerDocument.head, _s(e);
          for (var n = e.firstChild; n; ) {
            var i = n.nextSibling, c = n.nodeName;
            n[Ou] || c === "SCRIPT" || c === "STYLE" || c === "LINK" && n.rel.toLowerCase() === "stylesheet" || e.removeChild(n), n = i;
          }
        } else
          e === "body" && _s(t.ownerDocument.body);
      e = u;
    } while (e);
    bu(l);
  }
  function xd(t, l) {
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
  function Hd(t, l, e) {
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
  function jd(t, l) {
    t = t.style, l = l.style;
    var e = l != null ? l.hasOwnProperty("viewTransitionName") ? l.viewTransitionName : l.hasOwnProperty("view-transition-name") ? l["view-transition-name"] : null : null;
    t.viewTransitionName = e == null || typeof e == "boolean" ? "" : ("" + e).trim(), e = l != null ? l.hasOwnProperty("viewTransitionClass") ? l.viewTransitionClass : l.hasOwnProperty("view-transition-class") ? l["view-transition-class"] : null : null, t.viewTransitionClass = e == null || typeof e == "boolean" ? "" : ("" + e).trim(), t.display === "inline-block" && (l == null ? t.display = t.margin = "" : (e = l.display, t.display = e == null || typeof e == "boolean" ? "" : e, e = l.margin, e != null ? t.margin = e : (e = l.hasOwnProperty("marginTop") ? l.marginTop : l["margin-top"], t.marginTop = e == null || typeof e == "boolean" ? "" : e, l = l.hasOwnProperty("marginBottom") ? l.marginBottom : l["margin-bottom"], t.marginBottom = l == null || typeof l == "boolean" ? "" : l)));
  }
  function $h(t, l, e) {
    return e = e.ownerDocument.defaultView, {
      rect: t,
      abs: l.position === "absolute" || l.position === "fixed",
      clip: l.clipPath !== "none" || l.overflow !== "visible" || l.filter !== "none" || l.mask !== "none" || l.mask !== "none" || l.borderRadius !== "0px",
      view: 0 <= t.bottom && 0 <= t.right && t.top <= e.innerHeight && t.left <= e.innerWidth
    };
  }
  function hs(t) {
    var l = t.getBoundingClientRect(), e = getComputedStyle(t);
    return $h(l, e, t);
  }
  function Fh(t) {
    return t.documentElement.clientHeight;
  }
  function Wh(t) {
    this.addEventListener("load", t), this.addEventListener("error", t);
  }
  function kh(t, l, e, a, u, n, i, c, o) {
    var y = l.nodeType === 9 ? l : l.ownerDocument;
    try {
      var E = y.startViewTransition({
        update: function() {
          var v = y.defaultView, b = v.navigation && v.navigation.transition, R = y.fonts.status;
          a();
          var G = [];
          if (R === "loaded" && (Fh(y), y.fonts.status === "loading" && G.push(y.fonts.ready)), R = G.length, t !== null)
            for (var lt = t.suspenseyImages, h = 0, m = 0; m < lt.length; m++) {
              var S = lt[m];
              if (!S.complete) {
                var p = S.getBoundingClientRect();
                if (0 < p.bottom && 0 < p.right && p.top < v.innerHeight && p.left < v.innerWidth) {
                  if (h += e0(S), h > Gi) {
                    G.length = R;
                    break;
                  }
                  S = new Promise(
                    Wh.bind(S)
                  ), G.push(S);
                }
              }
            }
          if (0 < G.length)
            return v = Promise.race([
              Promise.all(G),
              new Promise(function(q) {
                return setTimeout(q, 500);
              })
            ]).then(u, u), (b ? Promise.allSettled([b.finished, v]) : v).then(n, n);
          if (u(), b)
            return b.finished.then(
              n,
              n
            );
          n();
        },
        types: e
      });
      y.__reactViewTransition = E;
      var N = [];
      return E.ready.then(
        function() {
          for (var v = y.documentElement.getAnimations({
            subtree: !0
          }), b = 0; b < v.length; b++) {
            var R = v[b], G = R.effect, lt = G.pseudoElement;
            if (lt != null && lt.startsWith("::view-transition")) {
              N.push(R), R = G.getKeyframes();
              for (var h = lt = void 0, m = !0, S = 0; S < R.length; S++) {
                var p = R[S], q = p.width;
                if (lt === void 0) lt = q;
                else if (lt !== q) {
                  m = !1;
                  break;
                }
                if (q = p.height, h === void 0) h = q;
                else if (h !== q) {
                  m = !1;
                  break;
                }
                delete p.width, delete p.height, p.transform === "none" && delete p.transform;
              }
              m && lt !== void 0 && h !== void 0 && (G.setKeyframes(R), m = getComputedStyle(
                G.target,
                G.pseudoElement
              ), m.width !== lt || m.height !== h) && (m = R[0], m.width = lt, m.height = h, m = R[R.length - 1], m.width = lt, m.height = h, G.setKeyframes(R));
            }
          }
          i();
        },
        function(v) {
          y.__reactViewTransition === E && (y.__reactViewTransition = null);
          try {
            typeof v == "object" && v !== null && v.name === "InvalidStateError" && (v.message === "View transition was skipped because document visibility state is hidden." || v.message === "Skipping view transition because document visibility state has become hidden." || v.message === "Skipping view transition because viewport size changed." || v.message === "Transition was aborted because of invalid state") && (v = null), v !== null && o(v);
          } finally {
            a(), u(), i();
          }
        }
      ), E.finished.finally(function() {
        for (var v = 0; v < N.length; v++)
          N[v].cancel();
        y.__reactViewTransition === E && (y.__reactViewTransition = null), c();
      }), E;
    } catch {
      return a(), u(), i(), null;
    }
  }
  function za(t, l) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + t + "(" + l + ")";
  }
  za.prototype.animate = function(t, l) {
    return l = typeof l == "number" ? { duration: l } : Q({}, l), l.pseudoElement = this._selector, this._scope.animate(t, l);
  }, za.prototype.getAnimations = function() {
    for (var t = this._scope, l = this._selector, e = t.getAnimations({ subtree: !0 }), a = [], u = 0; u < e.length; u++) {
      var n = e[u].effect;
      n !== null && n.target === t && n.pseudoElement === l && a.push(e[u]);
    }
    return a;
  }, za.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function Bd(t) {
    return {
      name: t,
      group: new za("group", t),
      imagePair: new za("image-pair", t),
      old: new za("old", t),
      new: new za("new", t)
    };
  }
  function Rl(t) {
    this._fragmentFiber = t, this._observers = this._eventListeners = null;
  }
  Rl.prototype.addEventListener = function(t, l, e) {
    var a = null, u = null;
    if (!(e != null && typeof e != "boolean" && (a = e.signal || null, a !== null && a.aborted))) {
      this._eventListeners === null && (this._eventListeners = []);
      var n = this._eventListeners;
      if (Yd(n, t, l, e) === -1) {
        var i = this, c = l;
        e != null && typeof e != "boolean" && e.once === !0 && (c = function(o) {
          i.removeEventListener(
            t,
            l,
            e
          ), typeof l == "function" ? l.call(this, o) : l.handleEvent(o);
        }), a !== null && (u = i.removeEventListener.bind(
          i,
          t,
          l,
          e
        ), a.addEventListener("abort", u, { once: !0 }), u = a.removeEventListener.bind(a, "abort", u)), a = du(e), n.push({
          type: t,
          listener: l,
          optionsOrUseCapture: e,
          attachedListener: c,
          cleanup: u
        }), T(
          this._fragmentFiber.child,
          !1,
          Ih,
          t,
          c,
          a
        );
      }
      this._eventListeners = n;
    }
  };
  function Ih(t, l, e, a) {
    return et(t).addEventListener(
      l,
      e,
      a
    ), !1;
  }
  Rl.prototype.removeEventListener = function(t, l, e) {
    var a = this._eventListeners;
    if (a !== null && (l = Yd(
      a,
      t,
      l,
      e
    ), l !== -1)) {
      var u = a[l];
      e = u.attachedListener;
      var n = u.cleanup;
      u = du(u.optionsOrUseCapture), T(
        this._fragmentFiber.child,
        !1,
        Ph,
        t,
        e,
        u
      ), a.splice(l, 1), n !== null && n();
    }
  };
  function Ph(t, l, e, a) {
    return et(t).removeEventListener(
      l,
      e,
      a
    ), !1;
  }
  function du(t) {
    return t != null && typeof t != "boolean" && (t.once === !0 || t.signal instanceof AbortSignal) ? { capture: t.capture, passive: t.passive } : t;
  }
  function qd(t) {
    return t == null ? "c=0" : typeof t == "boolean" ? "c=" + (t ? "1" : "0") : "c=" + (t.capture ? "1" : "0");
  }
  function Yd(t, l, e, a) {
    if (t.length === 0) return -1;
    a = qd(a);
    for (var u = 0; u < t.length; u++) {
      var n = t[u];
      if (n.type === l && n.listener === e && qd(n.optionsOrUseCapture) === a)
        return u;
    }
    return -1;
  }
  Rl.prototype.dispatchEvent = function(t) {
    var l = U(
      this._fragmentFiber
    );
    if (l === null) return !0;
    l = et(l);
    var e = this._eventListeners;
    if (e !== null && 0 < e.length || !t.bubbles) {
      var a = l.nodeType === 9 ? l.createComment("") : document.createTextNode("");
      if (e)
        for (var u = 0; u < e.length; u++) {
          var n = e[u];
          a.addEventListener(
            n.type,
            n.attachedListener,
            du(n.optionsOrUseCapture)
          );
        }
      if (l.appendChild(a), t = a.dispatchEvent(t), e)
        for (u = 0; u < e.length; u++)
          n = e[u], a.removeEventListener(
            n.type,
            n.attachedListener,
            du(n.optionsOrUseCapture)
          );
      return l.removeChild(a), t;
    }
    return l.dispatchEvent(t);
  }, Rl.prototype.focus = function(t) {
    T(
      this._fragmentFiber.child,
      !0,
      Gd,
      t,
      void 0,
      void 0
    );
  };
  function Gd(t, l) {
    return t.tag === 6 ? !1 : (t = et(t), ry(t, l));
  }
  Rl.prototype.focusLast = function(t) {
    var l = [];
    T(
      this._fragmentFiber.child,
      !0,
      ys,
      l,
      void 0,
      void 0
    );
    for (var e = l.length - 1; 0 <= e && !Gd(l[e], t); e--) ;
  };
  function ys(t, l) {
    return l.push(t), !1;
  }
  Rl.prototype.blur = function() {
    var t = U(
      this._fragmentFiber
    );
    t !== null && (t = et(t), t = sn(t).activeElement, t !== null && T(
      this._fragmentFiber.child,
      !1,
      ty,
      t,
      void 0,
      void 0
    ));
  };
  function ty(t, l) {
    return t.tag === 6 ? !1 : (t = et(t), t === l || t.contains(l) ? (l.blur(), !0) : !1);
  }
  Rl.prototype.observeUsing = function(t) {
    this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(t), T(
      this._fragmentFiber.child,
      !1,
      ly,
      t,
      void 0,
      void 0
    );
  };
  function ly(t, l) {
    return t.tag === 6 || (t = et(t), l.observe(t)), !1;
  }
  Rl.prototype.unobserveUsing = function(t) {
    var l = this._observers;
    if (l !== null && l.has(t)) {
      l.delete(t), T(
        this._fragmentFiber.child,
        !1,
        ey,
        t,
        void 0,
        void 0
      );
      for (var e = l = 0; e < Fl.length; e++) {
        var a = Fl[e];
        a.fragmentInstance === this && a.observer === t ? t.unobserve(a.instance) : Fl[l++] = a;
      }
      Fl.length = l;
    }
  };
  function ey(t, l) {
    return t.tag === 6 || (t = et(t), l.unobserve(t)), !1;
  }
  var Fl = [], gs = !1;
  function ay(t, l, e) {
    Fl.push({
      fragmentInstance: t,
      observer: l,
      instance: e
    }), gs || (gs = !0, my(function() {
      gs = !1;
      var a = Fl;
      Fl = [];
      for (var u = 0; u < a.length; u++) {
        var n = a[u];
        n.observer.unobserve(n.instance);
      }
    }));
  }
  Rl.prototype.getClientRects = function() {
    var t = [];
    return T(
      this._fragmentFiber.child,
      !1,
      uy,
      t,
      void 0,
      void 0
    ), t;
  };
  function uy(t, l) {
    if (t.tag === 6) {
      t = t.stateNode;
      var e = t.ownerDocument.createRange();
      e.selectNodeContents(t), l.push.apply(l, e.getClientRects());
    } else
      t = et(t), l.push.apply(l, t.getClientRects());
    return !1;
  }
  Rl.prototype.getRootNode = function(t) {
    var l = U(
      this._fragmentFiber
    );
    return l === null ? this : et(l).getRootNode(t);
  }, Rl.prototype.compareDocumentPosition = function(t) {
    var l = U(
      this._fragmentFiber
    );
    if (l === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var e = [];
    T(
      this._fragmentFiber.child,
      !1,
      ys,
      e,
      void 0,
      void 0
    );
    var a = et(l);
    if (e.length === 0) {
      if (e = a, ct(this._fragmentFiber)) {
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
      return e === t ? u = Node.DOCUMENT_POSITION_CONTAINS : a & Node.DOCUMENT_POSITION_CONTAINED_BY && (e = St(l)[1], e === null ? u = Node.DOCUMENT_POSITION_PRECEDING : (t = et(e).compareDocumentPosition(
        t
      ), u = t === 0 || t & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), u |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    l = et(e[0]), u = et(e[e.length - 1]);
    var n = ct(this._fragmentFiber) ? l.parentElement : a;
    if (n == null)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    a = n.compareDocumentPosition(l) & Node.DOCUMENT_POSITION_CONTAINED_BY, n = n.compareDocumentPosition(u) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var i = l.compareDocumentPosition(t), c = u.compareDocumentPosition(t), o = i & Node.DOCUMENT_POSITION_CONTAINED_BY || c & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return c = a && n && i & Node.DOCUMENT_POSITION_FOLLOWING && c & Node.DOCUMENT_POSITION_PRECEDING, l = a && l === t || n && u === t || o || c ? Node.DOCUMENT_POSITION_CONTAINED_BY : !a && l === t || !n && u === t ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : i, l & Node.DOCUMENT_POSITION_DISCONNECTED || l & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || ny(
      l,
      this._fragmentFiber,
      e[0],
      e[e.length - 1],
      t
    ) ? l : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function ny(t, l, e, a, u) {
    var n = ua(u);
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
    return t & Node.DOCUMENT_POSITION_PRECEDING ? ((l = !!n) && !(l = n === e) && (l = Ot(
      e,
      n,
      Rt
    ), l === null ? l = !1 : (T(
      l,
      !0,
      bt,
      n,
      e
    ), n = pt, pt = null, l = n !== null)), l) : t & Node.DOCUMENT_POSITION_FOLLOWING ? ((l = !!n) && !(l = n === a) && (l = Ot(
      a,
      n,
      Rt
    ), l === null ? l = !1 : (T(
      l,
      !0,
      Lt,
      n,
      a
    ), n = pt, ft = pt = null, l = n !== null)), l) : !1;
  }
  function Ld(t, l) {
    var e = t.ownerDocument.createRange();
    e.selectNodeContents(t), t = e.getBoundingClientRect(), window.scrollTo(
      window.scrollX + t.left,
      l ? window.scrollY + t.top : window.scrollY + t.bottom - window.innerHeight
    );
  }
  Rl.prototype.scrollIntoView = function(t) {
    if (typeof t == "object") throw Error(f(566));
    var l = [];
    T(
      this._fragmentFiber.child,
      !1,
      ys,
      l,
      void 0,
      void 0
    );
    var e = t !== !1;
    if (l.length === 0) {
      var a = St(
        this._fragmentFiber
      );
      if (a = e ? a[1] || a[0] || U(this._fragmentFiber) : a[0] || a[1], a === null) return;
      if (a.tag === 6) {
        t = et(a), Ld(t, e);
        return;
      }
      if (a = et(a), a.nodeType !== 9) {
        if (a.nodeType === 11) {
          e = "host" in a ? a.host : null, e !== null && e.scrollIntoView(t);
          return;
        }
        a.scrollIntoView(t);
      }
    }
    for (a = e ? l.length - 1 : 0; a !== (e ? -1 : l.length); ) {
      var u = l[a];
      u.tag === 6 ? (u = et(u), Ld(u, e)) : et(u).scrollIntoView(t), a += e ? -1 : 1;
    }
  };
  function iy(t, l) {
    return t = et(t), Xd(t, l), !1;
  }
  function Xd(t, l) {
    t.reactFragments == null && (t.reactFragments = /* @__PURE__ */ new Set()), t.reactFragments.add(l);
  }
  function Qd(t, l) {
    var e = l._eventListeners;
    if (e !== null)
      for (var a = 0; a < e.length; a++) {
        var u = e[a];
        t.addEventListener(
          u.type,
          u.attachedListener,
          du(u.optionsOrUseCapture)
        );
      }
    t.nodeType !== 3 && (e = l._observers, e !== null && e.forEach(function(n) {
      for (var i = 0, c = 0; c < Fl.length; c++) {
        var o = Fl[c];
        (o.fragmentInstance !== l || o.observer !== n || o.instance !== t) && (Fl[i++] = o);
      }
      Fl.length = i, n.observe(t);
    }), Xd(t, l));
  }
  function cy(t, l) {
    var e = l._eventListeners;
    if (e !== null)
      for (var a = 0; a < e.length; a++) {
        var u = e[a];
        t.removeEventListener(
          u.type,
          u.attachedListener,
          du(u.optionsOrUseCapture)
        );
      }
    t.nodeType !== 3 && (e = l._observers, e !== null && e.forEach(function(n) {
      typeof n.rootMargin == "string" ? ay(
        l,
        n,
        t
      ) : n.unobserve(t);
    }), t.reactFragments != null && t.reactFragments.delete(l));
  }
  function Ss(t) {
    var l = t.firstChild;
    for (l && l.nodeType === 10 && (l = l.nextSibling); l; ) {
      var e = l;
      switch (l = l.nextSibling, e.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Ss(e), An(e);
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
  function fy(t, l, e, a) {
    for (; t.nodeType === 1; ) {
      var u = e;
      if (t.nodeName.toLowerCase() !== l.toLowerCase()) {
        if (!a && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (a) {
        if (!t[Ou])
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
      if (t = Xl(t.nextSibling), t === null) break;
    }
    return null;
  }
  function sy(t, l, e) {
    if (l === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = Xl(t.nextSibling), t === null)) return null;
    return t;
  }
  function Zd(t, l) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l || (t = Xl(t.nextSibling), t === null)) return null;
    return t;
  }
  function bs(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Ts(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function oy(t, l) {
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
  function Xl(t) {
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
  var Es = null;
  function Vd(t) {
    t = t.nextSibling;
    for (var l = 0; t; ) {
      if (t.nodeType === 8) {
        var e = t.data;
        if (e === "/$" || e === "/&") {
          if (l === 0)
            return Xl(t.nextSibling);
          l--;
        } else
          e !== "$" && e !== "$!" && e !== "$?" && e !== "$~" && e !== "&" || l++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function wd(t) {
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
  function ry(t, l) {
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
  function my(t) {
    Ud(function() {
      Ud(function(l) {
        return t(l);
      });
    });
  }
  function Kd(t, l, e) {
    switch (l = sn(e), t) {
      case "html":
        if (t = l.documentElement, !t) throw Error(f(452));
        return t;
      case "head":
        if (t = l.head, !t) throw Error(f(453));
        return t;
      case "body":
        if (t = l.body, !t) throw Error(f(454));
        return t;
      default:
        throw Error(f(451));
    }
  }
  function Jd(t, l, e) {
    for (var a in e) {
      var u = e[a];
      e.hasOwnProperty(a) && u != null && Dt(t, l, a, null, Xh, u);
    }
    e.dangerouslySetInnerHTML != null && (t.textContent = ""), t.onclick === te && (t.onclick = null), An(t);
  }
  function _s(t) {
    for (var l = t.attributes; l.length; )
      t.removeAttributeNode(l[0]);
    An(t);
  }
  var Ql = /* @__PURE__ */ new Map(), $d = /* @__PURE__ */ new Set();
  function on(t) {
    if (typeof t.getRootNode == "function") {
      var l = t.getRootNode();
      if (l.nodeType === 9 || l.nodeType === 11) return l;
    }
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  var Oe = k.d;
  k.d = {
    f: dy,
    r: vy,
    D: hy,
    C: yy,
    L: gy,
    m: Sy,
    X: Ty,
    S: by,
    M: Ey
  };
  function dy() {
    var t = Oe.f(), l = Ci();
    return t || l;
  }
  function vy(t) {
    var l = Ra(t);
    l !== null && l.tag === 5 && l.type === "form" ? Wr(l) : Oe.r(t);
  }
  var vu = typeof document > "u" ? null : document;
  function Fd(t, l, e) {
    var a = vu;
    if (a && typeof l == "string" && l) {
      var u = Hl(l);
      u = 'link[rel="' + t + '"][href="' + u + '"]', typeof e == "string" && (u += '[crossorigin="' + e + '"]'), $d.has(u) || ($d.add(u), t = { rel: t, crossOrigin: e, href: l }, a.querySelector(u) === null && (l = a.createElement("link"), nl(l, "link", t), Wt(l), a.head.appendChild(l)));
    }
  }
  function hy(t) {
    Oe.D(t), Fd("dns-prefetch", t, null);
  }
  function yy(t, l) {
    Oe.C(t, l), Fd("preconnect", t, l);
  }
  function gy(t, l, e) {
    Oe.L(t, l, e);
    var a = vu;
    if (a && t && l) {
      var u = 'link[rel="preload"][as="' + Hl(l) + '"]';
      l === "image" && e && e.imageSrcSet ? (u += '[imagesrcset="' + Hl(
        e.imageSrcSet
      ) + '"]', typeof e.imageSizes == "string" && (u += '[imagesizes="' + Hl(
        e.imageSizes
      ) + '"]')) : u += '[href="' + Hl(t) + '"]';
      var n = u;
      switch (l) {
        case "style":
          n = hu(t);
          break;
        case "script":
          n = yu(t);
      }
      if (!(Ql.has(n) || (t = Q(
        {
          rel: "preload",
          href: l === "image" && e && e.imageSrcSet ? void 0 : t,
          as: l
        },
        e
      ), Ql.set(n, t), a.querySelector(u) !== null || l === "style" && a.querySelector(rn(n)) || l === "script" && a.querySelector(mn(n))))) {
        var i = a.createElement("link");
        nl(i, "link", t), l === "style" && (i[On] = !0, i.onload = i.onerror = function() {
          co(i);
        }), Wt(i), a.head.appendChild(i);
      }
    }
  }
  function Sy(t, l) {
    Oe.m(t, l);
    var e = vu;
    if (e && t) {
      var a = l && typeof l.as == "string" ? l.as : "script", u = 'link[rel="modulepreload"][as="' + Hl(a) + '"][href="' + Hl(t) + '"]', n = u;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          n = yu(t);
      }
      if (!Ql.has(n) && (t = Q({ rel: "modulepreload", href: t }, l), Ql.set(n, t), e.querySelector(u) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (e.querySelector(mn(n)))
              return;
        }
        a = e.createElement("link"), nl(a, "link", t), Wt(a), e.head.appendChild(a);
      }
    }
  }
  function by(t, l, e) {
    Oe.S(t, l, e);
    var a = vu;
    if (a && t) {
      var u = xa(a).hoistableStyles, n = hu(t);
      l = l || "default";
      var i = u.get(n);
      if (!i) {
        var c = { loading: 0, preload: null };
        if (i = a.querySelector(
          rn(n)
        ))
          c.loading = 5;
        else {
          t = Q(
            { rel: "stylesheet", href: t, "data-precedence": l },
            e
          ), (e = Ql.get(n)) && ps(t, e);
          var o = i = a.createElement("link");
          Wt(o), nl(o, "link", t), o._p = new Promise(function(y, E) {
            o.onload = y, o.onerror = E;
          }), o.addEventListener("load", function() {
            c.loading |= 1;
          }), o.addEventListener("error", function() {
            c.loading |= 2;
          }), c.loading |= 4, qi(i, l, a);
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
  function Ty(t, l) {
    Oe.X(t, l);
    var e = vu;
    if (e && t) {
      var a = xa(e).hoistableScripts, u = yu(t), n = a.get(u);
      n || (n = e.querySelector(mn(u)), n || (t = Q({ src: t, async: !0 }, l), (l = Ql.get(u)) && Ns(t, l), n = e.createElement("script"), Wt(n), nl(n, "link", t), e.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, a.set(u, n));
    }
  }
  function Ey(t, l) {
    Oe.M(t, l);
    var e = vu;
    if (e && t) {
      var a = xa(e).hoistableScripts, u = yu(t), n = a.get(u);
      n || (n = e.querySelector(mn(u)), n || (t = Q({ src: t, async: !0, type: "module" }, l), (l = Ql.get(u)) && Ns(t, l), n = e.createElement("script"), Wt(n), nl(n, "link", t), e.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, a.set(u, n));
    }
  }
  function Wd(t, l, e, a) {
    var u = (u = $t.current) ? on(u) : null;
    if (!u) throw Error(f(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof e.precedence == "string" && typeof e.href == "string" ? (e = hu(e.href), l = xa(
          u
        ).hoistableStyles, a = l.get(e), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, l.set(e, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (e.rel === "stylesheet" && typeof e.href == "string" && typeof e.precedence == "string") {
          t = hu(e.href);
          var n = xa(
            u
          ).hoistableStyles, i = n.get(t);
          if (i || (u = u.ownerDocument || u, i = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, n.set(t, i), (n = u.querySelector(
            rn(t)
          )) ? n._p || (i.instance = n, i.state.loading = 5) : (n = Ql.get(t), n || (n = {
            rel: "preload",
            as: "style",
            href: e.href,
            crossOrigin: e.crossOrigin,
            integrity: e.integrity,
            media: e.media,
            hrefLang: e.hrefLang,
            referrerPolicy: e.referrerPolicy
          }, Ql.set(t, n)), _y(
            u,
            t,
            n,
            i.state
          ))), l && a === null)
            throw Error(f(528, ""));
          return i;
        }
        if (l && a !== null)
          throw Error(f(529, ""));
        return null;
      case "script":
        return l = e.async, e = e.src, typeof e == "string" && l && typeof l != "function" && typeof l != "symbol" ? (e = yu(e), l = xa(
          u
        ).hoistableScripts, a = l.get(e), a || (a = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, l.set(e, a)), a) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(f(444, t));
    }
  }
  function hu(t) {
    return 'href="' + Hl(t) + '"';
  }
  function rn(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function kd(t) {
    return Q({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function _y(t, l, e, a) {
    if (l = t.querySelector(
      'link[rel="preload"][as="style"][' + l + "]"
    )) {
      if (l[On] !== !0) {
        a.loading = 1;
        return;
      }
    } else
      l = t.createElement("link"), l[On] = !0, l.onload = l.onerror = co.bind(null, l), nl(l, "link", e), Wt(l), t.head.appendChild(l);
    a.preload = l, l.addEventListener("load", function() {
      return a.loading |= 1;
    }), l.addEventListener("error", function() {
      return a.loading |= 2;
    });
  }
  function yu(t) {
    return '[src="' + Hl(t) + '"]';
  }
  function mn(t) {
    return "script[async]" + t;
  }
  function Id(t, l, e) {
    if (l.count++, l.instance === null)
      switch (l.type) {
        case "style":
          var a = t.querySelector(
            'style[data-href~="' + Hl(e.href) + '"]'
          );
          if (a)
            return l.instance = a, Wt(a), a;
          var u = Q({}, e, {
            "data-href": e.href,
            "data-precedence": e.precedence,
            href: null,
            precedence: null
          });
          return a = (t.ownerDocument || t).createElement(
            "style"
          ), Wt(a), nl(a, "style", u), qi(a, e.precedence, t), l.instance = a;
        case "stylesheet":
          u = hu(e.href);
          var n = t.querySelector(
            rn(u)
          );
          if (n)
            return l.state.loading |= 4, l.instance = n, Wt(n), n;
          a = kd(e), (u = Ql.get(u)) && ps(a, u), n = (t.ownerDocument || t).createElement("link"), Wt(n);
          var i = n;
          return i._p = new Promise(function(c, o) {
            i.onload = c, i.onerror = o;
          }), nl(n, "link", a), l.state.loading |= 4, qi(n, e.precedence, t), l.instance = n;
        case "script":
          return n = yu(e.src), (u = t.querySelector(
            mn(n)
          )) ? (l.instance = u, Wt(u), u) : (a = e, (u = Ql.get(n)) && (a = Q({}, e), Ns(a, u)), t = t.ownerDocument || t, u = t.createElement("script"), Wt(u), nl(u, "link", a), t.head.appendChild(u), l.instance = u);
        case "void":
          return null;
        default:
          throw Error(f(443, l.type));
      }
    else
      l.type === "stylesheet" && (l.state.loading & 4) === 0 && (a = l.instance, l.state.loading |= 4, qi(a, e.precedence, t));
    return l.instance;
  }
  function qi(t, l, e) {
    for (var a = e.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = a.length ? a[a.length - 1] : null, n = u, i = 0; i < a.length; i++) {
      var c = a[i];
      if (c.dataset.precedence === l) n = c;
      else if (n !== u) break;
    }
    n ? n.parentNode.insertBefore(t, n.nextSibling) : (l = e.nodeType === 9 ? e.head : e, l.insertBefore(t, l.firstChild));
  }
  function ps(t, l) {
    t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.title == null && (t.title = l.title);
  }
  function Ns(t, l) {
    t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.integrity == null && (t.integrity = l.integrity);
  }
  var Yi = null;
  function Pd(t, l, e) {
    if (Yi === null) {
      var a = /* @__PURE__ */ new Map(), u = Yi = /* @__PURE__ */ new Map();
      u.set(e, a);
    } else
      u = Yi, a = u.get(e), a || (a = /* @__PURE__ */ new Map(), u.set(e, a));
    if (a.has(t)) return a;
    for (a.set(t, null), e = e.getElementsByTagName(t), u = 0; u < e.length; u++) {
      var n = e[u];
      if (!(n[Ou] || n[tl] || t === "link" && n.getAttribute("rel") === "stylesheet") && n.namespaceURI !== "http://www.w3.org/2000/svg") {
        var i = n.getAttribute(l) || "";
        i = t + i;
        var c = a.get(i);
        c ? c.push(n) : a.set(i, [n]);
      }
    }
    return a;
  }
  function zs(t, l, e) {
    t = t.ownerDocument || t, t.head.insertBefore(
      e,
      l === "title" ? t.querySelector("head > title") : null
    );
  }
  function py(t, l, e) {
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
  function t0(t, l) {
    return t === "img" && l.src != null && l.src !== "" && l.onLoad == null && l.loading !== "lazy";
  }
  function l0(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function e0(t) {
    return (t.width || 100) * (t.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
  }
  function a0(t, l) {
    typeof l.decode == "function" && (t.imgCount++, l.complete || (t.imgBytes += e0(l), t.suspenseyImages.push(l)), t = Oy.bind(t), l.decode().then(t, t));
  }
  function Ny(t, l, e, a) {
    if (e.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (e.state.loading & 4) === 0) {
      if (e.instance === null) {
        var u = hu(a.href), n = l.querySelector(
          rn(u)
        );
        if (n) {
          l = n._p, l !== null && typeof l == "object" && typeof l.then == "function" && (t.count++, t = dn.bind(t), l.then(t, t)), e.state.loading |= 4, e.instance = n, Wt(n);
          return;
        }
        n = l.ownerDocument || l, a = kd(a), (u = Ql.get(u)) && ps(a, u), n = n.createElement("link"), Wt(n);
        var i = n;
        i._p = new Promise(function(c, o) {
          i.onload = c, i.onerror = o;
        }), nl(n, "link", a), e.instance = n;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(e, l), (l = e.state.preload) && (e.state.loading & 3) === 0 && (t.count++, e = dn.bind(t), l.addEventListener("load", e), l.addEventListener("error", e));
    }
  }
  var Gi = 0;
  function zy(t, l) {
    return t.stylesheets && t.count === 0 && Xi(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(e) {
      var a = setTimeout(function() {
        if (t.stylesheets && Xi(t, t.stylesheets), t.unsuspend) {
          var n = t.unsuspend;
          t.unsuspend = null, n();
        }
      }, 6e4 + l);
      0 < t.imgBytes && Gi === 0 && (Gi = 62500 * Zh());
      var u = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && Xi(t, t.stylesheets), t.unsuspend)) {
            var n = t.unsuspend;
            t.unsuspend = null, n();
          }
        },
        (t.imgBytes > Gi ? 50 : 800) + l
      );
      return t.unsuspend = e, function() {
        t.unsuspend = null, clearTimeout(a), clearTimeout(u);
      };
    } : null;
  }
  function u0(t) {
    if (t.count === 0 && (t.imgCount === 0 || !t.waitingForImages)) {
      if (t.stylesheets) Xi(t, t.stylesheets);
      else if (t.unsuspend) {
        var l = t.unsuspend;
        t.unsuspend = null, l();
      }
    }
  }
  function dn() {
    this.count--, u0(this);
  }
  function Oy() {
    this.imgCount--, u0(this);
  }
  var Li = null;
  function Xi(t, l) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, Li = /* @__PURE__ */ new Map(), l.forEach(Ay, t), Li = null, dn.call(t));
  }
  function Ay(t, l) {
    if (!(l.state.loading & 4)) {
      var e = Li.get(t);
      if (e) var a = e.get(null);
      else {
        e = /* @__PURE__ */ new Map(), Li.set(t, e);
        for (var u = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), n = 0; n < u.length; n++) {
          var i = u[n];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (e.set(i.dataset.precedence, i), a = i);
        }
        a && e.set(null, a);
      }
      u = l.instance, i = u.getAttribute("data-precedence"), n = e.get(i) || a, n === a && e.set(null, u), e.set(i, u), this.count++, a = dn.bind(this), u.addEventListener("load", a), u.addEventListener("error", a), n ? n.parentNode.insertBefore(u, n.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(u, t.firstChild)), l.state.loading |= 4;
    }
  }
  var gu = {
    $$typeof: dt,
    Provider: null,
    Consumer: null,
    _currentValue: El,
    _currentValue2: El,
    _threadCount: 0
  };
  function My(t, l, e, a, u, n, i, c, o) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = uc(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = uc(0), this.hiddenUpdates = uc(null), this.identifierPrefix = a, this.onUncaughtError = u, this.onCaughtError = n, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = o, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function n0(t, l, e, a, u, n, i, c, o, y, E, N) {
    return t = new My(
      t,
      l,
      e,
      i,
      o,
      y,
      E,
      N,
      c
    ), l = 1, n === !0 && (l |= 24), n = yl(3, null, null, l), t.current = n, n.stateNode = t, l = Gc(), l.refCount++, t.pooledCache = l, l.refCount++, n.memoizedState = {
      element: a,
      isDehydrated: e,
      cache: l
    }, Zc(n), t;
  }
  function i0(t) {
    return t ? (t = Za, t) : Za;
  }
  function c0(t, l, e, a, u, n) {
    u = i0(u), a.context === null ? a.context = u : a.pendingContext = u, a = Ge(l), a.payload = { element: e }, n = n === void 0 ? null : n, n !== null && (a.callback = n), e = Le(t, a, l), e !== null && (Tl(e, t, l), Zu(e, t, l));
  }
  function f0(t, l) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var e = t.retryLane;
      t.retryLane = e !== 0 && e < l ? e : l;
    }
  }
  function Os(t, l) {
    f0(t, l), (t = t.alternate) && f0(t, l);
  }
  function s0(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = fa(t, 67108864);
      l !== null && Tl(l, t, 67108864), Os(t, 67108864);
    }
  }
  function o0(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = Ul();
      l = nc(l);
      var e = fa(t, l);
      e !== null && Tl(e, t, l), Os(t, l);
    }
  }
  var Su = !0;
  function Dy(t, l, e, a) {
    var u = L.T;
    L.T = null;
    var n = k.p;
    try {
      k.p = 2, As(t, l, e, a);
    } finally {
      k.p = n, L.T = u;
    }
  }
  function Cy(t, l, e, a) {
    var u = L.T;
    L.T = null;
    var n = k.p;
    try {
      k.p = 8, As(t, l, e, a);
    } finally {
      k.p = n, L.T = u;
    }
  }
  function As(t, l, e, a) {
    if (Su) {
      var u = Ms(a);
      if (u === null)
        fs(
          t,
          l,
          a,
          Qi,
          e
        ), m0(t, a);
      else if (Ry(
        u,
        t,
        l,
        e,
        a
      ))
        a.stopPropagation();
      else if (m0(t, a), l & 4 && -1 < Uy.indexOf(t)) {
        for (; u !== null; ) {
          var n = Ra(u);
          if (n !== null)
            switch (n.tag) {
              case 3:
                if (n = n.stateNode, n.current.memoizedState.isDehydrated) {
                  var i = aa(n.pendingLanes);
                  if (i !== 0) {
                    var c = n;
                    for (c.pendingLanes |= 2, c.entangledLanes |= 2; i; ) {
                      var o = 1 << 31 - Nl(i);
                      c.entanglements[1] |= o, i &= ~o;
                    }
                    oe(n), (_t & 6) === 0 && (Ai = _l() + 500, nn(0));
                  }
                }
                break;
              case 31:
              case 13:
                c = fa(n, 2), c !== null && Tl(c, n, 2), Ci(), Os(n, 2);
            }
          if (n = Ms(a), n === null && fs(
            t,
            l,
            a,
            Qi,
            e
          ), n === u) break;
          u = n;
        }
        u !== null && a.stopPropagation();
      } else
        fs(
          t,
          l,
          a,
          null,
          e
        );
    }
  }
  function Ms(t) {
    return t = mc(t), Ds(t);
  }
  var Qi = null;
  function Ds(t) {
    if (Qi = null, t = ua(t), t !== null) {
      var l = _(t);
      if (l === null) t = null;
      else {
        var e = l.tag;
        if (e === 13) {
          if (t = D(l), t !== null) return t;
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
    return Qi = t, null;
  }
  function r0(t) {
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
        switch (Z0()) {
          case Fs:
            return 2;
          case Ws:
            return 8;
          case En:
          case V0:
            return 32;
          case ks:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Cs = !1, Ie = null, Pe = null, ta = null, vn = /* @__PURE__ */ new Map(), hn = /* @__PURE__ */ new Map(), la = [], Uy = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function m0(t, l) {
    switch (t) {
      case "focusin":
      case "focusout":
        Ie = null;
        break;
      case "dragenter":
      case "dragleave":
        Pe = null;
        break;
      case "mouseover":
      case "mouseout":
        ta = null;
        break;
      case "pointerover":
      case "pointerout":
        vn.delete(l.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        hn.delete(l.pointerId);
    }
  }
  function yn(t, l, e, a, u, n) {
    return t === null || t.nativeEvent !== n ? (t = {
      blockedOn: l,
      domEventName: e,
      eventSystemFlags: a,
      nativeEvent: n,
      targetContainers: [u]
    }, l !== null && (l = Ra(l), l !== null && s0(l)), t) : (t.eventSystemFlags |= a, l = t.targetContainers, u !== null && l.indexOf(u) === -1 && l.push(u), t);
  }
  function Ry(t, l, e, a, u) {
    switch (l) {
      case "focusin":
        return Ie = yn(
          Ie,
          t,
          l,
          e,
          a,
          u
        ), !0;
      case "dragenter":
        return Pe = yn(
          Pe,
          t,
          l,
          e,
          a,
          u
        ), !0;
      case "mouseover":
        return ta = yn(
          ta,
          t,
          l,
          e,
          a,
          u
        ), !0;
      case "pointerover":
        var n = u.pointerId;
        return vn.set(
          n,
          yn(
            vn.get(n) || null,
            t,
            l,
            e,
            a,
            u
          )
        ), !0;
      case "gotpointercapture":
        return n = u.pointerId, hn.set(
          n,
          yn(
            hn.get(n) || null,
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
  function d0(t) {
    var l = ua(t.target);
    if (l !== null) {
      var e = _(l);
      if (e !== null) {
        if (l = e.tag, l === 13) {
          if (l = D(e), l !== null) {
            t.blockedOn = l, uo(t.priority, function() {
              o0(e);
            });
            return;
          }
        } else if (l === 31) {
          if (l = C(e), l !== null) {
            t.blockedOn = l, uo(t.priority, function() {
              o0(e);
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
  function Zi(t) {
    if (t.blockedOn !== null) return !1;
    for (var l = t.targetContainers; 0 < l.length; ) {
      var e = Ms(t.nativeEvent);
      if (e === null) {
        e = t.nativeEvent;
        var a = new e.constructor(
          e.type,
          e
        );
        rc = a, e.target.dispatchEvent(a), rc = null;
      } else
        return l = Ra(e), l !== null && s0(l), t.blockedOn = e, !1;
      l.shift();
    }
    return !0;
  }
  function v0(t, l, e) {
    Zi(t) && e.delete(l);
  }
  function xy() {
    Cs = !1, Ie !== null && Zi(Ie) && (Ie = null), Pe !== null && Zi(Pe) && (Pe = null), ta !== null && Zi(ta) && (ta = null), vn.forEach(v0), hn.forEach(v0);
  }
  function Vi(t, l) {
    t.blockedOn === l && (t.blockedOn = null, Cs || (Cs = !0, s.unstable_scheduleCallback(
      s.unstable_NormalPriority,
      xy
    )));
  }
  var wi = null;
  function h0(t) {
    wi !== t && (wi = t, s.unstable_scheduleCallback(
      s.unstable_NormalPriority,
      function() {
        wi === t && (wi = null);
        for (var l = 0; l < t.length; l += 3) {
          var e = t[l], a = t[l + 1], u = t[l + 2];
          if (typeof a != "function") {
            if (Ds(a || e) === null)
              continue;
            break;
          }
          var n = Ra(e);
          n !== null && (t.splice(l, 3), l -= 3, rf(
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
  function bu(t) {
    function l(o) {
      return Vi(o, t);
    }
    Ie !== null && Vi(Ie, t), Pe !== null && Vi(Pe, t), ta !== null && Vi(ta, t), vn.forEach(l), hn.forEach(l);
    for (var e = 0; e < la.length; e++) {
      var a = la[e];
      a.blockedOn === t && (a.blockedOn = null);
    }
    for (; 0 < la.length && (e = la[0], e.blockedOn === null); )
      d0(e), e.blockedOn === null && la.shift();
    if (e = (t.ownerDocument || t).$$reactFormReplay, e != null)
      for (a = 0; a < e.length; a += 3) {
        var u = e[a], n = e[a + 1], i = u[hl] || null;
        if (typeof n == "function")
          i || h0(e);
        else if (i) {
          var c = null;
          if (n && n.hasAttribute("formAction")) {
            if (u = n, i = n[hl] || null)
              c = i.formAction;
            else if (Ds(u) !== null) continue;
          } else c = i.action;
          typeof c == "function" ? e[a + 1] = c : (e.splice(a, 3), a -= 3), h0(e);
        }
      }
  }
  function y0() {
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
  function Us(t) {
    this._internalRoot = t;
  }
  Ki.prototype.render = Us.prototype.render = function(t) {
    var l = this._internalRoot;
    if (l === null) throw Error(f(409));
    var e = l.current, a = Ul();
    c0(e, a, t, l, null, null);
  }, Ki.prototype.unmount = Us.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var l = t.containerInfo;
      c0(t.current, 2, null, t, null, null), Ci(), l[Ua] = null;
    }
  };
  function Ki(t) {
    this._internalRoot = t;
  }
  Ki.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var l = ao();
      t = { blockedOn: null, target: t, priority: l };
      for (var e = 0; e < la.length && l !== 0 && l < la[e].priority; e++) ;
      la.splice(e, 0, t), e === 0 && d0(t);
    }
  };
  var g0 = g.version;
  if (g0 !== "19.3.0")
    throw Error(
      f(
        527,
        g0,
        "19.3.0"
      )
    );
  k.findDOMNode = function(t) {
    var l = t._reactInternals;
    if (l === void 0)
      throw typeof t.render == "function" ? Error(f(188)) : (t = Object.keys(t).join(","), Error(f(268, t)));
    return t = X(l), t = t !== null ? j(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var Hy = {
    bundleType: 0,
    version: "19.3.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: L,
    reconcilerVersion: "19.3.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ji = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ji.isDisabled && Ji.supportsFiber)
      try {
        pu = Ji.inject(
          Hy
        ), pl = Ji;
      } catch {
      }
  }
  return Sn.createRoot = function(t, l) {
    if (!O(t)) throw Error(f(299));
    var e = !1, a = "", u = im, n = cm, i = fm;
    return l != null && (l.unstable_strictMode === !0 && (e = !0), l.identifierPrefix !== void 0 && (a = l.identifierPrefix), l.onUncaughtError !== void 0 && (u = l.onUncaughtError), l.onCaughtError !== void 0 && (n = l.onCaughtError), l.onRecoverableError !== void 0 && (i = l.onRecoverableError)), l = n0(
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
      y0
    ), t[Ua] = l.current, cs(t), new Us(l);
  }, Sn.hydrateRoot = function(t, l, e) {
    if (!O(t)) throw Error(f(299));
    var a = !1, u = "", n = im, i = cm, c = fm, o = null;
    return e != null && (e.unstable_strictMode === !0 && (a = !0), e.identifierPrefix !== void 0 && (u = e.identifierPrefix), e.onUncaughtError !== void 0 && (n = e.onUncaughtError), e.onCaughtError !== void 0 && (i = e.onCaughtError), e.onRecoverableError !== void 0 && (c = e.onRecoverableError), e.formState !== void 0 && (o = e.formState)), l = n0(
      t,
      1,
      !0,
      l,
      e ?? null,
      a,
      u,
      o,
      n,
      i,
      c,
      y0
    ), l.context = i0(null), e = l.current, a = Ul(), a = nc(a), u = Ge(a), u.callback = null, Le(e, u, a), e = a, l.current.lanes = e, zu(l, e), oe(l), t[Ua] = l.current, cs(t), new Ki(l);
  }, Sn.version = "19.3.0", Sn;
}
var A0;
function Vy() {
  if (A0) return Hs.exports;
  A0 = 1;
  function s() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s);
      } catch (g) {
        console.error(g);
      }
  }
  return s(), Hs.exports = Zy(), Hs.exports;
}
var wy = Vy();
function Ma(s) {
  if (!s.id || !Number.isSafeInteger(s.startSample) || !Number.isSafeInteger(s.endSample) || !Number.isFinite(s.sampleRate) || s.sampleRate <= 0 || s.startSample < 0 || s.endSample <= s.startSample)
    throw new RangeError("A loop needs an id, valid sample rate and increasing integer sample bounds");
  return {
    start: s.startSample / s.sampleRate,
    end: s.endSample / s.sampleRate,
    duration: (s.endSample - s.startSample) / s.sampleRate
  };
}
function Ky(s, g = 0) {
  const r = /* @__PURE__ */ new Set();
  return s.filter((f) => {
    try {
      const O = Ma(f);
      return r.has(f.id) || g > 0 && O.end > g + 0.02 ? !1 : (r.add(f.id), !0);
    } catch {
      return !1;
    }
  });
}
function M0(s, g, r) {
  const f = r - g;
  return !Number.isFinite(s) || f <= 0 ? g : g + ((s - g) % f + f) % f;
}
class Jy {
  constructor(g = () => new AudioContext()) {
    this.createContext = g;
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
    const g = Math.max(0, this.context.currentTime - this.anchor);
    return this.start + (this.offset + g) % this.length;
  }
  pause() {
    return this.stoppedTime = this.currentTime, this.generation += 1, this.abort?.abort(), this.abort = null, this.node && (this.node.stop(), this.node.disconnect(), this.node = null), this.stoppedTime;
  }
  async play(g, r, f, O = "same-origin") {
    const _ = Ma(g);
    this.pause();
    const D = this.generation;
    this.context ??= this.createContext();
    const C = this.context, Y = C.resume();
    Y.catch(() => {
    });
    const X = g.audioSrc || r, j = JSON.stringify([X, g.startSample, g.endSample, g.sampleRate]);
    try {
      let T = this.cache?.url === j ? this.cache.buffer : null;
      if (!T) {
        const et = new AbortController();
        this.abort = et;
        const pt = await fetch(X, { signal: et.signal, credentials: O });
        if (!pt.ok) throw new Error(`Could not load loop audio (HTTP ${pt.status})`);
        const ft = 128 * 1024 * 1024;
        if (Number(pt.headers.get("Content-Length")) > ft) throw new Error("Loop audio exceeds 128 MiB");
        const bt = await pt.arrayBuffer();
        if (bt.byteLength > ft) throw new Error("Loop audio exceeds 128 MiB");
        if (T = await C.decodeAudioData(bt), D !== this.generation) return !1;
        this.cache = { url: j, buffer: T };
      }
      if (await Y, D !== this.generation) return !1;
      const U = g.audioSrc ? 0 : _.start, ct = U + _.duration, St = Math.max(2 / T.sampleRate, 2e-3);
      if (!Number.isFinite(T.duration) || T.duration <= U || ct > T.duration + St || g.audioSrc && Math.abs(T.duration - _.duration) > St)
        throw new Error("Loop audio duration does not match the reported sample boundaries");
      const mt = C.createBufferSource();
      return mt.buffer = T, mt.loop = !0, mt.loopStart = U, mt.loopEnd = Math.min(ct, T.duration), mt.connect(C.destination), this.start = _.start, this.length = mt.loopEnd - U, this.offset = M0(f, _.start, _.start + this.length) - _.start, this.anchor = C.currentTime, mt.start(this.anchor, U + this.offset), this.node = mt, !0;
    } catch (T) {
      if (D !== this.generation) return !1;
      throw T;
    } finally {
      Y.catch(() => {
      });
    }
  }
  dispose() {
    this.pause(), this.cache = null;
    const g = this.context;
    this.context = null, g && g.close().catch(() => {
    });
  }
}
function $y(s, g, r, f, O = "same-origin") {
  const [_, D] = K.useState(0), [C, Y] = K.useState(!1), [X, j] = K.useState(!1), [T, U] = K.useState(""), ct = K.useRef(!1), St = K.useRef("media"), mt = K.useRef(null), et = K.useRef(0), pt = K.useRef({ audioSrc: g, activeLoop: r, onError: f, credentials: O });
  pt.current = { audioSrc: g, activeLoop: r, onError: f, credentials: O };
  const ft = K.useCallback(() => St.current === "loop" ? mt.current?.currentTime ?? 0 : s.current?.currentTime ?? 0, [s]), bt = K.useCallback(() => {
    const x = ft();
    return et.current += 1, ct.current = !1, mt.current?.pause(), s.current?.pause(), j(!1), Y(!1), D(x), x;
  }, [s, ft]), Lt = K.useCallback((x) => {
    bt(), U(x instanceof Error ? x.message : String(x)), pt.current.onError?.(x);
  }, [bt]), Rt = K.useCallback(async (x) => {
    bt();
    const B = et.current;
    ct.current = !0, j(!0), U("");
    const { activeLoop: ut, audioSrc: Xt, credentials: Bt } = pt.current;
    try {
      if (ut) {
        if (St.current = "loop", mt.current ??= new Jy(), !await mt.current.play(ut, Xt, x, Bt)) return;
      } else {
        St.current = "media";
        const dt = s.current;
        if (!dt) return;
        dt.currentTime = Math.max(0, x), await dt.play();
      }
      if (B !== et.current) return;
      D(ft()), j(!1), Y(!0);
    } catch (dt) {
      B === et.current && Lt(dt);
    }
  }, [s, Lt, bt, ft]), Ot = K.useCallback((x) => {
    const B = pt.current.activeLoop;
    if (B) {
      const ut = Ma(B);
      x = M0(x, ut.start, ut.end);
    }
    ct.current ? Rt(x) : (bt(), St.current = "media", s.current && (s.current.currentTime = x), D(x));
  }, [s, bt, Rt]), Q = K.useCallback(() => {
    if (ct.current) {
      bt();
      return;
    }
    let x = ft();
    const B = pt.current.activeLoop;
    if (B) {
      const ut = Ma(B);
      (x < ut.start || x >= ut.end) && (x = ut.start);
    }
    Rt(x);
  }, [bt, Rt, ft]);
  K.useEffect(() => (bt(), St.current = "media", D(0), U(""), mt.current?.dispose(), mt.current = null, () => {
    et.current += 1, ct.current = !1, mt.current?.dispose(), mt.current = null, s.current?.pause();
  }), [g, s, bt]);
  const at = r ? JSON.stringify([r.id, r.startSample, r.endSample, r.sampleRate, r.audioSrc]) : "";
  K.useEffect(() => {
    const x = ct.current;
    let B = bt();
    const ut = pt.current.activeLoop;
    ut && (B = Ma(ut).start), St.current = "media", s.current && (s.current.currentTime = B), D(B), x && Rt(B);
  }, [at, s, bt, Rt]), K.useEffect(() => {
    if (!C) return;
    let x = 0;
    const B = () => {
      D(ft()), x = requestAnimationFrame(B);
    };
    return x = requestAnimationFrame(B), () => cancelAnimationFrame(x);
  }, [C, ft]);
  const P = K.useCallback(() => {
    St.current === "media" && bt();
  }, [bt]);
  return { time: _, playing: C, loading: X, error: T, toggle: Q, seek: Ot, ended: P, fail: Lt };
}
function Eu(s, g, r) {
  return Math.min(r, Math.max(g, s));
}
function Aa(s) {
  const g = Math.max(0, Number(s) || 0), r = Math.floor(g / 60), f = Math.floor(g % 60), O = Math.floor((g - Math.floor(g)) * 1e3);
  return `${String(r).padStart(2, "0")}:${String(f).padStart(2, "0")}.${String(O).padStart(3, "0")}`;
}
function D0(s) {
  const g = [0.1, 0.25, 0.5, 1, 2, 5, 10, 15, 30, 60, 120, 300, 600];
  return g.find((r) => r * s >= 70) ?? g[g.length - 1];
}
function Fy(s, g, r, f, O) {
  if (O <= 0 || f <= 0) return { start: 0, end: 0 };
  const _ = Math.max(0, s - r), D = Math.max(0, s + g - r), C = Eu(_ / f, 0, O), Y = Eu(D / f, C, O);
  return { start: C, end: Y };
}
function Gs(s, g) {
  return `${Eu(s / Math.max(g, 1e-9), 0, 1) * 100}%`;
}
function C0(s, g, r, f = 0.08) {
  const O = Number.isFinite(g) && Number(g) > s ? Number(g) : s + 0.5;
  return `${Math.max(f, (O - s) / Math.max(r, 1e-9) * 100)}%`;
}
function Wy({ min: s, max: g, colour: r = "#79c0ff" }) {
  const f = K.useRef(null);
  return K.useEffect(() => {
    const O = f.current;
    if (!O) return;
    const _ = Math.max(1, Math.min(s.length, g.length));
    O.width = _, O.height = 180;
    const D = O.getContext("2d");
    if (!D) return;
    D.clearRect(0, 0, _, O.height), D.strokeStyle = r, D.lineWidth = 1, D.beginPath();
    const C = O.height / 2, Y = O.height * 0.46;
    for (let X = 0; X < _; X += 1) {
      const j = X + 0.5;
      D.moveTo(j, C - (Number(g[X]) || 0) * Y), D.lineTo(j, C - (Number(s[X]) || 0) * Y);
    }
    D.stroke();
  }, [r, g, s]), /* @__PURE__ */ A.jsx("canvas", { ref: f, className: "rts-waveform", "aria-hidden": "true" });
}
function ky({ rows: s }) {
  const g = K.useRef(null);
  return K.useEffect(() => {
    const r = g.current, f = s.filter((C) => C.length > 0);
    if (!r || !f.length) return;
    const O = Math.max(...f.map((C) => C.length));
    r.width = Math.min(4096, f.length), r.height = Math.min(256, O);
    const _ = r.getContext("2d");
    if (!_) return;
    const D = _.createImageData(r.width, r.height);
    for (let C = 0; C < r.width; C += 1) {
      const Y = Math.min(f.length - 1, Math.floor(C * f.length / r.width)), X = f[Y], j = Math.max(1e-9, ...X.map((T) => Number(T) || 0));
      for (let T = 0; T < r.height; T += 1) {
        const U = Math.min(X.length - 1, Math.floor((r.height - 1 - T) * X.length / r.height)), ct = Eu((Number(X[U]) || 0) / j, 0, 1), St = (T * r.width + C) * 4;
        D.data[St] = Math.round(40 + 180 * ct), D.data[St + 1] = Math.round(35 + 110 * ct), D.data[St + 2] = Math.round(80 + 170 * ct), D.data[St + 3] = 255;
      }
    }
    _.putImageData(D, 0, 0);
  }, [s]), /* @__PURE__ */ A.jsx("canvas", { ref: g, className: "rts-matrix", "aria-hidden": "true" });
}
function Iy({ items: s, duration: g }) {
  const r = s.filter((_) => Number.isFinite(_.value) && _.value > 0);
  if (!r.length) return null;
  const f = Math.log2(Math.max(20, Math.min(...r.map((_) => _.value)))), O = Math.log2(Math.max(100, ...r.map((_) => _.value)));
  return r.map((_, D) => {
    const C = (Math.log2(_.value) - f) / Math.max(0.01, O - f);
    return /* @__PURE__ */ A.jsx(
      "span",
      {
        className: `rts-note ${_.className ?? ""}`,
        style: { left: Gs(_.start, g), width: C0(_.start, _.end ?? _.start + 0.12, g, 0.04), top: `${8 + (1 - C) * 72}px` },
        title: _.title ?? `${_.label ?? `${_.value.toFixed(1)} Hz`} · ${Aa(_.start)}`
      },
      `${_.start}-${D}`
    );
  });
}
function Py({ content: s, duration: g }) {
  switch (s.type) {
    case "waveform":
      return /* @__PURE__ */ A.jsx(Wy, { ...s });
    case "image":
      return /* @__PURE__ */ A.jsx("img", { className: `rts-image ${s.className ?? ""}`, src: s.src, alt: s.alt });
    case "markers":
      return /* @__PURE__ */ A.jsx(A.Fragment, { children: s.items.map((r, f) => /* @__PURE__ */ A.jsx(
        "span",
        {
          className: `rts-marker ${r.emphasis ? "rts-marker-emphasis" : ""} ${r.className ?? ""}`,
          style: { left: Gs(r.time, g) },
          title: r.label
        },
        `${r.time}-${f}`
      )) });
    case "blocks":
      return /* @__PURE__ */ A.jsx(A.Fragment, { children: s.items.map((r, f) => /* @__PURE__ */ A.jsx(
        "span",
        {
          className: `rts-block ${r.className ?? ""}`,
          style: { left: Gs(r.start, g), width: C0(r.start, r.end, g) },
          title: r.title ?? `${r.label ?? ""} · ${Aa(r.start)}${r.end ? ` — ${Aa(r.end)}` : ""}`,
          children: r.label
        },
        `${r.start}-${f}`
      )) });
    case "notes":
      return /* @__PURE__ */ A.jsx(Iy, { items: s.items, duration: g });
    case "curve": {
      const r = s.points.filter((C) => Number.isFinite(C.time) && Number.isFinite(C.value));
      if (!r.length) return null;
      const f = r.map((C) => C.value), O = Math.min(...f), _ = Math.max(...f), D = r.map((C) => {
        const Y = C.time / Math.max(g, 1e-9) * 2e3, X = 180 - (C.value - O) / Math.max(1e-9, _ - O) * 168 - 6;
        return `${Y.toFixed(2)},${X.toFixed(2)}`;
      }).join(" ");
      return /* @__PURE__ */ A.jsx("svg", { className: "rts-curve", viewBox: "0 0 2000 180", preserveAspectRatio: "none", "aria-hidden": "true", children: /* @__PURE__ */ A.jsx("polyline", { fill: "none", stroke: s.colour ?? "#7ee787", strokeWidth: "2", vectorEffect: "non-scaling-stroke", points: D }) });
    }
    case "matrix":
      return /* @__PURE__ */ A.jsx(ky, { ...s });
    case "summary":
      return /* @__PURE__ */ A.jsx("div", { className: "rts-summary", children: s.items.map((r, f) => /* @__PURE__ */ A.jsxs("span", { className: "rts-summary-item", children: [
        /* @__PURE__ */ A.jsxs("strong", { children: [
          r.label,
          ": "
        ] }),
        r.value
      ] }, `${r.label}-${f}`)) });
    case "artifact":
      return /* @__PURE__ */ A.jsxs("div", { className: "rts-artifact", children: [
        /* @__PURE__ */ A.jsx("span", { children: s.note }),
        s.href && /* @__PURE__ */ A.jsx("a", { href: s.href, target: "_blank", rel: "noopener noreferrer", children: s.linkLabel ?? "open" })
      ] });
    case "text":
      return /* @__PURE__ */ A.jsx("div", { className: "rts-text", children: s.text });
    case "custom":
      return /* @__PURE__ */ A.jsx(A.Fragment, { children: s.node });
  }
}
function tg(s, g) {
  if (s <= 0 || g <= 0) return [];
  const r = D0(g) / 5, f = [];
  for (let O = 0; O * r <= s + 1e-6; O += 1)
    f.push({
      time: O * r,
      major: O % 5 === 0
    });
  return f;
}
function lg(s, g) {
  const r = Math.round(s * 1e3), f = Math.floor(r / 1e3), O = `${String(Math.floor(f / 60)).padStart(2, "0")}:${String(f % 60).padStart(2, "0")}`;
  return D0(g) < 1 ? `${O}.${String(r % 1e3).padStart(3, "0")}` : O;
}
function eg({
  audioSrc: s,
  loops: g = [],
  onLoopSelect: r,
  onLoopEnabledChange: f,
  lanes: O,
  title: _ = "Audio timeline",
  subtitle: D,
  duration: C = 0,
  grid: Y = [],
  headerEnd: X,
  footer: j,
  className: T = "",
  labelWidth: U = 230,
  initialZoom: ct = 20,
  followPlayheadByDefault: St = !0,
  preload: mt = "metadata",
  crossOrigin: et,
  onDurationChange: pt,
  onTimeChange: ft,
  onWindowChange: bt,
  onPlaybackError: Lt
}) {
  const Rt = K.useRef(null), Ot = K.useRef(null), [Q, at] = K.useState(Math.max(0, C)), [P, x] = K.useState(null), [B, ut] = K.useState(!1), Xt = K.useMemo(() => Ky(g, Q), [g, Q]), Bt = Xt.find((z) => z.id === P) ?? null, dt = $y(
    Rt,
    s,
    B ? Bt : null,
    Lt,
    et === "use-credentials" ? "include" : "same-origin"
  ), H = dt.time, $ = dt.playing, J = Bt ? Ma(Bt) : null, Nt = (z) => {
    x(z), r?.(Xt.find((nt) => nt.id === z) ?? null);
  }, Tt = (z) => {
    ut(z), f?.(z);
  };
  K.useEffect(() => {
    P && !Xt.some((z) => z.id === P) && (x(null), ut(!1), r?.(null), f?.(!1));
  }, [P, Xt, r, f]), K.useEffect(() => {
    x(null), ut(!1), at(Math.max(0, C));
  }, [s]);
  const [ol, Zl] = K.useState(St), [Il, d] = K.useState(ct), [M, V] = K.useState(0), [Z, yt] = K.useState({ start: 0, end: 0 });
  K.useEffect(() => {
    C > 0 && at(C);
  }, [C]), K.useEffect(() => {
    const z = Ot.current;
    if (!z) return;
    const nt = () => V(z.clientWidth);
    nt();
    const cl = new ResizeObserver(nt);
    return cl.observe(z), () => cl.disconnect();
  }, []);
  const st = Q > 0 ? Math.max(0.4, Math.max(320, M - U - 16) / Q) : 0.4, W = Math.max(st, st * Math.pow(2, Il / 18)), L = Math.max(1, Q * W), k = K.useMemo(() => tg(Q, W), [Q, W]), El = K.useCallback(() => {
    const z = Ot.current;
    if (!z) return;
    const nt = Fy(
      z.scrollLeft + U,
      Math.max(0, z.clientWidth - U),
      U,
      W,
      Q
    );
    yt(nt), bt?.(nt);
  }, [Q, U, bt, W]);
  K.useEffect(() => {
    El();
  }, [El, M]), K.useEffect(() => {
    ft?.(H);
    const z = Ot.current;
    if (!z || !ol || !$) return;
    const nt = U + H * W, cl = z.scrollLeft + z.clientWidth, $t = Math.min(180, z.clientWidth * 0.2);
    nt > cl - $t ? z.scrollLeft = Math.max(0, nt - z.clientWidth + $t) : nt < z.scrollLeft + U && (z.scrollLeft = Math.max(0, nt - U - $t));
  }, [H, ol, $, U, ft, W]);
  const _u = (z) => {
    if (Q <= 0 || z.target.closest(".rts-label, a, button, input")) return;
    const nt = Ot.current, cl = Rt.current;
    if (!nt || !cl) return;
    const $t = nt.getBoundingClientRect(), Pl = z.clientX - $t.left + nt.scrollLeft - U;
    if (Pl < 0) return;
    const Me = Eu(Pl / W, 0, Q);
    dt.seek(Me);
  }, re = (z) => {
    const nt = Ot.current, cl = nt ? Math.max(0, (nt.scrollLeft + (nt.clientWidth - U) / 2) / W) : 0;
    d(z), requestAnimationFrame(() => {
      const $t = Ot.current;
      if (!$t) return;
      const Pl = Q > 0 ? Math.max(0.4, Math.max(320, $t.clientWidth - U - 16) / Q) : 0.4, Me = Math.max(Pl, Pl * Math.pow(2, z / 18));
      $t.scrollLeft = Math.max(0, cl * Me - ($t.clientWidth - U) / 2);
    });
  }, xl = () => {
    if (!J || !Ot.current) return;
    const z = Math.max(320, M - U - 16) / (J.duration * 1.1), nt = Eu(18 * Math.log2(z / st), 0, 100);
    d(nt);
    const cl = st * Math.pow(2, nt / 18);
    requestAnimationFrame(() => {
      Ot.current && (Ot.current.scrollLeft = Math.max(0, (J.start - J.duration * 0.05) * cl));
    });
  }, Jt = () => {
    const z = Number(Rt.current?.duration) || 0;
    Number.isFinite(z) && z > 0 && (at(z), pt?.(z));
  };
  return /* @__PURE__ */ A.jsxs(
    "section",
    {
      className: `rts-sequence ${T}`,
      style: { "--rts-label-width": `${U}px`, "--rts-track-width": `${L}px` },
      children: [
        /* @__PURE__ */ A.jsxs("header", { className: "rts-toolbar", children: [
          /* @__PURE__ */ A.jsxs("div", { className: "rts-ident", children: [
            /* @__PURE__ */ A.jsx("strong", { children: _ }),
            D && /* @__PURE__ */ A.jsx("span", { children: D })
          ] }),
          /* @__PURE__ */ A.jsxs("div", { className: "rts-transport", "aria-label": "Timeline playback controls", children: [
            /* @__PURE__ */ A.jsx("button", { type: "button", className: "rts-button rts-play", onClick: dt.toggle, "aria-label": $ || dt.loading ? "Pause" : "Play", children: dt.loading ? "…" : $ ? "❚❚" : "▶" }),
            /* @__PURE__ */ A.jsxs("output", { className: "rts-time", "aria-live": "off", children: [
              Aa(H),
              " / ",
              Aa(Q)
            ] }),
            /* @__PURE__ */ A.jsx("button", { type: "button", className: "rts-button", onClick: () => re(0), children: "Fit" }),
            /* @__PURE__ */ A.jsxs("label", { className: "rts-control", children: [
              /* @__PURE__ */ A.jsx("span", { children: "Zoom" }),
              /* @__PURE__ */ A.jsx("input", { "aria-label": "Timeline zoom", type: "range", min: "0", max: "100", value: Il, onChange: (z) => re(Number(z.target.value)) })
            ] }),
            /* @__PURE__ */ A.jsxs("label", { className: "rts-control", children: [
              /* @__PURE__ */ A.jsx("input", { type: "checkbox", checked: ol, onChange: (z) => Zl(z.target.checked) }),
              /* @__PURE__ */ A.jsx("span", { children: "Follow" })
            ] })
          ] }),
          /* @__PURE__ */ A.jsx("div", { className: "rts-header-end", children: X }),
          Xt.length > 0 && /* @__PURE__ */ A.jsxs("div", { className: "rts-loop-controls", "aria-label": "Loop controls", children: [
            /* @__PURE__ */ A.jsxs("label", { children: [
              "Loop ",
              /* @__PURE__ */ A.jsxs("select", { "aria-label": "Select loop", value: P ?? "", onChange: (z) => Nt(z.target.value), children: [
                /* @__PURE__ */ A.jsx("option", { value: "", children: "Choose a loop…" }),
                Xt.map((z) => /* @__PURE__ */ A.jsx("option", { value: z.id, children: z.label || z.id }, z.id))
              ] })
            ] }),
            /* @__PURE__ */ A.jsxs("label", { children: [
              /* @__PURE__ */ A.jsx("input", { type: "checkbox", "aria-label": "Enable loop", disabled: !Bt, checked: B && !!Bt, onChange: (z) => Tt(z.target.checked) }),
              "Enable loop"
            ] }),
            /* @__PURE__ */ A.jsx("button", { type: "button", className: "rts-button", disabled: !Bt, onClick: xl, children: "Zoom to loop" }),
            Bt && /* @__PURE__ */ A.jsxs("output", { children: [
              Bt.startSample.toLocaleString(),
              " → ",
              Bt.endSample.toLocaleString(),
              " samples (end exclusive) · ",
              Bt.sampleRate.toLocaleString(),
              " Hz"
            ] }),
            Bt?.downloadUrl && /* @__PURE__ */ A.jsx("a", { href: Bt.downloadUrl, download: !0, children: "Download loop WAV" }),
            /* @__PURE__ */ A.jsx("span", { className: "rts-loop-status", role: "status", children: dt.loading ? "Loading loop…" : B && Bt ? "Loop enabled · Play repeats selection" : "Full-song playback" })
          ] }),
          dt.error && /* @__PURE__ */ A.jsx("div", { role: "alert", className: "rts-loop-error", children: dt.error })
        ] }),
        /* @__PURE__ */ A.jsx(
          "audio",
          {
            ref: Rt,
            src: s,
            preload: mt,
            crossOrigin: et,
            onLoadedMetadata: Jt,
            onEnded: dt.ended,
            onError: () => dt.fail(new Error(Rt.current?.error?.message || "Audio playback failed"))
          }
        ),
        /* @__PURE__ */ A.jsx("div", { className: "rts-workspace", children: /* @__PURE__ */ A.jsx("div", { ref: Ot, className: "rts-scroller", onScroll: El, onClick: _u, children: /* @__PURE__ */ A.jsxs("div", { className: "rts-inner", children: [
          /* @__PURE__ */ A.jsxs("div", { className: "rts-ruler-row", children: [
            /* @__PURE__ */ A.jsx("div", { className: "rts-label rts-ruler-label", children: "TIME" }),
            /* @__PURE__ */ A.jsx("div", { className: "rts-ruler-track", children: k.map((z) => /* @__PURE__ */ A.jsx("span", { className: `rts-tick ${z.major ? "rts-tick-major" : ""}`, style: { left: `${z.time * W}px` }, children: z.major && /* @__PURE__ */ A.jsx("span", { className: "rts-tick-label", children: lg(z.time, W) }) }, z.time)) })
          ] }),
          Xt.length > 0 && /* @__PURE__ */ A.jsxs("div", { className: "rts-lane rts-lane-loops", children: [
            /* @__PURE__ */ A.jsxs("div", { className: "rts-label", children: [
              /* @__PURE__ */ A.jsx("div", { className: "rts-title", children: "LOOPS" }),
              /* @__PURE__ */ A.jsx("div", { className: "rts-meta", children: "Select a region, enable, then Play" })
            ] }),
            /* @__PURE__ */ A.jsx("div", { className: "rts-track", children: Xt.map((z) => {
              const nt = Ma(z);
              return /* @__PURE__ */ A.jsx(
                "button",
                {
                  type: "button",
                  className: "rts-loop-region",
                  "aria-pressed": P === z.id,
                  "aria-label": `Select ${z.label || z.id}`,
                  onClick: () => Nt(z.id),
                  title: `${z.label || z.id}: [${z.startSample}, ${z.endSample}) at ${z.sampleRate} Hz`,
                  style: { left: `${nt.start * W}px`, width: `${nt.duration * W}px` },
                  children: z.label || z.id
                },
                z.id
              );
            }) })
          ] }),
          J && /* @__PURE__ */ A.jsx(
            "div",
            {
              className: `rts-loop-shade ${B ? "" : "is-disabled"}`,
              "aria-hidden": "true",
              style: { left: `${U + J.start * W}px`, width: `${J.duration * W}px` }
            }
          ),
          /* @__PURE__ */ A.jsx("div", { className: "rts-lanes", children: O.map((z) => /* @__PURE__ */ A.jsxs("div", { className: `rts-lane rts-lane-${z.kind ?? "default"} ${z.className ?? ""}`, style: z.height ? { "--rts-lane-height": `${z.height}px` } : void 0, children: [
            /* @__PURE__ */ A.jsxs("div", { className: "rts-label", children: [
              /* @__PURE__ */ A.jsx("div", { className: "rts-title", children: z.title }),
              z.meta && /* @__PURE__ */ A.jsx("div", { className: "rts-meta", children: z.meta })
            ] }),
            /* @__PURE__ */ A.jsx("div", { className: "rts-track", children: /* @__PURE__ */ A.jsx(Py, { content: z.content, duration: Q }) })
          ] }, z.id)) }),
          Y.length > 0 && /* @__PURE__ */ A.jsx("div", { className: "rts-grid", "aria-hidden": "true", children: Y.map((z, nt) => /* @__PURE__ */ A.jsx("span", { className: `rts-grid-line ${z.emphasis ? "rts-grid-line-emphasis" : ""} ${z.className ?? ""}`, style: { left: `${z.time * W}px` } }, `${z.time}-${nt}`)) }),
          /* @__PURE__ */ A.jsx("div", { className: "rts-playhead", style: { left: `${U + H * W}px` }, "aria-hidden": "true" })
        ] }) }) }),
        /* @__PURE__ */ A.jsxs("footer", { className: "rts-footer", children: [
          /* @__PURE__ */ A.jsx("div", { children: j }),
          /* @__PURE__ */ A.jsxs("output", { className: "rts-window", children: [
            Aa(Z.start),
            " — ",
            Aa(Z.end)
          ] })
        ] })
      ]
    }
  );
}
function ag(s, g) {
  if (!s || s.schema !== "stemlab.loops.v1") return [];
  const r = s.sample_rate;
  return !Number.isSafeInteger(r) || r <= 0 ? [] : (s.loops || []).flatMap((f) => {
    if (!/^(verse|chorus)-\d+-\d+$/.test(f.id) || !Number.isSafeInteger(f.start_sample) || !Number.isSafeInteger(f.end_sample) || f.start_sample < 0 || f.end_sample <= f.start_sample || f.end_sample > s.source_frames) return [];
    const O = encodeURIComponent(`${s.source_sha256}:${f.start_sample}:${f.end_sample}`);
    return [{
      id: f.id,
      label: `${f.section_label} · ${f.bars} bar${f.bars === 1 ? "" : "s"}`,
      startSample: f.start_sample,
      endSample: f.end_sample,
      sampleRate: r,
      // Exact native-rate PCM excerpt, computed read-only whether or not --export-loops was used.
      audioSrc: `/api/${g}/loops/${encodeURIComponent(f.id)}/audio?v=${O}`,
      downloadUrl: f.file && /^audio\/[a-zA-Z0-9._-]+\.wav$/.test(f.file) ? `/${g}/deep/loops/${f.file.split("/").map(encodeURIComponent).join("/")}` : void 0
    }];
  });
}
function ug(s) {
  const [g, r] = K.useState({ report: null, error: "" });
  K.useEffect(() => {
    let O = !0, _, D = "";
    const C = new AbortController();
    r({ report: null, error: "" });
    const Y = async () => {
      try {
        const X = await fetch(`/${s}/deep/loops/loops.json`, {
          cache: "no-store",
          signal: C.signal
        });
        if (!O) return;
        if (X.status === 404)
          D = "", r({ report: null, error: "" });
        else {
          if (!X.ok) throw new Error(`Loop report: HTTP ${X.status}`);
          const j = await X.json();
          if (j.schema !== "stemlab.loops.v1") throw new Error("Unsupported loop report schema");
          const T = JSON.stringify(j);
          O && T !== D && (r({ report: j, error: "" }), D = T);
        }
      } catch (X) {
        O && X.name !== "AbortError" && (D = "", r({ report: null, error: X.message }));
      } finally {
        O && (_ = window.setTimeout(Y, 2500));
      }
    };
    return Y(), () => {
      O = !1, C.abort(), window.clearTimeout(_);
    };
  }, [s]);
  const f = K.useMemo(() => ag(g.report, s), [g.report, s]);
  return { ...g, loops: f };
}
function ng({ state: s, hash: g }) {
  const r = s.report;
  return s.error ? /* @__PURE__ */ A.jsx("p", { role: "alert", className: "stemlab-loop-summary", children: s.error }) : r ? /* @__PURE__ */ A.jsxs("details", { className: "stemlab-loop-summary", open: r.unresolved_sections.length > 0, children: [
    /* @__PURE__ */ A.jsxs("summary", { children: [
      r.loop_count,
      " loop(s) · ",
      r.unresolved_sections.length,
      " unresolved section(s) · ",
      /* @__PURE__ */ A.jsx("a", { href: `/${g}/deep/loops/loops.json`, target: "_blank", rel: "noopener", children: "Sample report" })
    ] }),
    /* @__PURE__ */ A.jsx("p", { children: "Choose a loop region or use the Loop selector, tick Enable loop, then press Play. Previewing writes no files." }),
    r.unresolved_sections.map((f) => /* @__PURE__ */ A.jsxs("p", { children: [
      /* @__PURE__ */ A.jsxs("strong", { children: [
        f.label,
        ":"
      ] }),
      " ",
      f.reason
    ] }, f.index))
  ] }) : /* @__PURE__ */ A.jsxs("p", { className: "stemlab-loop-summary", children: [
    "No loop report yet. New analyses discover loops automatically; for existing results run ",
    /* @__PURE__ */ A.jsx("code", { children: "stemlab loops RESULTS_DIR" }),
    "."
  ] });
}
const sl = (s) => document.querySelector(s), ig = sl("#uploadView"), Vs = sl("#timelineView"), Da = sl("#dropZone"), bn = sl("#fileInput"), U0 = sl("#chooseButton"), R0 = sl("#uploadProgressWrap"), $i = sl("#uploadProgress"), Fi = sl("#uploadLabel"), Tu = sl("#connectionBadge"), x0 = sl("#canonicalBpm"), H0 = sl("#canonicalLyrics"), j0 = sl("#canonicalTiming"), Ls = sl("#knownInfoStatus"), cg = sl("#loadArcadiansReference"), fg = sl("#loadArcadiansHero"), sg = Array.from(Vs.children), ws = document.createElement("div");
ws.id = "timelineRoot";
Vs.replaceChildren(ws);
for (const s of sg) s.remove();
const og = wy.createRoot(ws), rg = /* @__PURE__ */ new Set(["wav", "flac", "mp3", "ogg", "opus", "m4a", "aif", "aiff"]);
let Xs = {};
function mg(s) {
  const g = String(s).split("/").pop() || "", r = g.lastIndexOf(".");
  return r >= 0 ? g.slice(r + 1).toLowerCase() : "";
}
function Ae(s) {
  return String(s).replace(/^stems\//, "").replace(/^spectrograms\//, "").replace(/^vamp\/data\//, "Vamp · ").replace(/^beats\//, "Beats · ").replace(/^speech\//, "Speech · ").replace(/^deep\//, "Deep · ").replace(/[_-]+/g, " ");
}
function Ks(s, g) {
  return `/${s}/${g.split("/").map(encodeURIComponent).join("/")}`;
}
function Qs(s, g, r = "Generated analysis artifact") {
  return { type: "artifact", note: r, href: g === "__source__" ? `/api/${s}/source` : Ks(s, g) };
}
async function Wl(s, g) {
  const r = await fetch(Ks(s, g), { cache: "no-store" });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}
function kl(s, g = 2, r = "") {
  const f = Number(s);
  return Number.isFinite(f) ? `${f.toFixed(g)}${r}` : "—";
}
function Oa(s, g, r, f, O = "feature") {
  const _ = f.filter(([, D]) => D != null && D !== "");
  return {
    id: s,
    title: g,
    meta: r,
    kind: O,
    content: {
      type: "summary",
      items: (_.length ? _ : [["status", "analysis available"]]).map(([D, C]) => ({ label: D, value: C }))
    }
  };
}
function Wi(s) {
  return (s || []).flatMap((g) => {
    const r = Number(g.start);
    if (!Number.isFinite(r)) return [];
    const f = Number(g.end);
    return [{
      start: r,
      end: Number.isFinite(f) && f > r ? f : r + 0.5,
      label: g.label || g.text || g.values?.[0] || ""
    }];
  });
}
function dg(s) {
  const g = Array.isArray(s.events) ? s.events : [];
  switch (String(s.kind || "")) {
    case "curve":
      return { type: "curve", points: g.flatMap((r) => {
        const f = Number(r.start), O = Number(r.values?.[0]);
        return Number.isFinite(f) && Number.isFinite(O) && O > 0 ? [{ time: f, value: O }] : [];
      }) };
    case "matrix":
      return { type: "matrix", rows: g.map((r) => r.values || []).filter((r) => r.length) };
    case "notes":
      return { type: "notes", items: g.flatMap((r) => {
        const f = Number(r.values?.[0]), O = Number(r.start);
        if (!Number.isFinite(f) || f <= 0 || !Number.isFinite(O)) return [];
        const _ = Number(r.end);
        return [{ start: O, end: Number.isFinite(_) && _ > O ? _ : O + 0.12, value: f, label: r.label }];
      }) };
    case "segments":
      return { type: "blocks", items: Wi(g) };
    case "events":
      return { type: "markers", items: g.flatMap((r) => Number.isFinite(Number(r.start)) ? [{ time: Number(r.start) }] : []) };
    default:
      return { type: "artifact", note: g[0]?.label || g[0]?.values?.join(", ") || s.title || "analysis" };
  }
}
async function B0(s, g, r, f, O) {
  const _ = new URLSearchParams({ path: O, points: "12000" }), D = await fetch(`/api/${s}/waveform?${_}`);
  if (!D.ok) return { id: g, title: r, meta: f, kind: "artifact", content: Qs(s, O, `waveform unavailable (${D.status})`) };
  const C = await D.json();
  return { id: g, title: r, meta: f, kind: "waveform", content: { type: "waveform", min: C.min || [], max: C.max || [] }, duration: Number(C.duration_seconds) || 0 };
}
async function vg(s, g) {
  const r = g.path, f = `file:${r}`, O = mg(r);
  if (r === "canonical.json" || r.startsWith("deep/loops/")) return null;
  if (rg.has(O)) return B0(s, f, Ae(r), "audio waveform", r);
  if (r.startsWith("spectrograms/") && O === "npz") {
    const _ = new URLSearchParams({ path: r, max_width: "8192", max_height: "768" });
    return { id: f, title: Ae(r), meta: "spectrogram data · exact song timeline", kind: "spectrogram", content: { type: "image", src: `/api/${s}/spectrogram?${_}`, alt: `${Ae(r)} spectrogram` } };
  }
  if (r.startsWith("spectrograms/") && O === "png")
    return { id: f, title: Ae(r), meta: "rendered spectrogram PNG", kind: "image", content: { type: "image", src: Ks(s, r), alt: `${Ae(r)} rendered spectrogram` } };
  try {
    if (r.startsWith("beats/") && O === "json") {
      const _ = await Wl(s, r), D = new Set((_.downbeats || []).map((C) => Number(C).toFixed(3)));
      return { id: f, title: Ae(r), meta: "beat / downbeat events", kind: "events", content: { type: "markers", items: (_.beats || []).flatMap((C) => {
        const Y = Number(C);
        return Number.isFinite(Y) ? [{ time: Y, emphasis: D.has(Y.toFixed(3)), label: D.has(Y.toFixed(3)) ? "Downbeat" : "Beat" }] : [];
      }) } };
    }
    if (r.startsWith("vamp/data/") && O === "json") {
      const _ = await Wl(s, r);
      return { id: f, title: Ae(r), meta: "Vamp feature analysis", kind: "feature", content: dg(_) };
    }
    if (r === "speech/whisper.json") {
      const _ = await Wl(s, r);
      return { id: f, title: "Speech · Whisper words", meta: "word-aligned transcript", kind: "words", content: { type: "blocks", items: (_.words || []).flatMap((D) => {
        const C = Number(D.start), Y = Number(D.end);
        return Number.isFinite(C) ? [{ start: C, end: Number.isFinite(Y) ? Math.max(C + 0.03, Y) : C + 0.03, label: String(D.word || "").trim() }] : [];
      }) } };
    }
    if (r === "deep/structure/structure.json" || r === "deep/song_map/song_map.json") {
      const _ = await Wl(s, r), D = r.includes("song_map");
      return { id: f, title: D ? "Deep · song map" : "Deep · functional structure", meta: D ? "section-level sonic / rhythm / harmony / lyric fusion" : "All-In-One · functional song sections", kind: "deep-structure", content: { type: "blocks", items: Wi(D ? _.sections : _.segments) } };
    }
    if (r === "deep/harmony/harmony.json") {
      const _ = await Wl(s, r), D = _.chords?.collapsed_progression || [];
      return D.length ? { id: f, title: "Deep · harmony", meta: "collapsed chord progression + key evidence", kind: "deep-harmony", content: { type: "blocks", items: Wi(D) } } : Oa(f, "Deep · harmony", "collapsed chord progression + key evidence", [["key", _.vamp_key || _.independent_key_candidates_from_nnls_chroma?.[0]?.key || "—"], ["tuning", _.tuning_hz ? `${Number(_.tuning_hz).toFixed(1)} Hz` : "—"]], "deep-harmony");
    }
    if (r === "deep/lyrics/lyrics.json") {
      const _ = await Wl(s, r), D = (_.lines || []).filter((C) => Number.isFinite(Number(C.start)) && Number.isFinite(Number(C.end)));
      return D.length ? { id: f, title: "Deep · rhyme & prosody", meta: "phonetic rhyme, repetition and delivery", kind: "deep-lyrics", content: { type: "blocks", items: Wi(D) } } : Oa(f, "Deep · rhyme & prosody", "phonetic rhyme, repetition and delivery", [["rhyme scheme", _.rhyme?.scheme || "—"], ["lines", _.line_count ?? "—"], ["words", _.word_count ?? "—"]], "deep-lyrics");
    }
    if (r === "deep/sonic/sonic.json") {
      const _ = await Wl(s, r);
      return Oa(f, "Deep · sonic profile", "loudness · dynamics · timbre · stereo", [["LUFS", kl(_.loudness?.integrated_lufs_bs1770, 1)], ["crest", kl(_.loudness?.crest_factor_db, 1, " dB")], ["RMS range", kl(_.loudness?.short_term_rms_range_db_p95_p10, 1, " dB")], ["centroid", kl(_.timbre?.spectral_centroid_hz_mean, 0, " Hz")], ["stereo corr", kl(_.stereo?.left_right_correlation, 2)]]);
    }
    if (r === "deep/rhythm/rhythm.json") {
      const _ = await Wl(s, r);
      return Oa(f, "Deep · groove", "meter · stability · swing · syncopation evidence", [["tempo", kl(_.tempo?.median_bpm, 2, " BPM")], ["meter", _.meter?.estimated_beats_per_bar ? `${_.meter.estimated_beats_per_bar}/4-ish` : "—"], ["swing", kl(_.groove?.swing_ratio_long_to_short, 2, ":1")], ["offbeat energy", kl(_.groove?.offbeat_onset_energy_ratio, 3)], ["onsets/s", kl(_.groove?.onset_density_per_second, 2)]]);
    }
    if (r === "deep/semantic_text/semantic_text.json") {
      const _ = await Wl(s, r);
      return Oa(f, "Deep · lyric semantics", "sentence embedding theme similarities · not probabilities", (_.theme_similarity || []).slice(0, 7).map((D) => [D.theme, kl(D.similarity, 3)]));
    }
    if (r === "deep/semantic_audio/semantic_audio.json") {
      const _ = await Wl(s, r), D = Object.entries(_.prompt_sets || {}).flatMap(([C, Y]) => (Y || []).slice(0, 2).map((X) => [`${C}: ${X.prompt}`, kl(X.similarity, 3)]));
      return Oa(f, "Deep · audio semantics", "MuQ-MuLan zero-shot similarities · CC-BY-NC weights", D);
    }
    if (r === "deep/summary.json") {
      const _ = await Wl(s, r), D = Object.entries(_.analyses || {}).map(([C, Y]) => [C, Y.available ? "ready" : "unavailable"]);
      return (_.errors || []).length && D.push(["errors", _.errors.length]), Oa(f, "Deep · analysis summary", "cross-domain action inventory", D);
    }
  } catch (_) {
    return { id: f, title: Ae(r), meta: "analysis artifact", kind: "artifact", content: Qs(s, r, _.message) };
  }
  return { id: f, title: Ae(r), meta: `${O || "file"} · ${Number(g.bytes || 0).toLocaleString()} bytes`, kind: "artifact", content: Qs(s, r) };
}
function hg(s, g, r, f) {
  const O = [], _ = Number(s?.bpm);
  if (Number.isFinite(_) && _ > 0) {
    const Y = [];
    if (Number.isFinite(g) && f > 0) {
      const X = 60 / _;
      for (let j = g, T = 0; j <= f + 1e-7; j += X, T += 1) Y.push({ time: j, emphasis: T === 0, label: `Canonical beat ${T + 1}` });
    }
    O.push({ id: "canonical:bpm", title: "Canonical BPM", meta: Number.isFinite(g) ? `${_} BPM · anchor ${g.toFixed(3)}s · ${r || "detected beat"}` : `${_} BPM · waiting for first detected beat`, kind: "canonical-bpm", height: 104, content: Y.length ? { type: "markers", items: Y } : { type: "artifact", note: `${_} BPM — grid will begin at the first detected beat` } });
  }
  s?.lyrics && O.push({ id: "canonical:lyrics", title: "Canonical lyrics", meta: "known reference text", kind: "canonical-lyrics", height: 104, content: { type: "text", text: s.lyrics } });
  const D = Array.isArray(s?.lyric_timing) ? s.lyric_timing : [];
  D.length && O.push({ id: "canonical:timing", title: "Canonical lyric timing", meta: `${D.length} timed lyric event${D.length === 1 ? "" : "s"}`, kind: "canonical-timing", height: 104, content: { type: "blocks", items: D.flatMap((Y) => {
    const X = Number(Y.start), j = Number(Y.end);
    return Number.isFinite(X) && X >= 0 ? [{ start: X, end: Number.isFinite(j) && j > X ? j : X + 0.75, label: String(Y.text || ""), className: "stemlab-canonical-lyric" }] : [];
  }) } });
  const C = O.find((Y) => Y.id === "canonical:bpm")?.content?.items || [];
  return { lanes: O, grid: C };
}
function yg({ lines: s }) {
  return /* @__PURE__ */ A.jsxs("details", { open: !0, className: "stemlab-log", children: [
    /* @__PURE__ */ A.jsx("summary", { children: "Analysis log" }),
    /* @__PURE__ */ A.jsx("div", { className: "log", children: s.map((g, r) => /* @__PURE__ */ A.jsxs("div", { className: g.stream === "stderr" ? "stderr" : "stdout", children: [
      "[",
      g.stream,
      "] ",
      g.text
    ] }, r)) })
  ] });
}
function gg({ hash: s, filename: g }) {
  const r = ug(s), [f, O] = K.useState([]), [_, D] = K.useState(0), [C, Y] = K.useState({ state: "submitted" }), [X, j] = K.useState({ bpm: null, lyrics: null, lyric_timing: [] }), [T, U] = K.useState(null), [ct, St] = K.useState(null), [mt, et] = K.useState([]), pt = K.useRef(/* @__PURE__ */ new Set()), ft = K.useCallback((P, x) => {
    x && et((B) => [...B.slice(-799), { stream: P === "stderr" ? "stderr" : "stdout", text: x }]);
  }, []), bt = K.useCallback(async (P) => {
    if (!P?.path || pt.current.has(P.path)) return;
    pt.current.add(P.path);
    const x = await vg(s, P);
    x && (x.duration && D((B) => B || x.duration), O((B) => B.some((ut) => ut.id === x.id) ? B : [...B, x]));
  }, [s]), Lt = K.useCallback(async () => {
    const P = await fetch(`/api/${s}/timeline`, { cache: "no-store" });
    if (!P.ok) return;
    const x = await P.json();
    Y(x.status || { state: "submitted" }), x.duration_seconds && D(Number(x.duration_seconds)), x.canonical && j(x.canonical);
    const B = x.first_detected_beat == null ? NaN : Number(x.first_detected_beat);
    Number.isFinite(B) && B >= 0 && (U(B), St(x.first_detected_beat_source || "detected beat"));
    for (const ut of x.files || []) bt(ut);
  }, [bt, s]);
  K.useEffect(() => {
    pt.current = /* @__PURE__ */ new Set(), O([]), B0(s, "__source__", "MASTER · uploaded source", g, "__source__").then((B) => {
      B.duration && D(B.duration), O((ut) => [B, ...ut.filter((Xt) => Xt.id !== B.id)]);
    }).catch((B) => ft("stderr", B.message)), Lt();
    const P = window.setInterval(() => {
      Lt();
    }, 2500);
    let x = null;
    return typeof window.io == "function" ? (x = window.io({ path: "/socket.io" }), x.on("connect", () => {
      Tu.textContent = "live", Tu.classList.remove("muted"), x.emit("subscribe", { hash: s });
    }), x.on("disconnect", () => {
      Tu.textContent = "reconnecting", Tu.classList.add("muted");
    }), x.on("process_output", (B) => ft(B.stream || "stdout", B.line || "")), x.on("process_history", (B) => {
      for (const ut of B.stdout || []) ft("stdout", ut);
      for (const ut of B.stderr || []) ft("stderr", ut);
    }), x.on("new_file", (B) => {
      bt(B);
    }), x.on("job_status", (B) => {
      Y(B.status || {}), Lt();
    }), x.on("canonical_metadata", (B) => {
      B?.canonical && j(B.canonical);
    }), x.on("job_timeout", (B) => ft("stderr", `Job timeout: ${B.message || "analysis exceeded timeout"}`))) : (Tu.textContent = "polling", Tu.classList.add("muted"), ft("stderr", "Socket.IO browser client unavailable; timeline inventory polling remains active.")), () => {
      window.clearInterval(P), x?.disconnect();
    };
  }, [bt, ft, g, s, Lt]);
  const Rt = K.useMemo(() => hg(X, T, ct, _), [T, ct, X, _]), Ot = (P) => P.id === "__source__" ? 0 : P.kind === "deep-structure" ? 10 : P.kind === "events" ? 20 : P.kind === "spectrogram" ? 30 : P.kind === "waveform" ? 40 : 90, Q = [...Rt.lanes, ...[...f].sort((P, x) => Ot(P) - Ot(x) || P.id.localeCompare(x.id))], at = C.state || "submitted";
  return /* @__PURE__ */ A.jsx(
    eg,
    {
      className: "stemlab-timeline",
      audioSrc: `/api/${s}/source`,
      duration: _,
      title: X.title || g,
      subtitle: s,
      loops: r.loops,
      lanes: Q,
      grid: Rt.grid,
      onDurationChange: D,
      onPlaybackError: (P) => ft("stderr", P instanceof Error ? P.message : String(P)),
      headerEnd: /* @__PURE__ */ A.jsxs(A.Fragment, { children: [
        /* @__PURE__ */ A.jsx("span", { className: `badge ${at}`, children: at }),
        /* @__PURE__ */ A.jsxs("span", { className: "small", children: [
          Q.length,
          " lane",
          Q.length === 1 ? "" : "s"
        ] })
      ] }),
      footer: /* @__PURE__ */ A.jsxs(A.Fragment, { children: [
        /* @__PURE__ */ A.jsx(ng, { state: r, hash: s }),
        /* @__PURE__ */ A.jsx(yg, { lines: mt }),
        /* @__PURE__ */ A.jsx("span", { className: "dock-links", children: /* @__PURE__ */ A.jsx("a", { href: "https://kieransimkin.co.uk/my-songs/", target: "_blank", rel: "noopener", children: "Kieran Simkin · My Songs ↗" }) })
      ] })
    }
  );
}
function Sg() {
  const s = x0?.value?.trim() || "", g = H0?.value || "", r = j0?.value || "";
  return { ...Xs, bpm: s ? Number(s) : null, lyrics: g.trim() || null, lyric_timing: r.trim() || [] };
}
function bg(s) {
  return Number.isFinite(Number(s.bpm)) || !!s.lyrics || !!(typeof s.lyric_timing == "string" && s.lyric_timing.trim()) || !!(Array.isArray(s.lyric_timing) && s.lyric_timing.length);
}
async function Tg(s) {
  const g = Sg();
  if (!bg(g)) return;
  const r = await fetch(`/api/${s}/canonical`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(g) }), f = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(f.detail || `Could not save canonical metadata (${r.status})`);
  Ls.textContent = "Known information saved with this song hash.";
}
function Eg(s) {
  return new Promise((g, r) => {
    const f = new XMLHttpRequest();
    f.open("PUT", `/upload/${encodeURIComponent(s.name)}`), f.setRequestHeader("Content-Type", s.type || "application/octet-stream"), f.upload.onprogress = (O) => {
      R0.classList.remove("hidden");
      const _ = O.lengthComputable ? O.loaded / O.total : 0;
      $i.style.width = `${Math.round(_ * 100)}%`, Fi.textContent = O.lengthComputable ? `${Math.round(_ * 100)}% · ${(O.loaded / 1048576).toFixed(1)} / ${(O.total / 1048576).toFixed(1)} MiB` : `${(O.loaded / 1048576).toFixed(1)} MiB uploaded`;
    }, f.onerror = () => r(new Error("Upload failed")), f.onload = () => {
      let O = {};
      try {
        O = JSON.parse(f.responseText);
      } catch {
      }
      f.status < 200 || f.status >= 300 ? r(new Error(O.detail || `Upload failed (${f.status})`)) : g(O);
    }, f.send(s);
  });
}
async function q0(s, g) {
  ig.classList.add("hidden"), Vs.classList.remove("hidden"), og.render(/* @__PURE__ */ A.jsx(gg, { hash: s, filename: g || "uploaded audio" }, s));
}
async function Y0(s) {
  if (s) {
    $i.style.width = "0%", Fi.textContent = `Uploading ${s.name}`, R0.classList.remove("hidden");
    try {
      const g = await Eg(s);
      $i.style.width = "100%", Fi.textContent = "Upload complete · attaching to analysis", await Tg(g.hash), await q0(g.hash, g.filename || s.name);
    } catch (g) {
      Fi.textContent = g.message, $i.style.width = "0%";
    }
  }
}
async function G0(s) {
  s?.preventDefault(), s?.stopPropagation();
  try {
    const g = await fetch("/assets/arcadians-reference.json", { cache: "no-store" });
    if (!g.ok) throw new Error(`Could not load Arcadians reference (${g.status})`);
    const r = await g.json();
    Xs = {};
    for (const f of ["title", "artist", "release_date", "isrc", "upc", "website", "my_songs_url", "epk_url", "cover_art_url", "source_url", "sections"])
      r[f] !== void 0 && r[f] !== null && (Xs[f] = r[f]);
    x0.value = r.bpm ?? "", H0.value = r.lyrics ?? "", j0.value = Array.isArray(r.lyric_timing) && r.lyric_timing.length ? JSON.stringify(r.lyric_timing, null, 2) : "", sl(".known-info").open = !0, Ls.textContent = r.lyric_timing?.length ? `Loaded ${r.title || "Arcadians"}: canonical release metadata, sections, ${r.bpm} BPM, lyrics and timing.` : `Loaded ${r.title || "Arcadians"} canonical reference metadata.`;
  } catch (g) {
    Ls.textContent = g.message;
  }
}
U0.addEventListener("click", (s) => {
  s.stopPropagation(), bn.click();
});
bn.addEventListener("change", () => {
  Y0(bn.files?.[0]);
});
Da.addEventListener("click", (s) => {
  s.target !== U0 && !s.target.closest(".known-info") && bn.click();
});
Da.addEventListener("keydown", (s) => {
  (s.key === "Enter" || s.key === " ") && bn.click();
});
for (const s of ["dragenter", "dragover"]) Da.addEventListener(s, (g) => {
  g.preventDefault(), Da.classList.add("dragging");
});
for (const s of ["dragleave", "drop"]) Da.addEventListener(s, (g) => {
  g.preventDefault(), Da.classList.remove("dragging");
});
Da.addEventListener("drop", (s) => {
  Y0(s.dataTransfer?.files?.[0]);
});
cg?.addEventListener("click", G0);
fg?.addEventListener("click", G0);
const Ys = new URLSearchParams(location.search).get("hash");
Ys && /^[0-9a-f]{64}$/i.test(Ys) && q0(Ys.toLowerCase(), "Existing analysis");
export {
  Aa as formatTimelineTime
};
