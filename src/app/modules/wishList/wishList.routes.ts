import { Router } from 'express'
import verifyToken from '../../middleware/verifyToken'
import { WishListController } from './wishList.controller'

const router = Router()

// **add to wish-list**
router.post('/', verifyToken, WishListController.addToWishList)

// **get specific user's wishlist**
router.get('/', verifyToken, WishListController.getSpecificWishListOfUser)

export const wishListRoute = router
