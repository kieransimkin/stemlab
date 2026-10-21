var uo = { exports: {} }, Qu = {};
var $h;
function py() {
  if ($h) return Qu;
  $h = 1;
  var c = /* @__PURE__ */ Symbol.for("react.transitional.element"), f = /* @__PURE__ */ Symbol.for("react.fragment");
  function r(s, g, m) {
    var y = null;
    if (m !== void 0 && (y = "" + m), g.key !== void 0 && (y = "" + g.key), "key" in g) {
      m = {};
      for (var S in g)
        S !== "key" && (m[S] = g[S]);
    } else m = g;
    return g = m.ref, {
      $$typeof: c,
      type: s,
      key: y,
      ref: g !== void 0 ? g : null,
      props: m
    };
  }
  return Qu.Fragment = f, Qu.jsx = r, Qu.jsxs = r, Qu;
}
var kh;
function Sy() {
  return kh || (kh = 1, uo.exports = py()), uo.exports;
}
var d = Sy(), io = { exports: {} }, ht = {};
var Fh;
function _y() {
  if (Fh) return ht;
  Fh = 1;
  var c = /* @__PURE__ */ Symbol.for("react.transitional.element"), f = /* @__PURE__ */ Symbol.for("react.portal"), r = /* @__PURE__ */ Symbol.for("react.fragment"), s = /* @__PURE__ */ Symbol.for("react.strict_mode"), g = /* @__PURE__ */ Symbol.for("react.profiler"), m = /* @__PURE__ */ Symbol.for("react.consumer"), y = /* @__PURE__ */ Symbol.for("react.context"), S = /* @__PURE__ */ Symbol.for("react.forward_ref"), C = /* @__PURE__ */ Symbol.for("react.suspense"), A = /* @__PURE__ */ Symbol.for("react.memo"), E = /* @__PURE__ */ Symbol.for("react.lazy"), h = /* @__PURE__ */ Symbol.for("react.activity"), j = /* @__PURE__ */ Symbol.for("react.view_transition"), B = Symbol.iterator;
  function J(p) {
    return p === null || typeof p != "object" ? null : (p = B && p[B] || p["@@iterator"], typeof p == "function" ? p : null);
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
  }, I = Object.assign, dt = {};
  function V(p, H, tt) {
    this.props = p, this.context = H, this.refs = dt, this.updater = tt || L;
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
  function K() {
  }
  K.prototype = V.prototype;
  function Nt(p, H, tt) {
    this.props = p, this.context = H, this.refs = dt, this.updater = tt || L;
  }
  var Tt = Nt.prototype = new K();
  Tt.constructor = Nt, I(Tt, V.prototype), Tt.isPureReactComponent = !0;
  var vt = Array.isArray;
  function Z() {
  }
  var ot = { H: null, A: null, T: null, S: null }, Pt = Object.prototype.hasOwnProperty;
  function it(p, H, tt) {
    var P = tt.ref;
    return {
      $$typeof: c,
      type: p,
      key: H,
      ref: P !== void 0 ? P : null,
      props: tt
    };
  }
  function st(p, H) {
    return it(p.type, H, p.props);
  }
  function mt(p) {
    return typeof p == "object" && p !== null && p.$$typeof === c;
  }
  function Ut(p) {
    var H = { "=": "=0", ":": "=2" };
    return "$" + p.replace(/[=:]/g, function(tt) {
      return H[tt];
    });
  }
  var Mt = /\/+/g;
  function bt(p, H) {
    return typeof p == "object" && p !== null && p.key != null ? Ut("" + p.key) : H.toString(36);
  }
  function q(p) {
    switch (p.status) {
      case "fulfilled":
        return p.value;
      case "rejected":
        throw p.reason;
      default:
        switch (typeof p.status == "string" ? p.then(Z, Z) : (p.status = "pending", p.then(
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
  function G(p, H, tt, P, _t) {
    var gt = typeof p;
    (gt === "undefined" || gt === "boolean") && (p = null);
    var Et = !1;
    if (p === null) Et = !0;
    else
      switch (gt) {
        case "bigint":
        case "string":
        case "number":
          Et = !0;
          break;
        case "object":
          switch (p.$$typeof) {
            case c:
            case f:
              Et = !0;
              break;
            case E:
              return Et = p._init, G(
                Et(p._payload),
                H,
                tt,
                P,
                _t
              );
          }
      }
    if (Et)
      return _t = _t(p), Et = P === "" ? "." + bt(p, 0) : P, vt(_t) ? (tt = "", Et != null && (tt = Et.replace(Mt, "$&/") + "/"), G(_t, H, tt, "", function(ce) {
        return ce;
      })) : _t != null && (mt(_t) && (_t = st(
        _t,
        tt + (_t.key == null || p && p.key === _t.key ? "" : ("" + _t.key).replace(
          Mt,
          "$&/"
        ) + "/") + Et
      )), H.push(_t)), 1;
    Et = 0;
    var k = P === "" ? "." : P + ":";
    if (vt(p))
      for (var ut = 0; ut < p.length; ut++)
        P = p[ut], gt = k + bt(P, ut), Et += G(
          P,
          H,
          tt,
          gt,
          _t
        );
    else if (ut = J(p), typeof ut == "function")
      for (p = ut.call(p), ut = 0; !(P = p.next()).done; )
        P = P.value, gt = k + bt(P, ut++), Et += G(
          P,
          H,
          tt,
          gt,
          _t
        );
    else if (gt === "object") {
      if (typeof p.then == "function")
        return G(
          q(p),
          H,
          tt,
          P,
          _t
        );
      throw H = String(p), Error(
        "Objects are not valid as a React child (found: " + (H === "[object Object]" ? "object with keys {" + Object.keys(p).join(", ") + "}" : H) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return Et;
  }
  function Y(p, H, tt) {
    if (p == null) return p;
    var P = [], _t = 0;
    return G(p, P, "", "", function(gt) {
      return H.call(tt, gt, _t++);
    }), P;
  }
  function $(p) {
    if (p._status === -1) {
      var H = p._result, tt = H();
      tt.then(
        function(P) {
          (p._status === 0 || p._status === -1) && (p._status = 1, p._result = P, tt.status === void 0 && (tt.status = "fulfilled", tt.value = P));
        },
        function(P) {
          (p._status === 0 || p._status === -1) && (p._status = 2, p._result = P, tt.status === void 0 && (tt.status = "rejected", tt.reason = P));
        }
      ), p._status === -1 && (p._status = 0, p._result = tt);
    }
    if (p._status === 1) return p._result.default;
    throw p._result;
  }
  var nt = typeof reportError == "function" ? reportError : function(p) {
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
  function At(p) {
    var H = ot.T, tt = {};
    tt.types = H !== null ? H.types : null, ot.T = tt;
    try {
      var P = p(), _t = ot.S;
      _t !== null && _t(tt, P), typeof P == "object" && P !== null && typeof P.then == "function" && P.then(Z, nt);
    } catch (gt) {
      nt(gt);
    } finally {
      H !== null && tt.types !== null && (H.types = tt.types), ot.T = H;
    }
  }
  function Ft(p) {
    var H = ot.T;
    if (H !== null) {
      var tt = H.types;
      tt === null ? H.types = [p] : tt.indexOf(p) === -1 && tt.push(p);
    } else At(Ft.bind(null, p));
  }
  var Zt = {
    map: Y,
    forEach: function(p, H, tt) {
      Y(
        p,
        function() {
          H.apply(this, arguments);
        },
        tt
      );
    },
    count: function(p) {
      var H = 0;
      return Y(p, function() {
        H++;
      }), H;
    },
    toArray: function(p) {
      return Y(p, function(H) {
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
  return ht.Activity = h, ht.Children = Zt, ht.Component = V, ht.Fragment = r, ht.Profiler = g, ht.PureComponent = Nt, ht.StrictMode = s, ht.Suspense = C, ht.ViewTransition = j, ht.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ot, ht.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(p) {
      return ot.H.useMemoCache(p);
    }
  }, ht.addTransitionType = Ft, ht.cache = function(p) {
    return function() {
      return p.apply(null, arguments);
    };
  }, ht.cacheSignal = function() {
    return null;
  }, ht.cloneElement = function(p, H, tt) {
    if (p == null)
      throw Error(
        "The argument must be a React element, but you passed " + p + "."
      );
    var P = I({}, p.props), _t = p.key;
    if (H != null)
      for (gt in H.key !== void 0 && (_t = "" + H.key), H)
        !Pt.call(H, gt) || gt === "key" || gt === "__self" || gt === "__source" || gt === "ref" && H.ref === void 0 || (P[gt] = H[gt]);
    var gt = arguments.length - 2;
    if (gt === 1) P.children = tt;
    else if (1 < gt) {
      for (var Et = Array(gt), k = 0; k < gt; k++)
        Et[k] = arguments[k + 2];
      P.children = Et;
    }
    return it(p.type, _t, P);
  }, ht.createContext = function(p) {
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
  }, ht.createElement = function(p, H, tt) {
    var P, _t = {}, gt = null;
    if (H != null)
      for (P in H.key !== void 0 && (gt = "" + H.key), H)
        Pt.call(H, P) && P !== "key" && P !== "__self" && P !== "__source" && (_t[P] = H[P]);
    var Et = arguments.length - 2;
    if (Et === 1) _t.children = tt;
    else if (1 < Et) {
      for (var k = Array(Et), ut = 0; ut < Et; ut++)
        k[ut] = arguments[ut + 2];
      _t.children = k;
    }
    if (p && p.defaultProps)
      for (P in Et = p.defaultProps, Et)
        _t[P] === void 0 && (_t[P] = Et[P]);
    return it(p, gt, _t);
  }, ht.createRef = function() {
    return { current: null };
  }, ht.forwardRef = function(p) {
    return { $$typeof: S, render: p };
  }, ht.isValidElement = mt, ht.lazy = function(p) {
    return {
      $$typeof: E,
      _payload: { _status: -1, _result: p },
      _init: $
    };
  }, ht.memo = function(p, H) {
    return {
      $$typeof: A,
      type: p,
      compare: H === void 0 ? null : H
    };
  }, ht.startTransition = At, ht.unstable_useCacheRefresh = function() {
    return ot.H.useCacheRefresh();
  }, ht.use = function(p) {
    return ot.H.use(p);
  }, ht.useActionState = function(p, H, tt) {
    return ot.H.useActionState(p, H, tt);
  }, ht.useCallback = function(p, H) {
    return ot.H.useCallback(p, H);
  }, ht.useContext = function(p) {
    return ot.H.useContext(p);
  }, ht.useDebugValue = function() {
  }, ht.useDeferredValue = function(p, H) {
    return ot.H.useDeferredValue(p, H);
  }, ht.useEffect = function(p, H) {
    return ot.H.useEffect(p, H);
  }, ht.useEffectEvent = function(p) {
    return ot.H.useEffectEvent(p);
  }, ht.useId = function() {
    return ot.H.useId();
  }, ht.useImperativeHandle = function(p, H, tt) {
    return ot.H.useImperativeHandle(p, H, tt);
  }, ht.useInsertionEffect = function(p, H) {
    return ot.H.useInsertionEffect(p, H);
  }, ht.useLayoutEffect = function(p, H) {
    return ot.H.useLayoutEffect(p, H);
  }, ht.useMemo = function(p, H) {
    return ot.H.useMemo(p, H);
  }, ht.useOptimistic = function(p, H) {
    return ot.H.useOptimistic(p, H);
  }, ht.useReducer = function(p, H, tt) {
    return ot.H.useReducer(p, H, tt);
  }, ht.useRef = function(p) {
    return ot.H.useRef(p);
  }, ht.useState = function(p) {
    return ot.H.useState(p);
  }, ht.useSyncExternalStore = function(p, H, tt) {
    return ot.H.useSyncExternalStore(
      p,
      H,
      tt
    );
  }, ht.useTransition = function() {
    return ot.H.useTransition();
  }, ht.version = "19.3.0", ht;
}
var Wh;
function To() {
  return Wh || (Wh = 1, io.exports = _y()), io.exports;
}
var w = To(), co = { exports: {} }, Zu = {}, so = { exports: {} }, ro = {};
var Ih;
function Ty() {
  return Ih || (Ih = 1, (function(c) {
    function f(q, G) {
      var Y = q.length;
      q.push(G);
      t: for (; 0 < Y; ) {
        var $ = Y - 1 >>> 1, nt = q[$];
        if (0 < g(nt, G))
          q[$] = G, q[Y] = nt, Y = $;
        else break t;
      }
    }
    function r(q) {
      return q.length === 0 ? null : q[0];
    }
    function s(q) {
      if (q.length === 0) return null;
      var G = q[0], Y = q.pop();
      if (Y !== G) {
        q[0] = Y;
        t: for (var $ = 0, nt = q.length, At = nt >>> 1; $ < At; ) {
          var Ft = 2 * ($ + 1) - 1, Zt = q[Ft], p = Ft + 1, H = q[p];
          if (0 > g(Zt, Y))
            p < nt && 0 > g(H, Zt) ? (q[$] = H, q[p] = Y, $ = p) : (q[$] = Zt, q[Ft] = Y, $ = Ft);
          else if (p < nt && 0 > g(H, Y))
            q[$] = H, q[p] = Y, $ = p;
          else break t;
        }
      }
      return G;
    }
    function g(q, G) {
      var Y = q.sortIndex - G.sortIndex;
      return Y !== 0 ? Y : q.id - G.id;
    }
    if (c.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var m = performance;
      c.unstable_now = function() {
        return m.now();
      };
    } else {
      var y = Date, S = y.now();
      c.unstable_now = function() {
        return y.now() - S;
      };
    }
    var C = [], A = [], E = 1, h = null, j = 3, B = !1, J = !1, L = !1, I = !1, dt = typeof setTimeout == "function" ? setTimeout : null, V = typeof clearTimeout == "function" ? clearTimeout : null, K = typeof setImmediate < "u" ? setImmediate : null;
    function Nt(q) {
      for (var G = r(A); G !== null; ) {
        if (G.callback === null) s(A);
        else if (G.startTime <= q)
          s(A), G.sortIndex = G.expirationTime, f(C, G);
        else break;
        G = r(A);
      }
    }
    function Tt(q) {
      if (L = !1, Nt(q), !J)
        if (r(C) !== null)
          J = !0, vt || (vt = !0, mt());
        else {
          var G = r(A);
          G !== null && bt(Tt, G.startTime - q);
        }
    }
    var vt = !1, Z = -1, ot = 5, Pt = -1;
    function it() {
      return I ? !0 : !(c.unstable_now() - Pt < ot);
    }
    function st() {
      if (I = !1, vt) {
        var q = c.unstable_now();
        Pt = q;
        var G = !0;
        try {
          t: {
            J = !1, L && (L = !1, V(Z), Z = -1), B = !0;
            var Y = j;
            try {
              e: {
                for (Nt(q), h = r(C); h !== null && !(h.expirationTime > q && it()); ) {
                  var $ = h.callback;
                  if (typeof $ == "function") {
                    h.callback = null, j = h.priorityLevel;
                    var nt = $(
                      h.expirationTime <= q
                    );
                    if (q = c.unstable_now(), typeof nt == "function") {
                      h.callback = nt, Nt(q), G = !0;
                      break e;
                    }
                    h === r(C) && s(C), Nt(q);
                  } else s(C);
                  h = r(C);
                }
                if (h !== null) G = !0;
                else {
                  var At = r(A);
                  At !== null && bt(
                    Tt,
                    At.startTime - q
                  ), G = !1;
                }
              }
              break t;
            } finally {
              h = null, j = Y, B = !1;
            }
            G = void 0;
          }
        } finally {
          G ? mt() : vt = !1;
        }
      }
    }
    var mt;
    if (typeof K == "function")
      mt = function() {
        K(st);
      };
    else if (typeof MessageChannel < "u") {
      var Ut = new MessageChannel(), Mt = Ut.port2;
      Ut.port1.onmessage = st, mt = function() {
        Mt.postMessage(null);
      };
    } else
      mt = function() {
        dt(st, 0);
      };
    function bt(q, G) {
      Z = dt(function() {
        q(c.unstable_now());
      }, G);
    }
    c.unstable_IdlePriority = 5, c.unstable_ImmediatePriority = 1, c.unstable_LowPriority = 4, c.unstable_NormalPriority = 3, c.unstable_Profiling = null, c.unstable_UserBlockingPriority = 2, c.unstable_cancelCallback = function(q) {
      q.callback = null;
    }, c.unstable_forceFrameRate = function(q) {
      0 > q || 125 < q ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : ot = 0 < q ? Math.floor(1e3 / q) : 5;
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
      var Y = j;
      j = G;
      try {
        return q();
      } finally {
        j = Y;
      }
    }, c.unstable_requestPaint = function() {
      I = !0;
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
      var Y = j;
      j = q;
      try {
        return G();
      } finally {
        j = Y;
      }
    }, c.unstable_scheduleCallback = function(q, G, Y) {
      var $ = c.unstable_now();
      switch (typeof Y == "object" && Y !== null ? (Y = Y.delay, Y = typeof Y == "number" && 0 < Y ? $ + Y : $) : Y = $, q) {
        case 1:
          var nt = -1;
          break;
        case 2:
          nt = 250;
          break;
        case 5:
          nt = 1073741823;
          break;
        case 4:
          nt = 1e4;
          break;
        default:
          nt = 5e3;
      }
      return nt = Y + nt, q = {
        id: E++,
        callback: G,
        priorityLevel: q,
        startTime: Y,
        expirationTime: nt,
        sortIndex: -1
      }, Y > $ ? (q.sortIndex = Y, f(A, q), r(C) === null && q === r(A) && (L ? (V(Z), Z = -1) : L = !0, bt(Tt, Y - $))) : (q.sortIndex = nt, f(C, q), J || B || (J = !0, vt || (vt = !0, mt()))), q;
    }, c.unstable_shouldYield = it, c.unstable_wrapCallback = function(q) {
      var G = j;
      return function() {
        var Y = j;
        j = G;
        try {
          return q.apply(this, arguments);
        } finally {
          j = Y;
        }
      };
    };
  })(ro)), ro;
}
var Ph;
function Ey() {
  return Ph || (Ph = 1, so.exports = Ty()), so.exports;
}
var oo = { exports: {} }, ze = {};
var t0;
function Ny() {
  if (t0) return ze;
  t0 = 1;
  var c = To();
  function f(E) {
    var h = "https://react.dev/errors/" + E;
    if (1 < arguments.length) {
      h += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var j = 2; j < arguments.length; j++)
        h += "&args[]=" + encodeURIComponent(arguments[j]);
    }
    return "Minified React error #" + E + "; visit " + h + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
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
  }, g = /* @__PURE__ */ Symbol.for("react.portal"), m = /* @__PURE__ */ Symbol.for("react.recoverable"), y = /* @__PURE__ */ Symbol.for("react.optimistic_key");
  function S(E, h, j) {
    var B = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: g,
      key: B == null ? null : B === y ? y : "" + B,
      children: E,
      containerInfo: h,
      implementation: j
    };
  }
  var C = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function A(E, h) {
    if (E === "font") return "";
    if (typeof h == "string")
      return h === "use-credentials" ? h : "";
  }
  return ze.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, ze.browser = function(E) {
    return { $$typeof: m, _reason: E };
  }, ze.createPortal = function(E, h) {
    var j = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!h || h.nodeType !== 1 && h.nodeType !== 9 && h.nodeType !== 11)
      throw Error(f(299));
    return S(E, h, null, j);
  }, ze.flushSync = function(E) {
    var h = C.T, j = s.p;
    try {
      if (C.T = null, s.p = 2, E) return E();
    } finally {
      C.T = h, s.p = j, s.d.f();
    }
  }, ze.preconnect = function(E, h) {
    typeof E == "string" && (h ? (h = h.crossOrigin, h = typeof h == "string" ? h === "use-credentials" ? h : "" : void 0) : h = null, s.d.C(E, h));
  }, ze.prefetchDNS = function(E) {
    typeof E == "string" && s.d.D(E);
  }, ze.preinit = function(E, h) {
    if (typeof E == "string" && h && typeof h.as == "string") {
      var j = h.as, B = A(j, h.crossOrigin), J = typeof h.integrity == "string" ? h.integrity : void 0, L = typeof h.fetchPriority == "string" ? h.fetchPriority : void 0;
      j === "style" ? s.d.S(
        E,
        typeof h.precedence == "string" ? h.precedence : void 0,
        {
          crossOrigin: B,
          integrity: J,
          fetchPriority: L
        }
      ) : j === "script" && s.d.X(E, {
        crossOrigin: B,
        integrity: J,
        fetchPriority: L,
        nonce: typeof h.nonce == "string" ? h.nonce : void 0
      });
    }
  }, ze.preinitModule = function(E, h) {
    if (typeof E == "string")
      if (typeof h == "object" && h !== null) {
        if (h.as == null || h.as === "script") {
          var j = A(
            h.as,
            h.crossOrigin
          );
          s.d.M(E, {
            crossOrigin: j,
            integrity: typeof h.integrity == "string" ? h.integrity : void 0,
            nonce: typeof h.nonce == "string" ? h.nonce : void 0,
            fetchPriority: typeof h.fetchPriority == "string" ? h.fetchPriority : void 0
          });
        }
      } else h == null && s.d.M(E);
  }, ze.preload = function(E, h) {
    if (typeof E == "string" && typeof h == "object" && h !== null && typeof h.as == "string") {
      var j = h.as, B = A(j, h.crossOrigin);
      s.d.L(E, j, {
        crossOrigin: B,
        integrity: typeof h.integrity == "string" ? h.integrity : void 0,
        nonce: typeof h.nonce == "string" ? h.nonce : void 0,
        type: typeof h.type == "string" ? h.type : void 0,
        fetchPriority: typeof h.fetchPriority == "string" ? h.fetchPriority : void 0,
        referrerPolicy: typeof h.referrerPolicy == "string" ? h.referrerPolicy : void 0,
        imageSrcSet: typeof h.imageSrcSet == "string" ? h.imageSrcSet : void 0,
        imageSizes: typeof h.imageSizes == "string" ? h.imageSizes : void 0,
        media: typeof h.media == "string" ? h.media : void 0
      });
    }
  }, ze.preloadModule = function(E, h) {
    if (typeof E == "string")
      if (h) {
        var j = A(h.as, h.crossOrigin);
        s.d.m(E, {
          as: typeof h.as == "string" && h.as !== "script" ? h.as : void 0,
          crossOrigin: j,
          integrity: typeof h.integrity == "string" ? h.integrity : void 0,
          nonce: typeof h.nonce == "string" ? h.nonce : void 0,
          fetchPriority: typeof h.fetchPriority == "string" ? h.fetchPriority : void 0
        });
      } else s.d.m(E);
  }, ze.requestFormReset = function(E) {
    s.d.r(E);
  }, ze.unstable_batchedUpdates = function(E, h) {
    return E(h);
  }, ze.useFormState = function(E, h, j) {
    return C.H.useFormState(E, h, j);
  }, ze.useFormStatus = function() {
    return C.H.useHostTransitionStatus();
  }, ze.version = "19.3.0", ze;
}
var e0;
function xy() {
  if (e0) return oo.exports;
  e0 = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (f) {
        console.error(f);
      }
  }
  return c(), oo.exports = Ny(), oo.exports;
}
var l0;
function My() {
  if (l0) return Zu;
  l0 = 1;
  var c = Ey(), f = To(), r = xy();
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
  function h(t, e, l, a, n, u) {
    for (; t !== null; ) {
      if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && l(t, a, n, u) || (t.tag !== 22 || t.memoizedState === null) && (e || t.tag !== 5 && t.tag !== 27) && h(
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
  function J(t) {
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
  function I(t) {
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
  function K(t, e, l) {
    return t === l ? !0 : t === e ? (dt = t, !0) : !1;
  }
  function Nt(t, e, l) {
    return t === l ? (V = t, !1) : t === e ? (V !== null && (dt = t), !0) : !1;
  }
  function Tt(t) {
    if (t === null) return null;
    do
      t = t === null ? null : t.return;
    while (t && t.tag !== 5 && t.tag !== 27 && t.tag !== 3);
    return t || null;
  }
  function vt(t, e, l) {
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
  var Z = Object.assign, ot = /* @__PURE__ */ Symbol.for("react.element"), Pt = /* @__PURE__ */ Symbol.for("react.transitional.element"), it = /* @__PURE__ */ Symbol.for("react.portal"), st = /* @__PURE__ */ Symbol.for("react.fragment"), mt = /* @__PURE__ */ Symbol.for("react.strict_mode"), Ut = /* @__PURE__ */ Symbol.for("react.profiler"), Mt = /* @__PURE__ */ Symbol.for("react.consumer"), bt = /* @__PURE__ */ Symbol.for("react.context"), q = /* @__PURE__ */ Symbol.for("react.forward_ref"), G = /* @__PURE__ */ Symbol.for("react.suspense"), Y = /* @__PURE__ */ Symbol.for("react.suspense_list"), $ = /* @__PURE__ */ Symbol.for("react.memo"), nt = /* @__PURE__ */ Symbol.for("react.lazy"), At = /* @__PURE__ */ Symbol.for("react.activity"), Ft = /* @__PURE__ */ Symbol.for("react.legacy_hidden"), Zt = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), p = /* @__PURE__ */ Symbol.for("react.view_transition"), H = /* @__PURE__ */ Symbol.for("react.recoverable"), tt = Symbol.iterator;
  function P(t) {
    return t === null || typeof t != "object" ? null : (t = tt && t[tt] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var _t = /* @__PURE__ */ Symbol.for("react.client.reference");
  function gt(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === _t ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case st:
        return "Fragment";
      case Ut:
        return "Profiler";
      case mt:
        return "StrictMode";
      case G:
        return "Suspense";
      case Y:
        return "SuspenseList";
      case At:
        return "Activity";
      case p:
        return "ViewTransition";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case it:
          return "Portal";
        case bt:
          return t.displayName || "Context";
        case Mt:
          return (t._context.displayName || "Context") + ".Consumer";
        case q:
          var e = t.render;
          return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case $:
          return e = t.displayName || null, e !== null ? e : gt(t.type) || "Memo";
        case nt:
          e = t._payload, t = t._init;
          try {
            return gt(t(e));
          } catch {
          }
      }
    return null;
  }
  var Et = Array.isArray, k = f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ut = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ce = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, gl = [], ne = -1;
  function le(t) {
    return { current: t };
  }
  function jt(t) {
    0 > ne || (t.current = gl[ne], gl[ne] = null, ne--);
  }
  function ft(t, e) {
    ne++, gl[ne] = t.current, t.current = e;
  }
  var X = le(null), lt = le(null), yt = le(null), Yt = le(null);
  function te(t, e) {
    switch (ft(yt, e), ft(lt, t), ft(X, null), e.nodeType) {
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
    jt(X), ft(X, t);
  }
  function Bt() {
    jt(X), jt(lt), jt(yt);
  }
  function cl(t) {
    var e = t.memoizedState;
    e !== null && (Zn._currentValue = e.memoizedState, ft(Yt, t)), e = X.current;
    var l = nh(e, t.type);
    e !== l && (ft(lt, t), ft(X, l));
  }
  function yl(t) {
    lt.current === t && (jt(X), jt(lt)), Yt.current === t && (jt(Yt), Zn._currentValue = ce);
  }
  var Na, $l;
  function Be(t) {
    if (Na === void 0)
      try {
        throw Error();
      } catch (l) {
        var e = l.stack.trim().match(/\n( *(at )?)/);
        Na = e && e[1] || "", $l = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Na + t + $l;
  }
  var jl = !1;
  function Rl(t, e) {
    if (!t || jl) return "";
    jl = !0;
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
                } catch (Q) {
                  var _ = Q;
                }
                Reflect.construct(t, [], U);
              } else {
                try {
                  U.call();
                } catch (Q) {
                  _ = Q;
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
              } catch (Q) {
                _ = Q;
              }
              (U = t()) && typeof U.catch == "function" && U.catch(function() {
              });
            }
          } catch (Q) {
            if (Q && _ && typeof Q.stack == "string")
              return [Q.stack, _.stack];
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
        var v = i.split(`
`), N = o.split(`
`);
        for (n = a = 0; a < v.length && !v[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; n < N.length && !N[n].includes(
          "DetermineComponentFrameRoot"
        ); )
          n++;
        if (a === v.length || n === N.length)
          for (a = v.length - 1, n = N.length - 1; 1 <= a && 0 <= n && v[a] !== N[n]; )
            n--;
        for (; 1 <= a && 0 <= n; a--, n--)
          if (v[a] !== N[n]) {
            if (a !== 1 || n !== 1)
              do
                if (a--, n--, 0 > n || v[a] !== N[n]) {
                  var z = `
` + v[a].replace(" at new ", " at ");
                  return t.displayName && z.includes("<anonymous>") && (z = z.replace("<anonymous>", t.displayName)), z;
                }
              while (1 <= a && 0 <= n);
            break;
          }
      }
    } finally {
      jl = !1, Error.prepareStackTrace = l;
    }
    return (l = t ? t.displayName || t.name : "") ? Be(l) : "";
  }
  function xa(t, e) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Be(t.type);
      case 16:
        return Be("Lazy");
      case 13:
        return t.child !== e && e !== null ? Be("Suspense Fallback") : Be("Suspense");
      case 19:
        return Be("SuspenseList");
      case 0:
      case 15:
        return Rl(t.type, !1);
      case 11:
        return Rl(t.type.render, !1);
      case 1:
        return Rl(t.type, !0);
      case 31:
        return Be("Activity");
      case 30:
        return Be("ViewTransition");
      default:
        return "";
    }
  }
  function ln(t) {
    try {
      var e = "", l = null;
      do
        e += xa(t, l), l = t, t = t.return;
      while (t);
      return e;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var R = Object.prototype.hasOwnProperty, rt = c.unstable_scheduleCallback, Ot = c.unstable_cancelCallback, se = c.unstable_shouldYield, he = c.unstable_requestPaint, Kt = c.unstable_now, Ce = c.unstable_getCurrentPriorityLevel, _e = c.unstable_ImmediatePriority, bl = c.unstable_UserBlockingPriority, an = c.unstable_NormalPriority, Fn = c.unstable_LowPriority, Iu = c.unstable_IdlePriority, jc = c.log, x = c.unstable_setDisableYieldValue, W = null, Rt = null;
  function Jt(t) {
    if (typeof jc == "function" && x(t), Rt && typeof Rt.setStrictMode == "function")
      try {
        Rt.setStrictMode(W, t);
      } catch {
      }
  }
  var ve = Math.clz32 ? Math.clz32 : R0, Ma = Math.log, Wn = Math.LN2;
  function R0(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (Ma(t) / Wn | 0) | 0;
  }
  var Pu = 256, ti = 262144, ei = 4194304;
  function Oa(t) {
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
  function li(t, e, l) {
    var a = t.pendingLanes;
    if (a === 0) return 0;
    var n = 0, u = t.suspendedLanes, i = t.pingedLanes;
    t = t.warmLanes;
    var o = a & 134217727;
    return o !== 0 ? (a = o & ~u, a !== 0 ? n = Oa(a) : (i &= o, i !== 0 ? n = Oa(i) : l || (l = o & ~t, l !== 0 && (n = Oa(l))))) : (o = a & ~u, o !== 0 ? n = Oa(o) : i !== 0 ? n = Oa(i) : l || (l = a & ~t, l !== 0 && (n = Oa(l)))), n === 0 ? 0 : e !== 0 && e !== n && (e & u) === 0 && (u = n & -n, l = e & -e, u >= l || u === 32 && (l & 4194048) !== 0) ? e : n;
  }
  function In(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function zo(t, e) {
    (e & 8) !== 0 && (e |= e & 32);
    var l = t.entangledLanes;
    if (l !== 0)
      for (t = t.entanglements, l &= e; 0 < l; ) {
        var a = 31 - ve(l), n = 1 << a;
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
  function Co() {
    var t = ei;
    return ei <<= 1, (ei & 62914560) === 0 && (ei = 4194304), t;
  }
  function Rc(t) {
    for (var e = [], l = 0; 31 > l; l++) e.push(t);
    return e;
  }
  function Pn(t, e) {
    t.pendingLanes |= e, e !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function D0(t, e, l, a, n, u) {
    var i = t.pendingLanes;
    t.pendingLanes = l, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= l, t.entangledLanes &= l, t.errorRecoveryDisabledLanes &= l, t.shellSuspendCounter = 0;
    var o = t.entanglements, v = t.expirationTimes, N = t.hiddenUpdates;
    for (l = i & ~l; 0 < l; ) {
      var z = 31 - ve(l), U = 1 << z;
      o[z] = 0, v[z] = -1;
      var _ = N[z];
      if (_ !== null)
        for (N[z] = null, z = 0; z < _.length; z++) {
          var O = _[z];
          O !== null && (O.lane &= -536870913);
        }
      l &= ~U;
    }
    a !== 0 && Ao(t, a, 0), u !== 0 && n === 0 && t.tag !== 0 && (t.suspendedLanes |= u & ~(i & ~e));
  }
  function Ao(t, e, l) {
    t.pendingLanes |= e, t.suspendedLanes &= ~e;
    var a = 31 - ve(e);
    t.entangledLanes |= e, t.entanglements[a] = t.entanglements[a] | 1073741824 | l & 261930;
  }
  function jo(t, e) {
    var l = t.entangledLanes |= e;
    for (t = t.entanglements; l; ) {
      var a = 31 - ve(l), n = 1 << a;
      n & e | t[a] & e && (t[a] |= e), l &= ~n;
    }
  }
  function Ro(t, e) {
    var l = e & -e;
    return l = (l & 42) !== 0 ? 1 : wc(l), (l & (t.suspendedLanes | e)) !== 0 ? 0 : l;
  }
  function wc(t) {
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
  function wo() {
    var t = ut.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : Gh(t.type));
  }
  function Do(t, e) {
    var l = ut.p;
    try {
      return ut.p = t, e();
    } finally {
      ut.p = l;
    }
  }
  var wl = Math.random().toString(36).slice(2), Te = "__reactFiber$" + wl, He = "__reactProps$" + wl, nn = "__reactContainer$" + wl, Uo = "__reactEvents$" + wl, U0 = "__reactListeners$" + wl, B0 = "__reactHandles$" + wl, Bo = "__reactResources$" + wl, tu = "__reactMarker$" + wl, ai = "__reactLoad$" + wl;
  function ni(t) {
    delete t[Te], delete t[He], delete t[U0], delete t[B0];
  }
  function za(t) {
    var e;
    if (e = t[Te]) return e;
    for (var l = t.parentNode; l; ) {
      if (e = l[nn] || l[Te]) {
        if (l = e.alternate, e.child !== null || l !== null && l.child !== null)
          for (t = _h(t); t !== null; ) {
            if (l = t[Te]) return l;
            t = _h(t);
          }
        return e;
      }
      t = l, l = t.parentNode;
    }
    return null;
  }
  function un(t) {
    if (t = t[Te] || t[nn]) {
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
  function cn(t) {
    var e = t[Bo];
    return e || (e = t[Bo] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), e;
  }
  function ye(t) {
    t[tu] = !0;
  }
  function Ho(t) {
    t[ai] = void 0;
  }
  var Lo = /* @__PURE__ */ new Set(), Yo = {};
  function Ca(t, e) {
    sn(t, e), sn(t + "Capture", e);
  }
  function sn(t, e) {
    for (Yo[t] = e, t = 0; t < e.length; t++)
      Lo.add(e[t]);
  }
  var H0 = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), qo = {}, Go = {};
  function L0(t) {
    return R.call(Go, t) ? !0 : R.call(qo, t) ? !1 : H0.test(t) ? Go[t] = !0 : (qo[t] = !0, !1);
  }
  var Lt = !1;
  function Xo() {
    var t = Lt;
    return Lt = !1, t;
  }
  function ui(t, e, l) {
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
  function ii(t, e, l) {
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
  function Dl(t, e, l, a) {
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
  function Ve(t) {
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
  function Uc(t) {
    if (!t._valueTracker) {
      var e = Vo(t) ? "checked" : "value";
      t._valueTracker = Y0(
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
  var q0 = /[\n"\\]/g;
  function Ie(t) {
    return t.replace(
      q0,
      function(e) {
        return "\\" + e.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Bc(t, e, l, a, n, u, i, o) {
    t.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? t.type = i : t.removeAttribute("type"), e != null ? i === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + Ve(e)) : t.value !== "" + Ve(e) && (t.value = "" + Ve(e)) : i !== "submit" && i !== "reset" || t.removeAttribute("value"), e != null ? i === "number" && t.value == e ? Hc(t, Ve(t.value)) : Hc(t, Ve(e)) : l != null ? Hc(t, Ve(l)) : a != null && t.removeAttribute("value"), n == null && u != null && (t.defaultChecked = !!u), n != null && (t.checked = n && typeof n != "function" && typeof n != "symbol"), o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? t.name = "" + Ve(o) : t.removeAttribute("name");
  }
  function Zo(t, e, l, a, n, u, i, o) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (t.type = u), e != null || l != null) {
      if (!(u !== "submit" && u !== "reset" || e != null)) {
        Uc(t);
        return;
      }
      l = l != null ? "" + Ve(l) : "", e = e != null ? "" + Ve(e) : l, o || e === t.value || (t.value = e), t.defaultValue = e;
    }
    a = a ?? n, a = typeof a != "function" && typeof a != "symbol" && !!a, t.checked = o ? t.checked : !!a, t.defaultChecked = !!a, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (t.name = i), Uc(t);
  }
  function Hc(t, e) {
    t.defaultValue !== "" + e && (t.defaultValue = "" + e);
  }
  function rn(t, e, l, a) {
    if (t = t.options, e) {
      e = {};
      for (var n = 0; n < l.length; n++)
        e["$" + l[n]] = !0;
      for (l = 0; l < t.length; l++)
        n = e.hasOwnProperty("$" + t[l].value), t[l].selected !== n && (t[l].selected = n), n && a && (t[l].defaultSelected = !0);
    } else {
      for (l = "" + Ve(l), e = null, n = 0; n < t.length; n++) {
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
    if (e != null && (e = "" + Ve(e), e !== t.value && (t.value = e), l == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = l != null ? "" + Ve(l) : "";
  }
  function Jo(t, e, l, a) {
    if (e == null) {
      if (a != null) {
        if (l != null) throw Error(s(92));
        if (Et(a)) {
          if (1 < a.length) throw Error(s(93));
          a = a[0];
        }
        l = a;
      }
      l == null && (l = ""), e = l;
    }
    l = Ve(e), t.defaultValue = l, a = t.textContent, a === l && a !== "" && a !== null && (t.value = a), Uc(t);
  }
  function on(t, e) {
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
  function $o(t, e, l) {
    var a = e.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? a ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "" : a ? t.setProperty(e, l) : typeof l != "number" || l === 0 || G0.has(e) ? e === "float" ? t.cssFloat = l : t[e] = ("" + l).trim() : t[e] = l + "px";
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
  function ci(t) {
    return V0.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function pl() {
  }
  var Yc = null;
  function qc(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var fn = null, dn = null;
  function Fo(t) {
    var e = un(t);
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
              'input[name="' + Ie(
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
          e = l.value, e != null && rn(t, !!l.multiple, e, !1);
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
      if (Gc = !1, (fn !== null || dn !== null) && (cc(), fn && (e = fn, t = dn, dn = fn = null, Fo(e), t)))
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
  var Ul = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Xc = !1;
  if (Ul)
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
  var kl = null, Vc = null, si = null;
  function Io() {
    if (si) return si;
    var t, e = Vc, l = e.length, a, n = "value" in kl ? kl.value : kl.textContent, u = n.length;
    for (t = 0; t < l && e[t] === n[t]; t++) ;
    var i = l - t;
    for (a = 1; a <= i && e[l - a] === n[u - a]; a++) ;
    return si = n.slice(t, 1 < a ? 1 - a : void 0);
  }
  function ri(t) {
    var e = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function oi() {
    return !0;
  }
  function Po() {
    return !1;
  }
  function Re(t) {
    function e(l, a, n, u, i) {
      this._reactName = l, this._targetInst = n, this.type = a, this.nativeEvent = u, this.target = i, this.currentTarget = null;
      for (var o in t)
        t.hasOwnProperty(o) && (l = t[o], this[o] = l ? l(u) : u[o]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? oi : Po, this.isPropagationStopped = Po, this;
    }
    return Z(e.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = oi);
      },
      stopPropagation: function() {
        var l = this.nativeEvent;
        l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = oi);
      },
      persist: function() {
      },
      isPersistent: oi
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
  }, fi = Re(Fl), nu = Z({}, Fl, { view: 0, detail: 0 }), Q0 = Re(nu), Qc, Zc, uu, di = Z({}, nu, {
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
  }), tf = Re(di), Z0 = Z({}, di, { dataTransfer: 0 }), K0 = Re(Z0), J0 = Z({}, nu, { relatedTarget: 0 }), Kc = Re(J0), $0 = Z({}, Fl, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), k0 = Re($0), F0 = Z({}, Fl, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), W0 = Re(F0), I0 = Z({}, Fl, { data: 0 }), ef = Re(I0), P0 = {
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
  function Jc() {
    return lv;
  }
  var av = Z({}, nu, {
    key: function(t) {
      if (t.key) {
        var e = P0[t.key] || t.key;
        if (e !== "Unidentified") return e;
      }
      return t.type === "keypress" ? (t = ri(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? tv[t.keyCode] || "Unidentified" : "";
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
      return t.type === "keypress" ? ri(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? ri(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), nv = Re(av), uv = Z({}, di, {
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
  }), lf = Re(uv), iv = Z({}, Fl, { submitter: 0 }), cv = Re(iv), sv = Z({}, nu, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Jc
  }), rv = Re(sv), ov = Z({}, Fl, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), fv = Re(ov), dv = Z({}, di, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), mv = Re(dv), hv = Z({}, Fl, {
    newState: 0,
    oldState: 0,
    source: 0
  }), vv = Re(hv), gv = [9, 13, 27, 32], $c = Ul && "CompositionEvent" in window, iu = null;
  Ul && "documentMode" in document && (iu = document.documentMode);
  var yv = Ul && "TextEvent" in window && !iu, af = Ul && (!$c || iu && 8 < iu && 11 >= iu), nf = " ", uf = !1;
  function cf(t, e) {
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
  function sf(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var mn = !1;
  function bv(t, e) {
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
  function pv(t, e) {
    if (mn)
      return t === "compositionend" || !$c && cf(t, e) ? (t = Io(), si = Vc = kl = null, mn = !1, t) : null;
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
  function rf(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === "input" ? !!Sv[t.type] : e === "textarea";
  }
  function of(t, e, l, a) {
    fn ? dn ? dn.push(a) : dn = [a] : fn = a, e = mc(e, "onChange"), 0 < e.length && (l = new fi(
      "onChange",
      "change",
      null,
      l,
      a
    ), t.push({ event: l, listeners: e }));
  }
  var cu = null, su = null;
  function _v(t) {
    Wm(t, 0);
  }
  function mi(t) {
    var e = eu(t);
    if (Qo(e)) return t;
  }
  function ff(t, e) {
    if (t === "change") return e;
  }
  var df = !1;
  if (Ul) {
    var kc;
    if (Ul) {
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
    if (t.propertyName === "value" && mi(su)) {
      var e = [];
      of(
        e,
        su,
        t,
        qc(t)
      ), Wo(_v, e);
    }
  }
  function Tv(t, e, l) {
    t === "focusin" ? (hf(), cu = e, su = l, cu.attachEvent("onpropertychange", vf)) : t === "focusout" && hf();
  }
  function Ev(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return mi(su);
  }
  function Nv(t, e) {
    if (t === "click") return mi(e);
  }
  function xv(t, e) {
    if (t === "input" || t === "change")
      return mi(e);
  }
  function Mv(t, e) {
    return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
  }
  var Qe = typeof Object.is == "function" ? Object.is : Mv;
  function ru(t, e) {
    if (Qe(t, e)) return !0;
    if (typeof t != "object" || t === null || typeof e != "object" || e === null)
      return !1;
    var l = Object.keys(t), a = Object.keys(e);
    if (l.length !== a.length) return !1;
    for (a = 0; a < l.length; a++) {
      var n = l[a];
      if (!R.call(e, n) || !Qe(t[n], e[n]))
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
  var Ov = Ul && "documentMode" in document && 11 >= document.documentMode, hn = null, Pc = null, ou = null, ts = !1;
  function Sf(t, e, l) {
    var a = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    ts || hn == null || hn !== Wc(a) || (a = hn, "selectionStart" in a && Ic(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), ou && ru(ou, a) || (ou = a, a = mc(Pc, "onSelect"), 0 < a.length && (e = new fi(
      "onSelect",
      "select",
      null,
      e,
      l
    ), t.push({ event: e, listeners: a }), e.target = hn)));
  }
  function Aa(t, e) {
    var l = {};
    return l[t.toLowerCase()] = e.toLowerCase(), l["Webkit" + t] = "webkit" + e, l["Moz" + t] = "moz" + e, l;
  }
  var vn = {
    animationend: Aa("Animation", "AnimationEnd"),
    animationiteration: Aa("Animation", "AnimationIteration"),
    animationstart: Aa("Animation", "AnimationStart"),
    transitionrun: Aa("Transition", "TransitionRun"),
    transitionstart: Aa("Transition", "TransitionStart"),
    transitioncancel: Aa("Transition", "TransitionCancel"),
    transitionend: Aa("Transition", "TransitionEnd")
  }, es = {}, _f = {};
  Ul && (_f = document.createElement("div").style, "AnimationEvent" in window || (delete vn.animationend.animation, delete vn.animationiteration.animation, delete vn.animationstart.animation), "TransitionEvent" in window || delete vn.transitionend.transition);
  function ja(t) {
    if (es[t]) return es[t];
    if (!vn[t]) return t;
    var e = vn[t], l;
    for (l in e)
      if (e.hasOwnProperty(l) && l in _f)
        return es[t] = e[l];
    return t;
  }
  var Tf = ja("animationend"), Ef = ja("animationiteration"), Nf = ja("animationstart"), zv = ja("transitionrun"), Cv = ja("transitionstart"), Av = ja("transitioncancel"), xf = ja("transitionend"), Mf = /* @__PURE__ */ new Map(), ls = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  ls.push("scrollEnd");
  function sl(t, e) {
    Mf.set(t, e), Ca(e, [t]);
  }
  var jv = 0;
  function Bl(t, e) {
    if (t.name != null && t.name !== "auto") return t.name;
    if (e.autoName !== null) return e.autoName;
    t = dl.identifierPrefix;
    var l = jv++;
    return t = "_" + t + "t_" + l.toString(32) + "_", e.autoName = t;
  }
  function Of(t) {
    if (t == null || typeof t == "string")
      return t;
    var e = null, l = Un;
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
  function Hl(t, e) {
    return t = Of(t), e = Of(e), e == null ? t === "auto" ? null : t : e === "auto" ? null : e;
  }
  var hi = typeof reportError == "function" ? reportError : function(t) {
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
  }, Pe = [], gn = 0, as = 0;
  function vi() {
    for (var t = gn, e = as = gn = 0; e < t; ) {
      var l = Pe[e];
      Pe[e++] = null;
      var a = Pe[e];
      Pe[e++] = null;
      var n = Pe[e];
      Pe[e++] = null;
      var u = Pe[e];
      if (Pe[e++] = null, a !== null && n !== null) {
        var i = a.pending;
        i === null ? n.next = n : (n.next = i.next, i.next = n), a.pending = n;
      }
      u !== 0 && zf(l, n, u);
    }
  }
  function gi(t, e, l, a) {
    Pe[gn++] = t, Pe[gn++] = e, Pe[gn++] = l, Pe[gn++] = a, as |= a, t.lanes |= a, t = t.alternate, t !== null && (t.lanes |= a);
  }
  function ns(t, e, l, a) {
    return gi(t, e, l, a), yi(t);
  }
  function Ra(t, e) {
    return gi(t, null, null, e), yi(t);
  }
  function zf(t, e, l) {
    t.lanes |= l;
    var a = t.alternate;
    a !== null && (a.lanes |= l);
    for (var n = !1, u = t.return; u !== null; )
      u.childLanes |= l, a = u.alternate, a !== null && (a.childLanes |= l), u.tag === 22 && (t = u.stateNode, t === null || t._visibility & 1 || (n = !0)), t = u, u = u.return;
    return t.tag === 3 ? (u = t.stateNode, n && e !== null && (n = 31 - ve(l), t = u.hiddenUpdates, a = t[n], a === null ? t[n] = [e] : a.push(e), e.lane = l | 536870912), u) : null;
  }
  function yi(t) {
    if (50 < Ru)
      throw Ru = 0, ic = null, Error(s(185));
    for (var e = t.return; e !== null; )
      t = e, e = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var yn = {};
  function Rv(t, e, l, a) {
    this.tag = t, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Le(t, e, l, a) {
    return new Rv(t, e, l, a);
  }
  function us(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Ll(t, e) {
    var l = t.alternate;
    return l === null ? (l = Le(
      t.tag,
      e,
      t.key,
      t.mode
    ), l.elementType = t.elementType, l.type = t.type, l.stateNode = t.stateNode, l.alternate = t, t.alternate = l) : (l.pendingProps = e, l.type = t.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = t.flags & 1206910976, l.childLanes = t.childLanes, l.lanes = t.lanes, l.child = t.child, l.memoizedProps = t.memoizedProps, l.memoizedState = t.memoizedState, l.updateQueue = t.updateQueue, e = t.dependencies, l.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }, l.sibling = t.sibling, l.index = t.index, l.ref = t.ref, l.refCleanup = t.refCleanup, l;
  }
  function Cf(t, e) {
    t.flags &= 1206910978;
    var l = t.alternate;
    return l === null ? (t.childLanes = 0, t.lanes = e, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = l.childLanes, t.lanes = l.lanes, t.child = l.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = l.memoizedProps, t.memoizedState = l.memoizedState, t.updateQueue = l.updateQueue, t.type = l.type, e = l.dependencies, t.dependencies = e === null ? null : {
      lanes: e.lanes,
      firstContext: e.firstContext
    }), t;
  }
  function bi(t, e, l, a, n, u) {
    var i = 0;
    if (a = t, typeof a == "function") us(a) && (i = 1);
    else if (typeof a == "string")
      i = iy(
        t,
        l,
        X.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (a) {
        case At:
          return t = Le(31, l, e, n), t.elementType = At, t.lanes = u, t;
        case st:
          return wa(l.children, n, u, e);
        case mt:
          i = 8, n |= 24;
          break;
        case Ut:
          return t = Le(12, l, e, n | 2), t.elementType = Ut, t.lanes = u, t;
        case G:
          return t = Le(13, l, e, n), t.elementType = G, t.lanes = u, t;
        case Y:
          return t = Le(19, l, e, n), t.elementType = Y, t.lanes = u, t;
        case Ft:
        case p:
          return t = n | 32, t = Le(30, l, e, t), t.elementType = p, t.lanes = u, t.stateNode = {
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
              case Mt:
                i = 9;
                break t;
              case q:
                i = 11;
                break t;
              case $:
                i = 14;
                break t;
              case nt:
                i = 16, a = null;
                break t;
            }
          i = 29, l = Error(
            s(130, t === null ? "null" : typeof t, "")
          ), a = null;
      }
    return e = Le(i, l, e, n), e.elementType = t, e.type = a, e.lanes = u, e;
  }
  function wa(t, e, l, a) {
    return t = Le(7, t, a, e), t.lanes = l, t;
  }
  function is(t, e, l) {
    return t = Le(6, t, null, e), t.lanes = l, t;
  }
  function Af(t) {
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
  function tl(t, e) {
    if (typeof t == "object" && t !== null) {
      var l = jf.get(t);
      return l !== void 0 ? l : (e = {
        value: t,
        source: e,
        stack: ln(e)
      }, jf.set(t, e), e);
    }
    return {
      value: t,
      source: e,
      stack: ln(e)
    };
  }
  var bn = [], pn = 0, pi = null, fu = 0, el = [], ll = 0, Wl = null, Sl = 1, _l = "";
  function Yl(t, e) {
    bn[pn++] = fu, bn[pn++] = pi, pi = t, fu = e;
  }
  function Rf(t, e, l) {
    el[ll++] = Sl, el[ll++] = _l, el[ll++] = Wl, Wl = t;
    var a = Sl;
    t = _l;
    var n = 32 - ve(a) - 1;
    a &= ~(1 << n), l += 1;
    var u = 32 - ve(e) + n;
    if (30 < u) {
      var i = n - n % 5;
      u = (a & (1 << i) - 1).toString(32), a >>= i, n -= i, Sl = 1 << 32 - ve(e) + n | l << n | a, _l = u + t;
    } else
      Sl = 1 << u | l << n | a, _l = t;
  }
  function Si(t) {
    t.return !== null && (Yl(t, 1), Rf(t, 1, 0));
  }
  function ss(t) {
    for (; t === pi; )
      pi = bn[--pn], bn[pn] = null, fu = bn[--pn], bn[pn] = null;
    for (; t === Wl; )
      Wl = el[--ll], el[ll] = null, _l = el[--ll], el[ll] = null, Sl = el[--ll], el[ll] = null;
  }
  function wf(t, e) {
    el[ll++] = Sl, el[ll++] = _l, el[ll++] = Wl, Sl = e.id, _l = e.overflow, Wl = t;
  }
  var be = null, Wt = null, xt = !1, Il = null, al = !1, rs = Error(s(519));
  function Pl(t) {
    var e = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw du(tl(e, t)), rs;
  }
  function Df(t) {
    var e = t.stateNode, l = t.type, a = t.memoizedProps;
    switch (e[Te] = t, e[He] = a, l) {
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
        for (l = 0; l < Du.length; l++)
          Ct(Du[l], e);
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
        Ct("invalid", e), Zo(
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
        Ct("invalid", e), Jo(e, a.value, a.defaultValue, a.children);
    }
    l = a.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || e.textContent === "" + l || a.suppressHydrationWarning === !0 || eh(e.textContent, l) ? (a.popover != null && (Ct("beforetoggle", e), Ct("toggle", e)), a.onScroll != null && Ct("scroll", e), a.onScrollEnd != null && Ct("scrollend", e), a.onClick != null && (e.onclick = pl), e = !0) : e = !1, e || Pl(t, !0);
  }
  function _i(t) {
    for (be = t.return; be; )
      switch (be.tag) {
        case 5:
        case 31:
        case 13:
          al = !1;
          return;
        case 27:
        case 3:
          al = !0;
          return;
        default:
          be = be.return;
      }
  }
  function Sn(t) {
    if (t !== be) return !1;
    if (!xt) return _i(t), xt = !0, !1;
    var e = t.tag, l;
    if ((l = e !== 3 && e !== 27) && ((l = e === 5) && (l = t.type, l = !(l !== "form" && l !== "button") || Yr(t.type, t.memoizedProps)), l = !l), l && Wt && Pl(t), _i(t), e === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      Wt = Sh(t);
    } else if (e === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      Wt = Sh(t);
    } else
      e === 27 ? (e = Wt, va(t.type) ? (t = $r, $r = null, Wt = t) : Wt = e) : Wt = be ? ul(t.stateNode.nextSibling) : null;
    return !0;
  }
  function Da() {
    Wt = be = null, xt = !1;
  }
  function os() {
    var t = Il;
    return t !== null && (Ge === null ? Ge = t : Ge.push.apply(
      Ge,
      t
    ), Il = null), t;
  }
  function du(t) {
    Il === null ? Il = [t] : Il.push(t);
  }
  var fs = le(null), Ua = null, ql = null;
  function ta(t, e, l) {
    ft(fs, e._currentValue), e._currentValue = l;
  }
  function Gl(t) {
    t._currentValue = fs.current, jt(fs);
  }
  function Ti(t, e, l) {
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
        var i = n.child;
        u = u.firstContext;
        t: for (; u !== null; ) {
          var o = u;
          u = n;
          for (var v = 0; v < e.length; v++)
            if (o.context === e[v]) {
              u.lanes |= l, o = u.alternate, o !== null && (o.lanes |= l), Ti(
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
        i.lanes |= l, u = i.alternate, u !== null && (u.lanes |= l), Ti(i, l, t), i = null;
      } else
        n.tag === 13 && n.memoizedState !== null && n.memoizedState.dehydrated === null ? (n.lanes |= l, i = n.alternate, i !== null && (i.lanes |= l), Ti(
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
  function Ba(t, e, l, a) {
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
          Qe(n.pendingProps.value, i.value) || (t !== null ? t.push(o) : t = [o]);
        }
      } else if (n === Yt.current) {
        if (i = n.alternate, i === null) throw Error(s(387));
        i.memoizedState.memoizedState !== n.memoizedState.memoizedState && (t !== null ? t.push(Zn) : t = [Zn]);
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
      if (!Qe(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function Ha(t) {
    Ua = t, ql = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function Ee(t) {
    return Uf(Ua, t);
  }
  function Ni(t, e) {
    return Ua === null && Ha(t), Uf(t, e);
  }
  function Uf(t, e) {
    var l = e._currentValue;
    if (e = { context: e, memoizedValue: l, next: null }, ql === null) {
      if (t === null) throw Error(s(308));
      ql = e, t.dependencies = { lanes: 0, firstContext: e }, t.flags |= 524288;
    } else ql = ql.next = e;
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
  }, Dv = c.unstable_scheduleCallback, Uv = c.unstable_NormalPriority, oe = {
    $$typeof: bt,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function ms() {
    return {
      controller: new wv(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function mu(t) {
    t.refCount--, t.refCount === 0 && Dv(Uv, function() {
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
  function Bv(t) {
    var e = t.transitionTypes;
    return t.transitionTypes = null, e;
  }
  var vu = null, hs = 0, La = 0, _n = null;
  function Hv(t, e) {
    if (vu === null) {
      var l = vu = [];
      hs = 0, La = Ar(), _n = {
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
      _n !== null && (_n.status = "fulfilled");
      var t = vu;
      vu = null, La = 0, _n = null;
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
  var Lf = k.S;
  k.S = function(t, e) {
    if (Am = Kt(), typeof e == "object" && e !== null && typeof e.then == "function" && Hv(t, e), hu !== null)
      for (var l = Yn; l !== null; )
        Bf(l, hu), l = l.next;
    if (l = t.types, l !== null) {
      for (var a = Yn; a !== null; )
        Bf(a, l), a = a.next;
      if (La !== 0) {
        a = hu, a === null && (a = hu = []);
        for (var n = 0; n < l.length; n++) {
          var u = l[n];
          a.indexOf(u) === -1 && a.push(u);
        }
      }
    }
    Lf !== null && Lf(t, e);
  };
  var Ya = le(null);
  function vs() {
    var t = Ya.current;
    return t !== null ? t : kt.pooledCache;
  }
  function xi(t, e) {
    e === null ? ft(Ya, Ya.current) : ft(Ya, e.pool);
  }
  function Yf() {
    var t = vs();
    return t === null ? null : { parent: oe._currentValue, pool: t };
  }
  var Tn = Error(s(460)), gs = Error(s(474)), Mi = Error(s(542)), Oi = { then: function() {
  } };
  function qf(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function Gf(t, e, l) {
    switch (l = t[l], l === void 0 ? t.push(e) : l !== e && (e.then(pl, pl), e = l), e.status) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw t = e.reason, Vf(t), t === void 0 && !("reason" in e) ? Error(s(600)) : t;
      default:
        if (typeof e.status == "string") e.then(pl, pl);
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
        throw Ga = e, Tn;
    }
  }
  function qa(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (Ga = l, Tn) : l;
    }
  }
  var Ga = null;
  function Xf() {
    if (Ga === null) throw Error(s(459));
    var t = Ga;
    return Ga = null, t;
  }
  function Vf(t) {
    if (t === Tn || t === Mi)
      throw Error(s(483));
  }
  var En = null, gu = 0;
  function zi(t) {
    var e = gu;
    return gu += 1, En === null && (En = []), Gf(En, t, e);
  }
  function ea(t, e) {
    e = e.props.ref, t.ref = e !== void 0 ? e : null;
  }
  function Ci(t, e) {
    throw e.$$typeof === ot ? Error(s(525)) : (t = Object.prototype.toString.call(e), Error(
      s(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t
      )
    ));
  }
  function Qf(t) {
    function e(T, b) {
      if (t) {
        var M = T.deletions;
        M === null ? (T.deletions = [b], T.flags |= 16) : M.push(b);
      }
    }
    function l(T, b) {
      if (!t) return null;
      for (; b !== null; )
        e(T, b), b = b.sibling;
      return null;
    }
    function a(T) {
      for (var b = /* @__PURE__ */ new Map(); T !== null; )
        T.key === null ? b.set(T.index, T) : b.set(T.key, T), T = T.sibling;
      return b;
    }
    function n(T, b) {
      return T = Ll(T, b), T.index = 0, T.sibling = null, T;
    }
    function u(T, b, M) {
      return T.index = M, t ? (M = T.alternate, M !== null ? (M = M.index, M < b ? (T.flags |= 2, b) : M) : (T.flags |= 134217730, b)) : (T.flags |= 1048576, b);
    }
    function i(T) {
      return t && T.alternate === null && (T.flags |= 134217730), T;
    }
    function o(T, b, M, D) {
      return b === null || b.tag !== 6 ? (b = is(M, T.mode, D), b.return = T, b) : (b = n(b, M), b.return = T, b);
    }
    function v(T, b, M, D) {
      var F = M.type;
      return F === st ? (T = z(
        T,
        b,
        M.props.children,
        D,
        M.key
      ), ea(T, M), T) : b !== null && (b.elementType === F || typeof F == "object" && F !== null && F.$$typeof === nt && qa(F) === b.type) ? (b = n(b, M.props), ea(b, M), b.return = T, b) : (b = bi(
        M.type,
        M.key,
        M.props,
        null,
        T.mode,
        D
      ), ea(b, M), b.return = T, b);
    }
    function N(T, b, M, D) {
      return b === null || b.tag !== 4 || b.stateNode.containerInfo !== M.containerInfo || b.stateNode.implementation !== M.implementation ? (b = cs(M, T.mode, D), b.return = T, b) : (b = n(b, M.children || []), b.return = T, b);
    }
    function z(T, b, M, D, F) {
      return b === null || b.tag !== 7 ? (b = wa(
        M,
        T.mode,
        D,
        F
      ), b.return = T, b) : (b = n(b, M), b.return = T, b);
    }
    function U(T, b, M) {
      if (typeof b == "string" && b !== "" || typeof b == "number" || typeof b == "bigint")
        return b = is(
          "" + b,
          T.mode,
          M
        ), b.return = T, b;
      if (typeof b == "object" && b !== null) {
        switch (b.$$typeof) {
          case Pt:
            return M = bi(
              b.type,
              b.key,
              b.props,
              null,
              T.mode,
              M
            ), ea(M, b), M.return = T, M;
          case it:
            return b = cs(
              b,
              T.mode,
              M
            ), b.return = T, b;
          case nt:
            return b = qa(b), U(T, b, M);
        }
        if (Et(b) || P(b))
          return b = wa(
            b,
            T.mode,
            M,
            null
          ), b.return = T, b;
        if (typeof b.then == "function")
          return U(T, zi(b), M);
        if (b.$$typeof === bt)
          return U(
            T,
            Ni(T, b),
            M
          );
        Ci(T, b);
      }
      return null;
    }
    function _(T, b, M, D) {
      var F = b !== null ? b.key : null;
      if (typeof M == "string" && M !== "" || typeof M == "number" || typeof M == "bigint")
        return F !== null ? null : o(T, b, "" + M, D);
      if (typeof M == "object" && M !== null) {
        switch (M.$$typeof) {
          case Pt:
            return M.key === F ? v(T, b, M, D) : null;
          case it:
            return M.key === F ? N(T, b, M, D) : null;
          case nt:
            return M = qa(M), _(T, b, M, D);
        }
        if (Et(M) || P(M))
          return F !== null ? null : z(T, b, M, D, null);
        if (typeof M.then == "function")
          return _(
            T,
            b,
            zi(M),
            D
          );
        if (M.$$typeof === bt)
          return _(
            T,
            b,
            Ni(T, M),
            D
          );
        Ci(T, M);
      }
      return null;
    }
    function O(T, b, M, D, F) {
      if (typeof D == "string" && D !== "" || typeof D == "number" || typeof D == "bigint")
        return T = T.get(M) || null, o(b, T, "" + D, F);
      if (typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case Pt:
            return T = T.get(
              D.key === null ? M : D.key
            ) || null, v(b, T, D, F);
          case it:
            return T = T.get(
              D.key === null ? M : D.key
            ) || null, N(b, T, D, F);
          case nt:
            return D = qa(D), O(
              T,
              b,
              M,
              D,
              F
            );
        }
        if (Et(D) || P(D))
          return T = T.get(M) || null, z(b, T, D, F, null);
        if (typeof D.then == "function")
          return O(
            T,
            b,
            M,
            zi(D),
            F
          );
        if (D.$$typeof === bt)
          return O(
            T,
            b,
            M,
            Ni(b, D),
            F
          );
        Ci(b, D);
      }
      return null;
    }
    function Q(T, b, M, D) {
      for (var F = null, Dt = null, at = b, ct = b = 0, me = null; at !== null && ct < M.length; ct++) {
        at.index > ct ? (me = at, at = null) : me = at.sibling;
        var Ht = _(
          T,
          at,
          M[ct],
          D
        );
        if (Ht === null) {
          at === null && (at = me);
          break;
        }
        t && at && Ht.alternate === null && e(T, at), b = u(Ht, b, ct), Dt === null ? F = Ht : Dt.sibling = Ht, Dt = Ht, at = me;
      }
      if (ct === M.length)
        return l(T, at), xt && Yl(T, ct), F;
      if (at === null) {
        for (; ct < M.length; ct++)
          at = U(T, M[ct], D), at !== null && (b = u(
            at,
            b,
            ct
          ), Dt === null ? F = at : Dt.sibling = at, Dt = at);
        return xt && Yl(T, ct), F;
      }
      for (at = a(at); ct < M.length; ct++)
        me = O(
          at,
          T,
          ct,
          M[ct],
          D
        ), me !== null && (t && (Ht = me.alternate, Ht !== null && at.delete(Ht.key === null ? ct : Ht.key)), b = u(
          me,
          b,
          ct
        ), Dt === null ? F = me : Dt.sibling = me, Dt = me);
      return t && at.forEach(function(Sa) {
        return e(T, Sa);
      }), xt && Yl(T, ct), F;
    }
    function et(T, b, M, D) {
      if (M == null) throw Error(s(151));
      for (var F = null, Dt = null, at = b, ct = b = 0, me = null, Ht = M.next(); at !== null && !Ht.done; ct++, Ht = M.next()) {
        at.index > ct ? (me = at, at = null) : me = at.sibling;
        var Sa = _(T, at, Ht.value, D);
        if (Sa === null) {
          at === null && (at = me);
          break;
        }
        t && at && Sa.alternate === null && e(T, at), b = u(Sa, b, ct), Dt === null ? F = Sa : Dt.sibling = Sa, Dt = Sa, at = me;
      }
      if (Ht.done)
        return l(T, at), xt && Yl(T, ct), F;
      if (at === null) {
        for (; !Ht.done; ct++, Ht = M.next())
          Ht = U(T, Ht.value, D), Ht !== null && (b = u(Ht, b, ct), Dt === null ? F = Ht : Dt.sibling = Ht, Dt = Ht);
        return xt && Yl(T, ct), F;
      }
      for (at = a(at); !Ht.done; ct++, Ht = M.next())
        Ht = O(at, T, ct, Ht.value, D), Ht !== null && (t && (me = Ht.alternate, me !== null && at.delete(
          me.key === null ? ct : me.key
        )), b = u(Ht, b, ct), Dt === null ? F = Ht : Dt.sibling = Ht, Dt = Ht);
      return t && at.forEach(function(by) {
        return e(T, by);
      }), xt && Yl(T, ct), F;
    }
    function St(T, b, M, D) {
      if (typeof M == "object" && M !== null && M.type === st && M.key === null && M.props.ref === void 0 && (M = M.props.children), typeof M == "object" && M !== null) {
        switch (M.$$typeof) {
          case Pt:
            t: {
              for (var F = M.key; b !== null; ) {
                if (b.key === F) {
                  if (F = M.type, F === st) {
                    if (b.tag === 7) {
                      l(
                        T,
                        b.sibling
                      ), D = n(
                        b,
                        M.props.children
                      ), ea(D, M), D.return = T, T = D;
                      break t;
                    }
                  } else if (b.elementType === F || typeof F == "object" && F !== null && F.$$typeof === nt && qa(F) === b.type) {
                    l(
                      T,
                      b.sibling
                    ), D = n(b, M.props), ea(D, M), D.return = T, T = D;
                    break t;
                  }
                  l(T, b);
                  break;
                } else e(T, b);
                b = b.sibling;
              }
              M.type === st ? (D = wa(
                M.props.children,
                T.mode,
                D,
                M.key
              ), ea(D, M), D.return = T, T = D) : (D = bi(
                M.type,
                M.key,
                M.props,
                null,
                T.mode,
                D
              ), ea(D, M), D.return = T, T = D);
            }
            return i(T);
          case it:
            t: {
              for (F = M.key; b !== null; ) {
                if (b.key === F)
                  if (b.tag === 4 && b.stateNode.containerInfo === M.containerInfo && b.stateNode.implementation === M.implementation) {
                    l(
                      T,
                      b.sibling
                    ), D = n(b, M.children || []), D.return = T, T = D;
                    break t;
                  } else {
                    l(T, b);
                    break;
                  }
                else e(T, b);
                b = b.sibling;
              }
              D = cs(M, T.mode, D), D.return = T, T = D;
            }
            return i(T);
          case nt:
            return M = qa(M), St(
              T,
              b,
              M,
              D
            );
        }
        if (Et(M))
          return Q(
            T,
            b,
            M,
            D
          );
        if (P(M)) {
          if (F = P(M), typeof F != "function") throw Error(s(150));
          return M = F.call(M), et(
            T,
            b,
            M,
            D
          );
        }
        if (typeof M.then == "function")
          return St(
            T,
            b,
            zi(M),
            D
          );
        if (M.$$typeof === bt)
          return St(
            T,
            b,
            Ni(T, M),
            D
          );
        Ci(T, M);
      }
      return typeof M == "string" && M !== "" || typeof M == "number" || typeof M == "bigint" ? (M = "" + M, b !== null && b.tag === 6 ? (l(T, b.sibling), D = n(b, M), D.return = T, T = D) : (l(T, b), D = is(M, T.mode, D), D.return = T, T = D), i(T)) : l(T, b);
    }
    return function(T, b, M, D) {
      try {
        gu = 0;
        var F = St(
          T,
          b,
          M,
          D
        );
        return En = null, F;
      } catch (at) {
        if (at === Tn || at === Mi) throw at;
        var Dt = Le(29, at, null, T.mode);
        return Dt.lanes = D, Dt.return = T, Dt;
      }
    };
  }
  var Xa = Qf(!0), Zf = Qf(!1), la = !1;
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
  function aa(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function na(t, e, l) {
    var a = t.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (qt & 2) !== 0) {
      var n = a.pending;
      return n === null ? e.next = e : (e.next = n.next, n.next = e), a.pending = e, e = yi(t), zf(t, null, l), e;
    }
    return gi(t, a, e, l), yi(t);
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
  var Ss = !1;
  function bu() {
    if (Ss) {
      var t = _n;
      if (t !== null) throw t;
    }
  }
  function pu(t, e, l, a) {
    Ss = !1;
    var n = t.updateQueue;
    la = !1;
    var u = n.firstBaseUpdate, i = n.lastBaseUpdate, o = n.shared.pending;
    if (o !== null) {
      n.shared.pending = null;
      var v = o, N = v.next;
      v.next = null, i === null ? u = N : i.next = N, i = v;
      var z = t.alternate;
      z !== null && (z = z.updateQueue, o = z.lastBaseUpdate, o !== i && (o === null ? z.firstBaseUpdate = N : o.next = N, z.lastBaseUpdate = v));
    }
    if (u !== null) {
      var U = n.baseState;
      i = 0, z = N = v = null, o = u;
      do {
        var _ = o.lane & -536870913, O = _ !== o.lane;
        if (O ? (wt & _) === _ : (a & _) === _) {
          _ !== 0 && _ === La && (Ss = !0), z !== null && (z = z.next = {
            lane: 0,
            tag: o.tag,
            payload: o.payload,
            callback: null,
            next: null
          });
          t: {
            var Q = t, et = o;
            _ = e;
            var St = l;
            switch (et.tag) {
              case 1:
                if (Q = et.payload, typeof Q == "function") {
                  U = Q.call(St, U, _);
                  break t;
                }
                U = Q;
                break t;
              case 3:
                Q.flags = Q.flags & -65537 | 128;
              case 0:
                if (Q = et.payload, _ = typeof Q == "function" ? Q.call(St, U, _) : Q, _ == null) break t;
                U = Z({}, U, _);
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
          }, z === null ? (N = z = O, v = U) : z = z.next = O, i |= _;
        if (o = o.next, o === null) {
          if (o = n.shared.pending, o === null)
            break;
          O = o, o = O.next, O.next = null, n.lastBaseUpdate = O, n.shared.pending = null;
        }
      } while (!0);
      z === null && (v = U), n.baseState = v, n.firstBaseUpdate = N, n.lastBaseUpdate = z, u === null && (n.shared.lanes = 0), fa |= i, t.lanes = i, t.memoizedState = U;
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
  var ua = le(null), Ai = le(0);
  function $f(t, e) {
    t = Kl, ft(Ai, t), ft(ua, e), Kl = t | e.baseLanes;
  }
  function _s() {
    ft(Ai, Kl), ft(ua, ua.current);
  }
  function Ts() {
    Kl = Ai.current, jt(ua), jt(Ai);
  }
  var Ne = le(null), Ae = null;
  function ia(t) {
    var e = t.alternate;
    ft(xe, xe.current & 1), ft(Ne, t), Ae === null && (e === null || ua.current !== null || e.memoizedState !== null) && (Ae = t);
  }
  function Es(t) {
    ft(xe, xe.current), ft(Ne, t), Ae === null && (Ae = t);
  }
  function kf(t) {
    t.tag === 22 ? (ft(xe, xe.current), ft(Ne, t), Ae === null && (Ae = t)) : ca();
  }
  function ca() {
    ft(xe, xe.current), ft(Ne, Ne.current);
  }
  function Ze(t) {
    jt(Ne), Ae === t && (Ae = null), jt(xe);
  }
  var xe = le(0);
  function Su(t, e) {
    ft(Ne, Ne.current), ft(xe, e);
  }
  function Ns(t) {
    jt(xe), jt(Ne), Ae === t && (Ae = null);
  }
  function ji(t) {
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
  var Xl = 0, pt = null, $t = null, fe = null, Ri = !1, Nn = !1, Va = !1, wi = 0, _u = 0, xn = null, Yv = 0;
  function ue() {
    throw Error(s(321));
  }
  function xs(t, e) {
    if (e === null) return !1;
    for (var l = 0; l < e.length && l < t.length; l++)
      if (!Qe(t[l], e[l])) return !1;
    return !0;
  }
  function Ms(t, e, l, a, n, u) {
    return Xl = u, pt = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, k.H = t === null || t.memoizedState === null ? Rd : wd, Va = !1, u = l(a, n), Va = !1, Nn && (u = Wf(
      e,
      l,
      a,
      n
    )), Ff(t), u;
  }
  function Ff(t) {
    k.H = qi;
    var e = $t !== null && $t.next !== null;
    if (Xl = 0, fe = $t = pt = null, Ri = !1, _u = 0, xn = null, e) throw Error(s(300));
    t === null || de || (t = t.dependencies, t !== null && Ei(t) && (de = !0));
  }
  function Wf(t, e, l, a) {
    pt = t;
    var n = 0;
    do {
      if (Nn && (xn = null), _u = 0, Nn = !1, 25 <= n) throw Error(s(301));
      if (n += 1, fe = $t = null, t.updateQueue != null) {
        var u = t.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      k.H = Jv, u = e(l, a);
    } while (Nn);
    return u;
  }
  function qv() {
    var t = k.H, e = t.useState()[0];
    return e = typeof e.then == "function" ? Tu(e) : e, t = t.useState()[0], ($t !== null ? $t.memoizedState : null) !== t && (pt.flags |= 1024), e;
  }
  function Os() {
    var t = wi !== 0;
    return wi = 0, t;
  }
  function zs(t, e, l) {
    e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~l;
  }
  function Cs(t) {
    if (Ri) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        e !== null && (e.pending = null), t = t.next;
      }
      Ri = !1;
    }
    Xl = 0, fe = $t = pt = null, Nn = !1, _u = wi = 0, xn = null;
  }
  function we() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return fe === null ? pt.memoizedState = fe = t : fe = fe.next = t, fe;
  }
  function re() {
    if ($t === null) {
      var t = pt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = $t.next;
    var e = fe === null ? pt.memoizedState : fe.next;
    if (e !== null)
      fe = e, $t = t;
    else {
      if (t === null)
        throw pt.alternate === null ? Error(s(467)) : Error(s(310));
      $t = t, t = {
        memoizedState: $t.memoizedState,
        baseState: $t.baseState,
        baseQueue: $t.baseQueue,
        queue: $t.queue,
        next: null
      }, fe === null ? pt.memoizedState = fe = t : fe = fe.next = t;
    }
    return fe;
  }
  function Di() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Tu(t) {
    var e = _u;
    return _u += 1, xn === null && (xn = []), t = Gf(xn, t, e), e = pt, (fe === null ? e.memoizedState : fe.next) === null && (e = e.alternate, k.H = e === null || e.memoizedState === null ? Rd : wd), t;
  }
  function Ui(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return Tu(t);
      if (t.$$typeof === H) return;
      if (t.$$typeof === bt) return Ee(t);
    }
    throw Error(s(438, String(t)));
  }
  function As(t) {
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
    if (e == null && (e = { data: [], index: 0 }), l === null && (l = Di(), pt.updateQueue = l), l.memoCache = e, l = e.data[e.index], l === void 0)
      for (l = e.data[e.index] = Array(t), a = 0; a < t; a++)
        l[a] = Zt;
    return e.index++, l;
  }
  function Vl(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function Bi(t) {
    var e = re();
    return js(e, $t, t);
  }
  function js(t, e, l) {
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
      var o = i = null, v = null, N = e, z = !1;
      do {
        var U = N.lane & -536870913;
        if (U !== N.lane ? (wt & U) === U : (Xl & U) === U) {
          var _ = N.revertLane;
          if (_ === 0)
            v !== null && (v = v.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: N.action,
              hasEagerState: N.hasEagerState,
              eagerState: N.eagerState,
              next: null
            }), U === La && (z = !0);
          else if ((Xl & _) === _) {
            N = N.next, _ === La && (z = !0);
            continue;
          } else
            U = {
              lane: 0,
              revertLane: N.revertLane,
              gesture: null,
              action: N.action,
              hasEagerState: N.hasEagerState,
              eagerState: N.eagerState,
              next: null
            }, v === null ? (o = v = U, i = u) : v = v.next = U, pt.lanes |= _, fa |= _;
          U = N.action, Va && l(u, U), u = N.hasEagerState ? N.eagerState : l(u, U);
        } else
          _ = {
            lane: U,
            revertLane: N.revertLane,
            gesture: N.gesture,
            action: N.action,
            hasEagerState: N.hasEagerState,
            eagerState: N.eagerState,
            next: null
          }, v === null ? (o = v = _, i = u) : v = v.next = _, pt.lanes |= U, fa |= U;
        N = N.next;
      } while (N !== null && N !== e);
      if (v === null ? i = u : v.next = o, !Qe(u, t.memoizedState) && (de = !0, z && (l = _n, l !== null)))
        throw l;
      t.memoizedState = u, t.baseState = i, t.baseQueue = v, a.lastRenderedState = u;
    }
    return n === null && (a.lanes = 0), [t.memoizedState, a.dispatch];
  }
  function Rs(t) {
    var e = re(), l = e.queue;
    if (l === null) throw Error(s(311));
    l.lastRenderedReducer = t;
    var a = l.dispatch, n = l.pending, u = e.memoizedState;
    if (n !== null) {
      l.pending = null;
      var i = n = n.next;
      do
        u = t(u, i.action), i = i.next;
      while (i !== n);
      Qe(u, e.memoizedState) || (de = !0), e.memoizedState = u, e.baseQueue === null && (e.baseState = u), l.lastRenderedState = u;
    }
    return [u, a];
  }
  function If(t, e, l) {
    var a = pt, n = re(), u = xt;
    if (u) {
      if (l === void 0) throw Error(s(407));
      l = l();
    } else l = e();
    var i = !Qe(
      ($t || n).memoizedState,
      l
    );
    if (i && (n.memoizedState = l, de = !0), n = n.queue, Us(ed.bind(null, a, n, t), [
      t
    ]), t = n.getSnapshot !== e || i || fe !== null && (fe.memoizedState.tag & 1) !== 0, Mn(
      t ? 9 : 8,
      { destroy: void 0 },
      td.bind(null, a, n, l, e),
      null
    ), t) {
      if (a.flags |= 2048, kt === null) throw Error(s(349));
      u || (Xl & 127) !== 0 || Pf(a, e, l);
    }
    return l;
  }
  function Pf(t, e, l) {
    t.flags |= 16384, t = { getSnapshot: e, value: l }, e = pt.updateQueue, e === null ? (e = Di(), pt.updateQueue = e, e.stores = [t]) : (l = e.stores, l === null ? e.stores = [t] : l.push(t));
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
      return !Qe(t, l);
    } catch {
      return !0;
    }
  }
  function ad(t) {
    var e = Ra(t, 2);
    e !== null && Xe(e, t, 2);
  }
  function ws(t) {
    var e = we();
    if (typeof t == "function") {
      var l = t;
      if (t = l(), Va) {
        Jt(!0);
        try {
          l();
        } finally {
          Jt(!1);
        }
      }
    }
    return e.memoizedState = e.baseState = t, e.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Vl,
      lastRenderedState: t
    }, e;
  }
  function nd(t, e, l, a) {
    return t.baseState = l, js(
      t,
      $t,
      typeof a == "function" ? a : Vl
    );
  }
  function Gv(t, e, l, a, n) {
    if (Yi(t)) throw Error(s(485));
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
      k.T !== null ? l(!0) : u.isTransition = !1, a(u), l = e.pending, l === null ? (u.next = e.pending = u, ud(e, u)) : (u.next = l.next, e.pending = l.next = u);
    }
  }
  function ud(t, e) {
    var l = e.action, a = e.payload, n = t.state;
    if (e.isTransition) {
      var u = k.T, i = {};
      i.types = u !== null ? u.types : null, k.T = i;
      try {
        var o = l(n, a), v = k.S;
        v !== null && v(i, o), id(t, e, o);
      } catch (N) {
        Ds(t, e, N);
      } finally {
        u !== null && i.types !== null && (u.types = i.types), k.T = u;
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
    if (xt) {
      var l = kt.formState;
      if (l !== null) {
        t: {
          var a = pt;
          if (xt) {
            if (Wt) {
              e: {
                for (var n = Wt, u = al; n.nodeType !== 8; ) {
                  if (!u) {
                    n = null;
                    break e;
                  }
                  if (n = ul(
                    n.nextSibling
                  ), n === null) {
                    n = null;
                    break e;
                  }
                }
                u = n.data, n = u === "F!" || u === "F" ? n : null;
              }
              if (n) {
                Wt = ul(
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
    return l = we(), l.memoizedState = l.baseState = e, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: rd,
      lastRenderedState: e
    }, l.queue = a, l = Cd.bind(
      null,
      pt,
      a
    ), a.dispatch = l, a = ws(!1), u = qs.bind(
      null,
      pt,
      !1,
      a.queue
    ), a = we(), n = {
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
  function fd(t) {
    var e = re();
    return dd(e, $t, t);
  }
  function dd(t, e, l) {
    if (e = js(
      t,
      e,
      rd
    )[0], t = Bi(Vl)[0], typeof e == "object" && e !== null && typeof e.then == "function")
      try {
        var a = Tu(e);
      } catch (i) {
        throw i === Tn ? Mi : i;
      }
    else a = e;
    e = re();
    var n = e.queue, u = n.dispatch;
    return l !== e.memoizedState && (pt.flags |= 2048, Mn(
      9,
      { destroy: void 0 },
      Xv.bind(null, n, l),
      null
    )), [a, u, t];
  }
  function Xv(t, e) {
    t.action = e;
  }
  function md(t) {
    var e = re(), l = $t;
    if (l !== null)
      return dd(e, l, t);
    re(), e = e.memoizedState, l = re();
    var a = l.queue.dispatch;
    return l.memoizedState = t, [e, a, !1];
  }
  function Mn(t, e, l, a) {
    return t = { tag: t, create: l, deps: a, inst: e, next: null }, e = pt.updateQueue, e === null && (e = Di(), pt.updateQueue = e), l = e.lastEffect, l === null ? e.lastEffect = t.next = t : (a = l.next, l.next = t, t.next = a, e.lastEffect = t), t;
  }
  function hd() {
    return re().memoizedState;
  }
  function Hi(t, e, l, a) {
    var n = we();
    pt.flags |= t, n.memoizedState = Mn(
      1 | e,
      { destroy: void 0 },
      l,
      a === void 0 ? null : a
    );
  }
  function Li(t, e, l, a) {
    var n = re();
    a = a === void 0 ? null : a;
    var u = n.memoizedState.inst;
    $t !== null && a !== null && xs(a, $t.memoizedState.deps) ? n.memoizedState = Mn(e, u, l, a) : (pt.flags |= t, n.memoizedState = Mn(
      1 | e,
      u,
      l,
      a
    ));
  }
  function vd(t, e) {
    Hi(8390656, 8, t, e);
  }
  function Us(t, e) {
    Li(2048, 8, t, e);
  }
  function Vv(t) {
    pt.flags |= 4;
    var e = pt.updateQueue;
    if (e === null)
      e = Di(), pt.updateQueue = e, e.events = [t];
    else {
      var l = e.events;
      l === null ? e.events = [t] : l.push(t);
    }
  }
  function gd(t) {
    var e = re().memoizedState;
    return Vv({ ref: e, nextImpl: t }), function() {
      if ((qt & 2) !== 0) throw Error(s(440));
      return e.impl.apply(void 0, arguments);
    };
  }
  function yd(t, e) {
    return Li(4, 2, t, e);
  }
  function bd(t, e) {
    return Li(4, 4, t, e);
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
    l = l != null ? l.concat([t]) : null, Li(4, 4, pd.bind(null, e, t), l);
  }
  function Bs() {
  }
  function _d(t, e) {
    var l = re();
    e = e === void 0 ? null : e;
    var a = l.memoizedState;
    return e !== null && xs(e, a[1]) ? a[0] : (l.memoizedState = [t, e], t);
  }
  function Td(t, e) {
    var l = re();
    e = e === void 0 ? null : e;
    var a = l.memoizedState;
    if (e !== null && xs(e, a[1]))
      return a[0];
    if (a = t(), Va) {
      Jt(!0);
      try {
        t();
      } finally {
        Jt(!1);
      }
    }
    return l.memoizedState = [a, e], a;
  }
  function Hs(t, e, l) {
    return l === void 0 || (Xl & 1073741824) !== 0 && (wt & 261930) === 0 ? t.memoizedState = e : (t.memoizedState = l, t = Rm(), pt.lanes |= t, fa |= t, l);
  }
  function Ed(t, e, l, a) {
    return Qe(l, e) ? l : ua.current !== null ? (t = Hs(t, l, a), Qe(t, e) || (de = !0), t) : (Xl & 106) === 0 || (Xl & 1073741824) !== 0 && (wt & 261930) === 0 ? (de = !0, t.memoizedState = l) : (t = Rm(), pt.lanes |= t, fa |= t, e);
  }
  function Nd(t, e, l, a, n) {
    var u = ut.p;
    ut.p = u !== 0 && 8 > u ? u : 8;
    var i = k.T, o = {};
    o.types = i !== null ? i.types : null, k.T = o, qs(t, !1, e, l);
    try {
      var v = n(), N = k.S;
      if (N !== null && N(o, v), v !== null && typeof v == "object" && typeof v.then == "function") {
        var z = Lv(
          v,
          a
        );
        Eu(
          t,
          e,
          z,
          ke(t)
        );
      } else
        Eu(
          t,
          e,
          a,
          ke(t)
        );
    } catch (U) {
      Eu(
        t,
        e,
        { then: function() {
        }, status: "rejected", reason: U },
        ke()
      );
    } finally {
      ut.p = u, i !== null && o.types !== null && (i.types = o.types), k.T = i;
    }
  }
  function Qv() {
  }
  function Ls(t, e, l, a) {
    if (t.tag !== 5) throw Error(s(476));
    var n = xd(t).queue;
    Nd(
      t,
      n,
      e,
      ce,
      l === null ? Qv : function() {
        return Md(t), l(a);
      }
    );
  }
  function xd(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: ce,
      baseState: ce,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Vl,
        lastRenderedState: ce
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
        lastRenderedReducer: Vl,
        lastRenderedState: l
      },
      next: null
    }, t.memoizedState = e, t = t.alternate, t !== null && (t.memoizedState = e), e;
  }
  function Md(t) {
    var e = xd(t);
    e.next === null && (e = t.alternate.memoizedState), Eu(
      t,
      e.next.queue,
      {},
      ke()
    );
  }
  function Ys() {
    return Ee(Zn);
  }
  function Od() {
    return re().memoizedState;
  }
  function zd() {
    return re().memoizedState;
  }
  function Zv(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var l = ke();
          t = aa(l);
          var a = na(e, t, l);
          a !== null && (Xe(a, e, l), yu(a, e, l)), e = { cache: ms() }, t.payload = e;
          return;
      }
      e = e.return;
    }
  }
  function Kv(t, e, l) {
    var a = ke();
    l = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Yi(t) ? Ad(e, l) : (l = ns(t, e, l, a), l !== null && (Xe(l, t, a), jd(l, e, a)));
  }
  function Cd(t, e, l) {
    var a = ke();
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
    if (Yi(t)) Ad(e, n);
    else {
      var u = t.alternate;
      if (t.lanes === 0 && (u === null || u.lanes === 0) && (u = e.lastRenderedReducer, u !== null))
        try {
          var i = e.lastRenderedState, o = u(i, l);
          if (n.hasEagerState = !0, n.eagerState = o, Qe(o, i))
            return gi(t, e, n, 0), kt === null && vi(), !1;
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
      revertLane: Ar(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Yi(t)) {
      if (e) throw Error(s(479));
    } else
      e = ns(
        t,
        l,
        a,
        2
      ), e !== null && Xe(e, t, 2);
  }
  function Yi(t) {
    var e = t.alternate;
    return t === pt || e !== null && e === pt;
  }
  function Ad(t, e) {
    Nn = Ri = !0;
    var l = t.pending;
    l === null ? e.next = e : (e.next = l.next, l.next = e), t.pending = e;
  }
  function jd(t, e, l) {
    if ((l & 4194048) !== 0) {
      var a = e.lanes;
      a &= t.pendingLanes, l |= a, e.lanes = l, jo(t, l);
    }
  }
  var qi = {
    readContext: Ee,
    use: Ui,
    useCallback: ue,
    useContext: ue,
    useEffect: ue,
    useImperativeHandle: ue,
    useLayoutEffect: ue,
    useInsertionEffect: ue,
    useMemo: ue,
    useReducer: ue,
    useRef: ue,
    useState: ue,
    useDebugValue: ue,
    useDeferredValue: ue,
    useTransition: ue,
    useSyncExternalStore: ue,
    useId: ue,
    useHostTransitionStatus: ue,
    useFormState: ue,
    useActionState: ue,
    useOptimistic: ue,
    useMemoCache: ue,
    useCacheRefresh: ue,
    useEffectEvent: ue
  }, Rd = {
    readContext: Ee,
    use: Ui,
    useCallback: function(t, e) {
      return we().memoizedState = [
        t,
        e === void 0 ? null : e
      ], t;
    },
    useContext: Ee,
    useEffect: vd,
    useImperativeHandle: function(t, e, l) {
      l = l != null ? l.concat([t]) : null, Hi(
        4194308,
        4,
        pd.bind(null, e, t),
        l
      );
    },
    useLayoutEffect: function(t, e) {
      return Hi(4194308, 4, t, e);
    },
    useInsertionEffect: function(t, e) {
      Hi(4, 2, t, e);
    },
    useMemo: function(t, e) {
      var l = we();
      e = e === void 0 ? null : e;
      var a = t();
      if (Va) {
        Jt(!0);
        try {
          t();
        } finally {
          Jt(!1);
        }
      }
      return l.memoizedState = [a, e], a;
    },
    useReducer: function(t, e, l) {
      var a = we();
      if (l !== void 0) {
        var n = l(e);
        if (Va) {
          Jt(!0);
          try {
            l(e);
          } finally {
            Jt(!1);
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
      var e = we();
      return t = { current: t }, e.memoizedState = t;
    },
    useState: function(t) {
      t = ws(t);
      var e = t.queue, l = Cd.bind(null, pt, e);
      return e.dispatch = l, [t.memoizedState, l];
    },
    useDebugValue: Bs,
    useDeferredValue: function(t, e) {
      var l = we();
      return Hs(l, t, e);
    },
    useTransition: function() {
      var t = ws(!1);
      return t = Nd.bind(
        null,
        pt,
        t.queue,
        !0,
        !1
      ), we().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, e, l) {
      var a = pt, n = we();
      if (xt) {
        if (l === void 0)
          throw Error(s(407));
        l = l();
      } else {
        if (l = e(), kt === null)
          throw Error(s(349));
        (wt & 127) !== 0 || Pf(a, e, l);
      }
      n.memoizedState = l;
      var u = { value: l, getSnapshot: e };
      return n.queue = u, vd(ed.bind(null, a, u, t), [
        t
      ]), a.flags |= 2048, Mn(
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
      var t = we(), e = kt.identifierPrefix;
      if (xt) {
        var l = _l, a = Sl;
        l = (a & ~(1 << 32 - ve(a) - 1)).toString(32) + l, e = "_" + e + "R_" + l, l = wi++, 0 < l && (e += "H" + l.toString(32)), e += "_";
      } else
        l = Yv++, e = "_" + e + "r_" + l.toString(32) + "_";
      return t.memoizedState = e;
    },
    useHostTransitionStatus: Ys,
    useFormState: od,
    useActionState: od,
    useOptimistic: function(t) {
      var e = we();
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
    useMemoCache: As,
    useCacheRefresh: function() {
      return we().memoizedState = Zv.bind(
        null,
        pt
      );
    },
    useEffectEvent: function(t) {
      var e = we(), l = { impl: t };
      return e.memoizedState = l, function() {
        if ((qt & 2) !== 0)
          throw Error(s(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, wd = {
    readContext: Ee,
    use: Ui,
    useCallback: _d,
    useContext: Ee,
    useEffect: Us,
    useImperativeHandle: Sd,
    useInsertionEffect: yd,
    useLayoutEffect: bd,
    useMemo: Td,
    useReducer: Bi,
    useRef: hd,
    useState: function() {
      return Bi(Vl);
    },
    useDebugValue: Bs,
    useDeferredValue: function(t, e) {
      var l = re();
      return Ed(
        l,
        $t.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = Bi(Vl)[0], e = re().memoizedState;
      return [
        typeof t == "boolean" ? t : Tu(t),
        e
      ];
    },
    useSyncExternalStore: If,
    useId: Od,
    useHostTransitionStatus: Ys,
    useFormState: fd,
    useActionState: fd,
    useOptimistic: function(t, e) {
      var l = re();
      return nd(l, $t, t, e);
    },
    useMemoCache: As,
    useCacheRefresh: zd,
    useEffectEvent: gd
  }, Jv = {
    readContext: Ee,
    use: Ui,
    useCallback: _d,
    useContext: Ee,
    useEffect: Us,
    useImperativeHandle: Sd,
    useInsertionEffect: yd,
    useLayoutEffect: bd,
    useMemo: Td,
    useReducer: Rs,
    useRef: hd,
    useState: function() {
      return Rs(Vl);
    },
    useDebugValue: Bs,
    useDeferredValue: function(t, e) {
      var l = re();
      return $t === null ? Hs(l, t, e) : Ed(
        l,
        $t.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = Rs(Vl)[0], e = re().memoizedState;
      return [
        typeof t == "boolean" ? t : Tu(t),
        e
      ];
    },
    useSyncExternalStore: If,
    useId: Od,
    useHostTransitionStatus: Ys,
    useFormState: md,
    useActionState: md,
    useOptimistic: function(t, e) {
      var l = re();
      return $t !== null ? nd(l, $t, t, e) : (l.baseState = t, [t, l.queue.dispatch]);
    },
    useMemoCache: As,
    useCacheRefresh: zd,
    useEffectEvent: gd
  };
  function Gs(t, e, l, a) {
    e = t.memoizedState, l = l(a, e), l = l == null ? e : Z({}, e, l), t.memoizedState = l, t.lanes === 0 && (t.updateQueue.baseState = l);
  }
  var Xs = {
    enqueueSetState: function(t, e, l) {
      t = t._reactInternals;
      var a = ke(), n = aa(a);
      n.payload = e, l != null && (n.callback = l), e = na(t, n, a), e !== null && (Xe(e, t, a), yu(e, t, a));
    },
    enqueueReplaceState: function(t, e, l) {
      t = t._reactInternals;
      var a = ke(), n = aa(a);
      n.tag = 1, n.payload = e, l != null && (n.callback = l), e = na(t, n, a), e !== null && (Xe(e, t, a), yu(e, t, a));
    },
    enqueueForceUpdate: function(t, e) {
      t = t._reactInternals;
      var l = ke(), a = aa(l);
      a.tag = 2, e != null && (a.callback = e), e = na(t, a, l), e !== null && (Xe(e, t, l), yu(e, t, l));
    }
  };
  function Dd(t, e, l, a, n, u, i) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(a, u, i) : e.prototype && e.prototype.isPureReactComponent ? !ru(l, a) || !ru(n, u) : !0;
  }
  function Ud(t, e, l, a) {
    t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(l, a), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(l, a), e.state !== t && Xs.enqueueReplaceState(e, e.state, null);
  }
  function Qa(t, e) {
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
  function Bd(t) {
    hi(t);
  }
  function Hd(t) {
    console.error(t);
  }
  function Ld(t) {
    hi(t);
  }
  function Gi(t, e) {
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
    return l = aa(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      Gi(t, e);
    }, l;
  }
  function qd(t) {
    return t = aa(t), t.tag = 3, t;
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
    var i = l.stateNode;
    i !== null && typeof i.componentDidCatch == "function" && (t.callback = function() {
      Yd(e, l, a), typeof n != "function" && (da === null ? da = /* @__PURE__ */ new Set([this]) : da.add(this));
      var o = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: o !== null ? o : ""
      });
    });
  }
  function $v(t, e, l, a, n) {
    if (l.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (e = l.alternate, e !== null && Ba(
        e,
        l,
        n,
        !0
      ), l = Ne.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
          case 19:
            return Ae === null ? sc() : l.alternate === null && ie === 0 && (ie = 3), l.flags &= -257, l.flags |= 65536, l.lanes = n, a === Oi ? l.flags |= 16384 : (e = l.updateQueue, e === null ? l.updateQueue = /* @__PURE__ */ new Set([a]) : e.add(a), Or(t, a, n)), !1;
          case 22:
            return l.flags |= 65536, a === Oi ? l.flags |= 16384 : (e = l.updateQueue, e === null ? (e = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, l.updateQueue = e) : (l = e.retryQueue, l === null ? e.retryQueue = /* @__PURE__ */ new Set([a]) : l.add(a)), Or(t, a, n)), !1;
        }
        throw Error(s(435, l.tag));
      }
      return Or(t, a, n), sc(), !1;
    }
    if (xt)
      return e = Ne.current, e !== null ? ((e.flags & 65536) === 0 && (e.flags |= 256), e.flags |= 65536, e.lanes = n, a !== rs && (t = Error(s(422), { cause: a }), du(tl(t, l)))) : (a !== rs && (e = Error(s(423), {
        cause: a
      }), du(
        tl(e, l)
      )), t = t.current.alternate, t.flags |= 65536, n &= -n, t.lanes |= n, a = tl(a, l), n = Vs(
        t.stateNode,
        a,
        n
      ), ps(t, n), ie !== 4 && (ie = 2)), !1;
    var u = Error(s(520), { cause: a });
    if (u = tl(u, l), ju === null ? ju = [u] : ju.push(u), ie !== 4 && (ie = 2), e === null) return !0;
    a = tl(a, l), l = e;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, t = n & -n, l.lanes |= t, t = Vs(l.stateNode, a, t), ps(l, t), !1;
        case 1:
          if (e = l.type, u = l.stateNode, (l.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (da === null || !da.has(u))))
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
  var Qs = Error(s(461)), de = !1;
  function ge(t, e, l, a) {
    e.child = t === null ? Zf(e, null, l, a) : Xa(
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
      var i = {};
      for (var o in a)
        o !== "ref" && (i[o] = a[o]);
    } else i = a;
    return Ha(e), a = Ms(
      t,
      e,
      l,
      i,
      u,
      n
    ), o = Os(), t !== null && !de ? (zs(t, e, n), Ql(t, e, n)) : (xt && o && Si(e), e.flags |= 1, ge(t, e, a, n), e.child);
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
      )) : (t = bi(
        l.type,
        null,
        a,
        e,
        e.mode,
        n
      ), t.ref = e.ref, t.return = e, e.child = t);
    }
    if (u = t.child, !Is(t, n)) {
      var i = u.memoizedProps;
      if (l = l.compare, l = l !== null ? l : ru, l(i, a) && t.ref === e.ref)
        return Ql(t, e, n);
    }
    return e.flags |= 1, t = Ll(u, a), t.ref = e.ref, t.return = e, e.child = t;
  }
  function Qd(t, e, l, a, n) {
    if (t !== null) {
      var u = t.memoizedProps;
      if (ru(u, a) && t.ref === e.ref)
        if (de = !1, e.pendingProps = a = u, Is(t, n))
          (t.flags & 131072) !== 0 && (de = !0);
        else
          return e.lanes = t.lanes, Ql(t, e, n);
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
        e.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && xi(
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
      u !== null ? (xi(e, u.cachePool), $f(e, u), ca(), e.memoizedState = null) : (t !== null && xi(e, null), _s(), ca());
    return ge(t, e, n, l), e.child;
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
    return u = u === null ? null : { parent: oe._currentValue, pool: u }, e.memoizedState = {
      baseLanes: l,
      cachePool: u
    }, t !== null && xi(e, null), _s(), kf(e), t !== null && Ba(t, e, a, !0), e.childLanes = n, null;
  }
  function Xi(t, e) {
    return e = Vi(
      { mode: e.mode, children: e.children },
      t.mode
    ), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function Jd(t, e, l) {
    return Xa(e, t.child, null, l), t = Xi(e, e.pendingProps), t.flags |= 2, Ze(e), e.memoizedState = null, t;
  }
  function kv(t, e, l) {
    var a = e.pendingProps, n = (e.flags & 128) !== 0;
    if (e.flags &= -129, t === null) {
      if (xt) {
        if (a.mode === "hidden")
          return t = Xi(e, a), e.lanes = 536870912, t.memoizedState = { baseLanes: 0, cachePool: null }, Nu(null, t);
        if (Es(e), (t = Wt) ? (t = ph(
          t,
          al
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: Wl !== null ? { id: Sl, overflow: _l } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = Af(t), l.return = e, e.child = l, be = e, Wt = null)) : t = null, t === null) throw Pl(e);
        return e.lanes = 536870912, null;
      }
      return Xi(e, a);
    }
    var u = t.memoizedState;
    if (u !== null) {
      var i = u.dehydrated;
      if (Es(e), n)
        if (e.flags & 256)
          e.flags &= -257, e = Jd(
            t,
            e,
            l
          );
        else if (e.memoizedState !== null)
          e.child = t.child, e.flags |= 128, e = null;
        else throw Error(s(558));
      else if (de || Ba(t, e, l, !1), n = (l & t.childLanes) !== 0, de || n) {
        if (ua.current === null) {
          if (a = kt, a !== null && (i = Ro(a, l), i !== 0 && i !== u.retryLane))
            throw u.retryLane = i, Ra(t, i), Xe(a, t, i), Qs;
          sc();
        }
        e = Jd(
          t,
          e,
          l
        );
      } else
        t = u.treeContext, Wt = ul(i.nextSibling), be = e, xt = !0, Il = null, al = !1, t !== null && wf(e, t), e = Xi(e, a), e.flags |= 134221824;
      return e;
    }
    return t = Ll(t.child, {
      mode: a.mode,
      children: a.children
    }), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function On(t, e) {
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
    return Ha(e), l = Ms(
      t,
      e,
      l,
      a,
      void 0,
      n
    ), a = Os(), t !== null && !de ? (zs(t, e, n), Ql(t, e, n)) : (xt && a && Si(e), e.flags |= 1, ge(t, e, l, n), e.child);
  }
  function $d(t, e, l, a, n, u) {
    return Ha(e), e.updateQueue = null, l = Wf(
      e,
      a,
      l,
      n
    ), Ff(t), a = Os(), t !== null && !de ? (zs(t, e, u), Ql(t, e, u)) : (xt && a && Si(e), e.flags |= 1, ge(t, e, l, u), e.child);
  }
  function kd(t, e, l, a, n) {
    if (Ha(e), e.stateNode === null) {
      var u = yn, i = l.contextType;
      typeof i == "object" && i !== null && (u = Ee(i)), u = new l(a, u), e.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = Xs, e.stateNode = u, u._reactInternals = e, u = e.stateNode, u.props = a, u.state = e.memoizedState, u.refs = {}, ys(e), i = l.contextType, u.context = typeof i == "object" && i !== null ? Ee(i) : yn, u.state = e.memoizedState, i = l.getDerivedStateFromProps, typeof i == "function" && (Gs(
        e,
        l,
        i,
        a
      ), u.state = e.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (i = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), i !== u.state && Xs.enqueueReplaceState(u, u.state, null), pu(e, a, u, n), bu(), u.state = e.memoizedState), typeof u.componentDidMount == "function" && (e.flags |= 4194308), a = !0;
    } else if (t === null) {
      u = e.stateNode;
      var o = e.memoizedProps, v = Qa(l, o);
      u.props = v;
      var N = u.context, z = l.contextType;
      i = yn, typeof z == "object" && z !== null && (i = Ee(z));
      var U = l.getDerivedStateFromProps;
      z = typeof U == "function" || typeof u.getSnapshotBeforeUpdate == "function", o = e.pendingProps !== o, z || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (o || N !== i) && Ud(
        e,
        u,
        a,
        i
      ), la = !1;
      var _ = e.memoizedState;
      u.state = _, pu(e, a, u, n), bu(), N = e.memoizedState, o || _ !== N || la ? (typeof U == "function" && (Gs(
        e,
        l,
        U,
        a
      ), N = e.memoizedState), (v = la || Dd(
        e,
        l,
        v,
        a,
        _,
        N,
        i
      )) ? (z || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = a, e.memoizedState = N), u.props = a, u.state = N, u.context = i, a = v) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), a = !1);
    } else {
      u = e.stateNode, bs(t, e), i = e.memoizedProps, z = Qa(l, i), u.props = z, U = e.pendingProps, _ = u.context, N = l.contextType, v = yn, typeof N == "object" && N !== null && (v = Ee(N)), o = l.getDerivedStateFromProps, (N = typeof o == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (i !== U || _ !== v) && Ud(
        e,
        u,
        a,
        v
      ), la = !1, _ = e.memoizedState, u.state = _, pu(e, a, u, n), bu();
      var O = e.memoizedState;
      i !== U || _ !== O || la || t !== null && t.dependencies !== null && Ei(t.dependencies) ? (typeof o == "function" && (Gs(
        e,
        l,
        o,
        a
      ), O = e.memoizedState), (z = la || Dd(
        e,
        l,
        z,
        a,
        _,
        O,
        v
      ) || t !== null && t.dependencies !== null && Ei(t.dependencies)) ? (N || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(a, O, v), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        a,
        O,
        v
      )), typeof u.componentDidUpdate == "function" && (e.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && _ === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && _ === t.memoizedState || (e.flags |= 1024), e.memoizedProps = a, e.memoizedState = O), u.props = a, u.state = O, u.context = v, a = z) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && _ === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && _ === t.memoizedState || (e.flags |= 1024), a = !1);
    }
    return u = a, On(t, e), a = (e.flags & 128) !== 0, u || a ? (u = e.stateNode, l = a && typeof l.getDerivedStateFromError != "function" ? null : u.render(), e.flags |= 1, t !== null && a ? (e.child = Xa(
      e,
      t.child,
      null,
      n
    ), e.child = Xa(
      e,
      null,
      l,
      n
    )) : ge(t, e, l, n), e.memoizedState = u.state, t = e.child) : t = Ql(
      t,
      e,
      n
    ), t;
  }
  function Fd(t, e, l, a) {
    return Da(), e.flags |= 256, ge(t, e, l, a), e.child;
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
    return t = t !== null ? t.childLanes & ~l : 0, e && (t |= $e), t;
  }
  function Wd(t, e, l) {
    var a = e.pendingProps, n = !1, u = (e.flags & 128) !== 0, i;
    if ((i = u) || (i = t !== null && t.memoizedState === null ? !1 : (xe.current & 2) !== 0), i && (n = !0, e.flags &= -129), i = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
      if (xt) {
        if (n ? ia(e) : ca(), (t = Wt) ? (t = ph(
          t,
          al
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: Wl !== null ? { id: Sl, overflow: _l } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = Af(t), l.return = e, e.child = l, be = e, Wt = null)) : t = null, t === null) throw Pl(e);
        return Jr(t) ? e.lanes = 32 : e.lanes = 536870912, null;
      }
      return u = a.children, a = a.fallback, n ? (ca(), n = e.mode, u = Vi(
        { mode: "hidden", children: u },
        n
      ), a = wa(
        a,
        n,
        l,
        null
      ), u.return = e, a.return = e, u.sibling = a, e.child = u, a = e.child, a.memoizedState = Js(l), a.childLanes = $s(
        t,
        i,
        l
      ), e.memoizedState = Ks, Nu(null, a)) : (ia(e), ks(e, u));
    }
    var o = t.memoizedState;
    if (o !== null) {
      var v = o.dehydrated;
      if (v !== null)
        return Fv(
          t,
          e,
          u,
          i,
          a,
          v,
          o,
          l
        );
    }
    return n ? (ca(), n = a.fallback, u = e.mode, o = t.child, v = o.sibling, a = Ll(o, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = o.subtreeFlags & 1206910976, v !== null ? n = Ll(v, n) : (n = wa(
      n,
      u,
      l,
      null
    ), n.flags |= 2), n.return = e, a.return = e, a.sibling = n, e.child = a, Nu(null, a), a = e.child, n = t.child.memoizedState, n === null ? n = Js(l) : (u = n.cachePool, u !== null ? (o = oe._currentValue, u = u.parent !== o ? { parent: o, pool: o } : u) : u = Yf(), n = {
      baseLanes: n.baseLanes | l,
      cachePool: u
    }), a.memoizedState = n, a.childLanes = $s(
      t,
      i,
      l
    ), e.memoizedState = Ks, Nu(t.child, a)) : (ia(e), l = t.child, t = l.sibling, l = Ll(l, {
      mode: "visible",
      children: a.children
    }), l.return = e, l.sibling = null, t !== null && (i = e.deletions, i === null ? (e.deletions = [t], e.flags |= 16) : i.push(t)), e.child = l, e.memoizedState = null, l);
  }
  function ks(t, e) {
    return e = Vi(
      { mode: "visible", children: e },
      t.mode
    ), e.return = t, t.child = e;
  }
  function Vi(t, e) {
    return t = Le(22, t, null, e), t.lanes = 0, t;
  }
  function Qi(t, e, l) {
    return Xa(e, t.child, null, l), t = ks(
      e,
      e.pendingProps.children
    ), t.flags |= 2, e.memoizedState = null, t;
  }
  function Fv(t, e, l, a, n, u, i, o) {
    if (l)
      return e.flags & 256 ? (ia(e), e.flags &= -257, Qi(
        t,
        e,
        o
      )) : e.memoizedState !== null ? (ca(), e.child = t.child, e.flags |= 128, null) : (ca(), u = n.fallback, i = e.mode, n = Vi(
        { mode: "visible", children: n.children },
        i
      ), u = wa(
        u,
        i,
        o,
        null
      ), u.flags |= 2, n.return = e, u.return = e, n.sibling = u, e.child = n, Xa(e, t.child, null, o), n = e.child, n.memoizedState = Js(o), n.childLanes = $s(
        t,
        a,
        o
      ), e.memoizedState = Ks, Nu(null, n));
    if (ia(e), Jr(u)) {
      if (a = u.nextSibling && u.nextSibling.dataset, a) var v = a.dgst;
      return a = v, a !== "" && (n = Error(s(419)), n.stack = "", n.digest = a, du({ value: n, source: null, stack: null })), Qi(
        t,
        e,
        o
      );
    }
    if (de || Ba(t, e, o, !1), a = (o & t.childLanes) !== 0, de || a) {
      if (ua.current !== null)
        return Qi(
          t,
          e,
          o
        );
      if (a = kt, a !== null && (n = Ro(
        a,
        o
      ), n !== 0 && n !== i.retryLane))
        throw i.retryLane = n, Ra(t, n), Xe(a, t, n), Qs;
      return Kr(u) || sc(), Qi(
        t,
        e,
        o
      );
    }
    return Kr(u) ? (e.flags |= 192, e.child = t.child, null) : (t = i.treeContext, Wt = ul(u.nextSibling), be = e, xt = !0, Il = null, al = !1, t !== null && wf(e, t), e = ks(
      e,
      n.children
    ), e.flags |= 134221824, e);
  }
  function Id(t, e, l) {
    t.lanes |= e;
    var a = t.alternate;
    a !== null && (a.lanes |= e), Ti(t.return, e, l);
  }
  function Pd(t) {
    for (var e = null; t !== null; ) {
      var l = t.alternate;
      l !== null && ji(l) === null && (e = t), t = t.sibling;
    }
    return e;
  }
  function Zi(t, e, l, a, n, u) {
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
    var i = xe.current;
    if (e.flags & 128)
      return Su(e, i), null;
    var o = (i & 2) !== 0;
    if (o ? (i = i & 1 | 2, e.flags |= 128) : i &= 1, Su(e, i), n === "backwards" && t !== null ? (Fs(t), ge(t, e, a, l), Fs(t)) : ge(t, e, a, l), a = xt ? fu : 0, !o && t !== null && (t.flags & 128) !== 0)
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
        l = Pd(e.child), l === null ? (n = e.child, e.child = null) : (n = l.sibling, l.sibling = null, Fs(e)), Zi(
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
          if (t = n.alternate, t !== null && ji(t) === null) {
            e.child = n;
            break;
          }
          t = n.sibling, n.sibling = l, l = n, n = t;
        }
        Zi(
          e,
          !0,
          l,
          null,
          u,
          a
        );
        break;
      case "together":
        Zi(
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
        l = Pd(e.child), l === null ? (n = e.child, e.child = null) : (n = l.sibling, l.sibling = null), Zi(
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
    return ta(e, e.type, a.value), ge(t, e, a.children, l), e.child;
  }
  function Ql(t, e, l) {
    if (t !== null && (e.dependencies = t.dependencies), fa |= e.lanes, (l & e.childLanes) === 0)
      if (t !== null) {
        if (Ba(
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
      for (t = e.child, l = Ll(t, t.pendingProps), e.child = l, l.return = e; t.sibling !== null; )
        t = t.sibling, l = l.sibling = Ll(t, t.pendingProps), l.return = e;
      l.sibling = null;
    }
    return e.child;
  }
  function Is(t, e) {
    return (t.lanes & e) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Ei(t)));
  }
  function Wv(t, e, l) {
    switch (e.tag) {
      case 3:
        te(e, e.stateNode.containerInfo), ta(e, oe, t.memoizedState.cache), Da();
        break;
      case 27:
      case 5:
        cl(e);
        break;
      case 4:
        te(e, e.stateNode.containerInfo);
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
          return e.flags |= 128, Es(e), null;
        break;
      case 13:
        var a = e.memoizedState;
        if (a !== null) {
          if (a.dehydrated !== null)
            return ia(e), e.flags |= 128, null;
          a = Ba(
            t,
            e,
            l,
            !1
          );
          var n = e.child.childLanes;
          return a || (l & n) !== 0 ? Wd(t, e, l) : (ia(e), t = Ql(
            t,
            e,
            l
          ), t !== null ? t.sibling : null);
        }
        ia(e);
        break;
      case 19:
        if (e.flags & 128)
          return Ws(
            t,
            e,
            l
          );
        if (n = (t.flags & 128) !== 0, a = (l & e.childLanes) !== 0, a || (Ba(
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
        ta(e, oe, t.memoizedState.cache);
    }
    return Ql(t, e, l);
  }
  function em(t, e, l) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps)
        de = !0;
      else {
        if (!Is(t, l) && (e.flags & 128) === 0)
          return de = !1, Wv(
            t,
            e,
            l
          );
        de = (t.flags & 131072) !== 0;
      }
    else
      de = !1, xt && (e.flags & 1048576) !== 0 && Rf(e, fu, e.index);
    switch (e.lanes = 0, e.tag) {
      case 16:
        t: {
          var a = e.pendingProps;
          if (t = qa(e.elementType), e.type = t, typeof t == "function")
            us(t) ? (a = Qa(t, a), e.tag = 1, e = kd(
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
              } else if (n === $) {
                e.tag = 14, e = Vd(
                  null,
                  e,
                  t,
                  a,
                  l
                );
                break t;
              } else if (n === bt) {
                e.tag = 10, e.type = t, e = tm(
                  null,
                  e,
                  l
                );
                break t;
              }
            }
            throw e = gt(t) || t, Error(s(306, e, ""));
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
        return a = e.type, n = Qa(
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
          if (te(
            e,
            e.stateNode.containerInfo
          ), t === null) throw Error(s(387));
          a = e.pendingProps;
          var u = e.memoizedState;
          n = u.element, bs(t, e), pu(e, a, null, l);
          var i = e.memoizedState;
          if (a = i.cache, ta(e, oe, a), a !== u.cache && ds(
            e,
            [oe],
            l,
            !0
          ), bu(), a = i.element, u.isDehydrated)
            if (u = {
              element: a,
              isDehydrated: !1,
              cache: i.cache
            }, e.updateQueue.baseState = u, e.memoizedState = u, e.flags & 256) {
              e = Fd(
                t,
                e,
                a,
                l
              );
              break t;
            } else if (a !== n) {
              n = tl(
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
              for (t = e.stateNode.containerInfo, t.nodeType === 9 ? t = t.body : t = t.nodeName === "HTML" ? t.ownerDocument.body : t, Wt = ul(t.firstChild), be = e, xt = !0, Il = null, al = !0, l = Zf(
                e,
                null,
                a,
                l
              ), e.child = l; l; )
                l.flags = l.flags & -3 | 134221824, l = l.sibling;
          else {
            if (Da(), a === n) {
              e = Ql(
                t,
                e,
                l
              );
              break t;
            }
            ge(t, e, a, l);
          }
          e = e.child;
        }
        return e;
      case 26:
        return On(t, e), t === null ? (l = Mh(
          e.type,
          null,
          e.pendingProps,
          null
        )) ? e.memoizedState = l : xt || (e.stateNode = uh(
          e.type,
          e.pendingProps,
          yt.current,
          e
        )) : e.memoizedState = Mh(
          e.type,
          t.memoizedProps,
          e.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return cl(e), t === null && xt && (a = e.stateNode = Th(
          e.type,
          e.pendingProps,
          yt.current
        ), be = e, al = !0, n = Wt, va(e.type) ? ($r = n, Wt = ul(a.firstChild)) : Wt = n), ge(
          t,
          e,
          e.pendingProps.children,
          l
        ), On(t, e), t === null && (e.flags |= 4194304), e.child;
      case 5:
        return t === null && xt && ((n = a = Wt) && (a = Zg(
          a,
          e.type,
          e.pendingProps,
          al
        ), a !== null ? (e.stateNode = a, be = e, Wt = ul(a.firstChild), al = !1, n = !0) : n = !1), n || Pl(e)), cl(e), n = e.type, u = e.pendingProps, i = t !== null ? t.memoizedProps : null, a = u.children, Yr(n, u) ? a = null : i !== null && Yr(n, i) && (e.flags |= 32), e.memoizedState !== null && (n = Ms(
          t,
          e,
          qv,
          null,
          null,
          l
        ), Zn._currentValue = n), On(t, e), ge(t, e, a, l), e.child;
      case 6:
        return t === null && xt && ((t = l = Wt) && (l = Kg(
          l,
          e.pendingProps,
          al
        ), l !== null ? (e.stateNode = l, be = e, Wt = null, t = !0) : t = !1), t || Pl(e)), null;
      case 13:
        return Wd(t, e, l);
      case 4:
        return te(
          e,
          e.stateNode.containerInfo
        ), a = e.pendingProps, t === null ? e.child = Xa(
          e,
          null,
          a,
          l
        ) : ge(t, e, a, l), e.child;
      case 11:
        return Xd(
          t,
          e,
          e.type,
          e.pendingProps,
          l
        );
      case 7:
        return a = e.pendingProps, On(t, e), ge(t, e, a, l), e.child;
      case 8:
        return ge(
          t,
          e,
          e.pendingProps.children,
          l
        ), e.child;
      case 12:
        return ge(
          t,
          e,
          e.pendingProps.children,
          l
        ), e.child;
      case 10:
        return tm(t, e, l);
      case 9:
        return n = e.type._context, a = e.pendingProps.children, Ha(e), n = Ee(n), a = a(n), e.flags |= 1, ge(t, e, a, l), e.child;
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
        return kv(t, e, l);
      case 22:
        return Zd(
          t,
          e,
          l,
          e.pendingProps
        );
      case 24:
        return Ha(e), a = Ee(oe), t === null ? (n = vs(), n === null && (n = kt, u = ms(), n.pooledCache = u, u.refCount++, u !== null && (n.pooledCacheLanes |= l), n = u), e.memoizedState = { parent: a, cache: n }, ys(e), ta(e, oe, n)) : ((t.lanes & l) !== 0 && (bs(t, e), pu(e, null, null, l), bu()), n = t.memoizedState, u = e.memoizedState, n.parent !== a ? (n = { parent: a, cache: a }, e.memoizedState = n, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = n), ta(e, oe, a)) : (a = u.cache, ta(e, oe, a), a !== n.cache && ds(
          e,
          [oe],
          l,
          !0
        ))), ge(
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
        }), a = e.pendingProps, a.name != null && a.name !== "auto" ? e.flags |= t === null ? 18882560 : 18874368 : xt && Si(e), t !== null && t.memoizedProps.name !== a.name ? e.flags |= 4194816 : On(t, e), ge(t, e, a.children, l), e.child;
      case 29:
        throw e.pendingProps;
    }
    throw Error(s(156, e.tag));
  }
  function Zl(t) {
    t.flags |= 4;
  }
  function Ps(t, e, l, a, n) {
    var u;
    if ((u = (t.mode & 32) !== 0) && (u = l === null ? Ah(e, a) : Ah(e, a) && (a.src !== l.src || a.srcSet !== l.srcSet)), u) {
      if (t.flags |= 16777216, (n & 335544128) === n)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (Bm()) t.flags |= 8192;
        else
          throw Ga = Oi, gs;
    } else t.flags &= -16777217;
  }
  function lm(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !jh(e))
      if (Bm()) t.flags |= 8192;
      else
        throw Ga = Oi, gs;
  }
  function Ki(t, e) {
    e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? Co() : 536870912, t.lanes |= e, Rn |= e);
  }
  function xu(t, e) {
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
        return l = e.stateNode, a = null, t !== null && (a = t.memoizedState.cache), e.memoizedState.cache !== a && (e.flags |= 2048), Gl(oe), Bt(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (t === null || t.child === null) && (Sn(e) ? Zl(e) : t === null || t.memoizedState.isDehydrated && (e.flags & 256) === 0 || (e.flags |= 1024, os())), It(e), null;
      case 26:
        var n = e.type, u = e.memoizedState;
        return t === null ? (Zl(e), u !== null ? (It(e), lm(e, u)) : (It(e), Ps(
          e,
          n,
          null,
          a,
          l
        ))) : u ? u !== t.memoizedState ? (Zl(e), It(e), lm(e, u)) : (It(e), e.flags &= -16777217) : (t = t.memoizedProps, t !== a && Zl(e), It(e), Ps(
          e,
          n,
          t,
          a,
          l
        )), null;
      case 27:
        if (yl(e), l = yt.current, n = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== a && Zl(e);
        else {
          if (!a) {
            if (e.stateNode === null)
              throw Error(s(166));
            return It(e), e.subtreeFlags &= -33554433, null;
          }
          t = X.current, Sn(e) ? Df(e) : (t = Th(n, a, l), e.stateNode = t, Zl(e));
        }
        return It(e), e.subtreeFlags &= -33554433, null;
      case 5:
        if (yl(e), n = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== a && Zl(e);
        else {
          if (!a) {
            if (e.stateNode === null)
              throw Error(s(166));
            return It(e), e.subtreeFlags &= -33554433, null;
          }
          if (u = X.current, Sn(e))
            Df(e);
          else {
            var i = Bu(
              yt.current
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
            u[Te] = e, u[He] = a;
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
            a && Zl(e);
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
          t.memoizedProps !== a && Zl(e);
        else {
          if (typeof a != "string" && e.stateNode === null)
            throw Error(s(166));
          if (t = yt.current, Sn(e)) {
            if (t = e.stateNode, l = e.memoizedProps, a = null, n = be, n !== null)
              switch (n.tag) {
                case 27:
                case 5:
                  a = n.memoizedProps;
              }
            t[Te] = e, t = !!(t.nodeValue === l || a !== null && a.suppressHydrationWarning === !0 || eh(t.nodeValue, l)), t || Pl(e, !0);
          } else
            t = Bu(t).createTextNode(
              a
            ), t[Te] = e, e.stateNode = t;
        }
        return It(e), null;
      case 31:
        if (l = e.memoizedState, t === null || t.memoizedState !== null) {
          if (a = Sn(e), l !== null) {
            if (t === null) {
              if (!a) throw Error(s(318));
              if (t = e.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(557));
              t[Te] = e;
            } else
              Da(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            It(e), t = !1;
          } else
            l = os(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = l), t = !0;
          if (!t)
            return e.flags & 256 ? (Ze(e), e) : (Ze(e), null);
          if ((e.flags & 128) !== 0)
            throw Error(s(558));
        }
        return It(e), null;
      case 13:
        if (a = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (n = Sn(e), a !== null && a.dehydrated !== null) {
            if (t === null) {
              if (!n) throw Error(s(318));
              if (n = e.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(s(317));
              n[Te] = e;
            } else
              Da(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            It(e), n = !1;
          } else
            n = os(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return e.flags & 256 ? (Ze(e), e) : (Ze(e), null);
        }
        return Ze(e), (e.flags & 128) !== 0 ? (e.lanes = l, e) : (l = a !== null, t = t !== null && t.memoizedState !== null, l && (a = e.child, n = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (n = a.alternate.memoizedState.cachePool.pool), u = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (u = a.memoizedState.cachePool.pool), u !== n && (a.flags |= 2048)), l !== t && l && (e.child.flags |= 8192), Ki(e, e.updateQueue), It(e), null);
      case 4:
        return Bt(), t === null && Dr(e.stateNode.containerInfo), e.flags |= 67108864, It(e), null;
      case 10:
        return Gl(e.type), It(e), null;
      case 19:
        if (Ns(e), a = e.memoizedState, a === null) return It(e), null;
        if (n = (e.flags & 128) !== 0, u = a.rendering, u === null)
          if (n) xu(a, !1);
          else {
            if (ie !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = e.child; t !== null; ) {
                if (u = ji(t), u !== null) {
                  for (e.flags |= 128, xu(a, !1), t = u.updateQueue, e.updateQueue = t, Ki(e, t), e.subtreeFlags = 0, t = l, l = e.child; l !== null; )
                    Cf(l, t), l = l.sibling;
                  return Su(
                    e,
                    xe.current & 1 | 2
                  ), xt && Yl(e, a.treeForkCount), e.child;
                }
                t = t.sibling;
              }
            a.tail !== null && Kt() > nc && (e.flags |= 128, n = !0, xu(a, !1), e.lanes = 4194304);
          }
        else {
          if (!n)
            if (t = ji(u), t !== null) {
              if (e.flags |= 128, n = !0, t = t.updateQueue, e.updateQueue = t, Ki(e, t), xu(a, !0), a.tail === null && a.tailMode !== "collapsed" && a.tailMode !== "visible" && !u.alternate && !xt)
                return It(e), null;
            } else
              2 * Kt() - a.renderingStartTime > nc && l !== 536870912 && (e.flags |= 128, n = !0, xu(a, !1), e.lanes = 4194304);
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
          return a.rendering = t, a.tail = t.sibling, a.renderingStartTime = Kt(), t.sibling = null, u = xe.current, u = n ? u & 1 | 2 : u & 1, a.tailMode === "visible" || a.tailMode === "collapsed" || !l || xt ? Su(e, u) : (l = u, ft(Ne, e), ft(xe, l), Ae === null && (Ae = e)), xt && Yl(e, a.treeForkCount), t;
        }
        return It(e), null;
      case 22:
      case 23:
        return Ze(e), Ts(), a = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== a && (e.flags |= 8192) : a && (e.flags |= 8192), a ? (l & 536870912) !== 0 && (e.flags & 128) === 0 && (It(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : It(e), l = e.updateQueue, l !== null && Ki(e, l.retryQueue), l = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), a = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), a !== l && (e.flags |= 2048), t !== null && jt(Ya), null;
      case 24:
        return l = null, t !== null && (l = t.memoizedState.cache), e.memoizedState.cache !== l && (e.flags |= 2048), Gl(oe), It(e), null;
      case 25:
        return null;
      case 30:
        return e.flags |= 33554432, It(e), null;
    }
    throw Error(s(156, e.tag));
  }
  function Pv(t, e) {
    switch (ss(e), e.tag) {
      case 1:
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 3:
        return Gl(oe), Bt(), t = e.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (e.flags = t & -65537 | 128, e) : null;
      case 26:
      case 27:
      case 5:
        return yl(e), null;
      case 31:
        if (e.memoizedState !== null) {
          if (Ze(e), e.alternate === null)
            throw Error(s(340));
          Da();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 13:
        if (Ze(e), t = e.memoizedState, t !== null && t.dehydrated !== null) {
          if (e.alternate === null)
            throw Error(s(340));
          Da();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 19:
        return Ns(e), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, t = e.memoizedState, t !== null && (t.rendering = null, t.tail = null), e.flags |= 4, e) : null;
      case 4:
        return Bt(), null;
      case 10:
        return Gl(e.type), null;
      case 22:
      case 23:
        return Ze(e), Ts(), t !== null && jt(Ya), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 24:
        return Gl(oe), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function am(t, e) {
    switch (ss(e), e.tag) {
      case 3:
        Gl(oe), Bt();
        break;
      case 26:
      case 27:
      case 5:
        yl(e);
        break;
      case 4:
        Bt();
        break;
      case 31:
        e.memoizedState !== null && Ze(e);
        break;
      case 13:
        Ze(e);
        break;
      case 19:
        Ns(e);
        break;
      case 10:
        Gl(e.type);
        break;
      case 22:
      case 23:
        Ze(e), Ts(), t !== null && jt(Ya);
        break;
      case 24:
        Gl(oe);
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
            var u = l.create, i = l.inst;
            a = u(), i.destroy = a;
          }
          l = l.next;
        } while (l !== n);
      }
    } catch (o) {
      Vt(e, e.return, o);
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
              var v = l, N = o;
              try {
                N();
              } catch (z) {
                Vt(
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
      Vt(e, e.return, z);
    }
  }
  function nm(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var l = t.stateNode;
      try {
        Jf(e, l);
      } catch (a) {
        Vt(t, t.return, a);
      }
    }
  }
  function um(t, e, l) {
    l.props = Qa(
      t.type,
      t.memoizedProps
    ), l.state = t.memoizedState;
    try {
      l.componentWillUnmount();
    } catch (a) {
      Vt(t, e, a);
    }
  }
  function Tl(t, e) {
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
            var n = t.stateNode, u = Bl(t.memoizedProps, n);
            (n.ref === null || n.ref.name !== u) && (n.ref = dh(u)), a = n.ref;
            break;
          case 7:
            if (t.stateNode === null) {
              var i = new Fe(t);
              h(
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
      Vt(t, e, o);
    }
  }
  function Me(t, e) {
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
  function Ji(t, e) {
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
    for (var e = t.return; e !== null && (er(e) && Qg(t.stateNode, e.stateNode), !tr(e)); )
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
      Vt(t, t.return, n);
    }
  }
  function ar(t, e, l) {
    try {
      var a = t.stateNode;
      xg(a, t.type, l, e), a[He] = e;
    } catch (n) {
      Vt(t, t.return, n);
    }
  }
  function cm(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && va(t.type) || t.tag === 4;
  }
  function nr(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || cm(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && va(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function ur(t, e, l, a) {
    var n = t.tag;
    if (n === 5 || n === 6)
      n = t.stateNode, e ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(n, e) : (e = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, e.appendChild(n), l = l._reactRootContainer, l != null || e.onclick !== null || (e.onclick = pl)), Ji(t, a), Lt = !0;
    else if (n !== 4 && (n === 27 && (Ji(t, a), a = null, va(t.type) && (l = t.stateNode, e = null)), t = t.child, t !== null))
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
  function $i(t, e, l, a) {
    var n = t.tag;
    if (n === 5 || n === 6)
      n = t.stateNode, e ? l.insertBefore(n, e) : l.appendChild(n), Ji(t, a), Lt = !0;
    else if (n !== 4 && (n === 27 && (Ji(t, a), a = null, va(t.type) && (l = t.stateNode)), t = t.child, t !== null))
      for ($i(
        t,
        e,
        l,
        a
      ), t = t.sibling; t !== null; )
        $i(
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
      Oe(e, a, l), e[Te] = t, e[He] = l;
    } catch (u) {
      Vt(t, t.return, u);
    }
  }
  var ki = !1, Ke = null;
  function rm(t) {
    (t.tag === 30 || (t.subtreeFlags & 33554432) !== 0) && (ki = !0);
  }
  var El = null;
  function om() {
    var t = El;
    return El = null, t;
  }
  var Ye = 0;
  function zn(t, e, l, a, n) {
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
        var i = t.stateNode;
        if (a !== null) {
          var o = Xr(i);
          a.push(o), o.view && (u = !0);
        } else
          u || Xr(i).view && (u = !0);
        ki = !0, oh(
          i,
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
  function Nl(t, e) {
    for (; t !== null; )
      t.tag === 5 ? fh(t.stateNode, t.memoizedProps) : (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && e || Nl(
        t.child,
        e
      )), t = t.sibling;
  }
  function Fi(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if ((t.tag !== 22 || t.memoizedState === null) && (Fi(t), t.tag === 30 && (t.flags & 18874368) !== 0 && t.stateNode.paired)) {
          var e = t.memoizedProps;
          if (e.name == null || e.name === "auto")
            throw Error(s(544));
          var l = e.name;
          e = Hl(e.default, e.share), e !== "none" && (zn(
            t,
            l,
            e,
            null,
            !1
          ) || Nl(t.child, !1));
        }
        t = t.sibling;
      }
  }
  function ir(t, e) {
    if (t.tag === 30) {
      var l = t.stateNode, a = t.memoizedProps, n = Bl(a, l), u = Hl(
        a.default,
        l.paired ? a.share : a.enter
      );
      u !== "none" ? zn(t, n, u, null, !1) ? (Fi(t), l.paired || e || Bn(t, a.onEnter)) : Nl(t.child, !1) : Fi(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        ir(t, e), t = t.sibling;
    else Fi(t);
  }
  function cr(t) {
    if (Ke !== null && Ke.size !== 0) {
      var e = Ke;
      if ((t.subtreeFlags & 18874368) !== 0)
        for (t = t.child; t !== null; ) {
          if (t.tag !== 22 || t.memoizedState === null) {
            if (t.tag === 30 && (t.flags & 18874368) !== 0) {
              var l = t.memoizedProps, a = l.name;
              if (a != null && a !== "auto") {
                var n = e.get(a);
                if (n !== void 0) {
                  var u = Hl(
                    l.default,
                    l.share
                  );
                  if (u !== "none" && (zn(
                    t,
                    a,
                    u,
                    null,
                    !1
                  ) ? (u = t.stateNode, n.paired = u, u.paired = n, Bn(t, l.onShare)) : Nl(t.child, !1)), e.delete(a), e.size === 0) break;
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
      var e = t.memoizedProps, l = Bl(e, t.stateNode), a = Ke !== null ? Ke.get(l) : void 0, n = Hl(
        e.default,
        a !== void 0 ? e.share : e.exit
      );
      n !== "none" && (zn(t, l, n, null, !1) ? a !== void 0 ? (n = t.stateNode, a.paired = n, n.paired = a, Ke.delete(l), Bn(t, e.onShare)) : Bn(t, e.onExit) : Nl(t.child, !1)), Ke !== null && cr(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        sr(t), t = t.sibling;
    else
      Ke !== null && cr(t);
  }
  function dm(t) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var e = t.memoizedProps, l = Bl(e, t.stateNode);
        e = Hl(e.default, e.update), t.flags &= -5, e !== "none" && zn(
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
            e.paired !== null && (e.paired = null, Nl(t.child, !1));
          }
          rr(t);
        }
        t = t.sibling;
      }
  }
  function Wi(t) {
    if (t.tag === 30)
      t.stateNode.paired = null, Nl(t.child, !1), rr(t);
    else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        Wi(t), t = t.sibling;
    else rr(t);
  }
  function mm(t) {
    for (t = t.child; t !== null; )
      t.tag === 30 ? Nl(t.child, !1) : (t.subtreeFlags & 33554432) !== 0 && mm(t), t = t.sibling;
  }
  function or(t, e, l, a, n, u, i) {
    for (var o = !1; e !== null; ) {
      if (e.tag === 5) {
        var v = e.stateNode;
        if (u !== null && Ye < u.length) {
          var N = u[Ye], z = Xr(v);
          (N.view || z.view) && (o = !0);
          var U;
          if (U = (t.flags & 4) === 0)
            if (z.clip) U = !0;
            else {
              U = N.rect;
              var _ = z.rect;
              U = U.y !== _.y || U.x !== _.x || U.height !== _.height || U.width !== _.width;
            }
          U && (t.flags |= 4), z.abs ? z = !N.abs : (N = N.rect, z = z.rect, z = N.height !== z.height || N.width !== z.width), z && (t.flags |= 32);
        } else t.flags |= 32;
        (t.flags & 4) !== 0 && oh(
          v,
          Ye === 0 ? l : l + "_" + Ye,
          n
        ), o && (t.flags & 4) !== 0 || (El === null && (El = []), El.push(
          v,
          Ye === 0 ? a : a + "_" + Ye,
          e.memoizedProps
        )), Ye++;
      } else (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && i ? t.flags |= e.flags & 32 : or(
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
  function hm(t, e) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var l = t.memoizedProps, a = t.stateNode, n = Bl(l, a), u = Hl(l.default, l.update), i;
        i = t.memoizedState, t.memoizedState = null, a = t;
        var o = t.child;
        Ye = 0, n = or(
          a,
          o,
          n,
          n,
          u,
          i,
          !1
        ), (t.flags & 4) !== 0 && n && Bn(t, l.onUpdate);
      } else
        (t.subtreeFlags & 33554432) !== 0 && hm(t);
      t = t.sibling;
    }
  }
  var pe = !1, Gt = !1, xl = !1, fr = !1, vm = typeof WeakSet == "function" ? WeakSet : Set, Se = null, Ml = !1, zu = !1, Ii = !1, dr = !1;
  function tg(t, e, l) {
    if (t = t.containerInfo, Hr = Kn, t = pf(t), Ic(t)) {
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
            var o = 0, v = -1, N = -1, z = 0, U = 0, _ = t, O = null;
            e: for (; ; ) {
              for (var Q; _ !== a || u !== 0 && _.nodeType !== 3 || (v = o + u), _ !== i || n !== 0 && _.nodeType !== 3 || (N = o + n), _.nodeType === 3 && (o += _.nodeValue.length), (Q = _.firstChild) !== null; )
                O = _, _ = Q;
              for (; ; ) {
                if (_ === t) break e;
                if (O === a && ++z === u && (v = o), O === i && ++U === n && (N = o), (Q = _.nextSibling) !== null) break;
                _ = O, O = _.parentNode;
              }
              _ = Q;
            }
            a = v === -1 || N === -1 ? null : { start: v, end: N };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (Lr = { focusedElem: t, selectionRange: a }, Kn = !1, l = (l & 335544064) === l, Se = e, e = l ? 9270 : 1024; Se !== null; ) {
      if (t = Se, l && (a = t.deletions, a !== null))
        for (u = 0; u < a.length; u++)
          l && sr(a[u]);
      if (t.alternate === null && (t.flags & 2) !== 0)
        l && rm(t), Pi(l);
      else {
        if (t.tag === 22) {
          if (a = t.alternate, t.memoizedState !== null) {
            a !== null && a.memoizedState === null && l && sr(a), Pi(l);
            continue;
          } else if (a !== null && a.memoizedState !== null) {
            l && rm(t), Pi(l);
            continue;
          }
        }
        a = t.child, (t.subtreeFlags & e) !== 0 && a !== null ? (a.return = t, Se = a) : (l && dm(t), Pi(l));
      }
    }
    Ke = null;
  }
  function Pi(t) {
    for (; Se !== null; ) {
      var e = Se, l = t, a = e.alternate, n = e.flags;
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
              var i = Qa(
                e.type,
                n
              );
              l = u.getSnapshotBeforeUpdate(
                i,
                a
              ), u.__reactInternalSnapshotBeforeUpdate = l;
            } catch (o) {
              Vt(e, e.return, o);
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
          l && a !== null && (l = Bl(
            a.memoizedProps,
            a.stateNode
          ), n = e.memoizedProps, n = Hl(n.default, n.update), n !== "none" && zn(
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
        a.return = e.return, Se = a;
        break;
      }
      Se = e.return;
    }
  }
  function gm(t, e, l) {
    var a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Ol(t, l), a & 4 && Mu(5, l);
        break;
      case 1:
        if (Ol(t, l), a & 4)
          if (t = l.stateNode, e === null)
            try {
              t.componentDidMount();
            } catch (i) {
              Vt(l, l.return, i);
            }
          else {
            var n = Qa(
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
        a & 64 && nm(l), a & 512 && Tl(l, l.return);
        break;
      case 3:
        if (Ol(t, l), a & 64 && (t = l.updateQueue, t !== null)) {
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
          } catch (i) {
            Vt(l, l.return, i);
          }
        }
        break;
      case 27:
        e === null && a & 4 && sm(l);
      case 26:
      case 5:
        Ol(t, l), e === null && a & 4 && lr(l), a & 512 && Tl(l, l.return);
        break;
      case 12:
        Ol(t, l);
        break;
      case 31:
        Ol(t, l), a & 4 && Sm(t, l);
        break;
      case 13:
        Ol(t, l), a & 4 && _m(t, l), a & 64 && (t = l.memoizedState, t !== null && (t = t.dehydrated, t !== null && (l = dg.bind(
          null,
          l
        ), Jg(t, l))));
        break;
      case 22:
        if (a = l.memoizedState !== null || pe, !a) {
          var u = e !== null && e.memoizedState !== null || Gt;
          e = pe, n = Gt, pe = a, (Gt = u) && !n ? (a = 2, (l.subtreeFlags & 8772) !== 0 && (a |= 1), fl(
            t,
            l,
            a
          )) : Ol(t, l), pe = e, Gt = n;
        }
        break;
      case 30:
        Ol(t, l), a & 512 && Tl(l, l.return);
        break;
      case 7:
        a & 512 && Tl(l, l.return);
      default:
        Ol(t, l);
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
            var n = t.stateNode, u = t.memoizedProps.style, i = u != null && u.hasOwnProperty("display") ? u.display : null;
            n.style.display = i == null || typeof i == "boolean" ? "" : ("" + i).trim();
          }
        } catch (v) {
          Vt(t, t.return, v);
        }
        hr(t, e);
        break;
      case 6:
        try {
          t.stateNode.nodeValue = e ? "" : t.memoizedProps, Lt = !0;
        } catch (v) {
          Vt(t, t.return, v);
        }
        break;
      case 18:
        try {
          var o = t.stateNode;
          e ? rh(o, !0) : rh(t.stateNode, !1);
        } catch (v) {
          Vt(t, t.return, v);
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
    e !== null && (t.alternate = null, bm(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && ni(e)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var ee = null, qe = !1;
  function rl(t, e, l) {
    for (l = l.child; l !== null; )
      pm(t, e, l), l = l.sibling;
  }
  function pm(t, e, l) {
    if (Rt && typeof Rt.onCommitFiberUnmount == "function")
      try {
        Rt.onCommitFiberUnmount(W, l);
      } catch {
      }
    switch (l.tag) {
      case 26:
        Gt || Me(l, e), rl(
          t,
          e,
          l
        ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && !Gt && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        Gt || Me(l, e), Ou(l);
        var a = ee, n = qe;
        va(l.type) && (ee = l.stateNode, qe = !1), rl(
          t,
          e,
          l
        ), Eh(
          l.stateNode,
          l.type,
          l.memoizedProps
        ), ee = a, qe = n;
        break;
      case 5:
        Gt || Me(l, e), Ou(l);
      case 6:
        if (l.tag === 6 && Ou(l), a = ee, n = qe, ee = null, rl(
          t,
          e,
          l
        ), ee = a, qe = n, ee !== null)
          if (qe)
            try {
              (ee.nodeType === 9 ? ee.body : ee.nodeName === "HTML" ? ee.ownerDocument.body : ee).removeChild(l.stateNode), Lt = !0;
            } catch (u) {
              Vt(
                l,
                e,
                u
              );
            }
          else
            try {
              ee.removeChild(l.stateNode), Lt = !0;
            } catch (u) {
              Vt(
                l,
                e,
                u
              );
            }
        break;
      case 18:
        ee !== null && (qe ? (t = ee, sh(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          l.stateNode
        ), Jn(t)) : sh(ee, l.stateNode));
        break;
      case 4:
        a = ee, n = qe, ee = l.stateNode.containerInfo, qe = !0, rl(
          t,
          e,
          l
        ), ee = a, qe = n;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        sa(2, l, e), Gt || sa(4, l, e), rl(
          t,
          e,
          l
        );
        break;
      case 1:
        Gt || (Me(l, e), a = l.stateNode, typeof a.componentWillUnmount == "function" && um(
          l,
          e,
          a
        )), rl(
          t,
          e,
          l
        );
        break;
      case 21:
        rl(
          t,
          e,
          l
        );
        break;
      case 22:
        Gt = (a = Gt) || l.memoizedState !== null, rl(
          t,
          e,
          l
        ), Gt = a;
        break;
      case 30:
        Me(l, e), rl(
          t,
          e,
          l
        );
        break;
      case 7:
        Gt || Me(l, e), rl(
          t,
          e,
          l
        );
        break;
      default:
        rl(
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
        Jn(t);
      } catch (l) {
        Vt(e, e.return, l);
      }
    }
  }
  function _m(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        Jn(t);
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
        return e === null && (e = t.stateNode = new vm()), e;
      case 22:
        return t = t.stateNode, e = t._retryCache, e === null && (e = t._retryCache = new vm()), e;
      default:
        throw Error(s(435, t.tag));
    }
  }
  function tc(t, e) {
    var l = eg(t);
    e.forEach(function(a) {
      if (!l.has(a)) {
        l.add(a);
        var n = mg.bind(null, t, a);
        a.then(n, n);
      }
    });
  }
  function De(t, e, l) {
    var a = e.deletions;
    if (a !== null)
      for (var n = 0; n < a.length; n++) {
        var u = a[n], i = t, o = e, v = o;
        t: for (; v !== null; ) {
          switch (v.tag) {
            case 27:
              if (va(v.type)) {
                ee = v.stateNode, qe = !1;
                break t;
              }
              break;
            case 5:
              ee = v.stateNode, qe = !1;
              break t;
            case 3:
            case 4:
              ee = v.stateNode.containerInfo, qe = !0;
              break t;
          }
          v = v.return;
        }
        if (ee === null) throw Error(s(160));
        pm(i, o, u), ee = null, qe = !1, i = u.alternate, i !== null && (i.return = null), u.return = null;
      }
    if (e.subtreeFlags & 13886)
      for (e = e.child; e !== null; )
        Tm(e, t, l), e = e.sibling;
  }
  var ol = null;
  function Tm(t, e, l) {
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
        De(e, t, l), Ue(t), n & 4 && (sa(3, t, t.return), Mu(3, t), sa(5, t, t.return));
        break;
      case 1:
        De(e, t, l), Ue(t), n & 512 && (Gt || a === null || Me(a, a.return)), n & 64 && pe && (t = t.updateQueue, t !== null && (e = t.callbacks, e !== null && (l = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = l === null ? e : l.concat(e))));
        break;
      case 26:
        if (u = ol, De(e, t, l), Ue(t), n & 512 && (Gt || a === null || Me(a, a.return)), n & 4)
          if (n = a !== null ? a.memoizedState : null, l = t.memoizedState, a === null)
            if (l === null)
              if (t.stateNode === null)
                if (pe)
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
                        a = n.getElementsByTagName("title")[0], (!a || a[tu] || a[Te] || a.namespaceURI === "http://www.w3.org/2000/svg" || a.hasAttribute("itemprop")) && (a = n.createElement(e), n.head.insertBefore(
                          a,
                          n.querySelector("head > title")
                        )), Oe(a, e, l), a[Te] = t, ye(a), e = a;
                        break t;
                      case "link":
                        if (u = Ch(
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
                        a = n.createElement(e), Oe(a, e, l), n.head.appendChild(a);
                        break;
                      case "meta":
                        if (u = Ch(
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
                        a = n.createElement(e), Oe(a, e, l), n.head.appendChild(a);
                        break;
                      default:
                        throw Error(s(468, e));
                    }
                    a[Te] = t, ye(a), e = a;
                  }
                  t.stateNode = e;
                }
              else
                pe || Ir(u, t.type, t.stateNode);
            else
              t.stateNode = zh(
                u,
                l,
                t.memoizedProps
              );
          else
            n !== l ? (n === null ? (e = a.stateNode, e === null || Gt || e.parentNode.removeChild(e)) : n.count--, l === null ? pe || Ir(u, t.type, t.stateNode) : zh(u, l, t.memoizedProps)) : l === null && t.stateNode !== null && ar(
              t,
              t.memoizedProps,
              a.memoizedProps
            );
        break;
      case 27:
        De(e, t, l), Ue(t), n & 512 && (Gt || a === null || Me(a, a.return)), a !== null && n & 4 && ar(
          t,
          t.memoizedProps,
          a.memoizedProps
        );
        break;
      case 5:
        if (u = xl, xl = !1, De(e, t, l), xl = u, Ue(t), n & 512 && (Gt || a === null || Me(a, a.return)), t.flags & 32) {
          e = t.stateNode;
          try {
            on(e, ""), Lt = !0;
          } catch (z) {
            Vt(t, t.return, z);
          }
        }
        n & 4 && t.stateNode != null && (e = t.memoizedProps, ar(
          t,
          e,
          a !== null ? a.memoizedProps : e
        )), n & 1024 && (fr = !0);
        break;
      case 6:
        if (De(e, t, l), Ue(t), n & 4) {
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
        if (Lt = !1, vc = null, u = ol, ol = Hu(e.containerInfo), De(e, t, l), ol = u, Ue(t), n & 4 && a !== null && a.memoizedState.isDehydrated)
          try {
            Jn(e.containerInfo);
          } catch (z) {
            Vt(t, t.return, z);
          }
        fr && (fr = !1, Em(t)), Lt = !1;
        break;
      case 4:
        n = xl, xl = pe, a = Xo(), u = ol, ol = Hu(
          t.stateNode.containerInfo
        ), De(e, t, l), Ue(t), ol = u, Lt && zu && (Ii = !0), Lt = a, xl = n;
        break;
      case 12:
        De(e, t, l), Ue(t);
        break;
      case 31:
        De(e, t, l), Ue(t), n & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, tc(t, e)));
        break;
      case 13:
        De(e, t, l), Ue(t), t.child.flags & 8192 && t.memoizedState !== null != (a !== null && a.memoizedState !== null) && (ac = Kt()), n & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, tc(t, e)));
        break;
      case 22:
        u = t.memoizedState !== null, i = a !== null && a.memoizedState !== null;
        var o = pe, v = Gt, N = xl;
        pe = o || u, xl = N || u, Gt = v || i, De(e, t, l), Gt = v, xl = N, pe = o, Ue(t), n & 8192 && (e = t.stateNode, e._visibility = u ? e._visibility & -2 : e._visibility | 1, !u || a === null || i || pe || Gt || (e = i || Gt, l = pe, a = Gt, pe = u || pe, Gt = e, ra(t, 2), pe = l, Gt = a), !u && xl || mr(t, u)), n & 4 && (e = t.updateQueue, e !== null && (l = e.retryQueue, l !== null && (e.retryQueue = null, tc(t, l))));
        break;
      case 19:
        De(e, t, l), Ue(t), n & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, tc(t, e)));
        break;
      case 30:
        n & 512 && (Gt || a === null || Me(a, a.return)), n = Xo(), u = zu, i = (l & 335544064) === l, o = t.memoizedProps, zu = i && Hl(
          o.default,
          o.update
        ) !== "none", De(e, t, l), Ue(t), i && a !== null && Lt && (t.flags |= 4), zu = u, Lt = n;
        break;
      case 21:
        break;
      case 7:
        n & 512 && (Gt || a === null || Me(a, a.return)), a && a.stateNode !== null && (a.stateNode._fragmentFiber = t);
      default:
        De(e, t, l), Ue(t);
    }
  }
  function Ue(t) {
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
        var i = a;
        if (l == null) throw Error(s(160));
        switch (l.tag) {
          case 27:
            var o = l.stateNode, v = nr(t);
            $i(
              t,
              v,
              o,
              i
            );
            break;
          case 5:
            var N = l.stateNode;
            l.flags & 32 && (on(N, ""), l.flags &= -33);
            var z = nr(t);
            $i(
              t,
              z,
              N,
              i
            );
            break;
          case 3:
          case 4:
            var U = l.stateNode.containerInfo, _ = nr(t);
            ur(
              t,
              _,
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
  function Em(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        Em(e), e.tag === 5 && e.flags & 1024 && (e = e.stateNode, Kn = !0, e.reset(), Kn = !1), t = t.sibling;
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
          if (dr = Ml = !1, om(), Cn(e, t), !Ml && !Ii) {
            if (t = El, t !== null)
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
          El = null;
          break;
        case 5:
          Cn(e, t);
          break;
        case 4:
          a = Ml, Ml = !1, Cn(e, t), Ml && (Ii = !0), Ml = a;
          break;
        case 22:
          t.memoizedState === null && (l.memoizedState !== null ? ir(t, !1) : Cn(e, t));
          break;
        case 30:
          a = Ml, n = om(), Ml = !1, Cn(e, t), Ml && (t.flags |= 4);
          var u = t.memoizedProps, i = t.stateNode;
          e = Bl(u, i), i = Bl(l.memoizedProps, i);
          var o = Hl(u.default, u.update);
          o === "none" ? e = !1 : (u = l.memoizedState, l.memoizedState = null, l = t.child, Ye = 0, e = or(
            t,
            l,
            e,
            i,
            o,
            u,
            !0
          ), Ye !== (u === null ? 0 : u.length) && (t.flags |= 32)), (t.flags & 4) !== 0 && e ? (Bn(
            t,
            t.memoizedProps.onUpdate
          ), El = n) : n !== null && (n.push.apply(n, El), El = n), Ml = (t.flags & 32) !== 0 ? !0 : a;
          break;
        default:
          Cn(e, t);
      }
  }
  function Ol(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; )
        gm(t, e.alternate, e), e = e.sibling;
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
          Me(l, l.return);
          var n = l.stateNode;
          typeof n.componentWillUnmount == "function" && um(
            l,
            l.return,
            n
          ), ra(
            l,
            a
          );
          break;
        case 27:
          (a & 2) !== 0 && Eh(
            l.stateNode,
            l.type,
            l.memoizedProps
          );
        case 5:
          Me(l, l.return), l.tag !== 5 && l.tag !== 27 || Ou(l), ra(
            l,
            a
          );
          break;
        case 6:
          Ou(l);
          break;
        case 26:
          Me(l, l.return), n = l.stateNode, l.memoizedState !== null || n === null || Gt || n.parentNode.removeChild(n), ra(
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
          Me(l, l.return), ra(
            l,
            a
          );
          break;
        case 7:
          Me(l, l.return);
        default:
          ra(
            l,
            a
          );
      }
      t = t.sibling;
    }
  }
  function fl(t, e, l) {
    for (l = (e.subtreeFlags & 8772) !== 0 ? l : l & -2, e = e.child; e !== null; ) {
      var a = e.alternate, n = t, u = e, i = u.flags, o = (l & 1) !== 0;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          fl(
            n,
            u,
            l
          ), Mu(4, u);
          break;
        case 1:
          if (fl(
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
            var v = a.stateNode;
            try {
              var N = n.shared.hiddenCallbacks;
              if (N !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < N.length; n++)
                  Kf(N[n], v);
            } catch (z) {
              Vt(a, a.return, z);
            }
          }
          o && i & 64 && nm(u), Tl(u, u.return);
          break;
        case 27:
          (l & 2) !== 0 && sm(u);
        case 5:
          u.tag !== 5 && u.tag !== 27 || im(u), fl(
            n,
            u,
            l
          ), o && a === null && i & 4 && lr(u), Tl(u, u.return);
          break;
        case 6:
          im(u);
          break;
        case 26:
          v = u.stateNode, u.memoizedState !== null || v === null || pe || Ir(
            Hu(v.ownerDocument),
            u.type,
            v
          ), fl(
            n,
            u,
            l
          ), o && a === null && i & 4 && lr(u), Tl(u, u.return);
          break;
        case 12:
          fl(
            n,
            u,
            l
          );
          break;
        case 31:
          fl(
            n,
            u,
            l
          ), o && i & 4 && Sm(n, u);
          break;
        case 13:
          fl(
            n,
            u,
            l
          ), o && i & 4 && _m(n, u);
          break;
        case 22:
          u.memoizedState === null && fl(
            n,
            u,
            l
          ), Tl(u, u.return);
          break;
        case 30:
          fl(
            n,
            u,
            l
          ), Tl(u, u.return);
          break;
        case 7:
          Tl(u, u.return);
        default:
          fl(
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
  function nl(t, e, l, a) {
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
    n && e.alternate === null && e.return !== null && e.return.alternate !== null && Wi(e);
    var u = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        nl(
          t,
          e,
          l,
          a
        ), u & 2048 && Mu(9, e);
        break;
      case 1:
        nl(
          t,
          e,
          l,
          a
        );
        break;
      case 3:
        nl(
          t,
          e,
          l,
          a
        ), n && dr && (t = t.containerInfo, t = t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, t.style.viewTransitionName === "root" && (t.style.viewTransitionName = ""), t = t.ownerDocument.documentElement, t !== null && t.style.viewTransitionName === "none" && (t.style.viewTransitionName = "")), u & 2048 && (u = null, e.alternate !== null && (u = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== u && (e.refCount++, u != null && mu(u)));
        break;
      case 12:
        if (u & 2048) {
          nl(
            t,
            e,
            l,
            a
          ), u = e.stateNode;
          try {
            var i = e.memoizedProps, o = i.id, v = i.onPostCommit;
            typeof v == "function" && v(
              o,
              e.alternate === null ? "mount" : "update",
              u.passiveEffectDuration,
              -0
            );
          } catch (N) {
            Vt(e, e.return, N);
          }
        } else
          nl(
            t,
            e,
            l,
            a
          );
        break;
      case 31:
        nl(
          t,
          e,
          l,
          a
        );
        break;
      case 13:
        nl(
          t,
          e,
          l,
          a
        );
        break;
      case 23:
        break;
      case 22:
        i = e.stateNode, o = e.alternate, e.memoizedState !== null ? (n && o !== null && o.memoizedState === null && Wi(o), i._visibility & 2 ? nl(
          t,
          e,
          l,
          a
        ) : Cu(
          t,
          e
        )) : (n && o !== null && o.memoizedState !== null && Wi(e), i._visibility & 2 ? nl(
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
        ))), u & 2048 && vr(o, e);
        break;
      case 24:
        nl(
          t,
          e,
          l,
          a
        ), u & 2048 && gr(e.alternate, e);
        break;
      case 30:
        n && (u = e.alternate, u !== null && (Nl(u.child, !0), Nl(e.child, !0))), nl(
          t,
          e,
          l,
          a
        );
        break;
      default:
        nl(
          t,
          e,
          l,
          a
        );
    }
  }
  function An(t, e, l, a, n) {
    for (n = n && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var u = t, i = e, o = l, v = a, N = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          An(
            u,
            i,
            o,
            v,
            n
          ), Mu(8, i);
          break;
        case 23:
          break;
        case 22:
          var z = i.stateNode;
          i.memoizedState !== null ? z._visibility & 2 ? An(
            u,
            i,
            o,
            v,
            n
          ) : Cu(
            u,
            i
          ) : (z._visibility |= 2, An(
            u,
            i,
            o,
            v,
            n
          )), n && N & 2048 && vr(
            i.alternate,
            i
          );
          break;
        case 24:
          An(
            u,
            i,
            o,
            v,
            n
          ), n && N & 2048 && gr(i.alternate, i);
          break;
        default:
          An(
            u,
            i,
            o,
            v,
            n
          );
      }
      e = e.sibling;
    }
  }
  function Cu(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var l = t, a = e, n = a.flags;
        switch (a.tag) {
          case 22:
            Cu(l, a), n & 2048 && vr(
              a.alternate,
              a
            );
            break;
          case 24:
            Cu(l, a), n & 2048 && gr(a.alternate, a);
            break;
          default:
            Cu(l, a);
        }
        e = e.sibling;
      }
  }
  var Za = 8192;
  function Ka(t, e, l) {
    if (t.subtreeFlags & Za)
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
        Ka(
          t,
          e,
          l
        ), t.flags & Za && (t.memoizedState !== null ? cy(
          l,
          ol,
          t.memoizedState,
          t.memoizedProps
        ) : (t = t.stateNode, (e & 335544128) === e && wh(l, t)));
        break;
      case 5:
        Ka(
          t,
          e,
          l
        ), t.flags & Za && (t = t.stateNode, (e & 335544128) === e && wh(l, t));
        break;
      case 3:
      case 4:
        var a = ol;
        ol = Hu(t.stateNode.containerInfo), Ka(
          t,
          e,
          l
        ), ol = a;
        break;
      case 22:
        t.memoizedState === null && (a = t.alternate, a !== null && a.memoizedState !== null ? (a = Za, Za = 16777216, Ka(
          t,
          e,
          l
        ), Za = a) : Ka(
          t,
          e,
          l
        ));
        break;
      case 30:
        if ((t.flags & Za) !== 0 && (a = t.memoizedProps.name, a != null && a !== "auto")) {
          var n = t.stateNode;
          n.paired = null, Ke === null && (Ke = /* @__PURE__ */ new Map()), Ke.set(a, n);
        }
        Ka(
          t,
          e,
          l
        );
        break;
      default:
        Ka(
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
  function Au(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var a = e[l];
          Se = a, Cm(
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
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (e._visibility &= -3, ec(t)) : Au(t);
        break;
      default:
        Au(t);
    }
  }
  function ec(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var a = e[l];
          Se = a, Cm(
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
          sa(8, e, e.return), ec(e);
          break;
        case 22:
          l = e.stateNode, l._visibility & 2 && (l._visibility &= -3, ec(e));
          break;
        default:
          ec(e);
      }
      t = t.sibling;
    }
  }
  function Cm(t, e) {
    for (; Se !== null; ) {
      var l = Se;
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
          mu(l.memoizedState.cache);
      }
      if (a = l.child, a !== null) a.return = l, Se = a;
      else
        t: for (l = t; Se !== null; ) {
          a = Se;
          var n = a.sibling, u = a.return;
          if (bm(a), a === l) {
            Se = null;
            break t;
          }
          if (n !== null) {
            n.return = u, Se = n;
            break t;
          }
          Se = u;
        }
    }
  }
  var lg = {
    getCacheForType: function(t) {
      var e = Ee(oe), l = e.data.get(t);
      return l === void 0 && (l = t(), e.data.set(t, l)), l;
    },
    cacheSignal: function() {
      return Ee(oe).controller.signal;
    }
  }, ag = typeof WeakMap == "function" ? WeakMap : Map, qt = 0, kt = null, zt = null, wt = 0, Xt = 0, Je = null, oa = !1, jn = !1, yr = !1, Kl = 0, ie = 0, fa = 0, Ja = 0, lc = 0, $e = 0, Rn = 0, ju = null, Ge = null, br = !1, ac = 0, Am = 0, nc = 1 / 0, uc = null, da = null, ae = 0, dl = null, $a = null, zl = 0, pr = 0, Sr = null, jm = null, wn = null, Dn = null, Un = null, Ru = 0, ic = null;
  function ke() {
    return (qt & 2) !== 0 && wt !== 0 ? wt & -wt : k.T !== null ? Ar() : wo();
  }
  function Rm() {
    if ($e === 0)
      if ((wt & 536870912) === 0 || xt) {
        var t = ti;
        ti <<= 1, (ti & 3932160) === 0 && (ti = 262144), $e = t;
      } else $e = 536870912;
    return t = Ne.current, t !== null && (t.flags |= 32), $e;
  }
  function Bn(t, e) {
    if (e != null) {
      var l = t.stateNode, a = l.ref;
      a === null && (a = l.ref = dh(
        Bl(t.memoizedProps, l)
      )), Dn === null && (Dn = []), Dn.push(e.bind(null, a));
    }
  }
  function Xe(t, e, l) {
    (t === kt && (Xt === 2 || Xt === 9) || t.cancelPendingCommit !== null) && (Hn(t, 0), ma(
      t,
      wt,
      $e,
      !1
    )), Pn(t, l), ((qt & 2) === 0 || t !== kt) && (t === kt && ((qt & 2) === 0 && (Ja |= l), ie === 4 && ma(
      t,
      wt,
      $e,
      !1
    )), Cl(t));
  }
  function wm(t, e, l) {
    if ((qt & 6) !== 0) throw Error(s(327));
    var a = !l && (e & 127) === 0 && (e & t.expiredLanes) === 0 || In(t, e), n = a ? ig(t, e) : Tr(t, e, !0), u = a;
    do {
      if (n === 0) {
        jn && !a && ma(t, e, 0, !1);
        break;
      } else {
        if (l = t.current.alternate, u && !ng(l)) {
          n = Tr(t, e, !1), u = !1;
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
              n = ju;
              var v = o.current.memoizedState.isDehydrated;
              if (v && (Hn(o, i).flags |= 256), i = Tr(
                o,
                i,
                !1
              ), i !== 2 && i !== 6) {
                if (yr && !v) {
                  o.errorRecoveryDisabledLanes |= u, Ja |= u, n = 4;
                  break t;
                }
                u = Ge, Ge = n, u !== null && (Ge === null ? Ge = u : Ge.push.apply(
                  Ge,
                  u
                ));
              }
              n = i;
            }
            if (u = !1, n !== 2) continue;
          }
        }
        if (n === 1) {
          Hn(t, 0), ma(t, e, 0, !0);
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
                $e,
                !oa
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
          if ((e & 62914560) === e && (n = ac + 300 - Kt(), 10 < n)) {
            if (ma(
              a,
              e,
              $e,
              !oa
            ), li(a, 0, !0) !== 0) break t;
            zl = e, a.timeoutHandle = Gr(
              Dm.bind(
                null,
                a,
                l,
                Ge,
                uc,
                br,
                e,
                $e,
                Ja,
                Rn,
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
          Dm(
            a,
            l,
            Ge,
            uc,
            br,
            e,
            $e,
            Ja,
            Rn,
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
    Cl(t);
  }
  function Dm(t, e, l, a, n, u, i, o, v, N, z, U, _, O) {
    t.timeoutHandle = -1;
    var Q = e.subtreeFlags, et = (u & 335544064) === u;
    if (U = null, (et || Q & 8192 || (Q & 16785408) === 16785408) && (U = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: pl
    }, Ke = null, Mm(
      e,
      u,
      U
    ), et && (Q = U, et = t.containerInfo, et = (et.nodeType === 9 ? et : et.ownerDocument).__reactViewTransition, et != null && (Q.count++, Q.waitingForViewTransition = !0, Q = qu.bind(Q), et.finished.then(Q, Q))), Q = (u & 62914560) === u ? ac - Kt() : (u & 4194048) === u ? Am - Kt() : 0, Q = sy(
      U,
      Q
    ), Q !== null)) {
      zl = u, t.cancelPendingCommit = Q(
        Xm.bind(
          null,
          t,
          e,
          u,
          l,
          a,
          n,
          i,
          o,
          v,
          N,
          z,
          U,
          null,
          _,
          O
        )
      ), ma(t, u, i, !N);
      return;
    }
    Xm(
      t,
      e,
      u,
      l,
      a,
      n,
      i,
      o,
      v,
      N,
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
            if (!Qe(u(), n)) return !1;
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
    e = zo(t, e), e &= ~lc, e &= ~Ja, t.suspendedLanes |= e, t.pingedLanes &= ~e, a && (t.warmLanes |= e), a = t.expirationTimes;
    for (var n = e; 0 < n; ) {
      var u = 31 - ve(n), i = 1 << u;
      a[u] = -1, n &= ~i;
    }
    l !== 0 && Ao(t, l, e);
  }
  function cc() {
    return (qt & 6) === 0 ? (wu(0), !1) : !0;
  }
  function _r() {
    if (zt !== null) {
      if (Xt === 0)
        var t = zt.return;
      else
        t = zt, ql = Ua = null, Cs(t), En = null, gu = 0, t = zt;
      for (; t !== null; )
        am(t.alternate, t), t = t.return;
      zt = null;
    }
  }
  function Hn(t, e) {
    var l = t.timeoutHandle;
    return l !== -1 && (t.timeoutHandle = -1, zg(l)), l = t.cancelPendingCommit, l !== null && (t.cancelPendingCommit = null, l()), zl = 0, _r(), kt = t, zt = l = Ll(t.current, null), wt = e, Xt = 0, Je = null, oa = !1, jn = In(t, e), yr = !1, Rn = $e = lc = Ja = fa = ie = 0, Ge = ju = null, br = !1, Kl = zo(t, e), vi(), l;
  }
  function Um(t, e) {
    pt = null, k.H = qi, e === Tn || e === Mi ? (e = Xf(), Xt = 3) : e === gs ? (e = Xf(), Xt = 4) : Xt = e === Qs ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, Je = e, zt === null && (ie = 1, Gi(
      t,
      tl(e, t.current)
    ));
  }
  function Bm() {
    var t = Ne.current;
    return t === null ? !0 : (wt & 4194048) === wt ? Ae === null : (wt & 62914560) === wt || (wt & 536870912) !== 0 ? t === Ae : !1;
  }
  function Hm() {
    var t = k.H;
    return k.H = qi, t === null ? qi : t;
  }
  function Lm() {
    var t = k.A;
    return k.A = lg, t;
  }
  function sc() {
    ie = 4, oa || (wt & 4194048) !== wt && Ne.current !== null || (jn = !0), (fa & 134217727) === 0 && (Ja & 134217727) === 0 || kt === null || ma(
      kt,
      wt,
      $e,
      !1
    );
  }
  function Tr(t, e, l) {
    var a = qt;
    qt |= 2;
    var n = Hm(), u = Lm();
    (kt !== t || wt !== e) && (uc = null, Hn(t, e)), e = !1;
    var i = ie;
    t: do
      try {
        if (Xt !== 0 && zt !== null) {
          var o = zt, v = Je;
          switch (Xt) {
            case 8:
              _r(), i = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              Ne.current === null && (e = !0);
              var N = Xt;
              if (Xt = 0, Je = null, Ln(t, o, v, N), l && jn) {
                i = 0;
                break t;
              }
              break;
            default:
              N = Xt, Xt = 0, Je = null, Ln(t, o, v, N);
          }
        }
        ug(), i = ie;
        break;
      } catch (z) {
        Um(t, z);
      }
    while (!0);
    return e && t.shellSuspendCounter++, ql = Ua = null, qt = a, k.H = n, k.A = u, zt === null && (kt = null, wt = 0, vi()), i;
  }
  function ug() {
    for (; zt !== null; ) Ym(zt);
  }
  function ig(t, e) {
    var l = qt;
    qt |= 2;
    var a = Hm(), n = Lm();
    kt !== t || wt !== e ? (uc = null, nc = Kt() + 500, Hn(t, e)) : jn = In(
      t,
      e
    );
    t: do
      try {
        if (Xt !== 0 && zt !== null) {
          e = zt;
          var u = Je;
          e: switch (Xt) {
            case 1:
              Xt = 0, Je = null, Ln(t, e, u, 1);
              break;
            case 2:
            case 9:
              if (qf(u)) {
                Xt = 0, Je = null, qm(e);
                break;
              }
              e = function() {
                Xt !== 2 && Xt !== 9 || kt !== t || (Xt = 7), Cl(t);
              }, u.then(e, e);
              break t;
            case 3:
              Xt = 7;
              break t;
            case 4:
              Xt = 5;
              break t;
            case 7:
              qf(u) ? (Xt = 0, Je = null, qm(e)) : (Xt = 0, Je = null, Ln(t, e, u, 7));
              break;
            case 5:
              var i = null;
              switch (zt.tag) {
                case 26:
                  i = zt.memoizedState;
                case 5:
                case 27:
                  var o = zt;
                  if (i ? jh(i) : o.stateNode.complete) {
                    Xt = 0, Je = null;
                    var v = o.sibling;
                    if (v !== null) zt = v;
                    else {
                      var N = o.return;
                      N !== null ? (zt = N, rc(N)) : zt = null;
                    }
                    break e;
                  }
              }
              Xt = 0, Je = null, Ln(t, e, u, 5);
              break;
            case 6:
              Xt = 0, Je = null, Ln(t, e, u, 6);
              break;
            case 8:
              _r(), ie = 6;
              break t;
            default:
              throw Error(s(462));
          }
        }
        cg();
        break;
      } catch (z) {
        Um(t, z);
      }
    while (!0);
    return ql = Ua = null, k.H = a, k.A = n, qt = l, zt !== null ? 0 : (kt = null, wt = 0, vi(), ie);
  }
  function cg() {
    for (; zt !== null && !se(); )
      Ym(zt);
  }
  function Ym(t) {
    var e = em(t.alternate, t, Kl);
    t.memoizedProps = t.pendingProps, e === null ? rc(t) : zt = e;
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
          wt
        );
        break;
      case 11:
        e = $d(
          l,
          e,
          e.pendingProps,
          e.type.render,
          e.ref,
          wt
        );
        break;
      case 5:
        Cs(e);
        var a = e;
        a === be && (xt ? (_i(a), a.tag === 5 && a.stateNode != null && (Wt = a.stateNode)) : (_i(a), xt = !0));
      default:
        am(l, e), e = zt = Cf(e, Kl), e = em(l, e, Kl);
    }
    t.memoizedProps = t.pendingProps, e === null ? rc(t) : zt = e;
  }
  function Ln(t, e, l, a) {
    ql = Ua = null, Cs(e), En = null, gu = 0;
    var n = e.return;
    try {
      if ($v(
        t,
        n,
        e,
        l,
        wt
      )) {
        ie = 1, Gi(
          t,
          tl(l, t.current)
        ), zt = null;
        return;
      }
    } catch (u) {
      if (n !== null) throw zt = n, u;
      ie = 1, Gi(
        t,
        tl(l, t.current)
      ), zt = null;
      return;
    }
    e.flags & 32768 ? (xt || a === 1 ? t = !0 : jn || (wt & 536870912) !== 0 ? t = !1 : (oa = t = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = Ne.current, a !== null && a.tag === 13 && (a.flags |= 16384))), Gm(e, t)) : rc(e);
  }
  function rc(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        Gm(
          e,
          oa
        );
        return;
      }
      t = e.return;
      var l = Iv(
        e.alternate,
        e,
        Kl
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
    ie === 0 && (ie = 5);
  }
  function Gm(t, e) {
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
    ie = 6, zt = null;
  }
  function Xm(t, e, l, a, n, u, i, o, v, N, z, U) {
    t.cancelPendingCommit = null;
    do
      oc();
    while (ae !== 0);
    if ((qt & 6) !== 0) throw Error(s(327));
    if (e !== null) {
      if (e === t.current) throw Error(s(177));
      t === kt && (zt = kt = null, wt = 0), $a = e, dl = t, zl = l, Sr = n, jm = a, sg(
        t,
        e,
        l,
        i,
        o,
        v,
        U
      );
    }
  }
  function sg(t, e, l, a, n, u, i) {
    var o = e.lanes | e.childLanes;
    if (pr = o, o |= as, D0(
      t,
      l,
      o,
      a,
      n,
      u
    ), Dn = null, (l & 335544064) === l ? (Un = Bv(t), a = 10262) : (Un = null, a = 10256), (e.subtreeFlags & a) !== 0 || (e.flags & a) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, hg(an, function() {
      return Mr(), null;
    })) : (t.callbackNode = null, t.callbackPriority = 0), ki = !1, a = (e.flags & 13878) !== 0, (e.subtreeFlags & 13878) !== 0 || a) {
      a = k.T, k.T = null, n = ut.p, ut.p = 2, u = qt, qt |= 4;
      try {
        tg(t, e, l);
      } finally {
        qt = u, ut.p = n, k.T = a;
      }
    }
    ae = 1, ki ? wn = Dg(
      i,
      t.containerInfo,
      Un,
      Er,
      Nr,
      og,
      xr,
      Mr,
      rg
    ) : (Er(), Nr(), xr());
  }
  function rg(t) {
    if (ae !== 0) {
      var e = dl.onRecoverableError;
      e(t, { componentStack: null });
    }
  }
  function og() {
    ae === 3 && (ae = 0, Nm($a, dl), ae = 4);
  }
  function Er() {
    if (ae === 1) {
      ae = 0;
      var t = dl, e = $a, l = zl, a = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || a) {
        a = k.T, k.T = null;
        var n = ut.p;
        ut.p = 2;
        var u = qt;
        qt |= 4;
        try {
          zu = Ii = !1, Tm(e, t, l), l = Lr;
          var i = pf(t.containerInfo), o = l.focusedElem, v = l.selectionRange;
          if (i !== o && o && o.ownerDocument && bf(
            o.ownerDocument.documentElement,
            o
          )) {
            if (v !== null && Ic(o)) {
              var N = v.start, z = v.end;
              if (z === void 0 && (z = N), "selectionStart" in o)
                o.selectionStart = N, o.selectionEnd = Math.min(
                  z,
                  o.value.length
                );
              else {
                var U = o.ownerDocument || document, _ = U && U.defaultView || window;
                if (_.getSelection) {
                  var O = _.getSelection(), Q = o.textContent.length, et = Math.min(v.start, Q), St = v.end === void 0 ? et : Math.min(v.end, Q);
                  !O.extend && et > St && (i = St, St = et, et = i);
                  var T = yf(
                    o,
                    et
                  ), b = yf(
                    o,
                    St
                  );
                  if (T && b && (O.rangeCount !== 1 || O.anchorNode !== T.node || O.anchorOffset !== T.offset || O.focusNode !== b.node || O.focusOffset !== b.offset)) {
                    var M = U.createRange();
                    M.setStart(T.node, T.offset), O.removeAllRanges(), et > St ? (O.addRange(M), O.extend(b.node, b.offset)) : (M.setEnd(b.node, b.offset), O.addRange(M));
                  }
                }
              }
            }
            for (U = [], O = o; O = O.parentNode; )
              O.nodeType === 1 && U.push({
                element: O,
                left: O.scrollLeft,
                top: O.scrollTop
              });
            for (typeof o.focus == "function" && o.focus(), o = 0; o < U.length; o++) {
              var D = U[o];
              D.element.scrollLeft = D.left, D.element.scrollTop = D.top;
            }
          }
          Kn = !!Hr, Lr = Hr = null;
        } finally {
          qt = u, ut.p = n, k.T = a;
        }
      }
      t.current = e, ae = 2;
    }
  }
  function Nr() {
    if (ae === 2) {
      ae = 0;
      var t = dl, e = $a, l = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || l) {
        l = k.T, k.T = null;
        var a = ut.p;
        ut.p = 2;
        var n = qt;
        qt |= 4;
        try {
          gm(t, e.alternate, e);
        } finally {
          qt = n, ut.p = a, k.T = l;
        }
      }
      ae = 3;
    }
  }
  function xr() {
    if (ae === 4 || ae === 3) {
      ae = 0;
      var t = wn;
      wn = null, he();
      var e = dl, l = $a, a = zl, n = jm, u = (a & 335544064) === a ? 10262 : 10256;
      if ((l.subtreeFlags & u) !== 0 || (l.flags & u) !== 0 ? ae = 5 : (ae = 0, $a = dl = null, Vm(e, e.pendingLanes)), u = e.pendingLanes, u === 0 && (da = null), Dc(a), l = l.stateNode, Rt && typeof Rt.onCommitFiberRoot == "function")
        try {
          Rt.onCommitFiberRoot(
            W,
            l,
            void 0,
            (l.current.flags & 128) === 128
          );
        } catch {
        }
      if (n !== null) {
        l = k.T, u = ut.p, ut.p = 2, k.T = null;
        try {
          for (var i = e.onRecoverableError, o = 0; o < n.length; o++) {
            var v = n[o];
            i(v.value, {
              componentStack: v.stack
            });
          }
        } finally {
          k.T = l, ut.p = u;
        }
      }
      if (n = Dn, i = Un, Un = null, n !== null && (Dn = null, i === null && (i = []), t !== null))
        for (v = 0; v < n.length; v++)
          l = (0, n[v])(
            i
          ), l !== void 0 && t.finished.finally(l);
      (zl & 3) !== 0 && oc(), Cl(e), u = e.pendingLanes, (a & 261930) !== 0 && (u & 42) !== 0 ? e === ic ? Ru++ : (Ru = 0, ic = e) : (Ru = 0, ic = null), wu(0);
    }
  }
  function Vm(t, e) {
    (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, mu(e)));
  }
  function oc() {
    return wn !== null && (wn.skipTransition(), wn = null), Er(), Nr(), xr(), Mr();
  }
  function Mr() {
    if (ae !== 5) return !1;
    var t = dl, e = pr;
    pr = 0;
    var l = Dc(zl), a = k.T, n = ut.p;
    try {
      ut.p = 32 > l ? 32 : l, k.T = null, l = Sr, Sr = null;
      var u = dl, i = zl;
      if (ae = 0, $a = dl = null, zl = 0, (qt & 6) !== 0) throw Error(s(331));
      var o = qt;
      if (qt |= 4, zm(u.current), xm(
        u,
        u.current,
        i,
        l
      ), qt = o, wu(0, !1), Rt && typeof Rt.onPostCommitFiberRoot == "function")
        try {
          Rt.onPostCommitFiberRoot(W, u);
        } catch {
        }
      return !0;
    } finally {
      ut.p = n, k.T = a, Vm(t, e);
    }
  }
  function Qm(t, e, l) {
    e = tl(l, e), e = Vs(t.stateNode, e, 2), t = na(t, e, 2), t !== null && (Pn(t, 2), Cl(t));
  }
  function Vt(t, e, l) {
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
          if (typeof e.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (da === null || !da.has(a))) {
            t = tl(l, t), l = qd(2), a = na(e, l, 2), a !== null && (Gd(
              l,
              a,
              e,
              t
            ), Pn(a, 2), Cl(a));
            break;
          }
        }
        e = e.return;
      }
  }
  function Or(t, e, l) {
    var a = t.pingCache;
    if (a === null) {
      a = t.pingCache = new ag();
      var n = /* @__PURE__ */ new Set();
      a.set(e, n);
    } else
      n = a.get(e), n === void 0 && (n = /* @__PURE__ */ new Set(), a.set(e, n));
    n.has(l) || (yr = !0, n.add(l), t = fg.bind(null, t, e, l), e.then(t, t));
  }
  function fg(t, e, l) {
    var a = t.pingCache;
    a !== null && a.delete(e), t.pingedLanes |= t.suspendedLanes & l, t.warmLanes &= ~l, kt === t && (wt & l) === l && ((ie === 4 || ie === 3 && (wt & 62914560) === wt && 300 > Kt() - ac) && (qt & 2) === 0 ? Hn(t, 0) : lc |= l, Rn === wt && (Rn = 0)), Cl(t);
  }
  function Zm(t, e) {
    e === 0 && (e = Co()), t = Ra(t, e), t !== null && (Pn(t, e), Cl(t));
  }
  function dg(t) {
    var e = t.memoizedState, l = 0;
    e !== null && (l = e.retryLane), Zm(t, l);
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
    a !== null && a.delete(e), Zm(t, l);
  }
  function hg(t, e) {
    return rt(t, e);
  }
  var Yn = null, qn = null, zr = !1, fc = !1, Cr = !1, ha = 0;
  function Cl(t) {
    t !== qn && t.next === null && (qn === null ? Yn = qn = t : qn = qn.next = t), fc = !0, zr || (zr = !0, gg());
  }
  function wu(t, e) {
    if (!Cr && fc) {
      Cr = !0;
      do
        for (var l = !1, a = Yn; a !== null; ) {
          if (t !== 0) {
            var n = a.pendingLanes;
            if (n === 0) var u = 0;
            else {
              var i = a.suspendedLanes, o = a.pingedLanes;
              u = (1 << 31 - ve(42 | t) + 1) - 1, u &= n & ~(i & ~o), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (l = !0, km(a, u));
          } else
            u = wt, u = li(
              a,
              a === kt ? u : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (u & 3) === 0 || In(a, u) || (l = !0, km(a, u));
          a = a.next;
        }
      while (l);
      Cr = !1;
    }
  }
  function vg() {
    Km();
  }
  function Km() {
    fc = zr = !1;
    var t = 0;
    ha !== 0 && Og() && (t = ha);
    for (var e = Kt(), l = null, a = Yn; a !== null; ) {
      var n = a.next, u = Jm(a, e);
      u === 0 ? (a.next = null, l === null ? Yn = n : l.next = n, n === null && (qn = l)) : (l = a, (t !== 0 || (u & 3) !== 0) && (fc = !0)), a = n;
    }
    ae !== 0 && ae !== 5 || wu(t), ha !== 0 && (ha = 0);
  }
  function Jm(t, e) {
    for (var l = t.suspendedLanes, a = t.pingedLanes, n = t.expirationTimes, u = t.pendingLanes & -62914561; 0 < u; ) {
      var i = 31 - ve(u), o = 1 << i, v = n[i];
      v === -1 ? ((o & l) === 0 || (o & a) !== 0) && (n[i] = w0(o, e)) : v <= e && (t.expiredLanes |= o), u &= ~o;
    }
    if (e = kt, l = wt, l = li(
      t,
      t === e ? l : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a = t.callbackNode, l === 0 || t === e && (Xt === 2 || Xt === 9) || t.cancelPendingCommit !== null)
      return a !== null && a !== null && Ot(a), t.callbackNode = null, t.callbackPriority = 0;
    if ((l & 3) === 0 || In(t, l)) {
      if (e = l & -l, e === t.callbackPriority) return e;
      switch (a !== null && Ot(a), Dc(l)) {
        case 2:
        case 8:
          l = bl;
          break;
        case 32:
          l = an;
          break;
        case 268435456:
          l = Iu;
          break;
        default:
          l = an;
      }
      return a = $m.bind(null, t), l = rt(l, a), t.callbackPriority = e, t.callbackNode = l, e;
    }
    return a !== null && a !== null && Ot(a), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function $m(t, e) {
    if (ae !== 0 && ae !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var l = t.callbackNode;
    if (oc() && t.callbackNode !== l)
      return null;
    var a = wt;
    return a = li(
      t,
      t === kt ? a : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a === 0 ? null : (wm(t, a, e), Jm(t, Kt()), t.callbackNode != null && t.callbackNode === l ? $m.bind(null, t) : null);
  }
  function km(t, e) {
    if (oc()) return null;
    wm(t, e, !0);
  }
  function gg() {
    Cg(function() {
      (qt & 6) !== 0 ? rt(
        _e,
        vg
      ) : Km();
    });
  }
  function Ar() {
    if (ha === 0) {
      var t = La;
      t === 0 && (t = Pu, Pu <<= 1, (Pu & 261888) === 0 && (Pu = 256)), ha = t;
    }
    return ha;
  }
  function Fm(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : ci(t);
  }
  function yg(t, e, l, a, n) {
    if (e === "submit" && l && l.stateNode === n) {
      var u = Fm(
        (n[He] || null).action
      ), i = a.submitter;
      i && (e = (e = i[He] || null) ? Fm(e.formAction) : i.getAttribute("formAction"), e !== null && (u = e, i = null));
      var o = new fi(
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
                  var v = new FormData(n, i);
                  Ls(
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
                typeof u == "function" && (o.preventDefault(), v = new FormData(n, i), Ls(
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
  for (var jr = 0; jr < ls.length; jr++) {
    var Rr = ls[jr], bg = Rr.toLowerCase(), pg = Rr[0].toUpperCase() + Rr.slice(1);
    sl(
      bg,
      "on" + pg
    );
  }
  sl(Tf, "onAnimationEnd"), sl(Ef, "onAnimationIteration"), sl(Nf, "onAnimationStart"), sl("dblclick", "onDoubleClick"), sl("focusin", "onFocus"), sl("focusout", "onBlur"), sl(zv, "onTransitionRun"), sl(Cv, "onTransitionStart"), sl(Av, "onTransitionCancel"), sl(xf, "onTransitionEnd"), sn("onMouseEnter", ["mouseout", "mouseover"]), sn("onMouseLeave", ["mouseout", "mouseover"]), sn("onPointerEnter", ["pointerout", "pointerover"]), sn("onPointerLeave", ["pointerout", "pointerover"]), Ca(
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
  var Du = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Sg = new Set(
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
          for (var i = a.length - 1; 0 <= i; i--) {
            var o = a[i], v = o.instance, N = o.currentTarget;
            if (o = o.listener, v !== u && n.isPropagationStopped())
              break t;
            u = o, n.currentTarget = N;
            try {
              u(n);
            } catch (z) {
              hi(z);
            }
            n.currentTarget = null, u = v;
          }
        else
          for (i = 0; i < a.length; i++) {
            if (o = a[i], v = o.instance, N = o.currentTarget, o = o.listener, v !== u && n.isPropagationStopped())
              break t;
            u = o, n.currentTarget = N;
            try {
              u(n);
            } catch (z) {
              hi(z);
            }
            n.currentTarget = null, u = v;
          }
      }
    }
  }
  function Ct(t, e) {
    var l = e[Uo];
    l === void 0 && (l = e[Uo] = /* @__PURE__ */ new Set());
    var a = t + "__bubble";
    l.has(a) || (Im(e, t, 2, !1), l.add(a));
  }
  function wr(t, e, l) {
    var a = 0;
    e && (a |= 4), Im(
      l,
      t,
      a,
      e
    );
  }
  var dc = "_reactListening" + Math.random().toString(36).slice(2);
  function Dr(t) {
    if (!t[dc]) {
      t[dc] = !0, Lo.forEach(function(l) {
        l !== "selectionchange" && (Sg.has(l) || wr(l, !1, t), wr(l, !0, t));
      });
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[dc] || (e[dc] = !0, wr("selectionchange", !1, e));
    }
  }
  function Im(t, e, l, a) {
    switch (Gh(e)) {
      case 2:
        var n = dy;
        break;
      case 8:
        n = my;
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
        var i = a.tag;
        if (i === 3 || i === 4) {
          var o = a.stateNode.containerInfo;
          if (o === n) break;
          if (i === 4)
            for (i = a.return; i !== null; ) {
              var v = i.tag;
              if ((v === 3 || v === 4) && i.stateNode.containerInfo === n)
                return;
              i = i.return;
            }
          for (; o !== null; ) {
            if (i = za(o), i === null) return;
            if (v = i.tag, v === 5 || v === 6 || v === 26 || v === 27) {
              a = u = i;
              continue t;
            }
            o = o.parentNode;
          }
        }
        a = a.return;
      }
    Wo(function() {
      var N = u, z = qc(l), U = [];
      t: {
        var _ = Mf.get(t);
        if (_ !== void 0) {
          var O = fi, Q = t;
          switch (t) {
            case "keypress":
              if (ri(l) === 0) break t;
            case "keydown":
            case "keyup":
              O = nv;
              break;
            case "focusin":
              Q = "focus", O = Kc;
              break;
            case "focusout":
              Q = "blur", O = Kc;
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
              O = K0;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              O = rv;
              break;
            case Tf:
            case Ef:
            case Nf:
              O = k0;
              break;
            case xf:
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
              O = lf;
              break;
            case "submit":
              O = cv;
              break;
            case "toggle":
            case "beforetoggle":
              O = vv;
          }
          var et = (e & 4) !== 0, St = !et && (t === "scroll" || t === "scrollend"), T = et ? _ !== null ? _ + "Capture" : null : _;
          et = [];
          for (var b = N, M; b !== null; ) {
            var D = b;
            if (M = D.stateNode, D = D.tag, D !== 5 && D !== 26 && D !== 27 || M === null || T === null || (D = lu(b, T), D != null && et.push(
              Uu(b, D, M)
            )), St) break;
            b = b.return;
          }
          0 < et.length && (_ = new O(
            _,
            Q,
            null,
            l,
            z
          ), U.push({ event: _, listeners: et }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (O = t === "mouseover" || t === "pointerover", _ = t === "mouseout" || t === "pointerout", O && l !== Yc && (Q = l.relatedTarget || l.fromElement) && (za(Q) || Q[nn]))
            break t;
          (_ || O) && (Q = z.window === z ? z : (O = z.ownerDocument) ? O.defaultView || O.parentWindow : window, _ ? (O = l.relatedTarget || l.toElement, _ = N, O = O ? za(O) : null, O !== null && (St = m(O), et = O.tag, O !== St || et !== 5 && et !== 27 && et !== 6) && (O = null)) : (_ = null, O = N), _ !== O && (et = tf, D = "onMouseLeave", T = "onMouseEnter", b = "mouse", (t === "pointerout" || t === "pointerover") && (et = lf, D = "onPointerLeave", T = "onPointerEnter", b = "pointer"), St = _ == null ? Q : eu(_), M = O == null ? Q : eu(O), Q = new et(
            D,
            b + "leave",
            _,
            l,
            z
          ), Q.target = St, Q.relatedTarget = M, D = null, za(z) === N && (et = new et(
            T,
            b + "enter",
            O,
            l,
            z
          ), et.target = M, et.relatedTarget = St, D = et), St = D, et = _ && O ? vt(
            _,
            O,
            _g
          ) : null, _ !== null && Pm(
            U,
            Q,
            _,
            et,
            !1
          ), O !== null && St !== null && Pm(
            U,
            St,
            O,
            et,
            !0
          )));
        }
        t: {
          if (_ = N ? eu(N) : window, O = _.nodeName && _.nodeName.toLowerCase(), O === "select" || O === "input" && _.type === "file")
            var F = ff;
          else if (rf(_))
            if (df)
              F = xv;
            else {
              F = Ev;
              var Dt = Tv;
            }
          else
            O = _.nodeName, !O || O.toLowerCase() !== "input" || _.type !== "checkbox" && _.type !== "radio" ? N && Lc(N.elementType) && (F = ff) : F = Nv;
          if (F && (F = F(t, N))) {
            of(
              U,
              F,
              l,
              z
            );
            break t;
          }
          Dt && Dt(t, _, N);
        }
        switch (Dt = N ? eu(N) : window, t) {
          case "focusin":
            (rf(Dt) || Dt.contentEditable === "true") && (hn = Dt, Pc = N, ou = null);
            break;
          case "focusout":
            ou = Pc = hn = null;
            break;
          case "mousedown":
            ts = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ts = !1, Sf(U, l, z);
            break;
          case "selectionchange":
            if (Ov) break;
          case "keydown":
          case "keyup":
            Sf(U, l, z);
        }
        var at;
        if ($c)
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
          mn ? cf(t, l) && (ct = "onCompositionEnd") : t === "keydown" && l.keyCode === 229 && (ct = "onCompositionStart");
        ct && (af && l.locale !== "ko" && (mn || ct !== "onCompositionStart" ? ct === "onCompositionEnd" && mn && (at = Io()) : (kl = z, Vc = "value" in kl ? kl.value : kl.textContent, mn = !0)), Dt = mc(N, ct), 0 < Dt.length && (ct = new ef(
          ct,
          t,
          null,
          l,
          z
        ), U.push({ event: ct, listeners: Dt }), at ? ct.data = at : (at = sf(l), at !== null && (ct.data = at)))), (at = yv ? bv(t, l) : pv(t, l)) && (ct = mc(N, "onBeforeInput"), 0 < ct.length && (Dt = new ef(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          z
        ), U.push({
          event: Dt,
          listeners: ct
        }), Dt.data = at)), yg(
          U,
          t,
          N,
          l,
          z
        );
      }
      Wm(U, e);
    });
  }
  function Uu(t, e, l) {
    return {
      instance: t,
      listener: e,
      currentTarget: l
    };
  }
  function mc(t, e) {
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
  function _g(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function Pm(t, e, l, a, n) {
    for (var u = e._reactName, i = []; l !== null && l !== a; ) {
      var o = l, v = o.alternate, N = o.stateNode;
      if (o = o.tag, v !== null && v === a) break;
      o !== 5 && o !== 26 && o !== 27 || N === null || (v = N, n ? (N = lu(l, u), N != null && i.unshift(
        Uu(l, N, v)
      )) : n || (N = lu(l, u), N != null && i.push(
        Uu(l, N, v)
      ))), l = l.return;
    }
    i.length !== 0 && t.push({ event: e, listeners: i });
  }
  var Tg = /\r\n?/g, Eg = /\u0000|\uFFFD/g;
  function th(t) {
    return (typeof t == "string" ? t : "" + t).replace(Tg, `
`).replace(Eg, "");
  }
  function eh(t, e) {
    return e = th(e), th(t) === e;
  }
  function Qt(t, e, l, a, n, u) {
    switch (l) {
      case "children":
        if (typeof a == "string")
          e === "body" || e === "textarea" && a === "" || on(t, a);
        else if (typeof a == "number" || typeof a == "bigint")
          e !== "body" && on(t, "" + a);
        else return;
        break;
      case "className":
        ii(t, "class", a);
        break;
      case "tabIndex":
        ii(t, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        ii(t, l, a);
        break;
      case "style":
        ko(t, a, u);
        return;
      case "data":
        if (e !== "object") {
          ii(t, "data", a);
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
        a = ci(a), t.setAttribute(l, a);
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
        a = ci(a), t.setAttribute(l, a);
        break;
      case "onClick":
        a != null && (t.onclick = pl);
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
        l = ci(a), t.setAttributeNS(
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
        Ct("beforetoggle", t), Ct("toggle", t), ui(t, "popover", a);
        break;
      case "xlinkActuate":
        Dl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        Dl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        Dl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        Dl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        Dl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        Dl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        Dl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        Dl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        Dl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        ui(t, "is", a);
        break;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N")
          l = X0.get(l) || l, ui(t, l, a);
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
        if (typeof a == "string") on(t, a);
        else if (typeof a == "number" || typeof a == "bigint")
          on(t, "" + a);
        else return;
        break;
      case "onScroll":
        a != null && Ct("scroll", t);
        return;
      case "onScrollEnd":
        a != null && Ct("scrollend", t);
        return;
      case "onClick":
        a != null && (t.onclick = pl);
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
            Lt = !0, l in t ? t[l] = a : a === !0 ? t.setAttribute(l, "") : ui(t, l, a);
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
                  Qt(t, e, u, i, l, null);
              }
          }
        n && Qt(t, e, "srcSet", l.srcSet, l, null), a && Qt(t, e, "src", l.src, l, null);
        return;
      case "input":
        Ct("invalid", t);
        var o = u = i = n = null, v = null, N = null;
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
                  Qt(t, e, a, z, l, null);
              }
          }
        Zo(
          t,
          u,
          o,
          v,
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
                Qt(t, e, n, o, l, null);
            }
        e = u, l = i, t.multiple = !!a, e != null ? rn(t, !!a, e, !1) : l != null && rn(t, !!a, l, !0);
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
                Qt(t, e, i, o, l, null);
            }
        Jo(t, a, n, u);
        return;
      case "option":
        for (v in l)
          l.hasOwnProperty(v) && (a = l[v], a != null) && (v === "selected" ? t.selected = a && typeof a != "function" && typeof a != "symbol" : Qt(t, e, v, a, l, null));
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
        for (a = 0; a < Du.length; a++)
          Ct(Du[a], t);
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
                Qt(t, e, N, a, l, null);
            }
        return;
      default:
        if (Lc(e)) {
          for (z in l)
            l.hasOwnProperty(z) && (a = l[z], a !== void 0 && Br(
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
      l.hasOwnProperty(o) && (a = l[o], a != null && Qt(t, e, o, a, l, null));
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
        var n = null, u = null, i = null, o = null, v = null, N = null, z = null;
        for (O in l) {
          var U = l[O];
          if (l.hasOwnProperty(O) && U != null)
            switch (O) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                v = U;
              default:
                a.hasOwnProperty(O) || Qt(t, e, O, null, a, U);
            }
        }
        for (var _ in a) {
          var O = a[_];
          if (U = l[_], a.hasOwnProperty(_) && (O != null || U != null))
            switch (_) {
              case "type":
                O !== U && (Lt = !0), u = O;
                break;
              case "name":
                O !== U && (Lt = !0), n = O;
                break;
              case "checked":
                O !== U && (Lt = !0), N = O;
                break;
              case "defaultChecked":
                O !== U && (Lt = !0), z = O;
                break;
              case "value":
                O !== U && (Lt = !0), i = O;
                break;
              case "defaultValue":
                O !== U && (Lt = !0), o = O;
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
                  _,
                  O,
                  a,
                  U
                );
            }
        }
        Bc(
          t,
          i,
          o,
          v,
          N,
          z,
          u,
          n
        );
        return;
      case "select":
        O = i = o = _ = null;
        for (u in l)
          if (v = l[u], l.hasOwnProperty(u) && v != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                O = v;
              default:
                a.hasOwnProperty(u) || Qt(
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
                u !== v && (Lt = !0), _ = u;
                break;
              case "defaultValue":
                u !== v && (Lt = !0), o = u;
                break;
              case "multiple":
                u !== v && (Lt = !0), i = u;
              default:
                u !== v && Qt(
                  t,
                  e,
                  n,
                  u,
                  a,
                  v
                );
            }
        e = o, l = i, a = O, _ != null ? rn(t, !!l, _, !1) : !!a != !!l && (e != null ? rn(t, !!l, e, !0) : rn(t, !!l, l ? [] : "", !1));
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
                Qt(t, e, o, null, a, n);
            }
        for (i in a)
          if (n = a[i], u = l[i], a.hasOwnProperty(i) && (n != null || u != null))
            switch (i) {
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
                n !== u && Qt(t, e, i, n, a, u);
            }
        Ko(t, _, O);
        return;
      case "option":
        for (var Q in l)
          _ = l[Q], l.hasOwnProperty(Q) && _ != null && !a.hasOwnProperty(Q) && (Q === "selected" ? t.selected = !1 : Qt(
            t,
            e,
            Q,
            null,
            a,
            _
          ));
        for (v in a)
          _ = a[v], O = l[v], a.hasOwnProperty(v) && _ !== O && (_ != null || O != null) && (v === "selected" ? (_ !== O && (Lt = !0), t.selected = _ && typeof _ != "function" && typeof _ != "symbol") : Qt(
            t,
            e,
            v,
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
        for (var et in l)
          _ = l[et], l.hasOwnProperty(et) && _ != null && !a.hasOwnProperty(et) && Qt(t, e, et, null, a, _);
        for (N in a)
          if (_ = a[N], O = l[N], a.hasOwnProperty(N) && _ !== O && (_ != null || O != null))
            switch (N) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (_ != null)
                  throw Error(s(137, e));
                break;
              default:
                Qt(
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
          for (z in a)
            _ = a[z], O = l[z], !a.hasOwnProperty(z) || _ === O || _ === void 0 && O === void 0 || Br(
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
      _ = l[T], l.hasOwnProperty(T) && _ != null && !a.hasOwnProperty(T) && Qt(t, e, T, null, a, _);
    for (U in a)
      _ = a[U], O = l[U], !a.hasOwnProperty(U) || _ === O || _ == null && O == null || Qt(t, e, U, _, a, O);
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
  function Mg() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, e = 0, l = performance.getEntriesByType("resource"), a = 0; a < l.length; a++) {
        var n = l[a], u = n.transferSize, i = n.initiatorType, o = n.duration;
        if (u && o && lh(i)) {
          for (i = 0, o = n.responseEnd, a += 1; a < l.length; a++) {
            var v = l[a], N = v.startTime;
            if (N > o) break;
            var z = v.transferSize, U = v.initiatorType;
            z && lh(U) && (v = v.responseEnd, i += z * (v < o ? 1 : (o - N) / (v - N)));
          }
          if (--a, e += 8 * (u + i) / (n.duration / 1e3), t++, 10 < t) break;
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
    ).createElement(t), l[Te] = a, l[He] = e, Oe(l, t, e), ye(l), l;
  }
  function Yr(t, e) {
    return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.children == "bigint" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
  }
  var qr = null;
  function Og() {
    var t = window.event;
    return t && t.type === "popstate" ? t === qr ? !1 : (qr = t, !0) : (qr = null, !1);
  }
  var Gr = typeof setTimeout == "function" ? setTimeout : void 0, zg = typeof clearTimeout == "function" ? clearTimeout : void 0, ih = typeof Promise == "function" ? Promise : void 0, ch = typeof requestAnimationFrame == "function" ? requestAnimationFrame : Gr, Cg = typeof queueMicrotask == "function" ? queueMicrotask : typeof ih < "u" ? function(t) {
    return ih.resolve(null).then(t).catch(Ag);
  } : Gr;
  function Ag(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function va(t) {
    return t === "head";
  }
  function sh(t, e) {
    var l = e, a = 0;
    do {
      var n = l.nextSibling;
      if (t.removeChild(l), n && n.nodeType === 8)
        if (l = n.data, l === "/$" || l === "/&") {
          if (a === 0) {
            t.removeChild(n), Jn(e);
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
            var i = u.nextSibling, o = u.nodeName;
            u[tu] || o === "SCRIPT" || o === "STYLE" || o === "LINK" && u.rel.toLowerCase() === "stylesheet" || l.removeChild(u), u = i;
          }
        } else
          l === "body" && kr(t.ownerDocument.body);
      l = n;
    } while (l);
    Jn(e);
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
  function jg(t, e, l) {
    return l = l.ownerDocument.defaultView, {
      rect: t,
      abs: e.position === "absolute" || e.position === "fixed",
      clip: e.clipPath !== "none" || e.overflow !== "visible" || e.filter !== "none" || e.mask !== "none" || e.mask !== "none" || e.borderRadius !== "0px",
      view: 0 <= t.bottom && 0 <= t.right && t.top <= l.innerHeight && t.left <= l.innerWidth
    };
  }
  function Xr(t) {
    var e = t.getBoundingClientRect(), l = getComputedStyle(t);
    return jg(e, l, t);
  }
  function Rg(t) {
    return t.documentElement.clientHeight;
  }
  function wg(t) {
    this.addEventListener("load", t), this.addEventListener("error", t);
  }
  function Dg(t, e, l, a, n, u, i, o, v) {
    var N = e.nodeType === 9 ? e : e.ownerDocument;
    try {
      var z = N.startViewTransition({
        update: function() {
          var _ = N.defaultView, O = _.navigation && _.navigation.transition, Q = N.fonts.status;
          a();
          var et = [];
          if (Q === "loaded" && (Rg(N), N.fonts.status === "loading" && et.push(N.fonts.ready)), Q = et.length, t !== null)
            for (var St = t.suspenseyImages, T = 0, b = 0; b < St.length; b++) {
              var M = St[b];
              if (!M.complete) {
                var D = M.getBoundingClientRect();
                if (0 < D.bottom && 0 < D.right && D.top < _.innerHeight && D.left < _.innerWidth) {
                  if (T += Rh(M), T > gc) {
                    et.length = Q;
                    break;
                  }
                  M = new Promise(
                    wg.bind(M)
                  ), et.push(M);
                }
              }
            }
          if (0 < et.length)
            return _ = Promise.race([
              Promise.all(et),
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
      var U = [];
      return z.ready.then(
        function() {
          for (var _ = N.documentElement.getAnimations({
            subtree: !0
          }), O = 0; O < _.length; O++) {
            var Q = _[O], et = Q.effect, St = et.pseudoElement;
            if (St != null && St.startsWith("::view-transition")) {
              U.push(Q), Q = et.getKeyframes();
              for (var T = St = void 0, b = !0, M = 0; M < Q.length; M++) {
                var D = Q[M], F = D.width;
                if (St === void 0) St = F;
                else if (St !== F) {
                  b = !1;
                  break;
                }
                if (F = D.height, T === void 0) T = F;
                else if (T !== F) {
                  b = !1;
                  break;
                }
                delete D.width, delete D.height, D.transform === "none" && delete D.transform;
              }
              b && St !== void 0 && T !== void 0 && (et.setKeyframes(Q), b = getComputedStyle(
                et.target,
                et.pseudoElement
              ), b.width !== St || b.height !== T) && (b = Q[0], b.width = St, b.height = T, b = Q[Q.length - 1], b.width = St, b.height = T, et.setKeyframes(Q));
            }
          }
          i();
        },
        function(_) {
          N.__reactViewTransition === z && (N.__reactViewTransition = null);
          try {
            typeof _ == "object" && _ !== null && _.name === "InvalidStateError" && (_.message === "View transition was skipped because document visibility state is hidden." || _.message === "Skipping view transition because document visibility state has become hidden." || _.message === "Skipping view transition because viewport size changed." || _.message === "Transition was aborted because of invalid state") && (_ = null), _ !== null && v(_);
          } finally {
            a(), n(), i();
          }
        }
      ), z.finished.finally(function() {
        for (var _ = 0; _ < U.length; _++)
          U[_].cancel();
        N.__reactViewTransition === z && (N.__reactViewTransition = null), o();
      }), z;
    } catch {
      return a(), n(), i(), null;
    }
  }
  function ka(t, e) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + t + "(" + e + ")";
  }
  ka.prototype.animate = function(t, e) {
    return e = typeof e == "number" ? { duration: e } : Z({}, e), e.pseudoElement = this._selector, this._scope.animate(t, e);
  }, ka.prototype.getAnimations = function() {
    for (var t = this._scope, e = this._selector, l = t.getAnimations({ subtree: !0 }), a = [], n = 0; n < l.length; n++) {
      var u = l[n].effect;
      u !== null && u.target === t && u.pseudoElement === e && a.push(l[n]);
    }
    return a;
  }, ka.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function dh(t) {
    return {
      name: t,
      group: new ka("group", t),
      imagePair: new ka("image-pair", t),
      old: new ka("old", t),
      new: new ka("new", t)
    };
  }
  function Fe(t) {
    this._fragmentFiber = t, this._observers = this._eventListeners = null;
  }
  Fe.prototype.addEventListener = function(t, e, l) {
    var a = null, n = null;
    if (!(l != null && typeof l != "boolean" && (a = l.signal || null, a !== null && a.aborted))) {
      this._eventListeners === null && (this._eventListeners = []);
      var u = this._eventListeners;
      if (hh(u, t, e, l) === -1) {
        var i = this, o = e;
        l != null && typeof l != "boolean" && l.once === !0 && (o = function(v) {
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
        ), a.addEventListener("abort", n, { once: !0 }), n = a.removeEventListener.bind(a, "abort", n)), a = Gn(l), u.push({
          type: t,
          listener: e,
          optionsOrUseCapture: l,
          attachedListener: o,
          cleanup: n
        }), h(
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
    return I(t).addEventListener(
      e,
      l,
      a
    ), !1;
  }
  Fe.prototype.removeEventListener = function(t, e, l) {
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
      n = Gn(n.optionsOrUseCapture), h(
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
    return I(t).removeEventListener(
      e,
      l,
      a
    ), !1;
  }
  function Gn(t) {
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
  Fe.prototype.dispatchEvent = function(t) {
    var e = j(
      this._fragmentFiber
    );
    if (e === null) return !0;
    e = I(e);
    var l = this._eventListeners;
    if (l !== null && 0 < l.length || !t.bubbles) {
      var a = e.nodeType === 9 ? e.createComment("") : document.createTextNode("");
      if (l)
        for (var n = 0; n < l.length; n++) {
          var u = l[n];
          a.addEventListener(
            u.type,
            u.attachedListener,
            Gn(u.optionsOrUseCapture)
          );
        }
      if (e.appendChild(a), t = a.dispatchEvent(t), l)
        for (n = 0; n < l.length; n++)
          u = l[n], a.removeEventListener(
            u.type,
            u.attachedListener,
            Gn(u.optionsOrUseCapture)
          );
      return e.removeChild(a), t;
    }
    return e.dispatchEvent(t);
  }, Fe.prototype.focus = function(t) {
    h(
      this._fragmentFiber.child,
      !0,
      vh,
      t,
      void 0,
      void 0
    );
  };
  function vh(t, e) {
    return t.tag === 6 ? !1 : (t = I(t), $g(t, e));
  }
  Fe.prototype.focusLast = function(t) {
    var e = [];
    h(
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
  Fe.prototype.blur = function() {
    var t = j(
      this._fragmentFiber
    );
    t !== null && (t = I(t), t = Bu(t).activeElement, t !== null && h(
      this._fragmentFiber.child,
      !1,
      Hg,
      t,
      void 0,
      void 0
    ));
  };
  function Hg(t, e) {
    return t.tag === 6 ? !1 : (t = I(t), t === e || t.contains(e) ? (e.blur(), !0) : !1);
  }
  Fe.prototype.observeUsing = function(t) {
    this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(t), h(
      this._fragmentFiber.child,
      !1,
      Lg,
      t,
      void 0,
      void 0
    );
  };
  function Lg(t, e) {
    return t.tag === 6 || (t = I(t), e.observe(t)), !1;
  }
  Fe.prototype.unobserveUsing = function(t) {
    var e = this._observers;
    if (e !== null && e.has(t)) {
      e.delete(t), h(
        this._fragmentFiber.child,
        !1,
        Yg,
        t,
        void 0,
        void 0
      );
      for (var l = e = 0; l < ml.length; l++) {
        var a = ml[l];
        a.fragmentInstance === this && a.observer === t ? t.unobserve(a.instance) : ml[e++] = a;
      }
      ml.length = e;
    }
  };
  function Yg(t, e) {
    return t.tag === 6 || (t = I(t), e.unobserve(t)), !1;
  }
  var ml = [], Qr = !1;
  function qg(t, e, l) {
    ml.push({
      fragmentInstance: t,
      observer: e,
      instance: l
    }), Qr || (Qr = !0, kg(function() {
      Qr = !1;
      var a = ml;
      ml = [];
      for (var n = 0; n < a.length; n++) {
        var u = a[n];
        u.observer.unobserve(u.instance);
      }
    }));
  }
  Fe.prototype.getClientRects = function() {
    var t = [];
    return h(
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
      t = I(t), e.push.apply(e, t.getClientRects());
    return !1;
  }
  Fe.prototype.getRootNode = function(t) {
    var e = j(
      this._fragmentFiber
    );
    return e === null ? this : I(e).getRootNode(t);
  }, Fe.prototype.compareDocumentPosition = function(t) {
    var e = j(
      this._fragmentFiber
    );
    if (e === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var l = [];
    h(
      this._fragmentFiber.child,
      !1,
      Vr,
      l,
      void 0,
      void 0
    );
    var a = I(e);
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
      return l === t ? n = Node.DOCUMENT_POSITION_CONTAINS : a & Node.DOCUMENT_POSITION_CONTAINED_BY && (l = J(e)[1], l === null ? n = Node.DOCUMENT_POSITION_PRECEDING : (t = I(l).compareDocumentPosition(
        t
      ), n = t === 0 || t & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), n |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    e = I(l[0]), n = I(l[l.length - 1]);
    var u = B(this._fragmentFiber) ? e.parentElement : a;
    if (u == null)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    a = u.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_CONTAINED_BY, u = u.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var i = e.compareDocumentPosition(t), o = n.compareDocumentPosition(t), v = i & Node.DOCUMENT_POSITION_CONTAINED_BY || o & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return o = a && u && i & Node.DOCUMENT_POSITION_FOLLOWING && o & Node.DOCUMENT_POSITION_PRECEDING, e = a && e === t || u && n === t || v || o ? Node.DOCUMENT_POSITION_CONTAINED_BY : !a && e === t || !u && n === t ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : i, e & Node.DOCUMENT_POSITION_DISCONNECTED || e & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || Xg(
      e,
      this._fragmentFiber,
      l[0],
      l[l.length - 1],
      t
    ) ? e : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function Xg(t, e, l, a, n) {
    var u = za(n);
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
    return t & Node.DOCUMENT_POSITION_PRECEDING ? ((e = !!u) && !(e = u === l) && (e = vt(
      l,
      u,
      Tt
    ), e === null ? e = !1 : (h(
      e,
      !0,
      K,
      u,
      l
    ), u = dt, dt = null, e = u !== null)), e) : t & Node.DOCUMENT_POSITION_FOLLOWING ? ((e = !!u) && !(e = u === a) && (e = vt(
      a,
      u,
      Tt
    ), e === null ? e = !1 : (h(
      e,
      !0,
      Nt,
      u,
      a
    ), u = dt, V = dt = null, e = u !== null)), e) : !1;
  }
  function gh(t, e) {
    var l = t.ownerDocument.createRange();
    l.selectNodeContents(t), t = l.getBoundingClientRect(), window.scrollTo(
      window.scrollX + t.left,
      e ? window.scrollY + t.top : window.scrollY + t.bottom - window.innerHeight
    );
  }
  Fe.prototype.scrollIntoView = function(t) {
    if (typeof t == "object") throw Error(s(566));
    var e = [];
    h(
      this._fragmentFiber.child,
      !1,
      Vr,
      e,
      void 0,
      void 0
    );
    var l = t !== !1;
    if (e.length === 0) {
      var a = J(
        this._fragmentFiber
      );
      if (a = l ? a[1] || a[0] || j(this._fragmentFiber) : a[0] || a[1], a === null) return;
      if (a.tag === 6) {
        t = I(a), gh(t, l);
        return;
      }
      if (a = I(a), a.nodeType !== 9) {
        if (a.nodeType === 11) {
          l = "host" in a ? a.host : null, l !== null && l.scrollIntoView(t);
          return;
        }
        a.scrollIntoView(t);
      }
    }
    for (a = l ? e.length - 1 : 0; a !== (l ? -1 : e.length); ) {
      var n = e[a];
      n.tag === 6 ? (n = I(n), gh(n, l)) : I(n).scrollIntoView(t), a += l ? -1 : 1;
    }
  };
  function Vg(t, e) {
    return t = I(t), yh(t, e), !1;
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
          Gn(n.optionsOrUseCapture)
        );
      }
    t.nodeType !== 3 && (l = e._observers, l !== null && l.forEach(function(u) {
      for (var i = 0, o = 0; o < ml.length; o++) {
        var v = ml[o];
        (v.fragmentInstance !== e || v.observer !== u || v.instance !== t) && (ml[i++] = v);
      }
      ml.length = i, u.observe(t);
    }), yh(t, e));
  }
  function Qg(t, e) {
    var l = e._eventListeners;
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var n = l[a];
        t.removeEventListener(
          n.type,
          n.attachedListener,
          Gn(n.optionsOrUseCapture)
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
  function Zr(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var l = e;
      switch (e = e.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Zr(l), ni(l);
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
      if (t = ul(t.nextSibling), t === null) break;
    }
    return null;
  }
  function Kg(t, e, l) {
    if (e === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l || (t = ul(t.nextSibling), t === null)) return null;
    return t;
  }
  function ph(t, e) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = ul(t.nextSibling), t === null)) return null;
    return t;
  }
  function Kr(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Jr(t) {
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
  function ul(t) {
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
            return ul(t.nextSibling);
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
    ch(function() {
      ch(function(e) {
        return t(e);
      });
    });
  }
  function Th(t, e, l) {
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
  function Eh(t, e, l) {
    for (var a in l) {
      var n = l[a];
      l.hasOwnProperty(a) && n != null && Qt(t, e, a, null, Ng, n);
    }
    l.dangerouslySetInnerHTML != null && (t.textContent = ""), t.onclick === pl && (t.onclick = null), ni(t);
  }
  function kr(t) {
    for (var e = t.attributes; e.length; )
      t.removeAttributeNode(e[0]);
    ni(t);
  }
  var il = /* @__PURE__ */ new Map(), Nh = /* @__PURE__ */ new Set();
  function Hu(t) {
    if (typeof t.getRootNode == "function") {
      var e = t.getRootNode();
      if (e.nodeType === 9 || e.nodeType === 11) return e;
    }
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  var Jl = ut.d;
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
    var t = Jl.f(), e = cc();
    return t || e;
  }
  function Wg(t) {
    var e = un(t);
    e !== null && e.tag === 5 && e.type === "form" ? Md(e) : Jl.r(t);
  }
  var Xn = typeof document > "u" ? null : document;
  function xh(t, e, l) {
    var a = Xn;
    if (a && typeof e == "string" && e) {
      var n = Ie(e);
      n = 'link[rel="' + t + '"][href="' + n + '"]', typeof l == "string" && (n += '[crossorigin="' + l + '"]'), Nh.has(n) || (Nh.add(n), t = { rel: t, crossOrigin: l, href: e }, a.querySelector(n) === null && (e = a.createElement("link"), Oe(e, "link", t), ye(e), a.head.appendChild(e)));
    }
  }
  function Ig(t) {
    Jl.D(t), xh("dns-prefetch", t, null);
  }
  function Pg(t, e) {
    Jl.C(t, e), xh("preconnect", t, e);
  }
  function ty(t, e, l) {
    Jl.L(t, e, l);
    var a = Xn;
    if (a && t && e) {
      var n = 'link[rel="preload"][as="' + Ie(e) + '"]';
      e === "image" && l && l.imageSrcSet ? (n += '[imagesrcset="' + Ie(
        l.imageSrcSet
      ) + '"]', typeof l.imageSizes == "string" && (n += '[imagesizes="' + Ie(
        l.imageSizes
      ) + '"]')) : n += '[href="' + Ie(t) + '"]';
      var u = n;
      switch (e) {
        case "style":
          u = Vn(t);
          break;
        case "script":
          u = Qn(t);
      }
      if (!(il.has(u) || (t = Z(
        {
          rel: "preload",
          href: e === "image" && l && l.imageSrcSet ? void 0 : t,
          as: e
        },
        l
      ), il.set(u, t), a.querySelector(n) !== null || e === "style" && a.querySelector(Lu(u)) || e === "script" && a.querySelector(Yu(u))))) {
        var i = a.createElement("link");
        Oe(i, "link", t), e === "style" && (i[ai] = !0, i.onload = i.onerror = function() {
          Ho(i);
        }), ye(i), a.head.appendChild(i);
      }
    }
  }
  function ey(t, e) {
    Jl.m(t, e);
    var l = Xn;
    if (l && t) {
      var a = e && typeof e.as == "string" ? e.as : "script", n = 'link[rel="modulepreload"][as="' + Ie(a) + '"][href="' + Ie(t) + '"]', u = n;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = Qn(t);
      }
      if (!il.has(u) && (t = Z({ rel: "modulepreload", href: t }, e), il.set(u, t), l.querySelector(n) === null)) {
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
        a = l.createElement("link"), Oe(a, "link", t), ye(a), l.head.appendChild(a);
      }
    }
  }
  function ly(t, e, l) {
    Jl.S(t, e, l);
    var a = Xn;
    if (a && t) {
      var n = cn(a).hoistableStyles, u = Vn(t);
      e = e || "default";
      var i = n.get(u);
      if (!i) {
        var o = { loading: 0, preload: null };
        if (i = a.querySelector(
          Lu(u)
        ))
          o.loading = 5;
        else {
          t = Z(
            { rel: "stylesheet", href: t, "data-precedence": e },
            l
          ), (l = il.get(u)) && Fr(t, l);
          var v = i = a.createElement("link");
          ye(v), Oe(v, "link", t), v._p = new Promise(function(N, z) {
            v.onload = N, v.onerror = z;
          }), v.addEventListener("load", function() {
            o.loading |= 1;
          }), v.addEventListener("error", function() {
            o.loading |= 2;
          }), o.loading |= 4, hc(i, e, a);
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
    Jl.X(t, e);
    var l = Xn;
    if (l && t) {
      var a = cn(l).hoistableScripts, n = Qn(t), u = a.get(n);
      u || (u = l.querySelector(Yu(n)), u || (t = Z({ src: t, async: !0 }, e), (e = il.get(n)) && Wr(t, e), u = l.createElement("script"), ye(u), Oe(u, "link", t), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function ny(t, e) {
    Jl.M(t, e);
    var l = Xn;
    if (l && t) {
      var a = cn(l).hoistableScripts, n = Qn(t), u = a.get(n);
      u || (u = l.querySelector(Yu(n)), u || (t = Z({ src: t, async: !0, type: "module" }, e), (e = il.get(n)) && Wr(t, e), u = l.createElement("script"), ye(u), Oe(u, "link", t), l.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function Mh(t, e, l, a) {
    var n = (n = yt.current) ? Hu(n) : null;
    if (!n) throw Error(s(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string" ? (l = Vn(l.href), e = cn(
          n
        ).hoistableStyles, a = e.get(l), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, e.set(l, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          t = Vn(l.href);
          var u = cn(
            n
          ).hoistableStyles, i = u.get(t);
          if (i || (n = n.ownerDocument || n, i = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(t, i), (u = n.querySelector(
            Lu(t)
          )) ? u._p || (i.instance = u, i.state.loading = 5) : (u = il.get(t), u || (u = {
            rel: "preload",
            as: "style",
            href: l.href,
            crossOrigin: l.crossOrigin,
            integrity: l.integrity,
            media: l.media,
            hrefLang: l.hrefLang,
            referrerPolicy: l.referrerPolicy
          }, il.set(t, u)), uy(
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
        return e = l.async, l = l.src, typeof l == "string" && e && typeof e != "function" && typeof e != "symbol" ? (l = Qn(l), e = cn(
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
  function Vn(t) {
    return 'href="' + Ie(t) + '"';
  }
  function Lu(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function Oh(t) {
    return Z({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function uy(t, e, l, a) {
    if (e = t.querySelector(
      'link[rel="preload"][as="style"][' + e + "]"
    )) {
      if (e[ai] !== !0) {
        a.loading = 1;
        return;
      }
    } else
      e = t.createElement("link"), e[ai] = !0, e.onload = e.onerror = Ho.bind(null, e), Oe(e, "link", l), ye(e), t.head.appendChild(e);
    a.preload = e, e.addEventListener("load", function() {
      return a.loading |= 1;
    }), e.addEventListener("error", function() {
      return a.loading |= 2;
    });
  }
  function Qn(t) {
    return '[src="' + Ie(t) + '"]';
  }
  function Yu(t) {
    return "script[async]" + t;
  }
  function zh(t, e, l) {
    if (e.count++, e.instance === null)
      switch (e.type) {
        case "style":
          var a = t.querySelector(
            'style[data-href~="' + Ie(l.href) + '"]'
          );
          if (a)
            return e.instance = a, ye(a), a;
          var n = Z({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          return a = (t.ownerDocument || t).createElement(
            "style"
          ), ye(a), Oe(a, "style", n), hc(a, l.precedence, t), e.instance = a;
        case "stylesheet":
          n = Vn(l.href);
          var u = t.querySelector(
            Lu(n)
          );
          if (u)
            return e.state.loading |= 4, e.instance = u, ye(u), u;
          a = Oh(l), (n = il.get(n)) && Fr(a, n), u = (t.ownerDocument || t).createElement("link"), ye(u);
          var i = u;
          return i._p = new Promise(function(o, v) {
            i.onload = o, i.onerror = v;
          }), Oe(u, "link", a), e.state.loading |= 4, hc(u, l.precedence, t), e.instance = u;
        case "script":
          return u = Qn(l.src), (n = t.querySelector(
            Yu(u)
          )) ? (e.instance = n, ye(n), n) : (a = l, (n = il.get(u)) && (a = Z({}, l), Wr(a, n)), t = t.ownerDocument || t, n = t.createElement("script"), ye(n), Oe(n, "link", a), t.head.appendChild(n), e.instance = n);
        case "void":
          return null;
        default:
          throw Error(s(443, e.type));
      }
    else
      e.type === "stylesheet" && (e.state.loading & 4) === 0 && (a = e.instance, e.state.loading |= 4, hc(a, l.precedence, t));
    return e.instance;
  }
  function hc(t, e, l) {
    for (var a = l.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), n = a.length ? a[a.length - 1] : null, u = n, i = 0; i < a.length; i++) {
      var o = a[i];
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
  var vc = null;
  function Ch(t, e, l) {
    if (vc === null) {
      var a = /* @__PURE__ */ new Map(), n = vc = /* @__PURE__ */ new Map();
      n.set(l, a);
    } else
      n = vc, a = n.get(l), a || (a = /* @__PURE__ */ new Map(), n.set(l, a));
    if (a.has(t)) return a;
    for (a.set(t, null), l = l.getElementsByTagName(t), n = 0; n < l.length; n++) {
      var u = l[n];
      if (!(u[tu] || u[Te] || t === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var i = u.getAttribute(e) || "";
        i = t + i;
        var o = a.get(i);
        o ? o.push(u) : a.set(i, [u]);
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
  function Ah(t, e) {
    return t === "img" && e.src != null && e.src !== "" && e.onLoad == null && e.loading !== "lazy";
  }
  function jh(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function Rh(t) {
    return (t.width || 100) * (t.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
  }
  function wh(t, e) {
    typeof e.decode == "function" && (t.imgCount++, e.complete || (t.imgBytes += Rh(e), t.suspenseyImages.push(e)), t = ry.bind(t), e.decode().then(t, t));
  }
  function cy(t, e, l, a) {
    if (l.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var n = Vn(a.href), u = e.querySelector(
          Lu(n)
        );
        if (u) {
          e = u._p, e !== null && typeof e == "object" && typeof e.then == "function" && (t.count++, t = qu.bind(t), e.then(t, t)), l.state.loading |= 4, l.instance = u, ye(u);
          return;
        }
        u = e.ownerDocument || e, a = Oh(a), (n = il.get(n)) && Fr(a, n), u = u.createElement("link"), ye(u);
        var i = u;
        i._p = new Promise(function(o, v) {
          i.onload = o, i.onerror = v;
        }), Oe(u, "link", a), l.instance = u;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(l, e), (e = l.state.preload) && (l.state.loading & 3) === 0 && (t.count++, l = qu.bind(t), e.addEventListener("load", l), e.addEventListener("error", l));
    }
  }
  var gc = 0;
  function sy(t, e) {
    return t.stylesheets && t.count === 0 && bc(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(l) {
      var a = setTimeout(function() {
        if (t.stylesheets && bc(t, t.stylesheets), t.unsuspend) {
          var u = t.unsuspend;
          t.unsuspend = null, u();
        }
      }, 6e4 + e);
      0 < t.imgBytes && gc === 0 && (gc = 62500 * Mg());
      var n = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && bc(t, t.stylesheets), t.unsuspend)) {
            var u = t.unsuspend;
            t.unsuspend = null, u();
          }
        },
        (t.imgBytes > gc ? 50 : 800) + e
      );
      return t.unsuspend = l, function() {
        t.unsuspend = null, clearTimeout(a), clearTimeout(n);
      };
    } : null;
  }
  function Dh(t) {
    if (t.count === 0 && (t.imgCount === 0 || !t.waitingForImages)) {
      if (t.stylesheets) bc(t, t.stylesheets);
      else if (t.unsuspend) {
        var e = t.unsuspend;
        t.unsuspend = null, e();
      }
    }
  }
  function qu() {
    this.count--, Dh(this);
  }
  function ry() {
    this.imgCount--, Dh(this);
  }
  var yc = null;
  function bc(t, e) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, yc = /* @__PURE__ */ new Map(), e.forEach(oy, t), yc = null, qu.call(t));
  }
  function oy(t, e) {
    if (!(e.state.loading & 4)) {
      var l = yc.get(t);
      if (l) var a = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), yc.set(t, l);
        for (var n = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < n.length; u++) {
          var i = n[u];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (l.set(i.dataset.precedence, i), a = i);
        }
        a && l.set(null, a);
      }
      n = e.instance, i = n.getAttribute("data-precedence"), u = l.get(i) || a, u === a && l.set(null, n), l.set(i, n), this.count++, a = qu.bind(this), n.addEventListener("load", a), n.addEventListener("error", a), u ? u.parentNode.insertBefore(n, u.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(n, t.firstChild)), e.state.loading |= 4;
    }
  }
  var Zn = {
    $$typeof: bt,
    Provider: null,
    Consumer: null,
    _currentValue: ce,
    _currentValue2: ce,
    _threadCount: 0
  };
  function fy(t, e, l, a, n, u, i, o, v) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Rc(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Rc(0), this.hiddenUpdates = Rc(null), this.identifierPrefix = a, this.onUncaughtError = n, this.onCaughtError = u, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = v, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Uh(t, e, l, a, n, u, i, o, v, N, z, U) {
    return t = new fy(
      t,
      e,
      l,
      i,
      v,
      N,
      z,
      U,
      o
    ), e = 1, u === !0 && (e |= 24), u = Le(3, null, null, e), t.current = u, u.stateNode = t, e = ms(), e.refCount++, t.pooledCache = e, e.refCount++, u.memoizedState = {
      element: a,
      isDehydrated: l,
      cache: e
    }, ys(u), t;
  }
  function Bh(t) {
    return t ? (t = yn, t) : yn;
  }
  function Hh(t, e, l, a, n, u) {
    n = Bh(n), a.context === null ? a.context = n : a.pendingContext = n, a = aa(e), a.payload = { element: l }, u = u === void 0 ? null : u, u !== null && (a.callback = u), l = na(t, a, e), l !== null && (Xe(l, t, e), yu(l, t, e));
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
      var e = Ra(t, 67108864);
      e !== null && Xe(e, t, 67108864), Pr(t, 67108864);
    }
  }
  function qh(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = ke();
      e = wc(e);
      var l = Ra(t, e);
      l !== null && Xe(l, t, e), Pr(t, e);
    }
  }
  var Kn = !0;
  function dy(t, e, l, a) {
    var n = k.T;
    k.T = null;
    var u = ut.p;
    try {
      ut.p = 2, to(t, e, l, a);
    } finally {
      ut.p = u, k.T = n;
    }
  }
  function my(t, e, l, a) {
    var n = k.T;
    k.T = null;
    var u = ut.p;
    try {
      ut.p = 8, to(t, e, l, a);
    } finally {
      ut.p = u, k.T = n;
    }
  }
  function to(t, e, l, a) {
    if (Kn) {
      var n = eo(a);
      if (n === null)
        Ur(
          t,
          e,
          a,
          pc,
          l
        ), Xh(t, a);
      else if (vy(
        n,
        t,
        e,
        l,
        a
      ))
        a.stopPropagation();
      else if (Xh(t, a), e & 4 && -1 < hy.indexOf(t)) {
        for (; n !== null; ) {
          var u = un(n);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var i = Oa(u.pendingLanes);
                  if (i !== 0) {
                    var o = u;
                    for (o.pendingLanes |= 2, o.entangledLanes |= 2; i; ) {
                      var v = 1 << 31 - ve(i);
                      o.entanglements[1] |= v, i &= ~v;
                    }
                    Cl(u), (qt & 6) === 0 && (nc = Kt() + 500, wu(0));
                  }
                }
                break;
              case 31:
              case 13:
                o = Ra(u, 2), o !== null && Xe(o, u, 2), cc(), Pr(u, 2);
            }
          if (u = eo(a), u === null && Ur(
            t,
            e,
            a,
            pc,
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
  var pc = null;
  function lo(t) {
    if (pc = null, t = za(t), t !== null) {
      var e = m(t);
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
    return pc = t, null;
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
        switch (Ce()) {
          case _e:
            return 2;
          case bl:
            return 8;
          case an:
          case Fn:
            return 32;
          case Iu:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var ao = !1, ga = null, ya = null, ba = null, Gu = /* @__PURE__ */ new Map(), Xu = /* @__PURE__ */ new Map(), pa = [], hy = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Xh(t, e) {
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
    }, e !== null && (e = un(e), e !== null && Yh(e)), t) : (t.eventSystemFlags |= a, e = t.targetContainers, n !== null && e.indexOf(n) === -1 && e.push(n), t);
  }
  function vy(t, e, l, a, n) {
    switch (e) {
      case "focusin":
        return ga = Vu(
          ga,
          t,
          e,
          l,
          a,
          n
        ), !0;
      case "dragenter":
        return ya = Vu(
          ya,
          t,
          e,
          l,
          a,
          n
        ), !0;
      case "mouseover":
        return ba = Vu(
          ba,
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
    var e = za(t.target);
    if (e !== null) {
      var l = m(e);
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
  function Sc(t) {
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
        return e = un(l), e !== null && Yh(e), t.blockedOn = l, !1;
      e.shift();
    }
    return !0;
  }
  function Qh(t, e, l) {
    Sc(t) && l.delete(e);
  }
  function gy() {
    ao = !1, ga !== null && Sc(ga) && (ga = null), ya !== null && Sc(ya) && (ya = null), ba !== null && Sc(ba) && (ba = null), Gu.forEach(Qh), Xu.forEach(Qh);
  }
  function _c(t, e) {
    t.blockedOn === e && (t.blockedOn = null, ao || (ao = !0, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      gy
    )));
  }
  var Tc = null;
  function Zh(t) {
    Tc !== t && (Tc = t, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      function() {
        Tc === t && (Tc = null);
        for (var e = 0; e < t.length; e += 3) {
          var l = t[e], a = t[e + 1], n = t[e + 2];
          if (typeof a != "function") {
            if (lo(a || l) === null)
              continue;
            break;
          }
          var u = un(l);
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
  function Jn(t) {
    function e(v) {
      return _c(v, t);
    }
    ga !== null && _c(ga, t), ya !== null && _c(ya, t), ba !== null && _c(ba, t), Gu.forEach(e), Xu.forEach(e);
    for (var l = 0; l < pa.length; l++) {
      var a = pa[l];
      a.blockedOn === t && (a.blockedOn = null);
    }
    for (; 0 < pa.length && (l = pa[0], l.blockedOn === null); )
      Vh(l), l.blockedOn === null && pa.shift();
    if (l = (t.ownerDocument || t).$$reactFormReplay, l != null)
      for (a = 0; a < l.length; a += 3) {
        var n = l[a], u = l[a + 1], i = n[He] || null;
        if (typeof u == "function")
          i || Zh(l);
        else if (i) {
          var o = null;
          if (u && u.hasAttribute("formAction")) {
            if (n = u, i = u[He] || null)
              o = i.formAction;
            else if (lo(n) !== null) continue;
          } else o = i.action;
          typeof o == "function" ? l[a + 1] = o : (l.splice(a, 3), a -= 3), Zh(l);
        }
      }
  }
  function Kh() {
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
  function no(t) {
    this._internalRoot = t;
  }
  Ec.prototype.render = no.prototype.render = function(t) {
    var e = this._internalRoot;
    if (e === null) throw Error(s(409));
    var l = e.current, a = ke();
    Hh(l, a, t, e, null, null);
  }, Ec.prototype.unmount = no.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var e = t.containerInfo;
      Hh(t.current, 2, null, t, null, null), cc(), e[nn] = null;
    }
  };
  function Ec(t) {
    this._internalRoot = t;
  }
  Ec.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var e = wo();
      t = { blockedOn: null, target: t, priority: e };
      for (var l = 0; l < pa.length && e !== 0 && e < pa[l].priority; l++) ;
      pa.splice(l, 0, t), l === 0 && Vh(t);
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
  ut.findDOMNode = function(t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function" ? Error(s(188)) : (t = Object.keys(t).join(","), Error(s(268, t)));
    return t = A(e), t = t !== null ? E(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var yy = {
    bundleType: 0,
    version: "19.3.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: k,
    reconcilerVersion: "19.3.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Nc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Nc.isDisabled && Nc.supportsFiber)
      try {
        W = Nc.inject(
          yy
        ), Rt = Nc;
      } catch {
      }
  }
  return Zu.createRoot = function(t, e) {
    if (!g(t)) throw Error(s(299));
    var l = !1, a = "", n = Bd, u = Hd, i = Ld;
    return e != null && (e.unstable_strictMode === !0 && (l = !0), e.identifierPrefix !== void 0 && (a = e.identifierPrefix), e.onUncaughtError !== void 0 && (n = e.onUncaughtError), e.onCaughtError !== void 0 && (u = e.onCaughtError), e.onRecoverableError !== void 0 && (i = e.onRecoverableError)), e = Uh(
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
      Kh
    ), t[nn] = e.current, Dr(t), new no(e);
  }, Zu.hydrateRoot = function(t, e, l) {
    if (!g(t)) throw Error(s(299));
    var a = !1, n = "", u = Bd, i = Hd, o = Ld, v = null;
    return l != null && (l.unstable_strictMode === !0 && (a = !0), l.identifierPrefix !== void 0 && (n = l.identifierPrefix), l.onUncaughtError !== void 0 && (u = l.onUncaughtError), l.onCaughtError !== void 0 && (i = l.onCaughtError), l.onRecoverableError !== void 0 && (o = l.onRecoverableError), l.formState !== void 0 && (v = l.formState)), e = Uh(
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
      o,
      Kh
    ), e.context = Bh(null), l = e.current, a = ke(), a = wc(a), n = aa(a), n.callback = null, na(l, n, a), l = a, e.current.lanes = l, Pn(e, l), Cl(e), t[nn] = e.current, Dr(t), new Ec(e);
  }, Zu.version = "19.3.0", Zu;
}
var a0;
function Oy() {
  if (a0) return co.exports;
  a0 = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (f) {
        console.error(f);
      }
  }
  return c(), co.exports = My(), co.exports;
}
var zy = Oy();
function Cy(c, f) {
  const r = Number.isFinite(f) && f > 0 ? f : 1 / 0, s = c.filter((y) => Number.isFinite(y.start) && y.start >= 0 && y.start < r).slice().sort((y, S) => y.start - S.start);
  let g = r;
  const m = new Array(s.length);
  for (let y = s.length - 1; y >= 0; y -= 1)
    y + 1 < s.length && s[y + 1].start > s[y].start && (g = s[y + 1].start), m[y] = g;
  return s.flatMap((y, S) => {
    const C = m[S], A = Math.min(y.end ?? C, r);
    return !Number.isFinite(A) || A <= y.start ? [] : [{ start: y.start, end: A, text: y.label ?? "" }];
  });
}
function Ay(c, f) {
  return !Number.isFinite(f) || f < 0 ? [] : c.filter((r) => r.start <= f && f < r.end && r.text.trim()).map((r) => r.text);
}
const h0 = 128, v0 = 640;
function Ju(c, f = 144) {
  return Math.max(h0, Math.min(
    v0,
    Number.isFinite(c) ? Math.round(c) : f
  ));
}
function g0(c, f, r) {
  return f ? r ? c : "waveform" : "spectrogram";
}
function jy(c, f, r) {
  return Number.isFinite(c) ? c * (f === 1 ? 16 : f === 2 ? r : 1) : 0;
}
function Ry(c, f) {
  return Math.max(0, Math.min(100, c - Math.max(-240, Math.min(240, f)) * 0.08));
}
function wy(c, f) {
  return Ju(c * Math.exp(-Math.max(-240, Math.min(240, f)) * 2e-3));
}
function n0(c, f, r) {
  return Math.max(0, c * f - r);
}
function Ia(c) {
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
      const g = Ia(s);
      return r.has(s.id) || f > 0 && g.end > f + 0.02 ? !1 : (r.add(s.id), !0);
    } catch {
      return !1;
    }
  });
}
function y0(c, f, r) {
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
  async play(f, r, s, g = "same-origin") {
    const m = Ia(f);
    this.pause();
    const y = this.generation;
    this.context ??= this.createContext();
    const S = this.context, C = S.resume();
    C.catch(() => {
    });
    const A = f.audioSrc || r, E = JSON.stringify([A, f.startSample, f.endSample, f.sampleRate]);
    try {
      let h = this.cache?.url === E ? this.cache.buffer : null;
      if (!h) {
        const I = new AbortController();
        this.abort = I;
        const dt = await fetch(A, { signal: I.signal, credentials: g });
        if (!dt.ok) throw new Error(`Could not load loop audio (HTTP ${dt.status})`);
        const V = 128 * 1024 * 1024;
        if (Number(dt.headers.get("Content-Length")) > V) throw new Error("Loop audio exceeds 128 MiB");
        const K = await dt.arrayBuffer();
        if (K.byteLength > V) throw new Error("Loop audio exceeds 128 MiB");
        if (h = await S.decodeAudioData(K), y !== this.generation) return !1;
        this.cache = { url: E, buffer: h };
      }
      if (await C, y !== this.generation) return !1;
      const j = f.audioSrc ? 0 : m.start, B = j + m.duration, J = Math.max(2 / h.sampleRate, 2e-3);
      if (!Number.isFinite(h.duration) || h.duration <= j || B > h.duration + J || f.audioSrc && Math.abs(h.duration - m.duration) > J)
        throw new Error("Loop audio duration does not match the reported sample boundaries");
      const L = S.createBufferSource();
      return L.buffer = h, L.loop = !0, L.loopStart = j, L.loopEnd = Math.min(B, h.duration), L.connect(S.destination), this.start = m.start, this.length = L.loopEnd - j, this.offset = y0(s, m.start, m.start + this.length) - m.start, this.anchor = S.currentTime, L.start(this.anchor, j + this.offset), this.node = L, !0;
    } catch (h) {
      if (y !== this.generation) return !1;
      throw h;
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
function Ta(c, f, r) {
  return Math.min(r, Math.max(f, c));
}
function Ea(c) {
  const f = Math.max(0, Number(c) || 0), r = Math.floor(f / 60), s = Math.floor(f % 60), g = Math.floor((f - Math.floor(f)) * 1e3);
  return `${String(r).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(g).padStart(3, "0")}`;
}
function b0(c) {
  const f = [0.1, 0.25, 0.5, 1, 2, 5, 10, 15, 30, 60, 120, 300, 600];
  return f.find((r) => r * c >= 70) ?? f[f.length - 1];
}
function By(c, f, r, s, g) {
  if (g <= 0 || s <= 0) return { start: 0, end: 0 };
  const m = Math.max(0, c - r), y = Math.max(0, c + f - r), S = Ta(m / s, 0, g), C = Ta(y / s, S, g);
  return { start: S, end: C };
}
function u0(c, f) {
  if (typeof c != "number" || !Number.isFinite(c)) throw new RangeError(`${f} must be finite`);
  return c;
}
function Hy(c, f) {
  const r = f * c.source_audio.sample_rate, s = c.beats;
  let g = 0, m = s.length;
  for (; g < m; ) {
    const y = g + m >>> 1;
    s[y].frame <= r ? g = y + 1 : m = y;
  }
  return Math.max(0, Math.min(s.length - 2, g - 1));
}
function p0(c, f, r = 0.15) {
  if (u0(f, "source seconds"), u0(r, "tolerance") < 0 || r > 60) throw new RangeError("Invalid snap tolerance");
  let s, g;
  if (c.mode === "fixed")
    s = Math.round((f - c.firstBeatSeconds) * c.bpm / 60), g = c.firstBeatSeconds + s * 60 / c.bpm;
  else {
    const y = c.beats, S = c.source_audio.sample_rate, C = Hy(c, f), A = [y[C], y[C + 1]].reduce((E, h) => Math.abs(E.frame / S - f) <= Math.abs(h.frame / S - f) ? E : h);
    s = A.beat - c.origin_beat, g = A.frame / S;
  }
  const m = f - g;
  return {
    beat: s,
    time: g,
    errorSeconds: m,
    errorMilliseconds: m * 1e3,
    withinTolerance: Math.abs(m) <= r,
    mode: c.mode
  };
}
function Ly(c, f, r, s = 2e3) {
  if (!(Number.isFinite(f) && Number.isFinite(r) && r > f)) return [];
  const g = Math.max(1, Math.min(2e3, Math.floor(s)));
  if (c.mode === "variable") {
    const E = c.beats.filter((j) => j.frame / c.source_audio.sample_rate >= f && j.frame / c.source_audio.sample_rate <= r), h = Math.max(1, Math.ceil(E.length / g));
    return E.filter((j, B) => B % h === 0).map((j) => ({
      time: j.frame / c.source_audio.sample_rate,
      label: `Observed beat ${j.beat}`,
      emphasis: j.beat === c.origin_beat
    }));
  }
  const m = Math.max(Math.ceil((f - c.firstBeatSeconds) * c.bpm / 60), Math.ceil(-c.firstBeatSeconds * c.bpm / 60)), y = Math.floor((r - c.firstBeatSeconds) * c.bpm / 60), S = Math.max(0, y - m + 1), C = Math.max(1, Math.ceil(S / g)), A = [];
  for (let E = m; E <= y && A.length < g; E += C) A.push({
    time: c.firstBeatSeconds + E * 60 / c.bpm,
    label: `Fixed-BPM grid beat ${E} (not detected)`,
    emphasis: E === 0
  });
  return A;
}
function i0(c, f, r, s) {
  if (!Number.isFinite(r) || !Number.isFinite(s.duration) || s.duration <= 0) throw new RangeError("Invalid timing edit timebase");
  const g = Math.max(0, s.bounds?.start ?? 0, s.previousEnd ?? 0), m = Math.min(s.duration, s.bounds?.end ?? s.duration, s.nextStart ?? s.duration);
  if (m < g) throw new RangeError("No space between neighbouring timing items");
  const y = s.minimumDuration ?? 0;
  if (y < 0) throw new RangeError("minimumDuration must be nonnegative");
  let S = Math.min(m, Math.max(g, r));
  if (s.snap && s.clock) {
    const E = p0(s.clock, S, s.toleranceSeconds ?? 0.15);
    E.withinTolerance && (S = Math.min(m, Math.max(g, E.time)));
  }
  const C = c.end !== void 0 && Number.isFinite(c.end), A = C ? Number(c.end) - c.start : 0;
  if (f === "move") {
    const E = Math.max(g, Math.min(Math.max(g, m - A), S));
    return C ? { ...c, start: E, end: E + A } : { ...c, start: E };
  }
  if (f === "start") {
    const E = C ? c.end - y : m;
    if (E < g) throw new RangeError("No valid start fits within the parent bounds");
    return { ...c, start: Math.min(S, E) };
  }
  if (!C) throw new RangeError("This event has no editable end");
  if (c.start + y > m) throw new RangeError("No valid end fits inside the parent bounds");
  return { ...c, end: Math.max(c.start + y, S) };
}
function c0(c, f, r) {
  const s = c.parentId ? r.parents?.find((S) => S.id === c.parentId) : null, g = f.filter((S) => S.id !== c.id && (S.parentId ?? "") === (c.parentId ?? "")).sort((S, C) => S.start - C.start), m = g.filter((S) => S.start <= c.start).slice(-1)[0], y = g.find((S) => S.start > c.start);
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
  const { items: f, kind: r, duration: s, clock: g, selectedId: m, onSelect: y, onEdit: S } = c, C = c.editable === !0 && typeof S == "function", [A, E] = w.useState(null), h = w.useRef(null), j = w.useRef(null), B = (V) => `${Math.max(0, Math.min(100, V * 100 / Math.max(s, 1e-9)))}%`;
  function J(V, K, Nt) {
    if (!C || V.button !== 0) return;
    const Tt = V.currentTarget.closest(".rts-track");
    if (!Tt) return;
    const vt = Tt.getBoundingClientRect().width;
    !Number.isFinite(vt) || vt <= 0 || (h.current = { id: K.id, edge: Nt, x: V.clientX, origin: K, width: vt }, j.current = K, V.currentTarget.setPointerCapture(V.pointerId), V.stopPropagation(), V.preventDefault(), y?.(K.id));
  }
  function L(V) {
    const K = h.current;
    if (!K || !C) return;
    const Nt = (K.edge === "end" ? K.origin.end ?? K.origin.start : K.origin.start) + (V.clientX - K.x) * s / K.width;
    try {
      j.current = i0(K.origin, K.edge, Nt, c0(K.origin, f, c)), E(j.current);
    } catch {
    }
    V.stopPropagation();
  }
  function I(V, K = !1) {
    const Nt = h.current;
    Nt && (h.current = null, !K && j.current && S && (j.current.start !== Nt.origin.start || j.current.end !== Nt.origin.end) && S(j.current), j.current = null, E(null), V.stopPropagation());
  }
  function dt(V, K, Nt) {
    if (!C || V.key !== "ArrowLeft" && V.key !== "ArrowRight") return;
    V.preventDefault(), V.stopPropagation();
    const Tt = (V.key === "ArrowRight" ? 1 : -1) * (V.shiftKey ? 1e-3 : 0.01), vt = Nt === "end" ? K.end ?? K.start : K.start;
    try {
      S?.(i0(K, Nt, vt + Tt, c0(K, f, c)));
    } catch {
    }
  }
  return /* @__PURE__ */ d.jsx("div", { className: `rts-editable-timing rts-timing-${r}`, role: "group", "aria-label": `${r} timings`, children: f.filter((V) => Number.isFinite(V.start) && V.start >= 0 && V.start <= s).map((V) => {
    const K = A?.id === V.id ? A : V, Nt = K.end !== void 0 ? Math.max(0.1, (K.end - K.start) * 100 / s) : 0.12, Tt = g ? p0(g, K.start, c.toleranceSeconds ?? 0.15) : null, vt = `${V.label} at ${Ea(K.start)}${Tt ? `, ${Tt.withinTolerance ? "near" : "off"} ${Tt.mode} beat ${Tt.beat}, signed gap ${Tt.errorMilliseconds.toFixed(1)} ms` : ""}`;
    return /* @__PURE__ */ d.jsxs(
      "div",
      {
        className: `rts-timing-region ${m === V.id ? "is-selected" : ""} ${V.className ?? ""}`,
        style: { left: B(K.start), width: `${Nt}%` },
        children: [
          /* @__PURE__ */ d.jsx(
            "button",
            {
              type: "button",
              className: `rts-timing-handle rts-timing-main ${Tt?.withinTolerance ? "is-matched" : ""}`,
              "aria-label": `Move ${vt}`,
              title: vt,
              "aria-pressed": m === V.id,
              onClick: (Z) => {
                Z.stopPropagation(), y?.(V.id);
              },
              onPointerDown: (Z) => J(Z, V, "move"),
              onPointerMove: L,
              onPointerUp: I,
              onPointerCancel: (Z) => I(Z, !0),
              onKeyDown: (Z) => dt(Z, V, "move"),
              children: V.label
            }
          ),
          C && K.end !== void 0 && /* @__PURE__ */ d.jsx(
            "button",
            {
              type: "button",
              className: "rts-timing-end",
              "aria-label": `Resize end of ${V.label}`,
              title: "Resize end · arrows: 10 ms, Shift: 1 ms",
              onPointerDown: (Z) => J(Z, V, "end"),
              onPointerMove: L,
              onPointerUp: I,
              onPointerCancel: (Z) => I(Z, !0),
              onKeyDown: (Z) => dt(Z, V, "end")
            }
          ),
          C && K.end !== void 0 && /* @__PURE__ */ d.jsx(
            "button",
            {
              type: "button",
              className: "rts-timing-start",
              "aria-label": `Resize start of ${V.label}`,
              title: "Resize start · arrows: 10 ms, Shift: 1 ms",
              onPointerDown: (Z) => J(Z, V, "start"),
              onPointerMove: L,
              onPointerUp: I,
              onPointerCancel: (Z) => I(Z, !0),
              onKeyDown: (Z) => dt(Z, V, "start")
            }
          )
        ]
      },
      V.id
    );
  }) });
}
function vo(c, f) {
  return `${Ta(c / Math.max(f, 1e-9), 0, 1) * 100}%`;
}
function S0(c, f, r, s = 0.08) {
  const g = Number.isFinite(f) && Number(f) > c ? Number(f) : c + 0.5;
  return `${Math.max(s, (g - c) / Math.max(r, 1e-9) * 100)}%`;
}
function qy({ min: c, max: f, colour: r = "#79c0ff" }) {
  const s = w.useRef(null);
  return w.useEffect(() => {
    const g = s.current;
    if (!g) return;
    const m = Math.max(1, Math.min(c.length, f.length));
    g.width = m, g.height = 180;
    const y = g.getContext("2d");
    if (!y) return;
    y.clearRect(0, 0, m, g.height), y.strokeStyle = r, y.lineWidth = 1, y.beginPath();
    const S = g.height / 2, C = g.height * 0.46;
    for (let A = 0; A < m; A += 1) {
      const E = A + 0.5;
      y.moveTo(E, S - (Number(f[A]) || 0) * C), y.lineTo(E, S - (Number(c[A]) || 0) * C);
    }
    y.stroke();
  }, [r, f, c]), /* @__PURE__ */ d.jsx("canvas", { ref: s, className: "rts-waveform", "aria-hidden": "true" });
}
function Gy({ rows: c }) {
  const f = w.useRef(null);
  return w.useEffect(() => {
    const r = f.current, s = c.filter((S) => S.length > 0);
    if (!r || !s.length) return;
    const g = Math.max(...s.map((S) => S.length));
    r.width = Math.min(4096, s.length), r.height = Math.min(256, g);
    const m = r.getContext("2d");
    if (!m) return;
    const y = m.createImageData(r.width, r.height);
    for (let S = 0; S < r.width; S += 1) {
      const C = Math.min(s.length - 1, Math.floor(S * s.length / r.width)), A = s[C], E = Math.max(1e-9, ...A.map((h) => Number(h) || 0));
      for (let h = 0; h < r.height; h += 1) {
        const j = Math.min(A.length - 1, Math.floor((r.height - 1 - h) * A.length / r.height)), B = Ta((Number(A[j]) || 0) / E, 0, 1), J = (h * r.width + S) * 4;
        y.data[J] = Math.round(40 + 180 * B), y.data[J + 1] = Math.round(35 + 110 * B), y.data[J + 2] = Math.round(80 + 170 * B), y.data[J + 3] = 255;
      }
    }
    m.putImageData(y, 0, 0);
  }, [c]), /* @__PURE__ */ d.jsx("canvas", { ref: f, className: "rts-matrix", "aria-hidden": "true" });
}
function Xy({ items: c, duration: f }) {
  const r = c.filter((m) => Number.isFinite(m.value) && m.value > 0);
  if (!r.length) return null;
  const s = Math.log2(Math.max(20, Math.min(...r.map((m) => m.value)))), g = Math.log2(Math.max(100, ...r.map((m) => m.value)));
  return r.map((m, y) => {
    const S = (Math.log2(m.value) - s) / Math.max(0.01, g - s);
    return /* @__PURE__ */ d.jsx(
      "span",
      {
        className: `rts-note ${m.className ?? ""}`,
        style: { left: vo(m.start, f), width: S0(m.start, m.end ?? m.start + 0.12, f, 0.04), top: `${8 + (1 - S) * 72}px` },
        title: m.title ?? `${m.label ?? `${m.value.toFixed(1)} Hz`} · ${Ea(m.start)}`
      },
      `${m.start}-${y}`
    );
  });
}
function go({ content: c, duration: f }) {
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
          style: { left: vo(r.time, f) },
          title: r.label
        },
        `${r.time}-${s}`
      )) });
    case "blocks":
      return /* @__PURE__ */ d.jsx(d.Fragment, { children: c.items.map((r, s) => /* @__PURE__ */ d.jsx(
        "span",
        {
          className: `rts-block ${r.className ?? ""}`,
          style: { left: vo(r.start, f), width: S0(r.start, r.end, f) },
          title: r.title ?? `${r.label ?? ""} · ${Ea(r.start)}${r.end ? ` — ${Ea(r.end)}` : ""}`,
          children: r.label
        },
        `${r.start}-${s}`
      )) });
    case "notes":
      return /* @__PURE__ */ d.jsx(Xy, { items: c.items, duration: f });
    case "curve": {
      const r = c.points.filter((S) => Number.isFinite(S.time) && Number.isFinite(S.value));
      if (!r.length) return null;
      const s = r.map((S) => S.value), g = Math.min(...s), m = Math.max(...s), y = r.map((S) => {
        const C = S.time / Math.max(f, 1e-9) * 2e3, A = 180 - (S.value - g) / Math.max(1e-9, m - g) * 168 - 6;
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
      return /* @__PURE__ */ d.jsx(Yy, { ...c, duration: f });
    case "custom":
      return /* @__PURE__ */ d.jsx(d.Fragment, { children: c.node });
  }
}
function Vy({ content: c, duration: f, view: r }) {
  const s = g0(r, !!c.waveform, !!c.spectrogram);
  return /* @__PURE__ */ d.jsxs("div", { className: `rts-audio-layers rts-audio-${s}`, "data-audio-view": s, children: [
    c.spectrogram && s !== "waveform" && /* @__PURE__ */ d.jsx("div", { className: "rts-audio-spectrum", children: /* @__PURE__ */ d.jsx(go, { content: { type: "image", ...c.spectrogram }, duration: f }) }),
    c.waveform && s !== "spectrogram" && /* @__PURE__ */ d.jsx("div", { className: "rts-audio-envelope", children: /* @__PURE__ */ d.jsx(go, { content: { type: "waveform", ...c.waveform, colour: s === "both" ? "#e6fff7" : c.waveform.colour }, duration: f }) }),
    !c.waveform && !c.spectrogram && /* @__PURE__ */ d.jsx("span", { className: "rts-meta", children: "Waiting for audio analysis" })
  ] });
}
function Qy({ config: c, lanes: f, time: r, duration: s, playing: g }) {
  const m = f.filter((L) => L.content.type === "timing" && L.content.kind === "line"), [y, S] = w.useState(null), C = m.find((L) => L.id === (c.laneId ?? y)) ?? (c.laneId === void 0 && y === null ? m[0] : void 0), A = c.items ?? (C?.content.type === "timing" ? C.content.items : []), E = w.useMemo(() => Cy(A, s), [A, s]), h = Ay(E, r), [j, B] = w.useState(), J = c.artworkSrc && j !== c.artworkSrc;
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
            onChange: (L) => S(L.target.value),
            children: [
              !C && /* @__PURE__ */ d.jsx("option", { value: "", children: "Choose lyric lane" }),
              m.map((L) => /* @__PURE__ */ d.jsx("option", { value: L.id, children: typeof L.title == "string" ? L.title : L.id }, L.id))
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
          onError: () => B(c.artworkSrc)
        }
      ) : /* @__PURE__ */ d.jsx("span", { className: "rts-audition-no-art", children: "Cover artwork unavailable" }),
      /* @__PURE__ */ d.jsx("div", { className: "rts-audition-subtitles", "aria-label": "Timed lyrics", "aria-live": "off", children: h.map((L, I) => /* @__PURE__ */ d.jsx("span", { children: L }, I)) })
    ] }),
    /* @__PURE__ */ d.jsx("output", { className: "rts-audition-status", "aria-live": "off", children: E.some((L) => L.text.trim()) ? h.length ? g ? "Playing · timed lyrics" : "Paused · current lyrics" : "No lyric at this position" : "No timed lyrics available" })
  ] });
}
function Zy(c, f, r, s, g = "same-origin") {
  const [m, y] = w.useState(0), [S, C] = w.useState(!1), [A, E] = w.useState(!1), [h, j] = w.useState(""), B = w.useRef(!1), J = w.useRef("media"), L = w.useRef(null), I = w.useRef(0), dt = w.useRef({ audioSrc: f, activeLoop: r, onError: s, credentials: g });
  dt.current = { audioSrc: f, activeLoop: r, onError: s, credentials: g };
  const V = w.useCallback(() => J.current === "loop" ? L.current?.currentTime ?? 0 : c.current?.currentTime ?? 0, [c]), K = w.useCallback(() => {
    const it = V();
    return I.current += 1, B.current = !1, L.current?.pause(), c.current?.pause(), E(!1), C(!1), y(it), it;
  }, [c, V]), Nt = w.useCallback((it) => {
    K(), j(it instanceof Error ? it.message : String(it)), dt.current.onError?.(it);
  }, [K]), Tt = w.useCallback(async (it) => {
    K();
    const st = I.current;
    B.current = !0, E(!0), j("");
    const { activeLoop: mt, audioSrc: Ut, credentials: Mt } = dt.current;
    try {
      if (mt) {
        if (J.current = "loop", L.current ??= new Uy(), !await L.current.play(mt, Ut, it, Mt)) return;
      } else {
        J.current = "media";
        const bt = c.current;
        if (!bt) return;
        bt.currentTime = Math.max(0, it), await bt.play();
      }
      if (st !== I.current) return;
      y(V()), E(!1), C(!0);
    } catch (bt) {
      st === I.current && Nt(bt);
    }
  }, [c, Nt, K, V]), vt = w.useCallback((it) => {
    const st = dt.current.activeLoop;
    if (st) {
      const mt = Ia(st);
      it = y0(it, mt.start, mt.end);
    }
    B.current ? Tt(it) : (K(), J.current = "media", c.current && (c.current.currentTime = it), y(it));
  }, [c, K, Tt]), Z = w.useCallback(() => {
    if (B.current) {
      K();
      return;
    }
    let it = V();
    const st = dt.current.activeLoop;
    if (st) {
      const mt = Ia(st);
      (it < mt.start || it >= mt.end) && (it = mt.start);
    }
    Tt(it);
  }, [K, Tt, V]);
  w.useEffect(() => (K(), J.current = "media", y(0), j(""), L.current?.dispose(), L.current = null, () => {
    I.current += 1, B.current = !1, L.current?.dispose(), L.current = null, c.current?.pause();
  }), [f, c, K]);
  const ot = r ? JSON.stringify([r.id, r.startSample, r.endSample, r.sampleRate, r.audioSrc]) : "";
  w.useEffect(() => {
    const it = B.current;
    let st = K();
    const mt = dt.current.activeLoop;
    mt && (st = Ia(mt).start), J.current = "media", c.current && (c.current.currentTime = st), y(st), it && Tt(st);
  }, [ot, c, K, Tt]), w.useEffect(() => {
    if (!S) return;
    let it = 0;
    const st = () => {
      y(V()), it = requestAnimationFrame(st);
    };
    return it = requestAnimationFrame(st), () => cancelAnimationFrame(it);
  }, [S, V]);
  const Pt = w.useCallback(() => {
    J.current === "media" && K();
  }, [K]);
  return { time: m, playing: S, loading: A, error: h, toggle: Z, seek: vt, ended: Pt, fail: Nt };
}
function Ky(c, f) {
  if (c <= 0 || f <= 0) return [];
  const r = b0(f) / 5, s = [];
  for (let g = 0; g * r <= c + 1e-6; g += 1)
    s.push({
      time: g * r,
      major: g % 5 === 0
    });
  return s;
}
function Jy(c, f) {
  const r = Math.round(c * 1e3), s = Math.floor(r / 1e3), g = `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  return b0(f) < 1 ? `${g}.${String(r % 1e3).padStart(3, "0")}` : g;
}
function $y({
  audioSrc: c,
  lyricAudition: f,
  loops: r = [],
  onLoopSelect: s,
  onLoopEnabledChange: g,
  lanes: m,
  title: y = "Audio timeline",
  subtitle: S,
  duration: C = 0,
  grid: A = [],
  beatClock: E = null,
  showBeatGrid: h = !1,
  headerEnd: j,
  footer: B,
  className: J = "",
  labelWidth: L = 230,
  initialZoom: I = 20,
  laneControls: dt = !1,
  wheelNavigation: V = !1,
  followPlayheadByDefault: K = !0,
  preload: Nt = "metadata",
  crossOrigin: Tt,
  onDurationChange: vt,
  onTimeChange: Z,
  onWindowChange: ot,
  onPlaybackError: Pt
}) {
  const it = w.useRef(null), [st, mt] = w.useState(f?.enabledByDefault ?? !0), Ut = w.useRef(null), [Mt, bt] = w.useState(Math.max(0, C)), [q, G] = w.useState(null), [Y, $] = w.useState(!1), nt = w.useMemo(() => Dy(r, Mt), [r, Mt]), At = nt.find((R) => R.id === q) ?? null, Ft = Zy(
    it,
    c,
    Y ? At : null,
    Pt,
    Tt === "use-credentials" ? "include" : "same-origin"
  ), Zt = Ft.time, p = Ft.playing, H = At ? Ia(At) : null, tt = (R) => {
    G(R), s?.(nt.find((rt) => rt.id === R) ?? null);
  }, P = (R) => {
    $(R), g?.(R);
  };
  w.useEffect(() => {
    q && !nt.some((R) => R.id === q) && (G(null), $(!1), s?.(null), g?.(!1));
  }, [q, nt, s, g]), w.useEffect(() => {
    G(null), $(!1), bt(Math.max(0, C));
  }, [c]);
  const [_t, gt] = w.useState(K), [Et, k] = w.useState(I), [ut, ce] = w.useState({}), [gl, ne] = w.useState({}), le = w.useRef(I), jt = w.useRef(null), ft = w.useRef(() => {
  });
  w.useEffect(() => {
    ce({}), ne({});
  }, [c]);
  const [X, lt] = w.useState(0), [yt, Yt] = w.useState({ start: 0, end: 0 });
  w.useEffect(() => {
    C > 0 && bt(C);
  }, [C]), w.useEffect(() => {
    const R = Ut.current;
    if (!R) return;
    const rt = () => lt(R.clientWidth);
    rt();
    const Ot = new ResizeObserver(rt);
    return Ot.observe(R), () => Ot.disconnect();
  }, []);
  const te = Mt > 0 ? Math.max(0.4, Math.max(320, X - L - 16) / Mt) : 0.4, Bt = Math.max(te, te * Math.pow(2, Et / 18));
  w.useLayoutEffect(() => {
    if (le.current = Et, jt.current && Ut.current) {
      const { time: R, pointer: rt } = jt.current;
      Ut.current.scrollLeft = n0(R, Bt, rt), jt.current = null;
    }
  }, [Et, Bt]), w.useEffect(() => {
    const R = Ut.current;
    if (!R || !V) return;
    const rt = (Ot) => ft.current(Ot);
    return R.addEventListener("wheel", rt, { passive: !1 }), () => R.removeEventListener("wheel", rt);
  }, [V]);
  const cl = Math.max(1, Mt * Bt), yl = w.useMemo(() => Ky(Mt, Bt), [Mt, Bt]), Na = w.useMemo(() => E && h ? Ly(E, 0, Mt, 2e3).map((R) => ({
    time: R.time,
    emphasis: R.emphasis,
    label: R.label,
    className: `rts-beat-grid-${E.mode}`
  })) : [], [E, h, Mt]), $l = [...A, ...Na], Be = w.useCallback(() => {
    const R = Ut.current;
    if (!R) return;
    const rt = By(
      R.scrollLeft + L,
      Math.max(0, R.clientWidth - L),
      L,
      Bt,
      Mt
    );
    Yt(rt), ot?.(rt);
  }, [Mt, L, ot, Bt]);
  w.useEffect(() => {
    Be();
  }, [Be, X]), w.useEffect(() => {
    Z?.(Zt);
    const R = Ut.current;
    if (!R || !_t || !p) return;
    const rt = L + Zt * Bt, Ot = R.scrollLeft + R.clientWidth, se = Math.min(180, R.clientWidth * 0.2);
    rt > Ot - se ? R.scrollLeft = Math.max(0, rt - R.clientWidth + se) : rt < R.scrollLeft + L && (R.scrollLeft = Math.max(0, rt - L - se));
  }, [Zt, _t, p, L, Z, Bt]);
  const jl = (R) => {
    if (Mt <= 0 || R.target.closest(".rts-label, a, button, input, select, textarea")) return;
    const rt = Ut.current, Ot = it.current;
    if (!rt || !Ot) return;
    const se = rt.getBoundingClientRect(), he = R.clientX - se.left + rt.scrollLeft - L;
    if (he < 0) return;
    const Kt = Ta(he / Bt, 0, Mt);
    Ft.seek(Kt);
  }, Rl = (R, rt) => {
    const Ot = Ut.current;
    if (R = Ta(R, 0, 100), R !== le.current) {
      if (Ot) {
        const se = Math.max(1, Ot.clientWidth - L), he = rt === void 0 ? se / 2 : Ta(rt - Ot.getBoundingClientRect().left - L, 0, se), Kt = jt.current, Ce = te * Math.pow(2, le.current / 18), _e = Kt ? n0(Kt.time, Ce, Kt.pointer) : Ot.scrollLeft;
        jt.current = { time: (_e + he) / Ce, pointer: he };
      }
      le.current = R, k(R);
    }
  };
  ft.current = (R) => {
    const rt = Ut.current, Ot = R.target instanceof Element ? R.target : null;
    if (!rt || !Ot || Ot.closest("input, select, textarea, button, [contenteditable=true]")) return;
    const se = Math.abs(R.deltaX) > Math.abs(R.deltaY) ? R.deltaX : R.deltaY, he = jy(se, R.deltaMode, rt.clientWidth - L);
    if (he)
      if (R.ctrlKey || R.metaKey) {
        if (Mt <= 0) return;
        R.preventDefault(), R.stopPropagation(), gt(!1), Rl(Ry(le.current, he), R.clientX);
      } else if (R.altKey) {
        const Kt = Ot.closest("[data-lane-id]")?.dataset.laneId, Ce = m.find((_e) => _e.id === Kt);
        if (!dt || !Ce) return;
        R.preventDefault(), R.stopPropagation(), ce((_e) => ({
          ..._e,
          [Ce.id]: wy(_e[Ce.id] ?? Ju(Ce.height), he)
        }));
      } else
        R.preventDefault(), R.stopPropagation(), R.shiftKey ? rt.scrollTop += he : (gt(!1), rt.scrollLeft += he);
  };
  const xa = () => {
    if (!H || !Ut.current) return;
    const R = Math.max(320, X - L - 16) / (H.duration * 1.1), rt = Ta(18 * Math.log2(R / te), 0, 100);
    jt.current = null, le.current = rt, k(rt);
    const Ot = te * Math.pow(2, rt / 18);
    requestAnimationFrame(() => {
      Ut.current && (Ut.current.scrollLeft = Math.max(0, (H.start - H.duration * 0.05) * Ot));
    });
  }, ln = () => {
    const R = Number(it.current?.duration) || 0;
    Number.isFinite(R) && R > 0 && (bt(R), vt?.(R));
  };
  return /* @__PURE__ */ d.jsxs(
    "section",
    {
      className: `rts-sequence ${dt ? "rts-display-controls" : ""} ${J}`,
      style: { "--rts-label-width": `${L}px`, "--rts-track-width": `${cl}px` },
      children: [
        /* @__PURE__ */ d.jsxs("header", { className: "rts-toolbar", children: [
          /* @__PURE__ */ d.jsxs("div", { className: "rts-ident", children: [
            /* @__PURE__ */ d.jsx("strong", { children: y }),
            S && /* @__PURE__ */ d.jsx("span", { children: S })
          ] }),
          /* @__PURE__ */ d.jsxs("div", { className: "rts-transport", "aria-label": "Timeline playback controls", children: [
            /* @__PURE__ */ d.jsx("button", { type: "button", className: "rts-button rts-play", onClick: Ft.toggle, "aria-label": p || Ft.loading ? "Pause" : "Play", children: Ft.loading ? "…" : p ? "❚❚" : "▶" }),
            /* @__PURE__ */ d.jsxs("output", { className: "rts-time", "aria-live": "off", children: [
              Ea(Zt),
              " / ",
              Ea(Mt)
            ] }),
            /* @__PURE__ */ d.jsx("button", { type: "button", className: "rts-button", onClick: () => Rl(0), children: "Fit" }),
            /* @__PURE__ */ d.jsxs("label", { className: "rts-control", children: [
              /* @__PURE__ */ d.jsx("span", { children: "Zoom" }),
              /* @__PURE__ */ d.jsx("input", { "aria-label": "Timeline zoom", type: "range", min: "0", max: "100", value: Et, onChange: (R) => Rl(Number(R.target.value)) })
            ] }),
            /* @__PURE__ */ d.jsxs("label", { className: "rts-control", children: [
              /* @__PURE__ */ d.jsx("input", { type: "checkbox", checked: _t, onChange: (R) => gt(R.target.checked) }),
              /* @__PURE__ */ d.jsx("span", { children: "Follow" })
            ] }),
            f && /* @__PURE__ */ d.jsxs("label", { className: "rts-control rts-audition-toggle", children: [
              /* @__PURE__ */ d.jsx(
                "input",
                {
                  type: "checkbox",
                  "aria-label": "Audition lyrics",
                  checked: st,
                  onChange: (R) => mt(R.target.checked)
                }
              ),
              /* @__PURE__ */ d.jsx("span", { children: "Audition lyrics" })
            ] })
          ] }),
          /* @__PURE__ */ d.jsx("div", { className: "rts-header-end", children: j }),
          nt.length > 0 && /* @__PURE__ */ d.jsxs("div", { className: "rts-loop-controls", "aria-label": "Loop controls", children: [
            /* @__PURE__ */ d.jsxs("label", { children: [
              "Loop ",
              /* @__PURE__ */ d.jsxs("select", { "aria-label": "Select loop", value: q ?? "", onChange: (R) => tt(R.target.value), children: [
                /* @__PURE__ */ d.jsx("option", { value: "", children: "Choose a loop…" }),
                nt.map((R) => /* @__PURE__ */ d.jsx("option", { value: R.id, children: R.label || R.id }, R.id))
              ] })
            ] }),
            /* @__PURE__ */ d.jsxs("label", { children: [
              /* @__PURE__ */ d.jsx("input", { type: "checkbox", "aria-label": "Enable loop", disabled: !At, checked: Y && !!At, onChange: (R) => P(R.target.checked) }),
              "Enable loop"
            ] }),
            /* @__PURE__ */ d.jsx("button", { type: "button", className: "rts-button", disabled: !At, onClick: xa, children: "Zoom to loop" }),
            At && /* @__PURE__ */ d.jsxs("output", { children: [
              At.startSample.toLocaleString(),
              " → ",
              At.endSample.toLocaleString(),
              " samples (end exclusive) · ",
              At.sampleRate.toLocaleString(),
              " Hz"
            ] }),
            At?.downloadUrl && /* @__PURE__ */ d.jsx("a", { href: At.downloadUrl, download: !0, children: "Download loop WAV" }),
            /* @__PURE__ */ d.jsx("span", { className: "rts-loop-status", role: "status", children: Ft.loading ? "Loading loop…" : Y && At ? "Loop enabled · Play repeats selection" : "Full-song playback" })
          ] }),
          Ft.error && /* @__PURE__ */ d.jsx("div", { role: "alert", className: "rts-loop-error", children: Ft.error })
        ] }),
        /* @__PURE__ */ d.jsx(
          "audio",
          {
            ref: it,
            src: c,
            preload: Nt,
            crossOrigin: Tt,
            onLoadedMetadata: ln,
            onEnded: Ft.ended,
            onError: () => Ft.fail(new Error(it.current?.error?.message || "Audio playback failed"))
          }
        ),
        /* @__PURE__ */ d.jsxs("div", { className: `rts-workspace ${f && st ? "rts-with-audition" : ""}`, children: [
          /* @__PURE__ */ d.jsx("div", { ref: Ut, className: "rts-scroller", onScroll: Be, onClick: jl, children: /* @__PURE__ */ d.jsxs("div", { className: "rts-inner", children: [
            /* @__PURE__ */ d.jsxs("div", { className: "rts-ruler-row", children: [
              /* @__PURE__ */ d.jsx("div", { className: "rts-label rts-ruler-label", children: "TIME" }),
              /* @__PURE__ */ d.jsx("div", { className: "rts-ruler-track", children: yl.map((R) => /* @__PURE__ */ d.jsx("span", { className: `rts-tick ${R.major ? "rts-tick-major" : ""}`, style: { left: `${R.time * Bt}px` }, children: R.major && /* @__PURE__ */ d.jsx("span", { className: "rts-tick-label", children: Jy(R.time, Bt) }) }, R.time)) })
            ] }),
            nt.length > 0 && /* @__PURE__ */ d.jsxs("div", { className: "rts-lane rts-lane-loops", children: [
              /* @__PURE__ */ d.jsxs("div", { className: "rts-label", children: [
                /* @__PURE__ */ d.jsx("div", { className: "rts-title", children: "LOOPS" }),
                /* @__PURE__ */ d.jsx("div", { className: "rts-meta", children: "Select a region, enable, then Play" })
              ] }),
              /* @__PURE__ */ d.jsx("div", { className: "rts-track", children: nt.map((R) => {
                const rt = Ia(R);
                return /* @__PURE__ */ d.jsx(
                  "button",
                  {
                    type: "button",
                    className: "rts-loop-region",
                    "aria-pressed": q === R.id,
                    "aria-label": `Select ${R.label || R.id}`,
                    onClick: () => tt(R.id),
                    title: `${R.label || R.id}: [${R.startSample}, ${R.endSample}) at ${R.sampleRate} Hz`,
                    style: { left: `${rt.start * Bt}px`, width: `${rt.duration * Bt}px` },
                    children: R.label || R.id
                  },
                  R.id
                );
              }) })
            ] }),
            H && /* @__PURE__ */ d.jsx(
              "div",
              {
                className: `rts-loop-shade ${Y ? "" : "is-disabled"}`,
                "aria-hidden": "true",
                style: { left: `${L + H.start * Bt}px`, width: `${H.duration * Bt}px` }
              }
            ),
            /* @__PURE__ */ d.jsx("div", { className: "rts-lanes", children: m.map((R) => {
              const rt = R.content, Ot = rt.type === "audio" ? rt : null, se = gl[R.id] ?? Ot?.view ?? "both", he = Ot ? g0(se, !!Ot.waveform, !!Ot.spectrogram) : "both", Kt = dt ? ut[R.id] ?? Ju(R.height) : R.height, Ce = typeof R.title == "string" ? R.title : R.id;
              return /* @__PURE__ */ d.jsxs(
                "div",
                {
                  "data-lane-id": R.id,
                  className: `rts-lane rts-lane-${R.kind ?? "default"} ${R.className ?? ""}`,
                  style: Kt ? { "--rts-lane-height": `${Kt}px` } : void 0,
                  children: [
                    /* @__PURE__ */ d.jsxs("div", { className: "rts-label", children: [
                      /* @__PURE__ */ d.jsx("div", { className: "rts-title", children: R.title }),
                      R.meta && /* @__PURE__ */ d.jsx("div", { className: "rts-meta", children: R.meta }),
                      dt && /* @__PURE__ */ d.jsxs("div", { className: "rts-lane-controls", children: [
                        Ot && /* @__PURE__ */ d.jsxs("label", { children: [
                          "View ",
                          /* @__PURE__ */ d.jsxs(
                            "select",
                            {
                              "aria-label": `View for ${Ce}`,
                              value: he,
                              onChange: (_e) => ne((bl) => ({ ...bl, [R.id]: _e.target.value })),
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
                              min: h0,
                              max: v0,
                              step: "1",
                              "aria-label": `Height for ${Ce}`,
                              value: Kt,
                              onChange: (_e) => ce((bl) => ({ ...bl, [R.id]: Ju(Number(_e.target.value)) }))
                            }
                          ),
                          /* @__PURE__ */ d.jsxs("output", { children: [
                            Kt,
                            "px"
                          ] })
                        ] }),
                        /* @__PURE__ */ d.jsx(
                          "button",
                          {
                            type: "button",
                            className: "rts-height-reset",
                            "aria-label": `Reset height for ${Ce}`,
                            onClick: () => ce((_e) => ({ ..._e, [R.id]: Ju(R.height) })),
                            children: "Reset height"
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ d.jsx("div", { className: "rts-track", children: Ot ? /* @__PURE__ */ d.jsx(Vy, { content: Ot, duration: Mt, view: he }) : /* @__PURE__ */ d.jsx(go, { content: rt, duration: Mt }) })
                  ]
                },
                R.id
              );
            }) }),
            $l.length > 0 && /* @__PURE__ */ d.jsx("div", { className: "rts-grid", "aria-hidden": "true", children: $l.map((R, rt) => /* @__PURE__ */ d.jsx("span", { className: `rts-grid-line ${R.emphasis ? "rts-grid-line-emphasis" : ""} ${R.className ?? ""}`, style: { left: `${R.time * Bt}px` } }, `${R.time}-${rt}`)) }),
            /* @__PURE__ */ d.jsx("div", { className: "rts-playhead", style: { left: `${L + Zt * Bt}px` }, "aria-hidden": "true" })
          ] }) }),
          f && st && /* @__PURE__ */ d.jsx(
            Qy,
            {
              config: f,
              lanes: m,
              time: Zt,
              duration: Mt,
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
            Ea(yt.start),
            " — ",
            Ea(yt.end)
          ] })
        ] })
      ]
    }
  );
}
const fo = /\.(wav|flac|mp3|ogg|opus|m4a|aif|aiff)$/i;
function s0(c) {
  return c === "__source__" || c.startsWith("input/") ? "master" : c.startsWith("stems/") ? c.slice(6).replace(fo, "") : c.startsWith("speech/") && fo.test(c) ? c.replace(fo, "") : null;
}
function ky(c) {
  const f = /* @__PURE__ */ new Map(), r = [], s = /* @__PURE__ */ new Map();
  for (const m of c) for (const y of Array.isArray(m.sourceMap) ? m.sourceMap : [])
    if (typeof y?.audio == "string" && typeof y.data == "string") {
      const S = s0(y.audio.replace(/\\/g, "/"));
      S && (s.set(y.data.replace(/\\/g, "/"), S), typeof y.png == "string" && s.set(y.png.replace(/\\/g, "/"), S));
    }
  const g = (m) => (f.has(m) || f.set(m, { key: m }), f.get(m));
  for (const m of c) {
    const y = (m.id?.replace(/^file:/, "") || "").replace(/\\/g, "/"), S = s0(y), C = y.startsWith("spectrograms/") ? s.get(y) || y.slice(13).replace(/\.(npz|png)$/i, "") : null;
    if (S && (m.content?.type === "waveform" || m.content?.type === "artifact")) {
      const A = g(S);
      (!A.audio || m.id === "__source__") && (A.audio = m);
    } else C && y.endsWith(".npz") && m.content?.type === "image" ? g(C).spectrum = m : C && y.endsWith(".png") && m.content?.type === "image" ? g(C).png = m : r.push(m);
  }
  for (const m of f.values()) {
    if (!m.audio && !m.spectrum) {
      m.png && r.push(m.png);
      continue;
    }
    const y = m.audio || m.spectrum, S = m.audio?.content?.type === "waveform" ? m.audio.content : null, C = m.audio?.content?.type === "artifact" ? m.audio.content.note : null;
    r.push({
      ...y,
      id: m.key === "master" ? "__source__" : `audio:${m.key}`,
      title: m.key === "master" ? "MASTER · uploaded source" : m.key.replace(/\//g, " · ").replace(/_/g, " "),
      kind: "audio",
      height: 160,
      meta: C || (S && m.spectrum ? "waveform + aligned spectrogram" : S ? "waveform · spectrogram pending" : "spectrogram · waveform pending"),
      content: {
        type: "audio",
        view: "both",
        waveform: S ? { min: S.min, max: S.max, colour: S.colour } : void 0,
        spectrogram: m.spectrum ? { src: m.spectrum.content.src, alt: m.spectrum.content.alt } : void 0
      }
    }), !m.spectrum && m.png && r.push(m.png);
  }
  return r;
}
const yo = (c) => typeof c == "number" && Number.isFinite(c) && c > 0, Fy = { canonical: "Canonical", combined: "Consensus · observed tempo", combined_family: "Consensus · canonical tempo family", combined_fit: "Consensus · fitted constant grid" };
function r0(c, f, r, s) {
  if (!yo(c) || !Number.isFinite(f) || f < 0 || !Number.isFinite(r) || r <= 0) return [];
  const g = Math.max(0, Math.floor((r - f) * c / 60 + 1e-9) + 1), m = Math.max(1, Math.ceil(g / 25e3));
  return Array.from({ length: Math.ceil(g / m) }, (y, S) => {
    const C = S * m;
    return {
      time: f + C * 60 / c,
      emphasis: C === 0,
      label: `${s === "original" ? "Original" : "Aligned"} beat ${C + 1}${C === 0 && s === "aligned" ? " · pip 0" : ""}`,
      className: `stemlab-grid-${s}`
    };
  });
}
function Wy(c, f, r, s = "canonical", g = "consensus") {
  const m = c?.schema === "stemlab.beat-offsets.v1" && c.pips_per_beat === 64;
  let y = m ? (c.bpm_bases || []).filter((B) => B.status === "available" && yo(B.bpm)) : [];
  !y.length && yo(f) && (y = [{ id: "canonical", bpm: f }]);
  const S = y.find((B) => B.id === s) || y.find((B) => B.id === "combined_fit") || y[0] || null, C = m ? (c.analyses || []).filter((B) => B.status === "available") : [], A = C.find((B) => B.analysis_id === g) || C.find((B) => B.kind === "consensus") || C[0] || null, E = S && A ? c.comparisons?.find((B) => B.status === "available" && B.bpm_basis === S.id && B.analysis_id === A.analysis_id) : null, h = S ? r0(S.bpm, 0, r, "original") : [], j = E && Number.isFinite(E.beat_zero_seconds) ? r0(E.bpm, E.beat_zero_seconds, r, "aligned") : [];
  return {
    bases: y.map((B) => ({ ...B, label: `${Fy[B.id] || B.id}${B.multiplier ? ` ×${B.multiplier}` : ""} · ${B.bpm.toFixed(4)} BPM` })),
    basis: S,
    analysis: A,
    analyses: C,
    row: E,
    original: h,
    aligned: j,
    thinned: !!S && Math.floor(r * S.bpm / 60) + 1 > 25e3,
    grid: [...h, ...j].sort((B, J) => B.time - J.time)
  };
}
function Iy({ comparison: c, onBasis: f, onAnalysis: r }) {
  const { bases: s, basis: g, analyses: m, analysis: y, row: S, thinned: C } = c;
  return /* @__PURE__ */ d.jsxs("section", { className: "stemlab-beat-offset-controls", "aria-label": "BPM grid comparison", children: [
    /* @__PURE__ */ d.jsxs("div", { className: "stemlab-beat-offset-selectors", children: [
      /* @__PURE__ */ d.jsxs("label", { children: [
        "BPM grid ",
        /* @__PURE__ */ d.jsxs("select", { "aria-label": "BPM grid basis", value: g?.id || "", onChange: (A) => f(A.target.value), disabled: !s.length, children: [
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
    /* @__PURE__ */ d.jsx("output", { "aria-live": "polite", "data-testid": "beat-offset-value", children: S ? `${S.offset_pips.toFixed(6)} pips · first detected beat ${S.first_beat_seconds.toFixed(6)}s · nearest whole offset ${S.integer_offset_pips} pips (${(S.integer_residual_seconds * 1e3).toFixed(3)} ms residual)` : "Waiting for usable beat evidence; no aligned grid is inferred." }),
    y?.constant_grid_fit && /* @__PURE__ */ d.jsxs("p", { className: "small", children: [
      "Selected detector fit: ",
      y.constant_grid_fit.proposed_bpm.toFixed(4),
      " BPM · 95% beat error ",
      y.constant_grid_fit.p95_absolute_beat_error_ms.toFixed(3),
      " ms · grade ",
      y.constant_grid_fit.precision_grade,
      ".",
      g?.fit ? ` Consensus grid fit grade: ${g.fit.precision_grade}.` : ""
    ] }),
    /* @__PURE__ */ d.jsxs("p", { className: "small", children: [
      "Half- and double-time readings are normal. Observed beats stay in their own lanes; tempo-family options compare ×½ / ×1 / ×2 interpretations. Constant grids and detector phases remain estimates.",
      C ? " Dense grids are thinned for display only." : ""
    ] })
  ] });
}
const Py = "stemlab.beat-timeline.v1", Fu = 64, Al = (c) => Number.isSafeInteger(c);
function Mc(c) {
  if (!c || c.schema !== Py || c.pips_per_beat !== Fu || !Number.isSafeInteger(c.source_audio?.sample_rate) || c.source_audio.sample_rate < 1 || !Number.isSafeInteger(c.source_audio?.num_frames) || c.source_audio.num_frames < 2 || !/^[0-9a-f]{64}$/.test(c.source_audio?.sha256 || "") || !/^[0-9a-f]{64}$/.test(c.consensus_sha256 || "") || !Array.isArray(c.beats) || c.beats.length < 2 || c.beats.length > 25e3 || !Al(c.origin_beat)) throw new Error("Not a valid source-bound StemLab beat timeline");
  const f = { beat: -1, frame: -1 };
  for (const r of c.beats) {
    if (!Al(r.beat) || !Al(r.frame) || r.beat <= f.beat || r.frame <= f.frame || r.frame >= c.source_audio.num_frames || !["consensus", "corrected", "manual"].includes(r.source) || r.reference_frame !== null && (!Al(r.reference_frame) || r.reference_frame < 0 || r.reference_frame >= c.source_audio.num_frames) || r.source === "consensus" && r.frame !== r.reference_frame || r.source === "manual" && r.reference_frame !== null)
      throw new Error("Beat indices and source sample frames must increase; original consensus timestamps stay immutable");
    f.beat = r.beat, f.frame = r.frame;
  }
  if (!c.beats.some((r) => r.beat === c.origin_beat)) throw new Error("Beat 1 must identify a real anchor");
  return c;
}
const tn = (c) => ({ ...c, beats: c.beats.map((f) => ({ ...f })) }), en = (c) => Mc(c), tb = (c, f) => c.beats[f].frame / c.source_audio.sample_rate, kn = (c, f) => f < 0 || f + 1 >= c.beats.length ? null : 60 * c.source_audio.sample_rate * (c.beats[f + 1].beat - c.beats[f].beat) / (c.beats[f + 1].frame - c.beats[f].frame), _0 = (c, f) => Math.round(f * c.source_audio.sample_rate);
function o0(c, f, r) {
  const s = tn(c);
  if (!Al(f) || f < 0 || f >= s.beats.length) throw new Error("Select a beat");
  const g = _0(s, r), m = s.beats[f - 1]?.frame ?? -1, y = s.beats[f + 1]?.frame ?? s.source_audio.num_frames;
  if (!Al(g) || g <= m || g >= y) throw new Error("Beat must remain between its neighbours");
  const S = s.beats[f];
  return S.frame = g, S.source = g === S.reference_frame ? "consensus" : S.reference_frame === null ? "manual" : "corrected", en(s);
}
function eb(c, f, r) {
  if (!Number.isFinite(r) || r <= 0 || r > 1200) throw new Error("BPM must be 0..1200");
  const s = tn(c);
  if (!Al(f) || f < 0 || f + 1 >= s.beats.length) throw new Error("Choose an interval");
  const g = s.beats[f], m = s.beats[f + 1], y = Math.round(60 * (m.beat - g.beat) * s.source_audio.sample_rate / r);
  if (y < 1) throw new Error("BPM exceeds available sample precision");
  const S = g.frame + y - m.frame;
  for (let C = f + 1; C < s.beats.length; C++) {
    const A = s.beats[C];
    A.frame += S, A.source = A.reference_frame === null ? "manual" : A.frame === A.reference_frame ? "consensus" : "corrected";
  }
  return en(s);
}
function lb(c, f) {
  if (!Number.isFinite(f) || Math.abs(f) > 1e5) throw new Error("Phase shift is out of bounds");
  const r = tn(c), s = kn(r, 0), g = Math.round(f / Fu * (60 / s) * r.source_audio.sample_rate);
  for (const m of r.beats)
    m.frame += g, m.source = m.reference_frame === null ? "manual" : m.frame === m.reference_frame ? "consensus" : "corrected";
  return en(r);
}
function f0(c, f) {
  const r = tn(c), s = _0(r, f);
  if (!Al(s) || s < 0 || s >= r.source_audio.num_frames) throw new Error("Beat outside source");
  let g = r.beats.findIndex((A) => A.frame > s);
  if (g < 0 && (g = r.beats.length), g === 0 || g === r.beats.length || r.beats[g - 1].frame === s)
    throw new Error("Insert between two existing anchors; use the timeline selection to move end beats");
  const m = r.beats[g - 1], y = r.beats[g], S = y.beat - m.beat > 1, C = m.beat + 1;
  if (!S) {
    r.origin_beat >= y.beat && (r.origin_beat += 1);
    for (let A = g; A < r.beats.length; A++) r.beats[A].beat += 1;
  }
  return r.beats.splice(g, 0, { beat: C, frame: s, source: "manual", reference_frame: null }), en(r);
}
function ab(c, f) {
  const r = tn(c);
  if (!Al(f) || f < 0 || f >= r.beats.length || r.beats.length <= 2)
    throw new Error("Keep at least two beat anchors");
  const [s] = r.beats.splice(f, 1);
  return s.beat === r.origin_beat && (r.origin_beat = r.beats[Math.min(f, r.beats.length - 1)].beat), en(r);
}
function nb(c, f) {
  const r = tn(c);
  if (!Al(f) || f < 0 || f >= r.beats.length) throw new Error("Select Beat 1");
  return r.origin_beat = r.beats[f].beat, en(r);
}
function ub(c) {
  const f = tn(c);
  for (const r of f.beats) r.reference_frame !== null && (r.frame = r.reference_frame, r.source = "consensus");
  return en(f);
}
function ib(c) {
  const f = kn(c, 0), r = c.beats.find((s) => s.beat === c.origin_beat);
  return c.beats.map((s) => ({
    time: s.frame / c.source_audio.sample_rate,
    value: Fu * (s.beat - c.origin_beat) - (s.frame - r.frame) * f * Fu / (c.source_audio.sample_rate * 60)
  }));
}
function cb(c, f, r = 3e3) {
  if (!c?.beats?.length) return [];
  const s = c.source_audio.sample_rate, g = Number.isFinite(f?.start) ? f.start : 0, m = Number.isFinite(f?.end) && f.end > g ? f.end : Number.MAX_VALUE, y = c.beats.filter((C) => C.frame / s >= g - 0.05 && C.frame / s <= m + 0.05), S = Math.max(1, Math.ceil(y.length / r));
  return y.filter((C, A) => A % S === 0).map((C) => ({
    time: C.frame / s,
    emphasis: C.beat === c.origin_beat,
    label: `Corrected beat ${C.beat} · native pip ${(C.beat - c.origin_beat) * Fu}`,
    className: "stemlab-grid-corrected"
  }));
}
const ku = 20, bo = 400, T0 = (c, f, r) => Math.max(f, Math.min(r, c)), d0 = (c) => 100 * (1 - Math.log(T0(c, ku, bo) / ku) / Math.log(bo / ku)), sb = (c, f) => ku * (bo / ku) ** T0(1 - (c - f.top) / f.height, 0, 1);
async function mo(c, f = "GET", r) {
  const s = await fetch(
    `/api/${c}/beat-timeline${f === "POST" ? "/preview" : ""}`,
    { method: f, headers: { "Content-Type": "application/json" }, body: r === void 0 ? void 0 : JSON.stringify(r), cache: "no-store" }
  ), g = await s.json().catch(() => ({}));
  if (!s.ok) throw new Error(g.detail || `Beat timeline HTTP ${s.status}`);
  return g;
}
function rb({ map: c, duration: f, visible: r, selected: s, onSelect: g, onEdit: m, onInsert: y }) {
  const S = c.source_audio.sample_rate, A = c.beats.map((h, j) => ({ row: h, i: j })).filter(({ row: h }) => {
    const j = h.frame / S;
    return j >= r.start - 0.1 && j <= r.end + 0.1;
  }), E = Math.max(1, Math.ceil(A.length / 2e3));
  return /* @__PURE__ */ d.jsx(
    "div",
    {
      className: "stemlab-beatmap-track",
      "aria-label": "Editable sample-accurate beat anchors",
      onDoubleClick: (h) => {
        if (h.target !== h.currentTarget) return;
        const j = h.currentTarget.getBoundingClientRect();
        y((h.clientX - j.left) / j.width * f), h.stopPropagation();
      },
      children: A.filter((h, j) => j % E === 0).map(({ row: h, i: j }) => /* @__PURE__ */ d.jsx(
        "button",
        {
          type: "button",
          className: `stemlab-beatmap-anchor ${h.source} ${s === j ? "selected" : ""} ${h.beat === c.origin_beat ? "origin" : ""}`,
          "aria-label": `Beat ${h.beat}, ${tb(c, j).toFixed(6)} seconds, ${h.source}; drag or use arrow keys`,
          "aria-pressed": s === j,
          title: `Beat ${h.beat}: frame ${h.frame} · ${(h.frame / S).toFixed(6)} s · ${h.source}${h.reference_frame === null ? "" : ` · reference ${h.reference_frame}`}`,
          style: { left: `${h.frame / (S * Math.max(f, 1e-9)) * 100}%` },
          onPointerDown: (B) => {
            B.currentTarget.setPointerCapture(B.pointerId), g(j), B.stopPropagation();
          },
          onPointerMove: (B) => {
            if (!B.currentTarget.hasPointerCapture(B.pointerId)) return;
            const J = B.currentTarget.parentElement.getBoundingClientRect();
            m(j, (B.clientX - J.left) / J.width * f), B.stopPropagation();
          },
          onPointerUp: (B) => {
            B.currentTarget.releasePointerCapture(B.pointerId), B.stopPropagation();
          },
          onClick: (B) => {
            g(j), B.stopPropagation();
          },
          onKeyDown: (B) => {
            if (B.key !== "ArrowLeft" && B.key !== "ArrowRight") return;
            B.preventDefault(), B.stopPropagation();
            const J = B.shiftKey ? Math.max(1, Math.round(S / 1e3)) : 1;
            m(j, (h.frame + (B.key === "ArrowLeft" ? -J : J)) / S);
          },
          children: /* @__PURE__ */ d.jsx("span", { children: h.beat === c.origin_beat ? "1" : "" })
        },
        h.beat
      ))
    }
  );
}
function ob({ map: c, duration: f, visible: r, selected: s, onSelect: g, onTempo: m }) {
  const y = c.source_audio.sample_rate, S = c.beats.slice(0, -1).map((E, h) => ({
    i: h,
    start: E.frame / y,
    end: c.beats[h + 1].frame / y,
    bpm: kn(c, h)
  })).filter((E) => E.end >= r.start && E.start <= r.end), C = Math.max(1, Math.ceil(S.length / 1800)), A = S.filter((E, h) => h % C === 0);
  return /* @__PURE__ */ d.jsxs("div", { className: "stemlab-beatmap-tempo", "aria-label": "Editable local BPM envelope", children: [
    /* @__PURE__ */ d.jsx("svg", { className: "stemlab-beatmap-tempo-line", viewBox: "0 0 1000 100", preserveAspectRatio: "none", "aria-hidden": "true", children: /* @__PURE__ */ d.jsx(
      "polyline",
      {
        points: A.map((E) => `${(E.start + E.end) / 2 / Math.max(f, 1e-9) * 1e3},${d0(E.bpm)}`).join(" "),
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
        style: { left: `${(E.start + E.end) / 2 / Math.max(f, 1e-9) * 100}%`, top: `${d0(E.bpm)}%` },
        title: `Interval ${E.i} → ${E.i + 1}: ${E.bpm.toFixed(3)} BPM · drag vertically to change local tempo`,
        "aria-label": `BPM envelope interval ${E.i}: ${E.bpm.toFixed(3)} BPM`,
        "aria-pressed": s === E.i,
        onPointerDown: (h) => {
          h.currentTarget.setPointerCapture(h.pointerId), g(E.i), h.stopPropagation();
        },
        onPointerMove: (h) => {
          if (!h.currentTarget.hasPointerCapture(h.pointerId)) return;
          const j = h.currentTarget.parentElement.getBoundingClientRect();
          m(E.i, sb(h.clientY, j)), h.stopPropagation();
        },
        onPointerUp: (h) => {
          h.currentTarget.releasePointerCapture(h.pointerId), h.stopPropagation();
        },
        onClick: (h) => {
          g(E.i), h.stopPropagation();
        },
        onKeyDown: (h) => {
          h.key !== "ArrowUp" && h.key !== "ArrowDown" || (h.preventDefault(), h.stopPropagation(), m(E.i, Math.max(0.01, E.bpm + (h.key === "ArrowUp" ? 1 : -1) * (h.shiftKey ? 0.01 : 1))));
        },
        children: E.bpm.toFixed(1)
      },
      E.i
    ))
  ] });
}
function fb(c, f, r = !0) {
  const [s, g] = w.useState(null), [m, y] = w.useState(!1), [S, C] = w.useState(null), [A, E] = w.useState(!1), [h, j] = w.useState(!1), [B, J] = w.useState(!0), [L, I] = w.useState(0), [dt, V] = w.useState({ start: 0, end: 1 / 0 }), [K, Nt] = w.useState(!1), [Tt, vt] = w.useState(!0), [Z, ot] = w.useState(""), [Pt, it] = w.useState("0"), [st, mt] = w.useState(""), [Ut, Mt] = w.useState(!1), [bt, q] = w.useState([]), [G, Y] = w.useState([]), $ = w.useRef(null), nt = w.useRef(0), At = w.useRef(null);
  At.current = s;
  const Ft = w.useCallback(async (X = !1) => {
    if (!(A && !X && !window.confirm("Discard unsaved beat edits and reload the saved map?")))
      try {
        const lt = await mo(c);
        if (!lt.available) {
          j(!1);
          return;
        }
        Mc(lt.map), g(lt.map), j(!0), y(lt.saved), C(lt.revision), E(!1), q([]), Y([]), I(0), ot(kn(lt.map, 0)?.toFixed(3) || ""), mt(lt.saved ? "Loaded saved beat corrections" : "Prepared an editable proposal at exact consensus sample frames");
      } catch (lt) {
        lt.message.includes("HTTP 404") && !At.current ? J(!1) : mt(lt.message);
      }
  }, [c, A]);
  w.useEffect(() => {
    if (!r) return;
    let X = !0;
    const lt = async () => {
      X && await Ft(!0);
    };
    lt();
    const yt = window.setInterval(() => {
      X && !At.current && lt();
    }, 5e3);
    return () => {
      X = !1, window.clearInterval(yt);
    };
  }, [c]);
  const Zt = w.useCallback((X) => {
    try {
      const lt = At.current;
      if (!lt) return;
      const yt = X(lt);
      lt.review_status === "artist_confirmed" && yt.review_status === "artist_confirmed" && (yt.beats !== lt.beats || yt.origin_beat !== lt.origin_beat) && (yt.review_status = "estimated"), Mc(yt), g(yt), E(!0), q((Yt) => [...Yt.slice(-59), lt]), Y([]), mt("Unsaved beat-map edits · original consensus unchanged");
    } catch (lt) {
      mt(lt.message);
    }
  }, []), p = () => {
    bt.length && (Y((X) => [...X.slice(-59), s]), g(bt.at(-1)), q((X) => X.slice(0, -1)), E(!0));
  }, H = () => {
    G.length && (q((X) => [...X.slice(-59), s]), g(G.at(-1)), Y((X) => X.slice(0, -1)), E(!0));
  }, tt = (X) => {
    I(X), ot(kn(At.current, X)?.toFixed(3) || "");
  }, P = async (X) => {
    const lt = await mo(c, "POST", X);
    return Mc(lt), lt;
  }, _t = async () => {
    if (s) {
      Mt(!0);
      try {
        const X = await mo(c, "PUT", { map: s, expected_revision: S });
        g(X.map), y(!0), C(X.revision), E(!1), q([]), Y([]), mt("Beat corrections saved separately from the consensus detections");
      } catch (X) {
        mt(X.message);
      } finally {
        Mt(!1);
      }
    }
  }, gt = async (X) => {
    if (s) {
      Mt(!0);
      try {
        const lt = await P(s), yt = JSON.stringify(lt, null, 2);
        if (X === "copy")
          await navigator.clipboard.writeText(yt), mt("Copied one complete beat-timeline JSON value with Beat 1 and pip phase synchronisation");
        else {
          const Yt = new Blob([yt + `
`], { type: "application/json" }), te = URL.createObjectURL(Yt), Bt = document.createElement("a");
          Bt.href = te, Bt.download = `stemlab-beat-timeline-${c.slice(0, 12)}.json`, document.body.appendChild(Bt), Bt.click(), Bt.remove(), URL.revokeObjectURL(te), mt("Exported a single source-bound beat-timeline JSON file");
        }
      } catch (lt) {
        mt(lt.message);
      } finally {
        Mt(!1);
      }
    }
  }, Et = async (X) => {
    const lt = X.target.files?.[0];
    if (X.target.value = "", !!lt) {
      if (lt.size > 32 * 1024 * 1024) {
        mt("Import limited to 32 MiB");
        return;
      }
      Mt(!0);
      try {
        const yt = JSON.parse(await lt.text()), Yt = await P(yt);
        g(Yt), E(!0), q((te) => s ? [...te.slice(-59), s] : te), Y([]), mt("Imported and validated: review changes before saving. Original consensus unchanged.");
      } catch (yt) {
        mt(yt.message);
      } finally {
        Mt(!1);
      }
    }
  }, k = (X, lt) => Zt((yt) => eb(yt, X, lt)), ut = () => Zt((X) => ub(X)), ce = s && K && f > 0 ? [
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
          duration: f,
          visible: dt,
          selected: L,
          onSelect: tt,
          onEdit: (X, lt) => Zt((yt) => o0(yt, X, lt)),
          onInsert: (X) => Zt((lt) => f0(lt, X))
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
        ob,
        {
          map: s,
          duration: f,
          visible: dt,
          selected: L,
          onSelect: tt,
          onTempo: k
        }
      ) }
    },
    {
      id: "corrected:phase",
      title: "Phase CV",
      kind: "beatmap",
      height: 80,
      meta: "Relative pips vs the opening tempo · visible irregular drift",
      content: { type: "curve", points: ib(s).filter((X, lt) => lt % Math.max(1, Math.ceil(s.beats.length / 4e3)) === 0), colour: "#ecb7fd" }
    }
  ] : [], gl = s && Tt ? cb(s, dt) : [], ne = s?.beats?.[Math.min(L, s.beats.length - 1)], le = s?.source_audio?.sample_rate || 1, jt = s && L < s.beats.length - 1 ? kn(s, L) : null, ft = /* @__PURE__ */ d.jsxs("section", { className: "stemlab-beatmap-panel", "aria-label": "Editable variable tempo and Beat 1 phase", children: [
    /* @__PURE__ */ d.jsxs("header", { children: [
      /* @__PURE__ */ d.jsx("strong", { children: "Beat correction · variable BPM & phase" }),
      s && /* @__PURE__ */ d.jsxs("span", { children: [
        s.beats.length.toLocaleString(),
        " anchors · ",
        m ? "saved" : "consensus draft",
        A ? " · unsaved changes" : ""
      ] }),
      /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => Nt((X) => !X), children: K ? "Hide editor" : "Show editor" })
    ] }),
    K && s && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
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
              value: ne?.beat ?? 0,
              onChange: (X) => {
                const lt = s.beats.findIndex((yt) => yt.beat === Number(X.target.value));
                lt >= 0 && tt(lt);
              }
            }
          )
        ] }),
        /* @__PURE__ */ d.jsxs("output", { children: [
          "Frame ",
          ne?.frame ?? 0,
          " · ",
          ne ? (ne.frame / le).toFixed(6) : "0",
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
              onChange: (X) => ot(X.target.value),
              onKeyDown: (X) => {
                X.key === "Enter" && k(L, Number(Z));
              }
            }
          )
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: L >= s.beats.length - 1, onClick: () => k(L, Number(Z)), children: "Apply BPM" }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Phase shift (pips) ",
          /* @__PURE__ */ d.jsx(
            "input",
            {
              "aria-label": "Global phase shift pips",
              type: "number",
              step: "0.25",
              value: Pt,
              onChange: (X) => it(X.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => Zt((X) => lb(X, Number(Pt))), children: "Shift all beats" })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-beatmap-actions", children: [
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => Zt((X) => o0(X, L, nt.current)), children: "Place selected at playhead" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => Zt((X) => f0(X, nt.current)), children: "Insert at playhead" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => Zt((X) => nb(X, L)), children: "Set selected as Beat 1" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => Zt((X) => ab(X, L)), children: "Delete selected" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: !bt.length, onClick: p, children: "Undo" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: !G.length, onClick: H, children: "Redo" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: ut, children: "Match consensus beats" }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          /* @__PURE__ */ d.jsx("input", { type: "checkbox", checked: Tt, onChange: (X) => vt(X.target.checked) }),
          "Corrected grid"
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          /* @__PURE__ */ d.jsx(
            "input",
            {
              type: "checkbox",
              checked: s.review_status === "artist_confirmed",
              onChange: (X) => Zt((lt) => ({ ...lt, review_status: X.target.checked ? "artist_confirmed" : "estimated" }))
            }
          ),
          "Artist-reviewed Beat 1 / phase"
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-beatmap-export", children: [
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: Ut || !A, onClick: _t, children: "Save corrections" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: Ut, onClick: () => gt("download"), children: "Export Beat 1 + full beat timeline JSON" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: Ut, onClick: () => gt("copy"), children: "Copy JSON value" }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: Ut, onClick: () => $.current?.click(), children: "Import JSON" }),
        /* @__PURE__ */ d.jsx("input", { ref: $, type: "file", accept: ".json,application/json", hidden: !0, onChange: Et }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => Ft(), children: "Reload saved/consensus" })
      ] }),
      /* @__PURE__ */ d.jsxs("small", { children: [
        "Current local BPM: ",
        jt?.toFixed(3) ?? "last anchor",
        " · original consensus matches remain labelled separately. Native timebase: 64 pips/beat, imported DanceMoves clocks use 16 ticks/beat. DanceMoves supports optional beat-timeline.v1 variable playback where its new consumer is installed; beat-alignment.v1 remains a separate fixed-tempo format."
      ] })
    ] }),
    !h && K && /* @__PURE__ */ d.jsx("p", { children: "Waiting for an available consensus beat list (and exact master audio). No timing is invented." }),
    st && /* @__PURE__ */ d.jsx("output", { role: "status", className: "stemlab-beatmap-status", children: st })
  ] });
  return {
    map: s,
    revision: S,
    saved: m,
    ready: h,
    dirty: A,
    lanes: ce,
    grid: gl,
    panel: B ? ft : null,
    onWindowChange: V,
    onTimeChange: (X) => {
      nt.current = X;
    }
  };
}
const po = Object.freeze(["SECTION", "ENTRY", "DROP", "BREAK"]), $u = Object.freeze([
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
]), Wa = (c, f) => Math.round(Number(c) * f);
function db(c, { warningTicks: f = 5, severeTicks: r = 3, ticksPerBeat: s = 16 } = {}) {
  if (!c || c.clock_mode !== "fixed") return [];
  const g = Number(c.sample_rate), m = Number(c.fixed_clock?.bpm);
  if (!Number.isFinite(g) || g <= 0 || !Number.isFinite(m) || m <= 0) return [];
  const y = new Map(c.lines.map((A) => [A.id, A])), S = /* @__PURE__ */ new Map();
  for (const A of c.words)
    S.has(A.line_id) || S.set(A.line_id, []), S.get(A.line_id).push(A);
  const C = [];
  for (const [A, E] of S) {
    E.sort((h, j) => h.start_frame - j.start_frame);
    for (let h = 1; h < E.length; h++) {
      const j = E[h - 1], B = E[h], J = (B.start_frame - j.start_frame) / g, L = J * m / 60 * s;
      L >= f || C.push({
        lineId: A,
        line: y.get(A)?.text || A,
        fromId: j.id,
        toId: B.id,
        fromWord: j.word,
        toWord: B.word,
        seconds: J,
        ticks: L,
        severity: L < r ? "severe" : "warning"
      });
    }
  }
  return C;
}
function Eo(c, f) {
  const r = String(c).trim().toUpperCase(), s = String(f).trim().toUpperCase().replace(/ +/g, " ");
  if (!po.includes(r)) throw new Error("Cue type must be SECTION, ENTRY, DROP or BREAK");
  const g = /^([A-Z][A-Z -]*?)(?: ([1-9][0-9]{0,2}|A|B|FINAL))?$/.exec(s);
  if (!g || !$u.includes(g[1]) || s.length > 64)
    throw new Error("Use a standard section (INTRO, VERSE 1, CHORUS, BUILD 1, DROP 1, OUTRO, etc.)");
  return { type: r, section: s, label: `[${r}: ${s}]` };
}
const No = (c) => ({ ...c, lines: c.lines.map((f) => ({ ...f })), words: c.words.map((f) => ({ ...f })), cues: c.cues.map((f) => ({ ...f })), fixed_clock: { ...c.fixed_clock } });
function $n(c, f, r, s) {
  if (!Number.isSafeInteger(c) || c < f || c > r) throw new Error(`${s} cannot cross its parent, another event or source duration`);
  return c;
}
function mb(c, f = "start_frame") {
  return c.every((r, s) => s === 0 || r[f] >= c[s - 1][f]);
}
function hb(c, f, r) {
  const s = No(c), g = c.sample_rate, m = c.num_frames;
  if (!Number.isSafeInteger(g) || !Number.isSafeInteger(m) || g < 1 || m < 2) throw new Error("Invalid source-frame metadata");
  if (f === "cue") {
    const y = s.cues.findIndex((E) => E.id === r.id);
    if (y < 0) throw new Error("Cue not found");
    const S = s.cues[y], C = Eo(r.type ?? S.type, r.section ?? S.section), A = $n(Wa(r.start, g), 0, m - 1, "Cue");
    if (s.cues[y] = { ...s.cues[y], frame: A, type: C.type, section: C.section }, !mb(s.cues, "frame")) throw new Error("Cue movement must preserve chronological order");
  } else if (f === "line") {
    const y = s.lines.findIndex((j) => j.id === r.id);
    if (y < 0) throw new Error("Lyric line not found");
    const S = s.lines[y], C = $n(Wa(r.start, g), 0, m - 1, "Line"), A = $n(Wa(r.end, g), C + 1, m, "Line");
    if (y > 0 && C < s.lines[y - 1].end_frame || y + 1 < s.lines.length && A > s.lines[y + 1].start_frame)
      throw new Error("Lyric line cannot cross neighbouring line bounds");
    s.lines[y] = { ...S, start_frame: C, end_frame: A };
    const E = C - S.start_frame, h = A - C === S.end_frame - S.start_frame;
    for (const j of s.words) if (j.line_id === S.id && (h && (j.start_frame += E, j.end_frame += E), j.start_frame < C || j.end_frame > A))
      throw new Error("Line edit would cut off a word; adjust its words first");
  } else if (f === "word") {
    const y = s.words.findIndex((B) => B.id === r.id);
    if (y < 0) throw new Error("Word not found");
    const S = s.words[y], C = s.lines.find((B) => B.id === S.line_id);
    if (!C) throw new Error("Word parent line missing");
    const A = $n(Wa(r.start, g), C.start_frame, C.end_frame - 1, "Word"), E = $n(Wa(r.end, g), A + 1, C.end_frame, "Word"), h = s.words.filter((B) => B.line_id === S.line_id), j = h.findIndex((B) => B.id === S.id);
    if (j > 0 && A < h[j - 1].end_frame || j + 1 < h.length && E > h[j + 1].start_frame)
      throw new Error("Word cannot overlap a neighbour within the same lyric line");
    s.words[y] = { ...S, start_frame: A, end_frame: E };
  } else throw new Error("Expected line, word or cue edit");
  return s.review_status = "draft", s;
}
function vb(c, f, r, s = {}) {
  const g = No(c), m = c.sample_rate, y = $n(Wa(r, m), 0, c.num_frames - 1, "Playhead"), S = new Set([...c.lines, ...c.words, ...c.cues].map((E) => E.id)), C = { line: "line", word: "word", cue: "cue" }[f];
  if (!C) throw new Error("Unknown timing track");
  let A;
  for (let E = 1; E <= 1e5 && (A = `${C}-edit-${E}`, !!S.has(A)); E++)
    ;
  if (S.has(A)) throw new Error("Too many events");
  if (f === "cue") {
    const { type: E, section: h } = Eo(s.type || "SECTION", s.section || "INTRO");
    g.cues.push({ id: A, frame: y, type: E, section: h }), g.cues.sort((j, B) => j.frame - B.frame);
  } else if (f === "line") {
    const E = String(s.text || "").trim();
    if (!E) throw new Error("Type lyric text before adding a line");
    const h = c.lines.find((J) => J.start_frame > y), j = [...c.lines].reverse().find((J) => J.start_frame <= y);
    if (j && y < j.end_frame) throw new Error("Playhead is inside an existing line");
    const B = Math.min(c.num_frames, h?.start_frame ?? c.num_frames, y + Math.round(m * 2));
    if (B <= y) throw new Error("No room for a new line");
    g.lines.push({ id: A, start_frame: y, end_frame: B, text: E }), g.lines.sort((J, L) => J.start_frame - L.start_frame);
  } else {
    const E = g.lines.find((I) => I.id === s.lineId);
    if (!E) throw new Error("Select a lyric line before adding its word");
    const h = String(s.word || "").trim();
    if (!h) throw new Error("Type word text before adding a word");
    if (y < E.start_frame || y >= E.end_frame) throw new Error("Playhead must be within selected lyric line");
    const j = g.words.filter((I) => I.line_id === E.id), B = j.find((I) => I.start_frame > y), J = [...j].reverse().find((I) => I.start_frame <= y);
    if (J && J.end_frame > y) throw new Error("Playhead is already within another word");
    const L = Math.min(E.end_frame, B?.start_frame ?? E.end_frame, y + Math.round(m * 0.25));
    if (L <= y) throw new Error("No room within the selected lyric line");
    g.words.push({ id: A, line_id: E.id, start_frame: y, end_frame: L, word: h }), g.words.sort((I, dt) => I.start_frame - dt.start_frame);
  }
  return g.review_status = "draft", g;
}
function gb(c, f, r) {
  const s = No(c), g = { line: "lines", word: "words", cue: "cues" }[f];
  if (!g) throw new Error("Invalid track");
  if (f === "line" && s.words.some((m) => m.line_id === r)) throw new Error("Delete or reassign words before deleting their line");
  return s[g] = s[g].filter((m) => m.id !== r), s.review_status = "draft", s;
}
const xc = async (c, f = "GET", r = null, s = "") => {
  const g = await fetch(`/api/${c}/song-timing${s}`, {
    method: f,
    headers: r ? { "Content-Type": "application/json" } : void 0,
    body: r ? JSON.stringify(r) : void 0,
    cache: "no-store"
  }), m = await g.json();
  if (!g.ok) throw new Error(m.detail || `Timing edits HTTP ${g.status}`);
  return m;
}, m0 = (c, f) => c / f, Ku = (c, f) => `stemlab-${f.slice(0, 12)}-${c}`;
function yb(c, f, r) {
  const s = new Blob([c], { type: r }), g = URL.createObjectURL(s), m = document.createElement("a");
  try {
    m.href = g, m.download = f, document.body.appendChild(m), m.click(), m.remove();
  } finally {
    window.setTimeout(() => URL.revokeObjectURL(g), 1e3);
  }
}
function bb(c, f, r, s = !0, g = {}) {
  const [m, y] = w.useState(null), [S, C] = w.useState(!1), [A, E] = w.useState(null), [h, j] = w.useState(!1), [B, J] = w.useState(!1), [L, I] = w.useState(!0), [dt, V] = w.useState("all"), [K, Nt] = w.useState({ kind: "line", id: null }), [Tt, vt] = w.useState(""), [Z, ot] = w.useState(!1), [Pt, it] = w.useState(0.15), [st, mt] = w.useState(!1), [Ut, Mt] = w.useState(!1), [bt, q] = w.useState(0), [G, Y] = w.useState({ start: 0, end: 1 / 0 }), [$, nt] = w.useState(""), [At, Ft] = w.useState(""), [Zt, p] = w.useState("SECTION"), [H, tt] = w.useState("INTRO"), [P, _t] = w.useState("lines"), [gt, Et] = w.useState("bundle"), k = w.useRef(0), ut = w.useRef(null), ce = w.useRef(null), gl = w.useRef(c), ne = w.useRef(!1);
  ce.current = m;
  const le = w.useCallback(async (x = !1) => {
    if (!(!x && ce.current && h && !window.confirm("Discard unsaved song timing changes?")))
      try {
        const W = await xc(c);
        if (!W.available) {
          vt(W.reason || "Waiting for exact source audio");
          return;
        }
        if (gl.current !== c) return;
        y(W.document), C(W.saved), E(W.revision), j(!1), Nt({ kind: "line", id: W.document.lines[0]?.id ?? null }), vt(W.warnings?.join(" · ") || "Song timing loaded · source evidence unchanged");
      } catch (W) {
        vt(W.message);
      }
  }, [c, h]);
  w.useEffect(() => {
    if (!s) return;
    gl.current = c, y(null), E(null), j(!1), Nt({ kind: "line", id: null }), le(!0);
    const x = window.setInterval(() => {
      !ce.current && !ne.current && le(!0);
    }, 5e3);
    return () => window.clearInterval(x);
  }, [c]);
  const jt = w.useCallback((x) => {
    try {
      const W = ce.current;
      if (!W) return;
      const Rt = x(W);
      y(Rt), j(!0), vt("Unsaved song timing edits · original evidence preserved");
    } catch (W) {
      vt(W.message);
    }
  }, []), ft = m?.sample_rate || 1, X = m ? m.num_frames / ft : Math.max(0, f), lt = m?.lines.find((x) => x.id === (K.kind === "line" ? K.id : m?.words.find((W) => W.id === K.id)?.line_id)) ?? m?.lines[0] ?? null, yt = K.kind, Yt = m?.[yt === "line" ? "lines" : yt === "word" ? "words" : "cues"].find((x) => x.id === K.id) ?? null, te = !!(r?.map?.beats?.length && r?.map?.source_audio?.sha256 === c), Bt = r?.revision ?? null, cl = m?.clock_mode === "variable", yl = w.useMemo(() => m ? m.clock_mode === "variable" ? te ? { ...r.map, mode: "variable" } : null : { mode: "fixed", bpm: m.fixed_clock.bpm, firstBeatSeconds: m.fixed_clock.first_beat_frame / ft } : null, [m, te, r?.map, ft]), Na = (x) => {
    jt((W) => ({ ...W, clock_mode: x, beat_revision: x === "variable" ? Bt : null, review_status: "draft" }));
  }, $l = (x, W) => jt((Rt) => ({ ...Rt, fixed_clock: { ...Rt.fixed_clock, [x]: W }, review_status: "draft" })), Be = (x, W) => jt((Rt) => hb(Rt, x, W)), jl = (x) => jt((W) => vb(W, x, k.current, {
    text: $,
    word: At,
    lineId: lt?.id,
    type: Zt,
    section: H
  })), Rl = (x, W, Rt) => jt((Jt) => {
    if (!Rt.trim() || /\r|\n|[\x00-\x1f]/.test(Rt)) throw new Error("Text must be nonempty, without newlines");
    const ve = x === "line" ? "lines" : "words", Ma = x === "line" ? "text" : "word";
    return { ...Jt, [ve]: Jt[ve].map((Wn) => Wn.id === W ? { ...Wn, [Ma]: Rt.trim() } : Wn), review_status: "draft" };
  }), xa = (x, W, Rt) => jt((Jt) => {
    const ve = Eo(W, Rt);
    return { ...Jt, cues: Jt.cues.map((Ma) => Ma.id === x ? { ...Ma, type: ve.type, section: ve.section } : Ma), review_status: "draft" };
  }), ln = async () => {
    if (m) {
      J(!0), ne.current = !0;
      try {
        if (cl && (r?.dirty || !te)) throw new Error("Save/reload the corrected beat map first; an enabled variable clock must refer to the current real beat map");
        const x = await xc(c, "PUT", { document: m, expected_revision: A });
        y(x.document), E(x.revision), C(!0), j(!1), vt("Saved exact source-frame corrections · original canonical, cue and ASR files unchanged");
      } catch (x) {
        vt(x.message);
      } finally {
        J(!1), ne.current = !1;
      }
    }
  }, R = async () => {
    if (m) {
      J(!0), ne.current = !0;
      try {
        if (cl && (r?.dirty || !te)) throw new Error("Save and verify the exact beat map before exporting variable-clock timing");
        const x = await xc(c, "POST", { document: m }, "/preview"), W = {
          bundle: [JSON.stringify(x, null, 2) + `
`, Ku("timing-bundle", c) + ".json", "application/json"],
          lines: [x.line_lrc, Ku("lines", c) + ".lrc", "text/plain;charset=utf-8"],
          words: [x.word_tsv, Ku("words", c) + ".tsv", "text/tab-separated-values;charset=utf-8"],
          wordjson: [JSON.stringify(x.word_json, null, 2) + `
`, Ku("words", c) + ".json", "application/json"],
          cues: [x.cue_lrc, Ku("cues", c) + ".lrc", "text/plain;charset=utf-8"]
        };
        yb(...W[gt]), vt(`Exported ${gt} · source-bound clock and all timing forms remain available via the bundle`);
      } catch (x) {
        vt(x.message);
      } finally {
        J(!1), ne.current = !1;
      }
    }
  }, rt = async (x) => {
    const W = x.target.files?.[0];
    if (x.target.value = "", !W || !m) return;
    if (W.size > 1048576) {
      vt("Timing import limited to 1 MiB");
      return;
    }
    const Rt = W.name.split(".").at(-1).toLowerCase();
    J(!0), ne.current = !0;
    try {
      const Jt = await xc(c, "POST", { document: m, kind: P, format: Rt, text: await W.text() }, "/import");
      y(Jt.document), j(!0), vt(`Imported ${P} for review; not saved until Save corrections`);
    } catch (Jt) {
      vt(Jt.message);
    } finally {
      J(!1), ne.current = !1;
    }
  }, Ot = (x) => {
    const W = x.start_frame ?? x.frame, Rt = x.end_frame ?? W;
    return W / ft <= G.end + 0.01 && Rt / ft >= G.start - 0.01;
  }, se = w.useMemo(() => db(m), [m]), he = w.useMemo(() => new Map(se.map((x) => [x.toId, x.severity])), [se]), Kt = (x, W) => ({
    id: x.id,
    label: W === "cue" ? `[${x.type}: ${x.section}]` : W === "word" ? x.word : x.text,
    ...W === "cue" ? { type: x.type, section: x.section } : {},
    start: m0(x.start_frame ?? x.frame, ft),
    ...W === "cue" ? {} : { end: m0(x.end_frame, ft) },
    ...W === "word" ? { parentId: x.line_id, className: he.has(x.id) ? `stemlab-short-transition-${he.get(x.id)}` : "" } : {}
  }), Ce = m?.lines || [], _e = dt === "all" ? m?.words || [] : (m?.words || []).filter((x) => x.line_id === lt?.id), bl = (m?.lines || []).filter((x) => x.start_frame / ft <= bt && x.end_frame / ft > bt), an = new Map(bl.map((x) => [x.id, (m?.words || []).filter((W) => W.line_id === x.id)])), Fn = (x, W, Rt = null) => ({
    id: `timing:${x}`,
    kind: `timing-${x}`,
    title: x === "line" ? "Lyric lines · editable" : x === "word" ? dt === "all" ? "Words · all lyrics" : `Words · ${lt?.text || "select a line"}` : "Cue sections · editable",
    meta: `${W.length} ${x} events · drag or arrow to adjust · ${yl?.mode || "no clock"} match`,
    height: x === "word" ? 88 : 94,
    content: {
      type: "timing",
      kind: x,
      clock: yl,
      editable: !0,
      snap: Z,
      toleranceSeconds: Pt,
      items: W.filter(Ot).slice(0, 1600).map((Jt) => Kt(Jt, x)),
      parents: Rt ? Rt.map((Jt) => ({ id: Jt.id, start: Jt.start_frame / ft, end: Jt.end_frame / ft })) : void 0,
      selectedId: K.kind === x ? K.id : null,
      onSelect: (Jt) => Nt({ kind: x, id: Jt }),
      onEdit: (Jt) => Be(x, Jt)
    }
  }), Iu = m && L ? [
    Fn("line", Ce),
    Fn("word", _e, Ce),
    Fn("cue", m.cues)
  ] : [], jc = /* @__PURE__ */ d.jsxs("section", { className: "stemlab-timing-panel", "aria-label": "Editable lyric, word and cue timing", children: [
    /* @__PURE__ */ d.jsxs("header", { children: [
      /* @__PURE__ */ d.jsx("strong", { children: "Lyric timing audition & correction" }),
      /* @__PURE__ */ d.jsx("span", { children: m ? `${m.lines.length} lines · ${m.words.length} words · ${m.cues.length} cues · ${h ? "unsaved" : "saved/seeded"}` : "Awaiting master" }),
      /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => I((x) => !x), children: L ? "Hide timing editor" : "Show timing editor" })
    ] }),
    L && m && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsx("p", { children: "All words are visible in the audition lane by default. Switch to the selected line for a less crowded editing view. Line, word and cue edits are kept in a separate source-bound document. Cue names must follow the established [SECTION: VERSE 1] / [DROP: CHORUS 1] convention." }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-timing-fields", children: [
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Timing clock ",
          /* @__PURE__ */ d.jsxs("select", { "aria-label": "Timing clock", value: m.clock_mode, onChange: (x) => Na(x.target.value), children: [
            /* @__PURE__ */ d.jsx("option", { value: "fixed", children: "Fixed BPM + Beat 1 offset" }),
            /* @__PURE__ */ d.jsx("option", { value: "variable", disabled: !te, children: "Corrected variable BPM beat map" })
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
              onChange: (x) => $l("bpm", Number(x.target.value))
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
              max: X,
              step: ".001",
              value: m.fixed_clock.first_beat_frame / ft,
              onChange: (x) => $l("first_beat_frame", Wa(x.target.value, ft))
            }
          )
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          /* @__PURE__ */ d.jsx("input", { type: "checkbox", checked: Z, onChange: (x) => ot(x.target.checked) }),
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
              value: Math.round(Pt * 1e3),
              onChange: (x) => it(Math.max(0, Math.min(1, Number(x.target.value) / 1e3)))
            }
          )
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          /* @__PURE__ */ d.jsx("input", { type: "checkbox", checked: st, onChange: (x) => mt(x.target.checked) }),
          "Beat grid overlay"
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Word lane ",
          /* @__PURE__ */ d.jsxs("select", { "aria-label": "Word lane scope", value: dt, onChange: (x) => V(x.target.value), children: [
            /* @__PURE__ */ d.jsx("option", { value: "all", children: "All words" }),
            /* @__PURE__ */ d.jsx("option", { value: "selected", children: "Selected line only" })
          ] })
        ] })
      ] }),
      se.length > 0 && /* @__PURE__ */ d.jsxs("details", { className: "stemlab-timing-diagnostics", open: !0, children: [
        /* @__PURE__ */ d.jsxs("summary", { children: [
          se.length,
          " unusually short word transition",
          se.length === 1 ? "" : "s",
          " to audition"
        ] }),
        /* @__PURE__ */ d.jsx("p", { children: "Orange is below five 16th-beat ticks; red is below three. These are review flags, not automatic timing changes." }),
        /* @__PURE__ */ d.jsx("ul", { children: se.map((x) => /* @__PURE__ */ d.jsxs("li", { children: [
          /* @__PURE__ */ d.jsxs("button", { type: "button", onClick: () => {
            Nt({ kind: "word", id: x.toId }), V("selected");
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
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-timing-actions", children: [
        /* @__PURE__ */ d.jsx("button", { type: "button", "aria-expanded": Ut, onClick: () => Mt((x) => !x), children: Ut ? "Close lyric audition" : "Open lyric audition" }),
        /* @__PURE__ */ d.jsx("span", { children: "The audition follows this timeline's existing master player and playhead." })
      ] }),
      Ut && /* @__PURE__ */ d.jsxs("section", { className: "stemlab-lyric-audition", "aria-label": "Timeline-synchronised lyric audition", children: [
        g.cover_art_url ? /* @__PURE__ */ d.jsx("img", { src: g.cover_art_url, alt: `${g.title || "Song"} cover artwork` }) : /* @__PURE__ */ d.jsx("div", { className: "stemlab-lyric-audition-placeholder", role: "img", "aria-label": "Cover artwork unavailable", children: "Cover artwork unavailable" }),
        /* @__PURE__ */ d.jsx("div", { className: "stemlab-lyric-audition-shade" }),
        /* @__PURE__ */ d.jsxs("div", { className: "stemlab-lyric-audition-copy", children: [
          /* @__PURE__ */ d.jsx("strong", { children: g.title || "Lyric timing audition" }),
          bl.length ? bl.map((x) => /* @__PURE__ */ d.jsx("p", { children: an.get(x.id).map((W) => /* @__PURE__ */ d.jsxs("span", { className: W.start_frame / ft <= bt && W.end_frame / ft > bt ? "current" : "", children: [
            W.word,
            " "
          ] }, W.id)) }, x.id)) : /* @__PURE__ */ d.jsx("p", { children: /* @__PURE__ */ d.jsx("span", { className: "empty", children: "Instrumental / lyric gap" }) }),
          /* @__PURE__ */ d.jsxs("small", { children: [
            bt.toFixed(3),
            "s · shared timeline playback"
          ] })
        ] })
      ] }),
      cl && !te && /* @__PURE__ */ d.jsx("p", { role: "alert", children: "Variable BPM is selected but its source-bound beat map is unavailable; no silent fixed-BPM downgrade." }),
      cl && r?.dirty && /* @__PURE__ */ d.jsx("p", { role: "alert", children: "Save the beat-map corrections before saving/exporting lyric and cue timing changes." }),
      cl && te && m.beat_revision !== Bt && /* @__PURE__ */ d.jsxs("p", { role: "alert", children: [
        "The saved beat-map revision has changed. Review its timing, then explicitly rebind these lyrics and cues to that revision. ",
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: r.dirty, onClick: () => jt((x) => ({ ...x, beat_revision: Bt, review_status: "draft" })), children: "Rebind to reviewed beat-map revision" })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-timing-fields", children: [
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Selected line ",
          /* @__PURE__ */ d.jsxs("select", { "aria-label": "Selected lyric line", value: lt?.id || "", onChange: (x) => Nt({ kind: "line", id: x.target.value }), children: [
            /* @__PURE__ */ d.jsx("option", { value: "", children: "Choose line" }),
            m.lines.map((x) => /* @__PURE__ */ d.jsx("option", { value: x.id, children: x.text.slice(0, 75) }, x.id))
          ] })
        ] }),
        Yt && yt !== "cue" && /* @__PURE__ */ d.jsxs("label", { children: [
          yt === "line" ? "Line text" : "Word text",
          /* @__PURE__ */ d.jsx(
            "input",
            {
              "aria-label": "Selected text",
              value: yt === "line" ? Yt.text : Yt.word,
              onChange: (x) => Rl(yt, Yt.id, x.target.value)
            }
          )
        ] }),
        Yt && yt === "cue" && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
          /* @__PURE__ */ d.jsxs("label", { children: [
            "Cue type ",
            /* @__PURE__ */ d.jsx("select", { value: Yt.type, onChange: (x) => xa(Yt.id, x.target.value, Yt.section), children: po.map((x) => /* @__PURE__ */ d.jsx("option", { value: x, children: x }, x)) })
          ] }),
          /* @__PURE__ */ d.jsxs("label", { children: [
            "Standard section ",
            /* @__PURE__ */ d.jsx(
              "select",
              {
                value: $u.find((x) => Yt.section === x || Yt.section.startsWith(x + " ")) || "INTRO",
                onChange: (x) => xa(Yt.id, Yt.type, x.target.value),
                children: $u.map((x) => /* @__PURE__ */ d.jsx("option", { value: x, children: x }, x))
              }
            )
          ] }),
          /* @__PURE__ */ d.jsxs("label", { children: [
            "Section number / suffix ",
            /* @__PURE__ */ d.jsxs(
              "select",
              {
                "aria-label": "Cue section suffix",
                value: Yt.section.match(/ (\d+|A|B|FINAL)$/)?.[1] || "",
                onChange: (x) => {
                  const W = $u.find((Rt) => Yt.section === Rt || Yt.section.startsWith(Rt + " ")) || "INTRO";
                  xa(Yt.id, Yt.type, W + (x.target.value ? " " + x.target.value : ""));
                },
                children: [
                  /* @__PURE__ */ d.jsx("option", { value: "", children: "None" }),
                  Array.from({ length: 64 }, (x, W) => String(W + 1)).concat(["A", "B", "FINAL"]).map((x) => /* @__PURE__ */ d.jsx("option", { value: x, children: x }, x))
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-timing-fields", children: [
        /* @__PURE__ */ d.jsxs("label", { children: [
          "New line text ",
          /* @__PURE__ */ d.jsx("input", { value: $, placeholder: "Lyrics line", onChange: (x) => nt(x.target.value) })
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => jl("line"), children: "Add line at playhead" }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "New word ",
          /* @__PURE__ */ d.jsx("input", { value: At, placeholder: "Single word", onChange: (x) => Ft(x.target.value) })
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: !lt, onClick: () => jl("word"), children: "Add word inside selected line" })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-timing-fields", children: [
        /* @__PURE__ */ d.jsxs("label", { children: [
          "New cue type ",
          /* @__PURE__ */ d.jsx("select", { value: Zt, onChange: (x) => p(x.target.value), children: po.map((x) => /* @__PURE__ */ d.jsx("option", { children: x }, x)) })
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Section ",
          /* @__PURE__ */ d.jsx("select", { value: H, onChange: (x) => tt(x.target.value), children: $u.map((x) => /* @__PURE__ */ d.jsx("option", { children: x }, x)) })
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => jl("cue"), children: "Add cue at playhead" }),
        /* @__PURE__ */ d.jsxs("button", { type: "button", disabled: !Yt, onClick: () => jt((x) => gb(x, yt, K.id)), children: [
          "Delete selected ",
          yt
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          /* @__PURE__ */ d.jsx("input", { type: "checkbox", checked: m.review_status === "artist_confirmed", onChange: (x) => jt((W) => ({ ...W, review_status: x.target.checked ? "artist_confirmed" : "draft" })) }),
          "Artist-reviewed timing"
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "stemlab-timing-actions", children: [
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: B || !h, onClick: ln, children: "Save source-frame corrections" }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Export format ",
          /* @__PURE__ */ d.jsxs("select", { value: gt, onChange: (x) => Et(x.target.value), children: [
            /* @__PURE__ */ d.jsx("option", { value: "bundle", children: "Complete JSON bundle" }),
            /* @__PURE__ */ d.jsx("option", { value: "lines", children: "Line LRC" }),
            /* @__PURE__ */ d.jsx("option", { value: "words", children: "Word TSV" }),
            /* @__PURE__ */ d.jsx("option", { value: "wordjson", children: "Word JSON" }),
            /* @__PURE__ */ d.jsx("option", { value: "cues", children: "Named cue LRC" })
          ] })
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: B, onClick: R, children: "Download selection" }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          "Import track ",
          /* @__PURE__ */ d.jsxs("select", { value: P, onChange: (x) => _t(x.target.value), children: [
            /* @__PURE__ */ d.jsx("option", { value: "lines", children: "Per-line LRC" }),
            /* @__PURE__ */ d.jsx("option", { value: "words", children: "Per-word LRC/TSV/JSON" }),
            /* @__PURE__ */ d.jsx("option", { value: "cues", children: "Section-cue LRC" })
          ] })
        ] }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: B, onClick: () => ut.current?.click(), children: "Choose timing file" }),
        /* @__PURE__ */ d.jsx("input", { ref: ut, type: "file", hidden: !0, accept: P === "words" ? ".lrc,.tsv,.json" : ".lrc", onChange: rt }),
        /* @__PURE__ */ d.jsx("button", { type: "button", disabled: B, onClick: () => le(), children: "Reload saved" })
      ] }),
      /* @__PURE__ */ d.jsx("small", { children: "Word positions must stay inside their lyric line. An off-grid word/cue is preserved until you explicitly drag or enable nearby-beat snapping. Pips=64/beat, DanceMoves ticks=16/beat. LRC/TSV exports round timestamps; the JSON retains native frames." })
    ] }),
    L && !m && /* @__PURE__ */ d.jsx("p", { children: "Waiting for decoded source audio; no lyric or cue times are invented." }),
    Tt && /* @__PURE__ */ d.jsx("output", { role: "status", className: "stemlab-timing-status", children: Tt })
  ] });
  return { clock: yl, lanes: Iu, panel: jc, gridVisible: st, onWindowChange: Y, onTimeChange: (x) => {
    k.current = x, q(x);
  } };
}
function pb(c, f) {
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
      audioSrc: `/api/${f}/loops/${encodeURIComponent(s.id)}/audio?v=${g}`,
      downloadUrl: s.file && /^audio\/[a-zA-Z0-9._-]+\.wav$/.test(s.file) ? `/${f}/deep/loops/${s.file.split("/").map(encodeURIComponent).join("/")}` : void 0
    }];
  });
}
function Sb(c) {
  const [f, r] = w.useState({ report: null, error: "" });
  w.useEffect(() => {
    let g = !0, m, y = "";
    const S = new AbortController();
    r({ report: null, error: "" });
    const C = async () => {
      try {
        const A = await fetch(`/${c}/deep/loops/loops.json`, {
          cache: "no-store",
          signal: S.signal
        });
        if (!g) return;
        if (A.status === 404)
          y = "", r({ report: null, error: "" });
        else {
          if (!A.ok) throw new Error(`Loop report: HTTP ${A.status}`);
          const E = await A.json();
          if (E.schema === "stemlab.loop-availability.v1" && E.status === "not-analysed") {
            r({ report: null, error: "", note: E.reason });
            return;
          }
          if (E.schema !== "stemlab.loops.v1") throw new Error("Unsupported loop report schema");
          const h = JSON.stringify(E);
          g && h !== y && (r({ report: E, error: "" }), y = h);
        }
      } catch (A) {
        g && A.name !== "AbortError" && (y = "", r({ report: null, error: A.message }));
      } finally {
        g && (m = window.setTimeout(C, 2500));
      }
    };
    return C(), () => {
      g = !1, S.abort(), window.clearTimeout(m);
    };
  }, [c]);
  const s = w.useMemo(() => pb(f.report, c), [f.report, c]);
  return { ...f, loops: s };
}
function _b({ state: c, hash: f }) {
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
const je = (c) => document.querySelector(c), Tb = je("#uploadView"), xo = je("#timelineView"), Pa = je("#dropZone"), Wu = je("#fileInput"), E0 = je("#chooseButton"), N0 = je("#uploadProgressWrap"), Oc = je("#uploadProgress"), zc = je("#uploadLabel"), _a = je("#connectionBadge"), x0 = je("#canonicalBpm"), M0 = je("#canonicalLyrics"), O0 = je("#canonicalTiming"), So = je("#knownInfoStatus"), Eb = je("#loadArcadiansReference"), Nb = je("#loadArcadiansHero"), xb = Array.from(xo.children), Mo = document.createElement("div");
Mo.id = "timelineRoot";
xo.replaceChildren(Mo);
for (const c of xb) c.remove();
const Mb = zy.createRoot(Mo), Ob = /* @__PURE__ */ new Set(["wav", "flac", "mp3", "ogg", "opus", "m4a", "aif", "aiff"]);
let _o = {};
function zb(c) {
  const f = String(c).split("/").pop() || "", r = f.lastIndexOf(".");
  return r >= 0 ? f.slice(r + 1).toLowerCase() : "";
}
function hl(c) {
  return String(c).replace(/^stems\//, "").replace(/^spectrograms\//, "").replace(/^vamp\/data\//, "Vamp · ").replace(/^beats\//, "Beats · ").replace(/^speech\//, "Speech · ").replace(/^deep\//, "Deep · ").replace(/[_-]+/g, " ");
}
function Oo(c, f) {
  return `/${c}/${f.split("/").map(encodeURIComponent).join("/")}`;
}
function Cc(c, f, r = "Generated analysis artifact") {
  return { type: "artifact", note: r, href: f === "__source__" ? `/api/${c}/source` : Oo(c, f) };
}
async function We(c, f) {
  const r = await fetch(Oo(c, f), { cache: "no-store" });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}
function vl(c, f = 2, r = "") {
  const s = Number(c);
  return Number.isFinite(s) ? `${s.toFixed(f)}${r}` : "—";
}
function Fa(c, f, r, s, g = "feature") {
  const m = s.filter(([, y]) => y != null && y !== "");
  return {
    id: c,
    title: f,
    meta: r,
    kind: g,
    content: {
      type: "summary",
      items: (m.length ? m : [["status", "analysis available"]]).map(([y, S]) => ({ label: y, value: S }))
    }
  };
}
function Ac(c) {
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
function Cb(c) {
  const f = Array.isArray(c.events) ? c.events : [];
  switch (String(c.kind || "")) {
    case "curve":
      return { type: "curve", points: f.flatMap((r) => {
        const s = Number(r.start), g = Number(r.values?.[0]);
        return Number.isFinite(s) && Number.isFinite(g) && g > 0 ? [{ time: s, value: g }] : [];
      }) };
    case "matrix":
      return { type: "matrix", rows: f.map((r) => r.values || []).filter((r) => r.length) };
    case "notes":
      return { type: "notes", items: f.flatMap((r) => {
        const s = Number(r.values?.[0]), g = Number(r.start);
        if (!Number.isFinite(s) || s <= 0 || !Number.isFinite(g)) return [];
        const m = Number(r.end);
        return [{ start: g, end: Number.isFinite(m) && m > g ? m : g + 0.12, value: s, label: r.label }];
      }) };
    case "segments":
      return { type: "blocks", items: Ac(f) };
    case "events":
      return { type: "markers", items: f.flatMap((r) => Number.isFinite(Number(r.start)) ? [{ time: Number(r.start) }] : []) };
    default:
      return { type: "artifact", note: f[0]?.label || f[0]?.values?.join(", ") || c.title || "analysis" };
  }
}
async function z0(c, f, r, s, g) {
  const m = new URLSearchParams({ path: g, points: "12000" }), y = await fetch(`/api/${c}/waveform?${m}`);
  if (!y.ok) return { id: f, title: r, meta: s, kind: "artifact", content: Cc(c, g, `waveform unavailable (${y.status})`) };
  const S = await y.json();
  return { id: f, title: r, meta: s, kind: "waveform", content: { type: "waveform", min: S.min || [], max: S.max || [] }, duration: Number(S.duration_seconds) || 0 };
}
async function Ab(c, f) {
  const r = f.path, s = `file:${r}`, g = zb(r);
  if (r === "canonical.json" || r.startsWith("deep/loops/")) return null;
  if (Ob.has(g)) return z0(c, s, hl(r), "audio waveform", r);
  if (r.startsWith("spectrograms/") && g === "npz") {
    const m = new URLSearchParams({ path: r, max_width: "8192", max_height: "768" });
    return { id: s, title: hl(r), meta: "spectrogram data · exact song timeline", kind: "spectrogram", content: { type: "image", src: `/api/${c}/spectrogram?${m}`, alt: `${hl(r)} spectrogram` } };
  }
  if (r.startsWith("spectrograms/") && g === "png")
    return { id: s, title: hl(r), meta: "rendered spectrogram PNG", kind: "image", content: { type: "image", src: Oo(c, r), alt: `${hl(r)} rendered spectrogram` } };
  try {
    if (r === "analysis.json") {
      const m = await We(c, r);
      return {
        id: s,
        title: hl(r),
        meta: "analysis provenance",
        kind: "artifact",
        sourceMap: m.spectrograms || [],
        content: Cc(c, r)
      };
    }
    if (r.startsWith("deep/midi/") && r.endsWith("/notes.json")) {
      const m = await We(c, r);
      return {
        id: s,
        title: `MIDI · ${m.source_stem || hl(r)}`,
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
    if (r.startsWith("beats/") && g === "json") {
      const m = await We(c, r), y = new Set((m.downbeats || []).map((S) => Number(S).toFixed(3)));
      return { id: s, title: hl(r), meta: "beat / downbeat events", kind: "events", content: { type: "markers", items: (m.beats || []).flatMap((S) => {
        const C = Number(S);
        return Number.isFinite(C) ? [{ time: C, emphasis: y.has(C.toFixed(3)), label: y.has(C.toFixed(3)) ? "Downbeat" : "Beat" }] : [];
      }) } };
    }
    if (r.startsWith("vamp/data/") && g === "json") {
      const m = await We(c, r);
      return { id: s, title: hl(r), meta: "Vamp feature analysis", kind: "feature", content: Cb(m) };
    }
    if (r === "speech/whisper.json") {
      const m = await We(c, r);
      return { id: s, title: "Speech · Whisper words", meta: "word-aligned transcript", kind: "words", content: { type: "blocks", items: (m.words || []).flatMap((y) => {
        const S = Number(y.start), C = Number(y.end);
        return Number.isFinite(S) ? [{ start: S, end: Number.isFinite(C) ? Math.max(S + 0.03, C) : S + 0.03, label: String(y.word || "").trim() }] : [];
      }) } };
    }
    if (r === "deep/structure/structure.json" || r === "deep/song_map/song_map.json") {
      const m = await We(c, r), y = r.includes("song_map");
      return { id: s, title: y ? "Deep · song map" : "Deep · functional structure", meta: y ? "section-level sonic / rhythm / harmony / lyric fusion" : "All-In-One · functional song sections", kind: "deep-structure", content: { type: "blocks", items: Ac(y ? m.sections : m.segments) } };
    }
    if (r === "deep/harmony/harmony.json") {
      const m = await We(c, r), y = m.chords?.collapsed_progression || [];
      return y.length ? { id: s, title: "Deep · harmony", meta: "collapsed chord progression + key evidence", kind: "deep-harmony", content: { type: "blocks", items: Ac(y) } } : Fa(s, "Deep · harmony", "collapsed chord progression + key evidence", [["key", m.vamp_key || m.independent_key_candidates_from_nnls_chroma?.[0]?.key || "—"], ["tuning", m.tuning_hz ? `${Number(m.tuning_hz).toFixed(1)} Hz` : "—"]], "deep-harmony");
    }
    if (r === "deep/lyrics/lyrics.json") {
      const m = await We(c, r), y = (m.lines || []).filter((S) => Number.isFinite(Number(S.start)) && Number.isFinite(Number(S.end)));
      return y.length ? { id: s, title: "Deep · rhyme & prosody", meta: "phonetic rhyme, repetition and delivery", kind: "deep-lyrics", content: { type: "blocks", items: Ac(y) } } : Fa(s, "Deep · rhyme & prosody", "phonetic rhyme, repetition and delivery", [["rhyme scheme", m.rhyme?.scheme || "—"], ["lines", m.line_count ?? "—"], ["words", m.word_count ?? "—"]], "deep-lyrics");
    }
    if (r === "deep/sonic/sonic.json") {
      const m = await We(c, r);
      return Fa(s, "Deep · sonic profile", "loudness · dynamics · timbre · stereo", [["LUFS", vl(m.loudness?.integrated_lufs_bs1770, 1)], ["crest", vl(m.loudness?.crest_factor_db, 1, " dB")], ["RMS range", vl(m.loudness?.short_term_rms_range_db_p95_p10, 1, " dB")], ["centroid", vl(m.timbre?.spectral_centroid_hz_mean, 0, " Hz")], ["stereo corr", vl(m.stereo?.left_right_correlation, 2)]]);
    }
    if (r === "deep/rhythm/rhythm.json") {
      const m = await We(c, r);
      return Fa(s, "Deep · groove", "meter · stability · swing · syncopation evidence", [["tempo", vl(m.tempo?.median_bpm, 2, " BPM")], ["meter", m.meter?.estimated_beats_per_bar ? `${m.meter.estimated_beats_per_bar}/4-ish` : "—"], ["swing", vl(m.groove?.swing_ratio_long_to_short, 2, ":1")], ["offbeat energy", vl(m.groove?.offbeat_onset_energy_ratio, 3)], ["onsets/s", vl(m.groove?.onset_density_per_second, 2)]]);
    }
    if (r === "deep/semantic_text/semantic_text.json") {
      const m = await We(c, r);
      return Fa(s, "Deep · lyric semantics", "sentence embedding theme similarities · not probabilities", (m.theme_similarity || []).slice(0, 7).map((y) => [y.theme, vl(y.similarity, 3)]));
    }
    if (r === "deep/semantic_audio/semantic_audio.json") {
      const m = await We(c, r), y = Object.entries(m.prompt_sets || {}).flatMap(([S, C]) => (C || []).slice(0, 2).map((A) => [`${S}: ${A.prompt}`, vl(A.similarity, 3)]));
      return Fa(s, "Deep · audio semantics", "MuQ-MuLan zero-shot similarities · CC-BY-NC weights", y);
    }
    if (r === "deep/summary.json") {
      const m = await We(c, r), y = Object.entries(m.analyses || {}).map(([S, C]) => [S, C.available ? "ready" : "unavailable"]);
      return (m.errors || []).length && y.push(["errors", m.errors.length]), Fa(s, "Deep · analysis summary", "cross-domain action inventory", y);
    }
  } catch (m) {
    return { id: s, title: hl(r), meta: "analysis artifact", kind: "artifact", content: Cc(c, r, m.message) };
  }
  return { id: s, title: hl(r), meta: `${g || "file"} · ${Number(f.bytes || 0).toLocaleString()} bytes`, kind: "artifact", content: Cc(c, r) };
}
function jb(c) {
  const f = [];
  c?.lyrics && f.push({ id: "canonical:lyrics", title: "Canonical lyrics", meta: "known reference text", kind: "canonical-lyrics", height: 104, content: { type: "text", text: c.lyrics } });
  const r = Array.isArray(c?.lyric_timing) ? c.lyric_timing : [];
  return r.length && f.push({ id: "canonical:timing", title: "Canonical lyric timing", meta: `${r.length} timed lyric event${r.length === 1 ? "" : "s"}`, kind: "canonical-timing", height: 104, content: { type: "blocks", items: r.flatMap((s) => {
    const g = Number(s.start), m = Number(s.end);
    return Number.isFinite(g) && g >= 0 ? [{ start: g, end: Number.isFinite(m) && m > g ? m : g + 0.75, label: String(s.text || ""), className: "stemlab-canonical-lyric" }] : [];
  }) } }), { lanes: f };
}
function Rb({ lines: c }) {
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
function wb({ hash: c, filename: f }) {
  const r = Sb(c), [s, g] = w.useState([]), [m, y] = w.useState(0), S = !window.__stemlabStatic, C = fb(c, m, S), [A, E] = w.useState({ bpm: null, lyrics: null, lyric_timing: [] }), h = bb(c, m, C, S, A), [j, B] = w.useState({ state: "submitted" }), [J, L] = w.useState(null), [I, dt] = w.useState("canonical"), [V, K] = w.useState("consensus"), [Nt, Tt] = w.useState([]), vt = w.useRef(/* @__PURE__ */ new Set()), Z = w.useCallback((G, Y) => {
    Y && Tt(($) => [...$.slice(-799), { stream: G === "stderr" ? "stderr" : "stdout", text: Y }]);
  }, []), ot = w.useCallback(async (G) => {
    if (!G?.path || vt.current.has(G.path)) return;
    vt.current.add(G.path);
    const Y = await Ab(c, G);
    Y && (Y.duration && y(($) => $ || Y.duration), g(($) => $.some((nt) => nt.id === Y.id) ? $ : [...$, Y]));
  }, [c]), Pt = w.useCallback(async () => {
    const G = await fetch(`/api/${c}/timeline`, { cache: "no-store" });
    if (!G.ok) return;
    const Y = await G.json();
    B(Y.status || { state: "submitted" }), Y.duration_seconds && y(Number(Y.duration_seconds)), Y.canonical && E(Y.canonical), L(Y.beat_offsets || null);
    for (const $ of Y.files || []) ot($);
  }, [ot, c]);
  w.useEffect(() => {
    vt.current = /* @__PURE__ */ new Set(), g([]), L(null), dt("canonical"), K("consensus"), z0(c, "__source__", "MASTER · uploaded source", f, "__source__").then(($) => {
      $.duration && y($.duration), g((nt) => [$, ...nt.filter((At) => At.id !== $.id)]);
    }).catch(($) => Z("stderr", $.message)), Pt();
    const G = window.setInterval(() => {
      Pt();
    }, 2500);
    let Y = null;
    return typeof window.io == "function" ? (Y = window.io({ path: "/socket.io" }), Y.on("connect", () => {
      _a.textContent = "live", _a.classList.remove("muted"), Y.emit("subscribe", { hash: c });
    }), Y.on("disconnect", () => {
      _a.textContent = "reconnecting", _a.classList.add("muted");
    }), Y.on("process_output", ($) => Z($.stream || "stdout", $.line || "")), Y.on("process_history", ($) => {
      for (const nt of $.stdout || []) Z("stdout", nt);
      for (const nt of $.stderr || []) Z("stderr", nt);
    }), Y.on("new_file", ($) => {
      ot($);
    }), Y.on("job_status", ($) => {
      B($.status || {}), Pt();
    }), Y.on("canonical_metadata", ($) => {
      $?.canonical && E($.canonical);
    }), Y.on("job_timeout", ($) => Z("stderr", `Job timeout: ${$.message || "analysis exceeded timeout"}`))) : window.__stemlabStatic ? (_a.textContent = "static", _a.classList.add("muted")) : (_a.textContent = "polling", _a.classList.add("muted"), Z("stderr", "Socket.IO browser client unavailable; timeline inventory polling remains active.")), () => {
      window.clearInterval(G), Y?.disconnect();
    };
  }, [ot, Z, f, c, Pt]);
  const it = w.useMemo(() => jb(A), [A]), st = w.useMemo(() => Wy(J, A.bpm, m, I, V), [J, A.bpm, m, I, V]), mt = (G) => G.id === "__source__" ? 0 : G.kind === "deep-structure" ? 10 : G.kind === "events" ? 20 : G.kind === "audio" ? 1 : G.kind === "spectrogram" ? 30 : G.kind === "waveform" ? 40 : 90, Ut = w.useMemo(() => ky(s), [s]), bt = [...st.basis ? [
    { id: "canonical:bpm", title: "BPM grid · original", meta: `${st.basis.bpm.toFixed(4)} BPM · source time 0`, kind: "canonical-bpm", height: 74, content: { type: "markers", items: st.original } },
    { id: "bpm:aligned", title: "BPM grid · offset", meta: st.row ? `${st.row.offset_pips.toFixed(6)} pips · ${st.analysis.analysis_id}` : "Waiting for detected first beat", kind: "canonical-bpm", height: 74, content: { type: "markers", items: st.aligned } }
  ] : [], ...C.lanes, ...h.lanes, ...it.lanes, ...[...Ut].sort((G, Y) => mt(G) - mt(Y) || G.id.localeCompare(Y.id))], q = j.state || "submitted";
  return /* @__PURE__ */ d.jsx(
    $y,
    {
      className: "stemlab-timeline",
      laneControls: !0,
      wheelNavigation: !0,
      audioSrc: `/api/${c}/source`,
      duration: m,
      title: A.title || f,
      subtitle: c,
      loops: r.loops,
      lanes: bt,
      grid: [...st.grid, ...C.grid],
      beatClock: h.clock,
      showBeatGrid: h.gridVisible,
      onDurationChange: y,
      onWindowChange: (G) => {
        C.onWindowChange(G), h.onWindowChange(G);
      },
      onTimeChange: (G) => {
        C.onTimeChange(G), h.onTimeChange(G);
      },
      onPlaybackError: (G) => Z("stderr", G instanceof Error ? G.message : String(G)),
      headerEnd: /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
        /* @__PURE__ */ d.jsx("span", { className: `badge ${q}`, children: q }),
        /* @__PURE__ */ d.jsxs("span", { className: "small", children: [
          bt.length,
          " lane",
          bt.length === 1 ? "" : "s"
        ] })
      ] }),
      footer: /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
        /* @__PURE__ */ d.jsx(Iy, { comparison: st, onBasis: dt, onAnalysis: K }),
        S && C.panel,
        S && h.panel,
        /* @__PURE__ */ d.jsx(_b, { state: r, hash: c }),
        /* @__PURE__ */ d.jsx(Rb, { lines: Nt }),
        /* @__PURE__ */ d.jsx("span", { className: "dock-links", children: /* @__PURE__ */ d.jsx("a", { href: "https://kieransimkin.co.uk/my-songs/", target: "_blank", rel: "noopener", children: "Kieran Simkin · My Songs ↗" }) })
      ] })
    }
  );
}
function Db() {
  const c = x0?.value?.trim() || "", f = M0?.value || "", r = O0?.value || "";
  return { ..._o, bpm: c ? Number(c) : null, lyrics: f.trim() || null, lyric_timing: r.trim() || [] };
}
function Ub(c) {
  return Number.isFinite(Number(c.bpm)) || !!c.lyrics || !!(typeof c.lyric_timing == "string" && c.lyric_timing.trim()) || !!(Array.isArray(c.lyric_timing) && c.lyric_timing.length);
}
async function Bb(c) {
  const f = Db();
  if (!Ub(f)) return;
  const r = await fetch(`/api/${c}/canonical`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) }), s = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(s.detail || `Could not save canonical metadata (${r.status})`);
  So.textContent = "Known information saved with this song hash.";
}
function Hb(c) {
  return new Promise((f, r) => {
    const s = new XMLHttpRequest();
    s.open("PUT", `/upload/${encodeURIComponent(c.name)}`), s.setRequestHeader("Content-Type", c.type || "application/octet-stream"), s.upload.onprogress = (g) => {
      N0.classList.remove("hidden");
      const m = g.lengthComputable ? g.loaded / g.total : 0;
      Oc.style.width = `${Math.round(m * 100)}%`, zc.textContent = g.lengthComputable ? `${Math.round(m * 100)}% · ${(g.loaded / 1048576).toFixed(1)} / ${(g.total / 1048576).toFixed(1)} MiB` : `${(g.loaded / 1048576).toFixed(1)} MiB uploaded`;
    }, s.onerror = () => r(new Error("Upload failed")), s.onload = () => {
      let g = {};
      try {
        g = JSON.parse(s.responseText);
      } catch {
      }
      s.status < 200 || s.status >= 300 ? r(new Error(g.detail || `Upload failed (${s.status})`)) : f(g);
    }, s.send(c);
  });
}
async function C0(c, f) {
  Tb.classList.add("hidden"), xo.classList.remove("hidden"), Mb.render(/* @__PURE__ */ d.jsx(wb, { hash: c, filename: f || "uploaded audio" }, c));
}
async function A0(c) {
  if (c) {
    Oc.style.width = "0%", zc.textContent = `Uploading ${c.name}`, N0.classList.remove("hidden");
    try {
      const f = await Hb(c);
      Oc.style.width = "100%", zc.textContent = "Upload complete · attaching to analysis", await Bb(f.hash), await C0(f.hash, f.filename || c.name);
    } catch (f) {
      zc.textContent = f.message, Oc.style.width = "0%";
    }
  }
}
async function j0(c) {
  c?.preventDefault(), c?.stopPropagation();
  try {
    const f = await fetch("/assets/arcadians-reference.json", { cache: "no-store" });
    if (!f.ok) throw new Error(`Could not load Arcadians reference (${f.status})`);
    const r = await f.json();
    _o = {};
    for (const s of ["title", "artist", "release_date", "isrc", "upc", "website", "my_songs_url", "epk_url", "cover_art_url", "source_url", "sections"])
      r[s] !== void 0 && r[s] !== null && (_o[s] = r[s]);
    x0.value = r.bpm ?? "", M0.value = r.lyrics ?? "", O0.value = Array.isArray(r.lyric_timing) && r.lyric_timing.length ? JSON.stringify(r.lyric_timing, null, 2) : "", je(".known-info").open = !0, So.textContent = r.lyric_timing?.length ? `Loaded ${r.title || "Arcadians"}: canonical release metadata, sections, ${r.bpm} BPM, lyrics and timing.` : `Loaded ${r.title || "Arcadians"} canonical reference metadata.`;
  } catch (f) {
    So.textContent = f.message;
  }
}
E0.addEventListener("click", (c) => {
  c.stopPropagation(), Wu.click();
});
Wu.addEventListener("change", () => {
  A0(Wu.files?.[0]);
});
Pa.addEventListener("click", (c) => {
  c.target !== E0 && !c.target.closest(".known-info") && Wu.click();
});
Pa.addEventListener("keydown", (c) => {
  (c.key === "Enter" || c.key === " ") && Wu.click();
});
for (const c of ["dragenter", "dragover"]) Pa.addEventListener(c, (f) => {
  f.preventDefault(), Pa.classList.add("dragging");
});
for (const c of ["dragleave", "drop"]) Pa.addEventListener(c, (f) => {
  f.preventDefault(), Pa.classList.remove("dragging");
});
Pa.addEventListener("drop", (c) => {
  A0(c.dataTransfer?.files?.[0]);
});
Eb?.addEventListener("click", j0);
Nb?.addEventListener("click", j0);
const ho = new URLSearchParams(location.search).get("hash");
ho && /^[0-9a-f]{64}$/i.test(ho) && C0(ho.toLowerCase(), "Existing analysis");
export {
  Ea as formatTimelineTime
};
