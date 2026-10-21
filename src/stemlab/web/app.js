var to = { exports: {} }, Yu = {};
var Vh;
function py() {
  if (Vh) return Yu;
  Vh = 1;
  var c = /* @__PURE__ */ Symbol.for("react.transitional.element"), f = /* @__PURE__ */ Symbol.for("react.fragment");
  function r(s, m, h) {
    var b = null;
    if (h !== void 0 && (b = "" + h), m.key !== void 0 && (b = "" + m.key), "key" in m) {
      h = {};
      for (var S in m)
        S !== "key" && (h[S] = m[S]);
    } else h = m;
    return m = h.ref, {
      $$typeof: c,
      type: s,
      key: b,
      ref: m !== void 0 ? m : null,
      props: h
    };
  }
  return Yu.Fragment = f, Yu.jsx = r, Yu.jsxs = r, Yu;
}
var Qh;
function Sy() {
  return Qh || (Qh = 1, to.exports = py()), to.exports;
}
var d = Sy(), eo = { exports: {} }, vt = {};
var Zh;
function _y() {
  if (Zh) return vt;
  Zh = 1;
  var c = /* @__PURE__ */ Symbol.for("react.transitional.element"), f = /* @__PURE__ */ Symbol.for("react.portal"), r = /* @__PURE__ */ Symbol.for("react.fragment"), s = /* @__PURE__ */ Symbol.for("react.strict_mode"), m = /* @__PURE__ */ Symbol.for("react.profiler"), h = /* @__PURE__ */ Symbol.for("react.consumer"), b = /* @__PURE__ */ Symbol.for("react.context"), S = /* @__PURE__ */ Symbol.for("react.forward_ref"), A = /* @__PURE__ */ Symbol.for("react.suspense"), j = /* @__PURE__ */ Symbol.for("react.memo"), T = /* @__PURE__ */ Symbol.for("react.lazy"), v = /* @__PURE__ */ Symbol.for("react.activity"), D = /* @__PURE__ */ Symbol.for("react.view_transition"), H = Symbol.iterator;
  function J(y) {
    return y === null || typeof y != "object" ? null : (y = H && y[H] || y["@@iterator"], typeof y == "function" ? y : null);
  }
  var L = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, K = Object.assign, ot = {};
  function G(y, C, Z) {
    this.props = y, this.context = C, this.refs = ot, this.updater = Z || L;
  }
  G.prototype.isReactComponent = {}, G.prototype.setState = function(y, C) {
    if (typeof y != "object" && typeof y != "function" && y != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, y, C, "setState");
  }, G.prototype.forceUpdate = function(y) {
    this.updater.enqueueForceUpdate(this, y, "forceUpdate");
  };
  function X() {
  }
  X.prototype = G.prototype;
  function Mt(y, C, Z) {
    this.props = y, this.context = C, this.refs = ot, this.updater = Z || L;
  }
  var Tt = Mt.prototype = new X();
  Tt.constructor = Mt, K(Tt, G.prototype), Tt.isPureReactComponent = !0;
  var Bt = Array.isArray;
  function $() {
  }
  var ft = { H: null, A: null, T: null, S: null }, Jt = Object.prototype.hasOwnProperty;
  function at(y, C, Z) {
    var P = Z.ref;
    return {
      $$typeof: c,
      type: y,
      key: C,
      ref: P !== void 0 ? P : null,
      props: Z
    };
  }
  function gt(y, C) {
    return at(y.type, C, y.props);
  }
  function mt(y) {
    return typeof y == "object" && y !== null && y.$$typeof === c;
  }
  function _t(y) {
    var C = { "=": "=0", ":": "=2" };
    return "$" + y.replace(/[=:]/g, function(Z) {
      return C[Z];
    });
  }
  var Et = /\/+/g;
  function Ct(y, C) {
    return typeof y == "object" && y !== null && y.key != null ? _t("" + y.key) : C.toString(36);
  }
  function Y(y) {
    switch (y.status) {
      case "fulfilled":
        return y.value;
      case "rejected":
        throw y.reason;
      default:
        switch (typeof y.status == "string" ? y.then($, $) : (y.status = "pending", y.then(
          function(C) {
            y.status === "pending" && (y.status = "fulfilled", y.value = C);
          },
          function(C) {
            y.status === "pending" && (y.status = "rejected", y.reason = C);
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
  function et(y, C, Z, P, dt) {
    var yt = typeof y;
    (yt === "undefined" || yt === "boolean") && (y = null);
    var st = !1;
    if (y === null) st = !0;
    else
      switch (yt) {
        case "bigint":
        case "string":
        case "number":
          st = !0;
          break;
        case "object":
          switch (y.$$typeof) {
            case c:
            case f:
              st = !0;
              break;
            case T:
              return st = y._init, et(
                st(y._payload),
                C,
                Z,
                P,
                dt
              );
          }
      }
    if (st)
      return dt = dt(y), st = P === "" ? "." + Ct(y, 0) : P, Bt(dt) ? (Z = "", st != null && (Z = st.replace(Et, "$&/") + "/"), et(dt, C, Z, "", function(ee) {
        return ee;
      })) : dt != null && (mt(dt) && (dt = gt(
        dt,
        Z + (dt.key == null || y && y.key === dt.key ? "" : ("" + dt.key).replace(
          Et,
          "$&/"
        ) + "/") + st
      )), C.push(dt)), 1;
    st = 0;
    var Q = P === "" ? "." : P + ":";
    if (Bt(y))
      for (var ut = 0; ut < y.length; ut++)
        P = y[ut], yt = Q + Ct(P, ut), st += et(
          P,
          C,
          Z,
          yt,
          dt
        );
    else if (ut = J(y), typeof ut == "function")
      for (y = ut.call(y), ut = 0; !(P = y.next()).done; )
        P = P.value, yt = Q + Ct(P, ut++), st += et(
          P,
          C,
          Z,
          yt,
          dt
        );
    else if (yt === "object") {
      if (typeof y.then == "function")
        return et(
          Y(y),
          C,
          Z,
          P,
          dt
        );
      throw C = String(y), Error(
        "Objects are not valid as a React child (found: " + (C === "[object Object]" ? "object with keys {" + Object.keys(y).join(", ") + "}" : C) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return st;
  }
  function I(y, C, Z) {
    if (y == null) return y;
    var P = [], dt = 0;
    return et(y, P, "", "", function(yt) {
      return C.call(Z, yt, dt++);
    }), P;
  }
  function bt(y) {
    if (y._status === -1) {
      var C = y._result, Z = C();
      Z.then(
        function(P) {
          (y._status === 0 || y._status === -1) && (y._status = 1, y._result = P, Z.status === void 0 && (Z.status = "fulfilled", Z.value = P));
        },
        function(P) {
          (y._status === 0 || y._status === -1) && (y._status = 2, y._result = P, Z.status === void 0 && (Z.status = "rejected", Z.reason = P));
        }
      ), y._status === -1 && (y._status = 0, y._result = Z);
    }
    if (y._status === 1) return y._result.default;
    throw y._result;
  }
  var it = typeof reportError == "function" ? reportError : function(y) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var C = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof y == "object" && y !== null && typeof y.message == "string" ? String(y.message) : String(y),
        error: y
      });
      if (!window.dispatchEvent(C)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", y);
      return;
    }
    console.error(y);
  };
  function wt(y) {
    var C = ft.T, Z = {};
    Z.types = C !== null ? C.types : null, ft.T = Z;
    try {
      var P = y(), dt = ft.S;
      dt !== null && dt(Z, P), typeof P == "object" && P !== null && typeof P.then == "function" && P.then($, it);
    } catch (yt) {
      it(yt);
    } finally {
      C !== null && Z.types !== null && (C.types = Z.types), ft.T = C;
    }
  }
  function qt(y) {
    var C = ft.T;
    if (C !== null) {
      var Z = C.types;
      Z === null ? C.types = [y] : Z.indexOf(y) === -1 && Z.push(y);
    } else wt(qt.bind(null, y));
  }
  var W = {
    map: I,
    forEach: function(y, C, Z) {
      I(
        y,
        function() {
          C.apply(this, arguments);
        },
        Z
      );
    },
    count: function(y) {
      var C = 0;
      return I(y, function() {
        C++;
      }), C;
    },
    toArray: function(y) {
      return I(y, function(C) {
        return C;
      }) || [];
    },
    only: function(y) {
      if (!mt(y))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return y;
    }
  };
  return vt.Activity = v, vt.Children = W, vt.Component = G, vt.Fragment = r, vt.Profiler = m, vt.PureComponent = Mt, vt.StrictMode = s, vt.Suspense = A, vt.ViewTransition = D, vt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ft, vt.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(y) {
      return ft.H.useMemoCache(y);
    }
  }, vt.addTransitionType = qt, vt.cache = function(y) {
    return function() {
      return y.apply(null, arguments);
    };
  }, vt.cacheSignal = function() {
    return null;
  }, vt.cloneElement = function(y, C, Z) {
    if (y == null)
      throw Error(
        "The argument must be a React element, but you passed " + y + "."
      );
    var P = K({}, y.props), dt = y.key;
    if (C != null)
      for (yt in C.key !== void 0 && (dt = "" + C.key), C)
        !Jt.call(C, yt) || yt === "key" || yt === "__self" || yt === "__source" || yt === "ref" && C.ref === void 0 || (P[yt] = C[yt]);
    var yt = arguments.length - 2;
    if (yt === 1) P.children = Z;
    else if (1 < yt) {
      for (var st = Array(yt), Q = 0; Q < yt; Q++)
        st[Q] = arguments[Q + 2];
      P.children = st;
    }
    return at(y.type, dt, P);
  }, vt.createContext = function(y) {
    return y = {
      $$typeof: b,
      _currentValue: y,
      _currentValue2: y,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, y.Provider = y, y.Consumer = {
      $$typeof: h,
      _context: y
    }, y;
  }, vt.createElement = function(y, C, Z) {
    var P, dt = {}, yt = null;
    if (C != null)
      for (P in C.key !== void 0 && (yt = "" + C.key), C)
        Jt.call(C, P) && P !== "key" && P !== "__self" && P !== "__source" && (dt[P] = C[P]);
    var st = arguments.length - 2;
    if (st === 1) dt.children = Z;
    else if (1 < st) {
      for (var Q = Array(st), ut = 0; ut < st; ut++)
        Q[ut] = arguments[ut + 2];
      dt.children = Q;
    }
    if (y && y.defaultProps)
      for (P in st = y.defaultProps, st)
        dt[P] === void 0 && (dt[P] = st[P]);
    return at(y, yt, dt);
  }, vt.createRef = function() {
    return { current: null };
  }, vt.forwardRef = function(y) {
    return { $$typeof: S, render: y };
  }, vt.isValidElement = mt, vt.lazy = function(y) {
    return {
      $$typeof: T,
      _payload: { _status: -1, _result: y },
      _init: bt
    };
  }, vt.memo = function(y, C) {
    return {
      $$typeof: j,
      type: y,
      compare: C === void 0 ? null : C
    };
  }, vt.startTransition = wt, vt.unstable_useCacheRefresh = function() {
    return ft.H.useCacheRefresh();
  }, vt.use = function(y) {
    return ft.H.use(y);
  }, vt.useActionState = function(y, C, Z) {
    return ft.H.useActionState(y, C, Z);
  }, vt.useCallback = function(y, C) {
    return ft.H.useCallback(y, C);
  }, vt.useContext = function(y) {
    return ft.H.useContext(y);
  }, vt.useDebugValue = function() {
  }, vt.useDeferredValue = function(y, C) {
    return ft.H.useDeferredValue(y, C);
  }, vt.useEffect = function(y, C) {
    return ft.H.useEffect(y, C);
  }, vt.useEffectEvent = function(y) {
    return ft.H.useEffectEvent(y);
  }, vt.useId = function() {
    return ft.H.useId();
  }, vt.useImperativeHandle = function(y, C, Z) {
    return ft.H.useImperativeHandle(y, C, Z);
  }, vt.useInsertionEffect = function(y, C) {
    return ft.H.useInsertionEffect(y, C);
  }, vt.useLayoutEffect = function(y, C) {
    return ft.H.useLayoutEffect(y, C);
  }, vt.useMemo = function(y, C) {
    return ft.H.useMemo(y, C);
  }, vt.useOptimistic = function(y, C) {
    return ft.H.useOptimistic(y, C);
  }, vt.useReducer = function(y, C, Z) {
    return ft.H.useReducer(y, C, Z);
  }, vt.useRef = function(y) {
    return ft.H.useRef(y);
  }, vt.useState = function(y) {
    return ft.H.useState(y);
  }, vt.useSyncExternalStore = function(y, C, Z) {
    return ft.H.useSyncExternalStore(
      y,
      C,
      Z
    );
  }, vt.useTransition = function() {
    return ft.H.useTransition();
  }, vt.version = "19.3.0", vt;
}
var Kh;
function yo() {
  return Kh || (Kh = 1, eo.exports = _y()), eo.exports;
}
var w = yo(), lo = { exports: {} }, qu = {}, ao = { exports: {} }, no = {};
var Jh;
function Ey() {
  return Jh || (Jh = 1, (function(c) {
    function f(Y, et) {
      var I = Y.length;
      Y.push(et);
      t: for (; 0 < I; ) {
        var bt = I - 1 >>> 1, it = Y[bt];
        if (0 < m(it, et))
          Y[bt] = et, Y[I] = it, I = bt;
        else break t;
      }
    }
    function r(Y) {
      return Y.length === 0 ? null : Y[0];
    }
    function s(Y) {
      if (Y.length === 0) return null;
      var et = Y[0], I = Y.pop();
      if (I !== et) {
        Y[0] = I;
        t: for (var bt = 0, it = Y.length, wt = it >>> 1; bt < wt; ) {
          var qt = 2 * (bt + 1) - 1, W = Y[qt], y = qt + 1, C = Y[y];
          if (0 > m(W, I))
            y < it && 0 > m(C, W) ? (Y[bt] = C, Y[y] = I, bt = y) : (Y[bt] = W, Y[qt] = I, bt = qt);
          else if (y < it && 0 > m(C, I))
            Y[bt] = C, Y[y] = I, bt = y;
          else break t;
        }
      }
      return et;
    }
    function m(Y, et) {
      var I = Y.sortIndex - et.sortIndex;
      return I !== 0 ? I : Y.id - et.id;
    }
    if (c.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var h = performance;
      c.unstable_now = function() {
        return h.now();
      };
    } else {
      var b = Date, S = b.now();
      c.unstable_now = function() {
        return b.now() - S;
      };
    }
    var A = [], j = [], T = 1, v = null, D = 3, H = !1, J = !1, L = !1, K = !1, ot = typeof setTimeout == "function" ? setTimeout : null, G = typeof clearTimeout == "function" ? clearTimeout : null, X = typeof setImmediate < "u" ? setImmediate : null;
    function Mt(Y) {
      for (var et = r(j); et !== null; ) {
        if (et.callback === null) s(j);
        else if (et.startTime <= Y)
          s(j), et.sortIndex = et.expirationTime, f(A, et);
        else break;
        et = r(j);
      }
    }
    function Tt(Y) {
      if (L = !1, Mt(Y), !J)
        if (r(A) !== null)
          J = !0, Bt || (Bt = !0, mt());
        else {
          var et = r(j);
          et !== null && Ct(Tt, et.startTime - Y);
        }
    }
    var Bt = !1, $ = -1, ft = 5, Jt = -1;
    function at() {
      return K ? !0 : !(c.unstable_now() - Jt < ft);
    }
    function gt() {
      if (K = !1, Bt) {
        var Y = c.unstable_now();
        Jt = Y;
        var et = !0;
        try {
          t: {
            J = !1, L && (L = !1, G($), $ = -1), H = !0;
            var I = D;
            try {
              e: {
                for (Mt(Y), v = r(A); v !== null && !(v.expirationTime > Y && at()); ) {
                  var bt = v.callback;
                  if (typeof bt == "function") {
                    v.callback = null, D = v.priorityLevel;
                    var it = bt(
                      v.expirationTime <= Y
                    );
                    if (Y = c.unstable_now(), typeof it == "function") {
                      v.callback = it, Mt(Y), et = !0;
                      break e;
                    }
                    v === r(A) && s(A), Mt(Y);
                  } else s(A);
                  v = r(A);
                }
                if (v !== null) et = !0;
                else {
                  var wt = r(j);
                  wt !== null && Ct(
                    Tt,
                    wt.startTime - Y
                  ), et = !1;
                }
              }
              break t;
            } finally {
              v = null, D = I, H = !1;
            }
            et = void 0;
          }
        } finally {
          et ? mt() : Bt = !1;
        }
      }
    }
    var mt;
    if (typeof X == "function")
      mt = function() {
        X(gt);
      };
    else if (typeof MessageChannel < "u") {
      var _t = new MessageChannel(), Et = _t.port2;
      _t.port1.onmessage = gt, mt = function() {
        Et.postMessage(null);
      };
    } else
      mt = function() {
        ot(gt, 0);
      };
    function Ct(Y, et) {
      $ = ot(function() {
        Y(c.unstable_now());
      }, et);
    }
    c.unstable_IdlePriority = 5, c.unstable_ImmediatePriority = 1, c.unstable_LowPriority = 4, c.unstable_NormalPriority = 3, c.unstable_Profiling = null, c.unstable_UserBlockingPriority = 2, c.unstable_cancelCallback = function(Y) {
      Y.callback = null;
    }, c.unstable_forceFrameRate = function(Y) {
      0 > Y || 125 < Y ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : ft = 0 < Y ? Math.floor(1e3 / Y) : 5;
    }, c.unstable_getCurrentPriorityLevel = function() {
      return D;
    }, c.unstable_next = function(Y) {
      switch (D) {
        case 1:
        case 2:
        case 3:
          var et = 3;
          break;
        default:
          et = D;
      }
      var I = D;
      D = et;
      try {
        return Y();
      } finally {
        D = I;
      }
    }, c.unstable_requestPaint = function() {
      K = !0;
    }, c.unstable_runWithPriority = function(Y, et) {
      switch (Y) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          Y = 3;
      }
      var I = D;
      D = Y;
      try {
        return et();
      } finally {
        D = I;
      }
    }, c.unstable_scheduleCallback = function(Y, et, I) {
      var bt = c.unstable_now();
      switch (typeof I == "object" && I !== null ? (I = I.delay, I = typeof I == "number" && 0 < I ? bt + I : bt) : I = bt, Y) {
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
      return it = I + it, Y = {
        id: T++,
        callback: et,
        priorityLevel: Y,
        startTime: I,
        expirationTime: it,
        sortIndex: -1
      }, I > bt ? (Y.sortIndex = I, f(j, Y), r(A) === null && Y === r(j) && (L ? (G($), $ = -1) : L = !0, Ct(Tt, I - bt))) : (Y.sortIndex = it, f(A, Y), J || H || (J = !0, Bt || (Bt = !0, mt()))), Y;
    }, c.unstable_shouldYield = at, c.unstable_wrapCallback = function(Y) {
      var et = D;
      return function() {
        var I = D;
        D = et;
        try {
          return Y.apply(this, arguments);
        } finally {
          D = I;
        }
      };
    };
  })(no)), no;
}
var $h;
function Ty() {
  return $h || ($h = 1, ao.exports = Ey()), ao.exports;
}
var uo = { exports: {} }, Ne = {};
var kh;
function Ny() {
  if (kh) return Ne;
  kh = 1;
  var c = yo();
  function f(T) {
    var v = "https://react.dev/errors/" + T;
    if (1 < arguments.length) {
      v += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var D = 2; D < arguments.length; D++)
        v += "&args[]=" + encodeURIComponent(arguments[D]);
    }
    return "Minified React error #" + T + "; visit " + v + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function r() {
  }
  var s = {
    d: {
      f: r,
      r: function() {
        throw Error(f(522));
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
  }, m = /* @__PURE__ */ Symbol.for("react.portal"), h = /* @__PURE__ */ Symbol.for("react.recoverable"), b = /* @__PURE__ */ Symbol.for("react.optimistic_key");
  function S(T, v, D) {
    var H = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: m,
      key: H == null ? null : H === b ? b : "" + H,
      children: T,
      containerInfo: v,
      implementation: D
    };
  }
  var A = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function j(T, v) {
    if (T === "font") return "";
    if (typeof v == "string")
      return v === "use-credentials" ? v : "";
  }
  return Ne.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, Ne.browser = function(T) {
    return { $$typeof: h, _reason: T };
  }, Ne.createPortal = function(T, v) {
    var D = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!v || v.nodeType !== 1 && v.nodeType !== 9 && v.nodeType !== 11)
      throw Error(f(299));
    return S(T, v, null, D);
  }, Ne.flushSync = function(T) {
    var v = A.T, D = s.p;
    try {
      if (A.T = null, s.p = 2, T) return T();
    } finally {
      A.T = v, s.p = D, s.d.f();
    }
  }, Ne.preconnect = function(T, v) {
    typeof T == "string" && (v ? (v = v.crossOrigin, v = typeof v == "string" ? v === "use-credentials" ? v : "" : void 0) : v = null, s.d.C(T, v));
  }, Ne.prefetchDNS = function(T) {
    typeof T == "string" && s.d.D(T);
  }, Ne.preinit = function(T, v) {
    if (typeof T == "string" && v && typeof v.as == "string") {
      var D = v.as, H = j(D, v.crossOrigin), J = typeof v.integrity == "string" ? v.integrity : void 0, L = typeof v.fetchPriority == "string" ? v.fetchPriority : void 0;
      D === "style" ? s.d.S(
        T,
        typeof v.precedence == "string" ? v.precedence : void 0,
        {
          crossOrigin: H,
          integrity: J,
          fetchPriority: L
        }
      ) : D === "script" && s.d.X(T, {
        crossOrigin: H,
        integrity: J,
        fetchPriority: L,
        nonce: typeof v.nonce == "string" ? v.nonce : void 0
      });
    }
  }, Ne.preinitModule = function(T, v) {
    if (typeof T == "string")
      if (typeof v == "object" && v !== null) {
        if (v.as == null || v.as === "script") {
          var D = j(
            v.as,
            v.crossOrigin
          );
          s.d.M(T, {
            crossOrigin: D,
            integrity: typeof v.integrity == "string" ? v.integrity : void 0,
            nonce: typeof v.nonce == "string" ? v.nonce : void 0,
            fetchPriority: typeof v.fetchPriority == "string" ? v.fetchPriority : void 0
          });
        }
      } else v == null && s.d.M(T);
  }, Ne.preload = function(T, v) {
    if (typeof T == "string" && typeof v == "object" && v !== null && typeof v.as == "string") {
      var D = v.as, H = j(D, v.crossOrigin);
      s.d.L(T, D, {
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
  }, Ne.preloadModule = function(T, v) {
    if (typeof T == "string")
      if (v) {
        var D = j(v.as, v.crossOrigin);
        s.d.m(T, {
          as: typeof v.as == "string" && v.as !== "script" ? v.as : void 0,
          crossOrigin: D,
          integrity: typeof v.integrity == "string" ? v.integrity : void 0,
          nonce: typeof v.nonce == "string" ? v.nonce : void 0,
          fetchPriority: typeof v.fetchPriority == "string" ? v.fetchPriority : void 0
        });
      } else s.d.m(T);
  }, Ne.requestFormReset = function(T) {
    s.d.r(T);
  }, Ne.unstable_batchedUpdates = function(T, v) {
    return T(v);
  }, Ne.useFormState = function(T, v, D) {
    return A.H.useFormState(T, v, D);
  }, Ne.useFormStatus = function() {
    return A.H.useHostTransitionStatus();
  }, Ne.version = "19.3.0", Ne;
}
var Fh;
function xy() {
  if (Fh) return uo.exports;
  Fh = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (f) {
        console.error(f);
      }
  }
  return c(), uo.exports = Ny(), uo.exports;
}
var Wh;
function My() {
  if (Wh) return qu;
  Wh = 1;
  var c = Ty(), f = yo(), r = xy();
  function s(t) {
    var e = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      e += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++)
        e += "&args[]=" + encodeURIComponent(arguments[l]);
    }
    return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function m(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function h(t) {
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
  function S(t) {
    if (t.tag === 31) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function A(t) {
    if (h(t) !== t)
      throw Error(s(188));
  }
  function j(t) {
    var e = t.alternate;
    if (!e) {
      if (e = h(t), e === null) throw Error(s(188));
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
          if (u === l) return A(n), t;
          if (u === a) return A(n), e;
          u = u.sibling;
        }
        throw Error(s(188));
      }
      if (l.return !== a.return) l = n, a = u;
      else {
        for (var i = !1, o = n.child; o; ) {
          if (o === l) {
            i = !0, l = n, a = u;
            break;
          }
          if (o === a) {
            i = !0, a = n, l = u;
            break;
          }
          o = o.sibling;
        }
        if (!i) {
          for (o = u.child; o; ) {
            if (o === l) {
              i = !0, l = u, a = n;
              break;
            }
            if (o === a) {
              i = !0, a = u, l = n;
              break;
            }
            o = o.sibling;
          }
          if (!i) throw Error(s(189));
        }
      }
      if (l.alternate !== a) throw Error(s(190));
    }
    if (l.tag !== 3) throw Error(s(188));
    return l.stateNode.current === l ? t : e;
  }
  function T(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (e = T(t), e !== null) return e;
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
  function D(t) {
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
  function J(t) {
    var e = [null, null], l = D(t);
    return l === null || L(
      e,
      t,
      l.child,
      { foundSelf: !1 }
    ), e;
  }
  function L(t, e, l, a) {
    for (; l !== null; ) {
      if (l === e) a.foundSelf = !0;
      else if (l.tag === 5 || l.tag === 27 || l.tag === 6) {
        if (a.foundSelf) return t[1] = l, !0;
        t[0] = l;
      } else if ((l.tag !== 22 || l.memoizedState === null) && L(
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
  function K(t) {
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
  var ot = null, G = null;
  function X(t, e, l) {
    return t === l ? !0 : t === e ? (ot = t, !0) : !1;
  }
  function Mt(t, e, l) {
    return t === l ? (G = t, !1) : t === e ? (G !== null && (ot = t), !0) : !1;
  }
  function Tt(t) {
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
  var $ = Object.assign, ft = /* @__PURE__ */ Symbol.for("react.element"), Jt = /* @__PURE__ */ Symbol.for("react.transitional.element"), at = /* @__PURE__ */ Symbol.for("react.portal"), gt = /* @__PURE__ */ Symbol.for("react.fragment"), mt = /* @__PURE__ */ Symbol.for("react.strict_mode"), _t = /* @__PURE__ */ Symbol.for("react.profiler"), Et = /* @__PURE__ */ Symbol.for("react.consumer"), Ct = /* @__PURE__ */ Symbol.for("react.context"), Y = /* @__PURE__ */ Symbol.for("react.forward_ref"), et = /* @__PURE__ */ Symbol.for("react.suspense"), I = /* @__PURE__ */ Symbol.for("react.suspense_list"), bt = /* @__PURE__ */ Symbol.for("react.memo"), it = /* @__PURE__ */ Symbol.for("react.lazy"), wt = /* @__PURE__ */ Symbol.for("react.activity"), qt = /* @__PURE__ */ Symbol.for("react.legacy_hidden"), W = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), y = /* @__PURE__ */ Symbol.for("react.view_transition"), C = /* @__PURE__ */ Symbol.for("react.recoverable"), Z = Symbol.iterator;
  function P(t) {
    return t === null || typeof t != "object" ? null : (t = Z && t[Z] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var dt = /* @__PURE__ */ Symbol.for("react.client.reference");
  function yt(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === dt ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case gt:
        return "Fragment";
      case _t:
        return "Profiler";
      case mt:
        return "StrictMode";
      case et:
        return "Suspense";
      case I:
        return "SuspenseList";
      case wt:
        return "Activity";
      case y:
        return "ViewTransition";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case at:
          return "Portal";
        case Ct:
          return t.displayName || "Context";
        case Et:
          return (t._context.displayName || "Context") + ".Consumer";
        case Y:
          var e = t.render;
          return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case bt:
          return e = t.displayName || null, e !== null ? e : yt(t.type) || "Memo";
        case it:
          e = t._payload, t = t._init;
          try {
            return yt(t(e));
          } catch {
          }
      }
    return null;
  }
  var st = Array.isArray, Q = f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ut = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ee = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ye = [], Ht = -1;
  function kt(t) {
    return { current: t };
  }
  function Xt(t) {
    0 > Ht || (t.current = ye[Ht], ye[Ht] = null, Ht--);
  }
  function Ot(t, e) {
    Ht++, ye[Ht] = t.current, t.current = e;
  }
  var q = kt(null), nt = kt(null), jt = kt(null), je = kt(null);
  function ie(t, e) {
    switch (Ot(jt, e), Ot(nt, t), Ot(q, null), e.nodeType) {
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
    Xt(q), Ot(q, t);
  }
  function Lt() {
    Xt(q), Xt(nt), Xt(jt);
  }
  function Ol(t) {
    var e = t.memoizedState;
    e !== null && (qn._currentValue = e.memoizedState, Ot(je, t)), e = q.current;
    var l = Pm(e, t.type);
    e !== l && (Ot(nt, t), Ot(q, l));
  }
  function Vl(t) {
    nt.current === t && (Xt(q), Xt(nt)), je.current === t && (Xt(je), qn._currentValue = ee);
  }
  var Ea, Ta;
  function Re(t) {
    if (Ea === void 0)
      try {
        throw Error();
      } catch (l) {
        var e = l.stack.trim().match(/\n( *(at )?)/);
        Ea = e && e[1] || "", Ta = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Ea + t + Ta;
  }
  var Ql = !1;
  function ul(t, e) {
    if (!t || Ql) return "";
    Ql = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (e) {
              var B = function() {
                throw Error();
              };
              if (Object.defineProperty(B.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(B, []);
                } catch (V) {
                  var _ = V;
                }
                Reflect.construct(t, [], B);
              } else {
                try {
                  B.call();
                } catch (V) {
                  _ = V;
                }
                B = !1;
                try {
                  var O = Object.getOwnPropertyDescriptor(
                    t.prototype,
                    "props"
                  );
                  Object.defineProperty(t.prototype, "props", {
                    configurable: !0,
                    set: function() {
                      throw Error();
                    }
                  }), B = !0, new t();
                } finally {
                  B && (O !== void 0 ? Object.defineProperty(t.prototype, "props", O) : delete t.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (V) {
                _ = V;
              }
              (B = t()) && typeof B.catch == "function" && B.catch(function() {
              });
            }
          } catch (V) {
            if (V && _ && typeof V.stack == "string")
              return [V.stack, _.stack];
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
      var u = a.DetermineComponentFrameRoot(), i = u[0], o = u[1];
      if (i && o) {
        var g = i.split(`
`), N = o.split(`
`);
        for (n = a = 0; a < g.length && !g[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; n < N.length && !N[n].includes(
          "DetermineComponentFrameRoot"
        ); )
          n++;
        if (a === g.length || n === N.length)
          for (a = g.length - 1, n = N.length - 1; 1 <= a && 0 <= n && g[a] !== N[n]; )
            n--;
        for (; 1 <= a && 0 <= n; a--, n--)
          if (g[a] !== N[n]) {
            if (a !== 1 || n !== 1)
              do
                if (a--, n--, 0 > n || g[a] !== N[n]) {
                  var z = `
` + g[a].replace(" at new ", " at ");
                  return t.displayName && z.includes("<anonymous>") && (z = z.replace("<anonymous>", t.displayName)), z;
                }
              while (1 <= a && 0 <= n);
            break;
          }
      }
    } finally {
      Ql = !1, Error.prepareStackTrace = l;
    }
    return (l = t ? t.displayName || t.name : "") ? Re(l) : "";
  }
  function Zn(t, e) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Re(t.type);
      case 16:
        return Re("Lazy");
      case 13:
        return t.child !== e && e !== null ? Re("Suspense Fallback") : Re("Suspense");
      case 19:
        return Re("SuspenseList");
      case 0:
      case 15:
        return ul(t.type, !1);
      case 11:
        return ul(t.type.render, !1);
      case 1:
        return ul(t.type, !0);
      case 31:
        return Re("Activity");
      case 30:
        return Re("ViewTransition");
      default:
        return "";
    }
  }
  function Zl(t) {
    try {
      var e = "", l = null;
      do
        e += Zn(t, l), l = t, t = t.return;
      while (t);
      return e;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var R = Object.prototype.hasOwnProperty, rt = c.unstable_scheduleCallback, x = c.unstable_cancelCallback, k = c.unstable_shouldYield, Nt = c.unstable_requestPaint, ht = c.unstable_now, fe = c.unstable_getCurrentPriorityLevel, ne = c.unstable_ImmediatePriority, hl = c.unstable_UserBlockingPriority, Ju = c.unstable_NormalPriority, O0 = c.unstable_LowPriority, Eo = c.unstable_IdlePriority, z0 = c.log, A0 = c.unstable_setDisableYieldValue, Kn = null, Ye = null;
  function Kl(t) {
    if (typeof z0 == "function" && A0(t), Ye && typeof Ye.setStrictMode == "function")
      try {
        Ye.setStrictMode(Kn, t);
      } catch {
      }
  }
  var qe = Math.clz32 ? Math.clz32 : R0, C0 = Math.log, j0 = Math.LN2;
  function R0(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (C0(t) / j0 | 0) | 0;
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
    var o = a & 134217727;
    return o !== 0 ? (a = o & ~u, a !== 0 ? n = Na(a) : (i &= o, i !== 0 ? n = Na(i) : l || (l = o & ~t, l !== 0 && (n = Na(l))))) : (o = a & ~u, o !== 0 ? n = Na(o) : i !== 0 ? n = Na(i) : l || (l = a & ~t, l !== 0 && (n = Na(l)))), n === 0 ? 0 : e !== 0 && e !== n && (e & u) === 0 && (u = n & -n, l = e & -e, u >= l || u === 32 && (l & 4194048) !== 0) ? e : n;
  }
  function Jn(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function To(t, e) {
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
  function No() {
    var t = Fu;
    return Fu <<= 1, (Fu & 62914560) === 0 && (Fu = 4194304), t;
  }
  function Oc(t) {
    for (var e = [], l = 0; 31 > l; l++) e.push(t);
    return e;
  }
  function $n(t, e) {
    t.pendingLanes |= e, e !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function w0(t, e, l, a, n, u) {
    var i = t.pendingLanes;
    t.pendingLanes = l, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= l, t.entangledLanes &= l, t.errorRecoveryDisabledLanes &= l, t.shellSuspendCounter = 0;
    var o = t.entanglements, g = t.expirationTimes, N = t.hiddenUpdates;
    for (l = i & ~l; 0 < l; ) {
      var z = 31 - qe(l), B = 1 << z;
      o[z] = 0, g[z] = -1;
      var _ = N[z];
      if (_ !== null)
        for (N[z] = null, z = 0; z < _.length; z++) {
          var O = _[z];
          O !== null && (O.lane &= -536870913);
        }
      l &= ~B;
    }
    a !== 0 && xo(t, a, 0), u !== 0 && n === 0 && t.tag !== 0 && (t.suspendedLanes |= u & ~(i & ~e));
  }
  function xo(t, e, l) {
    t.pendingLanes |= e, t.suspendedLanes &= ~e;
    var a = 31 - qe(e);
    t.entangledLanes |= e, t.entanglements[a] = t.entanglements[a] | 1073741824 | l & 261930;
  }
  function Mo(t, e) {
    var l = t.entangledLanes |= e;
    for (t = t.entanglements; l; ) {
      var a = 31 - qe(l), n = 1 << a;
      n & e | t[a] & e && (t[a] |= e), l &= ~n;
    }
  }
  function Oo(t, e) {
    var l = e & -e;
    return l = (l & 42) !== 0 ? 1 : zc(l), (l & (t.suspendedLanes | e)) !== 0 ? 0 : l;
  }
  function zc(t) {
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
  function Ac(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function zo() {
    var t = ut.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : Bh(t.type));
  }
  function Ao(t, e) {
    var l = ut.p;
    try {
      return ut.p = t, e();
    } finally {
      ut.p = l;
    }
  }
  var zl = Math.random().toString(36).slice(2), be = "__reactFiber$" + zl, De = "__reactProps$" + zl, Pa = "__reactContainer$" + zl, Co = "__reactEvents$" + zl, U0 = "__reactListeners$" + zl, B0 = "__reactHandles$" + zl, jo = "__reactResources$" + zl, kn = "__reactMarker$" + zl, Iu = "__reactLoad$" + zl;
  function Pu(t) {
    delete t[be], delete t[De], delete t[U0], delete t[B0];
  }
  function xa(t) {
    var e;
    if (e = t[be]) return e;
    for (var l = t.parentNode; l; ) {
      if (e = l[Pa] || l[be]) {
        if (l = e.alternate, e.child !== null || l !== null && l.child !== null)
          for (t = gh(t); t !== null; ) {
            if (l = t[be]) return l;
            t = gh(t);
          }
        return e;
      }
      t = l, l = t.parentNode;
    }
    return null;
  }
  function tn(t) {
    if (t = t[be] || t[Pa]) {
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
  function en(t) {
    var e = t[jo];
    return e || (e = t[jo] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), e;
  }
  function me(t) {
    t[kn] = !0;
  }
  function Ro(t) {
    t[Iu] = void 0;
  }
  var Do = /* @__PURE__ */ new Set(), wo = {};
  function Ma(t, e) {
    ln(t, e), ln(t + "Capture", e);
  }
  function ln(t, e) {
    for (wo[t] = e, t = 0; t < e.length; t++)
      Do.add(e[t]);
  }
  var H0 = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Uo = {}, Bo = {};
  function L0(t) {
    return R.call(Bo, t) ? !0 : R.call(Uo, t) ? !1 : H0.test(t) ? Bo[t] = !0 : (Uo[t] = !0, !1);
  }
  var Yt = !1;
  function Ho() {
    var t = Yt;
    return Yt = !1, t;
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
  function Al(t, e, l, a) {
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
  function Lo(t) {
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
      var e = Lo(t) ? "checked" : "value";
      t._valueTracker = Y0(
        t,
        e,
        "" + t[e]
      );
    }
  }
  function Yo(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var l = e.getValue(), a = "";
    return t && (a = Lo(t) ? t.checked ? "true" : "false" : t.value), t = a, t !== l ? (e.setValue(t), !0) : !1;
  }
  var q0 = /[\n"\\]/g;
  function Fe(t) {
    return t.replace(
      q0,
      function(e) {
        return "\\" + e.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function jc(t, e, l, a, n, u, i, o) {
    t.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? t.type = i : t.removeAttribute("type"), e != null ? i === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + Ge(e)) : t.value !== "" + Ge(e) && (t.value = "" + Ge(e)) : i !== "submit" && i !== "reset" || t.removeAttribute("value"), e != null ? i === "number" && t.value == e ? Rc(t, Ge(t.value)) : Rc(t, Ge(e)) : l != null ? Rc(t, Ge(l)) : a != null && t.removeAttribute("value"), n == null && u != null && (t.defaultChecked = !!u), n != null && (t.checked = n && typeof n != "function" && typeof n != "symbol"), o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? t.name = "" + Ge(o) : t.removeAttribute("name");
  }
  function qo(t, e, l, a, n, u, i, o) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (t.type = u), e != null || l != null) {
      if (!(u !== "submit" && u !== "reset" || e != null)) {
        Cc(t);
        return;
      }
      l = l != null ? "" + Ge(l) : "", e = e != null ? "" + Ge(e) : l, o || e === t.value || (t.value = e), t.defaultValue = e;
    }
    a = a ?? n, a = typeof a != "function" && typeof a != "symbol" && !!a, t.checked = o ? t.checked : !!a, t.defaultChecked = !!a, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (t.name = i), Cc(t);
  }
  function Rc(t, e) {
    t.defaultValue !== "" + e && (t.defaultValue = "" + e);
  }
  function an(t, e, l, a) {
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
  function Go(t, e, l) {
    if (e != null && (e = "" + Ge(e), e !== t.value && (t.value = e), l == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = l != null ? "" + Ge(l) : "";
  }
  function Xo(t, e, l, a) {
    if (e == null) {
      if (a != null) {
        if (l != null) throw Error(s(92));
        if (st(a)) {
          if (1 < a.length) throw Error(s(93));
          a = a[0];
        }
        l = a;
      }
      l == null && (l = ""), e = l;
    }
    l = Ge(e), t.defaultValue = l, a = t.textContent, a === l && a !== "" && a !== null && (t.value = a), Cc(t);
  }
  function nn(t, e) {
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
  function Vo(t, e, l) {
    var a = e.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? a ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "" : a ? t.setProperty(e, l) : typeof l != "number" || l === 0 || G0.has(e) ? e === "float" ? t.cssFloat = l : t[e] = ("" + l).trim() : t[e] = l + "px";
  }
  function Qo(t, e, l) {
    if (e != null && typeof e != "object")
      throw Error(s(62));
    if (t = t.style, l != null) {
      for (var a in l)
        !l.hasOwnProperty(a) || e != null && e.hasOwnProperty(a) || (a.indexOf("--") === 0 ? t.setProperty(a, "") : a === "float" ? t.cssFloat = "" : t[a] = "", Yt = !0);
      for (var n in e)
        a = e[n], e.hasOwnProperty(n) && l[n] !== a && (Vo(t, n, a), Yt = !0);
    } else
      for (var u in e)
        e.hasOwnProperty(u) && Vo(t, u, e[u]);
  }
  function Dc(t) {
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
  function vl() {
  }
  var wc = null;
  function Uc(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var un = null, cn = null;
  function Zo(t) {
    var e = tn(t);
    if (e && (t = e.stateNode)) {
      var l = t[De] || null;
      t: switch (t = e.stateNode, e.type) {
        case "input":
          if (jc(
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
              'input[name="' + Fe(
                "" + e
              ) + '"][type="radio"]'
            ), e = 0; e < l.length; e++) {
              var a = l[e];
              if (a !== t && a.form === t.form) {
                var n = a[De] || null;
                if (!n) throw Error(s(90));
                jc(
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
              a = l[e], a.form === t.form && Yo(a);
          }
          break t;
        case "textarea":
          Go(t, l.value, l.defaultValue);
          break t;
        case "select":
          e = l.value, e != null && an(t, !!l.multiple, e, !1);
      }
    }
  }
  var Bc = !1;
  function Ko(t, e, l) {
    if (Bc) return t(e, l);
    Bc = !0;
    try {
      var a = t(e);
      return a;
    } finally {
      if (Bc = !1, (un !== null || cn !== null) && (lc(), un && (e = un, t = cn, cn = un = null, Zo(e), t)))
        for (e = 0; e < t.length; e++) Zo(t[e]);
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
  var Cl = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Hc = !1;
  if (Cl)
    try {
      var In = {};
      Object.defineProperty(In, "passive", {
        get: function() {
          Hc = !0;
        }
      }), window.addEventListener("test", In, In), window.removeEventListener("test", In, In);
    } catch {
      Hc = !1;
    }
  var Jl = null, Lc = null, ai = null;
  function Jo() {
    if (ai) return ai;
    var t, e = Lc, l = e.length, a, n = "value" in Jl ? Jl.value : Jl.textContent, u = n.length;
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
  function $o() {
    return !1;
  }
  function Oe(t) {
    function e(l, a, n, u, i) {
      this._reactName = l, this._targetInst = n, this.type = a, this.nativeEvent = u, this.target = i, this.currentTarget = null;
      for (var o in t)
        t.hasOwnProperty(o) && (l = t[o], this[o] = l ? l(u) : u[o]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? ui : $o, this.isPropagationStopped = $o, this;
    }
    return $(e.prototype, {
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
  var $l = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, ii = Oe($l), Pn = $({}, $l, { view: 0, detail: 0 }), Q0 = Oe(Pn), Yc, qc, tu, ci = $({}, Pn, {
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
    getModifierState: Xc,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== tu && (tu && t.type === "mousemove" ? (Yc = t.screenX - tu.screenX, qc = t.screenY - tu.screenY) : qc = Yc = 0, tu = t), Yc);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : qc;
    }
  }), ko = Oe(ci), Z0 = $({}, ci, { dataTransfer: 0 }), K0 = Oe(Z0), J0 = $({}, Pn, { relatedTarget: 0 }), Gc = Oe(J0), $0 = $({}, $l, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), k0 = Oe($0), F0 = $({}, $l, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), W0 = Oe(F0), I0 = $({}, $l, { data: 0 }), Fo = Oe(I0), P0 = {
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
  function Xc() {
    return lv;
  }
  var av = $({}, Pn, {
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
    getModifierState: Xc,
    charCode: function(t) {
      return t.type === "keypress" ? ni(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? ni(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), nv = Oe(av), uv = $({}, ci, {
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
  }), Wo = Oe(uv), iv = $({}, $l, { submitter: 0 }), cv = Oe(iv), sv = $({}, Pn, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Xc
  }), rv = Oe(sv), ov = $({}, $l, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), fv = Oe(ov), dv = $({}, ci, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), mv = Oe(dv), hv = $({}, $l, {
    newState: 0,
    oldState: 0,
    source: 0
  }), vv = Oe(hv), gv = [9, 13, 27, 32], Vc = Cl && "CompositionEvent" in window, eu = null;
  Cl && "documentMode" in document && (eu = document.documentMode);
  var yv = Cl && "TextEvent" in window && !eu, Io = Cl && (!Vc || eu && 8 < eu && 11 >= eu), Po = " ", tf = !1;
  function ef(t, e) {
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
  function lf(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var sn = !1;
  function bv(t, e) {
    switch (t) {
      case "compositionend":
        return lf(e);
      case "keypress":
        return e.which !== 32 ? null : (tf = !0, Po);
      case "textInput":
        return t = e.data, t === Po && tf ? null : t;
      default:
        return null;
    }
  }
  function pv(t, e) {
    if (sn)
      return t === "compositionend" || !Vc && ef(t, e) ? (t = Jo(), ai = Lc = Jl = null, sn = !1, t) : null;
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
        return Io && e.locale !== "ko" ? null : e.data;
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
  function af(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === "input" ? !!Sv[t.type] : e === "textarea";
  }
  function nf(t, e, l, a) {
    un ? cn ? cn.push(a) : cn = [a] : un = a, e = sc(e, "onChange"), 0 < e.length && (l = new ii(
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
    if (Yo(e)) return t;
  }
  function uf(t, e) {
    if (t === "change") return e;
  }
  var cf = !1;
  if (Cl) {
    var Qc;
    if (Cl) {
      var Zc = "oninput" in document;
      if (!Zc) {
        var sf = document.createElement("div");
        sf.setAttribute("oninput", "return;"), Zc = typeof sf.oninput == "function";
      }
      Qc = Zc;
    } else Qc = !1;
    cf = Qc && (!document.documentMode || 9 < document.documentMode);
  }
  function rf() {
    lu && (lu.detachEvent("onpropertychange", of), au = lu = null);
  }
  function of(t) {
    if (t.propertyName === "value" && si(au)) {
      var e = [];
      nf(
        e,
        au,
        t,
        Uc(t)
      ), Ko(_v, e);
    }
  }
  function Ev(t, e, l) {
    t === "focusin" ? (rf(), lu = e, au = l, lu.attachEvent("onpropertychange", of)) : t === "focusout" && rf();
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
      if (!R.call(e, n) || !Xe(t[n], e[n]))
        return !1;
    }
    return !0;
  }
  function Kc(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  function ff(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function df(t, e) {
    var l = ff(t);
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
      l = ff(l);
    }
  }
  function mf(t, e) {
    return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? mf(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
  }
  function hf(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var e = Kc(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var l = typeof e.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) t = e.contentWindow;
      else break;
      e = Kc(t.document);
    }
    return e;
  }
  function Jc(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
  }
  var Ov = Cl && "documentMode" in document && 11 >= document.documentMode, rn = null, $c = null, uu = null, kc = !1;
  function vf(t, e, l) {
    var a = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    kc || rn == null || rn !== Kc(a) || (a = rn, "selectionStart" in a && Jc(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), uu && nu(uu, a) || (uu = a, a = sc($c, "onSelect"), 0 < a.length && (e = new ii(
      "onSelect",
      "select",
      null,
      e,
      l
    ), t.push({ event: e, listeners: a }), e.target = rn)));
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
  }, Fc = {}, gf = {};
  Cl && (gf = document.createElement("div").style, "AnimationEvent" in window || (delete on.animationend.animation, delete on.animationiteration.animation, delete on.animationstart.animation), "TransitionEvent" in window || delete on.transitionend.transition);
  function za(t) {
    if (Fc[t]) return Fc[t];
    if (!on[t]) return t;
    var e = on[t], l;
    for (l in e)
      if (e.hasOwnProperty(l) && l in gf)
        return Fc[t] = e[l];
    return t;
  }
  var yf = za("animationend"), bf = za("animationiteration"), pf = za("animationstart"), zv = za("transitionrun"), Av = za("transitionstart"), Cv = za("transitioncancel"), Sf = za("transitionend"), _f = /* @__PURE__ */ new Map(), Wc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Wc.push("scrollEnd");
  function il(t, e) {
    _f.set(t, e), Ma(e, [t]);
  }
  var jv = 0;
  function jl(t, e) {
    if (t.name != null && t.name !== "auto") return t.name;
    if (e.autoName !== null) return e.autoName;
    t = ol.identifierPrefix;
    var l = jv++;
    return t = "_" + t + "t_" + l.toString(32) + "_", e.autoName = t;
  }
  function Ef(t) {
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
  function Rl(t, e) {
    return t = Ef(t), e = Ef(e), e == null ? t === "auto" ? null : t : e === "auto" ? null : e;
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
  }, We = [], fn = 0, Ic = 0;
  function oi() {
    for (var t = fn, e = Ic = fn = 0; e < t; ) {
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
      u !== 0 && Tf(l, n, u);
    }
  }
  function fi(t, e, l, a) {
    We[fn++] = t, We[fn++] = e, We[fn++] = l, We[fn++] = a, Ic |= a, t.lanes |= a, t = t.alternate, t !== null && (t.lanes |= a);
  }
  function Pc(t, e, l, a) {
    return fi(t, e, l, a), di(t);
  }
  function Aa(t, e) {
    return fi(t, null, null, e), di(t);
  }
  function Tf(t, e, l) {
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
  var dn = {};
  function Rv(t, e, l, a) {
    this.tag = t, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function we(t, e, l, a) {
    return new Rv(t, e, l, a);
  }
  function ts(t) {
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
  function Nf(t, e) {
    t.flags &= 1206910978;
    var l = t.alternate;
    return l === null ? (t.childLanes = 0, t.lanes = e, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = l.childLanes, t.lanes = l.lanes, t.child = l.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = l.memoizedProps, t.memoizedState = l.memoizedState, t.updateQueue = l.updateQueue, t.type = l.type, e = l.dependencies, t.dependencies = e === null ? null : {
      lanes: e.lanes,
      firstContext: e.firstContext
    }), t;
  }
  function mi(t, e, l, a, n, u) {
    var i = 0;
    if (a = t, typeof a == "function") ts(a) && (i = 1);
    else if (typeof a == "string")
      i = iy(
        t,
        l,
        q.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (a) {
        case wt:
          return t = we(31, l, e, n), t.elementType = wt, t.lanes = u, t;
        case gt:
          return Ca(l.children, n, u, e);
        case mt:
          i = 8, n |= 24;
          break;
        case _t:
          return t = we(12, l, e, n | 2), t.elementType = _t, t.lanes = u, t;
        case et:
          return t = we(13, l, e, n), t.elementType = et, t.lanes = u, t;
        case I:
          return t = we(19, l, e, n), t.elementType = I, t.lanes = u, t;
        case qt:
        case y:
          return t = n | 32, t = we(30, l, e, t), t.elementType = y, t.lanes = u, t.stateNode = {
            autoName: null,
            paired: null,
            clones: null,
            ref: null
          }, t;
        default:
          if (typeof a == "object" && a !== null)
            switch (a.$$typeof) {
              case Ct:
                i = 10;
                break t;
              case Et:
                i = 9;
                break t;
              case Y:
                i = 11;
                break t;
              case bt:
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
  function Ca(t, e, l, a) {
    return t = we(7, t, a, e), t.lanes = l, t;
  }
  function es(t, e, l) {
    return t = we(6, t, null, e), t.lanes = l, t;
  }
  function xf(t) {
    var e = we(18, null, null, 0);
    return e.stateNode = t, e;
  }
  function ls(t, e, l) {
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
  var Mf = /* @__PURE__ */ new WeakMap();
  function Ie(t, e) {
    if (typeof t == "object" && t !== null) {
      var l = Mf.get(t);
      return l !== void 0 ? l : (e = {
        value: t,
        source: e,
        stack: Zl(e)
      }, Mf.set(t, e), e);
    }
    return {
      value: t,
      source: e,
      stack: Zl(e)
    };
  }
  var mn = [], hn = 0, hi = null, iu = 0, Pe = [], tl = 0, kl = null, gl = 1, yl = "";
  function wl(t, e) {
    mn[hn++] = iu, mn[hn++] = hi, hi = t, iu = e;
  }
  function Of(t, e, l) {
    Pe[tl++] = gl, Pe[tl++] = yl, Pe[tl++] = kl, kl = t;
    var a = gl;
    t = yl;
    var n = 32 - qe(a) - 1;
    a &= ~(1 << n), l += 1;
    var u = 32 - qe(e) + n;
    if (30 < u) {
      var i = n - n % 5;
      u = (a & (1 << i) - 1).toString(32), a >>= i, n -= i, gl = 1 << 32 - qe(e) + n | l << n | a, yl = u + t;
    } else
      gl = 1 << u | l << n | a, yl = t;
  }
  function vi(t) {
    t.return !== null && (wl(t, 1), Of(t, 1, 0));
  }
  function as(t) {
    for (; t === hi; )
      hi = mn[--hn], mn[hn] = null, iu = mn[--hn], mn[hn] = null;
    for (; t === kl; )
      kl = Pe[--tl], Pe[tl] = null, yl = Pe[--tl], Pe[tl] = null, gl = Pe[--tl], Pe[tl] = null;
  }
  function zf(t, e) {
    Pe[tl++] = gl, Pe[tl++] = yl, Pe[tl++] = kl, gl = e.id, yl = e.overflow, kl = t;
  }
  var he = null, Wt = null, xt = !1, Fl = null, el = !1, ns = Error(s(519));
  function Wl(t) {
    var e = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw cu(Ie(e, t)), ns;
  }
  function Af(t) {
    var e = t.stateNode, l = t.type, a = t.memoizedProps;
    switch (e[be] = t, e[De] = a, l) {
      case "dialog":
        At("cancel", e), At("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        At("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Au.length; l++)
          At(Au[l], e);
        break;
      case "source":
        At("error", e);
        break;
      case "img":
      case "image":
      case "link":
        At("error", e), At("load", e);
        break;
      case "details":
        At("toggle", e);
        break;
      case "input":
        At("invalid", e), qo(
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
        At("invalid", e);
        break;
      case "textarea":
        At("invalid", e), Xo(e, a.value, a.defaultValue, a.children);
    }
    l = a.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || e.textContent === "" + l || a.suppressHydrationWarning === !0 || Fm(e.textContent, l) ? (a.popover != null && (At("beforetoggle", e), At("toggle", e)), a.onScroll != null && At("scroll", e), a.onScrollEnd != null && At("scrollend", e), a.onClick != null && (e.onclick = vl), e = !0) : e = !1, e || Wl(t, !0);
  }
  function gi(t) {
    for (he = t.return; he; )
      switch (he.tag) {
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
          he = he.return;
      }
  }
  function vn(t) {
    if (t !== he) return !1;
    if (!xt) return gi(t), xt = !0, !1;
    var e = t.tag, l;
    if ((l = e !== 3 && e !== 27) && ((l = e === 5) && (l = t.type, l = !(l !== "form" && l !== "button") || wr(t.type, t.memoizedProps)), l = !l), l && Wt && Wl(t), gi(t), e === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      Wt = vh(t);
    } else if (e === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      Wt = vh(t);
    } else
      e === 27 ? (e = Wt, ma(t.type) ? (t = Vr, Vr = null, Wt = t) : Wt = e) : Wt = he ? al(t.stateNode.nextSibling) : null;
    return !0;
  }
  function ja() {
    Wt = he = null, xt = !1;
  }
  function us() {
    var t = Fl;
    return t !== null && (He === null ? He = t : He.push.apply(
      He,
      t
    ), Fl = null), t;
  }
  function cu(t) {
    Fl === null ? Fl = [t] : Fl.push(t);
  }
  var is = kt(null), Ra = null, Ul = null;
  function Il(t, e, l) {
    Ot(is, e._currentValue), e._currentValue = l;
  }
  function Bl(t) {
    t._currentValue = is.current, Xt(is);
  }
  function yi(t, e, l) {
    for (; t !== null; ) {
      var a = t.alternate;
      if ((t.childLanes & e) !== e ? (t.childLanes |= e, a !== null && (a.childLanes |= e)) : a !== null && (a.childLanes & e) !== e && (a.childLanes |= e), t === l) break;
      t = t.return;
    }
  }
  function cs(t, e, l, a) {
    var n = t.child;
    for (n !== null && (n.return = t); n !== null; ) {
      var u = n.dependencies;
      if (u !== null) {
        var i = n.child;
        u = u.firstContext;
        t: for (; u !== null; ) {
          var o = u;
          u = n;
          for (var g = 0; g < e.length; g++)
            if (o.context === e[g]) {
              u.lanes |= l, o = u.alternate, o !== null && (o.lanes |= l), yi(
                u.return,
                l,
                t
              ), a || (i = null);
              break t;
            }
          u = o.next;
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
          var o = n.type;
          Xe(n.pendingProps.value, i.value) || (t !== null ? t.push(o) : t = [o]);
        }
      } else if (n === je.current) {
        if (i = n.alternate, i === null) throw Error(s(387));
        i.memoizedState.memoizedState !== n.memoizedState.memoizedState && (t !== null ? t.push(qn) : t = [qn]);
      }
      n = n.return;
    }
    return t !== null && cs(
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
  function pe(t) {
    return Cf(Ra, t);
  }
  function pi(t, e) {
    return Ra === null && wa(t), Cf(t, e);
  }
  function Cf(t, e) {
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
    $$typeof: Ct,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function ss() {
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
  function jf(t, e) {
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
  var ou = null, rs = 0, Ua = 0, gn = null;
  function Hv(t, e) {
    if (ou === null) {
      var l = ou = [];
      rs = 0, Ua = xr(), gn = {
        status: "pending",
        value: void 0,
        then: function(a) {
          l.push(a);
        }
      };
    }
    return rs++, e.then(Rf, Rf), e;
  }
  function Rf() {
    if (--rs === 0 && (ru = null, ou !== null)) {
      gn !== null && (gn.status = "fulfilled");
      var t = ou;
      ou = null, Ua = 0, gn = null;
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
  var Df = Q.S;
  Q.S = function(t, e) {
    if (xm = ht(), typeof e == "object" && e !== null && typeof e.then == "function" && Hv(t, e), ru !== null)
      for (var l = wn; l !== null; )
        jf(l, ru), l = l.next;
    if (l = t.types, l !== null) {
      for (var a = wn; a !== null; )
        jf(a, l), a = a.next;
      if (Ua !== 0) {
        a = ru, a === null && (a = ru = []);
        for (var n = 0; n < l.length; n++) {
          var u = l[n];
          a.indexOf(u) === -1 && a.push(u);
        }
      }
    }
    Df !== null && Df(t, e);
  };
  var Ba = kt(null);
  function os() {
    var t = Ba.current;
    return t !== null ? t : Ft.pooledCache;
  }
  function Si(t, e) {
    e === null ? Ot(Ba, Ba.current) : Ot(Ba, e.pool);
  }
  function wf() {
    var t = os();
    return t === null ? null : { parent: ce._currentValue, pool: t };
  }
  var yn = Error(s(460)), fs = Error(s(474)), _i = Error(s(542)), Ei = { then: function() {
  } };
  function Uf(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function Bf(t, e, l) {
    switch (l = t[l], l === void 0 ? t.push(e) : l !== e && (e.then(vl, vl), e = l), e.status) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw t = e.reason, Lf(t), t === void 0 && !("reason" in e) ? Error(s(600)) : t;
      default:
        if (typeof e.status == "string") e.then(vl, vl);
        else {
          if (t = Ft, t !== null && 100 < t.shellSuspendCounter)
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
            throw t = e.reason, Lf(t), t;
        }
        throw La = e, yn;
    }
  }
  function Ha(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (La = l, yn) : l;
    }
  }
  var La = null;
  function Hf() {
    if (La === null) throw Error(s(459));
    var t = La;
    return La = null, t;
  }
  function Lf(t) {
    if (t === yn || t === _i)
      throw Error(s(483));
  }
  var bn = null, fu = 0;
  function Ti(t) {
    var e = fu;
    return fu += 1, bn === null && (bn = []), Bf(bn, t, e);
  }
  function Pl(t, e) {
    e = e.props.ref, t.ref = e !== void 0 ? e : null;
  }
  function Ni(t, e) {
    throw e.$$typeof === ft ? Error(s(525)) : (t = Object.prototype.toString.call(e), Error(
      s(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t
      )
    ));
  }
  function Yf(t) {
    function e(E, p) {
      if (t) {
        var M = E.deletions;
        M === null ? (E.deletions = [p], E.flags |= 16) : M.push(p);
      }
    }
    function l(E, p) {
      if (!t) return null;
      for (; p !== null; )
        e(E, p), p = p.sibling;
      return null;
    }
    function a(E) {
      for (var p = /* @__PURE__ */ new Map(); E !== null; )
        E.key === null ? p.set(E.index, E) : p.set(E.key, E), E = E.sibling;
      return p;
    }
    function n(E, p) {
      return E = Dl(E, p), E.index = 0, E.sibling = null, E;
    }
    function u(E, p, M) {
      return E.index = M, t ? (M = E.alternate, M !== null ? (M = M.index, M < p ? (E.flags |= 2, p) : M) : (E.flags |= 134217730, p)) : (E.flags |= 1048576, p);
    }
    function i(E) {
      return t && E.alternate === null && (E.flags |= 134217730), E;
    }
    function o(E, p, M, U) {
      return p === null || p.tag !== 6 ? (p = es(M, E.mode, U), p.return = E, p) : (p = n(p, M), p.return = E, p);
    }
    function g(E, p, M, U) {
      var F = M.type;
      return F === gt ? (E = z(
        E,
        p,
        M.props.children,
        U,
        M.key
      ), Pl(E, M), E) : p !== null && (p.elementType === F || typeof F == "object" && F !== null && F.$$typeof === it && Ha(F) === p.type) ? (p = n(p, M.props), Pl(p, M), p.return = E, p) : (p = mi(
        M.type,
        M.key,
        M.props,
        null,
        E.mode,
        U
      ), Pl(p, M), p.return = E, p);
    }
    function N(E, p, M, U) {
      return p === null || p.tag !== 4 || p.stateNode.containerInfo !== M.containerInfo || p.stateNode.implementation !== M.implementation ? (p = ls(M, E.mode, U), p.return = E, p) : (p = n(p, M.children || []), p.return = E, p);
    }
    function z(E, p, M, U, F) {
      return p === null || p.tag !== 7 ? (p = Ca(
        M,
        E.mode,
        U,
        F
      ), p.return = E, p) : (p = n(p, M), p.return = E, p);
    }
    function B(E, p, M) {
      if (typeof p == "string" && p !== "" || typeof p == "number" || typeof p == "bigint")
        return p = es(
          "" + p,
          E.mode,
          M
        ), p.return = E, p;
      if (typeof p == "object" && p !== null) {
        switch (p.$$typeof) {
          case Jt:
            return M = mi(
              p.type,
              p.key,
              p.props,
              null,
              E.mode,
              M
            ), Pl(M, p), M.return = E, M;
          case at:
            return p = ls(
              p,
              E.mode,
              M
            ), p.return = E, p;
          case it:
            return p = Ha(p), B(E, p, M);
        }
        if (st(p) || P(p))
          return p = Ca(
            p,
            E.mode,
            M,
            null
          ), p.return = E, p;
        if (typeof p.then == "function")
          return B(E, Ti(p), M);
        if (p.$$typeof === Ct)
          return B(
            E,
            pi(E, p),
            M
          );
        Ni(E, p);
      }
      return null;
    }
    function _(E, p, M, U) {
      var F = p !== null ? p.key : null;
      if (typeof M == "string" && M !== "" || typeof M == "number" || typeof M == "bigint")
        return F !== null ? null : o(E, p, "" + M, U);
      if (typeof M == "object" && M !== null) {
        switch (M.$$typeof) {
          case Jt:
            return M.key === F ? g(E, p, M, U) : null;
          case at:
            return M.key === F ? N(E, p, M, U) : null;
          case it:
            return M = Ha(M), _(E, p, M, U);
        }
        if (st(M) || P(M))
          return F !== null ? null : z(E, p, M, U, null);
        if (typeof M.then == "function")
          return _(
            E,
            p,
            Ti(M),
            U
          );
        if (M.$$typeof === Ct)
          return _(
            E,
            p,
            pi(E, M),
            U
          );
        Ni(E, M);
      }
      return null;
    }
    function O(E, p, M, U, F) {
      if (typeof U == "string" && U !== "" || typeof U == "number" || typeof U == "bigint")
        return E = E.get(M) || null, o(p, E, "" + U, F);
      if (typeof U == "object" && U !== null) {
        switch (U.$$typeof) {
          case Jt:
            return E = E.get(
              U.key === null ? M : U.key
            ) || null, g(p, E, U, F);
          case at:
            return E = E.get(
              U.key === null ? M : U.key
            ) || null, N(p, E, U, F);
          case it:
            return U = Ha(U), O(
              E,
              p,
              M,
              U,
              F
            );
        }
        if (st(U) || P(U))
          return E = E.get(M) || null, z(p, E, U, F, null);
        if (typeof U.then == "function")
          return O(
            E,
            p,
            M,
            Ti(U),
            F
          );
        if (U.$$typeof === Ct)
          return O(
            E,
            p,
            M,
            pi(p, U),
            F
          );
        Ni(p, U);
      }
      return null;
    }
    function V(E, p, M, U) {
      for (var F = null, Dt = null, lt = p, ct = p = 0, oe = null; lt !== null && ct < M.length; ct++) {
        lt.index > ct ? (oe = lt, lt = null) : oe = lt.sibling;
        var Ut = _(
          E,
          lt,
          M[ct],
          U
        );
        if (Ut === null) {
          lt === null && (lt = oe);
          break;
        }
        t && lt && Ut.alternate === null && e(E, lt), p = u(Ut, p, ct), Dt === null ? F = Ut : Dt.sibling = Ut, Dt = Ut, lt = oe;
      }
      if (ct === M.length)
        return l(E, lt), xt && wl(E, ct), F;
      if (lt === null) {
        for (; ct < M.length; ct++)
          lt = B(E, M[ct], U), lt !== null && (p = u(
            lt,
            p,
            ct
          ), Dt === null ? F = lt : Dt.sibling = lt, Dt = lt);
        return xt && wl(E, ct), F;
      }
      for (lt = a(lt); ct < M.length; ct++)
        oe = O(
          lt,
          E,
          ct,
          M[ct],
          U
        ), oe !== null && (t && (Ut = oe.alternate, Ut !== null && lt.delete(Ut.key === null ? ct : Ut.key)), p = u(
          oe,
          p,
          ct
        ), Dt === null ? F = oe : Dt.sibling = oe, Dt = oe);
      return t && lt.forEach(function(ba) {
        return e(E, ba);
      }), xt && wl(E, ct), F;
    }
    function tt(E, p, M, U) {
      if (M == null) throw Error(s(151));
      for (var F = null, Dt = null, lt = p, ct = p = 0, oe = null, Ut = M.next(); lt !== null && !Ut.done; ct++, Ut = M.next()) {
        lt.index > ct ? (oe = lt, lt = null) : oe = lt.sibling;
        var ba = _(E, lt, Ut.value, U);
        if (ba === null) {
          lt === null && (lt = oe);
          break;
        }
        t && lt && ba.alternate === null && e(E, lt), p = u(ba, p, ct), Dt === null ? F = ba : Dt.sibling = ba, Dt = ba, lt = oe;
      }
      if (Ut.done)
        return l(E, lt), xt && wl(E, ct), F;
      if (lt === null) {
        for (; !Ut.done; ct++, Ut = M.next())
          Ut = B(E, Ut.value, U), Ut !== null && (p = u(Ut, p, ct), Dt === null ? F = Ut : Dt.sibling = Ut, Dt = Ut);
        return xt && wl(E, ct), F;
      }
      for (lt = a(lt); !Ut.done; ct++, Ut = M.next())
        Ut = O(lt, E, ct, Ut.value, U), Ut !== null && (t && (oe = Ut.alternate, oe !== null && lt.delete(
          oe.key === null ? ct : oe.key
        )), p = u(Ut, p, ct), Dt === null ? F = Ut : Dt.sibling = Ut, Dt = Ut);
      return t && lt.forEach(function(by) {
        return e(E, by);
      }), xt && wl(E, ct), F;
    }
    function St(E, p, M, U) {
      if (typeof M == "object" && M !== null && M.type === gt && M.key === null && M.props.ref === void 0 && (M = M.props.children), typeof M == "object" && M !== null) {
        switch (M.$$typeof) {
          case Jt:
            t: {
              for (var F = M.key; p !== null; ) {
                if (p.key === F) {
                  if (F = M.type, F === gt) {
                    if (p.tag === 7) {
                      l(
                        E,
                        p.sibling
                      ), U = n(
                        p,
                        M.props.children
                      ), Pl(U, M), U.return = E, E = U;
                      break t;
                    }
                  } else if (p.elementType === F || typeof F == "object" && F !== null && F.$$typeof === it && Ha(F) === p.type) {
                    l(
                      E,
                      p.sibling
                    ), U = n(p, M.props), Pl(U, M), U.return = E, E = U;
                    break t;
                  }
                  l(E, p);
                  break;
                } else e(E, p);
                p = p.sibling;
              }
              M.type === gt ? (U = Ca(
                M.props.children,
                E.mode,
                U,
                M.key
              ), Pl(U, M), U.return = E, E = U) : (U = mi(
                M.type,
                M.key,
                M.props,
                null,
                E.mode,
                U
              ), Pl(U, M), U.return = E, E = U);
            }
            return i(E);
          case at:
            t: {
              for (F = M.key; p !== null; ) {
                if (p.key === F)
                  if (p.tag === 4 && p.stateNode.containerInfo === M.containerInfo && p.stateNode.implementation === M.implementation) {
                    l(
                      E,
                      p.sibling
                    ), U = n(p, M.children || []), U.return = E, E = U;
                    break t;
                  } else {
                    l(E, p);
                    break;
                  }
                else e(E, p);
                p = p.sibling;
              }
              U = ls(M, E.mode, U), U.return = E, E = U;
            }
            return i(E);
          case it:
            return M = Ha(M), St(
              E,
              p,
              M,
              U
            );
        }
        if (st(M))
          return V(
            E,
            p,
            M,
            U
          );
        if (P(M)) {
          if (F = P(M), typeof F != "function") throw Error(s(150));
          return M = F.call(M), tt(
            E,
            p,
            M,
            U
          );
        }
        if (typeof M.then == "function")
          return St(
            E,
            p,
            Ti(M),
            U
          );
        if (M.$$typeof === Ct)
          return St(
            E,
            p,
            pi(E, M),
            U
          );
        Ni(E, M);
      }
      return typeof M == "string" && M !== "" || typeof M == "number" || typeof M == "bigint" ? (M = "" + M, p !== null && p.tag === 6 ? (l(E, p.sibling), U = n(p, M), U.return = E, E = U) : (l(E, p), U = es(M, E.mode, U), U.return = E, E = U), i(E)) : l(E, p);
    }
    return function(E, p, M, U) {
      try {
        fu = 0;
        var F = St(
          E,
          p,
          M,
          U
        );
        return bn = null, F;
      } catch (lt) {
        if (lt === yn || lt === _i) throw lt;
        var Dt = we(29, lt, null, E.mode);
        return Dt.lanes = U, Dt.return = E, Dt;
      }
    };
  }
  var Ya = Yf(!0), qf = Yf(!1), ta = !1;
  function ds(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function ms(t, e) {
    t = t.updateQueue, e.updateQueue === t && (e.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function ea(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function la(t, e, l) {
    var a = t.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (Gt & 2) !== 0) {
      var n = a.pending;
      return n === null ? e.next = e : (e.next = n.next, n.next = e), a.pending = e, e = di(t), Tf(t, null, l), e;
    }
    return fi(t, a, e, l), di(t);
  }
  function du(t, e, l) {
    if (e = e.updateQueue, e !== null && (e = e.shared, (l & 4194048) !== 0)) {
      var a = e.lanes;
      a &= t.pendingLanes, l |= a, e.lanes = l, Mo(t, l);
    }
  }
  function hs(t, e) {
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
  var vs = !1;
  function mu() {
    if (vs) {
      var t = gn;
      if (t !== null) throw t;
    }
  }
  function hu(t, e, l, a) {
    vs = !1;
    var n = t.updateQueue;
    ta = !1;
    var u = n.firstBaseUpdate, i = n.lastBaseUpdate, o = n.shared.pending;
    if (o !== null) {
      n.shared.pending = null;
      var g = o, N = g.next;
      g.next = null, i === null ? u = N : i.next = N, i = g;
      var z = t.alternate;
      z !== null && (z = z.updateQueue, o = z.lastBaseUpdate, o !== i && (o === null ? z.firstBaseUpdate = N : o.next = N, z.lastBaseUpdate = g));
    }
    if (u !== null) {
      var B = n.baseState;
      i = 0, z = N = g = null, o = u;
      do {
        var _ = o.lane & -536870913, O = _ !== o.lane;
        if (O ? (Rt & _) === _ : (a & _) === _) {
          _ !== 0 && _ === Ua && (vs = !0), z !== null && (z = z.next = {
            lane: 0,
            tag: o.tag,
            payload: o.payload,
            callback: null,
            next: null
          });
          t: {
            var V = t, tt = o;
            _ = e;
            var St = l;
            switch (tt.tag) {
              case 1:
                if (V = tt.payload, typeof V == "function") {
                  B = V.call(St, B, _);
                  break t;
                }
                B = V;
                break t;
              case 3:
                V.flags = V.flags & -65537 | 128;
              case 0:
                if (V = tt.payload, _ = typeof V == "function" ? V.call(St, B, _) : V, _ == null) break t;
                B = $({}, B, _);
                break t;
              case 2:
                ta = !0;
            }
          }
          _ = o.callback, _ !== null && (t.flags |= 64, O && (t.flags |= 8192), O = n.callbacks, O === null ? n.callbacks = [_] : O.push(_));
        } else
          O = {
            lane: _,
            tag: o.tag,
            payload: o.payload,
            callback: o.callback,
            next: null
          }, z === null ? (N = z = O, g = B) : z = z.next = O, i |= _;
        if (o = o.next, o === null) {
          if (o = n.shared.pending, o === null)
            break;
          O = o, o = O.next, O.next = null, n.lastBaseUpdate = O, n.shared.pending = null;
        }
      } while (!0);
      z === null && (g = B), n.baseState = g, n.firstBaseUpdate = N, n.lastBaseUpdate = z, u === null && (n.shared.lanes = 0), ra |= i, t.lanes = i, t.memoizedState = B;
    }
  }
  function Gf(t, e) {
    if (typeof t != "function")
      throw Error(s(191, t));
    t.call(e);
  }
  function Xf(t, e) {
    var l = t.callbacks;
    if (l !== null)
      for (t.callbacks = null, t = 0; t < l.length; t++)
        Gf(l[t], e);
  }
  var aa = kt(null), xi = kt(0);
  function Vf(t, e) {
    t = Gl, Ot(xi, t), Ot(aa, e), Gl = t | e.baseLanes;
  }
  function gs() {
    Ot(xi, Gl), Ot(aa, aa.current);
  }
  function ys() {
    Gl = xi.current, Xt(aa), Xt(xi);
  }
  var Se = kt(null), xe = null;
  function na(t) {
    var e = t.alternate;
    Ot(_e, _e.current & 1), Ot(Se, t), xe === null && (e === null || aa.current !== null || e.memoizedState !== null) && (xe = t);
  }
  function bs(t) {
    Ot(_e, _e.current), Ot(Se, t), xe === null && (xe = t);
  }
  function Qf(t) {
    t.tag === 22 ? (Ot(_e, _e.current), Ot(Se, t), xe === null && (xe = t)) : ua();
  }
  function ua() {
    Ot(_e, _e.current), Ot(Se, Se.current);
  }
  function Ve(t) {
    Xt(Se), xe === t && (xe = null), Xt(_e);
  }
  var _e = kt(0);
  function vu(t, e) {
    Ot(Se, Se.current), Ot(_e, e);
  }
  function ps(t) {
    Xt(_e), Xt(Se), xe === t && (xe = null);
  }
  function Mi(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var l = e.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || Gr(l) || Xr(l)))
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
  var Hl = 0, pt = null, $t = null, se = null, Oi = !1, pn = !1, qa = !1, zi = 0, gu = 0, Sn = null, Yv = 0;
  function le() {
    throw Error(s(321));
  }
  function Ss(t, e) {
    if (e === null) return !1;
    for (var l = 0; l < e.length && l < t.length; l++)
      if (!Xe(t[l], e[l])) return !1;
    return !0;
  }
  function _s(t, e, l, a, n, u) {
    return Hl = u, pt = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, Q.H = t === null || t.memoizedState === null ? Od : zd, qa = !1, u = l(a, n), qa = !1, pn && (u = Kf(
      e,
      l,
      a,
      n
    )), Zf(t), u;
  }
  function Zf(t) {
    Q.H = Ui;
    var e = $t !== null && $t.next !== null;
    if (Hl = 0, se = $t = pt = null, Oi = !1, gu = 0, Sn = null, e) throw Error(s(300));
    t === null || re || (t = t.dependencies, t !== null && bi(t) && (re = !0));
  }
  function Kf(t, e, l, a) {
    pt = t;
    var n = 0;
    do {
      if (pn && (Sn = null), gu = 0, pn = !1, 25 <= n) throw Error(s(301));
      if (n += 1, se = $t = null, t.updateQueue != null) {
        var u = t.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      Q.H = Jv, u = e(l, a);
    } while (pn);
    return u;
  }
  function qv() {
    var t = Q.H, e = t.useState()[0];
    return e = typeof e.then == "function" ? yu(e) : e, t = t.useState()[0], ($t !== null ? $t.memoizedState : null) !== t && (pt.flags |= 1024), e;
  }
  function Es() {
    var t = zi !== 0;
    return zi = 0, t;
  }
  function Ts(t, e, l) {
    e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~l;
  }
  function Ns(t) {
    if (Oi) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        e !== null && (e.pending = null), t = t.next;
      }
      Oi = !1;
    }
    Hl = 0, se = $t = pt = null, pn = !1, gu = zi = 0, Sn = null;
  }
  function ze() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return se === null ? pt.memoizedState = se = t : se = se.next = t, se;
  }
  function ue() {
    if ($t === null) {
      var t = pt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = $t.next;
    var e = se === null ? pt.memoizedState : se.next;
    if (e !== null)
      se = e, $t = t;
    else {
      if (t === null)
        throw pt.alternate === null ? Error(s(467)) : Error(s(310));
      $t = t, t = {
        memoizedState: $t.memoizedState,
        baseState: $t.baseState,
        baseQueue: $t.baseQueue,
        queue: $t.queue,
        next: null
      }, se === null ? pt.memoizedState = se = t : se = se.next = t;
    }
    return se;
  }
  function Ai() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function yu(t) {
    var e = gu;
    return gu += 1, Sn === null && (Sn = []), t = Bf(Sn, t, e), e = pt, (se === null ? e.memoizedState : se.next) === null && (e = e.alternate, Q.H = e === null || e.memoizedState === null ? Od : zd), t;
  }
  function Ci(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return yu(t);
      if (t.$$typeof === C) return;
      if (t.$$typeof === Ct) return pe(t);
    }
    throw Error(s(438, String(t)));
  }
  function xs(t) {
    var e = null, l = pt.updateQueue;
    if (l !== null && (e = l.memoCache), e == null) {
      var a = pt.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (e = {
        data: a.data.map(function(n) {
          return n.slice();
        }),
        index: 0
      })));
    }
    if (e == null && (e = { data: [], index: 0 }), l === null && (l = Ai(), pt.updateQueue = l), l.memoCache = e, l = e.data[e.index], l === void 0)
      for (l = e.data[e.index] = Array(t), a = 0; a < t; a++)
        l[a] = W;
    return e.index++, l;
  }
  function Ll(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function ji(t) {
    var e = ue();
    return Ms(e, $t, t);
  }
  function Ms(t, e, l) {
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
      var o = i = null, g = null, N = e, z = !1;
      do {
        var B = N.lane & -536870913;
        if (B !== N.lane ? (Rt & B) === B : (Hl & B) === B) {
          var _ = N.revertLane;
          if (_ === 0)
            g !== null && (g = g.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: N.action,
              hasEagerState: N.hasEagerState,
              eagerState: N.eagerState,
              next: null
            }), B === Ua && (z = !0);
          else if ((Hl & _) === _) {
            N = N.next, _ === Ua && (z = !0);
            continue;
          } else
            B = {
              lane: 0,
              revertLane: N.revertLane,
              gesture: null,
              action: N.action,
              hasEagerState: N.hasEagerState,
              eagerState: N.eagerState,
              next: null
            }, g === null ? (o = g = B, i = u) : g = g.next = B, pt.lanes |= _, ra |= _;
          B = N.action, qa && l(u, B), u = N.hasEagerState ? N.eagerState : l(u, B);
        } else
          _ = {
            lane: B,
            revertLane: N.revertLane,
            gesture: N.gesture,
            action: N.action,
            hasEagerState: N.hasEagerState,
            eagerState: N.eagerState,
            next: null
          }, g === null ? (o = g = _, i = u) : g = g.next = _, pt.lanes |= B, ra |= B;
        N = N.next;
      } while (N !== null && N !== e);
      if (g === null ? i = u : g.next = o, !Xe(u, t.memoizedState) && (re = !0, z && (l = gn, l !== null)))
        throw l;
      t.memoizedState = u, t.baseState = i, t.baseQueue = g, a.lastRenderedState = u;
    }
    return n === null && (a.lanes = 0), [t.memoizedState, a.dispatch];
  }
  function Os(t) {
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
  function Jf(t, e, l) {
    var a = pt, n = ue(), u = xt;
    if (u) {
      if (l === void 0) throw Error(s(407));
      l = l();
    } else l = e();
    var i = !Xe(
      ($t || n).memoizedState,
      l
    );
    if (i && (n.memoizedState = l, re = !0), n = n.queue, Cs(Ff.bind(null, a, n, t), [
      t
    ]), t = n.getSnapshot !== e || i || se !== null && (se.memoizedState.tag & 1) !== 0, _n(
      t ? 9 : 8,
      { destroy: void 0 },
      kf.bind(null, a, n, l, e),
      null
    ), t) {
      if (a.flags |= 2048, Ft === null) throw Error(s(349));
      u || (Hl & 127) !== 0 || $f(a, e, l);
    }
    return l;
  }
  function $f(t, e, l) {
    t.flags |= 16384, t = { getSnapshot: e, value: l }, e = pt.updateQueue, e === null ? (e = Ai(), pt.updateQueue = e, e.stores = [t]) : (l = e.stores, l === null ? e.stores = [t] : l.push(t));
  }
  function kf(t, e, l, a) {
    e.value = l, e.getSnapshot = a, Wf(e) && If(t);
  }
  function Ff(t, e, l) {
    return l(function() {
      Wf(e) && If(t);
    });
  }
  function Wf(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var l = e();
      return !Xe(t, l);
    } catch {
      return !0;
    }
  }
  function If(t) {
    var e = Aa(t, 2);
    e !== null && Le(e, t, 2);
  }
  function zs(t) {
    var e = ze();
    if (typeof t == "function") {
      var l = t;
      if (t = l(), qa) {
        Kl(!0);
        try {
          l();
        } finally {
          Kl(!1);
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
  function Pf(t, e, l, a) {
    return t.baseState = l, Ms(
      t,
      $t,
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
      Q.T !== null ? l(!0) : u.isTransition = !1, a(u), l = e.pending, l === null ? (u.next = e.pending = u, td(e, u)) : (u.next = l.next, e.pending = l.next = u);
    }
  }
  function td(t, e) {
    var l = e.action, a = e.payload, n = t.state;
    if (e.isTransition) {
      var u = Q.T, i = {};
      i.types = u !== null ? u.types : null, Q.T = i;
      try {
        var o = l(n, a), g = Q.S;
        g !== null && g(i, o), ed(t, e, o);
      } catch (N) {
        As(t, e, N);
      } finally {
        u !== null && i.types !== null && (u.types = i.types), Q.T = u;
      }
    } else
      try {
        u = l(n, a), ed(t, e, u);
      } catch (N) {
        As(t, e, N);
      }
  }
  function ed(t, e, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(a) {
        ld(t, e, a);
      },
      function(a) {
        return As(t, e, a);
      }
    ) : ld(t, e, l);
  }
  function ld(t, e, l) {
    e.status = "fulfilled", e.value = l, ad(e), t.state = l, e = t.pending, e !== null && (l = e.next, l === e ? t.pending = null : (l = l.next, e.next = l, td(t, l)));
  }
  function As(t, e, l) {
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
    if (xt) {
      var l = Ft.formState;
      if (l !== null) {
        t: {
          var a = pt;
          if (xt) {
            if (Wt) {
              e: {
                for (var n = Wt, u = el; n.nodeType !== 8; ) {
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
                Wt = al(
                  n.nextSibling
                ), a = n.data === "F!";
                break t;
              }
            }
            Wl(a);
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
      pt,
      a
    ), a.dispatch = l, a = zs(!1), u = Us.bind(
      null,
      pt,
      !1,
      a.queue
    ), a = ze(), n = {
      state: e,
      dispatch: null,
      action: t,
      pending: null
    }, a.queue = n, l = Gv.bind(
      null,
      pt,
      n,
      u,
      l
    ), n.dispatch = l, a.memoizedState = t, [e, l, !1];
  }
  function id(t) {
    var e = ue();
    return cd(e, $t, t);
  }
  function cd(t, e, l) {
    if (e = Ms(
      t,
      e,
      nd
    )[0], t = ji(Ll)[0], typeof e == "object" && e !== null && typeof e.then == "function")
      try {
        var a = yu(e);
      } catch (i) {
        throw i === yn ? _i : i;
      }
    else a = e;
    e = ue();
    var n = e.queue, u = n.dispatch;
    return l !== e.memoizedState && (pt.flags |= 2048, _n(
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
    var e = ue(), l = $t;
    if (l !== null)
      return cd(e, l, t);
    ue(), e = e.memoizedState, l = ue();
    var a = l.queue.dispatch;
    return l.memoizedState = t, [e, a, !1];
  }
  function _n(t, e, l, a) {
    return t = { tag: t, create: l, deps: a, inst: e, next: null }, e = pt.updateQueue, e === null && (e = Ai(), pt.updateQueue = e), l = e.lastEffect, l === null ? e.lastEffect = t.next = t : (a = l.next, l.next = t, t.next = a, e.lastEffect = t), t;
  }
  function rd() {
    return ue().memoizedState;
  }
  function Ri(t, e, l, a) {
    var n = ze();
    pt.flags |= t, n.memoizedState = _n(
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
    $t !== null && a !== null && Ss(a, $t.memoizedState.deps) ? n.memoizedState = _n(e, u, l, a) : (pt.flags |= t, n.memoizedState = _n(
      1 | e,
      u,
      l,
      a
    ));
  }
  function od(t, e) {
    Ri(8390656, 8, t, e);
  }
  function Cs(t, e) {
    Di(2048, 8, t, e);
  }
  function Vv(t) {
    pt.flags |= 4;
    var e = pt.updateQueue;
    if (e === null)
      e = Ai(), pt.updateQueue = e, e.events = [t];
    else {
      var l = e.events;
      l === null ? e.events = [t] : l.push(t);
    }
  }
  function fd(t) {
    var e = ue().memoizedState;
    return Vv({ ref: e, nextImpl: t }), function() {
      if ((Gt & 2) !== 0) throw Error(s(440));
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
  function js() {
  }
  function gd(t, e) {
    var l = ue();
    e = e === void 0 ? null : e;
    var a = l.memoizedState;
    return e !== null && Ss(e, a[1]) ? a[0] : (l.memoizedState = [t, e], t);
  }
  function yd(t, e) {
    var l = ue();
    e = e === void 0 ? null : e;
    var a = l.memoizedState;
    if (e !== null && Ss(e, a[1]))
      return a[0];
    if (a = t(), qa) {
      Kl(!0);
      try {
        t();
      } finally {
        Kl(!1);
      }
    }
    return l.memoizedState = [a, e], a;
  }
  function Rs(t, e, l) {
    return l === void 0 || (Hl & 1073741824) !== 0 && (Rt & 261930) === 0 ? t.memoizedState = e : (t.memoizedState = l, t = Om(), pt.lanes |= t, ra |= t, l);
  }
  function bd(t, e, l, a) {
    return Xe(l, e) ? l : aa.current !== null ? (t = Rs(t, l, a), Xe(t, e) || (re = !0), t) : (Hl & 106) === 0 || (Hl & 1073741824) !== 0 && (Rt & 261930) === 0 ? (re = !0, t.memoizedState = l) : (t = Om(), pt.lanes |= t, ra |= t, e);
  }
  function pd(t, e, l, a, n) {
    var u = ut.p;
    ut.p = u !== 0 && 8 > u ? u : 8;
    var i = Q.T, o = {};
    o.types = i !== null ? i.types : null, Q.T = o, Us(t, !1, e, l);
    try {
      var g = n(), N = Q.S;
      if (N !== null && N(o, g), g !== null && typeof g == "object" && typeof g.then == "function") {
        var z = Lv(
          g,
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
    } catch (B) {
      bu(
        t,
        e,
        { then: function() {
        }, status: "rejected", reason: B },
        Je()
      );
    } finally {
      ut.p = u, i !== null && o.types !== null && (i.types = o.types), Q.T = i;
    }
  }
  function Qv() {
  }
  function Ds(t, e, l, a) {
    if (t.tag !== 5) throw Error(s(476));
    var n = Sd(t).queue;
    pd(
      t,
      n,
      e,
      ee,
      l === null ? Qv : function() {
        return _d(t), l(a);
      }
    );
  }
  function Sd(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: ee,
      baseState: ee,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ll,
        lastRenderedState: ee
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
  function ws() {
    return pe(qn);
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
          t = ea(l);
          var a = la(e, t, l);
          a !== null && (Le(a, e, l), du(a, e, l)), e = { cache: ss() }, t.payload = e;
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
    }, wi(t) ? xd(e, l) : (l = Pc(t, e, l, a), l !== null && (Le(l, t, a), Md(l, e, a)));
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
          var i = e.lastRenderedState, o = u(i, l);
          if (n.hasEagerState = !0, n.eagerState = o, Xe(o, i))
            return fi(t, e, n, 0), Ft === null && oi(), !1;
        } catch {
        }
      if (l = Pc(t, e, n, a), l !== null)
        return Le(l, t, a), Md(l, e, a), !0;
    }
    return !1;
  }
  function Us(t, e, l, a) {
    if (a = {
      lane: 2,
      revertLane: xr(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, wi(t)) {
      if (e) throw Error(s(479));
    } else
      e = Pc(
        t,
        l,
        a,
        2
      ), e !== null && Le(e, t, 2);
  }
  function wi(t) {
    var e = t.alternate;
    return t === pt || e !== null && e === pt;
  }
  function xd(t, e) {
    pn = Oi = !0;
    var l = t.pending;
    l === null ? e.next = e : (e.next = l.next, l.next = e), t.pending = e;
  }
  function Md(t, e, l) {
    if ((l & 4194048) !== 0) {
      var a = e.lanes;
      a &= t.pendingLanes, l |= a, e.lanes = l, Mo(t, l);
    }
  }
  var Ui = {
    readContext: pe,
    use: Ci,
    useCallback: le,
    useContext: le,
    useEffect: le,
    useImperativeHandle: le,
    useLayoutEffect: le,
    useInsertionEffect: le,
    useMemo: le,
    useReducer: le,
    useRef: le,
    useState: le,
    useDebugValue: le,
    useDeferredValue: le,
    useTransition: le,
    useSyncExternalStore: le,
    useId: le,
    useHostTransitionStatus: le,
    useFormState: le,
    useActionState: le,
    useOptimistic: le,
    useMemoCache: le,
    useCacheRefresh: le,
    useEffectEvent: le
  }, Od = {
    readContext: pe,
    use: Ci,
    useCallback: function(t, e) {
      return ze().memoizedState = [
        t,
        e === void 0 ? null : e
      ], t;
    },
    useContext: pe,
    useEffect: od,
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
      var l = ze();
      e = e === void 0 ? null : e;
      var a = t();
      if (qa) {
        Kl(!0);
        try {
          t();
        } finally {
          Kl(!1);
        }
      }
      return l.memoizedState = [a, e], a;
    },
    useReducer: function(t, e, l) {
      var a = ze();
      if (l !== void 0) {
        var n = l(e);
        if (qa) {
          Kl(!0);
          try {
            l(e);
          } finally {
            Kl(!1);
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
        pt,
        t
      ), [a.memoizedState, t];
    },
    useRef: function(t) {
      var e = ze();
      return t = { current: t }, e.memoizedState = t;
    },
    useState: function(t) {
      t = zs(t);
      var e = t.queue, l = Nd.bind(null, pt, e);
      return e.dispatch = l, [t.memoizedState, l];
    },
    useDebugValue: js,
    useDeferredValue: function(t, e) {
      var l = ze();
      return Rs(l, t, e);
    },
    useTransition: function() {
      var t = zs(!1);
      return t = pd.bind(
        null,
        pt,
        t.queue,
        !0,
        !1
      ), ze().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, e, l) {
      var a = pt, n = ze();
      if (xt) {
        if (l === void 0)
          throw Error(s(407));
        l = l();
      } else {
        if (l = e(), Ft === null)
          throw Error(s(349));
        (Rt & 127) !== 0 || $f(a, e, l);
      }
      n.memoizedState = l;
      var u = { value: l, getSnapshot: e };
      return n.queue = u, od(Ff.bind(null, a, u, t), [
        t
      ]), a.flags |= 2048, _n(
        9,
        { destroy: void 0 },
        kf.bind(
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
      var t = ze(), e = Ft.identifierPrefix;
      if (xt) {
        var l = yl, a = gl;
        l = (a & ~(1 << 32 - qe(a) - 1)).toString(32) + l, e = "_" + e + "R_" + l, l = zi++, 0 < l && (e += "H" + l.toString(32)), e += "_";
      } else
        l = Yv++, e = "_" + e + "r_" + l.toString(32) + "_";
      return t.memoizedState = e;
    },
    useHostTransitionStatus: ws,
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
      return e.queue = l, e = Us.bind(
        null,
        pt,
        !0,
        l
      ), l.dispatch = e, [t, e];
    },
    useMemoCache: xs,
    useCacheRefresh: function() {
      return ze().memoizedState = Zv.bind(
        null,
        pt
      );
    },
    useEffectEvent: function(t) {
      var e = ze(), l = { impl: t };
      return e.memoizedState = l, function() {
        if ((Gt & 2) !== 0)
          throw Error(s(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, zd = {
    readContext: pe,
    use: Ci,
    useCallback: gd,
    useContext: pe,
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
    useDebugValue: js,
    useDeferredValue: function(t, e) {
      var l = ue();
      return bd(
        l,
        $t.memoizedState,
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
    useSyncExternalStore: Jf,
    useId: Ed,
    useHostTransitionStatus: ws,
    useFormState: id,
    useActionState: id,
    useOptimistic: function(t, e) {
      var l = ue();
      return Pf(l, $t, t, e);
    },
    useMemoCache: xs,
    useCacheRefresh: Td,
    useEffectEvent: fd
  }, Jv = {
    readContext: pe,
    use: Ci,
    useCallback: gd,
    useContext: pe,
    useEffect: Cs,
    useImperativeHandle: vd,
    useInsertionEffect: dd,
    useLayoutEffect: md,
    useMemo: yd,
    useReducer: Os,
    useRef: rd,
    useState: function() {
      return Os(Ll);
    },
    useDebugValue: js,
    useDeferredValue: function(t, e) {
      var l = ue();
      return $t === null ? Rs(l, t, e) : bd(
        l,
        $t.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = Os(Ll)[0], e = ue().memoizedState;
      return [
        typeof t == "boolean" ? t : yu(t),
        e
      ];
    },
    useSyncExternalStore: Jf,
    useId: Ed,
    useHostTransitionStatus: ws,
    useFormState: sd,
    useActionState: sd,
    useOptimistic: function(t, e) {
      var l = ue();
      return $t !== null ? Pf(l, $t, t, e) : (l.baseState = t, [t, l.queue.dispatch]);
    },
    useMemoCache: xs,
    useCacheRefresh: Td,
    useEffectEvent: fd
  };
  function Bs(t, e, l, a) {
    e = t.memoizedState, l = l(a, e), l = l == null ? e : $({}, e, l), t.memoizedState = l, t.lanes === 0 && (t.updateQueue.baseState = l);
  }
  var Hs = {
    enqueueSetState: function(t, e, l) {
      t = t._reactInternals;
      var a = Je(), n = ea(a);
      n.payload = e, l != null && (n.callback = l), e = la(t, n, a), e !== null && (Le(e, t, a), du(e, t, a));
    },
    enqueueReplaceState: function(t, e, l) {
      t = t._reactInternals;
      var a = Je(), n = ea(a);
      n.tag = 1, n.payload = e, l != null && (n.callback = l), e = la(t, n, a), e !== null && (Le(e, t, a), du(e, t, a));
    },
    enqueueForceUpdate: function(t, e) {
      t = t._reactInternals;
      var l = Je(), a = ea(l);
      a.tag = 2, e != null && (a.callback = e), e = la(t, a, l), e !== null && (Le(e, t, l), du(e, t, l));
    }
  };
  function Ad(t, e, l, a, n, u, i) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(a, u, i) : e.prototype && e.prototype.isPureReactComponent ? !nu(l, a) || !nu(n, u) : !0;
  }
  function Cd(t, e, l, a) {
    t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(l, a), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(l, a), e.state !== t && Hs.enqueueReplaceState(e, e.state, null);
  }
  function Ga(t, e) {
    var l = e;
    if ("ref" in e) {
      l = {};
      for (var a in e)
        a !== "ref" && (l[a] = e[a]);
    }
    if (t = t.defaultProps) {
      l === e && (l = $({}, l));
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
  function Ls(t, e, l) {
    return l = ea(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      Bi(t, e);
    }, l;
  }
  function Ud(t) {
    return t = ea(t), t.tag = 3, t;
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
      wd(e, l, a), typeof n != "function" && (oa === null ? oa = /* @__PURE__ */ new Set([this]) : oa.add(this));
      var o = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: o !== null ? o : ""
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
      ), l = Se.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
          case 19:
            return xe === null ? ac() : l.alternate === null && ae === 0 && (ae = 3), l.flags &= -257, l.flags |= 65536, l.lanes = n, a === Ei ? l.flags |= 16384 : (e = l.updateQueue, e === null ? l.updateQueue = /* @__PURE__ */ new Set([a]) : e.add(a), Er(t, a, n)), !1;
          case 22:
            return l.flags |= 65536, a === Ei ? l.flags |= 16384 : (e = l.updateQueue, e === null ? (e = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, l.updateQueue = e) : (l = e.retryQueue, l === null ? e.retryQueue = /* @__PURE__ */ new Set([a]) : l.add(a)), Er(t, a, n)), !1;
        }
        throw Error(s(435, l.tag));
      }
      return Er(t, a, n), ac(), !1;
    }
    if (xt)
      return e = Se.current, e !== null ? ((e.flags & 65536) === 0 && (e.flags |= 256), e.flags |= 65536, e.lanes = n, a !== ns && (t = Error(s(422), { cause: a }), cu(Ie(t, l)))) : (a !== ns && (e = Error(s(423), {
        cause: a
      }), cu(
        Ie(e, l)
      )), t = t.current.alternate, t.flags |= 65536, n &= -n, t.lanes |= n, a = Ie(a, l), n = Ls(
        t.stateNode,
        a,
        n
      ), hs(t, n), ae !== 4 && (ae = 2)), !1;
    var u = Error(s(520), { cause: a });
    if (u = Ie(u, l), Mu === null ? Mu = [u] : Mu.push(u), ae !== 4 && (ae = 2), e === null) return !0;
    a = Ie(a, l), l = e;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, t = n & -n, l.lanes |= t, t = Ls(l.stateNode, a, t), hs(l, t), !1;
        case 1:
          if (e = l.type, u = l.stateNode, (l.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (oa === null || !oa.has(u))))
            return l.flags |= 65536, n &= -n, l.lanes |= n, n = Ud(n), Bd(
              n,
              t,
              l,
              a
            ), hs(l, n), !1;
          break;
        case 22:
          if (l.memoizedState !== null)
            return l.flags |= 65536, !1;
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var Ys = Error(s(461)), re = !1;
  function de(t, e, l, a) {
    e.child = t === null ? qf(e, null, l, a) : Ya(
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
      for (var o in a)
        o !== "ref" && (i[o] = a[o]);
    } else i = a;
    return wa(e), a = _s(
      t,
      e,
      l,
      i,
      u,
      n
    ), o = Es(), t !== null && !re ? (Ts(t, e, n), Yl(t, e, n)) : (xt && o && vi(e), e.flags |= 1, de(t, e, a, n), e.child);
  }
  function Ld(t, e, l, a, n) {
    if (t === null) {
      var u = l.type;
      return typeof u == "function" && !ts(u) && u.defaultProps === void 0 && l.compare === null ? (e.tag = 15, e.type = u, Yd(
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
    if (u = t.child, !Js(t, n)) {
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
        if (re = !1, e.pendingProps = a = u, Js(t, n))
          (t.flags & 131072) !== 0 && (re = !0);
        else
          return e.lanes = t.lanes, Yl(t, e, n);
    }
    return qs(
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
        ), u !== null ? Vf(e, u) : gs(), Qf(e);
      else
        return a = e.lanes = 536870912, Gd(
          t,
          e,
          u !== null ? u.baseLanes | l : l,
          l,
          a
        );
    } else
      u !== null ? (Si(e, u.cachePool), Vf(e, u), ua(), e.memoizedState = null) : (t !== null && Si(e, null), gs(), ua());
    return de(t, e, n, l), e.child;
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
    var u = os();
    return u = u === null ? null : { parent: ce._currentValue, pool: u }, e.memoizedState = {
      baseLanes: l,
      cachePool: u
    }, t !== null && Si(e, null), gs(), Qf(e), t !== null && Da(t, e, a, !0), e.childLanes = n, null;
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
      if (xt) {
        if (a.mode === "hidden")
          return t = Hi(e, a), e.lanes = 536870912, t.memoizedState = { baseLanes: 0, cachePool: null }, pu(null, t);
        if (bs(e), (t = Wt) ? (t = hh(
          t,
          el
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: kl !== null ? { id: gl, overflow: yl } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = xf(t), l.return = e, e.child = l, he = e, Wt = null)) : t = null, t === null) throw Wl(e);
        return e.lanes = 536870912, null;
      }
      return Hi(e, a);
    }
    var u = t.memoizedState;
    if (u !== null) {
      var i = u.dehydrated;
      if (bs(e), n)
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
        if (aa.current === null) {
          if (a = Ft, a !== null && (i = Oo(a, l), i !== 0 && i !== u.retryLane))
            throw u.retryLane = i, Aa(t, i), Le(a, t, i), Ys;
          ac();
        }
        e = Xd(
          t,
          e,
          l
        );
      } else
        t = u.treeContext, Wt = al(i.nextSibling), he = e, xt = !0, Fl = null, el = !1, t !== null && zf(e, t), e = Hi(e, a), e.flags |= 134221824;
      return e;
    }
    return t = Dl(t.child, {
      mode: a.mode,
      children: a.children
    }), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function En(t, e) {
    var l = e.ref;
    if (l === null)
      t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object")
        throw Error(s(284));
      (t === null || t.ref !== l) && (e.flags |= 4194816);
    }
  }
  function qs(t, e, l, a, n) {
    return wa(e), l = _s(
      t,
      e,
      l,
      a,
      void 0,
      n
    ), a = Es(), t !== null && !re ? (Ts(t, e, n), Yl(t, e, n)) : (xt && a && vi(e), e.flags |= 1, de(t, e, l, n), e.child);
  }
  function Vd(t, e, l, a, n, u) {
    return wa(e), e.updateQueue = null, l = Kf(
      e,
      a,
      l,
      n
    ), Zf(t), a = Es(), t !== null && !re ? (Ts(t, e, u), Yl(t, e, u)) : (xt && a && vi(e), e.flags |= 1, de(t, e, l, u), e.child);
  }
  function Qd(t, e, l, a, n) {
    if (wa(e), e.stateNode === null) {
      var u = dn, i = l.contextType;
      typeof i == "object" && i !== null && (u = pe(i)), u = new l(a, u), e.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = Hs, e.stateNode = u, u._reactInternals = e, u = e.stateNode, u.props = a, u.state = e.memoizedState, u.refs = {}, ds(e), i = l.contextType, u.context = typeof i == "object" && i !== null ? pe(i) : dn, u.state = e.memoizedState, i = l.getDerivedStateFromProps, typeof i == "function" && (Bs(
        e,
        l,
        i,
        a
      ), u.state = e.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (i = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), i !== u.state && Hs.enqueueReplaceState(u, u.state, null), hu(e, a, u, n), mu(), u.state = e.memoizedState), typeof u.componentDidMount == "function" && (e.flags |= 4194308), a = !0;
    } else if (t === null) {
      u = e.stateNode;
      var o = e.memoizedProps, g = Ga(l, o);
      u.props = g;
      var N = u.context, z = l.contextType;
      i = dn, typeof z == "object" && z !== null && (i = pe(z));
      var B = l.getDerivedStateFromProps;
      z = typeof B == "function" || typeof u.getSnapshotBeforeUpdate == "function", o = e.pendingProps !== o, z || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (o || N !== i) && Cd(
        e,
        u,
        a,
        i
      ), ta = !1;
      var _ = e.memoizedState;
      u.state = _, hu(e, a, u, n), mu(), N = e.memoizedState, o || _ !== N || ta ? (typeof B == "function" && (Bs(
        e,
        l,
        B,
        a
      ), N = e.memoizedState), (g = ta || Ad(
        e,
        l,
        g,
        a,
        _,
        N,
        i
      )) ? (z || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = a, e.memoizedState = N), u.props = a, u.state = N, u.context = i, a = g) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), a = !1);
    } else {
      u = e.stateNode, ms(t, e), i = e.memoizedProps, z = Ga(l, i), u.props = z, B = e.pendingProps, _ = u.context, N = l.contextType, g = dn, typeof N == "object" && N !== null && (g = pe(N)), o = l.getDerivedStateFromProps, (N = typeof o == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (i !== B || _ !== g) && Cd(
        e,
        u,
        a,
        g
      ), ta = !1, _ = e.memoizedState, u.state = _, hu(e, a, u, n), mu();
      var O = e.memoizedState;
      i !== B || _ !== O || ta || t !== null && t.dependencies !== null && bi(t.dependencies) ? (typeof o == "function" && (Bs(
        e,
        l,
        o,
        a
      ), O = e.memoizedState), (z = ta || Ad(
        e,
        l,
        z,
        a,
        _,
        O,
        g
      ) || t !== null && t.dependencies !== null && bi(t.dependencies)) ? (N || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(a, O, g), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        a,
        O,
        g
      )), typeof u.componentDidUpdate == "function" && (e.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && _ === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && _ === t.memoizedState || (e.flags |= 1024), e.memoizedProps = a, e.memoizedState = O), u.props = a, u.state = O, u.context = g, a = z) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && _ === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && _ === t.memoizedState || (e.flags |= 1024), a = !1);
    }
    return u = a, En(t, e), a = (e.flags & 128) !== 0, u || a ? (u = e.stateNode, l = a && typeof l.getDerivedStateFromError != "function" ? null : u.render(), e.flags |= 1, t !== null && a ? (e.child = Ya(
      e,
      t.child,
      null,
      n
    ), e.child = Ya(
      e,
      null,
      l,
      n
    )) : de(t, e, l, n), e.memoizedState = u.state, t = e.child) : t = Yl(
      t,
      e,
      n
    ), t;
  }
  function Zd(t, e, l, a) {
    return ja(), e.flags |= 256, de(t, e, l, a), e.child;
  }
  var Gs = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Xs(t) {
    return { baseLanes: t, cachePool: wf() };
  }
  function Vs(t, e, l) {
    return t = t !== null ? t.childLanes & ~l : 0, e && (t |= Ke), t;
  }
  function Kd(t, e, l) {
    var a = e.pendingProps, n = !1, u = (e.flags & 128) !== 0, i;
    if ((i = u) || (i = t !== null && t.memoizedState === null ? !1 : (_e.current & 2) !== 0), i && (n = !0, e.flags &= -129), i = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
      if (xt) {
        if (n ? na(e) : ua(), (t = Wt) ? (t = hh(
          t,
          el
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: kl !== null ? { id: gl, overflow: yl } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = xf(t), l.return = e, e.child = l, he = e, Wt = null)) : t = null, t === null) throw Wl(e);
        return Xr(t) ? e.lanes = 32 : e.lanes = 536870912, null;
      }
      return u = a.children, a = a.fallback, n ? (ua(), n = e.mode, u = Li(
        { mode: "hidden", children: u },
        n
      ), a = Ca(
        a,
        n,
        l,
        null
      ), u.return = e, a.return = e, u.sibling = a, e.child = u, a = e.child, a.memoizedState = Xs(l), a.childLanes = Vs(
        t,
        i,
        l
      ), e.memoizedState = Gs, pu(null, a)) : (na(e), Qs(e, u));
    }
    var o = t.memoizedState;
    if (o !== null) {
      var g = o.dehydrated;
      if (g !== null)
        return Fv(
          t,
          e,
          u,
          i,
          a,
          g,
          o,
          l
        );
    }
    return n ? (ua(), n = a.fallback, u = e.mode, o = t.child, g = o.sibling, a = Dl(o, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = o.subtreeFlags & 1206910976, g !== null ? n = Dl(g, n) : (n = Ca(
      n,
      u,
      l,
      null
    ), n.flags |= 2), n.return = e, a.return = e, a.sibling = n, e.child = a, pu(null, a), a = e.child, n = t.child.memoizedState, n === null ? n = Xs(l) : (u = n.cachePool, u !== null ? (o = ce._currentValue, u = u.parent !== o ? { parent: o, pool: o } : u) : u = wf(), n = {
      baseLanes: n.baseLanes | l,
      cachePool: u
    }), a.memoizedState = n, a.childLanes = Vs(
      t,
      i,
      l
    ), e.memoizedState = Gs, pu(t.child, a)) : (na(e), l = t.child, t = l.sibling, l = Dl(l, {
      mode: "visible",
      children: a.children
    }), l.return = e, l.sibling = null, t !== null && (i = e.deletions, i === null ? (e.deletions = [t], e.flags |= 16) : i.push(t)), e.child = l, e.memoizedState = null, l);
  }
  function Qs(t, e) {
    return e = Li(
      { mode: "visible", children: e },
      t.mode
    ), e.return = t, t.child = e;
  }
  function Li(t, e) {
    return t = we(22, t, null, e), t.lanes = 0, t;
  }
  function Yi(t, e, l) {
    return Ya(e, t.child, null, l), t = Qs(
      e,
      e.pendingProps.children
    ), t.flags |= 2, e.memoizedState = null, t;
  }
  function Fv(t, e, l, a, n, u, i, o) {
    if (l)
      return e.flags & 256 ? (na(e), e.flags &= -257, Yi(
        t,
        e,
        o
      )) : e.memoizedState !== null ? (ua(), e.child = t.child, e.flags |= 128, null) : (ua(), u = n.fallback, i = e.mode, n = Li(
        { mode: "visible", children: n.children },
        i
      ), u = Ca(
        u,
        i,
        o,
        null
      ), u.flags |= 2, n.return = e, u.return = e, n.sibling = u, e.child = n, Ya(e, t.child, null, o), n = e.child, n.memoizedState = Xs(o), n.childLanes = Vs(
        t,
        a,
        o
      ), e.memoizedState = Gs, pu(null, n));
    if (na(e), Xr(u)) {
      if (a = u.nextSibling && u.nextSibling.dataset, a) var g = a.dgst;
      return a = g, a !== "" && (n = Error(s(419)), n.stack = "", n.digest = a, cu({ value: n, source: null, stack: null })), Yi(
        t,
        e,
        o
      );
    }
    if (re || Da(t, e, o, !1), a = (o & t.childLanes) !== 0, re || a) {
      if (aa.current !== null)
        return Yi(
          t,
          e,
          o
        );
      if (a = Ft, a !== null && (n = Oo(
        a,
        o
      ), n !== 0 && n !== i.retryLane))
        throw i.retryLane = n, Aa(t, n), Le(a, t, n), Ys;
      return Gr(u) || ac(), Yi(
        t,
        e,
        o
      );
    }
    return Gr(u) ? (e.flags |= 192, e.child = t.child, null) : (t = i.treeContext, Wt = al(u.nextSibling), he = e, xt = !0, Fl = null, el = !1, t !== null && zf(e, t), e = Qs(
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
  function Zs(t) {
    var e = t.child;
    for (t.child = null; e !== null; ) {
      var l = e.sibling;
      e.sibling = t.child, t.child = e, e = l;
    }
  }
  function Ks(t, e, l) {
    var a = e.pendingProps, n = a.revealOrder, u = a.tail;
    a = a.children;
    var i = _e.current;
    if (e.flags & 128)
      return vu(e, i), null;
    var o = (i & 2) !== 0;
    if (o ? (i = i & 1 | 2, e.flags |= 128) : i &= 1, vu(e, i), n === "backwards" && t !== null ? (Zs(t), de(t, e, a, l), Zs(t)) : de(t, e, a, l), a = xt ? iu : 0, !o && t !== null && (t.flags & 128) !== 0)
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
        l = $d(e.child), l === null ? (n = e.child, e.child = null) : (n = l.sibling, l.sibling = null, Zs(e)), qi(
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
    return Il(e, e.type, a.value), de(t, e, a.children, l), e.child;
  }
  function Yl(t, e, l) {
    if (t !== null && (e.dependencies = t.dependencies), ra |= e.lanes, (l & e.childLanes) === 0)
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
  function Js(t, e) {
    return (t.lanes & e) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && bi(t)));
  }
  function Wv(t, e, l) {
    switch (e.tag) {
      case 3:
        ie(e, e.stateNode.containerInfo), Il(e, ce, t.memoizedState.cache), ja();
        break;
      case 27:
      case 5:
        Ol(e);
        break;
      case 4:
        ie(e, e.stateNode.containerInfo);
        break;
      case 10:
        Il(
          e,
          e.type,
          e.memoizedProps.value
        );
        break;
      case 31:
        if (e.memoizedState !== null)
          return e.flags |= 128, bs(e), null;
        break;
      case 13:
        var a = e.memoizedState;
        if (a !== null) {
          if (a.dehydrated !== null)
            return na(e), e.flags |= 128, null;
          a = Da(
            t,
            e,
            l,
            !1
          );
          var n = e.child.childLanes;
          return a || (l & n) !== 0 ? Kd(t, e, l) : (na(e), t = Yl(
            t,
            e,
            l
          ), t !== null ? t.sibling : null);
        }
        na(e);
        break;
      case 19:
        if (e.flags & 128)
          return Ks(
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
            return Ks(
              t,
              e,
              l
            );
          e.flags |= 128;
        }
        if (n = e.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), vu(e, _e.current), a) break;
        return null;
      case 22:
        return e.lanes = 0, qd(
          t,
          e,
          l,
          e.pendingProps
        );
      case 24:
        Il(e, ce, t.memoizedState.cache);
    }
    return Yl(t, e, l);
  }
  function Fd(t, e, l) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps)
        re = !0;
      else {
        if (!Js(t, l) && (e.flags & 128) === 0)
          return re = !1, Wv(
            t,
            e,
            l
          );
        re = (t.flags & 131072) !== 0;
      }
    else
      re = !1, xt && (e.flags & 1048576) !== 0 && Of(e, iu, e.index);
    switch (e.lanes = 0, e.tag) {
      case 16:
        t: {
          var a = e.pendingProps;
          if (t = Ha(e.elementType), e.type = t, typeof t == "function")
            ts(t) ? (a = Ga(t, a), e.tag = 1, e = Qd(
              null,
              e,
              t,
              a,
              l
            )) : (e.tag = 0, e = qs(
              null,
              e,
              t,
              a,
              l
            ));
          else {
            if (t != null) {
              var n = t.$$typeof;
              if (n === Y) {
                e.tag = 11, e = Hd(
                  null,
                  e,
                  t,
                  a,
                  l
                );
                break t;
              } else if (n === bt) {
                e.tag = 14, e = Ld(
                  null,
                  e,
                  t,
                  a,
                  l
                );
                break t;
              } else if (n === Ct) {
                e.tag = 10, e.type = t, e = kd(
                  null,
                  e,
                  l
                );
                break t;
              }
            }
            throw e = yt(t) || t, Error(s(306, e, ""));
          }
        }
        return e;
      case 0:
        return qs(
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
          if (ie(
            e,
            e.stateNode.containerInfo
          ), t === null) throw Error(s(387));
          a = e.pendingProps;
          var u = e.memoizedState;
          n = u.element, ms(t, e), hu(e, a, null, l);
          var i = e.memoizedState;
          if (a = i.cache, Il(e, ce, a), a !== u.cache && cs(
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
              n = Ie(
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
              for (t = e.stateNode.containerInfo, t.nodeType === 9 ? t = t.body : t = t.nodeName === "HTML" ? t.ownerDocument.body : t, Wt = al(t.firstChild), he = e, xt = !0, Fl = null, el = !0, l = qf(
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
            de(t, e, a, l);
          }
          e = e.child;
        }
        return e;
      case 26:
        return En(t, e), t === null ? (l = _h(
          e.type,
          null,
          e.pendingProps,
          null
        )) ? e.memoizedState = l : xt || (e.stateNode = th(
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
        return Ol(e), t === null && xt && (a = e.stateNode = yh(
          e.type,
          e.pendingProps,
          jt.current
        ), he = e, el = !0, n = Wt, ma(e.type) ? (Vr = n, Wt = al(a.firstChild)) : Wt = n), de(
          t,
          e,
          e.pendingProps.children,
          l
        ), En(t, e), t === null && (e.flags |= 4194304), e.child;
      case 5:
        return t === null && xt && ((n = a = Wt) && (a = Zg(
          a,
          e.type,
          e.pendingProps,
          el
        ), a !== null ? (e.stateNode = a, he = e, Wt = al(a.firstChild), el = !1, n = !0) : n = !1), n || Wl(e)), Ol(e), n = e.type, u = e.pendingProps, i = t !== null ? t.memoizedProps : null, a = u.children, wr(n, u) ? a = null : i !== null && wr(n, i) && (e.flags |= 32), e.memoizedState !== null && (n = _s(
          t,
          e,
          qv,
          null,
          null,
          l
        ), qn._currentValue = n), En(t, e), de(t, e, a, l), e.child;
      case 6:
        return t === null && xt && ((t = l = Wt) && (l = Kg(
          l,
          e.pendingProps,
          el
        ), l !== null ? (e.stateNode = l, he = e, Wt = null, t = !0) : t = !1), t || Wl(e)), null;
      case 13:
        return Kd(t, e, l);
      case 4:
        return ie(
          e,
          e.stateNode.containerInfo
        ), a = e.pendingProps, t === null ? e.child = Ya(
          e,
          null,
          a,
          l
        ) : de(t, e, a, l), e.child;
      case 11:
        return Hd(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 7:
        return a = e.pendingProps, En(t, e), de(t, e, a, l), e.child;
      case 8:
        return de(
          t,
          e,
          e.pendingProps.children,
          l
        ), e.child;
      case 12:
        return de(
          t,
          e,
          e.pendingProps.children,
          l
        ), e.child;
      case 10:
        return kd(t, e, l);
      case 9:
        return n = e.type._context, a = e.pendingProps.children, wa(e), n = pe(n), a = a(n), e.flags |= 1, de(t, e, a, l), e.child;
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
        return Ks(t, e, l);
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
        return wa(e), a = pe(ce), t === null ? (n = os(), n === null && (n = Ft, u = ss(), n.pooledCache = u, u.refCount++, u !== null && (n.pooledCacheLanes |= l), n = u), e.memoizedState = { parent: a, cache: n }, ds(e), Il(e, ce, n)) : ((t.lanes & l) !== 0 && (ms(t, e), hu(e, null, null, l), mu()), n = t.memoizedState, u = e.memoizedState, n.parent !== a ? (n = { parent: a, cache: a }, e.memoizedState = n, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = n), Il(e, ce, a)) : (a = u.cache, Il(e, ce, a), a !== n.cache && cs(
          e,
          [ce],
          l,
          !0
        ))), de(
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
        }), a = e.pendingProps, a.name != null && a.name !== "auto" ? e.flags |= t === null ? 18882560 : 18874368 : xt && vi(e), t !== null && t.memoizedProps.name !== a.name ? e.flags |= 4194816 : En(t, e), de(t, e, a.children, l), e.child;
      case 29:
        throw e.pendingProps;
    }
    throw Error(s(156, e.tag));
  }
  function ql(t) {
    t.flags |= 4;
  }
  function $s(t, e, l, a, n) {
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
    e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? No() : 536870912, t.lanes |= e, On |= e);
  }
  function Su(t, e) {
    if (!xt)
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
  function It(t) {
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
    switch (as(e), e.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return It(e), null;
      case 1:
        return It(e), null;
      case 3:
        return l = e.stateNode, a = null, t !== null && (a = t.memoizedState.cache), e.memoizedState.cache !== a && (e.flags |= 2048), Bl(ce), Lt(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (t === null || t.child === null) && (vn(e) ? ql(e) : t === null || t.memoizedState.isDehydrated && (e.flags & 256) === 0 || (e.flags |= 1024, us())), It(e), null;
      case 26:
        var n = e.type, u = e.memoizedState;
        return t === null ? (ql(e), u !== null ? (It(e), Wd(e, u)) : (It(e), $s(
          e,
          n,
          null,
          a,
          l
        ))) : u ? u !== t.memoizedState ? (ql(e), It(e), Wd(e, u)) : (It(e), e.flags &= -16777217) : (t = t.memoizedProps, t !== a && ql(e), It(e), $s(
          e,
          n,
          t,
          a,
          l
        )), null;
      case 27:
        if (Vl(e), l = jt.current, n = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== a && ql(e);
        else {
          if (!a) {
            if (e.stateNode === null)
              throw Error(s(166));
            return It(e), e.subtreeFlags &= -33554433, null;
          }
          t = q.current, vn(e) ? Af(e) : (t = yh(n, a, l), e.stateNode = t, ql(e));
        }
        return It(e), e.subtreeFlags &= -33554433, null;
      case 5:
        if (Vl(e), n = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== a && ql(e);
        else {
          if (!a) {
            if (e.stateNode === null)
              throw Error(s(166));
            return It(e), e.subtreeFlags &= -33554433, null;
          }
          if (u = q.current, vn(e))
            Af(e);
          else {
            var i = ju(
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
            u[be] = e, u[De] = a;
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
            t: switch (Te(u, n, a), n) {
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
        return It(e), e.subtreeFlags &= -33554433, $s(
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
          if (t = jt.current, vn(e)) {
            if (t = e.stateNode, l = e.memoizedProps, a = null, n = he, n !== null)
              switch (n.tag) {
                case 27:
                case 5:
                  a = n.memoizedProps;
              }
            t[be] = e, t = !!(t.nodeValue === l || a !== null && a.suppressHydrationWarning === !0 || Fm(t.nodeValue, l)), t || Wl(e, !0);
          } else
            t = ju(t).createTextNode(
              a
            ), t[be] = e, e.stateNode = t;
        }
        return It(e), null;
      case 31:
        if (l = e.memoizedState, t === null || t.memoizedState !== null) {
          if (a = vn(e), l !== null) {
            if (t === null) {
              if (!a) throw Error(s(318));
              if (t = e.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(557));
              t[be] = e;
            } else
              ja(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            It(e), t = !1;
          } else
            l = us(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = l), t = !0;
          if (!t)
            return e.flags & 256 ? (Ve(e), e) : (Ve(e), null);
          if ((e.flags & 128) !== 0)
            throw Error(s(558));
        }
        return It(e), null;
      case 13:
        if (a = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (n = vn(e), a !== null && a.dehydrated !== null) {
            if (t === null) {
              if (!n) throw Error(s(318));
              if (n = e.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(s(317));
              n[be] = e;
            } else
              ja(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            It(e), n = !1;
          } else
            n = us(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return e.flags & 256 ? (Ve(e), e) : (Ve(e), null);
        }
        return Ve(e), (e.flags & 128) !== 0 ? (e.lanes = l, e) : (l = a !== null, t = t !== null && t.memoizedState !== null, l && (a = e.child, n = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (n = a.alternate.memoizedState.cachePool.pool), u = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (u = a.memoizedState.cachePool.pool), u !== n && (a.flags |= 2048)), l !== t && l && (e.child.flags |= 8192), Gi(e, e.updateQueue), It(e), null);
      case 4:
        return Lt(), t === null && Ar(e.stateNode.containerInfo), e.flags |= 67108864, It(e), null;
      case 10:
        return Bl(e.type), It(e), null;
      case 19:
        if (ps(e), a = e.memoizedState, a === null) return It(e), null;
        if (n = (e.flags & 128) !== 0, u = a.rendering, u === null)
          if (n) Su(a, !1);
          else {
            if (ae !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = e.child; t !== null; ) {
                if (u = Mi(t), u !== null) {
                  for (e.flags |= 128, Su(a, !1), t = u.updateQueue, e.updateQueue = t, Gi(e, t), e.subtreeFlags = 0, t = l, l = e.child; l !== null; )
                    Nf(l, t), l = l.sibling;
                  return vu(
                    e,
                    _e.current & 1 | 2
                  ), xt && wl(e, a.treeForkCount), e.child;
                }
                t = t.sibling;
              }
            a.tail !== null && ht() > Pi && (e.flags |= 128, n = !0, Su(a, !1), e.lanes = 4194304);
          }
        else {
          if (!n)
            if (t = Mi(u), t !== null) {
              if (e.flags |= 128, n = !0, t = t.updateQueue, e.updateQueue = t, Gi(e, t), Su(a, !0), a.tail === null && a.tailMode !== "collapsed" && a.tailMode !== "visible" && !u.alternate && !xt)
                return It(e), null;
            } else
              2 * ht() - a.renderingStartTime > Pi && l !== 536870912 && (e.flags |= 128, n = !0, Su(a, !1), e.lanes = 4194304);
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
          return a.rendering = t, a.tail = t.sibling, a.renderingStartTime = ht(), t.sibling = null, u = _e.current, u = n ? u & 1 | 2 : u & 1, a.tailMode === "visible" || a.tailMode === "collapsed" || !l || xt ? vu(e, u) : (l = u, Ot(Se, e), Ot(_e, l), xe === null && (xe = e)), xt && wl(e, a.treeForkCount), t;
        }
        return It(e), null;
      case 22:
      case 23:
        return Ve(e), ys(), a = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== a && (e.flags |= 8192) : a && (e.flags |= 8192), a ? (l & 536870912) !== 0 && (e.flags & 128) === 0 && (It(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : It(e), l = e.updateQueue, l !== null && Gi(e, l.retryQueue), l = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), a = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), a !== l && (e.flags |= 2048), t !== null && Xt(Ba), null;
      case 24:
        return l = null, t !== null && (l = t.memoizedState.cache), e.memoizedState.cache !== l && (e.flags |= 2048), Bl(ce), It(e), null;
      case 25:
        return null;
      case 30:
        return e.flags |= 33554432, It(e), null;
    }
    throw Error(s(156, e.tag));
  }
  function Pv(t, e) {
    switch (as(e), e.tag) {
      case 1:
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 3:
        return Bl(ce), Lt(), t = e.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (e.flags = t & -65537 | 128, e) : null;
      case 26:
      case 27:
      case 5:
        return Vl(e), null;
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
        return ps(e), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, t = e.memoizedState, t !== null && (t.rendering = null, t.tail = null), e.flags |= 4, e) : null;
      case 4:
        return Lt(), null;
      case 10:
        return Bl(e.type), null;
      case 22:
      case 23:
        return Ve(e), ys(), t !== null && Xt(Ba), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 24:
        return Bl(ce), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Id(t, e) {
    switch (as(e), e.tag) {
      case 3:
        Bl(ce), Lt();
        break;
      case 26:
      case 27:
      case 5:
        Vl(e);
        break;
      case 4:
        Lt();
        break;
      case 31:
        e.memoizedState !== null && Ve(e);
        break;
      case 13:
        Ve(e);
        break;
      case 19:
        ps(e);
        break;
      case 10:
        Bl(e.type);
        break;
      case 22:
      case 23:
        Ve(e), ys(), t !== null && Xt(Ba);
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
    } catch (o) {
      Zt(e, e.return, o);
    }
  }
  function ia(t, e, l) {
    try {
      var a = e.updateQueue, n = a !== null ? a.lastEffect : null;
      if (n !== null) {
        var u = n.next;
        a = u;
        do {
          if ((a.tag & t) === t) {
            var i = a.inst, o = i.destroy;
            if (o !== void 0) {
              i.destroy = void 0, n = e;
              var g = l, N = o;
              try {
                N();
              } catch (z) {
                Zt(
                  n,
                  g,
                  z
                );
              }
            }
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (z) {
      Zt(e, e.return, z);
    }
  }
  function Pd(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var l = t.stateNode;
      try {
        Xf(e, l);
      } catch (a) {
        Zt(t, t.return, a);
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
      Zt(t, e, a);
    }
  }
  function bl(t, e) {
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
    } catch (o) {
      Zt(t, e, o);
    }
  }
  function Ee(t, e) {
    var l = t.ref, a = t.refCleanup;
    if (l !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (n) {
          Zt(t, e, n);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (n) {
          Zt(t, e, n);
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
    for (var e = t.return; e !== null && (Fs(e) && mh(t.stateNode, e.stateNode), !ks(e)); )
      e = e.return;
  }
  function Eu(t) {
    for (var e = t.return; e !== null && (Fs(e) && Qg(t.stateNode, e.stateNode), !ks(e)); )
      e = e.return;
  }
  function ks(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 27;
  }
  function Fs(t) {
    return t && t.tag === 7 && t.stateNode !== null;
  }
  function Ws(t) {
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
      Zt(t, t.return, n);
    }
  }
  function Is(t, e, l) {
    try {
      var a = t.stateNode;
      xg(a, t.type, l, e), a[De] = e;
    } catch (n) {
      Zt(t, t.return, n);
    }
  }
  function lm(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && ma(t.type) || t.tag === 4;
  }
  function Ps(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || lm(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && ma(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function tr(t, e, l, a) {
    var n = t.tag;
    if (n === 5 || n === 6)
      n = t.stateNode, e ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(n, e) : (e = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, e.appendChild(n), l = l._reactRootContainer, l != null || e.onclick !== null || (e.onclick = vl)), Xi(t, a), Yt = !0;
    else if (n !== 4 && (n === 27 && (Xi(t, a), a = null, ma(t.type) && (l = t.stateNode, e = null)), t = t.child, t !== null))
      for (tr(
        t,
        e,
        l,
        a
      ), t = t.sibling; t !== null; )
        tr(
          t,
          e,
          l,
          a
        ), t = t.sibling;
  }
  function Vi(t, e, l, a) {
    var n = t.tag;
    if (n === 5 || n === 6)
      n = t.stateNode, e ? l.insertBefore(n, e) : l.appendChild(n), Xi(t, a), Yt = !0;
    else if (n !== 4 && (n === 27 && (Xi(t, a), a = null, ma(t.type) && (l = t.stateNode)), t = t.child, t !== null))
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
      Te(e, a, l), e[be] = t, e[De] = l;
    } catch (u) {
      Zt(t, t.return, u);
    }
  }
  var Qi = !1, Qe = null;
  function nm(t) {
    (t.tag === 30 || (t.subtreeFlags & 33554432) !== 0) && (Qi = !0);
  }
  var pl = null;
  function um() {
    var t = pl;
    return pl = null, t;
  }
  var Ue = 0;
  function Tn(t, e, l, a, n) {
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
          var o = Hr(i);
          a.push(o), o.view && (u = !0);
        } else
          u || Hr(i).view && (u = !0);
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
  function Sl(t, e) {
    for (; t !== null; )
      t.tag === 5 ? ih(t.stateNode, t.memoizedProps) : (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && e || Sl(
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
          e = Rl(e.default, e.share), e !== "none" && (Tn(
            t,
            l,
            e,
            null,
            !1
          ) || Sl(t.child, !1));
        }
        t = t.sibling;
      }
  }
  function er(t, e) {
    if (t.tag === 30) {
      var l = t.stateNode, a = t.memoizedProps, n = jl(a, l), u = Rl(
        a.default,
        l.paired ? a.share : a.enter
      );
      u !== "none" ? Tn(t, n, u, null, !1) ? (Zi(t), l.paired || e || jn(t, a.onEnter)) : Sl(t.child, !1) : Zi(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        er(t, e), t = t.sibling;
    else Zi(t);
  }
  function lr(t) {
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
                  if (u !== "none" && (Tn(
                    t,
                    a,
                    u,
                    null,
                    !1
                  ) ? (u = t.stateNode, n.paired = u, u.paired = n, jn(t, l.onShare)) : Sl(t.child, !1)), e.delete(a), e.size === 0) break;
                }
              }
            }
            lr(t);
          }
          t = t.sibling;
        }
    }
  }
  function ar(t) {
    if (t.tag === 30) {
      var e = t.memoizedProps, l = jl(e, t.stateNode), a = Qe !== null ? Qe.get(l) : void 0, n = Rl(
        e.default,
        a !== void 0 ? e.share : e.exit
      );
      n !== "none" && (Tn(t, l, n, null, !1) ? a !== void 0 ? (n = t.stateNode, a.paired = n, n.paired = a, Qe.delete(l), jn(t, e.onShare)) : jn(t, e.onExit) : Sl(t.child, !1)), Qe !== null && lr(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        ar(t), t = t.sibling;
    else
      Qe !== null && lr(t);
  }
  function cm(t) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var e = t.memoizedProps, l = jl(e, t.stateNode);
        e = Rl(e.default, e.update), t.flags &= -5, e !== "none" && Tn(
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
  function nr(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if (t.tag !== 22 || t.memoizedState === null) {
          if (t.tag === 30 && (t.flags & 18874368) !== 0) {
            var e = t.stateNode;
            e.paired !== null && (e.paired = null, Sl(t.child, !1));
          }
          nr(t);
        }
        t = t.sibling;
      }
  }
  function Ki(t) {
    if (t.tag === 30)
      t.stateNode.paired = null, Sl(t.child, !1), nr(t);
    else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        Ki(t), t = t.sibling;
    else nr(t);
  }
  function sm(t) {
    for (t = t.child; t !== null; )
      t.tag === 30 ? Sl(t.child, !1) : (t.subtreeFlags & 33554432) !== 0 && sm(t), t = t.sibling;
  }
  function ur(t, e, l, a, n, u, i) {
    for (var o = !1; e !== null; ) {
      if (e.tag === 5) {
        var g = e.stateNode;
        if (u !== null && Ue < u.length) {
          var N = u[Ue], z = Hr(g);
          (N.view || z.view) && (o = !0);
          var B;
          if (B = (t.flags & 4) === 0)
            if (z.clip) B = !0;
            else {
              B = N.rect;
              var _ = z.rect;
              B = B.y !== _.y || B.x !== _.x || B.height !== _.height || B.width !== _.width;
            }
          B && (t.flags |= 4), z.abs ? z = !N.abs : (N = N.rect, z = z.rect, z = N.height !== z.height || N.width !== z.width), z && (t.flags |= 32);
        } else t.flags |= 32;
        (t.flags & 4) !== 0 && uh(
          g,
          Ue === 0 ? l : l + "_" + Ue,
          n
        ), o && (t.flags & 4) !== 0 || (pl === null && (pl = []), pl.push(
          g,
          Ue === 0 ? a : a + "_" + Ue,
          e.memoizedProps
        )), Ue++;
      } else (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && i ? t.flags |= e.flags & 32 : ur(
        t,
        e.child,
        l,
        a,
        n,
        u,
        i
      ) && (o = !0));
      e = e.sibling;
    }
    return o;
  }
  function rm(t, e) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var l = t.memoizedProps, a = t.stateNode, n = jl(l, a), u = Rl(l.default, l.update), i;
        i = t.memoizedState, t.memoizedState = null, a = t;
        var o = t.child;
        Ue = 0, n = ur(
          a,
          o,
          n,
          n,
          u,
          i,
          !1
        ), (t.flags & 4) !== 0 && n && jn(t, l.onUpdate);
      } else
        (t.subtreeFlags & 33554432) !== 0 && rm(t);
      t = t.sibling;
    }
  }
  var ve = !1, Vt = !1, _l = !1, ir = !1, om = typeof WeakSet == "function" ? WeakSet : Set, ge = null, El = !1, Tu = !1, Ji = !1, cr = !1;
  function tg(t, e, l) {
    if (t = t.containerInfo, Rr = Gn, t = hf(t), Jc(t)) {
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
            var o = 0, g = -1, N = -1, z = 0, B = 0, _ = t, O = null;
            e: for (; ; ) {
              for (var V; _ !== a || u !== 0 && _.nodeType !== 3 || (g = o + u), _ !== i || n !== 0 && _.nodeType !== 3 || (N = o + n), _.nodeType === 3 && (o += _.nodeValue.length), (V = _.firstChild) !== null; )
                O = _, _ = V;
              for (; ; ) {
                if (_ === t) break e;
                if (O === a && ++z === u && (g = o), O === i && ++B === n && (N = o), (V = _.nextSibling) !== null) break;
                _ = O, O = _.parentNode;
              }
              _ = V;
            }
            a = g === -1 || N === -1 ? null : { start: g, end: N };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (Dr = { focusedElem: t, selectionRange: a }, Gn = !1, l = (l & 335544064) === l, ge = e, e = l ? 9270 : 1024; ge !== null; ) {
      if (t = ge, l && (a = t.deletions, a !== null))
        for (u = 0; u < a.length; u++)
          l && ar(a[u]);
      if (t.alternate === null && (t.flags & 2) !== 0)
        l && nm(t), $i(l);
      else {
        if (t.tag === 22) {
          if (a = t.alternate, t.memoizedState !== null) {
            a !== null && a.memoizedState === null && l && ar(a), $i(l);
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
            } catch (o) {
              Zt(e, e.return, o);
            }
          }
          break;
        case 3:
          if ((n & 1024) !== 0) {
            if (a = e.stateNode.containerInfo, l = a.nodeType, l === 9)
              qr(a);
            else if (l === 1)
              switch (a.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  qr(a);
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
          ), n = e.memoizedProps, n = Rl(n.default, n.update), n !== "none" && Tn(
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
  function fm(t, e, l) {
    var a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Tl(t, l), a & 4 && _u(5, l);
        break;
      case 1:
        if (Tl(t, l), a & 4)
          if (t = l.stateNode, e === null)
            try {
              t.componentDidMount();
            } catch (i) {
              Zt(l, l.return, i);
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
              Zt(
                l,
                l.return,
                i
              );
            }
          }
        a & 64 && Pd(l), a & 512 && bl(l, l.return);
        break;
      case 3:
        if (Tl(t, l), a & 64 && (t = l.updateQueue, t !== null)) {
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
            Xf(t, e);
          } catch (i) {
            Zt(l, l.return, i);
          }
        }
        break;
      case 27:
        e === null && a & 4 && am(l);
      case 26:
      case 5:
        Tl(t, l), e === null && a & 4 && Ws(l), a & 512 && bl(l, l.return);
        break;
      case 12:
        Tl(t, l);
        break;
      case 31:
        Tl(t, l), a & 4 && vm(t, l);
        break;
      case 13:
        Tl(t, l), a & 4 && gm(t, l), a & 64 && (t = l.memoizedState, t !== null && (t = t.dehydrated, t !== null && (l = dg.bind(
          null,
          l
        ), Jg(t, l))));
        break;
      case 22:
        if (a = l.memoizedState !== null || ve, !a) {
          var u = e !== null && e.memoizedState !== null || Vt;
          e = ve, n = Vt, ve = a, (Vt = u) && !n ? (a = 2, (l.subtreeFlags & 8772) !== 0 && (a |= 1), rl(
            t,
            l,
            a
          )) : Tl(t, l), ve = e, Vt = n;
        }
        break;
      case 30:
        Tl(t, l), a & 512 && bl(l, l.return);
        break;
      case 7:
        a & 512 && bl(l, l.return);
      default:
        Tl(t, l);
    }
  }
  function sr(t, e) {
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
        } catch (g) {
          Zt(t, t.return, g);
        }
        rr(t, e);
        break;
      case 6:
        try {
          t.stateNode.nodeValue = e ? "" : t.memoizedProps, Yt = !0;
        } catch (g) {
          Zt(t, t.return, g);
        }
        break;
      case 18:
        try {
          var o = t.stateNode;
          e ? nh(o, !0) : nh(t.stateNode, !1);
        } catch (g) {
          Zt(t, t.return, g);
        }
        break;
      case 22:
      case 23:
        t.memoizedState === null && sr(t, e);
        break;
      default:
        sr(t, e);
    }
  }
  function rr(t, e) {
    if (t.subtreeFlags & 67108864)
      for (t = t.child; t !== null; ) {
        t: {
          var l = t, a = e;
          switch (l.tag) {
            case 4:
              dm(l, a);
              break t;
            case 22:
              l.memoizedState === null && rr(l, a);
              break t;
            default:
              rr(l, a);
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
        Vt || Ee(l, e), cl(
          t,
          e,
          l
        ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && !Vt && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        Vt || Ee(l, e), Eu(l);
        var a = Pt, n = Be;
        ma(l.type) && (Pt = l.stateNode, Be = !1), cl(
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
        Vt || Ee(l, e), Eu(l);
      case 6:
        if (l.tag === 6 && Eu(l), a = Pt, n = Be, Pt = null, cl(
          t,
          e,
          l
        ), Pt = a, Be = n, Pt !== null)
          if (Be)
            try {
              (Pt.nodeType === 9 ? Pt.body : Pt.nodeName === "HTML" ? Pt.ownerDocument.body : Pt).removeChild(l.stateNode), Yt = !0;
            } catch (u) {
              Zt(
                l,
                e,
                u
              );
            }
          else
            try {
              Pt.removeChild(l.stateNode), Yt = !0;
            } catch (u) {
              Zt(
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
        ), Xn(t)) : ah(Pt, l.stateNode));
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
        ia(2, l, e), Vt || ia(4, l, e), cl(
          t,
          e,
          l
        );
        break;
      case 1:
        Vt || (Ee(l, e), a = l.stateNode, typeof a.componentWillUnmount == "function" && tm(
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
        Vt = (a = Vt) || l.memoizedState !== null, cl(
          t,
          e,
          l
        ), Vt = a;
        break;
      case 30:
        Ee(l, e), cl(
          t,
          e,
          l
        );
        break;
      case 7:
        Vt || Ee(l, e), cl(
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
        Xn(t);
      } catch (l) {
        Zt(e, e.return, l);
      }
    }
  }
  function gm(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        Xn(t);
      } catch (l) {
        Zt(e, e.return, l);
      }
  }
  function eg(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return e === null && (e = t.stateNode = new om()), e;
      case 22:
        return t = t.stateNode, e = t._retryCache, e === null && (e = t._retryCache = new om()), e;
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
        var u = a[n], i = t, o = e, g = o;
        t: for (; g !== null; ) {
          switch (g.tag) {
            case 27:
              if (ma(g.type)) {
                Pt = g.stateNode, Be = !1;
                break t;
              }
              break;
            case 5:
              Pt = g.stateNode, Be = !1;
              break t;
            case 3:
            case 4:
              Pt = g.stateNode.containerInfo, Be = !0;
              break t;
          }
          g = g.return;
        }
        if (Pt === null) throw Error(s(160));
        hm(i, o, u), Pt = null, Be = !1, i = u.alternate, i !== null && (i.return = null), u.return = null;
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
        Ae(e, t, l), Ce(t), n & 4 && (ia(3, t, t.return), _u(3, t), ia(5, t, t.return));
        break;
      case 1:
        Ae(e, t, l), Ce(t), n & 512 && (Vt || a === null || Ee(a, a.return)), n & 64 && ve && (t = t.updateQueue, t !== null && (e = t.callbacks, e !== null && (l = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = l === null ? e : l.concat(e))));
        break;
      case 26:
        if (u = sl, Ae(e, t, l), Ce(t), n & 512 && (Vt || a === null || Ee(a, a.return)), n & 4)
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
                        a = n.getElementsByTagName("title")[0], (!a || a[kn] || a[be] || a.namespaceURI === "http://www.w3.org/2000/svg" || a.hasAttribute("itemprop")) && (a = n.createElement(e), n.head.insertBefore(
                          a,
                          n.querySelector("head > title")
                        )), Te(a, e, l), a[be] = t, me(a), e = a;
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
                        a = n.createElement(e), Te(a, e, l), n.head.appendChild(a);
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
                        a = n.createElement(e), Te(a, e, l), n.head.appendChild(a);
                        break;
                      default:
                        throw Error(s(468, e));
                    }
                    a[be] = t, me(a), e = a;
                  }
                  t.stateNode = e;
                }
              else
                ve || Jr(u, t.type, t.stateNode);
            else
              t.stateNode = Th(
                u,
                l,
                t.memoizedProps
              );
          else
            n !== l ? (n === null ? (e = a.stateNode, e === null || Vt || e.parentNode.removeChild(e)) : n.count--, l === null ? ve || Jr(u, t.type, t.stateNode) : Th(u, l, t.memoizedProps)) : l === null && t.stateNode !== null && Is(
              t,
              t.memoizedProps,
              a.memoizedProps
            );
        break;
      case 27:
        Ae(e, t, l), Ce(t), n & 512 && (Vt || a === null || Ee(a, a.return)), a !== null && n & 4 && Is(
          t,
          t.memoizedProps,
          a.memoizedProps
        );
        break;
      case 5:
        if (u = _l, _l = !1, Ae(e, t, l), _l = u, Ce(t), n & 512 && (Vt || a === null || Ee(a, a.return)), t.flags & 32) {
          e = t.stateNode;
          try {
            nn(e, ""), Yt = !0;
          } catch (z) {
            Zt(t, t.return, z);
          }
        }
        n & 4 && t.stateNode != null && (e = t.memoizedProps, Is(
          t,
          e,
          a !== null ? a.memoizedProps : e
        )), n & 1024 && (ir = !0);
        break;
      case 6:
        if (Ae(e, t, l), Ce(t), n & 4) {
          if (t.stateNode === null)
            throw Error(s(162));
          e = t.memoizedProps, l = t.stateNode;
          try {
            l.nodeValue = e, Yt = !0;
          } catch (z) {
            Zt(t, t.return, z);
          }
        }
        break;
      case 3:
        if (Yt = !1, oc = null, u = sl, sl = Ru(e.containerInfo), Ae(e, t, l), sl = u, Ce(t), n & 4 && a !== null && a.memoizedState.isDehydrated)
          try {
            Xn(e.containerInfo);
          } catch (z) {
            Zt(t, t.return, z);
          }
        ir && (ir = !1, bm(t)), Yt = !1;
        break;
      case 4:
        n = _l, _l = ve, a = Ho(), u = sl, sl = Ru(
          t.stateNode.containerInfo
        ), Ae(e, t, l), Ce(t), sl = u, Yt && Tu && (Ji = !0), Yt = a, _l = n;
        break;
      case 12:
        Ae(e, t, l), Ce(t);
        break;
      case 31:
        Ae(e, t, l), Ce(t), n & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, ki(t, e)));
        break;
      case 13:
        Ae(e, t, l), Ce(t), t.child.flags & 8192 && t.memoizedState !== null != (a !== null && a.memoizedState !== null) && (Ii = ht()), n & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, ki(t, e)));
        break;
      case 22:
        u = t.memoizedState !== null, i = a !== null && a.memoizedState !== null;
        var o = ve, g = Vt, N = _l;
        ve = o || u, _l = N || u, Vt = g || i, Ae(e, t, l), Vt = g, _l = N, ve = o, Ce(t), n & 8192 && (e = t.stateNode, e._visibility = u ? e._visibility & -2 : e._visibility | 1, !u || a === null || i || ve || Vt || (e = i || Vt, l = ve, a = Vt, ve = u || ve, Vt = e, ca(t, 2), ve = l, Vt = a), !u && _l || sr(t, u)), n & 4 && (e = t.updateQueue, e !== null && (l = e.retryQueue, l !== null && (e.retryQueue = null, ki(t, l))));
        break;
      case 19:
        Ae(e, t, l), Ce(t), n & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, ki(t, e)));
        break;
      case 30:
        n & 512 && (Vt || a === null || Ee(a, a.return)), n = Ho(), u = Tu, i = (l & 335544064) === l, o = t.memoizedProps, Tu = i && Rl(
          o.default,
          o.update
        ) !== "none", Ae(e, t, l), Ce(t), i && a !== null && Yt && (t.flags |= 4), Tu = u, Yt = n;
        break;
      case 21:
        break;
      case 7:
        n & 512 && (Vt || a === null || Ee(a, a.return)), a && a.stateNode !== null && (a.stateNode._fragmentFiber = t);
      default:
        Ae(e, t, l), Ce(t);
    }
  }
  function Ce(t) {
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
          if (Fs(n)) {
            var u = n.stateNode;
            a === null ? a = [u] : a.push(u);
          }
          if (ks(n)) break;
          n = n.return;
        }
        var i = a;
        if (l == null) throw Error(s(160));
        switch (l.tag) {
          case 27:
            var o = l.stateNode, g = Ps(t);
            Vi(
              t,
              g,
              o,
              i
            );
            break;
          case 5:
            var N = l.stateNode;
            l.flags & 32 && (nn(N, ""), l.flags &= -33);
            var z = Ps(t);
            Vi(
              t,
              z,
              N,
              i
            );
            break;
          case 3:
          case 4:
            var B = l.stateNode.containerInfo, _ = Ps(t);
            tr(
              t,
              _,
              B,
              i
            );
            break;
          default:
            throw Error(s(161));
        }
      } catch (O) {
        Zt(t, t.return, O);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function bm(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        bm(e), e.tag === 5 && e.flags & 1024 && (e = e.stateNode, Gn = !0, e.reset(), Gn = !1), t = t.sibling;
      }
  }
  function Nn(t, e) {
    if (e.subtreeFlags & 9270)
      for (e = e.child; e !== null; )
        pm(e, t), e = e.sibling;
    else rm(e);
  }
  function pm(t, e) {
    var l = t.alternate;
    if (l === null) er(t, !1);
    else
      switch (t.tag) {
        case 3:
          if (cr = El = !1, um(), Nn(e, t), !El && !Ji) {
            if (t = pl, t !== null)
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
            )), cr = !0;
          }
          pl = null;
          break;
        case 5:
          Nn(e, t);
          break;
        case 4:
          a = El, El = !1, Nn(e, t), El && (Ji = !0), El = a;
          break;
        case 22:
          t.memoizedState === null && (l.memoizedState !== null ? er(t, !1) : Nn(e, t));
          break;
        case 30:
          a = El, n = um(), El = !1, Nn(e, t), El && (t.flags |= 4);
          var u = t.memoizedProps, i = t.stateNode;
          e = jl(u, i), i = jl(l.memoizedProps, i);
          var o = Rl(u.default, u.update);
          o === "none" ? e = !1 : (u = l.memoizedState, l.memoizedState = null, l = t.child, Ue = 0, e = ur(
            t,
            l,
            e,
            i,
            o,
            u,
            !0
          ), Ue !== (u === null ? 0 : u.length) && (t.flags |= 32)), (t.flags & 4) !== 0 && e ? (jn(
            t,
            t.memoizedProps.onUpdate
          ), pl = n) : n !== null && (n.push.apply(n, pl), pl = n), El = (t.flags & 32) !== 0 ? !0 : a;
          break;
        default:
          Nn(e, t);
      }
  }
  function Tl(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; )
        fm(t, e.alternate, e), e = e.sibling;
  }
  function ca(t, e) {
    for (t = t.child; t !== null; ) {
      var l = t, a = e;
      switch (l.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ia(4, l, l.return), ca(
            l,
            a
          );
          break;
        case 1:
          Ee(l, l.return);
          var n = l.stateNode;
          typeof n.componentWillUnmount == "function" && tm(
            l,
            l.return,
            n
          ), ca(
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
          Ee(l, l.return), l.tag !== 5 && l.tag !== 27 || Eu(l), ca(
            l,
            a
          );
          break;
        case 6:
          Eu(l);
          break;
        case 26:
          Ee(l, l.return), n = l.stateNode, l.memoizedState !== null || n === null || Vt || n.parentNode.removeChild(n), ca(
            l,
            a
          );
          break;
        case 22:
          l.memoizedState === null && ca(
            l,
            a
          );
          break;
        case 30:
          Ee(l, l.return), ca(
            l,
            a
          );
          break;
        case 7:
          Ee(l, l.return);
        default:
          ca(
            l,
            a
          );
      }
      t = t.sibling;
    }
  }
  function rl(t, e, l) {
    for (l = (e.subtreeFlags & 8772) !== 0 ? l : l & -2, e = e.child; e !== null; ) {
      var a = e.alternate, n = t, u = e, i = u.flags, o = (l & 1) !== 0;
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
              Zt(a, a.return, z);
            }
          if (a = u, n = a.updateQueue, n !== null) {
            var g = a.stateNode;
            try {
              var N = n.shared.hiddenCallbacks;
              if (N !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < N.length; n++)
                  Gf(N[n], g);
            } catch (z) {
              Zt(a, a.return, z);
            }
          }
          o && i & 64 && Pd(u), bl(u, u.return);
          break;
        case 27:
          (l & 2) !== 0 && am(u);
        case 5:
          u.tag !== 5 && u.tag !== 27 || em(u), rl(
            n,
            u,
            l
          ), o && a === null && i & 4 && Ws(u), bl(u, u.return);
          break;
        case 6:
          em(u);
          break;
        case 26:
          g = u.stateNode, u.memoizedState !== null || g === null || ve || Jr(
            Ru(g.ownerDocument),
            u.type,
            g
          ), rl(
            n,
            u,
            l
          ), o && a === null && i & 4 && Ws(u), bl(u, u.return);
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
          ), o && i & 4 && vm(n, u);
          break;
        case 13:
          rl(
            n,
            u,
            l
          ), o && i & 4 && gm(n, u);
          break;
        case 22:
          u.memoizedState === null && rl(
            n,
            u,
            l
          ), bl(u, u.return);
          break;
        case 30:
          rl(
            n,
            u,
            l
          ), bl(u, u.return);
          break;
        case 7:
          bl(u, u.return);
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
  function or(t, e) {
    var l = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), t = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), t !== l && (t != null && t.refCount++, l != null && su(l));
  }
  function fr(t, e) {
    t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && su(t));
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
    n && e.alternate === null && e.return !== null && e.return.alternate !== null && Ki(e);
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
        ), u & 2048 && _u(9, e);
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
        ), n && cr && (t = t.containerInfo, t = t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, t.style.viewTransitionName === "root" && (t.style.viewTransitionName = ""), t = t.ownerDocument.documentElement, t !== null && t.style.viewTransitionName === "none" && (t.style.viewTransitionName = "")), u & 2048 && (u = null, e.alternate !== null && (u = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== u && (e.refCount++, u != null && su(u)));
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
            var i = e.memoizedProps, o = i.id, g = i.onPostCommit;
            typeof g == "function" && g(
              o,
              e.alternate === null ? "mount" : "update",
              u.passiveEffectDuration,
              -0
            );
          } catch (N) {
            Zt(e, e.return, N);
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
        i = e.stateNode, o = e.alternate, e.memoizedState !== null ? (n && o !== null && o.memoizedState === null && Ki(o), i._visibility & 2 ? ll(
          t,
          e,
          l,
          a
        ) : Nu(
          t,
          e
        )) : (n && o !== null && o.memoizedState !== null && Ki(e), i._visibility & 2 ? ll(
          t,
          e,
          l,
          a
        ) : (i._visibility |= 2, xn(
          t,
          e,
          l,
          a,
          (e.subtreeFlags & 10256) !== 0 || !1
        ))), u & 2048 && or(o, e);
        break;
      case 24:
        ll(
          t,
          e,
          l,
          a
        ), u & 2048 && fr(e.alternate, e);
        break;
      case 30:
        n && (u = e.alternate, u !== null && (Sl(u.child, !0), Sl(e.child, !0))), ll(
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
  function xn(t, e, l, a, n) {
    for (n = n && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var u = t, i = e, o = l, g = a, N = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          xn(
            u,
            i,
            o,
            g,
            n
          ), _u(8, i);
          break;
        case 23:
          break;
        case 22:
          var z = i.stateNode;
          i.memoizedState !== null ? z._visibility & 2 ? xn(
            u,
            i,
            o,
            g,
            n
          ) : Nu(
            u,
            i
          ) : (z._visibility |= 2, xn(
            u,
            i,
            o,
            g,
            n
          )), n && N & 2048 && or(
            i.alternate,
            i
          );
          break;
        case 24:
          xn(
            u,
            i,
            o,
            g,
            n
          ), n && N & 2048 && fr(i.alternate, i);
          break;
        default:
          xn(
            u,
            i,
            o,
            g,
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
            Nu(l, a), n & 2048 && or(
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
        xu(t), t.flags & 2048 && ia(9, t, t.return);
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
          ia(8, e, e.return), Fi(e);
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
          ia(8, l, e);
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
      var e = pe(ce), l = e.data.get(t);
      return l === void 0 && (l = t(), e.data.set(t, l)), l;
    },
    cacheSignal: function() {
      return pe(ce).controller.signal;
    }
  }, ag = typeof WeakMap == "function" ? WeakMap : Map, Gt = 0, Ft = null, zt = null, Rt = 0, Qt = 0, Ze = null, sa = !1, Mn = !1, dr = !1, Gl = 0, ae = 0, ra = 0, Qa = 0, Wi = 0, Ke = 0, On = 0, Mu = null, He = null, mr = !1, Ii = 0, xm = 0, Pi = 1 / 0, tc = null, oa = null, te = 0, ol = null, Za = null, Nl = 0, hr = 0, vr = null, Mm = null, zn = null, An = null, Cn = null, Ou = 0, ec = null;
  function Je() {
    return (Gt & 2) !== 0 && Rt !== 0 ? Rt & -Rt : Q.T !== null ? xr() : zo();
  }
  function Om() {
    if (Ke === 0)
      if ((Rt & 536870912) === 0 || xt) {
        var t = ku;
        ku <<= 1, (ku & 3932160) === 0 && (ku = 262144), Ke = t;
      } else Ke = 536870912;
    return t = Se.current, t !== null && (t.flags |= 32), Ke;
  }
  function jn(t, e) {
    if (e != null) {
      var l = t.stateNode, a = l.ref;
      a === null && (a = l.ref = ch(
        jl(t.memoizedProps, l)
      )), An === null && (An = []), An.push(e.bind(null, a));
    }
  }
  function Le(t, e, l) {
    (t === Ft && (Qt === 2 || Qt === 9) || t.cancelPendingCommit !== null) && (Rn(t, 0), fa(
      t,
      Rt,
      Ke,
      !1
    )), $n(t, l), ((Gt & 2) === 0 || t !== Ft) && (t === Ft && ((Gt & 2) === 0 && (Qa |= l), ae === 4 && fa(
      t,
      Rt,
      Ke,
      !1
    )), xl(t));
  }
  function zm(t, e, l) {
    if ((Gt & 6) !== 0) throw Error(s(327));
    var a = !l && (e & 127) === 0 && (e & t.expiredLanes) === 0 || Jn(t, e), n = a ? ig(t, e) : yr(t, e, !0), u = a;
    do {
      if (n === 0) {
        Mn && !a && fa(t, e, 0, !1);
        break;
      } else {
        if (l = t.current.alternate, u && !ng(l)) {
          n = yr(t, e, !1), u = !1;
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
              var o = t;
              n = Mu;
              var g = o.current.memoizedState.isDehydrated;
              if (g && (Rn(o, i).flags |= 256), i = yr(
                o,
                i,
                !1
              ), i !== 2 && i !== 6) {
                if (dr && !g) {
                  o.errorRecoveryDisabledLanes |= u, Qa |= u, n = 4;
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
          Rn(t, 0), fa(t, e, 0, !0);
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
                !sa
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
          if ((e & 62914560) === e && (n = Ii + 300 - ht(), 10 < n)) {
            if (fa(
              a,
              e,
              Ke,
              !sa
            ), Wu(a, 0, !0) !== 0) break t;
            Nl = e, a.timeoutHandle = Br(
              Am.bind(
                null,
                a,
                l,
                He,
                tc,
                mr,
                e,
                Ke,
                Qa,
                On,
                sa,
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
            He,
            tc,
            mr,
            e,
            Ke,
            Qa,
            On,
            sa,
            u,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    xl(t);
  }
  function Am(t, e, l, a, n, u, i, o, g, N, z, B, _, O) {
    t.timeoutHandle = -1;
    var V = e.subtreeFlags, tt = (u & 335544064) === u;
    if (B = null, (tt || V & 8192 || (V & 16785408) === 16785408) && (B = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: vl
    }, Qe = null, _m(
      e,
      u,
      B
    ), tt && (V = B, tt = t.containerInfo, tt = (tt.nodeType === 9 ? tt : tt.ownerDocument).__reactViewTransition, tt != null && (V.count++, V.waitingForViewTransition = !0, V = Uu.bind(V), tt.finished.then(V, V))), V = (u & 62914560) === u ? Ii - ht() : (u & 4194048) === u ? xm - ht() : 0, V = sy(
      B,
      V
    ), V !== null)) {
      Nl = u, t.cancelPendingCommit = V(
        Hm.bind(
          null,
          t,
          e,
          u,
          l,
          a,
          n,
          i,
          o,
          g,
          N,
          z,
          B,
          null,
          _,
          O
        )
      ), fa(t, u, i, !N);
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
      o,
      g,
      N,
      z,
      B
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
    e = To(t, e), e &= ~Wi, e &= ~Qa, t.suspendedLanes |= e, t.pingedLanes &= ~e, a && (t.warmLanes |= e), a = t.expirationTimes;
    for (var n = e; 0 < n; ) {
      var u = 31 - qe(n), i = 1 << u;
      a[u] = -1, n &= ~i;
    }
    l !== 0 && xo(t, l, e);
  }
  function lc() {
    return (Gt & 6) === 0 ? (zu(0), !1) : !0;
  }
  function gr() {
    if (zt !== null) {
      if (Qt === 0)
        var t = zt.return;
      else
        t = zt, Ul = Ra = null, Ns(t), bn = null, fu = 0, t = zt;
      for (; t !== null; )
        Id(t.alternate, t), t = t.return;
      zt = null;
    }
  }
  function Rn(t, e) {
    var l = t.timeoutHandle;
    return l !== -1 && (t.timeoutHandle = -1, zg(l)), l = t.cancelPendingCommit, l !== null && (t.cancelPendingCommit = null, l()), Nl = 0, gr(), Ft = t, zt = l = Dl(t.current, null), Rt = e, Qt = 0, Ze = null, sa = !1, Mn = Jn(t, e), dr = !1, On = Ke = Wi = Qa = ra = ae = 0, He = Mu = null, mr = !1, Gl = To(t, e), oi(), l;
  }
  function Cm(t, e) {
    pt = null, Q.H = Ui, e === yn || e === _i ? (e = Hf(), Qt = 3) : e === fs ? (e = Hf(), Qt = 4) : Qt = e === Ys ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, Ze = e, zt === null && (ae = 1, Bi(
      t,
      Ie(e, t.current)
    ));
  }
  function jm() {
    var t = Se.current;
    return t === null ? !0 : (Rt & 4194048) === Rt ? xe === null : (Rt & 62914560) === Rt || (Rt & 536870912) !== 0 ? t === xe : !1;
  }
  function Rm() {
    var t = Q.H;
    return Q.H = Ui, t === null ? Ui : t;
  }
  function Dm() {
    var t = Q.A;
    return Q.A = lg, t;
  }
  function ac() {
    ae = 4, sa || (Rt & 4194048) !== Rt && Se.current !== null || (Mn = !0), (ra & 134217727) === 0 && (Qa & 134217727) === 0 || Ft === null || fa(
      Ft,
      Rt,
      Ke,
      !1
    );
  }
  function yr(t, e, l) {
    var a = Gt;
    Gt |= 2;
    var n = Rm(), u = Dm();
    (Ft !== t || Rt !== e) && (tc = null, Rn(t, e)), e = !1;
    var i = ae;
    t: do
      try {
        if (Qt !== 0 && zt !== null) {
          var o = zt, g = Ze;
          switch (Qt) {
            case 8:
              gr(), i = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              Se.current === null && (e = !0);
              var N = Qt;
              if (Qt = 0, Ze = null, Dn(t, o, g, N), l && Mn) {
                i = 0;
                break t;
              }
              break;
            default:
              N = Qt, Qt = 0, Ze = null, Dn(t, o, g, N);
          }
        }
        ug(), i = ae;
        break;
      } catch (z) {
        Cm(t, z);
      }
    while (!0);
    return e && t.shellSuspendCounter++, Ul = Ra = null, Gt = a, Q.H = n, Q.A = u, zt === null && (Ft = null, Rt = 0, oi()), i;
  }
  function ug() {
    for (; zt !== null; ) wm(zt);
  }
  function ig(t, e) {
    var l = Gt;
    Gt |= 2;
    var a = Rm(), n = Dm();
    Ft !== t || Rt !== e ? (tc = null, Pi = ht() + 500, Rn(t, e)) : Mn = Jn(
      t,
      e
    );
    t: do
      try {
        if (Qt !== 0 && zt !== null) {
          e = zt;
          var u = Ze;
          e: switch (Qt) {
            case 1:
              Qt = 0, Ze = null, Dn(t, e, u, 1);
              break;
            case 2:
            case 9:
              if (Uf(u)) {
                Qt = 0, Ze = null, Um(e);
                break;
              }
              e = function() {
                Qt !== 2 && Qt !== 9 || Ft !== t || (Qt = 7), xl(t);
              }, u.then(e, e);
              break t;
            case 3:
              Qt = 7;
              break t;
            case 4:
              Qt = 5;
              break t;
            case 7:
              Uf(u) ? (Qt = 0, Ze = null, Um(e)) : (Qt = 0, Ze = null, Dn(t, e, u, 7));
              break;
            case 5:
              var i = null;
              switch (zt.tag) {
                case 26:
                  i = zt.memoizedState;
                case 5:
                case 27:
                  var o = zt;
                  if (i ? Mh(i) : o.stateNode.complete) {
                    Qt = 0, Ze = null;
                    var g = o.sibling;
                    if (g !== null) zt = g;
                    else {
                      var N = o.return;
                      N !== null ? (zt = N, nc(N)) : zt = null;
                    }
                    break e;
                  }
              }
              Qt = 0, Ze = null, Dn(t, e, u, 5);
              break;
            case 6:
              Qt = 0, Ze = null, Dn(t, e, u, 6);
              break;
            case 8:
              gr(), ae = 6;
              break t;
            default:
              throw Error(s(462));
          }
        }
        cg();
        break;
      } catch (z) {
        Cm(t, z);
      }
    while (!0);
    return Ul = Ra = null, Q.H = a, Q.A = n, Gt = l, zt !== null ? 0 : (Ft = null, Rt = 0, oi(), ae);
  }
  function cg() {
    for (; zt !== null && !k(); )
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
          Rt
        );
        break;
      case 11:
        e = Vd(
          l,
          e,
          e.pendingProps,
          e.type.render,
          e.ref,
          Rt
        );
        break;
      case 5:
        Ns(e);
        var a = e;
        a === he && (xt ? (gi(a), a.tag === 5 && a.stateNode != null && (Wt = a.stateNode)) : (gi(a), xt = !0));
      default:
        Id(l, e), e = zt = Nf(e, Gl), e = Fd(l, e, Gl);
    }
    t.memoizedProps = t.pendingProps, e === null ? nc(t) : zt = e;
  }
  function Dn(t, e, l, a) {
    Ul = Ra = null, Ns(e), bn = null, fu = 0;
    var n = e.return;
    try {
      if ($v(
        t,
        n,
        e,
        l,
        Rt
      )) {
        ae = 1, Bi(
          t,
          Ie(l, t.current)
        ), zt = null;
        return;
      }
    } catch (u) {
      if (n !== null) throw zt = n, u;
      ae = 1, Bi(
        t,
        Ie(l, t.current)
      ), zt = null;
      return;
    }
    e.flags & 32768 ? (xt || a === 1 ? t = !0 : Mn || (Rt & 536870912) !== 0 ? t = !1 : (sa = t = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = Se.current, a !== null && a.tag === 13 && (a.flags |= 16384))), Bm(e, t)) : nc(e);
  }
  function nc(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        Bm(
          e,
          sa
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
    ae === 0 && (ae = 5);
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
    ae = 6, zt = null;
  }
  function Hm(t, e, l, a, n, u, i, o, g, N, z, B) {
    t.cancelPendingCommit = null;
    do
      uc();
    while (te !== 0);
    if ((Gt & 6) !== 0) throw Error(s(327));
    if (e !== null) {
      if (e === t.current) throw Error(s(177));
      t === Ft && (zt = Ft = null, Rt = 0), Za = e, ol = t, Nl = l, vr = n, Mm = a, sg(
        t,
        e,
        l,
        i,
        o,
        g,
        B
      );
    }
  }
  function sg(t, e, l, a, n, u, i) {
    var o = e.lanes | e.childLanes;
    if (hr = o, o |= Ic, w0(
      t,
      l,
      o,
      a,
      n,
      u
    ), An = null, (l & 335544064) === l ? (Cn = Bv(t), a = 10262) : (Cn = null, a = 10256), (e.subtreeFlags & a) !== 0 || (e.flags & a) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, hg(Ju, function() {
      return _r(), null;
    })) : (t.callbackNode = null, t.callbackPriority = 0), Qi = !1, a = (e.flags & 13878) !== 0, (e.subtreeFlags & 13878) !== 0 || a) {
      a = Q.T, Q.T = null, n = ut.p, ut.p = 2, u = Gt, Gt |= 4;
      try {
        tg(t, e, l);
      } finally {
        Gt = u, ut.p = n, Q.T = a;
      }
    }
    te = 1, Qi ? zn = wg(
      i,
      t.containerInfo,
      Cn,
      br,
      pr,
      og,
      Sr,
      _r,
      rg
    ) : (br(), pr(), Sr());
  }
  function rg(t) {
    if (te !== 0) {
      var e = ol.onRecoverableError;
      e(t, { componentStack: null });
    }
  }
  function og() {
    te === 3 && (te = 0, pm(Za, ol), te = 4);
  }
  function br() {
    if (te === 1) {
      te = 0;
      var t = ol, e = Za, l = Nl, a = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || a) {
        a = Q.T, Q.T = null;
        var n = ut.p;
        ut.p = 2;
        var u = Gt;
        Gt |= 4;
        try {
          Tu = Ji = !1, ym(e, t, l), l = Dr;
          var i = hf(t.containerInfo), o = l.focusedElem, g = l.selectionRange;
          if (i !== o && o && o.ownerDocument && mf(
            o.ownerDocument.documentElement,
            o
          )) {
            if (g !== null && Jc(o)) {
              var N = g.start, z = g.end;
              if (z === void 0 && (z = N), "selectionStart" in o)
                o.selectionStart = N, o.selectionEnd = Math.min(
                  z,
                  o.value.length
                );
              else {
                var B = o.ownerDocument || document, _ = B && B.defaultView || window;
                if (_.getSelection) {
                  var O = _.getSelection(), V = o.textContent.length, tt = Math.min(g.start, V), St = g.end === void 0 ? tt : Math.min(g.end, V);
                  !O.extend && tt > St && (i = St, St = tt, tt = i);
                  var E = df(
                    o,
                    tt
                  ), p = df(
                    o,
                    St
                  );
                  if (E && p && (O.rangeCount !== 1 || O.anchorNode !== E.node || O.anchorOffset !== E.offset || O.focusNode !== p.node || O.focusOffset !== p.offset)) {
                    var M = B.createRange();
                    M.setStart(E.node, E.offset), O.removeAllRanges(), tt > St ? (O.addRange(M), O.extend(p.node, p.offset)) : (M.setEnd(p.node, p.offset), O.addRange(M));
                  }
                }
              }
            }
            for (B = [], O = o; O = O.parentNode; )
              O.nodeType === 1 && B.push({
                element: O,
                left: O.scrollLeft,
                top: O.scrollTop
              });
            for (typeof o.focus == "function" && o.focus(), o = 0; o < B.length; o++) {
              var U = B[o];
              U.element.scrollLeft = U.left, U.element.scrollTop = U.top;
            }
          }
          Gn = !!Rr, Dr = Rr = null;
        } finally {
          Gt = u, ut.p = n, Q.T = a;
        }
      }
      t.current = e, te = 2;
    }
  }
  function pr() {
    if (te === 2) {
      te = 0;
      var t = ol, e = Za, l = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || l) {
        l = Q.T, Q.T = null;
        var a = ut.p;
        ut.p = 2;
        var n = Gt;
        Gt |= 4;
        try {
          fm(t, e.alternate, e);
        } finally {
          Gt = n, ut.p = a, Q.T = l;
        }
      }
      te = 3;
    }
  }
  function Sr() {
    if (te === 4 || te === 3) {
      te = 0;
      var t = zn;
      zn = null, Nt();
      var e = ol, l = Za, a = Nl, n = Mm, u = (a & 335544064) === a ? 10262 : 10256;
      if ((l.subtreeFlags & u) !== 0 || (l.flags & u) !== 0 ? te = 5 : (te = 0, Za = ol = null, Lm(e, e.pendingLanes)), u = e.pendingLanes, u === 0 && (oa = null), Ac(a), l = l.stateNode, Ye && typeof Ye.onCommitFiberRoot == "function")
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
        l = Q.T, u = ut.p, ut.p = 2, Q.T = null;
        try {
          for (var i = e.onRecoverableError, o = 0; o < n.length; o++) {
            var g = n[o];
            i(g.value, {
              componentStack: g.stack
            });
          }
        } finally {
          Q.T = l, ut.p = u;
        }
      }
      if (n = An, i = Cn, Cn = null, n !== null && (An = null, i === null && (i = []), t !== null))
        for (g = 0; g < n.length; g++)
          l = (0, n[g])(
            i
          ), l !== void 0 && t.finished.finally(l);
      (Nl & 3) !== 0 && uc(), xl(e), u = e.pendingLanes, (a & 261930) !== 0 && (u & 42) !== 0 ? e === ec ? Ou++ : (Ou = 0, ec = e) : (Ou = 0, ec = null), zu(0);
    }
  }
  function Lm(t, e) {
    (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, su(e)));
  }
  function uc() {
    return zn !== null && (zn.skipTransition(), zn = null), br(), pr(), Sr(), _r();
  }
  function _r() {
    if (te !== 5) return !1;
    var t = ol, e = hr;
    hr = 0;
    var l = Ac(Nl), a = Q.T, n = ut.p;
    try {
      ut.p = 32 > l ? 32 : l, Q.T = null, l = vr, vr = null;
      var u = ol, i = Nl;
      if (te = 0, Za = ol = null, Nl = 0, (Gt & 6) !== 0) throw Error(s(331));
      var o = Gt;
      if (Gt |= 4, Tm(u.current), Sm(
        u,
        u.current,
        i,
        l
      ), Gt = o, zu(0, !1), Ye && typeof Ye.onPostCommitFiberRoot == "function")
        try {
          Ye.onPostCommitFiberRoot(Kn, u);
        } catch {
        }
      return !0;
    } finally {
      ut.p = n, Q.T = a, Lm(t, e);
    }
  }
  function Ym(t, e, l) {
    e = Ie(l, e), e = Ls(t.stateNode, e, 2), t = la(t, e, 2), t !== null && ($n(t, 2), xl(t));
  }
  function Zt(t, e, l) {
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
          if (typeof e.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (oa === null || !oa.has(a))) {
            t = Ie(l, t), l = Ud(2), a = la(e, l, 2), a !== null && (Bd(
              l,
              a,
              e,
              t
            ), $n(a, 2), xl(a));
            break;
          }
        }
        e = e.return;
      }
  }
  function Er(t, e, l) {
    var a = t.pingCache;
    if (a === null) {
      a = t.pingCache = new ag();
      var n = /* @__PURE__ */ new Set();
      a.set(e, n);
    } else
      n = a.get(e), n === void 0 && (n = /* @__PURE__ */ new Set(), a.set(e, n));
    n.has(l) || (dr = !0, n.add(l), t = fg.bind(null, t, e, l), e.then(t, t));
  }
  function fg(t, e, l) {
    var a = t.pingCache;
    a !== null && a.delete(e), t.pingedLanes |= t.suspendedLanes & l, t.warmLanes &= ~l, Ft === t && (Rt & l) === l && ((ae === 4 || ae === 3 && (Rt & 62914560) === Rt && 300 > ht() - Ii) && (Gt & 2) === 0 ? Rn(t, 0) : Wi |= l, On === Rt && (On = 0)), xl(t);
  }
  function qm(t, e) {
    e === 0 && (e = No()), t = Aa(t, e), t !== null && ($n(t, e), xl(t));
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
    return rt(t, e);
  }
  var wn = null, Un = null, Tr = !1, ic = !1, Nr = !1, da = 0;
  function xl(t) {
    t !== Un && t.next === null && (Un === null ? wn = Un = t : Un = Un.next = t), ic = !0, Tr || (Tr = !0, gg());
  }
  function zu(t, e) {
    if (!Nr && ic) {
      Nr = !0;
      do
        for (var l = !1, a = wn; a !== null; ) {
          if (t !== 0) {
            var n = a.pendingLanes;
            if (n === 0) var u = 0;
            else {
              var i = a.suspendedLanes, o = a.pingedLanes;
              u = (1 << 31 - qe(42 | t) + 1) - 1, u &= n & ~(i & ~o), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (l = !0, Qm(a, u));
          } else
            u = Rt, u = Wu(
              a,
              a === Ft ? u : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (u & 3) === 0 || Jn(a, u) || (l = !0, Qm(a, u));
          a = a.next;
        }
      while (l);
      Nr = !1;
    }
  }
  function vg() {
    Gm();
  }
  function Gm() {
    ic = Tr = !1;
    var t = 0;
    da !== 0 && Og() && (t = da);
    for (var e = ht(), l = null, a = wn; a !== null; ) {
      var n = a.next, u = Xm(a, e);
      u === 0 ? (a.next = null, l === null ? wn = n : l.next = n, n === null && (Un = l)) : (l = a, (t !== 0 || (u & 3) !== 0) && (ic = !0)), a = n;
    }
    te !== 0 && te !== 5 || zu(t), da !== 0 && (da = 0);
  }
  function Xm(t, e) {
    for (var l = t.suspendedLanes, a = t.pingedLanes, n = t.expirationTimes, u = t.pendingLanes & -62914561; 0 < u; ) {
      var i = 31 - qe(u), o = 1 << i, g = n[i];
      g === -1 ? ((o & l) === 0 || (o & a) !== 0) && (n[i] = D0(o, e)) : g <= e && (t.expiredLanes |= o), u &= ~o;
    }
    if (e = Ft, l = Rt, l = Wu(
      t,
      t === e ? l : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a = t.callbackNode, l === 0 || t === e && (Qt === 2 || Qt === 9) || t.cancelPendingCommit !== null)
      return a !== null && a !== null && x(a), t.callbackNode = null, t.callbackPriority = 0;
    if ((l & 3) === 0 || Jn(t, l)) {
      if (e = l & -l, e === t.callbackPriority) return e;
      switch (a !== null && x(a), Ac(l)) {
        case 2:
        case 8:
          l = hl;
          break;
        case 32:
          l = Ju;
          break;
        case 268435456:
          l = Eo;
          break;
        default:
          l = Ju;
      }
      return a = Vm.bind(null, t), l = rt(l, a), t.callbackPriority = e, t.callbackNode = l, e;
    }
    return a !== null && a !== null && x(a), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function Vm(t, e) {
    if (te !== 0 && te !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var l = t.callbackNode;
    if (uc() && t.callbackNode !== l)
      return null;
    var a = Rt;
    return a = Wu(
      t,
      t === Ft ? a : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a === 0 ? null : (zm(t, a, e), Xm(t, ht()), t.callbackNode != null && t.callbackNode === l ? Vm.bind(null, t) : null);
  }
  function Qm(t, e) {
    if (uc()) return null;
    zm(t, e, !0);
  }
  function gg() {
    Ag(function() {
      (Gt & 6) !== 0 ? rt(
        ne,
        vg
      ) : Gm();
    });
  }
  function xr() {
    if (da === 0) {
      var t = Ua;
      t === 0 && (t = $u, $u <<= 1, ($u & 261888) === 0 && ($u = 256)), da = t;
    }
    return da;
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
      var o = new ii(
        "action",
        "action",
        null,
        a,
        n
      );
      t.push({
        event: o,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (a.defaultPrevented) {
                if (da !== 0) {
                  var g = new FormData(n, i);
                  Ds(
                    l,
                    {
                      pending: !0,
                      data: g,
                      method: n.method,
                      action: u
                    },
                    null,
                    g
                  );
                }
              } else
                typeof u == "function" && (o.preventDefault(), g = new FormData(n, i), Ds(
                  l,
                  {
                    pending: !0,
                    data: g,
                    method: n.method,
                    action: u
                  },
                  u,
                  g
                ));
            },
            currentTarget: n
          }
        ]
      });
    }
  }
  for (var Mr = 0; Mr < Wc.length; Mr++) {
    var Or = Wc[Mr], bg = Or.toLowerCase(), pg = Or[0].toUpperCase() + Or.slice(1);
    il(
      bg,
      "on" + pg
    );
  }
  il(yf, "onAnimationEnd"), il(bf, "onAnimationIteration"), il(pf, "onAnimationStart"), il("dblclick", "onDoubleClick"), il("focusin", "onFocus"), il("focusout", "onBlur"), il(zv, "onTransitionRun"), il(Av, "onTransitionStart"), il(Cv, "onTransitionCancel"), il(Sf, "onTransitionEnd"), ln("onMouseEnter", ["mouseout", "mouseover"]), ln("onMouseLeave", ["mouseout", "mouseover"]), ln("onPointerEnter", ["pointerout", "pointerover"]), ln("onPointerLeave", ["pointerout", "pointerover"]), Ma(
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
  var Au = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Sg = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Au)
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
            var o = a[i], g = o.instance, N = o.currentTarget;
            if (o = o.listener, g !== u && n.isPropagationStopped())
              break t;
            u = o, n.currentTarget = N;
            try {
              u(n);
            } catch (z) {
              ri(z);
            }
            n.currentTarget = null, u = g;
          }
        else
          for (i = 0; i < a.length; i++) {
            if (o = a[i], g = o.instance, N = o.currentTarget, o = o.listener, g !== u && n.isPropagationStopped())
              break t;
            u = o, n.currentTarget = N;
            try {
              u(n);
            } catch (z) {
              ri(z);
            }
            n.currentTarget = null, u = g;
          }
      }
    }
  }
  function At(t, e) {
    var l = e[Co];
    l === void 0 && (l = e[Co] = /* @__PURE__ */ new Set());
    var a = t + "__bubble";
    l.has(a) || (Jm(e, t, 2, !1), l.add(a));
  }
  function zr(t, e, l) {
    var a = 0;
    e && (a |= 4), Jm(
      l,
      t,
      a,
      e
    );
  }
  var cc = "_reactListening" + Math.random().toString(36).slice(2);
  function Ar(t) {
    if (!t[cc]) {
      t[cc] = !0, Do.forEach(function(l) {
        l !== "selectionchange" && (Sg.has(l) || zr(l, !1, t), zr(l, !0, t));
      });
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[cc] || (e[cc] = !0, zr("selectionchange", !1, e));
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
        n = kr;
    }
    l = n.bind(
      null,
      e,
      l,
      t
    ), n = void 0, !Hc || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (n = !0), a ? n !== void 0 ? t.addEventListener(e, l, {
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
          var o = a.stateNode.containerInfo;
          if (o === n) break;
          if (i === 4)
            for (i = a.return; i !== null; ) {
              var g = i.tag;
              if ((g === 3 || g === 4) && i.stateNode.containerInfo === n)
                return;
              i = i.return;
            }
          for (; o !== null; ) {
            if (i = xa(o), i === null) return;
            if (g = i.tag, g === 5 || g === 6 || g === 26 || g === 27) {
              a = u = i;
              continue t;
            }
            o = o.parentNode;
          }
        }
        a = a.return;
      }
    Ko(function() {
      var N = u, z = Uc(l), B = [];
      t: {
        var _ = _f.get(t);
        if (_ !== void 0) {
          var O = ii, V = t;
          switch (t) {
            case "keypress":
              if (ni(l) === 0) break t;
            case "keydown":
            case "keyup":
              O = nv;
              break;
            case "focusin":
              V = "focus", O = Gc;
              break;
            case "focusout":
              V = "blur", O = Gc;
              break;
            case "beforeblur":
            case "afterblur":
              O = Gc;
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
              O = ko;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              O = K0;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              O = rv;
              break;
            case yf:
            case bf:
            case pf:
              O = k0;
              break;
            case Sf:
              O = fv;
              break;
            case "scroll":
            case "scrollend":
              O = Q0;
              break;
            case "wheel":
              O = mv;
              break;
            case "copy":
            case "cut":
            case "paste":
              O = W0;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              O = Wo;
              break;
            case "submit":
              O = cv;
              break;
            case "toggle":
            case "beforetoggle":
              O = vv;
          }
          var tt = (e & 4) !== 0, St = !tt && (t === "scroll" || t === "scrollend"), E = tt ? _ !== null ? _ + "Capture" : null : _;
          tt = [];
          for (var p = N, M; p !== null; ) {
            var U = p;
            if (M = U.stateNode, U = U.tag, U !== 5 && U !== 26 && U !== 27 || M === null || E === null || (U = Wn(p, E), U != null && tt.push(
              Cu(p, U, M)
            )), St) break;
            p = p.return;
          }
          0 < tt.length && (_ = new O(
            _,
            V,
            null,
            l,
            z
          ), B.push({ event: _, listeners: tt }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (O = t === "mouseover" || t === "pointerover", _ = t === "mouseout" || t === "pointerout", O && l !== wc && (V = l.relatedTarget || l.fromElement) && (xa(V) || V[Pa]))
            break t;
          (_ || O) && (V = z.window === z ? z : (O = z.ownerDocument) ? O.defaultView || O.parentWindow : window, _ ? (O = l.relatedTarget || l.toElement, _ = N, O = O ? xa(O) : null, O !== null && (St = h(O), tt = O.tag, O !== St || tt !== 5 && tt !== 27 && tt !== 6) && (O = null)) : (_ = null, O = N), _ !== O && (tt = ko, U = "onMouseLeave", E = "onMouseEnter", p = "mouse", (t === "pointerout" || t === "pointerover") && (tt = Wo, U = "onPointerLeave", E = "onPointerEnter", p = "pointer"), St = _ == null ? V : Fn(_), M = O == null ? V : Fn(O), V = new tt(
            U,
            p + "leave",
            _,
            l,
            z
          ), V.target = St, V.relatedTarget = M, U = null, xa(z) === N && (tt = new tt(
            E,
            p + "enter",
            O,
            l,
            z
          ), tt.target = M, tt.relatedTarget = St, U = tt), St = U, tt = _ && O ? Bt(
            _,
            O,
            _g
          ) : null, _ !== null && $m(
            B,
            V,
            _,
            tt,
            !1
          ), O !== null && St !== null && $m(
            B,
            St,
            O,
            tt,
            !0
          )));
        }
        t: {
          if (_ = N ? Fn(N) : window, O = _.nodeName && _.nodeName.toLowerCase(), O === "select" || O === "input" && _.type === "file")
            var F = uf;
          else if (af(_))
            if (cf)
              F = xv;
            else {
              F = Tv;
              var Dt = Ev;
            }
          else
            O = _.nodeName, !O || O.toLowerCase() !== "input" || _.type !== "checkbox" && _.type !== "radio" ? N && Dc(N.elementType) && (F = uf) : F = Nv;
          if (F && (F = F(t, N))) {
            nf(
              B,
              F,
              l,
              z
            );
            break t;
          }
          Dt && Dt(t, _, N);
        }
        switch (Dt = N ? Fn(N) : window, t) {
          case "focusin":
            (af(Dt) || Dt.contentEditable === "true") && (rn = Dt, $c = N, uu = null);
            break;
          case "focusout":
            uu = $c = rn = null;
            break;
          case "mousedown":
            kc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            kc = !1, vf(B, l, z);
            break;
          case "selectionchange":
            if (Ov) break;
          case "keydown":
          case "keyup":
            vf(B, l, z);
        }
        var lt;
        if (Vc)
          t: {
            switch (t) {
              case "compositionstart":
                var ct = "onCompositionStart";
                break t;
              case "compositionend":
                ct = "onCompositionEnd";
                break t;
              case "compositionupdate":
                ct = "onCompositionUpdate";
                break t;
            }
            ct = void 0;
          }
        else
          sn ? ef(t, l) && (ct = "onCompositionEnd") : t === "keydown" && l.keyCode === 229 && (ct = "onCompositionStart");
        ct && (Io && l.locale !== "ko" && (sn || ct !== "onCompositionStart" ? ct === "onCompositionEnd" && sn && (lt = Jo()) : (Jl = z, Lc = "value" in Jl ? Jl.value : Jl.textContent, sn = !0)), Dt = sc(N, ct), 0 < Dt.length && (ct = new Fo(
          ct,
          t,
          null,
          l,
          z
        ), B.push({ event: ct, listeners: Dt }), lt ? ct.data = lt : (lt = lf(l), lt !== null && (ct.data = lt)))), (lt = yv ? bv(t, l) : pv(t, l)) && (ct = sc(N, "onBeforeInput"), 0 < ct.length && (Dt = new Fo(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          z
        ), B.push({
          event: Dt,
          listeners: ct
        }), Dt.data = lt)), yg(
          B,
          t,
          N,
          l,
          z
        );
      }
      Km(B, e);
    });
  }
  function Cu(t, e, l) {
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
        Cu(t, n, u)
      ), n = Wn(t, e), n != null && a.push(
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
      var o = l, g = o.alternate, N = o.stateNode;
      if (o = o.tag, g !== null && g === a) break;
      o !== 5 && o !== 26 && o !== 27 || N === null || (g = N, n ? (N = Wn(l, u), N != null && i.unshift(
        Cu(l, N, g)
      )) : n || (N = Wn(l, u), N != null && i.push(
        Cu(l, N, g)
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
  function Kt(t, e, l, a, n, u) {
    switch (l) {
      case "children":
        if (typeof a == "string")
          e === "body" || e === "textarea" && a === "" || nn(t, a);
        else if (typeof a == "number" || typeof a == "bigint")
          e !== "body" && nn(t, "" + a);
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
        Qo(t, a, u);
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
          typeof u == "function" && (l === "formAction" ? (e !== "input" && Kt(t, e, "name", n.name, n, null), Kt(
            t,
            e,
            "formEncType",
            n.formEncType,
            n,
            null
          ), Kt(
            t,
            e,
            "formMethod",
            n.formMethod,
            n,
            null
          ), Kt(
            t,
            e,
            "formTarget",
            n.formTarget,
            n,
            null
          )) : (Kt(t, e, "encType", n.encType, n, null), Kt(t, e, "method", n.method, n, null), Kt(t, e, "target", n.target, n, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          t.removeAttribute(l);
          break;
        }
        a = li(a), t.setAttribute(l, a);
        break;
      case "onClick":
        a != null && (t.onclick = vl);
        return;
      case "onScroll":
        a != null && At("scroll", t);
        return;
      case "onScrollEnd":
        a != null && At("scrollend", t);
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
        At("beforetoggle", t), At("toggle", t), ti(t, "popover", a);
        break;
      case "xlinkActuate":
        Al(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        Al(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        Al(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        Al(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        Al(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        Al(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        Al(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        Al(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        Al(
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
    Yt = !0;
  }
  function jr(t, e, l, a, n, u) {
    switch (l) {
      case "style":
        Qo(t, a, u);
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
        if (typeof a == "string") nn(t, a);
        else if (typeof a == "number" || typeof a == "bigint")
          nn(t, "" + a);
        else return;
        break;
      case "onScroll":
        a != null && At("scroll", t);
        return;
      case "onScrollEnd":
        a != null && At("scrollend", t);
        return;
      case "onClick":
        a != null && (t.onclick = vl);
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
        if (!wo.hasOwnProperty(l))
          t: {
            if (l[0] === "o" && l[1] === "n" && (n = l.endsWith("Capture"), u = l.slice(2, n ? l.length - 7 : void 0), e = t[De] || null, e = e != null ? e[l] : null, typeof e == "function" && t.removeEventListener(u, e, n), typeof a == "function")) {
              typeof e != "function" && e !== null && (l in t ? t[l] = null : t.hasAttribute(l) && t.removeAttribute(l)), t.addEventListener(u, a, n);
              break t;
            }
            Yt = !0, l in t ? t[l] = a : a === !0 ? t.setAttribute(l, "") : ti(t, l, a);
          }
        return;
    }
    Yt = !0;
  }
  function Te(t, e, l) {
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
        At("error", t), At("load", t);
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
                  Kt(t, e, u, i, l, null);
              }
          }
        n && Kt(t, e, "srcSet", l.srcSet, l, null), a && Kt(t, e, "src", l.src, l, null);
        return;
      case "input":
        At("invalid", t);
        var o = u = i = n = null, g = null, N = null;
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
                  g = z;
                  break;
                case "defaultChecked":
                  N = z;
                  break;
                case "value":
                  u = z;
                  break;
                case "defaultValue":
                  o = z;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (z != null)
                    throw Error(s(137, e));
                  break;
                default:
                  Kt(t, e, a, z, l, null);
              }
          }
        qo(
          t,
          u,
          o,
          g,
          N,
          i,
          n,
          !1
        );
        return;
      case "select":
        At("invalid", t), a = i = u = null;
        for (n in l)
          if (l.hasOwnProperty(n) && (o = l[n], o != null))
            switch (n) {
              case "value":
                u = o;
                break;
              case "defaultValue":
                i = o;
                break;
              case "multiple":
                a = o;
              default:
                Kt(t, e, n, o, l, null);
            }
        e = u, l = i, t.multiple = !!a, e != null ? an(t, !!a, e, !1) : l != null && an(t, !!a, l, !0);
        return;
      case "textarea":
        At("invalid", t), u = n = a = null;
        for (i in l)
          if (l.hasOwnProperty(i) && (o = l[i], o != null))
            switch (i) {
              case "value":
                a = o;
                break;
              case "defaultValue":
                n = o;
                break;
              case "children":
                u = o;
                break;
              case "dangerouslySetInnerHTML":
                if (o != null) throw Error(s(91));
                break;
              default:
                Kt(t, e, i, o, l, null);
            }
        Xo(t, a, n, u);
        return;
      case "option":
        for (g in l)
          l.hasOwnProperty(g) && (a = l[g], a != null) && (g === "selected" ? t.selected = a && typeof a != "function" && typeof a != "symbol" : Kt(t, e, g, a, l, null));
        return;
      case "dialog":
        At("beforetoggle", t), At("toggle", t), At("cancel", t), At("close", t);
        break;
      case "iframe":
      case "object":
        At("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < Au.length; a++)
          At(Au[a], t);
        break;
      case "image":
        At("error", t), At("load", t);
        break;
      case "details":
        At("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        At("error", t), At("load", t);
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
        for (N in l)
          if (l.hasOwnProperty(N) && (a = l[N], a != null))
            switch (N) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(s(137, e));
              default:
                Kt(t, e, N, a, l, null);
            }
        return;
      default:
        if (Dc(e)) {
          for (z in l)
            l.hasOwnProperty(z) && (a = l[z], a !== void 0 && jr(
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
    for (o in l)
      l.hasOwnProperty(o) && (a = l[o], a != null && Kt(t, e, o, a, l, null));
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
        var n = null, u = null, i = null, o = null, g = null, N = null, z = null;
        for (O in l) {
          var B = l[O];
          if (l.hasOwnProperty(O) && B != null)
            switch (O) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                g = B;
              default:
                a.hasOwnProperty(O) || Kt(t, e, O, null, a, B);
            }
        }
        for (var _ in a) {
          var O = a[_];
          if (B = l[_], a.hasOwnProperty(_) && (O != null || B != null))
            switch (_) {
              case "type":
                O !== B && (Yt = !0), u = O;
                break;
              case "name":
                O !== B && (Yt = !0), n = O;
                break;
              case "checked":
                O !== B && (Yt = !0), N = O;
                break;
              case "defaultChecked":
                O !== B && (Yt = !0), z = O;
                break;
              case "value":
                O !== B && (Yt = !0), i = O;
                break;
              case "defaultValue":
                O !== B && (Yt = !0), o = O;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (O != null)
                  throw Error(s(137, e));
                break;
              default:
                O !== B && Kt(
                  t,
                  e,
                  _,
                  O,
                  a,
                  B
                );
            }
        }
        jc(
          t,
          i,
          o,
          g,
          N,
          z,
          u,
          n
        );
        return;
      case "select":
        O = i = o = _ = null;
        for (u in l)
          if (g = l[u], l.hasOwnProperty(u) && g != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                O = g;
              default:
                a.hasOwnProperty(u) || Kt(
                  t,
                  e,
                  u,
                  null,
                  a,
                  g
                );
            }
        for (n in a)
          if (u = a[n], g = l[n], a.hasOwnProperty(n) && (u != null || g != null))
            switch (n) {
              case "value":
                u !== g && (Yt = !0), _ = u;
                break;
              case "defaultValue":
                u !== g && (Yt = !0), o = u;
                break;
              case "multiple":
                u !== g && (Yt = !0), i = u;
              default:
                u !== g && Kt(
                  t,
                  e,
                  n,
                  u,
                  a,
                  g
                );
            }
        e = o, l = i, a = O, _ != null ? an(t, !!l, _, !1) : !!a != !!l && (e != null ? an(t, !!l, e, !0) : an(t, !!l, l ? [] : "", !1));
        return;
      case "textarea":
        O = _ = null;
        for (o in l)
          if (n = l[o], l.hasOwnProperty(o) && n != null && !a.hasOwnProperty(o))
            switch (o) {
              case "value":
                break;
              case "children":
                break;
              default:
                Kt(t, e, o, null, a, n);
            }
        for (i in a)
          if (n = a[i], u = l[i], a.hasOwnProperty(i) && (n != null || u != null))
            switch (i) {
              case "value":
                n !== u && (Yt = !0), _ = n;
                break;
              case "defaultValue":
                n !== u && (Yt = !0), O = n;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (n != null) throw Error(s(91));
                break;
              default:
                n !== u && Kt(t, e, i, n, a, u);
            }
        Go(t, _, O);
        return;
      case "option":
        for (var V in l)
          _ = l[V], l.hasOwnProperty(V) && _ != null && !a.hasOwnProperty(V) && (V === "selected" ? t.selected = !1 : Kt(
            t,
            e,
            V,
            null,
            a,
            _
          ));
        for (g in a)
          _ = a[g], O = l[g], a.hasOwnProperty(g) && _ !== O && (_ != null || O != null) && (g === "selected" ? (_ !== O && (Yt = !0), t.selected = _ && typeof _ != "function" && typeof _ != "symbol") : Kt(
            t,
            e,
            g,
            _,
            a,
            O
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
          _ = l[tt], l.hasOwnProperty(tt) && _ != null && !a.hasOwnProperty(tt) && Kt(t, e, tt, null, a, _);
        for (N in a)
          if (_ = a[N], O = l[N], a.hasOwnProperty(N) && _ !== O && (_ != null || O != null))
            switch (N) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (_ != null)
                  throw Error(s(137, e));
                break;
              default:
                Kt(
                  t,
                  e,
                  N,
                  _,
                  a,
                  O
                );
            }
        return;
      default:
        if (Dc(e)) {
          for (var St in l)
            _ = l[St], l.hasOwnProperty(St) && _ !== void 0 && !a.hasOwnProperty(St) && jr(
              t,
              e,
              St,
              void 0,
              a,
              _
            );
          for (z in a)
            _ = a[z], O = l[z], !a.hasOwnProperty(z) || _ === O || _ === void 0 && O === void 0 || jr(
              t,
              e,
              z,
              _,
              a,
              O
            );
          return;
        }
    }
    for (var E in l)
      _ = l[E], l.hasOwnProperty(E) && _ != null && !a.hasOwnProperty(E) && Kt(t, e, E, null, a, _);
    for (B in a)
      _ = a[B], O = l[B], !a.hasOwnProperty(B) || _ === O || _ == null && O == null || Kt(t, e, B, _, a, O);
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
        var n = l[a], u = n.transferSize, i = n.initiatorType, o = n.duration;
        if (u && o && Wm(i)) {
          for (i = 0, o = n.responseEnd, a += 1; a < l.length; a++) {
            var g = l[a], N = g.startTime;
            if (N > o) break;
            var z = g.transferSize, B = g.initiatorType;
            z && Wm(B) && (g = g.responseEnd, i += z * (g < o ? 1 : (o - N) / (g - N)));
          }
          if (--a, e += 8 * (u + i) / (n.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var Rr = null, Dr = null;
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
    ).createElement(t), l[be] = a, l[De] = e, Te(l, t, e), me(l), l;
  }
  function wr(t, e) {
    return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.children == "bigint" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
  }
  var Ur = null;
  function Og() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Ur ? !1 : (Ur = t, !0) : (Ur = null, !1);
  }
  var Br = typeof setTimeout == "function" ? setTimeout : void 0, zg = typeof clearTimeout == "function" ? clearTimeout : void 0, eh = typeof Promise == "function" ? Promise : void 0, lh = typeof requestAnimationFrame == "function" ? requestAnimationFrame : Br, Ag = typeof queueMicrotask == "function" ? queueMicrotask : typeof eh < "u" ? function(t) {
    return eh.resolve(null).then(t).catch(Cg);
  } : Br;
  function Cg(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function ma(t) {
    return t === "head";
  }
  function ah(t, e) {
    var l = e, a = 0;
    do {
      var n = l.nextSibling;
      if (t.removeChild(l), n && n.nodeType === 8)
        if (l = n.data, l === "/$" || l === "/&") {
          if (a === 0) {
            t.removeChild(n), Xn(e);
            return;
          }
          a--;
        } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&")
          a++;
        else if (l === "html")
          Qr(
            t.ownerDocument.documentElement
          );
        else if (l === "head") {
          l = t.ownerDocument.head, Qr(l);
          for (var u = l.firstChild; u; ) {
            var i = u.nextSibling, o = u.nodeName;
            u[kn] || o === "SCRIPT" || o === "STYLE" || o === "LINK" && u.rel.toLowerCase() === "stylesheet" || l.removeChild(u), u = i;
          }
        } else
          l === "body" && Qr(t.ownerDocument.body);
      l = n;
    } while (l);
    Xn(e);
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
  function Hr(t) {
    var e = t.getBoundingClientRect(), l = getComputedStyle(t);
    return jg(e, l, t);
  }
  function Rg(t) {
    return t.documentElement.clientHeight;
  }
  function Dg(t) {
    this.addEventListener("load", t), this.addEventListener("error", t);
  }
  function wg(t, e, l, a, n, u, i, o, g) {
    var N = e.nodeType === 9 ? e : e.ownerDocument;
    try {
      var z = N.startViewTransition({
        update: function() {
          var _ = N.defaultView, O = _.navigation && _.navigation.transition, V = N.fonts.status;
          a();
          var tt = [];
          if (V === "loaded" && (Rg(N), N.fonts.status === "loading" && tt.push(N.fonts.ready)), V = tt.length, t !== null)
            for (var St = t.suspenseyImages, E = 0, p = 0; p < St.length; p++) {
              var M = St[p];
              if (!M.complete) {
                var U = M.getBoundingClientRect();
                if (0 < U.bottom && 0 < U.right && U.top < _.innerHeight && U.left < _.innerWidth) {
                  if (E += Oh(M), E > fc) {
                    tt.length = V;
                    break;
                  }
                  M = new Promise(
                    Dg.bind(M)
                  ), tt.push(M);
                }
              }
            }
          if (0 < tt.length)
            return _ = Promise.race([
              Promise.all(tt),
              new Promise(function(F) {
                return setTimeout(F, 500);
              })
            ]).then(n, n), (O ? Promise.allSettled([O.finished, _]) : _).then(u, u);
          if (n(), O)
            return O.finished.then(
              u,
              u
            );
          u();
        },
        types: l
      });
      N.__reactViewTransition = z;
      var B = [];
      return z.ready.then(
        function() {
          for (var _ = N.documentElement.getAnimations({
            subtree: !0
          }), O = 0; O < _.length; O++) {
            var V = _[O], tt = V.effect, St = tt.pseudoElement;
            if (St != null && St.startsWith("::view-transition")) {
              B.push(V), V = tt.getKeyframes();
              for (var E = St = void 0, p = !0, M = 0; M < V.length; M++) {
                var U = V[M], F = U.width;
                if (St === void 0) St = F;
                else if (St !== F) {
                  p = !1;
                  break;
                }
                if (F = U.height, E === void 0) E = F;
                else if (E !== F) {
                  p = !1;
                  break;
                }
                delete U.width, delete U.height, U.transform === "none" && delete U.transform;
              }
              p && St !== void 0 && E !== void 0 && (tt.setKeyframes(V), p = getComputedStyle(
                tt.target,
                tt.pseudoElement
              ), p.width !== St || p.height !== E) && (p = V[0], p.width = St, p.height = E, p = V[V.length - 1], p.width = St, p.height = E, tt.setKeyframes(V));
            }
          }
          i();
        },
        function(_) {
          N.__reactViewTransition === z && (N.__reactViewTransition = null);
          try {
            typeof _ == "object" && _ !== null && _.name === "InvalidStateError" && (_.message === "View transition was skipped because document visibility state is hidden." || _.message === "Skipping view transition because document visibility state has become hidden." || _.message === "Skipping view transition because viewport size changed." || _.message === "Transition was aborted because of invalid state") && (_ = null), _ !== null && g(_);
          } finally {
            a(), n(), i();
          }
        }
      ), z.finished.finally(function() {
        for (var _ = 0; _ < B.length; _++)
          B[_].cancel();
        N.__reactViewTransition === z && (N.__reactViewTransition = null), o();
      }), z;
    } catch {
      return a(), n(), i(), null;
    }
  }
  function Ka(t, e) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + t + "(" + e + ")";
  }
  Ka.prototype.animate = function(t, e) {
    return e = typeof e == "number" ? { duration: e } : $({}, e), e.pseudoElement = this._selector, this._scope.animate(t, e);
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
        var i = this, o = e;
        l != null && typeof l != "boolean" && l.once === !0 && (o = function(g) {
          i.removeEventListener(
            t,
            e,
            l
          ), typeof e == "function" ? e.call(this, g) : e.handleEvent(g);
        }), a !== null && (n = i.removeEventListener.bind(
          i,
          t,
          e,
          l
        ), a.addEventListener("abort", n, { once: !0 }), n = a.removeEventListener.bind(a, "abort", n)), a = Bn(l), u.push({
          type: t,
          listener: e,
          optionsOrUseCapture: l,
          attachedListener: o,
          cleanup: n
        }), v(
          this._fragmentFiber.child,
          !1,
          Ug,
          t,
          o,
          a
        );
      }
      this._eventListeners = u;
    }
  };
  function Ug(t, e, l, a) {
    return K(t).addEventListener(
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
      n = Bn(n.optionsOrUseCapture), v(
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
    return K(t).removeEventListener(
      e,
      l,
      a
    ), !1;
  }
  function Bn(t) {
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
    var e = D(
      this._fragmentFiber
    );
    if (e === null) return !0;
    e = K(e);
    var l = this._eventListeners;
    if (l !== null && 0 < l.length || !t.bubbles) {
      var a = e.nodeType === 9 ? e.createComment("") : document.createTextNode("");
      if (l)
        for (var n = 0; n < l.length; n++) {
          var u = l[n];
          a.addEventListener(
            u.type,
            u.attachedListener,
            Bn(u.optionsOrUseCapture)
          );
        }
      if (e.appendChild(a), t = a.dispatchEvent(t), l)
        for (n = 0; n < l.length; n++)
          u = l[n], a.removeEventListener(
            u.type,
            u.attachedListener,
            Bn(u.optionsOrUseCapture)
          );
      return e.removeChild(a), t;
    }
    return e.dispatchEvent(t);
  }, $e.prototype.focus = function(t) {
    v(
      this._fragmentFiber.child,
      !0,
      oh,
      t,
      void 0,
      void 0
    );
  };
  function oh(t, e) {
    return t.tag === 6 ? !1 : (t = K(t), $g(t, e));
  }
  $e.prototype.focusLast = function(t) {
    var e = [];
    v(
      this._fragmentFiber.child,
      !0,
      Lr,
      e,
      void 0,
      void 0
    );
    for (var l = e.length - 1; 0 <= l && !oh(e[l], t); l--) ;
  };
  function Lr(t, e) {
    return e.push(t), !1;
  }
  $e.prototype.blur = function() {
    var t = D(
      this._fragmentFiber
    );
    t !== null && (t = K(t), t = ju(t).activeElement, t !== null && v(
      this._fragmentFiber.child,
      !1,
      Hg,
      t,
      void 0,
      void 0
    ));
  };
  function Hg(t, e) {
    return t.tag === 6 ? !1 : (t = K(t), t === e || t.contains(e) ? (e.blur(), !0) : !1);
  }
  $e.prototype.observeUsing = function(t) {
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
    return t.tag === 6 || (t = K(t), e.observe(t)), !1;
  }
  $e.prototype.unobserveUsing = function(t) {
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
      for (var l = e = 0; l < fl.length; l++) {
        var a = fl[l];
        a.fragmentInstance === this && a.observer === t ? t.unobserve(a.instance) : fl[e++] = a;
      }
      fl.length = e;
    }
  };
  function Yg(t, e) {
    return t.tag === 6 || (t = K(t), e.unobserve(t)), !1;
  }
  var fl = [], Yr = !1;
  function qg(t, e, l) {
    fl.push({
      fragmentInstance: t,
      observer: e,
      instance: l
    }), Yr || (Yr = !0, kg(function() {
      Yr = !1;
      var a = fl;
      fl = [];
      for (var n = 0; n < a.length; n++) {
        var u = a[n];
        u.observer.unobserve(u.instance);
      }
    }));
  }
  $e.prototype.getClientRects = function() {
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
      t = K(t), e.push.apply(e, t.getClientRects());
    return !1;
  }
  $e.prototype.getRootNode = function(t) {
    var e = D(
      this._fragmentFiber
    );
    return e === null ? this : K(e).getRootNode(t);
  }, $e.prototype.compareDocumentPosition = function(t) {
    var e = D(
      this._fragmentFiber
    );
    if (e === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var l = [];
    v(
      this._fragmentFiber.child,
      !1,
      Lr,
      l,
      void 0,
      void 0
    );
    var a = K(e);
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
      return l === t ? n = Node.DOCUMENT_POSITION_CONTAINS : a & Node.DOCUMENT_POSITION_CONTAINED_BY && (l = J(e)[1], l === null ? n = Node.DOCUMENT_POSITION_PRECEDING : (t = K(l).compareDocumentPosition(
        t
      ), n = t === 0 || t & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), n |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    e = K(l[0]), n = K(l[l.length - 1]);
    var u = H(this._fragmentFiber) ? e.parentElement : a;
    if (u == null)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    a = u.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_CONTAINED_BY, u = u.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var i = e.compareDocumentPosition(t), o = n.compareDocumentPosition(t), g = i & Node.DOCUMENT_POSITION_CONTAINED_BY || o & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return o = a && u && i & Node.DOCUMENT_POSITION_FOLLOWING && o & Node.DOCUMENT_POSITION_PRECEDING, e = a && e === t || u && n === t || g || o ? Node.DOCUMENT_POSITION_CONTAINED_BY : !a && e === t || !u && n === t ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : i, e & Node.DOCUMENT_POSITION_DISCONNECTED || e & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || Xg(
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
        for (u = e, e = D(e); u !== null; ) {
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
      Tt
    ), e === null ? e = !1 : (v(
      e,
      !0,
      X,
      u,
      l
    ), u = ot, ot = null, e = u !== null)), e) : t & Node.DOCUMENT_POSITION_FOLLOWING ? ((e = !!u) && !(e = u === a) && (e = Bt(
      a,
      u,
      Tt
    ), e === null ? e = !1 : (v(
      e,
      !0,
      Mt,
      u,
      a
    ), u = ot, G = ot = null, e = u !== null)), e) : !1;
  }
  function fh(t, e) {
    var l = t.ownerDocument.createRange();
    l.selectNodeContents(t), t = l.getBoundingClientRect(), window.scrollTo(
      window.scrollX + t.left,
      e ? window.scrollY + t.top : window.scrollY + t.bottom - window.innerHeight
    );
  }
  $e.prototype.scrollIntoView = function(t) {
    if (typeof t == "object") throw Error(s(566));
    var e = [];
    v(
      this._fragmentFiber.child,
      !1,
      Lr,
      e,
      void 0,
      void 0
    );
    var l = t !== !1;
    if (e.length === 0) {
      var a = J(
        this._fragmentFiber
      );
      if (a = l ? a[1] || a[0] || D(this._fragmentFiber) : a[0] || a[1], a === null) return;
      if (a.tag === 6) {
        t = K(a), fh(t, l);
        return;
      }
      if (a = K(a), a.nodeType !== 9) {
        if (a.nodeType === 11) {
          l = "host" in a ? a.host : null, l !== null && l.scrollIntoView(t);
          return;
        }
        a.scrollIntoView(t);
      }
    }
    for (a = l ? e.length - 1 : 0; a !== (l ? -1 : e.length); ) {
      var n = e[a];
      n.tag === 6 ? (n = K(n), fh(n, l)) : K(n).scrollIntoView(t), a += l ? -1 : 1;
    }
  };
  function Vg(t, e) {
    return t = K(t), dh(t, e), !1;
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
          Bn(n.optionsOrUseCapture)
        );
      }
    t.nodeType !== 3 && (l = e._observers, l !== null && l.forEach(function(u) {
      for (var i = 0, o = 0; o < fl.length; o++) {
        var g = fl[o];
        (g.fragmentInstance !== e || g.observer !== u || g.instance !== t) && (fl[i++] = g);
      }
      fl.length = i, u.observe(t);
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
          Bn(n.optionsOrUseCapture)
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
  function qr(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var l = e;
      switch (e = e.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          qr(l), Pu(l);
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
  function Gr(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Xr(t) {
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
  var Vr = null;
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
      l.hasOwnProperty(a) && n != null && Kt(t, e, a, null, Ng, n);
    }
    l.dangerouslySetInnerHTML != null && (t.textContent = ""), t.onclick === vl && (t.onclick = null), Pu(t);
  }
  function Qr(t) {
    for (var e = t.attributes; e.length; )
      t.removeAttributeNode(e[0]);
    Pu(t);
  }
  var nl = /* @__PURE__ */ new Map(), ph = /* @__PURE__ */ new Set();
  function Ru(t) {
    if (typeof t.getRootNode == "function") {
      var e = t.getRootNode();
      if (e.nodeType === 9 || e.nodeType === 11) return e;
    }
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  var Xl = ut.d;
  ut.d = {
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
    var e = tn(t);
    e !== null && e.tag === 5 && e.type === "form" ? _d(e) : Xl.r(t);
  }
  var Hn = typeof document > "u" ? null : document;
  function Sh(t, e, l) {
    var a = Hn;
    if (a && typeof e == "string" && e) {
      var n = Fe(e);
      n = 'link[rel="' + t + '"][href="' + n + '"]', typeof l == "string" && (n += '[crossorigin="' + l + '"]'), ph.has(n) || (ph.add(n), t = { rel: t, crossOrigin: l, href: e }, a.querySelector(n) === null && (e = a.createElement("link"), Te(e, "link", t), me(e), a.head.appendChild(e)));
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
    var a = Hn;
    if (a && t && e) {
      var n = 'link[rel="preload"][as="' + Fe(e) + '"]';
      e === "image" && l && l.imageSrcSet ? (n += '[imagesrcset="' + Fe(
        l.imageSrcSet
      ) + '"]', typeof l.imageSizes == "string" && (n += '[imagesizes="' + Fe(
        l.imageSizes
      ) + '"]')) : n += '[href="' + Fe(t) + '"]';
      var u = n;
      switch (e) {
        case "style":
          u = Ln(t);
          break;
        case "script":
          u = Yn(t);
      }
      if (!(nl.has(u) || (t = $(
        {
          rel: "preload",
          href: e === "image" && l && l.imageSrcSet ? void 0 : t,
          as: e
        },
        l
      ), nl.set(u, t), a.querySelector(n) !== null || e === "style" && a.querySelector(Du(u)) || e === "script" && a.querySelector(wu(u))))) {
        var i = a.createElement("link");
        Te(i, "link", t), e === "style" && (i[Iu] = !0, i.onload = i.onerror = function() {
          Ro(i);
        }), me(i), a.head.appendChild(i);
      }
    }
  }
  function ey(t, e) {
    Xl.m(t, e);
    var l = Hn;
    if (l && t) {
      var a = e && typeof e.as == "string" ? e.as : "script", n = 'link[rel="modulepreload"][as="' + Fe(a) + '"][href="' + Fe(t) + '"]', u = n;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = Yn(t);
      }
      if (!nl.has(u) && (t = $({ rel: "modulepreload", href: t }, e), nl.set(u, t), l.querySelector(n) === null)) {
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
        a = l.createElement("link"), Te(a, "link", t), me(a), l.head.appendChild(a);
      }
    }
  }
  function ly(t, e, l) {
    Xl.S(t, e, l);
    var a = Hn;
    if (a && t) {
      var n = en(a).hoistableStyles, u = Ln(t);
      e = e || "default";
      var i = n.get(u);
      if (!i) {
        var o = { loading: 0, preload: null };
        if (i = a.querySelector(
          Du(u)
        ))
          o.loading = 5;
        else {
          t = $(
            { rel: "stylesheet", href: t, "data-precedence": e },
            l
          ), (l = nl.get(u)) && Zr(t, l);
          var g = i = a.createElement("link");
          me(g), Te(g, "link", t), g._p = new Promise(function(N, z) {
            g.onload = N, g.onerror = z;
          }), g.addEventListener("load", function() {
            o.loading |= 1;
          }), g.addEventListener("error", function() {
            o.loading |= 2;
          }), o.loading |= 4, rc(i, e, a);
        }
        i = {
          type: "stylesheet",
          instance: i,
          count: 1,
          state: o
        }, n.set(u, i);
      }
    }
  }
  function ay(t, e) {
    Xl.X(t, e);
    var l = Hn;
    if (l && t) {
      var a = en(l).hoistableScripts, n = Yn(t), u = a.get(n);
      u || (u = l.querySelector(wu(n)), u || (t = $({ src: t, async: !0 }, e), (e = nl.get(n)) && Kr(t, e), u = l.createElement("script"), me(u), Te(u, "link", t), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function ny(t, e) {
    Xl.M(t, e);
    var l = Hn;
    if (l && t) {
      var a = en(l).hoistableScripts, n = Yn(t), u = a.get(n);
      u || (u = l.querySelector(wu(n)), u || (t = $({ src: t, async: !0, type: "module" }, e), (e = nl.get(n)) && Kr(t, e), u = l.createElement("script"), me(u), Te(u, "link", t), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function _h(t, e, l, a) {
    var n = (n = jt.current) ? Ru(n) : null;
    if (!n) throw Error(s(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string" ? (l = Ln(l.href), e = en(
          n
        ).hoistableStyles, a = e.get(l), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, e.set(l, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          t = Ln(l.href);
          var u = en(
            n
          ).hoistableStyles, i = u.get(t);
          if (i || (n = n.ownerDocument || n, i = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(t, i), (u = n.querySelector(
            Du(t)
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
        return e = l.async, l = l.src, typeof l == "string" && e && typeof e != "function" && typeof e != "symbol" ? (l = Yn(l), e = en(
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
  function Ln(t) {
    return 'href="' + Fe(t) + '"';
  }
  function Du(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function Eh(t) {
    return $({}, t, {
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
      e = t.createElement("link"), e[Iu] = !0, e.onload = e.onerror = Ro.bind(null, e), Te(e, "link", l), me(e), t.head.appendChild(e);
    a.preload = e, e.addEventListener("load", function() {
      return a.loading |= 1;
    }), e.addEventListener("error", function() {
      return a.loading |= 2;
    });
  }
  function Yn(t) {
    return '[src="' + Fe(t) + '"]';
  }
  function wu(t) {
    return "script[async]" + t;
  }
  function Th(t, e, l) {
    if (e.count++, e.instance === null)
      switch (e.type) {
        case "style":
          var a = t.querySelector(
            'style[data-href~="' + Fe(l.href) + '"]'
          );
          if (a)
            return e.instance = a, me(a), a;
          var n = $({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          return a = (t.ownerDocument || t).createElement(
            "style"
          ), me(a), Te(a, "style", n), rc(a, l.precedence, t), e.instance = a;
        case "stylesheet":
          n = Ln(l.href);
          var u = t.querySelector(
            Du(n)
          );
          if (u)
            return e.state.loading |= 4, e.instance = u, me(u), u;
          a = Eh(l), (n = nl.get(n)) && Zr(a, n), u = (t.ownerDocument || t).createElement("link"), me(u);
          var i = u;
          return i._p = new Promise(function(o, g) {
            i.onload = o, i.onerror = g;
          }), Te(u, "link", a), e.state.loading |= 4, rc(u, l.precedence, t), e.instance = u;
        case "script":
          return u = Yn(l.src), (n = t.querySelector(
            wu(u)
          )) ? (e.instance = n, me(n), n) : (a = l, (n = nl.get(u)) && (a = $({}, l), Kr(a, n)), t = t.ownerDocument || t, n = t.createElement("script"), me(n), Te(n, "link", a), t.head.appendChild(n), e.instance = n);
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
      var o = a[i];
      if (o.dataset.precedence === e) u = o;
      else if (u !== n) break;
    }
    u ? u.parentNode.insertBefore(t, u.nextSibling) : (e = l.nodeType === 9 ? l.head : l, e.insertBefore(t, e.firstChild));
  }
  function Zr(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.title == null && (t.title = e.title);
  }
  function Kr(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.integrity == null && (t.integrity = e.integrity);
  }
  var oc = null;
  function Nh(t, e, l) {
    if (oc === null) {
      var a = /* @__PURE__ */ new Map(), n = oc = /* @__PURE__ */ new Map();
      n.set(l, a);
    } else
      n = oc, a = n.get(l), a || (a = /* @__PURE__ */ new Map(), n.set(l, a));
    if (a.has(t)) return a;
    for (a.set(t, null), l = l.getElementsByTagName(t), n = 0; n < l.length; n++) {
      var u = l[n];
      if (!(u[kn] || u[be] || t === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var i = u.getAttribute(e) || "";
        i = t + i;
        var o = a.get(i);
        o ? o.push(u) : a.set(i, [u]);
      }
    }
    return a;
  }
  function Jr(t, e, l) {
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
        var n = Ln(a.href), u = e.querySelector(
          Du(n)
        );
        if (u) {
          e = u._p, e !== null && typeof e == "object" && typeof e.then == "function" && (t.count++, t = Uu.bind(t), e.then(t, t)), l.state.loading |= 4, l.instance = u, me(u);
          return;
        }
        u = e.ownerDocument || e, a = Eh(a), (n = nl.get(n)) && Zr(a, n), u = u.createElement("link"), me(u);
        var i = u;
        i._p = new Promise(function(o, g) {
          i.onload = o, i.onerror = g;
        }), Te(u, "link", a), l.instance = u;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(l, e), (e = l.state.preload) && (l.state.loading & 3) === 0 && (t.count++, l = Uu.bind(t), e.addEventListener("load", l), e.addEventListener("error", l));
    }
  }
  var fc = 0;
  function sy(t, e) {
    return t.stylesheets && t.count === 0 && mc(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(l) {
      var a = setTimeout(function() {
        if (t.stylesheets && mc(t, t.stylesheets), t.unsuspend) {
          var u = t.unsuspend;
          t.unsuspend = null, u();
        }
      }, 6e4 + e);
      0 < t.imgBytes && fc === 0 && (fc = 62500 * Mg());
      var n = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && mc(t, t.stylesheets), t.unsuspend)) {
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
  function Ah(t) {
    if (t.count === 0 && (t.imgCount === 0 || !t.waitingForImages)) {
      if (t.stylesheets) mc(t, t.stylesheets);
      else if (t.unsuspend) {
        var e = t.unsuspend;
        t.unsuspend = null, e();
      }
    }
  }
  function Uu() {
    this.count--, Ah(this);
  }
  function ry() {
    this.imgCount--, Ah(this);
  }
  var dc = null;
  function mc(t, e) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, dc = /* @__PURE__ */ new Map(), e.forEach(oy, t), dc = null, Uu.call(t));
  }
  function oy(t, e) {
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
  var qn = {
    $$typeof: Ct,
    Provider: null,
    Consumer: null,
    _currentValue: ee,
    _currentValue2: ee,
    _threadCount: 0
  };
  function fy(t, e, l, a, n, u, i, o, g) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Oc(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Oc(0), this.hiddenUpdates = Oc(null), this.identifierPrefix = a, this.onUncaughtError = n, this.onCaughtError = u, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = g, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Ch(t, e, l, a, n, u, i, o, g, N, z, B) {
    return t = new fy(
      t,
      e,
      l,
      i,
      g,
      N,
      z,
      B,
      o
    ), e = 1, u === !0 && (e |= 24), u = we(3, null, null, e), t.current = u, u.stateNode = t, e = ss(), e.refCount++, t.pooledCache = e, e.refCount++, u.memoizedState = {
      element: a,
      isDehydrated: l,
      cache: e
    }, ds(u), t;
  }
  function jh(t) {
    return t ? (t = dn, t) : dn;
  }
  function Rh(t, e, l, a, n, u) {
    n = jh(n), a.context === null ? a.context = n : a.pendingContext = n, a = ea(e), a.payload = { element: l }, u = u === void 0 ? null : u, u !== null && (a.callback = u), l = la(t, a, e), l !== null && (Le(l, t, e), du(l, t, e));
  }
  function Dh(t, e) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var l = t.retryLane;
      t.retryLane = l !== 0 && l < e ? l : e;
    }
  }
  function $r(t, e) {
    Dh(t, e), (t = t.alternate) && Dh(t, e);
  }
  function wh(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Aa(t, 67108864);
      e !== null && Le(e, t, 67108864), $r(t, 67108864);
    }
  }
  function Uh(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Je();
      e = zc(e);
      var l = Aa(t, e);
      l !== null && Le(l, t, e), $r(t, e);
    }
  }
  var Gn = !0;
  function dy(t, e, l, a) {
    var n = Q.T;
    Q.T = null;
    var u = ut.p;
    try {
      ut.p = 2, kr(t, e, l, a);
    } finally {
      ut.p = u, Q.T = n;
    }
  }
  function my(t, e, l, a) {
    var n = Q.T;
    Q.T = null;
    var u = ut.p;
    try {
      ut.p = 8, kr(t, e, l, a);
    } finally {
      ut.p = u, Q.T = n;
    }
  }
  function kr(t, e, l, a) {
    if (Gn) {
      var n = Fr(a);
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
          var u = tn(n);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var i = Na(u.pendingLanes);
                  if (i !== 0) {
                    var o = u;
                    for (o.pendingLanes |= 2, o.entangledLanes |= 2; i; ) {
                      var g = 1 << 31 - qe(i);
                      o.entanglements[1] |= g, i &= ~g;
                    }
                    xl(u), (Gt & 6) === 0 && (Pi = ht() + 500, zu(0));
                  }
                }
                break;
              case 31:
              case 13:
                o = Aa(u, 2), o !== null && Le(o, u, 2), lc(), $r(u, 2);
            }
          if (u = Fr(a), u === null && Cr(
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
  function Fr(t) {
    return t = Uc(t), Wr(t);
  }
  var hc = null;
  function Wr(t) {
    if (hc = null, t = xa(t), t !== null) {
      var e = h(t);
      if (e === null) t = null;
      else {
        var l = e.tag;
        if (l === 13) {
          if (t = b(e), t !== null) return t;
          t = null;
        } else if (l === 31) {
          if (t = S(e), t !== null) return t;
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
        switch (fe()) {
          case ne:
            return 2;
          case hl:
            return 8;
          case Ju:
          case O0:
            return 32;
          case Eo:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Ir = !1, ha = null, va = null, ga = null, Bu = /* @__PURE__ */ new Map(), Hu = /* @__PURE__ */ new Map(), ya = [], hy = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Hh(t, e) {
    switch (t) {
      case "focusin":
      case "focusout":
        ha = null;
        break;
      case "dragenter":
      case "dragleave":
        va = null;
        break;
      case "mouseover":
      case "mouseout":
        ga = null;
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
    }, e !== null && (e = tn(e), e !== null && wh(e)), t) : (t.eventSystemFlags |= a, e = t.targetContainers, n !== null && e.indexOf(n) === -1 && e.push(n), t);
  }
  function vy(t, e, l, a, n) {
    switch (e) {
      case "focusin":
        return ha = Lu(
          ha,
          t,
          e,
          l,
          a,
          n
        ), !0;
      case "dragenter":
        return va = Lu(
          va,
          t,
          e,
          l,
          a,
          n
        ), !0;
      case "mouseover":
        return ga = Lu(
          ga,
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
      var l = h(e);
      if (l !== null) {
        if (e = l.tag, e === 13) {
          if (e = b(l), e !== null) {
            t.blockedOn = e, Ao(t.priority, function() {
              Uh(l);
            });
            return;
          }
        } else if (e === 31) {
          if (e = S(l), e !== null) {
            t.blockedOn = e, Ao(t.priority, function() {
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
      var l = Fr(t.nativeEvent);
      if (l === null) {
        l = t.nativeEvent;
        var a = new l.constructor(
          l.type,
          l
        );
        wc = a, l.target.dispatchEvent(a), wc = null;
      } else
        return e = tn(l), e !== null && wh(e), t.blockedOn = l, !1;
      e.shift();
    }
    return !0;
  }
  function Yh(t, e, l) {
    vc(t) && l.delete(e);
  }
  function gy() {
    Ir = !1, ha !== null && vc(ha) && (ha = null), va !== null && vc(va) && (va = null), ga !== null && vc(ga) && (ga = null), Bu.forEach(Yh), Hu.forEach(Yh);
  }
  function gc(t, e) {
    t.blockedOn === e && (t.blockedOn = null, Ir || (Ir = !0, c.unstable_scheduleCallback(
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
            if (Wr(a || l) === null)
              continue;
            break;
          }
          var u = tn(l);
          u !== null && (t.splice(e, 3), e -= 3, Ds(
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
  function Xn(t) {
    function e(g) {
      return gc(g, t);
    }
    ha !== null && gc(ha, t), va !== null && gc(va, t), ga !== null && gc(ga, t), Bu.forEach(e), Hu.forEach(e);
    for (var l = 0; l < ya.length; l++) {
      var a = ya[l];
      a.blockedOn === t && (a.blockedOn = null);
    }
    for (; 0 < ya.length && (l = ya[0], l.blockedOn === null); )
      Lh(l), l.blockedOn === null && ya.shift();
    if (l = (t.ownerDocument || t).$$reactFormReplay, l != null)
      for (a = 0; a < l.length; a += 3) {
        var n = l[a], u = l[a + 1], i = n[De] || null;
        if (typeof u == "function")
          i || qh(l);
        else if (i) {
          var o = null;
          if (u && u.hasAttribute("formAction")) {
            if (n = u, i = u[De] || null)
              o = i.formAction;
            else if (Wr(n) !== null) continue;
          } else o = i.action;
          typeof o == "function" ? l[a + 1] = o : (l.splice(a, 3), a -= 3), qh(l);
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
  function Pr(t) {
    this._internalRoot = t;
  }
  bc.prototype.render = Pr.prototype.render = function(t) {
    var e = this._internalRoot;
    if (e === null) throw Error(s(409));
    var l = e.current, a = Je();
    Rh(l, a, t, e, null, null);
  }, bc.prototype.unmount = Pr.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var e = t.containerInfo;
      Rh(t.current, 2, null, t, null, null), lc(), e[Pa] = null;
    }
  };
  function bc(t) {
    this._internalRoot = t;
  }
  bc.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var e = zo();
      t = { blockedOn: null, target: t, priority: e };
      for (var l = 0; l < ya.length && e !== 0 && e < ya[l].priority; l++) ;
      ya.splice(l, 0, t), l === 0 && Lh(t);
    }
  };
  var Xh = f.version;
  if (Xh !== "19.3.0")
    throw Error(
      s(
        527,
        Xh,
        "19.3.0"
      )
    );
  ut.findDOMNode = function(t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function" ? Error(s(188)) : (t = Object.keys(t).join(","), Error(s(268, t)));
    return t = j(e), t = t !== null ? T(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var yy = {
    bundleType: 0,
    version: "19.3.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: Q,
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
    if (!m(t)) throw Error(s(299));
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
    ), t[Pa] = e.current, Ar(t), new Pr(e);
  }, qu.hydrateRoot = function(t, e, l) {
    if (!m(t)) throw Error(s(299));
    var a = !1, n = "", u = jd, i = Rd, o = Dd, g = null;
    return l != null && (l.unstable_strictMode === !0 && (a = !0), l.identifierPrefix !== void 0 && (n = l.identifierPrefix), l.onUncaughtError !== void 0 && (u = l.onUncaughtError), l.onCaughtError !== void 0 && (i = l.onCaughtError), l.onRecoverableError !== void 0 && (o = l.onRecoverableError), l.formState !== void 0 && (g = l.formState)), e = Ch(
      t,
      1,
      !0,
      e,
      l ?? null,
      a,
      n,
      g,
      u,
      i,
      o,
      Gh
    ), e.context = jh(null), l = e.current, a = Je(), a = zc(a), n = ea(a), n.callback = null, la(l, n, a), l = a, e.current.lanes = l, $n(e, l), xl(e), t[Pa] = e.current, Ar(t), new bc(e);
  }, qu.version = "19.3.0", qu;
}
var Ih;
function Oy() {
  if (Ih) return lo.exports;
  Ih = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (f) {
        console.error(f);
      }
  }
  return c(), lo.exports = My(), lo.exports;
}
var zy = Oy();
function Ay(c, f) {
  const r = Number.isFinite(f) && f > 0 ? f : 1 / 0, s = c.filter((b) => Number.isFinite(b.start) && b.start >= 0 && b.start < r).slice().sort((b, S) => b.start - S.start);
  let m = r;
  const h = new Array(s.length);
  for (let b = s.length - 1; b >= 0; b -= 1)
    b + 1 < s.length && s[b + 1].start > s[b].start && (m = s[b + 1].start), h[b] = m;
  return s.flatMap((b, S) => {
    const A = h[S], j = Math.min(b.end ?? A, r);
    return !Number.isFinite(j) || j <= b.start ? [] : [{ start: b.start, end: j, text: b.label ?? "" }];
  });
}
function Cy(c, f) {
  return !Number.isFinite(f) || f < 0 ? [] : c.filter((r) => r.start <= f && f < r.end && r.text.trim()).map((r) => r.text);
}
const r0 = 128, o0 = 640;
function Xu(c, f = 144) {
  return Math.max(r0, Math.min(
    o0,
    Number.isFinite(c) ? Math.round(c) : f
  ));
}
function f0(c, f, r) {
  return f ? r ? c : "waveform" : "spectrogram";
}
function jy(c, f, r) {
  return Number.isFinite(c) ? c * (f === 1 ? 16 : f === 2 ? r : 1) : 0;
}
function Ry(c, f) {
  return Math.max(0, Math.min(100, c - Math.max(-240, Math.min(240, f)) * 0.08));
}
function Dy(c, f) {
  return Xu(c * Math.exp(-Math.max(-240, Math.min(240, f)) * 2e-3));
}
function Ph(c, f, r) {
  return Math.max(0, c * f - r);
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
function wy(c, f = 0) {
  const r = /* @__PURE__ */ new Set();
  return c.filter((s) => {
    try {
      const m = ka(s);
      return r.has(s.id) || f > 0 && m.end > f + 0.02 ? !1 : (r.add(s.id), !0);
    } catch {
      return !1;
    }
  });
}
function d0(c, f, r) {
  const s = r - f;
  return !Number.isFinite(c) || s <= 0 ? f : f + ((c - f) % s + s) % s;
}
class Uy {
  constructor(f = () => new AudioContext()) {
    this.createContext = f;
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
    const f = Math.max(0, this.context.currentTime - this.anchor);
    return this.start + (this.offset + f) % this.length;
  }
  pause() {
    return this.stoppedTime = this.currentTime, this.generation += 1, this.abort?.abort(), this.abort = null, this.node && (this.node.stop(), this.node.disconnect(), this.node = null), this.stoppedTime;
  }
  async play(f, r, s, m = "same-origin") {
    const h = ka(f);
    this.pause();
    const b = this.generation;
    this.context ??= this.createContext();
    const S = this.context, A = S.resume();
    A.catch(() => {
    });
    const j = f.audioSrc || r, T = JSON.stringify([j, f.startSample, f.endSample, f.sampleRate]);
    try {
      let v = this.cache?.url === T ? this.cache.buffer : null;
      if (!v) {
        const K = new AbortController();
        this.abort = K;
        const ot = await fetch(j, { signal: K.signal, credentials: m });
        if (!ot.ok) throw new Error(`Could not load loop audio (HTTP ${ot.status})`);
        const G = 128 * 1024 * 1024;
        if (Number(ot.headers.get("Content-Length")) > G) throw new Error("Loop audio exceeds 128 MiB");
        const X = await ot.arrayBuffer();
        if (X.byteLength > G) throw new Error("Loop audio exceeds 128 MiB");
        if (v = await S.decodeAudioData(X), b !== this.generation) return !1;
        this.cache = { url: T, buffer: v };
      }
      if (await A, b !== this.generation) return !1;
      const D = f.audioSrc ? 0 : h.start, H = D + h.duration, J = Math.max(2 / v.sampleRate, 2e-3);
      if (!Number.isFinite(v.duration) || v.duration <= D || H > v.duration + J || f.audioSrc && Math.abs(v.duration - h.duration) > J)
        throw new Error("Loop audio duration does not match the reported sample boundaries");
      const L = S.createBufferSource();
      return L.buffer = v, L.loop = !0, L.loopStart = D, L.loopEnd = Math.min(H, v.duration), L.connect(S.destination), this.start = h.start, this.length = L.loopEnd - D, this.offset = d0(s, h.start, h.start + this.length) - h.start, this.anchor = S.currentTime, L.start(this.anchor, D + this.offset), this.node = L, !0;
    } catch (v) {
      if (b !== this.generation) return !1;
      throw v;
    } finally {
      A.catch(() => {
      });
    }
  }
  dispose() {
    this.pause(), this.cache = null;
    const f = this.context;
    this.context = null, f && f.close().catch(() => {
    });
  }
}
function Sa(c, f, r) {
  return Math.min(r, Math.max(f, c));
}
function _a(c) {
  const f = Math.max(0, Number(c) || 0), r = Math.floor(f / 60), s = Math.floor(f % 60), m = Math.floor((f - Math.floor(f)) * 1e3);
  return `${String(r).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(m).padStart(3, "0")}`;
}
function m0(c) {
  const f = [0.1, 0.25, 0.5, 1, 2, 5, 10, 15, 30, 60, 120, 300, 600];
  return f.find((r) => r * c >= 70) ?? f[f.length - 1];
}
function By(c, f, r, s, m) {
  if (m <= 0 || s <= 0) return { start: 0, end: 0 };
  const h = Math.max(0, c - r), b = Math.max(0, c + f - r), S = Sa(h / s, 0, m), A = Sa(b / s, S, m);
  return { start: S, end: A };
}
function t0(c, f) {
  if (typeof c != "number" || !Number.isFinite(c)) throw new RangeError(`${f} must be finite`);
  return c;
}
function Hy(c, f) {
  const r = f * c.source_audio.sample_rate, s = c.beats;
  let m = 0, h = s.length;
  for (; m < h; ) {
    const b = m + h >>> 1;
    s[b].frame <= r ? m = b + 1 : h = b;
  }
  return Math.max(0, Math.min(s.length - 2, m - 1));
}
function h0(c, f, r = 0.15) {
  if (t0(f, "source seconds"), t0(r, "tolerance") < 0 || r > 60) throw new RangeError("Invalid snap tolerance");
  let s, m;
  if (c.mode === "fixed")
    s = Math.round((f - c.firstBeatSeconds) * c.bpm / 60), m = c.firstBeatSeconds + s * 60 / c.bpm;
  else {
    const b = c.beats, S = c.source_audio.sample_rate, A = Hy(c, f), j = [b[A], b[A + 1]].reduce((T, v) => Math.abs(T.frame / S - f) <= Math.abs(v.frame / S - f) ? T : v);
    s = j.beat - c.origin_beat, m = j.frame / S;
  }
  const h = f - m;
  return {
    beat: s,
    time: m,
    errorSeconds: h,
    errorMilliseconds: h * 1e3,
    withinTolerance: Math.abs(h) <= r,
    mode: c.mode
  };
}
function Ly(c, f, r, s = 2e3) {
  if (!(Number.isFinite(f) && Number.isFinite(r) && r > f)) return [];
  const m = Math.max(1, Math.min(2e3, Math.floor(s)));
  if (c.mode === "variable") {
    const T = c.beats.filter((D) => D.frame / c.source_audio.sample_rate >= f && D.frame / c.source_audio.sample_rate <= r), v = Math.max(1, Math.ceil(T.length / m));
    return T.filter((D, H) => H % v === 0).map((D) => ({
      time: D.frame / c.source_audio.sample_rate,
      label: `Observed beat ${D.beat}`,
      emphasis: D.beat === c.origin_beat
    }));
  }
  const h = Math.max(Math.ceil((f - c.firstBeatSeconds) * c.bpm / 60), Math.ceil(-c.firstBeatSeconds * c.bpm / 60)), b = Math.floor((r - c.firstBeatSeconds) * c.bpm / 60), S = Math.max(0, b - h + 1), A = Math.max(1, Math.ceil(S / m)), j = [];
  for (let T = h; T <= b && j.length < m; T += A) j.push({
    time: c.firstBeatSeconds + T * 60 / c.bpm,
    label: `Fixed-BPM grid beat ${T} (not detected)`,
    emphasis: T === 0
  });
  return j;
}
function e0(c, f, r, s) {
  if (!Number.isFinite(r) || !Number.isFinite(s.duration) || s.duration <= 0) throw new RangeError("Invalid timing edit timebase");
  const m = Math.max(0, s.bounds?.start ?? 0, s.previousEnd ?? 0), h = Math.min(s.duration, s.bounds?.end ?? s.duration, s.nextStart ?? s.duration);
  if (h < m) throw new RangeError("No space between neighbouring timing items");
  const b = s.minimumDuration ?? 0;
  if (b < 0) throw new RangeError("minimumDuration must be nonnegative");
  let S = Math.min(h, Math.max(m, r));
  if (s.snap && s.clock) {
    const T = h0(s.clock, S, s.toleranceSeconds ?? 0.15);
    T.withinTolerance && (S = Math.min(h, Math.max(m, T.time)));
  }
  const A = c.end !== void 0 && Number.isFinite(c.end), j = A ? Number(c.end) - c.start : 0;
  if (f === "move") {
    const T = Math.max(m, Math.min(Math.max(m, h - j), S));
    return A ? { ...c, start: T, end: T + j } : { ...c, start: T };
  }
  if (f === "start") {
    const T = A ? c.end - b : h;
    if (T < m) throw new RangeError("No valid start fits within the parent bounds");
    return { ...c, start: Math.min(S, T) };
  }
  if (!A) throw new RangeError("This event has no editable end");
  if (c.start + b > h) throw new RangeError("No valid end fits inside the parent bounds");
  return { ...c, end: Math.max(c.start + b, S) };
}
function l0(c, f, r) {
  const s = c.parentId ? r.parents?.find((S) => S.id === c.parentId) : null, m = f.filter((S) => S.id !== c.id && (S.parentId ?? "") === (c.parentId ?? "")).sort((S, A) => S.start - A.start), h = m.filter((S) => S.start <= c.start).slice(-1)[0], b = m.find((S) => S.start > c.start);
  return {
    duration: r.duration,
    bounds: s ? { start: s.start, end: s.end } : void 0,
    previousEnd: h ? h.end ?? h.start : void 0,
    nextStart: b?.start,
    clock: r.clock,
    snap: r.snap,
    toleranceSeconds: r.toleranceSeconds,
    minimumDuration: 1e-3
  };
}
function Yy(c) {
  const { items: f, kind: r, duration: s, clock: m, selectedId: h, onSelect: b, onEdit: S } = c, A = c.editable === !0 && typeof S == "function", [j, T] = w.useState(null), v = w.useRef(null), D = w.useRef(null), H = (G) => `${Math.max(0, Math.min(100, G * 100 / Math.max(s, 1e-9)))}%`;
  function J(G, X, Mt) {
    if (!A || G.button !== 0) return;
    const Tt = G.currentTarget.closest(".rts-track");
    if (!Tt) return;
    const Bt = Tt.getBoundingClientRect().width;
    !Number.isFinite(Bt) || Bt <= 0 || (v.current = { id: X.id, edge: Mt, x: G.clientX, origin: X, width: Bt }, D.current = X, G.currentTarget.setPointerCapture(G.pointerId), G.stopPropagation(), G.preventDefault(), b?.(X.id));
  }
  function L(G) {
    const X = v.current;
    if (!X || !A) return;
    const Mt = (X.edge === "end" ? X.origin.end ?? X.origin.start : X.origin.start) + (G.clientX - X.x) * s / X.width;
    try {
      D.current = e0(X.origin, X.edge, Mt, l0(X.origin, f, c)), T(D.current);
    } catch {
    }
    G.stopPropagation();
  }
  function K(G, X = !1) {
    const Mt = v.current;
    Mt && (v.current = null, !X && D.current && S && (D.current.start !== Mt.origin.start || D.current.end !== Mt.origin.end) && S(D.current), D.current = null, T(null), G.stopPropagation());
  }
  function ot(G, X, Mt) {
    if (!A || G.key !== "ArrowLeft" && G.key !== "ArrowRight") return;
    G.preventDefault(), G.stopPropagation();
    const Tt = (G.key === "ArrowRight" ? 1 : -1) * (G.shiftKey ? 1e-3 : 0.01), Bt = Mt === "end" ? X.end ?? X.start : X.start;
    try {
      S?.(e0(X, Mt, Bt + Tt, l0(X, f, c)));
    } catch {
    }
  }
  return /* @__PURE__ */ d.jsx("div", { className: `rts-editable-timing rts-timing-${r}`, role: "group", "aria-label": `${r} timings`, children: f.filter((G) => Number.isFinite(G.start) && G.start >= 0 && G.start <= s).map((G) => {
    const X = j?.id === G.id ? j : G, Mt = X.end !== void 0 ? Math.max(0.1, (X.end - X.start) * 100 / s) : 0.12, Tt = m ? h0(m, X.start, c.toleranceSeconds ?? 0.15) : null, Bt = `${G.label} at ${_a(X.start)}${Tt ? `, ${Tt.withinTolerance ? "near" : "off"} ${Tt.mode} beat ${Tt.beat}, signed gap ${Tt.errorMilliseconds.toFixed(1)} ms` : ""}`;
    return /* @__PURE__ */ d.jsxs(
      "div",
      {
        className: `rts-timing-region ${h === G.id ? "is-selected" : ""} ${G.className ?? ""}`,
        style: { left: H(X.start), width: `${Mt}%` },
        children: [
          /* @__PURE__ */ d.jsx(
            "button",
            {
              type: "button",
              className: `rts-timing-handle rts-timing-main ${Tt?.withinTolerance ? "is-matched" : ""}`,
              "aria-label": `Move ${Bt}`,
              title: Bt,
              "aria-pressed": h === G.id,
              onClick: ($) => {
                $.stopPropagation(), b?.(G.id);
              },
              onPointerDown: ($) => J($, G, "move"),
              onPointerMove: L,
              onPointerUp: K,
              onPointerCancel: ($) => K($, !0),
              onKeyDown: ($) => ot($, G, "move"),
              children: G.label
            }
          ),
          A && X.end !== void 0 && /* @__PURE__ */ d.jsx(
            "button",
            {
              type: "button",
              className: "rts-timing-end",
              "aria-label": `Resize end of ${G.label}`,
              title: "Resize end · arrows: 10 ms, Shift: 1 ms",
              onPointerDown: ($) => J($, G, "end"),
              onPointerMove: L,
              onPointerUp: K,
              onPointerCancel: ($) => K($, !0),
              onKeyDown: ($) => ot($, G, "end")
            }
          ),
          A && X.end !== void 0 && /* @__PURE__ */ d.jsx(
            "button",
            {
              type: "button",
              className: "rts-timing-start",
              "aria-label": `Resize start of ${G.label}`,
              title: "Resize start · arrows: 10 ms, Shift: 1 ms",
              onPointerDown: ($) => J($, G, "start"),
              onPointerMove: L,
              onPointerUp: K,
              onPointerCancel: ($) => K($, !0),
              onKeyDown: ($) => ot($, G, "start")
            }
          )
        ]
      },
      G.id
    );
  }) });
}
function ro(c, f) {
  return `${Sa(c / Math.max(f, 1e-9), 0, 1) * 100}%`;
}
function v0(c, f, r, s = 0.08) {
  const m = Number.isFinite(f) && Number(f) > c ? Number(f) : c + 0.5;
  return `${Math.max(s, (m - c) / Math.max(r, 1e-9) * 100)}%`;
}
function qy({ min: c, max: f, colour: r = "#79c0ff" }) {
  const s = w.useRef(null);
  return w.useEffect(() => {
    const m = s.current;
    if (!m) return;
    const h = Math.max(1, Math.min(c.length, f.length));
    m.width = h, m.height = 180;
    const b = m.getContext("2d");
    if (!b) return;
    b.clearRect(0, 0, h, m.height), b.strokeStyle = r, b.lineWidth = 1, b.beginPath();
    const S = m.height / 2, A = m.height * 0.46;
    for (let j = 0; j < h; j += 1) {
      const T = j + 0.5;
      b.moveTo(T, S - (Number(f[j]) || 0) * A), b.lineTo(T, S - (Number(c[j]) || 0) * A);
    }
    b.stroke();
  }, [r, f, c]), /* @__PURE__ */ d.jsx("canvas", { ref: s, className: "rts-waveform", "aria-hidden": "true" });
}
function Gy({ rows: c }) {
  const f = w.useRef(null);
  return w.useEffect(() => {
    const r = f.current, s = c.filter((S) => S.length > 0);
    if (!r || !s.length) return;
    const m = Math.max(...s.map((S) => S.length));
    r.width = Math.min(4096, s.length), r.height = Math.min(256, m);
    const h = r.getContext("2d");
    if (!h) return;
    const b = h.createImageData(r.width, r.height);
    for (let S = 0; S < r.width; S += 1) {
      const A = Math.min(s.length - 1, Math.floor(S * s.length / r.width)), j = s[A], T = Math.max(1e-9, ...j.map((v) => Number(v) || 0));
      for (let v = 0; v < r.height; v += 1) {
        const D = Math.min(j.length - 1, Math.floor((r.height - 1 - v) * j.length / r.height)), H = Sa((Number(j[D]) || 0) / T, 0, 1), J = (v * r.width + S) * 4;
        b.data[J] = Math.round(40 + 180 * H), b.data[J + 1] = Math.round(35 + 110 * H), b.data[J + 2] = Math.round(80 + 170 * H), b.data[J + 3] = 255;
      }
    }
    h.putImageData(b, 0, 0);
  }, [c]), /* @__PURE__ */ d.jsx("canvas", { ref: f, className: "rts-matrix", "aria-hidden": "true" });
}
function Xy({ items: c, duration: f }) {
  const r = c.filter((h) => Number.isFinite(h.value) && h.value > 0);
  if (!r.length) return null;
  const s = Math.log2(Math.max(20, Math.min(...r.map((h) => h.value)))), m = Math.log2(Math.max(100, ...r.map((h) => h.value)));
  return r.map((h, b) => {
    const S = (Math.log2(h.value) - s) / Math.max(0.01, m - s);
    return /* @__PURE__ */ d.jsx(
      "span",
      {
        className: `rts-note ${h.className ?? ""}`,
        style: { left: ro(h.start, f), width: v0(h.start, h.end ?? h.start + 0.12, f, 0.04), top: `${8 + (1 - S) * 72}px` },
        title: h.title ?? `${h.label ?? `${h.value.toFixed(1)} Hz`} · ${_a(h.start)}`
      },
      `${h.start}-${b}`
    );
  });
}
function oo({ content: c, duration: f }) {
  switch (c.type) {
    case "waveform":
      return /* @__PURE__ */ d.jsx(qy, { ...c });
    case "image":
      return /* @__PURE__ */ d.jsx("img", { className: `rts-image ${c.className ?? ""}`, src: c.src, alt: c.alt });
    case "markers":
      return /* @__PURE__ */ d.jsx(d.Fragment, { children: c.items.map((r, s) => /* @__PURE__ */ d.jsx(
        "span",
        {
          className: `rts-marker ${r.emphasis ? "rts-marker-emphasis" : ""} ${r.className ?? ""}`,
          style: { left: ro(r.time, f) },
          title: r.label
        },
        `${r.time}-${s}`
      )) });
    case "blocks":
      return /* @__PURE__ */ d.jsx(d.Fragment, { children: c.items.map((r, s) => /* @__PURE__ */ d.jsx(
        "span",
        {
          className: `rts-block ${r.className ?? ""}`,
          style: { left: ro(r.start, f), width: v0(r.start, r.end, f) },
          title: r.title ?? `${r.label ?? ""} · ${_a(r.start)}${r.end ? ` — ${_a(r.end)}` : ""}`,
          children: r.label
        },
        `${r.start}-${s}`
      )) });
    case "notes":
      return /* @__PURE__ */ d.jsx(Xy, { items: c.items, duration: f });
    case "curve": {
      const r = c.points.filter((S) => Number.isFinite(S.time) && Number.isFinite(S.value));
      if (!r.length) return null;
      const s = r.map((S) => S.value), m = Math.min(...s), h = Math.max(...s), b = r.map((S) => {
        const A = S.time / Math.max(f, 1e-9) * 2e3, j = 180 - (S.value - m) / Math.max(1e-9, h - m) * 168 - 6;
        return `${A.toFixed(2)},${j.toFixed(2)}`;
      }).join(" ");
      return /* @__PURE__ */ d.jsx("svg", { className: "rts-curve", viewBox: "0 0 2000 180", preserveAspectRatio: "none", "aria-hidden": "true", children: /* @__PURE__ */ d.jsx("polyline", { fill: "none", stroke: c.colour ?? "#7ee787", strokeWidth: "2", vectorEffect: "non-scaling-stroke", points: b }) });
    }
    case "matrix":
      return /* @__PURE__ */ d.jsx(Gy, { ...c });
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
      return /* @__PURE__ */ d.jsx(Yy, { ...c, duration: f });
    case "custom":
      return /* @__PURE__ */ d.jsx(d.Fragment, { children: c.node });
  }
}
function Vy({ content: c, duration: f, view: r }) {
  const s = f0(r, !!c.waveform, !!c.spectrogram);
  return /* @__PURE__ */ d.jsxs("div", { className: `rts-audio-layers rts-audio-${s}`, "data-audio-view": s, children: [
    c.spectrogram && s !== "waveform" && /* @__PURE__ */ d.jsx("div", { className: "rts-audio-spectrum", children: /* @__PURE__ */ d.jsx(oo, { content: { type: "image", ...c.spectrogram }, duration: f }) }),
    c.waveform && s !== "spectrogram" && /* @__PURE__ */ d.jsx("div", { className: "rts-audio-envelope", children: /* @__PURE__ */ d.jsx(oo, { content: { type: "waveform", ...c.waveform, colour: s === "both" ? "#e6fff7" : c.waveform.colour }, duration: f }) }),
    !c.waveform && !c.spectrogram && /* @__PURE__ */ d.jsx("span", { className: "rts-meta", children: "Waiting for audio analysis" })
  ] });
}
function Qy({ config: c, lanes: f, time: r, duration: s, playing: m }) {
  const h = f.filter((L) => L.content.type === "timing" && L.content.kind === "line"), [b, S] = w.useState(null), A = h.find((L) => L.id === (c.laneId ?? b)) ?? (c.laneId === void 0 && b === null ? h[0] : void 0), j = c.items ?? (A?.content.type === "timing" ? A.content.items : []), T = w.useMemo(() => Ay(j, s), [j, s]), v = Cy(T, r), [D, H] = w.useState(), J = c.artworkSrc && D !== c.artworkSrc;
  return /* @__PURE__ */ d.jsxs("aside", { className: "rts-audition", "aria-label": "Lyric timing audition", children: [
    /* @__PURE__ */ d.jsxs("div", { className: "rts-audition-heading", children: [
      /* @__PURE__ */ d.jsx("strong", { children: "Lyric timing audition" }),
      c.audioLabel && /* @__PURE__ */ d.jsx("span", { className: "rts-audition-source", children: c.audioLabel }),
      c.items === void 0 && c.laneId === void 0 && h.length > 1 && /* @__PURE__ */ d.jsxs("label", { children: [
        "Lyrics ",
        /* @__PURE__ */ d.jsxs(
          "select",
          {
            "aria-label": "Audition lyric lane",
            value: A?.id ?? "",
            onChange: (L) => S(L.target.value),
            children: [
              !A && /* @__PURE__ */ d.jsx("option", { value: "", children: "Choose lyric lane" }),
              h.map((L) => /* @__PURE__ */ d.jsx("option", { value: L.id, children: typeof L.title == "string" ? L.title : L.id }, L.id))
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: "rts-audition-cover", children: [
      J ? /* @__PURE__ */ d.jsx(
        "img",
        {
          src: c.artworkSrc,
          alt: c.artworkAlt ?? "Cover artwork",
          onError: () => H(c.artworkSrc)
        }
      ) : /* @__PURE__ */ d.jsx("span", { className: "rts-audition-no-art", children: "Cover artwork unavailable" }),
      /* @__PURE__ */ d.jsx("div", { className: "rts-audition-subtitles", "aria-label": "Timed lyrics", "aria-live": "off", children: v.map((L, K) => /* @__PURE__ */ d.jsx("span", { children: L }, K)) })
    ] }),
    /* @__PURE__ */ d.jsx("output", { className: "rts-audition-status", "aria-live": "off", children: T.some((L) => L.text.trim()) ? v.length ? m ? "Playing · timed lyrics" : "Paused · current lyrics" : "No lyric at this position" : "No timed lyrics available" })
  ] });
}
function Zy(c, f, r, s, m = "same-origin") {
  const [h, b] = w.useState(0), [S, A] = w.useState(!1), [j, T] = w.useState(!1), [v, D] = w.useState(""), H = w.useRef(!1), J = w.useRef("media"), L = w.useRef(null), K = w.useRef(0), ot = w.useRef({ audioSrc: f, activeLoop: r, onError: s, credentials: m });
  ot.current = { audioSrc: f, activeLoop: r, onError: s, credentials: m };
  const G = w.useCallback(() => J.current === "loop" ? L.current?.currentTime ?? 0 : c.current?.currentTime ?? 0, [c]), X = w.useCallback(() => {
    const at = G();
    return K.current += 1, H.current = !1, L.current?.pause(), c.current?.pause(), T(!1), A(!1), b(at), at;
  }, [c, G]), Mt = w.useCallback((at) => {
    X(), D(at instanceof Error ? at.message : String(at)), ot.current.onError?.(at);
  }, [X]), Tt = w.useCallback(async (at) => {
    X();
    const gt = K.current;
    H.current = !0, T(!0), D("");
    const { activeLoop: mt, audioSrc: _t, credentials: Et } = ot.current;
    try {
      if (mt) {
        if (J.current = "loop", L.current ??= new Uy(), !await L.current.play(mt, _t, at, Et)) return;
      } else {
        J.current = "media";
        const Ct = c.current;
        if (!Ct) return;
        Ct.currentTime = Math.max(0, at), await Ct.play();
      }
      if (gt !== K.current) return;
      b(G()), T(!1), A(!0);
    } catch (Ct) {
      gt === K.current && Mt(Ct);
    }
  }, [c, Mt, X, G]), Bt = w.useCallback((at) => {
    const gt = ot.current.activeLoop;
    if (gt) {
      const mt = ka(gt);
      at = d0(at, mt.start, mt.end);
    }
    H.current ? Tt(at) : (X(), J.current = "media", c.current && (c.current.currentTime = at), b(at));
  }, [c, X, Tt]), $ = w.useCallback(() => {
    if (H.current) {
      X();
      return;
    }
    let at = G();
    const gt = ot.current.activeLoop;
    if (gt) {
      const mt = ka(gt);
      (at < mt.start || at >= mt.end) && (at = mt.start);
    }
    Tt(at);
  }, [X, Tt, G]);
  w.useEffect(() => (X(), J.current = "media", b(0), D(""), L.current?.dispose(), L.current = null, () => {
    K.current += 1, H.current = !1, L.current?.dispose(), L.current = null, c.current?.pause();
  }), [f, c, X]);
  const ft = r ? JSON.stringify([r.id, r.startSample, r.endSample, r.sampleRate, r.audioSrc]) : "";
  w.useEffect(() => {
    const at = H.current;
    let gt = X();
    const mt = ot.current.activeLoop;
    mt && (gt = ka(mt).start), J.current = "media", c.current && (c.current.currentTime = gt), b(gt), at && Tt(gt);
  }, [ft, c, X, Tt]), w.useEffect(() => {
    if (!S) return;
    let at = 0;
    const gt = () => {
      b(G()), at = requestAnimationFrame(gt);
    };
    return at = requestAnimationFrame(gt), () => cancelAnimationFrame(at);
  }, [S, G]);
  const Jt = w.useCallback(() => {
    J.current === "media" && X();
  }, [X]);
  return { time: h, playing: S, loading: j, error: v, toggle: $, seek: Bt, ended: Jt, fail: Mt };
}
function Ky(c, f) {
  if (c <= 0 || f <= 0) return [];
  const r = m0(f) / 5, s = [];
  for (let m = 0; m * r <= c + 1e-6; m += 1)
    s.push({
      time: m * r,
      major: m % 5 === 0
    });
  return s;
}
function Jy(c, f) {
  const r = Math.round(c * 1e3), s = Math.floor(r / 1e3), m = `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  return m0(f) < 1 ? `${m}.${String(r % 1e3).padStart(3, "0")}` : m;
}
function $y({
  audioSrc: c,
  lyricAudition: f,
  loops: r = [],
  onLoopSelect: s,
  onLoopEnabledChange: m,
  lanes: h,
  title: b = "Audio timeline",
  subtitle: S,
  duration: A = 0,
  grid: j = [],
  beatClock: T = null,
  showBeatGrid: v = !1,
  headerEnd: D,
  footer: H,
  className: J = "",
  labelWidth: L = 230,
  initialZoom: K = 20,
  laneControls: ot = !1,
  wheelNavigation: G = !1,
  followPlayheadByDefault: X = !0,
  preload: Mt = "metadata",
  crossOrigin: Tt,
  onDurationChange: Bt,
  onTimeChange: $,
  onWindowChange: ft,
  onPlaybackError: Jt
}) {
  const at = w.useRef(null), [gt, mt] = w.useState(f?.enabledByDefault ?? !0), _t = w.useRef(null), [Et, Ct] = w.useState(Math.max(0, A)), [Y, et] = w.useState(null), [I, bt] = w.useState(!1), it = w.useMemo(() => wy(r, Et), [r, Et]), wt = it.find((R) => R.id === Y) ?? null, qt = Zy(
    at,
    c,
    I ? wt : null,
    Jt,
    Tt === "use-credentials" ? "include" : "same-origin"
  ), W = qt.time, y = qt.playing, C = wt ? ka(wt) : null, Z = (R) => {
    et(R), s?.(it.find((rt) => rt.id === R) ?? null);
  }, P = (R) => {
    bt(R), m?.(R);
  };
  w.useEffect(() => {
    Y && !it.some((R) => R.id === Y) && (et(null), bt(!1), s?.(null), m?.(!1));
  }, [Y, it, s, m]), w.useEffect(() => {
    et(null), bt(!1), Ct(Math.max(0, A));
  }, [c]);
  const [dt, yt] = w.useState(X), [st, Q] = w.useState(K), [ut, ee] = w.useState({}), [ye, Ht] = w.useState({}), kt = w.useRef(K), Xt = w.useRef(null), Ot = w.useRef(() => {
  });
  w.useEffect(() => {
    ee({}), Ht({});
  }, [c]);
  const [q, nt] = w.useState(0), [jt, je] = w.useState({ start: 0, end: 0 });
  w.useEffect(() => {
    A > 0 && Ct(A);
  }, [A]), w.useEffect(() => {
    const R = _t.current;
    if (!R) return;
    const rt = () => nt(R.clientWidth);
    rt();
    const x = new ResizeObserver(rt);
    return x.observe(R), () => x.disconnect();
  }, []);
  const ie = Et > 0 ? Math.max(0.4, Math.max(320, q - L - 16) / Et) : 0.4, Lt = Math.max(ie, ie * Math.pow(2, st / 18));
  w.useLayoutEffect(() => {
    if (kt.current = st, Xt.current && _t.current) {
      const { time: R, pointer: rt } = Xt.current;
      _t.current.scrollLeft = Ph(R, Lt, rt), Xt.current = null;
    }
  }, [st, Lt]), w.useEffect(() => {
    const R = _t.current;
    if (!R || !G) return;
    const rt = (x) => Ot.current(x);
    return R.addEventListener("wheel", rt, { passive: !1 }), () => R.removeEventListener("wheel", rt);
  }, [G]);
  const Ol = Math.max(1, Et * Lt), Vl = w.useMemo(() => Ky(Et, Lt), [Et, Lt]), Ea = w.useMemo(() => T && v ? Ly(T, 0, Et, 2e3).map((R) => ({
    time: R.time,
    emphasis: R.emphasis,
    label: R.label,
    className: `rts-beat-grid-${T.mode}`
  })) : [], [T, v, Et]), Ta = [...j, ...Ea], Re = w.useCallback(() => {
    const R = _t.current;
    if (!R) return;
    const rt = By(
      R.scrollLeft + L,
      Math.max(0, R.clientWidth - L),
      L,
      Lt,
      Et
    );
    je(rt), ft?.(rt);
  }, [Et, L, ft, Lt]);
  w.useEffect(() => {
    Re();
  }, [Re, q]), w.useEffect(() => {
    $?.(W);
    const R = _t.current;
    if (!R || !dt || !y) return;
    const rt = L + W * Lt, x = R.scrollLeft + R.clientWidth, k = Math.min(180, R.clientWidth * 0.2);
    rt > x - k ? R.scrollLeft = Math.max(0, rt - R.clientWidth + k) : rt < R.scrollLeft + L && (R.scrollLeft = Math.max(0, rt - L - k));
  }, [W, dt, y, L, $, Lt]);
  const Ql = (R) => {
    if (Et <= 0 || R.target.closest(".rts-label, a, button, input, select, textarea")) return;
    const rt = _t.current, x = at.current;
    if (!rt || !x) return;
    const k = rt.getBoundingClientRect(), Nt = R.clientX - k.left + rt.scrollLeft - L;
    if (Nt < 0) return;
    const ht = Sa(Nt / Lt, 0, Et);
    qt.seek(ht);
  }, ul = (R, rt) => {
    const x = _t.current;
    if (R = Sa(R, 0, 100), R !== kt.current) {
      if (x) {
        const k = Math.max(1, x.clientWidth - L), Nt = rt === void 0 ? k / 2 : Sa(rt - x.getBoundingClientRect().left - L, 0, k), ht = Xt.current, fe = ie * Math.pow(2, kt.current / 18), ne = ht ? Ph(ht.time, fe, ht.pointer) : x.scrollLeft;
        Xt.current = { time: (ne + Nt) / fe, pointer: Nt };
      }
      kt.current = R, Q(R);
    }
  };
  Ot.current = (R) => {
    const rt = _t.current, x = R.target instanceof Element ? R.target : null;
    if (!rt || !x || x.closest("input, select, textarea, button, [contenteditable=true]")) return;
    const k = Math.abs(R.deltaX) > Math.abs(R.deltaY) ? R.deltaX : R.deltaY, Nt = jy(k, R.deltaMode, rt.clientWidth - L);
    if (Nt)
      if (R.ctrlKey || R.metaKey) {
        if (Et <= 0) return;
        R.preventDefault(), R.stopPropagation(), yt(!1), ul(Ry(kt.current, Nt), R.clientX);
      } else if (R.altKey) {
        const ht = x.closest("[data-lane-id]")?.dataset.laneId, fe = h.find((ne) => ne.id === ht);
        if (!ot || !fe) return;
        R.preventDefault(), R.stopPropagation(), ee((ne) => ({
          ...ne,
          [fe.id]: Dy(ne[fe.id] ?? Xu(fe.height), Nt)
        }));
      } else
        R.preventDefault(), R.stopPropagation(), R.shiftKey ? rt.scrollTop += Nt : (yt(!1), rt.scrollLeft += Nt);
  };
  const Zn = () => {
    if (!C || !_t.current) return;
    const R = Math.max(320, q - L - 16) / (C.duration * 1.1), rt = Sa(18 * Math.log2(R / ie), 0, 100);
    Xt.current = null, kt.current = rt, Q(rt);
    const x = ie * Math.pow(2, rt / 18);
    requestAnimationFrame(() => {
      _t.current && (_t.current.scrollLeft = Math.max(0, (C.start - C.duration * 0.05) * x));
    });
  }, Zl = () => {
    const R = Number(at.current?.duration) || 0;
    Number.isFinite(R) && R > 0 && (Ct(R), Bt?.(R));
  };
  return /* @__PURE__ */ d.jsxs(
    "section",
    {
      className: `rts-sequence ${ot ? "rts-display-controls" : ""} ${J}`,
      style: { "--rts-label-width": `${L}px`, "--rts-track-width": `${Ol}px` },
      children: [
        /* @__PURE__ */ d.jsxs("header", { className: "rts-toolbar", children: [
          /* @__PURE__ */ d.jsxs("div", { className: "rts-ident", children: [
            /* @__PURE__ */ d.jsx("strong", { children: b }),
            S && /* @__PURE__ */ d.jsx("span", { children: S })
          ] }),
          /* @__PURE__ */ d.jsxs("div", { className: "rts-transport", "aria-label": "Timeline playback controls", children: [
            /* @__PURE__ */ d.jsx("button", { type: "button", className: "rts-button rts-play", onClick: qt.toggle, "aria-label": y || qt.loading ? "Pause" : "Play", children: qt.loading ? "…" : y ? "❚❚" : "▶" }),
            /* @__PURE__ */ d.jsxs("output", { className: "rts-time", "aria-live": "off", children: [
              _a(W),
              " / ",
              _a(Et)
            ] }),
            /* @__PURE__ */ d.jsx("button", { type: "button", className: "rts-button", onClick: () => ul(0), children: "Fit" }),
            /* @__PURE__ */ d.jsxs("label", { className: "rts-control", children: [
              /* @__PURE__ */ d.jsx("span", { children: "Zoom" }),
              /* @__PURE__ */ d.jsx("input", { "aria-label": "Timeline zoom", type: "range", min: "0", max: "100", value: st, onChange: (R) => ul(Number(R.target.value)) })
            ] }),
            /* @__PURE__ */ d.jsxs("label", { className: "rts-control", children: [
              /* @__PURE__ */ d.jsx("input", { type: "checkbox", checked: dt, onChange: (R) => yt(R.target.checked) }),
              /* @__PURE__ */ d.jsx("span", { children: "Follow" })
            ] }),
            f && /* @__PURE__ */ d.jsxs("label", { className: "rts-control rts-audition-toggle", children: [
              /* @__PURE__ */ d.jsx(
                "input",
                {
                  type: "checkbox",
                  "aria-label": "Audition lyrics",
                  checked: gt,
                  onChange: (R) => mt(R.target.checked)
                }
              ),
              /* @__PURE__ */ d.jsx("span", { children: "Audition lyrics" })
            ] })
          ] }),
          /* @__PURE__ */ d.jsx("div", { className: "rts-header-end", children: D }),
          it.length > 0 && /* @__PURE__ */ d.jsxs("div", { className: "rts-loop-controls", "aria-label": "Loop controls", children: [
            /* @__PURE__ */ d.jsxs("label", { children: [
              "Loop ",
              /* @__PURE__ */ d.jsxs("select", { "aria-label": "Select loop", value: Y ?? "", onChange: (R) => Z(R.target.value), children: [
                /* @__PURE__ */ d.jsx("option", { value: "", children: "Choose a loop…" }),
                it.map((R) => /* @__PURE__ */ d.jsx("option", { value: R.id, children: R.label || R.id }, R.id))
              ] })
            ] }),
            /* @__PURE__ */ d.jsxs("label", { children: [
              /* @__PURE__ */ d.jsx("input", { type: "checkbox", "aria-label": "Enable loop", disabled: !wt, checked: I && !!wt, onChange: (R) => P(R.target.checked) }),
              "Enable loop"
            ] }),
            /* @__PURE__ */ d.jsx("button", { type: "button", className: "rts-button", disabled: !wt, onClick: Zn, children: "Zoom to loop" }),
            wt && /* @__PURE__ */ d.jsxs("output", { children: [
              wt.startSample.toLocaleString(),
              " → ",
              wt.endSample.toLocaleString(),
              " samples (end exclusive) · ",
              wt.sampleRate.toLocaleString(),
              " Hz"
            ] }),
            wt?.downloadUrl && /* @__PURE__ */ d.jsx("a", { href: wt.downloadUrl, download: !0, children: "Download loop WAV" }),
            /* @__PURE__ */ d.jsx("span", { className: "rts-loop-status", role: "status", children: qt.loading ? "Loading loop…" : I && wt ? "Loop enabled · Play repeats selection" : "Full-song playback" })
          ] }),
          qt.error && /* @__PURE__ */ d.jsx("div", { role: "alert", className: "rts-loop-error", children: qt.error })
        ] }),
        /* @__PURE__ */ d.jsx(
          "audio",
          {
            ref: at,
            src: c,
            preload: Mt,
            crossOrigin: Tt,
            onLoadedMetadata: Zl,
            onEnded: qt.ended,
            onError: () => qt.fail(new Error(at.current?.error?.message || "Audio playback failed"))
          }
        ),
        /* @__PURE__ */ d.jsxs("div", { className: `rts-workspace ${f && gt ? "rts-with-audition" : ""}`, children: [
          /* @__PURE__ */ d.jsx("div", { ref: _t, className: "rts-scroller", onScroll: Re, onClick: Ql, children: /* @__PURE__ */ d.jsxs("div", { className: "rts-inner", children: [
            /* @__PURE__ */ d.jsxs("div", { className: "rts-ruler-row", children: [
              /* @__PURE__ */ d.jsx("div", { className: "rts-label rts-ruler-label", children: "TIME" }),
              /* @__PURE__ */ d.jsx("div", { className: "rts-ruler-track", children: Vl.map((R) => /* @__PURE__ */ d.jsx("span", { className: `rts-tick ${R.major ? "rts-tick-major" : ""}`, style: { left: `${R.time * Lt}px` }, children: R.major && /* @__PURE__ */ d.jsx("span", { className: "rts-tick-label", children: Jy(R.time, Lt) }) }, R.time)) })
            ] }),
            it.length > 0 && /* @__PURE__ */ d.jsxs("div", { className: "rts-lane rts-lane-loops", children: [
              /* @__PURE__ */ d.jsxs("div", { className: "rts-label", children: [
                /* @__PURE__ */ d.jsx("div", { className: "rts-title", children: "LOOPS" }),
                /* @__PURE__ */ d.jsx("div", { className: "rts-meta", children: "Select a region, enable, then Play" })
              ] }),
              /* @__PURE__ */ d.jsx("div", { className: "rts-track", children: it.map((R) => {
                const rt = ka(R);
                return /* @__PURE__ */ d.jsx(
                  "button",
                  {
                    type: "button",
                    className: "rts-loop-region",
                    "aria-pressed": Y === R.id,
                    "aria-label": `Select ${R.label || R.id}`,
                    onClick: () => Z(R.id),
                    title: `${R.label || R.id}: [${R.startSample}, ${R.endSample}) at ${R.sampleRate} Hz`,
                    style: { left: `${rt.start * Lt}px`, width: `${rt.duration * Lt}px` },
                    children: R.label || R.id
                  },
                  R.id
                );
              }) })
            ] }),
            C && /* @__PURE__ */ d.jsx(
              "div",
              {
                className: `rts-loop-shade ${I ? "" : "is-disabled"}`,
                "aria-hidden": "true",
                style: { left: `${L + C.start * Lt}px`, width: `${C.duration * Lt}px` }
              }
            ),
            /* @__PURE__ */ d.jsx("div", { className: "rts-lanes", children: h.map((R) => {
              const rt = R.content, x = rt.type === "audio" ? rt : null, k = ye[R.id] ?? x?.view ?? "both", Nt = x ? f0(k, !!x.waveform, !!x.spectrogram) : "both", ht = ot ? ut[R.id] ?? Xu(R.height) : R.height, fe = typeof R.title == "string" ? R.title : R.id;
              return /* @__PURE__ */ d.jsxs(
                "div",
                {
                  "data-lane-id": R.id,
                  className: `rts-lane rts-lane-${R.kind ?? "default"} ${R.className ?? ""}`,
                  style: ht ? { "--rts-lane-height": `${ht}px` } : void 0,
                  children: [
                    /* @__PURE__ */ d.jsxs("div", { className: "rts-label", children: [
                      /* @__PURE__ */ d.jsx("div", { className: "rts-title", children: R.title }),
                      R.meta && /* @__PURE__ */ d.jsx("div", { className: "rts-meta", children: R.meta }),
                      ot && /* @__PURE__ */ d.jsxs("div", { className: "rts-lane-controls", children: [
                        x && /* @__PURE__ */ d.jsxs("label", { children: [
                          "View ",
                          /* @__PURE__ */ d.jsxs(
                            "select",
                            {
                              "aria-label": `View for ${fe}`,
                              value: Nt,
                              onChange: (ne) => Ht((hl) => ({ ...hl, [R.id]: ne.target.value })),
                              children: [
                                /* @__PURE__ */ d.jsx("option", { value: "waveform", disabled: !x.waveform, children: "Waveform" }),
                                /* @__PURE__ */ d.jsx("option", { value: "spectrogram", disabled: !x.spectrogram, children: "Spectrogram" }),
                                /* @__PURE__ */ d.jsx("option", { value: "both", disabled: !x.waveform || !x.spectrogram, children: "Both" })
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
                              max: o0,
                              step: "1",
                              "aria-label": `Height for ${fe}`,
                              value: ht,
                              onChange: (ne) => ee((hl) => ({ ...hl, [R.id]: Xu(Number(ne.target.value)) }))
                            }
                          ),
                          /* @__PURE__ */ d.jsxs("output", { children: [
                            ht,
                            "px"
                          ] })
                        ] }),
                        /* @__PURE__ */ d.jsx(
                          "button",
                          {
                            type: "button",
                            className: "rts-height-reset",
                            "aria-label": `Reset height for ${fe}`,
                            onClick: () => ee((ne) => ({ ...ne, [R.id]: Xu(R.height) })),
                            children: "Reset height"
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ d.jsx("div", { className: "rts-track", children: x ? /* @__PURE__ */ d.jsx(Vy, { content: x, duration: Et, view: Nt }) : /* @__PURE__ */ d.jsx(oo, { content: rt, duration: Et }) })
                  ]
                },
                R.id
              );
            }) }),
            Ta.length > 0 && /* @__PURE__ */ d.jsx("div", { className: "rts-grid", "aria-hidden": "true", children: Ta.map((R, rt) => /* @__PURE__ */ d.jsx("span", { className: `rts-grid-line ${R.emphasis ? "rts-grid-line-emphasis" : ""} ${R.className ?? ""}`, style: { left: `${R.time * Lt}px` } }, `${R.time}-${rt}`)) }),
            /* @__PURE__ */ d.jsx("div", { className: "rts-playhead", style: { left: `${L + W * Lt}px` }, "aria-hidden": "true" })
          ] }) }),
          f && gt && /* @__PURE__ */ d.jsx(
            Qy,
            {
              config: f,
              lanes: h,
              time: W,
              duration: Et,
              playing: y
            }
          )
        ] }),
        /* @__PURE__ */ d.jsxs("footer", { className: "rts-footer", children: [
          /* @__PURE__ */ d.jsxs("div", { children: [
            H,
            G && /* @__PURE__ */ d.jsx("div", { className: "rts-navigation-help", children: "Wheel: time · Ctrl/⌘ + wheel: time zoom · Alt + wheel: channel height · Shift + wheel: channel scroll" })
          ] }),
          /* @__PURE__ */ d.jsxs("output", { className: "rts-window", children: [
            _a(jt.start),
            " — ",
            _a(jt.end)
          ] })
        ] })
      ]
    }
  );
}
function ky(c, f = null) {
  return f !== null ? f : (Array.isArray(c?.lyric_timing) ? c.lyric_timing : []).flatMap((r) => {
    if (r.start === null || r.start === void 0 || r.start === "") return [];
    const s = Number(r.start);
    if (!Number.isFinite(s) || s < 0) return [];
    const m = { start: s, label: String(r.text ?? "") };
    return r.end !== null && r.end !== void 0 && r.end !== "" && (m.end = Number(r.end)), [m];
  });
}
function Fy(c, f) {
  return c.filter((r) => typeof r.audioSrc == "string" && r.audioSrc && (r.id === "__source__" || Number.isFinite(r.duration) && f > 0 && Math.abs(r.duration - f) <= 0.05)).slice().sort((r, s) => r.id === "__source__" ? -1 : s.id === "__source__" ? 1 : r.id.localeCompare(s.id));
}
function Wy(c, f) {
  return f ? c : c.map(({ audioSrc: r, downloadUrl: s, ...m }) => m);
}
const io = /\.(wav|flac|mp3|ogg|opus|m4a|aif|aiff)$/i;
function a0(c) {
  return c === "__source__" || c.startsWith("input/") ? "master" : c.startsWith("stems/") ? c.slice(6).replace(io, "") : c.startsWith("speech/") && io.test(c) ? c.replace(io, "") : null;
}
function Iy(c) {
  const f = /* @__PURE__ */ new Map(), r = [], s = /* @__PURE__ */ new Map();
  for (const h of c) for (const b of Array.isArray(h.sourceMap) ? h.sourceMap : [])
    if (typeof b?.audio == "string" && typeof b.data == "string") {
      const S = a0(b.audio.replace(/\\/g, "/"));
      S && (s.set(b.data.replace(/\\/g, "/"), S), typeof b.png == "string" && s.set(b.png.replace(/\\/g, "/"), S));
    }
  const m = (h) => (f.has(h) || f.set(h, { key: h }), f.get(h));
  for (const h of c) {
    const b = (h.id?.replace(/^file:/, "") || "").replace(/\\/g, "/"), S = a0(b), A = b.startsWith("spectrograms/") ? s.get(b) || b.slice(13).replace(/\.(npz|png)$/i, "") : null;
    if (S && (h.content?.type === "waveform" || h.content?.type === "artifact")) {
      const j = m(S);
      (!j.audio || h.id === "__source__") && (j.audio = h);
    } else A && b.endsWith(".npz") && h.content?.type === "image" ? m(A).spectrum = h : A && b.endsWith(".png") && h.content?.type === "image" ? m(A).png = h : r.push(h);
  }
  for (const h of f.values()) {
    if (!h.audio && !h.spectrum) {
      h.png && r.push(h.png);
      continue;
    }
    const b = h.audio || h.spectrum, S = h.audio?.content?.type === "waveform" ? h.audio.content : null, A = h.audio?.content?.type === "artifact" ? h.audio.content.note : null;
    r.push({
      ...b,
      id: h.key === "master" ? "__source__" : `audio:${h.key}`,
      title: h.key === "master" ? "MASTER · uploaded source" : h.key.replace(/\//g, " · ").replace(/_/g, " "),
      kind: "audio",
      height: 160,
      meta: A || (S && h.spectrum ? "waveform + aligned spectrogram" : S ? "waveform · spectrogram pending" : "spectrogram · waveform pending"),
      content: {
        type: "audio",
        view: "both",
        waveform: S ? { min: S.min, max: S.max, colour: S.colour } : void 0,
        spectrogram: h.spectrum ? { src: h.spectrum.content.src, alt: h.spectrum.content.alt } : void 0
      }
    }), !h.spectrum && h.png && r.push(h.png);
  }
  return r;
}
const fo = (c) => typeof c == "number" && Number.isFinite(c) && c > 0, Py = { canonical: "Canonical", combined: "Consensus · observed tempo", combined_family: "Consensus · canonical tempo family", combined_fit: "Consensus · fitted constant grid" };
function n0(c, f, r, s) {
  if (!fo(c) || !Number.isFinite(f) || f < 0 || !Number.isFinite(r) || r <= 0) return [];
  const m = Math.max(0, Math.floor((r - f) * c / 60 + 1e-9) + 1), h = Math.max(1, Math.ceil(m / 25e3));
  return Array.from({ length: Math.ceil(m / h) }, (b, S) => {
    const A = S * h;
    return {
      time: f + A * 60 / c,
      emphasis: A === 0,
      label: `${s === "original" ? "Original" : "Aligned"} beat ${A + 1}${A === 0 && s === "aligned" ? " · pip 0" : ""}`,
      className: `stemlab-grid-${s}`
    };
  });
}
function tb(c, f, r, s = "canonical", m = "consensus") {
  const h = c?.schema === "stemlab.beat-offsets.v1" && c.pips_per_beat === 64;
  let b = h ? (c.bpm_bases || []).filter((H) => H.status === "available" && fo(H.bpm)) : [];
  !b.length && fo(f) && (b = [{ id: "canonical", bpm: f }]);
  const S = b.find((H) => H.id === s) || b.find((H) => H.id === "combined_fit") || b[0] || null, A = h ? (c.analyses || []).filter((H) => H.status === "available") : [], j = A.find((H) => H.analysis_id === m) || A.find((H) => H.kind === "consensus") || A[0] || null, T = S && j ? c.comparisons?.find((H) => H.status === "available" && H.bpm_basis === S.id && H.analysis_id === j.analysis_id) : null, v = S ? n0(S.bpm, 0, r, "original") : [], D = T && Number.isFinite(T.beat_zero_seconds) ? n0(T.bpm, T.beat_zero_seconds, r, "aligned") : [];
  return {
    bases: b.map((H) => ({ ...H, label: `${Py[H.id] || H.id}${H.multiplier ? ` ×${H.multiplier}` : ""} · ${H.bpm.toFixed(4)} BPM` })),
    basis: S,
    analysis: j,
    analyses: A,
    row: T,
    original: v,
    aligned: D,
    thinned: !!S && Math.floor(r * S.bpm / 60) + 1 > 25e3,
    grid: [...v, ...D].sort((H, J) => H.time - J.time)
  };
}
function eb({ comparison: c, onBasis: f, onAnalysis: r }) {
  const { bases: s, basis: m, analyses: h, analysis: b, row: S, thinned: A } = c;
  return /* @__PURE__ */ d.jsxs("section", { className: "stemlab-beat-offset-controls", "aria-label": "BPM grid comparison", children: [
    /* @__PURE__ */ d.jsxs("div", { className: "stemlab-beat-offset-selectors", children: [
      /* @__PURE__ */ d.jsxs("label", { children: [
        "BPM grid ",
        /* @__PURE__ */ d.jsxs("select", { "aria-label": "BPM grid basis", value: m?.id || "", onChange: (j) => f(j.target.value), disabled: !s.length, children: [
          !s.length && /* @__PURE__ */ d.jsx("option", { value: "", children: "BPM unavailable" }),
          s.map((j) => /* @__PURE__ */ d.jsx("option", { value: j.id, children: j.label }, j.id))
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("label", { children: [
        "First beat from ",
        /* @__PURE__ */ d.jsxs("select", { "aria-label": "First beat analysis", value: b?.analysis_id || "", onChange: (j) => r(j.target.value), disabled: !h.length, children: [
          !h.length && /* @__PURE__ */ d.jsx("option", { value: "", children: "Detected beat unavailable" }),
          h.map((j) => /* @__PURE__ */ d.jsx("option", { value: j.analysis_id, children: j.analysis_id }, j.analysis_id))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("p", { className: "stemlab-grid-legend", children: [
      /* @__PURE__ */ d.jsx("span", { className: "stemlab-legend-original", children: "Original grid · source time 0" }),
      /* @__PURE__ */ d.jsx("span", { className: "stemlab-legend-aligned", children: "Offset grid · detected first beat = pip 0" })
    ] }),
    /* @__PURE__ */ d.jsx("output", { "aria-live": "polite", "data-testid": "beat-offset-value", children: S ? `${S.offset_pips.toFixed(6)} pips · first detected beat ${S.first_beat_seconds.toFixed(6)}s · nearest whole offset ${S.integer_offset_pips} pips (${(S.integer_residual_seconds * 1e3).toFixed(3)} ms residual)` : "Waiting for usable beat evidence; no aligned grid is inferred." }),
    b?.constant_grid_fit && /* @__PURE__ */ d.jsxs("p", { className: "small", children: [
      "Selected detector fit: ",
      b.constant_grid_fit.proposed_bpm.toFixed(4),
      " BPM · 95% beat error ",
      b.constant_grid_fit.p95_absolute_beat_error_ms.toFixed(3),
      " ms · grade ",
      b.constant_grid_fit.precision_grade,
      ".",
      m?.fit ? ` Consensus grid fit grade: ${m.fit.precision_grade}.` : ""
    ] }),
    /* @__PURE__ */ d.jsxs("p", { className: "small", children: [
      "Half- and double-time readings are normal. Observed beats stay in their own lanes; tempo-family options compare ×½ / ×1 / ×2 interpretations. Constant grids and detector phases remain estimates.",
      A ? " Dense grids are thinned for display only." : ""
    ] })
  ] });
}
const lb = "stemlab.beat-timeline.v1", Zu = 64, Ml = (c) => Number.isSafeInteger(c);
function _c(c) {
  if (!c || c.schema !== lb || c.pips_per_beat !== Zu || !Number.isSafeInteger(c.source_audio?.sample_rate) || c.source_audio.sample_rate < 1 || !Number.isSafeInteger(c.source_audio?.num_frames) || c.source_audio.num_frames < 2 || !/^[0-9a-f]{64}$/.test(c.source_audio?.sha256 || "") || !/^[0-9a-f]{64}$/.test(c.consensus_sha256 || "") || !Array.isArray(c.beats) || c.beats.length < 2 || c.beats.length > 25e3 || !Ml(c.origin_beat)) throw new Error("Not a valid source-bound StemLab beat timeline");
  const f = { beat: -1, frame: -1 };
  for (const r of c.beats) {
    if (!Ml(r.beat) || !Ml(r.frame) || r.beat <= f.beat || r.frame <= f.frame || r.frame >= c.source_audio.num_frames || !["consensus", "corrected", "manual"].includes(r.source) || r.reference_frame !== null && (!Ml(r.reference_frame) || r.reference_frame < 0 || r.reference_frame >= c.source_audio.num_frames) || r.source === "consensus" && r.frame !== r.reference_frame || r.source === "manual" && r.reference_frame !== null)
      throw new Error("Beat indices and source sample frames must increase; original consensus timestamps stay immutable");
    f.beat = r.beat, f.frame = r.frame;
  }
  if (!c.beats.some((r) => r.beat === c.origin_beat)) throw new Error("Beat 1 must identify a real anchor");
  return c;
}
const Wa = (c) => ({ ...c, beats: c.beats.map((f) => ({ ...f })) }), Ia = (c) => _c(c), ab = (c, f) => c.beats[f].frame / c.source_audio.sample_rate, Qn = (c, f) => f < 0 || f + 1 >= c.beats.length ? null : 60 * c.source_audio.sample_rate * (c.beats[f + 1].beat - c.beats[f].beat) / (c.beats[f + 1].frame - c.beats[f].frame), g0 = (c, f) => Math.round(f * c.source_audio.sample_rate);
function u0(c, f, r) {
  const s = Wa(c);
  if (!Ml(f) || f < 0 || f >= s.beats.length) throw new Error("Select a beat");
  const m = g0(s, r), h = s.beats[f - 1]?.frame ?? -1, b = s.beats[f + 1]?.frame ?? s.source_audio.num_frames;
  if (!Ml(m) || m <= h || m >= b) throw new Error("Beat must remain between its neighbours");
  const S = s.beats[f];
  return S.frame = m, S.source = m === S.reference_frame ? "consensus" : S.reference_frame === null ? "manual" : "corrected", Ia(s);
}
function nb(c, f, r) {
  if (!Number.isFinite(r) || r <= 0 || r > 1200) throw new Error("BPM must be 0..1200");
  const s = Wa(c);
  if (!Ml(f) || f < 0 || f + 1 >= s.beats.length) throw new Error("Choose an interval");
  const m = s.beats[f], h = s.beats[f + 1], b = Math.round(60 * (h.beat - m.beat) * s.source_audio.sample_rate / r);
  if (b < 1) throw new Error("BPM exceeds available sample precision");
  const S = m.frame + b - h.frame;
  for (let A = f + 1; A < s.beats.length; A++) {
    const j = s.beats[A];
    j.frame += S, j.source = j.reference_frame === null ? "manual" : j.frame === j.reference_frame ? "consensus" : "corrected";
  }
  return Ia(s);
}
function ub(c, f) {
  if (!Number.isFinite(f) || Math.abs(f) > 1e5) throw new Error("Phase shift is out of bounds");
  const r = Wa(c), s = Qn(r, 0), m = Math.round(f / Zu * (60 / s) * r.source_audio.sample_rate);
  for (const h of r.beats)
    h.frame += m, h.source = h.reference_frame === null ? "manual" : h.frame === h.reference_frame ? "consensus" : "corrected";
  return Ia(r);
}
function i0(c, f) {
  const r = Wa(c), s = g0(r, f);
  if (!Ml(s) || s < 0 || s >= r.source_audio.num_frames) throw new Error("Beat outside source");
  let m = r.beats.findIndex((j) => j.frame > s);
  if (m < 0 && (m = r.beats.length), m === 0 || m === r.beats.length || r.beats[m - 1].frame === s)
    throw new Error("Insert between two existing anchors; use the timeline selection to move end beats");
  const h = r.beats[m - 1], b = r.beats[m], S = b.beat - h.beat > 1, A = h.beat + 1;
  if (!S) {
    r.origin_beat >= b.beat && (r.origin_beat += 1);
    for (let j = m; j < r.beats.length; j++) r.beats[j].beat += 1;
  }
  return r.beats.splice(m, 0, { beat: A, frame: s, source: "manual", reference_frame: null }), Ia(r);
}
function ib(c, f) {
  const r = Wa(c);
  if (!Ml(f) || f < 0 || f >= r.beats.length || r.beats.length <= 2)
    throw new Error("Keep at least two beat anchors");
  const [s] = r.beats.splice(f, 1);
  return s.beat === r.origin_beat && (r.origin_beat = r.beats[Math.min(f, r.beats.length - 1)].beat), Ia(r);
}
function cb(c, f) {
  const r = Wa(c);
  if (!Ml(f) || f < 0 || f >= r.beats.length) throw new Error("Select Beat 1");
  return r.origin_beat = r.beats[f].beat, Ia(r);
}
function sb(c) {
  const f = Wa(c);
  for (const r of f.beats) r.reference_frame !== null && (r.frame = r.reference_frame, r.source = "consensus");
  return Ia(f);
}
function rb(c) {
  const f = Qn(c, 0), r = c.beats.find((s) => s.beat === c.origin_beat);
  return c.beats.map((s) => ({
    time: s.frame / c.source_audio.sample_rate,
    value: Zu * (s.beat - c.origin_beat) - (s.frame - r.frame) * f * Zu / (c.source_audio.sample_rate * 60)
  }));
}
function ob(c, f, r = 3e3) {
  if (!c?.beats?.length) return [];
  const s = c.source_audio.sample_rate, m = Number.isFinite(f?.start) ? f.start : 0, h = Number.isFinite(f?.end) && f.end > m ? f.end : Number.MAX_VALUE, b = c.beats.filter((A) => A.frame / s >= m - 0.05 && A.frame / s <= h + 0.05), S = Math.max(1, Math.ceil(b.length / r));
  return b.filter((A, j) => j % S === 0).map((A) => ({
    time: A.frame / s,
    emphasis: A.beat === c.origin_beat,
    label: `Corrected beat ${A.beat} · native pip ${(A.beat - c.origin_beat) * Zu}`,
    className: "stemlab-grid-corrected"
  }));
}
const Qu = 20, mo = 400, y0 = (c, f, r) => Math.max(f, Math.min(r, c)), c0 = (c) => 100 * (1 - Math.log(y0(c, Qu, mo) / Qu) / Math.log(mo / Qu)), fb = (c, f) => Qu * (mo / Qu) ** y0(1 - (c - f.top) / f.height, 0, 1);
async function co(c, f = "GET", r) {
  const s = await fetch(
    `/api/${c}/beat-timeline${f === "POST" ? "/preview" : ""}`,
    { method: f, headers: { "Content-Type": "application/json" }, body: r === void 0 ? void 0 : JSON.stringify(r), cache: "no-store" }
  ), m = await s.json().catch(() => ({}));
  if (!s.ok) throw new Error(m.detail || `Beat timeline HTTP ${s.status}`);
  return m;
}
function db({ map: c, duration: f, visible: r, selected: s, onSelect: m, onEdit: h, onInsert: b }) {
  const S = c.source_audio.sample_rate, j = c.beats.map((v, D) => ({ row: v, i: D })).filter(({ row: v }) => {
    const D = v.frame / S;
    return D >= r.start - 0.1 && D <= r.end + 0.1;
  }), T = Math.max(1, Math.ceil(j.length / 2e3));
  return /* @__PURE__ */ d.jsx(
    "div",
    {
      className: "stemlab-beatmap-track",
      "aria-label": "Editable sample-accurate beat anchors",
      onDoubleClick: (v) => {
        if (v.target !== v.currentTarget) return;
        const D = v.currentTarget.getBoundingClientRect();
        b((v.clientX - D.left) / D.width * f), v.stopPropagation();
      },
      children: j.filter((v, D) => D % T === 0).map(({ row: v, i: D }) => /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          className: `stemlab-beatmap-anchor ${v.source} ${s === D ? "selected" : ""} ${v.beat === c.origin_beat ? "origin" : ""}`,
          "aria-label": `Beat ${v.beat}, ${ab(c, D).toFixed(6)} seconds, ${v.source}; drag or use arrow keys`,
          "aria-pressed": s === D,
          title: `Beat ${v.beat}: frame ${v.frame} · ${(v.frame / S).toFixed(6)} s · ${v.source}${v.reference_frame === null ? "" : ` · reference ${v.reference_frame}`}`,
          style: { left: `${v.frame / (S * Math.max(f, 1e-9)) * 100}%` },
          onPointerDown: (H) => {
            H.currentTarget.setPointerCapture(H.pointerId), m(D), H.stopPropagation();
          },
          onPointerMove: (H) => {
            if (!H.currentTarget.hasPointerCapture(H.pointerId)) return;
            const J = H.currentTarget.parentElement.getBoundingClientRect();
            h(D, (H.clientX - J.left) / J.width * f), H.stopPropagation();
          },
          onPointerUp: (H) => {
            H.currentTarget.releasePointerCapture(H.pointerId), H.stopPropagation();
          },
          onClick: (H) => {
            m(D), H.stopPropagation();
          },
          onKeyDown: (H) => {
            if (H.key !== "ArrowLeft" && H.key !== "ArrowRight") return;
            H.preventDefault(), H.stopPropagation();
            const J = H.shiftKey ? Math.max(1, Math.round(S / 1e3)) : 1;
            h(D, (v.frame + (H.key === "ArrowLeft" ? -J : J)) / S);
          },
          children: /* @__PURE__ */ d.jsx("span", { children: v.beat === c.origin_beat ? "1" : "" })
        },
        v.beat
      ))
    }
  );
}
function mb({ map: c, duration: f, visible: r, selected: s, onSelect: m, onTempo: h }) {
  const b = c.source_audio.sample_rate, S = c.beats.slice(0, -1).map((T, v) => ({
    i: v,
    start: T.frame / b,
    end: c.beats[v + 1].frame / b,
    bpm: Qn(c, v)
  })).filter((T) => T.end >= r.start && T.start <= r.end), A = Math.max(1, Math.ceil(S.length / 1800)), j = S.filter((T, v) => v % A === 0);
  return /* @__PURE__ */ d.jsxs("div", { className: "stemlab-beatmap-tempo", "aria-label": "Editable local BPM envelope", children: [
    /* @__PURE__ */ d.jsx("svg", { className: "stemlab-beatmap-tempo-line", viewBox: "0 0 1000 100", preserveAspectRatio: "none", "aria-hidden": "true", children: /* @__PURE__ */ d.jsx(
      "polyline",
      {
        points: j.map((T) => `${(T.start + T.end) / 2 / Math.max(f, 1e-9) * 1e3},${c0(T.bpm)}`).join(" "),
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
    j.map((T) => /* @__PURE__ */ d.jsx(
      "button",
      {
        type: "button",
        className: `stemlab-beatmap-tempo-node ${s === T.i ? "selected" : ""}`,
        style: { left: `${(T.start + T.end) / 2 / Math.max(f, 1e-9) * 100}%`, top: `${c0(T.bpm)}%` },
        title: `Interval ${T.i} → ${T.i + 1}: ${T.bpm.toFixed(3)} BPM · drag vertically to change local tempo`,
        "aria-label": `BPM envelope interval ${T.i}: ${T.bpm.toFixed(3)} BPM`,
        "aria-pressed": s === T.i,
        onPointerDown: (v) => {
          v.currentTarget.setPointerCapture(v.pointerId), m(T.i), v.stopPropagation();
        },
        onPointerMove: (v) => {
          if (!v.currentTarget.hasPointerCapture(v.pointerId)) return;
          const D = v.currentTarget.parentElement.getBoundingClientRect();
          h(T.i, fb(v.clientY, D)), v.stopPropagation();
        },
        onPointerUp: (v) => {
          v.currentTarget.releasePointerCapture(v.pointerId), v.stopPropagation();
        },
        onClick: (v) => {
          m(T.i), v.stopPropagation();
        },
        onKeyDown: (v) => {
          v.key !== "ArrowUp" && v.key !== "ArrowDown" || (v.preventDefault(), v.stopPropagation(), h(T.i, Math.max(0.01, T.bpm + (v.key === "ArrowUp" ? 1 : -1) * (v.shiftKey ? 0.01 : 1))));
        },
        children: T.bpm.toFixed(1)
      },
      T.i
    ))
  ] });
}
function hb(c, f, r = !0) {
  const [s, m] = w.useState(null), [h, b] = w.useState(!1), [S, A] = w.useState(null), [j, T] = w.useState(!1), [v, D] = w.useState(!1), [H, J] = w.useState(!0), [L, K] = w.useState(0), [ot, G] = w.useState({ start: 0, end: 1 / 0 }), [X, Mt] = w.useState(!1), [Tt, Bt] = w.useState(!0), [$, ft] = w.useState(""), [Jt, at] = w.useState("0"), [gt, mt] = w.useState(""), [_t, Et] = w.useState(!1), [Ct, Y] = w.useState([]), [et, I] = w.useState([]), bt = w.useRef(null), it = w.useRef(0), wt = w.useRef(null);
  wt.current = s;
  const qt = w.useCallback(async (q = !1) => {
    if (!(j && !q && !window.confirm("Discard unsaved beat edits and reload the saved map?")))
      try {
        const nt = await co(c);
        if (!nt.available) {
          D(!1);
          return;
        }
        _c(nt.map), m(nt.map), D(!0), b(nt.saved), A(nt.revision), T(!1), Y([]), I([]), K(0), ft(Qn(nt.map, 0)?.toFixed(3) || ""), mt(nt.saved ? "Loaded saved beat corrections" : "Prepared an editable proposal at exact consensus sample frames");
      } catch (nt) {
        nt.message.includes("HTTP 404") && !wt.current ? J(!1) : mt(nt.message);
      }
  }, [c, j]);
  w.useEffect(() => {
    if (!r) return;
    let q = !0;
    const nt = async () => {
      q && await qt(!0);
    };
    nt();
    const jt = window.setInterval(() => {
      q && !wt.current && nt();
    }, 5e3);
    return () => {
      q = !1, window.clearInterval(jt);
    };
  }, [c]);
  const W = w.useCallback((q) => {
    try {
      const nt = wt.current;
      if (!nt) return;
      const jt = q(nt);
      nt.review_status === "artist_confirmed" && jt.review_status === "artist_confirmed" && (jt.beats !== nt.beats || jt.origin_beat !== nt.origin_beat) && (jt.review_status = "estimated"), _c(jt), m(jt), T(!0), Y((je) => [...je.slice(-59), nt]), I([]), mt("Unsaved beat-map edits · original consensus unchanged");
    } catch (nt) {
      mt(nt.message);
    }
  }, []), y = () => {
    Ct.length && (I((q) => [...q.slice(-59), s]), m(Ct.at(-1)), Y((q) => q.slice(0, -1)), T(!0));
  }, C = () => {
    et.length && (Y((q) => [...q.slice(-59), s]), m(et.at(-1)), I((q) => q.slice(0, -1)), T(!0));
  }, Z = (q) => {
    K(q), ft(Qn(wt.current, q)?.toFixed(3) || "");
  }, P = async (q) => {
    const nt = await co(c, "POST", q);
    return _c(nt), nt;
  }, dt = async () => {
    if (s) {
      Et(!0);
      try {
        const q = await co(c, "PUT", { map: s, expected_revision: S });
        m(q.map), b(!0), A(q.revision), T(!1), Y([]), I([]), mt("Beat corrections saved separately from the consensus detections");
      } catch (q) {
        mt(q.message);
      } finally {
        Et(!1);
      }
    }
  }, yt = async (q) => {
    if (s) {
      Et(!0);
      try {
        const nt = await P(s), jt = JSON.stringify(nt, null, 2);
        if (q === "copy")
          await navigator.clipboard.writeText(jt), mt("Copied one complete beat-timeline JSON value with Beat 1 and pip phase synchronisation");
        else {
          const je = new Blob([jt + `
`], { type: "application/json" }), ie = URL.createObjectURL(je), Lt = document.createElement("a");
          Lt.href = ie, Lt.download = `stemlab-beat-timeline-${c.slice(0, 12)}.json`, document.body.appendChild(Lt), Lt.click(), Lt.remove(), URL.revokeObjectURL(ie), mt("Exported a single source-bound beat-timeline JSON file");
        }
      } catch (nt) {
        mt(nt.message);
      } finally {
        Et(!1);
      }
    }
  }, st = async (q) => {
    const nt = q.target.files?.[0];
    if (q.target.value = "", !!nt) {
      if (nt.size > 32 * 1024 * 1024) {
        mt("Import limited to 32 MiB");
        return;
      }
      Et(!0);
      try {
        const jt = JSON.parse(await nt.text()), je = await P(jt);
        m(je), T(!0), Y((ie) => s ? [...ie.slice(-59), s] : ie), I([]), mt("Imported and validated: review changes before saving. Original consensus unchanged.");
      } catch (jt) {
        mt(jt.message);
      } finally {
        Et(!1);
      }
    }
  }, Q = (q, nt) => W((jt) => nb(jt, q, nt)), ut = () => W((q) => sb(q)), ee = s && X && f > 0 ? [
    {
      id: "corrected:anchors",
      title: "Corrected beats",
      kind: "beatmap",
      height: 80,
      meta: "Drag to place · arrows: 1 sample · Shift: 1 ms · double-click empty space to insert",
      content: { type: "custom", node: /* @__PURE__ */ d.jsx(
        db,
        {
          map: s,
          duration: f,
          visible: ot,
          selected: L,
          onSelect: Z,
          onEdit: (q, nt) => W((jt) => u0(jt, q, nt)),
          onInsert: (q) => W((nt) => i0(nt, q))
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
        mb,
        {
          map: s,
          duration: f,
          visible: ot,
          selected: L,
          onSelect: Z,
          onTempo: Q
        }
      ) }
    },
    {
      id: "corrected:phase",
      title: "Phase CV",
      kind: "beatmap",
      height: 80,
      meta: "Relative pips vs the opening tempo · visible irregular drift",
      content: { type: "curve", points: rb(s).filter((q, nt) => nt % Math.max(1, Math.ceil(s.beats.length / 4e3)) === 0), colour: "#ecb7fd" }
    }
  ] : [], ye = s && Tt ? ob(s, ot) : [], Ht = s?.beats?.[Math.min(L, s.beats.length - 1)], kt = s?.source_audio?.sample_rate || 1, Xt = s && L < s.beats.length - 1 ? Qn(s, L) : null, Ot = /* @__PURE__ */ d.jsxs("section", { className: "stemlab-beatmap-panel", "aria-label": "Editable variable tempo and Beat 1 phase", children: [
    /* @__PURE__ */ d.jsxs("header", { children: [
      /* @__PURE__ */ d.jsx("strong", { children: "Beat correction · variable BPM & phase" }),
      s && /* @__PURE__ */ d.jsxs("span", { children: [
        s.beats.length.toLocaleString(),
        " anchors · ",
        h ? "saved" : "consensus draft",
        j ? " · unsaved changes" : ""
      ] }),
      /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => Mt((q) => !q), children: X ? "Hide editor" : "Show editor" })
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
              value: Ht?.beat ?? 0,
              onChange: (q) => {
                const nt = s.beats.findIndex((jt) => jt.beat === Number(q.target.value));
                nt >= 0 && Z(nt);
              }
            }
          )
        ] }),
        /* @__PURE__ */ d.jsxs("output", { children: [
          "Frame ",
          Ht?.frame ?? 0,
          " · ",
          Ht ? (Ht.frame / kt).toFixed(6) : "0",
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
              value: $,
              onChange: (q) => ft(q.target.value),
              onKeyDown: (q) => {
                q.key === "Enter" && Q(L, Number($));
              }
            }
          )
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: L >= s.beats.length - 1, onClick: () => Q(L, Number($)), children: "Apply BPM" }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Phase shift (pips) ",
          /* @__PURE__ */ d.jsx(
            "input",
            {
              "aria-label": "Global phase shift pips",
              type: "number",
              step: "0.25",
              value: Jt,
              onChange: (q) => at(q.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => W((q) => ub(q, Number(Jt))), children: "Shift all beats" })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-beatmap-actions", children: [
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => W((q) => u0(q, L, it.current)), children: "Place selected at playhead" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => W((q) => i0(q, it.current)), children: "Insert at playhead" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => W((q) => cb(q, L)), children: "Set selected as Beat 1" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => W((q) => ib(q, L)), children: "Delete selected" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: !Ct.length, onClick: y, children: "Undo" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: !et.length, onClick: C, children: "Redo" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: ut, children: "Match consensus beats" }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          /* @__PURE__ */ d.jsx("input", { type: "checkbox", checked: Tt, onChange: (q) => Bt(q.target.checked) }),
          "Corrected grid"
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          /* @__PURE__ */ d.jsx(
            "input",
            {
              type: "checkbox",
              checked: s.review_status === "artist_confirmed",
              onChange: (q) => W((nt) => ({ ...nt, review_status: q.target.checked ? "artist_confirmed" : "estimated" }))
            }
          ),
          "Artist-reviewed Beat 1 / phase"
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-beatmap-export", children: [
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: _t || !j, onClick: dt, children: "Save corrections" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: _t, onClick: () => yt("download"), children: "Export Beat 1 + full beat timeline JSON" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: _t, onClick: () => yt("copy"), children: "Copy JSON value" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: _t, onClick: () => bt.current?.click(), children: "Import JSON" }),
        /* @__PURE__ */ d.jsx("input", { ref: bt, type: "file", accept: ".json,application/json", hidden: !0, onChange: st }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => qt(), children: "Reload saved/consensus" })
      ] }),
      /* @__PURE__ */ d.jsxs("small", { children: [
        "Current local BPM: ",
        Xt?.toFixed(3) ?? "last anchor",
        " · original consensus matches remain labelled separately. Native timebase: 64 pips/beat, imported DanceMoves clocks use 16 ticks/beat. DanceMoves supports optional beat-timeline.v1 variable playback where its new consumer is installed; beat-alignment.v1 remains a separate fixed-tempo format."
      ] })
    ] }),
    !v && X && /* @__PURE__ */ d.jsx("p", { children: "Waiting for an available consensus beat list (and exact master audio). No timing is invented." }),
    gt && /* @__PURE__ */ d.jsx("output", { role: "status", className: "stemlab-beatmap-status", children: gt })
  ] });
  return {
    map: s,
    revision: S,
    saved: h,
    ready: v,
    dirty: j,
    lanes: ee,
    grid: ye,
    panel: H ? Ot : null,
    onWindowChange: G,
    onTimeChange: (q) => {
      it.current = q;
    }
  };
}
const ho = Object.freeze(["SECTION", "ENTRY", "DROP", "BREAK"]), Vu = Object.freeze([
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
]), $a = (c, f) => Math.round(Number(c) * f);
function bo(c, f) {
  const r = String(c).trim().toUpperCase(), s = String(f).trim().toUpperCase().replace(/ +/g, " ");
  if (!ho.includes(r)) throw new Error("Cue type must be SECTION, ENTRY, DROP or BREAK");
  const m = /^([A-Z][A-Z -]*?)(?: ([1-9][0-9]{0,2}|A|B|FINAL))?$/.exec(s);
  if (!m || !Vu.includes(m[1]) || s.length > 64)
    throw new Error("Use a standard section (INTRO, VERSE 1, CHORUS, BUILD 1, DROP 1, OUTRO, etc.)");
  return { type: r, section: s, label: `[${r}: ${s}]` };
}
const po = (c) => ({ ...c, lines: c.lines.map((f) => ({ ...f })), words: c.words.map((f) => ({ ...f })), cues: c.cues.map((f) => ({ ...f })), fixed_clock: { ...c.fixed_clock } });
function Vn(c, f, r, s) {
  if (!Number.isSafeInteger(c) || c < f || c > r) throw new Error(`${s} cannot cross its parent, another event or source duration`);
  return c;
}
function vb(c, f = "start_frame") {
  return c.every((r, s) => s === 0 || r[f] >= c[s - 1][f]);
}
function gb(c, f, r) {
  const s = po(c), m = c.sample_rate, h = c.num_frames;
  if (!Number.isSafeInteger(m) || !Number.isSafeInteger(h) || m < 1 || h < 2) throw new Error("Invalid source-frame metadata");
  if (f === "cue") {
    const b = s.cues.findIndex((T) => T.id === r.id);
    if (b < 0) throw new Error("Cue not found");
    const S = s.cues[b], A = bo(r.type ?? S.type, r.section ?? S.section), j = Vn($a(r.start, m), 0, h - 1, "Cue");
    if (s.cues[b] = { ...s.cues[b], frame: j, type: A.type, section: A.section }, !vb(s.cues, "frame")) throw new Error("Cue movement must preserve chronological order");
  } else if (f === "line") {
    const b = s.lines.findIndex((D) => D.id === r.id);
    if (b < 0) throw new Error("Lyric line not found");
    const S = s.lines[b], A = Vn($a(r.start, m), 0, h - 1, "Line"), j = Vn($a(r.end, m), A + 1, h, "Line");
    if (b > 0 && A < s.lines[b - 1].end_frame || b + 1 < s.lines.length && j > s.lines[b + 1].start_frame)
      throw new Error("Lyric line cannot cross neighbouring line bounds");
    s.lines[b] = { ...S, start_frame: A, end_frame: j };
    const T = A - S.start_frame, v = j - A === S.end_frame - S.start_frame;
    for (const D of s.words) if (D.line_id === S.id && (v && (D.start_frame += T, D.end_frame += T), D.start_frame < A || D.end_frame > j))
      throw new Error("Line edit would cut off a word; adjust its words first");
  } else if (f === "word") {
    const b = s.words.findIndex((H) => H.id === r.id);
    if (b < 0) throw new Error("Word not found");
    const S = s.words[b], A = s.lines.find((H) => H.id === S.line_id);
    if (!A) throw new Error("Word parent line missing");
    const j = Vn($a(r.start, m), A.start_frame, A.end_frame - 1, "Word"), T = Vn($a(r.end, m), j + 1, A.end_frame, "Word"), v = s.words.filter((H) => H.line_id === S.line_id), D = v.findIndex((H) => H.id === S.id);
    if (D > 0 && j < v[D - 1].end_frame || D + 1 < v.length && T > v[D + 1].start_frame)
      throw new Error("Word cannot overlap a neighbour within the same lyric line");
    s.words[b] = { ...S, start_frame: j, end_frame: T };
  } else throw new Error("Expected line, word or cue edit");
  return s.review_status = "draft", s;
}
function yb(c, f, r, s = {}) {
  const m = po(c), h = c.sample_rate, b = Vn($a(r, h), 0, c.num_frames - 1, "Playhead"), S = new Set([...c.lines, ...c.words, ...c.cues].map((T) => T.id)), A = { line: "line", word: "word", cue: "cue" }[f];
  if (!A) throw new Error("Unknown timing track");
  let j;
  for (let T = 1; T <= 1e5 && (j = `${A}-edit-${T}`, !!S.has(j)); T++)
    ;
  if (S.has(j)) throw new Error("Too many events");
  if (f === "cue") {
    const { type: T, section: v } = bo(s.type || "SECTION", s.section || "INTRO");
    m.cues.push({ id: j, frame: b, type: T, section: v }), m.cues.sort((D, H) => D.frame - H.frame);
  } else if (f === "line") {
    const T = String(s.text || "").trim();
    if (!T) throw new Error("Type lyric text before adding a line");
    const v = c.lines.find((J) => J.start_frame > b), D = [...c.lines].reverse().find((J) => J.start_frame <= b);
    if (D && b < D.end_frame) throw new Error("Playhead is inside an existing line");
    const H = Math.min(c.num_frames, v?.start_frame ?? c.num_frames, b + Math.round(h * 2));
    if (H <= b) throw new Error("No room for a new line");
    m.lines.push({ id: j, start_frame: b, end_frame: H, text: T }), m.lines.sort((J, L) => J.start_frame - L.start_frame);
  } else {
    const T = m.lines.find((K) => K.id === s.lineId);
    if (!T) throw new Error("Select a lyric line before adding its word");
    const v = String(s.word || "").trim();
    if (!v) throw new Error("Type word text before adding a word");
    if (b < T.start_frame || b >= T.end_frame) throw new Error("Playhead must be within selected lyric line");
    const D = m.words.filter((K) => K.line_id === T.id), H = D.find((K) => K.start_frame > b), J = [...D].reverse().find((K) => K.start_frame <= b);
    if (J && J.end_frame > b) throw new Error("Playhead is already within another word");
    const L = Math.min(T.end_frame, H?.start_frame ?? T.end_frame, b + Math.round(h * 0.25));
    if (L <= b) throw new Error("No room within the selected lyric line");
    m.words.push({ id: j, line_id: T.id, start_frame: b, end_frame: L, word: v }), m.words.sort((K, ot) => K.start_frame - ot.start_frame);
  }
  return m.review_status = "draft", m;
}
function bb(c, f, r) {
  const s = po(c), m = { line: "lines", word: "words", cue: "cues" }[f];
  if (!m) throw new Error("Invalid track");
  if (f === "line" && s.words.some((h) => h.line_id === r)) throw new Error("Delete or reassign words before deleting their line");
  return s[m] = s[m].filter((h) => h.id !== r), s.review_status = "draft", s;
}
const Sc = async (c, f = "GET", r = null, s = "") => {
  const m = await fetch(`/api/${c}/song-timing${s}`, {
    method: f,
    headers: r ? { "Content-Type": "application/json" } : void 0,
    body: r ? JSON.stringify(r) : void 0,
    cache: "no-store"
  }), h = await m.json();
  if (!m.ok) throw new Error(h.detail || `Timing edits HTTP ${m.status}`);
  return h;
}, s0 = (c, f) => c / f, Gu = (c, f) => `stemlab-${f.slice(0, 12)}-${c}`;
function pb(c, f, r) {
  const s = new Blob([c], { type: r }), m = URL.createObjectURL(s), h = document.createElement("a");
  try {
    h.href = m, h.download = f, document.body.appendChild(h), h.click(), h.remove();
  } finally {
    window.setTimeout(() => URL.revokeObjectURL(m), 1e3);
  }
}
function Sb(c, f, r, s = !0) {
  const [m, h] = w.useState(null), [b, S] = w.useState(!1), [A, j] = w.useState(null), [T, v] = w.useState(!1), [D, H] = w.useState(!1), [J, L] = w.useState(!1), [K, ot] = w.useState({ kind: "line", id: null }), [G, X] = w.useState(""), [Mt, Tt] = w.useState(!1), [Bt, $] = w.useState(0.15), [ft, Jt] = w.useState(!1), [at, gt] = w.useState({ start: 0, end: 1 / 0 }), [mt, _t] = w.useState(""), [Et, Ct] = w.useState(""), [Y, et] = w.useState("SECTION"), [I, bt] = w.useState("INTRO"), [it, wt] = w.useState("lines"), [qt, W] = w.useState("bundle"), y = w.useRef(0), C = w.useRef(null), Z = w.useRef(null), P = w.useRef(c), dt = w.useRef(!1);
  Z.current = m;
  const yt = w.useCallback(async (x = !1) => {
    if (!(!x && Z.current && T && !window.confirm("Discard unsaved song timing changes?")))
      try {
        const k = await Sc(c);
        if (!k.available) {
          X(k.reason || "Waiting for exact source audio");
          return;
        }
        if (P.current !== c) return;
        h(k.document), S(k.saved), j(k.revision), v(!1), ot({ kind: "line", id: k.document.lines[0]?.id ?? null }), X(k.warnings?.join(" · ") || "Song timing loaded · source evidence unchanged");
      } catch (k) {
        X(k.message);
      }
  }, [c, T]);
  w.useEffect(() => {
    if (!s) return;
    P.current = c, h(null), j(null), v(!1), ot({ kind: "line", id: null }), yt(!0);
    const x = window.setInterval(() => {
      !Z.current && !dt.current && yt(!0);
    }, 5e3);
    return () => window.clearInterval(x);
  }, [c]);
  const st = w.useCallback((x) => {
    try {
      const k = Z.current;
      if (!k) return;
      const Nt = x(k);
      h(Nt), v(!0), X("Unsaved song timing edits · original evidence preserved");
    } catch (k) {
      X(k.message);
    }
  }, []), Q = m?.sample_rate || 1, ut = m ? m.num_frames / Q : Math.max(0, f), ee = m?.lines.find((x) => x.id === (K.kind === "line" ? K.id : m?.words.find((k) => k.id === K.id)?.line_id)) ?? m?.lines[0] ?? null, ye = K.kind, Ht = m?.[ye === "line" ? "lines" : ye === "word" ? "words" : "cues"].find((x) => x.id === K.id) ?? null, kt = !!(r?.map?.beats?.length && r?.map?.source_audio?.sha256 === c), Xt = r?.revision ?? null, Ot = m?.clock_mode === "variable", q = w.useMemo(() => m ? m.clock_mode === "variable" ? kt ? { ...r.map, mode: "variable" } : null : { mode: "fixed", bpm: m.fixed_clock.bpm, firstBeatSeconds: m.fixed_clock.first_beat_frame / Q } : null, [m, kt, r?.map, Q]), nt = (x) => {
    st((k) => ({ ...k, clock_mode: x, beat_revision: x === "variable" ? Xt : null, review_status: "draft" }));
  }, jt = (x, k) => st((Nt) => ({ ...Nt, fixed_clock: { ...Nt.fixed_clock, [x]: k }, review_status: "draft" })), je = (x, k) => st((Nt) => gb(Nt, x, k)), ie = (x) => st((k) => yb(k, x, y.current, {
    text: mt,
    word: Et,
    lineId: ee?.id,
    type: Y,
    section: I
  })), Lt = (x, k, Nt) => st((ht) => {
    if (!Nt.trim() || /\r|\n|[\x00-\x1f]/.test(Nt)) throw new Error("Text must be nonempty, without newlines");
    const fe = x === "line" ? "lines" : "words", ne = x === "line" ? "text" : "word";
    return { ...ht, [fe]: ht[fe].map((hl) => hl.id === k ? { ...hl, [ne]: Nt.trim() } : hl), review_status: "draft" };
  }), Ol = (x, k, Nt) => st((ht) => {
    const fe = bo(k, Nt);
    return { ...ht, cues: ht.cues.map((ne) => ne.id === x ? { ...ne, type: fe.type, section: fe.section } : ne), review_status: "draft" };
  }), Vl = async () => {
    if (m) {
      H(!0), dt.current = !0;
      try {
        if (Ot && (r?.dirty || !kt)) throw new Error("Save/reload the corrected beat map first; an enabled variable clock must refer to the current real beat map");
        const x = await Sc(c, "PUT", { document: m, expected_revision: A });
        h(x.document), j(x.revision), S(!0), v(!1), X("Saved exact source-frame corrections · original canonical, cue and ASR files unchanged");
      } catch (x) {
        X(x.message);
      } finally {
        H(!1), dt.current = !1;
      }
    }
  }, Ea = async () => {
    if (m) {
      H(!0), dt.current = !0;
      try {
        if (Ot && (r?.dirty || !kt)) throw new Error("Save and verify the exact beat map before exporting variable-clock timing");
        const x = await Sc(c, "POST", { document: m }, "/preview"), k = {
          bundle: [JSON.stringify(x, null, 2) + `
`, Gu("timing-bundle", c) + ".json", "application/json"],
          lines: [x.line_lrc, Gu("lines", c) + ".lrc", "text/plain;charset=utf-8"],
          words: [x.word_tsv, Gu("words", c) + ".tsv", "text/tab-separated-values;charset=utf-8"],
          wordjson: [JSON.stringify(x.word_json, null, 2) + `
`, Gu("words", c) + ".json", "application/json"],
          cues: [x.cue_lrc, Gu("cues", c) + ".lrc", "text/plain;charset=utf-8"]
        };
        pb(...k[qt]), X(`Exported ${qt} · source-bound clock and all timing forms remain available via the bundle`);
      } catch (x) {
        X(x.message);
      } finally {
        H(!1), dt.current = !1;
      }
    }
  }, Ta = async (x) => {
    const k = x.target.files?.[0];
    if (x.target.value = "", !k || !m) return;
    if (k.size > 1048576) {
      X("Timing import limited to 1 MiB");
      return;
    }
    const Nt = k.name.split(".").at(-1).toLowerCase();
    H(!0), dt.current = !0;
    try {
      const ht = await Sc(c, "POST", { document: m, kind: it, format: Nt, text: await k.text() }, "/import");
      h(ht.document), v(!0), X(`Imported ${it} for review; not saved until Save corrections`);
    } catch (ht) {
      X(ht.message);
    } finally {
      H(!1), dt.current = !1;
    }
  }, Re = (x) => {
    const k = x.start_frame ?? x.frame, Nt = x.end_frame ?? k;
    return k / Q <= at.end + 0.01 && Nt / Q >= at.start - 0.01;
  }, Ql = (x, k) => ({
    id: x.id,
    label: k === "cue" ? `[${x.type}: ${x.section}]` : k === "word" ? x.word : x.text,
    ...k === "cue" ? { type: x.type, section: x.section } : {},
    start: s0(x.start_frame ?? x.frame, Q),
    ...k === "cue" ? {} : { end: s0(x.end_frame, Q) },
    ...k === "word" ? { parentId: x.line_id } : {}
  }), ul = m?.lines || [], Zn = (m?.words || []).filter((x) => x.line_id === ee?.id), Zl = (x, k, Nt = null) => ({
    id: `timing:${x}`,
    kind: `timing-${x}`,
    title: x === "line" ? "Lyric lines · editable" : x === "word" ? `Words · ${ee?.text || "select a line"}` : "Cue sections · editable",
    meta: `${k.length} ${x} events · drag or arrow to adjust · ${q?.mode || "no clock"} match`,
    height: x === "word" ? 88 : 94,
    content: {
      type: "timing",
      kind: x,
      clock: q,
      editable: !0,
      snap: Mt,
      toleranceSeconds: Bt,
      items: k.filter(Re).slice(0, 1600).map((ht) => Ql(ht, x)),
      parents: Nt ? Nt.map((ht) => ({ id: ht.id, start: ht.start_frame / Q, end: ht.end_frame / Q })) : void 0,
      selectedId: K.kind === x ? K.id : null,
      onSelect: (ht) => ot({ kind: x, id: ht }),
      onEdit: (ht) => je(x, ht)
    }
  }), R = m && J ? [
    Zl("line", ul),
    Zl("word", Zn, ul),
    Zl("cue", m.cues)
  ] : [], rt = /* @__PURE__ */ d.jsxs("section", { className: "stemlab-timing-panel", "aria-label": "Editable lyric, word and cue timing", children: [
    /* @__PURE__ */ d.jsxs("header", { children: [
      /* @__PURE__ */ d.jsx("strong", { children: "Song timing · line lyrics, words & cue sections" }),
      /* @__PURE__ */ d.jsx("span", { children: m ? `${m.lines.length} lines · ${m.words.length} words · ${m.cues.length} cues · ${T ? "unsaved" : "saved/seeded"}` : "Awaiting master" }),
      /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => L((x) => !x), children: J ? "Hide timing editor" : "Show timing editor" })
    ] }),
    J && m && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsx("p", { children: "Line, word and cue edits are kept in a separate source-bound document. Choose a lyric line to adjust its individual words. Cue names must follow the established [SECTION: VERSE 1] / [DROP: CHORUS 1] convention." }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-timing-fields", children: [
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Timing clock ",
          /* @__PURE__ */ d.jsxs("select", { "aria-label": "Timing clock", value: m.clock_mode, onChange: (x) => nt(x.target.value), children: [
            /* @__PURE__ */ d.jsx("option", { value: "fixed", children: "Fixed BPM + Beat 1 offset" }),
            /* @__PURE__ */ d.jsx("option", { value: "variable", disabled: !kt, children: "Corrected variable BPM beat map" })
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
              value: m.fixed_clock.bpm,
              onChange: (x) => jt("bpm", Number(x.target.value))
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
              max: ut,
              step: ".001",
              value: m.fixed_clock.first_beat_frame / Q,
              onChange: (x) => jt("first_beat_frame", $a(x.target.value, Q))
            }
          )
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          /* @__PURE__ */ d.jsx("input", { type: "checkbox", checked: Mt, onChange: (x) => Tt(x.target.checked) }),
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
              value: Math.round(Bt * 1e3),
              onChange: (x) => $(Math.max(0, Math.min(1, Number(x.target.value) / 1e3)))
            }
          )
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          /* @__PURE__ */ d.jsx("input", { type: "checkbox", checked: ft, onChange: (x) => Jt(x.target.checked) }),
          "Beat grid overlay"
        ] })
      ] }),
      Ot && !kt && /* @__PURE__ */ d.jsx("p", { role: "alert", children: "Variable BPM is selected but its source-bound beat map is unavailable; no silent fixed-BPM downgrade." }),
      Ot && r?.dirty && /* @__PURE__ */ d.jsx("p", { role: "alert", children: "Save the beat-map corrections before saving/exporting lyric and cue timing changes." }),
      Ot && kt && m.beat_revision !== Xt && /* @__PURE__ */ d.jsxs("p", { role: "alert", children: [
        "The saved beat-map revision has changed. Review its timing, then explicitly rebind these lyrics and cues to that revision. ",
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: r.dirty, onClick: () => st((x) => ({ ...x, beat_revision: Xt, review_status: "draft" })), children: "Rebind to reviewed beat-map revision" })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-timing-fields", children: [
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Selected line ",
          /* @__PURE__ */ d.jsxs("select", { "aria-label": "Selected lyric line", value: ee?.id || "", onChange: (x) => ot({ kind: "line", id: x.target.value }), children: [
            /* @__PURE__ */ d.jsx("option", { value: "", children: "Choose line" }),
            m.lines.map((x) => /* @__PURE__ */ d.jsx("option", { value: x.id, children: x.text.slice(0, 75) }, x.id))
          ] })
        ] }),
        Ht && ye !== "cue" && /* @__PURE__ */ d.jsxs("label", { children: [
          ye === "line" ? "Line text" : "Word text",
          /* @__PURE__ */ d.jsx(
            "input",
            {
              "aria-label": "Selected text",
              value: ye === "line" ? Ht.text : Ht.word,
              onChange: (x) => Lt(ye, Ht.id, x.target.value)
            }
          )
        ] }),
        Ht && ye === "cue" && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
          /* @__PURE__ */ d.jsxs("label", { children: [
            "Cue type ",
            /* @__PURE__ */ d.jsx("select", { value: Ht.type, onChange: (x) => Ol(Ht.id, x.target.value, Ht.section), children: ho.map((x) => /* @__PURE__ */ d.jsx("option", { value: x, children: x }, x)) })
          ] }),
          /* @__PURE__ */ d.jsxs("label", { children: [
            "Standard section ",
            /* @__PURE__ */ d.jsx(
              "select",
              {
                value: Vu.find((x) => Ht.section === x || Ht.section.startsWith(x + " ")) || "INTRO",
                onChange: (x) => Ol(Ht.id, Ht.type, x.target.value),
                children: Vu.map((x) => /* @__PURE__ */ d.jsx("option", { value: x, children: x }, x))
              }
            )
          ] }),
          /* @__PURE__ */ d.jsxs("label", { children: [
            "Section number / suffix ",
            /* @__PURE__ */ d.jsxs(
              "select",
              {
                "aria-label": "Cue section suffix",
                value: Ht.section.match(/ (\d+|A|B|FINAL)$/)?.[1] || "",
                onChange: (x) => {
                  const k = Vu.find((Nt) => Ht.section === Nt || Ht.section.startsWith(Nt + " ")) || "INTRO";
                  Ol(Ht.id, Ht.type, k + (x.target.value ? " " + x.target.value : ""));
                },
                children: [
                  /* @__PURE__ */ d.jsx("option", { value: "", children: "None" }),
                  Array.from({ length: 64 }, (x, k) => String(k + 1)).concat(["A", "B", "FINAL"]).map((x) => /* @__PURE__ */ d.jsx("option", { value: x, children: x }, x))
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-timing-fields", children: [
        /* @__PURE__ */ d.jsxs("label", { children: [
          "New line text ",
          /* @__PURE__ */ d.jsx("input", { value: mt, placeholder: "Lyrics line", onChange: (x) => _t(x.target.value) })
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => ie("line"), children: "Add line at playhead" }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "New word ",
          /* @__PURE__ */ d.jsx("input", { value: Et, placeholder: "Single word", onChange: (x) => Ct(x.target.value) })
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: !ee, onClick: () => ie("word"), children: "Add word inside selected line" })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-timing-fields", children: [
        /* @__PURE__ */ d.jsxs("label", { children: [
          "New cue type ",
          /* @__PURE__ */ d.jsx("select", { value: Y, onChange: (x) => et(x.target.value), children: ho.map((x) => /* @__PURE__ */ d.jsx("option", { children: x }, x)) })
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Section ",
          /* @__PURE__ */ d.jsx("select", { value: I, onChange: (x) => bt(x.target.value), children: Vu.map((x) => /* @__PURE__ */ d.jsx("option", { children: x }, x)) })
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => ie("cue"), children: "Add cue at playhead" }),
        /* @__PURE__ */ d.jsxs("button", { type: "button", disabled: !Ht, onClick: () => st((x) => bb(x, ye, K.id)), children: [
          "Delete selected ",
          ye
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          /* @__PURE__ */ d.jsx("input", { type: "checkbox", checked: m.review_status === "artist_confirmed", onChange: (x) => st((k) => ({ ...k, review_status: x.target.checked ? "artist_confirmed" : "draft" })) }),
          "Artist-reviewed timing"
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-timing-actions", children: [
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: D || !T, onClick: Vl, children: "Save source-frame corrections" }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Export format ",
          /* @__PURE__ */ d.jsxs("select", { value: qt, onChange: (x) => W(x.target.value), children: [
            /* @__PURE__ */ d.jsx("option", { value: "bundle", children: "Complete JSON bundle" }),
            /* @__PURE__ */ d.jsx("option", { value: "lines", children: "Line LRC" }),
            /* @__PURE__ */ d.jsx("option", { value: "words", children: "Word TSV" }),
            /* @__PURE__ */ d.jsx("option", { value: "wordjson", children: "Word JSON" }),
            /* @__PURE__ */ d.jsx("option", { value: "cues", children: "Named cue LRC" })
          ] })
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: D, onClick: Ea, children: "Download selection" }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Import track ",
          /* @__PURE__ */ d.jsxs("select", { value: it, onChange: (x) => wt(x.target.value), children: [
            /* @__PURE__ */ d.jsx("option", { value: "lines", children: "Per-line LRC" }),
            /* @__PURE__ */ d.jsx("option", { value: "words", children: "Per-word LRC/TSV/JSON" }),
            /* @__PURE__ */ d.jsx("option", { value: "cues", children: "Section-cue LRC" })
          ] })
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: D, onClick: () => C.current?.click(), children: "Choose timing file" }),
        /* @__PURE__ */ d.jsx("input", { ref: C, type: "file", hidden: !0, accept: it === "words" ? ".lrc,.tsv,.json" : ".lrc", onChange: Ta }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: D, onClick: () => yt(), children: "Reload saved" })
      ] }),
      /* @__PURE__ */ d.jsx("small", { children: "Word positions must stay inside their lyric line. An off-grid word/cue is preserved until you explicitly drag or enable nearby-beat snapping. Pips=64/beat, DanceMoves ticks=16/beat. LRC/TSV exports round timestamps; the JSON retains native frames." })
    ] }),
    J && !m && /* @__PURE__ */ d.jsx("p", { children: "Waiting for decoded source audio; no lyric or cue times are invented." }),
    G && /* @__PURE__ */ d.jsx("output", { role: "status", className: "stemlab-timing-status", children: G })
  ] });
  return {
    clock: q,
    lanes: R,
    panel: rt,
    gridVisible: ft,
    lyricItems: m ? ul.map((x) => Ql(x, "line")) : null,
    onWindowChange: gt,
    onTimeChange: (x) => {
      y.current = x;
    }
  };
}
function _b(c, f) {
  if (!c || c.schema !== "stemlab.loops.v1") return [];
  const r = c.sample_rate;
  return !Number.isSafeInteger(r) || r <= 0 ? [] : (c.loops || []).flatMap((s) => {
    if (!/^(verse|chorus)-\d+-\d+$/.test(s.id) || !Number.isSafeInteger(s.start_sample) || !Number.isSafeInteger(s.end_sample) || s.start_sample < 0 || s.end_sample <= s.start_sample || s.end_sample > c.source_frames) return [];
    const m = encodeURIComponent(`${c.source_sha256}:${s.start_sample}:${s.end_sample}`);
    return [{
      id: s.id,
      label: `${s.section_label} · ${s.bars} bar${s.bars === 1 ? "" : "s"}`,
      startSample: s.start_sample,
      endSample: s.end_sample,
      sampleRate: r,
      // Exact native-rate PCM excerpt, computed read-only whether or not --export-loops was used.
      audioSrc: `/api/${f}/loops/${encodeURIComponent(s.id)}/audio?v=${m}`,
      downloadUrl: s.file && /^audio\/[a-zA-Z0-9._-]+\.wav$/.test(s.file) ? `/${f}/deep/loops/${s.file.split("/").map(encodeURIComponent).join("/")}` : void 0
    }];
  });
}
function Eb(c) {
  const [f, r] = w.useState({ report: null, error: "" });
  w.useEffect(() => {
    let m = !0, h, b = "";
    const S = new AbortController();
    r({ report: null, error: "" });
    const A = async () => {
      try {
        const j = await fetch(`/${c}/deep/loops/loops.json`, {
          cache: "no-store",
          signal: S.signal
        });
        if (!m) return;
        if (j.status === 404)
          b = "", r({ report: null, error: "" });
        else {
          if (!j.ok) throw new Error(`Loop report: HTTP ${j.status}`);
          const T = await j.json();
          if (T.schema === "stemlab.loop-availability.v1" && T.status === "not-analysed") {
            r({ report: null, error: "", note: T.reason });
            return;
          }
          if (T.schema !== "stemlab.loops.v1") throw new Error("Unsupported loop report schema");
          const v = JSON.stringify(T);
          m && v !== b && (r({ report: T, error: "" }), b = v);
        }
      } catch (j) {
        m && j.name !== "AbortError" && (b = "", r({ report: null, error: j.message }));
      } finally {
        m && (h = window.setTimeout(A, 2500));
      }
    };
    return A(), () => {
      m = !1, S.abort(), window.clearTimeout(h);
    };
  }, [c]);
  const s = w.useMemo(() => _b(f.report, c), [f.report, c]);
  return { ...f, loops: s };
}
function Tb({ state: c, hash: f }) {
  const r = c.report;
  return c.error ? /* @__PURE__ */ d.jsx("p", { role: "alert", className: "stemlab-loop-summary", children: c.error }) : c.note ? /* @__PURE__ */ d.jsx("p", { className: "stemlab-loop-summary", children: c.note }) : r ? /* @__PURE__ */ d.jsxs("details", { className: "stemlab-loop-summary", open: r.unresolved_sections.length > 0, children: [
    /* @__PURE__ */ d.jsxs("summary", { children: [
      r.loop_count,
      " loop(s) · ",
      r.unresolved_sections.length,
      " unresolved section(s) · ",
      /* @__PURE__ */ d.jsx("a", { href: `/${f}/deep/loops/loops.json`, target: "_blank", rel: "noopener", children: "Sample report" })
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
const Me = (c) => document.querySelector(c), Nb = Me("#uploadView"), So = Me("#timelineView"), Fa = Me("#dropZone"), Ku = Me("#fileInput"), b0 = Me("#chooseButton"), p0 = Me("#uploadProgressWrap"), Ec = Me("#uploadProgress"), Tc = Me("#uploadLabel"), pa = Me("#connectionBadge"), S0 = Me("#canonicalBpm"), _0 = Me("#canonicalLyrics"), E0 = Me("#canonicalTiming"), vo = Me("#knownInfoStatus"), xb = Me("#loadArcadiansReference"), Mb = Me("#loadArcadiansHero"), Ob = Array.from(So.children), _o = document.createElement("div");
_o.id = "timelineRoot";
So.replaceChildren(_o);
for (const c of Ob) c.remove();
const zb = zy.createRoot(_o), Ab = /* @__PURE__ */ new Set(["wav", "flac", "mp3", "ogg", "opus", "m4a", "aif", "aiff"]);
let go = {};
function Cb(c) {
  const f = String(c).split("/").pop() || "", r = f.lastIndexOf(".");
  return r >= 0 ? f.slice(r + 1).toLowerCase() : "";
}
function dl(c) {
  return String(c).replace(/^stems\//, "").replace(/^spectrograms\//, "").replace(/^vamp\/data\//, "Vamp · ").replace(/^beats\//, "Beats · ").replace(/^speech\//, "Speech · ").replace(/^deep\//, "Deep · ").replace(/[_-]+/g, " ");
}
function Mc(c, f) {
  return `/${c}/${f.split("/").map(encodeURIComponent).join("/")}`;
}
function Nc(c, f, r = "Generated analysis artifact") {
  return { type: "artifact", note: r, href: f === "__source__" ? `/api/${c}/source` : Mc(c, f) };
}
async function ke(c, f) {
  const r = await fetch(Mc(c, f), { cache: "no-store" });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}
function ml(c, f = 2, r = "") {
  const s = Number(c);
  return Number.isFinite(s) ? `${s.toFixed(f)}${r}` : "—";
}
function Ja(c, f, r, s, m = "feature") {
  const h = s.filter(([, b]) => b != null && b !== "");
  return {
    id: c,
    title: f,
    meta: r,
    kind: m,
    content: {
      type: "summary",
      items: (h.length ? h : [["status", "analysis available"]]).map(([b, S]) => ({ label: b, value: S }))
    }
  };
}
function xc(c) {
  return (c || []).flatMap((f) => {
    const r = Number(f.start);
    if (!Number.isFinite(r)) return [];
    const s = Number(f.end);
    return [{
      start: r,
      end: Number.isFinite(s) && s > r ? s : r + 0.5,
      label: f.label || f.text || f.values?.[0] || ""
    }];
  });
}
function jb(c) {
  const f = Array.isArray(c.events) ? c.events : [];
  switch (String(c.kind || "")) {
    case "curve":
      return { type: "curve", points: f.flatMap((r) => {
        const s = Number(r.start), m = Number(r.values?.[0]);
        return Number.isFinite(s) && Number.isFinite(m) && m > 0 ? [{ time: s, value: m }] : [];
      }) };
    case "matrix":
      return { type: "matrix", rows: f.map((r) => r.values || []).filter((r) => r.length) };
    case "notes":
      return { type: "notes", items: f.flatMap((r) => {
        const s = Number(r.values?.[0]), m = Number(r.start);
        if (!Number.isFinite(s) || s <= 0 || !Number.isFinite(m)) return [];
        const h = Number(r.end);
        return [{ start: m, end: Number.isFinite(h) && h > m ? h : m + 0.12, value: s, label: r.label }];
      }) };
    case "segments":
      return { type: "blocks", items: xc(f) };
    case "events":
      return { type: "markers", items: f.flatMap((r) => Number.isFinite(Number(r.start)) ? [{ time: Number(r.start) }] : []) };
    default:
      return { type: "artifact", note: f[0]?.label || f[0]?.values?.join(", ") || c.title || "analysis" };
  }
}
async function T0(c, f, r, s, m) {
  const h = new URLSearchParams({ path: m, points: "12000" }), b = await fetch(`/api/${c}/waveform?${h}`);
  if (!b.ok) return { id: f, title: r, meta: s, kind: "artifact", content: Nc(c, m, `waveform unavailable (${b.status})`) };
  const S = await b.json();
  return {
    id: f,
    title: r,
    meta: s,
    kind: "waveform",
    content: { type: "waveform", min: S.min || [], max: S.max || [] },
    duration: Number(S.duration_seconds) || 0,
    audioSrc: m === "__source__" ? `/api/${c}/source` : Mc(c, m)
  };
}
async function Rb(c, f) {
  const r = f.path, s = `file:${r}`, m = Cb(r);
  if (r === "canonical.json" || r.startsWith("deep/loops/")) return null;
  if (Ab.has(m)) return T0(c, s, dl(r), "audio waveform", r);
  if (r.startsWith("spectrograms/") && m === "npz") {
    const h = new URLSearchParams({ path: r, max_width: "8192", max_height: "768" });
    return { id: s, title: dl(r), meta: "spectrogram data · exact song timeline", kind: "spectrogram", content: { type: "image", src: `/api/${c}/spectrogram?${h}`, alt: `${dl(r)} spectrogram` } };
  }
  if (r.startsWith("spectrograms/") && m === "png")
    return { id: s, title: dl(r), meta: "rendered spectrogram PNG", kind: "image", content: { type: "image", src: Mc(c, r), alt: `${dl(r)} rendered spectrogram` } };
  try {
    if (r === "analysis.json") {
      const h = await ke(c, r);
      return {
        id: s,
        title: dl(r),
        meta: "analysis provenance",
        kind: "artifact",
        sourceMap: h.spectrograms || [],
        content: Nc(c, r)
      };
    }
    if (r.startsWith("deep/midi/") && r.endsWith("/notes.json")) {
      const h = await ke(c, r);
      return {
        id: s,
        title: `MIDI · ${h.source_stem || dl(r)}`,
        meta: `${h.model_title || h.model || "Transcription"} · ${h.note_count || 0} inferred notes · original audio clock`,
        kind: "midi-notes",
        content: { type: "notes", items: (h.notes || []).map((b) => ({
          start: b.start,
          end: b.end,
          value: b.midi_pitch,
          label: `MIDI ${b.midi_pitch} · velocity ${b.velocity}`
        })) }
      };
    }
    if (r.startsWith("beats/") && m === "json") {
      const h = await ke(c, r), b = new Set((h.downbeats || []).map((S) => Number(S).toFixed(3)));
      return { id: s, title: dl(r), meta: "beat / downbeat events", kind: "events", content: { type: "markers", items: (h.beats || []).flatMap((S) => {
        const A = Number(S);
        return Number.isFinite(A) ? [{ time: A, emphasis: b.has(A.toFixed(3)), label: b.has(A.toFixed(3)) ? "Downbeat" : "Beat" }] : [];
      }) } };
    }
    if (r.startsWith("vamp/data/") && m === "json") {
      const h = await ke(c, r);
      return { id: s, title: dl(r), meta: "Vamp feature analysis", kind: "feature", content: jb(h) };
    }
    if (r === "speech/whisper.json") {
      const h = await ke(c, r);
      return { id: s, title: "Speech · Whisper words", meta: "word-aligned transcript", kind: "words", content: { type: "blocks", items: (h.words || []).flatMap((b) => {
        const S = Number(b.start), A = Number(b.end);
        return Number.isFinite(S) ? [{ start: S, end: Number.isFinite(A) ? Math.max(S + 0.03, A) : S + 0.03, label: String(b.word || "").trim() }] : [];
      }) } };
    }
    if (r === "deep/structure/structure.json" || r === "deep/song_map/song_map.json") {
      const h = await ke(c, r), b = r.includes("song_map");
      return { id: s, title: b ? "Deep · song map" : "Deep · functional structure", meta: b ? "section-level sonic / rhythm / harmony / lyric fusion" : "All-In-One · functional song sections", kind: "deep-structure", content: { type: "blocks", items: xc(b ? h.sections : h.segments) } };
    }
    if (r === "deep/harmony/harmony.json") {
      const h = await ke(c, r), b = h.chords?.collapsed_progression || [];
      return b.length ? { id: s, title: "Deep · harmony", meta: "collapsed chord progression + key evidence", kind: "deep-harmony", content: { type: "blocks", items: xc(b) } } : Ja(s, "Deep · harmony", "collapsed chord progression + key evidence", [["key", h.vamp_key || h.independent_key_candidates_from_nnls_chroma?.[0]?.key || "—"], ["tuning", h.tuning_hz ? `${Number(h.tuning_hz).toFixed(1)} Hz` : "—"]], "deep-harmony");
    }
    if (r === "deep/lyrics/lyrics.json") {
      const h = await ke(c, r), b = (h.lines || []).filter((S) => Number.isFinite(Number(S.start)) && Number.isFinite(Number(S.end)));
      return b.length ? { id: s, title: "Deep · rhyme & prosody", meta: "phonetic rhyme, repetition and delivery", kind: "deep-lyrics", content: { type: "blocks", items: xc(b) } } : Ja(s, "Deep · rhyme & prosody", "phonetic rhyme, repetition and delivery", [["rhyme scheme", h.rhyme?.scheme || "—"], ["lines", h.line_count ?? "—"], ["words", h.word_count ?? "—"]], "deep-lyrics");
    }
    if (r === "deep/sonic/sonic.json") {
      const h = await ke(c, r);
      return Ja(s, "Deep · sonic profile", "loudness · dynamics · timbre · stereo", [["LUFS", ml(h.loudness?.integrated_lufs_bs1770, 1)], ["crest", ml(h.loudness?.crest_factor_db, 1, " dB")], ["RMS range", ml(h.loudness?.short_term_rms_range_db_p95_p10, 1, " dB")], ["centroid", ml(h.timbre?.spectral_centroid_hz_mean, 0, " Hz")], ["stereo corr", ml(h.stereo?.left_right_correlation, 2)]]);
    }
    if (r === "deep/rhythm/rhythm.json") {
      const h = await ke(c, r);
      return Ja(s, "Deep · groove", "meter · stability · swing · syncopation evidence", [["tempo", ml(h.tempo?.median_bpm, 2, " BPM")], ["meter", h.meter?.estimated_beats_per_bar ? `${h.meter.estimated_beats_per_bar}/4-ish` : "—"], ["swing", ml(h.groove?.swing_ratio_long_to_short, 2, ":1")], ["offbeat energy", ml(h.groove?.offbeat_onset_energy_ratio, 3)], ["onsets/s", ml(h.groove?.onset_density_per_second, 2)]]);
    }
    if (r === "deep/semantic_text/semantic_text.json") {
      const h = await ke(c, r);
      return Ja(s, "Deep · lyric semantics", "sentence embedding theme similarities · not probabilities", (h.theme_similarity || []).slice(0, 7).map((b) => [b.theme, ml(b.similarity, 3)]));
    }
    if (r === "deep/semantic_audio/semantic_audio.json") {
      const h = await ke(c, r), b = Object.entries(h.prompt_sets || {}).flatMap(([S, A]) => (A || []).slice(0, 2).map((j) => [`${S}: ${j.prompt}`, ml(j.similarity, 3)]));
      return Ja(s, "Deep · audio semantics", "MuQ-MuLan zero-shot similarities · CC-BY-NC weights", b);
    }
    if (r === "deep/summary.json") {
      const h = await ke(c, r), b = Object.entries(h.analyses || {}).map(([S, A]) => [S, A.available ? "ready" : "unavailable"]);
      return (h.errors || []).length && b.push(["errors", h.errors.length]), Ja(s, "Deep · analysis summary", "cross-domain action inventory", b);
    }
  } catch (h) {
    return { id: s, title: dl(r), meta: "analysis artifact", kind: "artifact", content: Nc(c, r, h.message) };
  }
  return { id: s, title: dl(r), meta: `${m || "file"} · ${Number(f.bytes || 0).toLocaleString()} bytes`, kind: "artifact", content: Nc(c, r) };
}
function Db(c) {
  const f = [];
  c?.lyrics && f.push({ id: "canonical:lyrics", title: "Canonical lyrics", meta: "known reference text", kind: "canonical-lyrics", height: 104, content: { type: "text", text: c.lyrics } });
  const r = Array.isArray(c?.lyric_timing) ? c.lyric_timing : [];
  return r.length && f.push({ id: "canonical:timing", title: "Canonical lyric timing", meta: `${r.length} timed lyric event${r.length === 1 ? "" : "s"}`, kind: "canonical-timing", height: 104, content: { type: "blocks", items: r.flatMap((s) => {
    const m = Number(s.start), h = Number(s.end);
    return Number.isFinite(m) && m >= 0 ? [{ start: m, end: Number.isFinite(h) && h > m ? h : m + 0.75, label: String(s.text || ""), className: "stemlab-canonical-lyric" }] : [];
  }) } }), { lanes: f };
}
function wb({ lines: c }) {
  return /* @__PURE__ */ d.jsxs("details", { open: !0, className: "stemlab-log", children: [
    /* @__PURE__ */ d.jsx("summary", { children: "Analysis log" }),
    /* @__PURE__ */ d.jsx("div", { className: "log", children: c.map((f, r) => /* @__PURE__ */ d.jsxs("div", { className: f.stream === "stderr" ? "stderr" : "stdout", children: [
      "[",
      f.stream,
      "] ",
      f.text
    ] }, r)) })
  ] });
}
function Ub({ hash: c, filename: f }) {
  const r = Eb(c), [s, m] = w.useState([]), [h, b] = w.useState("__source__"), [S, A] = w.useState(0), j = !window.__stemlabStatic, T = hb(c, S, j), v = Sb(c, S, T, j), [D, H] = w.useState({ state: "submitted" }), [J, L] = w.useState({ bpm: null, lyrics: null, lyric_timing: [] }), [K, ot] = w.useState(null), [G, X] = w.useState("canonical"), [Mt, Tt] = w.useState("consensus"), [Bt, $] = w.useState([]), ft = w.useRef(/* @__PURE__ */ new Set()), Jt = w.useCallback((W, y) => {
    y && $((C) => [...C.slice(-799), { stream: W === "stderr" ? "stderr" : "stdout", text: y }]);
  }, []), at = w.useCallback(async (W) => {
    if (!W?.path || ft.current.has(W.path)) return;
    ft.current.add(W.path);
    const y = await Rb(c, W);
    y && (y.duration && A((C) => C || y.duration), m((C) => C.some((Z) => Z.id === y.id) ? C : [...C, y]));
  }, [c]), gt = w.useCallback(async () => {
    const W = await fetch(`/api/${c}/timeline`, { cache: "no-store" });
    if (!W.ok) return;
    const y = await W.json();
    H(y.status || { state: "submitted" }), y.duration_seconds && A(Number(y.duration_seconds)), y.canonical && L(y.canonical), ot(y.beat_offsets || null);
    for (const C of y.files || []) at(C);
  }, [at, c]);
  w.useEffect(() => {
    ft.current = /* @__PURE__ */ new Set(), m([]), b("__source__"), ot(null), X("canonical"), Tt("consensus"), T0(c, "__source__", "MASTER · uploaded source", f, "__source__").then((C) => {
      C.duration && A(C.duration), m((Z) => [C, ...Z.filter((P) => P.id !== C.id)]);
    }).catch((C) => Jt("stderr", C.message)), gt();
    const W = window.setInterval(() => {
      gt();
    }, 2500);
    let y = null;
    return typeof window.io == "function" ? (y = window.io({ path: "/socket.io" }), y.on("connect", () => {
      pa.textContent = "live", pa.classList.remove("muted"), y.emit("subscribe", { hash: c });
    }), y.on("disconnect", () => {
      pa.textContent = "reconnecting", pa.classList.add("muted");
    }), y.on("process_output", (C) => Jt(C.stream || "stdout", C.line || "")), y.on("process_history", (C) => {
      for (const Z of C.stdout || []) Jt("stdout", Z);
      for (const Z of C.stderr || []) Jt("stderr", Z);
    }), y.on("new_file", (C) => {
      at(C);
    }), y.on("job_status", (C) => {
      H(C.status || {}), gt();
    }), y.on("canonical_metadata", (C) => {
      C?.canonical && L(C.canonical);
    }), y.on("job_timeout", (C) => Jt("stderr", `Job timeout: ${C.message || "analysis exceeded timeout"}`))) : window.__stemlabStatic ? (pa.textContent = "static", pa.classList.add("muted")) : (pa.textContent = "polling", pa.classList.add("muted"), Jt("stderr", "Socket.IO browser client unavailable; timeline inventory polling remains active.")), () => {
      window.clearInterval(W), y?.disconnect();
    };
  }, [at, Jt, f, c, gt]);
  const mt = w.useMemo(() => Db(J), [J]), _t = w.useMemo(() => tb(K, J.bpm, S, G, Mt), [K, J.bpm, S, G, Mt]), Et = (W) => W.id === "__source__" ? 0 : W.kind === "deep-structure" ? 10 : W.kind === "events" ? 20 : W.kind === "audio" ? 1 : W.kind === "spectrogram" ? 30 : W.kind === "waveform" ? 40 : 90, Ct = w.useMemo(() => Iy(s), [s]), et = [..._t.basis ? [
    { id: "canonical:bpm", title: "BPM grid · original", meta: `${_t.basis.bpm.toFixed(4)} BPM · source time 0`, kind: "canonical-bpm", height: 74, content: { type: "markers", items: _t.original } },
    { id: "bpm:aligned", title: "BPM grid · offset", meta: _t.row ? `${_t.row.offset_pips.toFixed(6)} pips · ${_t.analysis.analysis_id}` : "Waiting for detected first beat", kind: "canonical-bpm", height: 74, content: { type: "markers", items: _t.aligned } }
  ] : [], ...T.lanes, ...v.lanes, ...mt.lanes, ...[...Ct].sort((W, y) => Et(W) - Et(y) || W.id.localeCompare(y.id))], I = Fy(s, S), bt = I.find((W) => W.id === h), it = !bt || bt.id === "__source__", wt = window.__stemlabStatic ? window.__stemlabStatic.artworkUrl : J.cover_art_url, qt = D.state || "submitted";
  return /* @__PURE__ */ d.jsx(
    $y,
    {
      className: "stemlab-timeline",
      laneControls: !0,
      wheelNavigation: !0,
      audioSrc: bt?.audioSrc || `/api/${c}/source`,
      lyricAudition: {
        artworkSrc: wt,
        artworkAlt: `${J.title || f} cover artwork`,
        audioLabel: bt?.title || "MASTER · uploaded source",
        items: ky(J, v.lyricItems ?? window.__stemlabStatic?.lyricItems ?? null)
      },
      duration: S,
      title: J.title || f,
      subtitle: c,
      loops: Wy(r.loops, it),
      lanes: et,
      grid: [..._t.grid, ...T.grid],
      beatClock: v.clock,
      showBeatGrid: v.gridVisible,
      onDurationChange: A,
      onWindowChange: (W) => {
        T.onWindowChange(W), v.onWindowChange(W);
      },
      onTimeChange: (W) => {
        T.onTimeChange(W), v.onTimeChange(W);
      },
      onPlaybackError: (W) => Jt("stderr", W instanceof Error ? W.message : String(W)),
      headerEnd: /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
        /* @__PURE__ */ d.jsxs("label", { className: "small stemlab-audition-channel", children: [
          "Audio channel ",
          /* @__PURE__ */ d.jsxs(
            "select",
            {
              "aria-label": "Audio channel",
              value: bt?.id || "__source__",
              onChange: (W) => b(W.target.value),
              children: [
                !I.length && /* @__PURE__ */ d.jsx("option", { value: "__source__", children: "MASTER · uploaded source" }),
                I.map((W) => /* @__PURE__ */ d.jsx("option", { value: W.id, children: W.title }, W.id))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ d.jsx("span", { className: `badge ${qt}`, children: qt }),
        /* @__PURE__ */ d.jsxs("span", { className: "small", children: [
          et.length,
          " lane",
          et.length === 1 ? "" : "s"
        ] })
      ] }),
      footer: /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
        /* @__PURE__ */ d.jsx(eb, { comparison: _t, onBasis: X, onAnalysis: Tt }),
        j && T.panel,
        j && v.panel,
        /* @__PURE__ */ d.jsx(Tb, { state: r, hash: c }),
        /* @__PURE__ */ d.jsx(wb, { lines: Bt }),
        /* @__PURE__ */ d.jsx("span", { className: "dock-links", children: /* @__PURE__ */ d.jsx("a", { href: "https://kieransimkin.co.uk/my-songs/", target: "_blank", rel: "noopener", children: "Kieran Simkin · My Songs ↗" }) })
      ] })
    }
  );
}
function Bb() {
  const c = S0?.value?.trim() || "", f = _0?.value || "", r = E0?.value || "";
  return { ...go, bpm: c ? Number(c) : null, lyrics: f.trim() || null, lyric_timing: r.trim() || [] };
}
function Hb(c) {
  return Number.isFinite(Number(c.bpm)) || !!c.lyrics || !!(typeof c.lyric_timing == "string" && c.lyric_timing.trim()) || !!(Array.isArray(c.lyric_timing) && c.lyric_timing.length);
}
async function Lb(c) {
  const f = Bb();
  if (!Hb(f)) return;
  const r = await fetch(`/api/${c}/canonical`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) }), s = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(s.detail || `Could not save canonical metadata (${r.status})`);
  vo.textContent = "Known information saved with this song hash.";
}
function Yb(c) {
  return new Promise((f, r) => {
    const s = new XMLHttpRequest();
    s.open("PUT", `/upload/${encodeURIComponent(c.name)}`), s.setRequestHeader("Content-Type", c.type || "application/octet-stream"), s.upload.onprogress = (m) => {
      p0.classList.remove("hidden");
      const h = m.lengthComputable ? m.loaded / m.total : 0;
      Ec.style.width = `${Math.round(h * 100)}%`, Tc.textContent = m.lengthComputable ? `${Math.round(h * 100)}% · ${(m.loaded / 1048576).toFixed(1)} / ${(m.total / 1048576).toFixed(1)} MiB` : `${(m.loaded / 1048576).toFixed(1)} MiB uploaded`;
    }, s.onerror = () => r(new Error("Upload failed")), s.onload = () => {
      let m = {};
      try {
        m = JSON.parse(s.responseText);
      } catch {
      }
      s.status < 200 || s.status >= 300 ? r(new Error(m.detail || `Upload failed (${s.status})`)) : f(m);
    }, s.send(c);
  });
}
async function N0(c, f) {
  Nb.classList.add("hidden"), So.classList.remove("hidden"), zb.render(/* @__PURE__ */ d.jsx(Ub, { hash: c, filename: f || "uploaded audio" }, c));
}
async function x0(c) {
  if (c) {
    Ec.style.width = "0%", Tc.textContent = `Uploading ${c.name}`, p0.classList.remove("hidden");
    try {
      const f = await Yb(c);
      Ec.style.width = "100%", Tc.textContent = "Upload complete · attaching to analysis", await Lb(f.hash), await N0(f.hash, f.filename || c.name);
    } catch (f) {
      Tc.textContent = f.message, Ec.style.width = "0%";
    }
  }
}
async function M0(c) {
  c?.preventDefault(), c?.stopPropagation();
  try {
    const f = await fetch("/assets/arcadians-reference.json", { cache: "no-store" });
    if (!f.ok) throw new Error(`Could not load Arcadians reference (${f.status})`);
    const r = await f.json();
    go = {};
    for (const s of ["title", "artist", "release_date", "isrc", "upc", "website", "my_songs_url", "epk_url", "cover_art_url", "source_url", "sections"])
      r[s] !== void 0 && r[s] !== null && (go[s] = r[s]);
    S0.value = r.bpm ?? "", _0.value = r.lyrics ?? "", E0.value = Array.isArray(r.lyric_timing) && r.lyric_timing.length ? JSON.stringify(r.lyric_timing, null, 2) : "", Me(".known-info").open = !0, vo.textContent = r.lyric_timing?.length ? `Loaded ${r.title || "Arcadians"}: canonical release metadata, sections, ${r.bpm} BPM, lyrics and timing.` : `Loaded ${r.title || "Arcadians"} canonical reference metadata.`;
  } catch (f) {
    vo.textContent = f.message;
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
for (const c of ["dragenter", "dragover"]) Fa.addEventListener(c, (f) => {
  f.preventDefault(), Fa.classList.add("dragging");
});
for (const c of ["dragleave", "drop"]) Fa.addEventListener(c, (f) => {
  f.preventDefault(), Fa.classList.remove("dragging");
});
Fa.addEventListener("drop", (c) => {
  x0(c.dataTransfer?.files?.[0]);
});
xb?.addEventListener("click", M0);
Mb?.addEventListener("click", M0);
const so = new URLSearchParams(location.search).get("hash");
so && /^[0-9a-f]{64}$/i.test(so) && N0(so.toLowerCase(), "Existing analysis");
export {
  _a as formatTimelineTime
};
