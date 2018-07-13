import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

 const router = new Router({
  routes: [

    {
      path: '/',
      name: 'productDetail',
      component: resolve => {
        require.ensure(['@/views/productDetail/detail.vue'], () => {
          resolve(require('@/views/productDetail/detail.vue'));
        }, 'chunk/productDetail');
      }
    },
    {
      path: '/productDetail/:productId',
      name: 'productDetail',
      component: resolve => {
        require.ensure(['@/views/productDetail/detail.vue'], () => {
          resolve(require('@/views/productDetail/detail.vue'));
        }, 'chunk/productDetail');
      }
    },
    /*用户登录*/
    {
        path: '/login/:productId',
        name: 'login',
        component: resolve => {
            require.ensure(['@/views/login/login.vue'], () => {
                resolve(require('@/views/login/login.vue'));
            }, 'chunk/login');
        }
    },
    /*用户注册*/
    {
        path: '/registration/:productId',
        name: 'registration',
        component: resolve => {
            require.ensure(['@/views/login/registration.vue'], () => {
                resolve(require('@/views/login/registration.vue'));
            }, 'chunk/registration');
        }
    },
    /*找回密码*/
    {
        path: '/forgot_pwd/:productId',
        name: 'forgot_pwd',
        component: resolve => {
            require.ensure(['@/views/login/forgot_pwd.vue'], () => {
                resolve(require('@/views/login/forgot_pwd.vue'));
            }, 'chunk/forgot_pwd');
        }
    },
    /*用户服务协议*/
    {
        path: '/protocol',
        name: 'protocol',
        component: resolve => {
            require.ensure(['@/views/login/protocol.vue'], () => {
                resolve(require('@/views/login/protocol.vue'));
            }, 'chunk/protocol');
        }
    },
    {
      path: '/pay',
      name: 'pay',
      component: resolve => {
        require.ensure(['@/views/pay/index.vue'], () => {
          resolve(require('@/views/pay/index.vue'));
        }, 'chunk/pay');
      }
    },    
    
    
    // 马涛添加
    {
      path: '/fillorder',
      name: 'fillorder',
      component: resolve => {
        require.ensure(['@/views/fillorder/fillorder.vue'], () => {
          resolve(require('@/views/fillorder/fillorder.vue'));
        }, 'chunk/fillorder');
      },
    },
    {
      path: '/payfail',
      name: 'payfail',
      component: resolve => {
        require.ensure(['@/views/pay/payfail.vue'], () => {
          resolve(require('@/views/pay/payfail.vue'));
        }, 'chunk/payfail');
      }
    },     
    {
      path: '/paysuccess',
      name: 'paysuccess',
      component: resolve => {
        require.ensure(['@/views/pay/paysuccess.vue'], () => {
          resolve(require('@/views/pay/paysuccess.vue'));
        }, 'chunk/paysuccess');
      }
    },     
    {
      path: '/addlist',
      name: 'addlist',
      component: resolve => {
        require.ensure(['@/views/add/index.vue'], () => {
          resolve(require('@/views/add/index.vue'));
        }, 'chunk/addlist');
      }
    },      
    {
      path: '/addedit',
      name: 'addedit',
      component: resolve => {
        require.ensure(['@/views/add/addedit.vue'], () => {
          resolve(require('@/views/add/addedit.vue'));
        }, 'chunk/addedit');
      }
    },  
    {
      path: '/personal',
      name: 'personal',
      component: resolve => {
        require.ensure(['@/views/perCenter/index.vue'], () => {
          resolve(require('@/views/perCenter/index.vue'));
        }, 'chunk/personal');
      }
    },  

  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  } 
  
})

	router.beforeEach((to, from,next)=>{
		if(to.path=='/login'||to.path=='/registration'||to.path=='/forgot_pwd'){
				sessionStorage.removeItem('user');
		}
	  next();
	  
	});




export default router;