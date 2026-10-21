var ao = { exports: {} }, Vu = {};
var Zh;
function py() {
  if (Zh) return Vu;
  Zh = 1;
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
  return Vu.Fragment = f, Vu.jsx = r, Vu.jsxs = r, Vu;
}
var Kh;
function Sy() {
  return Kh || (Kh = 1, ao.exports = py()), ao.exports;
}
var d = Sy(), no = { exports: {} }, mt = {};
var Jh;
function _y() {
  if (Jh) return mt;
  Jh = 1;
  var c = /* @__PURE__ */ Symbol.for("react.transitional.element"), f = /* @__PURE__ */ Symbol.for("react.portal"), r = /* @__PURE__ */ Symbol.for("react.fragment"), s = /* @__PURE__ */ Symbol.for("react.strict_mode"), m = /* @__PURE__ */ Symbol.for("react.profiler"), h = /* @__PURE__ */ Symbol.for("react.consumer"), b = /* @__PURE__ */ Symbol.for("react.context"), S = /* @__PURE__ */ Symbol.for("react.forward_ref"), C = /* @__PURE__ */ Symbol.for("react.suspense"), A = /* @__PURE__ */ Symbol.for("react.memo"), E = /* @__PURE__ */ Symbol.for("react.lazy"), v = /* @__PURE__ */ Symbol.for("react.activity"), j = /* @__PURE__ */ Symbol.for("react.view_transition"), U = Symbol.iterator;
  function W(y) {
    return y === null || typeof y != "object" ? null : (y = U && y[U] || y["@@iterator"], typeof y == "function" ? y : null);
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
  }, k = Object.assign, ht = {};
  function q(y, R, Q) {
    this.props = y, this.context = R, this.refs = ht, this.updater = Q || L;
  }
  q.prototype.isReactComponent = {}, q.prototype.setState = function(y, R) {
    if (typeof y != "object" && typeof y != "function" && y != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, y, R, "setState");
  }, q.prototype.forceUpdate = function(y) {
    this.updater.enqueueForceUpdate(this, y, "forceUpdate");
  };
  function V() {
  }
  V.prototype = q.prototype;
  function Mt(y, R, Q) {
    this.props = y, this.context = R, this.refs = ht, this.updater = Q || L;
  }
  var it = Mt.prototype = new V();
  it.constructor = Mt, k(it, q.prototype), it.isPureReactComponent = !0;
  var Bt = Array.isArray;
  function Z() {
  }
  var ot = { H: null, A: null, T: null, S: null }, Jt = Object.prototype.hasOwnProperty;
  function ut(y, R, Q) {
    var P = Q.ref;
    return {
      $$typeof: c,
      type: y,
      key: R,
      ref: P !== void 0 ? P : null,
      props: Q
    };
  }
  function yt(y, R) {
    return ut(y.type, R, y.props);
  }
  function ft(y) {
    return typeof y == "object" && y !== null && y.$$typeof === c;
  }
  function Et(y) {
    var R = { "=": "=0", ":": "=2" };
    return "$" + y.replace(/[=:]/g, function(Q) {
      return R[Q];
    });
  }
  var Tt = /\/+/g;
  function jt(y, R) {
    return typeof y == "object" && y !== null && y.key != null ? Et("" + y.key) : R.toString(36);
  }
  function Y(y) {
    switch (y.status) {
      case "fulfilled":
        return y.value;
      case "rejected":
        throw y.reason;
      default:
        switch (typeof y.status == "string" ? y.then(Z, Z) : (y.status = "pending", y.then(
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
  function et(y, R, Q, P, gt) {
    var pt = typeof y;
    (pt === "undefined" || pt === "boolean") && (y = null);
    var dt = !1;
    if (y === null) dt = !0;
    else
      switch (pt) {
        case "bigint":
        case "string":
        case "number":
          dt = !0;
          break;
        case "object":
          switch (y.$$typeof) {
            case c:
            case f:
              dt = !0;
              break;
            case E:
              return dt = y._init, et(
                dt(y._payload),
                R,
                Q,
                P,
                gt
              );
          }
      }
    if (dt)
      return gt = gt(y), dt = P === "" ? "." + jt(y, 0) : P, Bt(gt) ? (Q = "", dt != null && (Q = dt.replace(Tt, "$&/") + "/"), et(gt, R, Q, "", function($t) {
        return $t;
      })) : gt != null && (ft(gt) && (gt = yt(
        gt,
        Q + (gt.key == null || y && y.key === gt.key ? "" : ("" + gt.key).replace(
          Tt,
          "$&/"
        ) + "/") + dt
      )), R.push(gt)), 1;
    dt = 0;
    var K = P === "" ? "." : P + ":";
    if (Bt(y))
      for (var lt = 0; lt < y.length; lt++)
        P = y[lt], pt = K + jt(P, lt), dt += et(
          P,
          R,
          Q,
          pt,
          gt
        );
    else if (lt = W(y), typeof lt == "function")
      for (y = lt.call(y), lt = 0; !(P = y.next()).done; )
        P = P.value, pt = K + jt(P, lt++), dt += et(
          P,
          R,
          Q,
          pt,
          gt
        );
    else if (pt === "object") {
      if (typeof y.then == "function")
        return et(
          Y(y),
          R,
          Q,
          P,
          gt
        );
      throw R = String(y), Error(
        "Objects are not valid as a React child (found: " + (R === "[object Object]" ? "object with keys {" + Object.keys(y).join(", ") + "}" : R) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return dt;
  }
  function I(y, R, Q) {
    if (y == null) return y;
    var P = [], gt = 0;
    return et(y, P, "", "", function(pt) {
      return R.call(Q, pt, gt++);
    }), P;
  }
  function bt(y) {
    if (y._status === -1) {
      var R = y._result, Q = R();
      Q.then(
        function(P) {
          (y._status === 0 || y._status === -1) && (y._status = 1, y._result = P, Q.status === void 0 && (Q.status = "fulfilled", Q.value = P));
        },
        function(P) {
          (y._status === 0 || y._status === -1) && (y._status = 2, y._result = P, Q.status === void 0 && (Q.status = "rejected", Q.reason = P));
        }
      ), y._status === -1 && (y._status = 0, y._result = Q);
    }
    if (y._status === 1) return y._result.default;
    throw y._result;
  }
  var rt = typeof reportError == "function" ? reportError : function(y) {
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
  function Dt(y) {
    var R = ot.T, Q = {};
    Q.types = R !== null ? R.types : null, ot.T = Q;
    try {
      var P = y(), gt = ot.S;
      gt !== null && gt(Q, P), typeof P == "object" && P !== null && typeof P.then == "function" && P.then(Z, rt);
    } catch (pt) {
      rt(pt);
    } finally {
      R !== null && Q.types !== null && (R.types = Q.types), ot.T = R;
    }
  }
  function Lt(y) {
    var R = ot.T;
    if (R !== null) {
      var Q = R.types;
      Q === null ? R.types = [y] : Q.indexOf(y) === -1 && Q.push(y);
    } else Dt(Lt.bind(null, y));
  }
  var F = {
    map: I,
    forEach: function(y, R, Q) {
      I(
        y,
        function() {
          R.apply(this, arguments);
        },
        Q
      );
    },
    count: function(y) {
      var R = 0;
      return I(y, function() {
        R++;
      }), R;
    },
    toArray: function(y) {
      return I(y, function(R) {
        return R;
      }) || [];
    },
    only: function(y) {
      if (!ft(y))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return y;
    }
  };
  return mt.Activity = v, mt.Children = F, mt.Component = q, mt.Fragment = r, mt.Profiler = m, mt.PureComponent = Mt, mt.StrictMode = s, mt.Suspense = C, mt.ViewTransition = j, mt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ot, mt.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(y) {
      return ot.H.useMemoCache(y);
    }
  }, mt.addTransitionType = Lt, mt.cache = function(y) {
    return function() {
      return y.apply(null, arguments);
    };
  }, mt.cacheSignal = function() {
    return null;
  }, mt.cloneElement = function(y, R, Q) {
    if (y == null)
      throw Error(
        "The argument must be a React element, but you passed " + y + "."
      );
    var P = k({}, y.props), gt = y.key;
    if (R != null)
      for (pt in R.key !== void 0 && (gt = "" + R.key), R)
        !Jt.call(R, pt) || pt === "key" || pt === "__self" || pt === "__source" || pt === "ref" && R.ref === void 0 || (P[pt] = R[pt]);
    var pt = arguments.length - 2;
    if (pt === 1) P.children = Q;
    else if (1 < pt) {
      for (var dt = Array(pt), K = 0; K < pt; K++)
        dt[K] = arguments[K + 2];
      P.children = dt;
    }
    return ut(y.type, gt, P);
  }, mt.createContext = function(y) {
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
  }, mt.createElement = function(y, R, Q) {
    var P, gt = {}, pt = null;
    if (R != null)
      for (P in R.key !== void 0 && (pt = "" + R.key), R)
        Jt.call(R, P) && P !== "key" && P !== "__self" && P !== "__source" && (gt[P] = R[P]);
    var dt = arguments.length - 2;
    if (dt === 1) gt.children = Q;
    else if (1 < dt) {
      for (var K = Array(dt), lt = 0; lt < dt; lt++)
        K[lt] = arguments[lt + 2];
      gt.children = K;
    }
    if (y && y.defaultProps)
      for (P in dt = y.defaultProps, dt)
        gt[P] === void 0 && (gt[P] = dt[P]);
    return ut(y, pt, gt);
  }, mt.createRef = function() {
    return { current: null };
  }, mt.forwardRef = function(y) {
    return { $$typeof: S, render: y };
  }, mt.isValidElement = ft, mt.lazy = function(y) {
    return {
      $$typeof: E,
      _payload: { _status: -1, _result: y },
      _init: bt
    };
  }, mt.memo = function(y, R) {
    return {
      $$typeof: A,
      type: y,
      compare: R === void 0 ? null : R
    };
  }, mt.startTransition = Dt, mt.unstable_useCacheRefresh = function() {
    return ot.H.useCacheRefresh();
  }, mt.use = function(y) {
    return ot.H.use(y);
  }, mt.useActionState = function(y, R, Q) {
    return ot.H.useActionState(y, R, Q);
  }, mt.useCallback = function(y, R) {
    return ot.H.useCallback(y, R);
  }, mt.useContext = function(y) {
    return ot.H.useContext(y);
  }, mt.useDebugValue = function() {
  }, mt.useDeferredValue = function(y, R) {
    return ot.H.useDeferredValue(y, R);
  }, mt.useEffect = function(y, R) {
    return ot.H.useEffect(y, R);
  }, mt.useEffectEvent = function(y) {
    return ot.H.useEffectEvent(y);
  }, mt.useId = function() {
    return ot.H.useId();
  }, mt.useImperativeHandle = function(y, R, Q) {
    return ot.H.useImperativeHandle(y, R, Q);
  }, mt.useInsertionEffect = function(y, R) {
    return ot.H.useInsertionEffect(y, R);
  }, mt.useLayoutEffect = function(y, R) {
    return ot.H.useLayoutEffect(y, R);
  }, mt.useMemo = function(y, R) {
    return ot.H.useMemo(y, R);
  }, mt.useOptimistic = function(y, R) {
    return ot.H.useOptimistic(y, R);
  }, mt.useReducer = function(y, R, Q) {
    return ot.H.useReducer(y, R, Q);
  }, mt.useRef = function(y) {
    return ot.H.useRef(y);
  }, mt.useState = function(y) {
    return ot.H.useState(y);
  }, mt.useSyncExternalStore = function(y, R, Q) {
    return ot.H.useSyncExternalStore(
      y,
      R,
      Q
    );
  }, mt.useTransition = function() {
    return ot.H.useTransition();
  }, mt.version = "19.3.0", mt;
}
var $h;
function So() {
  return $h || ($h = 1, no.exports = _y()), no.exports;
}
var D = So(), uo = { exports: {} }, Qu = {}, io = { exports: {} }, co = {};
var kh;
function Ey() {
  return kh || (kh = 1, (function(c) {
    function f(Y, et) {
      var I = Y.length;
      Y.push(et);
      t: for (; 0 < I; ) {
        var bt = I - 1 >>> 1, rt = Y[bt];
        if (0 < m(rt, et))
          Y[bt] = et, Y[I] = rt, I = bt;
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
        t: for (var bt = 0, rt = Y.length, Dt = rt >>> 1; bt < Dt; ) {
          var Lt = 2 * (bt + 1) - 1, F = Y[Lt], y = Lt + 1, R = Y[y];
          if (0 > m(F, I))
            y < rt && 0 > m(R, F) ? (Y[bt] = R, Y[y] = I, bt = y) : (Y[bt] = F, Y[Lt] = I, bt = Lt);
          else if (y < rt && 0 > m(R, I))
            Y[bt] = R, Y[y] = I, bt = y;
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
    var C = [], A = [], E = 1, v = null, j = 3, U = !1, W = !1, L = !1, k = !1, ht = typeof setTimeout == "function" ? setTimeout : null, q = typeof clearTimeout == "function" ? clearTimeout : null, V = typeof setImmediate < "u" ? setImmediate : null;
    function Mt(Y) {
      for (var et = r(A); et !== null; ) {
        if (et.callback === null) s(A);
        else if (et.startTime <= Y)
          s(A), et.sortIndex = et.expirationTime, f(C, et);
        else break;
        et = r(A);
      }
    }
    function it(Y) {
      if (L = !1, Mt(Y), !W)
        if (r(C) !== null)
          W = !0, Bt || (Bt = !0, ft());
        else {
          var et = r(A);
          et !== null && jt(it, et.startTime - Y);
        }
    }
    var Bt = !1, Z = -1, ot = 5, Jt = -1;
    function ut() {
      return k ? !0 : !(c.unstable_now() - Jt < ot);
    }
    function yt() {
      if (k = !1, Bt) {
        var Y = c.unstable_now();
        Jt = Y;
        var et = !0;
        try {
          t: {
            W = !1, L && (L = !1, q(Z), Z = -1), U = !0;
            var I = j;
            try {
              e: {
                for (Mt(Y), v = r(C); v !== null && !(v.expirationTime > Y && ut()); ) {
                  var bt = v.callback;
                  if (typeof bt == "function") {
                    v.callback = null, j = v.priorityLevel;
                    var rt = bt(
                      v.expirationTime <= Y
                    );
                    if (Y = c.unstable_now(), typeof rt == "function") {
                      v.callback = rt, Mt(Y), et = !0;
                      break e;
                    }
                    v === r(C) && s(C), Mt(Y);
                  } else s(C);
                  v = r(C);
                }
                if (v !== null) et = !0;
                else {
                  var Dt = r(A);
                  Dt !== null && jt(
                    it,
                    Dt.startTime - Y
                  ), et = !1;
                }
              }
              break t;
            } finally {
              v = null, j = I, U = !1;
            }
            et = void 0;
          }
        } finally {
          et ? ft() : Bt = !1;
        }
      }
    }
    var ft;
    if (typeof V == "function")
      ft = function() {
        V(yt);
      };
    else if (typeof MessageChannel < "u") {
      var Et = new MessageChannel(), Tt = Et.port2;
      Et.port1.onmessage = yt, ft = function() {
        Tt.postMessage(null);
      };
    } else
      ft = function() {
        ht(yt, 0);
      };
    function jt(Y, et) {
      Z = ht(function() {
        Y(c.unstable_now());
      }, et);
    }
    c.unstable_IdlePriority = 5, c.unstable_ImmediatePriority = 1, c.unstable_LowPriority = 4, c.unstable_NormalPriority = 3, c.unstable_Profiling = null, c.unstable_UserBlockingPriority = 2, c.unstable_cancelCallback = function(Y) {
      Y.callback = null;
    }, c.unstable_forceFrameRate = function(Y) {
      0 > Y || 125 < Y ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : ot = 0 < Y ? Math.floor(1e3 / Y) : 5;
    }, c.unstable_getCurrentPriorityLevel = function() {
      return j;
    }, c.unstable_next = function(Y) {
      switch (j) {
        case 1:
        case 2:
        case 3:
          var et = 3;
          break;
        default:
          et = j;
      }
      var I = j;
      j = et;
      try {
        return Y();
      } finally {
        j = I;
      }
    }, c.unstable_requestPaint = function() {
      k = !0;
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
      var I = j;
      j = Y;
      try {
        return et();
      } finally {
        j = I;
      }
    }, c.unstable_scheduleCallback = function(Y, et, I) {
      var bt = c.unstable_now();
      switch (typeof I == "object" && I !== null ? (I = I.delay, I = typeof I == "number" && 0 < I ? bt + I : bt) : I = bt, Y) {
        case 1:
          var rt = -1;
          break;
        case 2:
          rt = 250;
          break;
        case 5:
          rt = 1073741823;
          break;
        case 4:
          rt = 1e4;
          break;
        default:
          rt = 5e3;
      }
      return rt = I + rt, Y = {
        id: E++,
        callback: et,
        priorityLevel: Y,
        startTime: I,
        expirationTime: rt,
        sortIndex: -1
      }, I > bt ? (Y.sortIndex = I, f(A, Y), r(C) === null && Y === r(A) && (L ? (q(Z), Z = -1) : L = !0, jt(it, I - bt))) : (Y.sortIndex = rt, f(C, Y), W || U || (W = !0, Bt || (Bt = !0, ft()))), Y;
    }, c.unstable_shouldYield = ut, c.unstable_wrapCallback = function(Y) {
      var et = j;
      return function() {
        var I = j;
        j = et;
        try {
          return Y.apply(this, arguments);
        } finally {
          j = I;
        }
      };
    };
  })(co)), co;
}
var Fh;
function Ty() {
  return Fh || (Fh = 1, io.exports = Ey()), io.exports;
}
var so = { exports: {} }, xe = {};
var Wh;
function Ny() {
  if (Wh) return xe;
  Wh = 1;
  var c = So();
  function f(E) {
    var v = "https://react.dev/errors/" + E;
    if (1 < arguments.length) {
      v += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var j = 2; j < arguments.length; j++)
        v += "&args[]=" + encodeURIComponent(arguments[j]);
    }
    return "Minified React error #" + E + "; visit " + v + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
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
  function S(E, v, j) {
    var U = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: m,
      key: U == null ? null : U === b ? b : "" + U,
      children: E,
      containerInfo: v,
      implementation: j
    };
  }
  var C = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function A(E, v) {
    if (E === "font") return "";
    if (typeof v == "string")
      return v === "use-credentials" ? v : "";
  }
  return xe.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, xe.browser = function(E) {
    return { $$typeof: h, _reason: E };
  }, xe.createPortal = function(E, v) {
    var j = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!v || v.nodeType !== 1 && v.nodeType !== 9 && v.nodeType !== 11)
      throw Error(f(299));
    return S(E, v, null, j);
  }, xe.flushSync = function(E) {
    var v = C.T, j = s.p;
    try {
      if (C.T = null, s.p = 2, E) return E();
    } finally {
      C.T = v, s.p = j, s.d.f();
    }
  }, xe.preconnect = function(E, v) {
    typeof E == "string" && (v ? (v = v.crossOrigin, v = typeof v == "string" ? v === "use-credentials" ? v : "" : void 0) : v = null, s.d.C(E, v));
  }, xe.prefetchDNS = function(E) {
    typeof E == "string" && s.d.D(E);
  }, xe.preinit = function(E, v) {
    if (typeof E == "string" && v && typeof v.as == "string") {
      var j = v.as, U = A(j, v.crossOrigin), W = typeof v.integrity == "string" ? v.integrity : void 0, L = typeof v.fetchPriority == "string" ? v.fetchPriority : void 0;
      j === "style" ? s.d.S(
        E,
        typeof v.precedence == "string" ? v.precedence : void 0,
        {
          crossOrigin: U,
          integrity: W,
          fetchPriority: L
        }
      ) : j === "script" && s.d.X(E, {
        crossOrigin: U,
        integrity: W,
        fetchPriority: L,
        nonce: typeof v.nonce == "string" ? v.nonce : void 0
      });
    }
  }, xe.preinitModule = function(E, v) {
    if (typeof E == "string")
      if (typeof v == "object" && v !== null) {
        if (v.as == null || v.as === "script") {
          var j = A(
            v.as,
            v.crossOrigin
          );
          s.d.M(E, {
            crossOrigin: j,
            integrity: typeof v.integrity == "string" ? v.integrity : void 0,
            nonce: typeof v.nonce == "string" ? v.nonce : void 0,
            fetchPriority: typeof v.fetchPriority == "string" ? v.fetchPriority : void 0
          });
        }
      } else v == null && s.d.M(E);
  }, xe.preload = function(E, v) {
    if (typeof E == "string" && typeof v == "object" && v !== null && typeof v.as == "string") {
      var j = v.as, U = A(j, v.crossOrigin);
      s.d.L(E, j, {
        crossOrigin: U,
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
  }, xe.preloadModule = function(E, v) {
    if (typeof E == "string")
      if (v) {
        var j = A(v.as, v.crossOrigin);
        s.d.m(E, {
          as: typeof v.as == "string" && v.as !== "script" ? v.as : void 0,
          crossOrigin: j,
          integrity: typeof v.integrity == "string" ? v.integrity : void 0,
          nonce: typeof v.nonce == "string" ? v.nonce : void 0,
          fetchPriority: typeof v.fetchPriority == "string" ? v.fetchPriority : void 0
        });
      } else s.d.m(E);
  }, xe.requestFormReset = function(E) {
    s.d.r(E);
  }, xe.unstable_batchedUpdates = function(E, v) {
    return E(v);
  }, xe.useFormState = function(E, v, j) {
    return C.H.useFormState(E, v, j);
  }, xe.useFormStatus = function() {
    return C.H.useHostTransitionStatus();
  }, xe.version = "19.3.0", xe;
}
var Ih;
function xy() {
  if (Ih) return so.exports;
  Ih = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (f) {
        console.error(f);
      }
  }
  return c(), so.exports = Ny(), so.exports;
}
var Ph;
function My() {
  if (Ph) return Qu;
  Ph = 1;
  var c = Ty(), f = So(), r = xy();
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
  function C(t) {
    if (h(t) !== t)
      throw Error(s(188));
  }
  function A(t) {
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
          if (u === l) return C(n), t;
          if (u === a) return C(n), e;
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
  function E(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (e = E(t), e !== null) return e;
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
  function j(t) {
    for (t = t.return; t !== null; ) {
      if (t.tag === 3 || t.tag === 5 || t.tag === 27) return t;
      t = t.return;
    }
    return null;
  }
  function U(t) {
    var e = !1;
    for (t = t.return; t !== null && (t.tag === 4 && (e = !0), !(t.tag === 3 || t.tag === 5 || t.tag === 27)); )
      t = t.return;
    return e;
  }
  function W(t) {
    var e = [null, null], l = j(t);
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
  var ht = null, q = null;
  function V(t, e, l) {
    return t === l ? !0 : t === e ? (ht = t, !0) : !1;
  }
  function Mt(t, e, l) {
    return t === l ? (q = t, !1) : t === e ? (q !== null && (ht = t), !0) : !1;
  }
  function it(t) {
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
  var Z = Object.assign, ot = /* @__PURE__ */ Symbol.for("react.element"), Jt = /* @__PURE__ */ Symbol.for("react.transitional.element"), ut = /* @__PURE__ */ Symbol.for("react.portal"), yt = /* @__PURE__ */ Symbol.for("react.fragment"), ft = /* @__PURE__ */ Symbol.for("react.strict_mode"), Et = /* @__PURE__ */ Symbol.for("react.profiler"), Tt = /* @__PURE__ */ Symbol.for("react.consumer"), jt = /* @__PURE__ */ Symbol.for("react.context"), Y = /* @__PURE__ */ Symbol.for("react.forward_ref"), et = /* @__PURE__ */ Symbol.for("react.suspense"), I = /* @__PURE__ */ Symbol.for("react.suspense_list"), bt = /* @__PURE__ */ Symbol.for("react.memo"), rt = /* @__PURE__ */ Symbol.for("react.lazy"), Dt = /* @__PURE__ */ Symbol.for("react.activity"), Lt = /* @__PURE__ */ Symbol.for("react.legacy_hidden"), F = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), y = /* @__PURE__ */ Symbol.for("react.view_transition"), R = /* @__PURE__ */ Symbol.for("react.recoverable"), Q = Symbol.iterator;
  function P(t) {
    return t === null || typeof t != "object" ? null : (t = Q && t[Q] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var gt = /* @__PURE__ */ Symbol.for("react.client.reference");
  function pt(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === gt ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case yt:
        return "Fragment";
      case Et:
        return "Profiler";
      case ft:
        return "StrictMode";
      case et:
        return "Suspense";
      case I:
        return "SuspenseList";
      case Dt:
        return "Activity";
      case y:
        return "ViewTransition";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case ut:
          return "Portal";
        case jt:
          return t.displayName || "Context";
        case Tt:
          return (t._context.displayName || "Context") + ".Consumer";
        case Y:
          var e = t.render;
          return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case bt:
          return e = t.displayName || null, e !== null ? e : pt(t.type) || "Memo";
        case rt:
          e = t._payload, t = t._init;
          try {
            return pt(t(e));
          } catch {
          }
      }
    return null;
  }
  var dt = Array.isArray, K = f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, lt = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, $t = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, Ol = [], ie = -1;
  function Xt(t) {
    return { current: t };
  }
  function vt(t) {
    0 > ie || (t.current = Ol[ie], Ol[ie] = null, ie--);
  }
  function Nt(t, e) {
    ie++, Ol[ie] = t.current, t.current = e;
  }
  var G = Xt(null), at = Xt(null), Ot = Xt(null), Re = Xt(null);
  function fe(t, e) {
    switch (Nt(Ot, e), Nt(at, t), Nt(G, null), e.nodeType) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? th(t) : 0;
        break;
      default:
        if (t = e.tagName, e = e.namespaceURI)
          e = th(e), t = eh(e, t);
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
    vt(G), Nt(G, t);
  }
  function Ht() {
    vt(G), vt(at), vt(Ot);
  }
  function zl(t) {
    var e = t.memoizedState;
    e !== null && (Qn._currentValue = e.memoizedState, Nt(Re, t)), e = G.current;
    var l = eh(e, t.type);
    e !== l && (Nt(at, t), Nt(G, l));
  }
  function Kl(t) {
    at.current === t && (vt(G), vt(at)), Re.current === t && (vt(Re), Qn._currentValue = $t);
  }
  var Al, Na;
  function we(t) {
    if (Al === void 0)
      try {
        throw Error();
      } catch (l) {
        var e = l.stack.trim().match(/\n( *(at )?)/);
        Al = e && e[1] || "", Na = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Al + t + Na;
  }
  var xa = !1;
  function Cl(t, e) {
    if (!t || xa) return "";
    xa = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (e) {
              var H = function() {
                throw Error();
              };
              if (Object.defineProperty(H.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(H, []);
                } catch (X) {
                  var _ = X;
                }
                Reflect.construct(t, [], H);
              } else {
                try {
                  H.call();
                } catch (X) {
                  _ = X;
                }
                H = !1;
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
                  }), H = !0, new t();
                } finally {
                  H && (O !== void 0 ? Object.defineProperty(t.prototype, "props", O) : delete t.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (X) {
                _ = X;
              }
              (H = t()) && typeof H.catch == "function" && H.catch(function() {
              });
            }
          } catch (X) {
            if (X && _ && typeof X.stack == "string")
              return [X.stack, _.stack];
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
      xa = !1, Error.prepareStackTrace = l;
    }
    return (l = t ? t.displayName || t.name : "") ? we(l) : "";
  }
  function hl(t, e) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return we(t.type);
      case 16:
        return we("Lazy");
      case 13:
        return t.child !== e && e !== null ? we("Suspense Fallback") : we("Suspense");
      case 19:
        return we("SuspenseList");
      case 0:
      case 15:
        return Cl(t.type, !1);
      case 11:
        return Cl(t.type.render, !1);
      case 1:
        return Cl(t.type, !0);
      case 31:
        return we("Activity");
      case 30:
        return we("ViewTransition");
      default:
        return "";
    }
  }
  function Ma(t) {
    try {
      var e = "", l = null;
      do
        e += hl(t, l), l = t, t = t.return;
      while (t);
      return e;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var w = Object.prototype.hasOwnProperty, ct = c.unstable_scheduleCallback, zt = c.unstable_cancelCallback, me = c.unstable_shouldYield, he = c.unstable_requestPaint, kt = c.unstable_now, x = c.unstable_getCurrentPriorityLevel, J = c.unstable_ImmediatePriority, Vt = c.unstable_UserBlockingPriority, te = c.unstable_NormalPriority, Oa = c.unstable_LowPriority, Jl = c.unstable_IdlePriority, kn = c.log, A0 = c.unstable_setDisableYieldValue, Fn = null, qe = null;
  function $l(t) {
    if (typeof kn == "function" && A0(t), qe && typeof qe.setStrictMode == "function")
      try {
        qe.setStrictMode(Fn, t);
      } catch {
      }
  }
  var Ge = Math.clz32 ? Math.clz32 : R0, C0 = Math.log, j0 = Math.LN2;
  function R0(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (C0(t) / j0 | 0) | 0;
  }
  var Wu = 256, Iu = 262144, Pu = 4194304;
  function za(t) {
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
  function ti(t, e, l) {
    var a = t.pendingLanes;
    if (a === 0) return 0;
    var n = 0, u = t.suspendedLanes, i = t.pingedLanes;
    t = t.warmLanes;
    var o = a & 134217727;
    return o !== 0 ? (a = o & ~u, a !== 0 ? n = za(a) : (i &= o, i !== 0 ? n = za(i) : l || (l = o & ~t, l !== 0 && (n = za(l))))) : (o = a & ~u, o !== 0 ? n = za(o) : i !== 0 ? n = za(i) : l || (l = a & ~t, l !== 0 && (n = za(l)))), n === 0 ? 0 : e !== 0 && e !== n && (e & u) === 0 && (u = n & -n, l = e & -e, u >= l || u === 32 && (l & 4194048) !== 0) ? e : n;
  }
  function Wn(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function xo(t, e) {
    (e & 8) !== 0 && (e |= e & 32);
    var l = t.entangledLanes;
    if (l !== 0)
      for (t = t.entanglements, l &= e; 0 < l; ) {
        var a = 31 - Ge(l), n = 1 << a;
        e |= t[a], l &= ~n;
      }
    return e;
  }
  function w0(t, e) {
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
  function Mo() {
    var t = Pu;
    return Pu <<= 1, (Pu & 62914560) === 0 && (Pu = 4194304), t;
  }
  function Cc(t) {
    for (var e = [], l = 0; 31 > l; l++) e.push(t);
    return e;
  }
  function In(t, e) {
    t.pendingLanes |= e, e !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function D0(t, e, l, a, n, u) {
    var i = t.pendingLanes;
    t.pendingLanes = l, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= l, t.entangledLanes &= l, t.errorRecoveryDisabledLanes &= l, t.shellSuspendCounter = 0;
    var o = t.entanglements, g = t.expirationTimes, N = t.hiddenUpdates;
    for (l = i & ~l; 0 < l; ) {
      var z = 31 - Ge(l), H = 1 << z;
      o[z] = 0, g[z] = -1;
      var _ = N[z];
      if (_ !== null)
        for (N[z] = null, z = 0; z < _.length; z++) {
          var O = _[z];
          O !== null && (O.lane &= -536870913);
        }
      l &= ~H;
    }
    a !== 0 && Oo(t, a, 0), u !== 0 && n === 0 && t.tag !== 0 && (t.suspendedLanes |= u & ~(i & ~e));
  }
  function Oo(t, e, l) {
    t.pendingLanes |= e, t.suspendedLanes &= ~e;
    var a = 31 - Ge(e);
    t.entangledLanes |= e, t.entanglements[a] = t.entanglements[a] | 1073741824 | l & 261930;
  }
  function zo(t, e) {
    var l = t.entangledLanes |= e;
    for (t = t.entanglements; l; ) {
      var a = 31 - Ge(l), n = 1 << a;
      n & e | t[a] & e && (t[a] |= e), l &= ~n;
    }
  }
  function Ao(t, e) {
    var l = e & -e;
    return l = (l & 42) !== 0 ? 1 : jc(l), (l & (t.suspendedLanes | e)) !== 0 ? 0 : l;
  }
  function jc(t) {
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
  function Rc(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Co() {
    var t = lt.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : Lh(t.type));
  }
  function jo(t, e) {
    var l = lt.p;
    try {
      return lt.p = t, e();
    } finally {
      lt.p = l;
    }
  }
  var jl = Math.random().toString(36).slice(2), pe = "__reactFiber$" + jl, De = "__reactProps$" + jl, an = "__reactContainer$" + jl, Ro = "__reactEvents$" + jl, U0 = "__reactListeners$" + jl, B0 = "__reactHandles$" + jl, wo = "__reactResources$" + jl, Pn = "__reactMarker$" + jl, ei = "__reactLoad$" + jl;
  function li(t) {
    delete t[pe], delete t[De], delete t[U0], delete t[B0];
  }
  function Aa(t) {
    var e;
    if (e = t[pe]) return e;
    for (var l = t.parentNode; l; ) {
      if (e = l[an] || l[pe]) {
        if (l = e.alternate, e.child !== null || l !== null && l.child !== null)
          for (t = bh(t); t !== null; ) {
            if (l = t[pe]) return l;
            t = bh(t);
          }
        return e;
      }
      t = l, l = t.parentNode;
    }
    return null;
  }
  function nn(t) {
    if (t = t[pe] || t[an]) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3)
        return t;
    }
    return null;
  }
  function tu(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(s(33));
  }
  function un(t) {
    var e = t[wo];
    return e || (e = t[wo] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), e;
  }
  function ve(t) {
    t[Pn] = !0;
  }
  function Do(t) {
    t[ei] = void 0;
  }
  var Uo = /* @__PURE__ */ new Set(), Bo = {};
  function Ca(t, e) {
    cn(t, e), cn(t + "Capture", e);
  }
  function cn(t, e) {
    for (Bo[t] = e, t = 0; t < e.length; t++)
      Uo.add(e[t]);
  }
  var H0 = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Ho = {}, Lo = {};
  function L0(t) {
    return w.call(Lo, t) ? !0 : w.call(Ho, t) ? !1 : H0.test(t) ? Lo[t] = !0 : (Ho[t] = !0, !1);
  }
  var Yt = !1;
  function Yo() {
    var t = Yt;
    return Yt = !1, t;
  }
  function ai(t, e, l) {
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
  function ni(t, e, l) {
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
  function Rl(t, e, l, a) {
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
  function Xe(t) {
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
  function qo(t) {
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
  function wc(t) {
    if (!t._valueTracker) {
      var e = qo(t) ? "checked" : "value";
      t._valueTracker = Y0(
        t,
        e,
        "" + t[e]
      );
    }
  }
  function Go(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var l = e.getValue(), a = "";
    return t && (a = qo(t) ? t.checked ? "true" : "false" : t.value), t = a, t !== l ? (e.setValue(t), !0) : !1;
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
  function Dc(t, e, l, a, n, u, i, o) {
    t.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? t.type = i : t.removeAttribute("type"), e != null ? i === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + Xe(e)) : t.value !== "" + Xe(e) && (t.value = "" + Xe(e)) : i !== "submit" && i !== "reset" || t.removeAttribute("value"), e != null ? i === "number" && t.value == e ? Uc(t, Xe(t.value)) : Uc(t, Xe(e)) : l != null ? Uc(t, Xe(l)) : a != null && t.removeAttribute("value"), n == null && u != null && (t.defaultChecked = !!u), n != null && (t.checked = n && typeof n != "function" && typeof n != "symbol"), o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? t.name = "" + Xe(o) : t.removeAttribute("name");
  }
  function Xo(t, e, l, a, n, u, i, o) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (t.type = u), e != null || l != null) {
      if (!(u !== "submit" && u !== "reset" || e != null)) {
        wc(t);
        return;
      }
      l = l != null ? "" + Xe(l) : "", e = e != null ? "" + Xe(e) : l, o || e === t.value || (t.value = e), t.defaultValue = e;
    }
    a = a ?? n, a = typeof a != "function" && typeof a != "symbol" && !!a, t.checked = o ? t.checked : !!a, t.defaultChecked = !!a, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (t.name = i), wc(t);
  }
  function Uc(t, e) {
    t.defaultValue !== "" + e && (t.defaultValue = "" + e);
  }
  function sn(t, e, l, a) {
    if (t = t.options, e) {
      e = {};
      for (var n = 0; n < l.length; n++)
        e["$" + l[n]] = !0;
      for (l = 0; l < t.length; l++)
        n = e.hasOwnProperty("$" + t[l].value), t[l].selected !== n && (t[l].selected = n), n && a && (t[l].defaultSelected = !0);
    } else {
      for (l = "" + Xe(l), e = null, n = 0; n < t.length; n++) {
        if (t[n].value === l) {
          t[n].selected = !0, a && (t[n].defaultSelected = !0);
          return;
        }
        e !== null || t[n].disabled || (e = t[n]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function Vo(t, e, l) {
    if (e != null && (e = "" + Xe(e), e !== t.value && (t.value = e), l == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = l != null ? "" + Xe(l) : "";
  }
  function Qo(t, e, l, a) {
    if (e == null) {
      if (a != null) {
        if (l != null) throw Error(s(92));
        if (dt(a)) {
          if (1 < a.length) throw Error(s(93));
          a = a[0];
        }
        l = a;
      }
      l == null && (l = ""), e = l;
    }
    l = Xe(e), t.defaultValue = l, a = t.textContent, a === l && a !== "" && a !== null && (t.value = a), wc(t);
  }
  function rn(t, e) {
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
  function Zo(t, e, l) {
    var a = e.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? a ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "" : a ? t.setProperty(e, l) : typeof l != "number" || l === 0 || G0.has(e) ? e === "float" ? t.cssFloat = l : t[e] = ("" + l).trim() : t[e] = l + "px";
  }
  function Ko(t, e, l) {
    if (e != null && typeof e != "object")
      throw Error(s(62));
    if (t = t.style, l != null) {
      for (var a in l)
        !l.hasOwnProperty(a) || e != null && e.hasOwnProperty(a) || (a.indexOf("--") === 0 ? t.setProperty(a, "") : a === "float" ? t.cssFloat = "" : t[a] = "", Yt = !0);
      for (var n in e)
        a = e[n], e.hasOwnProperty(n) && l[n] !== a && (Zo(t, n, a), Yt = !0);
    } else
      for (var u in e)
        e.hasOwnProperty(u) && Zo(t, u, e[u]);
  }
  function Bc(t) {
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
  function ui(t) {
    return V0.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function vl() {
  }
  var Hc = null;
  function Lc(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var on = null, fn = null;
  function Jo(t) {
    var e = nn(t);
    if (e && (t = e.stateNode)) {
      var l = t[De] || null;
      t: switch (t = e.stateNode, e.type) {
        case "input":
          if (Dc(
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
                Dc(
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
              a = l[e], a.form === t.form && Go(a);
          }
          break t;
        case "textarea":
          Vo(t, l.value, l.defaultValue);
          break t;
        case "select":
          e = l.value, e != null && sn(t, !!l.multiple, e, !1);
      }
    }
  }
  var Yc = !1;
  function $o(t, e, l) {
    if (Yc) return t(e, l);
    Yc = !0;
    try {
      var a = t(e);
      return a;
    } finally {
      if (Yc = !1, (on !== null || fn !== null) && (uc(), on && (e = on, t = fn, fn = on = null, Jo(e), t)))
        for (e = 0; e < t.length; e++) Jo(t[e]);
    }
  }
  function eu(t, e) {
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
  var wl = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), qc = !1;
  if (wl)
    try {
      var lu = {};
      Object.defineProperty(lu, "passive", {
        get: function() {
          qc = !0;
        }
      }), window.addEventListener("test", lu, lu), window.removeEventListener("test", lu, lu);
    } catch {
      qc = !1;
    }
  var kl = null, Gc = null, ii = null;
  function ko() {
    if (ii) return ii;
    var t, e = Gc, l = e.length, a, n = "value" in kl ? kl.value : kl.textContent, u = n.length;
    for (t = 0; t < l && e[t] === n[t]; t++) ;
    var i = l - t;
    for (a = 1; a <= i && e[l - a] === n[u - a]; a++) ;
    return ii = n.slice(t, 1 < a ? 1 - a : void 0);
  }
  function ci(t) {
    var e = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function si() {
    return !0;
  }
  function Fo() {
    return !1;
  }
  function ze(t) {
    function e(l, a, n, u, i) {
      this._reactName = l, this._targetInst = n, this.type = a, this.nativeEvent = u, this.target = i, this.currentTarget = null;
      for (var o in t)
        t.hasOwnProperty(o) && (l = t[o], this[o] = l ? l(u) : u[o]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? si : Fo, this.isPropagationStopped = Fo, this;
    }
    return Z(e.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = si);
      },
      stopPropagation: function() {
        var l = this.nativeEvent;
        l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = si);
      },
      persist: function() {
      },
      isPersistent: si
    }), e;
  }
  var Fl = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, ri = ze(Fl), au = Z({}, Fl, { view: 0, detail: 0 }), Q0 = ze(au), Xc, Vc, nu, oi = Z({}, au, {
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
    getModifierState: Zc,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== nu && (nu && t.type === "mousemove" ? (Xc = t.screenX - nu.screenX, Vc = t.screenY - nu.screenY) : Vc = Xc = 0, nu = t), Xc);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : Vc;
    }
  }), Wo = ze(oi), Z0 = Z({}, oi, { dataTransfer: 0 }), K0 = ze(Z0), J0 = Z({}, au, { relatedTarget: 0 }), Qc = ze(J0), $0 = Z({}, Fl, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), k0 = ze($0), F0 = Z({}, Fl, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), W0 = ze(F0), I0 = Z({}, Fl, { data: 0 }), Io = ze(I0), P0 = {
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
  function Zc() {
    return lv;
  }
  var av = Z({}, au, {
    key: function(t) {
      if (t.key) {
        var e = P0[t.key] || t.key;
        if (e !== "Unidentified") return e;
      }
      return t.type === "keypress" ? (t = ci(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? tv[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Zc,
    charCode: function(t) {
      return t.type === "keypress" ? ci(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? ci(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), nv = ze(av), uv = Z({}, oi, {
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
  }), Po = ze(uv), iv = Z({}, Fl, { submitter: 0 }), cv = ze(iv), sv = Z({}, au, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Zc
  }), rv = ze(sv), ov = Z({}, Fl, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), fv = ze(ov), dv = Z({}, oi, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), mv = ze(dv), hv = Z({}, Fl, {
    newState: 0,
    oldState: 0,
    source: 0
  }), vv = ze(hv), gv = [9, 13, 27, 32], Kc = wl && "CompositionEvent" in window, uu = null;
  wl && "documentMode" in document && (uu = document.documentMode);
  var yv = wl && "TextEvent" in window && !uu, tf = wl && (!Kc || uu && 8 < uu && 11 >= uu), ef = " ", lf = !1;
  function af(t, e) {
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
  function nf(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var dn = !1;
  function bv(t, e) {
    switch (t) {
      case "compositionend":
        return nf(e);
      case "keypress":
        return e.which !== 32 ? null : (lf = !0, ef);
      case "textInput":
        return t = e.data, t === ef && lf ? null : t;
      default:
        return null;
    }
  }
  function pv(t, e) {
    if (dn)
      return t === "compositionend" || !Kc && af(t, e) ? (t = ko(), ii = Gc = kl = null, dn = !1, t) : null;
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
        return tf && e.locale !== "ko" ? null : e.data;
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
  function uf(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === "input" ? !!Sv[t.type] : e === "textarea";
  }
  function cf(t, e, l, a) {
    on ? fn ? fn.push(a) : fn = [a] : on = a, e = fc(e, "onChange"), 0 < e.length && (l = new ri(
      "onChange",
      "change",
      null,
      l,
      a
    ), t.push({ event: l, listeners: e }));
  }
  var iu = null, cu = null;
  function _v(t) {
    $m(t, 0);
  }
  function fi(t) {
    var e = tu(t);
    if (Go(e)) return t;
  }
  function sf(t, e) {
    if (t === "change") return e;
  }
  var rf = !1;
  if (wl) {
    var Jc;
    if (wl) {
      var $c = "oninput" in document;
      if (!$c) {
        var of = document.createElement("div");
        of.setAttribute("oninput", "return;"), $c = typeof of.oninput == "function";
      }
      Jc = $c;
    } else Jc = !1;
    rf = Jc && (!document.documentMode || 9 < document.documentMode);
  }
  function ff() {
    iu && (iu.detachEvent("onpropertychange", df), cu = iu = null);
  }
  function df(t) {
    if (t.propertyName === "value" && fi(cu)) {
      var e = [];
      cf(
        e,
        cu,
        t,
        Lc(t)
      ), $o(_v, e);
    }
  }
  function Ev(t, e, l) {
    t === "focusin" ? (ff(), iu = e, cu = l, iu.attachEvent("onpropertychange", df)) : t === "focusout" && ff();
  }
  function Tv(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return fi(cu);
  }
  function Nv(t, e) {
    if (t === "click") return fi(e);
  }
  function xv(t, e) {
    if (t === "input" || t === "change")
      return fi(e);
  }
  function Mv(t, e) {
    return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
  }
  var Ve = typeof Object.is == "function" ? Object.is : Mv;
  function su(t, e) {
    if (Ve(t, e)) return !0;
    if (typeof t != "object" || t === null || typeof e != "object" || e === null)
      return !1;
    var l = Object.keys(t), a = Object.keys(e);
    if (l.length !== a.length) return !1;
    for (a = 0; a < l.length; a++) {
      var n = l[a];
      if (!w.call(e, n) || !Ve(t[n], e[n]))
        return !1;
    }
    return !0;
  }
  function kc(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  function mf(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function hf(t, e) {
    var l = mf(t);
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
      l = mf(l);
    }
  }
  function vf(t, e) {
    return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? vf(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
  }
  function gf(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var e = kc(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var l = typeof e.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) t = e.contentWindow;
      else break;
      e = kc(t.document);
    }
    return e;
  }
  function Fc(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
  }
  var Ov = wl && "documentMode" in document && 11 >= document.documentMode, mn = null, Wc = null, ru = null, Ic = !1;
  function yf(t, e, l) {
    var a = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Ic || mn == null || mn !== kc(a) || (a = mn, "selectionStart" in a && Fc(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), ru && su(ru, a) || (ru = a, a = fc(Wc, "onSelect"), 0 < a.length && (e = new ri(
      "onSelect",
      "select",
      null,
      e,
      l
    ), t.push({ event: e, listeners: a }), e.target = mn)));
  }
  function ja(t, e) {
    var l = {};
    return l[t.toLowerCase()] = e.toLowerCase(), l["Webkit" + t] = "webkit" + e, l["Moz" + t] = "moz" + e, l;
  }
  var hn = {
    animationend: ja("Animation", "AnimationEnd"),
    animationiteration: ja("Animation", "AnimationIteration"),
    animationstart: ja("Animation", "AnimationStart"),
    transitionrun: ja("Transition", "TransitionRun"),
    transitionstart: ja("Transition", "TransitionStart"),
    transitioncancel: ja("Transition", "TransitionCancel"),
    transitionend: ja("Transition", "TransitionEnd")
  }, Pc = {}, bf = {};
  wl && (bf = document.createElement("div").style, "AnimationEvent" in window || (delete hn.animationend.animation, delete hn.animationiteration.animation, delete hn.animationstart.animation), "TransitionEvent" in window || delete hn.transitionend.transition);
  function Ra(t) {
    if (Pc[t]) return Pc[t];
    if (!hn[t]) return t;
    var e = hn[t], l;
    for (l in e)
      if (e.hasOwnProperty(l) && l in bf)
        return Pc[t] = e[l];
    return t;
  }
  var pf = Ra("animationend"), Sf = Ra("animationiteration"), _f = Ra("animationstart"), zv = Ra("transitionrun"), Av = Ra("transitionstart"), Cv = Ra("transitioncancel"), Ef = Ra("transitionend"), Tf = /* @__PURE__ */ new Map(), ts = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  ts.push("scrollEnd");
  function il(t, e) {
    Tf.set(t, e), Ca(e, [t]);
  }
  var jv = 0;
  function Dl(t, e) {
    if (t.name != null && t.name !== "auto") return t.name;
    if (e.autoName !== null) return e.autoName;
    t = ol.identifierPrefix;
    var l = jv++;
    return t = "_" + t + "t_" + l.toString(32) + "_", e.autoName = t;
  }
  function Nf(t) {
    if (t == null || typeof t == "string")
      return t;
    var e = null, l = Dn;
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
  function Ul(t, e) {
    return t = Nf(t), e = Nf(e), e == null ? t === "auto" ? null : t : e === "auto" ? null : e;
  }
  var di = typeof reportError == "function" ? reportError : function(t) {
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
  }, Ie = [], vn = 0, es = 0;
  function mi() {
    for (var t = vn, e = es = vn = 0; e < t; ) {
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
      u !== 0 && xf(l, n, u);
    }
  }
  function hi(t, e, l, a) {
    Ie[vn++] = t, Ie[vn++] = e, Ie[vn++] = l, Ie[vn++] = a, es |= a, t.lanes |= a, t = t.alternate, t !== null && (t.lanes |= a);
  }
  function ls(t, e, l, a) {
    return hi(t, e, l, a), vi(t);
  }
  function wa(t, e) {
    return hi(t, null, null, e), vi(t);
  }
  function xf(t, e, l) {
    t.lanes |= l;
    var a = t.alternate;
    a !== null && (a.lanes |= l);
    for (var n = !1, u = t.return; u !== null; )
      u.childLanes |= l, a = u.alternate, a !== null && (a.childLanes |= l), u.tag === 22 && (t = u.stateNode, t === null || t._visibility & 1 || (n = !0)), t = u, u = u.return;
    return t.tag === 3 ? (u = t.stateNode, n && e !== null && (n = 31 - Ge(l), t = u.hiddenUpdates, a = t[n], a === null ? t[n] = [e] : a.push(e), e.lane = l | 536870912), u) : null;
  }
  function vi(t) {
    if (50 < ju)
      throw ju = 0, nc = null, Error(s(185));
    for (var e = t.return; e !== null; )
      t = e, e = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var gn = {};
  function Rv(t, e, l, a) {
    this.tag = t, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Ue(t, e, l, a) {
    return new Rv(t, e, l, a);
  }
  function as(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Bl(t, e) {
    var l = t.alternate;
    return l === null ? (l = Ue(
      t.tag,
      e,
      t.key,
      t.mode
    ), l.elementType = t.elementType, l.type = t.type, l.stateNode = t.stateNode, l.alternate = t, t.alternate = l) : (l.pendingProps = e, l.type = t.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = t.flags & 1206910976, l.childLanes = t.childLanes, l.lanes = t.lanes, l.child = t.child, l.memoizedProps = t.memoizedProps, l.memoizedState = t.memoizedState, l.updateQueue = t.updateQueue, e = t.dependencies, l.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }, l.sibling = t.sibling, l.index = t.index, l.ref = t.ref, l.refCleanup = t.refCleanup, l;
  }
  function Mf(t, e) {
    t.flags &= 1206910978;
    var l = t.alternate;
    return l === null ? (t.childLanes = 0, t.lanes = e, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = l.childLanes, t.lanes = l.lanes, t.child = l.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = l.memoizedProps, t.memoizedState = l.memoizedState, t.updateQueue = l.updateQueue, t.type = l.type, e = l.dependencies, t.dependencies = e === null ? null : {
      lanes: e.lanes,
      firstContext: e.firstContext
    }), t;
  }
  function gi(t, e, l, a, n, u) {
    var i = 0;
    if (a = t, typeof a == "function") as(a) && (i = 1);
    else if (typeof a == "string")
      i = iy(
        t,
        l,
        G.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (a) {
        case Dt:
          return t = Ue(31, l, e, n), t.elementType = Dt, t.lanes = u, t;
        case yt:
          return Da(l.children, n, u, e);
        case ft:
          i = 8, n |= 24;
          break;
        case Et:
          return t = Ue(12, l, e, n | 2), t.elementType = Et, t.lanes = u, t;
        case et:
          return t = Ue(13, l, e, n), t.elementType = et, t.lanes = u, t;
        case I:
          return t = Ue(19, l, e, n), t.elementType = I, t.lanes = u, t;
        case Lt:
        case y:
          return t = n | 32, t = Ue(30, l, e, t), t.elementType = y, t.lanes = u, t.stateNode = {
            autoName: null,
            paired: null,
            clones: null,
            ref: null
          }, t;
        default:
          if (typeof a == "object" && a !== null)
            switch (a.$$typeof) {
              case jt:
                i = 10;
                break t;
              case Tt:
                i = 9;
                break t;
              case Y:
                i = 11;
                break t;
              case bt:
                i = 14;
                break t;
              case rt:
                i = 16, a = null;
                break t;
            }
          i = 29, l = Error(
            s(130, t === null ? "null" : typeof t, "")
          ), a = null;
      }
    return e = Ue(i, l, e, n), e.elementType = t, e.type = a, e.lanes = u, e;
  }
  function Da(t, e, l, a) {
    return t = Ue(7, t, a, e), t.lanes = l, t;
  }
  function ns(t, e, l) {
    return t = Ue(6, t, null, e), t.lanes = l, t;
  }
  function Of(t) {
    var e = Ue(18, null, null, 0);
    return e.stateNode = t, e;
  }
  function us(t, e, l) {
    return e = Ue(
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
  var zf = /* @__PURE__ */ new WeakMap();
  function Pe(t, e) {
    if (typeof t == "object" && t !== null) {
      var l = zf.get(t);
      return l !== void 0 ? l : (e = {
        value: t,
        source: e,
        stack: Ma(e)
      }, zf.set(t, e), e);
    }
    return {
      value: t,
      source: e,
      stack: Ma(e)
    };
  }
  var yn = [], bn = 0, yi = null, ou = 0, tl = [], el = 0, Wl = null, gl = 1, yl = "";
  function Hl(t, e) {
    yn[bn++] = ou, yn[bn++] = yi, yi = t, ou = e;
  }
  function Af(t, e, l) {
    tl[el++] = gl, tl[el++] = yl, tl[el++] = Wl, Wl = t;
    var a = gl;
    t = yl;
    var n = 32 - Ge(a) - 1;
    a &= ~(1 << n), l += 1;
    var u = 32 - Ge(e) + n;
    if (30 < u) {
      var i = n - n % 5;
      u = (a & (1 << i) - 1).toString(32), a >>= i, n -= i, gl = 1 << 32 - Ge(e) + n | l << n | a, yl = u + t;
    } else
      gl = 1 << u | l << n | a, yl = t;
  }
  function bi(t) {
    t.return !== null && (Hl(t, 1), Af(t, 1, 0));
  }
  function is(t) {
    for (; t === yi; )
      yi = yn[--bn], yn[bn] = null, ou = yn[--bn], yn[bn] = null;
    for (; t === Wl; )
      Wl = tl[--el], tl[el] = null, yl = tl[--el], tl[el] = null, gl = tl[--el], tl[el] = null;
  }
  function Cf(t, e) {
    tl[el++] = gl, tl[el++] = yl, tl[el++] = Wl, gl = e.id, yl = e.overflow, Wl = t;
  }
  var ge = null, It = null, xt = !1, Il = null, ll = !1, cs = Error(s(519));
  function Pl(t) {
    var e = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw fu(Pe(e, t)), cs;
  }
  function jf(t) {
    var e = t.stateNode, l = t.type, a = t.memoizedProps;
    switch (e[pe] = t, e[De] = a, l) {
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
        for (l = 0; l < wu.length; l++)
          Ct(wu[l], e);
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
        Ct("invalid", e), Xo(
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
        Ct("invalid", e), Qo(e, a.value, a.defaultValue, a.children);
    }
    l = a.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || e.textContent === "" + l || a.suppressHydrationWarning === !0 || Im(e.textContent, l) ? (a.popover != null && (Ct("beforetoggle", e), Ct("toggle", e)), a.onScroll != null && Ct("scroll", e), a.onScrollEnd != null && Ct("scrollend", e), a.onClick != null && (e.onclick = vl), e = !0) : e = !1, e || Pl(t, !0);
  }
  function pi(t) {
    for (ge = t.return; ge; )
      switch (ge.tag) {
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
          ge = ge.return;
      }
  }
  function pn(t) {
    if (t !== ge) return !1;
    if (!xt) return pi(t), xt = !0, !1;
    var e = t.tag, l;
    if ((l = e !== 3 && e !== 27) && ((l = e === 5) && (l = t.type, l = !(l !== "form" && l !== "button") || Hr(t.type, t.memoizedProps)), l = !l), l && It && Pl(t), pi(t), e === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      It = yh(t);
    } else if (e === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      It = yh(t);
    } else
      e === 27 ? (e = It, va(t.type) ? (t = Kr, Kr = null, It = t) : It = e) : It = ge ? nl(t.stateNode.nextSibling) : null;
    return !0;
  }
  function Ua() {
    It = ge = null, xt = !1;
  }
  function ss() {
    var t = Il;
    return t !== null && (Le === null ? Le = t : Le.push.apply(
      Le,
      t
    ), Il = null), t;
  }
  function fu(t) {
    Il === null ? Il = [t] : Il.push(t);
  }
  var rs = Xt(null), Ba = null, Ll = null;
  function ta(t, e, l) {
    Nt(rs, e._currentValue), e._currentValue = l;
  }
  function Yl(t) {
    t._currentValue = rs.current, vt(rs);
  }
  function Si(t, e, l) {
    for (; t !== null; ) {
      var a = t.alternate;
      if ((t.childLanes & e) !== e ? (t.childLanes |= e, a !== null && (a.childLanes |= e)) : a !== null && (a.childLanes & e) !== e && (a.childLanes |= e), t === l) break;
      t = t.return;
    }
  }
  function os(t, e, l, a) {
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
              u.lanes |= l, o = u.alternate, o !== null && (o.lanes |= l), Si(
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
        i.lanes |= l, u = i.alternate, u !== null && (u.lanes |= l), Si(i, l, t), i = null;
      } else
        n.tag === 13 && n.memoizedState !== null && n.memoizedState.dehydrated === null ? (n.lanes |= l, i = n.alternate, i !== null && (i.lanes |= l), Si(
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
  function Ha(t, e, l, a) {
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
          Ve(n.pendingProps.value, i.value) || (t !== null ? t.push(o) : t = [o]);
        }
      } else if (n === Re.current) {
        if (i = n.alternate, i === null) throw Error(s(387));
        i.memoizedState.memoizedState !== n.memoizedState.memoizedState && (t !== null ? t.push(Qn) : t = [Qn]);
      }
      n = n.return;
    }
    return t !== null && os(
      e,
      t,
      l,
      a
    ), e.flags |= 262144, t !== null;
  }
  function _i(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!Ve(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function La(t) {
    Ba = t, Ll = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function Se(t) {
    return Rf(Ba, t);
  }
  function Ei(t, e) {
    return Ba === null && La(t), Rf(t, e);
  }
  function Rf(t, e) {
    var l = e._currentValue;
    if (e = { context: e, memoizedValue: l, next: null }, Ll === null) {
      if (t === null) throw Error(s(308));
      Ll = e, t.dependencies = { lanes: 0, firstContext: e }, t.flags |= 524288;
    } else Ll = Ll.next = e;
    return l;
  }
  var wv = typeof AbortController < "u" ? AbortController : function() {
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
  }, Dv = c.unstable_scheduleCallback, Uv = c.unstable_NormalPriority, ce = {
    $$typeof: jt,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function fs() {
    return {
      controller: new wv(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function du(t) {
    t.refCount--, t.refCount === 0 && Dv(Uv, function() {
      t.controller.abort();
    });
  }
  function wf(t, e) {
    if ((t.pendingLanes & 4194048) !== 0) {
      var l = t.transitionTypes;
      for (l === null && (l = t.transitionTypes = []), t = 0; t < e.length; t++) {
        var a = e[t];
        l.indexOf(a) === -1 && l.push(a);
      }
    }
  }
  var mu = null;
  function Bv(t) {
    var e = t.transitionTypes;
    return t.transitionTypes = null, e;
  }
  var hu = null, ds = 0, Ya = 0, Sn = null;
  function Hv(t, e) {
    if (hu === null) {
      var l = hu = [];
      ds = 0, Ya = zr(), Sn = {
        status: "pending",
        value: void 0,
        then: function(a) {
          l.push(a);
        }
      };
    }
    return ds++, e.then(Df, Df), e;
  }
  function Df() {
    if (--ds === 0 && (mu = null, hu !== null)) {
      Sn !== null && (Sn.status = "fulfilled");
      var t = hu;
      hu = null, Ya = 0, Sn = null;
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
  var Uf = K.S;
  K.S = function(t, e) {
    if (Om = kt(), typeof e == "object" && e !== null && typeof e.then == "function" && Hv(t, e), mu !== null)
      for (var l = Ln; l !== null; )
        wf(l, mu), l = l.next;
    if (l = t.types, l !== null) {
      for (var a = Ln; a !== null; )
        wf(a, l), a = a.next;
      if (Ya !== 0) {
        a = mu, a === null && (a = mu = []);
        for (var n = 0; n < l.length; n++) {
          var u = l[n];
          a.indexOf(u) === -1 && a.push(u);
        }
      }
    }
    Uf !== null && Uf(t, e);
  };
  var qa = Xt(null);
  function ms() {
    var t = qa.current;
    return t !== null ? t : Wt.pooledCache;
  }
  function Ti(t, e) {
    e === null ? Nt(qa, qa.current) : Nt(qa, e.pool);
  }
  function Bf() {
    var t = ms();
    return t === null ? null : { parent: ce._currentValue, pool: t };
  }
  var _n = Error(s(460)), hs = Error(s(474)), Ni = Error(s(542)), xi = { then: function() {
  } };
  function Hf(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function Lf(t, e, l) {
    switch (l = t[l], l === void 0 ? t.push(e) : l !== e && (e.then(vl, vl), e = l), e.status) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw t = e.reason, qf(t), t === void 0 && !("reason" in e) ? Error(s(600)) : t;
      default:
        if (typeof e.status == "string") e.then(vl, vl);
        else {
          if (t = Wt, t !== null && 100 < t.shellSuspendCounter)
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
            throw t = e.reason, qf(t), t;
        }
        throw Xa = e, _n;
    }
  }
  function Ga(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (Xa = l, _n) : l;
    }
  }
  var Xa = null;
  function Yf() {
    if (Xa === null) throw Error(s(459));
    var t = Xa;
    return Xa = null, t;
  }
  function qf(t) {
    if (t === _n || t === Ni)
      throw Error(s(483));
  }
  var En = null, vu = 0;
  function Mi(t) {
    var e = vu;
    return vu += 1, En === null && (En = []), Lf(En, t, e);
  }
  function ea(t, e) {
    e = e.props.ref, t.ref = e !== void 0 ? e : null;
  }
  function Oi(t, e) {
    throw e.$$typeof === ot ? Error(s(525)) : (t = Object.prototype.toString.call(e), Error(
      s(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t
      )
    ));
  }
  function Gf(t) {
    function e(T, p) {
      if (t) {
        var M = T.deletions;
        M === null ? (T.deletions = [p], T.flags |= 16) : M.push(p);
      }
    }
    function l(T, p) {
      if (!t) return null;
      for (; p !== null; )
        e(T, p), p = p.sibling;
      return null;
    }
    function a(T) {
      for (var p = /* @__PURE__ */ new Map(); T !== null; )
        T.key === null ? p.set(T.index, T) : p.set(T.key, T), T = T.sibling;
      return p;
    }
    function n(T, p) {
      return T = Bl(T, p), T.index = 0, T.sibling = null, T;
    }
    function u(T, p, M) {
      return T.index = M, t ? (M = T.alternate, M !== null ? (M = M.index, M < p ? (T.flags |= 2, p) : M) : (T.flags |= 134217730, p)) : (T.flags |= 1048576, p);
    }
    function i(T) {
      return t && T.alternate === null && (T.flags |= 134217730), T;
    }
    function o(T, p, M, B) {
      return p === null || p.tag !== 6 ? (p = ns(M, T.mode, B), p.return = T, p) : (p = n(p, M), p.return = T, p);
    }
    function g(T, p, M, B) {
      var $ = M.type;
      return $ === yt ? (T = z(
        T,
        p,
        M.props.children,
        B,
        M.key
      ), ea(T, M), T) : p !== null && (p.elementType === $ || typeof $ == "object" && $ !== null && $.$$typeof === rt && Ga($) === p.type) ? (p = n(p, M.props), ea(p, M), p.return = T, p) : (p = gi(
        M.type,
        M.key,
        M.props,
        null,
        T.mode,
        B
      ), ea(p, M), p.return = T, p);
    }
    function N(T, p, M, B) {
      return p === null || p.tag !== 4 || p.stateNode.containerInfo !== M.containerInfo || p.stateNode.implementation !== M.implementation ? (p = us(M, T.mode, B), p.return = T, p) : (p = n(p, M.children || []), p.return = T, p);
    }
    function z(T, p, M, B, $) {
      return p === null || p.tag !== 7 ? (p = Da(
        M,
        T.mode,
        B,
        $
      ), p.return = T, p) : (p = n(p, M), p.return = T, p);
    }
    function H(T, p, M) {
      if (typeof p == "string" && p !== "" || typeof p == "number" || typeof p == "bigint")
        return p = ns(
          "" + p,
          T.mode,
          M
        ), p.return = T, p;
      if (typeof p == "object" && p !== null) {
        switch (p.$$typeof) {
          case Jt:
            return M = gi(
              p.type,
              p.key,
              p.props,
              null,
              T.mode,
              M
            ), ea(M, p), M.return = T, M;
          case ut:
            return p = us(
              p,
              T.mode,
              M
            ), p.return = T, p;
          case rt:
            return p = Ga(p), H(T, p, M);
        }
        if (dt(p) || P(p))
          return p = Da(
            p,
            T.mode,
            M,
            null
          ), p.return = T, p;
        if (typeof p.then == "function")
          return H(T, Mi(p), M);
        if (p.$$typeof === jt)
          return H(
            T,
            Ei(T, p),
            M
          );
        Oi(T, p);
      }
      return null;
    }
    function _(T, p, M, B) {
      var $ = p !== null ? p.key : null;
      if (typeof M == "string" && M !== "" || typeof M == "number" || typeof M == "bigint")
        return $ !== null ? null : o(T, p, "" + M, B);
      if (typeof M == "object" && M !== null) {
        switch (M.$$typeof) {
          case Jt:
            return M.key === $ ? g(T, p, M, B) : null;
          case ut:
            return M.key === $ ? N(T, p, M, B) : null;
          case rt:
            return M = Ga(M), _(T, p, M, B);
        }
        if (dt(M) || P(M))
          return $ !== null ? null : z(T, p, M, B, null);
        if (typeof M.then == "function")
          return _(
            T,
            p,
            Mi(M),
            B
          );
        if (M.$$typeof === jt)
          return _(
            T,
            p,
            Ei(T, M),
            B
          );
        Oi(T, M);
      }
      return null;
    }
    function O(T, p, M, B, $) {
      if (typeof B == "string" && B !== "" || typeof B == "number" || typeof B == "bigint")
        return T = T.get(M) || null, o(p, T, "" + B, $);
      if (typeof B == "object" && B !== null) {
        switch (B.$$typeof) {
          case Jt:
            return T = T.get(
              B.key === null ? M : B.key
            ) || null, g(p, T, B, $);
          case ut:
            return T = T.get(
              B.key === null ? M : B.key
            ) || null, N(p, T, B, $);
          case rt:
            return B = Ga(B), O(
              T,
              p,
              M,
              B,
              $
            );
        }
        if (dt(B) || P(B))
          return T = T.get(M) || null, z(p, T, B, $, null);
        if (typeof B.then == "function")
          return O(
            T,
            p,
            M,
            Mi(B),
            $
          );
        if (B.$$typeof === jt)
          return O(
            T,
            p,
            M,
            Ei(p, B),
            $
          );
        Oi(p, B);
      }
      return null;
    }
    function X(T, p, M, B) {
      for (var $ = null, wt = null, nt = p, st = p = 0, oe = null; nt !== null && st < M.length; st++) {
        nt.index > st ? (oe = nt, nt = null) : oe = nt.sibling;
        var Ut = _(
          T,
          nt,
          M[st],
          B
        );
        if (Ut === null) {
          nt === null && (nt = oe);
          break;
        }
        t && nt && Ut.alternate === null && e(T, nt), p = u(Ut, p, st), wt === null ? $ = Ut : wt.sibling = Ut, wt = Ut, nt = oe;
      }
      if (st === M.length)
        return l(T, nt), xt && Hl(T, st), $;
      if (nt === null) {
        for (; st < M.length; st++)
          nt = H(T, M[st], B), nt !== null && (p = u(
            nt,
            p,
            st
          ), wt === null ? $ = nt : wt.sibling = nt, wt = nt);
        return xt && Hl(T, st), $;
      }
      for (nt = a(nt); st < M.length; st++)
        oe = O(
          nt,
          T,
          st,
          M[st],
          B
        ), oe !== null && (t && (Ut = oe.alternate, Ut !== null && nt.delete(Ut.key === null ? st : Ut.key)), p = u(
          oe,
          p,
          st
        ), wt === null ? $ = oe : wt.sibling = oe, wt = oe);
      return t && nt.forEach(function(Sa) {
        return e(T, Sa);
      }), xt && Hl(T, st), $;
    }
    function tt(T, p, M, B) {
      if (M == null) throw Error(s(151));
      for (var $ = null, wt = null, nt = p, st = p = 0, oe = null, Ut = M.next(); nt !== null && !Ut.done; st++, Ut = M.next()) {
        nt.index > st ? (oe = nt, nt = null) : oe = nt.sibling;
        var Sa = _(T, nt, Ut.value, B);
        if (Sa === null) {
          nt === null && (nt = oe);
          break;
        }
        t && nt && Sa.alternate === null && e(T, nt), p = u(Sa, p, st), wt === null ? $ = Sa : wt.sibling = Sa, wt = Sa, nt = oe;
      }
      if (Ut.done)
        return l(T, nt), xt && Hl(T, st), $;
      if (nt === null) {
        for (; !Ut.done; st++, Ut = M.next())
          Ut = H(T, Ut.value, B), Ut !== null && (p = u(Ut, p, st), wt === null ? $ = Ut : wt.sibling = Ut, wt = Ut);
        return xt && Hl(T, st), $;
      }
      for (nt = a(nt); !Ut.done; st++, Ut = M.next())
        Ut = O(nt, T, st, Ut.value, B), Ut !== null && (t && (oe = Ut.alternate, oe !== null && nt.delete(
          oe.key === null ? st : oe.key
        )), p = u(Ut, p, st), wt === null ? $ = Ut : wt.sibling = Ut, wt = Ut);
      return t && nt.forEach(function(by) {
        return e(T, by);
      }), xt && Hl(T, st), $;
    }
    function _t(T, p, M, B) {
      if (typeof M == "object" && M !== null && M.type === yt && M.key === null && M.props.ref === void 0 && (M = M.props.children), typeof M == "object" && M !== null) {
        switch (M.$$typeof) {
          case Jt:
            t: {
              for (var $ = M.key; p !== null; ) {
                if (p.key === $) {
                  if ($ = M.type, $ === yt) {
                    if (p.tag === 7) {
                      l(
                        T,
                        p.sibling
                      ), B = n(
                        p,
                        M.props.children
                      ), ea(B, M), B.return = T, T = B;
                      break t;
                    }
                  } else if (p.elementType === $ || typeof $ == "object" && $ !== null && $.$$typeof === rt && Ga($) === p.type) {
                    l(
                      T,
                      p.sibling
                    ), B = n(p, M.props), ea(B, M), B.return = T, T = B;
                    break t;
                  }
                  l(T, p);
                  break;
                } else e(T, p);
                p = p.sibling;
              }
              M.type === yt ? (B = Da(
                M.props.children,
                T.mode,
                B,
                M.key
              ), ea(B, M), B.return = T, T = B) : (B = gi(
                M.type,
                M.key,
                M.props,
                null,
                T.mode,
                B
              ), ea(B, M), B.return = T, T = B);
            }
            return i(T);
          case ut:
            t: {
              for ($ = M.key; p !== null; ) {
                if (p.key === $)
                  if (p.tag === 4 && p.stateNode.containerInfo === M.containerInfo && p.stateNode.implementation === M.implementation) {
                    l(
                      T,
                      p.sibling
                    ), B = n(p, M.children || []), B.return = T, T = B;
                    break t;
                  } else {
                    l(T, p);
                    break;
                  }
                else e(T, p);
                p = p.sibling;
              }
              B = us(M, T.mode, B), B.return = T, T = B;
            }
            return i(T);
          case rt:
            return M = Ga(M), _t(
              T,
              p,
              M,
              B
            );
        }
        if (dt(M))
          return X(
            T,
            p,
            M,
            B
          );
        if (P(M)) {
          if ($ = P(M), typeof $ != "function") throw Error(s(150));
          return M = $.call(M), tt(
            T,
            p,
            M,
            B
          );
        }
        if (typeof M.then == "function")
          return _t(
            T,
            p,
            Mi(M),
            B
          );
        if (M.$$typeof === jt)
          return _t(
            T,
            p,
            Ei(T, M),
            B
          );
        Oi(T, M);
      }
      return typeof M == "string" && M !== "" || typeof M == "number" || typeof M == "bigint" ? (M = "" + M, p !== null && p.tag === 6 ? (l(T, p.sibling), B = n(p, M), B.return = T, T = B) : (l(T, p), B = ns(M, T.mode, B), B.return = T, T = B), i(T)) : l(T, p);
    }
    return function(T, p, M, B) {
      try {
        vu = 0;
        var $ = _t(
          T,
          p,
          M,
          B
        );
        return En = null, $;
      } catch (nt) {
        if (nt === _n || nt === Ni) throw nt;
        var wt = Ue(29, nt, null, T.mode);
        return wt.lanes = B, wt.return = T, wt;
      }
    };
  }
  var Va = Gf(!0), Xf = Gf(!1), la = !1;
  function vs(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function gs(t, e) {
    t = t.updateQueue, e.updateQueue === t && (e.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function aa(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function na(t, e, l) {
    var a = t.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (qt & 2) !== 0) {
      var n = a.pending;
      return n === null ? e.next = e : (e.next = n.next, n.next = e), a.pending = e, e = vi(t), xf(t, null, l), e;
    }
    return hi(t, a, e, l), vi(t);
  }
  function gu(t, e, l) {
    if (e = e.updateQueue, e !== null && (e = e.shared, (l & 4194048) !== 0)) {
      var a = e.lanes;
      a &= t.pendingLanes, l |= a, e.lanes = l, zo(t, l);
    }
  }
  function ys(t, e) {
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
  var bs = !1;
  function yu() {
    if (bs) {
      var t = Sn;
      if (t !== null) throw t;
    }
  }
  function bu(t, e, l, a) {
    bs = !1;
    var n = t.updateQueue;
    la = !1;
    var u = n.firstBaseUpdate, i = n.lastBaseUpdate, o = n.shared.pending;
    if (o !== null) {
      n.shared.pending = null;
      var g = o, N = g.next;
      g.next = null, i === null ? u = N : i.next = N, i = g;
      var z = t.alternate;
      z !== null && (z = z.updateQueue, o = z.lastBaseUpdate, o !== i && (o === null ? z.firstBaseUpdate = N : o.next = N, z.lastBaseUpdate = g));
    }
    if (u !== null) {
      var H = n.baseState;
      i = 0, z = N = g = null, o = u;
      do {
        var _ = o.lane & -536870913, O = _ !== o.lane;
        if (O ? (Rt & _) === _ : (a & _) === _) {
          _ !== 0 && _ === Ya && (bs = !0), z !== null && (z = z.next = {
            lane: 0,
            tag: o.tag,
            payload: o.payload,
            callback: null,
            next: null
          });
          t: {
            var X = t, tt = o;
            _ = e;
            var _t = l;
            switch (tt.tag) {
              case 1:
                if (X = tt.payload, typeof X == "function") {
                  H = X.call(_t, H, _);
                  break t;
                }
                H = X;
                break t;
              case 3:
                X.flags = X.flags & -65537 | 128;
              case 0:
                if (X = tt.payload, _ = typeof X == "function" ? X.call(_t, H, _) : X, _ == null) break t;
                H = Z({}, H, _);
                break t;
              case 2:
                la = !0;
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
          }, z === null ? (N = z = O, g = H) : z = z.next = O, i |= _;
        if (o = o.next, o === null) {
          if (o = n.shared.pending, o === null)
            break;
          O = o, o = O.next, O.next = null, n.lastBaseUpdate = O, n.shared.pending = null;
        }
      } while (!0);
      z === null && (g = H), n.baseState = g, n.firstBaseUpdate = N, n.lastBaseUpdate = z, u === null && (n.shared.lanes = 0), fa |= i, t.lanes = i, t.memoizedState = H;
    }
  }
  function Vf(t, e) {
    if (typeof t != "function")
      throw Error(s(191, t));
    t.call(e);
  }
  function Qf(t, e) {
    var l = t.callbacks;
    if (l !== null)
      for (t.callbacks = null, t = 0; t < l.length; t++)
        Vf(l[t], e);
  }
  var ua = Xt(null), zi = Xt(0);
  function Zf(t, e) {
    t = Ql, Nt(zi, t), Nt(ua, e), Ql = t | e.baseLanes;
  }
  function ps() {
    Nt(zi, Ql), Nt(ua, ua.current);
  }
  function Ss() {
    Ql = zi.current, vt(ua), vt(zi);
  }
  var _e = Xt(null), Me = null;
  function ia(t) {
    var e = t.alternate;
    Nt(Ee, Ee.current & 1), Nt(_e, t), Me === null && (e === null || ua.current !== null || e.memoizedState !== null) && (Me = t);
  }
  function _s(t) {
    Nt(Ee, Ee.current), Nt(_e, t), Me === null && (Me = t);
  }
  function Kf(t) {
    t.tag === 22 ? (Nt(Ee, Ee.current), Nt(_e, t), Me === null && (Me = t)) : ca();
  }
  function ca() {
    Nt(Ee, Ee.current), Nt(_e, _e.current);
  }
  function Qe(t) {
    vt(_e), Me === t && (Me = null), vt(Ee);
  }
  var Ee = Xt(0);
  function pu(t, e) {
    Nt(_e, _e.current), Nt(Ee, e);
  }
  function Es(t) {
    vt(Ee), vt(_e), Me === t && (Me = null);
  }
  function Ai(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var l = e.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || Qr(l) || Zr(l)))
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
  var ql = 0, St = null, Ft = null, se = null, Ci = !1, Tn = !1, Qa = !1, ji = 0, Su = 0, Nn = null, Yv = 0;
  function ae() {
    throw Error(s(321));
  }
  function Ts(t, e) {
    if (e === null) return !1;
    for (var l = 0; l < e.length && l < t.length; l++)
      if (!Ve(t[l], e[l])) return !1;
    return !0;
  }
  function Ns(t, e, l, a, n, u) {
    return ql = u, St = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, K.H = t === null || t.memoizedState === null ? Ad : Cd, Qa = !1, u = l(a, n), Qa = !1, Tn && (u = $f(
      e,
      l,
      a,
      n
    )), Jf(t), u;
  }
  function Jf(t) {
    K.H = Li;
    var e = Ft !== null && Ft.next !== null;
    if (ql = 0, se = Ft = St = null, Ci = !1, Su = 0, Nn = null, e) throw Error(s(300));
    t === null || re || (t = t.dependencies, t !== null && _i(t) && (re = !0));
  }
  function $f(t, e, l, a) {
    St = t;
    var n = 0;
    do {
      if (Tn && (Nn = null), Su = 0, Tn = !1, 25 <= n) throw Error(s(301));
      if (n += 1, se = Ft = null, t.updateQueue != null) {
        var u = t.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      K.H = Jv, u = e(l, a);
    } while (Tn);
    return u;
  }
  function qv() {
    var t = K.H, e = t.useState()[0];
    return e = typeof e.then == "function" ? _u(e) : e, t = t.useState()[0], (Ft !== null ? Ft.memoizedState : null) !== t && (St.flags |= 1024), e;
  }
  function xs() {
    var t = ji !== 0;
    return ji = 0, t;
  }
  function Ms(t, e, l) {
    e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~l;
  }
  function Os(t) {
    if (Ci) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        e !== null && (e.pending = null), t = t.next;
      }
      Ci = !1;
    }
    ql = 0, se = Ft = St = null, Tn = !1, Su = ji = 0, Nn = null;
  }
  function Ae() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return se === null ? St.memoizedState = se = t : se = se.next = t, se;
  }
  function ue() {
    if (Ft === null) {
      var t = St.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Ft.next;
    var e = se === null ? St.memoizedState : se.next;
    if (e !== null)
      se = e, Ft = t;
    else {
      if (t === null)
        throw St.alternate === null ? Error(s(467)) : Error(s(310));
      Ft = t, t = {
        memoizedState: Ft.memoizedState,
        baseState: Ft.baseState,
        baseQueue: Ft.baseQueue,
        queue: Ft.queue,
        next: null
      }, se === null ? St.memoizedState = se = t : se = se.next = t;
    }
    return se;
  }
  function Ri() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function _u(t) {
    var e = Su;
    return Su += 1, Nn === null && (Nn = []), t = Lf(Nn, t, e), e = St, (se === null ? e.memoizedState : se.next) === null && (e = e.alternate, K.H = e === null || e.memoizedState === null ? Ad : Cd), t;
  }
  function wi(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return _u(t);
      if (t.$$typeof === R) return;
      if (t.$$typeof === jt) return Se(t);
    }
    throw Error(s(438, String(t)));
  }
  function zs(t) {
    var e = null, l = St.updateQueue;
    if (l !== null && (e = l.memoCache), e == null) {
      var a = St.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (e = {
        data: a.data.map(function(n) {
          return n.slice();
        }),
        index: 0
      })));
    }
    if (e == null && (e = { data: [], index: 0 }), l === null && (l = Ri(), St.updateQueue = l), l.memoCache = e, l = e.data[e.index], l === void 0)
      for (l = e.data[e.index] = Array(t), a = 0; a < t; a++)
        l[a] = F;
    return e.index++, l;
  }
  function Gl(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function Di(t) {
    var e = ue();
    return As(e, Ft, t);
  }
  function As(t, e, l) {
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
        var H = N.lane & -536870913;
        if (H !== N.lane ? (Rt & H) === H : (ql & H) === H) {
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
            }), H === Ya && (z = !0);
          else if ((ql & _) === _) {
            N = N.next, _ === Ya && (z = !0);
            continue;
          } else
            H = {
              lane: 0,
              revertLane: N.revertLane,
              gesture: null,
              action: N.action,
              hasEagerState: N.hasEagerState,
              eagerState: N.eagerState,
              next: null
            }, g === null ? (o = g = H, i = u) : g = g.next = H, St.lanes |= _, fa |= _;
          H = N.action, Qa && l(u, H), u = N.hasEagerState ? N.eagerState : l(u, H);
        } else
          _ = {
            lane: H,
            revertLane: N.revertLane,
            gesture: N.gesture,
            action: N.action,
            hasEagerState: N.hasEagerState,
            eagerState: N.eagerState,
            next: null
          }, g === null ? (o = g = _, i = u) : g = g.next = _, St.lanes |= H, fa |= H;
        N = N.next;
      } while (N !== null && N !== e);
      if (g === null ? i = u : g.next = o, !Ve(u, t.memoizedState) && (re = !0, z && (l = Sn, l !== null)))
        throw l;
      t.memoizedState = u, t.baseState = i, t.baseQueue = g, a.lastRenderedState = u;
    }
    return n === null && (a.lanes = 0), [t.memoizedState, a.dispatch];
  }
  function Cs(t) {
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
      Ve(u, e.memoizedState) || (re = !0), e.memoizedState = u, e.baseQueue === null && (e.baseState = u), l.lastRenderedState = u;
    }
    return [u, a];
  }
  function kf(t, e, l) {
    var a = St, n = ue(), u = xt;
    if (u) {
      if (l === void 0) throw Error(s(407));
      l = l();
    } else l = e();
    var i = !Ve(
      (Ft || n).memoizedState,
      l
    );
    if (i && (n.memoizedState = l, re = !0), n = n.queue, ws(If.bind(null, a, n, t), [
      t
    ]), t = n.getSnapshot !== e || i || se !== null && (se.memoizedState.tag & 1) !== 0, xn(
      t ? 9 : 8,
      { destroy: void 0 },
      Wf.bind(null, a, n, l, e),
      null
    ), t) {
      if (a.flags |= 2048, Wt === null) throw Error(s(349));
      u || (ql & 127) !== 0 || Ff(a, e, l);
    }
    return l;
  }
  function Ff(t, e, l) {
    t.flags |= 16384, t = { getSnapshot: e, value: l }, e = St.updateQueue, e === null ? (e = Ri(), St.updateQueue = e, e.stores = [t]) : (l = e.stores, l === null ? e.stores = [t] : l.push(t));
  }
  function Wf(t, e, l, a) {
    e.value = l, e.getSnapshot = a, Pf(e) && td(t);
  }
  function If(t, e, l) {
    return l(function() {
      Pf(e) && td(t);
    });
  }
  function Pf(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var l = e();
      return !Ve(t, l);
    } catch {
      return !0;
    }
  }
  function td(t) {
    var e = wa(t, 2);
    e !== null && Ye(e, t, 2);
  }
  function js(t) {
    var e = Ae();
    if (typeof t == "function") {
      var l = t;
      if (t = l(), Qa) {
        $l(!0);
        try {
          l();
        } finally {
          $l(!1);
        }
      }
    }
    return e.memoizedState = e.baseState = t, e.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Gl,
      lastRenderedState: t
    }, e;
  }
  function ed(t, e, l, a) {
    return t.baseState = l, As(
      t,
      Ft,
      typeof a == "function" ? a : Gl
    );
  }
  function Gv(t, e, l, a, n) {
    if (Hi(t)) throw Error(s(485));
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
      K.T !== null ? l(!0) : u.isTransition = !1, a(u), l = e.pending, l === null ? (u.next = e.pending = u, ld(e, u)) : (u.next = l.next, e.pending = l.next = u);
    }
  }
  function ld(t, e) {
    var l = e.action, a = e.payload, n = t.state;
    if (e.isTransition) {
      var u = K.T, i = {};
      i.types = u !== null ? u.types : null, K.T = i;
      try {
        var o = l(n, a), g = K.S;
        g !== null && g(i, o), ad(t, e, o);
      } catch (N) {
        Rs(t, e, N);
      } finally {
        u !== null && i.types !== null && (u.types = i.types), K.T = u;
      }
    } else
      try {
        u = l(n, a), ad(t, e, u);
      } catch (N) {
        Rs(t, e, N);
      }
  }
  function ad(t, e, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(a) {
        nd(t, e, a);
      },
      function(a) {
        return Rs(t, e, a);
      }
    ) : nd(t, e, l);
  }
  function nd(t, e, l) {
    e.status = "fulfilled", e.value = l, ud(e), t.state = l, e = t.pending, e !== null && (l = e.next, l === e ? t.pending = null : (l = l.next, e.next = l, ld(t, l)));
  }
  function Rs(t, e, l) {
    var a = t.pending;
    if (t.pending = null, a !== null) {
      a = a.next;
      do
        e.status = "rejected", e.reason = l, ud(e), e = e.next;
      while (e !== a);
    }
    t.action = null;
  }
  function ud(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function id(t, e) {
    return e;
  }
  function cd(t, e) {
    if (xt) {
      var l = Wt.formState;
      if (l !== null) {
        t: {
          var a = St;
          if (xt) {
            if (It) {
              e: {
                for (var n = It, u = ll; n.nodeType !== 8; ) {
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
                It = nl(
                  n.nextSibling
                ), a = n.data === "F!";
                break t;
              }
            }
            Pl(a);
          }
          a = !1;
        }
        a && (e = l[0]);
      }
    }
    return l = Ae(), l.memoizedState = l.baseState = e, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: id,
      lastRenderedState: e
    }, l.queue = a, l = Md.bind(
      null,
      St,
      a
    ), a.dispatch = l, a = js(!1), u = Ls.bind(
      null,
      St,
      !1,
      a.queue
    ), a = Ae(), n = {
      state: e,
      dispatch: null,
      action: t,
      pending: null
    }, a.queue = n, l = Gv.bind(
      null,
      St,
      n,
      u,
      l
    ), n.dispatch = l, a.memoizedState = t, [e, l, !1];
  }
  function sd(t) {
    var e = ue();
    return rd(e, Ft, t);
  }
  function rd(t, e, l) {
    if (e = As(
      t,
      e,
      id
    )[0], t = Di(Gl)[0], typeof e == "object" && e !== null && typeof e.then == "function")
      try {
        var a = _u(e);
      } catch (i) {
        throw i === _n ? Ni : i;
      }
    else a = e;
    e = ue();
    var n = e.queue, u = n.dispatch;
    return l !== e.memoizedState && (St.flags |= 2048, xn(
      9,
      { destroy: void 0 },
      Xv.bind(null, n, l),
      null
    )), [a, u, t];
  }
  function Xv(t, e) {
    t.action = e;
  }
  function od(t) {
    var e = ue(), l = Ft;
    if (l !== null)
      return rd(e, l, t);
    ue(), e = e.memoizedState, l = ue();
    var a = l.queue.dispatch;
    return l.memoizedState = t, [e, a, !1];
  }
  function xn(t, e, l, a) {
    return t = { tag: t, create: l, deps: a, inst: e, next: null }, e = St.updateQueue, e === null && (e = Ri(), St.updateQueue = e), l = e.lastEffect, l === null ? e.lastEffect = t.next = t : (a = l.next, l.next = t, t.next = a, e.lastEffect = t), t;
  }
  function fd() {
    return ue().memoizedState;
  }
  function Ui(t, e, l, a) {
    var n = Ae();
    St.flags |= t, n.memoizedState = xn(
      1 | e,
      { destroy: void 0 },
      l,
      a === void 0 ? null : a
    );
  }
  function Bi(t, e, l, a) {
    var n = ue();
    a = a === void 0 ? null : a;
    var u = n.memoizedState.inst;
    Ft !== null && a !== null && Ts(a, Ft.memoizedState.deps) ? n.memoizedState = xn(e, u, l, a) : (St.flags |= t, n.memoizedState = xn(
      1 | e,
      u,
      l,
      a
    ));
  }
  function dd(t, e) {
    Ui(8390656, 8, t, e);
  }
  function ws(t, e) {
    Bi(2048, 8, t, e);
  }
  function Vv(t) {
    St.flags |= 4;
    var e = St.updateQueue;
    if (e === null)
      e = Ri(), St.updateQueue = e, e.events = [t];
    else {
      var l = e.events;
      l === null ? e.events = [t] : l.push(t);
    }
  }
  function md(t) {
    var e = ue().memoizedState;
    return Vv({ ref: e, nextImpl: t }), function() {
      if ((qt & 2) !== 0) throw Error(s(440));
      return e.impl.apply(void 0, arguments);
    };
  }
  function hd(t, e) {
    return Bi(4, 2, t, e);
  }
  function vd(t, e) {
    return Bi(4, 4, t, e);
  }
  function gd(t, e) {
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
  function yd(t, e, l) {
    l = l != null ? l.concat([t]) : null, Bi(4, 4, gd.bind(null, e, t), l);
  }
  function Ds() {
  }
  function bd(t, e) {
    var l = ue();
    e = e === void 0 ? null : e;
    var a = l.memoizedState;
    return e !== null && Ts(e, a[1]) ? a[0] : (l.memoizedState = [t, e], t);
  }
  function pd(t, e) {
    var l = ue();
    e = e === void 0 ? null : e;
    var a = l.memoizedState;
    if (e !== null && Ts(e, a[1]))
      return a[0];
    if (a = t(), Qa) {
      $l(!0);
      try {
        t();
      } finally {
        $l(!1);
      }
    }
    return l.memoizedState = [a, e], a;
  }
  function Us(t, e, l) {
    return l === void 0 || (ql & 1073741824) !== 0 && (Rt & 261930) === 0 ? t.memoizedState = e : (t.memoizedState = l, t = Am(), St.lanes |= t, fa |= t, l);
  }
  function Sd(t, e, l, a) {
    return Ve(l, e) ? l : ua.current !== null ? (t = Us(t, l, a), Ve(t, e) || (re = !0), t) : (ql & 106) === 0 || (ql & 1073741824) !== 0 && (Rt & 261930) === 0 ? (re = !0, t.memoizedState = l) : (t = Am(), St.lanes |= t, fa |= t, e);
  }
  function _d(t, e, l, a, n) {
    var u = lt.p;
    lt.p = u !== 0 && 8 > u ? u : 8;
    var i = K.T, o = {};
    o.types = i !== null ? i.types : null, K.T = o, Ls(t, !1, e, l);
    try {
      var g = n(), N = K.S;
      if (N !== null && N(o, g), g !== null && typeof g == "object" && typeof g.then == "function") {
        var z = Lv(
          g,
          a
        );
        Eu(
          t,
          e,
          z,
          $e(t)
        );
      } else
        Eu(
          t,
          e,
          a,
          $e(t)
        );
    } catch (H) {
      Eu(
        t,
        e,
        { then: function() {
        }, status: "rejected", reason: H },
        $e()
      );
    } finally {
      lt.p = u, i !== null && o.types !== null && (i.types = o.types), K.T = i;
    }
  }
  function Qv() {
  }
  function Bs(t, e, l, a) {
    if (t.tag !== 5) throw Error(s(476));
    var n = Ed(t).queue;
    _d(
      t,
      n,
      e,
      $t,
      l === null ? Qv : function() {
        return Td(t), l(a);
      }
    );
  }
  function Ed(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: $t,
      baseState: $t,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Gl,
        lastRenderedState: $t
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
        lastRenderedReducer: Gl,
        lastRenderedState: l
      },
      next: null
    }, t.memoizedState = e, t = t.alternate, t !== null && (t.memoizedState = e), e;
  }
  function Td(t) {
    var e = Ed(t);
    e.next === null && (e = t.alternate.memoizedState), Eu(
      t,
      e.next.queue,
      {},
      $e()
    );
  }
  function Hs() {
    return Se(Qn);
  }
  function Nd() {
    return ue().memoizedState;
  }
  function xd() {
    return ue().memoizedState;
  }
  function Zv(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var l = $e();
          t = aa(l);
          var a = na(e, t, l);
          a !== null && (Ye(a, e, l), gu(a, e, l)), e = { cache: fs() }, t.payload = e;
          return;
      }
      e = e.return;
    }
  }
  function Kv(t, e, l) {
    var a = $e();
    l = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Hi(t) ? Od(e, l) : (l = ls(t, e, l, a), l !== null && (Ye(l, t, a), zd(l, e, a)));
  }
  function Md(t, e, l) {
    var a = $e();
    Eu(t, e, l, a);
  }
  function Eu(t, e, l, a) {
    var n = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Hi(t)) Od(e, n);
    else {
      var u = t.alternate;
      if (t.lanes === 0 && (u === null || u.lanes === 0) && (u = e.lastRenderedReducer, u !== null))
        try {
          var i = e.lastRenderedState, o = u(i, l);
          if (n.hasEagerState = !0, n.eagerState = o, Ve(o, i))
            return hi(t, e, n, 0), Wt === null && mi(), !1;
        } catch {
        }
      if (l = ls(t, e, n, a), l !== null)
        return Ye(l, t, a), zd(l, e, a), !0;
    }
    return !1;
  }
  function Ls(t, e, l, a) {
    if (a = {
      lane: 2,
      revertLane: zr(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Hi(t)) {
      if (e) throw Error(s(479));
    } else
      e = ls(
        t,
        l,
        a,
        2
      ), e !== null && Ye(e, t, 2);
  }
  function Hi(t) {
    var e = t.alternate;
    return t === St || e !== null && e === St;
  }
  function Od(t, e) {
    Tn = Ci = !0;
    var l = t.pending;
    l === null ? e.next = e : (e.next = l.next, l.next = e), t.pending = e;
  }
  function zd(t, e, l) {
    if ((l & 4194048) !== 0) {
      var a = e.lanes;
      a &= t.pendingLanes, l |= a, e.lanes = l, zo(t, l);
    }
  }
  var Li = {
    readContext: Se,
    use: wi,
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
  }, Ad = {
    readContext: Se,
    use: wi,
    useCallback: function(t, e) {
      return Ae().memoizedState = [
        t,
        e === void 0 ? null : e
      ], t;
    },
    useContext: Se,
    useEffect: dd,
    useImperativeHandle: function(t, e, l) {
      l = l != null ? l.concat([t]) : null, Ui(
        4194308,
        4,
        gd.bind(null, e, t),
        l
      );
    },
    useLayoutEffect: function(t, e) {
      return Ui(4194308, 4, t, e);
    },
    useInsertionEffect: function(t, e) {
      Ui(4, 2, t, e);
    },
    useMemo: function(t, e) {
      var l = Ae();
      e = e === void 0 ? null : e;
      var a = t();
      if (Qa) {
        $l(!0);
        try {
          t();
        } finally {
          $l(!1);
        }
      }
      return l.memoizedState = [a, e], a;
    },
    useReducer: function(t, e, l) {
      var a = Ae();
      if (l !== void 0) {
        var n = l(e);
        if (Qa) {
          $l(!0);
          try {
            l(e);
          } finally {
            $l(!1);
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
        St,
        t
      ), [a.memoizedState, t];
    },
    useRef: function(t) {
      var e = Ae();
      return t = { current: t }, e.memoizedState = t;
    },
    useState: function(t) {
      t = js(t);
      var e = t.queue, l = Md.bind(null, St, e);
      return e.dispatch = l, [t.memoizedState, l];
    },
    useDebugValue: Ds,
    useDeferredValue: function(t, e) {
      var l = Ae();
      return Us(l, t, e);
    },
    useTransition: function() {
      var t = js(!1);
      return t = _d.bind(
        null,
        St,
        t.queue,
        !0,
        !1
      ), Ae().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, e, l) {
      var a = St, n = Ae();
      if (xt) {
        if (l === void 0)
          throw Error(s(407));
        l = l();
      } else {
        if (l = e(), Wt === null)
          throw Error(s(349));
        (Rt & 127) !== 0 || Ff(a, e, l);
      }
      n.memoizedState = l;
      var u = { value: l, getSnapshot: e };
      return n.queue = u, dd(If.bind(null, a, u, t), [
        t
      ]), a.flags |= 2048, xn(
        9,
        { destroy: void 0 },
        Wf.bind(
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
      var t = Ae(), e = Wt.identifierPrefix;
      if (xt) {
        var l = yl, a = gl;
        l = (a & ~(1 << 32 - Ge(a) - 1)).toString(32) + l, e = "_" + e + "R_" + l, l = ji++, 0 < l && (e += "H" + l.toString(32)), e += "_";
      } else
        l = Yv++, e = "_" + e + "r_" + l.toString(32) + "_";
      return t.memoizedState = e;
    },
    useHostTransitionStatus: Hs,
    useFormState: cd,
    useActionState: cd,
    useOptimistic: function(t) {
      var e = Ae();
      e.memoizedState = e.baseState = t;
      var l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return e.queue = l, e = Ls.bind(
        null,
        St,
        !0,
        l
      ), l.dispatch = e, [t, e];
    },
    useMemoCache: zs,
    useCacheRefresh: function() {
      return Ae().memoizedState = Zv.bind(
        null,
        St
      );
    },
    useEffectEvent: function(t) {
      var e = Ae(), l = { impl: t };
      return e.memoizedState = l, function() {
        if ((qt & 2) !== 0)
          throw Error(s(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, Cd = {
    readContext: Se,
    use: wi,
    useCallback: bd,
    useContext: Se,
    useEffect: ws,
    useImperativeHandle: yd,
    useInsertionEffect: hd,
    useLayoutEffect: vd,
    useMemo: pd,
    useReducer: Di,
    useRef: fd,
    useState: function() {
      return Di(Gl);
    },
    useDebugValue: Ds,
    useDeferredValue: function(t, e) {
      var l = ue();
      return Sd(
        l,
        Ft.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = Di(Gl)[0], e = ue().memoizedState;
      return [
        typeof t == "boolean" ? t : _u(t),
        e
      ];
    },
    useSyncExternalStore: kf,
    useId: Nd,
    useHostTransitionStatus: Hs,
    useFormState: sd,
    useActionState: sd,
    useOptimistic: function(t, e) {
      var l = ue();
      return ed(l, Ft, t, e);
    },
    useMemoCache: zs,
    useCacheRefresh: xd,
    useEffectEvent: md
  }, Jv = {
    readContext: Se,
    use: wi,
    useCallback: bd,
    useContext: Se,
    useEffect: ws,
    useImperativeHandle: yd,
    useInsertionEffect: hd,
    useLayoutEffect: vd,
    useMemo: pd,
    useReducer: Cs,
    useRef: fd,
    useState: function() {
      return Cs(Gl);
    },
    useDebugValue: Ds,
    useDeferredValue: function(t, e) {
      var l = ue();
      return Ft === null ? Us(l, t, e) : Sd(
        l,
        Ft.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = Cs(Gl)[0], e = ue().memoizedState;
      return [
        typeof t == "boolean" ? t : _u(t),
        e
      ];
    },
    useSyncExternalStore: kf,
    useId: Nd,
    useHostTransitionStatus: Hs,
    useFormState: od,
    useActionState: od,
    useOptimistic: function(t, e) {
      var l = ue();
      return Ft !== null ? ed(l, Ft, t, e) : (l.baseState = t, [t, l.queue.dispatch]);
    },
    useMemoCache: zs,
    useCacheRefresh: xd,
    useEffectEvent: md
  };
  function Ys(t, e, l, a) {
    e = t.memoizedState, l = l(a, e), l = l == null ? e : Z({}, e, l), t.memoizedState = l, t.lanes === 0 && (t.updateQueue.baseState = l);
  }
  var qs = {
    enqueueSetState: function(t, e, l) {
      t = t._reactInternals;
      var a = $e(), n = aa(a);
      n.payload = e, l != null && (n.callback = l), e = na(t, n, a), e !== null && (Ye(e, t, a), gu(e, t, a));
    },
    enqueueReplaceState: function(t, e, l) {
      t = t._reactInternals;
      var a = $e(), n = aa(a);
      n.tag = 1, n.payload = e, l != null && (n.callback = l), e = na(t, n, a), e !== null && (Ye(e, t, a), gu(e, t, a));
    },
    enqueueForceUpdate: function(t, e) {
      t = t._reactInternals;
      var l = $e(), a = aa(l);
      a.tag = 2, e != null && (a.callback = e), e = na(t, a, l), e !== null && (Ye(e, t, l), gu(e, t, l));
    }
  };
  function jd(t, e, l, a, n, u, i) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(a, u, i) : e.prototype && e.prototype.isPureReactComponent ? !su(l, a) || !su(n, u) : !0;
  }
  function Rd(t, e, l, a) {
    t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(l, a), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(l, a), e.state !== t && qs.enqueueReplaceState(e, e.state, null);
  }
  function Za(t, e) {
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
  function wd(t) {
    di(t);
  }
  function Dd(t) {
    console.error(t);
  }
  function Ud(t) {
    di(t);
  }
  function Yi(t, e) {
    try {
      var l = t.onUncaughtError;
      l(e.value, { componentStack: e.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function Bd(t, e, l) {
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
  function Gs(t, e, l) {
    return l = aa(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      Yi(t, e);
    }, l;
  }
  function Hd(t) {
    return t = aa(t), t.tag = 3, t;
  }
  function Ld(t, e, l, a) {
    var n = l.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var u = a.value;
      t.payload = function() {
        return n(u);
      }, t.callback = function() {
        Bd(e, l, a);
      };
    }
    var i = l.stateNode;
    i !== null && typeof i.componentDidCatch == "function" && (t.callback = function() {
      Bd(e, l, a), typeof n != "function" && (da === null ? da = /* @__PURE__ */ new Set([this]) : da.add(this));
      var o = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: o !== null ? o : ""
      });
    });
  }
  function $v(t, e, l, a, n) {
    if (l.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (e = l.alternate, e !== null && Ha(
        e,
        l,
        n,
        !0
      ), l = _e.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
          case 19:
            return Me === null ? ic() : l.alternate === null && ne === 0 && (ne = 3), l.flags &= -257, l.flags |= 65536, l.lanes = n, a === xi ? l.flags |= 16384 : (e = l.updateQueue, e === null ? l.updateQueue = /* @__PURE__ */ new Set([a]) : e.add(a), xr(t, a, n)), !1;
          case 22:
            return l.flags |= 65536, a === xi ? l.flags |= 16384 : (e = l.updateQueue, e === null ? (e = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, l.updateQueue = e) : (l = e.retryQueue, l === null ? e.retryQueue = /* @__PURE__ */ new Set([a]) : l.add(a)), xr(t, a, n)), !1;
        }
        throw Error(s(435, l.tag));
      }
      return xr(t, a, n), ic(), !1;
    }
    if (xt)
      return e = _e.current, e !== null ? ((e.flags & 65536) === 0 && (e.flags |= 256), e.flags |= 65536, e.lanes = n, a !== cs && (t = Error(s(422), { cause: a }), fu(Pe(t, l)))) : (a !== cs && (e = Error(s(423), {
        cause: a
      }), fu(
        Pe(e, l)
      )), t = t.current.alternate, t.flags |= 65536, n &= -n, t.lanes |= n, a = Pe(a, l), n = Gs(
        t.stateNode,
        a,
        n
      ), ys(t, n), ne !== 4 && (ne = 2)), !1;
    var u = Error(s(520), { cause: a });
    if (u = Pe(u, l), Cu === null ? Cu = [u] : Cu.push(u), ne !== 4 && (ne = 2), e === null) return !0;
    a = Pe(a, l), l = e;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, t = n & -n, l.lanes |= t, t = Gs(l.stateNode, a, t), ys(l, t), !1;
        case 1:
          if (e = l.type, u = l.stateNode, (l.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (da === null || !da.has(u))))
            return l.flags |= 65536, n &= -n, l.lanes |= n, n = Hd(n), Ld(
              n,
              t,
              l,
              a
            ), ys(l, n), !1;
          break;
        case 22:
          if (l.memoizedState !== null)
            return l.flags |= 65536, !1;
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var Xs = Error(s(461)), re = !1;
  function de(t, e, l, a) {
    e.child = t === null ? Xf(e, null, l, a) : Va(
      e,
      t.child,
      l,
      a
    );
  }
  function Yd(t, e, l, a, n) {
    l = l.render;
    var u = e.ref;
    if ("ref" in a) {
      var i = {};
      for (var o in a)
        o !== "ref" && (i[o] = a[o]);
    } else i = a;
    return La(e), a = Ns(
      t,
      e,
      l,
      i,
      u,
      n
    ), o = xs(), t !== null && !re ? (Ms(t, e, n), Xl(t, e, n)) : (xt && o && bi(e), e.flags |= 1, de(t, e, a, n), e.child);
  }
  function qd(t, e, l, a, n) {
    if (t === null) {
      var u = l.type;
      return typeof u == "function" && !as(u) && u.defaultProps === void 0 && l.compare === null ? (e.tag = 15, e.type = u, Gd(
        t,
        e,
        u,
        a,
        n
      )) : (t = gi(
        l.type,
        null,
        a,
        e,
        e.mode,
        n
      ), t.ref = e.ref, t.return = e, e.child = t);
    }
    if (u = t.child, !Fs(t, n)) {
      var i = u.memoizedProps;
      if (l = l.compare, l = l !== null ? l : su, l(i, a) && t.ref === e.ref)
        return Xl(t, e, n);
    }
    return e.flags |= 1, t = Bl(u, a), t.ref = e.ref, t.return = e, e.child = t;
  }
  function Gd(t, e, l, a, n) {
    if (t !== null) {
      var u = t.memoizedProps;
      if (su(u, a) && t.ref === e.ref)
        if (re = !1, e.pendingProps = a = u, Fs(t, n))
          (t.flags & 131072) !== 0 && (re = !0);
        else
          return e.lanes = t.lanes, Xl(t, e, n);
    }
    return Vs(
      t,
      e,
      l,
      a,
      n
    );
  }
  function Xd(t, e, l, a) {
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
        return Vd(
          t,
          e,
          u,
          l,
          a
        );
      }
      if ((l & 536870912) !== 0)
        e.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Ti(
          e,
          u !== null ? u.cachePool : null
        ), u !== null ? Zf(e, u) : ps(), Kf(e);
      else
        return a = e.lanes = 536870912, Vd(
          t,
          e,
          u !== null ? u.baseLanes | l : l,
          l,
          a
        );
    } else
      u !== null ? (Ti(e, u.cachePool), Zf(e, u), ca(), e.memoizedState = null) : (t !== null && Ti(e, null), ps(), ca());
    return de(t, e, n, l), e.child;
  }
  function Tu(t, e) {
    return t !== null && t.tag === 22 || e.stateNode !== null || (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), e.sibling;
  }
  function Vd(t, e, l, a, n) {
    var u = ms();
    return u = u === null ? null : { parent: ce._currentValue, pool: u }, e.memoizedState = {
      baseLanes: l,
      cachePool: u
    }, t !== null && Ti(e, null), ps(), Kf(e), t !== null && Ha(t, e, a, !0), e.childLanes = n, null;
  }
  function qi(t, e) {
    return e = Gi(
      { mode: e.mode, children: e.children },
      t.mode
    ), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function Qd(t, e, l) {
    return Va(e, t.child, null, l), t = qi(e, e.pendingProps), t.flags |= 2, Qe(e), e.memoizedState = null, t;
  }
  function kv(t, e, l) {
    var a = e.pendingProps, n = (e.flags & 128) !== 0;
    if (e.flags &= -129, t === null) {
      if (xt) {
        if (a.mode === "hidden")
          return t = qi(e, a), e.lanes = 536870912, t.memoizedState = { baseLanes: 0, cachePool: null }, Tu(null, t);
        if (_s(e), (t = It) ? (t = gh(
          t,
          ll
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: Wl !== null ? { id: gl, overflow: yl } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = Of(t), l.return = e, e.child = l, ge = e, It = null)) : t = null, t === null) throw Pl(e);
        return e.lanes = 536870912, null;
      }
      return qi(e, a);
    }
    var u = t.memoizedState;
    if (u !== null) {
      var i = u.dehydrated;
      if (_s(e), n)
        if (e.flags & 256)
          e.flags &= -257, e = Qd(
            t,
            e,
            l
          );
        else if (e.memoizedState !== null)
          e.child = t.child, e.flags |= 128, e = null;
        else throw Error(s(558));
      else if (re || Ha(t, e, l, !1), n = (l & t.childLanes) !== 0, re || n) {
        if (ua.current === null) {
          if (a = Wt, a !== null && (i = Ao(a, l), i !== 0 && i !== u.retryLane))
            throw u.retryLane = i, wa(t, i), Ye(a, t, i), Xs;
          ic();
        }
        e = Qd(
          t,
          e,
          l
        );
      } else
        t = u.treeContext, It = nl(i.nextSibling), ge = e, xt = !0, Il = null, ll = !1, t !== null && Cf(e, t), e = qi(e, a), e.flags |= 134221824;
      return e;
    }
    return t = Bl(t.child, {
      mode: a.mode,
      children: a.children
    }), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Mn(t, e) {
    var l = e.ref;
    if (l === null)
      t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object")
        throw Error(s(284));
      (t === null || t.ref !== l) && (e.flags |= 4194816);
    }
  }
  function Vs(t, e, l, a, n) {
    return La(e), l = Ns(
      t,
      e,
      l,
      a,
      void 0,
      n
    ), a = xs(), t !== null && !re ? (Ms(t, e, n), Xl(t, e, n)) : (xt && a && bi(e), e.flags |= 1, de(t, e, l, n), e.child);
  }
  function Zd(t, e, l, a, n, u) {
    return La(e), e.updateQueue = null, l = $f(
      e,
      a,
      l,
      n
    ), Jf(t), a = xs(), t !== null && !re ? (Ms(t, e, u), Xl(t, e, u)) : (xt && a && bi(e), e.flags |= 1, de(t, e, l, u), e.child);
  }
  function Kd(t, e, l, a, n) {
    if (La(e), e.stateNode === null) {
      var u = gn, i = l.contextType;
      typeof i == "object" && i !== null && (u = Se(i)), u = new l(a, u), e.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = qs, e.stateNode = u, u._reactInternals = e, u = e.stateNode, u.props = a, u.state = e.memoizedState, u.refs = {}, vs(e), i = l.contextType, u.context = typeof i == "object" && i !== null ? Se(i) : gn, u.state = e.memoizedState, i = l.getDerivedStateFromProps, typeof i == "function" && (Ys(
        e,
        l,
        i,
        a
      ), u.state = e.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (i = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), i !== u.state && qs.enqueueReplaceState(u, u.state, null), bu(e, a, u, n), yu(), u.state = e.memoizedState), typeof u.componentDidMount == "function" && (e.flags |= 4194308), a = !0;
    } else if (t === null) {
      u = e.stateNode;
      var o = e.memoizedProps, g = Za(l, o);
      u.props = g;
      var N = u.context, z = l.contextType;
      i = gn, typeof z == "object" && z !== null && (i = Se(z));
      var H = l.getDerivedStateFromProps;
      z = typeof H == "function" || typeof u.getSnapshotBeforeUpdate == "function", o = e.pendingProps !== o, z || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (o || N !== i) && Rd(
        e,
        u,
        a,
        i
      ), la = !1;
      var _ = e.memoizedState;
      u.state = _, bu(e, a, u, n), yu(), N = e.memoizedState, o || _ !== N || la ? (typeof H == "function" && (Ys(
        e,
        l,
        H,
        a
      ), N = e.memoizedState), (g = la || jd(
        e,
        l,
        g,
        a,
        _,
        N,
        i
      )) ? (z || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = a, e.memoizedState = N), u.props = a, u.state = N, u.context = i, a = g) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), a = !1);
    } else {
      u = e.stateNode, gs(t, e), i = e.memoizedProps, z = Za(l, i), u.props = z, H = e.pendingProps, _ = u.context, N = l.contextType, g = gn, typeof N == "object" && N !== null && (g = Se(N)), o = l.getDerivedStateFromProps, (N = typeof o == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (i !== H || _ !== g) && Rd(
        e,
        u,
        a,
        g
      ), la = !1, _ = e.memoizedState, u.state = _, bu(e, a, u, n), yu();
      var O = e.memoizedState;
      i !== H || _ !== O || la || t !== null && t.dependencies !== null && _i(t.dependencies) ? (typeof o == "function" && (Ys(
        e,
        l,
        o,
        a
      ), O = e.memoizedState), (z = la || jd(
        e,
        l,
        z,
        a,
        _,
        O,
        g
      ) || t !== null && t.dependencies !== null && _i(t.dependencies)) ? (N || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(a, O, g), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        a,
        O,
        g
      )), typeof u.componentDidUpdate == "function" && (e.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && _ === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && _ === t.memoizedState || (e.flags |= 1024), e.memoizedProps = a, e.memoizedState = O), u.props = a, u.state = O, u.context = g, a = z) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && _ === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && _ === t.memoizedState || (e.flags |= 1024), a = !1);
    }
    return u = a, Mn(t, e), a = (e.flags & 128) !== 0, u || a ? (u = e.stateNode, l = a && typeof l.getDerivedStateFromError != "function" ? null : u.render(), e.flags |= 1, t !== null && a ? (e.child = Va(
      e,
      t.child,
      null,
      n
    ), e.child = Va(
      e,
      null,
      l,
      n
    )) : de(t, e, l, n), e.memoizedState = u.state, t = e.child) : t = Xl(
      t,
      e,
      n
    ), t;
  }
  function Jd(t, e, l, a) {
    return Ua(), e.flags |= 256, de(t, e, l, a), e.child;
  }
  var Qs = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Zs(t) {
    return { baseLanes: t, cachePool: Bf() };
  }
  function Ks(t, e, l) {
    return t = t !== null ? t.childLanes & ~l : 0, e && (t |= Je), t;
  }
  function $d(t, e, l) {
    var a = e.pendingProps, n = !1, u = (e.flags & 128) !== 0, i;
    if ((i = u) || (i = t !== null && t.memoizedState === null ? !1 : (Ee.current & 2) !== 0), i && (n = !0, e.flags &= -129), i = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
      if (xt) {
        if (n ? ia(e) : ca(), (t = It) ? (t = gh(
          t,
          ll
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: Wl !== null ? { id: gl, overflow: yl } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = Of(t), l.return = e, e.child = l, ge = e, It = null)) : t = null, t === null) throw Pl(e);
        return Zr(t) ? e.lanes = 32 : e.lanes = 536870912, null;
      }
      return u = a.children, a = a.fallback, n ? (ca(), n = e.mode, u = Gi(
        { mode: "hidden", children: u },
        n
      ), a = Da(
        a,
        n,
        l,
        null
      ), u.return = e, a.return = e, u.sibling = a, e.child = u, a = e.child, a.memoizedState = Zs(l), a.childLanes = Ks(
        t,
        i,
        l
      ), e.memoizedState = Qs, Tu(null, a)) : (ia(e), Js(e, u));
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
    return n ? (ca(), n = a.fallback, u = e.mode, o = t.child, g = o.sibling, a = Bl(o, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = o.subtreeFlags & 1206910976, g !== null ? n = Bl(g, n) : (n = Da(
      n,
      u,
      l,
      null
    ), n.flags |= 2), n.return = e, a.return = e, a.sibling = n, e.child = a, Tu(null, a), a = e.child, n = t.child.memoizedState, n === null ? n = Zs(l) : (u = n.cachePool, u !== null ? (o = ce._currentValue, u = u.parent !== o ? { parent: o, pool: o } : u) : u = Bf(), n = {
      baseLanes: n.baseLanes | l,
      cachePool: u
    }), a.memoizedState = n, a.childLanes = Ks(
      t,
      i,
      l
    ), e.memoizedState = Qs, Tu(t.child, a)) : (ia(e), l = t.child, t = l.sibling, l = Bl(l, {
      mode: "visible",
      children: a.children
    }), l.return = e, l.sibling = null, t !== null && (i = e.deletions, i === null ? (e.deletions = [t], e.flags |= 16) : i.push(t)), e.child = l, e.memoizedState = null, l);
  }
  function Js(t, e) {
    return e = Gi(
      { mode: "visible", children: e },
      t.mode
    ), e.return = t, t.child = e;
  }
  function Gi(t, e) {
    return t = Ue(22, t, null, e), t.lanes = 0, t;
  }
  function Xi(t, e, l) {
    return Va(e, t.child, null, l), t = Js(
      e,
      e.pendingProps.children
    ), t.flags |= 2, e.memoizedState = null, t;
  }
  function Fv(t, e, l, a, n, u, i, o) {
    if (l)
      return e.flags & 256 ? (ia(e), e.flags &= -257, Xi(
        t,
        e,
        o
      )) : e.memoizedState !== null ? (ca(), e.child = t.child, e.flags |= 128, null) : (ca(), u = n.fallback, i = e.mode, n = Gi(
        { mode: "visible", children: n.children },
        i
      ), u = Da(
        u,
        i,
        o,
        null
      ), u.flags |= 2, n.return = e, u.return = e, n.sibling = u, e.child = n, Va(e, t.child, null, o), n = e.child, n.memoizedState = Zs(o), n.childLanes = Ks(
        t,
        a,
        o
      ), e.memoizedState = Qs, Tu(null, n));
    if (ia(e), Zr(u)) {
      if (a = u.nextSibling && u.nextSibling.dataset, a) var g = a.dgst;
      return a = g, a !== "" && (n = Error(s(419)), n.stack = "", n.digest = a, fu({ value: n, source: null, stack: null })), Xi(
        t,
        e,
        o
      );
    }
    if (re || Ha(t, e, o, !1), a = (o & t.childLanes) !== 0, re || a) {
      if (ua.current !== null)
        return Xi(
          t,
          e,
          o
        );
      if (a = Wt, a !== null && (n = Ao(
        a,
        o
      ), n !== 0 && n !== i.retryLane))
        throw i.retryLane = n, wa(t, n), Ye(a, t, n), Xs;
      return Qr(u) || ic(), Xi(
        t,
        e,
        o
      );
    }
    return Qr(u) ? (e.flags |= 192, e.child = t.child, null) : (t = i.treeContext, It = nl(u.nextSibling), ge = e, xt = !0, Il = null, ll = !1, t !== null && Cf(e, t), e = Js(
      e,
      n.children
    ), e.flags |= 134221824, e);
  }
  function kd(t, e, l) {
    t.lanes |= e;
    var a = t.alternate;
    a !== null && (a.lanes |= e), Si(t.return, e, l);
  }
  function Fd(t) {
    for (var e = null; t !== null; ) {
      var l = t.alternate;
      l !== null && Ai(l) === null && (e = t), t = t.sibling;
    }
    return e;
  }
  function Vi(t, e, l, a, n, u) {
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
  function $s(t) {
    var e = t.child;
    for (t.child = null; e !== null; ) {
      var l = e.sibling;
      e.sibling = t.child, t.child = e, e = l;
    }
  }
  function ks(t, e, l) {
    var a = e.pendingProps, n = a.revealOrder, u = a.tail;
    a = a.children;
    var i = Ee.current;
    if (e.flags & 128)
      return pu(e, i), null;
    var o = (i & 2) !== 0;
    if (o ? (i = i & 1 | 2, e.flags |= 128) : i &= 1, pu(e, i), n === "backwards" && t !== null ? ($s(t), de(t, e, a, l), $s(t)) : de(t, e, a, l), a = xt ? ou : 0, !o && t !== null && (t.flags & 128) !== 0)
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && kd(t, l, e);
        else if (t.tag === 19)
          kd(t, l, e);
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
        l = Fd(e.child), l === null ? (n = e.child, e.child = null) : (n = l.sibling, l.sibling = null, $s(e)), Vi(
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
          if (t = n.alternate, t !== null && Ai(t) === null) {
            e.child = n;
            break;
          }
          t = n.sibling, n.sibling = l, l = n, n = t;
        }
        Vi(
          e,
          !0,
          l,
          null,
          u,
          a
        );
        break;
      case "together":
        Vi(
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
        l = Fd(e.child), l === null ? (n = e.child, e.child = null) : (n = l.sibling, l.sibling = null), Vi(
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
  function Wd(t, e, l) {
    var a = e.pendingProps;
    return ta(e, e.type, a.value), de(t, e, a.children, l), e.child;
  }
  function Xl(t, e, l) {
    if (t !== null && (e.dependencies = t.dependencies), fa |= e.lanes, (l & e.childLanes) === 0)
      if (t !== null) {
        if (Ha(
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
      for (t = e.child, l = Bl(t, t.pendingProps), e.child = l, l.return = e; t.sibling !== null; )
        t = t.sibling, l = l.sibling = Bl(t, t.pendingProps), l.return = e;
      l.sibling = null;
    }
    return e.child;
  }
  function Fs(t, e) {
    return (t.lanes & e) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && _i(t)));
  }
  function Wv(t, e, l) {
    switch (e.tag) {
      case 3:
        fe(e, e.stateNode.containerInfo), ta(e, ce, t.memoizedState.cache), Ua();
        break;
      case 27:
      case 5:
        zl(e);
        break;
      case 4:
        fe(e, e.stateNode.containerInfo);
        break;
      case 10:
        ta(
          e,
          e.type,
          e.memoizedProps.value
        );
        break;
      case 31:
        if (e.memoizedState !== null)
          return e.flags |= 128, _s(e), null;
        break;
      case 13:
        var a = e.memoizedState;
        if (a !== null) {
          if (a.dehydrated !== null)
            return ia(e), e.flags |= 128, null;
          a = Ha(
            t,
            e,
            l,
            !1
          );
          var n = e.child.childLanes;
          return a || (l & n) !== 0 ? $d(t, e, l) : (ia(e), t = Xl(
            t,
            e,
            l
          ), t !== null ? t.sibling : null);
        }
        ia(e);
        break;
      case 19:
        if (e.flags & 128)
          return ks(
            t,
            e,
            l
          );
        if (n = (t.flags & 128) !== 0, a = (l & e.childLanes) !== 0, a || (Ha(
          t,
          e,
          l,
          !1
        ), a = (l & e.childLanes) !== 0), n) {
          if (a)
            return ks(
              t,
              e,
              l
            );
          e.flags |= 128;
        }
        if (n = e.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), pu(e, Ee.current), a) break;
        return null;
      case 22:
        return e.lanes = 0, Xd(
          t,
          e,
          l,
          e.pendingProps
        );
      case 24:
        ta(e, ce, t.memoizedState.cache);
    }
    return Xl(t, e, l);
  }
  function Id(t, e, l) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps)
        re = !0;
      else {
        if (!Fs(t, l) && (e.flags & 128) === 0)
          return re = !1, Wv(
            t,
            e,
            l
          );
        re = (t.flags & 131072) !== 0;
      }
    else
      re = !1, xt && (e.flags & 1048576) !== 0 && Af(e, ou, e.index);
    switch (e.lanes = 0, e.tag) {
      case 16:
        t: {
          var a = e.pendingProps;
          if (t = Ga(e.elementType), e.type = t, typeof t == "function")
            as(t) ? (a = Za(t, a), e.tag = 1, e = Kd(
              null,
              e,
              t,
              a,
              l
            )) : (e.tag = 0, e = Vs(
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
                e.tag = 11, e = Yd(
                  null,
                  e,
                  t,
                  a,
                  l
                );
                break t;
              } else if (n === bt) {
                e.tag = 14, e = qd(
                  null,
                  e,
                  t,
                  a,
                  l
                );
                break t;
              } else if (n === jt) {
                e.tag = 10, e.type = t, e = Wd(
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
        return Vs(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 1:
        return a = e.type, n = Za(
          a,
          e.pendingProps
        ), Kd(
          t,
          e,
          a,
          n,
          l
        );
      case 3:
        t: {
          if (fe(
            e,
            e.stateNode.containerInfo
          ), t === null) throw Error(s(387));
          a = e.pendingProps;
          var u = e.memoizedState;
          n = u.element, gs(t, e), bu(e, a, null, l);
          var i = e.memoizedState;
          if (a = i.cache, ta(e, ce, a), a !== u.cache && os(
            e,
            [ce],
            l,
            !0
          ), yu(), a = i.element, u.isDehydrated)
            if (u = {
              element: a,
              isDehydrated: !1,
              cache: i.cache
            }, e.updateQueue.baseState = u, e.memoizedState = u, e.flags & 256) {
              e = Jd(
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
              ), fu(n), e = Jd(
                t,
                e,
                a,
                l
              );
              break t;
            } else
              for (t = e.stateNode.containerInfo, t.nodeType === 9 ? t = t.body : t = t.nodeName === "HTML" ? t.ownerDocument.body : t, It = nl(t.firstChild), ge = e, xt = !0, Il = null, ll = !0, l = Xf(
                e,
                null,
                a,
                l
              ), e.child = l; l; )
                l.flags = l.flags & -3 | 134221824, l = l.sibling;
          else {
            if (Ua(), a === n) {
              e = Xl(
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
        return Mn(t, e), t === null ? (l = Th(
          e.type,
          null,
          e.pendingProps,
          null
        )) ? e.memoizedState = l : xt || (e.stateNode = lh(
          e.type,
          e.pendingProps,
          Ot.current,
          e
        )) : e.memoizedState = Th(
          e.type,
          t.memoizedProps,
          e.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return zl(e), t === null && xt && (a = e.stateNode = ph(
          e.type,
          e.pendingProps,
          Ot.current
        ), ge = e, ll = !0, n = It, va(e.type) ? (Kr = n, It = nl(a.firstChild)) : It = n), de(
          t,
          e,
          e.pendingProps.children,
          l
        ), Mn(t, e), t === null && (e.flags |= 4194304), e.child;
      case 5:
        return t === null && xt && ((n = a = It) && (a = Zg(
          a,
          e.type,
          e.pendingProps,
          ll
        ), a !== null ? (e.stateNode = a, ge = e, It = nl(a.firstChild), ll = !1, n = !0) : n = !1), n || Pl(e)), zl(e), n = e.type, u = e.pendingProps, i = t !== null ? t.memoizedProps : null, a = u.children, Hr(n, u) ? a = null : i !== null && Hr(n, i) && (e.flags |= 32), e.memoizedState !== null && (n = Ns(
          t,
          e,
          qv,
          null,
          null,
          l
        ), Qn._currentValue = n), Mn(t, e), de(t, e, a, l), e.child;
      case 6:
        return t === null && xt && ((t = l = It) && (l = Kg(
          l,
          e.pendingProps,
          ll
        ), l !== null ? (e.stateNode = l, ge = e, It = null, t = !0) : t = !1), t || Pl(e)), null;
      case 13:
        return $d(t, e, l);
      case 4:
        return fe(
          e,
          e.stateNode.containerInfo
        ), a = e.pendingProps, t === null ? e.child = Va(
          e,
          null,
          a,
          l
        ) : de(t, e, a, l), e.child;
      case 11:
        return Yd(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 7:
        return a = e.pendingProps, Mn(t, e), de(t, e, a, l), e.child;
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
        return Wd(t, e, l);
      case 9:
        return n = e.type._context, a = e.pendingProps.children, La(e), n = Se(n), a = a(n), e.flags |= 1, de(t, e, a, l), e.child;
      case 14:
        return qd(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 15:
        return Gd(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 19:
        return ks(t, e, l);
      case 31:
        return kv(t, e, l);
      case 22:
        return Xd(
          t,
          e,
          l,
          e.pendingProps
        );
      case 24:
        return La(e), a = Se(ce), t === null ? (n = ms(), n === null && (n = Wt, u = fs(), n.pooledCache = u, u.refCount++, u !== null && (n.pooledCacheLanes |= l), n = u), e.memoizedState = { parent: a, cache: n }, vs(e), ta(e, ce, n)) : ((t.lanes & l) !== 0 && (gs(t, e), bu(e, null, null, l), yu()), n = t.memoizedState, u = e.memoizedState, n.parent !== a ? (n = { parent: a, cache: a }, e.memoizedState = n, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = n), ta(e, ce, a)) : (a = u.cache, ta(e, ce, a), a !== n.cache && os(
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
        }), a = e.pendingProps, a.name != null && a.name !== "auto" ? e.flags |= t === null ? 18882560 : 18874368 : xt && bi(e), t !== null && t.memoizedProps.name !== a.name ? e.flags |= 4194816 : Mn(t, e), de(t, e, a.children, l), e.child;
      case 29:
        throw e.pendingProps;
    }
    throw Error(s(156, e.tag));
  }
  function Vl(t) {
    t.flags |= 4;
  }
  function Ws(t, e, l, a, n) {
    var u;
    if ((u = (t.mode & 32) !== 0) && (u = l === null ? Oh(e, a) : Oh(e, a) && (a.src !== l.src || a.srcSet !== l.srcSet)), u) {
      if (t.flags |= 16777216, (n & 335544128) === n)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (wm()) t.flags |= 8192;
        else
          throw Xa = xi, hs;
    } else t.flags &= -16777217;
  }
  function Pd(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !zh(e))
      if (wm()) t.flags |= 8192;
      else
        throw Xa = xi, hs;
  }
  function Qi(t, e) {
    e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? Mo() : 536870912, t.lanes |= e, jn |= e);
  }
  function Nu(t, e) {
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
  function Pt(t) {
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
    switch (is(e), e.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Pt(e), null;
      case 1:
        return Pt(e), null;
      case 3:
        return l = e.stateNode, a = null, t !== null && (a = t.memoizedState.cache), e.memoizedState.cache !== a && (e.flags |= 2048), Yl(ce), Ht(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (t === null || t.child === null) && (pn(e) ? Vl(e) : t === null || t.memoizedState.isDehydrated && (e.flags & 256) === 0 || (e.flags |= 1024, ss())), Pt(e), null;
      case 26:
        var n = e.type, u = e.memoizedState;
        return t === null ? (Vl(e), u !== null ? (Pt(e), Pd(e, u)) : (Pt(e), Ws(
          e,
          n,
          null,
          a,
          l
        ))) : u ? u !== t.memoizedState ? (Vl(e), Pt(e), Pd(e, u)) : (Pt(e), e.flags &= -16777217) : (t = t.memoizedProps, t !== a && Vl(e), Pt(e), Ws(
          e,
          n,
          t,
          a,
          l
        )), null;
      case 27:
        if (Kl(e), l = Ot.current, n = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== a && Vl(e);
        else {
          if (!a) {
            if (e.stateNode === null)
              throw Error(s(166));
            return Pt(e), e.subtreeFlags &= -33554433, null;
          }
          t = G.current, pn(e) ? jf(e) : (t = ph(n, a, l), e.stateNode = t, Vl(e));
        }
        return Pt(e), e.subtreeFlags &= -33554433, null;
      case 5:
        if (Kl(e), n = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== a && Vl(e);
        else {
          if (!a) {
            if (e.stateNode === null)
              throw Error(s(166));
            return Pt(e), e.subtreeFlags &= -33554433, null;
          }
          if (u = G.current, pn(e))
            jf(e);
          else {
            var i = Uu(
              Ot.current
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
            u[pe] = e, u[De] = a;
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
            t: switch (Ne(u, n, a), n) {
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
            a && Vl(e);
          }
        }
        return Pt(e), e.subtreeFlags &= -33554433, Ws(
          e,
          e.type,
          t === null ? null : t.memoizedProps,
          e.pendingProps,
          l
        ), null;
      case 6:
        if (t && e.stateNode != null)
          t.memoizedProps !== a && Vl(e);
        else {
          if (typeof a != "string" && e.stateNode === null)
            throw Error(s(166));
          if (t = Ot.current, pn(e)) {
            if (t = e.stateNode, l = e.memoizedProps, a = null, n = ge, n !== null)
              switch (n.tag) {
                case 27:
                case 5:
                  a = n.memoizedProps;
              }
            t[pe] = e, t = !!(t.nodeValue === l || a !== null && a.suppressHydrationWarning === !0 || Im(t.nodeValue, l)), t || Pl(e, !0);
          } else
            t = Uu(t).createTextNode(
              a
            ), t[pe] = e, e.stateNode = t;
        }
        return Pt(e), null;
      case 31:
        if (l = e.memoizedState, t === null || t.memoizedState !== null) {
          if (a = pn(e), l !== null) {
            if (t === null) {
              if (!a) throw Error(s(318));
              if (t = e.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(557));
              t[pe] = e;
            } else
              Ua(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Pt(e), t = !1;
          } else
            l = ss(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = l), t = !0;
          if (!t)
            return e.flags & 256 ? (Qe(e), e) : (Qe(e), null);
          if ((e.flags & 128) !== 0)
            throw Error(s(558));
        }
        return Pt(e), null;
      case 13:
        if (a = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (n = pn(e), a !== null && a.dehydrated !== null) {
            if (t === null) {
              if (!n) throw Error(s(318));
              if (n = e.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(s(317));
              n[pe] = e;
            } else
              Ua(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Pt(e), n = !1;
          } else
            n = ss(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return e.flags & 256 ? (Qe(e), e) : (Qe(e), null);
        }
        return Qe(e), (e.flags & 128) !== 0 ? (e.lanes = l, e) : (l = a !== null, t = t !== null && t.memoizedState !== null, l && (a = e.child, n = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (n = a.alternate.memoizedState.cachePool.pool), u = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (u = a.memoizedState.cachePool.pool), u !== n && (a.flags |= 2048)), l !== t && l && (e.child.flags |= 8192), Qi(e, e.updateQueue), Pt(e), null);
      case 4:
        return Ht(), t === null && Rr(e.stateNode.containerInfo), e.flags |= 67108864, Pt(e), null;
      case 10:
        return Yl(e.type), Pt(e), null;
      case 19:
        if (Es(e), a = e.memoizedState, a === null) return Pt(e), null;
        if (n = (e.flags & 128) !== 0, u = a.rendering, u === null)
          if (n) Nu(a, !1);
          else {
            if (ne !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = e.child; t !== null; ) {
                if (u = Ai(t), u !== null) {
                  for (e.flags |= 128, Nu(a, !1), t = u.updateQueue, e.updateQueue = t, Qi(e, t), e.subtreeFlags = 0, t = l, l = e.child; l !== null; )
                    Mf(l, t), l = l.sibling;
                  return pu(
                    e,
                    Ee.current & 1 | 2
                  ), xt && Hl(e, a.treeForkCount), e.child;
                }
                t = t.sibling;
              }
            a.tail !== null && kt() > lc && (e.flags |= 128, n = !0, Nu(a, !1), e.lanes = 4194304);
          }
        else {
          if (!n)
            if (t = Ai(u), t !== null) {
              if (e.flags |= 128, n = !0, t = t.updateQueue, e.updateQueue = t, Qi(e, t), Nu(a, !0), a.tail === null && a.tailMode !== "collapsed" && a.tailMode !== "visible" && !u.alternate && !xt)
                return Pt(e), null;
            } else
              2 * kt() - a.renderingStartTime > lc && l !== 536870912 && (e.flags |= 128, n = !0, Nu(a, !1), e.lanes = 4194304);
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
          return a.rendering = t, a.tail = t.sibling, a.renderingStartTime = kt(), t.sibling = null, u = Ee.current, u = n ? u & 1 | 2 : u & 1, a.tailMode === "visible" || a.tailMode === "collapsed" || !l || xt ? pu(e, u) : (l = u, Nt(_e, e), Nt(Ee, l), Me === null && (Me = e)), xt && Hl(e, a.treeForkCount), t;
        }
        return Pt(e), null;
      case 22:
      case 23:
        return Qe(e), Ss(), a = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== a && (e.flags |= 8192) : a && (e.flags |= 8192), a ? (l & 536870912) !== 0 && (e.flags & 128) === 0 && (Pt(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : Pt(e), l = e.updateQueue, l !== null && Qi(e, l.retryQueue), l = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), a = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), a !== l && (e.flags |= 2048), t !== null && vt(qa), null;
      case 24:
        return l = null, t !== null && (l = t.memoizedState.cache), e.memoizedState.cache !== l && (e.flags |= 2048), Yl(ce), Pt(e), null;
      case 25:
        return null;
      case 30:
        return e.flags |= 33554432, Pt(e), null;
    }
    throw Error(s(156, e.tag));
  }
  function Pv(t, e) {
    switch (is(e), e.tag) {
      case 1:
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 3:
        return Yl(ce), Ht(), t = e.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (e.flags = t & -65537 | 128, e) : null;
      case 26:
      case 27:
      case 5:
        return Kl(e), null;
      case 31:
        if (e.memoizedState !== null) {
          if (Qe(e), e.alternate === null)
            throw Error(s(340));
          Ua();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 13:
        if (Qe(e), t = e.memoizedState, t !== null && t.dehydrated !== null) {
          if (e.alternate === null)
            throw Error(s(340));
          Ua();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 19:
        return Es(e), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, t = e.memoizedState, t !== null && (t.rendering = null, t.tail = null), e.flags |= 4, e) : null;
      case 4:
        return Ht(), null;
      case 10:
        return Yl(e.type), null;
      case 22:
      case 23:
        return Qe(e), Ss(), t !== null && vt(qa), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 24:
        return Yl(ce), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function tm(t, e) {
    switch (is(e), e.tag) {
      case 3:
        Yl(ce), Ht();
        break;
      case 26:
      case 27:
      case 5:
        Kl(e);
        break;
      case 4:
        Ht();
        break;
      case 31:
        e.memoizedState !== null && Qe(e);
        break;
      case 13:
        Qe(e);
        break;
      case 19:
        Es(e);
        break;
      case 10:
        Yl(e.type);
        break;
      case 22:
      case 23:
        Qe(e), Ss(), t !== null && vt(qa);
        break;
      case 24:
        Yl(ce);
    }
  }
  function xu(t, e) {
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
  function sa(t, e, l) {
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
  function em(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var l = t.stateNode;
      try {
        Qf(e, l);
      } catch (a) {
        Zt(t, t.return, a);
      }
    }
  }
  function lm(t, e, l) {
    l.props = Za(
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
            var n = t.stateNode, u = Dl(t.memoizedProps, n);
            (n.ref === null || n.ref.name !== u) && (n.ref = rh(u)), a = n.ref;
            break;
          case 7:
            if (t.stateNode === null) {
              var i = new ke(t);
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
  function Te(t, e) {
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
  function Zi(t, e) {
    if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && t.alternate === null && e !== null)
      for (var l = 0; l < e.length; l++)
        vh(
          t.stateNode,
          e[l]
        );
  }
  function am(t) {
    for (var e = t.return; e !== null && (Ps(e) && vh(t.stateNode, e.stateNode), !Is(e)); )
      e = e.return;
  }
  function Mu(t) {
    for (var e = t.return; e !== null && (Ps(e) && Qg(t.stateNode, e.stateNode), !Is(e)); )
      e = e.return;
  }
  function Is(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 27;
  }
  function Ps(t) {
    return t && t.tag === 7 && t.stateNode !== null;
  }
  function tr(t) {
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
  function er(t, e, l) {
    try {
      var a = t.stateNode;
      xg(a, t.type, l, e), a[De] = e;
    } catch (n) {
      Zt(t, t.return, n);
    }
  }
  function nm(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && va(t.type) || t.tag === 4;
  }
  function lr(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || nm(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && va(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function ar(t, e, l, a) {
    var n = t.tag;
    if (n === 5 || n === 6)
      n = t.stateNode, e ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(n, e) : (e = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, e.appendChild(n), l = l._reactRootContainer, l != null || e.onclick !== null || (e.onclick = vl)), Zi(t, a), Yt = !0;
    else if (n !== 4 && (n === 27 && (Zi(t, a), a = null, va(t.type) && (l = t.stateNode, e = null)), t = t.child, t !== null))
      for (ar(
        t,
        e,
        l,
        a
      ), t = t.sibling; t !== null; )
        ar(
          t,
          e,
          l,
          a
        ), t = t.sibling;
  }
  function Ki(t, e, l, a) {
    var n = t.tag;
    if (n === 5 || n === 6)
      n = t.stateNode, e ? l.insertBefore(n, e) : l.appendChild(n), Zi(t, a), Yt = !0;
    else if (n !== 4 && (n === 27 && (Zi(t, a), a = null, va(t.type) && (l = t.stateNode)), t = t.child, t !== null))
      for (Ki(
        t,
        e,
        l,
        a
      ), t = t.sibling; t !== null; )
        Ki(
          t,
          e,
          l,
          a
        ), t = t.sibling;
  }
  function um(t) {
    var e = t.stateNode, l = t.memoizedProps;
    try {
      for (var a = t.type, n = e.attributes; n.length; )
        e.removeAttributeNode(n[0]);
      Ne(e, a, l), e[pe] = t, e[De] = l;
    } catch (u) {
      Zt(t, t.return, u);
    }
  }
  var Ji = !1, Ze = null;
  function im(t) {
    (t.tag === 30 || (t.subtreeFlags & 33554432) !== 0) && (Ji = !0);
  }
  var pl = null;
  function cm() {
    var t = pl;
    return pl = null, t;
  }
  var Be = 0;
  function On(t, e, l, a, n) {
    return Be = 0, sm(
      t.child,
      e,
      l,
      a,
      n
    );
  }
  function sm(t, e, l, a, n) {
    for (var u = !1; t !== null; ) {
      if (t.tag === 5) {
        var i = t.stateNode;
        if (a !== null) {
          var o = qr(i);
          a.push(o), o.view && (u = !0);
        } else
          u || qr(i).view && (u = !0);
        Ji = !0, ch(
          i,
          Be === 0 ? e : e + "_" + Be,
          l
        ), Be++;
      } else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && n || sm(
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
      t.tag === 5 ? sh(t.stateNode, t.memoizedProps) : (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && e || Sl(
        t.child,
        e
      )), t = t.sibling;
  }
  function $i(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if ((t.tag !== 22 || t.memoizedState === null) && ($i(t), t.tag === 30 && (t.flags & 18874368) !== 0 && t.stateNode.paired)) {
          var e = t.memoizedProps;
          if (e.name == null || e.name === "auto")
            throw Error(s(544));
          var l = e.name;
          e = Ul(e.default, e.share), e !== "none" && (On(
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
  function nr(t, e) {
    if (t.tag === 30) {
      var l = t.stateNode, a = t.memoizedProps, n = Dl(a, l), u = Ul(
        a.default,
        l.paired ? a.share : a.enter
      );
      u !== "none" ? On(t, n, u, null, !1) ? ($i(t), l.paired || e || Un(t, a.onEnter)) : Sl(t.child, !1) : $i(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        nr(t, e), t = t.sibling;
    else $i(t);
  }
  function ur(t) {
    if (Ze !== null && Ze.size !== 0) {
      var e = Ze;
      if ((t.subtreeFlags & 18874368) !== 0)
        for (t = t.child; t !== null; ) {
          if (t.tag !== 22 || t.memoizedState === null) {
            if (t.tag === 30 && (t.flags & 18874368) !== 0) {
              var l = t.memoizedProps, a = l.name;
              if (a != null && a !== "auto") {
                var n = e.get(a);
                if (n !== void 0) {
                  var u = Ul(
                    l.default,
                    l.share
                  );
                  if (u !== "none" && (On(
                    t,
                    a,
                    u,
                    null,
                    !1
                  ) ? (u = t.stateNode, n.paired = u, u.paired = n, Un(t, l.onShare)) : Sl(t.child, !1)), e.delete(a), e.size === 0) break;
                }
              }
            }
            ur(t);
          }
          t = t.sibling;
        }
    }
  }
  function ir(t) {
    if (t.tag === 30) {
      var e = t.memoizedProps, l = Dl(e, t.stateNode), a = Ze !== null ? Ze.get(l) : void 0, n = Ul(
        e.default,
        a !== void 0 ? e.share : e.exit
      );
      n !== "none" && (On(t, l, n, null, !1) ? a !== void 0 ? (n = t.stateNode, a.paired = n, n.paired = a, Ze.delete(l), Un(t, e.onShare)) : Un(t, e.onExit) : Sl(t.child, !1)), Ze !== null && ur(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        ir(t), t = t.sibling;
    else
      Ze !== null && ur(t);
  }
  function rm(t) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var e = t.memoizedProps, l = Dl(e, t.stateNode);
        e = Ul(e.default, e.update), t.flags &= -5, e !== "none" && On(
          t,
          l,
          e,
          t.memoizedState = [],
          !1
        );
      } else
        (t.subtreeFlags & 33554432) !== 0 && rm(t);
      t = t.sibling;
    }
  }
  function cr(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if (t.tag !== 22 || t.memoizedState === null) {
          if (t.tag === 30 && (t.flags & 18874368) !== 0) {
            var e = t.stateNode;
            e.paired !== null && (e.paired = null, Sl(t.child, !1));
          }
          cr(t);
        }
        t = t.sibling;
      }
  }
  function ki(t) {
    if (t.tag === 30)
      t.stateNode.paired = null, Sl(t.child, !1), cr(t);
    else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        ki(t), t = t.sibling;
    else cr(t);
  }
  function om(t) {
    for (t = t.child; t !== null; )
      t.tag === 30 ? Sl(t.child, !1) : (t.subtreeFlags & 33554432) !== 0 && om(t), t = t.sibling;
  }
  function sr(t, e, l, a, n, u, i) {
    for (var o = !1; e !== null; ) {
      if (e.tag === 5) {
        var g = e.stateNode;
        if (u !== null && Be < u.length) {
          var N = u[Be], z = qr(g);
          (N.view || z.view) && (o = !0);
          var H;
          if (H = (t.flags & 4) === 0)
            if (z.clip) H = !0;
            else {
              H = N.rect;
              var _ = z.rect;
              H = H.y !== _.y || H.x !== _.x || H.height !== _.height || H.width !== _.width;
            }
          H && (t.flags |= 4), z.abs ? z = !N.abs : (N = N.rect, z = z.rect, z = N.height !== z.height || N.width !== z.width), z && (t.flags |= 32);
        } else t.flags |= 32;
        (t.flags & 4) !== 0 && ch(
          g,
          Be === 0 ? l : l + "_" + Be,
          n
        ), o && (t.flags & 4) !== 0 || (pl === null && (pl = []), pl.push(
          g,
          Be === 0 ? a : a + "_" + Be,
          e.memoizedProps
        )), Be++;
      } else (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && i ? t.flags |= e.flags & 32 : sr(
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
  function fm(t, e) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var l = t.memoizedProps, a = t.stateNode, n = Dl(l, a), u = Ul(l.default, l.update), i;
        i = t.memoizedState, t.memoizedState = null, a = t;
        var o = t.child;
        Be = 0, n = sr(
          a,
          o,
          n,
          n,
          u,
          i,
          !1
        ), (t.flags & 4) !== 0 && n && Un(t, l.onUpdate);
      } else
        (t.subtreeFlags & 33554432) !== 0 && fm(t);
      t = t.sibling;
    }
  }
  var ye = !1, Gt = !1, _l = !1, rr = !1, dm = typeof WeakSet == "function" ? WeakSet : Set, be = null, El = !1, Ou = !1, Fi = !1, or = !1;
  function tg(t, e, l) {
    if (t = t.containerInfo, Ur = Zn, t = gf(t), Fc(t)) {
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
            var o = 0, g = -1, N = -1, z = 0, H = 0, _ = t, O = null;
            e: for (; ; ) {
              for (var X; _ !== a || u !== 0 && _.nodeType !== 3 || (g = o + u), _ !== i || n !== 0 && _.nodeType !== 3 || (N = o + n), _.nodeType === 3 && (o += _.nodeValue.length), (X = _.firstChild) !== null; )
                O = _, _ = X;
              for (; ; ) {
                if (_ === t) break e;
                if (O === a && ++z === u && (g = o), O === i && ++H === n && (N = o), (X = _.nextSibling) !== null) break;
                _ = O, O = _.parentNode;
              }
              _ = X;
            }
            a = g === -1 || N === -1 ? null : { start: g, end: N };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (Br = { focusedElem: t, selectionRange: a }, Zn = !1, l = (l & 335544064) === l, be = e, e = l ? 9270 : 1024; be !== null; ) {
      if (t = be, l && (a = t.deletions, a !== null))
        for (u = 0; u < a.length; u++)
          l && ir(a[u]);
      if (t.alternate === null && (t.flags & 2) !== 0)
        l && im(t), Wi(l);
      else {
        if (t.tag === 22) {
          if (a = t.alternate, t.memoizedState !== null) {
            a !== null && a.memoizedState === null && l && ir(a), Wi(l);
            continue;
          } else if (a !== null && a.memoizedState !== null) {
            l && im(t), Wi(l);
            continue;
          }
        }
        a = t.child, (t.subtreeFlags & e) !== 0 && a !== null ? (a.return = t, be = a) : (l && rm(t), Wi(l));
      }
    }
    Ze = null;
  }
  function Wi(t) {
    for (; be !== null; ) {
      var e = be, l = t, a = e.alternate, n = e.flags;
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
              var i = Za(
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
              Vr(a);
            else if (l === 1)
              switch (a.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  Vr(a);
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
          l && a !== null && (l = Dl(
            a.memoizedProps,
            a.stateNode
          ), n = e.memoizedProps, n = Ul(n.default, n.update), n !== "none" && On(
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
        a.return = e.return, be = a;
        break;
      }
      be = e.return;
    }
  }
  function mm(t, e, l) {
    var a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Tl(t, l), a & 4 && xu(5, l);
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
            var n = Za(
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
        a & 64 && em(l), a & 512 && bl(l, l.return);
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
            Qf(t, e);
          } catch (i) {
            Zt(l, l.return, i);
          }
        }
        break;
      case 27:
        e === null && a & 4 && um(l);
      case 26:
      case 5:
        Tl(t, l), e === null && a & 4 && tr(l), a & 512 && bl(l, l.return);
        break;
      case 12:
        Tl(t, l);
        break;
      case 31:
        Tl(t, l), a & 4 && ym(t, l);
        break;
      case 13:
        Tl(t, l), a & 4 && bm(t, l), a & 64 && (t = l.memoizedState, t !== null && (t = t.dehydrated, t !== null && (l = dg.bind(
          null,
          l
        ), Jg(t, l))));
        break;
      case 22:
        if (a = l.memoizedState !== null || ye, !a) {
          var u = e !== null && e.memoizedState !== null || Gt;
          e = ye, n = Gt, ye = a, (Gt = u) && !n ? (a = 2, (l.subtreeFlags & 8772) !== 0 && (a |= 1), rl(
            t,
            l,
            a
          )) : Tl(t, l), ye = e, Gt = n;
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
  function fr(t, e) {
    for (t = t.child; t !== null; )
      hm(t, e), t = t.sibling;
  }
  function hm(t, e) {
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
        dr(t, e);
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
          e ? ih(o, !0) : ih(t.stateNode, !1);
        } catch (g) {
          Zt(t, t.return, g);
        }
        break;
      case 22:
      case 23:
        t.memoizedState === null && fr(t, e);
        break;
      default:
        fr(t, e);
    }
  }
  function dr(t, e) {
    if (t.subtreeFlags & 67108864)
      for (t = t.child; t !== null; ) {
        t: {
          var l = t, a = e;
          switch (l.tag) {
            case 4:
              hm(l, a);
              break t;
            case 22:
              l.memoizedState === null && dr(l, a);
              break t;
            default:
              dr(l, a);
          }
        }
        t = t.sibling;
      }
  }
  function vm(t) {
    var e = t.alternate;
    e !== null && (t.alternate = null, vm(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && li(e)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var ee = null, He = !1;
  function cl(t, e, l) {
    for (l = l.child; l !== null; )
      gm(t, e, l), l = l.sibling;
  }
  function gm(t, e, l) {
    if (qe && typeof qe.onCommitFiberUnmount == "function")
      try {
        qe.onCommitFiberUnmount(Fn, l);
      } catch {
      }
    switch (l.tag) {
      case 26:
        Gt || Te(l, e), cl(
          t,
          e,
          l
        ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && !Gt && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        Gt || Te(l, e), Mu(l);
        var a = ee, n = He;
        va(l.type) && (ee = l.stateNode, He = !1), cl(
          t,
          e,
          l
        ), Sh(
          l.stateNode,
          l.type,
          l.memoizedProps
        ), ee = a, He = n;
        break;
      case 5:
        Gt || Te(l, e), Mu(l);
      case 6:
        if (l.tag === 6 && Mu(l), a = ee, n = He, ee = null, cl(
          t,
          e,
          l
        ), ee = a, He = n, ee !== null)
          if (He)
            try {
              (ee.nodeType === 9 ? ee.body : ee.nodeName === "HTML" ? ee.ownerDocument.body : ee).removeChild(l.stateNode), Yt = !0;
            } catch (u) {
              Zt(
                l,
                e,
                u
              );
            }
          else
            try {
              ee.removeChild(l.stateNode), Yt = !0;
            } catch (u) {
              Zt(
                l,
                e,
                u
              );
            }
        break;
      case 18:
        ee !== null && (He ? (t = ee, uh(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          l.stateNode
        ), Kn(t)) : uh(ee, l.stateNode));
        break;
      case 4:
        a = ee, n = He, ee = l.stateNode.containerInfo, He = !0, cl(
          t,
          e,
          l
        ), ee = a, He = n;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        sa(2, l, e), Gt || sa(4, l, e), cl(
          t,
          e,
          l
        );
        break;
      case 1:
        Gt || (Te(l, e), a = l.stateNode, typeof a.componentWillUnmount == "function" && lm(
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
        Gt = (a = Gt) || l.memoizedState !== null, cl(
          t,
          e,
          l
        ), Gt = a;
        break;
      case 30:
        Te(l, e), cl(
          t,
          e,
          l
        );
        break;
      case 7:
        Gt || Te(l, e), cl(
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
  function ym(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        Kn(t);
      } catch (l) {
        Zt(e, e.return, l);
      }
    }
  }
  function bm(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        Kn(t);
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
        return e === null && (e = t.stateNode = new dm()), e;
      case 22:
        return t = t.stateNode, e = t._retryCache, e === null && (e = t._retryCache = new dm()), e;
      default:
        throw Error(s(435, t.tag));
    }
  }
  function Ii(t, e) {
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
        var u = a[n], i = t, o = e, g = o;
        t: for (; g !== null; ) {
          switch (g.tag) {
            case 27:
              if (va(g.type)) {
                ee = g.stateNode, He = !1;
                break t;
              }
              break;
            case 5:
              ee = g.stateNode, He = !1;
              break t;
            case 3:
            case 4:
              ee = g.stateNode.containerInfo, He = !0;
              break t;
          }
          g = g.return;
        }
        if (ee === null) throw Error(s(160));
        gm(i, o, u), ee = null, He = !1, i = u.alternate, i !== null && (i.return = null), u.return = null;
      }
    if (e.subtreeFlags & 13886)
      for (e = e.child; e !== null; )
        pm(e, t, l), e = e.sibling;
  }
  var sl = null;
  function pm(t, e, l) {
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
        Ce(e, t, l), je(t), n & 4 && (sa(3, t, t.return), xu(3, t), sa(5, t, t.return));
        break;
      case 1:
        Ce(e, t, l), je(t), n & 512 && (Gt || a === null || Te(a, a.return)), n & 64 && ye && (t = t.updateQueue, t !== null && (e = t.callbacks, e !== null && (l = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = l === null ? e : l.concat(e))));
        break;
      case 26:
        if (u = sl, Ce(e, t, l), je(t), n & 512 && (Gt || a === null || Te(a, a.return)), n & 4)
          if (n = a !== null ? a.memoizedState : null, l = t.memoizedState, a === null)
            if (l === null)
              if (t.stateNode === null)
                if (ye)
                  t.stateNode = lh(
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
                        a = n.getElementsByTagName("title")[0], (!a || a[Pn] || a[pe] || a.namespaceURI === "http://www.w3.org/2000/svg" || a.hasAttribute("itemprop")) && (a = n.createElement(e), n.head.insertBefore(
                          a,
                          n.querySelector("head > title")
                        )), Ne(a, e, l), a[pe] = t, ve(a), e = a;
                        break t;
                      case "link":
                        if (u = Mh(
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
                        a = n.createElement(e), Ne(a, e, l), n.head.appendChild(a);
                        break;
                      case "meta":
                        if (u = Mh(
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
                        a = n.createElement(e), Ne(a, e, l), n.head.appendChild(a);
                        break;
                      default:
                        throw Error(s(468, e));
                    }
                    a[pe] = t, ve(a), e = a;
                  }
                  t.stateNode = e;
                }
              else
                ye || Fr(u, t.type, t.stateNode);
            else
              t.stateNode = xh(
                u,
                l,
                t.memoizedProps
              );
          else
            n !== l ? (n === null ? (e = a.stateNode, e === null || Gt || e.parentNode.removeChild(e)) : n.count--, l === null ? ye || Fr(u, t.type, t.stateNode) : xh(u, l, t.memoizedProps)) : l === null && t.stateNode !== null && er(
              t,
              t.memoizedProps,
              a.memoizedProps
            );
        break;
      case 27:
        Ce(e, t, l), je(t), n & 512 && (Gt || a === null || Te(a, a.return)), a !== null && n & 4 && er(
          t,
          t.memoizedProps,
          a.memoizedProps
        );
        break;
      case 5:
        if (u = _l, _l = !1, Ce(e, t, l), _l = u, je(t), n & 512 && (Gt || a === null || Te(a, a.return)), t.flags & 32) {
          e = t.stateNode;
          try {
            rn(e, ""), Yt = !0;
          } catch (z) {
            Zt(t, t.return, z);
          }
        }
        n & 4 && t.stateNode != null && (e = t.memoizedProps, er(
          t,
          e,
          a !== null ? a.memoizedProps : e
        )), n & 1024 && (rr = !0);
        break;
      case 6:
        if (Ce(e, t, l), je(t), n & 4) {
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
        if (Yt = !1, mc = null, u = sl, sl = Bu(e.containerInfo), Ce(e, t, l), sl = u, je(t), n & 4 && a !== null && a.memoizedState.isDehydrated)
          try {
            Kn(e.containerInfo);
          } catch (z) {
            Zt(t, t.return, z);
          }
        rr && (rr = !1, Sm(t)), Yt = !1;
        break;
      case 4:
        n = _l, _l = ye, a = Yo(), u = sl, sl = Bu(
          t.stateNode.containerInfo
        ), Ce(e, t, l), je(t), sl = u, Yt && Ou && (Fi = !0), Yt = a, _l = n;
        break;
      case 12:
        Ce(e, t, l), je(t);
        break;
      case 31:
        Ce(e, t, l), je(t), n & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, Ii(t, e)));
        break;
      case 13:
        Ce(e, t, l), je(t), t.child.flags & 8192 && t.memoizedState !== null != (a !== null && a.memoizedState !== null) && (ec = kt()), n & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, Ii(t, e)));
        break;
      case 22:
        u = t.memoizedState !== null, i = a !== null && a.memoizedState !== null;
        var o = ye, g = Gt, N = _l;
        ye = o || u, _l = N || u, Gt = g || i, Ce(e, t, l), Gt = g, _l = N, ye = o, je(t), n & 8192 && (e = t.stateNode, e._visibility = u ? e._visibility & -2 : e._visibility | 1, !u || a === null || i || ye || Gt || (e = i || Gt, l = ye, a = Gt, ye = u || ye, Gt = e, ra(t, 2), ye = l, Gt = a), !u && _l || fr(t, u)), n & 4 && (e = t.updateQueue, e !== null && (l = e.retryQueue, l !== null && (e.retryQueue = null, Ii(t, l))));
        break;
      case 19:
        Ce(e, t, l), je(t), n & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, Ii(t, e)));
        break;
      case 30:
        n & 512 && (Gt || a === null || Te(a, a.return)), n = Yo(), u = Ou, i = (l & 335544064) === l, o = t.memoizedProps, Ou = i && Ul(
          o.default,
          o.update
        ) !== "none", Ce(e, t, l), je(t), i && a !== null && Yt && (t.flags |= 4), Ou = u, Yt = n;
        break;
      case 21:
        break;
      case 7:
        n & 512 && (Gt || a === null || Te(a, a.return)), a && a.stateNode !== null && (a.stateNode._fragmentFiber = t);
      default:
        Ce(e, t, l), je(t);
    }
  }
  function je(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        for (var l, a = t.return; a !== null; ) {
          if (nm(a)) {
            l = a;
            break;
          }
          a = a.return;
        }
        a = null;
        for (var n = t.return; n !== null; ) {
          if (Ps(n)) {
            var u = n.stateNode;
            a === null ? a = [u] : a.push(u);
          }
          if (Is(n)) break;
          n = n.return;
        }
        var i = a;
        if (l == null) throw Error(s(160));
        switch (l.tag) {
          case 27:
            var o = l.stateNode, g = lr(t);
            Ki(
              t,
              g,
              o,
              i
            );
            break;
          case 5:
            var N = l.stateNode;
            l.flags & 32 && (rn(N, ""), l.flags &= -33);
            var z = lr(t);
            Ki(
              t,
              z,
              N,
              i
            );
            break;
          case 3:
          case 4:
            var H = l.stateNode.containerInfo, _ = lr(t);
            ar(
              t,
              _,
              H,
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
  function Sm(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        Sm(e), e.tag === 5 && e.flags & 1024 && (e = e.stateNode, Zn = !0, e.reset(), Zn = !1), t = t.sibling;
      }
  }
  function zn(t, e) {
    if (e.subtreeFlags & 9270)
      for (e = e.child; e !== null; )
        _m(e, t), e = e.sibling;
    else fm(e);
  }
  function _m(t, e) {
    var l = t.alternate;
    if (l === null) nr(t, !1);
    else
      switch (t.tag) {
        case 3:
          if (or = El = !1, cm(), zn(e, t), !El && !Fi) {
            if (t = pl, t !== null)
              for (var a = 0; a < t.length; a += 3) {
                l = t[a];
                var n = t[a + 1];
                sh(l, t[a + 2]), l = l.ownerDocument.documentElement, l !== null && l.animate(
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
            )), or = !0;
          }
          pl = null;
          break;
        case 5:
          zn(e, t);
          break;
        case 4:
          a = El, El = !1, zn(e, t), El && (Fi = !0), El = a;
          break;
        case 22:
          t.memoizedState === null && (l.memoizedState !== null ? nr(t, !1) : zn(e, t));
          break;
        case 30:
          a = El, n = cm(), El = !1, zn(e, t), El && (t.flags |= 4);
          var u = t.memoizedProps, i = t.stateNode;
          e = Dl(u, i), i = Dl(l.memoizedProps, i);
          var o = Ul(u.default, u.update);
          o === "none" ? e = !1 : (u = l.memoizedState, l.memoizedState = null, l = t.child, Be = 0, e = sr(
            t,
            l,
            e,
            i,
            o,
            u,
            !0
          ), Be !== (u === null ? 0 : u.length) && (t.flags |= 32)), (t.flags & 4) !== 0 && e ? (Un(
            t,
            t.memoizedProps.onUpdate
          ), pl = n) : n !== null && (n.push.apply(n, pl), pl = n), El = (t.flags & 32) !== 0 ? !0 : a;
          break;
        default:
          zn(e, t);
      }
  }
  function Tl(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; )
        mm(t, e.alternate, e), e = e.sibling;
  }
  function ra(t, e) {
    for (t = t.child; t !== null; ) {
      var l = t, a = e;
      switch (l.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          sa(4, l, l.return), ra(
            l,
            a
          );
          break;
        case 1:
          Te(l, l.return);
          var n = l.stateNode;
          typeof n.componentWillUnmount == "function" && lm(
            l,
            l.return,
            n
          ), ra(
            l,
            a
          );
          break;
        case 27:
          (a & 2) !== 0 && Sh(
            l.stateNode,
            l.type,
            l.memoizedProps
          );
        case 5:
          Te(l, l.return), l.tag !== 5 && l.tag !== 27 || Mu(l), ra(
            l,
            a
          );
          break;
        case 6:
          Mu(l);
          break;
        case 26:
          Te(l, l.return), n = l.stateNode, l.memoizedState !== null || n === null || Gt || n.parentNode.removeChild(n), ra(
            l,
            a
          );
          break;
        case 22:
          l.memoizedState === null && ra(
            l,
            a
          );
          break;
        case 30:
          Te(l, l.return), ra(
            l,
            a
          );
          break;
        case 7:
          Te(l, l.return);
        default:
          ra(
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
          ), xu(4, u);
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
                  Vf(N[n], g);
            } catch (z) {
              Zt(a, a.return, z);
            }
          }
          o && i & 64 && em(u), bl(u, u.return);
          break;
        case 27:
          (l & 2) !== 0 && um(u);
        case 5:
          u.tag !== 5 && u.tag !== 27 || am(u), rl(
            n,
            u,
            l
          ), o && a === null && i & 4 && tr(u), bl(u, u.return);
          break;
        case 6:
          am(u);
          break;
        case 26:
          g = u.stateNode, u.memoizedState !== null || g === null || ye || Fr(
            Bu(g.ownerDocument),
            u.type,
            g
          ), rl(
            n,
            u,
            l
          ), o && a === null && i & 4 && tr(u), bl(u, u.return);
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
          ), o && i & 4 && ym(n, u);
          break;
        case 13:
          rl(
            n,
            u,
            l
          ), o && i & 4 && bm(n, u);
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
  function mr(t, e) {
    var l = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), t = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), t !== l && (t != null && t.refCount++, l != null && du(l));
  }
  function hr(t, e) {
    t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && du(t));
  }
  function al(t, e, l, a) {
    var n = (l & 335544064) === l;
    if (e.subtreeFlags & (n ? 10262 : 10256))
      for (e = e.child; e !== null; )
        Em(
          t,
          e,
          l,
          a
        ), e = e.sibling;
    else n && om(e);
  }
  function Em(t, e, l, a) {
    var n = (l & 335544064) === l;
    n && e.alternate === null && e.return !== null && e.return.alternate !== null && ki(e);
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
        ), u & 2048 && xu(9, e);
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
        ), n && or && (t = t.containerInfo, t = t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, t.style.viewTransitionName === "root" && (t.style.viewTransitionName = ""), t = t.ownerDocument.documentElement, t !== null && t.style.viewTransitionName === "none" && (t.style.viewTransitionName = "")), u & 2048 && (u = null, e.alternate !== null && (u = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== u && (e.refCount++, u != null && du(u)));
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
        i = e.stateNode, o = e.alternate, e.memoizedState !== null ? (n && o !== null && o.memoizedState === null && ki(o), i._visibility & 2 ? al(
          t,
          e,
          l,
          a
        ) : zu(
          t,
          e
        )) : (n && o !== null && o.memoizedState !== null && ki(e), i._visibility & 2 ? al(
          t,
          e,
          l,
          a
        ) : (i._visibility |= 2, An(
          t,
          e,
          l,
          a,
          (e.subtreeFlags & 10256) !== 0 || !1
        ))), u & 2048 && mr(o, e);
        break;
      case 24:
        al(
          t,
          e,
          l,
          a
        ), u & 2048 && hr(e.alternate, e);
        break;
      case 30:
        n && (u = e.alternate, u !== null && (Sl(u.child, !0), Sl(e.child, !0))), al(
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
  function An(t, e, l, a, n) {
    for (n = n && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var u = t, i = e, o = l, g = a, N = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          An(
            u,
            i,
            o,
            g,
            n
          ), xu(8, i);
          break;
        case 23:
          break;
        case 22:
          var z = i.stateNode;
          i.memoizedState !== null ? z._visibility & 2 ? An(
            u,
            i,
            o,
            g,
            n
          ) : zu(
            u,
            i
          ) : (z._visibility |= 2, An(
            u,
            i,
            o,
            g,
            n
          )), n && N & 2048 && mr(
            i.alternate,
            i
          );
          break;
        case 24:
          An(
            u,
            i,
            o,
            g,
            n
          ), n && N & 2048 && hr(i.alternate, i);
          break;
        default:
          An(
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
  function zu(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var l = t, a = e, n = a.flags;
        switch (a.tag) {
          case 22:
            zu(l, a), n & 2048 && mr(
              a.alternate,
              a
            );
            break;
          case 24:
            zu(l, a), n & 2048 && hr(a.alternate, a);
            break;
          default:
            zu(l, a);
        }
        e = e.sibling;
      }
  }
  var Ka = 8192;
  function Ja(t, e, l) {
    if (t.subtreeFlags & Ka)
      for (t = t.child; t !== null; )
        Tm(
          t,
          e,
          l
        ), t = t.sibling;
  }
  function Tm(t, e, l) {
    switch (t.tag) {
      case 26:
        Ja(
          t,
          e,
          l
        ), t.flags & Ka && (t.memoizedState !== null ? cy(
          l,
          sl,
          t.memoizedState,
          t.memoizedProps
        ) : (t = t.stateNode, (e & 335544128) === e && Ch(l, t)));
        break;
      case 5:
        Ja(
          t,
          e,
          l
        ), t.flags & Ka && (t = t.stateNode, (e & 335544128) === e && Ch(l, t));
        break;
      case 3:
      case 4:
        var a = sl;
        sl = Bu(t.stateNode.containerInfo), Ja(
          t,
          e,
          l
        ), sl = a;
        break;
      case 22:
        t.memoizedState === null && (a = t.alternate, a !== null && a.memoizedState !== null ? (a = Ka, Ka = 16777216, Ja(
          t,
          e,
          l
        ), Ka = a) : Ja(
          t,
          e,
          l
        ));
        break;
      case 30:
        if ((t.flags & Ka) !== 0 && (a = t.memoizedProps.name, a != null && a !== "auto")) {
          var n = t.stateNode;
          n.paired = null, Ze === null && (Ze = /* @__PURE__ */ new Map()), Ze.set(a, n);
        }
        Ja(
          t,
          e,
          l
        );
        break;
      default:
        Ja(
          t,
          e,
          l
        );
    }
  }
  function Nm(t) {
    var e = t.alternate;
    if (e !== null && (t = e.child, t !== null)) {
      e.child = null;
      do
        e = t.sibling, t.sibling = null, t = e;
      while (t !== null);
    }
  }
  function Au(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var a = e[l];
          be = a, Mm(
            a,
            t
          );
        }
      Nm(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        xm(t), t = t.sibling;
  }
  function xm(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Au(t), t.flags & 2048 && sa(9, t, t.return);
        break;
      case 3:
        Au(t);
        break;
      case 12:
        Au(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (e._visibility &= -3, Pi(t)) : Au(t);
        break;
      default:
        Au(t);
    }
  }
  function Pi(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var a = e[l];
          be = a, Mm(
            a,
            t
          );
        }
      Nm(t);
    }
    for (t = t.child; t !== null; ) {
      switch (e = t, e.tag) {
        case 0:
        case 11:
        case 15:
          sa(8, e, e.return), Pi(e);
          break;
        case 22:
          l = e.stateNode, l._visibility & 2 && (l._visibility &= -3, Pi(e));
          break;
        default:
          Pi(e);
      }
      t = t.sibling;
    }
  }
  function Mm(t, e) {
    for (; be !== null; ) {
      var l = be;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          sa(8, l, e);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var a = l.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          du(l.memoizedState.cache);
      }
      if (a = l.child, a !== null) a.return = l, be = a;
      else
        t: for (l = t; be !== null; ) {
          a = be;
          var n = a.sibling, u = a.return;
          if (vm(a), a === l) {
            be = null;
            break t;
          }
          if (n !== null) {
            n.return = u, be = n;
            break t;
          }
          be = u;
        }
    }
  }
  var lg = {
    getCacheForType: function(t) {
      var e = Se(ce), l = e.data.get(t);
      return l === void 0 && (l = t(), e.data.set(t, l)), l;
    },
    cacheSignal: function() {
      return Se(ce).controller.signal;
    }
  }, ag = typeof WeakMap == "function" ? WeakMap : Map, qt = 0, Wt = null, At = null, Rt = 0, Qt = 0, Ke = null, oa = !1, Cn = !1, vr = !1, Ql = 0, ne = 0, fa = 0, $a = 0, tc = 0, Je = 0, jn = 0, Cu = null, Le = null, gr = !1, ec = 0, Om = 0, lc = 1 / 0, ac = null, da = null, le = 0, ol = null, ka = null, Nl = 0, yr = 0, br = null, zm = null, Rn = null, wn = null, Dn = null, ju = 0, nc = null;
  function $e() {
    return (qt & 2) !== 0 && Rt !== 0 ? Rt & -Rt : K.T !== null ? zr() : Co();
  }
  function Am() {
    if (Je === 0)
      if ((Rt & 536870912) === 0 || xt) {
        var t = Iu;
        Iu <<= 1, (Iu & 3932160) === 0 && (Iu = 262144), Je = t;
      } else Je = 536870912;
    return t = _e.current, t !== null && (t.flags |= 32), Je;
  }
  function Un(t, e) {
    if (e != null) {
      var l = t.stateNode, a = l.ref;
      a === null && (a = l.ref = rh(
        Dl(t.memoizedProps, l)
      )), wn === null && (wn = []), wn.push(e.bind(null, a));
    }
  }
  function Ye(t, e, l) {
    (t === Wt && (Qt === 2 || Qt === 9) || t.cancelPendingCommit !== null) && (Bn(t, 0), ma(
      t,
      Rt,
      Je,
      !1
    )), In(t, l), ((qt & 2) === 0 || t !== Wt) && (t === Wt && ((qt & 2) === 0 && ($a |= l), ne === 4 && ma(
      t,
      Rt,
      Je,
      !1
    )), xl(t));
  }
  function Cm(t, e, l) {
    if ((qt & 6) !== 0) throw Error(s(327));
    var a = !l && (e & 127) === 0 && (e & t.expiredLanes) === 0 || Wn(t, e), n = a ? ig(t, e) : Sr(t, e, !0), u = a;
    do {
      if (n === 0) {
        Cn && !a && ma(t, e, 0, !1);
        break;
      } else {
        if (l = t.current.alternate, u && !ng(l)) {
          n = Sr(t, e, !1), u = !1;
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
              n = Cu;
              var g = o.current.memoizedState.isDehydrated;
              if (g && (Bn(o, i).flags |= 256), i = Sr(
                o,
                i,
                !1
              ), i !== 2 && i !== 6) {
                if (vr && !g) {
                  o.errorRecoveryDisabledLanes |= u, $a |= u, n = 4;
                  break t;
                }
                u = Le, Le = n, u !== null && (Le === null ? Le = u : Le.push.apply(
                  Le,
                  u
                ));
              }
              n = i;
            }
            if (u = !1, n !== 2) continue;
          }
        }
        if (n === 1) {
          Bn(t, 0), ma(t, e, 0, !0);
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
              ma(
                a,
                e,
                Je,
                !oa
              );
              break t;
            case 2:
              Le = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((e & 62914560) === e && (n = ec + 300 - kt(), 10 < n)) {
            if (ma(
              a,
              e,
              Je,
              !oa
            ), ti(a, 0, !0) !== 0) break t;
            Nl = e, a.timeoutHandle = Yr(
              jm.bind(
                null,
                a,
                l,
                Le,
                ac,
                gr,
                e,
                Je,
                $a,
                jn,
                oa,
                u,
                "Throttled",
                -0,
                0
              ),
              n
            );
            break t;
          }
          jm(
            a,
            l,
            Le,
            ac,
            gr,
            e,
            Je,
            $a,
            jn,
            oa,
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
  function jm(t, e, l, a, n, u, i, o, g, N, z, H, _, O) {
    t.timeoutHandle = -1;
    var X = e.subtreeFlags, tt = (u & 335544064) === u;
    if (H = null, (tt || X & 8192 || (X & 16785408) === 16785408) && (H = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: vl
    }, Ze = null, Tm(
      e,
      u,
      H
    ), tt && (X = H, tt = t.containerInfo, tt = (tt.nodeType === 9 ? tt : tt.ownerDocument).__reactViewTransition, tt != null && (X.count++, X.waitingForViewTransition = !0, X = Yu.bind(X), tt.finished.then(X, X))), X = (u & 62914560) === u ? ec - kt() : (u & 4194048) === u ? Om - kt() : 0, X = sy(
      H,
      X
    ), X !== null)) {
      Nl = u, t.cancelPendingCommit = X(
        Ym.bind(
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
          H,
          null,
          _,
          O
        )
      ), ma(t, u, i, !N);
      return;
    }
    Ym(
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
      H
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
            if (!Ve(u(), n)) return !1;
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
  function ma(t, e, l, a) {
    e = xo(t, e), e &= ~tc, e &= ~$a, t.suspendedLanes |= e, t.pingedLanes &= ~e, a && (t.warmLanes |= e), a = t.expirationTimes;
    for (var n = e; 0 < n; ) {
      var u = 31 - Ge(n), i = 1 << u;
      a[u] = -1, n &= ~i;
    }
    l !== 0 && Oo(t, l, e);
  }
  function uc() {
    return (qt & 6) === 0 ? (Ru(0), !1) : !0;
  }
  function pr() {
    if (At !== null) {
      if (Qt === 0)
        var t = At.return;
      else
        t = At, Ll = Ba = null, Os(t), En = null, vu = 0, t = At;
      for (; t !== null; )
        tm(t.alternate, t), t = t.return;
      At = null;
    }
  }
  function Bn(t, e) {
    var l = t.timeoutHandle;
    return l !== -1 && (t.timeoutHandle = -1, zg(l)), l = t.cancelPendingCommit, l !== null && (t.cancelPendingCommit = null, l()), Nl = 0, pr(), Wt = t, At = l = Bl(t.current, null), Rt = e, Qt = 0, Ke = null, oa = !1, Cn = Wn(t, e), vr = !1, jn = Je = tc = $a = fa = ne = 0, Le = Cu = null, gr = !1, Ql = xo(t, e), mi(), l;
  }
  function Rm(t, e) {
    St = null, K.H = Li, e === _n || e === Ni ? (e = Yf(), Qt = 3) : e === hs ? (e = Yf(), Qt = 4) : Qt = e === Xs ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, Ke = e, At === null && (ne = 1, Yi(
      t,
      Pe(e, t.current)
    ));
  }
  function wm() {
    var t = _e.current;
    return t === null ? !0 : (Rt & 4194048) === Rt ? Me === null : (Rt & 62914560) === Rt || (Rt & 536870912) !== 0 ? t === Me : !1;
  }
  function Dm() {
    var t = K.H;
    return K.H = Li, t === null ? Li : t;
  }
  function Um() {
    var t = K.A;
    return K.A = lg, t;
  }
  function ic() {
    ne = 4, oa || (Rt & 4194048) !== Rt && _e.current !== null || (Cn = !0), (fa & 134217727) === 0 && ($a & 134217727) === 0 || Wt === null || ma(
      Wt,
      Rt,
      Je,
      !1
    );
  }
  function Sr(t, e, l) {
    var a = qt;
    qt |= 2;
    var n = Dm(), u = Um();
    (Wt !== t || Rt !== e) && (ac = null, Bn(t, e)), e = !1;
    var i = ne;
    t: do
      try {
        if (Qt !== 0 && At !== null) {
          var o = At, g = Ke;
          switch (Qt) {
            case 8:
              pr(), i = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              _e.current === null && (e = !0);
              var N = Qt;
              if (Qt = 0, Ke = null, Hn(t, o, g, N), l && Cn) {
                i = 0;
                break t;
              }
              break;
            default:
              N = Qt, Qt = 0, Ke = null, Hn(t, o, g, N);
          }
        }
        ug(), i = ne;
        break;
      } catch (z) {
        Rm(t, z);
      }
    while (!0);
    return e && t.shellSuspendCounter++, Ll = Ba = null, qt = a, K.H = n, K.A = u, At === null && (Wt = null, Rt = 0, mi()), i;
  }
  function ug() {
    for (; At !== null; ) Bm(At);
  }
  function ig(t, e) {
    var l = qt;
    qt |= 2;
    var a = Dm(), n = Um();
    Wt !== t || Rt !== e ? (ac = null, lc = kt() + 500, Bn(t, e)) : Cn = Wn(
      t,
      e
    );
    t: do
      try {
        if (Qt !== 0 && At !== null) {
          e = At;
          var u = Ke;
          e: switch (Qt) {
            case 1:
              Qt = 0, Ke = null, Hn(t, e, u, 1);
              break;
            case 2:
            case 9:
              if (Hf(u)) {
                Qt = 0, Ke = null, Hm(e);
                break;
              }
              e = function() {
                Qt !== 2 && Qt !== 9 || Wt !== t || (Qt = 7), xl(t);
              }, u.then(e, e);
              break t;
            case 3:
              Qt = 7;
              break t;
            case 4:
              Qt = 5;
              break t;
            case 7:
              Hf(u) ? (Qt = 0, Ke = null, Hm(e)) : (Qt = 0, Ke = null, Hn(t, e, u, 7));
              break;
            case 5:
              var i = null;
              switch (At.tag) {
                case 26:
                  i = At.memoizedState;
                case 5:
                case 27:
                  var o = At;
                  if (i ? zh(i) : o.stateNode.complete) {
                    Qt = 0, Ke = null;
                    var g = o.sibling;
                    if (g !== null) At = g;
                    else {
                      var N = o.return;
                      N !== null ? (At = N, cc(N)) : At = null;
                    }
                    break e;
                  }
              }
              Qt = 0, Ke = null, Hn(t, e, u, 5);
              break;
            case 6:
              Qt = 0, Ke = null, Hn(t, e, u, 6);
              break;
            case 8:
              pr(), ne = 6;
              break t;
            default:
              throw Error(s(462));
          }
        }
        cg();
        break;
      } catch (z) {
        Rm(t, z);
      }
    while (!0);
    return Ll = Ba = null, K.H = a, K.A = n, qt = l, At !== null ? 0 : (Wt = null, Rt = 0, mi(), ne);
  }
  function cg() {
    for (; At !== null && !me(); )
      Bm(At);
  }
  function Bm(t) {
    var e = Id(t.alternate, t, Ql);
    t.memoizedProps = t.pendingProps, e === null ? cc(t) : At = e;
  }
  function Hm(t) {
    var e = t, l = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = Zd(
          l,
          e,
          e.pendingProps,
          e.type,
          void 0,
          Rt
        );
        break;
      case 11:
        e = Zd(
          l,
          e,
          e.pendingProps,
          e.type.render,
          e.ref,
          Rt
        );
        break;
      case 5:
        Os(e);
        var a = e;
        a === ge && (xt ? (pi(a), a.tag === 5 && a.stateNode != null && (It = a.stateNode)) : (pi(a), xt = !0));
      default:
        tm(l, e), e = At = Mf(e, Ql), e = Id(l, e, Ql);
    }
    t.memoizedProps = t.pendingProps, e === null ? cc(t) : At = e;
  }
  function Hn(t, e, l, a) {
    Ll = Ba = null, Os(e), En = null, vu = 0;
    var n = e.return;
    try {
      if ($v(
        t,
        n,
        e,
        l,
        Rt
      )) {
        ne = 1, Yi(
          t,
          Pe(l, t.current)
        ), At = null;
        return;
      }
    } catch (u) {
      if (n !== null) throw At = n, u;
      ne = 1, Yi(
        t,
        Pe(l, t.current)
      ), At = null;
      return;
    }
    e.flags & 32768 ? (xt || a === 1 ? t = !0 : Cn || (Rt & 536870912) !== 0 ? t = !1 : (oa = t = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = _e.current, a !== null && a.tag === 13 && (a.flags |= 16384))), Lm(e, t)) : cc(e);
  }
  function cc(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        Lm(
          e,
          oa
        );
        return;
      }
      t = e.return;
      var l = Iv(
        e.alternate,
        e,
        Ql
      );
      if (l !== null) {
        At = l;
        return;
      }
      if (e = e.sibling, e !== null) {
        At = e;
        return;
      }
      At = e = t;
    } while (e !== null);
    ne === 0 && (ne = 5);
  }
  function Lm(t, e) {
    do {
      var l = Pv(t.alternate, t);
      if (l !== null) {
        l.flags &= 32767, At = l;
        return;
      }
      if (l = t.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !e && (t = t.sibling, t !== null)) {
        At = t;
        return;
      }
      At = t = l;
    } while (t !== null);
    ne = 6, At = null;
  }
  function Ym(t, e, l, a, n, u, i, o, g, N, z, H) {
    t.cancelPendingCommit = null;
    do
      sc();
    while (le !== 0);
    if ((qt & 6) !== 0) throw Error(s(327));
    if (e !== null) {
      if (e === t.current) throw Error(s(177));
      t === Wt && (At = Wt = null, Rt = 0), ka = e, ol = t, Nl = l, br = n, zm = a, sg(
        t,
        e,
        l,
        i,
        o,
        g,
        H
      );
    }
  }
  function sg(t, e, l, a, n, u, i) {
    var o = e.lanes | e.childLanes;
    if (yr = o, o |= es, D0(
      t,
      l,
      o,
      a,
      n,
      u
    ), wn = null, (l & 335544064) === l ? (Dn = Bv(t), a = 10262) : (Dn = null, a = 10256), (e.subtreeFlags & a) !== 0 || (e.flags & a) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, hg(te, function() {
      return Nr(), null;
    })) : (t.callbackNode = null, t.callbackPriority = 0), Ji = !1, a = (e.flags & 13878) !== 0, (e.subtreeFlags & 13878) !== 0 || a) {
      a = K.T, K.T = null, n = lt.p, lt.p = 2, u = qt, qt |= 4;
      try {
        tg(t, e, l);
      } finally {
        qt = u, lt.p = n, K.T = a;
      }
    }
    le = 1, Ji ? Rn = Dg(
      i,
      t.containerInfo,
      Dn,
      _r,
      Er,
      og,
      Tr,
      Nr,
      rg
    ) : (_r(), Er(), Tr());
  }
  function rg(t) {
    if (le !== 0) {
      var e = ol.onRecoverableError;
      e(t, { componentStack: null });
    }
  }
  function og() {
    le === 3 && (le = 0, _m(ka, ol), le = 4);
  }
  function _r() {
    if (le === 1) {
      le = 0;
      var t = ol, e = ka, l = Nl, a = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || a) {
        a = K.T, K.T = null;
        var n = lt.p;
        lt.p = 2;
        var u = qt;
        qt |= 4;
        try {
          Ou = Fi = !1, pm(e, t, l), l = Br;
          var i = gf(t.containerInfo), o = l.focusedElem, g = l.selectionRange;
          if (i !== o && o && o.ownerDocument && vf(
            o.ownerDocument.documentElement,
            o
          )) {
            if (g !== null && Fc(o)) {
              var N = g.start, z = g.end;
              if (z === void 0 && (z = N), "selectionStart" in o)
                o.selectionStart = N, o.selectionEnd = Math.min(
                  z,
                  o.value.length
                );
              else {
                var H = o.ownerDocument || document, _ = H && H.defaultView || window;
                if (_.getSelection) {
                  var O = _.getSelection(), X = o.textContent.length, tt = Math.min(g.start, X), _t = g.end === void 0 ? tt : Math.min(g.end, X);
                  !O.extend && tt > _t && (i = _t, _t = tt, tt = i);
                  var T = hf(
                    o,
                    tt
                  ), p = hf(
                    o,
                    _t
                  );
                  if (T && p && (O.rangeCount !== 1 || O.anchorNode !== T.node || O.anchorOffset !== T.offset || O.focusNode !== p.node || O.focusOffset !== p.offset)) {
                    var M = H.createRange();
                    M.setStart(T.node, T.offset), O.removeAllRanges(), tt > _t ? (O.addRange(M), O.extend(p.node, p.offset)) : (M.setEnd(p.node, p.offset), O.addRange(M));
                  }
                }
              }
            }
            for (H = [], O = o; O = O.parentNode; )
              O.nodeType === 1 && H.push({
                element: O,
                left: O.scrollLeft,
                top: O.scrollTop
              });
            for (typeof o.focus == "function" && o.focus(), o = 0; o < H.length; o++) {
              var B = H[o];
              B.element.scrollLeft = B.left, B.element.scrollTop = B.top;
            }
          }
          Zn = !!Ur, Br = Ur = null;
        } finally {
          qt = u, lt.p = n, K.T = a;
        }
      }
      t.current = e, le = 2;
    }
  }
  function Er() {
    if (le === 2) {
      le = 0;
      var t = ol, e = ka, l = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || l) {
        l = K.T, K.T = null;
        var a = lt.p;
        lt.p = 2;
        var n = qt;
        qt |= 4;
        try {
          mm(t, e.alternate, e);
        } finally {
          qt = n, lt.p = a, K.T = l;
        }
      }
      le = 3;
    }
  }
  function Tr() {
    if (le === 4 || le === 3) {
      le = 0;
      var t = Rn;
      Rn = null, he();
      var e = ol, l = ka, a = Nl, n = zm, u = (a & 335544064) === a ? 10262 : 10256;
      if ((l.subtreeFlags & u) !== 0 || (l.flags & u) !== 0 ? le = 5 : (le = 0, ka = ol = null, qm(e, e.pendingLanes)), u = e.pendingLanes, u === 0 && (da = null), Rc(a), l = l.stateNode, qe && typeof qe.onCommitFiberRoot == "function")
        try {
          qe.onCommitFiberRoot(
            Fn,
            l,
            void 0,
            (l.current.flags & 128) === 128
          );
        } catch {
        }
      if (n !== null) {
        l = K.T, u = lt.p, lt.p = 2, K.T = null;
        try {
          for (var i = e.onRecoverableError, o = 0; o < n.length; o++) {
            var g = n[o];
            i(g.value, {
              componentStack: g.stack
            });
          }
        } finally {
          K.T = l, lt.p = u;
        }
      }
      if (n = wn, i = Dn, Dn = null, n !== null && (wn = null, i === null && (i = []), t !== null))
        for (g = 0; g < n.length; g++)
          l = (0, n[g])(
            i
          ), l !== void 0 && t.finished.finally(l);
      (Nl & 3) !== 0 && sc(), xl(e), u = e.pendingLanes, (a & 261930) !== 0 && (u & 42) !== 0 ? e === nc ? ju++ : (ju = 0, nc = e) : (ju = 0, nc = null), Ru(0);
    }
  }
  function qm(t, e) {
    (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, du(e)));
  }
  function sc() {
    return Rn !== null && (Rn.skipTransition(), Rn = null), _r(), Er(), Tr(), Nr();
  }
  function Nr() {
    if (le !== 5) return !1;
    var t = ol, e = yr;
    yr = 0;
    var l = Rc(Nl), a = K.T, n = lt.p;
    try {
      lt.p = 32 > l ? 32 : l, K.T = null, l = br, br = null;
      var u = ol, i = Nl;
      if (le = 0, ka = ol = null, Nl = 0, (qt & 6) !== 0) throw Error(s(331));
      var o = qt;
      if (qt |= 4, xm(u.current), Em(
        u,
        u.current,
        i,
        l
      ), qt = o, Ru(0, !1), qe && typeof qe.onPostCommitFiberRoot == "function")
        try {
          qe.onPostCommitFiberRoot(Fn, u);
        } catch {
        }
      return !0;
    } finally {
      lt.p = n, K.T = a, qm(t, e);
    }
  }
  function Gm(t, e, l) {
    e = Pe(l, e), e = Gs(t.stateNode, e, 2), t = na(t, e, 2), t !== null && (In(t, 2), xl(t));
  }
  function Zt(t, e, l) {
    if (t.tag === 3)
      Gm(t, t, l);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          Gm(
            e,
            t,
            l
          );
          break;
        } else if (e.tag === 1) {
          var a = e.stateNode;
          if (typeof e.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (da === null || !da.has(a))) {
            t = Pe(l, t), l = Hd(2), a = na(e, l, 2), a !== null && (Ld(
              l,
              a,
              e,
              t
            ), In(a, 2), xl(a));
            break;
          }
        }
        e = e.return;
      }
  }
  function xr(t, e, l) {
    var a = t.pingCache;
    if (a === null) {
      a = t.pingCache = new ag();
      var n = /* @__PURE__ */ new Set();
      a.set(e, n);
    } else
      n = a.get(e), n === void 0 && (n = /* @__PURE__ */ new Set(), a.set(e, n));
    n.has(l) || (vr = !0, n.add(l), t = fg.bind(null, t, e, l), e.then(t, t));
  }
  function fg(t, e, l) {
    var a = t.pingCache;
    a !== null && a.delete(e), t.pingedLanes |= t.suspendedLanes & l, t.warmLanes &= ~l, Wt === t && (Rt & l) === l && ((ne === 4 || ne === 3 && (Rt & 62914560) === Rt && 300 > kt() - ec) && (qt & 2) === 0 ? Bn(t, 0) : tc |= l, jn === Rt && (jn = 0)), xl(t);
  }
  function Xm(t, e) {
    e === 0 && (e = Mo()), t = wa(t, e), t !== null && (In(t, e), xl(t));
  }
  function dg(t) {
    var e = t.memoizedState, l = 0;
    e !== null && (l = e.retryLane), Xm(t, l);
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
    a !== null && a.delete(e), Xm(t, l);
  }
  function hg(t, e) {
    return ct(t, e);
  }
  var Ln = null, Yn = null, Mr = !1, rc = !1, Or = !1, ha = 0;
  function xl(t) {
    t !== Yn && t.next === null && (Yn === null ? Ln = Yn = t : Yn = Yn.next = t), rc = !0, Mr || (Mr = !0, gg());
  }
  function Ru(t, e) {
    if (!Or && rc) {
      Or = !0;
      do
        for (var l = !1, a = Ln; a !== null; ) {
          if (t !== 0) {
            var n = a.pendingLanes;
            if (n === 0) var u = 0;
            else {
              var i = a.suspendedLanes, o = a.pingedLanes;
              u = (1 << 31 - Ge(42 | t) + 1) - 1, u &= n & ~(i & ~o), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (l = !0, Km(a, u));
          } else
            u = Rt, u = ti(
              a,
              a === Wt ? u : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (u & 3) === 0 || Wn(a, u) || (l = !0, Km(a, u));
          a = a.next;
        }
      while (l);
      Or = !1;
    }
  }
  function vg() {
    Vm();
  }
  function Vm() {
    rc = Mr = !1;
    var t = 0;
    ha !== 0 && Og() && (t = ha);
    for (var e = kt(), l = null, a = Ln; a !== null; ) {
      var n = a.next, u = Qm(a, e);
      u === 0 ? (a.next = null, l === null ? Ln = n : l.next = n, n === null && (Yn = l)) : (l = a, (t !== 0 || (u & 3) !== 0) && (rc = !0)), a = n;
    }
    le !== 0 && le !== 5 || Ru(t), ha !== 0 && (ha = 0);
  }
  function Qm(t, e) {
    for (var l = t.suspendedLanes, a = t.pingedLanes, n = t.expirationTimes, u = t.pendingLanes & -62914561; 0 < u; ) {
      var i = 31 - Ge(u), o = 1 << i, g = n[i];
      g === -1 ? ((o & l) === 0 || (o & a) !== 0) && (n[i] = w0(o, e)) : g <= e && (t.expiredLanes |= o), u &= ~o;
    }
    if (e = Wt, l = Rt, l = ti(
      t,
      t === e ? l : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a = t.callbackNode, l === 0 || t === e && (Qt === 2 || Qt === 9) || t.cancelPendingCommit !== null)
      return a !== null && a !== null && zt(a), t.callbackNode = null, t.callbackPriority = 0;
    if ((l & 3) === 0 || Wn(t, l)) {
      if (e = l & -l, e === t.callbackPriority) return e;
      switch (a !== null && zt(a), Rc(l)) {
        case 2:
        case 8:
          l = Vt;
          break;
        case 32:
          l = te;
          break;
        case 268435456:
          l = Jl;
          break;
        default:
          l = te;
      }
      return a = Zm.bind(null, t), l = ct(l, a), t.callbackPriority = e, t.callbackNode = l, e;
    }
    return a !== null && a !== null && zt(a), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function Zm(t, e) {
    if (le !== 0 && le !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var l = t.callbackNode;
    if (sc() && t.callbackNode !== l)
      return null;
    var a = Rt;
    return a = ti(
      t,
      t === Wt ? a : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a === 0 ? null : (Cm(t, a, e), Qm(t, kt()), t.callbackNode != null && t.callbackNode === l ? Zm.bind(null, t) : null);
  }
  function Km(t, e) {
    if (sc()) return null;
    Cm(t, e, !0);
  }
  function gg() {
    Ag(function() {
      (qt & 6) !== 0 ? ct(
        J,
        vg
      ) : Vm();
    });
  }
  function zr() {
    if (ha === 0) {
      var t = Ya;
      t === 0 && (t = Wu, Wu <<= 1, (Wu & 261888) === 0 && (Wu = 256)), ha = t;
    }
    return ha;
  }
  function Jm(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : ui(t);
  }
  function yg(t, e, l, a, n) {
    if (e === "submit" && l && l.stateNode === n) {
      var u = Jm(
        (n[De] || null).action
      ), i = a.submitter;
      i && (e = (e = i[De] || null) ? Jm(e.formAction) : i.getAttribute("formAction"), e !== null && (u = e, i = null));
      var o = new ri(
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
                if (ha !== 0) {
                  var g = new FormData(n, i);
                  Bs(
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
                typeof u == "function" && (o.preventDefault(), g = new FormData(n, i), Bs(
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
  for (var Ar = 0; Ar < ts.length; Ar++) {
    var Cr = ts[Ar], bg = Cr.toLowerCase(), pg = Cr[0].toUpperCase() + Cr.slice(1);
    il(
      bg,
      "on" + pg
    );
  }
  il(pf, "onAnimationEnd"), il(Sf, "onAnimationIteration"), il(_f, "onAnimationStart"), il("dblclick", "onDoubleClick"), il("focusin", "onFocus"), il("focusout", "onBlur"), il(zv, "onTransitionRun"), il(Av, "onTransitionStart"), il(Cv, "onTransitionCancel"), il(Ef, "onTransitionEnd"), cn("onMouseEnter", ["mouseout", "mouseover"]), cn("onMouseLeave", ["mouseout", "mouseover"]), cn("onPointerEnter", ["pointerout", "pointerover"]), cn("onPointerLeave", ["pointerout", "pointerover"]), Ca(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Ca(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Ca("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Ca(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Ca(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Ca(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var wu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Sg = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(wu)
  );
  function $m(t, e) {
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
              di(z);
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
              di(z);
            }
            n.currentTarget = null, u = g;
          }
      }
    }
  }
  function Ct(t, e) {
    var l = e[Ro];
    l === void 0 && (l = e[Ro] = /* @__PURE__ */ new Set());
    var a = t + "__bubble";
    l.has(a) || (km(e, t, 2, !1), l.add(a));
  }
  function jr(t, e, l) {
    var a = 0;
    e && (a |= 4), km(
      l,
      t,
      a,
      e
    );
  }
  var oc = "_reactListening" + Math.random().toString(36).slice(2);
  function Rr(t) {
    if (!t[oc]) {
      t[oc] = !0, Uo.forEach(function(l) {
        l !== "selectionchange" && (Sg.has(l) || jr(l, !1, t), jr(l, !0, t));
      });
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[oc] || (e[oc] = !0, jr("selectionchange", !1, e));
    }
  }
  function km(t, e, l, a) {
    switch (Lh(e)) {
      case 2:
        var n = dy;
        break;
      case 8:
        n = my;
        break;
      default:
        n = Ir;
    }
    l = n.bind(
      null,
      e,
      l,
      t
    ), n = void 0, !qc || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (n = !0), a ? n !== void 0 ? t.addEventListener(e, l, {
      capture: !0,
      passive: n
    }) : t.addEventListener(e, l, !0) : n !== void 0 ? t.addEventListener(e, l, {
      passive: n
    }) : t.addEventListener(e, l, !1);
  }
  function wr(t, e, l, a, n) {
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
            if (i = Aa(o), i === null) return;
            if (g = i.tag, g === 5 || g === 6 || g === 26 || g === 27) {
              a = u = i;
              continue t;
            }
            o = o.parentNode;
          }
        }
        a = a.return;
      }
    $o(function() {
      var N = u, z = Lc(l), H = [];
      t: {
        var _ = Tf.get(t);
        if (_ !== void 0) {
          var O = ri, X = t;
          switch (t) {
            case "keypress":
              if (ci(l) === 0) break t;
            case "keydown":
            case "keyup":
              O = nv;
              break;
            case "focusin":
              X = "focus", O = Qc;
              break;
            case "focusout":
              X = "blur", O = Qc;
              break;
            case "beforeblur":
            case "afterblur":
              O = Qc;
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
              O = Wo;
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
            case pf:
            case Sf:
            case _f:
              O = k0;
              break;
            case Ef:
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
              O = Po;
              break;
            case "submit":
              O = cv;
              break;
            case "toggle":
            case "beforetoggle":
              O = vv;
          }
          var tt = (e & 4) !== 0, _t = !tt && (t === "scroll" || t === "scrollend"), T = tt ? _ !== null ? _ + "Capture" : null : _;
          tt = [];
          for (var p = N, M; p !== null; ) {
            var B = p;
            if (M = B.stateNode, B = B.tag, B !== 5 && B !== 26 && B !== 27 || M === null || T === null || (B = eu(p, T), B != null && tt.push(
              Du(p, B, M)
            )), _t) break;
            p = p.return;
          }
          0 < tt.length && (_ = new O(
            _,
            X,
            null,
            l,
            z
          ), H.push({ event: _, listeners: tt }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (O = t === "mouseover" || t === "pointerover", _ = t === "mouseout" || t === "pointerout", O && l !== Hc && (X = l.relatedTarget || l.fromElement) && (Aa(X) || X[an]))
            break t;
          (_ || O) && (X = z.window === z ? z : (O = z.ownerDocument) ? O.defaultView || O.parentWindow : window, _ ? (O = l.relatedTarget || l.toElement, _ = N, O = O ? Aa(O) : null, O !== null && (_t = h(O), tt = O.tag, O !== _t || tt !== 5 && tt !== 27 && tt !== 6) && (O = null)) : (_ = null, O = N), _ !== O && (tt = Wo, B = "onMouseLeave", T = "onMouseEnter", p = "mouse", (t === "pointerout" || t === "pointerover") && (tt = Po, B = "onPointerLeave", T = "onPointerEnter", p = "pointer"), _t = _ == null ? X : tu(_), M = O == null ? X : tu(O), X = new tt(
            B,
            p + "leave",
            _,
            l,
            z
          ), X.target = _t, X.relatedTarget = M, B = null, Aa(z) === N && (tt = new tt(
            T,
            p + "enter",
            O,
            l,
            z
          ), tt.target = M, tt.relatedTarget = _t, B = tt), _t = B, tt = _ && O ? Bt(
            _,
            O,
            _g
          ) : null, _ !== null && Fm(
            H,
            X,
            _,
            tt,
            !1
          ), O !== null && _t !== null && Fm(
            H,
            _t,
            O,
            tt,
            !0
          )));
        }
        t: {
          if (_ = N ? tu(N) : window, O = _.nodeName && _.nodeName.toLowerCase(), O === "select" || O === "input" && _.type === "file")
            var $ = sf;
          else if (uf(_))
            if (rf)
              $ = xv;
            else {
              $ = Tv;
              var wt = Ev;
            }
          else
            O = _.nodeName, !O || O.toLowerCase() !== "input" || _.type !== "checkbox" && _.type !== "radio" ? N && Bc(N.elementType) && ($ = sf) : $ = Nv;
          if ($ && ($ = $(t, N))) {
            cf(
              H,
              $,
              l,
              z
            );
            break t;
          }
          wt && wt(t, _, N);
        }
        switch (wt = N ? tu(N) : window, t) {
          case "focusin":
            (uf(wt) || wt.contentEditable === "true") && (mn = wt, Wc = N, ru = null);
            break;
          case "focusout":
            ru = Wc = mn = null;
            break;
          case "mousedown":
            Ic = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Ic = !1, yf(H, l, z);
            break;
          case "selectionchange":
            if (Ov) break;
          case "keydown":
          case "keyup":
            yf(H, l, z);
        }
        var nt;
        if (Kc)
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
          dn ? af(t, l) && (st = "onCompositionEnd") : t === "keydown" && l.keyCode === 229 && (st = "onCompositionStart");
        st && (tf && l.locale !== "ko" && (dn || st !== "onCompositionStart" ? st === "onCompositionEnd" && dn && (nt = ko()) : (kl = z, Gc = "value" in kl ? kl.value : kl.textContent, dn = !0)), wt = fc(N, st), 0 < wt.length && (st = new Io(
          st,
          t,
          null,
          l,
          z
        ), H.push({ event: st, listeners: wt }), nt ? st.data = nt : (nt = nf(l), nt !== null && (st.data = nt)))), (nt = yv ? bv(t, l) : pv(t, l)) && (st = fc(N, "onBeforeInput"), 0 < st.length && (wt = new Io(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          z
        ), H.push({
          event: wt,
          listeners: st
        }), wt.data = nt)), yg(
          H,
          t,
          N,
          l,
          z
        );
      }
      $m(H, e);
    });
  }
  function Du(t, e, l) {
    return {
      instance: t,
      listener: e,
      currentTarget: l
    };
  }
  function fc(t, e) {
    for (var l = e + "Capture", a = []; t !== null; ) {
      var n = t, u = n.stateNode;
      if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || u === null || (n = eu(t, l), n != null && a.unshift(
        Du(t, n, u)
      ), n = eu(t, e), n != null && a.push(
        Du(t, n, u)
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
  function Fm(t, e, l, a, n) {
    for (var u = e._reactName, i = []; l !== null && l !== a; ) {
      var o = l, g = o.alternate, N = o.stateNode;
      if (o = o.tag, g !== null && g === a) break;
      o !== 5 && o !== 26 && o !== 27 || N === null || (g = N, n ? (N = eu(l, u), N != null && i.unshift(
        Du(l, N, g)
      )) : n || (N = eu(l, u), N != null && i.push(
        Du(l, N, g)
      ))), l = l.return;
    }
    i.length !== 0 && t.push({ event: e, listeners: i });
  }
  var Eg = /\r\n?/g, Tg = /\u0000|\uFFFD/g;
  function Wm(t) {
    return (typeof t == "string" ? t : "" + t).replace(Eg, `
`).replace(Tg, "");
  }
  function Im(t, e) {
    return e = Wm(e), Wm(t) === e;
  }
  function Kt(t, e, l, a, n, u) {
    switch (l) {
      case "children":
        if (typeof a == "string")
          e === "body" || e === "textarea" && a === "" || rn(t, a);
        else if (typeof a == "number" || typeof a == "bigint")
          e !== "body" && rn(t, "" + a);
        else return;
        break;
      case "className":
        ni(t, "class", a);
        break;
      case "tabIndex":
        ni(t, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        ni(t, l, a);
        break;
      case "style":
        Ko(t, a, u);
        return;
      case "data":
        if (e !== "object") {
          ni(t, "data", a);
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
        a = ui(a), t.setAttribute(l, a);
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
        a = ui(a), t.setAttribute(l, a);
        break;
      case "onClick":
        a != null && (t.onclick = vl);
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
        l = ui(a), t.setAttributeNS(
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
        Ct("beforetoggle", t), Ct("toggle", t), ai(t, "popover", a);
        break;
      case "xlinkActuate":
        Rl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        Rl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        Rl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        Rl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        Rl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        Rl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        Rl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        Rl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        Rl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        ai(t, "is", a);
        break;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N")
          l = X0.get(l) || l, ai(t, l, a);
        else return;
    }
    Yt = !0;
  }
  function Dr(t, e, l, a, n, u) {
    switch (l) {
      case "style":
        Ko(t, a, u);
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
        if (typeof a == "string") rn(t, a);
        else if (typeof a == "number" || typeof a == "bigint")
          rn(t, "" + a);
        else return;
        break;
      case "onScroll":
        a != null && Ct("scroll", t);
        return;
      case "onScrollEnd":
        a != null && Ct("scrollend", t);
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
        if (!Bo.hasOwnProperty(l))
          t: {
            if (l[0] === "o" && l[1] === "n" && (n = l.endsWith("Capture"), u = l.slice(2, n ? l.length - 7 : void 0), e = t[De] || null, e = e != null ? e[l] : null, typeof e == "function" && t.removeEventListener(u, e, n), typeof a == "function")) {
              typeof e != "function" && e !== null && (l in t ? t[l] = null : t.hasAttribute(l) && t.removeAttribute(l)), t.addEventListener(u, a, n);
              break t;
            }
            Yt = !0, l in t ? t[l] = a : a === !0 ? t.setAttribute(l, "") : ai(t, l, a);
          }
        return;
    }
    Yt = !0;
  }
  function Ne(t, e, l) {
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
                  Kt(t, e, u, i, l, null);
              }
          }
        n && Kt(t, e, "srcSet", l.srcSet, l, null), a && Kt(t, e, "src", l.src, l, null);
        return;
      case "input":
        Ct("invalid", t);
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
        Xo(
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
        Ct("invalid", t), a = i = u = null;
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
        e = u, l = i, t.multiple = !!a, e != null ? sn(t, !!a, e, !1) : l != null && sn(t, !!a, l, !0);
        return;
      case "textarea":
        Ct("invalid", t), u = n = a = null;
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
        Qo(t, a, n, u);
        return;
      case "option":
        for (g in l)
          l.hasOwnProperty(g) && (a = l[g], a != null) && (g === "selected" ? t.selected = a && typeof a != "function" && typeof a != "symbol" : Kt(t, e, g, a, l, null));
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
        for (a = 0; a < wu.length; a++)
          Ct(wu[a], t);
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
        if (Bc(e)) {
          for (z in l)
            l.hasOwnProperty(z) && (a = l[z], a !== void 0 && Dr(
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
          var H = l[O];
          if (l.hasOwnProperty(O) && H != null)
            switch (O) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                g = H;
              default:
                a.hasOwnProperty(O) || Kt(t, e, O, null, a, H);
            }
        }
        for (var _ in a) {
          var O = a[_];
          if (H = l[_], a.hasOwnProperty(_) && (O != null || H != null))
            switch (_) {
              case "type":
                O !== H && (Yt = !0), u = O;
                break;
              case "name":
                O !== H && (Yt = !0), n = O;
                break;
              case "checked":
                O !== H && (Yt = !0), N = O;
                break;
              case "defaultChecked":
                O !== H && (Yt = !0), z = O;
                break;
              case "value":
                O !== H && (Yt = !0), i = O;
                break;
              case "defaultValue":
                O !== H && (Yt = !0), o = O;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (O != null)
                  throw Error(s(137, e));
                break;
              default:
                O !== H && Kt(
                  t,
                  e,
                  _,
                  O,
                  a,
                  H
                );
            }
        }
        Dc(
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
        e = o, l = i, a = O, _ != null ? sn(t, !!l, _, !1) : !!a != !!l && (e != null ? sn(t, !!l, e, !0) : sn(t, !!l, l ? [] : "", !1));
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
        Vo(t, _, O);
        return;
      case "option":
        for (var X in l)
          _ = l[X], l.hasOwnProperty(X) && _ != null && !a.hasOwnProperty(X) && (X === "selected" ? t.selected = !1 : Kt(
            t,
            e,
            X,
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
        if (Bc(e)) {
          for (var _t in l)
            _ = l[_t], l.hasOwnProperty(_t) && _ !== void 0 && !a.hasOwnProperty(_t) && Dr(
              t,
              e,
              _t,
              void 0,
              a,
              _
            );
          for (z in a)
            _ = a[z], O = l[z], !a.hasOwnProperty(z) || _ === O || _ === void 0 && O === void 0 || Dr(
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
    for (var T in l)
      _ = l[T], l.hasOwnProperty(T) && _ != null && !a.hasOwnProperty(T) && Kt(t, e, T, null, a, _);
    for (H in a)
      _ = a[H], O = l[H], !a.hasOwnProperty(H) || _ === O || _ == null && O == null || Kt(t, e, H, _, a, O);
  }
  function Pm(t) {
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
        if (u && o && Pm(i)) {
          for (i = 0, o = n.responseEnd, a += 1; a < l.length; a++) {
            var g = l[a], N = g.startTime;
            if (N > o) break;
            var z = g.transferSize, H = g.initiatorType;
            z && Pm(H) && (g = g.responseEnd, i += z * (g < o ? 1 : (o - N) / (g - N)));
          }
          if (--a, e += 8 * (u + i) / (n.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var Ur = null, Br = null;
  function Uu(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function th(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function eh(t, e) {
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
  function lh(t, e, l, a) {
    return l = Uu(
      l
    ).createElement(t), l[pe] = a, l[De] = e, Ne(l, t, e), ve(l), l;
  }
  function Hr(t, e) {
    return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.children == "bigint" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
  }
  var Lr = null;
  function Og() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Lr ? !1 : (Lr = t, !0) : (Lr = null, !1);
  }
  var Yr = typeof setTimeout == "function" ? setTimeout : void 0, zg = typeof clearTimeout == "function" ? clearTimeout : void 0, ah = typeof Promise == "function" ? Promise : void 0, nh = typeof requestAnimationFrame == "function" ? requestAnimationFrame : Yr, Ag = typeof queueMicrotask == "function" ? queueMicrotask : typeof ah < "u" ? function(t) {
    return ah.resolve(null).then(t).catch(Cg);
  } : Yr;
  function Cg(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function va(t) {
    return t === "head";
  }
  function uh(t, e) {
    var l = e, a = 0;
    do {
      var n = l.nextSibling;
      if (t.removeChild(l), n && n.nodeType === 8)
        if (l = n.data, l === "/$" || l === "/&") {
          if (a === 0) {
            t.removeChild(n), Kn(e);
            return;
          }
          a--;
        } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&")
          a++;
        else if (l === "html")
          Jr(
            t.ownerDocument.documentElement
          );
        else if (l === "head") {
          l = t.ownerDocument.head, Jr(l);
          for (var u = l.firstChild; u; ) {
            var i = u.nextSibling, o = u.nodeName;
            u[Pn] || o === "SCRIPT" || o === "STYLE" || o === "LINK" && u.rel.toLowerCase() === "stylesheet" || l.removeChild(u), u = i;
          }
        } else
          l === "body" && Jr(t.ownerDocument.body);
      l = n;
    } while (l);
    Kn(e);
  }
  function ih(t, e) {
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
  function ch(t, e, l) {
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
  function sh(t, e) {
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
  function qr(t) {
    var e = t.getBoundingClientRect(), l = getComputedStyle(t);
    return jg(e, l, t);
  }
  function Rg(t) {
    return t.documentElement.clientHeight;
  }
  function wg(t) {
    this.addEventListener("load", t), this.addEventListener("error", t);
  }
  function Dg(t, e, l, a, n, u, i, o, g) {
    var N = e.nodeType === 9 ? e : e.ownerDocument;
    try {
      var z = N.startViewTransition({
        update: function() {
          var _ = N.defaultView, O = _.navigation && _.navigation.transition, X = N.fonts.status;
          a();
          var tt = [];
          if (X === "loaded" && (Rg(N), N.fonts.status === "loading" && tt.push(N.fonts.ready)), X = tt.length, t !== null)
            for (var _t = t.suspenseyImages, T = 0, p = 0; p < _t.length; p++) {
              var M = _t[p];
              if (!M.complete) {
                var B = M.getBoundingClientRect();
                if (0 < B.bottom && 0 < B.right && B.top < _.innerHeight && B.left < _.innerWidth) {
                  if (T += Ah(M), T > hc) {
                    tt.length = X;
                    break;
                  }
                  M = new Promise(
                    wg.bind(M)
                  ), tt.push(M);
                }
              }
            }
          if (0 < tt.length)
            return _ = Promise.race([
              Promise.all(tt),
              new Promise(function($) {
                return setTimeout($, 500);
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
      var H = [];
      return z.ready.then(
        function() {
          for (var _ = N.documentElement.getAnimations({
            subtree: !0
          }), O = 0; O < _.length; O++) {
            var X = _[O], tt = X.effect, _t = tt.pseudoElement;
            if (_t != null && _t.startsWith("::view-transition")) {
              H.push(X), X = tt.getKeyframes();
              for (var T = _t = void 0, p = !0, M = 0; M < X.length; M++) {
                var B = X[M], $ = B.width;
                if (_t === void 0) _t = $;
                else if (_t !== $) {
                  p = !1;
                  break;
                }
                if ($ = B.height, T === void 0) T = $;
                else if (T !== $) {
                  p = !1;
                  break;
                }
                delete B.width, delete B.height, B.transform === "none" && delete B.transform;
              }
              p && _t !== void 0 && T !== void 0 && (tt.setKeyframes(X), p = getComputedStyle(
                tt.target,
                tt.pseudoElement
              ), p.width !== _t || p.height !== T) && (p = X[0], p.width = _t, p.height = T, p = X[X.length - 1], p.width = _t, p.height = T, tt.setKeyframes(X));
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
        for (var _ = 0; _ < H.length; _++)
          H[_].cancel();
        N.__reactViewTransition === z && (N.__reactViewTransition = null), o();
      }), z;
    } catch {
      return a(), n(), i(), null;
    }
  }
  function Fa(t, e) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + t + "(" + e + ")";
  }
  Fa.prototype.animate = function(t, e) {
    return e = typeof e == "number" ? { duration: e } : Z({}, e), e.pseudoElement = this._selector, this._scope.animate(t, e);
  }, Fa.prototype.getAnimations = function() {
    for (var t = this._scope, e = this._selector, l = t.getAnimations({ subtree: !0 }), a = [], n = 0; n < l.length; n++) {
      var u = l[n].effect;
      u !== null && u.target === t && u.pseudoElement === e && a.push(l[n]);
    }
    return a;
  }, Fa.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function rh(t) {
    return {
      name: t,
      group: new Fa("group", t),
      imagePair: new Fa("image-pair", t),
      old: new Fa("old", t),
      new: new Fa("new", t)
    };
  }
  function ke(t) {
    this._fragmentFiber = t, this._observers = this._eventListeners = null;
  }
  ke.prototype.addEventListener = function(t, e, l) {
    var a = null, n = null;
    if (!(l != null && typeof l != "boolean" && (a = l.signal || null, a !== null && a.aborted))) {
      this._eventListeners === null && (this._eventListeners = []);
      var u = this._eventListeners;
      if (fh(u, t, e, l) === -1) {
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
        ), a.addEventListener("abort", n, { once: !0 }), n = a.removeEventListener.bind(a, "abort", n)), a = qn(l), u.push({
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
    return k(t).addEventListener(
      e,
      l,
      a
    ), !1;
  }
  ke.prototype.removeEventListener = function(t, e, l) {
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
      n = qn(n.optionsOrUseCapture), v(
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
  function qn(t) {
    return t != null && typeof t != "boolean" && (t.once === !0 || t.signal instanceof AbortSignal) ? { capture: t.capture, passive: t.passive } : t;
  }
  function oh(t) {
    return t == null ? "c=0" : typeof t == "boolean" ? "c=" + (t ? "1" : "0") : "c=" + (t.capture ? "1" : "0");
  }
  function fh(t, e, l, a) {
    if (t.length === 0) return -1;
    a = oh(a);
    for (var n = 0; n < t.length; n++) {
      var u = t[n];
      if (u.type === e && u.listener === l && oh(u.optionsOrUseCapture) === a)
        return n;
    }
    return -1;
  }
  ke.prototype.dispatchEvent = function(t) {
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
            qn(u.optionsOrUseCapture)
          );
        }
      if (e.appendChild(a), t = a.dispatchEvent(t), l)
        for (n = 0; n < l.length; n++)
          u = l[n], a.removeEventListener(
            u.type,
            u.attachedListener,
            qn(u.optionsOrUseCapture)
          );
      return e.removeChild(a), t;
    }
    return e.dispatchEvent(t);
  }, ke.prototype.focus = function(t) {
    v(
      this._fragmentFiber.child,
      !0,
      dh,
      t,
      void 0,
      void 0
    );
  };
  function dh(t, e) {
    return t.tag === 6 ? !1 : (t = k(t), $g(t, e));
  }
  ke.prototype.focusLast = function(t) {
    var e = [];
    v(
      this._fragmentFiber.child,
      !0,
      Gr,
      e,
      void 0,
      void 0
    );
    for (var l = e.length - 1; 0 <= l && !dh(e[l], t); l--) ;
  };
  function Gr(t, e) {
    return e.push(t), !1;
  }
  ke.prototype.blur = function() {
    var t = j(
      this._fragmentFiber
    );
    t !== null && (t = k(t), t = Uu(t).activeElement, t !== null && v(
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
  ke.prototype.observeUsing = function(t) {
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
    return t.tag === 6 || (t = k(t), e.observe(t)), !1;
  }
  ke.prototype.unobserveUsing = function(t) {
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
    return t.tag === 6 || (t = k(t), e.unobserve(t)), !1;
  }
  var fl = [], Xr = !1;
  function qg(t, e, l) {
    fl.push({
      fragmentInstance: t,
      observer: e,
      instance: l
    }), Xr || (Xr = !0, kg(function() {
      Xr = !1;
      var a = fl;
      fl = [];
      for (var n = 0; n < a.length; n++) {
        var u = a[n];
        u.observer.unobserve(u.instance);
      }
    }));
  }
  ke.prototype.getClientRects = function() {
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
      t = k(t), e.push.apply(e, t.getClientRects());
    return !1;
  }
  ke.prototype.getRootNode = function(t) {
    var e = j(
      this._fragmentFiber
    );
    return e === null ? this : k(e).getRootNode(t);
  }, ke.prototype.compareDocumentPosition = function(t) {
    var e = j(
      this._fragmentFiber
    );
    if (e === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var l = [];
    v(
      this._fragmentFiber.child,
      !1,
      Gr,
      l,
      void 0,
      void 0
    );
    var a = k(e);
    if (l.length === 0) {
      if (l = a, U(this._fragmentFiber)) {
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
      return l === t ? n = Node.DOCUMENT_POSITION_CONTAINS : a & Node.DOCUMENT_POSITION_CONTAINED_BY && (l = W(e)[1], l === null ? n = Node.DOCUMENT_POSITION_PRECEDING : (t = k(l).compareDocumentPosition(
        t
      ), n = t === 0 || t & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), n |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    e = k(l[0]), n = k(l[l.length - 1]);
    var u = U(this._fragmentFiber) ? e.parentElement : a;
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
    var u = Aa(n);
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
      it
    ), e === null ? e = !1 : (v(
      e,
      !0,
      V,
      u,
      l
    ), u = ht, ht = null, e = u !== null)), e) : t & Node.DOCUMENT_POSITION_FOLLOWING ? ((e = !!u) && !(e = u === a) && (e = Bt(
      a,
      u,
      it
    ), e === null ? e = !1 : (v(
      e,
      !0,
      Mt,
      u,
      a
    ), u = ht, q = ht = null, e = u !== null)), e) : !1;
  }
  function mh(t, e) {
    var l = t.ownerDocument.createRange();
    l.selectNodeContents(t), t = l.getBoundingClientRect(), window.scrollTo(
      window.scrollX + t.left,
      e ? window.scrollY + t.top : window.scrollY + t.bottom - window.innerHeight
    );
  }
  ke.prototype.scrollIntoView = function(t) {
    if (typeof t == "object") throw Error(s(566));
    var e = [];
    v(
      this._fragmentFiber.child,
      !1,
      Gr,
      e,
      void 0,
      void 0
    );
    var l = t !== !1;
    if (e.length === 0) {
      var a = W(
        this._fragmentFiber
      );
      if (a = l ? a[1] || a[0] || j(this._fragmentFiber) : a[0] || a[1], a === null) return;
      if (a.tag === 6) {
        t = k(a), mh(t, l);
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
      n.tag === 6 ? (n = k(n), mh(n, l)) : k(n).scrollIntoView(t), a += l ? -1 : 1;
    }
  };
  function Vg(t, e) {
    return t = k(t), hh(t, e), !1;
  }
  function hh(t, e) {
    t.reactFragments == null && (t.reactFragments = /* @__PURE__ */ new Set()), t.reactFragments.add(e);
  }
  function vh(t, e) {
    var l = e._eventListeners;
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var n = l[a];
        t.addEventListener(
          n.type,
          n.attachedListener,
          qn(n.optionsOrUseCapture)
        );
      }
    t.nodeType !== 3 && (l = e._observers, l !== null && l.forEach(function(u) {
      for (var i = 0, o = 0; o < fl.length; o++) {
        var g = fl[o];
        (g.fragmentInstance !== e || g.observer !== u || g.instance !== t) && (fl[i++] = g);
      }
      fl.length = i, u.observe(t);
    }), hh(t, e));
  }
  function Qg(t, e) {
    var l = e._eventListeners;
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var n = l[a];
        t.removeEventListener(
          n.type,
          n.attachedListener,
          qn(n.optionsOrUseCapture)
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
  function Vr(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var l = e;
      switch (e = e.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Vr(l), li(l);
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
        if (!t[Pn])
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
  function gh(t, e) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = nl(t.nextSibling), t === null)) return null;
    return t;
  }
  function Qr(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Zr(t) {
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
  var Kr = null;
  function yh(t) {
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
  function bh(t) {
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
    nh(function() {
      nh(function(e) {
        return t(e);
      });
    });
  }
  function ph(t, e, l) {
    switch (e = Uu(l), t) {
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
  function Sh(t, e, l) {
    for (var a in l) {
      var n = l[a];
      l.hasOwnProperty(a) && n != null && Kt(t, e, a, null, Ng, n);
    }
    l.dangerouslySetInnerHTML != null && (t.textContent = ""), t.onclick === vl && (t.onclick = null), li(t);
  }
  function Jr(t) {
    for (var e = t.attributes; e.length; )
      t.removeAttributeNode(e[0]);
    li(t);
  }
  var ul = /* @__PURE__ */ new Map(), _h = /* @__PURE__ */ new Set();
  function Bu(t) {
    if (typeof t.getRootNode == "function") {
      var e = t.getRootNode();
      if (e.nodeType === 9 || e.nodeType === 11) return e;
    }
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  var Zl = lt.d;
  lt.d = {
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
    var t = Zl.f(), e = uc();
    return t || e;
  }
  function Wg(t) {
    var e = nn(t);
    e !== null && e.tag === 5 && e.type === "form" ? Td(e) : Zl.r(t);
  }
  var Gn = typeof document > "u" ? null : document;
  function Eh(t, e, l) {
    var a = Gn;
    if (a && typeof e == "string" && e) {
      var n = We(e);
      n = 'link[rel="' + t + '"][href="' + n + '"]', typeof l == "string" && (n += '[crossorigin="' + l + '"]'), _h.has(n) || (_h.add(n), t = { rel: t, crossOrigin: l, href: e }, a.querySelector(n) === null && (e = a.createElement("link"), Ne(e, "link", t), ve(e), a.head.appendChild(e)));
    }
  }
  function Ig(t) {
    Zl.D(t), Eh("dns-prefetch", t, null);
  }
  function Pg(t, e) {
    Zl.C(t, e), Eh("preconnect", t, e);
  }
  function ty(t, e, l) {
    Zl.L(t, e, l);
    var a = Gn;
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
          u = Xn(t);
          break;
        case "script":
          u = Vn(t);
      }
      if (!(ul.has(u) || (t = Z(
        {
          rel: "preload",
          href: e === "image" && l && l.imageSrcSet ? void 0 : t,
          as: e
        },
        l
      ), ul.set(u, t), a.querySelector(n) !== null || e === "style" && a.querySelector(Hu(u)) || e === "script" && a.querySelector(Lu(u))))) {
        var i = a.createElement("link");
        Ne(i, "link", t), e === "style" && (i[ei] = !0, i.onload = i.onerror = function() {
          Do(i);
        }), ve(i), a.head.appendChild(i);
      }
    }
  }
  function ey(t, e) {
    Zl.m(t, e);
    var l = Gn;
    if (l && t) {
      var a = e && typeof e.as == "string" ? e.as : "script", n = 'link[rel="modulepreload"][as="' + We(a) + '"][href="' + We(t) + '"]', u = n;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = Vn(t);
      }
      if (!ul.has(u) && (t = Z({ rel: "modulepreload", href: t }, e), ul.set(u, t), l.querySelector(n) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(Lu(u)))
              return;
        }
        a = l.createElement("link"), Ne(a, "link", t), ve(a), l.head.appendChild(a);
      }
    }
  }
  function ly(t, e, l) {
    Zl.S(t, e, l);
    var a = Gn;
    if (a && t) {
      var n = un(a).hoistableStyles, u = Xn(t);
      e = e || "default";
      var i = n.get(u);
      if (!i) {
        var o = { loading: 0, preload: null };
        if (i = a.querySelector(
          Hu(u)
        ))
          o.loading = 5;
        else {
          t = Z(
            { rel: "stylesheet", href: t, "data-precedence": e },
            l
          ), (l = ul.get(u)) && $r(t, l);
          var g = i = a.createElement("link");
          ve(g), Ne(g, "link", t), g._p = new Promise(function(N, z) {
            g.onload = N, g.onerror = z;
          }), g.addEventListener("load", function() {
            o.loading |= 1;
          }), g.addEventListener("error", function() {
            o.loading |= 2;
          }), o.loading |= 4, dc(i, e, a);
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
    Zl.X(t, e);
    var l = Gn;
    if (l && t) {
      var a = un(l).hoistableScripts, n = Vn(t), u = a.get(n);
      u || (u = l.querySelector(Lu(n)), u || (t = Z({ src: t, async: !0 }, e), (e = ul.get(n)) && kr(t, e), u = l.createElement("script"), ve(u), Ne(u, "link", t), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function ny(t, e) {
    Zl.M(t, e);
    var l = Gn;
    if (l && t) {
      var a = un(l).hoistableScripts, n = Vn(t), u = a.get(n);
      u || (u = l.querySelector(Lu(n)), u || (t = Z({ src: t, async: !0, type: "module" }, e), (e = ul.get(n)) && kr(t, e), u = l.createElement("script"), ve(u), Ne(u, "link", t), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function Th(t, e, l, a) {
    var n = (n = Ot.current) ? Bu(n) : null;
    if (!n) throw Error(s(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string" ? (l = Xn(l.href), e = un(
          n
        ).hoistableStyles, a = e.get(l), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, e.set(l, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          t = Xn(l.href);
          var u = un(
            n
          ).hoistableStyles, i = u.get(t);
          if (i || (n = n.ownerDocument || n, i = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(t, i), (u = n.querySelector(
            Hu(t)
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
        return e = l.async, l = l.src, typeof l == "string" && e && typeof e != "function" && typeof e != "symbol" ? (l = Vn(l), e = un(
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
  function Xn(t) {
    return 'href="' + We(t) + '"';
  }
  function Hu(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function Nh(t) {
    return Z({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function uy(t, e, l, a) {
    if (e = t.querySelector(
      'link[rel="preload"][as="style"][' + e + "]"
    )) {
      if (e[ei] !== !0) {
        a.loading = 1;
        return;
      }
    } else
      e = t.createElement("link"), e[ei] = !0, e.onload = e.onerror = Do.bind(null, e), Ne(e, "link", l), ve(e), t.head.appendChild(e);
    a.preload = e, e.addEventListener("load", function() {
      return a.loading |= 1;
    }), e.addEventListener("error", function() {
      return a.loading |= 2;
    });
  }
  function Vn(t) {
    return '[src="' + We(t) + '"]';
  }
  function Lu(t) {
    return "script[async]" + t;
  }
  function xh(t, e, l) {
    if (e.count++, e.instance === null)
      switch (e.type) {
        case "style":
          var a = t.querySelector(
            'style[data-href~="' + We(l.href) + '"]'
          );
          if (a)
            return e.instance = a, ve(a), a;
          var n = Z({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          return a = (t.ownerDocument || t).createElement(
            "style"
          ), ve(a), Ne(a, "style", n), dc(a, l.precedence, t), e.instance = a;
        case "stylesheet":
          n = Xn(l.href);
          var u = t.querySelector(
            Hu(n)
          );
          if (u)
            return e.state.loading |= 4, e.instance = u, ve(u), u;
          a = Nh(l), (n = ul.get(n)) && $r(a, n), u = (t.ownerDocument || t).createElement("link"), ve(u);
          var i = u;
          return i._p = new Promise(function(o, g) {
            i.onload = o, i.onerror = g;
          }), Ne(u, "link", a), e.state.loading |= 4, dc(u, l.precedence, t), e.instance = u;
        case "script":
          return u = Vn(l.src), (n = t.querySelector(
            Lu(u)
          )) ? (e.instance = n, ve(n), n) : (a = l, (n = ul.get(u)) && (a = Z({}, l), kr(a, n)), t = t.ownerDocument || t, n = t.createElement("script"), ve(n), Ne(n, "link", a), t.head.appendChild(n), e.instance = n);
        case "void":
          return null;
        default:
          throw Error(s(443, e.type));
      }
    else
      e.type === "stylesheet" && (e.state.loading & 4) === 0 && (a = e.instance, e.state.loading |= 4, dc(a, l.precedence, t));
    return e.instance;
  }
  function dc(t, e, l) {
    for (var a = l.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), n = a.length ? a[a.length - 1] : null, u = n, i = 0; i < a.length; i++) {
      var o = a[i];
      if (o.dataset.precedence === e) u = o;
      else if (u !== n) break;
    }
    u ? u.parentNode.insertBefore(t, u.nextSibling) : (e = l.nodeType === 9 ? l.head : l, e.insertBefore(t, e.firstChild));
  }
  function $r(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.title == null && (t.title = e.title);
  }
  function kr(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.integrity == null && (t.integrity = e.integrity);
  }
  var mc = null;
  function Mh(t, e, l) {
    if (mc === null) {
      var a = /* @__PURE__ */ new Map(), n = mc = /* @__PURE__ */ new Map();
      n.set(l, a);
    } else
      n = mc, a = n.get(l), a || (a = /* @__PURE__ */ new Map(), n.set(l, a));
    if (a.has(t)) return a;
    for (a.set(t, null), l = l.getElementsByTagName(t), n = 0; n < l.length; n++) {
      var u = l[n];
      if (!(u[Pn] || u[pe] || t === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var i = u.getAttribute(e) || "";
        i = t + i;
        var o = a.get(i);
        o ? o.push(u) : a.set(i, [u]);
      }
    }
    return a;
  }
  function Fr(t, e, l) {
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
  function Oh(t, e) {
    return t === "img" && e.src != null && e.src !== "" && e.onLoad == null && e.loading !== "lazy";
  }
  function zh(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function Ah(t) {
    return (t.width || 100) * (t.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
  }
  function Ch(t, e) {
    typeof e.decode == "function" && (t.imgCount++, e.complete || (t.imgBytes += Ah(e), t.suspenseyImages.push(e)), t = ry.bind(t), e.decode().then(t, t));
  }
  function cy(t, e, l, a) {
    if (l.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var n = Xn(a.href), u = e.querySelector(
          Hu(n)
        );
        if (u) {
          e = u._p, e !== null && typeof e == "object" && typeof e.then == "function" && (t.count++, t = Yu.bind(t), e.then(t, t)), l.state.loading |= 4, l.instance = u, ve(u);
          return;
        }
        u = e.ownerDocument || e, a = Nh(a), (n = ul.get(n)) && $r(a, n), u = u.createElement("link"), ve(u);
        var i = u;
        i._p = new Promise(function(o, g) {
          i.onload = o, i.onerror = g;
        }), Ne(u, "link", a), l.instance = u;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(l, e), (e = l.state.preload) && (l.state.loading & 3) === 0 && (t.count++, l = Yu.bind(t), e.addEventListener("load", l), e.addEventListener("error", l));
    }
  }
  var hc = 0;
  function sy(t, e) {
    return t.stylesheets && t.count === 0 && gc(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(l) {
      var a = setTimeout(function() {
        if (t.stylesheets && gc(t, t.stylesheets), t.unsuspend) {
          var u = t.unsuspend;
          t.unsuspend = null, u();
        }
      }, 6e4 + e);
      0 < t.imgBytes && hc === 0 && (hc = 62500 * Mg());
      var n = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && gc(t, t.stylesheets), t.unsuspend)) {
            var u = t.unsuspend;
            t.unsuspend = null, u();
          }
        },
        (t.imgBytes > hc ? 50 : 800) + e
      );
      return t.unsuspend = l, function() {
        t.unsuspend = null, clearTimeout(a), clearTimeout(n);
      };
    } : null;
  }
  function jh(t) {
    if (t.count === 0 && (t.imgCount === 0 || !t.waitingForImages)) {
      if (t.stylesheets) gc(t, t.stylesheets);
      else if (t.unsuspend) {
        var e = t.unsuspend;
        t.unsuspend = null, e();
      }
    }
  }
  function Yu() {
    this.count--, jh(this);
  }
  function ry() {
    this.imgCount--, jh(this);
  }
  var vc = null;
  function gc(t, e) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, vc = /* @__PURE__ */ new Map(), e.forEach(oy, t), vc = null, Yu.call(t));
  }
  function oy(t, e) {
    if (!(e.state.loading & 4)) {
      var l = vc.get(t);
      if (l) var a = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), vc.set(t, l);
        for (var n = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < n.length; u++) {
          var i = n[u];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (l.set(i.dataset.precedence, i), a = i);
        }
        a && l.set(null, a);
      }
      n = e.instance, i = n.getAttribute("data-precedence"), u = l.get(i) || a, u === a && l.set(null, n), l.set(i, n), this.count++, a = Yu.bind(this), n.addEventListener("load", a), n.addEventListener("error", a), u ? u.parentNode.insertBefore(n, u.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(n, t.firstChild)), e.state.loading |= 4;
    }
  }
  var Qn = {
    $$typeof: jt,
    Provider: null,
    Consumer: null,
    _currentValue: $t,
    _currentValue2: $t,
    _threadCount: 0
  };
  function fy(t, e, l, a, n, u, i, o, g) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Cc(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Cc(0), this.hiddenUpdates = Cc(null), this.identifierPrefix = a, this.onUncaughtError = n, this.onCaughtError = u, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = g, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Rh(t, e, l, a, n, u, i, o, g, N, z, H) {
    return t = new fy(
      t,
      e,
      l,
      i,
      g,
      N,
      z,
      H,
      o
    ), e = 1, u === !0 && (e |= 24), u = Ue(3, null, null, e), t.current = u, u.stateNode = t, e = fs(), e.refCount++, t.pooledCache = e, e.refCount++, u.memoizedState = {
      element: a,
      isDehydrated: l,
      cache: e
    }, vs(u), t;
  }
  function wh(t) {
    return t ? (t = gn, t) : gn;
  }
  function Dh(t, e, l, a, n, u) {
    n = wh(n), a.context === null ? a.context = n : a.pendingContext = n, a = aa(e), a.payload = { element: l }, u = u === void 0 ? null : u, u !== null && (a.callback = u), l = na(t, a, e), l !== null && (Ye(l, t, e), gu(l, t, e));
  }
  function Uh(t, e) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var l = t.retryLane;
      t.retryLane = l !== 0 && l < e ? l : e;
    }
  }
  function Wr(t, e) {
    Uh(t, e), (t = t.alternate) && Uh(t, e);
  }
  function Bh(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = wa(t, 67108864);
      e !== null && Ye(e, t, 67108864), Wr(t, 67108864);
    }
  }
  function Hh(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = $e();
      e = jc(e);
      var l = wa(t, e);
      l !== null && Ye(l, t, e), Wr(t, e);
    }
  }
  var Zn = !0;
  function dy(t, e, l, a) {
    var n = K.T;
    K.T = null;
    var u = lt.p;
    try {
      lt.p = 2, Ir(t, e, l, a);
    } finally {
      lt.p = u, K.T = n;
    }
  }
  function my(t, e, l, a) {
    var n = K.T;
    K.T = null;
    var u = lt.p;
    try {
      lt.p = 8, Ir(t, e, l, a);
    } finally {
      lt.p = u, K.T = n;
    }
  }
  function Ir(t, e, l, a) {
    if (Zn) {
      var n = Pr(a);
      if (n === null)
        wr(
          t,
          e,
          a,
          yc,
          l
        ), Yh(t, a);
      else if (vy(
        n,
        t,
        e,
        l,
        a
      ))
        a.stopPropagation();
      else if (Yh(t, a), e & 4 && -1 < hy.indexOf(t)) {
        for (; n !== null; ) {
          var u = nn(n);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var i = za(u.pendingLanes);
                  if (i !== 0) {
                    var o = u;
                    for (o.pendingLanes |= 2, o.entangledLanes |= 2; i; ) {
                      var g = 1 << 31 - Ge(i);
                      o.entanglements[1] |= g, i &= ~g;
                    }
                    xl(u), (qt & 6) === 0 && (lc = kt() + 500, Ru(0));
                  }
                }
                break;
              case 31:
              case 13:
                o = wa(u, 2), o !== null && Ye(o, u, 2), uc(), Wr(u, 2);
            }
          if (u = Pr(a), u === null && wr(
            t,
            e,
            a,
            yc,
            l
          ), u === n) break;
          n = u;
        }
        n !== null && a.stopPropagation();
      } else
        wr(
          t,
          e,
          a,
          null,
          l
        );
    }
  }
  function Pr(t) {
    return t = Lc(t), to(t);
  }
  var yc = null;
  function to(t) {
    if (yc = null, t = Aa(t), t !== null) {
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
    return yc = t, null;
  }
  function Lh(t) {
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
        switch (x()) {
          case J:
            return 2;
          case Vt:
            return 8;
          case te:
          case Oa:
            return 32;
          case Jl:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var eo = !1, ga = null, ya = null, ba = null, qu = /* @__PURE__ */ new Map(), Gu = /* @__PURE__ */ new Map(), pa = [], hy = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Yh(t, e) {
    switch (t) {
      case "focusin":
      case "focusout":
        ga = null;
        break;
      case "dragenter":
      case "dragleave":
        ya = null;
        break;
      case "mouseover":
      case "mouseout":
        ba = null;
        break;
      case "pointerover":
      case "pointerout":
        qu.delete(e.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Gu.delete(e.pointerId);
    }
  }
  function Xu(t, e, l, a, n, u) {
    return t === null || t.nativeEvent !== u ? (t = {
      blockedOn: e,
      domEventName: l,
      eventSystemFlags: a,
      nativeEvent: u,
      targetContainers: [n]
    }, e !== null && (e = nn(e), e !== null && Bh(e)), t) : (t.eventSystemFlags |= a, e = t.targetContainers, n !== null && e.indexOf(n) === -1 && e.push(n), t);
  }
  function vy(t, e, l, a, n) {
    switch (e) {
      case "focusin":
        return ga = Xu(
          ga,
          t,
          e,
          l,
          a,
          n
        ), !0;
      case "dragenter":
        return ya = Xu(
          ya,
          t,
          e,
          l,
          a,
          n
        ), !0;
      case "mouseover":
        return ba = Xu(
          ba,
          t,
          e,
          l,
          a,
          n
        ), !0;
      case "pointerover":
        var u = n.pointerId;
        return qu.set(
          u,
          Xu(
            qu.get(u) || null,
            t,
            e,
            l,
            a,
            n
          )
        ), !0;
      case "gotpointercapture":
        return u = n.pointerId, Gu.set(
          u,
          Xu(
            Gu.get(u) || null,
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
  function qh(t) {
    var e = Aa(t.target);
    if (e !== null) {
      var l = h(e);
      if (l !== null) {
        if (e = l.tag, e === 13) {
          if (e = b(l), e !== null) {
            t.blockedOn = e, jo(t.priority, function() {
              Hh(l);
            });
            return;
          }
        } else if (e === 31) {
          if (e = S(l), e !== null) {
            t.blockedOn = e, jo(t.priority, function() {
              Hh(l);
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
  function bc(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var l = Pr(t.nativeEvent);
      if (l === null) {
        l = t.nativeEvent;
        var a = new l.constructor(
          l.type,
          l
        );
        Hc = a, l.target.dispatchEvent(a), Hc = null;
      } else
        return e = nn(l), e !== null && Bh(e), t.blockedOn = l, !1;
      e.shift();
    }
    return !0;
  }
  function Gh(t, e, l) {
    bc(t) && l.delete(e);
  }
  function gy() {
    eo = !1, ga !== null && bc(ga) && (ga = null), ya !== null && bc(ya) && (ya = null), ba !== null && bc(ba) && (ba = null), qu.forEach(Gh), Gu.forEach(Gh);
  }
  function pc(t, e) {
    t.blockedOn === e && (t.blockedOn = null, eo || (eo = !0, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      gy
    )));
  }
  var Sc = null;
  function Xh(t) {
    Sc !== t && (Sc = t, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      function() {
        Sc === t && (Sc = null);
        for (var e = 0; e < t.length; e += 3) {
          var l = t[e], a = t[e + 1], n = t[e + 2];
          if (typeof a != "function") {
            if (to(a || l) === null)
              continue;
            break;
          }
          var u = nn(l);
          u !== null && (t.splice(e, 3), e -= 3, Bs(
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
  function Kn(t) {
    function e(g) {
      return pc(g, t);
    }
    ga !== null && pc(ga, t), ya !== null && pc(ya, t), ba !== null && pc(ba, t), qu.forEach(e), Gu.forEach(e);
    for (var l = 0; l < pa.length; l++) {
      var a = pa[l];
      a.blockedOn === t && (a.blockedOn = null);
    }
    for (; 0 < pa.length && (l = pa[0], l.blockedOn === null); )
      qh(l), l.blockedOn === null && pa.shift();
    if (l = (t.ownerDocument || t).$$reactFormReplay, l != null)
      for (a = 0; a < l.length; a += 3) {
        var n = l[a], u = l[a + 1], i = n[De] || null;
        if (typeof u == "function")
          i || Xh(l);
        else if (i) {
          var o = null;
          if (u && u.hasAttribute("formAction")) {
            if (n = u, i = u[De] || null)
              o = i.formAction;
            else if (to(n) !== null) continue;
          } else o = i.action;
          typeof o == "function" ? l[a + 1] = o : (l.splice(a, 3), a -= 3), Xh(l);
        }
      }
  }
  function Vh() {
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
  function lo(t) {
    this._internalRoot = t;
  }
  _c.prototype.render = lo.prototype.render = function(t) {
    var e = this._internalRoot;
    if (e === null) throw Error(s(409));
    var l = e.current, a = $e();
    Dh(l, a, t, e, null, null);
  }, _c.prototype.unmount = lo.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var e = t.containerInfo;
      Dh(t.current, 2, null, t, null, null), uc(), e[an] = null;
    }
  };
  function _c(t) {
    this._internalRoot = t;
  }
  _c.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var e = Co();
      t = { blockedOn: null, target: t, priority: e };
      for (var l = 0; l < pa.length && e !== 0 && e < pa[l].priority; l++) ;
      pa.splice(l, 0, t), l === 0 && qh(t);
    }
  };
  var Qh = f.version;
  if (Qh !== "19.3.0")
    throw Error(
      s(
        527,
        Qh,
        "19.3.0"
      )
    );
  lt.findDOMNode = function(t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function" ? Error(s(188)) : (t = Object.keys(t).join(","), Error(s(268, t)));
    return t = A(e), t = t !== null ? E(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var yy = {
    bundleType: 0,
    version: "19.3.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: K,
    reconcilerVersion: "19.3.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ec = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ec.isDisabled && Ec.supportsFiber)
      try {
        Fn = Ec.inject(
          yy
        ), qe = Ec;
      } catch {
      }
  }
  return Qu.createRoot = function(t, e) {
    if (!m(t)) throw Error(s(299));
    var l = !1, a = "", n = wd, u = Dd, i = Ud;
    return e != null && (e.unstable_strictMode === !0 && (l = !0), e.identifierPrefix !== void 0 && (a = e.identifierPrefix), e.onUncaughtError !== void 0 && (n = e.onUncaughtError), e.onCaughtError !== void 0 && (u = e.onCaughtError), e.onRecoverableError !== void 0 && (i = e.onRecoverableError)), e = Rh(
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
      Vh
    ), t[an] = e.current, Rr(t), new lo(e);
  }, Qu.hydrateRoot = function(t, e, l) {
    if (!m(t)) throw Error(s(299));
    var a = !1, n = "", u = wd, i = Dd, o = Ud, g = null;
    return l != null && (l.unstable_strictMode === !0 && (a = !0), l.identifierPrefix !== void 0 && (n = l.identifierPrefix), l.onUncaughtError !== void 0 && (u = l.onUncaughtError), l.onCaughtError !== void 0 && (i = l.onCaughtError), l.onRecoverableError !== void 0 && (o = l.onRecoverableError), l.formState !== void 0 && (g = l.formState)), e = Rh(
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
      Vh
    ), e.context = wh(null), l = e.current, a = $e(), a = jc(a), n = aa(a), n.callback = null, na(l, n, a), l = a, e.current.lanes = l, In(e, l), xl(e), t[an] = e.current, Rr(t), new _c(e);
  }, Qu.version = "19.3.0", Qu;
}
var t0;
function Oy() {
  if (t0) return uo.exports;
  t0 = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (f) {
        console.error(f);
      }
  }
  return c(), uo.exports = My(), uo.exports;
}
var zy = Oy();
function Ay(c, f) {
  const r = Number.isFinite(f) && f > 0 ? f : 1 / 0, s = c.filter((b) => Number.isFinite(b.start) && b.start >= 0 && b.start < r).slice().sort((b, S) => b.start - S.start);
  let m = r;
  const h = new Array(s.length);
  for (let b = s.length - 1; b >= 0; b -= 1)
    b + 1 < s.length && s[b + 1].start > s[b].start && (m = s[b + 1].start), h[b] = m;
  return s.flatMap((b, S) => {
    const C = h[S], A = Math.min(b.end ?? C, r);
    return !Number.isFinite(A) || A <= b.start ? [] : [{ start: b.start, end: A, text: b.label ?? "" }];
  });
}
function Cy(c, f) {
  return !Number.isFinite(f) || f < 0 ? [] : c.filter((r) => r.start <= f && f < r.end && r.text.trim()).map((r) => r.text);
}
const f0 = 128, d0 = 640;
function Ku(c, f = 144) {
  return Math.max(f0, Math.min(
    d0,
    Number.isFinite(c) ? Math.round(c) : f
  ));
}
function m0(c, f, r) {
  return f ? r ? c : "waveform" : "spectrogram";
}
function jy(c, f, r) {
  return Number.isFinite(c) ? c * (f === 1 ? 16 : f === 2 ? r : 1) : 0;
}
function Ry(c, f) {
  return Math.max(0, Math.min(100, c - Math.max(-240, Math.min(240, f)) * 0.08));
}
function wy(c, f) {
  return Ku(c * Math.exp(-Math.max(-240, Math.min(240, f)) * 2e-3));
}
function e0(c, f, r) {
  return Math.max(0, c * f - r);
}
function Pa(c) {
  if (!c.id || !Number.isSafeInteger(c.startSample) || !Number.isSafeInteger(c.endSample) || !Number.isFinite(c.sampleRate) || c.sampleRate <= 0 || c.startSample < 0 || c.endSample <= c.startSample)
    throw new RangeError("A loop needs an id, valid sample rate and increasing integer sample bounds");
  return {
    start: c.startSample / c.sampleRate,
    end: c.endSample / c.sampleRate,
    duration: (c.endSample - c.startSample) / c.sampleRate
  };
}
function Dy(c, f = 0) {
  const r = /* @__PURE__ */ new Set();
  return c.filter((s) => {
    try {
      const m = Pa(s);
      return r.has(s.id) || f > 0 && m.end > f + 0.02 ? !1 : (r.add(s.id), !0);
    } catch {
      return !1;
    }
  });
}
function h0(c, f, r) {
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
    const h = Pa(f);
    this.pause();
    const b = this.generation;
    this.context ??= this.createContext();
    const S = this.context, C = S.resume();
    C.catch(() => {
    });
    const A = f.audioSrc || r, E = JSON.stringify([A, f.startSample, f.endSample, f.sampleRate]);
    try {
      let v = this.cache?.url === E ? this.cache.buffer : null;
      if (!v) {
        const k = new AbortController();
        this.abort = k;
        const ht = await fetch(A, { signal: k.signal, credentials: m });
        if (!ht.ok) throw new Error(`Could not load loop audio (HTTP ${ht.status})`);
        const q = 128 * 1024 * 1024;
        if (Number(ht.headers.get("Content-Length")) > q) throw new Error("Loop audio exceeds 128 MiB");
        const V = await ht.arrayBuffer();
        if (V.byteLength > q) throw new Error("Loop audio exceeds 128 MiB");
        if (v = await S.decodeAudioData(V), b !== this.generation) return !1;
        this.cache = { url: E, buffer: v };
      }
      if (await C, b !== this.generation) return !1;
      const j = f.audioSrc ? 0 : h.start, U = j + h.duration, W = Math.max(2 / v.sampleRate, 2e-3);
      if (!Number.isFinite(v.duration) || v.duration <= j || U > v.duration + W || f.audioSrc && Math.abs(v.duration - h.duration) > W)
        throw new Error("Loop audio duration does not match the reported sample boundaries");
      const L = S.createBufferSource();
      return L.buffer = v, L.loop = !0, L.loopStart = j, L.loopEnd = Math.min(U, v.duration), L.connect(S.destination), this.start = h.start, this.length = L.loopEnd - j, this.offset = h0(s, h.start, h.start + this.length) - h.start, this.anchor = S.currentTime, L.start(this.anchor, j + this.offset), this.node = L, !0;
    } catch (v) {
      if (b !== this.generation) return !1;
      throw v;
    } finally {
      C.catch(() => {
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
function Ea(c, f, r) {
  return Math.min(r, Math.max(f, c));
}
function Ta(c) {
  const f = Math.max(0, Number(c) || 0), r = Math.floor(f / 60), s = Math.floor(f % 60), m = Math.floor((f - Math.floor(f)) * 1e3);
  return `${String(r).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(m).padStart(3, "0")}`;
}
function v0(c) {
  const f = [0.1, 0.25, 0.5, 1, 2, 5, 10, 15, 30, 60, 120, 300, 600];
  return f.find((r) => r * c >= 70) ?? f[f.length - 1];
}
function By(c, f, r, s, m) {
  if (m <= 0 || s <= 0) return { start: 0, end: 0 };
  const h = Math.max(0, c - r), b = Math.max(0, c + f - r), S = Ea(h / s, 0, m), C = Ea(b / s, S, m);
  return { start: S, end: C };
}
function l0(c, f) {
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
function g0(c, f, r = 0.15) {
  if (l0(f, "source seconds"), l0(r, "tolerance") < 0 || r > 60) throw new RangeError("Invalid snap tolerance");
  let s, m;
  if (c.mode === "fixed")
    s = Math.round((f - c.firstBeatSeconds) * c.bpm / 60), m = c.firstBeatSeconds + s * 60 / c.bpm;
  else {
    const b = c.beats, S = c.source_audio.sample_rate, C = Hy(c, f), A = [b[C], b[C + 1]].reduce((E, v) => Math.abs(E.frame / S - f) <= Math.abs(v.frame / S - f) ? E : v);
    s = A.beat - c.origin_beat, m = A.frame / S;
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
    const E = c.beats.filter((j) => j.frame / c.source_audio.sample_rate >= f && j.frame / c.source_audio.sample_rate <= r), v = Math.max(1, Math.ceil(E.length / m));
    return E.filter((j, U) => U % v === 0).map((j) => ({
      time: j.frame / c.source_audio.sample_rate,
      label: `Observed beat ${j.beat}`,
      emphasis: j.beat === c.origin_beat
    }));
  }
  const h = Math.max(Math.ceil((f - c.firstBeatSeconds) * c.bpm / 60), Math.ceil(-c.firstBeatSeconds * c.bpm / 60)), b = Math.floor((r - c.firstBeatSeconds) * c.bpm / 60), S = Math.max(0, b - h + 1), C = Math.max(1, Math.ceil(S / m)), A = [];
  for (let E = h; E <= b && A.length < m; E += C) A.push({
    time: c.firstBeatSeconds + E * 60 / c.bpm,
    label: `Fixed-BPM grid beat ${E} (not detected)`,
    emphasis: E === 0
  });
  return A;
}
function a0(c, f, r, s) {
  if (!Number.isFinite(r) || !Number.isFinite(s.duration) || s.duration <= 0) throw new RangeError("Invalid timing edit timebase");
  const m = Math.max(0, s.bounds?.start ?? 0, s.previousEnd ?? 0), h = Math.min(s.duration, s.bounds?.end ?? s.duration, s.nextStart ?? s.duration);
  if (h < m) throw new RangeError("No space between neighbouring timing items");
  const b = s.minimumDuration ?? 0;
  if (b < 0) throw new RangeError("minimumDuration must be nonnegative");
  let S = Math.min(h, Math.max(m, r));
  if (s.snap && s.clock) {
    const E = g0(s.clock, S, s.toleranceSeconds ?? 0.15);
    E.withinTolerance && (S = Math.min(h, Math.max(m, E.time)));
  }
  const C = c.end !== void 0 && Number.isFinite(c.end), A = C ? Number(c.end) - c.start : 0;
  if (f === "move") {
    const E = Math.max(m, Math.min(Math.max(m, h - A), S));
    return C ? { ...c, start: E, end: E + A } : { ...c, start: E };
  }
  if (f === "start") {
    const E = C ? c.end - b : h;
    if (E < m) throw new RangeError("No valid start fits within the parent bounds");
    return { ...c, start: Math.min(S, E) };
  }
  if (!C) throw new RangeError("This event has no editable end");
  if (c.start + b > h) throw new RangeError("No valid end fits inside the parent bounds");
  return { ...c, end: Math.max(c.start + b, S) };
}
function n0(c, f, r) {
  const s = c.parentId ? r.parents?.find((S) => S.id === c.parentId) : null, m = f.filter((S) => S.id !== c.id && (S.parentId ?? "") === (c.parentId ?? "")).sort((S, C) => S.start - C.start), h = m.filter((S) => S.start <= c.start).slice(-1)[0], b = m.find((S) => S.start > c.start);
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
  const { items: f, kind: r, duration: s, clock: m, selectedId: h, onSelect: b, onEdit: S } = c, C = c.editable === !0 && typeof S == "function", [A, E] = D.useState(null), v = D.useRef(null), j = D.useRef(null), U = (q) => `${Math.max(0, Math.min(100, q * 100 / Math.max(s, 1e-9)))}%`;
  function W(q, V, Mt) {
    if (!C || q.button !== 0) return;
    const it = q.currentTarget.closest(".rts-track");
    if (!it) return;
    const Bt = it.getBoundingClientRect().width;
    !Number.isFinite(Bt) || Bt <= 0 || (v.current = { id: V.id, edge: Mt, x: q.clientX, origin: V, width: Bt }, j.current = V, q.currentTarget.setPointerCapture(q.pointerId), q.stopPropagation(), q.preventDefault(), b?.(V.id));
  }
  function L(q) {
    const V = v.current;
    if (!V || !C) return;
    const Mt = (V.edge === "end" ? V.origin.end ?? V.origin.start : V.origin.start) + (q.clientX - V.x) * s / V.width;
    try {
      j.current = a0(V.origin, V.edge, Mt, n0(V.origin, f, c)), E(j.current);
    } catch {
    }
    q.stopPropagation();
  }
  function k(q, V = !1) {
    const Mt = v.current;
    Mt && (v.current = null, !V && j.current && S && (j.current.start !== Mt.origin.start || j.current.end !== Mt.origin.end) && S(j.current), j.current = null, E(null), q.stopPropagation());
  }
  function ht(q, V, Mt) {
    if (!C || q.key !== "ArrowLeft" && q.key !== "ArrowRight") return;
    q.preventDefault(), q.stopPropagation();
    const it = (q.key === "ArrowRight" ? 1 : -1) * (q.shiftKey ? 1e-3 : 0.01), Bt = Mt === "end" ? V.end ?? V.start : V.start;
    try {
      S?.(a0(V, Mt, Bt + it, n0(V, f, c)));
    } catch {
    }
  }
  return /* @__PURE__ */ d.jsx("div", { className: `rts-editable-timing rts-timing-${r}`, role: "group", "aria-label": `${r} timings`, children: f.filter((q) => Number.isFinite(q.start) && q.start >= 0 && q.start <= s).map((q) => {
    const V = A?.id === q.id ? A : q, Mt = V.end !== void 0 ? Math.max(0.1, (V.end - V.start) * 100 / s) : 0.12, it = m ? g0(m, V.start, c.toleranceSeconds ?? 0.15) : null, Bt = `${q.label} at ${Ta(V.start)}${it ? `, ${it.withinTolerance ? "near" : "off"} ${it.mode} beat ${it.beat}, signed gap ${it.errorMilliseconds.toFixed(1)} ms` : ""}`;
    return /* @__PURE__ */ d.jsxs(
      "div",
      {
        className: `rts-timing-region ${h === q.id ? "is-selected" : ""} ${q.className ?? ""}`,
        style: { left: U(V.start), width: `${Mt}%` },
        children: [
          /* @__PURE__ */ d.jsx(
            "button",
            {
              type: "button",
              className: `rts-timing-handle rts-timing-main ${it?.withinTolerance ? "is-matched" : ""}`,
              "aria-label": `Move ${Bt}`,
              title: Bt,
              "aria-pressed": h === q.id,
              onClick: (Z) => {
                Z.stopPropagation(), b?.(q.id);
              },
              onPointerDown: (Z) => W(Z, q, "move"),
              onPointerMove: L,
              onPointerUp: k,
              onPointerCancel: (Z) => k(Z, !0),
              onKeyDown: (Z) => ht(Z, q, "move"),
              children: q.label
            }
          ),
          C && V.end !== void 0 && /* @__PURE__ */ d.jsx(
            "button",
            {
              type: "button",
              className: "rts-timing-end",
              "aria-label": `Resize end of ${q.label}`,
              title: "Resize end · arrows: 10 ms, Shift: 1 ms",
              onPointerDown: (Z) => W(Z, q, "end"),
              onPointerMove: L,
              onPointerUp: k,
              onPointerCancel: (Z) => k(Z, !0),
              onKeyDown: (Z) => ht(Z, q, "end")
            }
          ),
          C && V.end !== void 0 && /* @__PURE__ */ d.jsx(
            "button",
            {
              type: "button",
              className: "rts-timing-start",
              "aria-label": `Resize start of ${q.label}`,
              title: "Resize start · arrows: 10 ms, Shift: 1 ms",
              onPointerDown: (Z) => W(Z, q, "start"),
              onPointerMove: L,
              onPointerUp: k,
              onPointerCancel: (Z) => k(Z, !0),
              onKeyDown: (Z) => ht(Z, q, "start")
            }
          )
        ]
      },
      q.id
    );
  }) });
}
function mo(c, f) {
  return `${Ea(c / Math.max(f, 1e-9), 0, 1) * 100}%`;
}
function y0(c, f, r, s = 0.08) {
  const m = Number.isFinite(f) && Number(f) > c ? Number(f) : c + 0.5;
  return `${Math.max(s, (m - c) / Math.max(r, 1e-9) * 100)}%`;
}
function qy({ min: c, max: f, colour: r = "#79c0ff" }) {
  const s = D.useRef(null);
  return D.useEffect(() => {
    const m = s.current;
    if (!m) return;
    const h = Math.max(1, Math.min(c.length, f.length));
    m.width = h, m.height = 180;
    const b = m.getContext("2d");
    if (!b) return;
    b.clearRect(0, 0, h, m.height), b.strokeStyle = r, b.lineWidth = 1, b.beginPath();
    const S = m.height / 2, C = m.height * 0.46;
    for (let A = 0; A < h; A += 1) {
      const E = A + 0.5;
      b.moveTo(E, S - (Number(f[A]) || 0) * C), b.lineTo(E, S - (Number(c[A]) || 0) * C);
    }
    b.stroke();
  }, [r, f, c]), /* @__PURE__ */ d.jsx("canvas", { ref: s, className: "rts-waveform", "aria-hidden": "true" });
}
function Gy({ rows: c }) {
  const f = D.useRef(null);
  return D.useEffect(() => {
    const r = f.current, s = c.filter((S) => S.length > 0);
    if (!r || !s.length) return;
    const m = Math.max(...s.map((S) => S.length));
    r.width = Math.min(4096, s.length), r.height = Math.min(256, m);
    const h = r.getContext("2d");
    if (!h) return;
    const b = h.createImageData(r.width, r.height);
    for (let S = 0; S < r.width; S += 1) {
      const C = Math.min(s.length - 1, Math.floor(S * s.length / r.width)), A = s[C], E = Math.max(1e-9, ...A.map((v) => Number(v) || 0));
      for (let v = 0; v < r.height; v += 1) {
        const j = Math.min(A.length - 1, Math.floor((r.height - 1 - v) * A.length / r.height)), U = Ea((Number(A[j]) || 0) / E, 0, 1), W = (v * r.width + S) * 4;
        b.data[W] = Math.round(40 + 180 * U), b.data[W + 1] = Math.round(35 + 110 * U), b.data[W + 2] = Math.round(80 + 170 * U), b.data[W + 3] = 255;
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
        style: { left: mo(h.start, f), width: y0(h.start, h.end ?? h.start + 0.12, f, 0.04), top: `${8 + (1 - S) * 72}px` },
        title: h.title ?? `${h.label ?? `${h.value.toFixed(1)} Hz`} · ${Ta(h.start)}`
      },
      `${h.start}-${b}`
    );
  });
}
function ho({ content: c, duration: f }) {
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
          style: { left: mo(r.time, f) },
          title: r.label
        },
        `${r.time}-${s}`
      )) });
    case "blocks":
      return /* @__PURE__ */ d.jsx(d.Fragment, { children: c.items.map((r, s) => /* @__PURE__ */ d.jsx(
        "span",
        {
          className: `rts-block ${r.className ?? ""}`,
          style: { left: mo(r.start, f), width: y0(r.start, r.end, f) },
          title: r.title ?? `${r.label ?? ""} · ${Ta(r.start)}${r.end ? ` — ${Ta(r.end)}` : ""}`,
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
        const C = S.time / Math.max(f, 1e-9) * 2e3, A = 180 - (S.value - m) / Math.max(1e-9, h - m) * 168 - 6;
        return `${C.toFixed(2)},${A.toFixed(2)}`;
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
  const s = m0(r, !!c.waveform, !!c.spectrogram);
  return /* @__PURE__ */ d.jsxs("div", { className: `rts-audio-layers rts-audio-${s}`, "data-audio-view": s, children: [
    c.spectrogram && s !== "waveform" && /* @__PURE__ */ d.jsx("div", { className: "rts-audio-spectrum", children: /* @__PURE__ */ d.jsx(ho, { content: { type: "image", ...c.spectrogram }, duration: f }) }),
    c.waveform && s !== "spectrogram" && /* @__PURE__ */ d.jsx("div", { className: "rts-audio-envelope", children: /* @__PURE__ */ d.jsx(ho, { content: { type: "waveform", ...c.waveform, colour: s === "both" ? "#e6fff7" : c.waveform.colour }, duration: f }) }),
    !c.waveform && !c.spectrogram && /* @__PURE__ */ d.jsx("span", { className: "rts-meta", children: "Waiting for audio analysis" })
  ] });
}
function Qy({ config: c, lanes: f, time: r, duration: s, playing: m }) {
  const h = f.filter((L) => L.content.type === "timing" && L.content.kind === "line"), [b, S] = D.useState(null), C = h.find((L) => L.id === (c.laneId ?? b)) ?? (c.laneId === void 0 && b === null ? h[0] : void 0), A = c.items ?? (C?.content.type === "timing" ? C.content.items : []), E = D.useMemo(() => Ay(A, s), [A, s]), v = Cy(E, r), [j, U] = D.useState(), W = c.artworkSrc && j !== c.artworkSrc;
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
            value: C?.id ?? "",
            onChange: (L) => S(L.target.value),
            children: [
              !C && /* @__PURE__ */ d.jsx("option", { value: "", children: "Choose lyric lane" }),
              h.map((L) => /* @__PURE__ */ d.jsx("option", { value: L.id, children: typeof L.title == "string" ? L.title : L.id }, L.id))
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: "rts-audition-cover", children: [
      W ? /* @__PURE__ */ d.jsx(
        "img",
        {
          src: c.artworkSrc,
          alt: c.artworkAlt ?? "Cover artwork",
          onError: () => U(c.artworkSrc)
        }
      ) : /* @__PURE__ */ d.jsx("span", { className: "rts-audition-no-art", children: "Cover artwork unavailable" }),
      /* @__PURE__ */ d.jsx("div", { className: "rts-audition-subtitles", "aria-label": "Timed lyrics", "aria-live": "off", children: v.map((L, k) => /* @__PURE__ */ d.jsx("span", { children: L }, k)) })
    ] }),
    /* @__PURE__ */ d.jsx("output", { className: "rts-audition-status", "aria-live": "off", children: E.some((L) => L.text.trim()) ? v.length ? m ? "Playing · timed lyrics" : "Paused · current lyrics" : "No lyric at this position" : "No timed lyrics available" })
  ] });
}
function Zy(c, f, r, s, m = "same-origin") {
  const [h, b] = D.useState(0), [S, C] = D.useState(!1), [A, E] = D.useState(!1), [v, j] = D.useState(""), U = D.useRef(!1), W = D.useRef("media"), L = D.useRef(null), k = D.useRef(0), ht = D.useRef({ audioSrc: f, activeLoop: r, onError: s, credentials: m });
  ht.current = { audioSrc: f, activeLoop: r, onError: s, credentials: m };
  const q = D.useCallback(() => W.current === "loop" ? L.current?.currentTime ?? 0 : c.current?.currentTime ?? 0, [c]), V = D.useCallback(() => {
    const ut = q();
    return k.current += 1, U.current = !1, L.current?.pause(), c.current?.pause(), E(!1), C(!1), b(ut), ut;
  }, [c, q]), Mt = D.useCallback((ut) => {
    V(), j(ut instanceof Error ? ut.message : String(ut)), ht.current.onError?.(ut);
  }, [V]), it = D.useCallback(async (ut) => {
    V();
    const yt = k.current;
    U.current = !0, E(!0), j("");
    const { activeLoop: ft, audioSrc: Et, credentials: Tt } = ht.current;
    try {
      if (ft) {
        if (W.current = "loop", L.current ??= new Uy(), !await L.current.play(ft, Et, ut, Tt)) return;
      } else {
        W.current = "media";
        const jt = c.current;
        if (!jt) return;
        jt.currentTime = Math.max(0, ut), await jt.play();
      }
      if (yt !== k.current) return;
      b(q()), E(!1), C(!0);
    } catch (jt) {
      yt === k.current && Mt(jt);
    }
  }, [c, Mt, V, q]), Bt = D.useCallback((ut) => {
    const yt = ht.current.activeLoop;
    if (yt) {
      const ft = Pa(yt);
      ut = h0(ut, ft.start, ft.end);
    }
    U.current ? it(ut) : (V(), W.current = "media", c.current && (c.current.currentTime = ut), b(ut));
  }, [c, V, it]), Z = D.useCallback(() => {
    if (U.current) {
      V();
      return;
    }
    let ut = q();
    const yt = ht.current.activeLoop;
    if (yt) {
      const ft = Pa(yt);
      (ut < ft.start || ut >= ft.end) && (ut = ft.start);
    }
    it(ut);
  }, [V, it, q]);
  D.useEffect(() => (V(), W.current = "media", b(0), j(""), L.current?.dispose(), L.current = null, () => {
    k.current += 1, U.current = !1, L.current?.dispose(), L.current = null, c.current?.pause();
  }), [f, c, V]);
  const ot = r ? JSON.stringify([r.id, r.startSample, r.endSample, r.sampleRate, r.audioSrc]) : "";
  D.useEffect(() => {
    const ut = U.current;
    let yt = V();
    const ft = ht.current.activeLoop;
    ft && (yt = Pa(ft).start), W.current = "media", c.current && (c.current.currentTime = yt), b(yt), ut && it(yt);
  }, [ot, c, V, it]), D.useEffect(() => {
    if (!S) return;
    let ut = 0;
    const yt = () => {
      b(q()), ut = requestAnimationFrame(yt);
    };
    return ut = requestAnimationFrame(yt), () => cancelAnimationFrame(ut);
  }, [S, q]);
  const Jt = D.useCallback(() => {
    W.current === "media" && V();
  }, [V]);
  return { time: h, playing: S, loading: A, error: v, toggle: Z, seek: Bt, ended: Jt, fail: Mt };
}
function Ky(c, f) {
  if (c <= 0 || f <= 0) return [];
  const r = v0(f) / 5, s = [];
  for (let m = 0; m * r <= c + 1e-6; m += 1)
    s.push({
      time: m * r,
      major: m % 5 === 0
    });
  return s;
}
function Jy(c, f) {
  const r = Math.round(c * 1e3), s = Math.floor(r / 1e3), m = `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  return v0(f) < 1 ? `${m}.${String(r % 1e3).padStart(3, "0")}` : m;
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
  duration: C = 0,
  grid: A = [],
  beatClock: E = null,
  showBeatGrid: v = !1,
  headerEnd: j,
  footer: U,
  className: W = "",
  labelWidth: L = 230,
  initialZoom: k = 20,
  laneControls: ht = !1,
  wheelNavigation: q = !1,
  followPlayheadByDefault: V = !0,
  preload: Mt = "metadata",
  crossOrigin: it,
  onDurationChange: Bt,
  onTimeChange: Z,
  onWindowChange: ot,
  onPlaybackError: Jt
}) {
  const ut = D.useRef(null), [yt, ft] = D.useState(f?.enabledByDefault ?? !0), Et = D.useRef(null), [Tt, jt] = D.useState(Math.max(0, C)), [Y, et] = D.useState(null), [I, bt] = D.useState(!1), rt = D.useMemo(() => Dy(r, Tt), [r, Tt]), Dt = rt.find((w) => w.id === Y) ?? null, Lt = Zy(
    ut,
    c,
    I ? Dt : null,
    Jt,
    it === "use-credentials" ? "include" : "same-origin"
  ), F = Lt.time, y = Lt.playing, R = Dt ? Pa(Dt) : null, Q = (w) => {
    et(w), s?.(rt.find((ct) => ct.id === w) ?? null);
  }, P = (w) => {
    bt(w), m?.(w);
  };
  D.useEffect(() => {
    Y && !rt.some((w) => w.id === Y) && (et(null), bt(!1), s?.(null), m?.(!1));
  }, [Y, rt, s, m]), D.useEffect(() => {
    et(null), bt(!1), jt(Math.max(0, C));
  }, [c]);
  const [gt, pt] = D.useState(V), [dt, K] = D.useState(k), [lt, $t] = D.useState({}), [Ol, ie] = D.useState({}), Xt = D.useRef(k), vt = D.useRef(null), Nt = D.useRef(() => {
  });
  D.useEffect(() => {
    $t({}), ie({});
  }, [c]);
  const [G, at] = D.useState(0), [Ot, Re] = D.useState({ start: 0, end: 0 });
  D.useEffect(() => {
    C > 0 && jt(C);
  }, [C]), D.useEffect(() => {
    const w = Et.current;
    if (!w) return;
    const ct = () => at(w.clientWidth);
    ct();
    const zt = new ResizeObserver(ct);
    return zt.observe(w), () => zt.disconnect();
  }, []);
  const fe = Tt > 0 ? Math.max(0.4, Math.max(320, G - L - 16) / Tt) : 0.4, Ht = Math.max(fe, fe * Math.pow(2, dt / 18));
  D.useLayoutEffect(() => {
    if (Xt.current = dt, vt.current && Et.current) {
      const { time: w, pointer: ct } = vt.current;
      Et.current.scrollLeft = e0(w, Ht, ct), vt.current = null;
    }
  }, [dt, Ht]), D.useEffect(() => {
    const w = Et.current;
    if (!w || !q) return;
    const ct = (zt) => Nt.current(zt);
    return w.addEventListener("wheel", ct, { passive: !1 }), () => w.removeEventListener("wheel", ct);
  }, [q]);
  const zl = Math.max(1, Tt * Ht), Kl = D.useMemo(() => Ky(Tt, Ht), [Tt, Ht]), Al = D.useMemo(() => E && v ? Ly(E, 0, Tt, 2e3).map((w) => ({
    time: w.time,
    emphasis: w.emphasis,
    label: w.label,
    className: `rts-beat-grid-${E.mode}`
  })) : [], [E, v, Tt]), Na = [...A, ...Al], we = D.useCallback(() => {
    const w = Et.current;
    if (!w) return;
    const ct = By(
      w.scrollLeft + L,
      Math.max(0, w.clientWidth - L),
      L,
      Ht,
      Tt
    );
    Re(ct), ot?.(ct);
  }, [Tt, L, ot, Ht]);
  D.useEffect(() => {
    we();
  }, [we, G]), D.useEffect(() => {
    Z?.(F);
    const w = Et.current;
    if (!w || !gt || !y) return;
    const ct = L + F * Ht, zt = w.scrollLeft + w.clientWidth, me = Math.min(180, w.clientWidth * 0.2);
    ct > zt - me ? w.scrollLeft = Math.max(0, ct - w.clientWidth + me) : ct < w.scrollLeft + L && (w.scrollLeft = Math.max(0, ct - L - me));
  }, [F, gt, y, L, Z, Ht]);
  const xa = (w) => {
    if (Tt <= 0 || w.target.closest(".rts-label, a, button, input, select, textarea")) return;
    const ct = Et.current, zt = ut.current;
    if (!ct || !zt) return;
    const me = ct.getBoundingClientRect(), he = w.clientX - me.left + ct.scrollLeft - L;
    if (he < 0) return;
    const kt = Ea(he / Ht, 0, Tt);
    Lt.seek(kt);
  }, Cl = (w, ct) => {
    const zt = Et.current;
    if (w = Ea(w, 0, 100), w !== Xt.current) {
      if (zt) {
        const me = Math.max(1, zt.clientWidth - L), he = ct === void 0 ? me / 2 : Ea(ct - zt.getBoundingClientRect().left - L, 0, me), kt = vt.current, x = fe * Math.pow(2, Xt.current / 18), J = kt ? e0(kt.time, x, kt.pointer) : zt.scrollLeft;
        vt.current = { time: (J + he) / x, pointer: he };
      }
      Xt.current = w, K(w);
    }
  };
  Nt.current = (w) => {
    const ct = Et.current, zt = w.target instanceof Element ? w.target : null;
    if (!ct || !zt || zt.closest("input, select, textarea, button, [contenteditable=true]")) return;
    const me = Math.abs(w.deltaX) > Math.abs(w.deltaY) ? w.deltaX : w.deltaY, he = jy(me, w.deltaMode, ct.clientWidth - L);
    if (he)
      if (w.ctrlKey || w.metaKey) {
        if (Tt <= 0) return;
        w.preventDefault(), w.stopPropagation(), pt(!1), Cl(Ry(Xt.current, he), w.clientX);
      } else if (w.altKey) {
        const kt = zt.closest("[data-lane-id]")?.dataset.laneId, x = h.find((J) => J.id === kt);
        if (!ht || !x) return;
        w.preventDefault(), w.stopPropagation(), $t((J) => ({
          ...J,
          [x.id]: wy(J[x.id] ?? Ku(x.height), he)
        }));
      } else
        w.preventDefault(), w.stopPropagation(), w.shiftKey ? ct.scrollTop += he : (pt(!1), ct.scrollLeft += he);
  };
  const hl = () => {
    if (!R || !Et.current) return;
    const w = Math.max(320, G - L - 16) / (R.duration * 1.1), ct = Ea(18 * Math.log2(w / fe), 0, 100);
    vt.current = null, Xt.current = ct, K(ct);
    const zt = fe * Math.pow(2, ct / 18);
    requestAnimationFrame(() => {
      Et.current && (Et.current.scrollLeft = Math.max(0, (R.start - R.duration * 0.05) * zt));
    });
  }, Ma = () => {
    const w = Number(ut.current?.duration) || 0;
    Number.isFinite(w) && w > 0 && (jt(w), Bt?.(w));
  };
  return /* @__PURE__ */ d.jsxs(
    "section",
    {
      className: `rts-sequence ${ht ? "rts-display-controls" : ""} ${W}`,
      style: { "--rts-label-width": `${L}px`, "--rts-track-width": `${zl}px` },
      children: [
        /* @__PURE__ */ d.jsxs("header", { className: "rts-toolbar", children: [
          /* @__PURE__ */ d.jsxs("div", { className: "rts-ident", children: [
            /* @__PURE__ */ d.jsx("strong", { children: b }),
            S && /* @__PURE__ */ d.jsx("span", { children: S })
          ] }),
          /* @__PURE__ */ d.jsxs("div", { className: "rts-transport", "aria-label": "Timeline playback controls", children: [
            /* @__PURE__ */ d.jsx("button", { type: "button", className: "rts-button rts-play", onClick: Lt.toggle, "aria-label": y || Lt.loading ? "Pause" : "Play", children: Lt.loading ? "…" : y ? "❚❚" : "▶" }),
            /* @__PURE__ */ d.jsxs("output", { className: "rts-time", "aria-live": "off", children: [
              Ta(F),
              " / ",
              Ta(Tt)
            ] }),
            /* @__PURE__ */ d.jsx("button", { type: "button", className: "rts-button", onClick: () => Cl(0), children: "Fit" }),
            /* @__PURE__ */ d.jsxs("label", { className: "rts-control", children: [
              /* @__PURE__ */ d.jsx("span", { children: "Zoom" }),
              /* @__PURE__ */ d.jsx("input", { "aria-label": "Timeline zoom", type: "range", min: "0", max: "100", value: dt, onChange: (w) => Cl(Number(w.target.value)) })
            ] }),
            /* @__PURE__ */ d.jsxs("label", { className: "rts-control", children: [
              /* @__PURE__ */ d.jsx("input", { type: "checkbox", checked: gt, onChange: (w) => pt(w.target.checked) }),
              /* @__PURE__ */ d.jsx("span", { children: "Follow" })
            ] }),
            f && /* @__PURE__ */ d.jsxs("label", { className: "rts-control rts-audition-toggle", children: [
              /* @__PURE__ */ d.jsx(
                "input",
                {
                  type: "checkbox",
                  "aria-label": "Audition lyrics",
                  checked: yt,
                  onChange: (w) => ft(w.target.checked)
                }
              ),
              /* @__PURE__ */ d.jsx("span", { children: "Audition lyrics" })
            ] })
          ] }),
          /* @__PURE__ */ d.jsx("div", { className: "rts-header-end", children: j }),
          rt.length > 0 && /* @__PURE__ */ d.jsxs("div", { className: "rts-loop-controls", "aria-label": "Loop controls", children: [
            /* @__PURE__ */ d.jsxs("label", { children: [
              "Loop ",
              /* @__PURE__ */ d.jsxs("select", { "aria-label": "Select loop", value: Y ?? "", onChange: (w) => Q(w.target.value), children: [
                /* @__PURE__ */ d.jsx("option", { value: "", children: "Choose a loop…" }),
                rt.map((w) => /* @__PURE__ */ d.jsx("option", { value: w.id, children: w.label || w.id }, w.id))
              ] })
            ] }),
            /* @__PURE__ */ d.jsxs("label", { children: [
              /* @__PURE__ */ d.jsx("input", { type: "checkbox", "aria-label": "Enable loop", disabled: !Dt, checked: I && !!Dt, onChange: (w) => P(w.target.checked) }),
              "Enable loop"
            ] }),
            /* @__PURE__ */ d.jsx("button", { type: "button", className: "rts-button", disabled: !Dt, onClick: hl, children: "Zoom to loop" }),
            Dt && /* @__PURE__ */ d.jsxs("output", { children: [
              Dt.startSample.toLocaleString(),
              " → ",
              Dt.endSample.toLocaleString(),
              " samples (end exclusive) · ",
              Dt.sampleRate.toLocaleString(),
              " Hz"
            ] }),
            Dt?.downloadUrl && /* @__PURE__ */ d.jsx("a", { href: Dt.downloadUrl, download: !0, children: "Download loop WAV" }),
            /* @__PURE__ */ d.jsx("span", { className: "rts-loop-status", role: "status", children: Lt.loading ? "Loading loop…" : I && Dt ? "Loop enabled · Play repeats selection" : "Full-song playback" })
          ] }),
          Lt.error && /* @__PURE__ */ d.jsx("div", { role: "alert", className: "rts-loop-error", children: Lt.error })
        ] }),
        /* @__PURE__ */ d.jsx(
          "audio",
          {
            ref: ut,
            src: c,
            preload: Mt,
            crossOrigin: it,
            onLoadedMetadata: Ma,
            onEnded: Lt.ended,
            onError: () => Lt.fail(new Error(ut.current?.error?.message || "Audio playback failed"))
          }
        ),
        /* @__PURE__ */ d.jsxs("div", { className: `rts-workspace ${f && yt ? "rts-with-audition" : ""}`, children: [
          /* @__PURE__ */ d.jsx("div", { ref: Et, className: "rts-scroller", onScroll: we, onClick: xa, children: /* @__PURE__ */ d.jsxs("div", { className: "rts-inner", children: [
            /* @__PURE__ */ d.jsxs("div", { className: "rts-ruler-row", children: [
              /* @__PURE__ */ d.jsx("div", { className: "rts-label rts-ruler-label", children: "TIME" }),
              /* @__PURE__ */ d.jsx("div", { className: "rts-ruler-track", children: Kl.map((w) => /* @__PURE__ */ d.jsx("span", { className: `rts-tick ${w.major ? "rts-tick-major" : ""}`, style: { left: `${w.time * Ht}px` }, children: w.major && /* @__PURE__ */ d.jsx("span", { className: "rts-tick-label", children: Jy(w.time, Ht) }) }, w.time)) })
            ] }),
            rt.length > 0 && /* @__PURE__ */ d.jsxs("div", { className: "rts-lane rts-lane-loops", children: [
              /* @__PURE__ */ d.jsxs("div", { className: "rts-label", children: [
                /* @__PURE__ */ d.jsx("div", { className: "rts-title", children: "LOOPS" }),
                /* @__PURE__ */ d.jsx("div", { className: "rts-meta", children: "Select a region, enable, then Play" })
              ] }),
              /* @__PURE__ */ d.jsx("div", { className: "rts-track", children: rt.map((w) => {
                const ct = Pa(w);
                return /* @__PURE__ */ d.jsx(
                  "button",
                  {
                    type: "button",
                    className: "rts-loop-region",
                    "aria-pressed": Y === w.id,
                    "aria-label": `Select ${w.label || w.id}`,
                    onClick: () => Q(w.id),
                    title: `${w.label || w.id}: [${w.startSample}, ${w.endSample}) at ${w.sampleRate} Hz`,
                    style: { left: `${ct.start * Ht}px`, width: `${ct.duration * Ht}px` },
                    children: w.label || w.id
                  },
                  w.id
                );
              }) })
            ] }),
            R && /* @__PURE__ */ d.jsx(
              "div",
              {
                className: `rts-loop-shade ${I ? "" : "is-disabled"}`,
                "aria-hidden": "true",
                style: { left: `${L + R.start * Ht}px`, width: `${R.duration * Ht}px` }
              }
            ),
            /* @__PURE__ */ d.jsx("div", { className: "rts-lanes", children: h.map((w) => {
              const ct = w.content, zt = ct.type === "audio" ? ct : null, me = Ol[w.id] ?? zt?.view ?? "both", he = zt ? m0(me, !!zt.waveform, !!zt.spectrogram) : "both", kt = ht ? lt[w.id] ?? Ku(w.height) : w.height, x = typeof w.title == "string" ? w.title : w.id;
              return /* @__PURE__ */ d.jsxs(
                "div",
                {
                  "data-lane-id": w.id,
                  className: `rts-lane rts-lane-${w.kind ?? "default"} ${w.className ?? ""}`,
                  style: kt ? { "--rts-lane-height": `${kt}px` } : void 0,
                  children: [
                    /* @__PURE__ */ d.jsxs("div", { className: "rts-label", children: [
                      /* @__PURE__ */ d.jsx("div", { className: "rts-title", children: w.title }),
                      w.meta && /* @__PURE__ */ d.jsx("div", { className: "rts-meta", children: w.meta }),
                      ht && /* @__PURE__ */ d.jsxs("div", { className: "rts-lane-controls", children: [
                        zt && /* @__PURE__ */ d.jsxs("label", { children: [
                          "View ",
                          /* @__PURE__ */ d.jsxs(
                            "select",
                            {
                              "aria-label": `View for ${x}`,
                              value: he,
                              onChange: (J) => ie((Vt) => ({ ...Vt, [w.id]: J.target.value })),
                              children: [
                                /* @__PURE__ */ d.jsx("option", { value: "waveform", disabled: !zt.waveform, children: "Waveform" }),
                                /* @__PURE__ */ d.jsx("option", { value: "spectrogram", disabled: !zt.spectrogram, children: "Spectrogram" }),
                                /* @__PURE__ */ d.jsx("option", { value: "both", disabled: !zt.waveform || !zt.spectrogram, children: "Both" })
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
                              min: f0,
                              max: d0,
                              step: "1",
                              "aria-label": `Height for ${x}`,
                              value: kt,
                              onChange: (J) => $t((Vt) => ({ ...Vt, [w.id]: Ku(Number(J.target.value)) }))
                            }
                          ),
                          /* @__PURE__ */ d.jsxs("output", { children: [
                            kt,
                            "px"
                          ] })
                        ] }),
                        /* @__PURE__ */ d.jsx(
                          "button",
                          {
                            type: "button",
                            className: "rts-height-reset",
                            "aria-label": `Reset height for ${x}`,
                            onClick: () => $t((J) => ({ ...J, [w.id]: Ku(w.height) })),
                            children: "Reset height"
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ d.jsx("div", { className: "rts-track", children: zt ? /* @__PURE__ */ d.jsx(Vy, { content: zt, duration: Tt, view: he }) : /* @__PURE__ */ d.jsx(ho, { content: ct, duration: Tt }) })
                  ]
                },
                w.id
              );
            }) }),
            Na.length > 0 && /* @__PURE__ */ d.jsx("div", { className: "rts-grid", "aria-hidden": "true", children: Na.map((w, ct) => /* @__PURE__ */ d.jsx("span", { className: `rts-grid-line ${w.emphasis ? "rts-grid-line-emphasis" : ""} ${w.className ?? ""}`, style: { left: `${w.time * Ht}px` } }, `${w.time}-${ct}`)) }),
            /* @__PURE__ */ d.jsx("div", { className: "rts-playhead", style: { left: `${L + F * Ht}px` }, "aria-hidden": "true" })
          ] }) }),
          f && yt && /* @__PURE__ */ d.jsx(
            Qy,
            {
              config: f,
              lanes: h,
              time: F,
              duration: Tt,
              playing: y
            }
          )
        ] }),
        /* @__PURE__ */ d.jsxs("footer", { className: "rts-footer", children: [
          /* @__PURE__ */ d.jsxs("div", { children: [
            U,
            q && /* @__PURE__ */ d.jsx("div", { className: "rts-navigation-help", children: "Wheel: time · Ctrl/⌘ + wheel: time zoom · Alt + wheel: channel height · Shift + wheel: channel scroll" })
          ] }),
          /* @__PURE__ */ d.jsxs("output", { className: "rts-window", children: [
            Ta(Ot.start),
            " — ",
            Ta(Ot.end)
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
const ro = /\.(wav|flac|mp3|ogg|opus|m4a|aif|aiff)$/i;
function u0(c) {
  return c === "__source__" || c.startsWith("input/") ? "master" : c.startsWith("stems/") ? c.slice(6).replace(ro, "") : c.startsWith("speech/") && ro.test(c) ? c.replace(ro, "") : null;
}
function Iy(c) {
  const f = /* @__PURE__ */ new Map(), r = [], s = /* @__PURE__ */ new Map();
  for (const h of c) for (const b of Array.isArray(h.sourceMap) ? h.sourceMap : [])
    if (typeof b?.audio == "string" && typeof b.data == "string") {
      const S = u0(b.audio.replace(/\\/g, "/"));
      S && (s.set(b.data.replace(/\\/g, "/"), S), typeof b.png == "string" && s.set(b.png.replace(/\\/g, "/"), S));
    }
  const m = (h) => (f.has(h) || f.set(h, { key: h }), f.get(h));
  for (const h of c) {
    const b = (h.id?.replace(/^file:/, "") || "").replace(/\\/g, "/"), S = u0(b), C = b.startsWith("spectrograms/") ? s.get(b) || b.slice(13).replace(/\.(npz|png)$/i, "") : null;
    if (S && (h.content?.type === "waveform" || h.content?.type === "artifact")) {
      const A = m(S);
      (!A.audio || h.id === "__source__") && (A.audio = h);
    } else C && b.endsWith(".npz") && h.content?.type === "image" ? m(C).spectrum = h : C && b.endsWith(".png") && h.content?.type === "image" ? m(C).png = h : r.push(h);
  }
  for (const h of f.values()) {
    if (!h.audio && !h.spectrum) {
      h.png && r.push(h.png);
      continue;
    }
    const b = h.audio || h.spectrum, S = h.audio?.content?.type === "waveform" ? h.audio.content : null, C = h.audio?.content?.type === "artifact" ? h.audio.content.note : null;
    r.push({
      ...b,
      id: h.key === "master" ? "__source__" : `audio:${h.key}`,
      title: h.key === "master" ? "MASTER · uploaded source" : h.key.replace(/\//g, " · ").replace(/_/g, " "),
      kind: "audio",
      height: 160,
      meta: C || (S && h.spectrum ? "waveform + aligned spectrogram" : S ? "waveform · spectrogram pending" : "spectrogram · waveform pending"),
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
const vo = (c) => typeof c == "number" && Number.isFinite(c) && c > 0, Py = { canonical: "Canonical", combined: "Consensus · observed tempo", combined_family: "Consensus · canonical tempo family", combined_fit: "Consensus · fitted constant grid" };
function i0(c, f, r, s) {
  if (!vo(c) || !Number.isFinite(f) || f < 0 || !Number.isFinite(r) || r <= 0) return [];
  const m = Math.max(0, Math.floor((r - f) * c / 60 + 1e-9) + 1), h = Math.max(1, Math.ceil(m / 25e3));
  return Array.from({ length: Math.ceil(m / h) }, (b, S) => {
    const C = S * h;
    return {
      time: f + C * 60 / c,
      emphasis: C === 0,
      label: `${s === "original" ? "Original" : "Aligned"} beat ${C + 1}${C === 0 && s === "aligned" ? " · pip 0" : ""}`,
      className: `stemlab-grid-${s}`
    };
  });
}
function tb(c, f, r, s = "canonical", m = "consensus") {
  const h = c?.schema === "stemlab.beat-offsets.v1" && c.pips_per_beat === 64;
  let b = h ? (c.bpm_bases || []).filter((U) => U.status === "available" && vo(U.bpm)) : [];
  !b.length && vo(f) && (b = [{ id: "canonical", bpm: f }]);
  const S = b.find((U) => U.id === s) || b.find((U) => U.id === "combined_fit") || b[0] || null, C = h ? (c.analyses || []).filter((U) => U.status === "available") : [], A = C.find((U) => U.analysis_id === m) || C.find((U) => U.kind === "consensus") || C[0] || null, E = S && A ? c.comparisons?.find((U) => U.status === "available" && U.bpm_basis === S.id && U.analysis_id === A.analysis_id) : null, v = S ? i0(S.bpm, 0, r, "original") : [], j = E && Number.isFinite(E.beat_zero_seconds) ? i0(E.bpm, E.beat_zero_seconds, r, "aligned") : [];
  return {
    bases: b.map((U) => ({ ...U, label: `${Py[U.id] || U.id}${U.multiplier ? ` ×${U.multiplier}` : ""} · ${U.bpm.toFixed(4)} BPM` })),
    basis: S,
    analysis: A,
    analyses: C,
    row: E,
    original: v,
    aligned: j,
    thinned: !!S && Math.floor(r * S.bpm / 60) + 1 > 25e3,
    grid: [...v, ...j].sort((U, W) => U.time - W.time)
  };
}
function eb({ comparison: c, onBasis: f, onAnalysis: r }) {
  const { bases: s, basis: m, analyses: h, analysis: b, row: S, thinned: C } = c;
  return /* @__PURE__ */ d.jsxs("section", { className: "stemlab-beat-offset-controls", "aria-label": "BPM grid comparison", children: [
    /* @__PURE__ */ d.jsxs("div", { className: "stemlab-beat-offset-selectors", children: [
      /* @__PURE__ */ d.jsxs("label", { children: [
        "BPM grid ",
        /* @__PURE__ */ d.jsxs("select", { "aria-label": "BPM grid basis", value: m?.id || "", onChange: (A) => f(A.target.value), disabled: !s.length, children: [
          !s.length && /* @__PURE__ */ d.jsx("option", { value: "", children: "BPM unavailable" }),
          s.map((A) => /* @__PURE__ */ d.jsx("option", { value: A.id, children: A.label }, A.id))
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("label", { children: [
        "First beat from ",
        /* @__PURE__ */ d.jsxs("select", { "aria-label": "First beat analysis", value: b?.analysis_id || "", onChange: (A) => r(A.target.value), disabled: !h.length, children: [
          !h.length && /* @__PURE__ */ d.jsx("option", { value: "", children: "Detected beat unavailable" }),
          h.map((A) => /* @__PURE__ */ d.jsx("option", { value: A.analysis_id, children: A.analysis_id }, A.analysis_id))
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
      C ? " Dense grids are thinned for display only." : ""
    ] })
  ] });
}
const lb = "stemlab.beat-timeline.v1", ku = 64, Ml = (c) => Number.isSafeInteger(c);
function Nc(c) {
  if (!c || c.schema !== lb || c.pips_per_beat !== ku || !Number.isSafeInteger(c.source_audio?.sample_rate) || c.source_audio.sample_rate < 1 || !Number.isSafeInteger(c.source_audio?.num_frames) || c.source_audio.num_frames < 2 || !/^[0-9a-f]{64}$/.test(c.source_audio?.sha256 || "") || !/^[0-9a-f]{64}$/.test(c.consensus_sha256 || "") || !Array.isArray(c.beats) || c.beats.length < 2 || c.beats.length > 25e3 || !Ml(c.origin_beat)) throw new Error("Not a valid source-bound StemLab beat timeline");
  const f = { beat: -1, frame: -1 };
  for (const r of c.beats) {
    if (!Ml(r.beat) || !Ml(r.frame) || r.beat <= f.beat || r.frame <= f.frame || r.frame >= c.source_audio.num_frames || !["consensus", "corrected", "manual"].includes(r.source) || r.reference_frame !== null && (!Ml(r.reference_frame) || r.reference_frame < 0 || r.reference_frame >= c.source_audio.num_frames) || r.source === "consensus" && r.frame !== r.reference_frame || r.source === "manual" && r.reference_frame !== null)
      throw new Error("Beat indices and source sample frames must increase; original consensus timestamps stay immutable");
    f.beat = r.beat, f.frame = r.frame;
  }
  if (!c.beats.some((r) => r.beat === c.origin_beat)) throw new Error("Beat 1 must identify a real anchor");
  return c;
}
const en = (c) => ({ ...c, beats: c.beats.map((f) => ({ ...f })) }), ln = (c) => Nc(c), ab = (c, f) => c.beats[f].frame / c.source_audio.sample_rate, $n = (c, f) => f < 0 || f + 1 >= c.beats.length ? null : 60 * c.source_audio.sample_rate * (c.beats[f + 1].beat - c.beats[f].beat) / (c.beats[f + 1].frame - c.beats[f].frame), b0 = (c, f) => Math.round(f * c.source_audio.sample_rate);
function c0(c, f, r) {
  const s = en(c);
  if (!Ml(f) || f < 0 || f >= s.beats.length) throw new Error("Select a beat");
  const m = b0(s, r), h = s.beats[f - 1]?.frame ?? -1, b = s.beats[f + 1]?.frame ?? s.source_audio.num_frames;
  if (!Ml(m) || m <= h || m >= b) throw new Error("Beat must remain between its neighbours");
  const S = s.beats[f];
  return S.frame = m, S.source = m === S.reference_frame ? "consensus" : S.reference_frame === null ? "manual" : "corrected", ln(s);
}
function nb(c, f, r) {
  if (!Number.isFinite(r) || r <= 0 || r > 1200) throw new Error("BPM must be 0..1200");
  const s = en(c);
  if (!Ml(f) || f < 0 || f + 1 >= s.beats.length) throw new Error("Choose an interval");
  const m = s.beats[f], h = s.beats[f + 1], b = Math.round(60 * (h.beat - m.beat) * s.source_audio.sample_rate / r);
  if (b < 1) throw new Error("BPM exceeds available sample precision");
  const S = m.frame + b - h.frame;
  for (let C = f + 1; C < s.beats.length; C++) {
    const A = s.beats[C];
    A.frame += S, A.source = A.reference_frame === null ? "manual" : A.frame === A.reference_frame ? "consensus" : "corrected";
  }
  return ln(s);
}
function ub(c, f) {
  if (!Number.isFinite(f) || Math.abs(f) > 1e5) throw new Error("Phase shift is out of bounds");
  const r = en(c), s = $n(r, 0), m = Math.round(f / ku * (60 / s) * r.source_audio.sample_rate);
  for (const h of r.beats)
    h.frame += m, h.source = h.reference_frame === null ? "manual" : h.frame === h.reference_frame ? "consensus" : "corrected";
  return ln(r);
}
function s0(c, f) {
  const r = en(c), s = b0(r, f);
  if (!Ml(s) || s < 0 || s >= r.source_audio.num_frames) throw new Error("Beat outside source");
  let m = r.beats.findIndex((A) => A.frame > s);
  if (m < 0 && (m = r.beats.length), m === 0 || m === r.beats.length || r.beats[m - 1].frame === s)
    throw new Error("Insert between two existing anchors; use the timeline selection to move end beats");
  const h = r.beats[m - 1], b = r.beats[m], S = b.beat - h.beat > 1, C = h.beat + 1;
  if (!S) {
    r.origin_beat >= b.beat && (r.origin_beat += 1);
    for (let A = m; A < r.beats.length; A++) r.beats[A].beat += 1;
  }
  return r.beats.splice(m, 0, { beat: C, frame: s, source: "manual", reference_frame: null }), ln(r);
}
function ib(c, f) {
  const r = en(c);
  if (!Ml(f) || f < 0 || f >= r.beats.length || r.beats.length <= 2)
    throw new Error("Keep at least two beat anchors");
  const [s] = r.beats.splice(f, 1);
  return s.beat === r.origin_beat && (r.origin_beat = r.beats[Math.min(f, r.beats.length - 1)].beat), ln(r);
}
function cb(c, f) {
  const r = en(c);
  if (!Ml(f) || f < 0 || f >= r.beats.length) throw new Error("Select Beat 1");
  return r.origin_beat = r.beats[f].beat, ln(r);
}
function sb(c) {
  const f = en(c);
  for (const r of f.beats) r.reference_frame !== null && (r.frame = r.reference_frame, r.source = "consensus");
  return ln(f);
}
function rb(c) {
  const f = $n(c, 0), r = c.beats.find((s) => s.beat === c.origin_beat);
  return c.beats.map((s) => ({
    time: s.frame / c.source_audio.sample_rate,
    value: ku * (s.beat - c.origin_beat) - (s.frame - r.frame) * f * ku / (c.source_audio.sample_rate * 60)
  }));
}
function ob(c, f, r = 3e3) {
  if (!c?.beats?.length) return [];
  const s = c.source_audio.sample_rate, m = Number.isFinite(f?.start) ? f.start : 0, h = Number.isFinite(f?.end) && f.end > m ? f.end : Number.MAX_VALUE, b = c.beats.filter((C) => C.frame / s >= m - 0.05 && C.frame / s <= h + 0.05), S = Math.max(1, Math.ceil(b.length / r));
  return b.filter((C, A) => A % S === 0).map((C) => ({
    time: C.frame / s,
    emphasis: C.beat === c.origin_beat,
    label: `Corrected beat ${C.beat} · native pip ${(C.beat - c.origin_beat) * ku}`,
    className: "stemlab-grid-corrected"
  }));
}
const $u = 20, go = 400, p0 = (c, f, r) => Math.max(f, Math.min(r, c)), r0 = (c) => 100 * (1 - Math.log(p0(c, $u, go) / $u) / Math.log(go / $u)), fb = (c, f) => $u * (go / $u) ** p0(1 - (c - f.top) / f.height, 0, 1);
async function oo(c, f = "GET", r) {
  const s = await fetch(
    `/api/${c}/beat-timeline${f === "POST" ? "/preview" : ""}`,
    { method: f, headers: { "Content-Type": "application/json" }, body: r === void 0 ? void 0 : JSON.stringify(r), cache: "no-store" }
  ), m = await s.json().catch(() => ({}));
  if (!s.ok) throw new Error(m.detail || `Beat timeline HTTP ${s.status}`);
  return m;
}
function db({ map: c, duration: f, visible: r, selected: s, onSelect: m, onEdit: h, onInsert: b }) {
  const S = c.source_audio.sample_rate, A = c.beats.map((v, j) => ({ row: v, i: j })).filter(({ row: v }) => {
    const j = v.frame / S;
    return j >= r.start - 0.1 && j <= r.end + 0.1;
  }), E = Math.max(1, Math.ceil(A.length / 2e3));
  return /* @__PURE__ */ d.jsx(
    "div",
    {
      className: "stemlab-beatmap-track",
      "aria-label": "Editable sample-accurate beat anchors",
      onDoubleClick: (v) => {
        if (v.target !== v.currentTarget) return;
        const j = v.currentTarget.getBoundingClientRect();
        b((v.clientX - j.left) / j.width * f), v.stopPropagation();
      },
      children: A.filter((v, j) => j % E === 0).map(({ row: v, i: j }) => /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          className: `stemlab-beatmap-anchor ${v.source} ${s === j ? "selected" : ""} ${v.beat === c.origin_beat ? "origin" : ""}`,
          "aria-label": `Beat ${v.beat}, ${ab(c, j).toFixed(6)} seconds, ${v.source}; drag or use arrow keys`,
          "aria-pressed": s === j,
          title: `Beat ${v.beat}: frame ${v.frame} · ${(v.frame / S).toFixed(6)} s · ${v.source}${v.reference_frame === null ? "" : ` · reference ${v.reference_frame}`}`,
          style: { left: `${v.frame / (S * Math.max(f, 1e-9)) * 100}%` },
          onPointerDown: (U) => {
            U.currentTarget.setPointerCapture(U.pointerId), m(j), U.stopPropagation();
          },
          onPointerMove: (U) => {
            if (!U.currentTarget.hasPointerCapture(U.pointerId)) return;
            const W = U.currentTarget.parentElement.getBoundingClientRect();
            h(j, (U.clientX - W.left) / W.width * f), U.stopPropagation();
          },
          onPointerUp: (U) => {
            U.currentTarget.releasePointerCapture(U.pointerId), U.stopPropagation();
          },
          onClick: (U) => {
            m(j), U.stopPropagation();
          },
          onKeyDown: (U) => {
            if (U.key !== "ArrowLeft" && U.key !== "ArrowRight") return;
            U.preventDefault(), U.stopPropagation();
            const W = U.shiftKey ? Math.max(1, Math.round(S / 1e3)) : 1;
            h(j, (v.frame + (U.key === "ArrowLeft" ? -W : W)) / S);
          },
          children: /* @__PURE__ */ d.jsx("span", { children: v.beat === c.origin_beat ? "1" : "" })
        },
        v.beat
      ))
    }
  );
}
function mb({ map: c, duration: f, visible: r, selected: s, onSelect: m, onTempo: h }) {
  const b = c.source_audio.sample_rate, S = c.beats.slice(0, -1).map((E, v) => ({
    i: v,
    start: E.frame / b,
    end: c.beats[v + 1].frame / b,
    bpm: $n(c, v)
  })).filter((E) => E.end >= r.start && E.start <= r.end), C = Math.max(1, Math.ceil(S.length / 1800)), A = S.filter((E, v) => v % C === 0);
  return /* @__PURE__ */ d.jsxs("div", { className: "stemlab-beatmap-tempo", "aria-label": "Editable local BPM envelope", children: [
    /* @__PURE__ */ d.jsx("svg", { className: "stemlab-beatmap-tempo-line", viewBox: "0 0 1000 100", preserveAspectRatio: "none", "aria-hidden": "true", children: /* @__PURE__ */ d.jsx(
      "polyline",
      {
        points: A.map((E) => `${(E.start + E.end) / 2 / Math.max(f, 1e-9) * 1e3},${r0(E.bpm)}`).join(" "),
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
    A.map((E) => /* @__PURE__ */ d.jsx(
      "button",
      {
        type: "button",
        className: `stemlab-beatmap-tempo-node ${s === E.i ? "selected" : ""}`,
        style: { left: `${(E.start + E.end) / 2 / Math.max(f, 1e-9) * 100}%`, top: `${r0(E.bpm)}%` },
        title: `Interval ${E.i} → ${E.i + 1}: ${E.bpm.toFixed(3)} BPM · drag vertically to change local tempo`,
        "aria-label": `BPM envelope interval ${E.i}: ${E.bpm.toFixed(3)} BPM`,
        "aria-pressed": s === E.i,
        onPointerDown: (v) => {
          v.currentTarget.setPointerCapture(v.pointerId), m(E.i), v.stopPropagation();
        },
        onPointerMove: (v) => {
          if (!v.currentTarget.hasPointerCapture(v.pointerId)) return;
          const j = v.currentTarget.parentElement.getBoundingClientRect();
          h(E.i, fb(v.clientY, j)), v.stopPropagation();
        },
        onPointerUp: (v) => {
          v.currentTarget.releasePointerCapture(v.pointerId), v.stopPropagation();
        },
        onClick: (v) => {
          m(E.i), v.stopPropagation();
        },
        onKeyDown: (v) => {
          v.key !== "ArrowUp" && v.key !== "ArrowDown" || (v.preventDefault(), v.stopPropagation(), h(E.i, Math.max(0.01, E.bpm + (v.key === "ArrowUp" ? 1 : -1) * (v.shiftKey ? 0.01 : 1))));
        },
        children: E.bpm.toFixed(1)
      },
      E.i
    ))
  ] });
}
function hb(c, f, r = !0) {
  const [s, m] = D.useState(null), [h, b] = D.useState(!1), [S, C] = D.useState(null), [A, E] = D.useState(!1), [v, j] = D.useState(!1), [U, W] = D.useState(!0), [L, k] = D.useState(0), [ht, q] = D.useState({ start: 0, end: 1 / 0 }), [V, Mt] = D.useState(!1), [it, Bt] = D.useState(!0), [Z, ot] = D.useState(""), [Jt, ut] = D.useState("0"), [yt, ft] = D.useState(""), [Et, Tt] = D.useState(!1), [jt, Y] = D.useState([]), [et, I] = D.useState([]), bt = D.useRef(null), rt = D.useRef(0), Dt = D.useRef(null);
  Dt.current = s;
  const Lt = D.useCallback(async (G = !1) => {
    if (!(A && !G && !window.confirm("Discard unsaved beat edits and reload the saved map?")))
      try {
        const at = await oo(c);
        if (!at.available) {
          j(!1);
          return;
        }
        Nc(at.map), m(at.map), j(!0), b(at.saved), C(at.revision), E(!1), Y([]), I([]), k(0), ot($n(at.map, 0)?.toFixed(3) || ""), ft(at.saved ? "Loaded saved beat corrections" : "Prepared an editable proposal at exact consensus sample frames");
      } catch (at) {
        at.message.includes("HTTP 404") && !Dt.current ? W(!1) : ft(at.message);
      }
  }, [c, A]);
  D.useEffect(() => {
    if (!r) return;
    let G = !0;
    const at = async () => {
      G && await Lt(!0);
    };
    at();
    const Ot = window.setInterval(() => {
      G && !Dt.current && at();
    }, 5e3);
    return () => {
      G = !1, window.clearInterval(Ot);
    };
  }, [c]);
  const F = D.useCallback((G) => {
    try {
      const at = Dt.current;
      if (!at) return;
      const Ot = G(at);
      at.review_status === "artist_confirmed" && Ot.review_status === "artist_confirmed" && (Ot.beats !== at.beats || Ot.origin_beat !== at.origin_beat) && (Ot.review_status = "estimated"), Nc(Ot), m(Ot), E(!0), Y((Re) => [...Re.slice(-59), at]), I([]), ft("Unsaved beat-map edits · original consensus unchanged");
    } catch (at) {
      ft(at.message);
    }
  }, []), y = () => {
    jt.length && (I((G) => [...G.slice(-59), s]), m(jt.at(-1)), Y((G) => G.slice(0, -1)), E(!0));
  }, R = () => {
    et.length && (Y((G) => [...G.slice(-59), s]), m(et.at(-1)), I((G) => G.slice(0, -1)), E(!0));
  }, Q = (G) => {
    k(G), ot($n(Dt.current, G)?.toFixed(3) || "");
  }, P = async (G) => {
    const at = await oo(c, "POST", G);
    return Nc(at), at;
  }, gt = async () => {
    if (s) {
      Tt(!0);
      try {
        const G = await oo(c, "PUT", { map: s, expected_revision: S });
        m(G.map), b(!0), C(G.revision), E(!1), Y([]), I([]), ft("Beat corrections saved separately from the consensus detections");
      } catch (G) {
        ft(G.message);
      } finally {
        Tt(!1);
      }
    }
  }, pt = async (G) => {
    if (s) {
      Tt(!0);
      try {
        const at = await P(s), Ot = JSON.stringify(at, null, 2);
        if (G === "copy")
          await navigator.clipboard.writeText(Ot), ft("Copied one complete beat-timeline JSON value with Beat 1 and pip phase synchronisation");
        else {
          const Re = new Blob([Ot + `
`], { type: "application/json" }), fe = URL.createObjectURL(Re), Ht = document.createElement("a");
          Ht.href = fe, Ht.download = `stemlab-beat-timeline-${c.slice(0, 12)}.json`, document.body.appendChild(Ht), Ht.click(), Ht.remove(), URL.revokeObjectURL(fe), ft("Exported a single source-bound beat-timeline JSON file");
        }
      } catch (at) {
        ft(at.message);
      } finally {
        Tt(!1);
      }
    }
  }, dt = async (G) => {
    const at = G.target.files?.[0];
    if (G.target.value = "", !!at) {
      if (at.size > 32 * 1024 * 1024) {
        ft("Import limited to 32 MiB");
        return;
      }
      Tt(!0);
      try {
        const Ot = JSON.parse(await at.text()), Re = await P(Ot);
        m(Re), E(!0), Y((fe) => s ? [...fe.slice(-59), s] : fe), I([]), ft("Imported and validated: review changes before saving. Original consensus unchanged.");
      } catch (Ot) {
        ft(Ot.message);
      } finally {
        Tt(!1);
      }
    }
  }, K = (G, at) => F((Ot) => nb(Ot, G, at)), lt = () => F((G) => sb(G)), $t = s && V && f > 0 ? [
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
          visible: ht,
          selected: L,
          onSelect: Q,
          onEdit: (G, at) => F((Ot) => c0(Ot, G, at)),
          onInsert: (G) => F((at) => s0(at, G))
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
          visible: ht,
          selected: L,
          onSelect: Q,
          onTempo: K
        }
      ) }
    },
    {
      id: "corrected:phase",
      title: "Phase CV",
      kind: "beatmap",
      height: 80,
      meta: "Relative pips vs the opening tempo · visible irregular drift",
      content: { type: "curve", points: rb(s).filter((G, at) => at % Math.max(1, Math.ceil(s.beats.length / 4e3)) === 0), colour: "#ecb7fd" }
    }
  ] : [], Ol = s && it ? ob(s, ht) : [], ie = s?.beats?.[Math.min(L, s.beats.length - 1)], Xt = s?.source_audio?.sample_rate || 1, vt = s && L < s.beats.length - 1 ? $n(s, L) : null, Nt = /* @__PURE__ */ d.jsxs("section", { className: "stemlab-beatmap-panel", "aria-label": "Editable variable tempo and Beat 1 phase", children: [
    /* @__PURE__ */ d.jsxs("header", { children: [
      /* @__PURE__ */ d.jsx("strong", { children: "Beat correction · variable BPM & phase" }),
      s && /* @__PURE__ */ d.jsxs("span", { children: [
        s.beats.length.toLocaleString(),
        " anchors · ",
        h ? "saved" : "consensus draft",
        A ? " · unsaved changes" : ""
      ] }),
      /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => Mt((G) => !G), children: V ? "Hide editor" : "Show editor" })
    ] }),
    V && s && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
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
              value: ie?.beat ?? 0,
              onChange: (G) => {
                const at = s.beats.findIndex((Ot) => Ot.beat === Number(G.target.value));
                at >= 0 && Q(at);
              }
            }
          )
        ] }),
        /* @__PURE__ */ d.jsxs("output", { children: [
          "Frame ",
          ie?.frame ?? 0,
          " · ",
          ie ? (ie.frame / Xt).toFixed(6) : "0",
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
              value: Z,
              onChange: (G) => ot(G.target.value),
              onKeyDown: (G) => {
                G.key === "Enter" && K(L, Number(Z));
              }
            }
          )
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: L >= s.beats.length - 1, onClick: () => K(L, Number(Z)), children: "Apply BPM" }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Phase shift (pips) ",
          /* @__PURE__ */ d.jsx(
            "input",
            {
              "aria-label": "Global phase shift pips",
              type: "number",
              step: "0.25",
              value: Jt,
              onChange: (G) => ut(G.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => F((G) => ub(G, Number(Jt))), children: "Shift all beats" })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-beatmap-actions", children: [
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => F((G) => c0(G, L, rt.current)), children: "Place selected at playhead" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => F((G) => s0(G, rt.current)), children: "Insert at playhead" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => F((G) => cb(G, L)), children: "Set selected as Beat 1" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => F((G) => ib(G, L)), children: "Delete selected" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: !jt.length, onClick: y, children: "Undo" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: !et.length, onClick: R, children: "Redo" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: lt, children: "Match consensus beats" }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          /* @__PURE__ */ d.jsx("input", { type: "checkbox", checked: it, onChange: (G) => Bt(G.target.checked) }),
          "Corrected grid"
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          /* @__PURE__ */ d.jsx(
            "input",
            {
              type: "checkbox",
              checked: s.review_status === "artist_confirmed",
              onChange: (G) => F((at) => ({ ...at, review_status: G.target.checked ? "artist_confirmed" : "estimated" }))
            }
          ),
          "Artist-reviewed Beat 1 / phase"
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-beatmap-export", children: [
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: Et || !A, onClick: gt, children: "Save corrections" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: Et, onClick: () => pt("download"), children: "Export Beat 1 + full beat timeline JSON" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: Et, onClick: () => pt("copy"), children: "Copy JSON value" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: Et, onClick: () => bt.current?.click(), children: "Import JSON" }),
        /* @__PURE__ */ d.jsx("input", { ref: bt, type: "file", accept: ".json,application/json", hidden: !0, onChange: dt }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => Lt(), children: "Reload saved/consensus" })
      ] }),
      /* @__PURE__ */ d.jsxs("small", { children: [
        "Current local BPM: ",
        vt?.toFixed(3) ?? "last anchor",
        " · original consensus matches remain labelled separately. Native timebase: 64 pips/beat, imported DanceMoves clocks use 16 ticks/beat. DanceMoves supports optional beat-timeline.v1 variable playback where its new consumer is installed; beat-alignment.v1 remains a separate fixed-tempo format."
      ] })
    ] }),
    !v && V && /* @__PURE__ */ d.jsx("p", { children: "Waiting for an available consensus beat list (and exact master audio). No timing is invented." }),
    yt && /* @__PURE__ */ d.jsx("output", { role: "status", className: "stemlab-beatmap-status", children: yt })
  ] });
  return {
    map: s,
    revision: S,
    saved: h,
    ready: v,
    dirty: A,
    lanes: $t,
    grid: Ol,
    panel: U ? Nt : null,
    onWindowChange: q,
    onTimeChange: (G) => {
      rt.current = G;
    }
  };
}
const yo = Object.freeze(["SECTION", "ENTRY", "DROP", "BREAK"]), Ju = Object.freeze([
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
]), Ia = (c, f) => Math.round(Number(c) * f);
function vb(c, { warningTicks: f = 5, severeTicks: r = 3, ticksPerBeat: s = 16 } = {}) {
  if (!c || c.clock_mode !== "fixed") return [];
  const m = Number(c.sample_rate), h = Number(c.fixed_clock?.bpm);
  if (!Number.isFinite(m) || m <= 0 || !Number.isFinite(h) || h <= 0) return [];
  const b = new Map(c.lines.map((A) => [A.id, A])), S = /* @__PURE__ */ new Map();
  for (const A of c.words)
    S.has(A.line_id) || S.set(A.line_id, []), S.get(A.line_id).push(A);
  const C = [];
  for (const [A, E] of S) {
    E.sort((v, j) => v.start_frame - j.start_frame);
    for (let v = 1; v < E.length; v++) {
      const j = E[v - 1], U = E[v], W = (U.start_frame - j.start_frame) / m, L = W * h / 60 * s;
      L >= f || C.push({
        lineId: A,
        line: b.get(A)?.text || A,
        fromId: j.id,
        toId: U.id,
        fromWord: j.word,
        toWord: U.word,
        seconds: W,
        ticks: L,
        severity: L < r ? "severe" : "warning"
      });
    }
  }
  return C;
}
function _o(c, f) {
  const r = String(c).trim().toUpperCase(), s = String(f).trim().toUpperCase().replace(/ +/g, " ");
  if (!yo.includes(r)) throw new Error("Cue type must be SECTION, ENTRY, DROP or BREAK");
  const m = /^([A-Z][A-Z -]*?)(?: ([1-9][0-9]{0,2}|A|B|FINAL))?$/.exec(s);
  if (!m || !Ju.includes(m[1]) || s.length > 64)
    throw new Error("Use a standard section (INTRO, VERSE 1, CHORUS, BUILD 1, DROP 1, OUTRO, etc.)");
  return { type: r, section: s, label: `[${r}: ${s}]` };
}
const Eo = (c) => ({ ...c, lines: c.lines.map((f) => ({ ...f })), words: c.words.map((f) => ({ ...f })), cues: c.cues.map((f) => ({ ...f })), fixed_clock: { ...c.fixed_clock } });
function Jn(c, f, r, s) {
  if (!Number.isSafeInteger(c) || c < f || c > r) throw new Error(`${s} cannot cross its parent, another event or source duration`);
  return c;
}
function gb(c, f = "start_frame") {
  return c.every((r, s) => s === 0 || r[f] >= c[s - 1][f]);
}
function yb(c, f, r) {
  const s = Eo(c), m = c.sample_rate, h = c.num_frames;
  if (!Number.isSafeInteger(m) || !Number.isSafeInteger(h) || m < 1 || h < 2) throw new Error("Invalid source-frame metadata");
  if (f === "cue") {
    const b = s.cues.findIndex((E) => E.id === r.id);
    if (b < 0) throw new Error("Cue not found");
    const S = s.cues[b], C = _o(r.type ?? S.type, r.section ?? S.section), A = Jn(Ia(r.start, m), 0, h - 1, "Cue");
    if (s.cues[b] = { ...s.cues[b], frame: A, type: C.type, section: C.section }, !gb(s.cues, "frame")) throw new Error("Cue movement must preserve chronological order");
  } else if (f === "line") {
    const b = s.lines.findIndex((j) => j.id === r.id);
    if (b < 0) throw new Error("Lyric line not found");
    const S = s.lines[b], C = Jn(Ia(r.start, m), 0, h - 1, "Line"), A = Jn(Ia(r.end, m), C + 1, h, "Line");
    if (b > 0 && C < s.lines[b - 1].end_frame || b + 1 < s.lines.length && A > s.lines[b + 1].start_frame)
      throw new Error("Lyric line cannot cross neighbouring line bounds");
    s.lines[b] = { ...S, start_frame: C, end_frame: A };
    const E = C - S.start_frame, v = A - C === S.end_frame - S.start_frame;
    for (const j of s.words) if (j.line_id === S.id && (v && (j.start_frame += E, j.end_frame += E), j.start_frame < C || j.end_frame > A))
      throw new Error("Line edit would cut off a word; adjust its words first");
  } else if (f === "word") {
    const b = s.words.findIndex((U) => U.id === r.id);
    if (b < 0) throw new Error("Word not found");
    const S = s.words[b], C = s.lines.find((U) => U.id === S.line_id);
    if (!C) throw new Error("Word parent line missing");
    const A = Jn(Ia(r.start, m), C.start_frame, C.end_frame - 1, "Word"), E = Jn(Ia(r.end, m), A + 1, C.end_frame, "Word"), v = s.words.filter((U) => U.line_id === S.line_id), j = v.findIndex((U) => U.id === S.id);
    if (j > 0 && A < v[j - 1].end_frame || j + 1 < v.length && E > v[j + 1].start_frame)
      throw new Error("Word cannot overlap a neighbour within the same lyric line");
    s.words[b] = { ...S, start_frame: A, end_frame: E };
  } else throw new Error("Expected line, word or cue edit");
  return s.review_status = "draft", s;
}
function bb(c, f, r, s = {}) {
  const m = Eo(c), h = c.sample_rate, b = Jn(Ia(r, h), 0, c.num_frames - 1, "Playhead"), S = new Set([...c.lines, ...c.words, ...c.cues].map((E) => E.id)), C = { line: "line", word: "word", cue: "cue" }[f];
  if (!C) throw new Error("Unknown timing track");
  let A;
  for (let E = 1; E <= 1e5 && (A = `${C}-edit-${E}`, !!S.has(A)); E++)
    ;
  if (S.has(A)) throw new Error("Too many events");
  if (f === "cue") {
    const { type: E, section: v } = _o(s.type || "SECTION", s.section || "INTRO");
    m.cues.push({ id: A, frame: b, type: E, section: v }), m.cues.sort((j, U) => j.frame - U.frame);
  } else if (f === "line") {
    const E = String(s.text || "").trim();
    if (!E) throw new Error("Type lyric text before adding a line");
    const v = c.lines.find((W) => W.start_frame > b), j = [...c.lines].reverse().find((W) => W.start_frame <= b);
    if (j && b < j.end_frame) throw new Error("Playhead is inside an existing line");
    const U = Math.min(c.num_frames, v?.start_frame ?? c.num_frames, b + Math.round(h * 2));
    if (U <= b) throw new Error("No room for a new line");
    m.lines.push({ id: A, start_frame: b, end_frame: U, text: E }), m.lines.sort((W, L) => W.start_frame - L.start_frame);
  } else {
    const E = m.lines.find((k) => k.id === s.lineId);
    if (!E) throw new Error("Select a lyric line before adding its word");
    const v = String(s.word || "").trim();
    if (!v) throw new Error("Type word text before adding a word");
    if (b < E.start_frame || b >= E.end_frame) throw new Error("Playhead must be within selected lyric line");
    const j = m.words.filter((k) => k.line_id === E.id), U = j.find((k) => k.start_frame > b), W = [...j].reverse().find((k) => k.start_frame <= b);
    if (W && W.end_frame > b) throw new Error("Playhead is already within another word");
    const L = Math.min(E.end_frame, U?.start_frame ?? E.end_frame, b + Math.round(h * 0.25));
    if (L <= b) throw new Error("No room within the selected lyric line");
    m.words.push({ id: A, line_id: E.id, start_frame: b, end_frame: L, word: v }), m.words.sort((k, ht) => k.start_frame - ht.start_frame);
  }
  return m.review_status = "draft", m;
}
function pb(c, f, r) {
  const s = Eo(c), m = { line: "lines", word: "words", cue: "cues" }[f];
  if (!m) throw new Error("Invalid track");
  if (f === "line" && s.words.some((h) => h.line_id === r)) throw new Error("Delete or reassign words before deleting their line");
  return s[m] = s[m].filter((h) => h.id !== r), s.review_status = "draft", s;
}
const Tc = async (c, f = "GET", r = null, s = "") => {
  const m = await fetch(`/api/${c}/song-timing${s}`, {
    method: f,
    headers: r ? { "Content-Type": "application/json" } : void 0,
    body: r ? JSON.stringify(r) : void 0,
    cache: "no-store"
  }), h = await m.json();
  if (!m.ok) throw new Error(h.detail || `Timing edits HTTP ${m.status}`);
  return h;
}, o0 = (c, f) => c / f, Zu = (c, f) => `stemlab-${f.slice(0, 12)}-${c}`;
function Sb(c, f, r) {
  const s = new Blob([c], { type: r }), m = URL.createObjectURL(s), h = document.createElement("a");
  try {
    h.href = m, h.download = f, document.body.appendChild(h), h.click(), h.remove();
  } finally {
    window.setTimeout(() => URL.revokeObjectURL(m), 1e3);
  }
}
function _b(c, f, r, s = !0) {
  const [m, h] = D.useState(null), [b, S] = D.useState(!1), [C, A] = D.useState(null), [E, v] = D.useState(!1), [j, U] = D.useState(!1), [W, L] = D.useState(!0), [k, ht] = D.useState("all"), [q, V] = D.useState({ kind: "line", id: null }), [Mt, it] = D.useState(""), [Bt, Z] = D.useState(!1), [ot, Jt] = D.useState(0.15), [ut, yt] = D.useState(!1), [ft, Et] = D.useState({ start: 0, end: 1 / 0 }), [Tt, jt] = D.useState(""), [Y, et] = D.useState(""), [I, bt] = D.useState("SECTION"), [rt, Dt] = D.useState("INTRO"), [Lt, F] = D.useState("lines"), [y, R] = D.useState("bundle"), Q = D.useRef(0), P = D.useRef(null), gt = D.useRef(null), pt = D.useRef(c), dt = D.useRef(!1);
  gt.current = m;
  const K = D.useCallback(async (x = !1) => {
    if (!(!x && gt.current && E && !window.confirm("Discard unsaved song timing changes?")))
      try {
        const J = await Tc(c);
        if (!J.available) {
          it(J.reason || "Waiting for exact source audio");
          return;
        }
        if (pt.current !== c) return;
        h(J.document), S(J.saved), A(J.revision), v(!1), V({ kind: "line", id: J.document.lines[0]?.id ?? null }), it(J.warnings?.join(" · ") || "Song timing loaded · source evidence unchanged");
      } catch (J) {
        it(J.message);
      }
  }, [c, E]);
  D.useEffect(() => {
    if (!s) return;
    pt.current = c, h(null), A(null), v(!1), V({ kind: "line", id: null }), K(!0);
    const x = window.setInterval(() => {
      !gt.current && !dt.current && K(!0);
    }, 5e3);
    return () => window.clearInterval(x);
  }, [c]);
  const lt = D.useCallback((x) => {
    try {
      const J = gt.current;
      if (!J) return;
      const Vt = x(J);
      h(Vt), v(!0), it("Unsaved song timing edits · original evidence preserved");
    } catch (J) {
      it(J.message);
    }
  }, []), $t = m?.sample_rate || 1, Ol = m ? m.num_frames / $t : Math.max(0, f), ie = m?.lines.find((x) => x.id === (q.kind === "line" ? q.id : m?.words.find((J) => J.id === q.id)?.line_id)) ?? m?.lines[0] ?? null, Xt = q.kind, vt = m?.[Xt === "line" ? "lines" : Xt === "word" ? "words" : "cues"].find((x) => x.id === q.id) ?? null, Nt = !!(r?.map?.beats?.length && r?.map?.source_audio?.sha256 === c), G = r?.revision ?? null, at = m?.clock_mode === "variable", Ot = D.useMemo(() => m ? m.clock_mode === "variable" ? Nt ? { ...r.map, mode: "variable" } : null : { mode: "fixed", bpm: m.fixed_clock.bpm, firstBeatSeconds: m.fixed_clock.first_beat_frame / $t } : null, [m, Nt, r?.map, $t]), Re = (x) => {
    lt((J) => ({ ...J, clock_mode: x, beat_revision: x === "variable" ? G : null, review_status: "draft" }));
  }, fe = (x, J) => lt((Vt) => ({ ...Vt, fixed_clock: { ...Vt.fixed_clock, [x]: J }, review_status: "draft" })), Ht = (x, J) => lt((Vt) => yb(Vt, x, J)), zl = (x) => lt((J) => bb(J, x, Q.current, {
    text: Tt,
    word: Y,
    lineId: ie?.id,
    type: I,
    section: rt
  })), Kl = (x, J, Vt) => lt((te) => {
    if (!Vt.trim() || /\r|\n|[\x00-\x1f]/.test(Vt)) throw new Error("Text must be nonempty, without newlines");
    const Oa = x === "line" ? "lines" : "words", Jl = x === "line" ? "text" : "word";
    return { ...te, [Oa]: te[Oa].map((kn) => kn.id === J ? { ...kn, [Jl]: Vt.trim() } : kn), review_status: "draft" };
  }), Al = (x, J, Vt) => lt((te) => {
    const Oa = _o(J, Vt);
    return { ...te, cues: te.cues.map((Jl) => Jl.id === x ? { ...Jl, type: Oa.type, section: Oa.section } : Jl), review_status: "draft" };
  }), Na = async () => {
    if (m) {
      U(!0), dt.current = !0;
      try {
        if (at && (r?.dirty || !Nt)) throw new Error("Save/reload the corrected beat map first; an enabled variable clock must refer to the current real beat map");
        const x = await Tc(c, "PUT", { document: m, expected_revision: C });
        h(x.document), A(x.revision), S(!0), v(!1), it("Saved exact source-frame corrections · original canonical, cue and ASR files unchanged");
      } catch (x) {
        it(x.message);
      } finally {
        U(!1), dt.current = !1;
      }
    }
  }, we = async () => {
    if (m) {
      U(!0), dt.current = !0;
      try {
        if (at && (r?.dirty || !Nt)) throw new Error("Save and verify the exact beat map before exporting variable-clock timing");
        const x = await Tc(c, "POST", { document: m }, "/preview"), J = {
          bundle: [JSON.stringify(x, null, 2) + `
`, Zu("timing-bundle", c) + ".json", "application/json"],
          lines: [x.line_lrc, Zu("lines", c) + ".lrc", "text/plain;charset=utf-8"],
          words: [x.word_tsv, Zu("words", c) + ".tsv", "text/tab-separated-values;charset=utf-8"],
          wordjson: [JSON.stringify(x.word_json, null, 2) + `
`, Zu("words", c) + ".json", "application/json"],
          cues: [x.cue_lrc, Zu("cues", c) + ".lrc", "text/plain;charset=utf-8"]
        };
        Sb(...J[y]), it(`Exported ${y} · source-bound clock and all timing forms remain available via the bundle`);
      } catch (x) {
        it(x.message);
      } finally {
        U(!1), dt.current = !1;
      }
    }
  }, xa = async (x) => {
    const J = x.target.files?.[0];
    if (x.target.value = "", !J || !m) return;
    if (J.size > 1048576) {
      it("Timing import limited to 1 MiB");
      return;
    }
    const Vt = J.name.split(".").at(-1).toLowerCase();
    U(!0), dt.current = !0;
    try {
      const te = await Tc(c, "POST", { document: m, kind: Lt, format: Vt, text: await J.text() }, "/import");
      h(te.document), v(!0), it(`Imported ${Lt} for review; not saved until Save corrections`);
    } catch (te) {
      it(te.message);
    } finally {
      U(!1), dt.current = !1;
    }
  }, Cl = (x) => {
    const J = x.start_frame ?? x.frame, Vt = x.end_frame ?? J;
    return J / $t <= ft.end + 0.01 && Vt / $t >= ft.start - 0.01;
  }, hl = D.useMemo(() => vb(m), [m]), Ma = D.useMemo(() => new Map(hl.map((x) => [x.toId, x.severity])), [hl]), w = (x, J) => ({
    id: x.id,
    label: J === "cue" ? `[${x.type}: ${x.section}]` : J === "word" ? x.word : x.text,
    ...J === "cue" ? { type: x.type, section: x.section } : {},
    start: o0(x.start_frame ?? x.frame, $t),
    ...J === "cue" ? {} : { end: o0(x.end_frame, $t) },
    ...J === "word" ? { parentId: x.line_id, className: Ma.has(x.id) ? `stemlab-short-transition-${Ma.get(x.id)}` : "" } : {}
  }), ct = m?.lines || [], zt = k === "all" ? m?.words || [] : (m?.words || []).filter((x) => x.line_id === ie?.id), me = (x, J, Vt = null) => ({
    id: `timing:${x}`,
    kind: `timing-${x}`,
    title: x === "line" ? "Lyric lines · editable" : x === "word" ? k === "all" ? "Words · all lyrics" : `Words · ${ie?.text || "select a line"}` : "Cue sections · editable",
    meta: `${J.length} ${x} events · drag or arrow to adjust · ${Ot?.mode || "no clock"} match`,
    height: x === "word" ? 88 : 94,
    content: {
      type: "timing",
      kind: x,
      clock: Ot,
      editable: !0,
      snap: Bt,
      toleranceSeconds: ot,
      items: J.filter(Cl).slice(0, 1600).map((te) => w(te, x)),
      parents: Vt ? Vt.map((te) => ({ id: te.id, start: te.start_frame / $t, end: te.end_frame / $t })) : void 0,
      selectedId: q.kind === x ? q.id : null,
      onSelect: (te) => V({ kind: x, id: te }),
      onEdit: (te) => Ht(x, te)
    }
  }), he = m && W ? [
    me("line", ct),
    me("word", zt, ct),
    me("cue", m.cues)
  ] : [], kt = /* @__PURE__ */ d.jsxs("section", { className: "stemlab-timing-panel", "aria-label": "Editable lyric, word and cue timing", children: [
    /* @__PURE__ */ d.jsxs("header", { children: [
      /* @__PURE__ */ d.jsx("strong", { children: "Lyric timing audition & correction" }),
      /* @__PURE__ */ d.jsx("span", { children: m ? `${m.lines.length} lines · ${m.words.length} words · ${m.cues.length} cues · ${E ? "unsaved" : "saved/seeded"}` : "Awaiting master" }),
      /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => L((x) => !x), children: W ? "Hide timing editor" : "Show timing editor" })
    ] }),
    W && m && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsx("p", { children: "All words are visible by default. Switch to the selected line for a less crowded editing view. Line, word and cue edits are kept in a separate source-bound document. Cue names must follow the established [SECTION: VERSE 1] / [DROP: CHORUS 1] convention." }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-timing-fields", children: [
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Timing clock ",
          /* @__PURE__ */ d.jsxs("select", { "aria-label": "Timing clock", value: m.clock_mode, onChange: (x) => Re(x.target.value), children: [
            /* @__PURE__ */ d.jsx("option", { value: "fixed", children: "Fixed BPM + Beat 1 offset" }),
            /* @__PURE__ */ d.jsx("option", { value: "variable", disabled: !Nt, children: "Corrected variable BPM beat map" })
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
              onChange: (x) => fe("bpm", Number(x.target.value))
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
              max: Ol,
              step: ".001",
              value: m.fixed_clock.first_beat_frame / $t,
              onChange: (x) => fe("first_beat_frame", Ia(x.target.value, $t))
            }
          )
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          /* @__PURE__ */ d.jsx("input", { type: "checkbox", checked: Bt, onChange: (x) => Z(x.target.checked) }),
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
              value: Math.round(ot * 1e3),
              onChange: (x) => Jt(Math.max(0, Math.min(1, Number(x.target.value) / 1e3)))
            }
          )
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          /* @__PURE__ */ d.jsx("input", { type: "checkbox", checked: ut, onChange: (x) => yt(x.target.checked) }),
          "Beat grid overlay"
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Word lane ",
          /* @__PURE__ */ d.jsxs("select", { "aria-label": "Word lane scope", value: k, onChange: (x) => ht(x.target.value), children: [
            /* @__PURE__ */ d.jsx("option", { value: "all", children: "All words" }),
            /* @__PURE__ */ d.jsx("option", { value: "selected", children: "Selected line only" })
          ] })
        ] })
      ] }),
      hl.length > 0 && /* @__PURE__ */ d.jsxs("details", { className: "stemlab-timing-diagnostics", open: !0, children: [
        /* @__PURE__ */ d.jsxs("summary", { children: [
          hl.length,
          " unusually short word transition",
          hl.length === 1 ? "" : "s",
          " to audition"
        ] }),
        /* @__PURE__ */ d.jsx("p", { children: "Orange is below five 16th-beat ticks; red is below three. These are review flags, not automatic timing changes." }),
        /* @__PURE__ */ d.jsx("ul", { children: hl.map((x) => /* @__PURE__ */ d.jsxs("li", { children: [
          /* @__PURE__ */ d.jsxs("button", { type: "button", onClick: () => {
            V({ kind: "word", id: x.toId }), ht("selected");
          }, children: [
            x.line,
            ": ",
            x.fromWord,
            " → ",
            x.toWord
          ] }),
          " ",
          /* @__PURE__ */ d.jsx("strong", { children: x.severity }),
          " · ",
          x.ticks.toFixed(2),
          " ticks · ",
          x.seconds.toFixed(3),
          "s"
        ] }, `${x.fromId}:${x.toId}`)) })
      ] }),
      at && !Nt && /* @__PURE__ */ d.jsx("p", { role: "alert", children: "Variable BPM is selected but its source-bound beat map is unavailable; no silent fixed-BPM downgrade." }),
      at && r?.dirty && /* @__PURE__ */ d.jsx("p", { role: "alert", children: "Save the beat-map corrections before saving/exporting lyric and cue timing changes." }),
      at && Nt && m.beat_revision !== G && /* @__PURE__ */ d.jsxs("p", { role: "alert", children: [
        "The saved beat-map revision has changed. Review its timing, then explicitly rebind these lyrics and cues to that revision. ",
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: r.dirty, onClick: () => lt((x) => ({ ...x, beat_revision: G, review_status: "draft" })), children: "Rebind to reviewed beat-map revision" })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-timing-fields", children: [
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Selected line ",
          /* @__PURE__ */ d.jsxs("select", { "aria-label": "Selected lyric line", value: ie?.id || "", onChange: (x) => V({ kind: "line", id: x.target.value }), children: [
            /* @__PURE__ */ d.jsx("option", { value: "", children: "Choose line" }),
            m.lines.map((x) => /* @__PURE__ */ d.jsx("option", { value: x.id, children: x.text.slice(0, 75) }, x.id))
          ] })
        ] }),
        vt && Xt !== "cue" && /* @__PURE__ */ d.jsxs("label", { children: [
          Xt === "line" ? "Line text" : "Word text",
          /* @__PURE__ */ d.jsx(
            "input",
            {
              "aria-label": "Selected text",
              value: Xt === "line" ? vt.text : vt.word,
              onChange: (x) => Kl(Xt, vt.id, x.target.value)
            }
          )
        ] }),
        vt && Xt === "cue" && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
          /* @__PURE__ */ d.jsxs("label", { children: [
            "Cue type ",
            /* @__PURE__ */ d.jsx("select", { value: vt.type, onChange: (x) => Al(vt.id, x.target.value, vt.section), children: yo.map((x) => /* @__PURE__ */ d.jsx("option", { value: x, children: x }, x)) })
          ] }),
          /* @__PURE__ */ d.jsxs("label", { children: [
            "Standard section ",
            /* @__PURE__ */ d.jsx(
              "select",
              {
                value: Ju.find((x) => vt.section === x || vt.section.startsWith(x + " ")) || "INTRO",
                onChange: (x) => Al(vt.id, vt.type, x.target.value),
                children: Ju.map((x) => /* @__PURE__ */ d.jsx("option", { value: x, children: x }, x))
              }
            )
          ] }),
          /* @__PURE__ */ d.jsxs("label", { children: [
            "Section number / suffix ",
            /* @__PURE__ */ d.jsxs(
              "select",
              {
                "aria-label": "Cue section suffix",
                value: vt.section.match(/ (\d+|A|B|FINAL)$/)?.[1] || "",
                onChange: (x) => {
                  const J = Ju.find((Vt) => vt.section === Vt || vt.section.startsWith(Vt + " ")) || "INTRO";
                  Al(vt.id, vt.type, J + (x.target.value ? " " + x.target.value : ""));
                },
                children: [
                  /* @__PURE__ */ d.jsx("option", { value: "", children: "None" }),
                  Array.from({ length: 64 }, (x, J) => String(J + 1)).concat(["A", "B", "FINAL"]).map((x) => /* @__PURE__ */ d.jsx("option", { value: x, children: x }, x))
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-timing-fields", children: [
        /* @__PURE__ */ d.jsxs("label", { children: [
          "New line text ",
          /* @__PURE__ */ d.jsx("input", { value: Tt, placeholder: "Lyrics line", onChange: (x) => jt(x.target.value) })
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => zl("line"), children: "Add line at playhead" }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "New word ",
          /* @__PURE__ */ d.jsx("input", { value: Y, placeholder: "Single word", onChange: (x) => et(x.target.value) })
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: !ie, onClick: () => zl("word"), children: "Add word inside selected line" })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-timing-fields", children: [
        /* @__PURE__ */ d.jsxs("label", { children: [
          "New cue type ",
          /* @__PURE__ */ d.jsx("select", { value: I, onChange: (x) => bt(x.target.value), children: yo.map((x) => /* @__PURE__ */ d.jsx("option", { children: x }, x)) })
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Section ",
          /* @__PURE__ */ d.jsx("select", { value: rt, onChange: (x) => Dt(x.target.value), children: Ju.map((x) => /* @__PURE__ */ d.jsx("option", { children: x }, x)) })
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => zl("cue"), children: "Add cue at playhead" }),
        /* @__PURE__ */ d.jsxs("button", { type: "button", disabled: !vt, onClick: () => lt((x) => pb(x, Xt, q.id)), children: [
          "Delete selected ",
          Xt
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          /* @__PURE__ */ d.jsx("input", { type: "checkbox", checked: m.review_status === "artist_confirmed", onChange: (x) => lt((J) => ({ ...J, review_status: x.target.checked ? "artist_confirmed" : "draft" })) }),
          "Artist-reviewed timing"
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-timing-actions", children: [
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: j || !E, onClick: Na, children: "Save source-frame corrections" }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Export format ",
          /* @__PURE__ */ d.jsxs("select", { value: y, onChange: (x) => R(x.target.value), children: [
            /* @__PURE__ */ d.jsx("option", { value: "bundle", children: "Complete JSON bundle" }),
            /* @__PURE__ */ d.jsx("option", { value: "lines", children: "Line LRC" }),
            /* @__PURE__ */ d.jsx("option", { value: "words", children: "Word TSV" }),
            /* @__PURE__ */ d.jsx("option", { value: "wordjson", children: "Word JSON" }),
            /* @__PURE__ */ d.jsx("option", { value: "cues", children: "Named cue LRC" })
          ] })
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: j, onClick: we, children: "Download selection" }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Import track ",
          /* @__PURE__ */ d.jsxs("select", { value: Lt, onChange: (x) => F(x.target.value), children: [
            /* @__PURE__ */ d.jsx("option", { value: "lines", children: "Per-line LRC" }),
            /* @__PURE__ */ d.jsx("option", { value: "words", children: "Per-word LRC/TSV/JSON" }),
            /* @__PURE__ */ d.jsx("option", { value: "cues", children: "Section-cue LRC" })
          ] })
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: j, onClick: () => P.current?.click(), children: "Choose timing file" }),
        /* @__PURE__ */ d.jsx("input", { ref: P, type: "file", hidden: !0, accept: Lt === "words" ? ".lrc,.tsv,.json" : ".lrc", onChange: xa }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: j, onClick: () => K(), children: "Reload saved" })
      ] }),
      /* @__PURE__ */ d.jsx("small", { children: "Word positions must stay inside their lyric line. An off-grid word/cue is preserved until you explicitly drag or enable nearby-beat snapping. Pips=64/beat, DanceMoves ticks=16/beat. LRC/TSV exports round timestamps; the JSON retains native frames." })
    ] }),
    W && !m && /* @__PURE__ */ d.jsx("p", { children: "Waiting for decoded source audio; no lyric or cue times are invented." }),
    Mt && /* @__PURE__ */ d.jsx("output", { role: "status", className: "stemlab-timing-status", children: Mt })
  ] });
  return {
    clock: Ot,
    lanes: he,
    panel: kt,
    gridVisible: ut,
    lyricItems: m ? ct.map((x) => w(x, "line")) : null,
    onWindowChange: Et,
    onTimeChange: (x) => {
      Q.current = x;
    }
  };
}
function Eb(c, f) {
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
function Tb(c) {
  const [f, r] = D.useState({ report: null, error: "" });
  D.useEffect(() => {
    let m = !0, h, b = "";
    const S = new AbortController();
    r({ report: null, error: "" });
    const C = async () => {
      try {
        const A = await fetch(`/${c}/deep/loops/loops.json`, {
          cache: "no-store",
          signal: S.signal
        });
        if (!m) return;
        if (A.status === 404)
          b = "", r({ report: null, error: "" });
        else {
          if (!A.ok) throw new Error(`Loop report: HTTP ${A.status}`);
          const E = await A.json();
          if (E.schema === "stemlab.loop-availability.v1" && E.status === "not-analysed") {
            r({ report: null, error: "", note: E.reason });
            return;
          }
          if (E.schema !== "stemlab.loops.v1") throw new Error("Unsupported loop report schema");
          const v = JSON.stringify(E);
          m && v !== b && (r({ report: E, error: "" }), b = v);
        }
      } catch (A) {
        m && A.name !== "AbortError" && (b = "", r({ report: null, error: A.message }));
      } finally {
        m && (h = window.setTimeout(C, 2500));
      }
    };
    return C(), () => {
      m = !1, S.abort(), window.clearTimeout(h);
    };
  }, [c]);
  const s = D.useMemo(() => Eb(f.report, c), [f.report, c]);
  return { ...f, loops: s };
}
function Nb({ state: c, hash: f }) {
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
const Oe = (c) => document.querySelector(c), xb = Oe("#uploadView"), To = Oe("#timelineView"), tn = Oe("#dropZone"), Fu = Oe("#fileInput"), S0 = Oe("#chooseButton"), _0 = Oe("#uploadProgressWrap"), xc = Oe("#uploadProgress"), Mc = Oe("#uploadLabel"), _a = Oe("#connectionBadge"), E0 = Oe("#canonicalBpm"), T0 = Oe("#canonicalLyrics"), N0 = Oe("#canonicalTiming"), bo = Oe("#knownInfoStatus"), Mb = Oe("#loadArcadiansReference"), Ob = Oe("#loadArcadiansHero"), zb = Array.from(To.children), No = document.createElement("div");
No.id = "timelineRoot";
To.replaceChildren(No);
for (const c of zb) c.remove();
const Ab = zy.createRoot(No), Cb = /* @__PURE__ */ new Set(["wav", "flac", "mp3", "ogg", "opus", "m4a", "aif", "aiff"]);
let po = {};
function jb(c) {
  const f = String(c).split("/").pop() || "", r = f.lastIndexOf(".");
  return r >= 0 ? f.slice(r + 1).toLowerCase() : "";
}
function dl(c) {
  return String(c).replace(/^stems\//, "").replace(/^spectrograms\//, "").replace(/^vamp\/data\//, "Vamp · ").replace(/^beats\//, "Beats · ").replace(/^speech\//, "Speech · ").replace(/^deep\//, "Deep · ").replace(/[_-]+/g, " ");
}
function Ac(c, f) {
  return `/${c}/${f.split("/").map(encodeURIComponent).join("/")}`;
}
function Oc(c, f, r = "Generated analysis artifact") {
  return { type: "artifact", note: r, href: f === "__source__" ? `/api/${c}/source` : Ac(c, f) };
}
async function Fe(c, f) {
  const r = await fetch(Ac(c, f), { cache: "no-store" });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}
function ml(c, f = 2, r = "") {
  const s = Number(c);
  return Number.isFinite(s) ? `${s.toFixed(f)}${r}` : "—";
}
function Wa(c, f, r, s, m = "feature") {
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
function zc(c) {
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
function Rb(c) {
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
      return { type: "blocks", items: zc(f) };
    case "events":
      return { type: "markers", items: f.flatMap((r) => Number.isFinite(Number(r.start)) ? [{ time: Number(r.start) }] : []) };
    default:
      return { type: "artifact", note: f[0]?.label || f[0]?.values?.join(", ") || c.title || "analysis" };
  }
}
async function x0(c, f, r, s, m) {
  const h = new URLSearchParams({ path: m, points: "12000" }), b = await fetch(`/api/${c}/waveform?${h}`);
  if (!b.ok) return { id: f, title: r, meta: s, kind: "artifact", content: Oc(c, m, `waveform unavailable (${b.status})`) };
  const S = await b.json();
  return {
    id: f,
    title: r,
    meta: s,
    kind: "waveform",
    content: { type: "waveform", min: S.min || [], max: S.max || [] },
    duration: Number(S.duration_seconds) || 0,
    audioSrc: m === "__source__" ? `/api/${c}/source` : Ac(c, m)
  };
}
async function wb(c, f) {
  const r = f.path, s = `file:${r}`, m = jb(r);
  if (r === "canonical.json" || r.startsWith("deep/loops/")) return null;
  if (Cb.has(m)) return x0(c, s, dl(r), "audio waveform", r);
  if (r.startsWith("spectrograms/") && m === "npz") {
    const h = new URLSearchParams({ path: r, max_width: "8192", max_height: "768" });
    return { id: s, title: dl(r), meta: "spectrogram data · exact song timeline", kind: "spectrogram", content: { type: "image", src: `/api/${c}/spectrogram?${h}`, alt: `${dl(r)} spectrogram` } };
  }
  if (r.startsWith("spectrograms/") && m === "png")
    return { id: s, title: dl(r), meta: "rendered spectrogram PNG", kind: "image", content: { type: "image", src: Ac(c, r), alt: `${dl(r)} rendered spectrogram` } };
  try {
    if (r === "analysis.json") {
      const h = await Fe(c, r);
      return {
        id: s,
        title: dl(r),
        meta: "analysis provenance",
        kind: "artifact",
        sourceMap: h.spectrograms || [],
        content: Oc(c, r)
      };
    }
    if (r.startsWith("deep/midi/") && r.endsWith("/notes.json")) {
      const h = await Fe(c, r);
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
      const h = await Fe(c, r), b = new Set((h.downbeats || []).map((S) => Number(S).toFixed(3)));
      return { id: s, title: dl(r), meta: "beat / downbeat events", kind: "events", content: { type: "markers", items: (h.beats || []).flatMap((S) => {
        const C = Number(S);
        return Number.isFinite(C) ? [{ time: C, emphasis: b.has(C.toFixed(3)), label: b.has(C.toFixed(3)) ? "Downbeat" : "Beat" }] : [];
      }) } };
    }
    if (r.startsWith("vamp/data/") && m === "json") {
      const h = await Fe(c, r);
      return { id: s, title: dl(r), meta: "Vamp feature analysis", kind: "feature", content: Rb(h) };
    }
    if (r === "speech/whisper.json") {
      const h = await Fe(c, r);
      return { id: s, title: "Speech · Whisper words", meta: "word-aligned transcript", kind: "words", content: { type: "blocks", items: (h.words || []).flatMap((b) => {
        const S = Number(b.start), C = Number(b.end);
        return Number.isFinite(S) ? [{ start: S, end: Number.isFinite(C) ? Math.max(S + 0.03, C) : S + 0.03, label: String(b.word || "").trim() }] : [];
      }) } };
    }
    if (r === "deep/structure/structure.json" || r === "deep/song_map/song_map.json") {
      const h = await Fe(c, r), b = r.includes("song_map");
      return { id: s, title: b ? "Deep · song map" : "Deep · functional structure", meta: b ? "section-level sonic / rhythm / harmony / lyric fusion" : "All-In-One · functional song sections", kind: "deep-structure", content: { type: "blocks", items: zc(b ? h.sections : h.segments) } };
    }
    if (r === "deep/harmony/harmony.json") {
      const h = await Fe(c, r), b = h.chords?.collapsed_progression || [];
      return b.length ? { id: s, title: "Deep · harmony", meta: "collapsed chord progression + key evidence", kind: "deep-harmony", content: { type: "blocks", items: zc(b) } } : Wa(s, "Deep · harmony", "collapsed chord progression + key evidence", [["key", h.vamp_key || h.independent_key_candidates_from_nnls_chroma?.[0]?.key || "—"], ["tuning", h.tuning_hz ? `${Number(h.tuning_hz).toFixed(1)} Hz` : "—"]], "deep-harmony");
    }
    if (r === "deep/lyrics/lyrics.json") {
      const h = await Fe(c, r), b = (h.lines || []).filter((S) => Number.isFinite(Number(S.start)) && Number.isFinite(Number(S.end)));
      return b.length ? { id: s, title: "Deep · rhyme & prosody", meta: "phonetic rhyme, repetition and delivery", kind: "deep-lyrics", content: { type: "blocks", items: zc(b) } } : Wa(s, "Deep · rhyme & prosody", "phonetic rhyme, repetition and delivery", [["rhyme scheme", h.rhyme?.scheme || "—"], ["lines", h.line_count ?? "—"], ["words", h.word_count ?? "—"]], "deep-lyrics");
    }
    if (r === "deep/sonic/sonic.json") {
      const h = await Fe(c, r);
      return Wa(s, "Deep · sonic profile", "loudness · dynamics · timbre · stereo", [["LUFS", ml(h.loudness?.integrated_lufs_bs1770, 1)], ["crest", ml(h.loudness?.crest_factor_db, 1, " dB")], ["RMS range", ml(h.loudness?.short_term_rms_range_db_p95_p10, 1, " dB")], ["centroid", ml(h.timbre?.spectral_centroid_hz_mean, 0, " Hz")], ["stereo corr", ml(h.stereo?.left_right_correlation, 2)]]);
    }
    if (r === "deep/rhythm/rhythm.json") {
      const h = await Fe(c, r);
      return Wa(s, "Deep · groove", "meter · stability · swing · syncopation evidence", [["tempo", ml(h.tempo?.median_bpm, 2, " BPM")], ["meter", h.meter?.estimated_beats_per_bar ? `${h.meter.estimated_beats_per_bar}/4-ish` : "—"], ["swing", ml(h.groove?.swing_ratio_long_to_short, 2, ":1")], ["offbeat energy", ml(h.groove?.offbeat_onset_energy_ratio, 3)], ["onsets/s", ml(h.groove?.onset_density_per_second, 2)]]);
    }
    if (r === "deep/semantic_text/semantic_text.json") {
      const h = await Fe(c, r);
      return Wa(s, "Deep · lyric semantics", "sentence embedding theme similarities · not probabilities", (h.theme_similarity || []).slice(0, 7).map((b) => [b.theme, ml(b.similarity, 3)]));
    }
    if (r === "deep/semantic_audio/semantic_audio.json") {
      const h = await Fe(c, r), b = Object.entries(h.prompt_sets || {}).flatMap(([S, C]) => (C || []).slice(0, 2).map((A) => [`${S}: ${A.prompt}`, ml(A.similarity, 3)]));
      return Wa(s, "Deep · audio semantics", "MuQ-MuLan zero-shot similarities · CC-BY-NC weights", b);
    }
    if (r === "deep/summary.json") {
      const h = await Fe(c, r), b = Object.entries(h.analyses || {}).map(([S, C]) => [S, C.available ? "ready" : "unavailable"]);
      return (h.errors || []).length && b.push(["errors", h.errors.length]), Wa(s, "Deep · analysis summary", "cross-domain action inventory", b);
    }
  } catch (h) {
    return { id: s, title: dl(r), meta: "analysis artifact", kind: "artifact", content: Oc(c, r, h.message) };
  }
  return { id: s, title: dl(r), meta: `${m || "file"} · ${Number(f.bytes || 0).toLocaleString()} bytes`, kind: "artifact", content: Oc(c, r) };
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
function Ub({ lines: c }) {
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
function Bb({ hash: c, filename: f }) {
  const r = Tb(c), [s, m] = D.useState([]), [h, b] = D.useState("__source__"), [S, C] = D.useState(0), A = !window.__stemlabStatic, E = hb(c, S, A), [v, j] = D.useState({ bpm: null, lyrics: null, lyric_timing: [] }), U = _b(c, S, E, A), [W, L] = D.useState({ state: "submitted" }), [k, ht] = D.useState(null), [q, V] = D.useState("canonical"), [Mt, it] = D.useState("consensus"), [Bt, Z] = D.useState([]), ot = D.useRef(/* @__PURE__ */ new Set()), Jt = D.useCallback((F, y) => {
    y && Z((R) => [...R.slice(-799), { stream: F === "stderr" ? "stderr" : "stdout", text: y }]);
  }, []), ut = D.useCallback(async (F) => {
    if (!F?.path || ot.current.has(F.path)) return;
    ot.current.add(F.path);
    const y = await wb(c, F);
    y && (y.duration && C((R) => R || y.duration), m((R) => R.some((Q) => Q.id === y.id) ? R : [...R, y]));
  }, [c]), yt = D.useCallback(async () => {
    const F = await fetch(`/api/${c}/timeline`, { cache: "no-store" });
    if (!F.ok) return;
    const y = await F.json();
    L(y.status || { state: "submitted" }), y.duration_seconds && C(Number(y.duration_seconds)), y.canonical && j(y.canonical), ht(y.beat_offsets || null);
    for (const R of y.files || []) ut(R);
  }, [ut, c]);
  D.useEffect(() => {
    ot.current = /* @__PURE__ */ new Set(), m([]), b("__source__"), ht(null), V("canonical"), it("consensus"), x0(c, "__source__", "MASTER · uploaded source", f, "__source__").then((R) => {
      R.duration && C(R.duration), m((Q) => [R, ...Q.filter((P) => P.id !== R.id)]);
    }).catch((R) => Jt("stderr", R.message)), yt();
    const F = window.setInterval(() => {
      yt();
    }, 2500);
    let y = null;
    return typeof window.io == "function" ? (y = window.io({ path: "/socket.io" }), y.on("connect", () => {
      _a.textContent = "live", _a.classList.remove("muted"), y.emit("subscribe", { hash: c });
    }), y.on("disconnect", () => {
      _a.textContent = "reconnecting", _a.classList.add("muted");
    }), y.on("process_output", (R) => Jt(R.stream || "stdout", R.line || "")), y.on("process_history", (R) => {
      for (const Q of R.stdout || []) Jt("stdout", Q);
      for (const Q of R.stderr || []) Jt("stderr", Q);
    }), y.on("new_file", (R) => {
      ut(R);
    }), y.on("job_status", (R) => {
      L(R.status || {}), yt();
    }), y.on("canonical_metadata", (R) => {
      R?.canonical && j(R.canonical);
    }), y.on("job_timeout", (R) => Jt("stderr", `Job timeout: ${R.message || "analysis exceeded timeout"}`))) : window.__stemlabStatic ? (_a.textContent = "static", _a.classList.add("muted")) : (_a.textContent = "polling", _a.classList.add("muted"), Jt("stderr", "Socket.IO browser client unavailable; timeline inventory polling remains active.")), () => {
      window.clearInterval(F), y?.disconnect();
    };
  }, [ut, Jt, f, c, yt]);
  const ft = D.useMemo(() => Db(v), [v]), Et = D.useMemo(() => tb(k, v.bpm, S, q, Mt), [k, v.bpm, S, q, Mt]), Tt = (F) => F.id === "__source__" ? 0 : F.kind === "deep-structure" ? 10 : F.kind === "events" ? 20 : F.kind === "audio" ? 1 : F.kind === "spectrogram" ? 30 : F.kind === "waveform" ? 40 : 90, jt = D.useMemo(() => Iy(s), [s]), et = [...Et.basis ? [
    { id: "canonical:bpm", title: "BPM grid · original", meta: `${Et.basis.bpm.toFixed(4)} BPM · source time 0`, kind: "canonical-bpm", height: 74, content: { type: "markers", items: Et.original } },
    { id: "bpm:aligned", title: "BPM grid · offset", meta: Et.row ? `${Et.row.offset_pips.toFixed(6)} pips · ${Et.analysis.analysis_id}` : "Waiting for detected first beat", kind: "canonical-bpm", height: 74, content: { type: "markers", items: Et.aligned } }
  ] : [], ...E.lanes, ...U.lanes, ...ft.lanes, ...[...jt].sort((F, y) => Tt(F) - Tt(y) || F.id.localeCompare(y.id))], I = Fy(s, S), bt = I.find((F) => F.id === h), rt = !bt || bt.id === "__source__", Dt = window.__stemlabStatic ? window.__stemlabStatic.artworkUrl : v.cover_art_url, Lt = W.state || "submitted";
  return /* @__PURE__ */ d.jsx(
    $y,
    {
      className: "stemlab-timeline",
      laneControls: !0,
      wheelNavigation: !0,
      audioSrc: bt?.audioSrc || `/api/${c}/source`,
      lyricAudition: {
        artworkSrc: Dt,
        artworkAlt: `${v.title || f} cover artwork`,
        audioLabel: bt?.title || "MASTER · uploaded source",
        items: ky(v, U.lyricItems ?? window.__stemlabStatic?.lyricItems ?? null)
      },
      duration: S,
      title: v.title || f,
      subtitle: c,
      loops: Wy(r.loops, rt),
      lanes: et,
      grid: [...Et.grid, ...E.grid],
      beatClock: U.clock,
      showBeatGrid: U.gridVisible,
      onDurationChange: C,
      onWindowChange: (F) => {
        E.onWindowChange(F), U.onWindowChange(F);
      },
      onTimeChange: (F) => {
        E.onTimeChange(F), U.onTimeChange(F);
      },
      onPlaybackError: (F) => Jt("stderr", F instanceof Error ? F.message : String(F)),
      headerEnd: /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
        /* @__PURE__ */ d.jsxs("label", { className: "small stemlab-audition-channel", children: [
          "Audio channel ",
          /* @__PURE__ */ d.jsxs(
            "select",
            {
              "aria-label": "Audio channel",
              value: bt?.id || "__source__",
              onChange: (F) => b(F.target.value),
              children: [
                !I.length && /* @__PURE__ */ d.jsx("option", { value: "__source__", children: "MASTER · uploaded source" }),
                I.map((F) => /* @__PURE__ */ d.jsx("option", { value: F.id, children: F.title }, F.id))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ d.jsx("span", { className: `badge ${Lt}`, children: Lt }),
        /* @__PURE__ */ d.jsxs("span", { className: "small", children: [
          et.length,
          " lane",
          et.length === 1 ? "" : "s"
        ] })
      ] }),
      footer: /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
        /* @__PURE__ */ d.jsx(eb, { comparison: Et, onBasis: V, onAnalysis: it }),
        A && E.panel,
        A && U.panel,
        /* @__PURE__ */ d.jsx(Nb, { state: r, hash: c }),
        /* @__PURE__ */ d.jsx(Ub, { lines: Bt }),
        /* @__PURE__ */ d.jsx("span", { className: "dock-links", children: /* @__PURE__ */ d.jsx("a", { href: "https://kieransimkin.co.uk/my-songs/", target: "_blank", rel: "noopener", children: "Kieran Simkin · My Songs ↗" }) })
      ] })
    }
  );
}
function Hb() {
  const c = E0?.value?.trim() || "", f = T0?.value || "", r = N0?.value || "";
  return { ...po, bpm: c ? Number(c) : null, lyrics: f.trim() || null, lyric_timing: r.trim() || [] };
}
function Lb(c) {
  return Number.isFinite(Number(c.bpm)) || !!c.lyrics || !!(typeof c.lyric_timing == "string" && c.lyric_timing.trim()) || !!(Array.isArray(c.lyric_timing) && c.lyric_timing.length);
}
async function Yb(c) {
  const f = Hb();
  if (!Lb(f)) return;
  const r = await fetch(`/api/${c}/canonical`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) }), s = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(s.detail || `Could not save canonical metadata (${r.status})`);
  bo.textContent = "Known information saved with this song hash.";
}
function qb(c) {
  return new Promise((f, r) => {
    const s = new XMLHttpRequest();
    s.open("PUT", `/upload/${encodeURIComponent(c.name)}`), s.setRequestHeader("Content-Type", c.type || "application/octet-stream"), s.upload.onprogress = (m) => {
      _0.classList.remove("hidden");
      const h = m.lengthComputable ? m.loaded / m.total : 0;
      xc.style.width = `${Math.round(h * 100)}%`, Mc.textContent = m.lengthComputable ? `${Math.round(h * 100)}% · ${(m.loaded / 1048576).toFixed(1)} / ${(m.total / 1048576).toFixed(1)} MiB` : `${(m.loaded / 1048576).toFixed(1)} MiB uploaded`;
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
async function M0(c, f) {
  xb.classList.add("hidden"), To.classList.remove("hidden"), Ab.render(/* @__PURE__ */ d.jsx(Bb, { hash: c, filename: f || "uploaded audio" }, c));
}
async function O0(c) {
  if (c) {
    xc.style.width = "0%", Mc.textContent = `Uploading ${c.name}`, _0.classList.remove("hidden");
    try {
      const f = await qb(c);
      xc.style.width = "100%", Mc.textContent = "Upload complete · attaching to analysis", await Yb(f.hash), await M0(f.hash, f.filename || c.name);
    } catch (f) {
      Mc.textContent = f.message, xc.style.width = "0%";
    }
  }
}
async function z0(c) {
  c?.preventDefault(), c?.stopPropagation();
  try {
    const f = await fetch("/assets/arcadians-reference.json", { cache: "no-store" });
    if (!f.ok) throw new Error(`Could not load Arcadians reference (${f.status})`);
    const r = await f.json();
    po = {};
    for (const s of ["title", "artist", "release_date", "isrc", "upc", "website", "my_songs_url", "epk_url", "cover_art_url", "source_url", "sections"])
      r[s] !== void 0 && r[s] !== null && (po[s] = r[s]);
    E0.value = r.bpm ?? "", T0.value = r.lyrics ?? "", N0.value = Array.isArray(r.lyric_timing) && r.lyric_timing.length ? JSON.stringify(r.lyric_timing, null, 2) : "", Oe(".known-info").open = !0, bo.textContent = r.lyric_timing?.length ? `Loaded ${r.title || "Arcadians"}: canonical release metadata, sections, ${r.bpm} BPM, lyrics and timing.` : `Loaded ${r.title || "Arcadians"} canonical reference metadata.`;
  } catch (f) {
    bo.textContent = f.message;
  }
}
S0.addEventListener("click", (c) => {
  c.stopPropagation(), Fu.click();
});
Fu.addEventListener("change", () => {
  O0(Fu.files?.[0]);
});
tn.addEventListener("click", (c) => {
  c.target !== S0 && !c.target.closest(".known-info") && Fu.click();
});
tn.addEventListener("keydown", (c) => {
  (c.key === "Enter" || c.key === " ") && Fu.click();
});
for (const c of ["dragenter", "dragover"]) tn.addEventListener(c, (f) => {
  f.preventDefault(), tn.classList.add("dragging");
});
for (const c of ["dragleave", "drop"]) tn.addEventListener(c, (f) => {
  f.preventDefault(), tn.classList.remove("dragging");
});
tn.addEventListener("drop", (c) => {
  O0(c.dataTransfer?.files?.[0]);
});
Mb?.addEventListener("click", z0);
Ob?.addEventListener("click", z0);
const fo = new URLSearchParams(location.search).get("hash");
fo && /^[0-9a-f]{64}$/i.test(fo) && M0(fo.toLowerCase(), "Existing analysis");
export {
  Ta as formatTimelineTime
};
