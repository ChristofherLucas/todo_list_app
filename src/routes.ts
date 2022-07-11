import { Router, Request, Response } from "express";
import { app } from "./app";

const router = Router();

router.get("/teste", async (req: Request, res: Response) => {
  return res.send("Hello world!");
});

export { router };
