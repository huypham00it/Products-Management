import express from 'express';
import rateLimiter from 'express-rate-limit';

import {Register, Login, updateUser} from '../controllers/auth.js';
import auth from '../middleware/auth.js';

const rateLimit = rateLimiter({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 10,
    message: 'Too many request from this IP address, please try again later!'
})

const router = express.Router();

router.post('/register',rateLimit, Register);
router.post('/login', rateLimit, Login);
router.patch('/update-user', auth, updateUser);

export default router;