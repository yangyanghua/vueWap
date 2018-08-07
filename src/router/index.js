import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

 const router = new Router({
  routes: [
    {
      path: '/',
      name: 'visCard1',
      component: resolve => {
        require.ensure(['@/views/visitingCard/index.vue'], () => {
          resolve(require('@/views/visitingCard/index.vue'));
        }, 'chunk/visitingCard');
      }
    },

    {
      path: '/visCard',
      name: 'visCard',
      component: resolve => {
        require.ensure(['@/views/visitingCard/index.vue'], () => {
          resolve(require('@/views/visitingCard/index.vue'));
        }, 'chunk/visitingCard');
      }
    },

    {
      path: '/leaflets',
      name: 'leaflets',
      component: resolve => {
        require.ensure(['@/views/leaflets/index.vue'], () => {
          resolve(require('@/views/leaflets/index.vue'));
        }, 'chunk/leaflets');
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
//		if(to.path=='/login'||to.path=='/registration'||to.path=='/forgot_pwd'){
//				sessionStorage.removeItem('user');
//		}
	  next();
	  
	});




export default router;