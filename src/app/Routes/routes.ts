import { Router } from 'express'
import { BookRoute } from '../modules/book/book.routes'
import { AuthRoute } from '../modules/auth/auth.routes'

const router = Router()

const routes = [
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/book',
    route: BookRoute,
  },
]

routes.forEach(route => {
  router.use(route.path, route.route)
})

export default router
