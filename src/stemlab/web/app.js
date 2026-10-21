var Pr = { exports: {} }, Yu = {};
var Vh;
function py() {
  if (Vh) return Yu;
  Vh = 1;
  var c = /* @__PURE__ */ Symbol.for("react.transitional.element"), o = /* @__PURE__ */ Symbol.for("react.fragment");
  function r(s, h, m) {
    var y = null;
    if (m !== void 0 && (y = "" + m), h.key !== void 0 && (y = "" + h.key), "key" in h) {
      m = {};
      for (var _ in h)
        _ !== "key" && (m[_] = h[_]);
    } else m = h;
    return h = m.ref, {
      $$typeof: c,
      type: s,
      key: y,
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
  var c = /* @__PURE__ */ Symbol.for("react.transitional.element"), o = /* @__PURE__ */ Symbol.for("react.portal"), r = /* @__PURE__ */ Symbol.for("react.fragment"), s = /* @__PURE__ */ Symbol.for("react.strict_mode"), h = /* @__PURE__ */ Symbol.for("react.profiler"), m = /* @__PURE__ */ Symbol.for("react.consumer"), y = /* @__PURE__ */ Symbol.for("react.context"), _ = /* @__PURE__ */ Symbol.for("react.forward_ref"), C = /* @__PURE__ */ Symbol.for("react.suspense"), A = /* @__PURE__ */ Symbol.for("react.memo"), N = /* @__PURE__ */ Symbol.for("react.lazy"), v = /* @__PURE__ */ Symbol.for("react.activity"), j = /* @__PURE__ */ Symbol.for("react.view_transition"), B = Symbol.iterator;
  function P(p) {
    return p === null || typeof p != "object" ? null : (p = B && p[B] || p["@@iterator"], typeof p == "function" ? p : null);
  }
  var Y = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, $ = Object.assign, dt = {};
  function V(p, H, I) {
    this.props = p, this.context = H, this.refs = dt, this.updater = I || Y;
  }
  V.prototype.isReactComponent = {}, V.prototype.setState = function(p, H) {
    if (typeof p != "object" && typeof p != "function" && p != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, p, H, "setState");
  }, V.prototype.forceUpdate = function(p) {
    this.updater.enqueueForceUpdate(this, p, "forceUpdate");
  };
  function Q() {
  }
  Q.prototype = V.prototype;
  function zt(p, H, I) {
    this.props = p, this.context = H, this.refs = dt, this.updater = I || Y;
  }
  var St = zt.prototype = new Q();
  St.constructor = zt, $(St, V.prototype), St.isPureReactComponent = !0;
  var Rt = Array.isArray;
  function J() {
  }
  var st = { H: null, A: null, T: null, S: null }, It = Object.prototype.hasOwnProperty;
  function ut(p, H, I) {
    var et = I.ref;
    return {
      $$typeof: c,
      type: p,
      key: H,
      ref: et !== void 0 ? et : null,
      props: I
    };
  }
  function rt(p, H) {
    return ut(p.type, H, p.props);
  }
  function mt(p) {
    return typeof p == "object" && p !== null && p.$$typeof === c;
  }
  function Ut(p) {
    var H = { "=": "=0", ":": "=2" };
    return "$" + p.replace(/[=:]/g, function(I) {
      return H[I];
    });
  }
  var _t = /\/+/g;
  function Nt(p, H) {
    return typeof p == "object" && p !== null && p.key != null ? Ut("" + p.key) : H.toString(36);
  }
  function q(p) {
    switch (p.status) {
      case "fulfilled":
        return p.value;
      case "rejected":
        throw p.reason;
      default:
        switch (typeof p.status == "string" ? p.then(J, J) : (p.status = "pending", p.then(
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
  function G(p, H, I, et, ht) {
    var yt = typeof p;
    (yt === "undefined" || yt === "boolean") && (p = null);
    var ft = !1;
    if (p === null) ft = !0;
    else
      switch (yt) {
        case "bigint":
        case "string":
        case "number":
          ft = !0;
          break;
        case "object":
          switch (p.$$typeof) {
            case c:
            case o:
              ft = !0;
              break;
            case N:
              return ft = p._init, G(
                ft(p._payload),
                H,
                I,
                et,
                ht
              );
          }
      }
    if (ft)
      return ht = ht(p), ft = et === "" ? "." + Nt(p, 0) : et, Rt(ht) ? (I = "", ft != null && (I = ft.replace(_t, "$&/") + "/"), G(ht, H, I, "", function(ee) {
        return ee;
      })) : ht != null && (mt(ht) && (ht = rt(
        ht,
        I + (ht.key == null || p && p.key === ht.key ? "" : ("" + ht.key).replace(
          _t,
          "$&/"
        ) + "/") + ft
      )), H.push(ht)), 1;
    ft = 0;
    var K = et === "" ? "." : et + ":";
    if (Rt(p))
      for (var it = 0; it < p.length; it++)
        et = p[it], yt = K + Nt(et, it), ft += G(
          et,
          H,
          I,
          yt,
          ht
        );
    else if (it = P(p), typeof it == "function")
      for (p = it.call(p), it = 0; !(et = p.next()).done; )
        et = et.value, yt = K + Nt(et, it++), ft += G(
          et,
          H,
          I,
          yt,
          ht
        );
    else if (yt === "object") {
      if (typeof p.then == "function")
        return G(
          q(p),
          H,
          I,
          et,
          ht
        );
      throw H = String(p), Error(
        "Objects are not valid as a React child (found: " + (H === "[object Object]" ? "object with keys {" + Object.keys(p).join(", ") + "}" : H) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ft;
  }
  function L(p, H, I) {
    if (p == null) return p;
    var et = [], ht = 0;
    return G(p, et, "", "", function(yt) {
      return H.call(I, yt, ht++);
    }), et;
  }
  function k(p) {
    if (p._status === -1) {
      var H = p._result, I = H();
      I.then(
        function(et) {
          (p._status === 0 || p._status === -1) && (p._status = 1, p._result = et, I.status === void 0 && (I.status = "fulfilled", I.value = et));
        },
        function(et) {
          (p._status === 0 || p._status === -1) && (p._status = 2, p._result = et, I.status === void 0 && (I.status = "rejected", I.reason = et));
        }
      ), p._status === -1 && (p._status = 0, p._result = I);
    }
    if (p._status === 1) return p._result.default;
    throw p._result;
  }
  var at = typeof reportError == "function" ? reportError : function(p) {
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
  function Dt(p) {
    var H = st.T, I = {};
    I.types = H !== null ? H.types : null, st.T = I;
    try {
      var et = p(), ht = st.S;
      ht !== null && ht(I, et), typeof et == "object" && et !== null && typeof et.then == "function" && et.then(J, at);
    } catch (yt) {
      at(yt);
    } finally {
      H !== null && I.types !== null && (H.types = I.types), st.T = H;
    }
  }
  function Zt(p) {
    var H = st.T;
    if (H !== null) {
      var I = H.types;
      I === null ? H.types = [p] : I.indexOf(p) === -1 && I.push(p);
    } else Dt(Zt.bind(null, p));
  }
  var Jt = {
    map: L,
    forEach: function(p, H, I) {
      L(
        p,
        function() {
          H.apply(this, arguments);
        },
        I
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
      if (!mt(p))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return p;
    }
  };
  return gt.Activity = v, gt.Children = Jt, gt.Component = V, gt.Fragment = r, gt.Profiler = h, gt.PureComponent = zt, gt.StrictMode = s, gt.Suspense = C, gt.ViewTransition = j, gt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = st, gt.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(p) {
      return st.H.useMemoCache(p);
    }
  }, gt.addTransitionType = Zt, gt.cache = function(p) {
    return function() {
      return p.apply(null, arguments);
    };
  }, gt.cacheSignal = function() {
    return null;
  }, gt.cloneElement = function(p, H, I) {
    if (p == null)
      throw Error(
        "The argument must be a React element, but you passed " + p + "."
      );
    var et = $({}, p.props), ht = p.key;
    if (H != null)
      for (yt in H.key !== void 0 && (ht = "" + H.key), H)
        !It.call(H, yt) || yt === "key" || yt === "__self" || yt === "__source" || yt === "ref" && H.ref === void 0 || (et[yt] = H[yt]);
    var yt = arguments.length - 2;
    if (yt === 1) et.children = I;
    else if (1 < yt) {
      for (var ft = Array(yt), K = 0; K < yt; K++)
        ft[K] = arguments[K + 2];
      et.children = ft;
    }
    return ut(p.type, ht, et);
  }, gt.createContext = function(p) {
    return p = {
      $$typeof: y,
      _currentValue: p,
      _currentValue2: p,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, p.Provider = p, p.Consumer = {
      $$typeof: m,
      _context: p
    }, p;
  }, gt.createElement = function(p, H, I) {
    var et, ht = {}, yt = null;
    if (H != null)
      for (et in H.key !== void 0 && (yt = "" + H.key), H)
        It.call(H, et) && et !== "key" && et !== "__self" && et !== "__source" && (ht[et] = H[et]);
    var ft = arguments.length - 2;
    if (ft === 1) ht.children = I;
    else if (1 < ft) {
      for (var K = Array(ft), it = 0; it < ft; it++)
        K[it] = arguments[it + 2];
      ht.children = K;
    }
    if (p && p.defaultProps)
      for (et in ft = p.defaultProps, ft)
        ht[et] === void 0 && (ht[et] = ft[et]);
    return ut(p, yt, ht);
  }, gt.createRef = function() {
    return { current: null };
  }, gt.forwardRef = function(p) {
    return { $$typeof: _, render: p };
  }, gt.isValidElement = mt, gt.lazy = function(p) {
    return {
      $$typeof: N,
      _payload: { _status: -1, _result: p },
      _init: k
    };
  }, gt.memo = function(p, H) {
    return {
      $$typeof: A,
      type: p,
      compare: H === void 0 ? null : H
    };
  }, gt.startTransition = Dt, gt.unstable_useCacheRefresh = function() {
    return st.H.useCacheRefresh();
  }, gt.use = function(p) {
    return st.H.use(p);
  }, gt.useActionState = function(p, H, I) {
    return st.H.useActionState(p, H, I);
  }, gt.useCallback = function(p, H) {
    return st.H.useCallback(p, H);
  }, gt.useContext = function(p) {
    return st.H.useContext(p);
  }, gt.useDebugValue = function() {
  }, gt.useDeferredValue = function(p, H) {
    return st.H.useDeferredValue(p, H);
  }, gt.useEffect = function(p, H) {
    return st.H.useEffect(p, H);
  }, gt.useEffectEvent = function(p) {
    return st.H.useEffectEvent(p);
  }, gt.useId = function() {
    return st.H.useId();
  }, gt.useImperativeHandle = function(p, H, I) {
    return st.H.useImperativeHandle(p, H, I);
  }, gt.useInsertionEffect = function(p, H) {
    return st.H.useInsertionEffect(p, H);
  }, gt.useLayoutEffect = function(p, H) {
    return st.H.useLayoutEffect(p, H);
  }, gt.useMemo = function(p, H) {
    return st.H.useMemo(p, H);
  }, gt.useOptimistic = function(p, H) {
    return st.H.useOptimistic(p, H);
  }, gt.useReducer = function(p, H, I) {
    return st.H.useReducer(p, H, I);
  }, gt.useRef = function(p) {
    return st.H.useRef(p);
  }, gt.useState = function(p) {
    return st.H.useState(p);
  }, gt.useSyncExternalStore = function(p, H, I) {
    return st.H.useSyncExternalStore(
      p,
      H,
      I
    );
  }, gt.useTransition = function() {
    return st.H.useTransition();
  }, gt.version = "19.3.0", gt;
}
var Kh;
function gf() {
  return Kh || (Kh = 1, tf.exports = _y()), tf.exports;
}
var D = gf(), ef = { exports: {} }, qu = {}, lf = { exports: {} }, af = {};
var Jh;
function Ey() {
  return Jh || (Jh = 1, (function(c) {
    function o(q, G) {
      var L = q.length;
      q.push(G);
      t: for (; 0 < L; ) {
        var k = L - 1 >>> 1, at = q[k];
        if (0 < h(at, G))
          q[k] = G, q[L] = at, L = k;
        else break t;
      }
    }
    function r(q) {
      return q.length === 0 ? null : q[0];
    }
    function s(q) {
      if (q.length === 0) return null;
      var G = q[0], L = q.pop();
      if (L !== G) {
        q[0] = L;
        t: for (var k = 0, at = q.length, Dt = at >>> 1; k < Dt; ) {
          var Zt = 2 * (k + 1) - 1, Jt = q[Zt], p = Zt + 1, H = q[p];
          if (0 > h(Jt, L))
            p < at && 0 > h(H, Jt) ? (q[k] = H, q[p] = L, k = p) : (q[k] = Jt, q[Zt] = L, k = Zt);
          else if (p < at && 0 > h(H, L))
            q[k] = H, q[p] = L, k = p;
          else break t;
        }
      }
      return G;
    }
    function h(q, G) {
      var L = q.sortIndex - G.sortIndex;
      return L !== 0 ? L : q.id - G.id;
    }
    if (c.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var m = performance;
      c.unstable_now = function() {
        return m.now();
      };
    } else {
      var y = Date, _ = y.now();
      c.unstable_now = function() {
        return y.now() - _;
      };
    }
    var C = [], A = [], N = 1, v = null, j = 3, B = !1, P = !1, Y = !1, $ = !1, dt = typeof setTimeout == "function" ? setTimeout : null, V = typeof clearTimeout == "function" ? clearTimeout : null, Q = typeof setImmediate < "u" ? setImmediate : null;
    function zt(q) {
      for (var G = r(A); G !== null; ) {
        if (G.callback === null) s(A);
        else if (G.startTime <= q)
          s(A), G.sortIndex = G.expirationTime, o(C, G);
        else break;
        G = r(A);
      }
    }
    function St(q) {
      if (Y = !1, zt(q), !P)
        if (r(C) !== null)
          P = !0, Rt || (Rt = !0, mt());
        else {
          var G = r(A);
          G !== null && Nt(St, G.startTime - q);
        }
    }
    var Rt = !1, J = -1, st = 5, It = -1;
    function ut() {
      return $ ? !0 : !(c.unstable_now() - It < st);
    }
    function rt() {
      if ($ = !1, Rt) {
        var q = c.unstable_now();
        It = q;
        var G = !0;
        try {
          t: {
            P = !1, Y && (Y = !1, V(J), J = -1), B = !0;
            var L = j;
            try {
              e: {
                for (zt(q), v = r(C); v !== null && !(v.expirationTime > q && ut()); ) {
                  var k = v.callback;
                  if (typeof k == "function") {
                    v.callback = null, j = v.priorityLevel;
                    var at = k(
                      v.expirationTime <= q
                    );
                    if (q = c.unstable_now(), typeof at == "function") {
                      v.callback = at, zt(q), G = !0;
                      break e;
                    }
                    v === r(C) && s(C), zt(q);
                  } else s(C);
                  v = r(C);
                }
                if (v !== null) G = !0;
                else {
                  var Dt = r(A);
                  Dt !== null && Nt(
                    St,
                    Dt.startTime - q
                  ), G = !1;
                }
              }
              break t;
            } finally {
              v = null, j = L, B = !1;
            }
            G = void 0;
          }
        } finally {
          G ? mt() : Rt = !1;
        }
      }
    }
    var mt;
    if (typeof Q == "function")
      mt = function() {
        Q(rt);
      };
    else if (typeof MessageChannel < "u") {
      var Ut = new MessageChannel(), _t = Ut.port2;
      Ut.port1.onmessage = rt, mt = function() {
        _t.postMessage(null);
      };
    } else
      mt = function() {
        dt(rt, 0);
      };
    function Nt(q, G) {
      J = dt(function() {
        q(c.unstable_now());
      }, G);
    }
    c.unstable_IdlePriority = 5, c.unstable_ImmediatePriority = 1, c.unstable_LowPriority = 4, c.unstable_NormalPriority = 3, c.unstable_Profiling = null, c.unstable_UserBlockingPriority = 2, c.unstable_cancelCallback = function(q) {
      q.callback = null;
    }, c.unstable_forceFrameRate = function(q) {
      0 > q || 125 < q ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : st = 0 < q ? Math.floor(1e3 / q) : 5;
    }, c.unstable_getCurrentPriorityLevel = function() {
      return j;
    }, c.unstable_next = function(q) {
      switch (j) {
        case 1:
        case 2:
        case 3:
          var G = 3;
          break;
        default:
          G = j;
      }
      var L = j;
      j = G;
      try {
        return q();
      } finally {
        j = L;
      }
    }, c.unstable_requestPaint = function() {
      $ = !0;
    }, c.unstable_runWithPriority = function(q, G) {
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
        return G();
      } finally {
        j = L;
      }
    }, c.unstable_scheduleCallback = function(q, G, L) {
      var k = c.unstable_now();
      switch (typeof L == "object" && L !== null ? (L = L.delay, L = typeof L == "number" && 0 < L ? k + L : k) : L = k, q) {
        case 1:
          var at = -1;
          break;
        case 2:
          at = 250;
          break;
        case 5:
          at = 1073741823;
          break;
        case 4:
          at = 1e4;
          break;
        default:
          at = 5e3;
      }
      return at = L + at, q = {
        id: N++,
        callback: G,
        priorityLevel: q,
        startTime: L,
        expirationTime: at,
        sortIndex: -1
      }, L > k ? (q.sortIndex = L, o(A, q), r(C) === null && q === r(A) && (Y ? (V(J), J = -1) : Y = !0, Nt(St, L - k))) : (q.sortIndex = at, o(C, q), P || B || (P = !0, Rt || (Rt = !0, mt()))), q;
    }, c.unstable_shouldYield = ut, c.unstable_wrapCallback = function(q) {
      var G = j;
      return function() {
        var L = j;
        j = G;
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
var nf = { exports: {} }, Ne = {};
var kh;
function Ny() {
  if (kh) return Ne;
  kh = 1;
  var c = gf();
  function o(N) {
    var v = "https://react.dev/errors/" + N;
    if (1 < arguments.length) {
      v += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var j = 2; j < arguments.length; j++)
        v += "&args[]=" + encodeURIComponent(arguments[j]);
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
  }, h = /* @__PURE__ */ Symbol.for("react.portal"), m = /* @__PURE__ */ Symbol.for("react.recoverable"), y = /* @__PURE__ */ Symbol.for("react.optimistic_key");
  function _(N, v, j) {
    var B = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: h,
      key: B == null ? null : B === y ? y : "" + B,
      children: N,
      containerInfo: v,
      implementation: j
    };
  }
  var C = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function A(N, v) {
    if (N === "font") return "";
    if (typeof v == "string")
      return v === "use-credentials" ? v : "";
  }
  return Ne.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, Ne.browser = function(N) {
    return { $$typeof: m, _reason: N };
  }, Ne.createPortal = function(N, v) {
    var j = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!v || v.nodeType !== 1 && v.nodeType !== 9 && v.nodeType !== 11)
      throw Error(o(299));
    return _(N, v, null, j);
  }, Ne.flushSync = function(N) {
    var v = C.T, j = s.p;
    try {
      if (C.T = null, s.p = 2, N) return N();
    } finally {
      C.T = v, s.p = j, s.d.f();
    }
  }, Ne.preconnect = function(N, v) {
    typeof N == "string" && (v ? (v = v.crossOrigin, v = typeof v == "string" ? v === "use-credentials" ? v : "" : void 0) : v = null, s.d.C(N, v));
  }, Ne.prefetchDNS = function(N) {
    typeof N == "string" && s.d.D(N);
  }, Ne.preinit = function(N, v) {
    if (typeof N == "string" && v && typeof v.as == "string") {
      var j = v.as, B = A(j, v.crossOrigin), P = typeof v.integrity == "string" ? v.integrity : void 0, Y = typeof v.fetchPriority == "string" ? v.fetchPriority : void 0;
      j === "style" ? s.d.S(
        N,
        typeof v.precedence == "string" ? v.precedence : void 0,
        {
          crossOrigin: B,
          integrity: P,
          fetchPriority: Y
        }
      ) : j === "script" && s.d.X(N, {
        crossOrigin: B,
        integrity: P,
        fetchPriority: Y,
        nonce: typeof v.nonce == "string" ? v.nonce : void 0
      });
    }
  }, Ne.preinitModule = function(N, v) {
    if (typeof N == "string")
      if (typeof v == "object" && v !== null) {
        if (v.as == null || v.as === "script") {
          var j = A(
            v.as,
            v.crossOrigin
          );
          s.d.M(N, {
            crossOrigin: j,
            integrity: typeof v.integrity == "string" ? v.integrity : void 0,
            nonce: typeof v.nonce == "string" ? v.nonce : void 0,
            fetchPriority: typeof v.fetchPriority == "string" ? v.fetchPriority : void 0
          });
        }
      } else v == null && s.d.M(N);
  }, Ne.preload = function(N, v) {
    if (typeof N == "string" && typeof v == "object" && v !== null && typeof v.as == "string") {
      var j = v.as, B = A(j, v.crossOrigin);
      s.d.L(N, j, {
        crossOrigin: B,
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
  }, Ne.preloadModule = function(N, v) {
    if (typeof N == "string")
      if (v) {
        var j = A(v.as, v.crossOrigin);
        s.d.m(N, {
          as: typeof v.as == "string" && v.as !== "script" ? v.as : void 0,
          crossOrigin: j,
          integrity: typeof v.integrity == "string" ? v.integrity : void 0,
          nonce: typeof v.nonce == "string" ? v.nonce : void 0,
          fetchPriority: typeof v.fetchPriority == "string" ? v.fetchPriority : void 0
        });
      } else s.d.m(N);
  }, Ne.requestFormReset = function(N) {
    s.d.r(N);
  }, Ne.unstable_batchedUpdates = function(N, v) {
    return N(v);
  }, Ne.useFormState = function(N, v, j) {
    return C.H.useFormState(N, v, j);
  }, Ne.useFormStatus = function() {
    return C.H.useHostTransitionStatus();
  }, Ne.version = "19.3.0", Ne;
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
  function y(t) {
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
  function B(t) {
    var e = !1;
    for (t = t.return; t !== null && (t.tag === 4 && (e = !0), !(t.tag === 3 || t.tag === 5 || t.tag === 27)); )
      t = t.return;
    return e;
  }
  function P(t) {
    var e = [null, null], l = j(t);
    return l === null || Y(
      e,
      t,
      l.child,
      { foundSelf: !1 }
    ), e;
  }
  function Y(t, e, l, a) {
    for (; l !== null; ) {
      if (l === e) a.foundSelf = !0;
      else if (l.tag === 5 || l.tag === 27 || l.tag === 6) {
        if (a.foundSelf) return t[1] = l, !0;
        t[0] = l;
      } else if ((l.tag !== 22 || l.memoizedState === null) && Y(
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
  var dt = null, V = null;
  function Q(t, e, l) {
    return t === l ? !0 : t === e ? (dt = t, !0) : !1;
  }
  function zt(t, e, l) {
    return t === l ? (V = t, !1) : t === e ? (V !== null && (dt = t), !0) : !1;
  }
  function St(t) {
    if (t === null) return null;
    do
      t = t === null ? null : t.return;
    while (t && t.tag !== 5 && t.tag !== 27 && t.tag !== 3);
    return t || null;
  }
  function Rt(t, e, l) {
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
  var J = Object.assign, st = /* @__PURE__ */ Symbol.for("react.element"), It = /* @__PURE__ */ Symbol.for("react.transitional.element"), ut = /* @__PURE__ */ Symbol.for("react.portal"), rt = /* @__PURE__ */ Symbol.for("react.fragment"), mt = /* @__PURE__ */ Symbol.for("react.strict_mode"), Ut = /* @__PURE__ */ Symbol.for("react.profiler"), _t = /* @__PURE__ */ Symbol.for("react.consumer"), Nt = /* @__PURE__ */ Symbol.for("react.context"), q = /* @__PURE__ */ Symbol.for("react.forward_ref"), G = /* @__PURE__ */ Symbol.for("react.suspense"), L = /* @__PURE__ */ Symbol.for("react.suspense_list"), k = /* @__PURE__ */ Symbol.for("react.memo"), at = /* @__PURE__ */ Symbol.for("react.lazy"), Dt = /* @__PURE__ */ Symbol.for("react.activity"), Zt = /* @__PURE__ */ Symbol.for("react.legacy_hidden"), Jt = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), p = /* @__PURE__ */ Symbol.for("react.view_transition"), H = /* @__PURE__ */ Symbol.for("react.recoverable"), I = Symbol.iterator;
  function et(t) {
    return t === null || typeof t != "object" ? null : (t = I && t[I] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var ht = /* @__PURE__ */ Symbol.for("react.client.reference");
  function yt(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === ht ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case rt:
        return "Fragment";
      case Ut:
        return "Profiler";
      case mt:
        return "StrictMode";
      case G:
        return "Suspense";
      case L:
        return "SuspenseList";
      case Dt:
        return "Activity";
      case p:
        return "ViewTransition";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case ut:
          return "Portal";
        case Nt:
          return t.displayName || "Context";
        case _t:
          return (t._context.displayName || "Context") + ".Consumer";
        case q:
          var e = t.render;
          return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case k:
          return e = t.displayName || null, e !== null ? e : yt(t.type) || "Memo";
        case at:
          e = t._payload, t = t._init;
          try {
            return yt(t(e));
          } catch {
          }
      }
    return null;
  }
  var ft = Array.isArray, K = o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, it = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ee = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ye = [], Bt = -1;
  function $t(t) {
    return { current: t };
  }
  function qt(t) {
    0 > Bt || (t.current = ye[Bt], ye[Bt] = null, Bt--);
  }
  function xt(t, e) {
    Bt++, ye[Bt] = t.current, t.current = e;
  }
  var X = $t(null), nt = $t(null), Ct = $t(null), je = $t(null);
  function ie(t, e) {
    switch (xt(Ct, e), xt(nt, t), xt(X, null), e.nodeType) {
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
    qt(X), xt(X, t);
  }
  function Ht() {
    qt(X), qt(nt), qt(Ct);
  }
  function Ol(t) {
    var e = t.memoizedState;
    e !== null && (qn._currentValue = e.memoizedState, xt(je, t)), e = X.current;
    var l = Pm(e, t.type);
    e !== l && (xt(nt, t), xt(X, l));
  }
  function Vl(t) {
    nt.current === t && (qt(X), qt(nt)), je.current === t && (qt(je), qn._currentValue = ee);
  }
  var _a, Ea;
  function Re(t) {
    if (_a === void 0)
      try {
        throw Error();
      } catch (l) {
        var e = l.stack.trim().match(/\n( *(at )?)/);
        _a = e && e[1] || "", Ea = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + _a + t + Ea;
  }
  var Ta = !1;
  function ml(t, e) {
    if (!t || Ta) return "";
    Ta = !0;
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
                } catch (Z) {
                  var S = Z;
                }
                Reflect.construct(t, [], U);
              } else {
                try {
                  U.call();
                } catch (Z) {
                  S = Z;
                }
                U = !1;
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
                  }), U = !0, new t();
                } finally {
                  U && (O !== void 0 ? Object.defineProperty(t.prototype, "props", O) : delete t.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (Z) {
                S = Z;
              }
              (U = t()) && typeof U.catch == "function" && U.catch(function() {
              });
            }
          } catch (Z) {
            if (Z && S && typeof Z.stack == "string")
              return [Z.stack, S.stack];
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
        var g = i.split(`
`), T = f.split(`
`);
        for (n = a = 0; a < g.length && !g[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; n < T.length && !T[n].includes(
          "DetermineComponentFrameRoot"
        ); )
          n++;
        if (a === g.length || n === T.length)
          for (a = g.length - 1, n = T.length - 1; 1 <= a && 0 <= n && g[a] !== T[n]; )
            n--;
        for (; 1 <= a && 0 <= n; a--, n--)
          if (g[a] !== T[n]) {
            if (a !== 1 || n !== 1)
              do
                if (a--, n--, 0 > n || g[a] !== T[n]) {
                  var z = `
` + g[a].replace(" at new ", " at ");
                  return t.displayName && z.includes("<anonymous>") && (z = z.replace("<anonymous>", t.displayName)), z;
                }
              while (1 <= a && 0 <= n);
            break;
          }
      }
    } finally {
      Ta = !1, Error.prepareStackTrace = l;
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
        return ml(t.type, !1);
      case 11:
        return ml(t.type.render, !1);
      case 1:
        return ml(t.type, !0);
      case 31:
        return Re("Activity");
      case 30:
        return Re("ViewTransition");
      default:
        return "";
    }
  }
  function Ql(t) {
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
  var R = Object.prototype.hasOwnProperty, ot = c.unstable_scheduleCallback, x = c.unstable_cancelCallback, F = c.unstable_shouldYield, Et = c.unstable_requestPaint, vt = c.unstable_now, oe = c.unstable_getCurrentPriorityLevel, ne = c.unstable_ImmediatePriority, hl = c.unstable_UserBlockingPriority, Ju = c.unstable_NormalPriority, O0 = c.unstable_LowPriority, Ef = c.unstable_IdlePriority, z0 = c.log, C0 = c.unstable_setDisableYieldValue, Kn = null, Ye = null;
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
    var f = t.entanglements, g = t.expirationTimes, T = t.hiddenUpdates;
    for (l = i & ~l; 0 < l; ) {
      var z = 31 - qe(l), U = 1 << z;
      f[z] = 0, g[z] = -1;
      var S = T[z];
      if (S !== null)
        for (T[z] = null, z = 0; z < S.length; z++) {
          var O = S[z];
          O !== null && (O.lane &= -536870913);
        }
      l &= ~U;
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
    var t = it.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : Bh(t.type));
  }
  function Cf(t, e) {
    var l = it.p;
    try {
      return it.p = t, e();
    } finally {
      it.p = l;
    }
  }
  var zl = Math.random().toString(36).slice(2), be = "__reactFiber$" + zl, De = "__reactProps$" + zl, Pa = "__reactContainer$" + zl, Af = "__reactEvents$" + zl, U0 = "__reactListeners$" + zl, B0 = "__reactHandles$" + zl, jf = "__reactResources$" + zl, kn = "__reactMarker$" + zl, Iu = "__reactLoad$" + zl;
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
    ln(t, e), ln(t + "Capture", e);
  }
  function ln(t, e) {
    for (wf[t] = e, t = 0; t < e.length; t++)
      Df.add(e[t]);
  }
  var H0 = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Uf = {}, Bf = {};
  function L0(t) {
    return R.call(Bf, t) ? !0 : R.call(Uf, t) ? !1 : H0.test(t) ? Bf[t] = !0 : (Uf[t] = !0, !1);
  }
  var Lt = !1;
  function Hf() {
    var t = Lt;
    return Lt = !1, t;
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
  function Fe(t) {
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
        if (ft(a)) {
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
  function Vf(t, e, l) {
    var a = e.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? a ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "" : a ? t.setProperty(e, l) : typeof l != "number" || l === 0 || G0.has(e) ? e === "float" ? t.cssFloat = l : t[e] = ("" + l).trim() : t[e] = l + "px";
  }
  function Qf(t, e, l) {
    if (e != null && typeof e != "object")
      throw Error(s(62));
    if (t = t.style, l != null) {
      for (var a in l)
        !l.hasOwnProperty(a) || e != null && e.hasOwnProperty(a) || (a.indexOf("--") === 0 ? t.setProperty(a, "") : a === "float" ? t.cssFloat = "" : t[a] = "", Lt = !0);
      for (var n in e)
        a = e[n], e.hasOwnProperty(n) && l[n] !== a && (Vf(t, n, a), Lt = !0);
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
  function vl() {
  }
  var Dc = null;
  function wc(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var un = null, cn = null;
  function Zf(t) {
    var e = tn(t);
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
              'input[name="' + Fe(
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
          e = l.value, e != null && an(t, !!l.multiple, e, !1);
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
      if (Uc = !1, (un !== null || cn !== null) && (lc(), un && (e = un, t = cn, cn = un = null, Zf(e), t)))
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
  function Oe(t) {
    function e(l, a, n, u, i) {
      this._reactName = l, this._targetInst = n, this.type = a, this.nativeEvent = u, this.target = i, this.currentTarget = null;
      for (var f in t)
        t.hasOwnProperty(f) && (l = t[f], this[f] = l ? l(u) : u[f]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? ui : $f, this.isPropagationStopped = $f, this;
    }
    return J(e.prototype, {
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
  }, ii = Oe(Jl), Pn = J({}, Jl, { view: 0, detail: 0 }), Q0 = Oe(Pn), Lc, Yc, tu, ci = J({}, Pn, {
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
  }), kf = Oe(ci), Z0 = J({}, ci, { dataTransfer: 0 }), K0 = Oe(Z0), J0 = J({}, Pn, { relatedTarget: 0 }), qc = Oe(J0), $0 = J({}, Jl, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), k0 = Oe($0), F0 = J({}, Jl, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), W0 = Oe(F0), I0 = J({}, Jl, { data: 0 }), Ff = Oe(I0), P0 = {
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
  var av = J({}, Pn, {
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
  }), nv = Oe(av), uv = J({}, ci, {
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
  }), Wf = Oe(uv), iv = J({}, Jl, { submitter: 0 }), cv = Oe(iv), sv = J({}, Pn, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Gc
  }), rv = Oe(sv), fv = J({}, Jl, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), ov = Oe(fv), dv = J({}, ci, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), mv = Oe(dv), hv = J({}, Jl, {
    newState: 0,
    oldState: 0,
    source: 0
  }), vv = Oe(hv), gv = [9, 13, 27, 32], Xc = Al && "CompositionEvent" in window, eu = null;
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
  var sn = !1;
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
    if (sn)
      return t === "compositionend" || !Xc && eo(t, e) ? (t = Jf(), ai = Hc = Kl = null, sn = !1, t) : null;
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
      if (!R.call(e, n) || !Xe(t[n], e[n]))
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
  var Ov = Al && "documentMode" in document && 11 >= document.documentMode, rn = null, Jc = null, uu = null, $c = !1;
  function vo(t, e, l) {
    var a = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    $c || rn == null || rn !== Zc(a) || (a = rn, "selectionStart" in a && Kc(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
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
    ), t.push({ event: e, listeners: a }), e.target = rn)));
  }
  function Oa(t, e) {
    var l = {};
    return l[t.toLowerCase()] = e.toLowerCase(), l["Webkit" + t] = "webkit" + e, l["Moz" + t] = "moz" + e, l;
  }
  var fn = {
    animationend: Oa("Animation", "AnimationEnd"),
    animationiteration: Oa("Animation", "AnimationIteration"),
    animationstart: Oa("Animation", "AnimationStart"),
    transitionrun: Oa("Transition", "TransitionRun"),
    transitionstart: Oa("Transition", "TransitionStart"),
    transitioncancel: Oa("Transition", "TransitionCancel"),
    transitionend: Oa("Transition", "TransitionEnd")
  }, kc = {}, go = {};
  Al && (go = document.createElement("div").style, "AnimationEvent" in window || (delete fn.animationend.animation, delete fn.animationiteration.animation, delete fn.animationstart.animation), "TransitionEvent" in window || delete fn.transitionend.transition);
  function za(t) {
    if (kc[t]) return kc[t];
    if (!fn[t]) return t;
    var e = fn[t], l;
    for (l in e)
      if (e.hasOwnProperty(l) && l in go)
        return kc[t] = e[l];
    return t;
  }
  var yo = za("animationend"), bo = za("animationiteration"), po = za("animationstart"), zv = za("transitionrun"), Cv = za("transitionstart"), Av = za("transitioncancel"), So = za("transitionend"), _o = /* @__PURE__ */ new Map(), Fc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Fc.push("scrollEnd");
  function ul(t, e) {
    _o.set(t, e), Ma(e, [t]);
  }
  var jv = 0;
  function jl(t, e) {
    if (t.name != null && t.name !== "auto") return t.name;
    if (e.autoName !== null) return e.autoName;
    t = rl.identifierPrefix;
    var l = jv++;
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
  }, We = [], on = 0, Wc = 0;
  function fi() {
    for (var t = on, e = Wc = on = 0; e < t; ) {
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
  function oi(t, e, l, a) {
    We[on++] = t, We[on++] = e, We[on++] = l, We[on++] = a, Wc |= a, t.lanes |= a, t = t.alternate, t !== null && (t.lanes |= a);
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
  var dn = {};
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
        X.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (a) {
        case Dt:
          return t = we(31, l, e, n), t.elementType = Dt, t.lanes = u, t;
        case rt:
          return Aa(l.children, n, u, e);
        case mt:
          i = 8, n |= 24;
          break;
        case Ut:
          return t = we(12, l, e, n | 2), t.elementType = Ut, t.lanes = u, t;
        case G:
          return t = we(13, l, e, n), t.elementType = G, t.lanes = u, t;
        case L:
          return t = we(19, l, e, n), t.elementType = L, t.lanes = u, t;
        case Zt:
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
              case Nt:
                i = 10;
                break t;
              case _t:
                i = 9;
                break t;
              case q:
                i = 11;
                break t;
              case k:
                i = 14;
                break t;
              case at:
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
  function Ie(t, e) {
    if (typeof t == "object" && t !== null) {
      var l = Mo.get(t);
      return l !== void 0 ? l : (e = {
        value: t,
        source: e,
        stack: Ql(e)
      }, Mo.set(t, e), e);
    }
    return {
      value: t,
      source: e,
      stack: Ql(e)
    };
  }
  var mn = [], hn = 0, hi = null, iu = 0, Pe = [], tl = 0, $l = null, gl = 1, yl = "";
  function wl(t, e) {
    mn[hn++] = iu, mn[hn++] = hi, hi = t, iu = e;
  }
  function Oo(t, e, l) {
    Pe[tl++] = gl, Pe[tl++] = yl, Pe[tl++] = $l, $l = t;
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
    t.return !== null && (wl(t, 1), Oo(t, 1, 0));
  }
  function ls(t) {
    for (; t === hi; )
      hi = mn[--hn], mn[hn] = null, iu = mn[--hn], mn[hn] = null;
    for (; t === $l; )
      $l = Pe[--tl], Pe[tl] = null, yl = Pe[--tl], Pe[tl] = null, gl = Pe[--tl], Pe[tl] = null;
  }
  function zo(t, e) {
    Pe[tl++] = gl, Pe[tl++] = yl, Pe[tl++] = $l, gl = e.id, yl = e.overflow, $l = t;
  }
  var he = null, Ft = null, Tt = !1, kl = null, el = !1, as = Error(s(519));
  function Fl(t) {
    var e = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw cu(Ie(e, t)), as;
  }
  function Co(t) {
    var e = t.stateNode, l = t.type, a = t.memoizedProps;
    switch (e[be] = t, e[De] = a, l) {
      case "dialog":
        Ot("cancel", e), Ot("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        Ot("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Cu.length; l++)
          Ot(Cu[l], e);
        break;
      case "source":
        Ot("error", e);
        break;
      case "img":
      case "image":
      case "link":
        Ot("error", e), Ot("load", e);
        break;
      case "details":
        Ot("toggle", e);
        break;
      case "input":
        Ot("invalid", e), qf(
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
        Ot("invalid", e);
        break;
      case "textarea":
        Ot("invalid", e), Xf(e, a.value, a.defaultValue, a.children);
    }
    l = a.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || e.textContent === "" + l || a.suppressHydrationWarning === !0 || Fm(e.textContent, l) ? (a.popover != null && (Ot("beforetoggle", e), Ot("toggle", e)), a.onScroll != null && Ot("scroll", e), a.onScrollEnd != null && Ot("scrollend", e), a.onClick != null && (e.onclick = vl), e = !0) : e = !1, e || Fl(t, !0);
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
    if (!Tt) return gi(t), Tt = !0, !1;
    var e = t.tag, l;
    if ((l = e !== 3 && e !== 27) && ((l = e === 5) && (l = t.type, l = !(l !== "form" && l !== "button") || Dr(t.type, t.memoizedProps)), l = !l), l && Ft && Fl(t), gi(t), e === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      Ft = vh(t);
    } else if (e === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      Ft = vh(t);
    } else
      e === 27 ? (e = Ft, da(t.type) ? (t = Xr, Xr = null, Ft = t) : Ft = e) : Ft = he ? al(t.stateNode.nextSibling) : null;
    return !0;
  }
  function ja() {
    Ft = he = null, Tt = !1;
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
  var us = $t(null), Ra = null, Ul = null;
  function Wl(t, e, l) {
    xt(us, e._currentValue), e._currentValue = l;
  }
  function Bl(t) {
    t._currentValue = us.current, qt(us);
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
          for (var g = 0; g < e.length; g++)
            if (f.context === e[g]) {
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
      } else if (n === je.current) {
        if (i = n.alternate, i === null) throw Error(s(387));
        i.memoizedState.memoizedState !== n.memoizedState.memoizedState && (t !== null ? t.push(qn) : t = [qn]);
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
  function pe(t) {
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
    $$typeof: Nt,
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
  var fu = null, ss = 0, Ua = 0, gn = null;
  function Hv(t, e) {
    if (fu === null) {
      var l = fu = [];
      ss = 0, Ua = Nr(), gn = {
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
      gn !== null && (gn.status = "fulfilled");
      var t = fu;
      fu = null, Ua = 0, gn = null;
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
  var Do = K.S;
  K.S = function(t, e) {
    if (xm = vt(), typeof e == "object" && e !== null && typeof e.then == "function" && Hv(t, e), ru !== null)
      for (var l = wn; l !== null; )
        jo(l, ru), l = l.next;
    if (l = t.types, l !== null) {
      for (var a = wn; a !== null; )
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
  var Ba = $t(null);
  function rs() {
    var t = Ba.current;
    return t !== null ? t : kt.pooledCache;
  }
  function Si(t, e) {
    e === null ? xt(Ba, Ba.current) : xt(Ba, e.pool);
  }
  function wo() {
    var t = rs();
    return t === null ? null : { parent: ce._currentValue, pool: t };
  }
  var yn = Error(s(460)), fs = Error(s(474)), _i = Error(s(542)), Ei = { then: function() {
  } };
  function Uo(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function Bo(t, e, l) {
    switch (l = t[l], l === void 0 ? t.push(e) : l !== e && (e.then(vl, vl), e = l), e.status) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw t = e.reason, Lo(t), t === void 0 && !("reason" in e) ? Error(s(600)) : t;
      default:
        if (typeof e.status == "string") e.then(vl, vl);
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
            throw t = e.reason, Lo(t), t;
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
  function Ho() {
    if (La === null) throw Error(s(459));
    var t = La;
    return La = null, t;
  }
  function Lo(t) {
    if (t === yn || t === _i)
      throw Error(s(483));
  }
  var bn = null, ou = 0;
  function Ti(t) {
    var e = ou;
    return ou += 1, bn === null && (bn = []), Bo(bn, t, e);
  }
  function Il(t, e) {
    e = e.props.ref, t.ref = e !== void 0 ? e : null;
  }
  function Ni(t, e) {
    throw e.$$typeof === st ? Error(s(525)) : (t = Object.prototype.toString.call(e), Error(
      s(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t
      )
    ));
  }
  function Yo(t) {
    function e(E, b) {
      if (t) {
        var M = E.deletions;
        M === null ? (E.deletions = [b], E.flags |= 16) : M.push(b);
      }
    }
    function l(E, b) {
      if (!t) return null;
      for (; b !== null; )
        e(E, b), b = b.sibling;
      return null;
    }
    function a(E) {
      for (var b = /* @__PURE__ */ new Map(); E !== null; )
        E.key === null ? b.set(E.index, E) : b.set(E.key, E), E = E.sibling;
      return b;
    }
    function n(E, b) {
      return E = Dl(E, b), E.index = 0, E.sibling = null, E;
    }
    function u(E, b, M) {
      return E.index = M, t ? (M = E.alternate, M !== null ? (M = M.index, M < b ? (E.flags |= 2, b) : M) : (E.flags |= 134217730, b)) : (E.flags |= 1048576, b);
    }
    function i(E) {
      return t && E.alternate === null && (E.flags |= 134217730), E;
    }
    function f(E, b, M, w) {
      return b === null || b.tag !== 6 ? (b = ts(M, E.mode, w), b.return = E, b) : (b = n(b, M), b.return = E, b);
    }
    function g(E, b, M, w) {
      var W = M.type;
      return W === rt ? (E = z(
        E,
        b,
        M.props.children,
        w,
        M.key
      ), Il(E, M), E) : b !== null && (b.elementType === W || typeof W == "object" && W !== null && W.$$typeof === at && Ha(W) === b.type) ? (b = n(b, M.props), Il(b, M), b.return = E, b) : (b = mi(
        M.type,
        M.key,
        M.props,
        null,
        E.mode,
        w
      ), Il(b, M), b.return = E, b);
    }
    function T(E, b, M, w) {
      return b === null || b.tag !== 4 || b.stateNode.containerInfo !== M.containerInfo || b.stateNode.implementation !== M.implementation ? (b = es(M, E.mode, w), b.return = E, b) : (b = n(b, M.children || []), b.return = E, b);
    }
    function z(E, b, M, w, W) {
      return b === null || b.tag !== 7 ? (b = Aa(
        M,
        E.mode,
        w,
        W
      ), b.return = E, b) : (b = n(b, M), b.return = E, b);
    }
    function U(E, b, M) {
      if (typeof b == "string" && b !== "" || typeof b == "number" || typeof b == "bigint")
        return b = ts(
          "" + b,
          E.mode,
          M
        ), b.return = E, b;
      if (typeof b == "object" && b !== null) {
        switch (b.$$typeof) {
          case It:
            return M = mi(
              b.type,
              b.key,
              b.props,
              null,
              E.mode,
              M
            ), Il(M, b), M.return = E, M;
          case ut:
            return b = es(
              b,
              E.mode,
              M
            ), b.return = E, b;
          case at:
            return b = Ha(b), U(E, b, M);
        }
        if (ft(b) || et(b))
          return b = Aa(
            b,
            E.mode,
            M,
            null
          ), b.return = E, b;
        if (typeof b.then == "function")
          return U(E, Ti(b), M);
        if (b.$$typeof === Nt)
          return U(
            E,
            pi(E, b),
            M
          );
        Ni(E, b);
      }
      return null;
    }
    function S(E, b, M, w) {
      var W = b !== null ? b.key : null;
      if (typeof M == "string" && M !== "" || typeof M == "number" || typeof M == "bigint")
        return W !== null ? null : f(E, b, "" + M, w);
      if (typeof M == "object" && M !== null) {
        switch (M.$$typeof) {
          case It:
            return M.key === W ? g(E, b, M, w) : null;
          case ut:
            return M.key === W ? T(E, b, M, w) : null;
          case at:
            return M = Ha(M), S(E, b, M, w);
        }
        if (ft(M) || et(M))
          return W !== null ? null : z(E, b, M, w, null);
        if (typeof M.then == "function")
          return S(
            E,
            b,
            Ti(M),
            w
          );
        if (M.$$typeof === Nt)
          return S(
            E,
            b,
            pi(E, M),
            w
          );
        Ni(E, M);
      }
      return null;
    }
    function O(E, b, M, w, W) {
      if (typeof w == "string" && w !== "" || typeof w == "number" || typeof w == "bigint")
        return E = E.get(M) || null, f(b, E, "" + w, W);
      if (typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case It:
            return E = E.get(
              w.key === null ? M : w.key
            ) || null, g(b, E, w, W);
          case ut:
            return E = E.get(
              w.key === null ? M : w.key
            ) || null, T(b, E, w, W);
          case at:
            return w = Ha(w), O(
              E,
              b,
              M,
              w,
              W
            );
        }
        if (ft(w) || et(w))
          return E = E.get(M) || null, z(b, E, w, W, null);
        if (typeof w.then == "function")
          return O(
            E,
            b,
            M,
            Ti(w),
            W
          );
        if (w.$$typeof === Nt)
          return O(
            E,
            b,
            M,
            pi(b, w),
            W
          );
        Ni(b, w);
      }
      return null;
    }
    function Z(E, b, M, w) {
      for (var W = null, jt = null, lt = b, ct = b = 0, fe = null; lt !== null && ct < M.length; ct++) {
        lt.index > ct ? (fe = lt, lt = null) : fe = lt.sibling;
        var wt = S(
          E,
          lt,
          M[ct],
          w
        );
        if (wt === null) {
          lt === null && (lt = fe);
          break;
        }
        t && lt && wt.alternate === null && e(E, lt), b = u(wt, b, ct), jt === null ? W = wt : jt.sibling = wt, jt = wt, lt = fe;
      }
      if (ct === M.length)
        return l(E, lt), Tt && wl(E, ct), W;
      if (lt === null) {
        for (; ct < M.length; ct++)
          lt = U(E, M[ct], w), lt !== null && (b = u(
            lt,
            b,
            ct
          ), jt === null ? W = lt : jt.sibling = lt, jt = lt);
        return Tt && wl(E, ct), W;
      }
      for (lt = a(lt); ct < M.length; ct++)
        fe = O(
          lt,
          E,
          ct,
          M[ct],
          w
        ), fe !== null && (t && (wt = fe.alternate, wt !== null && lt.delete(wt.key === null ? ct : wt.key)), b = u(
          fe,
          b,
          ct
        ), jt === null ? W = fe : jt.sibling = fe, jt = fe);
      return t && lt.forEach(function(ya) {
        return e(E, ya);
      }), Tt && wl(E, ct), W;
    }
    function tt(E, b, M, w) {
      if (M == null) throw Error(s(151));
      for (var W = null, jt = null, lt = b, ct = b = 0, fe = null, wt = M.next(); lt !== null && !wt.done; ct++, wt = M.next()) {
        lt.index > ct ? (fe = lt, lt = null) : fe = lt.sibling;
        var ya = S(E, lt, wt.value, w);
        if (ya === null) {
          lt === null && (lt = fe);
          break;
        }
        t && lt && ya.alternate === null && e(E, lt), b = u(ya, b, ct), jt === null ? W = ya : jt.sibling = ya, jt = ya, lt = fe;
      }
      if (wt.done)
        return l(E, lt), Tt && wl(E, ct), W;
      if (lt === null) {
        for (; !wt.done; ct++, wt = M.next())
          wt = U(E, wt.value, w), wt !== null && (b = u(wt, b, ct), jt === null ? W = wt : jt.sibling = wt, jt = wt);
        return Tt && wl(E, ct), W;
      }
      for (lt = a(lt); !wt.done; ct++, wt = M.next())
        wt = O(lt, E, ct, wt.value, w), wt !== null && (t && (fe = wt.alternate, fe !== null && lt.delete(
          fe.key === null ? ct : fe.key
        )), b = u(wt, b, ct), jt === null ? W = wt : jt.sibling = wt, jt = wt);
      return t && lt.forEach(function(by) {
        return e(E, by);
      }), Tt && wl(E, ct), W;
    }
    function pt(E, b, M, w) {
      if (typeof M == "object" && M !== null && M.type === rt && M.key === null && M.props.ref === void 0 && (M = M.props.children), typeof M == "object" && M !== null) {
        switch (M.$$typeof) {
          case It:
            t: {
              for (var W = M.key; b !== null; ) {
                if (b.key === W) {
                  if (W = M.type, W === rt) {
                    if (b.tag === 7) {
                      l(
                        E,
                        b.sibling
                      ), w = n(
                        b,
                        M.props.children
                      ), Il(w, M), w.return = E, E = w;
                      break t;
                    }
                  } else if (b.elementType === W || typeof W == "object" && W !== null && W.$$typeof === at && Ha(W) === b.type) {
                    l(
                      E,
                      b.sibling
                    ), w = n(b, M.props), Il(w, M), w.return = E, E = w;
                    break t;
                  }
                  l(E, b);
                  break;
                } else e(E, b);
                b = b.sibling;
              }
              M.type === rt ? (w = Aa(
                M.props.children,
                E.mode,
                w,
                M.key
              ), Il(w, M), w.return = E, E = w) : (w = mi(
                M.type,
                M.key,
                M.props,
                null,
                E.mode,
                w
              ), Il(w, M), w.return = E, E = w);
            }
            return i(E);
          case ut:
            t: {
              for (W = M.key; b !== null; ) {
                if (b.key === W)
                  if (b.tag === 4 && b.stateNode.containerInfo === M.containerInfo && b.stateNode.implementation === M.implementation) {
                    l(
                      E,
                      b.sibling
                    ), w = n(b, M.children || []), w.return = E, E = w;
                    break t;
                  } else {
                    l(E, b);
                    break;
                  }
                else e(E, b);
                b = b.sibling;
              }
              w = es(M, E.mode, w), w.return = E, E = w;
            }
            return i(E);
          case at:
            return M = Ha(M), pt(
              E,
              b,
              M,
              w
            );
        }
        if (ft(M))
          return Z(
            E,
            b,
            M,
            w
          );
        if (et(M)) {
          if (W = et(M), typeof W != "function") throw Error(s(150));
          return M = W.call(M), tt(
            E,
            b,
            M,
            w
          );
        }
        if (typeof M.then == "function")
          return pt(
            E,
            b,
            Ti(M),
            w
          );
        if (M.$$typeof === Nt)
          return pt(
            E,
            b,
            pi(E, M),
            w
          );
        Ni(E, M);
      }
      return typeof M == "string" && M !== "" || typeof M == "number" || typeof M == "bigint" ? (M = "" + M, b !== null && b.tag === 6 ? (l(E, b.sibling), w = n(b, M), w.return = E, E = w) : (l(E, b), w = ts(M, E.mode, w), w.return = E, E = w), i(E)) : l(E, b);
    }
    return function(E, b, M, w) {
      try {
        ou = 0;
        var W = pt(
          E,
          b,
          M,
          w
        );
        return bn = null, W;
      } catch (lt) {
        if (lt === yn || lt === _i) throw lt;
        var jt = we(29, lt, null, E.mode);
        return jt.lanes = w, jt.return = E, jt;
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
    if (a = a.shared, (Yt & 2) !== 0) {
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
      var t = gn;
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
      var g = f, T = g.next;
      g.next = null, i === null ? u = T : i.next = T, i = g;
      var z = t.alternate;
      z !== null && (z = z.updateQueue, f = z.lastBaseUpdate, f !== i && (f === null ? z.firstBaseUpdate = T : f.next = T, z.lastBaseUpdate = g));
    }
    if (u !== null) {
      var U = n.baseState;
      i = 0, z = T = g = null, f = u;
      do {
        var S = f.lane & -536870913, O = S !== f.lane;
        if (O ? (At & S) === S : (a & S) === S) {
          S !== 0 && S === Ua && (hs = !0), z !== null && (z = z.next = {
            lane: 0,
            tag: f.tag,
            payload: f.payload,
            callback: null,
            next: null
          });
          t: {
            var Z = t, tt = f;
            S = e;
            var pt = l;
            switch (tt.tag) {
              case 1:
                if (Z = tt.payload, typeof Z == "function") {
                  U = Z.call(pt, U, S);
                  break t;
                }
                U = Z;
                break t;
              case 3:
                Z.flags = Z.flags & -65537 | 128;
              case 0:
                if (Z = tt.payload, S = typeof Z == "function" ? Z.call(pt, U, S) : Z, S == null) break t;
                U = J({}, U, S);
                break t;
              case 2:
                Pl = !0;
            }
          }
          S = f.callback, S !== null && (t.flags |= 64, O && (t.flags |= 8192), O = n.callbacks, O === null ? n.callbacks = [S] : O.push(S));
        } else
          O = {
            lane: S,
            tag: f.tag,
            payload: f.payload,
            callback: f.callback,
            next: null
          }, z === null ? (T = z = O, g = U) : z = z.next = O, i |= S;
        if (f = f.next, f === null) {
          if (f = n.shared.pending, f === null)
            break;
          O = f, f = O.next, O.next = null, n.lastBaseUpdate = O, n.shared.pending = null;
        }
      } while (!0);
      z === null && (g = U), n.baseState = g, n.firstBaseUpdate = T, n.lastBaseUpdate = z, u === null && (n.shared.lanes = 0), sa |= i, t.lanes = i, t.memoizedState = U;
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
  var la = $t(null), xi = $t(0);
  function Vo(t, e) {
    t = Gl, xt(xi, t), xt(la, e), Gl = t | e.baseLanes;
  }
  function vs() {
    xt(xi, Gl), xt(la, la.current);
  }
  function gs() {
    Gl = xi.current, qt(la), qt(xi);
  }
  var Se = $t(null), xe = null;
  function aa(t) {
    var e = t.alternate;
    xt(_e, _e.current & 1), xt(Se, t), xe === null && (e === null || la.current !== null || e.memoizedState !== null) && (xe = t);
  }
  function ys(t) {
    xt(_e, _e.current), xt(Se, t), xe === null && (xe = t);
  }
  function Qo(t) {
    t.tag === 22 ? (xt(_e, _e.current), xt(Se, t), xe === null && (xe = t)) : na();
  }
  function na() {
    xt(_e, _e.current), xt(Se, Se.current);
  }
  function Ve(t) {
    qt(Se), xe === t && (xe = null), qt(_e);
  }
  var _e = $t(0);
  function vu(t, e) {
    xt(Se, Se.current), xt(_e, e);
  }
  function bs(t) {
    qt(_e), qt(Se), xe === t && (xe = null);
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
  var Hl = 0, bt = null, Kt = null, se = null, Oi = !1, pn = !1, qa = !1, zi = 0, gu = 0, Sn = null, Yv = 0;
  function le() {
    throw Error(s(321));
  }
  function ps(t, e) {
    if (e === null) return !1;
    for (var l = 0; l < e.length && l < t.length; l++)
      if (!Xe(t[l], e[l])) return !1;
    return !0;
  }
  function Ss(t, e, l, a, n, u) {
    return Hl = u, bt = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, K.H = t === null || t.memoizedState === null ? Od : zd, qa = !1, u = l(a, n), qa = !1, pn && (u = Ko(
      e,
      l,
      a,
      n
    )), Zo(t), u;
  }
  function Zo(t) {
    K.H = Ui;
    var e = Kt !== null && Kt.next !== null;
    if (Hl = 0, se = Kt = bt = null, Oi = !1, gu = 0, Sn = null, e) throw Error(s(300));
    t === null || re || (t = t.dependencies, t !== null && bi(t) && (re = !0));
  }
  function Ko(t, e, l, a) {
    bt = t;
    var n = 0;
    do {
      if (pn && (Sn = null), gu = 0, pn = !1, 25 <= n) throw Error(s(301));
      if (n += 1, se = Kt = null, t.updateQueue != null) {
        var u = t.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      K.H = Jv, u = e(l, a);
    } while (pn);
    return u;
  }
  function qv() {
    var t = K.H, e = t.useState()[0];
    return e = typeof e.then == "function" ? yu(e) : e, t = t.useState()[0], (Kt !== null ? Kt.memoizedState : null) !== t && (bt.flags |= 1024), e;
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
    Hl = 0, se = Kt = bt = null, pn = !1, gu = zi = 0, Sn = null;
  }
  function ze() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return se === null ? bt.memoizedState = se = t : se = se.next = t, se;
  }
  function ue() {
    if (Kt === null) {
      var t = bt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Kt.next;
    var e = se === null ? bt.memoizedState : se.next;
    if (e !== null)
      se = e, Kt = t;
    else {
      if (t === null)
        throw bt.alternate === null ? Error(s(467)) : Error(s(310));
      Kt = t, t = {
        memoizedState: Kt.memoizedState,
        baseState: Kt.baseState,
        baseQueue: Kt.baseQueue,
        queue: Kt.queue,
        next: null
      }, se === null ? bt.memoizedState = se = t : se = se.next = t;
    }
    return se;
  }
  function Ci() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function yu(t) {
    var e = gu;
    return gu += 1, Sn === null && (Sn = []), t = Bo(Sn, t, e), e = bt, (se === null ? e.memoizedState : se.next) === null && (e = e.alternate, K.H = e === null || e.memoizedState === null ? Od : zd), t;
  }
  function Ai(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return yu(t);
      if (t.$$typeof === H) return;
      if (t.$$typeof === Nt) return pe(t);
    }
    throw Error(s(438, String(t)));
  }
  function Ns(t) {
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
    if (e == null && (e = { data: [], index: 0 }), l === null && (l = Ci(), bt.updateQueue = l), l.memoCache = e, l = e.data[e.index], l === void 0)
      for (l = e.data[e.index] = Array(t), a = 0; a < t; a++)
        l[a] = Jt;
    return e.index++, l;
  }
  function Ll(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function ji(t) {
    var e = ue();
    return xs(e, Kt, t);
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
      var f = i = null, g = null, T = e, z = !1;
      do {
        var U = T.lane & -536870913;
        if (U !== T.lane ? (At & U) === U : (Hl & U) === U) {
          var S = T.revertLane;
          if (S === 0)
            g !== null && (g = g.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: T.action,
              hasEagerState: T.hasEagerState,
              eagerState: T.eagerState,
              next: null
            }), U === Ua && (z = !0);
          else if ((Hl & S) === S) {
            T = T.next, S === Ua && (z = !0);
            continue;
          } else
            U = {
              lane: 0,
              revertLane: T.revertLane,
              gesture: null,
              action: T.action,
              hasEagerState: T.hasEagerState,
              eagerState: T.eagerState,
              next: null
            }, g === null ? (f = g = U, i = u) : g = g.next = U, bt.lanes |= S, sa |= S;
          U = T.action, qa && l(u, U), u = T.hasEagerState ? T.eagerState : l(u, U);
        } else
          S = {
            lane: U,
            revertLane: T.revertLane,
            gesture: T.gesture,
            action: T.action,
            hasEagerState: T.hasEagerState,
            eagerState: T.eagerState,
            next: null
          }, g === null ? (f = g = S, i = u) : g = g.next = S, bt.lanes |= U, sa |= U;
        T = T.next;
      } while (T !== null && T !== e);
      if (g === null ? i = u : g.next = f, !Xe(u, t.memoizedState) && (re = !0, z && (l = gn, l !== null)))
        throw l;
      t.memoizedState = u, t.baseState = i, t.baseQueue = g, a.lastRenderedState = u;
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
    var a = bt, n = ue(), u = Tt;
    if (u) {
      if (l === void 0) throw Error(s(407));
      l = l();
    } else l = e();
    var i = !Xe(
      (Kt || n).memoizedState,
      l
    );
    if (i && (n.memoizedState = l, re = !0), n = n.queue, Cs(Fo.bind(null, a, n, t), [
      t
    ]), t = n.getSnapshot !== e || i || se !== null && (se.memoizedState.tag & 1) !== 0, _n(
      t ? 9 : 8,
      { destroy: void 0 },
      ko.bind(null, a, n, l, e),
      null
    ), t) {
      if (a.flags |= 2048, kt === null) throw Error(s(349));
      u || (Hl & 127) !== 0 || $o(a, e, l);
    }
    return l;
  }
  function $o(t, e, l) {
    t.flags |= 16384, t = { getSnapshot: e, value: l }, e = bt.updateQueue, e === null ? (e = Ci(), bt.updateQueue = e, e.stores = [t]) : (l = e.stores, l === null ? e.stores = [t] : l.push(t));
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
    var e = ze();
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
      Kt,
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
      K.T !== null ? l(!0) : u.isTransition = !1, a(u), l = e.pending, l === null ? (u.next = e.pending = u, td(e, u)) : (u.next = l.next, e.pending = l.next = u);
    }
  }
  function td(t, e) {
    var l = e.action, a = e.payload, n = t.state;
    if (e.isTransition) {
      var u = K.T, i = {};
      i.types = u !== null ? u.types : null, K.T = i;
      try {
        var f = l(n, a), g = K.S;
        g !== null && g(i, f), ed(t, e, f);
      } catch (T) {
        zs(t, e, T);
      } finally {
        u !== null && i.types !== null && (u.types = i.types), K.T = u;
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
    if (Tt) {
      var l = kt.formState;
      if (l !== null) {
        t: {
          var a = bt;
          if (Tt) {
            if (Ft) {
              e: {
                for (var n = Ft, u = el; n.nodeType !== 8; ) {
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
                Ft = al(
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
    ), a.dispatch = l, a = Os(!1), u = ws.bind(
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
    var e = ue();
    return cd(e, Kt, t);
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
        throw i === yn ? _i : i;
      }
    else a = e;
    e = ue();
    var n = e.queue, u = n.dispatch;
    return l !== e.memoizedState && (bt.flags |= 2048, _n(
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
    var e = ue(), l = Kt;
    if (l !== null)
      return cd(e, l, t);
    ue(), e = e.memoizedState, l = ue();
    var a = l.queue.dispatch;
    return l.memoizedState = t, [e, a, !1];
  }
  function _n(t, e, l, a) {
    return t = { tag: t, create: l, deps: a, inst: e, next: null }, e = bt.updateQueue, e === null && (e = Ci(), bt.updateQueue = e), l = e.lastEffect, l === null ? e.lastEffect = t.next = t : (a = l.next, l.next = t, t.next = a, e.lastEffect = t), t;
  }
  function rd() {
    return ue().memoizedState;
  }
  function Ri(t, e, l, a) {
    var n = ze();
    bt.flags |= t, n.memoizedState = _n(
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
    Kt !== null && a !== null && ps(a, Kt.memoizedState.deps) ? n.memoizedState = _n(e, u, l, a) : (bt.flags |= t, n.memoizedState = _n(
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
    bt.flags |= 4;
    var e = bt.updateQueue;
    if (e === null)
      e = Ci(), bt.updateQueue = e, e.events = [t];
    else {
      var l = e.events;
      l === null ? e.events = [t] : l.push(t);
    }
  }
  function od(t) {
    var e = ue().memoizedState;
    return Vv({ ref: e, nextImpl: t }), function() {
      if ((Yt & 2) !== 0) throw Error(s(440));
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
    return l === void 0 || (Hl & 1073741824) !== 0 && (At & 261930) === 0 ? t.memoizedState = e : (t.memoizedState = l, t = Om(), bt.lanes |= t, sa |= t, l);
  }
  function bd(t, e, l, a) {
    return Xe(l, e) ? l : la.current !== null ? (t = js(t, l, a), Xe(t, e) || (re = !0), t) : (Hl & 106) === 0 || (Hl & 1073741824) !== 0 && (At & 261930) === 0 ? (re = !0, t.memoizedState = l) : (t = Om(), bt.lanes |= t, sa |= t, e);
  }
  function pd(t, e, l, a, n) {
    var u = it.p;
    it.p = u !== 0 && 8 > u ? u : 8;
    var i = K.T, f = {};
    f.types = i !== null ? i.types : null, K.T = f, ws(t, !1, e, l);
    try {
      var g = n(), T = K.S;
      if (T !== null && T(f, g), g !== null && typeof g == "object" && typeof g.then == "function") {
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
    } catch (U) {
      bu(
        t,
        e,
        { then: function() {
        }, status: "rejected", reason: U },
        Je()
      );
    } finally {
      it.p = u, i !== null && f.types !== null && (i.types = f.types), K.T = i;
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
  function Ds() {
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
            return oi(t, e, n, 0), kt === null && fi(), !1;
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
    return t === bt || e !== null && e === bt;
  }
  function xd(t, e) {
    pn = Oi = !0;
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
    readContext: pe,
    use: Ai,
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
    use: Ai,
    useCallback: function(t, e) {
      return ze().memoizedState = [
        t,
        e === void 0 ? null : e
      ], t;
    },
    useContext: pe,
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
      var l = ze();
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
      var a = ze();
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
        bt,
        t
      ), [a.memoizedState, t];
    },
    useRef: function(t) {
      var e = ze();
      return t = { current: t }, e.memoizedState = t;
    },
    useState: function(t) {
      t = Os(t);
      var e = t.queue, l = Nd.bind(null, bt, e);
      return e.dispatch = l, [t.memoizedState, l];
    },
    useDebugValue: As,
    useDeferredValue: function(t, e) {
      var l = ze();
      return js(l, t, e);
    },
    useTransition: function() {
      var t = Os(!1);
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
      if (Tt) {
        if (l === void 0)
          throw Error(s(407));
        l = l();
      } else {
        if (l = e(), kt === null)
          throw Error(s(349));
        (At & 127) !== 0 || $o(a, e, l);
      }
      n.memoizedState = l;
      var u = { value: l, getSnapshot: e };
      return n.queue = u, fd(Fo.bind(null, a, u, t), [
        t
      ]), a.flags |= 2048, _n(
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
      var t = ze(), e = kt.identifierPrefix;
      if (Tt) {
        var l = yl, a = gl;
        l = (a & ~(1 << 32 - qe(a) - 1)).toString(32) + l, e = "_" + e + "R_" + l, l = zi++, 0 < l && (e += "H" + l.toString(32)), e += "_";
      } else
        l = Yv++, e = "_" + e + "r_" + l.toString(32) + "_";
      return t.memoizedState = e;
    },
    useHostTransitionStatus: Ds,
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
      return e.queue = l, e = ws.bind(
        null,
        bt,
        !0,
        l
      ), l.dispatch = e, [t, e];
    },
    useMemoCache: Ns,
    useCacheRefresh: function() {
      return ze().memoizedState = Zv.bind(
        null,
        bt
      );
    },
    useEffectEvent: function(t) {
      var e = ze(), l = { impl: t };
      return e.memoizedState = l, function() {
        if ((Yt & 2) !== 0)
          throw Error(s(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, zd = {
    readContext: pe,
    use: Ai,
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
    useDebugValue: As,
    useDeferredValue: function(t, e) {
      var l = ue();
      return bd(
        l,
        Kt.memoizedState,
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
      return Po(l, Kt, t, e);
    },
    useMemoCache: Ns,
    useCacheRefresh: Td,
    useEffectEvent: od
  }, Jv = {
    readContext: pe,
    use: Ai,
    useCallback: gd,
    useContext: pe,
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
      return Kt === null ? js(l, t, e) : bd(
        l,
        Kt.memoizedState,
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
      return Kt !== null ? Po(l, Kt, t, e) : (l.baseState = t, [t, l.queue.dispatch]);
    },
    useMemoCache: Ns,
    useCacheRefresh: Td,
    useEffectEvent: od
  };
  function Us(t, e, l, a) {
    e = t.memoizedState, l = l(a, e), l = l == null ? e : J({}, e, l), t.memoizedState = l, t.lanes === 0 && (t.updateQueue.baseState = l);
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
      l === e && (l = J({}, l));
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
      ), l = Se.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
          case 19:
            return xe === null ? ac() : l.alternate === null && ae === 0 && (ae = 3), l.flags &= -257, l.flags |= 65536, l.lanes = n, a === Ei ? l.flags |= 16384 : (e = l.updateQueue, e === null ? l.updateQueue = /* @__PURE__ */ new Set([a]) : e.add(a), _r(t, a, n)), !1;
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
    if (Tt)
      return e = Se.current, e !== null ? ((e.flags & 65536) === 0 && (e.flags |= 256), e.flags |= 65536, e.lanes = n, a !== as && (t = Error(s(422), { cause: a }), cu(Ie(t, l)))) : (a !== as && (e = Error(s(423), {
        cause: a
      }), cu(
        Ie(e, l)
      )), t = t.current.alternate, t.flags |= 65536, n &= -n, t.lanes |= n, a = Ie(a, l), n = Hs(
        t.stateNode,
        a,
        n
      ), ms(t, n), ae !== 4 && (ae = 2)), !1;
    var u = Error(s(520), { cause: a });
    if (u = Ie(u, l), Mu === null ? Mu = [u] : Mu.push(u), ae !== 4 && (ae = 2), e === null) return !0;
    a = Ie(a, l), l = e;
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
  function de(t, e, l, a) {
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
    ), f = _s(), t !== null && !re ? (Es(t, e, n), Yl(t, e, n)) : (Tt && f && vi(e), e.flags |= 1, de(t, e, a, n), e.child);
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
      if (Tt) {
        if (a.mode === "hidden")
          return t = Hi(e, a), e.lanes = 536870912, t.memoizedState = { baseLanes: 0, cachePool: null }, pu(null, t);
        if (ys(e), (t = Ft) ? (t = hh(
          t,
          el
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: $l !== null ? { id: gl, overflow: yl } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = xo(t), l.return = e, e.child = l, he = e, Ft = null)) : t = null, t === null) throw Fl(e);
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
          if (a = kt, a !== null && (i = Of(a, l), i !== 0 && i !== u.retryLane))
            throw u.retryLane = i, Ca(t, i), Le(a, t, i), Ls;
          ac();
        }
        e = Xd(
          t,
          e,
          l
        );
      } else
        t = u.treeContext, Ft = al(i.nextSibling), he = e, Tt = !0, kl = null, el = !1, t !== null && zo(e, t), e = Hi(e, a), e.flags |= 134221824;
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
  function Ys(t, e, l, a, n) {
    return wa(e), l = Ss(
      t,
      e,
      l,
      a,
      void 0,
      n
    ), a = _s(), t !== null && !re ? (Es(t, e, n), Yl(t, e, n)) : (Tt && a && vi(e), e.flags |= 1, de(t, e, l, n), e.child);
  }
  function Vd(t, e, l, a, n, u) {
    return wa(e), e.updateQueue = null, l = Ko(
      e,
      a,
      l,
      n
    ), Zo(t), a = _s(), t !== null && !re ? (Es(t, e, u), Yl(t, e, u)) : (Tt && a && vi(e), e.flags |= 1, de(t, e, l, u), e.child);
  }
  function Qd(t, e, l, a, n) {
    if (wa(e), e.stateNode === null) {
      var u = dn, i = l.contextType;
      typeof i == "object" && i !== null && (u = pe(i)), u = new l(a, u), e.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = Bs, e.stateNode = u, u._reactInternals = e, u = e.stateNode, u.props = a, u.state = e.memoizedState, u.refs = {}, os(e), i = l.contextType, u.context = typeof i == "object" && i !== null ? pe(i) : dn, u.state = e.memoizedState, i = l.getDerivedStateFromProps, typeof i == "function" && (Us(
        e,
        l,
        i,
        a
      ), u.state = e.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (i = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), i !== u.state && Bs.enqueueReplaceState(u, u.state, null), hu(e, a, u, n), mu(), u.state = e.memoizedState), typeof u.componentDidMount == "function" && (e.flags |= 4194308), a = !0;
    } else if (t === null) {
      u = e.stateNode;
      var f = e.memoizedProps, g = Ga(l, f);
      u.props = g;
      var T = u.context, z = l.contextType;
      i = dn, typeof z == "object" && z !== null && (i = pe(z));
      var U = l.getDerivedStateFromProps;
      z = typeof U == "function" || typeof u.getSnapshotBeforeUpdate == "function", f = e.pendingProps !== f, z || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (f || T !== i) && Ad(
        e,
        u,
        a,
        i
      ), Pl = !1;
      var S = e.memoizedState;
      u.state = S, hu(e, a, u, n), mu(), T = e.memoizedState, f || S !== T || Pl ? (typeof U == "function" && (Us(
        e,
        l,
        U,
        a
      ), T = e.memoizedState), (g = Pl || Cd(
        e,
        l,
        g,
        a,
        S,
        T,
        i
      )) ? (z || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = a, e.memoizedState = T), u.props = a, u.state = T, u.context = i, a = g) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), a = !1);
    } else {
      u = e.stateNode, ds(t, e), i = e.memoizedProps, z = Ga(l, i), u.props = z, U = e.pendingProps, S = u.context, T = l.contextType, g = dn, typeof T == "object" && T !== null && (g = pe(T)), f = l.getDerivedStateFromProps, (T = typeof f == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (i !== U || S !== g) && Ad(
        e,
        u,
        a,
        g
      ), Pl = !1, S = e.memoizedState, u.state = S, hu(e, a, u, n), mu();
      var O = e.memoizedState;
      i !== U || S !== O || Pl || t !== null && t.dependencies !== null && bi(t.dependencies) ? (typeof f == "function" && (Us(
        e,
        l,
        f,
        a
      ), O = e.memoizedState), (z = Pl || Cd(
        e,
        l,
        z,
        a,
        S,
        O,
        g
      ) || t !== null && t.dependencies !== null && bi(t.dependencies)) ? (T || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(a, O, g), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        a,
        O,
        g
      )), typeof u.componentDidUpdate == "function" && (e.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && S === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && S === t.memoizedState || (e.flags |= 1024), e.memoizedProps = a, e.memoizedState = O), u.props = a, u.state = O, u.context = g, a = z) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && S === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && S === t.memoizedState || (e.flags |= 1024), a = !1);
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
    if ((i = u) || (i = t !== null && t.memoizedState === null ? !1 : (_e.current & 2) !== 0), i && (n = !0, e.flags &= -129), i = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
      if (Tt) {
        if (n ? aa(e) : na(), (t = Ft) ? (t = hh(
          t,
          el
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: $l !== null ? { id: gl, overflow: yl } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = xo(t), l.return = e, e.child = l, he = e, Ft = null)) : t = null, t === null) throw Fl(e);
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
      var g = f.dehydrated;
      if (g !== null)
        return Fv(
          t,
          e,
          u,
          i,
          a,
          g,
          f,
          l
        );
    }
    return n ? (na(), n = a.fallback, u = e.mode, f = t.child, g = f.sibling, a = Dl(f, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = f.subtreeFlags & 1206910976, g !== null ? n = Dl(g, n) : (n = Aa(
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
      if (a = u.nextSibling && u.nextSibling.dataset, a) var g = a.dgst;
      return a = g, a !== "" && (n = Error(s(419)), n.stack = "", n.digest = a, cu({ value: n, source: null, stack: null })), Yi(
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
      if (a = kt, a !== null && (n = Of(
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
    return qr(u) ? (e.flags |= 192, e.child = t.child, null) : (t = i.treeContext, Ft = al(u.nextSibling), he = e, Tt = !0, kl = null, el = !1, t !== null && zo(e, t), e = Vs(
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
    var i = _e.current;
    if (e.flags & 128)
      return vu(e, i), null;
    var f = (i & 2) !== 0;
    if (f ? (i = i & 1 | 2, e.flags |= 128) : i &= 1, vu(e, i), n === "backwards" && t !== null ? (Qs(t), de(t, e, a, l), Qs(t)) : de(t, e, a, l), a = Tt ? iu : 0, !f && t !== null && (t.flags & 128) !== 0)
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
    return Wl(e, e.type, a.value), de(t, e, a.children, l), e.child;
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
        ie(e, e.stateNode.containerInfo), Wl(e, ce, t.memoizedState.cache), ja();
        break;
      case 27:
      case 5:
        Ol(e);
        break;
      case 4:
        ie(e, e.stateNode.containerInfo);
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
      re = !1, Tt && (e.flags & 1048576) !== 0 && Oo(e, iu, e.index);
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
              } else if (n === k) {
                e.tag = 14, e = Ld(
                  null,
                  e,
                  t,
                  a,
                  l
                );
                break t;
              } else if (n === Nt) {
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
          if (ie(
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
              for (t = e.stateNode.containerInfo, t.nodeType === 9 ? t = t.body : t = t.nodeName === "HTML" ? t.ownerDocument.body : t, Ft = al(t.firstChild), he = e, Tt = !0, kl = null, el = !0, l = qo(
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
        )) ? e.memoizedState = l : Tt || (e.stateNode = th(
          e.type,
          e.pendingProps,
          Ct.current,
          e
        )) : e.memoizedState = _h(
          e.type,
          t.memoizedProps,
          e.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return Ol(e), t === null && Tt && (a = e.stateNode = yh(
          e.type,
          e.pendingProps,
          Ct.current
        ), he = e, el = !0, n = Ft, da(e.type) ? (Xr = n, Ft = al(a.firstChild)) : Ft = n), de(
          t,
          e,
          e.pendingProps.children,
          l
        ), En(t, e), t === null && (e.flags |= 4194304), e.child;
      case 5:
        return t === null && Tt && ((n = a = Ft) && (a = Zg(
          a,
          e.type,
          e.pendingProps,
          el
        ), a !== null ? (e.stateNode = a, he = e, Ft = al(a.firstChild), el = !1, n = !0) : n = !1), n || Fl(e)), Ol(e), n = e.type, u = e.pendingProps, i = t !== null ? t.memoizedProps : null, a = u.children, Dr(n, u) ? a = null : i !== null && Dr(n, i) && (e.flags |= 32), e.memoizedState !== null && (n = Ss(
          t,
          e,
          qv,
          null,
          null,
          l
        ), qn._currentValue = n), En(t, e), de(t, e, a, l), e.child;
      case 6:
        return t === null && Tt && ((t = l = Ft) && (l = Kg(
          l,
          e.pendingProps,
          el
        ), l !== null ? (e.stateNode = l, he = e, Ft = null, t = !0) : t = !1), t || Fl(e)), null;
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
        return wa(e), a = pe(ce), t === null ? (n = rs(), n === null && (n = kt, u = cs(), n.pooledCache = u, u.refCount++, u !== null && (n.pooledCacheLanes |= l), n = u), e.memoizedState = { parent: a, cache: n }, os(e), Wl(e, ce, n)) : ((t.lanes & l) !== 0 && (ds(t, e), hu(e, null, null, l), mu()), n = t.memoizedState, u = e.memoizedState, n.parent !== a ? (n = { parent: a, cache: a }, e.memoizedState = n, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = n), Wl(e, ce, a)) : (a = u.cache, Wl(e, ce, a), a !== n.cache && is(
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
        }), a = e.pendingProps, a.name != null && a.name !== "auto" ? e.flags |= t === null ? 18882560 : 18874368 : Tt && vi(e), t !== null && t.memoizedProps.name !== a.name ? e.flags |= 4194816 : En(t, e), de(t, e, a.children, l), e.child;
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
    e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? Nf() : 536870912, t.lanes |= e, On |= e);
  }
  function Su(t, e) {
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
  function Wt(t) {
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
        return Wt(e), null;
      case 1:
        return Wt(e), null;
      case 3:
        return l = e.stateNode, a = null, t !== null && (a = t.memoizedState.cache), e.memoizedState.cache !== a && (e.flags |= 2048), Bl(ce), Ht(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (t === null || t.child === null) && (vn(e) ? ql(e) : t === null || t.memoizedState.isDehydrated && (e.flags & 256) === 0 || (e.flags |= 1024, ns())), Wt(e), null;
      case 26:
        var n = e.type, u = e.memoizedState;
        return t === null ? (ql(e), u !== null ? (Wt(e), Wd(e, u)) : (Wt(e), Js(
          e,
          n,
          null,
          a,
          l
        ))) : u ? u !== t.memoizedState ? (ql(e), Wt(e), Wd(e, u)) : (Wt(e), e.flags &= -16777217) : (t = t.memoizedProps, t !== a && ql(e), Wt(e), Js(
          e,
          n,
          t,
          a,
          l
        )), null;
      case 27:
        if (Vl(e), l = Ct.current, n = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== a && ql(e);
        else {
          if (!a) {
            if (e.stateNode === null)
              throw Error(s(166));
            return Wt(e), e.subtreeFlags &= -33554433, null;
          }
          t = X.current, vn(e) ? Co(e) : (t = yh(n, a, l), e.stateNode = t, ql(e));
        }
        return Wt(e), e.subtreeFlags &= -33554433, null;
      case 5:
        if (Vl(e), n = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== a && ql(e);
        else {
          if (!a) {
            if (e.stateNode === null)
              throw Error(s(166));
            return Wt(e), e.subtreeFlags &= -33554433, null;
          }
          if (u = X.current, vn(e))
            Co(e);
          else {
            var i = ju(
              Ct.current
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
        return Wt(e), e.subtreeFlags &= -33554433, Js(
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
          if (t = Ct.current, vn(e)) {
            if (t = e.stateNode, l = e.memoizedProps, a = null, n = he, n !== null)
              switch (n.tag) {
                case 27:
                case 5:
                  a = n.memoizedProps;
              }
            t[be] = e, t = !!(t.nodeValue === l || a !== null && a.suppressHydrationWarning === !0 || Fm(t.nodeValue, l)), t || Fl(e, !0);
          } else
            t = ju(t).createTextNode(
              a
            ), t[be] = e, e.stateNode = t;
        }
        return Wt(e), null;
      case 31:
        if (l = e.memoizedState, t === null || t.memoizedState !== null) {
          if (a = vn(e), l !== null) {
            if (t === null) {
              if (!a) throw Error(s(318));
              if (t = e.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(557));
              t[be] = e;
            } else
              ja(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Wt(e), t = !1;
          } else
            l = ns(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = l), t = !0;
          if (!t)
            return e.flags & 256 ? (Ve(e), e) : (Ve(e), null);
          if ((e.flags & 128) !== 0)
            throw Error(s(558));
        }
        return Wt(e), null;
      case 13:
        if (a = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (n = vn(e), a !== null && a.dehydrated !== null) {
            if (t === null) {
              if (!n) throw Error(s(318));
              if (n = e.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(s(317));
              n[be] = e;
            } else
              ja(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Wt(e), n = !1;
          } else
            n = ns(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return e.flags & 256 ? (Ve(e), e) : (Ve(e), null);
        }
        return Ve(e), (e.flags & 128) !== 0 ? (e.lanes = l, e) : (l = a !== null, t = t !== null && t.memoizedState !== null, l && (a = e.child, n = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (n = a.alternate.memoizedState.cachePool.pool), u = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (u = a.memoizedState.cachePool.pool), u !== n && (a.flags |= 2048)), l !== t && l && (e.child.flags |= 8192), Gi(e, e.updateQueue), Wt(e), null);
      case 4:
        return Ht(), t === null && zr(e.stateNode.containerInfo), e.flags |= 67108864, Wt(e), null;
      case 10:
        return Bl(e.type), Wt(e), null;
      case 19:
        if (bs(e), a = e.memoizedState, a === null) return Wt(e), null;
        if (n = (e.flags & 128) !== 0, u = a.rendering, u === null)
          if (n) Su(a, !1);
          else {
            if (ae !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = e.child; t !== null; ) {
                if (u = Mi(t), u !== null) {
                  for (e.flags |= 128, Su(a, !1), t = u.updateQueue, e.updateQueue = t, Gi(e, t), e.subtreeFlags = 0, t = l, l = e.child; l !== null; )
                    No(l, t), l = l.sibling;
                  return vu(
                    e,
                    _e.current & 1 | 2
                  ), Tt && wl(e, a.treeForkCount), e.child;
                }
                t = t.sibling;
              }
            a.tail !== null && vt() > Pi && (e.flags |= 128, n = !0, Su(a, !1), e.lanes = 4194304);
          }
        else {
          if (!n)
            if (t = Mi(u), t !== null) {
              if (e.flags |= 128, n = !0, t = t.updateQueue, e.updateQueue = t, Gi(e, t), Su(a, !0), a.tail === null && a.tailMode !== "collapsed" && a.tailMode !== "visible" && !u.alternate && !Tt)
                return Wt(e), null;
            } else
              2 * vt() - a.renderingStartTime > Pi && l !== 536870912 && (e.flags |= 128, n = !0, Su(a, !1), e.lanes = 4194304);
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
          return a.rendering = t, a.tail = t.sibling, a.renderingStartTime = vt(), t.sibling = null, u = _e.current, u = n ? u & 1 | 2 : u & 1, a.tailMode === "visible" || a.tailMode === "collapsed" || !l || Tt ? vu(e, u) : (l = u, xt(Se, e), xt(_e, l), xe === null && (xe = e)), Tt && wl(e, a.treeForkCount), t;
        }
        return Wt(e), null;
      case 22:
      case 23:
        return Ve(e), gs(), a = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== a && (e.flags |= 8192) : a && (e.flags |= 8192), a ? (l & 536870912) !== 0 && (e.flags & 128) === 0 && (Wt(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : Wt(e), l = e.updateQueue, l !== null && Gi(e, l.retryQueue), l = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), a = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), a !== l && (e.flags |= 2048), t !== null && qt(Ba), null;
      case 24:
        return l = null, t !== null && (l = t.memoizedState.cache), e.memoizedState.cache !== l && (e.flags |= 2048), Bl(ce), Wt(e), null;
      case 25:
        return null;
      case 30:
        return e.flags |= 33554432, Wt(e), null;
    }
    throw Error(s(156, e.tag));
  }
  function Pv(t, e) {
    switch (ls(e), e.tag) {
      case 1:
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 3:
        return Bl(ce), Ht(), t = e.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (e.flags = t & -65537 | 128, e) : null;
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
        return bs(e), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, t = e.memoizedState, t !== null && (t.rendering = null, t.tail = null), e.flags |= 4, e) : null;
      case 4:
        return Ht(), null;
      case 10:
        return Bl(e.type), null;
      case 22:
      case 23:
        return Ve(e), gs(), t !== null && qt(Ba), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
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
        Bl(ce), Ht();
        break;
      case 26:
      case 27:
      case 5:
        Vl(e);
        break;
      case 4:
        Ht();
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
        Ve(e), gs(), t !== null && qt(Ba);
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
      Vt(e, e.return, f);
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
              var g = l, T = f;
              try {
                T();
              } catch (z) {
                Vt(
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
      Vt(e, e.return, z);
    }
  }
  function Pd(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var l = t.stateNode;
      try {
        Xo(e, l);
      } catch (a) {
        Vt(t, t.return, a);
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
      Vt(t, e, a);
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
    } catch (f) {
      Vt(t, e, f);
    }
  }
  function Ee(t, e) {
    var l = t.ref, a = t.refCleanup;
    if (l !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (n) {
          Vt(t, e, n);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (n) {
          Vt(t, e, n);
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
      Vt(t, t.return, n);
    }
  }
  function Ws(t, e, l) {
    try {
      var a = t.stateNode;
      xg(a, t.type, l, e), a[De] = e;
    } catch (n) {
      Vt(t, t.return, n);
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
      n = t.stateNode, e ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(n, e) : (e = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, e.appendChild(n), l = l._reactRootContainer, l != null || e.onclick !== null || (e.onclick = vl)), Xi(t, a), Lt = !0;
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
      n = t.stateNode, e ? l.insertBefore(n, e) : l.appendChild(n), Xi(t, a), Lt = !0;
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
      Te(e, a, l), e[be] = t, e[De] = l;
    } catch (u) {
      Vt(t, t.return, u);
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
  function tr(t, e) {
    if (t.tag === 30) {
      var l = t.stateNode, a = t.memoizedProps, n = jl(a, l), u = Rl(
        a.default,
        l.paired ? a.share : a.enter
      );
      u !== "none" ? Tn(t, n, u, null, !1) ? (Zi(t), l.paired || e || jn(t, a.onEnter)) : Sl(t.child, !1) : Zi(t);
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
      n !== "none" && (Tn(t, l, n, null, !1) ? a !== void 0 ? (n = t.stateNode, a.paired = n, n.paired = a, Qe.delete(l), jn(t, e.onShare)) : jn(t, e.onExit) : Sl(t.child, !1)), Qe !== null && er(t);
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
  function ar(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if (t.tag !== 22 || t.memoizedState === null) {
          if (t.tag === 30 && (t.flags & 18874368) !== 0) {
            var e = t.stateNode;
            e.paired !== null && (e.paired = null, Sl(t.child, !1));
          }
          ar(t);
        }
        t = t.sibling;
      }
  }
  function Ki(t) {
    if (t.tag === 30)
      t.stateNode.paired = null, Sl(t.child, !1), ar(t);
    else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        Ki(t), t = t.sibling;
    else ar(t);
  }
  function sm(t) {
    for (t = t.child; t !== null; )
      t.tag === 30 ? Sl(t.child, !1) : (t.subtreeFlags & 33554432) !== 0 && sm(t), t = t.sibling;
  }
  function nr(t, e, l, a, n, u, i) {
    for (var f = !1; e !== null; ) {
      if (e.tag === 5) {
        var g = e.stateNode;
        if (u !== null && Ue < u.length) {
          var T = u[Ue], z = Br(g);
          (T.view || z.view) && (f = !0);
          var U;
          if (U = (t.flags & 4) === 0)
            if (z.clip) U = !0;
            else {
              U = T.rect;
              var S = z.rect;
              U = U.y !== S.y || U.x !== S.x || U.height !== S.height || U.width !== S.width;
            }
          U && (t.flags |= 4), z.abs ? z = !T.abs : (T = T.rect, z = z.rect, z = T.height !== z.height || T.width !== z.width), z && (t.flags |= 32);
        } else t.flags |= 32;
        (t.flags & 4) !== 0 && uh(
          g,
          Ue === 0 ? l : l + "_" + Ue,
          n
        ), f && (t.flags & 4) !== 0 || (pl === null && (pl = []), pl.push(
          g,
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
        ), (t.flags & 4) !== 0 && n && jn(t, l.onUpdate);
      } else
        (t.subtreeFlags & 33554432) !== 0 && rm(t);
      t = t.sibling;
    }
  }
  var ve = !1, Gt = !1, _l = !1, ur = !1, fm = typeof WeakSet == "function" ? WeakSet : Set, ge = null, El = !1, Tu = !1, Ji = !1, ir = !1;
  function tg(t, e, l) {
    if (t = t.containerInfo, jr = Gn, t = ho(t), Kc(t)) {
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
            var f = 0, g = -1, T = -1, z = 0, U = 0, S = t, O = null;
            e: for (; ; ) {
              for (var Z; S !== a || u !== 0 && S.nodeType !== 3 || (g = f + u), S !== i || n !== 0 && S.nodeType !== 3 || (T = f + n), S.nodeType === 3 && (f += S.nodeValue.length), (Z = S.firstChild) !== null; )
                O = S, S = Z;
              for (; ; ) {
                if (S === t) break e;
                if (O === a && ++z === u && (g = f), O === i && ++U === n && (T = f), (Z = S.nextSibling) !== null) break;
                S = O, O = S.parentNode;
              }
              S = Z;
            }
            a = g === -1 || T === -1 ? null : { start: g, end: T };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (Rr = { focusedElem: t, selectionRange: a }, Gn = !1, l = (l & 335544064) === l, ge = e, e = l ? 9270 : 1024; ge !== null; ) {
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
              Vt(e, e.return, f);
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
  function om(t, e, l) {
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
              Vt(l, l.return, i);
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
              Vt(
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
            Xo(t, e);
          } catch (i) {
            Vt(l, l.return, i);
          }
        }
        break;
      case 27:
        e === null && a & 4 && am(l);
      case 26:
      case 5:
        Tl(t, l), e === null && a & 4 && Fs(l), a & 512 && bl(l, l.return);
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
          var u = e !== null && e.memoizedState !== null || Gt;
          e = ve, n = Gt, ve = a, (Gt = u) && !n ? (a = 2, (l.subtreeFlags & 8772) !== 0 && (a |= 1), sl(
            t,
            l,
            a
          )) : Tl(t, l), ve = e, Gt = n;
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
        } catch (g) {
          Vt(t, t.return, g);
        }
        sr(t, e);
        break;
      case 6:
        try {
          t.stateNode.nodeValue = e ? "" : t.memoizedProps, Lt = !0;
        } catch (g) {
          Vt(t, t.return, g);
        }
        break;
      case 18:
        try {
          var f = t.stateNode;
          e ? nh(f, !0) : nh(t.stateNode, !1);
        } catch (g) {
          Vt(t, t.return, g);
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
  function il(t, e, l) {
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
        Gt || Ee(l, e), il(
          t,
          e,
          l
        ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && !Gt && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        Gt || Ee(l, e), Eu(l);
        var a = Pt, n = Be;
        da(l.type) && (Pt = l.stateNode, Be = !1), il(
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
        Gt || Ee(l, e), Eu(l);
      case 6:
        if (l.tag === 6 && Eu(l), a = Pt, n = Be, Pt = null, il(
          t,
          e,
          l
        ), Pt = a, Be = n, Pt !== null)
          if (Be)
            try {
              (Pt.nodeType === 9 ? Pt.body : Pt.nodeName === "HTML" ? Pt.ownerDocument.body : Pt).removeChild(l.stateNode), Lt = !0;
            } catch (u) {
              Vt(
                l,
                e,
                u
              );
            }
          else
            try {
              Pt.removeChild(l.stateNode), Lt = !0;
            } catch (u) {
              Vt(
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
        a = Pt, n = Be, Pt = l.stateNode.containerInfo, Be = !0, il(
          t,
          e,
          l
        ), Pt = a, Be = n;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        ua(2, l, e), Gt || ua(4, l, e), il(
          t,
          e,
          l
        );
        break;
      case 1:
        Gt || (Ee(l, e), a = l.stateNode, typeof a.componentWillUnmount == "function" && tm(
          l,
          e,
          a
        )), il(
          t,
          e,
          l
        );
        break;
      case 21:
        il(
          t,
          e,
          l
        );
        break;
      case 22:
        Gt = (a = Gt) || l.memoizedState !== null, il(
          t,
          e,
          l
        ), Gt = a;
        break;
      case 30:
        Ee(l, e), il(
          t,
          e,
          l
        );
        break;
      case 7:
        Gt || Ee(l, e), il(
          t,
          e,
          l
        );
        break;
      default:
        il(
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
        Vt(e, e.return, l);
      }
    }
  }
  function gm(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        Xn(t);
      } catch (l) {
        Vt(e, e.return, l);
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
  function Ce(t, e, l) {
    var a = e.deletions;
    if (a !== null)
      for (var n = 0; n < a.length; n++) {
        var u = a[n], i = t, f = e, g = f;
        t: for (; g !== null; ) {
          switch (g.tag) {
            case 27:
              if (da(g.type)) {
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
        hm(i, f, u), Pt = null, Be = !1, i = u.alternate, i !== null && (i.return = null), u.return = null;
      }
    if (e.subtreeFlags & 13886)
      for (e = e.child; e !== null; )
        ym(e, t, l), e = e.sibling;
  }
  var cl = null;
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
        Ce(e, t, l), Ae(t), n & 4 && (ua(3, t, t.return), _u(3, t), ua(5, t, t.return));
        break;
      case 1:
        Ce(e, t, l), Ae(t), n & 512 && (Gt || a === null || Ee(a, a.return)), n & 64 && ve && (t = t.updateQueue, t !== null && (e = t.callbacks, e !== null && (l = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = l === null ? e : l.concat(e))));
        break;
      case 26:
        if (u = cl, Ce(e, t, l), Ae(t), n & 512 && (Gt || a === null || Ee(a, a.return)), n & 4)
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
                ve || Kr(u, t.type, t.stateNode);
            else
              t.stateNode = Th(
                u,
                l,
                t.memoizedProps
              );
          else
            n !== l ? (n === null ? (e = a.stateNode, e === null || Gt || e.parentNode.removeChild(e)) : n.count--, l === null ? ve || Kr(u, t.type, t.stateNode) : Th(u, l, t.memoizedProps)) : l === null && t.stateNode !== null && Ws(
              t,
              t.memoizedProps,
              a.memoizedProps
            );
        break;
      case 27:
        Ce(e, t, l), Ae(t), n & 512 && (Gt || a === null || Ee(a, a.return)), a !== null && n & 4 && Ws(
          t,
          t.memoizedProps,
          a.memoizedProps
        );
        break;
      case 5:
        if (u = _l, _l = !1, Ce(e, t, l), _l = u, Ae(t), n & 512 && (Gt || a === null || Ee(a, a.return)), t.flags & 32) {
          e = t.stateNode;
          try {
            nn(e, ""), Lt = !0;
          } catch (z) {
            Vt(t, t.return, z);
          }
        }
        n & 4 && t.stateNode != null && (e = t.memoizedProps, Ws(
          t,
          e,
          a !== null ? a.memoizedProps : e
        )), n & 1024 && (ur = !0);
        break;
      case 6:
        if (Ce(e, t, l), Ae(t), n & 4) {
          if (t.stateNode === null)
            throw Error(s(162));
          e = t.memoizedProps, l = t.stateNode;
          try {
            l.nodeValue = e, Lt = !0;
          } catch (z) {
            Vt(t, t.return, z);
          }
        }
        break;
      case 3:
        if (Lt = !1, fc = null, u = cl, cl = Ru(e.containerInfo), Ce(e, t, l), cl = u, Ae(t), n & 4 && a !== null && a.memoizedState.isDehydrated)
          try {
            Xn(e.containerInfo);
          } catch (z) {
            Vt(t, t.return, z);
          }
        ur && (ur = !1, bm(t)), Lt = !1;
        break;
      case 4:
        n = _l, _l = ve, a = Hf(), u = cl, cl = Ru(
          t.stateNode.containerInfo
        ), Ce(e, t, l), Ae(t), cl = u, Lt && Tu && (Ji = !0), Lt = a, _l = n;
        break;
      case 12:
        Ce(e, t, l), Ae(t);
        break;
      case 31:
        Ce(e, t, l), Ae(t), n & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, ki(t, e)));
        break;
      case 13:
        Ce(e, t, l), Ae(t), t.child.flags & 8192 && t.memoizedState !== null != (a !== null && a.memoizedState !== null) && (Ii = vt()), n & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, ki(t, e)));
        break;
      case 22:
        u = t.memoizedState !== null, i = a !== null && a.memoizedState !== null;
        var f = ve, g = Gt, T = _l;
        ve = f || u, _l = T || u, Gt = g || i, Ce(e, t, l), Gt = g, _l = T, ve = f, Ae(t), n & 8192 && (e = t.stateNode, e._visibility = u ? e._visibility & -2 : e._visibility | 1, !u || a === null || i || ve || Gt || (e = i || Gt, l = ve, a = Gt, ve = u || ve, Gt = e, ia(t, 2), ve = l, Gt = a), !u && _l || cr(t, u)), n & 4 && (e = t.updateQueue, e !== null && (l = e.retryQueue, l !== null && (e.retryQueue = null, ki(t, l))));
        break;
      case 19:
        Ce(e, t, l), Ae(t), n & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, ki(t, e)));
        break;
      case 30:
        n & 512 && (Gt || a === null || Ee(a, a.return)), n = Hf(), u = Tu, i = (l & 335544064) === l, f = t.memoizedProps, Tu = i && Rl(
          f.default,
          f.update
        ) !== "none", Ce(e, t, l), Ae(t), i && a !== null && Lt && (t.flags |= 4), Tu = u, Lt = n;
        break;
      case 21:
        break;
      case 7:
        n & 512 && (Gt || a === null || Ee(a, a.return)), a && a.stateNode !== null && (a.stateNode._fragmentFiber = t);
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
            var f = l.stateNode, g = Is(t);
            Vi(
              t,
              g,
              f,
              i
            );
            break;
          case 5:
            var T = l.stateNode;
            l.flags & 32 && (nn(T, ""), l.flags &= -33);
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
            var U = l.stateNode.containerInfo, S = Is(t);
            Ps(
              t,
              S,
              U,
              i
            );
            break;
          default:
            throw Error(s(161));
        }
      } catch (O) {
        Vt(t, t.return, O);
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
    if (l === null) tr(t, !1);
    else
      switch (t.tag) {
        case 3:
          if (ir = El = !1, um(), Nn(e, t), !El && !Ji) {
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
            )), ir = !0;
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
          t.memoizedState === null && (l.memoizedState !== null ? tr(t, !1) : Nn(e, t));
          break;
        case 30:
          a = El, n = um(), El = !1, Nn(e, t), El && (t.flags |= 4);
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
          Ee(l, l.return);
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
          Ee(l, l.return), l.tag !== 5 && l.tag !== 27 || Eu(l), ia(
            l,
            a
          );
          break;
        case 6:
          Eu(l);
          break;
        case 26:
          Ee(l, l.return), n = l.stateNode, l.memoizedState !== null || n === null || Gt || n.parentNode.removeChild(n), ia(
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
          Ee(l, l.return), ia(
            l,
            a
          );
          break;
        case 7:
          Ee(l, l.return);
        default:
          ia(
            l,
            a
          );
      }
      t = t.sibling;
    }
  }
  function sl(t, e, l) {
    for (l = (e.subtreeFlags & 8772) !== 0 ? l : l & -2, e = e.child; e !== null; ) {
      var a = e.alternate, n = t, u = e, i = u.flags, f = (l & 1) !== 0;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          sl(
            n,
            u,
            l
          ), _u(4, u);
          break;
        case 1:
          if (sl(
            n,
            u,
            l
          ), a = u, n = a.stateNode, typeof n.componentDidMount == "function")
            try {
              n.componentDidMount();
            } catch (z) {
              Vt(a, a.return, z);
            }
          if (a = u, n = a.updateQueue, n !== null) {
            var g = a.stateNode;
            try {
              var T = n.shared.hiddenCallbacks;
              if (T !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < T.length; n++)
                  Go(T[n], g);
            } catch (z) {
              Vt(a, a.return, z);
            }
          }
          f && i & 64 && Pd(u), bl(u, u.return);
          break;
        case 27:
          (l & 2) !== 0 && am(u);
        case 5:
          u.tag !== 5 && u.tag !== 27 || em(u), sl(
            n,
            u,
            l
          ), f && a === null && i & 4 && Fs(u), bl(u, u.return);
          break;
        case 6:
          em(u);
          break;
        case 26:
          g = u.stateNode, u.memoizedState !== null || g === null || ve || Kr(
            Ru(g.ownerDocument),
            u.type,
            g
          ), sl(
            n,
            u,
            l
          ), f && a === null && i & 4 && Fs(u), bl(u, u.return);
          break;
        case 12:
          sl(
            n,
            u,
            l
          );
          break;
        case 31:
          sl(
            n,
            u,
            l
          ), f && i & 4 && vm(n, u);
          break;
        case 13:
          sl(
            n,
            u,
            l
          ), f && i & 4 && gm(n, u);
          break;
        case 22:
          u.memoizedState === null && sl(
            n,
            u,
            l
          ), bl(u, u.return);
          break;
        case 30:
          sl(
            n,
            u,
            l
          ), bl(u, u.return);
          break;
        case 7:
          bl(u, u.return);
        default:
          sl(
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
        ), n && ir && (t = t.containerInfo, t = t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, t.style.viewTransitionName === "root" && (t.style.viewTransitionName = ""), t = t.ownerDocument.documentElement, t !== null && t.style.viewTransitionName === "none" && (t.style.viewTransitionName = "")), u & 2048 && (u = null, e.alternate !== null && (u = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== u && (e.refCount++, u != null && su(u)));
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
            var i = e.memoizedProps, f = i.id, g = i.onPostCommit;
            typeof g == "function" && g(
              f,
              e.alternate === null ? "mount" : "update",
              u.passiveEffectDuration,
              -0
            );
          } catch (T) {
            Vt(e, e.return, T);
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
        i = e.stateNode, f = e.alternate, e.memoizedState !== null ? (n && f !== null && f.memoizedState === null && Ki(f), i._visibility & 2 ? ll(
          t,
          e,
          l,
          a
        ) : Nu(
          t,
          e
        )) : (n && f !== null && f.memoizedState !== null && Ki(e), i._visibility & 2 ? ll(
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
        ))), u & 2048 && rr(f, e);
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
      var u = t, i = e, f = l, g = a, T = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          xn(
            u,
            i,
            f,
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
            f,
            g,
            n
          ) : Nu(
            u,
            i
          ) : (z._visibility |= 2, xn(
            u,
            i,
            f,
            g,
            n
          )), n && T & 2048 && rr(
            i.alternate,
            i
          );
          break;
        case 24:
          xn(
            u,
            i,
            f,
            g,
            n
          ), n && T & 2048 && fr(i.alternate, i);
          break;
        default:
          xn(
            u,
            i,
            f,
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
          cl,
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
        var a = cl;
        cl = Ru(t.stateNode.containerInfo), Va(
          t,
          e,
          l
        ), cl = a;
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
      var e = pe(ce), l = e.data.get(t);
      return l === void 0 && (l = t(), e.data.set(t, l)), l;
    },
    cacheSignal: function() {
      return pe(ce).controller.signal;
    }
  }, ag = typeof WeakMap == "function" ? WeakMap : Map, Yt = 0, kt = null, Mt = null, At = 0, Xt = 0, Ze = null, ca = !1, Mn = !1, or = !1, Gl = 0, ae = 0, sa = 0, Qa = 0, Wi = 0, Ke = 0, On = 0, Mu = null, He = null, dr = !1, Ii = 0, xm = 0, Pi = 1 / 0, tc = null, ra = null, te = 0, rl = null, Za = null, Nl = 0, mr = 0, hr = null, Mm = null, zn = null, Cn = null, An = null, Ou = 0, ec = null;
  function Je() {
    return (Yt & 2) !== 0 && At !== 0 ? At & -At : K.T !== null ? Nr() : zf();
  }
  function Om() {
    if (Ke === 0)
      if ((At & 536870912) === 0 || Tt) {
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
      )), Cn === null && (Cn = []), Cn.push(e.bind(null, a));
    }
  }
  function Le(t, e, l) {
    (t === kt && (Xt === 2 || Xt === 9) || t.cancelPendingCommit !== null) && (Rn(t, 0), fa(
      t,
      At,
      Ke,
      !1
    )), $n(t, l), ((Yt & 2) === 0 || t !== kt) && (t === kt && ((Yt & 2) === 0 && (Qa |= l), ae === 4 && fa(
      t,
      At,
      Ke,
      !1
    )), xl(t));
  }
  function zm(t, e, l) {
    if ((Yt & 6) !== 0) throw Error(s(327));
    var a = !l && (e & 127) === 0 && (e & t.expiredLanes) === 0 || Jn(t, e), n = a ? ig(t, e) : gr(t, e, !0), u = a;
    do {
      if (n === 0) {
        Mn && !a && fa(t, e, 0, !1);
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
              var g = f.current.memoizedState.isDehydrated;
              if (g && (Rn(f, i).flags |= 256), i = gr(
                f,
                i,
                !1
              ), i !== 2 && i !== 6) {
                if (or && !g) {
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
          if ((e & 62914560) === e && (n = Ii + 300 - vt(), 10 < n)) {
            if (fa(
              a,
              e,
              Ke,
              !ca
            ), Wu(a, 0, !0) !== 0) break t;
            Nl = e, a.timeoutHandle = Ur(
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
                On,
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
            On,
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
    xl(t);
  }
  function Cm(t, e, l, a, n, u, i, f, g, T, z, U, S, O) {
    t.timeoutHandle = -1;
    var Z = e.subtreeFlags, tt = (u & 335544064) === u;
    if (U = null, (tt || Z & 8192 || (Z & 16785408) === 16785408) && (U = {
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
      U
    ), tt && (Z = U, tt = t.containerInfo, tt = (tt.nodeType === 9 ? tt : tt.ownerDocument).__reactViewTransition, tt != null && (Z.count++, Z.waitingForViewTransition = !0, Z = Uu.bind(Z), tt.finished.then(Z, Z))), Z = (u & 62914560) === u ? Ii - vt() : (u & 4194048) === u ? xm - vt() : 0, Z = sy(
      U,
      Z
    ), Z !== null)) {
      Nl = u, t.cancelPendingCommit = Z(
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
          g,
          T,
          z,
          U,
          null,
          S,
          O
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
      g,
      T,
      z,
      U
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
    return (Yt & 6) === 0 ? (zu(0), !1) : !0;
  }
  function vr() {
    if (Mt !== null) {
      if (Xt === 0)
        var t = Mt.return;
      else
        t = Mt, Ul = Ra = null, Ts(t), bn = null, ou = 0, t = Mt;
      for (; t !== null; )
        Id(t.alternate, t), t = t.return;
      Mt = null;
    }
  }
  function Rn(t, e) {
    var l = t.timeoutHandle;
    return l !== -1 && (t.timeoutHandle = -1, zg(l)), l = t.cancelPendingCommit, l !== null && (t.cancelPendingCommit = null, l()), Nl = 0, vr(), kt = t, Mt = l = Dl(t.current, null), At = e, Xt = 0, Ze = null, ca = !1, Mn = Jn(t, e), or = !1, On = Ke = Wi = Qa = sa = ae = 0, He = Mu = null, dr = !1, Gl = Tf(t, e), fi(), l;
  }
  function Am(t, e) {
    bt = null, K.H = Ui, e === yn || e === _i ? (e = Ho(), Xt = 3) : e === fs ? (e = Ho(), Xt = 4) : Xt = e === Ls ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, Ze = e, Mt === null && (ae = 1, Bi(
      t,
      Ie(e, t.current)
    ));
  }
  function jm() {
    var t = Se.current;
    return t === null ? !0 : (At & 4194048) === At ? xe === null : (At & 62914560) === At || (At & 536870912) !== 0 ? t === xe : !1;
  }
  function Rm() {
    var t = K.H;
    return K.H = Ui, t === null ? Ui : t;
  }
  function Dm() {
    var t = K.A;
    return K.A = lg, t;
  }
  function ac() {
    ae = 4, ca || (At & 4194048) !== At && Se.current !== null || (Mn = !0), (sa & 134217727) === 0 && (Qa & 134217727) === 0 || kt === null || fa(
      kt,
      At,
      Ke,
      !1
    );
  }
  function gr(t, e, l) {
    var a = Yt;
    Yt |= 2;
    var n = Rm(), u = Dm();
    (kt !== t || At !== e) && (tc = null, Rn(t, e)), e = !1;
    var i = ae;
    t: do
      try {
        if (Xt !== 0 && Mt !== null) {
          var f = Mt, g = Ze;
          switch (Xt) {
            case 8:
              vr(), i = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              Se.current === null && (e = !0);
              var T = Xt;
              if (Xt = 0, Ze = null, Dn(t, f, g, T), l && Mn) {
                i = 0;
                break t;
              }
              break;
            default:
              T = Xt, Xt = 0, Ze = null, Dn(t, f, g, T);
          }
        }
        ug(), i = ae;
        break;
      } catch (z) {
        Am(t, z);
      }
    while (!0);
    return e && t.shellSuspendCounter++, Ul = Ra = null, Yt = a, K.H = n, K.A = u, Mt === null && (kt = null, At = 0, fi()), i;
  }
  function ug() {
    for (; Mt !== null; ) wm(Mt);
  }
  function ig(t, e) {
    var l = Yt;
    Yt |= 2;
    var a = Rm(), n = Dm();
    kt !== t || At !== e ? (tc = null, Pi = vt() + 500, Rn(t, e)) : Mn = Jn(
      t,
      e
    );
    t: do
      try {
        if (Xt !== 0 && Mt !== null) {
          e = Mt;
          var u = Ze;
          e: switch (Xt) {
            case 1:
              Xt = 0, Ze = null, Dn(t, e, u, 1);
              break;
            case 2:
            case 9:
              if (Uo(u)) {
                Xt = 0, Ze = null, Um(e);
                break;
              }
              e = function() {
                Xt !== 2 && Xt !== 9 || kt !== t || (Xt = 7), xl(t);
              }, u.then(e, e);
              break t;
            case 3:
              Xt = 7;
              break t;
            case 4:
              Xt = 5;
              break t;
            case 7:
              Uo(u) ? (Xt = 0, Ze = null, Um(e)) : (Xt = 0, Ze = null, Dn(t, e, u, 7));
              break;
            case 5:
              var i = null;
              switch (Mt.tag) {
                case 26:
                  i = Mt.memoizedState;
                case 5:
                case 27:
                  var f = Mt;
                  if (i ? Mh(i) : f.stateNode.complete) {
                    Xt = 0, Ze = null;
                    var g = f.sibling;
                    if (g !== null) Mt = g;
                    else {
                      var T = f.return;
                      T !== null ? (Mt = T, nc(T)) : Mt = null;
                    }
                    break e;
                  }
              }
              Xt = 0, Ze = null, Dn(t, e, u, 5);
              break;
            case 6:
              Xt = 0, Ze = null, Dn(t, e, u, 6);
              break;
            case 8:
              vr(), ae = 6;
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
    return Ul = Ra = null, K.H = a, K.A = n, Yt = l, Mt !== null ? 0 : (kt = null, At = 0, fi(), ae);
  }
  function cg() {
    for (; Mt !== null && !F(); )
      wm(Mt);
  }
  function wm(t) {
    var e = Fd(t.alternate, t, Gl);
    t.memoizedProps = t.pendingProps, e === null ? nc(t) : Mt = e;
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
          At
        );
        break;
      case 11:
        e = Vd(
          l,
          e,
          e.pendingProps,
          e.type.render,
          e.ref,
          At
        );
        break;
      case 5:
        Ts(e);
        var a = e;
        a === he && (Tt ? (gi(a), a.tag === 5 && a.stateNode != null && (Ft = a.stateNode)) : (gi(a), Tt = !0));
      default:
        Id(l, e), e = Mt = No(e, Gl), e = Fd(l, e, Gl);
    }
    t.memoizedProps = t.pendingProps, e === null ? nc(t) : Mt = e;
  }
  function Dn(t, e, l, a) {
    Ul = Ra = null, Ts(e), bn = null, ou = 0;
    var n = e.return;
    try {
      if ($v(
        t,
        n,
        e,
        l,
        At
      )) {
        ae = 1, Bi(
          t,
          Ie(l, t.current)
        ), Mt = null;
        return;
      }
    } catch (u) {
      if (n !== null) throw Mt = n, u;
      ae = 1, Bi(
        t,
        Ie(l, t.current)
      ), Mt = null;
      return;
    }
    e.flags & 32768 ? (Tt || a === 1 ? t = !0 : Mn || (At & 536870912) !== 0 ? t = !1 : (ca = t = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = Se.current, a !== null && a.tag === 13 && (a.flags |= 16384))), Bm(e, t)) : nc(e);
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
        Mt = l;
        return;
      }
      if (e = e.sibling, e !== null) {
        Mt = e;
        return;
      }
      Mt = e = t;
    } while (e !== null);
    ae === 0 && (ae = 5);
  }
  function Bm(t, e) {
    do {
      var l = Pv(t.alternate, t);
      if (l !== null) {
        l.flags &= 32767, Mt = l;
        return;
      }
      if (l = t.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !e && (t = t.sibling, t !== null)) {
        Mt = t;
        return;
      }
      Mt = t = l;
    } while (t !== null);
    ae = 6, Mt = null;
  }
  function Hm(t, e, l, a, n, u, i, f, g, T, z, U) {
    t.cancelPendingCommit = null;
    do
      uc();
    while (te !== 0);
    if ((Yt & 6) !== 0) throw Error(s(327));
    if (e !== null) {
      if (e === t.current) throw Error(s(177));
      t === kt && (Mt = kt = null, At = 0), Za = e, rl = t, Nl = l, hr = n, Mm = a, sg(
        t,
        e,
        l,
        i,
        f,
        g,
        U
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
    ), Cn = null, (l & 335544064) === l ? (An = Bv(t), a = 10262) : (An = null, a = 10256), (e.subtreeFlags & a) !== 0 || (e.flags & a) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, hg(Ju, function() {
      return Sr(), null;
    })) : (t.callbackNode = null, t.callbackPriority = 0), Qi = !1, a = (e.flags & 13878) !== 0, (e.subtreeFlags & 13878) !== 0 || a) {
      a = K.T, K.T = null, n = it.p, it.p = 2, u = Yt, Yt |= 4;
      try {
        tg(t, e, l);
      } finally {
        Yt = u, it.p = n, K.T = a;
      }
    }
    te = 1, Qi ? zn = wg(
      i,
      t.containerInfo,
      An,
      yr,
      br,
      fg,
      pr,
      Sr,
      rg
    ) : (yr(), br(), pr());
  }
  function rg(t) {
    if (te !== 0) {
      var e = rl.onRecoverableError;
      e(t, { componentStack: null });
    }
  }
  function fg() {
    te === 3 && (te = 0, pm(Za, rl), te = 4);
  }
  function yr() {
    if (te === 1) {
      te = 0;
      var t = rl, e = Za, l = Nl, a = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || a) {
        a = K.T, K.T = null;
        var n = it.p;
        it.p = 2;
        var u = Yt;
        Yt |= 4;
        try {
          Tu = Ji = !1, ym(e, t, l), l = Rr;
          var i = ho(t.containerInfo), f = l.focusedElem, g = l.selectionRange;
          if (i !== f && f && f.ownerDocument && mo(
            f.ownerDocument.documentElement,
            f
          )) {
            if (g !== null && Kc(f)) {
              var T = g.start, z = g.end;
              if (z === void 0 && (z = T), "selectionStart" in f)
                f.selectionStart = T, f.selectionEnd = Math.min(
                  z,
                  f.value.length
                );
              else {
                var U = f.ownerDocument || document, S = U && U.defaultView || window;
                if (S.getSelection) {
                  var O = S.getSelection(), Z = f.textContent.length, tt = Math.min(g.start, Z), pt = g.end === void 0 ? tt : Math.min(g.end, Z);
                  !O.extend && tt > pt && (i = pt, pt = tt, tt = i);
                  var E = oo(
                    f,
                    tt
                  ), b = oo(
                    f,
                    pt
                  );
                  if (E && b && (O.rangeCount !== 1 || O.anchorNode !== E.node || O.anchorOffset !== E.offset || O.focusNode !== b.node || O.focusOffset !== b.offset)) {
                    var M = U.createRange();
                    M.setStart(E.node, E.offset), O.removeAllRanges(), tt > pt ? (O.addRange(M), O.extend(b.node, b.offset)) : (M.setEnd(b.node, b.offset), O.addRange(M));
                  }
                }
              }
            }
            for (U = [], O = f; O = O.parentNode; )
              O.nodeType === 1 && U.push({
                element: O,
                left: O.scrollLeft,
                top: O.scrollTop
              });
            for (typeof f.focus == "function" && f.focus(), f = 0; f < U.length; f++) {
              var w = U[f];
              w.element.scrollLeft = w.left, w.element.scrollTop = w.top;
            }
          }
          Gn = !!jr, Rr = jr = null;
        } finally {
          Yt = u, it.p = n, K.T = a;
        }
      }
      t.current = e, te = 2;
    }
  }
  function br() {
    if (te === 2) {
      te = 0;
      var t = rl, e = Za, l = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || l) {
        l = K.T, K.T = null;
        var a = it.p;
        it.p = 2;
        var n = Yt;
        Yt |= 4;
        try {
          om(t, e.alternate, e);
        } finally {
          Yt = n, it.p = a, K.T = l;
        }
      }
      te = 3;
    }
  }
  function pr() {
    if (te === 4 || te === 3) {
      te = 0;
      var t = zn;
      zn = null, Et();
      var e = rl, l = Za, a = Nl, n = Mm, u = (a & 335544064) === a ? 10262 : 10256;
      if ((l.subtreeFlags & u) !== 0 || (l.flags & u) !== 0 ? te = 5 : (te = 0, Za = rl = null, Lm(e, e.pendingLanes)), u = e.pendingLanes, u === 0 && (ra = null), zc(a), l = l.stateNode, Ye && typeof Ye.onCommitFiberRoot == "function")
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
        l = K.T, u = it.p, it.p = 2, K.T = null;
        try {
          for (var i = e.onRecoverableError, f = 0; f < n.length; f++) {
            var g = n[f];
            i(g.value, {
              componentStack: g.stack
            });
          }
        } finally {
          K.T = l, it.p = u;
        }
      }
      if (n = Cn, i = An, An = null, n !== null && (Cn = null, i === null && (i = []), t !== null))
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
    return zn !== null && (zn.skipTransition(), zn = null), yr(), br(), pr(), Sr();
  }
  function Sr() {
    if (te !== 5) return !1;
    var t = rl, e = mr;
    mr = 0;
    var l = zc(Nl), a = K.T, n = it.p;
    try {
      it.p = 32 > l ? 32 : l, K.T = null, l = hr, hr = null;
      var u = rl, i = Nl;
      if (te = 0, Za = rl = null, Nl = 0, (Yt & 6) !== 0) throw Error(s(331));
      var f = Yt;
      if (Yt |= 4, Tm(u.current), Sm(
        u,
        u.current,
        i,
        l
      ), Yt = f, zu(0, !1), Ye && typeof Ye.onPostCommitFiberRoot == "function")
        try {
          Ye.onPostCommitFiberRoot(Kn, u);
        } catch {
        }
      return !0;
    } finally {
      it.p = n, K.T = a, Lm(t, e);
    }
  }
  function Ym(t, e, l) {
    e = Ie(l, e), e = Hs(t.stateNode, e, 2), t = ea(t, e, 2), t !== null && ($n(t, 2), xl(t));
  }
  function Vt(t, e, l) {
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
            ), $n(a, 2), xl(a));
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
    a !== null && a.delete(e), t.pingedLanes |= t.suspendedLanes & l, t.warmLanes &= ~l, kt === t && (At & l) === l && ((ae === 4 || ae === 3 && (At & 62914560) === At && 300 > vt() - Ii) && (Yt & 2) === 0 ? Rn(t, 0) : Wi |= l, On === At && (On = 0)), xl(t);
  }
  function qm(t, e) {
    e === 0 && (e = Nf()), t = Ca(t, e), t !== null && ($n(t, e), xl(t));
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
    return ot(t, e);
  }
  var wn = null, Un = null, Er = !1, ic = !1, Tr = !1, oa = 0;
  function xl(t) {
    t !== Un && t.next === null && (Un === null ? wn = Un = t : Un = Un.next = t), ic = !0, Er || (Er = !0, gg());
  }
  function zu(t, e) {
    if (!Tr && ic) {
      Tr = !0;
      do
        for (var l = !1, a = wn; a !== null; ) {
          if (t !== 0) {
            var n = a.pendingLanes;
            if (n === 0) var u = 0;
            else {
              var i = a.suspendedLanes, f = a.pingedLanes;
              u = (1 << 31 - qe(42 | t) + 1) - 1, u &= n & ~(i & ~f), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (l = !0, Qm(a, u));
          } else
            u = At, u = Wu(
              a,
              a === kt ? u : 0,
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
    for (var e = vt(), l = null, a = wn; a !== null; ) {
      var n = a.next, u = Xm(a, e);
      u === 0 ? (a.next = null, l === null ? wn = n : l.next = n, n === null && (Un = l)) : (l = a, (t !== 0 || (u & 3) !== 0) && (ic = !0)), a = n;
    }
    te !== 0 && te !== 5 || zu(t), oa !== 0 && (oa = 0);
  }
  function Xm(t, e) {
    for (var l = t.suspendedLanes, a = t.pingedLanes, n = t.expirationTimes, u = t.pendingLanes & -62914561; 0 < u; ) {
      var i = 31 - qe(u), f = 1 << i, g = n[i];
      g === -1 ? ((f & l) === 0 || (f & a) !== 0) && (n[i] = D0(f, e)) : g <= e && (t.expiredLanes |= f), u &= ~f;
    }
    if (e = kt, l = At, l = Wu(
      t,
      t === e ? l : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a = t.callbackNode, l === 0 || t === e && (Xt === 2 || Xt === 9) || t.cancelPendingCommit !== null)
      return a !== null && a !== null && x(a), t.callbackNode = null, t.callbackPriority = 0;
    if ((l & 3) === 0 || Jn(t, l)) {
      if (e = l & -l, e === t.callbackPriority) return e;
      switch (a !== null && x(a), zc(l)) {
        case 2:
        case 8:
          l = hl;
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
      return a = Vm.bind(null, t), l = ot(l, a), t.callbackPriority = e, t.callbackNode = l, e;
    }
    return a !== null && a !== null && x(a), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function Vm(t, e) {
    if (te !== 0 && te !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var l = t.callbackNode;
    if (uc() && t.callbackNode !== l)
      return null;
    var a = At;
    return a = Wu(
      t,
      t === kt ? a : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a === 0 ? null : (zm(t, a, e), Xm(t, vt()), t.callbackNode != null && t.callbackNode === l ? Vm.bind(null, t) : null);
  }
  function Qm(t, e) {
    if (uc()) return null;
    zm(t, e, !0);
  }
  function gg() {
    Cg(function() {
      (Yt & 6) !== 0 ? ot(
        ne,
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
                  var g = new FormData(n, i);
                  Rs(
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
                typeof u == "function" && (f.preventDefault(), g = new FormData(n, i), Rs(
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
  for (var xr = 0; xr < Fc.length; xr++) {
    var Mr = Fc[xr], bg = Mr.toLowerCase(), pg = Mr[0].toUpperCase() + Mr.slice(1);
    ul(
      bg,
      "on" + pg
    );
  }
  ul(yo, "onAnimationEnd"), ul(bo, "onAnimationIteration"), ul(po, "onAnimationStart"), ul("dblclick", "onDoubleClick"), ul("focusin", "onFocus"), ul("focusout", "onBlur"), ul(zv, "onTransitionRun"), ul(Cv, "onTransitionStart"), ul(Av, "onTransitionCancel"), ul(So, "onTransitionEnd"), ln("onMouseEnter", ["mouseout", "mouseover"]), ln("onMouseLeave", ["mouseout", "mouseover"]), ln("onPointerEnter", ["pointerout", "pointerover"]), ln("onPointerLeave", ["pointerout", "pointerover"]), Ma(
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
            var f = a[i], g = f.instance, T = f.currentTarget;
            if (f = f.listener, g !== u && n.isPropagationStopped())
              break t;
            u = f, n.currentTarget = T;
            try {
              u(n);
            } catch (z) {
              ri(z);
            }
            n.currentTarget = null, u = g;
          }
        else
          for (i = 0; i < a.length; i++) {
            if (f = a[i], g = f.instance, T = f.currentTarget, f = f.listener, g !== u && n.isPropagationStopped())
              break t;
            u = f, n.currentTarget = T;
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
  function Ot(t, e) {
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
              var g = i.tag;
              if ((g === 3 || g === 4) && i.stateNode.containerInfo === n)
                return;
              i = i.return;
            }
          for (; f !== null; ) {
            if (i = xa(f), i === null) return;
            if (g = i.tag, g === 5 || g === 6 || g === 26 || g === 27) {
              a = u = i;
              continue t;
            }
            f = f.parentNode;
          }
        }
        a = a.return;
      }
    Kf(function() {
      var T = u, z = wc(l), U = [];
      t: {
        var S = _o.get(t);
        if (S !== void 0) {
          var O = ii, Z = t;
          switch (t) {
            case "keypress":
              if (ni(l) === 0) break t;
            case "keydown":
            case "keyup":
              O = nv;
              break;
            case "focusin":
              Z = "focus", O = qc;
              break;
            case "focusout":
              Z = "blur", O = qc;
              break;
            case "beforeblur":
            case "afterblur":
              O = qc;
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
              O = kf;
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
            case yo:
            case bo:
            case po:
              O = k0;
              break;
            case So:
              O = ov;
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
              O = Wf;
              break;
            case "submit":
              O = cv;
              break;
            case "toggle":
            case "beforetoggle":
              O = vv;
          }
          var tt = (e & 4) !== 0, pt = !tt && (t === "scroll" || t === "scrollend"), E = tt ? S !== null ? S + "Capture" : null : S;
          tt = [];
          for (var b = T, M; b !== null; ) {
            var w = b;
            if (M = w.stateNode, w = w.tag, w !== 5 && w !== 26 && w !== 27 || M === null || E === null || (w = Wn(b, E), w != null && tt.push(
              Au(b, w, M)
            )), pt) break;
            b = b.return;
          }
          0 < tt.length && (S = new O(
            S,
            Z,
            null,
            l,
            z
          ), U.push({ event: S, listeners: tt }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (O = t === "mouseover" || t === "pointerover", S = t === "mouseout" || t === "pointerout", O && l !== Dc && (Z = l.relatedTarget || l.fromElement) && (xa(Z) || Z[Pa]))
            break t;
          (S || O) && (Z = z.window === z ? z : (O = z.ownerDocument) ? O.defaultView || O.parentWindow : window, S ? (O = l.relatedTarget || l.toElement, S = T, O = O ? xa(O) : null, O !== null && (pt = m(O), tt = O.tag, O !== pt || tt !== 5 && tt !== 27 && tt !== 6) && (O = null)) : (S = null, O = T), S !== O && (tt = kf, w = "onMouseLeave", E = "onMouseEnter", b = "mouse", (t === "pointerout" || t === "pointerover") && (tt = Wf, w = "onPointerLeave", E = "onPointerEnter", b = "pointer"), pt = S == null ? Z : Fn(S), M = O == null ? Z : Fn(O), Z = new tt(
            w,
            b + "leave",
            S,
            l,
            z
          ), Z.target = pt, Z.relatedTarget = M, w = null, xa(z) === T && (tt = new tt(
            E,
            b + "enter",
            O,
            l,
            z
          ), tt.target = M, tt.relatedTarget = pt, w = tt), pt = w, tt = S && O ? Rt(
            S,
            O,
            _g
          ) : null, S !== null && $m(
            U,
            Z,
            S,
            tt,
            !1
          ), O !== null && pt !== null && $m(
            U,
            pt,
            O,
            tt,
            !0
          )));
        }
        t: {
          if (S = T ? Fn(T) : window, O = S.nodeName && S.nodeName.toLowerCase(), O === "select" || O === "input" && S.type === "file")
            var W = uo;
          else if (ao(S))
            if (io)
              W = xv;
            else {
              W = Tv;
              var jt = Ev;
            }
          else
            O = S.nodeName, !O || O.toLowerCase() !== "input" || S.type !== "checkbox" && S.type !== "radio" ? T && Rc(T.elementType) && (W = uo) : W = Nv;
          if (W && (W = W(t, T))) {
            no(
              U,
              W,
              l,
              z
            );
            break t;
          }
          jt && jt(t, S, T);
        }
        switch (jt = T ? Fn(T) : window, t) {
          case "focusin":
            (ao(jt) || jt.contentEditable === "true") && (rn = jt, Jc = T, uu = null);
            break;
          case "focusout":
            uu = Jc = rn = null;
            break;
          case "mousedown":
            $c = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            $c = !1, vo(U, l, z);
            break;
          case "selectionchange":
            if (Ov) break;
          case "keydown":
          case "keyup":
            vo(U, l, z);
        }
        var lt;
        if (Xc)
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
          sn ? eo(t, l) && (ct = "onCompositionEnd") : t === "keydown" && l.keyCode === 229 && (ct = "onCompositionStart");
        ct && (If && l.locale !== "ko" && (sn || ct !== "onCompositionStart" ? ct === "onCompositionEnd" && sn && (lt = Jf()) : (Kl = z, Hc = "value" in Kl ? Kl.value : Kl.textContent, sn = !0)), jt = sc(T, ct), 0 < jt.length && (ct = new Ff(
          ct,
          t,
          null,
          l,
          z
        ), U.push({ event: ct, listeners: jt }), lt ? ct.data = lt : (lt = lo(l), lt !== null && (ct.data = lt)))), (lt = yv ? bv(t, l) : pv(t, l)) && (ct = sc(T, "onBeforeInput"), 0 < ct.length && (jt = new Ff(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          z
        ), U.push({
          event: jt,
          listeners: ct
        }), jt.data = lt)), yg(
          U,
          t,
          T,
          l,
          z
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
      var f = l, g = f.alternate, T = f.stateNode;
      if (f = f.tag, g !== null && g === a) break;
      f !== 5 && f !== 26 && f !== 27 || T === null || (g = T, n ? (T = Wn(l, u), T != null && i.unshift(
        Au(l, T, g)
      )) : n || (T = Wn(l, u), T != null && i.push(
        Au(l, T, g)
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
  function Qt(t, e, l, a, n, u) {
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
          typeof u == "function" && (l === "formAction" ? (e !== "input" && Qt(t, e, "name", n.name, n, null), Qt(
            t,
            e,
            "formEncType",
            n.formEncType,
            n,
            null
          ), Qt(
            t,
            e,
            "formMethod",
            n.formMethod,
            n,
            null
          ), Qt(
            t,
            e,
            "formTarget",
            n.formTarget,
            n,
            null
          )) : (Qt(t, e, "encType", n.encType, n, null), Qt(t, e, "method", n.method, n, null), Qt(t, e, "target", n.target, n, null)));
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
        a != null && Ot("scroll", t);
        return;
      case "onScrollEnd":
        a != null && Ot("scrollend", t);
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
        Ot("beforetoggle", t), Ot("toggle", t), ti(t, "popover", a);
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
    Lt = !0;
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
        if (typeof a == "string") nn(t, a);
        else if (typeof a == "number" || typeof a == "bigint")
          nn(t, "" + a);
        else return;
        break;
      case "onScroll":
        a != null && Ot("scroll", t);
        return;
      case "onScrollEnd":
        a != null && Ot("scrollend", t);
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
        if (!wf.hasOwnProperty(l))
          t: {
            if (l[0] === "o" && l[1] === "n" && (n = l.endsWith("Capture"), u = l.slice(2, n ? l.length - 7 : void 0), e = t[De] || null, e = e != null ? e[l] : null, typeof e == "function" && t.removeEventListener(u, e, n), typeof a == "function")) {
              typeof e != "function" && e !== null && (l in t ? t[l] = null : t.hasAttribute(l) && t.removeAttribute(l)), t.addEventListener(u, a, n);
              break t;
            }
            Lt = !0, l in t ? t[l] = a : a === !0 ? t.setAttribute(l, "") : ti(t, l, a);
          }
        return;
    }
    Lt = !0;
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
        Ot("error", t), Ot("load", t);
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
                  Qt(t, e, u, i, l, null);
              }
          }
        n && Qt(t, e, "srcSet", l.srcSet, l, null), a && Qt(t, e, "src", l.src, l, null);
        return;
      case "input":
        Ot("invalid", t);
        var f = u = i = n = null, g = null, T = null;
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
                  Qt(t, e, a, z, l, null);
              }
          }
        qf(
          t,
          u,
          f,
          g,
          T,
          i,
          n,
          !1
        );
        return;
      case "select":
        Ot("invalid", t), a = i = u = null;
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
                Qt(t, e, n, f, l, null);
            }
        e = u, l = i, t.multiple = !!a, e != null ? an(t, !!a, e, !1) : l != null && an(t, !!a, l, !0);
        return;
      case "textarea":
        Ot("invalid", t), u = n = a = null;
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
                Qt(t, e, i, f, l, null);
            }
        Xf(t, a, n, u);
        return;
      case "option":
        for (g in l)
          l.hasOwnProperty(g) && (a = l[g], a != null) && (g === "selected" ? t.selected = a && typeof a != "function" && typeof a != "symbol" : Qt(t, e, g, a, l, null));
        return;
      case "dialog":
        Ot("beforetoggle", t), Ot("toggle", t), Ot("cancel", t), Ot("close", t);
        break;
      case "iframe":
      case "object":
        Ot("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < Cu.length; a++)
          Ot(Cu[a], t);
        break;
      case "image":
        Ot("error", t), Ot("load", t);
        break;
      case "details":
        Ot("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        Ot("error", t), Ot("load", t);
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
                Qt(t, e, T, a, l, null);
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
      l.hasOwnProperty(f) && (a = l[f], a != null && Qt(t, e, f, a, l, null));
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
        var n = null, u = null, i = null, f = null, g = null, T = null, z = null;
        for (O in l) {
          var U = l[O];
          if (l.hasOwnProperty(O) && U != null)
            switch (O) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                g = U;
              default:
                a.hasOwnProperty(O) || Qt(t, e, O, null, a, U);
            }
        }
        for (var S in a) {
          var O = a[S];
          if (U = l[S], a.hasOwnProperty(S) && (O != null || U != null))
            switch (S) {
              case "type":
                O !== U && (Lt = !0), u = O;
                break;
              case "name":
                O !== U && (Lt = !0), n = O;
                break;
              case "checked":
                O !== U && (Lt = !0), T = O;
                break;
              case "defaultChecked":
                O !== U && (Lt = !0), z = O;
                break;
              case "value":
                O !== U && (Lt = !0), i = O;
                break;
              case "defaultValue":
                O !== U && (Lt = !0), f = O;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (O != null)
                  throw Error(s(137, e));
                break;
              default:
                O !== U && Qt(
                  t,
                  e,
                  S,
                  O,
                  a,
                  U
                );
            }
        }
        Ac(
          t,
          i,
          f,
          g,
          T,
          z,
          u,
          n
        );
        return;
      case "select":
        O = i = f = S = null;
        for (u in l)
          if (g = l[u], l.hasOwnProperty(u) && g != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                O = g;
              default:
                a.hasOwnProperty(u) || Qt(
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
                u !== g && (Lt = !0), S = u;
                break;
              case "defaultValue":
                u !== g && (Lt = !0), f = u;
                break;
              case "multiple":
                u !== g && (Lt = !0), i = u;
              default:
                u !== g && Qt(
                  t,
                  e,
                  n,
                  u,
                  a,
                  g
                );
            }
        e = f, l = i, a = O, S != null ? an(t, !!l, S, !1) : !!a != !!l && (e != null ? an(t, !!l, e, !0) : an(t, !!l, l ? [] : "", !1));
        return;
      case "textarea":
        O = S = null;
        for (f in l)
          if (n = l[f], l.hasOwnProperty(f) && n != null && !a.hasOwnProperty(f))
            switch (f) {
              case "value":
                break;
              case "children":
                break;
              default:
                Qt(t, e, f, null, a, n);
            }
        for (i in a)
          if (n = a[i], u = l[i], a.hasOwnProperty(i) && (n != null || u != null))
            switch (i) {
              case "value":
                n !== u && (Lt = !0), S = n;
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
                n !== u && Qt(t, e, i, n, a, u);
            }
        Gf(t, S, O);
        return;
      case "option":
        for (var Z in l)
          S = l[Z], l.hasOwnProperty(Z) && S != null && !a.hasOwnProperty(Z) && (Z === "selected" ? t.selected = !1 : Qt(
            t,
            e,
            Z,
            null,
            a,
            S
          ));
        for (g in a)
          S = a[g], O = l[g], a.hasOwnProperty(g) && S !== O && (S != null || O != null) && (g === "selected" ? (S !== O && (Lt = !0), t.selected = S && typeof S != "function" && typeof S != "symbol") : Qt(
            t,
            e,
            g,
            S,
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
          S = l[tt], l.hasOwnProperty(tt) && S != null && !a.hasOwnProperty(tt) && Qt(t, e, tt, null, a, S);
        for (T in a)
          if (S = a[T], O = l[T], a.hasOwnProperty(T) && S !== O && (S != null || O != null))
            switch (T) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (S != null)
                  throw Error(s(137, e));
                break;
              default:
                Qt(
                  t,
                  e,
                  T,
                  S,
                  a,
                  O
                );
            }
        return;
      default:
        if (Rc(e)) {
          for (var pt in l)
            S = l[pt], l.hasOwnProperty(pt) && S !== void 0 && !a.hasOwnProperty(pt) && Ar(
              t,
              e,
              pt,
              void 0,
              a,
              S
            );
          for (z in a)
            S = a[z], O = l[z], !a.hasOwnProperty(z) || S === O || S === void 0 && O === void 0 || Ar(
              t,
              e,
              z,
              S,
              a,
              O
            );
          return;
        }
    }
    for (var E in l)
      S = l[E], l.hasOwnProperty(E) && S != null && !a.hasOwnProperty(E) && Qt(t, e, E, null, a, S);
    for (U in a)
      S = a[U], O = l[U], !a.hasOwnProperty(U) || S === O || S == null && O == null || Qt(t, e, U, S, a, O);
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
            var g = l[a], T = g.startTime;
            if (T > f) break;
            var z = g.transferSize, U = g.initiatorType;
            z && Wm(U) && (g = g.responseEnd, i += z * (g < f ? 1 : (f - T) / (g - T)));
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
    ).createElement(t), l[be] = a, l[De] = e, Te(l, t, e), me(l), l;
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
            t.removeChild(n), Xn(e);
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
  function wg(t, e, l, a, n, u, i, f, g) {
    var T = e.nodeType === 9 ? e : e.ownerDocument;
    try {
      var z = T.startViewTransition({
        update: function() {
          var S = T.defaultView, O = S.navigation && S.navigation.transition, Z = T.fonts.status;
          a();
          var tt = [];
          if (Z === "loaded" && (Rg(T), T.fonts.status === "loading" && tt.push(T.fonts.ready)), Z = tt.length, t !== null)
            for (var pt = t.suspenseyImages, E = 0, b = 0; b < pt.length; b++) {
              var M = pt[b];
              if (!M.complete) {
                var w = M.getBoundingClientRect();
                if (0 < w.bottom && 0 < w.right && w.top < S.innerHeight && w.left < S.innerWidth) {
                  if (E += Oh(M), E > oc) {
                    tt.length = Z;
                    break;
                  }
                  M = new Promise(
                    Dg.bind(M)
                  ), tt.push(M);
                }
              }
            }
          if (0 < tt.length)
            return S = Promise.race([
              Promise.all(tt),
              new Promise(function(W) {
                return setTimeout(W, 500);
              })
            ]).then(n, n), (O ? Promise.allSettled([O.finished, S]) : S).then(u, u);
          if (n(), O)
            return O.finished.then(
              u,
              u
            );
          u();
        },
        types: l
      });
      T.__reactViewTransition = z;
      var U = [];
      return z.ready.then(
        function() {
          for (var S = T.documentElement.getAnimations({
            subtree: !0
          }), O = 0; O < S.length; O++) {
            var Z = S[O], tt = Z.effect, pt = tt.pseudoElement;
            if (pt != null && pt.startsWith("::view-transition")) {
              U.push(Z), Z = tt.getKeyframes();
              for (var E = pt = void 0, b = !0, M = 0; M < Z.length; M++) {
                var w = Z[M], W = w.width;
                if (pt === void 0) pt = W;
                else if (pt !== W) {
                  b = !1;
                  break;
                }
                if (W = w.height, E === void 0) E = W;
                else if (E !== W) {
                  b = !1;
                  break;
                }
                delete w.width, delete w.height, w.transform === "none" && delete w.transform;
              }
              b && pt !== void 0 && E !== void 0 && (tt.setKeyframes(Z), b = getComputedStyle(
                tt.target,
                tt.pseudoElement
              ), b.width !== pt || b.height !== E) && (b = Z[0], b.width = pt, b.height = E, b = Z[Z.length - 1], b.width = pt, b.height = E, tt.setKeyframes(Z));
            }
          }
          i();
        },
        function(S) {
          T.__reactViewTransition === z && (T.__reactViewTransition = null);
          try {
            typeof S == "object" && S !== null && S.name === "InvalidStateError" && (S.message === "View transition was skipped because document visibility state is hidden." || S.message === "Skipping view transition because document visibility state has become hidden." || S.message === "Skipping view transition because viewport size changed." || S.message === "Transition was aborted because of invalid state") && (S = null), S !== null && g(S);
          } finally {
            a(), n(), i();
          }
        }
      ), z.finished.finally(function() {
        for (var S = 0; S < U.length; S++)
          U[S].cancel();
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
    return e = typeof e == "number" ? { duration: e } : J({}, e), e.pseudoElement = this._selector, this._scope.animate(t, e);
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
        l != null && typeof l != "boolean" && l.once === !0 && (f = function(g) {
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
    return $(t).removeEventListener(
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
    var e = j(
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
      fh,
      t,
      void 0,
      void 0
    );
  };
  function fh(t, e) {
    return t.tag === 6 ? !1 : (t = $(t), $g(t, e));
  }
  $e.prototype.focusLast = function(t) {
    var e = [];
    v(
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
    t !== null && (t = $(t), t = ju(t).activeElement, t !== null && v(
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
    return t.tag === 6 || (t = $(t), e.observe(t)), !1;
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
    return t.tag === 6 || (t = $(t), e.unobserve(t)), !1;
  }
  var fl = [], Lr = !1;
  function qg(t, e, l) {
    fl.push({
      fragmentInstance: t,
      observer: e,
      instance: l
    }), Lr || (Lr = !0, kg(function() {
      Lr = !1;
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
      t = $(t), e.push.apply(e, t.getClientRects());
    return !1;
  }
  $e.prototype.getRootNode = function(t) {
    var e = j(
      this._fragmentFiber
    );
    return e === null ? this : $(e).getRootNode(t);
  }, $e.prototype.compareDocumentPosition = function(t) {
    var e = j(
      this._fragmentFiber
    );
    if (e === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var l = [];
    v(
      this._fragmentFiber.child,
      !1,
      Hr,
      l,
      void 0,
      void 0
    );
    var a = $(e);
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
      return l === t ? n = Node.DOCUMENT_POSITION_CONTAINS : a & Node.DOCUMENT_POSITION_CONTAINED_BY && (l = P(e)[1], l === null ? n = Node.DOCUMENT_POSITION_PRECEDING : (t = $(l).compareDocumentPosition(
        t
      ), n = t === 0 || t & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), n |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    e = $(l[0]), n = $(l[l.length - 1]);
    var u = B(this._fragmentFiber) ? e.parentElement : a;
    if (u == null)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    a = u.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_CONTAINED_BY, u = u.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var i = e.compareDocumentPosition(t), f = n.compareDocumentPosition(t), g = i & Node.DOCUMENT_POSITION_CONTAINED_BY || f & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return f = a && u && i & Node.DOCUMENT_POSITION_FOLLOWING && f & Node.DOCUMENT_POSITION_PRECEDING, e = a && e === t || u && n === t || g || f ? Node.DOCUMENT_POSITION_CONTAINED_BY : !a && e === t || !u && n === t ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : i, e & Node.DOCUMENT_POSITION_DISCONNECTED || e & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || Xg(
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
    return t & Node.DOCUMENT_POSITION_PRECEDING ? ((e = !!u) && !(e = u === l) && (e = Rt(
      l,
      u,
      St
    ), e === null ? e = !1 : (v(
      e,
      !0,
      Q,
      u,
      l
    ), u = dt, dt = null, e = u !== null)), e) : t & Node.DOCUMENT_POSITION_FOLLOWING ? ((e = !!u) && !(e = u === a) && (e = Rt(
      a,
      u,
      St
    ), e === null ? e = !1 : (v(
      e,
      !0,
      zt,
      u,
      a
    ), u = dt, V = dt = null, e = u !== null)), e) : !1;
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
    v(
      this._fragmentFiber.child,
      !1,
      Hr,
      e,
      void 0,
      void 0
    );
    var l = t !== !1;
    if (e.length === 0) {
      var a = P(
        this._fragmentFiber
      );
      if (a = l ? a[1] || a[0] || j(this._fragmentFiber) : a[0] || a[1], a === null) return;
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
          Bn(n.optionsOrUseCapture)
        );
      }
    t.nodeType !== 3 && (l = e._observers, l !== null && l.forEach(function(u) {
      for (var i = 0, f = 0; f < fl.length; f++) {
        var g = fl[f];
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
  var Xr = null;
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
      l.hasOwnProperty(a) && n != null && Qt(t, e, a, null, Ng, n);
    }
    l.dangerouslySetInnerHTML != null && (t.textContent = ""), t.onclick === vl && (t.onclick = null), Pu(t);
  }
  function Vr(t) {
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
  var Xl = it.d;
  it.d = {
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
      if (!(nl.has(u) || (t = J(
        {
          rel: "preload",
          href: e === "image" && l && l.imageSrcSet ? void 0 : t,
          as: e
        },
        l
      ), nl.set(u, t), a.querySelector(n) !== null || e === "style" && a.querySelector(Du(u)) || e === "script" && a.querySelector(wu(u))))) {
        var i = a.createElement("link");
        Te(i, "link", t), e === "style" && (i[Iu] = !0, i.onload = i.onerror = function() {
          Rf(i);
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
      if (!nl.has(u) && (t = J({ rel: "modulepreload", href: t }, e), nl.set(u, t), l.querySelector(n) === null)) {
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
        var f = { loading: 0, preload: null };
        if (i = a.querySelector(
          Du(u)
        ))
          f.loading = 5;
        else {
          t = J(
            { rel: "stylesheet", href: t, "data-precedence": e },
            l
          ), (l = nl.get(u)) && Qr(t, l);
          var g = i = a.createElement("link");
          me(g), Te(g, "link", t), g._p = new Promise(function(T, z) {
            g.onload = T, g.onerror = z;
          }), g.addEventListener("load", function() {
            f.loading |= 1;
          }), g.addEventListener("error", function() {
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
    var l = Hn;
    if (l && t) {
      var a = en(l).hoistableScripts, n = Yn(t), u = a.get(n);
      u || (u = l.querySelector(wu(n)), u || (t = J({ src: t, async: !0 }, e), (e = nl.get(n)) && Zr(t, e), u = l.createElement("script"), me(u), Te(u, "link", t), l.head.appendChild(u)), u = {
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
      u || (u = l.querySelector(wu(n)), u || (t = J({ src: t, async: !0, type: "module" }, e), (e = nl.get(n)) && Zr(t, e), u = l.createElement("script"), me(u), Te(u, "link", t), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function _h(t, e, l, a) {
    var n = (n = Ct.current) ? Ru(n) : null;
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
    return J({}, t, {
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
      e = t.createElement("link"), e[Iu] = !0, e.onload = e.onerror = Rf.bind(null, e), Te(e, "link", l), me(e), t.head.appendChild(e);
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
          var n = J({}, l, {
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
          a = Eh(l), (n = nl.get(n)) && Qr(a, n), u = (t.ownerDocument || t).createElement("link"), me(u);
          var i = u;
          return i._p = new Promise(function(f, g) {
            i.onload = f, i.onerror = g;
          }), Te(u, "link", a), e.state.loading |= 4, rc(u, l.precedence, t), e.instance = u;
        case "script":
          return u = Yn(l.src), (n = t.querySelector(
            wu(u)
          )) ? (e.instance = n, me(n), n) : (a = l, (n = nl.get(u)) && (a = J({}, l), Zr(a, n)), t = t.ownerDocument || t, n = t.createElement("script"), me(n), Te(n, "link", a), t.head.appendChild(n), e.instance = n);
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
      if (!(u[kn] || u[be] || t === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
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
        var n = Ln(a.href), u = e.querySelector(
          Du(n)
        );
        if (u) {
          e = u._p, e !== null && typeof e == "object" && typeof e.then == "function" && (t.count++, t = Uu.bind(t), e.then(t, t)), l.state.loading |= 4, l.instance = u, me(u);
          return;
        }
        u = e.ownerDocument || e, a = Eh(a), (n = nl.get(n)) && Qr(a, n), u = u.createElement("link"), me(u);
        var i = u;
        i._p = new Promise(function(f, g) {
          i.onload = f, i.onerror = g;
        }), Te(u, "link", a), l.instance = u;
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
  var qn = {
    $$typeof: Nt,
    Provider: null,
    Consumer: null,
    _currentValue: ee,
    _currentValue2: ee,
    _threadCount: 0
  };
  function oy(t, e, l, a, n, u, i, f, g) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Mc(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Mc(0), this.hiddenUpdates = Mc(null), this.identifierPrefix = a, this.onUncaughtError = n, this.onCaughtError = u, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = g, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Ah(t, e, l, a, n, u, i, f, g, T, z, U) {
    return t = new oy(
      t,
      e,
      l,
      i,
      g,
      T,
      z,
      U,
      f
    ), e = 1, u === !0 && (e |= 24), u = we(3, null, null, e), t.current = u, u.stateNode = t, e = cs(), e.refCount++, t.pooledCache = e, e.refCount++, u.memoizedState = {
      element: a,
      isDehydrated: l,
      cache: e
    }, os(u), t;
  }
  function jh(t) {
    return t ? (t = dn, t) : dn;
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
  var Gn = !0;
  function dy(t, e, l, a) {
    var n = K.T;
    K.T = null;
    var u = it.p;
    try {
      it.p = 2, $r(t, e, l, a);
    } finally {
      it.p = u, K.T = n;
    }
  }
  function my(t, e, l, a) {
    var n = K.T;
    K.T = null;
    var u = it.p;
    try {
      it.p = 8, $r(t, e, l, a);
    } finally {
      it.p = u, K.T = n;
    }
  }
  function $r(t, e, l, a) {
    if (Gn) {
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
          var u = tn(n);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var i = Na(u.pendingLanes);
                  if (i !== 0) {
                    var f = u;
                    for (f.pendingLanes |= 2, f.entangledLanes |= 2; i; ) {
                      var g = 1 << 31 - qe(i);
                      f.entanglements[1] |= g, i &= ~g;
                    }
                    xl(u), (Yt & 6) === 0 && (Pi = vt() + 500, zu(0));
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
          if (t = y(e), t !== null) return t;
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
        switch (oe()) {
          case ne:
            return 2;
          case hl:
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
    }, e !== null && (e = tn(e), e !== null && wh(e)), t) : (t.eventSystemFlags |= a, e = t.targetContainers, n !== null && e.indexOf(n) === -1 && e.push(n), t);
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
          if (e = y(l), e !== null) {
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
        return e = tn(l), e !== null && wh(e), t.blockedOn = l, !1;
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
          var u = tn(l);
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
  function Xn(t) {
    function e(g) {
      return gc(g, t);
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
      Rh(t.current, 2, null, t, null, null), lc(), e[Pa] = null;
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
  it.findDOMNode = function(t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function" ? Error(s(188)) : (t = Object.keys(t).join(","), Error(s(268, t)));
    return t = A(e), t = t !== null ? N(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var yy = {
    bundleType: 0,
    version: "19.3.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: K,
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
    ), t[Pa] = e.current, zr(t), new Ir(e);
  }, qu.hydrateRoot = function(t, e, l) {
    if (!h(t)) throw Error(s(299));
    var a = !1, n = "", u = jd, i = Rd, f = Dd, g = null;
    return l != null && (l.unstable_strictMode === !0 && (a = !0), l.identifierPrefix !== void 0 && (n = l.identifierPrefix), l.onUncaughtError !== void 0 && (u = l.onUncaughtError), l.onCaughtError !== void 0 && (i = l.onCaughtError), l.onRecoverableError !== void 0 && (f = l.onRecoverableError), l.formState !== void 0 && (g = l.formState)), e = Ah(
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
      f,
      Gh
    ), e.context = jh(null), l = e.current, a = Je(), a = Oc(a), n = ta(a), n.callback = null, ea(l, n, a), l = a, e.current.lanes = l, $n(e, l), xl(e), t[Pa] = e.current, zr(t), new bc(e);
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
function Cy(c, o) {
  const r = Number.isFinite(o) && o > 0 ? o : 1 / 0, s = c.filter((y) => Number.isFinite(y.start) && y.start >= 0 && y.start < r).slice().sort((y, _) => y.start - _.start);
  let h = r;
  const m = new Array(s.length);
  for (let y = s.length - 1; y >= 0; y -= 1)
    y + 1 < s.length && s[y + 1].start > s[y].start && (h = s[y + 1].start), m[y] = h;
  return s.flatMap((y, _) => {
    const C = m[_], A = Math.min(y.end ?? C, r);
    return !Number.isFinite(A) || A <= y.start ? [] : [{ start: y.start, end: A, text: y.label ?? "" }];
  });
}
function Ay(c, o) {
  return !Number.isFinite(o) || o < 0 ? [] : c.filter((r) => r.start <= o && o < r.end && r.text.trim()).map((r) => r.text);
}
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
function jy(c, o, r) {
  return Number.isFinite(c) ? c * (o === 1 ? 16 : o === 2 ? r : 1) : 0;
}
function Ry(c, o) {
  return Math.max(0, Math.min(100, c - Math.max(-240, Math.min(240, o)) * 0.08));
}
function Dy(c, o) {
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
function wy(c, o = 0) {
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
class Uy {
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
    const y = this.generation;
    this.context ??= this.createContext();
    const _ = this.context, C = _.resume();
    C.catch(() => {
    });
    const A = o.audioSrc || r, N = JSON.stringify([A, o.startSample, o.endSample, o.sampleRate]);
    try {
      let v = this.cache?.url === N ? this.cache.buffer : null;
      if (!v) {
        const $ = new AbortController();
        this.abort = $;
        const dt = await fetch(A, { signal: $.signal, credentials: h });
        if (!dt.ok) throw new Error(`Could not load loop audio (HTTP ${dt.status})`);
        const V = 128 * 1024 * 1024;
        if (Number(dt.headers.get("Content-Length")) > V) throw new Error("Loop audio exceeds 128 MiB");
        const Q = await dt.arrayBuffer();
        if (Q.byteLength > V) throw new Error("Loop audio exceeds 128 MiB");
        if (v = await _.decodeAudioData(Q), y !== this.generation) return !1;
        this.cache = { url: N, buffer: v };
      }
      if (await C, y !== this.generation) return !1;
      const j = o.audioSrc ? 0 : m.start, B = j + m.duration, P = Math.max(2 / v.sampleRate, 2e-3);
      if (!Number.isFinite(v.duration) || v.duration <= j || B > v.duration + P || o.audioSrc && Math.abs(v.duration - m.duration) > P)
        throw new Error("Loop audio duration does not match the reported sample boundaries");
      const Y = _.createBufferSource();
      return Y.buffer = v, Y.loop = !0, Y.loopStart = j, Y.loopEnd = Math.min(B, v.duration), Y.connect(_.destination), this.start = m.start, this.length = Y.loopEnd - j, this.offset = d0(s, m.start, m.start + this.length) - m.start, this.anchor = _.currentTime, Y.start(this.anchor, j + this.offset), this.node = Y, !0;
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
function By(c, o, r, s, h) {
  if (h <= 0 || s <= 0) return { start: 0, end: 0 };
  const m = Math.max(0, c - r), y = Math.max(0, c + o - r), _ = pa(m / s, 0, h), C = pa(y / s, _, h);
  return { start: _, end: C };
}
function t0(c, o) {
  if (typeof c != "number" || !Number.isFinite(c)) throw new RangeError(`${o} must be finite`);
  return c;
}
function Hy(c, o) {
  const r = o * c.source_audio.sample_rate, s = c.beats;
  let h = 0, m = s.length;
  for (; h < m; ) {
    const y = h + m >>> 1;
    s[y].frame <= r ? h = y + 1 : m = y;
  }
  return Math.max(0, Math.min(s.length - 2, h - 1));
}
function h0(c, o, r = 0.15) {
  if (t0(o, "source seconds"), t0(r, "tolerance") < 0 || r > 60) throw new RangeError("Invalid snap tolerance");
  let s, h;
  if (c.mode === "fixed")
    s = Math.round((o - c.firstBeatSeconds) * c.bpm / 60), h = c.firstBeatSeconds + s * 60 / c.bpm;
  else {
    const y = c.beats, _ = c.source_audio.sample_rate, C = Hy(c, o), A = [y[C], y[C + 1]].reduce((N, v) => Math.abs(N.frame / _ - o) <= Math.abs(v.frame / _ - o) ? N : v);
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
function Ly(c, o, r, s = 2e3) {
  if (!(Number.isFinite(o) && Number.isFinite(r) && r > o)) return [];
  const h = Math.max(1, Math.min(2e3, Math.floor(s)));
  if (c.mode === "variable") {
    const N = c.beats.filter((j) => j.frame / c.source_audio.sample_rate >= o && j.frame / c.source_audio.sample_rate <= r), v = Math.max(1, Math.ceil(N.length / h));
    return N.filter((j, B) => B % v === 0).map((j) => ({
      time: j.frame / c.source_audio.sample_rate,
      label: `Observed beat ${j.beat}`,
      emphasis: j.beat === c.origin_beat
    }));
  }
  const m = Math.max(Math.ceil((o - c.firstBeatSeconds) * c.bpm / 60), Math.ceil(-c.firstBeatSeconds * c.bpm / 60)), y = Math.floor((r - c.firstBeatSeconds) * c.bpm / 60), _ = Math.max(0, y - m + 1), C = Math.max(1, Math.ceil(_ / h)), A = [];
  for (let N = m; N <= y && A.length < h; N += C) A.push({
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
  const y = s.minimumDuration ?? 0;
  if (y < 0) throw new RangeError("minimumDuration must be nonnegative");
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
    const N = C ? c.end - y : m;
    if (N < h) throw new RangeError("No valid start fits within the parent bounds");
    return { ...c, start: Math.min(_, N) };
  }
  if (!C) throw new RangeError("This event has no editable end");
  if (c.start + y > m) throw new RangeError("No valid end fits inside the parent bounds");
  return { ...c, end: Math.max(c.start + y, _) };
}
function l0(c, o, r) {
  const s = c.parentId ? r.parents?.find((_) => _.id === c.parentId) : null, h = o.filter((_) => _.id !== c.id && (_.parentId ?? "") === (c.parentId ?? "")).sort((_, C) => _.start - C.start), m = h.filter((_) => _.start <= c.start).slice(-1)[0], y = h.find((_) => _.start > c.start);
  return {
    duration: r.duration,
    bounds: s ? { start: s.start, end: s.end } : void 0,
    previousEnd: m ? m.end ?? m.start : void 0,
    nextStart: y?.start,
    clock: r.clock,
    snap: r.snap,
    toleranceSeconds: r.toleranceSeconds,
    minimumDuration: 1e-3
  };
}
function Yy(c) {
  const { items: o, kind: r, duration: s, clock: h, selectedId: m, onSelect: y, onEdit: _ } = c, C = c.editable === !0 && typeof _ == "function", [A, N] = D.useState(null), v = D.useRef(null), j = D.useRef(null), B = (V) => `${Math.max(0, Math.min(100, V * 100 / Math.max(s, 1e-9)))}%`;
  function P(V, Q, zt) {
    if (!C || V.button !== 0) return;
    const St = V.currentTarget.closest(".rts-track");
    if (!St) return;
    const Rt = St.getBoundingClientRect().width;
    !Number.isFinite(Rt) || Rt <= 0 || (v.current = { id: Q.id, edge: zt, x: V.clientX, origin: Q, width: Rt }, j.current = Q, V.currentTarget.setPointerCapture(V.pointerId), V.stopPropagation(), V.preventDefault(), y?.(Q.id));
  }
  function Y(V) {
    const Q = v.current;
    if (!Q || !C) return;
    const zt = (Q.edge === "end" ? Q.origin.end ?? Q.origin.start : Q.origin.start) + (V.clientX - Q.x) * s / Q.width;
    try {
      j.current = e0(Q.origin, Q.edge, zt, l0(Q.origin, o, c)), N(j.current);
    } catch {
    }
    V.stopPropagation();
  }
  function $(V, Q = !1) {
    const zt = v.current;
    zt && (v.current = null, !Q && j.current && _ && (j.current.start !== zt.origin.start || j.current.end !== zt.origin.end) && _(j.current), j.current = null, N(null), V.stopPropagation());
  }
  function dt(V, Q, zt) {
    if (!C || V.key !== "ArrowLeft" && V.key !== "ArrowRight") return;
    V.preventDefault(), V.stopPropagation();
    const St = (V.key === "ArrowRight" ? 1 : -1) * (V.shiftKey ? 1e-3 : 0.01), Rt = zt === "end" ? Q.end ?? Q.start : Q.start;
    try {
      _?.(e0(Q, zt, Rt + St, l0(Q, o, c)));
    } catch {
    }
  }
  return /* @__PURE__ */ d.jsx("div", { className: `rts-editable-timing rts-timing-${r}`, role: "group", "aria-label": `${r} timings`, children: o.filter((V) => Number.isFinite(V.start) && V.start >= 0 && V.start <= s).map((V) => {
    const Q = A?.id === V.id ? A : V, zt = Q.end !== void 0 ? Math.max(0.1, (Q.end - Q.start) * 100 / s) : 0.12, St = h ? h0(h, Q.start, c.toleranceSeconds ?? 0.15) : null, Rt = `${V.label} at ${Sa(Q.start)}${St ? `, ${St.withinTolerance ? "near" : "off"} ${St.mode} beat ${St.beat}, signed gap ${St.errorMilliseconds.toFixed(1)} ms` : ""}`;
    return /* @__PURE__ */ d.jsxs(
      "div",
      {
        className: `rts-timing-region ${m === V.id ? "is-selected" : ""} ${V.className ?? ""}`,
        style: { left: B(Q.start), width: `${zt}%` },
        children: [
          /* @__PURE__ */ d.jsx(
            "button",
            {
              type: "button",
              className: `rts-timing-handle rts-timing-main ${St?.withinTolerance ? "is-matched" : ""}`,
              "aria-label": `Move ${Rt}`,
              title: Rt,
              "aria-pressed": m === V.id,
              onClick: (J) => {
                J.stopPropagation(), y?.(V.id);
              },
              onPointerDown: (J) => P(J, V, "move"),
              onPointerMove: Y,
              onPointerUp: $,
              onPointerCancel: (J) => $(J, !0),
              onKeyDown: (J) => dt(J, V, "move"),
              children: V.label
            }
          ),
          C && Q.end !== void 0 && /* @__PURE__ */ d.jsx(
            "button",
            {
              type: "button",
              className: "rts-timing-end",
              "aria-label": `Resize end of ${V.label}`,
              title: "Resize end · arrows: 10 ms, Shift: 1 ms",
              onPointerDown: (J) => P(J, V, "end"),
              onPointerMove: Y,
              onPointerUp: $,
              onPointerCancel: (J) => $(J, !0),
              onKeyDown: (J) => dt(J, V, "end")
            }
          ),
          C && Q.end !== void 0 && /* @__PURE__ */ d.jsx(
            "button",
            {
              type: "button",
              className: "rts-timing-start",
              "aria-label": `Resize start of ${V.label}`,
              title: "Resize start · arrows: 10 ms, Shift: 1 ms",
              onPointerDown: (J) => P(J, V, "start"),
              onPointerMove: Y,
              onPointerUp: $,
              onPointerCancel: (J) => $(J, !0),
              onKeyDown: (J) => dt(J, V, "start")
            }
          )
        ]
      },
      V.id
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
function qy({ min: c, max: o, colour: r = "#79c0ff" }) {
  const s = D.useRef(null);
  return D.useEffect(() => {
    const h = s.current;
    if (!h) return;
    const m = Math.max(1, Math.min(c.length, o.length));
    h.width = m, h.height = 180;
    const y = h.getContext("2d");
    if (!y) return;
    y.clearRect(0, 0, m, h.height), y.strokeStyle = r, y.lineWidth = 1, y.beginPath();
    const _ = h.height / 2, C = h.height * 0.46;
    for (let A = 0; A < m; A += 1) {
      const N = A + 0.5;
      y.moveTo(N, _ - (Number(o[A]) || 0) * C), y.lineTo(N, _ - (Number(c[A]) || 0) * C);
    }
    y.stroke();
  }, [r, o, c]), /* @__PURE__ */ d.jsx("canvas", { ref: s, className: "rts-waveform", "aria-hidden": "true" });
}
function Gy({ rows: c }) {
  const o = D.useRef(null);
  return D.useEffect(() => {
    const r = o.current, s = c.filter((_) => _.length > 0);
    if (!r || !s.length) return;
    const h = Math.max(...s.map((_) => _.length));
    r.width = Math.min(4096, s.length), r.height = Math.min(256, h);
    const m = r.getContext("2d");
    if (!m) return;
    const y = m.createImageData(r.width, r.height);
    for (let _ = 0; _ < r.width; _ += 1) {
      const C = Math.min(s.length - 1, Math.floor(_ * s.length / r.width)), A = s[C], N = Math.max(1e-9, ...A.map((v) => Number(v) || 0));
      for (let v = 0; v < r.height; v += 1) {
        const j = Math.min(A.length - 1, Math.floor((r.height - 1 - v) * A.length / r.height)), B = pa((Number(A[j]) || 0) / N, 0, 1), P = (v * r.width + _) * 4;
        y.data[P] = Math.round(40 + 180 * B), y.data[P + 1] = Math.round(35 + 110 * B), y.data[P + 2] = Math.round(80 + 170 * B), y.data[P + 3] = 255;
      }
    }
    m.putImageData(y, 0, 0);
  }, [c]), /* @__PURE__ */ d.jsx("canvas", { ref: o, className: "rts-matrix", "aria-hidden": "true" });
}
function Xy({ items: c, duration: o }) {
  const r = c.filter((m) => Number.isFinite(m.value) && m.value > 0);
  if (!r.length) return null;
  const s = Math.log2(Math.max(20, Math.min(...r.map((m) => m.value)))), h = Math.log2(Math.max(100, ...r.map((m) => m.value)));
  return r.map((m, y) => {
    const _ = (Math.log2(m.value) - s) / Math.max(0.01, h - s);
    return /* @__PURE__ */ d.jsx(
      "span",
      {
        className: `rts-note ${m.className ?? ""}`,
        style: { left: rf(m.start, o), width: v0(m.start, m.end ?? m.start + 0.12, o, 0.04), top: `${8 + (1 - _) * 72}px` },
        title: m.title ?? `${m.label ?? `${m.value.toFixed(1)} Hz`} · ${Sa(m.start)}`
      },
      `${m.start}-${y}`
    );
  });
}
function ff({ content: c, duration: o }) {
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
      return /* @__PURE__ */ d.jsx(Xy, { items: c.items, duration: o });
    case "curve": {
      const r = c.points.filter((_) => Number.isFinite(_.time) && Number.isFinite(_.value));
      if (!r.length) return null;
      const s = r.map((_) => _.value), h = Math.min(...s), m = Math.max(...s), y = r.map((_) => {
        const C = _.time / Math.max(o, 1e-9) * 2e3, A = 180 - (_.value - h) / Math.max(1e-9, m - h) * 168 - 6;
        return `${C.toFixed(2)},${A.toFixed(2)}`;
      }).join(" ");
      return /* @__PURE__ */ d.jsx("svg", { className: "rts-curve", viewBox: "0 0 2000 180", preserveAspectRatio: "none", "aria-hidden": "true", children: /* @__PURE__ */ d.jsx("polyline", { fill: "none", stroke: c.colour ?? "#7ee787", strokeWidth: "2", vectorEffect: "non-scaling-stroke", points: y }) });
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
      return /* @__PURE__ */ d.jsx(Yy, { ...c, duration: o });
    case "custom":
      return /* @__PURE__ */ d.jsx(d.Fragment, { children: c.node });
  }
}
function Vy({ content: c, duration: o, view: r }) {
  const s = o0(r, !!c.waveform, !!c.spectrogram);
  return /* @__PURE__ */ d.jsxs("div", { className: `rts-audio-layers rts-audio-${s}`, "data-audio-view": s, children: [
    c.spectrogram && s !== "waveform" && /* @__PURE__ */ d.jsx("div", { className: "rts-audio-spectrum", children: /* @__PURE__ */ d.jsx(ff, { content: { type: "image", ...c.spectrogram }, duration: o }) }),
    c.waveform && s !== "spectrogram" && /* @__PURE__ */ d.jsx("div", { className: "rts-audio-envelope", children: /* @__PURE__ */ d.jsx(ff, { content: { type: "waveform", ...c.waveform, colour: s === "both" ? "#e6fff7" : c.waveform.colour }, duration: o }) }),
    !c.waveform && !c.spectrogram && /* @__PURE__ */ d.jsx("span", { className: "rts-meta", children: "Waiting for audio analysis" })
  ] });
}
function Qy({ config: c, lanes: o, time: r, duration: s, playing: h }) {
  const m = o.filter((Y) => Y.content.type === "timing" && Y.content.kind === "line"), [y, _] = D.useState(null), C = m.find((Y) => Y.id === (c.laneId ?? y)) ?? (c.laneId === void 0 && y === null ? m[0] : void 0), A = c.items ?? (C?.content.type === "timing" ? C.content.items : []), N = D.useMemo(() => Cy(A, s), [A, s]), v = Ay(N, r), [j, B] = D.useState(), P = c.artworkSrc && j !== c.artworkSrc;
  return /* @__PURE__ */ d.jsxs("aside", { className: "rts-audition", "aria-label": "Lyric timing audition", children: [
    /* @__PURE__ */ d.jsxs("div", { className: "rts-audition-heading", children: [
      /* @__PURE__ */ d.jsx("strong", { children: "Lyric timing audition" }),
      c.audioLabel && /* @__PURE__ */ d.jsx("span", { className: "rts-audition-source", children: c.audioLabel }),
      c.items === void 0 && c.laneId === void 0 && m.length > 1 && /* @__PURE__ */ d.jsxs("label", { children: [
        "Lyrics ",
        /* @__PURE__ */ d.jsxs(
          "select",
          {
            "aria-label": "Audition lyric lane",
            value: C?.id ?? "",
            onChange: (Y) => _(Y.target.value),
            children: [
              !C && /* @__PURE__ */ d.jsx("option", { value: "", children: "Choose lyric lane" }),
              m.map((Y) => /* @__PURE__ */ d.jsx("option", { value: Y.id, children: typeof Y.title == "string" ? Y.title : Y.id }, Y.id))
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: "rts-audition-cover", children: [
      P ? /* @__PURE__ */ d.jsx(
        "img",
        {
          src: c.artworkSrc,
          alt: c.artworkAlt ?? "Cover artwork",
          onError: () => B(c.artworkSrc)
        }
      ) : /* @__PURE__ */ d.jsx("span", { className: "rts-audition-no-art", children: "Cover artwork unavailable" }),
      /* @__PURE__ */ d.jsx("div", { className: "rts-audition-subtitles", "aria-label": "Timed lyrics", "aria-live": "off", children: v.map((Y, $) => /* @__PURE__ */ d.jsx("span", { children: Y }, $)) })
    ] }),
    /* @__PURE__ */ d.jsx("output", { className: "rts-audition-status", "aria-live": "off", children: N.some((Y) => Y.text.trim()) ? v.length ? h ? "Playing · timed lyrics" : "Paused · current lyrics" : "No lyric at this position" : "No timed lyrics available" })
  ] });
}
function Zy(c, o, r, s, h = "same-origin") {
  const [m, y] = D.useState(0), [_, C] = D.useState(!1), [A, N] = D.useState(!1), [v, j] = D.useState(""), B = D.useRef(!1), P = D.useRef("media"), Y = D.useRef(null), $ = D.useRef(0), dt = D.useRef({ audioSrc: o, activeLoop: r, onError: s, credentials: h });
  dt.current = { audioSrc: o, activeLoop: r, onError: s, credentials: h };
  const V = D.useCallback(() => P.current === "loop" ? Y.current?.currentTime ?? 0 : c.current?.currentTime ?? 0, [c]), Q = D.useCallback(() => {
    const ut = V();
    return $.current += 1, B.current = !1, Y.current?.pause(), c.current?.pause(), N(!1), C(!1), y(ut), ut;
  }, [c, V]), zt = D.useCallback((ut) => {
    Q(), j(ut instanceof Error ? ut.message : String(ut)), dt.current.onError?.(ut);
  }, [Q]), St = D.useCallback(async (ut) => {
    Q();
    const rt = $.current;
    B.current = !0, N(!0), j("");
    const { activeLoop: mt, audioSrc: Ut, credentials: _t } = dt.current;
    try {
      if (mt) {
        if (P.current = "loop", Y.current ??= new Uy(), !await Y.current.play(mt, Ut, ut, _t)) return;
      } else {
        P.current = "media";
        const Nt = c.current;
        if (!Nt) return;
        Nt.currentTime = Math.max(0, ut), await Nt.play();
      }
      if (rt !== $.current) return;
      y(V()), N(!1), C(!0);
    } catch (Nt) {
      rt === $.current && zt(Nt);
    }
  }, [c, zt, Q, V]), Rt = D.useCallback((ut) => {
    const rt = dt.current.activeLoop;
    if (rt) {
      const mt = ka(rt);
      ut = d0(ut, mt.start, mt.end);
    }
    B.current ? St(ut) : (Q(), P.current = "media", c.current && (c.current.currentTime = ut), y(ut));
  }, [c, Q, St]), J = D.useCallback(() => {
    if (B.current) {
      Q();
      return;
    }
    let ut = V();
    const rt = dt.current.activeLoop;
    if (rt) {
      const mt = ka(rt);
      (ut < mt.start || ut >= mt.end) && (ut = mt.start);
    }
    St(ut);
  }, [Q, St, V]);
  D.useEffect(() => (Q(), P.current = "media", y(0), j(""), Y.current?.dispose(), Y.current = null, () => {
    $.current += 1, B.current = !1, Y.current?.dispose(), Y.current = null, c.current?.pause();
  }), [o, c, Q]);
  const st = r ? JSON.stringify([r.id, r.startSample, r.endSample, r.sampleRate, r.audioSrc]) : "";
  D.useEffect(() => {
    const ut = B.current;
    let rt = Q();
    const mt = dt.current.activeLoop;
    mt && (rt = ka(mt).start), P.current = "media", c.current && (c.current.currentTime = rt), y(rt), ut && St(rt);
  }, [st, c, Q, St]), D.useEffect(() => {
    if (!_) return;
    let ut = 0;
    const rt = () => {
      y(V()), ut = requestAnimationFrame(rt);
    };
    return ut = requestAnimationFrame(rt), () => cancelAnimationFrame(ut);
  }, [_, V]);
  const It = D.useCallback(() => {
    P.current === "media" && Q();
  }, [Q]);
  return { time: m, playing: _, loading: A, error: v, toggle: J, seek: Rt, ended: It, fail: zt };
}
function Ky(c, o) {
  if (c <= 0 || o <= 0) return [];
  const r = m0(o) / 5, s = [];
  for (let h = 0; h * r <= c + 1e-6; h += 1)
    s.push({
      time: h * r,
      major: h % 5 === 0
    });
  return s;
}
function Jy(c, o) {
  const r = Math.round(c * 1e3), s = Math.floor(r / 1e3), h = `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  return m0(o) < 1 ? `${h}.${String(r % 1e3).padStart(3, "0")}` : h;
}
function $y({
  audioSrc: c,
  lyricAudition: o,
  loops: r = [],
  onLoopSelect: s,
  onLoopEnabledChange: h,
  lanes: m,
  title: y = "Audio timeline",
  subtitle: _,
  duration: C = 0,
  grid: A = [],
  beatClock: N = null,
  showBeatGrid: v = !1,
  headerEnd: j,
  footer: B,
  className: P = "",
  labelWidth: Y = 230,
  initialZoom: $ = 20,
  laneControls: dt = !1,
  wheelNavigation: V = !1,
  followPlayheadByDefault: Q = !0,
  preload: zt = "metadata",
  crossOrigin: St,
  onDurationChange: Rt,
  onTimeChange: J,
  onWindowChange: st,
  onPlaybackError: It
}) {
  const ut = D.useRef(null), [rt, mt] = D.useState(o?.enabledByDefault ?? !0), Ut = D.useRef(null), [_t, Nt] = D.useState(Math.max(0, C)), [q, G] = D.useState(null), [L, k] = D.useState(!1), at = D.useMemo(() => wy(r, _t), [r, _t]), Dt = at.find((R) => R.id === q) ?? null, Zt = Zy(
    ut,
    c,
    L ? Dt : null,
    It,
    St === "use-credentials" ? "include" : "same-origin"
  ), Jt = Zt.time, p = Zt.playing, H = Dt ? ka(Dt) : null, I = (R) => {
    G(R), s?.(at.find((ot) => ot.id === R) ?? null);
  }, et = (R) => {
    k(R), h?.(R);
  };
  D.useEffect(() => {
    q && !at.some((R) => R.id === q) && (G(null), k(!1), s?.(null), h?.(!1));
  }, [q, at, s, h]), D.useEffect(() => {
    G(null), k(!1), Nt(Math.max(0, C));
  }, [c]);
  const [ht, yt] = D.useState(Q), [ft, K] = D.useState($), [it, ee] = D.useState({}), [ye, Bt] = D.useState({}), $t = D.useRef($), qt = D.useRef(null), xt = D.useRef(() => {
  });
  D.useEffect(() => {
    ee({}), Bt({});
  }, [c]);
  const [X, nt] = D.useState(0), [Ct, je] = D.useState({ start: 0, end: 0 });
  D.useEffect(() => {
    C > 0 && Nt(C);
  }, [C]), D.useEffect(() => {
    const R = Ut.current;
    if (!R) return;
    const ot = () => nt(R.clientWidth);
    ot();
    const x = new ResizeObserver(ot);
    return x.observe(R), () => x.disconnect();
  }, []);
  const ie = _t > 0 ? Math.max(0.4, Math.max(320, X - Y - 16) / _t) : 0.4, Ht = Math.max(ie, ie * Math.pow(2, ft / 18));
  D.useLayoutEffect(() => {
    if ($t.current = ft, qt.current && Ut.current) {
      const { time: R, pointer: ot } = qt.current;
      Ut.current.scrollLeft = Ph(R, Ht, ot), qt.current = null;
    }
  }, [ft, Ht]), D.useEffect(() => {
    const R = Ut.current;
    if (!R || !V) return;
    const ot = (x) => xt.current(x);
    return R.addEventListener("wheel", ot, { passive: !1 }), () => R.removeEventListener("wheel", ot);
  }, [V]);
  const Ol = Math.max(1, _t * Ht), Vl = D.useMemo(() => Ky(_t, Ht), [_t, Ht]), _a = D.useMemo(() => N && v ? Ly(N, 0, _t, 2e3).map((R) => ({
    time: R.time,
    emphasis: R.emphasis,
    label: R.label,
    className: `rts-beat-grid-${N.mode}`
  })) : [], [N, v, _t]), Ea = [...A, ..._a], Re = D.useCallback(() => {
    const R = Ut.current;
    if (!R) return;
    const ot = By(
      R.scrollLeft + Y,
      Math.max(0, R.clientWidth - Y),
      Y,
      Ht,
      _t
    );
    je(ot), st?.(ot);
  }, [_t, Y, st, Ht]);
  D.useEffect(() => {
    Re();
  }, [Re, X]), D.useEffect(() => {
    J?.(Jt);
    const R = Ut.current;
    if (!R || !ht || !p) return;
    const ot = Y + Jt * Ht, x = R.scrollLeft + R.clientWidth, F = Math.min(180, R.clientWidth * 0.2);
    ot > x - F ? R.scrollLeft = Math.max(0, ot - R.clientWidth + F) : ot < R.scrollLeft + Y && (R.scrollLeft = Math.max(0, ot - Y - F));
  }, [Jt, ht, p, Y, J, Ht]);
  const Ta = (R) => {
    if (_t <= 0 || R.target.closest(".rts-label, a, button, input, select, textarea")) return;
    const ot = Ut.current, x = ut.current;
    if (!ot || !x) return;
    const F = ot.getBoundingClientRect(), Et = R.clientX - F.left + ot.scrollLeft - Y;
    if (Et < 0) return;
    const vt = pa(Et / Ht, 0, _t);
    Zt.seek(vt);
  }, ml = (R, ot) => {
    const x = Ut.current;
    if (R = pa(R, 0, 100), R !== $t.current) {
      if (x) {
        const F = Math.max(1, x.clientWidth - Y), Et = ot === void 0 ? F / 2 : pa(ot - x.getBoundingClientRect().left - Y, 0, F), vt = qt.current, oe = ie * Math.pow(2, $t.current / 18), ne = vt ? Ph(vt.time, oe, vt.pointer) : x.scrollLeft;
        qt.current = { time: (ne + Et) / oe, pointer: Et };
      }
      $t.current = R, K(R);
    }
  };
  xt.current = (R) => {
    const ot = Ut.current, x = R.target instanceof Element ? R.target : null;
    if (!ot || !x || x.closest("input, select, textarea, button, [contenteditable=true]")) return;
    const F = Math.abs(R.deltaX) > Math.abs(R.deltaY) ? R.deltaX : R.deltaY, Et = jy(F, R.deltaMode, ot.clientWidth - Y);
    if (Et)
      if (R.ctrlKey || R.metaKey) {
        if (_t <= 0) return;
        R.preventDefault(), R.stopPropagation(), yt(!1), ml(Ry($t.current, Et), R.clientX);
      } else if (R.altKey) {
        const vt = x.closest("[data-lane-id]")?.dataset.laneId, oe = m.find((ne) => ne.id === vt);
        if (!dt || !oe) return;
        R.preventDefault(), R.stopPropagation(), ee((ne) => ({
          ...ne,
          [oe.id]: Dy(ne[oe.id] ?? Xu(oe.height), Et)
        }));
      } else
        R.preventDefault(), R.stopPropagation(), R.shiftKey ? ot.scrollTop += Et : (yt(!1), ot.scrollLeft += Et);
  };
  const Zn = () => {
    if (!H || !Ut.current) return;
    const R = Math.max(320, X - Y - 16) / (H.duration * 1.1), ot = pa(18 * Math.log2(R / ie), 0, 100);
    qt.current = null, $t.current = ot, K(ot);
    const x = ie * Math.pow(2, ot / 18);
    requestAnimationFrame(() => {
      Ut.current && (Ut.current.scrollLeft = Math.max(0, (H.start - H.duration * 0.05) * x));
    });
  }, Ql = () => {
    const R = Number(ut.current?.duration) || 0;
    Number.isFinite(R) && R > 0 && (Nt(R), Rt?.(R));
  };
  return /* @__PURE__ */ d.jsxs(
    "section",
    {
      className: `rts-sequence ${dt ? "rts-display-controls" : ""} ${P}`,
      style: { "--rts-label-width": `${Y}px`, "--rts-track-width": `${Ol}px` },
      children: [
        /* @__PURE__ */ d.jsxs("header", { className: "rts-toolbar", children: [
          /* @__PURE__ */ d.jsxs("div", { className: "rts-ident", children: [
            /* @__PURE__ */ d.jsx("strong", { children: y }),
            _ && /* @__PURE__ */ d.jsx("span", { children: _ })
          ] }),
          /* @__PURE__ */ d.jsxs("div", { className: "rts-transport", "aria-label": "Timeline playback controls", children: [
            /* @__PURE__ */ d.jsx("button", { type: "button", className: "rts-button rts-play", onClick: Zt.toggle, "aria-label": p || Zt.loading ? "Pause" : "Play", children: Zt.loading ? "…" : p ? "❚❚" : "▶" }),
            /* @__PURE__ */ d.jsxs("output", { className: "rts-time", "aria-live": "off", children: [
              Sa(Jt),
              " / ",
              Sa(_t)
            ] }),
            /* @__PURE__ */ d.jsx("button", { type: "button", className: "rts-button", onClick: () => ml(0), children: "Fit" }),
            /* @__PURE__ */ d.jsxs("label", { className: "rts-control", children: [
              /* @__PURE__ */ d.jsx("span", { children: "Zoom" }),
              /* @__PURE__ */ d.jsx("input", { "aria-label": "Timeline zoom", type: "range", min: "0", max: "100", value: ft, onChange: (R) => ml(Number(R.target.value)) })
            ] }),
            /* @__PURE__ */ d.jsxs("label", { className: "rts-control", children: [
              /* @__PURE__ */ d.jsx("input", { type: "checkbox", checked: ht, onChange: (R) => yt(R.target.checked) }),
              /* @__PURE__ */ d.jsx("span", { children: "Follow" })
            ] }),
            o && /* @__PURE__ */ d.jsxs("label", { className: "rts-control rts-audition-toggle", children: [
              /* @__PURE__ */ d.jsx(
                "input",
                {
                  type: "checkbox",
                  "aria-label": "Audition lyrics",
                  checked: rt,
                  onChange: (R) => mt(R.target.checked)
                }
              ),
              /* @__PURE__ */ d.jsx("span", { children: "Audition lyrics" })
            ] })
          ] }),
          /* @__PURE__ */ d.jsx("div", { className: "rts-header-end", children: j }),
          at.length > 0 && /* @__PURE__ */ d.jsxs("div", { className: "rts-loop-controls", "aria-label": "Loop controls", children: [
            /* @__PURE__ */ d.jsxs("label", { children: [
              "Loop ",
              /* @__PURE__ */ d.jsxs("select", { "aria-label": "Select loop", value: q ?? "", onChange: (R) => I(R.target.value), children: [
                /* @__PURE__ */ d.jsx("option", { value: "", children: "Choose a loop…" }),
                at.map((R) => /* @__PURE__ */ d.jsx("option", { value: R.id, children: R.label || R.id }, R.id))
              ] })
            ] }),
            /* @__PURE__ */ d.jsxs("label", { children: [
              /* @__PURE__ */ d.jsx("input", { type: "checkbox", "aria-label": "Enable loop", disabled: !Dt, checked: L && !!Dt, onChange: (R) => et(R.target.checked) }),
              "Enable loop"
            ] }),
            /* @__PURE__ */ d.jsx("button", { type: "button", className: "rts-button", disabled: !Dt, onClick: Zn, children: "Zoom to loop" }),
            Dt && /* @__PURE__ */ d.jsxs("output", { children: [
              Dt.startSample.toLocaleString(),
              " → ",
              Dt.endSample.toLocaleString(),
              " samples (end exclusive) · ",
              Dt.sampleRate.toLocaleString(),
              " Hz"
            ] }),
            Dt?.downloadUrl && /* @__PURE__ */ d.jsx("a", { href: Dt.downloadUrl, download: !0, children: "Download loop WAV" }),
            /* @__PURE__ */ d.jsx("span", { className: "rts-loop-status", role: "status", children: Zt.loading ? "Loading loop…" : L && Dt ? "Loop enabled · Play repeats selection" : "Full-song playback" })
          ] }),
          Zt.error && /* @__PURE__ */ d.jsx("div", { role: "alert", className: "rts-loop-error", children: Zt.error })
        ] }),
        /* @__PURE__ */ d.jsx(
          "audio",
          {
            ref: ut,
            src: c,
            preload: zt,
            crossOrigin: St,
            onLoadedMetadata: Ql,
            onEnded: Zt.ended,
            onError: () => Zt.fail(new Error(ut.current?.error?.message || "Audio playback failed"))
          }
        ),
        /* @__PURE__ */ d.jsxs("div", { className: `rts-workspace ${o && rt ? "rts-with-audition" : ""}`, children: [
          /* @__PURE__ */ d.jsx("div", { ref: Ut, className: "rts-scroller", onScroll: Re, onClick: Ta, children: /* @__PURE__ */ d.jsxs("div", { className: "rts-inner", children: [
            /* @__PURE__ */ d.jsxs("div", { className: "rts-ruler-row", children: [
              /* @__PURE__ */ d.jsx("div", { className: "rts-label rts-ruler-label", children: "TIME" }),
              /* @__PURE__ */ d.jsx("div", { className: "rts-ruler-track", children: Vl.map((R) => /* @__PURE__ */ d.jsx("span", { className: `rts-tick ${R.major ? "rts-tick-major" : ""}`, style: { left: `${R.time * Ht}px` }, children: R.major && /* @__PURE__ */ d.jsx("span", { className: "rts-tick-label", children: Jy(R.time, Ht) }) }, R.time)) })
            ] }),
            at.length > 0 && /* @__PURE__ */ d.jsxs("div", { className: "rts-lane rts-lane-loops", children: [
              /* @__PURE__ */ d.jsxs("div", { className: "rts-label", children: [
                /* @__PURE__ */ d.jsx("div", { className: "rts-title", children: "LOOPS" }),
                /* @__PURE__ */ d.jsx("div", { className: "rts-meta", children: "Select a region, enable, then Play" })
              ] }),
              /* @__PURE__ */ d.jsx("div", { className: "rts-track", children: at.map((R) => {
                const ot = ka(R);
                return /* @__PURE__ */ d.jsx(
                  "button",
                  {
                    type: "button",
                    className: "rts-loop-region",
                    "aria-pressed": q === R.id,
                    "aria-label": `Select ${R.label || R.id}`,
                    onClick: () => I(R.id),
                    title: `${R.label || R.id}: [${R.startSample}, ${R.endSample}) at ${R.sampleRate} Hz`,
                    style: { left: `${ot.start * Ht}px`, width: `${ot.duration * Ht}px` },
                    children: R.label || R.id
                  },
                  R.id
                );
              }) })
            ] }),
            H && /* @__PURE__ */ d.jsx(
              "div",
              {
                className: `rts-loop-shade ${L ? "" : "is-disabled"}`,
                "aria-hidden": "true",
                style: { left: `${Y + H.start * Ht}px`, width: `${H.duration * Ht}px` }
              }
            ),
            /* @__PURE__ */ d.jsx("div", { className: "rts-lanes", children: m.map((R) => {
              const ot = R.content, x = ot.type === "audio" ? ot : null, F = ye[R.id] ?? x?.view ?? "both", Et = x ? o0(F, !!x.waveform, !!x.spectrogram) : "both", vt = dt ? it[R.id] ?? Xu(R.height) : R.height, oe = typeof R.title == "string" ? R.title : R.id;
              return /* @__PURE__ */ d.jsxs(
                "div",
                {
                  "data-lane-id": R.id,
                  className: `rts-lane rts-lane-${R.kind ?? "default"} ${R.className ?? ""}`,
                  style: vt ? { "--rts-lane-height": `${vt}px` } : void 0,
                  children: [
                    /* @__PURE__ */ d.jsxs("div", { className: "rts-label", children: [
                      /* @__PURE__ */ d.jsx("div", { className: "rts-title", children: R.title }),
                      R.meta && /* @__PURE__ */ d.jsx("div", { className: "rts-meta", children: R.meta }),
                      dt && /* @__PURE__ */ d.jsxs("div", { className: "rts-lane-controls", children: [
                        x && /* @__PURE__ */ d.jsxs("label", { children: [
                          "View ",
                          /* @__PURE__ */ d.jsxs(
                            "select",
                            {
                              "aria-label": `View for ${oe}`,
                              value: Et,
                              onChange: (ne) => Bt((hl) => ({ ...hl, [R.id]: ne.target.value })),
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
                              max: f0,
                              step: "1",
                              "aria-label": `Height for ${oe}`,
                              value: vt,
                              onChange: (ne) => ee((hl) => ({ ...hl, [R.id]: Xu(Number(ne.target.value)) }))
                            }
                          ),
                          /* @__PURE__ */ d.jsxs("output", { children: [
                            vt,
                            "px"
                          ] })
                        ] }),
                        /* @__PURE__ */ d.jsx(
                          "button",
                          {
                            type: "button",
                            className: "rts-height-reset",
                            "aria-label": `Reset height for ${oe}`,
                            onClick: () => ee((ne) => ({ ...ne, [R.id]: Xu(R.height) })),
                            children: "Reset height"
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ d.jsx("div", { className: "rts-track", children: x ? /* @__PURE__ */ d.jsx(Vy, { content: x, duration: _t, view: Et }) : /* @__PURE__ */ d.jsx(ff, { content: ot, duration: _t }) })
                  ]
                },
                R.id
              );
            }) }),
            Ea.length > 0 && /* @__PURE__ */ d.jsx("div", { className: "rts-grid", "aria-hidden": "true", children: Ea.map((R, ot) => /* @__PURE__ */ d.jsx("span", { className: `rts-grid-line ${R.emphasis ? "rts-grid-line-emphasis" : ""} ${R.className ?? ""}`, style: { left: `${R.time * Ht}px` } }, `${R.time}-${ot}`)) }),
            /* @__PURE__ */ d.jsx("div", { className: "rts-playhead", style: { left: `${Y + Jt * Ht}px` }, "aria-hidden": "true" })
          ] }) }),
          o && rt && /* @__PURE__ */ d.jsx(
            Qy,
            {
              config: o,
              lanes: m,
              time: Jt,
              duration: _t,
              playing: p
            }
          )
        ] }),
        /* @__PURE__ */ d.jsxs("footer", { className: "rts-footer", children: [
          /* @__PURE__ */ d.jsxs("div", { children: [
            B,
            V && /* @__PURE__ */ d.jsx("div", { className: "rts-navigation-help", children: "Wheel: time · Ctrl/⌘ + wheel: time zoom · Alt + wheel: channel height · Shift + wheel: channel scroll" })
          ] }),
          /* @__PURE__ */ d.jsxs("output", { className: "rts-window", children: [
            Sa(Ct.start),
            " — ",
            Sa(Ct.end)
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
function ky(c) {
  const o = /* @__PURE__ */ new Map(), r = [], s = /* @__PURE__ */ new Map();
  for (const m of c) for (const y of Array.isArray(m.sourceMap) ? m.sourceMap : [])
    if (typeof y?.audio == "string" && typeof y.data == "string") {
      const _ = a0(y.audio.replace(/\\/g, "/"));
      _ && (s.set(y.data.replace(/\\/g, "/"), _), typeof y.png == "string" && s.set(y.png.replace(/\\/g, "/"), _));
    }
  const h = (m) => (o.has(m) || o.set(m, { key: m }), o.get(m));
  for (const m of c) {
    const y = (m.id?.replace(/^file:/, "") || "").replace(/\\/g, "/"), _ = a0(y), C = y.startsWith("spectrograms/") ? s.get(y) || y.slice(13).replace(/\.(npz|png)$/i, "") : null;
    if (_ && (m.content?.type === "waveform" || m.content?.type === "artifact")) {
      const A = h(_);
      (!A.audio || m.id === "__source__") && (A.audio = m);
    } else C && y.endsWith(".npz") && m.content?.type === "image" ? h(C).spectrum = m : C && y.endsWith(".png") && m.content?.type === "image" ? h(C).png = m : r.push(m);
  }
  for (const m of o.values()) {
    if (!m.audio && !m.spectrum) {
      m.png && r.push(m.png);
      continue;
    }
    const y = m.audio || m.spectrum, _ = m.audio?.content?.type === "waveform" ? m.audio.content : null, C = m.audio?.content?.type === "artifact" ? m.audio.content.note : null;
    r.push({
      ...y,
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
const of = (c) => typeof c == "number" && Number.isFinite(c) && c > 0, Fy = { canonical: "Canonical", combined: "Consensus · observed tempo", combined_family: "Consensus · canonical tempo family", combined_fit: "Consensus · fitted constant grid" };
function n0(c, o, r, s) {
  if (!of(c) || !Number.isFinite(o) || o < 0 || !Number.isFinite(r) || r <= 0) return [];
  const h = Math.max(0, Math.floor((r - o) * c / 60 + 1e-9) + 1), m = Math.max(1, Math.ceil(h / 25e3));
  return Array.from({ length: Math.ceil(h / m) }, (y, _) => {
    const C = _ * m;
    return {
      time: o + C * 60 / c,
      emphasis: C === 0,
      label: `${s === "original" ? "Original" : "Aligned"} beat ${C + 1}${C === 0 && s === "aligned" ? " · pip 0" : ""}`,
      className: `stemlab-grid-${s}`
    };
  });
}
function Wy(c, o, r, s = "canonical", h = "consensus") {
  const m = c?.schema === "stemlab.beat-offsets.v1" && c.pips_per_beat === 64;
  let y = m ? (c.bpm_bases || []).filter((B) => B.status === "available" && of(B.bpm)) : [];
  !y.length && of(o) && (y = [{ id: "canonical", bpm: o }]);
  const _ = y.find((B) => B.id === s) || y.find((B) => B.id === "combined_fit") || y[0] || null, C = m ? (c.analyses || []).filter((B) => B.status === "available") : [], A = C.find((B) => B.analysis_id === h) || C.find((B) => B.kind === "consensus") || C[0] || null, N = _ && A ? c.comparisons?.find((B) => B.status === "available" && B.bpm_basis === _.id && B.analysis_id === A.analysis_id) : null, v = _ ? n0(_.bpm, 0, r, "original") : [], j = N && Number.isFinite(N.beat_zero_seconds) ? n0(N.bpm, N.beat_zero_seconds, r, "aligned") : [];
  return {
    bases: y.map((B) => ({ ...B, label: `${Fy[B.id] || B.id}${B.multiplier ? ` ×${B.multiplier}` : ""} · ${B.bpm.toFixed(4)} BPM` })),
    basis: _,
    analysis: A,
    analyses: C,
    row: N,
    original: v,
    aligned: j,
    thinned: !!_ && Math.floor(r * _.bpm / 60) + 1 > 25e3,
    grid: [...v, ...j].sort((B, P) => B.time - P.time)
  };
}
function Iy({ comparison: c, onBasis: o, onAnalysis: r }) {
  const { bases: s, basis: h, analyses: m, analysis: y, row: _, thinned: C } = c;
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
        /* @__PURE__ */ d.jsxs("select", { "aria-label": "First beat analysis", value: y?.analysis_id || "", onChange: (A) => r(A.target.value), disabled: !m.length, children: [
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
    y?.constant_grid_fit && /* @__PURE__ */ d.jsxs("p", { className: "small", children: [
      "Selected detector fit: ",
      y.constant_grid_fit.proposed_bpm.toFixed(4),
      " BPM · 95% beat error ",
      y.constant_grid_fit.p95_absolute_beat_error_ms.toFixed(3),
      " ms · grade ",
      y.constant_grid_fit.precision_grade,
      ".",
      h?.fit ? ` Consensus grid fit grade: ${h.fit.precision_grade}.` : ""
    ] }),
    /* @__PURE__ */ d.jsxs("p", { className: "small", children: [
      "Half- and double-time readings are normal. Observed beats stay in their own lanes; tempo-family options compare ×½ / ×1 / ×2 interpretations. Constant grids and detector phases remain estimates.",
      C ? " Dense grids are thinned for display only." : ""
    ] })
  ] });
}
const Py = "stemlab.beat-timeline.v1", Zu = 64, Ml = (c) => Number.isSafeInteger(c);
function _c(c) {
  if (!c || c.schema !== Py || c.pips_per_beat !== Zu || !Number.isSafeInteger(c.source_audio?.sample_rate) || c.source_audio.sample_rate < 1 || !Number.isSafeInteger(c.source_audio?.num_frames) || c.source_audio.num_frames < 2 || !/^[0-9a-f]{64}$/.test(c.source_audio?.sha256 || "") || !/^[0-9a-f]{64}$/.test(c.consensus_sha256 || "") || !Array.isArray(c.beats) || c.beats.length < 2 || c.beats.length > 25e3 || !Ml(c.origin_beat)) throw new Error("Not a valid source-bound StemLab beat timeline");
  const o = { beat: -1, frame: -1 };
  for (const r of c.beats) {
    if (!Ml(r.beat) || !Ml(r.frame) || r.beat <= o.beat || r.frame <= o.frame || r.frame >= c.source_audio.num_frames || !["consensus", "corrected", "manual"].includes(r.source) || r.reference_frame !== null && (!Ml(r.reference_frame) || r.reference_frame < 0 || r.reference_frame >= c.source_audio.num_frames) || r.source === "consensus" && r.frame !== r.reference_frame || r.source === "manual" && r.reference_frame !== null)
      throw new Error("Beat indices and source sample frames must increase; original consensus timestamps stay immutable");
    o.beat = r.beat, o.frame = r.frame;
  }
  if (!c.beats.some((r) => r.beat === c.origin_beat)) throw new Error("Beat 1 must identify a real anchor");
  return c;
}
const Wa = (c) => ({ ...c, beats: c.beats.map((o) => ({ ...o })) }), Ia = (c) => _c(c), tb = (c, o) => c.beats[o].frame / c.source_audio.sample_rate, Qn = (c, o) => o < 0 || o + 1 >= c.beats.length ? null : 60 * c.source_audio.sample_rate * (c.beats[o + 1].beat - c.beats[o].beat) / (c.beats[o + 1].frame - c.beats[o].frame), g0 = (c, o) => Math.round(o * c.source_audio.sample_rate);
function u0(c, o, r) {
  const s = Wa(c);
  if (!Ml(o) || o < 0 || o >= s.beats.length) throw new Error("Select a beat");
  const h = g0(s, r), m = s.beats[o - 1]?.frame ?? -1, y = s.beats[o + 1]?.frame ?? s.source_audio.num_frames;
  if (!Ml(h) || h <= m || h >= y) throw new Error("Beat must remain between its neighbours");
  const _ = s.beats[o];
  return _.frame = h, _.source = h === _.reference_frame ? "consensus" : _.reference_frame === null ? "manual" : "corrected", Ia(s);
}
function eb(c, o, r) {
  if (!Number.isFinite(r) || r <= 0 || r > 1200) throw new Error("BPM must be 0..1200");
  const s = Wa(c);
  if (!Ml(o) || o < 0 || o + 1 >= s.beats.length) throw new Error("Choose an interval");
  const h = s.beats[o], m = s.beats[o + 1], y = Math.round(60 * (m.beat - h.beat) * s.source_audio.sample_rate / r);
  if (y < 1) throw new Error("BPM exceeds available sample precision");
  const _ = h.frame + y - m.frame;
  for (let C = o + 1; C < s.beats.length; C++) {
    const A = s.beats[C];
    A.frame += _, A.source = A.reference_frame === null ? "manual" : A.frame === A.reference_frame ? "consensus" : "corrected";
  }
  return Ia(s);
}
function lb(c, o) {
  if (!Number.isFinite(o) || Math.abs(o) > 1e5) throw new Error("Phase shift is out of bounds");
  const r = Wa(c), s = Qn(r, 0), h = Math.round(o / Zu * (60 / s) * r.source_audio.sample_rate);
  for (const m of r.beats)
    m.frame += h, m.source = m.reference_frame === null ? "manual" : m.frame === m.reference_frame ? "consensus" : "corrected";
  return Ia(r);
}
function i0(c, o) {
  const r = Wa(c), s = g0(r, o);
  if (!Ml(s) || s < 0 || s >= r.source_audio.num_frames) throw new Error("Beat outside source");
  let h = r.beats.findIndex((A) => A.frame > s);
  if (h < 0 && (h = r.beats.length), h === 0 || h === r.beats.length || r.beats[h - 1].frame === s)
    throw new Error("Insert between two existing anchors; use the timeline selection to move end beats");
  const m = r.beats[h - 1], y = r.beats[h], _ = y.beat - m.beat > 1, C = m.beat + 1;
  if (!_) {
    r.origin_beat >= y.beat && (r.origin_beat += 1);
    for (let A = h; A < r.beats.length; A++) r.beats[A].beat += 1;
  }
  return r.beats.splice(h, 0, { beat: C, frame: s, source: "manual", reference_frame: null }), Ia(r);
}
function ab(c, o) {
  const r = Wa(c);
  if (!Ml(o) || o < 0 || o >= r.beats.length || r.beats.length <= 2)
    throw new Error("Keep at least two beat anchors");
  const [s] = r.beats.splice(o, 1);
  return s.beat === r.origin_beat && (r.origin_beat = r.beats[Math.min(o, r.beats.length - 1)].beat), Ia(r);
}
function nb(c, o) {
  const r = Wa(c);
  if (!Ml(o) || o < 0 || o >= r.beats.length) throw new Error("Select Beat 1");
  return r.origin_beat = r.beats[o].beat, Ia(r);
}
function ub(c) {
  const o = Wa(c);
  for (const r of o.beats) r.reference_frame !== null && (r.frame = r.reference_frame, r.source = "consensus");
  return Ia(o);
}
function ib(c) {
  const o = Qn(c, 0), r = c.beats.find((s) => s.beat === c.origin_beat);
  return c.beats.map((s) => ({
    time: s.frame / c.source_audio.sample_rate,
    value: Zu * (s.beat - c.origin_beat) - (s.frame - r.frame) * o * Zu / (c.source_audio.sample_rate * 60)
  }));
}
function cb(c, o, r = 3e3) {
  if (!c?.beats?.length) return [];
  const s = c.source_audio.sample_rate, h = Number.isFinite(o?.start) ? o.start : 0, m = Number.isFinite(o?.end) && o.end > h ? o.end : Number.MAX_VALUE, y = c.beats.filter((C) => C.frame / s >= h - 0.05 && C.frame / s <= m + 0.05), _ = Math.max(1, Math.ceil(y.length / r));
  return y.filter((C, A) => A % _ === 0).map((C) => ({
    time: C.frame / s,
    emphasis: C.beat === c.origin_beat,
    label: `Corrected beat ${C.beat} · native pip ${(C.beat - c.origin_beat) * Zu}`,
    className: "stemlab-grid-corrected"
  }));
}
const Qu = 20, df = 400, y0 = (c, o, r) => Math.max(o, Math.min(r, c)), c0 = (c) => 100 * (1 - Math.log(y0(c, Qu, df) / Qu) / Math.log(df / Qu)), sb = (c, o) => Qu * (df / Qu) ** y0(1 - (c - o.top) / o.height, 0, 1);
async function cf(c, o = "GET", r) {
  const s = await fetch(
    `/api/${c}/beat-timeline${o === "POST" ? "/preview" : ""}`,
    { method: o, headers: { "Content-Type": "application/json" }, body: r === void 0 ? void 0 : JSON.stringify(r), cache: "no-store" }
  ), h = await s.json().catch(() => ({}));
  if (!s.ok) throw new Error(h.detail || `Beat timeline HTTP ${s.status}`);
  return h;
}
function rb({ map: c, duration: o, visible: r, selected: s, onSelect: h, onEdit: m, onInsert: y }) {
  const _ = c.source_audio.sample_rate, A = c.beats.map((v, j) => ({ row: v, i: j })).filter(({ row: v }) => {
    const j = v.frame / _;
    return j >= r.start - 0.1 && j <= r.end + 0.1;
  }), N = Math.max(1, Math.ceil(A.length / 2e3));
  return /* @__PURE__ */ d.jsx(
    "div",
    {
      className: "stemlab-beatmap-track",
      "aria-label": "Editable sample-accurate beat anchors",
      onDoubleClick: (v) => {
        if (v.target !== v.currentTarget) return;
        const j = v.currentTarget.getBoundingClientRect();
        y((v.clientX - j.left) / j.width * o), v.stopPropagation();
      },
      children: A.filter((v, j) => j % N === 0).map(({ row: v, i: j }) => /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          className: `stemlab-beatmap-anchor ${v.source} ${s === j ? "selected" : ""} ${v.beat === c.origin_beat ? "origin" : ""}`,
          "aria-label": `Beat ${v.beat}, ${tb(c, j).toFixed(6)} seconds, ${v.source}; drag or use arrow keys`,
          "aria-pressed": s === j,
          title: `Beat ${v.beat}: frame ${v.frame} · ${(v.frame / _).toFixed(6)} s · ${v.source}${v.reference_frame === null ? "" : ` · reference ${v.reference_frame}`}`,
          style: { left: `${v.frame / (_ * Math.max(o, 1e-9)) * 100}%` },
          onPointerDown: (B) => {
            B.currentTarget.setPointerCapture(B.pointerId), h(j), B.stopPropagation();
          },
          onPointerMove: (B) => {
            if (!B.currentTarget.hasPointerCapture(B.pointerId)) return;
            const P = B.currentTarget.parentElement.getBoundingClientRect();
            m(j, (B.clientX - P.left) / P.width * o), B.stopPropagation();
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
            const P = B.shiftKey ? Math.max(1, Math.round(_ / 1e3)) : 1;
            m(j, (v.frame + (B.key === "ArrowLeft" ? -P : P)) / _);
          },
          children: /* @__PURE__ */ d.jsx("span", { children: v.beat === c.origin_beat ? "1" : "" })
        },
        v.beat
      ))
    }
  );
}
function fb({ map: c, duration: o, visible: r, selected: s, onSelect: h, onTempo: m }) {
  const y = c.source_audio.sample_rate, _ = c.beats.slice(0, -1).map((N, v) => ({
    i: v,
    start: N.frame / y,
    end: c.beats[v + 1].frame / y,
    bpm: Qn(c, v)
  })).filter((N) => N.end >= r.start && N.start <= r.end), C = Math.max(1, Math.ceil(_.length / 1800)), A = _.filter((N, v) => v % C === 0);
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
        onPointerDown: (v) => {
          v.currentTarget.setPointerCapture(v.pointerId), h(N.i), v.stopPropagation();
        },
        onPointerMove: (v) => {
          if (!v.currentTarget.hasPointerCapture(v.pointerId)) return;
          const j = v.currentTarget.parentElement.getBoundingClientRect();
          m(N.i, sb(v.clientY, j)), v.stopPropagation();
        },
        onPointerUp: (v) => {
          v.currentTarget.releasePointerCapture(v.pointerId), v.stopPropagation();
        },
        onClick: (v) => {
          h(N.i), v.stopPropagation();
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
function ob(c, o, r = !0) {
  const [s, h] = D.useState(null), [m, y] = D.useState(!1), [_, C] = D.useState(null), [A, N] = D.useState(!1), [v, j] = D.useState(!1), [B, P] = D.useState(!0), [Y, $] = D.useState(0), [dt, V] = D.useState({ start: 0, end: 1 / 0 }), [Q, zt] = D.useState(!1), [St, Rt] = D.useState(!0), [J, st] = D.useState(""), [It, ut] = D.useState("0"), [rt, mt] = D.useState(""), [Ut, _t] = D.useState(!1), [Nt, q] = D.useState([]), [G, L] = D.useState([]), k = D.useRef(null), at = D.useRef(0), Dt = D.useRef(null);
  Dt.current = s;
  const Zt = D.useCallback(async (X = !1) => {
    if (!(A && !X && !window.confirm("Discard unsaved beat edits and reload the saved map?")))
      try {
        const nt = await cf(c);
        if (!nt.available) {
          j(!1);
          return;
        }
        _c(nt.map), h(nt.map), j(!0), y(nt.saved), C(nt.revision), N(!1), q([]), L([]), $(0), st(Qn(nt.map, 0)?.toFixed(3) || ""), mt(nt.saved ? "Loaded saved beat corrections" : "Prepared an editable proposal at exact consensus sample frames");
      } catch (nt) {
        nt.message.includes("HTTP 404") && !Dt.current ? P(!1) : mt(nt.message);
      }
  }, [c, A]);
  D.useEffect(() => {
    if (!r) return;
    let X = !0;
    const nt = async () => {
      X && await Zt(!0);
    };
    nt();
    const Ct = window.setInterval(() => {
      X && !Dt.current && nt();
    }, 5e3);
    return () => {
      X = !1, window.clearInterval(Ct);
    };
  }, [c]);
  const Jt = D.useCallback((X) => {
    try {
      const nt = Dt.current;
      if (!nt) return;
      const Ct = X(nt);
      nt.review_status === "artist_confirmed" && Ct.review_status === "artist_confirmed" && (Ct.beats !== nt.beats || Ct.origin_beat !== nt.origin_beat) && (Ct.review_status = "estimated"), _c(Ct), h(Ct), N(!0), q((je) => [...je.slice(-59), nt]), L([]), mt("Unsaved beat-map edits · original consensus unchanged");
    } catch (nt) {
      mt(nt.message);
    }
  }, []), p = () => {
    Nt.length && (L((X) => [...X.slice(-59), s]), h(Nt.at(-1)), q((X) => X.slice(0, -1)), N(!0));
  }, H = () => {
    G.length && (q((X) => [...X.slice(-59), s]), h(G.at(-1)), L((X) => X.slice(0, -1)), N(!0));
  }, I = (X) => {
    $(X), st(Qn(Dt.current, X)?.toFixed(3) || "");
  }, et = async (X) => {
    const nt = await cf(c, "POST", X);
    return _c(nt), nt;
  }, ht = async () => {
    if (s) {
      _t(!0);
      try {
        const X = await cf(c, "PUT", { map: s, expected_revision: _ });
        h(X.map), y(!0), C(X.revision), N(!1), q([]), L([]), mt("Beat corrections saved separately from the consensus detections");
      } catch (X) {
        mt(X.message);
      } finally {
        _t(!1);
      }
    }
  }, yt = async (X) => {
    if (s) {
      _t(!0);
      try {
        const nt = await et(s), Ct = JSON.stringify(nt, null, 2);
        if (X === "copy")
          await navigator.clipboard.writeText(Ct), mt("Copied one complete beat-timeline JSON value with Beat 1 and pip phase synchronisation");
        else {
          const je = new Blob([Ct + `
`], { type: "application/json" }), ie = URL.createObjectURL(je), Ht = document.createElement("a");
          Ht.href = ie, Ht.download = `stemlab-beat-timeline-${c.slice(0, 12)}.json`, document.body.appendChild(Ht), Ht.click(), Ht.remove(), URL.revokeObjectURL(ie), mt("Exported a single source-bound beat-timeline JSON file");
        }
      } catch (nt) {
        mt(nt.message);
      } finally {
        _t(!1);
      }
    }
  }, ft = async (X) => {
    const nt = X.target.files?.[0];
    if (X.target.value = "", !!nt) {
      if (nt.size > 32 * 1024 * 1024) {
        mt("Import limited to 32 MiB");
        return;
      }
      _t(!0);
      try {
        const Ct = JSON.parse(await nt.text()), je = await et(Ct);
        h(je), N(!0), q((ie) => s ? [...ie.slice(-59), s] : ie), L([]), mt("Imported and validated: review changes before saving. Original consensus unchanged.");
      } catch (Ct) {
        mt(Ct.message);
      } finally {
        _t(!1);
      }
    }
  }, K = (X, nt) => Jt((Ct) => eb(Ct, X, nt)), it = () => Jt((X) => ub(X)), ee = s && Q && o > 0 ? [
    {
      id: "corrected:anchors",
      title: "Corrected beats",
      kind: "beatmap",
      height: 80,
      meta: "Drag to place · arrows: 1 sample · Shift: 1 ms · double-click empty space to insert",
      content: { type: "custom", node: /* @__PURE__ */ d.jsx(
        rb,
        {
          map: s,
          duration: o,
          visible: dt,
          selected: Y,
          onSelect: I,
          onEdit: (X, nt) => Jt((Ct) => u0(Ct, X, nt)),
          onInsert: (X) => Jt((nt) => i0(nt, X))
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
        fb,
        {
          map: s,
          duration: o,
          visible: dt,
          selected: Y,
          onSelect: I,
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
      content: { type: "curve", points: ib(s).filter((X, nt) => nt % Math.max(1, Math.ceil(s.beats.length / 4e3)) === 0), colour: "#ecb7fd" }
    }
  ] : [], ye = s && St ? cb(s, dt) : [], Bt = s?.beats?.[Math.min(Y, s.beats.length - 1)], $t = s?.source_audio?.sample_rate || 1, qt = s && Y < s.beats.length - 1 ? Qn(s, Y) : null, xt = /* @__PURE__ */ d.jsxs("section", { className: "stemlab-beatmap-panel", "aria-label": "Editable variable tempo and Beat 1 phase", children: [
    /* @__PURE__ */ d.jsxs("header", { children: [
      /* @__PURE__ */ d.jsx("strong", { children: "Beat correction · variable BPM & phase" }),
      s && /* @__PURE__ */ d.jsxs("span", { children: [
        s.beats.length.toLocaleString(),
        " anchors · ",
        m ? "saved" : "consensus draft",
        A ? " · unsaved changes" : ""
      ] }),
      /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => zt((X) => !X), children: Q ? "Hide editor" : "Show editor" })
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
              value: Bt?.beat ?? 0,
              onChange: (X) => {
                const nt = s.beats.findIndex((Ct) => Ct.beat === Number(X.target.value));
                nt >= 0 && I(nt);
              }
            }
          )
        ] }),
        /* @__PURE__ */ d.jsxs("output", { children: [
          "Frame ",
          Bt?.frame ?? 0,
          " · ",
          Bt ? (Bt.frame / $t).toFixed(6) : "0",
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
              value: J,
              onChange: (X) => st(X.target.value),
              onKeyDown: (X) => {
                X.key === "Enter" && K(Y, Number(J));
              }
            }
          )
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: Y >= s.beats.length - 1, onClick: () => K(Y, Number(J)), children: "Apply BPM" }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Phase shift (pips) ",
          /* @__PURE__ */ d.jsx(
            "input",
            {
              "aria-label": "Global phase shift pips",
              type: "number",
              step: "0.25",
              value: It,
              onChange: (X) => ut(X.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => Jt((X) => lb(X, Number(It))), children: "Shift all beats" })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-beatmap-actions", children: [
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => Jt((X) => u0(X, Y, at.current)), children: "Place selected at playhead" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => Jt((X) => i0(X, at.current)), children: "Insert at playhead" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => Jt((X) => nb(X, Y)), children: "Set selected as Beat 1" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => Jt((X) => ab(X, Y)), children: "Delete selected" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: !Nt.length, onClick: p, children: "Undo" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: !G.length, onClick: H, children: "Redo" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: it, children: "Match consensus beats" }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          /* @__PURE__ */ d.jsx("input", { type: "checkbox", checked: St, onChange: (X) => Rt(X.target.checked) }),
          "Corrected grid"
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          /* @__PURE__ */ d.jsx(
            "input",
            {
              type: "checkbox",
              checked: s.review_status === "artist_confirmed",
              onChange: (X) => Jt((nt) => ({ ...nt, review_status: X.target.checked ? "artist_confirmed" : "estimated" }))
            }
          ),
          "Artist-reviewed Beat 1 / phase"
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-beatmap-export", children: [
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: Ut || !A, onClick: ht, children: "Save corrections" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: Ut, onClick: () => yt("download"), children: "Export Beat 1 + full beat timeline JSON" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: Ut, onClick: () => yt("copy"), children: "Copy JSON value" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: Ut, onClick: () => k.current?.click(), children: "Import JSON" }),
        /* @__PURE__ */ d.jsx("input", { ref: k, type: "file", accept: ".json,application/json", hidden: !0, onChange: ft }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => Zt(), children: "Reload saved/consensus" })
      ] }),
      /* @__PURE__ */ d.jsxs("small", { children: [
        "Current local BPM: ",
        qt?.toFixed(3) ?? "last anchor",
        " · original consensus matches remain labelled separately. Native timebase: 64 pips/beat, imported DanceMoves clocks use 16 ticks/beat. DanceMoves supports optional beat-timeline.v1 variable playback where its new consumer is installed; beat-alignment.v1 remains a separate fixed-tempo format."
      ] })
    ] }),
    !v && Q && /* @__PURE__ */ d.jsx("p", { children: "Waiting for an available consensus beat list (and exact master audio). No timing is invented." }),
    rt && /* @__PURE__ */ d.jsx("output", { role: "status", className: "stemlab-beatmap-status", children: rt })
  ] });
  return {
    map: s,
    revision: _,
    saved: m,
    ready: v,
    dirty: A,
    lanes: ee,
    grid: ye,
    panel: B ? xt : null,
    onWindowChange: V,
    onTimeChange: (X) => {
      at.current = X;
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
function Vn(c, o, r, s) {
  if (!Number.isSafeInteger(c) || c < o || c > r) throw new Error(`${s} cannot cross its parent, another event or source duration`);
  return c;
}
function db(c, o = "start_frame") {
  return c.every((r, s) => s === 0 || r[o] >= c[s - 1][o]);
}
function mb(c, o, r) {
  const s = bf(c), h = c.sample_rate, m = c.num_frames;
  if (!Number.isSafeInteger(h) || !Number.isSafeInteger(m) || h < 1 || m < 2) throw new Error("Invalid source-frame metadata");
  if (o === "cue") {
    const y = s.cues.findIndex((N) => N.id === r.id);
    if (y < 0) throw new Error("Cue not found");
    const _ = s.cues[y], C = yf(r.type ?? _.type, r.section ?? _.section), A = Vn($a(r.start, h), 0, m - 1, "Cue");
    if (s.cues[y] = { ...s.cues[y], frame: A, type: C.type, section: C.section }, !db(s.cues, "frame")) throw new Error("Cue movement must preserve chronological order");
  } else if (o === "line") {
    const y = s.lines.findIndex((j) => j.id === r.id);
    if (y < 0) throw new Error("Lyric line not found");
    const _ = s.lines[y], C = Vn($a(r.start, h), 0, m - 1, "Line"), A = Vn($a(r.end, h), C + 1, m, "Line");
    if (y > 0 && C < s.lines[y - 1].end_frame || y + 1 < s.lines.length && A > s.lines[y + 1].start_frame)
      throw new Error("Lyric line cannot cross neighbouring line bounds");
    s.lines[y] = { ..._, start_frame: C, end_frame: A };
    const N = C - _.start_frame, v = A - C === _.end_frame - _.start_frame;
    for (const j of s.words) if (j.line_id === _.id && (v && (j.start_frame += N, j.end_frame += N), j.start_frame < C || j.end_frame > A))
      throw new Error("Line edit would cut off a word; adjust its words first");
  } else if (o === "word") {
    const y = s.words.findIndex((B) => B.id === r.id);
    if (y < 0) throw new Error("Word not found");
    const _ = s.words[y], C = s.lines.find((B) => B.id === _.line_id);
    if (!C) throw new Error("Word parent line missing");
    const A = Vn($a(r.start, h), C.start_frame, C.end_frame - 1, "Word"), N = Vn($a(r.end, h), A + 1, C.end_frame, "Word"), v = s.words.filter((B) => B.line_id === _.line_id), j = v.findIndex((B) => B.id === _.id);
    if (j > 0 && A < v[j - 1].end_frame || j + 1 < v.length && N > v[j + 1].start_frame)
      throw new Error("Word cannot overlap a neighbour within the same lyric line");
    s.words[y] = { ..._, start_frame: A, end_frame: N };
  } else throw new Error("Expected line, word or cue edit");
  return s.review_status = "draft", s;
}
function hb(c, o, r, s = {}) {
  const h = bf(c), m = c.sample_rate, y = Vn($a(r, m), 0, c.num_frames - 1, "Playhead"), _ = new Set([...c.lines, ...c.words, ...c.cues].map((N) => N.id)), C = { line: "line", word: "word", cue: "cue" }[o];
  if (!C) throw new Error("Unknown timing track");
  let A;
  for (let N = 1; N <= 1e5 && (A = `${C}-edit-${N}`, !!_.has(A)); N++)
    ;
  if (_.has(A)) throw new Error("Too many events");
  if (o === "cue") {
    const { type: N, section: v } = yf(s.type || "SECTION", s.section || "INTRO");
    h.cues.push({ id: A, frame: y, type: N, section: v }), h.cues.sort((j, B) => j.frame - B.frame);
  } else if (o === "line") {
    const N = String(s.text || "").trim();
    if (!N) throw new Error("Type lyric text before adding a line");
    const v = c.lines.find((P) => P.start_frame > y), j = [...c.lines].reverse().find((P) => P.start_frame <= y);
    if (j && y < j.end_frame) throw new Error("Playhead is inside an existing line");
    const B = Math.min(c.num_frames, v?.start_frame ?? c.num_frames, y + Math.round(m * 2));
    if (B <= y) throw new Error("No room for a new line");
    h.lines.push({ id: A, start_frame: y, end_frame: B, text: N }), h.lines.sort((P, Y) => P.start_frame - Y.start_frame);
  } else {
    const N = h.lines.find(($) => $.id === s.lineId);
    if (!N) throw new Error("Select a lyric line before adding its word");
    const v = String(s.word || "").trim();
    if (!v) throw new Error("Type word text before adding a word");
    if (y < N.start_frame || y >= N.end_frame) throw new Error("Playhead must be within selected lyric line");
    const j = h.words.filter(($) => $.line_id === N.id), B = j.find(($) => $.start_frame > y), P = [...j].reverse().find(($) => $.start_frame <= y);
    if (P && P.end_frame > y) throw new Error("Playhead is already within another word");
    const Y = Math.min(N.end_frame, B?.start_frame ?? N.end_frame, y + Math.round(m * 0.25));
    if (Y <= y) throw new Error("No room within the selected lyric line");
    h.words.push({ id: A, line_id: N.id, start_frame: y, end_frame: Y, word: v }), h.words.sort(($, dt) => $.start_frame - dt.start_frame);
  }
  return h.review_status = "draft", h;
}
function vb(c, o, r) {
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
function gb(c, o, r) {
  const s = new Blob([c], { type: r }), h = URL.createObjectURL(s), m = document.createElement("a");
  try {
    m.href = h, m.download = o, document.body.appendChild(m), m.click(), m.remove();
  } finally {
    window.setTimeout(() => URL.revokeObjectURL(h), 1e3);
  }
}
function yb(c, o, r, s = !0) {
  const [h, m] = D.useState(null), [y, _] = D.useState(!1), [C, A] = D.useState(null), [N, v] = D.useState(!1), [j, B] = D.useState(!1), [P, Y] = D.useState(!1), [$, dt] = D.useState({ kind: "line", id: null }), [V, Q] = D.useState(""), [zt, St] = D.useState(!1), [Rt, J] = D.useState(0.15), [st, It] = D.useState(!1), [ut, rt] = D.useState({ start: 0, end: 1 / 0 }), [mt, Ut] = D.useState(""), [_t, Nt] = D.useState(""), [q, G] = D.useState("SECTION"), [L, k] = D.useState("INTRO"), [at, Dt] = D.useState("lines"), [Zt, Jt] = D.useState("bundle"), p = D.useRef(0), H = D.useRef(null), I = D.useRef(null), et = D.useRef(c), ht = D.useRef(!1);
  I.current = h;
  const yt = D.useCallback(async (x = !1) => {
    if (!(!x && I.current && N && !window.confirm("Discard unsaved song timing changes?")))
      try {
        const F = await Sc(c);
        if (!F.available) {
          Q(F.reason || "Waiting for exact source audio");
          return;
        }
        if (et.current !== c) return;
        m(F.document), _(F.saved), A(F.revision), v(!1), dt({ kind: "line", id: F.document.lines[0]?.id ?? null }), Q(F.warnings?.join(" · ") || "Song timing loaded · source evidence unchanged");
      } catch (F) {
        Q(F.message);
      }
  }, [c, N]);
  D.useEffect(() => {
    if (!s) return;
    et.current = c, m(null), A(null), v(!1), dt({ kind: "line", id: null }), yt(!0);
    const x = window.setInterval(() => {
      !I.current && !ht.current && yt(!0);
    }, 5e3);
    return () => window.clearInterval(x);
  }, [c]);
  const ft = D.useCallback((x) => {
    try {
      const F = I.current;
      if (!F) return;
      const Et = x(F);
      m(Et), v(!0), Q("Unsaved song timing edits · original evidence preserved");
    } catch (F) {
      Q(F.message);
    }
  }, []), K = h?.sample_rate || 1, it = h ? h.num_frames / K : Math.max(0, o), ee = h?.lines.find((x) => x.id === ($.kind === "line" ? $.id : h?.words.find((F) => F.id === $.id)?.line_id)) ?? h?.lines[0] ?? null, ye = $.kind, Bt = h?.[ye === "line" ? "lines" : ye === "word" ? "words" : "cues"].find((x) => x.id === $.id) ?? null, $t = !!(r?.map?.beats?.length && r?.map?.source_audio?.sha256 === c), qt = r?.revision ?? null, xt = h?.clock_mode === "variable", X = D.useMemo(() => h ? h.clock_mode === "variable" ? $t ? { ...r.map, mode: "variable" } : null : { mode: "fixed", bpm: h.fixed_clock.bpm, firstBeatSeconds: h.fixed_clock.first_beat_frame / K } : null, [h, $t, r?.map, K]), nt = (x) => {
    ft((F) => ({ ...F, clock_mode: x, beat_revision: x === "variable" ? qt : null, review_status: "draft" }));
  }, Ct = (x, F) => ft((Et) => ({ ...Et, fixed_clock: { ...Et.fixed_clock, [x]: F }, review_status: "draft" })), je = (x, F) => ft((Et) => mb(Et, x, F)), ie = (x) => ft((F) => hb(F, x, p.current, {
    text: mt,
    word: _t,
    lineId: ee?.id,
    type: q,
    section: L
  })), Ht = (x, F, Et) => ft((vt) => {
    if (!Et.trim() || /\r|\n|[\x00-\x1f]/.test(Et)) throw new Error("Text must be nonempty, without newlines");
    const oe = x === "line" ? "lines" : "words", ne = x === "line" ? "text" : "word";
    return { ...vt, [oe]: vt[oe].map((hl) => hl.id === F ? { ...hl, [ne]: Et.trim() } : hl), review_status: "draft" };
  }), Ol = (x, F, Et) => ft((vt) => {
    const oe = yf(F, Et);
    return { ...vt, cues: vt.cues.map((ne) => ne.id === x ? { ...ne, type: oe.type, section: oe.section } : ne), review_status: "draft" };
  }), Vl = async () => {
    if (h) {
      B(!0), ht.current = !0;
      try {
        if (xt && (r?.dirty || !$t)) throw new Error("Save/reload the corrected beat map first; an enabled variable clock must refer to the current real beat map");
        const x = await Sc(c, "PUT", { document: h, expected_revision: C });
        m(x.document), A(x.revision), _(!0), v(!1), Q("Saved exact source-frame corrections · original canonical, cue and ASR files unchanged");
      } catch (x) {
        Q(x.message);
      } finally {
        B(!1), ht.current = !1;
      }
    }
  }, _a = async () => {
    if (h) {
      B(!0), ht.current = !0;
      try {
        if (xt && (r?.dirty || !$t)) throw new Error("Save and verify the exact beat map before exporting variable-clock timing");
        const x = await Sc(c, "POST", { document: h }, "/preview"), F = {
          bundle: [JSON.stringify(x, null, 2) + `
`, Gu("timing-bundle", c) + ".json", "application/json"],
          lines: [x.line_lrc, Gu("lines", c) + ".lrc", "text/plain;charset=utf-8"],
          words: [x.word_tsv, Gu("words", c) + ".tsv", "text/tab-separated-values;charset=utf-8"],
          wordjson: [JSON.stringify(x.word_json, null, 2) + `
`, Gu("words", c) + ".json", "application/json"],
          cues: [x.cue_lrc, Gu("cues", c) + ".lrc", "text/plain;charset=utf-8"]
        };
        gb(...F[Zt]), Q(`Exported ${Zt} · source-bound clock and all timing forms remain available via the bundle`);
      } catch (x) {
        Q(x.message);
      } finally {
        B(!1), ht.current = !1;
      }
    }
  }, Ea = async (x) => {
    const F = x.target.files?.[0];
    if (x.target.value = "", !F || !h) return;
    if (F.size > 1048576) {
      Q("Timing import limited to 1 MiB");
      return;
    }
    const Et = F.name.split(".").at(-1).toLowerCase();
    B(!0), ht.current = !0;
    try {
      const vt = await Sc(c, "POST", { document: h, kind: at, format: Et, text: await F.text() }, "/import");
      m(vt.document), v(!0), Q(`Imported ${at} for review; not saved until Save corrections`);
    } catch (vt) {
      Q(vt.message);
    } finally {
      B(!1), ht.current = !1;
    }
  }, Re = (x) => {
    const F = x.start_frame ?? x.frame, Et = x.end_frame ?? F;
    return F / K <= ut.end + 0.01 && Et / K >= ut.start - 0.01;
  }, Ta = (x, F) => ({
    id: x.id,
    label: F === "cue" ? `[${x.type}: ${x.section}]` : F === "word" ? x.word : x.text,
    ...F === "cue" ? { type: x.type, section: x.section } : {},
    start: s0(x.start_frame ?? x.frame, K),
    ...F === "cue" ? {} : { end: s0(x.end_frame, K) },
    ...F === "word" ? { parentId: x.line_id } : {}
  }), ml = h?.lines || [], Zn = (h?.words || []).filter((x) => x.line_id === ee?.id), Ql = (x, F, Et = null) => ({
    id: `timing:${x}`,
    kind: `timing-${x}`,
    title: x === "line" ? "Lyric lines · editable" : x === "word" ? `Words · ${ee?.text || "select a line"}` : "Cue sections · editable",
    meta: `${F.length} ${x} events · drag or arrow to adjust · ${X?.mode || "no clock"} match`,
    height: x === "word" ? 88 : 94,
    content: {
      type: "timing",
      kind: x,
      clock: X,
      editable: !0,
      snap: zt,
      toleranceSeconds: Rt,
      items: F.filter(Re).slice(0, 1600).map((vt) => Ta(vt, x)),
      parents: Et ? Et.map((vt) => ({ id: vt.id, start: vt.start_frame / K, end: vt.end_frame / K })) : void 0,
      selectedId: $.kind === x ? $.id : null,
      onSelect: (vt) => dt({ kind: x, id: vt }),
      onEdit: (vt) => je(x, vt)
    }
  }), R = h && P ? [
    Ql("line", ml),
    Ql("word", Zn, ml),
    Ql("cue", h.cues)
  ] : [], ot = /* @__PURE__ */ d.jsxs("section", { className: "stemlab-timing-panel", "aria-label": "Editable lyric, word and cue timing", children: [
    /* @__PURE__ */ d.jsxs("header", { children: [
      /* @__PURE__ */ d.jsx("strong", { children: "Song timing · line lyrics, words & cue sections" }),
      /* @__PURE__ */ d.jsx("span", { children: h ? `${h.lines.length} lines · ${h.words.length} words · ${h.cues.length} cues · ${N ? "unsaved" : "saved/seeded"}` : "Awaiting master" }),
      /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => Y((x) => !x), children: P ? "Hide timing editor" : "Show timing editor" })
    ] }),
    P && h && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsx("p", { children: "Line, word and cue edits are kept in a separate source-bound document. Choose a lyric line to adjust its individual words. Cue names must follow the established [SECTION: VERSE 1] / [DROP: CHORUS 1] convention." }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-timing-fields", children: [
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Timing clock ",
          /* @__PURE__ */ d.jsxs("select", { "aria-label": "Timing clock", value: h.clock_mode, onChange: (x) => nt(x.target.value), children: [
            /* @__PURE__ */ d.jsx("option", { value: "fixed", children: "Fixed BPM + Beat 1 offset" }),
            /* @__PURE__ */ d.jsx("option", { value: "variable", disabled: !$t, children: "Corrected variable BPM beat map" })
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
              onChange: (x) => Ct("bpm", Number(x.target.value))
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
              max: it,
              step: ".001",
              value: h.fixed_clock.first_beat_frame / K,
              onChange: (x) => Ct("first_beat_frame", $a(x.target.value, K))
            }
          )
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          /* @__PURE__ */ d.jsx("input", { type: "checkbox", checked: zt, onChange: (x) => St(x.target.checked) }),
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
              value: Math.round(Rt * 1e3),
              onChange: (x) => J(Math.max(0, Math.min(1, Number(x.target.value) / 1e3)))
            }
          )
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          /* @__PURE__ */ d.jsx("input", { type: "checkbox", checked: st, onChange: (x) => It(x.target.checked) }),
          "Beat grid overlay"
        ] })
      ] }),
      xt && !$t && /* @__PURE__ */ d.jsx("p", { role: "alert", children: "Variable BPM is selected but its source-bound beat map is unavailable; no silent fixed-BPM downgrade." }),
      xt && r?.dirty && /* @__PURE__ */ d.jsx("p", { role: "alert", children: "Save the beat-map corrections before saving/exporting lyric and cue timing changes." }),
      xt && $t && h.beat_revision !== qt && /* @__PURE__ */ d.jsxs("p", { role: "alert", children: [
        "The saved beat-map revision has changed. Review its timing, then explicitly rebind these lyrics and cues to that revision. ",
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: r.dirty, onClick: () => ft((x) => ({ ...x, beat_revision: qt, review_status: "draft" })), children: "Rebind to reviewed beat-map revision" })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-timing-fields", children: [
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Selected line ",
          /* @__PURE__ */ d.jsxs("select", { "aria-label": "Selected lyric line", value: ee?.id || "", onChange: (x) => dt({ kind: "line", id: x.target.value }), children: [
            /* @__PURE__ */ d.jsx("option", { value: "", children: "Choose line" }),
            h.lines.map((x) => /* @__PURE__ */ d.jsx("option", { value: x.id, children: x.text.slice(0, 75) }, x.id))
          ] })
        ] }),
        Bt && ye !== "cue" && /* @__PURE__ */ d.jsxs("label", { children: [
          ye === "line" ? "Line text" : "Word text",
          /* @__PURE__ */ d.jsx(
            "input",
            {
              "aria-label": "Selected text",
              value: ye === "line" ? Bt.text : Bt.word,
              onChange: (x) => Ht(ye, Bt.id, x.target.value)
            }
          )
        ] }),
        Bt && ye === "cue" && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
          /* @__PURE__ */ d.jsxs("label", { children: [
            "Cue type ",
            /* @__PURE__ */ d.jsx("select", { value: Bt.type, onChange: (x) => Ol(Bt.id, x.target.value, Bt.section), children: mf.map((x) => /* @__PURE__ */ d.jsx("option", { value: x, children: x }, x)) })
          ] }),
          /* @__PURE__ */ d.jsxs("label", { children: [
            "Standard section ",
            /* @__PURE__ */ d.jsx(
              "select",
              {
                value: Vu.find((x) => Bt.section === x || Bt.section.startsWith(x + " ")) || "INTRO",
                onChange: (x) => Ol(Bt.id, Bt.type, x.target.value),
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
                value: Bt.section.match(/ (\d+|A|B|FINAL)$/)?.[1] || "",
                onChange: (x) => {
                  const F = Vu.find((Et) => Bt.section === Et || Bt.section.startsWith(Et + " ")) || "INTRO";
                  Ol(Bt.id, Bt.type, F + (x.target.value ? " " + x.target.value : ""));
                },
                children: [
                  /* @__PURE__ */ d.jsx("option", { value: "", children: "None" }),
                  Array.from({ length: 64 }, (x, F) => String(F + 1)).concat(["A", "B", "FINAL"]).map((x) => /* @__PURE__ */ d.jsx("option", { value: x, children: x }, x))
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-timing-fields", children: [
        /* @__PURE__ */ d.jsxs("label", { children: [
          "New line text ",
          /* @__PURE__ */ d.jsx("input", { value: mt, placeholder: "Lyrics line", onChange: (x) => Ut(x.target.value) })
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => ie("line"), children: "Add line at playhead" }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "New word ",
          /* @__PURE__ */ d.jsx("input", { value: _t, placeholder: "Single word", onChange: (x) => Nt(x.target.value) })
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: !ee, onClick: () => ie("word"), children: "Add word inside selected line" })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-timing-fields", children: [
        /* @__PURE__ */ d.jsxs("label", { children: [
          "New cue type ",
          /* @__PURE__ */ d.jsx("select", { value: q, onChange: (x) => G(x.target.value), children: mf.map((x) => /* @__PURE__ */ d.jsx("option", { children: x }, x)) })
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Section ",
          /* @__PURE__ */ d.jsx("select", { value: L, onChange: (x) => k(x.target.value), children: Vu.map((x) => /* @__PURE__ */ d.jsx("option", { children: x }, x)) })
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => ie("cue"), children: "Add cue at playhead" }),
        /* @__PURE__ */ d.jsxs("button", { type: "button", disabled: !Bt, onClick: () => ft((x) => vb(x, ye, $.id)), children: [
          "Delete selected ",
          ye
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          /* @__PURE__ */ d.jsx("input", { type: "checkbox", checked: h.review_status === "artist_confirmed", onChange: (x) => ft((F) => ({ ...F, review_status: x.target.checked ? "artist_confirmed" : "draft" })) }),
          "Artist-reviewed timing"
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-timing-actions", children: [
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: j || !N, onClick: Vl, children: "Save source-frame corrections" }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Export format ",
          /* @__PURE__ */ d.jsxs("select", { value: Zt, onChange: (x) => Jt(x.target.value), children: [
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
          /* @__PURE__ */ d.jsxs("select", { value: at, onChange: (x) => Dt(x.target.value), children: [
            /* @__PURE__ */ d.jsx("option", { value: "lines", children: "Per-line LRC" }),
            /* @__PURE__ */ d.jsx("option", { value: "words", children: "Per-word LRC/TSV/JSON" }),
            /* @__PURE__ */ d.jsx("option", { value: "cues", children: "Section-cue LRC" })
          ] })
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: j, onClick: () => H.current?.click(), children: "Choose timing file" }),
        /* @__PURE__ */ d.jsx("input", { ref: H, type: "file", hidden: !0, accept: at === "words" ? ".lrc,.tsv,.json" : ".lrc", onChange: Ea }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: j, onClick: () => yt(), children: "Reload saved" })
      ] }),
      /* @__PURE__ */ d.jsx("small", { children: "Word positions must stay inside their lyric line. An off-grid word/cue is preserved until you explicitly drag or enable nearby-beat snapping. Pips=64/beat, DanceMoves ticks=16/beat. LRC/TSV exports round timestamps; the JSON retains native frames." })
    ] }),
    P && !h && /* @__PURE__ */ d.jsx("p", { children: "Waiting for decoded source audio; no lyric or cue times are invented." }),
    V && /* @__PURE__ */ d.jsx("output", { role: "status", className: "stemlab-timing-status", children: V })
  ] });
  return { clock: X, lanes: R, panel: ot, gridVisible: st, onWindowChange: rt, onTimeChange: (x) => {
    p.current = x;
  } };
}
function bb(c, o) {
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
function pb(c) {
  const [o, r] = D.useState({ report: null, error: "" });
  D.useEffect(() => {
    let h = !0, m, y = "";
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
          y = "", r({ report: null, error: "" });
        else {
          if (!A.ok) throw new Error(`Loop report: HTTP ${A.status}`);
          const N = await A.json();
          if (N.schema === "stemlab.loop-availability.v1" && N.status === "not-analysed") {
            r({ report: null, error: "", note: N.reason });
            return;
          }
          if (N.schema !== "stemlab.loops.v1") throw new Error("Unsupported loop report schema");
          const v = JSON.stringify(N);
          h && v !== y && (r({ report: N, error: "" }), y = v);
        }
      } catch (A) {
        h && A.name !== "AbortError" && (y = "", r({ report: null, error: A.message }));
      } finally {
        h && (m = window.setTimeout(C, 2500));
      }
    };
    return C(), () => {
      h = !1, _.abort(), window.clearTimeout(m);
    };
  }, [c]);
  const s = D.useMemo(() => bb(o.report, c), [o.report, c]);
  return { ...o, loops: s };
}
function Sb({ state: c, hash: o }) {
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
const Me = (c) => document.querySelector(c), _b = Me("#uploadView"), pf = Me("#timelineView"), Fa = Me("#dropZone"), Ku = Me("#fileInput"), b0 = Me("#chooseButton"), p0 = Me("#uploadProgressWrap"), Ec = Me("#uploadProgress"), Tc = Me("#uploadLabel"), ba = Me("#connectionBadge"), S0 = Me("#canonicalBpm"), _0 = Me("#canonicalLyrics"), E0 = Me("#canonicalTiming"), hf = Me("#knownInfoStatus"), Eb = Me("#loadArcadiansReference"), Tb = Me("#loadArcadiansHero"), Nb = Array.from(pf.children), Sf = document.createElement("div");
Sf.id = "timelineRoot";
pf.replaceChildren(Sf);
for (const c of Nb) c.remove();
const xb = zy.createRoot(Sf), Mb = /* @__PURE__ */ new Set(["wav", "flac", "mp3", "ogg", "opus", "m4a", "aif", "aiff"]);
let vf = {};
function Ob(c) {
  const o = String(c).split("/").pop() || "", r = o.lastIndexOf(".");
  return r >= 0 ? o.slice(r + 1).toLowerCase() : "";
}
function ol(c) {
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
function dl(c, o = 2, r = "") {
  const s = Number(c);
  return Number.isFinite(s) ? `${s.toFixed(o)}${r}` : "—";
}
function Ja(c, o, r, s, h = "feature") {
  const m = s.filter(([, y]) => y != null && y !== "");
  return {
    id: c,
    title: o,
    meta: r,
    kind: h,
    content: {
      type: "summary",
      items: (m.length ? m : [["status", "analysis available"]]).map(([y, _]) => ({ label: y, value: _ }))
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
function zb(c) {
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
  const m = new URLSearchParams({ path: h, points: "12000" }), y = await fetch(`/api/${c}/waveform?${m}`);
  if (!y.ok) return { id: o, title: r, meta: s, kind: "artifact", content: Nc(c, h, `waveform unavailable (${y.status})`) };
  const _ = await y.json();
  return { id: o, title: r, meta: s, kind: "waveform", content: { type: "waveform", min: _.min || [], max: _.max || [] }, duration: Number(_.duration_seconds) || 0 };
}
async function Cb(c, o) {
  const r = o.path, s = `file:${r}`, h = Ob(r);
  if (r === "canonical.json" || r.startsWith("deep/loops/")) return null;
  if (Mb.has(h)) return T0(c, s, ol(r), "audio waveform", r);
  if (r.startsWith("spectrograms/") && h === "npz") {
    const m = new URLSearchParams({ path: r, max_width: "8192", max_height: "768" });
    return { id: s, title: ol(r), meta: "spectrogram data · exact song timeline", kind: "spectrogram", content: { type: "image", src: `/api/${c}/spectrogram?${m}`, alt: `${ol(r)} spectrogram` } };
  }
  if (r.startsWith("spectrograms/") && h === "png")
    return { id: s, title: ol(r), meta: "rendered spectrogram PNG", kind: "image", content: { type: "image", src: _f(c, r), alt: `${ol(r)} rendered spectrogram` } };
  try {
    if (r === "analysis.json") {
      const m = await ke(c, r);
      return {
        id: s,
        title: ol(r),
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
        title: `MIDI · ${m.source_stem || ol(r)}`,
        meta: `${m.model_title || m.model || "Transcription"} · ${m.note_count || 0} inferred notes · original audio clock`,
        kind: "midi-notes",
        content: { type: "notes", items: (m.notes || []).map((y) => ({
          start: y.start,
          end: y.end,
          value: y.midi_pitch,
          label: `MIDI ${y.midi_pitch} · velocity ${y.velocity}`
        })) }
      };
    }
    if (r.startsWith("beats/") && h === "json") {
      const m = await ke(c, r), y = new Set((m.downbeats || []).map((_) => Number(_).toFixed(3)));
      return { id: s, title: ol(r), meta: "beat / downbeat events", kind: "events", content: { type: "markers", items: (m.beats || []).flatMap((_) => {
        const C = Number(_);
        return Number.isFinite(C) ? [{ time: C, emphasis: y.has(C.toFixed(3)), label: y.has(C.toFixed(3)) ? "Downbeat" : "Beat" }] : [];
      }) } };
    }
    if (r.startsWith("vamp/data/") && h === "json") {
      const m = await ke(c, r);
      return { id: s, title: ol(r), meta: "Vamp feature analysis", kind: "feature", content: zb(m) };
    }
    if (r === "speech/whisper.json") {
      const m = await ke(c, r);
      return { id: s, title: "Speech · Whisper words", meta: "word-aligned transcript", kind: "words", content: { type: "blocks", items: (m.words || []).flatMap((y) => {
        const _ = Number(y.start), C = Number(y.end);
        return Number.isFinite(_) ? [{ start: _, end: Number.isFinite(C) ? Math.max(_ + 0.03, C) : _ + 0.03, label: String(y.word || "").trim() }] : [];
      }) } };
    }
    if (r === "deep/structure/structure.json" || r === "deep/song_map/song_map.json") {
      const m = await ke(c, r), y = r.includes("song_map");
      return { id: s, title: y ? "Deep · song map" : "Deep · functional structure", meta: y ? "section-level sonic / rhythm / harmony / lyric fusion" : "All-In-One · functional song sections", kind: "deep-structure", content: { type: "blocks", items: xc(y ? m.sections : m.segments) } };
    }
    if (r === "deep/harmony/harmony.json") {
      const m = await ke(c, r), y = m.chords?.collapsed_progression || [];
      return y.length ? { id: s, title: "Deep · harmony", meta: "collapsed chord progression + key evidence", kind: "deep-harmony", content: { type: "blocks", items: xc(y) } } : Ja(s, "Deep · harmony", "collapsed chord progression + key evidence", [["key", m.vamp_key || m.independent_key_candidates_from_nnls_chroma?.[0]?.key || "—"], ["tuning", m.tuning_hz ? `${Number(m.tuning_hz).toFixed(1)} Hz` : "—"]], "deep-harmony");
    }
    if (r === "deep/lyrics/lyrics.json") {
      const m = await ke(c, r), y = (m.lines || []).filter((_) => Number.isFinite(Number(_.start)) && Number.isFinite(Number(_.end)));
      return y.length ? { id: s, title: "Deep · rhyme & prosody", meta: "phonetic rhyme, repetition and delivery", kind: "deep-lyrics", content: { type: "blocks", items: xc(y) } } : Ja(s, "Deep · rhyme & prosody", "phonetic rhyme, repetition and delivery", [["rhyme scheme", m.rhyme?.scheme || "—"], ["lines", m.line_count ?? "—"], ["words", m.word_count ?? "—"]], "deep-lyrics");
    }
    if (r === "deep/sonic/sonic.json") {
      const m = await ke(c, r);
      return Ja(s, "Deep · sonic profile", "loudness · dynamics · timbre · stereo", [["LUFS", dl(m.loudness?.integrated_lufs_bs1770, 1)], ["crest", dl(m.loudness?.crest_factor_db, 1, " dB")], ["RMS range", dl(m.loudness?.short_term_rms_range_db_p95_p10, 1, " dB")], ["centroid", dl(m.timbre?.spectral_centroid_hz_mean, 0, " Hz")], ["stereo corr", dl(m.stereo?.left_right_correlation, 2)]]);
    }
    if (r === "deep/rhythm/rhythm.json") {
      const m = await ke(c, r);
      return Ja(s, "Deep · groove", "meter · stability · swing · syncopation evidence", [["tempo", dl(m.tempo?.median_bpm, 2, " BPM")], ["meter", m.meter?.estimated_beats_per_bar ? `${m.meter.estimated_beats_per_bar}/4-ish` : "—"], ["swing", dl(m.groove?.swing_ratio_long_to_short, 2, ":1")], ["offbeat energy", dl(m.groove?.offbeat_onset_energy_ratio, 3)], ["onsets/s", dl(m.groove?.onset_density_per_second, 2)]]);
    }
    if (r === "deep/semantic_text/semantic_text.json") {
      const m = await ke(c, r);
      return Ja(s, "Deep · lyric semantics", "sentence embedding theme similarities · not probabilities", (m.theme_similarity || []).slice(0, 7).map((y) => [y.theme, dl(y.similarity, 3)]));
    }
    if (r === "deep/semantic_audio/semantic_audio.json") {
      const m = await ke(c, r), y = Object.entries(m.prompt_sets || {}).flatMap(([_, C]) => (C || []).slice(0, 2).map((A) => [`${_}: ${A.prompt}`, dl(A.similarity, 3)]));
      return Ja(s, "Deep · audio semantics", "MuQ-MuLan zero-shot similarities · CC-BY-NC weights", y);
    }
    if (r === "deep/summary.json") {
      const m = await ke(c, r), y = Object.entries(m.analyses || {}).map(([_, C]) => [_, C.available ? "ready" : "unavailable"]);
      return (m.errors || []).length && y.push(["errors", m.errors.length]), Ja(s, "Deep · analysis summary", "cross-domain action inventory", y);
    }
  } catch (m) {
    return { id: s, title: ol(r), meta: "analysis artifact", kind: "artifact", content: Nc(c, r, m.message) };
  }
  return { id: s, title: ol(r), meta: `${h || "file"} · ${Number(o.bytes || 0).toLocaleString()} bytes`, kind: "artifact", content: Nc(c, r) };
}
function Ab(c) {
  const o = [];
  c?.lyrics && o.push({ id: "canonical:lyrics", title: "Canonical lyrics", meta: "known reference text", kind: "canonical-lyrics", height: 104, content: { type: "text", text: c.lyrics } });
  const r = Array.isArray(c?.lyric_timing) ? c.lyric_timing : [];
  return r.length && o.push({ id: "canonical:timing", title: "Canonical lyric timing", meta: `${r.length} timed lyric event${r.length === 1 ? "" : "s"}`, kind: "canonical-timing", height: 104, content: { type: "blocks", items: r.flatMap((s) => {
    const h = Number(s.start), m = Number(s.end);
    return Number.isFinite(h) && h >= 0 ? [{ start: h, end: Number.isFinite(m) && m > h ? m : h + 0.75, label: String(s.text || ""), className: "stemlab-canonical-lyric" }] : [];
  }) } }), { lanes: o };
}
function jb({ lines: c }) {
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
function Rb({ hash: c, filename: o }) {
  const r = pb(c), [s, h] = D.useState([]), [m, y] = D.useState(0), _ = !window.__stemlabStatic, C = ob(c, m, _), A = yb(c, m, C, _), [N, v] = D.useState({ state: "submitted" }), [j, B] = D.useState({ bpm: null, lyrics: null, lyric_timing: [] }), [P, Y] = D.useState(null), [$, dt] = D.useState("canonical"), [V, Q] = D.useState("consensus"), [zt, St] = D.useState([]), Rt = D.useRef(/* @__PURE__ */ new Set()), J = D.useCallback((G, L) => {
    L && St((k) => [...k.slice(-799), { stream: G === "stderr" ? "stderr" : "stdout", text: L }]);
  }, []), st = D.useCallback(async (G) => {
    if (!G?.path || Rt.current.has(G.path)) return;
    Rt.current.add(G.path);
    const L = await Cb(c, G);
    L && (L.duration && y((k) => k || L.duration), h((k) => k.some((at) => at.id === L.id) ? k : [...k, L]));
  }, [c]), It = D.useCallback(async () => {
    const G = await fetch(`/api/${c}/timeline`, { cache: "no-store" });
    if (!G.ok) return;
    const L = await G.json();
    v(L.status || { state: "submitted" }), L.duration_seconds && y(Number(L.duration_seconds)), L.canonical && B(L.canonical), Y(L.beat_offsets || null);
    for (const k of L.files || []) st(k);
  }, [st, c]);
  D.useEffect(() => {
    Rt.current = /* @__PURE__ */ new Set(), h([]), Y(null), dt("canonical"), Q("consensus"), T0(c, "__source__", "MASTER · uploaded source", o, "__source__").then((k) => {
      k.duration && y(k.duration), h((at) => [k, ...at.filter((Dt) => Dt.id !== k.id)]);
    }).catch((k) => J("stderr", k.message)), It();
    const G = window.setInterval(() => {
      It();
    }, 2500);
    let L = null;
    return typeof window.io == "function" ? (L = window.io({ path: "/socket.io" }), L.on("connect", () => {
      ba.textContent = "live", ba.classList.remove("muted"), L.emit("subscribe", { hash: c });
    }), L.on("disconnect", () => {
      ba.textContent = "reconnecting", ba.classList.add("muted");
    }), L.on("process_output", (k) => J(k.stream || "stdout", k.line || "")), L.on("process_history", (k) => {
      for (const at of k.stdout || []) J("stdout", at);
      for (const at of k.stderr || []) J("stderr", at);
    }), L.on("new_file", (k) => {
      st(k);
    }), L.on("job_status", (k) => {
      v(k.status || {}), It();
    }), L.on("canonical_metadata", (k) => {
      k?.canonical && B(k.canonical);
    }), L.on("job_timeout", (k) => J("stderr", `Job timeout: ${k.message || "analysis exceeded timeout"}`))) : window.__stemlabStatic ? (ba.textContent = "static", ba.classList.add("muted")) : (ba.textContent = "polling", ba.classList.add("muted"), J("stderr", "Socket.IO browser client unavailable; timeline inventory polling remains active.")), () => {
      window.clearInterval(G), L?.disconnect();
    };
  }, [st, J, o, c, It]);
  const ut = D.useMemo(() => Ab(j), [j]), rt = D.useMemo(() => Wy(P, j.bpm, m, $, V), [P, j.bpm, m, $, V]), mt = (G) => G.id === "__source__" ? 0 : G.kind === "deep-structure" ? 10 : G.kind === "events" ? 20 : G.kind === "audio" ? 1 : G.kind === "spectrogram" ? 30 : G.kind === "waveform" ? 40 : 90, Ut = D.useMemo(() => ky(s), [s]), Nt = [...rt.basis ? [
    { id: "canonical:bpm", title: "BPM grid · original", meta: `${rt.basis.bpm.toFixed(4)} BPM · source time 0`, kind: "canonical-bpm", height: 74, content: { type: "markers", items: rt.original } },
    { id: "bpm:aligned", title: "BPM grid · offset", meta: rt.row ? `${rt.row.offset_pips.toFixed(6)} pips · ${rt.analysis.analysis_id}` : "Waiting for detected first beat", kind: "canonical-bpm", height: 74, content: { type: "markers", items: rt.aligned } }
  ] : [], ...C.lanes, ...A.lanes, ...ut.lanes, ...[...Ut].sort((G, L) => mt(G) - mt(L) || G.id.localeCompare(L.id))], q = N.state || "submitted";
  return /* @__PURE__ */ d.jsx(
    $y,
    {
      className: "stemlab-timeline",
      laneControls: !0,
      wheelNavigation: !0,
      audioSrc: `/api/${c}/source`,
      duration: m,
      title: j.title || o,
      subtitle: c,
      loops: r.loops,
      lanes: Nt,
      grid: [...rt.grid, ...C.grid],
      beatClock: A.clock,
      showBeatGrid: A.gridVisible,
      onDurationChange: y,
      onWindowChange: (G) => {
        C.onWindowChange(G), A.onWindowChange(G);
      },
      onTimeChange: (G) => {
        C.onTimeChange(G), A.onTimeChange(G);
      },
      onPlaybackError: (G) => J("stderr", G instanceof Error ? G.message : String(G)),
      headerEnd: /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
        /* @__PURE__ */ d.jsx("span", { className: `badge ${q}`, children: q }),
        /* @__PURE__ */ d.jsxs("span", { className: "small", children: [
          Nt.length,
          " lane",
          Nt.length === 1 ? "" : "s"
        ] })
      ] }),
      footer: /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
        /* @__PURE__ */ d.jsx(Iy, { comparison: rt, onBasis: dt, onAnalysis: Q }),
        _ && C.panel,
        _ && A.panel,
        /* @__PURE__ */ d.jsx(Sb, { state: r, hash: c }),
        /* @__PURE__ */ d.jsx(jb, { lines: zt }),
        /* @__PURE__ */ d.jsx("span", { className: "dock-links", children: /* @__PURE__ */ d.jsx("a", { href: "https://kieransimkin.co.uk/my-songs/", target: "_blank", rel: "noopener", children: "Kieran Simkin · My Songs ↗" }) })
      ] })
    }
  );
}
function Db() {
  const c = S0?.value?.trim() || "", o = _0?.value || "", r = E0?.value || "";
  return { ...vf, bpm: c ? Number(c) : null, lyrics: o.trim() || null, lyric_timing: r.trim() || [] };
}
function wb(c) {
  return Number.isFinite(Number(c.bpm)) || !!c.lyrics || !!(typeof c.lyric_timing == "string" && c.lyric_timing.trim()) || !!(Array.isArray(c.lyric_timing) && c.lyric_timing.length);
}
async function Ub(c) {
  const o = Db();
  if (!wb(o)) return;
  const r = await fetch(`/api/${c}/canonical`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(o) }), s = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(s.detail || `Could not save canonical metadata (${r.status})`);
  hf.textContent = "Known information saved with this song hash.";
}
function Bb(c) {
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
  _b.classList.add("hidden"), pf.classList.remove("hidden"), xb.render(/* @__PURE__ */ d.jsx(Rb, { hash: c, filename: o || "uploaded audio" }, c));
}
async function x0(c) {
  if (c) {
    Ec.style.width = "0%", Tc.textContent = `Uploading ${c.name}`, p0.classList.remove("hidden");
    try {
      const o = await Bb(c);
      Ec.style.width = "100%", Tc.textContent = "Upload complete · attaching to analysis", await Ub(o.hash), await N0(o.hash, o.filename || c.name);
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
    S0.value = r.bpm ?? "", _0.value = r.lyrics ?? "", E0.value = Array.isArray(r.lyric_timing) && r.lyric_timing.length ? JSON.stringify(r.lyric_timing, null, 2) : "", Me(".known-info").open = !0, hf.textContent = r.lyric_timing?.length ? `Loaded ${r.title || "Arcadians"}: canonical release metadata, sections, ${r.bpm} BPM, lyrics and timing.` : `Loaded ${r.title || "Arcadians"} canonical reference metadata.`;
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
Eb?.addEventListener("click", M0);
Tb?.addEventListener("click", M0);
const sf = new URLSearchParams(location.search).get("hash");
sf && /^[0-9a-f]{64}$/i.test(sf) && N0(sf.toLowerCase(), "Existing analysis");
export {
  Sa as formatTimelineTime
};
