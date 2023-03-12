import { Router } from 'express';
const router = Router();
import * as controller from '../controllers/appControllers.js';

// Register, Login POST
router.route('/signup').post(controller.signup);
router.route('/signin').post(controller.signin);

// Todo POST,GET
router.route('/todos').post(controller.todosPost);
router.route('/todos').get(controller.todosGet);
router.route('/todos/:id').delete(controller.todosDelete);
router.route('/todos/:id').put(controller.todosUpdate);

export default router;
