import { Router } from 'express'
import { BookRoute } from '../modules/book/book.routes'

const router = Router()

const routes = [
  {
    path: '/book',
    route: BookRoute,
  },
]

routes.forEach(route => {
  router.use(route.path, route.route)
})

export default router
