import { Router } from 'express'
import { AuthController } from './auth.controller'

const router = Router()

// **register user**
router.post('/register', AuthController.registerUser)

// **login user**
router.post('/login', AuthController.loginUser)

// **regenerate token / refresh token**
router.get('/me', AuthController.loggedInUser)

export const AuthRoute = router
