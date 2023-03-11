import { Router } from 'express';
const router = Router();
import * as controller from '../controllers/appControllers.js';
// POST Register
router.route('/signup').post(controller.signup);

export default router;
