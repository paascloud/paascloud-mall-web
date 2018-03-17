export default [
  {
    path: '/',
    redirect: {
      name: 'Index'
    },
    component: resolve => require(['views/index'], resolve),
    children: [
      {
        name: 'Index',
        path: 'index',
        meta: {
          hideMainHeader: false
        },
        component: resolve => require(['views/home'], resolve)
      },
      {
        name: 'user-cart',
        path: 'cart',
        meta: {
          name: '我的购物车',
          requestAuth: false,
          hideMainHeader: false
        },
        component: resolve => require(['views/user/user-cart'], resolve)
      },
      {
        name: 'order-confirm',
        path: 'confirm',
        meta: {
          name: '订单确认',
          requestAuth: true,
          hideMainHeader: false
        },
        component: resolve => require(['views/order/confirm'], resolve)
      },
      {
        name: 'order-payment',
        path: 'payment',
        meta: {
          name: '支付订单',
          requestAuth: true,
          hideMainHeader: false
        },
        component: resolve => require(['views/order/payment'], resolve)
      },
      {
        name: 'goods-detail',
        path: 'detail',
        meta: {
          name: '商品详情',
          requestAuth: false,
          hideMainHeader: false
        },
        component: resolve => require(['views/goods/goods-detail'], resolve)
      },
      {
        name: 'goods-list',
        path: 'list',
        meta: {
          name: '商品列表',
          requestAuth: false,
          hideMainHeader: false
        },
        component: resolve => require(['views/goods/goods-list'], resolve)
      },
      {
        name: 'order-detail',
        path: 'orderDetail',
        meta: {
          name: '订单详情',
          requestAuth: true,
          hideMainHeader: false
        },
        component: resolve => require(['views/order/detail'], resolve)
      },
      {
        name: 'oper-result',
        path: 'result',
        meta: {
          name: '操作结果',
          hideMainHeader: true
        },
        component: resolve => require(['views/result'], resolve)
      },
      {
        name: 'user-center',
        path: 'center',
        meta: {
          name: '个人中心',
          requestAuth: true,
          hideMainHeader: false
        },
        component: resolve => require(['views/user/user-center'], resolve)
      },
      {
        name: 'user-center-update',
        path: 'updateUser',
        meta: {
          name: '修改个人信息',
          requestAuth: true,
          hideMainHeader: false
        },
        component: resolve => require(['views/user/user-center-update'], resolve)
      },
      {
        name: 'user-order',
        path: 'order',
        meta: {
          name: '我的订单',
          requestAuth: true,
          hideMainHeader: false
        },
        component: resolve => require(['views/user/user-order'], resolve)
      },
      {
        name: 'user-pass-update',
        path: 'updateUserPwd',
        meta: {
          name: '修改密码',
          requestAuth: true,
          hideMainHeader: false
        },
        component: resolve => require(['views/user/user-pass-update'], resolve)
      },
      {
        name: 'about',
        path: 'aboutMe',
        meta: {
          name: '关于PCMall',
          hideMainHeader: false
        },
        component: resolve => require(['views/about'], resolve)
      }
    ]
  },
  {
    name: 'error',
    path: '*',
    redirect: {
      name: '404'
    },
    component: resolve => require(['views/error/404'], resolve)
  }
];
