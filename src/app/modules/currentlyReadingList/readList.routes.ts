import { Router } from 'express'
import { ReadingListController } from './readList.controller'
import verifyToken from '../../middleware/verifyToken'

const router = Router()

// **adding currently reading lists books**
router.post('/', verifyToken, ReadingListController.addToReadingList)

// **get specific user's reading list**
router.get('/', verifyToken, ReadingListController.getSpecificUserReadingList)

export const ReadListRoute = router
