System.register('chunks:///_virtual/bullter.ts', ['cc'], function (e) {
  'use strict'
  var o, n, l, t, r
  return {
    setters: [
      function (e) {
        ;(o = e.cclegacy),
          (n = e._decorator),
          (l = e.ColliderComponent),
          (t = e.RigidBodyComponent),
          (r = e.Component)
      },
    ],
    execute: function () {
      var i
      function d(e) {
        if (void 0 === e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          )
        return e
      }
      function a(e, o, n) {
        return (
          o in e
            ? Object.defineProperty(e, o, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[o] = n),
          e
        )
      }
      o._RF.push({}, '9ce24CvFR9NzqrHLfoMfKBK', 'bullter', void 0)
      var h = n.ccclass
      n.property,
        e(
          'Bullter',
          h('Bullter')(
            (i = (function (e) {
              var o, n
              function r() {
                for (
                  var o, n = arguments.length, l = new Array(n), t = 0;
                  t < n;
                  t++
                )
                  l[t] = arguments[t]
                return (
                  a(
                    d((o = e.call.apply(e, [this].concat(l)) || this)),
                    'speed',
                    100
                  ),
                  a(d(o), 'maxLiftTIme', 10),
                  a(d(o), 'instantiateTime', 0),
                  a(d(o), '_collider', null),
                  a(d(o), '_rigidBody', null),
                  a(d(o), '_flyTime', 0),
                  a(d(o), '_autoDestoryTime', 15),
                  o
                )
              }
              ;(n = e),
                ((o = r).prototype = Object.create(n.prototype)),
                (o.prototype.constructor = o),
                (o.__proto__ = n)
              var i = r.prototype
              return (
                (i.onLoad = function () {
                  ;(this._collider = this.node.getComponent(l)),
                    (this._rigidBody = this.node.getComponent(t)),
                    this._collider.on(
                      'onCollisionEnter',
                      this.onCollisionEnter,
                      this
                    )
                }),
                (i.init = function (e) {
                  this._rigidBody.setLinearVelocity(e)
                }),
                (i.onCollisionEnter = function (e) {
                  'web_home' == e.otherCollider.node.name
                    ? (window.location.href = 'http://localhost:3000/')
                    : 'admin_home' == e.otherCollider.node.name
                    ? (window.location.href = 'http://localhost:3000/admin/')
                    : 'walk' == e.otherCollider.node.name ||
                      'dnf' == e.otherCollider.node.name ||
                      'online' == e.otherCollider.node.name
                    ? (window.location.href = 'http://localhost:3000/')
                    : 'web_obout' == e.otherCollider.node.name
                    ? (window.location.href = 'http://localhost:3000/#/about')
                    : 'blog' == e.otherCollider.node.name
                    ? (window.location.href = 'http://localhost:3000/#/blog')
                    : 'admin_video' == e.otherCollider.node.name
                    ? (window.location.href =
                        'http://localhost:3000/admin/#/videos/list')
                    : 'admin_userlist' == e.otherCollider.node.name &&
                      (window.location.href =
                        'http://localhost:3000/admin/#/users/list'),
                    ('Wall0' != e.otherCollider.node.name &&
                      'Wall1' != e.otherCollider.node.name &&
                      'Wall2' != e.otherCollider.node.name &&
                      'Wall3' != e.otherCollider.node.name &&
                      'web_home' != e.otherCollider.node.name &&
                      'admin_home' != e.otherCollider.node.name &&
                      'walk' != e.otherCollider.node.name &&
                      'dnf' != e.otherCollider.node.name &&
                      'online' != e.otherCollider.node.name &&
                      'web_obout' != e.otherCollider.node.name &&
                      'blog' != e.otherCollider.node.name &&
                      'admin_video' != e.otherCollider.node.name &&
                      'admin_userlist' != e.otherCollider.node.name &&
                      'block' != e.otherCollider.node.name &&
                      'block-004' != e.otherCollider.node.name &&
                      'block-002' != e.otherCollider.node.name &&
                      'block-005' != e.otherCollider.node.name &&
                      'block-013' != e.otherCollider.node.name &&
                      'block-007' != e.otherCollider.node.name &&
                      'block-003' != e.otherCollider.node.name &&
                      'block-006' != e.otherCollider.node.name &&
                      'block-008' != e.otherCollider.node.name &&
                      'block-014' != e.otherCollider.node.name &&
                      'block-015' != e.otherCollider.node.name &&
                      'block-010' != e.otherCollider.node.name &&
                      'Plane' != e.otherCollider.node.name) ||
                      this.node.destroy()
                }),
                (i.update = function (e) {
                  ;(this._flyTime += e), this._flyTime, this._autoDestoryTime
                }),
                r
              )
            })(r))
          ) || i
        )
      o._RF.pop()
    },
  }
})

