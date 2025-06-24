import { Router } from "express";
import { container } from "../../../inversify.config";
import { UserController } from "../controllers/user.controller";
import { TYPES } from "../../../types";


const router = Router();

const userController = container.get<UserController>(TYPES.UserController);
router.post("/", (req, res) => userController.create(req, res));


export default router;