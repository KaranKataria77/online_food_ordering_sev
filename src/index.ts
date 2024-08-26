import serverless from "serverless-http";
import express, { Express, Request, Response } from "express";
import router from "./routes";
import setupDB from "./config/db";
import cors from "cors";
import dotenv from "dotenv";
import cluster from "cluster";
import os from "os";

dotenv.config();

const port = process.env.PORT || "4000";

const app: Express = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
setupDB();

app.use("/restaurant-partner", router);

app.get("/restaurant-partner/hello/", (req: Request, res: Response) => {
  res.send({
    message: "Hello World",
  });
});

// if (cluster.isPrimary) {
//   // this is master process
//   const numCpus = os.cpus().length;
//   for (let i = 0; i < Math.floor(numCpus / 2); i++) {
//     cluster.fork();
//   }
//   // if any worker dies
//   cluster.on("exit", (worker, code, signal) => {
//     cluster.fork();
//   });
// } else {
//   // this is for worker process
//   // uncomment it for development use
//   app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
//   });
// }

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// module.exports.handler = serverless(app);
