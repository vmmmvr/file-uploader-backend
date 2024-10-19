import { Router } from 'express';
import { UserControler } from './user.controller'; // Adjust path as per your structure
import { userLoginSchema, userSignupSchema } from './user.schema'; // Adjust path as per your structure
import { validate } from '../../middlewares/validate.middleware'; // Adjust path as per your structure
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

// Protect the /users route, requires authentication
router.get('/users/me', authMiddleware, UserControler.getMe);
router.get('/users', authMiddleware, UserControler.getUsers);


router.post('/users/signup', validate(userSignupSchema), UserControler.createUser);
router.post('/users/login', validate(userLoginSchema), UserControler.login);

export default router;
