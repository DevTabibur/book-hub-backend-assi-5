import { Request, Response } from 'express'
import catchAsync from '../../../common/catchAsync'

const addToReadingList = catchAsync(async (req: Request, res: Response) => {
  console.log('hitted')
})

export const ReadingListController = {
  addToReadingList,
}
