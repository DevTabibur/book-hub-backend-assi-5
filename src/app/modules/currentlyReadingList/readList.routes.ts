import { Router } from 'express'
import { ReadingListController } from './readList.controller'

const router = Router()

// **adding currently reading lists books**
router.post('/', ReadingListController.addToReadingList)

export const ReadListRoute = router
