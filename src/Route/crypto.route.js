import express from "express";
const router = express.Router();
import cryptoController from "../Controllers/crypto.controller.js";

router.get("/crypto",cryptoController);

const cryptoRouter = router;
export default cryptoRouter;

