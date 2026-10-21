var uo = { exports: {} }, Qu = {};
var $h;
function Ey() {
  if ($h) return Qu;
  $h = 1;
  var i = /* @__PURE__ */ Symbol.for("react.transitional.element"), f = /* @__PURE__ */ Symbol.for("react.fragment");
  function r(s, m, h) {
    var y = null;
    if (h !== void 0 && (y = "" + h), m.key !== void 0 && (y = "" + m.key), "key" in m) {
      h = {};
      for (var S in m)
        S !== "key" && (h[S] = m[S]);
    } else h = m;
    return m = h.ref, {
      $$typeof: i,
      type: s,
      key: y,
      ref: m !== void 0 ? m : null,
      props: h
    };
  }
  return Qu.Fragment = f, Qu.jsx = r, Qu.jsxs = r, Qu;
}
var kh;
function Ty() {
  return kh || (kh = 1, uo.exports = Ey()), uo.exports;
}
var d = Ty(), io = { exports: {} }, ht = {};
var Fh;
function Ny() {
  if (Fh) return ht;
  Fh = 1;
  var i = /* @__PURE__ */ Symbol.for("react.transitional.element"), f = /* @__PURE__ */ Symbol.for("react.portal"), r = /* @__PURE__ */ Symbol.for("react.fragment"), s = /* @__PURE__ */ Symbol.for("react.strict_mode"), m = /* @__PURE__ */ Symbol.for("react.profiler"), h = /* @__PURE__ */ Symbol.for("react.consumer"), y = /* @__PURE__ */ Symbol.for("react.context"), S = /* @__PURE__ */ Symbol.for("react.forward_ref"), C = /* @__PURE__ */ Symbol.for("react.suspense"), z = /* @__PURE__ */ Symbol.for("react.memo"), E = /* @__PURE__ */ Symbol.for("react.lazy"), v = /* @__PURE__ */ Symbol.for("react.activity"), w = /* @__PURE__ */ Symbol.for("react.view_transition"), H = Symbol.iterator;
  function Z(b) {
    return b === null || typeof b != "object" ? null : (b = H && b[H] || b["@@iterator"], typeof b == "function" ? b : null);
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
  }, k = Object.assign, ot = {};
  function G(b, R, V) {
    this.props = b, this.context = R, this.refs = ot, this.updater = V || L;
  }
  G.prototype.isReactComponent = {}, G.prototype.setState = function(b, R) {
    if (typeof b != "object" && typeof b != "function" && b != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, b, R, "setState");
  }, G.prototype.forceUpdate = function(b) {
    this.updater.enqueueForceUpdate(this, b, "forceUpdate");
  };
  function Q() {
  }
  Q.prototype = G.prototype;
  function xt(b, R, V) {
    this.props = b, this.context = R, this.refs = ot, this.updater = V || L;
  }
  var st = xt.prototype = new Q();
  st.constructor = xt, k(st, G.prototype), st.isPureReactComponent = !0;
  var Dt = Array.isArray;
  function K() {
  }
  var mt = { H: null, A: null, T: null, S: null }, Jt = Object.prototype.hasOwnProperty;
  function Gt(b, R, V) {
    var I = V.ref;
    return {
      $$typeof: i,
      type: b,
      key: R,
      ref: I !== void 0 ? I : null,
      props: V
    };
  }
  function lt(b, R) {
    return Gt(b.type, R, b.props);
  }
  function rt(b) {
    return typeof b == "object" && b !== null && b.$$typeof === i;
  }
  function ct(b) {
    var R = { "=": "=0", ":": "=2" };
    return "$" + b.replace(/[=:]/g, function(V) {
      return R[V];
    });
  }
  var _t = /\/+/g;
  function Bt(b, R) {
    return typeof b == "object" && b !== null && b.key != null ? ct("" + b.key) : R.toString(36);
  }
  function q(b) {
    switch (b.status) {
      case "fulfilled":
        return b.value;
      case "rejected":
        throw b.reason;
      default:
        switch (typeof b.status == "string" ? b.then(K, K) : (b.status = "pending", b.then(
          function(R) {
            b.status === "pending" && (b.status = "fulfilled", b.value = R);
          },
          function(R) {
            b.status === "pending" && (b.status = "rejected", b.reason = R);
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
  function tt(b, R, V, I, yt) {
    var bt = typeof b;
    (bt === "undefined" || bt === "boolean") && (b = null);
    var vt = !1;
    if (b === null) vt = !0;
    else
      switch (bt) {
        case "bigint":
        case "string":
        case "number":
          vt = !0;
          break;
        case "object":
          switch (b.$$typeof) {
            case i:
            case f:
              vt = !0;
              break;
            case E:
              return vt = b._init, tt(
                vt(b._payload),
                R,
                V,
                I,
                yt
              );
          }
      }
    if (vt)
      return yt = yt(b), vt = I === "" ? "." + Bt(b, 0) : I, Dt(yt) ? (V = "", vt != null && (V = vt.replace(_t, "$&/") + "/"), tt(yt, R, V, "", function(ie) {
        return ie;
      })) : yt != null && (rt(yt) && (yt = lt(
        yt,
        V + (yt.key == null || b && b.key === yt.key ? "" : ("" + yt.key).replace(
          _t,
          "$&/"
        ) + "/") + vt
      )), R.push(yt)), 1;
    vt = 0;
    var J = I === "" ? "." : I + ":";
    if (Dt(b))
      for (var at = 0; at < b.length; at++)
        I = b[at], bt = J + Bt(I, at), vt += tt(
          I,
          R,
          V,
          bt,
          yt
        );
    else if (at = Z(b), typeof at == "function")
      for (b = at.call(b), at = 0; !(I = b.next()).done; )
        I = I.value, bt = J + Bt(I, at++), vt += tt(
          I,
          R,
          V,
          bt,
          yt
        );
    else if (bt === "object") {
      if (typeof b.then == "function")
        return tt(
          q(b),
          R,
          V,
          I,
          yt
        );
      throw R = String(b), Error(
        "Objects are not valid as a React child (found: " + (R === "[object Object]" ? "object with keys {" + Object.keys(b).join(", ") + "}" : R) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return vt;
  }
  function W(b, R, V) {
    if (b == null) return b;
    var I = [], yt = 0;
    return tt(b, I, "", "", function(bt) {
      return R.call(V, bt, yt++);
    }), I;
  }
  function gt(b) {
    if (b._status === -1) {
      var R = b._result, V = R();
      V.then(
        function(I) {
          (b._status === 0 || b._status === -1) && (b._status = 1, b._result = I, V.status === void 0 && (V.status = "fulfilled", V.value = I));
        },
        function(I) {
          (b._status === 0 || b._status === -1) && (b._status = 2, b._result = I, V.status === void 0 && (V.status = "rejected", V.reason = I));
        }
      ), b._status === -1 && (b._status = 0, b._result = V);
    }
    if (b._status === 1) return b._result.default;
    throw b._result;
  }
  var dt = typeof reportError == "function" ? reportError : function(b) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var R = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof b == "object" && b !== null && typeof b.message == "string" ? String(b.message) : String(b),
        error: b
      });
      if (!window.dispatchEvent(R)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", b);
      return;
    }
    console.error(b);
  };
  function jt(b) {
    var R = mt.T, V = {};
    V.types = R !== null ? R.types : null, mt.T = V;
    try {
      var I = b(), yt = mt.S;
      yt !== null && yt(V, I), typeof I == "object" && I !== null && typeof I.then == "function" && I.then(K, dt);
    } catch (bt) {
      dt(bt);
    } finally {
      R !== null && V.types !== null && (R.types = V.types), mt.T = R;
    }
  }
  function wt(b) {
    var R = mt.T;
    if (R !== null) {
      var V = R.types;
      V === null ? R.types = [b] : V.indexOf(b) === -1 && V.push(b);
    } else jt(wt.bind(null, b));
  }
  var F = {
    map: W,
    forEach: function(b, R, V) {
      W(
        b,
        function() {
          R.apply(this, arguments);
        },
        V
      );
    },
    count: function(b) {
      var R = 0;
      return W(b, function() {
        R++;
      }), R;
    },
    toArray: function(b) {
      return W(b, function(R) {
        return R;
      }) || [];
    },
    only: function(b) {
      if (!rt(b))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return b;
    }
  };
  return ht.Activity = v, ht.Children = F, ht.Component = G, ht.Fragment = r, ht.Profiler = m, ht.PureComponent = xt, ht.StrictMode = s, ht.Suspense = C, ht.ViewTransition = w, ht.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = mt, ht.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(b) {
      return mt.H.useMemoCache(b);
    }
  }, ht.addTransitionType = wt, ht.cache = function(b) {
    return function() {
      return b.apply(null, arguments);
    };
  }, ht.cacheSignal = function() {
    return null;
  }, ht.cloneElement = function(b, R, V) {
    if (b == null)
      throw Error(
        "The argument must be a React element, but you passed " + b + "."
      );
    var I = k({}, b.props), yt = b.key;
    if (R != null)
      for (bt in R.key !== void 0 && (yt = "" + R.key), R)
        !Jt.call(R, bt) || bt === "key" || bt === "__self" || bt === "__source" || bt === "ref" && R.ref === void 0 || (I[bt] = R[bt]);
    var bt = arguments.length - 2;
    if (bt === 1) I.children = V;
    else if (1 < bt) {
      for (var vt = Array(bt), J = 0; J < bt; J++)
        vt[J] = arguments[J + 2];
      I.children = vt;
    }
    return Gt(b.type, yt, I);
  }, ht.createContext = function(b) {
    return b = {
      $$typeof: y,
      _currentValue: b,
      _currentValue2: b,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, b.Provider = b, b.Consumer = {
      $$typeof: h,
      _context: b
    }, b;
  }, ht.createElement = function(b, R, V) {
    var I, yt = {}, bt = null;
    if (R != null)
      for (I in R.key !== void 0 && (bt = "" + R.key), R)
        Jt.call(R, I) && I !== "key" && I !== "__self" && I !== "__source" && (yt[I] = R[I]);
    var vt = arguments.length - 2;
    if (vt === 1) yt.children = V;
    else if (1 < vt) {
      for (var J = Array(vt), at = 0; at < vt; at++)
        J[at] = arguments[at + 2];
      yt.children = J;
    }
    if (b && b.defaultProps)
      for (I in vt = b.defaultProps, vt)
        yt[I] === void 0 && (yt[I] = vt[I]);
    return Gt(b, bt, yt);
  }, ht.createRef = function() {
    return { current: null };
  }, ht.forwardRef = function(b) {
    return { $$typeof: S, render: b };
  }, ht.isValidElement = rt, ht.lazy = function(b) {
    return {
      $$typeof: E,
      _payload: { _status: -1, _result: b },
      _init: gt
    };
  }, ht.memo = function(b, R) {
    return {
      $$typeof: z,
      type: b,
      compare: R === void 0 ? null : R
    };
  }, ht.startTransition = jt, ht.unstable_useCacheRefresh = function() {
    return mt.H.useCacheRefresh();
  }, ht.use = function(b) {
    return mt.H.use(b);
  }, ht.useActionState = function(b, R, V) {
    return mt.H.useActionState(b, R, V);
  }, ht.useCallback = function(b, R) {
    return mt.H.useCallback(b, R);
  }, ht.useContext = function(b) {
    return mt.H.useContext(b);
  }, ht.useDebugValue = function() {
  }, ht.useDeferredValue = function(b, R) {
    return mt.H.useDeferredValue(b, R);
  }, ht.useEffect = function(b, R) {
    return mt.H.useEffect(b, R);
  }, ht.useEffectEvent = function(b) {
    return mt.H.useEffectEvent(b);
  }, ht.useId = function() {
    return mt.H.useId();
  }, ht.useImperativeHandle = function(b, R, V) {
    return mt.H.useImperativeHandle(b, R, V);
  }, ht.useInsertionEffect = function(b, R) {
    return mt.H.useInsertionEffect(b, R);
  }, ht.useLayoutEffect = function(b, R) {
    return mt.H.useLayoutEffect(b, R);
  }, ht.useMemo = function(b, R) {
    return mt.H.useMemo(b, R);
  }, ht.useOptimistic = function(b, R) {
    return mt.H.useOptimistic(b, R);
  }, ht.useReducer = function(b, R, V) {
    return mt.H.useReducer(b, R, V);
  }, ht.useRef = function(b) {
    return mt.H.useRef(b);
  }, ht.useState = function(b) {
    return mt.H.useState(b);
  }, ht.useSyncExternalStore = function(b, R, V) {
    return mt.H.useSyncExternalStore(
      b,
      R,
      V
    );
  }, ht.useTransition = function() {
    return mt.H.useTransition();
  }, ht.version = "19.3.0", ht;
}
var Wh;
function To() {
  return Wh || (Wh = 1, io.exports = Ny()), io.exports;
}
var D = To(), co = { exports: {} }, Zu = {}, so = { exports: {} }, ro = {};
var Ih;
function xy() {
  return Ih || (Ih = 1, (function(i) {
    function f(q, tt) {
      var W = q.length;
      q.push(tt);
      t: for (; 0 < W; ) {
        var gt = W - 1 >>> 1, dt = q[gt];
        if (0 < m(dt, tt))
          q[gt] = tt, q[W] = dt, W = gt;
        else break t;
      }
    }
    function r(q) {
      return q.length === 0 ? null : q[0];
    }
    function s(q) {
      if (q.length === 0) return null;
      var tt = q[0], W = q.pop();
      if (W !== tt) {
        q[0] = W;
        t: for (var gt = 0, dt = q.length, jt = dt >>> 1; gt < jt; ) {
          var wt = 2 * (gt + 1) - 1, F = q[wt], b = wt + 1, R = q[b];
          if (0 > m(F, W))
            b < dt && 0 > m(R, F) ? (q[gt] = R, q[b] = W, gt = b) : (q[gt] = F, q[wt] = W, gt = wt);
          else if (b < dt && 0 > m(R, W))
            q[gt] = R, q[b] = W, gt = b;
          else break t;
        }
      }
      return tt;
    }
    function m(q, tt) {
      var W = q.sortIndex - tt.sortIndex;
      return W !== 0 ? W : q.id - tt.id;
    }
    if (i.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var h = performance;
      i.unstable_now = function() {
        return h.now();
      };
    } else {
      var y = Date, S = y.now();
      i.unstable_now = function() {
        return y.now() - S;
      };
    }
    var C = [], z = [], E = 1, v = null, w = 3, H = !1, Z = !1, L = !1, k = !1, ot = typeof setTimeout == "function" ? setTimeout : null, G = typeof clearTimeout == "function" ? clearTimeout : null, Q = typeof setImmediate < "u" ? setImmediate : null;
    function xt(q) {
      for (var tt = r(z); tt !== null; ) {
        if (tt.callback === null) s(z);
        else if (tt.startTime <= q)
          s(z), tt.sortIndex = tt.expirationTime, f(C, tt);
        else break;
        tt = r(z);
      }
    }
    function st(q) {
      if (L = !1, xt(q), !Z)
        if (r(C) !== null)
          Z = !0, Dt || (Dt = !0, rt());
        else {
          var tt = r(z);
          tt !== null && Bt(st, tt.startTime - q);
        }
    }
    var Dt = !1, K = -1, mt = 5, Jt = -1;
    function Gt() {
      return k ? !0 : !(i.unstable_now() - Jt < mt);
    }
    function lt() {
      if (k = !1, Dt) {
        var q = i.unstable_now();
        Jt = q;
        var tt = !0;
        try {
          t: {
            Z = !1, L && (L = !1, G(K), K = -1), H = !0;
            var W = w;
            try {
              e: {
                for (xt(q), v = r(C); v !== null && !(v.expirationTime > q && Gt()); ) {
                  var gt = v.callback;
                  if (typeof gt == "function") {
                    v.callback = null, w = v.priorityLevel;
                    var dt = gt(
                      v.expirationTime <= q
                    );
                    if (q = i.unstable_now(), typeof dt == "function") {
                      v.callback = dt, xt(q), tt = !0;
                      break e;
                    }
                    v === r(C) && s(C), xt(q);
                  } else s(C);
                  v = r(C);
                }
                if (v !== null) tt = !0;
                else {
                  var jt = r(z);
                  jt !== null && Bt(
                    st,
                    jt.startTime - q
                  ), tt = !1;
                }
              }
              break t;
            } finally {
              v = null, w = W, H = !1;
            }
            tt = void 0;
          }
        } finally {
          tt ? rt() : Dt = !1;
        }
      }
    }
    var rt;
    if (typeof Q == "function")
      rt = function() {
        Q(lt);
      };
    else if (typeof MessageChannel < "u") {
      var ct = new MessageChannel(), _t = ct.port2;
      ct.port1.onmessage = lt, rt = function() {
        _t.postMessage(null);
      };
    } else
      rt = function() {
        ot(lt, 0);
      };
    function Bt(q, tt) {
      K = ot(function() {
        q(i.unstable_now());
      }, tt);
    }
    i.unstable_IdlePriority = 5, i.unstable_ImmediatePriority = 1, i.unstable_LowPriority = 4, i.unstable_NormalPriority = 3, i.unstable_Profiling = null, i.unstable_UserBlockingPriority = 2, i.unstable_cancelCallback = function(q) {
      q.callback = null;
    }, i.unstable_forceFrameRate = function(q) {
      0 > q || 125 < q ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : mt = 0 < q ? Math.floor(1e3 / q) : 5;
    }, i.unstable_getCurrentPriorityLevel = function() {
      return w;
    }, i.unstable_next = function(q) {
      switch (w) {
        case 1:
        case 2:
        case 3:
          var tt = 3;
          break;
        default:
          tt = w;
      }
      var W = w;
      w = tt;
      try {
        return q();
      } finally {
        w = W;
      }
    }, i.unstable_requestPaint = function() {
      k = !0;
    }, i.unstable_runWithPriority = function(q, tt) {
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
      var W = w;
      w = q;
      try {
        return tt();
      } finally {
        w = W;
      }
    }, i.unstable_scheduleCallback = function(q, tt, W) {
      var gt = i.unstable_now();
      switch (typeof W == "object" && W !== null ? (W = W.delay, W = typeof W == "number" && 0 < W ? gt + W : gt) : W = gt, q) {
        case 1:
          var dt = -1;
          break;
        case 2:
          dt = 250;
          break;
        case 5:
          dt = 1073741823;
          break;
        case 4:
          dt = 1e4;
          break;
        default:
          dt = 5e3;
      }
      return dt = W + dt, q = {
        id: E++,
        callback: tt,
        priorityLevel: q,
        startTime: W,
        expirationTime: dt,
        sortIndex: -1
      }, W > gt ? (q.sortIndex = W, f(z, q), r(C) === null && q === r(z) && (L ? (G(K), K = -1) : L = !0, Bt(st, W - gt))) : (q.sortIndex = dt, f(C, q), Z || H || (Z = !0, Dt || (Dt = !0, rt()))), q;
    }, i.unstable_shouldYield = Gt, i.unstable_wrapCallback = function(q) {
      var tt = w;
      return function() {
        var W = w;
        w = tt;
        try {
          return q.apply(this, arguments);
        } finally {
          w = W;
        }
      };
    };
  })(ro)), ro;
}
var Ph;
function My() {
  return Ph || (Ph = 1, so.exports = xy()), so.exports;
}
var oo = { exports: {} }, ze = {};
var t0;
function Oy() {
  if (t0) return ze;
  t0 = 1;
  var i = To();
  function f(E) {
    var v = "https://react.dev/errors/" + E;
    if (1 < arguments.length) {
      v += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var w = 2; w < arguments.length; w++)
        v += "&args[]=" + encodeURIComponent(arguments[w]);
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
  }, m = /* @__PURE__ */ Symbol.for("react.portal"), h = /* @__PURE__ */ Symbol.for("react.recoverable"), y = /* @__PURE__ */ Symbol.for("react.optimistic_key");
  function S(E, v, w) {
    var H = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: m,
      key: H == null ? null : H === y ? y : "" + H,
      children: E,
      containerInfo: v,
      implementation: w
    };
  }
  var C = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function z(E, v) {
    if (E === "font") return "";
    if (typeof v == "string")
      return v === "use-credentials" ? v : "";
  }
  return ze.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, ze.browser = function(E) {
    return { $$typeof: h, _reason: E };
  }, ze.createPortal = function(E, v) {
    var w = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!v || v.nodeType !== 1 && v.nodeType !== 9 && v.nodeType !== 11)
      throw Error(f(299));
    return S(E, v, null, w);
  }, ze.flushSync = function(E) {
    var v = C.T, w = s.p;
    try {
      if (C.T = null, s.p = 2, E) return E();
    } finally {
      C.T = v, s.p = w, s.d.f();
    }
  }, ze.preconnect = function(E, v) {
    typeof E == "string" && (v ? (v = v.crossOrigin, v = typeof v == "string" ? v === "use-credentials" ? v : "" : void 0) : v = null, s.d.C(E, v));
  }, ze.prefetchDNS = function(E) {
    typeof E == "string" && s.d.D(E);
  }, ze.preinit = function(E, v) {
    if (typeof E == "string" && v && typeof v.as == "string") {
      var w = v.as, H = z(w, v.crossOrigin), Z = typeof v.integrity == "string" ? v.integrity : void 0, L = typeof v.fetchPriority == "string" ? v.fetchPriority : void 0;
      w === "style" ? s.d.S(
        E,
        typeof v.precedence == "string" ? v.precedence : void 0,
        {
          crossOrigin: H,
          integrity: Z,
          fetchPriority: L
        }
      ) : w === "script" && s.d.X(E, {
        crossOrigin: H,
        integrity: Z,
        fetchPriority: L,
        nonce: typeof v.nonce == "string" ? v.nonce : void 0
      });
    }
  }, ze.preinitModule = function(E, v) {
    if (typeof E == "string")
      if (typeof v == "object" && v !== null) {
        if (v.as == null || v.as === "script") {
          var w = z(
            v.as,
            v.crossOrigin
          );
          s.d.M(E, {
            crossOrigin: w,
            integrity: typeof v.integrity == "string" ? v.integrity : void 0,
            nonce: typeof v.nonce == "string" ? v.nonce : void 0,
            fetchPriority: typeof v.fetchPriority == "string" ? v.fetchPriority : void 0
          });
        }
      } else v == null && s.d.M(E);
  }, ze.preload = function(E, v) {
    if (typeof E == "string" && typeof v == "object" && v !== null && typeof v.as == "string") {
      var w = v.as, H = z(w, v.crossOrigin);
      s.d.L(E, w, {
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
  }, ze.preloadModule = function(E, v) {
    if (typeof E == "string")
      if (v) {
        var w = z(v.as, v.crossOrigin);
        s.d.m(E, {
          as: typeof v.as == "string" && v.as !== "script" ? v.as : void 0,
          crossOrigin: w,
          integrity: typeof v.integrity == "string" ? v.integrity : void 0,
          nonce: typeof v.nonce == "string" ? v.nonce : void 0,
          fetchPriority: typeof v.fetchPriority == "string" ? v.fetchPriority : void 0
        });
      } else s.d.m(E);
  }, ze.requestFormReset = function(E) {
    s.d.r(E);
  }, ze.unstable_batchedUpdates = function(E, v) {
    return E(v);
  }, ze.useFormState = function(E, v, w) {
    return C.H.useFormState(E, v, w);
  }, ze.useFormStatus = function() {
    return C.H.useHostTransitionStatus();
  }, ze.version = "19.3.0", ze;
}
var e0;
function zy() {
  if (e0) return oo.exports;
  e0 = 1;
  function i() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i);
      } catch (f) {
        console.error(f);
      }
  }
  return i(), oo.exports = Oy(), oo.exports;
}
var l0;
function Ay() {
  if (l0) return Zu;
  l0 = 1;
  var i = My(), f = To(), r = zy();
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
  function y(t) {
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
  function z(t) {
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
        for (var c = !1, o = n.child; o; ) {
          if (o === l) {
            c = !0, l = n, a = u;
            break;
          }
          if (o === a) {
            c = !0, a = n, l = u;
            break;
          }
          o = o.sibling;
        }
        if (!c) {
          for (o = u.child; o; ) {
            if (o === l) {
              c = !0, l = u, a = n;
              break;
            }
            if (o === a) {
              c = !0, a = u, l = n;
              break;
            }
            o = o.sibling;
          }
          if (!c) throw Error(s(189));
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
  function w(t) {
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
  function Z(t) {
    var e = [null, null], l = w(t);
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
  var ot = null, G = null;
  function Q(t, e, l) {
    return t === l ? !0 : t === e ? (ot = t, !0) : !1;
  }
  function xt(t, e, l) {
    return t === l ? (G = t, !1) : t === e ? (G !== null && (ot = t), !0) : !1;
  }
  function st(t) {
    if (t === null) return null;
    do
      t = t === null ? null : t.return;
    while (t && t.tag !== 5 && t.tag !== 27 && t.tag !== 3);
    return t || null;
  }
  function Dt(t, e, l) {
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
  var K = Object.assign, mt = /* @__PURE__ */ Symbol.for("react.element"), Jt = /* @__PURE__ */ Symbol.for("react.transitional.element"), Gt = /* @__PURE__ */ Symbol.for("react.portal"), lt = /* @__PURE__ */ Symbol.for("react.fragment"), rt = /* @__PURE__ */ Symbol.for("react.strict_mode"), ct = /* @__PURE__ */ Symbol.for("react.profiler"), _t = /* @__PURE__ */ Symbol.for("react.consumer"), Bt = /* @__PURE__ */ Symbol.for("react.context"), q = /* @__PURE__ */ Symbol.for("react.forward_ref"), tt = /* @__PURE__ */ Symbol.for("react.suspense"), W = /* @__PURE__ */ Symbol.for("react.suspense_list"), gt = /* @__PURE__ */ Symbol.for("react.memo"), dt = /* @__PURE__ */ Symbol.for("react.lazy"), jt = /* @__PURE__ */ Symbol.for("react.activity"), wt = /* @__PURE__ */ Symbol.for("react.legacy_hidden"), F = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), b = /* @__PURE__ */ Symbol.for("react.view_transition"), R = /* @__PURE__ */ Symbol.for("react.recoverable"), V = Symbol.iterator;
  function I(t) {
    return t === null || typeof t != "object" ? null : (t = V && t[V] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var yt = /* @__PURE__ */ Symbol.for("react.client.reference");
  function bt(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === yt ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case lt:
        return "Fragment";
      case ct:
        return "Profiler";
      case rt:
        return "StrictMode";
      case tt:
        return "Suspense";
      case W:
        return "SuspenseList";
      case jt:
        return "Activity";
      case b:
        return "ViewTransition";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case Gt:
          return "Portal";
        case Bt:
          return t.displayName || "Context";
        case _t:
          return (t._context.displayName || "Context") + ".Consumer";
        case q:
          var e = t.render;
          return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case gt:
          return e = t.displayName || null, e !== null ? e : bt(t.type) || "Memo";
        case dt:
          e = t._payload, t = t._init;
          try {
            return bt(t(e));
          } catch {
          }
      }
    return null;
  }
  var vt = Array.isArray, J = f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, at = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ie = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, Se = [], Ft = -1;
  function ne(t) {
    return { current: t };
  }
  function Ht(t) {
    0 > Ft || (t.current = Se[Ft], Se[Ft] = null, Ft--);
  }
  function Et(t, e) {
    Ft++, Se[Ft] = t.current, t.current = e;
  }
  var Y = ne(null), et = ne(null), Mt = ne(null), me = ne(null);
  function ce(t, e) {
    switch (Et(Mt, e), Et(et, t), Et(Y, null), e.nodeType) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? ah(t) : 0;
        break;
      default:
        if (t = e.tagName, e = e.namespaceURI)
          e = ah(e), t = nh(e, t);
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
    Ht(Y), Et(Y, t);
  }
  function Ut() {
    Ht(Y), Ht(et), Ht(Mt);
  }
  function Jl(t) {
    var e = t.memoizedState;
    e !== null && (Kn._currentValue = e.memoizedState, Et(me, t)), e = Y.current;
    var l = nh(e, t.type);
    e !== l && (Et(et, t), Et(Y, l));
  }
  function $l(t) {
    et.current === t && (Ht(Y), Ht(et)), me.current === t && (Ht(me), Kn._currentValue = ie);
  }
  var Al, Ma;
  function Ae(t) {
    if (Al === void 0)
      try {
        throw Error();
      } catch (l) {
        var e = l.stack.trim().match(/\n( *(at )?)/);
        Al = e && e[1] || "", Ma = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Al + t + Ma;
  }
  var Oa = !1;
  function Cl(t, e) {
    if (!t || Oa) return "";
    Oa = !0;
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
                } catch (X) {
                  var _ = X;
                }
                Reflect.construct(t, [], B);
              } else {
                try {
                  B.call();
                } catch (X) {
                  _ = X;
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
              } catch (X) {
                _ = X;
              }
              (B = t()) && typeof B.catch == "function" && B.catch(function() {
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
      var u = a.DetermineComponentFrameRoot(), c = u[0], o = u[1];
      if (c && o) {
        var g = c.split(`
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
                  var A = `
` + g[a].replace(" at new ", " at ");
                  return t.displayName && A.includes("<anonymous>") && (A = A.replace("<anonymous>", t.displayName)), A;
                }
              while (1 <= a && 0 <= n);
            break;
          }
      }
    } finally {
      Oa = !1, Error.prepareStackTrace = l;
    }
    return (l = t ? t.displayName || t.name : "") ? Ae(l) : "";
  }
  function Wn(t, e) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Ae(t.type);
      case 16:
        return Ae("Lazy");
      case 13:
        return t.child !== e && e !== null ? Ae("Suspense Fallback") : Ae("Suspense");
      case 19:
        return Ae("SuspenseList");
      case 0:
      case 15:
        return Cl(t.type, !1);
      case 11:
        return Cl(t.type.render, !1);
      case 1:
        return Cl(t.type, !0);
      case 31:
        return Ae("Activity");
      case 30:
        return Ae("ViewTransition");
      default:
        return "";
    }
  }
  function nn(t) {
    try {
      var e = "", l = null;
      do
        e += Wn(t, l), l = t, t = t.return;
      while (t);
      return e;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var j = Object.prototype.hasOwnProperty, ut = i.unstable_scheduleCallback, Nt = i.unstable_cancelCallback, he = i.unstable_shouldYield, ve = i.unstable_requestPaint, Yt = i.unstable_now, we = i.unstable_getCurrentPriorityLevel, _e = i.unstable_ImmediatePriority, M = i.unstable_UserBlockingPriority, nt = i.unstable_NormalPriority, Vt = i.unstable_LowPriority, ee = i.unstable_IdlePriority, za = i.log, Aa = i.unstable_setDisableYieldValue, jl = null, Ve = null;
  function kl(t) {
    if (typeof za == "function" && Aa(t), Ve && typeof Ve.setStrictMode == "function")
      try {
        Ve.setStrictMode(jl, t);
      } catch {
      }
  }
  var Qe = Math.clz32 ? Math.clz32 : U0, R0 = Math.log, D0 = Math.LN2;
  function U0(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (R0(t) / D0 | 0) | 0;
  }
  var Iu = 256, Pu = 262144, ti = 4194304;
  function Ca(t) {
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
  function ei(t, e, l) {
    var a = t.pendingLanes;
    if (a === 0) return 0;
    var n = 0, u = t.suspendedLanes, c = t.pingedLanes;
    t = t.warmLanes;
    var o = a & 134217727;
    return o !== 0 ? (a = o & ~u, a !== 0 ? n = Ca(a) : (c &= o, c !== 0 ? n = Ca(c) : l || (l = o & ~t, l !== 0 && (n = Ca(l))))) : (o = a & ~u, o !== 0 ? n = Ca(o) : c !== 0 ? n = Ca(c) : l || (l = a & ~t, l !== 0 && (n = Ca(l)))), n === 0 ? 0 : e !== 0 && e !== n && (e & u) === 0 && (u = n & -n, l = e & -e, u >= l || u === 32 && (l & 4194048) !== 0) ? e : n;
  }
  function In(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function zo(t, e) {
    (e & 8) !== 0 && (e |= e & 32);
    var l = t.entangledLanes;
    if (l !== 0)
      for (t = t.entanglements, l &= e; 0 < l; ) {
        var a = 31 - Qe(l), n = 1 << a;
        e |= t[a], l &= ~n;
      }
    return e;
  }
  function B0(t, e) {
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
  function Ao() {
    var t = ti;
    return ti <<= 1, (ti & 62914560) === 0 && (ti = 4194304), t;
  }
  function wc(t) {
    for (var e = [], l = 0; 31 > l; l++) e.push(t);
    return e;
  }
  function Pn(t, e) {
    t.pendingLanes |= e, e !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function H0(t, e, l, a, n, u) {
    var c = t.pendingLanes;
    t.pendingLanes = l, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= l, t.entangledLanes &= l, t.errorRecoveryDisabledLanes &= l, t.shellSuspendCounter = 0;
    var o = t.entanglements, g = t.expirationTimes, N = t.hiddenUpdates;
    for (l = c & ~l; 0 < l; ) {
      var A = 31 - Qe(l), B = 1 << A;
      o[A] = 0, g[A] = -1;
      var _ = N[A];
      if (_ !== null)
        for (N[A] = null, A = 0; A < _.length; A++) {
          var O = _[A];
          O !== null && (O.lane &= -536870913);
        }
      l &= ~B;
    }
    a !== 0 && Co(t, a, 0), u !== 0 && n === 0 && t.tag !== 0 && (t.suspendedLanes |= u & ~(c & ~e));
  }
  function Co(t, e, l) {
    t.pendingLanes |= e, t.suspendedLanes &= ~e;
    var a = 31 - Qe(e);
    t.entangledLanes |= e, t.entanglements[a] = t.entanglements[a] | 1073741824 | l & 261930;
  }
  function jo(t, e) {
    var l = t.entangledLanes |= e;
    for (t = t.entanglements; l; ) {
      var a = 31 - Qe(l), n = 1 << a;
      n & e | t[a] & e && (t[a] |= e), l &= ~n;
    }
  }
  function wo(t, e) {
    var l = e & -e;
    return l = (l & 42) !== 0 ? 1 : Rc(l), (l & (t.suspendedLanes | e)) !== 0 ? 0 : l;
  }
  function Rc(t) {
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
  function Dc(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Ro() {
    var t = at.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : Gh(t.type));
  }
  function Do(t, e) {
    var l = at.p;
    try {
      return at.p = t, e();
    } finally {
      at.p = l;
    }
  }
  var wl = Math.random().toString(36).slice(2), Ee = "__reactFiber$" + wl, He = "__reactProps$" + wl, un = "__reactContainer$" + wl, Uo = "__reactEvents$" + wl, L0 = "__reactListeners$" + wl, Y0 = "__reactHandles$" + wl, Bo = "__reactResources$" + wl, tu = "__reactMarker$" + wl, li = "__reactLoad$" + wl;
  function ai(t) {
    delete t[Ee], delete t[He], delete t[L0], delete t[Y0];
  }
  function ja(t) {
    var e;
    if (e = t[Ee]) return e;
    for (var l = t.parentNode; l; ) {
      if (e = l[un] || l[Ee]) {
        if (l = e.alternate, e.child !== null || l !== null && l.child !== null)
          for (t = _h(t); t !== null; ) {
            if (l = t[Ee]) return l;
            t = _h(t);
          }
        return e;
      }
      t = l, l = t.parentNode;
    }
    return null;
  }
  function cn(t) {
    if (t = t[Ee] || t[un]) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3)
        return t;
    }
    return null;
  }
  function eu(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(s(33));
  }
  function sn(t) {
    var e = t[Bo];
    return e || (e = t[Bo] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), e;
  }
  function ge(t) {
    t[tu] = !0;
  }
  function Ho(t) {
    t[li] = void 0;
  }
  var Lo = /* @__PURE__ */ new Set(), Yo = {};
  function wa(t, e) {
    rn(t, e), rn(t + "Capture", e);
  }
  function rn(t, e) {
    for (Yo[t] = e, t = 0; t < e.length; t++)
      Lo.add(e[t]);
  }
  var q0 = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), qo = {}, Go = {};
  function G0(t) {
    return j.call(Go, t) ? !0 : j.call(qo, t) ? !1 : q0.test(t) ? Go[t] = !0 : (qo[t] = !0, !1);
  }
  var Lt = !1;
  function Xo() {
    var t = Lt;
    return Lt = !1, t;
  }
  function ni(t, e, l) {
    if (G0(e))
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
  function ui(t, e, l) {
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
  function Vo(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
  }
  function X0(t, e, l) {
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
        set: function(c) {
          l = "" + c, u.call(this, c);
        }
      }), Object.defineProperty(t, e, {
        enumerable: a.enumerable
      }), {
        getValue: function() {
          return l;
        },
        setValue: function(c) {
          l = "" + c;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[e];
        }
      };
    }
  }
  function Uc(t) {
    if (!t._valueTracker) {
      var e = Vo(t) ? "checked" : "value";
      t._valueTracker = X0(
        t,
        e,
        "" + t[e]
      );
    }
  }
  function Qo(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var l = e.getValue(), a = "";
    return t && (a = Vo(t) ? t.checked ? "true" : "false" : t.value), t = a, t !== l ? (e.setValue(t), !0) : !1;
  }
  var V0 = /[\n"\\]/g;
  function tl(t) {
    return t.replace(
      V0,
      function(e) {
        return "\\" + e.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Bc(t, e, l, a, n, u, c, o) {
    t.name = "", c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? t.type = c : t.removeAttribute("type"), e != null ? c === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + Ze(e)) : t.value !== "" + Ze(e) && (t.value = "" + Ze(e)) : c !== "submit" && c !== "reset" || t.removeAttribute("value"), e != null ? c === "number" && t.value == e ? Hc(t, Ze(t.value)) : Hc(t, Ze(e)) : l != null ? Hc(t, Ze(l)) : a != null && t.removeAttribute("value"), n == null && u != null && (t.defaultChecked = !!u), n != null && (t.checked = n && typeof n != "function" && typeof n != "symbol"), o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? t.name = "" + Ze(o) : t.removeAttribute("name");
  }
  function Zo(t, e, l, a, n, u, c, o) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (t.type = u), e != null || l != null) {
      if (!(u !== "submit" && u !== "reset" || e != null)) {
        Uc(t);
        return;
      }
      l = l != null ? "" + Ze(l) : "", e = e != null ? "" + Ze(e) : l, o || e === t.value || (t.value = e), t.defaultValue = e;
    }
    a = a ?? n, a = typeof a != "function" && typeof a != "symbol" && !!a, t.checked = o ? t.checked : !!a, t.defaultChecked = !!a, c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" && (t.name = c), Uc(t);
  }
  function Hc(t, e) {
    t.defaultValue !== "" + e && (t.defaultValue = "" + e);
  }
  function on(t, e, l, a) {
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
  function Ko(t, e, l) {
    if (e != null && (e = "" + Ze(e), e !== t.value && (t.value = e), l == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = l != null ? "" + Ze(l) : "";
  }
  function Jo(t, e, l, a) {
    if (e == null) {
      if (a != null) {
        if (l != null) throw Error(s(92));
        if (vt(a)) {
          if (1 < a.length) throw Error(s(93));
          a = a[0];
        }
        l = a;
      }
      l == null && (l = ""), e = l;
    }
    l = Ze(e), t.defaultValue = l, a = t.textContent, a === l && a !== "" && a !== null && (t.value = a), Uc(t);
  }
  function fn(t, e) {
    if (e) {
      var l = t.firstChild;
      if (l && l === t.lastChild && l.nodeType === 3) {
        l.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var Q0 = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function $o(t, e, l) {
    var a = e.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? a ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "" : a ? t.setProperty(e, l) : typeof l != "number" || l === 0 || Q0.has(e) ? e === "float" ? t.cssFloat = l : t[e] = ("" + l).trim() : t[e] = l + "px";
  }
  function ko(t, e, l) {
    if (e != null && typeof e != "object")
      throw Error(s(62));
    if (t = t.style, l != null) {
      for (var a in l)
        !l.hasOwnProperty(a) || e != null && e.hasOwnProperty(a) || (a.indexOf("--") === 0 ? t.setProperty(a, "") : a === "float" ? t.cssFloat = "" : t[a] = "", Lt = !0);
      for (var n in e)
        a = e[n], e.hasOwnProperty(n) && l[n] !== a && ($o(t, n, a), Lt = !0);
    } else
      for (var u in e)
        e.hasOwnProperty(u) && $o(t, u, e[u]);
  }
  function Lc(t) {
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
  var Z0 = /* @__PURE__ */ new Map([
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
  ]), K0 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function ii(t) {
    return K0.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function yl() {
  }
  var Yc = null;
  function qc(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var dn = null, mn = null;
  function Fo(t) {
    var e = cn(t);
    if (e && (t = e.stateNode)) {
      var l = t[He] || null;
      t: switch (t = e.stateNode, e.type) {
        case "input":
          if (Bc(
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
              'input[name="' + tl(
                "" + e
              ) + '"][type="radio"]'
            ), e = 0; e < l.length; e++) {
              var a = l[e];
              if (a !== t && a.form === t.form) {
                var n = a[He] || null;
                if (!n) throw Error(s(90));
                Bc(
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
              a = l[e], a.form === t.form && Qo(a);
          }
          break t;
        case "textarea":
          Ko(t, l.value, l.defaultValue);
          break t;
        case "select":
          e = l.value, e != null && on(t, !!l.multiple, e, !1);
      }
    }
  }
  var Gc = !1;
  function Wo(t, e, l) {
    if (Gc) return t(e, l);
    Gc = !0;
    try {
      var a = t(e);
      return a;
    } finally {
      if (Gc = !1, (dn !== null || mn !== null) && (ic(), dn && (e = dn, t = mn, mn = dn = null, Fo(e), t)))
        for (e = 0; e < t.length; e++) Fo(t[e]);
    }
  }
  function lu(t, e) {
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
  var Dl = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Xc = !1;
  if (Dl)
    try {
      var au = {};
      Object.defineProperty(au, "passive", {
        get: function() {
          Xc = !0;
        }
      }), window.addEventListener("test", au, au), window.removeEventListener("test", au, au);
    } catch {
      Xc = !1;
    }
  var Fl = null, Vc = null, ci = null;
  function Io() {
    if (ci) return ci;
    var t, e = Vc, l = e.length, a, n = "value" in Fl ? Fl.value : Fl.textContent, u = n.length;
    for (t = 0; t < l && e[t] === n[t]; t++) ;
    var c = l - t;
    for (a = 1; a <= c && e[l - a] === n[u - a]; a++) ;
    return ci = n.slice(t, 1 < a ? 1 - a : void 0);
  }
  function si(t) {
    var e = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function ri() {
    return !0;
  }
  function Po() {
    return !1;
  }
  function Re(t) {
    function e(l, a, n, u, c) {
      this._reactName = l, this._targetInst = n, this.type = a, this.nativeEvent = u, this.target = c, this.currentTarget = null;
      for (var o in t)
        t.hasOwnProperty(o) && (l = t[o], this[o] = l ? l(u) : u[o]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? ri : Po, this.isPropagationStopped = Po, this;
    }
    return K(e.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = ri);
      },
      stopPropagation: function() {
        var l = this.nativeEvent;
        l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = ri);
      },
      persist: function() {
      },
      isPersistent: ri
    }), e;
  }
  var Wl = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, oi = Re(Wl), nu = K({}, Wl, { view: 0, detail: 0 }), J0 = Re(nu), Qc, Zc, uu, fi = K({}, nu, {
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
    getModifierState: Jc,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== uu && (uu && t.type === "mousemove" ? (Qc = t.screenX - uu.screenX, Zc = t.screenY - uu.screenY) : Zc = Qc = 0, uu = t), Qc);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : Zc;
    }
  }), tf = Re(fi), $0 = K({}, fi, { dataTransfer: 0 }), k0 = Re($0), F0 = K({}, nu, { relatedTarget: 0 }), Kc = Re(F0), W0 = K({}, Wl, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), I0 = Re(W0), P0 = K({}, Wl, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), tv = Re(P0), ev = K({}, Wl, { data: 0 }), ef = Re(ev), lv = {
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
  }, av = {
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
  }, nv = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function uv(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = nv[t]) ? !!e[t] : !1;
  }
  function Jc() {
    return uv;
  }
  var iv = K({}, nu, {
    key: function(t) {
      if (t.key) {
        var e = lv[t.key] || t.key;
        if (e !== "Unidentified") return e;
      }
      return t.type === "keypress" ? (t = si(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? av[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Jc,
    charCode: function(t) {
      return t.type === "keypress" ? si(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? si(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), cv = Re(iv), sv = K({}, fi, {
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
  }), lf = Re(sv), rv = K({}, Wl, { submitter: 0 }), ov = Re(rv), fv = K({}, nu, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Jc
  }), dv = Re(fv), mv = K({}, Wl, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), hv = Re(mv), vv = K({}, fi, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), gv = Re(vv), yv = K({}, Wl, {
    newState: 0,
    oldState: 0,
    source: 0
  }), bv = Re(yv), pv = [9, 13, 27, 32], $c = Dl && "CompositionEvent" in window, iu = null;
  Dl && "documentMode" in document && (iu = document.documentMode);
  var Sv = Dl && "TextEvent" in window && !iu, af = Dl && (!$c || iu && 8 < iu && 11 >= iu), nf = " ", uf = !1;
  function cf(t, e) {
    switch (t) {
      case "keyup":
        return pv.indexOf(e.keyCode) !== -1;
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
  function sf(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var hn = !1;
  function _v(t, e) {
    switch (t) {
      case "compositionend":
        return sf(e);
      case "keypress":
        return e.which !== 32 ? null : (uf = !0, nf);
      case "textInput":
        return t = e.data, t === nf && uf ? null : t;
      default:
        return null;
    }
  }
  function Ev(t, e) {
    if (hn)
      return t === "compositionend" || !$c && cf(t, e) ? (t = Io(), ci = Vc = Fl = null, hn = !1, t) : null;
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
        return af && e.locale !== "ko" ? null : e.data;
      default:
        return null;
    }
  }
  var Tv = {
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
  function rf(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === "input" ? !!Tv[t.type] : e === "textarea";
  }
  function of(t, e, l, a) {
    dn ? mn ? mn.push(a) : mn = [a] : dn = a, e = dc(e, "onChange"), 0 < e.length && (l = new oi(
      "onChange",
      "change",
      null,
      l,
      a
    ), t.push({ event: l, listeners: e }));
  }
  var cu = null, su = null;
  function Nv(t) {
    Wm(t, 0);
  }
  function di(t) {
    var e = eu(t);
    if (Qo(e)) return t;
  }
  function ff(t, e) {
    if (t === "change") return e;
  }
  var df = !1;
  if (Dl) {
    var kc;
    if (Dl) {
      var Fc = "oninput" in document;
      if (!Fc) {
        var mf = document.createElement("div");
        mf.setAttribute("oninput", "return;"), Fc = typeof mf.oninput == "function";
      }
      kc = Fc;
    } else kc = !1;
    df = kc && (!document.documentMode || 9 < document.documentMode);
  }
  function hf() {
    cu && (cu.detachEvent("onpropertychange", vf), su = cu = null);
  }
  function vf(t) {
    if (t.propertyName === "value" && di(su)) {
      var e = [];
      of(
        e,
        su,
        t,
        qc(t)
      ), Wo(Nv, e);
    }
  }
  function xv(t, e, l) {
    t === "focusin" ? (hf(), cu = e, su = l, cu.attachEvent("onpropertychange", vf)) : t === "focusout" && hf();
  }
  function Mv(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return di(su);
  }
  function Ov(t, e) {
    if (t === "click") return di(e);
  }
  function zv(t, e) {
    if (t === "input" || t === "change")
      return di(e);
  }
  function Av(t, e) {
    return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
  }
  var Ke = typeof Object.is == "function" ? Object.is : Av;
  function ru(t, e) {
    if (Ke(t, e)) return !0;
    if (typeof t != "object" || t === null || typeof e != "object" || e === null)
      return !1;
    var l = Object.keys(t), a = Object.keys(e);
    if (l.length !== a.length) return !1;
    for (a = 0; a < l.length; a++) {
      var n = l[a];
      if (!j.call(e, n) || !Ke(t[n], e[n]))
        return !1;
    }
    return !0;
  }
  function Wc(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  function gf(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function yf(t, e) {
    var l = gf(t);
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
      l = gf(l);
    }
  }
  function bf(t, e) {
    return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? bf(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
  }
  function pf(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var e = Wc(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var l = typeof e.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) t = e.contentWindow;
      else break;
      e = Wc(t.document);
    }
    return e;
  }
  function Ic(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
  }
  var Cv = Dl && "documentMode" in document && 11 >= document.documentMode, vn = null, Pc = null, ou = null, ts = !1;
  function Sf(t, e, l) {
    var a = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    ts || vn == null || vn !== Wc(a) || (a = vn, "selectionStart" in a && Ic(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), ou && ru(ou, a) || (ou = a, a = dc(Pc, "onSelect"), 0 < a.length && (e = new oi(
      "onSelect",
      "select",
      null,
      e,
      l
    ), t.push({ event: e, listeners: a }), e.target = vn)));
  }
  function Ra(t, e) {
    var l = {};
    return l[t.toLowerCase()] = e.toLowerCase(), l["Webkit" + t] = "webkit" + e, l["Moz" + t] = "moz" + e, l;
  }
  var gn = {
    animationend: Ra("Animation", "AnimationEnd"),
    animationiteration: Ra("Animation", "AnimationIteration"),
    animationstart: Ra("Animation", "AnimationStart"),
    transitionrun: Ra("Transition", "TransitionRun"),
    transitionstart: Ra("Transition", "TransitionStart"),
    transitioncancel: Ra("Transition", "TransitionCancel"),
    transitionend: Ra("Transition", "TransitionEnd")
  }, es = {}, _f = {};
  Dl && (_f = document.createElement("div").style, "AnimationEvent" in window || (delete gn.animationend.animation, delete gn.animationiteration.animation, delete gn.animationstart.animation), "TransitionEvent" in window || delete gn.transitionend.transition);
  function Da(t) {
    if (es[t]) return es[t];
    if (!gn[t]) return t;
    var e = gn[t], l;
    for (l in e)
      if (e.hasOwnProperty(l) && l in _f)
        return es[t] = e[l];
    return t;
  }
  var Ef = Da("animationend"), Tf = Da("animationiteration"), Nf = Da("animationstart"), jv = Da("transitionrun"), wv = Da("transitionstart"), Rv = Da("transitioncancel"), xf = Da("transitionend"), Mf = /* @__PURE__ */ new Map(), ls = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  ls.push("scrollEnd");
  function rl(t, e) {
    Mf.set(t, e), wa(e, [t]);
  }
  var Dv = 0;
  function Ul(t, e) {
    if (t.name != null && t.name !== "auto") return t.name;
    if (e.autoName !== null) return e.autoName;
    t = ml.identifierPrefix;
    var l = Dv++;
    return t = "_" + t + "t_" + l.toString(32) + "_", e.autoName = t;
  }
  function Of(t) {
    if (t == null || typeof t == "string")
      return t;
    var e = null, l = Bn;
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
  function Bl(t, e) {
    return t = Of(t), e = Of(e), e == null ? t === "auto" ? null : t : e === "auto" ? null : e;
  }
  var mi = typeof reportError == "function" ? reportError : function(t) {
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
  }, el = [], yn = 0, as = 0;
  function hi() {
    for (var t = yn, e = as = yn = 0; e < t; ) {
      var l = el[e];
      el[e++] = null;
      var a = el[e];
      el[e++] = null;
      var n = el[e];
      el[e++] = null;
      var u = el[e];
      if (el[e++] = null, a !== null && n !== null) {
        var c = a.pending;
        c === null ? n.next = n : (n.next = c.next, c.next = n), a.pending = n;
      }
      u !== 0 && zf(l, n, u);
    }
  }
  function vi(t, e, l, a) {
    el[yn++] = t, el[yn++] = e, el[yn++] = l, el[yn++] = a, as |= a, t.lanes |= a, t = t.alternate, t !== null && (t.lanes |= a);
  }
  function ns(t, e, l, a) {
    return vi(t, e, l, a), gi(t);
  }
  function Ua(t, e) {
    return vi(t, null, null, e), gi(t);
  }
  function zf(t, e, l) {
    t.lanes |= l;
    var a = t.alternate;
    a !== null && (a.lanes |= l);
    for (var n = !1, u = t.return; u !== null; )
      u.childLanes |= l, a = u.alternate, a !== null && (a.childLanes |= l), u.tag === 22 && (t = u.stateNode, t === null || t._visibility & 1 || (n = !0)), t = u, u = u.return;
    return t.tag === 3 ? (u = t.stateNode, n && e !== null && (n = 31 - Qe(l), t = u.hiddenUpdates, a = t[n], a === null ? t[n] = [e] : a.push(e), e.lane = l | 536870912), u) : null;
  }
  function gi(t) {
    if (50 < wu)
      throw wu = 0, uc = null, Error(s(185));
    for (var e = t.return; e !== null; )
      t = e, e = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var bn = {};
  function Uv(t, e, l, a) {
    this.tag = t, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Le(t, e, l, a) {
    return new Uv(t, e, l, a);
  }
  function us(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Hl(t, e) {
    var l = t.alternate;
    return l === null ? (l = Le(
      t.tag,
      e,
      t.key,
      t.mode
    ), l.elementType = t.elementType, l.type = t.type, l.stateNode = t.stateNode, l.alternate = t, t.alternate = l) : (l.pendingProps = e, l.type = t.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = t.flags & 1206910976, l.childLanes = t.childLanes, l.lanes = t.lanes, l.child = t.child, l.memoizedProps = t.memoizedProps, l.memoizedState = t.memoizedState, l.updateQueue = t.updateQueue, e = t.dependencies, l.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }, l.sibling = t.sibling, l.index = t.index, l.ref = t.ref, l.refCleanup = t.refCleanup, l;
  }
  function Af(t, e) {
    t.flags &= 1206910978;
    var l = t.alternate;
    return l === null ? (t.childLanes = 0, t.lanes = e, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = l.childLanes, t.lanes = l.lanes, t.child = l.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = l.memoizedProps, t.memoizedState = l.memoizedState, t.updateQueue = l.updateQueue, t.type = l.type, e = l.dependencies, t.dependencies = e === null ? null : {
      lanes: e.lanes,
      firstContext: e.firstContext
    }), t;
  }
  function yi(t, e, l, a, n, u) {
    var c = 0;
    if (a = t, typeof a == "function") us(a) && (c = 1);
    else if (typeof a == "string")
      c = ry(
        t,
        l,
        Y.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (a) {
        case jt:
          return t = Le(31, l, e, n), t.elementType = jt, t.lanes = u, t;
        case lt:
          return Ba(l.children, n, u, e);
        case rt:
          c = 8, n |= 24;
          break;
        case ct:
          return t = Le(12, l, e, n | 2), t.elementType = ct, t.lanes = u, t;
        case tt:
          return t = Le(13, l, e, n), t.elementType = tt, t.lanes = u, t;
        case W:
          return t = Le(19, l, e, n), t.elementType = W, t.lanes = u, t;
        case wt:
        case b:
          return t = n | 32, t = Le(30, l, e, t), t.elementType = b, t.lanes = u, t.stateNode = {
            autoName: null,
            paired: null,
            clones: null,
            ref: null
          }, t;
        default:
          if (typeof a == "object" && a !== null)
            switch (a.$$typeof) {
              case Bt:
                c = 10;
                break t;
              case _t:
                c = 9;
                break t;
              case q:
                c = 11;
                break t;
              case gt:
                c = 14;
                break t;
              case dt:
                c = 16, a = null;
                break t;
            }
          c = 29, l = Error(
            s(130, t === null ? "null" : typeof t, "")
          ), a = null;
      }
    return e = Le(c, l, e, n), e.elementType = t, e.type = a, e.lanes = u, e;
  }
  function Ba(t, e, l, a) {
    return t = Le(7, t, a, e), t.lanes = l, t;
  }
  function is(t, e, l) {
    return t = Le(6, t, null, e), t.lanes = l, t;
  }
  function Cf(t) {
    var e = Le(18, null, null, 0);
    return e.stateNode = t, e;
  }
  function cs(t, e, l) {
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
  var jf = /* @__PURE__ */ new WeakMap();
  function ll(t, e) {
    if (typeof t == "object" && t !== null) {
      var l = jf.get(t);
      return l !== void 0 ? l : (e = {
        value: t,
        source: e,
        stack: nn(e)
      }, jf.set(t, e), e);
    }
    return {
      value: t,
      source: e,
      stack: nn(e)
    };
  }
  var pn = [], Sn = 0, bi = null, fu = 0, al = [], nl = 0, Il = null, bl = 1, pl = "";
  function Ll(t, e) {
    pn[Sn++] = fu, pn[Sn++] = bi, bi = t, fu = e;
  }
  function wf(t, e, l) {
    al[nl++] = bl, al[nl++] = pl, al[nl++] = Il, Il = t;
    var a = bl;
    t = pl;
    var n = 32 - Qe(a) - 1;
    a &= ~(1 << n), l += 1;
    var u = 32 - Qe(e) + n;
    if (30 < u) {
      var c = n - n % 5;
      u = (a & (1 << c) - 1).toString(32), a >>= c, n -= c, bl = 1 << 32 - Qe(e) + n | l << n | a, pl = u + t;
    } else
      bl = 1 << u | l << n | a, pl = t;
  }
  function pi(t) {
    t.return !== null && (Ll(t, 1), wf(t, 1, 0));
  }
  function ss(t) {
    for (; t === bi; )
      bi = pn[--Sn], pn[Sn] = null, fu = pn[--Sn], pn[Sn] = null;
    for (; t === Il; )
      Il = al[--nl], al[nl] = null, pl = al[--nl], al[nl] = null, bl = al[--nl], al[nl] = null;
  }
  function Rf(t, e) {
    al[nl++] = bl, al[nl++] = pl, al[nl++] = Il, bl = e.id, pl = e.overflow, Il = t;
  }
  var ye = null, Wt = null, Tt = !1, Pl = null, ul = !1, rs = Error(s(519));
  function ta(t) {
    var e = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw du(ll(e, t)), rs;
  }
  function Df(t) {
    var e = t.stateNode, l = t.type, a = t.memoizedProps;
    switch (e[Ee] = t, e[He] = a, l) {
      case "dialog":
        zt("cancel", e), zt("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        zt("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Du.length; l++)
          zt(Du[l], e);
        break;
      case "source":
        zt("error", e);
        break;
      case "img":
      case "image":
      case "link":
        zt("error", e), zt("load", e);
        break;
      case "details":
        zt("toggle", e);
        break;
      case "input":
        zt("invalid", e), Zo(
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
        zt("invalid", e);
        break;
      case "textarea":
        zt("invalid", e), Jo(e, a.value, a.defaultValue, a.children);
    }
    l = a.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || e.textContent === "" + l || a.suppressHydrationWarning === !0 || eh(e.textContent, l) ? (a.popover != null && (zt("beforetoggle", e), zt("toggle", e)), a.onScroll != null && zt("scroll", e), a.onScrollEnd != null && zt("scrollend", e), a.onClick != null && (e.onclick = yl), e = !0) : e = !1, e || ta(t, !0);
  }
  function Si(t) {
    for (ye = t.return; ye; )
      switch (ye.tag) {
        case 5:
        case 31:
        case 13:
          ul = !1;
          return;
        case 27:
        case 3:
          ul = !0;
          return;
        default:
          ye = ye.return;
      }
  }
  function _n(t) {
    if (t !== ye) return !1;
    if (!Tt) return Si(t), Tt = !0, !1;
    var e = t.tag, l;
    if ((l = e !== 3 && e !== 27) && ((l = e === 5) && (l = t.type, l = !(l !== "form" && l !== "button") || Yr(t.type, t.memoizedProps)), l = !l), l && Wt && ta(t), Si(t), e === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      Wt = Sh(t);
    } else if (e === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      Wt = Sh(t);
    } else
      e === 27 ? (e = Wt, ga(t.type) ? (t = $r, $r = null, Wt = t) : Wt = e) : Wt = ye ? cl(t.stateNode.nextSibling) : null;
    return !0;
  }
  function Ha() {
    Wt = ye = null, Tt = !1;
  }
  function os() {
    var t = Pl;
    return t !== null && (Ge === null ? Ge = t : Ge.push.apply(
      Ge,
      t
    ), Pl = null), t;
  }
  function du(t) {
    Pl === null ? Pl = [t] : Pl.push(t);
  }
  var fs = ne(null), La = null, Yl = null;
  function ea(t, e, l) {
    Et(fs, e._currentValue), e._currentValue = l;
  }
  function ql(t) {
    t._currentValue = fs.current, Ht(fs);
  }
  function _i(t, e, l) {
    for (; t !== null; ) {
      var a = t.alternate;
      if ((t.childLanes & e) !== e ? (t.childLanes |= e, a !== null && (a.childLanes |= e)) : a !== null && (a.childLanes & e) !== e && (a.childLanes |= e), t === l) break;
      t = t.return;
    }
  }
  function ds(t, e, l, a) {
    var n = t.child;
    for (n !== null && (n.return = t); n !== null; ) {
      var u = n.dependencies;
      if (u !== null) {
        var c = n.child;
        u = u.firstContext;
        t: for (; u !== null; ) {
          var o = u;
          u = n;
          for (var g = 0; g < e.length; g++)
            if (o.context === e[g]) {
              u.lanes |= l, o = u.alternate, o !== null && (o.lanes |= l), _i(
                u.return,
                l,
                t
              ), a || (c = null);
              break t;
            }
          u = o.next;
        }
      } else if (n.tag === 18) {
        if (c = n.return, c === null) throw Error(s(341));
        c.lanes |= l, u = c.alternate, u !== null && (u.lanes |= l), _i(c, l, t), c = null;
      } else
        n.tag === 13 && n.memoizedState !== null && n.memoizedState.dehydrated === null ? (n.lanes |= l, c = n.alternate, c !== null && (c.lanes |= l), _i(
          n.return,
          l,
          t
        ), c = n.child, c = c !== null ? c.sibling : null) : c = n.child;
      if (c !== null) c.return = n;
      else
        for (c = n; c !== null; ) {
          if (c === t) {
            c = null;
            break;
          }
          if (n = c.sibling, n !== null) {
            n.return = c.return, c = n;
            break;
          }
          c = c.return;
        }
      n = c;
    }
  }
  function Ya(t, e, l, a) {
    t = null;
    for (var n = e, u = !1; n !== null; ) {
      if (!u) {
        if ((n.flags & 524288) !== 0) u = !0;
        else if ((n.flags & 262144) !== 0) break;
      }
      if (n.tag === 10) {
        var c = n.alternate;
        if (c === null) throw Error(s(387));
        if (c = c.memoizedProps, c !== null) {
          var o = n.type;
          Ke(n.pendingProps.value, c.value) || (t !== null ? t.push(o) : t = [o]);
        }
      } else if (n === me.current) {
        if (c = n.alternate, c === null) throw Error(s(387));
        c.memoizedState.memoizedState !== n.memoizedState.memoizedState && (t !== null ? t.push(Kn) : t = [Kn]);
      }
      n = n.return;
    }
    return t !== null && ds(
      e,
      t,
      l,
      a
    ), e.flags |= 262144, t !== null;
  }
  function Ei(t) {
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
  function qa(t) {
    La = t, Yl = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function Te(t) {
    return Uf(La, t);
  }
  function Ti(t, e) {
    return La === null && qa(t), Uf(t, e);
  }
  function Uf(t, e) {
    var l = e._currentValue;
    if (e = { context: e, memoizedValue: l, next: null }, Yl === null) {
      if (t === null) throw Error(s(308));
      Yl = e, t.dependencies = { lanes: 0, firstContext: e }, t.flags |= 524288;
    } else Yl = Yl.next = e;
    return l;
  }
  var Bv = typeof AbortController < "u" ? AbortController : function() {
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
  }, Hv = i.unstable_scheduleCallback, Lv = i.unstable_NormalPriority, se = {
    $$typeof: Bt,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function ms() {
    return {
      controller: new Bv(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function mu(t) {
    t.refCount--, t.refCount === 0 && Hv(Lv, function() {
      t.controller.abort();
    });
  }
  function Bf(t, e) {
    if ((t.pendingLanes & 4194048) !== 0) {
      var l = t.transitionTypes;
      for (l === null && (l = t.transitionTypes = []), t = 0; t < e.length; t++) {
        var a = e[t];
        l.indexOf(a) === -1 && l.push(a);
      }
    }
  }
  var hu = null;
  function Yv(t) {
    var e = t.transitionTypes;
    return t.transitionTypes = null, e;
  }
  var vu = null, hs = 0, Ga = 0, En = null;
  function qv(t, e) {
    if (vu === null) {
      var l = vu = [];
      hs = 0, Ga = Cr(), En = {
        status: "pending",
        value: void 0,
        then: function(a) {
          l.push(a);
        }
      };
    }
    return hs++, e.then(Hf, Hf), e;
  }
  function Hf() {
    if (--hs === 0 && (hu = null, vu !== null)) {
      En !== null && (En.status = "fulfilled");
      var t = vu;
      vu = null, Ga = 0, En = null;
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function Gv(t, e) {
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
  var Lf = J.S;
  J.S = function(t, e) {
    if (Cm = Yt(), typeof e == "object" && e !== null && typeof e.then == "function" && qv(t, e), hu !== null)
      for (var l = qn; l !== null; )
        Bf(l, hu), l = l.next;
    if (l = t.types, l !== null) {
      for (var a = qn; a !== null; )
        Bf(a, l), a = a.next;
      if (Ga !== 0) {
        a = hu, a === null && (a = hu = []);
        for (var n = 0; n < l.length; n++) {
          var u = l[n];
          a.indexOf(u) === -1 && a.push(u);
        }
      }
    }
    Lf !== null && Lf(t, e);
  };
  var Xa = ne(null);
  function vs() {
    var t = Xa.current;
    return t !== null ? t : kt.pooledCache;
  }
  function Ni(t, e) {
    e === null ? Et(Xa, Xa.current) : Et(Xa, e.pool);
  }
  function Yf() {
    var t = vs();
    return t === null ? null : { parent: se._currentValue, pool: t };
  }
  var Tn = Error(s(460)), gs = Error(s(474)), xi = Error(s(542)), Mi = { then: function() {
  } };
  function qf(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function Gf(t, e, l) {
    switch (l = t[l], l === void 0 ? t.push(e) : l !== e && (e.then(yl, yl), e = l), e.status) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw t = e.reason, Vf(t), t === void 0 && !("reason" in e) ? Error(s(600)) : t;
      default:
        if (typeof e.status == "string") e.then(yl, yl);
        else {
          if (t = kt, t !== null && 100 < t.shellSuspendCounter)
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
            throw t = e.reason, Vf(t), t;
        }
        throw Qa = e, Tn;
    }
  }
  function Va(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (Qa = l, Tn) : l;
    }
  }
  var Qa = null;
  function Xf() {
    if (Qa === null) throw Error(s(459));
    var t = Qa;
    return Qa = null, t;
  }
  function Vf(t) {
    if (t === Tn || t === xi)
      throw Error(s(483));
  }
  var Nn = null, gu = 0;
  function Oi(t) {
    var e = gu;
    return gu += 1, Nn === null && (Nn = []), Gf(Nn, t, e);
  }
  function la(t, e) {
    e = e.props.ref, t.ref = e !== void 0 ? e : null;
  }
  function zi(t, e) {
    throw e.$$typeof === mt ? Error(s(525)) : (t = Object.prototype.toString.call(e), Error(
      s(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t
      )
    ));
  }
  function Qf(t) {
    function e(T, p) {
      if (t) {
        var x = T.deletions;
        x === null ? (T.deletions = [p], T.flags |= 16) : x.push(p);
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
      return T = Hl(T, p), T.index = 0, T.sibling = null, T;
    }
    function u(T, p, x) {
      return T.index = x, t ? (x = T.alternate, x !== null ? (x = x.index, x < p ? (T.flags |= 2, p) : x) : (T.flags |= 134217730, p)) : (T.flags |= 1048576, p);
    }
    function c(T) {
      return t && T.alternate === null && (T.flags |= 134217730), T;
    }
    function o(T, p, x, U) {
      return p === null || p.tag !== 6 ? (p = is(x, T.mode, U), p.return = T, p) : (p = n(p, x), p.return = T, p);
    }
    function g(T, p, x, U) {
      var $ = x.type;
      return $ === lt ? (T = A(
        T,
        p,
        x.props.children,
        U,
        x.key
      ), la(T, x), T) : p !== null && (p.elementType === $ || typeof $ == "object" && $ !== null && $.$$typeof === dt && Va($) === p.type) ? (p = n(p, x.props), la(p, x), p.return = T, p) : (p = yi(
        x.type,
        x.key,
        x.props,
        null,
        T.mode,
        U
      ), la(p, x), p.return = T, p);
    }
    function N(T, p, x, U) {
      return p === null || p.tag !== 4 || p.stateNode.containerInfo !== x.containerInfo || p.stateNode.implementation !== x.implementation ? (p = cs(x, T.mode, U), p.return = T, p) : (p = n(p, x.children || []), p.return = T, p);
    }
    function A(T, p, x, U, $) {
      return p === null || p.tag !== 7 ? (p = Ba(
        x,
        T.mode,
        U,
        $
      ), p.return = T, p) : (p = n(p, x), p.return = T, p);
    }
    function B(T, p, x) {
      if (typeof p == "string" && p !== "" || typeof p == "number" || typeof p == "bigint")
        return p = is(
          "" + p,
          T.mode,
          x
        ), p.return = T, p;
      if (typeof p == "object" && p !== null) {
        switch (p.$$typeof) {
          case Jt:
            return x = yi(
              p.type,
              p.key,
              p.props,
              null,
              T.mode,
              x
            ), la(x, p), x.return = T, x;
          case Gt:
            return p = cs(
              p,
              T.mode,
              x
            ), p.return = T, p;
          case dt:
            return p = Va(p), B(T, p, x);
        }
        if (vt(p) || I(p))
          return p = Ba(
            p,
            T.mode,
            x,
            null
          ), p.return = T, p;
        if (typeof p.then == "function")
          return B(T, Oi(p), x);
        if (p.$$typeof === Bt)
          return B(
            T,
            Ti(T, p),
            x
          );
        zi(T, p);
      }
      return null;
    }
    function _(T, p, x, U) {
      var $ = p !== null ? p.key : null;
      if (typeof x == "string" && x !== "" || typeof x == "number" || typeof x == "bigint")
        return $ !== null ? null : o(T, p, "" + x, U);
      if (typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case Jt:
            return x.key === $ ? g(T, p, x, U) : null;
          case Gt:
            return x.key === $ ? N(T, p, x, U) : null;
          case dt:
            return x = Va(x), _(T, p, x, U);
        }
        if (vt(x) || I(x))
          return $ !== null ? null : A(T, p, x, U, null);
        if (typeof x.then == "function")
          return _(
            T,
            p,
            Oi(x),
            U
          );
        if (x.$$typeof === Bt)
          return _(
            T,
            p,
            Ti(T, x),
            U
          );
        zi(T, x);
      }
      return null;
    }
    function O(T, p, x, U, $) {
      if (typeof U == "string" && U !== "" || typeof U == "number" || typeof U == "bigint")
        return T = T.get(x) || null, o(p, T, "" + U, $);
      if (typeof U == "object" && U !== null) {
        switch (U.$$typeof) {
          case Jt:
            return T = T.get(
              U.key === null ? x : U.key
            ) || null, g(p, T, U, $);
          case Gt:
            return T = T.get(
              U.key === null ? x : U.key
            ) || null, N(p, T, U, $);
          case dt:
            return U = Va(U), O(
              T,
              p,
              x,
              U,
              $
            );
        }
        if (vt(U) || I(U))
          return T = T.get(x) || null, A(p, T, U, $, null);
        if (typeof U.then == "function")
          return O(
            T,
            p,
            x,
            Oi(U),
            $
          );
        if (U.$$typeof === Bt)
          return O(
            T,
            p,
            x,
            Ti(p, U),
            $
          );
        zi(p, U);
      }
      return null;
    }
    function X(T, p, x, U) {
      for (var $ = null, Ct = null, it = p, ft = p = 0, fe = null; it !== null && ft < x.length; ft++) {
        it.index > ft ? (fe = it, it = null) : fe = it.sibling;
        var Rt = _(
          T,
          it,
          x[ft],
          U
        );
        if (Rt === null) {
          it === null && (it = fe);
          break;
        }
        t && it && Rt.alternate === null && e(T, it), p = u(Rt, p, ft), Ct === null ? $ = Rt : Ct.sibling = Rt, Ct = Rt, it = fe;
      }
      if (ft === x.length)
        return l(T, it), Tt && Ll(T, ft), $;
      if (it === null) {
        for (; ft < x.length; ft++)
          it = B(T, x[ft], U), it !== null && (p = u(
            it,
            p,
            ft
          ), Ct === null ? $ = it : Ct.sibling = it, Ct = it);
        return Tt && Ll(T, ft), $;
      }
      for (it = a(it); ft < x.length; ft++)
        fe = O(
          it,
          T,
          ft,
          x[ft],
          U
        ), fe !== null && (t && (Rt = fe.alternate, Rt !== null && it.delete(Rt.key === null ? ft : Rt.key)), p = u(
          fe,
          p,
          ft
        ), Ct === null ? $ = fe : Ct.sibling = fe, Ct = fe);
      return t && it.forEach(function(_a) {
        return e(T, _a);
      }), Tt && Ll(T, ft), $;
    }
    function P(T, p, x, U) {
      if (x == null) throw Error(s(151));
      for (var $ = null, Ct = null, it = p, ft = p = 0, fe = null, Rt = x.next(); it !== null && !Rt.done; ft++, Rt = x.next()) {
        it.index > ft ? (fe = it, it = null) : fe = it.sibling;
        var _a = _(T, it, Rt.value, U);
        if (_a === null) {
          it === null && (it = fe);
          break;
        }
        t && it && _a.alternate === null && e(T, it), p = u(_a, p, ft), Ct === null ? $ = _a : Ct.sibling = _a, Ct = _a, it = fe;
      }
      if (Rt.done)
        return l(T, it), Tt && Ll(T, ft), $;
      if (it === null) {
        for (; !Rt.done; ft++, Rt = x.next())
          Rt = B(T, Rt.value, U), Rt !== null && (p = u(Rt, p, ft), Ct === null ? $ = Rt : Ct.sibling = Rt, Ct = Rt);
        return Tt && Ll(T, ft), $;
      }
      for (it = a(it); !Rt.done; ft++, Rt = x.next())
        Rt = O(it, T, ft, Rt.value, U), Rt !== null && (t && (fe = Rt.alternate, fe !== null && it.delete(
          fe.key === null ? ft : fe.key
        )), p = u(Rt, p, ft), Ct === null ? $ = Rt : Ct.sibling = Rt, Ct = Rt);
      return t && it.forEach(function(_y) {
        return e(T, _y);
      }), Tt && Ll(T, ft), $;
    }
    function St(T, p, x, U) {
      if (typeof x == "object" && x !== null && x.type === lt && x.key === null && x.props.ref === void 0 && (x = x.props.children), typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case Jt:
            t: {
              for (var $ = x.key; p !== null; ) {
                if (p.key === $) {
                  if ($ = x.type, $ === lt) {
                    if (p.tag === 7) {
                      l(
                        T,
                        p.sibling
                      ), U = n(
                        p,
                        x.props.children
                      ), la(U, x), U.return = T, T = U;
                      break t;
                    }
                  } else if (p.elementType === $ || typeof $ == "object" && $ !== null && $.$$typeof === dt && Va($) === p.type) {
                    l(
                      T,
                      p.sibling
                    ), U = n(p, x.props), la(U, x), U.return = T, T = U;
                    break t;
                  }
                  l(T, p);
                  break;
                } else e(T, p);
                p = p.sibling;
              }
              x.type === lt ? (U = Ba(
                x.props.children,
                T.mode,
                U,
                x.key
              ), la(U, x), U.return = T, T = U) : (U = yi(
                x.type,
                x.key,
                x.props,
                null,
                T.mode,
                U
              ), la(U, x), U.return = T, T = U);
            }
            return c(T);
          case Gt:
            t: {
              for ($ = x.key; p !== null; ) {
                if (p.key === $)
                  if (p.tag === 4 && p.stateNode.containerInfo === x.containerInfo && p.stateNode.implementation === x.implementation) {
                    l(
                      T,
                      p.sibling
                    ), U = n(p, x.children || []), U.return = T, T = U;
                    break t;
                  } else {
                    l(T, p);
                    break;
                  }
                else e(T, p);
                p = p.sibling;
              }
              U = cs(x, T.mode, U), U.return = T, T = U;
            }
            return c(T);
          case dt:
            return x = Va(x), St(
              T,
              p,
              x,
              U
            );
        }
        if (vt(x))
          return X(
            T,
            p,
            x,
            U
          );
        if (I(x)) {
          if ($ = I(x), typeof $ != "function") throw Error(s(150));
          return x = $.call(x), P(
            T,
            p,
            x,
            U
          );
        }
        if (typeof x.then == "function")
          return St(
            T,
            p,
            Oi(x),
            U
          );
        if (x.$$typeof === Bt)
          return St(
            T,
            p,
            Ti(T, x),
            U
          );
        zi(T, x);
      }
      return typeof x == "string" && x !== "" || typeof x == "number" || typeof x == "bigint" ? (x = "" + x, p !== null && p.tag === 6 ? (l(T, p.sibling), U = n(p, x), U.return = T, T = U) : (l(T, p), U = is(x, T.mode, U), U.return = T, T = U), c(T)) : l(T, p);
    }
    return function(T, p, x, U) {
      try {
        gu = 0;
        var $ = St(
          T,
          p,
          x,
          U
        );
        return Nn = null, $;
      } catch (it) {
        if (it === Tn || it === xi) throw it;
        var Ct = Le(29, it, null, T.mode);
        return Ct.lanes = U, Ct.return = T, Ct;
      }
    };
  }
  var Za = Qf(!0), Zf = Qf(!1), aa = !1;
  function ys(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function bs(t, e) {
    t = t.updateQueue, e.updateQueue === t && (e.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function na(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function ua(t, e, l) {
    var a = t.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (qt & 2) !== 0) {
      var n = a.pending;
      return n === null ? e.next = e : (e.next = n.next, n.next = e), a.pending = e, e = gi(t), zf(t, null, l), e;
    }
    return vi(t, a, e, l), gi(t);
  }
  function yu(t, e, l) {
    if (e = e.updateQueue, e !== null && (e = e.shared, (l & 4194048) !== 0)) {
      var a = e.lanes;
      a &= t.pendingLanes, l |= a, e.lanes = l, jo(t, l);
    }
  }
  function ps(t, e) {
    var l = t.updateQueue, a = t.alternate;
    if (a !== null && (a = a.updateQueue, l === a)) {
      var n = null, u = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var c = {
            lane: l.lane,
            tag: l.tag,
            payload: l.payload,
            callback: null,
            next: null
          };
          u === null ? n = u = c : u = u.next = c, l = l.next;
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
  var Ss = !1;
  function bu() {
    if (Ss) {
      var t = En;
      if (t !== null) throw t;
    }
  }
  function pu(t, e, l, a) {
    Ss = !1;
    var n = t.updateQueue;
    aa = !1;
    var u = n.firstBaseUpdate, c = n.lastBaseUpdate, o = n.shared.pending;
    if (o !== null) {
      n.shared.pending = null;
      var g = o, N = g.next;
      g.next = null, c === null ? u = N : c.next = N, c = g;
      var A = t.alternate;
      A !== null && (A = A.updateQueue, o = A.lastBaseUpdate, o !== c && (o === null ? A.firstBaseUpdate = N : o.next = N, A.lastBaseUpdate = g));
    }
    if (u !== null) {
      var B = n.baseState;
      c = 0, A = N = g = null, o = u;
      do {
        var _ = o.lane & -536870913, O = _ !== o.lane;
        if (O ? (At & _) === _ : (a & _) === _) {
          _ !== 0 && _ === Ga && (Ss = !0), A !== null && (A = A.next = {
            lane: 0,
            tag: o.tag,
            payload: o.payload,
            callback: null,
            next: null
          });
          t: {
            var X = t, P = o;
            _ = e;
            var St = l;
            switch (P.tag) {
              case 1:
                if (X = P.payload, typeof X == "function") {
                  B = X.call(St, B, _);
                  break t;
                }
                B = X;
                break t;
              case 3:
                X.flags = X.flags & -65537 | 128;
              case 0:
                if (X = P.payload, _ = typeof X == "function" ? X.call(St, B, _) : X, _ == null) break t;
                B = K({}, B, _);
                break t;
              case 2:
                aa = !0;
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
          }, A === null ? (N = A = O, g = B) : A = A.next = O, c |= _;
        if (o = o.next, o === null) {
          if (o = n.shared.pending, o === null)
            break;
          O = o, o = O.next, O.next = null, n.lastBaseUpdate = O, n.shared.pending = null;
        }
      } while (!0);
      A === null && (g = B), n.baseState = g, n.firstBaseUpdate = N, n.lastBaseUpdate = A, u === null && (n.shared.lanes = 0), da |= c, t.lanes = c, t.memoizedState = B;
    }
  }
  function Kf(t, e) {
    if (typeof t != "function")
      throw Error(s(191, t));
    t.call(e);
  }
  function Jf(t, e) {
    var l = t.callbacks;
    if (l !== null)
      for (t.callbacks = null, t = 0; t < l.length; t++)
        Kf(l[t], e);
  }
  var ia = ne(null), Ai = ne(0);
  function $f(t, e) {
    t = Zl, Et(Ai, t), Et(ia, e), Zl = t | e.baseLanes;
  }
  function _s() {
    Et(Ai, Zl), Et(ia, ia.current);
  }
  function Es() {
    Zl = Ai.current, Ht(ia), Ht(Ai);
  }
  var Ne = ne(null), Ce = null;
  function ca(t) {
    var e = t.alternate;
    Et(xe, xe.current & 1), Et(Ne, t), Ce === null && (e === null || ia.current !== null || e.memoizedState !== null) && (Ce = t);
  }
  function Ts(t) {
    Et(xe, xe.current), Et(Ne, t), Ce === null && (Ce = t);
  }
  function kf(t) {
    t.tag === 22 ? (Et(xe, xe.current), Et(Ne, t), Ce === null && (Ce = t)) : sa();
  }
  function sa() {
    Et(xe, xe.current), Et(Ne, Ne.current);
  }
  function Je(t) {
    Ht(Ne), Ce === t && (Ce = null), Ht(xe);
  }
  var xe = ne(0);
  function Su(t, e) {
    Et(Ne, Ne.current), Et(xe, e);
  }
  function Ns(t) {
    Ht(xe), Ht(Ne), Ce === t && (Ce = null);
  }
  function Ci(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var l = e.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || Kr(l) || Jr(l)))
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
  var Gl = 0, pt = null, $t = null, re = null, ji = !1, xn = !1, Ka = !1, wi = 0, _u = 0, Mn = null, Xv = 0;
  function le() {
    throw Error(s(321));
  }
  function xs(t, e) {
    if (e === null) return !1;
    for (var l = 0; l < e.length && l < t.length; l++)
      if (!Ke(t[l], e[l])) return !1;
    return !0;
  }
  function Ms(t, e, l, a, n, u) {
    return Gl = u, pt = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, J.H = t === null || t.memoizedState === null ? wd : Rd, Ka = !1, u = l(a, n), Ka = !1, xn && (u = Wf(
      e,
      l,
      a,
      n
    )), Ff(t), u;
  }
  function Ff(t) {
    J.H = Yi;
    var e = $t !== null && $t.next !== null;
    if (Gl = 0, re = $t = pt = null, ji = !1, _u = 0, Mn = null, e) throw Error(s(300));
    t === null || oe || (t = t.dependencies, t !== null && Ei(t) && (oe = !0));
  }
  function Wf(t, e, l, a) {
    pt = t;
    var n = 0;
    do {
      if (xn && (Mn = null), _u = 0, xn = !1, 25 <= n) throw Error(s(301));
      if (n += 1, re = $t = null, t.updateQueue != null) {
        var u = t.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      J.H = Fv, u = e(l, a);
    } while (xn);
    return u;
  }
  function Vv() {
    var t = J.H, e = t.useState()[0];
    return e = typeof e.then == "function" ? Eu(e) : e, t = t.useState()[0], ($t !== null ? $t.memoizedState : null) !== t && (pt.flags |= 1024), e;
  }
  function Os() {
    var t = wi !== 0;
    return wi = 0, t;
  }
  function zs(t, e, l) {
    e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~l;
  }
  function As(t) {
    if (ji) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        e !== null && (e.pending = null), t = t.next;
      }
      ji = !1;
    }
    Gl = 0, re = $t = pt = null, xn = !1, _u = wi = 0, Mn = null;
  }
  function De() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return re === null ? pt.memoizedState = re = t : re = re.next = t, re;
  }
  function ue() {
    if ($t === null) {
      var t = pt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = $t.next;
    var e = re === null ? pt.memoizedState : re.next;
    if (e !== null)
      re = e, $t = t;
    else {
      if (t === null)
        throw pt.alternate === null ? Error(s(467)) : Error(s(310));
      $t = t, t = {
        memoizedState: $t.memoizedState,
        baseState: $t.baseState,
        baseQueue: $t.baseQueue,
        queue: $t.queue,
        next: null
      }, re === null ? pt.memoizedState = re = t : re = re.next = t;
    }
    return re;
  }
  function Ri() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Eu(t) {
    var e = _u;
    return _u += 1, Mn === null && (Mn = []), t = Gf(Mn, t, e), e = pt, (re === null ? e.memoizedState : re.next) === null && (e = e.alternate, J.H = e === null || e.memoizedState === null ? wd : Rd), t;
  }
  function Di(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return Eu(t);
      if (t.$$typeof === R) return;
      if (t.$$typeof === Bt) return Te(t);
    }
    throw Error(s(438, String(t)));
  }
  function Cs(t) {
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
    if (e == null && (e = { data: [], index: 0 }), l === null && (l = Ri(), pt.updateQueue = l), l.memoCache = e, l = e.data[e.index], l === void 0)
      for (l = e.data[e.index] = Array(t), a = 0; a < t; a++)
        l[a] = F;
    return e.index++, l;
  }
  function Xl(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function Ui(t) {
    var e = ue();
    return js(e, $t, t);
  }
  function js(t, e, l) {
    var a = t.queue;
    if (a === null) throw Error(s(311));
    a.lastRenderedReducer = l;
    var n = t.baseQueue, u = a.pending;
    if (u !== null) {
      if (n !== null) {
        var c = n.next;
        n.next = u.next, u.next = c;
      }
      e.baseQueue = n = u, a.pending = null;
    }
    if (u = t.baseState, n === null) t.memoizedState = u;
    else {
      e = n.next;
      var o = c = null, g = null, N = e, A = !1;
      do {
        var B = N.lane & -536870913;
        if (B !== N.lane ? (At & B) === B : (Gl & B) === B) {
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
            }), B === Ga && (A = !0);
          else if ((Gl & _) === _) {
            N = N.next, _ === Ga && (A = !0);
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
            }, g === null ? (o = g = B, c = u) : g = g.next = B, pt.lanes |= _, da |= _;
          B = N.action, Ka && l(u, B), u = N.hasEagerState ? N.eagerState : l(u, B);
        } else
          _ = {
            lane: B,
            revertLane: N.revertLane,
            gesture: N.gesture,
            action: N.action,
            hasEagerState: N.hasEagerState,
            eagerState: N.eagerState,
            next: null
          }, g === null ? (o = g = _, c = u) : g = g.next = _, pt.lanes |= B, da |= B;
        N = N.next;
      } while (N !== null && N !== e);
      if (g === null ? c = u : g.next = o, !Ke(u, t.memoizedState) && (oe = !0, A && (l = En, l !== null)))
        throw l;
      t.memoizedState = u, t.baseState = c, t.baseQueue = g, a.lastRenderedState = u;
    }
    return n === null && (a.lanes = 0), [t.memoizedState, a.dispatch];
  }
  function ws(t) {
    var e = ue(), l = e.queue;
    if (l === null) throw Error(s(311));
    l.lastRenderedReducer = t;
    var a = l.dispatch, n = l.pending, u = e.memoizedState;
    if (n !== null) {
      l.pending = null;
      var c = n = n.next;
      do
        u = t(u, c.action), c = c.next;
      while (c !== n);
      Ke(u, e.memoizedState) || (oe = !0), e.memoizedState = u, e.baseQueue === null && (e.baseState = u), l.lastRenderedState = u;
    }
    return [u, a];
  }
  function If(t, e, l) {
    var a = pt, n = ue(), u = Tt;
    if (u) {
      if (l === void 0) throw Error(s(407));
      l = l();
    } else l = e();
    var c = !Ke(
      ($t || n).memoizedState,
      l
    );
    if (c && (n.memoizedState = l, oe = !0), n = n.queue, Us(ed.bind(null, a, n, t), [
      t
    ]), t = n.getSnapshot !== e || c || re !== null && (re.memoizedState.tag & 1) !== 0, On(
      t ? 9 : 8,
      { destroy: void 0 },
      td.bind(null, a, n, l, e),
      null
    ), t) {
      if (a.flags |= 2048, kt === null) throw Error(s(349));
      u || (Gl & 127) !== 0 || Pf(a, e, l);
    }
    return l;
  }
  function Pf(t, e, l) {
    t.flags |= 16384, t = { getSnapshot: e, value: l }, e = pt.updateQueue, e === null ? (e = Ri(), pt.updateQueue = e, e.stores = [t]) : (l = e.stores, l === null ? e.stores = [t] : l.push(t));
  }
  function td(t, e, l, a) {
    e.value = l, e.getSnapshot = a, ld(e) && ad(t);
  }
  function ed(t, e, l) {
    return l(function() {
      ld(e) && ad(t);
    });
  }
  function ld(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var l = e();
      return !Ke(t, l);
    } catch {
      return !0;
    }
  }
  function ad(t) {
    var e = Ua(t, 2);
    e !== null && Xe(e, t, 2);
  }
  function Rs(t) {
    var e = De();
    if (typeof t == "function") {
      var l = t;
      if (t = l(), Ka) {
        kl(!0);
        try {
          l();
        } finally {
          kl(!1);
        }
      }
    }
    return e.memoizedState = e.baseState = t, e.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Xl,
      lastRenderedState: t
    }, e;
  }
  function nd(t, e, l, a) {
    return t.baseState = l, js(
      t,
      $t,
      typeof a == "function" ? a : Xl
    );
  }
  function Qv(t, e, l, a, n) {
    if (Li(t)) throw Error(s(485));
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
        then: function(c) {
          u.listeners.push(c);
        }
      };
      J.T !== null ? l(!0) : u.isTransition = !1, a(u), l = e.pending, l === null ? (u.next = e.pending = u, ud(e, u)) : (u.next = l.next, e.pending = l.next = u);
    }
  }
  function ud(t, e) {
    var l = e.action, a = e.payload, n = t.state;
    if (e.isTransition) {
      var u = J.T, c = {};
      c.types = u !== null ? u.types : null, J.T = c;
      try {
        var o = l(n, a), g = J.S;
        g !== null && g(c, o), id(t, e, o);
      } catch (N) {
        Ds(t, e, N);
      } finally {
        u !== null && c.types !== null && (u.types = c.types), J.T = u;
      }
    } else
      try {
        u = l(n, a), id(t, e, u);
      } catch (N) {
        Ds(t, e, N);
      }
  }
  function id(t, e, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(a) {
        cd(t, e, a);
      },
      function(a) {
        return Ds(t, e, a);
      }
    ) : cd(t, e, l);
  }
  function cd(t, e, l) {
    e.status = "fulfilled", e.value = l, sd(e), t.state = l, e = t.pending, e !== null && (l = e.next, l === e ? t.pending = null : (l = l.next, e.next = l, ud(t, l)));
  }
  function Ds(t, e, l) {
    var a = t.pending;
    if (t.pending = null, a !== null) {
      a = a.next;
      do
        e.status = "rejected", e.reason = l, sd(e), e = e.next;
      while (e !== a);
    }
    t.action = null;
  }
  function sd(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function rd(t, e) {
    return e;
  }
  function od(t, e) {
    if (Tt) {
      var l = kt.formState;
      if (l !== null) {
        t: {
          var a = pt;
          if (Tt) {
            if (Wt) {
              e: {
                for (var n = Wt, u = ul; n.nodeType !== 8; ) {
                  if (!u) {
                    n = null;
                    break e;
                  }
                  if (n = cl(
                    n.nextSibling
                  ), n === null) {
                    n = null;
                    break e;
                  }
                }
                u = n.data, n = u === "F!" || u === "F" ? n : null;
              }
              if (n) {
                Wt = cl(
                  n.nextSibling
                ), a = n.data === "F!";
                break t;
              }
            }
            ta(a);
          }
          a = !1;
        }
        a && (e = l[0]);
      }
    }
    return l = De(), l.memoizedState = l.baseState = e, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: rd,
      lastRenderedState: e
    }, l.queue = a, l = Ad.bind(
      null,
      pt,
      a
    ), a.dispatch = l, a = Rs(!1), u = qs.bind(
      null,
      pt,
      !1,
      a.queue
    ), a = De(), n = {
      state: e,
      dispatch: null,
      action: t,
      pending: null
    }, a.queue = n, l = Qv.bind(
      null,
      pt,
      n,
      u,
      l
    ), n.dispatch = l, a.memoizedState = t, [e, l, !1];
  }
  function fd(t) {
    var e = ue();
    return dd(e, $t, t);
  }
  function dd(t, e, l) {
    if (e = js(
      t,
      e,
      rd
    )[0], t = Ui(Xl)[0], typeof e == "object" && e !== null && typeof e.then == "function")
      try {
        var a = Eu(e);
      } catch (c) {
        throw c === Tn ? xi : c;
      }
    else a = e;
    e = ue();
    var n = e.queue, u = n.dispatch;
    return l !== e.memoizedState && (pt.flags |= 2048, On(
      9,
      { destroy: void 0 },
      Zv.bind(null, n, l),
      null
    )), [a, u, t];
  }
  function Zv(t, e) {
    t.action = e;
  }
  function md(t) {
    var e = ue(), l = $t;
    if (l !== null)
      return dd(e, l, t);
    ue(), e = e.memoizedState, l = ue();
    var a = l.queue.dispatch;
    return l.memoizedState = t, [e, a, !1];
  }
  function On(t, e, l, a) {
    return t = { tag: t, create: l, deps: a, inst: e, next: null }, e = pt.updateQueue, e === null && (e = Ri(), pt.updateQueue = e), l = e.lastEffect, l === null ? e.lastEffect = t.next = t : (a = l.next, l.next = t, t.next = a, e.lastEffect = t), t;
  }
  function hd() {
    return ue().memoizedState;
  }
  function Bi(t, e, l, a) {
    var n = De();
    pt.flags |= t, n.memoizedState = On(
      1 | e,
      { destroy: void 0 },
      l,
      a === void 0 ? null : a
    );
  }
  function Hi(t, e, l, a) {
    var n = ue();
    a = a === void 0 ? null : a;
    var u = n.memoizedState.inst;
    $t !== null && a !== null && xs(a, $t.memoizedState.deps) ? n.memoizedState = On(e, u, l, a) : (pt.flags |= t, n.memoizedState = On(
      1 | e,
      u,
      l,
      a
    ));
  }
  function vd(t, e) {
    Bi(8390656, 8, t, e);
  }
  function Us(t, e) {
    Hi(2048, 8, t, e);
  }
  function Kv(t) {
    pt.flags |= 4;
    var e = pt.updateQueue;
    if (e === null)
      e = Ri(), pt.updateQueue = e, e.events = [t];
    else {
      var l = e.events;
      l === null ? e.events = [t] : l.push(t);
    }
  }
  function gd(t) {
    var e = ue().memoizedState;
    return Kv({ ref: e, nextImpl: t }), function() {
      if ((qt & 2) !== 0) throw Error(s(440));
      return e.impl.apply(void 0, arguments);
    };
  }
  function yd(t, e) {
    return Hi(4, 2, t, e);
  }
  function bd(t, e) {
    return Hi(4, 4, t, e);
  }
  function pd(t, e) {
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
  function Sd(t, e, l) {
    l = l != null ? l.concat([t]) : null, Hi(4, 4, pd.bind(null, e, t), l);
  }
  function Bs() {
  }
  function _d(t, e) {
    var l = ue();
    e = e === void 0 ? null : e;
    var a = l.memoizedState;
    return e !== null && xs(e, a[1]) ? a[0] : (l.memoizedState = [t, e], t);
  }
  function Ed(t, e) {
    var l = ue();
    e = e === void 0 ? null : e;
    var a = l.memoizedState;
    if (e !== null && xs(e, a[1]))
      return a[0];
    if (a = t(), Ka) {
      kl(!0);
      try {
        t();
      } finally {
        kl(!1);
      }
    }
    return l.memoizedState = [a, e], a;
  }
  function Hs(t, e, l) {
    return l === void 0 || (Gl & 1073741824) !== 0 && (At & 261930) === 0 ? t.memoizedState = e : (t.memoizedState = l, t = wm(), pt.lanes |= t, da |= t, l);
  }
  function Td(t, e, l, a) {
    return Ke(l, e) ? l : ia.current !== null ? (t = Hs(t, l, a), Ke(t, e) || (oe = !0), t) : (Gl & 106) === 0 || (Gl & 1073741824) !== 0 && (At & 261930) === 0 ? (oe = !0, t.memoizedState = l) : (t = wm(), pt.lanes |= t, da |= t, e);
  }
  function Nd(t, e, l, a, n) {
    var u = at.p;
    at.p = u !== 0 && 8 > u ? u : 8;
    var c = J.T, o = {};
    o.types = c !== null ? c.types : null, J.T = o, qs(t, !1, e, l);
    try {
      var g = n(), N = J.S;
      if (N !== null && N(o, g), g !== null && typeof g == "object" && typeof g.then == "function") {
        var A = Gv(
          g,
          a
        );
        Tu(
          t,
          e,
          A,
          We(t)
        );
      } else
        Tu(
          t,
          e,
          a,
          We(t)
        );
    } catch (B) {
      Tu(
        t,
        e,
        { then: function() {
        }, status: "rejected", reason: B },
        We()
      );
    } finally {
      at.p = u, c !== null && o.types !== null && (c.types = o.types), J.T = c;
    }
  }
  function Jv() {
  }
  function Ls(t, e, l, a) {
    if (t.tag !== 5) throw Error(s(476));
    var n = xd(t).queue;
    Nd(
      t,
      n,
      e,
      ie,
      l === null ? Jv : function() {
        return Md(t), l(a);
      }
    );
  }
  function xd(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: ie,
      baseState: ie,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Xl,
        lastRenderedState: ie
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
        lastRenderedReducer: Xl,
        lastRenderedState: l
      },
      next: null
    }, t.memoizedState = e, t = t.alternate, t !== null && (t.memoizedState = e), e;
  }
  function Md(t) {
    var e = xd(t);
    e.next === null && (e = t.alternate.memoizedState), Tu(
      t,
      e.next.queue,
      {},
      We()
    );
  }
  function Ys() {
    return Te(Kn);
  }
  function Od() {
    return ue().memoizedState;
  }
  function zd() {
    return ue().memoizedState;
  }
  function $v(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var l = We();
          t = na(l);
          var a = ua(e, t, l);
          a !== null && (Xe(a, e, l), yu(a, e, l)), e = { cache: ms() }, t.payload = e;
          return;
      }
      e = e.return;
    }
  }
  function kv(t, e, l) {
    var a = We();
    l = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Li(t) ? Cd(e, l) : (l = ns(t, e, l, a), l !== null && (Xe(l, t, a), jd(l, e, a)));
  }
  function Ad(t, e, l) {
    var a = We();
    Tu(t, e, l, a);
  }
  function Tu(t, e, l, a) {
    var n = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Li(t)) Cd(e, n);
    else {
      var u = t.alternate;
      if (t.lanes === 0 && (u === null || u.lanes === 0) && (u = e.lastRenderedReducer, u !== null))
        try {
          var c = e.lastRenderedState, o = u(c, l);
          if (n.hasEagerState = !0, n.eagerState = o, Ke(o, c))
            return vi(t, e, n, 0), kt === null && hi(), !1;
        } catch {
        }
      if (l = ns(t, e, n, a), l !== null)
        return Xe(l, t, a), jd(l, e, a), !0;
    }
    return !1;
  }
  function qs(t, e, l, a) {
    if (a = {
      lane: 2,
      revertLane: Cr(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Li(t)) {
      if (e) throw Error(s(479));
    } else
      e = ns(
        t,
        l,
        a,
        2
      ), e !== null && Xe(e, t, 2);
  }
  function Li(t) {
    var e = t.alternate;
    return t === pt || e !== null && e === pt;
  }
  function Cd(t, e) {
    xn = ji = !0;
    var l = t.pending;
    l === null ? e.next = e : (e.next = l.next, l.next = e), t.pending = e;
  }
  function jd(t, e, l) {
    if ((l & 4194048) !== 0) {
      var a = e.lanes;
      a &= t.pendingLanes, l |= a, e.lanes = l, jo(t, l);
    }
  }
  var Yi = {
    readContext: Te,
    use: Di,
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
  }, wd = {
    readContext: Te,
    use: Di,
    useCallback: function(t, e) {
      return De().memoizedState = [
        t,
        e === void 0 ? null : e
      ], t;
    },
    useContext: Te,
    useEffect: vd,
    useImperativeHandle: function(t, e, l) {
      l = l != null ? l.concat([t]) : null, Bi(
        4194308,
        4,
        pd.bind(null, e, t),
        l
      );
    },
    useLayoutEffect: function(t, e) {
      return Bi(4194308, 4, t, e);
    },
    useInsertionEffect: function(t, e) {
      Bi(4, 2, t, e);
    },
    useMemo: function(t, e) {
      var l = De();
      e = e === void 0 ? null : e;
      var a = t();
      if (Ka) {
        kl(!0);
        try {
          t();
        } finally {
          kl(!1);
        }
      }
      return l.memoizedState = [a, e], a;
    },
    useReducer: function(t, e, l) {
      var a = De();
      if (l !== void 0) {
        var n = l(e);
        if (Ka) {
          kl(!0);
          try {
            l(e);
          } finally {
            kl(!1);
          }
        }
      } else n = e;
      return a.memoizedState = a.baseState = n, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: n
      }, a.queue = t, t = t.dispatch = kv.bind(
        null,
        pt,
        t
      ), [a.memoizedState, t];
    },
    useRef: function(t) {
      var e = De();
      return t = { current: t }, e.memoizedState = t;
    },
    useState: function(t) {
      t = Rs(t);
      var e = t.queue, l = Ad.bind(null, pt, e);
      return e.dispatch = l, [t.memoizedState, l];
    },
    useDebugValue: Bs,
    useDeferredValue: function(t, e) {
      var l = De();
      return Hs(l, t, e);
    },
    useTransition: function() {
      var t = Rs(!1);
      return t = Nd.bind(
        null,
        pt,
        t.queue,
        !0,
        !1
      ), De().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, e, l) {
      var a = pt, n = De();
      if (Tt) {
        if (l === void 0)
          throw Error(s(407));
        l = l();
      } else {
        if (l = e(), kt === null)
          throw Error(s(349));
        (At & 127) !== 0 || Pf(a, e, l);
      }
      n.memoizedState = l;
      var u = { value: l, getSnapshot: e };
      return n.queue = u, vd(ed.bind(null, a, u, t), [
        t
      ]), a.flags |= 2048, On(
        9,
        { destroy: void 0 },
        td.bind(
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
      var t = De(), e = kt.identifierPrefix;
      if (Tt) {
        var l = pl, a = bl;
        l = (a & ~(1 << 32 - Qe(a) - 1)).toString(32) + l, e = "_" + e + "R_" + l, l = wi++, 0 < l && (e += "H" + l.toString(32)), e += "_";
      } else
        l = Xv++, e = "_" + e + "r_" + l.toString(32) + "_";
      return t.memoizedState = e;
    },
    useHostTransitionStatus: Ys,
    useFormState: od,
    useActionState: od,
    useOptimistic: function(t) {
      var e = De();
      e.memoizedState = e.baseState = t;
      var l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return e.queue = l, e = qs.bind(
        null,
        pt,
        !0,
        l
      ), l.dispatch = e, [t, e];
    },
    useMemoCache: Cs,
    useCacheRefresh: function() {
      return De().memoizedState = $v.bind(
        null,
        pt
      );
    },
    useEffectEvent: function(t) {
      var e = De(), l = { impl: t };
      return e.memoizedState = l, function() {
        if ((qt & 2) !== 0)
          throw Error(s(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, Rd = {
    readContext: Te,
    use: Di,
    useCallback: _d,
    useContext: Te,
    useEffect: Us,
    useImperativeHandle: Sd,
    useInsertionEffect: yd,
    useLayoutEffect: bd,
    useMemo: Ed,
    useReducer: Ui,
    useRef: hd,
    useState: function() {
      return Ui(Xl);
    },
    useDebugValue: Bs,
    useDeferredValue: function(t, e) {
      var l = ue();
      return Td(
        l,
        $t.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = Ui(Xl)[0], e = ue().memoizedState;
      return [
        typeof t == "boolean" ? t : Eu(t),
        e
      ];
    },
    useSyncExternalStore: If,
    useId: Od,
    useHostTransitionStatus: Ys,
    useFormState: fd,
    useActionState: fd,
    useOptimistic: function(t, e) {
      var l = ue();
      return nd(l, $t, t, e);
    },
    useMemoCache: Cs,
    useCacheRefresh: zd,
    useEffectEvent: gd
  }, Fv = {
    readContext: Te,
    use: Di,
    useCallback: _d,
    useContext: Te,
    useEffect: Us,
    useImperativeHandle: Sd,
    useInsertionEffect: yd,
    useLayoutEffect: bd,
    useMemo: Ed,
    useReducer: ws,
    useRef: hd,
    useState: function() {
      return ws(Xl);
    },
    useDebugValue: Bs,
    useDeferredValue: function(t, e) {
      var l = ue();
      return $t === null ? Hs(l, t, e) : Td(
        l,
        $t.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = ws(Xl)[0], e = ue().memoizedState;
      return [
        typeof t == "boolean" ? t : Eu(t),
        e
      ];
    },
    useSyncExternalStore: If,
    useId: Od,
    useHostTransitionStatus: Ys,
    useFormState: md,
    useActionState: md,
    useOptimistic: function(t, e) {
      var l = ue();
      return $t !== null ? nd(l, $t, t, e) : (l.baseState = t, [t, l.queue.dispatch]);
    },
    useMemoCache: Cs,
    useCacheRefresh: zd,
    useEffectEvent: gd
  };
  function Gs(t, e, l, a) {
    e = t.memoizedState, l = l(a, e), l = l == null ? e : K({}, e, l), t.memoizedState = l, t.lanes === 0 && (t.updateQueue.baseState = l);
  }
  var Xs = {
    enqueueSetState: function(t, e, l) {
      t = t._reactInternals;
      var a = We(), n = na(a);
      n.payload = e, l != null && (n.callback = l), e = ua(t, n, a), e !== null && (Xe(e, t, a), yu(e, t, a));
    },
    enqueueReplaceState: function(t, e, l) {
      t = t._reactInternals;
      var a = We(), n = na(a);
      n.tag = 1, n.payload = e, l != null && (n.callback = l), e = ua(t, n, a), e !== null && (Xe(e, t, a), yu(e, t, a));
    },
    enqueueForceUpdate: function(t, e) {
      t = t._reactInternals;
      var l = We(), a = na(l);
      a.tag = 2, e != null && (a.callback = e), e = ua(t, a, l), e !== null && (Xe(e, t, l), yu(e, t, l));
    }
  };
  function Dd(t, e, l, a, n, u, c) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(a, u, c) : e.prototype && e.prototype.isPureReactComponent ? !ru(l, a) || !ru(n, u) : !0;
  }
  function Ud(t, e, l, a) {
    t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(l, a), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(l, a), e.state !== t && Xs.enqueueReplaceState(e, e.state, null);
  }
  function Ja(t, e) {
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
  function Bd(t) {
    mi(t);
  }
  function Hd(t) {
    console.error(t);
  }
  function Ld(t) {
    mi(t);
  }
  function qi(t, e) {
    try {
      var l = t.onUncaughtError;
      l(e.value, { componentStack: e.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function Yd(t, e, l) {
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
  function Vs(t, e, l) {
    return l = na(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      qi(t, e);
    }, l;
  }
  function qd(t) {
    return t = na(t), t.tag = 3, t;
  }
  function Gd(t, e, l, a) {
    var n = l.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var u = a.value;
      t.payload = function() {
        return n(u);
      }, t.callback = function() {
        Yd(e, l, a);
      };
    }
    var c = l.stateNode;
    c !== null && typeof c.componentDidCatch == "function" && (t.callback = function() {
      Yd(e, l, a), typeof n != "function" && (ma === null ? ma = /* @__PURE__ */ new Set([this]) : ma.add(this));
      var o = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: o !== null ? o : ""
      });
    });
  }
  function Wv(t, e, l, a, n) {
    if (l.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (e = l.alternate, e !== null && Ya(
        e,
        l,
        n,
        !0
      ), l = Ne.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
          case 19:
            return Ce === null ? cc() : l.alternate === null && ae === 0 && (ae = 3), l.flags &= -257, l.flags |= 65536, l.lanes = n, a === Mi ? l.flags |= 16384 : (e = l.updateQueue, e === null ? l.updateQueue = /* @__PURE__ */ new Set([a]) : e.add(a), Or(t, a, n)), !1;
          case 22:
            return l.flags |= 65536, a === Mi ? l.flags |= 16384 : (e = l.updateQueue, e === null ? (e = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, l.updateQueue = e) : (l = e.retryQueue, l === null ? e.retryQueue = /* @__PURE__ */ new Set([a]) : l.add(a)), Or(t, a, n)), !1;
        }
        throw Error(s(435, l.tag));
      }
      return Or(t, a, n), cc(), !1;
    }
    if (Tt)
      return e = Ne.current, e !== null ? ((e.flags & 65536) === 0 && (e.flags |= 256), e.flags |= 65536, e.lanes = n, a !== rs && (t = Error(s(422), { cause: a }), du(ll(t, l)))) : (a !== rs && (e = Error(s(423), {
        cause: a
      }), du(
        ll(e, l)
      )), t = t.current.alternate, t.flags |= 65536, n &= -n, t.lanes |= n, a = ll(a, l), n = Vs(
        t.stateNode,
        a,
        n
      ), ps(t, n), ae !== 4 && (ae = 2)), !1;
    var u = Error(s(520), { cause: a });
    if (u = ll(u, l), ju === null ? ju = [u] : ju.push(u), ae !== 4 && (ae = 2), e === null) return !0;
    a = ll(a, l), l = e;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, t = n & -n, l.lanes |= t, t = Vs(l.stateNode, a, t), ps(l, t), !1;
        case 1:
          if (e = l.type, u = l.stateNode, (l.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (ma === null || !ma.has(u))))
            return l.flags |= 65536, n &= -n, l.lanes |= n, n = qd(n), Gd(
              n,
              t,
              l,
              a
            ), ps(l, n), !1;
          break;
        case 22:
          if (l.memoizedState !== null)
            return l.flags |= 65536, !1;
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var Qs = Error(s(461)), oe = !1;
  function de(t, e, l, a) {
    e.child = t === null ? Zf(e, null, l, a) : Za(
      e,
      t.child,
      l,
      a
    );
  }
  function Xd(t, e, l, a, n) {
    l = l.render;
    var u = e.ref;
    if ("ref" in a) {
      var c = {};
      for (var o in a)
        o !== "ref" && (c[o] = a[o]);
    } else c = a;
    return qa(e), a = Ms(
      t,
      e,
      l,
      c,
      u,
      n
    ), o = Os(), t !== null && !oe ? (zs(t, e, n), Vl(t, e, n)) : (Tt && o && pi(e), e.flags |= 1, de(t, e, a, n), e.child);
  }
  function Vd(t, e, l, a, n) {
    if (t === null) {
      var u = l.type;
      return typeof u == "function" && !us(u) && u.defaultProps === void 0 && l.compare === null ? (e.tag = 15, e.type = u, Qd(
        t,
        e,
        u,
        a,
        n
      )) : (t = yi(
        l.type,
        null,
        a,
        e,
        e.mode,
        n
      ), t.ref = e.ref, t.return = e, e.child = t);
    }
    if (u = t.child, !Is(t, n)) {
      var c = u.memoizedProps;
      if (l = l.compare, l = l !== null ? l : ru, l(c, a) && t.ref === e.ref)
        return Vl(t, e, n);
    }
    return e.flags |= 1, t = Hl(u, a), t.ref = e.ref, t.return = e, e.child = t;
  }
  function Qd(t, e, l, a, n) {
    if (t !== null) {
      var u = t.memoizedProps;
      if (ru(u, a) && t.ref === e.ref)
        if (oe = !1, e.pendingProps = a = u, Is(t, n))
          (t.flags & 131072) !== 0 && (oe = !0);
        else
          return e.lanes = t.lanes, Vl(t, e, n);
    }
    return Zs(
      t,
      e,
      l,
      a,
      n
    );
  }
  function Zd(t, e, l, a) {
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
        return Kd(
          t,
          e,
          u,
          l,
          a
        );
      }
      if ((l & 536870912) !== 0)
        e.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Ni(
          e,
          u !== null ? u.cachePool : null
        ), u !== null ? $f(e, u) : _s(), kf(e);
      else
        return a = e.lanes = 536870912, Kd(
          t,
          e,
          u !== null ? u.baseLanes | l : l,
          l,
          a
        );
    } else
      u !== null ? (Ni(e, u.cachePool), $f(e, u), sa(), e.memoizedState = null) : (t !== null && Ni(e, null), _s(), sa());
    return de(t, e, n, l), e.child;
  }
  function Nu(t, e) {
    return t !== null && t.tag === 22 || e.stateNode !== null || (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), e.sibling;
  }
  function Kd(t, e, l, a, n) {
    var u = vs();
    return u = u === null ? null : { parent: se._currentValue, pool: u }, e.memoizedState = {
      baseLanes: l,
      cachePool: u
    }, t !== null && Ni(e, null), _s(), kf(e), t !== null && Ya(t, e, a, !0), e.childLanes = n, null;
  }
  function Gi(t, e) {
    return e = Xi(
      { mode: e.mode, children: e.children },
      t.mode
    ), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function Jd(t, e, l) {
    return Za(e, t.child, null, l), t = Gi(e, e.pendingProps), t.flags |= 2, Je(e), e.memoizedState = null, t;
  }
  function Iv(t, e, l) {
    var a = e.pendingProps, n = (e.flags & 128) !== 0;
    if (e.flags &= -129, t === null) {
      if (Tt) {
        if (a.mode === "hidden")
          return t = Gi(e, a), e.lanes = 536870912, t.memoizedState = { baseLanes: 0, cachePool: null }, Nu(null, t);
        if (Ts(e), (t = Wt) ? (t = ph(
          t,
          ul
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: Il !== null ? { id: bl, overflow: pl } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = Cf(t), l.return = e, e.child = l, ye = e, Wt = null)) : t = null, t === null) throw ta(e);
        return e.lanes = 536870912, null;
      }
      return Gi(e, a);
    }
    var u = t.memoizedState;
    if (u !== null) {
      var c = u.dehydrated;
      if (Ts(e), n)
        if (e.flags & 256)
          e.flags &= -257, e = Jd(
            t,
            e,
            l
          );
        else if (e.memoizedState !== null)
          e.child = t.child, e.flags |= 128, e = null;
        else throw Error(s(558));
      else if (oe || Ya(t, e, l, !1), n = (l & t.childLanes) !== 0, oe || n) {
        if (ia.current === null) {
          if (a = kt, a !== null && (c = wo(a, l), c !== 0 && c !== u.retryLane))
            throw u.retryLane = c, Ua(t, c), Xe(a, t, c), Qs;
          cc();
        }
        e = Jd(
          t,
          e,
          l
        );
      } else
        t = u.treeContext, Wt = cl(c.nextSibling), ye = e, Tt = !0, Pl = null, ul = !1, t !== null && Rf(e, t), e = Gi(e, a), e.flags |= 134221824;
      return e;
    }
    return t = Hl(t.child, {
      mode: a.mode,
      children: a.children
    }), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function zn(t, e) {
    var l = e.ref;
    if (l === null)
      t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object")
        throw Error(s(284));
      (t === null || t.ref !== l) && (e.flags |= 4194816);
    }
  }
  function Zs(t, e, l, a, n) {
    return qa(e), l = Ms(
      t,
      e,
      l,
      a,
      void 0,
      n
    ), a = Os(), t !== null && !oe ? (zs(t, e, n), Vl(t, e, n)) : (Tt && a && pi(e), e.flags |= 1, de(t, e, l, n), e.child);
  }
  function $d(t, e, l, a, n, u) {
    return qa(e), e.updateQueue = null, l = Wf(
      e,
      a,
      l,
      n
    ), Ff(t), a = Os(), t !== null && !oe ? (zs(t, e, u), Vl(t, e, u)) : (Tt && a && pi(e), e.flags |= 1, de(t, e, l, u), e.child);
  }
  function kd(t, e, l, a, n) {
    if (qa(e), e.stateNode === null) {
      var u = bn, c = l.contextType;
      typeof c == "object" && c !== null && (u = Te(c)), u = new l(a, u), e.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = Xs, e.stateNode = u, u._reactInternals = e, u = e.stateNode, u.props = a, u.state = e.memoizedState, u.refs = {}, ys(e), c = l.contextType, u.context = typeof c == "object" && c !== null ? Te(c) : bn, u.state = e.memoizedState, c = l.getDerivedStateFromProps, typeof c == "function" && (Gs(
        e,
        l,
        c,
        a
      ), u.state = e.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (c = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), c !== u.state && Xs.enqueueReplaceState(u, u.state, null), pu(e, a, u, n), bu(), u.state = e.memoizedState), typeof u.componentDidMount == "function" && (e.flags |= 4194308), a = !0;
    } else if (t === null) {
      u = e.stateNode;
      var o = e.memoizedProps, g = Ja(l, o);
      u.props = g;
      var N = u.context, A = l.contextType;
      c = bn, typeof A == "object" && A !== null && (c = Te(A));
      var B = l.getDerivedStateFromProps;
      A = typeof B == "function" || typeof u.getSnapshotBeforeUpdate == "function", o = e.pendingProps !== o, A || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (o || N !== c) && Ud(
        e,
        u,
        a,
        c
      ), aa = !1;
      var _ = e.memoizedState;
      u.state = _, pu(e, a, u, n), bu(), N = e.memoizedState, o || _ !== N || aa ? (typeof B == "function" && (Gs(
        e,
        l,
        B,
        a
      ), N = e.memoizedState), (g = aa || Dd(
        e,
        l,
        g,
        a,
        _,
        N,
        c
      )) ? (A || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = a, e.memoizedState = N), u.props = a, u.state = N, u.context = c, a = g) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), a = !1);
    } else {
      u = e.stateNode, bs(t, e), c = e.memoizedProps, A = Ja(l, c), u.props = A, B = e.pendingProps, _ = u.context, N = l.contextType, g = bn, typeof N == "object" && N !== null && (g = Te(N)), o = l.getDerivedStateFromProps, (N = typeof o == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (c !== B || _ !== g) && Ud(
        e,
        u,
        a,
        g
      ), aa = !1, _ = e.memoizedState, u.state = _, pu(e, a, u, n), bu();
      var O = e.memoizedState;
      c !== B || _ !== O || aa || t !== null && t.dependencies !== null && Ei(t.dependencies) ? (typeof o == "function" && (Gs(
        e,
        l,
        o,
        a
      ), O = e.memoizedState), (A = aa || Dd(
        e,
        l,
        A,
        a,
        _,
        O,
        g
      ) || t !== null && t.dependencies !== null && Ei(t.dependencies)) ? (N || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(a, O, g), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        a,
        O,
        g
      )), typeof u.componentDidUpdate == "function" && (e.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || c === t.memoizedProps && _ === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || c === t.memoizedProps && _ === t.memoizedState || (e.flags |= 1024), e.memoizedProps = a, e.memoizedState = O), u.props = a, u.state = O, u.context = g, a = A) : (typeof u.componentDidUpdate != "function" || c === t.memoizedProps && _ === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || c === t.memoizedProps && _ === t.memoizedState || (e.flags |= 1024), a = !1);
    }
    return u = a, zn(t, e), a = (e.flags & 128) !== 0, u || a ? (u = e.stateNode, l = a && typeof l.getDerivedStateFromError != "function" ? null : u.render(), e.flags |= 1, t !== null && a ? (e.child = Za(
      e,
      t.child,
      null,
      n
    ), e.child = Za(
      e,
      null,
      l,
      n
    )) : de(t, e, l, n), e.memoizedState = u.state, t = e.child) : t = Vl(
      t,
      e,
      n
    ), t;
  }
  function Fd(t, e, l, a) {
    return Ha(), e.flags |= 256, de(t, e, l, a), e.child;
  }
  var Ks = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Js(t) {
    return { baseLanes: t, cachePool: Yf() };
  }
  function $s(t, e, l) {
    return t = t !== null ? t.childLanes & ~l : 0, e && (t |= Fe), t;
  }
  function Wd(t, e, l) {
    var a = e.pendingProps, n = !1, u = (e.flags & 128) !== 0, c;
    if ((c = u) || (c = t !== null && t.memoizedState === null ? !1 : (xe.current & 2) !== 0), c && (n = !0, e.flags &= -129), c = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
      if (Tt) {
        if (n ? ca(e) : sa(), (t = Wt) ? (t = ph(
          t,
          ul
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: Il !== null ? { id: bl, overflow: pl } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = Cf(t), l.return = e, e.child = l, ye = e, Wt = null)) : t = null, t === null) throw ta(e);
        return Jr(t) ? e.lanes = 32 : e.lanes = 536870912, null;
      }
      return u = a.children, a = a.fallback, n ? (sa(), n = e.mode, u = Xi(
        { mode: "hidden", children: u },
        n
      ), a = Ba(
        a,
        n,
        l,
        null
      ), u.return = e, a.return = e, u.sibling = a, e.child = u, a = e.child, a.memoizedState = Js(l), a.childLanes = $s(
        t,
        c,
        l
      ), e.memoizedState = Ks, Nu(null, a)) : (ca(e), ks(e, u));
    }
    var o = t.memoizedState;
    if (o !== null) {
      var g = o.dehydrated;
      if (g !== null)
        return Pv(
          t,
          e,
          u,
          c,
          a,
          g,
          o,
          l
        );
    }
    return n ? (sa(), n = a.fallback, u = e.mode, o = t.child, g = o.sibling, a = Hl(o, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = o.subtreeFlags & 1206910976, g !== null ? n = Hl(g, n) : (n = Ba(
      n,
      u,
      l,
      null
    ), n.flags |= 2), n.return = e, a.return = e, a.sibling = n, e.child = a, Nu(null, a), a = e.child, n = t.child.memoizedState, n === null ? n = Js(l) : (u = n.cachePool, u !== null ? (o = se._currentValue, u = u.parent !== o ? { parent: o, pool: o } : u) : u = Yf(), n = {
      baseLanes: n.baseLanes | l,
      cachePool: u
    }), a.memoizedState = n, a.childLanes = $s(
      t,
      c,
      l
    ), e.memoizedState = Ks, Nu(t.child, a)) : (ca(e), l = t.child, t = l.sibling, l = Hl(l, {
      mode: "visible",
      children: a.children
    }), l.return = e, l.sibling = null, t !== null && (c = e.deletions, c === null ? (e.deletions = [t], e.flags |= 16) : c.push(t)), e.child = l, e.memoizedState = null, l);
  }
  function ks(t, e) {
    return e = Xi(
      { mode: "visible", children: e },
      t.mode
    ), e.return = t, t.child = e;
  }
  function Xi(t, e) {
    return t = Le(22, t, null, e), t.lanes = 0, t;
  }
  function Vi(t, e, l) {
    return Za(e, t.child, null, l), t = ks(
      e,
      e.pendingProps.children
    ), t.flags |= 2, e.memoizedState = null, t;
  }
  function Pv(t, e, l, a, n, u, c, o) {
    if (l)
      return e.flags & 256 ? (ca(e), e.flags &= -257, Vi(
        t,
        e,
        o
      )) : e.memoizedState !== null ? (sa(), e.child = t.child, e.flags |= 128, null) : (sa(), u = n.fallback, c = e.mode, n = Xi(
        { mode: "visible", children: n.children },
        c
      ), u = Ba(
        u,
        c,
        o,
        null
      ), u.flags |= 2, n.return = e, u.return = e, n.sibling = u, e.child = n, Za(e, t.child, null, o), n = e.child, n.memoizedState = Js(o), n.childLanes = $s(
        t,
        a,
        o
      ), e.memoizedState = Ks, Nu(null, n));
    if (ca(e), Jr(u)) {
      if (a = u.nextSibling && u.nextSibling.dataset, a) var g = a.dgst;
      return a = g, a !== "" && (n = Error(s(419)), n.stack = "", n.digest = a, du({ value: n, source: null, stack: null })), Vi(
        t,
        e,
        o
      );
    }
    if (oe || Ya(t, e, o, !1), a = (o & t.childLanes) !== 0, oe || a) {
      if (ia.current !== null)
        return Vi(
          t,
          e,
          o
        );
      if (a = kt, a !== null && (n = wo(
        a,
        o
      ), n !== 0 && n !== c.retryLane))
        throw c.retryLane = n, Ua(t, n), Xe(a, t, n), Qs;
      return Kr(u) || cc(), Vi(
        t,
        e,
        o
      );
    }
    return Kr(u) ? (e.flags |= 192, e.child = t.child, null) : (t = c.treeContext, Wt = cl(u.nextSibling), ye = e, Tt = !0, Pl = null, ul = !1, t !== null && Rf(e, t), e = ks(
      e,
      n.children
    ), e.flags |= 134221824, e);
  }
  function Id(t, e, l) {
    t.lanes |= e;
    var a = t.alternate;
    a !== null && (a.lanes |= e), _i(t.return, e, l);
  }
  function Pd(t) {
    for (var e = null; t !== null; ) {
      var l = t.alternate;
      l !== null && Ci(l) === null && (e = t), t = t.sibling;
    }
    return e;
  }
  function Qi(t, e, l, a, n, u) {
    var c = t.memoizedState;
    c === null ? t.memoizedState = {
      isBackwards: e,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: l,
      tailMode: n,
      treeForkCount: u
    } : (c.isBackwards = e, c.rendering = null, c.renderingStartTime = 0, c.last = a, c.tail = l, c.tailMode = n, c.treeForkCount = u);
  }
  function Fs(t) {
    var e = t.child;
    for (t.child = null; e !== null; ) {
      var l = e.sibling;
      e.sibling = t.child, t.child = e, e = l;
    }
  }
  function Ws(t, e, l) {
    var a = e.pendingProps, n = a.revealOrder, u = a.tail;
    a = a.children;
    var c = xe.current;
    if (e.flags & 128)
      return Su(e, c), null;
    var o = (c & 2) !== 0;
    if (o ? (c = c & 1 | 2, e.flags |= 128) : c &= 1, Su(e, c), n === "backwards" && t !== null ? (Fs(t), de(t, e, a, l), Fs(t)) : de(t, e, a, l), a = Tt ? fu : 0, !o && t !== null && (t.flags & 128) !== 0)
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && Id(t, l, e);
        else if (t.tag === 19)
          Id(t, l, e);
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
        l = Pd(e.child), l === null ? (n = e.child, e.child = null) : (n = l.sibling, l.sibling = null, Fs(e)), Qi(
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
          if (t = n.alternate, t !== null && Ci(t) === null) {
            e.child = n;
            break;
          }
          t = n.sibling, n.sibling = l, l = n, n = t;
        }
        Qi(
          e,
          !0,
          l,
          null,
          u,
          a
        );
        break;
      case "together":
        Qi(
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
        l = Pd(e.child), l === null ? (n = e.child, e.child = null) : (n = l.sibling, l.sibling = null), Qi(
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
  function tm(t, e, l) {
    var a = e.pendingProps;
    return ea(e, e.type, a.value), de(t, e, a.children, l), e.child;
  }
  function Vl(t, e, l) {
    if (t !== null && (e.dependencies = t.dependencies), da |= e.lanes, (l & e.childLanes) === 0)
      if (t !== null) {
        if (Ya(
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
      for (t = e.child, l = Hl(t, t.pendingProps), e.child = l, l.return = e; t.sibling !== null; )
        t = t.sibling, l = l.sibling = Hl(t, t.pendingProps), l.return = e;
      l.sibling = null;
    }
    return e.child;
  }
  function Is(t, e) {
    return (t.lanes & e) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Ei(t)));
  }
  function tg(t, e, l) {
    switch (e.tag) {
      case 3:
        ce(e, e.stateNode.containerInfo), ea(e, se, t.memoizedState.cache), Ha();
        break;
      case 27:
      case 5:
        Jl(e);
        break;
      case 4:
        ce(e, e.stateNode.containerInfo);
        break;
      case 10:
        ea(
          e,
          e.type,
          e.memoizedProps.value
        );
        break;
      case 31:
        if (e.memoizedState !== null)
          return e.flags |= 128, Ts(e), null;
        break;
      case 13:
        var a = e.memoizedState;
        if (a !== null) {
          if (a.dehydrated !== null)
            return ca(e), e.flags |= 128, null;
          a = Ya(
            t,
            e,
            l,
            !1
          );
          var n = e.child.childLanes;
          return a || (l & n) !== 0 ? Wd(t, e, l) : (ca(e), t = Vl(
            t,
            e,
            l
          ), t !== null ? t.sibling : null);
        }
        ca(e);
        break;
      case 19:
        if (e.flags & 128)
          return Ws(
            t,
            e,
            l
          );
        if (n = (t.flags & 128) !== 0, a = (l & e.childLanes) !== 0, a || (Ya(
          t,
          e,
          l,
          !1
        ), a = (l & e.childLanes) !== 0), n) {
          if (a)
            return Ws(
              t,
              e,
              l
            );
          e.flags |= 128;
        }
        if (n = e.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), Su(e, xe.current), a) break;
        return null;
      case 22:
        return e.lanes = 0, Zd(
          t,
          e,
          l,
          e.pendingProps
        );
      case 24:
        ea(e, se, t.memoizedState.cache);
    }
    return Vl(t, e, l);
  }
  function em(t, e, l) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps)
        oe = !0;
      else {
        if (!Is(t, l) && (e.flags & 128) === 0)
          return oe = !1, tg(
            t,
            e,
            l
          );
        oe = (t.flags & 131072) !== 0;
      }
    else
      oe = !1, Tt && (e.flags & 1048576) !== 0 && wf(e, fu, e.index);
    switch (e.lanes = 0, e.tag) {
      case 16:
        t: {
          var a = e.pendingProps;
          if (t = Va(e.elementType), e.type = t, typeof t == "function")
            us(t) ? (a = Ja(t, a), e.tag = 1, e = kd(
              null,
              e,
              t,
              a,
              l
            )) : (e.tag = 0, e = Zs(
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
                e.tag = 11, e = Xd(
                  null,
                  e,
                  t,
                  a,
                  l
                );
                break t;
              } else if (n === gt) {
                e.tag = 14, e = Vd(
                  null,
                  e,
                  t,
                  a,
                  l
                );
                break t;
              } else if (n === Bt) {
                e.tag = 10, e.type = t, e = tm(
                  null,
                  e,
                  l
                );
                break t;
              }
            }
            throw e = bt(t) || t, Error(s(306, e, ""));
          }
        }
        return e;
      case 0:
        return Zs(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 1:
        return a = e.type, n = Ja(
          a,
          e.pendingProps
        ), kd(
          t,
          e,
          a,
          n,
          l
        );
      case 3:
        t: {
          if (ce(
            e,
            e.stateNode.containerInfo
          ), t === null) throw Error(s(387));
          a = e.pendingProps;
          var u = e.memoizedState;
          n = u.element, bs(t, e), pu(e, a, null, l);
          var c = e.memoizedState;
          if (a = c.cache, ea(e, se, a), a !== u.cache && ds(
            e,
            [se],
            l,
            !0
          ), bu(), a = c.element, u.isDehydrated)
            if (u = {
              element: a,
              isDehydrated: !1,
              cache: c.cache
            }, e.updateQueue.baseState = u, e.memoizedState = u, e.flags & 256) {
              e = Fd(
                t,
                e,
                a,
                l
              );
              break t;
            } else if (a !== n) {
              n = ll(
                Error(s(424)),
                e
              ), du(n), e = Fd(
                t,
                e,
                a,
                l
              );
              break t;
            } else
              for (t = e.stateNode.containerInfo, t.nodeType === 9 ? t = t.body : t = t.nodeName === "HTML" ? t.ownerDocument.body : t, Wt = cl(t.firstChild), ye = e, Tt = !0, Pl = null, ul = !0, l = Zf(
                e,
                null,
                a,
                l
              ), e.child = l; l; )
                l.flags = l.flags & -3 | 134221824, l = l.sibling;
          else {
            if (Ha(), a === n) {
              e = Vl(
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
        return zn(t, e), t === null ? (l = Mh(
          e.type,
          null,
          e.pendingProps,
          null
        )) ? e.memoizedState = l : Tt || (e.stateNode = uh(
          e.type,
          e.pendingProps,
          Mt.current,
          e
        )) : e.memoizedState = Mh(
          e.type,
          t.memoizedProps,
          e.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return Jl(e), t === null && Tt && (a = e.stateNode = Eh(
          e.type,
          e.pendingProps,
          Mt.current
        ), ye = e, ul = !0, n = Wt, ga(e.type) ? ($r = n, Wt = cl(a.firstChild)) : Wt = n), de(
          t,
          e,
          e.pendingProps.children,
          l
        ), zn(t, e), t === null && (e.flags |= 4194304), e.child;
      case 5:
        return t === null && Tt && ((n = a = Wt) && (a = $g(
          a,
          e.type,
          e.pendingProps,
          ul
        ), a !== null ? (e.stateNode = a, ye = e, Wt = cl(a.firstChild), ul = !1, n = !0) : n = !1), n || ta(e)), Jl(e), n = e.type, u = e.pendingProps, c = t !== null ? t.memoizedProps : null, a = u.children, Yr(n, u) ? a = null : c !== null && Yr(n, c) && (e.flags |= 32), e.memoizedState !== null && (n = Ms(
          t,
          e,
          Vv,
          null,
          null,
          l
        ), Kn._currentValue = n), zn(t, e), de(t, e, a, l), e.child;
      case 6:
        return t === null && Tt && ((t = l = Wt) && (l = kg(
          l,
          e.pendingProps,
          ul
        ), l !== null ? (e.stateNode = l, ye = e, Wt = null, t = !0) : t = !1), t || ta(e)), null;
      case 13:
        return Wd(t, e, l);
      case 4:
        return ce(
          e,
          e.stateNode.containerInfo
        ), a = e.pendingProps, t === null ? e.child = Za(
          e,
          null,
          a,
          l
        ) : de(t, e, a, l), e.child;
      case 11:
        return Xd(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 7:
        return a = e.pendingProps, zn(t, e), de(t, e, a, l), e.child;
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
        return tm(t, e, l);
      case 9:
        return n = e.type._context, a = e.pendingProps.children, qa(e), n = Te(n), a = a(n), e.flags |= 1, de(t, e, a, l), e.child;
      case 14:
        return Vd(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 15:
        return Qd(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 19:
        return Ws(t, e, l);
      case 31:
        return Iv(t, e, l);
      case 22:
        return Zd(
          t,
          e,
          l,
          e.pendingProps
        );
      case 24:
        return qa(e), a = Te(se), t === null ? (n = vs(), n === null && (n = kt, u = ms(), n.pooledCache = u, u.refCount++, u !== null && (n.pooledCacheLanes |= l), n = u), e.memoizedState = { parent: a, cache: n }, ys(e), ea(e, se, n)) : ((t.lanes & l) !== 0 && (bs(t, e), pu(e, null, null, l), bu()), n = t.memoizedState, u = e.memoizedState, n.parent !== a ? (n = { parent: a, cache: a }, e.memoizedState = n, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = n), ea(e, se, a)) : (a = u.cache, ea(e, se, a), a !== n.cache && ds(
          e,
          [se],
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
        }), a = e.pendingProps, a.name != null && a.name !== "auto" ? e.flags |= t === null ? 18882560 : 18874368 : Tt && pi(e), t !== null && t.memoizedProps.name !== a.name ? e.flags |= 4194816 : zn(t, e), de(t, e, a.children, l), e.child;
      case 29:
        throw e.pendingProps;
    }
    throw Error(s(156, e.tag));
  }
  function Ql(t) {
    t.flags |= 4;
  }
  function Ps(t, e, l, a, n) {
    var u;
    if ((u = (t.mode & 32) !== 0) && (u = l === null ? Ch(e, a) : Ch(e, a) && (a.src !== l.src || a.srcSet !== l.srcSet)), u) {
      if (t.flags |= 16777216, (n & 335544128) === n)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (Bm()) t.flags |= 8192;
        else
          throw Qa = Mi, gs;
    } else t.flags &= -16777217;
  }
  function lm(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !jh(e))
      if (Bm()) t.flags |= 8192;
      else
        throw Qa = Mi, gs;
  }
  function Zi(t, e) {
    e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? Ao() : 536870912, t.lanes |= e, Rn |= e);
  }
  function xu(t, e) {
    if (!Tt)
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
  function eg(t, e, l) {
    var a = e.pendingProps;
    switch (ss(e), e.tag) {
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
        return l = e.stateNode, a = null, t !== null && (a = t.memoizedState.cache), e.memoizedState.cache !== a && (e.flags |= 2048), ql(se), Ut(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (t === null || t.child === null) && (_n(e) ? Ql(e) : t === null || t.memoizedState.isDehydrated && (e.flags & 256) === 0 || (e.flags |= 1024, os())), It(e), null;
      case 26:
        var n = e.type, u = e.memoizedState;
        return t === null ? (Ql(e), u !== null ? (It(e), lm(e, u)) : (It(e), Ps(
          e,
          n,
          null,
          a,
          l
        ))) : u ? u !== t.memoizedState ? (Ql(e), It(e), lm(e, u)) : (It(e), e.flags &= -16777217) : (t = t.memoizedProps, t !== a && Ql(e), It(e), Ps(
          e,
          n,
          t,
          a,
          l
        )), null;
      case 27:
        if ($l(e), l = Mt.current, n = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== a && Ql(e);
        else {
          if (!a) {
            if (e.stateNode === null)
              throw Error(s(166));
            return It(e), e.subtreeFlags &= -33554433, null;
          }
          t = Y.current, _n(e) ? Df(e) : (t = Eh(n, a, l), e.stateNode = t, Ql(e));
        }
        return It(e), e.subtreeFlags &= -33554433, null;
      case 5:
        if ($l(e), n = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== a && Ql(e);
        else {
          if (!a) {
            if (e.stateNode === null)
              throw Error(s(166));
            return It(e), e.subtreeFlags &= -33554433, null;
          }
          if (u = Y.current, _n(e))
            Df(e);
          else {
            var c = Bu(
              Mt.current
            );
            switch (u) {
              case 1:
                u = c.createElementNS(
                  "http://www.w3.org/2000/svg",
                  n
                );
                break;
              case 2:
                u = c.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  n
                );
                break;
              default:
                switch (n) {
                  case "svg":
                    u = c.createElementNS(
                      "http://www.w3.org/2000/svg",
                      n
                    );
                    break;
                  case "math":
                    u = c.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      n
                    );
                    break;
                  case "script":
                    u = c.createElement("div"), u.innerHTML = "<script><\/script>", u = u.removeChild(
                      u.firstChild
                    );
                    break;
                  case "select":
                    u = typeof a.is == "string" ? c.createElement("select", {
                      is: a.is
                    }) : c.createElement("select"), a.multiple ? u.multiple = !0 : a.size && (u.size = a.size);
                    break;
                  default:
                    u = typeof a.is == "string" ? c.createElement(n, { is: a.is }) : c.createElement(n);
                }
            }
            u[Ee] = e, u[He] = a;
            t: for (c = e.child; c !== null; ) {
              if (c.tag === 5 || c.tag === 6)
                u.appendChild(c.stateNode);
              else if (c.tag !== 4 && c.tag !== 27 && c.child !== null) {
                c.child.return = c, c = c.child;
                continue;
              }
              if (c === e) break t;
              for (; c.sibling === null; ) {
                if (c.return === null || c.return === e)
                  break t;
                c = c.return;
              }
              c.sibling.return = c.return, c = c.sibling;
            }
            e.stateNode = u;
            t: switch (Oe(u, n, a), n) {
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
            a && Ql(e);
          }
        }
        return It(e), e.subtreeFlags &= -33554433, Ps(
          e,
          e.type,
          t === null ? null : t.memoizedProps,
          e.pendingProps,
          l
        ), null;
      case 6:
        if (t && e.stateNode != null)
          t.memoizedProps !== a && Ql(e);
        else {
          if (typeof a != "string" && e.stateNode === null)
            throw Error(s(166));
          if (t = Mt.current, _n(e)) {
            if (t = e.stateNode, l = e.memoizedProps, a = null, n = ye, n !== null)
              switch (n.tag) {
                case 27:
                case 5:
                  a = n.memoizedProps;
              }
            t[Ee] = e, t = !!(t.nodeValue === l || a !== null && a.suppressHydrationWarning === !0 || eh(t.nodeValue, l)), t || ta(e, !0);
          } else
            t = Bu(t).createTextNode(
              a
            ), t[Ee] = e, e.stateNode = t;
        }
        return It(e), null;
      case 31:
        if (l = e.memoizedState, t === null || t.memoizedState !== null) {
          if (a = _n(e), l !== null) {
            if (t === null) {
              if (!a) throw Error(s(318));
              if (t = e.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(557));
              t[Ee] = e;
            } else
              Ha(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            It(e), t = !1;
          } else
            l = os(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = l), t = !0;
          if (!t)
            return e.flags & 256 ? (Je(e), e) : (Je(e), null);
          if ((e.flags & 128) !== 0)
            throw Error(s(558));
        }
        return It(e), null;
      case 13:
        if (a = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (n = _n(e), a !== null && a.dehydrated !== null) {
            if (t === null) {
              if (!n) throw Error(s(318));
              if (n = e.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(s(317));
              n[Ee] = e;
            } else
              Ha(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            It(e), n = !1;
          } else
            n = os(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return e.flags & 256 ? (Je(e), e) : (Je(e), null);
        }
        return Je(e), (e.flags & 128) !== 0 ? (e.lanes = l, e) : (l = a !== null, t = t !== null && t.memoizedState !== null, l && (a = e.child, n = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (n = a.alternate.memoizedState.cachePool.pool), u = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (u = a.memoizedState.cachePool.pool), u !== n && (a.flags |= 2048)), l !== t && l && (e.child.flags |= 8192), Zi(e, e.updateQueue), It(e), null);
      case 4:
        return Ut(), t === null && Dr(e.stateNode.containerInfo), e.flags |= 67108864, It(e), null;
      case 10:
        return ql(e.type), It(e), null;
      case 19:
        if (Ns(e), a = e.memoizedState, a === null) return It(e), null;
        if (n = (e.flags & 128) !== 0, u = a.rendering, u === null)
          if (n) xu(a, !1);
          else {
            if (ae !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = e.child; t !== null; ) {
                if (u = Ci(t), u !== null) {
                  for (e.flags |= 128, xu(a, !1), t = u.updateQueue, e.updateQueue = t, Zi(e, t), e.subtreeFlags = 0, t = l, l = e.child; l !== null; )
                    Af(l, t), l = l.sibling;
                  return Su(
                    e,
                    xe.current & 1 | 2
                  ), Tt && Ll(e, a.treeForkCount), e.child;
                }
                t = t.sibling;
              }
            a.tail !== null && Yt() > ac && (e.flags |= 128, n = !0, xu(a, !1), e.lanes = 4194304);
          }
        else {
          if (!n)
            if (t = Ci(u), t !== null) {
              if (e.flags |= 128, n = !0, t = t.updateQueue, e.updateQueue = t, Zi(e, t), xu(a, !0), a.tail === null && a.tailMode !== "collapsed" && a.tailMode !== "visible" && !u.alternate && !Tt)
                return It(e), null;
            } else
              2 * Yt() - a.renderingStartTime > ac && l !== 536870912 && (e.flags |= 128, n = !0, xu(a, !1), e.lanes = 4194304);
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
          return a.rendering = t, a.tail = t.sibling, a.renderingStartTime = Yt(), t.sibling = null, u = xe.current, u = n ? u & 1 | 2 : u & 1, a.tailMode === "visible" || a.tailMode === "collapsed" || !l || Tt ? Su(e, u) : (l = u, Et(Ne, e), Et(xe, l), Ce === null && (Ce = e)), Tt && Ll(e, a.treeForkCount), t;
        }
        return It(e), null;
      case 22:
      case 23:
        return Je(e), Es(), a = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== a && (e.flags |= 8192) : a && (e.flags |= 8192), a ? (l & 536870912) !== 0 && (e.flags & 128) === 0 && (It(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : It(e), l = e.updateQueue, l !== null && Zi(e, l.retryQueue), l = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), a = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), a !== l && (e.flags |= 2048), t !== null && Ht(Xa), null;
      case 24:
        return l = null, t !== null && (l = t.memoizedState.cache), e.memoizedState.cache !== l && (e.flags |= 2048), ql(se), It(e), null;
      case 25:
        return null;
      case 30:
        return e.flags |= 33554432, It(e), null;
    }
    throw Error(s(156, e.tag));
  }
  function lg(t, e) {
    switch (ss(e), e.tag) {
      case 1:
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 3:
        return ql(se), Ut(), t = e.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (e.flags = t & -65537 | 128, e) : null;
      case 26:
      case 27:
      case 5:
        return $l(e), null;
      case 31:
        if (e.memoizedState !== null) {
          if (Je(e), e.alternate === null)
            throw Error(s(340));
          Ha();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 13:
        if (Je(e), t = e.memoizedState, t !== null && t.dehydrated !== null) {
          if (e.alternate === null)
            throw Error(s(340));
          Ha();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 19:
        return Ns(e), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, t = e.memoizedState, t !== null && (t.rendering = null, t.tail = null), e.flags |= 4, e) : null;
      case 4:
        return Ut(), null;
      case 10:
        return ql(e.type), null;
      case 22:
      case 23:
        return Je(e), Es(), t !== null && Ht(Xa), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 24:
        return ql(se), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function am(t, e) {
    switch (ss(e), e.tag) {
      case 3:
        ql(se), Ut();
        break;
      case 26:
      case 27:
      case 5:
        $l(e);
        break;
      case 4:
        Ut();
        break;
      case 31:
        e.memoizedState !== null && Je(e);
        break;
      case 13:
        Je(e);
        break;
      case 19:
        Ns(e);
        break;
      case 10:
        ql(e.type);
        break;
      case 22:
      case 23:
        Je(e), Es(), t !== null && Ht(Xa);
        break;
      case 24:
        ql(se);
    }
  }
  function Mu(t, e) {
    try {
      var l = e.updateQueue, a = l !== null ? l.lastEffect : null;
      if (a !== null) {
        var n = a.next;
        l = n;
        do {
          if ((l.tag & t) === t) {
            a = void 0;
            var u = l.create, c = l.inst;
            a = u(), c.destroy = a;
          }
          l = l.next;
        } while (l !== n);
      }
    } catch (o) {
      Zt(e, e.return, o);
    }
  }
  function ra(t, e, l) {
    try {
      var a = e.updateQueue, n = a !== null ? a.lastEffect : null;
      if (n !== null) {
        var u = n.next;
        a = u;
        do {
          if ((a.tag & t) === t) {
            var c = a.inst, o = c.destroy;
            if (o !== void 0) {
              c.destroy = void 0, n = e;
              var g = l, N = o;
              try {
                N();
              } catch (A) {
                Zt(
                  n,
                  g,
                  A
                );
              }
            }
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (A) {
      Zt(e, e.return, A);
    }
  }
  function nm(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var l = t.stateNode;
      try {
        Jf(e, l);
      } catch (a) {
        Zt(t, t.return, a);
      }
    }
  }
  function um(t, e, l) {
    l.props = Ja(
      t.type,
      t.memoizedProps
    ), l.state = t.memoizedState;
    try {
      l.componentWillUnmount();
    } catch (a) {
      Zt(t, e, a);
    }
  }
  function Sl(t, e) {
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
            var n = t.stateNode, u = Ul(t.memoizedProps, n);
            (n.ref === null || n.ref.name !== u) && (n.ref = dh(u)), a = n.ref;
            break;
          case 7:
            if (t.stateNode === null) {
              var c = new Ie(t);
              v(
                t.child,
                !1,
                Kg,
                c,
                void 0,
                void 0
              ), t.stateNode = c;
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
  function Me(t, e) {
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
  function Ki(t, e) {
    if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && t.alternate === null && e !== null)
      for (var l = 0; l < e.length; l++)
        bh(
          t.stateNode,
          e[l]
        );
  }
  function im(t) {
    for (var e = t.return; e !== null && (er(e) && bh(t.stateNode, e.stateNode), !tr(e)); )
      e = e.return;
  }
  function Ou(t) {
    for (var e = t.return; e !== null && (er(e) && Jg(t.stateNode, e.stateNode), !tr(e)); )
      e = e.return;
  }
  function tr(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 27;
  }
  function er(t) {
    return t && t.tag === 7 && t.stateNode !== null;
  }
  function lr(t) {
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
  function ar(t, e, l) {
    try {
      var a = t.stateNode;
      zg(a, t.type, l, e), a[He] = e;
    } catch (n) {
      Zt(t, t.return, n);
    }
  }
  function cm(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && ga(t.type) || t.tag === 4;
  }
  function nr(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || cm(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && ga(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function ur(t, e, l, a) {
    var n = t.tag;
    if (n === 5 || n === 6)
      n = t.stateNode, e ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(n, e) : (e = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, e.appendChild(n), l = l._reactRootContainer, l != null || e.onclick !== null || (e.onclick = yl)), Ki(t, a), Lt = !0;
    else if (n !== 4 && (n === 27 && (Ki(t, a), a = null, ga(t.type) && (l = t.stateNode, e = null)), t = t.child, t !== null))
      for (ur(
        t,
        e,
        l,
        a
      ), t = t.sibling; t !== null; )
        ur(
          t,
          e,
          l,
          a
        ), t = t.sibling;
  }
  function Ji(t, e, l, a) {
    var n = t.tag;
    if (n === 5 || n === 6)
      n = t.stateNode, e ? l.insertBefore(n, e) : l.appendChild(n), Ki(t, a), Lt = !0;
    else if (n !== 4 && (n === 27 && (Ki(t, a), a = null, ga(t.type) && (l = t.stateNode)), t = t.child, t !== null))
      for (Ji(
        t,
        e,
        l,
        a
      ), t = t.sibling; t !== null; )
        Ji(
          t,
          e,
          l,
          a
        ), t = t.sibling;
  }
  function sm(t) {
    var e = t.stateNode, l = t.memoizedProps;
    try {
      for (var a = t.type, n = e.attributes; n.length; )
        e.removeAttributeNode(n[0]);
      Oe(e, a, l), e[Ee] = t, e[He] = l;
    } catch (u) {
      Zt(t, t.return, u);
    }
  }
  var $i = !1, $e = null;
  function rm(t) {
    (t.tag === 30 || (t.subtreeFlags & 33554432) !== 0) && ($i = !0);
  }
  var _l = null;
  function om() {
    var t = _l;
    return _l = null, t;
  }
  var Ye = 0;
  function An(t, e, l, a, n) {
    return Ye = 0, fm(
      t.child,
      e,
      l,
      a,
      n
    );
  }
  function fm(t, e, l, a, n) {
    for (var u = !1; t !== null; ) {
      if (t.tag === 5) {
        var c = t.stateNode;
        if (a !== null) {
          var o = Xr(c);
          a.push(o), o.view && (u = !0);
        } else
          u || Xr(c).view && (u = !0);
        $i = !0, oh(
          c,
          Ye === 0 ? e : e + "_" + Ye,
          l
        ), Ye++;
      } else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && n || fm(
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
  function El(t, e) {
    for (; t !== null; )
      t.tag === 5 ? fh(t.stateNode, t.memoizedProps) : (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && e || El(
        t.child,
        e
      )), t = t.sibling;
  }
  function ki(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if ((t.tag !== 22 || t.memoizedState === null) && (ki(t), t.tag === 30 && (t.flags & 18874368) !== 0 && t.stateNode.paired)) {
          var e = t.memoizedProps;
          if (e.name == null || e.name === "auto")
            throw Error(s(544));
          var l = e.name;
          e = Bl(e.default, e.share), e !== "none" && (An(
            t,
            l,
            e,
            null,
            !1
          ) || El(t.child, !1));
        }
        t = t.sibling;
      }
  }
  function ir(t, e) {
    if (t.tag === 30) {
      var l = t.stateNode, a = t.memoizedProps, n = Ul(a, l), u = Bl(
        a.default,
        l.paired ? a.share : a.enter
      );
      u !== "none" ? An(t, n, u, null, !1) ? (ki(t), l.paired || e || Hn(t, a.onEnter)) : El(t.child, !1) : ki(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        ir(t, e), t = t.sibling;
    else ki(t);
  }
  function cr(t) {
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
                  var u = Bl(
                    l.default,
                    l.share
                  );
                  if (u !== "none" && (An(
                    t,
                    a,
                    u,
                    null,
                    !1
                  ) ? (u = t.stateNode, n.paired = u, u.paired = n, Hn(t, l.onShare)) : El(t.child, !1)), e.delete(a), e.size === 0) break;
                }
              }
            }
            cr(t);
          }
          t = t.sibling;
        }
    }
  }
  function sr(t) {
    if (t.tag === 30) {
      var e = t.memoizedProps, l = Ul(e, t.stateNode), a = $e !== null ? $e.get(l) : void 0, n = Bl(
        e.default,
        a !== void 0 ? e.share : e.exit
      );
      n !== "none" && (An(t, l, n, null, !1) ? a !== void 0 ? (n = t.stateNode, a.paired = n, n.paired = a, $e.delete(l), Hn(t, e.onShare)) : Hn(t, e.onExit) : El(t.child, !1)), $e !== null && cr(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        sr(t), t = t.sibling;
    else
      $e !== null && cr(t);
  }
  function dm(t) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var e = t.memoizedProps, l = Ul(e, t.stateNode);
        e = Bl(e.default, e.update), t.flags &= -5, e !== "none" && An(
          t,
          l,
          e,
          t.memoizedState = [],
          !1
        );
      } else
        (t.subtreeFlags & 33554432) !== 0 && dm(t);
      t = t.sibling;
    }
  }
  function rr(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if (t.tag !== 22 || t.memoizedState === null) {
          if (t.tag === 30 && (t.flags & 18874368) !== 0) {
            var e = t.stateNode;
            e.paired !== null && (e.paired = null, El(t.child, !1));
          }
          rr(t);
        }
        t = t.sibling;
      }
  }
  function Fi(t) {
    if (t.tag === 30)
      t.stateNode.paired = null, El(t.child, !1), rr(t);
    else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        Fi(t), t = t.sibling;
    else rr(t);
  }
  function mm(t) {
    for (t = t.child; t !== null; )
      t.tag === 30 ? El(t.child, !1) : (t.subtreeFlags & 33554432) !== 0 && mm(t), t = t.sibling;
  }
  function or(t, e, l, a, n, u, c) {
    for (var o = !1; e !== null; ) {
      if (e.tag === 5) {
        var g = e.stateNode;
        if (u !== null && Ye < u.length) {
          var N = u[Ye], A = Xr(g);
          (N.view || A.view) && (o = !0);
          var B;
          if (B = (t.flags & 4) === 0)
            if (A.clip) B = !0;
            else {
              B = N.rect;
              var _ = A.rect;
              B = B.y !== _.y || B.x !== _.x || B.height !== _.height || B.width !== _.width;
            }
          B && (t.flags |= 4), A.abs ? A = !N.abs : (N = N.rect, A = A.rect, A = N.height !== A.height || N.width !== A.width), A && (t.flags |= 32);
        } else t.flags |= 32;
        (t.flags & 4) !== 0 && oh(
          g,
          Ye === 0 ? l : l + "_" + Ye,
          n
        ), o && (t.flags & 4) !== 0 || (_l === null && (_l = []), _l.push(
          g,
          Ye === 0 ? a : a + "_" + Ye,
          e.memoizedProps
        )), Ye++;
      } else (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && c ? t.flags |= e.flags & 32 : or(
        t,
        e.child,
        l,
        a,
        n,
        u,
        c
      ) && (o = !0));
      e = e.sibling;
    }
    return o;
  }
  function hm(t, e) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var l = t.memoizedProps, a = t.stateNode, n = Ul(l, a), u = Bl(l.default, l.update), c;
        c = t.memoizedState, t.memoizedState = null, a = t;
        var o = t.child;
        Ye = 0, n = or(
          a,
          o,
          n,
          n,
          u,
          c,
          !1
        ), (t.flags & 4) !== 0 && n && Hn(t, l.onUpdate);
      } else
        (t.subtreeFlags & 33554432) !== 0 && hm(t);
      t = t.sibling;
    }
  }
  var be = !1, Xt = !1, Tl = !1, fr = !1, vm = typeof WeakSet == "function" ? WeakSet : Set, pe = null, Nl = !1, zu = !1, Wi = !1, dr = !1;
  function ag(t, e, l) {
    if (t = t.containerInfo, Hr = Jn, t = pf(t), Ic(t)) {
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
            var u = n.anchorOffset, c = n.focusNode;
            n = n.focusOffset;
            try {
              a.nodeType, c.nodeType;
            } catch {
              a = null;
              break t;
            }
            var o = 0, g = -1, N = -1, A = 0, B = 0, _ = t, O = null;
            e: for (; ; ) {
              for (var X; _ !== a || u !== 0 && _.nodeType !== 3 || (g = o + u), _ !== c || n !== 0 && _.nodeType !== 3 || (N = o + n), _.nodeType === 3 && (o += _.nodeValue.length), (X = _.firstChild) !== null; )
                O = _, _ = X;
              for (; ; ) {
                if (_ === t) break e;
                if (O === a && ++A === u && (g = o), O === c && ++B === n && (N = o), (X = _.nextSibling) !== null) break;
                _ = O, O = _.parentNode;
              }
              _ = X;
            }
            a = g === -1 || N === -1 ? null : { start: g, end: N };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (Lr = { focusedElem: t, selectionRange: a }, Jn = !1, l = (l & 335544064) === l, pe = e, e = l ? 9270 : 1024; pe !== null; ) {
      if (t = pe, l && (a = t.deletions, a !== null))
        for (u = 0; u < a.length; u++)
          l && sr(a[u]);
      if (t.alternate === null && (t.flags & 2) !== 0)
        l && rm(t), Ii(l);
      else {
        if (t.tag === 22) {
          if (a = t.alternate, t.memoizedState !== null) {
            a !== null && a.memoizedState === null && l && sr(a), Ii(l);
            continue;
          } else if (a !== null && a.memoizedState !== null) {
            l && rm(t), Ii(l);
            continue;
          }
        }
        a = t.child, (t.subtreeFlags & e) !== 0 && a !== null ? (a.return = t, pe = a) : (l && dm(t), Ii(l));
      }
    }
    $e = null;
  }
  function Ii(t) {
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
              var c = Ja(
                e.type,
                n
              );
              l = u.getSnapshotBeforeUpdate(
                c,
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
              Zr(a);
            else if (l === 1)
              switch (a.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  Zr(a);
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
          l && a !== null && (l = Ul(
            a.memoizedProps,
            a.stateNode
          ), n = e.memoizedProps, n = Bl(n.default, n.update), n !== "none" && An(
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
  function gm(t, e, l) {
    var a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        xl(t, l), a & 4 && Mu(5, l);
        break;
      case 1:
        if (xl(t, l), a & 4)
          if (t = l.stateNode, e === null)
            try {
              t.componentDidMount();
            } catch (c) {
              Zt(l, l.return, c);
            }
          else {
            var n = Ja(
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
            } catch (c) {
              Zt(
                l,
                l.return,
                c
              );
            }
          }
        a & 64 && nm(l), a & 512 && Sl(l, l.return);
        break;
      case 3:
        if (xl(t, l), a & 64 && (t = l.updateQueue, t !== null)) {
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
            Jf(t, e);
          } catch (c) {
            Zt(l, l.return, c);
          }
        }
        break;
      case 27:
        e === null && a & 4 && sm(l);
      case 26:
      case 5:
        xl(t, l), e === null && a & 4 && lr(l), a & 512 && Sl(l, l.return);
        break;
      case 12:
        xl(t, l);
        break;
      case 31:
        xl(t, l), a & 4 && Sm(t, l);
        break;
      case 13:
        xl(t, l), a & 4 && _m(t, l), a & 64 && (t = l.memoizedState, t !== null && (t = t.dehydrated, t !== null && (l = vg.bind(
          null,
          l
        ), Fg(t, l))));
        break;
      case 22:
        if (a = l.memoizedState !== null || be, !a) {
          var u = e !== null && e.memoizedState !== null || Xt;
          e = be, n = Xt, be = a, (Xt = u) && !n ? (a = 2, (l.subtreeFlags & 8772) !== 0 && (a |= 1), dl(
            t,
            l,
            a
          )) : xl(t, l), be = e, Xt = n;
        }
        break;
      case 30:
        xl(t, l), a & 512 && Sl(l, l.return);
        break;
      case 7:
        a & 512 && Sl(l, l.return);
      default:
        xl(t, l);
    }
  }
  function mr(t, e) {
    for (t = t.child; t !== null; )
      ym(t, e), t = t.sibling;
  }
  function ym(t, e) {
    switch (t.tag) {
      case 5:
      case 26:
        try {
          var l = t.stateNode;
          if (e) {
            var a = l.style;
            typeof a.setProperty == "function" ? a.setProperty("display", "none", "important") : a.display = "none";
          } else {
            var n = t.stateNode, u = t.memoizedProps.style, c = u != null && u.hasOwnProperty("display") ? u.display : null;
            n.style.display = c == null || typeof c == "boolean" ? "" : ("" + c).trim();
          }
        } catch (g) {
          Zt(t, t.return, g);
        }
        hr(t, e);
        break;
      case 6:
        try {
          t.stateNode.nodeValue = e ? "" : t.memoizedProps, Lt = !0;
        } catch (g) {
          Zt(t, t.return, g);
        }
        break;
      case 18:
        try {
          var o = t.stateNode;
          e ? rh(o, !0) : rh(t.stateNode, !1);
        } catch (g) {
          Zt(t, t.return, g);
        }
        break;
      case 22:
      case 23:
        t.memoizedState === null && mr(t, e);
        break;
      default:
        mr(t, e);
    }
  }
  function hr(t, e) {
    if (t.subtreeFlags & 67108864)
      for (t = t.child; t !== null; ) {
        t: {
          var l = t, a = e;
          switch (l.tag) {
            case 4:
              ym(l, a);
              break t;
            case 22:
              l.memoizedState === null && hr(l, a);
              break t;
            default:
              hr(l, a);
          }
        }
        t = t.sibling;
      }
  }
  function bm(t) {
    var e = t.alternate;
    e !== null && (t.alternate = null, bm(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && ai(e)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Pt = null, qe = !1;
  function ol(t, e, l) {
    for (l = l.child; l !== null; )
      pm(t, e, l), l = l.sibling;
  }
  function pm(t, e, l) {
    if (Ve && typeof Ve.onCommitFiberUnmount == "function")
      try {
        Ve.onCommitFiberUnmount(jl, l);
      } catch {
      }
    switch (l.tag) {
      case 26:
        Xt || Me(l, e), ol(
          t,
          e,
          l
        ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && !Xt && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        Xt || Me(l, e), Ou(l);
        var a = Pt, n = qe;
        ga(l.type) && (Pt = l.stateNode, qe = !1), ol(
          t,
          e,
          l
        ), Th(
          l.stateNode,
          l.type,
          l.memoizedProps
        ), Pt = a, qe = n;
        break;
      case 5:
        Xt || Me(l, e), Ou(l);
      case 6:
        if (l.tag === 6 && Ou(l), a = Pt, n = qe, Pt = null, ol(
          t,
          e,
          l
        ), Pt = a, qe = n, Pt !== null)
          if (qe)
            try {
              (Pt.nodeType === 9 ? Pt.body : Pt.nodeName === "HTML" ? Pt.ownerDocument.body : Pt).removeChild(l.stateNode), Lt = !0;
            } catch (u) {
              Zt(
                l,
                e,
                u
              );
            }
          else
            try {
              Pt.removeChild(l.stateNode), Lt = !0;
            } catch (u) {
              Zt(
                l,
                e,
                u
              );
            }
        break;
      case 18:
        Pt !== null && (qe ? (t = Pt, sh(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          l.stateNode
        ), $n(t)) : sh(Pt, l.stateNode));
        break;
      case 4:
        a = Pt, n = qe, Pt = l.stateNode.containerInfo, qe = !0, ol(
          t,
          e,
          l
        ), Pt = a, qe = n;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        ra(2, l, e), Xt || ra(4, l, e), ol(
          t,
          e,
          l
        );
        break;
      case 1:
        Xt || (Me(l, e), a = l.stateNode, typeof a.componentWillUnmount == "function" && um(
          l,
          e,
          a
        )), ol(
          t,
          e,
          l
        );
        break;
      case 21:
        ol(
          t,
          e,
          l
        );
        break;
      case 22:
        Xt = (a = Xt) || l.memoizedState !== null, ol(
          t,
          e,
          l
        ), Xt = a;
        break;
      case 30:
        Me(l, e), ol(
          t,
          e,
          l
        );
        break;
      case 7:
        Xt || Me(l, e), ol(
          t,
          e,
          l
        );
        break;
      default:
        ol(
          t,
          e,
          l
        );
    }
  }
  function Sm(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        $n(t);
      } catch (l) {
        Zt(e, e.return, l);
      }
    }
  }
  function _m(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        $n(t);
      } catch (l) {
        Zt(e, e.return, l);
      }
  }
  function ng(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return e === null && (e = t.stateNode = new vm()), e;
      case 22:
        return t = t.stateNode, e = t._retryCache, e === null && (e = t._retryCache = new vm()), e;
      default:
        throw Error(s(435, t.tag));
    }
  }
  function Pi(t, e) {
    var l = ng(t);
    e.forEach(function(a) {
      if (!l.has(a)) {
        l.add(a);
        var n = gg.bind(null, t, a);
        a.then(n, n);
      }
    });
  }
  function Ue(t, e, l) {
    var a = e.deletions;
    if (a !== null)
      for (var n = 0; n < a.length; n++) {
        var u = a[n], c = t, o = e, g = o;
        t: for (; g !== null; ) {
          switch (g.tag) {
            case 27:
              if (ga(g.type)) {
                Pt = g.stateNode, qe = !1;
                break t;
              }
              break;
            case 5:
              Pt = g.stateNode, qe = !1;
              break t;
            case 3:
            case 4:
              Pt = g.stateNode.containerInfo, qe = !0;
              break t;
          }
          g = g.return;
        }
        if (Pt === null) throw Error(s(160));
        pm(c, o, u), Pt = null, qe = !1, c = u.alternate, c !== null && (c.return = null), u.return = null;
      }
    if (e.subtreeFlags & 13886)
      for (e = e.child; e !== null; )
        Em(e, t, l), e = e.sibling;
  }
  var fl = null;
  function Em(t, e, l) {
    var a = t.alternate, n = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (n & 4 && (a = t.updateQueue, a = a !== null ? a.events : null, a !== null))
          for (var u = 0; u < a.length; u++) {
            var c = a[u];
            c.ref.impl = c.nextImpl;
          }
        Ue(e, t, l), Be(t), n & 4 && (ra(3, t, t.return), Mu(3, t), ra(5, t, t.return));
        break;
      case 1:
        Ue(e, t, l), Be(t), n & 512 && (Xt || a === null || Me(a, a.return)), n & 64 && be && (t = t.updateQueue, t !== null && (e = t.callbacks, e !== null && (l = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = l === null ? e : l.concat(e))));
        break;
      case 26:
        if (u = fl, Ue(e, t, l), Be(t), n & 512 && (Xt || a === null || Me(a, a.return)), n & 4)
          if (n = a !== null ? a.memoizedState : null, l = t.memoizedState, a === null)
            if (l === null)
              if (t.stateNode === null)
                if (be)
                  t.stateNode = uh(
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
                        a = n.getElementsByTagName("title")[0], (!a || a[tu] || a[Ee] || a.namespaceURI === "http://www.w3.org/2000/svg" || a.hasAttribute("itemprop")) && (a = n.createElement(e), n.head.insertBefore(
                          a,
                          n.querySelector("head > title")
                        )), Oe(a, e, l), a[Ee] = t, ge(a), e = a;
                        break t;
                      case "link":
                        if (u = Ah(
                          "link",
                          "href",
                          n
                        ).get(e + (l.href || ""))) {
                          for (c = 0; c < u.length; c++)
                            if (a = u[c], a.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && a.getAttribute("rel") === (l.rel == null ? null : l.rel) && a.getAttribute("title") === (l.title == null ? null : l.title) && a.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                              u.splice(c, 1);
                              break e;
                            }
                        }
                        a = n.createElement(e), Oe(a, e, l), n.head.appendChild(a);
                        break;
                      case "meta":
                        if (u = Ah(
                          "meta",
                          "content",
                          n
                        ).get(e + (l.content || ""))) {
                          for (c = 0; c < u.length; c++)
                            if (a = u[c], a.getAttribute("content") === (l.content == null ? null : "" + l.content) && a.getAttribute("name") === (l.name == null ? null : l.name) && a.getAttribute("property") === (l.property == null ? null : l.property) && a.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && a.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                              u.splice(c, 1);
                              break e;
                            }
                        }
                        a = n.createElement(e), Oe(a, e, l), n.head.appendChild(a);
                        break;
                      default:
                        throw Error(s(468, e));
                    }
                    a[Ee] = t, ge(a), e = a;
                  }
                  t.stateNode = e;
                }
              else
                be || Ir(u, t.type, t.stateNode);
            else
              t.stateNode = zh(
                u,
                l,
                t.memoizedProps
              );
          else
            n !== l ? (n === null ? (e = a.stateNode, e === null || Xt || e.parentNode.removeChild(e)) : n.count--, l === null ? be || Ir(u, t.type, t.stateNode) : zh(u, l, t.memoizedProps)) : l === null && t.stateNode !== null && ar(
              t,
              t.memoizedProps,
              a.memoizedProps
            );
        break;
      case 27:
        Ue(e, t, l), Be(t), n & 512 && (Xt || a === null || Me(a, a.return)), a !== null && n & 4 && ar(
          t,
          t.memoizedProps,
          a.memoizedProps
        );
        break;
      case 5:
        if (u = Tl, Tl = !1, Ue(e, t, l), Tl = u, Be(t), n & 512 && (Xt || a === null || Me(a, a.return)), t.flags & 32) {
          e = t.stateNode;
          try {
            fn(e, ""), Lt = !0;
          } catch (A) {
            Zt(t, t.return, A);
          }
        }
        n & 4 && t.stateNode != null && (e = t.memoizedProps, ar(
          t,
          e,
          a !== null ? a.memoizedProps : e
        )), n & 1024 && (fr = !0);
        break;
      case 6:
        if (Ue(e, t, l), Be(t), n & 4) {
          if (t.stateNode === null)
            throw Error(s(162));
          e = t.memoizedProps, l = t.stateNode;
          try {
            l.nodeValue = e, Lt = !0;
          } catch (A) {
            Zt(t, t.return, A);
          }
        }
        break;
      case 3:
        if (Lt = !1, hc = null, u = fl, fl = Hu(e.containerInfo), Ue(e, t, l), fl = u, Be(t), n & 4 && a !== null && a.memoizedState.isDehydrated)
          try {
            $n(e.containerInfo);
          } catch (A) {
            Zt(t, t.return, A);
          }
        fr && (fr = !1, Tm(t)), Lt = !1;
        break;
      case 4:
        n = Tl, Tl = be, a = Xo(), u = fl, fl = Hu(
          t.stateNode.containerInfo
        ), Ue(e, t, l), Be(t), fl = u, Lt && zu && (Wi = !0), Lt = a, Tl = n;
        break;
      case 12:
        Ue(e, t, l), Be(t);
        break;
      case 31:
        Ue(e, t, l), Be(t), n & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, Pi(t, e)));
        break;
      case 13:
        Ue(e, t, l), Be(t), t.child.flags & 8192 && t.memoizedState !== null != (a !== null && a.memoizedState !== null) && (lc = Yt()), n & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, Pi(t, e)));
        break;
      case 22:
        u = t.memoizedState !== null, c = a !== null && a.memoizedState !== null;
        var o = be, g = Xt, N = Tl;
        be = o || u, Tl = N || u, Xt = g || c, Ue(e, t, l), Xt = g, Tl = N, be = o, Be(t), n & 8192 && (e = t.stateNode, e._visibility = u ? e._visibility & -2 : e._visibility | 1, !u || a === null || c || be || Xt || (e = c || Xt, l = be, a = Xt, be = u || be, Xt = e, oa(t, 2), be = l, Xt = a), !u && Tl || mr(t, u)), n & 4 && (e = t.updateQueue, e !== null && (l = e.retryQueue, l !== null && (e.retryQueue = null, Pi(t, l))));
        break;
      case 19:
        Ue(e, t, l), Be(t), n & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, Pi(t, e)));
        break;
      case 30:
        n & 512 && (Xt || a === null || Me(a, a.return)), n = Xo(), u = zu, c = (l & 335544064) === l, o = t.memoizedProps, zu = c && Bl(
          o.default,
          o.update
        ) !== "none", Ue(e, t, l), Be(t), c && a !== null && Lt && (t.flags |= 4), zu = u, Lt = n;
        break;
      case 21:
        break;
      case 7:
        n & 512 && (Xt || a === null || Me(a, a.return)), a && a.stateNode !== null && (a.stateNode._fragmentFiber = t);
      default:
        Ue(e, t, l), Be(t);
    }
  }
  function Be(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        for (var l, a = t.return; a !== null; ) {
          if (cm(a)) {
            l = a;
            break;
          }
          a = a.return;
        }
        a = null;
        for (var n = t.return; n !== null; ) {
          if (er(n)) {
            var u = n.stateNode;
            a === null ? a = [u] : a.push(u);
          }
          if (tr(n)) break;
          n = n.return;
        }
        var c = a;
        if (l == null) throw Error(s(160));
        switch (l.tag) {
          case 27:
            var o = l.stateNode, g = nr(t);
            Ji(
              t,
              g,
              o,
              c
            );
            break;
          case 5:
            var N = l.stateNode;
            l.flags & 32 && (fn(N, ""), l.flags &= -33);
            var A = nr(t);
            Ji(
              t,
              A,
              N,
              c
            );
            break;
          case 3:
          case 4:
            var B = l.stateNode.containerInfo, _ = nr(t);
            ur(
              t,
              _,
              B,
              c
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
  function Tm(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        Tm(e), e.tag === 5 && e.flags & 1024 && (e = e.stateNode, Jn = !0, e.reset(), Jn = !1), t = t.sibling;
      }
  }
  function Cn(t, e) {
    if (e.subtreeFlags & 9270)
      for (e = e.child; e !== null; )
        Nm(e, t), e = e.sibling;
    else hm(e);
  }
  function Nm(t, e) {
    var l = t.alternate;
    if (l === null) ir(t, !1);
    else
      switch (t.tag) {
        case 3:
          if (dr = Nl = !1, om(), Cn(e, t), !Nl && !Wi) {
            if (t = _l, t !== null)
              for (var a = 0; a < t.length; a += 3) {
                l = t[a];
                var n = t[a + 1];
                fh(l, t[a + 2]), l = l.ownerDocument.documentElement, l !== null && l.animate(
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
            )), dr = !0;
          }
          _l = null;
          break;
        case 5:
          Cn(e, t);
          break;
        case 4:
          a = Nl, Nl = !1, Cn(e, t), Nl && (Wi = !0), Nl = a;
          break;
        case 22:
          t.memoizedState === null && (l.memoizedState !== null ? ir(t, !1) : Cn(e, t));
          break;
        case 30:
          a = Nl, n = om(), Nl = !1, Cn(e, t), Nl && (t.flags |= 4);
          var u = t.memoizedProps, c = t.stateNode;
          e = Ul(u, c), c = Ul(l.memoizedProps, c);
          var o = Bl(u.default, u.update);
          o === "none" ? e = !1 : (u = l.memoizedState, l.memoizedState = null, l = t.child, Ye = 0, e = or(
            t,
            l,
            e,
            c,
            o,
            u,
            !0
          ), Ye !== (u === null ? 0 : u.length) && (t.flags |= 32)), (t.flags & 4) !== 0 && e ? (Hn(
            t,
            t.memoizedProps.onUpdate
          ), _l = n) : n !== null && (n.push.apply(n, _l), _l = n), Nl = (t.flags & 32) !== 0 ? !0 : a;
          break;
        default:
          Cn(e, t);
      }
  }
  function xl(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; )
        gm(t, e.alternate, e), e = e.sibling;
  }
  function oa(t, e) {
    for (t = t.child; t !== null; ) {
      var l = t, a = e;
      switch (l.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ra(4, l, l.return), oa(
            l,
            a
          );
          break;
        case 1:
          Me(l, l.return);
          var n = l.stateNode;
          typeof n.componentWillUnmount == "function" && um(
            l,
            l.return,
            n
          ), oa(
            l,
            a
          );
          break;
        case 27:
          (a & 2) !== 0 && Th(
            l.stateNode,
            l.type,
            l.memoizedProps
          );
        case 5:
          Me(l, l.return), l.tag !== 5 && l.tag !== 27 || Ou(l), oa(
            l,
            a
          );
          break;
        case 6:
          Ou(l);
          break;
        case 26:
          Me(l, l.return), n = l.stateNode, l.memoizedState !== null || n === null || Xt || n.parentNode.removeChild(n), oa(
            l,
            a
          );
          break;
        case 22:
          l.memoizedState === null && oa(
            l,
            a
          );
          break;
        case 30:
          Me(l, l.return), oa(
            l,
            a
          );
          break;
        case 7:
          Me(l, l.return);
        default:
          oa(
            l,
            a
          );
      }
      t = t.sibling;
    }
  }
  function dl(t, e, l) {
    for (l = (e.subtreeFlags & 8772) !== 0 ? l : l & -2, e = e.child; e !== null; ) {
      var a = e.alternate, n = t, u = e, c = u.flags, o = (l & 1) !== 0;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          dl(
            n,
            u,
            l
          ), Mu(4, u);
          break;
        case 1:
          if (dl(
            n,
            u,
            l
          ), a = u, n = a.stateNode, typeof n.componentDidMount == "function")
            try {
              n.componentDidMount();
            } catch (A) {
              Zt(a, a.return, A);
            }
          if (a = u, n = a.updateQueue, n !== null) {
            var g = a.stateNode;
            try {
              var N = n.shared.hiddenCallbacks;
              if (N !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < N.length; n++)
                  Kf(N[n], g);
            } catch (A) {
              Zt(a, a.return, A);
            }
          }
          o && c & 64 && nm(u), Sl(u, u.return);
          break;
        case 27:
          (l & 2) !== 0 && sm(u);
        case 5:
          u.tag !== 5 && u.tag !== 27 || im(u), dl(
            n,
            u,
            l
          ), o && a === null && c & 4 && lr(u), Sl(u, u.return);
          break;
        case 6:
          im(u);
          break;
        case 26:
          g = u.stateNode, u.memoizedState !== null || g === null || be || Ir(
            Hu(g.ownerDocument),
            u.type,
            g
          ), dl(
            n,
            u,
            l
          ), o && a === null && c & 4 && lr(u), Sl(u, u.return);
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
          ), o && c & 4 && Sm(n, u);
          break;
        case 13:
          dl(
            n,
            u,
            l
          ), o && c & 4 && _m(n, u);
          break;
        case 22:
          u.memoizedState === null && dl(
            n,
            u,
            l
          ), Sl(u, u.return);
          break;
        case 30:
          dl(
            n,
            u,
            l
          ), Sl(u, u.return);
          break;
        case 7:
          Sl(u, u.return);
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
  function vr(t, e) {
    var l = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), t = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), t !== l && (t != null && t.refCount++, l != null && mu(l));
  }
  function gr(t, e) {
    t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && mu(t));
  }
  function il(t, e, l, a) {
    var n = (l & 335544064) === l;
    if (e.subtreeFlags & (n ? 10262 : 10256))
      for (e = e.child; e !== null; )
        xm(
          t,
          e,
          l,
          a
        ), e = e.sibling;
    else n && mm(e);
  }
  function xm(t, e, l, a) {
    var n = (l & 335544064) === l;
    n && e.alternate === null && e.return !== null && e.return.alternate !== null && Fi(e);
    var u = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        il(
          t,
          e,
          l,
          a
        ), u & 2048 && Mu(9, e);
        break;
      case 1:
        il(
          t,
          e,
          l,
          a
        );
        break;
      case 3:
        il(
          t,
          e,
          l,
          a
        ), n && dr && (t = t.containerInfo, t = t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, t.style.viewTransitionName === "root" && (t.style.viewTransitionName = ""), t = t.ownerDocument.documentElement, t !== null && t.style.viewTransitionName === "none" && (t.style.viewTransitionName = "")), u & 2048 && (u = null, e.alternate !== null && (u = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== u && (e.refCount++, u != null && mu(u)));
        break;
      case 12:
        if (u & 2048) {
          il(
            t,
            e,
            l,
            a
          ), u = e.stateNode;
          try {
            var c = e.memoizedProps, o = c.id, g = c.onPostCommit;
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
          il(
            t,
            e,
            l,
            a
          );
        break;
      case 31:
        il(
          t,
          e,
          l,
          a
        );
        break;
      case 13:
        il(
          t,
          e,
          l,
          a
        );
        break;
      case 23:
        break;
      case 22:
        c = e.stateNode, o = e.alternate, e.memoizedState !== null ? (n && o !== null && o.memoizedState === null && Fi(o), c._visibility & 2 ? il(
          t,
          e,
          l,
          a
        ) : Au(
          t,
          e
        )) : (n && o !== null && o.memoizedState !== null && Fi(e), c._visibility & 2 ? il(
          t,
          e,
          l,
          a
        ) : (c._visibility |= 2, jn(
          t,
          e,
          l,
          a,
          (e.subtreeFlags & 10256) !== 0 || !1
        ))), u & 2048 && vr(o, e);
        break;
      case 24:
        il(
          t,
          e,
          l,
          a
        ), u & 2048 && gr(e.alternate, e);
        break;
      case 30:
        n && (u = e.alternate, u !== null && (El(u.child, !0), El(e.child, !0))), il(
          t,
          e,
          l,
          a
        );
        break;
      default:
        il(
          t,
          e,
          l,
          a
        );
    }
  }
  function jn(t, e, l, a, n) {
    for (n = n && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var u = t, c = e, o = l, g = a, N = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          jn(
            u,
            c,
            o,
            g,
            n
          ), Mu(8, c);
          break;
        case 23:
          break;
        case 22:
          var A = c.stateNode;
          c.memoizedState !== null ? A._visibility & 2 ? jn(
            u,
            c,
            o,
            g,
            n
          ) : Au(
            u,
            c
          ) : (A._visibility |= 2, jn(
            u,
            c,
            o,
            g,
            n
          )), n && N & 2048 && vr(
            c.alternate,
            c
          );
          break;
        case 24:
          jn(
            u,
            c,
            o,
            g,
            n
          ), n && N & 2048 && gr(c.alternate, c);
          break;
        default:
          jn(
            u,
            c,
            o,
            g,
            n
          );
      }
      e = e.sibling;
    }
  }
  function Au(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var l = t, a = e, n = a.flags;
        switch (a.tag) {
          case 22:
            Au(l, a), n & 2048 && vr(
              a.alternate,
              a
            );
            break;
          case 24:
            Au(l, a), n & 2048 && gr(a.alternate, a);
            break;
          default:
            Au(l, a);
        }
        e = e.sibling;
      }
  }
  var $a = 8192;
  function ka(t, e, l) {
    if (t.subtreeFlags & $a)
      for (t = t.child; t !== null; )
        Mm(
          t,
          e,
          l
        ), t = t.sibling;
  }
  function Mm(t, e, l) {
    switch (t.tag) {
      case 26:
        ka(
          t,
          e,
          l
        ), t.flags & $a && (t.memoizedState !== null ? oy(
          l,
          fl,
          t.memoizedState,
          t.memoizedProps
        ) : (t = t.stateNode, (e & 335544128) === e && Rh(l, t)));
        break;
      case 5:
        ka(
          t,
          e,
          l
        ), t.flags & $a && (t = t.stateNode, (e & 335544128) === e && Rh(l, t));
        break;
      case 3:
      case 4:
        var a = fl;
        fl = Hu(t.stateNode.containerInfo), ka(
          t,
          e,
          l
        ), fl = a;
        break;
      case 22:
        t.memoizedState === null && (a = t.alternate, a !== null && a.memoizedState !== null ? (a = $a, $a = 16777216, ka(
          t,
          e,
          l
        ), $a = a) : ka(
          t,
          e,
          l
        ));
        break;
      case 30:
        if ((t.flags & $a) !== 0 && (a = t.memoizedProps.name, a != null && a !== "auto")) {
          var n = t.stateNode;
          n.paired = null, $e === null && ($e = /* @__PURE__ */ new Map()), $e.set(a, n);
        }
        ka(
          t,
          e,
          l
        );
        break;
      default:
        ka(
          t,
          e,
          l
        );
    }
  }
  function Om(t) {
    var e = t.alternate;
    if (e !== null && (t = e.child, t !== null)) {
      e.child = null;
      do
        e = t.sibling, t.sibling = null, t = e;
      while (t !== null);
    }
  }
  function Cu(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var a = e[l];
          pe = a, Am(
            a,
            t
          );
        }
      Om(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        zm(t), t = t.sibling;
  }
  function zm(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Cu(t), t.flags & 2048 && ra(9, t, t.return);
        break;
      case 3:
        Cu(t);
        break;
      case 12:
        Cu(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (e._visibility &= -3, tc(t)) : Cu(t);
        break;
      default:
        Cu(t);
    }
  }
  function tc(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var a = e[l];
          pe = a, Am(
            a,
            t
          );
        }
      Om(t);
    }
    for (t = t.child; t !== null; ) {
      switch (e = t, e.tag) {
        case 0:
        case 11:
        case 15:
          ra(8, e, e.return), tc(e);
          break;
        case 22:
          l = e.stateNode, l._visibility & 2 && (l._visibility &= -3, tc(e));
          break;
        default:
          tc(e);
      }
      t = t.sibling;
    }
  }
  function Am(t, e) {
    for (; pe !== null; ) {
      var l = pe;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          ra(8, l, e);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var a = l.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          mu(l.memoizedState.cache);
      }
      if (a = l.child, a !== null) a.return = l, pe = a;
      else
        t: for (l = t; pe !== null; ) {
          a = pe;
          var n = a.sibling, u = a.return;
          if (bm(a), a === l) {
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
  var ug = {
    getCacheForType: function(t) {
      var e = Te(se), l = e.data.get(t);
      return l === void 0 && (l = t(), e.data.set(t, l)), l;
    },
    cacheSignal: function() {
      return Te(se).controller.signal;
    }
  }, ig = typeof WeakMap == "function" ? WeakMap : Map, qt = 0, kt = null, Ot = null, At = 0, Qt = 0, ke = null, fa = !1, wn = !1, yr = !1, Zl = 0, ae = 0, da = 0, Fa = 0, ec = 0, Fe = 0, Rn = 0, ju = null, Ge = null, br = !1, lc = 0, Cm = 0, ac = 1 / 0, nc = null, ma = null, te = 0, ml = null, Wa = null, Ml = 0, pr = 0, Sr = null, jm = null, Dn = null, Un = null, Bn = null, wu = 0, uc = null;
  function We() {
    return (qt & 2) !== 0 && At !== 0 ? At & -At : J.T !== null ? Cr() : Ro();
  }
  function wm() {
    if (Fe === 0)
      if ((At & 536870912) === 0 || Tt) {
        var t = Pu;
        Pu <<= 1, (Pu & 3932160) === 0 && (Pu = 262144), Fe = t;
      } else Fe = 536870912;
    return t = Ne.current, t !== null && (t.flags |= 32), Fe;
  }
  function Hn(t, e) {
    if (e != null) {
      var l = t.stateNode, a = l.ref;
      a === null && (a = l.ref = dh(
        Ul(t.memoizedProps, l)
      )), Un === null && (Un = []), Un.push(e.bind(null, a));
    }
  }
  function Xe(t, e, l) {
    (t === kt && (Qt === 2 || Qt === 9) || t.cancelPendingCommit !== null) && (Ln(t, 0), ha(
      t,
      At,
      Fe,
      !1
    )), Pn(t, l), ((qt & 2) === 0 || t !== kt) && (t === kt && ((qt & 2) === 0 && (Fa |= l), ae === 4 && ha(
      t,
      At,
      Fe,
      !1
    )), Ol(t));
  }
  function Rm(t, e, l) {
    if ((qt & 6) !== 0) throw Error(s(327));
    var a = !l && (e & 127) === 0 && (e & t.expiredLanes) === 0 || In(t, e), n = a ? rg(t, e) : Er(t, e, !0), u = a;
    do {
      if (n === 0) {
        wn && !a && ha(t, e, 0, !1);
        break;
      } else {
        if (l = t.current.alternate, u && !cg(l)) {
          n = Er(t, e, !1), u = !1;
          continue;
        }
        if (n === 2) {
          if (u = e, t.errorRecoveryDisabledLanes & u)
            var c = 0;
          else
            c = t.pendingLanes & -536870913, c = c !== 0 ? c : c & 536870912 ? 536870912 : 0;
          if (c !== 0) {
            e = c;
            t: {
              var o = t;
              n = ju;
              var g = o.current.memoizedState.isDehydrated;
              if (g && (Ln(o, c).flags |= 256), c = Er(
                o,
                c,
                !1
              ), c !== 2 && c !== 6) {
                if (yr && !g) {
                  o.errorRecoveryDisabledLanes |= u, Fa |= u, n = 4;
                  break t;
                }
                u = Ge, Ge = n, u !== null && (Ge === null ? Ge = u : Ge.push.apply(
                  Ge,
                  u
                ));
              }
              n = c;
            }
            if (u = !1, n !== 2) continue;
          }
        }
        if (n === 1) {
          Ln(t, 0), ha(t, e, 0, !0);
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
              ha(
                a,
                e,
                Fe,
                !fa
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
          if ((e & 62914560) === e && (n = lc + 300 - Yt(), 10 < n)) {
            if (ha(
              a,
              e,
              Fe,
              !fa
            ), ei(a, 0, !0) !== 0) break t;
            Ml = e, a.timeoutHandle = Gr(
              Dm.bind(
                null,
                a,
                l,
                Ge,
                nc,
                br,
                e,
                Fe,
                Fa,
                Rn,
                fa,
                u,
                "Throttled",
                -0,
                0
              ),
              n
            );
            break t;
          }
          Dm(
            a,
            l,
            Ge,
            nc,
            br,
            e,
            Fe,
            Fa,
            Rn,
            fa,
            u,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Ol(t);
  }
  function Dm(t, e, l, a, n, u, c, o, g, N, A, B, _, O) {
    t.timeoutHandle = -1;
    var X = e.subtreeFlags, P = (u & 335544064) === u;
    if (B = null, (P || X & 8192 || (X & 16785408) === 16785408) && (B = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: yl
    }, $e = null, Mm(
      e,
      u,
      B
    ), P && (X = B, P = t.containerInfo, P = (P.nodeType === 9 ? P : P.ownerDocument).__reactViewTransition, P != null && (X.count++, X.waitingForViewTransition = !0, X = qu.bind(X), P.finished.then(X, X))), X = (u & 62914560) === u ? lc - Yt() : (u & 4194048) === u ? Cm - Yt() : 0, X = fy(
      B,
      X
    ), X !== null)) {
      Ml = u, t.cancelPendingCommit = X(
        Xm.bind(
          null,
          t,
          e,
          u,
          l,
          a,
          n,
          c,
          o,
          g,
          N,
          A,
          B,
          null,
          _,
          O
        )
      ), ha(t, u, c, !N);
      return;
    }
    Xm(
      t,
      e,
      u,
      l,
      a,
      n,
      c,
      o,
      g,
      N,
      A,
      B
    );
  }
  function cg(t) {
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
  function ha(t, e, l, a) {
    e = zo(t, e), e &= ~ec, e &= ~Fa, t.suspendedLanes |= e, t.pingedLanes &= ~e, a && (t.warmLanes |= e), a = t.expirationTimes;
    for (var n = e; 0 < n; ) {
      var u = 31 - Qe(n), c = 1 << u;
      a[u] = -1, n &= ~c;
    }
    l !== 0 && Co(t, l, e);
  }
  function ic() {
    return (qt & 6) === 0 ? (Ru(0), !1) : !0;
  }
  function _r() {
    if (Ot !== null) {
      if (Qt === 0)
        var t = Ot.return;
      else
        t = Ot, Yl = La = null, As(t), Nn = null, gu = 0, t = Ot;
      for (; t !== null; )
        am(t.alternate, t), t = t.return;
      Ot = null;
    }
  }
  function Ln(t, e) {
    var l = t.timeoutHandle;
    return l !== -1 && (t.timeoutHandle = -1, jg(l)), l = t.cancelPendingCommit, l !== null && (t.cancelPendingCommit = null, l()), Ml = 0, _r(), kt = t, Ot = l = Hl(t.current, null), At = e, Qt = 0, ke = null, fa = !1, wn = In(t, e), yr = !1, Rn = Fe = ec = Fa = da = ae = 0, Ge = ju = null, br = !1, Zl = zo(t, e), hi(), l;
  }
  function Um(t, e) {
    pt = null, J.H = Yi, e === Tn || e === xi ? (e = Xf(), Qt = 3) : e === gs ? (e = Xf(), Qt = 4) : Qt = e === Qs ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, ke = e, Ot === null && (ae = 1, qi(
      t,
      ll(e, t.current)
    ));
  }
  function Bm() {
    var t = Ne.current;
    return t === null ? !0 : (At & 4194048) === At ? Ce === null : (At & 62914560) === At || (At & 536870912) !== 0 ? t === Ce : !1;
  }
  function Hm() {
    var t = J.H;
    return J.H = Yi, t === null ? Yi : t;
  }
  function Lm() {
    var t = J.A;
    return J.A = ug, t;
  }
  function cc() {
    ae = 4, fa || (At & 4194048) !== At && Ne.current !== null || (wn = !0), (da & 134217727) === 0 && (Fa & 134217727) === 0 || kt === null || ha(
      kt,
      At,
      Fe,
      !1
    );
  }
  function Er(t, e, l) {
    var a = qt;
    qt |= 2;
    var n = Hm(), u = Lm();
    (kt !== t || At !== e) && (nc = null, Ln(t, e)), e = !1;
    var c = ae;
    t: do
      try {
        if (Qt !== 0 && Ot !== null) {
          var o = Ot, g = ke;
          switch (Qt) {
            case 8:
              _r(), c = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              Ne.current === null && (e = !0);
              var N = Qt;
              if (Qt = 0, ke = null, Yn(t, o, g, N), l && wn) {
                c = 0;
                break t;
              }
              break;
            default:
              N = Qt, Qt = 0, ke = null, Yn(t, o, g, N);
          }
        }
        sg(), c = ae;
        break;
      } catch (A) {
        Um(t, A);
      }
    while (!0);
    return e && t.shellSuspendCounter++, Yl = La = null, qt = a, J.H = n, J.A = u, Ot === null && (kt = null, At = 0, hi()), c;
  }
  function sg() {
    for (; Ot !== null; ) Ym(Ot);
  }
  function rg(t, e) {
    var l = qt;
    qt |= 2;
    var a = Hm(), n = Lm();
    kt !== t || At !== e ? (nc = null, ac = Yt() + 500, Ln(t, e)) : wn = In(
      t,
      e
    );
    t: do
      try {
        if (Qt !== 0 && Ot !== null) {
          e = Ot;
          var u = ke;
          e: switch (Qt) {
            case 1:
              Qt = 0, ke = null, Yn(t, e, u, 1);
              break;
            case 2:
            case 9:
              if (qf(u)) {
                Qt = 0, ke = null, qm(e);
                break;
              }
              e = function() {
                Qt !== 2 && Qt !== 9 || kt !== t || (Qt = 7), Ol(t);
              }, u.then(e, e);
              break t;
            case 3:
              Qt = 7;
              break t;
            case 4:
              Qt = 5;
              break t;
            case 7:
              qf(u) ? (Qt = 0, ke = null, qm(e)) : (Qt = 0, ke = null, Yn(t, e, u, 7));
              break;
            case 5:
              var c = null;
              switch (Ot.tag) {
                case 26:
                  c = Ot.memoizedState;
                case 5:
                case 27:
                  var o = Ot;
                  if (c ? jh(c) : o.stateNode.complete) {
                    Qt = 0, ke = null;
                    var g = o.sibling;
                    if (g !== null) Ot = g;
                    else {
                      var N = o.return;
                      N !== null ? (Ot = N, sc(N)) : Ot = null;
                    }
                    break e;
                  }
              }
              Qt = 0, ke = null, Yn(t, e, u, 5);
              break;
            case 6:
              Qt = 0, ke = null, Yn(t, e, u, 6);
              break;
            case 8:
              _r(), ae = 6;
              break t;
            default:
              throw Error(s(462));
          }
        }
        og();
        break;
      } catch (A) {
        Um(t, A);
      }
    while (!0);
    return Yl = La = null, J.H = a, J.A = n, qt = l, Ot !== null ? 0 : (kt = null, At = 0, hi(), ae);
  }
  function og() {
    for (; Ot !== null && !he(); )
      Ym(Ot);
  }
  function Ym(t) {
    var e = em(t.alternate, t, Zl);
    t.memoizedProps = t.pendingProps, e === null ? sc(t) : Ot = e;
  }
  function qm(t) {
    var e = t, l = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = $d(
          l,
          e,
          e.pendingProps,
          e.type,
          void 0,
          At
        );
        break;
      case 11:
        e = $d(
          l,
          e,
          e.pendingProps,
          e.type.render,
          e.ref,
          At
        );
        break;
      case 5:
        As(e);
        var a = e;
        a === ye && (Tt ? (Si(a), a.tag === 5 && a.stateNode != null && (Wt = a.stateNode)) : (Si(a), Tt = !0));
      default:
        am(l, e), e = Ot = Af(e, Zl), e = em(l, e, Zl);
    }
    t.memoizedProps = t.pendingProps, e === null ? sc(t) : Ot = e;
  }
  function Yn(t, e, l, a) {
    Yl = La = null, As(e), Nn = null, gu = 0;
    var n = e.return;
    try {
      if (Wv(
        t,
        n,
        e,
        l,
        At
      )) {
        ae = 1, qi(
          t,
          ll(l, t.current)
        ), Ot = null;
        return;
      }
    } catch (u) {
      if (n !== null) throw Ot = n, u;
      ae = 1, qi(
        t,
        ll(l, t.current)
      ), Ot = null;
      return;
    }
    e.flags & 32768 ? (Tt || a === 1 ? t = !0 : wn || (At & 536870912) !== 0 ? t = !1 : (fa = t = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = Ne.current, a !== null && a.tag === 13 && (a.flags |= 16384))), Gm(e, t)) : sc(e);
  }
  function sc(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        Gm(
          e,
          fa
        );
        return;
      }
      t = e.return;
      var l = eg(
        e.alternate,
        e,
        Zl
      );
      if (l !== null) {
        Ot = l;
        return;
      }
      if (e = e.sibling, e !== null) {
        Ot = e;
        return;
      }
      Ot = e = t;
    } while (e !== null);
    ae === 0 && (ae = 5);
  }
  function Gm(t, e) {
    do {
      var l = lg(t.alternate, t);
      if (l !== null) {
        l.flags &= 32767, Ot = l;
        return;
      }
      if (l = t.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !e && (t = t.sibling, t !== null)) {
        Ot = t;
        return;
      }
      Ot = t = l;
    } while (t !== null);
    ae = 6, Ot = null;
  }
  function Xm(t, e, l, a, n, u, c, o, g, N, A, B) {
    t.cancelPendingCommit = null;
    do
      rc();
    while (te !== 0);
    if ((qt & 6) !== 0) throw Error(s(327));
    if (e !== null) {
      if (e === t.current) throw Error(s(177));
      t === kt && (Ot = kt = null, At = 0), Wa = e, ml = t, Ml = l, Sr = n, jm = a, fg(
        t,
        e,
        l,
        c,
        o,
        g,
        B
      );
    }
  }
  function fg(t, e, l, a, n, u, c) {
    var o = e.lanes | e.childLanes;
    if (pr = o, o |= as, H0(
      t,
      l,
      o,
      a,
      n,
      u
    ), Un = null, (l & 335544064) === l ? (Bn = Yv(t), a = 10262) : (Bn = null, a = 10256), (e.subtreeFlags & a) !== 0 || (e.flags & a) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, yg(nt, function() {
      return Mr(), null;
    })) : (t.callbackNode = null, t.callbackPriority = 0), $i = !1, a = (e.flags & 13878) !== 0, (e.subtreeFlags & 13878) !== 0 || a) {
      a = J.T, J.T = null, n = at.p, at.p = 2, u = qt, qt |= 4;
      try {
        ag(t, e, l);
      } finally {
        qt = u, at.p = n, J.T = a;
      }
    }
    te = 1, $i ? Dn = Hg(
      c,
      t.containerInfo,
      Bn,
      Tr,
      Nr,
      mg,
      xr,
      Mr,
      dg
    ) : (Tr(), Nr(), xr());
  }
  function dg(t) {
    if (te !== 0) {
      var e = ml.onRecoverableError;
      e(t, { componentStack: null });
    }
  }
  function mg() {
    te === 3 && (te = 0, Nm(Wa, ml), te = 4);
  }
  function Tr() {
    if (te === 1) {
      te = 0;
      var t = ml, e = Wa, l = Ml, a = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || a) {
        a = J.T, J.T = null;
        var n = at.p;
        at.p = 2;
        var u = qt;
        qt |= 4;
        try {
          zu = Wi = !1, Em(e, t, l), l = Lr;
          var c = pf(t.containerInfo), o = l.focusedElem, g = l.selectionRange;
          if (c !== o && o && o.ownerDocument && bf(
            o.ownerDocument.documentElement,
            o
          )) {
            if (g !== null && Ic(o)) {
              var N = g.start, A = g.end;
              if (A === void 0 && (A = N), "selectionStart" in o)
                o.selectionStart = N, o.selectionEnd = Math.min(
                  A,
                  o.value.length
                );
              else {
                var B = o.ownerDocument || document, _ = B && B.defaultView || window;
                if (_.getSelection) {
                  var O = _.getSelection(), X = o.textContent.length, P = Math.min(g.start, X), St = g.end === void 0 ? P : Math.min(g.end, X);
                  !O.extend && P > St && (c = St, St = P, P = c);
                  var T = yf(
                    o,
                    P
                  ), p = yf(
                    o,
                    St
                  );
                  if (T && p && (O.rangeCount !== 1 || O.anchorNode !== T.node || O.anchorOffset !== T.offset || O.focusNode !== p.node || O.focusOffset !== p.offset)) {
                    var x = B.createRange();
                    x.setStart(T.node, T.offset), O.removeAllRanges(), P > St ? (O.addRange(x), O.extend(p.node, p.offset)) : (x.setEnd(p.node, p.offset), O.addRange(x));
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
          Jn = !!Hr, Lr = Hr = null;
        } finally {
          qt = u, at.p = n, J.T = a;
        }
      }
      t.current = e, te = 2;
    }
  }
  function Nr() {
    if (te === 2) {
      te = 0;
      var t = ml, e = Wa, l = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || l) {
        l = J.T, J.T = null;
        var a = at.p;
        at.p = 2;
        var n = qt;
        qt |= 4;
        try {
          gm(t, e.alternate, e);
        } finally {
          qt = n, at.p = a, J.T = l;
        }
      }
      te = 3;
    }
  }
  function xr() {
    if (te === 4 || te === 3) {
      te = 0;
      var t = Dn;
      Dn = null, ve();
      var e = ml, l = Wa, a = Ml, n = jm, u = (a & 335544064) === a ? 10262 : 10256;
      if ((l.subtreeFlags & u) !== 0 || (l.flags & u) !== 0 ? te = 5 : (te = 0, Wa = ml = null, Vm(e, e.pendingLanes)), u = e.pendingLanes, u === 0 && (ma = null), Dc(a), l = l.stateNode, Ve && typeof Ve.onCommitFiberRoot == "function")
        try {
          Ve.onCommitFiberRoot(
            jl,
            l,
            void 0,
            (l.current.flags & 128) === 128
          );
        } catch {
        }
      if (n !== null) {
        l = J.T, u = at.p, at.p = 2, J.T = null;
        try {
          for (var c = e.onRecoverableError, o = 0; o < n.length; o++) {
            var g = n[o];
            c(g.value, {
              componentStack: g.stack
            });
          }
        } finally {
          J.T = l, at.p = u;
        }
      }
      if (n = Un, c = Bn, Bn = null, n !== null && (Un = null, c === null && (c = []), t !== null))
        for (g = 0; g < n.length; g++)
          l = (0, n[g])(
            c
          ), l !== void 0 && t.finished.finally(l);
      (Ml & 3) !== 0 && rc(), Ol(e), u = e.pendingLanes, (a & 261930) !== 0 && (u & 42) !== 0 ? e === uc ? wu++ : (wu = 0, uc = e) : (wu = 0, uc = null), Ru(0);
    }
  }
  function Vm(t, e) {
    (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, mu(e)));
  }
  function rc() {
    return Dn !== null && (Dn.skipTransition(), Dn = null), Tr(), Nr(), xr(), Mr();
  }
  function Mr() {
    if (te !== 5) return !1;
    var t = ml, e = pr;
    pr = 0;
    var l = Dc(Ml), a = J.T, n = at.p;
    try {
      at.p = 32 > l ? 32 : l, J.T = null, l = Sr, Sr = null;
      var u = ml, c = Ml;
      if (te = 0, Wa = ml = null, Ml = 0, (qt & 6) !== 0) throw Error(s(331));
      var o = qt;
      if (qt |= 4, zm(u.current), xm(
        u,
        u.current,
        c,
        l
      ), qt = o, Ru(0, !1), Ve && typeof Ve.onPostCommitFiberRoot == "function")
        try {
          Ve.onPostCommitFiberRoot(jl, u);
        } catch {
        }
      return !0;
    } finally {
      at.p = n, J.T = a, Vm(t, e);
    }
  }
  function Qm(t, e, l) {
    e = ll(l, e), e = Vs(t.stateNode, e, 2), t = ua(t, e, 2), t !== null && (Pn(t, 2), Ol(t));
  }
  function Zt(t, e, l) {
    if (t.tag === 3)
      Qm(t, t, l);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          Qm(
            e,
            t,
            l
          );
          break;
        } else if (e.tag === 1) {
          var a = e.stateNode;
          if (typeof e.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (ma === null || !ma.has(a))) {
            t = ll(l, t), l = qd(2), a = ua(e, l, 2), a !== null && (Gd(
              l,
              a,
              e,
              t
            ), Pn(a, 2), Ol(a));
            break;
          }
        }
        e = e.return;
      }
  }
  function Or(t, e, l) {
    var a = t.pingCache;
    if (a === null) {
      a = t.pingCache = new ig();
      var n = /* @__PURE__ */ new Set();
      a.set(e, n);
    } else
      n = a.get(e), n === void 0 && (n = /* @__PURE__ */ new Set(), a.set(e, n));
    n.has(l) || (yr = !0, n.add(l), t = hg.bind(null, t, e, l), e.then(t, t));
  }
  function hg(t, e, l) {
    var a = t.pingCache;
    a !== null && a.delete(e), t.pingedLanes |= t.suspendedLanes & l, t.warmLanes &= ~l, kt === t && (At & l) === l && ((ae === 4 || ae === 3 && (At & 62914560) === At && 300 > Yt() - lc) && (qt & 2) === 0 ? Ln(t, 0) : ec |= l, Rn === At && (Rn = 0)), Ol(t);
  }
  function Zm(t, e) {
    e === 0 && (e = Ao()), t = Ua(t, e), t !== null && (Pn(t, e), Ol(t));
  }
  function vg(t) {
    var e = t.memoizedState, l = 0;
    e !== null && (l = e.retryLane), Zm(t, l);
  }
  function gg(t, e) {
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
    a !== null && a.delete(e), Zm(t, l);
  }
  function yg(t, e) {
    return ut(t, e);
  }
  var qn = null, Gn = null, zr = !1, oc = !1, Ar = !1, va = 0;
  function Ol(t) {
    t !== Gn && t.next === null && (Gn === null ? qn = Gn = t : Gn = Gn.next = t), oc = !0, zr || (zr = !0, pg());
  }
  function Ru(t, e) {
    if (!Ar && oc) {
      Ar = !0;
      do
        for (var l = !1, a = qn; a !== null; ) {
          if (t !== 0) {
            var n = a.pendingLanes;
            if (n === 0) var u = 0;
            else {
              var c = a.suspendedLanes, o = a.pingedLanes;
              u = (1 << 31 - Qe(42 | t) + 1) - 1, u &= n & ~(c & ~o), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (l = !0, km(a, u));
          } else
            u = At, u = ei(
              a,
              a === kt ? u : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (u & 3) === 0 || In(a, u) || (l = !0, km(a, u));
          a = a.next;
        }
      while (l);
      Ar = !1;
    }
  }
  function bg() {
    Km();
  }
  function Km() {
    oc = zr = !1;
    var t = 0;
    va !== 0 && Cg() && (t = va);
    for (var e = Yt(), l = null, a = qn; a !== null; ) {
      var n = a.next, u = Jm(a, e);
      u === 0 ? (a.next = null, l === null ? qn = n : l.next = n, n === null && (Gn = l)) : (l = a, (t !== 0 || (u & 3) !== 0) && (oc = !0)), a = n;
    }
    te !== 0 && te !== 5 || Ru(t), va !== 0 && (va = 0);
  }
  function Jm(t, e) {
    for (var l = t.suspendedLanes, a = t.pingedLanes, n = t.expirationTimes, u = t.pendingLanes & -62914561; 0 < u; ) {
      var c = 31 - Qe(u), o = 1 << c, g = n[c];
      g === -1 ? ((o & l) === 0 || (o & a) !== 0) && (n[c] = B0(o, e)) : g <= e && (t.expiredLanes |= o), u &= ~o;
    }
    if (e = kt, l = At, l = ei(
      t,
      t === e ? l : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a = t.callbackNode, l === 0 || t === e && (Qt === 2 || Qt === 9) || t.cancelPendingCommit !== null)
      return a !== null && a !== null && Nt(a), t.callbackNode = null, t.callbackPriority = 0;
    if ((l & 3) === 0 || In(t, l)) {
      if (e = l & -l, e === t.callbackPriority) return e;
      switch (a !== null && Nt(a), Dc(l)) {
        case 2:
        case 8:
          l = M;
          break;
        case 32:
          l = nt;
          break;
        case 268435456:
          l = ee;
          break;
        default:
          l = nt;
      }
      return a = $m.bind(null, t), l = ut(l, a), t.callbackPriority = e, t.callbackNode = l, e;
    }
    return a !== null && a !== null && Nt(a), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function $m(t, e) {
    if (te !== 0 && te !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var l = t.callbackNode;
    if (rc() && t.callbackNode !== l)
      return null;
    var a = At;
    return a = ei(
      t,
      t === kt ? a : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a === 0 ? null : (Rm(t, a, e), Jm(t, Yt()), t.callbackNode != null && t.callbackNode === l ? $m.bind(null, t) : null);
  }
  function km(t, e) {
    if (rc()) return null;
    Rm(t, e, !0);
  }
  function pg() {
    wg(function() {
      (qt & 6) !== 0 ? ut(
        _e,
        bg
      ) : Km();
    });
  }
  function Cr() {
    if (va === 0) {
      var t = Ga;
      t === 0 && (t = Iu, Iu <<= 1, (Iu & 261888) === 0 && (Iu = 256)), va = t;
    }
    return va;
  }
  function Fm(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : ii(t);
  }
  function Sg(t, e, l, a, n) {
    if (e === "submit" && l && l.stateNode === n) {
      var u = Fm(
        (n[He] || null).action
      ), c = a.submitter;
      c && (e = (e = c[He] || null) ? Fm(e.formAction) : c.getAttribute("formAction"), e !== null && (u = e, c = null));
      var o = new oi(
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
                if (va !== 0) {
                  var g = new FormData(n, c);
                  Ls(
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
                typeof u == "function" && (o.preventDefault(), g = new FormData(n, c), Ls(
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
  for (var jr = 0; jr < ls.length; jr++) {
    var wr = ls[jr], _g = wr.toLowerCase(), Eg = wr[0].toUpperCase() + wr.slice(1);
    rl(
      _g,
      "on" + Eg
    );
  }
  rl(Ef, "onAnimationEnd"), rl(Tf, "onAnimationIteration"), rl(Nf, "onAnimationStart"), rl("dblclick", "onDoubleClick"), rl("focusin", "onFocus"), rl("focusout", "onBlur"), rl(jv, "onTransitionRun"), rl(wv, "onTransitionStart"), rl(Rv, "onTransitionCancel"), rl(xf, "onTransitionEnd"), rn("onMouseEnter", ["mouseout", "mouseover"]), rn("onMouseLeave", ["mouseout", "mouseover"]), rn("onPointerEnter", ["pointerout", "pointerover"]), rn("onPointerLeave", ["pointerout", "pointerover"]), wa(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), wa(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), wa("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), wa(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), wa(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), wa(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Du = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Tg = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Du)
  );
  function Wm(t, e) {
    e = (e & 4) !== 0;
    for (var l = 0; l < t.length; l++) {
      var a = t[l], n = a.event;
      a = a.listeners;
      t: {
        var u = void 0;
        if (e)
          for (var c = a.length - 1; 0 <= c; c--) {
            var o = a[c], g = o.instance, N = o.currentTarget;
            if (o = o.listener, g !== u && n.isPropagationStopped())
              break t;
            u = o, n.currentTarget = N;
            try {
              u(n);
            } catch (A) {
              mi(A);
            }
            n.currentTarget = null, u = g;
          }
        else
          for (c = 0; c < a.length; c++) {
            if (o = a[c], g = o.instance, N = o.currentTarget, o = o.listener, g !== u && n.isPropagationStopped())
              break t;
            u = o, n.currentTarget = N;
            try {
              u(n);
            } catch (A) {
              mi(A);
            }
            n.currentTarget = null, u = g;
          }
      }
    }
  }
  function zt(t, e) {
    var l = e[Uo];
    l === void 0 && (l = e[Uo] = /* @__PURE__ */ new Set());
    var a = t + "__bubble";
    l.has(a) || (Im(e, t, 2, !1), l.add(a));
  }
  function Rr(t, e, l) {
    var a = 0;
    e && (a |= 4), Im(
      l,
      t,
      a,
      e
    );
  }
  var fc = "_reactListening" + Math.random().toString(36).slice(2);
  function Dr(t) {
    if (!t[fc]) {
      t[fc] = !0, Lo.forEach(function(l) {
        l !== "selectionchange" && (Tg.has(l) || Rr(l, !1, t), Rr(l, !0, t));
      });
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[fc] || (e[fc] = !0, Rr("selectionchange", !1, e));
    }
  }
  function Im(t, e, l, a) {
    switch (Gh(e)) {
      case 2:
        var n = vy;
        break;
      case 8:
        n = gy;
        break;
      default:
        n = to;
    }
    l = n.bind(
      null,
      e,
      l,
      t
    ), n = void 0, !Xc || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (n = !0), a ? n !== void 0 ? t.addEventListener(e, l, {
      capture: !0,
      passive: n
    }) : t.addEventListener(e, l, !0) : n !== void 0 ? t.addEventListener(e, l, {
      passive: n
    }) : t.addEventListener(e, l, !1);
  }
  function Ur(t, e, l, a, n) {
    var u = a;
    if ((e & 1) === 0 && (e & 2) === 0 && a !== null)
      t: for (; ; ) {
        if (a === null) return;
        var c = a.tag;
        if (c === 3 || c === 4) {
          var o = a.stateNode.containerInfo;
          if (o === n) break;
          if (c === 4)
            for (c = a.return; c !== null; ) {
              var g = c.tag;
              if ((g === 3 || g === 4) && c.stateNode.containerInfo === n)
                return;
              c = c.return;
            }
          for (; o !== null; ) {
            if (c = ja(o), c === null) return;
            if (g = c.tag, g === 5 || g === 6 || g === 26 || g === 27) {
              a = u = c;
              continue t;
            }
            o = o.parentNode;
          }
        }
        a = a.return;
      }
    Wo(function() {
      var N = u, A = qc(l), B = [];
      t: {
        var _ = Mf.get(t);
        if (_ !== void 0) {
          var O = oi, X = t;
          switch (t) {
            case "keypress":
              if (si(l) === 0) break t;
            case "keydown":
            case "keyup":
              O = cv;
              break;
            case "focusin":
              X = "focus", O = Kc;
              break;
            case "focusout":
              X = "blur", O = Kc;
              break;
            case "beforeblur":
            case "afterblur":
              O = Kc;
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
              O = tf;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              O = k0;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              O = dv;
              break;
            case Ef:
            case Tf:
            case Nf:
              O = I0;
              break;
            case xf:
              O = hv;
              break;
            case "scroll":
            case "scrollend":
              O = J0;
              break;
            case "wheel":
              O = gv;
              break;
            case "copy":
            case "cut":
            case "paste":
              O = tv;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              O = lf;
              break;
            case "submit":
              O = ov;
              break;
            case "toggle":
            case "beforetoggle":
              O = bv;
          }
          var P = (e & 4) !== 0, St = !P && (t === "scroll" || t === "scrollend"), T = P ? _ !== null ? _ + "Capture" : null : _;
          P = [];
          for (var p = N, x; p !== null; ) {
            var U = p;
            if (x = U.stateNode, U = U.tag, U !== 5 && U !== 26 && U !== 27 || x === null || T === null || (U = lu(p, T), U != null && P.push(
              Uu(p, U, x)
            )), St) break;
            p = p.return;
          }
          0 < P.length && (_ = new O(
            _,
            X,
            null,
            l,
            A
          ), B.push({ event: _, listeners: P }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (O = t === "mouseover" || t === "pointerover", _ = t === "mouseout" || t === "pointerout", O && l !== Yc && (X = l.relatedTarget || l.fromElement) && (ja(X) || X[un]))
            break t;
          (_ || O) && (X = A.window === A ? A : (O = A.ownerDocument) ? O.defaultView || O.parentWindow : window, _ ? (O = l.relatedTarget || l.toElement, _ = N, O = O ? ja(O) : null, O !== null && (St = h(O), P = O.tag, O !== St || P !== 5 && P !== 27 && P !== 6) && (O = null)) : (_ = null, O = N), _ !== O && (P = tf, U = "onMouseLeave", T = "onMouseEnter", p = "mouse", (t === "pointerout" || t === "pointerover") && (P = lf, U = "onPointerLeave", T = "onPointerEnter", p = "pointer"), St = _ == null ? X : eu(_), x = O == null ? X : eu(O), X = new P(
            U,
            p + "leave",
            _,
            l,
            A
          ), X.target = St, X.relatedTarget = x, U = null, ja(A) === N && (P = new P(
            T,
            p + "enter",
            O,
            l,
            A
          ), P.target = x, P.relatedTarget = St, U = P), St = U, P = _ && O ? Dt(
            _,
            O,
            Ng
          ) : null, _ !== null && Pm(
            B,
            X,
            _,
            P,
            !1
          ), O !== null && St !== null && Pm(
            B,
            St,
            O,
            P,
            !0
          )));
        }
        t: {
          if (_ = N ? eu(N) : window, O = _.nodeName && _.nodeName.toLowerCase(), O === "select" || O === "input" && _.type === "file")
            var $ = ff;
          else if (rf(_))
            if (df)
              $ = zv;
            else {
              $ = Mv;
              var Ct = xv;
            }
          else
            O = _.nodeName, !O || O.toLowerCase() !== "input" || _.type !== "checkbox" && _.type !== "radio" ? N && Lc(N.elementType) && ($ = ff) : $ = Ov;
          if ($ && ($ = $(t, N))) {
            of(
              B,
              $,
              l,
              A
            );
            break t;
          }
          Ct && Ct(t, _, N);
        }
        switch (Ct = N ? eu(N) : window, t) {
          case "focusin":
            (rf(Ct) || Ct.contentEditable === "true") && (vn = Ct, Pc = N, ou = null);
            break;
          case "focusout":
            ou = Pc = vn = null;
            break;
          case "mousedown":
            ts = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ts = !1, Sf(B, l, A);
            break;
          case "selectionchange":
            if (Cv) break;
          case "keydown":
          case "keyup":
            Sf(B, l, A);
        }
        var it;
        if ($c)
          t: {
            switch (t) {
              case "compositionstart":
                var ft = "onCompositionStart";
                break t;
              case "compositionend":
                ft = "onCompositionEnd";
                break t;
              case "compositionupdate":
                ft = "onCompositionUpdate";
                break t;
            }
            ft = void 0;
          }
        else
          hn ? cf(t, l) && (ft = "onCompositionEnd") : t === "keydown" && l.keyCode === 229 && (ft = "onCompositionStart");
        ft && (af && l.locale !== "ko" && (hn || ft !== "onCompositionStart" ? ft === "onCompositionEnd" && hn && (it = Io()) : (Fl = A, Vc = "value" in Fl ? Fl.value : Fl.textContent, hn = !0)), Ct = dc(N, ft), 0 < Ct.length && (ft = new ef(
          ft,
          t,
          null,
          l,
          A
        ), B.push({ event: ft, listeners: Ct }), it ? ft.data = it : (it = sf(l), it !== null && (ft.data = it)))), (it = Sv ? _v(t, l) : Ev(t, l)) && (ft = dc(N, "onBeforeInput"), 0 < ft.length && (Ct = new ef(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          A
        ), B.push({
          event: Ct,
          listeners: ft
        }), Ct.data = it)), Sg(
          B,
          t,
          N,
          l,
          A
        );
      }
      Wm(B, e);
    });
  }
  function Uu(t, e, l) {
    return {
      instance: t,
      listener: e,
      currentTarget: l
    };
  }
  function dc(t, e) {
    for (var l = e + "Capture", a = []; t !== null; ) {
      var n = t, u = n.stateNode;
      if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || u === null || (n = lu(t, l), n != null && a.unshift(
        Uu(t, n, u)
      ), n = lu(t, e), n != null && a.push(
        Uu(t, n, u)
      )), t.tag === 3) return a;
      t = t.return;
    }
    return [];
  }
  function Ng(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function Pm(t, e, l, a, n) {
    for (var u = e._reactName, c = []; l !== null && l !== a; ) {
      var o = l, g = o.alternate, N = o.stateNode;
      if (o = o.tag, g !== null && g === a) break;
      o !== 5 && o !== 26 && o !== 27 || N === null || (g = N, n ? (N = lu(l, u), N != null && c.unshift(
        Uu(l, N, g)
      )) : n || (N = lu(l, u), N != null && c.push(
        Uu(l, N, g)
      ))), l = l.return;
    }
    c.length !== 0 && t.push({ event: e, listeners: c });
  }
  var xg = /\r\n?/g, Mg = /\u0000|\uFFFD/g;
  function th(t) {
    return (typeof t == "string" ? t : "" + t).replace(xg, `
`).replace(Mg, "");
  }
  function eh(t, e) {
    return e = th(e), th(t) === e;
  }
  function Kt(t, e, l, a, n, u) {
    switch (l) {
      case "children":
        if (typeof a == "string")
          e === "body" || e === "textarea" && a === "" || fn(t, a);
        else if (typeof a == "number" || typeof a == "bigint")
          e !== "body" && fn(t, "" + a);
        else return;
        break;
      case "className":
        ui(t, "class", a);
        break;
      case "tabIndex":
        ui(t, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        ui(t, l, a);
        break;
      case "style":
        ko(t, a, u);
        return;
      case "data":
        if (e !== "object") {
          ui(t, "data", a);
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
        a = ii(a), t.setAttribute(l, a);
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
        a = ii(a), t.setAttribute(l, a);
        break;
      case "onClick":
        a != null && (t.onclick = yl);
        return;
      case "onScroll":
        a != null && zt("scroll", t);
        return;
      case "onScrollEnd":
        a != null && zt("scrollend", t);
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
        l = ii(a), t.setAttributeNS(
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
        zt("beforetoggle", t), zt("toggle", t), ni(t, "popover", a);
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
        ni(t, "is", a);
        break;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N")
          l = Z0.get(l) || l, ni(t, l, a);
        else return;
    }
    Lt = !0;
  }
  function Br(t, e, l, a, n, u) {
    switch (l) {
      case "style":
        ko(t, a, u);
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
        if (typeof a == "string") fn(t, a);
        else if (typeof a == "number" || typeof a == "bigint")
          fn(t, "" + a);
        else return;
        break;
      case "onScroll":
        a != null && zt("scroll", t);
        return;
      case "onScrollEnd":
        a != null && zt("scrollend", t);
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
        if (!Yo.hasOwnProperty(l))
          t: {
            if (l[0] === "o" && l[1] === "n" && (n = l.endsWith("Capture"), u = l.slice(2, n ? l.length - 7 : void 0), e = t[He] || null, e = e != null ? e[l] : null, typeof e == "function" && t.removeEventListener(u, e, n), typeof a == "function")) {
              typeof e != "function" && e !== null && (l in t ? t[l] = null : t.hasAttribute(l) && t.removeAttribute(l)), t.addEventListener(u, a, n);
              break t;
            }
            Lt = !0, l in t ? t[l] = a : a === !0 ? t.setAttribute(l, "") : ni(t, l, a);
          }
        return;
    }
    Lt = !0;
  }
  function Oe(t, e, l) {
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
        zt("error", t), zt("load", t);
        var a = !1, n = !1, u;
        for (u in l)
          if (l.hasOwnProperty(u)) {
            var c = l[u];
            if (c != null)
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
                  Kt(t, e, u, c, l, null);
              }
          }
        n && Kt(t, e, "srcSet", l.srcSet, l, null), a && Kt(t, e, "src", l.src, l, null);
        return;
      case "input":
        zt("invalid", t);
        var o = u = c = n = null, g = null, N = null;
        for (a in l)
          if (l.hasOwnProperty(a)) {
            var A = l[a];
            if (A != null)
              switch (a) {
                case "name":
                  n = A;
                  break;
                case "type":
                  c = A;
                  break;
                case "checked":
                  g = A;
                  break;
                case "defaultChecked":
                  N = A;
                  break;
                case "value":
                  u = A;
                  break;
                case "defaultValue":
                  o = A;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (A != null)
                    throw Error(s(137, e));
                  break;
                default:
                  Kt(t, e, a, A, l, null);
              }
          }
        Zo(
          t,
          u,
          o,
          g,
          N,
          c,
          n,
          !1
        );
        return;
      case "select":
        zt("invalid", t), a = c = u = null;
        for (n in l)
          if (l.hasOwnProperty(n) && (o = l[n], o != null))
            switch (n) {
              case "value":
                u = o;
                break;
              case "defaultValue":
                c = o;
                break;
              case "multiple":
                a = o;
              default:
                Kt(t, e, n, o, l, null);
            }
        e = u, l = c, t.multiple = !!a, e != null ? on(t, !!a, e, !1) : l != null && on(t, !!a, l, !0);
        return;
      case "textarea":
        zt("invalid", t), u = n = a = null;
        for (c in l)
          if (l.hasOwnProperty(c) && (o = l[c], o != null))
            switch (c) {
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
                Kt(t, e, c, o, l, null);
            }
        Jo(t, a, n, u);
        return;
      case "option":
        for (g in l)
          l.hasOwnProperty(g) && (a = l[g], a != null) && (g === "selected" ? t.selected = a && typeof a != "function" && typeof a != "symbol" : Kt(t, e, g, a, l, null));
        return;
      case "dialog":
        zt("beforetoggle", t), zt("toggle", t), zt("cancel", t), zt("close", t);
        break;
      case "iframe":
      case "object":
        zt("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < Du.length; a++)
          zt(Du[a], t);
        break;
      case "image":
        zt("error", t), zt("load", t);
        break;
      case "details":
        zt("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        zt("error", t), zt("load", t);
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
        if (Lc(e)) {
          for (A in l)
            l.hasOwnProperty(A) && (a = l[A], a !== void 0 && Br(
              t,
              e,
              A,
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
  var Og = {};
  function zg(t, e, l, a) {
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
        var n = null, u = null, c = null, o = null, g = null, N = null, A = null;
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
                O !== B && (Lt = !0), u = O;
                break;
              case "name":
                O !== B && (Lt = !0), n = O;
                break;
              case "checked":
                O !== B && (Lt = !0), N = O;
                break;
              case "defaultChecked":
                O !== B && (Lt = !0), A = O;
                break;
              case "value":
                O !== B && (Lt = !0), c = O;
                break;
              case "defaultValue":
                O !== B && (Lt = !0), o = O;
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
        Bc(
          t,
          c,
          o,
          g,
          N,
          A,
          u,
          n
        );
        return;
      case "select":
        O = c = o = _ = null;
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
                u !== g && (Lt = !0), _ = u;
                break;
              case "defaultValue":
                u !== g && (Lt = !0), o = u;
                break;
              case "multiple":
                u !== g && (Lt = !0), c = u;
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
        e = o, l = c, a = O, _ != null ? on(t, !!l, _, !1) : !!a != !!l && (e != null ? on(t, !!l, e, !0) : on(t, !!l, l ? [] : "", !1));
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
        for (c in a)
          if (n = a[c], u = l[c], a.hasOwnProperty(c) && (n != null || u != null))
            switch (c) {
              case "value":
                n !== u && (Lt = !0), _ = n;
                break;
              case "defaultValue":
                n !== u && (Lt = !0), O = n;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (n != null) throw Error(s(91));
                break;
              default:
                n !== u && Kt(t, e, c, n, a, u);
            }
        Ko(t, _, O);
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
          _ = a[g], O = l[g], a.hasOwnProperty(g) && _ !== O && (_ != null || O != null) && (g === "selected" ? (_ !== O && (Lt = !0), t.selected = _ && typeof _ != "function" && typeof _ != "symbol") : Kt(
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
        for (var P in l)
          _ = l[P], l.hasOwnProperty(P) && _ != null && !a.hasOwnProperty(P) && Kt(t, e, P, null, a, _);
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
        if (Lc(e)) {
          for (var St in l)
            _ = l[St], l.hasOwnProperty(St) && _ !== void 0 && !a.hasOwnProperty(St) && Br(
              t,
              e,
              St,
              void 0,
              a,
              _
            );
          for (A in a)
            _ = a[A], O = l[A], !a.hasOwnProperty(A) || _ === O || _ === void 0 && O === void 0 || Br(
              t,
              e,
              A,
              _,
              a,
              O
            );
          return;
        }
    }
    for (var T in l)
      _ = l[T], l.hasOwnProperty(T) && _ != null && !a.hasOwnProperty(T) && Kt(t, e, T, null, a, _);
    for (B in a)
      _ = a[B], O = l[B], !a.hasOwnProperty(B) || _ === O || _ == null && O == null || Kt(t, e, B, _, a, O);
  }
  function lh(t) {
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
  function Ag() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, e = 0, l = performance.getEntriesByType("resource"), a = 0; a < l.length; a++) {
        var n = l[a], u = n.transferSize, c = n.initiatorType, o = n.duration;
        if (u && o && lh(c)) {
          for (c = 0, o = n.responseEnd, a += 1; a < l.length; a++) {
            var g = l[a], N = g.startTime;
            if (N > o) break;
            var A = g.transferSize, B = g.initiatorType;
            A && lh(B) && (g = g.responseEnd, c += A * (g < o ? 1 : (o - N) / (g - N)));
          }
          if (--a, e += 8 * (u + c) / (n.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var Hr = null, Lr = null;
  function Bu(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function ah(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function nh(t, e) {
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
  function uh(t, e, l, a) {
    return l = Bu(
      l
    ).createElement(t), l[Ee] = a, l[He] = e, Oe(l, t, e), ge(l), l;
  }
  function Yr(t, e) {
    return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.children == "bigint" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
  }
  var qr = null;
  function Cg() {
    var t = window.event;
    return t && t.type === "popstate" ? t === qr ? !1 : (qr = t, !0) : (qr = null, !1);
  }
  var Gr = typeof setTimeout == "function" ? setTimeout : void 0, jg = typeof clearTimeout == "function" ? clearTimeout : void 0, ih = typeof Promise == "function" ? Promise : void 0, ch = typeof requestAnimationFrame == "function" ? requestAnimationFrame : Gr, wg = typeof queueMicrotask == "function" ? queueMicrotask : typeof ih < "u" ? function(t) {
    return ih.resolve(null).then(t).catch(Rg);
  } : Gr;
  function Rg(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function ga(t) {
    return t === "head";
  }
  function sh(t, e) {
    var l = e, a = 0;
    do {
      var n = l.nextSibling;
      if (t.removeChild(l), n && n.nodeType === 8)
        if (l = n.data, l === "/$" || l === "/&") {
          if (a === 0) {
            t.removeChild(n), $n(e);
            return;
          }
          a--;
        } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&")
          a++;
        else if (l === "html")
          kr(
            t.ownerDocument.documentElement
          );
        else if (l === "head") {
          l = t.ownerDocument.head, kr(l);
          for (var u = l.firstChild; u; ) {
            var c = u.nextSibling, o = u.nodeName;
            u[tu] || o === "SCRIPT" || o === "STYLE" || o === "LINK" && u.rel.toLowerCase() === "stylesheet" || l.removeChild(u), u = c;
          }
        } else
          l === "body" && kr(t.ownerDocument.body);
      l = n;
    } while (l);
    $n(e);
  }
  function rh(t, e) {
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
  function oh(t, e, l) {
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
  function fh(t, e) {
    t = t.style, e = e.style;
    var l = e != null ? e.hasOwnProperty("viewTransitionName") ? e.viewTransitionName : e.hasOwnProperty("view-transition-name") ? e["view-transition-name"] : null : null;
    t.viewTransitionName = l == null || typeof l == "boolean" ? "" : ("" + l).trim(), l = e != null ? e.hasOwnProperty("viewTransitionClass") ? e.viewTransitionClass : e.hasOwnProperty("view-transition-class") ? e["view-transition-class"] : null : null, t.viewTransitionClass = l == null || typeof l == "boolean" ? "" : ("" + l).trim(), t.display === "inline-block" && (e == null ? t.display = t.margin = "" : (l = e.display, t.display = l == null || typeof l == "boolean" ? "" : l, l = e.margin, l != null ? t.margin = l : (l = e.hasOwnProperty("marginTop") ? e.marginTop : e["margin-top"], t.marginTop = l == null || typeof l == "boolean" ? "" : l, e = e.hasOwnProperty("marginBottom") ? e.marginBottom : e["margin-bottom"], t.marginBottom = e == null || typeof e == "boolean" ? "" : e)));
  }
  function Dg(t, e, l) {
    return l = l.ownerDocument.defaultView, {
      rect: t,
      abs: e.position === "absolute" || e.position === "fixed",
      clip: e.clipPath !== "none" || e.overflow !== "visible" || e.filter !== "none" || e.mask !== "none" || e.mask !== "none" || e.borderRadius !== "0px",
      view: 0 <= t.bottom && 0 <= t.right && t.top <= l.innerHeight && t.left <= l.innerWidth
    };
  }
  function Xr(t) {
    var e = t.getBoundingClientRect(), l = getComputedStyle(t);
    return Dg(e, l, t);
  }
  function Ug(t) {
    return t.documentElement.clientHeight;
  }
  function Bg(t) {
    this.addEventListener("load", t), this.addEventListener("error", t);
  }
  function Hg(t, e, l, a, n, u, c, o, g) {
    var N = e.nodeType === 9 ? e : e.ownerDocument;
    try {
      var A = N.startViewTransition({
        update: function() {
          var _ = N.defaultView, O = _.navigation && _.navigation.transition, X = N.fonts.status;
          a();
          var P = [];
          if (X === "loaded" && (Ug(N), N.fonts.status === "loading" && P.push(N.fonts.ready)), X = P.length, t !== null)
            for (var St = t.suspenseyImages, T = 0, p = 0; p < St.length; p++) {
              var x = St[p];
              if (!x.complete) {
                var U = x.getBoundingClientRect();
                if (0 < U.bottom && 0 < U.right && U.top < _.innerHeight && U.left < _.innerWidth) {
                  if (T += wh(x), T > vc) {
                    P.length = X;
                    break;
                  }
                  x = new Promise(
                    Bg.bind(x)
                  ), P.push(x);
                }
              }
            }
          if (0 < P.length)
            return _ = Promise.race([
              Promise.all(P),
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
      N.__reactViewTransition = A;
      var B = [];
      return A.ready.then(
        function() {
          for (var _ = N.documentElement.getAnimations({
            subtree: !0
          }), O = 0; O < _.length; O++) {
            var X = _[O], P = X.effect, St = P.pseudoElement;
            if (St != null && St.startsWith("::view-transition")) {
              B.push(X), X = P.getKeyframes();
              for (var T = St = void 0, p = !0, x = 0; x < X.length; x++) {
                var U = X[x], $ = U.width;
                if (St === void 0) St = $;
                else if (St !== $) {
                  p = !1;
                  break;
                }
                if ($ = U.height, T === void 0) T = $;
                else if (T !== $) {
                  p = !1;
                  break;
                }
                delete U.width, delete U.height, U.transform === "none" && delete U.transform;
              }
              p && St !== void 0 && T !== void 0 && (P.setKeyframes(X), p = getComputedStyle(
                P.target,
                P.pseudoElement
              ), p.width !== St || p.height !== T) && (p = X[0], p.width = St, p.height = T, p = X[X.length - 1], p.width = St, p.height = T, P.setKeyframes(X));
            }
          }
          c();
        },
        function(_) {
          N.__reactViewTransition === A && (N.__reactViewTransition = null);
          try {
            typeof _ == "object" && _ !== null && _.name === "InvalidStateError" && (_.message === "View transition was skipped because document visibility state is hidden." || _.message === "Skipping view transition because document visibility state has become hidden." || _.message === "Skipping view transition because viewport size changed." || _.message === "Transition was aborted because of invalid state") && (_ = null), _ !== null && g(_);
          } finally {
            a(), n(), c();
          }
        }
      ), A.finished.finally(function() {
        for (var _ = 0; _ < B.length; _++)
          B[_].cancel();
        N.__reactViewTransition === A && (N.__reactViewTransition = null), o();
      }), A;
    } catch {
      return a(), n(), c(), null;
    }
  }
  function Ia(t, e) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + t + "(" + e + ")";
  }
  Ia.prototype.animate = function(t, e) {
    return e = typeof e == "number" ? { duration: e } : K({}, e), e.pseudoElement = this._selector, this._scope.animate(t, e);
  }, Ia.prototype.getAnimations = function() {
    for (var t = this._scope, e = this._selector, l = t.getAnimations({ subtree: !0 }), a = [], n = 0; n < l.length; n++) {
      var u = l[n].effect;
      u !== null && u.target === t && u.pseudoElement === e && a.push(l[n]);
    }
    return a;
  }, Ia.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function dh(t) {
    return {
      name: t,
      group: new Ia("group", t),
      imagePair: new Ia("image-pair", t),
      old: new Ia("old", t),
      new: new Ia("new", t)
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
      if (hh(u, t, e, l) === -1) {
        var c = this, o = e;
        l != null && typeof l != "boolean" && l.once === !0 && (o = function(g) {
          c.removeEventListener(
            t,
            e,
            l
          ), typeof e == "function" ? e.call(this, g) : e.handleEvent(g);
        }), a !== null && (n = c.removeEventListener.bind(
          c,
          t,
          e,
          l
        ), a.addEventListener("abort", n, { once: !0 }), n = a.removeEventListener.bind(a, "abort", n)), a = Xn(l), u.push({
          type: t,
          listener: e,
          optionsOrUseCapture: l,
          attachedListener: o,
          cleanup: n
        }), v(
          this._fragmentFiber.child,
          !1,
          Lg,
          t,
          o,
          a
        );
      }
      this._eventListeners = u;
    }
  };
  function Lg(t, e, l, a) {
    return k(t).addEventListener(
      e,
      l,
      a
    ), !1;
  }
  Ie.prototype.removeEventListener = function(t, e, l) {
    var a = this._eventListeners;
    if (a !== null && (e = hh(
      a,
      t,
      e,
      l
    ), e !== -1)) {
      var n = a[e];
      l = n.attachedListener;
      var u = n.cleanup;
      n = Xn(n.optionsOrUseCapture), v(
        this._fragmentFiber.child,
        !1,
        Yg,
        t,
        l,
        n
      ), a.splice(e, 1), u !== null && u();
    }
  };
  function Yg(t, e, l, a) {
    return k(t).removeEventListener(
      e,
      l,
      a
    ), !1;
  }
  function Xn(t) {
    return t != null && typeof t != "boolean" && (t.once === !0 || t.signal instanceof AbortSignal) ? { capture: t.capture, passive: t.passive } : t;
  }
  function mh(t) {
    return t == null ? "c=0" : typeof t == "boolean" ? "c=" + (t ? "1" : "0") : "c=" + (t.capture ? "1" : "0");
  }
  function hh(t, e, l, a) {
    if (t.length === 0) return -1;
    a = mh(a);
    for (var n = 0; n < t.length; n++) {
      var u = t[n];
      if (u.type === e && u.listener === l && mh(u.optionsOrUseCapture) === a)
        return n;
    }
    return -1;
  }
  Ie.prototype.dispatchEvent = function(t) {
    var e = w(
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
            Xn(u.optionsOrUseCapture)
          );
        }
      if (e.appendChild(a), t = a.dispatchEvent(t), l)
        for (n = 0; n < l.length; n++)
          u = l[n], a.removeEventListener(
            u.type,
            u.attachedListener,
            Xn(u.optionsOrUseCapture)
          );
      return e.removeChild(a), t;
    }
    return e.dispatchEvent(t);
  }, Ie.prototype.focus = function(t) {
    v(
      this._fragmentFiber.child,
      !0,
      vh,
      t,
      void 0,
      void 0
    );
  };
  function vh(t, e) {
    return t.tag === 6 ? !1 : (t = k(t), Wg(t, e));
  }
  Ie.prototype.focusLast = function(t) {
    var e = [];
    v(
      this._fragmentFiber.child,
      !0,
      Vr,
      e,
      void 0,
      void 0
    );
    for (var l = e.length - 1; 0 <= l && !vh(e[l], t); l--) ;
  };
  function Vr(t, e) {
    return e.push(t), !1;
  }
  Ie.prototype.blur = function() {
    var t = w(
      this._fragmentFiber
    );
    t !== null && (t = k(t), t = Bu(t).activeElement, t !== null && v(
      this._fragmentFiber.child,
      !1,
      qg,
      t,
      void 0,
      void 0
    ));
  };
  function qg(t, e) {
    return t.tag === 6 ? !1 : (t = k(t), t === e || t.contains(e) ? (e.blur(), !0) : !1);
  }
  Ie.prototype.observeUsing = function(t) {
    this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(t), v(
      this._fragmentFiber.child,
      !1,
      Gg,
      t,
      void 0,
      void 0
    );
  };
  function Gg(t, e) {
    return t.tag === 6 || (t = k(t), e.observe(t)), !1;
  }
  Ie.prototype.unobserveUsing = function(t) {
    var e = this._observers;
    if (e !== null && e.has(t)) {
      e.delete(t), v(
        this._fragmentFiber.child,
        !1,
        Xg,
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
  function Xg(t, e) {
    return t.tag === 6 || (t = k(t), e.unobserve(t)), !1;
  }
  var hl = [], Qr = !1;
  function Vg(t, e, l) {
    hl.push({
      fragmentInstance: t,
      observer: e,
      instance: l
    }), Qr || (Qr = !0, Ig(function() {
      Qr = !1;
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
    return v(
      this._fragmentFiber.child,
      !1,
      Qg,
      t,
      void 0,
      void 0
    ), t;
  };
  function Qg(t, e) {
    if (t.tag === 6) {
      t = t.stateNode;
      var l = t.ownerDocument.createRange();
      l.selectNodeContents(t), e.push.apply(e, l.getClientRects());
    } else
      t = k(t), e.push.apply(e, t.getClientRects());
    return !1;
  }
  Ie.prototype.getRootNode = function(t) {
    var e = w(
      this._fragmentFiber
    );
    return e === null ? this : k(e).getRootNode(t);
  }, Ie.prototype.compareDocumentPosition = function(t) {
    var e = w(
      this._fragmentFiber
    );
    if (e === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var l = [];
    v(
      this._fragmentFiber.child,
      !1,
      Vr,
      l,
      void 0,
      void 0
    );
    var a = k(e);
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
      return l === t ? n = Node.DOCUMENT_POSITION_CONTAINS : a & Node.DOCUMENT_POSITION_CONTAINED_BY && (l = Z(e)[1], l === null ? n = Node.DOCUMENT_POSITION_PRECEDING : (t = k(l).compareDocumentPosition(
        t
      ), n = t === 0 || t & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), n |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    e = k(l[0]), n = k(l[l.length - 1]);
    var u = H(this._fragmentFiber) ? e.parentElement : a;
    if (u == null)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    a = u.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_CONTAINED_BY, u = u.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var c = e.compareDocumentPosition(t), o = n.compareDocumentPosition(t), g = c & Node.DOCUMENT_POSITION_CONTAINED_BY || o & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return o = a && u && c & Node.DOCUMENT_POSITION_FOLLOWING && o & Node.DOCUMENT_POSITION_PRECEDING, e = a && e === t || u && n === t || g || o ? Node.DOCUMENT_POSITION_CONTAINED_BY : !a && e === t || !u && n === t ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : c, e & Node.DOCUMENT_POSITION_DISCONNECTED || e & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || Zg(
      e,
      this._fragmentFiber,
      l[0],
      l[l.length - 1],
      t
    ) ? e : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function Zg(t, e, l, a, n) {
    var u = ja(n);
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
        for (u = e, e = w(e); u !== null; ) {
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
    return t & Node.DOCUMENT_POSITION_PRECEDING ? ((e = !!u) && !(e = u === l) && (e = Dt(
      l,
      u,
      st
    ), e === null ? e = !1 : (v(
      e,
      !0,
      Q,
      u,
      l
    ), u = ot, ot = null, e = u !== null)), e) : t & Node.DOCUMENT_POSITION_FOLLOWING ? ((e = !!u) && !(e = u === a) && (e = Dt(
      a,
      u,
      st
    ), e === null ? e = !1 : (v(
      e,
      !0,
      xt,
      u,
      a
    ), u = ot, G = ot = null, e = u !== null)), e) : !1;
  }
  function gh(t, e) {
    var l = t.ownerDocument.createRange();
    l.selectNodeContents(t), t = l.getBoundingClientRect(), window.scrollTo(
      window.scrollX + t.left,
      e ? window.scrollY + t.top : window.scrollY + t.bottom - window.innerHeight
    );
  }
  Ie.prototype.scrollIntoView = function(t) {
    if (typeof t == "object") throw Error(s(566));
    var e = [];
    v(
      this._fragmentFiber.child,
      !1,
      Vr,
      e,
      void 0,
      void 0
    );
    var l = t !== !1;
    if (e.length === 0) {
      var a = Z(
        this._fragmentFiber
      );
      if (a = l ? a[1] || a[0] || w(this._fragmentFiber) : a[0] || a[1], a === null) return;
      if (a.tag === 6) {
        t = k(a), gh(t, l);
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
      n.tag === 6 ? (n = k(n), gh(n, l)) : k(n).scrollIntoView(t), a += l ? -1 : 1;
    }
  };
  function Kg(t, e) {
    return t = k(t), yh(t, e), !1;
  }
  function yh(t, e) {
    t.reactFragments == null && (t.reactFragments = /* @__PURE__ */ new Set()), t.reactFragments.add(e);
  }
  function bh(t, e) {
    var l = e._eventListeners;
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var n = l[a];
        t.addEventListener(
          n.type,
          n.attachedListener,
          Xn(n.optionsOrUseCapture)
        );
      }
    t.nodeType !== 3 && (l = e._observers, l !== null && l.forEach(function(u) {
      for (var c = 0, o = 0; o < hl.length; o++) {
        var g = hl[o];
        (g.fragmentInstance !== e || g.observer !== u || g.instance !== t) && (hl[c++] = g);
      }
      hl.length = c, u.observe(t);
    }), yh(t, e));
  }
  function Jg(t, e) {
    var l = e._eventListeners;
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var n = l[a];
        t.removeEventListener(
          n.type,
          n.attachedListener,
          Xn(n.optionsOrUseCapture)
        );
      }
    t.nodeType !== 3 && (l = e._observers, l !== null && l.forEach(function(u) {
      typeof u.rootMargin == "string" ? Vg(
        e,
        u,
        t
      ) : u.unobserve(t);
    }), t.reactFragments != null && t.reactFragments.delete(e));
  }
  function Zr(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var l = e;
      switch (e = e.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Zr(l), ai(l);
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
  function $g(t, e, l, a) {
    for (; t.nodeType === 1; ) {
      var n = l;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!a && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (a) {
        if (!t[tu])
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
      if (t = cl(t.nextSibling), t === null) break;
    }
    return null;
  }
  function kg(t, e, l) {
    if (e === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l || (t = cl(t.nextSibling), t === null)) return null;
    return t;
  }
  function ph(t, e) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = cl(t.nextSibling), t === null)) return null;
    return t;
  }
  function Kr(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Jr(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function Fg(t, e) {
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
  function cl(t) {
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
  var $r = null;
  function Sh(t) {
    t = t.nextSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var l = t.data;
        if (l === "/$" || l === "/&") {
          if (e === 0)
            return cl(t.nextSibling);
          e--;
        } else
          l !== "$" && l !== "$!" && l !== "$?" && l !== "$~" && l !== "&" || e++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function _h(t) {
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
  function Wg(t, e) {
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
  function Ig(t) {
    ch(function() {
      ch(function(e) {
        return t(e);
      });
    });
  }
  function Eh(t, e, l) {
    switch (e = Bu(l), t) {
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
  function Th(t, e, l) {
    for (var a in l) {
      var n = l[a];
      l.hasOwnProperty(a) && n != null && Kt(t, e, a, null, Og, n);
    }
    l.dangerouslySetInnerHTML != null && (t.textContent = ""), t.onclick === yl && (t.onclick = null), ai(t);
  }
  function kr(t) {
    for (var e = t.attributes; e.length; )
      t.removeAttributeNode(e[0]);
    ai(t);
  }
  var sl = /* @__PURE__ */ new Map(), Nh = /* @__PURE__ */ new Set();
  function Hu(t) {
    if (typeof t.getRootNode == "function") {
      var e = t.getRootNode();
      if (e.nodeType === 9 || e.nodeType === 11) return e;
    }
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  var Kl = at.d;
  at.d = {
    f: Pg,
    r: ty,
    D: ey,
    C: ly,
    L: ay,
    m: ny,
    X: iy,
    S: uy,
    M: cy
  };
  function Pg() {
    var t = Kl.f(), e = ic();
    return t || e;
  }
  function ty(t) {
    var e = cn(t);
    e !== null && e.tag === 5 && e.type === "form" ? Md(e) : Kl.r(t);
  }
  var Vn = typeof document > "u" ? null : document;
  function xh(t, e, l) {
    var a = Vn;
    if (a && typeof e == "string" && e) {
      var n = tl(e);
      n = 'link[rel="' + t + '"][href="' + n + '"]', typeof l == "string" && (n += '[crossorigin="' + l + '"]'), Nh.has(n) || (Nh.add(n), t = { rel: t, crossOrigin: l, href: e }, a.querySelector(n) === null && (e = a.createElement("link"), Oe(e, "link", t), ge(e), a.head.appendChild(e)));
    }
  }
  function ey(t) {
    Kl.D(t), xh("dns-prefetch", t, null);
  }
  function ly(t, e) {
    Kl.C(t, e), xh("preconnect", t, e);
  }
  function ay(t, e, l) {
    Kl.L(t, e, l);
    var a = Vn;
    if (a && t && e) {
      var n = 'link[rel="preload"][as="' + tl(e) + '"]';
      e === "image" && l && l.imageSrcSet ? (n += '[imagesrcset="' + tl(
        l.imageSrcSet
      ) + '"]', typeof l.imageSizes == "string" && (n += '[imagesizes="' + tl(
        l.imageSizes
      ) + '"]')) : n += '[href="' + tl(t) + '"]';
      var u = n;
      switch (e) {
        case "style":
          u = Qn(t);
          break;
        case "script":
          u = Zn(t);
      }
      if (!(sl.has(u) || (t = K(
        {
          rel: "preload",
          href: e === "image" && l && l.imageSrcSet ? void 0 : t,
          as: e
        },
        l
      ), sl.set(u, t), a.querySelector(n) !== null || e === "style" && a.querySelector(Lu(u)) || e === "script" && a.querySelector(Yu(u))))) {
        var c = a.createElement("link");
        Oe(c, "link", t), e === "style" && (c[li] = !0, c.onload = c.onerror = function() {
          Ho(c);
        }), ge(c), a.head.appendChild(c);
      }
    }
  }
  function ny(t, e) {
    Kl.m(t, e);
    var l = Vn;
    if (l && t) {
      var a = e && typeof e.as == "string" ? e.as : "script", n = 'link[rel="modulepreload"][as="' + tl(a) + '"][href="' + tl(t) + '"]', u = n;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = Zn(t);
      }
      if (!sl.has(u) && (t = K({ rel: "modulepreload", href: t }, e), sl.set(u, t), l.querySelector(n) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(Yu(u)))
              return;
        }
        a = l.createElement("link"), Oe(a, "link", t), ge(a), l.head.appendChild(a);
      }
    }
  }
  function uy(t, e, l) {
    Kl.S(t, e, l);
    var a = Vn;
    if (a && t) {
      var n = sn(a).hoistableStyles, u = Qn(t);
      e = e || "default";
      var c = n.get(u);
      if (!c) {
        var o = { loading: 0, preload: null };
        if (c = a.querySelector(
          Lu(u)
        ))
          o.loading = 5;
        else {
          t = K(
            { rel: "stylesheet", href: t, "data-precedence": e },
            l
          ), (l = sl.get(u)) && Fr(t, l);
          var g = c = a.createElement("link");
          ge(g), Oe(g, "link", t), g._p = new Promise(function(N, A) {
            g.onload = N, g.onerror = A;
          }), g.addEventListener("load", function() {
            o.loading |= 1;
          }), g.addEventListener("error", function() {
            o.loading |= 2;
          }), o.loading |= 4, mc(c, e, a);
        }
        c = {
          type: "stylesheet",
          instance: c,
          count: 1,
          state: o
        }, n.set(u, c);
      }
    }
  }
  function iy(t, e) {
    Kl.X(t, e);
    var l = Vn;
    if (l && t) {
      var a = sn(l).hoistableScripts, n = Zn(t), u = a.get(n);
      u || (u = l.querySelector(Yu(n)), u || (t = K({ src: t, async: !0 }, e), (e = sl.get(n)) && Wr(t, e), u = l.createElement("script"), ge(u), Oe(u, "link", t), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function cy(t, e) {
    Kl.M(t, e);
    var l = Vn;
    if (l && t) {
      var a = sn(l).hoistableScripts, n = Zn(t), u = a.get(n);
      u || (u = l.querySelector(Yu(n)), u || (t = K({ src: t, async: !0, type: "module" }, e), (e = sl.get(n)) && Wr(t, e), u = l.createElement("script"), ge(u), Oe(u, "link", t), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function Mh(t, e, l, a) {
    var n = (n = Mt.current) ? Hu(n) : null;
    if (!n) throw Error(s(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string" ? (l = Qn(l.href), e = sn(
          n
        ).hoistableStyles, a = e.get(l), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, e.set(l, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          t = Qn(l.href);
          var u = sn(
            n
          ).hoistableStyles, c = u.get(t);
          if (c || (n = n.ownerDocument || n, c = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(t, c), (u = n.querySelector(
            Lu(t)
          )) ? u._p || (c.instance = u, c.state.loading = 5) : (u = sl.get(t), u || (u = {
            rel: "preload",
            as: "style",
            href: l.href,
            crossOrigin: l.crossOrigin,
            integrity: l.integrity,
            media: l.media,
            hrefLang: l.hrefLang,
            referrerPolicy: l.referrerPolicy
          }, sl.set(t, u)), sy(
            n,
            t,
            u,
            c.state
          ))), e && a === null)
            throw Error(s(528, ""));
          return c;
        }
        if (e && a !== null)
          throw Error(s(529, ""));
        return null;
      case "script":
        return e = l.async, l = l.src, typeof l == "string" && e && typeof e != "function" && typeof e != "symbol" ? (l = Zn(l), e = sn(
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
  function Qn(t) {
    return 'href="' + tl(t) + '"';
  }
  function Lu(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function Oh(t) {
    return K({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function sy(t, e, l, a) {
    if (e = t.querySelector(
      'link[rel="preload"][as="style"][' + e + "]"
    )) {
      if (e[li] !== !0) {
        a.loading = 1;
        return;
      }
    } else
      e = t.createElement("link"), e[li] = !0, e.onload = e.onerror = Ho.bind(null, e), Oe(e, "link", l), ge(e), t.head.appendChild(e);
    a.preload = e, e.addEventListener("load", function() {
      return a.loading |= 1;
    }), e.addEventListener("error", function() {
      return a.loading |= 2;
    });
  }
  function Zn(t) {
    return '[src="' + tl(t) + '"]';
  }
  function Yu(t) {
    return "script[async]" + t;
  }
  function zh(t, e, l) {
    if (e.count++, e.instance === null)
      switch (e.type) {
        case "style":
          var a = t.querySelector(
            'style[data-href~="' + tl(l.href) + '"]'
          );
          if (a)
            return e.instance = a, ge(a), a;
          var n = K({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          return a = (t.ownerDocument || t).createElement(
            "style"
          ), ge(a), Oe(a, "style", n), mc(a, l.precedence, t), e.instance = a;
        case "stylesheet":
          n = Qn(l.href);
          var u = t.querySelector(
            Lu(n)
          );
          if (u)
            return e.state.loading |= 4, e.instance = u, ge(u), u;
          a = Oh(l), (n = sl.get(n)) && Fr(a, n), u = (t.ownerDocument || t).createElement("link"), ge(u);
          var c = u;
          return c._p = new Promise(function(o, g) {
            c.onload = o, c.onerror = g;
          }), Oe(u, "link", a), e.state.loading |= 4, mc(u, l.precedence, t), e.instance = u;
        case "script":
          return u = Zn(l.src), (n = t.querySelector(
            Yu(u)
          )) ? (e.instance = n, ge(n), n) : (a = l, (n = sl.get(u)) && (a = K({}, l), Wr(a, n)), t = t.ownerDocument || t, n = t.createElement("script"), ge(n), Oe(n, "link", a), t.head.appendChild(n), e.instance = n);
        case "void":
          return null;
        default:
          throw Error(s(443, e.type));
      }
    else
      e.type === "stylesheet" && (e.state.loading & 4) === 0 && (a = e.instance, e.state.loading |= 4, mc(a, l.precedence, t));
    return e.instance;
  }
  function mc(t, e, l) {
    for (var a = l.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), n = a.length ? a[a.length - 1] : null, u = n, c = 0; c < a.length; c++) {
      var o = a[c];
      if (o.dataset.precedence === e) u = o;
      else if (u !== n) break;
    }
    u ? u.parentNode.insertBefore(t, u.nextSibling) : (e = l.nodeType === 9 ? l.head : l, e.insertBefore(t, e.firstChild));
  }
  function Fr(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.title == null && (t.title = e.title);
  }
  function Wr(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.integrity == null && (t.integrity = e.integrity);
  }
  var hc = null;
  function Ah(t, e, l) {
    if (hc === null) {
      var a = /* @__PURE__ */ new Map(), n = hc = /* @__PURE__ */ new Map();
      n.set(l, a);
    } else
      n = hc, a = n.get(l), a || (a = /* @__PURE__ */ new Map(), n.set(l, a));
    if (a.has(t)) return a;
    for (a.set(t, null), l = l.getElementsByTagName(t), n = 0; n < l.length; n++) {
      var u = l[n];
      if (!(u[tu] || u[Ee] || t === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var c = u.getAttribute(e) || "";
        c = t + c;
        var o = a.get(c);
        o ? o.push(u) : a.set(c, [u]);
      }
    }
    return a;
  }
  function Ir(t, e, l) {
    t = t.ownerDocument || t, t.head.insertBefore(
      l,
      e === "title" ? t.querySelector("head > title") : null
    );
  }
  function ry(t, e, l) {
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
  function Ch(t, e) {
    return t === "img" && e.src != null && e.src !== "" && e.onLoad == null && e.loading !== "lazy";
  }
  function jh(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function wh(t) {
    return (t.width || 100) * (t.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
  }
  function Rh(t, e) {
    typeof e.decode == "function" && (t.imgCount++, e.complete || (t.imgBytes += wh(e), t.suspenseyImages.push(e)), t = dy.bind(t), e.decode().then(t, t));
  }
  function oy(t, e, l, a) {
    if (l.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var n = Qn(a.href), u = e.querySelector(
          Lu(n)
        );
        if (u) {
          e = u._p, e !== null && typeof e == "object" && typeof e.then == "function" && (t.count++, t = qu.bind(t), e.then(t, t)), l.state.loading |= 4, l.instance = u, ge(u);
          return;
        }
        u = e.ownerDocument || e, a = Oh(a), (n = sl.get(n)) && Fr(a, n), u = u.createElement("link"), ge(u);
        var c = u;
        c._p = new Promise(function(o, g) {
          c.onload = o, c.onerror = g;
        }), Oe(u, "link", a), l.instance = u;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(l, e), (e = l.state.preload) && (l.state.loading & 3) === 0 && (t.count++, l = qu.bind(t), e.addEventListener("load", l), e.addEventListener("error", l));
    }
  }
  var vc = 0;
  function fy(t, e) {
    return t.stylesheets && t.count === 0 && yc(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(l) {
      var a = setTimeout(function() {
        if (t.stylesheets && yc(t, t.stylesheets), t.unsuspend) {
          var u = t.unsuspend;
          t.unsuspend = null, u();
        }
      }, 6e4 + e);
      0 < t.imgBytes && vc === 0 && (vc = 62500 * Ag());
      var n = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && yc(t, t.stylesheets), t.unsuspend)) {
            var u = t.unsuspend;
            t.unsuspend = null, u();
          }
        },
        (t.imgBytes > vc ? 50 : 800) + e
      );
      return t.unsuspend = l, function() {
        t.unsuspend = null, clearTimeout(a), clearTimeout(n);
      };
    } : null;
  }
  function Dh(t) {
    if (t.count === 0 && (t.imgCount === 0 || !t.waitingForImages)) {
      if (t.stylesheets) yc(t, t.stylesheets);
      else if (t.unsuspend) {
        var e = t.unsuspend;
        t.unsuspend = null, e();
      }
    }
  }
  function qu() {
    this.count--, Dh(this);
  }
  function dy() {
    this.imgCount--, Dh(this);
  }
  var gc = null;
  function yc(t, e) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, gc = /* @__PURE__ */ new Map(), e.forEach(my, t), gc = null, qu.call(t));
  }
  function my(t, e) {
    if (!(e.state.loading & 4)) {
      var l = gc.get(t);
      if (l) var a = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), gc.set(t, l);
        for (var n = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < n.length; u++) {
          var c = n[u];
          (c.nodeName === "LINK" || c.getAttribute("media") !== "not all") && (l.set(c.dataset.precedence, c), a = c);
        }
        a && l.set(null, a);
      }
      n = e.instance, c = n.getAttribute("data-precedence"), u = l.get(c) || a, u === a && l.set(null, n), l.set(c, n), this.count++, a = qu.bind(this), n.addEventListener("load", a), n.addEventListener("error", a), u ? u.parentNode.insertBefore(n, u.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(n, t.firstChild)), e.state.loading |= 4;
    }
  }
  var Kn = {
    $$typeof: Bt,
    Provider: null,
    Consumer: null,
    _currentValue: ie,
    _currentValue2: ie,
    _threadCount: 0
  };
  function hy(t, e, l, a, n, u, c, o, g) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = wc(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = wc(0), this.hiddenUpdates = wc(null), this.identifierPrefix = a, this.onUncaughtError = n, this.onCaughtError = u, this.onRecoverableError = c, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = g, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Uh(t, e, l, a, n, u, c, o, g, N, A, B) {
    return t = new hy(
      t,
      e,
      l,
      c,
      g,
      N,
      A,
      B,
      o
    ), e = 1, u === !0 && (e |= 24), u = Le(3, null, null, e), t.current = u, u.stateNode = t, e = ms(), e.refCount++, t.pooledCache = e, e.refCount++, u.memoizedState = {
      element: a,
      isDehydrated: l,
      cache: e
    }, ys(u), t;
  }
  function Bh(t) {
    return t ? (t = bn, t) : bn;
  }
  function Hh(t, e, l, a, n, u) {
    n = Bh(n), a.context === null ? a.context = n : a.pendingContext = n, a = na(e), a.payload = { element: l }, u = u === void 0 ? null : u, u !== null && (a.callback = u), l = ua(t, a, e), l !== null && (Xe(l, t, e), yu(l, t, e));
  }
  function Lh(t, e) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var l = t.retryLane;
      t.retryLane = l !== 0 && l < e ? l : e;
    }
  }
  function Pr(t, e) {
    Lh(t, e), (t = t.alternate) && Lh(t, e);
  }
  function Yh(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Ua(t, 67108864);
      e !== null && Xe(e, t, 67108864), Pr(t, 67108864);
    }
  }
  function qh(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = We();
      e = Rc(e);
      var l = Ua(t, e);
      l !== null && Xe(l, t, e), Pr(t, e);
    }
  }
  var Jn = !0;
  function vy(t, e, l, a) {
    var n = J.T;
    J.T = null;
    var u = at.p;
    try {
      at.p = 2, to(t, e, l, a);
    } finally {
      at.p = u, J.T = n;
    }
  }
  function gy(t, e, l, a) {
    var n = J.T;
    J.T = null;
    var u = at.p;
    try {
      at.p = 8, to(t, e, l, a);
    } finally {
      at.p = u, J.T = n;
    }
  }
  function to(t, e, l, a) {
    if (Jn) {
      var n = eo(a);
      if (n === null)
        Ur(
          t,
          e,
          a,
          bc,
          l
        ), Xh(t, a);
      else if (by(
        n,
        t,
        e,
        l,
        a
      ))
        a.stopPropagation();
      else if (Xh(t, a), e & 4 && -1 < yy.indexOf(t)) {
        for (; n !== null; ) {
          var u = cn(n);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var c = Ca(u.pendingLanes);
                  if (c !== 0) {
                    var o = u;
                    for (o.pendingLanes |= 2, o.entangledLanes |= 2; c; ) {
                      var g = 1 << 31 - Qe(c);
                      o.entanglements[1] |= g, c &= ~g;
                    }
                    Ol(u), (qt & 6) === 0 && (ac = Yt() + 500, Ru(0));
                  }
                }
                break;
              case 31:
              case 13:
                o = Ua(u, 2), o !== null && Xe(o, u, 2), ic(), Pr(u, 2);
            }
          if (u = eo(a), u === null && Ur(
            t,
            e,
            a,
            bc,
            l
          ), u === n) break;
          n = u;
        }
        n !== null && a.stopPropagation();
      } else
        Ur(
          t,
          e,
          a,
          null,
          l
        );
    }
  }
  function eo(t) {
    return t = qc(t), lo(t);
  }
  var bc = null;
  function lo(t) {
    if (bc = null, t = ja(t), t !== null) {
      var e = h(t);
      if (e === null) t = null;
      else {
        var l = e.tag;
        if (l === 13) {
          if (t = y(e), t !== null) return t;
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
    return bc = t, null;
  }
  function Gh(t) {
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
        switch (we()) {
          case _e:
            return 2;
          case M:
            return 8;
          case nt:
          case Vt:
            return 32;
          case ee:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var ao = !1, ya = null, ba = null, pa = null, Gu = /* @__PURE__ */ new Map(), Xu = /* @__PURE__ */ new Map(), Sa = [], yy = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Xh(t, e) {
    switch (t) {
      case "focusin":
      case "focusout":
        ya = null;
        break;
      case "dragenter":
      case "dragleave":
        ba = null;
        break;
      case "mouseover":
      case "mouseout":
        pa = null;
        break;
      case "pointerover":
      case "pointerout":
        Gu.delete(e.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Xu.delete(e.pointerId);
    }
  }
  function Vu(t, e, l, a, n, u) {
    return t === null || t.nativeEvent !== u ? (t = {
      blockedOn: e,
      domEventName: l,
      eventSystemFlags: a,
      nativeEvent: u,
      targetContainers: [n]
    }, e !== null && (e = cn(e), e !== null && Yh(e)), t) : (t.eventSystemFlags |= a, e = t.targetContainers, n !== null && e.indexOf(n) === -1 && e.push(n), t);
  }
  function by(t, e, l, a, n) {
    switch (e) {
      case "focusin":
        return ya = Vu(
          ya,
          t,
          e,
          l,
          a,
          n
        ), !0;
      case "dragenter":
        return ba = Vu(
          ba,
          t,
          e,
          l,
          a,
          n
        ), !0;
      case "mouseover":
        return pa = Vu(
          pa,
          t,
          e,
          l,
          a,
          n
        ), !0;
      case "pointerover":
        var u = n.pointerId;
        return Gu.set(
          u,
          Vu(
            Gu.get(u) || null,
            t,
            e,
            l,
            a,
            n
          )
        ), !0;
      case "gotpointercapture":
        return u = n.pointerId, Xu.set(
          u,
          Vu(
            Xu.get(u) || null,
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
  function Vh(t) {
    var e = ja(t.target);
    if (e !== null) {
      var l = h(e);
      if (l !== null) {
        if (e = l.tag, e === 13) {
          if (e = y(l), e !== null) {
            t.blockedOn = e, Do(t.priority, function() {
              qh(l);
            });
            return;
          }
        } else if (e === 31) {
          if (e = S(l), e !== null) {
            t.blockedOn = e, Do(t.priority, function() {
              qh(l);
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
  function pc(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var l = eo(t.nativeEvent);
      if (l === null) {
        l = t.nativeEvent;
        var a = new l.constructor(
          l.type,
          l
        );
        Yc = a, l.target.dispatchEvent(a), Yc = null;
      } else
        return e = cn(l), e !== null && Yh(e), t.blockedOn = l, !1;
      e.shift();
    }
    return !0;
  }
  function Qh(t, e, l) {
    pc(t) && l.delete(e);
  }
  function py() {
    ao = !1, ya !== null && pc(ya) && (ya = null), ba !== null && pc(ba) && (ba = null), pa !== null && pc(pa) && (pa = null), Gu.forEach(Qh), Xu.forEach(Qh);
  }
  function Sc(t, e) {
    t.blockedOn === e && (t.blockedOn = null, ao || (ao = !0, i.unstable_scheduleCallback(
      i.unstable_NormalPriority,
      py
    )));
  }
  var _c = null;
  function Zh(t) {
    _c !== t && (_c = t, i.unstable_scheduleCallback(
      i.unstable_NormalPriority,
      function() {
        _c === t && (_c = null);
        for (var e = 0; e < t.length; e += 3) {
          var l = t[e], a = t[e + 1], n = t[e + 2];
          if (typeof a != "function") {
            if (lo(a || l) === null)
              continue;
            break;
          }
          var u = cn(l);
          u !== null && (t.splice(e, 3), e -= 3, Ls(
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
  function $n(t) {
    function e(g) {
      return Sc(g, t);
    }
    ya !== null && Sc(ya, t), ba !== null && Sc(ba, t), pa !== null && Sc(pa, t), Gu.forEach(e), Xu.forEach(e);
    for (var l = 0; l < Sa.length; l++) {
      var a = Sa[l];
      a.blockedOn === t && (a.blockedOn = null);
    }
    for (; 0 < Sa.length && (l = Sa[0], l.blockedOn === null); )
      Vh(l), l.blockedOn === null && Sa.shift();
    if (l = (t.ownerDocument || t).$$reactFormReplay, l != null)
      for (a = 0; a < l.length; a += 3) {
        var n = l[a], u = l[a + 1], c = n[He] || null;
        if (typeof u == "function")
          c || Zh(l);
        else if (c) {
          var o = null;
          if (u && u.hasAttribute("formAction")) {
            if (n = u, c = u[He] || null)
              o = c.formAction;
            else if (lo(n) !== null) continue;
          } else o = c.action;
          typeof o == "function" ? l[a + 1] = o : (l.splice(a, 3), a -= 3), Zh(l);
        }
      }
  }
  function Kh() {
    function t(u) {
      u.canIntercept && u.info === "react-transition" && u.intercept({
        handler: function() {
          return new Promise(function(c) {
            return n = c;
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
  function no(t) {
    this._internalRoot = t;
  }
  Ec.prototype.render = no.prototype.render = function(t) {
    var e = this._internalRoot;
    if (e === null) throw Error(s(409));
    var l = e.current, a = We();
    Hh(l, a, t, e, null, null);
  }, Ec.prototype.unmount = no.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var e = t.containerInfo;
      Hh(t.current, 2, null, t, null, null), ic(), e[un] = null;
    }
  };
  function Ec(t) {
    this._internalRoot = t;
  }
  Ec.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var e = Ro();
      t = { blockedOn: null, target: t, priority: e };
      for (var l = 0; l < Sa.length && e !== 0 && e < Sa[l].priority; l++) ;
      Sa.splice(l, 0, t), l === 0 && Vh(t);
    }
  };
  var Jh = f.version;
  if (Jh !== "19.3.0")
    throw Error(
      s(
        527,
        Jh,
        "19.3.0"
      )
    );
  at.findDOMNode = function(t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function" ? Error(s(188)) : (t = Object.keys(t).join(","), Error(s(268, t)));
    return t = z(e), t = t !== null ? E(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var Sy = {
    bundleType: 0,
    version: "19.3.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: J,
    reconcilerVersion: "19.3.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Tc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Tc.isDisabled && Tc.supportsFiber)
      try {
        jl = Tc.inject(
          Sy
        ), Ve = Tc;
      } catch {
      }
  }
  return Zu.createRoot = function(t, e) {
    if (!m(t)) throw Error(s(299));
    var l = !1, a = "", n = Bd, u = Hd, c = Ld;
    return e != null && (e.unstable_strictMode === !0 && (l = !0), e.identifierPrefix !== void 0 && (a = e.identifierPrefix), e.onUncaughtError !== void 0 && (n = e.onUncaughtError), e.onCaughtError !== void 0 && (u = e.onCaughtError), e.onRecoverableError !== void 0 && (c = e.onRecoverableError)), e = Uh(
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
      c,
      Kh
    ), t[un] = e.current, Dr(t), new no(e);
  }, Zu.hydrateRoot = function(t, e, l) {
    if (!m(t)) throw Error(s(299));
    var a = !1, n = "", u = Bd, c = Hd, o = Ld, g = null;
    return l != null && (l.unstable_strictMode === !0 && (a = !0), l.identifierPrefix !== void 0 && (n = l.identifierPrefix), l.onUncaughtError !== void 0 && (u = l.onUncaughtError), l.onCaughtError !== void 0 && (c = l.onCaughtError), l.onRecoverableError !== void 0 && (o = l.onRecoverableError), l.formState !== void 0 && (g = l.formState)), e = Uh(
      t,
      1,
      !0,
      e,
      l ?? null,
      a,
      n,
      g,
      u,
      c,
      o,
      Kh
    ), e.context = Bh(null), l = e.current, a = We(), a = Rc(a), n = na(a), n.callback = null, ua(l, n, a), l = a, e.current.lanes = l, Pn(e, l), Ol(e), t[un] = e.current, Dr(t), new Ec(e);
  }, Zu.version = "19.3.0", Zu;
}
var a0;
function Cy() {
  if (a0) return co.exports;
  a0 = 1;
  function i() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i);
      } catch (f) {
        console.error(f);
      }
  }
  return i(), co.exports = Ay(), co.exports;
}
var jy = Cy();
function v0(i, f) {
  const r = Number.isFinite(f) && f > 0 ? f : 1 / 0, s = i.filter((y) => Number.isFinite(y.start) && y.start >= 0 && y.start < r).slice().sort((y, S) => y.start - S.start);
  let m = r;
  const h = new Array(s.length);
  for (let y = s.length - 1; y >= 0; y -= 1)
    y + 1 < s.length && s[y + 1].start > s[y].start && (m = s[y + 1].start), h[y] = m;
  return s.flatMap((y, S) => {
    const C = h[S], z = Math.min(y.end ?? C, r);
    return !Number.isFinite(z) || z <= y.start ? [] : [{
      start: y.start,
      end: z,
      text: y.label ?? "",
      ..."id" in y && typeof y.id == "string" ? { id: y.id } : {}
    }];
  });
}
function wy(i, f, r, s) {
  return !Number.isFinite(r) || r < 0 ? [] : v0(i, s).flatMap((m) => {
    if (!(m.start <= r && r < m.end) || !m.text.trim()) return [];
    const h = f.filter((y) => !Number.isFinite(y.start) || !Number.isFinite(y.end) || y.end <= y.start ? !1 : m.id && y.lineId !== void 0 ? y.lineId === m.id : y.start >= m.start && y.end <= m.end).slice().sort((y, S) => y.start - S.start).map((y) => ({
      text: y.label ?? "",
      start: y.start,
      end: y.end,
      active: y.start <= r && r < y.end
    })).filter((y) => y.text.trim());
    return [{ text: m.text, words: h }];
  });
}
const xc = 180, g0 = 128, y0 = 640;
function Ju(i, f = 144) {
  return Math.max(g0, Math.min(
    y0,
    Number.isFinite(i) ? Math.round(i) : f
  ));
}
function b0(i, f, r) {
  return f ? r ? i : "waveform" : "spectrogram";
}
function Ry(i, f, r) {
  return Number.isFinite(i) ? i * (f === 1 ? 16 : f === 2 ? r : 1) : 0;
}
function Dy(i, f) {
  return Math.max(0, Math.min(xc, i - Math.max(-240, Math.min(240, f)) * 0.08));
}
function Uy(i, f) {
  return Ju(i * Math.exp(-Math.max(-240, Math.min(240, f)) * 2e-3));
}
function n0(i, f, r) {
  return Math.max(0, i * f - r);
}
function Ta(i) {
  if (!i.id || !Number.isSafeInteger(i.startSample) || !Number.isSafeInteger(i.endSample) || !Number.isFinite(i.sampleRate) || i.sampleRate <= 0 || i.startSample < 0 || i.endSample <= i.startSample)
    throw new RangeError("A loop needs an id, valid sample rate and increasing integer sample bounds");
  return {
    start: i.startSample / i.sampleRate,
    end: i.endSample / i.sampleRate,
    duration: (i.endSample - i.startSample) / i.sampleRate
  };
}
function By(i, f = 0) {
  const r = /* @__PURE__ */ new Set();
  return i.filter((s) => {
    try {
      const m = Ta(s);
      return r.has(s.id) || f > 0 && m.end > f + 0.02 ? !1 : (r.add(s.id), !0);
    } catch {
      return !1;
    }
  });
}
function vo(i, f, r) {
  const s = r - f;
  return !Number.isFinite(i) || s <= 0 ? f : f + ((i - f) % s + s) % s;
}
class Hy {
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
    const h = Ta(f);
    this.pause();
    const y = this.generation;
    this.context ??= this.createContext();
    const S = this.context, C = S.resume();
    C.catch(() => {
    });
    const z = f.audioSrc || r, E = JSON.stringify([z, f.startSample, f.endSample, f.sampleRate]);
    try {
      let v = this.cache?.url === E ? this.cache.buffer : null;
      if (!v) {
        const k = new AbortController();
        this.abort = k;
        const ot = await fetch(z, { signal: k.signal, credentials: m });
        if (!ot.ok) throw new Error(`Could not load loop audio (HTTP ${ot.status})`);
        const G = 128 * 1024 * 1024;
        if (Number(ot.headers.get("Content-Length")) > G) throw new Error("Loop audio exceeds 128 MiB");
        const Q = await ot.arrayBuffer();
        if (Q.byteLength > G) throw new Error("Loop audio exceeds 128 MiB");
        if (v = await S.decodeAudioData(Q), y !== this.generation) return !1;
        this.cache = { url: E, buffer: v };
      }
      if (await C, y !== this.generation) return !1;
      const w = f.audioSrc ? 0 : h.start, H = w + h.duration, Z = Math.max(2 / v.sampleRate, 2e-3);
      if (!Number.isFinite(v.duration) || v.duration <= w || H > v.duration + Z || f.audioSrc && Math.abs(v.duration - h.duration) > Z)
        throw new Error("Loop audio duration does not match the reported sample boundaries");
      const L = S.createBufferSource();
      return L.buffer = v, L.loop = !0, L.loopStart = w, L.loopEnd = Math.min(H, v.duration), L.connect(S.destination), this.start = h.start, this.length = L.loopEnd - w, this.offset = vo(s, h.start, h.start + this.length) - h.start, this.anchor = S.currentTime, L.start(this.anchor, w + this.offset), this.node = L, !0;
    } catch (v) {
      if (y !== this.generation) return !1;
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
function Na(i, f, r) {
  return Math.min(r, Math.max(f, i));
}
function xa(i) {
  const f = Math.max(0, Number(i) || 0), r = Math.floor(f / 60), s = Math.floor(f % 60), m = Math.floor((f - Math.floor(f)) * 1e3);
  return `${String(r).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(m).padStart(3, "0")}`;
}
function p0(i) {
  const f = [0.1, 0.25, 0.5, 1, 2, 5, 10, 15, 30, 60, 120, 300, 600];
  return f.find((r) => r * i >= 70) ?? f[f.length - 1];
}
function Ly(i, f, r, s, m) {
  if (m <= 0 || s <= 0) return { start: 0, end: 0 };
  const h = Math.max(0, i - r), y = Math.max(0, i + f - r), S = Na(h / s, 0, m), C = Na(y / s, S, m);
  return { start: S, end: C };
}
function u0(i, f) {
  if (typeof i != "number" || !Number.isFinite(i)) throw new RangeError(`${f} must be finite`);
  return i;
}
function Yy(i, f) {
  const r = f * i.source_audio.sample_rate, s = i.beats;
  let m = 0, h = s.length;
  for (; m < h; ) {
    const y = m + h >>> 1;
    s[y].frame <= r ? m = y + 1 : h = y;
  }
  return Math.max(0, Math.min(s.length - 2, m - 1));
}
function S0(i, f, r = 0.15) {
  if (u0(f, "source seconds"), u0(r, "tolerance") < 0 || r > 60) throw new RangeError("Invalid snap tolerance");
  let s, m;
  if (i.mode === "fixed")
    s = Math.round((f - i.firstBeatSeconds) * i.bpm / 60), m = i.firstBeatSeconds + s * 60 / i.bpm;
  else {
    const y = i.beats, S = i.source_audio.sample_rate, C = Yy(i, f), z = [y[C], y[C + 1]].reduce((E, v) => Math.abs(E.frame / S - f) <= Math.abs(v.frame / S - f) ? E : v);
    s = z.beat - i.origin_beat, m = z.frame / S;
  }
  const h = f - m;
  return {
    beat: s,
    time: m,
    errorSeconds: h,
    errorMilliseconds: h * 1e3,
    withinTolerance: Math.abs(h) <= r,
    mode: i.mode
  };
}
function qy(i, f, r, s = 2e3) {
  if (!(Number.isFinite(f) && Number.isFinite(r) && r > f)) return [];
  const m = Math.max(1, Math.min(2e3, Math.floor(s)));
  if (i.mode === "variable") {
    const E = i.beats.filter((w) => w.frame / i.source_audio.sample_rate >= f && w.frame / i.source_audio.sample_rate <= r), v = Math.max(1, Math.ceil(E.length / m));
    return E.filter((w, H) => H % v === 0).map((w) => ({
      time: w.frame / i.source_audio.sample_rate,
      label: `Observed beat ${w.beat}`,
      emphasis: w.beat === i.origin_beat
    }));
  }
  const h = Math.max(Math.ceil((f - i.firstBeatSeconds) * i.bpm / 60), Math.ceil(-i.firstBeatSeconds * i.bpm / 60)), y = Math.floor((r - i.firstBeatSeconds) * i.bpm / 60), S = Math.max(0, y - h + 1), C = Math.max(1, Math.ceil(S / m)), z = [];
  for (let E = h; E <= y && z.length < m; E += C) z.push({
    time: i.firstBeatSeconds + E * 60 / i.bpm,
    label: `Fixed-BPM grid beat ${E} (not detected)`,
    emphasis: E === 0
  });
  return z;
}
function i0(i, f, r, s) {
  if (!Number.isFinite(r) || !Number.isFinite(s.duration) || s.duration <= 0) throw new RangeError("Invalid timing edit timebase");
  const m = Math.max(0, s.bounds?.start ?? 0, s.previousEnd ?? 0), h = Math.min(s.duration, s.bounds?.end ?? s.duration, s.nextStart ?? s.duration);
  if (h < m) throw new RangeError("No space between neighbouring timing items");
  const y = s.minimumDuration ?? 0;
  if (y < 0) throw new RangeError("minimumDuration must be nonnegative");
  let S = Math.min(h, Math.max(m, r));
  if (s.snap && s.clock) {
    const E = S0(s.clock, S, s.toleranceSeconds ?? 0.15);
    E.withinTolerance && (S = Math.min(h, Math.max(m, E.time)));
  }
  const C = i.end !== void 0 && Number.isFinite(i.end), z = C ? Number(i.end) - i.start : 0;
  if (f === "move") {
    const E = Math.max(m, Math.min(Math.max(m, h - z), S));
    return C ? { ...i, start: E, end: E + z } : { ...i, start: E };
  }
  if (f === "start") {
    const E = C ? i.end - y : h;
    if (E < m) throw new RangeError("No valid start fits within the parent bounds");
    return { ...i, start: Math.min(S, E) };
  }
  if (!C) throw new RangeError("This event has no editable end");
  if (i.start + y > h) throw new RangeError("No valid end fits inside the parent bounds");
  return { ...i, end: Math.max(i.start + y, S) };
}
function c0(i, f, r) {
  const s = i.parentId ? r.parents?.find((S) => S.id === i.parentId) : null, m = f.filter((S) => S.id !== i.id && (S.parentId ?? "") === (i.parentId ?? "")).sort((S, C) => S.start - C.start), h = m.filter((S) => S.start <= i.start).slice(-1)[0], y = m.find((S) => S.start > i.start);
  return {
    duration: r.duration,
    bounds: s ? { start: s.start, end: s.end } : void 0,
    previousEnd: h ? h.end ?? h.start : void 0,
    nextStart: y?.start,
    clock: r.clock,
    snap: r.snap,
    toleranceSeconds: r.toleranceSeconds,
    minimumDuration: 1e-3
  };
}
function Gy(i) {
  const { items: f, kind: r, duration: s, clock: m, selectedId: h, onSelect: y, onEdit: S } = i, C = i.editable === !0 && typeof S == "function", [z, E] = D.useState(null), v = D.useRef(null), w = D.useRef(null), H = (G) => `${Math.max(0, Math.min(100, G * 100 / Math.max(s, 1e-9)))}%`;
  function Z(G, Q, xt) {
    if (!C || G.button !== 0) return;
    const st = G.currentTarget.closest(".rts-track");
    if (!st) return;
    const Dt = st.getBoundingClientRect().width;
    !Number.isFinite(Dt) || Dt <= 0 || (v.current = { id: Q.id, edge: xt, x: G.clientX, origin: Q, width: Dt }, w.current = Q, G.currentTarget.setPointerCapture(G.pointerId), G.stopPropagation(), G.preventDefault(), y?.(Q.id));
  }
  function L(G) {
    const Q = v.current;
    if (!Q || !C) return;
    const xt = (Q.edge === "end" ? Q.origin.end ?? Q.origin.start : Q.origin.start) + (G.clientX - Q.x) * s / Q.width;
    try {
      w.current = i0(Q.origin, Q.edge, xt, c0(Q.origin, f, i)), E(w.current);
    } catch {
    }
    G.stopPropagation();
  }
  function k(G, Q = !1) {
    const xt = v.current;
    xt && (v.current = null, !Q && w.current && S && (w.current.start !== xt.origin.start || w.current.end !== xt.origin.end) && S(w.current), w.current = null, E(null), G.stopPropagation());
  }
  function ot(G, Q, xt) {
    if (!C || G.key !== "ArrowLeft" && G.key !== "ArrowRight") return;
    G.preventDefault(), G.stopPropagation();
    const st = (G.key === "ArrowRight" ? 1 : -1) * (G.shiftKey ? 1e-3 : 0.01), Dt = xt === "end" ? Q.end ?? Q.start : Q.start;
    try {
      S?.(i0(Q, xt, Dt + st, c0(Q, f, i)));
    } catch {
    }
  }
  return /* @__PURE__ */ d.jsx("div", { className: `rts-editable-timing rts-timing-${r}`, role: "group", "aria-label": `${r} timings`, children: f.filter((G) => Number.isFinite(G.start) && G.start >= 0 && G.start <= s).map((G) => {
    const Q = z?.id === G.id ? z : G, xt = Q.end !== void 0 ? Math.max(0.1, (Q.end - Q.start) * 100 / s) : 0.12, st = m ? S0(m, Q.start, i.toleranceSeconds ?? 0.15) : null, Dt = `${G.label} at ${xa(Q.start)}${st ? `, ${st.withinTolerance ? "near" : "off"} ${st.mode} beat ${st.beat}, signed gap ${st.errorMilliseconds.toFixed(1)} ms` : ""}`;
    return /* @__PURE__ */ d.jsxs(
      "div",
      {
        className: `rts-timing-region ${h === G.id ? "is-selected" : ""} ${G.className ?? ""}`,
        style: { left: H(Q.start), width: `${xt}%` },
        children: [
          /* @__PURE__ */ d.jsx(
            "button",
            {
              type: "button",
              className: `rts-timing-handle rts-timing-main ${st?.withinTolerance ? "is-matched" : ""}`,
              "aria-label": `Move ${Dt}`,
              title: Dt,
              "aria-pressed": h === G.id,
              onClick: (K) => {
                K.stopPropagation(), y?.(G.id);
              },
              onPointerDown: (K) => Z(K, G, "move"),
              onPointerMove: L,
              onPointerUp: k,
              onPointerCancel: (K) => k(K, !0),
              onKeyDown: (K) => ot(K, G, "move"),
              children: G.label
            }
          ),
          C && Q.end !== void 0 && /* @__PURE__ */ d.jsx(
            "button",
            {
              type: "button",
              className: "rts-timing-end",
              "aria-label": `Resize end of ${G.label}`,
              title: "Resize end · arrows: 10 ms, Shift: 1 ms",
              onPointerDown: (K) => Z(K, G, "end"),
              onPointerMove: L,
              onPointerUp: k,
              onPointerCancel: (K) => k(K, !0),
              onKeyDown: (K) => ot(K, G, "end")
            }
          ),
          C && Q.end !== void 0 && /* @__PURE__ */ d.jsx(
            "button",
            {
              type: "button",
              className: "rts-timing-start",
              "aria-label": `Resize start of ${G.label}`,
              title: "Resize start · arrows: 10 ms, Shift: 1 ms",
              onPointerDown: (K) => Z(K, G, "start"),
              onPointerMove: L,
              onPointerUp: k,
              onPointerCancel: (K) => k(K, !0),
              onKeyDown: (K) => ot(K, G, "start")
            }
          )
        ]
      },
      G.id
    );
  }) });
}
function go(i, f) {
  return `${Na(i / Math.max(f, 1e-9), 0, 1) * 100}%`;
}
function _0(i, f, r, s = 0.08) {
  const m = Number.isFinite(f) && Number(f) > i ? Number(f) : i + 0.5;
  return `${Math.max(s, (m - i) / Math.max(r, 1e-9) * 100)}%`;
}
function Xy({ min: i, max: f, colour: r = "#79c0ff" }) {
  const s = D.useRef(null);
  return D.useEffect(() => {
    const m = s.current;
    if (!m) return;
    const h = Math.max(1, Math.min(i.length, f.length));
    m.width = h, m.height = 180;
    const y = m.getContext("2d");
    if (!y) return;
    y.clearRect(0, 0, h, m.height), y.strokeStyle = r, y.lineWidth = 1, y.beginPath();
    const S = m.height / 2, C = m.height * 0.46;
    for (let z = 0; z < h; z += 1) {
      const E = z + 0.5;
      y.moveTo(E, S - (Number(f[z]) || 0) * C), y.lineTo(E, S - (Number(i[z]) || 0) * C);
    }
    y.stroke();
  }, [r, f, i]), /* @__PURE__ */ d.jsx("canvas", { ref: s, className: "rts-waveform", "aria-hidden": "true" });
}
function Vy({ rows: i }) {
  const f = D.useRef(null);
  return D.useEffect(() => {
    const r = f.current, s = i.filter((S) => S.length > 0);
    if (!r || !s.length) return;
    const m = Math.max(...s.map((S) => S.length));
    r.width = Math.min(4096, s.length), r.height = Math.min(256, m);
    const h = r.getContext("2d");
    if (!h) return;
    const y = h.createImageData(r.width, r.height);
    for (let S = 0; S < r.width; S += 1) {
      const C = Math.min(s.length - 1, Math.floor(S * s.length / r.width)), z = s[C], E = Math.max(1e-9, ...z.map((v) => Number(v) || 0));
      for (let v = 0; v < r.height; v += 1) {
        const w = Math.min(z.length - 1, Math.floor((r.height - 1 - v) * z.length / r.height)), H = Na((Number(z[w]) || 0) / E, 0, 1), Z = (v * r.width + S) * 4;
        y.data[Z] = Math.round(40 + 180 * H), y.data[Z + 1] = Math.round(35 + 110 * H), y.data[Z + 2] = Math.round(80 + 170 * H), y.data[Z + 3] = 255;
      }
    }
    h.putImageData(y, 0, 0);
  }, [i]), /* @__PURE__ */ d.jsx("canvas", { ref: f, className: "rts-matrix", "aria-hidden": "true" });
}
function Qy({ items: i, duration: f }) {
  const r = i.filter((h) => Number.isFinite(h.value) && h.value > 0);
  if (!r.length) return null;
  const s = Math.log2(Math.max(20, Math.min(...r.map((h) => h.value)))), m = Math.log2(Math.max(100, ...r.map((h) => h.value)));
  return r.map((h, y) => {
    const S = (Math.log2(h.value) - s) / Math.max(0.01, m - s);
    return /* @__PURE__ */ d.jsx(
      "span",
      {
        className: `rts-note ${h.className ?? ""}`,
        style: { left: go(h.start, f), width: _0(h.start, h.end ?? h.start + 0.12, f, 0.04), top: `${8 + (1 - S) * 72}px` },
        title: h.title ?? `${h.label ?? `${h.value.toFixed(1)} Hz`} · ${xa(h.start)}`
      },
      `${h.start}-${y}`
    );
  });
}
function yo({ content: i, duration: f }) {
  switch (i.type) {
    case "waveform":
      return /* @__PURE__ */ d.jsx(Xy, { ...i });
    case "image":
      return /* @__PURE__ */ d.jsx("img", { className: `rts-image ${i.className ?? ""}`, src: i.src, alt: i.alt });
    case "markers":
      return /* @__PURE__ */ d.jsx(d.Fragment, { children: i.items.map((r, s) => /* @__PURE__ */ d.jsx(
        "span",
        {
          className: `rts-marker ${r.emphasis ? "rts-marker-emphasis" : ""} ${r.className ?? ""}`,
          style: { left: go(r.time, f) },
          title: r.label
        },
        `${r.time}-${s}`
      )) });
    case "blocks":
      return /* @__PURE__ */ d.jsx(d.Fragment, { children: i.items.map((r, s) => /* @__PURE__ */ d.jsx(
        "span",
        {
          className: `rts-block ${r.className ?? ""}`,
          style: { left: go(r.start, f), width: _0(r.start, r.end, f) },
          title: r.title ?? `${r.label ?? ""} · ${xa(r.start)}${r.end ? ` — ${xa(r.end)}` : ""}`,
          children: r.label
        },
        `${r.start}-${s}`
      )) });
    case "notes":
      return /* @__PURE__ */ d.jsx(Qy, { items: i.items, duration: f });
    case "curve": {
      const r = i.points.filter((S) => Number.isFinite(S.time) && Number.isFinite(S.value));
      if (!r.length) return null;
      const s = r.map((S) => S.value), m = Math.min(...s), h = Math.max(...s), y = r.map((S) => {
        const C = S.time / Math.max(f, 1e-9) * 2e3, z = 180 - (S.value - m) / Math.max(1e-9, h - m) * 168 - 6;
        return `${C.toFixed(2)},${z.toFixed(2)}`;
      }).join(" ");
      return /* @__PURE__ */ d.jsx("svg", { className: "rts-curve", viewBox: "0 0 2000 180", preserveAspectRatio: "none", "aria-hidden": "true", children: /* @__PURE__ */ d.jsx("polyline", { fill: "none", stroke: i.colour ?? "#7ee787", strokeWidth: "2", vectorEffect: "non-scaling-stroke", points: y }) });
    }
    case "matrix":
      return /* @__PURE__ */ d.jsx(Vy, { ...i });
    case "summary":
      return /* @__PURE__ */ d.jsx("div", { className: "rts-summary", children: i.items.map((r, s) => /* @__PURE__ */ d.jsxs("span", { className: "rts-summary-item", children: [
        /* @__PURE__ */ d.jsxs("strong", { children: [
          r.label,
          ": "
        ] }),
        r.value
      ] }, `${r.label}-${s}`)) });
    case "artifact":
      return /* @__PURE__ */ d.jsxs("div", { className: "rts-artifact", children: [
        /* @__PURE__ */ d.jsx("span", { children: i.note }),
        i.href && /* @__PURE__ */ d.jsx("a", { href: i.href, target: "_blank", rel: "noopener noreferrer", children: i.linkLabel ?? "open" })
      ] });
    case "text":
      return /* @__PURE__ */ d.jsx("div", { className: "rts-text", children: i.text });
    case "timing":
      return /* @__PURE__ */ d.jsx(Gy, { ...i, duration: f });
    case "custom":
      return /* @__PURE__ */ d.jsx(d.Fragment, { children: i.node });
  }
}
function Zy({ content: i, duration: f, view: r }) {
  const s = b0(r, !!i.waveform, !!i.spectrogram);
  return /* @__PURE__ */ d.jsxs("div", { className: `rts-audio-layers rts-audio-${s}`, "data-audio-view": s, children: [
    i.spectrogram && s !== "waveform" && /* @__PURE__ */ d.jsx("div", { className: "rts-audio-spectrum", children: /* @__PURE__ */ d.jsx(yo, { content: { type: "image", ...i.spectrogram }, duration: f }) }),
    i.waveform && s !== "spectrogram" && /* @__PURE__ */ d.jsx("div", { className: "rts-audio-envelope", children: /* @__PURE__ */ d.jsx(yo, { content: { type: "waveform", ...i.waveform, colour: s === "both" ? "#e6fff7" : i.waveform.colour }, duration: f }) }),
    !i.waveform && !i.spectrogram && /* @__PURE__ */ d.jsx("span", { className: "rts-meta", children: "Waiting for audio analysis" })
  ] });
}
function Ky({ config: i, lanes: f, time: r, duration: s, playing: m }) {
  const h = f.filter((L) => L.content.type === "timing" && L.content.kind === "line"), [y, S] = D.useState(null), C = h.find((L) => L.id === (i.laneId ?? y)) ?? (i.laneId === void 0 && y === null ? h[0] : void 0), z = i.items ?? (C?.content.type === "timing" ? C.content.items : []), E = D.useMemo(() => v0(z, s), [z, s]), v = D.useMemo(
    () => wy(z, i.words ?? [], r, s),
    [z, i.words, r, s]
  ), [w, H] = D.useState(), Z = i.artworkSrc && w !== i.artworkSrc;
  return /* @__PURE__ */ d.jsxs("aside", { className: "rts-audition", "aria-label": "Lyric timing audition", children: [
    /* @__PURE__ */ d.jsxs("div", { className: "rts-audition-heading", children: [
      /* @__PURE__ */ d.jsx("strong", { children: "Lyric timing audition" }),
      i.audioLabel && /* @__PURE__ */ d.jsx("span", { className: "rts-audition-source", children: i.audioLabel }),
      i.items === void 0 && i.laneId === void 0 && h.length > 1 && /* @__PURE__ */ d.jsxs("label", { children: [
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
      Z ? /* @__PURE__ */ d.jsx(
        "img",
        {
          src: i.artworkSrc,
          alt: i.artworkAlt ?? "Cover artwork",
          onError: () => H(i.artworkSrc)
        }
      ) : /* @__PURE__ */ d.jsx("span", { className: "rts-audition-no-art", children: "Cover artwork unavailable" }),
      /* @__PURE__ */ d.jsx("div", { className: "rts-audition-subtitles", "aria-label": "Timed lyrics", "aria-live": "off", children: v.map((L, k) => /* @__PURE__ */ d.jsx("span", { className: "rts-audition-line", children: L.words.length ? L.words.map((ot, G) => /* @__PURE__ */ d.jsx(
        "span",
        {
          className: `rts-audition-word${ot.active ? " is-active" : ""}`,
          "aria-current": ot.active ? "true" : void 0,
          children: ot.text
        },
        `${ot.start}:${ot.end}:${G}`
      )) : L.text }, k)) })
    ] }),
    /* @__PURE__ */ d.jsx("output", { className: "rts-audition-status", "aria-live": "off", children: E.some((L) => L.text.trim()) ? v.length ? m ? "Playing · timed lyrics" : "Paused · current lyrics" : "No lyric at this position" : "No timed lyrics available" })
  ] });
}
function Jy(i, f, r, s, m = "same-origin") {
  const [h, y] = D.useState(0), [S, C] = D.useState(!1), [z, E] = D.useState(!1), [v, w] = D.useState(""), H = D.useRef(!1), Z = D.useRef("media"), L = D.useRef(null), k = D.useRef(0), ot = D.useRef({ audioSrc: f, activeLoop: r, onError: s, credentials: m });
  ot.current = { audioSrc: f, activeLoop: r, onError: s, credentials: m };
  const G = D.useCallback(() => Z.current === "loop" ? L.current?.currentTime ?? 0 : i.current?.currentTime ?? 0, [i]), Q = D.useCallback(() => {
    const lt = G();
    return k.current += 1, H.current = !1, L.current?.pause(), i.current?.pause(), E(!1), C(!1), y(lt), lt;
  }, [i, G]), xt = D.useCallback((lt) => {
    Q(), w(lt instanceof Error ? lt.message : String(lt)), ot.current.onError?.(lt);
  }, [Q]), st = D.useCallback(async (lt) => {
    Q();
    const rt = k.current;
    H.current = !0, E(!0), w("");
    const { activeLoop: ct, audioSrc: _t, credentials: Bt } = ot.current;
    try {
      if (ct) {
        if (Z.current = "loop", L.current ??= new Hy(), !await L.current.play(ct, _t, lt, Bt)) return;
      } else {
        Z.current = "media";
        const q = i.current;
        if (!q) return;
        q.currentTime = Math.max(0, lt), await q.play();
      }
      if (rt !== k.current) return;
      y(G()), E(!1), C(!0);
    } catch (q) {
      rt === k.current && xt(q);
    }
  }, [i, xt, Q, G]), Dt = D.useCallback((lt) => {
    const rt = ot.current.activeLoop;
    if (rt) {
      const ct = Ta(rt);
      lt = vo(lt, ct.start, ct.end);
    }
    H.current ? st(lt) : (Q(), Z.current = "media", i.current && (i.current.currentTime = lt), y(lt));
  }, [i, Q, st]), K = D.useCallback((lt) => {
    const rt = ot.current.activeLoop;
    if (rt) {
      const ct = Ta(rt);
      lt = vo(lt, ct.start, ct.end);
    }
    st(lt);
  }, [st]), mt = D.useCallback(() => {
    if (H.current) {
      Q();
      return;
    }
    let lt = G();
    const rt = ot.current.activeLoop;
    if (rt) {
      const ct = Ta(rt);
      (lt < ct.start || lt >= ct.end) && (lt = ct.start);
    }
    st(lt);
  }, [Q, st, G]);
  D.useEffect(() => (Q(), Z.current = "media", y(0), w(""), L.current?.dispose(), L.current = null, () => {
    k.current += 1, H.current = !1, L.current?.dispose(), L.current = null, i.current?.pause();
  }), [f, i, Q]);
  const Jt = r ? JSON.stringify([r.id, r.startSample, r.endSample, r.sampleRate, r.audioSrc]) : "";
  D.useEffect(() => {
    const lt = H.current;
    let rt = Q();
    const ct = ot.current.activeLoop;
    ct && (rt = Ta(ct).start), Z.current = "media", i.current && (i.current.currentTime = rt), y(rt), lt && st(rt);
  }, [Jt, i, Q, st]), D.useEffect(() => {
    if (!S) return;
    let lt = 0;
    const rt = () => {
      y(G()), lt = requestAnimationFrame(rt);
    };
    return lt = requestAnimationFrame(rt), () => cancelAnimationFrame(lt);
  }, [S, G]);
  const Gt = D.useCallback(() => {
    Z.current === "media" && Q();
  }, [Q]);
  return { time: h, playing: S, loading: z, error: v, toggle: mt, seek: Dt, seekAndPlay: K, ended: Gt, fail: xt };
}
function s0(i) {
  return i instanceof Element && !!i.closest(
    "input, textarea, select, button, a, [contenteditable=true], [role=textbox]"
  );
}
function $y(i, f) {
  if (i <= 0 || f <= 0) return [];
  const r = p0(f) / 5, s = [];
  for (let m = 0; m * r <= i + 1e-6; m += 1)
    s.push({
      time: m * r,
      major: m % 5 === 0
    });
  return s;
}
function ky(i, f) {
  const r = Math.round(i * 1e3), s = Math.floor(r / 1e3), m = `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  return p0(f) < 1 ? `${m}.${String(r % 1e3).padStart(3, "0")}` : m;
}
function Fy({
  audioSrc: i,
  lyricAudition: f,
  loops: r = [],
  onLoopSelect: s,
  onLoopEnabledChange: m,
  lanes: h,
  title: y = "Audio timeline",
  subtitle: S,
  duration: C = 0,
  grid: z = [],
  beatClock: E = null,
  showBeatGrid: v = !1,
  headerEnd: w,
  footer: H,
  className: Z = "",
  labelWidth: L = 230,
  initialZoom: k = 20,
  laneControls: ot = !1,
  wheelNavigation: G = !1,
  followPlayheadByDefault: Q = !0,
  preload: xt = "metadata",
  crossOrigin: st,
  onDurationChange: Dt,
  onTimeChange: K,
  onWindowChange: mt,
  onPlaybackError: Jt
}) {
  const Gt = D.useRef(null), [lt, rt] = D.useState(f?.enabledByDefault ?? !0), ct = D.useRef(null), [_t, Bt] = D.useState(Math.max(0, C)), [q, tt] = D.useState(null), [W, gt] = D.useState(!1), dt = D.useMemo(() => By(r, _t), [r, _t]), jt = dt.find((j) => j.id === q) ?? null, wt = Jy(
    Gt,
    i,
    W ? jt : null,
    Jt,
    st === "use-credentials" ? "include" : "same-origin"
  ), F = wt.time, b = wt.playing, R = jt ? Ta(jt) : null, V = (j) => {
    tt(j), s?.(dt.find((ut) => ut.id === j) ?? null);
  }, I = (j) => {
    gt(j), m?.(j);
  };
  D.useEffect(() => {
    q && !dt.some((j) => j.id === q) && (tt(null), gt(!1), s?.(null), m?.(!1));
  }, [q, dt, s, m]), D.useEffect(() => {
    tt(null), gt(!1), Bt(Math.max(0, C));
  }, [i]);
  const [yt, bt] = D.useState(Q), [vt, J] = D.useState(k), [at, ie] = D.useState({}), [Se, Ft] = D.useState({}), ne = D.useRef(k), Ht = D.useRef(null), Et = D.useRef(() => {
  });
  D.useEffect(() => {
    ie({}), Ft({});
  }, [i]);
  const [Y, et] = D.useState(0), [Mt, me] = D.useState({ start: 0, end: 0 });
  D.useEffect(() => {
    C > 0 && Bt(C);
  }, [C]), D.useEffect(() => {
    const j = (ut) => {
      ut.code !== "Space" || ut.repeat || ut.ctrlKey || ut.metaKey || ut.altKey || s0(ut.target) || (ut.preventDefault(), wt.toggle());
    };
    return document.addEventListener("keydown", j), () => document.removeEventListener("keydown", j);
  }, [wt.toggle]), D.useEffect(() => {
    const j = ct.current;
    if (!j) return;
    const ut = () => et(j.clientWidth);
    ut();
    const Nt = new ResizeObserver(ut);
    return Nt.observe(j), () => Nt.disconnect();
  }, []);
  const ce = _t > 0 ? Math.max(0.4, Math.max(320, Y - L - 16) / _t) : 0.4, Ut = Math.max(ce, ce * Math.pow(2, vt / 18));
  D.useLayoutEffect(() => {
    if (ne.current = vt, Ht.current && ct.current) {
      const { time: j, pointer: ut } = Ht.current;
      ct.current.scrollLeft = n0(j, Ut, ut), Ht.current = null;
    }
  }, [vt, Ut]), D.useEffect(() => {
    const j = ct.current;
    if (!j || !G) return;
    const ut = (Nt) => Et.current(Nt);
    return j.addEventListener("wheel", ut, { passive: !1 }), () => j.removeEventListener("wheel", ut);
  }, [G]);
  const Jl = Math.max(1, _t * Ut), $l = D.useMemo(() => $y(_t, Ut), [_t, Ut]), Al = D.useMemo(() => E && v ? qy(E, 0, _t, 2e3).map((j) => ({
    time: j.time,
    emphasis: j.emphasis,
    label: j.label,
    className: `rts-beat-grid-${E.mode}`
  })) : [], [E, v, _t]), Ma = [...z, ...Al], Ae = D.useCallback(() => {
    const j = ct.current;
    if (!j) return;
    const ut = Ly(
      j.scrollLeft + L,
      Math.max(0, j.clientWidth - L),
      L,
      Ut,
      _t
    );
    me(ut), mt?.(ut);
  }, [_t, L, mt, Ut]);
  D.useEffect(() => {
    Ae();
  }, [Ae, Y]), D.useEffect(() => {
    K?.(F);
    const j = ct.current;
    if (!j || !yt || !b) return;
    const ut = L + F * Ut, Nt = j.scrollLeft + j.clientWidth, he = Math.min(180, j.clientWidth * 0.2);
    ut > Nt - he ? j.scrollLeft = Math.max(0, ut - j.clientWidth + he) : ut < j.scrollLeft + L && (j.scrollLeft = Math.max(0, ut - L - he));
  }, [F, yt, b, L, K, Ut]);
  const Oa = (j) => {
    if (_t <= 0 || j.target.closest(".rts-label, a, button, input, select, textarea")) return;
    const ut = ct.current, Nt = Gt.current;
    if (!ut || !Nt) return;
    const he = ut.getBoundingClientRect(), ve = j.clientX - he.left + ut.scrollLeft - L;
    if (ve < 0) return;
    const Yt = Na(ve / Ut, 0, _t);
    j.target.closest(".rts-ruler-track") ? wt.seekAndPlay(Yt) : wt.seek(Yt);
  }, Cl = (j, ut) => {
    const Nt = ct.current;
    if (j = Na(j, 0, xc), j !== ne.current) {
      if (Nt) {
        const he = Math.max(1, Nt.clientWidth - L), ve = ut === void 0 ? he / 2 : Na(ut - Nt.getBoundingClientRect().left - L, 0, he), Yt = Ht.current, we = ce * Math.pow(2, ne.current / 18), _e = Yt ? n0(Yt.time, we, Yt.pointer) : Nt.scrollLeft;
        Ht.current = { time: (_e + ve) / we, pointer: ve };
      }
      ne.current = j, J(j);
    }
  };
  Et.current = (j) => {
    const ut = ct.current, Nt = j.target instanceof Element ? j.target : null;
    if (!ut || !Nt || Nt.closest("input, select, textarea, button, [contenteditable=true]")) return;
    const he = Math.abs(j.deltaX) > Math.abs(j.deltaY) ? j.deltaX : j.deltaY, ve = Ry(he, j.deltaMode, ut.clientWidth - L);
    if (ve)
      if (j.ctrlKey || j.metaKey) {
        if (_t <= 0) return;
        j.preventDefault(), j.stopPropagation(), bt(!1), Cl(Dy(ne.current, ve), j.clientX);
      } else if (j.altKey) {
        const Yt = Nt.closest("[data-lane-id]")?.dataset.laneId, we = h.find((_e) => _e.id === Yt);
        if (!ot || !we) return;
        j.preventDefault(), j.stopPropagation(), ie((_e) => ({
          ..._e,
          [we.id]: Uy(_e[we.id] ?? Ju(we.height), ve)
        }));
      } else
        j.preventDefault(), j.stopPropagation(), j.shiftKey ? ut.scrollTop += ve : (bt(!1), ut.scrollLeft += ve);
  };
  const Wn = () => {
    if (!R || !ct.current) return;
    const j = Math.max(320, Y - L - 16) / (R.duration * 1.1), ut = Na(18 * Math.log2(j / ce), 0, xc);
    Ht.current = null, ne.current = ut, J(ut);
    const Nt = ce * Math.pow(2, ut / 18);
    requestAnimationFrame(() => {
      ct.current && (ct.current.scrollLeft = Math.max(0, (R.start - R.duration * 0.05) * Nt));
    });
  }, nn = () => {
    const j = Number(Gt.current?.duration) || 0;
    Number.isFinite(j) && j > 0 && (Bt(j), Dt?.(j));
  };
  return /* @__PURE__ */ d.jsxs(
    "section",
    {
      className: `rts-sequence ${ot ? "rts-display-controls" : ""} ${Z}`,
      style: { "--rts-label-width": `${L}px`, "--rts-track-width": `${Jl}px` },
      children: [
        /* @__PURE__ */ d.jsxs("header", { className: "rts-toolbar", children: [
          /* @__PURE__ */ d.jsxs("div", { className: "rts-ident", children: [
            /* @__PURE__ */ d.jsx("strong", { children: y }),
            S && /* @__PURE__ */ d.jsx("span", { children: S })
          ] }),
          /* @__PURE__ */ d.jsxs("div", { className: "rts-transport", "aria-label": "Timeline playback controls", children: [
            /* @__PURE__ */ d.jsx("button", { type: "button", className: "rts-button rts-play", onClick: wt.toggle, "aria-label": b || wt.loading ? "Pause" : "Play", children: wt.loading ? "…" : b ? "❚❚" : "▶" }),
            /* @__PURE__ */ d.jsxs("output", { className: "rts-time", "aria-live": "off", children: [
              xa(F),
              " / ",
              xa(_t)
            ] }),
            /* @__PURE__ */ d.jsx("button", { type: "button", className: "rts-button", onClick: () => Cl(0), children: "Fit" }),
            /* @__PURE__ */ d.jsxs("label", { className: "rts-control", children: [
              /* @__PURE__ */ d.jsx("span", { children: "Zoom" }),
              /* @__PURE__ */ d.jsx("input", { "aria-label": "Timeline zoom", type: "range", min: "0", max: xc, value: vt, onChange: (j) => Cl(Number(j.target.value)) })
            ] }),
            /* @__PURE__ */ d.jsxs("label", { className: "rts-control", children: [
              /* @__PURE__ */ d.jsx("input", { type: "checkbox", checked: yt, onChange: (j) => bt(j.target.checked) }),
              /* @__PURE__ */ d.jsx("span", { children: "Follow" })
            ] }),
            f && /* @__PURE__ */ d.jsxs("label", { className: "rts-control rts-audition-toggle", children: [
              /* @__PURE__ */ d.jsx(
                "input",
                {
                  type: "checkbox",
                  "aria-label": "Audition lyrics",
                  checked: lt,
                  onChange: (j) => rt(j.target.checked)
                }
              ),
              /* @__PURE__ */ d.jsx("span", { children: "Audition lyrics" })
            ] })
          ] }),
          /* @__PURE__ */ d.jsx("div", { className: "rts-header-end", children: w }),
          dt.length > 0 && /* @__PURE__ */ d.jsxs("div", { className: "rts-loop-controls", "aria-label": "Loop controls", children: [
            /* @__PURE__ */ d.jsxs("label", { children: [
              "Loop ",
              /* @__PURE__ */ d.jsxs("select", { "aria-label": "Select loop", value: q ?? "", onChange: (j) => V(j.target.value), children: [
                /* @__PURE__ */ d.jsx("option", { value: "", children: "Choose a loop…" }),
                dt.map((j) => /* @__PURE__ */ d.jsx("option", { value: j.id, children: j.label || j.id }, j.id))
              ] })
            ] }),
            /* @__PURE__ */ d.jsxs("label", { children: [
              /* @__PURE__ */ d.jsx("input", { type: "checkbox", "aria-label": "Enable loop", disabled: !jt, checked: W && !!jt, onChange: (j) => I(j.target.checked) }),
              "Enable loop"
            ] }),
            /* @__PURE__ */ d.jsx("button", { type: "button", className: "rts-button", disabled: !jt, onClick: Wn, children: "Zoom to loop" }),
            jt && /* @__PURE__ */ d.jsxs("output", { children: [
              jt.startSample.toLocaleString(),
              " → ",
              jt.endSample.toLocaleString(),
              " samples (end exclusive) · ",
              jt.sampleRate.toLocaleString(),
              " Hz"
            ] }),
            jt?.downloadUrl && /* @__PURE__ */ d.jsx("a", { href: jt.downloadUrl, download: !0, children: "Download loop WAV" }),
            /* @__PURE__ */ d.jsx("span", { className: "rts-loop-status", role: "status", children: wt.loading ? "Loading loop…" : W && jt ? "Loop enabled · Play repeats selection" : "Full-song playback" })
          ] }),
          wt.error && /* @__PURE__ */ d.jsx("div", { role: "alert", className: "rts-loop-error", children: wt.error })
        ] }),
        /* @__PURE__ */ d.jsx(
          "audio",
          {
            ref: Gt,
            src: i,
            preload: xt,
            crossOrigin: st,
            onLoadedMetadata: nn,
            onEnded: wt.ended,
            onError: () => wt.fail(new Error(Gt.current?.error?.message || "Audio playback failed"))
          }
        ),
        /* @__PURE__ */ d.jsxs("div", { className: `rts-workspace ${f && lt ? "rts-with-audition" : ""}`, children: [
          /* @__PURE__ */ d.jsx(
            "div",
            {
              ref: ct,
              className: "rts-scroller",
              tabIndex: 0,
              "aria-label": "Timeline editor",
              onPointerDown: (j) => {
                s0(j.target) || j.currentTarget.focus({ preventScroll: !0 });
              },
              onScroll: Ae,
              onClick: Oa,
              children: /* @__PURE__ */ d.jsxs("div", { className: "rts-inner", children: [
                /* @__PURE__ */ d.jsxs("div", { className: "rts-ruler-row", children: [
                  /* @__PURE__ */ d.jsx("div", { className: "rts-label rts-ruler-label", children: "TIME" }),
                  /* @__PURE__ */ d.jsx("div", { className: "rts-ruler-track", title: "Click a time to seek and play", "aria-label": "Timeline ruler. Click a time to seek and play.", children: $l.map((j) => /* @__PURE__ */ d.jsx("span", { className: `rts-tick ${j.major ? "rts-tick-major" : ""}`, style: { left: `${j.time * Ut}px` }, children: j.major && /* @__PURE__ */ d.jsx("span", { className: "rts-tick-label", children: ky(j.time, Ut) }) }, j.time)) })
                ] }),
                dt.length > 0 && /* @__PURE__ */ d.jsxs("div", { className: "rts-lane rts-lane-loops", children: [
                  /* @__PURE__ */ d.jsxs("div", { className: "rts-label", children: [
                    /* @__PURE__ */ d.jsx("div", { className: "rts-title", children: "LOOPS" }),
                    /* @__PURE__ */ d.jsx("div", { className: "rts-meta", children: "Select a region, enable, then Play" })
                  ] }),
                  /* @__PURE__ */ d.jsx("div", { className: "rts-track", children: dt.map((j) => {
                    const ut = Ta(j);
                    return /* @__PURE__ */ d.jsx(
                      "button",
                      {
                        type: "button",
                        className: "rts-loop-region",
                        "aria-pressed": q === j.id,
                        "aria-label": `Select ${j.label || j.id}`,
                        onClick: () => V(j.id),
                        title: `${j.label || j.id}: [${j.startSample}, ${j.endSample}) at ${j.sampleRate} Hz`,
                        style: { left: `${ut.start * Ut}px`, width: `${ut.duration * Ut}px` },
                        children: j.label || j.id
                      },
                      j.id
                    );
                  }) })
                ] }),
                R && /* @__PURE__ */ d.jsx(
                  "div",
                  {
                    className: `rts-loop-shade ${W ? "" : "is-disabled"}`,
                    "aria-hidden": "true",
                    style: { left: `${L + R.start * Ut}px`, width: `${R.duration * Ut}px` }
                  }
                ),
                /* @__PURE__ */ d.jsx("div", { className: "rts-lanes", children: h.map((j) => {
                  const ut = j.content, Nt = ut.type === "audio" ? ut : null, he = Se[j.id] ?? Nt?.view ?? "both", ve = Nt ? b0(he, !!Nt.waveform, !!Nt.spectrogram) : "both", Yt = ot ? at[j.id] ?? Ju(j.height) : j.height, we = typeof j.title == "string" ? j.title : j.id;
                  return /* @__PURE__ */ d.jsxs(
                    "div",
                    {
                      "data-lane-id": j.id,
                      className: `rts-lane rts-lane-${j.kind ?? "default"} ${j.className ?? ""}`,
                      style: Yt ? { "--rts-lane-height": `${Yt}px` } : void 0,
                      children: [
                        /* @__PURE__ */ d.jsxs("div", { className: "rts-label", children: [
                          /* @__PURE__ */ d.jsx("div", { className: "rts-title", children: j.title }),
                          j.meta && /* @__PURE__ */ d.jsx("div", { className: "rts-meta", children: j.meta }),
                          ot && /* @__PURE__ */ d.jsxs("div", { className: "rts-lane-controls", children: [
                            Nt && /* @__PURE__ */ d.jsxs("label", { children: [
                              "View ",
                              /* @__PURE__ */ d.jsxs(
                                "select",
                                {
                                  "aria-label": `View for ${we}`,
                                  value: ve,
                                  onChange: (_e) => Ft((M) => ({ ...M, [j.id]: _e.target.value })),
                                  children: [
                                    /* @__PURE__ */ d.jsx("option", { value: "waveform", disabled: !Nt.waveform, children: "Waveform" }),
                                    /* @__PURE__ */ d.jsx("option", { value: "spectrogram", disabled: !Nt.spectrogram, children: "Spectrogram" }),
                                    /* @__PURE__ */ d.jsx("option", { value: "both", disabled: !Nt.waveform || !Nt.spectrogram, children: "Both" })
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
                                  min: g0,
                                  max: y0,
                                  step: "1",
                                  "aria-label": `Height for ${we}`,
                                  value: Yt,
                                  onChange: (_e) => ie((M) => ({ ...M, [j.id]: Ju(Number(_e.target.value)) }))
                                }
                              ),
                              /* @__PURE__ */ d.jsxs("output", { children: [
                                Yt,
                                "px"
                              ] })
                            ] }),
                            /* @__PURE__ */ d.jsx(
                              "button",
                              {
                                type: "button",
                                className: "rts-height-reset",
                                "aria-label": `Reset height for ${we}`,
                                onClick: () => ie((_e) => ({ ..._e, [j.id]: Ju(j.height) })),
                                children: "Reset height"
                              }
                            )
                          ] })
                        ] }),
                        /* @__PURE__ */ d.jsx("div", { className: "rts-track", children: Nt ? /* @__PURE__ */ d.jsx(Zy, { content: Nt, duration: _t, view: ve }) : /* @__PURE__ */ d.jsx(yo, { content: ut, duration: _t }) })
                      ]
                    },
                    j.id
                  );
                }) }),
                Ma.length > 0 && /* @__PURE__ */ d.jsx("div", { className: "rts-grid", "aria-hidden": "true", children: Ma.map((j, ut) => /* @__PURE__ */ d.jsx("span", { className: `rts-grid-line ${j.emphasis ? "rts-grid-line-emphasis" : ""} ${j.className ?? ""}`, style: { left: `${j.time * Ut}px` } }, `${j.time}-${ut}`)) }),
                /* @__PURE__ */ d.jsx("div", { className: "rts-playhead", style: { left: `${L + F * Ut}px` }, "aria-hidden": "true" })
              ] })
            }
          ),
          f && lt && /* @__PURE__ */ d.jsx(
            Ky,
            {
              config: f,
              lanes: h,
              time: F,
              duration: _t,
              playing: b
            }
          )
        ] }),
        /* @__PURE__ */ d.jsxs("footer", { className: "rts-footer", children: [
          /* @__PURE__ */ d.jsxs("div", { children: [
            H,
            /* @__PURE__ */ d.jsxs("div", { className: "rts-navigation-help", children: [
              "Space: play/pause · Ruler click: seek and play",
              G && /* @__PURE__ */ d.jsx(d.Fragment, { children: " · Wheel: time · Ctrl/⌘ + wheel: time zoom · Alt + wheel: channel height · Shift + wheel: channel scroll" })
            ] })
          ] }),
          /* @__PURE__ */ d.jsxs("output", { className: "rts-window", children: [
            xa(Mt.start),
            " — ",
            xa(Mt.end)
          ] })
        ] })
      ]
    }
  );
}
function Wy(i, f = null) {
  return f !== null ? f : (Array.isArray(i?.lyric_timing) ? i.lyric_timing : []).flatMap((r) => {
    if (r.start === null || r.start === void 0 || r.start === "") return [];
    const s = Number(r.start);
    if (!Number.isFinite(s) || s < 0) return [];
    const m = { start: s, label: String(r.text ?? "") };
    return r.end !== null && r.end !== void 0 && r.end !== "" && (m.end = Number(r.end)), [m];
  });
}
function Iy(i) {
  const f = Number(i?.sample_rate);
  return !Number.isFinite(f) || f <= 0 || !Array.isArray(i?.words) ? [] : i.words.flatMap((r) => {
    const s = Number(r.start_frame) / f, m = Number(r.end_frame) / f, h = String(r.word ?? "").trim();
    return !r.id || !r.line_id || !h || !Number.isFinite(s) || !Number.isFinite(m) || m <= s ? [] : [{ id: String(r.id), lineId: String(r.line_id), start: s, end: m, label: h }];
  });
}
function Py(i, f) {
  return i.filter((r) => typeof r.audioSrc == "string" && r.audioSrc && (r.id === "__source__" || Number.isFinite(r.duration) && f > 0 && Math.abs(r.duration - f) <= 0.05)).slice().sort((r, s) => r.id === "__source__" ? -1 : s.id === "__source__" ? 1 : r.id.localeCompare(s.id));
}
function tb(i, f) {
  return f ? i : i.map(({ audioSrc: r, downloadUrl: s, ...m }) => m);
}
const fo = /\.(wav|flac|mp3|ogg|opus|m4a|aif|aiff)$/i;
function r0(i) {
  return i === "__source__" || i.startsWith("input/") ? "master" : i.startsWith("stems/") ? i.slice(6).replace(fo, "") : i.startsWith("speech/") && fo.test(i) ? i.replace(fo, "") : null;
}
function eb(i) {
  const f = /* @__PURE__ */ new Map(), r = [], s = /* @__PURE__ */ new Map();
  for (const h of i) for (const y of Array.isArray(h.sourceMap) ? h.sourceMap : [])
    if (typeof y?.audio == "string" && typeof y.data == "string") {
      const S = r0(y.audio.replace(/\\/g, "/"));
      S && (s.set(y.data.replace(/\\/g, "/"), S), typeof y.png == "string" && s.set(y.png.replace(/\\/g, "/"), S));
    }
  const m = (h) => (f.has(h) || f.set(h, { key: h }), f.get(h));
  for (const h of i) {
    const y = (h.id?.replace(/^file:/, "") || "").replace(/\\/g, "/"), S = r0(y), C = y.startsWith("spectrograms/") ? s.get(y) || y.slice(13).replace(/\.(npz|png)$/i, "") : null;
    if (S && (h.content?.type === "waveform" || h.content?.type === "artifact")) {
      const z = m(S);
      (!z.audio || h.id === "__source__") && (z.audio = h);
    } else C && y.endsWith(".npz") && h.content?.type === "image" ? m(C).spectrum = h : C && y.endsWith(".png") && h.content?.type === "image" ? m(C).png = h : r.push(h);
  }
  for (const h of f.values()) {
    if (!h.audio && !h.spectrum) {
      h.png && r.push(h.png);
      continue;
    }
    const y = h.audio || h.spectrum, S = h.audio?.content?.type === "waveform" ? h.audio.content : null, C = h.audio?.content?.type === "artifact" ? h.audio.content.note : null;
    r.push({
      ...y,
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
const bo = (i) => typeof i == "number" && Number.isFinite(i) && i > 0, lb = { canonical: "Canonical", combined: "Consensus · observed tempo", combined_family: "Consensus · canonical tempo family", combined_fit: "Consensus · fitted constant grid" };
function o0(i, f, r, s) {
  if (!bo(i) || !Number.isFinite(f) || f < 0 || !Number.isFinite(r) || r <= 0) return [];
  const m = Math.max(0, Math.floor((r - f) * i / 60 + 1e-9) + 1), h = Math.max(1, Math.ceil(m / 25e3));
  return Array.from({ length: Math.ceil(m / h) }, (y, S) => {
    const C = S * h;
    return {
      time: f + C * 60 / i,
      emphasis: C === 0,
      label: `${s === "original" ? "Original" : "Aligned"} beat ${C + 1}${C === 0 && s === "aligned" ? " · pip 0" : ""}`,
      className: `stemlab-grid-${s}`
    };
  });
}
function ab(i, f, r, s = "canonical", m = "consensus") {
  const h = i?.schema === "stemlab.beat-offsets.v1" && i.pips_per_beat === 64;
  let y = h ? (i.bpm_bases || []).filter((H) => H.status === "available" && bo(H.bpm)) : [];
  !y.length && bo(f) && (y = [{ id: "canonical", bpm: f }]);
  const S = y.find((H) => H.id === s) || y.find((H) => H.id === "combined_fit") || y[0] || null, C = h ? (i.analyses || []).filter((H) => H.status === "available") : [], z = C.find((H) => H.analysis_id === m) || C.find((H) => H.kind === "consensus") || C[0] || null, E = S && z ? i.comparisons?.find((H) => H.status === "available" && H.bpm_basis === S.id && H.analysis_id === z.analysis_id) : null, v = S ? o0(S.bpm, 0, r, "original") : [], w = E && Number.isFinite(E.beat_zero_seconds) ? o0(E.bpm, E.beat_zero_seconds, r, "aligned") : [];
  return {
    bases: y.map((H) => ({ ...H, label: `${lb[H.id] || H.id}${H.multiplier ? ` ×${H.multiplier}` : ""} · ${H.bpm.toFixed(4)} BPM` })),
    basis: S,
    analysis: z,
    analyses: C,
    row: E,
    original: v,
    aligned: w,
    thinned: !!S && Math.floor(r * S.bpm / 60) + 1 > 25e3,
    grid: [...v, ...w].sort((H, Z) => H.time - Z.time)
  };
}
function nb({ comparison: i, onBasis: f, onAnalysis: r }) {
  const { bases: s, basis: m, analyses: h, analysis: y, row: S, thinned: C } = i;
  return /* @__PURE__ */ d.jsxs("section", { className: "stemlab-beat-offset-controls", "aria-label": "BPM grid comparison", children: [
    /* @__PURE__ */ d.jsxs("div", { className: "stemlab-beat-offset-selectors", children: [
      /* @__PURE__ */ d.jsxs("label", { children: [
        "BPM grid ",
        /* @__PURE__ */ d.jsxs("select", { "aria-label": "BPM grid basis", value: m?.id || "", onChange: (z) => f(z.target.value), disabled: !s.length, children: [
          !s.length && /* @__PURE__ */ d.jsx("option", { value: "", children: "BPM unavailable" }),
          s.map((z) => /* @__PURE__ */ d.jsx("option", { value: z.id, children: z.label }, z.id))
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("label", { children: [
        "First beat from ",
        /* @__PURE__ */ d.jsxs("select", { "aria-label": "First beat analysis", value: y?.analysis_id || "", onChange: (z) => r(z.target.value), disabled: !h.length, children: [
          !h.length && /* @__PURE__ */ d.jsx("option", { value: "", children: "Detected beat unavailable" }),
          h.map((z) => /* @__PURE__ */ d.jsx("option", { value: z.analysis_id, children: z.analysis_id }, z.analysis_id))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("p", { className: "stemlab-grid-legend", children: [
      /* @__PURE__ */ d.jsx("span", { className: "stemlab-legend-original", children: "Original grid · source time 0" }),
      /* @__PURE__ */ d.jsx("span", { className: "stemlab-legend-aligned", children: "Offset grid · detected first beat = pip 0" })
    ] }),
    /* @__PURE__ */ d.jsx("output", { "aria-live": "polite", "data-testid": "beat-offset-value", children: S ? `${S.offset_pips.toFixed(6)} pips · first detected beat ${S.first_beat_seconds.toFixed(6)}s · nearest whole offset ${S.integer_offset_pips} pips (${(S.integer_residual_seconds * 1e3).toFixed(3)} ms residual)` : "Waiting for usable beat evidence; no aligned grid is inferred." }),
    y?.constant_grid_fit && /* @__PURE__ */ d.jsxs("p", { className: "small", children: [
      "Selected detector fit: ",
      y.constant_grid_fit.proposed_bpm.toFixed(4),
      " BPM · 95% beat error ",
      y.constant_grid_fit.p95_absolute_beat_error_ms.toFixed(3),
      " ms · grade ",
      y.constant_grid_fit.precision_grade,
      ".",
      m?.fit ? ` Consensus grid fit grade: ${m.fit.precision_grade}.` : ""
    ] }),
    /* @__PURE__ */ d.jsxs("p", { className: "small", children: [
      "Half- and double-time readings are normal. Observed beats stay in their own lanes; tempo-family options compare ×½ / ×1 / ×2 interpretations. Constant grids and detector phases remain estimates.",
      C ? " Dense grids are thinned for display only." : ""
    ] })
  ] });
}
const ub = "stemlab.beat-timeline.v1", Fu = 64, zl = (i) => Number.isSafeInteger(i);
function Mc(i) {
  if (!i || i.schema !== ub || i.pips_per_beat !== Fu || !Number.isSafeInteger(i.source_audio?.sample_rate) || i.source_audio.sample_rate < 1 || !Number.isSafeInteger(i.source_audio?.num_frames) || i.source_audio.num_frames < 2 || !/^[0-9a-f]{64}$/.test(i.source_audio?.sha256 || "") || !/^[0-9a-f]{64}$/.test(i.consensus_sha256 || "") || !Array.isArray(i.beats) || i.beats.length < 2 || i.beats.length > 25e3 || !zl(i.origin_beat)) throw new Error("Not a valid source-bound StemLab beat timeline");
  const f = { beat: -1, frame: -1 };
  for (const r of i.beats) {
    if (!zl(r.beat) || !zl(r.frame) || r.beat <= f.beat || r.frame <= f.frame || r.frame >= i.source_audio.num_frames || !["consensus", "corrected", "manual"].includes(r.source) || r.reference_frame !== null && (!zl(r.reference_frame) || r.reference_frame < 0 || r.reference_frame >= i.source_audio.num_frames) || r.source === "consensus" && r.frame !== r.reference_frame || r.source === "manual" && r.reference_frame !== null)
      throw new Error("Beat indices and source sample frames must increase; original consensus timestamps stay immutable");
    f.beat = r.beat, f.frame = r.frame;
  }
  if (!i.beats.some((r) => r.beat === i.origin_beat)) throw new Error("Beat 1 must identify a real anchor");
  return i;
}
const ln = (i) => ({ ...i, beats: i.beats.map((f) => ({ ...f })) }), an = (i) => Mc(i), ib = (i, f) => i.beats[f].frame / i.source_audio.sample_rate, Fn = (i, f) => f < 0 || f + 1 >= i.beats.length ? null : 60 * i.source_audio.sample_rate * (i.beats[f + 1].beat - i.beats[f].beat) / (i.beats[f + 1].frame - i.beats[f].frame), E0 = (i, f) => Math.round(f * i.source_audio.sample_rate);
function f0(i, f, r) {
  const s = ln(i);
  if (!zl(f) || f < 0 || f >= s.beats.length) throw new Error("Select a beat");
  const m = E0(s, r), h = s.beats[f - 1]?.frame ?? -1, y = s.beats[f + 1]?.frame ?? s.source_audio.num_frames;
  if (!zl(m) || m <= h || m >= y) throw new Error("Beat must remain between its neighbours");
  const S = s.beats[f];
  return S.frame = m, S.source = m === S.reference_frame ? "consensus" : S.reference_frame === null ? "manual" : "corrected", an(s);
}
function cb(i, f, r) {
  if (!Number.isFinite(r) || r <= 0 || r > 1200) throw new Error("BPM must be 0..1200");
  const s = ln(i);
  if (!zl(f) || f < 0 || f + 1 >= s.beats.length) throw new Error("Choose an interval");
  const m = s.beats[f], h = s.beats[f + 1], y = Math.round(60 * (h.beat - m.beat) * s.source_audio.sample_rate / r);
  if (y < 1) throw new Error("BPM exceeds available sample precision");
  const S = m.frame + y - h.frame;
  for (let C = f + 1; C < s.beats.length; C++) {
    const z = s.beats[C];
    z.frame += S, z.source = z.reference_frame === null ? "manual" : z.frame === z.reference_frame ? "consensus" : "corrected";
  }
  return an(s);
}
function sb(i, f) {
  if (!Number.isFinite(f) || Math.abs(f) > 1e5) throw new Error("Phase shift is out of bounds");
  const r = ln(i), s = Fn(r, 0), m = Math.round(f / Fu * (60 / s) * r.source_audio.sample_rate);
  for (const h of r.beats)
    h.frame += m, h.source = h.reference_frame === null ? "manual" : h.frame === h.reference_frame ? "consensus" : "corrected";
  return an(r);
}
function d0(i, f) {
  const r = ln(i), s = E0(r, f);
  if (!zl(s) || s < 0 || s >= r.source_audio.num_frames) throw new Error("Beat outside source");
  let m = r.beats.findIndex((z) => z.frame > s);
  if (m < 0 && (m = r.beats.length), m === 0 || m === r.beats.length || r.beats[m - 1].frame === s)
    throw new Error("Insert between two existing anchors; use the timeline selection to move end beats");
  const h = r.beats[m - 1], y = r.beats[m], S = y.beat - h.beat > 1, C = h.beat + 1;
  if (!S) {
    r.origin_beat >= y.beat && (r.origin_beat += 1);
    for (let z = m; z < r.beats.length; z++) r.beats[z].beat += 1;
  }
  return r.beats.splice(m, 0, { beat: C, frame: s, source: "manual", reference_frame: null }), an(r);
}
function rb(i, f) {
  const r = ln(i);
  if (!zl(f) || f < 0 || f >= r.beats.length || r.beats.length <= 2)
    throw new Error("Keep at least two beat anchors");
  const [s] = r.beats.splice(f, 1);
  return s.beat === r.origin_beat && (r.origin_beat = r.beats[Math.min(f, r.beats.length - 1)].beat), an(r);
}
function ob(i, f) {
  const r = ln(i);
  if (!zl(f) || f < 0 || f >= r.beats.length) throw new Error("Select Beat 1");
  return r.origin_beat = r.beats[f].beat, an(r);
}
function fb(i) {
  const f = ln(i);
  for (const r of f.beats) r.reference_frame !== null && (r.frame = r.reference_frame, r.source = "consensus");
  return an(f);
}
function db(i) {
  const f = Fn(i, 0), r = i.beats.find((s) => s.beat === i.origin_beat);
  return i.beats.map((s) => ({
    time: s.frame / i.source_audio.sample_rate,
    value: Fu * (s.beat - i.origin_beat) - (s.frame - r.frame) * f * Fu / (i.source_audio.sample_rate * 60)
  }));
}
function mb(i, f, r = 3e3) {
  if (!i?.beats?.length) return [];
  const s = i.source_audio.sample_rate, m = Number.isFinite(f?.start) ? f.start : 0, h = Number.isFinite(f?.end) && f.end > m ? f.end : Number.MAX_VALUE, y = i.beats.filter((C) => C.frame / s >= m - 0.05 && C.frame / s <= h + 0.05), S = Math.max(1, Math.ceil(y.length / r));
  return y.filter((C, z) => z % S === 0).map((C) => ({
    time: C.frame / s,
    emphasis: C.beat === i.origin_beat,
    label: `Corrected beat ${C.beat} · native pip ${(C.beat - i.origin_beat) * Fu}`,
    className: "stemlab-grid-corrected"
  }));
}
const ku = 20, po = 400, T0 = (i, f, r) => Math.max(f, Math.min(r, i)), m0 = (i) => 100 * (1 - Math.log(T0(i, ku, po) / ku) / Math.log(po / ku)), hb = (i, f) => ku * (po / ku) ** T0(1 - (i - f.top) / f.height, 0, 1);
async function mo(i, f = "GET", r) {
  const s = await fetch(
    `/api/${i}/beat-timeline${f === "POST" ? "/preview" : ""}`,
    { method: f, headers: { "Content-Type": "application/json" }, body: r === void 0 ? void 0 : JSON.stringify(r), cache: "no-store" }
  ), m = await s.json().catch(() => ({}));
  if (!s.ok) throw new Error(m.detail || `Beat timeline HTTP ${s.status}`);
  return m;
}
function vb({ map: i, duration: f, visible: r, selected: s, onSelect: m, onEdit: h, onInsert: y }) {
  const S = i.source_audio.sample_rate, z = i.beats.map((v, w) => ({ row: v, i: w })).filter(({ row: v }) => {
    const w = v.frame / S;
    return w >= r.start - 0.1 && w <= r.end + 0.1;
  }), E = Math.max(1, Math.ceil(z.length / 2e3));
  return /* @__PURE__ */ d.jsx(
    "div",
    {
      className: "stemlab-beatmap-track",
      "aria-label": "Editable sample-accurate beat anchors",
      onDoubleClick: (v) => {
        if (v.target !== v.currentTarget) return;
        const w = v.currentTarget.getBoundingClientRect();
        y((v.clientX - w.left) / w.width * f), v.stopPropagation();
      },
      children: z.filter((v, w) => w % E === 0).map(({ row: v, i: w }) => /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          className: `stemlab-beatmap-anchor ${v.source} ${s === w ? "selected" : ""} ${v.beat === i.origin_beat ? "origin" : ""}`,
          "aria-label": `Beat ${v.beat}, ${ib(i, w).toFixed(6)} seconds, ${v.source}; drag or use arrow keys`,
          "aria-pressed": s === w,
          title: `Beat ${v.beat}: frame ${v.frame} · ${(v.frame / S).toFixed(6)} s · ${v.source}${v.reference_frame === null ? "" : ` · reference ${v.reference_frame}`}`,
          style: { left: `${v.frame / (S * Math.max(f, 1e-9)) * 100}%` },
          onPointerDown: (H) => {
            H.currentTarget.setPointerCapture(H.pointerId), m(w), H.stopPropagation();
          },
          onPointerMove: (H) => {
            if (!H.currentTarget.hasPointerCapture(H.pointerId)) return;
            const Z = H.currentTarget.parentElement.getBoundingClientRect();
            h(w, (H.clientX - Z.left) / Z.width * f), H.stopPropagation();
          },
          onPointerUp: (H) => {
            H.currentTarget.releasePointerCapture(H.pointerId), H.stopPropagation();
          },
          onClick: (H) => {
            m(w), H.stopPropagation();
          },
          onKeyDown: (H) => {
            if (H.key !== "ArrowLeft" && H.key !== "ArrowRight") return;
            H.preventDefault(), H.stopPropagation();
            const Z = H.shiftKey ? Math.max(1, Math.round(S / 1e3)) : 1;
            h(w, (v.frame + (H.key === "ArrowLeft" ? -Z : Z)) / S);
          },
          children: /* @__PURE__ */ d.jsx("span", { children: v.beat === i.origin_beat ? "1" : "" })
        },
        v.beat
      ))
    }
  );
}
function gb({ map: i, duration: f, visible: r, selected: s, onSelect: m, onTempo: h }) {
  const y = i.source_audio.sample_rate, S = i.beats.slice(0, -1).map((E, v) => ({
    i: v,
    start: E.frame / y,
    end: i.beats[v + 1].frame / y,
    bpm: Fn(i, v)
  })).filter((E) => E.end >= r.start && E.start <= r.end), C = Math.max(1, Math.ceil(S.length / 1800)), z = S.filter((E, v) => v % C === 0);
  return /* @__PURE__ */ d.jsxs("div", { className: "stemlab-beatmap-tempo", "aria-label": "Editable local BPM envelope", children: [
    /* @__PURE__ */ d.jsx("svg", { className: "stemlab-beatmap-tempo-line", viewBox: "0 0 1000 100", preserveAspectRatio: "none", "aria-hidden": "true", children: /* @__PURE__ */ d.jsx(
      "polyline",
      {
        points: z.map((E) => `${(E.start + E.end) / 2 / Math.max(f, 1e-9) * 1e3},${m0(E.bpm)}`).join(" "),
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
    z.map((E) => /* @__PURE__ */ d.jsx(
      "button",
      {
        type: "button",
        className: `stemlab-beatmap-tempo-node ${s === E.i ? "selected" : ""}`,
        style: { left: `${(E.start + E.end) / 2 / Math.max(f, 1e-9) * 100}%`, top: `${m0(E.bpm)}%` },
        title: `Interval ${E.i} → ${E.i + 1}: ${E.bpm.toFixed(3)} BPM · drag vertically to change local tempo`,
        "aria-label": `BPM envelope interval ${E.i}: ${E.bpm.toFixed(3)} BPM`,
        "aria-pressed": s === E.i,
        onPointerDown: (v) => {
          v.currentTarget.setPointerCapture(v.pointerId), m(E.i), v.stopPropagation();
        },
        onPointerMove: (v) => {
          if (!v.currentTarget.hasPointerCapture(v.pointerId)) return;
          const w = v.currentTarget.parentElement.getBoundingClientRect();
          h(E.i, hb(v.clientY, w)), v.stopPropagation();
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
function yb(i, f, r = !0) {
  const [s, m] = D.useState(null), [h, y] = D.useState(!1), [S, C] = D.useState(null), [z, E] = D.useState(!1), [v, w] = D.useState(!1), [H, Z] = D.useState(!0), [L, k] = D.useState(0), [ot, G] = D.useState({ start: 0, end: 1 / 0 }), [Q, xt] = D.useState(!1), [st, Dt] = D.useState(!0), [K, mt] = D.useState(""), [Jt, Gt] = D.useState("0"), [lt, rt] = D.useState(""), [ct, _t] = D.useState(!1), [Bt, q] = D.useState([]), [tt, W] = D.useState([]), gt = D.useRef(null), dt = D.useRef(0), jt = D.useRef(null);
  jt.current = s;
  const wt = D.useCallback(async (Y = !1) => {
    if (!(z && !Y && !window.confirm("Discard unsaved beat edits and reload the saved map?")))
      try {
        const et = await mo(i);
        if (!et.available) {
          w(!1);
          return;
        }
        Mc(et.map), m(et.map), w(!0), y(et.saved), C(et.revision), E(!1), q([]), W([]), k(0), mt(Fn(et.map, 0)?.toFixed(3) || ""), rt(et.saved ? "Loaded saved beat corrections" : "Prepared an editable proposal at exact consensus sample frames");
      } catch (et) {
        et.message.includes("HTTP 404") && !jt.current ? Z(!1) : rt(et.message);
      }
  }, [i, z]);
  D.useEffect(() => {
    if (!r) return;
    let Y = !0;
    const et = async () => {
      Y && await wt(!0);
    };
    et();
    const Mt = window.setInterval(() => {
      Y && !jt.current && et();
    }, 5e3);
    return () => {
      Y = !1, window.clearInterval(Mt);
    };
  }, [i]);
  const F = D.useCallback((Y) => {
    try {
      const et = jt.current;
      if (!et) return;
      const Mt = Y(et);
      et.review_status === "artist_confirmed" && Mt.review_status === "artist_confirmed" && (Mt.beats !== et.beats || Mt.origin_beat !== et.origin_beat) && (Mt.review_status = "estimated"), Mc(Mt), m(Mt), E(!0), q((me) => [...me.slice(-59), et]), W([]), rt("Unsaved beat-map edits · original consensus unchanged");
    } catch (et) {
      rt(et.message);
    }
  }, []), b = () => {
    Bt.length && (W((Y) => [...Y.slice(-59), s]), m(Bt.at(-1)), q((Y) => Y.slice(0, -1)), E(!0));
  }, R = () => {
    tt.length && (q((Y) => [...Y.slice(-59), s]), m(tt.at(-1)), W((Y) => Y.slice(0, -1)), E(!0));
  }, V = (Y) => {
    k(Y), mt(Fn(jt.current, Y)?.toFixed(3) || "");
  }, I = async (Y) => {
    const et = await mo(i, "POST", Y);
    return Mc(et), et;
  }, yt = async () => {
    if (s) {
      _t(!0);
      try {
        const Y = await mo(i, "PUT", { map: s, expected_revision: S });
        m(Y.map), y(!0), C(Y.revision), E(!1), q([]), W([]), rt("Beat corrections saved separately from the consensus detections");
      } catch (Y) {
        rt(Y.message);
      } finally {
        _t(!1);
      }
    }
  }, bt = async (Y) => {
    if (s) {
      _t(!0);
      try {
        const et = await I(s), Mt = JSON.stringify(et, null, 2);
        if (Y === "copy")
          await navigator.clipboard.writeText(Mt), rt("Copied one complete beat-timeline JSON value with Beat 1 and pip phase synchronisation");
        else {
          const me = new Blob([Mt + `
`], { type: "application/json" }), ce = URL.createObjectURL(me), Ut = document.createElement("a");
          Ut.href = ce, Ut.download = `stemlab-beat-timeline-${i.slice(0, 12)}.json`, document.body.appendChild(Ut), Ut.click(), Ut.remove(), URL.revokeObjectURL(ce), rt("Exported a single source-bound beat-timeline JSON file");
        }
      } catch (et) {
        rt(et.message);
      } finally {
        _t(!1);
      }
    }
  }, vt = async (Y) => {
    const et = Y.target.files?.[0];
    if (Y.target.value = "", !!et) {
      if (et.size > 32 * 1024 * 1024) {
        rt("Import limited to 32 MiB");
        return;
      }
      _t(!0);
      try {
        const Mt = JSON.parse(await et.text()), me = await I(Mt);
        m(me), E(!0), q((ce) => s ? [...ce.slice(-59), s] : ce), W([]), rt("Imported and validated: review changes before saving. Original consensus unchanged.");
      } catch (Mt) {
        rt(Mt.message);
      } finally {
        _t(!1);
      }
    }
  }, J = (Y, et) => F((Mt) => cb(Mt, Y, et)), at = () => F((Y) => fb(Y)), ie = s && Q && f > 0 ? [
    {
      id: "corrected:anchors",
      title: "Corrected beats",
      kind: "beatmap",
      height: 80,
      meta: "Drag to place · arrows: 1 sample · Shift: 1 ms · double-click empty space to insert",
      content: { type: "custom", node: /* @__PURE__ */ d.jsx(
        vb,
        {
          map: s,
          duration: f,
          visible: ot,
          selected: L,
          onSelect: V,
          onEdit: (Y, et) => F((Mt) => f0(Mt, Y, et)),
          onInsert: (Y) => F((et) => d0(et, Y))
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
        gb,
        {
          map: s,
          duration: f,
          visible: ot,
          selected: L,
          onSelect: V,
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
      content: { type: "curve", points: db(s).filter((Y, et) => et % Math.max(1, Math.ceil(s.beats.length / 4e3)) === 0), colour: "#ecb7fd" }
    }
  ] : [], Se = s && st ? mb(s, ot) : [], Ft = s?.beats?.[Math.min(L, s.beats.length - 1)], ne = s?.source_audio?.sample_rate || 1, Ht = s && L < s.beats.length - 1 ? Fn(s, L) : null, Et = /* @__PURE__ */ d.jsxs("section", { className: "stemlab-beatmap-panel", "aria-label": "Editable variable tempo and Beat 1 phase", children: [
    /* @__PURE__ */ d.jsxs("header", { children: [
      /* @__PURE__ */ d.jsx("strong", { children: "Beat correction · variable BPM & phase" }),
      s && /* @__PURE__ */ d.jsxs("span", { children: [
        s.beats.length.toLocaleString(),
        " anchors · ",
        h ? "saved" : "consensus draft",
        z ? " · unsaved changes" : ""
      ] }),
      /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => xt((Y) => !Y), children: Q ? "Hide editor" : "Show editor" })
    ] }),
    Q && s && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
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
              value: Ft?.beat ?? 0,
              onChange: (Y) => {
                const et = s.beats.findIndex((Mt) => Mt.beat === Number(Y.target.value));
                et >= 0 && V(et);
              }
            }
          )
        ] }),
        /* @__PURE__ */ d.jsxs("output", { children: [
          "Frame ",
          Ft?.frame ?? 0,
          " · ",
          Ft ? (Ft.frame / ne).toFixed(6) : "0",
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
              onChange: (Y) => mt(Y.target.value),
              onKeyDown: (Y) => {
                Y.key === "Enter" && J(L, Number(K));
              }
            }
          )
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: L >= s.beats.length - 1, onClick: () => J(L, Number(K)), children: "Apply BPM" }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Phase shift (pips) ",
          /* @__PURE__ */ d.jsx(
            "input",
            {
              "aria-label": "Global phase shift pips",
              type: "number",
              step: "0.25",
              value: Jt,
              onChange: (Y) => Gt(Y.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => F((Y) => sb(Y, Number(Jt))), children: "Shift all beats" })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-beatmap-actions", children: [
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => F((Y) => f0(Y, L, dt.current)), children: "Place selected at playhead" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => F((Y) => d0(Y, dt.current)), children: "Insert at playhead" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => F((Y) => ob(Y, L)), children: "Set selected as Beat 1" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => F((Y) => rb(Y, L)), children: "Delete selected" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: !Bt.length, onClick: b, children: "Undo" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: !tt.length, onClick: R, children: "Redo" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: at, children: "Match consensus beats" }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          /* @__PURE__ */ d.jsx("input", { type: "checkbox", checked: st, onChange: (Y) => Dt(Y.target.checked) }),
          "Corrected grid"
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          /* @__PURE__ */ d.jsx(
            "input",
            {
              type: "checkbox",
              checked: s.review_status === "artist_confirmed",
              onChange: (Y) => F((et) => ({ ...et, review_status: Y.target.checked ? "artist_confirmed" : "estimated" }))
            }
          ),
          "Artist-reviewed Beat 1 / phase"
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-beatmap-export", children: [
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: ct || !z, onClick: yt, children: "Save corrections" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: ct, onClick: () => bt("download"), children: "Export Beat 1 + full beat timeline JSON" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: ct, onClick: () => bt("copy"), children: "Copy JSON value" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: ct, onClick: () => gt.current?.click(), children: "Import JSON" }),
        /* @__PURE__ */ d.jsx("input", { ref: gt, type: "file", accept: ".json,application/json", hidden: !0, onChange: vt }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => wt(), children: "Reload saved/consensus" })
      ] }),
      /* @__PURE__ */ d.jsxs("small", { children: [
        "Current local BPM: ",
        Ht?.toFixed(3) ?? "last anchor",
        " · original consensus matches remain labelled separately. Native timebase: 64 pips/beat, imported DanceMoves clocks use 16 ticks/beat. DanceMoves supports optional beat-timeline.v1 variable playback where its new consumer is installed; beat-alignment.v1 remains a separate fixed-tempo format."
      ] })
    ] }),
    !v && Q && /* @__PURE__ */ d.jsx("p", { children: "Waiting for an available consensus beat list (and exact master audio). No timing is invented." }),
    lt && /* @__PURE__ */ d.jsx("output", { role: "status", className: "stemlab-beatmap-status", children: lt })
  ] });
  return {
    map: s,
    revision: S,
    saved: h,
    ready: v,
    dirty: z,
    lanes: ie,
    grid: Se,
    panel: H ? Et : null,
    onWindowChange: G,
    onTimeChange: (Y) => {
      dt.current = Y;
    }
  };
}
const So = Object.freeze(["SECTION", "ENTRY", "DROP", "BREAK"]), $u = Object.freeze([
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
]), tn = (i, f) => Math.round(Number(i) * f);
function bb(i, { warningTicks: f = 5, severeTicks: r = 3, ticksPerBeat: s = 16 } = {}) {
  if (!i || i.clock_mode !== "fixed") return [];
  const m = Number(i.sample_rate), h = Number(i.fixed_clock?.bpm);
  if (!Number.isFinite(m) || m <= 0 || !Number.isFinite(h) || h <= 0) return [];
  const y = new Map(i.lines.map((z) => [z.id, z])), S = /* @__PURE__ */ new Map();
  for (const z of i.words)
    S.has(z.line_id) || S.set(z.line_id, []), S.get(z.line_id).push(z);
  const C = [];
  for (const [z, E] of S) {
    E.sort((v, w) => v.start_frame - w.start_frame);
    for (let v = 1; v < E.length; v++) {
      const w = E[v - 1], H = E[v], Z = (H.start_frame - w.start_frame) / m, L = Z * h / 60 * s;
      L >= f || C.push({
        lineId: z,
        line: y.get(z)?.text || z,
        fromId: w.id,
        toId: H.id,
        fromWord: w.word,
        toWord: H.word,
        seconds: Z,
        ticks: L,
        severity: L < r ? "severe" : "warning"
      });
    }
  }
  return C;
}
function No(i, f) {
  const r = String(i).trim().toUpperCase(), s = String(f).trim().toUpperCase().replace(/ +/g, " ");
  if (!So.includes(r)) throw new Error("Cue type must be SECTION, ENTRY, DROP or BREAK");
  const m = /^([A-Z][A-Z -]*?)(?: ([1-9][0-9]{0,2}|A|B|FINAL))?$/.exec(s);
  if (!m || !$u.includes(m[1]) || s.length > 64)
    throw new Error("Use a standard section (INTRO, VERSE 1, CHORUS, BUILD 1, DROP 1, OUTRO, etc.)");
  return { type: r, section: s, label: `[${r}: ${s}]` };
}
const xo = (i) => ({ ...i, lines: i.lines.map((f) => ({ ...f })), words: i.words.map((f) => ({ ...f })), cues: i.cues.map((f) => ({ ...f })), fixed_clock: { ...i.fixed_clock } });
function kn(i, f, r, s) {
  if (!Number.isSafeInteger(i) || i < f || i > r) throw new Error(`${s} cannot cross its parent, another event or source duration`);
  return i;
}
function pb(i, f = "start_frame") {
  return i.every((r, s) => s === 0 || r[f] >= i[s - 1][f]);
}
function Sb(i, f, r) {
  const s = xo(i), m = i.sample_rate, h = i.num_frames;
  if (!Number.isSafeInteger(m) || !Number.isSafeInteger(h) || m < 1 || h < 2) throw new Error("Invalid source-frame metadata");
  if (f === "cue") {
    const y = s.cues.findIndex((E) => E.id === r.id);
    if (y < 0) throw new Error("Cue not found");
    const S = s.cues[y], C = No(r.type ?? S.type, r.section ?? S.section), z = kn(tn(r.start, m), 0, h - 1, "Cue");
    if (s.cues[y] = { ...s.cues[y], frame: z, type: C.type, section: C.section }, !pb(s.cues, "frame")) throw new Error("Cue movement must preserve chronological order");
  } else if (f === "line") {
    const y = s.lines.findIndex((w) => w.id === r.id);
    if (y < 0) throw new Error("Lyric line not found");
    const S = s.lines[y], C = kn(tn(r.start, m), 0, h - 1, "Line"), z = kn(tn(r.end, m), C + 1, h, "Line");
    if (y > 0 && C < s.lines[y - 1].end_frame || y + 1 < s.lines.length && z > s.lines[y + 1].start_frame)
      throw new Error("Lyric line cannot cross neighbouring line bounds");
    s.lines[y] = { ...S, start_frame: C, end_frame: z };
    const E = C - S.start_frame, v = z - C === S.end_frame - S.start_frame;
    for (const w of s.words) if (w.line_id === S.id && (v && (w.start_frame += E, w.end_frame += E), w.start_frame < C || w.end_frame > z))
      throw new Error("Line edit would cut off a word; adjust its words first");
  } else if (f === "word") {
    const y = s.words.findIndex((H) => H.id === r.id);
    if (y < 0) throw new Error("Word not found");
    const S = s.words[y], C = s.lines.find((H) => H.id === S.line_id);
    if (!C) throw new Error("Word parent line missing");
    const z = kn(tn(r.start, m), C.start_frame, C.end_frame - 1, "Word"), E = kn(tn(r.end, m), z + 1, C.end_frame, "Word"), v = s.words.filter((H) => H.line_id === S.line_id), w = v.findIndex((H) => H.id === S.id);
    if (w > 0 && z < v[w - 1].end_frame || w + 1 < v.length && E > v[w + 1].start_frame)
      throw new Error("Word cannot overlap a neighbour within the same lyric line");
    s.words[y] = { ...S, start_frame: z, end_frame: E };
  } else throw new Error("Expected line, word or cue edit");
  return s.review_status = "draft", s;
}
function _b(i, f, r, s = {}) {
  const m = xo(i), h = i.sample_rate, y = kn(tn(r, h), 0, i.num_frames - 1, "Playhead"), S = new Set([...i.lines, ...i.words, ...i.cues].map((E) => E.id)), C = { line: "line", word: "word", cue: "cue" }[f];
  if (!C) throw new Error("Unknown timing track");
  let z;
  for (let E = 1; E <= 1e5 && (z = `${C}-edit-${E}`, !!S.has(z)); E++)
    ;
  if (S.has(z)) throw new Error("Too many events");
  if (f === "cue") {
    const { type: E, section: v } = No(s.type || "SECTION", s.section || "INTRO");
    m.cues.push({ id: z, frame: y, type: E, section: v }), m.cues.sort((w, H) => w.frame - H.frame);
  } else if (f === "line") {
    const E = String(s.text || "").trim();
    if (!E) throw new Error("Type lyric text before adding a line");
    const v = i.lines.find((Z) => Z.start_frame > y), w = [...i.lines].reverse().find((Z) => Z.start_frame <= y);
    if (w && y < w.end_frame) throw new Error("Playhead is inside an existing line");
    const H = Math.min(i.num_frames, v?.start_frame ?? i.num_frames, y + Math.round(h * 2));
    if (H <= y) throw new Error("No room for a new line");
    m.lines.push({ id: z, start_frame: y, end_frame: H, text: E }), m.lines.sort((Z, L) => Z.start_frame - L.start_frame);
  } else {
    const E = m.lines.find((k) => k.id === s.lineId);
    if (!E) throw new Error("Select a lyric line before adding its word");
    const v = String(s.word || "").trim();
    if (!v) throw new Error("Type word text before adding a word");
    if (y < E.start_frame || y >= E.end_frame) throw new Error("Playhead must be within selected lyric line");
    const w = m.words.filter((k) => k.line_id === E.id), H = w.find((k) => k.start_frame > y), Z = [...w].reverse().find((k) => k.start_frame <= y);
    if (Z && Z.end_frame > y) throw new Error("Playhead is already within another word");
    const L = Math.min(E.end_frame, H?.start_frame ?? E.end_frame, y + Math.round(h * 0.25));
    if (L <= y) throw new Error("No room within the selected lyric line");
    m.words.push({ id: z, line_id: E.id, start_frame: y, end_frame: L, word: v }), m.words.sort((k, ot) => k.start_frame - ot.start_frame);
  }
  return m.review_status = "draft", m;
}
function Eb(i, f, r) {
  const s = xo(i), m = { line: "lines", word: "words", cue: "cues" }[f];
  if (!m) throw new Error("Invalid track");
  if (f === "line" && s.words.some((h) => h.line_id === r)) throw new Error("Delete or reassign words before deleting their line");
  return s[m] = s[m].filter((h) => h.id !== r), s.review_status = "draft", s;
}
const Nc = async (i, f = "GET", r = null, s = "") => {
  const m = await fetch(`/api/${i}/song-timing${s}`, {
    method: f,
    headers: r ? { "Content-Type": "application/json" } : void 0,
    body: r ? JSON.stringify(r) : void 0,
    cache: "no-store"
  }), h = await m.json();
  if (!m.ok) throw new Error(h.detail || `Timing edits HTTP ${m.status}`);
  return h;
}, h0 = (i, f) => i / f, Ku = (i, f) => `stemlab-${f.slice(0, 12)}-${i}`;
function Tb(i, f, r) {
  const s = new Blob([i], { type: r });
  return { url: URL.createObjectURL(s), name: f, mime: r, bytes: s.size };
}
function Nb(i) {
  const f = document.createElement("a");
  f.href = i.url, f.download = i.name, document.body.appendChild(f), f.click(), f.remove();
}
function xb(i, f, r, s = !0) {
  const [m, h] = D.useState(null), [y, S] = D.useState(!1), [C, z] = D.useState(null), [E, v] = D.useState(!1), [w, H] = D.useState(!1), [Z, L] = D.useState(!0), [k, ot] = D.useState("all"), [G, Q] = D.useState({ kind: "line", id: null }), [xt, st] = D.useState(""), [Dt, K] = D.useState(!1), [mt, Jt] = D.useState(0.15), [Gt, lt] = D.useState(!1), [rt, ct] = D.useState({ start: 0, end: 1 / 0 }), [_t, Bt] = D.useState(""), [q, tt] = D.useState(""), [W, gt] = D.useState("SECTION"), [dt, jt] = D.useState("INTRO"), [wt, F] = D.useState("lines"), [b, R] = D.useState("bundle"), [V, I] = D.useState(null), yt = D.useRef(0), bt = D.useRef(null), vt = D.useRef(null), J = D.useRef(i), at = D.useRef(!1);
  vt.current = m;
  const ie = D.useCallback(async (M = !1) => {
    if (!(!M && vt.current && E && !window.confirm("Discard unsaved song timing changes?")))
      try {
        const nt = await Nc(i);
        if (!nt.available) {
          st(nt.reason || "Waiting for exact source audio");
          return;
        }
        if (J.current !== i) return;
        h(nt.document), S(nt.saved), z(nt.revision), v(!1), Q({ kind: "line", id: nt.document.lines[0]?.id ?? null }), st(nt.warnings?.join(" · ") || "Song timing loaded · source evidence unchanged");
      } catch (nt) {
        st(nt.message);
      }
  }, [i, E]);
  D.useEffect(() => {
    if (!s) return;
    J.current = i, h(null), z(null), v(!1), Q({ kind: "line", id: null }), ie(!0);
    const M = window.setInterval(() => {
      !vt.current && !at.current && ie(!0);
    }, 5e3);
    return () => window.clearInterval(M);
  }, [i]), D.useEffect(() => () => {
    V?.url && URL.revokeObjectURL(V.url);
  }, [V?.url]);
  const Se = D.useCallback((M) => {
    try {
      const nt = vt.current;
      if (!nt) return;
      const Vt = M(nt);
      h(Vt), v(!0), st("Unsaved song timing edits · original evidence preserved");
    } catch (nt) {
      st(nt.message);
    }
  }, []), Ft = m?.sample_rate || 1, ne = m ? m.num_frames / Ft : Math.max(0, f), Ht = m?.lines.find((M) => M.id === (G.kind === "line" ? G.id : m?.words.find((nt) => nt.id === G.id)?.line_id)) ?? m?.lines[0] ?? null, Et = G.kind, Y = m?.[Et === "line" ? "lines" : Et === "word" ? "words" : "cues"].find((M) => M.id === G.id) ?? null, et = !!(r?.map?.beats?.length && r?.map?.source_audio?.sha256 === i), Mt = r?.revision ?? null, me = m?.clock_mode === "variable", ce = D.useMemo(() => m ? m.clock_mode === "variable" ? et ? { ...r.map, mode: "variable" } : null : { mode: "fixed", bpm: m.fixed_clock.bpm, firstBeatSeconds: m.fixed_clock.first_beat_frame / Ft } : null, [m, et, r?.map, Ft]), Ut = (M) => {
    Se((nt) => ({ ...nt, clock_mode: M, beat_revision: M === "variable" ? Mt : null, review_status: "draft" }));
  }, Jl = (M, nt) => Se((Vt) => ({ ...Vt, fixed_clock: { ...Vt.fixed_clock, [M]: nt }, review_status: "draft" })), $l = (M, nt) => Se((Vt) => Sb(Vt, M, nt)), Al = (M) => Se((nt) => _b(nt, M, yt.current, {
    text: _t,
    word: q,
    lineId: Ht?.id,
    type: W,
    section: dt
  })), Ma = (M, nt, Vt) => Se((ee) => {
    if (!Vt.trim() || /\r|\n|[\x00-\x1f]/.test(Vt)) throw new Error("Text must be nonempty, without newlines");
    const za = M === "line" ? "lines" : "words", Aa = M === "line" ? "text" : "word";
    return { ...ee, [za]: ee[za].map((jl) => jl.id === nt ? { ...jl, [Aa]: Vt.trim() } : jl), review_status: "draft" };
  }), Ae = (M, nt, Vt) => Se((ee) => {
    const za = No(nt, Vt);
    return { ...ee, cues: ee.cues.map((Aa) => Aa.id === M ? { ...Aa, type: za.type, section: za.section } : Aa), review_status: "draft" };
  }), Oa = async () => {
    if (m) {
      H(!0), at.current = !0;
      try {
        if (me && (r?.dirty || !et)) throw new Error("Save/reload the corrected beat map first; an enabled variable clock must refer to the current real beat map");
        const M = await Nc(i, "PUT", { document: m, expected_revision: C });
        h(M.document), z(M.revision), S(!0), v(!1), st("Saved exact source-frame corrections · original canonical, cue and ASR files unchanged");
      } catch (M) {
        st(M.message);
      } finally {
        H(!1), at.current = !1;
      }
    }
  }, Cl = async () => {
    if (m) {
      H(!0), at.current = !0;
      try {
        if (me && (r?.dirty || !et)) throw new Error("Save and verify the exact beat map before exporting variable-clock timing");
        const M = await Nc(i, "POST", { document: m }, "/preview"), nt = {
          bundle: [JSON.stringify(M, null, 2) + `
`, Ku("timing-bundle", i) + ".json", "application/json"],
          lines: [M.line_lrc, Ku("lines", i) + ".lrc", "text/plain;charset=utf-8"],
          words: [M.word_tsv, Ku("words", i) + ".tsv", "text/tab-separated-values;charset=utf-8"],
          wordjson: [JSON.stringify(M.word_json, null, 2) + `
`, Ku("words", i) + ".json", "application/json"],
          cues: [M.cue_lrc, Ku("cues", i) + ".lrc", "text/plain;charset=utf-8"]
        }, Vt = Tb(...nt[b]);
        I(Vt), Nb(Vt), st(`Download started: ${Vt.name} (${Vt.bytes.toLocaleString()} bytes) · use the ready link below if the browser hid or blocked the automatic download`);
      } catch (M) {
        st(M.message);
      } finally {
        H(!1), at.current = !1;
      }
    }
  }, Wn = async (M) => {
    const nt = M.target.files?.[0];
    if (M.target.value = "", !nt || !m) return;
    if (nt.size > 1048576) {
      st("Timing import limited to 1 MiB");
      return;
    }
    const Vt = nt.name.split(".").at(-1).toLowerCase();
    H(!0), at.current = !0;
    try {
      const ee = await Nc(i, "POST", { document: m, kind: wt, format: Vt, text: await nt.text() }, "/import");
      h(ee.document), v(!0), st(`Imported ${wt} for review; not saved until Save corrections`);
    } catch (ee) {
      st(ee.message);
    } finally {
      H(!1), at.current = !1;
    }
  }, nn = (M) => {
    const nt = M.start_frame ?? M.frame, Vt = M.end_frame ?? nt;
    return nt / Ft <= rt.end + 0.01 && Vt / Ft >= rt.start - 0.01;
  }, j = D.useMemo(() => bb(m), [m]), ut = D.useMemo(() => new Map(j.map((M) => [M.toId, M.severity])), [j]), Nt = (M, nt) => ({
    id: M.id,
    label: nt === "cue" ? `[${M.type}: ${M.section}]` : nt === "word" ? M.word : M.text,
    ...nt === "cue" ? { type: M.type, section: M.section } : {},
    start: h0(M.start_frame ?? M.frame, Ft),
    ...nt === "cue" ? {} : { end: h0(M.end_frame, Ft) },
    ...nt === "word" ? { parentId: M.line_id, className: ut.has(M.id) ? `stemlab-short-transition-${ut.get(M.id)}` : "" } : {}
  }), he = m?.lines || [], ve = k === "all" ? m?.words || [] : (m?.words || []).filter((M) => M.line_id === Ht?.id), Yt = (M, nt, Vt = null) => ({
    id: `timing:${M}`,
    kind: `timing-${M}`,
    title: M === "line" ? "Lyric lines · editable" : M === "word" ? k === "all" ? "Words · all lyrics" : `Words · ${Ht?.text || "select a line"}` : "Cue sections · editable",
    meta: `${nt.length} ${M} events · drag or arrow to adjust · ${ce?.mode || "no clock"} match`,
    height: M === "word" ? 88 : 94,
    content: {
      type: "timing",
      kind: M,
      clock: ce,
      editable: !0,
      snap: Dt,
      toleranceSeconds: mt,
      items: nt.filter(nn).slice(0, 1600).map((ee) => Nt(ee, M)),
      parents: Vt ? Vt.map((ee) => ({ id: ee.id, start: ee.start_frame / Ft, end: ee.end_frame / Ft })) : void 0,
      selectedId: G.kind === M ? G.id : null,
      onSelect: (ee) => Q({ kind: M, id: ee }),
      onEdit: (ee) => $l(M, ee)
    }
  }), we = m && Z ? [
    Yt("line", he),
    Yt("word", ve, he),
    Yt("cue", m.cues)
  ] : [], _e = /* @__PURE__ */ d.jsxs("section", { className: "stemlab-timing-panel", "aria-label": "Editable lyric, word and cue timing", children: [
    /* @__PURE__ */ d.jsxs("header", { children: [
      /* @__PURE__ */ d.jsx("strong", { children: "Lyric timing audition & correction" }),
      /* @__PURE__ */ d.jsx("span", { children: m ? `${m.lines.length} lines · ${m.words.length} words · ${m.cues.length} cues · ${E ? "unsaved" : "saved/seeded"}` : "Awaiting master" }),
      /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => L((M) => !M), children: Z ? "Hide timing editor" : "Show timing editor" })
    ] }),
    Z && m && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsx("p", { children: "All words are visible by default. Switch to the selected line for a less crowded editing view. Line, word and cue edits are kept in a separate source-bound document. Cue names must follow the established [SECTION: VERSE 1] / [DROP: CHORUS 1] convention." }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-timing-fields", children: [
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Timing clock ",
          /* @__PURE__ */ d.jsxs("select", { "aria-label": "Timing clock", value: m.clock_mode, onChange: (M) => Ut(M.target.value), children: [
            /* @__PURE__ */ d.jsx("option", { value: "fixed", children: "Fixed BPM + Beat 1 offset" }),
            /* @__PURE__ */ d.jsx("option", { value: "variable", disabled: !et, children: "Corrected variable BPM beat map" })
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
              onChange: (M) => Jl("bpm", Number(M.target.value))
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
              max: ne,
              step: ".001",
              value: m.fixed_clock.first_beat_frame / Ft,
              onChange: (M) => Jl("first_beat_frame", tn(M.target.value, Ft))
            }
          )
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          /* @__PURE__ */ d.jsx("input", { type: "checkbox", checked: Dt, onChange: (M) => K(M.target.checked) }),
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
              value: Math.round(mt * 1e3),
              onChange: (M) => Jt(Math.max(0, Math.min(1, Number(M.target.value) / 1e3)))
            }
          )
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          /* @__PURE__ */ d.jsx("input", { type: "checkbox", checked: Gt, onChange: (M) => lt(M.target.checked) }),
          "Beat grid overlay"
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Word lane ",
          /* @__PURE__ */ d.jsxs("select", { "aria-label": "Word lane scope", value: k, onChange: (M) => ot(M.target.value), children: [
            /* @__PURE__ */ d.jsx("option", { value: "all", children: "All words" }),
            /* @__PURE__ */ d.jsx("option", { value: "selected", children: "Selected line only" })
          ] })
        ] })
      ] }),
      j.length > 0 && /* @__PURE__ */ d.jsxs("details", { className: "stemlab-timing-diagnostics", open: !0, children: [
        /* @__PURE__ */ d.jsxs("summary", { children: [
          j.length,
          " unusually short word transition",
          j.length === 1 ? "" : "s",
          " to audition"
        ] }),
        /* @__PURE__ */ d.jsx("p", { children: "Orange is below five 16th-beat ticks; red is below three. These are review flags, not automatic timing changes." }),
        /* @__PURE__ */ d.jsx("ul", { children: j.map((M) => /* @__PURE__ */ d.jsxs("li", { children: [
          /* @__PURE__ */ d.jsxs("button", { type: "button", onClick: () => {
            Q({ kind: "word", id: M.toId }), ot("selected");
          }, children: [
            M.line,
            ": ",
            M.fromWord,
            " → ",
            M.toWord
          ] }),
          " ",
          /* @__PURE__ */ d.jsx("strong", { children: M.severity }),
          " · ",
          M.ticks.toFixed(2),
          " ticks · ",
          M.seconds.toFixed(3),
          "s"
        ] }, `${M.fromId}:${M.toId}`)) })
      ] }),
      me && !et && /* @__PURE__ */ d.jsx("p", { role: "alert", children: "Variable BPM is selected but its source-bound beat map is unavailable; no silent fixed-BPM downgrade." }),
      me && r?.dirty && /* @__PURE__ */ d.jsx("p", { role: "alert", children: "Save the beat-map corrections before saving/exporting lyric and cue timing changes." }),
      me && et && m.beat_revision !== Mt && /* @__PURE__ */ d.jsxs("p", { role: "alert", children: [
        "The saved beat-map revision has changed. Review its timing, then explicitly rebind these lyrics and cues to that revision. ",
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: r.dirty, onClick: () => Se((M) => ({ ...M, beat_revision: Mt, review_status: "draft" })), children: "Rebind to reviewed beat-map revision" })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-timing-fields", children: [
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Selected line ",
          /* @__PURE__ */ d.jsxs("select", { "aria-label": "Selected lyric line", value: Ht?.id || "", onChange: (M) => Q({ kind: "line", id: M.target.value }), children: [
            /* @__PURE__ */ d.jsx("option", { value: "", children: "Choose line" }),
            m.lines.map((M) => /* @__PURE__ */ d.jsx("option", { value: M.id, children: M.text.slice(0, 75) }, M.id))
          ] })
        ] }),
        Y && Et !== "cue" && /* @__PURE__ */ d.jsxs("label", { children: [
          Et === "line" ? "Line text" : "Word text",
          /* @__PURE__ */ d.jsx(
            "input",
            {
              "aria-label": "Selected text",
              value: Et === "line" ? Y.text : Y.word,
              onChange: (M) => Ma(Et, Y.id, M.target.value)
            }
          )
        ] }),
        Y && Et === "cue" && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
          /* @__PURE__ */ d.jsxs("label", { children: [
            "Cue type ",
            /* @__PURE__ */ d.jsx("select", { value: Y.type, onChange: (M) => Ae(Y.id, M.target.value, Y.section), children: So.map((M) => /* @__PURE__ */ d.jsx("option", { value: M, children: M }, M)) })
          ] }),
          /* @__PURE__ */ d.jsxs("label", { children: [
            "Standard section ",
            /* @__PURE__ */ d.jsx(
              "select",
              {
                value: $u.find((M) => Y.section === M || Y.section.startsWith(M + " ")) || "INTRO",
                onChange: (M) => Ae(Y.id, Y.type, M.target.value),
                children: $u.map((M) => /* @__PURE__ */ d.jsx("option", { value: M, children: M }, M))
              }
            )
          ] }),
          /* @__PURE__ */ d.jsxs("label", { children: [
            "Section number / suffix ",
            /* @__PURE__ */ d.jsxs(
              "select",
              {
                "aria-label": "Cue section suffix",
                value: Y.section.match(/ (\d+|A|B|FINAL)$/)?.[1] || "",
                onChange: (M) => {
                  const nt = $u.find((Vt) => Y.section === Vt || Y.section.startsWith(Vt + " ")) || "INTRO";
                  Ae(Y.id, Y.type, nt + (M.target.value ? " " + M.target.value : ""));
                },
                children: [
                  /* @__PURE__ */ d.jsx("option", { value: "", children: "None" }),
                  Array.from({ length: 64 }, (M, nt) => String(nt + 1)).concat(["A", "B", "FINAL"]).map((M) => /* @__PURE__ */ d.jsx("option", { value: M, children: M }, M))
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-timing-fields", children: [
        /* @__PURE__ */ d.jsxs("label", { children: [
          "New line text ",
          /* @__PURE__ */ d.jsx("input", { value: _t, placeholder: "Lyrics line", onChange: (M) => Bt(M.target.value) })
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => Al("line"), children: "Add line at playhead" }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "New word ",
          /* @__PURE__ */ d.jsx("input", { value: q, placeholder: "Single word", onChange: (M) => tt(M.target.value) })
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: !Ht, onClick: () => Al("word"), children: "Add word inside selected line" })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-timing-fields", children: [
        /* @__PURE__ */ d.jsxs("label", { children: [
          "New cue type ",
          /* @__PURE__ */ d.jsx("select", { value: W, onChange: (M) => gt(M.target.value), children: So.map((M) => /* @__PURE__ */ d.jsx("option", { children: M }, M)) })
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Section ",
          /* @__PURE__ */ d.jsx("select", { value: dt, onChange: (M) => jt(M.target.value), children: $u.map((M) => /* @__PURE__ */ d.jsx("option", { children: M }, M)) })
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => Al("cue"), children: "Add cue at playhead" }),
        /* @__PURE__ */ d.jsxs("button", { type: "button", disabled: !Y, onClick: () => Se((M) => Eb(M, Et, G.id)), children: [
          "Delete selected ",
          Et
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          /* @__PURE__ */ d.jsx("input", { type: "checkbox", checked: m.review_status === "artist_confirmed", onChange: (M) => Se((nt) => ({ ...nt, review_status: M.target.checked ? "artist_confirmed" : "draft" })) }),
          "Artist-reviewed timing"
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-timing-actions", children: [
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: w || !E, onClick: Oa, children: "Save source-frame corrections" }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Export format ",
          /* @__PURE__ */ d.jsxs("select", { value: b, onChange: (M) => R(M.target.value), children: [
            /* @__PURE__ */ d.jsx("option", { value: "bundle", children: "Complete JSON bundle" }),
            /* @__PURE__ */ d.jsx("option", { value: "lines", children: "Line LRC" }),
            /* @__PURE__ */ d.jsx("option", { value: "words", children: "Word TSV" }),
            /* @__PURE__ */ d.jsx("option", { value: "wordjson", children: "Word JSON" }),
            /* @__PURE__ */ d.jsx("option", { value: "cues", children: "Named cue LRC" })
          ] })
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: w, onClick: Cl, children: "Download selected format" }),
        V && /* @__PURE__ */ d.jsxs("a", { className: "stemlab-download-ready", href: V.url, download: V.name, children: [
          "Download ready: ",
          V.name
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Import track ",
          /* @__PURE__ */ d.jsxs("select", { value: wt, onChange: (M) => F(M.target.value), children: [
            /* @__PURE__ */ d.jsx("option", { value: "lines", children: "Per-line LRC" }),
            /* @__PURE__ */ d.jsx("option", { value: "words", children: "Per-word LRC/TSV/JSON" }),
            /* @__PURE__ */ d.jsx("option", { value: "cues", children: "Section-cue LRC" })
          ] })
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: w, onClick: () => bt.current?.click(), children: "Choose timing file" }),
        /* @__PURE__ */ d.jsx("input", { ref: bt, type: "file", hidden: !0, accept: wt === "words" ? ".lrc,.tsv,.json" : ".lrc", onChange: Wn }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: w, onClick: () => ie(), children: "Reload saved" })
      ] }),
      /* @__PURE__ */ d.jsx("small", { children: "Word positions must stay inside their lyric line. An off-grid word/cue is preserved until you explicitly drag or enable nearby-beat snapping. Pips=64/beat, DanceMoves ticks=16/beat. LRC/TSV exports round timestamps; the JSON retains native frames." })
    ] }),
    Z && !m && /* @__PURE__ */ d.jsx("p", { children: "Waiting for decoded source audio; no lyric or cue times are invented." }),
    xt && /* @__PURE__ */ d.jsx("output", { role: "status", className: "stemlab-timing-status", children: xt })
  ] });
  return {
    clock: ce,
    lanes: we,
    panel: _e,
    gridVisible: Gt,
    lyricItems: m ? he.map((M) => Nt(M, "line")) : null,
    lyricWords: m ? Iy(m) : null,
    onWindowChange: ct,
    onTimeChange: (M) => {
      yt.current = M;
    }
  };
}
function Mb(i, f) {
  if (!i || i.schema !== "stemlab.loops.v1") return [];
  const r = i.sample_rate;
  return !Number.isSafeInteger(r) || r <= 0 ? [] : (i.loops || []).flatMap((s) => {
    if (!/^(verse|chorus)-\d+-\d+$/.test(s.id) || !Number.isSafeInteger(s.start_sample) || !Number.isSafeInteger(s.end_sample) || s.start_sample < 0 || s.end_sample <= s.start_sample || s.end_sample > i.source_frames) return [];
    const m = encodeURIComponent(`${i.source_sha256}:${s.start_sample}:${s.end_sample}`);
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
function Ob(i) {
  const [f, r] = D.useState({ report: null, error: "" });
  D.useEffect(() => {
    let m = !0, h, y = "";
    const S = new AbortController();
    r({ report: null, error: "" });
    const C = async () => {
      try {
        const z = await fetch(`/${i}/deep/loops/loops.json`, {
          cache: "no-store",
          signal: S.signal
        });
        if (!m) return;
        if (z.status === 404)
          y = "", r({ report: null, error: "" });
        else {
          if (!z.ok) throw new Error(`Loop report: HTTP ${z.status}`);
          const E = await z.json();
          if (E.schema === "stemlab.loop-availability.v1" && E.status === "not-analysed") {
            r({ report: null, error: "", note: E.reason });
            return;
          }
          if (E.schema !== "stemlab.loops.v1") throw new Error("Unsupported loop report schema");
          const v = JSON.stringify(E);
          m && v !== y && (r({ report: E, error: "" }), y = v);
        }
      } catch (z) {
        m && z.name !== "AbortError" && (y = "", r({ report: null, error: z.message }));
      } finally {
        m && (h = window.setTimeout(C, 2500));
      }
    };
    return C(), () => {
      m = !1, S.abort(), window.clearTimeout(h);
    };
  }, [i]);
  const s = D.useMemo(() => Mb(f.report, i), [f.report, i]);
  return { ...f, loops: s };
}
function zb({ state: i, hash: f }) {
  const r = i.report;
  return i.error ? /* @__PURE__ */ d.jsx("p", { role: "alert", className: "stemlab-loop-summary", children: i.error }) : i.note ? /* @__PURE__ */ d.jsx("p", { className: "stemlab-loop-summary", children: i.note }) : r ? /* @__PURE__ */ d.jsxs("details", { className: "stemlab-loop-summary", open: r.unresolved_sections.length > 0, children: [
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
const je = (i) => document.querySelector(i), Ab = je("#uploadView"), Mo = je("#timelineView"), en = je("#dropZone"), Wu = je("#fileInput"), N0 = je("#chooseButton"), x0 = je("#uploadProgressWrap"), Oc = je("#uploadProgress"), zc = je("#uploadLabel"), Ea = je("#connectionBadge"), M0 = je("#canonicalBpm"), O0 = je("#canonicalLyrics"), z0 = je("#canonicalTiming"), _o = je("#knownInfoStatus"), Cb = je("#loadArcadiansReference"), jb = je("#loadArcadiansHero"), wb = Array.from(Mo.children), Oo = document.createElement("div");
Oo.id = "timelineRoot";
Mo.replaceChildren(Oo);
for (const i of wb) i.remove();
const Rb = jy.createRoot(Oo), Db = /* @__PURE__ */ new Set(["wav", "flac", "mp3", "ogg", "opus", "m4a", "aif", "aiff"]);
let Eo = {};
function Ub(i) {
  const f = String(i).split("/").pop() || "", r = f.lastIndexOf(".");
  return r >= 0 ? f.slice(r + 1).toLowerCase() : "";
}
function vl(i) {
  return String(i).replace(/^stems\//, "").replace(/^spectrograms\//, "").replace(/^vamp\/data\//, "Vamp · ").replace(/^beats\//, "Beats · ").replace(/^speech\//, "Speech · ").replace(/^deep\//, "Deep · ").replace(/[_-]+/g, " ");
}
function jc(i, f) {
  return `/${i}/${f.split("/").map(encodeURIComponent).join("/")}`;
}
function Ac(i, f, r = "Generated analysis artifact") {
  return { type: "artifact", note: r, href: f === "__source__" ? `/api/${i}/source` : jc(i, f) };
}
async function Pe(i, f) {
  const r = await fetch(jc(i, f), { cache: "no-store" });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}
function gl(i, f = 2, r = "") {
  const s = Number(i);
  return Number.isFinite(s) ? `${s.toFixed(f)}${r}` : "—";
}
function Pa(i, f, r, s, m = "feature") {
  const h = s.filter(([, y]) => y != null && y !== "");
  return {
    id: i,
    title: f,
    meta: r,
    kind: m,
    content: {
      type: "summary",
      items: (h.length ? h : [["status", "analysis available"]]).map(([y, S]) => ({ label: y, value: S }))
    }
  };
}
function Cc(i) {
  return (i || []).flatMap((f) => {
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
function Bb(i) {
  const f = Array.isArray(i.events) ? i.events : [];
  switch (String(i.kind || "")) {
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
      return { type: "blocks", items: Cc(f) };
    case "events":
      return { type: "markers", items: f.flatMap((r) => Number.isFinite(Number(r.start)) ? [{ time: Number(r.start) }] : []) };
    default:
      return { type: "artifact", note: f[0]?.label || f[0]?.values?.join(", ") || i.title || "analysis" };
  }
}
async function A0(i, f, r, s, m) {
  const h = new URLSearchParams({ path: m, points: "12000" }), y = await fetch(`/api/${i}/waveform?${h}`);
  if (!y.ok) return { id: f, title: r, meta: s, kind: "artifact", content: Ac(i, m, `waveform unavailable (${y.status})`) };
  const S = await y.json();
  return {
    id: f,
    title: r,
    meta: s,
    kind: "waveform",
    content: { type: "waveform", min: S.min || [], max: S.max || [] },
    duration: Number(S.duration_seconds) || 0,
    audioSrc: m === "__source__" ? `/api/${i}/source` : jc(i, m)
  };
}
async function Hb(i, f) {
  const r = f.path, s = `file:${r}`, m = Ub(r);
  if (r === "canonical.json" || r.startsWith("deep/loops/")) return null;
  if (Db.has(m)) return A0(i, s, vl(r), "audio waveform", r);
  if (r.startsWith("spectrograms/") && m === "npz") {
    const h = new URLSearchParams({ path: r, max_width: "8192", max_height: "768" });
    return { id: s, title: vl(r), meta: "spectrogram data · exact song timeline", kind: "spectrogram", content: { type: "image", src: `/api/${i}/spectrogram?${h}`, alt: `${vl(r)} spectrogram` } };
  }
  if (r.startsWith("spectrograms/") && m === "png")
    return { id: s, title: vl(r), meta: "rendered spectrogram PNG", kind: "image", content: { type: "image", src: jc(i, r), alt: `${vl(r)} rendered spectrogram` } };
  try {
    if (r === "analysis.json") {
      const h = await Pe(i, r);
      return {
        id: s,
        title: vl(r),
        meta: "analysis provenance",
        kind: "artifact",
        sourceMap: h.spectrograms || [],
        content: Ac(i, r)
      };
    }
    if (r.startsWith("deep/midi/") && r.endsWith("/notes.json")) {
      const h = await Pe(i, r);
      return {
        id: s,
        title: `MIDI · ${h.source_stem || vl(r)}`,
        meta: `${h.model_title || h.model || "Transcription"} · ${h.note_count || 0} inferred notes · original audio clock`,
        kind: "midi-notes",
        content: { type: "notes", items: (h.notes || []).map((y) => ({
          start: y.start,
          end: y.end,
          value: y.midi_pitch,
          label: `MIDI ${y.midi_pitch} · velocity ${y.velocity}`
        })) }
      };
    }
    if (r.startsWith("beats/") && m === "json") {
      const h = await Pe(i, r), y = new Set((h.downbeats || []).map((S) => Number(S).toFixed(3)));
      return { id: s, title: vl(r), meta: "beat / downbeat events", kind: "events", content: { type: "markers", items: (h.beats || []).flatMap((S) => {
        const C = Number(S);
        return Number.isFinite(C) ? [{ time: C, emphasis: y.has(C.toFixed(3)), label: y.has(C.toFixed(3)) ? "Downbeat" : "Beat" }] : [];
      }) } };
    }
    if (r.startsWith("vamp/data/") && m === "json") {
      const h = await Pe(i, r);
      return { id: s, title: vl(r), meta: "Vamp feature analysis", kind: "feature", content: Bb(h) };
    }
    if (r === "speech/whisper.json") {
      const h = await Pe(i, r);
      return { id: s, title: "Speech · Whisper words", meta: "word-aligned transcript", kind: "words", content: { type: "blocks", items: (h.words || []).flatMap((y) => {
        const S = Number(y.start), C = Number(y.end);
        return Number.isFinite(S) ? [{ start: S, end: Number.isFinite(C) ? Math.max(S + 0.03, C) : S + 0.03, label: String(y.word || "").trim() }] : [];
      }) } };
    }
    if (r === "deep/structure/structure.json" || r === "deep/song_map/song_map.json") {
      const h = await Pe(i, r), y = r.includes("song_map");
      return { id: s, title: y ? "Deep · song map" : "Deep · functional structure", meta: y ? "section-level sonic / rhythm / harmony / lyric fusion" : "All-In-One · functional song sections", kind: "deep-structure", content: { type: "blocks", items: Cc(y ? h.sections : h.segments) } };
    }
    if (r === "deep/harmony/harmony.json") {
      const h = await Pe(i, r), y = h.chords?.collapsed_progression || [];
      return y.length ? { id: s, title: "Deep · harmony", meta: "collapsed chord progression + key evidence", kind: "deep-harmony", content: { type: "blocks", items: Cc(y) } } : Pa(s, "Deep · harmony", "collapsed chord progression + key evidence", [["key", h.vamp_key || h.independent_key_candidates_from_nnls_chroma?.[0]?.key || "—"], ["tuning", h.tuning_hz ? `${Number(h.tuning_hz).toFixed(1)} Hz` : "—"]], "deep-harmony");
    }
    if (r === "deep/lyrics/lyrics.json") {
      const h = await Pe(i, r), y = (h.lines || []).filter((S) => Number.isFinite(Number(S.start)) && Number.isFinite(Number(S.end)));
      return y.length ? { id: s, title: "Deep · rhyme & prosody", meta: "phonetic rhyme, repetition and delivery", kind: "deep-lyrics", content: { type: "blocks", items: Cc(y) } } : Pa(s, "Deep · rhyme & prosody", "phonetic rhyme, repetition and delivery", [["rhyme scheme", h.rhyme?.scheme || "—"], ["lines", h.line_count ?? "—"], ["words", h.word_count ?? "—"]], "deep-lyrics");
    }
    if (r === "deep/sonic/sonic.json") {
      const h = await Pe(i, r);
      return Pa(s, "Deep · sonic profile", "loudness · dynamics · timbre · stereo", [["LUFS", gl(h.loudness?.integrated_lufs_bs1770, 1)], ["crest", gl(h.loudness?.crest_factor_db, 1, " dB")], ["RMS range", gl(h.loudness?.short_term_rms_range_db_p95_p10, 1, " dB")], ["centroid", gl(h.timbre?.spectral_centroid_hz_mean, 0, " Hz")], ["stereo corr", gl(h.stereo?.left_right_correlation, 2)]]);
    }
    if (r === "deep/rhythm/rhythm.json") {
      const h = await Pe(i, r);
      return Pa(s, "Deep · groove", "meter · stability · swing · syncopation evidence", [["tempo", gl(h.tempo?.median_bpm, 2, " BPM")], ["meter", h.meter?.estimated_beats_per_bar ? `${h.meter.estimated_beats_per_bar}/4-ish` : "—"], ["swing", gl(h.groove?.swing_ratio_long_to_short, 2, ":1")], ["offbeat energy", gl(h.groove?.offbeat_onset_energy_ratio, 3)], ["onsets/s", gl(h.groove?.onset_density_per_second, 2)]]);
    }
    if (r === "deep/semantic_text/semantic_text.json") {
      const h = await Pe(i, r);
      return Pa(s, "Deep · lyric semantics", "sentence embedding theme similarities · not probabilities", (h.theme_similarity || []).slice(0, 7).map((y) => [y.theme, gl(y.similarity, 3)]));
    }
    if (r === "deep/semantic_audio/semantic_audio.json") {
      const h = await Pe(i, r), y = Object.entries(h.prompt_sets || {}).flatMap(([S, C]) => (C || []).slice(0, 2).map((z) => [`${S}: ${z.prompt}`, gl(z.similarity, 3)]));
      return Pa(s, "Deep · audio semantics", "MuQ-MuLan zero-shot similarities · CC-BY-NC weights", y);
    }
    if (r === "deep/summary.json") {
      const h = await Pe(i, r), y = Object.entries(h.analyses || {}).map(([S, C]) => [S, C.available ? "ready" : "unavailable"]);
      return (h.errors || []).length && y.push(["errors", h.errors.length]), Pa(s, "Deep · analysis summary", "cross-domain action inventory", y);
    }
  } catch (h) {
    return { id: s, title: vl(r), meta: "analysis artifact", kind: "artifact", content: Ac(i, r, h.message) };
  }
  return { id: s, title: vl(r), meta: `${m || "file"} · ${Number(f.bytes || 0).toLocaleString()} bytes`, kind: "artifact", content: Ac(i, r) };
}
function Lb(i) {
  const f = [];
  i?.lyrics && f.push({ id: "canonical:lyrics", title: "Canonical lyrics", meta: "known reference text", kind: "canonical-lyrics", height: 104, content: { type: "text", text: i.lyrics } });
  const r = Array.isArray(i?.lyric_timing) ? i.lyric_timing : [];
  return r.length && f.push({ id: "canonical:timing", title: "Canonical lyric timing", meta: `${r.length} timed lyric event${r.length === 1 ? "" : "s"}`, kind: "canonical-timing", height: 104, content: { type: "blocks", items: r.flatMap((s) => {
    const m = Number(s.start), h = Number(s.end);
    return Number.isFinite(m) && m >= 0 ? [{ start: m, end: Number.isFinite(h) && h > m ? h : m + 0.75, label: String(s.text || ""), className: "stemlab-canonical-lyric" }] : [];
  }) } }), { lanes: f };
}
function Yb({ lines: i }) {
  return /* @__PURE__ */ d.jsxs("details", { open: !0, className: "stemlab-log", children: [
    /* @__PURE__ */ d.jsx("summary", { children: "Analysis log" }),
    /* @__PURE__ */ d.jsx("div", { className: "log", children: i.map((f, r) => /* @__PURE__ */ d.jsxs("div", { className: f.stream === "stderr" ? "stderr" : "stdout", children: [
      "[",
      f.stream,
      "] ",
      f.text
    ] }, r)) })
  ] });
}
function qb({ hash: i, filename: f }) {
  const r = Ob(i), [s, m] = D.useState([]), [h, y] = D.useState("__source__"), [S, C] = D.useState(0), z = !window.__stemlabStatic, E = yb(i, S, z), v = xb(i, S, E, z), [w, H] = D.useState({ state: "submitted" }), [Z, L] = D.useState({ bpm: null, lyrics: null, lyric_timing: [] }), [k, ot] = D.useState(null), [G, Q] = D.useState("canonical"), [xt, st] = D.useState("consensus"), [Dt, K] = D.useState([]), mt = D.useRef(/* @__PURE__ */ new Set()), Jt = D.useCallback((F, b) => {
    b && K((R) => [...R.slice(-799), { stream: F === "stderr" ? "stderr" : "stdout", text: b }]);
  }, []), Gt = D.useCallback(async (F) => {
    if (!F?.path || mt.current.has(F.path)) return;
    mt.current.add(F.path);
    const b = await Hb(i, F);
    b && (b.duration && C((R) => R || b.duration), m((R) => R.some((V) => V.id === b.id) ? R : [...R, b]));
  }, [i]), lt = D.useCallback(async () => {
    const F = await fetch(`/api/${i}/timeline`, { cache: "no-store" });
    if (!F.ok) return;
    const b = await F.json();
    H(b.status || { state: "submitted" }), b.duration_seconds && C(Number(b.duration_seconds)), b.canonical && L(b.canonical), ot(b.beat_offsets || null);
    for (const R of b.files || []) Gt(R);
  }, [Gt, i]);
  D.useEffect(() => {
    mt.current = /* @__PURE__ */ new Set(), m([]), y("__source__"), ot(null), Q("canonical"), st("consensus"), A0(i, "__source__", "MASTER · uploaded source", f, "__source__").then((R) => {
      R.duration && C(R.duration), m((V) => [R, ...V.filter((I) => I.id !== R.id)]);
    }).catch((R) => Jt("stderr", R.message)), lt();
    const F = window.setInterval(() => {
      lt();
    }, 2500);
    let b = null;
    return typeof window.io == "function" ? (b = window.io({ path: "/socket.io" }), b.on("connect", () => {
      Ea.textContent = "live", Ea.classList.remove("muted"), b.emit("subscribe", { hash: i });
    }), b.on("disconnect", () => {
      Ea.textContent = "reconnecting", Ea.classList.add("muted");
    }), b.on("process_output", (R) => Jt(R.stream || "stdout", R.line || "")), b.on("process_history", (R) => {
      for (const V of R.stdout || []) Jt("stdout", V);
      for (const V of R.stderr || []) Jt("stderr", V);
    }), b.on("new_file", (R) => {
      Gt(R);
    }), b.on("job_status", (R) => {
      H(R.status || {}), lt();
    }), b.on("canonical_metadata", (R) => {
      R?.canonical && L(R.canonical);
    }), b.on("job_timeout", (R) => Jt("stderr", `Job timeout: ${R.message || "analysis exceeded timeout"}`))) : window.__stemlabStatic ? (Ea.textContent = "static", Ea.classList.add("muted")) : (Ea.textContent = "polling", Ea.classList.add("muted"), Jt("stderr", "Socket.IO browser client unavailable; timeline inventory polling remains active.")), () => {
      window.clearInterval(F), b?.disconnect();
    };
  }, [Gt, Jt, f, i, lt]);
  const rt = D.useMemo(() => Lb(Z), [Z]), ct = D.useMemo(() => ab(k, Z.bpm, S, G, xt), [k, Z.bpm, S, G, xt]), _t = (F) => F.id === "__source__" ? 0 : F.kind === "deep-structure" ? 10 : F.kind === "events" ? 20 : F.kind === "audio" ? 1 : F.kind === "spectrogram" ? 30 : F.kind === "waveform" ? 40 : 90, Bt = D.useMemo(() => eb(s), [s]), tt = [...ct.basis ? [
    { id: "canonical:bpm", title: "BPM grid · original", meta: `${ct.basis.bpm.toFixed(4)} BPM · source time 0`, kind: "canonical-bpm", height: 74, content: { type: "markers", items: ct.original } },
    { id: "bpm:aligned", title: "BPM grid · offset", meta: ct.row ? `${ct.row.offset_pips.toFixed(6)} pips · ${ct.analysis.analysis_id}` : "Waiting for detected first beat", kind: "canonical-bpm", height: 74, content: { type: "markers", items: ct.aligned } }
  ] : [], ...E.lanes, ...v.lanes, ...rt.lanes, ...[...Bt].sort((F, b) => _t(F) - _t(b) || F.id.localeCompare(b.id))], W = Py(s, S), gt = W.find((F) => F.id === h), dt = !gt || gt.id === "__source__", jt = window.__stemlabStatic ? window.__stemlabStatic.artworkUrl : Z.cover_art_url, wt = w.state || "submitted";
  return /* @__PURE__ */ d.jsx(
    Fy,
    {
      className: "stemlab-timeline",
      laneControls: !0,
      wheelNavigation: !0,
      audioSrc: gt?.audioSrc || `/api/${i}/source`,
      lyricAudition: {
        artworkSrc: jt,
        artworkAlt: `${Z.title || f} cover artwork`,
        audioLabel: gt?.title || "MASTER · uploaded source",
        items: Wy(Z, v.lyricItems ?? window.__stemlabStatic?.lyricItems ?? null),
        words: v.lyricWords ?? window.__stemlabStatic?.lyricWords ?? []
      },
      duration: S,
      title: Z.title || f,
      subtitle: i,
      loops: tb(r.loops, dt),
      lanes: tt,
      grid: [...ct.grid, ...E.grid],
      beatClock: v.clock,
      showBeatGrid: v.gridVisible,
      onDurationChange: C,
      onWindowChange: (F) => {
        E.onWindowChange(F), v.onWindowChange(F);
      },
      onTimeChange: (F) => {
        E.onTimeChange(F), v.onTimeChange(F);
      },
      onPlaybackError: (F) => Jt("stderr", F instanceof Error ? F.message : String(F)),
      headerEnd: /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
        /* @__PURE__ */ d.jsxs("label", { className: "small stemlab-audition-channel", children: [
          "Audio channel ",
          /* @__PURE__ */ d.jsxs(
            "select",
            {
              "aria-label": "Audio channel",
              value: gt?.id || "__source__",
              onChange: (F) => y(F.target.value),
              children: [
                !W.length && /* @__PURE__ */ d.jsx("option", { value: "__source__", children: "MASTER · uploaded source" }),
                W.map((F) => /* @__PURE__ */ d.jsx("option", { value: F.id, children: F.title }, F.id))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ d.jsx("span", { className: `badge ${wt}`, children: wt }),
        /* @__PURE__ */ d.jsxs("span", { className: "small", children: [
          tt.length,
          " lane",
          tt.length === 1 ? "" : "s"
        ] })
      ] }),
      footer: /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
        /* @__PURE__ */ d.jsx(nb, { comparison: ct, onBasis: Q, onAnalysis: st }),
        z && E.panel,
        z && v.panel,
        /* @__PURE__ */ d.jsx(zb, { state: r, hash: i }),
        /* @__PURE__ */ d.jsx(Yb, { lines: Dt }),
        /* @__PURE__ */ d.jsx("span", { className: "dock-links", children: /* @__PURE__ */ d.jsx("a", { href: "https://kieransimkin.co.uk/my-songs/", target: "_blank", rel: "noopener", children: "Kieran Simkin · My Songs ↗" }) })
      ] })
    }
  );
}
function Gb() {
  const i = M0?.value?.trim() || "", f = O0?.value || "", r = z0?.value || "";
  return { ...Eo, bpm: i ? Number(i) : null, lyrics: f.trim() || null, lyric_timing: r.trim() || [] };
}
function Xb(i) {
  return Number.isFinite(Number(i.bpm)) || !!i.lyrics || !!(typeof i.lyric_timing == "string" && i.lyric_timing.trim()) || !!(Array.isArray(i.lyric_timing) && i.lyric_timing.length);
}
async function Vb(i) {
  const f = Gb();
  if (!Xb(f)) return;
  const r = await fetch(`/api/${i}/canonical`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) }), s = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(s.detail || `Could not save canonical metadata (${r.status})`);
  _o.textContent = "Known information saved with this song hash.";
}
function Qb(i) {
  return new Promise((f, r) => {
    const s = new XMLHttpRequest();
    s.open("PUT", `/upload/${encodeURIComponent(i.name)}`), s.setRequestHeader("Content-Type", i.type || "application/octet-stream"), s.upload.onprogress = (m) => {
      x0.classList.remove("hidden");
      const h = m.lengthComputable ? m.loaded / m.total : 0;
      Oc.style.width = `${Math.round(h * 100)}%`, zc.textContent = m.lengthComputable ? `${Math.round(h * 100)}% · ${(m.loaded / 1048576).toFixed(1)} / ${(m.total / 1048576).toFixed(1)} MiB` : `${(m.loaded / 1048576).toFixed(1)} MiB uploaded`;
    }, s.onerror = () => r(new Error("Upload failed")), s.onload = () => {
      let m = {};
      try {
        m = JSON.parse(s.responseText);
      } catch {
      }
      s.status < 200 || s.status >= 300 ? r(new Error(m.detail || `Upload failed (${s.status})`)) : f(m);
    }, s.send(i);
  });
}
async function C0(i, f) {
  Ab.classList.add("hidden"), Mo.classList.remove("hidden"), Rb.render(/* @__PURE__ */ d.jsx(qb, { hash: i, filename: f || "uploaded audio" }, i));
}
async function j0(i) {
  if (i) {
    Oc.style.width = "0%", zc.textContent = `Uploading ${i.name}`, x0.classList.remove("hidden");
    try {
      const f = await Qb(i);
      Oc.style.width = "100%", zc.textContent = "Upload complete · attaching to analysis", await Vb(f.hash), await C0(f.hash, f.filename || i.name);
    } catch (f) {
      zc.textContent = f.message, Oc.style.width = "0%";
    }
  }
}
async function w0(i) {
  i?.preventDefault(), i?.stopPropagation();
  try {
    const f = await fetch("/assets/arcadians-reference.json", { cache: "no-store" });
    if (!f.ok) throw new Error(`Could not load Arcadians reference (${f.status})`);
    const r = await f.json();
    Eo = {};
    for (const s of ["title", "artist", "release_date", "isrc", "upc", "website", "my_songs_url", "epk_url", "cover_art_url", "source_url", "sections"])
      r[s] !== void 0 && r[s] !== null && (Eo[s] = r[s]);
    M0.value = r.bpm ?? "", O0.value = r.lyrics ?? "", z0.value = Array.isArray(r.lyric_timing) && r.lyric_timing.length ? JSON.stringify(r.lyric_timing, null, 2) : "", je(".known-info").open = !0, _o.textContent = r.lyric_timing?.length ? `Loaded ${r.title || "Arcadians"}: canonical release metadata, sections, ${r.bpm} BPM, lyrics and timing.` : `Loaded ${r.title || "Arcadians"} canonical reference metadata.`;
  } catch (f) {
    _o.textContent = f.message;
  }
}
N0.addEventListener("click", (i) => {
  i.stopPropagation(), Wu.click();
});
Wu.addEventListener("change", () => {
  j0(Wu.files?.[0]);
});
en.addEventListener("click", (i) => {
  i.target !== N0 && !i.target.closest(".known-info") && Wu.click();
});
en.addEventListener("keydown", (i) => {
  (i.key === "Enter" || i.key === " ") && Wu.click();
});
for (const i of ["dragenter", "dragover"]) en.addEventListener(i, (f) => {
  f.preventDefault(), en.classList.add("dragging");
});
for (const i of ["dragleave", "drop"]) en.addEventListener(i, (f) => {
  f.preventDefault(), en.classList.remove("dragging");
});
en.addEventListener("drop", (i) => {
  j0(i.dataTransfer?.files?.[0]);
});
Cb?.addEventListener("click", w0);
jb?.addEventListener("click", w0);
const ho = new URLSearchParams(location.search).get("hash");
ho && /^[0-9a-f]{64}$/i.test(ho) && C0(ho.toLowerCase(), "Existing analysis");
export {
  xa as formatTimelineTime
};
