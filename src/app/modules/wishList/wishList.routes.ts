import { Router } from 'express'
import verifyToken from '../../middleware/verifyToken'
import { wishListController } from './wishList.controller'

const router = Router()

// **add to wish-list**
router.post('/', verifyToken, wishListController.addToWishList)

export const wishListRoute = router
