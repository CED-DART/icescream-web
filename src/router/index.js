import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Login from '@/components/User/Login'
import RecoveryPassword from '@/components/User/Recovery'
import RecoveryToken from '@/components/User/RecoveryToken'
import Shops from '@/components/Shop/Shops'
import CreateShop from '@/components/Shop/Create'
import Users from '@/components/User/Users'
import User from '@/components/User/User'
import CreateUser from '@/components/User/Create'
import EditUser from '@/components/User/Edit'
import Profile from '@/components/User/Profile'
import Debtors from '@/components/Debtors'
import Reviews from '@/components/Reviews'
import AcceptanceTerms from '@/components/AcceptanceTerms'
import About from '@/components/About'

import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: AuthGuard
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/recovery',
      name: 'Recovery Password',
      component: RecoveryPassword
    },
    {
      path: '/recoverypassword',
      props: true,
      name: 'Recovery Password with Token',
      component: RecoveryToken
    },
    {
      path: '/shops',
      name: 'Ice Cream Shops',
      component: Shops,
      beforeEnter: AuthGuard
    },
    {
      path: '/shops/new',
      name: 'Create Ice Cream Shop',
      component: CreateShop,
      beforeEnter: AuthGuard
    },
    {
      path: '/users',
      name: 'Users',
      component: Users,
      beforeEnter: AuthGuard
    },
    {
      path: '/user/new',
      name: 'Create User',
      component: CreateUser,
      beforeEnter: AuthGuard
    },
    {
      path: '/user/:id',
      name: 'User Details',
      props: true,
      component: User,
      beforeEnter: AuthGuard
    },
    {
      path: '/user/edit/:id',
      name: 'Edit User Details',
      props: true,
      component: EditUser,
      beforeEnter: AuthGuard
    },
    {
      path: '/profile',
      name: 'User Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/debtors',
      name: 'Debtors',
      component: Debtors,
      beforeEnter: AuthGuard
    },
    {
      path: '/reviews',
      name: 'Reviews',
      component: Reviews,
      beforeEnter: AuthGuard
    },
    {
      path: '/terms',
      name: 'Acceptance Terms',
      component: AcceptanceTerms,
      beforeEnter: AuthGuard
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      beforeEnter: AuthGuard
    }
  ],
  mode: 'history'
})
