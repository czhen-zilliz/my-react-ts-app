import express from "express";
import { UsersController } from "./users/usersController";
import { RegisterRoutes } from "../build/routes";

const router = express.Router();

RegisterRoutes(router);

export default router;
