var Vs = { exports: {} }, Du = {};
var j0;
function ig() {
  if (j0) return Du;
  j0 = 1;
  var c = /* @__PURE__ */ Symbol.for("react.transitional.element"), r = /* @__PURE__ */ Symbol.for("react.fragment");
  function f(o, E, h) {
    var z = null;
    if (h !== void 0 && (z = "" + h), E.key !== void 0 && (z = "" + E.key), "key" in E) {
      h = {};
      for (var M in E)
        M !== "key" && (h[M] = E[M]);
    } else h = E;
    return E = h.ref, {
      $$typeof: c,
      type: o,
      key: z,
      ref: E !== void 0 ? E : null,
      props: h
    };
  }
  return Du.Fragment = r, Du.jsx = f, Du.jsxs = f, Du;
}
var R0;
function cg() {
  return R0 || (R0 = 1, Vs.exports = ig()), Vs.exports;
}
var g = cg(), Zs = { exports: {} }, at = {};
var U0;
function fg() {
  if (U0) return at;
  U0 = 1;
  var c = /* @__PURE__ */ Symbol.for("react.transitional.element"), r = /* @__PURE__ */ Symbol.for("react.portal"), f = /* @__PURE__ */ Symbol.for("react.fragment"), o = /* @__PURE__ */ Symbol.for("react.strict_mode"), E = /* @__PURE__ */ Symbol.for("react.profiler"), h = /* @__PURE__ */ Symbol.for("react.consumer"), z = /* @__PURE__ */ Symbol.for("react.context"), M = /* @__PURE__ */ Symbol.for("react.forward_ref"), H = /* @__PURE__ */ Symbol.for("react.suspense"), q = /* @__PURE__ */ Symbol.for("react.memo"), D = /* @__PURE__ */ Symbol.for("react.lazy"), m = /* @__PURE__ */ Symbol.for("react.activity"), j = /* @__PURE__ */ Symbol.for("react.view_transition"), w = Symbol.iterator;
  function F(y) {
    return y === null || typeof y != "object" ? null : (y = w && y[w] || y["@@iterator"], typeof y == "function" ? y : null);
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
  }, ut = Object.assign, zt = {};
  function Tt(y, R, J) {
    this.props = y, this.context = R, this.refs = zt, this.updater = J || ct;
  }
  Tt.prototype.isReactComponent = {}, Tt.prototype.setState = function(y, R) {
    if (typeof y != "object" && typeof y != "function" && y != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, y, R, "setState");
  }, Tt.prototype.forceUpdate = function(y) {
    this.updater.enqueueForceUpdate(this, y, "forceUpdate");
  };
  function Mt() {
  }
  Mt.prototype = Tt.prototype;
  function Lt(y, R, J) {
    this.props = y, this.context = R, this.refs = zt, this.updater = J || ct;
  }
  var Ot = Lt.prototype = new Mt();
  Ot.constructor = Lt, ut(Ot, Tt.prototype), Ot.isPureReactComponent = !0;
  var Bt = Array.isArray;
  function I() {
  }
  var P = { H: null, A: null, T: null, S: null }, rt = Object.prototype.hasOwnProperty;
  function et(y, R, J) {
    var $ = J.ref;
    return {
      $$typeof: c,
      type: y,
      key: R,
      ref: $ !== void 0 ? $ : null,
      props: J
    };
  }
  function tt(y, R) {
    return et(y.type, R, y.props);
  }
  function bt(y) {
    return typeof y == "object" && y !== null && y.$$typeof === c;
  }
  function qt(y) {
    var R = { "=": "=0", ":": "=2" };
    return "$" + y.replace(/[=:]/g, function(J) {
      return R[J];
    });
  }
  var $t = /\/+/g;
  function V(y, R) {
    return typeof y == "object" && y !== null && y.key != null ? qt("" + y.key) : R.toString(36);
  }
  function x(y) {
    switch (y.status) {
      case "fulfilled":
        return y.value;
      case "rejected":
        throw y.reason;
      default:
        switch (typeof y.status == "string" ? y.then(I, I) : (y.status = "pending", y.then(
          function(R) {
            y.status === "pending" && (y.status = "fulfilled", y.value = R);
          },
          function(R) {
            y.status === "pending" && (y.status = "rejected", y.reason = R);
          }
        )), y.status) {
          case "fulfilled":
            return y.value;
          case "rejected":
            throw y.reason;
        }
    }
    throw y;
  }
  function U(y, R, J, $, ot) {
    var pt = typeof y;
    (pt === "undefined" || pt === "boolean") && (y = null);
    var vt = !1;
    if (y === null) vt = !0;
    else
      switch (pt) {
        case "bigint":
        case "string":
        case "number":
          vt = !0;
          break;
        case "object":
          switch (y.$$typeof) {
            case c:
            case r:
              vt = !0;
              break;
            case D:
              return vt = y._init, U(
                vt(y._payload),
                R,
                J,
                $,
                ot
              );
          }
      }
    if (vt)
      return ot = ot(y), vt = $ === "" ? "." + V(y, 0) : $, Bt(ot) ? (J = "", vt != null && (J = vt.replace($t, "$&/") + "/"), U(ot, R, J, "", function(Ee) {
        return Ee;
      })) : ot != null && (bt(ot) && (ot = tt(
        ot,
        J + (ot.key == null || y && y.key === ot.key ? "" : ("" + ot.key).replace(
          $t,
          "$&/"
        ) + "/") + vt
      )), R.push(ot)), 1;
    vt = 0;
    var X = $ === "" ? "." : $ + ":";
    if (Bt(y))
      for (var W = 0; W < y.length; W++)
        $ = y[W], pt = X + V($, W), vt += U(
          $,
          R,
          J,
          pt,
          ot
        );
    else if (W = F(y), typeof W == "function")
      for (y = W.call(y), W = 0; !($ = y.next()).done; )
        $ = $.value, pt = X + V($, W++), vt += U(
          $,
          R,
          J,
          pt,
          ot
        );
    else if (pt === "object") {
      if (typeof y.then == "function")
        return U(
          x(y),
          R,
          J,
          $,
          ot
        );
      throw R = String(y), Error(
        "Objects are not valid as a React child (found: " + (R === "[object Object]" ? "object with keys {" + Object.keys(y).join(", ") + "}" : R) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return vt;
  }
  function Z(y, R, J) {
    if (y == null) return y;
    var $ = [], ot = 0;
    return U(y, $, "", "", function(pt) {
      return R.call(J, pt, ot++);
    }), $;
  }
  function ht(y) {
    if (y._status === -1) {
      var R = y._result, J = R();
      J.then(
        function($) {
          (y._status === 0 || y._status === -1) && (y._status = 1, y._result = $, J.status === void 0 && (J.status = "fulfilled", J.value = $));
        },
        function($) {
          (y._status === 0 || y._status === -1) && (y._status = 2, y._result = $, J.status === void 0 && (J.status = "rejected", J.reason = $));
        }
      ), y._status === -1 && (y._status = 0, y._result = J);
    }
    if (y._status === 1) return y._result.default;
    throw y._result;
  }
  var it = typeof reportError == "function" ? reportError : function(y) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var R = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof y == "object" && y !== null && typeof y.message == "string" ? String(y.message) : String(y),
        error: y
      });
      if (!window.dispatchEvent(R)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", y);
      return;
    }
    console.error(y);
  };
  function ue(y) {
    var R = P.T, J = {};
    J.types = R !== null ? R.types : null, P.T = J;
    try {
      var $ = y(), ot = P.S;
      ot !== null && ot(J, $), typeof $ == "object" && $ !== null && typeof $.then == "function" && $.then(I, it);
    } catch (pt) {
      it(pt);
    } finally {
      R !== null && J.types !== null && (R.types = J.types), P.T = R;
    }
  }
  function Qt(y) {
    var R = P.T;
    if (R !== null) {
      var J = R.types;
      J === null ? R.types = [y] : J.indexOf(y) === -1 && J.push(y);
    } else ue(Qt.bind(null, y));
  }
  var Re = {
    map: Z,
    forEach: function(y, R, J) {
      Z(
        y,
        function() {
          R.apply(this, arguments);
        },
        J
      );
    },
    count: function(y) {
      var R = 0;
      return Z(y, function() {
        R++;
      }), R;
    },
    toArray: function(y) {
      return Z(y, function(R) {
        return R;
      }) || [];
    },
    only: function(y) {
      if (!bt(y))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return y;
    }
  };
  return at.Activity = m, at.Children = Re, at.Component = Tt, at.Fragment = f, at.Profiler = E, at.PureComponent = Lt, at.StrictMode = o, at.Suspense = H, at.ViewTransition = j, at.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = P, at.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(y) {
      return P.H.useMemoCache(y);
    }
  }, at.addTransitionType = Qt, at.cache = function(y) {
    return function() {
      return y.apply(null, arguments);
    };
  }, at.cacheSignal = function() {
    return null;
  }, at.cloneElement = function(y, R, J) {
    if (y == null)
      throw Error(
        "The argument must be a React element, but you passed " + y + "."
      );
    var $ = ut({}, y.props), ot = y.key;
    if (R != null)
      for (pt in R.key !== void 0 && (ot = "" + R.key), R)
        !rt.call(R, pt) || pt === "key" || pt === "__self" || pt === "__source" || pt === "ref" && R.ref === void 0 || ($[pt] = R[pt]);
    var pt = arguments.length - 2;
    if (pt === 1) $.children = J;
    else if (1 < pt) {
      for (var vt = Array(pt), X = 0; X < pt; X++)
        vt[X] = arguments[X + 2];
      $.children = vt;
    }
    return et(y.type, ot, $);
  }, at.createContext = function(y) {
    return y = {
      $$typeof: z,
      _currentValue: y,
      _currentValue2: y,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, y.Provider = y, y.Consumer = {
      $$typeof: h,
      _context: y
    }, y;
  }, at.createElement = function(y, R, J) {
    var $, ot = {}, pt = null;
    if (R != null)
      for ($ in R.key !== void 0 && (pt = "" + R.key), R)
        rt.call(R, $) && $ !== "key" && $ !== "__self" && $ !== "__source" && (ot[$] = R[$]);
    var vt = arguments.length - 2;
    if (vt === 1) ot.children = J;
    else if (1 < vt) {
      for (var X = Array(vt), W = 0; W < vt; W++)
        X[W] = arguments[W + 2];
      ot.children = X;
    }
    if (y && y.defaultProps)
      for ($ in vt = y.defaultProps, vt)
        ot[$] === void 0 && (ot[$] = vt[$]);
    return et(y, pt, ot);
  }, at.createRef = function() {
    return { current: null };
  }, at.forwardRef = function(y) {
    return { $$typeof: M, render: y };
  }, at.isValidElement = bt, at.lazy = function(y) {
    return {
      $$typeof: D,
      _payload: { _status: -1, _result: y },
      _init: ht
    };
  }, at.memo = function(y, R) {
    return {
      $$typeof: q,
      type: y,
      compare: R === void 0 ? null : R
    };
  }, at.startTransition = ue, at.unstable_useCacheRefresh = function() {
    return P.H.useCacheRefresh();
  }, at.use = function(y) {
    return P.H.use(y);
  }, at.useActionState = function(y, R, J) {
    return P.H.useActionState(y, R, J);
  }, at.useCallback = function(y, R) {
    return P.H.useCallback(y, R);
  }, at.useContext = function(y) {
    return P.H.useContext(y);
  }, at.useDebugValue = function() {
  }, at.useDeferredValue = function(y, R) {
    return P.H.useDeferredValue(y, R);
  }, at.useEffect = function(y, R) {
    return P.H.useEffect(y, R);
  }, at.useEffectEvent = function(y) {
    return P.H.useEffectEvent(y);
  }, at.useId = function() {
    return P.H.useId();
  }, at.useImperativeHandle = function(y, R, J) {
    return P.H.useImperativeHandle(y, R, J);
  }, at.useInsertionEffect = function(y, R) {
    return P.H.useInsertionEffect(y, R);
  }, at.useLayoutEffect = function(y, R) {
    return P.H.useLayoutEffect(y, R);
  }, at.useMemo = function(y, R) {
    return P.H.useMemo(y, R);
  }, at.useOptimistic = function(y, R) {
    return P.H.useOptimistic(y, R);
  }, at.useReducer = function(y, R, J) {
    return P.H.useReducer(y, R, J);
  }, at.useRef = function(y) {
    return P.H.useRef(y);
  }, at.useState = function(y) {
    return P.H.useState(y);
  }, at.useSyncExternalStore = function(y, R, J) {
    return P.H.useSyncExternalStore(
      y,
      R,
      J
    );
  }, at.useTransition = function() {
    return P.H.useTransition();
  }, at.version = "19.3.0", at;
}
var H0;
function uo() {
  return H0 || (H0 = 1, Zs.exports = fg()), Zs.exports;
}
var Y = uo(), Ks = { exports: {} }, ju = {}, Js = { exports: {} }, $s = {};
var B0;
function sg() {
  return B0 || (B0 = 1, (function(c) {
    function r(x, U) {
      var Z = x.length;
      x.push(U);
      t: for (; 0 < Z; ) {
        var ht = Z - 1 >>> 1, it = x[ht];
        if (0 < E(it, U))
          x[ht] = U, x[Z] = it, Z = ht;
        else break t;
      }
    }
    function f(x) {
      return x.length === 0 ? null : x[0];
    }
    function o(x) {
      if (x.length === 0) return null;
      var U = x[0], Z = x.pop();
      if (Z !== U) {
        x[0] = Z;
        t: for (var ht = 0, it = x.length, ue = it >>> 1; ht < ue; ) {
          var Qt = 2 * (ht + 1) - 1, Re = x[Qt], y = Qt + 1, R = x[y];
          if (0 > E(Re, Z))
            y < it && 0 > E(R, Re) ? (x[ht] = R, x[y] = Z, ht = y) : (x[ht] = Re, x[Qt] = Z, ht = Qt);
          else if (y < it && 0 > E(R, Z))
            x[ht] = R, x[y] = Z, ht = y;
          else break t;
        }
      }
      return U;
    }
    function E(x, U) {
      var Z = x.sortIndex - U.sortIndex;
      return Z !== 0 ? Z : x.id - U.id;
    }
    if (c.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var h = performance;
      c.unstable_now = function() {
        return h.now();
      };
    } else {
      var z = Date, M = z.now();
      c.unstable_now = function() {
        return z.now() - M;
      };
    }
    var H = [], q = [], D = 1, m = null, j = 3, w = !1, F = !1, ct = !1, ut = !1, zt = typeof setTimeout == "function" ? setTimeout : null, Tt = typeof clearTimeout == "function" ? clearTimeout : null, Mt = typeof setImmediate < "u" ? setImmediate : null;
    function Lt(x) {
      for (var U = f(q); U !== null; ) {
        if (U.callback === null) o(q);
        else if (U.startTime <= x)
          o(q), U.sortIndex = U.expirationTime, r(H, U);
        else break;
        U = f(q);
      }
    }
    function Ot(x) {
      if (ct = !1, Lt(x), !F)
        if (f(H) !== null)
          F = !0, Bt || (Bt = !0, bt());
        else {
          var U = f(q);
          U !== null && V(Ot, U.startTime - x);
        }
    }
    var Bt = !1, I = -1, P = 5, rt = -1;
    function et() {
      return ut ? !0 : !(c.unstable_now() - rt < P);
    }
    function tt() {
      if (ut = !1, Bt) {
        var x = c.unstable_now();
        rt = x;
        var U = !0;
        try {
          t: {
            F = !1, ct && (ct = !1, Tt(I), I = -1), w = !0;
            var Z = j;
            try {
              e: {
                for (Lt(x), m = f(H); m !== null && !(m.expirationTime > x && et()); ) {
                  var ht = m.callback;
                  if (typeof ht == "function") {
                    m.callback = null, j = m.priorityLevel;
                    var it = ht(
                      m.expirationTime <= x
                    );
                    if (x = c.unstable_now(), typeof it == "function") {
                      m.callback = it, Lt(x), U = !0;
                      break e;
                    }
                    m === f(H) && o(H), Lt(x);
                  } else o(H);
                  m = f(H);
                }
                if (m !== null) U = !0;
                else {
                  var ue = f(q);
                  ue !== null && V(
                    Ot,
                    ue.startTime - x
                  ), U = !1;
                }
              }
              break t;
            } finally {
              m = null, j = Z, w = !1;
            }
            U = void 0;
          }
        } finally {
          U ? bt() : Bt = !1;
        }
      }
    }
    var bt;
    if (typeof Mt == "function")
      bt = function() {
        Mt(tt);
      };
    else if (typeof MessageChannel < "u") {
      var qt = new MessageChannel(), $t = qt.port2;
      qt.port1.onmessage = tt, bt = function() {
        $t.postMessage(null);
      };
    } else
      bt = function() {
        zt(tt, 0);
      };
    function V(x, U) {
      I = zt(function() {
        x(c.unstable_now());
      }, U);
    }
    c.unstable_IdlePriority = 5, c.unstable_ImmediatePriority = 1, c.unstable_LowPriority = 4, c.unstable_NormalPriority = 3, c.unstable_Profiling = null, c.unstable_UserBlockingPriority = 2, c.unstable_cancelCallback = function(x) {
      x.callback = null;
    }, c.unstable_forceFrameRate = function(x) {
      0 > x || 125 < x ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : P = 0 < x ? Math.floor(1e3 / x) : 5;
    }, c.unstable_getCurrentPriorityLevel = function() {
      return j;
    }, c.unstable_next = function(x) {
      switch (j) {
        case 1:
        case 2:
        case 3:
          var U = 3;
          break;
        default:
          U = j;
      }
      var Z = j;
      j = U;
      try {
        return x();
      } finally {
        j = Z;
      }
    }, c.unstable_requestPaint = function() {
      ut = !0;
    }, c.unstable_runWithPriority = function(x, U) {
      switch (x) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          x = 3;
      }
      var Z = j;
      j = x;
      try {
        return U();
      } finally {
        j = Z;
      }
    }, c.unstable_scheduleCallback = function(x, U, Z) {
      var ht = c.unstable_now();
      switch (typeof Z == "object" && Z !== null ? (Z = Z.delay, Z = typeof Z == "number" && 0 < Z ? ht + Z : ht) : Z = ht, x) {
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
      return it = Z + it, x = {
        id: D++,
        callback: U,
        priorityLevel: x,
        startTime: Z,
        expirationTime: it,
        sortIndex: -1
      }, Z > ht ? (x.sortIndex = Z, r(q, x), f(H) === null && x === f(q) && (ct ? (Tt(I), I = -1) : ct = !0, V(Ot, Z - ht))) : (x.sortIndex = it, r(H, x), F || w || (F = !0, Bt || (Bt = !0, bt()))), x;
    }, c.unstable_shouldYield = et, c.unstable_wrapCallback = function(x) {
      var U = j;
      return function() {
        var Z = j;
        j = U;
        try {
          return x.apply(this, arguments);
        } finally {
          j = Z;
        }
      };
    };
  })($s)), $s;
}
var q0;
function og() {
  return q0 || (q0 = 1, Js.exports = sg()), Js.exports;
}
var Fs = { exports: {} }, de = {};
var Y0;
function rg() {
  if (Y0) return de;
  Y0 = 1;
  var c = uo();
  function r(D) {
    var m = "https://react.dev/errors/" + D;
    if (1 < arguments.length) {
      m += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var j = 2; j < arguments.length; j++)
        m += "&args[]=" + encodeURIComponent(arguments[j]);
    }
    return "Minified React error #" + D + "; visit " + m + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function f() {
  }
  var o = {
    d: {
      f,
      r: function() {
        throw Error(r(522));
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
  }, E = /* @__PURE__ */ Symbol.for("react.portal"), h = /* @__PURE__ */ Symbol.for("react.recoverable"), z = /* @__PURE__ */ Symbol.for("react.optimistic_key");
  function M(D, m, j) {
    var w = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: E,
      key: w == null ? null : w === z ? z : "" + w,
      children: D,
      containerInfo: m,
      implementation: j
    };
  }
  var H = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function q(D, m) {
    if (D === "font") return "";
    if (typeof m == "string")
      return m === "use-credentials" ? m : "";
  }
  return de.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o, de.browser = function(D) {
    return { $$typeof: h, _reason: D };
  }, de.createPortal = function(D, m) {
    var j = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!m || m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11)
      throw Error(r(299));
    return M(D, m, null, j);
  }, de.flushSync = function(D) {
    var m = H.T, j = o.p;
    try {
      if (H.T = null, o.p = 2, D) return D();
    } finally {
      H.T = m, o.p = j, o.d.f();
    }
  }, de.preconnect = function(D, m) {
    typeof D == "string" && (m ? (m = m.crossOrigin, m = typeof m == "string" ? m === "use-credentials" ? m : "" : void 0) : m = null, o.d.C(D, m));
  }, de.prefetchDNS = function(D) {
    typeof D == "string" && o.d.D(D);
  }, de.preinit = function(D, m) {
    if (typeof D == "string" && m && typeof m.as == "string") {
      var j = m.as, w = q(j, m.crossOrigin), F = typeof m.integrity == "string" ? m.integrity : void 0, ct = typeof m.fetchPriority == "string" ? m.fetchPriority : void 0;
      j === "style" ? o.d.S(
        D,
        typeof m.precedence == "string" ? m.precedence : void 0,
        {
          crossOrigin: w,
          integrity: F,
          fetchPriority: ct
        }
      ) : j === "script" && o.d.X(D, {
        crossOrigin: w,
        integrity: F,
        fetchPriority: ct,
        nonce: typeof m.nonce == "string" ? m.nonce : void 0
      });
    }
  }, de.preinitModule = function(D, m) {
    if (typeof D == "string")
      if (typeof m == "object" && m !== null) {
        if (m.as == null || m.as === "script") {
          var j = q(
            m.as,
            m.crossOrigin
          );
          o.d.M(D, {
            crossOrigin: j,
            integrity: typeof m.integrity == "string" ? m.integrity : void 0,
            nonce: typeof m.nonce == "string" ? m.nonce : void 0,
            fetchPriority: typeof m.fetchPriority == "string" ? m.fetchPriority : void 0
          });
        }
      } else m == null && o.d.M(D);
  }, de.preload = function(D, m) {
    if (typeof D == "string" && typeof m == "object" && m !== null && typeof m.as == "string") {
      var j = m.as, w = q(j, m.crossOrigin);
      o.d.L(D, j, {
        crossOrigin: w,
        integrity: typeof m.integrity == "string" ? m.integrity : void 0,
        nonce: typeof m.nonce == "string" ? m.nonce : void 0,
        type: typeof m.type == "string" ? m.type : void 0,
        fetchPriority: typeof m.fetchPriority == "string" ? m.fetchPriority : void 0,
        referrerPolicy: typeof m.referrerPolicy == "string" ? m.referrerPolicy : void 0,
        imageSrcSet: typeof m.imageSrcSet == "string" ? m.imageSrcSet : void 0,
        imageSizes: typeof m.imageSizes == "string" ? m.imageSizes : void 0,
        media: typeof m.media == "string" ? m.media : void 0
      });
    }
  }, de.preloadModule = function(D, m) {
    if (typeof D == "string")
      if (m) {
        var j = q(m.as, m.crossOrigin);
        o.d.m(D, {
          as: typeof m.as == "string" && m.as !== "script" ? m.as : void 0,
          crossOrigin: j,
          integrity: typeof m.integrity == "string" ? m.integrity : void 0,
          nonce: typeof m.nonce == "string" ? m.nonce : void 0,
          fetchPriority: typeof m.fetchPriority == "string" ? m.fetchPriority : void 0
        });
      } else o.d.m(D);
  }, de.requestFormReset = function(D) {
    o.d.r(D);
  }, de.unstable_batchedUpdates = function(D, m) {
    return D(m);
  }, de.useFormState = function(D, m, j) {
    return H.H.useFormState(D, m, j);
  }, de.useFormStatus = function() {
    return H.H.useHostTransitionStatus();
  }, de.version = "19.3.0", de;
}
var w0;
function dg() {
  if (w0) return Fs.exports;
  w0 = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (r) {
        console.error(r);
      }
  }
  return c(), Fs.exports = rg(), Fs.exports;
}
var L0;
function mg() {
  if (L0) return ju;
  L0 = 1;
  var c = og(), r = uo(), f = dg();
  function o(t) {
    var e = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      e += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++)
        e += "&args[]=" + encodeURIComponent(arguments[l]);
    }
    return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function E(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function h(t) {
    for (var e = t, l = e; l && !l.alternate; )
      e = l, (e.flags & 4098) !== 0 && (t = e.return), l = e.return;
    for (; e.return; ) e = e.return;
    return e.tag === 3 ? t : null;
  }
  function z(t) {
    if (t.tag === 13) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function M(t) {
    if (t.tag === 31) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function H(t) {
    if (h(t) !== t)
      throw Error(o(188));
  }
  function q(t) {
    var e = t.alternate;
    if (!e) {
      if (e = h(t), e === null) throw Error(o(188));
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
          if (u === l) return H(n), t;
          if (u === a) return H(n), e;
          u = u.sibling;
        }
        throw Error(o(188));
      }
      if (l.return !== a.return) l = n, a = u;
      else {
        for (var i = !1, s = n.child; s; ) {
          if (s === l) {
            i = !0, l = n, a = u;
            break;
          }
          if (s === a) {
            i = !0, a = n, l = u;
            break;
          }
          s = s.sibling;
        }
        if (!i) {
          for (s = u.child; s; ) {
            if (s === l) {
              i = !0, l = u, a = n;
              break;
            }
            if (s === a) {
              i = !0, a = u, l = n;
              break;
            }
            s = s.sibling;
          }
          if (!i) throw Error(o(189));
        }
      }
      if (l.alternate !== a) throw Error(o(190));
    }
    if (l.tag !== 3) throw Error(o(188));
    return l.stateNode.current === l ? t : e;
  }
  function D(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (e = D(t), e !== null) return e;
      t = t.sibling;
    }
    return null;
  }
  function m(t, e, l, a, n, u) {
    for (; t !== null; ) {
      if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && l(t, a, n, u) || (t.tag !== 22 || t.memoizedState === null) && (e || t.tag !== 5 && t.tag !== 27) && m(
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
  function w(t) {
    var e = !1;
    for (t = t.return; t !== null && (t.tag === 4 && (e = !0), !(t.tag === 3 || t.tag === 5 || t.tag === 27)); )
      t = t.return;
    return e;
  }
  function F(t) {
    var e = [null, null], l = j(t);
    return l === null || ct(
      e,
      t,
      l.child,
      { foundSelf: !1 }
    ), e;
  }
  function ct(t, e, l, a) {
    for (; l !== null; ) {
      if (l === e) a.foundSelf = !0;
      else if (l.tag === 5 || l.tag === 27 || l.tag === 6) {
        if (a.foundSelf) return t[1] = l, !0;
        t[0] = l;
      } else if ((l.tag !== 22 || l.memoizedState === null) && ct(
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
  function ut(t) {
    switch (t.tag) {
      case 5:
      case 27:
      case 6:
        return t.stateNode;
      case 3:
        return t.stateNode.containerInfo;
      default:
        throw Error(o(559));
    }
  }
  var zt = null, Tt = null;
  function Mt(t, e, l) {
    return t === l ? !0 : t === e ? (zt = t, !0) : !1;
  }
  function Lt(t, e, l) {
    return t === l ? (Tt = t, !1) : t === e ? (Tt !== null && (zt = t), !0) : !1;
  }
  function Ot(t) {
    if (t === null) return null;
    do
      t = t === null ? null : t.return;
    while (t && t.tag !== 5 && t.tag !== 27 && t.tag !== 3);
    return t || null;
  }
  function Bt(t, e, l) {
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
  var I = Object.assign, P = /* @__PURE__ */ Symbol.for("react.element"), rt = /* @__PURE__ */ Symbol.for("react.transitional.element"), et = /* @__PURE__ */ Symbol.for("react.portal"), tt = /* @__PURE__ */ Symbol.for("react.fragment"), bt = /* @__PURE__ */ Symbol.for("react.strict_mode"), qt = /* @__PURE__ */ Symbol.for("react.profiler"), $t = /* @__PURE__ */ Symbol.for("react.consumer"), V = /* @__PURE__ */ Symbol.for("react.context"), x = /* @__PURE__ */ Symbol.for("react.forward_ref"), U = /* @__PURE__ */ Symbol.for("react.suspense"), Z = /* @__PURE__ */ Symbol.for("react.suspense_list"), ht = /* @__PURE__ */ Symbol.for("react.memo"), it = /* @__PURE__ */ Symbol.for("react.lazy"), ue = /* @__PURE__ */ Symbol.for("react.activity"), Qt = /* @__PURE__ */ Symbol.for("react.legacy_hidden"), Re = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), y = /* @__PURE__ */ Symbol.for("react.view_transition"), R = /* @__PURE__ */ Symbol.for("react.recoverable"), J = Symbol.iterator;
  function $(t) {
    return t === null || typeof t != "object" ? null : (t = J && t[J] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var ot = /* @__PURE__ */ Symbol.for("react.client.reference");
  function pt(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === ot ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case tt:
        return "Fragment";
      case qt:
        return "Profiler";
      case bt:
        return "StrictMode";
      case U:
        return "Suspense";
      case Z:
        return "SuspenseList";
      case ue:
        return "Activity";
      case y:
        return "ViewTransition";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case et:
          return "Portal";
        case V:
          return t.displayName || "Context";
        case $t:
          return (t._context.displayName || "Context") + ".Consumer";
        case x:
          var e = t.render;
          return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case ht:
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
  var vt = Array.isArray, X = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, W = f.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Ee = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, Ze = [], ol = -1;
  function be(t) {
    return { current: t };
  }
  function Kt(t) {
    0 > ol || (t.current = Ze[ol], Ze[ol] = null, ol--);
  }
  function B(t, e) {
    ol++, Ze[ol] = t.current, t.current = e;
  }
  var G = be(null), xt = be(null), me = be(null), Ne = be(null);
  function Ke(t, e) {
    switch (B(me, e), B(xt, t), B(G, null), e.nodeType) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? Gm(t) : 0;
        break;
      default:
        if (t = e.tagName, e = e.namespaceURI)
          e = Gm(e), t = Xm(e, t);
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
    Kt(G), B(G, t);
  }
  function rl() {
    Kt(G), Kt(xt), Kt(me);
  }
  function qn(t) {
    var e = t.memoizedState;
    e !== null && (jn._currentValue = e.memoizedState, B(Ne, t)), e = G.current;
    var l = Xm(e, t.type);
    e !== l && (B(xt, t), B(G, l));
  }
  function Va(t) {
    xt.current === t && (Kt(G), Kt(xt)), Ne.current === t && (Kt(Ne), jn._currentValue = Ee);
  }
  var O, nt;
  function dt(t) {
    if (O === void 0)
      try {
        throw Error();
      } catch (l) {
        var e = l.stack.trim().match(/\n( *(at )?)/);
        O = e && e[1] || "", nt = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + O + t + nt;
  }
  var he = !1;
  function te(t, e) {
    if (!t || he) return "";
    he = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (e) {
              var C = function() {
                throw Error();
              };
              if (Object.defineProperty(C.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(C, []);
                } catch (L) {
                  var b = L;
                }
                Reflect.construct(t, [], C);
              } else {
                try {
                  C.call();
                } catch (L) {
                  b = L;
                }
                C = !1;
                try {
                  var T = Object.getOwnPropertyDescriptor(
                    t.prototype,
                    "props"
                  );
                  Object.defineProperty(t.prototype, "props", {
                    configurable: !0,
                    set: function() {
                      throw Error();
                    }
                  }), C = !0, new t();
                } finally {
                  C && (T !== void 0 ? Object.defineProperty(t.prototype, "props", T) : delete t.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (L) {
                b = L;
              }
              (C = t()) && typeof C.catch == "function" && C.catch(function() {
              });
            }
          } catch (L) {
            if (L && b && typeof L.stack == "string")
              return [L.stack, b.stack];
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
      var u = a.DetermineComponentFrameRoot(), i = u[0], s = u[1];
      if (i && s) {
        var d = i.split(`
`), S = s.split(`
`);
        for (n = a = 0; a < d.length && !d[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; n < S.length && !S[n].includes(
          "DetermineComponentFrameRoot"
        ); )
          n++;
        if (a === d.length || n === S.length)
          for (a = d.length - 1, n = S.length - 1; 1 <= a && 0 <= n && d[a] !== S[n]; )
            n--;
        for (; 1 <= a && 0 <= n; a--, n--)
          if (d[a] !== S[n]) {
            if (a !== 1 || n !== 1)
              do
                if (a--, n--, 0 > n || d[a] !== S[n]) {
                  var N = `
` + d[a].replace(" at new ", " at ");
                  return t.displayName && N.includes("<anonymous>") && (N = N.replace("<anonymous>", t.displayName)), N;
                }
              while (1 <= a && 0 <= n);
            break;
          }
      }
    } finally {
      he = !1, Error.prepareStackTrace = l;
    }
    return (l = t ? t.displayName || t.name : "") ? dt(l) : "";
  }
  function ze(t, e) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return dt(t.type);
      case 16:
        return dt("Lazy");
      case 13:
        return t.child !== e && e !== null ? dt("Suspense Fallback") : dt("Suspense");
      case 19:
        return dt("SuspenseList");
      case 0:
      case 15:
        return te(t.type, !1);
      case 11:
        return te(t.type.render, !1);
      case 1:
        return te(t.type, !0);
      case 31:
        return dt("Activity");
      case 30:
        return dt("ViewTransition");
      default:
        return "";
    }
  }
  function Me(t) {
    try {
      var e = "", l = null;
      do
        e += ze(t, l), l = t, t = t.return;
      while (t);
      return e;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var ve = Object.prototype.hasOwnProperty, ha = c.unstable_scheduleCallback, vc = c.unstable_cancelCallback, rh = c.unstable_shouldYield, dh = c.unstable_requestPaint, Ue = c.unstable_now, mh = c.unstable_getCurrentPriorityLevel, so = c.unstable_ImmediatePriority, oo = c.unstable_UserBlockingPriority, qu = c.unstable_NormalPriority, hh = c.unstable_LowPriority, ro = c.unstable_IdlePriority, vh = c.log, yh = c.unstable_setDisableYieldValue, Yn = null, He = null;
  function Ll(t) {
    if (typeof vh == "function" && yh(t), He && typeof He.setStrictMode == "function")
      try {
        He.setStrictMode(Yn, t);
      } catch {
      }
  }
  var Be = Math.clz32 ? Math.clz32 : ph, gh = Math.log, bh = Math.LN2;
  function ph(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (gh(t) / bh | 0) | 0;
  }
  var Yu = 256, wu = 262144, Lu = 4194304;
  function va(t) {
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
  function Gu(t, e, l) {
    var a = t.pendingLanes;
    if (a === 0) return 0;
    var n = 0, u = t.suspendedLanes, i = t.pingedLanes;
    t = t.warmLanes;
    var s = a & 134217727;
    return s !== 0 ? (a = s & ~u, a !== 0 ? n = va(a) : (i &= s, i !== 0 ? n = va(i) : l || (l = s & ~t, l !== 0 && (n = va(l))))) : (s = a & ~u, s !== 0 ? n = va(s) : i !== 0 ? n = va(i) : l || (l = a & ~t, l !== 0 && (n = va(l)))), n === 0 ? 0 : e !== 0 && e !== n && (e & u) === 0 && (u = n & -n, l = e & -e, u >= l || u === 32 && (l & 4194048) !== 0) ? e : n;
  }
  function wn(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function mo(t, e) {
    (e & 8) !== 0 && (e |= e & 32);
    var l = t.entangledLanes;
    if (l !== 0)
      for (t = t.entanglements, l &= e; 0 < l; ) {
        var a = 31 - Be(l), n = 1 << a;
        e |= t[a], l &= ~n;
      }
    return e;
  }
  function Sh(t, e) {
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
  function ho() {
    var t = Lu;
    return Lu <<= 1, (Lu & 62914560) === 0 && (Lu = 4194304), t;
  }
  function yc(t) {
    for (var e = [], l = 0; 31 > l; l++) e.push(t);
    return e;
  }
  function Ln(t, e) {
    t.pendingLanes |= e, e !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function _h(t, e, l, a, n, u) {
    var i = t.pendingLanes;
    t.pendingLanes = l, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= l, t.entangledLanes &= l, t.errorRecoveryDisabledLanes &= l, t.shellSuspendCounter = 0;
    var s = t.entanglements, d = t.expirationTimes, S = t.hiddenUpdates;
    for (l = i & ~l; 0 < l; ) {
      var N = 31 - Be(l), C = 1 << N;
      s[N] = 0, d[N] = -1;
      var b = S[N];
      if (b !== null)
        for (S[N] = null, N = 0; N < b.length; N++) {
          var T = b[N];
          T !== null && (T.lane &= -536870913);
        }
      l &= ~C;
    }
    a !== 0 && vo(t, a, 0), u !== 0 && n === 0 && t.tag !== 0 && (t.suspendedLanes |= u & ~(i & ~e));
  }
  function vo(t, e, l) {
    t.pendingLanes |= e, t.suspendedLanes &= ~e;
    var a = 31 - Be(e);
    t.entangledLanes |= e, t.entanglements[a] = t.entanglements[a] | 1073741824 | l & 261930;
  }
  function yo(t, e) {
    var l = t.entangledLanes |= e;
    for (t = t.entanglements; l; ) {
      var a = 31 - Be(l), n = 1 << a;
      n & e | t[a] & e && (t[a] |= e), l &= ~n;
    }
  }
  function go(t, e) {
    var l = e & -e;
    return l = (l & 42) !== 0 ? 1 : gc(l), (l & (t.suspendedLanes | e)) !== 0 ? 0 : l;
  }
  function gc(t) {
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
  function bc(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function bo() {
    var t = W.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : z0(t.type));
  }
  function po(t, e) {
    var l = W.p;
    try {
      return W.p = t, e();
    } finally {
      W.p = l;
    }
  }
  var zl = Math.random().toString(36).slice(2), ie = "__reactFiber$" + zl, Oe = "__reactProps$" + zl, Za = "__reactContainer$" + zl, So = "__reactEvents$" + zl, Th = "__reactListeners$" + zl, Eh = "__reactHandles$" + zl, _o = "__reactResources$" + zl, Gn = "__reactMarker$" + zl, Xu = "__reactLoad$" + zl;
  function Qu(t) {
    delete t[ie], delete t[Oe], delete t[Th], delete t[Eh];
  }
  function ya(t) {
    var e;
    if (e = t[ie]) return e;
    for (var l = t.parentNode; l; ) {
      if (e = l[Za] || l[ie]) {
        if (l = e.alternate, e.child !== null || l !== null && l.child !== null)
          for (t = u0(t); t !== null; ) {
            if (l = t[ie]) return l;
            t = u0(t);
          }
        return e;
      }
      t = l, l = t.parentNode;
    }
    return null;
  }
  function Ka(t) {
    if (t = t[ie] || t[Za]) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3)
        return t;
    }
    return null;
  }
  function Xn(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(o(33));
  }
  function Ja(t) {
    var e = t[_o];
    return e || (e = t[_o] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), e;
  }
  function ee(t) {
    t[Gn] = !0;
  }
  function To(t) {
    t[Xu] = void 0;
  }
  var Eo = /* @__PURE__ */ new Set(), No = {};
  function ga(t, e) {
    $a(t, e), $a(t + "Capture", e);
  }
  function $a(t, e) {
    for (No[t] = e, t = 0; t < e.length; t++)
      Eo.add(e[t]);
  }
  var Nh = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), zo = {}, Mo = {};
  function zh(t) {
    return ve.call(Mo, t) ? !0 : ve.call(zo, t) ? !1 : Nh.test(t) ? Mo[t] = !0 : (zo[t] = !0, !1);
  }
  var Nt = !1;
  function Oo() {
    var t = Nt;
    return Nt = !1, t;
  }
  function Vu(t, e, l) {
    if (zh(e))
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
  function Zu(t, e, l) {
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
  function Ml(t, e, l, a) {
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
  function Ao(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
  }
  function Mh(t, e, l) {
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
  function pc(t) {
    if (!t._valueTracker) {
      var e = Ao(t) ? "checked" : "value";
      t._valueTracker = Mh(
        t,
        e,
        "" + t[e]
      );
    }
  }
  function Co(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var l = e.getValue(), a = "";
    return t && (a = Ao(t) ? t.checked ? "true" : "false" : t.value), t = a, t !== l ? (e.setValue(t), !0) : !1;
  }
  var Oh = /[\n"\\]/g;
  function Je(t) {
    return t.replace(
      Oh,
      function(e) {
        return "\\" + e.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Sc(t, e, l, a, n, u, i, s) {
    t.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? t.type = i : t.removeAttribute("type"), e != null ? i === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + qe(e)) : t.value !== "" + qe(e) && (t.value = "" + qe(e)) : i !== "submit" && i !== "reset" || t.removeAttribute("value"), e != null ? i === "number" && t.value == e ? _c(t, qe(t.value)) : _c(t, qe(e)) : l != null ? _c(t, qe(l)) : a != null && t.removeAttribute("value"), n == null && u != null && (t.defaultChecked = !!u), n != null && (t.checked = n && typeof n != "function" && typeof n != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? t.name = "" + qe(s) : t.removeAttribute("name");
  }
  function xo(t, e, l, a, n, u, i, s) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (t.type = u), e != null || l != null) {
      if (!(u !== "submit" && u !== "reset" || e != null)) {
        pc(t);
        return;
      }
      l = l != null ? "" + qe(l) : "", e = e != null ? "" + qe(e) : l, s || e === t.value || (t.value = e), t.defaultValue = e;
    }
    a = a ?? n, a = typeof a != "function" && typeof a != "symbol" && !!a, t.checked = s ? t.checked : !!a, t.defaultChecked = !!a, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (t.name = i), pc(t);
  }
  function _c(t, e) {
    t.defaultValue !== "" + e && (t.defaultValue = "" + e);
  }
  function Fa(t, e, l, a) {
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
  function Do(t, e, l) {
    if (e != null && (e = "" + qe(e), e !== t.value && (t.value = e), l == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = l != null ? "" + qe(l) : "";
  }
  function jo(t, e, l, a) {
    if (e == null) {
      if (a != null) {
        if (l != null) throw Error(o(92));
        if (vt(a)) {
          if (1 < a.length) throw Error(o(93));
          a = a[0];
        }
        l = a;
      }
      l == null && (l = ""), e = l;
    }
    l = qe(e), t.defaultValue = l, a = t.textContent, a === l && a !== "" && a !== null && (t.value = a), pc(t);
  }
  function ka(t, e) {
    if (e) {
      var l = t.firstChild;
      if (l && l === t.lastChild && l.nodeType === 3) {
        l.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var Ah = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Ro(t, e, l) {
    var a = e.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? a ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "" : a ? t.setProperty(e, l) : typeof l != "number" || l === 0 || Ah.has(e) ? e === "float" ? t.cssFloat = l : t[e] = ("" + l).trim() : t[e] = l + "px";
  }
  function Uo(t, e, l) {
    if (e != null && typeof e != "object")
      throw Error(o(62));
    if (t = t.style, l != null) {
      for (var a in l)
        !l.hasOwnProperty(a) || e != null && e.hasOwnProperty(a) || (a.indexOf("--") === 0 ? t.setProperty(a, "") : a === "float" ? t.cssFloat = "" : t[a] = "", Nt = !0);
      for (var n in e)
        a = e[n], e.hasOwnProperty(n) && l[n] !== a && (Ro(t, n, a), Nt = !0);
    } else
      for (var u in e)
        e.hasOwnProperty(u) && Ro(t, u, e[u]);
  }
  function Tc(t) {
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
  var Ch = /* @__PURE__ */ new Map([
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
  ]), xh = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Ku(t) {
    return xh.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function dl() {
  }
  var Ec = null;
  function Nc(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var Wa = null, Ia = null;
  function Ho(t) {
    var e = Ka(t);
    if (e && (t = e.stateNode)) {
      var l = t[Oe] || null;
      t: switch (t = e.stateNode, e.type) {
        case "input":
          if (Sc(
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
              'input[name="' + Je(
                "" + e
              ) + '"][type="radio"]'
            ), e = 0; e < l.length; e++) {
              var a = l[e];
              if (a !== t && a.form === t.form) {
                var n = a[Oe] || null;
                if (!n) throw Error(o(90));
                Sc(
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
              a = l[e], a.form === t.form && Co(a);
          }
          break t;
        case "textarea":
          Do(t, l.value, l.defaultValue);
          break t;
        case "select":
          e = l.value, e != null && Fa(t, !!l.multiple, e, !1);
      }
    }
  }
  var zc = !1;
  function Bo(t, e, l) {
    if (zc) return t(e, l);
    zc = !0;
    try {
      var a = t(e);
      return a;
    } finally {
      if (zc = !1, (Wa !== null || Ia !== null) && (Ki(), Wa && (e = Wa, t = Ia, Ia = Wa = null, Ho(e), t)))
        for (e = 0; e < t.length; e++) Ho(t[e]);
    }
  }
  function Qn(t, e) {
    var l = t.stateNode;
    if (l === null) return null;
    var a = l[Oe] || null;
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
        o(231, e, typeof l)
      );
    return l;
  }
  var Ol = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Mc = !1;
  if (Ol)
    try {
      var Vn = {};
      Object.defineProperty(Vn, "passive", {
        get: function() {
          Mc = !0;
        }
      }), window.addEventListener("test", Vn, Vn), window.removeEventListener("test", Vn, Vn);
    } catch {
      Mc = !1;
    }
  var Gl = null, Oc = null, Ju = null;
  function qo() {
    if (Ju) return Ju;
    var t, e = Oc, l = e.length, a, n = "value" in Gl ? Gl.value : Gl.textContent, u = n.length;
    for (t = 0; t < l && e[t] === n[t]; t++) ;
    var i = l - t;
    for (a = 1; a <= i && e[l - a] === n[u - a]; a++) ;
    return Ju = n.slice(t, 1 < a ? 1 - a : void 0);
  }
  function $u(t) {
    var e = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function Fu() {
    return !0;
  }
  function Yo() {
    return !1;
  }
  function pe(t) {
    function e(l, a, n, u, i) {
      this._reactName = l, this._targetInst = n, this.type = a, this.nativeEvent = u, this.target = i, this.currentTarget = null;
      for (var s in t)
        t.hasOwnProperty(s) && (l = t[s], this[s] = l ? l(u) : u[s]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? Fu : Yo, this.isPropagationStopped = Yo, this;
    }
    return I(e.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = Fu);
      },
      stopPropagation: function() {
        var l = this.nativeEvent;
        l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = Fu);
      },
      persist: function() {
      },
      isPersistent: Fu
    }), e;
  }
  var Xl = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, ku = pe(Xl), Zn = I({}, Xl, { view: 0, detail: 0 }), Dh = pe(Zn), Ac, Cc, Kn, Wu = I({}, Zn, {
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
    getModifierState: Dc,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== Kn && (Kn && t.type === "mousemove" ? (Ac = t.screenX - Kn.screenX, Cc = t.screenY - Kn.screenY) : Cc = Ac = 0, Kn = t), Ac);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : Cc;
    }
  }), wo = pe(Wu), jh = I({}, Wu, { dataTransfer: 0 }), Rh = pe(jh), Uh = I({}, Zn, { relatedTarget: 0 }), xc = pe(Uh), Hh = I({}, Xl, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Bh = pe(Hh), qh = I({}, Xl, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), Yh = pe(qh), wh = I({}, Xl, { data: 0 }), Lo = pe(wh), Lh = {
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
  }, Gh = {
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
  }, Xh = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Qh(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = Xh[t]) ? !!e[t] : !1;
  }
  function Dc() {
    return Qh;
  }
  var Vh = I({}, Zn, {
    key: function(t) {
      if (t.key) {
        var e = Lh[t.key] || t.key;
        if (e !== "Unidentified") return e;
      }
      return t.type === "keypress" ? (t = $u(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? Gh[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Dc,
    charCode: function(t) {
      return t.type === "keypress" ? $u(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? $u(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), Zh = pe(Vh), Kh = I({}, Wu, {
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
  }), Go = pe(Kh), Jh = I({}, Xl, { submitter: 0 }), $h = pe(Jh), Fh = I({}, Zn, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Dc
  }), kh = pe(Fh), Wh = I({}, Xl, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Ih = pe(Wh), Ph = I({}, Wu, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), tv = pe(Ph), ev = I({}, Xl, {
    newState: 0,
    oldState: 0,
    source: 0
  }), lv = pe(ev), av = [9, 13, 27, 32], jc = Ol && "CompositionEvent" in window, Jn = null;
  Ol && "documentMode" in document && (Jn = document.documentMode);
  var nv = Ol && "TextEvent" in window && !Jn, Xo = Ol && (!jc || Jn && 8 < Jn && 11 >= Jn), Qo = " ", Vo = !1;
  function Zo(t, e) {
    switch (t) {
      case "keyup":
        return av.indexOf(e.keyCode) !== -1;
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
  function Ko(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var Pa = !1;
  function uv(t, e) {
    switch (t) {
      case "compositionend":
        return Ko(e);
      case "keypress":
        return e.which !== 32 ? null : (Vo = !0, Qo);
      case "textInput":
        return t = e.data, t === Qo && Vo ? null : t;
      default:
        return null;
    }
  }
  function iv(t, e) {
    if (Pa)
      return t === "compositionend" || !jc && Zo(t, e) ? (t = qo(), Ju = Oc = Gl = null, Pa = !1, t) : null;
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
        return Xo && e.locale !== "ko" ? null : e.data;
      default:
        return null;
    }
  }
  var cv = {
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
  function Jo(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === "input" ? !!cv[t.type] : e === "textarea";
  }
  function $o(t, e, l, a) {
    Wa ? Ia ? Ia.push(a) : Ia = [a] : Wa = a, e = Ii(e, "onChange"), 0 < e.length && (l = new ku(
      "onChange",
      "change",
      null,
      l,
      a
    ), t.push({ event: l, listeners: e }));
  }
  var $n = null, Fn = null;
  function fv(t) {
    Hm(t, 0);
  }
  function Iu(t) {
    var e = Xn(t);
    if (Co(e)) return t;
  }
  function Fo(t, e) {
    if (t === "change") return e;
  }
  var ko = !1;
  if (Ol) {
    var Rc;
    if (Ol) {
      var Uc = "oninput" in document;
      if (!Uc) {
        var Wo = document.createElement("div");
        Wo.setAttribute("oninput", "return;"), Uc = typeof Wo.oninput == "function";
      }
      Rc = Uc;
    } else Rc = !1;
    ko = Rc && (!document.documentMode || 9 < document.documentMode);
  }
  function Io() {
    $n && ($n.detachEvent("onpropertychange", Po), Fn = $n = null);
  }
  function Po(t) {
    if (t.propertyName === "value" && Iu(Fn)) {
      var e = [];
      $o(
        e,
        Fn,
        t,
        Nc(t)
      ), Bo(fv, e);
    }
  }
  function sv(t, e, l) {
    t === "focusin" ? (Io(), $n = e, Fn = l, $n.attachEvent("onpropertychange", Po)) : t === "focusout" && Io();
  }
  function ov(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return Iu(Fn);
  }
  function rv(t, e) {
    if (t === "click") return Iu(e);
  }
  function dv(t, e) {
    if (t === "input" || t === "change")
      return Iu(e);
  }
  function mv(t, e) {
    return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
  }
  var Ye = typeof Object.is == "function" ? Object.is : mv;
  function kn(t, e) {
    if (Ye(t, e)) return !0;
    if (typeof t != "object" || t === null || typeof e != "object" || e === null)
      return !1;
    var l = Object.keys(t), a = Object.keys(e);
    if (l.length !== a.length) return !1;
    for (a = 0; a < l.length; a++) {
      var n = l[a];
      if (!ve.call(e, n) || !Ye(t[n], e[n]))
        return !1;
    }
    return !0;
  }
  function Hc(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  function tr(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function er(t, e) {
    var l = tr(t);
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
      l = tr(l);
    }
  }
  function lr(t, e) {
    return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? lr(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
  }
  function ar(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var e = Hc(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var l = typeof e.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) t = e.contentWindow;
      else break;
      e = Hc(t.document);
    }
    return e;
  }
  function Bc(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
  }
  var hv = Ol && "documentMode" in document && 11 >= document.documentMode, tn = null, qc = null, Wn = null, Yc = !1;
  function nr(t, e, l) {
    var a = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Yc || tn == null || tn !== Hc(a) || (a = tn, "selectionStart" in a && Bc(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), Wn && kn(Wn, a) || (Wn = a, a = Ii(qc, "onSelect"), 0 < a.length && (e = new ku(
      "onSelect",
      "select",
      null,
      e,
      l
    ), t.push({ event: e, listeners: a }), e.target = tn)));
  }
  function ba(t, e) {
    var l = {};
    return l[t.toLowerCase()] = e.toLowerCase(), l["Webkit" + t] = "webkit" + e, l["Moz" + t] = "moz" + e, l;
  }
  var en = {
    animationend: ba("Animation", "AnimationEnd"),
    animationiteration: ba("Animation", "AnimationIteration"),
    animationstart: ba("Animation", "AnimationStart"),
    transitionrun: ba("Transition", "TransitionRun"),
    transitionstart: ba("Transition", "TransitionStart"),
    transitioncancel: ba("Transition", "TransitionCancel"),
    transitionend: ba("Transition", "TransitionEnd")
  }, wc = {}, ur = {};
  Ol && (ur = document.createElement("div").style, "AnimationEvent" in window || (delete en.animationend.animation, delete en.animationiteration.animation, delete en.animationstart.animation), "TransitionEvent" in window || delete en.transitionend.transition);
  function pa(t) {
    if (wc[t]) return wc[t];
    if (!en[t]) return t;
    var e = en[t], l;
    for (l in e)
      if (e.hasOwnProperty(l) && l in ur)
        return wc[t] = e[l];
    return t;
  }
  var ir = pa("animationend"), cr = pa("animationiteration"), fr = pa("animationstart"), vv = pa("transitionrun"), yv = pa("transitionstart"), gv = pa("transitioncancel"), sr = pa("transitionend"), or = /* @__PURE__ */ new Map(), Lc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Lc.push("scrollEnd");
  function al(t, e) {
    or.set(t, e), ga(e, [t]);
  }
  var bv = 0;
  function Al(t, e) {
    if (t.name != null && t.name !== "auto") return t.name;
    if (e.autoName !== null) return e.autoName;
    t = cl.identifierPrefix;
    var l = bv++;
    return t = "_" + t + "t_" + l.toString(32) + "_", e.autoName = t;
  }
  function rr(t) {
    if (t == null || typeof t == "string")
      return t;
    var e = null, l = Tn;
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
  function Cl(t, e) {
    return t = rr(t), e = rr(e), e == null ? t === "auto" ? null : t : e === "auto" ? null : e;
  }
  var Pu = typeof reportError == "function" ? reportError : function(t) {
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
  }, $e = [], ln = 0, Gc = 0;
  function ti() {
    for (var t = ln, e = Gc = ln = 0; e < t; ) {
      var l = $e[e];
      $e[e++] = null;
      var a = $e[e];
      $e[e++] = null;
      var n = $e[e];
      $e[e++] = null;
      var u = $e[e];
      if ($e[e++] = null, a !== null && n !== null) {
        var i = a.pending;
        i === null ? n.next = n : (n.next = i.next, i.next = n), a.pending = n;
      }
      u !== 0 && dr(l, n, u);
    }
  }
  function ei(t, e, l, a) {
    $e[ln++] = t, $e[ln++] = e, $e[ln++] = l, $e[ln++] = a, Gc |= a, t.lanes |= a, t = t.alternate, t !== null && (t.lanes |= a);
  }
  function Xc(t, e, l, a) {
    return ei(t, e, l, a), li(t);
  }
  function Sa(t, e) {
    return ei(t, null, null, e), li(t);
  }
  function dr(t, e, l) {
    t.lanes |= l;
    var a = t.alternate;
    a !== null && (a.lanes |= l);
    for (var n = !1, u = t.return; u !== null; )
      u.childLanes |= l, a = u.alternate, a !== null && (a.childLanes |= l), u.tag === 22 && (t = u.stateNode, t === null || t._visibility & 1 || (n = !0)), t = u, u = u.return;
    return t.tag === 3 ? (u = t.stateNode, n && e !== null && (n = 31 - Be(l), t = u.hiddenUpdates, a = t[n], a === null ? t[n] = [e] : a.push(e), e.lane = l | 536870912), u) : null;
  }
  function li(t) {
    if (50 < pu)
      throw pu = 0, Zi = null, Error(o(185));
    for (var e = t.return; e !== null; )
      t = e, e = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var an = {};
  function pv(t, e, l, a) {
    this.tag = t, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Ae(t, e, l, a) {
    return new pv(t, e, l, a);
  }
  function Qc(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function xl(t, e) {
    var l = t.alternate;
    return l === null ? (l = Ae(
      t.tag,
      e,
      t.key,
      t.mode
    ), l.elementType = t.elementType, l.type = t.type, l.stateNode = t.stateNode, l.alternate = t, t.alternate = l) : (l.pendingProps = e, l.type = t.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = t.flags & 1206910976, l.childLanes = t.childLanes, l.lanes = t.lanes, l.child = t.child, l.memoizedProps = t.memoizedProps, l.memoizedState = t.memoizedState, l.updateQueue = t.updateQueue, e = t.dependencies, l.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }, l.sibling = t.sibling, l.index = t.index, l.ref = t.ref, l.refCleanup = t.refCleanup, l;
  }
  function mr(t, e) {
    t.flags &= 1206910978;
    var l = t.alternate;
    return l === null ? (t.childLanes = 0, t.lanes = e, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = l.childLanes, t.lanes = l.lanes, t.child = l.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = l.memoizedProps, t.memoizedState = l.memoizedState, t.updateQueue = l.updateQueue, t.type = l.type, e = l.dependencies, t.dependencies = e === null ? null : {
      lanes: e.lanes,
      firstContext: e.firstContext
    }), t;
  }
  function ai(t, e, l, a, n, u) {
    var i = 0;
    if (a = t, typeof a == "function") Qc(a) && (i = 1);
    else if (typeof a == "string")
      i = Jy(
        t,
        l,
        G.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (a) {
        case ue:
          return t = Ae(31, l, e, n), t.elementType = ue, t.lanes = u, t;
        case tt:
          return _a(l.children, n, u, e);
        case bt:
          i = 8, n |= 24;
          break;
        case qt:
          return t = Ae(12, l, e, n | 2), t.elementType = qt, t.lanes = u, t;
        case U:
          return t = Ae(13, l, e, n), t.elementType = U, t.lanes = u, t;
        case Z:
          return t = Ae(19, l, e, n), t.elementType = Z, t.lanes = u, t;
        case Qt:
        case y:
          return t = n | 32, t = Ae(30, l, e, t), t.elementType = y, t.lanes = u, t.stateNode = {
            autoName: null,
            paired: null,
            clones: null,
            ref: null
          }, t;
        default:
          if (typeof a == "object" && a !== null)
            switch (a.$$typeof) {
              case V:
                i = 10;
                break t;
              case $t:
                i = 9;
                break t;
              case x:
                i = 11;
                break t;
              case ht:
                i = 14;
                break t;
              case it:
                i = 16, a = null;
                break t;
            }
          i = 29, l = Error(
            o(130, t === null ? "null" : typeof t, "")
          ), a = null;
      }
    return e = Ae(i, l, e, n), e.elementType = t, e.type = a, e.lanes = u, e;
  }
  function _a(t, e, l, a) {
    return t = Ae(7, t, a, e), t.lanes = l, t;
  }
  function Vc(t, e, l) {
    return t = Ae(6, t, null, e), t.lanes = l, t;
  }
  function hr(t) {
    var e = Ae(18, null, null, 0);
    return e.stateNode = t, e;
  }
  function Zc(t, e, l) {
    return e = Ae(
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
  var vr = /* @__PURE__ */ new WeakMap();
  function Fe(t, e) {
    if (typeof t == "object" && t !== null) {
      var l = vr.get(t);
      return l !== void 0 ? l : (e = {
        value: t,
        source: e,
        stack: Me(e)
      }, vr.set(t, e), e);
    }
    return {
      value: t,
      source: e,
      stack: Me(e)
    };
  }
  var nn = [], un = 0, ni = null, In = 0, ke = [], We = 0, Ql = null, ml = 1, hl = "";
  function Dl(t, e) {
    nn[un++] = In, nn[un++] = ni, ni = t, In = e;
  }
  function yr(t, e, l) {
    ke[We++] = ml, ke[We++] = hl, ke[We++] = Ql, Ql = t;
    var a = ml;
    t = hl;
    var n = 32 - Be(a) - 1;
    a &= ~(1 << n), l += 1;
    var u = 32 - Be(e) + n;
    if (30 < u) {
      var i = n - n % 5;
      u = (a & (1 << i) - 1).toString(32), a >>= i, n -= i, ml = 1 << 32 - Be(e) + n | l << n | a, hl = u + t;
    } else
      ml = 1 << u | l << n | a, hl = t;
  }
  function ui(t) {
    t.return !== null && (Dl(t, 1), yr(t, 1, 0));
  }
  function Kc(t) {
    for (; t === ni; )
      ni = nn[--un], nn[un] = null, In = nn[--un], nn[un] = null;
    for (; t === Ql; )
      Ql = ke[--We], ke[We] = null, hl = ke[--We], ke[We] = null, ml = ke[--We], ke[We] = null;
  }
  function gr(t, e) {
    ke[We++] = ml, ke[We++] = hl, ke[We++] = Ql, ml = e.id, hl = e.overflow, Ql = t;
  }
  var le = null, Yt = null, mt = !1, Vl = null, Ie = !1, Jc = Error(o(519));
  function Zl(t) {
    var e = Error(
      o(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Pn(Fe(e, t)), Jc;
  }
  function br(t) {
    var e = t.stateNode, l = t.type, a = t.memoizedProps;
    switch (e[ie] = t, e[Oe] = a, l) {
      case "dialog":
        gt("cancel", e), gt("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        gt("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < _u.length; l++)
          gt(_u[l], e);
        break;
      case "source":
        gt("error", e);
        break;
      case "img":
      case "image":
      case "link":
        gt("error", e), gt("load", e);
        break;
      case "details":
        gt("toggle", e);
        break;
      case "input":
        gt("invalid", e), xo(
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
        gt("invalid", e);
        break;
      case "textarea":
        gt("invalid", e), jo(e, a.value, a.defaultValue, a.children);
    }
    l = a.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || e.textContent === "" + l || a.suppressHydrationWarning === !0 || wm(e.textContent, l) ? (a.popover != null && (gt("beforetoggle", e), gt("toggle", e)), a.onScroll != null && gt("scroll", e), a.onScrollEnd != null && gt("scrollend", e), a.onClick != null && (e.onclick = dl), e = !0) : e = !1, e || Zl(t, !0);
  }
  function ii(t) {
    for (le = t.return; le; )
      switch (le.tag) {
        case 5:
        case 31:
        case 13:
          Ie = !1;
          return;
        case 27:
        case 3:
          Ie = !0;
          return;
        default:
          le = le.return;
      }
  }
  function cn(t) {
    if (t !== le) return !1;
    if (!mt) return ii(t), mt = !0, !1;
    var e = t.tag, l;
    if ((l = e !== 3 && e !== 27) && ((l = e === 5) && (l = t.type, l = !(l !== "form" && l !== "button") || Ns(t.type, t.memoizedProps)), l = !l), l && Yt && Zl(t), ii(t), e === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(o(317));
      Yt = n0(t);
    } else if (e === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(o(317));
      Yt = n0(t);
    } else
      e === 27 ? (e = Yt, ca(t.type) ? (t = Rs, Rs = null, Yt = t) : Yt = e) : Yt = le ? tl(t.stateNode.nextSibling) : null;
    return !0;
  }
  function Ta() {
    Yt = le = null, mt = !1;
  }
  function $c() {
    var t = Vl;
    return t !== null && (De === null ? De = t : De.push.apply(
      De,
      t
    ), Vl = null), t;
  }
  function Pn(t) {
    Vl === null ? Vl = [t] : Vl.push(t);
  }
  var Fc = be(null), Ea = null, jl = null;
  function Kl(t, e, l) {
    B(Fc, e._currentValue), e._currentValue = l;
  }
  function Rl(t) {
    t._currentValue = Fc.current, Kt(Fc);
  }
  function ci(t, e, l) {
    for (; t !== null; ) {
      var a = t.alternate;
      if ((t.childLanes & e) !== e ? (t.childLanes |= e, a !== null && (a.childLanes |= e)) : a !== null && (a.childLanes & e) !== e && (a.childLanes |= e), t === l) break;
      t = t.return;
    }
  }
  function kc(t, e, l, a) {
    var n = t.child;
    for (n !== null && (n.return = t); n !== null; ) {
      var u = n.dependencies;
      if (u !== null) {
        var i = n.child;
        u = u.firstContext;
        t: for (; u !== null; ) {
          var s = u;
          u = n;
          for (var d = 0; d < e.length; d++)
            if (s.context === e[d]) {
              u.lanes |= l, s = u.alternate, s !== null && (s.lanes |= l), ci(
                u.return,
                l,
                t
              ), a || (i = null);
              break t;
            }
          u = s.next;
        }
      } else if (n.tag === 18) {
        if (i = n.return, i === null) throw Error(o(341));
        i.lanes |= l, u = i.alternate, u !== null && (u.lanes |= l), ci(i, l, t), i = null;
      } else
        n.tag === 13 && n.memoizedState !== null && n.memoizedState.dehydrated === null ? (n.lanes |= l, i = n.alternate, i !== null && (i.lanes |= l), ci(
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
  function Na(t, e, l, a) {
    t = null;
    for (var n = e, u = !1; n !== null; ) {
      if (!u) {
        if ((n.flags & 524288) !== 0) u = !0;
        else if ((n.flags & 262144) !== 0) break;
      }
      if (n.tag === 10) {
        var i = n.alternate;
        if (i === null) throw Error(o(387));
        if (i = i.memoizedProps, i !== null) {
          var s = n.type;
          Ye(n.pendingProps.value, i.value) || (t !== null ? t.push(s) : t = [s]);
        }
      } else if (n === Ne.current) {
        if (i = n.alternate, i === null) throw Error(o(387));
        i.memoizedState.memoizedState !== n.memoizedState.memoizedState && (t !== null ? t.push(jn) : t = [jn]);
      }
      n = n.return;
    }
    return t !== null && kc(
      e,
      t,
      l,
      a
    ), e.flags |= 262144, t !== null;
  }
  function fi(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!Ye(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function za(t) {
    Ea = t, jl = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function ce(t) {
    return pr(Ea, t);
  }
  function si(t, e) {
    return Ea === null && za(t), pr(t, e);
  }
  function pr(t, e) {
    var l = e._currentValue;
    if (e = { context: e, memoizedValue: l, next: null }, jl === null) {
      if (t === null) throw Error(o(308));
      jl = e, t.dependencies = { lanes: 0, firstContext: e }, t.flags |= 524288;
    } else jl = jl.next = e;
    return l;
  }
  var Sv = typeof AbortController < "u" ? AbortController : function() {
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
  }, _v = c.unstable_scheduleCallback, Tv = c.unstable_NormalPriority, Ft = {
    $$typeof: V,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Wc() {
    return {
      controller: new Sv(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function tu(t) {
    t.refCount--, t.refCount === 0 && _v(Tv, function() {
      t.controller.abort();
    });
  }
  function Sr(t, e) {
    if ((t.pendingLanes & 4194048) !== 0) {
      var l = t.transitionTypes;
      for (l === null && (l = t.transitionTypes = []), t = 0; t < e.length; t++) {
        var a = e[t];
        l.indexOf(a) === -1 && l.push(a);
      }
    }
  }
  var eu = null;
  function Ev(t) {
    var e = t.transitionTypes;
    return t.transitionTypes = null, e;
  }
  var lu = null, Ic = 0, Ma = 0, fn = null;
  function Nv(t, e) {
    if (lu === null) {
      var l = lu = [];
      Ic = 0, Ma = vs(), fn = {
        status: "pending",
        value: void 0,
        then: function(a) {
          l.push(a);
        }
      };
    }
    return Ic++, e.then(_r, _r), e;
  }
  function _r() {
    if (--Ic === 0 && (eu = null, lu !== null)) {
      fn !== null && (fn.status = "fulfilled");
      var t = lu;
      lu = null, Ma = 0, fn = null;
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function zv(t, e) {
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
  var Tr = X.S;
  X.S = function(t, e) {
    if (hm = Ue(), typeof e == "object" && e !== null && typeof e.then == "function" && Nv(t, e), eu !== null)
      for (var l = Mn; l !== null; )
        Sr(l, eu), l = l.next;
    if (l = t.types, l !== null) {
      for (var a = Mn; a !== null; )
        Sr(a, l), a = a.next;
      if (Ma !== 0) {
        a = eu, a === null && (a = eu = []);
        for (var n = 0; n < l.length; n++) {
          var u = l[n];
          a.indexOf(u) === -1 && a.push(u);
        }
      }
    }
    Tr !== null && Tr(t, e);
  };
  var Oa = be(null);
  function Pc() {
    var t = Oa.current;
    return t !== null ? t : Ht.pooledCache;
  }
  function oi(t, e) {
    e === null ? B(Oa, Oa.current) : B(Oa, e.pool);
  }
  function Er() {
    var t = Pc();
    return t === null ? null : { parent: Ft._currentValue, pool: t };
  }
  var sn = Error(o(460)), tf = Error(o(474)), ri = Error(o(542)), di = { then: function() {
  } };
  function Nr(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function zr(t, e, l) {
    switch (l = t[l], l === void 0 ? t.push(e) : l !== e && (e.then(dl, dl), e = l), e.status) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw t = e.reason, Or(t), t === void 0 && !("reason" in e) ? Error(o(600)) : t;
      default:
        if (typeof e.status == "string") e.then(dl, dl);
        else {
          if (t = Ht, t !== null && 100 < t.shellSuspendCounter)
            throw Error(o(482));
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
            throw t = e.reason, Or(t), t;
        }
        throw Ca = e, sn;
    }
  }
  function Aa(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (Ca = l, sn) : l;
    }
  }
  var Ca = null;
  function Mr() {
    if (Ca === null) throw Error(o(459));
    var t = Ca;
    return Ca = null, t;
  }
  function Or(t) {
    if (t === sn || t === ri)
      throw Error(o(483));
  }
  var on = null, au = 0;
  function mi(t) {
    var e = au;
    return au += 1, on === null && (on = []), zr(on, t, e);
  }
  function Jl(t, e) {
    e = e.props.ref, t.ref = e !== void 0 ? e : null;
  }
  function hi(t, e) {
    throw e.$$typeof === P ? Error(o(525)) : (t = Object.prototype.toString.call(e), Error(
      o(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t
      )
    ));
  }
  function Ar(t) {
    function e(p, v) {
      if (t) {
        var _ = p.deletions;
        _ === null ? (p.deletions = [v], p.flags |= 16) : _.push(v);
      }
    }
    function l(p, v) {
      if (!t) return null;
      for (; v !== null; )
        e(p, v), v = v.sibling;
      return null;
    }
    function a(p) {
      for (var v = /* @__PURE__ */ new Map(); p !== null; )
        p.key === null ? v.set(p.index, p) : v.set(p.key, p), p = p.sibling;
      return v;
    }
    function n(p, v) {
      return p = xl(p, v), p.index = 0, p.sibling = null, p;
    }
    function u(p, v, _) {
      return p.index = _, t ? (_ = p.alternate, _ !== null ? (_ = _.index, _ < v ? (p.flags |= 2, v) : _) : (p.flags |= 134217730, v)) : (p.flags |= 1048576, v);
    }
    function i(p) {
      return t && p.alternate === null && (p.flags |= 134217730), p;
    }
    function s(p, v, _, A) {
      return v === null || v.tag !== 6 ? (v = Vc(_, p.mode, A), v.return = p, v) : (v = n(v, _), v.return = p, v);
    }
    function d(p, v, _, A) {
      var Q = _.type;
      return Q === tt ? (p = N(
        p,
        v,
        _.props.children,
        A,
        _.key
      ), Jl(p, _), p) : v !== null && (v.elementType === Q || typeof Q == "object" && Q !== null && Q.$$typeof === it && Aa(Q) === v.type) ? (v = n(v, _.props), Jl(v, _), v.return = p, v) : (v = ai(
        _.type,
        _.key,
        _.props,
        null,
        p.mode,
        A
      ), Jl(v, _), v.return = p, v);
    }
    function S(p, v, _, A) {
      return v === null || v.tag !== 4 || v.stateNode.containerInfo !== _.containerInfo || v.stateNode.implementation !== _.implementation ? (v = Zc(_, p.mode, A), v.return = p, v) : (v = n(v, _.children || []), v.return = p, v);
    }
    function N(p, v, _, A, Q) {
      return v === null || v.tag !== 7 ? (v = _a(
        _,
        p.mode,
        A,
        Q
      ), v.return = p, v) : (v = n(v, _), v.return = p, v);
    }
    function C(p, v, _) {
      if (typeof v == "string" && v !== "" || typeof v == "number" || typeof v == "bigint")
        return v = Vc(
          "" + v,
          p.mode,
          _
        ), v.return = p, v;
      if (typeof v == "object" && v !== null) {
        switch (v.$$typeof) {
          case rt:
            return _ = ai(
              v.type,
              v.key,
              v.props,
              null,
              p.mode,
              _
            ), Jl(_, v), _.return = p, _;
          case et:
            return v = Zc(
              v,
              p.mode,
              _
            ), v.return = p, v;
          case it:
            return v = Aa(v), C(p, v, _);
        }
        if (vt(v) || $(v))
          return v = _a(
            v,
            p.mode,
            _,
            null
          ), v.return = p, v;
        if (typeof v.then == "function")
          return C(p, mi(v), _);
        if (v.$$typeof === V)
          return C(
            p,
            si(p, v),
            _
          );
        hi(p, v);
      }
      return null;
    }
    function b(p, v, _, A) {
      var Q = v !== null ? v.key : null;
      if (typeof _ == "string" && _ !== "" || typeof _ == "number" || typeof _ == "bigint")
        return Q !== null ? null : s(p, v, "" + _, A);
      if (typeof _ == "object" && _ !== null) {
        switch (_.$$typeof) {
          case rt:
            return _.key === Q ? d(p, v, _, A) : null;
          case et:
            return _.key === Q ? S(p, v, _, A) : null;
          case it:
            return _ = Aa(_), b(p, v, _, A);
        }
        if (vt(_) || $(_))
          return Q !== null ? null : N(p, v, _, A, null);
        if (typeof _.then == "function")
          return b(
            p,
            v,
            mi(_),
            A
          );
        if (_.$$typeof === V)
          return b(
            p,
            v,
            si(p, _),
            A
          );
        hi(p, _);
      }
      return null;
    }
    function T(p, v, _, A, Q) {
      if (typeof A == "string" && A !== "" || typeof A == "number" || typeof A == "bigint")
        return p = p.get(_) || null, s(v, p, "" + A, Q);
      if (typeof A == "object" && A !== null) {
        switch (A.$$typeof) {
          case rt:
            return p = p.get(
              A.key === null ? _ : A.key
            ) || null, d(v, p, A, Q);
          case et:
            return p = p.get(
              A.key === null ? _ : A.key
            ) || null, S(v, p, A, Q);
          case it:
            return A = Aa(A), T(
              p,
              v,
              _,
              A,
              Q
            );
        }
        if (vt(A) || $(A))
          return p = p.get(_) || null, N(v, p, A, Q, null);
        if (typeof A.then == "function")
          return T(
            p,
            v,
            _,
            mi(A),
            Q
          );
        if (A.$$typeof === V)
          return T(
            p,
            v,
            _,
            si(v, A),
            Q
          );
        hi(v, A);
      }
      return null;
    }
    function L(p, v, _, A) {
      for (var Q = null, _t = null, k = v, lt = v = 0, It = null; k !== null && lt < _.length; lt++) {
        k.index > lt ? (It = k, k = null) : It = k.sibling;
        var Et = b(
          p,
          k,
          _[lt],
          A
        );
        if (Et === null) {
          k === null && (k = It);
          break;
        }
        t && k && Et.alternate === null && e(p, k), v = u(Et, v, lt), _t === null ? Q = Et : _t.sibling = Et, _t = Et, k = It;
      }
      if (lt === _.length)
        return l(p, k), mt && Dl(p, lt), Q;
      if (k === null) {
        for (; lt < _.length; lt++)
          k = C(p, _[lt], A), k !== null && (v = u(
            k,
            v,
            lt
          ), _t === null ? Q = k : _t.sibling = k, _t = k);
        return mt && Dl(p, lt), Q;
      }
      for (k = a(k); lt < _.length; lt++)
        It = T(
          k,
          p,
          lt,
          _[lt],
          A
        ), It !== null && (t && (Et = It.alternate, Et !== null && k.delete(Et.key === null ? lt : Et.key)), v = u(
          It,
          v,
          lt
        ), _t === null ? Q = It : _t.sibling = It, _t = It);
      return t && k.forEach(function(da) {
        return e(p, da);
      }), mt && Dl(p, lt), Q;
    }
    function K(p, v, _, A) {
      if (_ == null) throw Error(o(151));
      for (var Q = null, _t = null, k = v, lt = v = 0, It = null, Et = _.next(); k !== null && !Et.done; lt++, Et = _.next()) {
        k.index > lt ? (It = k, k = null) : It = k.sibling;
        var da = b(p, k, Et.value, A);
        if (da === null) {
          k === null && (k = It);
          break;
        }
        t && k && da.alternate === null && e(p, k), v = u(da, v, lt), _t === null ? Q = da : _t.sibling = da, _t = da, k = It;
      }
      if (Et.done)
        return l(p, k), mt && Dl(p, lt), Q;
      if (k === null) {
        for (; !Et.done; lt++, Et = _.next())
          Et = C(p, Et.value, A), Et !== null && (v = u(Et, v, lt), _t === null ? Q = Et : _t.sibling = Et, _t = Et);
        return mt && Dl(p, lt), Q;
      }
      for (k = a(k); !Et.done; lt++, Et = _.next())
        Et = T(k, p, lt, Et.value, A), Et !== null && (t && (It = Et.alternate, It !== null && k.delete(
          It.key === null ? lt : It.key
        )), v = u(Et, v, lt), _t === null ? Q = Et : _t.sibling = Et, _t = Et);
      return t && k.forEach(function(ug) {
        return e(p, ug);
      }), mt && Dl(p, lt), Q;
    }
    function st(p, v, _, A) {
      if (typeof _ == "object" && _ !== null && _.type === tt && _.key === null && _.props.ref === void 0 && (_ = _.props.children), typeof _ == "object" && _ !== null) {
        switch (_.$$typeof) {
          case rt:
            t: {
              for (var Q = _.key; v !== null; ) {
                if (v.key === Q) {
                  if (Q = _.type, Q === tt) {
                    if (v.tag === 7) {
                      l(
                        p,
                        v.sibling
                      ), A = n(
                        v,
                        _.props.children
                      ), Jl(A, _), A.return = p, p = A;
                      break t;
                    }
                  } else if (v.elementType === Q || typeof Q == "object" && Q !== null && Q.$$typeof === it && Aa(Q) === v.type) {
                    l(
                      p,
                      v.sibling
                    ), A = n(v, _.props), Jl(A, _), A.return = p, p = A;
                    break t;
                  }
                  l(p, v);
                  break;
                } else e(p, v);
                v = v.sibling;
              }
              _.type === tt ? (A = _a(
                _.props.children,
                p.mode,
                A,
                _.key
              ), Jl(A, _), A.return = p, p = A) : (A = ai(
                _.type,
                _.key,
                _.props,
                null,
                p.mode,
                A
              ), Jl(A, _), A.return = p, p = A);
            }
            return i(p);
          case et:
            t: {
              for (Q = _.key; v !== null; ) {
                if (v.key === Q)
                  if (v.tag === 4 && v.stateNode.containerInfo === _.containerInfo && v.stateNode.implementation === _.implementation) {
                    l(
                      p,
                      v.sibling
                    ), A = n(v, _.children || []), A.return = p, p = A;
                    break t;
                  } else {
                    l(p, v);
                    break;
                  }
                else e(p, v);
                v = v.sibling;
              }
              A = Zc(_, p.mode, A), A.return = p, p = A;
            }
            return i(p);
          case it:
            return _ = Aa(_), st(
              p,
              v,
              _,
              A
            );
        }
        if (vt(_))
          return L(
            p,
            v,
            _,
            A
          );
        if ($(_)) {
          if (Q = $(_), typeof Q != "function") throw Error(o(150));
          return _ = Q.call(_), K(
            p,
            v,
            _,
            A
          );
        }
        if (typeof _.then == "function")
          return st(
            p,
            v,
            mi(_),
            A
          );
        if (_.$$typeof === V)
          return st(
            p,
            v,
            si(p, _),
            A
          );
        hi(p, _);
      }
      return typeof _ == "string" && _ !== "" || typeof _ == "number" || typeof _ == "bigint" ? (_ = "" + _, v !== null && v.tag === 6 ? (l(p, v.sibling), A = n(v, _), A.return = p, p = A) : (l(p, v), A = Vc(_, p.mode, A), A.return = p, p = A), i(p)) : l(p, v);
    }
    return function(p, v, _, A) {
      try {
        au = 0;
        var Q = st(
          p,
          v,
          _,
          A
        );
        return on = null, Q;
      } catch (k) {
        if (k === sn || k === ri) throw k;
        var _t = Ae(29, k, null, p.mode);
        return _t.lanes = A, _t.return = p, _t;
      }
    };
  }
  var xa = Ar(!0), Cr = Ar(!1), $l = !1;
  function ef(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function lf(t, e) {
    t = t.updateQueue, e.updateQueue === t && (e.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function Fl(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function kl(t, e, l) {
    var a = t.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (At & 2) !== 0) {
      var n = a.pending;
      return n === null ? e.next = e : (e.next = n.next, n.next = e), a.pending = e, e = li(t), dr(t, null, l), e;
    }
    return ei(t, a, e, l), li(t);
  }
  function nu(t, e, l) {
    if (e = e.updateQueue, e !== null && (e = e.shared, (l & 4194048) !== 0)) {
      var a = e.lanes;
      a &= t.pendingLanes, l |= a, e.lanes = l, yo(t, l);
    }
  }
  function af(t, e) {
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
  var nf = !1;
  function uu() {
    if (nf) {
      var t = fn;
      if (t !== null) throw t;
    }
  }
  function iu(t, e, l, a) {
    nf = !1;
    var n = t.updateQueue;
    $l = !1;
    var u = n.firstBaseUpdate, i = n.lastBaseUpdate, s = n.shared.pending;
    if (s !== null) {
      n.shared.pending = null;
      var d = s, S = d.next;
      d.next = null, i === null ? u = S : i.next = S, i = d;
      var N = t.alternate;
      N !== null && (N = N.updateQueue, s = N.lastBaseUpdate, s !== i && (s === null ? N.firstBaseUpdate = S : s.next = S, N.lastBaseUpdate = d));
    }
    if (u !== null) {
      var C = n.baseState;
      i = 0, N = S = d = null, s = u;
      do {
        var b = s.lane & -536870913, T = b !== s.lane;
        if (T ? (St & b) === b : (a & b) === b) {
          b !== 0 && b === Ma && (nf = !0), N !== null && (N = N.next = {
            lane: 0,
            tag: s.tag,
            payload: s.payload,
            callback: null,
            next: null
          });
          t: {
            var L = t, K = s;
            b = e;
            var st = l;
            switch (K.tag) {
              case 1:
                if (L = K.payload, typeof L == "function") {
                  C = L.call(st, C, b);
                  break t;
                }
                C = L;
                break t;
              case 3:
                L.flags = L.flags & -65537 | 128;
              case 0:
                if (L = K.payload, b = typeof L == "function" ? L.call(st, C, b) : L, b == null) break t;
                C = I({}, C, b);
                break t;
              case 2:
                $l = !0;
            }
          }
          b = s.callback, b !== null && (t.flags |= 64, T && (t.flags |= 8192), T = n.callbacks, T === null ? n.callbacks = [b] : T.push(b));
        } else
          T = {
            lane: b,
            tag: s.tag,
            payload: s.payload,
            callback: s.callback,
            next: null
          }, N === null ? (S = N = T, d = C) : N = N.next = T, i |= b;
        if (s = s.next, s === null) {
          if (s = n.shared.pending, s === null)
            break;
          T = s, s = T.next, T.next = null, n.lastBaseUpdate = T, n.shared.pending = null;
        }
      } while (!0);
      N === null && (d = C), n.baseState = d, n.firstBaseUpdate = S, n.lastBaseUpdate = N, u === null && (n.shared.lanes = 0), aa |= i, t.lanes = i, t.memoizedState = C;
    }
  }
  function xr(t, e) {
    if (typeof t != "function")
      throw Error(o(191, t));
    t.call(e);
  }
  function Dr(t, e) {
    var l = t.callbacks;
    if (l !== null)
      for (t.callbacks = null, t = 0; t < l.length; t++)
        xr(l[t], e);
  }
  var Wl = be(null), vi = be(0);
  function jr(t, e) {
    t = Yl, B(vi, t), B(Wl, e), Yl = t | e.baseLanes;
  }
  function uf() {
    B(vi, Yl), B(Wl, Wl.current);
  }
  function cf() {
    Yl = vi.current, Kt(Wl), Kt(vi);
  }
  var fe = be(null), ye = null;
  function Il(t) {
    var e = t.alternate;
    B(se, se.current & 1), B(fe, t), ye === null && (e === null || Wl.current !== null || e.memoizedState !== null) && (ye = t);
  }
  function ff(t) {
    B(se, se.current), B(fe, t), ye === null && (ye = t);
  }
  function Rr(t) {
    t.tag === 22 ? (B(se, se.current), B(fe, t), ye === null && (ye = t)) : Pl();
  }
  function Pl() {
    B(se, se.current), B(fe, fe.current);
  }
  function we(t) {
    Kt(fe), ye === t && (ye = null), Kt(se);
  }
  var se = be(0);
  function cu(t, e) {
    B(fe, fe.current), B(se, e);
  }
  function sf(t) {
    Kt(se), Kt(fe), ye === t && (ye = null);
  }
  function yi(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var l = e.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || Ds(l) || js(l)))
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
  var Ul = 0, ft = null, Ut = null, kt = null, gi = !1, rn = !1, Da = !1, bi = 0, fu = 0, dn = null, Mv = 0;
  function Vt() {
    throw Error(o(321));
  }
  function of(t, e) {
    if (e === null) return !1;
    for (var l = 0; l < e.length && l < t.length; l++)
      if (!Ye(t[l], e[l])) return !1;
    return !0;
  }
  function rf(t, e, l, a, n, u) {
    return Ul = u, ft = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, X.H = t === null || t.memoizedState === null ? yd : gd, Da = !1, u = l(a, n), Da = !1, rn && (u = Hr(
      e,
      l,
      a,
      n
    )), Ur(t), u;
  }
  function Ur(t) {
    X.H = zi;
    var e = Ut !== null && Ut.next !== null;
    if (Ul = 0, kt = Ut = ft = null, gi = !1, fu = 0, dn = null, e) throw Error(o(300));
    t === null || Wt || (t = t.dependencies, t !== null && fi(t) && (Wt = !0));
  }
  function Hr(t, e, l, a) {
    ft = t;
    var n = 0;
    do {
      if (rn && (dn = null), fu = 0, rn = !1, 25 <= n) throw Error(o(301));
      if (n += 1, kt = Ut = null, t.updateQueue != null) {
        var u = t.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      X.H = Uv, u = e(l, a);
    } while (rn);
    return u;
  }
  function Ov() {
    var t = X.H, e = t.useState()[0];
    return e = typeof e.then == "function" ? su(e) : e, t = t.useState()[0], (Ut !== null ? Ut.memoizedState : null) !== t && (ft.flags |= 1024), e;
  }
  function df() {
    var t = bi !== 0;
    return bi = 0, t;
  }
  function mf(t, e, l) {
    e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~l;
  }
  function hf(t) {
    if (gi) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        e !== null && (e.pending = null), t = t.next;
      }
      gi = !1;
    }
    Ul = 0, kt = Ut = ft = null, rn = !1, fu = bi = 0, dn = null;
  }
  function Se() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return kt === null ? ft.memoizedState = kt = t : kt = kt.next = t, kt;
  }
  function Jt() {
    if (Ut === null) {
      var t = ft.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Ut.next;
    var e = kt === null ? ft.memoizedState : kt.next;
    if (e !== null)
      kt = e, Ut = t;
    else {
      if (t === null)
        throw ft.alternate === null ? Error(o(467)) : Error(o(310));
      Ut = t, t = {
        memoizedState: Ut.memoizedState,
        baseState: Ut.baseState,
        baseQueue: Ut.baseQueue,
        queue: Ut.queue,
        next: null
      }, kt === null ? ft.memoizedState = kt = t : kt = kt.next = t;
    }
    return kt;
  }
  function pi() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function su(t) {
    var e = fu;
    return fu += 1, dn === null && (dn = []), t = zr(dn, t, e), e = ft, (kt === null ? e.memoizedState : kt.next) === null && (e = e.alternate, X.H = e === null || e.memoizedState === null ? yd : gd), t;
  }
  function Si(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return su(t);
      if (t.$$typeof === R) return;
      if (t.$$typeof === V) return ce(t);
    }
    throw Error(o(438, String(t)));
  }
  function vf(t) {
    var e = null, l = ft.updateQueue;
    if (l !== null && (e = l.memoCache), e == null) {
      var a = ft.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (e = {
        data: a.data.map(function(n) {
          return n.slice();
        }),
        index: 0
      })));
    }
    if (e == null && (e = { data: [], index: 0 }), l === null && (l = pi(), ft.updateQueue = l), l.memoCache = e, l = e.data[e.index], l === void 0)
      for (l = e.data[e.index] = Array(t), a = 0; a < t; a++)
        l[a] = Re;
    return e.index++, l;
  }
  function Hl(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function _i(t) {
    var e = Jt();
    return yf(e, Ut, t);
  }
  function yf(t, e, l) {
    var a = t.queue;
    if (a === null) throw Error(o(311));
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
      var s = i = null, d = null, S = e, N = !1;
      do {
        var C = S.lane & -536870913;
        if (C !== S.lane ? (St & C) === C : (Ul & C) === C) {
          var b = S.revertLane;
          if (b === 0)
            d !== null && (d = d.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: S.action,
              hasEagerState: S.hasEagerState,
              eagerState: S.eagerState,
              next: null
            }), C === Ma && (N = !0);
          else if ((Ul & b) === b) {
            S = S.next, b === Ma && (N = !0);
            continue;
          } else
            C = {
              lane: 0,
              revertLane: S.revertLane,
              gesture: null,
              action: S.action,
              hasEagerState: S.hasEagerState,
              eagerState: S.eagerState,
              next: null
            }, d === null ? (s = d = C, i = u) : d = d.next = C, ft.lanes |= b, aa |= b;
          C = S.action, Da && l(u, C), u = S.hasEagerState ? S.eagerState : l(u, C);
        } else
          b = {
            lane: C,
            revertLane: S.revertLane,
            gesture: S.gesture,
            action: S.action,
            hasEagerState: S.hasEagerState,
            eagerState: S.eagerState,
            next: null
          }, d === null ? (s = d = b, i = u) : d = d.next = b, ft.lanes |= C, aa |= C;
        S = S.next;
      } while (S !== null && S !== e);
      if (d === null ? i = u : d.next = s, !Ye(u, t.memoizedState) && (Wt = !0, N && (l = fn, l !== null)))
        throw l;
      t.memoizedState = u, t.baseState = i, t.baseQueue = d, a.lastRenderedState = u;
    }
    return n === null && (a.lanes = 0), [t.memoizedState, a.dispatch];
  }
  function gf(t) {
    var e = Jt(), l = e.queue;
    if (l === null) throw Error(o(311));
    l.lastRenderedReducer = t;
    var a = l.dispatch, n = l.pending, u = e.memoizedState;
    if (n !== null) {
      l.pending = null;
      var i = n = n.next;
      do
        u = t(u, i.action), i = i.next;
      while (i !== n);
      Ye(u, e.memoizedState) || (Wt = !0), e.memoizedState = u, e.baseQueue === null && (e.baseState = u), l.lastRenderedState = u;
    }
    return [u, a];
  }
  function Br(t, e, l) {
    var a = ft, n = Jt(), u = mt;
    if (u) {
      if (l === void 0) throw Error(o(407));
      l = l();
    } else l = e();
    var i = !Ye(
      (Ut || n).memoizedState,
      l
    );
    if (i && (n.memoizedState = l, Wt = !0), n = n.queue, Sf(wr.bind(null, a, n, t), [
      t
    ]), t = n.getSnapshot !== e || i || kt !== null && (kt.memoizedState.tag & 1) !== 0, mn(
      t ? 9 : 8,
      { destroy: void 0 },
      Yr.bind(null, a, n, l, e),
      null
    ), t) {
      if (a.flags |= 2048, Ht === null) throw Error(o(349));
      u || (Ul & 127) !== 0 || qr(a, e, l);
    }
    return l;
  }
  function qr(t, e, l) {
    t.flags |= 16384, t = { getSnapshot: e, value: l }, e = ft.updateQueue, e === null ? (e = pi(), ft.updateQueue = e, e.stores = [t]) : (l = e.stores, l === null ? e.stores = [t] : l.push(t));
  }
  function Yr(t, e, l, a) {
    e.value = l, e.getSnapshot = a, Lr(e) && Gr(t);
  }
  function wr(t, e, l) {
    return l(function() {
      Lr(e) && Gr(t);
    });
  }
  function Lr(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var l = e();
      return !Ye(t, l);
    } catch {
      return !0;
    }
  }
  function Gr(t) {
    var e = Sa(t, 2);
    e !== null && je(e, t, 2);
  }
  function bf(t) {
    var e = Se();
    if (typeof t == "function") {
      var l = t;
      if (t = l(), Da) {
        Ll(!0);
        try {
          l();
        } finally {
          Ll(!1);
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
  function Xr(t, e, l, a) {
    return t.baseState = l, yf(
      t,
      Ut,
      typeof a == "function" ? a : Hl
    );
  }
  function Av(t, e, l, a, n) {
    if (Ni(t)) throw Error(o(485));
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
      X.T !== null ? l(!0) : u.isTransition = !1, a(u), l = e.pending, l === null ? (u.next = e.pending = u, Qr(e, u)) : (u.next = l.next, e.pending = l.next = u);
    }
  }
  function Qr(t, e) {
    var l = e.action, a = e.payload, n = t.state;
    if (e.isTransition) {
      var u = X.T, i = {};
      i.types = u !== null ? u.types : null, X.T = i;
      try {
        var s = l(n, a), d = X.S;
        d !== null && d(i, s), Vr(t, e, s);
      } catch (S) {
        pf(t, e, S);
      } finally {
        u !== null && i.types !== null && (u.types = i.types), X.T = u;
      }
    } else
      try {
        u = l(n, a), Vr(t, e, u);
      } catch (S) {
        pf(t, e, S);
      }
  }
  function Vr(t, e, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(a) {
        Zr(t, e, a);
      },
      function(a) {
        return pf(t, e, a);
      }
    ) : Zr(t, e, l);
  }
  function Zr(t, e, l) {
    e.status = "fulfilled", e.value = l, Kr(e), t.state = l, e = t.pending, e !== null && (l = e.next, l === e ? t.pending = null : (l = l.next, e.next = l, Qr(t, l)));
  }
  function pf(t, e, l) {
    var a = t.pending;
    if (t.pending = null, a !== null) {
      a = a.next;
      do
        e.status = "rejected", e.reason = l, Kr(e), e = e.next;
      while (e !== a);
    }
    t.action = null;
  }
  function Kr(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function Jr(t, e) {
    return e;
  }
  function $r(t, e) {
    if (mt) {
      var l = Ht.formState;
      if (l !== null) {
        t: {
          var a = ft;
          if (mt) {
            if (Yt) {
              e: {
                for (var n = Yt, u = Ie; n.nodeType !== 8; ) {
                  if (!u) {
                    n = null;
                    break e;
                  }
                  if (n = tl(
                    n.nextSibling
                  ), n === null) {
                    n = null;
                    break e;
                  }
                }
                u = n.data, n = u === "F!" || u === "F" ? n : null;
              }
              if (n) {
                Yt = tl(
                  n.nextSibling
                ), a = n.data === "F!";
                break t;
              }
            }
            Zl(a);
          }
          a = !1;
        }
        a && (e = l[0]);
      }
    }
    return l = Se(), l.memoizedState = l.baseState = e, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Jr,
      lastRenderedState: e
    }, l.queue = a, l = md.bind(
      null,
      ft,
      a
    ), a.dispatch = l, a = bf(!1), u = zf.bind(
      null,
      ft,
      !1,
      a.queue
    ), a = Se(), n = {
      state: e,
      dispatch: null,
      action: t,
      pending: null
    }, a.queue = n, l = Av.bind(
      null,
      ft,
      n,
      u,
      l
    ), n.dispatch = l, a.memoizedState = t, [e, l, !1];
  }
  function Fr(t) {
    var e = Jt();
    return kr(e, Ut, t);
  }
  function kr(t, e, l) {
    if (e = yf(
      t,
      e,
      Jr
    )[0], t = _i(Hl)[0], typeof e == "object" && e !== null && typeof e.then == "function")
      try {
        var a = su(e);
      } catch (i) {
        throw i === sn ? ri : i;
      }
    else a = e;
    e = Jt();
    var n = e.queue, u = n.dispatch;
    return l !== e.memoizedState && (ft.flags |= 2048, mn(
      9,
      { destroy: void 0 },
      Cv.bind(null, n, l),
      null
    )), [a, u, t];
  }
  function Cv(t, e) {
    t.action = e;
  }
  function Wr(t) {
    var e = Jt(), l = Ut;
    if (l !== null)
      return kr(e, l, t);
    Jt(), e = e.memoizedState, l = Jt();
    var a = l.queue.dispatch;
    return l.memoizedState = t, [e, a, !1];
  }
  function mn(t, e, l, a) {
    return t = { tag: t, create: l, deps: a, inst: e, next: null }, e = ft.updateQueue, e === null && (e = pi(), ft.updateQueue = e), l = e.lastEffect, l === null ? e.lastEffect = t.next = t : (a = l.next, l.next = t, t.next = a, e.lastEffect = t), t;
  }
  function Ir() {
    return Jt().memoizedState;
  }
  function Ti(t, e, l, a) {
    var n = Se();
    ft.flags |= t, n.memoizedState = mn(
      1 | e,
      { destroy: void 0 },
      l,
      a === void 0 ? null : a
    );
  }
  function Ei(t, e, l, a) {
    var n = Jt();
    a = a === void 0 ? null : a;
    var u = n.memoizedState.inst;
    Ut !== null && a !== null && of(a, Ut.memoizedState.deps) ? n.memoizedState = mn(e, u, l, a) : (ft.flags |= t, n.memoizedState = mn(
      1 | e,
      u,
      l,
      a
    ));
  }
  function Pr(t, e) {
    Ti(8390656, 8, t, e);
  }
  function Sf(t, e) {
    Ei(2048, 8, t, e);
  }
  function xv(t) {
    ft.flags |= 4;
    var e = ft.updateQueue;
    if (e === null)
      e = pi(), ft.updateQueue = e, e.events = [t];
    else {
      var l = e.events;
      l === null ? e.events = [t] : l.push(t);
    }
  }
  function td(t) {
    var e = Jt().memoizedState;
    return xv({ ref: e, nextImpl: t }), function() {
      if ((At & 2) !== 0) throw Error(o(440));
      return e.impl.apply(void 0, arguments);
    };
  }
  function ed(t, e) {
    return Ei(4, 2, t, e);
  }
  function ld(t, e) {
    return Ei(4, 4, t, e);
  }
  function ad(t, e) {
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
  function nd(t, e, l) {
    l = l != null ? l.concat([t]) : null, Ei(4, 4, ad.bind(null, e, t), l);
  }
  function _f() {
  }
  function ud(t, e) {
    var l = Jt();
    e = e === void 0 ? null : e;
    var a = l.memoizedState;
    return e !== null && of(e, a[1]) ? a[0] : (l.memoizedState = [t, e], t);
  }
  function id(t, e) {
    var l = Jt();
    e = e === void 0 ? null : e;
    var a = l.memoizedState;
    if (e !== null && of(e, a[1]))
      return a[0];
    if (a = t(), Da) {
      Ll(!0);
      try {
        t();
      } finally {
        Ll(!1);
      }
    }
    return l.memoizedState = [a, e], a;
  }
  function Tf(t, e, l) {
    return l === void 0 || (Ul & 1073741824) !== 0 && (St & 261930) === 0 ? t.memoizedState = e : (t.memoizedState = l, t = ym(), ft.lanes |= t, aa |= t, l);
  }
  function cd(t, e, l, a) {
    return Ye(l, e) ? l : Wl.current !== null ? (t = Tf(t, l, a), Ye(t, e) || (Wt = !0), t) : (Ul & 106) === 0 || (Ul & 1073741824) !== 0 && (St & 261930) === 0 ? (Wt = !0, t.memoizedState = l) : (t = ym(), ft.lanes |= t, aa |= t, e);
  }
  function fd(t, e, l, a, n) {
    var u = W.p;
    W.p = u !== 0 && 8 > u ? u : 8;
    var i = X.T, s = {};
    s.types = i !== null ? i.types : null, X.T = s, zf(t, !1, e, l);
    try {
      var d = n(), S = X.S;
      if (S !== null && S(s, d), d !== null && typeof d == "object" && typeof d.then == "function") {
        var N = zv(
          d,
          a
        );
        ou(
          t,
          e,
          N,
          Qe(t)
        );
      } else
        ou(
          t,
          e,
          a,
          Qe(t)
        );
    } catch (C) {
      ou(
        t,
        e,
        { then: function() {
        }, status: "rejected", reason: C },
        Qe()
      );
    } finally {
      W.p = u, i !== null && s.types !== null && (i.types = s.types), X.T = i;
    }
  }
  function Dv() {
  }
  function Ef(t, e, l, a) {
    if (t.tag !== 5) throw Error(o(476));
    var n = sd(t).queue;
    fd(
      t,
      n,
      e,
      Ee,
      l === null ? Dv : function() {
        return od(t), l(a);
      }
    );
  }
  function sd(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: Ee,
      baseState: Ee,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Hl,
        lastRenderedState: Ee
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
  function od(t) {
    var e = sd(t);
    e.next === null && (e = t.alternate.memoizedState), ou(
      t,
      e.next.queue,
      {},
      Qe()
    );
  }
  function Nf() {
    return ce(jn);
  }
  function rd() {
    return Jt().memoizedState;
  }
  function dd() {
    return Jt().memoizedState;
  }
  function jv(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var l = Qe();
          t = Fl(l);
          var a = kl(e, t, l);
          a !== null && (je(a, e, l), nu(a, e, l)), e = { cache: Wc() }, t.payload = e;
          return;
      }
      e = e.return;
    }
  }
  function Rv(t, e, l) {
    var a = Qe();
    l = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ni(t) ? hd(e, l) : (l = Xc(t, e, l, a), l !== null && (je(l, t, a), vd(l, e, a)));
  }
  function md(t, e, l) {
    var a = Qe();
    ou(t, e, l, a);
  }
  function ou(t, e, l, a) {
    var n = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Ni(t)) hd(e, n);
    else {
      var u = t.alternate;
      if (t.lanes === 0 && (u === null || u.lanes === 0) && (u = e.lastRenderedReducer, u !== null))
        try {
          var i = e.lastRenderedState, s = u(i, l);
          if (n.hasEagerState = !0, n.eagerState = s, Ye(s, i))
            return ei(t, e, n, 0), Ht === null && ti(), !1;
        } catch {
        }
      if (l = Xc(t, e, n, a), l !== null)
        return je(l, t, a), vd(l, e, a), !0;
    }
    return !1;
  }
  function zf(t, e, l, a) {
    if (a = {
      lane: 2,
      revertLane: vs(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ni(t)) {
      if (e) throw Error(o(479));
    } else
      e = Xc(
        t,
        l,
        a,
        2
      ), e !== null && je(e, t, 2);
  }
  function Ni(t) {
    var e = t.alternate;
    return t === ft || e !== null && e === ft;
  }
  function hd(t, e) {
    rn = gi = !0;
    var l = t.pending;
    l === null ? e.next = e : (e.next = l.next, l.next = e), t.pending = e;
  }
  function vd(t, e, l) {
    if ((l & 4194048) !== 0) {
      var a = e.lanes;
      a &= t.pendingLanes, l |= a, e.lanes = l, yo(t, l);
    }
  }
  var zi = {
    readContext: ce,
    use: Si,
    useCallback: Vt,
    useContext: Vt,
    useEffect: Vt,
    useImperativeHandle: Vt,
    useLayoutEffect: Vt,
    useInsertionEffect: Vt,
    useMemo: Vt,
    useReducer: Vt,
    useRef: Vt,
    useState: Vt,
    useDebugValue: Vt,
    useDeferredValue: Vt,
    useTransition: Vt,
    useSyncExternalStore: Vt,
    useId: Vt,
    useHostTransitionStatus: Vt,
    useFormState: Vt,
    useActionState: Vt,
    useOptimistic: Vt,
    useMemoCache: Vt,
    useCacheRefresh: Vt,
    useEffectEvent: Vt
  }, yd = {
    readContext: ce,
    use: Si,
    useCallback: function(t, e) {
      return Se().memoizedState = [
        t,
        e === void 0 ? null : e
      ], t;
    },
    useContext: ce,
    useEffect: Pr,
    useImperativeHandle: function(t, e, l) {
      l = l != null ? l.concat([t]) : null, Ti(
        4194308,
        4,
        ad.bind(null, e, t),
        l
      );
    },
    useLayoutEffect: function(t, e) {
      return Ti(4194308, 4, t, e);
    },
    useInsertionEffect: function(t, e) {
      Ti(4, 2, t, e);
    },
    useMemo: function(t, e) {
      var l = Se();
      e = e === void 0 ? null : e;
      var a = t();
      if (Da) {
        Ll(!0);
        try {
          t();
        } finally {
          Ll(!1);
        }
      }
      return l.memoizedState = [a, e], a;
    },
    useReducer: function(t, e, l) {
      var a = Se();
      if (l !== void 0) {
        var n = l(e);
        if (Da) {
          Ll(!0);
          try {
            l(e);
          } finally {
            Ll(!1);
          }
        }
      } else n = e;
      return a.memoizedState = a.baseState = n, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: n
      }, a.queue = t, t = t.dispatch = Rv.bind(
        null,
        ft,
        t
      ), [a.memoizedState, t];
    },
    useRef: function(t) {
      var e = Se();
      return t = { current: t }, e.memoizedState = t;
    },
    useState: function(t) {
      t = bf(t);
      var e = t.queue, l = md.bind(null, ft, e);
      return e.dispatch = l, [t.memoizedState, l];
    },
    useDebugValue: _f,
    useDeferredValue: function(t, e) {
      var l = Se();
      return Tf(l, t, e);
    },
    useTransition: function() {
      var t = bf(!1);
      return t = fd.bind(
        null,
        ft,
        t.queue,
        !0,
        !1
      ), Se().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, e, l) {
      var a = ft, n = Se();
      if (mt) {
        if (l === void 0)
          throw Error(o(407));
        l = l();
      } else {
        if (l = e(), Ht === null)
          throw Error(o(349));
        (St & 127) !== 0 || qr(a, e, l);
      }
      n.memoizedState = l;
      var u = { value: l, getSnapshot: e };
      return n.queue = u, Pr(wr.bind(null, a, u, t), [
        t
      ]), a.flags |= 2048, mn(
        9,
        { destroy: void 0 },
        Yr.bind(
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
      var t = Se(), e = Ht.identifierPrefix;
      if (mt) {
        var l = hl, a = ml;
        l = (a & ~(1 << 32 - Be(a) - 1)).toString(32) + l, e = "_" + e + "R_" + l, l = bi++, 0 < l && (e += "H" + l.toString(32)), e += "_";
      } else
        l = Mv++, e = "_" + e + "r_" + l.toString(32) + "_";
      return t.memoizedState = e;
    },
    useHostTransitionStatus: Nf,
    useFormState: $r,
    useActionState: $r,
    useOptimistic: function(t) {
      var e = Se();
      e.memoizedState = e.baseState = t;
      var l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return e.queue = l, e = zf.bind(
        null,
        ft,
        !0,
        l
      ), l.dispatch = e, [t, e];
    },
    useMemoCache: vf,
    useCacheRefresh: function() {
      return Se().memoizedState = jv.bind(
        null,
        ft
      );
    },
    useEffectEvent: function(t) {
      var e = Se(), l = { impl: t };
      return e.memoizedState = l, function() {
        if ((At & 2) !== 0)
          throw Error(o(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, gd = {
    readContext: ce,
    use: Si,
    useCallback: ud,
    useContext: ce,
    useEffect: Sf,
    useImperativeHandle: nd,
    useInsertionEffect: ed,
    useLayoutEffect: ld,
    useMemo: id,
    useReducer: _i,
    useRef: Ir,
    useState: function() {
      return _i(Hl);
    },
    useDebugValue: _f,
    useDeferredValue: function(t, e) {
      var l = Jt();
      return cd(
        l,
        Ut.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = _i(Hl)[0], e = Jt().memoizedState;
      return [
        typeof t == "boolean" ? t : su(t),
        e
      ];
    },
    useSyncExternalStore: Br,
    useId: rd,
    useHostTransitionStatus: Nf,
    useFormState: Fr,
    useActionState: Fr,
    useOptimistic: function(t, e) {
      var l = Jt();
      return Xr(l, Ut, t, e);
    },
    useMemoCache: vf,
    useCacheRefresh: dd,
    useEffectEvent: td
  }, Uv = {
    readContext: ce,
    use: Si,
    useCallback: ud,
    useContext: ce,
    useEffect: Sf,
    useImperativeHandle: nd,
    useInsertionEffect: ed,
    useLayoutEffect: ld,
    useMemo: id,
    useReducer: gf,
    useRef: Ir,
    useState: function() {
      return gf(Hl);
    },
    useDebugValue: _f,
    useDeferredValue: function(t, e) {
      var l = Jt();
      return Ut === null ? Tf(l, t, e) : cd(
        l,
        Ut.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = gf(Hl)[0], e = Jt().memoizedState;
      return [
        typeof t == "boolean" ? t : su(t),
        e
      ];
    },
    useSyncExternalStore: Br,
    useId: rd,
    useHostTransitionStatus: Nf,
    useFormState: Wr,
    useActionState: Wr,
    useOptimistic: function(t, e) {
      var l = Jt();
      return Ut !== null ? Xr(l, Ut, t, e) : (l.baseState = t, [t, l.queue.dispatch]);
    },
    useMemoCache: vf,
    useCacheRefresh: dd,
    useEffectEvent: td
  };
  function Mf(t, e, l, a) {
    e = t.memoizedState, l = l(a, e), l = l == null ? e : I({}, e, l), t.memoizedState = l, t.lanes === 0 && (t.updateQueue.baseState = l);
  }
  var Of = {
    enqueueSetState: function(t, e, l) {
      t = t._reactInternals;
      var a = Qe(), n = Fl(a);
      n.payload = e, l != null && (n.callback = l), e = kl(t, n, a), e !== null && (je(e, t, a), nu(e, t, a));
    },
    enqueueReplaceState: function(t, e, l) {
      t = t._reactInternals;
      var a = Qe(), n = Fl(a);
      n.tag = 1, n.payload = e, l != null && (n.callback = l), e = kl(t, n, a), e !== null && (je(e, t, a), nu(e, t, a));
    },
    enqueueForceUpdate: function(t, e) {
      t = t._reactInternals;
      var l = Qe(), a = Fl(l);
      a.tag = 2, e != null && (a.callback = e), e = kl(t, a, l), e !== null && (je(e, t, l), nu(e, t, l));
    }
  };
  function bd(t, e, l, a, n, u, i) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(a, u, i) : e.prototype && e.prototype.isPureReactComponent ? !kn(l, a) || !kn(n, u) : !0;
  }
  function pd(t, e, l, a) {
    t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(l, a), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(l, a), e.state !== t && Of.enqueueReplaceState(e, e.state, null);
  }
  function ja(t, e) {
    var l = e;
    if ("ref" in e) {
      l = {};
      for (var a in e)
        a !== "ref" && (l[a] = e[a]);
    }
    if (t = t.defaultProps) {
      l === e && (l = I({}, l));
      for (var n in t)
        l[n] === void 0 && (l[n] = t[n]);
    }
    return l;
  }
  function Sd(t) {
    Pu(t);
  }
  function _d(t) {
    console.error(t);
  }
  function Td(t) {
    Pu(t);
  }
  function Mi(t, e) {
    try {
      var l = t.onUncaughtError;
      l(e.value, { componentStack: e.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function Ed(t, e, l) {
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
  function Af(t, e, l) {
    return l = Fl(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      Mi(t, e);
    }, l;
  }
  function Nd(t) {
    return t = Fl(t), t.tag = 3, t;
  }
  function zd(t, e, l, a) {
    var n = l.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var u = a.value;
      t.payload = function() {
        return n(u);
      }, t.callback = function() {
        Ed(e, l, a);
      };
    }
    var i = l.stateNode;
    i !== null && typeof i.componentDidCatch == "function" && (t.callback = function() {
      Ed(e, l, a), typeof n != "function" && (na === null ? na = /* @__PURE__ */ new Set([this]) : na.add(this));
      var s = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: s !== null ? s : ""
      });
    });
  }
  function Hv(t, e, l, a, n) {
    if (l.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (e = l.alternate, e !== null && Na(
        e,
        l,
        n,
        !0
      ), l = fe.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
          case 19:
            return ye === null ? Ji() : l.alternate === null && Zt === 0 && (Zt = 3), l.flags &= -257, l.flags |= 65536, l.lanes = n, a === di ? l.flags |= 16384 : (e = l.updateQueue, e === null ? l.updateQueue = /* @__PURE__ */ new Set([a]) : e.add(a), ds(t, a, n)), !1;
          case 22:
            return l.flags |= 65536, a === di ? l.flags |= 16384 : (e = l.updateQueue, e === null ? (e = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, l.updateQueue = e) : (l = e.retryQueue, l === null ? e.retryQueue = /* @__PURE__ */ new Set([a]) : l.add(a)), ds(t, a, n)), !1;
        }
        throw Error(o(435, l.tag));
      }
      return ds(t, a, n), Ji(), !1;
    }
    if (mt)
      return e = fe.current, e !== null ? ((e.flags & 65536) === 0 && (e.flags |= 256), e.flags |= 65536, e.lanes = n, a !== Jc && (t = Error(o(422), { cause: a }), Pn(Fe(t, l)))) : (a !== Jc && (e = Error(o(423), {
        cause: a
      }), Pn(
        Fe(e, l)
      )), t = t.current.alternate, t.flags |= 65536, n &= -n, t.lanes |= n, a = Fe(a, l), n = Af(
        t.stateNode,
        a,
        n
      ), af(t, n), Zt !== 4 && (Zt = 2)), !1;
    var u = Error(o(520), { cause: a });
    if (u = Fe(u, l), bu === null ? bu = [u] : bu.push(u), Zt !== 4 && (Zt = 2), e === null) return !0;
    a = Fe(a, l), l = e;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, t = n & -n, l.lanes |= t, t = Af(l.stateNode, a, t), af(l, t), !1;
        case 1:
          if (e = l.type, u = l.stateNode, (l.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (na === null || !na.has(u))))
            return l.flags |= 65536, n &= -n, l.lanes |= n, n = Nd(n), zd(
              n,
              t,
              l,
              a
            ), af(l, n), !1;
          break;
        case 22:
          if (l.memoizedState !== null)
            return l.flags |= 65536, !1;
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var Cf = Error(o(461)), Wt = !1;
  function Pt(t, e, l, a) {
    e.child = t === null ? Cr(e, null, l, a) : xa(
      e,
      t.child,
      l,
      a
    );
  }
  function Md(t, e, l, a, n) {
    l = l.render;
    var u = e.ref;
    if ("ref" in a) {
      var i = {};
      for (var s in a)
        s !== "ref" && (i[s] = a[s]);
    } else i = a;
    return za(e), a = rf(
      t,
      e,
      l,
      i,
      u,
      n
    ), s = df(), t !== null && !Wt ? (mf(t, e, n), Bl(t, e, n)) : (mt && s && ui(e), e.flags |= 1, Pt(t, e, a, n), e.child);
  }
  function Od(t, e, l, a, n) {
    if (t === null) {
      var u = l.type;
      return typeof u == "function" && !Qc(u) && u.defaultProps === void 0 && l.compare === null ? (e.tag = 15, e.type = u, Ad(
        t,
        e,
        u,
        a,
        n
      )) : (t = ai(
        l.type,
        null,
        a,
        e,
        e.mode,
        n
      ), t.ref = e.ref, t.return = e, e.child = t);
    }
    if (u = t.child, !qf(t, n)) {
      var i = u.memoizedProps;
      if (l = l.compare, l = l !== null ? l : kn, l(i, a) && t.ref === e.ref)
        return Bl(t, e, n);
    }
    return e.flags |= 1, t = xl(u, a), t.ref = e.ref, t.return = e, e.child = t;
  }
  function Ad(t, e, l, a, n) {
    if (t !== null) {
      var u = t.memoizedProps;
      if (kn(u, a) && t.ref === e.ref)
        if (Wt = !1, e.pendingProps = a = u, qf(t, n))
          (t.flags & 131072) !== 0 && (Wt = !0);
        else
          return e.lanes = t.lanes, Bl(t, e, n);
    }
    return xf(
      t,
      e,
      l,
      a,
      n
    );
  }
  function Cd(t, e, l, a) {
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
        return xd(
          t,
          e,
          u,
          l,
          a
        );
      }
      if ((l & 536870912) !== 0)
        e.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && oi(
          e,
          u !== null ? u.cachePool : null
        ), u !== null ? jr(e, u) : uf(), Rr(e);
      else
        return a = e.lanes = 536870912, xd(
          t,
          e,
          u !== null ? u.baseLanes | l : l,
          l,
          a
        );
    } else
      u !== null ? (oi(e, u.cachePool), jr(e, u), Pl(), e.memoizedState = null) : (t !== null && oi(e, null), uf(), Pl());
    return Pt(t, e, n, l), e.child;
  }
  function ru(t, e) {
    return t !== null && t.tag === 22 || e.stateNode !== null || (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), e.sibling;
  }
  function xd(t, e, l, a, n) {
    var u = Pc();
    return u = u === null ? null : { parent: Ft._currentValue, pool: u }, e.memoizedState = {
      baseLanes: l,
      cachePool: u
    }, t !== null && oi(e, null), uf(), Rr(e), t !== null && Na(t, e, a, !0), e.childLanes = n, null;
  }
  function Oi(t, e) {
    return e = Ai(
      { mode: e.mode, children: e.children },
      t.mode
    ), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function Dd(t, e, l) {
    return xa(e, t.child, null, l), t = Oi(e, e.pendingProps), t.flags |= 2, we(e), e.memoizedState = null, t;
  }
  function Bv(t, e, l) {
    var a = e.pendingProps, n = (e.flags & 128) !== 0;
    if (e.flags &= -129, t === null) {
      if (mt) {
        if (a.mode === "hidden")
          return t = Oi(e, a), e.lanes = 536870912, t.memoizedState = { baseLanes: 0, cachePool: null }, ru(null, t);
        if (ff(e), (t = Yt) ? (t = a0(
          t,
          Ie
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: Ql !== null ? { id: ml, overflow: hl } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = hr(t), l.return = e, e.child = l, le = e, Yt = null)) : t = null, t === null) throw Zl(e);
        return e.lanes = 536870912, null;
      }
      return Oi(e, a);
    }
    var u = t.memoizedState;
    if (u !== null) {
      var i = u.dehydrated;
      if (ff(e), n)
        if (e.flags & 256)
          e.flags &= -257, e = Dd(
            t,
            e,
            l
          );
        else if (e.memoizedState !== null)
          e.child = t.child, e.flags |= 128, e = null;
        else throw Error(o(558));
      else if (Wt || Na(t, e, l, !1), n = (l & t.childLanes) !== 0, Wt || n) {
        if (Wl.current === null) {
          if (a = Ht, a !== null && (i = go(a, l), i !== 0 && i !== u.retryLane))
            throw u.retryLane = i, Sa(t, i), je(a, t, i), Cf;
          Ji();
        }
        e = Dd(
          t,
          e,
          l
        );
      } else
        t = u.treeContext, Yt = tl(i.nextSibling), le = e, mt = !0, Vl = null, Ie = !1, t !== null && gr(e, t), e = Oi(e, a), e.flags |= 134221824;
      return e;
    }
    return t = xl(t.child, {
      mode: a.mode,
      children: a.children
    }), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function hn(t, e) {
    var l = e.ref;
    if (l === null)
      t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object")
        throw Error(o(284));
      (t === null || t.ref !== l) && (e.flags |= 4194816);
    }
  }
  function xf(t, e, l, a, n) {
    return za(e), l = rf(
      t,
      e,
      l,
      a,
      void 0,
      n
    ), a = df(), t !== null && !Wt ? (mf(t, e, n), Bl(t, e, n)) : (mt && a && ui(e), e.flags |= 1, Pt(t, e, l, n), e.child);
  }
  function jd(t, e, l, a, n, u) {
    return za(e), e.updateQueue = null, l = Hr(
      e,
      a,
      l,
      n
    ), Ur(t), a = df(), t !== null && !Wt ? (mf(t, e, u), Bl(t, e, u)) : (mt && a && ui(e), e.flags |= 1, Pt(t, e, l, u), e.child);
  }
  function Rd(t, e, l, a, n) {
    if (za(e), e.stateNode === null) {
      var u = an, i = l.contextType;
      typeof i == "object" && i !== null && (u = ce(i)), u = new l(a, u), e.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = Of, e.stateNode = u, u._reactInternals = e, u = e.stateNode, u.props = a, u.state = e.memoizedState, u.refs = {}, ef(e), i = l.contextType, u.context = typeof i == "object" && i !== null ? ce(i) : an, u.state = e.memoizedState, i = l.getDerivedStateFromProps, typeof i == "function" && (Mf(
        e,
        l,
        i,
        a
      ), u.state = e.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (i = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), i !== u.state && Of.enqueueReplaceState(u, u.state, null), iu(e, a, u, n), uu(), u.state = e.memoizedState), typeof u.componentDidMount == "function" && (e.flags |= 4194308), a = !0;
    } else if (t === null) {
      u = e.stateNode;
      var s = e.memoizedProps, d = ja(l, s);
      u.props = d;
      var S = u.context, N = l.contextType;
      i = an, typeof N == "object" && N !== null && (i = ce(N));
      var C = l.getDerivedStateFromProps;
      N = typeof C == "function" || typeof u.getSnapshotBeforeUpdate == "function", s = e.pendingProps !== s, N || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (s || S !== i) && pd(
        e,
        u,
        a,
        i
      ), $l = !1;
      var b = e.memoizedState;
      u.state = b, iu(e, a, u, n), uu(), S = e.memoizedState, s || b !== S || $l ? (typeof C == "function" && (Mf(
        e,
        l,
        C,
        a
      ), S = e.memoizedState), (d = $l || bd(
        e,
        l,
        d,
        a,
        b,
        S,
        i
      )) ? (N || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = a, e.memoizedState = S), u.props = a, u.state = S, u.context = i, a = d) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), a = !1);
    } else {
      u = e.stateNode, lf(t, e), i = e.memoizedProps, N = ja(l, i), u.props = N, C = e.pendingProps, b = u.context, S = l.contextType, d = an, typeof S == "object" && S !== null && (d = ce(S)), s = l.getDerivedStateFromProps, (S = typeof s == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (i !== C || b !== d) && pd(
        e,
        u,
        a,
        d
      ), $l = !1, b = e.memoizedState, u.state = b, iu(e, a, u, n), uu();
      var T = e.memoizedState;
      i !== C || b !== T || $l || t !== null && t.dependencies !== null && fi(t.dependencies) ? (typeof s == "function" && (Mf(
        e,
        l,
        s,
        a
      ), T = e.memoizedState), (N = $l || bd(
        e,
        l,
        N,
        a,
        b,
        T,
        d
      ) || t !== null && t.dependencies !== null && fi(t.dependencies)) ? (S || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(a, T, d), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        a,
        T,
        d
      )), typeof u.componentDidUpdate == "function" && (e.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && b === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && b === t.memoizedState || (e.flags |= 1024), e.memoizedProps = a, e.memoizedState = T), u.props = a, u.state = T, u.context = d, a = N) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && b === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && b === t.memoizedState || (e.flags |= 1024), a = !1);
    }
    return u = a, hn(t, e), a = (e.flags & 128) !== 0, u || a ? (u = e.stateNode, l = a && typeof l.getDerivedStateFromError != "function" ? null : u.render(), e.flags |= 1, t !== null && a ? (e.child = xa(
      e,
      t.child,
      null,
      n
    ), e.child = xa(
      e,
      null,
      l,
      n
    )) : Pt(t, e, l, n), e.memoizedState = u.state, t = e.child) : t = Bl(
      t,
      e,
      n
    ), t;
  }
  function Ud(t, e, l, a) {
    return Ta(), e.flags |= 256, Pt(t, e, l, a), e.child;
  }
  var Df = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function jf(t) {
    return { baseLanes: t, cachePool: Er() };
  }
  function Rf(t, e, l) {
    return t = t !== null ? t.childLanes & ~l : 0, e && (t |= Xe), t;
  }
  function Hd(t, e, l) {
    var a = e.pendingProps, n = !1, u = (e.flags & 128) !== 0, i;
    if ((i = u) || (i = t !== null && t.memoizedState === null ? !1 : (se.current & 2) !== 0), i && (n = !0, e.flags &= -129), i = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
      if (mt) {
        if (n ? Il(e) : Pl(), (t = Yt) ? (t = a0(
          t,
          Ie
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: Ql !== null ? { id: ml, overflow: hl } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = hr(t), l.return = e, e.child = l, le = e, Yt = null)) : t = null, t === null) throw Zl(e);
        return js(t) ? e.lanes = 32 : e.lanes = 536870912, null;
      }
      return u = a.children, a = a.fallback, n ? (Pl(), n = e.mode, u = Ai(
        { mode: "hidden", children: u },
        n
      ), a = _a(
        a,
        n,
        l,
        null
      ), u.return = e, a.return = e, u.sibling = a, e.child = u, a = e.child, a.memoizedState = jf(l), a.childLanes = Rf(
        t,
        i,
        l
      ), e.memoizedState = Df, ru(null, a)) : (Il(e), Uf(e, u));
    }
    var s = t.memoizedState;
    if (s !== null) {
      var d = s.dehydrated;
      if (d !== null)
        return qv(
          t,
          e,
          u,
          i,
          a,
          d,
          s,
          l
        );
    }
    return n ? (Pl(), n = a.fallback, u = e.mode, s = t.child, d = s.sibling, a = xl(s, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = s.subtreeFlags & 1206910976, d !== null ? n = xl(d, n) : (n = _a(
      n,
      u,
      l,
      null
    ), n.flags |= 2), n.return = e, a.return = e, a.sibling = n, e.child = a, ru(null, a), a = e.child, n = t.child.memoizedState, n === null ? n = jf(l) : (u = n.cachePool, u !== null ? (s = Ft._currentValue, u = u.parent !== s ? { parent: s, pool: s } : u) : u = Er(), n = {
      baseLanes: n.baseLanes | l,
      cachePool: u
    }), a.memoizedState = n, a.childLanes = Rf(
      t,
      i,
      l
    ), e.memoizedState = Df, ru(t.child, a)) : (Il(e), l = t.child, t = l.sibling, l = xl(l, {
      mode: "visible",
      children: a.children
    }), l.return = e, l.sibling = null, t !== null && (i = e.deletions, i === null ? (e.deletions = [t], e.flags |= 16) : i.push(t)), e.child = l, e.memoizedState = null, l);
  }
  function Uf(t, e) {
    return e = Ai(
      { mode: "visible", children: e },
      t.mode
    ), e.return = t, t.child = e;
  }
  function Ai(t, e) {
    return t = Ae(22, t, null, e), t.lanes = 0, t;
  }
  function Ci(t, e, l) {
    return xa(e, t.child, null, l), t = Uf(
      e,
      e.pendingProps.children
    ), t.flags |= 2, e.memoizedState = null, t;
  }
  function qv(t, e, l, a, n, u, i, s) {
    if (l)
      return e.flags & 256 ? (Il(e), e.flags &= -257, Ci(
        t,
        e,
        s
      )) : e.memoizedState !== null ? (Pl(), e.child = t.child, e.flags |= 128, null) : (Pl(), u = n.fallback, i = e.mode, n = Ai(
        { mode: "visible", children: n.children },
        i
      ), u = _a(
        u,
        i,
        s,
        null
      ), u.flags |= 2, n.return = e, u.return = e, n.sibling = u, e.child = n, xa(e, t.child, null, s), n = e.child, n.memoizedState = jf(s), n.childLanes = Rf(
        t,
        a,
        s
      ), e.memoizedState = Df, ru(null, n));
    if (Il(e), js(u)) {
      if (a = u.nextSibling && u.nextSibling.dataset, a) var d = a.dgst;
      return a = d, a !== "" && (n = Error(o(419)), n.stack = "", n.digest = a, Pn({ value: n, source: null, stack: null })), Ci(
        t,
        e,
        s
      );
    }
    if (Wt || Na(t, e, s, !1), a = (s & t.childLanes) !== 0, Wt || a) {
      if (Wl.current !== null)
        return Ci(
          t,
          e,
          s
        );
      if (a = Ht, a !== null && (n = go(
        a,
        s
      ), n !== 0 && n !== i.retryLane))
        throw i.retryLane = n, Sa(t, n), je(a, t, n), Cf;
      return Ds(u) || Ji(), Ci(
        t,
        e,
        s
      );
    }
    return Ds(u) ? (e.flags |= 192, e.child = t.child, null) : (t = i.treeContext, Yt = tl(u.nextSibling), le = e, mt = !0, Vl = null, Ie = !1, t !== null && gr(e, t), e = Uf(
      e,
      n.children
    ), e.flags |= 134221824, e);
  }
  function Bd(t, e, l) {
    t.lanes |= e;
    var a = t.alternate;
    a !== null && (a.lanes |= e), ci(t.return, e, l);
  }
  function qd(t) {
    for (var e = null; t !== null; ) {
      var l = t.alternate;
      l !== null && yi(l) === null && (e = t), t = t.sibling;
    }
    return e;
  }
  function xi(t, e, l, a, n, u) {
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
  function Hf(t) {
    var e = t.child;
    for (t.child = null; e !== null; ) {
      var l = e.sibling;
      e.sibling = t.child, t.child = e, e = l;
    }
  }
  function Bf(t, e, l) {
    var a = e.pendingProps, n = a.revealOrder, u = a.tail;
    a = a.children;
    var i = se.current;
    if (e.flags & 128)
      return cu(e, i), null;
    var s = (i & 2) !== 0;
    if (s ? (i = i & 1 | 2, e.flags |= 128) : i &= 1, cu(e, i), n === "backwards" && t !== null ? (Hf(t), Pt(t, e, a, l), Hf(t)) : Pt(t, e, a, l), a = mt ? In : 0, !s && t !== null && (t.flags & 128) !== 0)
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && Bd(t, l, e);
        else if (t.tag === 19)
          Bd(t, l, e);
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
        l = qd(e.child), l === null ? (n = e.child, e.child = null) : (n = l.sibling, l.sibling = null, Hf(e)), xi(
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
          if (t = n.alternate, t !== null && yi(t) === null) {
            e.child = n;
            break;
          }
          t = n.sibling, n.sibling = l, l = n, n = t;
        }
        xi(
          e,
          !0,
          l,
          null,
          u,
          a
        );
        break;
      case "together":
        xi(
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
        l = qd(e.child), l === null ? (n = e.child, e.child = null) : (n = l.sibling, l.sibling = null), xi(
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
  function Yd(t, e, l) {
    var a = e.pendingProps;
    return Kl(e, e.type, a.value), Pt(t, e, a.children, l), e.child;
  }
  function Bl(t, e, l) {
    if (t !== null && (e.dependencies = t.dependencies), aa |= e.lanes, (l & e.childLanes) === 0)
      if (t !== null) {
        if (Na(
          t,
          e,
          l,
          !1
        ), (l & e.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && e.child !== t.child)
      throw Error(o(153));
    if (e.child !== null) {
      for (t = e.child, l = xl(t, t.pendingProps), e.child = l, l.return = e; t.sibling !== null; )
        t = t.sibling, l = l.sibling = xl(t, t.pendingProps), l.return = e;
      l.sibling = null;
    }
    return e.child;
  }
  function qf(t, e) {
    return (t.lanes & e) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && fi(t)));
  }
  function Yv(t, e, l) {
    switch (e.tag) {
      case 3:
        Ke(e, e.stateNode.containerInfo), Kl(e, Ft, t.memoizedState.cache), Ta();
        break;
      case 27:
      case 5:
        qn(e);
        break;
      case 4:
        Ke(e, e.stateNode.containerInfo);
        break;
      case 10:
        Kl(
          e,
          e.type,
          e.memoizedProps.value
        );
        break;
      case 31:
        if (e.memoizedState !== null)
          return e.flags |= 128, ff(e), null;
        break;
      case 13:
        var a = e.memoizedState;
        if (a !== null) {
          if (a.dehydrated !== null)
            return Il(e), e.flags |= 128, null;
          a = Na(
            t,
            e,
            l,
            !1
          );
          var n = e.child.childLanes;
          return a || (l & n) !== 0 ? Hd(t, e, l) : (Il(e), t = Bl(
            t,
            e,
            l
          ), t !== null ? t.sibling : null);
        }
        Il(e);
        break;
      case 19:
        if (e.flags & 128)
          return Bf(
            t,
            e,
            l
          );
        if (n = (t.flags & 128) !== 0, a = (l & e.childLanes) !== 0, a || (Na(
          t,
          e,
          l,
          !1
        ), a = (l & e.childLanes) !== 0), n) {
          if (a)
            return Bf(
              t,
              e,
              l
            );
          e.flags |= 128;
        }
        if (n = e.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), cu(e, se.current), a) break;
        return null;
      case 22:
        return e.lanes = 0, Cd(
          t,
          e,
          l,
          e.pendingProps
        );
      case 24:
        Kl(e, Ft, t.memoizedState.cache);
    }
    return Bl(t, e, l);
  }
  function wd(t, e, l) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps)
        Wt = !0;
      else {
        if (!qf(t, l) && (e.flags & 128) === 0)
          return Wt = !1, Yv(
            t,
            e,
            l
          );
        Wt = (t.flags & 131072) !== 0;
      }
    else
      Wt = !1, mt && (e.flags & 1048576) !== 0 && yr(e, In, e.index);
    switch (e.lanes = 0, e.tag) {
      case 16:
        t: {
          var a = e.pendingProps;
          if (t = Aa(e.elementType), e.type = t, typeof t == "function")
            Qc(t) ? (a = ja(t, a), e.tag = 1, e = Rd(
              null,
              e,
              t,
              a,
              l
            )) : (e.tag = 0, e = xf(
              null,
              e,
              t,
              a,
              l
            ));
          else {
            if (t != null) {
              var n = t.$$typeof;
              if (n === x) {
                e.tag = 11, e = Md(
                  null,
                  e,
                  t,
                  a,
                  l
                );
                break t;
              } else if (n === ht) {
                e.tag = 14, e = Od(
                  null,
                  e,
                  t,
                  a,
                  l
                );
                break t;
              } else if (n === V) {
                e.tag = 10, e.type = t, e = Yd(
                  null,
                  e,
                  l
                );
                break t;
              }
            }
            throw e = pt(t) || t, Error(o(306, e, ""));
          }
        }
        return e;
      case 0:
        return xf(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 1:
        return a = e.type, n = ja(
          a,
          e.pendingProps
        ), Rd(
          t,
          e,
          a,
          n,
          l
        );
      case 3:
        t: {
          if (Ke(
            e,
            e.stateNode.containerInfo
          ), t === null) throw Error(o(387));
          a = e.pendingProps;
          var u = e.memoizedState;
          n = u.element, lf(t, e), iu(e, a, null, l);
          var i = e.memoizedState;
          if (a = i.cache, Kl(e, Ft, a), a !== u.cache && kc(
            e,
            [Ft],
            l,
            !0
          ), uu(), a = i.element, u.isDehydrated)
            if (u = {
              element: a,
              isDehydrated: !1,
              cache: i.cache
            }, e.updateQueue.baseState = u, e.memoizedState = u, e.flags & 256) {
              e = Ud(
                t,
                e,
                a,
                l
              );
              break t;
            } else if (a !== n) {
              n = Fe(
                Error(o(424)),
                e
              ), Pn(n), e = Ud(
                t,
                e,
                a,
                l
              );
              break t;
            } else
              for (t = e.stateNode.containerInfo, t.nodeType === 9 ? t = t.body : t = t.nodeName === "HTML" ? t.ownerDocument.body : t, Yt = tl(t.firstChild), le = e, mt = !0, Vl = null, Ie = !0, l = Cr(
                e,
                null,
                a,
                l
              ), e.child = l; l; )
                l.flags = l.flags & -3 | 134221824, l = l.sibling;
          else {
            if (Ta(), a === n) {
              e = Bl(
                t,
                e,
                l
              );
              break t;
            }
            Pt(t, e, a, l);
          }
          e = e.child;
        }
        return e;
      case 26:
        return hn(t, e), t === null ? (l = o0(
          e.type,
          null,
          e.pendingProps,
          null
        )) ? e.memoizedState = l : mt || (e.stateNode = Qm(
          e.type,
          e.pendingProps,
          me.current,
          e
        )) : e.memoizedState = o0(
          e.type,
          t.memoizedProps,
          e.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return qn(e), t === null && mt && (a = e.stateNode = i0(
          e.type,
          e.pendingProps,
          me.current
        ), le = e, Ie = !0, n = Yt, ca(e.type) ? (Rs = n, Yt = tl(a.firstChild)) : Yt = n), Pt(
          t,
          e,
          e.pendingProps.children,
          l
        ), hn(t, e), t === null && (e.flags |= 4194304), e.child;
      case 5:
        return t === null && mt && ((n = a = Yt) && (a = jy(
          a,
          e.type,
          e.pendingProps,
          Ie
        ), a !== null ? (e.stateNode = a, le = e, Yt = tl(a.firstChild), Ie = !1, n = !0) : n = !1), n || Zl(e)), qn(e), n = e.type, u = e.pendingProps, i = t !== null ? t.memoizedProps : null, a = u.children, Ns(n, u) ? a = null : i !== null && Ns(n, i) && (e.flags |= 32), e.memoizedState !== null && (n = rf(
          t,
          e,
          Ov,
          null,
          null,
          l
        ), jn._currentValue = n), hn(t, e), Pt(t, e, a, l), e.child;
      case 6:
        return t === null && mt && ((t = l = Yt) && (l = Ry(
          l,
          e.pendingProps,
          Ie
        ), l !== null ? (e.stateNode = l, le = e, Yt = null, t = !0) : t = !1), t || Zl(e)), null;
      case 13:
        return Hd(t, e, l);
      case 4:
        return Ke(
          e,
          e.stateNode.containerInfo
        ), a = e.pendingProps, t === null ? e.child = xa(
          e,
          null,
          a,
          l
        ) : Pt(t, e, a, l), e.child;
      case 11:
        return Md(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 7:
        return a = e.pendingProps, hn(t, e), Pt(t, e, a, l), e.child;
      case 8:
        return Pt(
          t,
          e,
          e.pendingProps.children,
          l
        ), e.child;
      case 12:
        return Pt(
          t,
          e,
          e.pendingProps.children,
          l
        ), e.child;
      case 10:
        return Yd(t, e, l);
      case 9:
        return n = e.type._context, a = e.pendingProps.children, za(e), n = ce(n), a = a(n), e.flags |= 1, Pt(t, e, a, l), e.child;
      case 14:
        return Od(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 15:
        return Ad(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 19:
        return Bf(t, e, l);
      case 31:
        return Bv(t, e, l);
      case 22:
        return Cd(
          t,
          e,
          l,
          e.pendingProps
        );
      case 24:
        return za(e), a = ce(Ft), t === null ? (n = Pc(), n === null && (n = Ht, u = Wc(), n.pooledCache = u, u.refCount++, u !== null && (n.pooledCacheLanes |= l), n = u), e.memoizedState = { parent: a, cache: n }, ef(e), Kl(e, Ft, n)) : ((t.lanes & l) !== 0 && (lf(t, e), iu(e, null, null, l), uu()), n = t.memoizedState, u = e.memoizedState, n.parent !== a ? (n = { parent: a, cache: a }, e.memoizedState = n, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = n), Kl(e, Ft, a)) : (a = u.cache, Kl(e, Ft, a), a !== n.cache && kc(
          e,
          [Ft],
          l,
          !0
        ))), Pt(
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
        }), a = e.pendingProps, a.name != null && a.name !== "auto" ? e.flags |= t === null ? 18882560 : 18874368 : mt && ui(e), t !== null && t.memoizedProps.name !== a.name ? e.flags |= 4194816 : hn(t, e), Pt(t, e, a.children, l), e.child;
      case 29:
        throw e.pendingProps;
    }
    throw Error(o(156, e.tag));
  }
  function ql(t) {
    t.flags |= 4;
  }
  function Yf(t, e, l, a, n) {
    var u;
    if ((u = (t.mode & 32) !== 0) && (u = l === null ? h0(e, a) : h0(e, a) && (a.src !== l.src || a.srcSet !== l.srcSet)), u) {
      if (t.flags |= 16777216, (n & 335544128) === n)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (Sm()) t.flags |= 8192;
        else
          throw Ca = di, tf;
    } else t.flags &= -16777217;
  }
  function Ld(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !v0(e))
      if (Sm()) t.flags |= 8192;
      else
        throw Ca = di, tf;
  }
  function Di(t, e) {
    e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? ho() : 536870912, t.lanes |= e, pn |= e);
  }
  function du(t, e) {
    if (!mt)
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
  function wt(t) {
    var e = t.alternate !== null && t.alternate.child === t.child, l = 0, a = 0;
    if (e)
      for (var n = t.child; n !== null; )
        l |= n.lanes | n.childLanes, a |= n.subtreeFlags & 1206910976, a |= n.flags & 1206910976, n.return = t, n = n.sibling;
    else
      for (n = t.child; n !== null; )
        l |= n.lanes | n.childLanes, a |= n.subtreeFlags, a |= n.flags, n.return = t, n = n.sibling;
    return t.subtreeFlags |= a, t.childLanes = l, e;
  }
  function wv(t, e, l) {
    var a = e.pendingProps;
    switch (Kc(e), e.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return wt(e), null;
      case 1:
        return wt(e), null;
      case 3:
        return l = e.stateNode, a = null, t !== null && (a = t.memoizedState.cache), e.memoizedState.cache !== a && (e.flags |= 2048), Rl(Ft), rl(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (t === null || t.child === null) && (cn(e) ? ql(e) : t === null || t.memoizedState.isDehydrated && (e.flags & 256) === 0 || (e.flags |= 1024, $c())), wt(e), null;
      case 26:
        var n = e.type, u = e.memoizedState;
        return t === null ? (ql(e), u !== null ? (wt(e), Ld(e, u)) : (wt(e), Yf(
          e,
          n,
          null,
          a,
          l
        ))) : u ? u !== t.memoizedState ? (ql(e), wt(e), Ld(e, u)) : (wt(e), e.flags &= -16777217) : (t = t.memoizedProps, t !== a && ql(e), wt(e), Yf(
          e,
          n,
          t,
          a,
          l
        )), null;
      case 27:
        if (Va(e), l = me.current, n = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== a && ql(e);
        else {
          if (!a) {
            if (e.stateNode === null)
              throw Error(o(166));
            return wt(e), e.subtreeFlags &= -33554433, null;
          }
          t = G.current, cn(e) ? br(e) : (t = i0(n, a, l), e.stateNode = t, ql(e));
        }
        return wt(e), e.subtreeFlags &= -33554433, null;
      case 5:
        if (Va(e), n = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== a && ql(e);
        else {
          if (!a) {
            if (e.stateNode === null)
              throw Error(o(166));
            return wt(e), e.subtreeFlags &= -33554433, null;
          }
          if (u = G.current, cn(e))
            br(e);
          else {
            var i = Eu(
              me.current
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
            u[ie] = e, u[Oe] = a;
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
            t: switch (re(u, n, a), n) {
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
        return wt(e), e.subtreeFlags &= -33554433, Yf(
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
            throw Error(o(166));
          if (t = me.current, cn(e)) {
            if (t = e.stateNode, l = e.memoizedProps, a = null, n = le, n !== null)
              switch (n.tag) {
                case 27:
                case 5:
                  a = n.memoizedProps;
              }
            t[ie] = e, t = !!(t.nodeValue === l || a !== null && a.suppressHydrationWarning === !0 || wm(t.nodeValue, l)), t || Zl(e, !0);
          } else
            t = Eu(t).createTextNode(
              a
            ), t[ie] = e, e.stateNode = t;
        }
        return wt(e), null;
      case 31:
        if (l = e.memoizedState, t === null || t.memoizedState !== null) {
          if (a = cn(e), l !== null) {
            if (t === null) {
              if (!a) throw Error(o(318));
              if (t = e.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(o(557));
              t[ie] = e;
            } else
              Ta(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            wt(e), t = !1;
          } else
            l = $c(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = l), t = !0;
          if (!t)
            return e.flags & 256 ? (we(e), e) : (we(e), null);
          if ((e.flags & 128) !== 0)
            throw Error(o(558));
        }
        return wt(e), null;
      case 13:
        if (a = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (n = cn(e), a !== null && a.dehydrated !== null) {
            if (t === null) {
              if (!n) throw Error(o(318));
              if (n = e.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(o(317));
              n[ie] = e;
            } else
              Ta(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            wt(e), n = !1;
          } else
            n = $c(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return e.flags & 256 ? (we(e), e) : (we(e), null);
        }
        return we(e), (e.flags & 128) !== 0 ? (e.lanes = l, e) : (l = a !== null, t = t !== null && t.memoizedState !== null, l && (a = e.child, n = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (n = a.alternate.memoizedState.cachePool.pool), u = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (u = a.memoizedState.cachePool.pool), u !== n && (a.flags |= 2048)), l !== t && l && (e.child.flags |= 8192), Di(e, e.updateQueue), wt(e), null);
      case 4:
        return rl(), t === null && ps(e.stateNode.containerInfo), e.flags |= 67108864, wt(e), null;
      case 10:
        return Rl(e.type), wt(e), null;
      case 19:
        if (sf(e), a = e.memoizedState, a === null) return wt(e), null;
        if (n = (e.flags & 128) !== 0, u = a.rendering, u === null)
          if (n) du(a, !1);
          else {
            if (Zt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = e.child; t !== null; ) {
                if (u = yi(t), u !== null) {
                  for (e.flags |= 128, du(a, !1), t = u.updateQueue, e.updateQueue = t, Di(e, t), e.subtreeFlags = 0, t = l, l = e.child; l !== null; )
                    mr(l, t), l = l.sibling;
                  return cu(
                    e,
                    se.current & 1 | 2
                  ), mt && Dl(e, a.treeForkCount), e.child;
                }
                t = t.sibling;
              }
            a.tail !== null && Ue() > Qi && (e.flags |= 128, n = !0, du(a, !1), e.lanes = 4194304);
          }
        else {
          if (!n)
            if (t = yi(u), t !== null) {
              if (e.flags |= 128, n = !0, t = t.updateQueue, e.updateQueue = t, Di(e, t), du(a, !0), a.tail === null && a.tailMode !== "collapsed" && a.tailMode !== "visible" && !u.alternate && !mt)
                return wt(e), null;
            } else
              2 * Ue() - a.renderingStartTime > Qi && l !== 536870912 && (e.flags |= 128, n = !0, du(a, !1), e.lanes = 4194304);
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
          return a.rendering = t, a.tail = t.sibling, a.renderingStartTime = Ue(), t.sibling = null, u = se.current, u = n ? u & 1 | 2 : u & 1, a.tailMode === "visible" || a.tailMode === "collapsed" || !l || mt ? cu(e, u) : (l = u, B(fe, e), B(se, l), ye === null && (ye = e)), mt && Dl(e, a.treeForkCount), t;
        }
        return wt(e), null;
      case 22:
      case 23:
        return we(e), cf(), a = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== a && (e.flags |= 8192) : a && (e.flags |= 8192), a ? (l & 536870912) !== 0 && (e.flags & 128) === 0 && (wt(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : wt(e), l = e.updateQueue, l !== null && Di(e, l.retryQueue), l = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), a = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), a !== l && (e.flags |= 2048), t !== null && Kt(Oa), null;
      case 24:
        return l = null, t !== null && (l = t.memoizedState.cache), e.memoizedState.cache !== l && (e.flags |= 2048), Rl(Ft), wt(e), null;
      case 25:
        return null;
      case 30:
        return e.flags |= 33554432, wt(e), null;
    }
    throw Error(o(156, e.tag));
  }
  function Lv(t, e) {
    switch (Kc(e), e.tag) {
      case 1:
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 3:
        return Rl(Ft), rl(), t = e.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (e.flags = t & -65537 | 128, e) : null;
      case 26:
      case 27:
      case 5:
        return Va(e), null;
      case 31:
        if (e.memoizedState !== null) {
          if (we(e), e.alternate === null)
            throw Error(o(340));
          Ta();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 13:
        if (we(e), t = e.memoizedState, t !== null && t.dehydrated !== null) {
          if (e.alternate === null)
            throw Error(o(340));
          Ta();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 19:
        return sf(e), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, t = e.memoizedState, t !== null && (t.rendering = null, t.tail = null), e.flags |= 4, e) : null;
      case 4:
        return rl(), null;
      case 10:
        return Rl(e.type), null;
      case 22:
      case 23:
        return we(e), cf(), t !== null && Kt(Oa), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 24:
        return Rl(Ft), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Gd(t, e) {
    switch (Kc(e), e.tag) {
      case 3:
        Rl(Ft), rl();
        break;
      case 26:
      case 27:
      case 5:
        Va(e);
        break;
      case 4:
        rl();
        break;
      case 31:
        e.memoizedState !== null && we(e);
        break;
      case 13:
        we(e);
        break;
      case 19:
        sf(e);
        break;
      case 10:
        Rl(e.type);
        break;
      case 22:
      case 23:
        we(e), cf(), t !== null && Kt(Oa);
        break;
      case 24:
        Rl(Ft);
    }
  }
  function mu(t, e) {
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
    } catch (s) {
      jt(e, e.return, s);
    }
  }
  function ta(t, e, l) {
    try {
      var a = e.updateQueue, n = a !== null ? a.lastEffect : null;
      if (n !== null) {
        var u = n.next;
        a = u;
        do {
          if ((a.tag & t) === t) {
            var i = a.inst, s = i.destroy;
            if (s !== void 0) {
              i.destroy = void 0, n = e;
              var d = l, S = s;
              try {
                S();
              } catch (N) {
                jt(
                  n,
                  d,
                  N
                );
              }
            }
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (N) {
      jt(e, e.return, N);
    }
  }
  function Xd(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var l = t.stateNode;
      try {
        Dr(e, l);
      } catch (a) {
        jt(t, t.return, a);
      }
    }
  }
  function Qd(t, e, l) {
    l.props = ja(
      t.type,
      t.memoizedProps
    ), l.state = t.memoizedState;
    try {
      l.componentWillUnmount();
    } catch (a) {
      jt(t, e, a);
    }
  }
  function vl(t, e) {
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
            (n.ref === null || n.ref.name !== u) && (n.ref = km(u)), a = n.ref;
            break;
          case 7:
            if (t.stateNode === null) {
              var i = new Ve(t);
              m(
                t.child,
                !1,
                xy,
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
    } catch (s) {
      jt(t, e, s);
    }
  }
  function oe(t, e) {
    var l = t.ref, a = t.refCleanup;
    if (l !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (n) {
          jt(t, e, n);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (n) {
          jt(t, e, n);
        }
      else l.current = null;
  }
  function ji(t, e) {
    if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && t.alternate === null && e !== null)
      for (var l = 0; l < e.length; l++)
        l0(
          t.stateNode,
          e[l]
        );
  }
  function Vd(t) {
    for (var e = t.return; e !== null && (Lf(e) && l0(t.stateNode, e.stateNode), !wf(e)); )
      e = e.return;
  }
  function hu(t) {
    for (var e = t.return; e !== null && (Lf(e) && Dy(t.stateNode, e.stateNode), !wf(e)); )
      e = e.return;
  }
  function wf(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 27;
  }
  function Lf(t) {
    return t && t.tag === 7 && t.stateNode !== null;
  }
  function Gf(t) {
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
      jt(t, t.return, n);
    }
  }
  function Xf(t, e, l) {
    try {
      var a = t.stateNode;
      dy(a, t.type, l, e), a[Oe] = e;
    } catch (n) {
      jt(t, t.return, n);
    }
  }
  function Zd(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && ca(t.type) || t.tag === 4;
  }
  function Qf(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Zd(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && ca(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Vf(t, e, l, a) {
    var n = t.tag;
    if (n === 5 || n === 6)
      n = t.stateNode, e ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(n, e) : (e = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, e.appendChild(n), l = l._reactRootContainer, l != null || e.onclick !== null || (e.onclick = dl)), ji(t, a), Nt = !0;
    else if (n !== 4 && (n === 27 && (ji(t, a), a = null, ca(t.type) && (l = t.stateNode, e = null)), t = t.child, t !== null))
      for (Vf(
        t,
        e,
        l,
        a
      ), t = t.sibling; t !== null; )
        Vf(
          t,
          e,
          l,
          a
        ), t = t.sibling;
  }
  function Ri(t, e, l, a) {
    var n = t.tag;
    if (n === 5 || n === 6)
      n = t.stateNode, e ? l.insertBefore(n, e) : l.appendChild(n), ji(t, a), Nt = !0;
    else if (n !== 4 && (n === 27 && (ji(t, a), a = null, ca(t.type) && (l = t.stateNode)), t = t.child, t !== null))
      for (Ri(
        t,
        e,
        l,
        a
      ), t = t.sibling; t !== null; )
        Ri(
          t,
          e,
          l,
          a
        ), t = t.sibling;
  }
  function Kd(t) {
    var e = t.stateNode, l = t.memoizedProps;
    try {
      for (var a = t.type, n = e.attributes; n.length; )
        e.removeAttributeNode(n[0]);
      re(e, a, l), e[ie] = t, e[Oe] = l;
    } catch (u) {
      jt(t, t.return, u);
    }
  }
  var Ui = !1, Le = null;
  function Jd(t) {
    (t.tag === 30 || (t.subtreeFlags & 33554432) !== 0) && (Ui = !0);
  }
  var yl = null;
  function $d() {
    var t = yl;
    return yl = null, t;
  }
  var Ce = 0;
  function vn(t, e, l, a, n) {
    return Ce = 0, Fd(
      t.child,
      e,
      l,
      a,
      n
    );
  }
  function Fd(t, e, l, a, n) {
    for (var u = !1; t !== null; ) {
      if (t.tag === 5) {
        var i = t.stateNode;
        if (a !== null) {
          var s = Os(i);
          a.push(s), s.view && (u = !0);
        } else
          u || Os(i).view && (u = !0);
        Ui = !0, $m(
          i,
          Ce === 0 ? e : e + "_" + Ce,
          l
        ), Ce++;
      } else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && n || Fd(
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
  function gl(t, e) {
    for (; t !== null; )
      t.tag === 5 ? Fm(t.stateNode, t.memoizedProps) : (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && e || gl(
        t.child,
        e
      )), t = t.sibling;
  }
  function Hi(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if ((t.tag !== 22 || t.memoizedState === null) && (Hi(t), t.tag === 30 && (t.flags & 18874368) !== 0 && t.stateNode.paired)) {
          var e = t.memoizedProps;
          if (e.name == null || e.name === "auto")
            throw Error(o(544));
          var l = e.name;
          e = Cl(e.default, e.share), e !== "none" && (vn(
            t,
            l,
            e,
            null,
            !1
          ) || gl(t.child, !1));
        }
        t = t.sibling;
      }
  }
  function Zf(t, e) {
    if (t.tag === 30) {
      var l = t.stateNode, a = t.memoizedProps, n = Al(a, l), u = Cl(
        a.default,
        l.paired ? a.share : a.enter
      );
      u !== "none" ? vn(t, n, u, null, !1) ? (Hi(t), l.paired || e || En(t, a.onEnter)) : gl(t.child, !1) : Hi(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        Zf(t, e), t = t.sibling;
    else Hi(t);
  }
  function Kf(t) {
    if (Le !== null && Le.size !== 0) {
      var e = Le;
      if ((t.subtreeFlags & 18874368) !== 0)
        for (t = t.child; t !== null; ) {
          if (t.tag !== 22 || t.memoizedState === null) {
            if (t.tag === 30 && (t.flags & 18874368) !== 0) {
              var l = t.memoizedProps, a = l.name;
              if (a != null && a !== "auto") {
                var n = e.get(a);
                if (n !== void 0) {
                  var u = Cl(
                    l.default,
                    l.share
                  );
                  if (u !== "none" && (vn(
                    t,
                    a,
                    u,
                    null,
                    !1
                  ) ? (u = t.stateNode, n.paired = u, u.paired = n, En(t, l.onShare)) : gl(t.child, !1)), e.delete(a), e.size === 0) break;
                }
              }
            }
            Kf(t);
          }
          t = t.sibling;
        }
    }
  }
  function Jf(t) {
    if (t.tag === 30) {
      var e = t.memoizedProps, l = Al(e, t.stateNode), a = Le !== null ? Le.get(l) : void 0, n = Cl(
        e.default,
        a !== void 0 ? e.share : e.exit
      );
      n !== "none" && (vn(t, l, n, null, !1) ? a !== void 0 ? (n = t.stateNode, a.paired = n, n.paired = a, Le.delete(l), En(t, e.onShare)) : En(t, e.onExit) : gl(t.child, !1)), Le !== null && Kf(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        Jf(t), t = t.sibling;
    else
      Le !== null && Kf(t);
  }
  function kd(t) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var e = t.memoizedProps, l = Al(e, t.stateNode);
        e = Cl(e.default, e.update), t.flags &= -5, e !== "none" && vn(
          t,
          l,
          e,
          t.memoizedState = [],
          !1
        );
      } else
        (t.subtreeFlags & 33554432) !== 0 && kd(t);
      t = t.sibling;
    }
  }
  function $f(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if (t.tag !== 22 || t.memoizedState === null) {
          if (t.tag === 30 && (t.flags & 18874368) !== 0) {
            var e = t.stateNode;
            e.paired !== null && (e.paired = null, gl(t.child, !1));
          }
          $f(t);
        }
        t = t.sibling;
      }
  }
  function Bi(t) {
    if (t.tag === 30)
      t.stateNode.paired = null, gl(t.child, !1), $f(t);
    else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        Bi(t), t = t.sibling;
    else $f(t);
  }
  function Wd(t) {
    for (t = t.child; t !== null; )
      t.tag === 30 ? gl(t.child, !1) : (t.subtreeFlags & 33554432) !== 0 && Wd(t), t = t.sibling;
  }
  function Ff(t, e, l, a, n, u, i) {
    for (var s = !1; e !== null; ) {
      if (e.tag === 5) {
        var d = e.stateNode;
        if (u !== null && Ce < u.length) {
          var S = u[Ce], N = Os(d);
          (S.view || N.view) && (s = !0);
          var C;
          if (C = (t.flags & 4) === 0)
            if (N.clip) C = !0;
            else {
              C = S.rect;
              var b = N.rect;
              C = C.y !== b.y || C.x !== b.x || C.height !== b.height || C.width !== b.width;
            }
          C && (t.flags |= 4), N.abs ? N = !S.abs : (S = S.rect, N = N.rect, N = S.height !== N.height || S.width !== N.width), N && (t.flags |= 32);
        } else t.flags |= 32;
        (t.flags & 4) !== 0 && $m(
          d,
          Ce === 0 ? l : l + "_" + Ce,
          n
        ), s && (t.flags & 4) !== 0 || (yl === null && (yl = []), yl.push(
          d,
          Ce === 0 ? a : a + "_" + Ce,
          e.memoizedProps
        )), Ce++;
      } else (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && i ? t.flags |= e.flags & 32 : Ff(
        t,
        e.child,
        l,
        a,
        n,
        u,
        i
      ) && (s = !0));
      e = e.sibling;
    }
    return s;
  }
  function Id(t, e) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var l = t.memoizedProps, a = t.stateNode, n = Al(l, a), u = Cl(l.default, l.update), i;
        i = t.memoizedState, t.memoizedState = null, a = t;
        var s = t.child;
        Ce = 0, n = Ff(
          a,
          s,
          n,
          n,
          u,
          i,
          !1
        ), (t.flags & 4) !== 0 && n && En(t, l.onUpdate);
      } else
        (t.subtreeFlags & 33554432) !== 0 && Id(t);
      t = t.sibling;
    }
  }
  var ae = !1, Ct = !1, bl = !1, kf = !1, Pd = typeof WeakSet == "function" ? WeakSet : Set, ne = null, pl = !1, vu = !1, qi = !1, Wf = !1;
  function Gv(t, e, l) {
    if (t = t.containerInfo, Ts = Rn, t = ar(t), Bc(t)) {
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
            var s = 0, d = -1, S = -1, N = 0, C = 0, b = t, T = null;
            e: for (; ; ) {
              for (var L; b !== a || u !== 0 && b.nodeType !== 3 || (d = s + u), b !== i || n !== 0 && b.nodeType !== 3 || (S = s + n), b.nodeType === 3 && (s += b.nodeValue.length), (L = b.firstChild) !== null; )
                T = b, b = L;
              for (; ; ) {
                if (b === t) break e;
                if (T === a && ++N === u && (d = s), T === i && ++C === n && (S = s), (L = b.nextSibling) !== null) break;
                b = T, T = b.parentNode;
              }
              b = L;
            }
            a = d === -1 || S === -1 ? null : { start: d, end: S };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (Es = { focusedElem: t, selectionRange: a }, Rn = !1, l = (l & 335544064) === l, ne = e, e = l ? 9270 : 1024; ne !== null; ) {
      if (t = ne, l && (a = t.deletions, a !== null))
        for (u = 0; u < a.length; u++)
          l && Jf(a[u]);
      if (t.alternate === null && (t.flags & 2) !== 0)
        l && Jd(t), Yi(l);
      else {
        if (t.tag === 22) {
          if (a = t.alternate, t.memoizedState !== null) {
            a !== null && a.memoizedState === null && l && Jf(a), Yi(l);
            continue;
          } else if (a !== null && a.memoizedState !== null) {
            l && Jd(t), Yi(l);
            continue;
          }
        }
        a = t.child, (t.subtreeFlags & e) !== 0 && a !== null ? (a.return = t, ne = a) : (l && kd(t), Yi(l));
      }
    }
    Le = null;
  }
  function Yi(t) {
    for (; ne !== null; ) {
      var e = ne, l = t, a = e.alternate, n = e.flags;
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
              var i = ja(
                e.type,
                n
              );
              l = u.getSnapshotBeforeUpdate(
                i,
                a
              ), u.__reactInternalSnapshotBeforeUpdate = l;
            } catch (s) {
              jt(e, e.return, s);
            }
          }
          break;
        case 3:
          if ((n & 1024) !== 0) {
            if (a = e.stateNode.containerInfo, l = a.nodeType, l === 9)
              xs(a);
            else if (l === 1)
              switch (a.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  xs(a);
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
          ), n = e.memoizedProps, n = Cl(n.default, n.update), n !== "none" && vn(
            a,
            l,
            n,
            a.memoizedState = [],
            !0
          ));
          break;
        default:
          if ((n & 1024) !== 0) throw Error(o(163));
      }
      if (a = e.sibling, a !== null) {
        a.return = e.return, ne = a;
        break;
      }
      ne = e.return;
    }
  }
  function tm(t, e, l) {
    var a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Sl(t, l), a & 4 && mu(5, l);
        break;
      case 1:
        if (Sl(t, l), a & 4)
          if (t = l.stateNode, e === null)
            try {
              t.componentDidMount();
            } catch (i) {
              jt(l, l.return, i);
            }
          else {
            var n = ja(
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
              jt(
                l,
                l.return,
                i
              );
            }
          }
        a & 64 && Xd(l), a & 512 && vl(l, l.return);
        break;
      case 3:
        if (Sl(t, l), a & 64 && (t = l.updateQueue, t !== null)) {
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
            Dr(t, e);
          } catch (i) {
            jt(l, l.return, i);
          }
        }
        break;
      case 27:
        e === null && a & 4 && Kd(l);
      case 26:
      case 5:
        Sl(t, l), e === null && a & 4 && Gf(l), a & 512 && vl(l, l.return);
        break;
      case 12:
        Sl(t, l);
        break;
      case 31:
        Sl(t, l), a & 4 && nm(t, l);
        break;
      case 13:
        Sl(t, l), a & 4 && um(t, l), a & 64 && (t = l.memoizedState, t !== null && (t = t.dehydrated, t !== null && (l = Pv.bind(
          null,
          l
        ), Uy(t, l))));
        break;
      case 22:
        if (a = l.memoizedState !== null || ae, !a) {
          var u = e !== null && e.memoizedState !== null || Ct;
          e = ae, n = Ct, ae = a, (Ct = u) && !n ? (a = 2, (l.subtreeFlags & 8772) !== 0 && (a |= 1), il(
            t,
            l,
            a
          )) : Sl(t, l), ae = e, Ct = n;
        }
        break;
      case 30:
        Sl(t, l), a & 512 && vl(l, l.return);
        break;
      case 7:
        a & 512 && vl(l, l.return);
      default:
        Sl(t, l);
    }
  }
  function If(t, e) {
    for (t = t.child; t !== null; )
      em(t, e), t = t.sibling;
  }
  function em(t, e) {
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
        } catch (d) {
          jt(t, t.return, d);
        }
        Pf(t, e);
        break;
      case 6:
        try {
          t.stateNode.nodeValue = e ? "" : t.memoizedProps, Nt = !0;
        } catch (d) {
          jt(t, t.return, d);
        }
        break;
      case 18:
        try {
          var s = t.stateNode;
          e ? Jm(s, !0) : Jm(t.stateNode, !1);
        } catch (d) {
          jt(t, t.return, d);
        }
        break;
      case 22:
      case 23:
        t.memoizedState === null && If(t, e);
        break;
      default:
        If(t, e);
    }
  }
  function Pf(t, e) {
    if (t.subtreeFlags & 67108864)
      for (t = t.child; t !== null; ) {
        t: {
          var l = t, a = e;
          switch (l.tag) {
            case 4:
              em(l, a);
              break t;
            case 22:
              l.memoizedState === null && Pf(l, a);
              break t;
            default:
              Pf(l, a);
          }
        }
        t = t.sibling;
      }
  }
  function lm(t) {
    var e = t.alternate;
    e !== null && (t.alternate = null, lm(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && Qu(e)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Gt = null, xe = !1;
  function nl(t, e, l) {
    for (l = l.child; l !== null; )
      am(t, e, l), l = l.sibling;
  }
  function am(t, e, l) {
    if (He && typeof He.onCommitFiberUnmount == "function")
      try {
        He.onCommitFiberUnmount(Yn, l);
      } catch {
      }
    switch (l.tag) {
      case 26:
        Ct || oe(l, e), nl(
          t,
          e,
          l
        ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && !Ct && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        Ct || oe(l, e), hu(l);
        var a = Gt, n = xe;
        ca(l.type) && (Gt = l.stateNode, xe = !1), nl(
          t,
          e,
          l
        ), c0(
          l.stateNode,
          l.type,
          l.memoizedProps
        ), Gt = a, xe = n;
        break;
      case 5:
        Ct || oe(l, e), hu(l);
      case 6:
        if (l.tag === 6 && hu(l), a = Gt, n = xe, Gt = null, nl(
          t,
          e,
          l
        ), Gt = a, xe = n, Gt !== null)
          if (xe)
            try {
              (Gt.nodeType === 9 ? Gt.body : Gt.nodeName === "HTML" ? Gt.ownerDocument.body : Gt).removeChild(l.stateNode), Nt = !0;
            } catch (u) {
              jt(
                l,
                e,
                u
              );
            }
          else
            try {
              Gt.removeChild(l.stateNode), Nt = !0;
            } catch (u) {
              jt(
                l,
                e,
                u
              );
            }
        break;
      case 18:
        Gt !== null && (xe ? (t = Gt, Km(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          l.stateNode
        ), Un(t)) : Km(Gt, l.stateNode));
        break;
      case 4:
        a = Gt, n = xe, Gt = l.stateNode.containerInfo, xe = !0, nl(
          t,
          e,
          l
        ), Gt = a, xe = n;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        ta(2, l, e), Ct || ta(4, l, e), nl(
          t,
          e,
          l
        );
        break;
      case 1:
        Ct || (oe(l, e), a = l.stateNode, typeof a.componentWillUnmount == "function" && Qd(
          l,
          e,
          a
        )), nl(
          t,
          e,
          l
        );
        break;
      case 21:
        nl(
          t,
          e,
          l
        );
        break;
      case 22:
        Ct = (a = Ct) || l.memoizedState !== null, nl(
          t,
          e,
          l
        ), Ct = a;
        break;
      case 30:
        oe(l, e), nl(
          t,
          e,
          l
        );
        break;
      case 7:
        Ct || oe(l, e), nl(
          t,
          e,
          l
        );
        break;
      default:
        nl(
          t,
          e,
          l
        );
    }
  }
  function nm(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        Un(t);
      } catch (l) {
        jt(e, e.return, l);
      }
    }
  }
  function um(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        Un(t);
      } catch (l) {
        jt(e, e.return, l);
      }
  }
  function Xv(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return e === null && (e = t.stateNode = new Pd()), e;
      case 22:
        return t = t.stateNode, e = t._retryCache, e === null && (e = t._retryCache = new Pd()), e;
      default:
        throw Error(o(435, t.tag));
    }
  }
  function wi(t, e) {
    var l = Xv(t);
    e.forEach(function(a) {
      if (!l.has(a)) {
        l.add(a);
        var n = ty.bind(null, t, a);
        a.then(n, n);
      }
    });
  }
  function _e(t, e, l) {
    var a = e.deletions;
    if (a !== null)
      for (var n = 0; n < a.length; n++) {
        var u = a[n], i = t, s = e, d = s;
        t: for (; d !== null; ) {
          switch (d.tag) {
            case 27:
              if (ca(d.type)) {
                Gt = d.stateNode, xe = !1;
                break t;
              }
              break;
            case 5:
              Gt = d.stateNode, xe = !1;
              break t;
            case 3:
            case 4:
              Gt = d.stateNode.containerInfo, xe = !0;
              break t;
          }
          d = d.return;
        }
        if (Gt === null) throw Error(o(160));
        am(i, s, u), Gt = null, xe = !1, i = u.alternate, i !== null && (i.return = null), u.return = null;
      }
    if (e.subtreeFlags & 13886)
      for (e = e.child; e !== null; )
        im(e, t, l), e = e.sibling;
  }
  var ul = null;
  function im(t, e, l) {
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
        _e(e, t, l), Te(t), n & 4 && (ta(3, t, t.return), mu(3, t), ta(5, t, t.return));
        break;
      case 1:
        _e(e, t, l), Te(t), n & 512 && (Ct || a === null || oe(a, a.return)), n & 64 && ae && (t = t.updateQueue, t !== null && (e = t.callbacks, e !== null && (l = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = l === null ? e : l.concat(e))));
        break;
      case 26:
        if (u = ul, _e(e, t, l), Te(t), n & 512 && (Ct || a === null || oe(a, a.return)), n & 4)
          if (n = a !== null ? a.memoizedState : null, l = t.memoizedState, a === null)
            if (l === null)
              if (t.stateNode === null)
                if (ae)
                  t.stateNode = Qm(
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
                        a = n.getElementsByTagName("title")[0], (!a || a[Gn] || a[ie] || a.namespaceURI === "http://www.w3.org/2000/svg" || a.hasAttribute("itemprop")) && (a = n.createElement(e), n.head.insertBefore(
                          a,
                          n.querySelector("head > title")
                        )), re(a, e, l), a[ie] = t, ee(a), e = a;
                        break t;
                      case "link":
                        if (u = m0(
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
                        a = n.createElement(e), re(a, e, l), n.head.appendChild(a);
                        break;
                      case "meta":
                        if (u = m0(
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
                        a = n.createElement(e), re(a, e, l), n.head.appendChild(a);
                        break;
                      default:
                        throw Error(o(468, e));
                    }
                    a[ie] = t, ee(a), e = a;
                  }
                  t.stateNode = e;
                }
              else
                ae || qs(u, t.type, t.stateNode);
            else
              t.stateNode = d0(
                u,
                l,
                t.memoizedProps
              );
          else
            n !== l ? (n === null ? (e = a.stateNode, e === null || Ct || e.parentNode.removeChild(e)) : n.count--, l === null ? ae || qs(u, t.type, t.stateNode) : d0(u, l, t.memoizedProps)) : l === null && t.stateNode !== null && Xf(
              t,
              t.memoizedProps,
              a.memoizedProps
            );
        break;
      case 27:
        _e(e, t, l), Te(t), n & 512 && (Ct || a === null || oe(a, a.return)), a !== null && n & 4 && Xf(
          t,
          t.memoizedProps,
          a.memoizedProps
        );
        break;
      case 5:
        if (u = bl, bl = !1, _e(e, t, l), bl = u, Te(t), n & 512 && (Ct || a === null || oe(a, a.return)), t.flags & 32) {
          e = t.stateNode;
          try {
            ka(e, ""), Nt = !0;
          } catch (N) {
            jt(t, t.return, N);
          }
        }
        n & 4 && t.stateNode != null && (e = t.memoizedProps, Xf(
          t,
          e,
          a !== null ? a.memoizedProps : e
        )), n & 1024 && (kf = !0);
        break;
      case 6:
        if (_e(e, t, l), Te(t), n & 4) {
          if (t.stateNode === null)
            throw Error(o(162));
          e = t.memoizedProps, l = t.stateNode;
          try {
            l.nodeValue = e, Nt = !0;
          } catch (N) {
            jt(t, t.return, N);
          }
        }
        break;
      case 3:
        if (Nt = !1, tc = null, u = ul, ul = Nu(e.containerInfo), _e(e, t, l), ul = u, Te(t), n & 4 && a !== null && a.memoizedState.isDehydrated)
          try {
            Un(e.containerInfo);
          } catch (N) {
            jt(t, t.return, N);
          }
        kf && (kf = !1, cm(t)), Nt = !1;
        break;
      case 4:
        n = bl, bl = ae, a = Oo(), u = ul, ul = Nu(
          t.stateNode.containerInfo
        ), _e(e, t, l), Te(t), ul = u, Nt && vu && (qi = !0), Nt = a, bl = n;
        break;
      case 12:
        _e(e, t, l), Te(t);
        break;
      case 31:
        _e(e, t, l), Te(t), n & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, wi(t, e)));
        break;
      case 13:
        _e(e, t, l), Te(t), t.child.flags & 8192 && t.memoizedState !== null != (a !== null && a.memoizedState !== null) && (Xi = Ue()), n & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, wi(t, e)));
        break;
      case 22:
        u = t.memoizedState !== null, i = a !== null && a.memoizedState !== null;
        var s = ae, d = Ct, S = bl;
        ae = s || u, bl = S || u, Ct = d || i, _e(e, t, l), Ct = d, bl = S, ae = s, Te(t), n & 8192 && (e = t.stateNode, e._visibility = u ? e._visibility & -2 : e._visibility | 1, !u || a === null || i || ae || Ct || (e = i || Ct, l = ae, a = Ct, ae = u || ae, Ct = e, ea(t, 2), ae = l, Ct = a), !u && bl || If(t, u)), n & 4 && (e = t.updateQueue, e !== null && (l = e.retryQueue, l !== null && (e.retryQueue = null, wi(t, l))));
        break;
      case 19:
        _e(e, t, l), Te(t), n & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, wi(t, e)));
        break;
      case 30:
        n & 512 && (Ct || a === null || oe(a, a.return)), n = Oo(), u = vu, i = (l & 335544064) === l, s = t.memoizedProps, vu = i && Cl(
          s.default,
          s.update
        ) !== "none", _e(e, t, l), Te(t), i && a !== null && Nt && (t.flags |= 4), vu = u, Nt = n;
        break;
      case 21:
        break;
      case 7:
        n & 512 && (Ct || a === null || oe(a, a.return)), a && a.stateNode !== null && (a.stateNode._fragmentFiber = t);
      default:
        _e(e, t, l), Te(t);
    }
  }
  function Te(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        for (var l, a = t.return; a !== null; ) {
          if (Zd(a)) {
            l = a;
            break;
          }
          a = a.return;
        }
        a = null;
        for (var n = t.return; n !== null; ) {
          if (Lf(n)) {
            var u = n.stateNode;
            a === null ? a = [u] : a.push(u);
          }
          if (wf(n)) break;
          n = n.return;
        }
        var i = a;
        if (l == null) throw Error(o(160));
        switch (l.tag) {
          case 27:
            var s = l.stateNode, d = Qf(t);
            Ri(
              t,
              d,
              s,
              i
            );
            break;
          case 5:
            var S = l.stateNode;
            l.flags & 32 && (ka(S, ""), l.flags &= -33);
            var N = Qf(t);
            Ri(
              t,
              N,
              S,
              i
            );
            break;
          case 3:
          case 4:
            var C = l.stateNode.containerInfo, b = Qf(t);
            Vf(
              t,
              b,
              C,
              i
            );
            break;
          default:
            throw Error(o(161));
        }
      } catch (T) {
        jt(t, t.return, T);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function cm(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        cm(e), e.tag === 5 && e.flags & 1024 && (e = e.stateNode, Rn = !0, e.reset(), Rn = !1), t = t.sibling;
      }
  }
  function yn(t, e) {
    if (e.subtreeFlags & 9270)
      for (e = e.child; e !== null; )
        fm(e, t), e = e.sibling;
    else Id(e);
  }
  function fm(t, e) {
    var l = t.alternate;
    if (l === null) Zf(t, !1);
    else
      switch (t.tag) {
        case 3:
          if (Wf = pl = !1, $d(), yn(e, t), !pl && !qi) {
            if (t = yl, t !== null)
              for (var a = 0; a < t.length; a += 3) {
                l = t[a];
                var n = t[a + 1];
                Fm(l, t[a + 2]), l = l.ownerDocument.documentElement, l !== null && l.animate(
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
            )), Wf = !0;
          }
          yl = null;
          break;
        case 5:
          yn(e, t);
          break;
        case 4:
          a = pl, pl = !1, yn(e, t), pl && (qi = !0), pl = a;
          break;
        case 22:
          t.memoizedState === null && (l.memoizedState !== null ? Zf(t, !1) : yn(e, t));
          break;
        case 30:
          a = pl, n = $d(), pl = !1, yn(e, t), pl && (t.flags |= 4);
          var u = t.memoizedProps, i = t.stateNode;
          e = Al(u, i), i = Al(l.memoizedProps, i);
          var s = Cl(u.default, u.update);
          s === "none" ? e = !1 : (u = l.memoizedState, l.memoizedState = null, l = t.child, Ce = 0, e = Ff(
            t,
            l,
            e,
            i,
            s,
            u,
            !0
          ), Ce !== (u === null ? 0 : u.length) && (t.flags |= 32)), (t.flags & 4) !== 0 && e ? (En(
            t,
            t.memoizedProps.onUpdate
          ), yl = n) : n !== null && (n.push.apply(n, yl), yl = n), pl = (t.flags & 32) !== 0 ? !0 : a;
          break;
        default:
          yn(e, t);
      }
  }
  function Sl(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; )
        tm(t, e.alternate, e), e = e.sibling;
  }
  function ea(t, e) {
    for (t = t.child; t !== null; ) {
      var l = t, a = e;
      switch (l.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ta(4, l, l.return), ea(
            l,
            a
          );
          break;
        case 1:
          oe(l, l.return);
          var n = l.stateNode;
          typeof n.componentWillUnmount == "function" && Qd(
            l,
            l.return,
            n
          ), ea(
            l,
            a
          );
          break;
        case 27:
          (a & 2) !== 0 && c0(
            l.stateNode,
            l.type,
            l.memoizedProps
          );
        case 5:
          oe(l, l.return), l.tag !== 5 && l.tag !== 27 || hu(l), ea(
            l,
            a
          );
          break;
        case 6:
          hu(l);
          break;
        case 26:
          oe(l, l.return), n = l.stateNode, l.memoizedState !== null || n === null || Ct || n.parentNode.removeChild(n), ea(
            l,
            a
          );
          break;
        case 22:
          l.memoizedState === null && ea(
            l,
            a
          );
          break;
        case 30:
          oe(l, l.return), ea(
            l,
            a
          );
          break;
        case 7:
          oe(l, l.return);
        default:
          ea(
            l,
            a
          );
      }
      t = t.sibling;
    }
  }
  function il(t, e, l) {
    for (l = (e.subtreeFlags & 8772) !== 0 ? l : l & -2, e = e.child; e !== null; ) {
      var a = e.alternate, n = t, u = e, i = u.flags, s = (l & 1) !== 0;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          il(
            n,
            u,
            l
          ), mu(4, u);
          break;
        case 1:
          if (il(
            n,
            u,
            l
          ), a = u, n = a.stateNode, typeof n.componentDidMount == "function")
            try {
              n.componentDidMount();
            } catch (N) {
              jt(a, a.return, N);
            }
          if (a = u, n = a.updateQueue, n !== null) {
            var d = a.stateNode;
            try {
              var S = n.shared.hiddenCallbacks;
              if (S !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < S.length; n++)
                  xr(S[n], d);
            } catch (N) {
              jt(a, a.return, N);
            }
          }
          s && i & 64 && Xd(u), vl(u, u.return);
          break;
        case 27:
          (l & 2) !== 0 && Kd(u);
        case 5:
          u.tag !== 5 && u.tag !== 27 || Vd(u), il(
            n,
            u,
            l
          ), s && a === null && i & 4 && Gf(u), vl(u, u.return);
          break;
        case 6:
          Vd(u);
          break;
        case 26:
          d = u.stateNode, u.memoizedState !== null || d === null || ae || qs(
            Nu(d.ownerDocument),
            u.type,
            d
          ), il(
            n,
            u,
            l
          ), s && a === null && i & 4 && Gf(u), vl(u, u.return);
          break;
        case 12:
          il(
            n,
            u,
            l
          );
          break;
        case 31:
          il(
            n,
            u,
            l
          ), s && i & 4 && nm(n, u);
          break;
        case 13:
          il(
            n,
            u,
            l
          ), s && i & 4 && um(n, u);
          break;
        case 22:
          u.memoizedState === null && il(
            n,
            u,
            l
          ), vl(u, u.return);
          break;
        case 30:
          il(
            n,
            u,
            l
          ), vl(u, u.return);
          break;
        case 7:
          vl(u, u.return);
        default:
          il(
            n,
            u,
            l
          );
      }
      e = e.sibling;
    }
  }
  function ts(t, e) {
    var l = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), t = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), t !== l && (t != null && t.refCount++, l != null && tu(l));
  }
  function es(t, e) {
    t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && tu(t));
  }
  function Pe(t, e, l, a) {
    var n = (l & 335544064) === l;
    if (e.subtreeFlags & (n ? 10262 : 10256))
      for (e = e.child; e !== null; )
        sm(
          t,
          e,
          l,
          a
        ), e = e.sibling;
    else n && Wd(e);
  }
  function sm(t, e, l, a) {
    var n = (l & 335544064) === l;
    n && e.alternate === null && e.return !== null && e.return.alternate !== null && Bi(e);
    var u = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Pe(
          t,
          e,
          l,
          a
        ), u & 2048 && mu(9, e);
        break;
      case 1:
        Pe(
          t,
          e,
          l,
          a
        );
        break;
      case 3:
        Pe(
          t,
          e,
          l,
          a
        ), n && Wf && (t = t.containerInfo, t = t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, t.style.viewTransitionName === "root" && (t.style.viewTransitionName = ""), t = t.ownerDocument.documentElement, t !== null && t.style.viewTransitionName === "none" && (t.style.viewTransitionName = "")), u & 2048 && (u = null, e.alternate !== null && (u = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== u && (e.refCount++, u != null && tu(u)));
        break;
      case 12:
        if (u & 2048) {
          Pe(
            t,
            e,
            l,
            a
          ), u = e.stateNode;
          try {
            var i = e.memoizedProps, s = i.id, d = i.onPostCommit;
            typeof d == "function" && d(
              s,
              e.alternate === null ? "mount" : "update",
              u.passiveEffectDuration,
              -0
            );
          } catch (S) {
            jt(e, e.return, S);
          }
        } else
          Pe(
            t,
            e,
            l,
            a
          );
        break;
      case 31:
        Pe(
          t,
          e,
          l,
          a
        );
        break;
      case 13:
        Pe(
          t,
          e,
          l,
          a
        );
        break;
      case 23:
        break;
      case 22:
        i = e.stateNode, s = e.alternate, e.memoizedState !== null ? (n && s !== null && s.memoizedState === null && Bi(s), i._visibility & 2 ? Pe(
          t,
          e,
          l,
          a
        ) : yu(
          t,
          e
        )) : (n && s !== null && s.memoizedState !== null && Bi(e), i._visibility & 2 ? Pe(
          t,
          e,
          l,
          a
        ) : (i._visibility |= 2, gn(
          t,
          e,
          l,
          a,
          (e.subtreeFlags & 10256) !== 0 || !1
        ))), u & 2048 && ts(s, e);
        break;
      case 24:
        Pe(
          t,
          e,
          l,
          a
        ), u & 2048 && es(e.alternate, e);
        break;
      case 30:
        n && (u = e.alternate, u !== null && (gl(u.child, !0), gl(e.child, !0))), Pe(
          t,
          e,
          l,
          a
        );
        break;
      default:
        Pe(
          t,
          e,
          l,
          a
        );
    }
  }
  function gn(t, e, l, a, n) {
    for (n = n && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var u = t, i = e, s = l, d = a, S = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          gn(
            u,
            i,
            s,
            d,
            n
          ), mu(8, i);
          break;
        case 23:
          break;
        case 22:
          var N = i.stateNode;
          i.memoizedState !== null ? N._visibility & 2 ? gn(
            u,
            i,
            s,
            d,
            n
          ) : yu(
            u,
            i
          ) : (N._visibility |= 2, gn(
            u,
            i,
            s,
            d,
            n
          )), n && S & 2048 && ts(
            i.alternate,
            i
          );
          break;
        case 24:
          gn(
            u,
            i,
            s,
            d,
            n
          ), n && S & 2048 && es(i.alternate, i);
          break;
        default:
          gn(
            u,
            i,
            s,
            d,
            n
          );
      }
      e = e.sibling;
    }
  }
  function yu(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var l = t, a = e, n = a.flags;
        switch (a.tag) {
          case 22:
            yu(l, a), n & 2048 && ts(
              a.alternate,
              a
            );
            break;
          case 24:
            yu(l, a), n & 2048 && es(a.alternate, a);
            break;
          default:
            yu(l, a);
        }
        e = e.sibling;
      }
  }
  var Ra = 8192;
  function Ua(t, e, l) {
    if (t.subtreeFlags & Ra)
      for (t = t.child; t !== null; )
        om(
          t,
          e,
          l
        ), t = t.sibling;
  }
  function om(t, e, l) {
    switch (t.tag) {
      case 26:
        Ua(
          t,
          e,
          l
        ), t.flags & Ra && (t.memoizedState !== null ? $y(
          l,
          ul,
          t.memoizedState,
          t.memoizedProps
        ) : (t = t.stateNode, (e & 335544128) === e && g0(l, t)));
        break;
      case 5:
        Ua(
          t,
          e,
          l
        ), t.flags & Ra && (t = t.stateNode, (e & 335544128) === e && g0(l, t));
        break;
      case 3:
      case 4:
        var a = ul;
        ul = Nu(t.stateNode.containerInfo), Ua(
          t,
          e,
          l
        ), ul = a;
        break;
      case 22:
        t.memoizedState === null && (a = t.alternate, a !== null && a.memoizedState !== null ? (a = Ra, Ra = 16777216, Ua(
          t,
          e,
          l
        ), Ra = a) : Ua(
          t,
          e,
          l
        ));
        break;
      case 30:
        if ((t.flags & Ra) !== 0 && (a = t.memoizedProps.name, a != null && a !== "auto")) {
          var n = t.stateNode;
          n.paired = null, Le === null && (Le = /* @__PURE__ */ new Map()), Le.set(a, n);
        }
        Ua(
          t,
          e,
          l
        );
        break;
      default:
        Ua(
          t,
          e,
          l
        );
    }
  }
  function rm(t) {
    var e = t.alternate;
    if (e !== null && (t = e.child, t !== null)) {
      e.child = null;
      do
        e = t.sibling, t.sibling = null, t = e;
      while (t !== null);
    }
  }
  function gu(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var a = e[l];
          ne = a, mm(
            a,
            t
          );
        }
      rm(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        dm(t), t = t.sibling;
  }
  function dm(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        gu(t), t.flags & 2048 && ta(9, t, t.return);
        break;
      case 3:
        gu(t);
        break;
      case 12:
        gu(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (e._visibility &= -3, Li(t)) : gu(t);
        break;
      default:
        gu(t);
    }
  }
  function Li(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var a = e[l];
          ne = a, mm(
            a,
            t
          );
        }
      rm(t);
    }
    for (t = t.child; t !== null; ) {
      switch (e = t, e.tag) {
        case 0:
        case 11:
        case 15:
          ta(8, e, e.return), Li(e);
          break;
        case 22:
          l = e.stateNode, l._visibility & 2 && (l._visibility &= -3, Li(e));
          break;
        default:
          Li(e);
      }
      t = t.sibling;
    }
  }
  function mm(t, e) {
    for (; ne !== null; ) {
      var l = ne;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          ta(8, l, e);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var a = l.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          tu(l.memoizedState.cache);
      }
      if (a = l.child, a !== null) a.return = l, ne = a;
      else
        t: for (l = t; ne !== null; ) {
          a = ne;
          var n = a.sibling, u = a.return;
          if (lm(a), a === l) {
            ne = null;
            break t;
          }
          if (n !== null) {
            n.return = u, ne = n;
            break t;
          }
          ne = u;
        }
    }
  }
  var Qv = {
    getCacheForType: function(t) {
      var e = ce(Ft), l = e.data.get(t);
      return l === void 0 && (l = t(), e.data.set(t, l)), l;
    },
    cacheSignal: function() {
      return ce(Ft).controller.signal;
    }
  }, Vv = typeof WeakMap == "function" ? WeakMap : Map, At = 0, Ht = null, yt = null, St = 0, Dt = 0, Ge = null, la = !1, bn = !1, ls = !1, Yl = 0, Zt = 0, aa = 0, Ha = 0, Gi = 0, Xe = 0, pn = 0, bu = null, De = null, as = !1, Xi = 0, hm = 0, Qi = 1 / 0, Vi = null, na = null, Xt = 0, cl = null, Ba = null, _l = 0, ns = 0, us = null, vm = null, Sn = null, _n = null, Tn = null, pu = 0, Zi = null;
  function Qe() {
    return (At & 2) !== 0 && St !== 0 ? St & -St : X.T !== null ? vs() : bo();
  }
  function ym() {
    if (Xe === 0)
      if ((St & 536870912) === 0 || mt) {
        var t = wu;
        wu <<= 1, (wu & 3932160) === 0 && (wu = 262144), Xe = t;
      } else Xe = 536870912;
    return t = fe.current, t !== null && (t.flags |= 32), Xe;
  }
  function En(t, e) {
    if (e != null) {
      var l = t.stateNode, a = l.ref;
      a === null && (a = l.ref = km(
        Al(t.memoizedProps, l)
      )), _n === null && (_n = []), _n.push(e.bind(null, a));
    }
  }
  function je(t, e, l) {
    (t === Ht && (Dt === 2 || Dt === 9) || t.cancelPendingCommit !== null) && (Nn(t, 0), ua(
      t,
      St,
      Xe,
      !1
    )), Ln(t, l), ((At & 2) === 0 || t !== Ht) && (t === Ht && ((At & 2) === 0 && (Ha |= l), Zt === 4 && ua(
      t,
      St,
      Xe,
      !1
    )), Tl(t));
  }
  function gm(t, e, l) {
    if ((At & 6) !== 0) throw Error(o(327));
    var a = !l && (e & 127) === 0 && (e & t.expiredLanes) === 0 || wn(t, e), n = a ? Jv(t, e) : cs(t, e, !0), u = a;
    do {
      if (n === 0) {
        bn && !a && ua(t, e, 0, !1);
        break;
      } else {
        if (l = t.current.alternate, u && !Zv(l)) {
          n = cs(t, e, !1), u = !1;
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
              var s = t;
              n = bu;
              var d = s.current.memoizedState.isDehydrated;
              if (d && (Nn(s, i).flags |= 256), i = cs(
                s,
                i,
                !1
              ), i !== 2 && i !== 6) {
                if (ls && !d) {
                  s.errorRecoveryDisabledLanes |= u, Ha |= u, n = 4;
                  break t;
                }
                u = De, De = n, u !== null && (De === null ? De = u : De.push.apply(
                  De,
                  u
                ));
              }
              n = i;
            }
            if (u = !1, n !== 2) continue;
          }
        }
        if (n === 1) {
          Nn(t, 0), ua(t, e, 0, !0);
          break;
        }
        t: {
          switch (a = t, u = n, u) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((e & 4194048) !== e && (e & 62914560) !== e)
                break;
            case 6:
              ua(
                a,
                e,
                Xe,
                !la
              );
              break t;
            case 2:
              De = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((e & 62914560) === e && (n = Xi + 300 - Ue(), 10 < n)) {
            if (ua(
              a,
              e,
              Xe,
              !la
            ), Gu(a, 0, !0) !== 0) break t;
            _l = e, a.timeoutHandle = Ms(
              bm.bind(
                null,
                a,
                l,
                De,
                Vi,
                as,
                e,
                Xe,
                Ha,
                pn,
                la,
                u,
                "Throttled",
                -0,
                0
              ),
              n
            );
            break t;
          }
          bm(
            a,
            l,
            De,
            Vi,
            as,
            e,
            Xe,
            Ha,
            pn,
            la,
            u,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Tl(t);
  }
  function bm(t, e, l, a, n, u, i, s, d, S, N, C, b, T) {
    t.timeoutHandle = -1;
    var L = e.subtreeFlags, K = (u & 335544064) === u;
    if (C = null, (K || L & 8192 || (L & 16785408) === 16785408) && (C = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: dl
    }, Le = null, om(
      e,
      u,
      C
    ), K && (L = C, K = t.containerInfo, K = (K.nodeType === 9 ? K : K.ownerDocument).__reactViewTransition, K != null && (L.count++, L.waitingForViewTransition = !0, L = Ou.bind(L), K.finished.then(L, L))), L = (u & 62914560) === u ? Xi - Ue() : (u & 4194048) === u ? hm - Ue() : 0, L = Fy(
      C,
      L
    ), L !== null)) {
      _l = u, t.cancelPendingCommit = L(
        Mm.bind(
          null,
          t,
          e,
          u,
          l,
          a,
          n,
          i,
          s,
          d,
          S,
          N,
          C,
          null,
          b,
          T
        )
      ), ua(t, u, i, !S);
      return;
    }
    Mm(
      t,
      e,
      u,
      l,
      a,
      n,
      i,
      s,
      d,
      S,
      N,
      C
    );
  }
  function Zv(t) {
    for (var e = t; ; ) {
      var l = e.tag;
      if ((l === 0 || l === 11 || l === 15) && e.flags & 16384 && (l = e.updateQueue, l !== null && (l = l.stores, l !== null)))
        for (var a = 0; a < l.length; a++) {
          var n = l[a], u = n.getSnapshot;
          n = n.value;
          try {
            if (!Ye(u(), n)) return !1;
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
  function ua(t, e, l, a) {
    e = mo(t, e), e &= ~Gi, e &= ~Ha, t.suspendedLanes |= e, t.pingedLanes &= ~e, a && (t.warmLanes |= e), a = t.expirationTimes;
    for (var n = e; 0 < n; ) {
      var u = 31 - Be(n), i = 1 << u;
      a[u] = -1, n &= ~i;
    }
    l !== 0 && vo(t, l, e);
  }
  function Ki() {
    return (At & 6) === 0 ? (Su(0), !1) : !0;
  }
  function is() {
    if (yt !== null) {
      if (Dt === 0)
        var t = yt.return;
      else
        t = yt, jl = Ea = null, hf(t), on = null, au = 0, t = yt;
      for (; t !== null; )
        Gd(t.alternate, t), t = t.return;
      yt = null;
    }
  }
  function Nn(t, e) {
    var l = t.timeoutHandle;
    return l !== -1 && (t.timeoutHandle = -1, vy(l)), l = t.cancelPendingCommit, l !== null && (t.cancelPendingCommit = null, l()), _l = 0, is(), Ht = t, yt = l = xl(t.current, null), St = e, Dt = 0, Ge = null, la = !1, bn = wn(t, e), ls = !1, pn = Xe = Gi = Ha = aa = Zt = 0, De = bu = null, as = !1, Yl = mo(t, e), ti(), l;
  }
  function pm(t, e) {
    ft = null, X.H = zi, e === sn || e === ri ? (e = Mr(), Dt = 3) : e === tf ? (e = Mr(), Dt = 4) : Dt = e === Cf ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, Ge = e, yt === null && (Zt = 1, Mi(
      t,
      Fe(e, t.current)
    ));
  }
  function Sm() {
    var t = fe.current;
    return t === null ? !0 : (St & 4194048) === St ? ye === null : (St & 62914560) === St || (St & 536870912) !== 0 ? t === ye : !1;
  }
  function _m() {
    var t = X.H;
    return X.H = zi, t === null ? zi : t;
  }
  function Tm() {
    var t = X.A;
    return X.A = Qv, t;
  }
  function Ji() {
    Zt = 4, la || (St & 4194048) !== St && fe.current !== null || (bn = !0), (aa & 134217727) === 0 && (Ha & 134217727) === 0 || Ht === null || ua(
      Ht,
      St,
      Xe,
      !1
    );
  }
  function cs(t, e, l) {
    var a = At;
    At |= 2;
    var n = _m(), u = Tm();
    (Ht !== t || St !== e) && (Vi = null, Nn(t, e)), e = !1;
    var i = Zt;
    t: do
      try {
        if (Dt !== 0 && yt !== null) {
          var s = yt, d = Ge;
          switch (Dt) {
            case 8:
              is(), i = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              fe.current === null && (e = !0);
              var S = Dt;
              if (Dt = 0, Ge = null, zn(t, s, d, S), l && bn) {
                i = 0;
                break t;
              }
              break;
            default:
              S = Dt, Dt = 0, Ge = null, zn(t, s, d, S);
          }
        }
        Kv(), i = Zt;
        break;
      } catch (N) {
        pm(t, N);
      }
    while (!0);
    return e && t.shellSuspendCounter++, jl = Ea = null, At = a, X.H = n, X.A = u, yt === null && (Ht = null, St = 0, ti()), i;
  }
  function Kv() {
    for (; yt !== null; ) Em(yt);
  }
  function Jv(t, e) {
    var l = At;
    At |= 2;
    var a = _m(), n = Tm();
    Ht !== t || St !== e ? (Vi = null, Qi = Ue() + 500, Nn(t, e)) : bn = wn(
      t,
      e
    );
    t: do
      try {
        if (Dt !== 0 && yt !== null) {
          e = yt;
          var u = Ge;
          e: switch (Dt) {
            case 1:
              Dt = 0, Ge = null, zn(t, e, u, 1);
              break;
            case 2:
            case 9:
              if (Nr(u)) {
                Dt = 0, Ge = null, Nm(e);
                break;
              }
              e = function() {
                Dt !== 2 && Dt !== 9 || Ht !== t || (Dt = 7), Tl(t);
              }, u.then(e, e);
              break t;
            case 3:
              Dt = 7;
              break t;
            case 4:
              Dt = 5;
              break t;
            case 7:
              Nr(u) ? (Dt = 0, Ge = null, Nm(e)) : (Dt = 0, Ge = null, zn(t, e, u, 7));
              break;
            case 5:
              var i = null;
              switch (yt.tag) {
                case 26:
                  i = yt.memoizedState;
                case 5:
                case 27:
                  var s = yt;
                  if (i ? v0(i) : s.stateNode.complete) {
                    Dt = 0, Ge = null;
                    var d = s.sibling;
                    if (d !== null) yt = d;
                    else {
                      var S = s.return;
                      S !== null ? (yt = S, $i(S)) : yt = null;
                    }
                    break e;
                  }
              }
              Dt = 0, Ge = null, zn(t, e, u, 5);
              break;
            case 6:
              Dt = 0, Ge = null, zn(t, e, u, 6);
              break;
            case 8:
              is(), Zt = 6;
              break t;
            default:
              throw Error(o(462));
          }
        }
        $v();
        break;
      } catch (N) {
        pm(t, N);
      }
    while (!0);
    return jl = Ea = null, X.H = a, X.A = n, At = l, yt !== null ? 0 : (Ht = null, St = 0, ti(), Zt);
  }
  function $v() {
    for (; yt !== null && !rh(); )
      Em(yt);
  }
  function Em(t) {
    var e = wd(t.alternate, t, Yl);
    t.memoizedProps = t.pendingProps, e === null ? $i(t) : yt = e;
  }
  function Nm(t) {
    var e = t, l = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = jd(
          l,
          e,
          e.pendingProps,
          e.type,
          void 0,
          St
        );
        break;
      case 11:
        e = jd(
          l,
          e,
          e.pendingProps,
          e.type.render,
          e.ref,
          St
        );
        break;
      case 5:
        hf(e);
        var a = e;
        a === le && (mt ? (ii(a), a.tag === 5 && a.stateNode != null && (Yt = a.stateNode)) : (ii(a), mt = !0));
      default:
        Gd(l, e), e = yt = mr(e, Yl), e = wd(l, e, Yl);
    }
    t.memoizedProps = t.pendingProps, e === null ? $i(t) : yt = e;
  }
  function zn(t, e, l, a) {
    jl = Ea = null, hf(e), on = null, au = 0;
    var n = e.return;
    try {
      if (Hv(
        t,
        n,
        e,
        l,
        St
      )) {
        Zt = 1, Mi(
          t,
          Fe(l, t.current)
        ), yt = null;
        return;
      }
    } catch (u) {
      if (n !== null) throw yt = n, u;
      Zt = 1, Mi(
        t,
        Fe(l, t.current)
      ), yt = null;
      return;
    }
    e.flags & 32768 ? (mt || a === 1 ? t = !0 : bn || (St & 536870912) !== 0 ? t = !1 : (la = t = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = fe.current, a !== null && a.tag === 13 && (a.flags |= 16384))), zm(e, t)) : $i(e);
  }
  function $i(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        zm(
          e,
          la
        );
        return;
      }
      t = e.return;
      var l = wv(
        e.alternate,
        e,
        Yl
      );
      if (l !== null) {
        yt = l;
        return;
      }
      if (e = e.sibling, e !== null) {
        yt = e;
        return;
      }
      yt = e = t;
    } while (e !== null);
    Zt === 0 && (Zt = 5);
  }
  function zm(t, e) {
    do {
      var l = Lv(t.alternate, t);
      if (l !== null) {
        l.flags &= 32767, yt = l;
        return;
      }
      if (l = t.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !e && (t = t.sibling, t !== null)) {
        yt = t;
        return;
      }
      yt = t = l;
    } while (t !== null);
    Zt = 6, yt = null;
  }
  function Mm(t, e, l, a, n, u, i, s, d, S, N, C) {
    t.cancelPendingCommit = null;
    do
      Fi();
    while (Xt !== 0);
    if ((At & 6) !== 0) throw Error(o(327));
    if (e !== null) {
      if (e === t.current) throw Error(o(177));
      t === Ht && (yt = Ht = null, St = 0), Ba = e, cl = t, _l = l, us = n, vm = a, Fv(
        t,
        e,
        l,
        i,
        s,
        d,
        C
      );
    }
  }
  function Fv(t, e, l, a, n, u, i) {
    var s = e.lanes | e.childLanes;
    if (ns = s, s |= Gc, _h(
      t,
      l,
      s,
      a,
      n,
      u
    ), _n = null, (l & 335544064) === l ? (Tn = Ev(t), a = 10262) : (Tn = null, a = 10256), (e.subtreeFlags & a) !== 0 || (e.flags & a) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, ey(qu, function() {
      return rs(), null;
    })) : (t.callbackNode = null, t.callbackPriority = 0), Ui = !1, a = (e.flags & 13878) !== 0, (e.subtreeFlags & 13878) !== 0 || a) {
      a = X.T, X.T = null, n = W.p, W.p = 2, u = At, At |= 4;
      try {
        Gv(t, e, l);
      } finally {
        At = u, W.p = n, X.T = a;
      }
    }
    Xt = 1, Ui ? Sn = _y(
      i,
      t.containerInfo,
      Tn,
      fs,
      ss,
      Wv,
      os,
      rs,
      kv
    ) : (fs(), ss(), os());
  }
  function kv(t) {
    if (Xt !== 0) {
      var e = cl.onRecoverableError;
      e(t, { componentStack: null });
    }
  }
  function Wv() {
    Xt === 3 && (Xt = 0, fm(Ba, cl), Xt = 4);
  }
  function fs() {
    if (Xt === 1) {
      Xt = 0;
      var t = cl, e = Ba, l = _l, a = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || a) {
        a = X.T, X.T = null;
        var n = W.p;
        W.p = 2;
        var u = At;
        At |= 4;
        try {
          vu = qi = !1, im(e, t, l), l = Es;
          var i = ar(t.containerInfo), s = l.focusedElem, d = l.selectionRange;
          if (i !== s && s && s.ownerDocument && lr(
            s.ownerDocument.documentElement,
            s
          )) {
            if (d !== null && Bc(s)) {
              var S = d.start, N = d.end;
              if (N === void 0 && (N = S), "selectionStart" in s)
                s.selectionStart = S, s.selectionEnd = Math.min(
                  N,
                  s.value.length
                );
              else {
                var C = s.ownerDocument || document, b = C && C.defaultView || window;
                if (b.getSelection) {
                  var T = b.getSelection(), L = s.textContent.length, K = Math.min(d.start, L), st = d.end === void 0 ? K : Math.min(d.end, L);
                  !T.extend && K > st && (i = st, st = K, K = i);
                  var p = er(
                    s,
                    K
                  ), v = er(
                    s,
                    st
                  );
                  if (p && v && (T.rangeCount !== 1 || T.anchorNode !== p.node || T.anchorOffset !== p.offset || T.focusNode !== v.node || T.focusOffset !== v.offset)) {
                    var _ = C.createRange();
                    _.setStart(p.node, p.offset), T.removeAllRanges(), K > st ? (T.addRange(_), T.extend(v.node, v.offset)) : (_.setEnd(v.node, v.offset), T.addRange(_));
                  }
                }
              }
            }
            for (C = [], T = s; T = T.parentNode; )
              T.nodeType === 1 && C.push({
                element: T,
                left: T.scrollLeft,
                top: T.scrollTop
              });
            for (typeof s.focus == "function" && s.focus(), s = 0; s < C.length; s++) {
              var A = C[s];
              A.element.scrollLeft = A.left, A.element.scrollTop = A.top;
            }
          }
          Rn = !!Ts, Es = Ts = null;
        } finally {
          At = u, W.p = n, X.T = a;
        }
      }
      t.current = e, Xt = 2;
    }
  }
  function ss() {
    if (Xt === 2) {
      Xt = 0;
      var t = cl, e = Ba, l = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || l) {
        l = X.T, X.T = null;
        var a = W.p;
        W.p = 2;
        var n = At;
        At |= 4;
        try {
          tm(t, e.alternate, e);
        } finally {
          At = n, W.p = a, X.T = l;
        }
      }
      Xt = 3;
    }
  }
  function os() {
    if (Xt === 4 || Xt === 3) {
      Xt = 0;
      var t = Sn;
      Sn = null, dh();
      var e = cl, l = Ba, a = _l, n = vm, u = (a & 335544064) === a ? 10262 : 10256;
      if ((l.subtreeFlags & u) !== 0 || (l.flags & u) !== 0 ? Xt = 5 : (Xt = 0, Ba = cl = null, Om(e, e.pendingLanes)), u = e.pendingLanes, u === 0 && (na = null), bc(a), l = l.stateNode, He && typeof He.onCommitFiberRoot == "function")
        try {
          He.onCommitFiberRoot(
            Yn,
            l,
            void 0,
            (l.current.flags & 128) === 128
          );
        } catch {
        }
      if (n !== null) {
        l = X.T, u = W.p, W.p = 2, X.T = null;
        try {
          for (var i = e.onRecoverableError, s = 0; s < n.length; s++) {
            var d = n[s];
            i(d.value, {
              componentStack: d.stack
            });
          }
        } finally {
          X.T = l, W.p = u;
        }
      }
      if (n = _n, i = Tn, Tn = null, n !== null && (_n = null, i === null && (i = []), t !== null))
        for (d = 0; d < n.length; d++)
          l = (0, n[d])(
            i
          ), l !== void 0 && t.finished.finally(l);
      (_l & 3) !== 0 && Fi(), Tl(e), u = e.pendingLanes, (a & 261930) !== 0 && (u & 42) !== 0 ? e === Zi ? pu++ : (pu = 0, Zi = e) : (pu = 0, Zi = null), Su(0);
    }
  }
  function Om(t, e) {
    (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, tu(e)));
  }
  function Fi() {
    return Sn !== null && (Sn.skipTransition(), Sn = null), fs(), ss(), os(), rs();
  }
  function rs() {
    if (Xt !== 5) return !1;
    var t = cl, e = ns;
    ns = 0;
    var l = bc(_l), a = X.T, n = W.p;
    try {
      W.p = 32 > l ? 32 : l, X.T = null, l = us, us = null;
      var u = cl, i = _l;
      if (Xt = 0, Ba = cl = null, _l = 0, (At & 6) !== 0) throw Error(o(331));
      var s = At;
      if (At |= 4, dm(u.current), sm(
        u,
        u.current,
        i,
        l
      ), At = s, Su(0, !1), He && typeof He.onPostCommitFiberRoot == "function")
        try {
          He.onPostCommitFiberRoot(Yn, u);
        } catch {
        }
      return !0;
    } finally {
      W.p = n, X.T = a, Om(t, e);
    }
  }
  function Am(t, e, l) {
    e = Fe(l, e), e = Af(t.stateNode, e, 2), t = kl(t, e, 2), t !== null && (Ln(t, 2), Tl(t));
  }
  function jt(t, e, l) {
    if (t.tag === 3)
      Am(t, t, l);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          Am(
            e,
            t,
            l
          );
          break;
        } else if (e.tag === 1) {
          var a = e.stateNode;
          if (typeof e.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (na === null || !na.has(a))) {
            t = Fe(l, t), l = Nd(2), a = kl(e, l, 2), a !== null && (zd(
              l,
              a,
              e,
              t
            ), Ln(a, 2), Tl(a));
            break;
          }
        }
        e = e.return;
      }
  }
  function ds(t, e, l) {
    var a = t.pingCache;
    if (a === null) {
      a = t.pingCache = new Vv();
      var n = /* @__PURE__ */ new Set();
      a.set(e, n);
    } else
      n = a.get(e), n === void 0 && (n = /* @__PURE__ */ new Set(), a.set(e, n));
    n.has(l) || (ls = !0, n.add(l), t = Iv.bind(null, t, e, l), e.then(t, t));
  }
  function Iv(t, e, l) {
    var a = t.pingCache;
    a !== null && a.delete(e), t.pingedLanes |= t.suspendedLanes & l, t.warmLanes &= ~l, Ht === t && (St & l) === l && ((Zt === 4 || Zt === 3 && (St & 62914560) === St && 300 > Ue() - Xi) && (At & 2) === 0 ? Nn(t, 0) : Gi |= l, pn === St && (pn = 0)), Tl(t);
  }
  function Cm(t, e) {
    e === 0 && (e = ho()), t = Sa(t, e), t !== null && (Ln(t, e), Tl(t));
  }
  function Pv(t) {
    var e = t.memoizedState, l = 0;
    e !== null && (l = e.retryLane), Cm(t, l);
  }
  function ty(t, e) {
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
        throw Error(o(314));
    }
    a !== null && a.delete(e), Cm(t, l);
  }
  function ey(t, e) {
    return ha(t, e);
  }
  var Mn = null, On = null, ms = !1, ki = !1, hs = !1, ia = 0;
  function Tl(t) {
    t !== On && t.next === null && (On === null ? Mn = On = t : On = On.next = t), ki = !0, ms || (ms = !0, ay());
  }
  function Su(t, e) {
    if (!hs && ki) {
      hs = !0;
      do
        for (var l = !1, a = Mn; a !== null; ) {
          if (t !== 0) {
            var n = a.pendingLanes;
            if (n === 0) var u = 0;
            else {
              var i = a.suspendedLanes, s = a.pingedLanes;
              u = (1 << 31 - Be(42 | t) + 1) - 1, u &= n & ~(i & ~s), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (l = !0, Rm(a, u));
          } else
            u = St, u = Gu(
              a,
              a === Ht ? u : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (u & 3) === 0 || wn(a, u) || (l = !0, Rm(a, u));
          a = a.next;
        }
      while (l);
      hs = !1;
    }
  }
  function ly() {
    xm();
  }
  function xm() {
    ki = ms = !1;
    var t = 0;
    ia !== 0 && hy() && (t = ia);
    for (var e = Ue(), l = null, a = Mn; a !== null; ) {
      var n = a.next, u = Dm(a, e);
      u === 0 ? (a.next = null, l === null ? Mn = n : l.next = n, n === null && (On = l)) : (l = a, (t !== 0 || (u & 3) !== 0) && (ki = !0)), a = n;
    }
    Xt !== 0 && Xt !== 5 || Su(t), ia !== 0 && (ia = 0);
  }
  function Dm(t, e) {
    for (var l = t.suspendedLanes, a = t.pingedLanes, n = t.expirationTimes, u = t.pendingLanes & -62914561; 0 < u; ) {
      var i = 31 - Be(u), s = 1 << i, d = n[i];
      d === -1 ? ((s & l) === 0 || (s & a) !== 0) && (n[i] = Sh(s, e)) : d <= e && (t.expiredLanes |= s), u &= ~s;
    }
    if (e = Ht, l = St, l = Gu(
      t,
      t === e ? l : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a = t.callbackNode, l === 0 || t === e && (Dt === 2 || Dt === 9) || t.cancelPendingCommit !== null)
      return a !== null && a !== null && vc(a), t.callbackNode = null, t.callbackPriority = 0;
    if ((l & 3) === 0 || wn(t, l)) {
      if (e = l & -l, e === t.callbackPriority) return e;
      switch (a !== null && vc(a), bc(l)) {
        case 2:
        case 8:
          l = oo;
          break;
        case 32:
          l = qu;
          break;
        case 268435456:
          l = ro;
          break;
        default:
          l = qu;
      }
      return a = jm.bind(null, t), l = ha(l, a), t.callbackPriority = e, t.callbackNode = l, e;
    }
    return a !== null && a !== null && vc(a), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function jm(t, e) {
    if (Xt !== 0 && Xt !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var l = t.callbackNode;
    if (Fi() && t.callbackNode !== l)
      return null;
    var a = St;
    return a = Gu(
      t,
      t === Ht ? a : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a === 0 ? null : (gm(t, a, e), Dm(t, Ue()), t.callbackNode != null && t.callbackNode === l ? jm.bind(null, t) : null);
  }
  function Rm(t, e) {
    if (Fi()) return null;
    gm(t, e, !0);
  }
  function ay() {
    yy(function() {
      (At & 6) !== 0 ? ha(
        so,
        ly
      ) : xm();
    });
  }
  function vs() {
    if (ia === 0) {
      var t = Ma;
      t === 0 && (t = Yu, Yu <<= 1, (Yu & 261888) === 0 && (Yu = 256)), ia = t;
    }
    return ia;
  }
  function Um(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : Ku(t);
  }
  function ny(t, e, l, a, n) {
    if (e === "submit" && l && l.stateNode === n) {
      var u = Um(
        (n[Oe] || null).action
      ), i = a.submitter;
      i && (e = (e = i[Oe] || null) ? Um(e.formAction) : i.getAttribute("formAction"), e !== null && (u = e, i = null));
      var s = new ku(
        "action",
        "action",
        null,
        a,
        n
      );
      t.push({
        event: s,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (a.defaultPrevented) {
                if (ia !== 0) {
                  var d = new FormData(n, i);
                  Ef(
                    l,
                    {
                      pending: !0,
                      data: d,
                      method: n.method,
                      action: u
                    },
                    null,
                    d
                  );
                }
              } else
                typeof u == "function" && (s.preventDefault(), d = new FormData(n, i), Ef(
                  l,
                  {
                    pending: !0,
                    data: d,
                    method: n.method,
                    action: u
                  },
                  u,
                  d
                ));
            },
            currentTarget: n
          }
        ]
      });
    }
  }
  for (var ys = 0; ys < Lc.length; ys++) {
    var gs = Lc[ys], uy = gs.toLowerCase(), iy = gs[0].toUpperCase() + gs.slice(1);
    al(
      uy,
      "on" + iy
    );
  }
  al(ir, "onAnimationEnd"), al(cr, "onAnimationIteration"), al(fr, "onAnimationStart"), al("dblclick", "onDoubleClick"), al("focusin", "onFocus"), al("focusout", "onBlur"), al(vv, "onTransitionRun"), al(yv, "onTransitionStart"), al(gv, "onTransitionCancel"), al(sr, "onTransitionEnd"), $a("onMouseEnter", ["mouseout", "mouseover"]), $a("onMouseLeave", ["mouseout", "mouseover"]), $a("onPointerEnter", ["pointerout", "pointerover"]), $a("onPointerLeave", ["pointerout", "pointerover"]), ga(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), ga(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), ga("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), ga(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), ga(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), ga(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var _u = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), cy = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(_u)
  );
  function Hm(t, e) {
    e = (e & 4) !== 0;
    for (var l = 0; l < t.length; l++) {
      var a = t[l], n = a.event;
      a = a.listeners;
      t: {
        var u = void 0;
        if (e)
          for (var i = a.length - 1; 0 <= i; i--) {
            var s = a[i], d = s.instance, S = s.currentTarget;
            if (s = s.listener, d !== u && n.isPropagationStopped())
              break t;
            u = s, n.currentTarget = S;
            try {
              u(n);
            } catch (N) {
              Pu(N);
            }
            n.currentTarget = null, u = d;
          }
        else
          for (i = 0; i < a.length; i++) {
            if (s = a[i], d = s.instance, S = s.currentTarget, s = s.listener, d !== u && n.isPropagationStopped())
              break t;
            u = s, n.currentTarget = S;
            try {
              u(n);
            } catch (N) {
              Pu(N);
            }
            n.currentTarget = null, u = d;
          }
      }
    }
  }
  function gt(t, e) {
    var l = e[So];
    l === void 0 && (l = e[So] = /* @__PURE__ */ new Set());
    var a = t + "__bubble";
    l.has(a) || (Bm(e, t, 2, !1), l.add(a));
  }
  function bs(t, e, l) {
    var a = 0;
    e && (a |= 4), Bm(
      l,
      t,
      a,
      e
    );
  }
  var Wi = "_reactListening" + Math.random().toString(36).slice(2);
  function ps(t) {
    if (!t[Wi]) {
      t[Wi] = !0, Eo.forEach(function(l) {
        l !== "selectionchange" && (cy.has(l) || bs(l, !1, t), bs(l, !0, t));
      });
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[Wi] || (e[Wi] = !0, bs("selectionchange", !1, e));
    }
  }
  function Bm(t, e, l, a) {
    switch (z0(e)) {
      case 2:
        var n = Py;
        break;
      case 8:
        n = tg;
        break;
      default:
        n = ws;
    }
    l = n.bind(
      null,
      e,
      l,
      t
    ), n = void 0, !Mc || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (n = !0), a ? n !== void 0 ? t.addEventListener(e, l, {
      capture: !0,
      passive: n
    }) : t.addEventListener(e, l, !0) : n !== void 0 ? t.addEventListener(e, l, {
      passive: n
    }) : t.addEventListener(e, l, !1);
  }
  function Ss(t, e, l, a, n) {
    var u = a;
    if ((e & 1) === 0 && (e & 2) === 0 && a !== null)
      t: for (; ; ) {
        if (a === null) return;
        var i = a.tag;
        if (i === 3 || i === 4) {
          var s = a.stateNode.containerInfo;
          if (s === n) break;
          if (i === 4)
            for (i = a.return; i !== null; ) {
              var d = i.tag;
              if ((d === 3 || d === 4) && i.stateNode.containerInfo === n)
                return;
              i = i.return;
            }
          for (; s !== null; ) {
            if (i = ya(s), i === null) return;
            if (d = i.tag, d === 5 || d === 6 || d === 26 || d === 27) {
              a = u = i;
              continue t;
            }
            s = s.parentNode;
          }
        }
        a = a.return;
      }
    Bo(function() {
      var S = u, N = Nc(l), C = [];
      t: {
        var b = or.get(t);
        if (b !== void 0) {
          var T = ku, L = t;
          switch (t) {
            case "keypress":
              if ($u(l) === 0) break t;
            case "keydown":
            case "keyup":
              T = Zh;
              break;
            case "focusin":
              L = "focus", T = xc;
              break;
            case "focusout":
              L = "blur", T = xc;
              break;
            case "beforeblur":
            case "afterblur":
              T = xc;
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
              T = wo;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              T = Rh;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              T = kh;
              break;
            case ir:
            case cr:
            case fr:
              T = Bh;
              break;
            case sr:
              T = Ih;
              break;
            case "scroll":
            case "scrollend":
              T = Dh;
              break;
            case "wheel":
              T = tv;
              break;
            case "copy":
            case "cut":
            case "paste":
              T = Yh;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              T = Go;
              break;
            case "submit":
              T = $h;
              break;
            case "toggle":
            case "beforetoggle":
              T = lv;
          }
          var K = (e & 4) !== 0, st = !K && (t === "scroll" || t === "scrollend"), p = K ? b !== null ? b + "Capture" : null : b;
          K = [];
          for (var v = S, _; v !== null; ) {
            var A = v;
            if (_ = A.stateNode, A = A.tag, A !== 5 && A !== 26 && A !== 27 || _ === null || p === null || (A = Qn(v, p), A != null && K.push(
              Tu(v, A, _)
            )), st) break;
            v = v.return;
          }
          0 < K.length && (b = new T(
            b,
            L,
            null,
            l,
            N
          ), C.push({ event: b, listeners: K }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (T = t === "mouseover" || t === "pointerover", b = t === "mouseout" || t === "pointerout", T && l !== Ec && (L = l.relatedTarget || l.fromElement) && (ya(L) || L[Za]))
            break t;
          (b || T) && (L = N.window === N ? N : (T = N.ownerDocument) ? T.defaultView || T.parentWindow : window, b ? (T = l.relatedTarget || l.toElement, b = S, T = T ? ya(T) : null, T !== null && (st = h(T), K = T.tag, T !== st || K !== 5 && K !== 27 && K !== 6) && (T = null)) : (b = null, T = S), b !== T && (K = wo, A = "onMouseLeave", p = "onMouseEnter", v = "mouse", (t === "pointerout" || t === "pointerover") && (K = Go, A = "onPointerLeave", p = "onPointerEnter", v = "pointer"), st = b == null ? L : Xn(b), _ = T == null ? L : Xn(T), L = new K(
            A,
            v + "leave",
            b,
            l,
            N
          ), L.target = st, L.relatedTarget = _, A = null, ya(N) === S && (K = new K(
            p,
            v + "enter",
            T,
            l,
            N
          ), K.target = _, K.relatedTarget = st, A = K), st = A, K = b && T ? Bt(
            b,
            T,
            fy
          ) : null, b !== null && qm(
            C,
            L,
            b,
            K,
            !1
          ), T !== null && st !== null && qm(
            C,
            st,
            T,
            K,
            !0
          )));
        }
        t: {
          if (b = S ? Xn(S) : window, T = b.nodeName && b.nodeName.toLowerCase(), T === "select" || T === "input" && b.type === "file")
            var Q = Fo;
          else if (Jo(b))
            if (ko)
              Q = dv;
            else {
              Q = ov;
              var _t = sv;
            }
          else
            T = b.nodeName, !T || T.toLowerCase() !== "input" || b.type !== "checkbox" && b.type !== "radio" ? S && Tc(S.elementType) && (Q = Fo) : Q = rv;
          if (Q && (Q = Q(t, S))) {
            $o(
              C,
              Q,
              l,
              N
            );
            break t;
          }
          _t && _t(t, b, S);
        }
        switch (_t = S ? Xn(S) : window, t) {
          case "focusin":
            (Jo(_t) || _t.contentEditable === "true") && (tn = _t, qc = S, Wn = null);
            break;
          case "focusout":
            Wn = qc = tn = null;
            break;
          case "mousedown":
            Yc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Yc = !1, nr(C, l, N);
            break;
          case "selectionchange":
            if (hv) break;
          case "keydown":
          case "keyup":
            nr(C, l, N);
        }
        var k;
        if (jc)
          t: {
            switch (t) {
              case "compositionstart":
                var lt = "onCompositionStart";
                break t;
              case "compositionend":
                lt = "onCompositionEnd";
                break t;
              case "compositionupdate":
                lt = "onCompositionUpdate";
                break t;
            }
            lt = void 0;
          }
        else
          Pa ? Zo(t, l) && (lt = "onCompositionEnd") : t === "keydown" && l.keyCode === 229 && (lt = "onCompositionStart");
        lt && (Xo && l.locale !== "ko" && (Pa || lt !== "onCompositionStart" ? lt === "onCompositionEnd" && Pa && (k = qo()) : (Gl = N, Oc = "value" in Gl ? Gl.value : Gl.textContent, Pa = !0)), _t = Ii(S, lt), 0 < _t.length && (lt = new Lo(
          lt,
          t,
          null,
          l,
          N
        ), C.push({ event: lt, listeners: _t }), k ? lt.data = k : (k = Ko(l), k !== null && (lt.data = k)))), (k = nv ? uv(t, l) : iv(t, l)) && (lt = Ii(S, "onBeforeInput"), 0 < lt.length && (_t = new Lo(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          N
        ), C.push({
          event: _t,
          listeners: lt
        }), _t.data = k)), ny(
          C,
          t,
          S,
          l,
          N
        );
      }
      Hm(C, e);
    });
  }
  function Tu(t, e, l) {
    return {
      instance: t,
      listener: e,
      currentTarget: l
    };
  }
  function Ii(t, e) {
    for (var l = e + "Capture", a = []; t !== null; ) {
      var n = t, u = n.stateNode;
      if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || u === null || (n = Qn(t, l), n != null && a.unshift(
        Tu(t, n, u)
      ), n = Qn(t, e), n != null && a.push(
        Tu(t, n, u)
      )), t.tag === 3) return a;
      t = t.return;
    }
    return [];
  }
  function fy(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function qm(t, e, l, a, n) {
    for (var u = e._reactName, i = []; l !== null && l !== a; ) {
      var s = l, d = s.alternate, S = s.stateNode;
      if (s = s.tag, d !== null && d === a) break;
      s !== 5 && s !== 26 && s !== 27 || S === null || (d = S, n ? (S = Qn(l, u), S != null && i.unshift(
        Tu(l, S, d)
      )) : n || (S = Qn(l, u), S != null && i.push(
        Tu(l, S, d)
      ))), l = l.return;
    }
    i.length !== 0 && t.push({ event: e, listeners: i });
  }
  var sy = /\r\n?/g, oy = /\u0000|\uFFFD/g;
  function Ym(t) {
    return (typeof t == "string" ? t : "" + t).replace(sy, `
`).replace(oy, "");
  }
  function wm(t, e) {
    return e = Ym(e), Ym(t) === e;
  }
  function Rt(t, e, l, a, n, u) {
    switch (l) {
      case "children":
        if (typeof a == "string")
          e === "body" || e === "textarea" && a === "" || ka(t, a);
        else if (typeof a == "number" || typeof a == "bigint")
          e !== "body" && ka(t, "" + a);
        else return;
        break;
      case "className":
        Zu(t, "class", a);
        break;
      case "tabIndex":
        Zu(t, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Zu(t, l, a);
        break;
      case "style":
        Uo(t, a, u);
        return;
      case "data":
        if (e !== "object") {
          Zu(t, "data", a);
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
        a = Ku(a), t.setAttribute(l, a);
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
          typeof u == "function" && (l === "formAction" ? (e !== "input" && Rt(t, e, "name", n.name, n, null), Rt(
            t,
            e,
            "formEncType",
            n.formEncType,
            n,
            null
          ), Rt(
            t,
            e,
            "formMethod",
            n.formMethod,
            n,
            null
          ), Rt(
            t,
            e,
            "formTarget",
            n.formTarget,
            n,
            null
          )) : (Rt(t, e, "encType", n.encType, n, null), Rt(t, e, "method", n.method, n, null), Rt(t, e, "target", n.target, n, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          t.removeAttribute(l);
          break;
        }
        a = Ku(a), t.setAttribute(l, a);
        break;
      case "onClick":
        a != null && (t.onclick = dl);
        return;
      case "onScroll":
        a != null && gt("scroll", t);
        return;
      case "onScrollEnd":
        a != null && gt("scrollend", t);
        return;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(o(61));
          if (l = a.__html, l != null) {
            if (n.children != null) throw Error(o(60));
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
        l = Ku(a), t.setAttributeNS(
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
        gt("beforetoggle", t), gt("toggle", t), Vu(t, "popover", a);
        break;
      case "xlinkActuate":
        Ml(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        Ml(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        Ml(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        Ml(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        Ml(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        Ml(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        Ml(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        Ml(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        Ml(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        Vu(t, "is", a);
        break;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N")
          l = Ch.get(l) || l, Vu(t, l, a);
        else return;
    }
    Nt = !0;
  }
  function _s(t, e, l, a, n, u) {
    switch (l) {
      case "style":
        Uo(t, a, u);
        return;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(o(61));
          if (l = a.__html, l != null) {
            if (n.children != null) throw Error(o(60));
            u?.__html !== l && (t.innerHTML = l);
          }
        }
        break;
      case "children":
        if (typeof a == "string") ka(t, a);
        else if (typeof a == "number" || typeof a == "bigint")
          ka(t, "" + a);
        else return;
        break;
      case "onScroll":
        a != null && gt("scroll", t);
        return;
      case "onScrollEnd":
        a != null && gt("scrollend", t);
        return;
      case "onClick":
        a != null && (t.onclick = dl);
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
        if (!No.hasOwnProperty(l))
          t: {
            if (l[0] === "o" && l[1] === "n" && (n = l.endsWith("Capture"), u = l.slice(2, n ? l.length - 7 : void 0), e = t[Oe] || null, e = e != null ? e[l] : null, typeof e == "function" && t.removeEventListener(u, e, n), typeof a == "function")) {
              typeof e != "function" && e !== null && (l in t ? t[l] = null : t.hasAttribute(l) && t.removeAttribute(l)), t.addEventListener(u, a, n);
              break t;
            }
            Nt = !0, l in t ? t[l] = a : a === !0 ? t.setAttribute(l, "") : Vu(t, l, a);
          }
        return;
    }
    Nt = !0;
  }
  function re(t, e, l) {
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
        gt("error", t), gt("load", t);
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
                  throw Error(o(137, e));
                default:
                  Rt(t, e, u, i, l, null);
              }
          }
        n && Rt(t, e, "srcSet", l.srcSet, l, null), a && Rt(t, e, "src", l.src, l, null);
        return;
      case "input":
        gt("invalid", t);
        var s = u = i = n = null, d = null, S = null;
        for (a in l)
          if (l.hasOwnProperty(a)) {
            var N = l[a];
            if (N != null)
              switch (a) {
                case "name":
                  n = N;
                  break;
                case "type":
                  i = N;
                  break;
                case "checked":
                  d = N;
                  break;
                case "defaultChecked":
                  S = N;
                  break;
                case "value":
                  u = N;
                  break;
                case "defaultValue":
                  s = N;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (N != null)
                    throw Error(o(137, e));
                  break;
                default:
                  Rt(t, e, a, N, l, null);
              }
          }
        xo(
          t,
          u,
          s,
          d,
          S,
          i,
          n,
          !1
        );
        return;
      case "select":
        gt("invalid", t), a = i = u = null;
        for (n in l)
          if (l.hasOwnProperty(n) && (s = l[n], s != null))
            switch (n) {
              case "value":
                u = s;
                break;
              case "defaultValue":
                i = s;
                break;
              case "multiple":
                a = s;
              default:
                Rt(t, e, n, s, l, null);
            }
        e = u, l = i, t.multiple = !!a, e != null ? Fa(t, !!a, e, !1) : l != null && Fa(t, !!a, l, !0);
        return;
      case "textarea":
        gt("invalid", t), u = n = a = null;
        for (i in l)
          if (l.hasOwnProperty(i) && (s = l[i], s != null))
            switch (i) {
              case "value":
                a = s;
                break;
              case "defaultValue":
                n = s;
                break;
              case "children":
                u = s;
                break;
              case "dangerouslySetInnerHTML":
                if (s != null) throw Error(o(91));
                break;
              default:
                Rt(t, e, i, s, l, null);
            }
        jo(t, a, n, u);
        return;
      case "option":
        for (d in l)
          l.hasOwnProperty(d) && (a = l[d], a != null) && (d === "selected" ? t.selected = a && typeof a != "function" && typeof a != "symbol" : Rt(t, e, d, a, l, null));
        return;
      case "dialog":
        gt("beforetoggle", t), gt("toggle", t), gt("cancel", t), gt("close", t);
        break;
      case "iframe":
      case "object":
        gt("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < _u.length; a++)
          gt(_u[a], t);
        break;
      case "image":
        gt("error", t), gt("load", t);
        break;
      case "details":
        gt("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        gt("error", t), gt("load", t);
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
        for (S in l)
          if (l.hasOwnProperty(S) && (a = l[S], a != null))
            switch (S) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(o(137, e));
              default:
                Rt(t, e, S, a, l, null);
            }
        return;
      default:
        if (Tc(e)) {
          for (N in l)
            l.hasOwnProperty(N) && (a = l[N], a !== void 0 && _s(
              t,
              e,
              N,
              a,
              l,
              void 0
            ));
          return;
        }
    }
    for (s in l)
      l.hasOwnProperty(s) && (a = l[s], a != null && Rt(t, e, s, a, l, null));
  }
  var ry = {};
  function dy(t, e, l, a) {
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
        var n = null, u = null, i = null, s = null, d = null, S = null, N = null;
        for (T in l) {
          var C = l[T];
          if (l.hasOwnProperty(T) && C != null)
            switch (T) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                d = C;
              default:
                a.hasOwnProperty(T) || Rt(t, e, T, null, a, C);
            }
        }
        for (var b in a) {
          var T = a[b];
          if (C = l[b], a.hasOwnProperty(b) && (T != null || C != null))
            switch (b) {
              case "type":
                T !== C && (Nt = !0), u = T;
                break;
              case "name":
                T !== C && (Nt = !0), n = T;
                break;
              case "checked":
                T !== C && (Nt = !0), S = T;
                break;
              case "defaultChecked":
                T !== C && (Nt = !0), N = T;
                break;
              case "value":
                T !== C && (Nt = !0), i = T;
                break;
              case "defaultValue":
                T !== C && (Nt = !0), s = T;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (T != null)
                  throw Error(o(137, e));
                break;
              default:
                T !== C && Rt(
                  t,
                  e,
                  b,
                  T,
                  a,
                  C
                );
            }
        }
        Sc(
          t,
          i,
          s,
          d,
          S,
          N,
          u,
          n
        );
        return;
      case "select":
        T = i = s = b = null;
        for (u in l)
          if (d = l[u], l.hasOwnProperty(u) && d != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                T = d;
              default:
                a.hasOwnProperty(u) || Rt(
                  t,
                  e,
                  u,
                  null,
                  a,
                  d
                );
            }
        for (n in a)
          if (u = a[n], d = l[n], a.hasOwnProperty(n) && (u != null || d != null))
            switch (n) {
              case "value":
                u !== d && (Nt = !0), b = u;
                break;
              case "defaultValue":
                u !== d && (Nt = !0), s = u;
                break;
              case "multiple":
                u !== d && (Nt = !0), i = u;
              default:
                u !== d && Rt(
                  t,
                  e,
                  n,
                  u,
                  a,
                  d
                );
            }
        e = s, l = i, a = T, b != null ? Fa(t, !!l, b, !1) : !!a != !!l && (e != null ? Fa(t, !!l, e, !0) : Fa(t, !!l, l ? [] : "", !1));
        return;
      case "textarea":
        T = b = null;
        for (s in l)
          if (n = l[s], l.hasOwnProperty(s) && n != null && !a.hasOwnProperty(s))
            switch (s) {
              case "value":
                break;
              case "children":
                break;
              default:
                Rt(t, e, s, null, a, n);
            }
        for (i in a)
          if (n = a[i], u = l[i], a.hasOwnProperty(i) && (n != null || u != null))
            switch (i) {
              case "value":
                n !== u && (Nt = !0), b = n;
                break;
              case "defaultValue":
                n !== u && (Nt = !0), T = n;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (n != null) throw Error(o(91));
                break;
              default:
                n !== u && Rt(t, e, i, n, a, u);
            }
        Do(t, b, T);
        return;
      case "option":
        for (var L in l)
          b = l[L], l.hasOwnProperty(L) && b != null && !a.hasOwnProperty(L) && (L === "selected" ? t.selected = !1 : Rt(
            t,
            e,
            L,
            null,
            a,
            b
          ));
        for (d in a)
          b = a[d], T = l[d], a.hasOwnProperty(d) && b !== T && (b != null || T != null) && (d === "selected" ? (b !== T && (Nt = !0), t.selected = b && typeof b != "function" && typeof b != "symbol") : Rt(
            t,
            e,
            d,
            b,
            a,
            T
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
        for (var K in l)
          b = l[K], l.hasOwnProperty(K) && b != null && !a.hasOwnProperty(K) && Rt(t, e, K, null, a, b);
        for (S in a)
          if (b = a[S], T = l[S], a.hasOwnProperty(S) && b !== T && (b != null || T != null))
            switch (S) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (b != null)
                  throw Error(o(137, e));
                break;
              default:
                Rt(
                  t,
                  e,
                  S,
                  b,
                  a,
                  T
                );
            }
        return;
      default:
        if (Tc(e)) {
          for (var st in l)
            b = l[st], l.hasOwnProperty(st) && b !== void 0 && !a.hasOwnProperty(st) && _s(
              t,
              e,
              st,
              void 0,
              a,
              b
            );
          for (N in a)
            b = a[N], T = l[N], !a.hasOwnProperty(N) || b === T || b === void 0 && T === void 0 || _s(
              t,
              e,
              N,
              b,
              a,
              T
            );
          return;
        }
    }
    for (var p in l)
      b = l[p], l.hasOwnProperty(p) && b != null && !a.hasOwnProperty(p) && Rt(t, e, p, null, a, b);
    for (C in a)
      b = a[C], T = l[C], !a.hasOwnProperty(C) || b === T || b == null && T == null || Rt(t, e, C, b, a, T);
  }
  function Lm(t) {
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
  function my() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, e = 0, l = performance.getEntriesByType("resource"), a = 0; a < l.length; a++) {
        var n = l[a], u = n.transferSize, i = n.initiatorType, s = n.duration;
        if (u && s && Lm(i)) {
          for (i = 0, s = n.responseEnd, a += 1; a < l.length; a++) {
            var d = l[a], S = d.startTime;
            if (S > s) break;
            var N = d.transferSize, C = d.initiatorType;
            N && Lm(C) && (d = d.responseEnd, i += N * (d < s ? 1 : (s - S) / (d - S)));
          }
          if (--a, e += 8 * (u + i) / (n.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var Ts = null, Es = null;
  function Eu(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function Gm(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Xm(t, e) {
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
  function Qm(t, e, l, a) {
    return l = Eu(
      l
    ).createElement(t), l[ie] = a, l[Oe] = e, re(l, t, e), ee(l), l;
  }
  function Ns(t, e) {
    return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.children == "bigint" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
  }
  var zs = null;
  function hy() {
    var t = window.event;
    return t && t.type === "popstate" ? t === zs ? !1 : (zs = t, !0) : (zs = null, !1);
  }
  var Ms = typeof setTimeout == "function" ? setTimeout : void 0, vy = typeof clearTimeout == "function" ? clearTimeout : void 0, Vm = typeof Promise == "function" ? Promise : void 0, Zm = typeof requestAnimationFrame == "function" ? requestAnimationFrame : Ms, yy = typeof queueMicrotask == "function" ? queueMicrotask : typeof Vm < "u" ? function(t) {
    return Vm.resolve(null).then(t).catch(gy);
  } : Ms;
  function gy(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function ca(t) {
    return t === "head";
  }
  function Km(t, e) {
    var l = e, a = 0;
    do {
      var n = l.nextSibling;
      if (t.removeChild(l), n && n.nodeType === 8)
        if (l = n.data, l === "/$" || l === "/&") {
          if (a === 0) {
            t.removeChild(n), Un(e);
            return;
          }
          a--;
        } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&")
          a++;
        else if (l === "html")
          Us(
            t.ownerDocument.documentElement
          );
        else if (l === "head") {
          l = t.ownerDocument.head, Us(l);
          for (var u = l.firstChild; u; ) {
            var i = u.nextSibling, s = u.nodeName;
            u[Gn] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && u.rel.toLowerCase() === "stylesheet" || l.removeChild(u), u = i;
          }
        } else
          l === "body" && Us(t.ownerDocument.body);
      l = n;
    } while (l);
    Un(e);
  }
  function Jm(t, e) {
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
  function $m(t, e, l) {
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
  function Fm(t, e) {
    t = t.style, e = e.style;
    var l = e != null ? e.hasOwnProperty("viewTransitionName") ? e.viewTransitionName : e.hasOwnProperty("view-transition-name") ? e["view-transition-name"] : null : null;
    t.viewTransitionName = l == null || typeof l == "boolean" ? "" : ("" + l).trim(), l = e != null ? e.hasOwnProperty("viewTransitionClass") ? e.viewTransitionClass : e.hasOwnProperty("view-transition-class") ? e["view-transition-class"] : null : null, t.viewTransitionClass = l == null || typeof l == "boolean" ? "" : ("" + l).trim(), t.display === "inline-block" && (e == null ? t.display = t.margin = "" : (l = e.display, t.display = l == null || typeof l == "boolean" ? "" : l, l = e.margin, l != null ? t.margin = l : (l = e.hasOwnProperty("marginTop") ? e.marginTop : e["margin-top"], t.marginTop = l == null || typeof l == "boolean" ? "" : l, e = e.hasOwnProperty("marginBottom") ? e.marginBottom : e["margin-bottom"], t.marginBottom = e == null || typeof e == "boolean" ? "" : e)));
  }
  function by(t, e, l) {
    return l = l.ownerDocument.defaultView, {
      rect: t,
      abs: e.position === "absolute" || e.position === "fixed",
      clip: e.clipPath !== "none" || e.overflow !== "visible" || e.filter !== "none" || e.mask !== "none" || e.mask !== "none" || e.borderRadius !== "0px",
      view: 0 <= t.bottom && 0 <= t.right && t.top <= l.innerHeight && t.left <= l.innerWidth
    };
  }
  function Os(t) {
    var e = t.getBoundingClientRect(), l = getComputedStyle(t);
    return by(e, l, t);
  }
  function py(t) {
    return t.documentElement.clientHeight;
  }
  function Sy(t) {
    this.addEventListener("load", t), this.addEventListener("error", t);
  }
  function _y(t, e, l, a, n, u, i, s, d) {
    var S = e.nodeType === 9 ? e : e.ownerDocument;
    try {
      var N = S.startViewTransition({
        update: function() {
          var b = S.defaultView, T = b.navigation && b.navigation.transition, L = S.fonts.status;
          a();
          var K = [];
          if (L === "loaded" && (py(S), S.fonts.status === "loading" && K.push(S.fonts.ready)), L = K.length, t !== null)
            for (var st = t.suspenseyImages, p = 0, v = 0; v < st.length; v++) {
              var _ = st[v];
              if (!_.complete) {
                var A = _.getBoundingClientRect();
                if (0 < A.bottom && 0 < A.right && A.top < b.innerHeight && A.left < b.innerWidth) {
                  if (p += y0(_), p > ec) {
                    K.length = L;
                    break;
                  }
                  _ = new Promise(
                    Sy.bind(_)
                  ), K.push(_);
                }
              }
            }
          if (0 < K.length)
            return b = Promise.race([
              Promise.all(K),
              new Promise(function(Q) {
                return setTimeout(Q, 500);
              })
            ]).then(n, n), (T ? Promise.allSettled([T.finished, b]) : b).then(u, u);
          if (n(), T)
            return T.finished.then(
              u,
              u
            );
          u();
        },
        types: l
      });
      S.__reactViewTransition = N;
      var C = [];
      return N.ready.then(
        function() {
          for (var b = S.documentElement.getAnimations({
            subtree: !0
          }), T = 0; T < b.length; T++) {
            var L = b[T], K = L.effect, st = K.pseudoElement;
            if (st != null && st.startsWith("::view-transition")) {
              C.push(L), L = K.getKeyframes();
              for (var p = st = void 0, v = !0, _ = 0; _ < L.length; _++) {
                var A = L[_], Q = A.width;
                if (st === void 0) st = Q;
                else if (st !== Q) {
                  v = !1;
                  break;
                }
                if (Q = A.height, p === void 0) p = Q;
                else if (p !== Q) {
                  v = !1;
                  break;
                }
                delete A.width, delete A.height, A.transform === "none" && delete A.transform;
              }
              v && st !== void 0 && p !== void 0 && (K.setKeyframes(L), v = getComputedStyle(
                K.target,
                K.pseudoElement
              ), v.width !== st || v.height !== p) && (v = L[0], v.width = st, v.height = p, v = L[L.length - 1], v.width = st, v.height = p, K.setKeyframes(L));
            }
          }
          i();
        },
        function(b) {
          S.__reactViewTransition === N && (S.__reactViewTransition = null);
          try {
            typeof b == "object" && b !== null && b.name === "InvalidStateError" && (b.message === "View transition was skipped because document visibility state is hidden." || b.message === "Skipping view transition because document visibility state has become hidden." || b.message === "Skipping view transition because viewport size changed." || b.message === "Transition was aborted because of invalid state") && (b = null), b !== null && d(b);
          } finally {
            a(), n(), i();
          }
        }
      ), N.finished.finally(function() {
        for (var b = 0; b < C.length; b++)
          C[b].cancel();
        S.__reactViewTransition === N && (S.__reactViewTransition = null), s();
      }), N;
    } catch {
      return a(), n(), i(), null;
    }
  }
  function qa(t, e) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + t + "(" + e + ")";
  }
  qa.prototype.animate = function(t, e) {
    return e = typeof e == "number" ? { duration: e } : I({}, e), e.pseudoElement = this._selector, this._scope.animate(t, e);
  }, qa.prototype.getAnimations = function() {
    for (var t = this._scope, e = this._selector, l = t.getAnimations({ subtree: !0 }), a = [], n = 0; n < l.length; n++) {
      var u = l[n].effect;
      u !== null && u.target === t && u.pseudoElement === e && a.push(l[n]);
    }
    return a;
  }, qa.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function km(t) {
    return {
      name: t,
      group: new qa("group", t),
      imagePair: new qa("image-pair", t),
      old: new qa("old", t),
      new: new qa("new", t)
    };
  }
  function Ve(t) {
    this._fragmentFiber = t, this._observers = this._eventListeners = null;
  }
  Ve.prototype.addEventListener = function(t, e, l) {
    var a = null, n = null;
    if (!(l != null && typeof l != "boolean" && (a = l.signal || null, a !== null && a.aborted))) {
      this._eventListeners === null && (this._eventListeners = []);
      var u = this._eventListeners;
      if (Im(u, t, e, l) === -1) {
        var i = this, s = e;
        l != null && typeof l != "boolean" && l.once === !0 && (s = function(d) {
          i.removeEventListener(
            t,
            e,
            l
          ), typeof e == "function" ? e.call(this, d) : e.handleEvent(d);
        }), a !== null && (n = i.removeEventListener.bind(
          i,
          t,
          e,
          l
        ), a.addEventListener("abort", n, { once: !0 }), n = a.removeEventListener.bind(a, "abort", n)), a = An(l), u.push({
          type: t,
          listener: e,
          optionsOrUseCapture: l,
          attachedListener: s,
          cleanup: n
        }), m(
          this._fragmentFiber.child,
          !1,
          Ty,
          t,
          s,
          a
        );
      }
      this._eventListeners = u;
    }
  };
  function Ty(t, e, l, a) {
    return ut(t).addEventListener(
      e,
      l,
      a
    ), !1;
  }
  Ve.prototype.removeEventListener = function(t, e, l) {
    var a = this._eventListeners;
    if (a !== null && (e = Im(
      a,
      t,
      e,
      l
    ), e !== -1)) {
      var n = a[e];
      l = n.attachedListener;
      var u = n.cleanup;
      n = An(n.optionsOrUseCapture), m(
        this._fragmentFiber.child,
        !1,
        Ey,
        t,
        l,
        n
      ), a.splice(e, 1), u !== null && u();
    }
  };
  function Ey(t, e, l, a) {
    return ut(t).removeEventListener(
      e,
      l,
      a
    ), !1;
  }
  function An(t) {
    return t != null && typeof t != "boolean" && (t.once === !0 || t.signal instanceof AbortSignal) ? { capture: t.capture, passive: t.passive } : t;
  }
  function Wm(t) {
    return t == null ? "c=0" : typeof t == "boolean" ? "c=" + (t ? "1" : "0") : "c=" + (t.capture ? "1" : "0");
  }
  function Im(t, e, l, a) {
    if (t.length === 0) return -1;
    a = Wm(a);
    for (var n = 0; n < t.length; n++) {
      var u = t[n];
      if (u.type === e && u.listener === l && Wm(u.optionsOrUseCapture) === a)
        return n;
    }
    return -1;
  }
  Ve.prototype.dispatchEvent = function(t) {
    var e = j(
      this._fragmentFiber
    );
    if (e === null) return !0;
    e = ut(e);
    var l = this._eventListeners;
    if (l !== null && 0 < l.length || !t.bubbles) {
      var a = e.nodeType === 9 ? e.createComment("") : document.createTextNode("");
      if (l)
        for (var n = 0; n < l.length; n++) {
          var u = l[n];
          a.addEventListener(
            u.type,
            u.attachedListener,
            An(u.optionsOrUseCapture)
          );
        }
      if (e.appendChild(a), t = a.dispatchEvent(t), l)
        for (n = 0; n < l.length; n++)
          u = l[n], a.removeEventListener(
            u.type,
            u.attachedListener,
            An(u.optionsOrUseCapture)
          );
      return e.removeChild(a), t;
    }
    return e.dispatchEvent(t);
  }, Ve.prototype.focus = function(t) {
    m(
      this._fragmentFiber.child,
      !0,
      Pm,
      t,
      void 0,
      void 0
    );
  };
  function Pm(t, e) {
    return t.tag === 6 ? !1 : (t = ut(t), Hy(t, e));
  }
  Ve.prototype.focusLast = function(t) {
    var e = [];
    m(
      this._fragmentFiber.child,
      !0,
      As,
      e,
      void 0,
      void 0
    );
    for (var l = e.length - 1; 0 <= l && !Pm(e[l], t); l--) ;
  };
  function As(t, e) {
    return e.push(t), !1;
  }
  Ve.prototype.blur = function() {
    var t = j(
      this._fragmentFiber
    );
    t !== null && (t = ut(t), t = Eu(t).activeElement, t !== null && m(
      this._fragmentFiber.child,
      !1,
      Ny,
      t,
      void 0,
      void 0
    ));
  };
  function Ny(t, e) {
    return t.tag === 6 ? !1 : (t = ut(t), t === e || t.contains(e) ? (e.blur(), !0) : !1);
  }
  Ve.prototype.observeUsing = function(t) {
    this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(t), m(
      this._fragmentFiber.child,
      !1,
      zy,
      t,
      void 0,
      void 0
    );
  };
  function zy(t, e) {
    return t.tag === 6 || (t = ut(t), e.observe(t)), !1;
  }
  Ve.prototype.unobserveUsing = function(t) {
    var e = this._observers;
    if (e !== null && e.has(t)) {
      e.delete(t), m(
        this._fragmentFiber.child,
        !1,
        My,
        t,
        void 0,
        void 0
      );
      for (var l = e = 0; l < fl.length; l++) {
        var a = fl[l];
        a.fragmentInstance === this && a.observer === t ? t.unobserve(a.instance) : fl[e++] = a;
      }
      fl.length = e;
    }
  };
  function My(t, e) {
    return t.tag === 6 || (t = ut(t), e.unobserve(t)), !1;
  }
  var fl = [], Cs = !1;
  function Oy(t, e, l) {
    fl.push({
      fragmentInstance: t,
      observer: e,
      instance: l
    }), Cs || (Cs = !0, By(function() {
      Cs = !1;
      var a = fl;
      fl = [];
      for (var n = 0; n < a.length; n++) {
        var u = a[n];
        u.observer.unobserve(u.instance);
      }
    }));
  }
  Ve.prototype.getClientRects = function() {
    var t = [];
    return m(
      this._fragmentFiber.child,
      !1,
      Ay,
      t,
      void 0,
      void 0
    ), t;
  };
  function Ay(t, e) {
    if (t.tag === 6) {
      t = t.stateNode;
      var l = t.ownerDocument.createRange();
      l.selectNodeContents(t), e.push.apply(e, l.getClientRects());
    } else
      t = ut(t), e.push.apply(e, t.getClientRects());
    return !1;
  }
  Ve.prototype.getRootNode = function(t) {
    var e = j(
      this._fragmentFiber
    );
    return e === null ? this : ut(e).getRootNode(t);
  }, Ve.prototype.compareDocumentPosition = function(t) {
    var e = j(
      this._fragmentFiber
    );
    if (e === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var l = [];
    m(
      this._fragmentFiber.child,
      !1,
      As,
      l,
      void 0,
      void 0
    );
    var a = ut(e);
    if (l.length === 0) {
      if (l = a, w(this._fragmentFiber)) {
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
      return l === t ? n = Node.DOCUMENT_POSITION_CONTAINS : a & Node.DOCUMENT_POSITION_CONTAINED_BY && (l = F(e)[1], l === null ? n = Node.DOCUMENT_POSITION_PRECEDING : (t = ut(l).compareDocumentPosition(
        t
      ), n = t === 0 || t & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), n |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    e = ut(l[0]), n = ut(l[l.length - 1]);
    var u = w(this._fragmentFiber) ? e.parentElement : a;
    if (u == null)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    a = u.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_CONTAINED_BY, u = u.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var i = e.compareDocumentPosition(t), s = n.compareDocumentPosition(t), d = i & Node.DOCUMENT_POSITION_CONTAINED_BY || s & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return s = a && u && i & Node.DOCUMENT_POSITION_FOLLOWING && s & Node.DOCUMENT_POSITION_PRECEDING, e = a && e === t || u && n === t || d || s ? Node.DOCUMENT_POSITION_CONTAINED_BY : !a && e === t || !u && n === t ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : i, e & Node.DOCUMENT_POSITION_DISCONNECTED || e & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || Cy(
      e,
      this._fragmentFiber,
      l[0],
      l[l.length - 1],
      t
    ) ? e : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function Cy(t, e, l, a, n) {
    var u = ya(n);
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
    return t & Node.DOCUMENT_POSITION_PRECEDING ? ((e = !!u) && !(e = u === l) && (e = Bt(
      l,
      u,
      Ot
    ), e === null ? e = !1 : (m(
      e,
      !0,
      Mt,
      u,
      l
    ), u = zt, zt = null, e = u !== null)), e) : t & Node.DOCUMENT_POSITION_FOLLOWING ? ((e = !!u) && !(e = u === a) && (e = Bt(
      a,
      u,
      Ot
    ), e === null ? e = !1 : (m(
      e,
      !0,
      Lt,
      u,
      a
    ), u = zt, Tt = zt = null, e = u !== null)), e) : !1;
  }
  function t0(t, e) {
    var l = t.ownerDocument.createRange();
    l.selectNodeContents(t), t = l.getBoundingClientRect(), window.scrollTo(
      window.scrollX + t.left,
      e ? window.scrollY + t.top : window.scrollY + t.bottom - window.innerHeight
    );
  }
  Ve.prototype.scrollIntoView = function(t) {
    if (typeof t == "object") throw Error(o(566));
    var e = [];
    m(
      this._fragmentFiber.child,
      !1,
      As,
      e,
      void 0,
      void 0
    );
    var l = t !== !1;
    if (e.length === 0) {
      var a = F(
        this._fragmentFiber
      );
      if (a = l ? a[1] || a[0] || j(this._fragmentFiber) : a[0] || a[1], a === null) return;
      if (a.tag === 6) {
        t = ut(a), t0(t, l);
        return;
      }
      if (a = ut(a), a.nodeType !== 9) {
        if (a.nodeType === 11) {
          l = "host" in a ? a.host : null, l !== null && l.scrollIntoView(t);
          return;
        }
        a.scrollIntoView(t);
      }
    }
    for (a = l ? e.length - 1 : 0; a !== (l ? -1 : e.length); ) {
      var n = e[a];
      n.tag === 6 ? (n = ut(n), t0(n, l)) : ut(n).scrollIntoView(t), a += l ? -1 : 1;
    }
  };
  function xy(t, e) {
    return t = ut(t), e0(t, e), !1;
  }
  function e0(t, e) {
    t.reactFragments == null && (t.reactFragments = /* @__PURE__ */ new Set()), t.reactFragments.add(e);
  }
  function l0(t, e) {
    var l = e._eventListeners;
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var n = l[a];
        t.addEventListener(
          n.type,
          n.attachedListener,
          An(n.optionsOrUseCapture)
        );
      }
    t.nodeType !== 3 && (l = e._observers, l !== null && l.forEach(function(u) {
      for (var i = 0, s = 0; s < fl.length; s++) {
        var d = fl[s];
        (d.fragmentInstance !== e || d.observer !== u || d.instance !== t) && (fl[i++] = d);
      }
      fl.length = i, u.observe(t);
    }), e0(t, e));
  }
  function Dy(t, e) {
    var l = e._eventListeners;
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var n = l[a];
        t.removeEventListener(
          n.type,
          n.attachedListener,
          An(n.optionsOrUseCapture)
        );
      }
    t.nodeType !== 3 && (l = e._observers, l !== null && l.forEach(function(u) {
      typeof u.rootMargin == "string" ? Oy(
        e,
        u,
        t
      ) : u.unobserve(t);
    }), t.reactFragments != null && t.reactFragments.delete(e));
  }
  function xs(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var l = e;
      switch (e = e.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          xs(l), Qu(l);
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
  function jy(t, e, l, a) {
    for (; t.nodeType === 1; ) {
      var n = l;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!a && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (a) {
        if (!t[Gn])
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
      if (t = tl(t.nextSibling), t === null) break;
    }
    return null;
  }
  function Ry(t, e, l) {
    if (e === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l || (t = tl(t.nextSibling), t === null)) return null;
    return t;
  }
  function a0(t, e) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = tl(t.nextSibling), t === null)) return null;
    return t;
  }
  function Ds(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function js(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function Uy(t, e) {
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
  function tl(t) {
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
  var Rs = null;
  function n0(t) {
    t = t.nextSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var l = t.data;
        if (l === "/$" || l === "/&") {
          if (e === 0)
            return tl(t.nextSibling);
          e--;
        } else
          l !== "$" && l !== "$!" && l !== "$?" && l !== "$~" && l !== "&" || e++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function u0(t) {
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
  function Hy(t, e) {
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
  function By(t) {
    Zm(function() {
      Zm(function(e) {
        return t(e);
      });
    });
  }
  function i0(t, e, l) {
    switch (e = Eu(l), t) {
      case "html":
        if (t = e.documentElement, !t) throw Error(o(452));
        return t;
      case "head":
        if (t = e.head, !t) throw Error(o(453));
        return t;
      case "body":
        if (t = e.body, !t) throw Error(o(454));
        return t;
      default:
        throw Error(o(451));
    }
  }
  function c0(t, e, l) {
    for (var a in l) {
      var n = l[a];
      l.hasOwnProperty(a) && n != null && Rt(t, e, a, null, ry, n);
    }
    l.dangerouslySetInnerHTML != null && (t.textContent = ""), t.onclick === dl && (t.onclick = null), Qu(t);
  }
  function Us(t) {
    for (var e = t.attributes; e.length; )
      t.removeAttributeNode(e[0]);
    Qu(t);
  }
  var el = /* @__PURE__ */ new Map(), f0 = /* @__PURE__ */ new Set();
  function Nu(t) {
    if (typeof t.getRootNode == "function") {
      var e = t.getRootNode();
      if (e.nodeType === 9 || e.nodeType === 11) return e;
    }
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  var wl = W.d;
  W.d = {
    f: qy,
    r: Yy,
    D: wy,
    C: Ly,
    L: Gy,
    m: Xy,
    X: Vy,
    S: Qy,
    M: Zy
  };
  function qy() {
    var t = wl.f(), e = Ki();
    return t || e;
  }
  function Yy(t) {
    var e = Ka(t);
    e !== null && e.tag === 5 && e.type === "form" ? od(e) : wl.r(t);
  }
  var Cn = typeof document > "u" ? null : document;
  function s0(t, e, l) {
    var a = Cn;
    if (a && typeof e == "string" && e) {
      var n = Je(e);
      n = 'link[rel="' + t + '"][href="' + n + '"]', typeof l == "string" && (n += '[crossorigin="' + l + '"]'), f0.has(n) || (f0.add(n), t = { rel: t, crossOrigin: l, href: e }, a.querySelector(n) === null && (e = a.createElement("link"), re(e, "link", t), ee(e), a.head.appendChild(e)));
    }
  }
  function wy(t) {
    wl.D(t), s0("dns-prefetch", t, null);
  }
  function Ly(t, e) {
    wl.C(t, e), s0("preconnect", t, e);
  }
  function Gy(t, e, l) {
    wl.L(t, e, l);
    var a = Cn;
    if (a && t && e) {
      var n = 'link[rel="preload"][as="' + Je(e) + '"]';
      e === "image" && l && l.imageSrcSet ? (n += '[imagesrcset="' + Je(
        l.imageSrcSet
      ) + '"]', typeof l.imageSizes == "string" && (n += '[imagesizes="' + Je(
        l.imageSizes
      ) + '"]')) : n += '[href="' + Je(t) + '"]';
      var u = n;
      switch (e) {
        case "style":
          u = xn(t);
          break;
        case "script":
          u = Dn(t);
      }
      if (!(el.has(u) || (t = I(
        {
          rel: "preload",
          href: e === "image" && l && l.imageSrcSet ? void 0 : t,
          as: e
        },
        l
      ), el.set(u, t), a.querySelector(n) !== null || e === "style" && a.querySelector(zu(u)) || e === "script" && a.querySelector(Mu(u))))) {
        var i = a.createElement("link");
        re(i, "link", t), e === "style" && (i[Xu] = !0, i.onload = i.onerror = function() {
          To(i);
        }), ee(i), a.head.appendChild(i);
      }
    }
  }
  function Xy(t, e) {
    wl.m(t, e);
    var l = Cn;
    if (l && t) {
      var a = e && typeof e.as == "string" ? e.as : "script", n = 'link[rel="modulepreload"][as="' + Je(a) + '"][href="' + Je(t) + '"]', u = n;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = Dn(t);
      }
      if (!el.has(u) && (t = I({ rel: "modulepreload", href: t }, e), el.set(u, t), l.querySelector(n) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(Mu(u)))
              return;
        }
        a = l.createElement("link"), re(a, "link", t), ee(a), l.head.appendChild(a);
      }
    }
  }
  function Qy(t, e, l) {
    wl.S(t, e, l);
    var a = Cn;
    if (a && t) {
      var n = Ja(a).hoistableStyles, u = xn(t);
      e = e || "default";
      var i = n.get(u);
      if (!i) {
        var s = { loading: 0, preload: null };
        if (i = a.querySelector(
          zu(u)
        ))
          s.loading = 5;
        else {
          t = I(
            { rel: "stylesheet", href: t, "data-precedence": e },
            l
          ), (l = el.get(u)) && Hs(t, l);
          var d = i = a.createElement("link");
          ee(d), re(d, "link", t), d._p = new Promise(function(S, N) {
            d.onload = S, d.onerror = N;
          }), d.addEventListener("load", function() {
            s.loading |= 1;
          }), d.addEventListener("error", function() {
            s.loading |= 2;
          }), s.loading |= 4, Pi(i, e, a);
        }
        i = {
          type: "stylesheet",
          instance: i,
          count: 1,
          state: s
        }, n.set(u, i);
      }
    }
  }
  function Vy(t, e) {
    wl.X(t, e);
    var l = Cn;
    if (l && t) {
      var a = Ja(l).hoistableScripts, n = Dn(t), u = a.get(n);
      u || (u = l.querySelector(Mu(n)), u || (t = I({ src: t, async: !0 }, e), (e = el.get(n)) && Bs(t, e), u = l.createElement("script"), ee(u), re(u, "link", t), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function Zy(t, e) {
    wl.M(t, e);
    var l = Cn;
    if (l && t) {
      var a = Ja(l).hoistableScripts, n = Dn(t), u = a.get(n);
      u || (u = l.querySelector(Mu(n)), u || (t = I({ src: t, async: !0, type: "module" }, e), (e = el.get(n)) && Bs(t, e), u = l.createElement("script"), ee(u), re(u, "link", t), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function o0(t, e, l, a) {
    var n = (n = me.current) ? Nu(n) : null;
    if (!n) throw Error(o(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string" ? (l = xn(l.href), e = Ja(
          n
        ).hoistableStyles, a = e.get(l), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, e.set(l, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          t = xn(l.href);
          var u = Ja(
            n
          ).hoistableStyles, i = u.get(t);
          if (i || (n = n.ownerDocument || n, i = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(t, i), (u = n.querySelector(
            zu(t)
          )) ? u._p || (i.instance = u, i.state.loading = 5) : (u = el.get(t), u || (u = {
            rel: "preload",
            as: "style",
            href: l.href,
            crossOrigin: l.crossOrigin,
            integrity: l.integrity,
            media: l.media,
            hrefLang: l.hrefLang,
            referrerPolicy: l.referrerPolicy
          }, el.set(t, u)), Ky(
            n,
            t,
            u,
            i.state
          ))), e && a === null)
            throw Error(o(528, ""));
          return i;
        }
        if (e && a !== null)
          throw Error(o(529, ""));
        return null;
      case "script":
        return e = l.async, l = l.src, typeof l == "string" && e && typeof e != "function" && typeof e != "symbol" ? (l = Dn(l), e = Ja(
          n
        ).hoistableScripts, a = e.get(l), a || (a = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, e.set(l, a)), a) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(o(444, t));
    }
  }
  function xn(t) {
    return 'href="' + Je(t) + '"';
  }
  function zu(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function r0(t) {
    return I({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function Ky(t, e, l, a) {
    if (e = t.querySelector(
      'link[rel="preload"][as="style"][' + e + "]"
    )) {
      if (e[Xu] !== !0) {
        a.loading = 1;
        return;
      }
    } else
      e = t.createElement("link"), e[Xu] = !0, e.onload = e.onerror = To.bind(null, e), re(e, "link", l), ee(e), t.head.appendChild(e);
    a.preload = e, e.addEventListener("load", function() {
      return a.loading |= 1;
    }), e.addEventListener("error", function() {
      return a.loading |= 2;
    });
  }
  function Dn(t) {
    return '[src="' + Je(t) + '"]';
  }
  function Mu(t) {
    return "script[async]" + t;
  }
  function d0(t, e, l) {
    if (e.count++, e.instance === null)
      switch (e.type) {
        case "style":
          var a = t.querySelector(
            'style[data-href~="' + Je(l.href) + '"]'
          );
          if (a)
            return e.instance = a, ee(a), a;
          var n = I({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          return a = (t.ownerDocument || t).createElement(
            "style"
          ), ee(a), re(a, "style", n), Pi(a, l.precedence, t), e.instance = a;
        case "stylesheet":
          n = xn(l.href);
          var u = t.querySelector(
            zu(n)
          );
          if (u)
            return e.state.loading |= 4, e.instance = u, ee(u), u;
          a = r0(l), (n = el.get(n)) && Hs(a, n), u = (t.ownerDocument || t).createElement("link"), ee(u);
          var i = u;
          return i._p = new Promise(function(s, d) {
            i.onload = s, i.onerror = d;
          }), re(u, "link", a), e.state.loading |= 4, Pi(u, l.precedence, t), e.instance = u;
        case "script":
          return u = Dn(l.src), (n = t.querySelector(
            Mu(u)
          )) ? (e.instance = n, ee(n), n) : (a = l, (n = el.get(u)) && (a = I({}, l), Bs(a, n)), t = t.ownerDocument || t, n = t.createElement("script"), ee(n), re(n, "link", a), t.head.appendChild(n), e.instance = n);
        case "void":
          return null;
        default:
          throw Error(o(443, e.type));
      }
    else
      e.type === "stylesheet" && (e.state.loading & 4) === 0 && (a = e.instance, e.state.loading |= 4, Pi(a, l.precedence, t));
    return e.instance;
  }
  function Pi(t, e, l) {
    for (var a = l.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), n = a.length ? a[a.length - 1] : null, u = n, i = 0; i < a.length; i++) {
      var s = a[i];
      if (s.dataset.precedence === e) u = s;
      else if (u !== n) break;
    }
    u ? u.parentNode.insertBefore(t, u.nextSibling) : (e = l.nodeType === 9 ? l.head : l, e.insertBefore(t, e.firstChild));
  }
  function Hs(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.title == null && (t.title = e.title);
  }
  function Bs(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.integrity == null && (t.integrity = e.integrity);
  }
  var tc = null;
  function m0(t, e, l) {
    if (tc === null) {
      var a = /* @__PURE__ */ new Map(), n = tc = /* @__PURE__ */ new Map();
      n.set(l, a);
    } else
      n = tc, a = n.get(l), a || (a = /* @__PURE__ */ new Map(), n.set(l, a));
    if (a.has(t)) return a;
    for (a.set(t, null), l = l.getElementsByTagName(t), n = 0; n < l.length; n++) {
      var u = l[n];
      if (!(u[Gn] || u[ie] || t === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var i = u.getAttribute(e) || "";
        i = t + i;
        var s = a.get(i);
        s ? s.push(u) : a.set(i, [u]);
      }
    }
    return a;
  }
  function qs(t, e, l) {
    t = t.ownerDocument || t, t.head.insertBefore(
      l,
      e === "title" ? t.querySelector("head > title") : null
    );
  }
  function Jy(t, e, l) {
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
  function h0(t, e) {
    return t === "img" && e.src != null && e.src !== "" && e.onLoad == null && e.loading !== "lazy";
  }
  function v0(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function y0(t) {
    return (t.width || 100) * (t.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
  }
  function g0(t, e) {
    typeof e.decode == "function" && (t.imgCount++, e.complete || (t.imgBytes += y0(e), t.suspenseyImages.push(e)), t = ky.bind(t), e.decode().then(t, t));
  }
  function $y(t, e, l, a) {
    if (l.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var n = xn(a.href), u = e.querySelector(
          zu(n)
        );
        if (u) {
          e = u._p, e !== null && typeof e == "object" && typeof e.then == "function" && (t.count++, t = Ou.bind(t), e.then(t, t)), l.state.loading |= 4, l.instance = u, ee(u);
          return;
        }
        u = e.ownerDocument || e, a = r0(a), (n = el.get(n)) && Hs(a, n), u = u.createElement("link"), ee(u);
        var i = u;
        i._p = new Promise(function(s, d) {
          i.onload = s, i.onerror = d;
        }), re(u, "link", a), l.instance = u;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(l, e), (e = l.state.preload) && (l.state.loading & 3) === 0 && (t.count++, l = Ou.bind(t), e.addEventListener("load", l), e.addEventListener("error", l));
    }
  }
  var ec = 0;
  function Fy(t, e) {
    return t.stylesheets && t.count === 0 && ac(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(l) {
      var a = setTimeout(function() {
        if (t.stylesheets && ac(t, t.stylesheets), t.unsuspend) {
          var u = t.unsuspend;
          t.unsuspend = null, u();
        }
      }, 6e4 + e);
      0 < t.imgBytes && ec === 0 && (ec = 62500 * my());
      var n = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && ac(t, t.stylesheets), t.unsuspend)) {
            var u = t.unsuspend;
            t.unsuspend = null, u();
          }
        },
        (t.imgBytes > ec ? 50 : 800) + e
      );
      return t.unsuspend = l, function() {
        t.unsuspend = null, clearTimeout(a), clearTimeout(n);
      };
    } : null;
  }
  function b0(t) {
    if (t.count === 0 && (t.imgCount === 0 || !t.waitingForImages)) {
      if (t.stylesheets) ac(t, t.stylesheets);
      else if (t.unsuspend) {
        var e = t.unsuspend;
        t.unsuspend = null, e();
      }
    }
  }
  function Ou() {
    this.count--, b0(this);
  }
  function ky() {
    this.imgCount--, b0(this);
  }
  var lc = null;
  function ac(t, e) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, lc = /* @__PURE__ */ new Map(), e.forEach(Wy, t), lc = null, Ou.call(t));
  }
  function Wy(t, e) {
    if (!(e.state.loading & 4)) {
      var l = lc.get(t);
      if (l) var a = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), lc.set(t, l);
        for (var n = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < n.length; u++) {
          var i = n[u];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (l.set(i.dataset.precedence, i), a = i);
        }
        a && l.set(null, a);
      }
      n = e.instance, i = n.getAttribute("data-precedence"), u = l.get(i) || a, u === a && l.set(null, n), l.set(i, n), this.count++, a = Ou.bind(this), n.addEventListener("load", a), n.addEventListener("error", a), u ? u.parentNode.insertBefore(n, u.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(n, t.firstChild)), e.state.loading |= 4;
    }
  }
  var jn = {
    $$typeof: V,
    Provider: null,
    Consumer: null,
    _currentValue: Ee,
    _currentValue2: Ee,
    _threadCount: 0
  };
  function Iy(t, e, l, a, n, u, i, s, d) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = yc(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = yc(0), this.hiddenUpdates = yc(null), this.identifierPrefix = a, this.onUncaughtError = n, this.onCaughtError = u, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = d, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function p0(t, e, l, a, n, u, i, s, d, S, N, C) {
    return t = new Iy(
      t,
      e,
      l,
      i,
      d,
      S,
      N,
      C,
      s
    ), e = 1, u === !0 && (e |= 24), u = Ae(3, null, null, e), t.current = u, u.stateNode = t, e = Wc(), e.refCount++, t.pooledCache = e, e.refCount++, u.memoizedState = {
      element: a,
      isDehydrated: l,
      cache: e
    }, ef(u), t;
  }
  function S0(t) {
    return t ? (t = an, t) : an;
  }
  function _0(t, e, l, a, n, u) {
    n = S0(n), a.context === null ? a.context = n : a.pendingContext = n, a = Fl(e), a.payload = { element: l }, u = u === void 0 ? null : u, u !== null && (a.callback = u), l = kl(t, a, e), l !== null && (je(l, t, e), nu(l, t, e));
  }
  function T0(t, e) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var l = t.retryLane;
      t.retryLane = l !== 0 && l < e ? l : e;
    }
  }
  function Ys(t, e) {
    T0(t, e), (t = t.alternate) && T0(t, e);
  }
  function E0(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Sa(t, 67108864);
      e !== null && je(e, t, 67108864), Ys(t, 67108864);
    }
  }
  function N0(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Qe();
      e = gc(e);
      var l = Sa(t, e);
      l !== null && je(l, t, e), Ys(t, e);
    }
  }
  var Rn = !0;
  function Py(t, e, l, a) {
    var n = X.T;
    X.T = null;
    var u = W.p;
    try {
      W.p = 2, ws(t, e, l, a);
    } finally {
      W.p = u, X.T = n;
    }
  }
  function tg(t, e, l, a) {
    var n = X.T;
    X.T = null;
    var u = W.p;
    try {
      W.p = 8, ws(t, e, l, a);
    } finally {
      W.p = u, X.T = n;
    }
  }
  function ws(t, e, l, a) {
    if (Rn) {
      var n = Ls(a);
      if (n === null)
        Ss(
          t,
          e,
          a,
          nc,
          l
        ), M0(t, a);
      else if (lg(
        n,
        t,
        e,
        l,
        a
      ))
        a.stopPropagation();
      else if (M0(t, a), e & 4 && -1 < eg.indexOf(t)) {
        for (; n !== null; ) {
          var u = Ka(n);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var i = va(u.pendingLanes);
                  if (i !== 0) {
                    var s = u;
                    for (s.pendingLanes |= 2, s.entangledLanes |= 2; i; ) {
                      var d = 1 << 31 - Be(i);
                      s.entanglements[1] |= d, i &= ~d;
                    }
                    Tl(u), (At & 6) === 0 && (Qi = Ue() + 500, Su(0));
                  }
                }
                break;
              case 31:
              case 13:
                s = Sa(u, 2), s !== null && je(s, u, 2), Ki(), Ys(u, 2);
            }
          if (u = Ls(a), u === null && Ss(
            t,
            e,
            a,
            nc,
            l
          ), u === n) break;
          n = u;
        }
        n !== null && a.stopPropagation();
      } else
        Ss(
          t,
          e,
          a,
          null,
          l
        );
    }
  }
  function Ls(t) {
    return t = Nc(t), Gs(t);
  }
  var nc = null;
  function Gs(t) {
    if (nc = null, t = ya(t), t !== null) {
      var e = h(t);
      if (e === null) t = null;
      else {
        var l = e.tag;
        if (l === 13) {
          if (t = z(e), t !== null) return t;
          t = null;
        } else if (l === 31) {
          if (t = M(e), t !== null) return t;
          t = null;
        } else if (l === 3) {
          if (e.stateNode.current.memoizedState.isDehydrated)
            return e.tag === 3 ? e.stateNode.containerInfo : null;
          t = null;
        } else e !== t && (t = null);
      }
    }
    return nc = t, null;
  }
  function z0(t) {
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
        switch (mh()) {
          case so:
            return 2;
          case oo:
            return 8;
          case qu:
          case hh:
            return 32;
          case ro:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Xs = !1, fa = null, sa = null, oa = null, Au = /* @__PURE__ */ new Map(), Cu = /* @__PURE__ */ new Map(), ra = [], eg = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function M0(t, e) {
    switch (t) {
      case "focusin":
      case "focusout":
        fa = null;
        break;
      case "dragenter":
      case "dragleave":
        sa = null;
        break;
      case "mouseover":
      case "mouseout":
        oa = null;
        break;
      case "pointerover":
      case "pointerout":
        Au.delete(e.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Cu.delete(e.pointerId);
    }
  }
  function xu(t, e, l, a, n, u) {
    return t === null || t.nativeEvent !== u ? (t = {
      blockedOn: e,
      domEventName: l,
      eventSystemFlags: a,
      nativeEvent: u,
      targetContainers: [n]
    }, e !== null && (e = Ka(e), e !== null && E0(e)), t) : (t.eventSystemFlags |= a, e = t.targetContainers, n !== null && e.indexOf(n) === -1 && e.push(n), t);
  }
  function lg(t, e, l, a, n) {
    switch (e) {
      case "focusin":
        return fa = xu(
          fa,
          t,
          e,
          l,
          a,
          n
        ), !0;
      case "dragenter":
        return sa = xu(
          sa,
          t,
          e,
          l,
          a,
          n
        ), !0;
      case "mouseover":
        return oa = xu(
          oa,
          t,
          e,
          l,
          a,
          n
        ), !0;
      case "pointerover":
        var u = n.pointerId;
        return Au.set(
          u,
          xu(
            Au.get(u) || null,
            t,
            e,
            l,
            a,
            n
          )
        ), !0;
      case "gotpointercapture":
        return u = n.pointerId, Cu.set(
          u,
          xu(
            Cu.get(u) || null,
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
  function O0(t) {
    var e = ya(t.target);
    if (e !== null) {
      var l = h(e);
      if (l !== null) {
        if (e = l.tag, e === 13) {
          if (e = z(l), e !== null) {
            t.blockedOn = e, po(t.priority, function() {
              N0(l);
            });
            return;
          }
        } else if (e === 31) {
          if (e = M(l), e !== null) {
            t.blockedOn = e, po(t.priority, function() {
              N0(l);
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
  function uc(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var l = Ls(t.nativeEvent);
      if (l === null) {
        l = t.nativeEvent;
        var a = new l.constructor(
          l.type,
          l
        );
        Ec = a, l.target.dispatchEvent(a), Ec = null;
      } else
        return e = Ka(l), e !== null && E0(e), t.blockedOn = l, !1;
      e.shift();
    }
    return !0;
  }
  function A0(t, e, l) {
    uc(t) && l.delete(e);
  }
  function ag() {
    Xs = !1, fa !== null && uc(fa) && (fa = null), sa !== null && uc(sa) && (sa = null), oa !== null && uc(oa) && (oa = null), Au.forEach(A0), Cu.forEach(A0);
  }
  function ic(t, e) {
    t.blockedOn === e && (t.blockedOn = null, Xs || (Xs = !0, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      ag
    )));
  }
  var cc = null;
  function C0(t) {
    cc !== t && (cc = t, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      function() {
        cc === t && (cc = null);
        for (var e = 0; e < t.length; e += 3) {
          var l = t[e], a = t[e + 1], n = t[e + 2];
          if (typeof a != "function") {
            if (Gs(a || l) === null)
              continue;
            break;
          }
          var u = Ka(l);
          u !== null && (t.splice(e, 3), e -= 3, Ef(
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
  function Un(t) {
    function e(d) {
      return ic(d, t);
    }
    fa !== null && ic(fa, t), sa !== null && ic(sa, t), oa !== null && ic(oa, t), Au.forEach(e), Cu.forEach(e);
    for (var l = 0; l < ra.length; l++) {
      var a = ra[l];
      a.blockedOn === t && (a.blockedOn = null);
    }
    for (; 0 < ra.length && (l = ra[0], l.blockedOn === null); )
      O0(l), l.blockedOn === null && ra.shift();
    if (l = (t.ownerDocument || t).$$reactFormReplay, l != null)
      for (a = 0; a < l.length; a += 3) {
        var n = l[a], u = l[a + 1], i = n[Oe] || null;
        if (typeof u == "function")
          i || C0(l);
        else if (i) {
          var s = null;
          if (u && u.hasAttribute("formAction")) {
            if (n = u, i = u[Oe] || null)
              s = i.formAction;
            else if (Gs(n) !== null) continue;
          } else s = i.action;
          typeof s == "function" ? l[a + 1] = s : (l.splice(a, 3), a -= 3), C0(l);
        }
      }
  }
  function x0() {
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
  function Qs(t) {
    this._internalRoot = t;
  }
  fc.prototype.render = Qs.prototype.render = function(t) {
    var e = this._internalRoot;
    if (e === null) throw Error(o(409));
    var l = e.current, a = Qe();
    _0(l, a, t, e, null, null);
  }, fc.prototype.unmount = Qs.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var e = t.containerInfo;
      _0(t.current, 2, null, t, null, null), Ki(), e[Za] = null;
    }
  };
  function fc(t) {
    this._internalRoot = t;
  }
  fc.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var e = bo();
      t = { blockedOn: null, target: t, priority: e };
      for (var l = 0; l < ra.length && e !== 0 && e < ra[l].priority; l++) ;
      ra.splice(l, 0, t), l === 0 && O0(t);
    }
  };
  var D0 = r.version;
  if (D0 !== "19.3.0")
    throw Error(
      o(
        527,
        D0,
        "19.3.0"
      )
    );
  W.findDOMNode = function(t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function" ? Error(o(188)) : (t = Object.keys(t).join(","), Error(o(268, t)));
    return t = q(e), t = t !== null ? D(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var ng = {
    bundleType: 0,
    version: "19.3.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: X,
    reconcilerVersion: "19.3.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var sc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!sc.isDisabled && sc.supportsFiber)
      try {
        Yn = sc.inject(
          ng
        ), He = sc;
      } catch {
      }
  }
  return ju.createRoot = function(t, e) {
    if (!E(t)) throw Error(o(299));
    var l = !1, a = "", n = Sd, u = _d, i = Td;
    return e != null && (e.unstable_strictMode === !0 && (l = !0), e.identifierPrefix !== void 0 && (a = e.identifierPrefix), e.onUncaughtError !== void 0 && (n = e.onUncaughtError), e.onCaughtError !== void 0 && (u = e.onCaughtError), e.onRecoverableError !== void 0 && (i = e.onRecoverableError)), e = p0(
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
      x0
    ), t[Za] = e.current, ps(t), new Qs(e);
  }, ju.hydrateRoot = function(t, e, l) {
    if (!E(t)) throw Error(o(299));
    var a = !1, n = "", u = Sd, i = _d, s = Td, d = null;
    return l != null && (l.unstable_strictMode === !0 && (a = !0), l.identifierPrefix !== void 0 && (n = l.identifierPrefix), l.onUncaughtError !== void 0 && (u = l.onUncaughtError), l.onCaughtError !== void 0 && (i = l.onCaughtError), l.onRecoverableError !== void 0 && (s = l.onRecoverableError), l.formState !== void 0 && (d = l.formState)), e = p0(
      t,
      1,
      !0,
      e,
      l ?? null,
      a,
      n,
      d,
      u,
      i,
      s,
      x0
    ), e.context = S0(null), l = e.current, a = Qe(), a = gc(a), n = Fl(a), n.callback = null, kl(l, n, a), l = a, e.current.lanes = l, Ln(e, l), Tl(e), t[Za] = e.current, ps(t), new fc(e);
  }, ju.version = "19.3.0", ju;
}
var G0;
function hg() {
  if (G0) return Ks.exports;
  G0 = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (r) {
        console.error(r);
      }
  }
  return c(), Ks.exports = mg(), Ks.exports;
}
var vg = hg();
const $0 = 128, F0 = 640;
function Ru(c, r = 144) {
  return Math.max($0, Math.min(
    F0,
    Number.isFinite(c) ? Math.round(c) : r
  ));
}
function k0(c, r, f) {
  return r ? f ? c : "waveform" : "spectrogram";
}
function yg(c, r, f) {
  return Number.isFinite(c) ? c * (r === 1 ? 16 : r === 2 ? f : 1) : 0;
}
function gg(c, r) {
  return Math.max(0, Math.min(100, c - Math.max(-240, Math.min(240, r)) * 0.08));
}
function bg(c, r) {
  return Ru(c * Math.exp(-Math.max(-240, Math.min(240, r)) * 2e-3));
}
function X0(c, r, f) {
  return Math.max(0, c * r - f);
}
function La(c) {
  if (!c.id || !Number.isSafeInteger(c.startSample) || !Number.isSafeInteger(c.endSample) || !Number.isFinite(c.sampleRate) || c.sampleRate <= 0 || c.startSample < 0 || c.endSample <= c.startSample)
    throw new RangeError("A loop needs an id, valid sample rate and increasing integer sample bounds");
  return {
    start: c.startSample / c.sampleRate,
    end: c.endSample / c.sampleRate,
    duration: (c.endSample - c.startSample) / c.sampleRate
  };
}
function pg(c, r = 0) {
  const f = /* @__PURE__ */ new Set();
  return c.filter((o) => {
    try {
      const E = La(o);
      return f.has(o.id) || r > 0 && E.end > r + 0.02 ? !1 : (f.add(o.id), !0);
    } catch {
      return !1;
    }
  });
}
function W0(c, r, f) {
  const o = f - r;
  return !Number.isFinite(c) || o <= 0 ? r : r + ((c - r) % o + o) % o;
}
class Sg {
  constructor(r = () => new AudioContext()) {
    this.createContext = r;
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
    const r = Math.max(0, this.context.currentTime - this.anchor);
    return this.start + (this.offset + r) % this.length;
  }
  pause() {
    return this.stoppedTime = this.currentTime, this.generation += 1, this.abort?.abort(), this.abort = null, this.node && (this.node.stop(), this.node.disconnect(), this.node = null), this.stoppedTime;
  }
  async play(r, f, o, E = "same-origin") {
    const h = La(r);
    this.pause();
    const z = this.generation;
    this.context ??= this.createContext();
    const M = this.context, H = M.resume();
    H.catch(() => {
    });
    const q = r.audioSrc || f, D = JSON.stringify([q, r.startSample, r.endSample, r.sampleRate]);
    try {
      let m = this.cache?.url === D ? this.cache.buffer : null;
      if (!m) {
        const ut = new AbortController();
        this.abort = ut;
        const zt = await fetch(q, { signal: ut.signal, credentials: E });
        if (!zt.ok) throw new Error(`Could not load loop audio (HTTP ${zt.status})`);
        const Tt = 128 * 1024 * 1024;
        if (Number(zt.headers.get("Content-Length")) > Tt) throw new Error("Loop audio exceeds 128 MiB");
        const Mt = await zt.arrayBuffer();
        if (Mt.byteLength > Tt) throw new Error("Loop audio exceeds 128 MiB");
        if (m = await M.decodeAudioData(Mt), z !== this.generation) return !1;
        this.cache = { url: D, buffer: m };
      }
      if (await H, z !== this.generation) return !1;
      const j = r.audioSrc ? 0 : h.start, w = j + h.duration, F = Math.max(2 / m.sampleRate, 2e-3);
      if (!Number.isFinite(m.duration) || m.duration <= j || w > m.duration + F || r.audioSrc && Math.abs(m.duration - h.duration) > F)
        throw new Error("Loop audio duration does not match the reported sample boundaries");
      const ct = M.createBufferSource();
      return ct.buffer = m, ct.loop = !0, ct.loopStart = j, ct.loopEnd = Math.min(w, m.duration), ct.connect(M.destination), this.start = h.start, this.length = ct.loopEnd - j, this.offset = W0(o, h.start, h.start + this.length) - h.start, this.anchor = M.currentTime, ct.start(this.anchor, j + this.offset), this.node = ct, !0;
    } catch (m) {
      if (z !== this.generation) return !1;
      throw m;
    } finally {
      H.catch(() => {
      });
    }
  }
  dispose() {
    this.pause(), this.cache = null;
    const r = this.context;
    this.context = null, r && r.close().catch(() => {
    });
  }
}
function ma(c, r, f) {
  return Math.min(f, Math.max(r, c));
}
function wa(c) {
  const r = Math.max(0, Number(c) || 0), f = Math.floor(r / 60), o = Math.floor(r % 60), E = Math.floor((r - Math.floor(r)) * 1e3);
  return `${String(f).padStart(2, "0")}:${String(o).padStart(2, "0")}.${String(E).padStart(3, "0")}`;
}
function I0(c) {
  const r = [0.1, 0.25, 0.5, 1, 2, 5, 10, 15, 30, 60, 120, 300, 600];
  return r.find((f) => f * c >= 70) ?? r[r.length - 1];
}
function _g(c, r, f, o, E) {
  if (E <= 0 || o <= 0) return { start: 0, end: 0 };
  const h = Math.max(0, c - f), z = Math.max(0, c + r - f), M = ma(h / o, 0, E), H = ma(z / o, M, E);
  return { start: M, end: H };
}
function Ps(c, r) {
  return `${ma(c / Math.max(r, 1e-9), 0, 1) * 100}%`;
}
function P0(c, r, f, o = 0.08) {
  const E = Number.isFinite(r) && Number(r) > c ? Number(r) : c + 0.5;
  return `${Math.max(o, (E - c) / Math.max(f, 1e-9) * 100)}%`;
}
function Tg({ min: c, max: r, colour: f = "#79c0ff" }) {
  const o = Y.useRef(null);
  return Y.useEffect(() => {
    const E = o.current;
    if (!E) return;
    const h = Math.max(1, Math.min(c.length, r.length));
    E.width = h, E.height = 180;
    const z = E.getContext("2d");
    if (!z) return;
    z.clearRect(0, 0, h, E.height), z.strokeStyle = f, z.lineWidth = 1, z.beginPath();
    const M = E.height / 2, H = E.height * 0.46;
    for (let q = 0; q < h; q += 1) {
      const D = q + 0.5;
      z.moveTo(D, M - (Number(r[q]) || 0) * H), z.lineTo(D, M - (Number(c[q]) || 0) * H);
    }
    z.stroke();
  }, [f, r, c]), /* @__PURE__ */ g.jsx("canvas", { ref: o, className: "rts-waveform", "aria-hidden": "true" });
}
function Eg({ rows: c }) {
  const r = Y.useRef(null);
  return Y.useEffect(() => {
    const f = r.current, o = c.filter((M) => M.length > 0);
    if (!f || !o.length) return;
    const E = Math.max(...o.map((M) => M.length));
    f.width = Math.min(4096, o.length), f.height = Math.min(256, E);
    const h = f.getContext("2d");
    if (!h) return;
    const z = h.createImageData(f.width, f.height);
    for (let M = 0; M < f.width; M += 1) {
      const H = Math.min(o.length - 1, Math.floor(M * o.length / f.width)), q = o[H], D = Math.max(1e-9, ...q.map((m) => Number(m) || 0));
      for (let m = 0; m < f.height; m += 1) {
        const j = Math.min(q.length - 1, Math.floor((f.height - 1 - m) * q.length / f.height)), w = ma((Number(q[j]) || 0) / D, 0, 1), F = (m * f.width + M) * 4;
        z.data[F] = Math.round(40 + 180 * w), z.data[F + 1] = Math.round(35 + 110 * w), z.data[F + 2] = Math.round(80 + 170 * w), z.data[F + 3] = 255;
      }
    }
    h.putImageData(z, 0, 0);
  }, [c]), /* @__PURE__ */ g.jsx("canvas", { ref: r, className: "rts-matrix", "aria-hidden": "true" });
}
function Ng({ items: c, duration: r }) {
  const f = c.filter((h) => Number.isFinite(h.value) && h.value > 0);
  if (!f.length) return null;
  const o = Math.log2(Math.max(20, Math.min(...f.map((h) => h.value)))), E = Math.log2(Math.max(100, ...f.map((h) => h.value)));
  return f.map((h, z) => {
    const M = (Math.log2(h.value) - o) / Math.max(0.01, E - o);
    return /* @__PURE__ */ g.jsx(
      "span",
      {
        className: `rts-note ${h.className ?? ""}`,
        style: { left: Ps(h.start, r), width: P0(h.start, h.end ?? h.start + 0.12, r, 0.04), top: `${8 + (1 - M) * 72}px` },
        title: h.title ?? `${h.label ?? `${h.value.toFixed(1)} Hz`} · ${wa(h.start)}`
      },
      `${h.start}-${z}`
    );
  });
}
function to({ content: c, duration: r }) {
  switch (c.type) {
    case "waveform":
      return /* @__PURE__ */ g.jsx(Tg, { ...c });
    case "image":
      return /* @__PURE__ */ g.jsx("img", { className: `rts-image ${c.className ?? ""}`, src: c.src, alt: c.alt });
    case "markers":
      return /* @__PURE__ */ g.jsx(g.Fragment, { children: c.items.map((f, o) => /* @__PURE__ */ g.jsx(
        "span",
        {
          className: `rts-marker ${f.emphasis ? "rts-marker-emphasis" : ""} ${f.className ?? ""}`,
          style: { left: Ps(f.time, r) },
          title: f.label
        },
        `${f.time}-${o}`
      )) });
    case "blocks":
      return /* @__PURE__ */ g.jsx(g.Fragment, { children: c.items.map((f, o) => /* @__PURE__ */ g.jsx(
        "span",
        {
          className: `rts-block ${f.className ?? ""}`,
          style: { left: Ps(f.start, r), width: P0(f.start, f.end, r) },
          title: f.title ?? `${f.label ?? ""} · ${wa(f.start)}${f.end ? ` — ${wa(f.end)}` : ""}`,
          children: f.label
        },
        `${f.start}-${o}`
      )) });
    case "notes":
      return /* @__PURE__ */ g.jsx(Ng, { items: c.items, duration: r });
    case "curve": {
      const f = c.points.filter((M) => Number.isFinite(M.time) && Number.isFinite(M.value));
      if (!f.length) return null;
      const o = f.map((M) => M.value), E = Math.min(...o), h = Math.max(...o), z = f.map((M) => {
        const H = M.time / Math.max(r, 1e-9) * 2e3, q = 180 - (M.value - E) / Math.max(1e-9, h - E) * 168 - 6;
        return `${H.toFixed(2)},${q.toFixed(2)}`;
      }).join(" ");
      return /* @__PURE__ */ g.jsx("svg", { className: "rts-curve", viewBox: "0 0 2000 180", preserveAspectRatio: "none", "aria-hidden": "true", children: /* @__PURE__ */ g.jsx("polyline", { fill: "none", stroke: c.colour ?? "#7ee787", strokeWidth: "2", vectorEffect: "non-scaling-stroke", points: z }) });
    }
    case "matrix":
      return /* @__PURE__ */ g.jsx(Eg, { ...c });
    case "summary":
      return /* @__PURE__ */ g.jsx("div", { className: "rts-summary", children: c.items.map((f, o) => /* @__PURE__ */ g.jsxs("span", { className: "rts-summary-item", children: [
        /* @__PURE__ */ g.jsxs("strong", { children: [
          f.label,
          ": "
        ] }),
        f.value
      ] }, `${f.label}-${o}`)) });
    case "artifact":
      return /* @__PURE__ */ g.jsxs("div", { className: "rts-artifact", children: [
        /* @__PURE__ */ g.jsx("span", { children: c.note }),
        c.href && /* @__PURE__ */ g.jsx("a", { href: c.href, target: "_blank", rel: "noopener noreferrer", children: c.linkLabel ?? "open" })
      ] });
    case "text":
      return /* @__PURE__ */ g.jsx("div", { className: "rts-text", children: c.text });
    case "custom":
      return /* @__PURE__ */ g.jsx(g.Fragment, { children: c.node });
  }
}
function zg({ content: c, duration: r, view: f }) {
  const o = k0(f, !!c.waveform, !!c.spectrogram);
  return /* @__PURE__ */ g.jsxs("div", { className: `rts-audio-layers rts-audio-${o}`, "data-audio-view": o, children: [
    c.spectrogram && o !== "waveform" && /* @__PURE__ */ g.jsx("div", { className: "rts-audio-spectrum", children: /* @__PURE__ */ g.jsx(to, { content: { type: "image", ...c.spectrogram }, duration: r }) }),
    c.waveform && o !== "spectrogram" && /* @__PURE__ */ g.jsx("div", { className: "rts-audio-envelope", children: /* @__PURE__ */ g.jsx(to, { content: { type: "waveform", ...c.waveform, colour: o === "both" ? "#e6fff7" : c.waveform.colour }, duration: r }) }),
    !c.waveform && !c.spectrogram && /* @__PURE__ */ g.jsx("span", { className: "rts-meta", children: "Waiting for audio analysis" })
  ] });
}
function Mg(c, r, f, o, E = "same-origin") {
  const [h, z] = Y.useState(0), [M, H] = Y.useState(!1), [q, D] = Y.useState(!1), [m, j] = Y.useState(""), w = Y.useRef(!1), F = Y.useRef("media"), ct = Y.useRef(null), ut = Y.useRef(0), zt = Y.useRef({ audioSrc: r, activeLoop: f, onError: o, credentials: E });
  zt.current = { audioSrc: r, activeLoop: f, onError: o, credentials: E };
  const Tt = Y.useCallback(() => F.current === "loop" ? ct.current?.currentTime ?? 0 : c.current?.currentTime ?? 0, [c]), Mt = Y.useCallback(() => {
    const et = Tt();
    return ut.current += 1, w.current = !1, ct.current?.pause(), c.current?.pause(), D(!1), H(!1), z(et), et;
  }, [c, Tt]), Lt = Y.useCallback((et) => {
    Mt(), j(et instanceof Error ? et.message : String(et)), zt.current.onError?.(et);
  }, [Mt]), Ot = Y.useCallback(async (et) => {
    Mt();
    const tt = ut.current;
    w.current = !0, D(!0), j("");
    const { activeLoop: bt, audioSrc: qt, credentials: $t } = zt.current;
    try {
      if (bt) {
        if (F.current = "loop", ct.current ??= new Sg(), !await ct.current.play(bt, qt, et, $t)) return;
      } else {
        F.current = "media";
        const V = c.current;
        if (!V) return;
        V.currentTime = Math.max(0, et), await V.play();
      }
      if (tt !== ut.current) return;
      z(Tt()), D(!1), H(!0);
    } catch (V) {
      tt === ut.current && Lt(V);
    }
  }, [c, Lt, Mt, Tt]), Bt = Y.useCallback((et) => {
    const tt = zt.current.activeLoop;
    if (tt) {
      const bt = La(tt);
      et = W0(et, bt.start, bt.end);
    }
    w.current ? Ot(et) : (Mt(), F.current = "media", c.current && (c.current.currentTime = et), z(et));
  }, [c, Mt, Ot]), I = Y.useCallback(() => {
    if (w.current) {
      Mt();
      return;
    }
    let et = Tt();
    const tt = zt.current.activeLoop;
    if (tt) {
      const bt = La(tt);
      (et < bt.start || et >= bt.end) && (et = bt.start);
    }
    Ot(et);
  }, [Mt, Ot, Tt]);
  Y.useEffect(() => (Mt(), F.current = "media", z(0), j(""), ct.current?.dispose(), ct.current = null, () => {
    ut.current += 1, w.current = !1, ct.current?.dispose(), ct.current = null, c.current?.pause();
  }), [r, c, Mt]);
  const P = f ? JSON.stringify([f.id, f.startSample, f.endSample, f.sampleRate, f.audioSrc]) : "";
  Y.useEffect(() => {
    const et = w.current;
    let tt = Mt();
    const bt = zt.current.activeLoop;
    bt && (tt = La(bt).start), F.current = "media", c.current && (c.current.currentTime = tt), z(tt), et && Ot(tt);
  }, [P, c, Mt, Ot]), Y.useEffect(() => {
    if (!M) return;
    let et = 0;
    const tt = () => {
      z(Tt()), et = requestAnimationFrame(tt);
    };
    return et = requestAnimationFrame(tt), () => cancelAnimationFrame(et);
  }, [M, Tt]);
  const rt = Y.useCallback(() => {
    F.current === "media" && Mt();
  }, [Mt]);
  return { time: h, playing: M, loading: q, error: m, toggle: I, seek: Bt, ended: rt, fail: Lt };
}
function Og(c, r) {
  if (c <= 0 || r <= 0) return [];
  const f = I0(r) / 5, o = [];
  for (let E = 0; E * f <= c + 1e-6; E += 1)
    o.push({
      time: E * f,
      major: E % 5 === 0
    });
  return o;
}
function Ag(c, r) {
  const f = Math.round(c * 1e3), o = Math.floor(f / 1e3), E = `${String(Math.floor(o / 60)).padStart(2, "0")}:${String(o % 60).padStart(2, "0")}`;
  return I0(r) < 1 ? `${E}.${String(f % 1e3).padStart(3, "0")}` : E;
}
function Cg({
  audioSrc: c,
  loops: r = [],
  onLoopSelect: f,
  onLoopEnabledChange: o,
  lanes: E,
  title: h = "Audio timeline",
  subtitle: z,
  duration: M = 0,
  grid: H = [],
  headerEnd: q,
  footer: D,
  className: m = "",
  labelWidth: j = 230,
  initialZoom: w = 20,
  laneControls: F = !1,
  wheelNavigation: ct = !1,
  followPlayheadByDefault: ut = !0,
  preload: zt = "metadata",
  crossOrigin: Tt,
  onDurationChange: Mt,
  onTimeChange: Lt,
  onWindowChange: Ot,
  onPlaybackError: Bt
}) {
  const I = Y.useRef(null), P = Y.useRef(null), [rt, et] = Y.useState(Math.max(0, M)), [tt, bt] = Y.useState(null), [qt, $t] = Y.useState(!1), V = Y.useMemo(() => pg(r, rt), [r, rt]), x = V.find((O) => O.id === tt) ?? null, U = Mg(
    I,
    c,
    qt ? x : null,
    Bt,
    Tt === "use-credentials" ? "include" : "same-origin"
  ), Z = U.time, ht = U.playing, it = x ? La(x) : null, ue = (O) => {
    bt(O), f?.(V.find((nt) => nt.id === O) ?? null);
  }, Qt = (O) => {
    $t(O), o?.(O);
  };
  Y.useEffect(() => {
    tt && !V.some((O) => O.id === tt) && (bt(null), $t(!1), f?.(null), o?.(!1));
  }, [tt, V, f, o]), Y.useEffect(() => {
    bt(null), $t(!1), et(Math.max(0, M));
  }, [c]);
  const [Re, y] = Y.useState(ut), [R, J] = Y.useState(w), [$, ot] = Y.useState({}), [pt, vt] = Y.useState({}), X = Y.useRef(w), W = Y.useRef(null), Ee = Y.useRef(() => {
  });
  Y.useEffect(() => {
    ot({}), vt({});
  }, [c]);
  const [Ze, ol] = Y.useState(0), [be, Kt] = Y.useState({ start: 0, end: 0 });
  Y.useEffect(() => {
    M > 0 && et(M);
  }, [M]), Y.useEffect(() => {
    const O = P.current;
    if (!O) return;
    const nt = () => ol(O.clientWidth);
    nt();
    const dt = new ResizeObserver(nt);
    return dt.observe(O), () => dt.disconnect();
  }, []);
  const B = rt > 0 ? Math.max(0.4, Math.max(320, Ze - j - 16) / rt) : 0.4, G = Math.max(B, B * Math.pow(2, R / 18));
  Y.useLayoutEffect(() => {
    if (X.current = R, W.current && P.current) {
      const { time: O, pointer: nt } = W.current;
      P.current.scrollLeft = X0(O, G, nt), W.current = null;
    }
  }, [R, G]), Y.useEffect(() => {
    const O = P.current;
    if (!O || !ct) return;
    const nt = (dt) => Ee.current(dt);
    return O.addEventListener("wheel", nt, { passive: !1 }), () => O.removeEventListener("wheel", nt);
  }, [ct]);
  const xt = Math.max(1, rt * G), me = Y.useMemo(() => Og(rt, G), [rt, G]), Ne = Y.useCallback(() => {
    const O = P.current;
    if (!O) return;
    const nt = _g(
      O.scrollLeft + j,
      Math.max(0, O.clientWidth - j),
      j,
      G,
      rt
    );
    Kt(nt), Ot?.(nt);
  }, [rt, j, Ot, G]);
  Y.useEffect(() => {
    Ne();
  }, [Ne, Ze]), Y.useEffect(() => {
    Lt?.(Z);
    const O = P.current;
    if (!O || !Re || !ht) return;
    const nt = j + Z * G, dt = O.scrollLeft + O.clientWidth, he = Math.min(180, O.clientWidth * 0.2);
    nt > dt - he ? O.scrollLeft = Math.max(0, nt - O.clientWidth + he) : nt < O.scrollLeft + j && (O.scrollLeft = Math.max(0, nt - j - he));
  }, [Z, Re, ht, j, Lt, G]);
  const Ke = (O) => {
    if (rt <= 0 || O.target.closest(".rts-label, a, button, input, select, textarea")) return;
    const nt = P.current, dt = I.current;
    if (!nt || !dt) return;
    const he = nt.getBoundingClientRect(), te = O.clientX - he.left + nt.scrollLeft - j;
    if (te < 0) return;
    const ze = ma(te / G, 0, rt);
    U.seek(ze);
  }, rl = (O, nt) => {
    const dt = P.current;
    if (O = ma(O, 0, 100), O !== X.current) {
      if (dt) {
        const he = Math.max(1, dt.clientWidth - j), te = nt === void 0 ? he / 2 : ma(nt - dt.getBoundingClientRect().left - j, 0, he), ze = W.current, Me = B * Math.pow(2, X.current / 18), ve = ze ? X0(ze.time, Me, ze.pointer) : dt.scrollLeft;
        W.current = { time: (ve + te) / Me, pointer: te };
      }
      X.current = O, J(O);
    }
  };
  Ee.current = (O) => {
    const nt = P.current, dt = O.target instanceof Element ? O.target : null;
    if (!nt || !dt || dt.closest("input, select, textarea, button, [contenteditable=true]")) return;
    const he = Math.abs(O.deltaX) > Math.abs(O.deltaY) ? O.deltaX : O.deltaY, te = yg(he, O.deltaMode, nt.clientWidth - j);
    if (te)
      if (O.ctrlKey || O.metaKey) {
        if (rt <= 0) return;
        O.preventDefault(), O.stopPropagation(), y(!1), rl(gg(X.current, te), O.clientX);
      } else if (O.altKey) {
        const ze = dt.closest("[data-lane-id]")?.dataset.laneId, Me = E.find((ve) => ve.id === ze);
        if (!F || !Me) return;
        O.preventDefault(), O.stopPropagation(), ot((ve) => ({
          ...ve,
          [Me.id]: bg(ve[Me.id] ?? Ru(Me.height), te)
        }));
      } else
        O.preventDefault(), O.stopPropagation(), O.shiftKey ? nt.scrollTop += te : (y(!1), nt.scrollLeft += te);
  };
  const qn = () => {
    if (!it || !P.current) return;
    const O = Math.max(320, Ze - j - 16) / (it.duration * 1.1), nt = ma(18 * Math.log2(O / B), 0, 100);
    W.current = null, X.current = nt, J(nt);
    const dt = B * Math.pow(2, nt / 18);
    requestAnimationFrame(() => {
      P.current && (P.current.scrollLeft = Math.max(0, (it.start - it.duration * 0.05) * dt));
    });
  }, Va = () => {
    const O = Number(I.current?.duration) || 0;
    Number.isFinite(O) && O > 0 && (et(O), Mt?.(O));
  };
  return /* @__PURE__ */ g.jsxs(
    "section",
    {
      className: `rts-sequence ${F ? "rts-display-controls" : ""} ${m}`,
      style: { "--rts-label-width": `${j}px`, "--rts-track-width": `${xt}px` },
      children: [
        /* @__PURE__ */ g.jsxs("header", { className: "rts-toolbar", children: [
          /* @__PURE__ */ g.jsxs("div", { className: "rts-ident", children: [
            /* @__PURE__ */ g.jsx("strong", { children: h }),
            z && /* @__PURE__ */ g.jsx("span", { children: z })
          ] }),
          /* @__PURE__ */ g.jsxs("div", { className: "rts-transport", "aria-label": "Timeline playback controls", children: [
            /* @__PURE__ */ g.jsx("button", { type: "button", className: "rts-button rts-play", onClick: U.toggle, "aria-label": ht || U.loading ? "Pause" : "Play", children: U.loading ? "…" : ht ? "❚❚" : "▶" }),
            /* @__PURE__ */ g.jsxs("output", { className: "rts-time", "aria-live": "off", children: [
              wa(Z),
              " / ",
              wa(rt)
            ] }),
            /* @__PURE__ */ g.jsx("button", { type: "button", className: "rts-button", onClick: () => rl(0), children: "Fit" }),
            /* @__PURE__ */ g.jsxs("label", { className: "rts-control", children: [
              /* @__PURE__ */ g.jsx("span", { children: "Zoom" }),
              /* @__PURE__ */ g.jsx("input", { "aria-label": "Timeline zoom", type: "range", min: "0", max: "100", value: R, onChange: (O) => rl(Number(O.target.value)) })
            ] }),
            /* @__PURE__ */ g.jsxs("label", { className: "rts-control", children: [
              /* @__PURE__ */ g.jsx("input", { type: "checkbox", checked: Re, onChange: (O) => y(O.target.checked) }),
              /* @__PURE__ */ g.jsx("span", { children: "Follow" })
            ] })
          ] }),
          /* @__PURE__ */ g.jsx("div", { className: "rts-header-end", children: q }),
          V.length > 0 && /* @__PURE__ */ g.jsxs("div", { className: "rts-loop-controls", "aria-label": "Loop controls", children: [
            /* @__PURE__ */ g.jsxs("label", { children: [
              "Loop ",
              /* @__PURE__ */ g.jsxs("select", { "aria-label": "Select loop", value: tt ?? "", onChange: (O) => ue(O.target.value), children: [
                /* @__PURE__ */ g.jsx("option", { value: "", children: "Choose a loop…" }),
                V.map((O) => /* @__PURE__ */ g.jsx("option", { value: O.id, children: O.label || O.id }, O.id))
              ] })
            ] }),
            /* @__PURE__ */ g.jsxs("label", { children: [
              /* @__PURE__ */ g.jsx("input", { type: "checkbox", "aria-label": "Enable loop", disabled: !x, checked: qt && !!x, onChange: (O) => Qt(O.target.checked) }),
              "Enable loop"
            ] }),
            /* @__PURE__ */ g.jsx("button", { type: "button", className: "rts-button", disabled: !x, onClick: qn, children: "Zoom to loop" }),
            x && /* @__PURE__ */ g.jsxs("output", { children: [
              x.startSample.toLocaleString(),
              " → ",
              x.endSample.toLocaleString(),
              " samples (end exclusive) · ",
              x.sampleRate.toLocaleString(),
              " Hz"
            ] }),
            x?.downloadUrl && /* @__PURE__ */ g.jsx("a", { href: x.downloadUrl, download: !0, children: "Download loop WAV" }),
            /* @__PURE__ */ g.jsx("span", { className: "rts-loop-status", role: "status", children: U.loading ? "Loading loop…" : qt && x ? "Loop enabled · Play repeats selection" : "Full-song playback" })
          ] }),
          U.error && /* @__PURE__ */ g.jsx("div", { role: "alert", className: "rts-loop-error", children: U.error })
        ] }),
        /* @__PURE__ */ g.jsx(
          "audio",
          {
            ref: I,
            src: c,
            preload: zt,
            crossOrigin: Tt,
            onLoadedMetadata: Va,
            onEnded: U.ended,
            onError: () => U.fail(new Error(I.current?.error?.message || "Audio playback failed"))
          }
        ),
        /* @__PURE__ */ g.jsx("div", { className: "rts-workspace", children: /* @__PURE__ */ g.jsx("div", { ref: P, className: "rts-scroller", onScroll: Ne, onClick: Ke, children: /* @__PURE__ */ g.jsxs("div", { className: "rts-inner", children: [
          /* @__PURE__ */ g.jsxs("div", { className: "rts-ruler-row", children: [
            /* @__PURE__ */ g.jsx("div", { className: "rts-label rts-ruler-label", children: "TIME" }),
            /* @__PURE__ */ g.jsx("div", { className: "rts-ruler-track", children: me.map((O) => /* @__PURE__ */ g.jsx("span", { className: `rts-tick ${O.major ? "rts-tick-major" : ""}`, style: { left: `${O.time * G}px` }, children: O.major && /* @__PURE__ */ g.jsx("span", { className: "rts-tick-label", children: Ag(O.time, G) }) }, O.time)) })
          ] }),
          V.length > 0 && /* @__PURE__ */ g.jsxs("div", { className: "rts-lane rts-lane-loops", children: [
            /* @__PURE__ */ g.jsxs("div", { className: "rts-label", children: [
              /* @__PURE__ */ g.jsx("div", { className: "rts-title", children: "LOOPS" }),
              /* @__PURE__ */ g.jsx("div", { className: "rts-meta", children: "Select a region, enable, then Play" })
            ] }),
            /* @__PURE__ */ g.jsx("div", { className: "rts-track", children: V.map((O) => {
              const nt = La(O);
              return /* @__PURE__ */ g.jsx(
                "button",
                {
                  type: "button",
                  className: "rts-loop-region",
                  "aria-pressed": tt === O.id,
                  "aria-label": `Select ${O.label || O.id}`,
                  onClick: () => ue(O.id),
                  title: `${O.label || O.id}: [${O.startSample}, ${O.endSample}) at ${O.sampleRate} Hz`,
                  style: { left: `${nt.start * G}px`, width: `${nt.duration * G}px` },
                  children: O.label || O.id
                },
                O.id
              );
            }) })
          ] }),
          it && /* @__PURE__ */ g.jsx(
            "div",
            {
              className: `rts-loop-shade ${qt ? "" : "is-disabled"}`,
              "aria-hidden": "true",
              style: { left: `${j + it.start * G}px`, width: `${it.duration * G}px` }
            }
          ),
          /* @__PURE__ */ g.jsx("div", { className: "rts-lanes", children: E.map((O) => {
            const nt = O.content, dt = nt.type === "audio" ? nt : null, he = pt[O.id] ?? dt?.view ?? "both", te = dt ? k0(he, !!dt.waveform, !!dt.spectrogram) : "both", ze = F ? $[O.id] ?? Ru(O.height) : O.height, Me = typeof O.title == "string" ? O.title : O.id;
            return /* @__PURE__ */ g.jsxs(
              "div",
              {
                "data-lane-id": O.id,
                className: `rts-lane rts-lane-${O.kind ?? "default"} ${O.className ?? ""}`,
                style: ze ? { "--rts-lane-height": `${ze}px` } : void 0,
                children: [
                  /* @__PURE__ */ g.jsxs("div", { className: "rts-label", children: [
                    /* @__PURE__ */ g.jsx("div", { className: "rts-title", children: O.title }),
                    O.meta && /* @__PURE__ */ g.jsx("div", { className: "rts-meta", children: O.meta }),
                    F && /* @__PURE__ */ g.jsxs("div", { className: "rts-lane-controls", children: [
                      dt && /* @__PURE__ */ g.jsxs("label", { children: [
                        "View ",
                        /* @__PURE__ */ g.jsxs(
                          "select",
                          {
                            "aria-label": `View for ${Me}`,
                            value: te,
                            onChange: (ve) => vt((ha) => ({ ...ha, [O.id]: ve.target.value })),
                            children: [
                              /* @__PURE__ */ g.jsx("option", { value: "waveform", disabled: !dt.waveform, children: "Waveform" }),
                              /* @__PURE__ */ g.jsx("option", { value: "spectrogram", disabled: !dt.spectrogram, children: "Spectrogram" }),
                              /* @__PURE__ */ g.jsx("option", { value: "both", disabled: !dt.waveform || !dt.spectrogram, children: "Both" })
                            ]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ g.jsxs("label", { children: [
                        "Height ",
                        /* @__PURE__ */ g.jsx(
                          "input",
                          {
                            type: "range",
                            min: $0,
                            max: F0,
                            step: "1",
                            "aria-label": `Height for ${Me}`,
                            value: ze,
                            onChange: (ve) => ot((ha) => ({ ...ha, [O.id]: Ru(Number(ve.target.value)) }))
                          }
                        ),
                        /* @__PURE__ */ g.jsxs("output", { children: [
                          ze,
                          "px"
                        ] })
                      ] }),
                      /* @__PURE__ */ g.jsx(
                        "button",
                        {
                          type: "button",
                          className: "rts-height-reset",
                          "aria-label": `Reset height for ${Me}`,
                          onClick: () => ot((ve) => ({ ...ve, [O.id]: Ru(O.height) })),
                          children: "Reset height"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ g.jsx("div", { className: "rts-track", children: dt ? /* @__PURE__ */ g.jsx(zg, { content: dt, duration: rt, view: te }) : /* @__PURE__ */ g.jsx(to, { content: nt, duration: rt }) })
                ]
              },
              O.id
            );
          }) }),
          H.length > 0 && /* @__PURE__ */ g.jsx("div", { className: "rts-grid", "aria-hidden": "true", children: H.map((O, nt) => /* @__PURE__ */ g.jsx("span", { className: `rts-grid-line ${O.emphasis ? "rts-grid-line-emphasis" : ""} ${O.className ?? ""}`, style: { left: `${O.time * G}px` } }, `${O.time}-${nt}`)) }),
          /* @__PURE__ */ g.jsx("div", { className: "rts-playhead", style: { left: `${j + Z * G}px` }, "aria-hidden": "true" })
        ] }) }) }),
        /* @__PURE__ */ g.jsxs("footer", { className: "rts-footer", children: [
          /* @__PURE__ */ g.jsxs("div", { children: [
            D,
            ct && /* @__PURE__ */ g.jsx("div", { className: "rts-navigation-help", children: "Wheel: time · Ctrl/⌘ + wheel: time zoom · Alt + wheel: channel height · Shift + wheel: channel scroll" })
          ] }),
          /* @__PURE__ */ g.jsxs("output", { className: "rts-window", children: [
            wa(be.start),
            " — ",
            wa(be.end)
          ] })
        ] })
      ]
    }
  );
}
const ks = /\.(wav|flac|mp3|ogg|opus|m4a|aif|aiff)$/i;
function Q0(c) {
  return c === "__source__" || c.startsWith("input/") ? "master" : c.startsWith("stems/") ? c.slice(6).replace(ks, "") : c.startsWith("speech/") && ks.test(c) ? c.replace(ks, "") : null;
}
function xg(c) {
  const r = /* @__PURE__ */ new Map(), f = [], o = /* @__PURE__ */ new Map();
  for (const h of c) for (const z of Array.isArray(h.sourceMap) ? h.sourceMap : [])
    if (typeof z?.audio == "string" && typeof z.data == "string") {
      const M = Q0(z.audio.replace(/\\/g, "/"));
      M && (o.set(z.data.replace(/\\/g, "/"), M), typeof z.png == "string" && o.set(z.png.replace(/\\/g, "/"), M));
    }
  const E = (h) => (r.has(h) || r.set(h, { key: h }), r.get(h));
  for (const h of c) {
    const z = (h.id?.replace(/^file:/, "") || "").replace(/\\/g, "/"), M = Q0(z), H = z.startsWith("spectrograms/") ? o.get(z) || z.slice(13).replace(/\.(npz|png)$/i, "") : null;
    if (M && (h.content?.type === "waveform" || h.content?.type === "artifact")) {
      const q = E(M);
      (!q.audio || h.id === "__source__") && (q.audio = h);
    } else H && z.endsWith(".npz") && h.content?.type === "image" ? E(H).spectrum = h : H && z.endsWith(".png") && h.content?.type === "image" ? E(H).png = h : f.push(h);
  }
  for (const h of r.values()) {
    if (!h.audio && !h.spectrum) {
      h.png && f.push(h.png);
      continue;
    }
    const z = h.audio || h.spectrum, M = h.audio?.content?.type === "waveform" ? h.audio.content : null, H = h.audio?.content?.type === "artifact" ? h.audio.content.note : null;
    f.push({
      ...z,
      id: h.key === "master" ? "__source__" : `audio:${h.key}`,
      title: h.key === "master" ? "MASTER · uploaded source" : h.key.replace(/\//g, " · ").replace(/_/g, " "),
      kind: "audio",
      height: 160,
      meta: H || (M && h.spectrum ? "waveform + aligned spectrogram" : M ? "waveform · spectrogram pending" : "spectrogram · waveform pending"),
      content: {
        type: "audio",
        view: "both",
        waveform: M ? { min: M.min, max: M.max, colour: M.colour } : void 0,
        spectrogram: h.spectrum ? { src: h.spectrum.content.src, alt: h.spectrum.content.alt } : void 0
      }
    }), !h.spectrum && h.png && f.push(h.png);
  }
  return f;
}
const eo = (c) => typeof c == "number" && Number.isFinite(c) && c > 0, Dg = { canonical: "Canonical", combined: "Consensus · observed tempo", combined_family: "Consensus · canonical tempo family", combined_fit: "Consensus · fitted constant grid" };
function V0(c, r, f, o) {
  if (!eo(c) || !Number.isFinite(r) || r < 0 || !Number.isFinite(f) || f <= 0) return [];
  const E = Math.max(0, Math.floor((f - r) * c / 60 + 1e-9) + 1), h = Math.max(1, Math.ceil(E / 25e3));
  return Array.from({ length: Math.ceil(E / h) }, (z, M) => {
    const H = M * h;
    return {
      time: r + H * 60 / c,
      emphasis: H === 0,
      label: `${o === "original" ? "Original" : "Aligned"} beat ${H + 1}${H === 0 && o === "aligned" ? " · pip 0" : ""}`,
      className: `stemlab-grid-${o}`
    };
  });
}
function jg(c, r, f, o = "canonical", E = "consensus") {
  const h = c?.schema === "stemlab.beat-offsets.v1" && c.pips_per_beat === 64;
  let z = h ? (c.bpm_bases || []).filter((w) => w.status === "available" && eo(w.bpm)) : [];
  !z.length && eo(r) && (z = [{ id: "canonical", bpm: r }]);
  const M = z.find((w) => w.id === o) || z.find((w) => w.id === "combined_fit") || z[0] || null, H = h ? (c.analyses || []).filter((w) => w.status === "available") : [], q = H.find((w) => w.analysis_id === E) || H.find((w) => w.kind === "consensus") || H[0] || null, D = M && q ? c.comparisons?.find((w) => w.status === "available" && w.bpm_basis === M.id && w.analysis_id === q.analysis_id) : null, m = M ? V0(M.bpm, 0, f, "original") : [], j = D && Number.isFinite(D.beat_zero_seconds) ? V0(D.bpm, D.beat_zero_seconds, f, "aligned") : [];
  return {
    bases: z.map((w) => ({ ...w, label: `${Dg[w.id] || w.id}${w.multiplier ? ` ×${w.multiplier}` : ""} · ${w.bpm.toFixed(4)} BPM` })),
    basis: M,
    analysis: q,
    analyses: H,
    row: D,
    original: m,
    aligned: j,
    thinned: !!M && Math.floor(f * M.bpm / 60) + 1 > 25e3,
    grid: [...m, ...j].sort((w, F) => w.time - F.time)
  };
}
function Rg({ comparison: c, onBasis: r, onAnalysis: f }) {
  const { bases: o, basis: E, analyses: h, analysis: z, row: M, thinned: H } = c;
  return /* @__PURE__ */ g.jsxs("section", { className: "stemlab-beat-offset-controls", "aria-label": "BPM grid comparison", children: [
    /* @__PURE__ */ g.jsxs("div", { className: "stemlab-beat-offset-selectors", children: [
      /* @__PURE__ */ g.jsxs("label", { children: [
        "BPM grid ",
        /* @__PURE__ */ g.jsxs("select", { "aria-label": "BPM grid basis", value: E?.id || "", onChange: (q) => r(q.target.value), disabled: !o.length, children: [
          !o.length && /* @__PURE__ */ g.jsx("option", { value: "", children: "BPM unavailable" }),
          o.map((q) => /* @__PURE__ */ g.jsx("option", { value: q.id, children: q.label }, q.id))
        ] })
      ] }),
      /* @__PURE__ */ g.jsxs("label", { children: [
        "First beat from ",
        /* @__PURE__ */ g.jsxs("select", { "aria-label": "First beat analysis", value: z?.analysis_id || "", onChange: (q) => f(q.target.value), disabled: !h.length, children: [
          !h.length && /* @__PURE__ */ g.jsx("option", { value: "", children: "Detected beat unavailable" }),
          h.map((q) => /* @__PURE__ */ g.jsx("option", { value: q.analysis_id, children: q.analysis_id }, q.analysis_id))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ g.jsxs("p", { className: "stemlab-grid-legend", children: [
      /* @__PURE__ */ g.jsx("span", { className: "stemlab-legend-original", children: "Original grid · source time 0" }),
      /* @__PURE__ */ g.jsx("span", { className: "stemlab-legend-aligned", children: "Offset grid · detected first beat = pip 0" })
    ] }),
    /* @__PURE__ */ g.jsx("output", { "aria-live": "polite", "data-testid": "beat-offset-value", children: M ? `${M.offset_pips.toFixed(6)} pips · first detected beat ${M.first_beat_seconds.toFixed(6)}s · nearest whole offset ${M.integer_offset_pips} pips (${(M.integer_residual_seconds * 1e3).toFixed(3)} ms residual)` : "Waiting for usable beat evidence; no aligned grid is inferred." }),
    z?.constant_grid_fit && /* @__PURE__ */ g.jsxs("p", { className: "small", children: [
      "Selected detector fit: ",
      z.constant_grid_fit.proposed_bpm.toFixed(4),
      " BPM · 95% beat error ",
      z.constant_grid_fit.p95_absolute_beat_error_ms.toFixed(3),
      " ms · grade ",
      z.constant_grid_fit.precision_grade,
      ".",
      E?.fit ? ` Consensus grid fit grade: ${E.fit.precision_grade}.` : ""
    ] }),
    /* @__PURE__ */ g.jsxs("p", { className: "small", children: [
      "Half- and double-time readings are normal. Observed beats stay in their own lanes; tempo-family options compare ×½ / ×1 / ×2 interpretations. Constant grids and detector phases remain estimates.",
      H ? " Dense grids are thinned for display only." : ""
    ] })
  ] });
}
const Ug = "stemlab.beat-timeline.v1", Hu = 64, Nl = (c) => Number.isSafeInteger(c);
function oc(c) {
  if (!c || c.schema !== Ug || c.pips_per_beat !== Hu || !Number.isSafeInteger(c.source_audio?.sample_rate) || c.source_audio.sample_rate < 1 || !Number.isSafeInteger(c.source_audio?.num_frames) || c.source_audio.num_frames < 2 || !/^[0-9a-f]{64}$/.test(c.source_audio?.sha256 || "") || !/^[0-9a-f]{64}$/.test(c.consensus_sha256 || "") || !Array.isArray(c.beats) || c.beats.length < 2 || c.beats.length > 25e3 || !Nl(c.origin_beat)) throw new Error("Not a valid source-bound StemLab beat timeline");
  const r = { beat: -1, frame: -1 };
  for (const f of c.beats) {
    if (!Nl(f.beat) || !Nl(f.frame) || f.beat <= r.beat || f.frame <= r.frame || f.frame >= c.source_audio.num_frames || !["consensus", "corrected", "manual"].includes(f.source) || f.reference_frame !== null && (!Nl(f.reference_frame) || f.reference_frame < 0 || f.reference_frame >= c.source_audio.num_frames) || f.source === "consensus" && f.frame !== f.reference_frame || f.source === "manual" && f.reference_frame !== null)
      throw new Error("Beat indices and source sample frames must increase; original consensus timestamps stay immutable");
    r.beat = f.beat, r.frame = f.frame;
  }
  if (!c.beats.some((f) => f.beat === c.origin_beat)) throw new Error("Beat 1 must identify a real anchor");
  return c;
}
const Xa = (c) => ({ ...c, beats: c.beats.map((r) => ({ ...r })) }), Qa = (c) => oc(c), Hg = (c, r) => c.beats[r].frame / c.source_audio.sample_rate, Bn = (c, r) => r < 0 || r + 1 >= c.beats.length ? null : 60 * c.source_audio.sample_rate * (c.beats[r + 1].beat - c.beats[r].beat) / (c.beats[r + 1].frame - c.beats[r].frame), th = (c, r) => Math.round(r * c.source_audio.sample_rate);
function Z0(c, r, f) {
  const o = Xa(c);
  if (!Nl(r) || r < 0 || r >= o.beats.length) throw new Error("Select a beat");
  const E = th(o, f), h = o.beats[r - 1]?.frame ?? -1, z = o.beats[r + 1]?.frame ?? o.source_audio.num_frames;
  if (!Nl(E) || E <= h || E >= z) throw new Error("Beat must remain between its neighbours");
  const M = o.beats[r];
  return M.frame = E, M.source = E === M.reference_frame ? "consensus" : M.reference_frame === null ? "manual" : "corrected", Qa(o);
}
function Bg(c, r, f) {
  if (!Number.isFinite(f) || f <= 0 || f > 1200) throw new Error("BPM must be 0..1200");
  const o = Xa(c);
  if (!Nl(r) || r < 0 || r + 1 >= o.beats.length) throw new Error("Choose an interval");
  const E = o.beats[r], h = o.beats[r + 1], z = Math.round(60 * (h.beat - E.beat) * o.source_audio.sample_rate / f);
  if (z < 1) throw new Error("BPM exceeds available sample precision");
  const M = E.frame + z - h.frame;
  for (let H = r + 1; H < o.beats.length; H++) {
    const q = o.beats[H];
    q.frame += M, q.source = q.reference_frame === null ? "manual" : q.frame === q.reference_frame ? "consensus" : "corrected";
  }
  return Qa(o);
}
function qg(c, r) {
  if (!Number.isFinite(r) || Math.abs(r) > 1e5) throw new Error("Phase shift is out of bounds");
  const f = Xa(c), o = Bn(f, 0), E = Math.round(r / Hu * (60 / o) * f.source_audio.sample_rate);
  for (const h of f.beats)
    h.frame += E, h.source = h.reference_frame === null ? "manual" : h.frame === h.reference_frame ? "consensus" : "corrected";
  return Qa(f);
}
function K0(c, r) {
  const f = Xa(c), o = th(f, r);
  if (!Nl(o) || o < 0 || o >= f.source_audio.num_frames) throw new Error("Beat outside source");
  let E = f.beats.findIndex((q) => q.frame > o);
  if (E < 0 && (E = f.beats.length), E === 0 || E === f.beats.length || f.beats[E - 1].frame === o)
    throw new Error("Insert between two existing anchors; use the timeline selection to move end beats");
  const h = f.beats[E - 1], z = f.beats[E], M = z.beat - h.beat > 1, H = h.beat + 1;
  if (!M) {
    f.origin_beat >= z.beat && (f.origin_beat += 1);
    for (let q = E; q < f.beats.length; q++) f.beats[q].beat += 1;
  }
  return f.beats.splice(E, 0, { beat: H, frame: o, source: "manual", reference_frame: null }), Qa(f);
}
function Yg(c, r) {
  const f = Xa(c);
  if (!Nl(r) || r < 0 || r >= f.beats.length || f.beats.length <= 2)
    throw new Error("Keep at least two beat anchors");
  const [o] = f.beats.splice(r, 1);
  return o.beat === f.origin_beat && (f.origin_beat = f.beats[Math.min(r, f.beats.length - 1)].beat), Qa(f);
}
function wg(c, r) {
  const f = Xa(c);
  if (!Nl(r) || r < 0 || r >= f.beats.length) throw new Error("Select Beat 1");
  return f.origin_beat = f.beats[r].beat, Qa(f);
}
function Lg(c) {
  const r = Xa(c);
  for (const f of r.beats) f.reference_frame !== null && (f.frame = f.reference_frame, f.source = "consensus");
  return Qa(r);
}
function Gg(c) {
  const r = Bn(c, 0), f = c.beats.find((o) => o.beat === c.origin_beat);
  return c.beats.map((o) => ({
    time: o.frame / c.source_audio.sample_rate,
    value: Hu * (o.beat - c.origin_beat) - (o.frame - f.frame) * r * Hu / (c.source_audio.sample_rate * 60)
  }));
}
function Xg(c, r, f = 3e3) {
  if (!c?.beats?.length) return [];
  const o = c.source_audio.sample_rate, E = Number.isFinite(r?.start) ? r.start : 0, h = Number.isFinite(r?.end) && r.end > E ? r.end : Number.MAX_VALUE, z = c.beats.filter((H) => H.frame / o >= E - 0.05 && H.frame / o <= h + 0.05), M = Math.max(1, Math.ceil(z.length / f));
  return z.filter((H, q) => q % M === 0).map((H) => ({
    time: H.frame / o,
    emphasis: H.beat === c.origin_beat,
    label: `Corrected beat ${H.beat} · native pip ${(H.beat - c.origin_beat) * Hu}`,
    className: "stemlab-grid-corrected"
  }));
}
const Uu = 20, lo = 400, eh = (c, r, f) => Math.max(r, Math.min(f, c)), J0 = (c) => 100 * (1 - Math.log(eh(c, Uu, lo) / Uu) / Math.log(lo / Uu)), Qg = (c, r) => Uu * (lo / Uu) ** eh(1 - (c - r.top) / r.height, 0, 1);
async function Ws(c, r = "GET", f) {
  const o = await fetch(
    `/api/${c}/beat-timeline${r === "POST" ? "/preview" : ""}`,
    { method: r, headers: { "Content-Type": "application/json" }, body: f === void 0 ? void 0 : JSON.stringify(f), cache: "no-store" }
  ), E = await o.json().catch(() => ({}));
  if (!o.ok) throw new Error(E.detail || `Beat timeline HTTP ${o.status}`);
  return E;
}
function Vg({ map: c, duration: r, visible: f, selected: o, onSelect: E, onEdit: h, onInsert: z }) {
  const M = c.source_audio.sample_rate, q = c.beats.map((m, j) => ({ row: m, i: j })).filter(({ row: m }) => {
    const j = m.frame / M;
    return j >= f.start - 0.1 && j <= f.end + 0.1;
  }), D = Math.max(1, Math.ceil(q.length / 2e3));
  return /* @__PURE__ */ g.jsx(
    "div",
    {
      className: "stemlab-beatmap-track",
      "aria-label": "Editable sample-accurate beat anchors",
      onDoubleClick: (m) => {
        if (m.target !== m.currentTarget) return;
        const j = m.currentTarget.getBoundingClientRect();
        z((m.clientX - j.left) / j.width * r), m.stopPropagation();
      },
      children: q.filter((m, j) => j % D === 0).map(({ row: m, i: j }) => /* @__PURE__ */ g.jsx(
        "button",
        {
          type: "button",
          className: `stemlab-beatmap-anchor ${m.source} ${o === j ? "selected" : ""} ${m.beat === c.origin_beat ? "origin" : ""}`,
          "aria-label": `Beat ${m.beat}, ${Hg(c, j).toFixed(6)} seconds, ${m.source}; drag or use arrow keys`,
          "aria-pressed": o === j,
          title: `Beat ${m.beat}: frame ${m.frame} · ${(m.frame / M).toFixed(6)} s · ${m.source}${m.reference_frame === null ? "" : ` · reference ${m.reference_frame}`}`,
          style: { left: `${m.frame / (M * Math.max(r, 1e-9)) * 100}%` },
          onPointerDown: (w) => {
            w.currentTarget.setPointerCapture(w.pointerId), E(j), w.stopPropagation();
          },
          onPointerMove: (w) => {
            if (!w.currentTarget.hasPointerCapture(w.pointerId)) return;
            const F = w.currentTarget.parentElement.getBoundingClientRect();
            h(j, (w.clientX - F.left) / F.width * r), w.stopPropagation();
          },
          onPointerUp: (w) => {
            w.currentTarget.releasePointerCapture(w.pointerId), w.stopPropagation();
          },
          onClick: (w) => {
            E(j), w.stopPropagation();
          },
          onKeyDown: (w) => {
            if (w.key !== "ArrowLeft" && w.key !== "ArrowRight") return;
            w.preventDefault(), w.stopPropagation();
            const F = w.shiftKey ? Math.max(1, Math.round(M / 1e3)) : 1;
            h(j, (m.frame + (w.key === "ArrowLeft" ? -F : F)) / M);
          },
          children: /* @__PURE__ */ g.jsx("span", { children: m.beat === c.origin_beat ? "1" : "" })
        },
        m.beat
      ))
    }
  );
}
function Zg({ map: c, duration: r, visible: f, selected: o, onSelect: E, onTempo: h }) {
  const z = c.source_audio.sample_rate, M = c.beats.slice(0, -1).map((D, m) => ({
    i: m,
    start: D.frame / z,
    end: c.beats[m + 1].frame / z,
    bpm: Bn(c, m)
  })).filter((D) => D.end >= f.start && D.start <= f.end), H = Math.max(1, Math.ceil(M.length / 1800)), q = M.filter((D, m) => m % H === 0);
  return /* @__PURE__ */ g.jsxs("div", { className: "stemlab-beatmap-tempo", "aria-label": "Editable local BPM envelope", children: [
    /* @__PURE__ */ g.jsx("svg", { className: "stemlab-beatmap-tempo-line", viewBox: "0 0 1000 100", preserveAspectRatio: "none", "aria-hidden": "true", children: /* @__PURE__ */ g.jsx(
      "polyline",
      {
        points: q.map((D) => `${(D.start + D.end) / 2 / Math.max(r, 1e-9) * 1e3},${J0(D.bpm)}`).join(" "),
        fill: "none",
        stroke: "#f4d76e",
        strokeWidth: "1.5",
        vectorEffect: "non-scaling-stroke"
      }
    ) }),
    /* @__PURE__ */ g.jsxs("div", { className: "stemlab-beatmap-extent", "aria-hidden": "true", children: [
      "400 BPM",
      /* @__PURE__ */ g.jsx("br", {}),
      "20 BPM"
    ] }),
    q.map((D) => /* @__PURE__ */ g.jsx(
      "button",
      {
        type: "button",
        className: `stemlab-beatmap-tempo-node ${o === D.i ? "selected" : ""}`,
        style: { left: `${(D.start + D.end) / 2 / Math.max(r, 1e-9) * 100}%`, top: `${J0(D.bpm)}%` },
        title: `Interval ${D.i} → ${D.i + 1}: ${D.bpm.toFixed(3)} BPM · drag vertically to change local tempo`,
        "aria-label": `BPM envelope interval ${D.i}: ${D.bpm.toFixed(3)} BPM`,
        "aria-pressed": o === D.i,
        onPointerDown: (m) => {
          m.currentTarget.setPointerCapture(m.pointerId), E(D.i), m.stopPropagation();
        },
        onPointerMove: (m) => {
          if (!m.currentTarget.hasPointerCapture(m.pointerId)) return;
          const j = m.currentTarget.parentElement.getBoundingClientRect();
          h(D.i, Qg(m.clientY, j)), m.stopPropagation();
        },
        onPointerUp: (m) => {
          m.currentTarget.releasePointerCapture(m.pointerId), m.stopPropagation();
        },
        onClick: (m) => {
          E(D.i), m.stopPropagation();
        },
        onKeyDown: (m) => {
          m.key !== "ArrowUp" && m.key !== "ArrowDown" || (m.preventDefault(), m.stopPropagation(), h(D.i, Math.max(0.01, D.bpm + (m.key === "ArrowUp" ? 1 : -1) * (m.shiftKey ? 0.01 : 1))));
        },
        children: D.bpm.toFixed(1)
      },
      D.i
    ))
  ] });
}
function Kg(c, r) {
  const [f, o] = Y.useState(null), [E, h] = Y.useState(!1), [z, M] = Y.useState(null), [H, q] = Y.useState(!1), [D, m] = Y.useState(!1), [j, w] = Y.useState(!0), [F, ct] = Y.useState(0), [ut, zt] = Y.useState({ start: 0, end: 1 / 0 }), [Tt, Mt] = Y.useState(!1), [Lt, Ot] = Y.useState(!0), [Bt, I] = Y.useState(""), [P, rt] = Y.useState("0"), [et, tt] = Y.useState(""), [bt, qt] = Y.useState(!1), [$t, V] = Y.useState([]), [x, U] = Y.useState([]), Z = Y.useRef(null), ht = Y.useRef(0), it = Y.useRef(null);
  it.current = f;
  const ue = Y.useCallback(async (B = !1) => {
    if (!(H && !B && !window.confirm("Discard unsaved beat edits and reload the saved map?")))
      try {
        const G = await Ws(c);
        if (!G.available) {
          m(!1);
          return;
        }
        oc(G.map), o(G.map), m(!0), h(G.saved), M(G.revision), q(!1), V([]), U([]), ct(0), I(Bn(G.map, 0)?.toFixed(3) || ""), tt(G.saved ? "Loaded saved beat corrections" : "Prepared an editable proposal at exact consensus sample frames");
      } catch (G) {
        G.message.includes("HTTP 404") && !it.current ? w(!1) : tt(G.message);
      }
  }, [c, H]);
  Y.useEffect(() => {
    let B = !0;
    const G = async () => {
      B && await ue(!0);
    };
    G();
    const xt = window.setInterval(() => {
      B && !it.current && G();
    }, 5e3);
    return () => {
      B = !1, window.clearInterval(xt);
    };
  }, [c]);
  const Qt = Y.useCallback((B) => {
    try {
      const G = it.current;
      if (!G) return;
      const xt = B(G);
      G.review_status === "artist_confirmed" && xt.review_status === "artist_confirmed" && (xt.beats !== G.beats || xt.origin_beat !== G.origin_beat) && (xt.review_status = "estimated"), oc(xt), o(xt), q(!0), V((me) => [...me.slice(-59), G]), U([]), tt("Unsaved beat-map edits · original consensus unchanged");
    } catch (G) {
      tt(G.message);
    }
  }, []), Re = () => {
    $t.length && (U((B) => [...B.slice(-59), f]), o($t.at(-1)), V((B) => B.slice(0, -1)), q(!0));
  }, y = () => {
    x.length && (V((B) => [...B.slice(-59), f]), o(x.at(-1)), U((B) => B.slice(0, -1)), q(!0));
  }, R = (B) => {
    ct(B), I(Bn(it.current, B)?.toFixed(3) || "");
  }, J = async (B) => {
    const G = await Ws(c, "POST", B);
    return oc(G), G;
  }, $ = async () => {
    if (f) {
      qt(!0);
      try {
        const B = await Ws(c, "PUT", { map: f, expected_revision: z });
        o(B.map), h(!0), M(B.revision), q(!1), V([]), U([]), tt("Beat corrections saved separately from the consensus detections");
      } catch (B) {
        tt(B.message);
      } finally {
        qt(!1);
      }
    }
  }, ot = async (B) => {
    if (f) {
      qt(!0);
      try {
        const G = await J(f), xt = JSON.stringify(G, null, 2);
        if (B === "copy")
          await navigator.clipboard.writeText(xt), tt("Copied one complete beat-timeline JSON value with Beat 1 and pip phase synchronisation");
        else {
          const me = new Blob([xt + `
`], { type: "application/json" }), Ne = URL.createObjectURL(me), Ke = document.createElement("a");
          Ke.href = Ne, Ke.download = `stemlab-beat-timeline-${c.slice(0, 12)}.json`, document.body.appendChild(Ke), Ke.click(), Ke.remove(), URL.revokeObjectURL(Ne), tt("Exported a single source-bound beat-timeline JSON file");
        }
      } catch (G) {
        tt(G.message);
      } finally {
        qt(!1);
      }
    }
  }, pt = async (B) => {
    const G = B.target.files?.[0];
    if (B.target.value = "", !!G) {
      if (G.size > 32 * 1024 * 1024) {
        tt("Import limited to 32 MiB");
        return;
      }
      qt(!0);
      try {
        const xt = JSON.parse(await G.text()), me = await J(xt);
        o(me), q(!0), V((Ne) => f ? [...Ne.slice(-59), f] : Ne), U([]), tt("Imported and validated: review changes before saving. Original consensus unchanged.");
      } catch (xt) {
        tt(xt.message);
      } finally {
        qt(!1);
      }
    }
  }, vt = (B, G) => Qt((xt) => Bg(xt, B, G)), X = () => Qt((B) => Lg(B)), W = f && Tt && r > 0 ? [
    {
      id: "corrected:anchors",
      title: "Corrected beats",
      kind: "beatmap",
      height: 80,
      meta: "Drag to place · arrows: 1 sample · Shift: 1 ms · double-click empty space to insert",
      content: { type: "custom", node: /* @__PURE__ */ g.jsx(
        Vg,
        {
          map: f,
          duration: r,
          visible: ut,
          selected: F,
          onSelect: R,
          onEdit: (B, G) => Qt((xt) => Z0(xt, B, G)),
          onInsert: (B) => Qt((G) => K0(G, B))
        }
      ) }
    },
    {
      id: "corrected:tempo",
      title: "BPM envelope",
      kind: "beatmap",
      height: 110,
      meta: "Actual interval tempo · drag vertically to change BPM (later beats follow)",
      content: { type: "custom", node: /* @__PURE__ */ g.jsx(
        Zg,
        {
          map: f,
          duration: r,
          visible: ut,
          selected: F,
          onSelect: R,
          onTempo: vt
        }
      ) }
    },
    {
      id: "corrected:phase",
      title: "Phase CV",
      kind: "beatmap",
      height: 80,
      meta: "Relative pips vs the opening tempo · visible irregular drift",
      content: { type: "curve", points: Gg(f).filter((B, G) => G % Math.max(1, Math.ceil(f.beats.length / 4e3)) === 0), colour: "#ecb7fd" }
    }
  ] : [], Ee = f && Lt ? Xg(f, ut) : [], Ze = f?.beats?.[Math.min(F, f.beats.length - 1)], ol = f?.source_audio?.sample_rate || 1, be = f && F < f.beats.length - 1 ? Bn(f, F) : null, Kt = /* @__PURE__ */ g.jsxs("section", { className: "stemlab-beatmap-panel", "aria-label": "Editable variable tempo and Beat 1 phase", children: [
    /* @__PURE__ */ g.jsxs("header", { children: [
      /* @__PURE__ */ g.jsx("strong", { children: "Beat correction · variable BPM & phase" }),
      f && /* @__PURE__ */ g.jsxs("span", { children: [
        f.beats.length.toLocaleString(),
        " anchors · ",
        E ? "saved" : "consensus draft",
        H ? " · unsaved changes" : ""
      ] }),
      /* @__PURE__ */ g.jsx("button", { type: "button", onClick: () => Mt((B) => !B), children: Tt ? "Hide editor" : "Show editor" })
    ] }),
    Tt && f && /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
      /* @__PURE__ */ g.jsx("p", { children: "Default = exact saved consensus beat placements. Change individual source-frame anchors, drag BPM envelope nodes, or shift global phase. This does not modify detector evidence or source audio." }),
      /* @__PURE__ */ g.jsxs("div", { className: "stemlab-beatmap-fields", children: [
        /* @__PURE__ */ g.jsxs("label", { children: [
          "Selected beat # ",
          /* @__PURE__ */ g.jsx(
            "input",
            {
              "aria-label": "Selected beat number",
              type: "number",
              min: "0",
              step: "1",
              value: Ze?.beat ?? 0,
              onChange: (B) => {
                const G = f.beats.findIndex((xt) => xt.beat === Number(B.target.value));
                G >= 0 && R(G);
              }
            }
          )
        ] }),
        /* @__PURE__ */ g.jsxs("output", { children: [
          "Frame ",
          Ze?.frame ?? 0,
          " · ",
          Ze ? (Ze.frame / ol).toFixed(6) : "0",
          "s"
        ] }),
        /* @__PURE__ */ g.jsxs("label", { children: [
          "Local BPM ",
          /* @__PURE__ */ g.jsx(
            "input",
            {
              "aria-label": "Selected interval BPM",
              type: "number",
              min: "0.01",
              max: "1200",
              step: "0.001",
              value: Bt,
              onChange: (B) => I(B.target.value),
              onKeyDown: (B) => {
                B.key === "Enter" && vt(F, Number(Bt));
              }
            }
          )
        ] }),
        /* @__PURE__ */ g.jsx("button", { type: "button", disabled: F >= f.beats.length - 1, onClick: () => vt(F, Number(Bt)), children: "Apply BPM" }),
        /* @__PURE__ */ g.jsxs("label", { children: [
          "Phase shift (pips) ",
          /* @__PURE__ */ g.jsx(
            "input",
            {
              "aria-label": "Global phase shift pips",
              type: "number",
              step: "0.25",
              value: P,
              onChange: (B) => rt(B.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ g.jsx("button", { type: "button", onClick: () => Qt((B) => qg(B, Number(P))), children: "Shift all beats" })
      ] }),
      /* @__PURE__ */ g.jsxs("div", { className: "stemlab-beatmap-actions", children: [
        /* @__PURE__ */ g.jsx("button", { type: "button", onClick: () => Qt((B) => Z0(B, F, ht.current)), children: "Place selected at playhead" }),
        /* @__PURE__ */ g.jsx("button", { type: "button", onClick: () => Qt((B) => K0(B, ht.current)), children: "Insert at playhead" }),
        /* @__PURE__ */ g.jsx("button", { type: "button", onClick: () => Qt((B) => wg(B, F)), children: "Set selected as Beat 1" }),
        /* @__PURE__ */ g.jsx("button", { type: "button", onClick: () => Qt((B) => Yg(B, F)), children: "Delete selected" }),
        /* @__PURE__ */ g.jsx("button", { type: "button", disabled: !$t.length, onClick: Re, children: "Undo" }),
        /* @__PURE__ */ g.jsx("button", { type: "button", disabled: !x.length, onClick: y, children: "Redo" }),
        /* @__PURE__ */ g.jsx("button", { type: "button", onClick: X, children: "Match consensus beats" }),
        /* @__PURE__ */ g.jsxs("label", { children: [
          /* @__PURE__ */ g.jsx("input", { type: "checkbox", checked: Lt, onChange: (B) => Ot(B.target.checked) }),
          "Corrected grid"
        ] }),
        /* @__PURE__ */ g.jsxs("label", { children: [
          /* @__PURE__ */ g.jsx(
            "input",
            {
              type: "checkbox",
              checked: f.review_status === "artist_confirmed",
              onChange: (B) => Qt((G) => ({ ...G, review_status: B.target.checked ? "artist_confirmed" : "estimated" }))
            }
          ),
          "Artist-reviewed Beat 1 / phase"
        ] })
      ] }),
      /* @__PURE__ */ g.jsxs("div", { className: "stemlab-beatmap-export", children: [
        /* @__PURE__ */ g.jsx("button", { type: "button", disabled: bt || !H, onClick: $, children: "Save corrections" }),
        /* @__PURE__ */ g.jsx("button", { type: "button", disabled: bt, onClick: () => ot("download"), children: "Export Beat 1 + full beat timeline JSON" }),
        /* @__PURE__ */ g.jsx("button", { type: "button", disabled: bt, onClick: () => ot("copy"), children: "Copy JSON value" }),
        /* @__PURE__ */ g.jsx("button", { type: "button", disabled: bt, onClick: () => Z.current?.click(), children: "Import JSON" }),
        /* @__PURE__ */ g.jsx("input", { ref: Z, type: "file", accept: ".json,application/json", hidden: !0, onChange: pt }),
        /* @__PURE__ */ g.jsx("button", { type: "button", onClick: () => ue(), children: "Reload saved/consensus" })
      ] }),
      /* @__PURE__ */ g.jsxs("small", { children: [
        "Current local BPM: ",
        be?.toFixed(3) ?? "last anchor",
        " · original consensus matches remain labelled separately. Native timebase: 64 pips/beat, imported DanceMoves clocks use 16 ticks/beat. Existing DanceMoves beat-alignment.v1 is constant-tempo only; a beat-timeline.v1 consumer update is required for irregular timing."
      ] })
    ] }),
    !D && Tt && /* @__PURE__ */ g.jsx("p", { children: "Waiting for an available consensus beat list (and exact master audio). No timing is invented." }),
    et && /* @__PURE__ */ g.jsx("output", { role: "status", className: "stemlab-beatmap-status", children: et })
  ] });
  return {
    lanes: W,
    grid: Ee,
    panel: j ? Kt : null,
    onWindowChange: zt,
    onTimeChange: (B) => {
      ht.current = B;
    }
  };
}
function Jg(c, r) {
  if (!c || c.schema !== "stemlab.loops.v1") return [];
  const f = c.sample_rate;
  return !Number.isSafeInteger(f) || f <= 0 ? [] : (c.loops || []).flatMap((o) => {
    if (!/^(verse|chorus)-\d+-\d+$/.test(o.id) || !Number.isSafeInteger(o.start_sample) || !Number.isSafeInteger(o.end_sample) || o.start_sample < 0 || o.end_sample <= o.start_sample || o.end_sample > c.source_frames) return [];
    const E = encodeURIComponent(`${c.source_sha256}:${o.start_sample}:${o.end_sample}`);
    return [{
      id: o.id,
      label: `${o.section_label} · ${o.bars} bar${o.bars === 1 ? "" : "s"}`,
      startSample: o.start_sample,
      endSample: o.end_sample,
      sampleRate: f,
      // Exact native-rate PCM excerpt, computed read-only whether or not --export-loops was used.
      audioSrc: `/api/${r}/loops/${encodeURIComponent(o.id)}/audio?v=${E}`,
      downloadUrl: o.file && /^audio\/[a-zA-Z0-9._-]+\.wav$/.test(o.file) ? `/${r}/deep/loops/${o.file.split("/").map(encodeURIComponent).join("/")}` : void 0
    }];
  });
}
function $g(c) {
  const [r, f] = Y.useState({ report: null, error: "" });
  Y.useEffect(() => {
    let E = !0, h, z = "";
    const M = new AbortController();
    f({ report: null, error: "" });
    const H = async () => {
      try {
        const q = await fetch(`/${c}/deep/loops/loops.json`, {
          cache: "no-store",
          signal: M.signal
        });
        if (!E) return;
        if (q.status === 404)
          z = "", f({ report: null, error: "" });
        else {
          if (!q.ok) throw new Error(`Loop report: HTTP ${q.status}`);
          const D = await q.json();
          if (D.schema === "stemlab.loop-availability.v1" && D.status === "not-analysed") {
            f({ report: null, error: "", note: D.reason });
            return;
          }
          if (D.schema !== "stemlab.loops.v1") throw new Error("Unsupported loop report schema");
          const m = JSON.stringify(D);
          E && m !== z && (f({ report: D, error: "" }), z = m);
        }
      } catch (q) {
        E && q.name !== "AbortError" && (z = "", f({ report: null, error: q.message }));
      } finally {
        E && (h = window.setTimeout(H, 2500));
      }
    };
    return H(), () => {
      E = !1, M.abort(), window.clearTimeout(h);
    };
  }, [c]);
  const o = Y.useMemo(() => Jg(r.report, c), [r.report, c]);
  return { ...r, loops: o };
}
function Fg({ state: c, hash: r }) {
  const f = c.report;
  return c.error ? /* @__PURE__ */ g.jsx("p", { role: "alert", className: "stemlab-loop-summary", children: c.error }) : c.note ? /* @__PURE__ */ g.jsx("p", { className: "stemlab-loop-summary", children: c.note }) : f ? /* @__PURE__ */ g.jsxs("details", { className: "stemlab-loop-summary", open: f.unresolved_sections.length > 0, children: [
    /* @__PURE__ */ g.jsxs("summary", { children: [
      f.loop_count,
      " loop(s) · ",
      f.unresolved_sections.length,
      " unresolved section(s) · ",
      /* @__PURE__ */ g.jsx("a", { href: `/${r}/deep/loops/loops.json`, target: "_blank", rel: "noopener", children: "Sample report" })
    ] }),
    /* @__PURE__ */ g.jsx("p", { children: "Choose a loop region or use the Loop selector, tick Enable loop, then press Play. Previewing writes no files." }),
    f.unresolved_sections.map((o) => /* @__PURE__ */ g.jsxs("p", { children: [
      /* @__PURE__ */ g.jsxs("strong", { children: [
        o.label,
        ":"
      ] }),
      " ",
      o.reason
    ] }, o.index))
  ] }) : /* @__PURE__ */ g.jsxs("p", { className: "stemlab-loop-summary", children: [
    "No loop report yet. New analyses discover loops automatically; for existing results run ",
    /* @__PURE__ */ g.jsx("code", { children: "stemlab loops RESULTS_DIR" }),
    "."
  ] });
}
const ge = (c) => document.querySelector(c), kg = ge("#uploadView"), io = ge("#timelineView"), Ga = ge("#dropZone"), Bu = ge("#fileInput"), lh = ge("#chooseButton"), ah = ge("#uploadProgressWrap"), rc = ge("#uploadProgress"), dc = ge("#uploadLabel"), Hn = ge("#connectionBadge"), nh = ge("#canonicalBpm"), uh = ge("#canonicalLyrics"), ih = ge("#canonicalTiming"), ao = ge("#knownInfoStatus"), Wg = ge("#loadArcadiansReference"), Ig = ge("#loadArcadiansHero"), Pg = Array.from(io.children), co = document.createElement("div");
co.id = "timelineRoot";
io.replaceChildren(co);
for (const c of Pg) c.remove();
const t1 = vg.createRoot(co), e1 = /* @__PURE__ */ new Set(["wav", "flac", "mp3", "ogg", "opus", "m4a", "aif", "aiff"]);
let no = {};
function l1(c) {
  const r = String(c).split("/").pop() || "", f = r.lastIndexOf(".");
  return f >= 0 ? r.slice(f + 1).toLowerCase() : "";
}
function El(c) {
  return String(c).replace(/^stems\//, "").replace(/^spectrograms\//, "").replace(/^vamp\/data\//, "Vamp · ").replace(/^beats\//, "Beats · ").replace(/^speech\//, "Speech · ").replace(/^deep\//, "Deep · ").replace(/[_-]+/g, " ");
}
function fo(c, r) {
  return `/${c}/${r.split("/").map(encodeURIComponent).join("/")}`;
}
function mc(c, r, f = "Generated analysis artifact") {
  return { type: "artifact", note: f, href: r === "__source__" ? `/api/${c}/source` : fo(c, r) };
}
async function ll(c, r) {
  const f = await fetch(fo(c, r), { cache: "no-store" });
  if (!f.ok) throw new Error(`HTTP ${f.status}`);
  return f.json();
}
function sl(c, r = 2, f = "") {
  const o = Number(c);
  return Number.isFinite(o) ? `${o.toFixed(r)}${f}` : "—";
}
function Ya(c, r, f, o, E = "feature") {
  const h = o.filter(([, z]) => z != null && z !== "");
  return {
    id: c,
    title: r,
    meta: f,
    kind: E,
    content: {
      type: "summary",
      items: (h.length ? h : [["status", "analysis available"]]).map(([z, M]) => ({ label: z, value: M }))
    }
  };
}
function hc(c) {
  return (c || []).flatMap((r) => {
    const f = Number(r.start);
    if (!Number.isFinite(f)) return [];
    const o = Number(r.end);
    return [{
      start: f,
      end: Number.isFinite(o) && o > f ? o : f + 0.5,
      label: r.label || r.text || r.values?.[0] || ""
    }];
  });
}
function a1(c) {
  const r = Array.isArray(c.events) ? c.events : [];
  switch (String(c.kind || "")) {
    case "curve":
      return { type: "curve", points: r.flatMap((f) => {
        const o = Number(f.start), E = Number(f.values?.[0]);
        return Number.isFinite(o) && Number.isFinite(E) && E > 0 ? [{ time: o, value: E }] : [];
      }) };
    case "matrix":
      return { type: "matrix", rows: r.map((f) => f.values || []).filter((f) => f.length) };
    case "notes":
      return { type: "notes", items: r.flatMap((f) => {
        const o = Number(f.values?.[0]), E = Number(f.start);
        if (!Number.isFinite(o) || o <= 0 || !Number.isFinite(E)) return [];
        const h = Number(f.end);
        return [{ start: E, end: Number.isFinite(h) && h > E ? h : E + 0.12, value: o, label: f.label }];
      }) };
    case "segments":
      return { type: "blocks", items: hc(r) };
    case "events":
      return { type: "markers", items: r.flatMap((f) => Number.isFinite(Number(f.start)) ? [{ time: Number(f.start) }] : []) };
    default:
      return { type: "artifact", note: r[0]?.label || r[0]?.values?.join(", ") || c.title || "analysis" };
  }
}
async function ch(c, r, f, o, E) {
  const h = new URLSearchParams({ path: E, points: "12000" }), z = await fetch(`/api/${c}/waveform?${h}`);
  if (!z.ok) return { id: r, title: f, meta: o, kind: "artifact", content: mc(c, E, `waveform unavailable (${z.status})`) };
  const M = await z.json();
  return { id: r, title: f, meta: o, kind: "waveform", content: { type: "waveform", min: M.min || [], max: M.max || [] }, duration: Number(M.duration_seconds) || 0 };
}
async function n1(c, r) {
  const f = r.path, o = `file:${f}`, E = l1(f);
  if (f === "canonical.json" || f.startsWith("deep/loops/")) return null;
  if (e1.has(E)) return ch(c, o, El(f), "audio waveform", f);
  if (f.startsWith("spectrograms/") && E === "npz") {
    const h = new URLSearchParams({ path: f, max_width: "8192", max_height: "768" });
    return { id: o, title: El(f), meta: "spectrogram data · exact song timeline", kind: "spectrogram", content: { type: "image", src: `/api/${c}/spectrogram?${h}`, alt: `${El(f)} spectrogram` } };
  }
  if (f.startsWith("spectrograms/") && E === "png")
    return { id: o, title: El(f), meta: "rendered spectrogram PNG", kind: "image", content: { type: "image", src: fo(c, f), alt: `${El(f)} rendered spectrogram` } };
  try {
    if (f === "analysis.json") {
      const h = await ll(c, f);
      return {
        id: o,
        title: El(f),
        meta: "analysis provenance",
        kind: "artifact",
        sourceMap: h.spectrograms || [],
        content: mc(c, f)
      };
    }
    if (f.startsWith("beats/") && E === "json") {
      const h = await ll(c, f), z = new Set((h.downbeats || []).map((M) => Number(M).toFixed(3)));
      return { id: o, title: El(f), meta: "beat / downbeat events", kind: "events", content: { type: "markers", items: (h.beats || []).flatMap((M) => {
        const H = Number(M);
        return Number.isFinite(H) ? [{ time: H, emphasis: z.has(H.toFixed(3)), label: z.has(H.toFixed(3)) ? "Downbeat" : "Beat" }] : [];
      }) } };
    }
    if (f.startsWith("vamp/data/") && E === "json") {
      const h = await ll(c, f);
      return { id: o, title: El(f), meta: "Vamp feature analysis", kind: "feature", content: a1(h) };
    }
    if (f === "speech/whisper.json") {
      const h = await ll(c, f);
      return { id: o, title: "Speech · Whisper words", meta: "word-aligned transcript", kind: "words", content: { type: "blocks", items: (h.words || []).flatMap((z) => {
        const M = Number(z.start), H = Number(z.end);
        return Number.isFinite(M) ? [{ start: M, end: Number.isFinite(H) ? Math.max(M + 0.03, H) : M + 0.03, label: String(z.word || "").trim() }] : [];
      }) } };
    }
    if (f === "deep/structure/structure.json" || f === "deep/song_map/song_map.json") {
      const h = await ll(c, f), z = f.includes("song_map");
      return { id: o, title: z ? "Deep · song map" : "Deep · functional structure", meta: z ? "section-level sonic / rhythm / harmony / lyric fusion" : "All-In-One · functional song sections", kind: "deep-structure", content: { type: "blocks", items: hc(z ? h.sections : h.segments) } };
    }
    if (f === "deep/harmony/harmony.json") {
      const h = await ll(c, f), z = h.chords?.collapsed_progression || [];
      return z.length ? { id: o, title: "Deep · harmony", meta: "collapsed chord progression + key evidence", kind: "deep-harmony", content: { type: "blocks", items: hc(z) } } : Ya(o, "Deep · harmony", "collapsed chord progression + key evidence", [["key", h.vamp_key || h.independent_key_candidates_from_nnls_chroma?.[0]?.key || "—"], ["tuning", h.tuning_hz ? `${Number(h.tuning_hz).toFixed(1)} Hz` : "—"]], "deep-harmony");
    }
    if (f === "deep/lyrics/lyrics.json") {
      const h = await ll(c, f), z = (h.lines || []).filter((M) => Number.isFinite(Number(M.start)) && Number.isFinite(Number(M.end)));
      return z.length ? { id: o, title: "Deep · rhyme & prosody", meta: "phonetic rhyme, repetition and delivery", kind: "deep-lyrics", content: { type: "blocks", items: hc(z) } } : Ya(o, "Deep · rhyme & prosody", "phonetic rhyme, repetition and delivery", [["rhyme scheme", h.rhyme?.scheme || "—"], ["lines", h.line_count ?? "—"], ["words", h.word_count ?? "—"]], "deep-lyrics");
    }
    if (f === "deep/sonic/sonic.json") {
      const h = await ll(c, f);
      return Ya(o, "Deep · sonic profile", "loudness · dynamics · timbre · stereo", [["LUFS", sl(h.loudness?.integrated_lufs_bs1770, 1)], ["crest", sl(h.loudness?.crest_factor_db, 1, " dB")], ["RMS range", sl(h.loudness?.short_term_rms_range_db_p95_p10, 1, " dB")], ["centroid", sl(h.timbre?.spectral_centroid_hz_mean, 0, " Hz")], ["stereo corr", sl(h.stereo?.left_right_correlation, 2)]]);
    }
    if (f === "deep/rhythm/rhythm.json") {
      const h = await ll(c, f);
      return Ya(o, "Deep · groove", "meter · stability · swing · syncopation evidence", [["tempo", sl(h.tempo?.median_bpm, 2, " BPM")], ["meter", h.meter?.estimated_beats_per_bar ? `${h.meter.estimated_beats_per_bar}/4-ish` : "—"], ["swing", sl(h.groove?.swing_ratio_long_to_short, 2, ":1")], ["offbeat energy", sl(h.groove?.offbeat_onset_energy_ratio, 3)], ["onsets/s", sl(h.groove?.onset_density_per_second, 2)]]);
    }
    if (f === "deep/semantic_text/semantic_text.json") {
      const h = await ll(c, f);
      return Ya(o, "Deep · lyric semantics", "sentence embedding theme similarities · not probabilities", (h.theme_similarity || []).slice(0, 7).map((z) => [z.theme, sl(z.similarity, 3)]));
    }
    if (f === "deep/semantic_audio/semantic_audio.json") {
      const h = await ll(c, f), z = Object.entries(h.prompt_sets || {}).flatMap(([M, H]) => (H || []).slice(0, 2).map((q) => [`${M}: ${q.prompt}`, sl(q.similarity, 3)]));
      return Ya(o, "Deep · audio semantics", "MuQ-MuLan zero-shot similarities · CC-BY-NC weights", z);
    }
    if (f === "deep/summary.json") {
      const h = await ll(c, f), z = Object.entries(h.analyses || {}).map(([M, H]) => [M, H.available ? "ready" : "unavailable"]);
      return (h.errors || []).length && z.push(["errors", h.errors.length]), Ya(o, "Deep · analysis summary", "cross-domain action inventory", z);
    }
  } catch (h) {
    return { id: o, title: El(f), meta: "analysis artifact", kind: "artifact", content: mc(c, f, h.message) };
  }
  return { id: o, title: El(f), meta: `${E || "file"} · ${Number(r.bytes || 0).toLocaleString()} bytes`, kind: "artifact", content: mc(c, f) };
}
function u1(c) {
  const r = [];
  c?.lyrics && r.push({ id: "canonical:lyrics", title: "Canonical lyrics", meta: "known reference text", kind: "canonical-lyrics", height: 104, content: { type: "text", text: c.lyrics } });
  const f = Array.isArray(c?.lyric_timing) ? c.lyric_timing : [];
  return f.length && r.push({ id: "canonical:timing", title: "Canonical lyric timing", meta: `${f.length} timed lyric event${f.length === 1 ? "" : "s"}`, kind: "canonical-timing", height: 104, content: { type: "blocks", items: f.flatMap((o) => {
    const E = Number(o.start), h = Number(o.end);
    return Number.isFinite(E) && E >= 0 ? [{ start: E, end: Number.isFinite(h) && h > E ? h : E + 0.75, label: String(o.text || ""), className: "stemlab-canonical-lyric" }] : [];
  }) } }), { lanes: r };
}
function i1({ lines: c }) {
  return /* @__PURE__ */ g.jsxs("details", { open: !0, className: "stemlab-log", children: [
    /* @__PURE__ */ g.jsx("summary", { children: "Analysis log" }),
    /* @__PURE__ */ g.jsx("div", { className: "log", children: c.map((r, f) => /* @__PURE__ */ g.jsxs("div", { className: r.stream === "stderr" ? "stderr" : "stdout", children: [
      "[",
      r.stream,
      "] ",
      r.text
    ] }, f)) })
  ] });
}
function c1({ hash: c, filename: r }) {
  const f = $g(c), [o, E] = Y.useState([]), [h, z] = Y.useState(0), M = Kg(c, h), [H, q] = Y.useState({ state: "submitted" }), [D, m] = Y.useState({ bpm: null, lyrics: null, lyric_timing: [] }), [j, w] = Y.useState(null), [F, ct] = Y.useState("canonical"), [ut, zt] = Y.useState("consensus"), [Tt, Mt] = Y.useState([]), Lt = Y.useRef(/* @__PURE__ */ new Set()), Ot = Y.useCallback((V, x) => {
    x && Mt((U) => [...U.slice(-799), { stream: V === "stderr" ? "stderr" : "stdout", text: x }]);
  }, []), Bt = Y.useCallback(async (V) => {
    if (!V?.path || Lt.current.has(V.path)) return;
    Lt.current.add(V.path);
    const x = await n1(c, V);
    x && (x.duration && z((U) => U || x.duration), E((U) => U.some((Z) => Z.id === x.id) ? U : [...U, x]));
  }, [c]), I = Y.useCallback(async () => {
    const V = await fetch(`/api/${c}/timeline`, { cache: "no-store" });
    if (!V.ok) return;
    const x = await V.json();
    q(x.status || { state: "submitted" }), x.duration_seconds && z(Number(x.duration_seconds)), x.canonical && m(x.canonical), w(x.beat_offsets || null);
    for (const U of x.files || []) Bt(U);
  }, [Bt, c]);
  Y.useEffect(() => {
    Lt.current = /* @__PURE__ */ new Set(), E([]), w(null), ct("canonical"), zt("consensus"), ch(c, "__source__", "MASTER · uploaded source", r, "__source__").then((U) => {
      U.duration && z(U.duration), E((Z) => [U, ...Z.filter((ht) => ht.id !== U.id)]);
    }).catch((U) => Ot("stderr", U.message)), I();
    const V = window.setInterval(() => {
      I();
    }, 2500);
    let x = null;
    return typeof window.io == "function" ? (x = window.io({ path: "/socket.io" }), x.on("connect", () => {
      Hn.textContent = "live", Hn.classList.remove("muted"), x.emit("subscribe", { hash: c });
    }), x.on("disconnect", () => {
      Hn.textContent = "reconnecting", Hn.classList.add("muted");
    }), x.on("process_output", (U) => Ot(U.stream || "stdout", U.line || "")), x.on("process_history", (U) => {
      for (const Z of U.stdout || []) Ot("stdout", Z);
      for (const Z of U.stderr || []) Ot("stderr", Z);
    }), x.on("new_file", (U) => {
      Bt(U);
    }), x.on("job_status", (U) => {
      q(U.status || {}), I();
    }), x.on("canonical_metadata", (U) => {
      U?.canonical && m(U.canonical);
    }), x.on("job_timeout", (U) => Ot("stderr", `Job timeout: ${U.message || "analysis exceeded timeout"}`))) : (Hn.textContent = "polling", Hn.classList.add("muted"), Ot("stderr", "Socket.IO browser client unavailable; timeline inventory polling remains active.")), () => {
      window.clearInterval(V), x?.disconnect();
    };
  }, [Bt, Ot, r, c, I]);
  const P = Y.useMemo(() => u1(D), [D]), rt = Y.useMemo(() => jg(j, D.bpm, h, F, ut), [j, D.bpm, h, F, ut]), et = (V) => V.id === "__source__" ? 0 : V.kind === "deep-structure" ? 10 : V.kind === "events" ? 20 : V.kind === "audio" ? 1 : V.kind === "spectrogram" ? 30 : V.kind === "waveform" ? 40 : 90, tt = Y.useMemo(() => xg(o), [o]), qt = [...rt.basis ? [
    { id: "canonical:bpm", title: "BPM grid · original", meta: `${rt.basis.bpm.toFixed(4)} BPM · source time 0`, kind: "canonical-bpm", height: 74, content: { type: "markers", items: rt.original } },
    { id: "bpm:aligned", title: "BPM grid · offset", meta: rt.row ? `${rt.row.offset_pips.toFixed(6)} pips · ${rt.analysis.analysis_id}` : "Waiting for detected first beat", kind: "canonical-bpm", height: 74, content: { type: "markers", items: rt.aligned } }
  ] : [], ...M.lanes, ...P.lanes, ...[...tt].sort((V, x) => et(V) - et(x) || V.id.localeCompare(x.id))], $t = H.state || "submitted";
  return /* @__PURE__ */ g.jsx(
    Cg,
    {
      className: "stemlab-timeline",
      laneControls: !0,
      wheelNavigation: !0,
      audioSrc: `/api/${c}/source`,
      duration: h,
      title: D.title || r,
      subtitle: c,
      loops: f.loops,
      lanes: qt,
      grid: [...rt.grid, ...M.grid],
      onDurationChange: z,
      onWindowChange: M.onWindowChange,
      onTimeChange: M.onTimeChange,
      onPlaybackError: (V) => Ot("stderr", V instanceof Error ? V.message : String(V)),
      headerEnd: /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
        /* @__PURE__ */ g.jsx("span", { className: `badge ${$t}`, children: $t }),
        /* @__PURE__ */ g.jsxs("span", { className: "small", children: [
          qt.length,
          " lane",
          qt.length === 1 ? "" : "s"
        ] })
      ] }),
      footer: /* @__PURE__ */ g.jsxs(g.Fragment, { children: [
        /* @__PURE__ */ g.jsx(Rg, { comparison: rt, onBasis: ct, onAnalysis: zt }),
        M.panel,
        /* @__PURE__ */ g.jsx(Fg, { state: f, hash: c }),
        /* @__PURE__ */ g.jsx(i1, { lines: Tt }),
        /* @__PURE__ */ g.jsx("span", { className: "dock-links", children: /* @__PURE__ */ g.jsx("a", { href: "https://kieransimkin.co.uk/my-songs/", target: "_blank", rel: "noopener", children: "Kieran Simkin · My Songs ↗" }) })
      ] })
    }
  );
}
function f1() {
  const c = nh?.value?.trim() || "", r = uh?.value || "", f = ih?.value || "";
  return { ...no, bpm: c ? Number(c) : null, lyrics: r.trim() || null, lyric_timing: f.trim() || [] };
}
function s1(c) {
  return Number.isFinite(Number(c.bpm)) || !!c.lyrics || !!(typeof c.lyric_timing == "string" && c.lyric_timing.trim()) || !!(Array.isArray(c.lyric_timing) && c.lyric_timing.length);
}
async function o1(c) {
  const r = f1();
  if (!s1(r)) return;
  const f = await fetch(`/api/${c}/canonical`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(r) }), o = await f.json().catch(() => ({}));
  if (!f.ok) throw new Error(o.detail || `Could not save canonical metadata (${f.status})`);
  ao.textContent = "Known information saved with this song hash.";
}
function r1(c) {
  return new Promise((r, f) => {
    const o = new XMLHttpRequest();
    o.open("PUT", `/upload/${encodeURIComponent(c.name)}`), o.setRequestHeader("Content-Type", c.type || "application/octet-stream"), o.upload.onprogress = (E) => {
      ah.classList.remove("hidden");
      const h = E.lengthComputable ? E.loaded / E.total : 0;
      rc.style.width = `${Math.round(h * 100)}%`, dc.textContent = E.lengthComputable ? `${Math.round(h * 100)}% · ${(E.loaded / 1048576).toFixed(1)} / ${(E.total / 1048576).toFixed(1)} MiB` : `${(E.loaded / 1048576).toFixed(1)} MiB uploaded`;
    }, o.onerror = () => f(new Error("Upload failed")), o.onload = () => {
      let E = {};
      try {
        E = JSON.parse(o.responseText);
      } catch {
      }
      o.status < 200 || o.status >= 300 ? f(new Error(E.detail || `Upload failed (${o.status})`)) : r(E);
    }, o.send(c);
  });
}
async function fh(c, r) {
  kg.classList.add("hidden"), io.classList.remove("hidden"), t1.render(/* @__PURE__ */ g.jsx(c1, { hash: c, filename: r || "uploaded audio" }, c));
}
async function sh(c) {
  if (c) {
    rc.style.width = "0%", dc.textContent = `Uploading ${c.name}`, ah.classList.remove("hidden");
    try {
      const r = await r1(c);
      rc.style.width = "100%", dc.textContent = "Upload complete · attaching to analysis", await o1(r.hash), await fh(r.hash, r.filename || c.name);
    } catch (r) {
      dc.textContent = r.message, rc.style.width = "0%";
    }
  }
}
async function oh(c) {
  c?.preventDefault(), c?.stopPropagation();
  try {
    const r = await fetch("/assets/arcadians-reference.json", { cache: "no-store" });
    if (!r.ok) throw new Error(`Could not load Arcadians reference (${r.status})`);
    const f = await r.json();
    no = {};
    for (const o of ["title", "artist", "release_date", "isrc", "upc", "website", "my_songs_url", "epk_url", "cover_art_url", "source_url", "sections"])
      f[o] !== void 0 && f[o] !== null && (no[o] = f[o]);
    nh.value = f.bpm ?? "", uh.value = f.lyrics ?? "", ih.value = Array.isArray(f.lyric_timing) && f.lyric_timing.length ? JSON.stringify(f.lyric_timing, null, 2) : "", ge(".known-info").open = !0, ao.textContent = f.lyric_timing?.length ? `Loaded ${f.title || "Arcadians"}: canonical release metadata, sections, ${f.bpm} BPM, lyrics and timing.` : `Loaded ${f.title || "Arcadians"} canonical reference metadata.`;
  } catch (r) {
    ao.textContent = r.message;
  }
}
lh.addEventListener("click", (c) => {
  c.stopPropagation(), Bu.click();
});
Bu.addEventListener("change", () => {
  sh(Bu.files?.[0]);
});
Ga.addEventListener("click", (c) => {
  c.target !== lh && !c.target.closest(".known-info") && Bu.click();
});
Ga.addEventListener("keydown", (c) => {
  (c.key === "Enter" || c.key === " ") && Bu.click();
});
for (const c of ["dragenter", "dragover"]) Ga.addEventListener(c, (r) => {
  r.preventDefault(), Ga.classList.add("dragging");
});
for (const c of ["dragleave", "drop"]) Ga.addEventListener(c, (r) => {
  r.preventDefault(), Ga.classList.remove("dragging");
});
Ga.addEventListener("drop", (c) => {
  sh(c.dataTransfer?.files?.[0]);
});
Wg?.addEventListener("click", oh);
Ig?.addEventListener("click", oh);
const Is = new URLSearchParams(location.search).get("hash");
Is && /^[0-9a-f]{64}$/i.test(Is) && fh(Is.toLowerCase(), "Existing analysis");
export {
  wa as formatTimelineTime
};
