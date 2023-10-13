import { Router } from "express";
import { createUser, getAllUsers, getUser, loginUser, currentLogin } from "../controllers/userController";

const router = Router();

router.get('/', getAllUsers);
router.get('/currentLogin', currentLogin);
router.post('/', createUser);
router.post('/login', loginUser);
router.get('/:userId', getUser);

export default router;