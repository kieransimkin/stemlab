var Us = { exports: {} }, dn = {};
var gd;
function Hh() {
  if (gd) return dn;
  gd = 1;
  var r = /* @__PURE__ */ Symbol.for("react.transitional.element"), E = /* @__PURE__ */ Symbol.for("react.fragment");
  function d(s, M, _) {
    var D = null;
    if (_ !== void 0 && (D = "" + _), M.key !== void 0 && (D = "" + M.key), "key" in M) {
      _ = {};
      for (var x in M)
        x !== "key" && (_[x] = M[x]);
    } else _ = M;
    return M = _.ref, {
      $$typeof: r,
      type: s,
      key: D,
      ref: M !== void 0 ? M : null,
      props: _
    };
  }
  return dn.Fragment = E, dn.jsx = d, dn.jsxs = d, dn;
}
var Sd;
function xh() {
  return Sd || (Sd = 1, Us.exports = Hh()), Us.exports;
}
var C = xh(), Rs = { exports: {} }, F = {};
var bd;
function jh() {
  if (bd) return F;
  bd = 1;
  var r = /* @__PURE__ */ Symbol.for("react.transitional.element"), E = /* @__PURE__ */ Symbol.for("react.portal"), d = /* @__PURE__ */ Symbol.for("react.fragment"), s = /* @__PURE__ */ Symbol.for("react.strict_mode"), M = /* @__PURE__ */ Symbol.for("react.profiler"), _ = /* @__PURE__ */ Symbol.for("react.consumer"), D = /* @__PURE__ */ Symbol.for("react.context"), x = /* @__PURE__ */ Symbol.for("react.forward_ref"), Q = /* @__PURE__ */ Symbol.for("react.suspense"), L = /* @__PURE__ */ Symbol.for("react.memo"), j = /* @__PURE__ */ Symbol.for("react.lazy"), T = /* @__PURE__ */ Symbol.for("react.activity"), Z = /* @__PURE__ */ Symbol.for("react.view_transition"), Et = Symbol.iterator;
  function Dt(m) {
    return m === null || typeof m != "object" ? null : (m = Et && m[Et] || m["@@iterator"], typeof m == "function" ? m : null);
  }
  var Xt = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, ft = Object.assign, Mt = {};
  function bt(m, A, Y) {
    this.props = m, this.context = A, this.refs = Mt, this.updater = Y || Xt;
  }
  bt.prototype.isReactComponent = {}, bt.prototype.setState = function(m, A) {
    if (typeof m != "object" && typeof m != "function" && m != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, m, A, "setState");
  }, bt.prototype.forceUpdate = function(m) {
    this.updater.enqueueForceUpdate(this, m, "forceUpdate");
  };
  function xt() {
  }
  xt.prototype = bt.prototype;
  function Qt(m, A, Y) {
    this.props = m, this.context = A, this.refs = Mt, this.updater = Y || Xt;
  }
  var vt = Qt.prototype = new xt();
  vt.constructor = Qt, ft(vt, bt.prototype), vt.isPureReactComponent = !0;
  var Lt = Array.isArray;
  function V() {
  }
  var B = { H: null, A: null, T: null, S: null }, $ = Object.prototype.hasOwnProperty;
  function _t(m, A, Y) {
    var G = Y.ref;
    return {
      $$typeof: r,
      type: m,
      key: A,
      ref: G !== void 0 ? G : null,
      props: Y
    };
  }
  function Vt(m, A) {
    return _t(m.type, A, m.props);
  }
  function nl(m) {
    return typeof m == "object" && m !== null && m.$$typeof === r;
  }
  function Ql(m) {
    var A = { "=": "=0", ":": "=2" };
    return "$" + m.replace(/[=:]/g, function(Y) {
      return A[Y];
    });
  }
  var sa = /\/+/g;
  function Rt(m, A) {
    return typeof m == "object" && m !== null && m.key != null ? Ql("" + m.key) : A.toString(36);
  }
  function R(m) {
    switch (m.status) {
      case "fulfilled":
        return m.value;
      case "rejected":
        throw m.reason;
      default:
        switch (typeof m.status == "string" ? m.then(V, V) : (m.status = "pending", m.then(
          function(A) {
            m.status === "pending" && (m.status = "fulfilled", m.value = A);
          },
          function(A) {
            m.status === "pending" && (m.status = "rejected", m.reason = A);
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
  function K(m, A, Y, G, nt) {
    var it = typeof m;
    (it === "undefined" || it === "boolean") && (m = null);
    var st = !1;
    if (m === null) st = !0;
    else
      switch (it) {
        case "bigint":
        case "string":
        case "number":
          st = !0;
          break;
        case "object":
          switch (m.$$typeof) {
            case r:
            case E:
              st = !0;
              break;
            case j:
              return st = m._init, K(
                st(m._payload),
                A,
                Y,
                G,
                nt
              );
          }
      }
    if (st)
      return nt = nt(m), st = G === "" ? "." + Rt(m, 0) : G, Lt(nt) ? (Y = "", st != null && (Y = st.replace(sa, "$&/") + "/"), K(nt, A, Y, "", function(jt) {
        return jt;
      })) : nt != null && (nl(nt) && (nt = Vt(
        nt,
        Y + (nt.key == null || m && m.key === nt.key ? "" : ("" + nt.key).replace(
          sa,
          "$&/"
        ) + "/") + st
      )), A.push(nt)), 1;
    st = 0;
    var O = G === "" ? "." : G + ":";
    if (Lt(m))
      for (var U = 0; U < m.length; U++)
        G = m[U], it = O + Rt(G, U), st += K(
          G,
          A,
          Y,
          it,
          nt
        );
    else if (U = Dt(m), typeof U == "function")
      for (m = U.call(m), U = 0; !(G = m.next()).done; )
        G = G.value, it = O + Rt(G, U++), st += K(
          G,
          A,
          Y,
          it,
          nt
        );
    else if (it === "object") {
      if (typeof m.then == "function")
        return K(
          R(m),
          A,
          Y,
          G,
          nt
        );
      throw A = String(m), Error(
        "Objects are not valid as a React child (found: " + (A === "[object Object]" ? "object with keys {" + Object.keys(m).join(", ") + "}" : A) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return st;
  }
  function J(m, A, Y) {
    if (m == null) return m;
    var G = [], nt = 0;
    return K(m, G, "", "", function(it) {
      return A.call(Y, it, nt++);
    }), G;
  }
  function mt(m) {
    if (m._status === -1) {
      var A = m._result, Y = A();
      Y.then(
        function(G) {
          (m._status === 0 || m._status === -1) && (m._status = 1, m._result = G, Y.status === void 0 && (Y.status = "fulfilled", Y.value = G));
        },
        function(G) {
          (m._status === 0 || m._status === -1) && (m._status = 2, m._result = G, Y.status === void 0 && (Y.status = "rejected", Y.reason = G));
        }
      ), m._status === -1 && (m._status = 0, m._result = Y);
    }
    if (m._status === 1) return m._result.default;
    throw m._result;
  }
  var W = typeof reportError == "function" ? reportError : function(m) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var A = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof m == "object" && m !== null && typeof m.message == "string" ? String(m.message) : String(m),
        error: m
      });
      if (!window.dispatchEvent(A)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", m);
      return;
    }
    console.error(m);
  };
  function Sl(m) {
    var A = B.T, Y = {};
    Y.types = A !== null ? A.types : null, B.T = Y;
    try {
      var G = m(), nt = B.S;
      nt !== null && nt(Y, G), typeof G == "object" && G !== null && typeof G.then == "function" && G.then(V, W);
    } catch (it) {
      W(it);
    } finally {
      A !== null && Y.types !== null && (A.types = Y.types), B.T = A;
    }
  }
  function Ll(m) {
    var A = B.T;
    if (A !== null) {
      var Y = A.types;
      Y === null ? A.types = [m] : Y.indexOf(m) === -1 && Y.push(m);
    } else Sl(Ll.bind(null, m));
  }
  var Cl = {
    map: J,
    forEach: function(m, A, Y) {
      J(
        m,
        function() {
          A.apply(this, arguments);
        },
        Y
      );
    },
    count: function(m) {
      var A = 0;
      return J(m, function() {
        A++;
      }), A;
    },
    toArray: function(m) {
      return J(m, function(A) {
        return A;
      }) || [];
    },
    only: function(m) {
      if (!nl(m))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return m;
    }
  };
  return F.Activity = T, F.Children = Cl, F.Component = bt, F.Fragment = d, F.Profiler = M, F.PureComponent = Qt, F.StrictMode = s, F.Suspense = Q, F.ViewTransition = Z, F.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = B, F.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(m) {
      return B.H.useMemoCache(m);
    }
  }, F.addTransitionType = Ll, F.cache = function(m) {
    return function() {
      return m.apply(null, arguments);
    };
  }, F.cacheSignal = function() {
    return null;
  }, F.cloneElement = function(m, A, Y) {
    if (m == null)
      throw Error(
        "The argument must be a React element, but you passed " + m + "."
      );
    var G = ft({}, m.props), nt = m.key;
    if (A != null)
      for (it in A.key !== void 0 && (nt = "" + A.key), A)
        !$.call(A, it) || it === "key" || it === "__self" || it === "__source" || it === "ref" && A.ref === void 0 || (G[it] = A[it]);
    var it = arguments.length - 2;
    if (it === 1) G.children = Y;
    else if (1 < it) {
      for (var st = Array(it), O = 0; O < it; O++)
        st[O] = arguments[O + 2];
      G.children = st;
    }
    return _t(m.type, nt, G);
  }, F.createContext = function(m) {
    return m = {
      $$typeof: D,
      _currentValue: m,
      _currentValue2: m,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, m.Provider = m, m.Consumer = {
      $$typeof: _,
      _context: m
    }, m;
  }, F.createElement = function(m, A, Y) {
    var G, nt = {}, it = null;
    if (A != null)
      for (G in A.key !== void 0 && (it = "" + A.key), A)
        $.call(A, G) && G !== "key" && G !== "__self" && G !== "__source" && (nt[G] = A[G]);
    var st = arguments.length - 2;
    if (st === 1) nt.children = Y;
    else if (1 < st) {
      for (var O = Array(st), U = 0; U < st; U++)
        O[U] = arguments[U + 2];
      nt.children = O;
    }
    if (m && m.defaultProps)
      for (G in st = m.defaultProps, st)
        nt[G] === void 0 && (nt[G] = st[G]);
    return _t(m, it, nt);
  }, F.createRef = function() {
    return { current: null };
  }, F.forwardRef = function(m) {
    return { $$typeof: x, render: m };
  }, F.isValidElement = nl, F.lazy = function(m) {
    return {
      $$typeof: j,
      _payload: { _status: -1, _result: m },
      _init: mt
    };
  }, F.memo = function(m, A) {
    return {
      $$typeof: L,
      type: m,
      compare: A === void 0 ? null : A
    };
  }, F.startTransition = Sl, F.unstable_useCacheRefresh = function() {
    return B.H.useCacheRefresh();
  }, F.use = function(m) {
    return B.H.use(m);
  }, F.useActionState = function(m, A, Y) {
    return B.H.useActionState(m, A, Y);
  }, F.useCallback = function(m, A) {
    return B.H.useCallback(m, A);
  }, F.useContext = function(m) {
    return B.H.useContext(m);
  }, F.useDebugValue = function() {
  }, F.useDeferredValue = function(m, A) {
    return B.H.useDeferredValue(m, A);
  }, F.useEffect = function(m, A) {
    return B.H.useEffect(m, A);
  }, F.useEffectEvent = function(m) {
    return B.H.useEffectEvent(m);
  }, F.useId = function() {
    return B.H.useId();
  }, F.useImperativeHandle = function(m, A, Y) {
    return B.H.useImperativeHandle(m, A, Y);
  }, F.useInsertionEffect = function(m, A) {
    return B.H.useInsertionEffect(m, A);
  }, F.useLayoutEffect = function(m, A) {
    return B.H.useLayoutEffect(m, A);
  }, F.useMemo = function(m, A) {
    return B.H.useMemo(m, A);
  }, F.useOptimistic = function(m, A) {
    return B.H.useOptimistic(m, A);
  }, F.useReducer = function(m, A, Y) {
    return B.H.useReducer(m, A, Y);
  }, F.useRef = function(m) {
    return B.H.useRef(m);
  }, F.useState = function(m) {
    return B.H.useState(m);
  }, F.useSyncExternalStore = function(m, A, Y) {
    return B.H.useSyncExternalStore(
      m,
      A,
      Y
    );
  }, F.useTransition = function() {
    return B.H.useTransition();
  }, F.version = "19.3.0", F;
}
var Td;
function Ls() {
  return Td || (Td = 1, Rs.exports = jh()), Rs.exports;
}
var ut = Ls(), Hs = { exports: {} }, vn = {}, xs = { exports: {} }, js = {};
var Ed;
function Bh() {
  return Ed || (Ed = 1, (function(r) {
    function E(R, K) {
      var J = R.length;
      R.push(K);
      t: for (; 0 < J; ) {
        var mt = J - 1 >>> 1, W = R[mt];
        if (0 < M(W, K))
          R[mt] = K, R[J] = W, J = mt;
        else break t;
      }
    }
    function d(R) {
      return R.length === 0 ? null : R[0];
    }
    function s(R) {
      if (R.length === 0) return null;
      var K = R[0], J = R.pop();
      if (J !== K) {
        R[0] = J;
        t: for (var mt = 0, W = R.length, Sl = W >>> 1; mt < Sl; ) {
          var Ll = 2 * (mt + 1) - 1, Cl = R[Ll], m = Ll + 1, A = R[m];
          if (0 > M(Cl, J))
            m < W && 0 > M(A, Cl) ? (R[mt] = A, R[m] = J, mt = m) : (R[mt] = Cl, R[Ll] = J, mt = Ll);
          else if (m < W && 0 > M(A, J))
            R[mt] = A, R[m] = J, mt = m;
          else break t;
        }
      }
      return K;
    }
    function M(R, K) {
      var J = R.sortIndex - K.sortIndex;
      return J !== 0 ? J : R.id - K.id;
    }
    if (r.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var _ = performance;
      r.unstable_now = function() {
        return _.now();
      };
    } else {
      var D = Date, x = D.now();
      r.unstable_now = function() {
        return D.now() - x;
      };
    }
    var Q = [], L = [], j = 1, T = null, Z = 3, Et = !1, Dt = !1, Xt = !1, ft = !1, Mt = typeof setTimeout == "function" ? setTimeout : null, bt = typeof clearTimeout == "function" ? clearTimeout : null, xt = typeof setImmediate < "u" ? setImmediate : null;
    function Qt(R) {
      for (var K = d(L); K !== null; ) {
        if (K.callback === null) s(L);
        else if (K.startTime <= R)
          s(L), K.sortIndex = K.expirationTime, E(Q, K);
        else break;
        K = d(L);
      }
    }
    function vt(R) {
      if (Xt = !1, Qt(R), !Dt)
        if (d(Q) !== null)
          Dt = !0, Lt || (Lt = !0, nl());
        else {
          var K = d(L);
          K !== null && Rt(vt, K.startTime - R);
        }
    }
    var Lt = !1, V = -1, B = 5, $ = -1;
    function _t() {
      return ft ? !0 : !(r.unstable_now() - $ < B);
    }
    function Vt() {
      if (ft = !1, Lt) {
        var R = r.unstable_now();
        $ = R;
        var K = !0;
        try {
          t: {
            Dt = !1, Xt && (Xt = !1, bt(V), V = -1), Et = !0;
            var J = Z;
            try {
              l: {
                for (Qt(R), T = d(Q); T !== null && !(T.expirationTime > R && _t()); ) {
                  var mt = T.callback;
                  if (typeof mt == "function") {
                    T.callback = null, Z = T.priorityLevel;
                    var W = mt(
                      T.expirationTime <= R
                    );
                    if (R = r.unstable_now(), typeof W == "function") {
                      T.callback = W, Qt(R), K = !0;
                      break l;
                    }
                    T === d(Q) && s(Q), Qt(R);
                  } else s(Q);
                  T = d(Q);
                }
                if (T !== null) K = !0;
                else {
                  var Sl = d(L);
                  Sl !== null && Rt(
                    vt,
                    Sl.startTime - R
                  ), K = !1;
                }
              }
              break t;
            } finally {
              T = null, Z = J, Et = !1;
            }
            K = void 0;
          }
        } finally {
          K ? nl() : Lt = !1;
        }
      }
    }
    var nl;
    if (typeof xt == "function")
      nl = function() {
        xt(Vt);
      };
    else if (typeof MessageChannel < "u") {
      var Ql = new MessageChannel(), sa = Ql.port2;
      Ql.port1.onmessage = Vt, nl = function() {
        sa.postMessage(null);
      };
    } else
      nl = function() {
        Mt(Vt, 0);
      };
    function Rt(R, K) {
      V = Mt(function() {
        R(r.unstable_now());
      }, K);
    }
    r.unstable_IdlePriority = 5, r.unstable_ImmediatePriority = 1, r.unstable_LowPriority = 4, r.unstable_NormalPriority = 3, r.unstable_Profiling = null, r.unstable_UserBlockingPriority = 2, r.unstable_cancelCallback = function(R) {
      R.callback = null;
    }, r.unstable_forceFrameRate = function(R) {
      0 > R || 125 < R ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : B = 0 < R ? Math.floor(1e3 / R) : 5;
    }, r.unstable_getCurrentPriorityLevel = function() {
      return Z;
    }, r.unstable_next = function(R) {
      switch (Z) {
        case 1:
        case 2:
        case 3:
          var K = 3;
          break;
        default:
          K = Z;
      }
      var J = Z;
      Z = K;
      try {
        return R();
      } finally {
        Z = J;
      }
    }, r.unstable_requestPaint = function() {
      ft = !0;
    }, r.unstable_runWithPriority = function(R, K) {
      switch (R) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          R = 3;
      }
      var J = Z;
      Z = R;
      try {
        return K();
      } finally {
        Z = J;
      }
    }, r.unstable_scheduleCallback = function(R, K, J) {
      var mt = r.unstable_now();
      switch (typeof J == "object" && J !== null ? (J = J.delay, J = typeof J == "number" && 0 < J ? mt + J : mt) : J = mt, R) {
        case 1:
          var W = -1;
          break;
        case 2:
          W = 250;
          break;
        case 5:
          W = 1073741823;
          break;
        case 4:
          W = 1e4;
          break;
        default:
          W = 5e3;
      }
      return W = J + W, R = {
        id: j++,
        callback: K,
        priorityLevel: R,
        startTime: J,
        expirationTime: W,
        sortIndex: -1
      }, J > mt ? (R.sortIndex = J, E(L, R), d(Q) === null && R === d(L) && (Xt ? (bt(V), V = -1) : Xt = !0, Rt(vt, J - mt))) : (R.sortIndex = W, E(Q, R), Dt || Et || (Dt = !0, Lt || (Lt = !0, nl()))), R;
    }, r.unstable_shouldYield = _t, r.unstable_wrapCallback = function(R) {
      var K = Z;
      return function() {
        var J = Z;
        Z = K;
        try {
          return R.apply(this, arguments);
        } finally {
          Z = J;
        }
      };
    };
  })(js)), js;
}
var _d;
function qh() {
  return _d || (_d = 1, xs.exports = Bh()), xs.exports;
}
var Bs = { exports: {} }, al = {};
var zd;
function Yh() {
  if (zd) return al;
  zd = 1;
  var r = Ls();
  function E(j) {
    var T = "https://react.dev/errors/" + j;
    if (1 < arguments.length) {
      T += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var Z = 2; Z < arguments.length; Z++)
        T += "&args[]=" + encodeURIComponent(arguments[Z]);
    }
    return "Minified React error #" + j + "; visit " + T + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function d() {
  }
  var s = {
    d: {
      f: d,
      r: function() {
        throw Error(E(522));
      },
      D: d,
      C: d,
      L: d,
      m: d,
      X: d,
      S: d,
      M: d
    },
    p: 0,
    findDOMNode: null
  }, M = /* @__PURE__ */ Symbol.for("react.portal"), _ = /* @__PURE__ */ Symbol.for("react.recoverable"), D = /* @__PURE__ */ Symbol.for("react.optimistic_key");
  function x(j, T, Z) {
    var Et = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: M,
      key: Et == null ? null : Et === D ? D : "" + Et,
      children: j,
      containerInfo: T,
      implementation: Z
    };
  }
  var Q = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function L(j, T) {
    if (j === "font") return "";
    if (typeof T == "string")
      return T === "use-credentials" ? T : "";
  }
  return al.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, al.browser = function(j) {
    return { $$typeof: _, _reason: j };
  }, al.createPortal = function(j, T) {
    var Z = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!T || T.nodeType !== 1 && T.nodeType !== 9 && T.nodeType !== 11)
      throw Error(E(299));
    return x(j, T, null, Z);
  }, al.flushSync = function(j) {
    var T = Q.T, Z = s.p;
    try {
      if (Q.T = null, s.p = 2, j) return j();
    } finally {
      Q.T = T, s.p = Z, s.d.f();
    }
  }, al.preconnect = function(j, T) {
    typeof j == "string" && (T ? (T = T.crossOrigin, T = typeof T == "string" ? T === "use-credentials" ? T : "" : void 0) : T = null, s.d.C(j, T));
  }, al.prefetchDNS = function(j) {
    typeof j == "string" && s.d.D(j);
  }, al.preinit = function(j, T) {
    if (typeof j == "string" && T && typeof T.as == "string") {
      var Z = T.as, Et = L(Z, T.crossOrigin), Dt = typeof T.integrity == "string" ? T.integrity : void 0, Xt = typeof T.fetchPriority == "string" ? T.fetchPriority : void 0;
      Z === "style" ? s.d.S(
        j,
        typeof T.precedence == "string" ? T.precedence : void 0,
        {
          crossOrigin: Et,
          integrity: Dt,
          fetchPriority: Xt
        }
      ) : Z === "script" && s.d.X(j, {
        crossOrigin: Et,
        integrity: Dt,
        fetchPriority: Xt,
        nonce: typeof T.nonce == "string" ? T.nonce : void 0
      });
    }
  }, al.preinitModule = function(j, T) {
    if (typeof j == "string")
      if (typeof T == "object" && T !== null) {
        if (T.as == null || T.as === "script") {
          var Z = L(
            T.as,
            T.crossOrigin
          );
          s.d.M(j, {
            crossOrigin: Z,
            integrity: typeof T.integrity == "string" ? T.integrity : void 0,
            nonce: typeof T.nonce == "string" ? T.nonce : void 0,
            fetchPriority: typeof T.fetchPriority == "string" ? T.fetchPriority : void 0
          });
        }
      } else T == null && s.d.M(j);
  }, al.preload = function(j, T) {
    if (typeof j == "string" && typeof T == "object" && T !== null && typeof T.as == "string") {
      var Z = T.as, Et = L(Z, T.crossOrigin);
      s.d.L(j, Z, {
        crossOrigin: Et,
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
  }, al.preloadModule = function(j, T) {
    if (typeof j == "string")
      if (T) {
        var Z = L(T.as, T.crossOrigin);
        s.d.m(j, {
          as: typeof T.as == "string" && T.as !== "script" ? T.as : void 0,
          crossOrigin: Z,
          integrity: typeof T.integrity == "string" ? T.integrity : void 0,
          nonce: typeof T.nonce == "string" ? T.nonce : void 0,
          fetchPriority: typeof T.fetchPriority == "string" ? T.fetchPriority : void 0
        });
      } else s.d.m(j);
  }, al.requestFormReset = function(j) {
    s.d.r(j);
  }, al.unstable_batchedUpdates = function(j, T) {
    return j(T);
  }, al.useFormState = function(j, T, Z) {
    return Q.H.useFormState(j, T, Z);
  }, al.useFormStatus = function() {
    return Q.H.useHostTransitionStatus();
  }, al.version = "19.3.0", al;
}
var Nd;
function Gh() {
  if (Nd) return Bs.exports;
  Nd = 1;
  function r() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r);
      } catch (E) {
        console.error(E);
      }
  }
  return r(), Bs.exports = Yh(), Bs.exports;
}
var Od;
function Xh() {
  if (Od) return vn;
  Od = 1;
  var r = qh(), E = Ls(), d = Gh();
  function s(t) {
    var l = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      l += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var a = 2; a < arguments.length; a++)
        l += "&args[]=" + encodeURIComponent(arguments[a]);
    }
    return "Minified React error #" + t + "; visit " + l + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function M(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function _(t) {
    for (var l = t, a = l; a && !a.alternate; )
      l = a, (l.flags & 4098) !== 0 && (t = l.return), a = l.return;
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
  function x(t) {
    if (t.tag === 31) {
      var l = t.memoizedState;
      if (l === null && (t = t.alternate, t !== null && (l = t.memoizedState)), l !== null) return l.dehydrated;
    }
    return null;
  }
  function Q(t) {
    if (_(t) !== t)
      throw Error(s(188));
  }
  function L(t) {
    var l = t.alternate;
    if (!l) {
      if (l = _(t), l === null) throw Error(s(188));
      return l !== t ? null : t;
    }
    for (var a = t, e = l; ; ) {
      var u = a.return;
      if (u === null) break;
      var n = u.alternate;
      if (n === null) {
        if (e = u.return, e !== null) {
          a = e;
          continue;
        }
        break;
      }
      if (u.child === n.child) {
        for (n = u.child; n; ) {
          if (n === a) return Q(u), t;
          if (n === e) return Q(u), l;
          n = n.sibling;
        }
        throw Error(s(188));
      }
      if (a.return !== e.return) a = u, e = n;
      else {
        for (var i = !1, c = u.child; c; ) {
          if (c === a) {
            i = !0, a = u, e = n;
            break;
          }
          if (c === e) {
            i = !0, e = u, a = n;
            break;
          }
          c = c.sibling;
        }
        if (!i) {
          for (c = n.child; c; ) {
            if (c === a) {
              i = !0, a = n, e = u;
              break;
            }
            if (c === e) {
              i = !0, e = n, a = u;
              break;
            }
            c = c.sibling;
          }
          if (!i) throw Error(s(189));
        }
      }
      if (a.alternate !== e) throw Error(s(190));
    }
    if (a.tag !== 3) throw Error(s(188));
    return a.stateNode.current === a ? t : l;
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
  function T(t, l, a, e, u, n) {
    for (; t !== null; ) {
      if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && a(t, e, u, n) || (t.tag !== 22 || t.memoizedState === null) && (l || t.tag !== 5 && t.tag !== 27) && T(
        t.child,
        l,
        a,
        e,
        u,
        n
      ))
        return !0;
      t = t.sibling;
    }
    return !1;
  }
  function Z(t) {
    for (t = t.return; t !== null; ) {
      if (t.tag === 3 || t.tag === 5 || t.tag === 27) return t;
      t = t.return;
    }
    return null;
  }
  function Et(t) {
    var l = !1;
    for (t = t.return; t !== null && (t.tag === 4 && (l = !0), !(t.tag === 3 || t.tag === 5 || t.tag === 27)); )
      t = t.return;
    return l;
  }
  function Dt(t) {
    var l = [null, null], a = Z(t);
    return a === null || Xt(
      l,
      t,
      a.child,
      { foundSelf: !1 }
    ), l;
  }
  function Xt(t, l, a, e) {
    for (; a !== null; ) {
      if (a === l) e.foundSelf = !0;
      else if (a.tag === 5 || a.tag === 27 || a.tag === 6) {
        if (e.foundSelf) return t[1] = a, !0;
        t[0] = a;
      } else if ((a.tag !== 22 || a.memoizedState === null) && Xt(
        t,
        l,
        a.child,
        e
      ))
        return !0;
      a = a.sibling;
    }
    return !1;
  }
  function ft(t) {
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
  var Mt = null, bt = null;
  function xt(t, l, a) {
    return t === a ? !0 : t === l ? (Mt = t, !0) : !1;
  }
  function Qt(t, l, a) {
    return t === a ? (bt = t, !1) : t === l ? (bt !== null && (Mt = t), !0) : !1;
  }
  function vt(t) {
    if (t === null) return null;
    do
      t = t === null ? null : t.return;
    while (t && t.tag !== 5 && t.tag !== 27 && t.tag !== 3);
    return t || null;
  }
  function Lt(t, l, a) {
    for (var e = 0, u = t; u; u = a(u)) e++;
    u = 0;
    for (var n = l; n; n = a(n)) u++;
    for (; 0 < e - u; ) t = a(t), e--;
    for (; 0 < u - e; ) l = a(l), u--;
    for (; e--; ) {
      if (t === l || l !== null && t === l.alternate)
        return t;
      t = a(t), l = a(l);
    }
    return null;
  }
  var V = Object.assign, B = /* @__PURE__ */ Symbol.for("react.element"), $ = /* @__PURE__ */ Symbol.for("react.transitional.element"), _t = /* @__PURE__ */ Symbol.for("react.portal"), Vt = /* @__PURE__ */ Symbol.for("react.fragment"), nl = /* @__PURE__ */ Symbol.for("react.strict_mode"), Ql = /* @__PURE__ */ Symbol.for("react.profiler"), sa = /* @__PURE__ */ Symbol.for("react.consumer"), Rt = /* @__PURE__ */ Symbol.for("react.context"), R = /* @__PURE__ */ Symbol.for("react.forward_ref"), K = /* @__PURE__ */ Symbol.for("react.suspense"), J = /* @__PURE__ */ Symbol.for("react.suspense_list"), mt = /* @__PURE__ */ Symbol.for("react.memo"), W = /* @__PURE__ */ Symbol.for("react.lazy"), Sl = /* @__PURE__ */ Symbol.for("react.activity"), Ll = /* @__PURE__ */ Symbol.for("react.legacy_hidden"), Cl = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), m = /* @__PURE__ */ Symbol.for("react.view_transition"), A = /* @__PURE__ */ Symbol.for("react.recoverable"), Y = Symbol.iterator;
  function G(t) {
    return t === null || typeof t != "object" ? null : (t = Y && t[Y] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var nt = /* @__PURE__ */ Symbol.for("react.client.reference");
  function it(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === nt ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case Vt:
        return "Fragment";
      case Ql:
        return "Profiler";
      case nl:
        return "StrictMode";
      case K:
        return "Suspense";
      case J:
        return "SuspenseList";
      case Sl:
        return "Activity";
      case m:
        return "ViewTransition";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case _t:
          return "Portal";
        case Rt:
          return t.displayName || "Context";
        case sa:
          return (t._context.displayName || "Context") + ".Consumer";
        case R:
          var l = t.render;
          return t = t.displayName, t || (t = l.displayName || l.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case mt:
          return l = t.displayName || null, l !== null ? l : it(t.type) || "Memo";
        case W:
          l = t._payload, t = t._init;
          try {
            return it(t(l));
          } catch {
          }
      }
    return null;
  }
  var st = Array.isArray, O = E.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, U = d.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, jt = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, Ul = [], il = -1;
  function cl(t) {
    return { current: t };
  }
  function Ft(t) {
    0 > il || (t.current = Ul[il], Ul[il] = null, il--);
  }
  function zt(t, l) {
    il++, Ul[il] = t.current, t.current = l;
  }
  var kl = cl(null), Su = cl(null), Aa = cl(null), gn = cl(null);
  function Sn(t, l) {
    switch (zt(Aa, l), zt(Su, t), zt(kl, null), l.nodeType) {
      case 9:
      case 11:
        t = (t = l.documentElement) && (t = t.namespaceURI) ? A0(t) : 0;
        break;
      default:
        if (t = l.tagName, l = l.namespaceURI)
          l = A0(l), t = M0(l, t);
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
    Ft(kl), zt(kl, t);
  }
  function Me() {
    Ft(kl), Ft(Su), Ft(Aa);
  }
  function Wi(t) {
    var l = t.memoizedState;
    l !== null && (vu._currentValue = l.memoizedState, zt(gn, t)), l = kl.current;
    var a = M0(l, t.type);
    l !== a && (zt(Su, t), zt(kl, a));
  }
  function bn(t) {
    Su.current === t && (Ft(kl), Ft(Su)), gn.current === t && (Ft(gn), vu._currentValue = jt);
  }
  var ki, ws;
  function Ma(t) {
    if (ki === void 0)
      try {
        throw Error();
      } catch (a) {
        var l = a.stack.trim().match(/\n( *(at )?)/);
        ki = l && l[1] || "", ws = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + ki + t + ws;
  }
  var Ii = !1;
  function Pi(t, l) {
    if (!t || Ii) return "";
    Ii = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var e = {
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
                } catch (p) {
                  var v = p;
                }
                Reflect.construct(t, [], N);
              } else {
                try {
                  N.call();
                } catch (p) {
                  v = p;
                }
                N = !1;
                try {
                  var S = Object.getOwnPropertyDescriptor(
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
                  N && (S !== void 0 ? Object.defineProperty(t.prototype, "props", S) : delete t.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (p) {
                v = p;
              }
              (N = t()) && typeof N.catch == "function" && N.catch(function() {
              });
            }
          } catch (p) {
            if (p && v && typeof p.stack == "string")
              return [p.stack, v.stack];
          }
          return [null, null];
        }
      };
      e.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        e.DetermineComponentFrameRoot,
        "name"
      );
      u && u.configurable && Object.defineProperty(
        e.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var n = e.DetermineComponentFrameRoot(), i = n[0], c = n[1];
      if (i && c) {
        var f = i.split(`
`), h = c.split(`
`);
        for (u = e = 0; e < f.length && !f[e].includes("DetermineComponentFrameRoot"); )
          e++;
        for (; u < h.length && !h[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (e === f.length || u === h.length)
          for (e = f.length - 1, u = h.length - 1; 1 <= e && 0 <= u && f[e] !== h[u]; )
            u--;
        for (; 1 <= e && 0 <= u; e--, u--)
          if (f[e] !== h[u]) {
            if (e !== 1 || u !== 1)
              do
                if (e--, u--, 0 > u || f[e] !== h[u]) {
                  var b = `
` + f[e].replace(" at new ", " at ");
                  return t.displayName && b.includes("<anonymous>") && (b = b.replace("<anonymous>", t.displayName)), b;
                }
              while (1 <= e && 0 <= u);
            break;
          }
      }
    } finally {
      Ii = !1, Error.prepareStackTrace = a;
    }
    return (a = t ? t.displayName || t.name : "") ? Ma(a) : "";
  }
  function qd(t, l) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Ma(t.type);
      case 16:
        return Ma("Lazy");
      case 13:
        return t.child !== l && l !== null ? Ma("Suspense Fallback") : Ma("Suspense");
      case 19:
        return Ma("SuspenseList");
      case 0:
      case 15:
        return Pi(t.type, !1);
      case 11:
        return Pi(t.type.render, !1);
      case 1:
        return Pi(t.type, !0);
      case 31:
        return Ma("Activity");
      case 30:
        return Ma("ViewTransition");
      default:
        return "";
    }
  }
  function Js(t) {
    try {
      var l = "", a = null;
      do
        l += qd(t, a), a = t, t = t.return;
      while (t);
      return l;
    } catch (e) {
      return `
Error generating stack: ` + e.message + `
` + e.stack;
    }
  }
  var tc = Object.prototype.hasOwnProperty, lc = r.unstable_scheduleCallback, ac = r.unstable_cancelCallback, Yd = r.unstable_shouldYield, Gd = r.unstable_requestPaint, bl = r.unstable_now, Xd = r.unstable_getCurrentPriorityLevel, $s = r.unstable_ImmediatePriority, Fs = r.unstable_UserBlockingPriority, Tn = r.unstable_NormalPriority, Qd = r.unstable_LowPriority, Ws = r.unstable_IdlePriority, Ld = r.log, Zd = r.unstable_setDisableYieldValue, bu = null, Tl = null;
  function pa(t) {
    if (typeof Ld == "function" && Zd(t), Tl && typeof Tl.setStrictMode == "function")
      try {
        Tl.setStrictMode(bu, t);
      } catch {
      }
  }
  var El = Math.clz32 ? Math.clz32 : wd, Vd = Math.log, Kd = Math.LN2;
  function wd(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (Vd(t) / Kd | 0) | 0;
  }
  var En = 256, _n = 262144, zn = 4194304;
  function ae(t) {
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
  function Nn(t, l, a) {
    var e = t.pendingLanes;
    if (e === 0) return 0;
    var u = 0, n = t.suspendedLanes, i = t.pingedLanes;
    t = t.warmLanes;
    var c = e & 134217727;
    return c !== 0 ? (e = c & ~n, e !== 0 ? u = ae(e) : (i &= c, i !== 0 ? u = ae(i) : a || (a = c & ~t, a !== 0 && (u = ae(a))))) : (c = e & ~n, c !== 0 ? u = ae(c) : i !== 0 ? u = ae(i) : a || (a = e & ~t, a !== 0 && (u = ae(a)))), u === 0 ? 0 : l !== 0 && l !== u && (l & n) === 0 && (n = u & -u, a = l & -l, n >= a || n === 32 && (a & 4194048) !== 0) ? l : u;
  }
  function Tu(t, l) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & l) === 0;
  }
  function ks(t, l) {
    (l & 8) !== 0 && (l |= l & 32);
    var a = t.entangledLanes;
    if (a !== 0)
      for (t = t.entanglements, a &= l; 0 < a; ) {
        var e = 31 - El(a), u = 1 << e;
        l |= t[e], a &= ~u;
      }
    return l;
  }
  function Jd(t, l) {
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
  function Is() {
    var t = zn;
    return zn <<= 1, (zn & 62914560) === 0 && (zn = 4194304), t;
  }
  function ec(t) {
    for (var l = [], a = 0; 31 > a; a++) l.push(t);
    return l;
  }
  function Eu(t, l) {
    t.pendingLanes |= l, l !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function $d(t, l, a, e, u, n) {
    var i = t.pendingLanes;
    t.pendingLanes = a, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= a, t.entangledLanes &= a, t.errorRecoveryDisabledLanes &= a, t.shellSuspendCounter = 0;
    var c = t.entanglements, f = t.expirationTimes, h = t.hiddenUpdates;
    for (a = i & ~a; 0 < a; ) {
      var b = 31 - El(a), N = 1 << b;
      c[b] = 0, f[b] = -1;
      var v = h[b];
      if (v !== null)
        for (h[b] = null, b = 0; b < v.length; b++) {
          var S = v[b];
          S !== null && (S.lane &= -536870913);
        }
      a &= ~N;
    }
    e !== 0 && Ps(t, e, 0), n !== 0 && u === 0 && t.tag !== 0 && (t.suspendedLanes |= n & ~(i & ~l));
  }
  function Ps(t, l, a) {
    t.pendingLanes |= l, t.suspendedLanes &= ~l;
    var e = 31 - El(l);
    t.entangledLanes |= l, t.entanglements[e] = t.entanglements[e] | 1073741824 | a & 261930;
  }
  function to(t, l) {
    var a = t.entangledLanes |= l;
    for (t = t.entanglements; a; ) {
      var e = 31 - El(a), u = 1 << e;
      u & l | t[e] & l && (t[e] |= l), a &= ~u;
    }
  }
  function lo(t, l) {
    var a = l & -l;
    return a = (a & 42) !== 0 ? 1 : uc(a), (a & (t.suspendedLanes | l)) !== 0 ? 0 : a;
  }
  function uc(t) {
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
  function nc(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function ao() {
    var t = U.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : od(t.type));
  }
  function eo(t, l) {
    var a = U.p;
    try {
      return U.p = t, l();
    } finally {
      U.p = a;
    }
  }
  var oa = Math.random().toString(36).slice(2), Wt = "__reactFiber$" + oa, ml = "__reactProps$" + oa, pe = "__reactContainer$" + oa, uo = "__reactEvents$" + oa, Fd = "__reactListeners$" + oa, Wd = "__reactHandles$" + oa, no = "__reactResources$" + oa, _u = "__reactMarker$" + oa, On = "__reactLoad$" + oa;
  function An(t) {
    delete t[Wt], delete t[ml], delete t[Fd], delete t[Wd];
  }
  function ee(t) {
    var l;
    if (l = t[Wt]) return l;
    for (var a = t.parentNode; a; ) {
      if (l = a[pe] || a[Wt]) {
        if (a = l.alternate, l.child !== null || a !== null && a.child !== null)
          for (t = V0(t); t !== null; ) {
            if (a = t[Wt]) return a;
            t = V0(t);
          }
        return l;
      }
      t = a, a = t.parentNode;
    }
    return null;
  }
  function De(t) {
    if (t = t[Wt] || t[pe]) {
      var l = t.tag;
      if (l === 5 || l === 6 || l === 13 || l === 31 || l === 26 || l === 27 || l === 3)
        return t;
    }
    return null;
  }
  function zu(t) {
    var l = t.tag;
    if (l === 5 || l === 26 || l === 27 || l === 6) return t.stateNode;
    throw Error(s(33));
  }
  function Ce(t) {
    var l = t[no];
    return l || (l = t[no] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), l;
  }
  function Kt(t) {
    t[_u] = !0;
  }
  function io(t) {
    t[On] = void 0;
  }
  var co = /* @__PURE__ */ new Set(), fo = {};
  function ue(t, l) {
    Ue(t, l), Ue(t + "Capture", l);
  }
  function Ue(t, l) {
    for (fo[t] = l, t = 0; t < l.length; t++)
      co.add(l[t]);
  }
  var kd = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), so = {}, oo = {};
  function Id(t) {
    return tc.call(oo, t) ? !0 : tc.call(so, t) ? !1 : kd.test(t) ? oo[t] = !0 : (so[t] = !0, !1);
  }
  var ot = !1;
  function ro() {
    var t = ot;
    return ot = !1, t;
  }
  function Mn(t, l, a) {
    if (Id(l))
      if (a === null) t.removeAttribute(l);
      else {
        switch (typeof a) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(l);
            return;
          case "boolean":
            var e = l.toLowerCase().slice(0, 5);
            if (e !== "data-" && e !== "aria-") {
              t.removeAttribute(l);
              return;
            }
        }
        t.setAttribute(l, a);
      }
  }
  function pn(t, l, a) {
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
      t.setAttribute(l, a);
    }
  }
  function ra(t, l, a, e) {
    if (e === null) t.removeAttribute(a);
    else {
      switch (typeof e) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(a);
          return;
      }
      t.setAttributeNS(l, a, e);
    }
  }
  function _l(t) {
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
  function mo(t) {
    var l = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (l === "checkbox" || l === "radio");
  }
  function Pd(t, l, a) {
    var e = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      l
    );
    if (!t.hasOwnProperty(l) && typeof e < "u" && typeof e.get == "function" && typeof e.set == "function") {
      var u = e.get, n = e.set;
      return Object.defineProperty(t, l, {
        configurable: !0,
        get: function() {
          return u.call(this);
        },
        set: function(i) {
          a = "" + i, n.call(this, i);
        }
      }), Object.defineProperty(t, l, {
        enumerable: e.enumerable
      }), {
        getValue: function() {
          return a;
        },
        setValue: function(i) {
          a = "" + i;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[l];
        }
      };
    }
  }
  function ic(t) {
    if (!t._valueTracker) {
      var l = mo(t) ? "checked" : "value";
      t._valueTracker = Pd(
        t,
        l,
        "" + t[l]
      );
    }
  }
  function vo(t) {
    if (!t) return !1;
    var l = t._valueTracker;
    if (!l) return !0;
    var a = l.getValue(), e = "";
    return t && (e = mo(t) ? t.checked ? "true" : "false" : t.value), t = e, t !== a ? (l.setValue(t), !0) : !1;
  }
  var tv = /[\n"\\]/g;
  function Rl(t) {
    return t.replace(
      tv,
      function(l) {
        return "\\" + l.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function cc(t, l, a, e, u, n, i, c) {
    t.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? t.type = i : t.removeAttribute("type"), l != null ? i === "number" ? (l === 0 && t.value === "" || t.value != l) && (t.value = "" + _l(l)) : t.value !== "" + _l(l) && (t.value = "" + _l(l)) : i !== "submit" && i !== "reset" || t.removeAttribute("value"), l != null ? i === "number" && t.value == l ? fc(t, _l(t.value)) : fc(t, _l(l)) : a != null ? fc(t, _l(a)) : e != null && t.removeAttribute("value"), u == null && n != null && (t.defaultChecked = !!n), u != null && (t.checked = u && typeof u != "function" && typeof u != "symbol"), c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? t.name = "" + _l(c) : t.removeAttribute("name");
  }
  function yo(t, l, a, e, u, n, i, c) {
    if (n != null && typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" && (t.type = n), l != null || a != null) {
      if (!(n !== "submit" && n !== "reset" || l != null)) {
        ic(t);
        return;
      }
      a = a != null ? "" + _l(a) : "", l = l != null ? "" + _l(l) : a, c || l === t.value || (t.value = l), t.defaultValue = l;
    }
    e = e ?? u, e = typeof e != "function" && typeof e != "symbol" && !!e, t.checked = c ? t.checked : !!e, t.defaultChecked = !!e, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (t.name = i), ic(t);
  }
  function fc(t, l) {
    t.defaultValue !== "" + l && (t.defaultValue = "" + l);
  }
  function Re(t, l, a, e) {
    if (t = t.options, l) {
      l = {};
      for (var u = 0; u < a.length; u++)
        l["$" + a[u]] = !0;
      for (a = 0; a < t.length; a++)
        u = l.hasOwnProperty("$" + t[a].value), t[a].selected !== u && (t[a].selected = u), u && e && (t[a].defaultSelected = !0);
    } else {
      for (a = "" + _l(a), l = null, u = 0; u < t.length; u++) {
        if (t[u].value === a) {
          t[u].selected = !0, e && (t[u].defaultSelected = !0);
          return;
        }
        l !== null || t[u].disabled || (l = t[u]);
      }
      l !== null && (l.selected = !0);
    }
  }
  function ho(t, l, a) {
    if (l != null && (l = "" + _l(l), l !== t.value && (t.value = l), a == null)) {
      t.defaultValue !== l && (t.defaultValue = l);
      return;
    }
    t.defaultValue = a != null ? "" + _l(a) : "";
  }
  function go(t, l, a, e) {
    if (l == null) {
      if (e != null) {
        if (a != null) throw Error(s(92));
        if (st(e)) {
          if (1 < e.length) throw Error(s(93));
          e = e[0];
        }
        a = e;
      }
      a == null && (a = ""), l = a;
    }
    a = _l(l), t.defaultValue = a, e = t.textContent, e === a && e !== "" && e !== null && (t.value = e), ic(t);
  }
  function He(t, l) {
    if (l) {
      var a = t.firstChild;
      if (a && a === t.lastChild && a.nodeType === 3) {
        a.nodeValue = l;
        return;
      }
    }
    t.textContent = l;
  }
  var lv = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function So(t, l, a) {
    var e = l.indexOf("--") === 0;
    a == null || typeof a == "boolean" || a === "" ? e ? t.setProperty(l, "") : l === "float" ? t.cssFloat = "" : t[l] = "" : e ? t.setProperty(l, a) : typeof a != "number" || a === 0 || lv.has(l) ? l === "float" ? t.cssFloat = a : t[l] = ("" + a).trim() : t[l] = a + "px";
  }
  function bo(t, l, a) {
    if (l != null && typeof l != "object")
      throw Error(s(62));
    if (t = t.style, a != null) {
      for (var e in a)
        !a.hasOwnProperty(e) || l != null && l.hasOwnProperty(e) || (e.indexOf("--") === 0 ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "", ot = !0);
      for (var u in l)
        e = l[u], l.hasOwnProperty(u) && a[u] !== e && (So(t, u, e), ot = !0);
    } else
      for (var n in l)
        l.hasOwnProperty(n) && So(t, n, l[n]);
  }
  function sc(t) {
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
  var av = /* @__PURE__ */ new Map([
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
  ]), ev = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Dn(t) {
    return ev.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function Il() {
  }
  var oc = null;
  function rc(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var xe = null, je = null;
  function To(t) {
    var l = De(t);
    if (l && (t = l.stateNode)) {
      var a = t[ml] || null;
      t: switch (t = l.stateNode, l.type) {
        case "input":
          if (cc(
            t,
            a.value,
            a.defaultValue,
            a.defaultValue,
            a.checked,
            a.defaultChecked,
            a.type,
            a.name
          ), l = a.name, a.type === "radio" && l != null) {
            for (a = t; a.parentNode; ) a = a.parentNode;
            for (a = a.querySelectorAll(
              'input[name="' + Rl(
                "" + l
              ) + '"][type="radio"]'
            ), l = 0; l < a.length; l++) {
              var e = a[l];
              if (e !== t && e.form === t.form) {
                var u = e[ml] || null;
                if (!u) throw Error(s(90));
                cc(
                  e,
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
            for (l = 0; l < a.length; l++)
              e = a[l], e.form === t.form && vo(e);
          }
          break t;
        case "textarea":
          ho(t, a.value, a.defaultValue);
          break t;
        case "select":
          l = a.value, l != null && Re(t, !!a.multiple, l, !1);
      }
    }
  }
  var mc = !1;
  function Eo(t, l, a) {
    if (mc) return t(l, a);
    mc = !0;
    try {
      var e = t(l);
      return e;
    } finally {
      if (mc = !1, (xe !== null || je !== null) && (Di(), xe && (l = xe, t = je, je = xe = null, To(l), t)))
        for (l = 0; l < t.length; l++) To(t[l]);
    }
  }
  function Nu(t, l) {
    var a = t.stateNode;
    if (a === null) return null;
    var e = a[ml] || null;
    if (e === null) return null;
    a = e[l];
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
        (e = !e.disabled) || (t = t.type, e = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !e;
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (a && typeof a != "function")
      throw Error(
        s(231, l, typeof a)
      );
    return a;
  }
  var ma = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), dc = !1;
  if (ma)
    try {
      var Ou = {};
      Object.defineProperty(Ou, "passive", {
        get: function() {
          dc = !0;
        }
      }), window.addEventListener("test", Ou, Ou), window.removeEventListener("test", Ou, Ou);
    } catch {
      dc = !1;
    }
  var Da = null, vc = null, Cn = null;
  function _o() {
    if (Cn) return Cn;
    var t, l = vc, a = l.length, e, u = "value" in Da ? Da.value : Da.textContent, n = u.length;
    for (t = 0; t < a && l[t] === u[t]; t++) ;
    var i = a - t;
    for (e = 1; e <= i && l[a - e] === u[n - e]; e++) ;
    return Cn = u.slice(t, 1 < e ? 1 - e : void 0);
  }
  function Un(t) {
    var l = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && l === 13 && (t = 13)) : t = l, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function Rn() {
    return !0;
  }
  function zo() {
    return !1;
  }
  function fl(t) {
    function l(a, e, u, n, i) {
      this._reactName = a, this._targetInst = u, this.type = e, this.nativeEvent = n, this.target = i, this.currentTarget = null;
      for (var c in t)
        t.hasOwnProperty(c) && (a = t[c], this[c] = a ? a(n) : n[c]);
      return this.isDefaultPrevented = (n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1) ? Rn : zo, this.isPropagationStopped = zo, this;
    }
    return V(l.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var a = this.nativeEvent;
        a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = Rn);
      },
      stopPropagation: function() {
        var a = this.nativeEvent;
        a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = Rn);
      },
      persist: function() {
      },
      isPersistent: Rn
    }), l;
  }
  var Ca = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Hn = fl(Ca), Au = V({}, Ca, { view: 0, detail: 0 }), uv = fl(Au), yc, hc, Mu, xn = V({}, Au, {
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
    getModifierState: Sc,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== Mu && (Mu && t.type === "mousemove" ? (yc = t.screenX - Mu.screenX, hc = t.screenY - Mu.screenY) : hc = yc = 0, Mu = t), yc);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : hc;
    }
  }), No = fl(xn), nv = V({}, xn, { dataTransfer: 0 }), iv = fl(nv), cv = V({}, Au, { relatedTarget: 0 }), gc = fl(cv), fv = V({}, Ca, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), sv = fl(fv), ov = V({}, Ca, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), rv = fl(ov), mv = V({}, Ca, { data: 0 }), Oo = fl(mv), dv = {
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
  }, vv = {
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
  }, yv = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function hv(t) {
    var l = this.nativeEvent;
    return l.getModifierState ? l.getModifierState(t) : (t = yv[t]) ? !!l[t] : !1;
  }
  function Sc() {
    return hv;
  }
  var gv = V({}, Au, {
    key: function(t) {
      if (t.key) {
        var l = dv[t.key] || t.key;
        if (l !== "Unidentified") return l;
      }
      return t.type === "keypress" ? (t = Un(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? vv[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Sc,
    charCode: function(t) {
      return t.type === "keypress" ? Un(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? Un(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), Sv = fl(gv), bv = V({}, xn, {
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
  }), Ao = fl(bv), Tv = V({}, Ca, { submitter: 0 }), Ev = fl(Tv), _v = V({}, Au, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Sc
  }), zv = fl(_v), Nv = V({}, Ca, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Ov = fl(Nv), Av = V({}, xn, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Mv = fl(Av), pv = V({}, Ca, {
    newState: 0,
    oldState: 0,
    source: 0
  }), Dv = fl(pv), Cv = [9, 13, 27, 32], bc = ma && "CompositionEvent" in window, pu = null;
  ma && "documentMode" in document && (pu = document.documentMode);
  var Uv = ma && "TextEvent" in window && !pu, Mo = ma && (!bc || pu && 8 < pu && 11 >= pu), po = " ", Do = !1;
  function Co(t, l) {
    switch (t) {
      case "keyup":
        return Cv.indexOf(l.keyCode) !== -1;
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
  function Uo(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var Be = !1;
  function Rv(t, l) {
    switch (t) {
      case "compositionend":
        return Uo(l);
      case "keypress":
        return l.which !== 32 ? null : (Do = !0, po);
      case "textInput":
        return t = l.data, t === po && Do ? null : t;
      default:
        return null;
    }
  }
  function Hv(t, l) {
    if (Be)
      return t === "compositionend" || !bc && Co(t, l) ? (t = _o(), Cn = vc = Da = null, Be = !1, t) : null;
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
  var xv = {
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
  function Ro(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l === "input" ? !!xv[t.type] : l === "textarea";
  }
  function Ho(t, l, a, e) {
    xe ? je ? je.push(e) : je = [e] : xe = e, l = ji(l, "onChange"), 0 < l.length && (a = new Hn(
      "onChange",
      "change",
      null,
      a,
      e
    ), t.push({ event: a, listeners: l }));
  }
  var Du = null, Cu = null;
  function jv(t) {
    T0(t, 0);
  }
  function jn(t) {
    var l = zu(t);
    if (vo(l)) return t;
  }
  function xo(t, l) {
    if (t === "change") return l;
  }
  var jo = !1;
  if (ma) {
    var Tc;
    if (ma) {
      var Ec = "oninput" in document;
      if (!Ec) {
        var Bo = document.createElement("div");
        Bo.setAttribute("oninput", "return;"), Ec = typeof Bo.oninput == "function";
      }
      Tc = Ec;
    } else Tc = !1;
    jo = Tc && (!document.documentMode || 9 < document.documentMode);
  }
  function qo() {
    Du && (Du.detachEvent("onpropertychange", Yo), Cu = Du = null);
  }
  function Yo(t) {
    if (t.propertyName === "value" && jn(Cu)) {
      var l = [];
      Ho(
        l,
        Cu,
        t,
        rc(t)
      ), Eo(jv, l);
    }
  }
  function Bv(t, l, a) {
    t === "focusin" ? (qo(), Du = l, Cu = a, Du.attachEvent("onpropertychange", Yo)) : t === "focusout" && qo();
  }
  function qv(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return jn(Cu);
  }
  function Yv(t, l) {
    if (t === "click") return jn(l);
  }
  function Gv(t, l) {
    if (t === "input" || t === "change")
      return jn(l);
  }
  function Xv(t, l) {
    return t === l && (t !== 0 || 1 / t === 1 / l) || t !== t && l !== l;
  }
  var zl = typeof Object.is == "function" ? Object.is : Xv;
  function Uu(t, l) {
    if (zl(t, l)) return !0;
    if (typeof t != "object" || t === null || typeof l != "object" || l === null)
      return !1;
    var a = Object.keys(t), e = Object.keys(l);
    if (a.length !== e.length) return !1;
    for (e = 0; e < a.length; e++) {
      var u = a[e];
      if (!tc.call(l, u) || !zl(t[u], l[u]))
        return !1;
    }
    return !0;
  }
  function _c(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  function Go(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Xo(t, l) {
    var a = Go(t);
    t = 0;
    for (var e; a; ) {
      if (a.nodeType === 3) {
        if (e = t + a.textContent.length, t <= l && e >= l)
          return { node: a, offset: l - t };
        t = e;
      }
      t: {
        for (; a; ) {
          if (a.nextSibling) {
            a = a.nextSibling;
            break t;
          }
          a = a.parentNode;
        }
        a = void 0;
      }
      a = Go(a);
    }
  }
  function Qo(t, l) {
    return t && l ? t === l ? !0 : t && t.nodeType === 3 ? !1 : l && l.nodeType === 3 ? Qo(t, l.parentNode) : "contains" in t ? t.contains(l) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(l) & 16) : !1 : !1;
  }
  function Lo(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var l = _c(t.document); l instanceof t.HTMLIFrameElement; ) {
      try {
        var a = typeof l.contentWindow.location.href == "string";
      } catch {
        a = !1;
      }
      if (a) t = l.contentWindow;
      else break;
      l = _c(t.document);
    }
    return l;
  }
  function zc(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l && (l === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || l === "textarea" || t.contentEditable === "true");
  }
  var Qv = ma && "documentMode" in document && 11 >= document.documentMode, qe = null, Nc = null, Ru = null, Oc = !1;
  function Zo(t, l, a) {
    var e = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    Oc || qe == null || qe !== _c(e) || (e = qe, "selectionStart" in e && zc(e) ? e = { start: e.selectionStart, end: e.selectionEnd } : (e = (e.ownerDocument && e.ownerDocument.defaultView || window).getSelection(), e = {
      anchorNode: e.anchorNode,
      anchorOffset: e.anchorOffset,
      focusNode: e.focusNode,
      focusOffset: e.focusOffset
    }), Ru && Uu(Ru, e) || (Ru = e, e = ji(Nc, "onSelect"), 0 < e.length && (l = new Hn(
      "onSelect",
      "select",
      null,
      l,
      a
    ), t.push({ event: l, listeners: e }), l.target = qe)));
  }
  function ne(t, l) {
    var a = {};
    return a[t.toLowerCase()] = l.toLowerCase(), a["Webkit" + t] = "webkit" + l, a["Moz" + t] = "moz" + l, a;
  }
  var Ye = {
    animationend: ne("Animation", "AnimationEnd"),
    animationiteration: ne("Animation", "AnimationIteration"),
    animationstart: ne("Animation", "AnimationStart"),
    transitionrun: ne("Transition", "TransitionRun"),
    transitionstart: ne("Transition", "TransitionStart"),
    transitioncancel: ne("Transition", "TransitionCancel"),
    transitionend: ne("Transition", "TransitionEnd")
  }, Ac = {}, Vo = {};
  ma && (Vo = document.createElement("div").style, "AnimationEvent" in window || (delete Ye.animationend.animation, delete Ye.animationiteration.animation, delete Ye.animationstart.animation), "TransitionEvent" in window || delete Ye.transitionend.transition);
  function ie(t) {
    if (Ac[t]) return Ac[t];
    if (!Ye[t]) return t;
    var l = Ye[t], a;
    for (a in l)
      if (l.hasOwnProperty(a) && a in Vo)
        return Ac[t] = l[a];
    return t;
  }
  var Ko = ie("animationend"), wo = ie("animationiteration"), Jo = ie("animationstart"), Lv = ie("transitionrun"), Zv = ie("transitionstart"), Vv = ie("transitioncancel"), $o = ie("transitionend"), Fo = /* @__PURE__ */ new Map(), Mc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Mc.push("scrollEnd");
  function Zl(t, l) {
    Fo.set(t, l), ue(l, [t]);
  }
  var Kv = 0;
  function da(t, l) {
    if (t.name != null && t.name !== "auto") return t.name;
    if (l.autoName !== null) return l.autoName;
    t = Jl.identifierPrefix;
    var a = Kv++;
    return t = "_" + t + "t_" + a.toString(32) + "_", l.autoName = t;
  }
  function Wo(t) {
    if (t == null || typeof t == "string")
      return t;
    var l = null, a = uu;
    if (a !== null)
      for (var e = 0; e < a.length; e++) {
        var u = t[a[e]];
        if (u != null) {
          if (u === "none") return "none";
          l = l == null ? u : l + (" " + u);
        }
      }
    return l ?? t.default;
  }
  function va(t, l) {
    return t = Wo(t), l = Wo(l), l == null ? t === "auto" ? null : t : l === "auto" ? null : l;
  }
  var Bn = typeof reportError == "function" ? reportError : function(t) {
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
  }, Hl = [], Ge = 0, pc = 0;
  function qn() {
    for (var t = Ge, l = pc = Ge = 0; l < t; ) {
      var a = Hl[l];
      Hl[l++] = null;
      var e = Hl[l];
      Hl[l++] = null;
      var u = Hl[l];
      Hl[l++] = null;
      var n = Hl[l];
      if (Hl[l++] = null, e !== null && u !== null) {
        var i = e.pending;
        i === null ? u.next = u : (u.next = i.next, i.next = u), e.pending = u;
      }
      n !== 0 && ko(a, u, n);
    }
  }
  function Yn(t, l, a, e) {
    Hl[Ge++] = t, Hl[Ge++] = l, Hl[Ge++] = a, Hl[Ge++] = e, pc |= e, t.lanes |= e, t = t.alternate, t !== null && (t.lanes |= e);
  }
  function Dc(t, l, a, e) {
    return Yn(t, l, a, e), Gn(t);
  }
  function ce(t, l) {
    return Yn(t, null, null, l), Gn(t);
  }
  function ko(t, l, a) {
    t.lanes |= a;
    var e = t.alternate;
    e !== null && (e.lanes |= a);
    for (var u = !1, n = t.return; n !== null; )
      n.childLanes |= a, e = n.alternate, e !== null && (e.childLanes |= a), n.tag === 22 && (t = n.stateNode, t === null || t._visibility & 1 || (u = !0)), t = n, n = n.return;
    return t.tag === 3 ? (n = t.stateNode, u && l !== null && (u = 31 - El(a), t = n.hiddenUpdates, e = t[u], e === null ? t[u] = [l] : e.push(l), l.lane = a | 536870912), n) : null;
  }
  function Gn(t) {
    if (50 < tn)
      throw tn = 0, pi = null, Error(s(185));
    for (var l = t.return; l !== null; )
      t = l, l = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var Xe = {};
  function wv(t, l, a, e) {
    this.tag = t, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = l, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = e, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function dl(t, l, a, e) {
    return new wv(t, l, a, e);
  }
  function Cc(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function ya(t, l) {
    var a = t.alternate;
    return a === null ? (a = dl(
      t.tag,
      l,
      t.key,
      t.mode
    ), a.elementType = t.elementType, a.type = t.type, a.stateNode = t.stateNode, a.alternate = t, t.alternate = a) : (a.pendingProps = l, a.type = t.type, a.flags = 0, a.subtreeFlags = 0, a.deletions = null), a.flags = t.flags & 1206910976, a.childLanes = t.childLanes, a.lanes = t.lanes, a.child = t.child, a.memoizedProps = t.memoizedProps, a.memoizedState = t.memoizedState, a.updateQueue = t.updateQueue, l = t.dependencies, a.dependencies = l === null ? null : { lanes: l.lanes, firstContext: l.firstContext }, a.sibling = t.sibling, a.index = t.index, a.ref = t.ref, a.refCleanup = t.refCleanup, a;
  }
  function Io(t, l) {
    t.flags &= 1206910978;
    var a = t.alternate;
    return a === null ? (t.childLanes = 0, t.lanes = l, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = a.childLanes, t.lanes = a.lanes, t.child = a.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = a.memoizedProps, t.memoizedState = a.memoizedState, t.updateQueue = a.updateQueue, t.type = a.type, l = a.dependencies, t.dependencies = l === null ? null : {
      lanes: l.lanes,
      firstContext: l.firstContext
    }), t;
  }
  function Xn(t, l, a, e, u, n) {
    var i = 0;
    if (e = t, typeof e == "function") Cc(e) && (i = 1);
    else if (typeof e == "string")
      i = Th(
        t,
        a,
        kl.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (e) {
        case Sl:
          return t = dl(31, a, l, u), t.elementType = Sl, t.lanes = n, t;
        case Vt:
          return fe(a.children, u, n, l);
        case nl:
          i = 8, u |= 24;
          break;
        case Ql:
          return t = dl(12, a, l, u | 2), t.elementType = Ql, t.lanes = n, t;
        case K:
          return t = dl(13, a, l, u), t.elementType = K, t.lanes = n, t;
        case J:
          return t = dl(19, a, l, u), t.elementType = J, t.lanes = n, t;
        case Ll:
        case m:
          return t = u | 32, t = dl(30, a, l, t), t.elementType = m, t.lanes = n, t.stateNode = {
            autoName: null,
            paired: null,
            clones: null,
            ref: null
          }, t;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case Rt:
                i = 10;
                break t;
              case sa:
                i = 9;
                break t;
              case R:
                i = 11;
                break t;
              case mt:
                i = 14;
                break t;
              case W:
                i = 16, e = null;
                break t;
            }
          i = 29, a = Error(
            s(130, t === null ? "null" : typeof t, "")
          ), e = null;
      }
    return l = dl(i, a, l, u), l.elementType = t, l.type = e, l.lanes = n, l;
  }
  function fe(t, l, a, e) {
    return t = dl(7, t, e, l), t.lanes = a, t;
  }
  function Uc(t, l, a) {
    return t = dl(6, t, null, l), t.lanes = a, t;
  }
  function Po(t) {
    var l = dl(18, null, null, 0);
    return l.stateNode = t, l;
  }
  function Rc(t, l, a) {
    return l = dl(
      4,
      t.children !== null ? t.children : [],
      t.key,
      l
    ), l.lanes = a, l.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation
    }, l;
  }
  var tr = /* @__PURE__ */ new WeakMap();
  function xl(t, l) {
    if (typeof t == "object" && t !== null) {
      var a = tr.get(t);
      return a !== void 0 ? a : (l = {
        value: t,
        source: l,
        stack: Js(l)
      }, tr.set(t, l), l);
    }
    return {
      value: t,
      source: l,
      stack: Js(l)
    };
  }
  var Qe = [], Le = 0, Qn = null, Hu = 0, jl = [], Bl = 0, Ua = null, Pl = 1, ta = "";
  function ha(t, l) {
    Qe[Le++] = Hu, Qe[Le++] = Qn, Qn = t, Hu = l;
  }
  function lr(t, l, a) {
    jl[Bl++] = Pl, jl[Bl++] = ta, jl[Bl++] = Ua, Ua = t;
    var e = Pl;
    t = ta;
    var u = 32 - El(e) - 1;
    e &= ~(1 << u), a += 1;
    var n = 32 - El(l) + u;
    if (30 < n) {
      var i = u - u % 5;
      n = (e & (1 << i) - 1).toString(32), e >>= i, u -= i, Pl = 1 << 32 - El(l) + u | a << u | e, ta = n + t;
    } else
      Pl = 1 << n | a << u | e, ta = t;
  }
  function Ln(t) {
    t.return !== null && (ha(t, 1), lr(t, 1, 0));
  }
  function Hc(t) {
    for (; t === Qn; )
      Qn = Qe[--Le], Qe[Le] = null, Hu = Qe[--Le], Qe[Le] = null;
    for (; t === Ua; )
      Ua = jl[--Bl], jl[Bl] = null, ta = jl[--Bl], jl[Bl] = null, Pl = jl[--Bl], jl[Bl] = null;
  }
  function ar(t, l) {
    jl[Bl++] = Pl, jl[Bl++] = ta, jl[Bl++] = Ua, Pl = l.id, ta = l.overflow, Ua = t;
  }
  var wt = null, Nt = null, P = !1, Ra = null, ql = !1, xc = Error(s(519));
  function Ha(t) {
    var l = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw xu(xl(l, t)), xc;
  }
  function er(t) {
    var l = t.stateNode, a = t.type, e = t.memoizedProps;
    switch (l[Wt] = t, l[ml] = e, a) {
      case "dialog":
        lt("cancel", l), lt("close", l);
        break;
      case "iframe":
      case "object":
      case "embed":
        lt("load", l);
        break;
      case "video":
      case "audio":
        for (a = 0; a < an.length; a++)
          lt(an[a], l);
        break;
      case "source":
        lt("error", l);
        break;
      case "img":
      case "image":
      case "link":
        lt("error", l), lt("load", l);
        break;
      case "details":
        lt("toggle", l);
        break;
      case "input":
        lt("invalid", l), yo(
          l,
          e.value,
          e.defaultValue,
          e.checked,
          e.defaultChecked,
          e.type,
          e.name,
          !0
        );
        break;
      case "select":
        lt("invalid", l);
        break;
      case "textarea":
        lt("invalid", l), go(l, e.value, e.defaultValue, e.children);
    }
    a = e.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" || l.textContent === "" + a || e.suppressHydrationWarning === !0 || N0(l.textContent, a) ? (e.popover != null && (lt("beforetoggle", l), lt("toggle", l)), e.onScroll != null && lt("scroll", l), e.onScrollEnd != null && lt("scrollend", l), e.onClick != null && (l.onclick = Il), l = !0) : l = !1, l || Ha(t, !0);
  }
  function Zn(t) {
    for (wt = t.return; wt; )
      switch (wt.tag) {
        case 5:
        case 31:
        case 13:
          ql = !1;
          return;
        case 27:
        case 3:
          ql = !0;
          return;
        default:
          wt = wt.return;
      }
  }
  function Ze(t) {
    if (t !== wt) return !1;
    if (!P) return Zn(t), P = !0, !1;
    var l = t.tag, a;
    if ((a = l !== 3 && l !== 27) && ((a = l === 5) && (a = t.type, a = !(a !== "form" && a !== "button") || rs(t.type, t.memoizedProps)), a = !a), a && Nt && Ha(t), Zn(t), l === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      Nt = Z0(t);
    } else if (l === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      Nt = Z0(t);
    } else
      l === 27 ? (l = Nt, Fa(t.type) ? (t = Ts, Ts = null, Nt = t) : Nt = l) : Nt = wt ? Gl(t.stateNode.nextSibling) : null;
    return !0;
  }
  function se() {
    Nt = wt = null, P = !1;
  }
  function jc() {
    var t = Ra;
    return t !== null && (hl === null ? hl = t : hl.push.apply(
      hl,
      t
    ), Ra = null), t;
  }
  function xu(t) {
    Ra === null ? Ra = [t] : Ra.push(t);
  }
  var Bc = cl(null), oe = null, ga = null;
  function xa(t, l, a) {
    zt(Bc, l._currentValue), l._currentValue = a;
  }
  function Sa(t) {
    t._currentValue = Bc.current, Ft(Bc);
  }
  function Vn(t, l, a) {
    for (; t !== null; ) {
      var e = t.alternate;
      if ((t.childLanes & l) !== l ? (t.childLanes |= l, e !== null && (e.childLanes |= l)) : e !== null && (e.childLanes & l) !== l && (e.childLanes |= l), t === a) break;
      t = t.return;
    }
  }
  function qc(t, l, a, e) {
    var u = t.child;
    for (u !== null && (u.return = t); u !== null; ) {
      var n = u.dependencies;
      if (n !== null) {
        var i = u.child;
        n = n.firstContext;
        t: for (; n !== null; ) {
          var c = n;
          n = u;
          for (var f = 0; f < l.length; f++)
            if (c.context === l[f]) {
              n.lanes |= a, c = n.alternate, c !== null && (c.lanes |= a), Vn(
                n.return,
                a,
                t
              ), e || (i = null);
              break t;
            }
          n = c.next;
        }
      } else if (u.tag === 18) {
        if (i = u.return, i === null) throw Error(s(341));
        i.lanes |= a, n = i.alternate, n !== null && (n.lanes |= a), Vn(i, a, t), i = null;
      } else
        u.tag === 13 && u.memoizedState !== null && u.memoizedState.dehydrated === null ? (u.lanes |= a, i = u.alternate, i !== null && (i.lanes |= a), Vn(
          u.return,
          a,
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
  function re(t, l, a, e) {
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
          zl(u.pendingProps.value, i.value) || (t !== null ? t.push(c) : t = [c]);
        }
      } else if (u === gn.current) {
        if (i = u.alternate, i === null) throw Error(s(387));
        i.memoizedState.memoizedState !== u.memoizedState.memoizedState && (t !== null ? t.push(vu) : t = [vu]);
      }
      u = u.return;
    }
    return t !== null && qc(
      l,
      t,
      a,
      e
    ), l.flags |= 262144, t !== null;
  }
  function Kn(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!zl(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function me(t) {
    oe = t, ga = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function kt(t) {
    return ur(oe, t);
  }
  function wn(t, l) {
    return oe === null && me(t), ur(t, l);
  }
  function ur(t, l) {
    var a = l._currentValue;
    if (l = { context: l, memoizedValue: a, next: null }, ga === null) {
      if (t === null) throw Error(s(308));
      ga = l, t.dependencies = { lanes: 0, firstContext: l }, t.flags |= 524288;
    } else ga = ga.next = l;
    return a;
  }
  var Jv = typeof AbortController < "u" ? AbortController : function() {
    var t = [], l = this.signal = {
      aborted: !1,
      addEventListener: function(a, e) {
        t.push(e);
      }
    };
    this.abort = function() {
      l.aborted = !0, t.forEach(function(a) {
        return a();
      });
    };
  }, $v = r.unstable_scheduleCallback, Fv = r.unstable_NormalPriority, Bt = {
    $$typeof: Rt,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Yc() {
    return {
      controller: new Jv(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function ju(t) {
    t.refCount--, t.refCount === 0 && $v(Fv, function() {
      t.controller.abort();
    });
  }
  function nr(t, l) {
    if ((t.pendingLanes & 4194048) !== 0) {
      var a = t.transitionTypes;
      for (a === null && (a = t.transitionTypes = []), t = 0; t < l.length; t++) {
        var e = l[t];
        a.indexOf(e) === -1 && a.push(e);
      }
    }
  }
  var Bu = null;
  function Wv(t) {
    var l = t.transitionTypes;
    return t.transitionTypes = null, l;
  }
  var qu = null, Gc = 0, de = 0, Ve = null;
  function kv(t, l) {
    if (qu === null) {
      var a = qu = [];
      Gc = 0, de = as(), Ve = {
        status: "pending",
        value: void 0,
        then: function(e) {
          a.push(e);
        }
      };
    }
    return Gc++, l.then(ir, ir), l;
  }
  function ir() {
    if (--Gc === 0 && (Bu = null, qu !== null)) {
      Ve !== null && (Ve.status = "fulfilled");
      var t = qu;
      qu = null, de = 0, Ve = null;
      for (var l = 0; l < t.length; l++) (0, t[l])();
    }
  }
  function Iv(t, l) {
    var a = [], e = {
      status: "pending",
      value: null,
      reason: null,
      then: function(u) {
        a.push(u);
      }
    };
    return t.then(
      function() {
        e.status = "fulfilled", e.value = l;
        for (var u = 0; u < a.length; u++) (0, a[u])(l);
      },
      function(u) {
        for (e.status = "rejected", e.reason = u, u = 0; u < a.length; u++)
          (0, a[u])(void 0);
      }
    ), e;
  }
  var cr = O.S;
  O.S = function(t, l) {
    if (Pm = bl(), typeof l == "object" && l !== null && typeof l.then == "function" && kv(t, l), Bu !== null)
      for (var a = fu; a !== null; )
        nr(a, Bu), a = a.next;
    if (a = t.types, a !== null) {
      for (var e = fu; e !== null; )
        nr(e, a), e = e.next;
      if (de !== 0) {
        e = Bu, e === null && (e = Bu = []);
        for (var u = 0; u < a.length; u++) {
          var n = a[u];
          e.indexOf(n) === -1 && e.push(n);
        }
      }
    }
    cr !== null && cr(t, l);
  };
  var ve = cl(null);
  function Xc() {
    var t = ve.current;
    return t !== null ? t : Tt.pooledCache;
  }
  function Jn(t, l) {
    l === null ? zt(ve, ve.current) : zt(ve, l.pool);
  }
  function fr() {
    var t = Xc();
    return t === null ? null : { parent: Bt._currentValue, pool: t };
  }
  var Ke = Error(s(460)), Qc = Error(s(474)), $n = Error(s(542)), Fn = { then: function() {
  } };
  function sr(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function or(t, l, a) {
    switch (a = t[a], a === void 0 ? t.push(l) : a !== l && (l.then(Il, Il), l = a), l.status) {
      case "fulfilled":
        return l.value;
      case "rejected":
        throw t = l.reason, mr(t), t === void 0 && !("reason" in l) ? Error(s(600)) : t;
      default:
        if (typeof l.status == "string") l.then(Il, Il);
        else {
          if (t = Tt, t !== null && 100 < t.shellSuspendCounter)
            throw Error(s(482));
          t = l, t.status = "pending", t.then(
            function(e) {
              if (l.status === "pending") {
                var u = l;
                u.status = "fulfilled", u.value = e;
              }
            },
            function(e) {
              if (l.status === "pending") {
                var u = l;
                u.status = "rejected", u.reason = e;
              }
            }
          );
        }
        switch (l.status) {
          case "fulfilled":
            return l.value;
          case "rejected":
            throw t = l.reason, mr(t), t;
        }
        throw he = l, Ke;
    }
  }
  function ye(t) {
    try {
      var l = t._init;
      return l(t._payload);
    } catch (a) {
      throw a !== null && typeof a == "object" && typeof a.then == "function" ? (he = a, Ke) : a;
    }
  }
  var he = null;
  function rr() {
    if (he === null) throw Error(s(459));
    var t = he;
    return he = null, t;
  }
  function mr(t) {
    if (t === Ke || t === $n)
      throw Error(s(483));
  }
  var we = null, Yu = 0;
  function Wn(t) {
    var l = Yu;
    return Yu += 1, we === null && (we = []), or(we, t, l);
  }
  function ja(t, l) {
    l = l.props.ref, t.ref = l !== void 0 ? l : null;
  }
  function kn(t, l) {
    throw l.$$typeof === B ? Error(s(525)) : (t = Object.prototype.toString.call(l), Error(
      s(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(l).join(", ") + "}" : t
      )
    ));
  }
  function dr(t) {
    function l(y, o) {
      if (t) {
        var g = y.deletions;
        g === null ? (y.deletions = [o], y.flags |= 16) : g.push(o);
      }
    }
    function a(y, o) {
      if (!t) return null;
      for (; o !== null; )
        l(y, o), o = o.sibling;
      return null;
    }
    function e(y) {
      for (var o = /* @__PURE__ */ new Map(); y !== null; )
        y.key === null ? o.set(y.index, y) : o.set(y.key, y), y = y.sibling;
      return o;
    }
    function u(y, o) {
      return y = ya(y, o), y.index = 0, y.sibling = null, y;
    }
    function n(y, o, g) {
      return y.index = g, t ? (g = y.alternate, g !== null ? (g = g.index, g < o ? (y.flags |= 2, o) : g) : (y.flags |= 134217730, o)) : (y.flags |= 1048576, o);
    }
    function i(y) {
      return t && y.alternate === null && (y.flags |= 134217730), y;
    }
    function c(y, o, g, z) {
      return o === null || o.tag !== 6 ? (o = Uc(g, y.mode, z), o.return = y, o) : (o = u(o, g), o.return = y, o);
    }
    function f(y, o, g, z) {
      var H = g.type;
      return H === Vt ? (y = b(
        y,
        o,
        g.props.children,
        z,
        g.key
      ), ja(y, g), y) : o !== null && (o.elementType === H || typeof H == "object" && H !== null && H.$$typeof === W && ye(H) === o.type) ? (o = u(o, g.props), ja(o, g), o.return = y, o) : (o = Xn(
        g.type,
        g.key,
        g.props,
        null,
        y.mode,
        z
      ), ja(o, g), o.return = y, o);
    }
    function h(y, o, g, z) {
      return o === null || o.tag !== 4 || o.stateNode.containerInfo !== g.containerInfo || o.stateNode.implementation !== g.implementation ? (o = Rc(g, y.mode, z), o.return = y, o) : (o = u(o, g.children || []), o.return = y, o);
    }
    function b(y, o, g, z, H) {
      return o === null || o.tag !== 7 ? (o = fe(
        g,
        y.mode,
        z,
        H
      ), o.return = y, o) : (o = u(o, g), o.return = y, o);
    }
    function N(y, o, g) {
      if (typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint")
        return o = Uc(
          "" + o,
          y.mode,
          g
        ), o.return = y, o;
      if (typeof o == "object" && o !== null) {
        switch (o.$$typeof) {
          case $:
            return g = Xn(
              o.type,
              o.key,
              o.props,
              null,
              y.mode,
              g
            ), ja(g, o), g.return = y, g;
          case _t:
            return o = Rc(
              o,
              y.mode,
              g
            ), o.return = y, o;
          case W:
            return o = ye(o), N(y, o, g);
        }
        if (st(o) || G(o))
          return o = fe(
            o,
            y.mode,
            g,
            null
          ), o.return = y, o;
        if (typeof o.then == "function")
          return N(y, Wn(o), g);
        if (o.$$typeof === Rt)
          return N(
            y,
            wn(y, o),
            g
          );
        kn(y, o);
      }
      return null;
    }
    function v(y, o, g, z) {
      var H = o !== null ? o.key : null;
      if (typeof g == "string" && g !== "" || typeof g == "number" || typeof g == "bigint")
        return H !== null ? null : c(y, o, "" + g, z);
      if (typeof g == "object" && g !== null) {
        switch (g.$$typeof) {
          case $:
            return g.key === H ? f(y, o, g, z) : null;
          case _t:
            return g.key === H ? h(y, o, g, z) : null;
          case W:
            return g = ye(g), v(y, o, g, z);
        }
        if (st(g) || G(g))
          return H !== null ? null : b(y, o, g, z, null);
        if (typeof g.then == "function")
          return v(
            y,
            o,
            Wn(g),
            z
          );
        if (g.$$typeof === Rt)
          return v(
            y,
            o,
            wn(y, g),
            z
          );
        kn(y, g);
      }
      return null;
    }
    function S(y, o, g, z, H) {
      if (typeof z == "string" && z !== "" || typeof z == "number" || typeof z == "bigint")
        return y = y.get(g) || null, c(o, y, "" + z, H);
      if (typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case $:
            return y = y.get(
              z.key === null ? g : z.key
            ) || null, f(o, y, z, H);
          case _t:
            return y = y.get(
              z.key === null ? g : z.key
            ) || null, h(o, y, z, H);
          case W:
            return z = ye(z), S(
              y,
              o,
              g,
              z,
              H
            );
        }
        if (st(z) || G(z))
          return y = y.get(g) || null, b(o, y, z, H, null);
        if (typeof z.then == "function")
          return S(
            y,
            o,
            g,
            Wn(z),
            H
          );
        if (z.$$typeof === Rt)
          return S(
            y,
            o,
            g,
            wn(o, z),
            H
          );
        kn(o, z);
      }
      return null;
    }
    function p(y, o, g, z) {
      for (var H = null, et = null, X = o, w = o = 0, Gt = null; X !== null && w < g.length; w++) {
        X.index > w ? (Gt = X, X = null) : Gt = X.sibling;
        var ct = v(
          y,
          X,
          g[w],
          z
        );
        if (ct === null) {
          X === null && (X = Gt);
          break;
        }
        t && X && ct.alternate === null && l(y, X), o = n(ct, o, w), et === null ? H = ct : et.sibling = ct, et = ct, X = Gt;
      }
      if (w === g.length)
        return a(y, X), P && ha(y, w), H;
      if (X === null) {
        for (; w < g.length; w++)
          X = N(y, g[w], z), X !== null && (o = n(
            X,
            o,
            w
          ), et === null ? H = X : et.sibling = X, et = X);
        return P && ha(y, w), H;
      }
      for (X = e(X); w < g.length; w++)
        Gt = S(
          X,
          y,
          w,
          g[w],
          z
        ), Gt !== null && (t && (ct = Gt.alternate, ct !== null && X.delete(ct.key === null ? w : ct.key)), o = n(
          Gt,
          o,
          w
        ), et === null ? H = Gt : et.sibling = Gt, et = Gt);
      return t && X.forEach(function(te) {
        return l(y, te);
      }), P && ha(y, w), H;
    }
    function q(y, o, g, z) {
      if (g == null) throw Error(s(151));
      for (var H = null, et = null, X = o, w = o = 0, Gt = null, ct = g.next(); X !== null && !ct.done; w++, ct = g.next()) {
        X.index > w ? (Gt = X, X = null) : Gt = X.sibling;
        var te = v(y, X, ct.value, z);
        if (te === null) {
          X === null && (X = Gt);
          break;
        }
        t && X && te.alternate === null && l(y, X), o = n(te, o, w), et === null ? H = te : et.sibling = te, et = te, X = Gt;
      }
      if (ct.done)
        return a(y, X), P && ha(y, w), H;
      if (X === null) {
        for (; !ct.done; w++, ct = g.next())
          ct = N(y, ct.value, z), ct !== null && (o = n(ct, o, w), et === null ? H = ct : et.sibling = ct, et = ct);
        return P && ha(y, w), H;
      }
      for (X = e(X); !ct.done; w++, ct = g.next())
        ct = S(X, y, w, ct.value, z), ct !== null && (t && (Gt = ct.alternate, Gt !== null && X.delete(
          Gt.key === null ? w : Gt.key
        )), o = n(ct, o, w), et === null ? H = ct : et.sibling = ct, et = ct);
      return t && X.forEach(function(Rh) {
        return l(y, Rh);
      }), P && ha(y, w), H;
    }
    function I(y, o, g, z) {
      if (typeof g == "object" && g !== null && g.type === Vt && g.key === null && g.props.ref === void 0 && (g = g.props.children), typeof g == "object" && g !== null) {
        switch (g.$$typeof) {
          case $:
            t: {
              for (var H = g.key; o !== null; ) {
                if (o.key === H) {
                  if (H = g.type, H === Vt) {
                    if (o.tag === 7) {
                      a(
                        y,
                        o.sibling
                      ), z = u(
                        o,
                        g.props.children
                      ), ja(z, g), z.return = y, y = z;
                      break t;
                    }
                  } else if (o.elementType === H || typeof H == "object" && H !== null && H.$$typeof === W && ye(H) === o.type) {
                    a(
                      y,
                      o.sibling
                    ), z = u(o, g.props), ja(z, g), z.return = y, y = z;
                    break t;
                  }
                  a(y, o);
                  break;
                } else l(y, o);
                o = o.sibling;
              }
              g.type === Vt ? (z = fe(
                g.props.children,
                y.mode,
                z,
                g.key
              ), ja(z, g), z.return = y, y = z) : (z = Xn(
                g.type,
                g.key,
                g.props,
                null,
                y.mode,
                z
              ), ja(z, g), z.return = y, y = z);
            }
            return i(y);
          case _t:
            t: {
              for (H = g.key; o !== null; ) {
                if (o.key === H)
                  if (o.tag === 4 && o.stateNode.containerInfo === g.containerInfo && o.stateNode.implementation === g.implementation) {
                    a(
                      y,
                      o.sibling
                    ), z = u(o, g.children || []), z.return = y, y = z;
                    break t;
                  } else {
                    a(y, o);
                    break;
                  }
                else l(y, o);
                o = o.sibling;
              }
              z = Rc(g, y.mode, z), z.return = y, y = z;
            }
            return i(y);
          case W:
            return g = ye(g), I(
              y,
              o,
              g,
              z
            );
        }
        if (st(g))
          return p(
            y,
            o,
            g,
            z
          );
        if (G(g)) {
          if (H = G(g), typeof H != "function") throw Error(s(150));
          return g = H.call(g), q(
            y,
            o,
            g,
            z
          );
        }
        if (typeof g.then == "function")
          return I(
            y,
            o,
            Wn(g),
            z
          );
        if (g.$$typeof === Rt)
          return I(
            y,
            o,
            wn(y, g),
            z
          );
        kn(y, g);
      }
      return typeof g == "string" && g !== "" || typeof g == "number" || typeof g == "bigint" ? (g = "" + g, o !== null && o.tag === 6 ? (a(y, o.sibling), z = u(o, g), z.return = y, y = z) : (a(y, o), z = Uc(g, y.mode, z), z.return = y, y = z), i(y)) : a(y, o);
    }
    return function(y, o, g, z) {
      try {
        Yu = 0;
        var H = I(
          y,
          o,
          g,
          z
        );
        return we = null, H;
      } catch (X) {
        if (X === Ke || X === $n) throw X;
        var et = dl(29, X, null, y.mode);
        return et.lanes = z, et.return = y, et;
      }
    };
  }
  var ge = dr(!0), vr = dr(!1), Ba = !1;
  function Lc(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Zc(t, l) {
    t = t.updateQueue, l.updateQueue === t && (l.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function qa(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Ya(t, l, a) {
    var e = t.updateQueue;
    if (e === null) return null;
    if (e = e.shared, (rt & 2) !== 0) {
      var u = e.pending;
      return u === null ? l.next = l : (l.next = u.next, u.next = l), e.pending = l, l = Gn(t), ko(t, null, a), l;
    }
    return Yn(t, e, l, a), Gn(t);
  }
  function Gu(t, l, a) {
    if (l = l.updateQueue, l !== null && (l = l.shared, (a & 4194048) !== 0)) {
      var e = l.lanes;
      e &= t.pendingLanes, a |= e, l.lanes = a, to(t, a);
    }
  }
  function Vc(t, l) {
    var a = t.updateQueue, e = t.alternate;
    if (e !== null && (e = e.updateQueue, a === e)) {
      var u = null, n = null;
      if (a = a.firstBaseUpdate, a !== null) {
        do {
          var i = {
            lane: a.lane,
            tag: a.tag,
            payload: a.payload,
            callback: null,
            next: null
          };
          n === null ? u = n = i : n = n.next = i, a = a.next;
        } while (a !== null);
        n === null ? u = n = l : n = n.next = l;
      } else u = n = l;
      a = {
        baseState: e.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: n,
        shared: e.shared,
        callbacks: e.callbacks
      }, t.updateQueue = a;
      return;
    }
    t = a.lastBaseUpdate, t === null ? a.firstBaseUpdate = l : t.next = l, a.lastBaseUpdate = l;
  }
  var Kc = !1;
  function Xu() {
    if (Kc) {
      var t = Ve;
      if (t !== null) throw t;
    }
  }
  function Qu(t, l, a, e) {
    Kc = !1;
    var u = t.updateQueue;
    Ba = !1;
    var n = u.firstBaseUpdate, i = u.lastBaseUpdate, c = u.shared.pending;
    if (c !== null) {
      u.shared.pending = null;
      var f = c, h = f.next;
      f.next = null, i === null ? n = h : i.next = h, i = f;
      var b = t.alternate;
      b !== null && (b = b.updateQueue, c = b.lastBaseUpdate, c !== i && (c === null ? b.firstBaseUpdate = h : c.next = h, b.lastBaseUpdate = f));
    }
    if (n !== null) {
      var N = u.baseState;
      i = 0, b = h = f = null, c = n;
      do {
        var v = c.lane & -536870913, S = v !== c.lane;
        if (S ? (at & v) === v : (e & v) === v) {
          v !== 0 && v === de && (Kc = !0), b !== null && (b = b.next = {
            lane: 0,
            tag: c.tag,
            payload: c.payload,
            callback: null,
            next: null
          });
          t: {
            var p = t, q = c;
            v = l;
            var I = a;
            switch (q.tag) {
              case 1:
                if (p = q.payload, typeof p == "function") {
                  N = p.call(I, N, v);
                  break t;
                }
                N = p;
                break t;
              case 3:
                p.flags = p.flags & -65537 | 128;
              case 0:
                if (p = q.payload, v = typeof p == "function" ? p.call(I, N, v) : p, v == null) break t;
                N = V({}, N, v);
                break t;
              case 2:
                Ba = !0;
            }
          }
          v = c.callback, v !== null && (t.flags |= 64, S && (t.flags |= 8192), S = u.callbacks, S === null ? u.callbacks = [v] : S.push(v));
        } else
          S = {
            lane: v,
            tag: c.tag,
            payload: c.payload,
            callback: c.callback,
            next: null
          }, b === null ? (h = b = S, f = N) : b = b.next = S, i |= v;
        if (c = c.next, c === null) {
          if (c = u.shared.pending, c === null)
            break;
          S = c, c = S.next, S.next = null, u.lastBaseUpdate = S, u.shared.pending = null;
        }
      } while (!0);
      b === null && (f = N), u.baseState = f, u.firstBaseUpdate = h, u.lastBaseUpdate = b, n === null && (u.shared.lanes = 0), Ka |= i, t.lanes = i, t.memoizedState = N;
    }
  }
  function yr(t, l) {
    if (typeof t != "function")
      throw Error(s(191, t));
    t.call(l);
  }
  function hr(t, l) {
    var a = t.callbacks;
    if (a !== null)
      for (t.callbacks = null, t = 0; t < a.length; t++)
        yr(a[t], l);
  }
  var Ga = cl(null), In = cl(0);
  function gr(t, l) {
    t = za, zt(In, t), zt(Ga, l), za = t | l.baseLanes;
  }
  function wc() {
    zt(In, za), zt(Ga, Ga.current);
  }
  function Jc() {
    za = In.current, Ft(Ga), Ft(In);
  }
  var It = cl(null), el = null;
  function Xa(t) {
    var l = t.alternate;
    zt(Pt, Pt.current & 1), zt(It, t), el === null && (l === null || Ga.current !== null || l.memoizedState !== null) && (el = t);
  }
  function $c(t) {
    zt(Pt, Pt.current), zt(It, t), el === null && (el = t);
  }
  function Sr(t) {
    t.tag === 22 ? (zt(Pt, Pt.current), zt(It, t), el === null && (el = t)) : Qa();
  }
  function Qa() {
    zt(Pt, Pt.current), zt(It, It.current);
  }
  function Nl(t) {
    Ft(It), el === t && (el = null), Ft(Pt);
  }
  var Pt = cl(0);
  function Lu(t, l) {
    zt(It, It.current), zt(Pt, l);
  }
  function Fc(t) {
    Ft(Pt), Ft(It), el === t && (el = null);
  }
  function Pn(t) {
    for (var l = t; l !== null; ) {
      if (l.tag === 13) {
        var a = l.memoizedState;
        if (a !== null && (a = a.dehydrated, a === null || Ss(a) || bs(a)))
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
  var ba = 0, k = null, St = null, qt = null, ti = !1, Je = !1, Se = !1, li = 0, Zu = 0, $e = null, Pv = 0;
  function Ct() {
    throw Error(s(321));
  }
  function Wc(t, l) {
    if (l === null) return !1;
    for (var a = 0; a < l.length && a < t.length; a++)
      if (!zl(t[a], l[a])) return !1;
    return !0;
  }
  function kc(t, l, a, e, u, n) {
    return ba = n, k = l, l.memoizedState = null, l.updateQueue = null, l.lanes = 0, O.H = t === null || t.memoizedState === null ? lm : am, Se = !1, n = a(e, u), Se = !1, Je && (n = Tr(
      l,
      a,
      e,
      u
    )), br(t), n;
  }
  function br(t) {
    O.H = fi;
    var l = St !== null && St.next !== null;
    if (ba = 0, qt = St = k = null, ti = !1, Zu = 0, $e = null, l) throw Error(s(300));
    t === null || Yt || (t = t.dependencies, t !== null && Kn(t) && (Yt = !0));
  }
  function Tr(t, l, a, e) {
    k = t;
    var u = 0;
    do {
      if (Je && ($e = null), Zu = 0, Je = !1, 25 <= u) throw Error(s(301));
      if (u += 1, qt = St = null, t.updateQueue != null) {
        var n = t.updateQueue;
        n.lastEffect = null, n.events = null, n.stores = null, n.memoCache != null && (n.memoCache.index = 0);
      }
      O.H = cy, n = l(a, e);
    } while (Je);
    return n;
  }
  function ty() {
    var t = O.H, l = t.useState()[0];
    return l = typeof l.then == "function" ? Vu(l) : l, t = t.useState()[0], (St !== null ? St.memoizedState : null) !== t && (k.flags |= 1024), l;
  }
  function Ic() {
    var t = li !== 0;
    return li = 0, t;
  }
  function Pc(t, l, a) {
    l.updateQueue = t.updateQueue, l.flags &= -2053, t.lanes &= ~a;
  }
  function tf(t) {
    if (ti) {
      for (t = t.memoizedState; t !== null; ) {
        var l = t.queue;
        l !== null && (l.pending = null), t = t.next;
      }
      ti = !1;
    }
    ba = 0, qt = St = k = null, Je = !1, Zu = li = 0, $e = null;
  }
  function sl() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return qt === null ? k.memoizedState = qt = t : qt = qt.next = t, qt;
  }
  function Ht() {
    if (St === null) {
      var t = k.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = St.next;
    var l = qt === null ? k.memoizedState : qt.next;
    if (l !== null)
      qt = l, St = t;
    else {
      if (t === null)
        throw k.alternate === null ? Error(s(467)) : Error(s(310));
      St = t, t = {
        memoizedState: St.memoizedState,
        baseState: St.baseState,
        baseQueue: St.baseQueue,
        queue: St.queue,
        next: null
      }, qt === null ? k.memoizedState = qt = t : qt = qt.next = t;
    }
    return qt;
  }
  function ai() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Vu(t) {
    var l = Zu;
    return Zu += 1, $e === null && ($e = []), t = or($e, t, l), l = k, (qt === null ? l.memoizedState : qt.next) === null && (l = l.alternate, O.H = l === null || l.memoizedState === null ? lm : am), t;
  }
  function ei(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return Vu(t);
      if (t.$$typeof === A) return;
      if (t.$$typeof === Rt) return kt(t);
    }
    throw Error(s(438, String(t)));
  }
  function lf(t) {
    var l = null, a = k.updateQueue;
    if (a !== null && (l = a.memoCache), l == null) {
      var e = k.alternate;
      e !== null && (e = e.updateQueue, e !== null && (e = e.memoCache, e != null && (l = {
        data: e.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (l == null && (l = { data: [], index: 0 }), a === null && (a = ai(), k.updateQueue = a), a.memoCache = l, a = l.data[l.index], a === void 0)
      for (a = l.data[l.index] = Array(t), e = 0; e < t; e++)
        a[e] = Cl;
    return l.index++, a;
  }
  function Ta(t, l) {
    return typeof l == "function" ? l(t) : l;
  }
  function ui(t) {
    var l = Ht();
    return af(l, St, t);
  }
  function af(t, l, a) {
    var e = t.queue;
    if (e === null) throw Error(s(311));
    e.lastRenderedReducer = a;
    var u = t.baseQueue, n = e.pending;
    if (n !== null) {
      if (u !== null) {
        var i = u.next;
        u.next = n.next, n.next = i;
      }
      l.baseQueue = u = n, e.pending = null;
    }
    if (n = t.baseState, u === null) t.memoizedState = n;
    else {
      l = u.next;
      var c = i = null, f = null, h = l, b = !1;
      do {
        var N = h.lane & -536870913;
        if (N !== h.lane ? (at & N) === N : (ba & N) === N) {
          var v = h.revertLane;
          if (v === 0)
            f !== null && (f = f.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: h.action,
              hasEagerState: h.hasEagerState,
              eagerState: h.eagerState,
              next: null
            }), N === de && (b = !0);
          else if ((ba & v) === v) {
            h = h.next, v === de && (b = !0);
            continue;
          } else
            N = {
              lane: 0,
              revertLane: h.revertLane,
              gesture: null,
              action: h.action,
              hasEagerState: h.hasEagerState,
              eagerState: h.eagerState,
              next: null
            }, f === null ? (c = f = N, i = n) : f = f.next = N, k.lanes |= v, Ka |= v;
          N = h.action, Se && a(n, N), n = h.hasEagerState ? h.eagerState : a(n, N);
        } else
          v = {
            lane: N,
            revertLane: h.revertLane,
            gesture: h.gesture,
            action: h.action,
            hasEagerState: h.hasEagerState,
            eagerState: h.eagerState,
            next: null
          }, f === null ? (c = f = v, i = n) : f = f.next = v, k.lanes |= N, Ka |= N;
        h = h.next;
      } while (h !== null && h !== l);
      if (f === null ? i = n : f.next = c, !zl(n, t.memoizedState) && (Yt = !0, b && (a = Ve, a !== null)))
        throw a;
      t.memoizedState = n, t.baseState = i, t.baseQueue = f, e.lastRenderedState = n;
    }
    return u === null && (e.lanes = 0), [t.memoizedState, e.dispatch];
  }
  function ef(t) {
    var l = Ht(), a = l.queue;
    if (a === null) throw Error(s(311));
    a.lastRenderedReducer = t;
    var e = a.dispatch, u = a.pending, n = l.memoizedState;
    if (u !== null) {
      a.pending = null;
      var i = u = u.next;
      do
        n = t(n, i.action), i = i.next;
      while (i !== u);
      zl(n, l.memoizedState) || (Yt = !0), l.memoizedState = n, l.baseQueue === null && (l.baseState = n), a.lastRenderedState = n;
    }
    return [n, e];
  }
  function Er(t, l, a) {
    var e = k, u = Ht(), n = P;
    if (n) {
      if (a === void 0) throw Error(s(407));
      a = a();
    } else a = l();
    var i = !zl(
      (St || u).memoizedState,
      a
    );
    if (i && (u.memoizedState = a, Yt = !0), u = u.queue, cf(Nr.bind(null, e, u, t), [
      t
    ]), t = u.getSnapshot !== l || i || qt !== null && (qt.memoizedState.tag & 1) !== 0, Fe(
      t ? 9 : 8,
      { destroy: void 0 },
      zr.bind(null, e, u, a, l),
      null
    ), t) {
      if (e.flags |= 2048, Tt === null) throw Error(s(349));
      n || (ba & 127) !== 0 || _r(e, l, a);
    }
    return a;
  }
  function _r(t, l, a) {
    t.flags |= 16384, t = { getSnapshot: l, value: a }, l = k.updateQueue, l === null ? (l = ai(), k.updateQueue = l, l.stores = [t]) : (a = l.stores, a === null ? l.stores = [t] : a.push(t));
  }
  function zr(t, l, a, e) {
    l.value = a, l.getSnapshot = e, Or(l) && Ar(t);
  }
  function Nr(t, l, a) {
    return a(function() {
      Or(l) && Ar(t);
    });
  }
  function Or(t) {
    var l = t.getSnapshot;
    t = t.value;
    try {
      var a = l();
      return !zl(t, a);
    } catch {
      return !0;
    }
  }
  function Ar(t) {
    var l = ce(t, 2);
    l !== null && gl(l, t, 2);
  }
  function uf(t) {
    var l = sl();
    if (typeof t == "function") {
      var a = t;
      if (t = a(), Se) {
        pa(!0);
        try {
          a();
        } finally {
          pa(!1);
        }
      }
    }
    return l.memoizedState = l.baseState = t, l.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ta,
      lastRenderedState: t
    }, l;
  }
  function Mr(t, l, a, e) {
    return t.baseState = a, af(
      t,
      St,
      typeof e == "function" ? e : Ta
    );
  }
  function ly(t, l, a, e, u) {
    if (ci(t)) throw Error(s(485));
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
      O.T !== null ? a(!0) : n.isTransition = !1, e(n), a = l.pending, a === null ? (n.next = l.pending = n, pr(l, n)) : (n.next = a.next, l.pending = a.next = n);
    }
  }
  function pr(t, l) {
    var a = l.action, e = l.payload, u = t.state;
    if (l.isTransition) {
      var n = O.T, i = {};
      i.types = n !== null ? n.types : null, O.T = i;
      try {
        var c = a(u, e), f = O.S;
        f !== null && f(i, c), Dr(t, l, c);
      } catch (h) {
        nf(t, l, h);
      } finally {
        n !== null && i.types !== null && (n.types = i.types), O.T = n;
      }
    } else
      try {
        n = a(u, e), Dr(t, l, n);
      } catch (h) {
        nf(t, l, h);
      }
  }
  function Dr(t, l, a) {
    a !== null && typeof a == "object" && typeof a.then == "function" ? a.then(
      function(e) {
        Cr(t, l, e);
      },
      function(e) {
        return nf(t, l, e);
      }
    ) : Cr(t, l, a);
  }
  function Cr(t, l, a) {
    l.status = "fulfilled", l.value = a, Ur(l), t.state = a, l = t.pending, l !== null && (a = l.next, a === l ? t.pending = null : (a = a.next, l.next = a, pr(t, a)));
  }
  function nf(t, l, a) {
    var e = t.pending;
    if (t.pending = null, e !== null) {
      e = e.next;
      do
        l.status = "rejected", l.reason = a, Ur(l), l = l.next;
      while (l !== e);
    }
    t.action = null;
  }
  function Ur(t) {
    t = t.listeners;
    for (var l = 0; l < t.length; l++) (0, t[l])();
  }
  function Rr(t, l) {
    return l;
  }
  function Hr(t, l) {
    if (P) {
      var a = Tt.formState;
      if (a !== null) {
        t: {
          var e = k;
          if (P) {
            if (Nt) {
              l: {
                for (var u = Nt, n = ql; u.nodeType !== 8; ) {
                  if (!n) {
                    u = null;
                    break l;
                  }
                  if (u = Gl(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break l;
                  }
                }
                n = u.data, u = n === "F!" || n === "F" ? u : null;
              }
              if (u) {
                Nt = Gl(
                  u.nextSibling
                ), e = u.data === "F!";
                break t;
              }
            }
            Ha(e);
          }
          e = !1;
        }
        e && (l = a[0]);
      }
    }
    return a = sl(), a.memoizedState = a.baseState = l, e = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Rr,
      lastRenderedState: l
    }, a.queue = e, a = Ir.bind(
      null,
      k,
      e
    ), e.dispatch = a, e = uf(!1), n = mf.bind(
      null,
      k,
      !1,
      e.queue
    ), e = sl(), u = {
      state: l,
      dispatch: null,
      action: t,
      pending: null
    }, e.queue = u, a = ly.bind(
      null,
      k,
      u,
      n,
      a
    ), u.dispatch = a, e.memoizedState = t, [l, a, !1];
  }
  function xr(t) {
    var l = Ht();
    return jr(l, St, t);
  }
  function jr(t, l, a) {
    if (l = af(
      t,
      l,
      Rr
    )[0], t = ui(Ta)[0], typeof l == "object" && l !== null && typeof l.then == "function")
      try {
        var e = Vu(l);
      } catch (i) {
        throw i === Ke ? $n : i;
      }
    else e = l;
    l = Ht();
    var u = l.queue, n = u.dispatch;
    return a !== l.memoizedState && (k.flags |= 2048, Fe(
      9,
      { destroy: void 0 },
      ay.bind(null, u, a),
      null
    )), [e, n, t];
  }
  function ay(t, l) {
    t.action = l;
  }
  function Br(t) {
    var l = Ht(), a = St;
    if (a !== null)
      return jr(l, a, t);
    Ht(), l = l.memoizedState, a = Ht();
    var e = a.queue.dispatch;
    return a.memoizedState = t, [l, e, !1];
  }
  function Fe(t, l, a, e) {
    return t = { tag: t, create: a, deps: e, inst: l, next: null }, l = k.updateQueue, l === null && (l = ai(), k.updateQueue = l), a = l.lastEffect, a === null ? l.lastEffect = t.next = t : (e = a.next, a.next = t, t.next = e, l.lastEffect = t), t;
  }
  function qr() {
    return Ht().memoizedState;
  }
  function ni(t, l, a, e) {
    var u = sl();
    k.flags |= t, u.memoizedState = Fe(
      1 | l,
      { destroy: void 0 },
      a,
      e === void 0 ? null : e
    );
  }
  function ii(t, l, a, e) {
    var u = Ht();
    e = e === void 0 ? null : e;
    var n = u.memoizedState.inst;
    St !== null && e !== null && Wc(e, St.memoizedState.deps) ? u.memoizedState = Fe(l, n, a, e) : (k.flags |= t, u.memoizedState = Fe(
      1 | l,
      n,
      a,
      e
    ));
  }
  function Yr(t, l) {
    ni(8390656, 8, t, l);
  }
  function cf(t, l) {
    ii(2048, 8, t, l);
  }
  function ey(t) {
    k.flags |= 4;
    var l = k.updateQueue;
    if (l === null)
      l = ai(), k.updateQueue = l, l.events = [t];
    else {
      var a = l.events;
      a === null ? l.events = [t] : a.push(t);
    }
  }
  function Gr(t) {
    var l = Ht().memoizedState;
    return ey({ ref: l, nextImpl: t }), function() {
      if ((rt & 2) !== 0) throw Error(s(440));
      return l.impl.apply(void 0, arguments);
    };
  }
  function Xr(t, l) {
    return ii(4, 2, t, l);
  }
  function Qr(t, l) {
    return ii(4, 4, t, l);
  }
  function Lr(t, l) {
    if (typeof l == "function") {
      t = t();
      var a = l(t);
      return function() {
        typeof a == "function" ? a() : l(null);
      };
    }
    if (l != null)
      return t = t(), l.current = t, function() {
        l.current = null;
      };
  }
  function Zr(t, l, a) {
    a = a != null ? a.concat([t]) : null, ii(4, 4, Lr.bind(null, l, t), a);
  }
  function ff() {
  }
  function Vr(t, l) {
    var a = Ht();
    l = l === void 0 ? null : l;
    var e = a.memoizedState;
    return l !== null && Wc(l, e[1]) ? e[0] : (a.memoizedState = [t, l], t);
  }
  function Kr(t, l) {
    var a = Ht();
    l = l === void 0 ? null : l;
    var e = a.memoizedState;
    if (l !== null && Wc(l, e[1]))
      return e[0];
    if (e = t(), Se) {
      pa(!0);
      try {
        t();
      } finally {
        pa(!1);
      }
    }
    return a.memoizedState = [e, l], e;
  }
  function sf(t, l, a) {
    return a === void 0 || (ba & 1073741824) !== 0 && (at & 261930) === 0 ? t.memoizedState = l : (t.memoizedState = a, t = l0(), k.lanes |= t, Ka |= t, a);
  }
  function wr(t, l, a, e) {
    return zl(a, l) ? a : Ga.current !== null ? (t = sf(t, a, e), zl(t, l) || (Yt = !0), t) : (ba & 106) === 0 || (ba & 1073741824) !== 0 && (at & 261930) === 0 ? (Yt = !0, t.memoizedState = a) : (t = l0(), k.lanes |= t, Ka |= t, l);
  }
  function Jr(t, l, a, e, u) {
    var n = U.p;
    U.p = n !== 0 && 8 > n ? n : 8;
    var i = O.T, c = {};
    c.types = i !== null ? i.types : null, O.T = c, mf(t, !1, l, a);
    try {
      var f = u(), h = O.S;
      if (h !== null && h(c, f), f !== null && typeof f == "object" && typeof f.then == "function") {
        var b = Iv(
          f,
          e
        );
        Ku(
          t,
          l,
          b,
          pl(t)
        );
      } else
        Ku(
          t,
          l,
          e,
          pl(t)
        );
    } catch (N) {
      Ku(
        t,
        l,
        { then: function() {
        }, status: "rejected", reason: N },
        pl()
      );
    } finally {
      U.p = n, i !== null && c.types !== null && (i.types = c.types), O.T = i;
    }
  }
  function uy() {
  }
  function of(t, l, a, e) {
    if (t.tag !== 5) throw Error(s(476));
    var u = $r(t).queue;
    Jr(
      t,
      u,
      l,
      jt,
      a === null ? uy : function() {
        return Fr(t), a(e);
      }
    );
  }
  function $r(t) {
    var l = t.memoizedState;
    if (l !== null) return l;
    l = {
      memoizedState: jt,
      baseState: jt,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ta,
        lastRenderedState: jt
      },
      next: null
    };
    var a = {};
    return l.next = {
      memoizedState: a,
      baseState: a,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ta,
        lastRenderedState: a
      },
      next: null
    }, t.memoizedState = l, t = t.alternate, t !== null && (t.memoizedState = l), l;
  }
  function Fr(t) {
    var l = $r(t);
    l.next === null && (l = t.alternate.memoizedState), Ku(
      t,
      l.next.queue,
      {},
      pl()
    );
  }
  function rf() {
    return kt(vu);
  }
  function Wr() {
    return Ht().memoizedState;
  }
  function kr() {
    return Ht().memoizedState;
  }
  function ny(t) {
    for (var l = t.return; l !== null; ) {
      switch (l.tag) {
        case 24:
        case 3:
          var a = pl();
          t = qa(a);
          var e = Ya(l, t, a);
          e !== null && (gl(e, l, a), Gu(e, l, a)), l = { cache: Yc() }, t.payload = l;
          return;
      }
      l = l.return;
    }
  }
  function iy(t, l, a) {
    var e = pl();
    a = {
      lane: e,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, ci(t) ? Pr(l, a) : (a = Dc(t, l, a, e), a !== null && (gl(a, t, e), tm(a, l, e)));
  }
  function Ir(t, l, a) {
    var e = pl();
    Ku(t, l, a, e);
  }
  function Ku(t, l, a, e) {
    var u = {
      lane: e,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (ci(t)) Pr(l, u);
    else {
      var n = t.alternate;
      if (t.lanes === 0 && (n === null || n.lanes === 0) && (n = l.lastRenderedReducer, n !== null))
        try {
          var i = l.lastRenderedState, c = n(i, a);
          if (u.hasEagerState = !0, u.eagerState = c, zl(c, i))
            return Yn(t, l, u, 0), Tt === null && qn(), !1;
        } catch {
        }
      if (a = Dc(t, l, u, e), a !== null)
        return gl(a, t, e), tm(a, l, e), !0;
    }
    return !1;
  }
  function mf(t, l, a, e) {
    if (e = {
      lane: 2,
      revertLane: as(),
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, ci(t)) {
      if (l) throw Error(s(479));
    } else
      l = Dc(
        t,
        a,
        e,
        2
      ), l !== null && gl(l, t, 2);
  }
  function ci(t) {
    var l = t.alternate;
    return t === k || l !== null && l === k;
  }
  function Pr(t, l) {
    Je = ti = !0;
    var a = t.pending;
    a === null ? l.next = l : (l.next = a.next, a.next = l), t.pending = l;
  }
  function tm(t, l, a) {
    if ((a & 4194048) !== 0) {
      var e = l.lanes;
      e &= t.pendingLanes, a |= e, l.lanes = a, to(t, a);
    }
  }
  var fi = {
    readContext: kt,
    use: ei,
    useCallback: Ct,
    useContext: Ct,
    useEffect: Ct,
    useImperativeHandle: Ct,
    useLayoutEffect: Ct,
    useInsertionEffect: Ct,
    useMemo: Ct,
    useReducer: Ct,
    useRef: Ct,
    useState: Ct,
    useDebugValue: Ct,
    useDeferredValue: Ct,
    useTransition: Ct,
    useSyncExternalStore: Ct,
    useId: Ct,
    useHostTransitionStatus: Ct,
    useFormState: Ct,
    useActionState: Ct,
    useOptimistic: Ct,
    useMemoCache: Ct,
    useCacheRefresh: Ct,
    useEffectEvent: Ct
  }, lm = {
    readContext: kt,
    use: ei,
    useCallback: function(t, l) {
      return sl().memoizedState = [
        t,
        l === void 0 ? null : l
      ], t;
    },
    useContext: kt,
    useEffect: Yr,
    useImperativeHandle: function(t, l, a) {
      a = a != null ? a.concat([t]) : null, ni(
        4194308,
        4,
        Lr.bind(null, l, t),
        a
      );
    },
    useLayoutEffect: function(t, l) {
      return ni(4194308, 4, t, l);
    },
    useInsertionEffect: function(t, l) {
      ni(4, 2, t, l);
    },
    useMemo: function(t, l) {
      var a = sl();
      l = l === void 0 ? null : l;
      var e = t();
      if (Se) {
        pa(!0);
        try {
          t();
        } finally {
          pa(!1);
        }
      }
      return a.memoizedState = [e, l], e;
    },
    useReducer: function(t, l, a) {
      var e = sl();
      if (a !== void 0) {
        var u = a(l);
        if (Se) {
          pa(!0);
          try {
            a(l);
          } finally {
            pa(!1);
          }
        }
      } else u = l;
      return e.memoizedState = e.baseState = u, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: u
      }, e.queue = t, t = t.dispatch = iy.bind(
        null,
        k,
        t
      ), [e.memoizedState, t];
    },
    useRef: function(t) {
      var l = sl();
      return t = { current: t }, l.memoizedState = t;
    },
    useState: function(t) {
      t = uf(t);
      var l = t.queue, a = Ir.bind(null, k, l);
      return l.dispatch = a, [t.memoizedState, a];
    },
    useDebugValue: ff,
    useDeferredValue: function(t, l) {
      var a = sl();
      return sf(a, t, l);
    },
    useTransition: function() {
      var t = uf(!1);
      return t = Jr.bind(
        null,
        k,
        t.queue,
        !0,
        !1
      ), sl().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, l, a) {
      var e = k, u = sl();
      if (P) {
        if (a === void 0)
          throw Error(s(407));
        a = a();
      } else {
        if (a = l(), Tt === null)
          throw Error(s(349));
        (at & 127) !== 0 || _r(e, l, a);
      }
      u.memoizedState = a;
      var n = { value: a, getSnapshot: l };
      return u.queue = n, Yr(Nr.bind(null, e, n, t), [
        t
      ]), e.flags |= 2048, Fe(
        9,
        { destroy: void 0 },
        zr.bind(
          null,
          e,
          n,
          a,
          l
        ),
        null
      ), a;
    },
    useId: function() {
      var t = sl(), l = Tt.identifierPrefix;
      if (P) {
        var a = ta, e = Pl;
        a = (e & ~(1 << 32 - El(e) - 1)).toString(32) + a, l = "_" + l + "R_" + a, a = li++, 0 < a && (l += "H" + a.toString(32)), l += "_";
      } else
        a = Pv++, l = "_" + l + "r_" + a.toString(32) + "_";
      return t.memoizedState = l;
    },
    useHostTransitionStatus: rf,
    useFormState: Hr,
    useActionState: Hr,
    useOptimistic: function(t) {
      var l = sl();
      l.memoizedState = l.baseState = t;
      var a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return l.queue = a, l = mf.bind(
        null,
        k,
        !0,
        a
      ), a.dispatch = l, [t, l];
    },
    useMemoCache: lf,
    useCacheRefresh: function() {
      return sl().memoizedState = ny.bind(
        null,
        k
      );
    },
    useEffectEvent: function(t) {
      var l = sl(), a = { impl: t };
      return l.memoizedState = a, function() {
        if ((rt & 2) !== 0)
          throw Error(s(440));
        return a.impl.apply(void 0, arguments);
      };
    }
  }, am = {
    readContext: kt,
    use: ei,
    useCallback: Vr,
    useContext: kt,
    useEffect: cf,
    useImperativeHandle: Zr,
    useInsertionEffect: Xr,
    useLayoutEffect: Qr,
    useMemo: Kr,
    useReducer: ui,
    useRef: qr,
    useState: function() {
      return ui(Ta);
    },
    useDebugValue: ff,
    useDeferredValue: function(t, l) {
      var a = Ht();
      return wr(
        a,
        St.memoizedState,
        t,
        l
      );
    },
    useTransition: function() {
      var t = ui(Ta)[0], l = Ht().memoizedState;
      return [
        typeof t == "boolean" ? t : Vu(t),
        l
      ];
    },
    useSyncExternalStore: Er,
    useId: Wr,
    useHostTransitionStatus: rf,
    useFormState: xr,
    useActionState: xr,
    useOptimistic: function(t, l) {
      var a = Ht();
      return Mr(a, St, t, l);
    },
    useMemoCache: lf,
    useCacheRefresh: kr,
    useEffectEvent: Gr
  }, cy = {
    readContext: kt,
    use: ei,
    useCallback: Vr,
    useContext: kt,
    useEffect: cf,
    useImperativeHandle: Zr,
    useInsertionEffect: Xr,
    useLayoutEffect: Qr,
    useMemo: Kr,
    useReducer: ef,
    useRef: qr,
    useState: function() {
      return ef(Ta);
    },
    useDebugValue: ff,
    useDeferredValue: function(t, l) {
      var a = Ht();
      return St === null ? sf(a, t, l) : wr(
        a,
        St.memoizedState,
        t,
        l
      );
    },
    useTransition: function() {
      var t = ef(Ta)[0], l = Ht().memoizedState;
      return [
        typeof t == "boolean" ? t : Vu(t),
        l
      ];
    },
    useSyncExternalStore: Er,
    useId: Wr,
    useHostTransitionStatus: rf,
    useFormState: Br,
    useActionState: Br,
    useOptimistic: function(t, l) {
      var a = Ht();
      return St !== null ? Mr(a, St, t, l) : (a.baseState = t, [t, a.queue.dispatch]);
    },
    useMemoCache: lf,
    useCacheRefresh: kr,
    useEffectEvent: Gr
  };
  function df(t, l, a, e) {
    l = t.memoizedState, a = a(e, l), a = a == null ? l : V({}, l, a), t.memoizedState = a, t.lanes === 0 && (t.updateQueue.baseState = a);
  }
  var vf = {
    enqueueSetState: function(t, l, a) {
      t = t._reactInternals;
      var e = pl(), u = qa(e);
      u.payload = l, a != null && (u.callback = a), l = Ya(t, u, e), l !== null && (gl(l, t, e), Gu(l, t, e));
    },
    enqueueReplaceState: function(t, l, a) {
      t = t._reactInternals;
      var e = pl(), u = qa(e);
      u.tag = 1, u.payload = l, a != null && (u.callback = a), l = Ya(t, u, e), l !== null && (gl(l, t, e), Gu(l, t, e));
    },
    enqueueForceUpdate: function(t, l) {
      t = t._reactInternals;
      var a = pl(), e = qa(a);
      e.tag = 2, l != null && (e.callback = l), l = Ya(t, e, a), l !== null && (gl(l, t, a), Gu(l, t, a));
    }
  };
  function em(t, l, a, e, u, n, i) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(e, n, i) : l.prototype && l.prototype.isPureReactComponent ? !Uu(a, e) || !Uu(u, n) : !0;
  }
  function um(t, l, a, e) {
    t = l.state, typeof l.componentWillReceiveProps == "function" && l.componentWillReceiveProps(a, e), typeof l.UNSAFE_componentWillReceiveProps == "function" && l.UNSAFE_componentWillReceiveProps(a, e), l.state !== t && vf.enqueueReplaceState(l, l.state, null);
  }
  function be(t, l) {
    var a = l;
    if ("ref" in l) {
      a = {};
      for (var e in l)
        e !== "ref" && (a[e] = l[e]);
    }
    if (t = t.defaultProps) {
      a === l && (a = V({}, a));
      for (var u in t)
        a[u] === void 0 && (a[u] = t[u]);
    }
    return a;
  }
  function nm(t) {
    Bn(t);
  }
  function im(t) {
    console.error(t);
  }
  function cm(t) {
    Bn(t);
  }
  function si(t, l) {
    try {
      var a = t.onUncaughtError;
      a(l.value, { componentStack: l.stack });
    } catch (e) {
      setTimeout(function() {
        throw e;
      });
    }
  }
  function fm(t, l, a) {
    try {
      var e = t.onCaughtError;
      e(a.value, {
        componentStack: a.stack,
        errorBoundary: l.tag === 1 ? l.stateNode : null
      });
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  function yf(t, l, a) {
    return a = qa(a), a.tag = 3, a.payload = { element: null }, a.callback = function() {
      si(t, l);
    }, a;
  }
  function sm(t) {
    return t = qa(t), t.tag = 3, t;
  }
  function om(t, l, a, e) {
    var u = a.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var n = e.value;
      t.payload = function() {
        return u(n);
      }, t.callback = function() {
        fm(l, a, e);
      };
    }
    var i = a.stateNode;
    i !== null && typeof i.componentDidCatch == "function" && (t.callback = function() {
      fm(l, a, e), typeof u != "function" && (wa === null ? wa = /* @__PURE__ */ new Set([this]) : wa.add(this));
      var c = e.stack;
      this.componentDidCatch(e.value, {
        componentStack: c !== null ? c : ""
      });
    });
  }
  function fy(t, l, a, e, u) {
    if (a.flags |= 32768, e !== null && typeof e == "object" && typeof e.then == "function") {
      if (l = a.alternate, l !== null && re(
        l,
        a,
        u,
        !0
      ), a = It.current, a !== null) {
        switch (a.tag) {
          case 31:
          case 13:
          case 19:
            return el === null ? Ci() : a.alternate === null && Ut === 0 && (Ut = 3), a.flags &= -257, a.flags |= 65536, a.lanes = u, e === Fn ? a.flags |= 16384 : (l = a.updateQueue, l === null ? a.updateQueue = /* @__PURE__ */ new Set([e]) : l.add(e), Pf(t, e, u)), !1;
          case 22:
            return a.flags |= 65536, e === Fn ? a.flags |= 16384 : (l = a.updateQueue, l === null ? (l = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([e])
            }, a.updateQueue = l) : (a = l.retryQueue, a === null ? l.retryQueue = /* @__PURE__ */ new Set([e]) : a.add(e)), Pf(t, e, u)), !1;
        }
        throw Error(s(435, a.tag));
      }
      return Pf(t, e, u), Ci(), !1;
    }
    if (P)
      return l = It.current, l !== null ? ((l.flags & 65536) === 0 && (l.flags |= 256), l.flags |= 65536, l.lanes = u, e !== xc && (t = Error(s(422), { cause: e }), xu(xl(t, a)))) : (e !== xc && (l = Error(s(423), {
        cause: e
      }), xu(
        xl(l, a)
      )), t = t.current.alternate, t.flags |= 65536, u &= -u, t.lanes |= u, e = xl(e, a), u = yf(
        t.stateNode,
        e,
        u
      ), Vc(t, u), Ut !== 4 && (Ut = 2)), !1;
    var n = Error(s(520), { cause: e });
    if (n = xl(n, a), Pu === null ? Pu = [n] : Pu.push(n), Ut !== 4 && (Ut = 2), l === null) return !0;
    e = xl(e, a), a = l;
    do {
      switch (a.tag) {
        case 3:
          return a.flags |= 65536, t = u & -u, a.lanes |= t, t = yf(a.stateNode, e, t), Vc(a, t), !1;
        case 1:
          if (l = a.type, n = a.stateNode, (a.flags & 128) === 0 && (typeof l.getDerivedStateFromError == "function" || n !== null && typeof n.componentDidCatch == "function" && (wa === null || !wa.has(n))))
            return a.flags |= 65536, u &= -u, a.lanes |= u, u = sm(u), om(
              u,
              t,
              a,
              e
            ), Vc(a, u), !1;
          break;
        case 22:
          if (a.memoizedState !== null)
            return a.flags |= 65536, !1;
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var hf = Error(s(461)), Yt = !1;
  function Zt(t, l, a, e) {
    l.child = t === null ? vr(l, null, a, e) : ge(
      l,
      t.child,
      a,
      e
    );
  }
  function rm(t, l, a, e, u) {
    a = a.render;
    var n = l.ref;
    if ("ref" in e) {
      var i = {};
      for (var c in e)
        c !== "ref" && (i[c] = e[c]);
    } else i = e;
    return me(l), e = kc(
      t,
      l,
      a,
      i,
      n,
      u
    ), c = Ic(), t !== null && !Yt ? (Pc(t, l, u), Ea(t, l, u)) : (P && c && Ln(l), l.flags |= 1, Zt(t, l, e, u), l.child);
  }
  function mm(t, l, a, e, u) {
    if (t === null) {
      var n = a.type;
      return typeof n == "function" && !Cc(n) && n.defaultProps === void 0 && a.compare === null ? (l.tag = 15, l.type = n, dm(
        t,
        l,
        n,
        e,
        u
      )) : (t = Xn(
        a.type,
        null,
        e,
        l,
        l.mode,
        u
      ), t.ref = l.ref, t.return = l, l.child = t);
    }
    if (n = t.child, !Nf(t, u)) {
      var i = n.memoizedProps;
      if (a = a.compare, a = a !== null ? a : Uu, a(i, e) && t.ref === l.ref)
        return Ea(t, l, u);
    }
    return l.flags |= 1, t = ya(n, e), t.ref = l.ref, t.return = l, l.child = t;
  }
  function dm(t, l, a, e, u) {
    if (t !== null) {
      var n = t.memoizedProps;
      if (Uu(n, e) && t.ref === l.ref)
        if (Yt = !1, l.pendingProps = e = n, Nf(t, u))
          (t.flags & 131072) !== 0 && (Yt = !0);
        else
          return l.lanes = t.lanes, Ea(t, l, u);
    }
    return gf(
      t,
      l,
      a,
      e,
      u
    );
  }
  function vm(t, l, a, e) {
    var u = e.children, n = t !== null ? t.memoizedState : null;
    if (t === null && l.stateNode === null && (l.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), e.mode === "hidden") {
      if ((l.flags & 128) !== 0) {
        if (n = n !== null ? n.baseLanes | a : a, t !== null) {
          for (e = l.child = t.child, u = 0; e !== null; )
            u = u | e.lanes | e.childLanes, e = e.sibling;
          e = u & ~n;
        } else e = 0, l.child = null;
        return ym(
          t,
          l,
          n,
          a,
          e
        );
      }
      if ((a & 536870912) !== 0)
        l.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Jn(
          l,
          n !== null ? n.cachePool : null
        ), n !== null ? gr(l, n) : wc(), Sr(l);
      else
        return e = l.lanes = 536870912, ym(
          t,
          l,
          n !== null ? n.baseLanes | a : a,
          a,
          e
        );
    } else
      n !== null ? (Jn(l, n.cachePool), gr(l, n), Qa(), l.memoizedState = null) : (t !== null && Jn(l, null), wc(), Qa());
    return Zt(t, l, u, a), l.child;
  }
  function wu(t, l) {
    return t !== null && t.tag === 22 || l.stateNode !== null || (l.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.sibling;
  }
  function ym(t, l, a, e, u) {
    var n = Xc();
    return n = n === null ? null : { parent: Bt._currentValue, pool: n }, l.memoizedState = {
      baseLanes: a,
      cachePool: n
    }, t !== null && Jn(l, null), wc(), Sr(l), t !== null && re(t, l, e, !0), l.childLanes = u, null;
  }
  function oi(t, l) {
    return l = ri(
      { mode: l.mode, children: l.children },
      t.mode
    ), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function hm(t, l, a) {
    return ge(l, t.child, null, a), t = oi(l, l.pendingProps), t.flags |= 2, Nl(l), l.memoizedState = null, t;
  }
  function sy(t, l, a) {
    var e = l.pendingProps, u = (l.flags & 128) !== 0;
    if (l.flags &= -129, t === null) {
      if (P) {
        if (e.mode === "hidden")
          return t = oi(l, e), l.lanes = 536870912, t.memoizedState = { baseLanes: 0, cachePool: null }, wu(null, t);
        if ($c(l), (t = Nt) ? (t = L0(
          t,
          ql
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: Ua !== null ? { id: Pl, overflow: ta } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, a = Po(t), a.return = l, l.child = a, wt = l, Nt = null)) : t = null, t === null) throw Ha(l);
        return l.lanes = 536870912, null;
      }
      return oi(l, e);
    }
    var n = t.memoizedState;
    if (n !== null) {
      var i = n.dehydrated;
      if ($c(l), u)
        if (l.flags & 256)
          l.flags &= -257, l = hm(
            t,
            l,
            a
          );
        else if (l.memoizedState !== null)
          l.child = t.child, l.flags |= 128, l = null;
        else throw Error(s(558));
      else if (Yt || re(t, l, a, !1), u = (a & t.childLanes) !== 0, Yt || u) {
        if (Ga.current === null) {
          if (e = Tt, e !== null && (i = lo(e, a), i !== 0 && i !== n.retryLane))
            throw n.retryLane = i, ce(t, i), gl(e, t, i), hf;
          Ci();
        }
        l = hm(
          t,
          l,
          a
        );
      } else
        t = n.treeContext, Nt = Gl(i.nextSibling), wt = l, P = !0, Ra = null, ql = !1, t !== null && ar(l, t), l = oi(l, e), l.flags |= 134221824;
      return l;
    }
    return t = ya(t.child, {
      mode: e.mode,
      children: e.children
    }), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function We(t, l) {
    var a = l.ref;
    if (a === null)
      t !== null && t.ref !== null && (l.flags |= 4194816);
    else {
      if (typeof a != "function" && typeof a != "object")
        throw Error(s(284));
      (t === null || t.ref !== a) && (l.flags |= 4194816);
    }
  }
  function gf(t, l, a, e, u) {
    return me(l), a = kc(
      t,
      l,
      a,
      e,
      void 0,
      u
    ), e = Ic(), t !== null && !Yt ? (Pc(t, l, u), Ea(t, l, u)) : (P && e && Ln(l), l.flags |= 1, Zt(t, l, a, u), l.child);
  }
  function gm(t, l, a, e, u, n) {
    return me(l), l.updateQueue = null, a = Tr(
      l,
      e,
      a,
      u
    ), br(t), e = Ic(), t !== null && !Yt ? (Pc(t, l, n), Ea(t, l, n)) : (P && e && Ln(l), l.flags |= 1, Zt(t, l, a, n), l.child);
  }
  function Sm(t, l, a, e, u) {
    if (me(l), l.stateNode === null) {
      var n = Xe, i = a.contextType;
      typeof i == "object" && i !== null && (n = kt(i)), n = new a(e, n), l.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = vf, l.stateNode = n, n._reactInternals = l, n = l.stateNode, n.props = e, n.state = l.memoizedState, n.refs = {}, Lc(l), i = a.contextType, n.context = typeof i == "object" && i !== null ? kt(i) : Xe, n.state = l.memoizedState, i = a.getDerivedStateFromProps, typeof i == "function" && (df(
        l,
        a,
        i,
        e
      ), n.state = l.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof n.getSnapshotBeforeUpdate == "function" || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (i = n.state, typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(), i !== n.state && vf.enqueueReplaceState(n, n.state, null), Qu(l, e, n, u), Xu(), n.state = l.memoizedState), typeof n.componentDidMount == "function" && (l.flags |= 4194308), e = !0;
    } else if (t === null) {
      n = l.stateNode;
      var c = l.memoizedProps, f = be(a, c);
      n.props = f;
      var h = n.context, b = a.contextType;
      i = Xe, typeof b == "object" && b !== null && (i = kt(b));
      var N = a.getDerivedStateFromProps;
      b = typeof N == "function" || typeof n.getSnapshotBeforeUpdate == "function", c = l.pendingProps !== c, b || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (c || h !== i) && um(
        l,
        n,
        e,
        i
      ), Ba = !1;
      var v = l.memoizedState;
      n.state = v, Qu(l, e, n, u), Xu(), h = l.memoizedState, c || v !== h || Ba ? (typeof N == "function" && (df(
        l,
        a,
        N,
        e
      ), h = l.memoizedState), (f = Ba || em(
        l,
        a,
        f,
        e,
        v,
        h,
        i
      )) ? (b || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount()), typeof n.componentDidMount == "function" && (l.flags |= 4194308)) : (typeof n.componentDidMount == "function" && (l.flags |= 4194308), l.memoizedProps = e, l.memoizedState = h), n.props = e, n.state = h, n.context = i, e = f) : (typeof n.componentDidMount == "function" && (l.flags |= 4194308), e = !1);
    } else {
      n = l.stateNode, Zc(t, l), i = l.memoizedProps, b = be(a, i), n.props = b, N = l.pendingProps, v = n.context, h = a.contextType, f = Xe, typeof h == "object" && h !== null && (f = kt(h)), c = a.getDerivedStateFromProps, (h = typeof c == "function" || typeof n.getSnapshotBeforeUpdate == "function") || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (i !== N || v !== f) && um(
        l,
        n,
        e,
        f
      ), Ba = !1, v = l.memoizedState, n.state = v, Qu(l, e, n, u), Xu();
      var S = l.memoizedState;
      i !== N || v !== S || Ba || t !== null && t.dependencies !== null && Kn(t.dependencies) ? (typeof c == "function" && (df(
        l,
        a,
        c,
        e
      ), S = l.memoizedState), (b = Ba || em(
        l,
        a,
        b,
        e,
        v,
        S,
        f
      ) || t !== null && t.dependencies !== null && Kn(t.dependencies)) ? (h || typeof n.UNSAFE_componentWillUpdate != "function" && typeof n.componentWillUpdate != "function" || (typeof n.componentWillUpdate == "function" && n.componentWillUpdate(e, S, f), typeof n.UNSAFE_componentWillUpdate == "function" && n.UNSAFE_componentWillUpdate(
        e,
        S,
        f
      )), typeof n.componentDidUpdate == "function" && (l.flags |= 4), typeof n.getSnapshotBeforeUpdate == "function" && (l.flags |= 1024)) : (typeof n.componentDidUpdate != "function" || i === t.memoizedProps && v === t.memoizedState || (l.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && v === t.memoizedState || (l.flags |= 1024), l.memoizedProps = e, l.memoizedState = S), n.props = e, n.state = S, n.context = f, e = b) : (typeof n.componentDidUpdate != "function" || i === t.memoizedProps && v === t.memoizedState || (l.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && v === t.memoizedState || (l.flags |= 1024), e = !1);
    }
    return n = e, We(t, l), e = (l.flags & 128) !== 0, n || e ? (n = l.stateNode, a = e && typeof a.getDerivedStateFromError != "function" ? null : n.render(), l.flags |= 1, t !== null && e ? (l.child = ge(
      l,
      t.child,
      null,
      u
    ), l.child = ge(
      l,
      null,
      a,
      u
    )) : Zt(t, l, a, u), l.memoizedState = n.state, t = l.child) : t = Ea(
      t,
      l,
      u
    ), t;
  }
  function bm(t, l, a, e) {
    return se(), l.flags |= 256, Zt(t, l, a, e), l.child;
  }
  var Sf = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function bf(t) {
    return { baseLanes: t, cachePool: fr() };
  }
  function Tf(t, l, a) {
    return t = t !== null ? t.childLanes & ~a : 0, l && (t |= Ml), t;
  }
  function Tm(t, l, a) {
    var e = l.pendingProps, u = !1, n = (l.flags & 128) !== 0, i;
    if ((i = n) || (i = t !== null && t.memoizedState === null ? !1 : (Pt.current & 2) !== 0), i && (u = !0, l.flags &= -129), i = (l.flags & 32) !== 0, l.flags &= -33, t === null) {
      if (P) {
        if (u ? Xa(l) : Qa(), (t = Nt) ? (t = L0(
          t,
          ql
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: Ua !== null ? { id: Pl, overflow: ta } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, a = Po(t), a.return = l, l.child = a, wt = l, Nt = null)) : t = null, t === null) throw Ha(l);
        return bs(t) ? l.lanes = 32 : l.lanes = 536870912, null;
      }
      return n = e.children, e = e.fallback, u ? (Qa(), u = l.mode, n = ri(
        { mode: "hidden", children: n },
        u
      ), e = fe(
        e,
        u,
        a,
        null
      ), n.return = l, e.return = l, n.sibling = e, l.child = n, e = l.child, e.memoizedState = bf(a), e.childLanes = Tf(
        t,
        i,
        a
      ), l.memoizedState = Sf, wu(null, e)) : (Xa(l), Ef(l, n));
    }
    var c = t.memoizedState;
    if (c !== null) {
      var f = c.dehydrated;
      if (f !== null)
        return oy(
          t,
          l,
          n,
          i,
          e,
          f,
          c,
          a
        );
    }
    return u ? (Qa(), u = e.fallback, n = l.mode, c = t.child, f = c.sibling, e = ya(c, {
      mode: "hidden",
      children: e.children
    }), e.subtreeFlags = c.subtreeFlags & 1206910976, f !== null ? u = ya(f, u) : (u = fe(
      u,
      n,
      a,
      null
    ), u.flags |= 2), u.return = l, e.return = l, e.sibling = u, l.child = e, wu(null, e), e = l.child, u = t.child.memoizedState, u === null ? u = bf(a) : (n = u.cachePool, n !== null ? (c = Bt._currentValue, n = n.parent !== c ? { parent: c, pool: c } : n) : n = fr(), u = {
      baseLanes: u.baseLanes | a,
      cachePool: n
    }), e.memoizedState = u, e.childLanes = Tf(
      t,
      i,
      a
    ), l.memoizedState = Sf, wu(t.child, e)) : (Xa(l), a = t.child, t = a.sibling, a = ya(a, {
      mode: "visible",
      children: e.children
    }), a.return = l, a.sibling = null, t !== null && (i = l.deletions, i === null ? (l.deletions = [t], l.flags |= 16) : i.push(t)), l.child = a, l.memoizedState = null, a);
  }
  function Ef(t, l) {
    return l = ri(
      { mode: "visible", children: l },
      t.mode
    ), l.return = t, t.child = l;
  }
  function ri(t, l) {
    return t = dl(22, t, null, l), t.lanes = 0, t;
  }
  function mi(t, l, a) {
    return ge(l, t.child, null, a), t = Ef(
      l,
      l.pendingProps.children
    ), t.flags |= 2, l.memoizedState = null, t;
  }
  function oy(t, l, a, e, u, n, i, c) {
    if (a)
      return l.flags & 256 ? (Xa(l), l.flags &= -257, mi(
        t,
        l,
        c
      )) : l.memoizedState !== null ? (Qa(), l.child = t.child, l.flags |= 128, null) : (Qa(), n = u.fallback, i = l.mode, u = ri(
        { mode: "visible", children: u.children },
        i
      ), n = fe(
        n,
        i,
        c,
        null
      ), n.flags |= 2, u.return = l, n.return = l, u.sibling = n, l.child = u, ge(l, t.child, null, c), u = l.child, u.memoizedState = bf(c), u.childLanes = Tf(
        t,
        e,
        c
      ), l.memoizedState = Sf, wu(null, u));
    if (Xa(l), bs(n)) {
      if (e = n.nextSibling && n.nextSibling.dataset, e) var f = e.dgst;
      return e = f, e !== "" && (u = Error(s(419)), u.stack = "", u.digest = e, xu({ value: u, source: null, stack: null })), mi(
        t,
        l,
        c
      );
    }
    if (Yt || re(t, l, c, !1), e = (c & t.childLanes) !== 0, Yt || e) {
      if (Ga.current !== null)
        return mi(
          t,
          l,
          c
        );
      if (e = Tt, e !== null && (u = lo(
        e,
        c
      ), u !== 0 && u !== i.retryLane))
        throw i.retryLane = u, ce(t, u), gl(e, t, u), hf;
      return Ss(n) || Ci(), mi(
        t,
        l,
        c
      );
    }
    return Ss(n) ? (l.flags |= 192, l.child = t.child, null) : (t = i.treeContext, Nt = Gl(n.nextSibling), wt = l, P = !0, Ra = null, ql = !1, t !== null && ar(l, t), l = Ef(
      l,
      u.children
    ), l.flags |= 134221824, l);
  }
  function Em(t, l, a) {
    t.lanes |= l;
    var e = t.alternate;
    e !== null && (e.lanes |= l), Vn(t.return, l, a);
  }
  function _m(t) {
    for (var l = null; t !== null; ) {
      var a = t.alternate;
      a !== null && Pn(a) === null && (l = t), t = t.sibling;
    }
    return l;
  }
  function di(t, l, a, e, u, n) {
    var i = t.memoizedState;
    i === null ? t.memoizedState = {
      isBackwards: l,
      rendering: null,
      renderingStartTime: 0,
      last: e,
      tail: a,
      tailMode: u,
      treeForkCount: n
    } : (i.isBackwards = l, i.rendering = null, i.renderingStartTime = 0, i.last = e, i.tail = a, i.tailMode = u, i.treeForkCount = n);
  }
  function _f(t) {
    var l = t.child;
    for (t.child = null; l !== null; ) {
      var a = l.sibling;
      l.sibling = t.child, t.child = l, l = a;
    }
  }
  function zf(t, l, a) {
    var e = l.pendingProps, u = e.revealOrder, n = e.tail;
    e = e.children;
    var i = Pt.current;
    if (l.flags & 128)
      return Lu(l, i), null;
    var c = (i & 2) !== 0;
    if (c ? (i = i & 1 | 2, l.flags |= 128) : i &= 1, Lu(l, i), u === "backwards" && t !== null ? (_f(t), Zt(t, l, e, a), _f(t)) : Zt(t, l, e, a), e = P ? Hu : 0, !c && t !== null && (t.flags & 128) !== 0)
      t: for (t = l.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && Em(t, a, l);
        else if (t.tag === 19)
          Em(t, a, l);
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
        a = _m(l.child), a === null ? (u = l.child, l.child = null) : (u = a.sibling, a.sibling = null, _f(l)), di(
          l,
          !0,
          u,
          null,
          n,
          e
        );
        break;
      case "unstable_legacy-backwards":
        for (a = null, u = l.child, l.child = null; u !== null; ) {
          if (t = u.alternate, t !== null && Pn(t) === null) {
            l.child = u;
            break;
          }
          t = u.sibling, u.sibling = a, a = u, u = t;
        }
        di(
          l,
          !0,
          a,
          null,
          n,
          e
        );
        break;
      case "together":
        di(
          l,
          !1,
          null,
          null,
          void 0,
          e
        );
        break;
      case "independent":
        l.memoizedState = null;
        break;
      default:
        a = _m(l.child), a === null ? (u = l.child, l.child = null) : (u = a.sibling, a.sibling = null), di(
          l,
          !1,
          u,
          a,
          n,
          e
        );
    }
    return l.child;
  }
  function zm(t, l, a) {
    var e = l.pendingProps;
    return xa(l, l.type, e.value), Zt(t, l, e.children, a), l.child;
  }
  function Ea(t, l, a) {
    if (t !== null && (l.dependencies = t.dependencies), Ka |= l.lanes, (a & l.childLanes) === 0)
      if (t !== null) {
        if (re(
          t,
          l,
          a,
          !1
        ), (a & l.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && l.child !== t.child)
      throw Error(s(153));
    if (l.child !== null) {
      for (t = l.child, a = ya(t, t.pendingProps), l.child = a, a.return = l; t.sibling !== null; )
        t = t.sibling, a = a.sibling = ya(t, t.pendingProps), a.return = l;
      a.sibling = null;
    }
    return l.child;
  }
  function Nf(t, l) {
    return (t.lanes & l) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Kn(t)));
  }
  function ry(t, l, a) {
    switch (l.tag) {
      case 3:
        Sn(l, l.stateNode.containerInfo), xa(l, Bt, t.memoizedState.cache), se();
        break;
      case 27:
      case 5:
        Wi(l);
        break;
      case 4:
        Sn(l, l.stateNode.containerInfo);
        break;
      case 10:
        xa(
          l,
          l.type,
          l.memoizedProps.value
        );
        break;
      case 31:
        if (l.memoizedState !== null)
          return l.flags |= 128, $c(l), null;
        break;
      case 13:
        var e = l.memoizedState;
        if (e !== null) {
          if (e.dehydrated !== null)
            return Xa(l), l.flags |= 128, null;
          e = re(
            t,
            l,
            a,
            !1
          );
          var u = l.child.childLanes;
          return e || (a & u) !== 0 ? Tm(t, l, a) : (Xa(l), t = Ea(
            t,
            l,
            a
          ), t !== null ? t.sibling : null);
        }
        Xa(l);
        break;
      case 19:
        if (l.flags & 128)
          return zf(
            t,
            l,
            a
          );
        if (u = (t.flags & 128) !== 0, e = (a & l.childLanes) !== 0, e || (re(
          t,
          l,
          a,
          !1
        ), e = (a & l.childLanes) !== 0), u) {
          if (e)
            return zf(
              t,
              l,
              a
            );
          l.flags |= 128;
        }
        if (u = l.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), Lu(l, Pt.current), e) break;
        return null;
      case 22:
        return l.lanes = 0, vm(
          t,
          l,
          a,
          l.pendingProps
        );
      case 24:
        xa(l, Bt, t.memoizedState.cache);
    }
    return Ea(t, l, a);
  }
  function Nm(t, l, a) {
    if (t !== null)
      if (t.memoizedProps !== l.pendingProps)
        Yt = !0;
      else {
        if (!Nf(t, a) && (l.flags & 128) === 0)
          return Yt = !1, ry(
            t,
            l,
            a
          );
        Yt = (t.flags & 131072) !== 0;
      }
    else
      Yt = !1, P && (l.flags & 1048576) !== 0 && lr(l, Hu, l.index);
    switch (l.lanes = 0, l.tag) {
      case 16:
        t: {
          var e = l.pendingProps;
          if (t = ye(l.elementType), l.type = t, typeof t == "function")
            Cc(t) ? (e = be(t, e), l.tag = 1, l = Sm(
              null,
              l,
              t,
              e,
              a
            )) : (l.tag = 0, l = gf(
              null,
              l,
              t,
              e,
              a
            ));
          else {
            if (t != null) {
              var u = t.$$typeof;
              if (u === R) {
                l.tag = 11, l = rm(
                  null,
                  l,
                  t,
                  e,
                  a
                );
                break t;
              } else if (u === mt) {
                l.tag = 14, l = mm(
                  null,
                  l,
                  t,
                  e,
                  a
                );
                break t;
              } else if (u === Rt) {
                l.tag = 10, l.type = t, l = zm(
                  null,
                  l,
                  a
                );
                break t;
              }
            }
            throw l = it(t) || t, Error(s(306, l, ""));
          }
        }
        return l;
      case 0:
        return gf(
          t,
          l,
          l.type,
          l.pendingProps,
          a
        );
      case 1:
        return e = l.type, u = be(
          e,
          l.pendingProps
        ), Sm(
          t,
          l,
          e,
          u,
          a
        );
      case 3:
        t: {
          if (Sn(
            l,
            l.stateNode.containerInfo
          ), t === null) throw Error(s(387));
          e = l.pendingProps;
          var n = l.memoizedState;
          u = n.element, Zc(t, l), Qu(l, e, null, a);
          var i = l.memoizedState;
          if (e = i.cache, xa(l, Bt, e), e !== n.cache && qc(
            l,
            [Bt],
            a,
            !0
          ), Xu(), e = i.element, n.isDehydrated)
            if (n = {
              element: e,
              isDehydrated: !1,
              cache: i.cache
            }, l.updateQueue.baseState = n, l.memoizedState = n, l.flags & 256) {
              l = bm(
                t,
                l,
                e,
                a
              );
              break t;
            } else if (e !== u) {
              u = xl(
                Error(s(424)),
                l
              ), xu(u), l = bm(
                t,
                l,
                e,
                a
              );
              break t;
            } else
              for (t = l.stateNode.containerInfo, t.nodeType === 9 ? t = t.body : t = t.nodeName === "HTML" ? t.ownerDocument.body : t, Nt = Gl(t.firstChild), wt = l, P = !0, Ra = null, ql = !0, a = vr(
                l,
                null,
                e,
                a
              ), l.child = a; a; )
                a.flags = a.flags & -3 | 134221824, a = a.sibling;
          else {
            if (se(), e === u) {
              l = Ea(
                t,
                l,
                a
              );
              break t;
            }
            Zt(t, l, e, a);
          }
          l = l.child;
        }
        return l;
      case 26:
        return We(t, l), t === null ? (a = F0(
          l.type,
          null,
          l.pendingProps,
          null
        )) ? l.memoizedState = a : P || (l.stateNode = p0(
          l.type,
          l.pendingProps,
          Aa.current,
          l
        )) : l.memoizedState = F0(
          l.type,
          t.memoizedProps,
          l.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return Wi(l), t === null && P && (e = l.stateNode = K0(
          l.type,
          l.pendingProps,
          Aa.current
        ), wt = l, ql = !0, u = Nt, Fa(l.type) ? (Ts = u, Nt = Gl(e.firstChild)) : Nt = u), Zt(
          t,
          l,
          l.pendingProps.children,
          a
        ), We(t, l), t === null && (l.flags |= 4194304), l.child;
      case 5:
        return t === null && P && ((u = e = Nt) && (e = nh(
          e,
          l.type,
          l.pendingProps,
          ql
        ), e !== null ? (l.stateNode = e, wt = l, Nt = Gl(e.firstChild), ql = !1, u = !0) : u = !1), u || Ha(l)), Wi(l), u = l.type, n = l.pendingProps, i = t !== null ? t.memoizedProps : null, e = n.children, rs(u, n) ? e = null : i !== null && rs(u, i) && (l.flags |= 32), l.memoizedState !== null && (u = kc(
          t,
          l,
          ty,
          null,
          null,
          a
        ), vu._currentValue = u), We(t, l), Zt(t, l, e, a), l.child;
      case 6:
        return t === null && P && ((t = a = Nt) && (a = ih(
          a,
          l.pendingProps,
          ql
        ), a !== null ? (l.stateNode = a, wt = l, Nt = null, t = !0) : t = !1), t || Ha(l)), null;
      case 13:
        return Tm(t, l, a);
      case 4:
        return Sn(
          l,
          l.stateNode.containerInfo
        ), e = l.pendingProps, t === null ? l.child = ge(
          l,
          null,
          e,
          a
        ) : Zt(t, l, e, a), l.child;
      case 11:
        return rm(
          t,
          l,
          l.type,
          l.pendingProps,
          a
        );
      case 7:
        return e = l.pendingProps, We(t, l), Zt(t, l, e, a), l.child;
      case 8:
        return Zt(
          t,
          l,
          l.pendingProps.children,
          a
        ), l.child;
      case 12:
        return Zt(
          t,
          l,
          l.pendingProps.children,
          a
        ), l.child;
      case 10:
        return zm(t, l, a);
      case 9:
        return u = l.type._context, e = l.pendingProps.children, me(l), u = kt(u), e = e(u), l.flags |= 1, Zt(t, l, e, a), l.child;
      case 14:
        return mm(
          t,
          l,
          l.type,
          l.pendingProps,
          a
        );
      case 15:
        return dm(
          t,
          l,
          l.type,
          l.pendingProps,
          a
        );
      case 19:
        return zf(t, l, a);
      case 31:
        return sy(t, l, a);
      case 22:
        return vm(
          t,
          l,
          a,
          l.pendingProps
        );
      case 24:
        return me(l), e = kt(Bt), t === null ? (u = Xc(), u === null && (u = Tt, n = Yc(), u.pooledCache = n, n.refCount++, n !== null && (u.pooledCacheLanes |= a), u = n), l.memoizedState = { parent: e, cache: u }, Lc(l), xa(l, Bt, u)) : ((t.lanes & a) !== 0 && (Zc(t, l), Qu(l, null, null, a), Xu()), u = t.memoizedState, n = l.memoizedState, u.parent !== e ? (u = { parent: e, cache: e }, l.memoizedState = u, l.lanes === 0 && (l.memoizedState = l.updateQueue.baseState = u), xa(l, Bt, e)) : (e = n.cache, xa(l, Bt, e), e !== u.cache && qc(
          l,
          [Bt],
          a,
          !0
        ))), Zt(
          t,
          l,
          l.pendingProps.children,
          a
        ), l.child;
      case 30:
        return l.stateNode === null && (l.stateNode = {
          autoName: null,
          paired: null,
          clones: null,
          ref: null
        }), e = l.pendingProps, e.name != null && e.name !== "auto" ? l.flags |= t === null ? 18882560 : 18874368 : P && Ln(l), t !== null && t.memoizedProps.name !== e.name ? l.flags |= 4194816 : We(t, l), Zt(t, l, e.children, a), l.child;
      case 29:
        throw l.pendingProps;
    }
    throw Error(s(156, l.tag));
  }
  function _a(t) {
    t.flags |= 4;
  }
  function Of(t, l, a, e, u) {
    var n;
    if ((n = (t.mode & 32) !== 0) && (n = a === null ? P0(l, e) : P0(l, e) && (e.src !== a.src || e.srcSet !== a.srcSet)), n) {
      if (t.flags |= 16777216, (u & 335544128) === u)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (n0()) t.flags |= 8192;
        else
          throw he = Fn, Qc;
    } else t.flags &= -16777217;
  }
  function Om(t, l) {
    if (l.type !== "stylesheet" || (l.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !td(l))
      if (n0()) t.flags |= 8192;
      else
        throw he = Fn, Qc;
  }
  function vi(t, l) {
    l !== null && (t.flags |= 4), t.flags & 16384 && (l = t.tag !== 22 ? Is() : 536870912, t.lanes |= l, lu |= l);
  }
  function Ju(t, l) {
    if (!P)
      switch (t.tailMode) {
        case "visible":
          break;
        case "collapsed":
          for (var a = t.tail, e = null; a !== null; )
            a.alternate !== null && (e = a), a = a.sibling;
          e === null ? l || t.tail === null ? t.tail = null : t.tail.sibling = null : e.sibling = null;
          break;
        default:
          for (l = t.tail, a = null; l !== null; )
            l.alternate !== null && (a = l), l = l.sibling;
          a === null ? t.tail = null : a.sibling = null;
      }
  }
  function Ot(t) {
    var l = t.alternate !== null && t.alternate.child === t.child, a = 0, e = 0;
    if (l)
      for (var u = t.child; u !== null; )
        a |= u.lanes | u.childLanes, e |= u.subtreeFlags & 1206910976, e |= u.flags & 1206910976, u.return = t, u = u.sibling;
    else
      for (u = t.child; u !== null; )
        a |= u.lanes | u.childLanes, e |= u.subtreeFlags, e |= u.flags, u.return = t, u = u.sibling;
    return t.subtreeFlags |= e, t.childLanes = a, l;
  }
  function my(t, l, a) {
    var e = l.pendingProps;
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
        return Ot(l), null;
      case 1:
        return Ot(l), null;
      case 3:
        return a = l.stateNode, e = null, t !== null && (e = t.memoizedState.cache), l.memoizedState.cache !== e && (l.flags |= 2048), Sa(Bt), Me(), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (t === null || t.child === null) && (Ze(l) ? _a(l) : t === null || t.memoizedState.isDehydrated && (l.flags & 256) === 0 || (l.flags |= 1024, jc())), Ot(l), null;
      case 26:
        var u = l.type, n = l.memoizedState;
        return t === null ? (_a(l), n !== null ? (Ot(l), Om(l, n)) : (Ot(l), Of(
          l,
          u,
          null,
          e,
          a
        ))) : n ? n !== t.memoizedState ? (_a(l), Ot(l), Om(l, n)) : (Ot(l), l.flags &= -16777217) : (t = t.memoizedProps, t !== e && _a(l), Ot(l), Of(
          l,
          u,
          t,
          e,
          a
        )), null;
      case 27:
        if (bn(l), a = Aa.current, u = l.type, t !== null && l.stateNode != null)
          t.memoizedProps !== e && _a(l);
        else {
          if (!e) {
            if (l.stateNode === null)
              throw Error(s(166));
            return Ot(l), l.subtreeFlags &= -33554433, null;
          }
          t = kl.current, Ze(l) ? er(l) : (t = K0(u, e, a), l.stateNode = t, _a(l));
        }
        return Ot(l), l.subtreeFlags &= -33554433, null;
      case 5:
        if (bn(l), u = l.type, t !== null && l.stateNode != null)
          t.memoizedProps !== e && _a(l);
        else {
          if (!e) {
            if (l.stateNode === null)
              throw Error(s(166));
            return Ot(l), l.subtreeFlags &= -33554433, null;
          }
          if (n = kl.current, Ze(l))
            er(l);
          else {
            var i = un(
              Aa.current
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
                    n = typeof e.is == "string" ? i.createElement("select", {
                      is: e.is
                    }) : i.createElement("select"), e.multiple ? n.multiple = !0 : e.size && (n.size = e.size);
                    break;
                  default:
                    n = typeof e.is == "string" ? i.createElement(u, { is: e.is }) : i.createElement(u);
                }
            }
            n[Wt] = l, n[ml] = e;
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
            t: switch (ll(n, u, e), u) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                e = !!e.autoFocus;
                break t;
              case "img":
                e = !0;
                break t;
              default:
                e = !1;
            }
            e && _a(l);
          }
        }
        return Ot(l), l.subtreeFlags &= -33554433, Of(
          l,
          l.type,
          t === null ? null : t.memoizedProps,
          l.pendingProps,
          a
        ), null;
      case 6:
        if (t && l.stateNode != null)
          t.memoizedProps !== e && _a(l);
        else {
          if (typeof e != "string" && l.stateNode === null)
            throw Error(s(166));
          if (t = Aa.current, Ze(l)) {
            if (t = l.stateNode, a = l.memoizedProps, e = null, u = wt, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  e = u.memoizedProps;
              }
            t[Wt] = l, t = !!(t.nodeValue === a || e !== null && e.suppressHydrationWarning === !0 || N0(t.nodeValue, a)), t || Ha(l, !0);
          } else
            t = un(t).createTextNode(
              e
            ), t[Wt] = l, l.stateNode = t;
        }
        return Ot(l), null;
      case 31:
        if (a = l.memoizedState, t === null || t.memoizedState !== null) {
          if (e = Ze(l), a !== null) {
            if (t === null) {
              if (!e) throw Error(s(318));
              if (t = l.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(557));
              t[Wt] = l;
            } else
              se(), (l.flags & 128) === 0 && (l.memoizedState = null), l.flags |= 4;
            Ot(l), t = !1;
          } else
            a = jc(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = a), t = !0;
          if (!t)
            return l.flags & 256 ? (Nl(l), l) : (Nl(l), null);
          if ((l.flags & 128) !== 0)
            throw Error(s(558));
        }
        return Ot(l), null;
      case 13:
        if (e = l.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (u = Ze(l), e !== null && e.dehydrated !== null) {
            if (t === null) {
              if (!u) throw Error(s(318));
              if (u = l.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(s(317));
              u[Wt] = l;
            } else
              se(), (l.flags & 128) === 0 && (l.memoizedState = null), l.flags |= 4;
            Ot(l), u = !1;
          } else
            u = jc(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return l.flags & 256 ? (Nl(l), l) : (Nl(l), null);
        }
        return Nl(l), (l.flags & 128) !== 0 ? (l.lanes = a, l) : (a = e !== null, t = t !== null && t.memoizedState !== null, a && (e = l.child, u = null, e.alternate !== null && e.alternate.memoizedState !== null && e.alternate.memoizedState.cachePool !== null && (u = e.alternate.memoizedState.cachePool.pool), n = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), n !== u && (e.flags |= 2048)), a !== t && a && (l.child.flags |= 8192), vi(l, l.updateQueue), Ot(l), null);
      case 4:
        return Me(), t === null && is(l.stateNode.containerInfo), l.flags |= 67108864, Ot(l), null;
      case 10:
        return Sa(l.type), Ot(l), null;
      case 19:
        if (Fc(l), e = l.memoizedState, e === null) return Ot(l), null;
        if (u = (l.flags & 128) !== 0, n = e.rendering, n === null)
          if (u) Ju(e, !1);
          else {
            if (Ut !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = l.child; t !== null; ) {
                if (n = Pn(t), n !== null) {
                  for (l.flags |= 128, Ju(e, !1), t = n.updateQueue, l.updateQueue = t, vi(l, t), l.subtreeFlags = 0, t = a, a = l.child; a !== null; )
                    Io(a, t), a = a.sibling;
                  return Lu(
                    l,
                    Pt.current & 1 | 2
                  ), P && ha(l, e.treeForkCount), l.child;
                }
                t = t.sibling;
              }
            e.tail !== null && bl() > Ai && (l.flags |= 128, u = !0, Ju(e, !1), l.lanes = 4194304);
          }
        else {
          if (!u)
            if (t = Pn(n), t !== null) {
              if (l.flags |= 128, u = !0, t = t.updateQueue, l.updateQueue = t, vi(l, t), Ju(e, !0), e.tail === null && e.tailMode !== "collapsed" && e.tailMode !== "visible" && !n.alternate && !P)
                return Ot(l), null;
            } else
              2 * bl() - e.renderingStartTime > Ai && a !== 536870912 && (l.flags |= 128, u = !0, Ju(e, !1), l.lanes = 4194304);
          e.isBackwards ? (n.sibling = l.child, l.child = n) : (t = e.last, t !== null ? t.sibling = n : l.child = n, e.last = n);
        }
        if (e.tail !== null) {
          t = e.tail;
          t: {
            for (a = t; a !== null; ) {
              if (a.alternate !== null) {
                a = !1;
                break t;
              }
              a = a.sibling;
            }
            a = !0;
          }
          return e.rendering = t, e.tail = t.sibling, e.renderingStartTime = bl(), t.sibling = null, n = Pt.current, n = u ? n & 1 | 2 : n & 1, e.tailMode === "visible" || e.tailMode === "collapsed" || !a || P ? Lu(l, n) : (a = n, zt(It, l), zt(Pt, a), el === null && (el = l)), P && ha(l, e.treeForkCount), t;
        }
        return Ot(l), null;
      case 22:
      case 23:
        return Nl(l), Jc(), e = l.memoizedState !== null, t !== null ? t.memoizedState !== null !== e && (l.flags |= 8192) : e && (l.flags |= 8192), e ? (a & 536870912) !== 0 && (l.flags & 128) === 0 && (Ot(l), l.subtreeFlags & 6 && (l.flags |= 8192)) : Ot(l), a = l.updateQueue, a !== null && vi(l, a.retryQueue), a = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), e = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (e = l.memoizedState.cachePool.pool), e !== a && (l.flags |= 2048), t !== null && Ft(ve), null;
      case 24:
        return a = null, t !== null && (a = t.memoizedState.cache), l.memoizedState.cache !== a && (l.flags |= 2048), Sa(Bt), Ot(l), null;
      case 25:
        return null;
      case 30:
        return l.flags |= 33554432, Ot(l), null;
    }
    throw Error(s(156, l.tag));
  }
  function dy(t, l) {
    switch (Hc(l), l.tag) {
      case 1:
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 3:
        return Sa(Bt), Me(), t = l.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (l.flags = t & -65537 | 128, l) : null;
      case 26:
      case 27:
      case 5:
        return bn(l), null;
      case 31:
        if (l.memoizedState !== null) {
          if (Nl(l), l.alternate === null)
            throw Error(s(340));
          se();
        }
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 13:
        if (Nl(l), t = l.memoizedState, t !== null && t.dehydrated !== null) {
          if (l.alternate === null)
            throw Error(s(340));
          se();
        }
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 19:
        return Fc(l), t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, t = l.memoizedState, t !== null && (t.rendering = null, t.tail = null), l.flags |= 4, l) : null;
      case 4:
        return Me(), null;
      case 10:
        return Sa(l.type), null;
      case 22:
      case 23:
        return Nl(l), Jc(), t !== null && Ft(ve), t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 24:
        return Sa(Bt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Am(t, l) {
    switch (Hc(l), l.tag) {
      case 3:
        Sa(Bt), Me();
        break;
      case 26:
      case 27:
      case 5:
        bn(l);
        break;
      case 4:
        Me();
        break;
      case 31:
        l.memoizedState !== null && Nl(l);
        break;
      case 13:
        Nl(l);
        break;
      case 19:
        Fc(l);
        break;
      case 10:
        Sa(l.type);
        break;
      case 22:
      case 23:
        Nl(l), Jc(), t !== null && Ft(ve);
        break;
      case 24:
        Sa(Bt);
    }
  }
  function $u(t, l) {
    try {
      var a = l.updateQueue, e = a !== null ? a.lastEffect : null;
      if (e !== null) {
        var u = e.next;
        a = u;
        do {
          if ((a.tag & t) === t) {
            e = void 0;
            var n = a.create, i = a.inst;
            e = n(), i.destroy = e;
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (c) {
      ht(l, l.return, c);
    }
  }
  function La(t, l, a) {
    try {
      var e = l.updateQueue, u = e !== null ? e.lastEffect : null;
      if (u !== null) {
        var n = u.next;
        e = n;
        do {
          if ((e.tag & t) === t) {
            var i = e.inst, c = i.destroy;
            if (c !== void 0) {
              i.destroy = void 0, u = l;
              var f = a, h = c;
              try {
                h();
              } catch (b) {
                ht(
                  u,
                  f,
                  b
                );
              }
            }
          }
          e = e.next;
        } while (e !== n);
      }
    } catch (b) {
      ht(l, l.return, b);
    }
  }
  function Mm(t) {
    var l = t.updateQueue;
    if (l !== null) {
      var a = t.stateNode;
      try {
        hr(l, a);
      } catch (e) {
        ht(t, t.return, e);
      }
    }
  }
  function pm(t, l, a) {
    a.props = be(
      t.type,
      t.memoizedProps
    ), a.state = t.memoizedState;
    try {
      a.componentWillUnmount();
    } catch (e) {
      ht(t, l, e);
    }
  }
  function la(t, l) {
    try {
      var a = t.ref;
      if (a !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var e = t.stateNode;
            break;
          case 30:
            var u = t.stateNode, n = da(t.memoizedProps, u);
            (u.ref === null || u.ref.name !== n) && (u.ref = j0(n)), e = u.ref;
            break;
          case 7:
            if (t.stateNode === null) {
              var i = new Dl(t);
              T(
                t.child,
                !1,
                eh,
                i,
                void 0,
                void 0
              ), t.stateNode = i;
            }
            e = t.stateNode;
            break;
          default:
            e = t.stateNode;
        }
        typeof a == "function" ? t.refCleanup = a(e) : a.current = e;
      }
    } catch (c) {
      ht(t, l, c);
    }
  }
  function tl(t, l) {
    var a = t.ref, e = t.refCleanup;
    if (a !== null)
      if (typeof e == "function")
        try {
          e();
        } catch (u) {
          ht(t, l, u);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof a == "function")
        try {
          a(null);
        } catch (u) {
          ht(t, l, u);
        }
      else a.current = null;
  }
  function yi(t, l) {
    if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && t.alternate === null && l !== null)
      for (var a = 0; a < l.length; a++)
        Q0(
          t.stateNode,
          l[a]
        );
  }
  function Dm(t) {
    for (var l = t.return; l !== null && (Mf(l) && Q0(t.stateNode, l.stateNode), !Af(l)); )
      l = l.return;
  }
  function Fu(t) {
    for (var l = t.return; l !== null && (Mf(l) && uh(t.stateNode, l.stateNode), !Af(l)); )
      l = l.return;
  }
  function Af(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 27;
  }
  function Mf(t) {
    return t && t.tag === 7 && t.stateNode !== null;
  }
  function pf(t) {
    var l = t.type, a = t.memoizedProps, e = t.stateNode;
    try {
      t: switch (l) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && e.focus();
          break t;
        case "img":
          a.src ? e.src = a.src : a.srcSet && (e.srcset = a.srcSet);
      }
    } catch (u) {
      ht(t, t.return, u);
    }
  }
  function Df(t, l, a) {
    try {
      var e = t.stateNode;
      Gy(e, t.type, a, l), e[ml] = l;
    } catch (u) {
      ht(t, t.return, u);
    }
  }
  function Cm(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && Fa(t.type) || t.tag === 4;
  }
  function Cf(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Cm(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && Fa(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Uf(t, l, a, e) {
    var u = t.tag;
    if (u === 5 || u === 6)
      u = t.stateNode, l ? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(u, l) : (l = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a, l.appendChild(u), a = a._reactRootContainer, a != null || l.onclick !== null || (l.onclick = Il)), yi(t, e), ot = !0;
    else if (u !== 4 && (u === 27 && (yi(t, e), e = null, Fa(t.type) && (a = t.stateNode, l = null)), t = t.child, t !== null))
      for (Uf(
        t,
        l,
        a,
        e
      ), t = t.sibling; t !== null; )
        Uf(
          t,
          l,
          a,
          e
        ), t = t.sibling;
  }
  function hi(t, l, a, e) {
    var u = t.tag;
    if (u === 5 || u === 6)
      u = t.stateNode, l ? a.insertBefore(u, l) : a.appendChild(u), yi(t, e), ot = !0;
    else if (u !== 4 && (u === 27 && (yi(t, e), e = null, Fa(t.type) && (a = t.stateNode)), t = t.child, t !== null))
      for (hi(
        t,
        l,
        a,
        e
      ), t = t.sibling; t !== null; )
        hi(
          t,
          l,
          a,
          e
        ), t = t.sibling;
  }
  function Um(t) {
    var l = t.stateNode, a = t.memoizedProps;
    try {
      for (var e = t.type, u = l.attributes; u.length; )
        l.removeAttributeNode(u[0]);
      ll(l, e, a), l[Wt] = t, l[ml] = a;
    } catch (n) {
      ht(t, t.return, n);
    }
  }
  var gi = !1, Ol = null;
  function Rm(t) {
    (t.tag === 30 || (t.subtreeFlags & 33554432) !== 0) && (gi = !0);
  }
  var aa = null;
  function Hm() {
    var t = aa;
    return aa = null, t;
  }
  var vl = 0;
  function ke(t, l, a, e, u) {
    return vl = 0, xm(
      t.child,
      l,
      a,
      e,
      u
    );
  }
  function xm(t, l, a, e, u) {
    for (var n = !1; t !== null; ) {
      if (t.tag === 5) {
        var i = t.stateNode;
        if (e !== null) {
          var c = vs(i);
          e.push(c), c.view && (n = !0);
        } else
          n || vs(i).view && (n = !0);
        gi = !0, H0(
          i,
          vl === 0 ? l : l + "_" + vl,
          a
        ), vl++;
      } else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && u || xm(
        t.child,
        l,
        a,
        e,
        u
      ) && (n = !0));
      t = t.sibling;
    }
    return n;
  }
  function ea(t, l) {
    for (; t !== null; )
      t.tag === 5 ? x0(t.stateNode, t.memoizedProps) : (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && l || ea(
        t.child,
        l
      )), t = t.sibling;
  }
  function Si(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if ((t.tag !== 22 || t.memoizedState === null) && (Si(t), t.tag === 30 && (t.flags & 18874368) !== 0 && t.stateNode.paired)) {
          var l = t.memoizedProps;
          if (l.name == null || l.name === "auto")
            throw Error(s(544));
          var a = l.name;
          l = va(l.default, l.share), l !== "none" && (ke(
            t,
            a,
            l,
            null,
            !1
          ) || ea(t.child, !1));
        }
        t = t.sibling;
      }
  }
  function Rf(t, l) {
    if (t.tag === 30) {
      var a = t.stateNode, e = t.memoizedProps, u = da(e, a), n = va(
        e.default,
        a.paired ? e.share : e.enter
      );
      n !== "none" ? ke(t, u, n, null, !1) ? (Si(t), a.paired || l || nu(t, e.onEnter)) : ea(t.child, !1) : Si(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        Rf(t, l), t = t.sibling;
    else Si(t);
  }
  function Hf(t) {
    if (Ol !== null && Ol.size !== 0) {
      var l = Ol;
      if ((t.subtreeFlags & 18874368) !== 0)
        for (t = t.child; t !== null; ) {
          if (t.tag !== 22 || t.memoizedState === null) {
            if (t.tag === 30 && (t.flags & 18874368) !== 0) {
              var a = t.memoizedProps, e = a.name;
              if (e != null && e !== "auto") {
                var u = l.get(e);
                if (u !== void 0) {
                  var n = va(
                    a.default,
                    a.share
                  );
                  if (n !== "none" && (ke(
                    t,
                    e,
                    n,
                    null,
                    !1
                  ) ? (n = t.stateNode, u.paired = n, n.paired = u, nu(t, a.onShare)) : ea(t.child, !1)), l.delete(e), l.size === 0) break;
                }
              }
            }
            Hf(t);
          }
          t = t.sibling;
        }
    }
  }
  function xf(t) {
    if (t.tag === 30) {
      var l = t.memoizedProps, a = da(l, t.stateNode), e = Ol !== null ? Ol.get(a) : void 0, u = va(
        l.default,
        e !== void 0 ? l.share : l.exit
      );
      u !== "none" && (ke(t, a, u, null, !1) ? e !== void 0 ? (u = t.stateNode, e.paired = u, u.paired = e, Ol.delete(a), nu(t, l.onShare)) : nu(t, l.onExit) : ea(t.child, !1)), Ol !== null && Hf(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        xf(t), t = t.sibling;
    else
      Ol !== null && Hf(t);
  }
  function jm(t) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var l = t.memoizedProps, a = da(l, t.stateNode);
        l = va(l.default, l.update), t.flags &= -5, l !== "none" && ke(
          t,
          a,
          l,
          t.memoizedState = [],
          !1
        );
      } else
        (t.subtreeFlags & 33554432) !== 0 && jm(t);
      t = t.sibling;
    }
  }
  function jf(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if (t.tag !== 22 || t.memoizedState === null) {
          if (t.tag === 30 && (t.flags & 18874368) !== 0) {
            var l = t.stateNode;
            l.paired !== null && (l.paired = null, ea(t.child, !1));
          }
          jf(t);
        }
        t = t.sibling;
      }
  }
  function bi(t) {
    if (t.tag === 30)
      t.stateNode.paired = null, ea(t.child, !1), jf(t);
    else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        bi(t), t = t.sibling;
    else jf(t);
  }
  function Bm(t) {
    for (t = t.child; t !== null; )
      t.tag === 30 ? ea(t.child, !1) : (t.subtreeFlags & 33554432) !== 0 && Bm(t), t = t.sibling;
  }
  function Bf(t, l, a, e, u, n, i) {
    for (var c = !1; l !== null; ) {
      if (l.tag === 5) {
        var f = l.stateNode;
        if (n !== null && vl < n.length) {
          var h = n[vl], b = vs(f);
          (h.view || b.view) && (c = !0);
          var N;
          if (N = (t.flags & 4) === 0)
            if (b.clip) N = !0;
            else {
              N = h.rect;
              var v = b.rect;
              N = N.y !== v.y || N.x !== v.x || N.height !== v.height || N.width !== v.width;
            }
          N && (t.flags |= 4), b.abs ? b = !h.abs : (h = h.rect, b = b.rect, b = h.height !== b.height || h.width !== b.width), b && (t.flags |= 32);
        } else t.flags |= 32;
        (t.flags & 4) !== 0 && H0(
          f,
          vl === 0 ? a : a + "_" + vl,
          u
        ), c && (t.flags & 4) !== 0 || (aa === null && (aa = []), aa.push(
          f,
          vl === 0 ? e : e + "_" + vl,
          l.memoizedProps
        )), vl++;
      } else (l.tag !== 22 || l.memoizedState === null) && (l.tag === 30 && i ? t.flags |= l.flags & 32 : Bf(
        t,
        l.child,
        a,
        e,
        u,
        n,
        i
      ) && (c = !0));
      l = l.sibling;
    }
    return c;
  }
  function qm(t, l) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var a = t.memoizedProps, e = t.stateNode, u = da(a, e), n = va(a.default, a.update), i;
        i = t.memoizedState, t.memoizedState = null, e = t;
        var c = t.child;
        vl = 0, u = Bf(
          e,
          c,
          u,
          u,
          n,
          i,
          !1
        ), (t.flags & 4) !== 0 && u && nu(t, a.onUpdate);
      } else
        (t.subtreeFlags & 33554432) !== 0 && qm(t);
      t = t.sibling;
    }
  }
  var Jt = !1, dt = !1, ua = !1, qf = !1, Ym = typeof WeakSet == "function" ? WeakSet : Set, $t = null, na = !1, Wu = !1, Ti = !1, Yf = !1;
  function vy(t, l, a) {
    if (t = t.containerInfo, ss = yu, t = Lo(t), zc(t)) {
      if ("selectionStart" in t)
        var e = {
          start: t.selectionStart,
          end: t.selectionEnd
        };
      else
        t: {
          e = (e = t.ownerDocument) && e.defaultView || window;
          var u = e.getSelection && e.getSelection();
          if (u && u.rangeCount !== 0) {
            e = u.anchorNode;
            var n = u.anchorOffset, i = u.focusNode;
            u = u.focusOffset;
            try {
              e.nodeType, i.nodeType;
            } catch {
              e = null;
              break t;
            }
            var c = 0, f = -1, h = -1, b = 0, N = 0, v = t, S = null;
            l: for (; ; ) {
              for (var p; v !== e || n !== 0 && v.nodeType !== 3 || (f = c + n), v !== i || u !== 0 && v.nodeType !== 3 || (h = c + u), v.nodeType === 3 && (c += v.nodeValue.length), (p = v.firstChild) !== null; )
                S = v, v = p;
              for (; ; ) {
                if (v === t) break l;
                if (S === e && ++b === n && (f = c), S === i && ++N === u && (h = c), (p = v.nextSibling) !== null) break;
                v = S, S = v.parentNode;
              }
              v = p;
            }
            e = f === -1 || h === -1 ? null : { start: f, end: h };
          } else e = null;
        }
      e = e || { start: 0, end: 0 };
    } else e = null;
    for (os = { focusedElem: t, selectionRange: e }, yu = !1, a = (a & 335544064) === a, $t = l, l = a ? 9270 : 1024; $t !== null; ) {
      if (t = $t, a && (e = t.deletions, e !== null))
        for (n = 0; n < e.length; n++)
          a && xf(e[n]);
      if (t.alternate === null && (t.flags & 2) !== 0)
        a && Rm(t), Ei(a);
      else {
        if (t.tag === 22) {
          if (e = t.alternate, t.memoizedState !== null) {
            e !== null && e.memoizedState === null && a && xf(e), Ei(a);
            continue;
          } else if (e !== null && e.memoizedState !== null) {
            a && Rm(t), Ei(a);
            continue;
          }
        }
        e = t.child, (t.subtreeFlags & l) !== 0 && e !== null ? (e.return = t, $t = e) : (a && jm(t), Ei(a));
      }
    }
    Ol = null;
  }
  function Ei(t) {
    for (; $t !== null; ) {
      var l = $t, a = t, e = l.alternate, u = l.flags;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if ((u & 1024) !== 0 && e !== null) {
            a = void 0, u = e.memoizedProps, e = e.memoizedState;
            var n = l.stateNode;
            try {
              var i = be(
                l.type,
                u
              );
              a = n.getSnapshotBeforeUpdate(
                i,
                e
              ), n.__reactInternalSnapshotBeforeUpdate = a;
            } catch (c) {
              ht(l, l.return, c);
            }
          }
          break;
        case 3:
          if ((u & 1024) !== 0) {
            if (e = l.stateNode.containerInfo, a = e.nodeType, a === 9)
              gs(e);
            else if (a === 1)
              switch (e.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  gs(e);
                  break;
                default:
                  e.textContent = "";
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
          a && e !== null && (a = da(
            e.memoizedProps,
            e.stateNode
          ), u = l.memoizedProps, u = va(u.default, u.update), u !== "none" && ke(
            e,
            a,
            u,
            e.memoizedState = [],
            !0
          ));
          break;
        default:
          if ((u & 1024) !== 0) throw Error(s(163));
      }
      if (e = l.sibling, e !== null) {
        e.return = l.return, $t = e;
        break;
      }
      $t = l.return;
    }
  }
  function Gm(t, l, a) {
    var e = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        ia(t, a), e & 4 && $u(5, a);
        break;
      case 1:
        if (ia(t, a), e & 4)
          if (t = a.stateNode, l === null)
            try {
              t.componentDidMount();
            } catch (i) {
              ht(a, a.return, i);
            }
          else {
            var u = be(
              a.type,
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
              ht(
                a,
                a.return,
                i
              );
            }
          }
        e & 64 && Mm(a), e & 512 && la(a, a.return);
        break;
      case 3:
        if (ia(t, a), e & 64 && (t = a.updateQueue, t !== null)) {
          if (l = null, a.child !== null)
            switch (a.child.tag) {
              case 27:
              case 5:
                l = a.child.stateNode;
                break;
              case 1:
                l = a.child.stateNode;
            }
          try {
            hr(t, l);
          } catch (i) {
            ht(a, a.return, i);
          }
        }
        break;
      case 27:
        l === null && e & 4 && Um(a);
      case 26:
      case 5:
        ia(t, a), l === null && e & 4 && pf(a), e & 512 && la(a, a.return);
        break;
      case 12:
        ia(t, a);
        break;
      case 31:
        ia(t, a), e & 4 && Zm(t, a);
        break;
      case 13:
        ia(t, a), e & 4 && Vm(t, a), e & 64 && (t = a.memoizedState, t !== null && (t = t.dehydrated, t !== null && (a = Ay.bind(
          null,
          a
        ), ch(t, a))));
        break;
      case 22:
        if (e = a.memoizedState !== null || Jt, !e) {
          var n = l !== null && l.memoizedState !== null || dt;
          l = Jt, u = dt, Jt = e, (dt = n) && !u ? (e = 2, (a.subtreeFlags & 8772) !== 0 && (e |= 1), wl(
            t,
            a,
            e
          )) : ia(t, a), Jt = l, dt = u;
        }
        break;
      case 30:
        ia(t, a), e & 512 && la(a, a.return);
        break;
      case 7:
        e & 512 && la(a, a.return);
      default:
        ia(t, a);
    }
  }
  function Gf(t, l) {
    for (t = t.child; t !== null; )
      Xm(t, l), t = t.sibling;
  }
  function Xm(t, l) {
    switch (t.tag) {
      case 5:
      case 26:
        try {
          var a = t.stateNode;
          if (l) {
            var e = a.style;
            typeof e.setProperty == "function" ? e.setProperty("display", "none", "important") : e.display = "none";
          } else {
            var u = t.stateNode, n = t.memoizedProps.style, i = n != null && n.hasOwnProperty("display") ? n.display : null;
            u.style.display = i == null || typeof i == "boolean" ? "" : ("" + i).trim();
          }
        } catch (f) {
          ht(t, t.return, f);
        }
        Xf(t, l);
        break;
      case 6:
        try {
          t.stateNode.nodeValue = l ? "" : t.memoizedProps, ot = !0;
        } catch (f) {
          ht(t, t.return, f);
        }
        break;
      case 18:
        try {
          var c = t.stateNode;
          l ? R0(c, !0) : R0(t.stateNode, !1);
        } catch (f) {
          ht(t, t.return, f);
        }
        break;
      case 22:
      case 23:
        t.memoizedState === null && Gf(t, l);
        break;
      default:
        Gf(t, l);
    }
  }
  function Xf(t, l) {
    if (t.subtreeFlags & 67108864)
      for (t = t.child; t !== null; ) {
        t: {
          var a = t, e = l;
          switch (a.tag) {
            case 4:
              Xm(a, e);
              break t;
            case 22:
              a.memoizedState === null && Xf(a, e);
              break t;
            default:
              Xf(a, e);
          }
        }
        t = t.sibling;
      }
  }
  function Qm(t) {
    var l = t.alternate;
    l !== null && (t.alternate = null, Qm(l)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (l = t.stateNode, l !== null && An(l)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var At = null, yl = !1;
  function Vl(t, l, a) {
    for (a = a.child; a !== null; )
      Lm(t, l, a), a = a.sibling;
  }
  function Lm(t, l, a) {
    if (Tl && typeof Tl.onCommitFiberUnmount == "function")
      try {
        Tl.onCommitFiberUnmount(bu, a);
      } catch {
      }
    switch (a.tag) {
      case 26:
        dt || tl(a, l), Vl(
          t,
          l,
          a
        ), a.memoizedState ? a.memoizedState.count-- : a.stateNode && !dt && (a = a.stateNode, a.parentNode.removeChild(a));
        break;
      case 27:
        dt || tl(a, l), Fu(a);
        var e = At, u = yl;
        Fa(a.type) && (At = a.stateNode, yl = !1), Vl(
          t,
          l,
          a
        ), w0(
          a.stateNode,
          a.type,
          a.memoizedProps
        ), At = e, yl = u;
        break;
      case 5:
        dt || tl(a, l), Fu(a);
      case 6:
        if (a.tag === 6 && Fu(a), e = At, u = yl, At = null, Vl(
          t,
          l,
          a
        ), At = e, yl = u, At !== null)
          if (yl)
            try {
              (At.nodeType === 9 ? At.body : At.nodeName === "HTML" ? At.ownerDocument.body : At).removeChild(a.stateNode), ot = !0;
            } catch (n) {
              ht(
                a,
                l,
                n
              );
            }
          else
            try {
              At.removeChild(a.stateNode), ot = !0;
            } catch (n) {
              ht(
                a,
                l,
                n
              );
            }
        break;
      case 18:
        At !== null && (yl ? (t = At, U0(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          a.stateNode
        ), hu(t)) : U0(At, a.stateNode));
        break;
      case 4:
        e = At, u = yl, At = a.stateNode.containerInfo, yl = !0, Vl(
          t,
          l,
          a
        ), At = e, yl = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        La(2, a, l), dt || La(4, a, l), Vl(
          t,
          l,
          a
        );
        break;
      case 1:
        dt || (tl(a, l), e = a.stateNode, typeof e.componentWillUnmount == "function" && pm(
          a,
          l,
          e
        )), Vl(
          t,
          l,
          a
        );
        break;
      case 21:
        Vl(
          t,
          l,
          a
        );
        break;
      case 22:
        dt = (e = dt) || a.memoizedState !== null, Vl(
          t,
          l,
          a
        ), dt = e;
        break;
      case 30:
        tl(a, l), Vl(
          t,
          l,
          a
        );
        break;
      case 7:
        dt || tl(a, l), Vl(
          t,
          l,
          a
        );
        break;
      default:
        Vl(
          t,
          l,
          a
        );
    }
  }
  function Zm(t, l) {
    if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        hu(t);
      } catch (a) {
        ht(l, l.return, a);
      }
    }
  }
  function Vm(t, l) {
    if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        hu(t);
      } catch (a) {
        ht(l, l.return, a);
      }
  }
  function yy(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var l = t.stateNode;
        return l === null && (l = t.stateNode = new Ym()), l;
      case 22:
        return t = t.stateNode, l = t._retryCache, l === null && (l = t._retryCache = new Ym()), l;
      default:
        throw Error(s(435, t.tag));
    }
  }
  function _i(t, l) {
    var a = yy(t);
    l.forEach(function(e) {
      if (!a.has(e)) {
        a.add(e);
        var u = My.bind(null, t, e);
        e.then(u, u);
      }
    });
  }
  function ol(t, l, a) {
    var e = l.deletions;
    if (e !== null)
      for (var u = 0; u < e.length; u++) {
        var n = e[u], i = t, c = l, f = c;
        t: for (; f !== null; ) {
          switch (f.tag) {
            case 27:
              if (Fa(f.type)) {
                At = f.stateNode, yl = !1;
                break t;
              }
              break;
            case 5:
              At = f.stateNode, yl = !1;
              break t;
            case 3:
            case 4:
              At = f.stateNode.containerInfo, yl = !0;
              break t;
          }
          f = f.return;
        }
        if (At === null) throw Error(s(160));
        Lm(i, c, n), At = null, yl = !1, i = n.alternate, i !== null && (i.return = null), n.return = null;
      }
    if (l.subtreeFlags & 13886)
      for (l = l.child; l !== null; )
        Km(l, t, a), l = l.sibling;
  }
  var Kl = null;
  function Km(t, l, a) {
    var e = t.alternate, u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (u & 4 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null))
          for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.ref.impl = i.nextImpl;
          }
        ol(l, t, a), rl(t), u & 4 && (La(3, t, t.return), $u(3, t), La(5, t, t.return));
        break;
      case 1:
        ol(l, t, a), rl(t), u & 512 && (dt || e === null || tl(e, e.return)), u & 64 && Jt && (t = t.updateQueue, t !== null && (l = t.callbacks, l !== null && (a = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = a === null ? l : a.concat(l))));
        break;
      case 26:
        if (n = Kl, ol(l, t, a), rl(t), u & 512 && (dt || e === null || tl(e, e.return)), u & 4)
          if (u = e !== null ? e.memoizedState : null, a = t.memoizedState, e === null)
            if (a === null)
              if (t.stateNode === null)
                if (Jt)
                  t.stateNode = p0(
                    t.type,
                    t.memoizedProps,
                    l.containerInfo,
                    t
                  );
                else {
                  t: {
                    l = t.type, a = t.memoizedProps, u = n.ownerDocument || n;
                    l: switch (l) {
                      case "title":
                        e = u.getElementsByTagName("title")[0], (!e || e[_u] || e[Wt] || e.namespaceURI === "http://www.w3.org/2000/svg" || e.hasAttribute("itemprop")) && (e = u.createElement(l), u.head.insertBefore(
                          e,
                          u.querySelector("head > title")
                        )), ll(e, l, a), e[Wt] = t, Kt(e), l = e;
                        break t;
                      case "link":
                        if (n = I0(
                          "link",
                          "href",
                          u
                        ).get(l + (a.href || ""))) {
                          for (i = 0; i < n.length; i++)
                            if (e = n[i], e.getAttribute("href") === (a.href == null || a.href === "" ? null : a.href) && e.getAttribute("rel") === (a.rel == null ? null : a.rel) && e.getAttribute("title") === (a.title == null ? null : a.title) && e.getAttribute("crossorigin") === (a.crossOrigin == null ? null : a.crossOrigin)) {
                              n.splice(i, 1);
                              break l;
                            }
                        }
                        e = u.createElement(l), ll(e, l, a), u.head.appendChild(e);
                        break;
                      case "meta":
                        if (n = I0(
                          "meta",
                          "content",
                          u
                        ).get(l + (a.content || ""))) {
                          for (i = 0; i < n.length; i++)
                            if (e = n[i], e.getAttribute("content") === (a.content == null ? null : "" + a.content) && e.getAttribute("name") === (a.name == null ? null : a.name) && e.getAttribute("property") === (a.property == null ? null : a.property) && e.getAttribute("http-equiv") === (a.httpEquiv == null ? null : a.httpEquiv) && e.getAttribute("charset") === (a.charSet == null ? null : a.charSet)) {
                              n.splice(i, 1);
                              break l;
                            }
                        }
                        e = u.createElement(l), ll(e, l, a), u.head.appendChild(e);
                        break;
                      default:
                        throw Error(s(468, l));
                    }
                    e[Wt] = t, Kt(e), l = e;
                  }
                  t.stateNode = l;
                }
              else
                Jt || Ns(n, t.type, t.stateNode);
            else
              t.stateNode = k0(
                n,
                a,
                t.memoizedProps
              );
          else
            u !== a ? (u === null ? (l = e.stateNode, l === null || dt || l.parentNode.removeChild(l)) : u.count--, a === null ? Jt || Ns(n, t.type, t.stateNode) : k0(n, a, t.memoizedProps)) : a === null && t.stateNode !== null && Df(
              t,
              t.memoizedProps,
              e.memoizedProps
            );
        break;
      case 27:
        ol(l, t, a), rl(t), u & 512 && (dt || e === null || tl(e, e.return)), e !== null && u & 4 && Df(
          t,
          t.memoizedProps,
          e.memoizedProps
        );
        break;
      case 5:
        if (n = ua, ua = !1, ol(l, t, a), ua = n, rl(t), u & 512 && (dt || e === null || tl(e, e.return)), t.flags & 32) {
          l = t.stateNode;
          try {
            He(l, ""), ot = !0;
          } catch (b) {
            ht(t, t.return, b);
          }
        }
        u & 4 && t.stateNode != null && (l = t.memoizedProps, Df(
          t,
          l,
          e !== null ? e.memoizedProps : l
        )), u & 1024 && (qf = !0);
        break;
      case 6:
        if (ol(l, t, a), rl(t), u & 4) {
          if (t.stateNode === null)
            throw Error(s(162));
          l = t.memoizedProps, a = t.stateNode;
          try {
            a.nodeValue = l, ot = !0;
          } catch (b) {
            ht(t, t.return, b);
          }
        }
        break;
      case 3:
        if (ot = !1, qi = null, n = Kl, Kl = nn(l.containerInfo), ol(l, t, a), Kl = n, rl(t), u & 4 && e !== null && e.memoizedState.isDehydrated)
          try {
            hu(l.containerInfo);
          } catch (b) {
            ht(t, t.return, b);
          }
        qf && (qf = !1, wm(t)), ot = !1;
        break;
      case 4:
        u = ua, ua = Jt, e = ro(), n = Kl, Kl = nn(
          t.stateNode.containerInfo
        ), ol(l, t, a), rl(t), Kl = n, ot && Wu && (Ti = !0), ot = e, ua = u;
        break;
      case 12:
        ol(l, t, a), rl(t);
        break;
      case 31:
        ol(l, t, a), rl(t), u & 4 && (l = t.updateQueue, l !== null && (t.updateQueue = null, _i(t, l)));
        break;
      case 13:
        ol(l, t, a), rl(t), t.child.flags & 8192 && t.memoizedState !== null != (e !== null && e.memoizedState !== null) && (Oi = bl()), u & 4 && (l = t.updateQueue, l !== null && (t.updateQueue = null, _i(t, l)));
        break;
      case 22:
        n = t.memoizedState !== null, i = e !== null && e.memoizedState !== null;
        var c = Jt, f = dt, h = ua;
        Jt = c || n, ua = h || n, dt = f || i, ol(l, t, a), dt = f, ua = h, Jt = c, rl(t), u & 8192 && (l = t.stateNode, l._visibility = n ? l._visibility & -2 : l._visibility | 1, !n || e === null || i || Jt || dt || (l = i || dt, a = Jt, e = dt, Jt = n || Jt, dt = l, Za(t, 2), Jt = a, dt = e), !n && ua || Gf(t, n)), u & 4 && (l = t.updateQueue, l !== null && (a = l.retryQueue, a !== null && (l.retryQueue = null, _i(t, a))));
        break;
      case 19:
        ol(l, t, a), rl(t), u & 4 && (l = t.updateQueue, l !== null && (t.updateQueue = null, _i(t, l)));
        break;
      case 30:
        u & 512 && (dt || e === null || tl(e, e.return)), u = ro(), n = Wu, i = (a & 335544064) === a, c = t.memoizedProps, Wu = i && va(
          c.default,
          c.update
        ) !== "none", ol(l, t, a), rl(t), i && e !== null && ot && (t.flags |= 4), Wu = n, ot = u;
        break;
      case 21:
        break;
      case 7:
        u & 512 && (dt || e === null || tl(e, e.return)), e && e.stateNode !== null && (e.stateNode._fragmentFiber = t);
      default:
        ol(l, t, a), rl(t);
    }
  }
  function rl(t) {
    var l = t.flags;
    if (l & 2) {
      try {
        for (var a, e = t.return; e !== null; ) {
          if (Cm(e)) {
            a = e;
            break;
          }
          e = e.return;
        }
        e = null;
        for (var u = t.return; u !== null; ) {
          if (Mf(u)) {
            var n = u.stateNode;
            e === null ? e = [n] : e.push(n);
          }
          if (Af(u)) break;
          u = u.return;
        }
        var i = e;
        if (a == null) throw Error(s(160));
        switch (a.tag) {
          case 27:
            var c = a.stateNode, f = Cf(t);
            hi(
              t,
              f,
              c,
              i
            );
            break;
          case 5:
            var h = a.stateNode;
            a.flags & 32 && (He(h, ""), a.flags &= -33);
            var b = Cf(t);
            hi(
              t,
              b,
              h,
              i
            );
            break;
          case 3:
          case 4:
            var N = a.stateNode.containerInfo, v = Cf(t);
            Uf(
              t,
              v,
              N,
              i
            );
            break;
          default:
            throw Error(s(161));
        }
      } catch (S) {
        ht(t, t.return, S);
      }
      t.flags &= -3;
    }
    l & 4096 && (t.flags &= -4097);
  }
  function wm(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var l = t;
        wm(l), l.tag === 5 && l.flags & 1024 && (l = l.stateNode, yu = !0, l.reset(), yu = !1), t = t.sibling;
      }
  }
  function Ie(t, l) {
    if (l.subtreeFlags & 9270)
      for (l = l.child; l !== null; )
        Jm(l, t), l = l.sibling;
    else qm(l);
  }
  function Jm(t, l) {
    var a = t.alternate;
    if (a === null) Rf(t, !1);
    else
      switch (t.tag) {
        case 3:
          if (Yf = na = !1, Hm(), Ie(l, t), !na && !Ti) {
            if (t = aa, t !== null)
              for (var e = 0; e < t.length; e += 3) {
                a = t[e];
                var u = t[e + 1];
                x0(a, t[e + 2]), a = a.ownerDocument.documentElement, a !== null && a.animate(
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
            )), Yf = !0;
          }
          aa = null;
          break;
        case 5:
          Ie(l, t);
          break;
        case 4:
          e = na, na = !1, Ie(l, t), na && (Ti = !0), na = e;
          break;
        case 22:
          t.memoizedState === null && (a.memoizedState !== null ? Rf(t, !1) : Ie(l, t));
          break;
        case 30:
          e = na, u = Hm(), na = !1, Ie(l, t), na && (t.flags |= 4);
          var n = t.memoizedProps, i = t.stateNode;
          l = da(n, i), i = da(a.memoizedProps, i);
          var c = va(n.default, n.update);
          c === "none" ? l = !1 : (n = a.memoizedState, a.memoizedState = null, a = t.child, vl = 0, l = Bf(
            t,
            a,
            l,
            i,
            c,
            n,
            !0
          ), vl !== (n === null ? 0 : n.length) && (t.flags |= 32)), (t.flags & 4) !== 0 && l ? (nu(
            t,
            t.memoizedProps.onUpdate
          ), aa = u) : u !== null && (u.push.apply(u, aa), aa = u), na = (t.flags & 32) !== 0 ? !0 : e;
          break;
        default:
          Ie(l, t);
      }
  }
  function ia(t, l) {
    if (l.subtreeFlags & 8772)
      for (l = l.child; l !== null; )
        Gm(t, l.alternate, l), l = l.sibling;
  }
  function Za(t, l) {
    for (t = t.child; t !== null; ) {
      var a = t, e = l;
      switch (a.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          La(4, a, a.return), Za(
            a,
            e
          );
          break;
        case 1:
          tl(a, a.return);
          var u = a.stateNode;
          typeof u.componentWillUnmount == "function" && pm(
            a,
            a.return,
            u
          ), Za(
            a,
            e
          );
          break;
        case 27:
          (e & 2) !== 0 && w0(
            a.stateNode,
            a.type,
            a.memoizedProps
          );
        case 5:
          tl(a, a.return), a.tag !== 5 && a.tag !== 27 || Fu(a), Za(
            a,
            e
          );
          break;
        case 6:
          Fu(a);
          break;
        case 26:
          tl(a, a.return), u = a.stateNode, a.memoizedState !== null || u === null || dt || u.parentNode.removeChild(u), Za(
            a,
            e
          );
          break;
        case 22:
          a.memoizedState === null && Za(
            a,
            e
          );
          break;
        case 30:
          tl(a, a.return), Za(
            a,
            e
          );
          break;
        case 7:
          tl(a, a.return);
        default:
          Za(
            a,
            e
          );
      }
      t = t.sibling;
    }
  }
  function wl(t, l, a) {
    for (a = (l.subtreeFlags & 8772) !== 0 ? a : a & -2, l = l.child; l !== null; ) {
      var e = l.alternate, u = t, n = l, i = n.flags, c = (a & 1) !== 0;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          wl(
            u,
            n,
            a
          ), $u(4, n);
          break;
        case 1:
          if (wl(
            u,
            n,
            a
          ), e = n, u = e.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (b) {
              ht(e, e.return, b);
            }
          if (e = n, u = e.updateQueue, u !== null) {
            var f = e.stateNode;
            try {
              var h = u.shared.hiddenCallbacks;
              if (h !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < h.length; u++)
                  yr(h[u], f);
            } catch (b) {
              ht(e, e.return, b);
            }
          }
          c && i & 64 && Mm(n), la(n, n.return);
          break;
        case 27:
          (a & 2) !== 0 && Um(n);
        case 5:
          n.tag !== 5 && n.tag !== 27 || Dm(n), wl(
            u,
            n,
            a
          ), c && e === null && i & 4 && pf(n), la(n, n.return);
          break;
        case 6:
          Dm(n);
          break;
        case 26:
          f = n.stateNode, n.memoizedState !== null || f === null || Jt || Ns(
            nn(f.ownerDocument),
            n.type,
            f
          ), wl(
            u,
            n,
            a
          ), c && e === null && i & 4 && pf(n), la(n, n.return);
          break;
        case 12:
          wl(
            u,
            n,
            a
          );
          break;
        case 31:
          wl(
            u,
            n,
            a
          ), c && i & 4 && Zm(u, n);
          break;
        case 13:
          wl(
            u,
            n,
            a
          ), c && i & 4 && Vm(u, n);
          break;
        case 22:
          n.memoizedState === null && wl(
            u,
            n,
            a
          ), la(n, n.return);
          break;
        case 30:
          wl(
            u,
            n,
            a
          ), la(n, n.return);
          break;
        case 7:
          la(n, n.return);
        default:
          wl(
            u,
            n,
            a
          );
      }
      l = l.sibling;
    }
  }
  function Qf(t, l) {
    var a = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), t = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (t = l.memoizedState.cachePool.pool), t !== a && (t != null && t.refCount++, a != null && ju(a));
  }
  function Lf(t, l) {
    t = null, l.alternate !== null && (t = l.alternate.memoizedState.cache), l = l.memoizedState.cache, l !== t && (l.refCount++, t != null && ju(t));
  }
  function Yl(t, l, a, e) {
    var u = (a & 335544064) === a;
    if (l.subtreeFlags & (u ? 10262 : 10256))
      for (l = l.child; l !== null; )
        $m(
          t,
          l,
          a,
          e
        ), l = l.sibling;
    else u && Bm(l);
  }
  function $m(t, l, a, e) {
    var u = (a & 335544064) === a;
    u && l.alternate === null && l.return !== null && l.return.alternate !== null && bi(l);
    var n = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Yl(
          t,
          l,
          a,
          e
        ), n & 2048 && $u(9, l);
        break;
      case 1:
        Yl(
          t,
          l,
          a,
          e
        );
        break;
      case 3:
        Yl(
          t,
          l,
          a,
          e
        ), u && Yf && (t = t.containerInfo, t = t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, t.style.viewTransitionName === "root" && (t.style.viewTransitionName = ""), t = t.ownerDocument.documentElement, t !== null && t.style.viewTransitionName === "none" && (t.style.viewTransitionName = "")), n & 2048 && (n = null, l.alternate !== null && (n = l.alternate.memoizedState.cache), l = l.memoizedState.cache, l !== n && (l.refCount++, n != null && ju(n)));
        break;
      case 12:
        if (n & 2048) {
          Yl(
            t,
            l,
            a,
            e
          ), n = l.stateNode;
          try {
            var i = l.memoizedProps, c = i.id, f = i.onPostCommit;
            typeof f == "function" && f(
              c,
              l.alternate === null ? "mount" : "update",
              n.passiveEffectDuration,
              -0
            );
          } catch (h) {
            ht(l, l.return, h);
          }
        } else
          Yl(
            t,
            l,
            a,
            e
          );
        break;
      case 31:
        Yl(
          t,
          l,
          a,
          e
        );
        break;
      case 13:
        Yl(
          t,
          l,
          a,
          e
        );
        break;
      case 23:
        break;
      case 22:
        i = l.stateNode, c = l.alternate, l.memoizedState !== null ? (u && c !== null && c.memoizedState === null && bi(c), i._visibility & 2 ? Yl(
          t,
          l,
          a,
          e
        ) : ku(
          t,
          l
        )) : (u && c !== null && c.memoizedState !== null && bi(l), i._visibility & 2 ? Yl(
          t,
          l,
          a,
          e
        ) : (i._visibility |= 2, Pe(
          t,
          l,
          a,
          e,
          (l.subtreeFlags & 10256) !== 0 || !1
        ))), n & 2048 && Qf(c, l);
        break;
      case 24:
        Yl(
          t,
          l,
          a,
          e
        ), n & 2048 && Lf(l.alternate, l);
        break;
      case 30:
        u && (n = l.alternate, n !== null && (ea(n.child, !0), ea(l.child, !0))), Yl(
          t,
          l,
          a,
          e
        );
        break;
      default:
        Yl(
          t,
          l,
          a,
          e
        );
    }
  }
  function Pe(t, l, a, e, u) {
    for (u = u && ((l.subtreeFlags & 10256) !== 0 || !1), l = l.child; l !== null; ) {
      var n = t, i = l, c = a, f = e, h = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          Pe(
            n,
            i,
            c,
            f,
            u
          ), $u(8, i);
          break;
        case 23:
          break;
        case 22:
          var b = i.stateNode;
          i.memoizedState !== null ? b._visibility & 2 ? Pe(
            n,
            i,
            c,
            f,
            u
          ) : ku(
            n,
            i
          ) : (b._visibility |= 2, Pe(
            n,
            i,
            c,
            f,
            u
          )), u && h & 2048 && Qf(
            i.alternate,
            i
          );
          break;
        case 24:
          Pe(
            n,
            i,
            c,
            f,
            u
          ), u && h & 2048 && Lf(i.alternate, i);
          break;
        default:
          Pe(
            n,
            i,
            c,
            f,
            u
          );
      }
      l = l.sibling;
    }
  }
  function ku(t, l) {
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; ) {
        var a = t, e = l, u = e.flags;
        switch (e.tag) {
          case 22:
            ku(a, e), u & 2048 && Qf(
              e.alternate,
              e
            );
            break;
          case 24:
            ku(a, e), u & 2048 && Lf(e.alternate, e);
            break;
          default:
            ku(a, e);
        }
        l = l.sibling;
      }
  }
  var Te = 8192;
  function Ee(t, l, a) {
    if (t.subtreeFlags & Te)
      for (t = t.child; t !== null; )
        Fm(
          t,
          l,
          a
        ), t = t.sibling;
  }
  function Fm(t, l, a) {
    switch (t.tag) {
      case 26:
        Ee(
          t,
          l,
          a
        ), t.flags & Te && (t.memoizedState !== null ? Eh(
          a,
          Kl,
          t.memoizedState,
          t.memoizedProps
        ) : (t = t.stateNode, (l & 335544128) === l && ad(a, t)));
        break;
      case 5:
        Ee(
          t,
          l,
          a
        ), t.flags & Te && (t = t.stateNode, (l & 335544128) === l && ad(a, t));
        break;
      case 3:
      case 4:
        var e = Kl;
        Kl = nn(t.stateNode.containerInfo), Ee(
          t,
          l,
          a
        ), Kl = e;
        break;
      case 22:
        t.memoizedState === null && (e = t.alternate, e !== null && e.memoizedState !== null ? (e = Te, Te = 16777216, Ee(
          t,
          l,
          a
        ), Te = e) : Ee(
          t,
          l,
          a
        ));
        break;
      case 30:
        if ((t.flags & Te) !== 0 && (e = t.memoizedProps.name, e != null && e !== "auto")) {
          var u = t.stateNode;
          u.paired = null, Ol === null && (Ol = /* @__PURE__ */ new Map()), Ol.set(e, u);
        }
        Ee(
          t,
          l,
          a
        );
        break;
      default:
        Ee(
          t,
          l,
          a
        );
    }
  }
  function Wm(t) {
    var l = t.alternate;
    if (l !== null && (t = l.child, t !== null)) {
      l.child = null;
      do
        l = t.sibling, t.sibling = null, t = l;
      while (t !== null);
    }
  }
  function Iu(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var a = 0; a < l.length; a++) {
          var e = l[a];
          $t = e, Im(
            e,
            t
          );
        }
      Wm(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        km(t), t = t.sibling;
  }
  function km(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Iu(t), t.flags & 2048 && La(9, t, t.return);
        break;
      case 3:
        Iu(t);
        break;
      case 12:
        Iu(t);
        break;
      case 22:
        var l = t.stateNode;
        t.memoizedState !== null && l._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (l._visibility &= -3, zi(t)) : Iu(t);
        break;
      default:
        Iu(t);
    }
  }
  function zi(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var a = 0; a < l.length; a++) {
          var e = l[a];
          $t = e, Im(
            e,
            t
          );
        }
      Wm(t);
    }
    for (t = t.child; t !== null; ) {
      switch (l = t, l.tag) {
        case 0:
        case 11:
        case 15:
          La(8, l, l.return), zi(l);
          break;
        case 22:
          a = l.stateNode, a._visibility & 2 && (a._visibility &= -3, zi(l));
          break;
        default:
          zi(l);
      }
      t = t.sibling;
    }
  }
  function Im(t, l) {
    for (; $t !== null; ) {
      var a = $t;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          La(8, a, l);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var e = a.memoizedState.cachePool.pool;
            e != null && e.refCount++;
          }
          break;
        case 24:
          ju(a.memoizedState.cache);
      }
      if (e = a.child, e !== null) e.return = a, $t = e;
      else
        t: for (a = t; $t !== null; ) {
          e = $t;
          var u = e.sibling, n = e.return;
          if (Qm(e), e === a) {
            $t = null;
            break t;
          }
          if (u !== null) {
            u.return = n, $t = u;
            break t;
          }
          $t = n;
        }
    }
  }
  var hy = {
    getCacheForType: function(t) {
      var l = kt(Bt), a = l.data.get(t);
      return a === void 0 && (a = t(), l.data.set(t, a)), a;
    },
    cacheSignal: function() {
      return kt(Bt).controller.signal;
    }
  }, gy = typeof WeakMap == "function" ? WeakMap : Map, rt = 0, Tt = null, tt = null, at = 0, yt = 0, Al = null, Va = !1, tu = !1, Zf = !1, za = 0, Ut = 0, Ka = 0, _e = 0, Ni = 0, Ml = 0, lu = 0, Pu = null, hl = null, Vf = !1, Oi = 0, Pm = 0, Ai = 1 / 0, Mi = null, wa = null, pt = 0, Jl = null, ze = null, ca = 0, Kf = 0, wf = null, t0 = null, au = null, eu = null, uu = null, tn = 0, pi = null;
  function pl() {
    return (rt & 2) !== 0 && at !== 0 ? at & -at : O.T !== null ? as() : ao();
  }
  function l0() {
    if (Ml === 0)
      if ((at & 536870912) === 0 || P) {
        var t = _n;
        _n <<= 1, (_n & 3932160) === 0 && (_n = 262144), Ml = t;
      } else Ml = 536870912;
    return t = It.current, t !== null && (t.flags |= 32), Ml;
  }
  function nu(t, l) {
    if (l != null) {
      var a = t.stateNode, e = a.ref;
      e === null && (e = a.ref = j0(
        da(t.memoizedProps, a)
      )), eu === null && (eu = []), eu.push(l.bind(null, e));
    }
  }
  function gl(t, l, a) {
    (t === Tt && (yt === 2 || yt === 9) || t.cancelPendingCommit !== null) && (iu(t, 0), Ja(
      t,
      at,
      Ml,
      !1
    )), Eu(t, a), ((rt & 2) === 0 || t !== Tt) && (t === Tt && ((rt & 2) === 0 && (_e |= a), Ut === 4 && Ja(
      t,
      at,
      Ml,
      !1
    )), fa(t));
  }
  function a0(t, l, a) {
    if ((rt & 6) !== 0) throw Error(s(327));
    var e = !a && (l & 127) === 0 && (l & t.expiredLanes) === 0 || Tu(t, l), u = e ? Ty(t, l) : $f(t, l, !0), n = e;
    do {
      if (u === 0) {
        tu && !e && Ja(t, l, 0, !1);
        break;
      } else {
        if (a = t.current.alternate, n && !Sy(a)) {
          u = $f(t, l, !1), n = !1;
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
              u = Pu;
              var f = c.current.memoizedState.isDehydrated;
              if (f && (iu(c, i).flags |= 256), i = $f(
                c,
                i,
                !1
              ), i !== 2 && i !== 6) {
                if (Zf && !f) {
                  c.errorRecoveryDisabledLanes |= n, _e |= n, u = 4;
                  break t;
                }
                n = hl, hl = u, n !== null && (hl === null ? hl = n : hl.push.apply(
                  hl,
                  n
                ));
              }
              u = i;
            }
            if (n = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          iu(t, 0), Ja(t, l, 0, !0);
          break;
        }
        t: {
          switch (e = t, n = u, n) {
            case 0:
            case 1:
              throw Error(s(345));
            case 4:
              if ((l & 4194048) !== l && (l & 62914560) !== l)
                break;
            case 6:
              Ja(
                e,
                l,
                Ml,
                !Va
              );
              break t;
            case 2:
              hl = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((l & 62914560) === l && (u = Oi + 300 - bl(), 10 < u)) {
            if (Ja(
              e,
              l,
              Ml,
              !Va
            ), Nn(e, 0, !0) !== 0) break t;
            ca = l, e.timeoutHandle = ds(
              e0.bind(
                null,
                e,
                a,
                hl,
                Mi,
                Vf,
                l,
                Ml,
                _e,
                lu,
                Va,
                n,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break t;
          }
          e0(
            e,
            a,
            hl,
            Mi,
            Vf,
            l,
            Ml,
            _e,
            lu,
            Va,
            n,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    fa(t);
  }
  function e0(t, l, a, e, u, n, i, c, f, h, b, N, v, S) {
    t.timeoutHandle = -1;
    var p = l.subtreeFlags, q = (n & 335544064) === n;
    if (N = null, (q || p & 8192 || (p & 16785408) === 16785408) && (N = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: Il
    }, Ol = null, Fm(
      l,
      n,
      N
    ), q && (p = N, q = t.containerInfo, q = (q.nodeType === 9 ? q : q.ownerDocument).__reactViewTransition, q != null && (p.count++, p.waitingForViewTransition = !0, p = sn.bind(p), q.finished.then(p, p))), p = (n & 62914560) === n ? Oi - bl() : (n & 4194048) === n ? Pm - bl() : 0, p = _h(
      N,
      p
    ), p !== null)) {
      ca = n, t.cancelPendingCommit = p(
        r0.bind(
          null,
          t,
          l,
          n,
          a,
          e,
          u,
          i,
          c,
          f,
          h,
          b,
          N,
          null,
          v,
          S
        )
      ), Ja(t, n, i, !h);
      return;
    }
    r0(
      t,
      l,
      n,
      a,
      e,
      u,
      i,
      c,
      f,
      h,
      b,
      N
    );
  }
  function Sy(t) {
    for (var l = t; ; ) {
      var a = l.tag;
      if ((a === 0 || a === 11 || a === 15) && l.flags & 16384 && (a = l.updateQueue, a !== null && (a = a.stores, a !== null)))
        for (var e = 0; e < a.length; e++) {
          var u = a[e], n = u.getSnapshot;
          u = u.value;
          try {
            if (!zl(n(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (a = l.child, l.subtreeFlags & 16384 && a !== null)
        a.return = l, l = a;
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
  function Ja(t, l, a, e) {
    l = ks(t, l), l &= ~Ni, l &= ~_e, t.suspendedLanes |= l, t.pingedLanes &= ~l, e && (t.warmLanes |= l), e = t.expirationTimes;
    for (var u = l; 0 < u; ) {
      var n = 31 - El(u), i = 1 << n;
      e[n] = -1, u &= ~i;
    }
    a !== 0 && Ps(t, a, l);
  }
  function Di() {
    return (rt & 6) === 0 ? (ln(0), !1) : !0;
  }
  function Jf() {
    if (tt !== null) {
      if (yt === 0)
        var t = tt.return;
      else
        t = tt, ga = oe = null, tf(t), we = null, Yu = 0, t = tt;
      for (; t !== null; )
        Am(t.alternate, t), t = t.return;
      tt = null;
    }
  }
  function iu(t, l) {
    var a = t.timeoutHandle;
    return a !== -1 && (t.timeoutHandle = -1, Ly(a)), a = t.cancelPendingCommit, a !== null && (t.cancelPendingCommit = null, a()), ca = 0, Jf(), Tt = t, tt = a = ya(t.current, null), at = l, yt = 0, Al = null, Va = !1, tu = Tu(t, l), Zf = !1, lu = Ml = Ni = _e = Ka = Ut = 0, hl = Pu = null, Vf = !1, za = ks(t, l), qn(), a;
  }
  function u0(t, l) {
    k = null, O.H = fi, l === Ke || l === $n ? (l = rr(), yt = 3) : l === Qc ? (l = rr(), yt = 4) : yt = l === hf ? 8 : l !== null && typeof l == "object" && typeof l.then == "function" ? 6 : 1, Al = l, tt === null && (Ut = 1, si(
      t,
      xl(l, t.current)
    ));
  }
  function n0() {
    var t = It.current;
    return t === null ? !0 : (at & 4194048) === at ? el === null : (at & 62914560) === at || (at & 536870912) !== 0 ? t === el : !1;
  }
  function i0() {
    var t = O.H;
    return O.H = fi, t === null ? fi : t;
  }
  function c0() {
    var t = O.A;
    return O.A = hy, t;
  }
  function Ci() {
    Ut = 4, Va || (at & 4194048) !== at && It.current !== null || (tu = !0), (Ka & 134217727) === 0 && (_e & 134217727) === 0 || Tt === null || Ja(
      Tt,
      at,
      Ml,
      !1
    );
  }
  function $f(t, l, a) {
    var e = rt;
    rt |= 2;
    var u = i0(), n = c0();
    (Tt !== t || at !== l) && (Mi = null, iu(t, l)), l = !1;
    var i = Ut;
    t: do
      try {
        if (yt !== 0 && tt !== null) {
          var c = tt, f = Al;
          switch (yt) {
            case 8:
              Jf(), i = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              It.current === null && (l = !0);
              var h = yt;
              if (yt = 0, Al = null, cu(t, c, f, h), a && tu) {
                i = 0;
                break t;
              }
              break;
            default:
              h = yt, yt = 0, Al = null, cu(t, c, f, h);
          }
        }
        by(), i = Ut;
        break;
      } catch (b) {
        u0(t, b);
      }
    while (!0);
    return l && t.shellSuspendCounter++, ga = oe = null, rt = e, O.H = u, O.A = n, tt === null && (Tt = null, at = 0, qn()), i;
  }
  function by() {
    for (; tt !== null; ) f0(tt);
  }
  function Ty(t, l) {
    var a = rt;
    rt |= 2;
    var e = i0(), u = c0();
    Tt !== t || at !== l ? (Mi = null, Ai = bl() + 500, iu(t, l)) : tu = Tu(
      t,
      l
    );
    t: do
      try {
        if (yt !== 0 && tt !== null) {
          l = tt;
          var n = Al;
          l: switch (yt) {
            case 1:
              yt = 0, Al = null, cu(t, l, n, 1);
              break;
            case 2:
            case 9:
              if (sr(n)) {
                yt = 0, Al = null, s0(l);
                break;
              }
              l = function() {
                yt !== 2 && yt !== 9 || Tt !== t || (yt = 7), fa(t);
              }, n.then(l, l);
              break t;
            case 3:
              yt = 7;
              break t;
            case 4:
              yt = 5;
              break t;
            case 7:
              sr(n) ? (yt = 0, Al = null, s0(l)) : (yt = 0, Al = null, cu(t, l, n, 7));
              break;
            case 5:
              var i = null;
              switch (tt.tag) {
                case 26:
                  i = tt.memoizedState;
                case 5:
                case 27:
                  var c = tt;
                  if (i ? td(i) : c.stateNode.complete) {
                    yt = 0, Al = null;
                    var f = c.sibling;
                    if (f !== null) tt = f;
                    else {
                      var h = c.return;
                      h !== null ? (tt = h, Ui(h)) : tt = null;
                    }
                    break l;
                  }
              }
              yt = 0, Al = null, cu(t, l, n, 5);
              break;
            case 6:
              yt = 0, Al = null, cu(t, l, n, 6);
              break;
            case 8:
              Jf(), Ut = 6;
              break t;
            default:
              throw Error(s(462));
          }
        }
        Ey();
        break;
      } catch (b) {
        u0(t, b);
      }
    while (!0);
    return ga = oe = null, O.H = e, O.A = u, rt = a, tt !== null ? 0 : (Tt = null, at = 0, qn(), Ut);
  }
  function Ey() {
    for (; tt !== null && !Yd(); )
      f0(tt);
  }
  function f0(t) {
    var l = Nm(t.alternate, t, za);
    t.memoizedProps = t.pendingProps, l === null ? Ui(t) : tt = l;
  }
  function s0(t) {
    var l = t, a = l.alternate;
    switch (l.tag) {
      case 15:
      case 0:
        l = gm(
          a,
          l,
          l.pendingProps,
          l.type,
          void 0,
          at
        );
        break;
      case 11:
        l = gm(
          a,
          l,
          l.pendingProps,
          l.type.render,
          l.ref,
          at
        );
        break;
      case 5:
        tf(l);
        var e = l;
        e === wt && (P ? (Zn(e), e.tag === 5 && e.stateNode != null && (Nt = e.stateNode)) : (Zn(e), P = !0));
      default:
        Am(a, l), l = tt = Io(l, za), l = Nm(a, l, za);
    }
    t.memoizedProps = t.pendingProps, l === null ? Ui(t) : tt = l;
  }
  function cu(t, l, a, e) {
    ga = oe = null, tf(l), we = null, Yu = 0;
    var u = l.return;
    try {
      if (fy(
        t,
        u,
        l,
        a,
        at
      )) {
        Ut = 1, si(
          t,
          xl(a, t.current)
        ), tt = null;
        return;
      }
    } catch (n) {
      if (u !== null) throw tt = u, n;
      Ut = 1, si(
        t,
        xl(a, t.current)
      ), tt = null;
      return;
    }
    l.flags & 32768 ? (P || e === 1 ? t = !0 : tu || (at & 536870912) !== 0 ? t = !1 : (Va = t = !0, (e === 2 || e === 9 || e === 3 || e === 6) && (e = It.current, e !== null && e.tag === 13 && (e.flags |= 16384))), o0(l, t)) : Ui(l);
  }
  function Ui(t) {
    var l = t;
    do {
      if ((l.flags & 32768) !== 0) {
        o0(
          l,
          Va
        );
        return;
      }
      t = l.return;
      var a = my(
        l.alternate,
        l,
        za
      );
      if (a !== null) {
        tt = a;
        return;
      }
      if (l = l.sibling, l !== null) {
        tt = l;
        return;
      }
      tt = l = t;
    } while (l !== null);
    Ut === 0 && (Ut = 5);
  }
  function o0(t, l) {
    do {
      var a = dy(t.alternate, t);
      if (a !== null) {
        a.flags &= 32767, tt = a;
        return;
      }
      if (a = t.return, a !== null && (a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null), !l && (t = t.sibling, t !== null)) {
        tt = t;
        return;
      }
      tt = t = a;
    } while (t !== null);
    Ut = 6, tt = null;
  }
  function r0(t, l, a, e, u, n, i, c, f, h, b, N) {
    t.cancelPendingCommit = null;
    do
      Ri();
    while (pt !== 0);
    if ((rt & 6) !== 0) throw Error(s(327));
    if (l !== null) {
      if (l === t.current) throw Error(s(177));
      t === Tt && (tt = Tt = null, at = 0), ze = l, Jl = t, ca = a, wf = u, t0 = e, _y(
        t,
        l,
        a,
        i,
        c,
        f,
        N
      );
    }
  }
  function _y(t, l, a, e, u, n, i) {
    var c = l.lanes | l.childLanes;
    if (Kf = c, c |= pc, $d(
      t,
      a,
      c,
      e,
      u,
      n
    ), eu = null, (a & 335544064) === a ? (uu = Wv(t), e = 10262) : (uu = null, e = 10256), (l.subtreeFlags & e) !== 0 || (l.flags & e) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, py(Tn, function() {
      return If(), null;
    })) : (t.callbackNode = null, t.callbackPriority = 0), gi = !1, e = (l.flags & 13878) !== 0, (l.subtreeFlags & 13878) !== 0 || e) {
      e = O.T, O.T = null, u = U.p, U.p = 2, n = rt, rt |= 4;
      try {
        vy(t, l, a);
      } finally {
        rt = n, U.p = u, O.T = e;
      }
    }
    pt = 1, gi ? au = $y(
      i,
      t.containerInfo,
      uu,
      Ff,
      Wf,
      Ny,
      kf,
      If,
      zy
    ) : (Ff(), Wf(), kf());
  }
  function zy(t) {
    if (pt !== 0) {
      var l = Jl.onRecoverableError;
      l(t, { componentStack: null });
    }
  }
  function Ny() {
    pt === 3 && (pt = 0, Jm(ze, Jl), pt = 4);
  }
  function Ff() {
    if (pt === 1) {
      pt = 0;
      var t = Jl, l = ze, a = ca, e = (l.flags & 13878) !== 0;
      if ((l.subtreeFlags & 13878) !== 0 || e) {
        e = O.T, O.T = null;
        var u = U.p;
        U.p = 2;
        var n = rt;
        rt |= 4;
        try {
          Wu = Ti = !1, Km(l, t, a), a = os;
          var i = Lo(t.containerInfo), c = a.focusedElem, f = a.selectionRange;
          if (i !== c && c && c.ownerDocument && Qo(
            c.ownerDocument.documentElement,
            c
          )) {
            if (f !== null && zc(c)) {
              var h = f.start, b = f.end;
              if (b === void 0 && (b = h), "selectionStart" in c)
                c.selectionStart = h, c.selectionEnd = Math.min(
                  b,
                  c.value.length
                );
              else {
                var N = c.ownerDocument || document, v = N && N.defaultView || window;
                if (v.getSelection) {
                  var S = v.getSelection(), p = c.textContent.length, q = Math.min(f.start, p), I = f.end === void 0 ? q : Math.min(f.end, p);
                  !S.extend && q > I && (i = I, I = q, q = i);
                  var y = Xo(
                    c,
                    q
                  ), o = Xo(
                    c,
                    I
                  );
                  if (y && o && (S.rangeCount !== 1 || S.anchorNode !== y.node || S.anchorOffset !== y.offset || S.focusNode !== o.node || S.focusOffset !== o.offset)) {
                    var g = N.createRange();
                    g.setStart(y.node, y.offset), S.removeAllRanges(), q > I ? (S.addRange(g), S.extend(o.node, o.offset)) : (g.setEnd(o.node, o.offset), S.addRange(g));
                  }
                }
              }
            }
            for (N = [], S = c; S = S.parentNode; )
              S.nodeType === 1 && N.push({
                element: S,
                left: S.scrollLeft,
                top: S.scrollTop
              });
            for (typeof c.focus == "function" && c.focus(), c = 0; c < N.length; c++) {
              var z = N[c];
              z.element.scrollLeft = z.left, z.element.scrollTop = z.top;
            }
          }
          yu = !!ss, os = ss = null;
        } finally {
          rt = n, U.p = u, O.T = e;
        }
      }
      t.current = l, pt = 2;
    }
  }
  function Wf() {
    if (pt === 2) {
      pt = 0;
      var t = Jl, l = ze, a = (l.flags & 8772) !== 0;
      if ((l.subtreeFlags & 8772) !== 0 || a) {
        a = O.T, O.T = null;
        var e = U.p;
        U.p = 2;
        var u = rt;
        rt |= 4;
        try {
          Gm(t, l.alternate, l);
        } finally {
          rt = u, U.p = e, O.T = a;
        }
      }
      pt = 3;
    }
  }
  function kf() {
    if (pt === 4 || pt === 3) {
      pt = 0;
      var t = au;
      au = null, Gd();
      var l = Jl, a = ze, e = ca, u = t0, n = (e & 335544064) === e ? 10262 : 10256;
      if ((a.subtreeFlags & n) !== 0 || (a.flags & n) !== 0 ? pt = 5 : (pt = 0, ze = Jl = null, m0(l, l.pendingLanes)), n = l.pendingLanes, n === 0 && (wa = null), nc(e), a = a.stateNode, Tl && typeof Tl.onCommitFiberRoot == "function")
        try {
          Tl.onCommitFiberRoot(
            bu,
            a,
            void 0,
            (a.current.flags & 128) === 128
          );
        } catch {
        }
      if (u !== null) {
        a = O.T, n = U.p, U.p = 2, O.T = null;
        try {
          for (var i = l.onRecoverableError, c = 0; c < u.length; c++) {
            var f = u[c];
            i(f.value, {
              componentStack: f.stack
            });
          }
        } finally {
          O.T = a, U.p = n;
        }
      }
      if (u = eu, i = uu, uu = null, u !== null && (eu = null, i === null && (i = []), t !== null))
        for (f = 0; f < u.length; f++)
          a = (0, u[f])(
            i
          ), a !== void 0 && t.finished.finally(a);
      (ca & 3) !== 0 && Ri(), fa(l), n = l.pendingLanes, (e & 261930) !== 0 && (n & 42) !== 0 ? l === pi ? tn++ : (tn = 0, pi = l) : (tn = 0, pi = null), ln(0);
    }
  }
  function m0(t, l) {
    (t.pooledCacheLanes &= l) === 0 && (l = t.pooledCache, l != null && (t.pooledCache = null, ju(l)));
  }
  function Ri() {
    return au !== null && (au.skipTransition(), au = null), Ff(), Wf(), kf(), If();
  }
  function If() {
    if (pt !== 5) return !1;
    var t = Jl, l = Kf;
    Kf = 0;
    var a = nc(ca), e = O.T, u = U.p;
    try {
      U.p = 32 > a ? 32 : a, O.T = null, a = wf, wf = null;
      var n = Jl, i = ca;
      if (pt = 0, ze = Jl = null, ca = 0, (rt & 6) !== 0) throw Error(s(331));
      var c = rt;
      if (rt |= 4, km(n.current), $m(
        n,
        n.current,
        i,
        a
      ), rt = c, ln(0, !1), Tl && typeof Tl.onPostCommitFiberRoot == "function")
        try {
          Tl.onPostCommitFiberRoot(bu, n);
        } catch {
        }
      return !0;
    } finally {
      U.p = u, O.T = e, m0(t, l);
    }
  }
  function d0(t, l, a) {
    l = xl(a, l), l = yf(t.stateNode, l, 2), t = Ya(t, l, 2), t !== null && (Eu(t, 2), fa(t));
  }
  function ht(t, l, a) {
    if (t.tag === 3)
      d0(t, t, a);
    else
      for (; l !== null; ) {
        if (l.tag === 3) {
          d0(
            l,
            t,
            a
          );
          break;
        } else if (l.tag === 1) {
          var e = l.stateNode;
          if (typeof l.type.getDerivedStateFromError == "function" || typeof e.componentDidCatch == "function" && (wa === null || !wa.has(e))) {
            t = xl(a, t), a = sm(2), e = Ya(l, a, 2), e !== null && (om(
              a,
              e,
              l,
              t
            ), Eu(e, 2), fa(e));
            break;
          }
        }
        l = l.return;
      }
  }
  function Pf(t, l, a) {
    var e = t.pingCache;
    if (e === null) {
      e = t.pingCache = new gy();
      var u = /* @__PURE__ */ new Set();
      e.set(l, u);
    } else
      u = e.get(l), u === void 0 && (u = /* @__PURE__ */ new Set(), e.set(l, u));
    u.has(a) || (Zf = !0, u.add(a), t = Oy.bind(null, t, l, a), l.then(t, t));
  }
  function Oy(t, l, a) {
    var e = t.pingCache;
    e !== null && e.delete(l), t.pingedLanes |= t.suspendedLanes & a, t.warmLanes &= ~a, Tt === t && (at & a) === a && ((Ut === 4 || Ut === 3 && (at & 62914560) === at && 300 > bl() - Oi) && (rt & 2) === 0 ? iu(t, 0) : Ni |= a, lu === at && (lu = 0)), fa(t);
  }
  function v0(t, l) {
    l === 0 && (l = Is()), t = ce(t, l), t !== null && (Eu(t, l), fa(t));
  }
  function Ay(t) {
    var l = t.memoizedState, a = 0;
    l !== null && (a = l.retryLane), v0(t, a);
  }
  function My(t, l) {
    var a = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var e = t.stateNode, u = t.memoizedState;
        u !== null && (a = u.retryLane);
        break;
      case 19:
        e = t.stateNode;
        break;
      case 22:
        e = t.stateNode._retryCache;
        break;
      default:
        throw Error(s(314));
    }
    e !== null && e.delete(l), v0(t, a);
  }
  function py(t, l) {
    return lc(t, l);
  }
  var fu = null, su = null, ts = !1, Hi = !1, ls = !1, $a = 0;
  function fa(t) {
    t !== su && t.next === null && (su === null ? fu = su = t : su = su.next = t), Hi = !0, ts || (ts = !0, Cy());
  }
  function ln(t, l) {
    if (!ls && Hi) {
      ls = !0;
      do
        for (var a = !1, e = fu; e !== null; ) {
          if (t !== 0) {
            var u = e.pendingLanes;
            if (u === 0) var n = 0;
            else {
              var i = e.suspendedLanes, c = e.pingedLanes;
              n = (1 << 31 - El(42 | t) + 1) - 1, n &= u & ~(i & ~c), n = n & 201326741 ? n & 201326741 | 1 : n ? n | 2 : 0;
            }
            n !== 0 && (a = !0, S0(e, n));
          } else
            n = at, n = Nn(
              e,
              e === Tt ? n : 0,
              e.cancelPendingCommit !== null || e.timeoutHandle !== -1
            ), (n & 3) === 0 || Tu(e, n) || (a = !0, S0(e, n));
          e = e.next;
        }
      while (a);
      ls = !1;
    }
  }
  function Dy() {
    y0();
  }
  function y0() {
    Hi = ts = !1;
    var t = 0;
    $a !== 0 && Qy() && (t = $a);
    for (var l = bl(), a = null, e = fu; e !== null; ) {
      var u = e.next, n = h0(e, l);
      n === 0 ? (e.next = null, a === null ? fu = u : a.next = u, u === null && (su = a)) : (a = e, (t !== 0 || (n & 3) !== 0) && (Hi = !0)), e = u;
    }
    pt !== 0 && pt !== 5 || ln(t), $a !== 0 && ($a = 0);
  }
  function h0(t, l) {
    for (var a = t.suspendedLanes, e = t.pingedLanes, u = t.expirationTimes, n = t.pendingLanes & -62914561; 0 < n; ) {
      var i = 31 - El(n), c = 1 << i, f = u[i];
      f === -1 ? ((c & a) === 0 || (c & e) !== 0) && (u[i] = Jd(c, l)) : f <= l && (t.expiredLanes |= c), n &= ~c;
    }
    if (l = Tt, a = at, a = Nn(
      t,
      t === l ? a : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), e = t.callbackNode, a === 0 || t === l && (yt === 2 || yt === 9) || t.cancelPendingCommit !== null)
      return e !== null && e !== null && ac(e), t.callbackNode = null, t.callbackPriority = 0;
    if ((a & 3) === 0 || Tu(t, a)) {
      if (l = a & -a, l === t.callbackPriority) return l;
      switch (e !== null && ac(e), nc(a)) {
        case 2:
        case 8:
          a = Fs;
          break;
        case 32:
          a = Tn;
          break;
        case 268435456:
          a = Ws;
          break;
        default:
          a = Tn;
      }
      return e = g0.bind(null, t), a = lc(a, e), t.callbackPriority = l, t.callbackNode = a, l;
    }
    return e !== null && e !== null && ac(e), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function g0(t, l) {
    if (pt !== 0 && pt !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var a = t.callbackNode;
    if (Ri() && t.callbackNode !== a)
      return null;
    var e = at;
    return e = Nn(
      t,
      t === Tt ? e : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), e === 0 ? null : (a0(t, e, l), h0(t, bl()), t.callbackNode != null && t.callbackNode === a ? g0.bind(null, t) : null);
  }
  function S0(t, l) {
    if (Ri()) return null;
    a0(t, l, !0);
  }
  function Cy() {
    Zy(function() {
      (rt & 6) !== 0 ? lc(
        $s,
        Dy
      ) : y0();
    });
  }
  function as() {
    if ($a === 0) {
      var t = de;
      t === 0 && (t = En, En <<= 1, (En & 261888) === 0 && (En = 256)), $a = t;
    }
    return $a;
  }
  function b0(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : Dn(t);
  }
  function Uy(t, l, a, e, u) {
    if (l === "submit" && a && a.stateNode === u) {
      var n = b0(
        (u[ml] || null).action
      ), i = e.submitter;
      i && (l = (l = i[ml] || null) ? b0(l.formAction) : i.getAttribute("formAction"), l !== null && (n = l, i = null));
      var c = new Hn(
        "action",
        "action",
        null,
        e,
        u
      );
      t.push({
        event: c,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (e.defaultPrevented) {
                if ($a !== 0) {
                  var f = new FormData(u, i);
                  of(
                    a,
                    {
                      pending: !0,
                      data: f,
                      method: u.method,
                      action: n
                    },
                    null,
                    f
                  );
                }
              } else
                typeof n == "function" && (c.preventDefault(), f = new FormData(u, i), of(
                  a,
                  {
                    pending: !0,
                    data: f,
                    method: u.method,
                    action: n
                  },
                  n,
                  f
                ));
            },
            currentTarget: u
          }
        ]
      });
    }
  }
  for (var es = 0; es < Mc.length; es++) {
    var us = Mc[es], Ry = us.toLowerCase(), Hy = us[0].toUpperCase() + us.slice(1);
    Zl(
      Ry,
      "on" + Hy
    );
  }
  Zl(Ko, "onAnimationEnd"), Zl(wo, "onAnimationIteration"), Zl(Jo, "onAnimationStart"), Zl("dblclick", "onDoubleClick"), Zl("focusin", "onFocus"), Zl("focusout", "onBlur"), Zl(Lv, "onTransitionRun"), Zl(Zv, "onTransitionStart"), Zl(Vv, "onTransitionCancel"), Zl($o, "onTransitionEnd"), Ue("onMouseEnter", ["mouseout", "mouseover"]), Ue("onMouseLeave", ["mouseout", "mouseover"]), Ue("onPointerEnter", ["pointerout", "pointerover"]), Ue("onPointerLeave", ["pointerout", "pointerover"]), ue(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), ue(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), ue("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), ue(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), ue(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), ue(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var an = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), xy = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(an)
  );
  function T0(t, l) {
    l = (l & 4) !== 0;
    for (var a = 0; a < t.length; a++) {
      var e = t[a], u = e.event;
      e = e.listeners;
      t: {
        var n = void 0;
        if (l)
          for (var i = e.length - 1; 0 <= i; i--) {
            var c = e[i], f = c.instance, h = c.currentTarget;
            if (c = c.listener, f !== n && u.isPropagationStopped())
              break t;
            n = c, u.currentTarget = h;
            try {
              n(u);
            } catch (b) {
              Bn(b);
            }
            u.currentTarget = null, n = f;
          }
        else
          for (i = 0; i < e.length; i++) {
            if (c = e[i], f = c.instance, h = c.currentTarget, c = c.listener, f !== n && u.isPropagationStopped())
              break t;
            n = c, u.currentTarget = h;
            try {
              n(u);
            } catch (b) {
              Bn(b);
            }
            u.currentTarget = null, n = f;
          }
      }
    }
  }
  function lt(t, l) {
    var a = l[uo];
    a === void 0 && (a = l[uo] = /* @__PURE__ */ new Set());
    var e = t + "__bubble";
    a.has(e) || (E0(l, t, 2, !1), a.add(e));
  }
  function ns(t, l, a) {
    var e = 0;
    l && (e |= 4), E0(
      a,
      t,
      e,
      l
    );
  }
  var xi = "_reactListening" + Math.random().toString(36).slice(2);
  function is(t) {
    if (!t[xi]) {
      t[xi] = !0, co.forEach(function(a) {
        a !== "selectionchange" && (xy.has(a) || ns(a, !1, t), ns(a, !0, t));
      });
      var l = t.nodeType === 9 ? t : t.ownerDocument;
      l === null || l[xi] || (l[xi] = !0, ns("selectionchange", !1, l));
    }
  }
  function E0(t, l, a, e) {
    switch (od(l)) {
      case 2:
        var u = Ah;
        break;
      case 8:
        u = Mh;
        break;
      default:
        u = As;
    }
    a = u.bind(
      null,
      l,
      a,
      t
    ), u = void 0, !dc || l !== "touchstart" && l !== "touchmove" && l !== "wheel" || (u = !0), e ? u !== void 0 ? t.addEventListener(l, a, {
      capture: !0,
      passive: u
    }) : t.addEventListener(l, a, !0) : u !== void 0 ? t.addEventListener(l, a, {
      passive: u
    }) : t.addEventListener(l, a, !1);
  }
  function cs(t, l, a, e, u) {
    var n = e;
    if ((l & 1) === 0 && (l & 2) === 0 && e !== null)
      t: for (; ; ) {
        if (e === null) return;
        var i = e.tag;
        if (i === 3 || i === 4) {
          var c = e.stateNode.containerInfo;
          if (c === u) break;
          if (i === 4)
            for (i = e.return; i !== null; ) {
              var f = i.tag;
              if ((f === 3 || f === 4) && i.stateNode.containerInfo === u)
                return;
              i = i.return;
            }
          for (; c !== null; ) {
            if (i = ee(c), i === null) return;
            if (f = i.tag, f === 5 || f === 6 || f === 26 || f === 27) {
              e = n = i;
              continue t;
            }
            c = c.parentNode;
          }
        }
        e = e.return;
      }
    Eo(function() {
      var h = n, b = rc(a), N = [];
      t: {
        var v = Fo.get(t);
        if (v !== void 0) {
          var S = Hn, p = t;
          switch (t) {
            case "keypress":
              if (Un(a) === 0) break t;
            case "keydown":
            case "keyup":
              S = Sv;
              break;
            case "focusin":
              p = "focus", S = gc;
              break;
            case "focusout":
              p = "blur", S = gc;
              break;
            case "beforeblur":
            case "afterblur":
              S = gc;
              break;
            case "click":
              if (a.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              S = No;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              S = iv;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              S = zv;
              break;
            case Ko:
            case wo:
            case Jo:
              S = sv;
              break;
            case $o:
              S = Ov;
              break;
            case "scroll":
            case "scrollend":
              S = uv;
              break;
            case "wheel":
              S = Mv;
              break;
            case "copy":
            case "cut":
            case "paste":
              S = rv;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              S = Ao;
              break;
            case "submit":
              S = Ev;
              break;
            case "toggle":
            case "beforetoggle":
              S = Dv;
          }
          var q = (l & 4) !== 0, I = !q && (t === "scroll" || t === "scrollend"), y = q ? v !== null ? v + "Capture" : null : v;
          q = [];
          for (var o = h, g; o !== null; ) {
            var z = o;
            if (g = z.stateNode, z = z.tag, z !== 5 && z !== 26 && z !== 27 || g === null || y === null || (z = Nu(o, y), z != null && q.push(
              en(o, z, g)
            )), I) break;
            o = o.return;
          }
          0 < q.length && (v = new S(
            v,
            p,
            null,
            a,
            b
          ), N.push({ event: v, listeners: q }));
        }
      }
      if ((l & 7) === 0) {
        t: {
          if (S = t === "mouseover" || t === "pointerover", v = t === "mouseout" || t === "pointerout", S && a !== oc && (p = a.relatedTarget || a.fromElement) && (ee(p) || p[pe]))
            break t;
          (v || S) && (p = b.window === b ? b : (S = b.ownerDocument) ? S.defaultView || S.parentWindow : window, v ? (S = a.relatedTarget || a.toElement, v = h, S = S ? ee(S) : null, S !== null && (I = _(S), q = S.tag, S !== I || q !== 5 && q !== 27 && q !== 6) && (S = null)) : (v = null, S = h), v !== S && (q = No, z = "onMouseLeave", y = "onMouseEnter", o = "mouse", (t === "pointerout" || t === "pointerover") && (q = Ao, z = "onPointerLeave", y = "onPointerEnter", o = "pointer"), I = v == null ? p : zu(v), g = S == null ? p : zu(S), p = new q(
            z,
            o + "leave",
            v,
            a,
            b
          ), p.target = I, p.relatedTarget = g, z = null, ee(b) === h && (q = new q(
            y,
            o + "enter",
            S,
            a,
            b
          ), q.target = g, q.relatedTarget = I, z = q), I = z, q = v && S ? Lt(
            v,
            S,
            jy
          ) : null, v !== null && _0(
            N,
            p,
            v,
            q,
            !1
          ), S !== null && I !== null && _0(
            N,
            I,
            S,
            q,
            !0
          )));
        }
        t: {
          if (v = h ? zu(h) : window, S = v.nodeName && v.nodeName.toLowerCase(), S === "select" || S === "input" && v.type === "file")
            var H = xo;
          else if (Ro(v))
            if (jo)
              H = Gv;
            else {
              H = qv;
              var et = Bv;
            }
          else
            S = v.nodeName, !S || S.toLowerCase() !== "input" || v.type !== "checkbox" && v.type !== "radio" ? h && sc(h.elementType) && (H = xo) : H = Yv;
          if (H && (H = H(t, h))) {
            Ho(
              N,
              H,
              a,
              b
            );
            break t;
          }
          et && et(t, v, h);
        }
        switch (et = h ? zu(h) : window, t) {
          case "focusin":
            (Ro(et) || et.contentEditable === "true") && (qe = et, Nc = h, Ru = null);
            break;
          case "focusout":
            Ru = Nc = qe = null;
            break;
          case "mousedown":
            Oc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Oc = !1, Zo(N, a, b);
            break;
          case "selectionchange":
            if (Qv) break;
          case "keydown":
          case "keyup":
            Zo(N, a, b);
        }
        var X;
        if (bc)
          t: {
            switch (t) {
              case "compositionstart":
                var w = "onCompositionStart";
                break t;
              case "compositionend":
                w = "onCompositionEnd";
                break t;
              case "compositionupdate":
                w = "onCompositionUpdate";
                break t;
            }
            w = void 0;
          }
        else
          Be ? Co(t, a) && (w = "onCompositionEnd") : t === "keydown" && a.keyCode === 229 && (w = "onCompositionStart");
        w && (Mo && a.locale !== "ko" && (Be || w !== "onCompositionStart" ? w === "onCompositionEnd" && Be && (X = _o()) : (Da = b, vc = "value" in Da ? Da.value : Da.textContent, Be = !0)), et = ji(h, w), 0 < et.length && (w = new Oo(
          w,
          t,
          null,
          a,
          b
        ), N.push({ event: w, listeners: et }), X ? w.data = X : (X = Uo(a), X !== null && (w.data = X)))), (X = Uv ? Rv(t, a) : Hv(t, a)) && (w = ji(h, "onBeforeInput"), 0 < w.length && (et = new Oo(
          "onBeforeInput",
          "beforeinput",
          null,
          a,
          b
        ), N.push({
          event: et,
          listeners: w
        }), et.data = X)), Uy(
          N,
          t,
          h,
          a,
          b
        );
      }
      T0(N, l);
    });
  }
  function en(t, l, a) {
    return {
      instance: t,
      listener: l,
      currentTarget: a
    };
  }
  function ji(t, l) {
    for (var a = l + "Capture", e = []; t !== null; ) {
      var u = t, n = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || n === null || (u = Nu(t, a), u != null && e.unshift(
        en(t, u, n)
      ), u = Nu(t, l), u != null && e.push(
        en(t, u, n)
      )), t.tag === 3) return e;
      t = t.return;
    }
    return [];
  }
  function jy(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function _0(t, l, a, e, u) {
    for (var n = l._reactName, i = []; a !== null && a !== e; ) {
      var c = a, f = c.alternate, h = c.stateNode;
      if (c = c.tag, f !== null && f === e) break;
      c !== 5 && c !== 26 && c !== 27 || h === null || (f = h, u ? (h = Nu(a, n), h != null && i.unshift(
        en(a, h, f)
      )) : u || (h = Nu(a, n), h != null && i.push(
        en(a, h, f)
      ))), a = a.return;
    }
    i.length !== 0 && t.push({ event: l, listeners: i });
  }
  var By = /\r\n?/g, qy = /\u0000|\uFFFD/g;
  function z0(t) {
    return (typeof t == "string" ? t : "" + t).replace(By, `
`).replace(qy, "");
  }
  function N0(t, l) {
    return l = z0(l), z0(t) === l;
  }
  function gt(t, l, a, e, u, n) {
    switch (a) {
      case "children":
        if (typeof e == "string")
          l === "body" || l === "textarea" && e === "" || He(t, e);
        else if (typeof e == "number" || typeof e == "bigint")
          l !== "body" && He(t, "" + e);
        else return;
        break;
      case "className":
        pn(t, "class", e);
        break;
      case "tabIndex":
        pn(t, "tabindex", e);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        pn(t, a, e);
        break;
      case "style":
        bo(t, e, n);
        return;
      case "data":
        if (l !== "object") {
          pn(t, "data", e);
          break;
        }
      case "src":
      case "href":
        if (e === "" && (l !== "a" || a !== "href")) {
          t.removeAttribute(a);
          break;
        }
        if (e == null || typeof e == "function" || typeof e == "symbol" || typeof e == "boolean") {
          t.removeAttribute(a);
          break;
        }
        e = Dn(e), t.setAttribute(a, e);
        break;
      case "action":
      case "formAction":
        if (typeof e == "function") {
          t.setAttribute(
            a,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof n == "function" && (a === "formAction" ? (l !== "input" && gt(t, l, "name", u.name, u, null), gt(
            t,
            l,
            "formEncType",
            u.formEncType,
            u,
            null
          ), gt(
            t,
            l,
            "formMethod",
            u.formMethod,
            u,
            null
          ), gt(
            t,
            l,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (gt(t, l, "encType", u.encType, u, null), gt(t, l, "method", u.method, u, null), gt(t, l, "target", u.target, u, null)));
        if (e == null || typeof e == "symbol" || typeof e == "boolean") {
          t.removeAttribute(a);
          break;
        }
        e = Dn(e), t.setAttribute(a, e);
        break;
      case "onClick":
        e != null && (t.onclick = Il);
        return;
      case "onScroll":
        e != null && lt("scroll", t);
        return;
      case "onScrollEnd":
        e != null && lt("scrollend", t);
        return;
      case "dangerouslySetInnerHTML":
        if (e != null) {
          if (typeof e != "object" || !("__html" in e))
            throw Error(s(61));
          if (a = e.__html, a != null) {
            if (u.children != null) throw Error(s(60));
            n?.__html !== a && (t.innerHTML = a);
          }
        }
        break;
      case "multiple":
        t.multiple = e && typeof e != "function" && typeof e != "symbol";
        break;
      case "muted":
        t.muted = e && typeof e != "function" && typeof e != "symbol";
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
        if (e == null || typeof e == "function" || typeof e == "boolean" || typeof e == "symbol") {
          t.removeAttribute("xlink:href");
          break;
        }
        a = Dn(e), t.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          a
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
        e != null && typeof e != "function" && typeof e != "symbol" ? t.setAttribute(a, e) : t.removeAttribute(a);
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
        e && typeof e != "function" && typeof e != "symbol" ? t.setAttribute(a, "") : t.removeAttribute(a);
        break;
      case "capture":
      case "download":
        e === !0 ? t.setAttribute(a, "") : e !== !1 && e != null && typeof e != "function" && typeof e != "symbol" ? t.setAttribute(a, e) : t.removeAttribute(a);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        e != null && typeof e != "function" && typeof e != "symbol" && !isNaN(e) && 1 <= e ? t.setAttribute(a, e) : t.removeAttribute(a);
        break;
      case "rowSpan":
      case "start":
        e == null || typeof e == "function" || typeof e == "symbol" || isNaN(e) ? t.removeAttribute(a) : t.setAttribute(a, e);
        break;
      case "popover":
        lt("beforetoggle", t), lt("toggle", t), Mn(t, "popover", e);
        break;
      case "xlinkActuate":
        ra(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          e
        );
        break;
      case "xlinkArcrole":
        ra(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          e
        );
        break;
      case "xlinkRole":
        ra(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          e
        );
        break;
      case "xlinkShow":
        ra(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          e
        );
        break;
      case "xlinkTitle":
        ra(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          e
        );
        break;
      case "xlinkType":
        ra(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          e
        );
        break;
      case "xmlBase":
        ra(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          e
        );
        break;
      case "xmlLang":
        ra(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          e
        );
        break;
      case "xmlSpace":
        ra(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          e
        );
        break;
      case "is":
        Mn(t, "is", e);
        break;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N")
          a = av.get(a) || a, Mn(t, a, e);
        else return;
    }
    ot = !0;
  }
  function fs(t, l, a, e, u, n) {
    switch (a) {
      case "style":
        bo(t, e, n);
        return;
      case "dangerouslySetInnerHTML":
        if (e != null) {
          if (typeof e != "object" || !("__html" in e))
            throw Error(s(61));
          if (a = e.__html, a != null) {
            if (u.children != null) throw Error(s(60));
            n?.__html !== a && (t.innerHTML = a);
          }
        }
        break;
      case "children":
        if (typeof e == "string") He(t, e);
        else if (typeof e == "number" || typeof e == "bigint")
          He(t, "" + e);
        else return;
        break;
      case "onScroll":
        e != null && lt("scroll", t);
        return;
      case "onScrollEnd":
        e != null && lt("scrollend", t);
        return;
      case "onClick":
        e != null && (t.onclick = Il);
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
        if (!fo.hasOwnProperty(a))
          t: {
            if (a[0] === "o" && a[1] === "n" && (u = a.endsWith("Capture"), n = a.slice(2, u ? a.length - 7 : void 0), l = t[ml] || null, l = l != null ? l[a] : null, typeof l == "function" && t.removeEventListener(n, l, u), typeof e == "function")) {
              typeof l != "function" && l !== null && (a in t ? t[a] = null : t.hasAttribute(a) && t.removeAttribute(a)), t.addEventListener(n, e, u);
              break t;
            }
            ot = !0, a in t ? t[a] = e : e === !0 ? t.setAttribute(a, "") : Mn(t, a, e);
          }
        return;
    }
    ot = !0;
  }
  function ll(t, l, a) {
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
        lt("error", t), lt("load", t);
        var e = !1, u = !1, n;
        for (n in a)
          if (a.hasOwnProperty(n)) {
            var i = a[n];
            if (i != null)
              switch (n) {
                case "src":
                  e = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(s(137, l));
                default:
                  gt(t, l, n, i, a, null);
              }
          }
        u && gt(t, l, "srcSet", a.srcSet, a, null), e && gt(t, l, "src", a.src, a, null);
        return;
      case "input":
        lt("invalid", t);
        var c = n = i = u = null, f = null, h = null;
        for (e in a)
          if (a.hasOwnProperty(e)) {
            var b = a[e];
            if (b != null)
              switch (e) {
                case "name":
                  u = b;
                  break;
                case "type":
                  i = b;
                  break;
                case "checked":
                  f = b;
                  break;
                case "defaultChecked":
                  h = b;
                  break;
                case "value":
                  n = b;
                  break;
                case "defaultValue":
                  c = b;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (b != null)
                    throw Error(s(137, l));
                  break;
                default:
                  gt(t, l, e, b, a, null);
              }
          }
        yo(
          t,
          n,
          c,
          f,
          h,
          i,
          u,
          !1
        );
        return;
      case "select":
        lt("invalid", t), e = i = n = null;
        for (u in a)
          if (a.hasOwnProperty(u) && (c = a[u], c != null))
            switch (u) {
              case "value":
                n = c;
                break;
              case "defaultValue":
                i = c;
                break;
              case "multiple":
                e = c;
              default:
                gt(t, l, u, c, a, null);
            }
        l = n, a = i, t.multiple = !!e, l != null ? Re(t, !!e, l, !1) : a != null && Re(t, !!e, a, !0);
        return;
      case "textarea":
        lt("invalid", t), n = u = e = null;
        for (i in a)
          if (a.hasOwnProperty(i) && (c = a[i], c != null))
            switch (i) {
              case "value":
                e = c;
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
                gt(t, l, i, c, a, null);
            }
        go(t, e, u, n);
        return;
      case "option":
        for (f in a)
          a.hasOwnProperty(f) && (e = a[f], e != null) && (f === "selected" ? t.selected = e && typeof e != "function" && typeof e != "symbol" : gt(t, l, f, e, a, null));
        return;
      case "dialog":
        lt("beforetoggle", t), lt("toggle", t), lt("cancel", t), lt("close", t);
        break;
      case "iframe":
      case "object":
        lt("load", t);
        break;
      case "video":
      case "audio":
        for (e = 0; e < an.length; e++)
          lt(an[e], t);
        break;
      case "image":
        lt("error", t), lt("load", t);
        break;
      case "details":
        lt("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        lt("error", t), lt("load", t);
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
        for (h in a)
          if (a.hasOwnProperty(h) && (e = a[h], e != null))
            switch (h) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(s(137, l));
              default:
                gt(t, l, h, e, a, null);
            }
        return;
      default:
        if (sc(l)) {
          for (b in a)
            a.hasOwnProperty(b) && (e = a[b], e !== void 0 && fs(
              t,
              l,
              b,
              e,
              a,
              void 0
            ));
          return;
        }
    }
    for (c in a)
      a.hasOwnProperty(c) && (e = a[c], e != null && gt(t, l, c, e, a, null));
  }
  var Yy = {};
  function Gy(t, l, a, e) {
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
        var u = null, n = null, i = null, c = null, f = null, h = null, b = null;
        for (S in a) {
          var N = a[S];
          if (a.hasOwnProperty(S) && N != null)
            switch (S) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                f = N;
              default:
                e.hasOwnProperty(S) || gt(t, l, S, null, e, N);
            }
        }
        for (var v in e) {
          var S = e[v];
          if (N = a[v], e.hasOwnProperty(v) && (S != null || N != null))
            switch (v) {
              case "type":
                S !== N && (ot = !0), n = S;
                break;
              case "name":
                S !== N && (ot = !0), u = S;
                break;
              case "checked":
                S !== N && (ot = !0), h = S;
                break;
              case "defaultChecked":
                S !== N && (ot = !0), b = S;
                break;
              case "value":
                S !== N && (ot = !0), i = S;
                break;
              case "defaultValue":
                S !== N && (ot = !0), c = S;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (S != null)
                  throw Error(s(137, l));
                break;
              default:
                S !== N && gt(
                  t,
                  l,
                  v,
                  S,
                  e,
                  N
                );
            }
        }
        cc(
          t,
          i,
          c,
          f,
          h,
          b,
          n,
          u
        );
        return;
      case "select":
        S = i = c = v = null;
        for (n in a)
          if (f = a[n], a.hasOwnProperty(n) && f != null)
            switch (n) {
              case "value":
                break;
              case "multiple":
                S = f;
              default:
                e.hasOwnProperty(n) || gt(
                  t,
                  l,
                  n,
                  null,
                  e,
                  f
                );
            }
        for (u in e)
          if (n = e[u], f = a[u], e.hasOwnProperty(u) && (n != null || f != null))
            switch (u) {
              case "value":
                n !== f && (ot = !0), v = n;
                break;
              case "defaultValue":
                n !== f && (ot = !0), c = n;
                break;
              case "multiple":
                n !== f && (ot = !0), i = n;
              default:
                n !== f && gt(
                  t,
                  l,
                  u,
                  n,
                  e,
                  f
                );
            }
        l = c, a = i, e = S, v != null ? Re(t, !!a, v, !1) : !!e != !!a && (l != null ? Re(t, !!a, l, !0) : Re(t, !!a, a ? [] : "", !1));
        return;
      case "textarea":
        S = v = null;
        for (c in a)
          if (u = a[c], a.hasOwnProperty(c) && u != null && !e.hasOwnProperty(c))
            switch (c) {
              case "value":
                break;
              case "children":
                break;
              default:
                gt(t, l, c, null, e, u);
            }
        for (i in e)
          if (u = e[i], n = a[i], e.hasOwnProperty(i) && (u != null || n != null))
            switch (i) {
              case "value":
                u !== n && (ot = !0), v = u;
                break;
              case "defaultValue":
                u !== n && (ot = !0), S = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(s(91));
                break;
              default:
                u !== n && gt(t, l, i, u, e, n);
            }
        ho(t, v, S);
        return;
      case "option":
        for (var p in a)
          v = a[p], a.hasOwnProperty(p) && v != null && !e.hasOwnProperty(p) && (p === "selected" ? t.selected = !1 : gt(
            t,
            l,
            p,
            null,
            e,
            v
          ));
        for (f in e)
          v = e[f], S = a[f], e.hasOwnProperty(f) && v !== S && (v != null || S != null) && (f === "selected" ? (v !== S && (ot = !0), t.selected = v && typeof v != "function" && typeof v != "symbol") : gt(
            t,
            l,
            f,
            v,
            e,
            S
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
        for (var q in a)
          v = a[q], a.hasOwnProperty(q) && v != null && !e.hasOwnProperty(q) && gt(t, l, q, null, e, v);
        for (h in e)
          if (v = e[h], S = a[h], e.hasOwnProperty(h) && v !== S && (v != null || S != null))
            switch (h) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (v != null)
                  throw Error(s(137, l));
                break;
              default:
                gt(
                  t,
                  l,
                  h,
                  v,
                  e,
                  S
                );
            }
        return;
      default:
        if (sc(l)) {
          for (var I in a)
            v = a[I], a.hasOwnProperty(I) && v !== void 0 && !e.hasOwnProperty(I) && fs(
              t,
              l,
              I,
              void 0,
              e,
              v
            );
          for (b in e)
            v = e[b], S = a[b], !e.hasOwnProperty(b) || v === S || v === void 0 && S === void 0 || fs(
              t,
              l,
              b,
              v,
              e,
              S
            );
          return;
        }
    }
    for (var y in a)
      v = a[y], a.hasOwnProperty(y) && v != null && !e.hasOwnProperty(y) && gt(t, l, y, null, e, v);
    for (N in e)
      v = e[N], S = a[N], !e.hasOwnProperty(N) || v === S || v == null && S == null || gt(t, l, N, v, e, S);
  }
  function O0(t) {
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
  function Xy() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, l = 0, a = performance.getEntriesByType("resource"), e = 0; e < a.length; e++) {
        var u = a[e], n = u.transferSize, i = u.initiatorType, c = u.duration;
        if (n && c && O0(i)) {
          for (i = 0, c = u.responseEnd, e += 1; e < a.length; e++) {
            var f = a[e], h = f.startTime;
            if (h > c) break;
            var b = f.transferSize, N = f.initiatorType;
            b && O0(N) && (f = f.responseEnd, i += b * (f < c ? 1 : (c - h) / (f - h)));
          }
          if (--e, l += 8 * (n + i) / (u.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return l / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var ss = null, os = null;
  function un(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function A0(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function M0(t, l) {
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
  function p0(t, l, a, e) {
    return a = un(
      a
    ).createElement(t), a[Wt] = e, a[ml] = l, ll(a, t, l), Kt(a), a;
  }
  function rs(t, l) {
    return t === "textarea" || t === "noscript" || typeof l.children == "string" || typeof l.children == "number" || typeof l.children == "bigint" || typeof l.dangerouslySetInnerHTML == "object" && l.dangerouslySetInnerHTML !== null && l.dangerouslySetInnerHTML.__html != null;
  }
  var ms = null;
  function Qy() {
    var t = window.event;
    return t && t.type === "popstate" ? t === ms ? !1 : (ms = t, !0) : (ms = null, !1);
  }
  var ds = typeof setTimeout == "function" ? setTimeout : void 0, Ly = typeof clearTimeout == "function" ? clearTimeout : void 0, D0 = typeof Promise == "function" ? Promise : void 0, C0 = typeof requestAnimationFrame == "function" ? requestAnimationFrame : ds, Zy = typeof queueMicrotask == "function" ? queueMicrotask : typeof D0 < "u" ? function(t) {
    return D0.resolve(null).then(t).catch(Vy);
  } : ds;
  function Vy(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function Fa(t) {
    return t === "head";
  }
  function U0(t, l) {
    var a = l, e = 0;
    do {
      var u = a.nextSibling;
      if (t.removeChild(a), u && u.nodeType === 8)
        if (a = u.data, a === "/$" || a === "/&") {
          if (e === 0) {
            t.removeChild(u), hu(l);
            return;
          }
          e--;
        } else if (a === "$" || a === "$?" || a === "$~" || a === "$!" || a === "&")
          e++;
        else if (a === "html")
          Es(
            t.ownerDocument.documentElement
          );
        else if (a === "head") {
          a = t.ownerDocument.head, Es(a);
          for (var n = a.firstChild; n; ) {
            var i = n.nextSibling, c = n.nodeName;
            n[_u] || c === "SCRIPT" || c === "STYLE" || c === "LINK" && n.rel.toLowerCase() === "stylesheet" || a.removeChild(n), n = i;
          }
        } else
          a === "body" && Es(t.ownerDocument.body);
      a = u;
    } while (a);
    hu(l);
  }
  function R0(t, l) {
    var a = t;
    t = 0;
    do {
      var e = a.nextSibling;
      if (a.nodeType === 1 ? l ? (a._stashedDisplay = a.style.display, a.style.display = "none") : (a.style.display = a._stashedDisplay || "", a.getAttribute("style") === "" && a.removeAttribute("style")) : a.nodeType === 3 && (l ? (a._stashedText = a.nodeValue, a.nodeValue = "") : a.nodeValue = a._stashedText || ""), e && e.nodeType === 8)
        if (a = e.data, a === "/$") {
          if (t === 0) break;
          t--;
        } else
          a !== "$" && a !== "$?" && a !== "$~" && a !== "$!" || t++;
      a = e;
    } while (a);
  }
  function H0(t, l, a) {
    if (l = CSS.escape(l) !== l ? "r-" + btoa(l).replace(/=/g, "") : l, t.style.viewTransitionName = l, a != null && (t.style.viewTransitionClass = a), a = getComputedStyle(t), a.display === "inline") {
      if (l = t.getClientRects(), l.length === 1) var e = 1;
      else
        for (var u = e = 0; u < l.length; u++) {
          var n = l[u];
          0 < n.width && 0 < n.height && e++;
        }
      e === 1 && (t = t.style, t.display = l.length === 1 ? "inline-block" : "block", t.marginTop = "-" + a.paddingTop, t.marginBottom = "-" + a.paddingBottom);
    }
  }
  function x0(t, l) {
    t = t.style, l = l.style;
    var a = l != null ? l.hasOwnProperty("viewTransitionName") ? l.viewTransitionName : l.hasOwnProperty("view-transition-name") ? l["view-transition-name"] : null : null;
    t.viewTransitionName = a == null || typeof a == "boolean" ? "" : ("" + a).trim(), a = l != null ? l.hasOwnProperty("viewTransitionClass") ? l.viewTransitionClass : l.hasOwnProperty("view-transition-class") ? l["view-transition-class"] : null : null, t.viewTransitionClass = a == null || typeof a == "boolean" ? "" : ("" + a).trim(), t.display === "inline-block" && (l == null ? t.display = t.margin = "" : (a = l.display, t.display = a == null || typeof a == "boolean" ? "" : a, a = l.margin, a != null ? t.margin = a : (a = l.hasOwnProperty("marginTop") ? l.marginTop : l["margin-top"], t.marginTop = a == null || typeof a == "boolean" ? "" : a, l = l.hasOwnProperty("marginBottom") ? l.marginBottom : l["margin-bottom"], t.marginBottom = l == null || typeof l == "boolean" ? "" : l)));
  }
  function Ky(t, l, a) {
    return a = a.ownerDocument.defaultView, {
      rect: t,
      abs: l.position === "absolute" || l.position === "fixed",
      clip: l.clipPath !== "none" || l.overflow !== "visible" || l.filter !== "none" || l.mask !== "none" || l.mask !== "none" || l.borderRadius !== "0px",
      view: 0 <= t.bottom && 0 <= t.right && t.top <= a.innerHeight && t.left <= a.innerWidth
    };
  }
  function vs(t) {
    var l = t.getBoundingClientRect(), a = getComputedStyle(t);
    return Ky(l, a, t);
  }
  function wy(t) {
    return t.documentElement.clientHeight;
  }
  function Jy(t) {
    this.addEventListener("load", t), this.addEventListener("error", t);
  }
  function $y(t, l, a, e, u, n, i, c, f) {
    var h = l.nodeType === 9 ? l : l.ownerDocument;
    try {
      var b = h.startViewTransition({
        update: function() {
          var v = h.defaultView, S = v.navigation && v.navigation.transition, p = h.fonts.status;
          e();
          var q = [];
          if (p === "loaded" && (wy(h), h.fonts.status === "loading" && q.push(h.fonts.ready)), p = q.length, t !== null)
            for (var I = t.suspenseyImages, y = 0, o = 0; o < I.length; o++) {
              var g = I[o];
              if (!g.complete) {
                var z = g.getBoundingClientRect();
                if (0 < z.bottom && 0 < z.right && z.top < v.innerHeight && z.left < v.innerWidth) {
                  if (y += ld(g), y > Yi) {
                    q.length = p;
                    break;
                  }
                  g = new Promise(
                    Jy.bind(g)
                  ), q.push(g);
                }
              }
            }
          if (0 < q.length)
            return v = Promise.race([
              Promise.all(q),
              new Promise(function(H) {
                return setTimeout(H, 500);
              })
            ]).then(u, u), (S ? Promise.allSettled([S.finished, v]) : v).then(n, n);
          if (u(), S)
            return S.finished.then(
              n,
              n
            );
          n();
        },
        types: a
      });
      h.__reactViewTransition = b;
      var N = [];
      return b.ready.then(
        function() {
          for (var v = h.documentElement.getAnimations({
            subtree: !0
          }), S = 0; S < v.length; S++) {
            var p = v[S], q = p.effect, I = q.pseudoElement;
            if (I != null && I.startsWith("::view-transition")) {
              N.push(p), p = q.getKeyframes();
              for (var y = I = void 0, o = !0, g = 0; g < p.length; g++) {
                var z = p[g], H = z.width;
                if (I === void 0) I = H;
                else if (I !== H) {
                  o = !1;
                  break;
                }
                if (H = z.height, y === void 0) y = H;
                else if (y !== H) {
                  o = !1;
                  break;
                }
                delete z.width, delete z.height, z.transform === "none" && delete z.transform;
              }
              o && I !== void 0 && y !== void 0 && (q.setKeyframes(p), o = getComputedStyle(
                q.target,
                q.pseudoElement
              ), o.width !== I || o.height !== y) && (o = p[0], o.width = I, o.height = y, o = p[p.length - 1], o.width = I, o.height = y, q.setKeyframes(p));
            }
          }
          i();
        },
        function(v) {
          h.__reactViewTransition === b && (h.__reactViewTransition = null);
          try {
            typeof v == "object" && v !== null && v.name === "InvalidStateError" && (v.message === "View transition was skipped because document visibility state is hidden." || v.message === "Skipping view transition because document visibility state has become hidden." || v.message === "Skipping view transition because viewport size changed." || v.message === "Transition was aborted because of invalid state") && (v = null), v !== null && f(v);
          } finally {
            e(), u(), i();
          }
        }
      ), b.finished.finally(function() {
        for (var v = 0; v < N.length; v++)
          N[v].cancel();
        h.__reactViewTransition === b && (h.__reactViewTransition = null), c();
      }), b;
    } catch {
      return e(), u(), i(), null;
    }
  }
  function Ne(t, l) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + t + "(" + l + ")";
  }
  Ne.prototype.animate = function(t, l) {
    return l = typeof l == "number" ? { duration: l } : V({}, l), l.pseudoElement = this._selector, this._scope.animate(t, l);
  }, Ne.prototype.getAnimations = function() {
    for (var t = this._scope, l = this._selector, a = t.getAnimations({ subtree: !0 }), e = [], u = 0; u < a.length; u++) {
      var n = a[u].effect;
      n !== null && n.target === t && n.pseudoElement === l && e.push(a[u]);
    }
    return e;
  }, Ne.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function j0(t) {
    return {
      name: t,
      group: new Ne("group", t),
      imagePair: new Ne("image-pair", t),
      old: new Ne("old", t),
      new: new Ne("new", t)
    };
  }
  function Dl(t) {
    this._fragmentFiber = t, this._observers = this._eventListeners = null;
  }
  Dl.prototype.addEventListener = function(t, l, a) {
    var e = null, u = null;
    if (!(a != null && typeof a != "boolean" && (e = a.signal || null, e !== null && e.aborted))) {
      this._eventListeners === null && (this._eventListeners = []);
      var n = this._eventListeners;
      if (q0(n, t, l, a) === -1) {
        var i = this, c = l;
        a != null && typeof a != "boolean" && a.once === !0 && (c = function(f) {
          i.removeEventListener(
            t,
            l,
            a
          ), typeof l == "function" ? l.call(this, f) : l.handleEvent(f);
        }), e !== null && (u = i.removeEventListener.bind(
          i,
          t,
          l,
          a
        ), e.addEventListener("abort", u, { once: !0 }), u = e.removeEventListener.bind(e, "abort", u)), e = ou(a), n.push({
          type: t,
          listener: l,
          optionsOrUseCapture: a,
          attachedListener: c,
          cleanup: u
        }), T(
          this._fragmentFiber.child,
          !1,
          Fy,
          t,
          c,
          e
        );
      }
      this._eventListeners = n;
    }
  };
  function Fy(t, l, a, e) {
    return ft(t).addEventListener(
      l,
      a,
      e
    ), !1;
  }
  Dl.prototype.removeEventListener = function(t, l, a) {
    var e = this._eventListeners;
    if (e !== null && (l = q0(
      e,
      t,
      l,
      a
    ), l !== -1)) {
      var u = e[l];
      a = u.attachedListener;
      var n = u.cleanup;
      u = ou(u.optionsOrUseCapture), T(
        this._fragmentFiber.child,
        !1,
        Wy,
        t,
        a,
        u
      ), e.splice(l, 1), n !== null && n();
    }
  };
  function Wy(t, l, a, e) {
    return ft(t).removeEventListener(
      l,
      a,
      e
    ), !1;
  }
  function ou(t) {
    return t != null && typeof t != "boolean" && (t.once === !0 || t.signal instanceof AbortSignal) ? { capture: t.capture, passive: t.passive } : t;
  }
  function B0(t) {
    return t == null ? "c=0" : typeof t == "boolean" ? "c=" + (t ? "1" : "0") : "c=" + (t.capture ? "1" : "0");
  }
  function q0(t, l, a, e) {
    if (t.length === 0) return -1;
    e = B0(e);
    for (var u = 0; u < t.length; u++) {
      var n = t[u];
      if (n.type === l && n.listener === a && B0(n.optionsOrUseCapture) === e)
        return u;
    }
    return -1;
  }
  Dl.prototype.dispatchEvent = function(t) {
    var l = Z(
      this._fragmentFiber
    );
    if (l === null) return !0;
    l = ft(l);
    var a = this._eventListeners;
    if (a !== null && 0 < a.length || !t.bubbles) {
      var e = l.nodeType === 9 ? l.createComment("") : document.createTextNode("");
      if (a)
        for (var u = 0; u < a.length; u++) {
          var n = a[u];
          e.addEventListener(
            n.type,
            n.attachedListener,
            ou(n.optionsOrUseCapture)
          );
        }
      if (l.appendChild(e), t = e.dispatchEvent(t), a)
        for (u = 0; u < a.length; u++)
          n = a[u], e.removeEventListener(
            n.type,
            n.attachedListener,
            ou(n.optionsOrUseCapture)
          );
      return l.removeChild(e), t;
    }
    return l.dispatchEvent(t);
  }, Dl.prototype.focus = function(t) {
    T(
      this._fragmentFiber.child,
      !0,
      Y0,
      t,
      void 0,
      void 0
    );
  };
  function Y0(t, l) {
    return t.tag === 6 ? !1 : (t = ft(t), fh(t, l));
  }
  Dl.prototype.focusLast = function(t) {
    var l = [];
    T(
      this._fragmentFiber.child,
      !0,
      ys,
      l,
      void 0,
      void 0
    );
    for (var a = l.length - 1; 0 <= a && !Y0(l[a], t); a--) ;
  };
  function ys(t, l) {
    return l.push(t), !1;
  }
  Dl.prototype.blur = function() {
    var t = Z(
      this._fragmentFiber
    );
    t !== null && (t = ft(t), t = un(t).activeElement, t !== null && T(
      this._fragmentFiber.child,
      !1,
      ky,
      t,
      void 0,
      void 0
    ));
  };
  function ky(t, l) {
    return t.tag === 6 ? !1 : (t = ft(t), t === l || t.contains(l) ? (l.blur(), !0) : !1);
  }
  Dl.prototype.observeUsing = function(t) {
    this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(t), T(
      this._fragmentFiber.child,
      !1,
      Iy,
      t,
      void 0,
      void 0
    );
  };
  function Iy(t, l) {
    return t.tag === 6 || (t = ft(t), l.observe(t)), !1;
  }
  Dl.prototype.unobserveUsing = function(t) {
    var l = this._observers;
    if (l !== null && l.has(t)) {
      l.delete(t), T(
        this._fragmentFiber.child,
        !1,
        Py,
        t,
        void 0,
        void 0
      );
      for (var a = l = 0; a < $l.length; a++) {
        var e = $l[a];
        e.fragmentInstance === this && e.observer === t ? t.unobserve(e.instance) : $l[l++] = e;
      }
      $l.length = l;
    }
  };
  function Py(t, l) {
    return t.tag === 6 || (t = ft(t), l.unobserve(t)), !1;
  }
  var $l = [], hs = !1;
  function th(t, l, a) {
    $l.push({
      fragmentInstance: t,
      observer: l,
      instance: a
    }), hs || (hs = !0, sh(function() {
      hs = !1;
      var e = $l;
      $l = [];
      for (var u = 0; u < e.length; u++) {
        var n = e[u];
        n.observer.unobserve(n.instance);
      }
    }));
  }
  Dl.prototype.getClientRects = function() {
    var t = [];
    return T(
      this._fragmentFiber.child,
      !1,
      lh,
      t,
      void 0,
      void 0
    ), t;
  };
  function lh(t, l) {
    if (t.tag === 6) {
      t = t.stateNode;
      var a = t.ownerDocument.createRange();
      a.selectNodeContents(t), l.push.apply(l, a.getClientRects());
    } else
      t = ft(t), l.push.apply(l, t.getClientRects());
    return !1;
  }
  Dl.prototype.getRootNode = function(t) {
    var l = Z(
      this._fragmentFiber
    );
    return l === null ? this : ft(l).getRootNode(t);
  }, Dl.prototype.compareDocumentPosition = function(t) {
    var l = Z(
      this._fragmentFiber
    );
    if (l === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var a = [];
    T(
      this._fragmentFiber.child,
      !1,
      ys,
      a,
      void 0,
      void 0
    );
    var e = ft(l);
    if (a.length === 0) {
      if (a = e, Et(this._fragmentFiber)) {
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
        l != null && (a = l);
      }
      l = this._fragmentFiber;
      var u = e = a.compareDocumentPosition(t);
      return a === t ? u = Node.DOCUMENT_POSITION_CONTAINS : e & Node.DOCUMENT_POSITION_CONTAINED_BY && (a = Dt(l)[1], a === null ? u = Node.DOCUMENT_POSITION_PRECEDING : (t = ft(a).compareDocumentPosition(
        t
      ), u = t === 0 || t & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), u |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    l = ft(a[0]), u = ft(a[a.length - 1]);
    var n = Et(this._fragmentFiber) ? l.parentElement : e;
    if (n == null)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    e = n.compareDocumentPosition(l) & Node.DOCUMENT_POSITION_CONTAINED_BY, n = n.compareDocumentPosition(u) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var i = l.compareDocumentPosition(t), c = u.compareDocumentPosition(t), f = i & Node.DOCUMENT_POSITION_CONTAINED_BY || c & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return c = e && n && i & Node.DOCUMENT_POSITION_FOLLOWING && c & Node.DOCUMENT_POSITION_PRECEDING, l = e && l === t || n && u === t || f || c ? Node.DOCUMENT_POSITION_CONTAINED_BY : !e && l === t || !n && u === t ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : i, l & Node.DOCUMENT_POSITION_DISCONNECTED || l & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || ah(
      l,
      this._fragmentFiber,
      a[0],
      a[a.length - 1],
      t
    ) ? l : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function ah(t, l, a, e, u) {
    var n = ee(u);
    if (t & Node.DOCUMENT_POSITION_CONTAINED_BY) {
      if (a = !!n)
        t: {
          for (; n !== null; ) {
            if (n.tag === 7 && (n === l || n.alternate === l)) {
              a = !0;
              break t;
            }
            n = n.return;
          }
          a = !1;
        }
      return a;
    }
    if (t & Node.DOCUMENT_POSITION_CONTAINS) {
      if (n === null)
        return n = u.ownerDocument, u === n || u === n.documentElement || u === n.body;
      t: {
        for (n = l, l = Z(l); n !== null; ) {
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
    return t & Node.DOCUMENT_POSITION_PRECEDING ? ((l = !!n) && !(l = n === a) && (l = Lt(
      a,
      n,
      vt
    ), l === null ? l = !1 : (T(
      l,
      !0,
      xt,
      n,
      a
    ), n = Mt, Mt = null, l = n !== null)), l) : t & Node.DOCUMENT_POSITION_FOLLOWING ? ((l = !!n) && !(l = n === e) && (l = Lt(
      e,
      n,
      vt
    ), l === null ? l = !1 : (T(
      l,
      !0,
      Qt,
      n,
      e
    ), n = Mt, bt = Mt = null, l = n !== null)), l) : !1;
  }
  function G0(t, l) {
    var a = t.ownerDocument.createRange();
    a.selectNodeContents(t), t = a.getBoundingClientRect(), window.scrollTo(
      window.scrollX + t.left,
      l ? window.scrollY + t.top : window.scrollY + t.bottom - window.innerHeight
    );
  }
  Dl.prototype.scrollIntoView = function(t) {
    if (typeof t == "object") throw Error(s(566));
    var l = [];
    T(
      this._fragmentFiber.child,
      !1,
      ys,
      l,
      void 0,
      void 0
    );
    var a = t !== !1;
    if (l.length === 0) {
      var e = Dt(
        this._fragmentFiber
      );
      if (e = a ? e[1] || e[0] || Z(this._fragmentFiber) : e[0] || e[1], e === null) return;
      if (e.tag === 6) {
        t = ft(e), G0(t, a);
        return;
      }
      if (e = ft(e), e.nodeType !== 9) {
        if (e.nodeType === 11) {
          a = "host" in e ? e.host : null, a !== null && a.scrollIntoView(t);
          return;
        }
        e.scrollIntoView(t);
      }
    }
    for (e = a ? l.length - 1 : 0; e !== (a ? -1 : l.length); ) {
      var u = l[e];
      u.tag === 6 ? (u = ft(u), G0(u, a)) : ft(u).scrollIntoView(t), e += a ? -1 : 1;
    }
  };
  function eh(t, l) {
    return t = ft(t), X0(t, l), !1;
  }
  function X0(t, l) {
    t.reactFragments == null && (t.reactFragments = /* @__PURE__ */ new Set()), t.reactFragments.add(l);
  }
  function Q0(t, l) {
    var a = l._eventListeners;
    if (a !== null)
      for (var e = 0; e < a.length; e++) {
        var u = a[e];
        t.addEventListener(
          u.type,
          u.attachedListener,
          ou(u.optionsOrUseCapture)
        );
      }
    t.nodeType !== 3 && (a = l._observers, a !== null && a.forEach(function(n) {
      for (var i = 0, c = 0; c < $l.length; c++) {
        var f = $l[c];
        (f.fragmentInstance !== l || f.observer !== n || f.instance !== t) && ($l[i++] = f);
      }
      $l.length = i, n.observe(t);
    }), X0(t, l));
  }
  function uh(t, l) {
    var a = l._eventListeners;
    if (a !== null)
      for (var e = 0; e < a.length; e++) {
        var u = a[e];
        t.removeEventListener(
          u.type,
          u.attachedListener,
          ou(u.optionsOrUseCapture)
        );
      }
    t.nodeType !== 3 && (a = l._observers, a !== null && a.forEach(function(n) {
      typeof n.rootMargin == "string" ? th(
        l,
        n,
        t
      ) : n.unobserve(t);
    }), t.reactFragments != null && t.reactFragments.delete(l));
  }
  function gs(t) {
    var l = t.firstChild;
    for (l && l.nodeType === 10 && (l = l.nextSibling); l; ) {
      var a = l;
      switch (l = l.nextSibling, a.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          gs(a), An(a);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (a.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(a);
    }
  }
  function nh(t, l, a, e) {
    for (; t.nodeType === 1; ) {
      var u = a;
      if (t.nodeName.toLowerCase() !== l.toLowerCase()) {
        if (!e && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (e) {
        if (!t[_u])
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
      if (t = Gl(t.nextSibling), t === null) break;
    }
    return null;
  }
  function ih(t, l, a) {
    if (l === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !a || (t = Gl(t.nextSibling), t === null)) return null;
    return t;
  }
  function L0(t, l) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l || (t = Gl(t.nextSibling), t === null)) return null;
    return t;
  }
  function Ss(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function bs(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function ch(t, l) {
    var a = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = l;
    else if (t.data !== "$?" || a.readyState !== "loading")
      l();
    else {
      var e = function() {
        l(), a.removeEventListener("DOMContentLoaded", e);
      };
      a.addEventListener("DOMContentLoaded", e), t._reactRetry = e;
    }
  }
  function Gl(t) {
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
  var Ts = null;
  function Z0(t) {
    t = t.nextSibling;
    for (var l = 0; t; ) {
      if (t.nodeType === 8) {
        var a = t.data;
        if (a === "/$" || a === "/&") {
          if (l === 0)
            return Gl(t.nextSibling);
          l--;
        } else
          a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&" || l++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function V0(t) {
    t = t.previousSibling;
    for (var l = 0; t; ) {
      if (t.nodeType === 8) {
        var a = t.data;
        if (a === "$" || a === "$!" || a === "$?" || a === "$~" || a === "&") {
          if (l === 0) return t;
          l--;
        } else a !== "/$" && a !== "/&" || l++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function fh(t, l) {
    function a() {
      e = !0;
    }
    if (t.ownerDocument.activeElement === t) return !0;
    var e = !1;
    try {
      t.ownerDocument.addEventListener("focus", a, !0), (t.focus || HTMLElement.prototype.focus).call(t, l);
    } finally {
      t.ownerDocument.removeEventListener("focus", a, !0);
    }
    return e;
  }
  function sh(t) {
    C0(function() {
      C0(function(l) {
        return t(l);
      });
    });
  }
  function K0(t, l, a) {
    switch (l = un(a), t) {
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
  function w0(t, l, a) {
    for (var e in a) {
      var u = a[e];
      a.hasOwnProperty(e) && u != null && gt(t, l, e, null, Yy, u);
    }
    a.dangerouslySetInnerHTML != null && (t.textContent = ""), t.onclick === Il && (t.onclick = null), An(t);
  }
  function Es(t) {
    for (var l = t.attributes; l.length; )
      t.removeAttributeNode(l[0]);
    An(t);
  }
  var Xl = /* @__PURE__ */ new Map(), J0 = /* @__PURE__ */ new Set();
  function nn(t) {
    if (typeof t.getRootNode == "function") {
      var l = t.getRootNode();
      if (l.nodeType === 9 || l.nodeType === 11) return l;
    }
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  var Na = U.d;
  U.d = {
    f: oh,
    r: rh,
    D: mh,
    C: dh,
    L: vh,
    m: yh,
    X: gh,
    S: hh,
    M: Sh
  };
  function oh() {
    var t = Na.f(), l = Di();
    return t || l;
  }
  function rh(t) {
    var l = De(t);
    l !== null && l.tag === 5 && l.type === "form" ? Fr(l) : Na.r(t);
  }
  var ru = typeof document > "u" ? null : document;
  function $0(t, l, a) {
    var e = ru;
    if (e && typeof l == "string" && l) {
      var u = Rl(l);
      u = 'link[rel="' + t + '"][href="' + u + '"]', typeof a == "string" && (u += '[crossorigin="' + a + '"]'), J0.has(u) || (J0.add(u), t = { rel: t, crossOrigin: a, href: l }, e.querySelector(u) === null && (l = e.createElement("link"), ll(l, "link", t), Kt(l), e.head.appendChild(l)));
    }
  }
  function mh(t) {
    Na.D(t), $0("dns-prefetch", t, null);
  }
  function dh(t, l) {
    Na.C(t, l), $0("preconnect", t, l);
  }
  function vh(t, l, a) {
    Na.L(t, l, a);
    var e = ru;
    if (e && t && l) {
      var u = 'link[rel="preload"][as="' + Rl(l) + '"]';
      l === "image" && a && a.imageSrcSet ? (u += '[imagesrcset="' + Rl(
        a.imageSrcSet
      ) + '"]', typeof a.imageSizes == "string" && (u += '[imagesizes="' + Rl(
        a.imageSizes
      ) + '"]')) : u += '[href="' + Rl(t) + '"]';
      var n = u;
      switch (l) {
        case "style":
          n = mu(t);
          break;
        case "script":
          n = du(t);
      }
      if (!(Xl.has(n) || (t = V(
        {
          rel: "preload",
          href: l === "image" && a && a.imageSrcSet ? void 0 : t,
          as: l
        },
        a
      ), Xl.set(n, t), e.querySelector(u) !== null || l === "style" && e.querySelector(cn(n)) || l === "script" && e.querySelector(fn(n))))) {
        var i = e.createElement("link");
        ll(i, "link", t), l === "style" && (i[On] = !0, i.onload = i.onerror = function() {
          io(i);
        }), Kt(i), e.head.appendChild(i);
      }
    }
  }
  function yh(t, l) {
    Na.m(t, l);
    var a = ru;
    if (a && t) {
      var e = l && typeof l.as == "string" ? l.as : "script", u = 'link[rel="modulepreload"][as="' + Rl(e) + '"][href="' + Rl(t) + '"]', n = u;
      switch (e) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          n = du(t);
      }
      if (!Xl.has(n) && (t = V({ rel: "modulepreload", href: t }, l), Xl.set(n, t), a.querySelector(u) === null)) {
        switch (e) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (a.querySelector(fn(n)))
              return;
        }
        e = a.createElement("link"), ll(e, "link", t), Kt(e), a.head.appendChild(e);
      }
    }
  }
  function hh(t, l, a) {
    Na.S(t, l, a);
    var e = ru;
    if (e && t) {
      var u = Ce(e).hoistableStyles, n = mu(t);
      l = l || "default";
      var i = u.get(n);
      if (!i) {
        var c = { loading: 0, preload: null };
        if (i = e.querySelector(
          cn(n)
        ))
          c.loading = 5;
        else {
          t = V(
            { rel: "stylesheet", href: t, "data-precedence": l },
            a
          ), (a = Xl.get(n)) && _s(t, a);
          var f = i = e.createElement("link");
          Kt(f), ll(f, "link", t), f._p = new Promise(function(h, b) {
            f.onload = h, f.onerror = b;
          }), f.addEventListener("load", function() {
            c.loading |= 1;
          }), f.addEventListener("error", function() {
            c.loading |= 2;
          }), c.loading |= 4, Bi(i, l, e);
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
  function gh(t, l) {
    Na.X(t, l);
    var a = ru;
    if (a && t) {
      var e = Ce(a).hoistableScripts, u = du(t), n = e.get(u);
      n || (n = a.querySelector(fn(u)), n || (t = V({ src: t, async: !0 }, l), (l = Xl.get(u)) && zs(t, l), n = a.createElement("script"), Kt(n), ll(n, "link", t), a.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, e.set(u, n));
    }
  }
  function Sh(t, l) {
    Na.M(t, l);
    var a = ru;
    if (a && t) {
      var e = Ce(a).hoistableScripts, u = du(t), n = e.get(u);
      n || (n = a.querySelector(fn(u)), n || (t = V({ src: t, async: !0, type: "module" }, l), (l = Xl.get(u)) && zs(t, l), n = a.createElement("script"), Kt(n), ll(n, "link", t), a.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, e.set(u, n));
    }
  }
  function F0(t, l, a, e) {
    var u = (u = Aa.current) ? nn(u) : null;
    if (!u) throw Error(s(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof a.precedence == "string" && typeof a.href == "string" ? (a = mu(a.href), l = Ce(
          u
        ).hoistableStyles, e = l.get(a), e || (e = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, l.set(a, e)), e) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
          t = mu(a.href);
          var n = Ce(
            u
          ).hoistableStyles, i = n.get(t);
          if (i || (u = u.ownerDocument || u, i = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, n.set(t, i), (n = u.querySelector(
            cn(t)
          )) ? n._p || (i.instance = n, i.state.loading = 5) : (n = Xl.get(t), n || (n = {
            rel: "preload",
            as: "style",
            href: a.href,
            crossOrigin: a.crossOrigin,
            integrity: a.integrity,
            media: a.media,
            hrefLang: a.hrefLang,
            referrerPolicy: a.referrerPolicy
          }, Xl.set(t, n)), bh(
            u,
            t,
            n,
            i.state
          ))), l && e === null)
            throw Error(s(528, ""));
          return i;
        }
        if (l && e !== null)
          throw Error(s(529, ""));
        return null;
      case "script":
        return l = a.async, a = a.src, typeof a == "string" && l && typeof l != "function" && typeof l != "symbol" ? (a = du(a), l = Ce(
          u
        ).hoistableScripts, e = l.get(a), e || (e = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, l.set(a, e)), e) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(s(444, t));
    }
  }
  function mu(t) {
    return 'href="' + Rl(t) + '"';
  }
  function cn(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function W0(t) {
    return V({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function bh(t, l, a, e) {
    if (l = t.querySelector(
      'link[rel="preload"][as="style"][' + l + "]"
    )) {
      if (l[On] !== !0) {
        e.loading = 1;
        return;
      }
    } else
      l = t.createElement("link"), l[On] = !0, l.onload = l.onerror = io.bind(null, l), ll(l, "link", a), Kt(l), t.head.appendChild(l);
    e.preload = l, l.addEventListener("load", function() {
      return e.loading |= 1;
    }), l.addEventListener("error", function() {
      return e.loading |= 2;
    });
  }
  function du(t) {
    return '[src="' + Rl(t) + '"]';
  }
  function fn(t) {
    return "script[async]" + t;
  }
  function k0(t, l, a) {
    if (l.count++, l.instance === null)
      switch (l.type) {
        case "style":
          var e = t.querySelector(
            'style[data-href~="' + Rl(a.href) + '"]'
          );
          if (e)
            return l.instance = e, Kt(e), e;
          var u = V({}, a, {
            "data-href": a.href,
            "data-precedence": a.precedence,
            href: null,
            precedence: null
          });
          return e = (t.ownerDocument || t).createElement(
            "style"
          ), Kt(e), ll(e, "style", u), Bi(e, a.precedence, t), l.instance = e;
        case "stylesheet":
          u = mu(a.href);
          var n = t.querySelector(
            cn(u)
          );
          if (n)
            return l.state.loading |= 4, l.instance = n, Kt(n), n;
          e = W0(a), (u = Xl.get(u)) && _s(e, u), n = (t.ownerDocument || t).createElement("link"), Kt(n);
          var i = n;
          return i._p = new Promise(function(c, f) {
            i.onload = c, i.onerror = f;
          }), ll(n, "link", e), l.state.loading |= 4, Bi(n, a.precedence, t), l.instance = n;
        case "script":
          return n = du(a.src), (u = t.querySelector(
            fn(n)
          )) ? (l.instance = u, Kt(u), u) : (e = a, (u = Xl.get(n)) && (e = V({}, a), zs(e, u)), t = t.ownerDocument || t, u = t.createElement("script"), Kt(u), ll(u, "link", e), t.head.appendChild(u), l.instance = u);
        case "void":
          return null;
        default:
          throw Error(s(443, l.type));
      }
    else
      l.type === "stylesheet" && (l.state.loading & 4) === 0 && (e = l.instance, l.state.loading |= 4, Bi(e, a.precedence, t));
    return l.instance;
  }
  function Bi(t, l, a) {
    for (var e = a.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = e.length ? e[e.length - 1] : null, n = u, i = 0; i < e.length; i++) {
      var c = e[i];
      if (c.dataset.precedence === l) n = c;
      else if (n !== u) break;
    }
    n ? n.parentNode.insertBefore(t, n.nextSibling) : (l = a.nodeType === 9 ? a.head : a, l.insertBefore(t, l.firstChild));
  }
  function _s(t, l) {
    t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.title == null && (t.title = l.title);
  }
  function zs(t, l) {
    t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.integrity == null && (t.integrity = l.integrity);
  }
  var qi = null;
  function I0(t, l, a) {
    if (qi === null) {
      var e = /* @__PURE__ */ new Map(), u = qi = /* @__PURE__ */ new Map();
      u.set(a, e);
    } else
      u = qi, e = u.get(a), e || (e = /* @__PURE__ */ new Map(), u.set(a, e));
    if (e.has(t)) return e;
    for (e.set(t, null), a = a.getElementsByTagName(t), u = 0; u < a.length; u++) {
      var n = a[u];
      if (!(n[_u] || n[Wt] || t === "link" && n.getAttribute("rel") === "stylesheet") && n.namespaceURI !== "http://www.w3.org/2000/svg") {
        var i = n.getAttribute(l) || "";
        i = t + i;
        var c = e.get(i);
        c ? c.push(n) : e.set(i, [n]);
      }
    }
    return e;
  }
  function Ns(t, l, a) {
    t = t.ownerDocument || t, t.head.insertBefore(
      a,
      l === "title" ? t.querySelector("head > title") : null
    );
  }
  function Th(t, l, a) {
    if (a === 1 || l.itemProp != null) return !1;
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
  function P0(t, l) {
    return t === "img" && l.src != null && l.src !== "" && l.onLoad == null && l.loading !== "lazy";
  }
  function td(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function ld(t) {
    return (t.width || 100) * (t.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
  }
  function ad(t, l) {
    typeof l.decode == "function" && (t.imgCount++, l.complete || (t.imgBytes += ld(l), t.suspenseyImages.push(l)), t = zh.bind(t), l.decode().then(t, t));
  }
  function Eh(t, l, a, e) {
    if (a.type === "stylesheet" && (typeof e.media != "string" || matchMedia(e.media).matches !== !1) && (a.state.loading & 4) === 0) {
      if (a.instance === null) {
        var u = mu(e.href), n = l.querySelector(
          cn(u)
        );
        if (n) {
          l = n._p, l !== null && typeof l == "object" && typeof l.then == "function" && (t.count++, t = sn.bind(t), l.then(t, t)), a.state.loading |= 4, a.instance = n, Kt(n);
          return;
        }
        n = l.ownerDocument || l, e = W0(e), (u = Xl.get(u)) && _s(e, u), n = n.createElement("link"), Kt(n);
        var i = n;
        i._p = new Promise(function(c, f) {
          i.onload = c, i.onerror = f;
        }), ll(n, "link", e), a.instance = n;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(a, l), (l = a.state.preload) && (a.state.loading & 3) === 0 && (t.count++, a = sn.bind(t), l.addEventListener("load", a), l.addEventListener("error", a));
    }
  }
  var Yi = 0;
  function _h(t, l) {
    return t.stylesheets && t.count === 0 && Xi(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(a) {
      var e = setTimeout(function() {
        if (t.stylesheets && Xi(t, t.stylesheets), t.unsuspend) {
          var n = t.unsuspend;
          t.unsuspend = null, n();
        }
      }, 6e4 + l);
      0 < t.imgBytes && Yi === 0 && (Yi = 62500 * Xy());
      var u = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && Xi(t, t.stylesheets), t.unsuspend)) {
            var n = t.unsuspend;
            t.unsuspend = null, n();
          }
        },
        (t.imgBytes > Yi ? 50 : 800) + l
      );
      return t.unsuspend = a, function() {
        t.unsuspend = null, clearTimeout(e), clearTimeout(u);
      };
    } : null;
  }
  function ed(t) {
    if (t.count === 0 && (t.imgCount === 0 || !t.waitingForImages)) {
      if (t.stylesheets) Xi(t, t.stylesheets);
      else if (t.unsuspend) {
        var l = t.unsuspend;
        t.unsuspend = null, l();
      }
    }
  }
  function sn() {
    this.count--, ed(this);
  }
  function zh() {
    this.imgCount--, ed(this);
  }
  var Gi = null;
  function Xi(t, l) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, Gi = /* @__PURE__ */ new Map(), l.forEach(Nh, t), Gi = null, sn.call(t));
  }
  function Nh(t, l) {
    if (!(l.state.loading & 4)) {
      var a = Gi.get(t);
      if (a) var e = a.get(null);
      else {
        a = /* @__PURE__ */ new Map(), Gi.set(t, a);
        for (var u = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), n = 0; n < u.length; n++) {
          var i = u[n];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (a.set(i.dataset.precedence, i), e = i);
        }
        e && a.set(null, e);
      }
      u = l.instance, i = u.getAttribute("data-precedence"), n = a.get(i) || e, n === e && a.set(null, u), a.set(i, u), this.count++, e = sn.bind(this), u.addEventListener("load", e), u.addEventListener("error", e), n ? n.parentNode.insertBefore(u, n.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(u, t.firstChild)), l.state.loading |= 4;
    }
  }
  var vu = {
    $$typeof: Rt,
    Provider: null,
    Consumer: null,
    _currentValue: jt,
    _currentValue2: jt,
    _threadCount: 0
  };
  function Oh(t, l, a, e, u, n, i, c, f) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = ec(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ec(0), this.hiddenUpdates = ec(null), this.identifierPrefix = e, this.onUncaughtError = u, this.onCaughtError = n, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = f, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function ud(t, l, a, e, u, n, i, c, f, h, b, N) {
    return t = new Oh(
      t,
      l,
      a,
      i,
      f,
      h,
      b,
      N,
      c
    ), l = 1, n === !0 && (l |= 24), n = dl(3, null, null, l), t.current = n, n.stateNode = t, l = Yc(), l.refCount++, t.pooledCache = l, l.refCount++, n.memoizedState = {
      element: e,
      isDehydrated: a,
      cache: l
    }, Lc(n), t;
  }
  function nd(t) {
    return t ? (t = Xe, t) : Xe;
  }
  function id(t, l, a, e, u, n) {
    u = nd(u), e.context === null ? e.context = u : e.pendingContext = u, e = qa(l), e.payload = { element: a }, n = n === void 0 ? null : n, n !== null && (e.callback = n), a = Ya(t, e, l), a !== null && (gl(a, t, l), Gu(a, t, l));
  }
  function cd(t, l) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var a = t.retryLane;
      t.retryLane = a !== 0 && a < l ? a : l;
    }
  }
  function Os(t, l) {
    cd(t, l), (t = t.alternate) && cd(t, l);
  }
  function fd(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = ce(t, 67108864);
      l !== null && gl(l, t, 67108864), Os(t, 67108864);
    }
  }
  function sd(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = pl();
      l = uc(l);
      var a = ce(t, l);
      a !== null && gl(a, t, l), Os(t, l);
    }
  }
  var yu = !0;
  function Ah(t, l, a, e) {
    var u = O.T;
    O.T = null;
    var n = U.p;
    try {
      U.p = 2, As(t, l, a, e);
    } finally {
      U.p = n, O.T = u;
    }
  }
  function Mh(t, l, a, e) {
    var u = O.T;
    O.T = null;
    var n = U.p;
    try {
      U.p = 8, As(t, l, a, e);
    } finally {
      U.p = n, O.T = u;
    }
  }
  function As(t, l, a, e) {
    if (yu) {
      var u = Ms(e);
      if (u === null)
        cs(
          t,
          l,
          e,
          Qi,
          a
        ), rd(t, e);
      else if (Dh(
        u,
        t,
        l,
        a,
        e
      ))
        e.stopPropagation();
      else if (rd(t, e), l & 4 && -1 < ph.indexOf(t)) {
        for (; u !== null; ) {
          var n = De(u);
          if (n !== null)
            switch (n.tag) {
              case 3:
                if (n = n.stateNode, n.current.memoizedState.isDehydrated) {
                  var i = ae(n.pendingLanes);
                  if (i !== 0) {
                    var c = n;
                    for (c.pendingLanes |= 2, c.entangledLanes |= 2; i; ) {
                      var f = 1 << 31 - El(i);
                      c.entanglements[1] |= f, i &= ~f;
                    }
                    fa(n), (rt & 6) === 0 && (Ai = bl() + 500, ln(0));
                  }
                }
                break;
              case 31:
              case 13:
                c = ce(n, 2), c !== null && gl(c, n, 2), Di(), Os(n, 2);
            }
          if (n = Ms(e), n === null && cs(
            t,
            l,
            e,
            Qi,
            a
          ), n === u) break;
          u = n;
        }
        u !== null && e.stopPropagation();
      } else
        cs(
          t,
          l,
          e,
          null,
          a
        );
    }
  }
  function Ms(t) {
    return t = rc(t), ps(t);
  }
  var Qi = null;
  function ps(t) {
    if (Qi = null, t = ee(t), t !== null) {
      var l = _(t);
      if (l === null) t = null;
      else {
        var a = l.tag;
        if (a === 13) {
          if (t = D(l), t !== null) return t;
          t = null;
        } else if (a === 31) {
          if (t = x(l), t !== null) return t;
          t = null;
        } else if (a === 3) {
          if (l.stateNode.current.memoizedState.isDehydrated)
            return l.tag === 3 ? l.stateNode.containerInfo : null;
          t = null;
        } else l !== t && (t = null);
      }
    }
    return Qi = t, null;
  }
  function od(t) {
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
        switch (Xd()) {
          case $s:
            return 2;
          case Fs:
            return 8;
          case Tn:
          case Qd:
            return 32;
          case Ws:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Ds = !1, Wa = null, ka = null, Ia = null, on = /* @__PURE__ */ new Map(), rn = /* @__PURE__ */ new Map(), Pa = [], ph = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function rd(t, l) {
    switch (t) {
      case "focusin":
      case "focusout":
        Wa = null;
        break;
      case "dragenter":
      case "dragleave":
        ka = null;
        break;
      case "mouseover":
      case "mouseout":
        Ia = null;
        break;
      case "pointerover":
      case "pointerout":
        on.delete(l.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        rn.delete(l.pointerId);
    }
  }
  function mn(t, l, a, e, u, n) {
    return t === null || t.nativeEvent !== n ? (t = {
      blockedOn: l,
      domEventName: a,
      eventSystemFlags: e,
      nativeEvent: n,
      targetContainers: [u]
    }, l !== null && (l = De(l), l !== null && fd(l)), t) : (t.eventSystemFlags |= e, l = t.targetContainers, u !== null && l.indexOf(u) === -1 && l.push(u), t);
  }
  function Dh(t, l, a, e, u) {
    switch (l) {
      case "focusin":
        return Wa = mn(
          Wa,
          t,
          l,
          a,
          e,
          u
        ), !0;
      case "dragenter":
        return ka = mn(
          ka,
          t,
          l,
          a,
          e,
          u
        ), !0;
      case "mouseover":
        return Ia = mn(
          Ia,
          t,
          l,
          a,
          e,
          u
        ), !0;
      case "pointerover":
        var n = u.pointerId;
        return on.set(
          n,
          mn(
            on.get(n) || null,
            t,
            l,
            a,
            e,
            u
          )
        ), !0;
      case "gotpointercapture":
        return n = u.pointerId, rn.set(
          n,
          mn(
            rn.get(n) || null,
            t,
            l,
            a,
            e,
            u
          )
        ), !0;
    }
    return !1;
  }
  function md(t) {
    var l = ee(t.target);
    if (l !== null) {
      var a = _(l);
      if (a !== null) {
        if (l = a.tag, l === 13) {
          if (l = D(a), l !== null) {
            t.blockedOn = l, eo(t.priority, function() {
              sd(a);
            });
            return;
          }
        } else if (l === 31) {
          if (l = x(a), l !== null) {
            t.blockedOn = l, eo(t.priority, function() {
              sd(a);
            });
            return;
          }
        } else if (l === 3 && a.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function Li(t) {
    if (t.blockedOn !== null) return !1;
    for (var l = t.targetContainers; 0 < l.length; ) {
      var a = Ms(t.nativeEvent);
      if (a === null) {
        a = t.nativeEvent;
        var e = new a.constructor(
          a.type,
          a
        );
        oc = e, a.target.dispatchEvent(e), oc = null;
      } else
        return l = De(a), l !== null && fd(l), t.blockedOn = a, !1;
      l.shift();
    }
    return !0;
  }
  function dd(t, l, a) {
    Li(t) && a.delete(l);
  }
  function Ch() {
    Ds = !1, Wa !== null && Li(Wa) && (Wa = null), ka !== null && Li(ka) && (ka = null), Ia !== null && Li(Ia) && (Ia = null), on.forEach(dd), rn.forEach(dd);
  }
  function Zi(t, l) {
    t.blockedOn === l && (t.blockedOn = null, Ds || (Ds = !0, r.unstable_scheduleCallback(
      r.unstable_NormalPriority,
      Ch
    )));
  }
  var Vi = null;
  function vd(t) {
    Vi !== t && (Vi = t, r.unstable_scheduleCallback(
      r.unstable_NormalPriority,
      function() {
        Vi === t && (Vi = null);
        for (var l = 0; l < t.length; l += 3) {
          var a = t[l], e = t[l + 1], u = t[l + 2];
          if (typeof e != "function") {
            if (ps(e || a) === null)
              continue;
            break;
          }
          var n = De(a);
          n !== null && (t.splice(l, 3), l -= 3, of(
            n,
            {
              pending: !0,
              data: u,
              method: a.method,
              action: e
            },
            e,
            u
          ));
        }
      }
    ));
  }
  function hu(t) {
    function l(f) {
      return Zi(f, t);
    }
    Wa !== null && Zi(Wa, t), ka !== null && Zi(ka, t), Ia !== null && Zi(Ia, t), on.forEach(l), rn.forEach(l);
    for (var a = 0; a < Pa.length; a++) {
      var e = Pa[a];
      e.blockedOn === t && (e.blockedOn = null);
    }
    for (; 0 < Pa.length && (a = Pa[0], a.blockedOn === null); )
      md(a), a.blockedOn === null && Pa.shift();
    if (a = (t.ownerDocument || t).$$reactFormReplay, a != null)
      for (e = 0; e < a.length; e += 3) {
        var u = a[e], n = a[e + 1], i = u[ml] || null;
        if (typeof n == "function")
          i || vd(a);
        else if (i) {
          var c = null;
          if (n && n.hasAttribute("formAction")) {
            if (u = n, i = n[ml] || null)
              c = i.formAction;
            else if (ps(u) !== null) continue;
          } else c = i.action;
          typeof c == "function" ? a[e + 1] = c : (a.splice(e, 3), e -= 3), vd(a);
        }
      }
  }
  function yd() {
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
      u !== null && (u(), u = null), e || setTimeout(a, 20);
    }
    function a() {
      if (!e && !navigation.transition) {
        var n = navigation.currentEntry;
        n && n.url != null && navigation.navigate(n.url, {
          state: n.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var e = !1, u = null;
      return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", l), navigation.addEventListener("navigateerror", l), setTimeout(a, 100), function() {
        e = !0, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", l), navigation.removeEventListener("navigateerror", l), u !== null && (u(), u = null);
      };
    }
  }
  function Cs(t) {
    this._internalRoot = t;
  }
  Ki.prototype.render = Cs.prototype.render = function(t) {
    var l = this._internalRoot;
    if (l === null) throw Error(s(409));
    var a = l.current, e = pl();
    id(a, e, t, l, null, null);
  }, Ki.prototype.unmount = Cs.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var l = t.containerInfo;
      id(t.current, 2, null, t, null, null), Di(), l[pe] = null;
    }
  };
  function Ki(t) {
    this._internalRoot = t;
  }
  Ki.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var l = ao();
      t = { blockedOn: null, target: t, priority: l };
      for (var a = 0; a < Pa.length && l !== 0 && l < Pa[a].priority; a++) ;
      Pa.splice(a, 0, t), a === 0 && md(t);
    }
  };
  var hd = E.version;
  if (hd !== "19.3.0")
    throw Error(
      s(
        527,
        hd,
        "19.3.0"
      )
    );
  U.findDOMNode = function(t) {
    var l = t._reactInternals;
    if (l === void 0)
      throw typeof t.render == "function" ? Error(s(188)) : (t = Object.keys(t).join(","), Error(s(268, t)));
    return t = L(l), t = t !== null ? j(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var Uh = {
    bundleType: 0,
    version: "19.3.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: O,
    reconcilerVersion: "19.3.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var wi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!wi.isDisabled && wi.supportsFiber)
      try {
        bu = wi.inject(
          Uh
        ), Tl = wi;
      } catch {
      }
  }
  return vn.createRoot = function(t, l) {
    if (!M(t)) throw Error(s(299));
    var a = !1, e = "", u = nm, n = im, i = cm;
    return l != null && (l.unstable_strictMode === !0 && (a = !0), l.identifierPrefix !== void 0 && (e = l.identifierPrefix), l.onUncaughtError !== void 0 && (u = l.onUncaughtError), l.onCaughtError !== void 0 && (n = l.onCaughtError), l.onRecoverableError !== void 0 && (i = l.onRecoverableError)), l = ud(
      t,
      1,
      !1,
      null,
      null,
      a,
      e,
      null,
      u,
      n,
      i,
      yd
    ), t[pe] = l.current, is(t), new Cs(l);
  }, vn.hydrateRoot = function(t, l, a) {
    if (!M(t)) throw Error(s(299));
    var e = !1, u = "", n = nm, i = im, c = cm, f = null;
    return a != null && (a.unstable_strictMode === !0 && (e = !0), a.identifierPrefix !== void 0 && (u = a.identifierPrefix), a.onUncaughtError !== void 0 && (n = a.onUncaughtError), a.onCaughtError !== void 0 && (i = a.onCaughtError), a.onRecoverableError !== void 0 && (c = a.onRecoverableError), a.formState !== void 0 && (f = a.formState)), l = ud(
      t,
      1,
      !0,
      l,
      a ?? null,
      e,
      u,
      f,
      n,
      i,
      c,
      yd
    ), l.context = nd(null), a = l.current, e = pl(), e = uc(e), u = qa(e), u.callback = null, Ya(a, u, e), a = e, l.current.lanes = a, Eu(l, a), fa(l), t[pe] = l.current, is(t), new Ki(l);
  }, vn.version = "19.3.0", vn;
}
var Ad;
function Qh() {
  if (Ad) return Hs.exports;
  Ad = 1;
  function r() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r);
      } catch (E) {
        console.error(E);
      }
  }
  return r(), Hs.exports = Xh(), Hs.exports;
}
var Lh = Qh();
function yn(r, E, d) {
  return Math.min(d, Math.max(E, r));
}
function le(r) {
  const E = Math.max(0, Number(r) || 0), d = Math.floor(E / 60), s = Math.floor(E % 60), M = Math.floor((E - Math.floor(E)) * 1e3);
  return `${String(d).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(M).padStart(3, "0")}`;
}
function Zh(r) {
  const E = [0.1, 0.25, 0.5, 1, 2, 5, 10, 15, 30, 60, 120, 300, 600];
  return E.find((d) => d * r >= 70) ?? E[E.length - 1];
}
function Vh(r, E, d, s, M) {
  if (M <= 0 || s <= 0) return { start: 0, end: 0 };
  const _ = Math.max(0, r - d), D = Math.max(0, r + E - d), x = yn(_ / s, 0, M), Q = yn(D / s, x, M);
  return { start: x, end: Q };
}
function Ys(r, E) {
  return `${yn(r / Math.max(E, 1e-9), 0, 1) * 100}%`;
}
function Md(r, E, d, s = 0.08) {
  const M = Number.isFinite(E) && Number(E) > r ? Number(E) : r + 0.5;
  return `${Math.max(s, (M - r) / Math.max(d, 1e-9) * 100)}%`;
}
function Kh({ min: r, max: E, colour: d = "#79c0ff" }) {
  const s = ut.useRef(null);
  return ut.useEffect(() => {
    const M = s.current;
    if (!M) return;
    const _ = Math.max(1, Math.min(r.length, E.length));
    M.width = _, M.height = 180;
    const D = M.getContext("2d");
    if (!D) return;
    D.clearRect(0, 0, _, M.height), D.strokeStyle = d, D.lineWidth = 1, D.beginPath();
    const x = M.height / 2, Q = M.height * 0.46;
    for (let L = 0; L < _; L += 1) {
      const j = L + 0.5;
      D.moveTo(j, x - (Number(E[L]) || 0) * Q), D.lineTo(j, x - (Number(r[L]) || 0) * Q);
    }
    D.stroke();
  }, [d, E, r]), /* @__PURE__ */ C.jsx("canvas", { ref: s, className: "rts-waveform", "aria-hidden": "true" });
}
function wh({ rows: r }) {
  const E = ut.useRef(null);
  return ut.useEffect(() => {
    const d = E.current, s = r.filter((x) => x.length > 0);
    if (!d || !s.length) return;
    const M = Math.max(...s.map((x) => x.length));
    d.width = Math.min(4096, s.length), d.height = Math.min(256, M);
    const _ = d.getContext("2d");
    if (!_) return;
    const D = _.createImageData(d.width, d.height);
    for (let x = 0; x < d.width; x += 1) {
      const Q = Math.min(s.length - 1, Math.floor(x * s.length / d.width)), L = s[Q], j = Math.max(1e-9, ...L.map((T) => Number(T) || 0));
      for (let T = 0; T < d.height; T += 1) {
        const Z = Math.min(L.length - 1, Math.floor((d.height - 1 - T) * L.length / d.height)), Et = yn((Number(L[Z]) || 0) / j, 0, 1), Dt = (T * d.width + x) * 4;
        D.data[Dt] = Math.round(40 + 180 * Et), D.data[Dt + 1] = Math.round(35 + 110 * Et), D.data[Dt + 2] = Math.round(80 + 170 * Et), D.data[Dt + 3] = 255;
      }
    }
    _.putImageData(D, 0, 0);
  }, [r]), /* @__PURE__ */ C.jsx("canvas", { ref: E, className: "rts-matrix", "aria-hidden": "true" });
}
function Jh({ items: r, duration: E }) {
  const d = r.filter((_) => Number.isFinite(_.value) && _.value > 0);
  if (!d.length) return null;
  const s = Math.log2(Math.max(20, Math.min(...d.map((_) => _.value)))), M = Math.log2(Math.max(100, ...d.map((_) => _.value)));
  return d.map((_, D) => {
    const x = (Math.log2(_.value) - s) / Math.max(0.01, M - s);
    return /* @__PURE__ */ C.jsx(
      "span",
      {
        className: `rts-note ${_.className ?? ""}`,
        style: { left: Ys(_.start, E), width: Md(_.start, _.end ?? _.start + 0.12, E, 0.04), top: `${8 + (1 - x) * 72}px` },
        title: _.title ?? `${_.label ?? `${_.value.toFixed(1)} Hz`} · ${le(_.start)}`
      },
      `${_.start}-${D}`
    );
  });
}
function $h({ content: r, duration: E }) {
  switch (r.type) {
    case "waveform":
      return /* @__PURE__ */ C.jsx(Kh, { ...r });
    case "image":
      return /* @__PURE__ */ C.jsx("img", { className: `rts-image ${r.className ?? ""}`, src: r.src, alt: r.alt });
    case "markers":
      return /* @__PURE__ */ C.jsx(C.Fragment, { children: r.items.map((d, s) => /* @__PURE__ */ C.jsx(
        "span",
        {
          className: `rts-marker ${d.emphasis ? "rts-marker-emphasis" : ""} ${d.className ?? ""}`,
          style: { left: Ys(d.time, E) },
          title: d.label
        },
        `${d.time}-${s}`
      )) });
    case "blocks":
      return /* @__PURE__ */ C.jsx(C.Fragment, { children: r.items.map((d, s) => /* @__PURE__ */ C.jsx(
        "span",
        {
          className: `rts-block ${d.className ?? ""}`,
          style: { left: Ys(d.start, E), width: Md(d.start, d.end, E) },
          title: d.title ?? `${d.label ?? ""} · ${le(d.start)}${d.end ? ` — ${le(d.end)}` : ""}`,
          children: d.label
        },
        `${d.start}-${s}`
      )) });
    case "notes":
      return /* @__PURE__ */ C.jsx(Jh, { items: r.items, duration: E });
    case "curve": {
      const d = r.points.filter((x) => Number.isFinite(x.time) && Number.isFinite(x.value));
      if (!d.length) return null;
      const s = d.map((x) => x.value), M = Math.min(...s), _ = Math.max(...s), D = d.map((x) => {
        const Q = x.time / Math.max(E, 1e-9) * 2e3, L = 180 - (x.value - M) / Math.max(1e-9, _ - M) * 168 - 6;
        return `${Q.toFixed(2)},${L.toFixed(2)}`;
      }).join(" ");
      return /* @__PURE__ */ C.jsx("svg", { className: "rts-curve", viewBox: "0 0 2000 180", preserveAspectRatio: "none", "aria-hidden": "true", children: /* @__PURE__ */ C.jsx("polyline", { fill: "none", stroke: r.colour ?? "#7ee787", strokeWidth: "2", vectorEffect: "non-scaling-stroke", points: D }) });
    }
    case "matrix":
      return /* @__PURE__ */ C.jsx(wh, { ...r });
    case "summary":
      return /* @__PURE__ */ C.jsx("div", { className: "rts-summary", children: r.items.map((d, s) => /* @__PURE__ */ C.jsxs("span", { className: "rts-summary-item", children: [
        /* @__PURE__ */ C.jsxs("strong", { children: [
          d.label,
          ": "
        ] }),
        d.value
      ] }, `${d.label}-${s}`)) });
    case "artifact":
      return /* @__PURE__ */ C.jsxs("div", { className: "rts-artifact", children: [
        /* @__PURE__ */ C.jsx("span", { children: r.note }),
        r.href && /* @__PURE__ */ C.jsx("a", { href: r.href, target: "_blank", rel: "noopener noreferrer", children: r.linkLabel ?? "open" })
      ] });
    case "text":
      return /* @__PURE__ */ C.jsx("div", { className: "rts-text", children: r.text });
    case "custom":
      return /* @__PURE__ */ C.jsx(C.Fragment, { children: r.node });
  }
}
function Fh(r, E) {
  if (r <= 0 || E <= 0) return [];
  const d = Zh(E), s = d / 5, M = [];
  for (let _ = 0; _ <= r + 1e-6; _ += s)
    M.push({
      time: _,
      major: Math.abs(_ / d - Math.round(_ / d)) < 1e-5
    });
  return M;
}
function Wh({
  audioSrc: r,
  lanes: E,
  title: d = "Audio timeline",
  subtitle: s,
  duration: M = 0,
  grid: _ = [],
  headerEnd: D,
  footer: x,
  className: Q = "",
  labelWidth: L = 230,
  initialZoom: j = 20,
  followPlayheadByDefault: T = !0,
  preload: Z = "metadata",
  crossOrigin: Et,
  onDurationChange: Dt,
  onTimeChange: Xt,
  onWindowChange: ft,
  onPlaybackError: Mt
}) {
  const bt = ut.useRef(null), xt = ut.useRef(null), Qt = ut.useRef(null), [vt, Lt] = ut.useState(Math.max(0, M)), [V, B] = ut.useState(0), [$, _t] = ut.useState(!1), [Vt, nl] = ut.useState(T), [Ql, sa] = ut.useState(j), [Rt, R] = ut.useState(0), [K, J] = ut.useState({ start: 0, end: 0 });
  ut.useEffect(() => {
    M > 0 && Lt(M);
  }, [M]), ut.useEffect(() => {
    const O = xt.current;
    if (!O) return;
    const U = () => R(O.clientWidth);
    U();
    const jt = new ResizeObserver(U);
    return jt.observe(O), () => jt.disconnect();
  }, []);
  const mt = vt > 0 ? Math.max(0.4, Math.max(320, Rt - L - 16) / vt) : 0.4, W = Math.max(mt, mt * Math.pow(2, Ql / 18)), Sl = Math.max(1, vt * W), Ll = ut.useMemo(() => Fh(vt, W), [vt, W]), Cl = ut.useCallback(() => {
    const O = xt.current;
    if (!O) return;
    const U = Vh(O.scrollLeft, O.clientWidth, L, W, vt);
    J(U), ft?.(U);
  }, [vt, L, ft, W]);
  ut.useEffect(() => {
    Cl();
  }, [Cl, Rt]);
  const m = ut.useCallback((O) => {
    B(O), Xt?.(O);
    const U = xt.current;
    if (!U || !Vt || bt.current?.paused) return;
    const jt = L + O * W, Ul = U.scrollLeft + U.clientWidth, il = Math.min(180, U.clientWidth * 0.2);
    jt > Ul - il && (U.scrollLeft = Math.max(0, jt - U.clientWidth + il));
  }, [Vt, L, Xt, W]), A = ut.useCallback(() => {
    Qt.current !== null && cancelAnimationFrame(Qt.current), Qt.current = null;
  }, []), Y = ut.useCallback(() => {
    A();
    const O = () => {
      const U = bt.current;
      U && (m(Number(U.currentTime) || 0), !U.paused && !U.ended && (Qt.current = requestAnimationFrame(O)));
    };
    Qt.current = requestAnimationFrame(O);
  }, [m, A]);
  ut.useEffect(() => A, [A]);
  const G = async () => {
    const O = bt.current;
    if (!(!O || vt <= 0))
      try {
        O.paused ? await O.play() : O.pause();
      } catch (U) {
        Mt?.(U);
      }
  }, nt = (O) => {
    if (vt <= 0 || O.target.closest(".rts-label, a, button, input")) return;
    const U = xt.current, jt = bt.current;
    if (!U || !jt) return;
    const Ul = U.getBoundingClientRect(), il = O.clientX - Ul.left + U.scrollLeft - L;
    if (il < 0) return;
    const cl = yn(il / W, 0, vt);
    jt.currentTime = cl, m(cl);
  }, it = (O) => {
    const U = xt.current, jt = U ? Math.max(0, (U.scrollLeft + U.clientWidth / 2 - L) / W) : 0;
    sa(O), requestAnimationFrame(() => {
      const Ul = xt.current;
      if (!Ul) return;
      const il = vt > 0 ? Math.max(0.4, Math.max(320, Ul.clientWidth - L - 16) / vt) : 0.4, cl = Math.max(il, il * Math.pow(2, O / 18));
      Ul.scrollLeft = Math.max(0, L + jt * cl - Ul.clientWidth / 2), Cl();
    });
  }, st = () => {
    const O = Number(bt.current?.duration) || 0;
    O > 0 && (Lt(O), Dt?.(O));
  };
  return /* @__PURE__ */ C.jsxs(
    "section",
    {
      className: `rts-sequence ${Q}`,
      style: { "--rts-label-width": `${L}px`, "--rts-track-width": `${Sl}px` },
      children: [
        /* @__PURE__ */ C.jsxs("header", { className: "rts-toolbar", children: [
          /* @__PURE__ */ C.jsxs("div", { className: "rts-ident", children: [
            /* @__PURE__ */ C.jsx("strong", { children: d }),
            s && /* @__PURE__ */ C.jsx("span", { children: s })
          ] }),
          /* @__PURE__ */ C.jsxs("div", { className: "rts-transport", "aria-label": "Timeline playback controls", children: [
            /* @__PURE__ */ C.jsx("button", { type: "button", className: "rts-button rts-play", onClick: G, "aria-label": $ ? "Pause" : "Play", children: $ ? "❚❚" : "▶" }),
            /* @__PURE__ */ C.jsxs("output", { className: "rts-time", "aria-live": "off", children: [
              le(V),
              " / ",
              le(vt)
            ] }),
            /* @__PURE__ */ C.jsx("button", { type: "button", className: "rts-button", onClick: () => it(0), children: "Fit" }),
            /* @__PURE__ */ C.jsxs("label", { className: "rts-control", children: [
              /* @__PURE__ */ C.jsx("span", { children: "Zoom" }),
              /* @__PURE__ */ C.jsx("input", { "aria-label": "Timeline zoom", type: "range", min: "0", max: "100", value: Ql, onChange: (O) => it(Number(O.target.value)) })
            ] }),
            /* @__PURE__ */ C.jsxs("label", { className: "rts-control", children: [
              /* @__PURE__ */ C.jsx("input", { type: "checkbox", checked: Vt, onChange: (O) => nl(O.target.checked) }),
              /* @__PURE__ */ C.jsx("span", { children: "Follow" })
            ] })
          ] }),
          /* @__PURE__ */ C.jsx("div", { className: "rts-header-end", children: D })
        ] }),
        /* @__PURE__ */ C.jsx(
          "audio",
          {
            ref: bt,
            src: r,
            preload: Z,
            crossOrigin: Et,
            onLoadedMetadata: st,
            onPlay: () => {
              _t(!0), Y();
            },
            onPause: () => {
              _t(!1), A(), m(Number(bt.current?.currentTime) || 0);
            },
            onEnded: () => {
              _t(!1), A(), m(Number(bt.current?.currentTime) || 0);
            }
          }
        ),
        /* @__PURE__ */ C.jsx("div", { className: "rts-workspace", children: /* @__PURE__ */ C.jsx("div", { ref: xt, className: "rts-scroller", onScroll: Cl, onClick: nt, children: /* @__PURE__ */ C.jsxs("div", { className: "rts-inner", children: [
          /* @__PURE__ */ C.jsxs("div", { className: "rts-ruler-row", children: [
            /* @__PURE__ */ C.jsx("div", { className: "rts-label rts-ruler-label", children: "TIME" }),
            /* @__PURE__ */ C.jsx("div", { className: "rts-ruler-track", children: Ll.map((O) => /* @__PURE__ */ C.jsx("span", { className: `rts-tick ${O.major ? "rts-tick-major" : ""}`, style: { left: `${O.time * W}px` }, children: O.major && /* @__PURE__ */ C.jsx("span", { className: "rts-tick-label", children: le(O.time).slice(0, -4) }) }, O.time)) })
          ] }),
          /* @__PURE__ */ C.jsx("div", { className: "rts-lanes", children: E.map((O) => /* @__PURE__ */ C.jsxs("div", { className: `rts-lane rts-lane-${O.kind ?? "default"} ${O.className ?? ""}`, style: O.height ? { "--rts-lane-height": `${O.height}px` } : void 0, children: [
            /* @__PURE__ */ C.jsxs("div", { className: "rts-label", children: [
              /* @__PURE__ */ C.jsx("div", { className: "rts-title", children: O.title }),
              O.meta && /* @__PURE__ */ C.jsx("div", { className: "rts-meta", children: O.meta })
            ] }),
            /* @__PURE__ */ C.jsx("div", { className: "rts-track", children: /* @__PURE__ */ C.jsx($h, { content: O.content, duration: vt }) })
          ] }, O.id)) }),
          _.length > 0 && /* @__PURE__ */ C.jsx("div", { className: "rts-grid", "aria-hidden": "true", children: _.map((O, U) => /* @__PURE__ */ C.jsx("span", { className: `rts-grid-line ${O.emphasis ? "rts-grid-line-emphasis" : ""} ${O.className ?? ""}`, style: { left: `${O.time * W}px` } }, `${O.time}-${U}`)) }),
          /* @__PURE__ */ C.jsx("div", { className: "rts-playhead", style: { left: `${L + V * W}px` }, "aria-hidden": "true" })
        ] }) }) }),
        /* @__PURE__ */ C.jsxs("footer", { className: "rts-footer", children: [
          /* @__PURE__ */ C.jsx("div", { children: x }),
          /* @__PURE__ */ C.jsxs("output", { className: "rts-window", children: [
            le(K.start),
            " — ",
            le(K.end)
          ] })
        ] })
      ]
    }
  );
}
const ul = (r) => document.querySelector(r), kh = ul("#uploadView"), Zs = ul("#timelineView"), Ae = ul("#dropZone"), hn = ul("#fileInput"), pd = ul("#chooseButton"), Dd = ul("#uploadProgressWrap"), Ji = ul("#uploadProgress"), $i = ul("#uploadLabel"), gu = ul("#connectionBadge"), Cd = ul("#canonicalBpm"), Ud = ul("#canonicalLyrics"), Rd = ul("#canonicalTiming"), Gs = ul("#knownInfoStatus"), Ih = ul("#loadArcadiansReference"), Ph = ul("#loadArcadiansHero"), t1 = Array.from(Zs.children), Vs = document.createElement("div");
Vs.id = "timelineRoot";
Zs.replaceChildren(Vs);
for (const r of t1) r.remove();
const l1 = Lh.createRoot(Vs), a1 = /* @__PURE__ */ new Set(["wav", "flac", "mp3", "ogg", "opus", "m4a", "aif", "aiff"]);
let Xs = {};
function e1(r) {
  const E = String(r).split("/").pop() || "", d = E.lastIndexOf(".");
  return d >= 0 ? E.slice(d + 1).toLowerCase() : "";
}
function Oa(r) {
  return String(r).replace(/^stems\//, "").replace(/^spectrograms\//, "").replace(/^vamp\/data\//, "Vamp · ").replace(/^beats\//, "Beats · ").replace(/^speech\//, "Speech · ").replace(/^deep\//, "Deep · ").replace(/[_-]+/g, " ");
}
function Ks(r, E) {
  return `/${r}/${E.split("/").map(encodeURIComponent).join("/")}`;
}
function Qs(r, E, d = "Generated analysis artifact") {
  return { type: "artifact", note: d, href: E === "__source__" ? `/api/${r}/source` : Ks(r, E) };
}
async function Fl(r, E) {
  const d = await fetch(Ks(r, E), { cache: "no-store" });
  if (!d.ok) throw new Error(`HTTP ${d.status}`);
  return d.json();
}
function Wl(r, E = 2, d = "") {
  const s = Number(r);
  return Number.isFinite(s) ? `${s.toFixed(E)}${d}` : "—";
}
function Oe(r, E, d, s, M = "feature") {
  const _ = s.filter(([, D]) => D != null && D !== "");
  return {
    id: r,
    title: E,
    meta: d,
    kind: M,
    content: {
      type: "summary",
      items: (_.length ? _ : [["status", "analysis available"]]).map(([D, x]) => ({ label: D, value: x }))
    }
  };
}
function Fi(r) {
  return (r || []).flatMap((E) => {
    const d = Number(E.start);
    if (!Number.isFinite(d)) return [];
    const s = Number(E.end);
    return [{
      start: d,
      end: Number.isFinite(s) && s > d ? s : d + 0.5,
      label: E.label || E.text || E.values?.[0] || ""
    }];
  });
}
function u1(r) {
  const E = Array.isArray(r.events) ? r.events : [];
  switch (String(r.kind || "")) {
    case "curve":
      return { type: "curve", points: E.flatMap((d) => {
        const s = Number(d.start), M = Number(d.values?.[0]);
        return Number.isFinite(s) && Number.isFinite(M) && M > 0 ? [{ time: s, value: M }] : [];
      }) };
    case "matrix":
      return { type: "matrix", rows: E.map((d) => d.values || []).filter((d) => d.length) };
    case "notes":
      return { type: "notes", items: E.flatMap((d) => {
        const s = Number(d.values?.[0]), M = Number(d.start);
        if (!Number.isFinite(s) || s <= 0 || !Number.isFinite(M)) return [];
        const _ = Number(d.end);
        return [{ start: M, end: Number.isFinite(_) && _ > M ? _ : M + 0.12, value: s, label: d.label }];
      }) };
    case "segments":
      return { type: "blocks", items: Fi(E) };
    case "events":
      return { type: "markers", items: E.flatMap((d) => Number.isFinite(Number(d.start)) ? [{ time: Number(d.start) }] : []) };
    default:
      return { type: "artifact", note: E[0]?.label || E[0]?.values?.join(", ") || r.title || "analysis" };
  }
}
async function Hd(r, E, d, s, M) {
  const _ = new URLSearchParams({ path: M, points: "12000" }), D = await fetch(`/api/${r}/waveform?${_}`);
  if (!D.ok) return { id: E, title: d, meta: s, kind: "artifact", content: Qs(r, M, `waveform unavailable (${D.status})`) };
  const x = await D.json();
  return { id: E, title: d, meta: s, kind: "waveform", content: { type: "waveform", min: x.min || [], max: x.max || [] }, duration: Number(x.duration_seconds) || 0 };
}
async function n1(r, E) {
  const d = E.path, s = `file:${d}`, M = e1(d);
  if (d === "canonical.json") return null;
  if (a1.has(M)) return Hd(r, s, Oa(d), "audio waveform", d);
  if (d.startsWith("spectrograms/") && M === "npz") {
    const _ = new URLSearchParams({ path: d, max_width: "8192", max_height: "768" });
    return { id: s, title: Oa(d), meta: "spectrogram data · exact song timeline", kind: "spectrogram", content: { type: "image", src: `/api/${r}/spectrogram?${_}`, alt: `${Oa(d)} spectrogram` } };
  }
  if (d.startsWith("spectrograms/") && M === "png")
    return { id: s, title: Oa(d), meta: "rendered spectrogram PNG", kind: "image", content: { type: "image", src: Ks(r, d), alt: `${Oa(d)} rendered spectrogram` } };
  try {
    if (d.startsWith("beats/") && M === "json") {
      const _ = await Fl(r, d), D = new Set((_.downbeats || []).map((x) => Number(x).toFixed(3)));
      return { id: s, title: Oa(d), meta: "beat / downbeat events", kind: "events", content: { type: "markers", items: (_.beats || []).flatMap((x) => {
        const Q = Number(x);
        return Number.isFinite(Q) ? [{ time: Q, emphasis: D.has(Q.toFixed(3)), label: D.has(Q.toFixed(3)) ? "Downbeat" : "Beat" }] : [];
      }) } };
    }
    if (d.startsWith("vamp/data/") && M === "json") {
      const _ = await Fl(r, d);
      return { id: s, title: Oa(d), meta: "Vamp feature analysis", kind: "feature", content: u1(_) };
    }
    if (d === "speech/whisper.json") {
      const _ = await Fl(r, d);
      return { id: s, title: "Speech · Whisper words", meta: "word-aligned transcript", kind: "words", content: { type: "blocks", items: (_.words || []).flatMap((D) => {
        const x = Number(D.start), Q = Number(D.end);
        return Number.isFinite(x) ? [{ start: x, end: Number.isFinite(Q) ? Math.max(x + 0.03, Q) : x + 0.03, label: String(D.word || "").trim() }] : [];
      }) } };
    }
    if (d === "deep/structure/structure.json" || d === "deep/song_map/song_map.json") {
      const _ = await Fl(r, d), D = d.includes("song_map");
      return { id: s, title: D ? "Deep · song map" : "Deep · functional structure", meta: D ? "section-level sonic / rhythm / harmony / lyric fusion" : "All-In-One · functional song sections", kind: "deep-structure", content: { type: "blocks", items: Fi(D ? _.sections : _.segments) } };
    }
    if (d === "deep/harmony/harmony.json") {
      const _ = await Fl(r, d), D = _.chords?.collapsed_progression || [];
      return D.length ? { id: s, title: "Deep · harmony", meta: "collapsed chord progression + key evidence", kind: "deep-harmony", content: { type: "blocks", items: Fi(D) } } : Oe(s, "Deep · harmony", "collapsed chord progression + key evidence", [["key", _.vamp_key || _.independent_key_candidates_from_nnls_chroma?.[0]?.key || "—"], ["tuning", _.tuning_hz ? `${Number(_.tuning_hz).toFixed(1)} Hz` : "—"]], "deep-harmony");
    }
    if (d === "deep/lyrics/lyrics.json") {
      const _ = await Fl(r, d), D = (_.lines || []).filter((x) => Number.isFinite(Number(x.start)) && Number.isFinite(Number(x.end)));
      return D.length ? { id: s, title: "Deep · rhyme & prosody", meta: "phonetic rhyme, repetition and delivery", kind: "deep-lyrics", content: { type: "blocks", items: Fi(D) } } : Oe(s, "Deep · rhyme & prosody", "phonetic rhyme, repetition and delivery", [["rhyme scheme", _.rhyme?.scheme || "—"], ["lines", _.line_count ?? "—"], ["words", _.word_count ?? "—"]], "deep-lyrics");
    }
    if (d === "deep/sonic/sonic.json") {
      const _ = await Fl(r, d);
      return Oe(s, "Deep · sonic profile", "loudness · dynamics · timbre · stereo", [["LUFS", Wl(_.loudness?.integrated_lufs_bs1770, 1)], ["crest", Wl(_.loudness?.crest_factor_db, 1, " dB")], ["RMS range", Wl(_.loudness?.short_term_rms_range_db_p95_p10, 1, " dB")], ["centroid", Wl(_.timbre?.spectral_centroid_hz_mean, 0, " Hz")], ["stereo corr", Wl(_.stereo?.left_right_correlation, 2)]]);
    }
    if (d === "deep/rhythm/rhythm.json") {
      const _ = await Fl(r, d);
      return Oe(s, "Deep · groove", "meter · stability · swing · syncopation evidence", [["tempo", Wl(_.tempo?.median_bpm, 2, " BPM")], ["meter", _.meter?.estimated_beats_per_bar ? `${_.meter.estimated_beats_per_bar}/4-ish` : "—"], ["swing", Wl(_.groove?.swing_ratio_long_to_short, 2, ":1")], ["offbeat energy", Wl(_.groove?.offbeat_onset_energy_ratio, 3)], ["onsets/s", Wl(_.groove?.onset_density_per_second, 2)]]);
    }
    if (d === "deep/semantic_text/semantic_text.json") {
      const _ = await Fl(r, d);
      return Oe(s, "Deep · lyric semantics", "sentence embedding theme similarities · not probabilities", (_.theme_similarity || []).slice(0, 7).map((D) => [D.theme, Wl(D.similarity, 3)]));
    }
    if (d === "deep/semantic_audio/semantic_audio.json") {
      const _ = await Fl(r, d), D = Object.entries(_.prompt_sets || {}).flatMap(([x, Q]) => (Q || []).slice(0, 2).map((L) => [`${x}: ${L.prompt}`, Wl(L.similarity, 3)]));
      return Oe(s, "Deep · audio semantics", "MuQ-MuLan zero-shot similarities · CC-BY-NC weights", D);
    }
    if (d === "deep/summary.json") {
      const _ = await Fl(r, d), D = Object.entries(_.analyses || {}).map(([x, Q]) => [x, Q.available ? "ready" : "unavailable"]);
      return (_.errors || []).length && D.push(["errors", _.errors.length]), Oe(s, "Deep · analysis summary", "cross-domain action inventory", D);
    }
  } catch (_) {
    return { id: s, title: Oa(d), meta: "analysis artifact", kind: "artifact", content: Qs(r, d, _.message) };
  }
  return { id: s, title: Oa(d), meta: `${M || "file"} · ${Number(E.bytes || 0).toLocaleString()} bytes`, kind: "artifact", content: Qs(r, d) };
}
function i1(r, E, d, s) {
  const M = [], _ = Number(r?.bpm);
  if (Number.isFinite(_) && _ > 0) {
    const Q = [];
    if (Number.isFinite(E) && s > 0) {
      const L = 60 / _;
      for (let j = E, T = 0; j <= s + 1e-7; j += L, T += 1) Q.push({ time: j, emphasis: T === 0, label: `Canonical beat ${T + 1}` });
    }
    M.push({ id: "canonical:bpm", title: "Canonical BPM", meta: Number.isFinite(E) ? `${_} BPM · anchor ${E.toFixed(3)}s · ${d || "detected beat"}` : `${_} BPM · waiting for first detected beat`, kind: "canonical-bpm", height: 104, content: Q.length ? { type: "markers", items: Q } : { type: "artifact", note: `${_} BPM — grid will begin at the first detected beat` } });
  }
  r?.lyrics && M.push({ id: "canonical:lyrics", title: "Canonical lyrics", meta: "known reference text", kind: "canonical-lyrics", height: 104, content: { type: "text", text: r.lyrics } });
  const D = Array.isArray(r?.lyric_timing) ? r.lyric_timing : [];
  D.length && M.push({ id: "canonical:timing", title: "Canonical lyric timing", meta: `${D.length} timed lyric event${D.length === 1 ? "" : "s"}`, kind: "canonical-timing", height: 104, content: { type: "blocks", items: D.flatMap((Q) => {
    const L = Number(Q.start), j = Number(Q.end);
    return Number.isFinite(L) && L >= 0 ? [{ start: L, end: Number.isFinite(j) && j > L ? j : L + 0.75, label: String(Q.text || ""), className: "stemlab-canonical-lyric" }] : [];
  }) } });
  const x = M.find((Q) => Q.id === "canonical:bpm")?.content?.items || [];
  return { lanes: M, grid: x };
}
function c1({ lines: r }) {
  return /* @__PURE__ */ C.jsxs("details", { open: !0, className: "stemlab-log", children: [
    /* @__PURE__ */ C.jsx("summary", { children: "Analysis log" }),
    /* @__PURE__ */ C.jsx("div", { className: "log", children: r.map((E, d) => /* @__PURE__ */ C.jsxs("div", { className: E.stream === "stderr" ? "stderr" : "stdout", children: [
      "[",
      E.stream,
      "] ",
      E.text
    ] }, d)) })
  ] });
}
function f1({ hash: r, filename: E }) {
  const [d, s] = ut.useState([]), [M, _] = ut.useState(0), [D, x] = ut.useState({ state: "submitted" }), [Q, L] = ut.useState({ bpm: null, lyrics: null, lyric_timing: [] }), [j, T] = ut.useState(null), [Z, Et] = ut.useState(null), [Dt, Xt] = ut.useState([]), ft = ut.useRef(/* @__PURE__ */ new Set()), Mt = ut.useCallback((V, B) => {
    B && Xt(($) => [...$.slice(-799), { stream: V === "stderr" ? "stderr" : "stdout", text: B }]);
  }, []), bt = ut.useCallback(async (V) => {
    if (!V?.path || ft.current.has(V.path)) return;
    ft.current.add(V.path);
    const B = await n1(r, V);
    B && (B.duration && _(($) => $ || B.duration), s(($) => $.some((_t) => _t.id === B.id) ? $ : [...$, B]));
  }, [r]), xt = ut.useCallback(async () => {
    const V = await fetch(`/api/${r}/timeline`, { cache: "no-store" });
    if (!V.ok) return;
    const B = await V.json();
    x(B.status || { state: "submitted" }), B.duration_seconds && _(Number(B.duration_seconds)), B.canonical && L(B.canonical);
    const $ = B.first_detected_beat == null ? NaN : Number(B.first_detected_beat);
    Number.isFinite($) && $ >= 0 && (T($), Et(B.first_detected_beat_source || "detected beat"));
    for (const _t of B.files || []) bt(_t);
  }, [bt, r]);
  ut.useEffect(() => {
    ft.current = /* @__PURE__ */ new Set(), s([]), Hd(r, "__source__", "MASTER · uploaded source", E, "__source__").then(($) => {
      $.duration && _($.duration), s((_t) => [$, ..._t.filter((Vt) => Vt.id !== $.id)]);
    }).catch(($) => Mt("stderr", $.message)), xt();
    const V = window.setInterval(() => {
      xt();
    }, 2500);
    let B = null;
    return typeof window.io == "function" ? (B = window.io({ path: "/socket.io" }), B.on("connect", () => {
      gu.textContent = "live", gu.classList.remove("muted"), B.emit("subscribe", { hash: r });
    }), B.on("disconnect", () => {
      gu.textContent = "reconnecting", gu.classList.add("muted");
    }), B.on("process_output", ($) => Mt($.stream || "stdout", $.line || "")), B.on("process_history", ($) => {
      for (const _t of $.stdout || []) Mt("stdout", _t);
      for (const _t of $.stderr || []) Mt("stderr", _t);
    }), B.on("new_file", ($) => {
      bt($);
    }), B.on("job_status", ($) => {
      x($.status || {}), xt();
    }), B.on("canonical_metadata", ($) => {
      $?.canonical && L($.canonical);
    }), B.on("job_timeout", ($) => Mt("stderr", `Job timeout: ${$.message || "analysis exceeded timeout"}`))) : (gu.textContent = "polling", gu.classList.add("muted"), Mt("stderr", "Socket.IO browser client unavailable; timeline inventory polling remains active.")), () => {
      window.clearInterval(V), B?.disconnect();
    };
  }, [bt, Mt, E, r, xt]);
  const Qt = ut.useMemo(() => i1(Q, j, Z, M), [j, Z, Q, M]), vt = [...Qt.lanes, ...d], Lt = D.state || "submitted";
  return /* @__PURE__ */ C.jsx(
    Wh,
    {
      className: "stemlab-timeline",
      audioSrc: `/api/${r}/source`,
      duration: M,
      title: E,
      subtitle: r,
      lanes: vt,
      grid: Qt.grid,
      onDurationChange: _,
      onPlaybackError: (V) => Mt("stderr", V instanceof Error ? V.message : String(V)),
      headerEnd: /* @__PURE__ */ C.jsxs(C.Fragment, { children: [
        /* @__PURE__ */ C.jsx("span", { className: `badge ${Lt}`, children: Lt }),
        /* @__PURE__ */ C.jsxs("span", { className: "small", children: [
          vt.length,
          " lane",
          vt.length === 1 ? "" : "s"
        ] })
      ] }),
      footer: /* @__PURE__ */ C.jsxs(C.Fragment, { children: [
        /* @__PURE__ */ C.jsx(c1, { lines: Dt }),
        /* @__PURE__ */ C.jsx("span", { className: "dock-links", children: /* @__PURE__ */ C.jsx("a", { href: "https://kieransimkin.co.uk/my-songs/", target: "_blank", rel: "noopener", children: "Kieran Simkin · My Songs ↗" }) })
      ] })
    }
  );
}
function s1() {
  const r = Cd?.value?.trim() || "", E = Ud?.value || "", d = Rd?.value || "";
  return { ...Xs, bpm: r ? Number(r) : null, lyrics: E.trim() || null, lyric_timing: d.trim() || [] };
}
function o1(r) {
  return Number.isFinite(Number(r.bpm)) || !!r.lyrics || !!(typeof r.lyric_timing == "string" && r.lyric_timing.trim()) || !!(Array.isArray(r.lyric_timing) && r.lyric_timing.length);
}
async function r1(r) {
  const E = s1();
  if (!o1(E)) return;
  const d = await fetch(`/api/${r}/canonical`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(E) }), s = await d.json().catch(() => ({}));
  if (!d.ok) throw new Error(s.detail || `Could not save canonical metadata (${d.status})`);
  Gs.textContent = "Known information saved with this song hash.";
}
function m1(r) {
  return new Promise((E, d) => {
    const s = new XMLHttpRequest();
    s.open("PUT", `/upload/${encodeURIComponent(r.name)}`), s.setRequestHeader("Content-Type", r.type || "application/octet-stream"), s.upload.onprogress = (M) => {
      Dd.classList.remove("hidden");
      const _ = M.lengthComputable ? M.loaded / M.total : 0;
      Ji.style.width = `${Math.round(_ * 100)}%`, $i.textContent = M.lengthComputable ? `${Math.round(_ * 100)}% · ${(M.loaded / 1048576).toFixed(1)} / ${(M.total / 1048576).toFixed(1)} MiB` : `${(M.loaded / 1048576).toFixed(1)} MiB uploaded`;
    }, s.onerror = () => d(new Error("Upload failed")), s.onload = () => {
      let M = {};
      try {
        M = JSON.parse(s.responseText);
      } catch {
      }
      s.status < 200 || s.status >= 300 ? d(new Error(M.detail || `Upload failed (${s.status})`)) : E(M);
    }, s.send(r);
  });
}
async function xd(r, E) {
  kh.classList.add("hidden"), Zs.classList.remove("hidden"), l1.render(/* @__PURE__ */ C.jsx(f1, { hash: r, filename: E || "uploaded audio" }));
}
async function jd(r) {
  if (r) {
    Ji.style.width = "0%", $i.textContent = `Uploading ${r.name}`, Dd.classList.remove("hidden");
    try {
      const E = await m1(r);
      Ji.style.width = "100%", $i.textContent = "Upload complete · attaching to analysis", await r1(E.hash), await xd(E.hash, E.filename || r.name);
    } catch (E) {
      $i.textContent = E.message, Ji.style.width = "0%";
    }
  }
}
async function Bd(r) {
  r?.preventDefault(), r?.stopPropagation();
  try {
    const E = await fetch("/assets/arcadians-reference.json", { cache: "no-store" });
    if (!E.ok) throw new Error(`Could not load Arcadians reference (${E.status})`);
    const d = await E.json();
    Xs = {};
    for (const s of ["title", "artist", "release_date", "isrc", "upc", "website", "my_songs_url", "epk_url", "cover_art_url", "source_url", "sections"])
      d[s] !== void 0 && d[s] !== null && (Xs[s] = d[s]);
    Cd.value = d.bpm ?? "", Ud.value = d.lyrics ?? "", Rd.value = Array.isArray(d.lyric_timing) && d.lyric_timing.length ? JSON.stringify(d.lyric_timing, null, 2) : "", ul(".known-info").open = !0, Gs.textContent = d.lyric_timing?.length ? `Loaded ${d.title || "Arcadians"}: canonical release metadata, sections, ${d.bpm} BPM, lyrics and timing.` : `Loaded ${d.title || "Arcadians"} canonical reference metadata.`;
  } catch (E) {
    Gs.textContent = E.message;
  }
}
pd.addEventListener("click", (r) => {
  r.stopPropagation(), hn.click();
});
hn.addEventListener("change", () => {
  jd(hn.files?.[0]);
});
Ae.addEventListener("click", (r) => {
  r.target !== pd && !r.target.closest(".known-info") && hn.click();
});
Ae.addEventListener("keydown", (r) => {
  (r.key === "Enter" || r.key === " ") && hn.click();
});
for (const r of ["dragenter", "dragover"]) Ae.addEventListener(r, (E) => {
  E.preventDefault(), Ae.classList.add("dragging");
});
for (const r of ["dragleave", "drop"]) Ae.addEventListener(r, (E) => {
  E.preventDefault(), Ae.classList.remove("dragging");
});
Ae.addEventListener("drop", (r) => {
  jd(r.dataTransfer?.files?.[0]);
});
Ih?.addEventListener("click", Bd);
Ph?.addEventListener("click", Bd);
const qs = new URLSearchParams(location.search).get("hash");
qs && /^[0-9a-f]{64}$/i.test(qs) && xd(qs.toLowerCase(), "Existing analysis");
export {
  le as formatTimelineTime
};
