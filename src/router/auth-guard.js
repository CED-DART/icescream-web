import {store} from '../store'
import localforage from 'localforage'

function redirect (user, to, from, next) {
  if (!user) {
    next('/login')
  } else if (!user.acceptedTems && to.path !== '/terms') {
    next('/terms')
  } else {
    next()
  }
}

export default (to, from, next) => {
  const user = store.getters.user
  if (!user) {
    localforage.getItem('icescreamer-user')
    .then((user) => {
      if (user) {
        store.dispatch('autoSignIn', user)
      }
      redirect(user, to, from, next)
    })
  } else {
    redirect(user, to, from, next)
  }
}
