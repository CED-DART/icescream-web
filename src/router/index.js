import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Login from '@/components/User/Login'
import RecoveryPassword from '@/components/User/Recovery'
import Shops from '@/components/Shop/Shops'
import Shop from '@/components/Shop/Shop'
import CreateShop from '@/components/Shop/Create'
import EditShop from '@/components/Shop/Edit'
import Users from '@/components/User/Users'
import User from '@/components/User/User'
import CreateUser from '@/components/User/Create'
import EditUser from '@/components/User/Edit'
import Profile from '@/components/User/Profile'
import Debtors from '@/components/Debtors'
import Reviews from '@/components/Reviews'
import AcceptanceTerms from '@/components/AcceptanceTerms'

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
      name: 'Recovery Passwrod',
      component: RecoveryPassword
    },
    {
      path: '/shops',
      name: 'Ice Cream Shops',
      component: Shops,
      beforeEnter: AuthGuard
    },
    {
      path: '/shop/:id',
      name: 'Ice Cream Shop Details',
      props: true,
      component: Shop,
      beforeEnter: AuthGuard
    },
    {
      path: '/shop/new',
      name: 'Create Ice Cream Shop',
      component: CreateShop,
      beforeEnter: AuthGuard
    },
    {
      path: '/shop/edit/:id',
      name: 'Edit Ice Cream Shop',
      props: true,
      component: EditShop,
      beforeEnter: AuthGuard
    },
    {
      path: '/users',
      name: 'Users',
      component: Users,
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
      path: '/user/new',
      name: 'Create User',
      component: CreateUser,
      beforeEnter: AuthGuard
    },
    {
      path: '/user/edit/:id',
      name: 'Edit User',
      props: true,
      component: EditUser,
      beforeEnter: AuthGuard
    },
    {
      path: '/profile',
      name: 'User Profile',
      props: true,
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
    }
  ],
  mode: 'history'
})