System.register(
  'chunks:///_virtual/Player.ts',
  ['cc', './bullter.ts'],
  function (e) {
    'use strict'
    var t, n, i, o, r, l, a, u, s, c, d, f, h, p, b
    return {
      setters: [
        function (e) {
          ;(t = e.cclegacy),
            (n = e._decorator),
            (i = e.Node),
            (o = e.Prefab),
            (r = e.find),
            (l = e.systemEvent),
            (a = e.SystemEventType),
            (u = e.Vec3),
            (s = e.Collider),
            (c = e.RigidBody),
            (d = e.macro),
            (f = e.director),
            (h = e.instantiate),
            (p = e.Component)
        },
        function (e) {
          b = e.Bullter
        },
      ],
      execute: function () {
        var y, g, v, m, w, z, E, P, N
        function _(e, t, n, i) {
          n &&
            Object.defineProperty(e, t, {
              enumerable: n.enumerable,
              configurable: n.configurable,
              writable: n.writable,
              value: n.initializer ? n.initializer.call(i) : void 0,
            })
        }
        function x(e) {
          if (void 0 === e)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            )
          return e
        }
        function O(e, t, n) {
          return (
            t in e
              ? Object.defineProperty(e, t, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[t] = n),
            e
          )
        }
        function A(e, t, n, i, o) {
          var r = {}
          return (
            Object.keys(i).forEach(function (e) {
              r[e] = i[e]
            }),
            (r.enumerable = !!r.enumerable),
            (r.configurable = !!r.configurable),
            ('value' in r || r.initializer) && (r.writable = !0),
            (r = n
              .slice()
              .reverse()
              .reduce(function (n, i) {
                return i(e, t, n) || n
              }, r)),
            o &&
              void 0 !== r.initializer &&
              ((r.value = r.initializer ? r.initializer.call(o) : void 0),
              (r.initializer = void 0)),
            void 0 === r.initializer &&
              (Object.defineProperty(e, t, r), (r = null)),
            r
          )
        }
        t._RF.push({}, 'dafffeN29JGNZj5Y/lrK/D+', 'Player', void 0)
        var C = n.ccclass,
          K = n.property,
          S = {}
        e(
          'Typescript',
          ((y = C('Typescript')),
          (g = K(i)),
          (v = K(o)),
          (m = K(i)),
          y(
            ((E = A(
              (z = (function (e) {
                var t, n
                function i() {
                  for (
                    var t, n = arguments.length, i = new Array(n), o = 0;
                    o < n;
                    o++
                  )
                    i[o] = arguments[o]
                  return (
                    _(
                      x((t = e.call.apply(e, [this].concat(i)) || this)),
                      'firePoint',
                      E,
                      x(t)
                    ),
                    _(x(t), 'bullet', P, x(t)),
                    O(x(t), 'bullets', null),
                    O(x(t), 'shootTime', 0.3),
                    O(x(t), 'totalTime', 0),
                    _(x(t), 'headNode', N, x(t)),
                    O(x(t), 'lock', !0),
                    O(x(t), 'canJump', !0),
                    O(x(t), 'isMouseDown', !1),
                    t
                  )
                }
                ;(n = e),
                  ((t = i).prototype = Object.create(n.prototype)),
                  (t.prototype.constructor = t),
                  (t.__proto__ = n)
                var o = i.prototype
                return (
                  (o.start = function () {
                    var e = this
                    ;(this.totalTime = this.shootTime),
                      (this.bullets = r('Game')),
                      console.log(this.bullets),
                      l.on(
                        a.KEY_DOWN,
                        function (e) {
                          S[e.keyCode] = 1
                        },
                        this
                      ),
                      l.on(
                        a.KEY_UP,
                        function (e) {
                          S[e.keyCode] = 0
                        },
                        this
                      ),
                      l.on(
                        a.MOUSE_DOWN,
                        function (t) {
                          e.isMouseDown = !0
                        },
                        this
                      ),
                      l.on(
                        a.MOUSE_MOVE,
                        function (t) {
                          if (e.isMouseDown) {
                            var n = t.getDelta()
                            if (n.x < 0) {
                              var i = e.node.eulerAngles,
                                o = i.y + 1
                              e.node.eulerAngles = new u(i.x, o, i.z)
                            } else if (n.x > 0) {
                              var r = e.node.eulerAngles,
                                l = r.y - 1
                              e.node.eulerAngles = new u(r.x, l, r.z)
                            }
                            if (n.y > 0 && e.headNode) {
                              var a = e.headNode.eulerAngles,
                                s = a.x + 1
                              s > 90 && (s = 90),
                                (e.headNode.eulerAngles = new u(s, a.y, a.z))
                            } else if (n.y < 0 && e.headNode) {
                              var c = e.headNode.eulerAngles,
                                d = c.x - 1
                              d < -90 && (d = -90),
                                (e.headNode.eulerAngles = new u(d, c.y, c.z))
                            }
                          }
                        },
                        this
                      ),
                      l.on(
                        a.MOUSE_UP,
                        function (t) {
                          e.isMouseDown = !1
                        },
                        this
                      )
                    var t = this.getComponent(s)
                    null == t ||
                      t.on(
                        'onCollisionEnter',
                        function () {
                          e.canJump = !0
                        },
                        this
                      )
                  }),
                  (o.update = function (e) {
                    var t = new u(0, 0, 0),
                      n = this.node.getComponent(c)
                    null == n || n.getLinearVelocity(t),
                      S[d.KEY.w]
                        ? ((t.z = -5), (t.x = 0))
                        : S[d.KEY.s]
                        ? ((t.z = 5), (t.x = 0))
                        : S[d.KEY.d]
                        ? ((t.x = 5), (t.z = 0))
                        : S[d.KEY.a]
                        ? ((t.x = -5), (t.z = 0))
                        : (t = new u(0, t.y, 0)),
                      S[d.KEY.g] && this.doShoot(),
                      S[d.KEY.space] &&
                        this.canJump &&
                        ((t.y = 5), (this.canJump = !1))
                    this.node.eulerAngles
                    u.transformQuat(t, t, this.node.getRotation()),
                      null == n || n.setLinearVelocity(t)
                  }),
                  (o.doShoot = function () {
                    var e = f.getScene(),
                      t = h(this.bullet)
                    t.setPosition(this.firePoint.getWorldPosition()),
                      null == e || e.addChild(t)
                    var n = t.getComponent(b),
                      i = new u(0, 0, 1)
                    u.transformQuat(i, i, this.firePoint.getWorldRotation()),
                      u.multiplyScalar(i, i, 50),
                      n.init(i)
                  }),
                  i
                )
              })(p)).prototype,
              'firePoint',
              [g],
              {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return null
                },
              }
            )),
            (P = A(z.prototype, 'bullet', [v], {
              configurable: !0,
              enumerable: !0,
              writable: !0,
              initializer: function () {
                return null
              },
            })),
            (N = A(z.prototype, 'headNode', [m], {
              configurable: !0,
              enumerable: !0,
              writable: !0,
              initializer: function () {
                return null
              },
            })),
            (w = z))
          ) || w)
        )
        t._RF.pop()
      },
    }
  }
)

System.register(
  'chunks:///_virtual/main',
  ['./bullter.ts', './Player.ts'],
  function () {
    'use strict'
    return {
      setters: [function () {}, function () {}],
      execute: function () {},
    }
  }
)

;(function (r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main')
})(function (mid, cid) {
  System.register(mid, [cid], function (_export, _context) {
    return {
      setters: [
        function (_m) {
          var _exportObj = {}

          for (var _key in _m) {
            if (_key !== 'default' && _key !== '__esModule')
              _exportObj[_key] = _m[_key]
          }

          _export(_exportObj)
        },
      ],
      execute: function () {},
    }
  })
})
