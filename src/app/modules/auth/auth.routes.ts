import { Router } from 'express'
import { AuthController } from './auth.controller'

const router = Router()

// **register user**
router.post('/register', AuthController.registerUser)

export const AuthRoute = router
