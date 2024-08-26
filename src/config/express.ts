import express, { Express, Request, Response } from "express";
import cors from "cors";
import router from "../routes";
import setupDB from "./db";

const createServer = (): express.Application => {
  const app: Express = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(express.json());
  setupDB();

  app.use("/restaurant-partner", router);

  app.get("/restaurant-partner", (req: Request, res: Response) => {
    res.send({
      message: "Hello World",
    });
  });
  return app;
};

export { createServer };
